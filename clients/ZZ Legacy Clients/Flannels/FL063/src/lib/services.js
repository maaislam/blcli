import { fullStory, getCookie, setCookie } from '../../../../../lib/utils';
// import {  } from '../../../../../lib/uc-lib';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function amendTitle(el, newText) {
  if (el && newText) {
    el.textContent = newText;
  }
}

/**
 * Helper email valid
 */
function emailValid(val) {
  return val.match(/.+@.+\..+/i);
}

/**
 * @desc Store email in local storage.
 * @param {Element} el 
 */
let timeoutRef = null;
function storeEmail(el) {
  if (el) {
    el.addEventListener('input', function(e) {
      clearTimeout(timeoutRef);

      const emailVal = e.target.value;
      const emailInput = e.target;

      // window.sessionStorage.setItem('FL063-email', emailVal || '');
      
      setCookie('FL063-email', window.btoa(emailVal), 1);

      fillEmail();

      if (emailVal.length > 1) {
        if(emailValid(emailVal)) {
          removeErr();
          document.body.classList.add('FL063-hasInput');
        } else {
          document.body.classList.add('FL063-showerror');
          timeoutRef = setTimeout(() => {
            showError(emailInput);
          }, 2000);
        }
      } else {
        document.body.classList.remove('FL063-hasInput');
      }
    });
  }
}


function showError(el) {
  if (!el) return;

  if(document.querySelector('.FL063-emailErr')) {
    document.querySelector('.FL063-emailErr').parentElement.removeChild(
      document.querySelector('.FL063-emailErr')
    );
  }

  window.scrollTo(0,0);
  el.insertAdjacentHTML('beforebegin', `
    <div class="FL063-emailErr">
      <p>Please supply a valid email address</p>
    </div>
  `);
}
function removeErr() {
  document.body.classList.remove('FL063-showerror');

  const addedErr = document.querySelector('.FL063-emailErr');
  if (addedErr) {
    addedErr.parentElement.removeChild(addedErr);
  }
}

function fillEmail() {
  const emailInput = document.querySelectorAll('input[type="email"]');

  let addedEmail = ''; // window.sessionStorage.getItem('FL063-email');
  let addedEmailPlusKey = getCookie('FL063-email');

  addedEmail = window.atob(addedEmailPlusKey || '');
  
  if (addedEmail) {
    for (let i = 0; emailInput.length > i; i += 1) {
      if (emailInput[i].getAttribute('id')) {
        emailInput[i].value = addedEmail;
      }
    }
  }
}

function fetchEmail() {
  let storedEmail = ''; // window.sessionStorage.getItem('FL063-email');
  const emailCookie = getCookie('FL063-email');

  const addedEmailPlusKey = window.atob(emailCookie || '');

  storedEmail = addedEmailPlusKey;
  if (storedEmail) {
    return storedEmail;
  }
}


export { emailValid, setup, amendTitle, storeEmail, fetchEmail, fillEmail, showError, removeErr }; // eslint-disable-line
