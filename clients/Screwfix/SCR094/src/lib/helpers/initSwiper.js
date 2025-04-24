const initSwiper = (container, VARIATION) => {
  new window.Swiper(`${container}`, {
    slidesPerView: VARIATION === '1' ? 6 : 7,
    spaceBetween: 11,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 11,
      },
      360: {
        slidesPerView: 1.1,
        spaceBetween: 11,
      },
      640: {
        slidesPerView: 1.9,
        spaceBetween: 11,
      },
      768: {
        slidesPerView: 2.2,
        spaceBetween: 11,
      },
      1024: {
        slidesPerView: 2.7,
        spaceBetween: 11,
      },
      1400: {
        slidesPerView: 3.2,
        spaceBetween: 11,
      },
    },
  });
};

export default initSwiper;
