import { fullStory, events } from '../../../../lib/utils';
import lightBoxHTML from './lib/lightbox';
import { poller } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'HS005',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);

    if (settings.VARIATION === '1') {
      components.createFinanceBox();

      const sizeSelect = document.querySelector('#js-options-select');

      // on click of the finance button, poll for the finance prices
      const financeButton = document.getElementById('js-ifcBuyButton');
      financeButton.addEventListener('click', (e) => {
        if (!sizeSelect || sizeSelect.value !== '') {
          e.preventDefault();
          document.querySelector('.HS005-finance_box').classList.add('HS005-box_active');

          events.send(settings.ID, 'Click', `${settings.ID} opened finance tool - Variation ${settings.VARIATION}`, { sendOnce: true });
          poller(['#js-confirmationDialog', '.storeDetails .js-product-term'], () => {
            if (!document.querySelector('.HS005-term_option')) {
              components.getTheTermAmounts();
            }
            components.addSliderAmounts();
            components.changeRadioOptions();
            components.updatePrices();
            components.addToBagClick();
            components.exitLightbox();
          });
        }
      });
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
     * @desc Create the lightbox and add to the page
     */
    createFinanceBox: function createLightbox() {
      const financeBox = document.createElement('div');
      financeBox.classList.add('HS005-finance_box');
      financeBox.innerHTML = lightBoxHTML;
      document.body.appendChild(financeBox);

      // add the product name
      const productName = document.querySelector('.buying-info__name').textContent;
      financeBox.querySelector('.HS005-subheading span').textContent = productName;
    },

    /**
     * @desc Get the term options for the dropdown
     */
    getTheTermAmounts: function getTheTermAmounts() {
      const termAmounts = document.querySelectorAll('.storeDetails .js-product-term');

      for (let i = 0; i < termAmounts.length; i += 1) {
        const element = termAmounts[i];
        const newTermOption = document.createElement('option');
        newTermOption.classList.add('HS005-term_option');
        newTermOption.innerHTML = `${element.textContent} months`;

        document.querySelector('.HS005-month').appendChild(newTermOption);
      }
    },
    /**
     * @desc Add the slider amounts
     */
    addSliderAmounts: function addSliderAmounts() {
      const { settings } = Experiment;
      const productPrice = (() => {
        let price;
        const financeInputMax = document.querySelector('#js-ifcProductUpdate').getAttribute('data-validation-max-price');
        if (financeInputMax) {
          price = Number(financeInputMax);
        } else {
          price = Number(document.querySelector('.buying-info__price--current').textContent.replace('£', ''), 0);
        }
        return price;
      })();

      const maxPrice = productPrice - 180;
      const minPrice = productPrice / 10;
      const formattedMaxPrice = maxPrice.toFixed(2).replace('.00', '');
      const formattedMinPrice = minPrice.toFixed(2).replace('.00', '');
      document.querySelector('.HS005-minamount').textContent = `£${formattedMinPrice}`;
      document.querySelector('.HS005-maxamount').textContent = `£${formattedMaxPrice}`;

      const lightbox = document.querySelector('.HS005-lightbox_content');
      const depositBlock = lightbox.querySelector('.HS005-deposit');
      const sliderInput = lightbox.querySelector('.HS005-slider input');
      const depositInput = lightbox.querySelector('.HS005-depositAmount');
      const errorMsg = lightbox.querySelector('.HS005-deposit_text--error');

      // change the range of the slider
      sliderInput.setAttribute('min', formattedMinPrice);
      sliderInput.setAttribute('max', formattedMaxPrice);

      // set the slider deposit
      sliderInput.value = formattedMinPrice;
      document.getElementById('js-productDeposit').value = formattedMinPrice;
      depositInput.value = formattedMinPrice;

      sliderInput.oninput = () => {
        depositInput.value = Number(sliderInput.value).toFixed(2).replace('.00', '');
        document.getElementById('js-productDeposit').value = sliderInput.value;
        events.send(settings.ID, 'Click', `${settings.ID} clicked slider - Variation ${settings.VARIATION}`, { sendOnce: true });
      };

      // change the slider value on deposit change
      depositInput.onchange = () => {
        let { value } = depositInput;

        /**
         * Set validation to failed (clears after 3s)
         * @param {String} message Error message to show
         */
        const applyFailedValidation = (message) => {
          depositBlock.classList.add('HS005-deposit--failed');
          depositInput.classList.add('HS005-depositAmount--failed');
          errorMsg.innerHTML = message;

          setTimeout(() => {
            depositBlock.classList.remove('HS005-deposit--failed');
            depositInput.classList.remove('HS005-depositAmount--failed');
          }, 5000);
        };

        /**
         * If custom deposit amount is out of min-max range, reset to nearest
         * valid value
         */
        if (value < minPrice) {
          applyFailedValidation(`Minimum deposit amount is <em>£${formattedMinPrice}</em>`);
          depositInput.value = formattedMinPrice;
          value = formattedMinPrice;
        } else if (value > maxPrice) {
          applyFailedValidation(`Maximum deposit amount is <em>£${formattedMaxPrice}</em>`);
          depositInput.value = formattedMaxPrice;
          value = formattedMaxPrice;
        } else if (depositInput.classList.contains('HS005-depositAmount--failed')) {
          depositInput.classList.remove('HS005-depositAmount--failed');
        }

        document.getElementById('js-productDeposit').value = value;
        sliderInput.value = value;
      };
    },
    /**
     * @desc on change of the dropdown in lightbox, click on the matching radio button
     * based on the value of the dropdown selected
     */
    changeRadioOptions: function changeRadioOptions() {
      const { settings } = Experiment;
      const radioButtons = document.querySelectorAll('.js-ifcCalculatorRow .js-product-term');
      const termDropdown = document.querySelector('.HS005-month');

      // change the value if the dropdown is not changed
      for (let i = 0; i < radioButtons.length; i += 1) {
        const element = radioButtons[i];
        const termDropdownValue = termDropdown.value.replace(' months', '');
        if (element.textContent === termDropdownValue) {
          element.parentElement.click();
        }
      }

      // on change of the term dropdown
      termDropdown.addEventListener('change', () => {
        for (let i = 0; i < radioButtons.length; i += 1) {
          const element = radioButtons[i];
          const termDropdownValue = termDropdown.value.replace(' months', '');
          if (element.textContent === termDropdownValue) {
            element.parentElement.click();
          }
        }
        events.send(settings.ID, 'Click', `${settings.ID} clicked term dropdown - Variation ${settings.VARIATION}`, { sendOnce: true });
      });
    },
    /**
     * @desc On calculate click on lightbox, click the correct term based on the dropdown
     * click the hidden "update" of deposit, update prices then show the add to bag button
     */
    updatePrices: function updatePrices() {
      const { components } = Experiment;
      const calculateButton = document.querySelector('.HS005-calculate');
      const paymentSummaryBox = document.querySelector('.HS005-payment_summary');

      calculateButton.addEventListener('click', () => {
        calculateButton.classList.add('HS005-calculate_nobutton');
        document.querySelector('.ifcAddToBasketButton').click();
        paymentSummaryBox.classList.add('HS005-payment_showing');
        calculateButton.textContent = 'Recalculate';

        poller(['#js-confirmationDialog', '.storeDetails .js-product-term'], () => {
          // update/refresh radio options
          components.changeRadioOptions();

          // add the monthly payment
          const selectedOptions = document.querySelector('.js-ifcCalculatorRow.selected');
          const monthlyAmount = selectedOptions.querySelector('td:nth-child(5)').textContent;
          document.querySelector('.HS005-finalAmount.HS005-monthly').textContent = monthlyAmount;

          // add the total amount payable
          const totalPrice = document.querySelector('.buying-info__price--current').textContent;
          document.querySelector('.HS005-finalAmount.HS005-total').textContent = totalPrice;
        });
      });
    },
    /**
     * @desc On calculate click on lightbox, click the correct term based on the dropdown
     * click the hidden "update" of deposit, update prices then show the add to bag button
     */
    addToBagClick: function addToBagClick() {
      const { settings } = Experiment;
      const addToBag = document.querySelector('.HS005-addToBag');
      const hiddenAddToBag = document.querySelector('#js-submitIfcOption');
      addToBag.addEventListener('click', () => {
        hiddenAddToBag.click();
        document.querySelector('.HS005-finance_box').classList.remove('HS005-box_active');
        events.send(settings.ID, 'Click', `${settings.ID} clicked add finance to bag - Variation ${settings.VARIATION}`, { sendOnce: true });
      });
    },
    /**
     * @desc On calculate click on lightbox, click the correct term based on the dropdown
     * click the hidden "update" of deposit, update prices then show the add to bag button
     */
    exitLightbox: function exitLightbox() {
      const qty = document.querySelector('#quantityChange');
      const buyButton = document.querySelector('.buying-buttons__buy.js-buyingButton');

      const financeButton = document.querySelector('#js-ifcBuyButton');

      const lightbox = document.querySelector('.HS005-finance_box');
      const lightboxExit = document.querySelector('.HS005-exit');
      const overlay = document.querySelector('.HS005-overlay');
      lightboxExit.addEventListener('click', () => {
        lightbox.classList.remove('HS005-box_active');
        qty.removeAttribute('disabled');
        buyButton.removeAttribute('disabled');
        buyButton.style.opacity = '1';
        financeButton.textContent = 'Pay by finance';
      });
      overlay.addEventListener('click', () => {
        lightbox.classList.remove('HS005-box_active');
        qty.removeAttribute('disabled');
        buyButton.removeAttribute('disabled');
        buyButton.style.opacity = '1';
        financeButton.textContent = 'Pay by finance';
      });
    },
  },
};

export default Experiment;
