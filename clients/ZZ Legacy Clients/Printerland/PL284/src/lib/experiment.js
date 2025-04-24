/**
 * PL-284 - View All Images CTA Removal
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

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  const viewAllImagesCTA = document.querySelector('a#lnkViewAllImages.link_viewallimages');
  if(VARIATION == 'control') {

    viewAllImagesCTA.addEventListener('click', (e) => {
      fireEvent(`Click - View All Images CTA`);
    });

    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  
};
