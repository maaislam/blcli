const initSwiper = (container) => {
  new window.Swiper(`${container}`, {
    slidesPerView: 4,
    spaceBetween: 12,
    loop: false,
    breakpoints: {
      320: {
        slidesPerView: 1.7,
        spaceBetween: 12,
      },
      // when window width is >= 480px
      640: {
        slidesPerView: 2,
        spaceBetween: 12,
      },
      // when window width is >= 640px
      768: {
        slidesPerView: 2.5,
        spaceBetween: 12,
      },
      1024: {
        slidesPerView: 3.8,
        spaceBetween: 12,
      },
      1280: {
        slidesPerView: 4.5,
        spaceBetween: 12,
      },
    },

    //Navigation arrows
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev'
    // }
  });
  // window.slider = sliderForQuickBrand;
  // sliderForQuickBrand.on('slideChange', function () {
  //   //console.log("User scrolls through the brand filters.")
  //   fireEvent('User scrolls through the brand filters.');
  // });
};

export default initSwiper;
