/**
 * KM003 - Sticky Basket
 * @author User Conversion
 */
import { setup } from './services';
import StickyBasket from '../components/StickyBasket/StickyBasket';
import settings from '../lib/settings';

const activate = () => {
  setup();
  const stickyBasket = new StickyBasket(); // eslint-disable-line
  document.querySelector('#main').classList.add(`${settings.ID}_modified`);
};

export default activate;
