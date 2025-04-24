import shared from "../../../../../core-files/shared";
import { data } from "./data";
import icon from "./assets/icon";
const { ID } = shared;
const { reviewCircle, reviewStar, review4Star, review5Star, arrowRight } = icon;
export const reviewSectionTop = `<div class="${ID}-reviewSection-top">
<div class="${ID}-reviewSection-top-container">
  <div class="${ID}-reviewSection-circle"><img src="${reviewCircle}"/></div>
  <div class="${ID}-reviewSection-context">
      <div class="${ID}-reviewSection-context-starIcon"><img src="${reviewStar}"/></div>
      <div class="${ID}-reviewSection-context-text"><a class="${ID}-reviewSection-top-Link" href="https://www.g2.com/products/gocardless/reviews" target="_blank">View all 250+ G2 reviews</a></div>
  </div>
</div>
<div class="${ID}-reviewSection-top-footer"><a href="javascript:void(0)" class="${ID}-reviewSection-top-CTA css-makjd4">Read our reviews</a></div>
</div>`;

const reviewSectionFooterLeftDesktop = `<div class="${ID}-reviewSection-circle">
<img src="${reviewCircle}"/></div>
<div class="${ID}-reviewSection-context">
    <div class="${ID}-reviewSection-context-starIcon"><img src="${reviewStar}"/></div>
    <div class="${ID}-reviewSection-context-text">250+ G2 reviews</div>
</div>`;

const reviewSectionFooterLeftMobile = `<div class="${ID}-reviewSection-context-starIcon"><img src="${reviewStar}"/></div>
    <div class="${ID}-reviewSection-circle"><img src="${reviewCircle}"/></div>
    <div class="${ID}-reviewSection-context-text">250+ G2 reviews</div>`;

const reviewSectionFooterRight = `
<div class="swiper-wrapper">
${data
  .map((review) => {
    const { Question, Quote, Rating, Link } = review;
    return `<a href=${Link} target="_blank" class="${ID}-reviewElement swiper-slide">
    <div class="${ID}-review-star"><img src="${Rating == 5 ? review5Star : review4Star}"/></div>
    <div class="${ID}-review-context">
        <div class="${ID}-review-context-question">${Question}</div>
        <div class="${ID}-review-context-text">${Quote}</div>
    </div>
  </a>`;
  })
  .join("")}</div>`;

export const reviewSectionFooter = `<div class="${ID}-reviewSection-footer">
  <h3 class="${ID}-reviewSection-footer-header css-5l3bus">What our customers say</h3>
  <div class="${ID}-reviewSection-footer-context">  
    <div class="${ID}-reviewSection-footer-leftDesktop">${reviewSectionFooterLeftDesktop}</div>
    <!--<div class="${ID}-reviewSection-footer-leftMobile">${reviewSectionFooterLeftMobile}</div>--> 
    <div class="${ID}-reviewSection-footer-right ">
        <div class="swiper">  
          ${reviewSectionFooterRight}
          <div class="swiper-button-prev">${arrowRight}</div>
          <div class="swiper-button-next">${arrowRight}</div>
        </div> 
    </div>
  </div>
</div>`;
