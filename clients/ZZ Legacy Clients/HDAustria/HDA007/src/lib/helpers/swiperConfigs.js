export const channelsConfig = {
  direction: 'horizontal',
  allowTouchMove: true,
  slidesPerView: 1,

  navigation: {
    nextEl: `.HDA007__swiper-button-next`,
    prevEl: `.HDA007__swiper-button-prev`,
    disabledClass: `HDA007__swiper-button-disabled`,
  },
  breakpoints: {
    640: {
      spaceBetween: 15,
    },
  },
};

export const highlightConfig = {
  direction: 'horizontal',
  allowTouchMove: true,
  slidesPerView: 1.5,
  spaceBetween: 15,

  navigation: {
    nextEl: `.HDA007__swiper-button-next`,
    prevEl: `.HDA007__swiper-button-prev`,
    disabledClass: `HDA007__swiper-button-disabled`,
  },
  pagination: {
    el: `.HDA007__swiper-pagination`,
    type: 'bullets',
    clickable: true,
  },

  breakpoints: {
    480: {
      slidesPerView: 2,
    },

    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 4.85,
    },
  },
};

export const newBannerConfig = {
  direction: 'horizontal',
  allowTouchMove: true,
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
  },

  navigation: {
    nextEl: `.HDA007__herobanner--btn-next`,
    prevEl: `.HDA007__herobanner--btn-prev`,
    disabledClass: `HDA007__swiper-button-disabled`,
  },
  pagination: {
    el: `.HDA007__herobanner--pagination`,
    type: 'bullets',
    clickable: true,
  },
};
