import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';
import { filters } from './lib/MP100-sizes';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP100',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;

    services.tracking();
    document.body.classList.add(settings.ID);
    components.smallUXchanges();
    components.showVoucherCode();
    components.homeDeliveryInfo();
    components.checkSavings();
    components.sizeGuide();
    components.giftCardExplanation();
    components.checkoutButtonChanges();
  },
  /* put outside functions in here */
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
     * @desc Small UX changes
     */
    smallUXchanges: function smallUXchanges() {
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
     * @desc change the voucher area
     */
    showVoucherCode: function showVoucherCode() {
      const voucherBoxText = document.querySelector('#voucher .vouchermsg');
      voucherBoxText.innerHTML = '<div class="MP100-voucher_title">Voucher Code</div>';
    },
    /**
     * @desc check if savings are 0 or make red
     */
    checkSavings: function checkSavings() {
      const savings = document.querySelector('.checkout_savings');
      const price = document.querySelector('.checkout_savings .pull-right').textContent.replace('£', '');
      const savingsPrice = parseInt(price, 0);
      if (savingsPrice === 0) {
        savings.classList.remove('MP100-savings_valid');
      } else {
        savings.classList.add('MP100-savings_valid');
        const minusSaving = document.createElement('span');
        minusSaving.innerHTML = '-';
        const savingsText = savings.querySelector('.pull-right');
        savingsText.insertBefore(minusSaving, savingsText.firstChild);
      }
    },
    /**
     * @desc add the size guide
     */
    sizeGuide: function sizeGuide() {
      const filterObj = filters;
      const basketItem = document.querySelectorAll('.checkout_item');
      [].forEach.call(basketItem, (element) => {
        const elementURL = element.querySelector('.cart-item-name-product-url').getAttribute('href');
        const elementHREF = elementURL.substr(elementURL.length - 2); // last 2 digits
        for (let i = 0; i < Object.keys(filterObj).length; i += 1) {
          const data = Object.entries(filterObj)[i];
          const sizeID = data[1].linkURL;
          const sizeName = data[1].title;
          if (elementHREF.indexOf(sizeID) > -1) {
            const sizeChosen = document.createElement('div');
            sizeChosen.classList.add('MP100-size_chosen');
            sizeChosen.innerHTML = `<div class="M100-size_text">${sizeName}</div>`;
            element.querySelector('.cart-item-name').appendChild(sizeChosen);
          }
        }
      });
    },
    /**
     * @desc Add gift car explanation
     */
    giftCardExplanation: function giftCardExplanation() {
      const giftCardText = document.createElement('div');
      giftCardText.classList.add('MP100-gift_card_text');
      giftCardText.innerHTML = '<span>You can add or use a gift card at the payment stage of checkout</span>';
      const addTobagButton = document.querySelector('.cartNewButton .col-xs-12.text-right');
      addTobagButton.appendChild(giftCardText);
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
      homeDelivery.classList.add('MP100-home_delivery');
      homeDelivery.innerHTML = `<h3>Home Delivery</h3>
      <div class="MP100-deliveryContent"></div>`;
      bottomBlock.insertBefore(homeDelivery, bottomBlock.firstChild);

      document.querySelector('.MP100-deliveryContent').innerHTML = allDeliveryInfo;

      poller([
        () => window.jQuery,
      ], () => {
        // split in to two and add see more delivery options
        const allDeliveryOptionsList = $('.MP100-deliveryContent li');
        for (let i = 0; i < allDeliveryOptionsList.length; i += 4) {
          allDeliveryOptionsList.slice(i, i + 4).wrapAll('<div class="MP100-readMore"></div>');
        }
        const readMoreLink = document.createElement('div');
        readMoreLink.classList.add('MP100-read_more_link');
        readMoreLink.textContent = 'More delivery options +';
        document.querySelector('.MP100-deliveryContent').appendChild(readMoreLink);

        readMoreLink.addEventListener('click', () => {
          const readMoreOptions = document.querySelectorAll('.MP100-readMore')[1];
          if (readMoreOptions.classList.contains('MP100-moreDeliver_showing')) {
            readMoreOptions.classList.remove('MP100-moreDeliver_showing');
          } else {
            readMoreOptions.classList.add('MP100-moreDeliver_showing');
          }
          if (readMoreLink.textContent === 'More delivery options +') {
            readMoreLink.textContent = 'Less delivery options -';
          } else {
            readMoreLink.textContent = 'More delivery options -';
          }
        });
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
      document.querySelector('.MP100-gift_card_text').insertAdjacentElement('afterend', paymentCards);
    },
  },
};

export default Experiment;
