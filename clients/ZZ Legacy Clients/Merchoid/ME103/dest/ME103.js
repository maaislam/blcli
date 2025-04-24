var _ME103 = (function ($) {

	// Full Story Integration
	if (window.UC && window.UC.poller) {
		window.UC.poller([
<<<<<<< HEAD
		function() {
			var fs = window.FS;
			if (fs && fs.setUserVars) return true;
		}
		], function () {
		window.FS.setUserVars({
			experiment_str: 'ME103',
			variation_str: 'Variation 1'
		});
		}, { multiplier: 1.2, timeout: 0 });
  	}
=======
			function () {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'ME103',
				variation_str: 'Variation 1'
			});
		}, {
			multiplier: 1.2,
			timeout: 0
		});
	}

>>>>>>> 4523776113c042b7133d73d3ab9341eb1b25b45d

	$('body').addClass('ME103');

	var productInfo = $('.product');

	var data = (function () {
		var obj = {};
		switch (true) {
<<<<<<< HEAD
			case productInfo.hasClass('pa_brand-marvel'):
				obj.brand = 'Marvel';
				obj.logo = "https://logorealm.com/wp-content/uploads/2016/07/Marvel-Logo.png";
				break;
			case productInfo.hasClass('pa_brand-nintendo-original'):
				obj.brand = 'Zelda';
				obj.logo = "https://seeklogo.com/images/T/the-legend-of-zelda-hyrulian-crest-logo-0EE3FC3E0B-seeklogo.com.gif";
				break;
			case productInfo.hasClass('pa_brand-dc'):
				obj.brand = 'DC';
				obj.logo = "https://";
				break;
=======

			case productInfo.hasClass('pa_brand-nintendo-legend-of-zelda'):
				//obj.brand = 'Zelda';
				obj.brand = 'Nintendo';
				obj.logo = "cdn.optimizely.com/img/3715372115/7ce1a5adb663413ea7810c2871905b68.jpg";
				break;

			case productInfo.hasClass('pa_brand-guardians-of-the-galaxy'):
				//obj.brand = 'Guardians of the Galaxy';
				obj.brand = 'Marvel';
				obj.logo = "cdn.optimizely.com/img/3715372115/608f1ba78fdd493898b28032191c6f1d.png";
				break;

			case productInfo.hasClass('pa_brand-star-wars'):
				//obj.brand = 'Star Wars';
				obj.brand = 'Disney';
				obj.logo = "cdn.optimizely.com/img/3715372115/a04d870424134751b08a5cd66ba7eb1f.jpg";
				break;

			case productInfo.hasClass('pa_brand-arrow'):
				//obj.brand = 'Arrow';
				obj.brand = 'DC';
				obj.logo = "cdn.optimizely.com/img/3715372115/4bc1f44224a24cfa825a898ddd9fc8dd.png";
				break;

			case productInfo.hasClass('pa_brand-dc-comics-batman'):
				//obj.brand = 'Batman';
				obj.brand = 'DC';
				obj.logo = "cdn.optimizely.com/img/3715372115/4bc1f44224a24cfa825a898ddd9fc8dd.png";
				break;

			case productInfo.hasClass('pa_brand-dc-comics-superman'):
				//obj.brand = 'Superman';
				obj.brand = 'DC';
				obj.logo = "cdn.optimizely.com/img/3715372115/4bc1f44224a24cfa825a898ddd9fc8dd.png";
				break;

			case productInfo.hasClass('pa_brand-captain-america'):
				//obj.brand = 'Captain America';
				obj.brand = 'Marvel';
				obj.logo = "cdn.optimizely.com/img/3715372115/608f1ba78fdd493898b28032191c6f1d.png";
				break;

			case productInfo.hasClass('pa_brand-marvel'):
				obj.brand = 'Marvel';
				obj.logo = "cdn.optimizely.com/img/3715372115/608f1ba78fdd493898b28032191c6f1d.png";
				break;

			case productInfo.hasClass('pa_brand-dc-comics'):
				obj.brand = 'DC';
				obj.logo = "cdn.optimizely.com/img/3715372115/4bc1f44224a24cfa825a898ddd9fc8dd.png";
				break;

			
>>>>>>> 4523776113c042b7133d73d3ab9341eb1b25b45d
		}
		return obj;
	})();

	// Official Licensed Product Tooltip
	var $officialProductTooltip = $('.official-licensed-product');
	// Remove text node
	$officialProductTooltip.contents().filter(function () {
		return this.nodeType === 3;
	}).remove();

	$officialProductTooltip.children('.abmain')
		.after('<img class="ME103_brand_logo" src="' + data.logo + '" alt="" /><span>Genuine ' + data.brand + ' Merchandise</span>')
		.hide();

