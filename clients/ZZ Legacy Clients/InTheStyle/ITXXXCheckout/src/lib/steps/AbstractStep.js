import { cacheDom } from '../../../../../../lib/cache-dom';
import { events, viewabilityTracker } from '../../../../../../lib/utils';
import { userIsLoggedIn } from '../helpers';

/**
 * @desc Abstract class for all step classes. Essentially wrappers
 * for the actions that need to happen for each step and facilitates
 * moving between steps
 */
class AbstractStep {
  /**
   * @desc Set default and establish a contract for methods that must be defined in any subclass
   */
  constructor(stepSelector) {
    const step = document.querySelector(stepSelector);
    this.step = step;

    /**
     * Validation state
     */
    this.validationState = false;

    /**
     * @desc Default how often the validator should check (milliseconds)
     */
    this.VALIDATION_ITERATION_DELAY = 1000;

    /** @desc Following methods must be implemented in subclass **/
    const methodsMustBeImplemented = [
      'init',
      'registerValidator'
    ];

    methodsMustBeImplemented.forEach((method) => {
        if(!this[method]) {
          throw `ERROR: Method ${method} is not defined in class ${this.constructor.name}`;
        }
    });

    this.didSendStep1 = false;
    this.didSendStep2 = false;

    this.didAttachVTPayment = false;
    this.didAttachVTShipping = false;
  }

  /**
   * @desc Show step
   * @param {Function} cb
   */
  showStep(cb, scroll = false, scrollOnce = true) {
    this.step.classList.add('itx9-shown');    

    events.send(null, 'did-render-step', this.step.id);

    // ----------------------------------------
    // Virtual page views 
    // ----------------------------------------

    switch(this.step.id) {
      case 'opc-login':
        if(!this.didSendStep1) {
          ga(events.trackerName + '.send', 'pageview', 'Checkout Step 1: Login');
          this.didSendStep1 = true;
        }

        break;
      case 'opc-billing':
        if(!this.didSendStep2) {
          ga(events.trackerName + '.send', 'pageview', 'Checkout Step 2: Billing');
          this.didSendStep2 = true;
        }

        break;
      case 'opc-shipping_method':
        if(!this.didAttachVTShipping) {
          const elm = cacheDom.get('#opc-shipping_method');

          viewabilityTracker(elm, () => {
            ga(events.trackerName + '.send', 'pageview', 'Checkout Step 3: Shipping');
            ga(events.trackerName + '.send', 'pageview', 'Checkout Step 4: Shipping Method');
          }, {
            allElementHasToBeInView: false,
            removeOnView: true,
            throttle: 50,
          });

          this.didAttachVTShipping = true;
        }

        break;
      case 'opc-payment':
        if(!this.didAttachVTPayment) {
          const elm = cacheDom.get('#opc-payment');

          setTimeout(function() {
            viewabilityTracker(elm, () => {
              ga(events.trackerName + '.send', 'pageview', 'Checkout Step 5: Payment');
              ga(events.trackerName + '.send', 'pageview', 'Checkout Step 6: Review');
            }, {
              allElementHasToBeInView: false,
              removeOnView: true,
              throttle: 50,
            });
          }, 2500); // Timeout to ensure not prematurely firing when logged in

          this.didAttachVTPayment = true;
        }
    }

    if(typeof cb === 'function') {
      if(scroll === true) {
        this.scrollToStep(cb, scrollOnce);
      } else {
        cb.call();
      }
    }
  }

  /**
   * @desc Show step
   * @param {Function} cb
   */
  hideStep(cb) {
    this.step.classList.remove('itx9-shown');    

    if(typeof cb === 'function') {
      cb.call();
    }
  }

  /**
   * @desc Is step visible?
   */
  isStepVisible() {
    return !!this.step.classList.contains('itx9-shown');    
  }

  /**
   * Helper scroll to current step
   * @param {Function} cb
   */
  scrollToStep(cb, once = true) {
    if(once && this.step.classList.contains('itx9-did-scroll-once')) {
      return false;
    }

    window['j' + 'Query']('body,html').animate({
      'scrollTop': window['j' + 'Query'](this.step).offset().top - 70
    }, 700, () => {
      this.step.classList.add('itx9-did-scroll-once');
      if(typeof cb == 'function') {
        cb();  
      }
    });
  }

  /**
   * Mark Field Invalid
   * @param {HTMLElement} field
   */
  markFieldInvalid(field) {
    field.classList.remove('itx9-valid');
    field.parentNode.classList.remove('itx9-valid');

    field.classList.add('itx9-invalid');
    field.parentNode.classList.add('itx9-invalid');
  }

  /**
   * Mark Field Invalid
   * @param {HTMLElement} field
   */
  markFieldValid(field) {
    field.classList.add('itx9-valid');
    field.parentNode.classList.add('itx9-valid');

    field.classList.remove('itx9-invalid');
    field.parentNode.classList.remove('itx9-invalid');

    field.classList.remove('validation-failed');
  }

  /**
   * Helper set up recursive validator
   *
   * @param {Array} validationRules
   * @param {Function} success
   * @param {Function} error
   */
  recursiveValidator(validationRules, success, error) {
    /**
     * @desc Validate rules
     */
    const validateOnTimer = () => {
      let allValid = true;

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

      if(this.validatorKilled === true) {
        return false;
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

        if(error) {
          error.call(null, didChangeState);
        }
      }

      this.recursiveValidatorTimeout = setTimeout(validateOnTimer, this.VALIDATION_ITERATION_DELAY);
    };

    validateOnTimer();
  }

  /**
   * @return {Boolean}
   */
  getIsValid() {
    return !!this.validationState;
  }

  /**
   * Kill recursive validator
   */
  killRecursiveValidator() {
    this.validatorKilled = true;

    clearTimeout(this.recursiveValidatorTimeout);
  }
}

export default AbstractStep;
