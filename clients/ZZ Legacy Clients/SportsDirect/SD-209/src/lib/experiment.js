/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { events, getCookie, logMessage, setCookie, elementIsInView, pollerLite } from "../../../../../lib/utils";
import debounce from 'lodash/debounce';

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
// create variables
let mySwiper,
  recentlyViewedHolder,
  carouselLeftArrow,
  carouselRightArrow,
  carouselInner,
  carouselHolder,
  pageType,
  existingRvpHolder;

let usedStr = 121222;

const calcGreyedArea = () => {

  let slideWidth = document.querySelector(`.${ID}-carousel-inner .swiper-slide`).offsetWidth;
  let divider = 4;
  let slideGreyedArea = (slideWidth / 10) * divider;
  document.querySelector(`.${ID}-greyed-area`).style.width = slideGreyedArea + "px";

}

const initiateSlider = () => {
  // Run slick
  let slider = document.querySelector(`#${ID}-carousel-inner`);
  slider.classList.add("swiper-active");

  mySwiper = new Swiper(slider, {
    // Optional parameters
    init: false,
    loop: false,
    // If we need pagination
    slidesPerView: 6.3,
    slidesPerGroup: 5,
    spaceBetween: 20,
    // Disable preloading of all images
    preloadImages: true,
    // Enable lazy loading
    lazy: false,
    // Responsive breakpoints
    breakpoints: {
      1550: {
        slidesPerView: 6.4,
        slidesPerGroup: 5,
      },
      1400: {
        slidesPerView: 5.4,
        slidesPerGroup: 4,
      },
      1200: {
        slidesPerView: 4.4,
        slidesPerGroup: 3,
      },
      992: {
        slidesPerView: 3.4,
        slidesPerGroup: 3,
      },
      600: {
        slidesPerView: 2.4,
        slidesPerGroup: 2,
      },
      450: {
        slidesPerView: 1.4,
        slidesPerGroup: 1,
      },
      200: {
        slidesPerView: 1.4,
        slidesPerGroup: 1,
      },
    },
    pagination: {
      el: `#${ID}-carousel-pagination`,
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: `.${ID}-button-next`,
      prevEl: `.${ID}-button-prev`,
    },
  });

  // Once the carousel is ready, initiate swiper and remove the loading spinner to display the carousel

  setTimeout(function () {
    mySwiper.init();

    pollerLite([`.${ID}-carousel-inner .swiper-slide`], () => {
      
      calcGreyedArea();
      
    });

    window.addEventListener('resize', debounce(() => {
        
      calcGreyedArea();

    }, 100));

    mySwiper.on('reachEnd', () => {
      document.querySelector(`.${ID}-greyed-area`).classList.add(`${ID}-hidden`);
    })

    mySwiper.on('slidePrevTransitionStart', () => {
      document.querySelector(`.${ID}-greyed-area`).classList.remove(`${ID}-hidden`);
    })
    

  }, 300);

  setTimeout(function () {
    document
      .querySelector(`.${ID}-carousel-holder`)
      .classList.remove("loading");
  }, 600);
};

const updateSlider = () => {

  // update slider method - if the items reach 0 then removeSlider() is called
  if(carouselInner.querySelector('.swiper-wrapper').childElementCount == 0) {
    localStorage.setItem(`${ID}-removed-items`, '');
    removeSlider();
  }
  // update the slider
  mySwiper.update();
  // remove the loader after 1/2 a sec
  setTimeout(() => {
    document.querySelector(`.${ID}-carousel-holder`).classList.remove('loading');
  }, 500);
}

const removeSlider = () => {
  // destroy the swiper
  if (mySwiper) {
    mySwiper.destroy(false, true);
  }
  // hide/remove all carousel things
  carouselLeftArrow.classList.add(`${ID}-hidden`);
  carouselRightArrow.classList.add(`${ID}-hidden`);
  carouselInner.classList.remove("swiper-active");
  carouselHolder.classList.remove("loading");
  recentlyViewedHolder.remove();
  // set the cookie with the current page
  setCookie(`${ID}-rv-cleared`, JSON.stringify(window.location.href));

};

