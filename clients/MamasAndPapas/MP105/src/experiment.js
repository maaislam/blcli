import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{MP105}} - {{Login UX Improvements}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP105',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Excludes IE
    if (!(/*@cc_on!@*/false || !!document.documentMode)) { // eslint-disable-line spaced-comment
      if (window.universal_variable.page.type === 'Checkout') {
        // Setup
        const { settings, services } = Experiment;
        services.tracking();
        document.body.classList.add(settings.ID);

        // Changes text in 'No' option
        document.querySelectorAll('label.control-label')[1].childNodes.forEach((item) => {
          if (item.nodeName.toLowerCase() !== 'strong') {
            if (item.nodeName === '#text') {
              item.remove();
            } else {
              item.classList.add('MP105-hideRegisterLink');
            }
          }
        });

        document.querySelectorAll('label.control-label')[4].childNodes.forEach((item) => {
          if (item.nodeName.toLowerCase() !== 'strong') {
            if (item.nodeName === '#text') {
              item.remove();
            } else {
              item.classList.add('MP105-hideRegisterLink');
            }
          }
        });

        // Swaps order of radio labels (on hidden block too)
        const formGuestCheckout = document.querySelector('[data-form="formGuestCheckout"]');
        let radio = formGuestCheckout.querySelectorAll('.form_field-elements')[1];
        radio.appendChild(radio.firstElementChild);

        // Changes elements in hidden form
        poller(['[data-form="formUserCheckout"]'], () => {
          const formUserCheckout = document.querySelector('[data-form="formUserCheckout"]');
          radio = formUserCheckout.querySelector('.controls.custom-radio.radio-none');
          const pwdSection = formUserCheckout.querySelector('.mt-2');
          pwdSection.insertAdjacentElement('afterend', radio);

          const hiddenSubmitWrapper = formUserCheckout.querySelector('.userLogin .form-actions > .row');
          const newUserButton = `<div class='MP105-btn__user'>
          <button class='btn btn-primary'>Continue Securely</button>
          </div>`;
          hiddenSubmitWrapper.querySelector('.col.py-2').insertAdjacentHTML('beforebegin', newUserButton);

          document.querySelector('.MP105-btn__user > .btn').addEventListener('click', () => {
            if (document.querySelector('.userLogin .checkout_form > div').className === 'd-none') {
              const userCheckout = document.querySelector('[data-form="formUserCheckout"]');
              userCheckout.querySelector('.userLogin .form-actions > .row > .col.py-2 > .btn').click();
            }
          });
        });
        // Creates Checkbox
        const checkboxWrapper = `<div class='MP105-checkbox'>
        <input class='js-checkoutRegister' type='checkbox' id='MP105-registerWithMamasAndPapas' for='formOptionRegister'>
        <strong>Register with Mamas and Papas</strong> Recommended
        </div>`;
        document.querySelector('.col-xs-12.col-md-10.col-md-push-1').insertAdjacentHTML('beforeend', checkboxWrapper);

        // Creates Password eye icon and functionality
        const loginForm = document.querySelector('#loginForm');
        const inputPassword = loginForm.querySelector('.controls > #j_password');

        const eyeIcon = `<span id='MP105-showPwd'></span>`; // eslint-disable-line quotes
        inputPassword.insertAdjacentHTML('beforebegin', eyeIcon);
        document.querySelector('span#MP105-showPwd').addEventListener('click', () => {
          services.showPassword();
        });
        // Creates new Submit Button
        const submitButtonWrapper = document.querySelector('.userLogin .form-actions > .row');
        const newButton = `<div class='MP105-btn__guest'>
        <button class='btn btn-primary'>Continue Securely</button>
        </div>`;
        submitButtonWrapper.querySelector('.col.py-2').insertAdjacentHTML('beforebegin', newButton);

        // Checks if checkbox is ticked
        const checkBox = document.querySelector('input.js-checkoutRegister');
        document.querySelector('.MP105-btn__guest > .btn').addEventListener('click', () => {
          if (checkBox.checked) {
            document.querySelector('a.text-underline').click();
          } else {
            submitButtonWrapper.querySelector('.col.py-2 > .btn').click();
          }
        });

        // Forgot Password
        document.querySelector('div.forget-password').addEventListener('click', () => {
          poller(['.forgottenPwd'], () => {
            const lightBoxDescription = document.querySelector('.forgottenPwd > .description');
            const lightBoxList = `<div class='MP105-listWrapper'>
            <div class='MP105-listContainer'>
            <ul class='MP105-list'>
            <li class='MP105-item'>You’ll receive an email with a link to reset your password in the next couple of minutes</li>
            <li class='MP105-item'>Please check your SPAM if it doesn’t arrive in 2 minutes</li>
            <li class='MP105-item'>Having trouble? Call us on 0345 268 2000 for help</li>
            </ul></div>
            </div>`;
            lightBoxDescription.insertAdjacentHTML('afterend', lightBoxList);
          });
        });

        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      }
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
    showPassword: function showPassword() {
      const input = document.querySelector('input#j_password');
      if (input.type === 'password') {
        input.type = 'text';
        document.querySelector('span#MP105-showPwd').style.filter = 'opacity(.6)';
      } else {
        input.type = 'password';
        document.querySelector('span#MP105-showPwd').style.filter = 'opacity(1)';
      }
    },
  },

  components: {},
};

export default Experiment;
