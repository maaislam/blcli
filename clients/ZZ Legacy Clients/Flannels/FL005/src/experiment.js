import { fullStory, events } from '../../../../lib/utils';
import flicker from './flickerprevention';

/**
 * {{FL005}} - {{Checkout Launch}}
 */
flicker();
const Run = () => {
  events.analyticsReference = '_gaUAT';
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL005',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const pageTitle = bodyVar.querySelector('#dnn_ctr88149_Launch_registerLogin_Header > h1');
      const emailBox = bodyVar.querySelector('#dnn_ctr88149_Launch_registerLogin_loginButton > .InputLabelGroup > .field');
      const forgotPass = $(bodyVar.querySelector('#dnn_ctr88149_Launch_registerLogin_loginButton > .ForgotPass'));
      const passwordBox = $(bodyVar.querySelector('.existingCustomer .loginContainer .InputLabelGroup .field.SignLogIn2:last-child'));
      const guestEmailInput = bodyVar.querySelector('#txtGuestCustomerEmailAddress');
      const loginEmailInput = bodyVar.querySelector('#dnn_ctr88149_Launch_registerLogin_txtExistingCustomerEmailAddress');
      const guestError1 = $('#dnn_ctr88149_Launch_rfvEmailAddress');
      const guestError2 = $('#dnn_ctr88149_Launch_revEmailAddress');
      const loginError = $('#dnn_ctr88149_Launch_registerLogin_divLoginErrorMessage');
      const loginButton = bodyVar.querySelector('#dnn_ctr88149_Launch_registerLogin_btnRegisteredCustomer');
      const guestLoginButton = bodyVar.querySelector('#dnn_ctr88149_Launch_btnGuestCustomer');
      const loginErrorMessage = bodyVar.querySelector('#dnn_ctr88149_Launch_registerLogin_lblLoginErrorMessage');
      const radioButtonMarkup = `
        <div class="FL005-Radio-Group">
          <div class="FL005-Option FL005-Active">
            <input type="radio" name="FL005-Radio-Option" id="FL005-Guest" checked="checked">
            <label for="FL005-Guest">I'm new - continue as guest</label>
          </div>
          <div class="FL005-Option">
            <input type="radio" name="FL005-Radio-Option" id="FL005-Returning">
            <label for="FL005-Returning">I'm already registered and have a password</label>
          </div>
        </div>
      `;
      const buttonMarkup = `
        <div class="FL005-Button-Wrap">
          <p class="FL005-Button">Continue Securely</p>
        </div>
      `;

      let guestOption;
      let guestOptionParent;
      let returningOption;
      let returningOptionParent;
      let continueButton;
      return {
        bodyVar,
        pageTitle,
        radioButtonMarkup,
        emailBox,
        buttonMarkup,
        forgotPass,
        guestOption,
        returningOption,
        continueButton,
        passwordBox,
        guestEmailInput,
        loginEmailInput,
        guestError1,
        guestError2,
        loginError,
        loginButton,
        guestLoginButton,
        loginErrorMessage,
        guestOptionParent,
        returningOptionParent,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      events.send(settings.ID, 'View', `${settings.ID} Variation ${settings.VARIATION}`, { sendOnce: true });
      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
      const hide = document.getElementById('FL005_flickerPrevention');
      hide.parentElement.removeChild(hide);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Change page title to Continue to Checkout
        Exp.cache.pageTitle.textContent = 'Continue to Checkout';
        // Add markup
        Exp.cache.emailBox.insertAdjacentHTML('afterend', Exp.cache.radioButtonMarkup);
        Exp.cache.forgotPass[0].insertAdjacentHTML('afterend', Exp.cache.buttonMarkup);
        // Move guest error message below login email error box - two messages exists, moving both
        Exp.cache.loginError.after(Exp.cache.guestError1);
        Exp.cache.guestError1.after(Exp.cache.guestError2);
        // Assign selectors
        Exp.cache.guestOption = Exp.cache.bodyVar.querySelector('#FL005-Guest');
        Exp.cache.returningOption = Exp.cache.bodyVar.querySelector('#FL005-Returning');
        Exp.cache.continueButton = Exp.cache.bodyVar.querySelector('.FL005-Button');
        Exp.cache.guestOptionParent = Exp.cache.guestOption.parentNode;
        Exp.cache.returningOptionParent = Exp.cache.returningOption.parentNode;
        // Elements ready, build functions
        this.setupFunctions();
        // Amend test if a returning user - live QA amend
        if (Exp.cache.loginErrorMessage.textContent.toUpperCase().trim() === 'THIS EMAIL ADDRESS OR PASSWORD IS INCORRECT') {
          // Send an event on page load if login error message exists
          events.send(`${Exp.settings.ID}`, 'Error Validation', 'Email address or password incorrect', { sendOnce: true });
          // Click already registered option
          Exp.cache.returningOption.click();
        } else {
          // Slide up forgot password link
          Exp.cache.forgotPass.slideUp();
        }
      },
      setupFunctions() {
        // Radio buttons - update button text and controls password box visibility
        Exp.cache.guestOption.addEventListener('change', () => {
          Exp.cache.continueButton.textContent = 'Continue Securely';
          // Hide forgot password link if hidden
          if (Exp.cache.forgotPass.is(':visible')) {
            Exp.cache.forgotPass.slideUp();
          }
          // Hide login error if visible
          if (Exp.cache.loginError.is(':visible')) {
            Exp.cache.loginError.slideUp();
          }
          // Don't add styling class twice on click
          if (!Exp.cache.guestOptionParent.classList.contains('FL005-Active')) {
            Exp.cache.guestOptionParent.classList.toggle('FL005-Active');
          }
          // Remove styling class from restigered option if it exists
          if (Exp.cache.returningOptionParent.classList.contains('FL005-Active')) {
            Exp.cache.returningOptionParent.classList.toggle('FL005-Active');
          }
          // Hide password box if visible
          if (Exp.cache.passwordBox.is(':visible')) {
            Exp.cache.passwordBox.slideUp();
          }
        });
        Exp.cache.returningOption.addEventListener('change', () => {
          // Change button text
          Exp.cache.continueButton.textContent = 'Sign In Securely';
          // Hide guest error message if it is visible
          if (Exp.cache.guestError1.is(':visible') || Exp.cache.guestError2.is(':visible')) {
            Exp.cache.guestError1.slideUp();
            Exp.cache.guestError2.slideUp();
          }
          // Reveal password box if hidden
          if (!Exp.cache.passwordBox.is(':visible')) {
            Exp.cache.passwordBox.slideDown();
          }
          // Reveal forgot password link if hidden
          if (!Exp.cache.forgotPass.is(':visible')) {
            Exp.cache.forgotPass.slideDown();
          }
          // Don't add styling class twice on click
          if (!Exp.cache.returningOptionParent.classList.contains('FL005-Active')) {
            Exp.cache.returningOptionParent.classList.toggle('FL005-Active');
          }
          // Remove styling class from guest checkout option
          if (Exp.cache.guestOptionParent.classList.contains('FL005-Active')) {
            Exp.cache.guestOptionParent.classList.toggle('FL005-Active');
          }
        });
        // Add event handler to button
        Exp.cache.continueButton.addEventListener('click', () => {
          // Check which radio button is selected
          if (Exp.cache.guestOption.checked) {
            // Send event
            events.send(`${Exp.settings.ID}`, 'Click', 'Guest Checkout', { sendOnce: true });
            // Assign page top email input to guest email input
            Exp.cache.guestEmailInput.value = Exp.cache.loginEmailInput.value;
            // Click the guest continue button
            Exp.cache.guestLoginButton.click();
          } else if (Exp.cache.returningOption.checked) {
            // Send event
            events.send(`${Exp.settings.ID}`, 'Click', 'Registered Checkout', { sendOnce: true });
            // click log in button
            Exp.cache.loginButton.click();
          }
        });
      },
    },
  };

  Exp.init();
};

export default Run;
