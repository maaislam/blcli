import { fullStory, events } from '../../../../lib/utils';
import MP108forMP115 from './lib/MP108mobile/MP108';
import MP100forMP115 from './lib/MP100desktop/MP100';
import { poller } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP115',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const isMobile = window.innerWidth < 1024;

    if (isMobile) {
      MP108forMP115.init();
      poller(
        ['.MP108-voucher_title', '.redeemForm'],
        () => {
          components.basketItemChanges();
          components.reduceDeliveryTextMobile();
          components.addVoucherText();
          components.moveVoucherText();
          components.changeTitlesMobile();
          components.freeDelivery();
        },
      );
    } else {
      console.log('is not mobile');
      MP100forMP115.init();

      poller(
        ['.MP100-deliveryContent'],
        () => {
          components.basketItemChanges();
          components.reduceDeliveryTextDesktop();
          components.addVoucherText();
          components.changeTitlesDesktop();
          components.moveVoucherButton();
          components.moveVoucherText();
          components.freeDelivery();
          components.addpromoSavings();
        },
      );
    }
    services.sendTestEvents();
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
     * @desc Inits all page level tracking
     */
    sendTestEvents() {
      const applyVoucherButton = document.querySelector('.form-actions.redeem-btn button');
      applyVoucherButton.addEventListener('click', () => {
        events.send('MP115', 'Clicked', '"Apply now" on promotional code', { sendOnce: true });
      });

      const applyVoucherBox = document.querySelector('.redeemForm input');
      applyVoucherBox.addEventListener('click', () => {
        events.send('MP115', 'Clicked', '"enter promo code" box', { sendOnce: true });
      });
    },
  },

  components: {
    /**
     * @desc Add free delivery if qualify
     */
    freeDelivery: function freeDelivery() {
      let isFurniture;
      // loop through basket items check it's not furniture
      const basketItems = window.universal_variable.basket.line_items;
      for (let index = 0; index < basketItems.length; index += 1) {
        const element = basketItems[index];
        const itemCat = element.product.category;
        if (itemCat === 'Furniture Sets') {
          isFurniture = true;
          break;
        } else {
          isFurniture = false;
        }
      }
      const freeDeliveryAmount = 50;
      const totalPrice = window.universal_variable.basket.total;

      const basketTotalBox = document.querySelector('.checkout_orderTotal .checkout_savings');
      const freeDeliveryText = document.createElement('div');
      freeDeliveryText.classList.add('MP115-free_delivery');
      freeDeliveryText.innerHTML = `
      <div class="MP115-delivery clearLeft pb-1 text-gray">
        <span>Delivery:</span>
        <span class="pull-right">FREE</span>
      </div>`;

      if (totalPrice > freeDeliveryAmount && isFurniture === false) {
        basketTotalBox.insertAdjacentElement('afterend', freeDeliveryText);
      }
    },
    /**
   * @desc loop through the elements and change
   */
    basketItemChanges: function basketItemChanges() {
      const basketItems = document.querySelectorAll('.checkout_item.cartItem');
      for (let i = 0; i < basketItems.length; i += 1) {
        const element = basketItems[i];

        // change home delivery text
        const homeDeliveryText = element.querySelector('.home-delihover .home-d');
        homeDeliveryText.nextElementSibling.textContent = 'including delivery to a collection point';
        homeDeliveryText.previousElementSibling.textContent = 'Home Delivery';

        // if click & collect is disabled
        const collectUnavailable = element.querySelector('.changeStoreLink .ico.ico-crossCircle');
        if (collectUnavailable) {
          element.classList.add('MP115-no_collect');
          element.querySelector('.changeStoreLink').textContent = 'Click and Collect not available on this product';
        }
      }
    },
    /**
     * @desc Change the voucher title
     */
    changeTitlesMobile: function changeTitlesMobile() {
      const voucherTitle = document.querySelector('.MP108-voucher_title');
      voucherTitle.textContent = 'Add a promotional code';
      document.querySelector('.redeemForm .controls input').setAttribute('placeholder', 'Enter a Promotional Code');
    },
    changeTitlesDesktop: function changeTitlesDesktop() {
      const voucherTitle = document.querySelector('.MP100-voucher_title');
      voucherTitle.textContent = 'Add a promotional code';
      document.querySelector('.redeemForm .controls input').setAttribute('placeholder', 'Enter a Promotional Code');
    },
    moveVoucherText: function moveVoucherText() {
      const voucherText = document.querySelector('.row.item_container_holder.promo');
      if (voucherText) {
        document.querySelector('#redeemVoucherForm .redeemForm.row').appendChild(voucherText);
        const voucherSuccess = document.querySelector('.cart-promotions-applied');
        const voucherConfirm = document.createElement('span');
        voucherConfirm.classList.add('MP115-success');
        voucherConfirm.innerHTML = '<i class="ico ico-tickCircle"></i> All done! Your code has been applied.</p>';
        voucherSuccess.insertAdjacentElement('beforebegin', voucherConfirm);

        // move title of promo discount
        const promoTitle = document.querySelector('.promo .title_holder');
        document.querySelector('.MP115-success').insertAdjacentElement('afterend', promoTitle);
      }
    },
    /**
     * @desc reduce the delivery amount
     */
    reduceDeliveryTextMobile: function reduceDeliveryTextMobile() {
      const deliveryText = document.querySelector('.MP108-readMore');
      const nextDay = deliveryText.querySelector('li:nth-child(3)');

      const deliveryTextHidden = document.querySelector('.MP108-readMore:last-child');
      deliveryTextHidden.insertBefore(nextDay, deliveryTextHidden.firstChild);
    },
    reduceDeliveryTextDesktop: function reduceDeliveryTextDesktop() {
      const deliveryText = document.querySelector('.MP100-readMore');
      const nextDay = deliveryText.querySelector('li:nth-child(3)');

      const deliveryTextHidden = document.querySelector('.MP100-readMore:last-child');
      deliveryTextHidden.insertBefore(nextDay, deliveryTextHidden.firstChild);
    },
    /**
     * @desc reduce the delivery amount
     */
    addVoucherText: function addVoucherText() {
      const giftCardText = document.createElement('span');
      giftCardText.classList.add('MP115-gift_cardtext');
      giftCardText.innerHTML = 'Gift card credit may be added in the checkout';

      const voucherBox = document.querySelector('.redeemForm input');
      voucherBox.insertAdjacentElement('afterend', giftCardText);
    },
    /**
     * @desc Move voucher button
     */
    moveVoucherButton: function moveVoucherButton() {
      const voucherInput = document.querySelector('.cart-redeem-block .controls input');
      const voucherButton = document.querySelector('.form-actions.redeem-btn');
      voucherInput.insertAdjacentElement('afterend', voucherButton);
    },
    /**
     * @desc Add the voucher savings
     */
    addpromoSavings: function addpromoSavings() {
      const voucherAdded = document.querySelector('.cart-promotions-applied');
      if (voucherAdded) {
        /* eslint-disable */
        const voucherPriceSaving = voucherAdded.textContent.match(/\£\s*[0-9,]+(?:\s*\.\s*\d{2})?/g)[0];
        /* eslint-enable */

        const promoSavings = document.createElement('div');
        promoSavings.classList.add('MP115-promo_saving');
        promoSavings.innerHTML = `<span>Promo Saving:</span><span class="pull-right">- ${voucherPriceSaving}</span>`;

        document.querySelector('.checkout_savings').insertAdjacentElement('beforebegin', promoSavings);

        // change savings label
        const savingsTitle = document.querySelector('.checkout_savings span:first-child');
        savingsTitle.textContent = 'Product Savings';

        // change total price to remove voucher price
        const totalSavings = document.querySelector('.checkout_savings .pull-right');

        const parsedVoucherPrice = parseFloat(voucherPriceSaving.replace('£', ''));
        const parsedSavingsPrice = parseFloat(totalSavings.textContent.trim().replace('-', '').replace('£', ''));
        const totalSavingsPrice = (parsedSavingsPrice - parsedVoucherPrice);

        totalSavings.textContent = `- £${totalSavingsPrice.toFixed(2)}`;
      }
    },
  },
};

export default Experiment;
