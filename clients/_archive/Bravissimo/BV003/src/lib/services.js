import { fullStory, events } from '../../../../../lib/utils';
import settings from './settings';

/**
 * setup
 * @desc Performs standard experiment setup (FullStory tagging, GA event and body class)
 */
function setup() {
  fullStory(settings.ID, `Variation ${settings.VARIATION}`);
  events.send(settings.ID, 'Activated', `Variation ${settings.VARIATION}`);
  document.body.classList.add(settings.ID);
  document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
}

export { setup }; // eslint-disable-line

/**
 * Helper is logged in?
 */
export const isLoggedIn = () => {
  const isLoggedIn = window.tco && (typeof window.tco.get == 'function') && window.tco.get('customer') && window.tco.get('customer').isLoggedIn;

  return !!isLoggedIn;
};

/**
 * Is VIB customer?
 */
export const isVibCustomer = () => {
  const isVib = tco && (typeof tco.get == 'function') && tco.get('customer') && 
    tco.get('customer').data && tco.get('customer').data.vib && tco.get('customer').data.vib.is_vib;

  return !!isVib;
}

/**
 * Get user data
 */
export const getUserData = () => {
  const isVib = tco && (typeof tco.get == 'function') && tco.get('customer') && 
    tco.get('customer').data && tco.get('customer').data;

  return tco.get('customer').data;
}

export const basketSkus = (basket) => {
  if (basket && basket.querySelector('.c-sku__code')) {
    const productsSku = basket.querySelectorAll('.c-sku__code');

    let skus = [];
    for (let i = 0; productsSku.length > i; i += 1) {
      const prodSku = productsSku[i].innerText;
      if (prodSku) {
        skus.push(prodSku);
      }
    }
    return skus;
  }
}

export const hasDuplicates = (array) => {
  if (array) {
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < array.length; ++i) {
      var value = array[i];
        if (value in valuesSoFar) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
  }
}

export const showMessage = (basketEl) => {
  const skus = basketSkus(basketEl);
  const uniqueArr = hasDuplicates(skus);
  return uniqueArr;
}

export const addMessage = (variation, phoneNumber) => {
  let title = null;
  let message = null;
  if (variation === '1') {
    title = 'Need help choosing a size?';
    message = `Our <a class="BV003-sizeguide" href="https://www.bravissimo.com/fitting-guides-and-advice/">size guides</a> are here to help, or we can give you size advice via <span id="BV003-liveChat">Live Chat</span> or over the phone on <a class="BV003-phone" href="tel:${phoneNumber}">${phoneNumber}</a>.`;
  }
  if (variation === '2') {
    title = 'Not sure of your size?';
    message = `<a href="https://www.bravissimo.com/returns-and-exchanges/">Returns are always free</a>, either using the freepost label included with your order, or in one of our shops.`;
  }
  if (title && message) {
    const basketRef = document.querySelector('tfoot.c-bag__footer');
    if (!document.querySelector('.BV003-message')) {
      basketRef.insertAdjacentHTML('afterbegin', `
        <tr class="BV003-message BV003-toRemove">
          <td colspan="4">
            <h3 class="l">${title}</h3>
          
            <p class="l">${message}</p>
          </td>
        </tr>
      `);
    }
    // if (!ref.querySelector('.BV003-message')) {
    // }
  }
}

export const removeMessage = () => {
  const els = document.querySelectorAll('.BV003-toRemove');
  if (els) {
    for (let i = 0; els.length > i; i += 1) {
      els[i].remove();
    }
  }
}
