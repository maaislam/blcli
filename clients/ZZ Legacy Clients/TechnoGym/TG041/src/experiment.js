import { fullStory, events } from '../../../../lib/utils';
import { observer } from '../../../../lib/uc-lib';

/**
 * {{TG041}} - {{Remove Prices on PLP}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TG041',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    const priceElement = document.querySelectorAll('.item-product .product-info .price-box');
    for (let i = 0; priceElement.length > i; i += 1) {
      priceElement[i].classList.add('TG041-hide-price');
    }
    // -----------------------------------------------------------
    // On load more products / filters observed append links to products
    // -----------------------------------------------------------
    const connectObserver = () => {
      const mainDiv = document.querySelector('#main div[role=main]'),
      catProducts = document.querySelector('.category-view .category-products');

      observer.connect([catProducts, mainDiv], () => {
          // Main div rebuilds all main content so reconnect observer after
          // contnet loaded (for 'load more' products)
          const addedProducts = document.querySelectorAll('.item-product .product-info .price-box:not(.TG041-hide-price)');
          for (let i = 0; addedProducts.length > i; i += 1) {
            addedProducts[i].classList.add('TG041-hide-price');
          }
          observer.disconnect([catProducts, mainDiv]);
          connectObserver();
          
      }, {
          config: {
              attributes: false,
              childList: true,
              subTree: true,
          }
      });
    };
    connectObserver();
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

  components: {},
};

export default Experiment;
