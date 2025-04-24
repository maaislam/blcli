/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import wrapper from './components/wrapper';
import { onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 1000;
let lastScrollTop = 0; // Tracks the previous scroll position
let isScrolling = false;
let actionDone = false;

const init = () => {
  const pageCondition =
    (window.utag.data.basicPageId === 'lister Page' ||
      window.utag.data.basicPageId === 'home' ||
      window.utag.data.basicPageId === 'product page' ||
      window.utag.data.basicPageId === 'category') &&
    window.utag.data.basicLoggedIn.toLocaleLowerCase() === 'no';

  if (!pageCondition) {
    const element = document.querySelector(`.${ID}__wrapper`);
    if (element) element.remove();

    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }

  setup();

  // Ensure the test doesn't run again if the user has already seen
  const sessionKey = `${ID}__page`;
  if (window.sessionStorage.getItem(sessionKey)) {
    return;
  }

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  fireEvent('Conditions Met');

  if (VARIATION === 'control') return;

  /*****add experiment specific code here*****/
  const headerElement = document.querySelector('[data-qaid="header-account"]  a[href="/loginpage"]');
  if (headerElement && !document.querySelector(`.${ID}__wrapper`)) {
    headerElement.insertAdjacentHTML('beforeend', wrapper(ID));
    window.sessionStorage.setItem(sessionKey, 'true');
  }
  window.removeEventListener('scroll', scrollHandler);

  const onScrollStart = (direction) => {
    if (actionDone) return;

    if (!window.hideLoginPrompt) {
      document.querySelector(`.${ID}__wrapper`).style.display = 'flex';
    }

    if (direction === 'down' || document.querySelector('.CeOuIC')) {
      document.querySelector(`.${ID}__wrapper`).style.display = 'none';
    }

    actionDone = true;

    isScrolling = false;
    actionDone = false;
  };

  const scrollHandler = () => {
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

    if (!isScrolling) {
      const direction = currentScrollTop > lastScrollTop ? 'down' : 'up';
      onScrollStart(direction);
    }

    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 100);

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Prevent negative scroll values
  };

  window.addEventListener('scroll', scrollHandler);
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

  const clickHandler = (e) => {
    const { target } = e;

    if (target.closest('[data-qaid="header-account"] a[href="/loginpage"]')) {
      fireEvent('User interacts with Account CTa');
    } else if (target.closest(`.${ID}__signIn`)) {
      fireEvent('User interacts with log in CTA');
    } else if (target.closest(`.${ID}__register`)) {
      fireEvent('User interacts with register cta');
    }

    if (document.querySelector(`.${ID}__wrapper`)) {
      document.querySelector(`.${ID}__wrapper`).style.display = 'none';
      window.hideLoginPrompt = true;
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  window.hideLoginPrompt = false;

  setTimeout(init, DOM_RENDER_DELAY);

  onUrlChange(() => {
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
