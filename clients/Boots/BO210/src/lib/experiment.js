/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  events.send(`experimentation`, `BO210 Variation-${VARIATION}`, `Triggered`);

  // trigger events
  if (VARIATION === 'control') {
      document.body.setAttribute('data-tagg-experience', 'control');
  }
  if (VARIATION === '1') {
      document.body.setAttribute('data-tagg-experience', 'treatment');
  }

};
