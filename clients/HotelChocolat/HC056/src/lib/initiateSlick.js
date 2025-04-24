import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  let jQuery = null;
  jQuery = window.jQuery || window.$;


  // if slick already exists
  if(window.$.fn.slick) {
    jQuery(`.${ID}-productImage__container`).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: false,
      infinite: false,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
           arrows: true,
          }
        },
        {
          breakpoint: 1008,
          settings: {
            arrows: true,
          }
        },
        {
          breakpoint: 280,
          settings: {
            arrows: false,
          }
        },
      ]
    });
    
    const allThumbs = document.querySelectorAll(`.${ID}-productThumbnails__container .${ID}-image`);
    for (let index = 0; index < allThumbs.length; index++) {
      const element = allThumbs[index];

      element.addEventListener('click', (e) => {
        for (let index = 0; index < allThumbs.length; index++) {
          allThumbs[index].classList.remove('active');
        }

        const targetIndex = e.currentTarget.getAttribute('slide-index');
        e.currentTarget.classList.add('active');
        
        const slickObj = $(`.${ID}-productImage__container`).slick('getSlick');
        slickObj.slickGoTo(targetIndex);

        events.send(`${ID} v${VARIATION}`, 'click', 'Thumbnail image');
      });
    }

    jQuery(`.${ID}-productImage__container`).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      var mySlideNumber = nextSlide;
      $(`.${ID}-productThumbnails__container .${ID}-image`).removeClass('active');
      $(`.${ID}-productThumbnails__container .${ID}-image`).eq(mySlideNumber).addClass('active');
    });
    
  } else {
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
      jQuery(`.${ID}-productImage__container`).slick({
        slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: false,
      infinite: false,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
           arrows: true,
          }
        },
        {
          breakpoint: 767,
          settings: {
            arrows: true,
          }
        },
        {
          breakpoint: 280,
          settings: {
            arrows: false,
          }
        },
      ]
      });
      
      const allThumbs = document.querySelectorAll(`.${ID}-productThumbnails__container .${ID}-image`);
      for (let index = 0; index < allThumbs.length; index++) {
        const element = allThumbs[index];

        element.addEventListener('click', (e) => {
          for (let index = 0; index < allThumbs.length; index++) {
            allThumbs[index].classList.remove('active');
          }

          const targetIndex = e.currentTarget.getAttribute('slide-index');
          e.currentTarget.classList.add('active');
          
          const slickObj = jQuery(`.${ID}-productImage__container`).slick('getSlick');
          slickObj.slickGoTo(targetIndex);

          events.send(`${ID} v${VARIATION}`, 'click', 'Thumbnail image');
        });
      }

      jQuery(`.${ID}-productImage__container`).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var mySlideNumber = nextSlide;
        $(`.${ID}-productThumbnails__container .${ID}-image`).removeClass('active');
        $(`.${ID}-productThumbnails__container .${ID}-image`).eq(mySlideNumber).addClass('active');
      });
    });
  }
  
};