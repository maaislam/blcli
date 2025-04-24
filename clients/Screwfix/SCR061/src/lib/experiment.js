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
import { variationOneData, variationTwoData } from './data/quickLinks';
import { quickCategory } from './components/quickCategory';
import { onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const init = () => {
  if (window.location.pathname !== '/') {
    if (document.querySelector(`.${ID}__quickCategoryLinks`)) {
      document.querySelector(`.${ID}__quickCategoryLinks`).remove();
    }

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

  if (VARIATION == 'control') {
    fireEvent('Conditions Met');
    return;
  }
  const quickLinksData = VARIATION === '1' ? variationOneData : variationTwoData;
  const mainContainerElement = document.querySelector('#container-main');
  if (document.querySelector(`.${ID}__quickCategoryLinks`)) {
    document.querySelector(`.${ID}__quickCategoryLinks`).remove();
  }

  mainContainerElement && mainContainerElement.insertAdjacentHTML('afterbegin', quickCategory(ID, quickLinksData));
  fireEvent('Conditions Met');
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
