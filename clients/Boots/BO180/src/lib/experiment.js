/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  

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

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  // const sessionCt = () => {

  //   // if first visit
  //   if (!localStorage.getItem("BO180ct")) {
  //     localStorage.setItem("BO180ct", 0);

  //   } else if(localStorage.getItem("BO180ct") && localStorage.getItem("BO180ct") === 0){
  //     const lsCount = localStorage.getItem("BO180ct");
  //     localStorage.setItem("BO180ct", +lsCount + 1);
  //   }

  //   const sessionAmount = localStorage.getItem("BO180ct");
  //   return sessionAmount;
  // }

  // console.log(sessionCt());

  const sessionCount = () => {


    if (!localStorage.getItem("BO180new")) {
      if(document.referrer.indexOf('boots.com') === -1) {
        localStorage.setItem("BO180new", true);

        sessionStorage.setItem('BO180stored', true);
      }
    } else if(!sessionStorage.getItem('BO180stored')){
      if(document.referrer.indexOf('boots.com') === -1) {
        localStorage.setItem("BO180new", false);
      }
    } 
  }

  const banner = () => {
    const bannerEl = `
    <div class="${ID}-basketbanner">
      <div class="${ID}-close"></div>
      <div class="${ID}-inner">
          <a href="https://www.boots.com/OrderItemDisplay"></a>
          <span></span><p>We’ve saved your items in your basket. Click <a href="https://www.boots.com/OrderItemDisplay">here</a> to checkout</p>
      </div>
    </div>`;
    return bannerEl;
  }

  sessionCount();

  
  if(localStorage.getItem("BO180new") === 'false') {

    if(document.referrer.indexOf('boots.com') === -1) {
      const total = parseFloat(document.querySelector('#minishopcart_total').textContent.trim());
      if(total >= 1) {
      
        if(!sessionStorage.getItem(`${ID}-bannerShow`)) {

          if(VARIATION === '1') {

            fireEvent('Conditions Met');
            sessionStorage.setItem(`${ID}-bannerShow`, 1);
            document.documentElement.classList.add(`${ID}-bannerShow`);
            document.body.insertAdjacentHTML('beforeend', banner());

            const bannerLinks = document.querySelectorAll(`.${ID}-basketbanner`);
            if(bannerLinks) {
              for (let index = 0; index < bannerLinks.length; index += 1) {
                const element = bannerLinks[index];
                element.addEventListener('click', () => {
                  fireEvent('Clicked saved basket message');
                });
              }
            }


            // on close of banner
            document.querySelector(`.${ID}-close`).addEventListener('click', () => {
              document.documentElement.classList.remove(`${ID}-bannerShow`);
              document.querySelector(`.${ID}-basketbanner`).remove();
            });

          } else {
            fireEvent('Conditions Met');
          }
        }
      }
    }
  }

};
