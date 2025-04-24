/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './helpers/utils';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';
import stepSixContainer from './components/stepSixContainer';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;
const init = () => {
  const targetElement = document.body;
  if (!document.querySelector(`.${ID}__stepSixContainer`)) {
    targetElement.insertAdjacentHTML('beforeend', stepSixContainer(ID));
  }
};

export default () => {
  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  init();
};
