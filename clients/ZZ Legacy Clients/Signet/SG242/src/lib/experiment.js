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
    // test code here

    const banner = `
    <div class="${ID}-banner">
      <a href="https://www.ernestjones.co.uk/webstore/blog/atches-and-Wonders-Geneva-2023-Everything-you-Need-to-Know/"></a>
      <div class="${ID}-inner">
        <h2>Watches and Wonders Geneva 2023</h2>
        <p>Everything you need to know</p>
        <a class="${ID}-cta" href="https://www.ernestjones.co.uk/webstore/blog/atches-and-Wonders-Geneva-2023-Everything-you-Need-to-Know/">Learn more</a>
      </div>
    </div>`;

    if(window.digitalData.page.pageInfo.pageName === 'EJ|Homepage') {
      document.querySelector('section.featured').insertAdjacentHTML('beforebegin', banner);
    }
    if(window.location.href.indexOf('/webstore/watches.do') > -1) {
      document.querySelector('section.appointment').insertAdjacentHTML('beforebegin', banner);
    }
    //Watches Page, it can sit above the Concierge Section
    //slot in directly above the Featured section
    
  } else {
    // any control code here
  }
};