const buildCarousel = (method) => {

  // create rvp holder html
  let newRvpHolderHTML = `

    <div class="${ID}-recently-viewed">
    
      <div class="${ID}-recently-viewed-header">
        <div class="${ID}-recently-viewed-header--h2">
          <h2> Recently Viewed </h2>
        </div>
        <div class="${ID}-recently-viewed-header--button">
          <button id="${ID}-clearall" class="${ID}-recently-viewed--clearall"> Clear all </button>      
        </div>        
      </div>

      

      <div class="${ID}-carousel-holder ${VARIATION == 2 ? 'carousel-additional-info' : ''} loading">
                            
        <div class="${ID}-loading-spinner">
            <p> Updating... </p>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
              <circle cx="50" cy="50" fill="none" stroke="#000" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
            </svg>
        </div>        

        <div id="${ID}-carousel-inner" class="${ID}-carousel-inner swiper-container">
            <a href="#" class="${ID}-button ${ID}-button-prev"></a>
            <a href="#" class="${ID}-button ${ID}-button-next"></a>
            <div class="swiper-wrapper">

            </div>
            <div class="${ID}-greyed-area"></div>
        </div>              

      </div>
    
    </div>

    <div class="${ID}-carousel-controls">
        
      <div class="${ID}-carousel-pagination" id="${ID}-carousel-pagination"></div>
      
    </div>

  
  `;

  // insert rvp HTML
  let insertionPoint = document.getElementById('main-content');
  insertionPoint.insertAdjacentHTML("beforeend", newRvpHolderHTML);
  // method assignations
  carouselLeftArrow = document.querySelector(`.${ID}-button-prev`);
  carouselRightArrow = document.querySelector(`.${ID}-button-next`);
  carouselInner = document.querySelector(`.${ID}-carousel-inner`);
  carouselHolder = document.querySelector(`.${ID}-carousel-holder`);
  recentlyViewedHolder = document.querySelector(`.${ID}-recently-viewed`);

  let closeAllButton = document.getElementById(`${ID}-clearall`);

  closeAllButton.addEventListener('click', (e) => {

    e.preventDefault();
    // send event
    let closeAllMessage = "User cleared the carousel on: "+window.location.href+" and the carousel was hidden";
    fireEvent(closeAllMessage);
    // call remove slider
    removeSlider();

  });
  // getting the recommendations from DY using 'Recently Viewed' strategy.
  DYO.recommendationWidgetData(
    usedStr, 
    {},
    function (error, data) {
      if(error) {
        let eventMessage = "There was an error: "+error;
        fireEvent(eventMessage);
      } else if (data.slots.length == 0) {

        document.querySelector(`.${ID}-recently-viewed`).remove();
        document.querySelector(`.${ID}-carousel-controls`).remove();

        let eventMessage = "There were no products brought back from DY";
        fireEvent(eventMessage);
      } else {
        populateCarousel(data.slots);

        // event listener on the window scroll
        // when the item is scrolled into view an event is fired to GA
        window.addEventListener('scroll', debounce(() => {
          if(elementIsInView(recentlyViewedHolder, false)) {
            let eventMessage = "Visible - user has seen the VARIATION recently viewed carousel on pagetype: "+pageType+" url: "+window.location.href;
            fireEvent(eventMessage, true);
          }
        }, 100));

      }
      
    }
  );
  
  
};

const populateCarousel = (items) => {
  // get the carousel wrapper
  let recsRef = document.querySelector(`#${ID}-carousel-inner .swiper-wrapper`);
  let slots = items;
  // if there are elements, add the loader and remove all the existing items
  if (recsRef.childElementCount > 0) {
    document.querySelector(`.${ID}-carousel-holder`).classList.add('loading');
    recsRef.innerHTML = "";
  }
  // check for hidden products within local storage
  let hiddenProducts = localStorage.getItem(`${ID}-removed-items`);
  if(hiddenProducts) {
    hiddenProducts = JSON.parse(hiddenProducts);
    // filter hidden products out of the main list
    slots = slots.filter((slot) => {
      if(hiddenProducts.includes(slot.item.sku)) {
        return false;
      } else {
        return true;
      }
    });
  }

  let currencyText = document.querySelector('.spanCurrencyLanguageSelector > p').innerHTML;
  let currCode = currencyText.substring(0, currencyText.indexOf(' '));

  // create and insert HTML for each slot
  [].slice.call(slots).forEach(function (slot) {
      let recsInnerHTML = `
        <div data-product-sku="${slot.item.sku}" class="swiper-slide ${ID}-carousel-slide ${VARIATION == 2 ? 'additional-info' : ''}">
            <button data-product-sku="${slot.item.sku}" class="${ID}-carousel-remove-item"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20" height="20" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><g><path d="M500,442.7L79.3,22.6C63.4,6.7,37.7,6.7,21.9,22.5C6.1,38.3,6.1,64,22,79.9L442.6,500L22,920.1C6,936,6.1,961.6,21.9,977.5c15.8,15.8,41.6,15.8,57.4-0.1L500,557.3l420.7,420.1c16,15.9,41.6,15.9,57.4,0.1c15.8-15.8,15.8-41.5-0.1-57.4L557.4,500L978,79.9c16-15.9,15.9-41.5,0.1-57.4c-15.8-15.8-41.6-15.8-57.4,0.1L500,442.7L500,442.7z"/></g></svg></button>
            <a href="${slot.item.url}" class="${ID}-carousel-image">
                <img src="${slot.item.image_url}" class="${ID}-carousel-image-element" alt="${slot.item.name} image" />
                <div class="${ID}-carousel-product-info">
                  <p class="${ID}-product-brand"> ${slot.item.brand} </p>
                  <p class="${ID}-product-name"> ${slot.item.name} </p>
                  <p class="${ID}-prices ${slot.item.price == slot.item.ticket_price || slot.item.ticket_price == "0.00" ? 'equal-prices' : ''}"> <span class="now-price">${currCode}${slot.item.price.toFixed(2)}</span> <span class="was-price">${currCode}${slot.item.ticket_price}</span> </p>
                </div>
            </a>
            </div>

        </div>
      `;
      recsRef.insertAdjacentHTML('beforeend', recsInnerHTML);    
  });

  setTimeout(() => {
    // initiate slider and add tracking for the close Xs
    addSlideTracking();
    initiateSlider();

  }, 200);
  
}

