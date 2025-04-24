/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { localStorageSave } from './lib/helpers/storage';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
const isPDP = location.pathname.indexOf('/products') !== -1;
if (!ieChecks && isPDP) {
  pollerLite(['body', '#header-bag', '.product-title'], () => {
    if (document.querySelector('.product-title').innerText.indexOf('Sample') !== -1) return;
    setTimeout(() => {
      window.DYO.recommendationWidgetData(143281, {}, function (error, data) {
        const popularProducts = data.slots.map((slot) => slot.item);
        const popularSamples = popularProducts.filter((popularProduct) => popularProduct.name.indexOf('Sample') !== -1);
        localStorageSave('popular-samples', JSON.stringify(popularSamples));
      });
    }, 5000);

    setTimeout(() => {
      activate();
    }, 2000);
  });
}
