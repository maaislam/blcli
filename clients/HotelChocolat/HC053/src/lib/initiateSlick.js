import { pollerLite } from '../../../../../lib/uc-lib';
import shared from './shared';

export default (initialPosition) => {
  const { ID, VARIATION } = shared;

  let jQuery = null;
  jQuery = window.jQuery || window.$;

  if (window.innerWidth > 767) {
    if (initialPosition > 7) {
      // alert('> 7');
      initialPosition = initialPosition - 4;
    } else if (initialPosition > 5) {
      // alert('> 5');
      initialPosition = initialPosition - 5;
    } else if (initialPosition <= 2) {
      // alert('<= 2');
      initialPosition = 0;
    }
  }
  
  jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
    jQuery(`#${ID}-carousel-recommendations`).slick({
      // dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 1,
      initialSlide: initialPosition,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            // initialSlide: 1,
          }
        },
        {
          breakpoint: 958,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            // initialSlide: 1,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            // initialSlide: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
  });

};