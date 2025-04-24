import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{EJ017}} - {{Test Description}}
 */
const Run = () => {
  let eventCheck = true;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'EJ017',
      VARIATION: 'Control',
    },
    cache: (() => {
      const doc = document;
      const bodyVar = doc.body;

      return {
        doc,
        bodyVar,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.bindClicks();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
    },
    components: {
      bindClicks() {
        Exp.cache.bodyVar.addEventListener('click', (e) => {
          if (e.target.classList.contains('filters-panel__refinement-link')) {
            const text = e.target.textContent;
            events.send(`${Exp.settings.ID}`, 'Click', `User clicked on old filter ${text}`, { sendOnce: true });
          }
        });
      },
    },
  };

  Exp.init();
};

export default Run;
