import { pollerLite } from '../../../../../lib/uc-lib';

export default () => {
  window.Slick = null;
  window.jQuery.fn.slick = null;
  pollerLite(['.UKB008-reviews'], () => {
    window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
      window.jQuery('.UKB008-reviews').slick({
        slidesToShow: 1,
        adaptiveHeight: true,
      });
    });
  });
};