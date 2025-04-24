/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import HologramBadge from './components/holographic';
import settings from './settings';
import LimitedBanner from './components/banner';
import { pollerLite } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();

  // move the scarcity message
  pollerLite(['#merchoid-scarcity-message'], () => {
    const scarcity = document.querySelector('#merchoid-scarcity-message');
    const ME193Message = document.querySelector('.ME193_scarcityMessage');
    const ME159Message = document.querySelector('.ME159_stock-checker');
    const mainImage = document.querySelector('.images .product-image');
    if (scarcity) {
      mainImage.insertAdjacentElement('afterbegin', scarcity);
      if (ME193Message) {
        mainImage.insertAdjacentElement('afterbegin', ME193Message);
      }
      if (ME159Message) {
        mainImage.insertAdjacentElement('afterbegin', ME159Message);
      }
    }
  });

  if (settings.VARIATION === '1') {
    const hologramBadge = new HologramBadge();
  } else if (settings.VARIATION === '2') {
    const limitedBanner = new LimitedBanner();
  }
};

export default activate;

