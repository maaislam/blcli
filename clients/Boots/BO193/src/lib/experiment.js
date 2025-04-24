/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import { brandData } from './brandData';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  document.addEventListener('DOMContentLoaded', function(){

    if (sessionStorage.getItem(`${ID}`) !== "Fired"){
    
      window.cmCreateManualLinkClickTag(`/${ID}?cm_sp=AdobeTarget${ID}-_-${ID} V${VARIATION}-_-fired`);
     
      sessionStorage.setItem(`${ID}`, "Fired");
    }
      
  });

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const getBrand = () => {
    const brand = window.dataLayer[2]['ecommerce.detail']['products'][0].brand;
    const brandInfo = brandData[brand];

    return {brand, brandInfo} ;
  }

  const addBrandLink = () => {
    const brandName = getBrand().brand;
    const brandLink = getBrand().brandInfo.link;
    const brandIcon = getBrand().brandInfo.logo;
    let link;

    if(VARIATION === '1') {
      link = `<div class="${ID}-brand"><a href="${brandLink}">Shop all ${brandName} products</a></div>`;
      document.querySelector('#estore_product_title').insertAdjacentHTML('afterend', link);
    } else {
      link = `<div class="${ID}-brand"><a href="${brandLink}"><img src="${brandIcon}"/></a></div>`;
      document.querySelector('#estore_product_title').insertAdjacentHTML('beforebegin', link);
    }

    document.querySelector(`.${ID}-brand a`).addEventListener('click', () => {
      fireEvent('Clicked brand link');
    });
  }

  addBrandLink();

 

};
