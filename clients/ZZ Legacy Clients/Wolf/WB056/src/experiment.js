// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------
/* eslint-disable */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const WB056 = (() => {
	let slideQ = false,
		$;

	const UCPoller = (() => {
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'.related-products.related-products-slider-container.recommended-products-box',
			'.span5.product-details-column',
			'.related-products.related-products-slider-container.recommended-products-box .product-summary .WB56-discover',
			'.related-products.related-products-slider-container.recommended-products-box .product-summary .product-image',
			() => {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], init);
	})();

	function init() {
		utils.fullStory('WB056', 'Variation 1');

		const cacheDom = (() => {
			//Cache useful selectors for later use
			const bodyVar = document.querySelector('body');

			bodyVar.classList.add('WB056');

			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar
			};
		})();

		const moveElements = {
			// Click function for the mobile tab variation to show the hidden options
			run() {	
				console.log('test');
				var recommendedProducts = $('<div class="WB56-PDPcolumn"/>');
				recommendedProducts.insertAfter('.span5.product-details-column');

				/*--------------------------------------
				Get "discover more" products add them to new column
				---------------------------------------*/
				var moreProductsWrapper = $('.related-products.related-products-slider-container.recommended-products-box');
				recommendedProducts.html(moreProductsWrapper);
				recommendedProducts.prepend('<div class="WB56-moreTitle"><span>Discover More</span></div>');

				moreProductsWrapper.find('.slider:first').removeClass('slider');

				recommendedProducts.find('.product-summary .WB56-discover').click(function () {
					utils.events.send('WB056', 'Page View', 'WB056 User clicked on discover product CTA in suggested items', true, {sendOnce: true});
				});

				recommendedProducts.find('.product-summary .product-image').click(function () {
					utils.events.send('WB056', 'Page View', 'WB056 User clicked on product image in suggested items', true, {sendOnce: true});
				});
			}
		};

		moveElements.run();
	}
})();