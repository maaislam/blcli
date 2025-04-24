import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var ME129 = (function () {
	var trackerName,
		slideQ = false,
		$;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'#pa_size',
			'#merchoid-scarcity-message',
			'[data-product_variations]',
			'[data-merchoid-dispatch-info]',
			function () {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], init);
	})();

	function init(){
		utils.fullStory('ME129', 'Variation 1');

		// Helper functions
		function getCookie(c_name) {
			var i, x, y, ARRcookies = document.cookie.split(";");

			for (i = 0; i < ARRcookies.length; i++) {
				x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
				y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
				x = x.replace(/^\s+|\s+$/g, "");
				if (x == c_name) {
					return unescape(y);
				}
			}
		}

		var cacheDom = (function() {
			//Cache useful selectors for later use
			const bodyVar = $('body');

			bodyVar.addClass('ME129');

			let sizeSelect = $('#pa_size'),
				sizeOptions = $('#pa_size option'),
				sizeOptionFirst = $('#pa_size option:first-child'),
				scarcityOriginal = $('#merchoid-scarcity-message'),
				obj = $.parseJSON($('[data-product_variations]').attr('data-product_variations')),
				stockVariationJSON = $.parseJSON($('[data-merchoid-dispatch-info]').attr('data-merchoid-dispatch-info')),
				inStock,
				bubbleMsg,
				mobileScarcityPre,
				mobileScarcityInStock,
				scarcityInStock,
				scarcityPre;
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar,
				sizeSelect,
				sizeOptions,
				sizeOptionFirst,
				scarcityOriginal,
				inStock,
				obj,
				stockVariationJSON,
				scarcityInStock,
				scarcityPre,
				mobileScarcityPre,
				mobileScarcityInStock
			};
		})();

		var assignOptions = {
			addData(){
				var sizeID = $.parseJSON($('.variations_form').attr('data-product_variations'));

				$.each(sizeID, function(i, val) {
					cacheDom.sizeSelect
						.find('option[value="' + val.attributes.attribute_pa_size + '"]')
						.attr('data-id', val.variation_id);
				});
			}
		}

		var scarcity = {
			contentBuilder(){
				cacheDom.scarcityOriginal.after([
					'<div class="ME129_scarcity ME129-in-stock">',
						'<p>Order now to receive within 2-4 working days</p>',
					'</div>',
					'<div class="ME129_scarcity ME129_pre-order">',
						'<p>Preorder Item. Order now to receive in time for Christmas</p>',
					'</div>',
					'<div class="ME129_sizing_bubble">',
						'<p>',
						'Select your size to see your delivery estimate',
						'</p>',
					'</div>'
				].join(''));

				$('.product-usps').append([
					'<div class="ME129_scarcity_mobile ME129-in-stock">',
					'<p>Order now to receive within 2-4 working days</p>',
					'</div>',
					'<div class="ME129_scarcity_mobile ME129_pre-order">',
					'<p>Preorder Item. Order now to receive in time for Christmas</p>',
					'</div>',
				].join(''));

				cacheDom.scarcityPre = $('.ME129_scarcity.ME129_pre-order');
				cacheDom.scarcityInStock = $('.ME129_scarcity.ME129-in-stock');
				
				cacheDom.mobileScarcityPre = $('.ME129_scarcity_mobile.ME129_pre-order');
				cacheDom.mobileScarcityInStock = $('.ME129_scarcity_mobile.ME129-in-stock');

				cacheDom.bubbleMsg = $('.ME129_sizing_bubble');
			}
		}

		var sizeSelect = {
			optionReset(){
				cacheDom.sizeOptions.prop('selected', false);
				cacheDom.bubbleMsg.addClass('popoutAnim');
				cacheDom.sizeOptionFirst.attr('selected', 'selected');

				if ($('#pa_size').val() === "") {
					$( '.single_add_to_cart_button' ).addClass( 'disabled wc-variation-selection-needed' );
				}
			},
			onChange(){
				cacheDom.sizeSelect.on('change', function () {
					var el = $(this),
						optionChosen = el.find('option:selected'),
						optionVal = optionChosen.val(),
						optionValEQ = optionChosen.index(),
						optionData = optionChosen.attr('data-id');

					// If the option isn't the default size message
					if(optionValEQ > 0){
						// Hide generic message if its visible
						if (cacheDom.bubbleMsg.hasClass('popoutAnim')) {
							cacheDom.bubbleMsg.fadeOut(400);
						}

						// If the product is preorder and in stock to pre order
						if (cacheDom.stockVariationJSON.variation_preorders[optionData] > 0 && cacheDom.stockVariationJSON.variation_stock[optionData] > 0) {
							// If the other message for non pre order but in stock then hide it
							sizeSelect.hideInStock();
							// Display the Pre order bubble
							cacheDom.scarcityPre.addClass('popoutAnim');
							cacheDom.mobileScarcityPre.addClass('popoutAnim').parent().addClass('ME_active');
						} 
						// If the product is in stock but not a pre order 
						else if(cacheDom.stockVariationJSON.variation_stock[optionData] > 0){
							sizeSelect.hidePreorder();
							cacheDom.scarcityInStock.addClass('popoutAnim');
							cacheDom.mobileScarcityInStock.addClass('popoutAnim').parent().addClass('ME_active');
						}
						// Otherwise hide any messages visible
						else {
							sizeSelect.hidePreorder();
							sizeSelect.hideInStock();
						}
					}
					// If the option chosen is the default size message hide bubbles
					else{
						sizeSelect.hidePreorder();
						sizeSelect.hideInStock();
					}
				});
			},
			hidePreorder(){
				if(cacheDom.scarcityPre.hasClass('popoutAnim')){
					cacheDom.scarcityPre.fadeOut(function () {
						cacheDom.scarcityPre.removeClass('popoutAnim');
						cacheDom.mobileScarcityPre.removeClass('popoutAnim').parent().removeClass('ME_active');
					});
				}
			},
			hideInStock(){
				if(cacheDom.scarcityInStock.hasClass('popoutAnim')){
					cacheDom.scarcityInStock.fadeOut(function () {
						cacheDom.scarcityInStock.removeClass('popoutAnim');
						cacheDom.mobileScarcityInStock.removeClass('popoutAnim').parent().removeClass('ME_active');
					});
				}
			}
		}

		scarcity.contentBuilder();
		assignOptions.addData();
		sizeSelect.optionReset();
		sizeSelect.onChange();
	};
})();