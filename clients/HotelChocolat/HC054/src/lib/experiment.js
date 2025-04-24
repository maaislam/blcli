/**
 * HC054 - PDP Landing Page
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.hotelchocolat.com/uk/everything-chocolate-box.html
 */

import { cookieOpt, setup, clickEvents, observeWindowWidth, generateCarouselContent, observeWindowWidthAndReload, addBanners, addCarousel } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import initiateSlick from './initiateSlick';

const { ID, VARIATION } = shared;

const activate = () => {
  
  setup();
  cookieOpt();

  // Write experiment code here
  let productDescColumn = document.querySelector('#product-content');
  // let productMainEl = document.querySelector();
  let pageTitle = document.querySelector('#page_heading h1');
  if (window.innerWidth > 767) {
    productDescColumn.insertAdjacentElement('afterbegin', pageTitle);
  }
  
  let priceContainer = document.querySelector('.price-wrapper');
  let reviewLinkEl = document.querySelector('.product-review-links.product-review-links-top');

  priceContainer.querySelector('.product-price').insertAdjacentElement('afterend', reviewLinkEl);

  observeWindowWidth();

  if (VARIATION == '1') {

    /* ----- Fathers day carousel ------ */
    const productName = document.querySelector('#pdpMain h1');

    const FDProducts = {
      'Beer and Chocolate Hamper': {
        price: '£27.50',
        image: 'https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dwf70f9d03/HC/2021/Fathers-Day/300px-Product-Images/358171.jpg',
        link: 'https://www.hotelchocolat.com/uk/beer-chocolate-collection-2.html',
      },
      "Father's Day Collection": {
        price: '£30.00',
        image: 'https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dwa482be97/HC/2021/Fathers-Day/300px-Product-Images/358227.jpg',
        link: 'https://www.hotelchocolat.com/uk/best-dad-bundle-gift.html',
      },
      "Father's Day Sleekster": {
        price: '£22.95',
        image: 'https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dwbf8069c2/HC/2021/Fathers-Day/300px-Product-Images/263332.jpg',
        link: 'https://www.hotelchocolat.com/uk/fathers-day-sleekster-box.html',
      },
      'Cacoa Beer': {
        price: '£4.00',
        image: 'https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dw96ccecc4/HC/2021/Fathers-Day/300px-Product-Images/503646.jpg',
        link: 'https://www.hotelchocolat.com/uk/chocolate-beer.html',
      },
      'Large Chocolate Hamper': {
        price: '£40.00',
        image: 'https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dw91c6578e/HC/2017/Core/300px-Product-Images/356758.jpg',
        link: 'https://www.hotelchocolat.com/uk/the-everything-collection-large.html',
      },
      'The Beer Collection': {
        price: '£10.00',
        image: 'https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dwbdda22fd/HC/2021/Fathers-Day/300px-Product-Images/263335.jpg',
        link: 'https://www.hotelchocolat.com/uk/beer-minidomes.html',
      },
      "Father's Day H-Box": {
        price: '£12.95',
        image: 'https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dw7c7b1647/HC/2021/Fathers-Day/300px-Product-Images/263333.jpg',
        link: 'https://www.hotelchocolat.com/uk/everything-chocolate-selection-fathers-day.html',
      },
      "Everything Chocolate Hamper": {
        price: '£27.50',
        image: 'https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dwa05b15ea/HC/2017/Core/300px-Product-Images/358074.jpg',
        link: 'https://www.hotelchocolat.com/uk/everything-chocolate-collection-hamper.html',
      },
    }


    if((productName.textContent.indexOf("Father's Day") > -1) || (productName.textContent.indexOf("Beer") > -1) || (document.querySelectorAll('.breadcrumb-element') && document.querySelectorAll('.breadcrumb-element')[2] && document.querySelectorAll('.breadcrumb-element')[2].textContent.indexOf("Father's Day Chocolates & Gifts") > -1)) {
      const recommendedProdContainer = `
        <div class="${ID}-recommendations__wrapper recommendations recommendations-pdp">
          <h4>Customers Also View</h4>
          <div id="${ID}-carousel-recommendations">
        </div>
      </div>`;

       // --- ADD CAROUSEL
      addCarousel(recommendedProdContainer);
      

      Object.keys(FDProducts).forEach((i) => {
        const data = FDProducts[i];

        // loop through data and add
        const prod = document.createElement('div');
        prod.classList.add('product-tile')
        prod.innerHTML = `
          <div class="product-image">
              <a class="thumb-link" href="${data.link}">
                <img src="${data.image}"/>
              </a>
          </div>
        <div class="tile-wrapper">
          <div class="product-name">
              <a class="name-link" href="${data.link}">
                <span class="product-name-24">${[i][0]}</span>
                <span class="product-name-40">${[i][0]}</span>
              </a>
            </div>
            <div class="product-pricing">
                <span class="product-sales-price" title="Sale Price">${data.price}</span>
            </div>`;

        document.querySelector(`#${ID}-carousel-recommendations`).appendChild(prod);
      });

      pollerLite([
        `#${ID}-carousel-recommendations`,
        `#${ID}-carousel-recommendations .product-tile`,
        () => {
            const pdpUrl = window.location.pathname;
            const allOfferProducts = document.querySelectorAll(`#${ID}-carousel-recommendations .product-tile`);
            [].forEach.call(allOfferProducts, (prod) => {
              const prodUrl = prod.querySelector('a.thumb-link').getAttribute('href');
              // --- If current PDP Product exists in Carousel,
              // ---- then remove this product from the carousel
              if (pdpUrl.indexOf(`${prodUrl}`) > -1) {
                prod.parentNode.removeChild(prod);
              }
            });
            return true;
        }, 
      ], () => {
        if (window.innerWidth > 767) {
          // Initiate Slick
          initiateSlick();
        }
        
      });




   
    
    } else { // Use origianl test

      if (JSON.parse(sessionStorage.getItem(`${ID}-saved-products`)) == null) {
      let obj = {};
      sessionStorage.setItem(`${ID}-saved-products`, JSON.stringify(obj));
      }
      
      generateCarouselContent();

      pollerLite([
        `#${ID}-carousel-recommendations`,
        `#${ID}-carousel-recommendations .product-tile`,
        () => {
            const pdpUrl = window.location.pathname;
            const allOfferProducts = document.querySelectorAll(`#${ID}-carousel-recommendations .product-tile`);
            [].forEach.call(allOfferProducts, (prod) => {
              const prodUrl = prod.querySelector('a.thumb-link').getAttribute('href');
              // --- If current PDP Product exists in Carousel,
              // ---- then remove this product from the carousel
              if (pdpUrl.indexOf(`${prodUrl}`) > -1) {
                prod.parentNode.removeChild(prod);
              }
            });
            return true;
        }, 
      ], () => {
        if (window.innerWidth > 767) {
          // Initiate Slick
          initiateSlick();
        }
        
      });

    }

    observeWindowWidthAndReload();

  } else if (VARIATION == '2') {
    addBanners();
  }

  clickEvents();

};


export default activate;

