/**
 * NE-360 - Gifting landing page subtitles
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
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  setTimeout(() => {
    const items = document.querySelectorAll('.widget-component.text-widget');
    // --- DESKTOP
    if (window.innerWidth > 767) {
      for (let i = 0; i < 9; i += 1) {
        if (i !== 3 && i !== 4 && i !== 7) {
          items[i].classList.add('move');
        }
      }
      for (let i = 12; i < 19; i += 1) {
        if (i !== 17) {
          items[i].classList.add('hide');
        }
        
      }
    // --- MOBILE
    } else {
      for (let i = 0; i < 9; i += 1) {
        if (i !== 2 && i !== 3) {
          items[i].classList.add('move');
        }
      }
      for (let i = 14; i < 21; i += 1) {
        if (i !== 17) {
          items[i].classList.add('hide');
        }
        
      }
    }
  }, 1000);
  
};
