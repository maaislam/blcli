(function ($) {

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

		// Triggers
		UC.poller([
			'body',
			function () {
				if (window.jQuery) return true;
			},
			function () {
				if (window.ga) return true;
			}
		], CB074b, {
			timeout: 7000,
			multiplier: 0
		});

		function CB074b() {
			var $ = window.jQuery;

			UC.poller([
				function () {
					var fs = window.FS;
					if (fs && fs.setUserVars) return true;
				}
			], function () {
				window.FS.setUserVars({
					experiment_str: 'CB074b',
					variation_str: 'Variation 1'
				});
			}, {
				multiplier: 1.2,
				timeout: 0
			});

			var body = $('body');

			body.addClass('CB074b');

			if ($(window).width() < 600) {
				body.addClass('CB074bmobile');
			} else {
				body.removeClass('CB074bmobile');
			}


			/*-----------------
			User Location
			-------------------*/
			var countryCode = window.sg_api.lib.lsGetdata('Website', 'geoData').countryCode;
			var country;

		
				var basketItems = $('#checkout_update_form .product-name a').text().trim(),
					brandpageHeader = $('.header.col-md-12 h2').text().trim(),
					productTitle = $('.content-product-block h1').text().trim(),
					mobileProductTitle = $('.top-product-view.row h1').text().trim(),
					page = window.location.href;

				var brandName,
					mobileLayout = $('#top-UVP-slider'),
					mobileText,
					desktopText;



				var lightboxheading,
					lightboxText,
					bannerHeading,
					bannerText,
					termsText,
					availabletext;

					if (countryCode === 'DE') {
						availabletext = 'VERFÜGBAR AB';
					}else if(countryCode === 'GB') {
						availabletext = 'AVAILABLE FROM';
					}

					/*---------------------------
					clarisonic banner 
					-----------------------------*/
				if (productTitle.match("Clarisonic") || mobileProductTitle.match("Clarisonic") || basketItems.match("Clarisonic") || page === 'http://www.currentbody.com/clarisonic' || brandpageHeader.match("Clarisonic")) {

					if (countryCode === 'DE') {
						bannerTitle = 'CLARISONIC 90 TAGE GELD-ZURÜCK-GARANTIE';
						bannerText = 'Wir sind so sicher, dass Sie mit Ihrem Clarison vom ersten Gebrauch an Ergebnisse erhalten werden, die Sie lieben, dass wir eine 90 Tage Geld-Zurück-Garantie anbieten.';
						termsText = 'Geschäftsbedingungen';

						lightboxheading = 'CLARISONIC 90 TAGE GELD-ZURÜCK-GARANTIE';
						lightboxText = "Wir bitten Sie, dass Sie das Gerät für 60 Sekunden pro Tag für 30 Tage benutzt haben. Dies stellt sicher, dass Sie dem Gerät eine angemessene Chance gegeben haben, anzufangen, an Ihrer Haut zu arbeiten. Wir raten außerdem, dass es mindestens 4 Wochen benötigt, um von dem Gerät Ergebnisse zu sehen. <br></br>Wenn Sie immer noch nicht zufrieden sind, geben Sie uns einfach das Gerät zurück und wir bieten eine volle Rückerstattung.";
					}else{
						bannerTitle = 'CLARISONIC 90 DAY MONEY BACK GUARANTEE';
						bannerText = 'When you buy any Clarisonic device, we’ll give you 90 days to make sure the product is right for you. If not, then you can return it to us for a full refund.';
						termsText = 'Terms & Conditions'	

						lightboxheading = 'CLARISONIC 90 DAY MONEY BACK GUARANTEE';
						lightboxText = "We're so confident that you'll love the results after using your Clarisonic device that we offer a 90 day money back guarantee. <br/><br/>To achieve the best results, we recommend trialling it for 60 seconds a day over a 30 day period. This ensures enough time for the device to start to work properly on your skin. <br/><br/>We also advise that it takes a minimum of 12 weeks to see clear results using Clarisonic. If you are still not satisfied, simply return the device to us and we will provide a full refund.";


					}


					//remove body class based on which page it is to get correct content
					body.addClass('CB074bclarisonic');
					body.removeClass('CB074btria');
					body.removeClass('CB074bsmooth');

					/*---------------------------
					tria banner 
					-----------------------------*/

				} else if (productTitle.match("Tria") || mobileProductTitle.match("Tria") || basketItems.match("Tria") || page === 'http://www.currentbody.com/tria' || brandpageHeader.match("Tria")) {
					

                    if (countryCode === 'DE') {
						bannerTitle = 'TRIA 90 TAGE GELD-ZURÜCK-GARANTIE';
						bannerText = 'Wenn Sie irgendein Tria-Gerät kaufen, geben wir Ihnen 90 Tage, um sicherzugehen, dass das Produkt richtig für Sie ist. Wenn nicht, können Sie es uns bei voller Rückerstattung zurückgeben.';
						termsText = 'Geschäftsbedingungen';

						lightboxheading = 'TRIA 90 TAGE GELD-ZURÜCK-GARANTIE';
						lightboxText = "Wir sind so sicher, dass Sie mit Ihrem Tria-Gerät Ergebnisse erhalten werden, die Sie lieben, dass wir eine 90 Tage Geld-Zurück-Garantie anbieten.<br></br>Wir bitten Sie, dass Sie das Gerät zwei Mal die Woche über einen Zeitraum von 70 Tagen benutzt haben. Dies stellt sicher, dass Sie dem Gerät eine angemessene Chance gegeben haben, anzufangen, an Ihrer Haut zu arbeiten.";
					}else{
						bannerTitle = 'TRIA 90 DAY MONEY BACK GUARANTEE';
						bannerText = 'When you buy any Tria device, we’ll give you 90 days to make sure the product is right for you. If not, then you can return it to us for a full refund.';
						termsText = 'Terms & Conditions'	

						lightboxheading = 'TRIA 90 DAY MONEY BACK GUARANTEE';
						lightboxText = "We're so confident that you'll love the results after using your Tria device that we offer a 90 day money back guarantee. <br/><br/>To achieve the best results, we recommend trialling it twice a week over a 70 day period. This ensures enough time for the device to start to work properly on your skin. <br/><br/>We also advise that it takes a minimum of 4 weeks to see clear results using Tria. If you are still not satisfied, simply return the device to us and we will provide a full refund.";

					}
				

					body.removeClass('CB074bclarisonic');
					body.addClass('CB074btria');
					body.removeClass('CB074bsmooth');


				} else if (productTitle.match("SmoothSkin") || mobileProductTitle.match("SmoothSkin") || basketItems.match("SmoothSkin") || page === 'http://www.currentbody.com/smoothskin' || brandpageHeader.match("SmoothSkin")) {
					
					if (countryCode === 'DE') {
						bannerTitle = 'SMOOTHSKIN 90 TAGE GELD-ZURÜCK-GARANTIE';
						bannerText = 'Wenn Sie irgendein Smoothskin-Gerät kaufen, geben wir Ihnen 90 Tage, um sicherzugehen, dass das Produkt richtig für Sie ist. Wenn nicht, können Sie es uns bei voller Rückerstattung zurückgeben.';
						termsText = 'Geschäftsbedingungen';

						lightboxheading = 'SMOOTHSKIN 90 TAGE GELD-ZURÜCK-GARANTIE';
						lightboxText = "Wir sind so sicher, dass Sie mit Ihrem Smoothskin-Gerät Ergebnisse erhalten werden, die Sie lieben, dass wir eine 90 Tage Geld-Zurück-Garantie anbieten<br></br>Wir bitten Sie, dass Sie das Gerät für 70 Tage auf einer wöchentlichen Basis benutzt haben. Dies stellt sicher, dass Sie dem Gerät eine angemessene Chance gegeben haben, anzufangen, an Ihrer Haut zu arbeiten. Wir raten außerdem, dass es mindestens 12 Wochen benötigt, um von dem Gerät sichtbare Ergebnisse zu sehen.";
					}else{
						bannerTitle = 'SMOOTHSKIN 90 DAY MONEY BACK GUARANTEE';
						bannerText = 'When you buy any Smoothskin device, we’ll give you 90 days to make sure the product is right for you. If not, then you can return it to us for a full refund.';
						termsText = 'Terms & Conditions'	

						lightboxheading = 'SMOOTHSKIN 90 DAY MONEY BACK GUARANTEE';
						lightboxText = "We're so confident that you'll love the results after using your SmoothSkin device that we offer a 90 day money back guarantee. <br/><br/>To achieve the best results, we recommend trialling it on a weekly basis over a 70 day period. This ensures enough time for the device to start to work properly on your skin. <br/><br/>We also advise that it takes a minimum of 12 weeks to see clear results using SmoothSkin. If you are still not satisfied, simply return the device to us and we will provide a full refund.";


					} 
				

					body.removeClass('CB074bclarisonic');
					body.removeClass('CB074btria');
					body.addClass('CB074bsmooth');
				}





				var bannerMarkup =
					$([
						'<div class="cb74-banner">',
						'<div class="cb74-boxLogo">',
						'<div class="cb74-exclusiveText">'+availabletext+'</div>',
						'<img src="http://www.sitegainer.com/fu/up/z2i30f1793pqrnc.jpg"/>',
						'</div>',
						'<div class="cb74-Text">',
						'<div class="cb74-heading">' + bannerTitle + '</div>',
						'<span>' + bannerText + '</span>',
						'<div class="cb74-link">'+termsText+' ></div>',
						'</div>',
						'</div>'
					].join(''));


				var mobileLayout = $('#top-UVP-slider');

				//lightbox markup
				var lightboxTerms = $([
					'<div id = "cb74-overlay"></div>',
					'<div class="cb74-lightbox">',
					'<div class="cb74-lightbox-content">',
					'<div class="cb74-lightbox-exit">x</div>',
					'<h2><b>' + lightboxheading + '</b></h2>',
					"<p><br>" + lightboxText + "</p>",
					'</div>',
					'</div>'
				].join(''));

				//mobile & desktop layouts
				if ($(body).hasClass('CB074bmobile')) {

					if (page === 'https://www.currentbody.com/checkout/cart/') {
						bannerMarkup.prependTo('#page .container-fluid:last');

					} else {
						bannerMarkup.insertAfter('#top-UVP-slider');

					}
				} else {

					if (page === 'https://www.currentbody.com/checkout/cart/') {
						bannerMarkup.prependTo('#page .container-fluid:last');


					} else if (body.hasClass('catalog-brand-view')) {
						bannerMarkup.prependTo('.brand-two-col-description.row');

						$('#brand-image').insertAfter('.cb74-banner');
					} else if (body.hasClass('catalog-product-view')) {
						bannerMarkup.insertBefore('.breadcrumbs');

					} else {
						bannerMarkup.insertAfter('.CB003_top-banner');
					}
				}

				lightboxTerms.prependTo(body);

				//lightbox functionality
				var lightBoxtrigger = $('.cb74-link');

				var $lightbox = lightboxTerms.filter('#cb74-overlay, .cb74-lightbox');
				lightboxTerms.find(".cb74-lightbox-exit").add($lightbox.filter('#cb74-overlay')).click(function () {
					$lightbox.fadeOut(200);
				});

				lightBoxtrigger.click(function () {
					$lightbox.fadeIn(200);
				});

				if (productTitle.match("Clarisonic") || mobileProductTitle.match("Clarisonic") || basketItems.match("Clarisonic") || page === 'http://www.currentbody.com/clarisonic' || brandpageHeader.match("Clarisonic")) {

					$('.cb74-heading').addClass('clarisonic');
				}
			}

		})(jQuery);