/**
 * IT060
 *
 * Global variables:
 * 1. Set window.IT60_DISABLE_FREE_SPEND_MESSAGE = true 
 * 2. Set window.IT60_FREE_DELIVERY_THRESHOLD = 60 (numeric value (default = 60))
 */
import {cacheDom} from '../../../../../lib/cache-dom';

/**
 * Run amends for all scenarios
 */
export const runAll = () => {
  document.body.classList.add('it060');

  const currencySymbol = '£';

  // ------------------------------------------------------
  // Toggle edit product 
  // ------------------------------------------------------
  const qtyInput = cacheDom.getAll('.IT028_prod__qty .qty');

  [].forEach.call(cacheDom.getAll('.IT028_change-size-btn'), (item) => {
    item.classList.add('it60-hide');
  });
  [].forEach.call(qtyInput, (item) => {
    item.classList.add('it60-hide');

    const curQty = item.value;
    item.insertAdjacentHTML('afterend', `
        <span class="it60-prod-qty">${curQty}</span>
    `);
  });

  [].forEach.call(cacheDom.getAll('.IT028_change-size-btn'), (item) => {
    item.insertAdjacentHTML('afterend', `
        <div class="IT028_btn it60-btn--edit-product">Edit Product</div>
    `);
  });

  [].forEach.call(cacheDom.getAll('.it60-btn--edit-product'), (item) => {
    item.addEventListener('click', (e) => {
      e.currentTarget.classList.add('it60-hide');

      e.currentTarget.parentNode.querySelector('.IT028_change-size-btn').classList.remove('it60-hide');
      e.currentTarget.parentNode.querySelector('.it60-prod-qty').classList.add('it60-hide');

      e.currentTarget.parentNode.querySelector('.IT028_prod__qty .qty').classList.remove('it60-hide');
    });
  });
  
  // ------------------------------------------------------
  // Pricing against product row items
  // ------------------------------------------------------
  [].forEach.call(cacheDom.getAll('.IT028_prod__price'), (item, idx) => {
    // Modify prod price markup
    const prodPrice = item.textContent.trim();
    const prodPriceFloat = parseFloat(prodPrice.replace(currencySymbol, ''));

    item.innerHTML = `<span class="it60-final-price">${prodPrice}</span>`;
    
    const productRows = cacheDom.getAll('#shopping-cart-table tbody tr');
    if(productRows) {
      const correspondingRow = productRows[idx];
      const oldPrice = correspondingRow.querySelector('.old-price');
      if(oldPrice) {
        const correspondingPrice = oldPrice.textContent.trim();
        const correspondingPriceFloat = parseFloat(correspondingPrice.replace(currencySymbol, ''));
        const saving = correspondingPriceFloat - prodPriceFloat;

        if(saving > 0) {
          item.insertAdjacentHTML('afterbegin', `
            <span class="it60-orig-price">${currencySymbol}${correspondingPriceFloat}</span>
          `);

          item.insertAdjacentHTML('beforeend', `
            <span class="it60-saving">You saved ${currencySymbol}${saving.toFixed(2)}</span>
          `);
        }
      }
    }
  });

  // ------------------------------------------------------
  // Free Delivery Spend Thresholds
  // ------------------------------------------------------
  if(!window.IT60_DISABLE_FREE_SPEND_MESSAGE) {
    let deliveryThreshold = window.IT60_FREE_DELIVERY_THRESHOLD || 60;
    const subtotal = cacheDom.get('.IT028_total-field .price');

    if(deliveryThreshold > 0 && subtotal) {
      const subtotalFloat = parseFloat(subtotal.textContent.replace(currencySymbol, '').trim());
      const amountToSpend = deliveryThreshold - subtotalFloat;

      if(amountToSpend > 0) {
        const totalField = cacheDom.get('.IT028_total-field[id*=method]');

        totalField.insertAdjacentHTML('afterend', `
            <tr>
              <td colspan="2" class="it60-free-delivery-threshold">
                Spend an extra ${currencySymbol}${amountToSpend.toFixed(2)} for free delivery
              </td>
            </tr>
        `);
      }
    }
  }
};

/**
 * Run when the identifying message exists
 */
export const runOnIdentifyingMessageExists = () => {
  // ------------------------------------------------------
  // Move the identifying message if it's been positioned after the bottom checkout
  // button - sometimes the message gets placed after the first button (race conditions 
  // in IT028)
  // ------------------------------------------------------
  const identifyingMessage = cacheDom.get('.IT028_discount-identifying-message');

  if(identifyingMessage && cacheDom.get('.col-right.sidebar .IT028_discount-identifying-message')) {
    const btnProceed = cacheDom.get('.col-main .btn-proceed-checkout');
    btnProceed.insertAdjacentElement('afterend', identifyingMessage);
  }

  // ------------------------------------------------------
  // Clone message to bottom buton
  // ------------------------------------------------------
  const btnProceedBottom = cacheDom.get('.col-right.sidebar .btn-proceed-checkout');
  if(identifyingMessage && btnProceedBottom) {
    btnProceedBottom.insertAdjacentHTML('afterend', identifyingMessage.outerHTML);
  }
};

/**
 * Run when the voucher message is visible - voucher code added
 */
export const runOnVoucherAdd = () => {
  // ------------------------------------------------------
  // Fade the voucher out and show the discount identifying message
  // ------------------------------------------------------
  const identifyingMessage = cacheDom.get('.IT028_discount-identifying-message');
  const messageDiv = cacheDom.get('.cart > [id^=messages]');

  messageDiv.classList.add('it60-mb0');

  // ------------------------------------------------------
  // Move the identifying message if it's been positioned after the bottom checkout
  // button - sometimes the message gets placed after the first button (race conditions 
  // in IT028)
  // ------------------------------------------------------
  if(messageDiv) {
    identifyingMessage.classList.add('IT028_discount-identifying-message--inactive');

    setTimeout(() => {
      messageDiv.classList.add('it60-fade-out');
      messageDiv.addEventListener('animationEnd', () => {
          messageDiv.classList.add('it60-hide');
      });
      messageDiv.addEventListener('webkitAnimationEnd', () => {
          messageDiv.classList.add('it60-hide');
      });

      if(identifyingMessage) {
        identifyingMessage.classList.add(
          'IT028_discount-identifying-message--active'
        );
      }
    }, 4000);
  }
};

/**
 * Run for when cancel voucher code exists
 */
export const runForCancelVoucher = () => {
  const discountForm = cacheDom.get('#discount-coupon-form');
  
  if(discountForm) {
    discountForm.classList.add('it60-hide');
    discountForm.insertAdjacentHTML('afterend',  `
      <div class="it60-discount-successful">
        <p class="it60-discount-successful__message">Voucher successfully applied</p>
        <p class="it60-text-center">
          <a class="it60-discount-cancel">Cancel Voucher Code</a>
        </p>
      </div>
    `);

    cacheDom.get('.it60-discount-cancel').addEventListener('click', (e) => {
        const cancelBtn = discountForm.querySelector('.buttons-set button');
        if(cancelBtn) {
          cancelBtn.click();
        }
    });
  }
};
