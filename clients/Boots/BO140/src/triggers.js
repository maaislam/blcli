/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite, observer } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    let runExp = false;
    
    pollerLite([
      'body',
      '#estores_product_listing_widget .header_bar',
      () => {
        // let runExp = false;
        const pathname = window.location.pathname;
        const expPages = ['/fragrance/perfume/all-perfume',
        '/baby-child/mothercare-clothing/mothercare-baby-clothes-0-24-months',
        '/beauty/luxury-beauty-skincare/luxury-beauty-makeup',
        '/fragrance/aftershave/mens-aftershave',
        '/health-pharmacy/vitaminsandsupplements/vitamins-supplements-shop-by-ingredient',
        '/beauty/beauty-skincare-offers',
        '/beauty/new-in-beauty-skincare',
        '/beauty/makeup/face/foundation',
        '/beauty/makeup/face'];

        if (expPages.indexOf(`${pathname}`) > -1) {
          runExp = true;
        }

        return runExp;
      },
    ], activate);

    const reRunExp = () => {
      observer.connect(document.querySelector('.product_listing_container ul.grid_mode'), () => {
        setTimeout(() => {
          if (document.querySelector('.BO140-quickLinks__wrapper')) {
            document.querySelector('.BO140-quickLinks__wrapper').parentElement.removeChild(document.querySelector('.BO140-quickLinks__wrapper'));
          }
          activate();
        }, 500);
      }, {
        throttle: 200,
        config: {
          attributes: false,
          childList: true,
          // subtree: true,
        },
      });
      
      
    }

    pollerLite(['body'], () => {
  
      // for observer
      let oldHref = document.location.href;
      let bodyList = document.querySelector("body");
      const observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                  if (oldHref != document.location.href) {
                      oldHref = document.location.href;
                      // document.documentElement.classList.remove('BO140');
                      // document.documentElement.classList.remove('BO140-1');
                      // document.documentElement.classList.remove('BO140-control');
                      pollerLite([
                          'body', 
                          '#estores_product_listing_widget .header_bar',
                      ], reRunExp);

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




