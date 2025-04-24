import { fireBootsEvent } from '../../../../../../core-files/services';
import actionTypes from '../actionTypes';
import eventTypes from '../eventTypes';
import showEmailError from '../helpers/showEmailError';
import subscribeToBoots from './subscribeToBoots';

const showSuccessMessage = (ID, element, timeoutDuration = 2500) => {
  const successElement = element.querySelector(`.${ID}__success`);
  if (!successElement) {
    return;
  }
  successElement.classList.remove(`${ID}__hide`);
  // Clear any previous timeout to avoid race conditions
  if (successElement.hideTimeout) {
    clearTimeout(successElement.hideTimeout);
  }

  successElement.hideTimeout = setTimeout(() => {
    successElement.classList.add(`${ID}__hide`);
  }, timeoutDuration);
};

const signUpHandler = (ID, target) => {
  const varSubsSubmitBtn = target.closest(`.${ID}__btn`);
  const emailWrapperElement = varSubsSubmitBtn.closest(`.${ID}__emailWrapper`);
  const emailInput = emailWrapperElement.querySelector(`.${ID}__input`);
  const formWrapper = varSubsSubmitBtn.closest(`.${ID}__formWrapper`);
  const modal = document.querySelector(`.${ID}__modal`);

  const isEmailValid = formWrapper.classList.contains(`${ID}__emailValid`);
  const isModalOpen = modal && modal.classList.contains(`${ID}__open`);

  if (isEmailValid) {
    fireBootsEvent('Customer enters their email and clicks submit', true, eventTypes.experience_action, {
      action: actionTypes.click_cta,
      action_detail: 'Customer enters their email and clicks submit',
    });

    emailWrapperElement.classList.add(`${ID}__active`);
    emailInput.disabled = true;

    emailInput.value &&
      subscribeToBoots(emailInput.value)
        .then((result) => {
          if (result && result.status) {
            emailWrapperElement.classList.remove(`${ID}__active`);
            emailInput.removeAttribute('disabled');
            showSuccessMessage(ID, emailWrapperElement);
          }
        })
        .catch((error) => {
          console.error('email subscription failed:', error);
          emailWrapperElement.classList.remove(`${ID}__active`);
          emailInput.removeAttribute('disabled');
          showSuccessMessage(ID, emailWrapperElement);
        });

    if (isModalOpen) {
      modal.classList.remove(`${ID}__open`);
      document.documentElement.style.overflow = 'inherit';
    }
  } else {
    const emailElem = formWrapper.querySelector(`.${ID}__input`);
    const errorMsg = emailElem.value.length === 0 ? 'Please fill out this field.' : 'Please enter a valid email address.';
    showEmailError(ID, emailElem, errorMsg);
  }
};

export default signUpHandler;
