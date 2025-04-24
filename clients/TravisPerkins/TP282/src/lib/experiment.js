import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { getCookie } from '../../../../../lib/utils';
import modalContent from './components/modalContent';
import { emailValidation, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;

const DOM_RENDER_DELAY = 2000;

const isLoggedIn = () => !!getCookie('access_token');

const init = () => {
  //check if user has seen the modal

  if (window.location.pathname !== '/' || isLoggedIn() || sessionStorage.getItem(`${ID}__modalseen`)) {
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);
    //remove modal DOM

    const modal = document.getElementById(`${ID}__modal`);
    if (modal) {
      modal.remove();
    }

    return;
  }

  setup();

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  //render modal
  const modal = document.createElement('div');
  modal.id = `${ID}__modal`;

  modal.innerHTML = `
      <div id="${ID}__overlay" class="${ID}__overlay"></div>
      <div id="${ID}__modal" class="${ID}__modal">
          <div class="${ID}__modal-content">
            <div class="modal-left ${
              VARIATION === '2' ? `${ID}__hide` : ''
            }"><img src="https://sb.monetate.net/img/1/581/5273029.png" alt="sign up" /></div>  
            <div class="modal-right">
              ${modalContent(ID)}
            </div>
          </div>
      </div>`;
  //modal overlay
  const overlay = document.createElement('div');
  overlay.id = `${ID}__overlay`;
  overlay.classList.add('modal-overlay');

  document.body.appendChild(modal);
  //set session storage to prevent modal from showing again

  sessionStorage.setItem(`${ID}__modalseen`, true);

  //console log when user input email
  const emailInput = document.querySelector(`.${ID}__form input[type="email"]`);
  emailInput.addEventListener('input', () => {
    //check if email is valid
    const isValidEmail = emailValidation(emailInput.value);
    if (isValidEmail) {
      fireEvent('Users input email');
    }
  });
};

export default () => {
  setTimeout(init, DOM_RENDER_DELAY);

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__signUpBtn`)) {
      fireEvent('Users who clicks to sign ups');
      const ctrlEmailInput = document.querySelector('[data-test-id="mail-block-input"]');
      const ctrlEmailBtn = document.querySelector('[data-test-id="mail-block-send-button"]');
      const emailInput = document.querySelector(`.${ID}__form input[type="email"]`);

      const emailError = document.querySelector(`.${ID}__form .email-error`);
      const isValidEmail = emailValidation(emailInput.value);
      // const signUpBtn = target.closest(`.${ID}__signUpBtn`);

      if (isValidEmail) {
        //close modal
        const modal = document.getElementById(`${ID}__modal`);
        modal.remove();
        emailError.classList.add(`${ID}__hidden`);
        ctrlEmailInput.setAttribute('value', emailInput.value);
        ctrlEmailInput.click();
        ctrlEmailBtn.removeAttribute('disabled');

        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(ctrlEmailInput, emailInput.value);

        const event = new Event('input', { bubbles: true });
        ctrlEmailInput.dispatchEvent(event);

        //ctrlEmailInput.dispatchEvent(new Event('change'));
        ctrlEmailBtn.click();
      } else {
        emailError.classList.remove(`${ID}__hidden`);
      }
    } else if (target.closest(`.${ID}__login`)) {
      fireEvent('Users click to ‘Login’');
    } else if (target.closest(`.${ID}__close`) || target.closest(`.${ID}__overlay`)) {
      const modal = document.getElementById(`${ID}__modal`);
      modal.remove();

      fireEvent('Users exit the pop up');
    } else if (target.closest('[data-test-id="header-account-button"]')) {
      fireEvent('Users login in the top navigation');
    }
  });

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(['#app-container'], () => {
      setTimeout(init, DOM_RENDER_DELAY);
    });
  });
};
