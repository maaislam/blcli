import AbstractStep from './AbstractStep';
import { cacheDom } from '../../../../../../lib/cache-dom';
import { paymentStep } from './Payment';
import { billingStep } from './Billing';
import { events } from '../../../../../../lib/utils';

/**
 * @desc Shipping Method
 */
class ShippingMethod extends AbstractStep {
  /**
   * @desc Initialise step
   */
  init() {
    this.paymentInputValue = null;

    this.setTitle();

    this.handleDeliveryAddressNotSameAsBilling();

    return this;
  }

  /**
   * @desc Register validator, callback on success.
   * Sets reference to last selected value to ensure 'change' does not fire success repeatedly
   * @param {Function} success
   * @param {Function} error
   */
  registerValidator(success, error) {

    /**
     * @desc Validate on timer
     */
    const validateOnTimer = () => {
      /**
       * @desc Helper recursive set timeout
       */
      const bail = () => {
        setTimeout(validateOnTimer, this.VALIDATION_ITERATION_DELAY);
      };

      const shippingMethodInputs = cacheDom.getAll('[name=shipping_method]', true);

      if(shippingMethodInputs.length == 1) {
        const noDisplaySpan = cacheDom.get('.sp-methods ul li .no-display', true);
        const noDisplayInput = cacheDom.get('.sp-methods ul li .no-display input[type=radio]', true);

        if(noDisplaySpan && noDisplayInput) {
          noDisplayInput.checked = true;
          noDisplaySpan.insertAdjacentElement('afterend', noDisplayInput);

          noDisplaySpan.remove();
        }
      }

      let valid = false;
      let chosenValue = null;
      [].forEach.call(shippingMethodInputs, (input) => {
        if(input.checked) {
          chosenValue = input.value;
          valid = true;
        }
      });

      if(this.paymentInputValue == chosenValue) {
        bail(); // Bail when the last chosen value hasn't changed
      } else {
        if(valid) {
          this.paymentInputValue = chosenValue;

          success.call();
        } else {
          error.call();
        }

        bail();
      }
    }
    validateOnTimer();
  }

  /**
   * @desc Default is to keep the billing address the same as the shipping address
   * but they do have the option to change it - since in Mage shipping is a 
   * separate step to shipping method we need to workaround this in UI
   */
  handleDeliveryAddressNotSameAsBilling() {
    // UI
    this.step.querySelector('.itx9-step-subtitle').insertAdjacentHTML('afterend', `
      <ul class="itx9-shipping-different-wrap sp-methods">
        <li>
          <input type="checkbox" name="itx9-shipping-different" id="itx9-shipping-different" checked>
          <label for="itx9-shipping-different">
            Delivery is same as billing address
          </label>
        </li>
      </ul>
    `);

    const shippingAddressSection = cacheDom.get('#opc-shipping');

    const checkbox = cacheDom.get('#itx9-shipping-different');
    checkbox.addEventListener('change', (e) => {
      if(!e.currentTarget.checked) {
        cacheDom.get('#billing\\:use_for_shipping_no').click();

        shippingAddressSection.classList.add('itx9-active');

        events.send(null, 'unchecked-delivery-address-same', '');
      } else if(e.currentTarget.checked) {
        cacheDom.get('#billing\\:use_for_shipping_yes').click();

        shippingAddressSection.classList.remove('itx9-active');

        paymentStep.showStep();

        events.send(null, 'checked-delivery-address-same', '');

        // Reset and save billing address
        if(billingStep.getIsValid()) {
          billingStep.saveStep();
        }
      }
    });
  }

  /**
   * Is the shipping address different?
   */
  isShippingAddressDifferent() {
    const checkbox = cacheDom.get('#itx9-shipping-different');
    let result = false;
    if(checkbox && checkbox.checked) {
      result = true;
    }

    return result;
  }

  /**
   * @desc Set title
   */
  setTitle() {
    const stepTitle = this.step.querySelector('.step-title');
    stepTitle.innerHTML = '<h3>Delivery Options</h3>';

    stepTitle.insertAdjacentHTML('afterend', `
        <p class="itx9-step-subtitle itx9-step-subtitle--shipping-method">
          When would you like your items delivered?
        </p>
    `);
  }

  /**
   * @desc Helper save shipping method
   * Utilises Mage shipping classes to perform necessary ajaax request 
   * used to update payment info
   */
  saveStep() {
    window.shippingMethod.save();
  }
}

export const shippingMethodStep = new ShippingMethod('#opc-shipping_method');
