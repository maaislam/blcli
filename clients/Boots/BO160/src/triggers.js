/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    pollerLite([
      'body',
      '#productsFacets #key\\ features #morelink_ads_f24004_ntk_cs',
      () => {
        return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
    },
    ], activate);

    pollerLite(['body', '#productsFacets #key\\ features #morelink_ads_f24004_ntk_cs'], () => {
  
      // for observer
      let oldHref = document.location.href;
      let bodyList = document.querySelector("body");
      const observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                  if (oldHref != document.location.href) {
                      oldHref = document.location.href;
                        document.documentElement.classList.remove('BO160');
                        document.documentElement.classList.remove('BO160-1');
                        document.documentElement.classList.remove('BO160-control');
                        console.log('change')
                        pollerLite([
                          'body',
                          '#productsFacets #key\\ features #morelink_ads_f24004_ntk_cs',
                        ], activate);

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
}
