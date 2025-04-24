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
import pdpCard from './components/pdpCard';
import plpCard from './components/plpCard';
import addFreeProduct from './helpers/addFreeProduct';
import removeFreeProduct from './helpers/removeFreeProduct';
import setModalCard from './helpers/setModalCard';
import { obsIntersection, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const validPlps = () =>
  [
    '/c/heating-plumbing/central-heating-radiators/cat830988?brand=flomasta',
    '/search?search=flomasta+flomasta',
    '/c/heating-plumbing/central-heating-radiators/cat830988',
  ].some((path) => window.location.href.includes(path));

const validPdp = () =>
  window.utag.data.basicPageId === 'product page' &&
  window.utag.data.prodBrand[0] === 'Flomasta' &&
  window.utag.data.prodCategory[0] === 'Central Heating Radiators';

const init = () => {
  //check if page is correct
  const pageCondition = validPlps() || validPdp();
  if (!pageCondition) {
    //remove DOM element added by the experiment
    const element = document.querySelector('.element');
    if (element) element.remove();

    //remove setup
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

  fireEvent('Conditions Met');

  if (VARIATION === 'control') return;

  /*****add experiment specific code here*****/

  if (validPlps()) {
    fireEvent(`User interacts with the promotional banner on PLP`);
    const freeTravElems = document.querySelectorAll('[data-qaid="bulksave-banner"]');

    freeTravElems.forEach((freeTravElem) => {
      freeTravElem.style.display = 'none';
      freeTravElem.insertAdjacentHTML('afterend', plpCard(ID));
    });
  }

  if (validPdp()) {
    const prodTitle = document.querySelector('[data-qaid="product-tile"]');
    const attachPoint = prodTitle.parentElement;

    attachPoint.insertAdjacentHTML('beforeend', pdpCard(ID));
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

  const clickHandler = (e) => {
    //check if page is correct
    const pageCondition = validPlps() || validPdp();
    if (!pageCondition) return;

    const { target } = e;

    const deliveryBtn = document.querySelector('[data-qaid="pdp-button-deliver"]');
    const clickAndCollectIcon = document.querySelector('[data-qaid="pdp-button-click-and-collect"]');
    const checkBoxContainerElem = document.querySelector(`.${ID}__checkbox-container`);
    const prdQty = 1;

    if (target.closest(`.${ID}__delivery-btn`) && validPdp()) {
      fireEvent('User adds bundle to delivery');
      deliveryBtn.click();

      setModalCard(ID);
    } else if (target.closest(`.${ID}__click-collect-btn`) && validPdp()) {
      fireEvent('User adds bundle to click and collect');
      clickAndCollectIcon.click();

      setModalCard(ID);
    } else if (target.closest(`.${ID}__checkbox-container`) && (validPdp() || validPlps())) {
      const checkBoxElem = document.querySelector(`.${ID}__checkbox`);
      const DELAY = 250;

      checkBoxContainerElem.classList.add(`${ID}__disabled`);

      setTimeout(() => {
        if (checkBoxElem.checked) {
          fireEvent("User adds TRV in post add to bag");
          addFreeProduct(ID, checkBoxContainerElem, prdQty);
        } else {
          fireEvent("User removes TRV in post add to bag");
          removeFreeProduct(ID, checkBoxContainerElem, prdQty);
        }
      }, DELAY);
    } else if (target.closest(['[data-qaid="button-deliver"]']) && validPlps()) {
      fireEvent('User adds bundle to basket');
      setModalCard(ID);
    } else if (target.closest(['[data-qaid="button-click-and-collect"]']) && validPlps()) {
      fireEvent('User adds bundle to basket');
      setModalCard(ID);
    } else if (target.closest('[data-qaid="pdp-view-all-link"]')) {
      fireEvent('User interacts with “view more”');
    } else if (target.closest('[data-qaid="bulksave-banner"]') || target.closest(`.${ID}__plpCard`)) {
      fireEvent(`User interacts with the promotional badge on PLP`);
    } else if (target.closest('[data-qaid="large-promo-banner"]')) {
      fireEvent(`User interacts with the promotional banner on PDP`);
    }
    //console.log('🚀 ~ clickHandler ~ target', target);
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(
      [
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
