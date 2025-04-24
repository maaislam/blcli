/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { events, pollerLite, logMessage, observer, updateUrlParameter } from '../../../../../lib/utils';
// set up variation control variables
const { ID, VARIATION, CLIENT } = shared;
// set SD analytics ref
events.analyticsReference = '_gaUAT';

const makePageAmends = () => {

  pollerLite(['div[data-bv-show="reviews"] .bv-content-item'], () => {

    let reviewsContainer = document.querySelector('div[data-bv-show="reviews"]');

    if(reviewsContainer.querySelectorAll('.bv-content-item').length < 2) {
      let notEnoughReviewsMessage = "Conditions Met - Not enough reviews to proceed";
      logMessage(notEnoughReviewsMessage);
      fireEvent(notEnoughReviewsMessage);
      return;
    }

    let firstReview = reviewsContainer.querySelector('.bv-content-item');

    let firstReviewHeight = firstReview.offsetHeight;

    let totalAllowedHeight = firstReviewHeight + (firstReviewHeight / 2);

    let reviewContainerList = reviewsContainer.querySelector('.bv-content-list');

    let controlBar = reviewsContainer.querySelector(`.bv-control-bar`);

    if(VARIATION == 1) {
      reviewContainerList.setAttribute('style', 'height: '+totalAllowedHeight+'px !important;');
      reviewContainerList.classList.add(`${ID}-restricted-height`);
    } else {
      
      controlBar.classList.add(`${ID}-hidden`);
      reviewContainerList.classList.add(`${ID}-fully-closed`);
    }

    

    let loadMoreExisting = reviewsContainer.querySelector('.bv-content-pagination');
    if(loadMoreExisting) {
      loadMoreExisting.classList.add(`${ID}-hidden`);
    }
    

    let viewMoreHTML = `
      <div class="${ID}-loadmore">
        <a href="#" id="${ID}-loadmore-button" class="${ID}-loadmore-button btn btn-default"> Read more </a>
        <a href="#" id="${ID}-readless-button" class="${ID}-loadmore-button ${ID}-show-fewer ${ID}-hidden btn btn-default"> Show fewer </a>
      </div>
    `;

    reviewContainerList.insertAdjacentHTML('afterend', viewMoreHTML);

    let loadMoreHolder = document.querySelector(`.${ID}-loadmore`);
    let loadMoreButton = document.getElementById(`${ID}-loadmore-button`);
    let readLessButton = document.getElementById(`${ID}-readless-button`);

    loadMoreButton.addEventListener('click', (e) => {
      e.preventDefault();
      reviewContainerList.setAttribute('style', '');
      
      if(loadMoreExisting) {
        loadMoreExisting.classList.remove(`${ID}-hidden`);
      }

      loadMoreButton.classList.add(`${ID}-hidden`);
      readLessButton.classList.remove(`${ID}-hidden`);

      
      if(VARIATION == 1) {
        reviewContainerList.classList.remove(`${ID}-restricted-height`);
      } else {
        reviewContainerList.classList.remove(`${ID}-fully-closed`);
        controlBar.classList.remove(`${ID}-hidden`);
      }
      

      let moreLoadedMessage = "All reviews shown by clicking 'read more' button";
      logMessage(moreLoadedMessage);
      fireEvent(moreLoadedMessage);

    });

    readLessButton.addEventListener('click', (e) => {
      e.preventDefault();
      reviewContainerList.setAttribute('style', 'height: '+totalAllowedHeight+'px !important;');
      
      if(loadMoreExisting) {
        loadMoreExisting.classList.add(`${ID}-hidden`);
      }

      loadMoreButton.classList.remove(`${ID}-hidden`);
      readLessButton.classList.add(`${ID}-hidden`);

      
      if(VARIATION == 1) {
        reviewContainerList.classList.add(`${ID}-restricted-height`);
      } else {
        reviewContainerList.classList.add(`${ID}-fully-closed`);
        controlBar.classList.add(`${ID}-hidden`);
      }
      

      let moreLoadedMessage = "Reviews hidden by clicking 'show fewer' button";
      logMessage(moreLoadedMessage);
      fireEvent(moreLoadedMessage, true);

    });

    let variantMessage = "Visible - Reviews amended";
    logMessage(variantMessage);
    fireEvent(variantMessage);

  })

}

export default () => {
  setup();

  logMessage(ID + " Variation "+VARIATION);

  fireEvent('Conditions Met');

  if(VARIATION == "control") {

    return;   

  } 

  makePageAmends();


};
