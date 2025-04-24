/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { observer, events } from '../../../../../lib/utils';
import settings from './shared';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  if (VARIATION == 3) {
    events.send(ID, 'SD014 Control', 'SD014 Control active');
    return false;
  } else {
    events.send(ID, 'SD014 Variation', `SD014 Variation ${VARIATION} is active`);
  }


  const filterTitle = cacheDom.get('#TopPaginationWrapper #filterByMob .MobFiltersText');
  filterTitle.textContent = 'Refine and Sort';

  const filterBannerWrap = cacheDom.get('.mobSortFilter.mobControlBarWrap');

  const sortByEl = cacheDom.get('.mobSortFilter.mobSortSelectorWrap');
  
  const newSortByRef = cacheDom.get('#filterlist');
  
  newSortByRef.insertAdjacentElement('afterend', sortByEl);

  // V2 on scroll, show.
  if (VARIATION == 2) {

    window.onscroll = function(e) {
      // print "false" if direction is down and "true" if up

      if (this.oldScroll > this.scrollY) { // true
        filterBannerWrap.classList.add('SD-show');
      } else {
        // hide
        filterBannerWrap.classList.remove('SD-show');
      }
      this.oldScroll = this.scrollY
    }

  };


  // Events
  filterBannerWrap.addEventListener('click', () => {
    events.send(ID, 'SD014 Click', 'Opening filters');
  });


  const filterListContainer = document.querySelector('#filterlist');
  filterListContainer.addEventListener('click', () => {
    events.send(ID, 'SD014 Click', 'Selecting filter');
  });

};
