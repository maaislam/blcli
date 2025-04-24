import { fullStory } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);
};

export const deliveryInformationRebuild = () => {
  const { ID, VARIATION } = shared;

  document.querySelector(`.toggle-information.delivery-options h4.toggle-title`).innerHTML = `Delivery information`;
  const newDeliveryInfoContent = `<ul class="${ID}-deliveryInformation__wrapper">
    <li class="gift-by-text prod-opt-e true">
      <div class="content-asset">
        <h5>GIFT BY TEXT</h5>
        <div class="content-enabled">
          <p>This item is available to send as a gift text message to your allocated recipient. <a href="https://www.hotelchocolat.com/uk/about-gift-by-text.html"> Read more</a></p>
        </div>
        <div class="content-disabled">
          <p>Sorry, it is currently not possible to send this item as a gift text message. <a href="https://www.hotelchocolat.com/uk/about-gift-by-text.html"> Read more</a></p>
        </div>
      </div> <!-- End content-asset -->
    </li>
    <li class="uk-delivery prod-opt-b true">
      <div class="content-asset">
        <h5>UK DELIVERY</h5>
        <div class="content-enabled">
          <p>Standard delivery from just £3.95. Next day and nominated day delivery options also available from just £5.95. *(Next Day &amp; nominated day are not available on Tasting Club Introductory Boxes.) <a href="https://www.hotelchocolat.com/uk/help/delivery.html"> Read more</a></p>
        </div>
        <div class="content-disabled">
          <p>Sorry UK Delivery is not available during checkout.<a href="https://www.hotelchocolat.com/uk/help/delivery.html"> Read more</a></p>
        </div>
      </div> <!-- End content-asset -->
    </li>
    <li class="click-collect prod-opt-c true">
      <div class="content-asset">
        <h5>CLICK &amp; COLLECT</h5>
        <div class="content-enabled">
          <p>Available from over 100 locations. <a href="https://www.hotelchocolat.com/uk/help/delivery.html">Read more</a></p>
        </div>
        <div class="content-disabled">
          <p>Sorry, Click &amp; Collect is not available during checkout. <a href="https://www.hotelchocolat.com/uk/help/delivery.html">Read more</a></p>
        </div>
      </div> <!-- End content-asset -->
    </li>
    <li class="international-delivery prod-opt-d true">
      <div class="content-asset">
        <h5>INTERNATIONAL DELIVERY</h5>
        <div class="content-enabled">
          <p>This item is eligible for international delivery. <a href="https://www.hotelchocolat.com/uk/help/delivery.html"> Read more</a></p>
        </div>
        <div class="content-disabled">
          <p>Sorry international delivery is not available during checkout.<a href="https://www.hotelchocolat.com/uk/help/delivery.html"> Read more</a></p>
        </div>
      </div> <!-- End content-asset -->
    </li>
  </ul>`;

  document.querySelector('.delivery-options .delivery-block').insertAdjacentHTML('afterbegin', newDeliveryInfoContent);
  document.querySelector('.delivery-options .delivery-block').insertAdjacentHTML('beforebegin', `<h4 class="${ID}-header">Delivery information</h4><div id="${ID}-close">X</div>`);
  document.querySelector('.delivery-options .toggleContent').insertAdjacentHTML('afterend', `<div class="${ID}-overlay"></div>`);
  
  const deliveryInfoOptions = document.querySelectorAll('.delivery-options .delivery-block .delivery-info');
  [].forEach.call(deliveryInfoOptions, (option) => {
    let title = option.querySelector('span').innerText;
    let optionId = title.toLowerCase().replace(' ', '-').replace(' ', '-');
    //optionId = title.toLowerCase().replace(' ', '-');
    if (title.indexOf('Click') > -1) {
      optionId = 'click-collect';
    }
    const optionImg = option.querySelector('img').getAttribute('src');
    let availabilityCheck = '';
    if (optionImg.indexOf('_f.png') > -1) {
      availabilityCheck = 'disabled';
    } else {
      availabilityCheck = 'enabled';
    }

    document.querySelector(`ul.${ID}-deliveryInformation__wrapper li.${optionId}`).classList.add(`${availabilityCheck}`);
  });

  observer.connect(document.querySelector('.toggle-information.delivery-options .toggleContent'), () => {
    // console.log('SOMETHING HAS CHANGED-------');
    if (document.querySelector('.toggle-information.delivery-options .toggleContent').classList.contains('show')) {
      document.querySelector(`.${ID}-overlay`).classList.add('show');
    } else {
      document.querySelector(`.${ID}-overlay`).classList.remove('show');
    }
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
      // subtree: true,
    },
  });
