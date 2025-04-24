/**
 * HC055 - Offer Visibility
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, sendClickEvents } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import resetSlick from './resetSlick';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  if (VARIATION == '1') {
    const offerBar = document.querySelector(`.${ID}-offers-top-level`);
    if(offerBar) {
      offerBar.remove();
    }
  }

  // Write experiment code here
  if (VARIATION == '1') {
    const newMenuItem = `<li class="${ID}-offers-top-level top-level">
      <a href="https://www.hotelchocolat.com/uk/shop/collections/prices/special-offers/">
        OFFERS
      </a>
    </li>`;

    /**
     * @desc On this breakpoint 960px - 1279px
     * we need to unslick the carousel and re-run Slick on the list
     */
    if (window.innerWidth < 1280 && window.innerWidth >= 960) {
      pollerLite(['ul#main-navigation.slick-initialized'], () => {
        resetSlick();
      });
      console.log(newMenuItem);
      
      document.querySelectorAll('#main-navigation li.top-level')[3].insertAdjacentHTML('afterend', newMenuItem);

      window.addEventListener('resize', (e) => {
        if (window.innerWidth < 1280 && window.innerWidth >= 960) {
          resetSlick();
        } else {
          jQuery(`ul#main-navigation`).slick('unslick');
        }
      });

    } else {
      document.querySelector('#main-navigation').insertAdjacentHTML('beforeend', newMenuItem);
    }
    // document.querySelector('#main-navigation').insertAdjacentHTML('beforeend', newMenuItem);

    sendClickEvents();

    /**
     * @desc Re-select current active category
     */
    if (window.location.href.indexOf('uk/shop/collections/prices/special-offers') > -1) {
      const currentCat = document.querySelector(`ul#main-navigation li.top-level.current`);
      if (currentCat) {
        currentCat.classList.remove('current');

        document.querySelector(`li.${ID}-offers-top-level`).classList.add('current');
      }
    }

  } else if (VARIATION == '2'
  && window.location.href.indexOf('uk/shop/collections/prices/special-offers') == -1) {
    let bannerText = '';
    if (window.innerWidth > 320) {
      bannerText = `<h3>Shop our latest Mix & Match offers. <a href="https://www.hotelchocolat.com/uk/shop/collections/prices/special-offers/">Click here</a></h3>`;
    } else {
      bannerText = `<h3>Shop our latest Mix & Match offers.</br><a href="https://www.hotelchocolat.com/uk/shop/collections/prices/special-offers/">Click here</a></h3>`;
    }

    const newOfferBanner = `<div class="${ID}-offerBanner__wrapper">
      <div class="${ID}-offerBanner__container">
        ${bannerText}
      </div>
    </div>`;

    document.querySelector('#main-header').insertAdjacentHTML('beforebegin', newOfferBanner);

    sendClickEvents();
  }

  
};


export default activate;