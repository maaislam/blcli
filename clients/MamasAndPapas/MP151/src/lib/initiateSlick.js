import { pollerLite } from '../../../../../lib/uc-lib';

export default () => {
  // Slick Slider
  pollerLite([
    () => $.fn.slick,
  ], () => {
    $('.MP151-usp').slick({
      autoplay: true,
      dots: false,
      infinite: true,
      default: 2000,
      speed: 500,
      slidesToShow: 1,
      fade: true,
      cssEase: 'linear',
      adaptiveHeight: true,
    });
  });
};