/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { events, pollerLite } from "../../../../../lib/utils";

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION == "control") {
    return;
  }

  pollerLite(
    [
      () => {
        return window?.Swiper;
      },
      '[id^="divSwiper"].swiper-container.swiper-initialized',
    ],
    () => {
      const swiperContainer = document.querySelector('[id^="divSwiper"].swiper-container.swiper-initialized');
      const thumbSwiperContainer = swiperContainer.cloneNode(true);
      const imageViewer = `<div class="${ID}-image--container-viewer"></div>`;

      swiperContainer.classList.add(`${ID}--swiper-container`);
      const swiperPagination = swiperContainer.querySelector(".swiper-pagination");
      swiperContainer?.swiper?.destroy();
      // const slider = new Swiper(swiperContainer, {
      //   preloadImages: true,
      //   centeredSlides: true,
      //   lazy: { loadPrevNext: true, loadOnTransitionStart: true },
      //   allowTouchMove: false,
      //   slidesPerView: 1,
      //   pagination: {
      //     el: swiperPagination,
      //     clickable: true,
      //   },
      // });
      // swiperContainer.classList.add(`${ID}--x-visible`);
      thumbSwiperContainer.classList.add(`${ID}--thumb-swiper-container`, `${ID}--x-visible`);
      const thumbSwiperPagination = thumbSwiperContainer.querySelector(".swiper-pagination");
      const thumbs = new Swiper(thumbSwiperContainer, {
        preloadImages: true,
        spaceBetween: 10,
        slidesPerView: 2.5,
        lazy: { loadPrevNext: true, loadPrevNextAmount: 2, loadOnTransitionStart: true },
        slideToClickedSlide: true,
        pagination: {
          el: thumbSwiperPagination,
          clickable: true,
        },
      });
      // thumbs.controller.control = slider;
      thumbSwiperContainer.querySelectorAll(".zoomMainImage img").forEach((elem) => {
        elem.addEventListener("click", (e) => {
          e.preventDefault();
        });
      });
      swiperContainer.insertAdjacentHTML("afterbegin", imageViewer);
      swiperContainer.insertAdjacentElement("afterend", thumbSwiperContainer);
    }
  );
  // Write experiment code here
  // ...
};
