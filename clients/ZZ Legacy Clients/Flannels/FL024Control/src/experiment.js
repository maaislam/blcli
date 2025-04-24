import { events } from '../../../../lib/utils';

/**
 * {{FL024}} - {{Sticky ATB Mobile}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'FL024',
  },

  init() {
    // Setup
    events.analyticsReference = '_gaUAT';
    const { settings } = Experiment;
    
    events.send(settings.ID, 'View', `${settings.ID} activated - Control`);
  },
};

export default Experiment;
