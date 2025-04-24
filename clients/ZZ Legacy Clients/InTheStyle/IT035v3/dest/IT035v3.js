var IT035V3 = (function() {
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
		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'IT035V3',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });

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
			//sendEvent('IT035V3', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
			//sendEvent('IT035V3', 'Closed Trade Modal', '', true);	
		})();

		var cacheDom = (function() {
			//Cache useful selectors for later use
			var bodyVar = JQ('body'),
				URL = window.location.href;

			var basketBtn = JQ('#product-addtocart-button'),
				sizeSelector = JQ('.product-options .switcher-field'),
				canvasVar = JQ('.off-canvas-wrap');

			bodyVar.addClass('IT035V3');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				URL: URL,
				basketBtn: basketBtn,
				sizeSelector: sizeSelector,
				canvasVar: canvasVar,
			};
		})();

		var closePopOutBasket = {
			// Append mini basket close button to the wrap 
			contentBuilder: function(){
				JQ('.right-off-canvas-menu').append('<a href="#" class="IT035_checkout-close"></a>');
			},
			// Replicate the close of the mini basket on click of the new button
			closeBasket: function(){
				JQ('.IT035_checkout-close').on('click', function(e){
					e.preventDefault();
					cacheDom.canvasVar.removeClass('move-left');
					sendEvent('IT035V3', 'Clicked grey mini basket close section', '', true);	
				});
			}
		}

		var elementBindings = {
			// GA Event clicks
			GAEventClicks: function(){
				JQ('.IT035_continue-shopping').on('click', function(e){
					e.preventDefault();
					sendEvent('IT035V3', 'Clicked "Continue Shopping" button', '', true);
				});

				JQ('.IT035_checkout-show').on('click', function(){
					sendEvent('IT035V3', 'Clicked "Checkout" button', '', true);
				});
			}
		};

		var backButtonEvent = {
			// When the user presses the back button, cancel the action, send an Event to GA then restart the action
			backButtonClicked: function(){
				if (window.history && window.history.pushState) {
					window.history.pushState('', null, '');
					JQ(window).on('popstate', function() {
						sendEvent('IT035V3', 'Clicked back button', '', true);	
 						window.history.back();
					});
				}
			}
		}

		// Create markup for close button
		closePopOutBasket.contentBuilder();
		closePopOutBasket.closeBasket();

		// Bind back button click
		backButtonEvent.backButtonClicked();

		// Bind click functions
		elementBindings.GAEventClicks();
	}	
})();