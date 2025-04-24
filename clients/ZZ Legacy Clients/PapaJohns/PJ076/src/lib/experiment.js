/**
 * PJ076 - Offer wizard - Food - (Mobile)
 * @author User Conversion
 */
import { setup, createOffersContainer, showHideContainers, bindEventOnCheckboxes, bindEventOnCtaButtons } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import settings from './settings';

const { ID, VARIATION } = settings;

const activate = () => {
  setup();

  // Experiment code
  const offerLists = document.querySelectorAll('.offers-m-cont');
  const secondListContent = offerLists[1].innerHTML;

  offerLists[0].insertAdjacentHTML('beforeend', secondListContent);
  offerLists[1].parentNode.removeChild(offerLists[1]);

  if (!document.querySelector(`.${settings.ID}-header__wrapper`)) {
    createOffersContainer();
  }
  showHideContainers();

  bindEventOnCheckboxes(offerLists[0]);

  bindEventOnCtaButtons();
};

export default activate;
