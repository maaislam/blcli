import { pollerLite, observer } from '../../../../../lib/uc-lib';
import getBrandsHtml from './brandsHtml';
import settings from './settings';
import pubSub from './PublishSubscribe';
import wNumb from './wNumb';

/**
 * Breakpoint for what we consider 'mobile' vs 'desktop'
 */
const BREAKPOINT = 1024;

/**
 * NoUiSlider CDN link
 */
const NOUISLIDER_JS_CDN_URL = 'https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/11.1.0/nouislider.min.js';

/**
 * NoUiSlider CDN link
 */
const SLICK_JS_CDN_URL = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js';

/**
 * When filters are changed in top bar, hit go button after delay 
 */
const PRICE_FILTERS_UPDATE_DELAY = 1000;

/**
 * Element store
 */
const STORE = new Map();

/**
 * Add body classes
 *
 * @access private
 */
const addBodyClasses = () => {
  document.body.classList.add(settings.ID);

  if (settings.VARIATION > 1) {
    document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
  }

  if(hasPageGender()) {
    document.body.classList.add(`${settings.ID}-is-gender`);
    document.body.classList.remove(`${settings.ID}-not-is-gender`);
  } else {
    document.body.classList.add(`${settings.ID}-not-is-gender`);
    document.body.classList.remove(`${settings.ID}-is-gender`);
  }

  if(pageIsBrand()) {
    document.body.classList.add(`${settings.ID}-is-brand`);
    document.body.classList.remove(`${settings.ID}-not-is-brand`);
  } else {
    document.body.classList.add(`${settings.ID}-not-is-brand`);
    document.body.classList.remove(`${settings.ID}-is-brand`);
  }
};

/**
 * Helper page has gender
 *
 * @access private
 * @return {Boolean}
 */
const hasPageGender = () => /recipient\|(her|him)/i.test(decodeURI(window.location));

/**
 * Helper is page a brand page?
 *
 * @access private
 * @return {Boolean}
 */
const pageIsBrand = () => /brand\|/i.test(decodeURI(window.location));

/**
 * Grab sentences from a larger body of text
 *
 * A sentence is defined as either a full stop followed by 
 * a space or the end of the string from the last sentence
 *
 * @access private
 * @param {String} text
 * @param {Number} n
 * @return {Array}
 */
const grabFirstNSentences = (text, n = 1) => {
  if(n < 1) {
    throw "Invalid number of sentences to grab";
  }

  if(!text) {
    return null;
  }

  const copy = text.trim().replace('\n', '').replace(/\s+(?:\b)/, ' ');
  const arraySentences = copy.split(/\.[\s$]/i);

  return arraySentences.slice(0, n);
};

/**
 * Get Max price from filter links
 *
 * @access private
 * @return {Number}
 */
const getMaxPriceFromRefinementLinks = () => {
  const links = document.querySelectorAll('#refinement-price .filters-panel__refinement-link');

  let maxPrice = 0;
  if(links.length > 0) {
    const lastLink = links[links.length - 1];
    const lastLinkTarget = decodeURIComponent(lastLink.pathname || '');

    if(lastLinkTarget) {
      const prices = lastLinkTarget.match(/price\|£(\d+)\+\-\+£(\d+)/i);
      if(prices) {
        maxPrice = prices && prices[2] ? prices[2] : 0;
      } else {
        // Match against £1000+ type filter
        const prices = lastLinkTarget.match(/price\|£(\d+)\+/i);
        const unlimitedPrice = prices && prices[1] ? prices[1] : 0;
        if(unlimitedPrice) {
          // Arbitrary to set the maximum to a large number
          // e.g. £1000+ would give us an upper bound of £12,000
          maxPrice = unlimitedPrice * 2; 
        }
      }
    }
  }

  maxPrice = parseInt(maxPrice, 10);

  return maxPrice;
};


/**
 * Get Recipient links
 *
 * @access private
 * @return {Map}
 */
const getRecipientRefinementLinks = () => {
  const links = document.querySelectorAll('.filters-panel__refinement-link');
  const results = new Map();

  [].forEach.call(links, (link) => {
    if(link.textContent.trim().match('Her')) {
      results.set('her', link);
    } else if(link.textContent.trim().match('Him')) {
      results.set('him', link);
    }
  });

  return results;
};

