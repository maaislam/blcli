/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { popupHtml, popupControls } from './buildPopup';
import { events, setCookie, getCookie, pollerLite } from '../../../../../lib/utils';

export default () => {
  setup();

  pollerLite(['input#eighteen-agreement'], () => {
    const hasAge = getCookie('BD-age');
    if (hasAge) {
      const ageCheckbox = document.querySelector('input#eighteen-agreement');
      ageCheckbox.click();
    }
  });

  const popup = popupHtml();

  const ref = document.querySelector('#maincontent'); 

  const hasStorage = window.localStorage.getItem('BD-closedPopup');

  const hasLoggedIn = document.querySelector('.header__actions a[href="https://www.brewdog.com/uk/customer/account/logout/"]');

  if (hasStorage || hasLoggedIn) {
    events.send(settings.ID, 'BD004 Not Run');
    return;
  }

  const prevLink = document.referrer;
  if (prevLink.indexOf('brewdog.com') > -1 && window.location.href.indexOf('/shop/') > -1) {
    ref.insertAdjacentHTML('beforebegin', popup);
    events.send(settings.ID, 'BD004 Popup Added');
  
    popupControls.tabs();
    popupControls.run();
    
    const ageCheck = document.querySelector('#BD004-confirmAge');
    
    ageCheck ? ageCheck.addEventListener('click', () => {  
      setCookie('BD-age', true);
    }) : null;
  }

};
 