import { fullStory, events } from '../../../../lib/utils';
import { filters } from './lib/MP097-filters';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP097',
    VARIATION: '{{VARIATION}}',
  },
  init() {
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);

    // check if filter page
    const URL = window.location.href;
    const noOfFilter = document.querySelector('.productFilter_label').textContent;
    if (URL.indexOf('size%') > -1 && noOfFilter === '1 Selected') {
      components.applyFilter();
      components.getSizeCode();
      components.addProductURL();
      components.createStockLevelDiv();
      components.requestOnHover();
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
     * @desc Find the current filters that match the new filter selected
     */
    applyFilter: function applyFilter() {
      const currentFilters = document.querySelectorAll('[data-category="filter_size"] .checkbox_toggle_bordered');

      [...currentFilters].forEach((element) => {
        const sideSizeFilter = element.getAttribute('id');
        if (element.classList.contains('active')) {
          sessionStorage.setItem('MP097-size', sideSizeFilter);
        }
      });
    },
    /**
     * @desc get the filter code and store it
     */
    getSizeCode: function getSizeCode() {
      const filterObj = filters;
      for (let i = 0; i < Object.keys(filterObj).length; i += 1) {
        const data = Object.entries(filterObj)[i];
        if (data[1].filter1 === sessionStorage.getItem('MP097-size')) {
          const sizeObjCode = data[1].linkURL;
          sessionStorage.setItem('MP097-sizeUrl', sizeObjCode);
        }
      }
    },
    /**
     * @desc get the filter code and add it to all the products
     */
    addProductURL: function addProductURL() {
      const filterValue = sessionStorage.getItem('MP097-sizeUrl');
      const allProducts = document.querySelectorAll('.productLister .col-xs-6.col-sm-3.mt-3 a');
      for (let i = 0; i < allProducts.length; i += 1) {
        const element = allProducts[i];
        const URL = element.getAttribute('href');
        element.setAttribute('href', `${URL + filterValue}`);
      }
    },
    /**
     * @desc Create the stock level div
     */
    createStockLevelDiv: function createStockLevelDiv() {
      const allProducts = document.querySelectorAll('.productLister .col-xs-6.col-sm-3.mt-3');
      for (let i = 0; i < allProducts.length; i += 1) {
        const element = allProducts[i];

        const stockLevel = document.createElement('div');
        stockLevel.classList.add('MP097-stock_level');
        stockLevel.innerHTML = '<span></span>';
        element.appendChild(stockLevel);
      }
    },
    /**
     * @desc Do request on hover
     */
    requestOnHover: function requestOnHover() {
      const { settings } = Experiment;
      const clothingProducts = document.querySelectorAll('.productLister .col-xs-6.col-sm-3.mt-3');
      for (let i = 0; i < clothingProducts.length; i += 1) {
        const element = clothingProducts[i];
        const checkStockButton = document.createElement('div');
        checkStockButton.classList.add('MP097-checkStock');
        checkStockButton.innerHTML = 'Check online stock';
        element.appendChild(checkStockButton);

        const requestURL = element.querySelector('a');
        const stockLevel = element.querySelector('.MP097-stock_level');

        checkStockButton.addEventListener('click', () => {
          events.send(settings.ID, 'Click', `${settings.ID} Clicked check availabilty - Variation ${settings.VARIATION}`);
          checkStockButton.classList.add('MP097-stock_checked');
          if (!stockLevel.getAttribute('mp097-stockset')) {
            const request = new XMLHttpRequest();
            request.open('GET', requestURL, true);

            request.onload = () => {
              if (request.status >= 200 && request.status < 400) {
                const temp = document.createElement('div');
                temp.innerHTML = request.responseText;

                // get the stock level from the JSON on the product page
                const stockAmount = JSON.parse(temp.querySelector('#stock-levels-check').innerHTML);

                // add the messages based on the stock level
                const stockMessaging = element.querySelector('.MP097-stock_level');
                let stockOnPDP;
                if (stockAmount.head_office_stock >= 20) {
                  stockOnPDP = '<span class="MP097-inStock"><i class="ico ico-tickCircle"></i> Available for delivery</span>';
                  events.send(settings.ID, 'View', `${settings.ID} Not out of stock - Variation ${settings.VARIATION}`);
                }
                if (stockAmount.head_office_stock >= 6 && stockAmount.head_office_stock <= 20) {
                  stockOnPDP = '<span class="MP097-lessThan20"><i class="ico ico-tickCircle"></i> Hurry! Less than 20 available for delivery</span>';
                  events.send(settings.ID, 'View', `${settings.ID} Not out of stock - Variation ${settings.VARIATION}`);
                }
                if (stockAmount.head_office_stock >= 1 && stockAmount.head_office_stock <= 5) {
                  stockOnPDP = '<span class="MP097-lessThan5"><i class="ico ico-tickCircle"></i> Hurry! Very few available for delivery</span>';
                  events.send(settings.ID, 'View', `${settings.ID} Not out of stock - Variation ${settings.VARIATION}`);
                }
                if (stockAmount.head_office_stock === 0) {
                  stockOnPDP = '<span class="MP097-noStock"><i class="ico ico-crossCircle"></i> Sorry, this is unavailable for delivery.</span>';
                  element.querySelector('.productCard').classList.add('MP097-outOfStock');
                }
                stockMessaging.innerHTML = stockOnPDP;
                element.querySelector('.MP097-stock_level').setAttribute('MP097-stockSet', stockAmount.head_office_stock);
              }
            };
            request.send();
          }
        });
      }
    },
  },
};

export default Experiment;
