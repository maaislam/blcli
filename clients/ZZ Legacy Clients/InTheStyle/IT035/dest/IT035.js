var IT035V1 = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	var JQ = window.jQuery,
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
		// 		experiment_str: 'IT035V1',
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
			//sendEvent('IT035V1', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
			//sendEvent('IT035V1', 'Closed Trade Modal', '', true);	
		})();

		var cacheDom = (function() {
			//Cache useful selectors for later use
			var bodyVar = JQ('body'),
				URL = window.location.href;

			var basketBtn = JQ('#product-addtocart-button'),
				sizeSelector = JQ('.product-options .switcher-field'),
				canvasVar = JQ('.off-canvas-wrap'),
				basketMsg;

			bodyVar.addClass('IT035V1 IT035_basket-cancel');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				URL: URL,
				basketBtn: basketBtn,
				basketMsg: basketMsg,
				sizeSelector: sizeSelector,
				canvasVar: canvasVar
			};
		})();

		var addToBag = {
			contentBuilder: function(){
				cacheDom.bodyVar.append([
					'<div class="IT035_bag-notification">',
						'<span class="IT035_tick-ico"></span>',
						'<span class="IT035_bag-content">This item has been added to your bag</span>',
						'<a href="#" class="IT035_bag-close">x</a>',
					'</div>'
				].join(''));

				cacheDom.basketMsg = JQ('.IT035_bag-notification');
			}
		}

		var elementBindings = {
			// Click function for the when the user buys an item
			addToBasketClick: function(){
				cacheDom.basketBtn.on('click', function(){
					if(cacheDom.sizeSelector.find('label.selected').length > 0){
						sendEvent('IT035V1', 'Added item to basket', '', true);	
						
						UC.poller([
							'.off-canvas-wrap.move-left',
						], function(){
							cacheDom.canvasVar.removeClass('move-left');
						});

						cacheDom.basketMsg.fadeIn().delay(3000).queue(function () {
							sendEvent('IT035V1', 'Add to bag notification shown', '', true);	
							cacheDom.basketMsg.fadeOut('slow').dequeue();
						});
					}
				});
			},
			basketMsgClose: function(){
				cacheDom.basketMsg.find('.IT035_bag-close').on('click', function(e){
					e.preventDefault();
					cacheDom.basketMsg.stop().fadeOut('slow');
				});
			},
			basketToggleClick: function(){
				JQ('.exit-off-canvas, .mobile-bag').on('click', function(){
					if(cacheDom.bodyVar.hasClass('IT035_basket-cancel')){
						cacheDom.bodyVar.removeClass('IT035_basket-cancel');
					}
					else{
						cacheDom.bodyVar.addClass('IT035_basket-cancel');
					}
				});
			}
		};

		var backButtonEvent = {
			// When the user presses the back button, cancel the action, send an Event to GA then restart the action
			backButtonClicked: function(){
				if (window.history && window.history.pushState) {
					window.history.pushState('', null, '');
					JQ(window).on('popstate', function() {
						sendEvent('IT035V1', 'Clicked back button', '', true);	
 						window.history.back();
					});
				}
			}
		}

		// Create markup for message
		addToBag.contentBuilder();

		// Bind back button click
		backButtonEvent.backButtonClicked();

		// Bind basket click
		elementBindings.addToBasketClick();
		elementBindings.basketMsgClose();
		elementBindings.basketToggleClick();
	}	
})();