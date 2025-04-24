/**
 * HC038 - Price Framing Reviews
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.hotelchocolat.com/uk/penguin-selector-bundle-gift.html#shownresults=24&backpid=fruit-chocolate-box&start=3
 * 
 * https://www.hotelchocolat.com/uk/everything-chocolate-box.html#shownresults=11&backpid=everything-chocolate-box&start=5
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import data from './reviewData';
import reviewContent from './data';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  const pathname = window.location.pathname;
  pollerLite(['#bv-review-container .bv-masthead-product.bv-summary-bar .bv-rating-ratio-count a'], () => {
    // console.log('[031] POLLER 1 ---');
    let totalNumOfReviews = document.querySelector('#bv-review-container .bv-masthead-product.bv-summary-bar .bv-rating-ratio-count a').innerText.trim().replace('This action will navigate to reviews.', '');
    totalNumOfReviews = totalNumOfReviews.replace(' Reviews', '');
    // console.log(pathname);

    pollerLite(['ol.bv-content-list.bv-content-list-reviews li.bv-content-item.bv-content-top-review.bv-content-review'], () => {
      // console.log('[038] POLLER 2 ---');
      if (VARIATION == '1') {
        data.review = reviewContent[`${pathname}`].review;
        // console.log('-- V1', data.review);
      } else if (VARIATION == '2') {
        const allReviews = document.querySelectorAll('ol.bv-content-list.bv-content-list-reviews li.bv-content-item.bv-content-top-review.bv-content-review');
  
        for (let i = 0; i < allReviews.length; i += 1) {
          const review = allReviews[i];
  
          const stars = review.querySelector('.bv-rating-stars-container abbr').getAttribute('title');
          const reviewText = review.querySelector('.bv-content-summary-body p').innerText.trim();
          if (stars == '5 out of 5 stars.' && reviewText !== '') {
            data.review = reviewText;
            // console.log('-- V2', data.review);
            break;
          }
        }
      }
  
      
  
      /**
       * @desc If a 5-star review is available
       * then generate new content for product review
       */
      if (data.review !== "") {
        // --- Shorten review
        let reviewText = data.review;
        const hiddenDataReview = data.review;
        if (data.review.length > 116) {
          data.shortReview = data.review.substr(0, 116);
          reviewText = `${data.shortReview}... <span class="read-more__show" style="text-decoration: underline;font-size: 18px;">Read more</span>`;
        }
  
        const reviewContainer = `<div class="${ID}-review__wrapper">
          <div class="${ID}-reviewStars__wrapper">
            <img style="width: 130px;" src="https://editor-assets.abtasty.com/48343/5fe3d2d88f4511608766168.png">
          </div>
          <div class="${ID}-reviewText__wrapper">
            <div class="quotationMark open"></div>
              <div class="text" data-review="${hiddenDataReview}">${reviewText}</div>
            <div class="quotationMark close"></div>
          </div>
          <div class="read-more">Read all ${totalNumOfReviews} reviews</div>
        </div>`;

        pollerLite(['.product-actions'], () => {
          // console.log('[088] POLLER 3 ---');
          const socialMediaContainer = document.querySelector('.product-actions');

          socialMediaContainer.insertAdjacentHTML('beforebegin', reviewContainer);
          // console.log('>>>Added review before social media');
          // console.log(socialMediaContainer);
    
          /**
           * @desc Read All Reviews 
           * on click it's scrolling to the Reviews Section
           * showing all product reviews
           */
          const readMore = document.querySelector(`.${ID}-review__wrapper .read-more`);
          const reviewsMobileTab = document.querySelector('a.reviews.tab-mobile-title');
          const reviewsDesktopTab = document.querySelector('ul.tabs-menu.ui-tabs-nav.ui-corner-all.ui-helper-reset.ui-helper-clearfix.ui-widget-header li[aria-controls="tabReviews"] a');
          if (reviewsMobileTab) {
            readMore.addEventListener('click', (e) => {
              reviewsMobileTab.click();
              if (reviewsMobileTab.classList.contains('active')) {
                document.querySelectorAll('.tab-mobile-title')[1].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
              } else {
                reviewsMobileTab.click();
                document.querySelectorAll('.tab-mobile-title')[1].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
              }
            });
          } else if (reviewsDesktopTab) {
            readMore.addEventListener('click', (e) => {
              reviewsDesktopTab.click();
              if (reviewsDesktopTab.classList.contains('active')) {
                document.querySelector('.product-detail').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
              } else {
                reviewsDesktopTab.click();
                document.querySelector('.product-detail').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
              }
            });
          }
    
          /**
           * @desc If short review is available
           * then show the whole review on click "Read more"
           */
          const showComment = document.querySelector(`.${ID}-review__wrapper .read-more__show`);
          if (showComment) {
            showComment.addEventListener('click', () => {
              document.querySelector(`.${ID}-review__wrapper .text`).innerHTML = hiddenDataReview;
              // document.querySelector(`.${ID}-review__wrapper .quotationMark.close`).setAttribute('style', 'height: 190px;');
            });
          }
        });
        // --- END OF POLLER 3
  
        
        
        
      }
    });
    // --- END OF POLLER 2
  });
  // --- END OF POLLER 1

  // // At end of code, reset window.einstein expect type array
  // window.einstein.loaded = [];
};
