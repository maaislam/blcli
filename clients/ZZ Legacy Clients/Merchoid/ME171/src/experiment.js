import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import ME159 from './lib/ME159';
import ME160 from './lib/ME160-variation3';
import ME171_variation2 from './lib/ME171-variation2'; // eslint-disable-line camelcase

/**
 * {{ME171}} - {{Scarcity Improvement Iteration}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME171',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    if (window && window.location && window.location.href && window.location.href.indexOf('/product/') > -1) {
      /**
       * @desc Check if user has completed a purchase
       * If yes, then hide scarcity message
       */
      const itemData = JSON.parse(localStorage.getItem('ME171-purchase-complete'));
      if (!itemData) {
        document.body.classList.add(settings.ID);
        if (settings.VARIATION === '1') {
          ME159.init();
        } else if (settings.VARIATION === '2') {
          ME171_variation2.init();
        } else if (settings.VARIATION === '3') {
          ME159.init();
          pollerLite(['.ME159_stock-checker.ME159_loaded-stock'], () => {
            ME160.init();
          });
        }
      } else {
        const scarcityMessage = document.querySelector('.ME159_stock-checker.ME159_loaded-stock');
        if (scarcityMessage) {
          scarcityMessage.classList.add('hide');
        }
      }
    } else if (window && window.location && window.location.href && window.location.href.indexOf('/checkout/order-received') > -1) {
      services.purchaseCompleteUpdateLocalStorage();
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
    /**
     * @desc Update Local Storage Item - Purchase Complete
     */
    purchaseCompleteUpdateLocalStorage() {
      const itemData = JSON.parse(localStorage.getItem('ME171-purchase-complete'));
      if (!itemData) {
        localStorage.setItem('ME171-purchase-complete', true);
      }
    },
  },

  components: {},

  bindExperimentEvents: {},
};

export default Experiment;
