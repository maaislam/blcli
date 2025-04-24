import { pollerLite } from '../../../../../lib/uc-lib';
import shared from './shared';

export default () => {
  let initSlide = 1;
  if (window.location.pathname.match(/sides/)) {
    initSlide = 2;
  } else if (window.location.pathname.match(/drinks/)) {
    initSlide = 3;
  } else if (window.location.pathname.match(/desserts/)) {
    initSlide = 4;
  } else if (window.location.pathname.match(/vegan/)) {
    initSlide = 5;
  } 

  const menu = document.querySelector('#ctl00__objHeader_ulSectionMenu');
  if(menu && initSlide >= 3) {
    console.log(initSlide);
    setTimeout(() => {
      if(initSlide == 3) {
        menu.scrollLeft = 100;
      } else if(initSlide == 4) {
        menu.scrollLeft = 200;
      } else if(initSlide > 4) {
        menu.scrollLeft = 300;
      }
    }, 300);
  }

  // Run without slick?
  return false;


  // else if (window.location.pathname.match(/vegan/)) {
  //   initSlide = 4; 
  // }
  
  // Slick Slider
  if (window.jQuery.fn.slick) {
    window.jQuery('ul.logoPadding.sectionsMenu').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      initialSlide: initSlide
      // responsive: [
      //   {
      //     breakpoint: 768,
      //     settings: {
      //       arrows: false,
      //       centerMode: true,
      //       centerPadding: '40px',
      //       slidesToShow: 3
      //     }
      //   },
      //   {
      //     breakpoint: 480,
      //     settings: {
      //       arrows: false,
      //       centerMode: true,
      //       centerPadding: '40px',
      //       slidesToShow: 3
      //     }
      //   }
      // ]
    });
  } else {
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
      window.jQuery('ul.logoPadding.sectionsMenu').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        initialSlide: initSlide
        // responsive: [
        //   {
        //     breakpoint: 768,
        //     settings: {
        //       arrows: false,
        //       centerMode: true,
        //       centerPadding: '40px',
        //       slidesToShow: 3
        //     }
        //   },
        //   {
        //     breakpoint: 480,
        //     settings: {
        //       arrows: false,
        //       centerMode: true,
        //       centerPadding: '40px',
        //       slidesToShow: 3
        //     }
        //   }
        // ]
      });
    });
  }
  


  
};
