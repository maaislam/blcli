import { currentDelCost } from '../currentDelCost';

let totalBasket;

function addZeroes(num) {
  // Convert input string to a number and store as a variable.
      var value = Number(num);      
  // Split the input string into two arrays containing integers/decimals
      var res = num.split(".");     
  // If there is no decimal point or only one decimal place found.
      if(res.length == 1 || res[1].length < 3) { 
  // Set the number to two decimal places
          value = value.toFixed(2);
      }
  // Return updated or original number.
  return value;
}

let productPrice = 0;
export const fetchProductPrice = () => {

  // Fetch product price
  const { ecommerce } = window.dataLayer[0];
  const { detail } = ecommerce;
  if (detail) {
    const { products } = detail;
    // Loop over products
    products.forEach(prod => {
      const { price } = prod;
      if (price) {
        productPrice += price;
      }
    });
  }
}

const getBasketValue = new Promise((res, rej) => { 
  let basketTotal;
  console.log('called');
  if (res) {
    basketTotal += res;
  } else {
    basketTotal = 0;
  }

  const request = new XMLHttpRequest();
  request.open('GET', 'https://www.31dover.com/checkout/ajaxCart', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      const data = request.responseText;
      console.log('data ', data);
      const div = document.createElement('div');
      div.insertAdjacentHTML('beforeend', data);
      // Query the data
      const basketDataEl = div.querySelector('input#f_gpmdOmetriaAjaxBasket');
      if (basketDataEl) {
        const basketData = basketDataEl.getAttribute('value');
        console.log('basket data ', JSON.parse(basketData));
        const { total } = JSON.parse(basketData);
        const { amount } = total;
        // Resolve with the data
        if (amount == null) {
          res(0);
        } else {
          basketTotal = addZeroes(amount.toString(10));
          res(basketTotal);
          // console.log('called basket amount ', amount);
          totalBasket = amount;
        }
      }
    } else {
      // We reached our target server, but it returned an error
      rej(console.warn('no basket data fetched'));
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.warn('ajax request failed');
  };

  request.send();

});

const cost = currentDelCost() ? currentDelCost() : 79;

export const freeDeliveryCalc = (ref, pos) => {
  if (!ref) return;

  // let basketTotal;
  let html;
  console.log('called freeDelCal');
  getBasketValue.then((res) => {
    // console.log('bbasket value ', getBasketValue);  
    // basketTotal = res;
  
    if (res >= cost) {
      html = `
        <div class="DO001-priceLeft">
          <p>£${productPrice}</p>
        </div>
        <div class="DO001-priceRight">
          <p class="DO001-delTitle">+ FREE DELIVERY</p>
          <p>Your order has qualified for free delivery.</p>
        </div>
      `;
    } else {
      let priceDiff = cost - res;
      html = `
        <div class="DO001-priceLeft">
          <p>£${productPrice}</p>
        </div>
        <div class="DO001-priceRight">
          <p class="DO001-delTitle">+ FREE DELIVERY</p>
          <p>Spend ${res > 0 ? 'another ' : ''}£${addZeroes(priceDiff.toFixed(2).toString(10))} to get free delivery</p>
        </div>
      `;
    }
    console.log('html ', html);
    // Check it doesn't already exist
    if (!document.querySelector('.DO001-freeDelIn')) {
      ref.insertAdjacentHTML(pos, `
        <div class="DO001-freeDelIn">
          ${html}
        </div>
      `); 
    } else {
      // Remove and re add.
      // const el = document.querySelector('.DO001-freeDelIn');
      // if (el) {
      //   el.parentNode.removeChild(el);
      //   // Add
      //   ref.insertAdjacentHTML(pos, `
      //     <div class="DO001-freeDelIn">
      //       ${html}
      //     </div>
      //   `); 
      // }
    }

  }); // end of promise
};