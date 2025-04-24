export const initSwiper = (container, configObj) => {
  var swiperInterval = window.setInterval(mySlick, 300);

  const loadSwiper = () => {
    new Swiper(`${container}`, configObj);
  };
  function mySlick() {
    if (Swiper != 'undefined') {
      loadSwiper();
      window.clearInterval(swiperInterval);
    }
  }
};

export const swiperConfig = {
  direction: 'vertical',
  allowTouchMove: true,
  slidesPerView: 3,
  spaceBetween: 14,

  navigation: {
    nextEl: `.WB044__swiper-button-next`,
    prevEl: `.WB044__swiper-button-prev`,
    disabledClass: `WB044__swiper-button-disabled`,
  },

  breakpoints: {
    600: {
      direction: 'horizontal',
      slidesPerView: 3,
    },
    992: {
      direction: 'horizontal',
      slidesPerView: 4,
      slidesOffsetAfter: 35,
    },
  },
};
