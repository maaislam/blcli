var TP015 = (function () {

	/**
	 * UC Library - Poller
	 * @version 0.2.2
	 */
	var UC = function (a) {
		return a.poller = function (a, b, c) {
			var d = {
					wait: 50,
					multiplier: 0,
					timeout: 6000
				},
				e = Date.now || function () {
					return (new Date).getTime()
				};
			if (c)
				for (var f in c) d[f] = c[f];
			else c = d;
			for (var g = !!d.timeout && new Date(e() + d.timeout), h = d.wait, i = d.multiplier, j = [], l = function (c, d) {
					if (g && e() > g) return !1;
					d = d || h,
						function () {
							var a = typeof c;
							return "function" === a ? c() : "string" !== a || document.querySelector(c)
						}() ? (j.push(!0), j.length === a.length && b()) : setTimeout(function () {
							l(c, d * i)
						}, d)
				}, m = 0; m < a.length; m++) l(a[m])
		}, a
	}(UC || {});

	var trackerName;

	function sendEvent(category, action, label, nonInteractionValue) {
		var fire = function (tracker) {
			window.ga(tracker + '.send', 'event', category, action, label, {
				nonInteraction: nonInteractionValue
			});
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

	var _triggers = (function () {

		UC.poller([
			'#facetWrapper',
			'.tpBreadcrumbWrapper',
			'.refinementToggle',
			function () {
				return window.jQuery;
			},
			function () {
				return window.ga;
			}
		], activate);
	})();

	function activate() {
		var $ = window.jQuery;

		UC.poller([
			function () {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'TP015',
				variation_str: 'Variation 1 Desktop'
			});
		}, {
			multiplier: 1.2,
			timeout: 0
		});


		$('body').addClass('TP015');

		var globalMsg = $('#globalMessages'),
			lengthWrap = $('#facetWrapper + .item + .item'),
			widthWrap = $('#facetWrapper + .item + .item + .item'),
			thicknessWrap = $('#facetWrapper + .item + .item + .item + .item');

		lengthWrap.hide();
		widthWrap.hide();
		thicknessWrap.hide();

		globalMsg.after([
			'<div class="filter_wrap clearfix">',
			'<div class="input_outer">',
			'<div class="input_wrap">',
			'<label>Length:</label>',
			'<div class="select">',
			'<span></span>',
			'<select name="boughtFrom" class="length_select">',
			'</select>',
			'</div>',
			'</div>',
			'</div>',
			'<div class="input_outer">',
			'<div class="input_wrap">',
			'<label>Width:</label>',
			'<div class="select">',
			'<span></span>',
			'<select name="boughtFrom"  class="width_select">',
			'</select>',
			'</div>',
			'</div>',
			'</div>',
			'<div class="input_outer">',
			'<div class="input_wrap">',
			'<label>Thickness:</label>',
			'<div class="select">',
			'<span></span>',
			'<select name="boughtFrom" class="thickness_select">',
			'</select>',
			'</div>',
			'</div>',
			'</div>',
			'<div class="btn_wrap">',
			'<a href="#" style="display: none;" class="submit_filter">Go</a>',
			'<div>',
			'<a href="#" class="open_modal">Need help with measurements?</a>',
			'</div>',
			'</div>',
			'</div>'
		].join(''));
		$('#facets_filters.nav_column .title_holder').insertAfter(globalMsg);

		var lengthParent = lengthWrap.find(".allFacetValues ul"),
			lengthSelect = $('.length_select'),
			widthParent = widthWrap.find(".allFacetValues ul"),
			widthSelect = $('.width_select'),
			thicknessParent = thicknessWrap.find(".allFacetValues ul"),
			thicknessSelect = $('.thickness_select');

		$('.thickness_select, .width_select, .length_select').append('<option val="" class="default_option">Select an option</option>');

		lengthParent.children('li').each(function () {
			var el = $(this),
				inputVal = el.find('input').val();

			if (window.location.search.length > 0) {
				var valSubstring = inputVal.replace(':relevance', '');
			} else {
				var valSubstring = inputVal.replace(':relevance', '');

			}
			var valText = el.find('.facet_block-label').text(),
				textSubString = $.trim(valText);

			if (el.find('.facet_block-label input').prop('checked')) {
				lengthSelect.find('.default_option').remove();
				lengthSelect.append('<option value="' + valSubstring + '" selected="selected">' + textSubString + '</option>');
			} else {
				lengthSelect.append('<option value="' + valSubstring + '">' + textSubString + '</option>');
			}
		});

		widthParent.children('li').each(function () {
			var el = $(this),
				inputVal = el.find('input').val();

			if (window.location.search.length > 0) {
				var valSubstring = inputVal.replace(':relevance', '');
			} else {
				var valSubstring = inputVal.replace(':relevance', '');

			}
			var valText = el.find('.facet_block-label').text(),
				textSubString = $.trim(valText);

			if (el.find('.facet_block-label input').prop('checked')) {
				widthSelect.find('.default_option').remove();
				widthSelect.append('<option value="' + valSubstring + '" selected="selected">' + textSubString + '</option>');
			} else {
				widthSelect.append('<option value="' + valSubstring + '">' + textSubString + '</option>');
			}
		});

		thicknessParent.children('li').each(function () {
			var el = $(this),
				inputVal = el.find('input').val();

			if (window.location.search.length > 0) {
				var valSubstring = inputVal.replace(':relevance', '');
			} else {
				var valSubstring = inputVal.replace(':relevance', '');

			}
			var valText = el.find('.facet_block-label').text(),
				textSubString = $.trim(valText);

			if (el.find('.facet_block-label input').prop('checked')) {
				thicknessSelect.find('.default_option').remove();
				thicknessSelect.append('<option value="' + valSubstring + '" selected="selected">' + textSubString + '</option>');
			} else {
				thicknessSelect.append('<option value="' + valSubstring + '">' + textSubString + '</option>');
			}
		});

		$.each($('.select'), function () {
			var el = $(this),
				span = el.find('span'),
				sel = el.find('select');

			span.html(sel.find('option:selected').text());

			sel.change(function () {
				span.html(sel.find('option:selected').text());
			});
		});

		$('.thickness_select, .width_select, .length_select').on('change', function () {
			var query = $(this).find('option:selected').val();
			var encodedQuery = encodeURIComponent(query);
			encodedQuery = encodedQuery.replace(/%20/g, '+'),
				windowURI = window.location.search;

			sendEvent('TP015---TimberRefine', 'Used filter', this.className, true);

			if (windowURI.length > 0) {
				if (windowURI.toLowerCase().indexOf("&text=") >= 0) {
					windowURI = windowURI.replace('&text=', '');
				}
				window.location.search = '?q=%3Arelevance' + encodedQuery;
			} else {
				window.location.search = '?q=%3Arelevance' + encodedQuery;
			}
		});

		$('body #wrapper').after([
			'<div class="pop-up_modal">',
			'<div>',
			'<a href="#" class="close_btn"></a>',
			'<div class="overflow_fix">',
			'<h2>Timber Dimensions</h2>',
			'<div class="pp_image_wrap">',
			'<h3>Thickness, Width and Length</h3>',
			'<span>',
			'<img src="http://sb.monetate.net/img/1/581/1053020.png" />',
			'</span>',
			'</div>',
			'</div>',
			'</div>',
			'</div>'
		].join(''));

		var slideQ = false;

		if (slideQ == false) {
			$(".open_modal,.pop-up_modal .close_btn").on("click", function (e) {
				var slideQ = true,
					modal = $('.pop-up_modal');

				e.preventDefault();
				if (modal.hasClass("active")) {
					modal.fadeOut("slow", function () {
						modal.removeClass("active");
						slideQ = false;
					});
				} else {
					modal.fadeIn("slow", function () {
						modal.addClass("active");
						sendEvent('TP015---TimberRefine', 'need help with measurements pop up opened', '', true);
						slideQ = false;
					});
				}
			});
		}
	}
})();