import { pollerLite } from '../../../../../lib/uc-lib';
import shared from './shared';

export default (type) => {
  const { ID, VARIATION } = shared;

  let jQuery = null;
  jQuery = window.jQuery || window.$;

  // alert('slick');

  // jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
    jQuery(`.${ID}-section-content .${ID}-${type} ol`).slick({
      // dots: true,
      infinite: false,
      // focusOnSelect: true,
      // draggable: true,
      edgeFriction: 0.05,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            // initialSlide: 1,
            arrows: true,
          }
        },
        {
          breakpoint: 560,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            // initialSlide: 1,
            arrows: true,
          }
        },
        {
          breakpoint: 480,
          settings: {
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
          }
        },
        {
          breakpoint: 321,
          settings: {
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
  // });

  
};