var IT007 = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	
	UC.poller([
		'.product-collateral .block-related.block-product-grid',
		function () {
			if (window.jQuery) {
				return true;
			}
		}
	], run);

	function run(){
		var $ = window.jQuery,
			productTitle= $('.product-name h1').text(),
			windowLocation = window.location.pathname + '?openBasket=1',
			bodyVar = $('body');

		if(window.location.search == '?openBasket=1'){
			$('.header-secondary .link-bag').click();
		}

		bodyVar.addClass('IT007');
		
		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'IT007',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });

		$('body .off-canvas-wrap').after([
			'<div class="IT_pop-up_modal">',
				'<div class="IT_bg-trigger"></div>',
				'<div class="IT_inner-modal">',
					'<div class="IT_overflow_fix">',
						'<a href="#" class="IT_close_btn">X</a>',
						'<h2 class="IT_main-header"><span>' + productTitle + '</span> Successfully Added to Cart</h2>',
						'<div class="IT_sub-header">Now Complete The Look:</div>',
						'<div class="IT_slider"></div>',
						'<div class="IT_returns-policy">',
						'You\'ve got nothing to lose. With our free returns you can complete the look now, and make sure it\'s right when it arrives</div>',
					'</div>',
				'</div>',
				'<div class="IT_select-size">',
					
				'</div>',
				'<div class="IT_underlay"></div>',
			'</div>'
		].join(''));

		var slideQ = false,
			modal = $(".IT_pop-up_modal"),
			modalSlider = $('.IT_slider');


		if (slideQ === false) {
			$(".IT_pop-up_modal .IT_close_btn").on("click", function (e) {
				slideQ = true;
				e.preventDefault();

				if (modal.hasClass("active")) {
					modal.fadeOut("slow", function () {
						modal.removeClass("active");
						bodyVar.removeClass('IT_checkout_hide');
						slideQ = false;
						window.ga('send', 'event', 'IT007', 'click', 'user closed the complete the look modal', {nonInteraction: true});
					});
				} else {
					modal.fadeIn("slow", function () {
						modal.addClass("active");
						bodyVar.removeClass('IT_checkout_hide');
						slideQ = false;
					});
				}
			});

			$('.IT_bg-trigger').on("click", function () {
				if (modal.hasClass("active")) {
					modal.fadeOut("slow", function () {
						modal.removeClass("active");
						bodyVar.removeClass('IT_checkout_hide');
						slideQ = false;
						window.ga('send', 'event', 'IT007', 'click', 'user closed the complete the look modal', {nonInteraction: true});
					});
				}
			});
			
			slideQ = true;
			bodyVar.addClass('IT_checkout_hide');
			var origSizeOption = $('.switcher-field.switcher-size .switcher-label.selected'),
				slideInit = $('.IT_slider.slick-initialized');

			window.ga('send', 'event', 'IT007', 'click', 'user added original product page item to basket', {nonInteraction: true});
			
			if(origSizeOption.length > 0){
				modal.fadeIn("slow", function () {
					modal.addClass("active");

					if(slideInit.length > 0){
					}
					else{
						modalSlider.slick({
							dots: false,
							infinite: true,
							slidesToShow: 3,
							slidesToScroll: 1,
							responsive: [
								{
									breakpoint: 960,
									settings: {
										slidesToShow: 2,
										slidesToScroll: 1,
										infinite: true
									}
								},
								{
									breakpoint: 370,
									settings: {
										slidesToShow: 1,
										slidesToScroll: 1,
										infinite: true
									}
								}
							]
						});
						$.each($('.IT_select'), function () {
							var el = $(this),
								span = el.find('span'),
								sel = el.find('select');
							span.html(sel.find('option:selected').text());
							
							sel.change(function () {
								span.html(sel.find('option:selected').text());    
							});
						});
					}
					slideQ = false;
				});

				var interval = setInterval(function(){
					if(slideInit.length > 0){
						var modalSlider = $('.IT_slider');
						
						modalSlider.each(function(){  
							var highestBox = 0;

							$('.IT_slide h3', this).each(function(){
								if($(this).height() > highestBox) {
									highestBox = $(this).height(); 
								}
							});  

							$('.IT_slide h3',this).css('min-height', highestBox);
						}); 

						clearInterval(interval);
						return;
					}
				}, 200);   
			}
		}

		$('.product-collateral .block-related.block-product-grid .products-grid > li').each(function(){
			var el = $(this),
				itemWrap = el.children('div.item'),
				itemImg = itemWrap.find('a img').attr('src'),
				productName = itemWrap.find('h2.product-name a').text(),
				productHref = itemWrap.find('h2.product-name a').attr('href'),
				productPrice = itemWrap.find('div.price-box span.price').text();

			modalSlider.append([
				'<div class="IT_slide">',
					'<a style="display: none;" href="' + productHref + '" class="IT_href"></a>',
					'<div class="IT_img"><img src="' + itemImg + '" /></div>',
					'<h3>' + productName + '</h3>',
					'<p>' + productPrice + '</p>',
					'<a href="#" class="IT_basket-btn">Add to bag</a>',
					'<div class="IT_error">Please select an option.</div>',
					'<div class="IT_success">This has been successfully<br /> added to the basket.</div>',
				'</div>'
			].join(''));
		});

		var blockEvents;
		var $products = $('.IT_slider .IT_slide'),
			modalVar = $('.IT_pop-up_modal'),
			selectSizeVar = $('.IT_select-size'),
			ajaxLoader = $('#bubble-layer-overlay'),
			basketBtn = $('.IT_basket-btn');

			
		basketBtn.each(function(){
			var ajaxSuccess;

			$(this).on('click', function(){
				var el = $(this);
				elSliderParent = el.closest('.IT_slide');
				ajaxLoader.fadeIn();

				var $addToCart = elSliderParent.find('.IT_basket-btn');
				var productUrl = elSliderParent.find('.IT_href').attr('href');
				var el = elSliderParent;

				
				if (ajaxSuccess) {
					return false; // Will already show cached response, no need to call getSizes again
				} else {
					// Retrieve sizes for this product and build/show a custom select menu
					getSizes(productUrl, el);
				}
			});
		});
		

		function getSizes(productUrl, el) {
			var $select = $('<div><div class="IT_size-close">X</div><span class="IT_select-header">Select a Size</span></div>');
			
			$.ajax({
				url: productUrl,
				type: 'GET',
				dataType: 'html',
				success: function(data) {
					ajaxSuccess = true;

					var $data = $(data);

					// 1. Extract available sizes and stock levels from script tag
					var productJSON = (function() {
						var script = $data.find('#product-options-wrapper script');
						if(script.length == 0){
							return false;
						}
						var JSONStr = script.html().match(/(spConfig = new Product.Config\()(.+)(\))/)[2];
						var productJSON = JSONStr ? JSON.parse(JSONStr) : false;

						return productJSON;
					})();

					var stockJSON = (function() {
						var script = $data.find('.col-main > script').text();
						if(script.length == 0){
							return false;
						}
						var JSONStr = script.match(/(switcherConfig = )({.+})/)[2];
						var stockJSON = JSONStr ? JSON.parse(JSONStr).stock : false;

						return stockJSON;
					})();

					// If it failed to extract the JSON, show error message to user
					if (!productJSON) {
						selectSizeVar.html('<div class="IT_size-error">This product is currently out of stock</div>');
						ajaxLoader.fadeOut();
						modalVar.addClass('IT_overflow-off');
						return false;
					} else {
						var attr = productJSON.attributes;

						if(!attr){
							return false;
						}

						if(attr[150] || attr[187]){
							
						}
						else{
							return false;
						}

						var sizesArr,
							sizesNum;
						if(attr[187]) {
							sizesArr = attr[187].options;
							sizesNum = 187;
						}
						else if(attr[150]){
							sizesArr = attr[150].options;
							sizesNum = 150;
						}

						$.each(sizesArr, function() {
							var sizeLabel = this.label;
							var sizeId = this.id;
							var variationId = this.products[0];

							if (sizeLabel && sizeId) {
								var $li = $('<div class="IT_size-option" data-size-id="' + sizeId + '">' + sizeLabel + '</div>');
								
								// Disabled option if the size matches the currently selected size
								// if(sizeLabel == 'ONE SIZE'){

								// }
								
								// else if (sizeLabel === productSize) {
								// 	$li.attr('disabled', 'disabled');
								// }

								// Only append li if size is in stock
								if (stockJSON[variationId] > 0) {
									$select.append($li);	
								}
							}
						});	
						selectSizeVar.html($select);
						ajaxLoader.fadeOut();
						modalVar.addClass('IT_overflow-off');
						$('.IT_size-close').on('click', function(){
							modalVar.removeClass('IT_overflow-off');
						});
					}

					$('.IT_select-size .IT_size-option').on('click', function() {
						var elImg = el.find('.IT_img img').attr('src'),
							elHref = el.find('.IT_href').attr('href'),
							elh3 = el.find('h3').text(),
							elp = el.find('p').text(),
							elSizeID = $(this).attr('data-size-id');

						el.find('.IT_success').show();
						
						$('#cart-sidebar').append([
							'<li class="item">',
								'<a href="#" class="product-image">',
									'<img src="' + elImg + '" />',
								'</a>',
								'<div class="product-details">',
									'<p class="product-name"><a href="' + elHref + '">' + elh3 + '</a></p>',
									'<strong>1</strong> x ',
									'<span class="price">' + elp + '</span>',
									'<p class="IT_update_basket">To see an updated basket, please refresh the page or move to the checkout page.</p>',
									'<p><a href="' + windowLocation + '" class="IT_update-bakset-btn">Update basket</a></p>',
								'</div>',
							'</li>'
						].join(''));
						
						modalVar.removeClass('IT_overflow-off');
						
						addToCartAjax(data, elSizeID, sizesNum);
					});
				}
			});
		}

		

		// Add a new size product to cart
		function addToCartAjax(data, sizeData, sizesNum) {
			
			var $data = $(data);
			var $form = $data.find('#product_addtocart_form');
			var url = $form.attr('action');
			var data = $form.serialize();
			data += '&isAjax=1';
			// Find size attribute part of serialised data and change it to size ID
			if(sizesNum == 150){
				var dataSizeInfo = data.match(/(&super_attribute%5B150%5D=[\w\+-\.]+)(&)/)[1];
				data = data.replace(dataSizeInfo, '&super_attribute%5B150%5D='+sizeData);
			}
			else if(sizesNum == 187){
				var dataSizeInfo = data.match(/(&super_attribute%5B187%5D=[\w\+-\.]+)(&)/)[1];
				data = data.replace(dataSizeInfo, '&super_attribute%5B187%5D='+sizeData);
			}
			
			// Make sure only one of the product is added to basket
			//data = data.replace(dataQtyInfo, '&qty=1');

			// POST data to add to basket
			$.ajax({
				url: 'https://www.inthestyle.com/wt_ajaxcart/index/index/',
				type : 'post',
				data: data,
				success: function(data) {
					window.ga('send', 'event', 'IT002', 'ajax', 'user added product to cart', {nonInteraction: true});
				},
				error: function() {
					window.ga('send', 'event', 'IT002', 'ajax', 'error adding product to cart', {nonInteraction: true});
					ajaxSuccess = true; // Prevent from attempting again
				}
			});
		}
	}
})();

