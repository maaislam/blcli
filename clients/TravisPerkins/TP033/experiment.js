var _TP033 = (function($) {
	// PLUGINS & HELPER FUNCTIONS
	// UC Library - Poller -- @version 0.2.2
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

	// Full Story Tagging
	UC.poller([
		function() {
			var fs = window.FS;
			if (fs && fs.setUserVars) return true;
		}
	], function () {
		window.FS.setUserVars({
			experiment_str: 'TP033',
			variation_str: 'Variation 1 Desktop'
		});
	}, { multiplier: 1.2, timeout: 0 });


	// ACTIVATION LOGIC
	var _triggers = (function() {
		UC.poller([
			'#addToCartForm .tpQ_button',
			function() { return window.jQuery; },
            function() { return window.ga; }
		], activate);
	})();


	// ACTIVATION LOGIC
	function activate() {
		var $ = window.jQuery;
		$('body').addClass('TP033');

		var productOver50 = (function() {
			var price = parseFloat($('.price_value').text().trim().replace(/[£$€]/g, ''));
			if (price > 50) {
				return true;
			} else {
				return false;
			}
		})();

		var $form = $('#addToCartForm');
		var $deliveryBtn = $form.find('.tpQ_button');

		$deliveryBtn.wrap('<div class="TP033_wrap"></div>');

		var $wrap = $('.TP033_wrap');
		var $content = $('<div class="TP033_content"></div>');

		if (productOver50) {
			$content.append('<span class="TP033_del-msg">FREE UK Delivery on this product</span>');
		}

		$content.append('<span>Your local branch will call you and arrange a time slot that suits you to deliver your product.<div><a class="TP033_terms" href="/delivery" target="_blank">Read delivery terms</a></div></span>');
		
		$wrap.append($content);

		var $changePostcode = $('.change-postcode:contains("Change delivery postcode")');
		if ($changePostcode.length) {
			$changePostcode.insertAfter('#addToCartButton');
		}

	}

})($);