// --- CLOSE Lightbox
  document.querySelector(`#${ID}-close`).addEventListener('click', (e) => {
    document.querySelector('.toggle-information.delivery-options h4').click();
  });
  document.querySelector(`.${ID}-overlay`).addEventListener('click', (e) => {
    document.querySelector('.toggle-information.delivery-options h4').click();
  });
};


export const checkHiddenCouponField = () => {
  const { ID, VARIATION } = shared;

  const hiddenCouponForm = document.querySelector(`form.cart-coupon-code.toggle-information`);
  const errorMsg = hiddenCouponForm.querySelector('.coupon-error');
  const allAppliedCodes = hiddenCouponForm.querySelectorAll('.applied-coupon');
  const notAppliedCode = document.querySelector('p.not-applied');

  if (errorMsg.innerText.trim() !== '') {
    // alert(errorMsg.innerText.trim());

    document.querySelector(`.${ID}-discountInput__row`).classList.add('toggle');
    document.querySelector(`.${ID}-discountInput__error .error-messages`).insertAdjacentHTML('afterbegin', errorMsg.outerHTML);
  } 

  let listOfCoupons = '';
  [].forEach.call(allAppliedCodes, (appliedCode) => {
    if (appliedCode && appliedCode.querySelector('p.applied-coupon-code').innerText.trim() !== '') {
      // alert(appliedCode.querySelector('p.applied-coupon-code').innerText.trim());
      const codeApplied = appliedCode.querySelector('p.applied-coupon-code');
      const codeAppliedText = codeApplied.innerText.trim();
      const codeAppliedId = codeApplied.getAttribute('promo');
      let codeNotAppliedMsg = '';
      if (appliedCode.querySelector('p.not-applied')) {
        let codeError = appliedCode.querySelector('p.not-applied').outerHTML;
        codeNotAppliedMsg = `<tr><td class="${ID}-notApplicable">${codeError}</td><td></td></tr>`
      }
      const codeAppliedRow = `<tr class="${ID}-code-applied">
        <td class="${ID}-code-name">${codeAppliedText} code applied</td><td class="${ID}-remove" id="${codeAppliedId}">Remove</td> 
      </tr>
      ${codeNotAppliedMsg}`;
      listOfCoupons += codeAppliedRow;
    }
  });

  document.querySelector('table.order-totals-table tr.order-shipping').insertAdjacentHTML('beforebegin', listOfCoupons);
  // [].forEach.call(allAppliedCodes, (appliedCode) => {
  //   if (appliedCode && appliedCode.querySelector('p.applied-coupon-code').innerText.trim() !== '') {
  //     // alert(appliedCode.querySelector('p.applied-coupon-code').innerText.trim());
  //     const codeApplied = appliedCode.querySelector('p.applied-coupon-code');
  //     const codeAppliedText = codeApplied.innerText.trim();
  //     const codeAppliedId = codeApplied.getAttribute('promo');
  //     const codeAppliedRow = `<tr class="${ID}-code-applied">
  //       <td class="${ID}-code-name">${codeAppliedText} code applied</td><td class="${ID}-remove" id="${codeAppliedId}">Remove</td> 
  //     </tr>`;

  //     document.querySelector('table.order-totals-table tr.order-shipping').insertAdjacentHTML('afterend', listOfCoupons);
  //   }
  // });
  
  

  // // --- Check if any of the applied codes DOES NOT meet conditions
  // if (notAppliedCode && notAppliedCode.innerText.trim() !== '') {
  //   // alert('not applied');
  //   // document.querySelector(`.${ID}-discountText__row`).insertAdjacentHTML('beforebegin', `<tr><td class="${ID}-notApplicable"></td><td></td></tr>`);
  //   const allCouponsApplied = document.querySelectorAll(`.${ID}-code-applied`);
  //   const lastCouponApplied = allCouponsApplied[allCouponsApplied.length - 1];
  //   // document.querySelector(`td.${ID}-notApplicable`).insertAdjacentElement('afterbegin', notAppliedCode);
  //   lastCouponApplied.insertAdjacentHTML('afterend', `<tr><td class="${ID}-notApplicable"></td><td></td></tr>`);
  //   document.querySelector(`td.${ID}-notApplicable`).insertAdjacentElement('afterbegin', notAppliedCode);
  // }

  removeAppliedCodes();
};

