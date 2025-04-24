var _TP031 = (function () {

	var UC = function (a) { return a.poller = function (a, b, c) { var d = { wait: 50, multiplier: 0, timeout: 6000 }, e = Date.now || function () { return (new Date).getTime() }; if (c) for (var f in c) d[f] = c[f]; else c = d; for (var g = !!d.timeout && new Date(e() + d.timeout), h = d.wait, i = d.multiplier, j = [], l = function (c, d) { if (g && e() > g) return !1; d = d || h, function () { var a = typeof c; return "function" === a ? c() : "string" !== a || document.querySelector(c) }() ? (j.push(!0), j.length === a.length && b()) : setTimeout(function () { l(c, d * i) }, d) }, m = 0; m < a.length; m++)l(a[m]) }, a }(UC || {});

	// Triggers
	UC.poller([
		'body',
		function () {
			if (window.jQuery) return true;
		},
		function () {
			if (window.ga) return true;
		}
	], TP031mobile, {
			timeout: 7000,
			multiplier: 0
		});

	// Variation
	function TP031mobile() {
		var $ = window.jQuery;

		if ($('body').hasClass('TP031')) {
			return;
		}


		UC.poller([
			function () {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'TP031mobile',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });


		var $body = $('body');

		$body.addClass('TP031mobile');

		var trackerName = window.ga.getAll()[0].get('name');


		/*------------------------  
		Cookie Helper
		-------------------------*/

		function setCookie(c_name, value, exdays, c_domain) {
			c_domain = (typeof c_domain === "undefined") ? "" : "domain=" + c_domain + ";";
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + exdays);
			var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
			document.cookie = c_name + "=" + c_value + ";" + c_domain + "path=/";
		}

		function getCookie(name) {
			var match = document.cookie.match(name + '=([^;]*)');
			return match ? match[1] : undefined;
		}

		var pollerOpts = { timeout: 7000, multiplier: 0 };

		/*------------------------  
		Create Toggle Bar
		-------------------------*/

		var toggle = $([
			'<div class="tp31-toggle">',
				'<label class="tp31-toggle">',
				'<span class="tp31-ex-vat">ex VAT</span>',
				'<input id="tp31-togglecheckbox" type="checkbox">',
				'<div class="tp31-slide-toggle"></div>',
				'<span class="tp31-incvat">inc VAT</span></label>',
			'</div>'].join(''));


		var $includeVAT,
			$excludeVAT;

		/*------------------------
		Inc/Exc elements based on page
		-------------------------*/

		if ($body.hasClass('pageType-CategoryPage')) { //category page
			$('.ui-block-a.tp_filterSearchBtnWrapper').after(toggle);
			$excludeVAT = $('.price_value');

		} else if ($body.hasClass('pageType-ProductPage')) { //product page /// if product page - trigger click on existing toggle 
			toggle.appendTo('.prices_holder');

			$includeVAT = $('.price_inc_vat_section');
			$excludeVAT = $('.product_price_section');
		}

		var $includeLabel = $('.tp31-incvat'),
			$excludeLabel = $('.tp31-ex-vat');

		/*------------------------
		If category page
		-------------------------*/
		function categoryToggle() {
			/*------------------------
			Create include VAT price on category products
			-------------------------*/
			var incVATtext,
				productPrice;

			$('.price_value').each(function () {
				productPrice = $(this);
				var priceExvat = parseFloat($(this).text().trim().replace('£', '').replace(',', ''));
				var includingVAT = Number((priceExvat) * 1.2).toFixed(2);

				incVATtext = $('<span class="tp31-incVat">£' + includingVAT + '</span>');
				$(this).closest('.product_price_holder').prepend(incVATtext);
			});

			var $includeVAT = $('.tp31-incVat');
			var $checkbox = $('#tp31-togglecheckbox');


			/*------------------------
			Default Value to be shown/trigger prices on toggle click
			-------------------------*/
			$('#tp31-togglecheckbox').prop('checked', true);
			$('.tp31-ex-vat').addClass('tp31-labelBold');


			var cookie = getCookie('TP031-mobile');

			if (cookie) {
				if (cookie === 'include_vat') {
					$checkbox.prop('checked', true);
					$excludeVAT.addClass('tp31-hidden');
					$includeVAT.addClass('tp31-visible');
					$includeLabel.addClass('tp31-labelBold');
					$excludeLabel.removeClass('tp31-labelBold');

				} else if (cookie === 'exc_vat') {
					$checkbox.prop('checked', false);
					$includeVAT.removeClass('tp31-visible');
					$excludeVAT.removeClass('tp31-hidden');

					$excludeLabel.addClass('tp31-labelBold');
					$includeLabel.removeClass('tp31-labelBold');
				}
			}
			/*------------------------
			Setting/getting cookie for category page
			-------------------------*/

			var excludeVATcategoryEvent,
				includeVATcatergoryEvent;

			
			$checkbox.change(function () {
				if ($(this).is(':checked') == false) {
					setCookie('TP031-mobile', 'exc_vat');
					$includeVAT.removeClass('tp31-visible'); //Showing/hiding prices on category
					$excludeVAT.removeClass('tp31-hidden');

					$excludeLabel.addClass('tp31-labelBold');
					$includeLabel.removeClass('tp31-labelBold');

					if (!excludeVATcategoryEvent) {
						window.ga(trackerName + '.send', 'event', 'TP031 - VAT Toggle (Site Wide) Mobile', 'Toggle Click', 'TP031 Mobile User excluded VAT on category page', { nonInteraction: 1 });
						excludeVATcategoryEvent = true;
					}

				} else if ($(this).is(':checked') == true) {
					setCookie('TP031-mobile', 'include_vat');
					$includeVAT.addClass('tp31-visible');
					$excludeVAT.addClass('tp31-hidden');

					$includeLabel.addClass('tp31-labelBold');
					$excludeLabel.removeClass('tp31-labelBold'); //add label class to whichever label is checked so user knows 

					if (!includeVATcatergoryEvent) {
						window.ga(trackerName + '.send', 'event', 'TP031 - VAT Toggle (Site Wide) Mobile', 'Toggle Click', 'TP031 Mobile User included VAT on category page', { nonInteraction: 1 });
						includeVATcatergoryEvent = true;
					}
				}
			});



		}

		/*------------------------
		If Product page
		-------------------------*/
		function productToggle() {


			UC.poller(['#tp26-togglecheckbox'], function () {

				var TP026toggle = $('#tp26-togglecheckbox'),
					TP031toggle = $('#tp31-togglecheckbox');

				TP031toggle.prop('checked', true); //set as TP2 default toggle

				TP031toggle.click(function () { //when fake toggle clicked, trigger TP031 click
					TP026toggle.click();
				});

				//if cookie set - change toggle to match
				var cookie = getCookie('TP031-mobile');
				if (cookie) {
					if (cookie === 'include_vat') {
						TP031toggle.prop('checked', true);
						TP026toggle.prop('checked', true);
						$('.product_price_section').removeClass('visible');
						$('.price_inc_vat_section').removeClass('hidden');
						$excludeLabel.removeClass('tp31-labelBold');
						$includeLabel.addClass('tp31-labelBold');

					} else {
						TP031toggle.prop('checked', false);
						TP026toggle.prop('checked', false);
						$('.product_price_section').addClass('visible');
						$('.price_inc_vat_section').addClass('hidden');
						$excludeLabel.addClass('tp31-labelBold');
						$includeLabel.removeClass('tp31-labelBold');
					}
				}

				var includeVATproduct,
					excludeVATproduct;

				//Making label bold when clicked
				TP031toggle.change(function () {
					if ($(this).is(':checked') == false) {
						setCookie('TP031-mobile', 'exc_vat');
						$excludeLabel.addClass('tp31-labelBold');
						$includeLabel.removeClass('tp31-labelBold');


						if (!excludeVATproduct) {
							window.ga(trackerName + '.send', 'event', 'TP031 - VAT Toggle (Site Wide) Mobile', 'Toggle Click', 'TP031 Mobile User excluded VAT on product page', { nonInteraction: 1 });
							excludeVATproduct = true;
						}
					} else {
						setCookie('TP031-mobile', 'include_vat');
						$excludeLabel.removeClass('tp31-labelBold');
						$includeLabel.addClass('tp31-labelBold');

						if (!includeVATproduct) {
							window.ga(trackerName + '.send', 'event', 'TP031 - VAT Toggle (Site Wide) Mobile', 'Toggle Click', 'TP031 Mobile User included VAT on product page', { nonInteraction: 1 });
							includeVATproduct = true;
						}
					}
				});

			}, pollerOpts);

		}
		/*------------------------
		Run functions based on pages
		-------------------------*/
		if ($body.hasClass('pageType-CategoryPage')) {
			categoryToggle();
		} else if ($body.hasClass('pageType-ProductPage')) {
			productToggle();
		}
	}

})(jQuery);
			