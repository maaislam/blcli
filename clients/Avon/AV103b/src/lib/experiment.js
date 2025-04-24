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

  const controlBARForm = document.querySelector('form.ng-untouched');
  const formInIframe = document.createElement('iframe');
  formInIframe.classList.add(`${ID}__BARForm-wrapper`);

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  const intersectionCallback = (entry) => {
    console.log(entry);
    const intersectingElemClasses = entry.target.classList;
    if (entry.isIntersecting && !intersectingElemClasses.contains(`${ID}__seen`)) {
      console.log('seen', entry);
      intersectingElemClasses.add(`${ID}__seen`);
      fireEvent('Conditions Met');
    }
  };
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    obsIntersection(controlBARForm, 0.5, intersectionCallback);
    return;
  }
  formInIframe.setAttribute('src', 'https://arp.avon.com/asa/UK/en/iframe/barform/mas');
  formInIframe.setAttribute('title', `${ID}__BARForm`);
  //console.log(controlBARForm.closest('bar-home'));
  const barHome = controlBARForm.closest('bar-home');
  controlBARForm.closest('bar-home');
  barHome.insertAdjacentElement('afterend', formInIframe);
  barHome.style.display = 'none';
  formInIframe.closest('div').setAttribute('style', 'width: 100%; transform: translateY(-50px)');

  obsIntersection(document.querySelector(`.${ID}__BARForm-wrapper`), 0.5, intersectionCallback);
};
