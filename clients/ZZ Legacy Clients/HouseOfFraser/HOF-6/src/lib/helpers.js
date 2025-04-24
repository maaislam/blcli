import shared from './shared';

/**
 * Helper Run SwiperJS
 */
export const runSwiper = () => {
  const swiper = new Swiper(`.${shared.ID}-logos`, {
    slidesPerView: 4,
    spaceBetween: 10,
    freeMode: false,
    loop: true,
    loopedSlides: 6,
    dragSize: 20,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      767: {
        slidesPerView: 2,
        spaceBetween: 15,
        centeredSlides: true,
      }
    }
  });

  return swiper;
};

