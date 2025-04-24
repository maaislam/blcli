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
        spaceBetween: 40,
      },
      1120: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
      920: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
      769: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      481: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1.2,
        spaceBetween: 15,
      },
    },
  });

  slider.on(`transitionEnd`, () => {
    if (slider.isEnd) {
      !document.querySelector(`.${ID}-reviewSection-footer-right .swiper`)?.classList.contains(`swiper__shadow-out`) &&
        document.querySelector(`.${ID}-reviewSection-footer-right .swiper`)?.classList.add(`swiper__shadow-out`);
    } else {
      document.querySelector(`.${ID}-reviewSection-footer-right .swiper.swiper__shadow-out`)?.classList.remove(`swiper__shadow-out`);
    }
  });
};
