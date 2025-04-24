/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage, observer, pollerLite } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID } = shared;
let zeroReviewFound = false;


const hideZeroReviews = () => {
  if(shared.VARIATION !== "control") {
    logMessage("Hiding zero reviews");
  }
  pollerLite(['.FooterWrap', '.bv_text'], () => {

    let allPLPItems = document.querySelectorAll('#navlist li');

    [].slice.call(allPLPItems).forEach((item) => {

      

      let currStarRating = item.querySelector('.bv_text').innerHTML;
      currStarRating = currStarRating.replaceAll('(', '').replaceAll(')', '');
      currStarRating = parseInt(currStarRating);

      if(currStarRating === 0) {

        if(zeroReviewFound == false) {
          let reviewContainer = item;
          let scrollWatch = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
              if (entry.intersectionRatio > 0) {
      
                fireEvent(`Visible - user has seen an item with zero reviews ${shared.VARIATION == "control" ? `shown` : `hidden`}`);
      
                scrollWatch.unobserve(reviewContainer);
              }
            });
          }, { root: null });
      
          scrollWatch.observe(reviewContainer);
          zeroReviewFound = true;


        }

        item.addEventListener('click', (e) => {
          localStorage.setItem(`${ID}-zero-review-item`, e.target.closest('li').getAttribute('li-url'));
          fireEvent(`Click - user has clicked on item ${localStorage.getItem(`${ID}-zero-review-item`)} which has 0 reviews ${shared.VARIATION == "control" ? `shown` : `hidden`}`)
        })

        if(shared.VARIATION !== "control") {
          item.querySelector('.reviews-container').classList.add(`${ID}-review-container-hidden`);
        }
        
      } 

    })



  })



}

const checkZeroReviewsItem = () => {
  logMessage("Checking zero review item");
  if(window.location.href.indexOf(localStorage.getItem(`${ID}-zero-review-item`)) > -1) {
    pollerLite(['#aAddToBag'], () => {
      let addToBag = document.getElementById('aAddToBag');
      addToBag.addEventListener('click', () => {
  
        fireEvent(`Click - someone has tried to add to bag after viewing and clicking on ${localStorage.getItem(`${ID}-zero-review-item`)} on the PLP which had 0 reviews and was ${shared.VARIATION == "control" ? `shown` : `hidden`}`);
  
      })
    });
    
  } 


}

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  if(document.body.classList.contains('ProdDetails')) {
    checkZeroReviewsItem();
  } else {
    hideZeroReviews();

    // Trigger re render on pagniation change
    const wrap = document.getElementById('navlist');
    observer.connect(wrap, () => {
        hideZeroReviews();
    }, {
        config: {
          attributes: true,
          childList: true,
          subtree: false,
        }
    })
  }
  

};
