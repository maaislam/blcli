/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    if(window.location.href.indexOf('/OrderItemDisplay') > -1) {
      pollerLite([
        'body',
        '#products_container',
        '.row.product_item',
      () => {
        return !!window.OnetrustActiveGroups;
      },
      () => {
          return !!window.Optanon
      },
      ], activate);
      
    } else {
        // for product page
      pollerLite([
        'body',
        '#richRelevanceContainer .rrContainer',
        '#estore_productpage_template_container',
        '#in_stock_actions',
        '#estore_product_promotions_on_pdp',
      () => {
        return !!window.OnetrustActiveGroups;
      },
      () => {
          return !!window.Optanon
      },
      () => {
        return !!window.jQuery
      },
      () => {
        return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
      },
      ], activate);

    }
  

   

    /**
     *  // for basket page
    pollerLite([
      'body',
      '#richRelevanceContainer .rrContainer',
    () => {
      return !!window.OnetrustActiveGroups;
    },
    () => {
        return !!window.Optanon
    },
    ], activate);
     */
  }
}
