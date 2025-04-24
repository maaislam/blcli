import { fullStory, events, setCookie } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{FL006}} - {{Compile checkout methods}}
 */

// Exp.services.hideFlicker();

const cardDetails = () => {
  let slideQ = false;
  const Exp = {
    settings: {
      ID: 'FL006',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const cardWrap = bodyVar.querySelector('iframe[id*="_CardCaptureFrame"]');

      return {
        bodyVar,
        cardWrap,
      };
    })(),
    init: () => {
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      events.analyticsReference = '_gaUAT';
      events.send(settings.ID, 'View', `${settings.ID} Varation ${settings.VARIATION}`, { sendOnce: true });
      Exp.cache.bodyVar.classList.add(settings.ID, 'FL006_card-page');
      services.tracking();

      components.contentBuilder();
      components.clickBindings();
    },
    services: {
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
      hideFlicker: () => {
        const hide = document.getElementById('GDXXX_flickerPrevention');
        hide.parentElement.removeChild(hide);
      },
    },
    components: {
      contentBuilder: () => {
        Exp.cache.cardWrap.insertAdjacentHTML('beforebegin', `
          <h2 class="FL006_header">Payment Options <a href="/checkout/usevoucher" class="FL006_voucher">Apply Promotional Code ></a></h2>
          <div class="FL006_accordian">
            <a href="/checkout/usegiftcard" class="FL006_accordian-btn FL006_gift_card">Use Gift card / eVoucher</a>
            <a href="/checkout/payment" class="FL006_accordian-btn FL006_paypal">Pay by Paypal</a>
            <a class="FL006_accordian-btn FL006_card">Pay with Card</a>
          </div>
          <div class="FL006_accordian-content">
          </div>
        `);

        const accordianWrap = Exp.cache.bodyVar.querySelector('.FL006_accordian-content');

        accordianWrap.appendChild(Exp.cache.cardWrap);
        accordianWrap.insertAdjacentHTML('beforeend', '<p>If your billing address is different than your delivery address you may be asked to provide your billing address after you’ve entered your card details</p>');

        setTimeout(() => {
          Exp.services.hideFlicker();
        }, 200);
      },
      clickBindings: () => {
        const { settings } = Exp;
        poller([
          () => {
            let trigger = false;
            if (window.jQuery) {
              trigger = true;
            }
            return trigger;
          },
        ], () => {
          const cardBtn = $('.FL006_accordian-btn.FL006_card');
          const cardContent = $('.FL006_accordian-content');
          const paypalClick = $('.FL006_paypal');

          paypalClick.on('click', () => {
            setCookie('FL006_paypal', 'true', 20000000);
            events.send(settings.ID, 'Click', `${settings.ID} Variation ${settings.VARIATION} - User clicked Paypal`);
          });

          cardBtn.on('click', () => {
            if (slideQ === false) {
              slideQ = true;
              cardBtn.toggleClass('FL006_active');
              cardContent.slideToggle(() => {
                slideQ = false;
              });
            }
          });
        });
      },
    },
  };

  Exp.init();
};

const redirectToCardDetails = () => {
  document.querySelector('.CardsIcons.PaymentMethodSelectionLink').click();
};

const redirectToPaypal = () => {
  document.body.classList.add('FL006_hide-body');
  document.querySelector('li[id*="PaypalCheckoutButton"] .PaymentMethodSelectionLink').click();
};

export { cardDetails, redirectToCardDetails, redirectToPaypal };