<<<<<<< HEAD
  // New tooltip div
  var tooltipText = $officialProductTooltip.data('tooltiptext');
  
  var $newTooltip = $([
  	'<div class="ME103_tooltip">',
    	'<p>' + tooltipText + '</p>',
  	'</div>'
  ].join(''));
  
  $officialProductTooltip.after($newTooltip);
  
  $officialProductTooltip.on('click', function() {
  	$newTooltip.slideToggle();
  });
  
	var toolWrapTop = $officialProductTooltip.offset().top,
			toolWrapHeight = $officialProductTooltip.outerHeight(),
			toolOffset = $officialProductTooltip.offset().top;

	$(window).scroll(UC.throttle(function () {
    var userScroll = $(window).scrollTop();
		if (userScroll > toolOffset) {
			$officialProductTooltip.addClass('ME103_scrolled_past');
		}

		else if (userScroll < toolOffset) {
			if ($officialProductTooltip.hasClass('ME103_scrolled_past')) {
          $newTooltip.slideDown();
=======
	var toolWrapTop = $officialProductTooltip.offset().top,
		toolWrapHeight = $officialProductTooltip.outerHeight(),
		toolPop = $('#ab-licensed-tooltip'),
		toolPopPosition = toolWrapTop + toolWrapHeight,
		toolOffset = $officialProductTooltip.offset().top,
		toolPopHeight = toolPop.outerHeight(),
		imagePad = $('.columns.product-gallery .product-title-wrapper');


	$(window).scroll(UC.throttle(function () {
		var toolWrapTop = $officialProductTooltip.offset().top,
			toolWrapHeight = $officialProductTooltip.outerHeight(),
			toolPopPosition = toolWrapTop + toolWrapHeight;

		if ($(window).scrollTop() > toolOffset) {
			$officialProductTooltip.addClass('scrolled_past');
		} else if ($(window).scrollTop() < toolOffset) {
			if ($officialProductTooltip.hasClass('scrolled_past')) {
				if (toolPop.hasClass('popped')) {} else {
					toolPop.addClass('ME103_top popped').css({
						"top": toolPopPosition,
						"max-width": $officialProductTooltip.outerWidth()
					}).slideDown();
					imagePad.css("padding-bottom", toolPopHeight);

				}
>>>>>>> 4523776113c042b7133d73d3ab9341eb1b25b45d
			}
		}
	}, 300));

<<<<<<< HEAD
	$('.product-info [class*="_shop-with-merchoid"] .columns.small-12').append([
		'<div class="UC92_grid-row ME103_brand_official">',
			'<div class="UC92_block">',
				'<div class="UC92_block__img">',
					'<img class="ME103_brand_logo" src="' + data.logo + '">',
				'</div>',
				'<h3>100% officially licensed by <span class="ME103_brand_name">' + data.brand + '</span></h3>',
				'<p>This product is approved by <span class="ME103_brand_name"></span>, meaning you\'re getting the good stuff, no questions asked.</p>',
			'</div>',
		'</div>'
	].join(''));

=======
	$('.tooltip').on('click', function (e) {
		e.preventDefault();
		var el = $(this),
			toolWrapTop = $officialProductTooltip.offset().top,
			toolWrapHeight = $officialProductTooltip.outerHeight(),
			toolPopPosition = toolWrapTop + toolWrapHeight;

		if (toolPop.hasClass('popped')) {
			if (el.hasClass('tooltip-active')) {
				toolPop.css({
					'display': '',
					'top': toolPopPosition,
					"max-width": $officialProductTooltip.outerWidth()
				});

				setTimeout(function () {
					toolPop.slideUp().css({
						'top': toolPopPosition
					});
					imagePad.css({
						"padding-bottom": 0,
					});
				}, 2);

			} else {
				toolPop.css({
					'display': 'block',
					"max-width": $officialProductTooltip.outerWidth()
				});
				setTimeout(function () {
					toolPop.slideDown().css({
						'top': toolPopPosition
					});
					imagePad.css("padding-bottom", toolPopHeight);
				}, 2);
			}
		}
	});

	$('.product-info [class*="_shop-with-merchoid"] .columns.small-12').append([
		'<div class="UC92_grid-row brand_official">',
		'<div class="UC92_block">',
		'<div class="UC92_block__img">',
		'<img class="brand_logo" src="">',
		'</div>',
		'<h3>100% officially licensed by <span class="brand_name"></span></h3>',
		'<p>This product is approved by <span class="brand_name"></span>, meaning you\'re getting the good stuff, no questions asked.</p>',
		'</div>',
		'</div>'
	].join(''));

	var brandedDiv = $('.UC92_grid-row.brand_official');
	brandedDiv.find('.brand_logo').attr('src', data.logo);
	brandedDiv.find('.brand_name').text(data.brand);
>>>>>>> 4523776113c042b7133d73d3ab9341eb1b25b45d
})(window.jQuery);