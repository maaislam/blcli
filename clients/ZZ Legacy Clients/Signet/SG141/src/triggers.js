/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../../../../core-files/shared';
import { runExperimentOnPage } from './lib/helpers';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!document.documentElement.classList.contains(`${shared.ID}`)) {
    pollerLite([
      'body',
      // '.browse__main-content h1.page-heading',
      () => { return runExperimentOnPage(); },
      () => { return !!window.dataLayer[3].digitalData; },
      () => !!window.ga,
    ], activate);
  }
}

pollerLite(['body',
      () => { return runExperimentOnPage(); },
      () => { return !!window.dataLayer[3].digitalData; },], () => {

    // for observer
    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const urlObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    document.body.classList.remove('SG141');
                    const brandMessageBlock = document.querySelector('.SG141-brand-message__wrapper');
                    if(brandMessageBlock) {
                      brandMessageBlock.parentNode.removeChild(brandMessageBlock);
                    }

                    setTimeout(()=> {
                      if (runExperimentOnPage()) {
                        activate();
                      }
                      
                    }, 500);

                    
                }
            });
        });
    const config = {
        childList: true,
        subtree: true
    };
    
    urlObserver.observe(bodyList, config);
});
