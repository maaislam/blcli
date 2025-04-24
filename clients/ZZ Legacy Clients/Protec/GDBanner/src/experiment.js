import { fullStory, events } from '../../../../lib/utils';

/**
 * {{GDBanner}} - {{Banner for quote system}}
 */
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'GDBanner',
      VARIATION: '1',
    },
    cache: (() => {
      const doc = document;
      const bodyVar = doc.body;
      const nav = doc.getElementById('nav_secondary');

      return {
        doc,
        bodyVar,
        nav,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
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
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      contentBuilder: () => {
        Exp.cache.nav.insertAdjacentHTML('afterend', `
          <div class="GDBanner_el">Want prices? Add products to your Quote basket and submit a request to get a full quote today.</div>
        `);
      },
    },
  };

  Exp.init();
};

export default Run;
