import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
//import { pollerLite } from '../../../../../lib/utils';
import { extractVolume, extractPrice, onUrlChange } from './helpers/utils';
import price from './components/price';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const init = () => {
  setup();
  // getReactStoreData();
  // const { pageType } = window.blDataLayer;
  //console.log('🚀 ~ init ~ pageData:', pageData);
  //console.log('🚀 ~ init ~ pageType: pos1');
  //add page check conditions here
  if (window.utag.data.basicPageType !== 'Lister' || !window.utag.data.categoryName.includes('Sealants')) return;
  //console.log('🚀 ~ init ~ pageType: pos2');

  fireEvent('Conditions Met');
  if (VARIATION === 'control') return;

  // main code here
  document.querySelectorAll(`.${ID}__perLitre`)?.forEach((item) => item && item.remove());

  const targetElement = document.querySelector('#container-main div[data-qaid="product-grid"]');
  //console.log('🚀 ~ init ~ targetElement:', targetElement);
  if (targetElement) {
    targetElement?.querySelectorAll('[data-qaid="product-card"]').forEach((item) => {
      const miliLitreText = item.querySelector('a[data-qaid="product_description"] span').textContent;
      //console.log('🚀 ~ targetElement?.querySelectorAll ~ miliLitreText:', miliLitreText);
      const priceText = item.querySelector('span[data-qaid="price"]').textContent;
      const miliLitreQuantity = extractVolume(miliLitreText);
      //console.log('🚀 ~ targetElement?.querySelectorAll ~ miliLitreQuantity:', miliLitreQuantity);
      if (!miliLitreQuantity) return;
      const priceQuantity = extractPrice(priceText);
      item.classList.add(`${ID}__showperLitre`);
      item.querySelector('span[data-qaid="price"]')?.insertAdjacentHTML('afterend', price(ID, miliLitreQuantity, priceQuantity));
    });
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
    const { target } = e;

    if (target.closest('[data-qaid="product-card"]') && target.closest('a[data-qaid="product_description"]')) {
      fireEvent('User clicks the sealant card');
    } else if (target.closest('button[data-qaid="button-click-and-collect"]')) {
      fireEvent('User clicks to add to card by tapping click&collect');
    } else if (target.closest('button[data-qaid="button-deliver"]')) {
      fireEvent('User clicks to add to card by tapping delivery');
    }
  };

  document.body.removeEventListener('click', clickHandler);

  document.body.addEventListener('click', clickHandler);

  //make sure event not added twice

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(['#__next', '#__NEXT_DATA__', () => window.__NEXT_DATA__ !== undefined], () => {
      setTimeout(init, DOM_RENDER_DELAY);
    });
  });
};
