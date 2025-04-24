import { fireEvent } from '../../../../../../core-files/services';

const initSwiper = (container) => {
  const sliderForQuickBrand = new window.Swiper(`${container}`, {
    slidesPerView: 6,
    spaceBetween: 10,
    loop: false,
    breakpoints: {
      320: {
        slidesPerView: 3.4,
        spaceBetween: 10,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 4.4,
        spaceBetween: 10,
      },
      // when window width is >= 640px
      992: {
        slidesPerView: 5.4,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 10,
      },
    },

    //Navigation arrows
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev'
    // }
  });
  window.slider = sliderForQuickBrand;
  sliderForQuickBrand.on('slideChange', function () {
    //console.log("User scrolls through the brand filters.")
    fireEvent('User scrolls through the brand filters.');
  });
};

export default initSwiper;
