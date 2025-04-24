/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite([
    'body',
    '.container__finance-details .c-btn',
    '.c-payment-method-toggle',
    '#labelledby-pay-with-finance',
    () => {
      if(window.digitalData.page.pageInfo.pageType === 'Checkout') {
        return true
      }
    },
    () => {
      return !!window.ga
    },
  ], activate);
  
  pollerLite(['body'], () => {
      // for observer
      let oldHref = document.location.href;
      let bodyList = document.querySelector("body");
      const observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                  if (oldHref != document.location.href) {
                      oldHref = document.location.href;
                      document.body.classList.remove('SG129');
                      document.body.classList.remove('SG129-1');
                      if(document.querySelector('.SG129-financeButton')) {
                        document.querySelector('.SG129-financeButton').remove();
                      }
                      if(window.digitalData.page.pageInfo.pageType === 'Checkout') {
                       
                          pollerLite(['body',
                          '.container__finance-details .c-btn', 
                          '.c-payment-method-toggle',
                          '#labelledby-pay-with-finance',
                          () => {
                            return !!window.ga
                          },
                          ], () => {
                            activate();
                          });
                      }
                  }
              });
          });
      const config = {
          childList: true,
          subtree: true
      };
      
      observer.observe(bodyList, config);
    });
}
