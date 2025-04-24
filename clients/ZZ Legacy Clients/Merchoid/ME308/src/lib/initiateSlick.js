import { events } from '../../../../../lib/utils';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import initiateSlick from './initiateSlick';

export default () => {
  const { ID, VARIATION } = shared;
  let jQuery = null;
  jQuery = window.jQuery || window.$;

  // if slick already exists
  if(jQuery.fn.slick) {
    jQuery(`.${ID}-banner .cubespinner`).slick({
      dots: false,
      arrows: false,
      infinite: true,
      speed: 10000,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
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
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
    
    
  } else {
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
      jQuery(`.${ID}-banner .cubespinner`).slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 10000,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
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
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
      
    });
  }
  
};