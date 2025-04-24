import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  let jQuery = null;
  jQuery = window.jQuery || window.$;

  // if slick already exists
    
    window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
      window.jQuery(`ul.${ID}-bestSellers__list`).slick({
        centerMode: true,
        speed: 300,
        autoplay: false,
        slidesToShow: 2,
        dots: true,
        cssEase: 'linear', 
        variableWidth: true,
        rows: 0,

        responsive: [
          {
            breakpoint: 1024,
            settings: {
              arrows: true,
              centerMode: true,
              dots: true,
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 920,
            settings: {
              arrows: true,
              centerMode: true,
              dots: true,
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              dots: true,
              slidesToShow: 3,
              autoplay: true,
              autoplaySpeed: 5000,
            }
          }
        ]
      });
      
      
    });
  };