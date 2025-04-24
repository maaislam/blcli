import { fullStory, events, getCookie } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{FL021 Variation 2}} - {{Compile checkout methods}}
 */
const cardDetails = () => {
  events.analyticsReference = '_gaUAT';
  let slideQ = false;
  const Exp = {
    settings: {
      ID: 'FL021V2',
      VARIATION: '2',
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

      events.send(settings.ID, 'View', `${settings.ID} Variation ${settings.VARIATION}`, { sendOnce: true });
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
        const formStored = JSON.parse(localStorage.getItem('FL021_form'));
        const paypalCheck = getCookie('FL021_paypal');
        const appleCheck = getCookie('FL021_apple');
        let savedCards = localStorage.getItem('FL021_saved');

        Exp.cache.bodyVar.insertAdjacentHTML('afterbegin', '<form style="display: none;" method="post" action="/checkout/payment" id="FL021_form" enctype="multipart/form-data"></form>');
        Exp.cache.bodyVar.querySelector('#FL021_form').insertAdjacentHTML('afterbegin', formStored);

        Exp.cache.cardWrap.insertAdjacentHTML('beforebegin', `
          <h2 class="FL006_header">Payment Options <a href="/checkout/usevoucher" class="FL006_voucher">Apply Promotional Code ></a></h2>
          <div class="FL006_accordian">
            <a href="/checkout/usegiftcard" class="FL006_accordian-btn FL006_gift_card">Use Gift card / eVoucher</a>
            <a href="/checkout/usevoucher" class="FL006_accordian-btn FL006_voucher">Apply <strong>Promotional/Discount <br /> Code</strong></a>
            <a class="FL006_accordian-btn FL006_card">Pay with Card</a>
          </div>
          <div class="FL006_accordian-content">
          </div>
        `);

        const paymentOptions = Exp.cache.bodyVar.querySelector('.FL006_accordian');
        const accordianWrap = Exp.cache.bodyVar.querySelector('.FL006_accordian-content');

        accordianWrap.appendChild(Exp.cache.cardWrap);
        accordianWrap.insertAdjacentHTML('beforeend', '<p>If your billing address is different than your delivery address you may be asked to provide your billing address after you’ve entered your card details</p>');

        if (savedCards) {
          savedCards = JSON.parse(savedCards);

          savedCards.forEach((item) => {
            const img = item.img.replace(/"/g, "'");
            const posLeft = item.left;
            const posTop = item.top;
            /* eslint-disable */
            let string = item.href;
            string = string.replace("javascript:__doPostBack('", '');
            string = string.replace("','')", '');
            /* eslint-enable */

            paymentOptions.querySelector('.FL006_gift_card').insertAdjacentHTML(
              'beforebegin',
              `<a class="FL006_accordian-btn FL006_savedCard" data-post="${string}"><div class="FL021_saved-img" style="background-image: ${img}; background-position: ${posTop} ${posLeft};"></div>Ending in: <span>${item.num}</span></a>`,
            );
          });

          const savedBtns = document.querySelectorAll('.FL006_savedCard');

          [].forEach.call(savedBtns, (item) => {
            item.addEventListener('click', () => {
              const postInfo = item.dataset.post;
              Exp.cache.bodyVar.querySelector('#FL021_form #__EVENTTARGET').value = postInfo;
              Exp.cache.bodyVar.querySelector('#FL021_form').submit();
            });
          });
        }

        if (paypalCheck === 'PayPalExists') {
          /* eslint-disable */
          let string = localStorage.getItem('FL021_paypal-post');
          string = string.replace("javascript:__doPostBack('", '');
          string = string.replace("','')", '');
          /* eslint-enable */

          paymentOptions.querySelector('.FL006_gift_card').insertAdjacentHTML('beforebegin', '<a class="FL006_accordian-btn FL006_paypal">Pay with Paypal</a>');
          Exp.cache.bodyVar.querySelector('.FL006_paypal').addEventListener('click', () => {
            Exp.cache.bodyVar.querySelector('#FL021_form #__EVENTTARGET').value = string;
            Exp.cache.bodyVar.querySelector('#FL021_form').submit();
            events.send(Exp.settings.ID, 'Clicked', 'Paypal option', { sendOnce: true });
          });
        }

        if (appleCheck === 'ApplePayExists') {
          /* eslint-disable */
          let string = localStorage.getItem('FL021_apple-post');
          string = string.replace("javascript:__doPostBack('", '');
          string = string.replace("','')", '');
          /* eslint-enable */

          paymentOptions.querySelector('.FL006_gift_card').insertAdjacentHTML('beforebegin', '<a class="FL006_accordian-btn FL006_apple">Pay with Apple Pay</a>');
          Exp.cache.bodyVar.querySelector('.FL006_apple').addEventListener('click', () => {
            Exp.cache.bodyVar.querySelector('#FL021_form #__EVENTTARGET').value = string;
            Exp.cache.bodyVar.querySelector('#FL021_form').submit();
            events.send(Exp.settings.ID, 'Clicked', 'Apple Pay option', { sendOnce: true });
          });
        }

        setTimeout(() => {
          Exp.services.hideFlicker();
        }, 200);
      },
      clickBindings: () => {
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

        Exp.cache.bodyVar.querySelector('.FL006_gift_card').addEventListener('click', () => {
          events.send('FL021V2', 'Clicked', 'Promo code', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

const redirectToCardDetails = () => {
  document.querySelector('.CardsIcons.PaymentMethodSelectionLink').click();
};

const eventVoucher = () => {
  events.analyticsReference = '_gaUAT';
  const hide = document.getElementById('GDXXX_flickerPrevention');
  hide.parentElement.removeChild(hide);
  document.getElementById('FindGiftCardButton').addEventListener('click', () => {
    setTimeout(() => {
      if (document.getElementById('CardDetailsNotEnteredAlert').style.display !== 'none') {
        events.send('FL021V2', 'Clicked', 'Error in voucher code', { sendOnce: true });
      }
    }, 200);
  });
};

export { cardDetails, redirectToCardDetails, eventVoucher };
