const initSwiper = (container, fireEvent, shared) => {
  const { ID, VARIATION } = shared;
 // console.log(container_1, "container")
  const sliderForCategory = new window.Swiper(`${container}`, {
    
    slidesPerView: 6,
    spaceBetween: 0,
    loop: false,
    breakpoints: {
      320: {
        slidesPerView: 2.5,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      
    },

    //Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
  window.slider = sliderForCategory;

  

  
};

export default initSwiper;
