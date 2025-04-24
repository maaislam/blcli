/**
 * HSS021 - Trust Pilot Product Reviews on product pages
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const activate = () => {
  if (shared.VARIATION == 'control') {
    events.send('CRO Experiment', `${shared.ID}`, 'Control - Activated', { sendOnce: true });
    document.querySelector('.HSS021-TPminiWidget').setAttribute('style', 'display: none !important;');
    document.querySelector('.HSS021-TPreviews').setAttribute('style', 'display: none !important;');
  } else {
    // rest of experiment code
    events.send('CRO Experiment', `${shared.ID}`, 'V1 - Activated', { sendOnce: true });
    setup();
    console.log(`>>>${shared.ID} is running`);
    // --- Add tab
    if (window.innerWidth > 420) {
      const reviewsTabContainer = `<li class="${shared.ID}-tab reviews">
        <a data-toggle="tab" href="#reviews_tab">Reviews</a>
      </li>`;
      const tabsWrapperEl = document.querySelector('.product_details_pg.pdp_hire .product-details.prdt-dtls-tab ul.nav.nav-tabs');
      tabsWrapperEl.insertAdjacentHTML('beforeend', reviewsTabContainer);

      const tabsContentEl = document.querySelector('.product_details_pg.pdp_hire .product-details.prdt-dtls-tab .tab-content');
      pollerLite([`.${shared.ID}-TPminiWidget`], () => {
        const miniWidgetEl = document.querySelector(`.${shared.ID}-TPminiWidget`);
        const readMoreReviews = `<div class="${shared.ID}-readMore__wrapper">
          <div class="${shared.ID}-readMore">Read Reviews</div>
        </div>`;

        miniWidgetEl.insertAdjacentHTML('afterend', readMoreReviews);
        
      });
      

      pollerLite([`.${shared.ID}-TPreviews`], () => {
        if (window.innerWidth > 420) {
          const reviewsContent = document.querySelector(`.${shared.ID}-TPreviews`);
          // ${reviewsContent}
          const reviewsContainer = `<div id="reviews_tab" class="tab-pane fade">
            <div class="full_prdt_reviews">
            </div>
          </div>`;
          tabsContentEl.insertAdjacentHTML('beforeend', reviewsContainer);
          document.querySelector('#reviews_tab .full_prdt_reviews').insertAdjacentElement('afterbegin', reviewsContent);


          const readReviewsEl = document.querySelector(`.${shared.ID}-readMore`);
          readReviewsEl.addEventListener('click', (e) => {
            document.querySelector(`.${shared.ID}-tab.reviews a`).click();
            document.querySelector('.product_details_pg.pdp_hire .product-details.prdt-dtls-tab .tab-content').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
          });
        }
        
      });
    } else {
      pollerLite([`.${shared.ID}-TPminiWidget`], () => {
        const miniWidgetEl = document.querySelector(`.${shared.ID}-TPminiWidget`);
        const readMoreReviews = `<div class="${shared.ID}-readMore__wrapper">
          <div class="${shared.ID}-readMore">Read Reviews</div>
        </div>`;

        document.querySelector('.item_gallery.mobile-pdp-slider .code-n-rating').insertAdjacentElement('beforeend', miniWidgetEl);
        miniWidgetEl.insertAdjacentHTML('afterend', readMoreReviews);
      });
      const productDetailsEl = document.querySelector('.prdt-dtls-accordion');
      pollerLite([`.${shared.ID}-TPreviews`], () => {
        const reviewsContent = document.querySelector(`.${shared.ID}-TPreviews`);
        productDetailsEl.insertAdjacentElement('beforeend', reviewsContent);

        const readReviewsEl = document.querySelector(`.${shared.ID}-readMore`);
        readReviewsEl.addEventListener('click', (e) => {
          document.querySelector(`.${shared.ID}-TPreviews`).scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        });
      });
    }
    
    
  }
};


export default activate;
