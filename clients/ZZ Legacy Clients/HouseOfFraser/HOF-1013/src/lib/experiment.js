/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const makeAmends = (page) => {

  let frasersPlusTextContainer, frasersPlusTextSelector = ``;

  if(page == "home") {

    frasersPlusTextSelector = '.frasers-plus-outer-container .frasers-plus-text:not(.frasers-plus-brand)';

  } else if (page == "category") {

    frasersPlusTextSelector = '.frasers-plus-advert .fplus-content';

  } else if (page == "product") {

    frasersPlusTextSelector = '.frasers-plus-outer-container .frasers-plus-text:not(.frasers-plus-brand)';

  } else if (page == "basket") {

    frasersPlusTextSelector = '.frasers-plus-outer-container .frasers-plus-text:not(.frasers-plus-brand)';

  }

  pollerLite([frasersPlusTextSelector], () => {
    frasersPlusTextContainer = document.querySelector(frasersPlusTextSelector);
    frasersPlusTextContainer.classList.add(`${ID}-amended`);
    frasersPlusTextContainer.querySelector(`.${ID}-amended h3 strong`).innerHTML = `Pay in 3, interest free`;
    frasersPlusTextContainer.querySelector(`.${ID}-amended p`).remove();
    frasersPlusTextContainer.querySelector(`.${ID}-amended h3`).insertAdjacentHTML('afterend', `<p>Credit subject to status</p><p>Representative APR: 29.9&percnt; (variable)</p>`);
    fireEvent('Visible - changes have been made to the banner on the ' + page + ' page', true);
  });

}

const addTracking = () => {

  document.body.addEventListener('click', (e) => {

    if (e.target.closest('.frasers-plus-outer-container') || e.target.closest('.frasers-plus-advert')) {

      fireEvent('Click - Frasers Plus banner Clicked', true);

    } else if (e.target.closest('.frasers-plus-sign-up-link')) {

      fireEvent('Click - Frasers Plus Sign Up button within popup modal Clicked', true);

    }

  });

  let fPlusSelector;

  if (document.body.classList.contains('flanProdList')) {

    pollerLite(['.frasers-plus-advert'], () => {
      let selector = document.querySelector('.frasers-plus-advert');
      startIntersectionObserver(selector);
    });


  } else {

    pollerLite(['.FrasersPlusAdvert'], () => {
      let selector = document.querySelector('.FrasersPlusAdvert');
      startIntersectionObserver(selector);
    });

  }

  

}

const startIntersectionObserver = (selector) => {

  let scrollWatch = new window.IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        let seenPLPEntryMessage = `Visible - user has seen the Frasers Plus banner on ${window.location.href}`;
        fireEvent(seenPLPEntryMessage, true);

        scrollWatch.unobserve(selector);
      }
    });
  }, { root: null });

  scrollWatch.observe(selector);


}

export default () => {

  events.analyticsReference = window.ga ? 'ga' : '_gaUAT';

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  addTracking();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  if(document.body.classList.contains('Home')) {

    makeAmends('home');

  } else if(document.body.classList.contains('flanProdList')) {

    makeAmends('category');

  } else if(document.body.classList.contains('ProdDetails')) {

    makeAmends('product');

  } else if(document.body.classList.contains('Basket')) {

    makeAmends('basket');

  }

};
