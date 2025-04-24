import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME154',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    if (settings.VARIATION === '2') {
      components.storeCheckoutSuccess();
    }

    poller(['.single-product', '#merchoid-scarcity-message'], () => {
      // on the first page view
      if (!window.sessionStorage.ME154) { // if the storage has not been set
        components.storeURLs(); // start storing the url
        services.changeScarcityMessage(); // run the scarcity message
      }

      // if the URLs are being stored
      if (window.sessionStorage.ME154) {
        const currentPage = window.location.pathname;
        const storedURLS = JSON.parse(window.sessionStorage.ME154);
        const URLarray = storedURLS.site_Pages;
        if (URLarray.length < 2 || URLarray.length === 2) { // if less than 3 stored
          for (let index = 0; index < URLarray.length; index += 1) {
            const element = URLarray[index];
            if (element === currentPage) {
              services.changeScarcityMessage();
            } else {
              components.storeURLs();
              services.changeScarcityMessage();
            }
          }
        }
        for (let index = 0; index < URLarray.length; index += 1) {
          const element = URLarray[index];
          if (element === currentPage) {
            services.changeScarcityMessage();
          }
        }
      }
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /**
     * @desc change the scarcity message
     */
    changeScarcityMessage: function changeScarcityMessage() {
      const { settings } = Experiment;
      const message = document.getElementById('merchoid-scarcity-message');
      if (message) {
        document.body.classList.add('ME154-show_message');
        message.innerHTML = '<span class="ME154-newtext">Hurry! Less than <span></span> in stock</span>';

        if (settings.VARIATION === '1') {
          message.querySelector('.ME154-newtext span').textContent = '10';
        } else if (settings.VARIATION === '2') {
          if (sessionStorage.getItem('ME154-checkoutSuccess')) {
            message.querySelector('.ME154-newtext span').textContent = '2';
          } else {
            message.querySelector('.ME154-newtext span').textContent = '3';
          }
        }
      }
    },
  },

  components: {
    /**
     * @desc Get the pages the user has previously been on
     */
    storeURLs: function storeURLs() {
      const URLvisited = window.location.pathname;
      const productData = (() => {
        const cached = window.sessionStorage.ME154;
        return cached ? JSON.parse(cached) : { site_Pages: [] };
      })();
      // store the URL if not already stored
      if (productData.site_Pages.indexOf(URLvisited) === -1) {
        document.body.classList.add('ME154-show_message');

        productData.site_Pages.push(URLvisited);
        const stringifiedProductData = JSON.stringify(productData);
        window.sessionStorage.ME154 = stringifiedProductData;
      }
    },
    /**
     * @desc if the user gets to checkout success
     */
    storeCheckoutSuccess: function storeCheckoutSuccess() {
      const URL = window.location.href;
      if (URL.indexOf('/checkout/order-received') > -1) {
        sessionStorage.setItem('ME154-checkoutSuccess', 1);
      }
    },
  },
};

export default Experiment;
