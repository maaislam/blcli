const initSwiper = (container) => {
  new window.Swiper(`${container}`, {
    slidesPerView: 3.1,
    spaceBetween: 12,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1.1,
        spaceBetween: 12,
      },
      // when window width is >= 480px
      640: {
        slidesPerView: 1.5,
        spaceBetween: 12,
      },
      // when window width is >= 640px
      768: {
        slidesPerView: 2.1,
        spaceBetween: 12,
      },
      1120: {
        slidesPerView: 3.1,
        spaceBetween: 12,
      },
    },
  });
};

export default initSwiper;
