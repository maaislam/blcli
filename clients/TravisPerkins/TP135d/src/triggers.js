import { RunPLP, RunPDP } from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

// Checked logged in state in local storage
if (window.localStorage.getItem('LoggedInState') === 'no' && !window.sessionStorage.getItem('TP135_Viewed') && !document.body.classList.contains('TP135d')) {
  // Product page
  if (/^(\/)[\w\d\-_+%]+(\/)(p)(\/).*/g.test(window.location.pathname)) {
    pollerLite([
      'body',
      '.price_value', // Exvat price
      '.includedVAT', // Inc Vat price
      'h1.tpProductTitle', // Product Title
      () => !!window.jQuery,
      // product image test
      () => document.querySelector('.s7staticimage > img') && document.querySelector('.s7staticimage > img').getAttribute('src'),
    ], RunPDP);
    // On category page
  } else {
    pollerLite([
      'body',
      () => !!window.jQuery,
    ], RunPLP);
  }
}
