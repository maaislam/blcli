/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { events, observer } from '../../../../../lib/utils';
import settings from './shared';
import { SD010 } from './SD010';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  SD010();

  if (VARIATION == 3) {
    events.send(ID, `${ID} Control`, `${ID} Control is active`);
    return false;
  } else {
    events.send(ID, `${ID} Variation ${VARIATION} Active`, `Variation ${VARIATION} is active`);    
  }


  if (VARIATION == 1) {
    document.body.classList.add('SD027-1');
  }
  if (VARIATION == 2) {
    document.body.classList.add('SD027-2');
  }

};

