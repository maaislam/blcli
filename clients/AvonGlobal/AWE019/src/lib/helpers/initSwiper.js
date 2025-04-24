const initSwiper = (container, configObj) => {
  var swiperInterval = window.setInterval(mySlick, 300);

  const loadSwiper = () => {
    new Swiper(`${container}`, configObj);
  };
  function mySlick() {
    if (Swiper != 'undefined') {
      loadSwiper();
      window.clearInterval(swiperInterval);
    }
  }
};

export default initSwiper;
