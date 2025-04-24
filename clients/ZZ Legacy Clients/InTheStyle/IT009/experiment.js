var IT009 = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	
	UC.poller([
		function () {
			if (window.jQuery) {
				return true;
			}
		}
	], run);

	function run(){
		var $ = window.jQuery;

		$('body').addClass('IT009');
	
	    var trackerName;
		function sendEvent(category, action, label, nonInteractionValue, dimensionValue, dimensionName) {
            var fire = function (tracker) {
                var options = {};
                options.nonInteraction = nonInteractionValue;
                if(dimensionValue && dimensionName){
                    options['dimension' + dimensionValue] = dimensionName;
                }
                window.ga(tracker + '.send', 'event', category, action, label, options);
            };
    
            if (trackerName) {
                fire(trackerName);
            } 
            else {
                UC.poller([
                    function () {
                        return window.ga.getAll;
                    }
                ], function () {
                    trackerName = window.ga.getAll()[0].get('name');
                    fire(trackerName);
                });
            }
        }
		
		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'IT009',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });

		var summary = $('.right-off-canvas-menu .block-cart .summary'),
			actionsTop = $('.right-off-canvas-menu .block-cart .actions-top'),
			buttonBag = $('.right-off-canvas-menu .block-cart .summary + .actions .button.btn-bag'),
			actionsBottom = $('.right-off-canvas-menu .block-cart .actions'),
			cartSidebar = $('#cart-sidebar'),
			subTotalLabel = $('.right-off-canvas-menu .block-cart .subtotal .label'),
			blockCart = $('.right-off-canvas-menu .block-cart');

		if(actionsTop.length > 0){
			buttonBag.hide();
			summary.insertBefore('.right-off-canvas-menu .block-cart .actions-top');
			subTotalLabel.text('Basket Sub-Total:');

			cartSidebar.before([
				'<div class="IT_free_delivery">',
					'<div>',
						'<div class="IT_progress_bar"><span></span></div>',
						'<div class="IT_progress_img"><img src="" /></div>',
						'<p class="IT_progress_price">You\'re only <span class="IT_price_left">£0.00</span> away from Free Delivery.<br /> Nearly there!</p>',
						'<p class="IT_progress_complete">Woohoo! You did it! You\'ve qualified for free delivery!</p>',
					'</div>',
				'</div>'
			].join(''));
		}
		else{
			summary.appendTo('.right-off-canvas-menu .block-cart');
			actionsBottom.appendTo('.right-off-canvas-menu .block-cart');
			blockCart.append([
				'<div class="IT_free_delivery">',
					'<div>',
						'<div class="IT_progress_bar"><span></span></div>',
						'<div class="IT_progress_img"><img src="" /></div>',
						'<p class="IT_progress_price">You\'re only <span class="IT_price_left">£0.00</span> away from Free Delivery.<br /> Nearly there!</p>',
						'<p class="IT_progress_complete">Woohoo! You did it! You\'ve qualified for free delivery!</p>',
					'</div>',
				'</div>'
			].join(''));
		}

		var priceUpdate = $('.IT_price_left'),
			progressBar = $('.IT_progress_bar span'),
			priceWrap = $('.IT_progress_price'),
			completeWrap = $('.IT_progress_complete'),
			imgWrap = $('.IT_progress_img'),
			progBarWrap = $('.IT_progress_bar');

		var UCMoney = UCMoney || {};
		UCMoney.Money = UCMoney.Money || {};
		UCMoney.Money.Format = (function() {
		var currencySymbolMap = {
			'GBP': '£',
			'USD': '$',
			'EUR': '€'
		};

		/**
		 * @constructor
		 */
		function Format(num) {
			this.num = num;
		}

		/**
		 * Set currency string e.g. GBP
		 *
		 * @param {string}
		 */
		Format.prototype.setCurrency = function(currency) {
			this.currency = currency; 

			return this;
		}

		/**
		 * Format money with thousands separator and period
		 *
		 * @param {number} decimalPlaces
		 * @param {number} period
		 * @param {number} comma
		 * @return {number}
		 */
		Format.prototype.formatMoney = function(decimalPlaces, period, comma, withSymbol){
			var n = this.num, 
			c = isNaN(decimalPlaces = Math.abs(decimalPlaces)) ? 2 : decimalPlaces, 
			d = period == undefined ? "." : period, 
			t = comma == undefined ? "" : comma, 
			s = n < 0 ? "-" : "", 
			i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
			j = (j = i.length) > 3 ? j % 3 : 0;

			var result = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) 
			+ (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");

			if(withSymbol) {
			result = (typeof currencySymbolMap[this.currency] != 'undefined' ? currencySymbolMap[this.currency] : '') + result;
			}

			return result;
		};

		return Format;
		})();

		var priceNum = $('.block-cart .subtotal .price').text().replace('£', ''),
			parsePrice = parseFloat(priceNum),
			priceTillFree = 60;

		if($('.right-off-canvas-menu .block-cart .empty').length > 0){
			// If item doesn't exist in the cart set price to 0
			parsePrice = 0;
		}

		if(parsePrice < 60){
			// If the price of the sub total is less than 60, minus it from 60 and change text in basket progress bar
			priceTillFree = priceTillFree - parsePrice;
			var n = new UCMoney.Money.Format(priceTillFree);
			n.setCurrency('GBP');
			priceUpdate.text(n.formatMoney(2, '.', ',', true));
		}

		else{
			// Show woo hoo message
			completeWrap.show();
			priceWrap.hide();
			imgWrap.show();
			progBarWrap.hide();
		}

        var eventFire = false;

        if(eventFire === true){
    		$('.header-secondary a.link-bag').on('click', function(){
    		    if(eventFire === true){
        		    sendEvent('IT009v1', 'Clicked basket icon', '', true);
        		    eventFire = true;
    		    }
    			// When the basket icon is opened find percentage of price till free postage
    			//		Then apply that as a width to the progress bar (Doing this on click of basket allows for a nice animation showing the bar moving)
    			percentageNum = (parsePrice / 60) * 100;
    
    			progressBar.css('width', percentageNum + '%');
    		});
        }        

		

		$('#product-addtocart-button').on('click', function(){
		    
			// When the add to cart button is clicked
			if($('.switcher-field.switcher-size .switcher-label.selected')){
				// Check if a size is selected
				if($('.alert-box.success-msg').length == 0){
					// Check that the succes message is hidden
					
					UC.poller([
                        function() {
                            if ($('.alert-box.success-msg').length || $('.alert-box.error-msg').length) {
                                return true;
                            }
                        }
                    ], function() {
                        var successMsgExists = !!$('.alert-box.success-msg').length;
                        var errorMsgExists = !!$('.alert-box.error-msg').length;

						var summary = $('.right-off-canvas-menu .block-cart .summary'),
							actionsTop = $('.right-off-canvas-menu .block-cart .actions-top'),
							buttonBag = $('.right-off-canvas-menu .block-cart .summary + .actions .button.btn-bag'),
							actionsBottom = $('.right-off-canvas-menu .block-cart .actions'),
							cartSidebar = $('#cart-sidebar'),
							subTotalLabel = $('.right-off-canvas-menu .block-cart .subtotal .label'),
							blockCart = $('.right-off-canvas-menu .block-cart');
                    
                        if (successMsgExists) {
							// When the succes message exists
							if($('.right-off-canvas-menu .block-cart .actions-top').length > 0){
								buttonBag.hide();
								summary.insertBefore('.right-off-canvas-menu .block-cart .actions-top');
								subTotalLabel.text('Basket Sub-Total:');
								cartSidebar.before([
									'<div class="IT_free_delivery">',
										'<div>',
											'<div class="IT_progress_bar"><span></span></div>',
											'<div class="IT_progress_img"><img src="" /></div>',
											'<p class="IT_progress_price">You\'re only <span class="IT_price_left">£0.00</span> away from Free Delivery.<br /> Nearly there!</p>',
											'<p class="IT_progress_complete">Woohoo! You did it! You\'ve qualified for free delivery!</p>',
										'</div>',
									'</div>'
								].join(''));
							}
							else{
								summary.appendTo('.right-off-canvas-menu .block-cart');
								actionsBottom.appendTo('.right-off-canvas-menu .block-cart');
								blockCart.append([
									'<div class="IT_free_delivery">',
										'<div>',
											'<div class="IT_progress_bar"><span></span></div>',
											'<div class="IT_progress_img"><img src="" /></div>',
											'<p class="IT_progress_price">You\'re only <span class="IT_price_left">£0.00</span> away from Free Delivery.<br /> Nearly there!</p>',
											'<p class="IT_progress_complete">Woohoo! You did it! You\'ve qualified for free delivery!</p>',
										'</div>',
									'</div>'
								].join(''));
							}
							// Declare variables to the newly recretead markup
							var priceNum = $('.block-cart .subtotal .price').text().replace('£', ''),
								parsePrice = parseFloat(priceNum),
								priceTillFree = 60;

							var priceUpdate = $('.IT_price_left'),
								progressBar = $('.IT_progress_bar span'),
								priceWrap = $('.IT_progress_price'),
								completeWrap = $('.IT_progress_complete'),
								imgWrap = $('.IT_progress_img'),
								progBarWrap = $('.IT_progress_bar');
								
                            

							if(parsePrice < 60){
							    
								priceTillFree = priceTillFree - parsePrice;
								var n = new UCMoney.Money.Format(priceTillFree);
								n.setCurrency('GBP');
								priceUpdate.text(n.formatMoney(2, '.', ',', true));
								percentageNum = (parsePrice / 60) * 100;

								progressBar.css('width', percentageNum + '%');
							}

							else{
								completeWrap.show();
								priceWrap.hide();
								imgWrap.show();
								progBarWrap.hide();
							}
		                    sendEvent('IT009v1', 'Basket is visible', '', true);
                        } 
						else if (errorMsgExists) {
                        }
                    });
				}
			}
		});
	}
})();