import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { logMessage, pollerLite } from "../../../../../lib/utils";

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
            <svg width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 27L14.5 14L1 0.999999" stroke="#0000DA" stroke-width="2"/></svg>
          </button>
          <button class="${ID}-button ${ID}-button-next">
          <svg width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 27L14.5 14L1 0.999999" stroke="#0000DA" stroke-width="2"/></svg>
          </button>
        </div>
      </div>
    `;

export const displayCarousel = () => {
	pollerLite(["#BasketDiv"], () => {
		document
			.getElementById("BasketDiv")
			.insertAdjacentHTML("beforebegin", carouselHtml);

		let carouselRightArrow = document.querySelector(`.${ID}-button-next`);
		carouselRightArrow.addEventListener("click", (e) => {
			fireEvent(
				`Click - user has clicked on the right arrow in the variation carousel`
			);
		});

		let carouselLeftArrow = document.querySelector(`.${ID}-button-prev`);
		carouselLeftArrow.addEventListener("click", (e) => {
			fireEvent(
				`Click - user has clicked on the left arrow in the variation carousel`
			);
		});
	});
};
