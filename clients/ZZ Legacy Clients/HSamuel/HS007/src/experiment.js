/**
 * HS007 - 10% pop up on Ernest Jones
 * @author Lewis Needham - User Conversion
 */
import { setup } from './services';
import NewsletterBar from './components/NewsletterBar/component';
import { cacheDom } from './../../../../lib/cache-dom';
import { eventFire } from './../../../../lib/utils';
import { pollerLite } from './../../../../lib/uc-lib';

const activate = () => {
  setup();

  /* COMPONENTS ------------------------------------------------ */
  const newsletterBar = NewsletterBar();

  /* DOM MANIPULATION ------------------------------------------ */
  /** Close original popup */
  const closePopup = () => {
    const lightbox = cacheDom.get('.email-sign-up-pop-up__light-box #js-emailSignUpPopup');
    const overlay = cacheDom.get('.blockOverlay');
    const closeBtn = lightbox.querySelector('.close');

    lightbox.style.display = 'none';
    overlay.style.display = 'none';

    eventFire(closeBtn, 'click');
  };

  pollerLite(['.email-sign-up-pop-up__light-box #js-emailSignUpPopup'], closePopup, {
    multiplier: 0,
    timeout: 40000,
  });

  newsletterBar.show();


  /* RENDER ----------------------------------------------------- */
};

export default activate;
