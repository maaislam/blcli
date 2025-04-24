import { fullStory, events, scrollTo } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME163',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const url = window.location.href;
    if (url.indexOf('cart') > -1) {
      poller(['.woocommerce-message.message-success'], () => {
        components.scarcityMessage();
        components.addCheckoutButton();
        components.hideMessage();
        components.anchorCheckout();
        if (sessionStorage.getItem('ME163stock') && parseFloat(document.querySelector('.cart-icon strong').textContent) === 1) {
          components.addStockToBasket();
        }
      });
    }
    if (url.indexOf('product') > -1) {
      poller(['#merchoid-scarcity-message'], () => {
        components.stockLevel();
      });
    }
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
    * @desc Store the stock amount from the product page scarcity message
    */
    stockLevel: function stockLevel() {
      const basketButton = document.querySelector('.single_add_to_cart_button.button');
      const stockLevelText = document.querySelector('#merchoid-scarcity-message');
      const stockLevelAmount = stockLevelText.textContent.match(/\d+/);

      basketButton.addEventListener('click', () => {
        sessionStorage.setItem('ME163stock', stockLevelAmount);
      });
    },
    /**
     * @desc Add new scarcity message
     */
    scarcityMessage: function scarcityMessage() {
      const topOfBasket = document.querySelector('#main-content .large-12.columns');
      const productName = document.querySelector('.woocommerce-message.message-success').textContent.match(/“((?:\\.|[^"\\])*)”/)[0];
      const newMessage = document.createElement('div');
      newMessage.classList.add('ME163-basketMessage');
      newMessage.innerHTML = `<span>Phew! You’ve managed to snag one of the final ${productName}</span>`;

      topOfBasket.insertBefore(newMessage, topOfBasket.firstChild);
    },
    /**
    * @desc add the new checkout buttons
    */
    addCheckoutButton: function addCheckoutButton() {
      const successMessage = document.querySelector('.woocommerce-message.message-success');
      const newCheckoutButton = document.createElement('div');
      newCheckoutButton.classList.add('ME163-topOptions');
      newCheckoutButton.innerHTML = `
      <a class="ME163-continue_shop" href="#">< Continue Shopping</a>
      <div class="ME163-checkout">Ready to Checkout? <div class="ME163-checkout_button"><span>Checkout Now</span></div>`;
      successMessage.insertAdjacentElement('afterend', newCheckoutButton);

      const backLink = document.querySelector('.message-success a').getAttribute('href');
      document.querySelector('.ME163-continue_shop').setAttribute('href', backLink);
    },
    /**
    * @desc hide the message after 4 seconds
    */
    hideMessage: function hideMessage() {
      const topButtons = document.querySelector('.ME163-topOptions');
      const basketMessage = document.querySelector('.ME163-basketMessage');
      setTimeout(() => {
        topButtons.classList.add('ME163-options_showing');
        basketMessage.classList.add('ME163-basket_hidden');
      }, 4000);
    },
    /**
    * @desc anchor down on checkout click
    */
    anchorCheckout: function anchorCheckout() {
      const checkoutButton = document.querySelector('.ME163-checkout_button');
      const paymentButtons = document.getElementById('choose_payment').getBoundingClientRect().y + window.scrollY;
      checkoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        scrollTo(paymentButtons - 200);
      });
    },
    /**
    * @desc add stock amount to the basket item
    */
    addStockToBasket: function addStockToBasket() {
      const firstBasketItem = document.querySelector('.cart_item');
      firstBasketItem.classList.add('ME163-first_basketitem');

      const stockLevel = sessionStorage.getItem('ME163stock');
      const newStockMessage = document.createElement('div');
      newStockMessage.classList.add('ME163-stockamount');
      newStockMessage.innerHTML = `Limited Stock! Less than ${stockLevel} available`;

      firstBasketItem.appendChild(newStockMessage);
    },
  },
};

export default Experiment;
