import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.top-bar__list-item--basket .basket-icon__counter',
  () => {
    const basketItems = document.querySelector('.top-bar__list-item--basket .basket-icon__counter');
    if (basketItems) {
      const basketItemAmount = parseFloat(document.querySelector('.top-bar__list-item--basket .basket-icon__counter').textContent);
      if (basketItemAmount > 0) {
        return true;
      }
    }
  },
], activate);
