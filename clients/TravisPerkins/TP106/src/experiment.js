import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{TP106}} - {{TP017 Iteration}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TP106',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    let isLoggedIn = false;
    const desktopLoggedIn = document.querySelector('.sessioncamhidetext');
    if (desktopLoggedIn) {
      isLoggedIn = true;
    }
    if (isLoggedIn === true) {
      return false;
    }
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /**
     * Add header component
     */
    components.addHeaderComponent();
    /**
     * Click tracking for new elements
     */
    services.clickTracking();
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    clickTracking() {
      const { settings } = Experiment;
      const createAccountBtn = document.querySelector('.TP106-header-component .TP106-header-subcomponent .TP106-ib:first-of-type a');
      const loginBtn = document.querySelector('.TP106-header-component .TP106-header-subcomponent .TP106-ib:last-of-type a');
      
      if (createAccountBtn) {
        createAccountBtn.addEventListener('click', () => {
          events.send(settings.ID, 'Clicked', 'User clicked create account button', { sendOnce: true });
        });
      }
      if (loginBtn) {
        loginBtn.addEventListener('click', () => {
          events.send(settings.ID, 'Clicked', 'User clicked log in button', { sendOnce: true });
        });
      }
    }
  },

  components: {
    addHeaderComponent() {
      const html = `
        <div class="TP106-header-component">
          <p><span>In the Trade?</span> Get more from Travis Perkins with an account</p>
          <span class="TP106-arrow"></span>
          <div class="TP106-header-subcomponent">
            <div class="TP106-ib">
              <p><strong>Welcome to Travis Perkins!</strong></p>
              <div class="TP106-text-wrap">
                <p>If you don’t have an account, why not open one here?</p>
                <p>You’ll get a trade discount on the products you buy the most</p>
              </div>

              <a href="https://www.travisperkins.co.uk/Open_an_Account" class="primary_cta">Create an Account</a>
            </div>
            <div class="TP106-ib">
              <p><strong>Already a branch or online customer?</strong></p>
              <div class="TP106-text-wrap">
                <p>If you’ve used Travis Perkins branches in the past and already have an account, why not register your account to use online?</p>
                <p>You’ll see your personal trade prices, as well as having the option to save addresses, payment cards and manage your account online</p>
              </div>
              <a href="https://www.travisperkins.co.uk/login" class="primary_cta">Log in / Register</a>
            </div>
          </div>
        </div>
      `;
      const ref = document.querySelector('#header .tpHeaderLinks');
      const elAlreadyExists = document.querySelector('.TP106-header-component');
      if (!elAlreadyExists && ref) {
        ref.insertAdjacentHTML('afterbegin', html);
      }
    },
  },
};

export default Experiment;
