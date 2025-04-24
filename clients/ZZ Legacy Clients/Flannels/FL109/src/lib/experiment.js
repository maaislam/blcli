/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { runFL090 } from './FL090';
import { events } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { VARIATION, ID } = settings;
  
  runFL090(VARIATION);

  if (VARIATION == 2) {
    events.send(ID, `${ID} Control`, `${ID} user in control (FL090)`);
    return false;
  } else {
    events.send(ID, `${ID} Variation 1`, `${ID} user in variation 1`);    
  }

};