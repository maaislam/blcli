import { fullStory } from '../../../../../lib/utils';
import settings from './settings';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

export const userStatus = () => {
  let loggedIn = false;
  if (window.dataLayer && window.dataLayer[0] && window.dataLayer[0].user) {
    loggedIn = true;
  }
  return loggedIn;
};

/**
 * @desc Adds the message to the DOM.
 * @param {Element} ref
 * @param {String} position Positions from the insertAdjacentHTML function.
 */
export const addMessage = (ref, position) => {
  
  // If already closed, don't add.
  if (!window.localStorage.getItem('BV009-hideMessage')) {
    // If DOM doesn't already have element.
    if (ref && !document.querySelector('.BV009-message')) {
      ref.insertAdjacentHTML(position, `
        <div class="BV009-message">
          <div class="BV009-close">
            <button class="tcp-close-btn tcp-js-close-options">
              Close
            </button>
          </div>
          <span class="u-text-style u-text-style-handwritten u-text-size-2" style="color:#ffffff;">Welcome back!</span>
          <p>Unsure what sizes or styles you’ve tried before? <a href="/login/">Log in</a> to see your order history</p>
        </div>
      `);
    }
  }
}

/**
 * @desc Attaches a click event to the log in link with an GA event
 */
export const clickEvent = () => {
  const loginLink = document.querySelector('.BV009 .BV009-message > p > a');
  if (loginLink) {
    loginLink.addEventListener('click', () => {
      events.send(settings.ID, 'BV009 Click', 'User clicked Log In');
    });
  }
};

export const closeMessage = () => {
  const closeLink = document.querySelector('.BV009 .BV009-message .BV009-close button');
  if (closeLink) {
    closeLink.addEventListener('click', () => {
      permClose();
      removeMessage();
      events.send(settings.ID, 'BV009 Click', 'User clicked Close');
    });
  }
};

const removeMessage = () => {
  const messageEl = document.querySelector('.BV009 .BV009-message');
  if (messageEl) {
    messageEl.parentNode.removeChild(messageEl);
  }
};

const permClose = () => {
  window.localStorage.setItem('BV009-hideMessage', 'true');
};

export { setup }; // eslint-disable-line
