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
      '#estore_productpage_template_container',
    ], activate);


    if(window.location.href.match(/.*(\/)(beauty|baby-child|electrical|fragrance)(\/).*/)) {
      pollerLite([
        'body',
        '#estores_product_listing_widget',
        '.grid_mode.grid li',
        '.plp_gridView_redesign',
        '.estore_product_container',
        '#estores_product_listing_widget a',
      ], activate);

      pollerLite([
        'body',
        '#estores_product_listing_widget',
        '.grid_mode.grid li',
        '.plp_gridView_redesign',
        '.estore_product_container', 
        '#estores_product_listing_widget a',      
      ], () => {

        // for observer
        let oldHref = document.location.href;
        let bodyList = document.querySelector("body");
        const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (oldHref != document.location.href) {
                        oldHref = document.location.href;
                        document.documentElement.classList.remove('BO239');
                        document.documentElement.classList.remove('BO239-2');
                        const recs = document.querySelector('#BO239-root');
                        if(recs) {
                          recs.remove();
                        }

                        pollerLite(['body',
                        '#estores_product_listing_widget',
                        '.grid_mode.grid li',
                        '.plp_gridView_redesign',
                        '.estore_product_container',
                        '#estores_product_listing_widget a'
                        ], () => {
                          setTimeout(() => {
                            activate();
                          }, 800);
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
}
