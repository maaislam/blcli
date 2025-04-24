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

    if(window.location.href.indexOf('ernestjones') > -1){
      if(window.location.href.indexOf('ernestjones.co.uk/?') > -1 || window.location.href === 'https://www.ernestjones.co.uk/') {
        pollerLite([
          '.cta',
        ], activate);
        
      } else if(window.location.href.indexOf('/content/') > -1) {
        pollerLite([
          '.hero-banner',
        ], activate);
      } else if(window.digitalData.page.pageInfo.pageType === 'Landing') {
        pollerLite([
          '#js-splide-1',
          '.banner'
        ], activate);
      }


    } else if(window.location.href.indexOf('hsamuel') > -1){
      // if(window.digitalData.page.pageInfo.pageType === 'PLP') {
      //   pollerLite([
      //     '.u-site-container',
      //   ], activate);
      // } else 
      if(window.location.href.indexOf('hsamuel.co.uk/?') > -1 || window.location.href === 'https://www.hsamuel.co.uk/') {
          pollerLite([
            '.SG204-brands',
            '.SG204-contentspots-small'
          ], activate);
        
      } else {
        pollerLite([
          '.category-box-grid.category-box-grid--4-cards',
        ], activate);
      }
    }
  }

  // if(window.digitalData.page.pageInfo.pageType === 'PLP') {
  //   pollerLite(['body'], () => {
  //     // for observer
  //     let oldHref = document.location.href;
  //     let bodyList = document.querySelector("body");
  //     const observer = new MutationObserver(function(mutations) {
  //             mutations.forEach(function(mutation) {
  //                 if (oldHref != document.location.href) {
  //                     oldHref = document.location.href;
  //                     document.documentElement.classList.remove('SG158');
  //                     document.documentElement.classList.remove('SG158-1');
                     
  //                     if(document.querySelector('.SG158-finderOverlay')) {
  //                       document.querySelector('.SG158-finderOverlay').remove();
  //                     }
  //                     if(document.querySelector('.SG158-finderBox-wrapper')) {
  //                       document.querySelector('.SG158-finderBox-wrapper').remove();
  //                     }
                      
                      
      
  //                     pollerLite([
  //                       '.u-site-container',
  //                     ], activate);
                      
  //                 }
  //             });
  //         });
  //     const config = {
  //         childList: true,
  //         subtree: true
  //     };
      
  //     observer.observe(bodyList, config);
  //   });
  // }
}
