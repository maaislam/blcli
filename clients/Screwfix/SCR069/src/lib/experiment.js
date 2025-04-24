import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const init = () => {
  if (window.utag.data.basicPageId !== 'product page') return;

  setup();
  fireEvent('Conditions Met');
  if (VARIATION === 'control') {
    return;
  }

  pollerLite(['button#tab-2', 'button#tab-0'], () => {
    document.querySelector('button#tab-2').click();
    const reviewsCount = window.utag.data.prodReviews[0] ? window.utag.data.prodReviews[0] * 1 : null;
    if (reviewsCount <= 0) {
      console.log('🚀 ~ pollerLite ~ reviewsCount:', reviewsCount);
      setTimeout(() => {
        document.querySelector('button#tab-0').classList.add('empty');
      }, 1500);
    }
  });
};

export default () => {
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control group` : ID;
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

    if (target.closest('a[data-qaid="pdp-more-info-link"]')) {
      fireEvent('User interacts with view more anchor');
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

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
