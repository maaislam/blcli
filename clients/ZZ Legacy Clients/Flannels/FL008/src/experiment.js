import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * FL008 - Auto-expand Description
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'FL008',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    events.analyticsReference = '_gaUAT';
    events.send('FL008', 'View', `FL008 Variation ${settings.VARIATION} ran`, { sendOnce: true });
    document.body.classList.add(settings.ID);

    if (settings.VARIATION === '2') {
      // Move description to below CTAs
      pollerLite(['.infoaccordion', '.BasketWishContainer'], () => {
        const toggle = document.querySelector('.infoaccordion');
        const ctas = document.querySelector('.BasketWishContainer');
        ctas.parentNode.insertBefore(toggle, ctas.nextSibling);
      });
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  components: {},
};

export default Experiment;
