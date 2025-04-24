/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import lightbox from './lightbox';

export default () => {
  setup();

  if(shared.VARIATION === '3') {
    lightbox();
  }
};
