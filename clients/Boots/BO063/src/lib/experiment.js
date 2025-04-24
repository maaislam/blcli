/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { pollerLite } from '../../../../../lib/utils';
import { cookieOpt, setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  const pageType = () => {
    let pagetype;

    const productAmount = document.querySelector('.product_listings-stats > strong');
    const parsedAmount = parseFloat(productAmount.textContent.trim());
    const OOSProd = document.querySelector('.product_stockComingSoon');

    //  search page has less than 96 products on AND no out of stock products
    if(productAmount && parsedAmount < 96 && !OOSProd) {
      pagetype = 'lessthan96-noOOS';
    } 

    // search page has more than 96 products on AND no out of stock products
    if(productAmount && parsedAmount >= 96 && !OOSProd) {
      pagetype = 'morethan96-noOOS';
    } 

    if(productAmount && parsedAmount >= 96 && OOSProd) {
      pagetype = 'morethan96-OOS';
    } 
    if(productAmount && parsedAmount < 96 && OOSProd) {
      pagetype = 'lessthan96-OOS';
    } 

    return pagetype;
  }

  console.log(pageType());

  // get search term
  const urlTerm = document.querySelectorAll('.product_listings-stats strong')[1].textContent.trim();

  if(urlTerm) {
    

    const loadRichRelevance = () => {
      return new Promise((resolve, rej) => {
        jQuery.getScript('//media.richrelevance.com/rrserver/js/1.2/p13n.js', () => {
          var jsonRichRel = null;
          RR.jsonCallback = function(){
              jsonRichRel = RR.data.JSON.placements;
              console.log("RR jsonCallback function invoked");
              richRelevanceSetup(RR.data.JSON.placements);
              console.log('RRSetup complete');
          };

          const R3_COMMON = new r3_common();
          R3_COMMON.setApiKey('021e247385c72eb5'); 
          R3_COMMON.setBaseUrl(window.location.protocol+'//recs.richrelevance.com/rrserver/'); 
          R3_COMMON.setClickthruServer(window.location.protocol+"//"+window.location.host);
          R3_COMMON.setSessionId(getUserVisitId());	  
          R3_COMMON.addPlacementType('search_page.rec1');
          var userType = getCookie("UserType");
            if(userType == undefined){
              userType = "";
          }
          if(userType=="R") {
            if (getUserId() != "") {
                R3_COMMON.setUserId(getUserId());
            } 
          }
          resolve(); // resolves the promise, i.e. calls 'then'..
        });
      });
    }


    loadRichRelevance().then(() => {

       // add div and currency input to page
      const carousel = `<div id="richRelevanceContainer"><input type="hidden" id="storeCurrencySymbol" value="£" autocomplete="off"></div>`;
     
      document.querySelector('.plp_gridView_redesign').insertAdjacentHTML('afterend', carousel);
     
      // Run r3() search widget
       
        var R3_SEARCH = new r3_search();
        R3_SEARCH.setTerms(urlTerm);
        rr_flush_onload();
        r3();


        pollerLite(['.rrRightArrowContainer'], () => {
          document.querySelector('.rrRightArrowContainer').removeAttribute('onclick');
          document.querySelector('.rrRightArrowContainer').addEventListener('click', () => {
            rrCarousel('next','search_page.rec1', document.querySelector('.rrRightArrowContainer'));
          });

          document.querySelector('.rrLeftArrowContainer').removeAttribute('onclick');
          document.querySelector('.rrLeftArrowContainer').addEventListener('click', () => {
            rrCarousel('previous','search_page.rec1', document.querySelector('.rrLeftArrowContainer'));
          });
        });
    });
    
  }

};
