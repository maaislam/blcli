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

  //events.analyticsReference = '_gaUAT';

function loadScript(url, id = null) {
  const existingScript = document.getElementById(id);

  if (!existingScript) {
    const script = document.createElement("script");
    script.src = url;

    if (id) script.id = id;
    document.body.appendChild(script);
  }
}


  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  loadScript("//embed.typeform.com/next/embed.js");

  //let theGACookie = getCookie('_ga');

  document.querySelector('.hero-banner .hero-banner__links').insertAdjacentHTML('afterbegin', `
  
    <div class="${ID}-typeform">

    <button data-tf-popup="nytBWE0h" data-tf-opacity="100" data-tf-size="100" data-tf-iframe-props="title=Ernest Jones Love Story" data-tf-transitive-search-params data-tf-medium="snippet" style="all:unset;font-family:Helvetica,Arial,sans-serif;display:inline-block;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background-color:#FFFFFF;color:#000;font-size:19px;border-radius:23px;padding:0 31px;font-weight:bold;height:47.5px;cursor:pointer;line-height:47.5px;text-align:center;margin:0;text-decoration:none;">Share Now</button><script src="//embed.typeform.com/next/embed.js"></script>
    </div>

  `);

  fireEvent(`Visible - user has seen the survey prompt - Cookie ID: ${theGACookie}`);

  let typeformButton = document.querySelector(`.${ID}-typeform--button`);

  typeformButton.addEventListener('click', () => {

    fireEvent(`Clicked - user has clicked the survey start button - Cookie ID: ${theGACookie}`);

  });

};
