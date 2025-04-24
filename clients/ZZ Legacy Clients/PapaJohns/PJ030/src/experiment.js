import { fullStory, events } from '../../../../lib/utils';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ030',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    const {
      settings,
      services,
      components,
    } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    /* eslint-disable */
    window.prm.add_endRequest(function (sender, error) {
      const target = sender._postBackSettings.asyncTarget;
      try {
        if (target === 'ctl00$cphBody$lbProceedMobile' || target === 'ctl00$_objHeader$lbSignInMobile' || target === 'ctl00$_objHeader$lbReturnToSignInMobile') {
          if (!document.querySelector('.PJ030-radio')) {
            components.checkoutOptions();
            components.addEyeIcon();
            components.showPassword();
            components.loginAccount();
          }
        }
        // check the validation on sign in
        if (target === 'ctl00$_objHeader$lbSignInMobile') {
          const passwordField = document.querySelector('#ctl00__objHeader_txtPasswordMobile');
          if (!sessionStorage.getItem('PJ030-validation') && document.querySelector('#ctl00__objHeader_pLoginErrorMobile')) {
            sessionStorage.setItem('PJ030-validation', 1);
  
            const loginRadio = document.querySelector('.PJ030-login');
            loginRadio.click();
  
            components.changeValidation();
            passwordField.classList.add('PJ030-error_field');
            events.send('PJ030', 'error validation', 'first validation message shown');
          } else if (sessionStorage.getItem('PJ030-validation')) {
            passwordField.classList.add('PJ030-error_field');
  
            const loginRadio = document.querySelector('.PJ030-login');
            loginRadio.click();
            components.secondError();
            events.send('PJ030', 'error validation', 'second validation message shown');
          } else {
            passwordField.classList.remove('PJ030-error_field');
          }
        }
      } catch (e) {
      }
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc Change options to radio buttons
     */
    checkoutOptions: function checkoutOptions() {
      const radioButtons = document.createElement('div');
      radioButtons.classList.add('PJ030-radio_buttons');
      radioButtons.innerHTML = `<div class="PJ030-radio PJ030-guest"><input name="checkout_type" type="radio" class="PJ30-guest"><span>Continue as guest</span></input></div>
      <div class="PJ030-radio PJ030-login"><input name="checkout_type" type="radio" class="PJ30-login"><span>I'll login to my account</span></input></div>`;

      const emailField = document.querySelector('#ctl00__objHeader_txtEmail1Mobile');
      emailField.insertAdjacentElement('afterend', radioButtons);

      // move the text below guest checkout
      const bottomText = document.querySelector('#ctl00__objHeader_divContinueAsGuest p');
      const bottomInfo = document.querySelector('#ctl00__objHeader_divContinueAsGuest p:last-child');
      bottomInfo.insertAdjacentElement('beforebegin', bottomText);

      const guestRadio = document.querySelector('.PJ030-guest');
      guestRadio.querySelector('input').checked = true;
    },
    /**
     * @desc on click of login to account
     */
    loginAccount: function loginAccount() {
      const loginWrap = document.querySelector('#ctl00__objHeader_divProfileSignInMobile');
      const guestWrap = document.querySelector('#ctl00__objHeader_divContinueAsGuest');
      const eyeIcon = document.querySelector('.PJ030-showPwd');
      const radioButtons = document.querySelectorAll('.PJ030-radio');
      for (let index = 0; index < radioButtons.length; index += 1) {
        const element = radioButtons[index];
        element.addEventListener('click', () => {
          if (element.classList.contains('PJ030-login')) {
            element.querySelector('input').checked = true;
            loginWrap.classList.add('PJ030-sign_in-show');
            guestWrap.classList.add('PJ030-guest-hide');
            eyeIcon.classList.add('PJ030-showPassword');
          } else {
            element.querySelector('input').checked = true;
            loginWrap.classList.remove('PJ030-sign_in-show');
            guestWrap.classList.remove('PJ030-guest-hide');
            eyeIcon.classList.remove('PJ030-showPassword');
          }
        });
      }
    },
    /**
     * @desc add the eye icon to the password field
     */
    addEyeIcon: function addEyeIcon() {
      const inputContainer = document.querySelector('#ctl00__objHeader_txtPasswordMobile');
      const eyeIcon = '<span class="PJ030-showPwd"></span>';
      inputContainer.insertAdjacentHTML('beforebegin', eyeIcon);
    },
    /**
     * @desc Shows/Hides Password
     */
    showPassword: function showPassword() {
      const eyeIcon = document.querySelector('.PJ030-showPwd');
      const inputContainer = document.querySelector('#ctl00__objHeader_txtPasswordMobile');
      eyeIcon.addEventListener('click', () => {
        if (inputContainer.type === 'password') {
          inputContainer.type = 'text';
        } else {
          inputContainer.type = 'password';
        }
      });
    },
    /**
     * @desc change password validation text
     */
    changeValidation: function changeValidation() {
      const validationMessage = document.querySelector('#ctl00__objHeader_pLoginErrorMobile');
      validationMessage.innerHTML = '<span class="PJ030-error"></span><p>The email/password you entered were not found.<br></br>Remember your password will have contained 1 x Uppercase, 1 x number and a minimum of 8 characters</p>';
    },
    /**
     * @desc if error message is there twice
     */
    secondError: function secondError() {
      const secondValidationMessage = document.querySelector('#ctl00__objHeader_pLoginErrorMobile');
      secondValidationMessage.innerHTML = '<span class="PJ030-error"></span><p>The email/password you entered were not found.<br></br> Do you need help? If you\'re certain you have an account with us, <a>reset your password here.</a> If not, continue as a guest and use a different and unique email address. Please note if you have an account with us and choose to continue with a different email address, you will lose any Papa Rewards points you may have accrued </p>';
      secondValidationMessage.querySelector('a').addEventListener('click', () => {
        /* eslint-disable */
        javascript:__doPostBack('ctl00$_objHeader$lbForgottenPassMobile','');
        /* eslint-enable */
      });
    },
  },
};

export default Experiment;

