import AbstractStep from './AbstractStep';
import { cacheDom } from '../../../../../../lib/cache-dom';
import { poller } from '../../../../../../lib/uc-lib';

/**
 * @desc Shipping address 
 */
class Shipping extends AbstractStep {
  /**
   * @desc Initialise step
   */
  init() {
    // Init methods
    this.setTitle();

    this.additionalUi();

    this.handleCountryChange();

    this.populateFieldMessages();

    return this;
  }

  /**
   * Against fields add relevant messages we can use later
   */
  populateFieldMessages() {
    const messages = {
      '#shipping\\:firstname': 'Please enter your first name',
      '#shipping\\:lastname': 'Please enter your last name',
      '#shipping\\:street1': 'Please enter the first line of your address',
      '#shipping\\:postcode': 'Please enter your postcode',
      '#shipping\\:city': 'Please enter your city',
      '#shipping\\:telephone': 'Please enter your telephone'
    };

    for(const f in messages) {
      const field = cacheDom.get(f, true);
      if(field) {
        field.dataset['itx9error'] = messages[f];
      }
    }
  }

  /**
   * Handle country change
   *
   * Changes to country impacts which delivery methods can show
   */
  handleCountryChange() {
    const countrySelect = cacheDom.get('#shipping\\:country_id', true);
    countrySelect.addEventListener('change', () => {
      if(this.getIsValid()) {
        this.saveStep();
      }
    });
  }

  /**
   * @desc Save step
   */
  saveStep() {
    window.shipping.save();
  }

  /**
   * Helper build extra UI features
   */
  additionalUi() {
    const shippingAddressSection = this.step;
    cacheDom.get('.itx9-shipping-different-wrap').insertAdjacentElement('afterend', shippingAddressSection);
    shippingAddressSection.classList.remove('section');

    // Change label for county
    const labelRegion = cacheDom.get('label[for=shipping\\:region]');
    if(labelRegion) {
      const labelRegionNodes = labelRegion.childNodes;
      if(labelRegionNodes.legth) {
        [].forEach.call(labelRegionNodes, (n) => {
            if(n.nodeType == 3) {
              n.textContent = 'County / State / Province';
            }
        });
      }
    }
  }

  /**
   * @desc Register a validation listener, notify callbacks on valid / invalid
   *
   * @param {Function} success
   * @param {Function} error
   */
  registerValidator(success, error) {
    /**
     * @desc Validation rules
     * Default string implies required
     * Functions return boolean to pass
     */
    const validationRules = [
      '#shipping\\:firstname',
      '#shipping\\:lastname',
      '#shipping\\:street1',
      '#shipping\\:postcode',
      '#shipping\\:city',
      '#shipping\\:telephone'
    ];

    /**
     * @desc Validate rules
     */
    const validateOnTimer = () => {
      let allValid = true;

      const differentAddress = !!cacheDom.get('#billing\\:use_for_shipping_no').checked;

      if(differentAddress) {
        // When the billing address is different to shipping address, validate against
        // the fields as they then need to be filled in
        validationRules.forEach((rule) => {
            let validates = false;
            if(typeof rule == 'function') {
              validates = !!rule.call();
            } else {
              const elm = cacheDom.get(rule);
              if(!elm) {
                validates = false;
              }

              if(elm.value.trim()) {
                validates = true;
              }

              if(validates) {
                this.markFieldValid(elm);
              } else {
                this.markFieldInvalid(elm);
              }
            }

            if(validates === false) {
              allValid = false;
            }
        });
      }

      let didChangeState = false;
      if(allValid) {
        if(this.validationState === false) {
          didChangeState = true;
        }

        this.validationState = true;

        success.call(null, didChangeState);
      } else {
        if(this.validationState === true) {
          didChangeState = true;
        }

        this.validationState = false;

        error.call(null, didChangeState);
      }

      setTimeout(validateOnTimer, this.VALIDATION_ITERATION_DELAY);
    };

    validateOnTimer();
  }

  /**
   * @desc Set title
   */
  setTitle() {
    const stepTitle = this.step.querySelector('.step-title');
    stepTitle.innerHTML = '<h3>Delivery Address</h3>';
  }

  /**
   * Helper get is shipping different?
   */
  isShippingDifferent() {
    const shippingDifferent = cacheDom.get('#itx9-shipping-different');
    return !shippingDifferent || !shippingDifferent.checked;
  }
}

export let shippingStep = new Shipping('#opc-shipping');
