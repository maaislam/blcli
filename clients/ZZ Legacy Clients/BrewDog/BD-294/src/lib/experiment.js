/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite, checkIntersection } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  const offsetCopy = document.querySelector('#product_addtocart_form + p.copy');
  checkIntersection(offsetCopy).then(() => {
    fireEvent('In View');
  });

  const productForm = document.querySelector('#product_addtocart_form');
  if(productForm) {
    productForm.addEventListener('submit', () => {
      fireEvent('Add to Bag');
    });
  }

  pollerLite([
    () => !!window.hj
  ], () => {
    hj('tagRecording', [`${shared.ID}-${shared.VARIATION}`]);
  });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ..
};
