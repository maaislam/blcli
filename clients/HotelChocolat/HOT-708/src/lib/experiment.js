import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import inputHandlers from './helpers/inputHandlers';
import hideOptionalInputFields from './helpers/hideOptionalInputFields';
import setOrderSummary from './helpers/setOrderSummary';
import passwordVisibility from './helpers/passwordVisibility';
import changeFieldLayout from './helpers/changeFieldLayout';
import { isMobile } from './helpers/utils';
import isAllFieldsEmpty from './helpers/isAllFieldsEmpty';

const { ID, VARIATION } = shared;

const init = () => {
  const main = document.querySelector('#main');
  const paymentIconElem = document.querySelector('#payments-and-security-icon');

  if (!isMobile()) {
    const container = document.createElement('div');
    container.classList.add(`${ID}__container`);
    container.appendChild(main);
    paymentIconElem.insertAdjacentElement('beforebegin', container);
  }

  const headingTexts = `<div class='${ID}__headingTexts'>
    <div class='${ID}__headingText'>Tell us about yourself</div>
    <div>We’ll send your order confirmation to these details.</div>
  </div>`;
  const slotContainer = document.querySelector('.html-slot-container p');
  slotContainer.insertAdjacentHTML('afterend', headingTexts);

  setOrderSummary(ID);
  hideOptionalInputFields(ID);
  changeFieldLayout(ID);
  // inputHandlers(ID);
  // handleBillingAddress();
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  inputHandlers(ID, VARIATION);

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    const accordionHeader = target.closest(`.${ID}__accordion-header`);

    if (accordionHeader) {
      const content = accordionHeader.nextElementSibling;

      accordionHeader.classList.toggle('open');
      content.classList.toggle('open');

      if (content.classList.contains('open')) {
        content.style.maxHeight = `${content.scrollHeight}px`; //Set height to content height
      } else {
        content.style.maxHeight = '0'; //Collapse the content
      }
    } else if (target.closest('#revealPasswordIcon') || target.closest('#hidePasswordIcon')) {
      passwordVisibility(ID);
    } else if (target.closest('[type="submit"][name="dwfrm_multishipping_editAddress_save"]')) {
      const emailInput = document.querySelector('#dwfrm_multishipping_editAddress_userInfo_customer_email');
      const firstNameInput = document.querySelector('#dwfrm_multishipping_editAddress_addressFields_firstName');
      const lastNameInput = document.querySelector('#dwfrm_multishipping_editAddress_addressFields_lastName');
      const deliveryContactInput = document.querySelector('#dwfrm_multishipping_editAddress_addressFields_phone');

      if (isAllFieldsEmpty(emailInput.value, firstNameInput.value, lastNameInput.value, deliveryContactInput.value)) return;

      fireEvent('User submits the guest form');
    } else if (target.closest('.enter-manually')) {
      fireEvent('User clicks enter address manually');
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  init();

  // observeDOM('#RegistrationForm', () => {
  //   console.log('RegistrationForm changed');
  //   const allInputs = document.querySelectorAll('.field-wrapper .input-text');

  //   allInputs.forEach((input) => {
  //     if (input.value.length > 0) {
  //       input.style.border = '2px solid #000';
  //     }
  //   });
  // }, {
  //   childList: false,
  //   subtree: true,
  //   attributes: true,
  //   characterData: true,
  //   characterDataOldValue: true
  // });
};
