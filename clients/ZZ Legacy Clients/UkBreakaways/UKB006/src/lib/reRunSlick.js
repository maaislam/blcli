import { pollerLite } from '../../../../../lib/uc-lib';

export default () => {
  window.Slick = null;
  window.jQuery.fn.slick = null;
  pollerLite(['.carouselbit .grand-carousel'], () => {
    window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
      window.jQuery('.carouselbit .grand-carousel').slick("unslick");
      window.jQuery('.carouselbit .grand-carousel').slick({
        slidesToShow: 1,
      });
    });
  });
};