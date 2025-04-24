/**
 * BO092 - PDP Review Framing
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.boots.com/nyx-professional-makeup-ultimate-shadow-palette-warm-neutrals-10223103
 */

import { cookieOpt, setup, fireEvent, getHighestRatingReview } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
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
  if (VARIATION == 'control') {
    fireEvent(`Conditions Met - Control fired`);
  } else if (VARIATION == '1') {
    fireEvent(`Conditions Met - V1 fired`);
    const priceWidget = document.querySelector('#estore_product_price_widget');
    const reviewStarContainer = document.querySelector('#BVRRSummaryContainer');
    // --- MOVE Price Container (Widget) above Star Reviews
    reviewStarContainer.insertAdjacentElement('beforebegin', priceWidget);

    pollerLite(['#estore_product_price_widget .details.details_redesign'], () => {
      if (document.querySelector('#estore_product_price_widget .details.details_redesign')) {
        // --- MOVE Price Details after Product Price
        document.querySelector('#estore_product_price_widget #PDP_productPrice').insertAdjacentElement('afterend', priceWidget.querySelector('.details.details_redesign'));
      }

      // --- ADD New Saving Price Container
      document.querySelector('#estore_product_price_widget').insertAdjacentHTML('afterend', `<div class="${ID}-savingPrice__wrapper"></div>`);
      // --- Saving Price
      pollerLite(['#estore_product_price_widget .saving.saving_redesign'], () => {
        document.querySelector(`.${ID}-savingPrice__wrapper`).insertAdjacentElement('afterbegin', document.querySelector('.saving.saving_redesign'));
      });

      // --- Old/Was Price
      pollerLite(['#estore_product_price_widget .was_prices_holder'], () => {
        document.querySelector(`.${ID}-savingPrice__wrapper`).insertAdjacentElement('beforeend', document.querySelector('#estore_product_price_widget .was_prices_holder'));
      });
    });


    // --- Top Comment
    let topComment = getHighestRatingReview();
    
    if (topComment !== '') {
      const topCommentContainer = `<div class="${ID}-topComment__wrapper">
        <div class="${ID}-wrapper"><div class="${ID}-topComment"></div></div>
        <a class="${ID}-read-top-review" href="javascript:void(0)">Read More</a>
      </div>`;
      reviewStarContainer.insertAdjacentHTML('afterend', topCommentContainer);

      /**
       * @desc On READ MORE click it scrolls down to the relevant review
       */
      document.querySelector(`.${ID}-read-top-review`).addEventListener('click', (e) => {
        // --- Scroll to most recent and highest rated review
        const y = document.querySelector(`.${ID}-highest-rated-comment`).getBoundingClientRect().top + window.pageYOffset

        window.scrollTo({top: y, behavior: 'smooth'});
        document.querySelector(`.${ID}-highest-rated-comment`).classList.add('backgroundAnimated');

        setTimeout(() => {
          document.querySelector(`.${ID}-highest-rated-comment`).classList.add('nextBackgroundAnimated');
        }, 1200);

        // --- CLICK EVENT on Read More CTA
        fireEvent(`Click - Review Read More CTA`);
      });

      // --- ADD Review Comment 
      document.querySelector(`.${ID}-topComment__wrapper .${ID}-topComment`).innerText = `${topComment}`;
      fireEvent(`Conditions Met - Review comment added`);
    } else {
      fireEvent(`Conditions Met - There was no review comment available`);
    }
    
    // --- CLICK EVENT on 
    const addToBasket = document.querySelector(`a#add2CartBtn`);
    addToBasket.addEventListener('click', (e) => {
      fireEvent(`Click - Add to Basket CTA`);
    });
  }
};
