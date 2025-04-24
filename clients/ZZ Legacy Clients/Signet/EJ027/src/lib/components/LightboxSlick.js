import { pollerLite } from '../../../../../../lib/uc-lib';
import settings from '../settings';

export default () => {
  const { ID } = settings;
  jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', (data, textStatus, jqxhr) => {
    pollerLite([`.${ID}-bottom_inner`, () => !!jQuery.fn.slick], () => {

      // if there is more than 3 and on desktop, put in slider
      if ((document.querySelectorAll(`.${ID}-usp`).length > 3 && window.innerWidth > 767) || (document.querySelectorAll(`.${ID}-upsProduct`).length > 3 && window.innerWidth > 767)) {
        jQuery(`.${ID}-bottom_inner`).slick({
          dots: true,
          centerMode: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplay: true,
          arrows: true,
          infinite: true,
          responsive: [
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                centerPadding: '10px',
              },
            },
          ],
        });

        // always put in slider on mobile
      } else if (window.innerWidth < 767) {
        jQuery(`.${ID}-bottom_inner`).slick({
          dots: true,
          centerMode: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplay: true,
          arrows: true,
          infinite: true,
          responsive: [
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                centerPadding: '10px',
              },
            },
          ],
        });
      }
    });
  });
};
