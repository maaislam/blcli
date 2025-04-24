import { fullStory, events } from '../../../../lib/utils';
import { observer } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ025',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    /**
     * @desc if the voucher has not been added check for when it is.
     */
    if (!localStorage.getItem('PJ25-33off')) {
      services.storeVoucherAdded();
    }

    /**
     * @desc if the voucher has been added run the test functions
     */
    const URL = window.location.pathname;
    if (localStorage.getItem('PJ25-33off') && URL.indexOf('/pizzas.aspx') > -1) {
      document.body.classList.add('PJ025_voucher-added');
      components.changeHeader();
      components.newPrices();
      components.addpercentOffMessage();

      /**
      * @desc if the page is updated
      */
      observer.connect(document.getElementById('ctl00__objHeader_upHeaderSummary'), () => {
        document.body.classList.add('PJ025_voucher-added');
        components.newPrices();
        components.addpercentOffMessage();
      }, {
        config: { attributes: true, childList: true, subtree: false },
        throttle: 1000,
      });
    }
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
    /**
     * @desc Get the voucher code from the basket page, if exists add in session storage
     */
    storeVoucherAdded: function storeVoucherAdded() {
      const request = new XMLHttpRequest();
      request.open('GET', '/basket-confirmation.aspx', true);
      request.onload = function ajaxCheck() {
        if (request.status >= 200 && request.status < 400) {
          const temp = document.createElement('div');
          temp.innerHTML = request.responseText;
          const voucher = temp.querySelector('.discountRow td');
          if (voucher && voucher.textContent.indexOf('AALDN33') > -1) {
            localStorage.setItem('PJ25-33off', 1);
          } else {
            localStorage.removeItem('PJ25-33off');
          }
        }
      };
      request.send();
    },
  },

  components: {
    /**
     * @desc Get the voucher code from the basket page, if exists add in session storage
     */
    changeHeader: function changeHeader() {
      const headerBanner = document.querySelector('#ctl00_cphBody__objMenuHeader_pnlPizzaMenuHeader');
      const newBanner = document.createElement('div');
      newBanner.classList.add('PJ025_voucher-banner');
      newBanner.innerHTML = '<div class="PJ025-banner_text">All prices shown include 33% discount</div>';

      headerBanner.insertBefore(newBanner, headerBanner.querySelector('.menuBanner').nextSibling);
    },
    /**
     * @desc loop through all drop downs and change the price to be 33% off
     */
    newPrices: function newPrices() {
      const menuItems = document.querySelectorAll('.menuList .menuListCont .variationDropDown option');
      for (let i = 0; i < menuItems.length; i += 1) {
        const element = menuItems[i];
        const optionPrices = element.textContent.match(/(\d+(?:\.\d{1,2})?)/);
        if (optionPrices && optionPrices[0]) {
          const parsedPrice = parseFloat(optionPrices[0]);
          const salePrice = 0.67 * parsedPrice;
          const roundedSalePrice = Math.floor(salePrice * 100) / 100;

          const newOptionText = `${roundedSalePrice}`;
          const newSizePrice = element.textContent.replace(/(\d+(?:\.\d{1,2})?)/, newOptionText);
          element.textContent = newSizePrice;
        }
      }
    },
    /**
     * @desc add the new 33% message above each dropdown on select click
     */
    addpercentOffMessage: function addpercentOffMessage() {
      const pizzas = document.querySelectorAll('.menuList .menuListCont .quantCustomise.pizzasCustomise.dipsCustomise');
      for (let i = 0; i < pizzas.length; i += 1) {
        const element = pizzas[i];
        const new33message = document.createElement('div');
        new33message.classList.add('PJ025_inner-message');
        new33message.innerHTML = 'Prices include 33% off';
        element.insertBefore(new33message, element.firstChild);
      }
    },
  },
};

export default Experiment;
