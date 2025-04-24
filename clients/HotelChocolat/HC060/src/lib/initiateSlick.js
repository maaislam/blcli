import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  let jQuery = null;
  jQuery = window.jQuery || window.$;


  // if slick already exists
  if(window.$.fn.slick) {
    jQuery(`ul.${ID}-relatedProds__list`).slick({
      // slidesToShow: 3,
      // slidesToScroll: 1,
      arrows: false,
      fade: false,
      infinite: false,
      mobileFirst: true,
      edgeFriction: 0.1,
      responsive: [
        {
          breakpoint: 600,
          settings: "unslick",
        },
      ]
    });
    
    
    
  } else {
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
      jQuery(`ul.${ID}-relatedProds__list`).slick({
      // slidesToShow: 3,
      // slidesToScroll: 1,
      arrows: false,
      fade: false,
      infinite: false,
      mobileFirst: true,
      edgeFriction: 0.05,
      responsive: [
        {
          breakpoint: 600,
          settings: "unslick",
        },
      ]
      });
      
      
    });
  }
  
};



// {
//   breakpoint: 600,
//   settings: {
//     // arrows: true,
//     slidesToShow: 3,
//    }
// },
// {
//   breakpoint: 500,
//   settings: {
//   //  arrows: true,
//    slidesToShow: 2.5,
//   }
// },
// {
//   breakpoint: 460,
//   settings: {
//    arrows: false,
//    slidesToShow: 2.5,
//   }
// },
// {
//   breakpoint: 375,
//   settings: {
//   //  arrows: true,
//    slidesToShow: 1.85,
//   }
// },
// {
//   breakpoint: 315,
//   settings: {
//   //  arrows: true,
//    slidesToShow: 1.5,
//   }
// },