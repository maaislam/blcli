import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID } = shared;

const carouselHtml = `
      <div class="${ID}-recs-holder" id="${ID}-recs-holder">
        <h2 class="you-may-like">You may like </h2>
        <div class="${ID}-recs-carousel-holder loading">
          <div class="${ID}-loading-spinner">
              <p> Updating... </p>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#000" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
              </svg>
          </div>
          <div id="${ID}-recs-carousel-inner" class="${ID}-recs-carousel-inner swiper-container">
            <div class="swiper-wrapper">
            </div>
          </div>
          <button class="${ID}-button ${ID}-button-prev">
            <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 1L2 10L10 19" stroke="black" stroke-width="2"/></svg>
          </button>
          <button class="${ID}-button ${ID}-button-next">
            <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L9 10L1 19" stroke="black" stroke-width="2"/></svg>
          </button>
          
        </div>
        <div class="${ID}-carousel-scrollbar single-scrollbar loading" id="${ID}-addonitems-scrollbar"></div>
      </div>
    `;

const shownMessage = 'FLAN-393: Visible - carousel has been shown';

export const displayCarousel = () => {
  pollerLite(['#BasketDiv'], () => {
    document
      .getElementById('BasketDiv')
      .insertAdjacentHTML('beforebegin', carouselHtml);

    logMessage(shownMessage);
    fireEvent(shownMessage);
  });
};
