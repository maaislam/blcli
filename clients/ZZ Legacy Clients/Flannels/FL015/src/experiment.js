import { fullStory, events } from '../../../../lib/utils';

/**
 * {{FL015}} - {{Account validation at Checkout}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'FL015',
    VARIATION: 'Control',
  },
  
  init() {
    events.analyticsReference = '_gaUAT';
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /**
     * Checkout changes
    */
    components.changeHeadings();
    components.accountOptions();
    components.toggleAccounts();
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      events.analyticsReference = '_gaUAT';
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      // Forgotten password
      const forgotPass = document.querySelector('.ForgotPass > a.ForgotPasswordLinkButton');
      if (forgotPass) {
        forgotPass.addEventListener('click', () => {
          events.send('FL015 Control', 'Click', 'User clicked on forgotten password', { sendOnce: true });
        });
      }
      // Continue securely
      const continueSecure = document.querySelector('.newCustomer .NewCustWrap span.ImgButWrap > a.dnnPrimaryAction');
      if (continueSecure) {
        continueSecure.addEventListener('click', () => {
          events.send('FL015 Control', 'Click', 'User clicked on continue securely', { sendOnce: true });
        });
      }
      // SignIn securely
      const signinSecure = document.querySelector('.existingCustomer .NewCustWrap span.ImgButWrap > a.dnnPrimaryAction');
      if (signinSecure) {
        signinSecure.addEventListener('click', () => {
          events.send('FL015 Control', 'Click', 'User clicked on sign in securely', { sendOnce: true });
        });
      }
    },
  },

  components: {
    changeHeadings() {
      const ref = document.querySelector('.CustomerGroups .contact-sec.SectionTops > h1');
      if (ref) {
        ref.textContent = 'Welcome to Checkout';
        // Sub header
        ref.insertAdjacentHTML('afterend', '<h2>Do you already have an account?</h2>');
      }
      // Existing customer title
      const existingContainer = document.querySelector('.existingCustomer .innerBorder');
      if (existingContainer) {
        existingContainer.insertAdjacentHTML('afterbegin', '<h2>Log In</h2>');
      }
      // New customer email input message
      const newCustomerEmailInput = document.querySelector('section.newCustomer input[type="email"]');
      if (newCustomerEmailInput) {
        newCustomerEmailInput.insertAdjacentHTML('afterend', '<p>Just so we can send you the order confirmation.</p>');
      }
    },
    accountOptions() {
      const html = `
        <div class="FL015-account-options">
          <button data-choice="yes" class="FL015-button">Yes</button>
          <button data-choice="no" class="FL015-button">No</button>
          <button data-choice="notsure" class="FL015-button">Not Sure</button>
        </div>
      `;
      const ref = document.querySelector('.CustomerGroups .contact-sec.SectionTops');
      if (ref) {
        ref.insertAdjacentHTML('beforeend', html);
      }
    },
    toggleAccounts() {
      const buttons = document.querySelectorAll('.FL015-account-options > button');
      const exisitingAccount = document.querySelector('.existingCustomer > .innerBorder');
      const newAccount = document.querySelector('section.newCustomer');
      const newCustomerTitle = document.querySelector('section.newCustomer .contact-sec.SectionTops h1');
      [].forEach.call(buttons, (button) => {
        button.addEventListener('click', (e) => {
          e.preventDefault();

          // Remove FL015-active from all buttons
          for (let i = 0; buttons.length > i; i += 1) {
            buttons[i].classList.remove('FL015-active');
          }

          // Choice
          const data = button.dataset.choice;
          const openPanel = e.target.nextElementSibling;
          switch (data) {
            case 'yes': {
              // Close panel if already open / active
              if (openPanel.classList.contains('FL015-show')) {
                openPanel.classList.remove('FL015-show');
              } else {
                newAccount.classList.remove('FL015-show');
                // Append below button
                e.currentTarget.insertAdjacentElement('afterend', exisitingAccount);
                exisitingAccount.classList.add('FL015-show');
                e.currentTarget.classList.add('FL015-active');
                exisitingAccount.classList.remove('FL015-hide');
              }
              // Events
              events.send('FL015', 'Yes', 'Yes button was chosen', { sendOnce: true });
              break;
            }
            case 'no': {
              // Close panel if already open / active
              if (openPanel.classList.contains('FL015-show')) {
                openPanel.classList.remove('FL015-show');
              } else {
                exisitingAccount.classList.remove('FL015-show');
                // New customer title
                if (newCustomerTitle) {
                  newCustomerTitle.textContent = 'Guest Checkout';
                }
                // Append below button
                e.currentTarget.insertAdjacentElement('afterend', newAccount);
                newAccount.classList.add('FL015-show');
                e.currentTarget.classList.add('FL015-active');
                const loginBtn = newAccount.querySelector('.FL015-login');
                if (loginBtn) {
                  loginBtn.remove();
                }
                const addedInputs = document.querySelector('.newCustomer .innerBorder.FL015-prefer-login');
                if (addedInputs) {
                  addedInputs.classList.add('FL015-hide');
                }
              }
              // Events
              events.send('FL015', 'No', 'No button was chosen', { sendOnce: true });
              break;
            }
            case 'notsure': {
              newAccount.classList.remove('FL015-show');
              // Add show class
              
              const hasPanel = e.target.nextElementSibling;
              if (hasPanel !== null) {
                hasPanel.classList.remove('FL015-show');
                hasPanel.parentNode.removeChild(hasPanel);
              } else {
                const movedNewAccount = document.querySelector('.FL015-account-options .innerBorder.FL015-show');
                if (movedNewAccount) {
                  movedNewAccount.classList.remove('FL015-show');
                }
                // New customer title
                if (newCustomerTitle) {
                  newCustomerTitle.textContent = 'Even if you have an account, you can still checkout as a guest here';
                }
                // Append below button
                e.currentTarget.insertAdjacentElement('afterend', newAccount);

                
                newAccount.classList.add('FL015-show');
                e.currentTarget.classList.add('FL015-active');
                if (!document.querySelector('.FL015-login')) {
                  newAccount.insertAdjacentHTML('beforeend', '<span class="FL015-login">I would prefer to try and log in</span>');
                }
              }
              // Events
              events.send('FL015', 'Not Sure', 'Not Sure button was chosen', { sendOnce: true });
              /**
               * Prefer login button
               */
              const loginBtn = document.querySelector('.newCustomer span.FL015-login');
              if (loginBtn) {
                loginBtn.addEventListener('click', () => {
                  document.querySelector('.newCustomer').insertAdjacentElement('beforeend', exisitingAccount);
                  const addedInputs = document.querySelector('.newCustomer .innerBorder:last-of-type');
                  if (addedInputs) {
                    // addedInputs.classList.add('FL015-show');
                    addedInputs.classList.add('FL015-prefer-login');
                  }
                  events.send('FL015', 'Click', 'User clicked prefer to try and login', { sendOnce: true });
                });
              }
  
              break;
            }
            default:
              console.log('error');
          }
        });
      });
    },
  },
};

export default Experiment;
