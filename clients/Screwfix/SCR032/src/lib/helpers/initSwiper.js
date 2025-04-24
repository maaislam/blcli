import { fireEvent } from '../../../../../../core-files/services';

const initSwiper = (container) => {
  //const { slidesPerView, spaceBetween, direction } = initConfig;

  const baseConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      //when window width is >= 320px
      600: {
        slidesPerView: 1.5,
      },
      800: {
        slidesPerView: 2.5,
      },
      992: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  };

  const slider = new window.Swiper(`${container}`, baseConfig);
  slider.on('slideChange', () => {
    fireEvent('The user scrolls when on smaller screens');
  });
};

export default initSwiper;
