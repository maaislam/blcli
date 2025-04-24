const showAllSlider = () => {
  const swiperWrapper = document.querySelector('.row.category-items.swiper');
  const allSlides = document.querySelectorAll('.row.category-items.swiper .swiper-slide');

  allSlides.forEach((slide) => (slide.style.display = 'flex'));

  swiperWrapper.classList.remove('single-slider-content');

  const swiper = swiperWrapper.swiper;
  swiper.update();

  // Reset to first slide
  swiper.slideTo(0);
};

export default showAllSlider;
