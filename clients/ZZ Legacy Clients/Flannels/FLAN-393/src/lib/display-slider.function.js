import shared from '../../../../../core-files/shared';

const { ID } = shared;

export const displaySlider = () => {
  // Run slick
  const slider = document.querySelector(`#${ID}-recs-carousel-inner`);
  slider.classList.add('swiper-active');

  const swiper = new Swiper(slider, {
    // Optional parameters
    touchStartPreventDefault: false,
    init: false,
    loop: false,
    // If we need pagination
    slidesPerView: 3.5,
    spaceBetween: 20,
    // Disable preloading of all images
    createElements: true,
    preloadImages: true,
    grabCursor: true,
    // Enable lazy loading
    lazy: false,
    a11y: true,
    // Responsive breakpoints
    breakpoints: {
      1300: {
        slidesPerView: 3.1,
      },
      992: {
        slidesPerView: 2.5,
      },
      767: {
        slidesPerView: 2.1,
      },
      600: {
        slidesPerView: 1,
      },
      100: {
        slidesPerView: 1,
      },
    },
    navigation: {
      nextEl: `.${ID}-button-next`,
      prevEl: `.${ID}-button-prev`,
    },
    scrollbar: {
      el: `#${ID}-addonitems-scrollbar`,
      draggable: true,
      hide: false,
      snapOnRelease: true,
    },
  });

  // Once the carousel is ready, initiate swiper and remove the loading spinner to display the carousel
  setTimeout(function () {
    swiper.init();

    if(window.outerWidth < 600) {
      let currSlides = swiper.slides.length;
      let carouselCount = document.querySelector(`.${ID}-carousel-count`);
      carouselCount.innerHTML = `${swiper.activeIndex}/${currSlides}`;
      carouselCount.classList.remove('loading');
      swiper.on('slideChange', () => {
        carouselCount.innerHTML = `${swiper.activeIndex}/${currSlides}`;
      });
    }

    
  }, 300);

  setTimeout(function () {
    document
      .querySelector(`.${ID}-recs-carousel-holder`)
      .classList.remove('loading');
    document
      .querySelector(`.${ID}-carousel-scrollbar`)
      .classList.remove('loading');
  }, 600);

  window.addEventListener('resize', () => {
    swiper.updateSize();
  });
};