/**
 * Append script to body
 *
 * @access private
 * @return {Promise}
 */
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.type = 'text/javascript';

    s.addEventListener('load', () => {
      resolve();
    });

    s.src = src;
    document.querySelector('head').appendChild(s);
  });
};

/**
 * Helper build brand slider
 *
 * @access private
 * @param {HTMLElement} targetElement
 * @return Promise
 */
const buildBrandsSlider = (targetElement) => {
  return new Promise((resolve, reject) => {
    /**
     * Helper create slider
     */
    const create = () => {
      targetElement.classList.remove('hs17-hide'); // Slider hidden until slick ready

      const slider = window.jQuery(targetElement).slick({
        arrows: true,
        dots: false,
        infinite: true,
        swipeToSlide: true,
        variableWidth: true,
      });

      STORE.set('slick-slider', slider);

      resolve();
    };

    // ----------------------------------
    // Poll for jQuery and load Slick
    // ----------------------------------
    pollerLite([
      () => !!window.jQuery 
    ], () => {
      if(!window.jQuery.fn.slick) {
        // Load Slick from CDN
        loadScript(SLICK_JS_CDN_URL).then(create);
      } else {
        create();
      }
    });
  });
};

/**
 * Helper build banner
 *
 * @access private
 */
const buildBanner = () => {
  const existingBannerContainer = document.querySelector('.hs17-banner-container');
  if(existingBannerContainer) {
    existingBannerContainer.remove();
  }

  const container = document.querySelector('#content-webnav');
  const pageTitle = document.querySelector('.page-title');

  if(container && pageTitle) {
    container.insertAdjacentHTML('beforebegin', `
      <div class="hs17-banner-container">
        <header class="hs17-banner container layout">
          <h1 class="h17-page-title">
            ${pageTitle.textContent.trim()}
          </h1>
        </header>
      </div>
    `);

    const pageIntro = document.querySelector('.browse__page-intro');
    const banner = document.querySelector('.hs17-banner');

    if(pageIntro) {
      const pageIntroText = pageIntro.textContent;
      const sentencesToAppend = grabFirstNSentences(pageIntroText, 1);

      banner.insertAdjacentHTML('beforeend', `
        <p class="hs17-subtitle">${sentencesToAppend.join('. ')}.</p>
      `);
    }

    setTimeout(() => { // Timeout ensures elements have been updated in filters

      // --------------------------------------------
      // Banner CTAs
      // --------------------------------------------
      if(!hasPageGender()) {
        // --------------------------------------------
        // Build 'for him' / 'for her' buttons
        // --------------------------------------------
        const recipientLinks = getRecipientRefinementLinks();

        const himLink = recipientLinks.get('him');
        const herLink = recipientLinks.get('her');

        if(himLink && herLink) {
          banner.insertAdjacentHTML('beforeend', `
            <div class="hs17-ctas">
            </div>
          `);

          const ctas = document.querySelector('.hs17-ctas');

          if(himLink) {
            const link = document.createElement('a');
            link.innerHTML = 'For Him';
            link.classList.add("hs17-ctas__link");
            link.classList.add("hs17-ctas__link--him");

            ctas.insertAdjacentElement('beforeend', link);

            link.addEventListener('click', () => {
              pubSub.publish('did-click-cta', { type: 'him' });
              himLink.click();
            });
          }

          if(herLink) {
            const link = document.createElement('a');
            link.innerHTML = 'For Her';
            link.classList.add("hs17-ctas__link");
            link.classList.add("hs17-ctas__link--her");

            ctas.insertAdjacentElement('beforeend', link);

            link.addEventListener('click', () => {
              pubSub.publish('did-click-cta', { type: 'her' });
              herLink.click();
            });
          }

          pubSub.publish('did-show-gender');
        }
      }

      if(!pageIsBrand()) {
        // --------------------------------------------
        // Build brands slider
        // --------------------------------------------
        let slider = document.querySelector('.hs17-brands-slider');
        if(!slider) {
          banner.insertAdjacentHTML('beforeend', `
            <div class="hs17-brands-slider-wrapper">
              <div class="hs17-brands-slider hs17-hide">
                ${getBrandsHtml()}
              </div>
            </div>
          `);

          slider = document.querySelector('.hs17-brands-slider');
        }

        buildBrandsSlider(slider).then(() => {
          pubSub.publish('did-build-brand-slider');

          // Bind event listeners to clicked brand links
          const brandLinks = document.querySelectorAll('.hs17-brands-slider__brand a');
          [].forEach.call(brandLinks, (item) => {
            item.addEventListener('click', (e) => {
              pubSub.publish('did-click-cta', {
                type: 'brand'
              });
            });
          });
        });
      }
    }, 100);
  }
};

