/**
 * TP132m - Brick PLP Improvements
 * @author User Conversion
 */
import { setup, addTracking, addBlurPoints, movePrice } from './services';
import settings from './settings';
import { cacheDom } from './../../../../../lib/cache-dom';
import TP122m from './TP122m';

const activate = () => {
  if (!document.querySelector('.TP122m') || !document.querySelector('.TP084')) {
    TP122m();

    const moreInfoCta = document.querySelectorAll('.TP084_ProductInfo_Wrapper p.TP084_ProductInfo_Text');
    if (moreInfoCta.length) {
      for (let i = 0; moreInfoCta.length > i; i += 1) {
        moreInfoCta[i].textContent = 'Show more information';
      }
    }
  }
  const plpItems = cacheDom.getAll('.tp_prodViewWrapper ul#tp_product_lister_enumeration li.product_item');

  setup();
  for (let i = 0; plpItems.length > i; i += 1) {
    addBlurPoints(plpItems[i]);
    movePrice(plpItems[i]);
  }
  addTracking();
};

export default activate;
