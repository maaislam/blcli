/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import HelpBox from './components/appointmentBox';
import settings from './settings';
import AppointmentButton from './components/appointmentButton';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();
  if (settings.VARIATION === '1') {
    const helpBox = new HelpBox();
  } else if (settings.VARIATION === '2') {
    const appointmentButton = new AppointmentButton();
  }

  document.querySelector('.buying-buttons__buy.js-buyingButton').addEventListener('click', () => {
    events.send(`HS008 v${settings.VARIATION}`, 'click', 'Buy Button', { sendOnce: true });
  });

  if (document.querySelector('.js-ifcBuyButton.buying-buttons-ifc__button')) {
    document.querySelector('.js-ifcBuyButton.buying-buttons-ifc__button').addEventListener('click', () => {
      events.send(`HS008 v${settings.VARIATION}`, 'click', 'Finance Button', { sendOnce: true });
    });

    document.querySelector('.ifc-calculator__add-to-bag').addEventListener('click', () => {
      events.send(`HS008 v${settings.VARIATION}`, 'click', 'Finance Add to Bag Button', { sendOnce: true });
    });
  }
};

export default activate;
