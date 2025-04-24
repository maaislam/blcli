/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent, newEvents, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import { logMessage, pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import Swiper from 'swiper/swiper-bundle';
import AddToBag from "./addToBag";
import { getOfferData, getOfferProductsData, getBuyAgainProducts, getRecentlyViewedProducts, getCategoryData, getBrandsData } from './fetchProducts';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import elementTypes from './elementTypes';

const { ID, VARIATION } = shared;
const testID = `${ID}|MyAcount Personalisation`;
const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
const testIDAndVariant = `${testID}|${testVariant}`;

let atPersObj;
let allProductViews = [];
let allPageViews = [];
let allTransactions = [];
let allCategoryViews = [];
let allOfferProducts = [];
let allProductSAPCodes = [];
let allBrandsData = [];
let allBuyAgainCodes = [];
let allRecentlyViewed = [];

let strategiesToDisplay = [];

let firstView = true;

const sortProducts = (data) => {

  // code snippet used to sort products based on the conditions listed
  // data refers to the product data returned from the api from the fetch `https://boots-optimisation.co.uk/prod-info/model/(sapCodes)`
  // pers refers to the presonalisation Object in localstorage const pers = JSON.parse(localStorage.getItem?.('ATPersObj'));


  // sorting starts:
  // 2. Recency - if purchased in the last 7 days then show these last 
  // data.sort((a, b) => a.lastPurchased - b.lastPurchased);

  data.sort((a, b) => {
    const now = Date.now();
    // 7 days calculated in seconds
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

    const isARecent = a.lastPurchased >= sevenDaysAgo;
    const isBRecent = b.lastPurchased >= sevenDaysAgo;

    if (isARecent && !isBRecent) {
      return -1; // place a first
    } else if (!isARecent && isBRecent) {
      return 1; // place b first
    } else {
      return b.lastPurchased - a.lastPurchased; // workout which was purchased first regardless of recency
    }
  });

  // 1. Frequency - if the item has been purchased > 1 then these should show first
  data.sort((a, b) => {
    const countOfA = atPersObj.transactions?.filter((transaction) => {
      const transactionSAPS = transaction.products?.map(
        (product) => product.id
      );
      return transactionSAPS.includes(`${a.model}.P`);
    }).length;

    const countOfB = atPersObj.transactions?.filter((transaction) => {
      const transactionSAPS = transaction.products?.map(
        (product) => product.id
      );
      return transactionSAPS.includes(`${b.model}.P`);
    }).length;

    return countOfB - countOfA; //sort based on number of purchases
  }); // data has now been modified with the above logic

  // 3. Price - if product is > £100 show them last
  data.sort((a, b) => {
    if (a.currentPrice < 100 && b.currentPrice >= 100) {
      return -1; // place a first
    } else if (a.currentPrice >= 100 && b.currentPrice < 100) {
      return 1; // place b first
    } else {
      return 0; // no change in order
    }
  });

  // 4. Product type - if **Fragrance or Electrical then show these last 
  data.sort((a, b) => {
    const aIsElectrical = a.categoryListName.includes('electrical');
    const bIsElectrical = b.categoryListName.includes('electrical');
    const aIsFragrance = a.categoryListName.includes('fragrance');
    const bIsFragrance = b.categoryListName.includes('fragrance');

    if ((aIsElectrical || aIsFragrance) && (!bIsElectrical || bIsElectrical)) {
      return 1; // place a to the end if it's elec or frag and b first if it's not
    } else if (
      (!aIsElectrical || aIsFragrance) &&
      (bIsElectrical || bIsFragrance)
    ) {
      return -1; // place a to the start if a is not elec or frag and if b is place b last
    } else {
      return 0; // if neither elec or frag keep order
    }
  });

  // sorting ends

  return data;


}

const closeModal = () => {
  document.querySelector(`.${ID}-personalised-overlay`).classList.remove(`${ID}-active`);
  document.documentElement.classList.remove(`${ID}-noscroll`);
}

const addSwipeFunctionality = (swiperClass) => {

  const slider = document.querySelector(swiperClass);
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });

}

