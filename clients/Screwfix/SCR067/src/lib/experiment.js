import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;
const PROMO_BANNER_POSITION = 200;

let lastScrollTop = 0;
let scrollListener = null;

let eventFired = false;

const init = () => {
  const isMobile = () => {
    //using the user agent to detect mobile devices
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  if (window.utag.data.basicPageId !== 'product page' || !isMobile()) {
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }

  setup();

  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';

  fireEvent('Conditions Met');

  if (VARIATION === 'control') {
    return;
  }

  const promobanner = document.querySelector('[data-qaid="header-bottom-merchArea-0"]');

  const clonedPromoBanner = promobanner ? promobanner.cloneNode(true) : null;

  const clonedPromoBannerV2 = promobanner ? promobanner.cloneNode(true) : null;

  if (clonedPromoBanner) {
    clonedPromoBanner.classList.add('cloned-promo-banner');
  }

  const detectScrollDirection = () => {
    scrollListener = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      const siteNav = document.querySelector('header > .CeOuIC');

      if (scrollTop <= PROMO_BANNER_POSITION) {
        document.querySelector('.cloned-promo-banner')?.remove();
        if (siteNav) {
          siteNav.style.visibility = 'visible';
        }
      }

      if (!siteNav) return;
      if (scrollTop > lastScrollTop) {
        siteNav.style.visibility = 'hidden';
        //remove the cloned promo banner
        if (siteNav.querySelector('[data-qaid="header-bottom-merchArea-0"]') && VARIATION !== '2') {
          siteNav.querySelector('.cloned-promo-banner').remove();
        }

        if (VARIATION === '2') {
          //render the cloned promo banner
          if (!siteNav.querySelector('[data-qaid="header-bottom-merchArea-0"]') && scrollTop > PROMO_BANNER_POSITION) {
            document.body.insertAdjacentElement('afterbegin', clonedPromoBannerV2);
            clonedPromoBannerV2.classList.add('cloned-promo-banner-v2');
          }
        }
      } else if (scrollTop <= lastScrollTop) {
        //scrolling up

        //fire a event once per page
        if (!eventFired) {
          fireEvent('Customer scrolls up and triggers the sticky header');
          eventFired = true;
        }

        siteNav.style.visibility = 'visible';
        //render the cloned promo banner
        if (!siteNav.querySelector('[data-qaid="header-bottom-merchArea-0"]') && clonedPromoBanner) {
          siteNav.insertAdjacentElement('beforeend', clonedPromoBanner);
        }
        if (VARIATION === '2') {
          document.querySelector('.cloned-promo-banner-v2')?.remove();
          //render the cloned promo banner
        }
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    };

    window.addEventListener('scroll', scrollListener, false);
  };

  const removeScrollListener = () => {
    if (scrollListener) {
      window.removeEventListener('scroll', scrollListener, false);
      scrollListener = null;
    }
  };
  removeScrollListener();
  detectScrollDirection();
};
export default () => {
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || '';
  if (window.brainLabsExperimentID) {
    window.brainLabsExperimentID += `,${blExpID}`;
  } else {
    window.brainLabsExperimentID = blExpID;
  }

  /*****Request from Screwfix*****/

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    eventFired = false;
    pollerLite(
      [
        () => typeof window.tealiumDataLayer === 'object',
        () => window.utag !== undefined,
        () => window.__NEXT_DATA__ !== undefined,
      ],
      () => {
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
