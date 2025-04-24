/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { isPdp, isPlp } from './lib/helpers/utils';
import clickHandler from './lib/handlers/clickHandler';
import variantOptions from './lib/data';
import obsIntersection from './lib/helpers/observeIntersection';
import { fireEvent, setup } from '../../../../core-files/services';
if (isPdp()) {
  pollerLite(['body', '[data-qaid="pdp_sticky_product_footer"]'], activate);
} else if (isPlp()) {
  pollerLite(['body', '[data-qaid="product-grid"]', () => window.blDataLayer !== undefined], () => {
    setup();
    document.body.addEventListener('click', clickHandler);
    // find the first valid product in the page
    const skusOnPage = window.blDataLayer.pageData.products;
    const firstValidSkuIndex = skusOnPage.findIndex((item) => variantOptions.some((option) => option.sku === item.skuId));
    const firstValidSku = document.querySelectorAll('[data-qaid="product-card"]')[firstValidSkuIndex];
    //console.log('file: triggers.js:18 ~ pollerLite ~ firstValidSku', firstValidSku);
    const callback = (entry, observer) => {
      if (entry.isIntersecting) {
        fireEvent('Conditions Met');
        observer.disconnect();
      }
    };

    obsIntersection(firstValidSku, 0.5, callback);
  });
}
