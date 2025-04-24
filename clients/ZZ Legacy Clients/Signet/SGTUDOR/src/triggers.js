/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../../../../core-files/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!document.documentElement.classList.contains(`${shared.ID}`)) {
    if(window.digitalData.page.pageInfo.pageType === 'PLP') {
      pollerLite([
        'body',
        '.name .name__tudor',
      ], activate);


      
      pollerLite(['body'], () => {
        // for observer
        let oldHref = document.location.href;
        let bodyList = document.querySelector("body");
        const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (oldHref != document.location.href) {
                        oldHref = document.location.href;
                        document.documentElement.classList.remove('SGTUDOR');
                        document.documentElement.classList.remove('SGTUDOR-1');

                        pollerLite([
                          'body',
                          '.name .name__tudor',
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
}
