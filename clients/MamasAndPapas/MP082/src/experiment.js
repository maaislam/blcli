import { fullStory, events } from '../../../../lib/utils';

/**
 * {{MP082}} - {{Limited Stock Scarcity}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP082',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    const stockLevels = document.querySelector('#stock-levels-check').innerHTML;
    const stockObj = JSON.parse(stockLevels);
    const stockNumber = stockObj.head_office_stock;
    if (stockNumber > 0) {
      /**
       * @desc Gets product page type from breadcrumbs
       */
      let productType = 'other';
      const breadcrumbs = window.universal_variable.page.breadcrumb;
      [].forEach.call(breadcrumbs, (value) => {
        if (value.match(/Clothing.*/)) {
          productType = 'clothing';
        }
      });

      if ((window.universal_variable.page.type === 'Product') && productType === 'clothing') {
        /**
         * @desc Checks available sizes and counts the ones out of stock
         */
        const selectOption = document.querySelector('select.w-100');
        const sizesOptions = selectOption.querySelectorAll('option');
        let outOfStockSizes = 0;
        [].forEach.call(sizesOptions, (value) => {
          if (value.className === 'size-item out-of-stock') {
            outOfStockSizes++;// eslint-disable-line no-plusplus
          }
        });

        const sizesSelector = document.querySelector('.variant-selector');
        /**
         * @desc Creates div wrapper for Availability Message above Size Selection
         * If all sizes are out of stock, then shows nothing
         */
        if (outOfStockSizes !== (sizesOptions.length - 1)) {
          const availabilityWrapper = `<div class='MP082-wrapper'>
          <div class='MP082-availability-message'>
          <span id='MP082-availability'>Availability:</span>
          <span class='MP082-stock-message'></span>
          </div>
          <p id='MP082-checkSizes'>Check our sizes below</p>
          <div>`;
          sizesSelector.insertAdjacentHTML('beforebegin', availabilityWrapper);
          /**
           * @desc Populates Availability content with the relevant message
           */
          if (outOfStockSizes === 0) {
            document.querySelector('.MP082-stock-message').innerHTML = 'In stock in all sizes';
            document.querySelector('.MP082-stock-message').id = 'MP082-in-stock';
            document.querySelector('#MP082-checkSizes').style.display = 'none';
          } else {
            document.querySelector('.MP082-stock-message').innerHTML = 'Out of stock in some sizes';
            document.querySelector('.MP082-stock-message').id = 'MP082-out-of-stock-sizes';
          }

          selectOption.addEventListener('change', (e) => {
            const select = e.currentTarget;
            const sizeOptions = select.options;
            const selectedIndex = select.selectedIndex;// eslint-disable-line prefer-destructuring
            const sizeClicked = sizeOptions[selectedIndex].textContent.trim();
            events.send('MP082', 'User Clicked on Size Option', sizeClicked);
          });
        }
      }
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  components: {},
};

export default Experiment;
