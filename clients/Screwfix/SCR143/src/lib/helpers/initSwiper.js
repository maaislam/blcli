const initSwiper = (container) => {
  new window.Swiper(`${container}`, {
    slidesPerView: 1.1,
    spaceBetween: 11,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 11,
      },
      320: {
        slidesPerView: 1.2,
        spaceBetween: 11,
      },
    },
  });
};

export default initSwiper;
