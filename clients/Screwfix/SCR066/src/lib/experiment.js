import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const init = () => {
  const isMobile = () => {
    //using the user agent to detect mobile devices
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  if (window.utag.data.basicPageId !== 'product page' || !isMobile()) {
    if (document.querySelector(`.${ID}__priceSection`)) {
      document.querySelector(`.${ID}__priceSection`).remove();
    }
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }

  setup();
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';

  fireEvent('Conditions Met');

  if (VARIATION === 'control') {
    return;
  }

  const targetElement = document.querySelector('div[data-bv-show="rating_summary"]').parentElement;
  const priceArea = document.querySelector('div[data-qaid="product-price"]').parentElement.cloneNode(true);
  if (document.querySelector(`.${ID}__priceSection`)) {
    document.querySelector(`.${ID}__priceSection`).remove();
  }

  targetElement && targetElement.insertAdjacentElement('afterend', priceArea);
  priceArea.classList.add(`${ID}__priceSection`);
  targetElement.classList.add(`${ID}__reviewSection`);

  if (VARIATION === '2') {
    window.scrollBy(0, 220);
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

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(
      [
        '[data-bv-show="rating_summary"]',
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
