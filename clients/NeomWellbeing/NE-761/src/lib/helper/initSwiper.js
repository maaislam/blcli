import { fireEvent } from '../../../../../../core-files/services';

const initSwiper = (id, container) => {
  const baseConfig = {
    slidesPerView: 2,
    spaceBetween: 8,
    scrollbar: {
      el: `.${id}_swiper-scrollbar`,
      draggable: true,
    },
    breakpoints: {
      450: {
        slidesPerView: 2.72,
        spaceBetween: 8,
      },
    },
  };

  const slider = new window.Swiper(`${container}`, baseConfig);
  slider.on('slideChange', () => {
    fireEvent('User scrolls the carousel');
  });
};

export default initSwiper;
