import { pollerLite } from '../../../../../lib/uc-lib';

export default (device) => {
  // window.Slick = null;
  // window.jQuery.fn.slick = null;
  pollerLite(['#UKB009-lateDeals'], () => {
    // window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
    if (device === 'desktop') {
      window.jQuery('#UKB009-lateDeals').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 1240,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 960,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      });
    // MOBILE VIEW ----------------------------------
    } else {
      window.jQuery('#UKB009-lateDeals').slick({
        autoplay: true,
        autoplaySpeed: 5500,
        dots: false,
        infinite: true,
        speed: 600,
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '100px',
              slidesToShow: 1,
            }
          },
          {
            breakpoint: 377,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '60px',
              slidesToShow: 1
            }
          }
        ]
      });
    }
  });
};