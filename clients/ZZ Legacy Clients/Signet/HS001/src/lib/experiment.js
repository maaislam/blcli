/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';

const activate = () => {
  setup();

  // Experiment code
  if (window.location.href.indexOf('/account') > -1) {
    const wishlistText = document.querySelector('.panelContainer .wishList p');
    wishlistText.textContent = 'View and edit your product comparison and gift card balance';
  }
};

export default activate;
