import icon from "../assets/icon";
import shared from "../../../../../../core-files/shared";
import { babyAdvice } from "../data";
const { angleLeftSwiper, angleRightSwiper } = icon;
const { ID } = shared;

export const babyAdviceSection = () => `<div class="${ID}-babyAdviceSection">
<div class="${ID}-babyAdviceSection-wrapper">
<div class="${ID}-babyAdviceSection-header">
  <h3 class="heading">BABy Advice 101</h3>
  <span class="header-text-content">We’re here to help. All this and more sign up today!</span>
</div>
<div class="${ID}-babyAdviceSection-bodyContainer swiper">
<div class="${ID}-babyAdviceSection-swiperWrapper swiper-wrapper">
${
  babyAdvice.length > 0 &&
  babyAdvice
    .map((item, index) => {
      let { title, textContent, ctaText, ctaLink, img } = item;
      return `  <div class="swiper-slide">
      <a class="fullLink" href="${ctaLink}"></a>
      <div class="advice-section advice-${index + 1}">
      <div class="advice-section-img"><img src="${img}" /></div>
    <div class="advice-section-textContainer">
    <h2 class="textContainer-heading" title="${title}">${title}</h2>
    <div class="textContainer-bodytext">${textContent}</div>
    <a class="textContainer-link" href="${ctaLink}">${ctaText}</a>
    </div>
    </div>
</div>`;
    })
    .join("")
}
</div>
<div class="swiper-scrollbar"></div>
<div aria-label="next slide" class="swiper-button-next">${angleRightSwiper}</div>
<div aria-label="previous slide" class="swiper-button-prev">${angleLeftSwiper}</div>
</div>
</div>
</div>
`;
