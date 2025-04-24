import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import settings from './settings';

export default () => {
  const products = document.querySelectorAll('#ctl00_ctl00_recentItems_pnlRecentItems div.binner');
  [].forEach.call(products, (product) => {
    const compareSection = product.querySelector('div.compare');
    const viewBtn = product.querySelector('div.my-3');
    if (compareSection && viewBtn) {
      viewBtn.insertAdjacentElement('beforebegin', compareSection);
      // Change Text for Compare
      compareSection.querySelector('strong.small.text-info').innerText = 'Add to compare';
    }
  });
};