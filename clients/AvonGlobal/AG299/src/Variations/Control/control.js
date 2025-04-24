/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import shared from '../../../../../core-files/shared';
import { setup, fireEvent } from '../../../../../core-files/services';

export default () => {
  setup();

  fireEvent('Test Code Fired');

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    // ...
  };

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  const url = document.location.href;
  const brochureLanding = 'https://online.shopwithmyrep.co.uk/c02_uk_2022/';
  const coverPage = document.location.href.indexOf('page/1') > -1;

  if (shared.VARIATION === 'control') {
    if (url === brochureLanding || coverPage) {
      fireEvent('Conditions Met');
    }
    return;
  }

  init();
};
