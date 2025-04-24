/**
 * AV025 - PLP priced High-Low
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  // Write experiment code here
  // Get PLP ID
  const pathname = window.location.pathname;
  const res = pathname.split('/');
  const plpID = res[1];

  let listOfPLPs = {};
  if (sessionStorage.getItem(`${shared.ID}-user-has-changed-option`)) {
    listOfPLPs = JSON.parse(sessionStorage.getItem(`${shared.ID}-user-has-changed-option`));
  }

  /**
   * @desc If experiment has already run on the page
   * and user has changed their filter preference
   * then do not run experiment code
   */
  if (Object.values(listOfPLPs).indexOf(plpID) === -1) {
    // Trigger a click on the Filter dropdown to open up the list of Selections
    document.querySelector('a.select2-choice.ui-select-match').click();

    pollerLite(['.select2-drop.select2-with-searchbox.select2-drop-active'], () => {
      // --- Hide dropdown while pre-selecting "High - Low" option
      const filterDropdown = document.querySelector('.select2-drop.select2-with-searchbox.select2-drop-active');
      filterDropdown.setAttribute('style', 'visibility: hidden;');
      document.querySelectorAll('#ui-select-choices-0 li')[0].click();
      filterDropdown.setAttribute('style', 'visibility: visible;');
  
      // --- Event listener for user selection
      pollerLite(['#ui-select-choices-0'], () => {
        document.querySelector('#ui-select-choices-0').addEventListener('click', (e) => {
          const userSelection = document.querySelector('.select2-chosen span.ng-binding.ng-scope');
          if (userSelection.innerText !== "Price (Highest - Lowest)") {
            listOfPLPs[0] = plpID;
            sessionStorage.setItem(`${shared.ID}-user-has-changed-option`, JSON.stringify(listOfPLPs));
          }
        });
      });
      
    });
  }
  
};
