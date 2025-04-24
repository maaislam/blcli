import {
  pollerLite
} from '../../../../../lib/utils';
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import {
  setup
} from './services';
import shared from './shared';

export default () => {
  setup();

  const {
    ID
  } = shared;

  const URL = window.location.href;
  /**
   * Redirect pages
   */

  if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(makeup)\/(eyes)$|^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(makeup)\/(eyes)(\?|\#).*$/)){
    window.location.href = 'https://www.boots.com/beauty/makeup/eyes/all-eyes';
  }
  if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(makeup)\/(face)$|^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(makeup)\/(face)(\?|\#).*$/)){
    window.location.href = 'https://www.boots.com/beauty/makeup/face/all-face';
  }
  if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(skincare)$|^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(skincare)(\?|\#).*$/)){
    window.location.href = 'https://www.boots.com/beauty/skincare/skincare-all-skincare';
  }

  const pageChanges = () => {
    const URL = window.location.href;

    let ajaxURL;

    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(makeup)\/(eyes)\/(all-eyes)$|^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(makeup)\/(eyes)\/(all-eyes)(\?|\#).*$/)){
      ajaxURL = 'https://www.boots.com/beauty/makeup/eyes';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(makeup)\/(face)\/(all-face)$|^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(makeup)\/(face)\/(all-face)(\?|\#).*$/)){
     ajaxURL = 'https://www.boots.com/beauty/makeup/face';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(skincare)\/(skincare-all-skincare)$|^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(skincare)\/(skincare-all-skincare)(\?|\#).*$/)){
      ajaxURL = 'https://www.boots.com/beauty/skincare';
    }

  
      const contentMarkup = document.createElement('div');
      contentMarkup.classList.add(`${ID}-content`);
      document.querySelector('#widget_breadcrumb').insertAdjacentElement('afterend', contentMarkup);

      const title = document.querySelector('#estore_category_heading');
      document.querySelector(`.${ID}-content`).insertAdjacentElement('beforebegin', title);


      const request = new XMLHttpRequest();
      request.open('GET', ajaxURL, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const temp = document.createElement('html');
          temp.innerHTML = request.responseText;
          const carousel = temp.querySelector('.heroCarousel');
          const links = temp.querySelector('.linksCarousel');
          const promoContent = temp.querySelector('.modWrapper');

          document.querySelector(`.${ID}-content`).appendChild(carousel);
          document.querySelector(`.${ID}-content`).appendChild(links);
          document.querySelector(`.${ID}-content`).appendChild(promoContent);
        }
      };
      request.send();

      pollerLite(['.heroCarousel'], () => {
        // loop through and set the images

        const allSlides = document.querySelectorAll('.heroCarousel .rel img');
        for (let index = 0; index < allSlides.length; index++) {
          const element = allSlides[index];
          const imageSmall = element.getAttribute('data-imagesml');
          const largeImage = element.getAttribute('data-imagelrg');

          if (window.innerWidth >= 767) {
            element.setAttribute('src', largeImage);
          } else {
            element.setAttribute('src', imageSmall);
          }
        }

        window.jQuery('.heroCarousel').slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
        });
      });

      // reinit links carousel
      pollerLite(['.linksCarousel'], () => {
        window.jQuery('.linksCarousel').owlCarousel({
          loop: true,
          autoWidth:true,
        });
      });
  }

  pageChanges();
};
