/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import variants from './components/variants';
import dropdownChange from './helpers/dropdownChange';

import getVariantData from './helpers/getVariantData';

export default () => {
  setup();
  const { ID, VARIATION } = shared;

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
      } else if ((target.closest('body') && !target.closest(`.${ID}__variants-dp`)) || target.closest(`.${ID}__modal-label`)) {
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
      console.log('variantData:', variantData);
      const attachToElem = document.querySelector('.product-key-actions');
      const controlOverlay = document.getElementById('site-overlay');
      const newOverlay = document.createElement('div');
      const notifyElem = document.querySelector('.notify:not(.hide)');
      newOverlay.id = `${ID}__overlay`;
      controlOverlay.insertAdjacentElement('afterend', newOverlay);
      attachToElem.insertAdjacentHTML('beforebegin', variants(ID, variantData));
      notifyElem?.insertAdjacentHTML('beforebegin', variants(ID, variantData));

      // adjust klarna position
      pollerLite(['[data-key="credit-promotion-auto-size"]'], () => {
        const klarnaElem = document.querySelector('[data-key="credit-promotion-auto-size"]').closest('div');
        klarnaElem && document.querySelector(`.${ID}__variants`).insertAdjacentElement('afterend', klarnaElem);
        document.querySelector('.product-key-actions').style.marginTop = '16px';
      });
    });
  };

  init();
};
