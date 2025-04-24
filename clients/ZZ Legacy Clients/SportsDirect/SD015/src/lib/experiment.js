/**
 * SD015 - Checkout Auto-Fill
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './shared';
import { events } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {
  
  const { ID, VARIATION } = settings;

  // Control = V2
  if (VARIATION == 2) {
    events.send(ID, 'SD015 Control');
    return false;
  } else {
    events.send(ID, `SD015 Variation ${VARIATION}`);
  }
  

  setup();

  const manualLinks = document.querySelectorAll('.EnterManAdd');
  if (manualLinks) {
    for (let i = 0; manualLinks.length > i; i += 1) {
      const firstLink = manualLinks[i].querySelector('a:first-of-type');
      if (firstLink) {
        firstLink.click();
        manualLinks[i].classList.add('SD015-hide');
      }
    }
  }

  
};
