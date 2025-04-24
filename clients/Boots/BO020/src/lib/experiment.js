/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID } = shared;

  // add fake button that checks postcode

  const addUpdateButton = () => {
    const newButton = document.createElement('div');
    newButton.classList.add(`${ID}-update`);
    newButton.innerHTML = `<span>Update</span>`;


    document.querySelector('.button_footer_line.myAccountAddressButton').insertAdjacentElement('beforeend', newButton);

    // check postcode on load, if valid remove the class, else make disabled
    const postcodeBox = document.querySelector('#WC__NameEntryForm_FormInput_postcode_1');
    if(postcodeBox) {
      const val = postcodeBox.value;
      if(val.match(/^[\w]{1,2}[\d]{1,2}(\w)?(\s)(\d)[\w]{2}$/)) {
        newButton.classList.remove(`${ID}-postcode-invalid`);
      } else {
        newButton.classList.add(`${ID}-postcode-invalid`);
      }
    }
  }

  addUpdateButton();

  const addErrorMessage = () => {
    const postcodeBox = document.querySelector('#WC__NameEntryForm_FormInput_postcode_1');
    postcodeBox.insertAdjacentHTML('afterend', `<div class="${ID}-error">Error: Please make sure this is your full postcode and it contains a space</div>`);
  }

  addErrorMessage();


  const checkPostcode = () => {
    const postcodeBox = document.querySelector('#WC__NameEntryForm_FormInput_postcode_1');
    const updateButton = document.querySelector(`.${ID}-update`);
    const errorMessage = document.querySelector(`.${ID}-error`);

    postcodeBox.addEventListener('keyup', () => {
      const val = postcodeBox.value;

      if(val.match(/^[\w]{1,2}[\d]{1,2}(\w)?(\s)(\d)[\w]{2}$/)) {
        updateButton.classList.remove(`${ID}-postcode-invalid`);
        errorMessage.classList.remove(`${ID}-error-show`);
      } else {
        updateButton.classList.add(`${ID}-postcode-invalid`);
        errorMessage.classList.add(`${ID}-error-show`);
      }
    });
  }

  checkPostcode();


  const clickUpdate = () => {
    const updateButton = document.querySelector(`.${ID}-update`);
    const hiddenUpdate = document.querySelector('.button_footer_line.myAccountAddressButton .button.primary');

    updateButton.addEventListener('click', () => {
      if(!updateButton.classList.contains(`${ID}-postcode-invalid`)) {
        hiddenUpdate.click();
      }
    });
  }
  clickUpdate();

  // force refresh of the page so the test fires again
  const refreshPage = () => {
    const closeUpdateMessage = document.querySelector('#MessageArea');
    closeUpdateMessage.addEventListener('click', () => {
      window.location.href = window.location.href;
    });
  }
  refreshPage();
};
