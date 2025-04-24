import { pollerLite } from '../../../../../lib/uc-lib';

export default () => {
  let jQuery = null;
  jQuery = window.jQuery || window.$;
  jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
    jQuery('#ctl00_cphBody__objOffersCombined_upOffersStore .menuItems').slick({
      // dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 1.1,
      slidesToScroll: 1,
      initialSlide: 0,
    });
  });


  if (document.querySelector('.more--offers.student')) {
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
      jQuery('.more--offers.student .menuItems').slick({
        // dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1.1,
        slidesToScroll: 1,
        initialSlide: 0,
      });
    });
  }
};