const launchPersonalisedPicks = () => {

  // Insert HTML 

  

  let overlayHTML = `
  
    <div class="${ID}-personalised-overlay ${ID}-loading">

      <div class="${ID}-loading-overlay">
      
        <svg width="64" height="64" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="12" cy="2.5" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg>
        <p> Loading your picks... </p>
        
      </div>
      <div class="${ID}-personalised">
      
        <div class="${ID}-personalised--header">

          <h2>Personalised Picks For You</h2>

          <button class="${ID}-close"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M16.5 16.5L0.5 0.5M16.5 0.5L0.5 16.5" stroke="#05054B" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        
          </div>
        <div class="${ID}-personalised--content">

          <div class="${ID}-personalised--section ${ID}-personalised--section--offers">
          
            <h3>From offers you love</h3>

            <div class="${ID}-swiper ${ID}-swiper--offers">
              <button class="${ID}-carousel--arrow ${ID}-carousel--arrow--prev"><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L2 8L9 15" stroke="#333333" stroke-width="2"/></svg></button>
              <button class="${ID}-carousel--arrow ${ID}-carousel--arrow--next"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 17L13 10L6 3" stroke="#333333" stroke-width="2"/></svg></button>
              <div class="swiper-wrapper">
              
              </div>
            </div>
          
          </div>

          <div class="${ID}-personalised--section ${ID}-personalised--section--rv">
          
            <h3>View again</h3>

            <div class="${ID}-swiper ${ID}-swiper--rv">
              <button class="${ID}-carousel--arrow ${ID}-carousel--arrow--prev"><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L2 8L9 15" stroke="#333333" stroke-width="2"/></svg></button>
              <button class="${ID}-carousel--arrow ${ID}-carousel--arrow--next"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 17L13 10L6 3" stroke="#333333" stroke-width="2"/></svg></button>
              <div class="swiper-wrapper">
              
              </div>
            </div>
          
          </div>

          <div class="${ID}-personalised--section ${ID}-personalised--section--buyagain">
        
            <h3>Buy it again</h3>

            <div class="${ID}-swiper ${ID}-swiper--buyagain">
              <button class="${ID}-carousel--arrow ${ID}-carousel--arrow--prev"><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L2 8L9 15" stroke="#333333" stroke-width="2"/></svg></button>
              <button class="${ID}-carousel--arrow ${ID}-carousel--arrow--next"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 17L13 10L6 3" stroke="#333333" stroke-width="2"/></svg></button>  
              <div class="swiper-wrapper">
              
              </div>
            </div>
          
          </div>

          <div class="${ID}-personalised--section ${ID}-personalised--section--categories">
          
            <h3>Categories for you</h3>

            <div class="${ID}-swiper ${ID}-swiper--categories">

            </div>
          
          </div>

          

          <div class="${ID}-personalised--section ${ID}-personalised--section--brands">
          
            <h3>Your favourite brands</h3>

            <div class="${ID}-swiper ${ID}-swiper--brands">

            </div>
          
          </div>

          
        
        </div>
        

        
      
      </div>

    </div>
  
  `;

  document.body.insertAdjacentHTML('beforeend', overlayHTML);

  // OFFER PRODUCTS SECTION

  let products = allOfferProducts;

  products = sortProducts(products);

  if(allOfferProducts.length > 2 && strategiesToDisplay.includes('offerProducts')) {
    let productHTML = '';

    products.forEach((product) => {

      let currPrice = parseFloat(product.currentPrice);
      let wasPrice = parseFloat(product.regularPrice);

      currPrice = currPrice.toFixed(2);
      wasPrice = wasPrice.toFixed(2);
      let wasPriceDisplayed = false;
      if (wasPrice !== currPrice) {
        wasPriceDisplayed = true;
      }

      productHTML += `
      
        <a href="${product.actionURL}" target="_blank" class="${ID}-personalised--product swiper-slide">
          <div class="${ID}-personalised--product--image"><img src="${product.referenceImageURL}" alt="${product.offerName} image" /></div>
          <div class="${ID}-personalised--product--content">
            <h4>${product.offerName}</h4>
            <p${wasPriceDisplayed ? ` class="${ID}-price-saving"` : ``}>£${currPrice} ${wasPriceDisplayed ? `<span class="${ID}-wasprice">(Was £${wasPrice})</span>` : ``}</p>
            <button class="${ID}-personalised--product--add ${ID}-primary" data-model="${product.model}" data-name="${product.offerName}" data-object="${product.model}">Add to basket</button>
          </div>
        </a>
      
      `;

    });

    document.querySelector(`.${ID}-swiper--offers .swiper-wrapper`).innerHTML = productHTML;

    const swiper = new Swiper(
      `.${ID}-swiper--offers`,
      {
        slidesPerView: 3.5,
        loop: false,
        spaceBetween: 40,
        navigation: {
          nextEl: `.${ID}-swiper--offers .${ID}-carousel--arrow--next`,
          prevEl: `.${ID}-swiper--offers .${ID}-carousel--arrow--prev`
        },
        breakpoints: {
          0: {
            slidesPerView: 1.5,
          },
          500: {
            slidesPerView: 2.5,
          },
          768: {
            slidesPerView: 3.5,
          }
        }
      }
    );

    window.addEventListener("resize", () => {
      swiper.update();
    });
  } else {
    document.querySelector(`.${ID}-personalised--section--offers`).remove();
  }

  // BUY AGAIN SECTION
  
  if(allBuyAgainCodes.length > 2 && strategiesToDisplay.includes('recentlyBoughtCarousel')) {

      let products = allBuyAgainCodes;

      products = sortProducts(products);

      let productHTML = '';

      products.forEach((product) => {

        let currPrice = parseFloat(product.currentPrice);
        let wasPrice = parseFloat(product.regularPrice);

        currPrice = currPrice.toFixed(2);
        wasPrice = wasPrice.toFixed(2);
        let wasPriceDisplayed = false;
        if (wasPrice !== currPrice) {
          wasPriceDisplayed = true;
        }

        productHTML += `
      
        <a href="${product.actionURL}" target="_blank" class="${ID}-personalised--product swiper-slide">
          <div class="${ID}-personalised--product--image"><img src="${product.referenceImageURL}" alt="${product.offerName} image" /></div>
          <div class="${ID}-personalised--product--content">
            <h4>${product.offerName}</h4>
            <p${wasPriceDisplayed ? ` class="${ID}-price-saving"` : ``}>£${currPrice} ${wasPriceDisplayed ? `<span class="${ID}-wasprice">(Was £${wasPrice})</span>` : ``}</p>
            <button class="${ID}-personalised--product--add ${ID}-primary" data-model="${product.model}" data-name="${product.offerName}" data-object="${product.model}">Add to basket</button>
          </div>
        </a>
      
      `;

      });

      document.querySelector(`.${ID}-personalised-overlay`).classList.remove(`${ID}-loading`);
      document.querySelector(`.${ID}-swiper--buyagain .swiper-wrapper`).innerHTML = productHTML;

      const swiper = new Swiper(
        `.${ID}-swiper--buyagain`,
        {
          slidesPerView: 3.5,
          loop: false,
          spaceBetween: 40,
          navigation: {
            nextEl: `.${ID}-swiper--buyagain .${ID}-carousel--arrow--next`,
            prevEl: `.${ID}-swiper--buyagain .${ID}-carousel--arrow--prev`
          },
          breakpoints: {
            0: {
              slidesPerView: 1.5,
            },
            500: {
              slidesPerView: 2.5,
            },
            768: {
              slidesPerView: 3.5,
            }
          }
        }
      );

      window.addEventListener("resize", () => {
        swiper.update();
      });



  } else {
    document.querySelector(`.${ID}-personalised--section--buyagain`).remove();
  }

  // RECENTLY BOUGHT SECTION


  
  if(allRecentlyViewed.length > 2 && strategiesToDisplay.includes('recentlyBoughtCarousel')) {

      let products = allRecentlyViewed;

      products = sortProducts(products);

      let productHTML = '';

      products.forEach((product) => {

        let currPrice = parseFloat(product.currentPrice);
        let wasPrice = parseFloat(product.regularPrice);

        currPrice = currPrice.toFixed(2);
        wasPrice = wasPrice.toFixed(2);
        let wasPriceDisplayed = false;
        if (wasPrice !== currPrice) {
          wasPriceDisplayed = true;
        }

        productHTML += `
      
        <a href="${product.actionURL}" target="_blank" class="${ID}-personalised--product swiper-slide">
          <div class="${ID}-personalised--product--image"><img src="${product.referenceImageURL}" alt="${product.offerName} image" /></div>
          <div class="${ID}-personalised--product--content">
            <h4>${product.offerName}</h4>
            <p${wasPriceDisplayed ? ` class="${ID}-price-saving"` : ``}>£${currPrice} ${wasPriceDisplayed ? `<span class="${ID}-wasprice">(Was £${wasPrice})</span>` : ``}</p>
            <button class="${ID}-personalised--product--add ${ID}-primary" data-model="${product.model}" data-name="${product.offerName}" data-object="${product.model}">Add to basket</button>
          </div>
        </a>
      
      `;

      });

      document.querySelector(`.${ID}-personalised-overlay`).classList.remove(`${ID}-loading`);
      document.querySelector(`.${ID}-swiper--rv .swiper-wrapper`).innerHTML = productHTML;

      const swiper = new Swiper(
        `.${ID}-swiper--rv`,
        {
          slidesPerView: 3.5,
          loop: false,
          spaceBetween: 40,
          navigation: {
            nextEl: `.${ID}-swiper--rv .${ID}-carousel--arrow--next`,
            prevEl: `.${ID}-swiper--rv .${ID}-carousel--arrow--prev`
          },
          breakpoints: {
            0: {
              slidesPerView: 1.5,
            },
            500: {
              slidesPerView: 2.5,
            },
            768: {
              slidesPerView: 3.5,
            }
          }
        }
      );

      window.addEventListener("resize", () => {
        swiper.update();
      });

  } else {
    document.querySelector(`.${ID}-personalised--section--rv`).remove();
  }

  if(allCategoryViews.length > 2 && strategiesToDisplay.includes('categoryCarousel')) {

    let categories = allCategoryViews;

    let categoryHTML = '';

    categories.forEach((category) => {

      categoryHTML += `
      
        <a href="${category[1]}" target="_blank" class="${ID}-personalised--product--category swiper-slide">${category[0]}</a>
      
      `;

    });

    document.querySelector(`.${ID}-personalised-overlay`).classList.remove(`${ID}-loading`);
    document.querySelector(`.${ID}-swiper--categories`).innerHTML = categoryHTML;
    addSwipeFunctionality(`.${ID}-swiper--categories`);

  } else {
    document.querySelector(`.${ID}-personalised--section--categories`).remove();
  }

  if(allBrandsData.length > 2 && strategiesToDisplay.includes('brandCarousel')) {
    let brands = allBrandsData;

    let brandHTML = '';

    brands.forEach((brand) => {

      if(brand[0].toLowerCase().includes('undefined')) {
        return false;
      }

      //let brandURL = brand[0].toLowerCase().replaceAll(' ', '-').replaceAll('.', '').replaceAll('\'', '').replaceAll('&', '-').replaceAll('#', '');
      let url = `https://www.boots.com/sitesearch?searchTerm=${brand[0]}`;

      brandHTML += `

        <a href="${url}" target="_blank" class="${ID}-personalised--product--brand swiper-slide">${brand[0]}</a>

      `;

    });

    document.querySelector(`.${ID}-personalised-overlay`).classList.remove(`${ID}-loading`);

    document.querySelector(`.${ID}-swiper--brands`).innerHTML = brandHTML;
    addSwipeFunctionality(`.${ID}-swiper--brands`);
  } else {
    document.querySelector(`.${ID}-personalised--section--brands`).remove();
  }

  



  

}

