/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  // At end of code, reset window.einstein expect type array
  window.einstein.loaded = [];
};
