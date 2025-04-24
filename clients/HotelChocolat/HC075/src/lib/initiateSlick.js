import { events } from '../../../../../lib/utils';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  let jQuery = null;
  jQuery = window.jQuery || window.$;


  // if slick already exists
  if(window.$.fn.slick) {
    jQuery(`.${ID}-valueMessages__content`).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: false,
      infinite: true,
      mobileFirst: true,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
           arrows: true,
          }
        },
        {
          breakpoint: 1008,
          settings: {
            arrows: true,
          }
        },
        {
          breakpoint: 280,
          settings: {
            arrows: true,
          }
        },
      ]
    });
    
    
  } else {
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
      jQuery(`.${ID}-valueMessages__content`).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        infinite: true,
        mobileFirst: true,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
            arrows: true,
            }
          },
          {
            breakpoint: 767,
            settings: {
              arrows: true,
            }
          },
          {
            breakpoint: 280,
            settings: {
              arrows: true,
            }
          },
        ]
      });
      
    });
  }
  
};