/**
 * MP177 - Checkout Login (MP170) Iteration
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import settings from './shared';
import { setup } from './services';
import { MP170 } from './MP170/index';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  if (!document.querySelector('.MP170')) {
    MP170(VARIATION);
  }

  // Apply changes 
  if (VARIATION == 1 || VARIATION == 2) {
    const hello = document.querySelectorAll('.checkout__login h1');
    const question = document.querySelectorAll('.checkout__heading h2');
    const no = document.querySelectorAll('.formOptionGuestNo');
    if (hello) {
      for (let i = 0; hello.length > i; i += 1) {
        hello[i].textContent = 'Hello, let\'s checkout';
      }
    }
    if (question) {
      for (let i = 0; question.length > i; i += 1) {
        question[i].textContent = '1. Do you have an account?';
      }
    }
    if (no) {
      for (let i = 0; no.length > i; i += 1) {
        no[i].textContent = '';
        no[i].insertAdjacentHTML('beforeend', `<p>No, (Guest Checkout)</p>`);
      }
    }
  }


  if (VARIATION == 2) {
    // Move Email input below radio buttons
    const inputs = document.querySelectorAll('div[data-mirrored="username"]');
    const radios = document.querySelectorAll('.checkout__form__block .checkout__heading');
    const yesId = document.querySelectorAll('.formOptionGuestYes');
    const noId = document.querySelectorAll('.formOptionGuestNo');

    if (inputs) {
      for (let i = 0; inputs.length > i; i += 1) {
        inputs[i].insertAdjacentHTML('afterbegin', `<h2 class="MP177-email">2. Please enter your email address</h2>`);
        radios[i].insertAdjacentElement('afterend', inputs[i]);
      }
    }

    // Add radio events for changing the 2. email text
    /**
     * @desc Changes email titles text.
     * @param {Boolean} yesNo 
     */
    const changeText = (yesNo) => {
      const emailTitles = document.querySelectorAll('h2.MP177-email');
      if (emailTitles) {
        for (let i = 0; emailTitles.length > i; i += 1) {
          if (yesNo) {
            emailTitles[i].textContent = '2. Please enter your email address and password to checkout';
          } else {
            emailTitles[i].textContent = '2. Please enter your email address to checkout';
          }
        }
      }
    };

    
    if (yesId && noId) {
      for (let i = 0; yesId.length > i; i += 1) {
        yesId[i].addEventListener('click', () => {
          changeText(true);
        });
      }
      for (let i = 0; noId.length > i; i += 1) {
        noId[i].addEventListener('click', () => {
          changeText(false);
        });
      }
    }
    
  }


};
