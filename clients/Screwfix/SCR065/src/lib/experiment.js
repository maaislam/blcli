import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const init = () => {
  document.documentElement.classList.remove(ID);
  document.documentElement.classList.remove(`${ID}-${VARIATION}`);

  if (window.utag.data.basicPageId !== 'lister Page') {
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);
    return;
  }

  setup();
  fireEvent('Conditions Met');
  if (VARIATION === 'control') return;
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
    if (window.utag.data.basicPageId !== 'lister Page') return;

    const { target } = e;

    if (target.closest('button[data-qaid="button-click-and-collect"]') && target.closest('div[data-qaid="product-card"]')) {
      fireEvent('Customer clicks Click and collect or delivery specifically on a PLP page');
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(['#__next', () => window.utag !== undefined, () => window.__NEXT_DATA__ !== undefined], () => {
      setTimeout(init, DOM_RENDER_DELAY);
    });
  });
};
