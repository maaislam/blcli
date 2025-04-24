import { fullStory, events } from '../../../../lib/utils';

/**
 * {{EJ004}} - {{Engangement PLP Changes}}
 */
const Run = () => {
  const Exp = {
    settings: {
      ID: 'EJ004',
      VARIATION: 'Control',
    },
    cache: (() => {
      // default cached elements for targeting
      const doc = document;
      const bodyVar = doc.body;

      return {
        doc,
        bodyVar,
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
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation Control`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
  };

  Exp.init();
};

export default Run;
