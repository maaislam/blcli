/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const discountSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
  <path d="M19.9333 5.55833C19.9333 5.55833 20.0292 5.65417 20.0292 5.75V17.1542C20.0292 17.25 19.9333 17.3458 19.9333 17.3458H6.80415L3.06665 11.6917C2.97082 11.5958 2.97082 11.5 3.06665 11.4042L6.80415 5.75H19.9333M19.9333 4.50417H6.80415C6.42082 4.50417 6.13332 4.69583 5.94165 4.98333L2.20415 10.6375C1.91665 11.1167 1.91665 11.6917 2.20415 12.075L5.94165 17.7292C6.13332 18.0167 6.51665 18.2083 6.80415 18.2083H19.9333C20.5083 18.2083 21.0833 17.6333 21.0833 16.9625V5.84583C21.0833 5.07917 20.6041 4.50417 19.9333 4.50417Z" fill="black"/>
  <path d="M9.48747 10.7333C9.19997 10.35 9.0083 9.96666 9.0083 9.4875C9.0083 9.00833 9.19997 8.625 9.48747 8.3375C9.77497 8.05 10.2541 7.85833 10.7333 7.85833C11.2125 7.85833 11.5958 8.05 11.9791 8.3375C12.2666 8.625 12.4583 9.00833 12.4583 9.4875C12.4583 9.96666 12.2666 10.35 11.9791 10.7333C11.5958 11.0208 11.2125 11.2125 10.7333 11.2125C10.2541 11.2125 9.8708 11.0208 9.48747 10.7333ZM15.6208 7.7625L10.5416 15.2375H9.5833L14.5666 7.85833H15.6208V7.7625ZM11.2125 9.00833C11.0208 8.81666 10.925 8.81666 10.7333 8.81666C10.5416 8.81666 10.35 8.9125 10.2541 9.00833C10.1583 9.10416 10.0625 9.29583 10.0625 9.58333C10.0625 9.87083 10.1583 9.96666 10.2541 10.1583C10.35 10.35 10.5416 10.35 10.7333 10.35C10.925 10.35 11.1166 10.2542 11.2125 10.1583C11.3083 10.0625 11.4041 9.87083 11.4041 9.58333C11.4041 9.29583 11.4041 9.10416 11.2125 9.00833ZM13.225 14.6625C12.9375 14.375 12.7458 13.8958 12.7458 13.4167C12.7458 12.9375 12.9375 12.5542 13.225 12.2667C13.5125 11.8833 13.9916 11.7875 14.4708 11.7875C14.95 11.7875 15.3333 11.9792 15.7166 12.2667C16.1 12.5542 16.1958 13.0333 16.1958 13.5125C16.1958 13.9917 16.0041 14.375 15.7166 14.7583C15.3333 15.0458 14.95 15.2375 14.4708 15.2375C13.8958 15.2375 13.5125 15.0458 13.225 14.6625ZM14.95 12.9375C14.7583 12.7458 14.6625 12.7458 14.4708 12.7458C14.2791 12.7458 14.0875 12.8417 13.9916 12.9375C13.8958 13.1292 13.8 13.225 13.8 13.5125C13.8 13.7042 13.8958 13.8958 13.9916 14.0875C14.0875 14.2792 14.2791 14.2792 14.4708 14.2792C14.6625 14.2792 14.8541 14.1833 14.95 14.0875C15.0458 13.9917 15.1416 13.8 15.1416 13.5125C15.1416 13.225 15.0458 13.1292 14.95 12.9375Z" fill="black"/>
</svg>
`;

const arrowSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" class="${ID}-discount-arrow">
  <g clip-path="url(#clip0_64_418)">
    <path d="M4.09084 11.9283L9.84616 6.1732C9.8903 6.12647 9.91489 6.06463 9.91489 6.00035C9.91489 5.93607 9.8903 5.87423 9.84616 5.8275L4.09061 0.0717178C4.04477 0.0258758 3.98259 0.00012207 3.91776 0.00012207C3.85293 0.00012207 3.79075 0.0258758 3.74491 0.0717178L2.15631 1.65937C2.11047 1.70522 2.08472 1.76739 2.08472 1.83223C2.08472 1.89706 2.11047 1.95923 2.15631 2.00508L6.1517 6L2.15631 9.99516C2.11212 10.0419 2.08749 10.1037 2.08749 10.168C2.08749 10.2323 2.11212 10.2942 2.15631 10.3409L3.7442 11.9283C3.76692 11.9511 3.79393 11.9692 3.82367 11.9816C3.85342 11.994 3.88531 12.0003 3.91752 12.0003C3.94974 12.0003 3.98163 11.994 4.01138 11.9816C4.04112 11.9692 4.06813 11.9511 4.09084 11.9283Z" fill="black"/>
  </g>
  <defs>
    <clipPath id="clip0_64_418">
      <rect width="12" height="12" fill="white"/>
    </clipPath>
  </defs>
</svg>
`;

