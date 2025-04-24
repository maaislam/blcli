/**
 * FLAN-356 similar items on plp
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, logMessage, observer } from './../../../../../lib/utils';
import { pollerLite } from './../../../../../lib/uc-lib';
import { hammer } from './hammer';

// Force set analytics reference
events.analyticsReference = '_gaUAT';

const getPageData = () => {

  let dataObject;
  for (let i = 0; i < window.dataLayer.length; i += 1) {
    const data = window.dataLayer[i];
    if (typeof data === 'object' && data.event && data.event === 'FLAN_onLoad') {
      dataObject = data;
      break;
    }
  }
  return dataObject;

}

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

let mySwiper, contentHolder;
let currencySigns = {
  'en_EU': '€',
  'en_GB': '£',
  'en_US': '$'
};

const openModal = () => {
  document.documentElement.classList.add(`${ID}-noscroll`);
  contentHolder.classList.add(`active`);
}

const closeModal = () => {
  document.documentElement.classList.remove(`${ID}-noscroll`);
  contentHolder.classList.remove(`active`);
}

const initiateSlider = () => {

  // Run slick
  let slider = document.querySelector(`#${ID}-carousel-inner`);
  slider.classList.add('swiper-active');

  mySwiper = new Swiper(slider, {
    // Optional parameters
    init: false,
    loop: false,
    // If we need pagination
    slidesPerView: 6.2,
    slidesPerGroup: 3,
    spaceBetween: 20,
    // Disable preloading of all images
    preloadImages: true,
    // Enable lazy loading
    lazy: false,
    // Responsive breakpoints
    breakpoints: {
      1550: {
        slidesPerView: 5.2,
        slidesPerGroup: 3,
      },
      1200: {
        slidesPerView: 4.2,
        slidesPerGroup: 3,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 3.5,
        slidesPerGroup: 3,
        spaceBetween: 10,
      },
      767: {
        slidesPerView: 2.5,
        slidesPerGroup: 2,
        spaceBetween: 10,
      },
      450: {
        slidesPerView: 1.5,
        slidesPerGroup: 1,
        spaceBetween: 10,
      },
    },
    pagination: {
      el: `#${ID}-carousel-pagination`,
      type: 'bullets',
      clickable: true,

    },
    navigation: {
      nextEl: `.${ID}-button-next`,
      prevEl: `.${ID}-button-prev`,
    }

  })

  // Once the carousel is ready, initiate swiper and remove the loading spinner to display the carousel

  setTimeout(function () {
    mySwiper.init();
  }, 300);

  setTimeout(function () {

    document.querySelector(`.${ID}-carousel-holder`).classList.remove('loading');

  }, 600);



}



const createModal = () => {

  let modalHTML = `
 
         <div class="${ID}-similarprods-modal">
 
             <div class="${ID}-section-close"> <a href="#" id="${ID}-section-close" class="${ID}-section-close-link"> <svg height='20px' width='20px' fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 100 100"><defs><g id="a"><path fill="#000000" stroke="#000" d=" M 81.75 21.75 Q 82.503515625 21.0390625 82.5 20 82.503515625 18.9607421875 81.75 18.2 81.0390625 17.4962890625 80 17.5 78.9607421875 17.4962890625 78.2 18.2 L 50 46.45 21.75 18.2 Q 21.0390625 17.4962890625 20 17.5 18.9607421875 17.4962890625 18.2 18.2 17.4962890625 18.9607421875 17.5 20 17.4962890625 21.0390625 18.2 21.75 L 46.45 50 18.2 78.2 Q 17.4962890625 78.9607421875 17.5 80 17.4962890625 81.0390625 18.2 81.75 18.9607421875 82.503515625 20 82.5 21.0390625 82.503515625 21.75 81.75 L 50 53.55 78.2 81.75 Q 78.9607421875 82.503515625 80 82.5 81.0390625 82.503515625 81.75 81.75 82.503515625 81.0390625 82.5 80 82.503515625 78.9607421875 81.75 78.2 L 53.55 50 81.75 21.75 Z"></path></g></defs><g transform="matrix( 1, 0, 0, 1, 0,0) "><use xlink:href="#a"></use></g></svg> </a> </div>
 
             <div class="${ID}-related-products">
 
                 <h2> <span class="${ID}-number-products">X</span> Similar Products </h2>
 
                 <div class="${ID}-nav-buttons">
                     
 
                     
                 </div>
 
                 <div class="${ID}-carousel-holder loading">
                             
                     <div class="${ID}-loading-spinner">
                         <p> Personalising... </p>
                         <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                           <circle cx="50" cy="50" fill="none" stroke="#000000" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
                         </svg>
                     </div>
 
                     <div class="${ID}-button ${ID}-button-prev"> <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 1L2 10L10 19" stroke="black" stroke-width="2"/></svg></div>

                     <div id="${ID}-carousel-inner" class="${ID}-carousel-inner swiper-container">
                         <div class="swiper-wrapper">
 
                         </div>
                     </div>  

                     <div class="${ID}-button ${ID}-button-next"> <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L9 10L1 19" stroke="black" stroke-width="2"/></svg> </div>
 
                 </div>
 
                 <div id="${ID}-carousel-pagination" class="${ID}-carousel-pagination"></div>
 
             </div>
 
         </div>
 
     `;

  let insertionPoint = document.body;

  insertionPoint.insertAdjacentHTML('afterbegin', modalHTML);

  let closeModalElement = document.getElementById(`${ID}-section-close`);

  contentHolder = document.querySelector(`.${ID}-similarprods-modal`);

  if (window.outerWidth < 650) {
    var hammertime = new Hammer(contentHolder);
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    hammertime.on('swipedown', function (ev) {
      closeModal();
    });
  }

  closeModalElement.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
  });

  document.documentElement.addEventListener('click', (e) => {
    if (e.target.classList.contains(`${ID}-noscroll`)) {
      closeModal();
    } else {
      return true;
    }
  })

}

const populateModal = (data) => {

  openModal();

  let slots = data.slots;

  let recsRef = document.querySelector(`#${ID}-carousel-inner .swiper-wrapper`);

  if (recsRef.childElementCount > 0) {
    document.querySelector(`.${ID}-carousel-holder`).classList.add('loading');
    recsRef.innerHTML = "";
  }

  document.querySelector(`.${ID}-number-products`).innerHTML = slots.length;

  [].slice.call(slots).forEach(function (slot) {

    let defaultCurrency = '£';

    let nowPrice = formatPrice(slot.item.price);
    let wasPrice = formatPrice(slot.item.ticket_price);

    let equalPrices = false;
    if (parseFloat(slot.item.price) > parseFloat(slot.item.ticket_price) || parseFloat(slot.item.price) == parseFloat(slot.item.ticket_price) || parseInt(slot.item.ticket_price) == 0) {
      equalPrices = true;
    }

    recsRef.insertAdjacentHTML('beforeend', `
 
             <a href="${slot.item.url}" class="swiper-slide ${ID}-carousel-slide">
 
                 <div class="${ID}-carousel-image">
                     <img src="${slot.item.image_url}" class="${ID}-carousel-image-element" alt="${slot.item.name} image" />
                 </div>
 
                 <div class="${ID}-carousel-product-info">
                     <p class="${ID}-carousel-info-brand">${slot.item.brand}</p>
                     <p class="${ID}-carousel-info-prodname">${slot.item.name}</p>
                 </div>
 
                 <div class="${ID}-carousel-product-price ${equalPrices == true ? 'equal-prices' : ''}">
                     <p>
                         <span class="now-price">${nowPrice}</span>
                         <span class="was-price">${wasPrice}</span>
                     </p>
                 </div>
 
             </a>
 
         `);

  });

  pollerLite([
    () => {
      let recsLength = document.querySelector(`#${ID}-carousel-inner .swiper-wrapper`).childElementCount;
      return recsLength == 15;
    }],
    () => {
      initiateSlider();

      let allRecElements = document.querySelectorAll(`.${ID}-carousel-inner .${ID}-carousel-slide`);
      [].slice.call(allRecElements).forEach(function (recElement) {

        recElement.addEventListener('click', (e) => {
          fireEvent(`Click - carousel link clicked to go to product: ${e.target.href}`);
          return true;
        });

      });

      let atbButton = document.getElementById('aAddToBag');
      atbButton.addEventListener('click', (e) => {
        let prodName = getPageData().productName;
        fireEvent("Click - ATB button clicked for product: " + prodName);
      });




    });


}

const getProductData = (sku) => {

  DYO.recommendationWidgetData(122773, { context: { type: "PRODUCT", data: [sku] } }, function (error, data) {

    populateModal(data);

  });

}

const formatPrice = (price) => {

  let defaultCurrency = '£';

  let currencySign = currencySigns[DY.recommendationContext.lng] || defaultCurrency;

  if (DY.recommendationContext.lng === 'en_EU') {
    price = price.replace('.', ',');
  }

  price = currencySign + price;

  return price;
}


const addSimilarButton = () => {

  let imageCarouselHolder = document.querySelector('.productImageCarousel');

  let imageCarousels = [].slice.call(imageCarouselHolder.querySelectorAll('.swiper-container'));

  let activeImageCarouselId = "";

  imageCarousels.forEach((item) => {

    if (item.offsetParent !== null) {
      activeImageCarouselId = item.id;
    }

  });

  let numberOfImages = imageCarouselHolder.querySelectorAll(`#${activeImageCarouselId} .swiper-slide`).length;

  if (numberOfImages >= 3) {

    let insertionPoint = imageCarouselHolder.querySelector(`#${activeImageCarouselId}`);
    insertionPoint.classList.add(`${ID}-hide-easy-zoom`);
    insertionPoint.classList.add(`${ID}-current-carousel`);

    let similarButtonHTML = `
 
         <div id="${ID}-similar-prompt" class="${ID}-similar-prompt">
 
             <h2> Not sure? </h2>
 
             <button class="${ID}-similar-button" id="${ID}-similar-button"> Show Similar </button>
 
         </div>
 
     `;

    insertionPoint.insertAdjacentHTML('afterbegin', similarButtonHTML);

    let similarButton = document.getElementById(`${ID}-similar-prompt`);

    similarButton.addEventListener('click', (e) => {

      let pageData = getPageData();

      let sku = pageData.colourVariantId + "-" + pageData.productSequenceNumber;

      getProductData(sku);

      fireEvent("Click - Modal opened by clicking view similar");

    });

    let swiperWrapper = document.querySelector(`.productImageCarousel .${ID}-current-carousel .swiper-wrapper`);
    let swiperPagination = document.querySelector(`.productImageCarousel .${ID}-current-carousel .swiper-pagination`);
    observer.connect(swiperWrapper, () => {
      setTimeout(() => {
        
        let swiperPaginationElements = swiperPagination.querySelectorAll('span');
        let swiperPaginationLength = swiperPaginationElements.length -1;
        let currActivePosition = [].slice.call(swiperPaginationElements).findIndex(element => element.classList.contains('swiper-pagination-bullet-active'));

        if(currActivePosition == swiperPaginationLength) {
          similarButton.classList.add('active');
          fireEvent(`Interaction - user has got to the final image and show more button presented`);
        } else {
          similarButton.classList.remove('active');
        }
      }, 500);
    }, {
      config: {
        attibutes: true,
        childList: false,
        subTree: false,
      },
    });

  } else {

    fireEvent("Interaction - Not enough images, test stopped");
    return;
  }



}

const activate = () => {

  setup();

  logMessage(ID + " Variation " + VARIATION);

  pollerLite([
    () => {
      return window?.DYO?.recommendationWidgetData;
    },
    () => {
      return window?.DY?.recommendationContext?.lng;
    },
    () => {
      return window?.DY?.ServerUtil?.getProductsData;
    },
    () => {
      if (typeof getPageData() !== 'undefined') {
        return true;
      }
    }],
    () => {

      if (VARIATION == 1) {
        addSimilarButton();
        createModal();
        fireEvent("Conditions Met - test shown");

        // Listen for orientation changes
        window.addEventListener("orientationchange", function () {
          // Announce the new orientation number
          if (screen.orientation.type == "landscape-primary") {
            document.documentElement.classList.remove(`${ID}-noscroll`);
            closeModal();
          }
        }, false);


      } else {
        fireEvent("Conditions Met - nothing shown");

        let imageCarouselHolder = document.querySelector('.productImageCarousel');

        let imageCarousels = [].slice.call(imageCarouselHolder.querySelectorAll('.swiper-container'));

        let activeImageCarouselId = "";

        imageCarousels.forEach((item) => {

          if (item.offsetParent !== null) {
            activeImageCarouselId = item.id;
          }

        });

        let numberOfImages = imageCarouselHolder.querySelectorAll(`#${activeImageCarouselId} .swiper-slide`).length;

        if (numberOfImages >= 3) {

          let insertionPoint = imageCarouselHolder.querySelector(`#${activeImageCarouselId}`);
          //insertionPoint.classList.add(`${ID}-hide-easy-zoom`);
          insertionPoint.classList.add(`${ID}-current-carousel`);

          let swiperWrapper = document.querySelector(`.productImageCarousel .${ID}-current-carousel .swiper-wrapper`);
          let swiperPagination = document.querySelector(`.productImageCarousel .${ID}-current-carousel .swiper-pagination`);
          observer.connect(swiperWrapper, () => {
            setTimeout(() => {
              
              let swiperPaginationElements = swiperPagination.querySelectorAll('span');
              let swiperPaginationLength = swiperPaginationElements.length -1;
              let currActivePosition = [].slice.call(swiperPaginationElements).findIndex(element => element.classList.contains('swiper-pagination-bullet-active'));

              if(currActivePosition == swiperPaginationLength) {
                fireEvent(`Interaction - user has got to the final image but no button presented`);
              } 
            }, 500);
          }, {
            config: {
              attibutes: true,
              childList: false,
              subTree: false,
            },
          });
        }
      }
    });
};

export default activate;
