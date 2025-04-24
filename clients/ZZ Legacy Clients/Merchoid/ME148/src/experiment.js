import { fullStory, events, scrollTo } from '../../../../lib/utils';

const Experiment = {
  /**
  * @desc Variation settings. Useful for when multiple variations are developed
  * in a single project so you can just toggle the variation number in production
  */
  settings: {
    ID: 'ME148',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    components.createBasketMessage();
    components.addTheVariationMessage();
    components.addCheckoutButton();
    components.hideMessage();
    components.anchorCheckout();
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
    * @desc create the box message that will show after add to bag
    */
    createBasketMessage: function createBasketMessage() {
      const basketWrapper = document.querySelector('#main-content .large-12.columns');
      const basketMessage = document.createElement('div');
      basketMessage.classList.add('ME148-basket_message');
      basketMessage.innerHTML = '<div class="ME148-basket_text"></div>';
      basketWrapper.insertBefore(basketMessage, basketWrapper.firstChild);
    },
    /**
    * @desc add the message based on the variation
    */
    addTheVariationMessage: function addTheVariationMessage() {
      const { settings } = Experiment;
      const productName = document.querySelector('.woocommerce-message.message-success').textContent.match(/“((?:\\.|[^"\\])*)”/)[0];
      const basketMessageBox = document.querySelector('.ME148-basket_text');
      let basketMessageText;

      switch (settings.VARIATION) {
        case '1':
          basketMessageText = `Niiice Choice! <span class="ME148_productName">${productName}</span> has been added to your cart.`;
          break;
        case '2':
          basketMessageText = `Your Officially Licenced <span class="ME148_productName">${productName}</span> has been added to your cart. Checkout now with <span>free</span> delivery`;
          break;
        case '3':
          basketMessageText = `Get ready to hear "Where did you get that?!" <span class="ME148_productName">${productName}</span> has been added to your cart.`;
          break;
        default:
      }
      basketMessageBox.innerHTML = basketMessageText;
    },
    /**
    * @desc add the new checkout buttons
    */
    addCheckoutButton: function addCheckoutButton() {
      const successMessage = document.querySelector('.woocommerce-message.message-success');
      const newCheckoutButton = document.createElement('div');
      newCheckoutButton.classList.add('ME148-topOptions');
      newCheckoutButton.innerHTML = `
      <a class="ME148-continue_shop" href="#">< Continue Shopping</a>
      <div class="ME148-checkout">Ready to Checkout? <div class="ME148-checkout_button"><span>Checkout Now</span></div>`;
      successMessage.insertAdjacentElement('afterend', newCheckoutButton);

      const backLink = document.querySelector('.message-success a').getAttribute('href');
      document.querySelector('.ME148-continue_shop').setAttribute('href', backLink);
    },
    /**
    * @desc hide the message after 4 seconds
    */
    hideMessage: function hideMessage() {
      const topButtons = document.querySelector('.ME148-topOptions');
      const basketMessage = document.querySelector('.ME148-basket_message');
      setTimeout(() => {
        topButtons.classList.add('ME148-options_showing');
        basketMessage.classList.add('ME148-basket_hidden');
      }, 4000);
    },
    /**
    * @desc anchor down on checkout click
    */
    anchorCheckout: function anchorCheckout() {
      const checkoutButton = document.querySelector('.ME148-checkout_button');
      const paymentButtons = document.getElementById('choose_payment').getBoundingClientRect().y + window.scrollY;
      checkoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        scrollTo(paymentButtons - 200);
      });
    },
  },
};

export default Experiment;
