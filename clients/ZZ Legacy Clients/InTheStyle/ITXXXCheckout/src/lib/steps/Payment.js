import AbstractStep from './AbstractStep';
import { cacheDom } from '../../../../../../lib/cache-dom';
import { observer, poller } from '../../../../../../lib/uc-lib';
import { events } from '../../../../../../lib/utils';
import { showLoader } from '../helpers';

/**
 * @desc Payment
 */
class Payment extends AbstractStep {
  /**
   * @desc Initialise step
   */
  init() {
    this.setTitle();
    this.additionalUI();

    // Payment methods loaded
    observer.connect([cacheDom.get('#checkout-payment-method-load', true)], () => this.changesObserved(), { 
      childList: true, 
      attributes: false, 
      subtree: true 
    });
    observer.connect([cacheDom.get('#checkout-review-load', true)], () => this.reviewChangesObserved(), { 
      childList: true, 
      attributes: false, 
      subtree: true 
    });

    return this;
  }

  /**
   * Set default payment methods
   * It's important we do this so that we can call
   * payment.save() and so pre-generate the review content
   */
  setDefaultPaymentMethods() {
    const paymentMethods = cacheDom.getAll('[name="payment[method]"]', true);
    [].forEach.call(paymentMethods, (item) => {
      if(item.id == 'p_method_gene_braintree_paypal') {
        // ------------------------------
        // Default to PayPal as it won't validate false
        // as a way of generating review content
        // ------------------------------
        item.checked = true;
      } else {
        item.checked = false;
      }
    });

    payment.save();
  }

  /**
   * Observer for when order review changed
   */
  reviewChangesObserved() {
    poller(['.braintree-paypal-button span span'], () => {
      const paypalSpan = cacheDom.get('.braintree-paypal-button span span', true);
      if(paypalSpan) {
        paypalSpan.innerHTML = 'Pay securely with';
      }
    });

    poller(['#checkout-review-submit .btn-checkout span span'], () => {
      const btnCheckoutSpan = cacheDom.get('#checkout-review-submit .btn-checkout span span', true);
      if(btnCheckoutSpan) {
        btnCheckoutSpan.innerHTML = 'Pay securely';
      }
    });

    // Checkout agreements switch order around
    const consentsFirst = cacheDom.get('#checkout-agreements ol li:last-of-type');
    const consentsLast = cacheDom.get('#checkout-agreements ol li:last-of-type');

    consentsFirst.insertAdjacentElement('beforebegin', consentsLast);

  }

  /**
   * Observer for when payment methods are updated
   */
  changesObserved() {
    const paypalText = '(PayPal will open in a new window)';
    const paypalInfo = cacheDom.get('#checkout-payment-method-load .paypal-info > p', true);
    if(paypalInfo) {
      paypalInfo.classList.add('itx9-paypal-info');
    }

    const label = cacheDom.get('#checkout-payment-method-load label[for=p_method_gene_braintree_paypal]', true);
    label.innerHTML = `
      <img class="itx9-paypal-logo" 
        src="//www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_150x38.png" alt="PayPal" title="PayPal">
      <span class="itx9-paypal-text">${paypalText}</span>
    `;

    const cardLabel = cacheDom.get('label[for=p_method_worldpay_cc]', true);
    cardLabel.innerHTML = `
      <img class="itx9-card-logo" src="//d191y0yd6d0jy4.cloudfront.net/9zma08d2oq3xrnq.png" />
      Pay by Debit or Credit Card
    `;

    this.setDefaultPaymentMethods();

    // Payment methods chosen
    const paymentMethods = cacheDom.getAll('[name="payment[method]"]', true);
    [].forEach.call(paymentMethods, (item) => {
      item.addEventListener('change', (e) => {
        const method = e.currentTarget.id;
        const btnCheckout = cacheDom.get('#checkout-review-load .btn-checkout', true);
        const paypalComplete = cacheDom.get('#checkout-review-load #paypal-complete', true);
      
        events.send(null, 'did-choose-payment-method', method);

        if(btnCheckout && paypalComplete) {
          if(method == 'p_method_gene_braintree_paypal') {
            payment.save();

            paypalComplete.style.display = 'block';
            btnCheckout.style.display = 'none';
          } else {
            paypalComplete.style.display = 'none';
            btnCheckout.style.display = 'block';
          }
        }
      });
    });

    // We need to bring the checkout-step-review into the payment step
    // and in order to prevent issues with popup blocking etc. ensure
    // that the payment button is the loaded button (cannot trigger faux click).
    const reviewDiv = cacheDom.get('#checkout-step-review', true);
    const paymentDiv = cacheDom.get('#checkout-step-payment', true);
    paymentDiv.insertAdjacentElement('afterend', reviewDiv);

  }

