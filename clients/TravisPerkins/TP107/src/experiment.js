import { fullStory, events, getCookie, setCookie } from '../../../../lib/utils';

/**
 * {{TP107}} - {{Trade Message (TP017 Iteration)}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TP107',
    VARIATION: '{{VARIATION}}',
  },

  cache: (() => {
    const ref = document.querySelector('#header ul.tpHeaderContent_holder');

    return {
      ref,
    };
  })(),

  init() {
    // If logged in don't run
    const { dataLayer } = window;
    if (dataLayer[0] && dataLayer[0].loggedIn === 'yes') {
      return;
    }

    // Setup
    const {
      settings,
      services,
      components,
      cache,
    } = Experiment;

    services.tracking();
    document.body.classList.add(settings.ID);

    // Run
    components.tradeBanner(cache.ref);
    // If has cookie, hide as default
    const addedDropdown = document.querySelector('.TP107-trade-banner .TP107-trade-dropdown');
    if (addedDropdown) {
      const closeDropdown = services.checkCookie();
      if (closeDropdown === 'true') {
        addedDropdown.classList.add('TP107-hide');
      }
    }
    // Control toggle
    services.toggleEl();
    // Hide dropdown
    services.hideEl();
    // Click tracking
    services.trackEls();
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
    checkCookie() {
      const hasCookie = getCookie('TP107-hasClosed');
      return hasCookie;
    },
    toggleEl() {
      const arrow = document.querySelector('.TP107-trade-banner .TP107-trade-title .TP107-arrow');
      const dropdown = document.querySelector('.TP107-trade-banner .TP107-trade-dropdown');
      if (arrow && dropdown) {
        arrow.addEventListener('click', () => {
          dropdown.classList.toggle('TP107-hide');
          // Arrow rotate
          arrow.classList.toggle('TP107-open');
        });
      }
    },
    hideEl() {
      const close = document.querySelector('.TP107-trade-banner button.TP107-close');
      const dropdown = document.querySelector('.TP107-trade-banner .TP107-trade-dropdown');
      const arrow = document.querySelector('.TP107-trade-banner .TP107-trade-title .TP107-arrow');
      if (close && dropdown) {
        close.addEventListener('click', () => {
          dropdown.classList.add('TP107-hide');
          setCookie('TP107-hasClosed', 'true', 999);
          events.send(Experiment.settings.ID, 'Click', 'TP107 Close Banner');
          arrow.classList.add('TP107-open');
        });
      }
    },
    trackEls() {
      const createAccount = document.querySelector('.TP107-trade-banner .TP107-cta a.TP107-create');
      const login = document.querySelector('.TP107-trade-banner .TP107-cta a.TP107-login');
      if (createAccount) {
        createAccount.addEventListener('click', () => {
          events.send(Experiment.settings.ID, 'Click', 'TP107 Create Account');
        });
      }
      if (login) {
        login.addEventListener('click', () => {
          events.send(Experiment.settings.ID, 'Click', 'TP107 Log in');
        });
      }
    },
  },

  components: {
    tradeBanner(insertRef) {
      if (insertRef) {
        const html = `
          <div class="TP107-trade-banner">
            <div class="TP107-trade-title">
              <p>In the Trade?</p>
              <p>Get more from Travis Perkins with an account</p>

              <span class="TP107-arrow"></span>
            </div>
  
            <div class="TP107-trade-dropdown">
              <div class="TP107-dropdown-wrap">
                
                <div class="TP107-row">
                  <p><strong>Welcome to Travis Perkins</strong></p>

                  <p>If you don’t have an account, why not open one here? You’ll get a trade discount on the products you buy the most</p>

                  <div class="TP107-cta">
                    <a class="TP107-create" href="https://www.travisperkins.co.uk/Open_an_Account">Open an Account</a>
                  </div>
                </div>
                <div class="TP107-row">
                  <p><strong>Already have a branch or online account?</strong></p>

                  <p>If you’ve used Travis Perkins branches in the past and already have an account, why not register your account to use online?</p>

                  <div class="TP107-cta">
                    <a class="TP107-login" href="https://www.travisperkins.co.uk/login">Log in / Register</a>
                  </div>
                </div>

                <button class="TP107-close">Close</button>

              </div>
            </div>
          </div>
        `;

        insertRef.insertAdjacentHTML('afterend', html);
      }
    },
  },
};

export default Experiment;
