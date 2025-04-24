/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite } from "../../../../../lib/utils";
import shared from './shared';
import { fireEvent } from './services';

const runChanges = () => {
  // Grab overview section and check length of text;
  const PDPDesktop = document.querySelector('[class^="PDPDesktop__Content-sc"]');
  if (PDPDesktop) {
    const overview = PDPDesktop.querySelectorAll('[class^="PDPStyles__Section"]')[1];
    if (overview.innerText.length > 400) {
      fireEvent('seen-experiment');
      overview.classList.add(`${shared.ID}__minimised`);
      const markup = `
        <div class="${shared.ID}__overlay">
          <span>
            View more
          </span>
        </div>
      `;
      const viewLess = `
        <div class="${shared.ID}__viewLess">
          <span>
            View less
          </span>
        </div>
      `;
      overview.insertAdjacentHTML('afterbegin', markup);
      overview.insertAdjacentHTML('beforeend', viewLess);

      const overlay = document.querySelector(`.${shared.ID}__overlay`);
      const viewLessBtn = document.querySelector(`.${shared.ID}__viewLess`);

      if (overlay) {
        overlay.addEventListener('click', () => {
          overview.classList.remove(`${shared.ID}__minimised`);
          overlay.classList.add(`${shared.ID}__hidden`);
          fireEvent('overview-expanded');
        })
      }

      if (viewLessBtn) {
        viewLessBtn.addEventListener('click', () => {
          overview.classList.add(`${shared.ID}__minimised`);
          overlay.classList.remove(`${shared.ID}__hidden`);
          fireEvent('overview-minimised');
        })
      }
    }
  }
}

const init = () => {
  const componentAlreadyExists = document.querySelector(`.${shared.ID}__overlay`); 
  
  if (componentAlreadyExists) {
    return;
  }

  // Experiment Code...
  setup();

  runChanges();
}

export default () => {
  init();

  // Poll and re-run init
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
            init();
          }, 2000);
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
