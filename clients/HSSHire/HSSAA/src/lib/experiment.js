/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';

export default () => {
  setup();

  if(shared.VARIATION == 'control') {
    events.send('HSSAA', 'control-activated');
  } else {
    events.send('HSSAA', 'variation-activated');
  }
};
