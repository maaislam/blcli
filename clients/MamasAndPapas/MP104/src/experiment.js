import { fullStory, events } from '../../../../lib/utils';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP104',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);
    if (settings.VARIATION === '1') {
      components.basketDetailsTrigger();
      components.addBasketTotal();
      components.newBasketArea();
      components.addBasketItems();
      components.showBasket();
    } else if (settings.VARIATION === '2') {
      components.newBasketArea();
      components.addBasketItems();
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
     * @desc add new basket details area
     */
    basketDetailsTrigger() {
      const basketDetailsButton = document.createElement('div');
      basketDetailsButton.classList.add('MP104-basket_button');
      basketDetailsButton.innerHTML = '<div class="MP104-total">Total <span></span></div><div class="MP104-basket_text">Show basket detail<i class="ico ico-plus"/></div>';

      const basketForm = document.getElementById('guestForm');
      const deliveryAddressForm = document.getElementById('mnpAddressForm');
      const deliveryTypes = document.querySelector('#command');
      if (basketForm) {
        basketForm.insertBefore(basketDetailsButton, basketForm.querySelector('.form-actions').previousSibling);
      } else if (deliveryAddressForm) {
        deliveryAddressForm.insertBefore(basketDetailsButton, deliveryAddressForm.querySelector('.checkout_title').previousSibling);
      } else if (deliveryTypes) {
        deliveryTypes.insertBefore(basketDetailsButton, deliveryTypes.querySelector('.form-actions').previousSibling);
      }
    },
    /**
     * @desc Create the new basket area to be shown
     */
    newBasketArea: function newBasketArea() {
      const { settings } = Experiment;
      const basketContent = document.createElement('div');
      basketContent.classList.add('MP104-basketContent_wrap');
      basketContent.innerHTML = '<h3>Your Basket:</h3><div class="MP104-basketItems"></div><div class="MP104-basket_total"></div>';


      if (settings.VARIATION === '1') {
        document.querySelector('.checkout form').insertBefore(basketContent, document.querySelector('.MP104-basket_button').nextElementSibling);
      } else if (settings.VARIATION === '2') {
        const formBlock = document.querySelector('.col-xs-12.col-md-8.col-md-push-2.col-lg-6.col-lg-push-3');
        formBlock.insertAdjacentElement('afterend', basketContent);
      }
    },
    /**
     * @desc Loop through the basket products and add to the new basket wrapper
     */
    addBasketItems: function addBasketItems() {
      const basketItems = document.querySelectorAll('#basket .js-basketProducts .basket_product');
      for (let i = 0; i < basketItems.length; i += 1) {
        const element = basketItems[i];
        document.querySelector('.MP104-basketItems').appendChild(element);
      }

      const totals = document.querySelector('.basket_checkout.bg-white.text-center');
      document.querySelector('.MP104-basket_total').innerHTML = totals.innerHTML;

      const productLinks = document.querySelectorAll('.MP104-basketItems a');
      for (let k = 0; k < productLinks.length; k += 1) {
        const element = productLinks[k];
        element.removeAttribute('href');
      }
    },
    /**
     * @desc get the basket total and add it to the new div
     */
    addBasketTotal: function addBasketTotal() {
      const basketTotal = document.querySelector('.basket_checkout .price').textContent;
      document.querySelector('.MP104-total span').textContent = basketTotal;
    },
    /**
     * @desc click on close panel in the basket when the new button is clicked to trigger the basket
     */
    showBasket: function showBasket() {
      const plus = document.querySelector('.MP104-basket_text .ico');
      const basketTrigger = document.querySelector('.MP104-basket_button');
      const basketItemsContent = document.querySelector('.MP104-basketContent_wrap');
      basketTrigger.addEventListener('click', () => {
        if (!basketItemsContent.classList.contains('MP104-basket_open')) {
          basketItemsContent.classList.add('MP104-basket_open');
          plus.classList.remove('ico-plus');
          plus.classList.add('ico-minus');
        } else {
          basketItemsContent.classList.remove('MP104-basket_open');
          plus.classList.add('ico-plus');
          plus.classList.remove('ico-minus');
        }
      });
    },
  },
};

export default Experiment;
