/**
 * HC082 - PLP Personalisation Filters
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import forMyselfData from './for_myself';
import forSomeoneElseData from './for_someone';
import { generateContent, removeFilteredContent } from './helpers';

export default () => {
  const { ID, VARIATION } = shared;

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
  const newFilters = `<div class="${ID}-gift-filters__wrapper">
    <div class="${ID}-gift-filters__container">
      <span>Who are you shopping for today?</span>
      <div class="${ID}-buttons">
        <button id="for-myself"><span class="${ID}-shortName">Myself</span><span class="${ID}-longName">A treat for myself</span></button>
        <button id="for-someone"><span class="${ID}-shortName">Someone else</span><span class="${ID}-longName">As a gift for someone</span></button>
      </div>
    </div>
  </div>`;

  document.querySelector(`.search-result-options`).insertAdjacentHTML('afterend', newFilters);


  // --- CLICK EVENTS
  document.querySelector(`.${ID}-buttons button#for-myself`).addEventListener('click', (e) => {
    if (document.querySelector(`.${ID}-buttons button.active`)) {
      document.querySelector(`.${ID}-buttons button.active`).classList.remove('active');
      removeFilteredContent('forSomeoneElse');
    }
    if (!document.querySelector(`.${ID}-grid-tile.forMyself`)) {
      generateContent(forMyselfData, 'forMyself');
    }
    document.querySelector(`.${ID}-buttons button#for-myself`).classList.add('active');
    fireEvent('Clicked - Filter by "A treat for myself"');
  });
  document.querySelector(`.${ID}-buttons button#for-someone`).addEventListener('click', (e) => {
    if (document.querySelector(`.${ID}-buttons button.active`)) {
      document.querySelector(`.${ID}-buttons button.active`).classList.remove('active');
      removeFilteredContent('forMyself');
    }
    if (!document.querySelector(`.${ID}-grid-tile.forSomeoneElse`)) {
      generateContent(forSomeoneElseData, 'forSomeoneElse');
    }
    document.querySelector(`.${ID}-buttons button#for-someone`).classList.add('active');
    fireEvent('Clicked - Filter by "As a gift for someone"');
  });

};
