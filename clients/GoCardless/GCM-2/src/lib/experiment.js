/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import observeDOM from './helpers/observer';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  //

  // create an observer instance

  document.getElementById('gatsby-focus-wrapper').classList.add(`${ID}__gartsby-wrapper`);

  const possibleText = ['Sign up', "S'inscrire", 'Registrieren'];

  const getDemoText =
    location.pathname.indexOf('/fr-fr/') !== -1
      ? 'Demander une démo'
      : location.pathname.indexOf('/de-de/') !== -1
      ? 'Demoversion testen'
      : 'Get a demo';

  const mutationCallback = (mutation) => {
    //hide login Btn (:O)
    const signupBtn = document.querySelector('[data-module-name="signupLink"]');
    const loginBtn = document.querySelector('[data-module-name="loginLink"]');
    const signupText = signupBtn.firstElementChild.innerText;

    //for mobile

    const primaryMobileNav = document.querySelector('[aria-labelledby="mobilePrimaryNavigation"]');

    //if (possibleText.indexOf(signupText) !== -1) {//

    loginBtn.removeAttribute('style');
    loginBtn.style.display = 'none';

    signupBtn && (signupBtn.firstElementChild.innerText = getDemoText);

    const mobileCallback = () => {
      const primaryMobileNav = document.querySelector('[aria-labelledby="mobilePrimaryNavigation"]');
      const mobileLoginBtn = primaryMobileNav?.querySelector('a.css-2mnmbz');

      const mobileSignupBtn = primaryMobileNav?.querySelector('a.css-1bwxyks');

      mobileLoginBtn && (mobileLoginBtn.style.display = 'none');

      mobileSignupBtn && (mobileSignupBtn.firstElementChild.innerText = getDemoText);

      mobileLoginBtn?.closest('div').classList.add(`${ID}__mobile-hetdemo-btn`);
    };

    if (primaryMobileNav) {
      mobileCallback();

      primaryMobileNav.addEventListener('click', (e) => {
        setTimeout(() => {
          mobileCallback();
        }, 50);
      });
      //}
    }
    //signupBtn.firstElementChild.innerText = getDemoText;
  };
  observeDOM('body', { attributes: false, childList: true, characterData: false, subtree: false }, mutationCallback);
};
