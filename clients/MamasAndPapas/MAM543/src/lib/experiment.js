import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import shopbyGender from './components/shopbyGender';
import dropdownHandler from './handlers/dropdownHandler';

const { ID, VARIATION } = shared;

const init = () => {
  const controlShopByGender = document.getElementById('s-54067e80-ba8a-4044-b030-1c938082722d');
  const controlShopByGenderMobile = document.getElementById('s-bfa23f28-a9e1-4f26-bc53-58971b946c8b');
  const controlShopByTitleMobile = document.getElementById('s-bea79968-281b-429f-9c92-193e671bb9d8');
  const controlShopByGenderFirstParent = controlShopByGender.closest('.shg-box-vertical-align-wrapper');
  const controlShopByTitleMobileParent = controlShopByTitleMobile.closest('.shg-fw');
  controlShopByGenderFirstParent.classList.add(`${ID}__hide`);
  controlShopByGenderMobile.classList.add(`${ID}__hide`);
  controlShopByTitleMobileParent.classList.add(`${ID}__hide`);

  const shopbyGenderHTML = shopbyGender(ID);
  controlShopByGenderFirstParent.insertAdjacentHTML('afterend', shopbyGenderHTML);
};

export default () => {
  setup();

  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-PVM1K635XR';

  fireEvent('Conditions Met');

  if (VARIATION === 'control') return;

  init();

  dropdownHandler(ID);
};
