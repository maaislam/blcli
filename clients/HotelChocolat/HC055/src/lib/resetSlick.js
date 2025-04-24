import { pollerLite } from '../../../../../lib/uc-lib';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  let jQuery = null;
  jQuery = window.jQuery || window.$;

  // --- First, unslick Control carousel
  jQuery(`ul#main-navigation`).slick('unslick');

  // --- Once new OFFERS link is added, re-run Slick
  pollerLite([`li.${ID}-offers-top-level`], () => {
    jQuery(`ul#main-navigation`).slick({
      // dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 6,
      // slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            // initialSlide: 1,
          }
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });

  });

  

  
};