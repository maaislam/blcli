var IT035V2 = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	var JQ = window.jQuery,
		slideQ = false,
		trackerName;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'#product-addtocart-button',
			function () {
				if (window.jQuery) {
					return true;
				}
			}
		], init);
	})();
	
    function init(){
		// UC.poller([
		// 	function() {
		// 		var fs = window.FS;
		// 		if (fs && fs.setUserVars) return true;
		// 	}
		// ], function () {
		// 	window.FS.setUserVars({
		// 		experiment_str: 'IT035V2',
		// 		variation_str: 'Variation 1'
		// 	});
		// }, { multiplier: 1.2, timeout: 0 });

		var sendEvent = (function() {
			return function (category, action, label, nonInteractionValue, dimensionValue, dimensionName) {
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
		        } else {
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
			//sendEvent('IT035V2', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
			//sendEvent('IT035V2', 'Closed Trade Modal', '', true);	
		})();

		var cacheDom = (function() {
			//Cache useful selectors for later use
			var bodyVar = JQ('body'),
				URL = window.location.href;

			var basketBtn = JQ('#product-addtocart-button'),
				sizeSelector = JQ('.product-options .switcher-field'),
				canvasVar = JQ('.off-canvas-wrap'),
				modal;

			bodyVar.addClass('IT035V2 IT035_basket-cancel');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				URL: URL,
				basketBtn: basketBtn,
				sizeSelector: sizeSelector,
				canvasVar: canvasVar,
				modal: modal
			};
		})();

		var modalMarkup = {
			contentBuilder: function(){
			cacheDom.bodyVar.append([
				'<div class="IT035_pop-up_modal">',
					'<div>',
					'<a href="#" class="IT035_close_btn">X</a>',
					'<div class="IT035_overflow_fix">',
						'<h2><span class="IT035_tick-ico"></span> Thanks babe! We\'ve<br /> added this to your<br /> bag</h2>',
						'<a href="/checkout/cart" class="IT035_checkout-show">Checkout</a>',
						'<a href="#" class="IT035_continue-shopping">Continue Shopping</a>',
					'</div>',
					'</div>',
				'</div>'
			].join(''));

		 	cacheDom.modal = JQ(".IT035_pop-up_modal");
			}
		}

		var elementBindings = {
			// Click function for the when the user buys an item
			addToBasketClick: function(){
				cacheDom.basketBtn.on('click', function(){
					if(cacheDom.sizeSelector.find('label.selected').length > 0){
						sendEvent('IT035V2', 'Added item to basket', '', true);	
						
						UC.poller([
							'.off-canvas-wrap.move-left',
						], function(){
							cacheDom.canvasVar.removeClass('move-left');
						});

						cacheDom.modal.fadeIn("slow", function () {
							cacheDom.modal.addClass("active");
							slideQ = false;
						});

						cacheDom.bodyVar.on("mousedown", function (e) {
							if (!JQ(e.target).closest(".IT035_pop-up_modal > div").length) {
								if (cacheDom.modal.hasClass("active")) {
									cacheDom.modal.fadeOut("slow", function () {
										cacheDom.modal.removeClass("active");
										cacheDom.bodyVar.off("mousedown");
										slideQ = false;
									});
								}
							}
						});
					}
				});
			},
			// When user clicks on basket icon remove the body class that prevents it showing
			basketToggleClick: function(){
				JQ('.exit-off-canvas, .mobile-bag').on('click', function(){
					if(cacheDom.bodyVar.hasClass('IT035_basket-cancel')){
						cacheDom.bodyVar.removeClass('IT035_basket-cancel');
					}
					else{
						cacheDom.bodyVar.addClass('IT035_basket-cancel');
					}
				});
			},
			modalOpen: function () {
				JQ(".IT035_open_modal,.IT035_pop-up_modal .IT035_close_btn, .IT035_continue-shopping").on("click", function (e) {
					e.preventDefault();

					if (slideQ === false) {
						slideQ = true;

						if (cacheDom.modal.hasClass("active")) {
							if(JQ(this).hasClass('IT035_close_btn')){
								sendEvent('IT035V2', 'Closed modal by clicking close button', '', true);
							}
							cacheDom.modal.fadeOut("slow", function () {
								cacheDom.modal.removeClass("active");
								cacheDom.bodyVar.off("mousedown");
								slideQ = false;
							});
						} else {
							cacheDom.modal.fadeIn("slow", function () {
								cacheDom.modal.addClass("active");
								slideQ = false;
							});

							cacheDom.bodyVar.on("mousedown", function (e) {
								if (!JQ(e.target).closest(".IT035_pop-up_modal > div").length) {
									if (cacheDom.modal.hasClass("active")) {
										sendEvent('IT035V2', 'Closed modal by clicking outside of the modal', '', true);
										cacheDom.modal.fadeOut("slow", function () {
											cacheDom.modal.removeClass("active");
											cacheDom.bodyVar.off("mousedown");
											slideQ = false;
										});
									}
								}
							});
						}
					}
				});
			},
			GAEventClicks: function(){
				JQ('.IT035_continue-shopping').on('click', function(e){
					e.preventDefault();
					sendEvent('IT035V2', 'Clicked "Continue Shopping" button', '', true);
				});

				JQ('.IT035_checkout-show').on('click', function(){
					sendEvent('IT035V2', 'Clicked "Checkout" button', '', true);
				});
			}
			// showMiniBasket: function(){
			// 	cacheDom.modal.find('.IT035_checkout-show').on('click', function(e){
			// 		e.preventDefault();

			// 		cacheDom.modal.fadeOut("slow", function () {
			// 			cacheDom.modal.removeClass("active");
			// 			cacheDom.bodyVar.off("mousedown");
			// 			slideQ = false;
			// 		});

			// 		cacheDom.bodyVar.removeClass('IT035_basket-cancel');
			// 		cacheDom.canvasVar.addClass('move-left')
			// 	});
			// }
		};

		var backButtonEvent = {
			// When the user presses the back button, cancel the action, send an Event to GA then restart the action
			backButtonClicked: function(){
				if (window.history && window.history.pushState) {
					window.history.pushState('', null, '');
					JQ(window).on('popstate', function() {
						sendEvent('IT035V2', 'Clicked back button', '', true);	
 						window.history.back();
					});
				}
			}
		}


		// Create Modal markup
		modalMarkup.contentBuilder();

		// Bind back button click
		backButtonEvent.backButtonClicked();

		// Bind click functions
		elementBindings.addToBasketClick();
		elementBindings.basketToggleClick();
		elementBindings.modalOpen();
	}	
})();