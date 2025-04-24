/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { events } from '../../../../../lib/utils';
import settings from './shared';

events.analyticsReference = '_gaUAT';

export default () => {

  const { ID, VARIATION } = settings;
  if (VARIATION == 2) {
    events.send(ID, 'SD030 Control', 'SD030 Control is active');
    return false;
  } else {
    events.send(ID, 'SD030 Variation', 'SD030 Variation is active');
  }
  
  setup();

  const descriptionEl = document.querySelector('.infoaccordion a');
  
  descriptionEl.click();

};
