/**
 * HOF-284 similar items on plp
 * @author User Conversion
 */
import { setup, getPageData, fireEvent } from './services';
import shared from './shared';
import { events, setCookie, getCookie, deleteCookie, logMessage } from './../../../../../lib/utils';
import { observer, pollerLite } from './../../../../../lib/uc-lib';
import { hammer } from './hammer';

// Force set analytics reference
events.analyticsReference = '_gaUAT';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;
let mySwiper, contentHolder;
let currencySigns = {
  'en_EU':'€',
  'en_GB':'£',
  'en_US':'$'
};

const openModal = () => {
    document.documentElement.classList.add(`${ID}-noscroll`);
    contentHolder.classList.add(`active`);
}

const closeModal = () => {
    document.documentElement.classList.remove(`${ID}-noscroll`);
    contentHolder.classList.remove(`active`);

    deleteCookie(`${ID}-opened-similar-item`);

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
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 20,
    // Disable preloading of all images
    preloadImages: true,
    // Enable lazy loading
    lazy: false,
    // Responsive breakpoints
    breakpoints: {
      350: {
        slidesPerView: 1.5,
        slidesPerGroup: 1,
        spaceBetween: 10,
      }, 
    },
    navigation: {
      nextEl: `.${ID}-carousel-next`,
      prevEl: `.${ID}-carousel-prev`,
    },
  
  })

  // Once the carousel is ready, initiate swiper and remove the loading spinner to display the carousel

  setTimeout(function() {
    mySwiper.init();
  }, 300);

  setTimeout(function() {

    document.querySelector(`.${ID}-carousel-holder`).classList.remove('loading');

  }, 600);



}



const createModal = () => {

    let modalHTML = `

        <div class="${ID}-similarprods-modal">

            <div class="${ID}-section-close"> <a href="#" id="${ID}-section-close" class="${ID}-section-close-link"> <svg height='26px' width='26px' fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 100 100"><defs><g id="a"><path fill="#000000" stroke="none" d=" M 81.75 21.75 Q 82.503515625 21.0390625 82.5 20 82.503515625 18.9607421875 81.75 18.2 81.0390625 17.4962890625 80 17.5 78.9607421875 17.4962890625 78.2 18.2 L 50 46.45 21.75 18.2 Q 21.0390625 17.4962890625 20 17.5 18.9607421875 17.4962890625 18.2 18.2 17.4962890625 18.9607421875 17.5 20 17.4962890625 21.0390625 18.2 21.75 L 46.45 50 18.2 78.2 Q 17.4962890625 78.9607421875 17.5 80 17.4962890625 81.0390625 18.2 81.75 18.9607421875 82.503515625 20 82.5 21.0390625 82.503515625 21.75 81.75 L 50 53.55 78.2 81.75 Q 78.9607421875 82.503515625 80 82.5 81.0390625 82.503515625 81.75 81.75 82.503515625 81.0390625 82.5 80 82.503515625 78.9607421875 81.75 78.2 L 53.55 50 81.75 21.75 Z"></path></g></defs><g transform="matrix( 1, 0, 0, 1, 0,0) "><use xlink:href="#a"></use></g></svg> </a> </div>

            <a href="#" id="${ID}-current-product" class="${ID}-current-product">

                <img src="" id="${ID}-current-product-image" class="${ID}-current-product-image" alt="current product image" />

                <div class="${ID}-current-product-info">
                  <h3 class="${ID}-current-product-brand" id="${ID}-current-product-brand"> Gucci </h3>

                  <p class="${ID}-current-product-name" id="${ID}-current-product-name"> Test Product </p>

                  <p> <span id="${ID}-now-price" class="${ID}-now-price"> £10 </span> <span id="${ID}-was-price" class="${ID}-was-price"> £15 </span> </p>
                </div>
            </a>

            <div class="${ID}-related-products">

                <div class="divider"></div>

                <h2> Similar to this product </h2>

                <div class="${ID}-carousel-holder loading">
                            
                    <div class="${ID}-loading-spinner">
                        <p> Personalising... </p>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                          <circle cx="50" cy="50" fill="none" stroke="#000000" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
                        </svg>
                    </div>

                    <div id="${ID}-carousel-inner" class="${ID}-carousel-inner swiper-container">
                        <div class="swiper-wrapper">

                        </div>
                    </div>  

                    <button class="${ID}-carousel-arrow ${ID}-carousel-prev"><svg xmlns="http://www.w3.org/2000/svg" width="13" viewBox="0 0 4.53 8.35"><defs><style>.cls-1{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:0.5px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="4.35 8.18 0.35 4.18 4.35 0.18"/></g></g></svg></button>
                    <button class="${ID}-carousel-arrow ${ID}-carousel-next"><svg xmlns="http://www.w3.org/2000/svg" width="13" viewBox="0 0 4.53 8.35"><defs><style>.cls-1{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:0.5px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="0.18 0.18 4.18 4.18 0.18 8.18"/></g></g></svg></button>

                </div>

            </div>

        </div>

    `;    

    let insertionPoint = document.body;

    insertionPoint.insertAdjacentHTML('afterbegin', modalHTML);

    let closeModalElement = document.getElementById(`${ID}-section-close`);

    contentHolder = document.querySelector(`.${ID}-similarprods-modal`);

    if(window.outerWidth < 650) {
        var hammertime = new Hammer(contentHolder);
        hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
        hammertime.on('swipedown', function(ev) {
            closeModal();
        });
    }

    closeModalElement.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });

    document.documentElement.addEventListener('click', (e) => {
      if(e.target.classList.contains(`${ID}-noscroll`)) {
        closeModal();
      } else {
        return true;
      }
    });

    let currProduct = document.getElementById(`${ID}-current-product`);

    currProduct.addEventListener('click', (e) => {
      let currProdMessage = "Click - user clicked to go to the current product in the modal";
      logMessage(currProdMessage);
      fireEvent(currProdMessage);
    });


	
}

