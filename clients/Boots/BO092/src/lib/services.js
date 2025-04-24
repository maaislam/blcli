import { events, pollerLite } from './../../../../../lib/utils';
import shared from './shared';

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  // set up events
  events.setDefaultCategory('Experimentation');
  events.setDefaultAction(CLIENT + " - "+ID);

  if(LIVECODE == "true") {
    events.sendEvents = false;
  } else {
    events.sendEvents = true;
  }

  // adds document body classlist 
  document.documentElement.classList.add(ID);
  document.documentElement.classList.add(`${ID}-${VARIATION}`);
};

export const fireEvent = (label) => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  events.sendAuto(VARIATION, label);

}


/*  ----------------
  Cookie opt in check
  ------------------ */
  export const cookieOpt = () => {
    const { ID, VARIATION } = shared;

    pollerLite([
     () => {
      return !!window.ga
     }], () => {
       fireEvent(`${ID}-${VARIATION} Experiment Fired`);
     });
  }

  export const getHighestRatingReview = () => {
    const { ID, VARIATION } = shared;
    // alert('Find review');
    const allTopReviews = document.querySelectorAll('#BVRRContainer .bv-head-to-head-item');
    const allReviews = document.querySelectorAll('#BVRRContainer ol.bv-content-list.bv-content-list-reviews li.bv-content-item.bv-content-review');

    let maxRating = 0;
    let highestRatedReview = '';

    if (maxRating < 5) {
      for (let i = 0; i < allReviews.length; i += 1) {
        let review = allReviews[i];
        let rating = review.querySelector('.bv-content-rating.bv-rating-ratio meta[itemprop="ratingValue"]').getAttribute('content');
        rating = parseFloat(rating);

        let ratingComment = '';
        let temp = review.querySelector('.bv-content-summary .bv-content-summary-body-text');
        if (temp.querySelector('a')) {
          temp.querySelector('a').parentElement.removeChild(temp.querySelector('a'));
        }
        ratingComment = temp.textContent.trim();

        if (rating > maxRating) {
          maxRating = rating;
          highestRatedReview = ratingComment;

          if (document.querySelector(`.${ID}-highest-rated-comment`)) {
            document.querySelector(`.${ID}-highest-rated-comment`).classList.remove(`${ID}-highest-rated-comment`);
          }
          review.classList.add(`${ID}-highest-rated-comment`);
        }

      }
    }
    

    // console.log(`HIGHEST REVIEW: ${maxRating}`);
    // console.log(`"${highestRatedReview}"`);
    
    return highestRatedReview;
  }
  
