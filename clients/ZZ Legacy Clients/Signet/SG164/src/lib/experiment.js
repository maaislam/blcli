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
  

    // set to description
    let type = 'description';

    const description = document.querySelector('#skip_link-description').parentNode;
    if(description) {
      description.classList.add(`${ID}-target`);
    }
    
    // if spec, change target
    const allTabs = document.querySelectorAll('.product-accordion-item');
    for (let index = 0; index < allTabs.length; index += 1) {
      const element = allTabs[index];
      if(element.querySelector('.product-accordion-item__heading').textContent.indexOf('Product Specifications') > -1) {
        element.classList.add(`${ID}-target`);
        description.classList.remove(`${ID}-target`);
        type = 'specifications';
      } 
    }

      const anchorLink = `<div class="${ID}-anchorLink">View product ${type}</div>`;
      document.querySelector('.product-stock').insertAdjacentHTML('beforebegin', anchorLink);


      const link =  document.querySelector(`.${ID}-anchorLink`);
      const elToScroll = document.querySelector(`.${ID}-target`);
      link.addEventListener('click', () => {
        
        if(elToScroll.classList.contains('product-accordion-item--is-close')) {
          document.querySelector(`.${ID}-target`).querySelector('h2').click();
        }
        
        const yOffset = -100; 
      
        const y =  document.querySelector(`.${ID}-target`).getBoundingClientRect().top + window.pageYOffset + yOffset;
  
        window.scrollTo({top: y, behavior: 'smooth'});

        fireEvent('Clicked view description');
      });
    
  } else {
    // any control code here
  }
};
