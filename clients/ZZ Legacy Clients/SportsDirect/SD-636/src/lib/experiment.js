/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
  setup();

  let currPath = location.pathname.replaceAll('/','');
  let currURL = `https://www.sportsdirect.com/${currPath}`;
  let redirectURL = `https://www.sportsdirect.com/${currPath}/elevation`;

  fireEvent(`Conditions Met - currpath: ${currPath}`);

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  if(document.referrer !== "") {
    fireEvent(`Interaction - user has arrived at the ${currURL} page from: ${document.referrer}`);
  }

  setTimeout(() => {
    if(window.location.href.indexOf('elevation') == -1) {
      fireEvent(`Interaction - user has arrived at the ${currURL} page and is redirected to ${redirectURL}`);
      window.location.href = redirectURL;
    }
    
  }, 500);

};
