import { fullStory, events } from '../../../../lib/utils';
import { products } from './lib/SD064-productoffers';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'SD064',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    if (document.querySelector('.view-color-box')) {
      components.moveColours();
    }
    components.addOfferBox();
    components.getProductoffer();
    components.addQuantitytoBag();
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
    * @desc Move the colour link next to the select colour title
    */
    moveColours: function moveColours() {
      document.body.classList.add('SD064-colours');
      const viewColourSwatches = document.querySelector('.view-color-box');
      const selectColourBox = document.querySelector('.product-details-box .last');
      selectColourBox.insertBefore(viewColourSwatches, selectColourBox.querySelector('.color-switch').nextElementSibling);
    },
    /**
    * @desc Add the special offer box
    */
    addOfferBox: function addOfferBox() {
      const colourBox = document.querySelector('.product-details-box .last');

      const newOfferBox = document.createElement('div');
      newOfferBox.classList.add('SD064-new_offer-wrap');
      newOfferBox.innerHTML = '<h3>Special Offer</h3><div class="SD064-offer_box" product-qty=""><span></span><div class="SD064-add">Buy <span></span><div class="SD064-loader"></div></div></div>';

      if (colourBox) {
        colourBox.insertAdjacentElement('afterend', newOfferBox);
      } else {
        document.querySelector('.product-shop').insertAdjacentElement('afterend', newOfferBox);
      }
    },
    /**
    * @desc Loop through the products object and get the correct offer and quanitity
    */
    getProductoffer: function getProductoffer() {
      const skuCode = document.querySelector('.sku-code').textContent;
      const offerText = document.querySelector('.SD064-offer_box span');
      for (let i = 0; i < Object.keys(products).length; i += 1) {
        const data = Object.entries(products)[i];
        const category = data[1];

        const productObjSku = category.code;
        if (skuCode === productObjSku) {
          document.querySelector('.SD064-offer_box').setAttribute('product-qty', category.qty);
          document.querySelector('.SD064-add span').textContent = category.qty;
          offerText.textContent = category.description;
          return;
        }
      }
    },
    /**
    * @desc add the quantity and click add to basket on add offer click
    */
    addQuantitytoBag: function addQuantitytoBag() {
      const { components } = Experiment;
      const productQuantity = document.querySelector('.product-options-bottom .qty-wrapper #qty');
      const addOffer = document.querySelector('.SD064-add');
      const offerQuantity = document.querySelector('.SD064-offer_box').getAttribute('product-qty');
      const loader = document.querySelector('.SD064-loader');

      addOffer.addEventListener('click', () => {
        loader.classList.add('SD064-loader_active');
        productQuantity.value = offerQuantity;
        document.querySelector('.product-options-bottom .add-to-cart .button.btn-cart').click();
        events.send('SD064 - Multiple Adds', 'Upsell Click', 'Clicked on upsell', { sendOnce: true });
        components.removeLoader();
      });
    },
    /**
    * @desc remove the loader when the product has been added to bag
    */
    removeLoader: function removeLoader() {
      setTimeout(() => {
        document.querySelector('.SD064-loader').classList.remove('SD064-loader_active');
      }, 6000);
    },
  },
};

export default Experiment;
