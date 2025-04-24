/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';
import settings from './settings';

const activate = () => {
  setup();

  const addToBagButton = document.querySelector('.buying-buttons .buying-buttons__buy.js-buyingButton');
  addToBagButton.addEventListener('click', () => {
    events.send(`${settings.ID} control`, 'click', 'user added to cart');
  });
  // Experiment code
};

export default activate;
