/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { variationOneData, variationTwoData } from './data/quickLinks';
import { quickCategory } from './components/quickCategory';
import { onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const init = () => {
  const quickLinksData = VARIATION === '1' ? variationOneData : variationTwoData;
  const mainContainerElement = document.querySelector('#container-main');
  if (document.querySelector(`.${ID}__quickCategoryLinks`)) {
    document.querySelector(`.${ID}__quickCategoryLinks`).remove();
  }

  mainContainerElement && mainContainerElement.insertAdjacentHTML('afterbegin', quickCategory(ID, quickLinksData));
};

export default () => {
  setup();
  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest(`.${ID}__item`)) {
      fireEvent('User interacts with quick links');
    }
  });

  setTimeout(init, DOM_RENDER_DELAY);

  onUrlChange(() => {
    pollerLite(['#__next', '#__NEXT_DATA__', () => window.__NEXT_DATA__ !== undefined], () => {
      setTimeout(init, DOM_RENDER_DELAY);
    });
  });
};
