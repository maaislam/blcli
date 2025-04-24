import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import settings from './settings';

const login = {
  init(registeredEmail, device) {
    pollerLite(['.PJ059-buttons__wrapper #PJ059-signIn'], () => {
      const loginBtn = document.querySelector('.PJ059-buttons__wrapper #PJ059-signIn');
      loginBtn.addEventListener('click', () => {
        // GA Event - Sign In
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Sign In Button`, { sendOnce: true });
        sessionStorage.setItem('PJ059-data', `${registeredEmail}`);
        // Redirect to Basket Confirmation page triggering the lightbox
        if (device === 'desktop') {
          window.location.href = 'https://www.papajohns.co.uk' + window.location.pathname.replace('checkout.aspx', 'basket-confirmation.aspx') + `?pj059`;
        } else if (device === 'mobile') {
          window.location.href = 'https://www.papajohns.co.uk' + window.location.pathname.replace('checkout-mobile.aspx', 'basket-confirmation.aspx') + `?pj059`;
        }
      });
    });
  }
};

export default login;