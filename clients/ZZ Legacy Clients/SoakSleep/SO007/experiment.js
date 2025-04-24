var _SO007 = (function() {
		var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
		// Triggers
		UC.poller([
			'body',
			'#cart-totals',
			'.grand.totals',
			'.page-title-wrapper',
			'.data.table.totals',
			function () {
				if (window.jQuery) return true;
			},
			function () {
				if (window.ga) return true;
			}
		], SO007, {
			timeout: 7000,
			multiplier: 0
		});

		function SO007() {
			var $ = window.jQuery;

			$('body').addClass('SO007');
			UC.poller([
				function () {
					var fs = window.FS;
					if (fs && fs.setUserVars) return true;
				}
			], function () {
				window.FS.setUserVars({
					experiment_str: 'SO007',
					variation_str: 'Variation 1'
				});
			}, {
				multiplier: 1.2,
				timeout: 0
			});

			/*-------------------------------
			Countdown
			---------------------------------*/

			var countdown = $('<div class="so7-countDown">Stock is reserved and items are held in your basket for <span class="so7-countdownTimer"></div>');
			countdown.insertAfter('.page-title-wrapper');

			var now = new Date(),
				orderDate = new Date(),
				d = new Date(),
				day = now.getDay();

			d.setHours(d.getUTCHours() + 1);

			var minutesToCountdown = 90

			var numMilliseondsSinceEpoch = (new Date()).getTime();
			var targetDateMilliseconds = numMilliseondsSinceEpoch + (minutesToCountdown * 60 * 1000);

			var orderDate = new Date(targetDateMilliseconds);

			var secondsUntilCutoff = Math.floor((orderDate.getTime() - d.getTime()) / 1000);
			if (parseInt(localStorage.getItem('so-seconds-until-cutoff')) > 30) {
				secondsUntilCutoff = parseInt(localStorage.getItem('so-seconds-until-cutoff'));
			}

			function timer() {

				var days = Math.floor(secondsUntilCutoff / 24 / 60 / 60);
				var hoursLeft = Math.floor((secondsUntilCutoff) - (days * 86400));
				var hours = Math.floor(hoursLeft / 3600);
				var minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
				var minutes = Math.floor(minutesLeft / 60);
				var remainingSeconds = secondsUntilCutoff % 60;
				if (remainingSeconds < 10) {
					remainingSeconds = "0" + remainingSeconds;
				}
				var countdownElements = document.querySelectorAll('.so7-countdownTimer');
				for (var i = 0, ii = countdownElements.length; i < ii; i++) {
					countdownElm = countdownElements[i];
					countdownElm.innerHTML = [
						'<span class="uc-countdown">',
						days > 0 ? ('<span class="so7-days">' + days + '</span> days ') : '',
						'<span class="so7-hours">' + hours + '</span> hour ',
						'<span class="so7-minutes">' + minutes + '</span> minutes ',
						'<span class="so7-seconds">' + remainingSeconds + '</span> seconds ',
						'</span>'
					].join('');
					if (secondsUntilCutoff == 0) {
						clearInterval(countdownTimer);
					} else {
						secondsUntilCutoff--;

						localStorage.setItem('so-seconds-until-cutoff', secondsUntilCutoff);
					}
				}
			}
			var countdownTimer = setInterval(timer, 1000);

			/*-------------------------------
			Delivery Messages
			---------------------------------*/
			var pollerOpts = {
				timeout: 8000,
				multiplier: 0
			};

			UC.poller(['.grand.totals'], function () {
				var basketPrice = $('.data.table.totals .grand.totals .amount .price').text().replace('£', '');
				var basketNumber = parseFloat(basketPrice);

				var difference = 50.00 - basketNumber;

				var under50freedeliv = $('<div class="so7-spend50">Spend <span>£' + difference + '</span> more to qualify for <strong>FREE</strong> delivery</div>'),
					deliveryAmount = $(['<span class="so7-delivery">',
						'<h4>Delivery - £4.95</h4>',
							'<p>(UK - Standard - 3 to 5 working days - UK Mainland. Non-UK Mainland charges may apply) </p>',
						'</span>'
					].join(''));

				var freeDelivery = $([
					'<tr class="so7-freedelivery">',
						'<th class="mark" scope="row">',
							'<strong>Delivery</strong>',
						'</th>',
						'<td class="so7-freedeliveryamount">',
							'<strong>',
							'<span>Free</span>',
							'</strong>',
						'</td>',
					'</tr>'
				].join(''));
				if (basketNumber < 50.00) {
					under50freedeliv.insertAfter('#cart-totals');
					deliveryAmount.insertBefore(under50freedeliv);
				} else {
					freeDelivery.insertBefore('.grand.totals');
				}
			}, pollerOpts);

		}
	})();