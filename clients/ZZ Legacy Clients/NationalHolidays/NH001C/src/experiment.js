import { fullStory, events } from '../../../../lib/utils';
import nh01 from './lib/nh01';

/**
 * {{NH001C}} - {{Login Page Improvements}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'NH001C',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    events.setTrackerName('tracker2');
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    let $ = null;
    $ = window.jQuery;
    /*
    * Run NH001
    */
    nh01();
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
