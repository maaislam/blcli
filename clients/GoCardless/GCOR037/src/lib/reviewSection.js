import shared from "../../../../../core-files/shared";
import { data } from "./data";
import icon from "./assets/icon";
const { ID, VARIATION } = shared;
const { reviewCircle, reviewStar, review4Star, review5Star, arrowRight, listTick } = icon;

const reviewSectionFooterLeft = `<div class="${ID}-reviewSection-circle">
<img src="${reviewCircle}"/></div>
<div class="${ID}-reviewSection-context">
    <div class="${ID}-reviewSection-context-starIcon"><img src="${reviewStar}"/></div>
    <div class="${ID}-reviewSection-context-text">G2 score 4.7/5 | 250+ G2 reviews</div>
</div>`;

const reviewSectionFooterRight = `
<div class="swiper-wrapper">
${data.map((review) => {
  const { Question, Quote, Rating, Link } = review;
  return `<a href=${Link} target="_blank" class="${ID}-reviewElement swiper-slide">
    <div class="${ID}-review-star"><img src="${Rating == 5 ? review5Star : review4Star}"/></div>
    <div class="${ID}-review-context">
        <div class="${ID}-review-context-question">${Question}</div>
        <div class="${ID}-review-context-text">${Quote}</div>
    </div>
  </a>`;
}).join("")}</div>`;

const reviewSectionFooterRightV2 = `
  <div class="${ID}-reviewSection-headline">
      <p>Why choose GoCardless?</p>
  </div>
  <div class="${ID}-reviewSection-list">
      <div class="review-li"><span class="list-icon">${listTick}</span>Trusted by <span class="bold">75,000+</span> businesses worldwide</div>
      <div class="review-li"><span class="list-icon">${listTick}</span>FCA regulated and ISO certified for security</div>
      <div class="review-li"><span class="list-icon">${listTick}</span>Easily integrates with <span class="underline-link"> <span class="bold">350+</span> partner apps</span></div>
      <div class="review-li"><span class="list-icon">${listTick}</span>Reduce cost of payments by <span class="bold">56%</span> on average</div>
  </div>`;


export const reviewSectionFooter = `
<div class="${ID}-reviewSection-footer variation-${VARIATION}">
  <div class="${ID}-reviewSection-footer-context">  
    <div class="${ID}-reviewSection-footer-left">${reviewSectionFooterLeft}</div>
    <div class="${ID}-reviewSection-footer-right ">
        <div class="swiper">  ${reviewSectionFooterRight}
          <div class="swiper-button-prev">${arrowRight}</div>
          <div class="swiper-button-next">${arrowRight}</div>
        </div> 
    </div>
  </div>
</div>`;

export const reviewSectionFooterV1 = `
  <div class="${ID}-reviewSection-footer variation-${VARIATION}">
    <div class="${ID}-reviewSection-footer-context">  
      <div class="${ID}-reviewSection-footer-left">${reviewSectionFooterLeft}</div>
      <div class="${ID}-reviewSection-footer-right ">${reviewSectionFooterRightV2}</div> 
      </div>
    </div>
  </div>`;