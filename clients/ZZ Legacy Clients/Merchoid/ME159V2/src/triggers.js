import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

let productArr = localStorage.getItem('ME159V2_products');
let seenMsg = false;
const pathName = window.location.pathname;

if (productArr === null) {
  productArr = [];
} else {
  productArr = JSON.parse(productArr);
  for (let i = 0; productArr.length > i; i += 1) {
    if (productArr[i].name.indexOf(pathName) > -1) {
      seenMsg = true;
    }
  }
}

if (pathName.indexOf('checkout/order-received') > -1) {
  localStorage.setItem('ME159_success', 'true');
}

if (!localStorage.getItem('ME159_success')) {
  if (seenMsg === true) {
    pollerLite([
      '#merchoid-scarcity-message',
    ], Run);
  } else if (productArr.length < 3) {
    pollerLite([
      '#merchoid-scarcity-message',
    ], Run);
  } else {
    document.body.classList.add('ME159');
  }
} else {
  document.body.classList.add('ME159');
}
