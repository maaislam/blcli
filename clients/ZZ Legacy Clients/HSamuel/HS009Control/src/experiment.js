import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{ HS009 }} - {{ Find watch filters modal/popup }}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'HS009',
      VARIATION: '1',
    },
    /**
     * @desc Initialize the functions to start running the test
     */
    init: () => {
      /**
       * @desc Object destructuring for easier to read references
       */
      const {
        services,
      } = Exp;

      services.tracking();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        events.send(settings.ID, 'View', `${settings.ID} activated - Control`);
      },
    },
  };

  Exp.init();
};

export default Run;
