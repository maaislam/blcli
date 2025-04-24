/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body','#two-column-mode','.product-tile-list .product-tile-list__item',
  () => {
    if((window.digitalData.page.category.primaryCategory === 'Watches') || (window.digitalData.page.category.primaryCategory === 'Jewellery')) {
      return true;
    }
  },
  () => {
    const gridView = document.querySelector('#two-column-mode');
    if(window.innerWidth < 767 && gridView && gridView.className.indexOf('list-display-buttons__button--active') === -1) {
      return true;
    } else if(window.innerWidth >= 767){
      return true;
    }
  }
], activate);
