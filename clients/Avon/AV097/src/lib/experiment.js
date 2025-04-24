/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from './shared';
import { promotionSection, promotionTile } from './newContent';
import { poller } from '../../../../../lib/utils';
import obsIntersection from './observeIntersection';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  const tiles = document.getElementById('shopify-section-1635510569cde3d0a3').getElementsByClassName('featured-images__product');

  const giftTile = tiles[tiles.length - 1];
  const adjustTileHeight = () => {
    const tileHeight = tiles[1].clientHeight;

    giftTile.style.height = `${tileHeight - 9}px`;
  };

  giftTile.innerHTML = promotionTile;
  // const colRight = giftTile.closest('.featured-images__holder-row');
  // const colLeft = colRight.previousElementSibling;

  // colRight.prepend(colLeft.lastElementChild);
  // colLeft.prepend(colRight.lastElementChild);
  tiles[0].closest('.featured-images__holder-row').prepend(giftTile);
  var timesRun = 0;
  const interval = setInterval(() => {
    timesRun += 1;
    if (timesRun === 60) {
      clearInterval(interval);
    }
    adjustTileHeight();
  }, 1000);

  //adjustTileHeight();

  window.addEventListener('resize', adjustTileHeight);

  document.querySelector(`.${ID}-promotion__tile`).addEventListener('click', () => {
    fireEvent('Click -  returning user sample category tiles');
  });
  //}
  const anchor = document.querySelector(`.${ID}-promotion__tile`);
  const callbackFn = (entry) => {
    if (entry.isIntersecting) {
      fireEvent('Conditions Met');
    }
  };

  obsIntersection(anchor, 1, callbackFn);
};
