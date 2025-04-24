/**
 * MP183 - Search Bar Mobile Prominence
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import settings from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = settings;
  events.send(ID, `${ID} Variation ${VARIATION}`, 'Test is active');

  // V1
  if (VARIATION == 1) {
    
    pollerLite(['.siteSearch.noActive'], () => {
      const hiddenSearch = document.querySelector('.siteSearch.noActive');
      hiddenSearch.classList.remove('noActive');
      hiddenSearch.classList.add('active');
    });

  }

  // V2
  if (VARIATION == 2) {
    let run = false;
    let searchInput = document.querySelector('#input_SearchBox');
    const searchIcon = document.querySelector('.search-mobile');
    const searchEl = document.querySelector('#js-header > #js_siteSearch');

    
    pollerLite(['#js_siteSearch.active'], () => {
      if (window.location.href == 'https://www.mamasandpapas.com/en-gb') {
        searchEl.classList.remove('active');
        searchEl.classList.add('noActive');
      }
      
      searchInput ? searchInput.setAttribute('placeholder', 'Find pushchairs, furniture, car seats, toys') : null;
    });
   
    searchIcon.addEventListener('click', () => {
      // setTimeout(() => {
      //   console.log('search input before, ', searchInput);
      //   searchInput ? searchInput.setAttribute('placeholder', 'Find pushchairs, furniture, car seats, toys') : null;
      //   console.log('search input after, ', searchInput);
      // }, 800);
      setTimeout(() => {
        // searchInput.click();
        searchInput.focus();
      }, 300);
    });
    // if (!run) {
    // }
  }
};
