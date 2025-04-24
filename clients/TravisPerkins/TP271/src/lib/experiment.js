import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import reviewWithRatings from './components/reviewWithRatings';
import trustpilotRatings from './components/trustpilotRatings';

import { isMobile } from './helpers/utils';

const { ID, VARIATION } = shared;

const init = () => {
  if (!window.location.pathname.includes('/cart')) {
    document.querySelectorAll(`.${ID}__trustpilotContainer`).forEach((el) => el?.remove());
    return;
  }

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  if (VARIATION == '1') {
    const mobileHeaderBar = document.querySelector('[data-test-id="header-control-bar"]');
    const desktopHeaderBar = document.querySelector('[data-test-id="header-nav-menu"]');
    const anchorPoint = isMobile() ? mobileHeaderBar : desktopHeaderBar;
    const anchorPosition = isMobile() ? 'afterend' : 'afterend';
    anchorPoint.insertAdjacentHTML(anchorPosition, trustpilotRatings(ID, '3,791'));
  } else if (VARIATION == '2' || VARIATION == '3') {
    const anchorPoint = document.querySelector('[data-test-id="total-section"]');
    const html = VARIATION == '2' ? trustpilotRatings(ID, '3,791') : reviewWithRatings(ID, '3,791');
    anchorPoint.insertAdjacentHTML('beforeend', html);
  }
};

export default () => {
  // newEvents.initiate = true;
  // newEvents.methods = ['ga4'];
  // newEvents.property = 'G-6EM3847CY9';

  setup();
  init();

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__trustpilotContainer`) || target.closest(`.${ID}__reviewWrapper`)) {
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
