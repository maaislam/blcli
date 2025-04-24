const showAllSlider = () => {
  const swiperWrapper = document.querySelector('.row.category-items.swiper');
  const allSlides = document.querySelectorAll('.row.category-items.swiper .swiper-slide');

  allSlides.forEach((slide) => (slide.style.display = 'flex'));

  const swiper = swiperWrapper.swiper;
  swiper.update();
};

export default showAllSlider;
