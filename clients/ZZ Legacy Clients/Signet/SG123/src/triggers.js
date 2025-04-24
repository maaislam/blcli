/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { getSiteFromHostname } from './lib/services';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(window.location.href.indexOf('/webstore/basket/') > -1) {
    pollerLite([
      'body',
      '.container .c-product-card',
      '.voucher #labelled-by-add-promo-code',
    ], activate);

    let oldHref = document.location.href;
    const bodyList = document.querySelector("body");
    const observerUrl = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if(oldHref != document.location.href) {
          oldHref = document.location.href;
          // This code runs every time the url changes
          // ...
          // Clean up any thing that we added ourselves
          //  Remove body class if it exists 
          //  Remove the elements you previously added 
          // ... 
          document.body.classList.remove('SG123');
          document.body.classList.remove('SG123-basket');
          const voucherBlock = document.querySelector('.SG123-voucherBox');
          if(voucherBlock) {
            voucherBlock.remove();
          }
          // Now run the experiment code
          if(window.location.href.indexOf('/webstore/basket/') > -1) {
            pollerLite([
              'body',
              '.container .c-product-card',
              '.voucher #labelled-by-add-promo-code',
            ], activate);
          }
        }
      });
    });
    const config = {
      childList: true,
      subtree: true
    };
    observerUrl.observe(bodyList, config);
  } else {
    pollerLite([
      'body',
      '.product-price .product-price-pricing',
      () => {
        if(window.digitalData.page.pageInfo.pageType === 'PDP') {
          return true
        }
      },

      () => {
        let skuList;
        if(getSiteFromHostname() == 'ernestjones') {
          skuList = ['1187104'];
        }
    
        if(getSiteFromHostname() == 'hsamuel') {
          skuList = ['1250507'];
        }
        if(skuList.indexOf(window.digitalData.product[0].productInfo.masterSku) > -1){
          return true
        }
      }
    ], activate);
  }
}
