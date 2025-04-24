/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
() => {
    const allUrls = [
        '/christmas-3-for-2',
        '/the-ordinary',
        '/all-perfume',
        '/no7-shop-all',
        '/fenty-beauty-shop-all',
        '/all-christmas-gifts-for-her',
        '/mens-aftershave',
        '/clinique-full-range',
        '/vitamin-D',
        '/skincare-all-skincare',
        '/shampoo',
        '/all-christmas',
        '/all-toys',
        '/electric-toothbrushes',
        '/soap-and-glory-bath-body',
        '/sleep',
        '/foundation',
        '/all-value-packs-and-bundles',
        '/all-christmas-gifts-for-him',
        '/moisturiser',
        '/baby-child-vitamins',
        '/cold-flu-medication',
        '/cleanser-toner',
      ];
    
      const url = window.location.pathname;
      const Matches = RegExp(allUrls.join('|')).exec(url);
      if (Matches && url.indexOf('-mxy') === -1) {
        return true;
      }
}
], activate);
