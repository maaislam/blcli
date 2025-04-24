/**
 * FL045 - Move cookie message
 * @author User Conversion
 */
import { setup } from './services';
import { events, getCookie } from './../../../../../lib/utils';
import settings from './settings';

events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();

  const isHidden = (el) => {
    const style = window.getComputedStyle(el);
    return (style.display === 'none');
  };

  // Experiment code
  const atbButton = document.querySelectorAll('.FlanProdDet .addToBasketContainer .ImgButWrap a');
  const cookieMessage = document.querySelector('#divCookieAcceptance');

  if (settings.VARIATION === '2') {
    if (atbButton.length) {
      for (let i = 0; atbButton.length > i; i += 1) {
        atbButton[i].addEventListener('click', () => {
          events.send(settings.ID, 'Control', 'User clicked on add to bag');
        });
      }
    }
    if (cookieMessage) {
      if (!isHidden(cookieMessage)) {
        events.send(settings.ID, 'Control', 'User saw the cookie message');
      }
    }
    return false;
  }

  if (atbButton.length) {
    for (let i = 0; atbButton.length > i; i += 1) {
      atbButton[i].addEventListener('click', () => {
        events.send(settings.ID, 'Click', 'User clicked add to bag');
      });
    }
  }
  if (cookieMessage) {
    if (!isHidden(cookieMessage)) {
      events.send(settings.ID, 'View', 'User saw the cookie message');
    }
  }
};

export default activate;
