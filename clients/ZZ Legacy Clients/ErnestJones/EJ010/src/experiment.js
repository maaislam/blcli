import { fullStory, events } from '../../../../lib/utils';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'EJ010',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);

    components.continueShopping();
    components.moveItems();
    components.deliveryTimes();
    components.giftOptions();
    components.orderQualifies();
    components.showHideVoucher();
    components.addOrText();
    components.bottomDeliveryText();

    services.sendEvents();
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
    /**
     * @desc Events to be tracked
     */
    sendEvents() {
      const { settings } = Experiment;
      const checkoutNowButton = document.querySelector('#lower-button-group .cta--basket');
      const paypalButton = document.querySelector('#lower-button-group .cta--basket-paypal-button');
      const interestFree = document.querySelector('#lower-button-group .cta--basket.cta--secondary.ifcBuyButton');

      checkoutNowButton.addEventListener('click', () => {
        events.send(settings.ID, 'Clicked', `Checkout Now button - Variation ${settings.VARIATION}`);
      });
      paypalButton.addEventListener('click', () => {
        events.send(settings.ID, 'Clicked', `Paypal button - Variation ${settings.VARIATION}`);
      });
      if (interestFree) {
        interestFree.addEventListener('click', () => {
          events.send(settings.ID, 'Clicked', `Interest Free - Variation ${settings.VARIATION}`);
        });
      }

      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc Add the continue shopping button
     */
    continueShopping: function continueShopping() {
      const continueShoppingButton = document.createElement('div');
      continueShoppingButton.classList.add('EJ010-continue');
      continueShoppingButton.innerHTML = '<span>Continue Shopping</span>';

      document.querySelector('.container .logo').insertAdjacentElement('afterend', continueShoppingButton);

      document.querySelector('.EJ010-continue').addEventListener('click', () => {
        document.querySelector('.cta--secondary.js-continue-shopping').click();
      });
    },

    /**
     * @desc Rearrange items on the page e.g move the item count next to basket title
     */
    moveItems: function moveItems() {
      const pageTitle = document.querySelector('.page-title');
      const basketCount = document.querySelector('.basket-table__header-item-count');
      pageTitle.insertAdjacentElement('afterend', basketCount);

      // Move the price in the basket items below the SKU
      const basketItems = document.querySelectorAll('.product-summary');
      for (let index = 0; index < basketItems.length; index += 1) {
        const element = basketItems[index];
        const itemPrice = element.querySelector('.product-summary__right');
        const productSku = element.querySelector('.product-summary__sku');
        if (productSku) {
          productSku.insertAdjacentElement('afterend', itemPrice);
        }

        if (element.querySelector('.product-summary__description').textContent === 'Gift options') {
          element.classList.add('EJ010-gift');
        }
      }
    },

    /**
     * @desc Add delivery times
     */
    deliveryTimes: function deliveryTimes() {
      const deliveryText = document.createElement('div');
      deliveryText.classList.add('EJ010-delivery');
      deliveryText.innerHTML = '<h2>Call us on 0800 458 1066</h2><p>9am - 5.30pm Monday - Friday, 9am - 1.00pm Saturdays</p>';

      document.querySelector('.basket__button-row').insertAdjacentElement('afterend', deliveryText);
    },
    /**
     * @desc Rearrange the gift option block
     */
    giftOptions: function giftOptions() {
      const giftOptionBlock = document.querySelector('.EJ010-gift').innerHTML;
      const newGiftBlock = document.createElement('div');
      newGiftBlock.classList.add('EJ010-gift_option');
      newGiftBlock.innerHTML = giftOptionBlock;

      document.querySelector('.basket-table').insertAdjacentElement('afterend', newGiftBlock);
    },

    /**
     * @desc Add what the order qualifies for from EJ007
     */
    orderQualifies: function orderQualifies() {
      const qualifiesBlock = document.createElement('div');
      qualifiesBlock.classList.add('EJ010-order_qualified');
      qualifiesBlock.innerHTML = `
      <span>Your order qualifies for:</span>
      <div class="EJ010-qualified">
        <p class="EJ010-nextDay"></p>
        <p class="EJ010-freeDelivery"></p>
        <p class="EJ010-freeCredit"></p>
        <p class="EJ010-100Off"></p>
      </div>`;

      document.querySelector('.order-summary__container').insertAdjacentElement('afterend', qualifiesBlock);

      const financeButton = document.querySelector('.cta--basket.cta--secondary.ifcBuyButton');

      const totalPrice = parseFloat(document.querySelector('.order-summary__total-value').textContent.replace('£', ''));
      if (totalPrice > 499) {
        document.querySelector('.EJ010-nextDay').textContent = 'FREE next day delivery';
      }

      // if finance button exists
      if (financeButton) {
        document.querySelector('.EJ010-freeCredit').textContent = '0% Interest Free Credit';
      }

      // loop through the list of messages to check if free delivery exists
      const messageList = document.querySelectorAll('.basket__messages-container .message-list__item');
      if (messageList) {
        for (let i = 0; i < messageList.length; i += 1) {
          const element = messageList[i];
          if (element.textContent.indexOf('FREE delivery or FREE delivery to any Ernest Jones store') > -1) {
            document.querySelector('.EJ010-freeDelivery').textContent = 'Free delivery to any Ernest Jones store';
          }
          if (element.textContent.indexOf('You will receive a £100 voucher off your next order.') > -1) {
            document.querySelector('.EJ010-100Off').textContent = 'You will receive £100 off your next order';
          }
        }
      }
      // remove if no qualifying
      if (document.querySelector('.EJ010-qualified').textContent.trim().replace(/\s/g, '') === '') {
        document.querySelector('.EJ010-qualified').style.display = 'none';
        document.querySelector('.EJ010-order_qualified span').style.display = 'none';
      }
    },
    /**
     * @desc Hide the voucher
     */
    showHideVoucher: function showHideVoucher() {
      // move the voucher box below total
      const orderQualifyBox = document.querySelector('.EJ010-order_qualified');
      const voucherBox = document.querySelector('.basket__promo-code');
      orderQualifyBox.insertBefore(voucherBox, orderQualifyBox.firstChild);

      // show/hide the voucher
      const voucherLink = document.createElement('div');
      voucherLink.classList.add('EJ010-voucher');
      voucherLink.innerHTML = '+ Apply voucher code';
      voucherBox.insertBefore(voucherLink, voucherBox.firstChild);

      document.querySelector('.EJ010-voucher').addEventListener('click', () => {
        if (voucherBox.querySelector('.accordion.js-signet-accordion').classList.contains('EJ010-voucher_show')) {
          voucherBox.querySelector('.accordion.js-signet-accordion').classList.remove('EJ010-voucher_show');
        } else {
          voucherBox.querySelector('.accordion.js-signet-accordion').classList.add('EJ010-voucher_show');
        }
      });
    },
    /**
     * @desc add 'or' in between the CTAs and the card icons
     */
    addOrText: function addOrText() {
      const ctaButtons = document.querySelectorAll('.basket__button-row .cta--basket');
      for (let i = 0; i < ctaButtons.length; i += 1) {
        const element = ctaButtons[i];

        const orText = document.createElement('div');
        orText.classList.add('EJ010-or');
        orText.innerText = '- OR -';

        element.insertAdjacentElement('afterend', orText);
      }

      const checkoutButton = document.querySelector('#checkout-form-2 .cta--basket');
      const checkoutIcons = document.createElement('div');
      checkoutIcons.classList.add('EJ010-payment_types');
      checkoutButton.insertAdjacentElement('afterend', checkoutIcons);
    },
    /**
   * @desc bottom delivery text and norton logo
   */
    bottomDeliveryText: function bottomDeliveryText() {
      const deliveryText = document.createElement('div');
      deliveryText.classList.add('EJ010-deliveryBottom');
      deliveryText.innerHTML = `<p>Your order should arrive in 3 - 6 days (excluding sundays) between 9am and 5pm</p>
      <p>You will be provided with estimated delivery dates for your order in checkout</p>
      <div class="EJ010-norton"></div>`;
      document.querySelector('#lower-button-group').insertAdjacentElement('afterend', deliveryText);
    },
  },
};

export default Experiment;