/**
 * Build price slider
 *
 * @access private
 */
const buildPriceSlider = () => {
  const priceUpperLimit = getMaxPriceFromRefinementLinks();

  let updatePriceFiltersTimeout = null;

  /**
   * Helper create top bar and slider
   */
  const create = () => {
    const main = document.querySelector('#content-webnav');
    if(main) {
      // -------------------------------------------------
      // Create top bar
      // -------------------------------------------------
      main.insertAdjacentHTML('afterbegin', `
        <div class="hs17-topbar">
          <div class="hs17-nouislider-wrap">
            <div class="hs17-slider-label">
              Choose your price range:
            </div>
            <div id="hs17-priceslider" class="hs17-priceslider"></div>
          </div>
          <div class="hs17-sort-wrap"></div>
        </div>
      `);

      // -------------------------------------------------
      // Create noUiSlider
      // -------------------------------------------------
      const lowInput = document.querySelector('#lowLimit');
      const highInput = document.querySelector('#highLimit');

      let startValue = 0;
      if(lowInput && lowInput.value) {
        startValue = parseInt(lowInput.value, 10);
      }

      let endValue = priceUpperLimit;
      if(highInput && highInput.value) {
        endValue = parseInt(highInput.value, 10);
      }

      const step = priceUpperLimit >= 100 ? 50 : 10;
      const priceSlider = document.querySelector('#hs17-priceslider');

      /**
       * Helper check close together
       */
      const checkCloseTogether = (lowValue, highValue) => {
        const diff = highValue - lowValue;
        if(priceUpperLimit / step > 20 && diff <= 2 * step) {
          priceSlider.classList.add('hs17-close-together');
        } else {
          priceSlider.classList.remove('hs17-close-together');
        }
      };

      checkCloseTogether(startValue, endValue);

      const slider = noUiSlider.create(priceSlider, {
        start: [startValue, endValue],
        connect: true,
        tooltips: true,
        margin: step,
        step: step,
        behaviour: 'tap-drag',
        range: {
          'min': 0,
          'max': priceUpperLimit
        },
        format: wNumb({
          decimals: 0,
          thousand: ',',
          prefix: '£'
        })
      });

      var formatMoney = wNumb({
        decimals: 0,
        thousand: ',',
        prefix: '£'
      });

      startValue = formatMoney.to(startValue);
      endValue = formatMoney.to(endValue);

      // -------------------------------------------------
      // Update Filters
      // -------------------------------------------------
      slider.on('slide', (values) => {
        clearTimeout(updatePriceFiltersTimeout);

        if(values && values[0] && values[1]) {
          const lowValue = parseInt(values[0].replace(/[£,]/g, ''), 10);
          const highValue = parseInt(values[1].replace(/[£,]/g, ''), 10);

          checkCloseTogether(lowValue, highValue);
        }

        pubSub.publish('did-interact-with-price-slider');
      });

      slider.on('change', (values, handle) => {
        if(values && values[0] && values[1]) {
          const lowValue = parseInt(values[0].replace(/[£,]/g, ''), 10);
          lowInput.value = lowValue;
          const highValue = parseInt(values[1].replace(/[£,]/g, ''), 10);
          highInput.value = highValue;
        }

        updatePriceFiltersTimeout = setTimeout(() => {
          const button = document.querySelector('#refinement-price .btnSearch');
          if(button) {
            button.click();
          }
        }, PRICE_FILTERS_UPDATE_DELAY);
      });

      // -------------------------------------------------
      // Move the sort by into the top bar
      // -------------------------------------------------
      const sortBy = document.querySelector(
        '.browse__results-and-sort-container .browse__sort-container.desktop-up'
      );
      const sortTarget = document.querySelector('.hs17-sort-wrap');

      if(sortBy) {
        sortTarget.insertAdjacentElement('afterbegin', sortBy);
      }
    }
  };

  const path = window.location.pathname;
  const query = window.location.search;
  if(priceUpperLimit > 0 && path.indexOf('price%7') === -1) {
    if(window.noUiSlider) {
      create();
    } else {
      loadScript(NOUISLIDER_JS_CDN_URL).then(create);
    }
    if (query.indexOf('P_Current_Price%7') > -1) {
      document.body.classList.add('HS017_hide-price');
    }
  }
};

