/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import obsIntersection from './observeIntersection';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Test Code Fired');
  const intersectionCallback = (entry) => {
    const intersectingElemClasses = entry.target.classList;
    if (entry.isIntersecting && !intersectingElemClasses.contains(`${ID}__seen`)) {
      console.log('seen', entry);
      intersectingElemClasses.add(`${ID}__seen`);
      fireEvent('Conditions Met');
    }
  };
  const BARForm = document.querySelector('.shopify-bar-wrapper');
  BARForm.classList.add(`${ID}__BARForm`);
  console.log(BARForm);

  obsIntersection(BARForm, 0.1, intersectionCallback);

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

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  BARForm.setAttribute('src', 'https://arp.avon.com/asa/UK/en/iframe/barform/shopify');
};
