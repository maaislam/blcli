import { fullStory, events } from '../../../../lib/utils';

/**
 * {{GD033}} - {{Hide Sticky Nav on Desktop}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'GD033',
    VARIATION: '1',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);

      document.querySelector('#navigation .wrapper').addEventListener('click', () => {
         events.send(`${Exp.settings.ID}`, 'Click', 'Nav interacted with', { sendOnce: true });
      });
    },
  },

  components: {},
};

export default Experiment;
