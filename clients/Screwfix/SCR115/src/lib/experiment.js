import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import uspsWrapper from './components/uspsWrapper';
import modal from './components/modal';
import { isScrolledIntoView, onUrlChange } from './helpers/utils';
import handleKeydown from './handlers/handleKeydown';
import openModal from './helpers/openModal';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 1000;

const init = () => {
  //check if page is correct
  const pageCondition = window.utag.data.basicPageId === 'product page'; //add page check conditions here based on experiment requirement

  //remove DOM element added by the experiment
  const element = document.querySelector(`.${ID}__uspsWrapper`);
  if (element) element.remove();

  const descriptionWrapper = document.querySelector(`.${ID}__descriptionWrapper`);
  if (descriptionWrapper) descriptionWrapper.remove();

  const modalElem = document.querySelector(`.${ID}__modal`);
  if (modalElem) modalElem.remove();
  
  if (!pageCondition) {

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
  const productOverviewElement = document.querySelector('[data-qaid="pdp-product-overview"]');
  const wrapper = productOverviewElement.closest('div');
  const cloneWrapper = wrapper.cloneNode(true);
  cloneWrapper.classList.add(`${ID}__descriptionWrapper`);

  const productsBulletsElement = document.querySelectorAll('[data-qaid="pdp-product-bullets"] li');
  const list = [];
  productsBulletsElement.forEach((item, index) => {
    if (index <= 2) {
      list.push(item.textContent);
    }
  });

  if (!document.querySelector(`.${ID}__uspsWrapper`)) {
    productOverviewElement.insertAdjacentHTML('beforebegin', uspsWrapper(ID, list));
  }

  pollerLite(['#tabpanel-2', '#tab-2'], () => {
    const tabContent = document.querySelector('#tab-2');
    tabContent.querySelectorAll('span').forEach((item) => {
      item.textContent = 'Product Details';
    });
    const tabPanel = document.querySelector('#tabpanel-2');
    const tableElement = tabPanel.querySelector('table');
    const colunmHeaderElem = tableElement.querySelector('thead th[role="columnheader"]');
    const detailsWrapper = tableElement.closest('div');
    detailsWrapper.classList.add(`${ID}__detailsWrapper`);

    colunmHeaderElem.textContent = 'Product details';
    if (!detailsWrapper.querySelector(`.${ID}__descriptionWrapper`)) {
      tableElement.insertAdjacentElement('beforebegin', cloneWrapper);
    }

    if (VARIATION === '2' && !document.querySelector(`.${ID}__modal`)) {
      document.body.insertAdjacentHTML('beforeend', modal(ID));
      const cloneDetailsWrapper = detailsWrapper.cloneNode(true);
      document.querySelector(`.${ID}__modal-content`).innerHTML = cloneDetailsWrapper.outerHTML;
    }
  });

  handleKeydown(ID, VARIATION);
};

export const closeModal = () => {
  fireEvent('Users closing the lightbox');
  const modal = document.querySelector(`.${ID}__modal`);
  const modalContainer = document.querySelector(`.${ID}__modal-container`);

  modal.classList.add(`${ID}__closing`);
  modal.classList.remove(`${ID}__open`);
  modalContainer.setAttribute('tabindex', '-1');
  modalContainer.setAttribute('aria-modal', 'false');

  // Restore focus to the last active element
  if (window.lastActiveElement) {
    window.lastActiveElement.focus();
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
    //if (window.utag.data.basicPageId !== 'lister Page') return;
    const pageCondition = window.utag.data.basicPageId === 'product page';
    if (!pageCondition) return;

    const { target } = e;

    if (target.closest(`.${ID}__more-product-details`) && VARIATION === '1') {
      fireEvent('Users tapping More Info');
      const moreInfoElement = document.querySelector('[data-qaid="pdp-more-info-link"]');
      moreInfoElement.click();
    } else if (target.closest(`.${ID}__more-product-details`) && VARIATION === '2') {
      openModal(ID);
    } else if (target.closest(`.${ID}__modal-overlay`) || target.closest(`.${ID}__closeWrapper`)) {
      closeModal();
    } else if (target.closest('[data-qaid="pdp-button-deliver"]')) {
      fireEvent('Users adding to bag');
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

  const scrollHandler = () => {
    const pageCondition = window.utag.data.basicPageId === 'product page';
    if (!pageCondition) return;

    const detailsWrapper = document.querySelector(`.${ID}__detailsWrapper`);
    if (detailsWrapper && isScrolledIntoView(detailsWrapper) && !document.body.classList.contains(`${ID}__scrollConditionMet`)) {
      fireEvent('Users scroll to the specs tab');
      document.body.classList.add(`${ID}__scrollConditionMet`);
    }
  };

  window.removeEventListener('scroll', scrollHandler);
  window.addEventListener('scroll', scrollHandler);
};
