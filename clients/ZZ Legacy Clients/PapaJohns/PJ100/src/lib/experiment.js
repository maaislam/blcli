/**
 * PJ100 - Dual column layout of mobile offers
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import initiateSlick from './initiateSlick';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  // console.log(`${shared.ID}   is RUNNING >>>`);
  initiateSlick();

  const topOffersContainer = document.querySelector(`.menuItems`);
  if (!document.querySelector(`.${shared.ID}-topOffersTitle`)) {
    topOffersContainer.insertAdjacentHTML('beforebegin', `<div class="${shared.ID}-topOffersTitle"><h2>Deals we think you'll love</h2></div>`);
  }
  
  const swipeEl = `<div class="${shared.ID}-swipe__wrapper">
    <div class="${shared.ID}-swipe">swipe <span class="icon"></span></div>
  </div>`;
  if (!document.querySelector(`.${shared.ID}-swipe__wrapper`)) {
    topOffersContainer.insertAdjacentHTML('afterend', swipeEl);
  }
  
  // if (!document.querySelector(`.${shared.ID}-moreOffersTitle`)) {
  //   document.querySelector('.more--offers--title').insertAdjacentHTML('beforebegin', `<div class="${shared.ID}-moreOffersTitle"><h2>All deals</h2></div>`);
  // }
  if (!document.querySelector(`.${shared.ID}-moreOffersTitle`) 
  && document.querySelector('.more--offers--title.student')) {
    document.querySelectorAll('.more--offers--title')[1].insertAdjacentHTML('beforebegin', `<div class="${shared.ID}-moreOffersTitle"><h2>All deals</h2></div>`);
  } else if (!document.querySelector(`.${shared.ID}-moreOffersTitle`)) {
    document.querySelector('.more--offers--title').insertAdjacentHTML('beforebegin', `<div class="${shared.ID}-moreOffersTitle"><h2>All deals</h2></div>`);
  }
  
  const moreOffers = document.querySelectorAll(`.more--offers--wrapper .moreOffersList`);
  [].forEach.call(moreOffers, (offer) => {
    const container = offer.querySelector('td.offer-details td.text p');
    const newBtn = `<div class="${shared.ID}-cta__wrapper">
      <div class="${shared.ID}-cta">Choose this deal</div>
    </div>`;

    if (!offer.querySelector(`.${shared.ID}-cta__wrapper`)) {
      container.insertAdjacentHTML('afterend', newBtn);
    }
    
  });

  // -------------------------------------------
    // PRM Manager Listen for State Changes
    // -------------------------------------------
    window.prm.add_endRequest(function (sender, error) {
      try {
        // console.log('------- something has changed -------------------------');
        // console.log(sender);
        if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbBasketItem"
        || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbSelectStoreMenuItem") {
          activate();
        } 
      } catch (e) {} 
    });
};


export default activate;
