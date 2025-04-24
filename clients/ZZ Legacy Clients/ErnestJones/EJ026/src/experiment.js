
import { setup } from './services';
import smallIcon from './components/bottomIcon';
import settings from './settings';
import { events } from '../../../../lib/utils';
/* eslint-disable */
const activate = () => {
  setup();

  const closeLightbox = document.querySelector('#js-cancel');
  const overlay = document.querySelector('.page-overlay');
  const emailPopUp = document.querySelector('.email-sign-up-overlay');
  const emailInputBox = document.querySelector('#js-emailSignUpEmail');

  // show the icon function
  const triggerIcon = () => {
    const bottomIcon = new smallIcon(settings.ID, {
      content: `<span>10% Off</span>
      <p>Just for you</p>`,
    });
    events.send(settings.ID, 'View', `${settings.VARIATION} icon (bottom right hand corner) shown`);
  }

  // don't show the original pop up, just show the icon
  if(settings.VARIATION === '1') {
    emailPopUp.classList.remove('page-overlay--is-active');
    triggerIcon();
  }

  // only show the icon on click
  if(settings.VARIATION === '2'){
    closeLightbox.addEventListener('click', () => {
      if(emailInputBox.value === ''){
        triggerIcon();
      }
    });
  }
  // remove overlay 
  emailPopUp.querySelector('.email-sign-up-popup__submit.button').addEventListener('click', () => {
    if(emailInputBox.value !== ''){
      events.send(settings.ID, 'Clicked', `${settings.VARIATION} submit sign up form to get voucher`);
    }
  });
};

export default activate;
