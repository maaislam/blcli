import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

/**
 * Standard experiment setup
 */
let siteCurrency = '';
let voucher = '';

// take value off current price
let discount;
let jumperTxt = 'sweater';
let originalPrice;



if (window.location.href.indexOf('/uk/') > -1) {
  siteCurrency = '£';
  jumperTxt = 'jumper';
  originalPrice = '£38.99';
  

  if(VARIATION === '1') {
    voucher = 'UCJLOWUK2';
    discount = 1;
    
  } else if(VARIATION === '2') {
    voucher = 'UCJMIDUK';
    discount = 2;
  }

} else if (window.location.href.indexOf('/eu/') > -1) {
  siteCurrency = '€';
  originalPrice = '€59.99';

  if(VARIATION === '1') {
    voucher = 'UCJLOWEU';
    discount = 5;
  } else if(VARIATION === '2') {
    voucher = 'UCJMIDEU';
    discount = 2;
  }

} else if (window.location.href.indexOf('/world/') > -1){
  siteCurrency = '$';
  originalPrice = '$61.99';

  if(VARIATION === '1') {
    voucher = 'UCJLOWRO';
    discount = 8;
  } else if(VARIATION === '2') {
    voucher = 'UCJMIDRO';
    discount = 5;
  }
} else if (window.location.href.indexOf('/') > -1){
  siteCurrency = '$';
  originalPrice = '$56.99';
  if(VARIATION === '1') {
    voucher = 'UCJLOWUS2';
    discount = 2;
  } else if(VARIATION === '2') {
    voucher = 'UCJMIDUS';
    discount = 5;
  }
} 


// change plp prices
export const discountPLP = () => {
  const products = document.querySelectorAll('.product-item');

  for (let index = 0; index < products.length; index++) {
    const element = products[index];
    const prodName = element.querySelector('.product.name.product-item-name');
    if(prodName.textContent.trim().toLowerCase().indexOf('christmas jumper') > -1|| prodName.textContent.trim().toLowerCase().indexOf('christmas sweater') > -1) {
      const prodPrice = element.querySelector('.normal-price .price-wrapper .price');
      if(prodPrice && prodPrice.textContent.trim() === originalPrice) {
       const parsedPrice = parseFloat(prodPrice.textContent.trim().replace(`${siteCurrency}`, ''));
       const newProdPrice = parsedPrice - discount;

       prodPrice.textContent = `${siteCurrency + newProdPrice.toFixed(2)}`;

      }
    }
  }
}

export const discountCheckoutPrice = () => {
  const products = document.querySelectorAll('#checkout .minicart-items .product-item');

  for (let index = 0; index < products.length; index++) {
    const element = products[index];
    const prodName = element.querySelector('.product-item-name');
    if(prodName.textContent.trim().toLowerCase().indexOf('christmas jumper') > -1 || prodName.textContent.trim().toLowerCase().indexOf('christmas sweater') > -1) {
      const prodPrice = element.querySelector('.price');
      const qty = element.querySelector('.details-qty .value').textContent.trim();

      if(qty === '1') {
        if(prodPrice && prodPrice.textContent.trim() === originalPrice) {
          const parsedPrice = parseFloat(prodPrice.textContent.trim().replace(`${siteCurrency}`, ''));
          const newProdPrice = parsedPrice - discount;
   
          prodPrice.textContent = `${siteCurrency + newProdPrice.toFixed(2)}`;
         }
      } else {
          const parsedPrice = parseFloat(prodPrice.textContent.trim().replace(`${siteCurrency}`, ''));
          const newProdPrice = parsedPrice - (discount * parseFloat(qty));
   
          prodPrice.textContent = `${siteCurrency + newProdPrice.toFixed(2)}`;
      }

     
    }
  }
}

export const discountMiniCart = () => {
  const products = document.querySelectorAll('#mini-cart .product-item');

  const miniCartTotal = document.querySelector('#minicart-content-wrapper .subtotal .price-wrapper .price');
  const miniCartHeaderTotal = document.querySelector('.minicart-wrapper__summary-subtotal .price'); 

  for (let index = 0; index < products.length; index++) {
    const element = products[index];
    const prodName = element.querySelector('.product-item-name');
    if(prodName.textContent.trim().toLowerCase().indexOf('christmas jumper') > -1 || prodName.textContent.trim().toLowerCase().indexOf('christmas sweater') > -1) {
      const prodPrice = element.querySelector('.price-wrapper .minicart-price .price');
      if(prodPrice && prodPrice.textContent.trim() === originalPrice) {
      
        // product discount
        const parsedPrice = parseFloat(prodPrice.textContent.trim().replace(`${siteCurrency}`, ''));
        const newProdPrice = parsedPrice - discount;
      
        prodPrice.textContent = `${siteCurrency + newProdPrice.toFixed(2)}`;

        // total discount
        const totalPrice = parseFloat(miniCartTotal.textContent.trim().replace(`${siteCurrency}`, ''));
        const newTotal = totalPrice - discount;
        miniCartTotal.textContent = `${siteCurrency + newTotal.toFixed(2)}`;

        // header total discount
        const headerTotalPrice = parseFloat(miniCartHeaderTotal.textContent.trim().replace(`${siteCurrency}`, ''));
        const newHeaderTotal = headerTotalPrice - discount;
        miniCartHeaderTotal.textContent = `${siteCurrency + newHeaderTotal.toFixed(2)}`;
      }
    }
  }
}


