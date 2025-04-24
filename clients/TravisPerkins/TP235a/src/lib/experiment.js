/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import obsIntersection from './helpers/observeIntersection';
import secondaryNav from './secondatNav';

const { ID, VARIATION } = shared;

const init = () => {
  document.querySelectorAll(`.${ID}__secondaynav`).forEach((item) => {
    item.remove();
  });

  // Experiment Code...
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const anchorElem = document.querySelectorAll('[class^="PDPStyles__Section-sc-"]')[0];

  anchorElem.insertAdjacentHTML('afterend', secondaryNav(ID));
  const secondaryNav = document.querySelector(`${ID}__secondaynav`);

  const intersectionCallback = (entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add(`${ID}__seen`);
      console.log('Conditions Met');
    }
  };

  obsIntersection(anchorElem, 0.1, intersectionCallback);
};

export default () => {
  init();

  // Poll and re-run init
  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
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
      subtree: true,
    };

    observer.observe(appContainer, config);
  });
};
