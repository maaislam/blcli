/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { fireEvent, setup } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import { pollerLite } from '../../../../../lib/uc-lib';
import { onUrlChange } from './helpers/utils';
import { toolTipWrapper } from './components/toolTipWrapper';

const { ID, VARIATION } = shared;

const DOM_RENDER_DELAY = 2000;

const validPlps = ['/c/electrical-lighting/switches-sockets/cat830530', '/c/auto-cleaning/pressure-washers/cat810150'];

const isValidPlp = () => validPlps.some((plp) => window.location.pathname.includes(plp));

const init = () => {
  if (!isValidPlp()) return;
  setup();

  // -----------------------------
  // Write experiment code here
  // -----------------------------

  //console.log(VARIATION,"variation")

  pollerLite(['[data-qaid="product-grid"]'], () => {
    const firstProduct = document.querySelector('[data-qaid="product-card"]');

    const isMobile =
      document.querySelector('[data-qaid="banners-mobile"]') || document.querySelector('[data-qaid="compare-block-mobile"]');

    const selector = isMobile ? '[data-qaid="product-card"] > div' : '[data-qaid="compare-block"]';

    const attachPoint = firstProduct.querySelector(selector);
    //console.log('🚀 ~ pollerLite ~ attachPoint:', attachPoint);
    fireEvent('Conditions Met');
    if (VARIATION === 'control') {
      return;
    }

    if (document.querySelector(`.${ID}__tooltipWrapper`)) return;
    attachPoint.insertAdjacentHTML('afterend', toolTipWrapper(ID));
  });
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

  //add trackings

  const clickHandler = (e) => {
    const { target } = e;

    if (e.target.closest(`.${ID}__tooltipWrapper`) && e.target.closest(`.${ID}__tooltip`)) {
      e.preventDefault();
      //console.log('clicked');
      const tooltipMsg = document.querySelector(`.${ID}__tooltipMessage`);
      tooltipMsg.style.display = 'block';
      fireEvent('Tooltip Clicked');
    } else if (target.closest(`.${ID}__close`)) {
      const tooltipMsg = document.querySelector(`.${ID}__tooltipMessage`);
      tooltipMsg.style.display = 'none';
      fireEvent('Tooltip Closed');
    }
  };

  document.body.removeEventListener('click', clickHandler);

  document.body.addEventListener('click', clickHandler);

  //init experiment

  setTimeout(init, DOM_RENDER_DELAY);

  onUrlChange(() => {
    pollerLite([() => window.utag !== undefined], () => {
      setTimeout(init, DOM_RENDER_DELAY);
    });
  });
};