const startExperiment = () => {

  

    pollerLite(['#my_account_order_summary_table'], () => {

      document.documentElement.classList.add(`${ID}-experiment-begins`);

      let newElementHTML = `
      
        <button class="${ID}-personalised-holder">
          
          <div class="${ID}-personalised-holder--personicon">
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="41" viewBox="0 0 42 41" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M31.5 11.5C31.5 5.70101 26.799 1 21 1C15.201 1 10.5 5.70101 10.5 11.5C10.5 15.7065 12.9736 19.3353 16.5456 21.0111C7.92253 23.026 1.5 30.763 1.5 40H40.5L40.4947 39.5397C40.2854 30.5068 33.9338 22.9924 25.4544 21.0111C29.0264 19.3353 31.5 15.7065 31.5 11.5Z" fill="black"/><path d="M16.5456 21.0111L16.7731 21.9849L19.5784 21.3294L16.9703 20.1058L16.5456 21.0111ZM1.5 40H0.5V41H1.5V40ZM40.5 40V41H41.5116L41.4999 39.9884L40.5 40ZM40.4947 39.5397L41.4947 39.5281L41.4944 39.5166L40.4947 39.5397ZM25.4544 21.0111L25.0297 20.1058L22.4216 21.3294L25.2269 21.9849L25.4544 21.0111ZM21 2C26.2467 2 30.5 6.2533 30.5 11.5H32.5C32.5 5.14873 27.3513 0 21 0V2ZM11.5 11.5C11.5 6.2533 15.7533 2 21 2V0C14.6487 0 9.5 5.14873 9.5 11.5H11.5ZM16.9703 20.1058C13.7362 18.5885 11.5 15.3044 11.5 11.5H9.5C9.5 16.1087 12.211 20.0821 16.1209 21.9164L16.9703 20.1058ZM2.5 40C2.5 31.2379 8.59235 23.8964 16.7731 21.9849L16.3181 20.0373C7.25272 22.1556 0.5 30.288 0.5 40H2.5ZM40.5 39H1.5V41H40.5V39ZM39.4947 39.5513L39.5001 40.0116L41.4999 39.9884L41.4946 39.5281L39.4947 39.5513ZM25.2269 21.9849C33.2713 23.8645 39.2965 30.995 39.4949 39.5629L41.4944 39.5166C41.2744 30.0186 34.5964 22.1203 25.6819 20.0373L25.2269 21.9849ZM30.5 11.5C30.5 15.3044 28.2638 18.5885 25.0297 20.1058L25.8791 21.9164C29.789 20.0821 32.5 16.1087 32.5 11.5H30.5Z" fill="black"/></svg>
          </div>

          <div class="${ID}-personalised-holder--content">
            <h2>Personalised Picks For You</h2>
            <p> Discover personalised top picks made especially for you </p>
          </div>
          
        </button>
      
      `;

      let insertionPoint = document.getElementById('my_account_order_summary_table');

      insertionPoint.insertAdjacentHTML('afterend', newElementHTML);

      // fireEvent(`Interaction - the personalised picks button & modal are placed on the page`, true);
      fireBootsEvent('Personalised Picks Button Placed', true, eventTypes.experience_render, {
        rendered_element: elementTypes.CTA,
        rendered_detail : 'Personalised Picks Button Placed'
      });

      launchPersonalisedPicks();

      document.querySelector(`.${ID}-personalised-holder`).addEventListener('click', () => {
        if(firstView) {
          firstView = false;
          document.querySelector(`.${ID}-personalised-overlay`).classList.add(`${ID}-loading`);
          setTimeout(() => {
            document.querySelector(`.${ID}-personalised-overlay`).classList.remove(`${ID}-loading`);
          }, 3000);
        }
        document.querySelector(`.${ID}-personalised-overlay`).classList.add(`${ID}-active`);
        document.documentElement.classList.add(`${ID}-noscroll`);
      });

      document.documentElement.addEventListener('click', (e) => {

        if(e.target.classList.contains(`${ID}-close`) || e.target.closest(`.${ID}-close`)) {
          closeModal();
          // fireEvent('Click - user clicked the close button to dismiss the modal', true);
          fireBootsEvent('Personalised Picks Modal Closed', true, eventTypes.experience_action, {
            action: actionTypes.close,
            action_detail: 'Personalised Picks Modal Closed'
          });
        }

        if (e.target.classList.contains(`${ID}-personalised--product--add`) || e.target.closest(`.${ID}-personalised--product--add`)) {
          e.preventDefault();
          let button = e.target.classList.contains(`${ID}-personalised--product--add`) ? e.target : e.target.closest(`.${ID}-personalised--product--add`);

          const model = button.getAttribute("data-model");
          const name = button.getAttribute("data-name");
          const object = button.getAttribute("data-object");
          const addToBag = new AddToBag(
            object,
            parseInt(object, 10) - 1,
            model,
            name
          );

          let carouselType = button.closest(`.${ID}-personalised--section`);
          if(carouselType.classList.contains(`${ID}-personalised--section--buyagain`)) {
            carouselType = 'Buy Again';
          } else if(carouselType.classList.contains(`${ID}-personalised--section--categories`)) {
            carouselType = 'Categories';
          } else if(carouselType.classList.contains(`${ID}-personalised--section--offers`)) {
            carouselType = 'Offers';
          } else if(carouselType.classList.contains(`${ID}-personalised--section--brands`)) {
            carouselType = 'Brands';
          } else if(carouselType.classList.contains(`${ID}-personalised--section--rv`)) {
            carouselType = 'Recently Viewed';
          }


          // fireEvent(`Click - user clicked the add to basket button for product: ${name} from carousel: ${carouselType}`, true);
          fireBootsEvent('Add to Basket Button Clicked', true, eventTypes.experience_action, {
            action: actionTypes.add_to_cart,
            action_detail: `Add to Basket Button Clicked for product: ${name} from carousel: ${carouselType}`
          });

          addToBag.add();

        }

        if (e.target.closest(`.${ID}-swiper`) && (!e.target.classList.contains(`${ID}-personalised--product--add`) || !e.target.closest(`.${ID}-personalised--product--add`)) && (e.target.tagType == "A" || e.target.closest("a"))) {

          let carouselType = e.target.closest(`.${ID}-personalised--section`);
          if (carouselType.classList.contains(`${ID}-personalised--section--buyagain`)) {
            carouselType = 'Buy Again';
          } else if (carouselType.classList.contains(`${ID}-personalised--section--categories`)) {
            carouselType = 'Categories';
          } else if (carouselType.classList.contains(`${ID}-personalised--section--offers`)) {
            carouselType = 'Offers';
          } else if (carouselType.classList.contains(`${ID}-personalised--section--brands`)) {
            carouselType = 'Brands';
          } else if (carouselType.classList.contains(`${ID}-personalised--section--rv`)) {
            carouselType = 'Recently Viewed';
          }
          // fireEvent(`Click - user clicked a product link going to href: ${e.target.closest('a').href} from carousel: ${carouselType}`, true);
          fireBootsEvent('Product Link Clicked', true, eventTypes.experience_action, {
            action: actionTypes.click_product,
            action_detail: `Product Link Clicked going to href: ${e.target.closest('a').href} from carousel: ${carouselType}`
          });
        }


        if ((e.target.classList.contains(`.oct-notification__ctas_left`) || e.target.closest('.oct-notification__ctas_left')) && e.target.closest('#oct-notification-container')) {
          closeModal();
        }


      });
    });

    


  


}

