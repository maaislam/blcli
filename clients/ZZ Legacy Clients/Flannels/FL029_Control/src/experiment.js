import { events } from '../../../../lib/utils';


/**
 * {{FL029_Control}} - {{FL029_Control}}
 */

const Run = () => {
  // Flannels ga configuration
  events.analyticsReference = '_gaUAT';
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL029',
      VARIATION: 'Control',
    },
    init: () => {
      // Default running event
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - ${Exp.settings.VARIATION}`);
    },
  };

  Exp.init();
};

export default Run;
