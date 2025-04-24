/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from './lib/shared';
import { pollerLite } from '../../../../lib/uc-lib';
import { observePageChange } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  const { ID, VARIATION } = shared;

  pollerLite([
    'body',
    '.search-result-content',
    '.product-tile',
    '.promotion',
    '#primary',

    // -----------------
    // Crashing issues mean adding in Einstein checks(?):
    // Otherwise leave commented
    // -----------------
    //'.einstain-inited',
    //'.einstain-inited .slick-active',
    //() => !!(window.einstein && window.einstein.loaded),
    //() => !!window.__zmags && !!window.zmagsJsonp,
    // -----------------
    //
    () => {
        return !!window.jQuery;
    }, 

    // -----------------
    // If slick needed
    // -----------------
    //() => {
    //    if(typeof window.jQuery.fn.slick !== 'undefined') {
    //      return true;
    //    }
    //},
    // -----------------
    //
    () => !!(document.readyState == 'complete'), // Platform workaround rather than win-onload

  ], () => {
    // Initial check control or variant - if control, send event
    // to identify as such, and bail out of executing rest of code

    activate();

    const removeEverything = () => {
      document.documentElement.classList.remove(ID);
      document.documentElement.classList.remove(`${ID}-${VARIATION}`);
      const allOffers = document.querySelectorAll(`.HC062-offerCTA`);
      if(allOffers) {
        for (let index = 0; index < allOffers.length; index += 1) {
          const element = allOffers[index];
          element.remove();
        }
      }
  
      const allProducts = document.querySelectorAll('.product-tile');
      for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        if(element.querySelector('.promotion')) {
          if(element.querySelector('.promotion .promotion-callout').textContent.trim().indexOf('MIX & MATCH') > -1) {
            element.classList.remove(`${ID}-hasOffer`);
          }
        }
      } 
    }
  });


  observePageChange(document.body, (p) => {
    pollerLite([
      'body',
      '.search-result-content',
      '.product-tile',
      '.promotion .promotion-title',
      '#primary',
  
      // -----------------
      // Crashing issues mean adding in Einstein checks(?):
      // Otherwise leave commented
      // -----------------
      //'.einstain-inited',
      //'.einstain-inited .slick-active',
      //() => !!(window.einstein && window.einstein.loaded),
      //() => !!window.__zmags && !!window.zmagsJsonp,
      // -----------------
      //
      () => {
          return !!window.jQuery;
      }, 
  
      // -----------------
      // If slick needed
      // -----------------
      //() => {
      //    if(typeof window.jQuery.fn.slick !== 'undefined') {
      //      return true;
      //    }
      //},
      // -----------------
      //
      () => !!(document.readyState == 'complete'), // Platform workaround rather than win-onload
  
    ], () => {
      // Initial check control or variant - if control, send event
      // to identify as such, and bail out of executing rest of code
  
      const removeEverything = () => {
        document.documentElement.classList.remove('HC062');
        document.documentElement.classList.remove(`HC062-1`);
        document.documentElement.classList.remove(`HC062-control`);
        const allOffers = document.querySelectorAll(`.HC062-offerCTA`);
        if(allOffers) {
          for (let index = 0; index < allOffers.length; index += 1) {
            const element = allOffers[index];
            element.remove();
          }
        }
    
        const allProducts = document.querySelectorAll('.product-tile');
        for (let index = 0; index < allProducts.length; index += 1) {
          const element = allProducts[index];
          if(element.querySelector('.promotion')) {
            if(element.querySelector('.promotion .promotion-callout').textContent.trim().indexOf('MIX & MATCH') > -1) {
              element.classList.remove(`HC062-hasOffer`);
            }
          }
        } 
      }
      removeEverything();
      setTimeout(() => {
        activate();
      }, 1000);
  
    });
  });
}
