/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { exitIntentPlugin } from './exit-intent';
import { events, setCookie } from '../../../../../lib/utils';

let site = window.location.hostname.match(/hsamuel/) ? 'hsamuel' : 'ernestjones';

/**
 * Mobile Popup markup
 */
const getMobilePopupHtml = () => {
  const html = `
    <div class="${shared.ID}-popup">
      <span class="${shared.ID}-popup__close">×</span>
      <div class="${shared.ID}-popup__titlewrap">
        <h2>Save <span>10%</span> on this product</h2>
      </div>
      <div class="${shared.ID}-popup__content">

        <div class="${shared.ID}-popup__form ">
          <p class="${shared.ID}-popup__form-overview">
            Sign up to our newsletter and we'll give you a code to
            instantly use on site to save 10%
          </p>
          <form>
            <input type="email" required class="${shared.ID}-popup__form-input"
              placeholder="Enter your email "
              name="${shared.ID}-popup__form-input">
            <button class="${shared.ID}-popup__form-submit button" type="submit">Sign up</button>
          </form>
          <p class="${shared.ID}-popup__form-terms">
            I accept the
            <a target="_blank" href="/privacy-policy/">privacy policy</a>
            &amp;
            <a target="_blank" href="/terms/">terms and conditions</a>
          </p>
        </div>

        <div class="${shared.ID}-popup__success">
          <p class="${shared.ID}-popup__success-thanks">
            Thank you for signing up to our newsletter
          </p>
          <p class="${shared.ID}-popup__success-code">
            <span class="${shared.ID}-popup__success-code-txt">Your 10% off voucher code is:</span>
            <input class="${shared.ID}-popup__success-code-code"
              autocomplete="off" 
              autocorrect="off" 
              autocapitalize="off" 
              spellcheck="false"
              type="text"
              value="${shared.VOUCHER_CODES[site]}">
            <span class="${shared.ID}-popup__success-copy">Copy Code</span>
          </p>
        </div>
      </div>
    </div>
  `;

  return html;
};

/**
 * Desktop Popup markup
 */
