/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { events } from '../../../../../lib/utils';
import settings from '../../../EJ003/src/lib/settings';

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
