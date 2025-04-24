const initSwiper = (container, configObj, fireEvent) => {
  var swiperInterval = window.setInterval(mySwiper, 300);

  const loadSwiper = () => {
    const swiperSlide = new Swiper(`${container}`, configObj);
    window.swiperSlider = swiperSlide;
    // swiperSlide.on('slideChange', () => {
    //   console.log('slide changed');
    //   fireEvent('Scroll on carousel');
    // });
  };
  function mySwiper() {
    if (window.swiperSlider != 'undefined') {
      loadSwiper();
      window.clearInterval(swiperInterval);
    }
  }
};

export default initSwiper;
