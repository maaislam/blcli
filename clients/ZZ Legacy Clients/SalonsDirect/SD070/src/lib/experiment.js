/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  const getContent = () => {
    let content;
    // if new user on desktop
    if(window.innerWidth > 767) {
      if(document.querySelector('.site-top__links .authorization-link') && document.querySelector('.site-top__links .authorization-link').innerText.indexOf('Sign In') > -1) {
        content = `<a href="https://www.salonsdirect.com/customer/account/login/ "><p><span>Sign up</span> to our emails to get <b>10% off</b> your next order*</p></a><div class="${ID}-close">x</div>`;
      } else {
        content = `<a href="https://www.salonsdirect.com/customer/account/login/"><p>Hey! You’re missing out on exclusive offers, sign up <span>here</span> to our emails to receive 10% off your next order!</a><div class="${ID}-close">x</div>`;
      }
    } else {
      if(document.querySelector('.site-controls__button--account') && document.querySelector('.site-controls__button--account').textContent.indexOf('Sign In') > -1) {
        content = `<a href="https://www.salonsdirect.com/marketing/customer/manage/"><p><span>Sign up</span> to our emails to get <b>10% off</b> your next order*</p></a><div class="${ID}-close">x</div>`;
      } else {
        content = `<a href="https://www.salonsdirect.com/marketing/customer/manage/"><p>Hey! You’re missing out on exclusive offers, sign up <span>here</span> to our emails to receive 10% off your next order!</a><div class="${ID}-close">x</div>`;
      }
    }

    return content;
   
  }

  if(!localStorage.getItem(`${ID}-bannerShow`)) {
    const emailbanner = document.createElement('div');
    emailbanner.classList.add(`${ID}-emailbanner`);
    emailbanner.innerHTML = `<div class="${ID}-container">${getContent()}</div>`;

    document.querySelector('.site-top').insertAdjacentElement('afterbegin', emailbanner);

    emailbanner.querySelector('a').addEventListener('click', () => {
      if(document.querySelector('.site-top__links .authorization-link') && document.querySelector('.site-top__links .authorization-link').innerText.indexOf('Sign In') > -1) {
        events.send(`${ID} variation: ${VARIATION}`, 'click', 'New user: sign up banner');
      } else {
        events.send(`${ID} variation: ${VARIATION}`, 'click', 'Logged In user: sign up banner');
      }
    });
    emailbanner.querySelector('p > a').addEventListener('click', () => {
      if(document.querySelector('.site-top__links .authorization-link') && document.querySelector('.site-top__links .authorization-link').innerText.indexOf('Sign In') > -1) {
        events.send(`${ID} variation: ${VARIATION}`, 'click', 'New user: sign up banner');
      } else {
        events.send(`${ID} variation: ${VARIATION}`, 'click', 'Logged In user: sign up banner');
      }
    });

    emailbanner.querySelector(`.${ID}-close`).addEventListener('click', () => {
      emailbanner.remove();
      localStorage.setItem(`${ID}-bannerShow`, true);
      events.send(`${ID} variation: ${VARIATION}`, 'click', 'closed sign up banner');
    });
  }
};
