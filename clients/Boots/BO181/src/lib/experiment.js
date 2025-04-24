/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { h, render } from 'preact';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { DesktopData } from './desktop/desktopData';
import BODesktopNav from './desktop/desktopNav';
import { slidingNav, tabs } from './helpers';
import { MobileData } from './mobile/mobileData';
import MobileSlidingNav from './mobile/mobileNav';

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


  // Control is BO165 V5, mobile is BO165 V1

  // Desktop - BO104 from BO165

  // Mobile is B0165 V1


  const mobile = window.innerWidth <= 767;

  // Create nav container
  const navContainer = document.createElement('div');
  navContainer.classList.add(`${ID}-navigation`);

 
  
  /** ---------------------
   *  Mobile Nav
   ------------------------*/

  if(mobile) {

    document.querySelector('#header_link_container').insertAdjacentHTML('afterbegin', `<li class="${ID}-navToggle" data-icon='a'></li>` );
    document.body.appendChild(navContainer);

 
    const openMobile = () => {
      const burger = document.querySelector(`.${ID}-navToggle`);
      if(burger) {
        navContainer.classList.add(`${ID}-open`);
        document.documentElement.classList.add(`${ID}-noScroll`);
      }
    };

    const navigation = document.querySelector(`.${ID}-navigation`);
  
    if(navigation) {
      navigation.innerHTML = '';
    }

    render(( 
      <MobileSlidingNav data={MobileData}></MobileSlidingNav>
    ), navigation);

    document.querySelector(`.${ID}-navToggle`).addEventListener('click', () => {
      openMobile();
    });

    // put currency selector in nav
    const currencyLi = document.querySelector(`.MobileSlidingNav__listing .currency a`);
    const currentCurrency = document.querySelector('#shipToMessage');

    if(currencyLi && currentCurrency) {
      currencyLi.appendChild(currentCurrency);
    }

    if(VARIATION === '3' || VARIATION === '4') {
      tabs();
    }

    /** Tracking */
    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__level-2 a, .MobileSlidingNav__level-3 a'), l => {
      if (l.getAttribute('href')){
            l.addEventListener('click', (e) => {
              if(e.currentTarget.classList.contains('MobileSlidingNav__level--active')) {
                fireEvent('Clicked Mobile Nav Link ' + e.currentTarget.innerText.trim());
              }
              if(!e.currentTarget.parentNode.querySelector('ul')) {
                fireEvent('Clicked Mobile Nav Link ' + e.currentTarget.innerText.trim());
              }
      });
          }
          });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__level-1'), l => {
      l.addEventListener('click', (e) => {
        if(e.currentTarget.classList.contains('MobileSlidingNav__level--active')) {
          fireEvent('Clicked Mobile Nav Category ' + e.currentTarget.innerText.trim());
        }
        if(!e.currentTarget.parentNode.querySelector('ul')) {
          fireEvent('Clicked Mobile Nav Category ' + e.currentTarget.innerText.trim());
        }
      });
    });
    //
    if(VARIATION === '3' || VARIATION === '4') {
    [].forEach.call(document.querySelectorAll('.CatTabs'), l => {
      l.addEventListener('click', (e) => {
        
          fireEvent('Clicked Mobile Tab ' + e.currentTarget.innerText.trim());

      });
    });
    }
  }

   /** ---------------------
   *  Desktop Nav
   ------------------------*/
  else {

    // add tabs for V3
    if(VARIATION === '3' || VARIATION === '4') {
      const tabs = 
      `<div class="CatTabs">
            <div class="CatTab" target="shop"><span>Shop</span></div>
            ${VARIATION === '3' ? `<div class="CatTab" target="pharmacy"><span>Pharmacy</span></div>` : `<div class="CatTab" target="services"><span>Services</span></div>`}
      </div>`;

      document.querySelector('#logo').insertAdjacentHTML('afterend', tabs);
    }

    document.querySelector('#header').insertAdjacentElement('afterend',navContainer);
    const navigation = document.querySelector(`.${ID}-navigation`);
  
    if(navigation) {
      navigation.innerHTML = '';
    }

    render(( 
      <BODesktopNav data={DesktopData}></BODesktopNav>
    ), navigation);  
    
    if(VARIATION === '1') {
      slidingNav();
    }

    if(VARIATION === '3' || VARIATION === '4') {
      tabs();
    }

    [].forEach.call(document.querySelectorAll('.DesktopNav a'), l => {
      l.addEventListener('click', (e) => {
        if(e.currentTarget.classList.contains('DesktopNav__level--active')) {
          fireEvent('Clicked Desktop Nav Link ' + e.currentTarget.innerText.trim());
        }
        if(!e.currentTarget.parentNode.querySelector('ul')) {
          fireEvent('Clicked Desktop Nav Link ' + e.currentTarget.innerText.trim());
        }
      });
    });
    if(VARIATION === '3' || VARIATION === '4') {
      [].forEach.call(document.querySelectorAll('.CatTabs'), l => {
        l.addEventListener('click', (e) => {
          
            fireEvent('Clicked Desktop Tab ' + e.currentTarget.innerText.trim());
  
        });
      });
      }
  }

};
