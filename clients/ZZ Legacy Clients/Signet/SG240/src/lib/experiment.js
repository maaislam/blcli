/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import Header from './components/header';
import { h, render } from "preact";
import { getData } from './data';
import MobileNavigation from './components/mobileNav';
import Search from './components/search';
import { hideSearch } from './helpers';
import DesktopNav from './components/desktopNav';

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
  var trackerName = window.ga.getAll()[window.ga.getAll().length - 1].get('name');
  window.ga(trackerName + '.send', 'event', 'HS240', `${ID} - V${VARIATION}`, `${ID} - V${VARIATION} Conditions Met`, {nonInteraction: true});

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

  if(VARIATION === 'control') {
    return;
  } else {
    new Header();

    document.body.insertAdjacentHTML("beforeend", `<div class="${ID}-overlay"></div>`);
    document.body.insertAdjacentHTML("beforeend", `<div class="${ID}-searchoverlay"></div>`);

    /* ----------------
    * Navigation
    * ---------------- */
    const navContainer = document.createElement("div");
    navContainer.classList.add(`${ID}-navigation`);
    
    const mobileAndTablet = window.innerWidth <= 1279;

    if (mobileAndTablet) {
      document.body.appendChild(navContainer);
      render(<MobileNavigation data={getData()}></MobileNavigation>, document.querySelector(`.${ID}-navigation`));
    } else {
      document.querySelector(`.${ID}-header .${ID}-middle`).appendChild(navContainer);
      render(<DesktopNav data={getData()}></DesktopNav>, document.querySelector(`.${ID}-navigation`));
    }

    const openNav = () => {
      const burger = document.querySelector(`.${ID}__navToggle`);
      const navClose = document.querySelector(`.Nav__close`);
      const overlay = document.querySelector(`.${ID}-overlay`);
      if (burger) {
        burger.classList.add(`${ID}-hidden`);
        navClose.classList.add(`${ID}-visible`);

        navContainer.classList.add(`${ID}-open`);
        navContainer.classList.remove(`${ID}-closed`);

        overlay.classList.add(`${ID}-visible`);
        document.documentElement.classList.add(`${ID}-noScroll`);
      }
    
      fireEvent("Clicked open nav");
    };

    const allNavLinks = document.querySelectorAll(`.${ID}-navigation a`);
      for (let index = 0; index < allNavLinks.length; index += 1) {
        const element = allNavLinks[index];
        element.addEventListener('click', (e) => {
          const elName = e.currentTarget.textContent;
          fireEvent(`Clicked nav link`, elName);
        });
      }

    document.querySelector(`.${ID}__navToggle`).addEventListener("click", () => {
      openNav();
      hideSearch();
    });
    /* ----------------
    * Search
    * ---------------- */
    new Search();
  }

};
