import shared from '../../../../../core-files/shared';

const { ID } = shared;

export const displaySlider = () => {
  // Run slick
  const slider = document.querySelector(`#${ID}-recs-carousel-inner`);
  slider.classList.add('swiper-active');

  const swiper = new Swiper(slider, {
    // Optional parameters
    init: false,
    loop: false,
    // If we need pagination
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 10,
    // Disable preloading of all images
    preloadImages: true,
    grabCursor: true,
    // Enable lazy loading
    lazy: false,
    // Responsive breakpoints
    breakpoints: {
      1300: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      992: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      600: {
        slidesPerView: 1.2,
        slidesPerGroup: 1,
      },
    },
    navigation: {
      nextEl: `.${ID}-button-next`,
      prevEl: `.${ID}-button-prev`,
    },
  });

  // Once the carousel is ready, initiate swiper and remove the loading spinner to display the carousel
  setTimeout(function () {
    swiper.init();
  }, 100);

  setTimeout(function () {
    document
      .querySelector(`.${ID}-recs-carousel-holder`)
      .classList.remove('loading');
  }, 150);

  window.addEventListener('resize', () => {
    swiper.updateSize();
  });
};
