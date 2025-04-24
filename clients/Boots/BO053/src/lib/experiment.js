/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';

export default () => {
  setup();

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

    if(window.location.search !== '') {
      window.location.replace(`${window.location.pathname}-mxy${window.location.search}`);
    } else {
      window.location.replace(`${window.location.pathname}-mxy`);
    }
    //window.location.pathname = `${window.location.pathname}-mxy`;
  }

};
