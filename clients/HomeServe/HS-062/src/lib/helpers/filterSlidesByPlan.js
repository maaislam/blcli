const filterSlidesByPlan = (planName) => {
  const swiperWrapper = document.querySelector('.row.category-items.swiper');
  const allSlides = document.querySelectorAll('.row.category-items.swiper .swiper-slide');
  let visibleSlides = [];

  allSlides.forEach((slide) => {
    if (slide.getAttribute('data-plan') === planName) {
      slide.style.display = 'flex';
      visibleSlides.push(slide);
    } else {
      slide.style.display = 'none';
    }
  });

  // Handle single card centering
  if (visibleSlides.length === 1) {
    swiperWrapper.classList.add('single-slider-content');
  } else {
    swiperWrapper.classList.remove('single-slider-content');
  }

  // Update Swiper
  const swiper = swiperWrapper.swiper;
  swiper.update();

  // Reset to first slide
  swiper.slideTo(0);
};
export default filterSlidesByPlan;
