/**
 * FLAN-258 mini bag v2
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, observer, setCookie, getCookie, events } from './../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

const { ID, VARIATION } = shared;
let mySwiper, minibagBody, carouselLeftArrow, carouselRightArrow, carouselInner, carouselHolder, carouselTrigger, checkoutButton, viewBagButton;

const initiateSlider = () => {

  // Run slick
  let slider = document.querySelector(`#${ID}-carousel-inner`);
  slider.classList.add('swiper-active');

  mySwiper = new Swiper(slider, {
    // Optional parameters
    init: false,
    loop: false,
    // If we need pagination
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 50,
    // Disable preloading of all images
    preloadImages: true,
    // Enable lazy loading
    lazy: false,
    // Responsive breakpoints
    breakpoints: {
      150: {
        slidesPerView: 1.2,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
      550: {
        slidesPerView: 1.2,
        slidesPerGroup: 1,
        spaceBetween: 20,
      }, 
      1100: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
      1400: {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 50,
      }
    },
    navigation: {
      prevEl: `.${ID}-button-prev`,
      nextEl: `.${ID}-button-next`,
    },
  
  })

  // Once the carousel is ready, initiate swiper and remove the loading spinner to display the carousel

  setTimeout(function() {
    carouselLeftArrow.classList.remove(`${ID}-hidden`);
    carouselRightArrow.classList.remove(`${ID}-hidden`);
    mySwiper.init();
  }, 300);
  

  setTimeout(function() {
    document.querySelector(`.${ID}-carousel-holder`).classList.remove('loading');
    carouselTrigger.classList.remove(`${ID}-updating`);
  }, 600);



}

const removeSlider = () => {
  if(mySwiper) {
    mySwiper.destroy(false, true);
  }
  carouselLeftArrow.classList.add(`${ID}-hidden`);
  carouselRightArrow.classList.add(`${ID}-hidden`);
  carouselInner.classList.remove('swiper-active');
  carouselHolder.classList.remove('loading');
  setTimeout(() => {
    carouselTrigger.classList.remove(`${ID}-updating`);
  }, 500);
  

}

const buildHTML = () => {

  let bagQuantity = parseInt(document.getElementById('bagQuantity').innerHTML.trim());

  let minibagHTML = `
      <div class="${ID}-mini-basket ${bagQuantity > 0 ? 'visible' : ''}" id="${ID}-mini-basket">
        <a href="#" id="${ID}-mini-basket-trigger" class="${ID}-mini-basket-trigger"> 
          <p class="${ID}-normaltext">Your Saved Basket</p> 
          <svg class="${ID}-normalsvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.35 4.53"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:0.8px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="8.18 0.18 4.18 4.18 0.18 0.18"/></g></g></svg> 
          <p class="${ID}-updatetext">Updating Basket</p>
          <svg class="${ID}-updatesvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="shape-rendering: auto;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#FFFFFF" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle></svg> 
          <svg class="${ID}-closeX" width="35" fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 100 100"><path fill="#000000" stroke="none" d=" M 81.75 21.75 Q 82.503515625 21.0390625 82.5 20 82.503515625 18.9607421875 81.75 18.2 81.0390625 17.4962890625 80 17.5 78.9607421875 17.4962890625 78.2 18.2 L 50 46.45 21.75 18.2 Q 21.0390625 17.4962890625 20 17.5 18.9607421875 17.4962890625 18.2 18.2 17.4962890625 18.9607421875 17.5 20 17.4962890625 21.0390625 18.2 21.75 L 46.45 50 18.2 78.2 Q 17.4962890625 78.9607421875 17.5 80 17.4962890625 81.0390625 18.2 81.75 18.9607421875 82.503515625 20 82.5 21.0390625 82.503515625 21.75 81.75 L 50 53.55 78.2 81.75 Q 78.9607421875 82.503515625 80 82.5 81.0390625 82.503515625 81.75 81.75 82.503515625 81.0390625 82.5 80 82.503515625 78.9607421875 81.75 78.2 L 53.55 50 81.75 21.75 Z"></path></svg>
        </a>

        <div class="${ID}-mini-basket-body" id="${ID}-mini-basket-body">
          

          <div class="${ID}-carousel-holder loading">
                            
              <div class="${ID}-loading-spinner">
                  <p> Updating... </p>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" fill="none" stroke="#FFFFFF" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
                  </svg>
              </div>

              <div id="${ID}-carousel-inner" class="${ID}-carousel-inner swiper-container">
                  <div class="swiper-wrapper">

                  </div>
              </div> 
              
              
              <button class="${ID}-button ${ID}-button-prev"> <svg width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.53 8.35"><defs><style>.cls-1{stroke-miterlimit:10;stroke-width:0.5px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="4.35 8.18 0.35 4.18 4.35 0.18"/></g></g></svg></button>

              <button class="${ID}-button ${ID}-button-next"> <svg width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.53 8.35"><defs><style>.cls-1{stroke-miterlimit:10;stroke-width:0.5px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="0.18 0.18 4.18 4.18 0.18 8.18"/></g></g></svg></button>
              

          </div>

          <div class="${ID}-mini-basket-footer">

            <span class="${ID}-total-amount-outer mobile-only"> Total: <span id="${ID}-total-amount-mobile">£2,000.00</span> </span>

            <div class="${ID}-mini-basket-buttons">

              <a href="/cart" id="${ID}-view-bag-button" class="${ID}-view-bag-link"> View Bag </a>

              <a href="/checkoutselect" id="${ID}-checkout-button" class="${ID}-checkout-button hp-button"> <span>Secure Checkout</span> </a>

              <span class="${ID}-total-amount-outer desktop-only"> Total: <span id="${ID}-total-amount-desktop">£2,000.00</span> </span>

            </div>

        </div>

      </div>
  `;

  let insertionPoint = document.getElementById('HeaderGroup');

  insertionPoint.insertAdjacentHTML('beforeend', minibagHTML);

  let minibagTrigger = document.getElementById(`${ID}-mini-basket-trigger`);
  carouselLeftArrow = document.querySelector(`.${ID}-button-prev`);
  carouselRightArrow = document.querySelector(`.${ID}-button-next`);
  carouselInner = document.querySelector(`.${ID}-carousel-inner`);
  carouselHolder = document.querySelector(`.${ID}-carousel-holder`);
  carouselTrigger = document.getElementById(`${ID}-mini-basket-trigger`);

  checkoutButton = document.getElementById(`${ID}-checkout-button`);
  checkoutButton.addEventListener('click', (e) => {
    let checkoutButtonMessage = "Click - go straight to checkout clicked";
    logMessage(checkoutButtonMessage);
    fireEvent(checkoutButtonMessage, true);
  });

  viewBagButton = document.getElementById(`${ID}-view-bag-button`);
  viewBagButton.addEventListener('click', (e) => {
    let viewBagButtonMessage = "Click - view bag clicked";
    logMessage(viewBagButtonMessage);
    fireEvent(viewBagButtonMessage, true);
  });

  minibagBody = document.getElementById(`${ID}-mini-basket`);
  
  minibagTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.currentTarget.classList.contains('active')) {
      e.currentTarget.classList.remove('active');
      minibagBody.classList.remove('active');
      document.documentElement.classList.remove(`${ID}-noscroll`);
    } else {
      e.currentTarget.classList.add('active');
      minibagBody.classList.add('active');
      document.documentElement.classList.add(`${ID}-noscroll`);
    }

  });

  document.documentElement.addEventListener('click', (e) => {
    if(e.target.classList.contains(`${ID}-noscroll`) || (document.documentElement.classList.contains(`${ID}-noscroll`) && e.target.classList.contains('HeaderWrap'))) {
      minibagTrigger.classList.remove('active');
      minibagBody.classList.remove('active');
      document.documentElement.classList.remove(`${ID}-noscroll`);
    }
  })

  copyBasketItems();

  // --- PAGE CHANGES / OBSERVER
  observer.connect(document.getElementById('ulBag'), () => {
    carouselTrigger.classList.add(`${ID}-updating`);
    copyBasketItems();
  }, {
    throttle: 200,
    config: {
      attributes: false,
      childList: true,
      // subtree: true,
    },
  });

  // Send visible event
  let visibleMessage = "Visible - Mini-basket shown on page";
  logMessage(visibleMessage);
  fireEvent(visibleMessage);


}

const copyBasketItems = () => {

  carouselHolder.classList.add('loading');

  let carouselItemsHolder = document.getElementById(`${ID}-carousel-inner`).querySelector('.swiper-wrapper');
  if(carouselItemsHolder.childElementCount > 0) {
    carouselItemsHolder.innerHTML = "";
  }

  let bagQuantity = parseInt(document.getElementById('bagQuantity').innerHTML.trim());
  if(bagQuantity > 0) {

    document.documentElement.classList.add(`${ID}-showtest`);

    minibagBody.classList.add('visible');
    document.querySelector(`.${ID}-mini-basket-buttons`).classList.remove(`${ID}-hidden`);
    
    let basketItems = document.querySelectorAll('#ulBag li');
    let basketItemsLength = document.querySelector('#bagQuantity').innerText;
    let itemsArray = [];

    [].slice.call(basketItems).forEach(function (item) {

      let normalisedId = item.id.replace('li', '');
      let colvarId = item.getAttribute('data-prdurl');
      if(colvarId) {
        colvarId = colvarId.substring(colvarId.indexOf('colcode=') + 8, colvarId.length);
      } else {
        colvarId = "outofstock";
      }

      carouselItemsHolder.insertAdjacentHTML('beforeend', `<div data-colvarid="${colvarId}" class="swiper-slide ${ID}-mini-bag-item ${colvarId == "outofstock" ? 'out-of-stock' : ''}"> ${item.innerHTML} <a href="#" data-remove-id="${normalisedId}" class="${ID}-removeitem">X</a></div>`);
      
      itemsArray.push(colvarId);
    });

    let allImages = minibagBody.querySelectorAll(`.${ID}-mini-bag-item .Baskimg`);

    [].slice.call(allImages).forEach((image) => {
      let updatedURL = image.getAttribute('src');
      if(updatedURL) {
        updatedURL = updatedURL.replace('_s.jpg', '_m.jpg');
        image.setAttribute('src', updatedURL);
      } else {
        image.remove();
      }
      
      
    });

    let allRemoveLinks = minibagBody.querySelectorAll(`.${ID}-removeitem`);

    [].slice.call(allRemoveLinks).forEach((link) => {
      link.addEventListener('click', (e) => {
        carouselHolder.classList.add('loading');
        let removeId = link.getAttribute('data-remove-id');
        let selector = `a.removeClass[productvariantitem="${removeId}"]`;
        document.querySelector(selector).click();

        let removeLinkMessage = "Click - User removed product sku: "+removeId+" by clicking the X";
        logMessage(removeLinkMessage);
        fireEvent(removeLinkMessage);
      });
    });

    
    // update basket amount

    let basketAmount = document.getElementById('spanBagSubTotalValue').innerHTML;
    document.getElementById(`${ID}-total-amount-desktop`).innerHTML = basketAmount;
    document.getElementById(`${ID}-total-amount-mobile`).innerHTML = basketAmount;
    if(basketItemsLength > 3 || window.outerWidth < 1200) {
      initiateSlider();
    } else {
      removeSlider();
    }


  } else {

    document.getElementById(`${ID}-total-amount-desktop`).innerHTML = "0.00";
    document.getElementById(`${ID}-total-amount-mobile`).innerHTML = "0.00";
    document.querySelector(`.${ID}-mini-basket-buttons`).classList.add(`${ID}-hidden`);
    
    removeSlider();

  }

}


const activate = () => {

  setup();
  
  logMessage(ID + " Variation " + VARIATION);

  fireEvent('Conditions Met');
  
  
  if(VARIATION == "control") {
    return;
  }

  if(!getCookie(`${ID}-noshow`)) {
    
    buildHTML();
  } 


  
  
};

export default activate;
