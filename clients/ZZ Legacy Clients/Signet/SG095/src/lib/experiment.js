/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';
import BottomMenu from './markup';
import SearchBox from './search';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');

    const menu = document.querySelector('#js-main-nav-toggle');
    const storesIcon = document.querySelector('.header__links .top-links .top-links__link');
    const shoppingBag = document.querySelector('.header__bag .shopping-bag');
    const logo = document.querySelector('.header__logo .logo__link');
   
    menu.addEventListener('click', () => {
      events.send(`${ID} variation: ${VARIATION}`, 'click', 'Header: Nav Menu');
    });

    storesIcon.addEventListener('click', () => {
      events.send(`${ID} variation: ${VARIATION}`, 'click', 'Header: Stores');
    });

    shoppingBag.addEventListener('click', () => {
      events.send(`${ID} variation: ${VARIATION}`, 'click', 'Header: Bag');
    });
    logo.addEventListener('click', () => {
      events.send(`${ID} variation: ${VARIATION}`, 'click', 'Header: Logo');
    });


  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();
    new BottomMenu();
    new SearchBox();


    // add close feature to navigation
    const nav = document.querySelector('#js-main-nav');
    nav.insertAdjacentHTML('afterbegin', `<div class="${ID}-navClose"><span></span></div>`);

    // Nav events
    const closeNavIcon = document.querySelector(`.${ID}-navClose`);
    const promoMessage = document.querySelector('.promotion-messages');
    closeNavIcon.addEventListener('click', () => {
      document.querySelector('#js-page-overlay').click();
      promoMessage.style = 'position: relative';
    });

    document.querySelector('#js-page-overlay').addEventListener('click', () => {
      promoMessage.style = 'position: relative';
    });
    

    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
