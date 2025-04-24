/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { initExternalLib } from './helper/addExternalLib';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  console.log('All variations');
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    console.log('control');
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  if (VARIATION == 1) {
    console.log('variation-1', 'running');

    //slider
    const swiperJs = 'https://m7cdn.io/common/js/swiper.js';
    const swiperCss = 'https://dev.m7cdn.io//common/css/swiper.css';

    initExternalLib(swiperJs, swiperCss);

    //Table of contents transpilot section
    const domToRender = `<div class="${ID}-transpilot-container">
        <div class="container-main">
          <div class="icon">
            <img src="https://blcro.fra1.digitaloceanspaces.com/GCOR015/GCOR015/review-circle.svg">     
          </div>
          <div class="review">
            <div class="review-icon">  
              <img src="https://blcro.fra1.digitaloceanspaces.com/GCOR015/GCOR015/review-star.svg">                                           
            </div>
            <button type="button" class="review-statement"><span class="view-all-display">View all</span> 248 G2 reviews</button>
          </div>
        </div>
      </div>`;

    //review header
    const domToRenderReviewSection = `<div class="${ID}-review-container">
      <h2 id="review">Reviews</h2>
    </div>`;

    //review details and slider
    const domToRenderReviewSectionSlider = `<div class="${ID}-slider-container">
      <div class="review-details">
        <img class="main-icon" src="https://blcro.fra1.digitaloceanspaces.com/GCOR015/GCOR015/review-circle.svg">
        <img class="transpilot-icon" src="https://blcro.fra1.digitaloceanspaces.com/GCOR015/GCOR015/review-star.svg">
        <a class="review-statement" href="">248 G2 reviews</a>
      </div>
      <div class="slider">
          <div class="swiper mySwiper">
            <div class="overlay"></div>
            <div class="swiper-wrapper">            
              <div class="swiper-slide">
                <a class="review-link" href="https://www.g2.com/products/gocardless/reviews">
                  <img class="transpilot-icon" src="https://blcro.fra1.digitaloceanspaces.com/GCOR015/GCOR015/review-5star.svg">
                  <p>What do you like best?</>
                  <p>We have always received exceptional customer service from every member of GoCardless that we have met.</p>
                </a>
              </div>
              <div class="swiper-slide">
                <a class="review-link" href="https://www.g2.com/products/gocardless/reviews">
                  <img class="transpilot-icon" src="https://blcro.fra1.digitaloceanspaces.com/GCOR015/GCOR015/review-5star.svg">
                  <p>What problems is the product solving and how is that benefiting you?</>
                  <p>Getting paid on time can be a problem in any business but with Gocardless you can forget about all of that. Therefore less stress is one of the main benefits I would say.</p>
                </a>          
              </div>
              <div class="swiper-slide">
                <a class="review-link" href="https://www.g2.com/products/gocardless/reviews">
                  <img class="transpilot-icon" src="https://blcro.fra1.digitaloceanspaces.com/GCOR015/GCOR015/review-5star.svg">
                  <p>Recommendations to others considering the product:<p/>
                  <p>If you're a business owner needing an easy method of collecting client payment, GoCardless is a no-brainer.</p>
                </a>
              </div>
              <div class="swiper-slide">
                <a class="review-link" href="https://www.g2.com/products/gocardless/reviews">
                  <img class="transpilot-icon" src="https://blcro.fra1.digitaloceanspaces.com/GCOR015/GCOR015/review-5star.svg">
                  <p>What do you like best?</>
                  <p>We have always received exceptional customer service from every member of GoCardless that we have met.</p>
                </a>
              </div>
              <div class="swiper-slide">
                <a class="review-link" href="https://www.g2.com/products/gocardless/reviews">
                  <img class="transpilot-icon" src="https://blcro.fra1.digitaloceanspaces.com/GCOR015/GCOR015/review-5star.svg">
                  <p>What problems is the product solving and how is that benefiting you?</>
                  <p>Getting paid on time can be a problem in any business but with Gocardless you can forget about all of that. Therefore less stress is one of the main benefits I would say.</p>
                </a>          
              </div>
              <div class="swiper-slide">
                <a class="review-link" href="https://www.g2.com/products/gocardless/reviews">
                  <img class="transpilot-icon" src="https://blcro.fra1.digitaloceanspaces.com/GCOR015/GCOR015/review-5star.svg">
                  <p>Recommendations to others considering the product:<p/>
                  <p>If you're a business owner needing an easy method of collecting client payment, GoCardless is a no-brainer.</p>
                </a>
              </div>
              <div class="swiper-slide">
                <a class="review-link" href="https://www.g2.com/products/gocardless/reviews">
                  <img class="transpilot-icon" src="https://blcro.fra1.digitaloceanspaces.com/GCOR015/GCOR015/review-5star.svg">
                  <p>What do you like best?</>
                  <p>We have always received exceptional customer service from every member of GoCardless that we have met.</p>
                </a>
              </div>
              <div class="swiper-slide">
                <a class="review-link" href="https://www.g2.com/products/gocardless/reviews">
                  <img class="transpilot-icon" src="https://blcro.fra1.digitaloceanspaces.com/GCOR015/GCOR015/review-5star.svg">
                  <p> End What problems is the product solving and how is that benefiting you?</>
                  <p>Getting paid on time can be a problem in any business but with Gocardless you can forget about all of that. Therefore less stress is one of the main benefits I would say.</p>
                </a>          
              </div>
            </div>
          <div class="swiper-button-next">
            <div class="arrow">-></div>
          </div>
          <div class="swiper-button-prev">
            <div class="arrow"><-</div>
          </div>
        </div>
      </div>
      
    </div>`;

    //main pollerLite to insert elem
    pollerLite([`.css-1l65qvc nav`], () => {
      setTimeout(() => {
        document.querySelector('.css-1l65qvc nav').insertAdjacentHTML('afterend', domToRender);
        document.querySelector('#we-can-help + p.css-cyvn9x').insertAdjacentHTML('afterend', domToRenderReviewSection);
        document.querySelector('.test_gco-review-container').insertAdjacentHTML('afterend', domToRenderReviewSectionSlider);

        //btn scroll down to review
        document.querySelector('.review-statement').addEventListener('click', () => {
          document.querySelector('#review').scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        });
      }, 1000);
    });

    //slider initialization
    (function pollinfForSwiper() {
      if (window.Swiper && document.querySelector('.mySwiper')) {
        //slider dom
        const swiper = new Swiper('.mySwiper', {
         
          slidesPerView: 3,
          spaceBetween: 30,
          loop: false,
          loopFillGroupWithBlank: false,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });

        //mutation observer for overlay effect
        const targetNode = document.querySelector('.swiper-button-next');

        // Options for the observer (which mutations to observe)
        const config = { attributes: true, childList: false, subtree: false };

        // Callback function to execute when mutations are observed
        const callback = (mutationList, observer) => {
          //class add & remove to display ovarlay
          if (document.querySelector('.swiper-button-next.swiper-button-disabled')) {
            document.querySelector('.overlay').classList.add('display-overlay');
          } else if (document.querySelector('.swiper-button-next')) {
            document.querySelector('.overlay').classList.remove('display-overlay');
          }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
      } else {
        setTimeout(pollinfForSwiper, 25);
      }
    })();
  }

  if (VARIATION == 2) {
    console.log('variation-2');
  }
};
