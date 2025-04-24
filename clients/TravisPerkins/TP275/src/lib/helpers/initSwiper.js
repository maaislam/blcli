import { fireEvent } from '../../../../../../core-files/services';

const initSwiper = (container) => {
  //const { slidesPerView, spaceBetween, direction } = initConfig;

  const baseConfig = {
    slidesPerView: 2.2,
    spaceBetween: 16,
    breakpoints: {
      //when window width is >= 320px
      600: {
        slidesPerView: 2.2,
      },
      800: {
        slidesPerView: 2.5,
      },
      992: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 3.6,
        spaceBetween: 20,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  const slider = new window.Swiper(`${container}`, baseConfig);
  slider.on('slideChange', () => {
    fireEvent(`User scrolls on carousel ${slider.activeIndex + 1}`);
  });
};

export default initSwiper;
