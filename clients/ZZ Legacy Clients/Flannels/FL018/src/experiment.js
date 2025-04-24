import { countdown } from '../../../../lib/uc-lib';
import { fullStory, events } from '../../../../lib/utils';

/**
 * FL018 - FL004 Iteration
 */
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL018',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      // FL018 Cache
      // Cross-device selectors
      const FL018SDContainer = bodyVar.querySelector('#DeliveryOptionsList > .DeliveryOptionsItem_STD');
      const FL018NextDayText = bodyVar.querySelector('#DeliveryOptionsList > .DeliveryOptionsItem_NDD .DeliveryOptionName');
      const FL018SDButton = bodyVar.querySelector('#DeliveryOptionsList > .DeliveryOptionsItem_STD > label');
      // Desktop Selectors
      const FL018TermsErrorMessageDesktop = bodyVar.querySelector('#dnn_ctr102498_Delivery_GoodsSupplyTerms1_cvlGoodsSupplyTermsAndConditions');
      const FL018TermsBoxDesktop = bodyVar.querySelector('#dnn_ctr102498_Delivery_GoodsSupplyTerms1_divGoodsSupplyTermsAndConditions');
      const FL018ContinueButtonDesktop = bodyVar.querySelector('#dnn_ctr102498_Delivery_btnContinue');
      const FL018TermsTextDesktop = bodyVar.querySelector('#dnn_ctr102498_Delivery_GoodsSupplyTerms1_lblGoodsSupplyTermsAndConditions');
      // Mobile/Tablet Selectors
      const FL018TermsErrorMessageMT = bodyVar.querySelector('#dnn_ctr102498_Delivery_DeliveryGroupSelection_GoodsSupplyTerms_cvlGoodsSupplyTermsAndConditions');
      const FL018TermsBoxMT = bodyVar.querySelector('#dnn_ctr102498_Delivery_DeliveryGroupSelection_GoodsSupplyTerms_divGoodsSupplyTermsAndConditions');
      const FL018ContinueButtonMT = bodyVar.querySelector('#dnn_ctr102498_Delivery_DeliveryGroupSelection_btnContinue');
      const FL018TermsTextMT = bodyVar.querySelector('#dnn_ctr102498_Delivery_DeliveryGroupSelection_GoodsSupplyTerms_lblGoodsSupplyTermsAndConditions');
      return {
        bodyVar,
        FL018SDContainer,
        FL018SDButton,
        FL018NextDayText,
        FL018TermsErrorMessageDesktop,
        FL018TermsBoxDesktop,
        FL018ContinueButtonDesktop,
        FL018TermsTextDesktop,
        FL018TermsErrorMessageMT,
        FL018TermsBoxMT,
        FL018ContinueButtonMT,
        FL018TermsTextMT,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;
      events.analyticsReference = '_gaUAT';
      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
      const hide = document.getElementById(`${settings.ID}_flickerPrevention`);
      hide.parentElement.removeChild(hide);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
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
        // Click standard delivery option on load
        Exp.cache.FL018SDButton.click();
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
          events.send('FL018', 'Click', 'Clicked Standard Delivery');
          setTimeout(() => {
            throttleStandard = false;
          }, 400);
        });

        let throttleNextDay = false;
        nextDayDelivery.addEventListener('click', () => {
          if (throttleNextDay) return false;
          throttleNextDay = true;
          events.send('FL018', 'Click', 'Clicked Next Day Delivery');
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

        // FL018 code starts here
        // Insert markup after standard delivery option
        Exp.cache.FL018SDContainer.insertAdjacentHTML('afterend', `
        <p class="FL018-Between-Options-Text">Or</p>
        `);
        // Change text content of next day delivery
        Exp.cache.FL018NextDayText.textContent = 'Upgrade to Next Day Delivery';
        // Insert next day delivery subtext
        Exp.cache.FL018NextDayText.insertAdjacentHTML('afterend', `
        <span class="FL018-Next-Day-Delivery-Sub-Text">for just an extra +£4.00</span>
        `);
        // Move accept terms checkbox and error message to below continue securley button
        Exp.cache.FL018ContinueButtonDesktop.insertAdjacentElement('afterend', Exp.cache.FL018TermsBoxDesktop);
        Exp.cache.FL018ContinueButtonDesktop.insertAdjacentElement('afterend', Exp.cache.FL018TermsErrorMessageDesktop);
        Exp.cache.FL018ContinueButtonMT.insertAdjacentElement('afterend', Exp.cache.FL018TermsBoxMT);
        Exp.cache.FL018ContinueButtonMT.insertAdjacentElement('afterend', Exp.cache.FL018TermsErrorMessageMT);
        // Add extra text to terms link - a tag nested, using childnodes nodevalue
        Exp.cache.FL018TermsTextDesktop.childNodes[0].nodeValue = 'supplied by Flannels on behalf of Wareshop2 Limited - I accept the ';
        Exp.cache.FL018TermsTextMT.childNodes[0].nodeValue = 'supplied by Flannels on behalf of Wareshop2 Limited - I accept the ';
      },
    },
  };

  Exp.init();
};

export default Run;
