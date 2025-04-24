import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';
/* eslint-disable */
pollerLite([
  '.product-shop',
  '#product_addtocart_form',
  '.product-shop',
  () => {
    try {
      return !!window.jQuery;
    } catch(e) {}
  },
], Experiment.init);
