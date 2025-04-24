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

import { obsIntersection, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const init = () => {
  setup();

  if (window.utag.data.basicPageType !== 'Product') {
    return;
  }

  fireEvent('Conditions Met');
  if (VARIATION === 'control') return;

  const intersectionHandler = (entry) => {
    //console.log('🚀 ~ intersectionHandler ~ entry:', entry);
    if (entry.isIntersecting) {
      fireEvent('User scrolls to see review');
    }
  };

  obsIntersection(document.querySelector('[data-bv-show="reviews"]'), 0.2, intersectionHandler);
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
    const { target } = e;

    if (target.closest('[data-qaid="pdp-best-seller-container"]') && target.closest('a')) {
      const pdpUrl = target.closest('a').getAttribute('href');
      fireEvent(`FB item clicked - ${pdpUrl}`);
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(['#__next', () => window.utag !== undefined, () => window.__NEXT_DATA__ !== undefined], () => {
      setTimeout(init, DOM_RENDER_DELAY);
    });
  });
};
