/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import newReviewArea from './newReviewArea';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  document.querySelector('.RatingAndShare').classList.add(`${ID}__rating--share`);
  const ratingContainer = document.querySelector('.yotpo-star-digits');

  const ratingVal = ratingContainer.innerHTML.trim();

  if (ratingVal > 4) {
    fireEvent('Customer has visited a product page with a review score above 4');
  }
  // document.querySelectorAll('.star-clickable').forEach((item) => {
  //   item.addEventListener('click', (e) => {
  //     fireEvent('Customer has clicked the stars or the number of reviews');
  //   });
  // });

  document.body.addEventListener('click', (e) => {
    if (e.target.innerText === 'Submit a review' || e.target.innerText.toLowerCase() == 'produkt bewerten') {
      fireEvent('Customer has clicked “Produkt Bewerten”');
    } else if (e.target.closest('.star-clickable')) {
      fireEvent('Customer has clicked the stars or the number of reviews');
    }
  });
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  // create an observer instance
  console.log('test');
  ratingVal > 4 && newReviewArea(ID, ratingVal, fireEvent);
  var target = document.querySelector('#MainContentWrapper');

  var observer = new MutationObserver((mutations) => {
    mutations.forEach(function (mutation) {
      if (document.querySelectorAll('.submit-review').length === 0 || document.querySelectorAll('.rev-count').length === 0) {
        ratingVal > 4 && newReviewArea(ID, ratingVal, fireEvent);
      }
    });
  });

  // configuration of the observer:
  var config = { attributes: false, childList: true, characterData: false, subtree: true };

  observer.observe(target, config);
};
