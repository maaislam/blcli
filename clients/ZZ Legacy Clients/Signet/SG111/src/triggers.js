/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';


if(window.location.href.indexOf('/webstore/l/') > -1) {
pollerLite([
  'body', '.product-tile.js-product-item', '.product-tile__label',
  () => {
    if(window.digitalData && window.digitalData.page && window.digitalData.page.pageInfo.pageType === 'PLP') {
      return true
    }
  }
], activate);
}

if(window.location.href.indexOf('/webstore/d/') > -1) {
  pollerLite([
    'body','.store-count .store-count__description', '.usp.usp--at-top',
    () => {
      if(window.digitalData && window.digitalData.page && window.digitalData.page.pageInfo.pageType === 'PDP') {
        return true
      }
    },
    () => {
      const sku = window.digitalData.product[0].productInfo.masterSku;
      const exSkus = ['3867447', '3867455', '3867498', '9192786', '2246724', '2225026', '1250043', '1250051','1250078'];
      if(exSkus.indexOf(sku) === -1) {
        return true;
      } 
    }
  ], activate);
}

if(window.location.href.indexOf('/webstore/showbasket') > -1) {
  pollerLite([
    'body','.product-summary__button-wrapper',
    () => {
      if(window.digitalData && window.digitalData.page && window.digitalData.page.pageInfo.pageType === 'Checkout') {
        return true
      }
    }
  ], activate);
}
