/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
// import Swiper from "swiper/swiper-bundle";
import { reviewSectionFooter, reviewSectionTop } from "./reviewSection";
import { addCssToPage, addJsToPage } from "./helpers/utils";
import { initSwiper } from "./helpers/initSwiper";
import { clickHandler } from "./helpers/clickHandler";
import { pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;
export default () => {
  setup();

  // console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);
  fireEvent("Conditions Met");

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  const body = document.body;
  body.addEventListener(`click`, ({ target }) => {
    if (window[`${ID}-$$articles`].findIndex((article) => window.location.href.includes(article)) > -1) {
      clickHandler(target);
    }
  });

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
  //add swiper js
  const swiperJs = "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js";
  const swiperCss = "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css";
  addJsToPage(swiperJs, `${ID}__swiperjs`);
  addCssToPage(swiperCss, `${ID}__swipercss`);

  let timeout;
  const runChanges = () => {
    // console.log(`runchanges init`);
    if (!document.querySelector(`.${ID}-reviewSection-top`)) {
      const tableOfContentMain = document.querySelector(`nav[aria-labelledby="tableOfContentsHeading"]`);
      tableOfContentMain.insertAdjacentHTML("afterend", reviewSectionTop);
    }
    if (!document.querySelector(`.${ID}-reviewSection-footer`)) {
      let bottomCta = document.querySelector('[data-module-name="publicationCTA"]');
      if (bottomCta && !document.querySelector(`.${ID}-reviewSection-footer`)) {
        bottomCta.insertAdjacentHTML("beforebegin", reviewSectionFooter);
        //bottomCta.classList.add(`${ID}_hidden`);
      } else if (!bottomCta && !document.querySelector(`.${ID}-reviewSection-footer`)) {
        if (document.querySelector('[data-testid="multiPageGuidePagination"]')) {
          bottomCta = document.querySelector('[data-testid="multiPageGuidePagination"]');
        } else {
          const allContainer = document.querySelectorAll(".css-2mik2o");
          bottomCta = allContainer.length > 0 && allContainer[allContainer.length - 1];
        }
        if (bottomCta) {
          bottomCta.insertAdjacentHTML("beforebegin", reviewSectionFooter);
        }
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        pollerLite([`.${ID}-reviewSection-footer-right .swiper`, () => window.Swiper], () => {
          initSwiper(`.${ID}-reviewSection-footer-right .swiper`, 3, 20);
        });
      }, 500);
      pollerLite([`.GCOR003_ctaWrapperBottom`], () => {
        if (document.querySelector(`.${ID}-reviewSection-footer`)?.nextElementSibling?.matches(`.GCOR003_ctaWrapperBottom`)) {
          document.querySelector(`.GCOR003_ctaWrapperBottom`).insertAdjacentElement("afterend", document.querySelector(`.${ID}-reviewSection-footer`));
        }
      });
    }
    if (observer) observer.disconnect();
  };
  if (window[`${ID}-$$articles`].findIndex((article) => window.location.href.includes(article)) > -1) {
    runChanges();
  }
  const observer = new MutationObserver(() => {
    if (window[`${ID}-$$articles`].findIndex((article) => window.location.href.includes(article)) > -1) {
      runChanges();
    }
  });
  observer.observe(body, { attributes: true, childList: true, subtree: true });
};
