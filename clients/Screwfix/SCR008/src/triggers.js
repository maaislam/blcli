/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if (!ieChecks) {
  pollerLite(['#pr__media', '#product-slider-nav', '#product-slider-for', () => window.dataLayer !== undefined], () => {
    const isShoweringCategory = () => {
      const showeringCategories = [
        'cat820272',
        'cat8320007',
        'cat820336',
        'cat820270',
        'cat820268',
        'cat820294',
        'cat820004',
        'cat8320006',
        'cat2650018',
        'cat820282',
        'cat820280',
        'cat820278',
        'cat820274',
        'cat820276',
        'cat840510',
        'cat11500002',
        'cat820288',
        'cat820286',
      ];
      const dataObjs = window.dataLayer.filter((item) => typeof item === 'object')[0];
      return showeringCategories.some((item) => dataObjs['prodCategoryId'] === item);
    };
    setTimeout(() => {
      isShoweringCategory() && activate();
    }, 1500);
  });
}
