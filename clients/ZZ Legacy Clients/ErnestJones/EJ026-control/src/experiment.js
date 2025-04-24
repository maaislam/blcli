import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/* eslint-disable */
pollerLite([
  '#js-emailSignUpEmail',
  '.email-sign-up-overlay',
], () => {
  events.send('EJ026', 'Control', 'EJ026 activated');

  const emailPopUp = document.querySelector('.email-sign-up-overlay');
  const emailInputBox = document.querySelector('#js-emailSignUpEmail');
  emailPopUp.querySelector('.email-sign-up-popup__submit.button').addEventListener('click', () => {
    if(emailInputBox.value !== ''){
      events.send(settings.ID, 'Clicked', `Control - submit sign up form to get voucher`);
    }
  });
});