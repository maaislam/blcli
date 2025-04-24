import { countdown } from '../../../../lib/uc-lib';
import { fullStory, events } from '../../../../lib/utils';

/**
 * FL004 - Delivery Method
 */
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL004',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;

      return {
        bodyVar,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;
      events.analyticsReference = '_gaUAT';
      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send('FL004 - Control', 'View', 'FL004 activated - FL018 Control');
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      contentBuilder: () => {
        const deliveryPrices = Exp.cache.bodyVar.querySelectorAll('.DeliveryOptionsItem .DeliveryOptionRadio');

        [].forEach.call(deliveryPrices, (item) => {
          /* eslint-disable */
          const price = item.dataset.price;
          /* eslint-enable */
          let currency;

          if (Exp.cache.bodyVar.classList.contains('currency-gbp')) {
            currency = `£${price}`;
          } else if (Exp.cache.bodyVar.classList.contains('currency-eur')) {
            currency = `€${price}`;
          } else if (Exp.cache.bodyVar.classList.contains('currency-usd')) {
            currency = `$${price}`;
          }

          item.insertAdjacentHTML('afterend', `<span class="FL004_price">${currency}</span>`);
        });

        // Click tracking
        const standardDelivery = Exp.cache.bodyVar.querySelector('.DeliveryOptionsItem_STD');
        const nextDayDelivery = Exp.cache.bodyVar.querySelector('.DeliveryOptionsItem_NDD');

        /* eslint-disable */
        let throttleStandard = false;
        standardDelivery.addEventListener('click', () => {
          if (throttleStandard) return false;
          throttleStandard = true;
          events.send('FL004 - Control', 'Click', 'Clicked Standard Delivery');
          setTimeout(() => {
            throttleStandard = false;
          }, 400);
        });

        let throttleNextDay = false;
        nextDayDelivery.addEventListener('click', () => {
          if (throttleNextDay) return false;
          throttleNextDay = true;
          events.send('FL004 - Control', 'Click', 'Clicked Next Day Delivery');
          setTimeout(() => {
            throttleNextDay = false;
          }, 400);
        });
        /* eslint-enable */

        // Change description in 'Next Day Delivery' to include a countdown timer
        const nextDayDeliveryDesc = Exp.cache.bodyVar.querySelector('.DeliveryOptionsItem_NDD .DeliveryOptionDescription');
        let cutoff = new Date();
        cutoff.setUTCHours(13, 0, 0);
        cutoff = cutoff.getTime();

        nextDayDeliveryDesc.innerHTML = 'Get your order <span id="FL004_deliveryDay"></span> if you order in the next <span id="FL004_countdown"></span> (before 2pm)';

        countdown({
          cutoff,
          element: '#FL004_countdown',
          labels: {
            d: 'days',
            h: 'hours',
            m: 'minutes',
            s: '',
          },
          delivery: {
            deliveryDays: 1, // How long an item takes to arrive
            excludeDays: ['Saturday', 'Sunday'], // Non-working days
            deliveryDayElement: '#FL004_deliveryDay',
            tomorrowLabel: true,
          },
        });

        // Prefix with 'on' if label is not 'tomorrow'
        const deliveryDayEl = document.querySelector('#FL004_deliveryDay');
        if (deliveryDayEl.innerText !== 'tomorrow') {
          deliveryDayEl.innerText = `on ${deliveryDayEl.innerText}`;
        }
      },
    },
  };

  Exp.init();
};

export default Run;
