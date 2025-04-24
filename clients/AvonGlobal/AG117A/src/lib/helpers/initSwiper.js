const initSwiper = (container) => {
  //const { ID, VARIATION } =
  // console.log(container_1, "container")
  const sliderForCategory = new window.Swiper(`${container}`, {
    loop: false,
    breakpoints: {
      320: {
        slidesPerView: 1.5,
        spaceBetween: 14,
        allowTouchMove: true,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2.5,
        spaceBetween: 14,
        allowTouchMove: true,
      },
      850: {
        slidesPerView: 4.05,
        spaceBetween: 14,
        allowTouchMove: false,
      },
    },

    //Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  window.slider = sliderForCategory;
};

export default initSwiper;
