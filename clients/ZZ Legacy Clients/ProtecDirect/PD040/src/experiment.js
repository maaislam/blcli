import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import PD016 from './lib/PD016';

/**
 * {{PD040}} - {{PD016 Iteration: Quantity Upsell Improvements}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PD040',
    VARIATION: '{{VARIATION}}',
  },

  cache: (() => {
    const docVar = document;
    const bodyVar = document.body;

    return {
      docVar,
      bodyVar,
    };
  })(),

  init() {
    // Setup
    const { settings } = Experiment; 
    document.body.classList.add(settings.ID);
    /**
     * Run PD016 which will give us some of the needed elements
     * if bulk buying is possible
     */
    PD016();
    /**
     * Poll for the elements from PD016
     */
    pollerLite(['.PD016_Discount_Threshold_Text'], Experiment.run);
  },

  run() {
    const { components, services } = Experiment;
    services.tracking();
    const discountAmtNeeded = components.getDiscountNeeded();
    const totalSavings = components.getTotalSavings();
    /**
     * Move PD016 element above total.
     */
    const ref = Experiment.cache.bodyVar.querySelector('#variant-quant_disc');
    const elToMove = Experiment.cache.bodyVar.querySelector('.prod_add_to_cart #addToCartForm .PD016_Discount_Threshold_Text');
    services.repositionElement(elToMove, ref, 'afterend');
    /**
     * Update text if reached bulk discount
     */
    services.updateText(totalSavings, discountAmtNeeded);
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
    repositionElement(el, ref, pos) {
      if (el && ref && pos) {
        ref.insertAdjacentElement(pos, el);
      }
    },
    updateText(totalSavings, discountAmtNeeded) {
      const addedText = Experiment.cache.bodyVar.querySelector('#productDetailUpdateable .prod.buynow .PD016_Discount_Threshold_Text');
      const discountAddedText = `
        <span class="PD040-reached-qty">You have saved ${totalSavings} today!</span>
      `;
      if (addedText) {
        addedText.insertAdjacentHTML('afterend', discountAddedText);
        events.send(Experiment.settings.ID, 'User saw', 'Activated the quantity upsell message');
      }
      const newAddedText = document.querySelector('.PD040 .PD040-reached-qty');
      const input = Experiment.cache.bodyVar.querySelector('form#addToCartForm .qty input.qty');
      const inputEvent = (() => {
        if (input && newAddedText) {
          input.addEventListener('input', (e) => {
            if (parseFloat(e.currentTarget.value) >= discountAmtNeeded) {
              addedText.classList.add('PD040-hide');
              newAddedText.classList.add('PD040-show');
            } else {
              addedText.classList.remove('PD040-hide');
              newAddedText.classList.remove('PD040-show');
            }
          });
        }
      })();
      const minusEvent = (() => {
        const minus = Experiment.cache.bodyVar.querySelector('form#addToCartForm .qty a.minus');
        if (minus && newAddedText) {
          minus.addEventListener('click', (e) => {
            // Event
            events.send(Experiment.settings.ID, 'User clicked', 'Quantity -1');
            // Check conditions
            if (input.value >= discountAmtNeeded) {
              addedText.classList.add('PD040-hide');
              newAddedText.classList.add('PD040-show');
            } else {
              addedText.classList.remove('PD040-hide');
              newAddedText.classList.remove('PD040-show');
            }
          });
        }
      })();
      const plusEvent = (() => {
        const plus = Experiment.cache.bodyVar.querySelector('form#addToCartForm .qty a.plus');
        if (plus && newAddedText) {
          plus.addEventListener('click', (e) => {
            events.send(Experiment.settings.ID, 'User clicked', 'Quantity +1');
            if (input.value >= discountAmtNeeded) {
              addedText.classList.add('PD040-hide');
              newAddedText.classList.add('PD040-show');
            } else {
              addedText.classList.remove('PD040-hide');
              newAddedText.classList.remove('PD040-show');
            }
          });
        }
      })();
    },
  },

  components: {
    /**
     * @desc QNFD = Quantity needed for discount
     */
    getQNFD() {
      let value = 0;
      const qnfd = Experiment.cache.bodyVar.querySelector('.prod.buynow #addToCartForm .PD016_Discount_Threshold_Text .PD016_Discount_Counter');
      if (qnfd) {
        value = qnfd.textContent;
      }
      return value;
    },
    /**
     * Return the number of products needed in order to get bulk discount
     */
    getDiscountNeeded() {
      let discountAmt = 0;
      const discountNumberEl = Experiment.cache.bodyVar.querySelector('#variant-quant_disc span.quantity');
      if (discountNumberEl) {
        discountAmt = discountNumberEl.textContent.trim().replace(/$\D+/, '');
        discountAmt = parseFloat(discountAmt);
      }
      return discountAmt;
    },
    /**
     * Return total savings, this will need to be re run on toggle of product amount.
     */
    getTotalSavings() {
      let saving = 0;
      const savingEl = Experiment.cache.bodyVar.querySelector('#variant-quant_disc span.saving');
      if (savingEl) {
        saving = savingEl.textContent.trim().match(/(\W\d+\.\d+)/gm);
      }
      return saving[0];
    },
  },
};

export default Experiment;
