/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';

const { ID, VARIATION } = shared;

const init = () => {
  const componentAlreadyExists = false;

  if (componentAlreadyExists) {
    return;
  }

  // Experiment Code...
  setup();

  fireEvent('Test Code Fired');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  if (VARIATION == 'control') {
    const targetStr = '.HomepageContentBlocks__BlocksWrapper-sc-1can8l0-1 >.Layout__GeneralBannerWrapper-sc-8kbh5q-2:first-child';
    document.body.addEventListener('click', (e) => {
      if (e.target.matches(targetStr) || e.target.closest(targetStr)) {
        fireEvent('User clicks on big trade deal promotion on homepage');
      }
    });

    return;
  }
  document.body.addEventListener('click', (e) => {
    const target = e.target;
    console.log(target);
    const targetConfig = {
      promoBanner: '.CallOutBlock__ContentContainer-sc-1ei68zk-2',
      shopAllTradeDealCTA: '[href="/product/big-trade-deals/c/1585031/"]',
      tradeDealItem: '.CallOutBlock__Link-sc-1ei68zk-3',
    };

    if (target.matches(targetConfig.promoBanner)) {
      fireEvent('User clicks on big trade deal promotion on homepage');
    } else if (target.matches(targetConfig.shopAllTradeDealCTA) && target.matches(targetConfig.tradeDealItem)) {
      fireEvent('User clicks shop all trade deals CTA');
    } else if (target.matches(targetConfig.tradeDealItem) && !target.matches(targetConfig.shopAllTradeDealCTA)) {
      fireEvent('User clicks an item on the new big trade deal section');
    }
  });

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  console.log('test');

  const isMobile = !!document.querySelector('.MobileLayout__PageWrapper-sc-17hsgm3-0');

  fetch('/content/big-trade-deals')
    .then((response) => response.text())
    .then((html) => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');

      const tradeDealImages = doc.querySelector('.StaticPagestyled__StaticContainersWr-sc-1tt1o7l-1');
      const parentElem = document.querySelector('[data-test-id="homepage-main"]');
      const contentRow = document.querySelector('.styled__CmsContainerHomepageMain-sc-8jr02q-7 > div:nth-child(6)');
      console.log(contentRow);
      const clonedContentRow = contentRow.cloneNode(true);
      parentElem.classList.add(`${ID}__parent`);
      if (document.querySelectorAll('.StaticPagestyled__StaticContainersWr-sc-1tt1o7l-1').length === 0) {
        if (isMobile) {
          clonedContentRow.classList.add(`${ID}__cloned--sec`);
          contentRow.classList.add(`${ID}__rearrengedRow`);
          parentElem.prepend(clonedContentRow);
          document.querySelector(`.${ID}__cloned--sec .SimpleRow__ContentRow-sc-gv2d8c-2:first-child`).style.display = 'none';
          document.querySelector(`.${ID}__rearrengedRow .SimpleRow__ContentRow-sc-gv2d8c-2:last-child`).style.display = 'none';
        }
        console.log(tradeDealImages);
        parentElem.prepend(tradeDealImages);
        parentElem.prepend(contentRow);

        fireEvent('Conditions Met');
      }
    })
    .catch((err) => {
      // There was an error
      console.warn('Something went wrong.', err);
    });
};

export default () => {
  init();

  // Poll and re-run init
  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
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
      subtree: true,
    };

    observer.observe(appContainer, config);
  });
};
