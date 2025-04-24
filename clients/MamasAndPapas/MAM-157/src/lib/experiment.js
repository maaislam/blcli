/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getPageData, fireEvent } from './services';
import { pollerLite, events, logMessage, observer } from '../../../../../lib/utils';
import settings from './shared';

const { ID, VARIATION } = settings; 
let contentHolder = "";
let mySwiper;
let strategyVariableID = "";

let currencySigns = {
  'en_EU':'€',
  'en_GB':'£',
  'en_US':'$'
};

let styleCollect = true;

// 119926 needs to be used for only prods with instock
// if debugging, change this to a specific strategy id - default: 119926
strategyVariableID = 119926;

const initiateSlider = () => {

  // Run slick
  let slider = document.querySelector('.recs-carousel-inner');
  slider.classList.add('swiper-active');

  mySwiper = new Swiper(slider, {
    // Optional parameters
    init: false,
    loop: true,
    // If we need pagination
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 20,
    // Disable preloading of all images
    preloadImages: true,
    // Enable lazy loading
    lazy: false,
    navigation: {
      nextEl: '#recs-arrow-right',
      prevEl: '#recs-arrow-left',
    },
    // Responsive breakpoints
    breakpoints: {
      420: {
      	slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
      },
      600: {
      	slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 20,
      },
      767: {
      	slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20,
      },
      1300: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 20,
      }
    }
  
  })

  // Once the carousel is ready, initiate swiper and remove the loading spinner to display the carousel

  setTimeout(function() {
    mySwiper.init();
  }, 300);

  setTimeout(function() {

  	let outerImageHeight = document.querySelector('.recs-product-image-element').offsetHeight;

    let allRecImageElements = document.querySelectorAll('.recs-product-image');

    [].slice.call(allRecImageElements).forEach(function(element) {
    	element.style.minHeight = outerImageHeight + "px";
    });

  	document.querySelector('.recs-carousel-holder').classList.remove('loading');
  }, 600);



}


const createSimilarityCarousel = () => {

	let oosHTML = `

		<div class="MAM-157-outer-recs-holder">
			<h2 class="may-also-like-header"> Similar Items in Stock </h2>

			<div class="recs-carousel-holder loading">
				
				<div class="loading-spinner">
					<p> Loading... </p>
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
					  <circle cx="50" cy="50" fill="none" stroke="#000000" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
					</svg>
				</div>

				<div class="recs-arrow arrow-left">
					<button id="recs-arrow-left"></button>
				</div>         

				<div id="recs-carousel-inner" class="recs-carousel-inner swiper-container">
					<div class="swiper-wrapper">

					</div>
				</div>	

				<div class="recs-arrow arrow-right">
					<button id="recs-arrow-right"></button>
				</div>

			</div>
		</div>

	`;

	let ref = document.querySelector('.product-form__controls-group');

	ref.insertAdjacentHTML('afterend', oosHTML);

	contentHolder = document.querySelector('.MAM-157-outer-recs-holder');
	
	buildRecsCarousel();

}

const buildRecsCarousel = () => {

	let recsRef = contentHolder.querySelector('.recs-carousel-inner .swiper-wrapper');

	let usedStr = strategyVariableID;

	DYO.recommendationWidgetData(usedStr,{},function(error, data) { 


		let slots = data.slots;

		[].slice.call(slots).forEach(function(slot) {

			let defaultCurrency = '£';

			let nowPrice = formatPrice(slot.item.price);

			recsRef.insertAdjacentHTML('beforeend', `

				<a href="${slot.item.url}" class="swiper-slide recs-slide">

					<div class="recs-product-image">
						<img src="${slot.item.image_url}" class="recs-product-image-element" alt="${slot.item.name} image" />
					</div>

					<div class="recs-product-info">
						<p class="recs-info-brand">${slot.item.product_vendor}</p>
						<p class="recs-info-prodname">${slot.item.name}</p>
					</div>

					<div class="recs-product-price">
						<p>
							<span class="now-price">${nowPrice}</span>
						</p>
					</div>

				</a>

			`);

		});

		pollerLite([
	    () => {
	      let recsLength = document.querySelector('#recs-carousel-inner .swiper-wrapper').childElementCount;
	      return recsLength == 12;
	    }],
	    () => {
	      initiateSlider();
	      
	      let allRecElements = document.querySelectorAll('#recs-carousel-inner .recs-slide');
	      [].slice.call(allRecElements).forEach(function(recElement) {

	      	recElement.addEventListener('click', (e) => {
	      		fireEvent(`carousel link clicked to go to product: ${e.target.href}`);
	      		return true;
	      	});

	      });

	    });

	})

}

const formatPrice = (price) => {

	let defaultCurrency = '£';

	let currencySign = currencySigns[DY.recommendationContext.lng] || defaultCurrency;

	if(DY.recommendationContext.lng === 'en_EU'){
		price = price.replace('.', ',');
	} 

	price = parseFloat(price).toFixed(2);
	price = currencySign + price;

	return price;
}

export default () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  pollerLite(['.product-form__cart-submit',
  	() => !!window.Swiper,
  	], () => {

	  	let atbButton = document.querySelector('.product-form__cart-submit');

	  	let prodNoVariants = document.querySelector('.product-form__item').classList.contains('product-form__item--no-variants') ? true : false;

		let dyRecsContainer = document.getElementById('dy-recommendations-100276227');

	  	if(atbButton.getAttribute('aria-label') == "Out of Stock" && prodNoVariants && dyRecsContainer == null) {
			  
	  		if(VARIATION == 1) {
	  			createSimilarityCarousel();
				let variantMessage = 'Item is a simple product and showing as out of stock, variation 1 show in-stock recommendations carousel';
				logMessage(variantMessage);
	  			fireEvent(variantMessage);
	  		} else {
				let variantMessage = 'Item is a simple product and showing as out of stock, control variation means we are not showing recommendations carousel';
				logMessage(variantMessage);
	  			fireEvent(variantMessage);
	  		}

	  	} else {

	  		if(VARIATION == 1) {
				let controlMessage = 'Item is a non-simple product OR not out of stock OR shows mattress selector, variation 1 not shown';
				logMessage(controlMessage);
				fireEvent(controlMessage);
	  		} else {
				let controlMessage = 'Item is a non-simple product OR not out of stock OR shows mattress selector, control variation means we are not showing recommendations carousel';
				logMessage(controlMessage);
				fireEvent(controlMessage);
			}
	  		
	  	}

  });

};
