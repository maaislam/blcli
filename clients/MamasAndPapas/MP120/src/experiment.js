import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import settings from './lib/settings';
import pubSub from './lib/PublishSubscribe';
import initialiseSlidePanel from './lib/slide-panel';

/**
 * Helper - is Occarro?
 *
 * @return {Boolean}
 */
const isOcarro = () => /Ocarro/i.test(window.universal_variable.product.name);

/**
 * Helper - is Armadillo?
 *
 * @return {Boolean}
 */
const isArmadillo = () => /Armadillo/i.test(window.universal_variable.product.name);

/**
 * Helper - is pushchair only?
 *
 * @return {Boolean}
 */
const isPushchairOnly = () => {
  let result = false;

  const variant = ((window.enhancedEcommerceData || {}).currentProduct || {}).variant;
  if(variant) {
    result = variant.toLowerCase() === 'pushchair only';
  }

  return result;
};

/**
 * Render HTML for details section
 *
 * @access private
 * @return {Object} params
 */
const renderDetailsHtml = (params) => {
  return `<div class="col-md-5 mb-md-3 mp120-detail-section" id="mp120-details">
    <div class="productDetail_panel mp120-slidePanel js-slidePanel-mobile" data-slide-id="mp120-details">
      <h2 class="productDetail_panelHeading m-0 py-4">
        <em class="mp120-details-title">${params.title}</em>
        <em class="mp120-details-subtitle">${params.subtitle}</em>
      </h2>
      <div class="productDetail_panelContent col-xs-12 p-md-0" itemprop="description">
        <div class="details-product-mobile">
          ${params.content}
        </div>
      </div>
    </div>
  </div>`;
};

/**
 * Which? Best Buy endorsements render content on page
 *
 * @access private
 */
const bestBuyEndorsements = () => {
  // ---------------------------------------
  // Render details section
  // ---------------------------------------
  const pdpDetails = document.querySelector('#PDP-Details');

  let subtitle = '';
  let content = '';

  if(isOcarro()) {
    subtitle = settings.OCARRO_PUSHCHAIR_SUBTITLE;
    content = settings.OCARRO_PUSHCHAIR_COPY;
  } else if(isArmadillo()) {
    subtitle = settings.ARMADILLO_SUBTITLE;
    content = settings.ARMADILLO_COPY;
  }

  const html = renderDetailsHtml({
    title: settings.BESTBUY_TITLE,
    subtitle: subtitle,
    content: content,
  });

  pdpDetails.insertAdjacentHTML('beforebegin', html);  

  const slidePanelInit = document.querySelector('#mp120-details > .productDetail_panel');
  if(slidePanelInit) {
    initialiseSlidePanel(slidePanelInit);

    slidePanelInit.addEventListener('click', (e) => {
      pubSub.publish('did-click-panel', 'best-buy');
    });
  }

  // ---------------------------------------
  // Show which award image
  // ---------------------------------------
  const newDetails = document.querySelector('#mp120-details');
  if(newDetails) {
    const link = (
      isOcarro() ? settings.OCARRO_WHICH_LINK : (
        isArmadillo() ? settings.ARMADILLO_WHICH_LINK : ''
      )
    );
      
    newDetails.insertAdjacentHTML('beforebegin', `
      <p class="mp120-award-image">
        <a href="${link}">
        <img width="100" height="80.5" src="${settings.AWARD_IMAGE}" alt="Which? Best Buy">
        </a>
      </p>
    `);

    const awardLink = document.querySelector('.mp120-award-image a');
    awardLink.addEventListener('click', () => {
      pubSub.publish('award-image-clicked');
    });
  }
};

/**
 * Testimonial endorsements render content on page
 *
 * @access private
 */
const testimonialEndorsements = () => {
  const pdpDetails = document.querySelector('#PDP-Details');

  const html = renderDetailsHtml({
    title: settings.TESTIMONIAL_TITLE,
    subtitle: settings.TESTIMONIAL_SUBTITLE,
    content: settings.TESTIMONIAL_COPY,
  });

  pdpDetails.insertAdjacentHTML('beforebegin', html);  

  const slidePanelInit = document.querySelector('#mp120-details > .productDetail_panel');

  if(slidePanelInit) {
    initialiseSlidePanel(slidePanelInit);

    slidePanelInit.addEventListener('click', (e) => {
      pubSub.publish('did-click-panel', 'testimonial');
    });
  }

  const readMore = document.querySelector('.mp120-readmore-post');
  if(readMore) {
    readMore.addEventListener('click', () => {
      pubSub.publish('readmore-post');
    });
  }
};

/**
 * Entry point for running experiment
 *
 * @access public
 */
export default () => {
  // --------------------------------------------
  // Page Setup
  // --------------------------------------------
  document.body.classList.add(settings.ID);

  pubSub.publish('experiment-init');

  // --------------------------------------------
  // Which? Best Buy version of test
  //
  // Conditions for execution (identify specicific products):
  // --------------------------------------------
  pollerLite([
    /**
     * Consider both Ocarro and Armadillo products
     */
    () => {
      return isOcarro() || isArmadillo();
    },

    /**
     * If product is Ocarro, it has to be pushchair only
     */
    () => {
      if(!isOcarro()) {
        return true;
      }

      return isPushchairOnly();

    }
  ], bestBuyEndorsements);

  // --------------------------------------------
  // Testimonial version of test
  //
  // Conditions for execution (identify specicific products):
  // --------------------------------------------
  pollerLite([
    /**
     * Consider Flip XT, Urbo, Sola and Ocarro products
     */
    () => /Flip XT|Urbo|Sola|Ocarro/i.test(window.universal_variable.product.name),

    /**
     * If product is Ocarro, it should be a bundle, i.e. not pushchair-only
     */
    () => {
      if(!isOcarro()) {
        return true;
      }

      return !( isPushchairOnly() );
    }
  ], testimonialEndorsements);
};
