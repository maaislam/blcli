/* no_doc_ready */
var _CB087 = (function () {
	
	 // PLUGINS ------------------------------------
	// UC Library - Poller -- @version 0.2.2
	// ---------------------------------------------
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
		// Send GA Events With Tracker Name ------------
		// ---------------------------------------------
		function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;
		
			// -----------------------------------------------
			// Full story integration
			// -----------------------------------------------
			UC.poller([
					function() {
						var fs = window.FS;
						if (fs && fs.setUserVars) return true;
					}
				], function () {
					window.FS.setUserVars({
						experiment_str: 'CB087',
						variation_str: 'Variation 1'
					});
				}, { multiplier: 1.2, timeout: 0 });
			
				// Poll start
				UC.poller([
					'body',
					function() {
						if (window.jQuery) return true;
					},
					function() {
						if (window.ga) return true;
					}
				], CB087, {
					timeout: 7000,
					multiplier: 'disable'
				});
					// Variation
	function CB087() {

		var $ = window.jQuery;
		var $body = $('body');
		$body.addClass('CB087');


		sendEvent('CB087', 'Page View', 'CB087 CurrentBody.com — Iluminage Site Changes Page view', true);


		//On iluminage pages add session storage to show they have come from there
		if (window.location.href.indexOf('http://www.iluminagebeauty.com/') > -1) {
			sessionStorage.setItem('CB087-iluminage', 1);
		}

		/*-------------------------------
		Add RRP to price
		---------------------------------*/
		function addRRP() {
			var rrpText = $('<div class="cb87-rrp">RRP:</div>');
			rrpText.prependTo('.product-type-data .price-box:first');

		};


		/*-------------------------------
		Add the shop now button & cb logo
		---------------------------------*/

		function shopNow() {
			var pollerOpts = { timeout: 7000, multiplier: 0 };

			UC.poller(['.product-primary-column .price-box'], function () {
				var shopNowButton = $('<div class="cb87-shop_wrap"><img class="cb87-cb-logo"src="http://www.sitegainer.com/fu/up/xjl9t26xy5n32ae.png"/><div class="cb87-shop"><span>SHOP NOW</span></div></div>');
				shopNowButton.appendTo('.product-primary-column .price-box:first');
			}, pollerOpts);

		}

		/*Change availability text*/
		function availableText() {
			var pollerOpts = { timeout: 7000, multiplier: 0 };

			UC.poller(['.product-type-data .availability'], function () {
				var productName = $('.product-name h1 > span:first').text();
				var availability = $('.product-type-data .availability');
				availability.text('Buy your iluminage ' + productName + ' from our UK Recommended Supplier');
			}, pollerOpts);
		}

		/*-------------------------------
		Create the loader page that the user will see
		---------------------------------*/
		function addLoaderPage() {
			var loadingPage = $('<div class="cb87-loader"></div>');


			loadingPage.html(['<div class="cb87-loader-content">',
				'<span>Please wait</span>',
				'<div class="cb87-loader-bar"></div>',
				'<div class="cb87-loading-text">',
				'<span>...you are being directed to</span>',
				'<img src="http://www.sitegainer.com/fu/up/xjl9t26xy5n32ae.png"/>',
				'<span>Iluminage\'s selected online partner</span>',
				'</div>',
				'<div class="cb87-reasons">',
				'<span>Reasons to buy from </span><img class="cb87-logo"src="http://www.sitegainer.com/fu/up/xjl9t26xy5n32ae.png"/>',
				'</div>',
				'</div>'
			].join(''))
			loadingPage.prependTo($body);


			//USPS for loading page
			var loaderUSPs = [
				['cb087-years', '<img class="cb87-ilogo" src="http://www.sitegainer.com/fu/up/l1wfsi3p9e0si5q.png"/><span>partner for 5 years</span>'],
				['cb087-device', '<span>Beauty device experts</span>'],
				['cb087-delivery', '<span>Free UK Delivery and Hassle Free Returns</span>'],
				['cb087-trustpilot', '<span>95% Rating</span>'],
			];

			$.each(loaderUSPs, function () {
				var className = this[0],
					text = this[1];

				$('<div class="cb87-loaderUsp"><div class="cb087-icon ' + className + '"/>' + text + '</div>').appendTo('.cb87-reasons');
			});


			//Loading bar 
			loadingPage.find('.cb87-loader-bar').append([
				'<div class="cb87-progress">',
				'<div class="cb87-progress_bar"/>',
				'</div>'
			].join(''));


		}//end of loading function

			var pollerOpts = { timeout: 7000, multiplier: 0 };

			addLoaderPage();
			function animateBar() {
				$('.cb87-progress_bar').width("0px");
				$('.cb87-progress_bar').animate({
					width: '99%'
				}, 7000, function () {
					setTimeout(animateBar(), 2500);
				});
			}

			if ($body.hasClass('catalog-product-view') > -1) {
				addRRP();
				shopNow();
				availableText();

				UC.poller(['.cb87-shop_wrap .cb87-shop'], function () {
					//On click of button - show loader for a certain amount of time
					$('.cb87-shop_wrap .cb87-shop').on('click', function () {
						$('body').addClass('cb87-loaderActive');
						var loadingPage = $('.cb87-loader');
						loadingPage.addClass('cb87-loaderShow');

						animateBar();

						var URL = window.location.pathname;
						var productLink;
						if (URL.indexOf('/touch-permanent-hair-reduction') > -1) {
							productLink = 'http://www.currentbody.com/iluminagetouch.html?utm_source=cb-iluminage&utm_medium=site-test&utm_campaign=cb-iluminage-test';
						} else {
							productLink = 'http://www.currentbody.com/iluminage-youth-activator.html?utm_source=cb-iluminage&utm_medium=site-test&utm_campaign=cb-iluminage-test';
						}

						//then direct to currentbody
						setTimeout(function () {
							window.location.href = productLink;
							$body.removeClass('cb87-loaderActive');
						}, 3500);
					});
				}, pollerOpts);

			}
			else if ($body.hasClass('catalog-category-view') > -1) {

				UC.poller(['.products-grid .item'], function () {

					var products = $('.products-grid .item');
					products.each(function (i) {
						var $e = $(this);
						var productName = $e.find('.product-image-wrapper');
						productNameTitle = productName.find('a').attr('title');

						if ((productNameTitle === 'TOUCH Permanent Hair Reduction') || (productNameTitle === 'Youth Activator')) {
							$e.append('<p class="CB87-cbtext">From our UK recommended supplier</p>');

							if (productNameTitle === 'TOUCH Permanent Hair Reduction') {
								$newLink = 'http://www.currentbody.com/iluminagetouch.html?utm_source=cb-iluminage&utm_medium=site-test&utm_campaign=cb-iluminage-test';
							} else if (productNameTitle === 'Youth Activator') {
								$newLink = 'http://www.currentbody.com/iluminage-youth-activator.html?utm_source=cb-iluminage&utm_medium=site-test&utm_campaign=cb-iluminage-test';
							}
							$e.find('.actions.clearer').html('<div class="CB87-cat_link button">Buy Now ></div>');


							$('.CB87-cat_link.button').on('click', function () {
								$('body').addClass('cb87-loaderActive');
								var loadingPage = $('.cb87-loader');
								loadingPage.addClass('cb87-loaderShow');
		
								animateBar();

								//then direct to currentbody
								setTimeout(function () {
									window.location.href = productLink;
									$body.removeClass('cb87-loaderActive');
								}, 3500);
							});


						}
					});

				}, pollerOpts);
			} //end of category
				
		

		}
	
		})();
		