import { quote } from "../data";
import icon from "../assets/icon";
import shared from "../../../../../../core-files/shared";
const { angleLeftSwiper, angleRightSwiper, quoteIcon } = icon;
const { ID } = shared;
export const quoteSection = () => `<div class="${ID}-quoteSection">
<div class="${ID}-quoteSection-header"><h3>Don’t just take it from us...</h3></div>
<div class="${ID}-quoteSection-wrapper">
<div class="swiper">
<div class="${ID}-quoteSection-swiperWrapper swiper-wrapper">
${
  quote.length > 0 &&
  quote
    .map((element) => {
      let { quote_text, quote_author } = element;
      return `<div class="swiper-slide">
      <div class="quoteSection-element">
    <div class="quote-icon">${quoteIcon}</div>
    <span class="quote-bodyText">${quote_text}</span>
    <span class="quote-author">${quote_author}</span>
    </div>
</div>`;
    })
    .join("")
}
</div>
<div aria-label="next slide" class="swiper-button-next">${angleRightSwiper}</div>
<div aria-label="previous slide" class="swiper-button-prev">${angleLeftSwiper}</div>
</div>
</div>
</div>`;