/**
 * Remove top bar
 */
const removeTopBar = () => {
  const topBar = document.querySelector('.hs17-topbar');
  if(topBar) {
    topBar.remove();
  }
};

/**
 * Move CTAs out of banner into flow of doc on smaller screens
 *
 * @access private
 */
const moveCtasForSmallerScreens = () => {
  const bannerContainer = document.querySelector('.hs17-banner-container');

  if(bannerContainer) {
    // Move top bar pricing ranger
    pollerLite([
      '.hs17-topbar'
    ], () => {
      const topBar = document.querySelector('.hs17-topbar');
      bannerContainer.insertAdjacentElement('afterend', topBar);
    });

    // Move brands slider
    pollerLite([
      '.hs17-brands-slider-wrapper',
      '.hs17-banner-container + .hs17-topbar', // Top bar has been moved to sibling
      () => !!STORE.get('slick-slider')
    ], () => {
      const brandsSliderWrapper = document.querySelector('.hs17-brands-slider-wrapper');
      const topBar = document.querySelector('.hs17-topbar');
      topBar.insertAdjacentElement('afterend', brandsSliderWrapper);
      STORE.get('slick-slider').slick('refresh');
    });

  }
};

/**
 * Remove banner
 *
 * @access private
 */
const removeBanner = () => {
  const bannerContainer = document.querySelector('.hs17-banner-container');
  if(bannerContainer) {
    bannerContainer.remove();
  }
};

/**
 * Entry point for running experiment
 *
 * @access public
 */
export default () => {
  // --------------------------------------------
  // Experiment is running
  // --------------------------------------------
  pubSub.publish('experiment-init');

  // --------------------------------------------
  // Add classes to body
  // --------------------------------------------
  addBodyClasses();
  
  // --------------------------------------------
  // Create banner
  // --------------------------------------------
  buildBanner();

  // --------------------------------------------
  // Build price slider
  // --------------------------------------------
  buildPriceSlider();
  
  // --------------------------------------------
  // Considerations for smaller screens
  // - Move the brand / ctas out of the banner
  // --------------------------------------------
  if(window.innerWidth <= BREAKPOINT) {
    moveCtasForSmallerScreens();
  }

  // --------------------------------------------
  // Observer on page content being reloaded
  // --------------------------------------------
  const mainContent = document.querySelector('.browse__main-content');
  if(mainContent) {
    observer.connect([mainContent], () => {
      const query = window.location.search;
      const path = window.location.pathname;

      addBodyClasses();
      removeBanner();
      buildBanner();
      removeTopBar();
      buildPriceSlider();

      if(window.innerWidth <= BREAKPOINT) {
        moveCtasForSmallerScreens();
      }

      if (query.indexOf('P_Current_Price%7') > -1) {
        document.body.classList.add('HS017_hide-price');
      } else {
        document.body.classList.remove('HS017_hide-price');
      }

      if (path.indexOf('price%7') > -1) {
        document.body.classList.add('HS017_hide-range');
      } else {
        document.body.classList.remove('HS017_hide-range');
      }
    }, {
      attributes: false,
      childList: true
    });
  }
        
  // ---------------------------------------------
  // Orientation change => refresh page
  // Workaround for differences between large and small screens
  //
  // Covers tablet orientation changes
  // ---------------------------------------------
  window.addEventListener("orientationchange", function() {
    window.location.reload();
  });
};
