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

const { ID, VARIATION } = shared;

const init = (mutation) => {
  const componentAlreadyExists = false;

  if (componentAlreadyExists) {
    return;
  }

  // Experiment Code...
  setup();

  //fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  mutation.addedNodes.forEach((node) => {
    if (node.nodeType === 1 && node.matches('[class^="Search__SearchOverlay-"]')) {
      document.querySelector('[data-test-id="header-search-button"]').addEventListener('input', (e) => {
        //  fireEvent('User types in search bar', true);
      });
    }
    if (
      node.nodeType === 1 &&
      node.matches('[class^="Search__SearchPopup-"]') &&
      !document.querySelector('[class^="Search__RecentTitleWr-"]')
    ) {
      if (VARIATION == 'control') {
        fireEvent('Test Code Fired');
        return;
      }
      const searchContainer = node.closest('[data-test-id="header-search-button"]');

      searchContainer.querySelector('[class^="Search__SearchForm-"]').classList.add(`${ID}__searchform`);
      searchContainer.querySelector('[class^="Search__SearchPopup-"]').classList.add(`${ID}__searchpopup`);
      searchContainer.querySelector('[class^="Search__ProductsWr-"]')?.classList.add(`${ID}__searchproduct`);
      searchContainer.querySelector('[class^="Search__GreenLine-"]').classList.add(`${ID}__searchgreenline`);
      searchContainer.querySelector('[class^="Search__ShowAllResultsBtn"]')?.classList.add(`${ID}__searchshowall`);

      node.children[0].classList.add(`${ID}__Search__SuggestWrap`);
      const searchSuggestList = document.querySelectorAll(`.${ID}__Search__SuggestWrap>div`);

      const createWrapper = (position, anchorElem, placement) => {
        const suggestWrapper = document.createElement('div');
        suggestWrapper?.classList.add(`${ID}__${position}-suggest-wrap`);
        anchorElem?.insertAdjacentElement(placement, suggestWrapper);
      };
      const leftAnchorElem = document.querySelector(`.${ID}__Search__SuggestWrap`);
      const rightAnchorElem = document.querySelectorAll(`.${ID}__Search__SuggestWrap>div`)[4];
      if (!document.querySelector(`.${ID}__left-suggest-wrap`)) {
        createWrapper('left', leftAnchorElem, 'afterbegin');
      }
      if (!document.querySelector(`.${ID}__right-suggest-wrap`)) {
        createWrapper('right', rightAnchorElem, 'afterend');
      }

      searchSuggestList.forEach((item, index) => {
        if (index <= 4) {
          document.querySelector(`.${ID}__left-suggest-wrap`)?.append(item);
        } else {
          document.querySelector(`.${ID}__right-suggest-wrap`)?.append(item);
        }
      });

      const showAll = document.querySelector('button[data-test-id="show-all-results-btn"]');
      showAll.innerText = 'Show All Search Results';

      fireEvent('Test Code Fired');
    }
  });

  mutation.removedNodes.forEach((node) => {
    if (
      node.nodeType === 1 &&
      (node.matches('[class^="Search__SearchPopup-"]') || node.matches('[class^="Search__CloseWr-sc-"]'))
    ) {
      const searchForm = document.querySelector('[class^="Search__SearchForm-"]');
      searchForm.classList.remove(`${ID}__searchform`);
      document.querySelector('[class^="Search__GreenLine-"]')?.classList.remove(`${ID}__searchgreenline`);
    }
  });

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
};

export default () => {
  // Poll and re-run init
  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');
    setup();
    //fireEvent('Test Code Fired', true);
    console.log('Testing');
    document.body.addEventListener('click', (e) => {
      const target = e.target;
      const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
      if (targetMatched('[class^="Search__ProductWr-"]')) {
        //fireEvent('User clicks search item: Recommended product', true);
      } else if (targetMatched('[data-test-id="suggested-item"]') && !targetMatched('[data-test-id="suggested-category"]')) {
        //fireEvent('User clicks search item: Search suggestion', true);
      } else if (targetMatched('[data-test-id="suggested-category"]')) {
        //fireEvent('User clicks search item: Recommended category', true);
      } else if (targetMatched('[class^="Search__ShowAllResultsBtn-"]')) {
        //fireEvent("User clicks 'See all results'", true);
      } else if (targetMatched('[class^="Search__CloseWr-"]')) {
        fireEvent('User closes search preview window', true);
      } else if (targetMatched('[class^="Search__SearchOverlay-"]')) {
        fireEvent('User clicks outside of the search preview window to close', true);
      }
    });

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    //let oldHref = document.location.href;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        init(mutation);
        // if (oldHref != document.location.href) {
        //   oldHref = document.location.href;

        //   document.body.classList.remove(`${shared.ID}`);

        //   setTimeout(() => {
        //     // -----------------------------------
        //     init(mutation);
        //     // Timeout ensures router has started to rebuild DOM container
        //     // and we don't fire init() too early
        //     // -----------------------------------
        //   }, 2000);
        // }
      });
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(appContainer, config);
  });
};
