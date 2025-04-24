/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import getReviews from './getReviews';
import obsIntersection from './observeIntersection';

const { ID, VARIATION } = shared;
// const reviewsHeader = document.querySelector('[class^="ProductPowerReviewsFilter__ReviewsFilterWrapper"]');
// const reviews = document.querySelector('[class^="ProductPowerReviews__ReviewsItems-sc"]');
const isPDP = () => {
  return !!document.querySelector('[data-test-id="pdp-wrapper"]');
};
const intersectionCallback = (entry, observer) => {
  if (entry.isIntersecting) {
    fireEvent('Conditions Met');
    observer.disconnect();
    getReviews().then(({ results }) => {
      const rollup = results[0].rollup;
      //const avgRating = rollup.average_rating;
      const mostPositive = rollup.faceoff_positive.rating;
      //console.log(avgRating, mostPositive);
      fireEvent(`Rating for most popular review: ${mostPositive}`);
    });
  }
};

const init = () => {
  if (!isPDP()) return;

  setup();
  const revWrapper = document.querySelector('[class^="ProductPowerReviewsMostLiked__MostLikedWrapper-sc"]');
  obsIntersection(revWrapper, 0.5, intersectionCallback);
  //fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

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
  const mostlikedReviewWrapper = document.querySelector('[class^="ProductPowerReviewsMostLiked__MostLikedWrapper"]');
  mostlikedReviewWrapper?.classList.add(`${ID}__most-liked-wrapper`);
  const reviewsHeader = document.querySelector('[class^="ProductPowerReviewsFilter__ReviewsFilterWrapper"]');
  const reviews = document.querySelector('[class^="ProductPowerReviews__ReviewsItems-sc"]');
  reviewsHeader.classList.add(`${ID}__hide`);
  reviews.classList.add(`${ID}__hide`);

  const toggleReviewBtn = `
    <div class="${ID}__toggle-btn">
      <span class="opener">See more</span>
      <span class="closer ${ID}__hide">See less</span>
    </div>`;

  if (document.querySelector(`.${ID}__toggle-btn`)) return;
  const powerRevWrapper = document.querySelector('[data-test-id="power-reviews-wrapper"]');
  const anchor = mostlikedReviewWrapper || powerRevWrapper;
  anchor.insertAdjacentHTML('afterend', toggleReviewBtn);
};

export default () => {
  //get average rating

  init();

  // Poll and re-run init

  const appContainer = document.querySelector('#app-container');

  // ------------------------------------
  // Added Poller:
  // Checks for page changes and checks to see if the URL has changed
  // ------------------------------------
  let oldHref = document.location.href;
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      if (oldHref !== document.location.href) {
        oldHref = document.location.href;

        pollerLite(
          [
            'body',
            '[class^="ProductPowerReviewsMostLiked__MostLikedWrapper"]',
            '[class^="ProductPowerReviewsFilter__ReviewsFilterWrapper"]',
            '[class^="ProductPowerReviews__ReviewsItems-sc"]',
          ],
          () => {
            setTimeout(init, 2000);
          }
        );
      }
    });
  });

  const config = {
    childList: true,
    subtree: true,
  };

  observer.observe(appContainer, config);

  const toggleReview = (open = true, allowTrack = true) => {
    const reviewsHeader = document.querySelector('[class^="ProductPowerReviewsFilter__ReviewsFilterWrapper"]');
    const reviews = document.querySelector('[class^="ProductPowerReviews__ReviewsItems-sc"]');

    if (open) {
      document.querySelector(`.${ID}__toggle-btn .opener`).classList.add(`${ID}__hide`);
      document.querySelector(`.${ID}__toggle-btn .closer`).classList.remove(`${ID}__hide`);
      reviewsHeader.classList.remove(`${ID}__hide`);
      reviews.classList.remove(`${ID}__hide`);
      allowTrack && fireEvent('user expands reviews');
    } else {
      document.querySelector(`.${ID}__toggle-btn .opener`).classList.remove(`${ID}__hide`);
      document.querySelector(`.${ID}__toggle-btn .closer`).classList.add(`${ID}__hide`);
      reviewsHeader.classList.add(`${ID}__hide`);
      reviews.classList.add(`${ID}__hide`);
      allowTrack && fireEvent('user collapses reviews');
    }
  };

  document.body.addEventListener('click', ({ target }) => {
    //console.log(target);
    if (target.closest(`.${ID}__toggle-btn .opener`)) {
      toggleReview();
    } else if (target.closest(`.${ID}__toggle-btn .closer`)) {
      toggleReview(false);
    } else if (target.closest('[data-test-id="add-to-delivery-btn"]') && !target.closest('button').disabled) {
      fireEvent('User adds to bag (delivery)');
    } else if (target.closest('[data-test-id="add-to-collection-btn"]') && !target.closest('button').disabled) {
      fireEvent('User adds to bag (click & collect)');
    } else if (
      target.closest('[data-test-id="reviews-search"] > div') &&
      target.closest('[data-test-id="reviews-search"]').querySelector('input').value !== ''
    ) {
      fireEvent('User searches for reviews');
    } else if (target.closest('[data-test-id="dropdown option"]')) {
      const item = target.closest('[data-test-id="dropdown option"]').querySelector('span').innerText;
      fireEvent(`User interacts with the review sort by: ${item}`);
    } else if (target.closest('[data-test-id="reviews-histogram"]')) {
      toggleReview(true, false);
      const reviewBand = target.closest('[data-test-id="reviews-histogram"]').querySelector('span:first-child').innerText;
      //console.log(reviewBand);
      fireEvent(`User interacts with the review totals: ${reviewBand}`);
    }
  });
};
