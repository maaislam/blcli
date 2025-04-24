import { fullStory } from '../../../../lib/utils';


/**
 * {{PD029}} - {{Minibag improvements (Save Baskets)}}
 */

const Run = () => {
  // Flannels ga configuration
  // events.analyticsReference = '_gaUAT';
  // const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'PD029',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;

      return {
        docVar,
        bodyVar,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
      // Event template
      // events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      // eslint-disable-next-line
      // events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'Action', 'Label', { sendOnce: true });
      // Flannels event
      // eslint-disable-next-line
      // events.send(settings.ID, 'View', `${settings.ID} Variation ${settings.VARIATION}`, { sendOnce: true });
      // const hide = document.getElementById(`${settings.ID}_flickerPrevention`);
      // hide.parentElement.removeChild(hide);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        // Default running event
        // eslint-disable-next-line
        // events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        console.log('Running');
      },
    },
  };

  Exp.init();
};

export default Run;
