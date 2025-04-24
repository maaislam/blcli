import { fireEvent } from '../../../../../../core-files/services';
import shared from '../../../../../../core-files/shared';

const { ID } = shared;

const initSwiper = (container) => {
  //const { slidesPerView, spaceBetween, direction } = initConfig;

  const baseConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      //when window width is >= 320px
      320: {
        slidesPerView: 1.5,
        spaceBetween: 8,
        centeredSlides: true,
        centeredSlidesBounds: true,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      800: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
  };

  const slider = new window.Swiper(`${container}`, baseConfig);
  slider.on('slideChange', () => {
    //fireEvent(`User scrolls on carousel ${slider.activeIndex + 1}`);
    if (slider.previousIndex > slider.activeIndex) {
      fireEvent('On mobile, user scrolls left on the table');
    } else {
      fireEvent('On mobile, user scrolls right on the table');
    }
  });
};

export default initSwiper;
