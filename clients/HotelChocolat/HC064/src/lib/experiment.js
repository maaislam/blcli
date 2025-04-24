/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import controlMessages from './controlMessages';
import ValueMessages from './markup';
import { cookieOpt, setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if(VARIATION === 'control') {
    controlMessages();
  } else {
    new ValueMessages();
  }

};