const checkObjectData = () => {

  return new Promise((resolve) => {
    atPersObj = JSON.parse(localStorage.getItem('ATPersObj'));
    logMessage(atPersObj);

    allProductViews = [].slice.call(atPersObj.productViews);
    allPageViews = [].slice.call(atPersObj.pageView);
    allTransactions = [].slice.call(atPersObj.transactions);
    allProductSAPCodes = [];
    allOfferProducts = [];
    allBuyAgainCodes = [];

    allProductViews = allProductViews.filter((productView) => {
      allProductSAPCodes.push(productView.SAP);
    });

    // BUY AGAIN - from Transactions in persobj, codes get pushed to an array then we call an API to get product details

    allTransactions.map((transaction) => {

      [].slice.call(transaction.products).forEach((product) => {

        allBuyAgainCodes.push(product.id);

      });

    });

    let buyAgainDataPromise = new Promise((buyAgainResolve, buyAgainReject) => {

      if(allBuyAgainCodes.length > 0) {
        getBuyAgainProducts(allBuyAgainCodes.join('&')).then((response) => {

          logMessage('Buy Again Data: ')
          logMessage(response);

          allBuyAgainCodes = response;

          if (allBuyAgainCodes.length > 2) {
            strategiesToDisplay.push('recentlyBoughtCarousel');
          }

          buyAgainResolve();

        });
      } else {
        buyAgainReject();
      }

    });

    // CATEGORIES - these get pulled from persobj and the most popular ones are displayed

    let categoryPromise = new Promise((categoryResolve, categoryReject) => {
      
      if(allPageViews.length > 0) {
        getCategoryData(allPageViews).then((response) => {

          logMessage('Category Data: ');
          logMessage(response);

          allCategoryViews = response;

          if (allCategoryViews.length > 2) {
            strategiesToDisplay.push('categoryCarousel');
          }

          categoryResolve();

        });
      } else {
        categoryReject();
      }

    
    });

    // BRANDS - these get pulled from persobj (from productViews) and the most popular ones are displayed

    let brandsPromise = new Promise((brandsResolve, brandsReject) => {

      if([].slice.call(atPersObj.productViews).length > 0) {
        getBrandsData([].slice.call(atPersObj.productViews)).then((response) => {

          logMessage('Brands Data: ');
          logMessage(response);

          allBrandsData = response;

          if(allBrandsData.length > 2) {
            strategiesToDisplay.push('brandCarousel');
          }

          brandsResolve();

        });
      } else {
        brandsReject();
      }

    
    });

    let recentlyViewedPromise = new Promise((recentlyViewedResolve, recentlyViewedReject) => {

      if(allProductSAPCodes.length > 0) {
        getRecentlyViewedProducts(allProductSAPCodes.join('&')).then((response) => {

          logMessage('Recently Viewed Data: ');
          logMessage(response);

          allRecentlyViewed = response;

          if (allRecentlyViewed.length > 2) {
            strategiesToDisplay.push('recentlyViewedCarousel');
          }

          recentlyViewedResolve();

        });
      } else {
        recentlyViewedReject();
      }



    });

    // OFFER PRODUCTS - these get pulled from persobj (from productViews) and the most popular offer is pulled out (with the most products)
    // then we do a 2nd API call to get these products & their data.

    let offerPromise = new Promise((offerResolve, offerReject) => {

      if(allProductSAPCodes.length > 0) {
        getOfferData(allProductSAPCodes.join('&')).then((response) => {

          logMessage('Offer Data: ');
          logMessage(response);

          let offerProducts = response.filter((offer) => {
            if (parseInt(offer.prodsIncluded) > 10) {
              return offer;
            }
          });

          if (offerProducts.length > 0) {
            getOfferProductsData(offerProducts[0].promotionalTextExact).then((response) => {


              allOfferProducts = response;

              if (allOfferProducts.length > 2) {
                strategiesToDisplay.push('offerProducts');
              }

              offerResolve();

            });
          } else {
            offerReject();
          }

        });
      } else {
        offerReject();
      }


    });


    Promise.allSettled([buyAgainDataPromise, categoryPromise, brandsPromise, recentlyViewedPromise, offerPromise]).then(() => {

      logMessage('All CMD promises settled');

      logMessage("All Buy Again: ");
      logMessage(allBuyAgainCodes);
      logMessage(allBuyAgainCodes.length);
      logMessage("All Categories: ");
      logMessage(allCategoryViews);
      logMessage(allCategoryViews.length);
      logMessage("All Brands: ");
      logMessage(allBrandsData);
      logMessage(allBrandsData.length);
      logMessage("All Recently Viewed: ");
      logMessage(allRecentlyViewed);
      logMessage(allRecentlyViewed.length);
      logMessage("All Offer Products: ");
      logMessage(allOfferProducts);
      logMessage(allOfferProducts.length);

      resolve();

    });

  });

}

export default () => {

  bootsEvents.initiate = true;
  bootsEvents.methods = ["datalayer"];
  bootsEvents.property = "G-C3KVJJE2RH"; 
  bootsEvents.testID = testIDAndVariant;

  setup();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  pollerLite([
    () => {
      return localStorage.getItem('ATPersObj');
    }
  ], () => {

    checkObjectData().then(() => {

      logMessage("STRATEGIES TO DISPLAY: ");
      logMessage(strategiesToDisplay);

      if (strategiesToDisplay.length >= 2) {
        // fireEvent('Conditions Met');
        if (VARIATION !== "control" && window.location.href.indexOf('myAcctMain') > -1) {
          startExperiment();
        }
        
      } else if(strategiesToDisplay.length < 2) {
        // fireEvent('Conditions Not Met - not enough strategies meeting requirements');
      }
        
      

    })


    
    

  });

};
