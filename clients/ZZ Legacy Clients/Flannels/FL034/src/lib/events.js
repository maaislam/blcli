import { events } from '../../../../../lib/utils';
import settings from './settings';

events.analyticsReference = '_gaUAT';

export default {
  observer: () => {
    events.send(settings.ID, 'Login', 'Incorrect password entered');
    events.send(settings.ID, 'Saw', 'Incorrect password screen');
  },
  guestContinue: () => {
    // V2
    const guestBtn = document.querySelector('.FL034-error .FL034-guest-cta.dnnPrimaryAction');
    if (guestBtn) {
      guestBtn.addEventListener('click', () => {
        events.send(settings.ID, 'Clicked', 'Continue securely');
      });
    }
  },
  secureContinue: () => {
    const secureBtn = document.querySelector('.NewCustWrap a#dnn_ctr88149_Launch_btnGuestCustomer');
    if (secureBtn) {
      secureBtn.addEventListener('click', () => {
        events.send(settings.ID, 'Clicked', 'Continue securely');
      });
    }
  },
};
