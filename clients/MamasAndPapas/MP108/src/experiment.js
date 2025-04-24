import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';
import { filters } from './lib/MP108-sizes';

const Experiment = {
  /**
  * @desc Variation settings. Useful for when multiple variations are developed
  * in a single project so you can just toggle the variation number in production
  */
  settings: {
    ID: 'MP108',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    components.checkSavings();
    components.giftCardExplanation();
    components.changeQuantityButtons();
    components.homeDeliveryInfo();
    components.sizeGuide();
    components.checkoutButtonChanges();
    components.showVoucherCode();
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
     * @desc Change quantity buttons
     */
    changeQuantityButtons: function changeQuantityButtons() {
      // change quantity buttons
      const basketItem = document.querySelectorAll('.checkout_item');
      [].forEach.call(basketItem, (element) => {
        const minusQuantity = element.querySelector('.ico.ico-chevronLeft');
        const plusQuantity = element.querySelector('.ico.ico-chevronRight');
        plusQuantity.classList.remove('ico-chevronRight');
        plusQuantity.classList.add('ico-plus');
        minusQuantity.classList.remove('ico-chevronLeft');
        minusQuantity.classList.add('ico-minus');
      });
    },
    /**
     * @desc Add gift car explanation
     */
    giftCardExplanation: function giftCardExplanation() {
      const giftCardText = document.createElement('div');
      giftCardText.classList.add('MP108-gift_card_text');
      giftCardText.innerHTML = '<span>You can add or use a gift card at the payment stage of checkout</span>';
      const addTobagButton = document.querySelector('.cartNewButton .col-xs-12.text-right');
      addTobagButton.appendChild(giftCardText);
    },
    /**
     * @desc change the voucher area
     */
    showVoucherCode: function showVoucherCode() {
      const voucherBoxText = document.querySelector('#voucher .vouchermsg');
      voucherBoxText.innerHTML = '<div class="MP108-voucher_title">Voucher Code</div>';

      const voucherBlock = document.querySelector('.redeem-block.pay-block');
      const delivery = document.querySelector('.MP108-home_delivery');
      delivery.insertBefore(voucherBlock, voucherBoxText.nextElementSibling);
    },
    /**
     * @desc check if savings are 0 or make red
     */
    checkSavings: function checkSavings() {
      const savings = document.querySelector('.checkout_savings');
      const price = document.querySelector('.checkout_savings .pull-right').textContent.replace('£', '');
      const savingsPrice = parseInt(price, 0);
      if (savingsPrice === 0) {
        savings.classList.remove('MP108-savings_valid');
      } else {
        savings.classList.add('MP108-savings_valid');
        const minusSaving = document.createElement('span');
        minusSaving.innerHTML = '-';
        const savingsText = savings.querySelector('.pull-right');
        savingsText.insertBefore(minusSaving, savingsText.firstChild);
      }
    },
    /**
    * @desc add home delivery information
    */
    homeDeliveryInfo: function homeDeliveryInfo() {
      // move voucher code to the end
      const bottomBlock = document.querySelector('.row.cartTotalsPromo');
      const voucherCode = document.querySelector('.redeem-block');
      bottomBlock.appendChild(voucherCode);
      const allDeliveryInfo = document.querySelector('.deliveryinfopanel').innerHTML;
      const homeDelivery = document.createElement('div');
      homeDelivery.classList.add('MP108-home_delivery');
      homeDelivery.innerHTML = `<h3>Home Delivery</h3>
      <div class="MP108-deliveryContent"></div>`;
      bottomBlock.insertBefore(homeDelivery, bottomBlock.firstChild);

      document.querySelector('.MP108-deliveryContent').innerHTML = allDeliveryInfo;

      poller([
        () => window.jQuery,
      ], () => {
        // split in to two and add see more delivery options
        const allDeliveryOptionsList = $('.MP108-deliveryContent li');
        for (let i = 0; i < allDeliveryOptionsList.length; i += 4) {
          allDeliveryOptionsList.slice(i, i + 4).wrapAll('<div class="MP108-readMore"></div>');
        }
        const readMoreLink = document.createElement('div');
        readMoreLink.classList.add('MP108-read_more_link');
        readMoreLink.textContent = 'More delivery options +';
        document.querySelector('.MP108-deliveryContent').appendChild(readMoreLink);

        readMoreLink.addEventListener('click', () => {
          const readMoreOptions = document.querySelectorAll('.MP108-readMore')[1];
          if (readMoreOptions.classList.contains('MP108-moreDeliver_showing')) {
            readMoreOptions.classList.remove('MP108-moreDeliver_showing');
          } else {
            readMoreOptions.classList.add('MP108-moreDeliver_showing');
          }
          if (readMoreLink.textContent === 'More delivery options +') {
            readMoreLink.textContent = 'Less delivery options -';
          } else {
            readMoreLink.textContent = 'More delivery options +';
          }
        });
      });
    },
    /**
     * @desc add the size guide
     */
    sizeGuide: function sizeGuide() {
      const filterObj = filters;
      const basketItem = document.querySelectorAll('.checkout_item');
      [].forEach.call(basketItem, (element) => {
        const elementURL = element.querySelector('.checkout_thumb a').getAttribute('href');
        const elementHREF = elementURL.substr(elementURL.length - 2); // last 2 digits
        for (let i = 0; i < Object.keys(filterObj).length; i += 1) {
          const data = Object.entries(filterObj)[i];
          const sizeID = data[1].linkURL;
          const sizeName = data[1].title;
          if (elementHREF.indexOf(sizeID) > -1) {
            const sizeChosen = document.createElement('div');
            sizeChosen.classList.add('MP108-size_chosen');
            sizeChosen.innerHTML = `<div class="M108-size_text">${sizeName}</div>`;
            element.querySelector('.cart-item-name').appendChild(sizeChosen);
          }
        }
      });
    },
    /**
     * @desc checkout button changes
     */
    checkoutButtonChanges: function checkoutButtonChanges() {
      const redeemBlock = document.querySelector('.redeem-block');
      const checkoutButtonWrapper = document.querySelector('.yCmsContentSlot.row.pb-6');
      redeemBlock.insertAdjacentElement('afterend', checkoutButtonWrapper);

      // move cards below CTA
      const paymentCards = document.querySelector('.cartNewButton .col-xs-12.pt-2.pb-4');
      document.querySelector('.MP108-gift_card_text').insertAdjacentElement('afterend', paymentCards);
    },
  },
};

export default Experiment;
