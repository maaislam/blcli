/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events, setCookie, getCookie, deleteCookie } from '../../../../../lib/utils';
import { fetchBrands, fetchRecentlyViewedBrands, fetchMaleFemale } from './fetchBrands';
import { checkBrandPages, checkOuterBrandPage } from './fillBrands';

events.analyticsReference = '_gaUAT';

const buildAffinityCarousel = () => {

  // This function sets up the HTML for the experiment and adds a loading spinner while the categories are being decided.

  let ref = document.querySelector('.HOF_HOME1');

  ref.insertAdjacentHTML('afterend', `
    <div class="top-pick-carousel loading">
      <h2>YOUR PERSONALISED PICKS</h2>
      <div class="loading-spinner">
        <p> Personalising... </p>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
        </svg>
      </div>
      <div class="top-pick-carousel--list swiper-container" id="top-pick-carousel--list">
        <div class="swiper-wrapper">

        </div>
        <div class="swiper-pagination"></div>
      </div>


    </div>
  `);

}

export const populateAffinityCarousel = (brandList) => {

  // This function populates and initiates the brand list. If there are 5 brands returned from the promises,
  // then 5 will be displayed. If there are less, then the code will in-fill from the backup brand list. This means
  // if one or two of the promises fail we will still always display the list.

  let backupBrandList = [
    {brand: 'Mario Valentino', name: 'Handbags', url: '/bags-and-luggage/handbags/mario-valentino'},
    {brand: 'Tommy Hilfiger', name: 'T-Shirts', url: '/brand/tommy-hilfiger#dcp=1&dppp=30&OrderBy=rank&Filter=WEBCAT%5ET-Shirts'},
    {brand: 'Barbour', name: 'Coats and Jackets', url: '/brand/barbour#dcp=1&dppp=30&OrderBy=rank&Filter=WEBCAT%5ECoats%20and%20Jackets'},
    {brand: 'Polo Ralph Lauren', name: 'Polo Shirts', url: '/brand/polo-ralph-lauren#dcp=1&dppp=30&OrderBy=rank&Filter=WEBCAT%5EPolos'},
    {brand: 'Michael Kors', name: 'Bags', url: '/brand/michael-michael-kors#dcp=1&dppp=30&OrderBy=rank&Filter=WEBCAT%5EBags%20and%20Holdalls'},
  ];

  let numItemsRequired = 5 - brandList.length;

  if(brandList.length < 5) {
    for(var i = 0; i < numItemsRequired; i++) {
      brandList.push(backupBrandList[i])
    }
  } 

  sessionStorage.setItem('HOF-1-cached-brandlist', JSON.stringify(brandList));

  let ref = document.querySelector('.top-pick-carousel--list > div');

  [].slice.call(brandList).forEach(function(brand) {

    let brandHTML = `
      <div class="top-pick swiper-slide">
        <a href="${brand['url']}">
          <span class="brand-name"> ${brand['brand']} </span>
          <span class="brand-category"> ${brand['name']} </span>
        </a>
      </div>

    `;

    ref.insertAdjacentHTML('beforeend', brandHTML);

  });

  let moreBrandHTML = `
    <div class="top-pick view-all swiper-slide">
      <a href="/brand">
        <span class="brand-name"> VIEW ALL BRANDS </span>
      </a>
    </div>

  `;

  ref.insertAdjacentHTML('beforeend', moreBrandHTML);

  // if the window width is less than 992 initiate slick slider to display as a draggable carousel.

  if(window.innerWidth < 992) {
    // Run slick
    let slider = document.querySelector('#top-pick-carousel--list');
    slider.classList.add('swiper-active');
    let swiper = window.Swiper;

    var mySwiper = new swiper(slider, {
      // Optional parameters
      init: false,
      loop: false,
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      slidesPerView: 1,
      spaceBetween: 0,
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 320px
        450: {
          slidesPerView: 2
        },
        // when window width is >= 480px
        767: {
          slidesPerView: 3
        },
        // when window width is >= 640px
        992: {
          slidesPerView: 4
        },
      }
    
    })

  }

  // Once the brand list is ready, remove the loading spinner to display the brands (and if the window 
  // width is less than 992 init the slider)

  setTimeout(function() {
    let topPickCarousel = document.querySelector('.top-pick-carousel');
    topPickCarousel.classList.remove('loading');
    if(window.innerWidth < 992) {
      mySwiper.init();
    }
  }, 500);

}  

export default () => {
  setup();
  
  let finalBrandList = [];

  const checkBrands = (link, brandsToCheck) => {
  
    if (link) {
      const request = new XMLHttpRequest();
      request.open('GET', link, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          const data = request.responseText;
          // const sizeVariantId = request.responseURL;
          if (data) {
            
            checkOuterBrandPage(data, brandsToCheck);

          }
        }

      };

      request.onerror = () => {
        // There was a connection error of some sort
      };

      request.send();
    }
  }

  

  const { ID, VARIATION } = settings;

  // build & attach the HTML for the carousel
  buildAffinityCarousel();

  // fetch brands
  let brands = fetchBrands();
  brands.then((brandArr) => {
    
    // once the brands have been loaded, map these to a new array.
    let brands = brandArr;

    brands = brands.filter(brandItem => {
      let brandURL = brandItem[0].toLowerCase();
      if(brandURL == "chanel") {
        return false;
      } else {
        return true;
      }
    });

    brands = brands.map(brandItem => {
      let brandURL = brandItem[0].toLowerCase();
      brandURL = brandURL.replace(/ /g, '-');
      return {'name': brandItem[0], 'url': brandURL};
    });

    // if there is a cached version, load that.
    if(sessionStorage.getItem('HOF-1-cached-brandlist') && getCookie('HOF-1-brandlength') == brands.length) {
      let cachedBrandList = JSON.parse(sessionStorage.getItem('HOF-1-cached-brandlist'));
      populateAffinityCarousel(cachedBrandList);
    } else {
      checkBrands('/brand/', brands);
    }

    setCookie('HOF-1-brandlength', brands.length);

  });

  


  
  
  
  

};

