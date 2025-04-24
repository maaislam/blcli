var _ME112 = (function() {

	// -----------------------------------------------
	// Full story integration
	// -----------------------------------------------
/*	window.UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'ME112',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });*/

	var $ = jQuery;

	$('body').addClass('ME122');

	//change text, add logo back in.
	var originalText = $('.price.large .merchoid_price_framing:last')
	originalText.addClass('me122-text');
	var brandLogo = originalText.find('img').attr('src');

	var newText = $('<span class="me112-brandText"><b>100% genuine</b> <img src="'+brandLogo+'"/> merchandise</span>');
	newText.insertAfter(originalText);

})();