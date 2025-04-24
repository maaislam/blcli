/**
 * PJ079 - Persuasive postcode entry on mobile offers
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  // -- Change text in CTA
  const getStartedCta = document.querySelector('#ctl00_cphBody__objOffersMobile_pnlPostCode a');
  getStartedCta.innerText = "Get started";
  // -- Change text in title
  document.querySelector('#ctl00_cphBody__objOffersMobile_pnlPostCode h2').innerText = "See your store’s unique offers and menus";
  const overlayContainer = `<div class="${shared.ID}-overlay">
    <p>Enter your postcode to find the<br>best deals from your local store</p>
  </div>
  <div class="${shared.ID}-overlay__wrapper"></div>`;
  document.querySelector('.offers-m-cont').insertAdjacentHTML('beforebegin', overlayContainer);
  
  const headerContainer = document.querySelector('.header.header_pj.mobileHeaderPJ');
  const mobileMenuBtn = document.querySelector('td.mobileMenu');

  const overlayWrapper = document.querySelector(`.${shared.ID}-overlay__wrapper`);
  const overlayContent = document.querySelector(`.${shared.ID}-overlay`);
  const postcodeInput = document.querySelector('input#ctl00_cphBody__objOffersMobile_txtPostcode');
  postcodeInput.addEventListener('click', (touchend) => {
    overlayContent.classList.add('hide');
    overlayWrapper.classList.add('hide');
  });

  overlayWrapper.addEventListener('click', (touchend) => {
    overlayContent.classList.remove('hide');
    overlayWrapper.classList.remove('hide');
  });
  headerContainer.addEventListener('click', (touchend) => {
    if (!document.querySelector('.omnibarMenu.obMenuInside .aside.in')) {
      overlayContent.classList.remove('hide');
      overlayWrapper.classList.remove('hide');
    } else {
      document.querySelector('.omnibarMenu.obMenuInside .aside.in span.close').addEventListener('click', (touchend) => {
        overlayContent.classList.remove('hide');
        overlayWrapper.classList.remove('hide');
      });
    }
    
  });
  mobileMenuBtn.addEventListener('click', (touchend) => {
    overlayContent.classList.add('hide');
    overlayWrapper.classList.add('hide');
  });
  
  // -------------------------------------------
  // PRM Manager Listen for State Changes
  // -------------------------------------------
  window.prm.add_endRequest(function (sender, error) {
    try {
      // console.log(sender);
      // if (sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$lbGetStarted") {
      // }
    } catch (e) {} 
  });
};

export default activate;
