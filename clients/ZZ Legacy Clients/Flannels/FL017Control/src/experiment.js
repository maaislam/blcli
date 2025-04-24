import { fullStory, events } from '../../../../lib/utils';

/**
 * {{ID}} - {{Experiment Title}}
 */
const buildBasket = () => {
  events.analyticsReference = '_gaUAT';
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL017',
      VARIATION: 'Control',
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
        events.send(settings.ID, 'View', `${settings.ID} activated - ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
  };

  Exp.init();
};

export default buildBasket;
