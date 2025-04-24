import { fullStory, events } from '../../../../../lib/utils';
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

function checkStatus() {
  return window.dataLayer[0].loggedIn;
}

function getName() {
  let name = '';
  const nameEl = document.querySelector('.tpHeaderLinks .button_text .sessioncamhidetext');
  if (nameEl) {
    name = nameEl.textContent.replace('Welcome', '').trim();
  }
  return name;
}

/**
 * @desc Adds a HTML element to the left of the green bar.
 * @param {Element} ref
 * @param {Boolean} isLoggedIn
 * @param {String} name
 * @param {Element} accountEl
 */
function addMessage(ref, isLoggedIn, name, accountEl) {
  if (ref) {
    const html = `
      <div class="TP118-message">
        <p>${isLoggedIn ? `You are logged in as '<strong>${name}</strong>'` : 'You are not logged in'}</p>

        ${isLoggedIn ? `<div class="TP118-account">${accountEl.outerHTML}</div>` : '<a href="/login" class="TP118-login-cta">Log In</a>'}
      </div>
    `;
    if (!document.querySelector('.TP118-message')) {
      ref.insertAdjacentHTML('afterbegin', html);
    }
  }
}


function addTracking(logininEl, registerEl, viewAccountEl) {
  if (logininEl) {
    logininEl.addEventListener('click', () => {
      events.send(settings.ID, 'Click', 'New Log In Button');
    });
  }
  if (registerEl) {
    registerEl.addEventListener('click', () => {
      events.send(settings.ID, 'Click', 'Register Button');
    });
  }
  if (viewAccountEl) {
    viewAccountEl.addEventListener('click', () => {
      events.send(settings.ID, 'Click', 'View Account', { sendOnce: true });
    });
    viewAccountEl.addEventListener('mouseenter', () => {
      events.send(settings.ID, 'Hover', 'View Account', { sendOnce: true });
    });
  }
}

export { setup, checkStatus, getName, addMessage, addTracking }; // eslint-disable-line
