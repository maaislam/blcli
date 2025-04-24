var ME119 = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	var JQ = window.jQuery,
		trackerName,
		slideQ = false,
		tglEvent = false;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'.category-info',
			'.category-page',
			'.category-filtering',
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
				experiment_str: 'ME119',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });

		var cacheDom = (function() {
			//Cache useful selectors for later use
			var bodyVar = JQ('body'),
				URL = window.location.href;

			// Category wrap
			var categoryWrap = JQ('.products-listing .products'),
				sortByWrap = JQ('.category-page .category-info'),
				tglWrap;

			bodyVar.addClass('ME119');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				URL: URL,
				categoryWrap: categoryWrap,
				sortByWrap: sortByWrap,
				tglWrap: tglWrap
			};
		})();

		var productLoop = {
			addClearClass: function(){
				var i = 0;
				// Add generic class to target for loop
				cacheDom.categoryWrap.find('li.product-small.merchoid-limited').addClass('ME119_product-limited');
				cacheDom.categoryWrap.find('li.product-small.merchoid-exclusive').addClass('ME119_product-limited');

				// Loop through to clear floats so the grid doesnt break on toggle
				cacheDom.categoryWrap.find('li.ME119_product-limited').each(function(){
					var el = JQ(this);
					if(i == 2){
						el.addClass('ME119_clear');
						i = 1;
					}
					else{
						i++;
					}
				});
			}
		}

		var limitedToggle = {
			contentBuilder: function(){
				// Append the toggle markup
				cacheDom.sortByWrap.append([
					'<div class="ME119_limited-wrap ME119_left">',
						'<span class="ME119_all-btn">All</span>',
						'<a href="#" class="ME119_limited-tgl"><span></span></a>',
						'<span class="ME119_limited-btn">Limited and exclusive</span>',
					'</div>'
				].join(''));

				// Cache the wrap elector 
				cacheDom.tglWrap = JQ('.ME119_limited-wrap');
			}
		}

		var elementBindings = {
			// Click function for the mobile tab variation to show the hidden options
			limitedToggle: function(){
				cacheDom.tglWrap.find('.ME119_limited-tgl').on('click', function(e){
					e.preventDefault();
					// If the wrap has left class, change it to right and add bodyclass
					if(slideQ === false){
						slideQ = true;
						var el = JQ(this),
							elWrap = el.closest('.ME119_limited-wrap');

						if(elWrap.hasClass('ME119_left')){
							elWrap.addClass('ME119_right').removeClass('ME119_left');
							cacheDom.bodyVar.addClass('ME119_toggle');
						}
						else{
							elWrap.addClass('ME119_left').removeClass('ME119_right');
							cacheDom.bodyVar.removeClass('ME119_toggle');
						}

						setTimeout(function(){ 	
							slideQ = false;
						}, 300);

						if(tglEvent === false){
							sendEvent('ME119', 'User clicked Toggle', 'Toggled limited items', true);
							tglEvent = true;
						}
					}
				});
			},
			allBtnClick: function(){
				cacheDom.tglWrap.find('.ME119_all-btn').on('click', function(){
					// If wrap has left class, do nothing otherwise toggle limited items
					if(slideQ === false){
						slideQ = true;
						var el = JQ(this),
							elWrap = el.closest('.ME119_limited-wrap');

						if(elWrap.hasClass('ME119_left')){
							slideQ = false;
						}
						else{
							elWrap.addClass('ME119_left').removeClass('ME119_right');
							cacheDom.bodyVar.removeClass('ME119_toggle');

							setTimeout(function(){ 
								slideQ = false;
							}, 300);
						}
					}
				});
			},
			limitedBtnClick: function(){
				cacheDom.tglWrap.find('.ME119_limited-btn').on('click', function(){
					// If wrap has right class, toggle limited items otherwise do nothing
					if(slideQ === false){
						slideQ = true;
						var el = JQ(this),
							elWrap = el.closest('.ME119_limited-wrap');

						if(elWrap.hasClass('ME119_right')){
							slideQ = false;
						}
						else{
							elWrap.addClass('ME119_right').removeClass('ME119_left');
							cacheDom.bodyVar.addClass('ME119_toggle');
							
							if(tglEvent === false){
								sendEvent('ME119', 'User clicked Toggle', 'Toggled limited items', true);
								tglEvent = true;
							}

							setTimeout(function(){ 
								slideQ = false;
							}, 300);
						}
					}
				});
			}
		};

		// Create toggle
		limitedToggle.contentBuilder();

		// Tinker with limited products for toggle
		productLoop.addClearClass();

		// Bind click function
		elementBindings.limitedToggle();
		elementBindings.allBtnClick();
		elementBindings.limitedBtnClick();


		// GA function
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
			//sendEvent('TP017', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
			//sendEvent('TP017v2', 'Closed Trade Modal', '', true);	
		})();
	}
})();