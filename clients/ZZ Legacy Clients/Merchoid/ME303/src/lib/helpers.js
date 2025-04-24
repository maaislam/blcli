import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export const generateSuccessMessage = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  // --- Discount Code set up
  let discountCode = 'UCPL20';
  let amount = '20';
  if (VARIATION == '4') {
    discountCode = 'UCAF30';
    amount = '30';
  }

  let successMsg = '';
  let voucherAmount;
  let spendAmount;
  let prodMinPrice;

  if(window.location.href.indexOf('/uk/') > -1) {
    voucherAmount = '10% off';
    spendAmount = `£${amount}`;
    prodMinPrice = `£${amount}`;
  } else if(window.location.href.indexOf('/eu/') > -1) {
    voucherAmount = '10% off';
    spendAmount = `€${amount}`;
    prodMinPrice = `€${amount}`;
  } else {
    voucherAmount = '10% off';
    spendAmount = `$${amount}`;
    prodMinPrice = `$${amount}`;
  }
  
  if (VARIATION == '1') {
    successMsg = `<div class="${ID}-blockHeading">
        <h3>Don’t forget to use your voucher</h3>
    </div>
    <div class="${ID}-voucherBlock">
        <p>Enter your unique code at checkout for <span>${voucherAmount}</span> when you spend ${spendAmount}</p>
        <div class="${ID}-voucher">
            <input type="text" readonly value="${discountCode}"/>
            <div class="${ID}-copyButton"></div>
        </div>

    </div>
    <div class="${ID}-button ${ID}-continueShopping" href="/">Continue Shopping</div>`;
  } else if (VARIATION == '2' || VARIATION == '4') {
    successMsg = `<div class="${ID}-blockHeading">
        <h3>Thanks for signing up!</h3>
    </div>
    <div class="${ID}-voucherBlock">
        <p>Just add <strong>any</strong> product over ${prodMinPrice} to your basket to receive your mystery discount</p>
        <div class="${ID}-voucher" style="display: none !important;">
            <input type="text" readonly value="${discountCode}"/>
            <div class="${ID}-copyButton"></div>
        </div>

    </div>
    <div class="${ID}-button ${ID}-continueShopping" href="/">Continue Shopping</div>`;
  } else if (VARIATION == '3') {
    successMsg = `<div class="${ID}-blockHeading">
        <h3>Thanks for signing up!</h3>
    </div>
    <div class="${ID}-voucherBlock">
        <p>Just add <strong>any</strong> product over ${prodMinPrice} within</br><strong>30 minutes</strong> to your basket to receive your mystery discount</p>
        <div class="${ID}-voucher" style="display: none !important;">
            <input type="text" readonly value="${discountCode}"/>
            <div class="${ID}-copyButton"></div>
        </div>

    </div>
    <div class="${ID}-button ${ID}-continueShopping" href="/">Continue Shopping</div>`;
  } 

  return successMsg;
}

export const userSubscribed = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  let discountCode = document.querySelector(`.${ID}-voucher input`).getAttribute('value');
  localStorage.setItem(`${ID}-discount-code`, `${discountCode}`);
  localStorage.setItem(`${ID}-subscribed-user-v${VARIATION}`, 1);
}


export const getProductPrice = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  let prodPrice = null;

  if (!!window.dataLayer && !!window.dataLayer[0] && !!window.dataLayer[0].ecommerce
  && !!window.dataLayer[0].ecommerce.detail && !!window.dataLayer[0].ecommerce.detail.products
  && !!window.dataLayer[0].ecommerce.detail.products[0] && !!window.dataLayer[0].ecommerce.detail.products[0].price) {
    prodPrice = window.dataLayer[0].ecommerce.detail.products[0].price;
    prodPrice = parseFloat(prodPrice);
  }

  return prodPrice
}

export const addToBagClickEvent = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;
  
  
  let addToCartCTA = document.querySelector('.box-tocart .actions #product-addtocart-button');
  addToCartCTA.addEventListener('click', () => {
    localStorage.setItem(`${ID}-apply-discount-code`, true);
    fireEvent('Click - User added product eligible for discount');
  });

}

export const generateLoader = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;
  
  let loaderContainer = `<div class="${ID}-loader__wrapper">
    <div class="${ID}-loader__overlay"></div>
    <div class="${ID}-loader__container">
      <div class="${ID}-loader">Applying Discount Code</div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('afterbegin', loaderContainer);
  document.querySelector('html').classList.add(`${ID}-noScroll`);
}

export const checkApplyCodeCtaExists = () => {
  return new Promise((resolve, reject) => {
    // whatever you want to happen first
    // alert('inside promise');
    pollerLite(['#discount-coupon-form .actions-toolbar .primary button.action.apply.primary'], () => {
      resolve(); 
    });
  });
}

export const simulateMouseClick = (targetNode) => {
  function triggerMouseEvent(targetNode, eventType) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(eventType, true, true);
    targetNode.dispatchEvent(clickEvent);
  };
  ["mouseover", "mousedown", "mouseup", "click"].forEach(function(eventType) { 
      triggerMouseEvent(targetNode, eventType);
  });
}



export const applyDiscountCode = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;
  
  let discountInputContainer = document.querySelector('#block-discount div');
  let discountCodeInput = document.querySelector('#discount-coupon-form input#coupon_code');
  let isOpen = discountInputContainer.getAttribute('aria-expanded');

  if (isOpen == "false") {
    document.querySelector('#block-discount div').click();
    discountCodeInput.value = localStorage.getItem(`${ID}-discount-code`);

    // checkApplyCodeCtaExists().then(function() {
      let applyDiscountCodeCTA = document.querySelector('#discount-coupon-form .actions-toolbar .primary button.action.apply.primary');
      applyDiscountCodeCTA.click();
      localStorage.setItem(`${ID}-apply-discount-code`, false);
      // localStorage.removeItem(`${ID}-discount-code`);
      if (VARIATION == '3') {
        localStorage.removeItem(`${ID}-countdown-timer`);
      }
      fireEvent('Conditions Met - Discount Code Applied');
    // });
    
    
  } else {
    discountCodeInput.value = localStorage.getItem(`${ID}-discount-code`);

    let applyDiscountCodeCTA = document.querySelector('#discount-coupon-form .actions-toolbar .primary button.action.apply.primary');
    applyDiscountCodeCTA.click();
    localStorage.setItem(`${ID}-apply-discount-code`, false);
    // localStorage.removeItem(`${ID}-discount-code`);
    if (VARIATION == '3') {
      localStorage.removeItem(`${ID}-countdown-timer`);
    }
    fireEvent('Conditions Met - Discount Code Applied');
  }
}

export const isUserOnPdpAndEligibleForDiscount = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;
  
  if (localStorage.getItem(`${ID}-subscribed-user-v${VARIATION}`) !== null
  && localStorage.getItem(`${ID}-discount-code`) !== null) {
    let price = getProductPrice();
    /**
     * @desc If user is on a PDP and adds product over £20, then Discount Code can be added
     */
    if (price !== null && price > 20) {
      // run add to bag event listener
      // alert('product over £20');
      pollerLite(['.box-tocart .actions'], () => {
        // add to bag event
        addToBagClickEvent();
        // basket page - check if voucher has been applied
      });
    }
  }

  
}

