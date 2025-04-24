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
      VARIATION: '3',
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
      const msg = document.querySelector('.newBasketPromoCode [id*=PromoCodeManager_divVoucherError]').textContent.replace(' - This discount code is not valid.', '');
      
      if (Exp.cache.bodyVar.querySelector('.basketLink .TopLink.myaccount')) {
        events.send(`${Exp.settings.ID}`, 'Logged In', 'User was logged in, hidden birthday message Variation 3', { sendOnce: true });
        events.send('FL020', 'Voucher Error', `User entered a voucher and received an error, error code is: "${msg}" Variation 3`, { sendOnce: true });
      } else if (msg.toUpperCase().indexOf('BIRTHDAYTREAT') > -1) {
        Exp.cache.bodyVar.querySelector('.form-horizontal.VoucherForm').insertAdjacentHTML('afterend', `
          <p class="FL020_voucher-error">Sorry! Birthday discounts are locked to your email address. Please log in <a href="https://www.flannels.com/Login">here.</a></p>
        `);

        Exp.cache.bodyVar.querySelector('.FL020_voucher-error').addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'User clicked "Please log in here" under voucher input Variation 3', { sendOnce: true });
        });
      } else {
        events.send('FL020', 'Voucher Error', `User entered a voucher and received an error, error code is: "${msg}" Variation 3`, { sendOnce: true });
      }

      Exp.cache.bodyVar.querySelector('#btnApplyPromoCode').addEventListener('click', () => {
        events.send(`${Exp.settings.ID}`, 'Click', 'User clicked Apply Voucher Variation 3', { sendOnce: true });
      });
    },
  };

  Exp.init();
};

const RunVoucher = () => {
  events.analyticsReference = '_gaUAT';
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL020',
      VARIATION: '3',
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

      Exp.cache.bodyVar.classList.add(settings.ID, 'FL020_hide-voucher');
      services.tracking();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'Voucher Basket', 'Hidden voucher option on /checkout/payment Variation 3');
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
  };

  Exp.init();
};


export { Run, RunVoucher, UserError };
