import { fullStory, events } from '../../../../lib/utils';
import nh02 from './lib/nh02';

/**
 * {{NH002C}} - {{Room Availability}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'NH002C',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    events.setTrackerName('tracker2');
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /*
    * Run NH002
    */
    nh02();
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
