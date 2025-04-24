/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../../../../core-files/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {

  const urls = ['wedding-rings','engagement-rings','diamond-rings','rings','luxury-watches', 'mens-watches'];

  if(!document.documentElement.classList.contains(`${shared.ID}`)) {
    pollerLite([
      'body',
      '.top-section',
      '.refinements',
      '.facet-section .facet-category .facet-menu__item input',
      () => {
        for (var i = 0; i < urls.length; i++) {
          if(window.location.href.indexOf(urls[i]) > -1) {
              return true
          }
        }
      }
    ], activate);


   

    pollerLite(['body'], () => {
      // for observer
      let oldHref = document.location.href;
      let bodyList = document.querySelector("body");
      const observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                  if (oldHref != document.location.href) {
                      oldHref = document.location.href;
                      document.documentElement.classList.remove('SG190');
                      document.documentElement.classList.remove('SG190-1');
                      document.documentElement.classList.remove('popularOnly');

                      if(document.querySelector(`.SG190-filtersBlock`)) {
                        const sortBy = document.querySelector('.top-section');
                        sortBy.appendChild( document.querySelector('.top-section__view-switcher'));
                        document.querySelector(`.SG190-filtersBlock`).remove();
                      }

                      pollerLite([ 
                        'body',
                        '.top-section',
                        '.refinements',
                        '.facet-section .facet-category .facet-menu__item input',
                        () => {
                          for (var i = 0; i < urls.length; i++) {
                            if(window.location.href.indexOf(urls[i]) > -1) {
                                return true
                            }
                          }
                        }
                        ], () => {
                          setTimeout(() => {
                            activate();
                          }, 2000);
                        });
                      
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
