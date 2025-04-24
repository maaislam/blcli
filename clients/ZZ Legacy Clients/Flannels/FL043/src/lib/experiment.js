/**
 * IDXXX - Description
 * @author User Conversion
 */
import {
  setup,
  getBrandList,
  buildSelectBox,
  buildPopup,
  addHtml,
  togglePopup,
  applyFilters,
  addBrands,
} from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { getCookie, events } from '../../../../../lib/utils';
import settings from './settings';

events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();

  // V3 control
  if (settings.VARIATION === '3') {
    events.send(settings.ID, 'Control', 'Control is active');
    return false;
  }

  // Experiment code
  const existingBrandList = document.querySelectorAll('#filterlist > .productFilter .FilterListItem.ABRA');
  const pageRef = document.querySelector('.ContentWrapper.container-fluid');
  const brandArr = getBrandList(existingBrandList);
  const selectOne = buildSelectBox(brandArr);
  const selectTwo = buildSelectBox(brandArr);
  const selectThree = buildSelectBox(brandArr);

  // If perm closed and has cookie. Don't show
  if (getCookie('FL043-no-show')) {
    events.send(settings.ID, 'No show', 'Popup not shown for this user');
    return false;
  }

  // If brands have previously been chosen then apply those.
  addBrands();

  const brandComponent = buildPopup(selectOne, selectTwo, selectThree);
  addHtml(brandComponent, pageRef);

  // Store added popup
  const popup = document.querySelectorAll('.FL043-toggle');
  togglePopup(popup);

  const applyCTA = document.getElementById('FL043-filter');
  const addedBrandSelects = document.querySelectorAll('.FL043-favourite-brands .FL043-brand-options select');
  applyFilters(applyCTA, addedBrandSelects, existingBrandList);

  // Toggle class for arrows on select change
  const selectWraps = document.querySelectorAll('.FL043-select-wrap');
  if (selectWraps) {
    for (let i = 0; selectWraps.length > i; i += 1) {
      const select = selectWraps[i].querySelector('select');
      if (select) {
        select.addEventListener('click', () => {
          selectWraps[i].classList.add('open');
          setTimeout(() => {
            selectWraps[i].classList.remove('open');
          }, 1500);
        });
      }
    }
  }
};

export default activate;
