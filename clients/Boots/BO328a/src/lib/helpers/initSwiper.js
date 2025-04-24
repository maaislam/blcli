import shared from '../../../../../../core-files/shared';

const { ID } = shared;

const initSwiper = (container) => {
  const slider = new window.Swiper(`${container}`, {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 20,
    observer: true,
    navigation: {
      nextEl: `.${ID}-product-recs-container .${ID}-product-recs-swiper-button-next`,
      prevEl: `.${ID}-product-recs-container .${ID}-product-recs-swiper-button-prev`,
    },
    scrollbar: {
      el: `.${ID}-product-recs-swiper-scrollbar`,
      draggable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 2.4,
        slidesPerGroup: 1,
        spaceBetween: 10,
      },
      500: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
      },
    }
  });
  window.slider = slider;
};

export default initSwiper;
