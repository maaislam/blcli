import { pollerLite } from '../../../../lib/uc-lib';
import { fullStory, events } from '../../../../lib/utils';

/**
 * PJ012 - Inline Validation Update
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   *  in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ012',
    VARIATION: '{{VARIATION}}',
  },

  globals: {
    clickedContinue: null,
    unchekedAutoRegister: null,
  },

  init: function init(exports) {
    // Setup
    const { settings } = Experiment;
    const { services } = Experiment;
    const { prm, isOnGuestFormPage } = exports;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}-V${settings.VARIATION}`);
    document.querySelector('.main').classList.add(`${settings.ID}--active`);
    this.globals.prm = prm;

    events.send('PJ012 Inline - Validation', 'Test Fired', `V${settings.VARIATION}`, { sendOnce: true });

    // Inital run if already on form page
    services.validation();

    if (settings.VARIATION === '2') {
      services.separateJoinSection();
    }

    // Bug fix - Fix main top margin
    setTimeout(() => {
      document.querySelector('.main').style.marginTop = '107px';
    }, 50);

    setTimeout(() => {
      document.querySelector('.main').style.marginTop = '107px';
    }, 1000);

    /*
     * Form rebuilds on submit so add a .NET pageLoaded event to perform input validation
     * when it rebuilds. The type of validation depends on the event.
     */
    const PJ012PageRefreshHandler = (sender) => {
      try {
        if (isOnGuestFormPage()) {
          const target = sender._postBackSettings.asyncTarget; // eslint-disable-line
          if (target === 'ctl00$cphBody$lbContinueToPayment') {
            services.validation(true);
            if (settings.VARIATION === '2') services.separateJoinSection();
          } else if (target === 'ctl00$cphBody$drpAddresses') {
            services.validation(true);
            if (settings.VARIATION === '2') services.separateJoinSection();
          } else if (target === 'ctl00$cphBody$lbPostcodeSearch2') {
            services.validation(true, {
              exclude: ['ctl00$cphBody$drpAddresses'],
            });
            if (settings.VARIATION === '2') services.separateJoinSection();
          } else if (target === 'ctl00$cphBody$lbBackToAddress') {
            services.validation(true);
            if (settings.VARIATION === '2') services.separateJoinSection();
          } else {
            services.validation();
            if (settings.VARIATION === '2') services.separateJoinSection();
          }
        }
      } catch (e) {
        console.log(`UC PJ012 Error: ${e}`);
      }
    };

    prm.add_pageLoaded(PJ012PageRefreshHandler);
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },

    /**
     * @desc Adds validation to Contact Details form
     * @param {boolean} validateAll If true, run validation on all fields immediately
     * @param {Object.<Array>} options.exclude Array of field ID's to exclude from validation
     */
    validation: function validation(validateAll, options) {
      /**
       * @desc Runs validation on a field
       * @param {text} name The name of the input field to validate. Determines which rules
       *  the value should pass
       * @param {text} value Value of the input to run against validation conditions
       * @returns {boolean|string} Returns true if validation passed or an error message
       *  string if failed
       */
      function validate(name, value) {
        let executeValidation;

        // Sets validation rules for each input
        switch (name) {
          case 'ctl00$cphBody$txtGuestFirstName':
            executeValidation = () => {
              let toReturn;
              if (value.length === 0 || !value.match(/\w/)) {
                toReturn = 'You must enter your First name';
              } else {
                toReturn = true;
              }
              /* else if (value.match(/\d/)) {
                toReturn = 'Your First name must not include numbers';
              } */
              return toReturn;
            };
            break;

          case 'ctl00$cphBody$txtGuestSurname':
            executeValidation = () => {
              let toReturn;
              if (value.length === 0 || !value.match(/\w/)) {
                toReturn = 'You must enter your Surname';
              } else {
                toReturn = true;
              }
              /* else if (value.match(/\d/)) {
                toReturn = 'Your Surname must not include numbers';
              } */
              return toReturn;
            };
            break;

          case 'ctl00$cphBody$txtGuestEmail':
            executeValidation = () => {
              let toReturn;
              const emailRegex = /^([\w-+\\/.]+@([\w-]+\.)+[\w-]{2,6})?$/;
              if (value.length === 0 || !value.match(/\w/)) {
                toReturn = 'You must enter your email address';
              } else if (!emailRegex.test(value)) {
                toReturn = 'You must enter a valid email address';
              } else {
                toReturn = true;
              }
              return toReturn;
            };
            break;

          case 'ctl00$cphBody$txtGuestContactNumber':
            executeValidation = () => {
              let toReturn;
              const numbers = value.match(/\d/g);
              if (value.length < 7 || value.length > 16) {
                toReturn = 'Your contact number must be between 7 and 16 digits long';
              } else if (value.match(/[a-zA-Z]/) || !numbers || (numbers && (numbers.length < 7 || numbers.length > 16))) {
                toReturn = 'Enter a valid contact number';
              } else {
                toReturn = true;
              }
              return toReturn;
            };
            break;

          case 'ctl00$cphBody$txtPassword':
            executeValidation = () => {
              let toReturn;
              const registerInput = document.querySelector('#chkGuestRegister');
              if (registerInput.checked) {
                if ((value.length < 8 && value.length > 0) || !value.match(/\d/) || !value.match(/[A-Z]/)) {
                  toReturn = 'Passwords must be a minimum of 8 characters in length, and must have at least one number and one uppercase letter';
                } else if (value.length === 0) {
                  toReturn = 'You must enter a password';
                } else {
                  const confirmPasswordInput = document.querySelector('#ctl00_cphBody_txtConfirmPassword');
                  if (confirmPasswordInput.value.length > 0) {
                    // eslint-disable-next-line no-use-before-define
                    runValidationCheck(confirmPasswordInput);
                  }
                  toReturn = true;
                }
              } else {
                toReturn = undefined;
              }
              return toReturn;
            };
            break;

          case 'ctl00$cphBody$txtConfirmPassword':
            executeValidation = () => {
              let toReturn;
              const registerInput = document.querySelector('#chkGuestRegister');
              if (registerInput.checked) {
                const passwordValue = document.querySelector('#ctl00_cphBody_txtPassword').value;
                if (value.length === 0 || value !== passwordValue) {
                  toReturn = 'Your passwords don’t match';
                } else {
                  toReturn = true;
                }
              } else {
                toReturn = undefined;
              }
              return toReturn;
            };
            break;

          case 'ctl00$cphBody$txtPostcode':
            executeValidation = () => {
              const postcodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/;
              let toReturn;
              if (value.length === 0) {
                toReturn = 'You must enter a postcode';
              } else if (!postcodeRegex.test(value)) {
                toReturn = 'Enter a valid postcode';
              } else {
                toReturn = true;
              }
              return toReturn;
            };
            break;

          case 'ctl00$cphBody$drpAddresses':
            executeValidation = () => {
              let toReturn;
              if (value.length === 0) {
                toReturn = 'You must select an address';
              } else {
                toReturn = true;
              }
              return toReturn;
            };
            break;

          default:
            executeValidation = () => {
              // Fail if 0 characters on requried fields
              const element = document.querySelector(`[name="${name}"]`);
              const isRequired = !!element.parentElement.querySelector('.reqField');
              let toReturn;
              if (isRequired && (value.length === 0 || !value.match(/\w/))) {
                toReturn = 'This is a required field';
              } else if (value.length) {
                toReturn = true;
              } else {
                toReturn = undefined;
              }
              return toReturn;
            };
            break;
        }

        return executeValidation();
      }

      /**
       * @param {HTMLElement} el Element to check validation for
       */
      function runValidationCheck(el) {
        const container = el.parentElement;
        const name = el.getAttribute('name');
        const { value } = el;
        const result = validate(name, value);
        if (result === true) {
          // Passed validation
          container.classList.remove('PJ012_failedValidation');
          container.classList.add('PJ012_passedValidation');
          const errorMessage = container.querySelector('.PJ012_errorMessage');
          if (errorMessage) {
            errorMessage.parentNode.removeChild(errorMessage);
          }
        } else if (typeof result === 'string') {
          // Failed validation
          container.classList.remove('PJ012_passedValidation');
          container.classList.add('PJ012_failedValidation');
          let errorMessage = container.querySelector('.PJ012_errorMessage');
          if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.classList.add('PJ012_errorMessage');
            container.appendChild(errorMessage);
          }
          errorMessage.innerText = result;
        } else {
          // Field not required, do nothing
          container.classList.remove('PJ012_failedValidation');
          container.classList.remove('PJ012_passedValidation');
          const errorMessage = container.querySelector('.PJ012_errorMessage');
          if (errorMessage) {
            errorMessage.parentNode.removeChild(errorMessage);
          }
        }
      }

      /**
       * @desc Applies custom validation events to all text input fields on the
       *  contact details form
       */
      function attachEvents() {
        const continueBtn = document.querySelector('#ctl00_cphBody_lbContinueToPayment');
        const formInputs = [...document.querySelectorAll('.contactDetailsCont input, .contactDetailsCont select')].filter((el) => {
          const { type } = el;
          return type === 'text' || type === 'password' || el.nodeName === 'SELECT';
        });
        formInputs.forEach((el) => {
          const excludedEl = options && options.exclude && options.exclude.indexOf(el.getAttribute('name')) > -1;
          el.addEventListener('change', () => {
            runValidationCheck(el);
          });
          if (validateAll && !excludedEl) {
            runValidationCheck(el);
          }
        });
        if (continueBtn) {
          continueBtn.addEventListener('click', () => {
            Experiment.globals.clickedContinue = true;
          });
        }
      }
      Experiment.globals.clickedContinue = null;
      attachEvents();

      /**
       * If the register box is checked by default, uncheck it for GDPR compliance
       * Use global variable so this only ever runs on the first load. This will prevent
       * overriding any subsequent user action on this input
       */
      if (!Experiment.globals.unchekedAutoRegister) {
        pollerLite(['#chkGuestRegister', '.checkoutRegItem'], () => {
          const input = document.querySelector('#chkGuestRegister');
          if (input.checked === true) {
            setTimeout(() => {
              document.querySelector('#chkGuestRegister').click();
              Experiment.globals.unchekedAutoRegister = true;
            }, 50);
          }
        });
      }

      /*
       * If error message is showing that states email is already registered, keep
       * it visibile because this is a check with the back-end that we can't intercept.
       * If this message doesn't show hide the default error message block.
       */
      const errorMessageBlock = document.querySelector('#ctl00_cphBody_divErrorStep2');
      if (errorMessageBlock) {
        const emailErrorMessage = 'This email address is already registered with Papa John\'s, please login';
        if (errorMessageBlock.innerText.trim() !== emailErrorMessage) {
          errorMessageBlock.style.display = 'none';
        }
      }
    },

    /**
     * @desc Page changes for Variation 2
     */
    separateJoinSection: function separateJoinSection() {
      const fieldsContainer = document.querySelector('.checkout-step-2');
      if (fieldsContainer.classList.contains('PJ012_splitFields')) return false;
      fieldsContainer.classList.add('PJ012_splitFields');
      const registerInput = document.querySelector('#chkGuestRegister');
      const passwordInput = document.querySelector('#ctl00_cphBody_txtPassword');
      const confirmPasswordInput = document.querySelector('#ctl00_cphBody_txtConfirmPassword');
      const confirmPasswordField = confirmPasswordInput.parentElement;
      const passwordField = passwordInput.parentElement;
      const passwordRules = document.querySelector('.passwordInfo > p');
      const container = document.querySelector('.addressAddBox');

      // Check register button and show password rules when user starts typing password
      const passwordInputs = [passwordInput, confirmPasswordInput];
      passwordInputs.forEach((el) => {
        el.addEventListener('keyup', () => {
          const { value } = el;
          if (value.length > 0) {
            if (registerInput.checked === false) {
              registerInput.checked = true;
            }
            if (passwordRules.style.display === 'none') {
              passwordRules.style.display = 'block';
            }
          } else {
            // If both values are empty and input is checked, uncheck it
            let valueExists = false;
            passwordInputs.forEach((element) => {
              if (element.value.length) {
                valueExists = true;
              }
            });
            if (!valueExists && registerInput.checked === true) {
              el.parentElement.classList.remove('PJ012_failedValidation');
              const error = el.parentElement.querySelector('.PJ012_errorMessage');
              if (error) {
                error.parentElement.removeChild(error);
              }
              registerInput.checked = false;
            }
          }
        });
      });

      // Move elements around
      pollerLite([() => window.jQuery], () => {
        const $ = window.jQuery;
        $(container).children().wrapAll('<div class="PJ012_section"></div>');
        $('.PJ012_section').prepend('<h3>Contact Details</h3>');
        const $joinUs = $(`
        <div class="PJ012_section">
          <h3>Why Not Join Us?</h3>
          <div class="PJ012_section__desc">Collect points and earn Papa Rewards. Securely save your details for future orders!</div>
        </div>
        `);
        $(container).append($joinUs);
        $joinUs.before('<div class="arrow-separator"></div>');
        $(passwordRules).addClass('PJ012_passwordRules');
        $(passwordField).find('.reqField').remove();
        $(confirmPasswordField).find('.reqField').remove();
        $joinUs.append(passwordRules, passwordField, confirmPasswordField);
      });
    },
  },
};

export default Experiment;
