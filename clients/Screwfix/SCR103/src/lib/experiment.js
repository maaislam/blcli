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
import bannerWrapper from './components/bannerWrapper';
import { fetchSkus, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 500;

const getFirstWord = (str) => {
  return str.split(' ')[0];
};

const init = () => {
  //check if page is correct
  const pageCondition = window.utag.data.basicPageId === 'home' && window.utag.data?.basicLoggedIn.toLocaleLowerCase() !== 'no'; //add page check conditions here based on experiment requirement

  if (!pageCondition) {
    document.querySelectorAll(`.${ID}__bannerWrapper`).forEach((element) => {
      element.remove();
    });

    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/
  fireEvent('Conditions Met');

  if (VARIATION === 'control') {
    setup();
    return;
  }
  /*****add experiment specific code here*****/
  // if (document.referrer === 'https://my.screwfix.com/' && loggedIn) {
  //   window.location.href = '/jsp/account/allPurchasesPage.jsp';
  // }
  const getUrl =
    window.utag.data?.basicLoggedIn.toLocaleLowerCase() !== 'no' ? '/jsp/account/allPurchasesPage.jsp' : '/loginpage';
  const mainContainer = document.querySelector('#container-main');
  const userNameElement = document.querySelector('#username-label') || document.querySelector('#username-label-mobile');
  const userName = getFirstWord(userNameElement?.textContent.trim());

  fetchSkus()
    .then((skus) => {
      if (skus.length === 0) return;
      setup();
      if (!document.querySelector(`.${ID}__bannerWrapper`) && window.utag.data.basicPageId === 'home') {
        mainContainer.insertAdjacentHTML('afterbegin', bannerWrapper(ID, getUrl, userName, VARIATION));
        fireEvent('Banner seen by user');
      }
    })
    .catch((error) => {
      console.log('Error:', error);
      document.querySelectorAll(`.${ID}__bannerWrapper`).forEach((element) => {
        element.remove();
      });
    });
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

    const pageCondition = window.utag.data.basicPageId === 'home';

    if (!pageCondition) return;

    if (target.closest(`.${ID}__button`)) {
      fireEvent('User interacts with CTA');
    } else if (target.closest('[data-qaid="header-account"] a[href="/jsp/account/allPurchasesPage.jsp"]')) {
      fireEvent('User interacts with previous purchases in the drowp down');
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  //setTimeout(init, DOM_RENDER_DELAY);
  init();

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(
      [
        () => typeof window.tealiumDataLayer === 'object',
        () => window.utag !== undefined,
        () => window.__NEXT_DATA__ !== undefined,
        '[data-qaid="header-bottom-merchArea-0"]',
      ],
      () => {
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
