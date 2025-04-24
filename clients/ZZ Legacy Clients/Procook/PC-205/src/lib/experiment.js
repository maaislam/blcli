/**
 * PC-205 - Recent quick search terms - All Pages
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getUrlParameter, generateRecentSearchTerms, updateRecentlySearchedTerms, clickEvents } from './helpers';
import data from './data';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

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
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  if (window.location.pathname == '/' 
  && localStorage.getItem(`${ID}-recent-searches`) !== null) {
    document.querySelector(`.top-header-container`).setAttribute('style', 'padding-bottom: 0 !important;');
    document.querySelector('.top-header').insertAdjacentHTML('beforeend', `<div class="${ID}-recent-searches__wrapper"><div class="${ID}-recent-searches__container"><ul class="${ID}-recent-searches__content desktop"><span>Recent:</span></ul></div></div>`);
    document.querySelector('.mobile-search').insertAdjacentHTML('beforeend', `<div class="${ID}-recent-searches__wrapper"><div class="${ID}-recent-searches__container"><ul class="${ID}-recent-searches__content mobile"><span>Recent:</span></ul></div></div>`);

    generateRecentSearchTerms(window.location.pathname);
  }
  
  clickEvents();
  document.querySelector('button.ais-SearchBox-submit').addEventListener('click', (e) => {
    sessionStorage.setItem(`${ID}-searched-term`, document.querySelector('input.ais-SearchBox-input').value);
  });

  if (window.location.search.indexOf('?searchstr') > -1) {
    const searchedFor = getUrlParameter('searchstr', window.location.href);
    if (sessionStorage.getItem(`${ID}-searched-term`) == searchedFor) {
      updateRecentlySearchedTerms(searchedFor);
    } else {
      updateRecentlySearchedTerms(searchedFor);
    }

    
  }
};
