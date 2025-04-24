/**
 * SG143 - IFC Luxury watches
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import data from './data';

const { ID, VARIATION } = shared;

/**
 * Get Site from hoestname EJ or HS
 */
export const getSiteFromHostname = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

export const getWatchBrand = () => {
  let url  = window.location.href;
  url = url.toLowerCase();
  let brand = '';

  if (url.indexOf('omega') > -1) {
    brand = 'omega';
  } else if (url.indexOf('tag') > -1) {
    brand = 'tag';
  } else if (url.indexOf('tudor') > -1) {
    brand = 'tudor';
  } else if (url.indexOf('breitling') > -1) {
    brand = 'breitling';
  }

  return brand;
};

export const getDeviceContent = () => {
  let device = '';
  if (window.innerWidth < 900) {
    device = 'mobile';
  } else {
    device = 'desktop';
  }

  const brand = getWatchBrand();
  let content = data[`${brand}`][`${device}`];
  
  return content;
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

  if(VARIATION !== 'control') {
    // test code here

    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
    const financeOptionsElement = document.querySelector('finance-options');
    financeOptionsElement.shadowRoot.querySelector('p').setAttribute('style', 'display: none !important;');
    financeOptionsElement.shadowRoot.querySelector('button.finance-options__button').setAttribute('style', 'display: none !important;');
    financeOptionsElement.shadowRoot.querySelector('.finance-options').setAttribute('style', 'background: transparent !important;padding: 0px !important;');


    const newIFCBanner = `<div class="${ID}-ifc-banner__wrapper">
      <img class="${ID}-ifc-banner__img" src='${getDeviceContent()}'>
    </div>`;
    if (VARIATION == '1') {
      document.querySelector('finance-options').insertAdjacentHTML('afterend', newIFCBanner);
    } else if (VARIATION == '2') {
      document.querySelector('.product-buy-now').insertAdjacentHTML('afterend', newIFCBanner);
    }
    
    // --- GA EVENTS
    const ifcBtn = financeOptionsElement.shadowRoot.querySelector('button.finance-options__button');
    document.querySelector(`img.${ID}-ifc-banner__img`).addEventListener('click', (e) => {
      ifcBtn.click();
      fireEvent('Clicked - New IFC banner - triggered click to IFC link');
    });

    if (window.innerWidth >= 900) {
      const isHover = e => e.parentElement.querySelector(':hover') === e; 
      const ifcBannerImg = document.querySelector(`.${ID}-ifc-banner__img`);
      document.addEventListener('mousemove', function checkHover() {
        const hovered = isHover(ifcBannerImg);
        if (hovered !== checkHover.hovered) {
          if (hovered == true) {
            fireEvent('Conditions Met - User has hovered over IFC panel');
          }
          
          checkHover.hovered = hovered;
        }
      });
    }
    
  } else {
    // any control code here
    return;
  }
};