export const removeAppliedCodes = () => {
  const { ID, VARIATION } = shared;

  const removeCtaButtons = document.querySelectorAll(`.${ID}-remove`);
  [].forEach.call(removeCtaButtons, (rmBtn) => {
    rmBtn.addEventListener('click', (e) => {
      // alert('remove');
      const codeId = rmBtn.getAttribute('id');
      document.querySelector(`.applied-coupon-code[promo="${codeId}"]`).parentElement.querySelector('button.remove-coupon').click();
    });
  });
};

export const generateCouponInputField = () => {
  const { ID, VARIATION } = shared;

  const cartTotalTable = document.querySelector('.cart-total table.order-totals-table');
  const orderTotalField = cartTotalTable.querySelector('tr.order-total');
  const newDiscountField = `<tr class="${ID}-discountText__row">
    <td>Got a discount code? Add it here</td> 
    <td></td>
  </tr>
  <tr class="${ID}-discountInput__row">
    <td>
      <div class="${ID}-dicountInput__wrapper voucher-field">
        <input type="text" name="${ID}_cart_couponCode" id="${ID}_cart_couponCode" placeholder="Enter code here" aria-label="Enter code here">
      </div>
    </td>
    <td style="float: left;">
      <button type="submit" value="${ID}_cart_addCoupon" name="${ID}_cart_addCoupon" id="${ID}-add-coupon" class="button-black">
      Apply
      </button>
    </td>
  </tr>
  <tr class="${ID}-discountInput__error">
    <td class="error-messages">
      <div class="${ID}-coupon-error empty-code">Please Enter a Coupon Code</div>
    </td>
    <td></td>
  </tr>
  <tr class="${ID}-discountInput__subtext">
    <td>
      <p class="note" style="font-size: .7em;margin-top: 5px;">* Please note that Gift Cards cannot be redeemed at this stage of the checkout.</p>
    </td>
    <td></td>
  </tr>`;
  orderTotalField.insertAdjacentHTML('beforebegin', newDiscountField);

// --- SHOW/HIDE voucher code input
  document.querySelector(`.${ID}-discountText__row`).addEventListener('click', (e) => {
    document.querySelector(`tr.${ID}-discountInput__row`).classList.toggle('show');

    if (document.querySelector(`tr.${ID}-discountInput__row`).classList.contains('show')) {
      document.querySelector(`tr.${ID}-discountInput__subtext`).classList.add('show');
    } else {
      document.querySelector(`tr.${ID}-discountInput__subtext`).classList.remove('show');
    }
  });

// --- CLICK apply
  const couponContainerRow = document.querySelector(`tr.${ID}-discountInput__row`);
  const applyCta = document.querySelector(`#${ID}-add-coupon`);
  const couponCodeEmptyError = document.querySelector(`.${ID}-coupon-error.empty-code`);
  applyCta.addEventListener('click', (e) => {
    const voucherValue = document.querySelector(`input#${ID}_cart_couponCode`).value;
    // alert(voucherValue);
    // alert(voucherValue == '');
    if (voucherValue == '') {
      couponCodeEmptyError.classList.add('show');

      setTimeout(() => {
        couponCodeEmptyError.classList.remove('show');
      }, 3000);
    } else {
      const hiddenInput = document.querySelector('input#dwfrm_cart_couponCode');
      const hiddenApplyCta = document.querySelector('button#add-coupon');
      hiddenInput.value = voucherValue;
      hiddenApplyCta.click();
    }
  });

  // --- ENTER press on input field
  document.querySelector(`input#HC028_cart_couponCode`).addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      const voucherValue = document.querySelector(`input#${ID}_cart_couponCode`).value;
      // alert(voucherValue);
      // alert(voucherValue == '');
      if (voucherValue == '') {
        couponCodeEmptyError.classList.add('show');

        setTimeout(() => {
          couponCodeEmptyError.classList.remove('show');
        }, 3000);
      } else {
        const hiddenInput = document.querySelector('input#dwfrm_cart_couponCode');
        const hiddenApplyCta = document.querySelector('button#add-coupon');
        hiddenInput.value = voucherValue;
        hiddenApplyCta.click();
      }
    }
  });
};
