import { fullStory, events } from '../../../../../../lib/utils';
import { pollerLite } from '../../../../../../lib/uc-lib';

/**
 * PJ024 - Password Validation
 */
const PJ024 = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ024',
    VARIATION: '1',
  },

  init(exports) {
    // Setup
    const { settings, services } = PJ024;
    const {
      prm,
      isOnGuestFormPage,
      isDesktopCheckout,
      isMobileCheckout,
    } = exports;
    // services.tracking();
    document.body.classList.add(settings.ID);

    /**
     * Run main PJ024 logic
     */
    const run = (reRunTest, errorShown, errorMsgText) => {
      // console.log('PJ024 running------');
      const passwordInputContainer = document.querySelector('.checkoutRegItem');
      if (!document.querySelector('.PJ024-pwdContainer')) {
        const passwordRequirements = `<div class='PJ024-pwdContainer'>
        <div class='PJ024-pwdRequirements'><strong>Password requirements</strong>
        <ul class='PJ024-pwdList PJ058-inactive'>
        <div class='PJ024-requirement'>
          <li class='PJ024-pwd__item PJ058-inactive' id='pwd-characters'>At least 8 characters</li>
          <ul id='character-validation'>
          <li class='block block-1'></li>
          <li class='block block-2'></li>
          <li class='block block-3'></li>
          <li class='block block-4'></li>
          <li class='block block-5'></li>
          <li class='block block-6'></li>
          <li class='block block-7'></li>
          <li class='block block-8'></li></ul>
        </div>
        <div class='PJ024-requirement'>
          <li class='PJ024-pwd__item PJ058-inactive' id='pwd-uppercase'>At least 1 Uppercase</li>
          <span class='validation' id='uppercase-validation'></span>
        </div>
        <div class='PJ024-requirement'>
          <li class='PJ024-pwd__item PJ058-inactive' id='pwd-number'>At least 1 Number</li>
          <span class='validation' id='number-validation'></span>
        </div>
        </ul>
        </div>
        </div>
        <span class='clearFix'></span>`;

        passwordInputContainer.insertAdjacentHTML('afterend', passwordRequirements);
      }

      // Make confirm password field temporarily disabled
      const confirmPwdField = document.querySelector('#ctl00_cphBody_txtConfirmPassword');
      confirmPwdField.disabled = true;
      const confirmPwdContainer = confirmPwdField.parentNode;
      confirmPwdContainer.classList.add('PJ058-disabledField');
      

      /**
       * @desc Adds Eye icon to Reveal Password
       */
      pollerLite(['p.checkoutRegItem', 'p.checkoutRegItem input'], () => {
        const passwordInputContainers = document.querySelectorAll('p.checkoutRegItem');
        const eyeIcon = `<span class='PJ058-invalidInputField hidden'></span><span class='PJ058-matchingInputField hidden'></span><span class='PJ024-showPwd'></span>`; // eslint-disable-line quotes
      
        [].forEach.call(passwordInputContainers, (inputContainer) => {
          if (inputContainer.querySelector('span.PJ024-showPwd')) {
            inputContainer.removeChild(inputContainer.querySelector('span.PJ024-showPwd'));
          }
          inputContainer.querySelector('input').insertAdjacentHTML('beforebegin', eyeIcon);
          pollerLite(['span.PJ024-showPwd'], () => {
            inputContainer.querySelector('span.PJ024-showPwd').addEventListener('click', () => {
              services.showPassword(inputContainer);
            });
          });
        });
      });

      /**
       * @desc Input Validation
       */
      const input = passwordInputContainer.querySelector('input');
      const uppercase = document.querySelector('#pwd-uppercase');
      const number = document.querySelector('#pwd-number');
      const length = document.querySelector('#pwd-characters');
      let max = -1;
      // let firstBuild = true;
      let check = 0;
      const validate = (cb) => {
        // Remove error highlight from fields (if shown)
        if (document.querySelector('.PJ024-pwdContainer.PJ058-invalidFields') || document.querySelector('#ctl00_cphBody_txtPassword.PJ058-invalidFields') || document.querySelector('#ctl00_cphBody_txtConfirmPassword.PJ058-invalidFields')) {
          document.querySelector('.PJ024-pwdContainer').classList.remove('PJ058-invalidFields');
          document.querySelector('#ctl00_cphBody_txtPassword').classList.remove('PJ058-invalidFields');
          document.querySelector('#ctl00_cphBody_txtConfirmPassword').classList.remove('PJ058-invalidFields');

          const inputFieldsErrorIcon = document.querySelectorAll('span.PJ058-invalidInputField');
          if (inputFieldsErrorIcon.length > 0) {
            [].forEach.call(inputFieldsErrorIcon, (errorIcon) => {
              errorIcon.classList.add('hidden');
            });
          }
        }
        
        // firstBuild = false;
        
        // UPPERCASE Validation
        const upperCaseLetters = /[A-Z]/g;
        if (input.value.match(upperCaseLetters)) {
          uppercase.classList.remove('invalid');
          uppercase.classList.add('success');
          document.querySelector('#uppercase-validation').classList.add('ticked');
          // Change icon - Success
          document.querySelector('.PJ024-pwd__item#pwd-uppercase').classList.add('PJ058-success');
          document.querySelector('.PJ024-pwd__item#pwd-uppercase').classList.remove('PJ058-inactive');
          document.querySelector('.PJ024-pwd__item#pwd-uppercase').classList.remove('PJ058-invalid');

          services.checkPasswordValidation();
        } else {
          uppercase.classList.remove('success');
          // uppercase.classList.add('invalid');
          // Change icon - Invalid
          document.querySelector('.PJ024-pwd__item#pwd-uppercase').classList.add('PJ058-invalid');
          document.querySelector('.PJ024-pwd__item#pwd-uppercase').classList.remove('PJ058-success');
          document.querySelector('#uppercase-validation').classList.remove('ticked');
        }

        // NUMBER Validation
        const numbers = /[0-9]/g;
        if (input.value.match(numbers)) {
          number.classList.remove('invalid');
          number.classList.add('success');
          document.querySelector('#number-validation').classList.add('ticked');
          // Change icon - Success
          document.querySelector('.PJ024-pwd__item#pwd-number').classList.add('PJ058-success');
          document.querySelector('.PJ024-pwd__item#pwd-number').classList.remove('PJ058-inactive');
          document.querySelector('.PJ024-pwd__item#pwd-number').classList.remove('PJ058-invalid');

          services.checkPasswordValidation();
        } else {
          number.classList.remove('success');
          // number.classList.add('invalid');
          // Change icon - Invalid
          document.querySelector('.PJ024-pwd__item#pwd-number').classList.add('PJ058-invalid');
          document.querySelector('.PJ024-pwd__item#pwd-number').classList.remove('PJ058-success');
          document.querySelector('#number-validation').classList.remove('ticked');
        }

        // LENGTH Validation
        if (input.value.length >= 1 && input.value.length < 8) {
          length.classList.remove('invalid');
          length.classList.remove('success');
          document.querySelector('#character-validation > .block-8').classList.remove('check');
          length.classList.add('check');
          // Change icon - Success
          document.querySelector('.PJ024-pwd__item#pwd-characters').classList.remove('PJ058-success');
          document.querySelector('.PJ024-pwd__item#pwd-characters').classList.remove('PJ058-invalid');
          document.querySelector('.PJ024-pwd__item#pwd-characters').classList.add('PJ058-inactive');
          if (input.value.length > max) {
            max = input.value.length;
            const blockSelectorEl = document.querySelector(`#character-validation > .block-${input.value.length}`);
            check += 1;
            blockSelectorEl.classList.add('check');
            // Loop back and makes sure check class is applied to all previous siblings
            let prev = blockSelectorEl.previousElementSibling;
            while (prev) {
              if (prev.classList && !prev.classList.contains('check')) {
                prev.classList.add('check');
              }
              prev = prev.previousElementSibling;
            }
          } else if (input.value.length < max) {
            max = input.value.length;
            const blockSelectorEl = document.querySelector(`#character-validation > .block-${input.value.length + 1}`);
            blockSelectorEl.classList.remove('check');
          }
        } else if (input.value.length >= 8) {
          length.classList.remove('check');
          length.classList.add('success');
          document.querySelector('#character-validation > .block-8').classList.add('check');

          // Change icon - Success
          document.querySelector('.PJ024-pwd__item#pwd-characters').classList.add('PJ058-success');
          document.querySelector('.PJ024-pwd__item#pwd-characters').classList.remove('PJ058-inactive');
          document.querySelector('.PJ024-pwd__item#pwd-characters').classList.remove('PJ058-invalid');

          /**
           * @desc Once all items in the requirement list have passed check (PJ058-success)
           * then unhide password requirements container
           * and confirm password field
           */
          if (document.querySelectorAll('li.PJ024-pwd__item.success.PJ058-success').length === 3) {
            // Unhide Password Requirements
            document.querySelector('ul.PJ024-pwdList').classList.remove('PJ058-inactive');
            // document.querySelector('ul.PJ024-pwdList').classList.add('PJ058-inactive');
            // Unhide Confirm Password Field
            confirmPwdField.disabled = true;
            confirmPwdField.removeAttribute('disabled');
            confirmPwdContainer.classList.remove('PJ058-disabledField');
          }
          

          services.checkPasswordValidation();

          // Loop through all block and make sure they have the check class
          const blocks = document.querySelectorAll('#character-validation > .block');
          Array.from(blocks).forEach((node) => {
            if (node.classList && !node.classList.contains('check')) {
              node.classList.add('check');
            }
          });
        } else if (input.value.length === 0) {
          length.classList.remove('check');
          length.classList.remove('success');
          
          const blocksUncheck = document.querySelectorAll('#character-validation > .block');
          [].forEach.call(blocksUncheck, (el) => {
            el.classList.remove('check');
          });
          // length.classList.add('invalid');

          // Change icon - Invalid
          document.querySelector('.PJ024-pwd__item#pwd-characters').classList.add('PJ058-invalid');
          document.querySelector('.PJ024-pwd__item#pwd-characters').classList.remove('PJ058-success');
          max = -1;
        }
        if (typeof cb === 'function') {
          cb();
        }

        // ----- If Password Confirm field has a value, check if passwords still match -----
        if (document.querySelector('#ctl00_cphBody_txtConfirmPassword').value !== '') {
          services.checkPasswordMatch();
        }
      };
      /**
       * @desc Create Password input field check
       */
      input.addEventListener('input', validate);

      // Callback function --- Adds all error indications
      const callback = () => {
        // alert('callback');
        document.querySelector('.PJ024-pwdContainer').classList.add('PJ058-invalidFields');
        document.querySelector('#ctl00_cphBody_txtPassword').classList.add('PJ058-invalidFields');
        document.querySelector('#ctl00_cphBody_txtConfirmPassword').classList.add('PJ058-invalidFields');

        const passwordInputContainers = document.querySelectorAll('p.checkoutRegItem');
        const invalidFieldIcon = `<span class='PJ058-invalidInputField'></span>`; // eslint-disable-line quotes
        
        // Input fields error
        if (isDesktopCheckout) {
          [].forEach.call(passwordInputContainers, (inputContainer) => {
            if (inputContainer.querySelector('span.PJ058-invalidInputField')) {
              const errorIcons = inputContainer.querySelectorAll('span.PJ058-invalidInputField');
              [].forEach.call(errorIcons, (icon) => {
                inputContainer.removeChild(icon);
              });
            }
            inputContainer.querySelector('input').insertAdjacentHTML('beforebegin', invalidFieldIcon);
          });
        }
      }
      
      // Error was shown - Re-run validation
      if (errorShown) {
        if (errorMsgText.indexOf("Your passwords don't match") > -1) {
          validate(callback);
          // show passwords don't match
          const passwordsNoMatchContainer = `<div class="PJ058-passwordsNotMatch">Passwords do not match</div>`;
          if (document.querySelector('.PJ058-passwordsNotMatch')) {
            document.querySelector('.PJ058-passwordsNotMatch').parentNode.removeChild(document.querySelector('.PJ058-passwordsNotMatch'));
          }
          document.querySelector('#ctl00_cphBody_txtConfirmPassword').insertAdjacentHTML('afterend', passwordsNoMatchContainer);

          setTimeout(() => {
            // Check and Hide Passwords do not match message after 4 seconds
            if (document.querySelector('.PJ058-passwordsNotMatch')) {
              document.querySelector('.PJ058-passwordsNotMatch').classList.add('hidden');
            }
          }, 6000);
        } else if (errorMsgText.indexOf("Passwords must be a minimum of") > -1) {
          validate(callback);
        }
      } else if (reRunTest) {
        // alert('re-run validation');
        validate();
      }

      // Hides Password Requirements when Register Checkbox is not checked
      const checkVisibility = () => {
        if (!document.querySelector('.registerCheckout input').checked) {
          document.querySelector('.PJ024-pwdContainer').classList.add('hidden');
        } else {
          document.querySelector('.PJ024-pwdContainer').classList.remove('hidden');
        }
        if (!window.IsMobile()) window.rwdChanges();
      };
      document.querySelector('.registerCheckout input').addEventListener('change', checkVisibility);

      // Use PJ global functions to resize desktop containers to correct heights
      if (!window.IsMobile()) {
        window.rwdChanges();
      }

      /**
       * @desc Call Password Validation Check
       */
      const pwdValidationInput = document.querySelector('#ctl00_cphBody_txtConfirmPassword');
      pwdValidationInput.addEventListener('input', services.checkPasswordMatch);
    };

    run();

    /*
     * Form rebuilds on submit so add a .NET pageLoaded event to perform input validation
     * when it rebuilds. The type of validation depends on the event.
     */
    window.prm.add_pageLoaded((sender, error, validate) => {
      try {
        // console.log('============ show sender ===========');
        // console.log(sender);
        // console.log('====================================');
        // (isDesktopCheckout || (isMobileCheckout && isOnGuestFormPage())) && 
        if (!document.querySelector('.PJ024-pwdContainer')) {
          // alert('233');
          run(); // Re-run PJ024
        } 
        // Desktop : ctl00$cphBody$lbPaymentDetails
        // Mobile : ctl00$cphBody$lbContinueToPayment
        if (sender && sender['_postBackSettings'] && sender['_postBackSettings'].asyncTarget && (sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$lbPaymentDetails" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$lbContinueToPayment" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$rdGuestAsap" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$rdGuestAnotherTime" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$drpGuestHour" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$drpGuestMin" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$drpGuestAddresses" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$drpAddresses") && document.querySelector('.PJ024-pwdContainer')) {
          // alert('237');
          let errorShown = false;
          const reRunTest = true;
          let errorMsgText = '';
          // ---- Desktop View
          pollerLite(['#ctl00_cphBody_divErrorStage1 p'], () => {
            // Password must be a minimum of
            setTimeout(() => {
              errorMsgText = document.querySelector('#ctl00_cphBody_divErrorStage1 p').innerText.trim();
              errorShown = true;
              run(reRunTest, errorShown, errorMsgText); // Re-run PJ024
            }, 700);
            
          });
          // ---- Mobile View
          pollerLite(['#ctl00_cphBody_divErrorStep2 p'], () => {
            // Password must be a minimum of
            setTimeout(() => {
              errorMsgText = document.querySelector('#ctl00_cphBody_divErrorStep2 p').innerText.trim();
              errorShown = true;
              run(reRunTest, errorShown, errorMsgText); // Re-run PJ024
            }, 700);
            
          });
          run(reRunTest, errorShown, errorMsgText); // Re-run PJ024

        }
      } catch (e) {
        console.log(`UC PJ024 Error: ${e}`);
      }
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = PJ024;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /**
     * @desc Check Password Validation
     */
    checkPasswordValidation() {
      // // let validPwd = false;
      // const pwdChecks = document.querySelectorAll('ul.PJ024-pwdList .PJ024-requirement .PJ024-pwd__item.success');
      const pwdChecks = document.querySelectorAll('li.PJ024-pwd__item.success.PJ058-success');
      if (pwdChecks.length === 3) {
        document.querySelector('ul.PJ024-pwdList').classList.remove('PJ058-inactive');
      }
    },
    /**
     * @desc Check Password Match
     */
    checkPasswordMatch() {
      const pwdInputText = document.querySelector('#ctl00_cphBody_txtPassword').value;
      const pwdValidateText = document.querySelector('#ctl00_cphBody_txtConfirmPassword').value;

      if (pwdInputText === pwdValidateText) {
        document.querySelector('.PJ024-pwdContainer').classList.remove('PJ058-invalidFields');
        document.querySelector('#ctl00_cphBody_txtPassword').classList.remove('PJ058-invalidFields');
        document.querySelector('#ctl00_cphBody_txtConfirmPassword').classList.remove('PJ058-invalidFields');
        
        document.querySelector('.PJ024-pwdContainer').classList.add('PJ058-matchingFields');
        document.querySelector('#ctl00_cphBody_txtPassword').classList.add('PJ058-matchingFields');
        document.querySelector('#ctl00_cphBody_txtConfirmPassword').classList.add('PJ058-matchingFields');

        const inputFieldsErrorIcon = document.querySelectorAll('span.PJ058-invalidInputField');
        if (inputFieldsErrorIcon.length > 0) {
          [].forEach.call(inputFieldsErrorIcon, (errorIcon) => {
            errorIcon.classList.add('hidden');
          });
        }
        const inputFieldsSuccessIcon = document.querySelectorAll('span.PJ058-matchingInputField');
        if (inputFieldsSuccessIcon.length > 0) {
          [].forEach.call(inputFieldsSuccessIcon, (successIcon) => {
            successIcon.classList.remove('hidden');
          });
        }
      } else {
        document.querySelector('.PJ024-pwdContainer').classList.add('PJ058-invalidFields');
        document.querySelector('#ctl00_cphBody_txtPassword').classList.add('PJ058-invalidFields');
        document.querySelector('#ctl00_cphBody_txtConfirmPassword').classList.add('PJ058-invalidFields');

        const inputFieldsSuccessIcon = document.querySelectorAll('span.PJ058-matchingInputField');
        if (inputFieldsSuccessIcon.length > 0) {
          [].forEach.call(inputFieldsSuccessIcon, (successIcon) => {
            successIcon.classList.add('hidden');
          });
        }
        const inputFieldsErrorIcon = document.querySelectorAll('span.PJ058-invalidInputField');
        if (inputFieldsErrorIcon.length > 0) {
          [].forEach.call(inputFieldsErrorIcon, (errorIcon) => {
            errorIcon.classList.remove('hidden');
          });
        }
      }
    },
    /**
     * @desc Shows/Hides Password
     */
    showPassword: function showPassword(inputContainer) {
      if (inputContainer.querySelector('input').type === 'password') {
        inputContainer.querySelector('input').type = 'text'; // eslint-disable-line no-param-reassign
        inputContainer.querySelector('span.PJ024-showPwd').classList.add('clicked');
      } else {
        inputContainer.querySelector('input').type = 'password'; // eslint-disable-line no-param-reassign
        inputContainer.querySelector('span.PJ024-showPwd').classList.remove('clicked');
      }
    },
  },

  components: {},
};

export default PJ024;