  /**
   * @desc Save step
   */
  saveStep() {
    // @todo
  }

  /**
   * @desc Set title
   */
  setTitle() {
    const stepTitle = this.step.querySelector('.step-title');
    stepTitle.innerHTML = '<h3>Payment</h3>';

    const paymentMethods = cacheDom.get('.site-footer .payment-methods');

    stepTitle.insertAdjacentHTML('afterend', `
        <footer class="itx9-cards-wrapper__subtitle">
        ${paymentMethods.outerHTML}
        </footer>

        <p class="itx9-step-subtitle itx9-step-subtitle--payment">
          Select a secure method of payment below
        </p>
    `);
  }

  /**
   * @desc UI and pricing changes
   */
  additionalUI() {
    const subtitle = this.step.querySelector('.itx9-step-subtitle');
    subtitle.insertAdjacentHTML('afterend', `
      <p class="itx9-order-total">
        <span class="itx9-order-total__text">Total:</span>
        <span class="itx9-order-total__price"></span>
      </p>
      <p class="itx9-view-full-order">
        <a class="itx9-view-full-order__link">Review full order</a>
      </p>
    `);

    const i = 'jQuery';
    cacheDom.get('.itx9-view-full-order__link').addEventListener('click', () => {
      window[i.substring(0)]('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-left');
      
      events.send(null, 'did-click-view-full-order');
    });

    // Price updater when price chanegs
    this.currentGrandTotal = 0;

    /**
     * Poll grand total price
     */
    const priceUpdater = () => {
      let price = window.quoteBaseGrandTotal;
      const useCustomerBalance = cacheDom.get('#use_customer_balance', true);
      if(useCustomerBalance && useCustomerBalance.checked) {
        const balanceString = cacheDom.get('#customerbalance_available_amount .price', true);
        if(balanceString) {
          // If balance used, we need to add the balance back on
          price += parseFloat(balanceString.innerText.trim().replace('£', ''));
        }
      }

      if(price && this.currentGrandTotal != price) {
        const formattedPrice = window.formatCurrency(price, {
          "pattern":"\u00a3%s",
          "precision":2,
          "requiredPrecision":2,
          "decimalSymbol":".",
          "groupSymbol":",",
          "groupLength":3,
          "integerRequired":1
        });

        cacheDom.get('.itx9-order-total .itx9-order-total__price').innerHTML = formattedPrice;

        this.currentGrandTotal = price;
      }

      setTimeout(priceUpdater, 500);
    };
    priceUpdater();

    // Work around issue with payment methods needing to be switched
    // when the balance is checked
    const useBalance = cacheDom.get('#use_customer_balance');
    if(useBalance) {
      useBalance.addEventListener('change', (e) => {
        if(!e.currentTarget.checked) {
          const worldpayMethod = cacheDom.get('#p_method_worldpay_cc', true);
          const paypalMethod = cacheDom.get('#p_method_gene_braintree_paypal', true);
          if(paypalMethod) {
            showLoader();

            paypalMethod.click();
          }
        }
      });
    }
  }

  /**
   * @desc Register validator
   */
  registerValidator(success, error) {
    const validateOnTimer = () => {
      const worldpayMethod = cacheDom.get('#p_method_worldpay_cc', true);
      if(worldpayMethod && worldpayMethod.checked) {
        const methodBlocks = cacheDom.getAll('.worldpay-method-block', true);

        let allValid = true;


        let activeBlocks = 0;
        [].forEach.call(methodBlocks, (item) => {
          if(item.style.display != 'none') {
            activeBlocks++;
            const requiredFields = item.querySelectorAll('.required-entry');
            [].forEach.call(requiredFields, (field) => {
              if(field.value.trim() == '') {
                allValid = false;  
              }
            });
          }
        });

        if(activeBlocks == 0) {
          error.call();
        } else {
          if(allValid) {
            success.call();
          } else {
            error.call();
          }
        }

      }

      setTimeout(validateOnTimer, this.VALIDATION_ITERATION_DELAY);
    };

    validateOnTimer();
  }
}

export const paymentStep = new Payment('#opc-payment');
