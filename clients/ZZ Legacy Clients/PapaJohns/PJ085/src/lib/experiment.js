/**
 * PJ085 - Sticky carousel navigation on mobile
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import shared from './shared';
import initiateSlick from './initiateSlick';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  const nav = document.querySelector('.header.header_pj.mobileHeaderPJ .hInner .botOptions');
  nav.classList.add(`${shared.ID}-nav`);

  const activeOption = nav.querySelector('ul.logoPadding.sectionsMenu li a.active');
  if (activeOption) {
    const activeParentEl = activeOption.closest('li');
    activeParentEl.classList.add('active');
  }
  
  // --- OFFERS Page
  if (window.location.pathname.indexOf('/offers.aspx') > -1) {
    document.querySelector('.offersMobileBtnContainer .offersBoxC').classList.add('active');
  }

  initiateSlick();


   // -------------------------------------------
  // PRM Manager Listen for State Changes
  // -------------------------------------------
  window.prm.add_endRequest(function (sender, error) {
    try {
      // console.log(sender);
      if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbBasketItem"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbSelectStoreMenuItem") {
        activate();
        initiateSlick();
      } 
    } catch (e) {} 
  });
};

export default activate;
