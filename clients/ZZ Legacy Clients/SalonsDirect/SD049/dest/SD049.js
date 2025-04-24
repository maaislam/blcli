var SD049 = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	var JQ = window.jQuery,
		trackerName;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'#product-options-wrapper',
			'.add-to-links .buymultibtn',
			'.product-options-bottom',
			'.product-options-bottom .add-to-cart',
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
				experiment_str: 'SD049',
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
			//sendEvent('TP017', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
			//sendEvent('TP017v2', 'Closed Trade Modal', '', true);	
		})();

		var cacheDom = (function() {
			//Cache useful selectors for later use
			var bodyVar = JQ('body'),
				optionsWrapper = JQ('#product-options-wrapper'),
				optionsBottom = JQ('.product-options-bottom');
			

			bodyVar.addClass('SD049');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				optionsWrapper: optionsWrapper,
				optionsBottom: optionsBottom
			};
		})();

		var markupChanges = {
			// Re order the DOM to match the design
			reorder: function(){
				cacheDom.optionsBottom.find('.add-to-links .buymultibtn').prependTo(cacheDom.optionsWrapper);
				cacheDom.optionsBottom.find('.add-to-cart').clone().insertAfter(cacheDom.optionsWrapper.find('dd.last .input-box select'));
			}
		};

		var hideElements = {
			// Hide some content thats no longer used
			originalElements: function(){
				cacheDom.optionsBottom.find('.or-multi').remove();
			}
		};

		var GATracking = {
			// Send events to GA on click
			multipleColorsButton: function(){
				JQ('.buymultibtn').on('click', function(){
					sendEvent('SD049', 'Clicked on Add Multiple Colors Button', '', true);	
				});
			}
		}

		// Hide elements 
		hideElements.originalElements();

		// Move markup around DOM
		markupChanges.reorder();

		// Bind GA events on click
		GATracking.multipleColorsButton();
	}	
})();