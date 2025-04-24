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
import filterWrapper from '../components/filterWrapper';
import modal from '../components/modal';
import { obsIntersection, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 1000;

const setActiveOption = (clickedItem) => {
  const selectedItem = clickedItem.querySelectorAll('[data-qaid="Selected-filter-option"]');
  const filterModal = document.querySelector("[aria-labelledby='Filters-label']");
  if (filterModal && filterModal.classList.contains(`${ID}__filterModalOpen`) && selectedItem && selectedItem.length > 0) {
    setTimeout(() => {
      selectedItem.forEach((selectItem) => {
        const isExistingItem = captureElementsContainingString(selectItem.textContent.trim());
        if (isExistingItem && isExistingItem.length) {
          isExistingItem[1].classList.add(`${ID}__active`);
        }
      });
    }, 1500);
  }
};

const captureElementsContainingString = (searchString) => {
  const elements = [...document.querySelectorAll('[data-qaid="filter-simple-option-name"]')]; //Get all elements as an array

  return elements.filter((el) => el.textContent.includes(searchString));
};

const controlSortOptionChange = (value) => {
  const select = document.querySelector('#mobileSort');
  select.value = value;
  select.dispatchEvent(new Event('change', { bubbles: true }));
};

const closeModal = () => {
  const sortByModal = document.querySelector(`.${ID}__sortByModal`);
  sortByModal.classList.remove(`${ID}__open`);
  sortByModal.classList.add(`${ID}__closing`);
};

const openModal = () => {
  const sortByModal = document.querySelector(`.${ID}__sortByModal`);
  sortByModal.classList.remove(`${ID}__closing`);
  sortByModal.classList.add(`${ID}__open`);
};

const handleIntersection = (entry) => {
  const sortFilterContainer = document.querySelector(`.${ID}__sort-filter-container`);
  if (entry.isIntersecting) {
    sortFilterContainer.classList.remove(`${ID}__show`);
  } else {
    sortFilterContainer.classList.add(`${ID}__show`);
  }
};

const handleObserver = (element) => {
  const intersectionAnchor = element;
  if (intersectionAnchor) {
    obsIntersection(intersectionAnchor, 0.4, handleIntersection);
  }
};

const init = () => {
  //check if page is correct
  const pageCondition = window.utag.data.basicPageId === 'lister Page'; //add page check conditions here based on experiment requirement

  if (!pageCondition) {
    //remove DOM element added by the experiment
    const sortModal = document.querySelectorAll(`.${ID}__modal`);
    if (sortModal.length > 0) {
      sortModal.forEach((modal) => modal.remove());
    }

    const filterWrapper = document.querySelectorAll(`.${ID}__sort-filter-container`);
    if (filterWrapper.length > 0) {
      filterWrapper.forEach((filter) => filter.remove());
    }

    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }

  setup();

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  fireEvent('Conditions Met');

  if (VARIATION === 'control') return;

  /*****add experiment specific code here*****/
  const targetPoint = document.body;
  const filterAppliedNumberElem = document.querySelector('[data-qaid="filter-open-button"] [data-qaid="filters-applied-number"]');
  const filterAppliedNumber = filterAppliedNumberElem ? filterAppliedNumberElem.textContent : '';
  if (!document.querySelector(`.${ID}__sort-filter-container`)) {
    targetPoint.insertAdjacentHTML('beforeend', filterWrapper(ID, filterAppliedNumber));
  }

  const select = document.querySelector('#mobileSort');
  const optionsArray = Array.from(select.options).map((option) => ({
    value: option.value,
    label: option.label,
  }));

  const params = new URLSearchParams(window.location.search);
  const sortBy = params.get('sort_by');

  if (!document.querySelector(`.${ID}__modal`)) {
    targetPoint.insertAdjacentHTML('beforeend', modal(ID, optionsArray, sortBy));
  }

  pollerLite(['[data-qaid="sortby"]'], () => {
    const sortByElem = document.querySelector('[data-qaid="sortby"]');
    const wrapper = sortByElem.parentElement.parentElement;
    handleObserver(wrapper);
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
    //check if page is correct
    if (window.utag.data.basicPageId !== 'lister Page') return;

    const { target } = e;

    if (target.closest('.sort-button')) {
      openModal();
    } else if (target.closest(`.${ID}__modal-overlay`)) {
      closeModal();
    } else if (target.closest(`.${ID}__sortOption`)) {
      const clickedItem = target.closest(`.${ID}__sortOption`);
      const { value } = clickedItem.dataset;
      const buttons = document.querySelectorAll(`.${ID}__modal-content button`);
      buttons.forEach((btn) => btn.classList.remove(`${ID}__active`));
      clickedItem.classList.add('active');
      controlSortOptionChange(value);
      closeModal();
    } else if (target.closest('.filter-button')) {
      window.isClickVar = true;
      const controlFilterButton = document.querySelector('[data-qaid="filter-open-button"]');
      if (controlFilterButton) controlFilterButton.click();
      pollerLite(["[aria-labelledby='Filters-label']"], () => {
        const filterModal = document.querySelector("[aria-labelledby='Filters-label']");
        if (filterModal) {
          filterModal.classList.remove(`${ID}__FilteModalClosing`);
          filterModal.classList.add(`${ID}__filterModalOpen`);
          window.isClickVar = false;
        }
      });
    } else if (target.closest('[data-qaid="filter-open-button"]') && !window.isClickVar) {
      pollerLite(["[aria-labelledby='Filters-label']"], () => {
        const filterModal = document.querySelector("[aria-labelledby='Filters-label']");
        if (filterModal) {
          filterModal.classList.add(`${ID}__filterModalOpenControl`);
        }
      });
    } else if (target.closest('[data-qaid="filters-mobile"]') && target.closest('header') && target.closest('button')) {
      const filterModal = document.querySelector("[aria-labelledby='Filters-label']");
      if (filterModal && filterModal.classList.contains(`${ID}__filterModalOpen`)) {
        filterModal.classList.remove(`${ID}__filterModalOpen`);
        filterModal.classList.add(`${ID}__FilteModalClosing`);
      } else if (filterModal.classList.contains(`${ID}__filterModalOpenControl`)) {
        filterModal.classList.remove(`${ID}__filterModalOpenControl`);
      }
    } else if (target.closest('li.uzgZl6')) {
      const clickedItem = target.closest('li.uzgZl6');
      setActiveOption(clickedItem);
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
