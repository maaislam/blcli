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
import banner from './components/banner';
import modal from './components/modal';
import plpContent from './components/plpContent';
import categoryData from './data/data';
import clickHandler from './helpers/clickHandler';
import { activateSearchFunctionality, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 1000;

const addInputListener = (modalInputElement) => {
  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const searchValue = modalInputElement.value.trim();
      if (searchValue) {
        activateSearchFunctionality(searchValue);
      }
    }
  };

  modalInputElement.removeEventListener('keydown', (event) => handleSearchSubmit(event));
  modalInputElement.addEventListener('keydown', (event) => handleSearchSubmit(event));
};

// Function to update a CSS variable
const updateSteps = (id, data) => {
  data.forEach((step, index) => {
    const stepKey = `step${index + 1}`; // Determine the step key (e.g., step1, step2, step3)
    const attrValue = step[stepKey]?.attr || ''; // Extract the attr value

    const stepElement = document.querySelector(`.${id}__select.item-${index === 0 ? 'one' : index === 1 ? 'two' : 'three'}`);
    if (stepElement) {
      const span = stepElement.querySelector(`span.${id}__text`);
      if (span) {
        span.textContent = attrValue;
      }
    }
  });
};

const init = () => {
  //check if page is correct
  const pageCondition =
    window.utag.data.basicPageId === 'home' ||
    window.utag.data.basicPageId === 'lister Page' ||
    window.utag.data.basicPageId === 'Search Results: Successful' ||
    window.utag.data.basicPageId === 'product page';

  let pageType = window.utag.data.basicPageId;
  if (pageType.toLowerCase().includes('page')) {
    pageType = pageType.replace(/page/i, '');
  }

  const modalElem = document.querySelectorAll(`.${ID}__modal`);
  if (modalElem) modalElem.forEach((modelEl) => modelEl.remove());

  const plpContentElement = document.querySelectorAll(`.${ID}__plpContent`);
  if (plpContentElement) plpContentElement.forEach((el) => el.remove());

  const bannerEl = document.querySelectorAll(`.${ID}__banner`);
  if (bannerEl) bannerEl.forEach((el) => el.remove());

  if (!pageCondition) {
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

  const homePageBanner = document.querySelector('[data-qaid="header-bottom-merchArea-0"]');
  const targetElement = document.querySelector('[data-qaid="related-searches-banner"]');
  const navElement = document.querySelector('nav[aria-label="Breadcrumb"]');
  const selectedData = JSON.parse(window.sessionStorage.getItem(`${ID}__selectedData`));

  setup();
  fireEvent('Conditions Met');
  if (VARIATION === 'control') return;

  /*****add experiment specific code here*****/

  if (!document.querySelector(`.${ID}__modal`)) {
    homePageBanner.insertAdjacentHTML('afterend', modal(ID, categoryData));
    window[`${ID}__data`] = categoryData;
  }

  if (selectedData) {
    fireEvent(`User sees the “Shop a job” module in ${pageType} page`);
    if (targetElement) {
      targetElement?.insertAdjacentHTML('afterbegin', plpContent(ID));
    } else if (navElement) {
      navElement.insertAdjacentHTML('afterend', plpContent(ID, `${ID}__noSearchResult`));
    } else {
      homePageBanner.insertAdjacentHTML('afterend', plpContent(ID, `${ID}__homeontent`));
    }
    updateSteps(ID, selectedData);
  } else {
    fireEvent(`User sees the “Shop a job” module in ${pageType} page`);

    if (targetElement) {
      targetElement.insertAdjacentHTML('afterbegin', banner(ID));
    } else if (navElement) {
      navElement.insertAdjacentHTML('afterend', banner(ID));
    } else {
      homePageBanner.insertAdjacentHTML('afterend', banner(ID));
    }
  }

  const modalInputElement = document.querySelector(`.${ID}__modal .search-input`);
  modalInputElement && addInputListener(modalInputElement);
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
  document.body.removeEventListener('click', (e) => clickHandler(e, ID));
  document.body.addEventListener('click', (e) => clickHandler(e, ID));

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
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
