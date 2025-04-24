/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import settings from './settings';

const activate = () => {
  setup();

  const burgerMenu = document.querySelector('.u-container.u-container--icons .icon-set--hamburger');
  const logo = document.querySelector('.u-container.u-container--icons .site-logo');
  const search = document.querySelector('.u-container.u-container--icons .icon-set--syp-glass');

  if (burgerMenu) {
    burgerMenu.addEventListener('click', () => {
      events.send(`${settings.ID} v${settings.VARIATION}`, 'click', 'burger menu');
    });
  }

  pollerLite(['.u-container.u-container--icons .icon-set .top-bar__link.basket-icon'], () => {
    const basketIcon = document.querySelector('.u-container.u-container--icons .icon-set .top-bar__link.basket-icon');
    basketIcon.insertAdjacentElement('beforebegin', search);
    burgerMenu.insertAdjacentElement('afterend', logo);
  });

  const URL = window.location.pathname;
  if (URL.indexOf('/secure/showGiftOptions.sdo') > -1) {
    burgerMenu.insertAdjacentElement('afterend', logo);
    logo.insertAdjacentElement('afterend', search);
  }
};

export default activate;
