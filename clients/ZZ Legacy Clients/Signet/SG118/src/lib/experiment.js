/**
 * SG118 - Homepage Personalisation [Prestige]
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname, scrapeDataFromPDP, generateNewContent } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';
import lastVisitedData from './prestigeWatchesSKUs';
import brandData from './brandBannerData';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');

    if (window.location.href.indexOf('/webstore/d/') > -1 && window.digitalData) {

      const prodBrand = digitalData.product[0].productInfo.brand;
      localStorage.setItem(`${ID}-last-visited-watch-brand-control`, `${prodBrand}`);

      events.send(`${ID} - Control`, 'Visited PDP', `${prodBrand}`);

    } else if (window.location.pathname == "/"
    && localStorage.getItem(`${ID}-last-visited-watch-brand-control`) !== null) {
      
      events.send(`${ID} - Control`, 'Visited Homepage', 'Showing - Control Banner');
      
    }
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');
    // setup();

    if(getSiteFromHostname() == 'ernestjones') {
      // console.log('DIGITAL   DATA : ');
      // console.log(window.digitalData);
      // EJ-specific JS
      if (window.location.href.indexOf('/webstore/d/') > -1 && window.digitalData) {
        setup();
        const prodBrand = digitalData.product[0].productInfo.brand;
        events.send(`${ID} - V${VARIATION}`, 'Visited PDP', `${prodBrand}`);
        scrapeDataFromPDP();

      } else if (window.location.pathname == "/" && localStorage.getItem(`${ID}-last-visited-watch-brand`) !== null) {

        var arr = ['Breitling','Bremont','Chanel','Chopard','Glashütte','Omega','TAG Heuer','Tudor','Zenith']

        if (arr.indexOf(localStorage.getItem(`${ID}-last-visited-watch-brand`)) > -1){

        const buttonEvents = () => {
          const allBannerButtons = document.querySelectorAll(`.${ID}-bannerBtn__container a`);
          for (let index = 0; index < allBannerButtons.length; index += 1) {
            const element = allBannerButtons[index];
            element.addEventListener('click', (e) => {
              const bannerName = e.currentTarget.parentNode.querySelector('.label');
              const buttonName = e.currentTarget.querySelector(`.${ID}-btn`);
              if(buttonName && bannerName){

                events.send(`${ID} - V${VARIATION}`, 'click', `${bannerName.textContent} button: ${buttonName.textContent}`);
              }

            });
          }

        }

        setup();
        //setTimeout(() => {
          generateNewContent();
          events.send(`${ID} - V${VARIATION}`, 'Visited Homepage', 'Showing - New Banner');
          buttonEvents();
        //}, 1700);
        
      }
      }
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
