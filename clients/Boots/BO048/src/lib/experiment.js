import {
  observer,
  pollerLite
} from '../../../../../lib/utils';
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import {
  setup
} from './services';
import shared from './shared';

export default () => {
  setup();

  const {
    ID,
    VARIATION
  } = shared;

  if(VARIATION === '1' || VARIATION === '2') {

  let placeholderText;
  let title;
  let subtitle;

  if (VARIATION === '1') {
    placeholderText = 'Enter medicine name';
    title = 'Search for medication';
    subtitle = 'Find prescription item';
  }

  if (VARIATION === '2') {
    placeholderText = 'Search here';
    title = 'Tell us the prescription item';
    subtitle = 'Enter medicine or item name';
  }

  const searchChanges = () => {
    const searchContainer = document.querySelector('.searchContainer');
    searchContainer.querySelector('h1').textContent = title;
    searchContainer.querySelector('.searchInputFieldContainer input').setAttribute('placeholder', placeholderText);

    searchContainer.querySelector('.searchInputContainer').insertAdjacentHTML('beforebegin', `<p class="${ID}-subtitle">${subtitle}</p>`);

  }
  searchChanges();

  }

  const addTracking = () => {
    window.cmCreateManualLinkClickTag(`/BO048?cm_sp=PharmacyMedSearch-_-BO048-${VARIATION}-_-DHP`);

    document.body.addEventListener('click', (e) => {
      var btn = e.target;
      if (btn.className.match(/styles-module__selectItem/)) {
        window.cmCreateManualLinkClickTag(`/BO048?cm_sp=ClickedSelectItem-${VARIATION}-_-BO048-${VARIATION}-_-DHP`);
      } else if (btn.className.match(/styles-module__blueButton--1BjFl/)) {
        window.cmCreateManualLinkClickTag(`/BO048?cm_sp=ClickedAddToBasket-${VARIATION}-_-BO048-${VARIATION}-_-DHP`);
      }
    });
  }
  addTracking();
};
