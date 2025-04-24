/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

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

  var checkCS = setInterval(function () {
    if (window._uxa) {
       window._uxa = window._uxa || [];
       window._uxa.push(["trackDynamicVariable", {key: `${ID}`, value: `Variation ${VARIATION}`} ]);
       clearInterval(checkCS);
    }
  }, 800)
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if(VARIATION !== 'control') {
    
    const addMsg = (text, type) => {
      const scarcityMsg = document.createElement('div');
      scarcityMsg.classList.add(`${ID}-scarcity`);
      scarcityMsg.classList.add(type);
      scarcityMsg.innerHTML = `<span>${text}<span>`;

      document.querySelector('.product-gallery__main').appendChild(scarcityMsg);
    } 

    const stockingSkus = ['6942261','6942849','3926443','3156044','6342604','8735174','8151725','6942202','6942210','6942229','8024073','6942245','6942237','6942253'];
    const recSkus = ['6376525','8338980','9794166','6376703','6376681','4413709','1016849','8063974','1016903','5331617','5676657','9792937','5276454','6343139','6343147','2871416','3770087'];
    const proposalSkus = ['8044783','8045550','8042195','8043019','8041741','8041946','8044368','8057486','8035210','8036403','8037728','8036764'];
    const eternitySkus = ['8039283','8041202','8041350'];
    const starBuySkus = ['8044740','8044724','8044732','8044643','8162570','8044767','8044759','8044716'];

    const prodSku = window.digitalData.product[0].productInfo.masterSku;

    if (stockingSkus.includes(prodSku)) {
      addMsg("Perfect Stocking Filler!", "gift");
    }
    if (recSkus.includes(prodSku)) {
      addMsg("Recommended Gift!", "gift");
    }
    if (proposalSkus.includes(prodSku)) {
      addMsg("For the Christmas Proposal", "proposal");
    }
    if (eternitySkus.includes(prodSku)) {
      addMsg("Top gift for Eternity!", "gift");
    }
    if (starBuySkus.includes(prodSku)) {
      addMsg("Christmas Starbuy!", "starbuy");
    }

  } else {
   return;
  }
};
