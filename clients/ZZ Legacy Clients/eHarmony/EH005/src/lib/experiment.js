/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from './../../../../../lib/cache-dom';
import { events } from './../../../../../lib/utils';
import { pollerLite } from './../../../../../lib/uc-lib';

const activate = () => {
  setup();

  // Experiment code
  const insertText = (elm) => {
    elm.insertAdjacentHTML('beforeend', `
      <div class="${settings.ID}-text">
        <span>On average, every 14 minutes</span>
        <span class="${settings.ID}-text-faith">someone finds love</span> 
        <span>on eharmony</span>
      </div>
    `);
  }

  events.send(settings.ID, settings.VARIATION, 'user-did-see-updated-bgs-and-text');
  
  const main = document.querySelector('#main');
  if(main) {
    insertText(main);
  }

  const mobileHero = document.querySelector('#main #mobile-hero');
  if(mobileHero) {
    insertText(mobileHero);
  }

  // Move logo into copy area
  if(window.innerWidth >= 900) {
    const logo = document.querySelector('.eh-logo img');
    const copyArea = document.querySelector('#copy-area');
    if(logo && copyArea) {
      copyArea.insertAdjacentElement('afterbegin', logo);
    }
  }

  // Does the FCW message exist?
  pollerLite(['#fcw-message'], () => {
    main.classList.add(`${settings.ID}-fcw-message-showing`);
  });

  // Event tracking
  const formSubmit = document.querySelector('.registrationForm__submit___311-o');
  if(formSubmit) {
    formSubmit.addEventListener('click', () => {
      events.send(settings.ID, settings.VARIATION, 'did-click-submit-button');
    });
  }
  const socialReg = document.querySelector('#social-registration');
  if(socialReg) {
    socialReg.addEventListener('click', () => {
      events.send(settings.ID, settings.VARIATION, 'did-interact-with-registration-box', {
        sendOnce: true
      });
    });
  }
};

export default activate;
