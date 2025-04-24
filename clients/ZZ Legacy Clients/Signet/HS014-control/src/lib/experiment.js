/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import settings from '../../../HS014/src/lib/settings';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();
  const addToBagButton = document.querySelector('.buying-buttons .buying-buttons__buy.js-buyingButton');
  addToBagButton.addEventListener('click', () => {
    events.send(`${settings.ID} v${settings.VARIATION}`, 'click', 'user added to cart');
  });
  // Experiment code
};

export default activate;
