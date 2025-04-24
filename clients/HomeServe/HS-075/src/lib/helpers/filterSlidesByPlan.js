const filterSlidesByPlan = (planName) => {
  const swiperWrapper = document.querySelector('.row.category-items.swiper');
  const allSlides = document.querySelectorAll('.row.category-items.swiper .swiper-slide');

  allSlides.forEach((slide) => {
    if (slide.getAttribute('data-plan') === planName) {
      slide.style.display = 'flex';
    } else {
      slide.style.display = 'none';
    }
  });

  // Update Swiper
  const swiper = swiperWrapper.swiper;
  swiper.update();
};
export default filterSlidesByPlan;
