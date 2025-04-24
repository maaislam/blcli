import { fullStory, events } from '../../../../lib/utils';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'SD065',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    components.topContinueShopping();
    components.deliveryMessage();
    components.discountBox();
    components.bottomContinueShopping();

    services.sendEvents();
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
    /**
     * @desc Add the events
     */
    sendEvents: function sendEvents() {
      // continue shopping event
      const continueShopping = document.querySelectorAll('.SD065-continue_shopping');
      for (let i = 0; i < continueShopping.length; i += 1) {
        const element = continueShopping[i];
        element.addEventListener('click', () => {
          events.send('SD065', 'Click', 'Continue Shopping click', { sendOnce: true });
        });
      }
      const checkoutButton = document.querySelector('.btn-checkout');
      checkoutButton.addEventListener('click', () => {
        events.send('SD065', 'click', 'Continue shopping', { sendOnce: true });
      });
    },
  },

  components: {
    /**
     * @desc Add conitunue shopping button
     */
    topContinueShopping: function topContinueShopping() {
      const pageTitle = document.querySelector('.page-title h1');
      const continueShopping = document.createElement('div');
      continueShopping.classList.add('SD065-continue_shopping');
      continueShopping.innerHTML = '<a href="https://www.salonsdirect.com">Continue Shopping</a>';

      pageTitle.insertAdjacentElement('afterend', continueShopping);
    },
    /**
     * @desc Change message based on delivery price
     */
    deliveryMessage: function deliveryMessage() {
      const delivery = document.querySelector('.basket_free-del-msg span');//
      if (delivery.textContent.indexOf('Why not add some essential') > -1 && delivery.textContent.indexOf('shipping') > -1) {
        const deliverytext = delivery.textContent.match(/[^.]+$/)[0];
        const newText = ' Why not add a few more items to your basket?';

        const newDeliveryMessage = delivery.textContent.replace(deliverytext, newText);
        delivery.textContent = newDeliveryMessage;
      }
    },
    /**
     * @desc Discount box change
     */
    discountBox: function discountBox() {
      const discountCodeBox = document.querySelector('#coupon_code');
      discountCodeBox.setAttribute('placeholder', 'Enter your offer code...');
    },
    /**
     * @desc Second continue shopping button
     */
    bottomContinueShopping: function bottomContinueShopping() {
      const bottomButtons = document.querySelector('.cart-totals .method-checkout-cart-methods-onepage-bottom');
      const currentButton = document.querySelector('.SD065-continue_shopping');
      const newButton = currentButton.cloneNode(true);
      bottomButtons.insertAdjacentElement('beforebegin', newButton);
    },
  },
};

export default Experiment;
