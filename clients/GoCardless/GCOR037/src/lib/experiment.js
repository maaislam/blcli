import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { reviewSectionFooter, reviewSectionFooterV1 } from "./reviewSection";
import { addCssToPage, addJsToPage } from "./helpers/utils";
import { initSwiper } from "./helpers/initSwiper";
import clickHandler from './helpers/clickHandler';
import { pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION } = shared;

const init = () => {

  //console.log(`${ID} test variation-${VARIATION} is working`);
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  if (VARIATION == "1") {

    if (!document.querySelector(`.${ID}-reviewSection-footer.variation-1`)) {

      let bottomCta = document.querySelector('[data-testid="moduleFeaturesSlice"]');
      if (bottomCta && !document.querySelector(`.${ID}-reviewSection-footer`)) {
        bottomCta.insertAdjacentHTML("beforebegin", reviewSectionFooterV1);

        document.querySelector('span.underline-link').addEventListener("click", () => {
          document.querySelector('.css-ya4zb7').scrollIntoView();
          window.scrollBy(0, -150);

        });

      }
    }

  }

  if (VARIATION == "2") {

    //add swiper js
    const swiperJs = "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js";
    const swiperCss = "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css";
    addJsToPage(swiperJs, `${ID}__swiperjs`);
    addCssToPage(swiperCss, `${ID}__swipercss`);

    let timeout;
    const runChanges = () => {

      if (!document.querySelector(`.${ID}-reviewSection-footer.variation-2`)) {

        let bottomCta = document.querySelector('[data-testid="moduleFeaturesSlice"]');

        if (bottomCta && !document.querySelector(`.${ID}-reviewSection-footer`)) {
          bottomCta.insertAdjacentHTML("beforebegin", reviewSectionFooter);
        }

        clearTimeout(timeout);
        timeout = setTimeout(() => {
          pollerLite([`.${ID}-reviewSection-footer-right .swiper`, () => window.Swiper], () => {
            initSwiper(`.${ID}-reviewSection-footer-right .swiper`, 3, 20);
          });
        }, 500);
      }
    };
    runChanges();
  }
};

export default () => {
  setup();
  fireEvent("Conditions Met");
  init();
  document.body.addEventListener('click', clickHandler);
};
