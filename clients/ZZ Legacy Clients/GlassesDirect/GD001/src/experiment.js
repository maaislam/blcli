import { fullStory, events } from '../../../../lib/utils';

/**
 * GENERAL GUIDELINES:
 * PascalCase for component names, camelCase for everything else
 * 
 */

/**
 * GD001 - Product page upsell
 */
const Experiment = {
  /**
   * @desc Experiment settings to be used in events. VARIATION can be used to manage
   * multiple variations within a single folder, just change the number when compiling
   * for production.
   */
  settings: {
    ID: 'GD001',
    VARIATION: '1',
  },

  /**
   * @desc Runs the experiment
   */
  init() {
    const { components } = Experiment;
    components.componentName.init();
  },

  /**
   * @desc Used for housing all functions that don't fit within a specific component
   * e.g. helper functions
   */
  services: {
    /**
     * @desc Namespaces experiment with body class and runs all page level tracking
     */
    setup() {
      const { settings } = Experiment;
      document.body.classList.add(settings.ID);

      fullStory(settings.ID, `Variation ${settings.VARIATION}`);

      events.send(
        settings.ID,
        'View',
        `${settings.ID} activated - Variation ${settings.VARIATION}`,
      );
    },
  },

  /**
   * @desc ...
   */
  components: {
    LensUpsell: {
      create() {
        const element = document.createElement('div');
        element.classList.add('GD001_LensUpsell');
      },

      bindEvents() {

      },

      render() {

      },

      init() {

      },
    },
  },
};

export default Experiment;
