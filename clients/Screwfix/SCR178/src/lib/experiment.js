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
import { categoryWrapper } from './components/categoryWrapper';
import { onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 1000;

const collectCategoryData = () => {
  const allCategoryOption = document.querySelectorAll('[data-qaid="category-list-option"]');
  const allCategoryOptionArray = Array.from(allCategoryOption).map((categoryOption) => {
    const element = categoryOption.querySelector('[data-qaid="category-option"] > div').cloneNode(true);
    const categoryNameElement = categoryOption.querySelector('[data-qaid="category-name"]');
    const categoryName = categoryNameElement ? categoryNameElement.innerText : null;

    return {
      element,
      categoryName,
    };
  });

  return allCategoryOptionArray;
};

const renderCategoryOption = (data) => {
  const targetPoint = document.querySelector('nav[aria-label="Breadcrumb"]');

  if (!document.querySelector(`.${ID}__categoryWrapper`)) {
    targetPoint.insertAdjacentHTML('afterend', categoryWrapper(ID, data));
  }
};

const captureElementsContainingString = (searchString) => {
  const elements = [...document.querySelectorAll(`button:not(.${ID}__categoryOption) [data-qaid="category-name"]`)]; //Get all elements as an array

  return elements.filter((el) => el.textContent.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()));
};

const init = () => {
  //check if page is correct
  const pageCondition = window.utag.data.basicPageId === 'lister Page'; //add page check conditions here based on experiment requirement

  if (!pageCondition) {
    //remove DOM element added by the experiment
    const element = document.querySelectorAll(`.${ID}__categoryWrapper`);
    if (element) {
      element.forEach((el) => {
        el.remove();
      });
    }

    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }

  /*****add experiment specific code here*****/
  if (window.location.pathname === '/c/tools/drills/cat830704') {
    /*****this enabled GA4****/
    newEvents.initiate = true;
    newEvents.methods = ['ga4'];
    newEvents.property = 'G-74MS9KFBCG';
    /*****this enabled GA4****/

    setup();
    fireEvent('Conditions Met');
    if (VARIATION === 'control') return;

    const data = collectCategoryData();
    if (data.length > 0) {
      renderCategoryOption(data);
    }
  }
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
    //check if page is correct
    if (window.utag.data.basicPageId !== 'lister Page') return;

    const { target } = e;

    if (target.closest(`.${ID}__categoryOption`)) {
      const clickedItem = target.closest(`.${ID}__categoryOption`);
      const categoryName = clickedItem.getAttribute('data-name');
      if (captureElementsContainingString(categoryName).length > 0) {
        const controlCategory = captureElementsContainingString(categoryName)[0].closest('button');
        if (controlCategory) controlCategory.click();
      }
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

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
