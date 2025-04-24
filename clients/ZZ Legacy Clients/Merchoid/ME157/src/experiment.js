import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{ME157}} - {{Review Banner v2}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME157',
    VARIATION: '{{VARIATION}}',
  },

  cache: (() => {
    const docVar = document;
    const bodyVar = document.body;

    return {
      docVar,
      bodyVar,
    };
  })(),

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}-V${settings.VARIATION}`);
    const banner = document.querySelector('.full-width-mobile');
    /**
     * Version 1
     */
    if (settings.VARIATION === '1') {
      components.versionOne(banner);
      // Events
      events.send(settings.ID, 'Active', 'V1 Active', { sendOnce: true });
    }
    /**
     * Version 2 on all bar product page
     */
    if (settings.VARIATION === '2') {
      events.send(settings.ID, 'Active', 'V2 Active', { sendOnce: true });
      const productPage = components.isProductPage();
      if (productPage === true) {
        components.versionTwo(banner);
      }
    }
    /**
     * Version 3
     */
    if (settings.VARIATION === '3') {
      events.send(settings.ID, 'Active', 'V3 Active', { sendOnce: true });
      components.versionThree(banner);
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    isProductPage() {
      const url = window.location.pathname;
      let isProductPage = false;
      if (url.match(/(\/product\/)/g)) {
        isProductPage = true;
      }
      return isProductPage;
    },
    /**
     * @desc Re builds and amends the review banner for V1
     * @param {ELEMENT} banner
     */
    versionOne(banner) {
      const addIntroSlide = () => {
        const slide = `
          <p class="review-quote me11-firstreview">What our fans say...</p>
        `;
        const ref = banner.querySelector('.review-banner-conveyor-belt');
        if (ref) {
          ref.insertAdjacentHTML('beforebegin', slide);
        }
      };
      const reOrderSlides = () => {
        const slides = banner.querySelectorAll('.review-banner-conveyor-belt ul#reviews li');
        [].forEach.call(slides, (slide) => {
          const p = slide.querySelector('p.review-quote');
          if (p) {
            slide.insertAdjacentElement('afterbegin', p);
          }
        });
      };
      if (banner) {
        addIntroSlide();
        reOrderSlides();
      }
    },
    /**
     * @desc Version 2 of the test
     * @param {Element} banner
     */
    versionTwo(banner) {
      const moveBanner = () => {
        const ref = document.querySelector('.product-details.tabs-style');
        if (ref) {
          ref.insertAdjacentElement('beforebegin', banner);
        }
      };
      if (banner) {
        pollerLite([
          '.product-details.tabs-style',
        ], moveBanner);
      }
    },
    /**
     * @desc Version 3 of the test
     * @param {Element} banner
     */
    versionThree(banner) {
      const addIntroSlide = () => {
        const slide = `
          <p class="review-quote me11-firstreview">What our fans say...</p>
        `;
        const ref = banner.querySelector('.review-banner-conveyor-belt');
        if (ref) {
          ref.insertAdjacentHTML('beforebegin', slide);
        }
      };
      if (banner) {
        pollerLite([
          '.review-banner-conveyor-belt',
        ], addIntroSlide);
      }
    },
  },
};

export default Experiment;
