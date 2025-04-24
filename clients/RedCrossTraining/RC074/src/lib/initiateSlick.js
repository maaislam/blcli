import { pollerLite } from '../../../../../lib/uc-lib';

export default () => {

  jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
    $('ul.RC074-TPreviews__container').slick({
      // dots: true,
      infinite: true,
      speed: 300,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 1,
      // centerMode: true,
      // variableWidth: true,
      autoplay: true,
      autoplaySpeed: 3000,
      focusOnSelect: true,
      pauseOnHover:false,

      adaptiveHeight: true
    });
  });
};