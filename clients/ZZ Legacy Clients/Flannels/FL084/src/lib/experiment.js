/**
 * FL084 - Personalised Search Test
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './shared';
import { fetchBrands, fetchRecentlyViewedBrands } from './fetchBrands';
import { events } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';

export default () => {

  // Variation Events
  const { ID, VARIATION } = settings;
  if (VARIATION == 2) {
    events.send(ID, 'FL084 Control', 'FL084 Control is active');
    return false;
  } else {
    events.send(ID, 'FL084 Variation 1', 'FL084 Variation 1 is active');
  }

  setup();

  let search = document.querySelector('#dvSearch');
  let searchInput = search.querySelector('input#txtSearch');
  if (window.innerWidth < 1022) {
    search = document.querySelector('#divMobSearch');
    searchInput = document.querySelector('input#MobtxtSearch');
  };
  const siteForm = document.querySelector('form#Form');

  const addToSearch = (term) => {
    if (!term) return;

    searchInput.focus();
    searchInput.value = term;
    const urlTerm = encodeURI(term);
    // /SearchResults?DescriptionFilter=Canada%20Goose
    siteForm.setAttribute('action', `/SearchResults?DescriptionFilter=${urlTerm}`);
    siteForm.submit();
  };

  // const addList = (listEl, ref) => {
  //   if (!ref || !listEl) return;
  //   let pos = 'afterbegin';
  //   if (window.innerWidth < 1022) {
  //     pos = 'beforeend';
  //   }
  //   ref.insertAdjacentHTML(pos, listEl);
  // };

  const removeList = () => {
    const addedList = document.querySelector('.FL082-addedList');
    if (addedList) {
      addedList.parentNode.removeChild(addedList);
    }

    
  };

  const triggerAction = () => {
    // Focus input
    searchInput.focus();

    let fetchedBrands = fetchBrands();
    
    // We need at least 1 term
    if (!fetchedBrands) {
      fetchedBrands = fetchRecentlyViewedBrands();
    }
    
    // Add element to search
    if (fetchedBrands) {
      let pos = 'afterend';
      if (window.innerWidth < 1022) {
        pos = 'beforeend';
        search.classList.add('FL084-show');
      }
      search.insertAdjacentHTML(pos, `
        <div class="FL084-search">
          <p class="FL084-title">Suggested for you</p>
          <p class="FL084-sub">These are terms suggested for you based on what you have previously viewed</p>

          <div class="FL084-search--terms">
            ${fetchedBrands.map((brand) => brand && `<button>${brand}</button>`).join(' ')}
          </div>
        </div>
      `);
      
      // Outside click event
      const element = document.querySelector('.FL084-search');
      const wrap = document.querySelector('.BodyWrap');
      if (wrap && element) {
        setTimeout(() => {
          wrap.addEventListener('click', (e) => {
            var isClickInside = element.contains(e.target);
      
            if (!isClickInside && element.parentNode) {
              // Check for active status on Component
              element.parentNode.removeChild(element);

              if (window.innerWidth < 1022) {
                search.classList.remove('FL084-show');
              }
            }
            
          });
        }, 1000);
      }

      // Button clicks
      const addedButtons = document.querySelectorAll('.FL084-search button');
      if (addedButtons) {
        for (let i = 0; addedButtons.length > i; i += 1) {
          addedButtons[i].addEventListener('click', (e) => {
            const { target } = e; 
            e.preventDefault();
            addToSearch(target.textContent);
          });
        }
      }
    }

  };

  const removeComponent = () => {
    const el = document.querySelector('.FL084-search');
    if (el) {
      el.parentNode.removeChild(el);

      if (window.innerWidth < 1022) {
        search.classList.remove('FL084-show');
      }
    }
  };

  search.addEventListener('click', triggerAction);

  searchInput.addEventListener('keypress', removeComponent);
};
