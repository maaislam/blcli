import { fullStory } from '../../../../../lib/utils';
import shared from './shared';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

export const forgottenPwdEvent = () => {
  const { ID, VARIATION } = shared;

  const forgottenPwdBtn = document.querySelector('#ctl00__objHeader_lbForgottenPassMobile');
  forgottenPwdBtn.addEventListener('click', (e) => {
    // e.currentTarget.style.background = 'red';
    setTimeout(() => {
      // -- Change title
      const lightboxTitle = document.querySelector('#fancyProfileSignIn.fancyContainer.profile-cont-sign-in h2');
      // lightboxTitle.innerHTML = 'Forgotten Password <a href="#" class="close"><i class="fa fa-times" aria-hidden="true"></i></a>';
      lightboxTitle.childNodes[0].nodeValue = 'Forgotten Password';

      const firstParagraph = document.querySelector('#ctl00__objHeader_upSignInMobile .intBasket p');
      firstParagraph.setAttribute('style', 'display: none !important;');
      // -- Make CTA green
      const continueGuestBtn = document.querySelectorAll('.buttonsContainer.mobileSigninRegPopup')[0];
      continueGuestBtn.classList.add(`${shared.ID}-greenBtn`);
      // -- Make CTA grey
      // const continueBtn = document.querySelectorAll('.buttonsContainer.mobileSigninRegPopup')[1];
      const continueBtn = document.querySelector('#ctl00__objHeader_lbForgottenPasswordMobile.actionButton.signInFancyButton');
      continueBtn.classList.add(`${shared.ID}-greyBtn`);

      // -- Change Forgotten Pwd label and move further down
      const forgottenPwdLabel = document.querySelector('#ctl00__objHeader_divProfileForgettenPasswordMobile p');
      if (forgottenPwdLabel) {
        forgottenPwdLabel.innerText = "Or, reset your password here";
        forgottenPwdLabel.setAttribute('style', 'margin-top: 20px !important;');
      }
      
      // -- Return link
      const returnLink = document.querySelector('#ctl00__objHeader_lbReturnToSignInMobile.greenLink');
      returnLink.addEventListener('click', (e) => {
        // lightboxTitle.innerHTML = 'Secure checkout <a href="#" class="close"><i class="fa fa-times" aria-hidden="true"></i></a>';
        lightboxTitle.childNodes[0].nodeValue = 'Secure checkout';
      });
      
    }, 1800);
  });

};
