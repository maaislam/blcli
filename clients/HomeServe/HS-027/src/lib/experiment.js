/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { fireEvent, newEvents, setup } from './helpers/utils';
import shared from '../../../../../core-files/shared';
import { signposting } from './components/signposting';

const { ID, VARIATION } = shared;

const init = () => {
  const targetElement = document.querySelector('#mainContainer');
  targetElement && targetElement.insertAdjacentHTML('afterend', signposting(ID));
};

export default () => {
  setup();

  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  init();
};
