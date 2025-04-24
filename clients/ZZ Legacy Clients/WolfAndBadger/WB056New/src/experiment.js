import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var _WB056= (function() {

	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	var _activate = function() {
		var $ = window.jQuery;
		$('body').addClass('WB056');

		/*--------------------------------------
		Insert New column 
		---------------------------------------*/
		var recommendedProducts = $('<div class="WB56-PDPcolumn"/>');
		recommendedProducts.insertAfter('.span5.product-details-column');

		/*--------------------------------------
		Get "discover more" products add them to new column
		---------------------------------------*/
		var moreProductsWrapper = $('.related-products.related-products-slider-container.recommended-products-box');
		recommendedProducts.html(moreProductsWrapper);
		recommendedProducts.prepend('<div class="WB56-moreTitle"><span>Discover More</span></div>');

		moreProductsWrapper.find('.slider:first').removeClass('slider');
		
		
		/*--------------------------------------
		Events
		---------------------------------------*/
		var moreProductevent,
		    clickedMoreProductImage;
		    
		  
		recommendedProducts.find('.product-summary .WB56-discover').click(function(){
		  if(!moreProductevent){
		    sendEvent('WB056', 'Page View', 'WB056 User clicked on discover product CTA in suggested items', true);
		    moreProductevent = true;
		  }
		});
		recommendedProducts.find('.product-summary .product-image').click(function(){
		  if(!clickedMoreProductImage){
		    sendEvent('WB056', 'Page View', 'WB056 User clicked on product image in suggested items', true);
		    clickedMoreProductImage = true;
		  }
		});
	};


	/*-------------------------------------- 
	Activation
	---------------------------------------*/
	var _triggers = function(options) {
		utils.fullStory('WB056', 'Variation 1');

		_activate();
	};
	// Run experiment
	_triggers();

})();