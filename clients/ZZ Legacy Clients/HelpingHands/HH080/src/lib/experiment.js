/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { callCTA } from './callCTA';
import observeDOM from './observerDOM';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();
  fireEvent('Test Code Fired');
  document.querySelector('.menu-top').classList.add(`${ID}__menu-top`);

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  //** if control and varaition has same 'Test Code' then it goes here */
  if (VARIATION == 'control') {
    fireEvent('Conditions Met');
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  if(VARIATION == 1 || VARIATION == 2){
    setTimeout(() => {
      callCTA();
    }, 2000);
    fireEvent('Conditions Met');
    const callbackFn = (mutation) => {
      if (mutation.addedNodes.length > 0)
        mutation.addedNodes.forEach((item) => {
          console.log(item);
          if (item.nodeName == 'DIV' && (item.matches('.HH067_wrapper') || item.closest('.HH067_wrapper'))) {
            item.classList.add(`${ID}__over-HH067_wrapper`);
            setTimeout(() => {
              callCTA();
            }, 2000);
          }
        });
    };
    
    observeDOM(`.${ID}__menu-top`, callbackFn);
  }
  let logo = document.querySelector('.logo.mobile');
  let img = logo.firstElementChild.firstElementChild;
  img.classList.add('logo-mobile');

  

  if (VARIATION == 2) {
      //** if document contains classname link  */
      //** then remove 'Open Menu' text and node */
      let link = document.querySelectorAll(".link")[0]
      //document.querySelector('.menu-top').classList.remove('HH080-logo-mobile')
     link.style.display = "none"
    }
};
