import { fullStory, events } from '../../../../lib/utils';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ003',
    VARIATION: '{{VARIATION}}',
  },

  cache: {
    pizzas: [
      'Premium Hawaiian', 'American Hot', 'Sausage & Pepperoni - The Papa\'s Favourite', 'Chicken Club', 'Papa\'s Double Pepperoni', 'Chicken BBQ', 'BBQ Chicken Classic', 'The Works™', 'All the Meats™', 'The Mexican', 'The Greek', 'Garden Party', 'Hot Pepper Passion', 'Cheese & Tomato', 'BBQ Cheeseburger', 'BBQ Hog Roast', 'Great British BBQ',
    ],
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    // run on all pages if basket is clicked
    /* eslint-disable */
    window.prm.add_pageLoaded(function (sender, error) {
      try {
        // const target = sender._postBackSettings.asyncTarget;
       // if (target === 'ctl00$_objHeader$lbBasketItem') {
          const basket = document.getElementById('ctl00__objHeader_BasketSection');
          const basketDeal = document.getElementById('ctl00__objHeader_divDiscount');
          const thirtyoff = basketDeal.querySelector('.discountCont .item').textContent;
    
          if (thirtyoff.indexOf('30% off Pizzas Online') > -1) {
            components.checkThirtyOff();
            components.addPriceDifference();
            components.checkoutButtonevent();

            events.send('PJ003', 'checkout click', 'PJ003 - V1 Opened basket with 30% offer added', { sendOnce: true });
          }
       // }
      } catch (e) {}
    });

    /* CHECKOUT PAGE */
    
    window.prm.add_pageLoaded(function (sender, error) {
      try {
        if (window.location.pathname.indexOf('/basket-confirmation.aspx') > -1) {
          const thirtyoff = document.querySelectorAll('.discountRow td');
          for (let index = 0; index < thirtyoff.length; index += 1) {
            const element = thirtyoff[index];
            if(element.textContent.trim().indexOf('30% off Pizzas Online') > -1){
              components.checkThirtyOffCheckout();
            components.addPriceDifferenceonCheckout();
            components.checkoutPageEvent();
            }
          }
        }
      } catch (e) {}
    });
    /* eslint-enable */
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc everything to be ran when the mini basket is opened
     * check if the basket does have 33% off, add class to the pizzas
     */

    checkThirtyOff: () => {
      const { cache } = Experiment;

      const basketItems = document.querySelectorAll('.itemCont');
      // loop through the pizza names
      for (let x = 0; x < cache.pizzas.length; x += 1) {
        const pizzaName = cache.pizzas[x];

        // loop through all basket items to check one is a pizza
        for (let i = 0; i < basketItems.length; i += 1) {
          const item = basketItems[i];
          const itemName = item.querySelector('.item').textContent.trim().replace(/ *\([^)]*\) */g, '');

          // if item matches any in the pizza list add class
          if (pizzaName === itemName) {
            item.classList.add('PJ003-isPizza');
          }
        }
      }
    },
    /**
     * @desc calculate the price diffrences for the pizzas
     */
    addPriceDifference: () => {
      const pizzaInBasket = document.querySelectorAll('.PJ003-isPizza');
      for (let index = 0; index < pizzaInBasket.length; index += 1) {
        const existingPizza = pizzaInBasket[index];

        const pizzaPrices = existingPizza.querySelector('.value');
        pizzaPrices.classList.add('PJ003-wasprice');

        const oldPrice = parseFloat(pizzaPrices.textContent.replace('£', ''));
        const priceSum = (30.00 / 100) * oldPrice;
        const newPrice = oldPrice - priceSum;

        // add the new price next to the old one
        const newPriceWrap = document.createElement('div');
        newPriceWrap.classList.add('PJ003-newprice');
        newPriceWrap.innerHTML = `<span>£${newPrice.toFixed(2)}</span>`;

        const removeLink = existingPizza.querySelector('.redLink');

        existingPizza.insertBefore(newPriceWrap, removeLink.nextSibling);
      }
    },

    checkoutButtonevent: () => {
      const checkoutButton = document.querySelector('.basketItems .greenButton.checkOutOmnibar');
      checkoutButton.addEventListener('click', () => {
        events.send('PJ003', 'checkout click', 'PJ003 - V1 clicked checkout in mini basket');
      });
    },

    /* checkout page functions */
    checkThirtyOffCheckout: () => {
      const { cache } = Experiment;

      const basketCheckoutItems = document.querySelectorAll('#ctl00_cphBody_divBasket tr');

      for (let index = 0; index < cache.pizzas.length; index += 1) {
        const element = cache.pizzas[index];
        // loop through all basket items to check one is a pizza
        for (let i = 0; i < basketCheckoutItems.length; i += 1) {
          const item = basketCheckoutItems[i];
          const pizzaName = item.querySelector('.pizzaName');
          if (pizzaName) {
            const itemName = pizzaName.textContent.trim().replace(/ *\([^)]*\) */g, '');
            if (element === itemName) {
              item.classList.add('PJ003-ischeckoutPizza');
            }
          }
        }
      }
    },
    addPriceDifferenceonCheckout: () => {
      const pizzaInBasket = document.querySelectorAll('.PJ003-ischeckoutPizza');
      for (let index = 0; index < pizzaInBasket.length; index += 1) {
        const existingPizza = pizzaInBasket[index];

        const pizzaPrices = existingPizza.querySelector('td:last-child');
        pizzaPrices.classList.add('PJ003-wasprice_checkout');

        const oldPrice = parseFloat(pizzaPrices.textContent.replace('£', ''));
        const priceSum = (30.00 / 100) * oldPrice;
        const newPrice = oldPrice - priceSum;

        // add the new price next to the old one
        const newPriceWrap = document.createElement('td');
        newPriceWrap.classList.add('PJ003-newprice_checkout');
        newPriceWrap.innerHTML = `<span>£${newPrice.toFixed(2)}</span>`;

        existingPizza.insertBefore(newPriceWrap, pizzaPrices.nextSibling);
      }
    },

    checkoutPageEvent: () => {
      const checkoutPageButton = document.getElementById('ctl00_cphBody_lbProceed');
      checkoutPageButton.addEventListener('click', () => {
        events.send('PJ003', 'checkout click', 'PJ003 - V1 clicked checkout on main basket');
      });
    },
  },
};

export default Experiment;
