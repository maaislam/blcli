import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import ME135markup from './lib/ME135-content.js';

const ME135 = (() => {
	let $ = null;

	// ---------------------------------------------------------
	// When adding to the framework, specify TESTVARIATION = 1
	// ---------------------------------------------------------
	let VARIATION = null;
	if (typeof ME135VARIATION != 'undefined') {
		VARIATION = ME135VARIATION;
	} else {
		VARIATION = 1;
	}

	const activate = () => {
		const $body = $('body');
		$body.addClass('ME135 ME135v' + VARIATION);

		//------------------
		//on the product page
		//------------------
		UC.poller([
			'.product_meta .posted_in a', 
			'.single_add_to_cart_button',
			'input[name="_merchoid_pa_brand_link"]',
			'.mobile-target-product-title',
		], () => {

			const addToCartButton = $('.single_add_to_cart_button'),
			productTitle = $('.mobile-target-product-title').text(),
			productBrand = $('meta[property="og:brand"]').attr("content"),
			productBrandLink = $('input[name="_merchoid_pa_brand_link"]').val();
	
			//category info
			const categoryType = $('.posted_in a'),
			productCategory = categoryType.text().trim(),
			productCategoryLink = categoryType.attr('href');

			const productPageInfo = {
				productName: productTitle,
				brandName: productBrand,
				brandLink: productBrandLink,
				categoryName: productCategory,
				categoryLink: productCategoryLink
			};
			const prodObj = JSON.stringify(productPageInfo);

			//store the info on add to bag click
			addToCartButton.on('click',() => {
				sessionStorage.setItem('ME135-product-items',prodObj);
			});

		});
		
		//------------------
		//Get the storage items
		//------------------
		const getInfo = sessionStorage.getItem('ME135-product-items');
		const productInfo = JSON.parse(getInfo);

		const boxMarkup = ME135markup;
		const boxWrap = $(`<div class="ME135-boxWrap"/>`);

		const url = window.location.pathname,
		addedToCart = window.location.href;

		const originalSuccessMessage = $('.woocommerce-message.message-success');
		//------------------
		//on the basket page
		//------------------
		if(url.indexOf('/cart/') > -1 && originalSuccessMessage.length){
			boxWrap.prependTo('#main-content #content');
			boxWrap.html(boxMarkup);

			if(VARIATION === 1){
				//add the brand button on cart for V1
				const shopCategory = $(
					`<div class="ME135-category_button ME135-button">
						<a href="">Shop more <span></span></a>
					</div>`);
				shopCategory.appendTo('.ME135_buttons');

				//remove the box after 8 second
				setTimeout(() => {
					boxWrap.addClass('ME135-hidden');
				}, 8000);
					
			}else if(VARIATION === 2){
				//add the checkout button on cart for V2
				const checkoutButton = $(
					`<span class="ME135-or">- OR -</span>
					<div class="ME135-checkout_button ME135-button">
						<a href="#choose_payment">Checkout Now</a>
					</div>`);
				checkoutButton.appendTo('.ME135_buttons');

				//smooth anchor link 
				checkoutButton.find('a').click(function(e){
					e.preventDefault();
					let target = e.target;
					let thisTarget = target.getAttribute("href");
					let targetOffset = $(thisTarget).offset().top - 50;

					$('body,html').animate({
						scrollTop: targetOffset
					}, 600);
				});
			}
		}

		//------------------
		//Add all the info from session storage
		//------------------
		boxWrap.find('.ME135_product_added').text(productInfo.productName);
		boxWrap.find('.ME135-brand_button span').text(productInfo.brandName);
		boxWrap.find('.ME135-brand_button a').attr('href',productInfo.brandLink);

		if(VARIATION === 1){
			boxWrap.find('.ME135-category_button span').text(productInfo.categoryName);
			boxWrap.find('.ME135-category_button a').attr('href',productInfo.categoryLink);
		}

		//------------------
		//Events
		//------------------
		const shopMoreBrand = $('.ME135-brand_button'),
		shopMoreCategory = $('.ME135-category_button'),
		checkoutButton = $('.ME135-checkout_button');

		shopMoreBrand.on('click',() => {
			utils.events.send('ME135 V'+VARIATION, 'Click', 'Clicked shop more brand', {sendOnce: true});
		});
		shopMoreCategory.on('click',() => {
			utils.events.send('ME135 V1', 'Click', 'Clicked shop more category', {sendOnce: true});
		});
		checkoutButton.on('click',() => {
			utils.events.send('ME135 V2', 'Click', 'Clicked checkout now', {sendOnce: true});
		});

	}

	const triggers = ((options) => {
		UC.poller([
			() => {
				return !!window.jQuery;
			}
		], () => {
			$ = window.jQuery;
			utils.fullStory('ME135', 'Variation'+VARIATION);
			activate();
		});
	})();

})();
