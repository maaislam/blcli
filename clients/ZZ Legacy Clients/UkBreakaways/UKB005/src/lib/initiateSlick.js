import { pollerLite } from '../../../../../lib/uc-lib';
import settings from './settings';

export default () => {
  window.Slick = null;
  window.jQuery.fn.slick = null;
  pollerLite(['.UKB005-destinationBox__wrapper'], () => {
    window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
      window.jQuery('.UKB005-destinationBox__wrapper').slick({
        autoplay: true,
        autoplaySpeed: 5500,
        dots: true,
        infinite: true,
        speed: 600,
        centerMode: true,
        rightPadding: '20px',
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '20px',
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '20px',
              slidesToShow: 1
            }
          }
        ]
      });

      
    });
  });
};