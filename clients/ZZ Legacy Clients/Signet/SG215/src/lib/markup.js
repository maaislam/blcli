/**
 * Markup for the gift finder box
 */

import shared from "../../../../../core-files/shared";
import { getSiteFromHostname } from "./experiment";
 
 const { ID, VARIATION } = shared;
 
 export default class FinderBox {
   constructor() {
     this.create();
     this.bindEvents();
     this.render();
   }
 
   create() {
     const element = document.createElement('div');
     element.classList.add(`${ID}-finderBox-wrapper`);
 
     element.innerHTML = 
     `<div class="${ID}-finderBanner">
        <div class="${ID}-container">
            <div class="${ID}-left"></div>
            <div class="${ID}-right">
                <h3>Find The Perfect Christmas Gift</h3>
                <p>Need a little help looking for the perfect gift for that special someone? Let us help you</p>
                <div class="${ID}-button">Find My Perfect Gift</div>
            </div>
        </div>
     </div>

     <div class="${ID}-finderBox">
       <div class="${ID}-loader"><div class="${ID}-loaderContent"><span></span><p>Loading your gift results...</p></div></div>
       <div class="${ID}-closeFinder"></div>
         <div class="${ID}-chosenOptions">
            <div class="${ID}-answer ${ID}-q1" step-no="1"></div>
            <div class="${ID}-answer ${ID}-q2" step-no="2"></div>
            <div class="${ID}-answer ${ID}-q3" step-no="3"></div>
            <div class="${ID}-answer ${ID}-q4" step-no="4"></div>
            <div class="${ID}-answer ${ID}-q5"></div>
         </div>
         <div class="${ID}-finderOptions">
           <div class="${ID}-options ${ID}-question" step-no="">
              <div class="${ID}-titleBlock">
                <h3 class="${ID}-optionsTitle"></h3>
                <p></p>
              </div>
             <p class="${ID}-error">Please choose an option</p>
             <div class="${ID}-innerOptions"></div>
           </div>
           <div class="${ID}-buttons">
                 <div class="${ID}-back ${ID}-button" data-step="0">Back</div>
                 <div class="${ID}-next ${ID}-button" data-step="1">Next</div>
           </div>
         </div>
       </div>`;
     this.component = element;
   }
 
   bindEvents () {
     const { component } = this;
 
    //  const closeFinder = () => {
    //    component.classList.remove(`${ID}-finderActive`);
    //    document.body.classList.remove(`${ID}-noScroll`);
    //    document.querySelector(`.${ID}-finderOverlay`).classList.remove(`${ID}-overlayActive`);
       
    //    if(document.querySelector(`.${ID}-loader`).classList.contains(`${ID}-loaderShow`)) {
    //      document.querySelector(`.${ID}-loader`).classList.remove(`${ID}-loaderShow`);
    //    }
    //  }
 
     //---- for mobile
     const openFinder = () => {
       component.classList.add(`${ID}-finderActive`);

       // if mobile
      //  document.body.classList.add(`${ID}-noScroll`);
      //  document.querySelector(`.${ID}-finderOverlay`).classList.add(`${ID}-overlayActive`);
     }
 
     
    //  const closeFinderEl = component.querySelector(`.${ID}-closeFinder`);
    //  closeFinderEl.addEventListener('click', () => {
    //      closeFinder();
    //  });
 
    //  const overlay = document.querySelector(`.${ID}-finderOverlay`);
    //  overlay.addEventListener('click', () => {
    //      closeFinder();
    //  });
 
     const christmasBanner = component.querySelector(`.${ID}-finderBanner .${ID}-button`);
     christmasBanner.addEventListener('click', () => {
       openFinder();
     });
   }
 
 
   render() {
     const { component } = this;

     // homepage
     if(window.location.href.indexOf('hsamuel.co.uk/?') > -1 || window.location.href === 'https://www.hsamuel.co.uk/') {
      document.querySelector('.SG204-brands').insertAdjacentElement('beforebegin', component);
     }  
     else if(window.digitalData.page.pageInfo.pageType === 'Landing' && window.location.href.indexOf('hsamuel.co.uk/christmas') > -1) {
      document.querySelector('.hero-banner').insertAdjacentElement('afterend', component);
     }  
     else if(window.location.href.indexOf('ernestjones.co.uk/?') > -1 || window.location.href === 'https://www.ernestjones.co.uk/') {
      document.querySelector('.cta').insertAdjacentElement('afterend', component);
     }  
     else if(window.location.href.indexOf('ernestjones.co.uk/?') > -1 || window.location.href === 'https://www.ernestjones.co.uk/webstore/content/christmas/') {
      document.querySelector('.hero-banner').insertAdjacentElement('afterend', component);
     }  
    //  else if (window.digitalData.page.pageInfo.pageType === 'Landing') {
    //   document.querySelector('.SG204-brands').insertAdjacentElement('afterend', component);
    // } 
    // else if (window.digitalData.page.pageInfo.pageType === 'PLP') {
    //   document.documentElement.classList.add(`${ID}-PLP`);
    //   document.querySelector('.u-site-container').insertAdjacentElement('afterbegin', component);
    // }
   }
 }
 
 