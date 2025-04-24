/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { dateLessThanWeek, loadScript, sessionCount, slickProducts } from './helpers';
import RecentlyViewed from './lastViewed';
import lastViewedProductScraper from './storeProducts';

const { ID, VARIATION } = shared;

/**
 * Get Site from hoestname EJ or HS
 */
export const getSiteFromHostname = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

/**
 * Activate
 */
export default () => {
  setup();

  fireEvent('Conditions Met');

  const siteIdent = getSiteFromHostname();
  if(siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }

 
  const checkSession = setInterval(function(){
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    if(sessionStorage.getItem('analyticsDataSentFor') && sessionStorage.getItem('analyticsDataSentFor') === window.location.pathname) {
      if(typeof s !== 'undefined'){
        s.eVar111 = `${ID} - V${VARIATION}`;
        s.tl();
      }  
      clearInterval(checkSession);
    }
  }, 1000);
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  
  

    let productDataStr;
    if (getSiteFromHostname() === 'ernestjones') {
      productDataStr = window.localStorage.EJ138recommended_prods_1;
    } else {
      productDataStr = window.localStorage.HS138recommended_prods_1;
    }

    // add session count
    sessionCount();

    const pageType = window.digitalData.page.pageInfo.pageType;

    // store products
    if (pageType === 'PDP') {
      lastViewedProductScraper();
    }

    const runViewed = () => {
      const scriptUrl = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
      loadScript(scriptUrl).then(() => {
        const products = JSON.parse(productDataStr);
        if(products.length > 2) {
          new RecentlyViewed();

          // slick products
          const products = JSON.parse(productDataStr);
          if (products.length > 4) {
            if (window.innerWidth >= 1024) {
              slickProducts();
            }
          }

          window.jQuery(window).resize(function () {
            if (window.innerWidth >= 1024) {
              if (!document.querySelector(`.${ID}-product.slick-slide`)) {
                slickProducts();
              }
            } else {
              if (document.querySelector(`.${ID}-productsInner.slick-initialized`)) {
                window.jQuery(`.${ID}-productsInner`).slick('unslick');
              }
            }
          });
        }
      });
    }


    // if homepage or PLP
    if (pageType === 'Landing' || pageType === 'PLP') {
      if (sessionStorage.getItem("SGcount").indexOf('ss') > -1) {
        
        if (productDataStr) {
          // if less than one week
          if (dateLessThanWeek() === true) {
            // if PLP
            if (pageType === 'PLP') {
              pollerLite(['.product-listing__title-container'], () => {
                fireEvent('Recently Viewed products PLP');
                if(VARIATION === '1') {
                  runViewed();
                }
              })
            }

            if (pageType === 'Landing') {
              // if homepage
              pollerLite(['.delivery-banner'], () => {

                fireEvent('Recently Viewed products homepage');

                if(VARIATION === '1') {
                  runViewed();
                }
              });
            }

          } else {
            return;
          }
        }
      }
    }
};
