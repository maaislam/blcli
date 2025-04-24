import { pollerLite } from '../../../../../lib/uc-lib';
import settings from './settings';

export default () => {

  jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
    $('.PL018-recentlyViewed__products').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
    });
  });

  jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
    $('.PL018-brands__list').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 1,
      adaptiveHeight: true,
    });
  });
};