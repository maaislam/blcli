import { fullStory, events } from '../../../../lib/utils';

const Experiment = {
  /**
  * @desc Variation settings. Useful for when multiple variations are developed
  * in a single project so you can just toggle the variation number in production
  */
  settings: {
    ID: 'MP095',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);

    if (settings.VARIATION === '1') {
      components.addBasketQuantity();
    } else if (settings.VARIATION === '2') {
      components.addTotalToBasket();
      components.addBasketQuantity();
    }
  },

  services: {
    /**
    * @desc Inits all page level tracking
    */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
    * @desc check if there is anything in the basket
    */
    addBasketQuantity: function addBasketQuantity() {
      const basketItem = window.universal_variable.basket.line_items.length;
      if (basketItem > 0) {
        const basketIcon = document.querySelector('.header_icon.ico.ico-bag');
        const basketItemAmount = document.createElement('div');
        basketItemAmount.classList.add('MP095-basket_amount');
        basketItemAmount.innerHTML = `<span>${basketItem}</span>`;

        basketIcon.appendChild(basketItemAmount);
      }
    },
    /**
    * @desc add the basket total on V2
    */
    addTotalToBasket: function addTotalToBasket() {
      const price = window.universal_variable.basket.total;
      if (price > 0) {
        const basketIcon = document.querySelector('.header_nav .no_hover:last-child');
        const basketTotal = document.querySelector('.basket_checkout .price').textContent;
        const totalOnBasket = document.createElement('div');
        totalOnBasket.classList.add('MP095-basket_total');
        totalOnBasket.innerHTML = `Total: <span>${basketTotal}</span>`;
        basketIcon.appendChild(totalOnBasket);

        const windowSize = window.innerWidth;
        // move location icon to fit it on
        if (windowSize < 370) {
          const locationIcon = document.querySelector('.header_nav .col-xs-4.text-right.pt-sm-3:last-of-type a.no_hover:nth-of-type(1)');
          document.querySelector('.header_nav .col-xs-4.pt-sm-3:first-of-type').appendChild(locationIcon);
        }
      }
    },
  },
};

export default Experiment;
