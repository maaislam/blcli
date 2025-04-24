const initSwiper = (container, configObj, fireEvent) => {
  var swiperInterval = window.setInterval(mySlick, 300);
  let slider;
  const loadSwiper = () => {
    slider = new Swiper(`${container}`, configObj);
    slider.on('slideChange', function () {
      console.log('slide changed');
      //fireEvent('Scroll on carousel');
    });
  };
  function mySlick() {
    if (slider != 'undefined') {
      loadSwiper();
      window.clearInterval(swiperInterval);
    }
  }
};

export default initSwiper;
