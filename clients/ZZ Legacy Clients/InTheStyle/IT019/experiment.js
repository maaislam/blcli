var IT019 = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	var JQ = window.jQuery,
		trackerName;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		UC.poller([
			'.cart .page-title h1',
			'#shopping-cart-totals-table tbody',
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
				experiment_str: 'IT019',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });

		var cacheDom = (function() {
			//Cache useful selectors for later use
			var bodyVar = JQ('body');

			// Messaging placement DOM Cache
			var pageTitle = JQ('.cart .page-title h1'),
				deliveryBlock = JQ('#shopping-cart-totals-table > tbody');

			bodyVar.addClass('IT019');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				deliveryBlock: deliveryBlock,
				pageTitle: pageTitle
			};
		})();

		var basketMessaging = {
			// Create Markup for messages
			contentBuilder: function(){
				cacheDom.pageTitle.after('<div class="IT019-title_message">Babe, we\'ve got your back with fast, reliable delivery</div>');
				cacheDom.deliveryBlock.append('<tr class="IT019-title_message"><td colspan="2">Not at home in the day? Select a convenient delivery address in the checkout - sorted</td></tr>');
			}
		};

		// Create messages
		basketMessaging.contentBuilder();
	}
})();