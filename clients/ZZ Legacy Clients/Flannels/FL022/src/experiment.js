import { fullStory, events, getCookie, deleteCookie } from '../../../../lib/utils';

/**
 * {{FL022}} - {{Test Description}}
 */
const Run = () => {
  events.analyticsReference = '_gaUAT';
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL022',
      VARIATION: '1',
    },
    cache: (() => {
      const doc = document;
      const bodyVar = doc.body;
      const errorCookie = decodeURIComponent(getCookie('FL022_error')).replace(/"/g, '');

      return {
        doc,
        bodyVar,
        errorCookie,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;
      if (getCookie('FL022_error')) {
        Exp.cache.bodyVar.classList.add(settings.ID);
        services.tracking();

        components.contentBuilder();
        deleteCookie('FL022_error');
      }
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'Error', 'User got a voucher error', { sendOnce: true });
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      contentBuilder: () => {
        Exp.cache.bodyVar.querySelector('.ContentWrap .leftWrap').insertAdjacentHTML('afterbegin', `<div class="FL022_alert alert alert-block alert-danger">${Exp.cache.errorCookie}</div>`);
      },
    },
  };

  Exp.init();
};

const changeText = () => {
  events.analyticsReference = '_gaUAT';
  const bodyVar = document.body;
  bodyVar.classList.add('FL022');
  bodyVar.querySelector('h1').innerText = 'Promotional Code';
  fullStory('FL022', 'Variation 1');
  events.send('FL022', 'View', 'FL022 activated - Variation 1');
};

export { Run, changeText };
