/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';

/**
 * Helper - entry point for experiment
 */
export default () => {

  clearTimeout(window.tpxlinktimeout);

  const init = () => {
    window.tpxlinktimeout = setTimeout(() => {
      if(document.querySelector('[class^=MobileLayout__PageWrapper-]')) {
        const elm = document.querySelector('[data-test-id="menu-offers-section"]');
        if(elm) {
          const txt = elm.querySelector('[data-test-id="menu-item-text"]');
          if(txt && txt.innerText == 'Trade Offers') {
            txt.innerHTML = 'TP Direct';
          }
        }

        const sub = document.querySelector('[data-test-id="categories-header-title"] a');
        if(sub && sub.innerText == 'Trade Offers') {
          sub.innerText = 'TP Direct';
        }
      } else {
        const elms = document.querySelectorAll('[class^=CategoryItem__CategoryName-]');
        if(elms.length) {
          [].forEach.call(elms, (elm) => {
            if(elm.innerText.trim() == 'Trade Offers') {
              elm.innerHTML = 'TP Direct';
              elm.classList.add('tpxlink-link');
              elm.parentNode.classList.add('tpxlink-link');

              const icon = elm.parentNode.querySelector('[class^=CategoryItem__Icon]');
              if(icon) {
                icon.innerHTML = '<svg style="width: 20px; height: 20px;" viewBox="0 0 30 30" id="logo" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M.185 14.908C.185 6.72 6.813.084 14.989.084S29.793 6.72 29.793 14.908c0 8.188-6.628 14.824-14.804 14.824S.185 23.096.185 14.908" fill="#FFFFFE"></path><path d="M1.209 14.908c0 7.621 6.169 13.799 13.78 13.799s13.78-6.178 13.78-13.799C28.77 7.287 22.6 1.11 14.99 1.11S1.21 7.287 1.21 14.91" fill="#005A39"></path><path d="M18.249 12.675v-3.81h2.434c2.646 0 4.791 2.155 4.791 4.813 0 2.66-2.145 4.815-4.791 4.815h-2.639v3.913h-3.381v-7.543h6.21c.602 0 1.13-.486 1.13-1.09a1.09 1.09 0 0 0-1.087-1.093l-2.667-.005zM5.952 8.858h11.22v3.808h-3.894v9.74H9.692v-9.688h-3.74v-3.86z" fill="#EFA731"></path></g></svg>';
              }
            }
          });
        }
      }

      init();
    }, 100);
  }

  init(); // On first page load

  // -----------------------------
  // Now also re-run when observers fire
  // Because site is an SPA
  // -----------------------------
  pollerLite([
    '#app-container',
  ], () => {
    const appContainer = document.querySelector('#app-container');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;

          document.body.classList.remove(`${shared.ID}`);

          setTimeout(() => {
            // -----------------------------------
            // Timeout ensures router has started to rebuild DOM container
            // and we don't fire init() too early
            // -----------------------------------
            clearTimeout(window.tpxlinktimeout);
            init();
          }, 1000);
        }
      });
    });

    const config = {
        childList: true,
        subtree: true
    };

    observer.observe(appContainer, config);
  });

};
