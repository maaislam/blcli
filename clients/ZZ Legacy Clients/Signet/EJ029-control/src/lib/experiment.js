/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import settings from './settings';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();

  // events
  const burgerMenu = document.querySelector('.header__menu .menu-btn');
  burgerMenu.addEventListener('click', () => {
    events.send('EJ029 control', 'click', 'open burger menu');
  });

  const subNavLink = document.querySelectorAll('.main-nav__item .main-nav__link');
  for (let index = 0; index < subNavLink.length; index += 1) {
    const element = subNavLink[index];
    element.addEventListener('click', () => {
      events.send(`EJ029 control`, 'sub nav link click', { sendOnce: true });
    });
  }
};

export default activate;
