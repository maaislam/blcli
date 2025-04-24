/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';

const activate = () => {
  setup();

  // Experiment code
  if (window.location.href.indexOf('/secure/authenticated/account/') > -1) {
    const wishlistText = document.querySelector('.account .content-area:nth-child(4) .content-area__title');
    wishlistText.querySelector('h2').textContent = 'Gift cards & Product Comparison';
    wishlistText.querySelector('p').innerHTML = 'View your gift card balance<br>View your latest product comparison';
  }
};

export default activate;