const addSlideTracking = () => {

  // get all buttons
  let allRemoveButtons = document.querySelectorAll(`.${ID}-carousel-remove-item`);
  [].slice.call(allRemoveButtons).forEach((button) => {
    // add event listeners to each button
    button.addEventListener('click', (e) => {
      e.preventDefault();

      let sku = e.target.getAttribute('data-product-sku')
      // add the id to the local storage object
      if(!localStorage.getItem(`${ID}-removed-items`)) {
        let firstItem = [sku];
        localStorage.setItem(`${ID}-removed-items`, JSON.stringify(firstItem));
      } else {
        let storedRemovedItems = JSON.parse(localStorage.getItem(`${ID}-removed-items`));
        if(!storedRemovedItems.includes(sku)) {
          storedRemovedItems.push(e.target.getAttribute('data-product-sku'));
          localStorage.setItem(`${ID}-removed-items`, JSON.stringify(storedRemovedItems));
        }
        
      }
      // remove the slide and update the slider
      button.closest(`.${ID}-carousel-slide`).remove();
      document.querySelector(`.${ID}-carousel-holder`).classList.add('loading');
      updateSlider();
      // send events
      let updateMessage = "User removed recently viewed item: "+sku;
      fireEvent(updateMessage);

    });

  })

}

const createExperiment = () => {

  // hide existing rvp holder
  if(pageType == "PDP") {
    existingRvpHolder = document.getElementById("pnlRecentlyViewedProducts");
    existingRvpHolder.classList.add(`${ID}-hidden`);
  } else {

    if(document.getElementById('dy-recommendations-100332325')) {

      existingRvpHolder = document.getElementById("dy-recommendations-100332325");
      existingRvpHolder.classList.add(`${ID}-hidden`);

    } 

  }
  

  // if the cookie is set
  if(getCookie(`${ID}-rv-cleared`) && JSON.parse(getCookie(`${ID}-rv-cleared`)) == window.location.href) {
    // do nothing
    let clearedMessage = "User has already cleared the carousel on this page: "+window.location.href;
    fireEvent(clearedMessage);
  } else {
    buildCarousel('init');
  }




  
};

const getPageData = () => {

  let dataObject;
  for (let i = 0; i < window.dataLayer.length; i += 1) {
    const data = window.dataLayer[i];
    if (typeof data === 'object' && data.event && data.event === 'SD_onLoad') {
      dataObject = data;
      break;
    }
  }
  return dataObject;

}

export default () => {
  setup();
  // log out test ID + variation number
  logMessage(ID + " Variation: " + VARIATION);
  // send control/variation event
  fireEvent("Conditions Met");

  if(document.body.classList.contains("ProdDetails")) {

    logMessage("is PDP");
    pageType = "PDP";

  } else {

    logMessage("is PLP");
    pageType = "PLP";

  }

  setTimeout(() => {

    if (!document.getElementById("pnlRecentlyViewedProducts") && pageType == "PDP") {

      // if there are no recently viewed products, fire an event.
      let controlMessage = "Recently Viewed Products not found";
      fireEvent(controlMessage);
    } else {
      

      // -----------------------------
      // If control, bail out from here
      // -----------------------------
      if (shared.VARIATION == "control") {

        // event listener on the window scroll
        // when the item is scrolled into view an event is fired to GA
        window.addEventListener('scroll', debounce(() => {
          if(elementIsInView(document.getElementById("pnlRecentlyViewedProducts"), false)) {
            let eventMessage = "Visible - user has seen the CONTROL recently viewed carousel";
            fireEvent(eventMessage, true);
          }
        }, 100));
        return;
      }
  
      // there are recently viewed products and this is not the control, so start the experiment.
      createExperiment();
    }

    

    

  }, 500);

  
  
  

};
