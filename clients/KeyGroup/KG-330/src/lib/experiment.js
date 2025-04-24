/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  console.log('experiment started');

  pollerLite(['#er-calculator #FirstName'], () => {
    console.log('pollerLite');

    const firstName = document.querySelector('#er-calculator #FirstName').closest('.form__field-wrapper');
    const lastName = document.querySelector('#er-calculator #LastName').closest('.form__field-wrapper');


    // const keyDownEvent = new KeyboardEvent('keydown', { key: 'a' });
    // const keyUpEvent = new KeyboardEvent('keyup', { key: 'a' });
    // firstName.querySelector('input').dispatchEvent(keyDownEvent);
    // firstName.querySelector('input').dispatchEvent(keyUpEvent);

    // firstName.classList.add(`${ID}-display-none`);
    // lastName.classList.add(`${ID}-display-none`);

    const fullName = `
      <div class="form__field-wrapper ${ID}-display-block">
        <label for="FullName" class="form__label">Full Name</label>
        <input type="text" id="FullName" name="FullName" class="form__input" required>
        <span class="form__field-icon"></span>
      </div>
      `;

    const firstNameHTML = `<div class="form__field-wrapper ${ID}-display-block">
    <label for="FirstName" class="form__label">First Name</label>
    <input type="text" id="FirstName" name="FirstName" class="form__input" required>
    <span class="form__field-icon"></span>
  </div>`;

  const lastNameHTML = `<div class="form__field-wrapper ${ID}-display-block">
  <label for="LastName" class="form__label">Last Name</label>
  <input type="text" id="LastName" name="LastName" class="form__input" required>
  <span class="form__field-icon"></span>
</div>`

      firstName.insertAdjacentHTML('beforebegin', fullName);
      firstName.insertAdjacentHTML('afterend', lastNameHTML);
      firstName.insertAdjacentHTML('afterend', firstNameHTML);
      firstName.remove();
      lastName.remove();

      // Function to mimic key input
      // function mimicKeyInput(text, inputField) {
      //   // Iterate over each character in the text
      //   for (const char of text) {
      //     // Create a keyboard event
      //     console.log('char', char)
      //     const keyEvent = new KeyboardEvent('keydown', {
      //       key: char,
      //       code: char.charCodeAt(0),
      //       keyCode: char.charCodeAt(0),
      //       which: char.charCodeAt(0),
      //     });

      //     // Dispatch the keyboard event
      //     inputField.dispatchEvent(keyEvent);
      //   }
      // }

      const fullNameInput = document.querySelector('#er-calculator #FullName');
      fullNameInput.addEventListener('input', () => {
        console.log('fullNameInput')
        const fullNameValue = fullNameInput.value;
        const fullNameArray = fullNameValue.split(' ');
        if (fullNameArray.length < 2) {
          document.querySelector('#er-calculator #FirstName').value = fullNameValue;
          const firstNameField = document.querySelector(`#er-calculator .${ID}-display-block input#FirstName`);
          // firstNameField.dispatchEvent(mouseDownEvent);
          firstNameField.setAttribute('value', fullNameValue);
          const inputEventFirst = new Event('input', { bubbles: true });
          firstNameField.dispatchEvent(inputEventFirst);
          return;
        }

        const firstNameValue = fullNameArray[0];
        console.log(firstNameValue);
        const lastNameValue = fullNameArray[fullNameArray.length - 1];
        console.log(lastNameValue);

        // const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true });



        const lastNameField = document.querySelector(`#er-calculator .${ID}-display-block input#LastName`);
        // lastNameField.dispatchEvent(mouseDownEvent);
        lastNameField.setAttribute('value', lastNameValue);
        const inputEventLast = new Event('input', { bubbles: true });
        lastNameField.dispatchEvent(inputEventLast);
        // mimicKeyInput(firstNameValue, firstNameField);
        // mimicKeyInput(lastNameValue, lastNameField);
      });
  });
}

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

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
  startExperiment();
};
