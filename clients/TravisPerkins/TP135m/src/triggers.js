import { RunPLP, RunPDP } from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

// Checked logged in state in local storage
if (window.localStorage.getItem('LoggedInState') === 'no' && !window.sessionStorage.getItem('TP135_Viewed') && !document.body.classList.contains('TP135m')) {
  // Product page
  if (/^(\/)[\w\d\-_+%]+(\/)(p)(\/).*/g.test(window.location.pathname)) {
    pollerLite([
      'body',
      '.price_value', // Exvat price
      '.includedVAT', // Inc Vat price
      '.tp_prodName > h3', // Product Title
      () => !!window.jQuery,
      // product image test from product data
      () => {
        const imageData = document.getElementById('productMarkUp');
        // next line exceeds length
        // eslint-disable-next-line
        return imageData && JSON.parse(imageData.innerHTML) && JSON.parse(imageData.innerHTML).image;
      },
    ], RunPDP);
    // On category page
  } else {
    pollerLite([
      'body',
      () => !!window.jQuery,
    ], RunPLP);
  }
}
