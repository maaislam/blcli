import { fullStory, setCookie, events, getCookie } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{FL011}} - {{ Removing Continue Shopping Options }}
 */
const Run = () => {
  events.analyticsReference = '_gaUAT';
  const Exp = {
    settings: {
      ID: 'FL011',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const loggedInCheck = getCookie('FL_login-state');

      return {
        bodyVar,
        loggedInCheck,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
    },
    services: {
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID} -
        ${Exp.settings.VARIATION}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      contentBuilder: () => {
        const { settings } = Exp;

        document.querySelector('.ExitLinks .EditText a').addEventListener('click', () => {
          events.send(settings.ID, 'Click', 'User clicked Edit Bag');
        });

        if (Exp.cache.loggedInCheck && Exp.cache.loggedInCheck === 'Guest') {
          Exp.cache.bodyVar.classList.add('FL011_guest');
        }

        poller([
          '.homeDelWrap .DeliveryOptions',
        ], () => {
          const exitLinks = Exp.cache.bodyVar.querySelector('.homeDelWrap .DeliveryOptions');
          /* eslint-disable */
          if (Exp.cache.loggedInCheck && Exp.cache.loggedInCheck === 'Guest') {
          } else {
            exitLinks.insertAdjacentHTML('afterend', '<a class="FL011_continue" href="http://www.flannels.com/">Continue Shopping</a>');
            document.querySelector('.FL011_continue').addEventListener('click', () => {
              events.send(settings.ID, 'Click', 'User clicked Continue Shopping');
            });
          }
        });
      },
    },
  };

  Exp.init();
};

const loginCheck = () => {
  const Exp = {
    cache: (() => {
      const bodyVar = document.body;
      const existingSignIn = bodyVar.querySelector('.existingCustomer .dnnPrimaryAction');
      const newSignIn = bodyVar.querySelector('.newCustomer .dnnPrimaryAction');

      return {
        bodyVar,
        existingSignIn,
        newSignIn,
      };
    })(),
    init: () => {
      Exp.bindEvents.buttons();
    },
    bindEvents: {
      buttons: () => {
        Exp.cache.existingSignIn.addEventListener('click', () => {
          setCookie('FL_login-state', 'LoggedIn', 200000000);
        });

        Exp.cache.newSignIn.addEventListener('click', () => {
          setCookie('FL_login-state', 'Guest', 200000000);
        });
      },
    },
  };

  Exp.init();
};

export { Run, loginCheck };
