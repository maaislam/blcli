/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { SD002 } from './SD002';
import { SD010 } from './SD010';
import settings from './shared';
import { events, pollerLite, getCookie } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {

  const { ID, VARIATION } = settings;
  if (VARIATION == 3) {
    events.send(ID, 'SD013 Control', 'SD013 Control is active');
    return false;
  } else {
    events.send(ID, `SD013 Variation ${VARIATION} Active`, `SD013 Variation ${VARIATION} is active`);
  }

  setup();

  // run SD002
  SD002();
  SD010(); 


  // Wait and Query all cart elements
  pollerLite(['.SD010-product'], () => {
    const cartItems = document.querySelectorAll('.SD010-product');
    const cartWrap = document.querySelector('.SD010-cart--bottom');
    if (cartItems.length > 20) {
      // Get difference
      const diff = cartItems.length - 20;
      
      // Get last items
      const overTwenty = Array.from(cartItems).slice(19);
      
      // Hide them
      overTwenty.map((item) => item ? item.classList.add('SD-hide') : null);

      // Add show more link
      cartWrap.insertAdjacentHTML('beforeend', `<a class="SD-showMore" href="/Cart">Show more products</a>`);
    }
  });


  // Get Passwd input, add toggle below
  const pswdEl = document.querySelector('input[type="password"]');
  if (pswdEl) {
    pswdEl.insertAdjacentHTML('afterend', `<button id="SD-toggle">View Password</button>`);

    // Add events
    const toggleBtn = document.querySelector('button#SD-toggle');
    toggleBtn ? toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (pswdEl.getAttribute('type') == 'password') {
        pswdEl.setAttribute('type', 'text');
        toggleBtn.textContent = 'Hide Password';
      } else {
        pswdEl.setAttribute('type', 'password');
        toggleBtn.textContent = 'View Password';
      }
    }) : null;
  }


  // Observer for error message
  pollerLite(['.FL034-error'], () => {
    const existingCustomerWrap = document.querySelector('.existingCustomer');
    const existingCustomerWrapInner = document.querySelector('.existingCustomer .innerBorder');
    if (existingCustomerWrap) {
      if (document.querySelector('.FL034-error')) {
        // Add Try again button
        existingCustomerWrapInner ? existingCustomerWrapInner.insertAdjacentHTML('afterend', `
          <button id="SD-try">
            Try again
          </button>
        `) : null;
  
        const tryBtn = document.querySelector('button#SD-try');
        tryBtn ? tryBtn.addEventListener('click', (e) => {
          e.preventDefault();
          existingCustomerWrapInner.classList.add('SD013-show');
          tryBtn.classList.add('SD013-hide');
          
        }) : null;

        const guestBtn = document.querySelector('#FL034-guest.FL015-button');
        const guestLoginBtn = document.querySelector('a[id*="Launch_btnGuestCustomer"]');
        if (guestBtn) {
          guestBtn.addEventListener('click', (e) => {
            e.preventDefault();
            guestLoginBtn ? guestLoginBtn.click() : null;
          });
        }
      }

    }
  });


  // V2
  if (VARIATION == 2) {
    pollerLite(['button[data-choice="no"]'], () => {
      const noButton = document.querySelector('button[data-choice="no"]');
      if (noButton) {
        
        noButton.textContent = '';
        noButton.insertAdjacentHTML('beforeend', `Not sure, continue as guest <sup>*</sup>`);

        const guestLoginBtn = document.querySelector('a[id*="Launch_btnGuestCustomer"]');
        // const guestEmailInput =

        noButton.addEventListener('click', (e) => {
          e.preventDefault();
          
          guestLoginBtn ? guestLoginBtn.click() : null;
        })
      }
    });
  }


  // Back click
  const backEl = document.querySelector('.SD002-back');
  if (backEl) {
    backEl.addEventListener('click', () => {
      const shownEl = document.querySelector('.SD013-show');
      shownEl ? shownEl.classList.remove('SD013-show') : null;
      const tryBtn = document.querySelector('button#SD-try');
      tryBtn ? tryBtn.classList.add('SD013-hide') : null;
    });
  }
    

};
