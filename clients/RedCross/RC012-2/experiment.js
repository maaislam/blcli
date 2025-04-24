var _RC012_2 = (function() {
	var data = {
		title: 'What type of course are you looking for?',
		publicDesc: 'Over 500 first aid courses to choose from for parents, grandparents, or the general public alike',
		workDesc: 'Become qualified in first aid for your workplace in accordance with regulations on over 200 courses'
	}

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
			'#main_0_homepagetopcomponents_0_ContainerDiv',
			function() { return window.jQuery; },
			function() { return window.ga.getAll; }
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
				variation_str: 'Variation 2'
			});
		}, { multiplier: 1.2, timeout: 0 });

		// Modify search boxes (as per variation 1)
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
				.on('click', function() {
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

		/* Create new course search boxes which will show the relevant form
		   when clicked */
		var $newSearchDivs_HTML = $([
			'<h2 class="RC012-2_title">' + data.title + '</h2>',
			'<div class="RC012-2_search-boxes">',
				'<div class="RC012-2_search-box">',
					'<div class="RC012-search-box-inner" id="RC012-2_public-search">',
						'<h2>Public first aid courses</h2>',
						'<p>' + data.publicDesc + '</p>',
						'<span>Search ></a>',
					'</div>',
				'</div>',
				'<div class="RC012-2_search-box">',
					'<div class="RC012-search-box-inner" id="RC012-2_work-search">',
						'<h2>Workplace first aid courses</h2>',
						'<p>' + data.workDesc + '</p>',
						'<span>Search ></a>',
					'</div>',
				'</div>',
			'</div>'
		].join(''));

		$courseSearchDivs.hide();

		var eventSent;
		var trackerName = window.ga.getAll()[0].get('name');
		var $boxContainer = $('#main_0_homepagetopcomponents_0_ContainerDiv');
		var $newSearchBoxes = $newSearchDivs_HTML.find('.RC012-search-box-inner');
		var animationRunning;

		var animateContainer = function(height) {
			$boxContainer.animate({
				'height': height + 'px'
			});
		};

		$newSearchBoxes.filter('#RC012-2_public-search').on('click', function() {
			var $el = $(this);
			
			/* If an animation is running or user clicked the same
			   box as before, do nothing */
			if (animationRunning || $el.hasClass('RC012_search-active')) {
				return false;
			}

			// set animationRunning to true to prevent other clicks
			animationRunning = true;

			$newSearchBoxes
				.not($el)
				.addClass('RC012_search-inactive')
				.removeClass('RC012_search-active');
				
			$el
				.removeClass('RC012_search-inactive')
				.addClass('RC012_search-active');

			$courseSearchDivs.find('.RC012_form-hidden').hide();

			var $incoming = $courseSearchDivs.first();
			var $outgoing = $courseSearchDivs.last();

			// Animate container in preparation
			animateContainer($incoming.outerHeight()); 
			
			// Position incoming div off the screen to the left
			$incoming.css({
				'position': 'absolute',
				'left': '-150%'
			});

			// Set outgoing div to absolute positioning
			$outgoing.css('position', 'absolute');

			// Show incoming if not already visible
			if ($incoming.css('display') === 'none') {
				$incoming.show();
			}

			// Animate outgoing div off the screen to the right 
			$outgoing.animate({
				left: '150%'
			}, 500, function() {
				// Set outgoing div to absolute to prevent divs stacking
				$outgoing.css('position', 'absolute');
			});
			
			// Animate incoming div into the screen from the left
			$incoming.animate({
				left: '0'
			}, 500, function() {
				// Set incoming div back to normal positioning
				$incoming.css('position', 'relative');
				// Set container back to auto height
				$boxContainer.css('height', 'auto');
				// Animation complete - set animationRunning to false to allow clicks again
				animationRunning = false;
			});
			
			if (!eventSent) {
				window.ga(trackerName + '.send', 'event', 'RC012', 'Click', 'RC012-V2-User clicked a course box', {nonInteraction: 1});
				eventSent = true;
			}
		});

		$newSearchBoxes.filter('#RC012-2_work-search').on('click', function() {
			var $el = $(this);

			/* If an animation is running or user clicked the same
			   box as before, do nothing */
			if (animationRunning || $el.hasClass('RC012_search-active')) {
				return false;
			}

			// set animationRunning to true to prevent other clicks
			animationRunning = true;

			$newSearchBoxes
				.not($el)
				.addClass('RC012_search-inactive')
				.removeClass('RC012_search-active');

			$el
				.removeClass('RC012_search-inactive')
				.addClass('RC012_search-active');

			$courseSearchDivs.find('.RC012_form-hidden').hide();

			var $incoming = $courseSearchDivs.last();
			var $outgoing = $courseSearchDivs.first();

			// Animate container in preparation
			animateContainer($incoming.outerHeight()); 

			// Position incoming div off the screen to the right
			$incoming.css({
				'position': 'absolute',
				'left': '150%'
			});

			// Set outgoing div to absolute positioning
			$outgoing.css('position', 'absolute');

			// Show incoming if not already visible
			if ($incoming.css('display') === 'none') {
				$incoming.show();
			}

			// Animate outgoing div off the screen to the left 
			$outgoing.animate({
				left: '-150%'
			}, 500, function() {
				// Set outgoing div to absolute to prevent divs stacking
				$outgoing.css('position', 'absolute');
			});
			
			// Animated incoming div into the screen from the left
			$incoming.animate({
				left: '0'
			}, 500, function() {
				// Set incoming div back to normal positioning
				$incoming.css('position', 'relative');
				// Set container back to auto height
				$boxContainer.css('height', 'auto');
				// Animation complete - set animationRunning to false to allow clicks again
				animationRunning = false;
			});

			if (!eventSent) {
				window.ga(trackerName + '.send', 'event', 'RC012', 'Click', 'RC012-V2-User clicked a course box', {nonInteraction: 1});
				eventSent = true;
			}
		});
		$newSearchDivs_HTML.insertBefore('#main_0_homepagetopcomponents_0_ContainerDiv');

		// Ripple effect on touch
		var isTouch = ('ontouchstart' in window);
		if (isTouch) {
			var ink, d, x, y;
			$('.RC012-search-box-inner').on('touchstart', function(e) {
				if (animationRunning) return false;
				var $el = $(this);
				if ($el.find('.RC012_ink').length === 0) {
					$el.prepend('<span class="RC012_ink"></span>');
				}

				ink = $el.find('.RC012_ink');
				ink.removeClass('RC012_animate');

				if (!ink.height() && !ink.width()) {
					d = Math.max($el.outerWidth(), $el.outerHeight());
					ink.css({ height: d, width: d });
				}
				
				x = (event.changedTouches[0].pageX) - $el.offset().left - ink.width()/2;
    			y = (event.changedTouches[0].pageY) - $el.offset().top - ink.height()/2;
     
				ink.css({ top: y + 'px', left: x + 'px' }).addClass('RC012_animate');
			});
		}

	}
})();