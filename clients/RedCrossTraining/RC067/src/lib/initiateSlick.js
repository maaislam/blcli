import { pollerLite } from '../../../../../lib/uc-lib';
import shared from './shared';

export default () => {  
  // Slick Slider
  window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
    window.jQuery('.RC067-right__section').slick({
      // dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      // initialSlide: initSlide
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 420,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  });


  // jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
  //   jQuery('.RC067-right__section').slick({
  //     // dots: true,
  //     infinite: false,
  //     speed: 300,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     variableWidth: true,

  //   });
  // });
};
