/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import observeDOM from './files/observeDOM';
import clickHandler from './files/clickHandler';

const { ID, VARIATION } = shared;

const init = () => {

  console.log(`${ID} is working`);

  if (window.location.href !== 'https://gocardless.com/') {

    if (VARIATION == 'control') {
      return;
    }

    // -----------------------------
    // Write experiment code here
    // -----------------------------
    // ...

    setTimeout(() => {

      document.querySelectorAll('a > span.css-y6l269').forEach(function (el) {
        if (
          (el.textContent === 'Learn more' || el.textContent === 'Learn More') &&
          !el.classList.contains(`${ID}__copy-changed`)
        ) {
          el.textContent = `How it works`;
          el.classList.add(`${ID}__copy-changed`);
        }
      })

    }, 1500);

  }


};

export default () => {

  setup();
  fireEvent('Conditions Met');

  init();
  observeDOM('body', init);

  document.body.addEventListener('click', clickHandler);


};
