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
      '.product_listing_container__header',
      '.ais-RangeSlider .rheostat-handle.rheostat-handle-upper .rheostat-tooltip',
    () => {
      return !!window.OnetrustActiveGroups;
    },
    () => {
        return !!window.Optanon
    },
    () => {
      return !!window.jQuery;
    },
    () => {
        return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
    },
    ], activate);


    pollerLite(['body',
    '.product_listing_container__header',
    '.ais-RangeSlider .rheostat-handle.rheostat-handle-upper .rheostat-tooltip',
    '.ais-RatingMenu-list .ais-RatingMenu-item',
    () => {
      return !!window.OnetrustActiveGroups;
    },
    () => {
        return !!window.Optanon
    },
    () => {
      return !!window.jQuery;
    },
    () => {
        return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
    },
    ], () => {

    // for observer
    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    document.body.classList.remove('BO097');
                    const filterBlock = document.querySelector('.BO097-heroFilters');
                    if(document.querySelector('.BO097-filters.slick-initialized')) {
                      window.jQuery(`.BO097-filters`).slick('destroy');
                    }
                    if(filterBlock) {
                        filterBlock.remove();
                    }
                    
                    pollerLite([
                      'body',
                      '.product_listing_container__header',
                      '.ais-RangeSlider .rheostat-handle.rheostat-handle-upper .rheostat-tooltip',
                      '.ais-RatingMenu-list .ais-RatingMenu-item',
                    ], () =>{
                        setTimeout(()=> {
                            activate();
                        }, 1000);
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
