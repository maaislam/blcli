import { fullStory, events } from '../../../../lib/utils';

/**
 * {{TP119}} - {{Mobile Log In Prominence}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TP119',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    // Determine if user is logged in
    const isUserLoggedIn = components.isLoggedIn();
    // Build up elements
    const elementsObject = components.buildInfo(isUserLoggedIn);
    // Pass to container
    const ref = document.querySelector('#page #content');
    components.loginInfo(elementsObject.text, elementsObject.button, ref);
    services.btnTracking();
    // Scroll to top on page load
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
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
    btnTracking() {
      const logInBtn = document.querySelector('.TP119 .TP119-login-wrap a.TP119-btn-login');
      const accountBtn = document.querySelector('.TP119 .TP119-login-wrap a.TP119-btn-account');
      if (logInBtn) {
        logInBtn.addEventListener('click', () => {
          events.send('TP119', 'Clicked', 'New Log in button', { sendOnce: true });
        });
      }
      if (accountBtn) {
        accountBtn.addEventListener('click', () => {
          events.send('TP119', 'Clicked', 'View account button', { sendOnce: true });
        });
      }
    },
  },

  components: {
    /**
     * Is user logged in, returns 'yes' or 'no'
     */
    isLoggedIn() {
      return window.dataLayer[0].loggedIn;
    },
    getAccountName(loggedIn) {
      // TBC
    },
    /**
     * @desc Dependant on whether the user is logged in or not
     * will show different elements. Also requires an account user name
     * if logged in.
     * @param {String} loggedIn
     * @param {String} accountName (for logged in only)
     */
    buildInfo(loggedIn) {
      let text = null;
      let button = null;
      if (loggedIn === 'yes') {
        text = '<p>You are logged in<p>';
        button = `
          <a href="/accountDashboard" class="TP119-btn TP119-btn-account tp-buttons">View Account</a>
        `;
      } else {
        text = '<p>You are not logged in</p>';
        button = `
          <a href="/login" class="TP119-btn TP119-btn-login tp-buttons">Log In</a>
        `;
      }
      return {
        text,
        button,
      };
    },
    /**
     * @desc Display a container below the header with either
     * logged in or out as inputs.
     * @param {String} text
     * @param {String} button
     * @param {Element} ref
     */
    loginInfo(text, button, ref) {
      const html = `
        <div class="TP119-login-wrap">
          <div class="TP119-ib">
            ${text}
          </div>
          <div class="TP119-ib">
            ${button}
          </div>
        </div>
      `;
      if (!document.querySelector('.TP119-login-wrap')) {
        ref.insertAdjacentHTML('afterbegin', html);
      }
    },
  },
};

export default Experiment;
