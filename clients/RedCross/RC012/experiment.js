var _RC012 = (function() {

	// Plugins and Helpers
	/**
	 * UC Library - Poller
	 * @version 0.2.2
 	 */
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

	// Triggers
	var _triggers = (function() {
		UC.poller([
			'.course-search-container .course-search-form .form-course-type label',
			'.course-search-link p',
			function() { return window.jQuery; },
			function() { return window.ga; }
		], activate);
	})();

	// Experience code
	function activate() {
		var $ = window.jQuery;

		$('body').addClass('RC012');

		// Full Story Integration
		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'RC012',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });

		var $courseSearchDivs = $('.course-search-container');
		$courseSearchDivs.each(function() {
			// Hide form by default except for course type
			var $form = $(this).find('.course-search-form');
			var $courseType = $form.children('.form-course-type');
			$form
				.children()
				.not($courseType)
				.wrapAll('<div class="RC012_form-hidden"></div>');

			var $fullForm = $(this).find('.RC012_form-hidden');
			$fullForm.hide();

			// Show additional form options on click of course type div
			$courseType
				.one('click', function() {
					$fullForm.slideDown();
				});

			// Change course type label
			$courseType
				.children('label')
				.text('Select a course');

			// Swap search links around
			var $searchLinks = $(this).find('.course-search-link');
			$searchLinks
				.children('p:first')
				.appendTo($searchLinks);

			// Insert label before search links
			$searchLinks.before('<p class="RC012_search-label">Or try one of these options</p>');

			// Change course finder text
			$searchLinks
				.find('a:contains("Find the right course")')
				.text('Use our course finder');
		});
	}
})();