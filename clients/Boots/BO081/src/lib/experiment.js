/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import carousels from './components/carousels';
import HeroMarkup from './components/markup';
import slideOutCats from './components/slideOutCats';
import { cookieOpt, setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;
  setup();
  cookieOpt();



  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Experiment code 
    ------------------ */
  new HeroMarkup();

  if(VARIATION !== '3') {
    carousels();
  }

  // create the slide out categories
  if(VARIATION === '3') {
    slideOutCats();
  }

  const allTracking = () => {
    // v1 button click
    if(VARIATION !== '4') {
      const banners = document.querySelectorAll(`.${ID}_maincategory`);
      for (let index = 0; index < banners.length; index += 1) {
        const element = banners[index];
        const button = element.querySelector(`.${ID}__button.${ID}__primary`);
        const buttonName = button.textContent.trim();
        button.addEventListener('click', () => {
          window.cmCreateManualLinkClickTag(`/BO081?cm_sp=MaxymiserBO081Event-_-Clicked${buttonName}-_-Click`);
        });
      }
    }

    // all roundel events
    if(VARIATION === '1') {
      const roundels = document.querySelectorAll(`.${ID}_maincategory .${ID}_category`);
      for (let index = 0; index < roundels.length; index += 1) {
        const element = roundels[index];
        const elName = element.querySelector('p').textContent.trim();
        element.addEventListener('click', () => {
          window.cmCreateManualLinkClickTag(`/BO081?cm_sp=MaxymiserBO081Event-_-Clicked${elName}-_-Click`);
        });
      }
    }

    // quick links events
    if(VARIATION === '2') {
      const quickLinks = document.querySelectorAll(`.${ID}_maincategory .${ID}_linkItem`);
      for (let index = 0; index < quickLinks.length; index += 1) {
        const element = quickLinks[index];
        const linkName = element.querySelector('a').textContent.trim();
        element.addEventListener('click', () => {
          window.cmCreateManualLinkClickTag(`/BO081?cm_sp=MaxymiserBO081Event-_-Clicked${linkName}-_-Click`);
        });
      }
    }

    // slide out category events
    if(VARIATION === '3') {
      const catBlock = document.querySelectorAll(`.${ID}-contentWrapper .${ID}-block`);
      for (let index = 0; index < catBlock.length; index += 1) {
        const element = catBlock[index];
        const linkName = element.querySelector('p').textContent.trim();
        element.addEventListener('click', () => {
          window.cmCreateManualLinkClickTag(`/BO081?cm_sp=MaxymiserBO081Event-_-Clicked${linkName}-_-Click`);
        });
      }

      const catCTA = document.querySelectorAll(`.${ID}-contentWrapper .${ID}__button.${ID}__primary`);;
      for (let index = 0; index < catCTA.length; index += 1) {
        const element = catCTA[index];
        const ctaName = element.textContent.trim();
        element.addEventListener('click', () => {
          window.cmCreateManualLinkClickTag(`/BO081?cm_sp=MaxymiserBO081Event-_-Clicked${ctaName}-_-Click`);
        });
      }
    }
    if(VARIATION === '4') {
      const offerBlock = document.querySelectorAll(`.${ID}_maincategory`);
      for (let index = 0; index < offerBlock.length; index += 1) {
        const element = offerBlock[index];
        const shopAll = element.querySelector(`.${ID}__button.${ID}__blue`);
        const shopOffer = element.querySelector(`.${ID}__button.${ID}__primary`);
        shopAll.addEventListener('click', () => {
          window.cmCreateManualLinkClickTag(`/BO081?cm_sp=MaxymiserBO081Event-_-ClickedShopAll-_-Click`);
        });
        shopOffer.addEventListener('click', () => {
          window.cmCreateManualLinkClickTag(`/BO081?cm_sp=MaxymiserBO081Event-_-ClickedShopOffer-_-Click`);
        });
      }
    }
  }

  allTracking();
};
