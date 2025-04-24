import { fullStory, events } from '../../../../lib/utils';
import { pollerLite, observer } from '../../../../lib/uc-lib';
import ME159 from './lib/ME159';
import ME160 from './lib/ME160-variation4';

/**
 * {{ME171}} - {{Scarcity Improvement Iteration}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME171',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components, bindExperimentEvents } = Experiment;
    services.tracking();
    if (window && window.location && window.location.href && window.location.href.indexOf('/product/') > -1) {
      const itemData = JSON.parse(localStorage.getItem('ME171-purchase-complete'));
      if (!itemData) {
        document.body.classList.add(settings.ID);
        console.log(`${settings.ID} is running.`);
        if (settings.VARIATION === '1') {
          console.log(`VARIATION : ${settings.VARIATION}`);
          ME159.init();
        } else if (settings.VARIATION === '2') {
          console.log(`VARIATION : ${settings.VARIATION}`);
          const scarcityMessageContainer = `<div class='ME171_stock-checker ME171_loaded-stock'>
            <p class='ME171_loading-stock'>Checking stock levels<span class='ME171_elip'></span></p>
            <p class='ME171_curr-stock hide'>Hurry! Less than 3 in stock</p>
          </div>`;
        } else if (settings.VARIATION === '3') {
          console.log(`VARIATION : ${settings.VARIATION}`);
          ME159.init();

          components.createSizeSelectionScarcityMessage();
          bindExperimentEvents.checkSizeSelection();
        } else if (settings.VARIATION === '4') {
          console.log(`VARIATION : ${settings.VARIATION}`);
          ME159.init();
          pollerLite(['.ME159_stock-checker.ME159_loaded-stock'], () => {
            ME160.init();
          });
        }
      }
    } else if (window && window.location && window.location.href && window.location.href.indexOf('/checkout/order-received') > -1) {
      services.purchaseCompleteUpdateLocalStorage();
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
    /**
     * @desc Update Local Storage Item
     */
    updateLocalStorageItem(productIdInArray, productFoundInIndex, selectedIndex) {
      console.log('========= UPDATE LOCALSTORAGE ITEM ============');
      const itemData = JSON.parse(localStorage.getItem('ME171-sizeSelected-V3'));
      if (itemData && productIdInArray) {
        if (itemData[productFoundInIndex].sizesSelected.length === 1) {
          // If selected index isn't 0 and index isn't already included
          if (selectedIndex !== 0 && !itemData[productFoundInIndex].sizesSelected.includes(selectedIndex)) {
            itemData[productFoundInIndex].sizesSelected.push(selectedIndex);
            localStorage.setItem('ME171-sizeSelected-V3', JSON.stringify(itemData));
          }
        }
      }
    },
    /**
     * @desc Update Local Storage Item - Purchase Complete
     */
    purchaseCompleteUpdateLocalStorage() {
      const itemData = JSON.parse(localStorage.getItem('ME171-purchase-complete'));
      if (!itemData) {
        localStorage.setItem('ME171-purchase-complete', true);
      }
    },
    /**
     * @desc Check if New Size Selection is in Stored Data
     */
    checkSizeSelectionInStoredData(productId, selectedIndex, productSizeAvailable) {
      const { components } = Experiment;
      const itemData = JSON.parse(localStorage.getItem('ME171-sizeSelected-V3'));
      if (itemData) {
        for (let i = 0; i < itemData.length; i += 1) {
          if (itemData[i].productId === `${productId}` && productSizeAvailable) {
            if (itemData[i].sizesSelected.includes(selectedIndex)) {
              components.createSizeSelectionScarcityMessage();
            } else {
              components.removeSizeSelectionScarcityMessage();
            }
          }
        }
      }
    },
  },

  components: {
    /**
     * @desc Add Scarcity message on the Size Selection
     */
    createSizeSelectionScarcityMessage() {
      const scarcityMessage = document.querySelector('.ME171-size-message');
      if (!scarcityMessage) {
        const sizeOptionsMessage = `<div class='ME171-size-message'>-Less than 3 in stock</div>`;
        document.querySelector('table.variations td.value').insertAdjacentHTML('beforeend', sizeOptionsMessage);
      } else {
        scarcityMessage.classList.remove('hide');
      }
    },
    /**
     * @desc Remove Scarcity message on the Size Selection
     */
    removeSizeSelectionScarcityMessage() {
      document.querySelector('.ME171-size-message').classList.add('hide');
    },
  },

  bindExperimentEvents: {
    /**
     * @desc Check if Size Selection has changed
     */
    checkSizeSelection() {
      const { services } = Experiment;

      let localStorageItem = localStorage.getItem('ME171-sizeSelected-V3');
      let itemData = JSON.parse(localStorage.getItem('ME171-sizeSelected-V3'));
      const productId = document.querySelector('form.variations_form.cart').getAttribute('data-product_id');
      const sizeSelection = document.querySelector('select#pa_size');
      let productIdInArray = false;
      let productFoundInIndex = null;
      let data = [];
      if (!localStorageItem) {
        const index = sizeSelection.selectedIndex;
        const dataToPush = {'productId': `${productId}`, 'sizesSelected': [index]};
        data.push(dataToPush);
        localStorage.setItem('ME171-sizeSelected-V3', JSON.stringify(data));

        itemData = JSON.parse(localStorage.getItem('ME171-sizeSelected-V3'));
        for (let i = 0; i < itemData.length; i += 1) {
          if (itemData[i].productId === `${productId}`) {
            productIdInArray = true;
            productFoundInIndex = i;
            break;
          }
        }
      } else if (itemData) {
        for (let i = 0; i < itemData.length; i += 1) {
          if (itemData[i].productId === `${productId}`) {
            productIdInArray = true;
            productFoundInIndex = i;
            break;
          }
          if (!productIdInArray) {
            const index = sizeSelection.selectedIndex;
            const dataToPush = {'productId': `${productId}`, 'sizesSelected': [index]};
            itemData.push(dataToPush);
            localStorage.setItem('ME171-sizeSelected-V3', JSON.stringify(itemData));
          }
        }
      }
      
      sizeSelection.addEventListener('change', (e) => {
        const select = e.currentTarget;
        const sizeOptions = select.options;
        const selectedIndex = select.selectedIndex;
        const sizeClicked = sizeOptions[selectedIndex].textContent.trim();
        let productSizeAvailable = false;
        
        pollerLite(['.woocommerce-variation-add-to-cart.variations_button'], () => {
          const addToCartButton = document.querySelector('.woocommerce-variation-add-to-cart.variations_button');
          if (addToCartButton && addToCartButton.classList.contains('woocommerce-variation-add-to-cart-enabled')) {
            productSizeAvailable = true;
            services.updateLocalStorageItem(productIdInArray, productFoundInIndex, selectedIndex);
            services.checkSizeSelectionInStoredData(productId, selectedIndex, productSizeAvailable);
          } else {
            services.checkSizeSelectionInStoredData(productId, selectedIndex, productSizeAvailable);
          }
        });
      });
    },
  },
};

export default Experiment;
