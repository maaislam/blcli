/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { validCategories } from './lib/data';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if (!ieChecks && window.location.pathname.includes('/p/')) {
  //console.log('test');
  pollerLite(['body', '[data-qaid="product-tile"]', '[data-qaid="pdp-tabs"]', () => window.blDataLayer !== undefined], () => {
    const { parentCategories } = window.blDataLayer;

    const currentCategory = validCategories.find((validCategorie) => parentCategories.includes(validCategorie));
    console.log('currentCategory', currentCategory);
    if (!currentCategory) return;
    activate(currentCategory);
  });
}
