import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import pendingResults from '../components/pendingResults';
import fifthStep from './helpers/fifthStep';
import triggerGoals from './helpers/triggerGoals';
import { observeDOM, showPendingResults } from './helpers/utils';

const { ID, VARIATION } = shared;

let submitButtonClicked = false;

const init = () => {
  const housePriceInputElem = document.querySelector('#HousePrice');
  const currencyHtml = `<div class='${ID}__currency'>£</div>`;
  housePriceInputElem.insertAdjacentHTML('beforebegin', currencyHtml);
  housePriceInputElem.setAttribute('placeholder', '0');

  const nextBtn = document.querySelector('.form__controls .btn--success[type="submit"]');
  const cloneNextBtn = nextBtn.cloneNode(true);
  // console.log('cloneNextBtn: ', cloneNextBtn)
  cloneNextBtn.textContent = 'Get my results';
  cloneNextBtn.classList.add(`${ID}__next-btn`, `${ID}__hidden`);
  cloneNextBtn.disabled = false;
  cloneNextBtn.setAttribute('type', 'button');
  nextBtn.insertAdjacentElement('afterend', cloneNextBtn);
};

const activeStep = () => {
  const progressElement = document.querySelector('.form__progress-step-number');
  const progressText = progressElement.textContent;
  const activeStepNumber = Number(progressText.split('/')[0]);
  return activeStepNumber;
};

// const checkAnyInputHasSuccess = () => {
//   const inputs = document.querySelectorAll('.form__field-wrapper input:not([type="checkbox"])');
//   return Array.from(inputs).some((input) => {
//     const wrapper = input.closest('.form__field-wrapper');
//     return wrapper.classList.contains('form__field-wrapper--success');
//   });
// };

const checkMobileInputHasWarning = () => {
  const mobileInput = document.querySelector('.form__field-wrapper #Telephone');
  const wrapper = mobileInput.closest('.form__field-wrapper');
  return wrapper.classList.contains('form__field-wrapper--warning');
};

const checkMobileInputHasSuccess = () => {
  const mobileInput = document.querySelector('.form__field-wrapper #Telephone');
  const wrapper = mobileInput.closest('.form__field-wrapper');
  return wrapper.classList.contains('form__field-wrapper--success');
};

const checkAnyInputHasError = () => {
  const inputs = document.querySelectorAll('.form__field-wrapper input:not([type="checkbox"])');
  return Array.from(inputs).some((input) => {
    const wrapper = input.closest('.form__field-wrapper');
    return (
      wrapper.classList.contains('form__field-wrapper--error') && !wrapper.classList.contains('form__field-wrapper--warning')
    );
  });
};

const disabledNextButton = (nextBtn) => {
  if (nextBtn) nextBtn.setAttribute('disabled', 'disabled');
};

const enableNextButton = (event, buttonElem) => {
  if (event.target.selectedIndex !== 0) {
    buttonElem.removeAttribute('disabled');
  }
};

const excludeChangeEvent = (selectSelector, buttonElem) => {
  const selectElement = document.querySelector(selectSelector);
  if (!selectElement) return;
  selectElement.removeEventListener('change', (event) => enableNextButton(event, buttonElem));
};
const attachChangeEvent = (selectSelector, buttonElem) => {
  const selectElement = document.querySelector(selectSelector);
  if (!selectElement) return;

  selectElement.addEventListener('change', (event) => enableNextButton(event, buttonElem));
};

const selectFirstMatchingOption = (postCodeSelector, addressSelector) => {
  const addressDropdown = document.querySelector(addressSelector);
  const postCodeInput = document.querySelector(postCodeSelector);

  pollerLite(
    [
      addressSelector,
      postCodeSelector,
      () => postCodeInput.value,
      () => {
        const firstOption = addressDropdown?.querySelector('option');
        return firstOption?.textContent?.toLowerCase().includes(postCodeInput.value.toLowerCase());
      },
    ],
    () => {
      const firstOption = addressDropdown.querySelector('option');
      if (!firstOption) return;

      const firstOptionText = firstOption.textContent.toLowerCase();
      const postCodeValue = postCodeInput.value.toLowerCase();
      const nextBtn = document.querySelector('.form__wrapper .btn.btn--next[type="submit"]');

      if (firstOptionText.includes(postCodeValue)) {
        addressDropdown.selectedIndex = 0;
      }

      disabledNextButton(nextBtn);
      excludeChangeEvent(addressSelector, nextBtn);
      attachChangeEvent(addressSelector, nextBtn);
    }
  );
};

