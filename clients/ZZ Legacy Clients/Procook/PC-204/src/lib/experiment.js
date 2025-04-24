/**
 * PC-204 - Key popular quick search terms
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getUrlParameter, generatPopulaQuickSearchTerms, clickEvents } from './helpers';
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
  document.querySelector('.top-header').insertAdjacentHTML('beforeend', `<div class="${ID}-popular-searches__wrapper"><div class="${ID}-popular-searches__container"><ul class="${ID}-popular-searches__content desktop"><span>Popular:</span></ul></div></div>`);
  
  document.querySelector('.mobile-search').insertAdjacentHTML('beforeend', `<div class="${ID}-popular-searches__wrapper"><div class="${ID}-popular-searches__container"><ul class="${ID}-popular-searches__content mobile"><span>Popular:</span></ul></div></div>`);

  generatPopulaQuickSearchTerms(window.location.pathname);
  clickEvents();
};
