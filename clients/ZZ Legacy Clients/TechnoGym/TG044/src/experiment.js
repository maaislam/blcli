import { fullStory } from '../../../../lib/utils';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ID',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
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