export default () => {
  setup();
  newEvents.initiate = true;
  newEvents.methods = ['datalayer'];
  newEvents.property = 'G-LNFZ1KRLB8';

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__next-btn`)) {
      const submitBtn = document.querySelector('.form__controls .btn--success[type="submit"]');
      const formElem = document.querySelector('form.form--step-form.conv-calc');
      const { pathname } = window.location;
      const isEquityRelease = pathname.includes('/equity-release/calculator');
      const emailElement = document.querySelector('input#Email');
      const emailElementWrapper = emailElement.closest('.form__field-wrapper--success');

      const phoneElement = document.querySelector('input#Telephone');
      const phoneElementWrapper = phoneElement.closest('.form__field-wrapper--success');

      if ((checkMobileInputHasWarning() || !checkMobileInputHasSuccess()) && !submitButtonClicked && isEquityRelease) {
        submitBtn.click();
        submitButtonClicked = true;

        return;
      }

      // check any input has error - don't submit
      if (checkAnyInputHasError()) {
        return;
      }

      if (phoneElementWrapper) fireEvent('user has passed stage five - phone number');
      if (emailElementWrapper) fireEvent('user has passed stage six - email');
      fireEvent('user has clicked the button to submit the equity calculator');

      formElem.insertAdjacentHTML('afterbegin', pendingResults(ID));
      formElem.style.backgroundColor = '#fff';
      formElem.querySelector('.form__progress').classList.add(`${ID}__hidden`);
      formElem.querySelector('.form__wrapper').classList.add(`${ID}__hidden`);

      showPendingResults(ID, submitBtn);
    } else if (target.closest('.btn--success') && VARIATION !== 'control') {
      const postcodeFromGroup = document.querySelector('.conv-calc .form__group--postcode');
      const fieldWrapper = postcodeFromGroup?.closest('fieldset');
      if (postcodeFromGroup) {
        const postcode = document.querySelector('#Postcode').value;
        const postCodeTextHtml = `<div class='${ID}__postcode-text'>${postcode}</div>`;

        if (postcodeFromGroup.querySelector(`.${ID}__postcode-text`)) {
          postcodeFromGroup.querySelector(`.${ID}__postcode-text`).remove();
        }
        postcodeFromGroup.insertAdjacentHTML('beforeend', postCodeTextHtml);

        if (fieldWrapper?.classList?.contains('custom-fieldset')) {
          fieldWrapper.classList.remove('custom-fieldset');
        }
      }
    }

    pollerLite([`.${ID}__postcode-text`], () => {
      const postCode = document.querySelector(`.${ID}__postcode-text`);
      const formWrapper = postCode.closest('.form__wrapper');
      if (!formWrapper.classList.contains(`${ID}__hideAddressBar`) && target.closest('button.form__toggle')) {
        formWrapper.classList.add(`${ID}__hideAddressBar`);
      } else if (formWrapper.classList.contains(`${ID}__hideAddressBar`) && target.closest('.btn--success')) {
        selectFirstMatchingOption('input#Postcode[readonly]', 'select#Address[data-gtm-form-interact-field-id]');
        formWrapper.classList.remove(`${ID}__hideAddressBar`);
      }
    });
  });

  observeDOM('section.progress-bar__percentage', () => {
    const isfifthStep = document.querySelector('form.conv-calc .form__field#Email');

    if (isfifthStep && VARIATION !== 'control') {
      fifthStep(ID);
    }

    triggerGoals(activeStep());
  });

  if (VARIATION == 'control') {
    const formElem = document.querySelector('.form--step-form');
    formElem.addEventListener('submit', () => {
      const emailElement = document.querySelector('input#Email');
      const phoneElement = document.querySelector('input#Telephone');

      if (!emailElement && !phoneElement) return;

      const emailElementWrapper = emailElement?.closest('.form__field-wrapper--success');
      const phoneElementWrapper = phoneElement?.closest('.form__field-wrapper--success');

      //if check - phone input has success class || (phone input field empty && warning thakee) -> goal trigger
      if (phoneElementWrapper || (!phoneElement.value && phoneElement.closest('.form__field-wrapper--warning'))) {
        if (phoneElementWrapper) fireEvent('user has passed stage five - phone number');
        if (emailElementWrapper) fireEvent('user has passed stage six - email');
        fireEvent('user has clicked the button to submit the equity calculator');
      }
    });

    return;
  }

  init();

  const inputElement = document.querySelector('#HousePrice');
  const fieldsetWrapper = inputElement.closest('fieldset');

  inputElement.addEventListener('input', () => {
    const value = inputElement.value;
    if (value.length > 0) {
      fieldsetWrapper.classList.add(`${ID}__hide-first-letter`);
    }
  });
};
