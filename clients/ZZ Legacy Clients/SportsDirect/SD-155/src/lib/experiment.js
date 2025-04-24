/**
 * SD-87 - Branded Search
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
import { events, logMessage } from './../../../../../lib/utils';
import { observer, pollerLite } from './../../../../../lib/uc-lib';
const { ID, VARIATION } = shared;
events.analyticsReference = '_gaUAT';

let contentHolder = "";
let mySwiper;
let prodDetails = {};
let atbButton;
let sizeVal = "";

let currencySigns = {
  'en_EU':'€',
  'en_GB':'£',
  'en_US':'$'
};

let strategyCalls = {
	'en_EU':'116281',
	'en_GB':'116249',
	'en_US':'116249'
};

let strategyVariableID = "";

let isPreOrder = false;
let isPersonalisable = false;
let isEvoucher = false;

// if debugging, change this to a specific strategy id
strategyVariableID = "${strategyVarId}";

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

const initiateSlider = () => {

  // Run slick
  let slider = document.querySelector('#recs-carousel-inner');
  slider.classList.add('swiper-active');

  mySwiper = new Swiper(slider, {
    // Optional parameters
    init: false,
    loop: false,
    // If we need pagination
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 20,
    // Disable preloading of all images
    preloadImages: true,
    navigation: {
      nextEl: '#recs-arrow-right',
      prevEl: '#recs-arrow-left',
    },
    // Responsive breakpoints
    breakpoints: {
      450: {
        slidesPerView: 1.7,
        slidesPerGroup: 1
      },
      767: {
        slidesPerView: 2.7,
        slidesPerGroup: 2
      },
      992: {
        slidesPerView: 4,
        slidesPerGroup: 4
      },
    }
  
  })

  // Once the carousel is ready, initiate swiper and remove the loading spinner to display the carousel

  setTimeout(function() {
    mySwiper.init();

  }, 200);

  setTimeout(function() {
  	document.querySelector('.recs-carousel-holder').classList.remove('loading');
  }, 400);



}

const getProductDetails = () => {

	let details = {
		'name': document.getElementById('lblProductName').innerHTML,
		'price': document.getElementById('lblSellingPrice').innerHTML,
		'wasprice': document.getElementById('lblTicketPrice').innerHTML,
		'prodImageURL': document.getElementById('imgProduct').getAttribute('src'),
		'size': document.querySelector('#ulSizes .sizeVariantHighlight').getAttribute('data-text')
	};

	return details;
}

const buildOuterHTML = (method) => {

	let ref = document.querySelector('.BreadcrumbGroupWrapper');

	if(method == "create") {

		prodDetails = getProductDetails();

		ref.insertAdjacentHTML('afterend', `

			<div class="SD-155-content-holder active">

				<a href="#" id="close-content-holder" class="close-content-holder"> <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="27" height="27" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata><g><path d="M500,442.7L79.3,22.6C63.4,6.7,37.7,6.7,21.9,22.5C6.1,38.3,6.1,64,22,79.9L442.6,500L22,920.1C6,936,6.1,961.6,21.9,977.5c15.8,15.8,41.6,15.8,57.4-0.1L500,557.3l420.7,420.1c16,15.9,41.6,15.9,57.4,0.1c15.8-15.8,15.8-41.5-0.1-57.4L557.4,500L978,79.9c16-15.9,15.9-41.5,0.1-57.4c-15.8-15.8-41.6-15.8-57.4,0.1L500,442.7L500,442.7z"/></g></svg> </a>

				

				<div class="content-inner">

					<div class="add-to-bag-holder">
						<div class="add-to-bag-inner">
							<div class="atb-loading-spinner">
								<p> Updating... </p>
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
								  <circle cx="50" cy="50" fill="none" stroke="#000000" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
								</svg>
							</div>

							<div class="bag-details-holder">
								<div class="product-image">
									<img id="SD-155-product-image" src="${prodDetails['prodImageURL']}" alt="product image" class="atb-image" />
								</div>
								<div class="product-content">
									<div class="product-content-tick">
										<svg class="tick-success" xmlns="http://www.w3.org/2000/svg" width="13" height="20" viewBox="0 0 490 490"><path d="M452.253 28.326L197.831 394.674 29.044 256.875 0 292.469l207.253 169.205L490 54.528z"/></svg>
									</div>
									<div class="product-content-inner">
										<p> <span class="success-atb"> Successfully added to bag </span> </p>
										<div class="product-name-holder"><p id="SD-155-product-name" class="product-name"> ${prodDetails['name']}</p> - <p class="product-size" id="SD-155-product-size">${prodDetails['size']}</p> </div>
										<p class="price ${ prodDetails['price'] == prodDetails['wasprice'] ? 'equal-prices' : ''}"> 
											<span id="SD-155-product-price" class="now-price">${prodDetails['price']}</span>
											<span id="SD-155-product-wasprice" class="was-price">${prodDetails['wasprice']}</span>
										</p>
									</div>
								</div>
							</div>
							<div class="bag-buttons-holder">
								<a id="continue-to-bag" href="/cart" class="cta secondary-cta"> View Bag </a>
								<a id="continue-to-checkout" href="/checkoutselect" class="cta primary-cta"> Secure Checkout </a>
							</div>
						</div>
					</div>

					<h2 class="may-also-like-header"> You May Also Like </h2>

					<div class="recs-carousel-holder loading">
						
						<div class="loading-spinner">
							<p> Personalising... </p>
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
							  <circle cx="50" cy="50" fill="none" stroke="#000000" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
							</svg>
						</div>

						<div class="recs-arrow arrow-left">
							<a href="#" id="recs-arrow-left">
							  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" viewBox="0 0 480 880"><path d="M388.419 475.59L168.834 256.005 388.418 36.421c8.341-8.341 8.341-21.824 0-30.165s-21.824-8.341-30.165 0L123.586 240.923c-8.341 8.341-8.341 21.824 0 30.165l234.667 234.667a21.275 21.275 0 0015.083 6.251 21.277 21.277 0 0015.083-6.251c8.341-8.341 8.341-21.824 0-30.165z"/></svg>
							</a>
						</div>         

						<div id="recs-carousel-inner" class="recs-carousel-inner swiper-container">
							<div class="swiper-wrapper">

							</div>
						</div>	

						<div class="recs-arrow arrow-right">
							<a href="#" id="recs-arrow-right">
							  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" viewBox="0 0 480 880"><path d="M388.419 475.59L168.834 256.005 388.418 36.421c8.341-8.341 8.341-21.824 0-30.165s-21.824-8.341-30.165 0L123.586 240.923c-8.341 8.341-8.341 21.824 0 30.165l234.667 234.667a21.275 21.275 0 0015.083 6.251 21.277 21.277 0 0015.083-6.251c8.341-8.341 8.341-21.824 0-30.165z"/></svg>
							</a>
						</div>

					</div>

					<div class="categories-holder">

					</div>

				</div>


			</div>

		`);

		contentHolder = document.querySelector('.SD-155-content-holder');

		let chClose = document.getElementById('close-content-holder');

		chClose.addEventListener('click', () => {
			fireEvent(`click on close takeover button`);
			contentHolder.classList.remove('active');
		});	

		let ctBagButton = document.getElementById('continue-to-bag');

		ctBagButton.addEventListener('click', () => {
			fireEvent(`click on continue to cart button`);
			return true;
		});

		let ctCheckoutButton = document.getElementById('continue-to-checkout');

		ctCheckoutButton.addEventListener('click', () => {
			fireEvent(`click on continue to checkout button`);
			return true;
		});

	} else if (method == "update") {

		prodDetails = getProductDetails();

		document.getElementById('SD-155-product-image').setAttribute('src', prodDetails['prodImageURL']);
		document.getElementById('SD-155-product-name').innerHTML = prodDetails['name'];
		document.getElementById('SD-155-product-price').innerHTML = prodDetails['price'];
		document.getElementById('SD-155-product-wasprice').innerHTML = prodDetails['wasprice'];
		document.querySelector('#SD-155-product-size').innerHTML = prodDetails['size'];

	}

	
}

const formatPrice = (price) => {

	let defaultCurrency = '£';
	
	if(typeof price == "string" && price.indexOf('.')>0){
		price = parseFloat(price).toFixed(2);
	} else if(typeof price == "number" && Number.isInteger(price)) {
		price = price + ".00";
	} else {
		price = price.toFixed(2);
	}
	
	let currencyText = document.querySelector('.spanCurrencyLanguageSelector > p').innerHTML;
	let currencySign = currencyText.substring(0, currencyText.indexOf(' '));

	if(DY.recommendationContext.lng === 'en_EU'){
		price = price.replace('.', ',');
	} 

	price = currencySign + price;

	return price;
}

const buildRecsCarousel = () => {

	let recsRef = contentHolder.querySelector('.recs-carousel-inner .swiper-wrapper');

	let usedStr = 0;

	if(strategyVariableID != "${strategyVarId}") {
		usedStr = strategyVariableID;
	} else {
		usedStr = strategyCalls[DY.recommendationContext.lng]
	}

	DYO.recommendationWidgetData(usedStr,{},function(error, data) { 


		let slots = data.slots;

		[].slice.call(slots).forEach(function(slot) {

			let nowPrice = formatPrice(slot.item.price);
			let wasPrice = formatPrice(slot.item.ticket_price);

			let equalPrices = false;
			if(parseFloat(slot.item.price) > parseFloat(slot.item.ticket_price) || parseFloat(slot.item.price) == parseFloat(slot.item.ticket_price) || parseInt(slot.item.ticket_price) == 0) {
				equalPrices = true;
			}
			

			recsRef.insertAdjacentHTML('beforeend', `

				<a href="${slot.item.url}" class="swiper-slide recs-slide">

					<div class="recs-product-image">

						
						<img src="${slot.item.image_url}" class="recs-product-image-element" alt="${slot.item.name} image" />

					</div>

					<div class="recs-product-info">
						<p class="recs-info-brand">${slot.item.brand}</p>
						<p class="recs-info-prodname">${slot.item.name}</p>
					</div>

					<div class="recs-product-price ${equalPrices == true ? 'equal-prices' : ''}">
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
	      let recsLength = document.querySelector('#recs-carousel-inner .swiper-wrapper').childElementCount;
	      return recsLength == 20;
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

const startTakeover = () => {

	if(document.querySelector('.SD-155-content-holder')) {
		let addedBagHolder = document.querySelector('.add-to-bag-holder');
		addedBagHolder.classList.add('updating');

		setTimeout(function() {
			addedBagHolder.classList.remove('updating');
		}, 300);
		buildOuterHTML("update"); 

		if(contentHolder && !contentHolder.classList.contains('active')) {
			contentHolder.classList.add('active');
		}
	} else {
		buildOuterHTML("create"); 
		buildRecsCarousel();
		
	}

	let prodName = getPageData.productName;

	fireEvent(`Click - ATB button clicked for product: ${prodName} - takeover shown`);

	setTimeout(function() {
		window.scrollTo({
		  top: 0,
		  behavior: 'smooth'
		});
	}, 300);

}

const checkSizeValue = () => {
    if(document.querySelector('.sizeVariantHighlight')) {
      sizeVal = document.querySelector('.sizeVariantHighlight > a > span').textContent;
    } else {
      sizeVal = "not selected";
    }
}

const addEvents = (method) => {

	if(document.querySelector('#ulColourImages')) {
		let allColourOptions = document.querySelectorAll('#ulColourImages li a');

		if(method == "update") {
			[].slice.call(allColourOptions).forEach(function(colourOption) {
				colourOption.removeEventListener('click');
			});
		}

		[].slice.call(allColourOptions).forEach(function(colourOption) {

			colourOption.addEventListener('click', () => {

				setTimeout(function() {
					checkPDPStatus("update");
				}, 500);
				return true;

			});

		});
	}

	if(method == "update") {
		atbButton.removeEventListener('click');
	}
	
	atbButton.addEventListener('click', () => {

	    checkSizeValue();
	    if(sizeVal != "not selected") {

	    	if (isPersonalisable == true && isEvoucher == true) {

		    	pollerLite(['#btnAddEVoucherToBasket'], () => {

		    		let evoucherATBButton = document.querySelector('#btnAddEVoucherToBasket');

					evoucherATBButton.addEventListener('click', () => {

				    	startTakeover();					    

						return true;

					});


		    	});

		    } else if(isPersonalisable == false && isPreOrder == true) {

		    	pollerLite(['#aAddToBagPreOrder'], () => {

		    		let poATBButton = document.querySelector('#aAddToBagPreOrder');

					poATBButton.addEventListener('click', () => {

				    	startTakeover();					    

						return true;

					});


		    	});

		    } else {
		    	
		    	startTakeover();
	    		
	    	}
	    	
	    }

		return true;

	});

	
}

const checkPDPStatus = (method) => {

	
	let prodVariantDetails = JSON.parse(document.querySelector('.ProductDetailsVariants').getAttribute('data-variants'));
	let variantColVarId	= 0;
	if(document.querySelector('#ulColourImages .variantHighlight')) {
		variantColVarId = document.querySelector('#ulColourImages .variantHighlight').getAttribute('data-colvarid');
	} else {
		variantColVarId = getPageData().colourVariantId;
	}

	prodVariantDetails = prodVariantDetails.filter((details) => {
		if(details.ColVarId == variantColVarId) {
			return details;
		} else {
			return false;
		}

	});

	logMessage(prodVariantDetails[0]);


	if(prodVariantDetails[0].IsPreorderable == true) {
		isPreOrder = true;
	} else {
		isPreOrder = false;
	}

	if(prodVariantDetails[0].IsPersonaliseable == true) {
		isPersonalisable = true;
	} else {
		isPersonalisable = false;
	}

	if(prodVariantDetails[0].IsEvoucher == true) {
		isEvoucher = true;
	} else {
		isEvoucher = false;
	}

	logMessage("pre-order: "+isPreOrder);
	logMessage("personalisable: "+isPersonalisable);
	logMessage("e-voucher: "+isEvoucher);

	addEvents(method);

}

const activate = () => {
  
  
	setup();

	logMessage(ID + " Variation efefef: "+VARIATION);

	fireEvent('Conditions Met');

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

    	atbButton = document.querySelector('#aAddToBag');

    	// check personalisation etc
    	if(document.querySelector('#pnlPersonalisation') && document.querySelector('#pnlPersonalisation').children.length > 0) {
    		fireEvent(`Skipping product: ${getPageData.productName} as it contains personalisation`);
    		return false;
    	}

		if(shared.VARIATION == 'control') {
			return;
		}

    	document.documentElement.classList.add('SD-155-test-active');

		checkPDPStatus("create");

		if(document.querySelector('#AddedToBagModalData')) {
			document.querySelector('#AddedToBagModalData').remove();
		}
		

	    let colourOptionsObserver = document.querySelector('#ulColourImages');
		
	    if(colourOptionsObserver) {
	    	observer.connect(colourOptionsObserver, () => {
				setTimeout(function() {
					checkPDPStatus("update");
				}, 500);

		    }, {
		      config: {
		        attributes: true,
		        childList: true,
		        subtree: false,
		      }
		    });
	    }

    });
};

export default activate;
