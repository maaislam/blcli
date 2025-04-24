const initSwiper = (container_1, container_2, fireEvent, shared) => {
  const { ID, VARIATION } = shared;
 // console.log(container_1, "container")
  const sliderForCategory = new window.Swiper(`${container_1}`, {
    
    slidesPerView: 6,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 5,
        spaceBetween: 40
      },
      768: {
        slidesPerView: 7,
        spaceBetween: 40
      }
    },

    //Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
  window.slider = sliderForCategory;

  const sliderForSignatureCollections = new window.Swiper(`${container_2}`, {
    
    slidesPerView: 6,
    spaceBetween: 0,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 30
      }
    },

    //Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
  window.slider = sliderForSignatureCollections;

  slider.on('slideChange', () => {
    if (slider.isEnd) {
      //console.log("End")
      document.querySelector(`.${ID}__swiper-button-next`).classList.add(`${ID}__swiper-button-disabled`);
      
    } else if(slider.isBeginning){
      //console.log("start")
      document.querySelector(`.${ID}__swiper-button-prev`).classList.add(`${ID}__swiper-button-disabled`);
    }
  });
  // slider.on('slideNextTransitionStart', () => {
  //   fireEvent('users goes to next slide', shared);
  // });
  // slider.on('slidePrevTransitionStart', () => {
  //   fireEvent('users goes to previous slide', shared);
  // });

  // const activeBullet = () =>
  //   document.querySelector(`.${shared.ID}__pagination.swiper-pagination-bullet-active`);

  // slider.on('touchStart', () => {
  //   clearTimeout(window.slider.nextSlideTimer);
  //   slider.autoplay.stop();
  //   activeBullet().classList.add(`${shared.ID}__pause-animation`);
  //   window.slider.pauseTime = Date.now();
  // });

  // slider.on('touchEnd', () => {
  //   const newDelay = 5000 - (window.slider.pauseTime - window.slider.startTime);
  //   //slider.autoplay.start();
  //   activeBullet().classList.remove(`${shared.ID}__pause-animation`);
  //   window.slider.nextSlideTimer = setTimeout(() => {
  //     slider.slideNext();
  //   }, newDelay);
  // });
};

export default initSwiper;
