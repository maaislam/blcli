import { fullStory, events } from '../../../../lib/utils';
import { observer } from '../../../../lib/uc-lib';
import nh04 from './lib/nh04';

/**
 * {{NH004C}} - {{Rooms Iteration}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'NH004C',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    events.setTrackerName('tracker2');
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /*
    * Running NH04
    */
    nh04();
    /*
    * Add person icons for the rooms
    */
    // const numberOfRooms = document.querySelector('select.NH002_howManyRoomsSelect');
    // const appendIcons = () => {

    // };
    // observer.connect(numberOfRooms, appendIcons, {

    // });
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
