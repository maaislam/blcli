/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, isLoggedIn } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events, getCookie } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const getMarkup = () => {
  return `
    <div class="${ID}-login-prompt">
      <img src="http://sb.monetate.net/img/1/581/3278956.png">
      <p>
        Existing account holders should 
        <a class="${ID}-login-link" href="/login">log in</a>
        for their trade prices
      </p>
    </div>
  `;
};

const mobileChanges = () => {
  const price = document.querySelector('[data-test-id="pdp-wrapper"] [class*=ProductDetailMobile__PriceWr]');
  if(price) {
    price.insertAdjacentHTML('beforeend', getMarkup());
  }
};

const desktopChanges = () => {
  const desktopWrapper = document.querySelector('[data-test-id="pdp-wrapper"] [class*=ProductDetailDesktop__Wrapper]');
  if(desktopWrapper) {
    desktopWrapper.insertAdjacentHTML('afterbegin', getMarkup());
  }
};

const homePageRedirect = () => {
  const lastItemSku = sessionStorage.getItem(`${shared.ID}-clicked-login`);
  if (lastItemSku) {
    sessionStorage.removeItem(`${shared.ID}-clicked-login`);
    window.location = `/p/${lastItemSku}`;
  }
};

const init = () => {
  const experimentElement = document.querySelectorAll(`.${ID}-login-prompt`);

  if (experimentElement.length) {
    [].forEach.call(experimentElement, elm => {
      elm.parentNode.removeChild(elm);
    });

    document.documentElement.classList.remove(`${shared.ID}`);
  }

  document.documentElement.classList.add(`${shared.ID}`);

  // Run redirect after login code
  pollerLite(["[class*=HomePageDesktop__HomePageBody]"], () => {
    if (
      getCookie("access_token") &&
      sessionStorage.getItem(`${shared.ID}-clicked-login`)
    ) {
      homePageRedirect();
    }
  });

  // Run redirect after login on mobile
  pollerLite([
    "[class*=HomePageMobile__HomePageBody]"
  ], () => {
    if (getCookie("access_token") && sessionStorage.getItem(`${shared.ID}-clicked-login`)) {
      homePageRedirect();
    }
  })

  if(!getCookie('access_token')) {
    // Run changes
    pollerLite([
      '[data-test-id="pdp-wrapper"]',
      () => {
        return document.querySelector('[class*=MobileLayout__PageWrapper]')
          || document.querySelector('[class*=MainLayout__PageWrapper]');
      },
    ], () => {
      if(document.querySelector('[class*=MobileLayout__PageWrapper]')) {
        mobileChanges();
      } else if(document.querySelector('[class*=MainLayout__PageWrapper]')) {
        desktopChanges();
      }

      [].forEach.call(document.querySelectorAll(`.${shared.ID}-login-link`), l => {
        l.addEventListener('click', e => {
          events.send(`${ID}`, 'clicked-login-link');

          sessionStorage.setItem(`${shared.ID}-clicked-login`, window.products?.[0]?.sku);
        });
      });
    });
  }
};

export default () => {
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
};
