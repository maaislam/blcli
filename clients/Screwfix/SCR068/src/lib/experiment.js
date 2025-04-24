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
import savingMsg from './components/savingMsg';
import { getPageData, getProducts } from './helpers/utils';
// import { pollerLite } from '../../../../../lib/utils';
// import { onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const init = () => {
  const hasSaving = window.utag.data.prodSkuSavePercent;
  //console.log('🚀 ~ init ~ hasSaving:', hasSaving);

  if (!window.location.pathname.includes('/p/') || !hasSaving) {
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}--${VARIATION}`);
    return;
  }

  setup();

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  pollerLite(['[data-qaid="add-to-basket-overlay"]'], () => {
    const sku = window.utag.data.prodEan;
    getProducts(sku).then((data) => {
      const pageData = data[0];
      // console.log('🚀 ~ getProducts ~ data:', pageData);

      // console.log('🚀 ~ pollerLite ~ pageData:', pageData.priceInformation);

      const savingExVat = pageData.priceInformation.savingsExVat.amount;
      const savingIncVat = pageData.priceInformation.savingsIncVat.amount;

      const vatToggleElem = document.getElementById('toggle-vat');

      const exVatSelected = vatToggleElem ? vatToggleElem.checked : false;

      const savingAmountToShow = exVatSelected ? savingExVat : savingIncVat;

      const isMobile = window.innerWidth < 768;
      const attachPoint = isMobile
        ? document.querySelector('[data-qaid="mobile-lightbox-overlay-action-buttons"]')
        : document.querySelector('[data-qaid="add-to-basket-overlay"] > div:first-child ');

      const position = isMobile ? 'beforebegin' : 'afterend';

      attachPoint.insertAdjacentHTML(position, savingMsg(savingAmountToShow));

      fireEvent('user sees saving message');
    });
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

  document.body.addEventListener('click', (event) => {
    const { target } = event;

    if (target.closest('[data-qaid="pdp-button-deliver"]') || target.closest('[data-qaid="pdp-button-click-and-collect"]')) {
      //console.log('🚀 ~ document.body.addEventListener ~ target:', target);
      setTimeout(init, DOM_RENDER_DELAY);
    }
  });

  //setTimeout(init, DOM_RENDER_DELAY);

  // onUrlChange(() => {
  //   pollerLite(['#__next', '#__NEXT_DATA__', () => window.__NEXT_DATA__ !== undefined], () => {
  //     setTimeout(init, DOM_RENDER_DELAY);
  //   });
  // });
};
