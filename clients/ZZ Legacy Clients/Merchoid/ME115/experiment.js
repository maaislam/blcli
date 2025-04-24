var ME115 = (function () {
	var UC = function (a) {
		return a.poller = function (a, b, c) {
			var d = {
					wait: 50,
					multiplier: 0,
					timeout: 6000
				},
				e = Date.now || function () {
					return (new Date).getTime();
				};
			if (c)
				for (var f in c) d[f] = c[f];
			else c = d;
			for (var g = !!d.timeout && new Date(e() + d.timeout), h = d.wait, i = d.multiplier, j = [], l = function (c, d) {
					if (g && e() > g) return !1;
					d = d || h,
						function () {
							var a = typeof c;
							return "function" === a ? c() : "string" !== a || document.querySelector(c)
						}() ? (j.push(!0), j.length === a.length && b()) : setTimeout(function () {
							l(c, d * i)
						}, d)
				}, m = 0; m < a.length; m++) l(a[m])
		}, a
	}(UC || {});

	var UCPoller = (function () {
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'#merchoid-scarcity-message',
			function () {
				if (window.jQuery) {
					return true;
				}
			}
		], init);
	})();



	function init() {
		if ($('#pa_size').val() === "") {
			$('.single_add_to_cart_button').addClass('disabled wc-variation-selection-needed');
		}
		var trackerName;
		var sendEvent = (function () {
			return function (category, action, label, nonInteractionValue, dimensionValue, dimensionName) {        
				var fire = function (tracker) {            
					var options = {};            
					options.nonInteraction = nonInteractionValue;            
					if (dimensionValue && dimensionName) {                
						options['dimension' + dimensionValue] = dimensionName;            
					}            
					window.ga(tracker + '.send', 'event', category, action, label, options);        
				};

				        
				if (trackerName) {            
					fire(trackerName);        
				} else {            
					UC.poller([                function () {                    
						return window.ga.getAll;                
					}            ], function () {                
						trackerName = window.ga.getAll()[0].get('name');                
						fire(trackerName);            
					});        
				}   
			}
			//sendEvent('CB080', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
			//sendEvent('CB080', 'Closed Trade Modal', '', true);	
		})();
		// Full Story Integration
		UC.poller([
			function () {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'ME115',
				variation_str: 'Variation 1'
			});
		}, {
			multiplier: 1.2,
			timeout: 0
		});

		$('body').addClass('ME115');

		//getCookie checks cookies to see if a match equal to the value passed in is true otherwise returns nothings
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

		var uc_ = {};
		uc_.now = Date.now || function () {
			return new Date().getTime();
		};

		uc_.throttle = function (func, wait, options) {
			var context, args, result;
			var timeout = null;
			var previous = 0;
			if (!options) options = {};
			var later = function () {
				previous = options.leading === false ? 0 : uc_.now();
				timeout = null;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			};
			return function () {
				var now = uc_.now();
				if (!previous && options.leading === false) previous = now;
				var remaining = wait - (now - previous);
				context = this;
				args = arguments;
				if (remaining <= 0 || remaining > wait) {
					if (timeout) {
						clearTimeout(timeout);
						timeout = null;
					}
					previous = now;
					result = func.apply(context, args);
					if (!timeout) context = args = null;
				} else if (!timeout && options.trailing !== false) {
					timeout = setTimeout(later, remaining);
				}
				return result;
			};
		};

		var sizeSelect = $('#pa_size'),
			sizeOptions = $('#pa_size option'),
			sizeOptionFirst = $('#pa_size option:first-child'),
			scarcityOriginal = $('#merchoid-scarcity-message'),
			cookieSize, inStock,  nextSize, prevSize, nextSizeInStock, prevSizeInStock;

		//remove current selected value which is currently based on stock
		sizeOptions.prop('selected', false);
		if (sizeSelect.length > 0) {
			scarcityOriginal.after([
				'<div class="ME115_scarcity">',
				'<p><strong>Limited Stock!</strong> Only 1 available for size <span class="ME115_cookie_size"></span></p>',
				'</div>',
			].join(''));

			$('.product-usps').append([
				'<div class="ME115_scarcity_mobile">',
				'<p><strong>Limited Stock!</strong> Only 1 available for size <span class="ME115_cookie_size"></span></p>',
				'</div>',
			].join(''));
		} else {
			$('body').addClass('ME115-original-scarcity');
		}


		// Check the position of the element in relation to the screen

		function scrolledBelow(elem) {
			var docViewTop = $(window).scrollTop();
			var docViewBottom = docViewTop + $(window).height();

			var elemTop = $(elem).offset().top;
			var elemBottom = elemTop + $(elem).height();

			return ((docViewTop >= elemTop));
		}

		function scrolledBack(elem) {
			var docViewTop = $(window).scrollTop();
			var docViewBottom = docViewTop + $(window).height();

			var elemTop = $(elem).offset().top;
			var elemBottom = elemTop + $(elem).height();

			return (docViewTop <= elemTop);
		}

		var fired = false,
			elBelow = false;

		var scrollEl = $('.product .images');

		var hasScrolledBelow = false,
			hasScrolledBack = false;

		// Check if the user has scrolled below the bottom of the image, then scrolled the top of the image back into view
		$(window).scroll(uc_.throttle(function () {
			if (hasScrolledBelow) {
				if (hasScrolledBack) {
					return false;
				} else if (scrolledBack(scrollEl)) {
					hasScrolledBack = true;
					if (sizeSelect.length > 0) {
						fireScarcity();
						sendEvent('ME115', 'Scarcity shown', '', true);

					} else {
						scarcityOriginal.addClass('popoutAnim2');
					}
				}
			} else if (scrolledBelow(scrollEl)) {
				hasScrolledBelow = true;
			}
		}, 100));


		// Below is the ME106 test wrapped in a function so it will fire once the user scrolls back into view of the image

		function fireScarcity() {
			var scarcity = $('.ME115_scarcity'),
				mobileScarcity = $('.ME115_scarcity_mobile');
			scarSizeText = $('.ME115_cookie_size');

			if (!!$.cookie('ME115_size')) {
				//if the cookie 'size' exists
				cookieSize = getCookie('ME115_size').toLowerCase();
				var obj = $.parseJSON($('[data-product_variations]').attr('data-product_variations'));


				switch (true) {            
					case cookieSize == 'xxxs':
						                nextSize = 'xxs';                
						break;

						            
					case cookieSize == 'xxs':
						                nextSize = 'xs';                
						prevSize = 'xxxs';                
						break;

						            
					case cookieSize == 'xs':
						                nextSize = 's';                
						prevSize = 'xxs';                
						break;

						            
					case cookieSize == 's':
						                nextSize = 'm';                
						prevSize = 's';                
						break;

						            
					case cookieSize == 'm':
						                prevSize = 's';                
						nextSize = 'l';                
						break;

						            
					case cookieSize == 'l':
						                prevSize = 'm';                
						nextSize = 'xl';                
						break;

						            
					case cookieSize == 'xl':
						                prevSize = 'l';                
						nextSize = 'xxl';                
						break;

						            
					case cookieSize == 'xxl':
						                prevSize = 'xl';                
						nextSize = 'xxxl';                
						break;

						            
					case cookieSize == 'xxxl':
						                prevSize = 'xxl';                
						break;        
				}

				for (i = 0; i < obj.length;) {            
					var currentObj = obj[i];

					            
					/* 
						            check if the next and prev sizes are in stock
						            if so set variable to true for future use
						            this has to be done seperate and before the actual loop because the attribute_pa_size are not in order
						            this means that in order you can have m,xl,s,xxl,l or any combination of the 5
						            it can then adjust to a larger size then a smaller or as a last resort set it to choose a size
						            */

					            
					if (currentObj.attributes.attribute_pa_size.toLowerCase() == prevSize) {                
						if (currentObj.is_in_stock) {                    
							prevSizeInStock = true;                
						}            
					} else if (obj[i].attributes.attribute_pa_size.toLowerCase() == nextSize) {                
						if (currentObj.is_in_stock) {                    
							nextSizeInStock = true;                
						}            
					}            
					i++;        
				}

				for (i = 0; i < obj.length;) {
					var currentObj = obj[i];
					//for each object inside obj which is equal to the available sizes



					if (currentObj.attributes.attribute_pa_size.toLowerCase() == cookieSize) {
						if (currentObj.is_in_stock === true) {
							inStock = true;
							//if its in stock find the relevant option in the sizing select and set it to selected
							sizeOptions.each(function () {
								var el = $(this),
									thisVal = el.val();

								if (thisVal == cookieSize) {
									el.prop('selected', 'selected');
								}
							});
							scarSizeText.html(cookieSize.toUpperCase());
							setTimeout(function () {
								scarcity.addClass('popoutAnim');
								mobileScarcity.addClass('popoutAnim').parent().addClass('ME_active');
							}, 1000);

						} else {
							//if none of the sizes are in stock based on the cookie size set the option to choose a size
							 
							if (nextSizeInStock == true) {                        
								/*
									                        if the original size is out of stock, check if the size up is in stock
									                        if so find relevant option and set to selected
									                        */
								                        
								sizeOptions.each(function () {                            
									var el = $(this),
										                                thisVal = el.val();

									                            
									if (thisVal == nextSize) {                                
										el.prop('selected', 'selected');                            
									}                        
								});                        
								scarSizeText.html(nextSize.toUpperCase());                        
								setTimeout(function () {                            
									scarcity.addClass('popoutAnim');
									mobileScarcity.addClass('popoutAnim').parent().addClass('ME_active');                        
								}, 1000);                    
							} else if (prevSizeInStock == true) {                        
								/*
									                        if the next size is out of stock also, check if the size down is in stock
									                        if so find relevant option and set to selected
									                        */
								                        
								sizeOptions.each(function () {                            
									var el = $(this),
										                                thisVal = el.val();

									                            
									if (thisVal == prevSize) {                                
										el.prop('selected', 'selected');                            
									}                        
								});                        
								scarSizeText.html(prevSize.toUpperCase());                        
								setTimeout(function () {                            
									scarcity.addClass('popoutAnim');
									mobileScarcity.addClass('popoutAnim').parent().addClass('ME_active');                        
								}, 1000);                    
							} else {                         //if none of the sizes are in stock based on the cookie size set the option to choose a size
								                        
								sizeOptionFirst.prop('selected', 'selected');
								scarcityOriginal.addClass('popoutAnim');
								mobileScarcity.addClass('popoutAnim').parent().addClass('ME_active');                    
							}
						}
					}
					i++;
				}

				/*
				On the size select change check if the option is the stored size or its adjacent sizes
				if so show scarcity otherwise hide it
				*/

				sizeSelect.on('change', function () {
					var el = $(this),
						optionChosen = el.find('option:selected'),
						optionVal = optionChosen.val();

					if (optionVal.toLowerCase() == cookieSize && inStock === true) {
						scarcity.addClass('popoutAnim');
						mobileScarcity.addClass('popoutAnim').parent().addClass('ME_active');
						scarSizeText.html(cookieSize.toUpperCase());
					} else if (optionVal.toLowerCase() == nextSize && nextSizeInStock == true) {                
						scarcity.addClass('popoutAnim');
						mobileScarcity.addClass('popoutAnim').parent().addClass('ME_active');                
						scarSizeText.html(nextSize.toUpperCase());            
					} else if (optionVal.toLowerCase() == prevSize && prevSizeInStock == true) {                
						scarcity.addClass('popoutAnim');
						mobileScarcity.addClass('popoutAnim').parent().addClass('ME_active');                
						scarSizeText.html(prevSize.toUpperCase());
					} else {
						scarcity.fadeOut(function () {
							scarcity.removeClass('popoutAnim');
							mobileScarcity.removeClass('popoutAnim').parent().removeClass('ME_active');
						});
					}
				});
			} else {
				$('#merchoid-scarcity-message').after([
					'<div class="ME115_sizing_bubble">',
					'<p>',
					'We\'re running low on stock on selected sizes,<br /> please select your size below to see availability.',
					'</p>',
					'<a href="#" class="ME115_close">X</a>',
					'</div>'
				].join(''));

				var bubbleMsg = $('.ME115_sizing_bubble');

				//since the cookie doesn't exist show the select size bubble
				bubbleMsg.addClass('popoutAnim2').delay(8000).queue(function () {
					$(this).fadeOut('slow').dequeue();
				});

				bubbleMsg.find('.ME115_close').on('click', function (e) {
					e.preventDefault();

					bubbleMsg.clearQueue().dequeue().fadeOut();
				});

				//change option to the choose an option since its not always default
				sizeOptionFirst.attr('selected', 'selected');

				/*
				on select change check if the size cookie exists,
				if so run through the scarcity size check
				otherwise create the cookie and set adjacent sizes to the stored size
				*/

				sizeSelect.on('change', function () {
					var el = $(this),
						optionChosen = el.find('option:selected'),
						optionVal = optionChosen.val();

					if (bubbleMsg.hasClass('popoutAnim2')) {
						bubbleMsg.fadeOut('slow').dequeue();
					}

					if (!!$.cookie('ME115_size')) {
						if (optionVal.toLowerCase() == cookieSize && inStock === true) {
							scarcity.addClass('popoutAnim');
							mobileScarcity.addClass('popoutAnim').parent().addClass('ME_active'); 
						} else if (optionVal.toLowerCase() == nextSize && nextSizeInStock == true) {                    
							scarcity.addClass('popoutAnim');
							mobileScarcity.addClass('popoutAnim').parent().addClass('ME_active');                    
							scarSizeText.html(nextSize.toUpperCase());                
						} else if (optionVal.toLowerCase() == prevSize && prevSizeInStock == true) {                    
							scarcity.addClass('popoutAnim');
							mobileScarcity.addClass('popoutAnim').parent().addClass('ME_active');                    
							scarSizeText.html(prevSize.toUpperCase());                
						} else {
							scarcity.fadeOut(function () {
								scarcity.removeClass('popoutAnim');
								mobileScarcity.removeClass('popoutAnim').parent().removeClass('ME_active');
							});
						}
					} else {
						if (el == sizeOptionFirst) {} else {
							var obj = $.parseJSON($('[data-product_variations]').attr('data-product_variations'));
							$.cookie("ME115_size", optionVal, {
								expires: 1000,
								path: '/'
							});
							cookieSize = getCookie('ME115_size').toLowerCase();

							switch (true) {                        
								case cookieSize == 'xxxs':
									                            nextSize = 'xxs';                            
									break;

									                        
								case cookieSize == 'xxs':
									                            nextSize = 'xs';                            
									prevSize = 'xxxs';                            
									break;

									                        
								case cookieSize == 'xs':
									                            nextSize = 's';                            
									prevSize = 'xxs';                            
									break;

									                        
								case cookieSize == 's':
									                            nextSize = 'm';                            
									prevSize = 's';                            
									break;

									                        
								case cookieSize == 'm':
									                            prevSize = 's';                            
									nextSize = 'l';                            
									break;

									                        
								case cookieSize == 'l':
									                            prevSize = 'm';                            
									nextSize = 'xl';                            
									break;

									                        
								case cookieSize == 'xl':
									                            prevSize = 'l';                            
									nextSize = 'xxl';                            
									break;

									                        
								case cookieSize == 'xxl':
									                            prevSize = 'xl';                            
									nextSize = 'xxxl';                            
									break;

									                        
								case cookieSize == 'xxxl':
									                            prevSize = 'xxl';                            
									break;                    
							}

							for (i = 0; i < obj.length;) {                        
								var currentObj = obj[i];                        
								if (currentObj.attributes.attribute_pa_size.toLowerCase() == prevSize) {                            
									if (currentObj.is_in_stock) {                                
										prevSizeInStock = true;                            
									}                        
								} else if (obj[i + 1]) {                            
									if (obj[i].attributes.attribute_pa_size.toLowerCase() == nextSize) {                                
										if (currentObj.is_in_stock) {                                    
											nextSizeInStock = true;                                
										}                            
									}                        
								}                        
								i++;                    
							}

							for (i = 0; i < obj.length;) {
								var currentObj = obj[i];
								//for each object inside obj which is equal to the available sizes

								if (currentObj.attributes.attribute_pa_size.toLowerCase() == cookieSize) {
									if (currentObj.is_in_stock === true) {
										inStock = true;
										scarcity.addClass('popoutAnim');
										mobileScarcity.addClass('popoutAnim').parent().addClass('ME_active');
										scarSizeText.html(cookieSize.toUpperCase());
									} else {
										scarcityOriginal.addClass('popoutAnim');
									}
								}
								i++;
							}
						}
					}
				});
			}
		}
	};
})();