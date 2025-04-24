/**
 * SD-87 - Branded Search
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { events, setCookie, getCookie, deleteCookie } from './../../../../../lib/utils';
import { fetchBrands, fetchRecentlyViewedBrands, fetchMaleFemale } from './fetchBrands';
import { observer } from './../../../../../lib/uc-lib';

events.analyticsReference = '_gaUAT';

let brandFilterHolder;
let mySwiper;
let existingFilterHolder = document.getElementById('filterlist');

const buildHTML = (brands, method) => {

  let ref = document.getElementById('FiltersAndProductsWrapper');

  let brandsHTML = "";

  [].slice.call(brands).forEach(function(brand) {

    let brandNumber = brand['number'];
    brandNumber = parseInt(brandNumber);

    let brandName = brand['brandname'];
    let brandDisplayName = brand['brandDisplayName'];

    let brandId = brandName.replace(new RegExp('/ /', 'g'), '-').toLowerCase();
    brandId = "brand-" + brandId;

    let brandActive = brand['isActive'];

    let brandPromoted = brand['isPromoted'];

    let brandHTML = `
        <div class="swiper-slide brand-filter ${brandNumber > 0 ? 'brand-hasprods' : 'brand-hasnoprods'} ${brandActive == true ? 'brand-active' : ''} ${brandPromoted == true && settings.VARIATION == 2 ? 'brand-promoted' : ''}">
          <a href="#" id="${brandId}" class="brand-filter-button" data-brandamount="${brandNumber}" data-brand="${brandName}" data-promoted="${brandPromoted} ">
            ${brandPromoted == true && settings.VARIATION == 2 ? '<div class="promoted-crown"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 260 245"><path d="m55,237 74-228 74,228L9,96h240"/></svg></div>' : ''}
            <div class="inner-content">${brandDisplayName} ${brandNumber > 0 ? '('+brandNumber+')' : ''}</div>

          </a>
        </div>
    `;

    brandsHTML += brandHTML;
    

  });

  if(method == "create") {


    let newHTML = `

      <div class="SD-87-brand-filter-holder loading">

        <div class="loading-spinner">
          <div class="loading-spinner-inner">
            <p> Personalising... </p>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
              <circle cx="50" cy="50" fill="none" stroke="#000" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
            </svg>
          </div>
        </div>

        <div class="brand-filter-header">

          <h2> Filter by brand </h2>

        </div>

        <div class="brand-filter-carousel-holder">

          <div class="brand-filter-arrow arrow-left">
            <a href="#" id="brand-filter-arrow-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" viewBox="0 0 480 880"><path d="M388.419 475.59L168.834 256.005 388.418 36.421c8.341-8.341 8.341-21.824 0-30.165s-21.824-8.341-30.165 0L123.586 240.923c-8.341 8.341-8.341 21.824 0 30.165l234.667 234.667a21.275 21.275 0 0015.083 6.251 21.277 21.277 0 0015.083-6.251c8.341-8.341 8.341-21.824 0-30.165z"/></svg>
            </a>
          </div>

          <div class="brand-filter-carousel-inner loading swiper-container" id="brand-filter-carousel">
            <div class="swiper-wrapper">
              ${brandsHTML}
            </div>
          </div>

          <div class="brand-filter-arrow arrow-right">
            <a href="#" id="brand-filter-arrow-right">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" viewBox="0 0 480 880"><path d="M388.419 475.59L168.834 256.005 388.418 36.421c8.341-8.341 8.341-21.824 0-30.165s-21.824-8.341-30.165 0L123.586 240.923c-8.341 8.341-8.341 21.824 0 30.165l234.667 234.667a21.275 21.275 0 0015.083 6.251 21.277 21.277 0 0015.083-6.251c8.341-8.341 8.341-21.824 0-30.165z"/></svg>
            </a>
          </div>

        </div>

      </div>

    `;

    ref.insertAdjacentHTML('beforebegin', newHTML);

    brandFilterHolder = document.querySelector('.SD-87-brand-filter-holder');

    initiateSlider();

    addEvents();

  } else if (method == "update") {


    let swiperWrapper = document.querySelector('.brand-filter-carousel-inner .swiper-wrapper');

    swiperWrapper.textContent = "";

    swiperWrapper.innerHTML = brandsHTML;
    mySwiper.slideTo(0);
    mySwiper.update();

  }

  

}

const initiateSlider = () => {

  // Run slick
  let slider = document.querySelector('#brand-filter-carousel');
  slider.classList.add('swiper-active');
  

  mySwiper = new Swiper(slider, {
    // Optional parameters
    init: false,
    loop: false,
    // If we need pagination
    slidesPerView: 7,
    spaceBetween: 0,
    navigation: {
      nextEl: '#brand-filter-arrow-right',
      prevEl: '#brand-filter-arrow-left',
    },
    // Responsive breakpoints
    breakpoints: {
      350: {
        slidesPerView: 1.5
      },
      450: {
        slidesPerView: 2.4
      },
      767: {
        slidesPerView: 4
      },
      992: {
        slidesPerView: 5
      },
      1200: {
        slidesPerView: 6
      }
    }
  
  })


  // Once the brand list is ready, remove the loading spinner to display the brands (and if the window 
  // width is less than 992 init the slider)

  setTimeout(function() {
    let topPickCarousel = document.querySelector('.SD-87-brand-filter-holder');
    let swiperContainer = document.querySelector('.brand-filter-carousel-inner');
    swiperContainer.classList.remove('loading');
    topPickCarousel.classList.remove('loading');
    mySwiper.init();

  }, 500);



}

const addEvents = () => {

  brandFilterHolder.addEventListener('click', (e) => {
    var btn = e.target;
    if (btn.classList.contains('brand-filter-button')) {
      e.preventDefault();
      e.stopPropagation();
      
      mySwiper.update();
      let brandName = e.target.getAttribute('data-brand');
      let isBrandPromoted = e.target.getAttribute('data-promoted');
      let thisFilter = document.querySelector('.ABRA[data-productname=\"'+brandName+'\"]').querySelector('a');
      events.send(settings.ID, `${settings.ID} Variation ${settings.VARIATION}`, `click from brand filter button ${brandName} (promoted: ${isBrandPromoted}) `);
      thisFilter.click();

    }

    return;

  });

}

const sortByKey = (array, key) => {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
}

const getCurrBrands = (method) => {

  // fetch brands
  let brands = fetchBrands();
  
  brands.then((brandArr) => {

    brandArr = brandArr.map((brand) => {

      return brand[0].toLowerCase();

    });

    let theBrands = [].slice.call(document.querySelectorAll('.ABRA'));

    theBrands = theBrands.map((brand) => {

      let isActive = false;
      if(brand.querySelector('.FilterAnchor span').classList.contains('SelectedFilter')) {
        isActive = true;
      }

      let isPromoted = false;
      let brandName = brand.getAttribute('data-productname').toLowerCase();
      if(brandArr.includes(brandName)) {
        isPromoted = true;
      } 


      let cutNumber = 18;
      if(window.width < 767) {
        cutNumber = 10;
      }

      let brandDisplayName = brand.getAttribute('data-productname');
      if(brandDisplayName.length > cutNumber) {
        brandDisplayName = brandDisplayName.substring(0,cutNumber) + "...";
      }

      return {
        "brandname": brand.getAttribute('data-productname'),
        "brandDisplayName": brandDisplayName, 
        "number": brand.getAttribute('data-productcount'), 
        "isActive": isActive, 
        "isPromoted": isPromoted
      };

    });

    theBrands = theBrands.sort((a,b) => b.number - a.number);
    theBrands = theBrands.sort((a,b) => b.isActive - a.isActive);
    theBrands = theBrands.sort((a,b) => b.isPromoted - a.isPromoted);    

    buildHTML(theBrands, method);    

  });

  

  

}

const activate = () => {
  
  setup();

  if(document.querySelectorAll('.ABRA').length > 7) {
    getCurrBrands('create');

    // Trigger re render on pagniation change
    const wrap = document.querySelector('#ProductContainer ul#navlist');
    observer.connect(wrap, () => {

      getCurrBrands('update');

    }, {
      config: {
        attributes: true,
        childList: true,
        subtree: false,
      }
    })

  } else {
    events.send(settings.ID, `${settings.ID} Variation ${settings.VARIATION}`, `brand disregarded as there's not enough filters`);
    return false;
  }
 
};

export default activate;
