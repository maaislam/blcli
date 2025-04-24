/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, events } from '../../../../../lib/utils';
import settings from './shared';

export default () => {
  setup();

  if (settings.VARIATION == 2) {
    events.send('HSS020', 'HSS020 Control', 'Control is active');
    return false;
  }

  events.send('HSS020', 'HSS020 Variation', 'HSS020 V1 is active');

  const STORAGEVAR = 'HS-prevViewed';

  const getPageName = () => document.querySelector('.item_content .group_title').textContent.replace(/\s\s/, ' ');

  const stringy = arr => JSON.stringify(arr);

  const storage = {
    get() {
      return JSON.parse(window.localStorage.getItem(STORAGEVAR));
    },
    add(pageName) {
      let stor = this.get();
      
      // If length === 4 pop first.
      if (!stor) { // Create
        window.localStorage.setItem(STORAGEVAR, stringy([pageName]));
      } else if (stor.length === 4 && !stor.includes(pageName)) { // Pop and add
        // Check if it exists
        if (stor.includes(pageName)) {
          // Remove from array and add at beginning
          const index = stor.indexOf(pageName);
          if (index > -1) {
            stor.splice(index, 1);
          }
        };
        let tempArr = stor;
        tempArr.pop();
        tempArr.unshift(pageName);

        window.localStorage.setItem(STORAGEVAR, stringy(tempArr));
      } else { // Just add
        if (stor.includes(pageName)) {
          
          // Remove from array and add at beginning
          const index = stor.indexOf(pageName);
          if (index > -1) {
            stor.splice(index, 1);
          }
        };
        let tempArr = stor;
        tempArr.unshift(pageName);

        window.localStorage.setItem(STORAGEVAR, stringy(tempArr));
      }
    },
  }

  // Two pollers, one for PDP, one for PLP

  // PDP
  pollerLite(['.item_content .group_title', () => !!window.localStorage], () => {
    const pageName = getPageName();
    storage.add(pageName);
  });

  // PLP
  pollerLite(['.product_list_section', () => !!window.localStorage], () => {
    // Get storage
    const stor = storage.get();
    if (!stor) return;
    // Loop over stor and query DOM.
    const titles = document.querySelectorAll(`span.productMainLink h2`);
    let len = titles.length;
    for (let i = 0; len > i; i += 1) {
      const title = titles[i];
      const ref = title.closest('.prod_inner');

      stor.forEach(element => {
        
        if (!title || title.textContent.replace(/\s\s/, ' ') !== element) return;

        if (title.parentElement.querySelector('.HSS020-tag')) {
          const el = title.parentElement.querySelector('.HSS020-tag');
          el.parentNode ? el.parentNode.removeChild(el) : null
        };
        
        if (element === stor[0]) { // First
          ref.insertAdjacentHTML('afterbegin', `
            <div class="HSS020-tag">
              <p>Last Viewed</p>
            </div>
          `);
        } else {
          ref.insertAdjacentHTML('afterbegin', `
            <div class="HSS020-tag">
              <p>Recently Viewed</p>
            </div>
          `);
        }
      });
      
    }
  })

};
