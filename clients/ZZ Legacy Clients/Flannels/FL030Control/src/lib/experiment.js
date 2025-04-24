import { fullStoryMap, eventsMap } from '../../../../../lib/utils';
import { mapPoller } from '../../../../../lib/uc-lib';

/**
 * {{FL030}} - {{Quick Size Filter Options}}
 */
const Run = (cache) => {
  eventsMap.analyticsReference = '_gaUAT';
  const Exp = {
    settings: {
      ID: 'FL030',
      VARIATION: 'Control',
    },
    init: () => {
      // Setup
      const { services } = Exp;

      services.tracking();
    },
    services: {
      tracking() {
        const { settings } = Exp;
        fullStoryMap(settings.ID, 'Variation Control');
        eventsMap.send(settings.ID, 'View', `${settings.ID} activated - Control`);
      },
    },
  };

  Exp.init();
};

export default Run;
