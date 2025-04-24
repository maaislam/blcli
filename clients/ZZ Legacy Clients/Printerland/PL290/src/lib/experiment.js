/**
 * PL-290 [PL290] - Moving 'Looking for Cartridges?' CTA
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  const lookingForCartridgesCTA = document.querySelector('.container.product-page__quick-links #pnlRelatedLink');
  lookingForCartridgesCTA.querySelector('button').addEventListener('click', (e) => {
    fireEvent('Click - Looking for Cartridges CTA');
  });

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
  
  document.querySelector('.container.product-page__quick-links').insertAdjacentElement('afterbegin', lookingForCartridgesCTA);
};
