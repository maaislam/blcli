const initSwiper = (container, initConfig) => {
  //const { slidesPerView, spaceBetween, direction } = initConfig;

  const baseConfig = {
    slidesPerView: 3,
    spaceBetween: 16,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  const slider = new window.Swiper(`${container}`, Object.assign(baseConfig, initConfig));
};

export default initSwiper;
