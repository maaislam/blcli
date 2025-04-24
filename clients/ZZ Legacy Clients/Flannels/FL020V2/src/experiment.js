import { fullStory, events } from '../../../../lib/utils';

/**
 * {{TestID}} - {{Test Description}}
 */
const Run = () => {
  events.analyticsReference = '_gaUAT';
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL020',
      VARIATION: '2',
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
      const { services, settings } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      Exp.contentBuilder();
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
    contentBuilder() {
      if (Exp.cache.bodyVar.querySelector('.basketLink .TopSubViewAll')) {
        events.send(`${Exp.settings.ID}`, 'Logged In', 'User was logged in, hidden birthday message Variation 2', { sendOnce: true });
      } else {
        Exp.cache.bodyVar.querySelector('.form-horizontal.VoucherForm').insertAdjacentHTML('afterend', `
          <p class="FL020_voucher-error">Sorry! Birthday discounts are locked to your email address. Please log in <a href="https://www.flannels.com/Login">here.</a></p>
        `);

        Exp.cache.bodyVar.querySelector('.FL020_voucher-error').addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'User clicked "Please log in here" under voucher input Variation 2', { sendOnce: true });
        });
      }

      Exp.cache.bodyVar.querySelector('#btnApplyPromoCode').addEventListener('click', () => {
        events.send(`${Exp.settings.ID}`, 'Click', 'User clicked Apply Voucher Variation 2', { sendOnce: true });
      });
    },
  };

  Exp.init();
};

const UserError = () => {
  events.analyticsReference = '_gaUAT';
  const msg = document.querySelector('.newBasketPromoCode [id*=PromoCodeManager_divVoucherError]').textContent.replace(' - This discount code is not valid.', '');
  events.send('FL020', 'Voucher Error', `User entered a voucher and received an error, error code is: "${msg}" Variation 2`, { sendOnce: true });
};

export { Run, UserError };
