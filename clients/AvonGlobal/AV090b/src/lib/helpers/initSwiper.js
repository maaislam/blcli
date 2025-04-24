const initSwiper = (container, configObj, fireEvent) => {
  var swiperInterval = window.setInterval(mySlick, 300);

  const loadSwiper = () => {
    const slider = new Swiper(`${container}`, configObj);
    slider.on('slideChange', function () {
      console.log('slide changed');
      fireEvent('Scroll on carousel');
    });
  };
  function mySlick() {
    if (Swiper != 'undefined') {
      loadSwiper();
      window.clearInterval(swiperInterval);
    }
  }
};

export default initSwiper;
