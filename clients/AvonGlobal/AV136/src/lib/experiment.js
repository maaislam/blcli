/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import variants from './components/variants';
import dropdownChange from './helpers/dropdownChange';

import getVariantData from './helpers/getVariantData';

export default () => {
  setup();
  const { rootScope, ID, VARIATION } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    fireEvent('Conditions Met');
    //console.log('conditions met');

    // -----------------------------
    // Add events that apply to both variant and control
    // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
    // -----------------------------
    // ...

    document.body.addEventListener('click', (e) => {
      const { target } = e;
      if (target.closest(`.${ID}__variants-dp--title`)) {
        dropdownChange();
      } else if (target.closest('body') && !target.closest(`.${ID}__variants-dp`)) {
        dropdownChange('close');
      } else if (target.closest('.quantity-border')) {
        fireEvent('User interacts with quantity');
      } else if (target.closest('.button-add-to-cart')) {
        fireEvent('User interacts with add to bag');
      } else if (target.closest(`.${ID}__variant--title`)) {
        fireEvent('User chooses a variant');
      }
    });

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (VARIATION == 'control') {
      return;
    }

    // -----------------------------
    // Write experiment code here
    // -----------------------------

    // find varinats
    getVariantData().then((variantData) => {
      console.log('file: experiment.js:42 ~ init ~ variantData:', variantData);
      const attachToElem = document.querySelector('.Details');
      attachToElem.insertAdjacentHTML('afterend', variants(ID, variantData));
    });
  };

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    window.location.reload();
  });

  init();
};