const populateModal = (data, item) => { 

    let modalImage = document.getElementById(`${ID}-current-product-image`);
    let modalBrand = document.getElementById(`${ID}-current-product-brand`);
    let modalProductName = document.getElementById(`${ID}-current-product-name`);
    let modalProductLink = document.getElementById(`${ID}-current-product`);

    let modalNowPrice = document.getElementById(`${ID}-now-price`);
    let modalWasPrice = document.getElementById(`${ID}-was-price`);

    modalImage.src = item.imageURL;
    modalBrand.innerHTML = item.brand;
    modalProductName.innerHTML = item.name;
    modalNowPrice.innerHTML = item.nowPrice;
    modalWasPrice.innerHTML = item.wasPrice;
    modalProductLink.href = item.url; 

    if(item.wasPrice == "NA") {
      modalWasPrice.classList.add('hidden');
    }

    openModal();

    let slots = data.slots;

    let recsRef = document.querySelector(`#${ID}-carousel-inner .swiper-wrapper`);

    if(recsRef.childElementCount > 0) {
        document.querySelector(`.${ID}-carousel-holder`).classList.add('loading');
        recsRef.innerHTML = "";
    } 

    [].slice.call(slots).forEach(function(slot) {

        let defaultCurrency = '£';

        let nowPrice = formatPrice(slot.item.price);
        let wasPrice = formatPrice(slot.item.ticket_price);

        let equalPrices = false;
        if(parseFloat(slot.item.price) > parseFloat(slot.item.ticket_price) || parseFloat(slot.item.price) == parseFloat(slot.item.ticket_price) || parseInt(slot.item.ticket_price) == 0) {
            equalPrices = true;
        }

        recsRef.insertAdjacentHTML('beforeend', `

            <a href="${slot.item.url}" data-id="${slot.item.sku}" class="swiper-slide ${ID}-carousel-slide">

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
      return recsLength == 10;
    }],
    () => {
      initiateSlider();

      
      
      let allRecElements = document.querySelectorAll(`.${ID}-carousel-inner .${ID}-carousel-slide`);
      [].slice.call(allRecElements).forEach(function(recElement) {

        recElement.addEventListener('click', (e) => {
            let clickMessage = `carousel link clicked to go to product: ${e.target.href} - cookie set for ATB tracking`;
            let productSKU = e.target.getAttribute('data-id');
            setCookie(`${ID}-clicked-suggested-sku`, productSKU);
            logMessage(clickMessage);
            fireEvent(clickMessage);
            return true;
        });

      });

    });


}

const getProductData = (item) => {

  let strategyID = 123274;

  if(VARIATION == 2) {
    strategyID = 123238;
  }

	DYO.recommendationWidgetData(strategyID,{context: {type: "PRODUCT", data: [item.sku]}}, function(error, data) { 

		populateModal(data, item);
		
	});

}

const formatPrice = (price) => {

    let defaultCurrency = '£';

    let currencySign = currencySigns[DY.recommendationContext.lng] || defaultCurrency;

    if(DY.recommendationContext.lng === 'en_EU'){
        price = price.replace('.', ',');
    } 

    price = currencySign + price;

    return price;
}


const addSimilarButtons = () => {

  pollerLite(['#navlist li'], () => {
    let allVisibleItems = document.querySelectorAll('#navlist li');

    [].slice.call(allVisibleItems).forEach((item) => {
      let prodSKU = item.getAttribute('li-productid');
      let buttonHTML = `<button class="${ID}-similar-button" data-product-sku="${prodSKU}"> View similar <span class="spacer"></span> </button>`;
      let insertionPoint = item.querySelector('.ProductImageList > div');

      insertionPoint.insertAdjacentHTML('beforeend', buttonHTML);

      item.querySelector('button').addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              let itemSKU = item.getAttribute('li-productid') + "-" + item.getAttribute('li-seq');
              let itemImageURL = item.querySelector('.MainImage').src;
              let itemURL = item.getAttribute('li-url');
              let itemBrand = item.getAttribute('li-brand');
              let itemName = item.getAttribute('li-name');
              let itemNowPrice = "£"+item.getAttribute('li-price');
              let itemWasPrice = item.querySelector('.RefandPrice .s-smalltext') ? item.querySelector('.RefandPrice .s-smalltext').innerHTML : "NA";
              let itemObject = {sku: itemSKU, imageURL: itemImageURL, url: itemURL, brand: itemBrand, name: itemName, nowPrice: itemNowPrice, wasPrice: itemWasPrice };

              let openModalMessage = "Modal Opened - SKU: " + itemSKU + " Item: " + itemName;
              logMessage(openModalMessage);
              fireEvent(openModalMessage);

              getProductData(itemObject);

              setCookie(`${ID}-opened-similar-item`, prodSKU);

      })

    });


  });
	

}

const activate = () => {
  
	setup();

	logMessage(ID + " Variation "+VARIATION);

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
      if(typeof getPageData() !== 'undefined') {
        return true;
      }
    }],
    () => {

    	if(VARIATION == 1 || VARIATION == 2) {

        if(getPageData().pageType == "BrowsePL") {

          addSimilarButtons();
          createModal();
          let variationMessage = "Conditions Met - test shown";
          logMessage(variationMessage);
          fireEvent(variationMessage);

          if(getCookie(`${ID}-opened-similar-item`)) {
            setTimeout(() => {
              document.querySelector(`button[data-product-sku="${getCookie(`${ID}-opened-similar-item`)}"]`).click();
            }, 500);
          }

          // Trigger re render on pagniation change
          const wrap = document.querySelector('#ProductContainer ul#navlist');
          observer.connect(wrap, () => {
              
              if(!wrap.querySelector(`.${ID}-similar-button`)) {

                  addSimilarButtons();
              }

          }, {
              config: {
                attributes: true,
                childList: true,
                subtree: false,
              }
          })

        } else if(getPageData().pageType == "ProductDetail") {

          pollerLite(['#aAddToBag'], () => {

            let atbButton = document.getElementById('aAddToBag');

            if(getCookie(`${ID}-clicked-suggested-sku`)) {
              let clickedProductID = getCookie(`${ID}-clicked-suggested-sku`);

              clickedProductID = clickedProductID.substring(0, clickedProductID.indexOf('-'));

              logMessage("productID from cookie: "+clickedProductID+" and from datalayer: "+getPageData().colourVariantId);

              if(clickedProductID == getPageData().colourVariantId) {

                atbButton.addEventListener('click', (e) => {
                  let fireMessage = 'Click - user has clicked ATB on colour variant ID: '+getPageData().colourVariantId+' having come through to the PDP from the similar items carousel';
                  logMessage(fireMessage);
                  fireEvent(fireMessage);

                })

              }

            }


          });

        }

    		


    	} else {
    		let controlMessage = "Conditions Met - nothing shown";
    		logMessage(controlMessage);
    		fireEvent(controlMessage);
    	}
    });
};

export default activate;
