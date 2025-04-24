/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import { getReactStoreData, onUrlChange } from './helpers/utils';
import banner from './components/banner';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const init = () => {
  setup();
  getReactStoreData();
  //const { pageType } = window.blDataLayer;

  //if (pageType !== 'plp') return;

  //add page check conditions here
  fireEvent('Conditions Met');
  if (VARIATION === 'control') return;

  const anchorPoint = document.querySelector('header');
  if (!document.querySelector(`.${ID}__banner`)) {
    anchorPoint.insertAdjacentHTML('afterend', banner(ID));
  }
};

export default () => {
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control group` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || [];
  window.brainLabsExperimentID.push(blExpID);
  /*****Request from Screwfix*****/

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    //add click event conditions here
    if (target.closest(`.${ID}__banner-link`)) {
      fireEvent('Customer clicks the New in banner');
    }
  });

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(['#__next', '#__NEXT_DATA__', () => window.__NEXT_DATA__ !== undefined], () => {
      setTimeout(init, DOM_RENDER_DELAY);
    });
  });
};
