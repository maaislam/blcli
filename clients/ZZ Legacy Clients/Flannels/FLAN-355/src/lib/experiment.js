/**
 * FLAN-355 similar items on plp
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, setCookie, getCookie, deleteCookie, logMessage } from './../../../../../lib/utils';
import { observer, pollerLite } from './../../../../../lib/uc-lib';
import { hammer } from './hammer';
events.analyticsReference = '_gaUAT';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
let mySwiper, contentHolder;
let currencySigns = {
  'en_EU':'€',
  'en_GB':'£',
  'en_US':'$'
};

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
    slidesPerView: 2.2,
    slidesPerGroup: 2,
    spaceBetween: 10,
    // Disable preloading of all images
    preloadImages: true,
    // Enable lazy loading
    lazy: false,
    // Responsive breakpoints
    breakpoints: {
      350: {
        slidesPerView: 1.7,
        slidesPerGroup: 1,
        spaceBetween: 10,
      }, 
    },
    navigation: {
      nextEl: `.${ID}-button-next`,
      prevEl: `.${ID}-button-prev`,
    },
    pagination: {
        el: `#${ID}-carousel-pagination`,
        type: 'bullets',
        clickable: true,
    }
  
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

            <div class="${ID}-current-product">

                <img src="" id="${ID}-current-product-image" class="${ID}-current-product-image" alt="current product image" />

                <h3 class="${ID}-current-product-brand" id="${ID}-current-product-brand"> Gucci </h3>

                <p class="${ID}-current-product-name" id="${ID}-current-product-name"> Test Product </p>

            </div>

            <div class="${ID}-related-products">

                <h2> Similar to this product </h2>

                <div class="${ID}-button ${ID}-button-prev"> <svg xmlns="http://www.w3.org/2000/svg" width="52" height="42" viewBox="0 0 24 24"><path d="M24 11.871l-5-4.871v3h-19v4h19v3z" stroke="#E0FF01" stroke-width="0.5"></path><path class="dy-recommendations-slider-button--hover" stroke="#E0FF01" d="M24 11.871l-5-4.871v3h-19v4h19v3z"></path></svg></div>

                <div class="${ID}-button ${ID}-button-next"> <svg xmlns="http://www.w3.org/2000/svg" width="52" height="42" viewBox="0 0 24 24"><path d="M24 11.871l-5-4.871v3h-19v4h19v3z" stroke="#E0FF01" stroke-width="0.5"></path><path class="dy-recommendations-slider-button--hover" stroke="#E0FF01" d="M24 11.871l-5-4.871v3h-19v4h19v3z"></path></svg></div>

                <div class="divider"></div>

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

                </div>

                <div id="${ID}-carousel-pagination" class="${ID}-carousel-pagination"></div>

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


	
}

const populateModal = (data, item) => {


    let modalImage = document.getElementById(`${ID}-current-product-image`);
    let modalBrand = document.getElementById(`${ID}-current-product-brand`);
    let modalProductName = document.getElementById(`${ID}-current-product-name`);

    modalImage.src = item.imageURL;
    modalBrand.innerHTML = item.brand;
    modalProductName.innerHTML = item.name;

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
      return recsLength == 9;
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

  let strategyID = 121837;

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
    let allVisibleItems = document.querySelectorAll('#navlist > li');

    [].slice.call(allVisibleItems).forEach((item) => {
      let prodSKU = item.getAttribute('li-productid');
      let buttonHTML = `<button class="${ID}-similar-button" data-product-sku="${prodSKU}"> Show me similar </button>`;
      let insertionPoint = item.querySelector('.s-productthumbtext');

      insertionPoint.insertAdjacentHTML('beforeend', buttonHTML);

      item.querySelector(`.${ID}-similar-button`).addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        let itemSKU = item.getAttribute('li-productid') + "-" + item.getAttribute('li-seq');
        let itemImageURL = item.querySelector('.MainImage').src;
        let itemURL = item.getAttribute('li-url');
        let itemBrand = item.getAttribute('li-brand');
        let itemName = item.getAttribute('li-name');
        let itemObject = {sku: itemSKU, imageURL: itemImageURL, url: itemURL, brand: itemBrand, name: itemName };

        let openModalMessage = "Modal Opened - SKU: " + itemSKU + " Item: " + itemName;
        logMessage(openModalMessage);
        fireEvent(openModalMessage);

        getProductData(itemObject);

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
