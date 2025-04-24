import { fullStory, events } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';
import settings from './settings';
import customEvents from './events';

/**
 * setup
 * @desc Performs standard experiment setup (FullStory tagging, GA event and body class)
 */
function setup() {
  fullStory(settings.ID, `Variation ${settings.VARIATION}`);
  events.send(settings.ID, 'Activated', `Variation ${settings.VARIATION}`);
  document.body.classList.add(settings.ID);
  if (settings.VARIATION > 1) {
    document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
  }
}

export { setup }; // eslint-disable-line

/**
 * @desc Adds an observer to the error message and runs a callback function.
 * @param {Function} cb
 */
export const observeMessage = (cb) => {
  pollerLite(['#dnn_ctr88149_Launch_registerLogin_divLoginErrorMessage', '.FL015-account-options'], () => {
    const errorMessage = document.getElementById('dnn_ctr88149_Launch_registerLogin_divLoginErrorMessage');
    const options = document.querySelector('.FL015-account-options');
    if (errorMessage && errorMessage.style.display === 'block') {
      if (options) {
        options.classList.add('FL034-hide');
        // events.send(settings.ID, 'Login', 'Incorrect password entered');
      }
      cb();
    }
  });
};

/**
 * @desc Adds the message to the checkout screen
 */
export const addMessage = () => {
  // Existing error message
  const ref = document.querySelector('#dnn_ctr88149_Launch_registerLogin_divLoginErrorMessage');
  let html = null;
  if (settings.VARIATION === '1') {
    html = `
    <div class="${settings.ID}-error">
      <p>We couldn't seem to find a match for your email and password. <a href="#" id="${settings.ID}-guest">You can always use 'guest checkout' at any point if you are in a hurry!</a></p>
    </div>
  `;
  } else if (settings.VARIATION === '2') {
    html = `
    <div class="${settings.ID}-error ${settings.ID}-${settings.VARIATION}-error">
      <p>We couldn't seem to find a match for your email and password. You can always use our 'guest checkout' at any point if you are in a hurry!</p>
      <span class="ImgButWrap"><button class="${settings.ID}-guest-cta dnnPrimaryAction">Continue as a guest</button>
    </div>
    `;
  }
  if (ref) {
    ref.insertAdjacentHTML('afterend', html);
    // events.send(settings.ID, 'Saw', 'Incorrect password screen');
  }
};

/**
 * @desc Store the email address in the local storage
 */
export const storeEmail = () => {
  const emailInput = document.querySelector('.existingCustomer .loginContainer .field.SignLogIn2 input#dnn_ctr88149_Launch_registerLogin_txtExistingCustomerEmailAddress');
  if (emailInput) {
    const emailAddress = emailInput.value;
    if (emailAddress) {
      localStorage.setItem('FL034-adr', emailAddress);
    }
  }
};

/**
 * @desc Add the stored email to the guest input and delete local storage
 */
export const addEmail = () => {
  const guestEmailInput = document.querySelector('.newCustomer .innerBorder .loginContainer input#txtGuestCustomerEmailAddress');
  const storedEmail = localStorage.getItem('FL034-adr');
  if (guestEmailInput && storedEmail) {
    // guestEmailInput[i].value = '';
    guestEmailInput.value = storedEmail;
  }
  // localStorage.removeItem('FL034-adr');
};

/**
 * @desc Scrolls to the guest login section
 * @param {Function} cb
 */
export const scrollToGuest = (cb) => {
  function scrollIt(destination, duration = 200, easing = 'linear', callback) {

    const easings = {
      linear(t) {
        return t;
      },
      easeInQuad(t) {
        return t * t;
      },
      easeOutQuad(t) {
        return t * (2 - t);
      },
      easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      easeInCubic(t) {
        return t * t * t;
      },
      easeOutCubic(t) {
        return (--t) * t * t + 1;
      },
      easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      },
      easeInQuart(t) {
        return t * t * t * t;
      },
      easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
      },
      easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
      },
      easeInQuint(t) {
        return t * t * t * t * t;
      },
      easeOutQuint(t) {
        return 1 + (--t) * t * t * t * t;
      },
      easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
      }
    };
  
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  
    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
  
    if ('requestAnimationFrame' in window === false) {
      window.scroll(0, destinationOffsetToScroll);
      if (callback) {
        callback();
      }
      return;
    }
  
    function scroll() {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, ((now - startTime) / duration));
      const timeFunction = easings[easing](time);
      window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));
  
      if (window.pageYOffset === destinationOffsetToScroll) {
        if (callback) {
          callback();
        }
        return;
      }
  
      requestAnimationFrame(scroll);
    }
  
    scroll();
  }

  pollerLite([`.${settings.ID}-error a#${settings.ID}-guest`], () => {
    const messageLink = document.querySelector(`.${settings.ID}-error a#${settings.ID}-guest`);
    const guestLogin = document.querySelector('.newCustomer.col-xs-12.col-sm-6');
    if (guestLogin && messageLink) {
      messageLink.addEventListener('click', () => {
        scrollIt(guestLogin, 300, 'linear', cb);
      });
    }
  });
};
