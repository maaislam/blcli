/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events } from '../../../../../lib/utils';
import { filterIcon } from './assets';
import preSelectSortItem from './helpers/preSelectSort';
import sortList from './components/sortlist';
import clickHandler from './helpers/clickHandler';
import { targetMatched } from './helpers/targetMatcher';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
  const isPLP = !!document.querySelector('[li-productid]');
  const isPDP = !!document.querySelector('.addToBasketContainer');
  if (!isPDP && !isPLP) return;
  setup();

  isPLP && fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...
  document.body.addEventListener('pointerdown', ({ target }) => {
    if (targetMatched(target, '[li-productid]') && window.location.hash) {
      fireEvent('User visits PDP after using filter/sort');
      sessionStorage.setItem(`${ID}__usedfilter`, 'true');
    } else if (targetMatched(target, '.addToBasketContainer') && sessionStorage.getItem(`${ID}__usedfilter`)) {
      fireEvent('User clicked "ATB" after using filter/sort');
      sessionStorage.removeItem(`${ID}__usedfilter`);
    } else if (
      targetMatched(target, '.FilterAnchor') &&
      target.closest('.FilterAnchor').querySelector('[id^="MobSortOptions"]') &&
      VARIATION !== '2'
    ) {
      fireEvent('User applies sort');
    }
  });

  document.querySelector('#filterlist')?.addEventListener('click', ({ target }) => {
    if (targetMatched(target, '.FilterAnchor')) {
      //const filterName = target.closest('.productFilter').querySelector('h3').innerText;
      fireEvent(`user applies filter`);
    } else if (targetMatched(target, `.${ID}__sortlist--item`)) {
      fireEvent('User applies sort');
    }
  });

  //update filter btn style and copy
  const filterBtn = document.getElementById('mobSortFilter');
  const sortBtn = document.querySelectorAll('.MobSortSelector')[1];

  sortBtn &&
    sortBtn.addEventListener('click', ({ target }) => {
      if (target.closest('#CollapseDiv')) {
        fireEvent('User interacts with sortby CTA');
      }
    });
  filterBtn &&
    filterBtn.addEventListener('click', () => {
      fireEvent(`User interacts with ${VARIATION === '1' || VARIATION === 'control' ? 'filter' : 'filter / sort'} CTA`);
    });
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control' || isPDP) {
    return;
  }

  filterBtn.classList.add(`${ID}__mobSortFilter`);
  sortBtn.classList.add(`${ID}__MobSortSelector`);
  const refinedText = VARIATION === '2' ? 'FILTER & SORT' : 'FILTER';

  filterBtn.querySelector(
    '.MobFiltersText'
  ).innerHTML = `<span class="${ID}__refine-block"><span>${refinedText}</span> ${filterIcon}</span>`;
  document.querySelectorAll('.MobFiltersText')[0].innerHTML = `<span class="${ID}__refine-block">${refinedText}</span>`;

  //handle sticky filter
  const headerTopFlan = document.querySelector('.HeaderTopFlan');
  const headerGroup = document.getElementById('HeaderGroup');
  const paginationWrapper = document.querySelector('.paginationWrapper');

  [headerGroup, headerTopFlan, paginationWrapper].forEach((elm, i) => {
    if (i < 2) {
      elm.classList.add(`${ID}__persist`);
    } else {
      elm.classList.add(`${ID}__persist--transform`);
    }
  });

  if (VARIATION !== '2') return;

  document.querySelector('.mobSortSelectorWrap').classList.add(`${ID}__hide`);

  //render new list item in filter
  const anchorElem = document.getElementById('filterlist');
  anchorElem.insertAdjacentHTML('afterbegin', sortList(ID));

  //check if sort order already present from url
  preSelectSortItem();

  // add event listener
  clickHandler(ID, anchorElem);
};
