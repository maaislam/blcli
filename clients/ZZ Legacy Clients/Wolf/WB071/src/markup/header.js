/* eslint-disable */
const UV = window.universal_variable.basket;
let basketTotal = UV.total;
let currency = UV.currency;

var countDecimals = function (value) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
}

function isInt(n) {
   return n % 1 === 0;
}

if (isInt(basketTotal) === true) {
  basketTotal += '.00';
}

if (countDecimals(basketTotal) === 1) {
  basketTotal += '0';
}

if (currency === 'GBP') {
  currency = '£';  
} else if (currency === 'USD') {
  currency = '$';
} else if (currency === 'AUD') {
  currency = 'A$';
} else if (currency === 'EUR') {
  currency = '€';
}

const headerMarkup = `
   <div class="WB071_header">
      <h2>Shopping Bag</h2>
      <p>Thank you for supporting independent designers</p>
      <div>
        <span class="WB071_total_wrap">Total: <span>${currency}${basketTotal}</span></span>
        <a class="WB071_checkout-btn">Checkout Securely</a>
      </div>
   </div>
`;

const sideBarMarkup = `
  <div class="WB071_sidebar-wrap">
    <div class="WB071_delivery">
      <p>
        <img src="//www.wolfandbadger.com/staticmedia/i/drawings/free_domestic_delivery.svg" alt="Free Domestiv Delivery">
        <span>Delivery</span>
      </p>
      <p>- Free delivery if you shop brands in your own country</p>
      <p>- Have your order delivered to work or home for your conveience</p>
      <p>- Tracked delivery as standard so you can follow your package on its way to you</p>
    </div>
    <div class="WB071_returns">
      <p>
        <img src="//www.wolfandbadger.com/staticmedia/i/drawings/free_returns.svg" alt="Free Domestiv Delivery">
        <span>Free Worldwide Returns</span>
      </p>
      <p>Try items on at home and decide within 14 days of receiving your order if they are right for you. Returns are hassle-free and handled by Wolf & Badger, without quibble</p>
    </div>
  </div>
`;

export { headerMarkup, sideBarMarkup };
