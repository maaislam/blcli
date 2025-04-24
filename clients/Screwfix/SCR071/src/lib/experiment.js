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
import { onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 500;

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const init = () => {
  //check if page is correct
  const pageCondition = window.utag.data.basicPageId === 'lister Page' || window.utag.data.basicPageId === 'product page';

  if (!pageCondition) {
    //remove DOM element added by the experiment

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
  const newClickCollectText = 'Free Click & Collect';
  const clickAndCollectBtnPlp = document.querySelectorAll('[data-qaid="button-click-and-collect"]');
  const deliveryBtnPlp = document.querySelectorAll('[data-qaid="button-deliver"]');
  const clickAndCollectBtnPdp = document.querySelectorAll('[data-qaid="pdp-button-click-and-collect"]');
  //console.log('🚀 ~ init ~ clickAndCollectBtnPdp:', clickAndCollectBtnPdp);

  //if (window.utag.data.basicPageId === 'product page' && isMobile()) return;

  if (window.utag.data.basicPageId === 'lister Page') {
    clickAndCollectBtnPlp.forEach((btn) => {
      const span = btn.querySelector('span');
      //console.log('🚀 ~ clickAndCollectBtnPlp.forEach ~ span:', span);
      span.innerText = newClickCollectText;
      btn.classList.add(`${ID}__button-collect`);
      // span.style.fontSize = '16px';
      // span.style.maxWidth = '125px';
    });

    deliveryBtnPlp.forEach((btn) => {
      btn.classList.add(`${ID}__button-deliver`);
    });
  } else if (window.utag.data.basicPageId === 'product page') {
    clickAndCollectBtnPdp.forEach((btn) => {
      const span = btn.querySelector('span');
      //console.log('🚀 ~ clickAndCollectBtnPlp.forEach ~ span:', span);
      span.innerText = newClickCollectText;
      //span.style.fontSize = '16px';
    });
  }
};

export default () => {
  /*****Request from Screwfix*****/
  console.log('working1111');
  const blExpID = VARIATION === 'control' ? `${ID} control` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || '';
  if (window.brainLabsExperimentID) {
    window.brainLabsExperimentID += `,${blExpID}`;
  } else {
    window.brainLabsExperimentID = blExpID;
  }
  /*****Request from Screwfix*****/

  const clickHandler = (e) => {
    const pageCondition = window.utag.data.basicPageId === 'lister Page' || window.utag.data.basicPageId === 'product page';
    if (!pageCondition) return;

    const { target } = e;

    //console.log('🚀 ~ clickHandler ~ target', target);

    if (target.closest('[data-qaid="button-click-and-collect"]')) {
      fireEvent('User interacts with c&c button PLP');
    } else if (target.closest('[data-qaid="button-deliver"]')) {
      fireEvent('User interacts with delivery button PLP');
    } else if (target.closest('[data-qaid="pdp-button-click-and-collect"]')) {
      if (target.closest('[data-qaid="pdp_sticky_banner"]')) {
        fireEvent('User interacts with c&c on PDP Sticky Banner');
      } else {
        fireEvent('User interacts with c&c button PDP');
      }
    } else if (target.closest('[data-qaid="pdp-button-deliver"]')) {
      if (target.closest('[data-qaid="pdp_sticky_banner"]')) {
        fireEvent('User interacts with delivery button PDP Sticky Banner');
      } else {
        fireEvent('User interacts with delivery button PDP');
      }
    }
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