const startExperiment = () => {
  pollerLite(['#main .cart-total .cart-action-checkout'], () => {
    console.log('Experiment started');

    const originalCoupon = document.querySelector('#main .cart-items-form .voucher-field input');
    const originalSubmit = document.querySelector('#main .cart-items-form .voucher-field button');
    const discountMessage = document.querySelectorAll('#main .cart-items-form .cart-coupon-code .applied-coupon');
    console.log(discountMessage, 'DISCOUNT MESSAGE');
    const couponError = document.querySelector('#main .cart-items-form .cart-coupon-code .coupon-error');

    // originalCoupon.value = 'TEST';

    const orderSummaryTarget = document.querySelector('#main .cart-total .order-totals-table');

    const subtotal = orderSummaryTarget.querySelector('.order-subtotal td:last-child').innerText;
    const total = orderSummaryTarget.querySelector('.order-total td:last-child').innerText;
    const delivery = orderSummaryTarget.querySelector('.order-shipping td:last-child').innerText;
    const discount = orderSummaryTarget.querySelector('.order-discount');
    const deliveryDiscount = orderSummaryTarget.querySelector('.order-shipping-discount');

    // console.log(subtotal, total, delivery);

    const newOrderSummaryHtml = (subtotal, delivery, total, discountMessage, couponError) => {
      return `
      <div class="${ID}-order-summary">
        <div class="${ID}-order-summary-title">
          <h3>Basket summary</h3>
        </div>
        <div class="${ID}-order-summary-discount">
          <div class="${ID}-order-summary-discount-title">
            <div class="${ID}-order-summary-discount-title-header">
              ${discountSVG} <h4>Got A Discount Code?</h4>
            </div>
            ${arrowSVG}
          </div>
          ${couponError ? 
          `<div class="${ID}-order-summary-coupon-error">
           ${couponError.innerText}
          </div>` : ''}
          ${discountMessage ? 
            Array.from(discountMessage).map(element => {
              // console.log(element, 'ELEMENT');
              return `<div class="${ID}-order-summary-discount-message">
              ${element.innerHTML}
             </div>`
            }).join('')
              : ''}
          <div class="${ID}-order-summary-discount-input ${ID}-display-none">
            <input type="text" class="${ID}-order-summary-discount-input-field" placeholder="ENTER CODE HERE">
            <button class="${ID}-order-summary-discount-input-button">APPLY</button>
          </div>
        </div>
        <div class="${ID}-order-summary-subtotal">
        <div class="${ID}-order-summary-subtotal-row">
          <div class="${ID}-order-summary-subtotal-title">
            <h3>Subtotal</h3>
          </div>
          <div class="${ID}-order-summary-subtotal-price">
            <h3>${subtotal}</h3>
          </div>
        </div>
        ${discount ? `
        <div class="${ID}-order-summary-subtotal-row">
          <div class="${ID}-order-summary-subtotal-discount">
            <h3>${discount.querySelector('td').innerText}</h3>
          </div>
          <div class="${ID}-order-summary-subtotal-discount-price">
            <h3>${discount.querySelector('.amount').innerText}</h3>
          </div>
        </div>
        ` : ''}
        <div class="${ID}-order-summary-subtotal-row">
          <div class="${ID}-order-summary-subtotal-delivery">
            <h3>Estimated Delivery</h3>
          </div>
          <div class="${ID}-order-summary-subtotal-delivery-price">
            <h3>${delivery}</h3>
          </div>
        </div>
        ${deliveryDiscount ? `
          <div class="${ID}-order-summary-subtotal-row">
            <div class="${ID}-order-summary-subtotal-delivery-discount">
              <h3>Delivery Discount</h3>
            </div>
            <div class="${ID}-order-summary-subtotal-delivery-discount-price">
              <h3>${deliveryDiscount.querySelector('td:last-child').innerHTML}</h3>
            </div>
          </div>`
         : ''}
        </div>
        <div class="${ID}-order-summary-total">
          <div class="${ID}-order-summary-total-title">
            <h3>Total</h3>
          </div>
          <div class="${ID}-order-summary-total-price">
            <h3>${total}</h3>
          </div>
        </div>
      </div>
    `
    };

    const newOrderSummary = newOrderSummaryHtml(subtotal, delivery, total, discountMessage, couponError);
    orderSummaryTarget.insertAdjacentHTML('beforebegin', newOrderSummary);

    const discountCode = document.querySelector(`.${ID}-order-summary-discount-title`);
    const discountInputField = document.querySelector(`.${ID}-order-summary-discount-input`);
    const discountInputButton = document.querySelector(`.${ID}-order-summary-discount-input-button`);
    const removeDiscount = document.querySelectorAll(`.${ID}-order-summary-discount-message .remove-coupon`);

    discountCode.addEventListener('click', () => {
      // console.log('clicked');
      discountInputField.classList.toggle(`${ID}-display-none`);
      checkOpenDiscount();
    });

    discountInputButton.addEventListener('click', () => {
      // console.log('clicked');
      // console.log(originalCoupon, discountInputField.querySelector('input').value);
      originalCoupon.value = discountInputField.querySelector('input').value;
      originalSubmit.click();
    });

    removeDiscount.forEach((element, index) => {
      element.addEventListener('click', () => {
        const removeDiscountButtons = document.querySelectorAll('#main .cart-items-form .cart-coupon-code .remove-coupon');
        removeDiscountButtons[index].click();
      });
    })
    // .addEventListener('click', () => {
    //   const removeDiscountButton = document.querySelector('#main .cart-items-form .cart-coupon-code .remove-coupon');
    //   removeDiscountButton.click();
    // });

    const discountArrow = document.querySelector(`.${ID}-discount-arrow`);

    const checkOpenDiscount = () => {
      if (!discountInputField.classList.contains(`${ID}-display-none`)) {
        discountArrow.style.transform = 'rotate(90deg)';
      } else {
        discountArrow.style.transform = 'rotate(0deg)';
      }
    };

    checkOpenDiscount();

    const successMsg = document.querySelector(`.${ID}-order-summary-discount-message .applied-coupon-msg`);
    if (successMsg) {
      // discountInputField.classList.remove(`${ID}-display-none`);
      discountCode.click();
    }

  });
}

export default () => {

  newEvents.initiate = true;
  newEvents.method = ['ga4'];
  newEvents.property = 'G-B37NQR1RWZ';

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  
  startExperiment();
};