const getDesktopPopupHtml = () => {
  const html = `
    <div class="${shared.ID}-popup-bg"></div>
    <div class="${shared.ID}-popup ${shared.ID}-popup--modal">
      <span class="${shared.ID}-popup__close">×</span>
      <div class="${shared.ID}-popup__contentwrap">
        <div class="${shared.ID}-popup__left">
          <span>10%</span>
          <span>off</span>
        </div>
        <div class="${shared.ID}-popup__content">
          <div class="${shared.ID}-popup__form ">
            <div class="${shared.ID}-popup__titlewrap">
              <h2>Before you go...</h2>
            </div>

            <p class="${shared.ID}-popup__form-statement">
              Save 10% off your next purchase*
            </p>
            <p class="${shared.ID}-popup__form-overview">
              Sign up to our newsletter and we'll give you a code to
              use on site to save 10% now
            </p>
            <form>
              <input type="email" required class="${shared.ID}-popup__form-input"
                placeholder="Enter your email "
                name="${shared.ID}-popup__form-input">
              <button class="${shared.ID}-popup__form-submit button" type="submit">Sign up</button>
            </form>
            <p class="${shared.ID}-popup__form-terms">
              *I accept the
              <a target="_blank" href="/privacy-policy/">privacy policy</a>
              &amp;
              <a target="_blank" href="/terms/">terms and conditions</a>
            </p>
          </div>

          <div class="${shared.ID}-popup__success">
            <p class="${shared.ID}-popup__success-thanks">
              Thank you for signing up to our newsletter
            </p>
            <p class="${shared.ID}-popup__success-code">
              <span class="${shared.ID}-popup__success-code-txt">Your 10% off voucher code is:</span>
              <input class="${shared.ID}-popup__success-code-code"
                autocomplete="off" 
                autocorrect="off" 
                autocapitalize="off" 
                spellcheck="false"
                type="text"
                value="${shared.VOUCHER_CODES[site]}">
              <span class="${shared.ID}-popup__success-copy">Copy Code</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  return html;
};

/**
 * Submit form
 */
export const submitForm = (emailAddress) => {
  const endpoint = shared.SUBMIT_API_URL;

  return new Promise((res, rej) => {
    const csrf = document.querySelector('meta[name=_csrf]');
    if(!csrf) {
      return rej();
    }

    var request = new XMLHttpRequest();
    request.open('POST', endpoint, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.setRequestHeader('X-CSRF-TOKEN', csrf.content);
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        res();
      } else {
        rej();
      }
    }
    request.send('email=' + emailAddress);
  });
};

/**
 * Entry point for experiment
 */
export default () => {
  document.body.classList.add(site);

  setup();

  if(localStorage.getItem(`${shared.ID}-closed`)) {
    return;
  }

  const basketChecker = () => {
    return new Promise((res, rej) => {
      var request = new XMLHttpRequest();
      request.open('GET', '/webstore/showbasket.sdo', true);

      request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          const html = this.response;
          const div = document.createElement('div');
          div.innerHTML = html;

          let descs = '';
          [].forEach.call(div.querySelectorAll('.product-summary__description'), (item) => {
            descs += item.textContent.trim();
          });

          let result = true;
          shared.EXCLUSIONS.forEach((e) => {
            if(descs.match(e)) {
              result = false;
            }
          });

          if(result) {
            res();
          }
        }
      }

      request.send();
    });
  };

  /**
   * After markup rendered run exec
   */
  const exec = () => {
    // ----------------------------------------
    // Handle copy-paste button clicked
    // ----------------------------------------
    const copyBtn = document.querySelector(`.${shared.ID}-popup__success-copy`);
    if(copyBtn) {
      copyBtn.addEventListener('click', () => {
        const input = document.querySelector(`.${shared.ID}-popup__success-code-code`);
        if(input) {
          input.select();
          input.setSelectionRange(0, 99999); // For mobile devices

          document.execCommand("copy");

          input.classList.add(`${shared.ID}-rubberBand`);
        }
      });
    }
    
    // ----------------------------------------
    // Close clicked
    // ----------------------------------------
    const close = document.querySelector(`.${shared.ID}-popup__close`);
    const popup = document.querySelector(`.${shared.ID}-popup`);
    const popupBg = document.querySelector(`.${shared.ID}-popup-bg`);

    const closeIt = () => {
      popup.parentNode.removeChild(popup);

      if(popupBg) {
        popupBg.parentNode.removeChild(popupBg);
      }

      localStorage.setItem(`${shared.ID}-closed`, 1);
    };

    if(close) {
      close.addEventListener('click', closeIt);
    }
    if(popupBg) {
      popupBg.addEventListener('click', closeIt);
    }
    
    // ----------------------------------------
    // Form submit
    // ----------------------------------------
    const form = document.querySelector(`.${shared.ID}-popup__form form`);
    const formInput = document.querySelector(`.${shared.ID}-popup__form-input`);
    const nextStep = document.querySelector(`.${shared.ID}-popup__success`);
    const formContainer = form.parentNode;

    if(form && formInput && formContainer && nextStep) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        formContainer.classList.add(`${shared.ID}-popup__form--active`);

        submitForm(formInput.value).then(() => {

          localStorage.setItem(`${shared.ID}-closed`, 1);

          formContainer.classList.remove(`${shared.ID}-popup__form--active`);
          formContainer.classList.add(`${shared.ID}-popup__form--hide`);
          nextStep.classList.add(`${shared.ID}-popup__success--show`); 
        });
      });
    }
  };
  
  // Run
  basketChecker().then(() => {
    if(window.innerWidth <= shared.BREAKPOINT) {
      // After a delay of 8 seconds, show popup
      setTimeout(() => {
        // ----------------------------------------
        // Mobile Popup
        // ----------------------------------------
        if(shared.VARIATION == 'control') {
          events.send(`${shared.ID} control mobile popup`, 'fired', `${shared.ID} fired`);
        } else {
          events.send(`${shared.ID} variation mobile popup`, 'fired', `${shared.ID} fired`);

          document.body.insertAdjacentHTML('beforeend', getMobilePopupHtml());
        }

        localStorage.setItem(`${shared.ID}-closed`, 1);

        exec();
      }, 8000);
    } else {
      // ----------------------------------------
      // Desktop Popup
      // ----------------------------------------
      const exitIntent = exitIntentPlugin();
      exitIntent.ouiPlugin();
      exitIntent.exitTrigger({
          cookieName: `${shared.ID}-exitIntent`, 
          callback: function() {
            if (!shared.lightboxShown) {
              shared.lightboxShown = true;

              setCookie(`${shared.ID}-exitIntent`, 'true', null);

              if(shared.VARIATION == 'control') {
                events.send(`${shared.ID} control desktop modal`, 'fired', `${shared.ID} fired`);
              } else {
                events.send(`${shared.ID} variation desktop modal`, 'fired', `${shared.ID} fired`);
                document.body.insertAdjacentHTML('beforeend', getDesktopPopupHtml());

                exec();
              }
            }
          } 
      });
    }
  });
};
