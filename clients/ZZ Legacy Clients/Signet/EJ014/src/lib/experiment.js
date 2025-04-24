/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import ReturnsBox from './components/returnsBox';
import { events } from '../../../../../lib/utils';
import settings from './settings';

const activate = () => {
  setup();

  const returnsBox = new ReturnsBox();

  const addToBagButton = document.querySelector('.buying-buttons .buying-buttons__buy.js-buyingButton');
  addToBagButton.addEventListener('click', () => {
    events.send(`${settings.ID} v${settings.VARIATION}`, 'click', 'user added to cart');
  });
};

export default activate;
