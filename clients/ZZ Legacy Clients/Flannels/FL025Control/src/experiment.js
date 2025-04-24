import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{FL025}} - {{Refine and Sort}}
 */
const Run = () => {
  events.analyticsReference = '_gaUAT';
  
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL025',
      VARIATION: '1',
    },
    init: () => {
      // Setup
      const { services } = Exp;

      services.tracking();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Control`);
        events.send(settings.ID, 'View', `${settings.ID} Control activated `);
      },
    },
  };

  Exp.init();
};

export default Run;
