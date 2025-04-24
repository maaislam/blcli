import { fullStory, events } from '../../../../lib/utils';

/**
 * {{MP103}} - {{100% Change Stepped process}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP103',
    VARIATION: '1',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const breadcrumbs = document.querySelectorAll('.breadcrumb_item');

    breadcrumbs[0].querySelector('a').textContent = 'Delivery Address';
    breadcrumbs[1].querySelector('a').textContent = 'Delivery Method';
    breadcrumbs[2].querySelector('a').textContent = 'Payment';
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
