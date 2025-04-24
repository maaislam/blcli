import { setup, isLoggedIn, translate } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { trackClicks } from '../../../../../lib/tracking';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const generateBanner = (classNames = '') => {
  return `
    <div class="${shared.ID}-banner ${classNames}">
      <div class="${shared.ID}-banner__inner">
        <span class="${shared.ID}-banner__close">&times;</span>
        <div class="${shared.ID}-banner__text">
          <h2>Existing customer?</h2>
          <h3>TP is better when you log in</h3>
          <p>Shop your branch prices and manage your account! Login or activate
            your account.</p>
        </div>
        <div class="${shared.ID}-banner__btns">
          <a class="${shared.ID}-banner__activate" href="/activate">Activate your account</a>
          <a class="${shared.ID}-banner__login" href="/login">Login</a>
        </div>
      </div>
    </div>
  `;
};

const removeExisting = () => {
  const banner = document.querySelector(`.${shared.ID}-banner`);
  if(banner) {
    banner.parentNode.removeChild(banner);
  }
};

const runMobileChanges = () => {
  removeExisting();

  const bannerHtml = generateBanner(`${ID}-mobile`);

  const header = document.querySelector('[data-test-id="header-control-bar"]');
  if(header) {
    header.insertAdjacentHTML('afterend', bannerHtml);

    events.send(`${ID}-${VARIATION}`, 'Show Banner', 'Mobile');
  }

  addEventListeners();
};

const runDesktopChanges = () => {
  removeExisting();

  const bannerHtml = generateBanner(`${ID}-desktop`);

  const header = document.querySelector('[class*="HeaderControlBar__ControlWrapper"]');
  if(header) {
    header.insertAdjacentHTML('afterend', bannerHtml);

    events.send(`${ID}-${VARIATION}`, 'Show Banner', 'Desktop');
  }

  addEventListeners();
};

const addEventListeners = () => {
  const close = document.querySelector(`.${ID}-banner__close`);
  if(close) {
    close.addEventListener('click', () => {
      localStorage.setItem(`${ID}-closed`, '1');

      events.send(`${ID}-${VARIATION}`, 'Click Close');

      removeExisting();
    });
  }

  const trackables = {
    'Activate Button': `.${ID}-banner__activate`,
    'Login Button': `.${ID}-banner__login`,
  };

  trackClicks(events, trackables, `${ID}-${VARIATION}`, 'Click');

  const activateButton = document.querySelector(`.${ID}-banner__activate`);
  const loginButton = document.querySelector(`.${ID}-banner__login`);

  if(activateButton) {
    activateButton.addEventListener('click', () => {
      const img = document.createElement('img');
      img.src="https://reporting.travisperkins.co.uk/cgi-bin/rr/images/blank.gif?clicked_activate_banner=yes";
    });
  }
  if(loginButton) {
    loginButton.addEventListener('click', () => {
      const img = document.createElement('img');
      img.src="https://reporting.travisperkins.co.uk/cgi-bin/rr/images/blank.gif?clicked_register_banner=yes";
    });
  }
};

const init = () => {
  if(window.location.pathname == '/' && !isLoggedIn() && !localStorage.getItem(`${ID}-closed`)) {
    // ---------------------------
    // Mobile
    // ---------------------------
    pollerLite([
      '[class*=MobileLayout__PageWrapper]'
    ], runMobileChanges);

    // ---------------------------
    // Desktop
    // ---------------------------
    pollerLite([
      '[class*=MainLayout__PageWrapper]'
    ], runDesktopChanges);
  }
};

export default () => {
  if(!isLoggedIn()) {
    init();

    // Poll and re-run init
    pollerLite([
      '#app-container',
    ], () => {
      const appContainer = document.querySelector('#app-container');

      // ------------------------------------
      // Added Poller:
      // Checks for page changes and checks to see if the URL has changed
      // ------------------------------------
      let oldHref = document.location.href;
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (oldHref != document.location.href) {
            removeExisting();

            oldHref = document.location.href;

            document.body.classList.remove(`${shared.ID}`);

            setTimeout(() => {
              // -----------------------------------
              // Timeout ensures router has started to rebuild DOM container
              // and we don't fire init() too early
              // -----------------------------------
              init();
            }, 2000);
          }
        });
      });

      const config = {
          childList: true,
          subtree: true
      };

      observer.observe(appContainer, config);
    });
  }
};
