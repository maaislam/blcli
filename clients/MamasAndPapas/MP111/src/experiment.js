import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import highPriorityProducts from './lib/MP111-content';
import herobannercontent from './lib/hero-banner';

/**
 * {{MP111}} - {{Desktop Search Improvements V2}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP111',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    herobannercontent();
    components.createSortByContainer();
    /**
     * @desc Experiment runs only on first page
     */
    if (window.location.href.indexOf('&page=') === -1 && window.location.href.indexOf('?q=%') === -1) {
      const allSkuCodes = highPriorityProducts();

      /**
       * @desc Makes a GET request to a category URL and retrieves the product element container
       * @param {String} url URL to retrieve the product container
       * @param {String} sku SKU to look for on the next page
       * @param {String} productEl HTML Element
       */
      const getProductContainer = (url, sku, productEl) => {
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            const temp = document.createElement('html');
            temp.innerHTML = request.responseText;
            if (temp.querySelector(`.productCard_mediaContainer a[data-productid='${sku}']`)) {
              productEl = temp.querySelector(`.productCard_mediaContainer a[data-productid='${sku}']`).closest('.col-xs-6.col-sm-3.mt-3'); // eslint-disable-line no-param-reassign
            }
          }
        };
        request.send();
        return productEl;
      };

      let previousSibling = '';
      const skusOnOtherPage = [];
      /*eslint-disable */
      allSkuCodes.forEach(function(sku) {
        if (document.querySelector(`.productCard_mediaContainer a[data-productid='${sku}']`)) {
          // document.querySelector(`.productCard_mediaContainer a[data-productid='${sku}']`).closest('.col-xs-6.col-sm-3.mt-3 ').style.backgroundColor = 'lightblue';
          const productContainer = document.querySelector(`.productCard_mediaContainer a[data-productid='${sku}']`).closest('.col-xs-6.col-sm-3.mt-3');
          if (previousSibling === '') {
            document.querySelector('.plp-block.row .productLister').insertAdjacentElement('afterbegin', productContainer);
            previousSibling = sku;
          } else {
            document.querySelector(`.productCard_mediaContainer a[data-productid='${previousSibling}']`).closest('.col-xs-6.col-sm-3.mt-3').insertAdjacentElement('afterend', productContainer);
            previousSibling = sku;
          }
        } else {
          skusOnOtherPage.push(sku);
        }
      });

      /**
       * @desc Gets Next Page URL and looks for SKUs existing on the other page
       */
      let nextPageUrl = '';
      if (document.querySelector('.pagination-plp.clearLeft.text-md-right li>a')) {
        nextPageUrl = document.querySelector('.pagination-plp.clearLeft.text-md-right li>a').href;
      }
      let product = null;
      if (skusOnOtherPage !== [] && nextPageUrl !== '') {
        skusOnOtherPage.forEach(function (sku) {
          product = getProductContainer(nextPageUrl, sku, product);
          if (product) {
            document.querySelector(`.productCard_mediaContainer a[data-productid='${previousSibling}']`).closest('.col-xs-6.col-sm-3.mt-3').insertAdjacentElement('afterend', product);
            previousSibling = sku;
          }
        });
      }
    }

    pollerLite(['#js-filterSortOrder'], () => {
      /**
       * @desc Price Sort Event Listeners
       */
      document.querySelector('.MP111-option#MP111-low-to-high').addEventListener('click', () => {
        document.querySelector(`#js-filterSortOrder .checkbox_toggle_bordered[data-search-query='price-asc']`).click();
      });
      document.querySelector('.MP111-option#MP111-high-to-low').addEventListener('click', () => {
        document.querySelector(`#js-filterSortOrder .checkbox_toggle_bordered[data-search-query='price-desc']`).click();
      });
      /**
       * @desc Name Sort Event Listeners
       */
      document.querySelector('.MP111-option#MP111-name-ascending').addEventListener('click', () => {
        document.querySelector(`#js-filterSortOrder .checkbox_toggle_bordered[data-search-query='name-asc']`).click();
      });
      document.querySelector('.MP111-option#MP111-name-descending').addEventListener('click', () => {
        document.querySelector(`#js-filterSortOrder .checkbox_toggle_bordered[data-search-query='name-desc']`).click();
      });
    });
    /* eslint-enable */
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
     * @desc Create Sort By Container
     */
    createSortByContainer() {
      const sortByContainer = `<div class='MP111-sortByWrapper'>
        <div class='MP111-sortByContainer'>
          <span class='MP111-sortByLabel'><p>Sort By</p></span>
          <span class='MP111-sortBy MP111-sortByPrice'>
            <ul class='MP111-priceOptions MP111-options'>
              <li class='MP111-option option priceFilter' id='MP111-low-to-high'>Low to High</li>
              <li class='MP111-option option priceFilter' id='MP111-high-to-low'>High to Low</li>
            </ul>
          </span>
          <span class='MP111-sortBy MP111-sortByName'>
            <ul class='MP111-nameOptions MP111-options'>
              <li class='MP111-option option nameAscFilter' id='MP111-name-ascending'>Ascending</li>
              <li class='MP111-option option nameDescFilter' id='MP111-name-descending'>Descending</li>
            </ul>
          </span>
        </div>
      </div>`;

      const filterContainer = document.querySelector('.d-inline-block.py-2.px-2.productFilter_select.btnFilter');
      if (filterContainer) {
        filterContainer.insertAdjacentHTML('afterend', sortByContainer);
      }
    },
  },
};

export default Experiment;
