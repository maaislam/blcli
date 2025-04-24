import { pollerLite } from '../../../../../lib/uc-lib';
import shared from './shared';
const { ID, VARIATION } = shared;

export default () => {
  // if (shared.VARIATION === '1') {
    // Slick Slider
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
      $(`ul.${shared.ID}-lightbox__content-wrapper`).slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 960,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      });
    });


    // jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
    //   $('.PL017-brands__list').slick({
    //     dots: true,
    //     infinite: true,
    //     speed: 300,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     adaptiveHeight: true,
    //   });
    // });
  // } else if (settings.VARIATION === '2') {
  //   jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
  //     $('.PL017-recentlyViewed__products').slick({
  //       dots: true,
  //       infinite: true,
  //       speed: 300,
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //       // adaptiveHeight: true,
  //     });
  //   });
  // }
  
};