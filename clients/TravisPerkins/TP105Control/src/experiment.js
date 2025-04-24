import { fullStory, events } from '../../../../lib/utils';

/**
 * {{TP105}} - {{Test Description}}
 */
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP105',
      VARIATION: 'Control',
    },
    cache: (() => {
      const bodyVar = document.body;
      const basketWrap = bodyVar.querySelector('.guestCheckoutContainer');

      return {
        bodyVar,
        basketWrap,
      };
    })(),
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

export default Run;
