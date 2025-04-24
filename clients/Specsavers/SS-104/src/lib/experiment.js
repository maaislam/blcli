/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { checkIntersection, elementIsInView } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  document.addEventListener('click', e => {
    if(e.target.closest('.prescription-selector-content.form-group.sphere legend a')) {
      fireEvent('Click Info Button');
    }
    if(e.target.closest('.prescription-selector-content.form-group.sphere .sphere__right')) {
      fireEvent('Select Sphere - Right');
    }
    if(e.target.closest('.prescription-selector-content.form-group.sphere .sphere__left')) {
      fireEvent('Select Sphere - Left');
    }
  });
    
  const sphereElm = document.querySelector('.prescription-selector-content.form-group.sphere');
  if(sphereElm) {
    if(elementIsInView(sphereElm, false)) {
      fireEvent('In View', true);
    }

    checkIntersection(sphereElm).then(() => fireEvent('In View', true));
  }

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  if(sphereElm) {
    const span = sphereElm.querySelector('legend span');
    span.innerHTML = 'Sphere (SPH) / Power';
  }
};
