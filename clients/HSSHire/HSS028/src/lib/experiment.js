/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import experimentCode from './experimentCode';
import { observer, events, pollerLite, getCookie, setCookie } from '../../../../../lib/utils';

export default () => {
  events.send('Experimentation', 'HSS028 - PDP Updates', `Variation: ${shared.VARIATION} - Did Meet Conditions`);

  if(shared.VARIATION == 'control') {
    return;
  }

  setup();
  experimentCode();
  
};
