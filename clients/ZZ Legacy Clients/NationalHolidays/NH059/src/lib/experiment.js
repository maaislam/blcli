/**
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from './../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

/**
 * Generate sign up url
 */
const generateSignupPageUrl = (email) => {
  return location.protocol + '//' + location.hostname + '/email-signup?email=' + email;
};

/**
 * Add promoted sign up to footer
 */
const createFooter = () => {
  if(window.location.pathname == '/offers') {
    const footerNewsletter = document.querySelector('section.newsletter');
  if(footerNewsletter) {
      const footerNewsletterSignup = footerNewsletter.querySelector('.sign-up');

      // if(footerNewsletter) {
      //   if(footerNewsletterSignup) {
      //     footerNewsletterSignup.classList.add(`${settings.ID}-hide`);
      //   }
      // }
    }
    return false;
  }

  const footerNewsletter = document.querySelector('section.newsletter');
  if(footerNewsletter) {
    const footerNewsletterSignup = footerNewsletter.querySelector('.sign-up');

    if(footerNewsletter) {
      if(footerNewsletterSignup) {
        footerNewsletterSignup.classList.add(`${settings.ID}-hide`);
      }

      footerNewsletter.insertAdjacentHTML('beforebegin', `
        <section class="${settings.ID}-footer-signup">
          <div class="container">
            <div class="${settings.ID}-container-inner">
              <h2>Don't miss out</h2>
              <ul>
                <li><span>Be the first to find out about new shows, gigs and special events, as well as short breaks and holidays for all the family</span></li>
                <li><span>Get access to exclusive offers and deals</span></li>
                <li><span>Enter our competitions to win amazing holidays and prizes</span></li>
              </ul>
              <div class="${settings.ID}-form-wrap">
                <h3 class=${settings.ID}-darkblue">Get our latest offers by email</h3>
                <input type="text" class="${settings.ID}-form-input" placeholder="exclusivedeals@nationalholidays.com">
                <button class="${settings.ID}-form-btn orange-btn">Yes!</button>
                <a class="${settings.ID}-privacy" href="/privacy">*Privacy Policy</a>
              </div>
            </div>
          </div>
        </section>
      `);

      document.querySelector(`a.${settings.ID}-privacy`).addEventListener('click', () => {
        window.location.href = "/privacy";
      });

      events.send(`${settings.ID}`, 'did-show-footer-form', '', {
        sendOnce: true  
      });

      const form = document.querySelector(`.${settings.ID}-footer-signup .${settings.ID}-form-wrap`);
      if(form) {
        bindButton(form, 'footer-form');
      }
    }
  }
};

/**
 * Build offers form
 */
const createOffersForm = () => {
  const blueSection = document.querySelector('section.blue');
  if(blueSection) {
    blueSection.insertAdjacentHTML('afterend', `
      <section class="${settings.ID}-offers-signup">
        <div class="container">
          <div class="${settings.ID}-container-inner">
            <div class="${settings.ID}-form-wrap">
              <h3 class=${settings.ID}-orange">Get our latest offers by email</h3>
              <input type="text" class="${settings.ID}-form-input" placeholder="exclusivedeals@nationalholidays.com">
              <button class="${settings.ID}-form-btn orange-btn">Yes!</button>
              <a class="${settings.ID}-privacy" href="/privacy">*Privacy Policy</a>
            </div>
          </div>
        </div>
      </section>
    `);

    document.querySelector(`a.${settings.ID}-privacy`).addEventListener('click', () => {
      window.location.href = "/privacy";
    });
    
    events.send(`${settings.ID}`, 'did-show-offers-form', '', {
      sendOnce: true  
    });

    const form = document.querySelector(`.${settings.ID}-offers-signup .${settings.ID}-form-wrap`);
    if(form) {
      bindButton(form, 'offers-form');
    }
  }
};

/**
 * Bind event handlers to form button
 */
const bindButton = (f, identifier) => {
  f.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.classList.contains(`${settings.ID}-form-btn`)) {
      const input = f.querySelector(`.${settings.ID}-form-input`);
      if(input) {
        const emailValue = input.value;
        if(emailValue.trim().match(/.+@.+\..+/)) {
          events.send(`${settings.ID}`, 'submitted-form', identifier, {
            sendOnce: true  
          });
          const target = generateSignupPageUrl(emailValue);
          if(target) {
            window.location = target;
          }
        } else {
          input.classList.add(`${settings.ID}-invalid`);
        }
      }
    }
  });
};

/**
 * Activate
 */
const activate = () => {
  setup();

  pollerLite([
    'section.newsletter .sign-up',
  ], createFooter);

  if(window.location.pathname.match(/\/offers/)) {
    pollerLite([
      () => {
        const blueSection = document.querySelector('.blue');
        return blueSection && blueSection.id != 'noCookieDepSelect';
      },
    ], createOffersForm);
  }
};

export default activate;
