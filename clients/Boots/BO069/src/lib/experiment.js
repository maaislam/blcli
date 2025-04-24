/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { pollerLite } from '../../../../../lib/utils';
import getcatData from './categoryData';
import { runNav } from './leftnavigation/triggerNav';
import searchFunctionality from './searchFunctionality';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  //V1 IS V2 IN PLATFORM

  // create roundels
  const addRoundelCarousel = () => {
    const pageTitle = document.querySelector('#estore_category_heading');

    let cattitle;
    if(pageTitle.querySelector('h1').textContent.trim() === 'Shop all') {
      cattitle = 'Sexual health & wellbeing'
    } else {
      cattitle = pageTitle.querySelector('h1').textContent.trim();
    }
    
    const carousel = document.createElement('div');
    carousel.classList.add(`${ID}_categoryBar`);
    carousel.innerHTML = `
    <h2>${pageTitle.querySelector('h1').textContent.trim()}</h2>
    <div class="${ID}_categoriesInner">
      <div class="${ID}_categories"></div>
    </div>`;

    pageTitle.insertAdjacentElement('afterend', carousel);

    // add roundels
    const data = getcatData();
  
    const categoryBar = document.querySelector(`.${ID}_categoriesInner`);

    if(data) {
      // loop through object
      Object.keys(data).forEach((i) => {
        const category = data[i];

        const categoryEl = document.createElement('div');
        categoryEl.classList.add(`${ID}_category`);

        if(category.link) {
            categoryEl.innerHTML = `
            <div class="${ID}_categoryIcon">
                <a href="${category.link}"></a>
                <span style="background-image:url(${category.icon})"></span>
                <p>${[i][0]}</p>
            </div>`;
        } 
        categoryBar.querySelector(`.${ID}_categories`).appendChild(categoryEl);
      });
    }
  }

  const slickCategories = () => {
    if(document.querySelectorAll(`.${ID}_categoryIcon`).length > 6) {
      window.jQuery(`.${ID}_categories`).slick({
        slidesToShow: 6,
        centerPadding: '60px',
        infinite: true,
        arrows: true,
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 1023,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
            }
          },
        ]
    });
  } else {
    document.querySelector(`.${ID}_categoryBar`).classList.add(`${ID}-noSlick`);
  }
  }


  /** Redirect pages and add elements */
  const URL = window.location.href;

  const categoryRedirect = () => {

    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(electrical)$|^(http).*(:)(\/\/)(www.boots.com)\/(electrical)(\?|\#).*$/)){
      window.location.href = 'https://www.boots.com/electrical/price-match-promise';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(skincare)$|^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(skincare)(\?|\#).*$/)){
      window.location.href = 'https://www.boots.com/beauty/skincare/skincare-all-skincare';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(makeup)\/(face)$|^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(makeup)\/(face)(\?|\#).*$/)){
      window.location.href = 'https://www.boots.com/beauty/makeup/face/all-face';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(fragrance)\/(aftershave)$|^(http).*(:)(\/\/)(www.boots.com)\/(fragrance)\/(aftershave)(\?|\#).*$/)){
      window.location.href = 'https://www.boots.com/fragrance/aftershave/mens-aftershave';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(fragrance)\/(perfume)$|^(http).*(:)(\/\/)(www.boots.com)\/(fragrance)\/(perfume)(\?|\#).*$/)){
      window.location.href = 'https://www.boots.com/fragrance/aftershave/all-perfume';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(hair)$|^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(hair)(\?|\#).*$/)){
      window.location.href = 'https://www.boots.com/beauty/hair/all-hair';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(makeup)\/(eyes)$|^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(makeup)\/(eyes)(\?|\#).*$/)){
      window.location.href = 'https://www.boots.com/beauty/makeup/eyes/all-eyes';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(health-pharmacy)\/(condoms-sexual-health)$|^(http).*(:)(\/\/)(www.boots.com)\/(health-pharmacy)\/(condoms-sexual-health)(\?|\#).*$/)){
      window.location.href = 'https://www.boots.com/wellness/condoms-sexual-health/sexual-pleasure-shop-all';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(electrical)\/(beauty-tools)$|^(http).*(:)(\/\/)(www.boots.com)\/(electrical)\/(beauty-tools)(\?|\#).*$/)){
      window.location.href = 'https://www.boots.com/electrical/beauty-tools/all-electrical-beauty-tools';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(holidays)\/(fake-gradual-tan)$|^(http).*(:)(\/\/)(www.boots.com)\/(holidays)\/(fake-gradual-tan)(\?|\#).*$/)){
      window.location.href = 'https://www.boots.com/toiletries/fake-gradual-tan/fake-and-gradual-tan-all';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(hair)\/(hair-dye)$|^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(hair)\/(hair-dye)(\?|\#).*$/)){
      window.location.href = 'https://www.boots.com/beauty/hair/hair-dye/all-hair-dye-at-home-for-men-women';
    }
  }

  categoryRedirect();
 
 
  // on listing pages, ajax in the carousels
  const pageChanges = () => {
    const URL = window.location.href;

    let ajaxURL;

    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(electrical)\/(price-match-promise)$|^(http).*(:)(\/\/)(www.boots.com)\/(electrical)\/(price-match-promise)(\?|\#).*$/)){
      ajaxURL = 'https://www.boots.com/electrical';

      const seoText = document.querySelector(`.richText.seo.mrg`);
      if(seoText) {
        document.querySelector('.col9.acol12.ccol10.right .content').insertAdjacentElement('beforeend', seoText);
      }
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(skincare)\/(skincare-all-skincare)$|^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(skincare)\/(skincare-all-skincare)(\?|\#).*$/)){
      ajaxURL = 'https://www.boots.com/beauty/skincare';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(fragrance)\/(aftershave)\/(mens-aftershave)$|^(http).*(:)(\/\/)(www.boots.com)\/(fragrance)\/(aftershave)\/(mens-aftershave)(\?|\#).*$/)){
      console.log('match')
      ajaxURL = 'https://www.boots.com/fragrance/aftershave';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(fragrance)\/(perfume)\/(all-perfume)$|^(http).*(:)(\/\/)(www.boots.com)\/(fragrance)\/(perfume)\/(all-perfume)(\?|\#).*$/)){
      ajaxURL = 'https://www.boots.com/fragrance/perfume';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(makeup)\/(face)\/(all-face)$|^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(makeup)\/(face)\/(all-face)(\?|\#).*$/)){
      ajaxURL = 'https://www.boots.com/beauty/makeup/face';
     }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(hair)\/(all-hair)$|^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(hair)\/(all-hair)(\?|\#).*$/)){
      ajaxURL = 'https://www.boots.com/beauty/hair';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(makeup)\/(eyes)\/(all-eyes)$|^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(makeup)\/(eyes)\/(all-eyes)(\?|\#).*$/)){
      ajaxURL = 'https://www.boots.com/beauty/makeup/eyes';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(health-pharmacy)\/(condoms-sexual-health)\/(sexual-pleasure-shop-all)$|^(http).*(:)(\/\/)(www.boots.com)\/(health-pharmacy)\/(condoms-sexual-health)\/(sexual-pleasure-shop-all)(\?|\#).*$/)){
      ajaxURL = 'https://www.boots.com/wellness/condoms-sexual-health';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(electrical)\/(beauty-tools)\/(all-electrical-beauty-tools)$|^(http).*(:)(\/\/)(www.boots.com)\/(electrical)\/(beauty-tools)\/(all-electrical-beauty-tools)(\?|\#).*$/)){
      ajaxURL = 'https://www.boots.com/electrical/beauty-tools';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(toiletries)\/(fake-gradual-tan)\/(fake-and-gradual-tan-all)$|^(http).*(:)(\/\/)(www.boots.com)\/(toiletries)\/(fake-gradual-tan)\/(fake-and-gradual-tan-all)(\?|\#).*$/)){
      ajaxURL = 'https://www.boots.com/toiletries/fake-gradual-tan';
    }
    if(URL.match(/^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(hair)\/(hair-dye)\/(all-hair-dye-at-home-for-men-women)$|^(http).*(:)(\/\/)(www.boots.com)\/(beauty)\/(hair)\/(hair-dye)\/(all-hair-dye-at-home-for-men-women)(\?|\#).*$/)){
      ajaxURL = 'https://www.boots.com/beauty/hair/hair-dye';
    }

    document.body.classList.add(`${ID}-PLPlisting`);
  
    const pageTitle = document.querySelector('#estore_category_heading');

    let cattitle;
    if(pageTitle.querySelector('h1').textContent.trim() === 'Shop all') {
      cattitle = 'Sexual health & wellbeing'
    } else {
      cattitle = pageTitle.querySelector('h1').textContent.trim();
    }
    const contentMarkup = document.createElement('div');
    contentMarkup.classList.add(`${ID}-content`);
    if(VARIATION === '3') {
      contentMarkup.innerHTML = `
      <div class="${ID}-leftNav">
      <h3>Shop ${cattitle} categories</h3>
      <div class="${ID}-accLinks"></div>
      </div>
      <div class="${ID}-right"></div>`;
    }
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
        const promoContent = temp.querySelector('.modWrapper .acol12.col6').parentNode.parentNode;

        if(carousel) {
          if(VARIATION === '3') {
            if(window.innerWidth < 767) {
              document.querySelector(`.${ID}-content .${ID}-leftNav`).insertAdjacentElement('beforebegin', carousel);
            } else {
              document.querySelector(`.${ID}-content .${ID}-right`).appendChild(carousel);
            }
          } else {
            document.querySelector(`.${ID}-content`).appendChild(carousel);
          }
        }
        if(links) {
          if(VARIATION !== '3') {
           document.querySelector(`.${ID}-content`).appendChild(links);
          }
          
        }
        if(promoContent) {
          if(VARIATION === '3') {
            document.querySelector(`.${ID}-content .${ID}-right`).appendChild(promoContent);
          } else {
            document.querySelector(`.${ID}-content`).appendChild(promoContent);
          }
        }
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

  if(URL.indexOf('all') > -1 || URL.indexOf('price-match-promise') > -1 || URL.indexOf('mens-aftershave') > -1){
    pageChanges();

    // add roundels
    if(VARIATION === '1') {
      addRoundelCarousel();
      if(window.innerWidth > 767) {
        slickCategories();
      }
    }

    // add search
    if(VARIATION === '2') {
      searchFunctionality();
    }

    // add left hand nav
    if(VARIATION === '3') {
      runNav(); 
    }

  }
  
};
