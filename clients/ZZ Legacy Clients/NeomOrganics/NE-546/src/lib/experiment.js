/**
 * NE-546 - V-day PLP in-grid ad-blocks
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getTopLevelPLP } from './helpers';
import { checkIntersection } from '../../../../../evelyn/scrolling';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  let url = null;
  let topPLPs = ['/collections/home',
  '/collections/bath-body',
  '/collections/skincare'];
  url = getTopLevelPLP(window.location.pathname);
  if (topPLPs.indexOf(window.location.pathname) > -1) {
    url = window.location.pathname;
  } 
  

  const data = {
    '/collections/home': 'https://ucds.ams3.digitaloceanspaces.com/Copy%20of%20Wellbeing-Pod-Animation-Email-600x550.gif',
    '/collections/skincare': 'https://ucds.ams3.digitaloceanspaces.com/NE-522/Neom_FaceNPD_Aug21-4079.png',
    '/collections/bath-body': 'https://ucds.ams3.digitaloceanspaces.com/NE-522/Neom_SuperShowerPower_web-0161.png',
  };

  const imageToShow = data[url.replace(/\/$/, '')];
  if(imageToShow) {
    setup();

    if (!document.querySelector(`body.${ID}-fire-event-sent`)) {
      fireEvent(`Conditions Met`);
      document.querySelector(`body`).classList.add(`${ID}-fire-event-sent`);
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
      const targetEl = document.querySelectorAll('#MainContent .columns.is-multiline.is-mobile.has-padding-top-tiny .column')[4];
      checkIntersection(targetEl).then(() => {
        fireEvent(`Visible - Ad Block`);
      });

      return;
    }

    // -----------------------------
    // Write experiment code here
    // -----------------------------
    // ...

    // Create target container divs
    // -----------------------
    const cols = document.querySelectorAll('#MainContent .columns.is-multiline.is-mobile.has-padding-top-tiny .column');
    if(cols.length) {
      const winCutoff = 769;
      let colPosPod = null;

      // Indices for Target Elements
      if (window.innerWidth > 1087) {
        colPosPod = window.innerWidth < winCutoff ? 2 : 6;
      } else if (window.innerWidth <= 1087 && window.innerWidth > 768)  {
        colPosPod = window.innerWidth < winCutoff ? 2 : 3;
      } else {
        colPosPod = window.innerWidth < winCutoff ? 4 : 6;
      }
      

      [].forEach.call(cols, (col, idx) => {
        if(idx == colPosPod - 1) {
          col.insertAdjacentHTML('afterend', `
            <div class="${ID}-first"></div>
          `);
        } 
      });
    }


    let bannerOne = '';
    // let bannerTwo = '';

    if (url == '/collections/home') {
      bannerOne = `<a data-banner="Shop Wellbeing Pod" class="banner__inner shop_wellbeing_pod" href="/collections/the-wellbeing-pod" style="background: #FFF url('${imageToShow}');">
        <h3><span>Give The</span> <strong>Ultimate Gift</strong> </h3>
        <button href="/collections/the-wellbeing-pod">Shop Wellbeing Pod</button>
      </a>`
    } else if (url == '/collections/skincare') {
      bannerOne = `<a data-banner="Shop Overnight Facial Cream" class="banner__inner shop_overnight_facial_cream" href="/collections/perfect-nights-sleep-overnight-facial-cream" style="background: #FFF url('${imageToShow}');">
        <h3><span>Wake up to your</span> <strong>Best-Ever Skin</strong> </h3>
        <button href="/collections/perfect-nights-sleep-overnight-facial-cream">Shop Overnight Facial Cream</button>
      </a>`
    } else if (url == '/collections/bath-body') {
      bannerOne = `<a data-banner="Shop Super Shower Power" class="banner__inner shop_super_power_shower" href="/collections/super-shower-power-body-cleanser" style="background: #FFF url('${imageToShow}');">
        <h3><span>For That</span> <strong>Energising</br>Boost</strong> </h3>
        <button href="/collections/super-shower-power-body-cleanser">Shop Super Shower Power</button>
      </a>`
    } 

    const first = document.querySelector(`.${ID}-first`);
    
    const allProducts = document.querySelectorAll('section.section .container .column.is-3-desktop.is-4-tablet.is-6-mobile');
    if(shared.VARIATION != 'control') {
      if(first) {
        first.insertAdjacentHTML('afterbegin', bannerOne);


        // Events
        checkIntersection(first).then(() => {
          fireEvent(`Visible - Hero banner - ${first.querySelector('a').getAttribute('data-banner')}`);
        });

        first.addEventListener('click', e => {
          fireEvent(`Click - Hero banner - ${first.querySelector('a').getAttribute('data-banner')}`);
        });

      }
    }
  }
};
