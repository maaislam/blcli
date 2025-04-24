/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
//import { pollerLite } from '../../../../../lib/uc-lib';

const { ID, VARIATION } = shared;

export default () => {
  setup();
  const testFired = sessionStorage.getItem(`${ID}__testfired`);
  if (testFired !== 'true') {
    fireEvent('Test Code Fired');
    sessionStorage.setItem(`${ID}__testfired`, 'true');
  }

  document.body.addEventListener('click', (e) => {
    const hasBeenClicked = sessionStorage.getItem(`${ID}__clicked`);
    if (location.pathname === '/checkout' || hasBeenClicked == 'true') return;
    fireEvent('Conditions Met');
    sessionStorage.setItem(`${ID}__clicked`, 'true');
  });
};
