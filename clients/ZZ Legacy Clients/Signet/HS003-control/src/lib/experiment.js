/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';
import settings from './settings';

const activate = () => {
  setup();

  const burgerMenu = document.querySelector('.u-container.u-container--icons .icon-set--hamburger');
  if (burgerMenu) {
    burgerMenu.addEventListener('click', () => {
      events.send(`${settings.ID} v${settings.VARIATION}`, 'click', 'burger menu');
    });
  }

  // Experiment code
};

export default activate;
