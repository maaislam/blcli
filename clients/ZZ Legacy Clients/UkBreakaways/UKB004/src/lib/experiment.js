/**
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import settings from './settings';

/**
 * Helper get previous url
 */
const getPreviousUrl = () => {
  return document.referrer;
};

/**
 * Helper get current url
 */
const getURL = () => {
  return window.location.pathname;
};

/**
 * Add visited label element to some elms
 */
const addVisitedElement = (elRef) => {
  elRef.insertAdjacentHTML('afterbegin', `
    <div class="${settings.ID}-visited-bar">
      <div>
        <p>Recently Viewed</p>
      </div>
    </div>
  `);
};

/**
 * Parse local storage store to array
 */
const parseLocalStore = () => {
  const store = localStorage.getItem(`${settings.ID}-visited`);
  let storage = [];

  if (store !== null) {
    storage = JSON.parse(store);
  }

  return storage;
};

/**
 * Update local store
 */
const updateLocalStore = (withString) => {

  const storage = parseLocalStore();

  storage.push(withString);
  localStorage.setItem(`${settings.ID}-visited`, JSON.stringify(storage));
};

/**
 * When on search results page
 */
const updateSearchResultsPage = () => {
    const elements = document.querySelectorAll('.search-content .container .right .result-item .result-content .buttons a:first-of-type');
    if (elements.length) {
      const storage = parseLocalStore();

      [].forEach.call(elements, (element) => {
        const url = element.pathname;
        const elWrapper = element.parentNode.parentNode.parentNode;

        if (storage.indexOf(url) > -1 || storage.indexOf(url + '/') > -1) {
          elWrapper.classList.add(`${settings.ID}-visited`);
          if (!elWrapper.querySelector(`.${settings.ID}-visited-bar`)) {
            addVisitedElement(elWrapper);
          }
        }
      });
    }
};

/**
 * Entry point for running experiment
 */
const activate = () => {
  const currentURL = getURL();

  if (currentURL.match(/itineraries/ig)) {
    setup();

    updateLocalStore(currentURL);
  } else if(currentURL.match(/search-results/ig)) {
    pollerLite([
      '.search-content .container .right .result-item .result-content .buttons a:first-of-type',
    ], () => {
      setup();

      updateSearchResultsPage();
    });
  }
};

export default activate;