export const isChristmas = () => {
  const allProducts = document.querySelectorAll(`.cart.item`);
    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];
      const elName = element.querySelector('.product-item-name').textContent.trim();
      const regex = new RegExp('.*(Christmas).*(Sweater|Jumper).*');
      if(regex.test(elName)) {
        return true;
      }
    }
}

export const newProductPrice = () => {
  const oldPrice = document.querySelector('.product-info-price-inner .normal-price');
  const newPrice = calculateNewPrice(oldPrice);

  if (!document.querySelector(`.${ID}-new-price`)) {
    oldPrice.insertAdjacentHTML('beforebegin', `<div class="${ID}-new-price"><span>${siteCurrency}${newPrice}</span></div>`);
  }
}

export const calculateNewPrice = (el) => {
  let priceAmount = el.querySelector('.price-wrapper').getAttribute('data-price-amount');
  priceAmount = parseFloat(priceAmount) - discount;
  return priceAmount.toFixed(2);
}

// subtotal - (qty x discount)
const calSubTotal = (product) => {
  const qty = product.querySelector('.input-text.qty').value;
  const subTotal = product.querySelector('.col.subtotal .price').textContent.trim().match(/[\$\£\€](\d+(?:\.\d{1,2})?)/);

  const subTotalPrice = parseFloat(subTotal[1]);
  const totalToRemove = (discount * qty);

  const newSubTotalPrice = `${siteCurrency}${(subTotalPrice - totalToRemove).toFixed(2)}`;
  return product.querySelector('.col.subtotal .price').textContent = newSubTotalPrice;
  
}


export const applyDiscountCode = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;


  const discountInputContainer = document.querySelector('#block-discount div');
  const discountCodeInput = document.querySelector('#discount-coupon-form input#coupon_code');
  const isOpen = discountInputContainer.getAttribute('aria-expanded');
  const applyDiscountCodeCTA = document.querySelector('#discount-coupon-form .actions-toolbar .primary button.action.apply.primary');

  if (isOpen == "false") {
    document.querySelector('#block-discount div').click();
  }

  if(discountCodeInput) {
    discountCodeInput.value = voucher;
  }

  if(applyDiscountCodeCTA) {
    applyDiscountCodeCTA.click();
  }

  if(document.querySelector('#discount-coupon-form .action.cancel.primary')) {
    document.querySelector('#discount-coupon-form .action.cancel.primary').addEventListener('click', () => {
      sessionStorage.setItem(`${ID}-voucherRemoved`, 1);
    });
  }
    
  let jumperPrice = [];
  // update basket prices
  if(document.querySelector('#coupon_code').value === voucher) {
    const allProducts = document.querySelectorAll(`.cart.item`);
    for (let index = 0; index < allProducts.length; index++) {
      const element = allProducts[index];
      const elName = element.querySelector('.product-item-name').textContent.trim();
      const regex = new RegExp('.*(Christmas).*(Sweater|Jumper).*');
      if(regex.test(elName)) {
        // update subtotal
        calSubTotal(element);
        
        // update product price
        const price = element.querySelector('.cart-price .price');
        const parsePrice = parseFloat(price.textContent.trim().match(/[\$\£\€](\d+(?:\.\d{1,2})?)/)[1]);
        const newPrice = parsePrice - discount;
        price.textContent = `${siteCurrency + newPrice.toFixed(2)}`;

        jumperPrice.push(newPrice);
      }
    }

    // add voucher message
    const discountMsg = `<div class="${ID}-msg"><b>Discount applied</b> - Christmas ${jumperTxt}s ${siteCurrency + jumperPrice[0]} each</div>`;
    if(document.querySelector('.fieldset.coupon.applied') && !document.querySelector(`.${ID}-msg`)) {
      document.querySelector('#discount-coupon-form').insertAdjacentHTML('afterbegin', discountMsg);
    }

  }
}


