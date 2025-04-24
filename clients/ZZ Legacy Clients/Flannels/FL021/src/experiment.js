import { fullStory, events } from '../../../../lib/utils';

/**
 * {{FL006}} - {{Compile checkout methods}}
 */

// #divApplePayCheckoutButton

const redirectToCardDetails = () => {
  events.analyticsReference = '_gaUAT';
  const Exp = {
    settings: {
      ID: 'FL021',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const cardWrap = bodyVar.querySelector('#dnn_ContentPane');

      return {
        bodyVar,
        cardWrap,
      };
    })(),
    init: () => {
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      events.send(settings.ID, 'View', `${settings.ID} Varation ${settings.VARIATION}`, { sendOnce: true });
      Exp.cache.bodyVar.classList.add(settings.ID, 'FL006_card-page');
      services.tracking();

      components.contentBuilder();
    },
    services: {
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);

        document.querySelector('li[id*="divPaypalCheckoutButton"]').addEventListener('click', () => {
          events.send(Exp.settings.ID, 'Clicked', 'Paypal option', { sendOnce: true });
        });

        document.getElementById('divApplePayCheckoutButton').addEventListener('click', () => {
          events.send(Exp.settings.ID, 'Clicked', 'Apple Pay ption', { sendOnce: true });
        });
      },
      hideFlicker: () => {
        const hide = document.getElementById('GDXXX_flickerPrevention');
        if (hide) {
          hide.parentElement.removeChild(hide);
        }
      },
    },
    components: {
      contentBuilder: () => {
        Exp.cache.cardWrap.insertAdjacentHTML('beforebegin', `
          <h2 class="FL006_header">Payment Options <a href="/checkout/usevoucher" class="FL006_voucher">Apply Promotional Code ></a></h2>
        `);

        setTimeout(() => {
          Exp.services.hideFlicker();
        }, 200);
      },
    },
  };

  Exp.init();
};

const eventVoucher = () => {
  events.analyticsReference = '_gaUAT';
  const hide = document.getElementById('GDXXX_flickerPrevention');
  if (hide) {
    hide.parentElement.removeChild(hide);
  }
  document.getElementById('FindGiftCardButton').addEventListener('click', () => {
    setTimeout(() => {
      if (document.getElementById('CardDetailsNotEnteredAlert').style.display !== 'none') {
        events.send('FL021', 'Clicked', 'Error in voucher code', { sendOnce: true });
      }
    }, 200);
  });
};

export { redirectToCardDetails, eventVoucher };
