/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import shared from './shared';

export default () => {
  setup();

  // Add active classes to elms
  const search = document.querySelector(".main-header-search");
  const searchTrigger = document.querySelector(".main-header-search-trigger");

  if(search && searchTrigger) {
    if(shared.VARIATION != 'control') {
      search.classList.add('active');
      searchTrigger.classList.add('active');
    }

    fireEvent('Did Meet Conditions');

    searchTrigger.addEventListener('click', e => {
      if(e.currentTarget.classList.contains('active')) {
        fireEvent('Clicked Search - Closed');
      } else {
        fireEvent('Clicked Search - Open');
      }
    });

    const searchForm = search.querySelector('form');
    const searchInput = search.querySelector('.ais-SearchBox-input');

    if(searchForm) {
      searchForm.addEventListener('submit', e => {
        fireEvent('Submit Form - Search');
      });
    } 

    if(searchInput) {
      let searchEventSent = false;

      searchInput.addEventListener('input', e => {
        if(!searchEventSent) {
          fireEvent('Input - Search');
          searchEventSent = true;
        }
      });
    }
  }
};
