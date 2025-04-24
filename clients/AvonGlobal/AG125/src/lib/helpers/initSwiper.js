import { fireEvent } from '../../../../../../core-files/services';
import shared from '../../../../../../core-files/shared';
import closeDropdown from './closeVariantDropdown';

const { ID } = shared;

const initSwiper = (container) => {
  //const { slidesPerView, spaceBetween, direction } = initConfig;
  const updateSlideVisibility = (swiper) => {
    const slides = swiper.slides;
    const activeIndex = swiper.activeIndex;
    const slidesPerView = swiper.params.slidesPerView === 'auto' ? swiper.visibleSlides.length : swiper.params.slidesPerView;
    //console.log('🚀 ~ updateSlideVisibility ~ slidesPerView:', slidesPerView);

    slides.forEach((slide, index) => {
      // Calculate if the current slide is in the visible range
      const isSlideVisible = index >= activeIndex && index < activeIndex + slidesPerView;
      if (isSlideVisible) {
        // If the slide is in the visible range, make sure it's not hidden
        slide.classList.remove('hidden-slide');
      } else {
        // If the slide is not in the visible range, hide it
        slide.classList.add('hidden-slide');
      }
    });
  };

  const baseConfig = {
    slidesPerView: 2.2,
    spaceBetween: 10,
    breakpoints: {
      //when window width is >= 320px
      600: {
        slidesPerView: 2.2,
        spaceBetween: 16,
      },
      800: {
        slidesPerView: 3.5,
      },
      992: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      init: function () {
        updateSlideVisibility(this);
      },
      slideChange: function () {
        updateSlideVisibility(this);
      },
    },
  };

  const slider = new window.Swiper(`${container}`, baseConfig);
  slider.on('slideChange', () => {
    fireEvent(`User scrolls on carousel ${slider.activeIndex + 1}`);

    updateSlideVisibility(slider);
  });
  slider.on('sliderMove', () => {
    closeDropdown(ID);
  });
};

export default initSwiper;
