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

  const createContent = () => {
    let content;

    if(ID === 'BO195') {
      content = `
      <p><strong>Save up to 15%</strong> on selected fragrance & premium in our <strong>Payday Sale!</strong> Plus, save an <strong>EXTRA 5%</strong> with code <strong>EXTRA 5</strong></p>
      <div class="${ID}-ctas">
        <a class="${ID}-cta" href="https://www.boots.com/sitesearch?promotionalText%5B0%5D=Save+up+to+15+percent+across+selected+premium+beauty+and+premium+hair+plus+save+an+extra+5+percent+with+code+EXTRA5+-+online+only#facet:&productBeginIndex:0&orderBy:7&pageView:grid&minPrice:0&maxPrice:&pageSize:&">Shop premium beauty</a>
        <a class="${ID}-cta" href="https://www.boots.com/sitesearch?promotionalText%5B0%5D=Save+up+to+15+percent+across+selected+fragrance+plus+save+an+extra+5+percent+with+code+EXTRA5+-+online+only#facet:&productBeginIndex:0&orderBy:7&pageView:grid&minPrice:0&maxPrice:&pageSize:&">Shop fragrance</a>
      </div>`;
      
    } else if(ID === 'BO195a') {
      content = `<p><strong>Save 15%</strong> when you spend £30 on your baby shop in our <strong>Payday Sale!</strong> Hurry, it won't be here for long.</p>
      <div class="${ID}-ctas">
        <a class="${ID}-cta" href="https://www.boots.com/sitesearch?promotionalText%5B0%5D=Save+15+percent+when+you+spend+%C2%A330+on+selected+baby+and+child+products">Shop now</a>
       </div>`;
    }
    else if(ID === 'BO195b') {
      content = `
      <a href="https://www.boots.com/health-offers"></a>
      <p>Shop our <strong>top offers</strong> on healthcare!</p>
      <div class="${ID}-ctas">
        <a class="${ID}-cta" href="https://www.boots.com/health-offers">Shop now</a>
       </div>`;
    }

    return content;
  }

  const createBanner = () => {
    const banner = document.createElement('div');
    banner.classList.add(`${ID}-offerBanner`);
    banner.innerHTML = `
    <div class="${ID}-container">${createContent()}</div>`;

    if(document.querySelector('#main')) {
      document.querySelector('#main').insertAdjacentElement('afterbegin', banner);
    }

    const allLinks = document.querySelectorAll(`${ID}-offerBanner a`);
    for (let index = 0; index < allLinks.length; index += 1) {
      const element = allLinks[index];
      element.addEventListener('click', () => {
        fireEvent('Clicked Payday Banner');
      });
      
    }
  }

  createBanner();

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

};
