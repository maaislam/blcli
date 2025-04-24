import shared from "../../../../../../core-files/shared";

const { ID } = shared;
export const initSwiper = (selector, sliderNumber, sliderSpace) => {
  const slider = new window.Swiper(`${selector}`, {
    slidesPerView: sliderNumber,
    spaceBetween: sliderSpace,
    //Navigation arrows
    navigation: {
      nextEl: `${selector} .swiper-button-next`,
      prevEl: `${selector} .swiper-button-prev`,
    },
    breakpoints: {
      1350: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
      1120: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
      // 769: {
      //   slidesPerView: 1,
      //   spaceBetween: 20,
      // },
      // 481: {
      //   slidesPerView: 2,
      //   spaceBetween: 20,
      // },
      320: {
        slidesPerView: 1.7,
        spaceBetween: 32,
      },
    },
  });

  // slider.on("slideChange", () => {
  //   console.log(slider);
  //   if (slider.isEnd) {
  //     console.log(`last slide`);
  //     document.querySelector(`.${ID}-reviewSection-footer-right .swiper.swiper__after`)?.classList.remove(`swiper__after`);
  //   } else {
  //     console.log(`not last slide`);
  //     !document.querySelector(`.${ID}-reviewSection-footer-right .swiper`)?.classList.contains(`swiper__after`) &&
  //       document.querySelector(`.${ID}-reviewSection-footer-right .swiper`)?.classList.add(`swiper__after`);
  //   }
  // });

  slider.on(`transitionEnd`, () => {
    if (slider.isEnd) {
      // console.log(`last slide`);
      !document.querySelector(`.${ID}-reviewSection-footer-right .swiper`)?.classList.contains(`swiper__shadow-out`) &&
        document.querySelector(`.${ID}-reviewSection-footer-right .swiper`)?.classList.add(`swiper__shadow-out`);
    } else {
      document.querySelector(`.${ID}-reviewSection-footer-right .swiper.swiper__shadow-out`)?.classList.remove(`swiper__shadow-out`);
    }
  });
};
