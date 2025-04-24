import icon from "../assets/icon";
import shared from "../../../../../../core-files/shared";
import { steps } from "../data";

const { dashedLineDesktop, dashedLineMobile, angleLeftSwiper, angleRightSwiper } = icon;
const { ID } = shared;

export const stepSection = () => `<div class="${ID}-stepSection">
<div class="${ID}-stepSection-mainContent">
  <div class="${ID}-stepSection-mainContent-headingContent-wrapper">
    <span class="${ID}-text-heading-secondary">Joining is free & could not be easier!</span>
    <span class="${ID}-text-small-termsAndcondition"
      >*T&Cs apply.
      <a href="javascript:void(0)" class="${ID}-stepSection-readMore">Read more here</a>
    </span>
  </div>
  <div class="${ID}-stepSection-mainContent-innerContent-steps">
  <div class="${ID}-stepSection-mainContent-innerContent-steps-wrapper">
  <div class="${ID}-stepSection-swiper swiper">
  <div class="${ID}-stepSection-swiper-wrapper swiper-wrapper">
  <div class="dashed-line">${dashedLineDesktop}${dashedLineMobile}</div> 
  ${steps
    .map((mainStep) => {
      let { step, icon, link, text } = mainStep;
      return `<div class="swiper-slide">
      <div class="${ID}-stepSection-step step-${step}">
        <a href="${link}">
          <div>
            <div class="step-image">
              <div>${icon}</div>
            </div>
            <div class="step-content">
              <p class="text-bold">Step ${step}</p>
              <div>${text}</div>
            </div>
          </div>
        </a>
    </div>
  </div>`;
    })
    .join("")}
  </div>
    <div aria-label="next slide" class="swiper-button-next">${angleRightSwiper}</div>
    <div aria-label="previous slide" class="swiper-button-prev">${angleLeftSwiper}</div>
  </div>
  </div>
</div>
</div>
</div>
`;
