import settings from '../settings';
import { pollerLite } from '../../../../../../lib/uc-lib';

export default () => {
  document.body.classList.add(`${settings.ID}_10Off`);
  const popUp = document.querySelector('#js-emailSignUpPopup');
  popUp.querySelector('.email-sign-up-popup__text').innerHTML = '<span>Get your 10% off voucher now</span>';
  popUp.querySelector('.email-sign-up-popup__body').textContent = 'Sign up to our newsletter below and we\'ll email you a voucher code';

  // hide the pop up on click
  const closePopUp = popUp.querySelector('#js-cancel');
  closePopUp.addEventListener('click', () => {
    document.body.classList.remove(`${settings.ID}_10Off`);
  });


  const continueShoppingButtons = popUp.querySelectorAll('.button.email-sign-up-popup__close-thank-you:first-of-type');
  for (let index = 0; index < continueShoppingButtons.length; index += 1) {
    const element = continueShoppingButtons[index];
    element.addEventListener('click', (e) => {
      e.stopPropagation();
      document.body.classList.remove(`${settings.ID}_10Off`);
    });
  }
};
