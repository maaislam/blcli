import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import trustpilotRatings from '../components/trustpilotRatings';
import { isMobile } from '../helpers/utils';

const { ID, VARIATION } = shared;

const init = () => {
  if (!window.location.pathname.includes('/tc/basket')) {
    document.querySelectorAll(`.${ID}__trustpilotContainer`).forEach((el) => el?.remove());
    return;
  }
   
  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  if (VARIATION == '1') {
    const mobileHeaderBar = document.querySelector('[class^="styled__BasketHeaderMobileWrapper"]');
    const desktopHeaderBar = document.querySelector('[class^="styled__SecureHeaderWrapper"]');
    const anchorPoint = isMobile() ? mobileHeaderBar : desktopHeaderBar;
    if (!document.querySelector(`.${ID}__trustpilotContainer`)) {
      anchorPoint.insertAdjacentHTML('beforebegin', trustpilotRatings(ID, '3,791'));
    }
  } else if (VARIATION == '2') {
    const desktopAnchorPoint = document.querySelector('[data-test-id="pay-button"]');
    const mobileAnchorPoint = document.querySelector('[data-test-id="basket-totals-order-hub"] div');
    const anchorPoint = isMobile() ? mobileAnchorPoint : desktopAnchorPoint;
    const anchorPosition = isMobile() ? 'beforeend' : 'beforebegin';
    if (!document.querySelector(`.${ID}__trustpilotContainer`)) {
      anchorPoint.insertAdjacentHTML(anchorPosition, trustpilotRatings(ID, '3,791'));
    }
  }
};

export default () => {
  setup();
  init();

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__trustpilotContainer`)) {
      fireEvent('User interacts with banner');
    }
  });

  // Poll and re-run init
  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');
    let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function () {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;
          document.body.classList.remove(`${shared.ID}`);

          setTimeout(() => {
            init();
          }, 1000);
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
