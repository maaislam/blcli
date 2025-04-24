var SO002 = (function() {

	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	
	UC.poller([
		'body',
		'#product_addtocart_form',
		'.data.table.additional-attributes',
		'.sns-pro .delivery-counter .delivery-content li',
		'.field.qty-box',
		function () {
			if (window.jQuery) {
				return true;
			}
		}
	], run);

	function run(){
		var $ = window.jQuery;

		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'SO002',
				variation_str: 'Variation 1 Mobile'
			});
		}, { multiplier: 1.2, timeout: 0 });
		
		var trackerName;
		function sendEvent(category, action, label, nonInteractionValue) {
			var fire = function(tracker) {
				window.ga(tracker + '.send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
			};

			if (trackerName) {
				fire(trackerName);
			} else {
				UC.poller([
					function() { return window.ga.getAll; }
				], function() {
					trackerName = window.ga.getAll()[0].get('name');
					fire(trackerName);
				});
			}
		}
		
		
		$('body').addClass('SO002');
		$('#imgtag').remove();
		$('#maincontent').after([
			'<div class="SO_fixed_basket">',
				'<div>',
					'<span class="SO_total">Sale <span></span></span>',
					'<br /><span>In stock</span>',
				'</div>',
				'<a href="#">Add to Basket</a>',
			'</div>',
		].join(''));
		
		var sku = $('.trustpilot-widget').attr('data-sku');
		$.ajax({
          url: 'https://api.trustpilot.com/v1/product-reviews/business-units/52fe0d35000064000578390b/?sku=' + sku + '&apikey=CH7BAuFP245gtsUxfof1bNiCGfRsG1RL',
          dataType: 'json',
          type: 'get',
          success: function(data) {
             	 if(typeof data['numberOfReviews'] != 'undefined' && typeof data['numberOfReviews']['total'] != 'undefined') {
                 	 var numReviews = data['numberOfReviews']['total'];
                  	if(numReviews == 0) {
                  	}
					else{
						$('.product-right-content .product-info-main .price-container').after([
							'<div class="SO_rated_product">',
								'<div class="SO_stars_img"></div>',
								'<span>Rated ' + data['starsAverage'] +' out of 5 based on ' + data['numberOfReviews']['total'] + ' Reviews <br /><a href="#" class="SO_scroll_to_review">(Read all reviews)</a></span>',
							'</div>'
						].join(''));

						if(data['starsAverage'] >= 4.5){
							$('.SO_stars_img').append('<img src="https://images-static.trustpilot.com/api/stars/5/130x24.png" />');
						}
						else if(data['starsAverage'] >= 3.5){
							$('.SO_stars_img').append('<img src="https://images-static.trustpilot.com/api/stars/4/130x24.png" />');
						}

						else if(data['starsAverage'] >= 2.5){
							$('.SO_stars_img').append('<img src="https://images-static.trustpilot.com/api/stars/3/130x24.png" />');
						}

						else if(data['starsAverage'] >= 1.5){
							$('.SO_stars_img').append('<img src="https://images-static.trustpilot.com/api/stars/2/130x24.png" />');
						}

						else if(data['starsAverage'] > 0){
							$('.SO_stars_img').append('<img src="https://images-static.trustpilot.com/api/stars/1/130x24.png" />');
						}

						$('.SO_scroll_to_review').on('click', function(){
							$('html, body').animate({
								scrollTop: $('.detailed-reviews').offset().top - 40
							}, 1000);
						});
					}
				}	
			}
		});

		var prodDesc = $('.product-second-wrapper'),
			inputWrap = $('#product-options-wrapper'),
			formWrap = $('#product_addtocart_form'),
			fixedSalePrice = $('.SO_total span'),
			attrTable = $('.data.table.additional-attributes'),
			attrTableWrap = $('.additional-attributes-wrapper.table-wrapper'),
			tableCount = 0;

		if($('.product-add-form .product-price-item-view .special-price .price-wrapper .price').length > 0){
			var priceUpdate = $('.product-add-form .product-price-item-view .special-price .price-wrapper .price'),
				priceText = priceUpdate.text(),
				inStockText = $('.product-add-form form .product-info-stock-sku');
		
			inStockText.insertAfter($('.product-add-form .special-price .price-container'));

		}
		else{
			var priceUpdate = $('.product-info-main .page-title-wrapper + .price-container .price'),
				priceText = priceUpdate.text(),
				inStockText = $('#product_addtocart_form .product-info-stock-sku');

			inStockText.insertAfter($('.product-info-price .price-box .product-price-item-view .set-special-price.price-item-view'));
		}



		setInterval(function(){
			if($('.product-add-form .product-price-item-view .special-price .price-wrapper .price').length > 0){
				var priceUpdate = $('.product-add-form .product-price-item-view .special-price .price-wrapper .price'),
					priceText = priceUpdate.text();

				if(priceText == fixedSalePrice.text()){
					
				}
				else{
					fixedSalePrice.text(priceText);
				}
			}
			else if($('.product-add-form .product-price-item-view .set-special-price .price-wrapper .price').length > 0){
				var priceUpdate = $('.product-add-form .product-price-item-view .set-special-price .price-wrapper .price'),
					priceText = priceUpdate.text();

				if(priceText == fixedSalePrice.text()){
					
				}
				else{
					fixedSalePrice.text(priceText);
				}
			}
			else{
				var priceUpdate = $('.product-info-main .page-title-wrapper + .price-container .price'),
					priceText = priceUpdate.text();

				if(priceText == fixedSalePrice.text()){
					
				}
				else{
					fixedSalePrice.text(priceText);
				}
			} 
		}, 300);

		$('.sns-pro .delivery-counter .delivery-content li:first-child').text('Price promise guarantee*');
		prodDesc.insertAfter('.product.media');
		$('.product.attribute.overview .value').append(' (<a class="SO_prod_read" href="#">Read more</a>)');
		fixedSalePrice.text(priceText);
		$('.detailed-reviews').addClass('clearfix').insertAfter('.product-add-form');

		if($('.product-second-wrapper .delivery-counter').length > 0){
			console.log('thing');
			$('.product-second-wrapper .delivery-counter').insertAfter('#product_addtocart_form .field.qty-box');
		}
		
		formWrap
			.find('.product-info-price')
			.addClass('SO_price_input')
			.insertBefore('.field.qty-box');

		$('.field.qty-box').append('<a href="#" class="SO_submit_basket">Add to Basket</a>');

		prodDesc.find('.product .value').after([
			'<div class="SO_attr_table">',
				
			'</div>'
		].join(''));		

		var newAttrTable = $('.SO_attr_table');

		/* 
			Loop each td data attr
			if it matches string
				then add a class of core and add unique ID so I can pull them in order
			
			after loop check if core classes length >= 3
				if so make fake semi table matching markup it already sits in

			otherwise take top 3 td and make fake table
		*/

		attrTable.find('tbody > tr').each(function(){
			var el = $(this),
				tdData = el.find('td.data'),
				dataCheck = tdData.attr('data-th');

			if(dataCheck == 'Threadcount'){
				tdData.closest('tr').addClass('SO_core_tr SO_threadcount');
			}
			else if(dataCheck == 'Filling'){
				tdData.closest('tr').addClass('SO_core_tr SO_filling');
			}
			else if(dataCheck == 'Material'){
				tdData.closest('tr').addClass('SO_core_tr SO_material');
				
			}
			else if(dataCheck == 'Dimensions'){
				tdData.closest('tr').addClass('SO_core_tr SO_dimensions');
			}
			else if(dataCheck == 'Fill Weight'){
				tdData.closest('tr').addClass('SO_core_tr SO_fill_weight');
			}
		});

		if($('.SO_core_tr').length >= 3){
			if($('.SO_threadcount').length > 0 && tableCount <= 2){
				newAttrTable.append([
					'<div>',
						'<h3>Threadcount:</h3>',
						'<span>' + $('.SO_threadcount td').text() + '</span>',
					'</div>'
				].join(''));
				tableCount++;
			}
			if($('.SO_filling').length > 0 && tableCount <= 2){
				newAttrTable.append([
					'<div>',
						'<h3>Filling:</h3>',
						'<span>' + $('.SO_filling td').text() + '</span>',
					'</div>'
				].join(''));
				tableCount++;
			}
			if($('.SO_material').length > 0 && tableCount <= 2){
				newAttrTable.append([
					'<div>',
						'<h3>Material:</h3>',
						'<span>' + $('.SO_material td').text() + '</span>',
					'</div>'
				].join(''));
				tableCount++;
			}
			if($('.SO_dimensions').length > 0 && tableCount <= 2){
				newAttrTable.append([
					'<div>',
						'<h3>Dimensions:</h3>',
						'<span>' + $('.SO_dimensions td').text() + '</span>',
					'</div>'
				].join(''));
				tableCount++;
			}
			if($('.SO_fill_weight').length > 0 && tableCount <= 2){
				newAttrTable.append([
					'<div>',
						'<h3>Fill Weight:</h3>',
						'<span>' + $('.SO_fill_weight td').text() + '</span>',
					'</div>'
				].join(''));
				tableCount++;
			}
		}
		else{
			tableCount = 0;

			attrTable.find('tbody > tr').each(function(){
				var el = $(this),
					elTd = el.find('td').text(),
					elTh = el.find('th').text();

				if(tableCount <= 2){
					newAttrTable.append([
						'<div>',
							'<h3>' + elTh + '</h3>',
							'<span>' + elTd + '</span>',
						'</div>'
					].join(''));
				}
				tableCount++
			});
		}

		attrTableWrap.insertAfter($('.detailed-reviews'));

		//Click and change events

		$('.SO_submit_basket').on('click', function(e){
			e.preventDefault();
			$('.action.primary.tocart').click();
		});

		$('.SO_fixed_basket a').on('click', function(e){
			e.preventDefault();
			$('html, body').animate({
				scrollTop: formWrap.offset().top - 40
			}, 1000);
		});

		$('.product-options-wrapper select').on('change', function(){
			if($('.product-add-form .product-price-item-view .special-price .price-wrapper .price').length > 0){
				var priceUpdate = $('.product-add-form .product-price-item-view .special-price .price-wrapper .price'),
					priceText = priceUpdate.text();
			}
			else{
				var priceUpdate = $('.product-info-main .page-title-wrapper + .price-container .price'),
					priceText = priceUpdate.text();
			}
			fixedSalePrice.text(priceText);
		});

		$('.SO_prod_read').on('click', function(){
			$('html, body').animate({
				scrollTop: $('.product.attribute.description').offset().top - 40
			}, 1000);
		});

	}
})();