var SDXXX = (function () {

	
	// UC Library - Poller -- @version 0.2.2
	var UC = function (a) {
		return a.poller = function (a, b, c) {
			var d = {
					wait: 50,
					multiplier: 0,
					timeout: 7000
				},
				e = Date.now || function () {
					return (new Date).getTime();
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
				}, m = 0; m < a.length; m++) l(a[m]);
		}, a
	}(UC || {});

	var trackerName;

	function sendEvent(category, action, label, nonInteractionValue, dimensionValue, dimensionName) {
		var fire = function (tracker) {
        var options = {};
        options.nonInteraction = nonInteractionValue;
			if(dimensionValue && dimensionName){
        		options['dimension' + dimensionValue] = dimensionName;
			}
            window.ga(tracker + '.send', 'event', category, action, label, options);
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

	UC.poller([
		'body',
		function () {
			if (window.jQuery) {
				return true;
			}
		}
	], run);

	function run(){

		// Cookie Setter Helper Function.
		function setCookie(c_name, value, exdays, c_domain) {
			c_domain = (typeof c_domain === "undefined") ? "" : "domain=" + c_domain + ";";
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + exdays);
			var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
			document.cookie = c_name + "=" + c_value + ";" + c_domain + "path=/";
		}

		// Cookie Getter Helper Function.
		function getCookie(name) {
			var match = document.cookie.match(name + '=([^;]*)');
			return match ? match[1] : undefined;
		}

		$('body').addClass('SDXXX').append([  
			'<div class="pop-up_modal active">',
			'<div>',
			'<a href="#" class="close_btn">X</a>',
			'<div class="overflow_fix">',
			'<h2><img src="http://www.salonsdirect.com/skin/frontend/rwd/saloncustom/images/logo.svg" /></h2>',
			'<h3>Quick question, what profession are you in?</h3>',
			'<div class="SDXXX_input_wrap">',
			'<div class="SDXXX_select">',
			'<span></span>',
			'<select name="boughtFrom">',
				'<option class="default">Please Select</option>',
				'<option>Hair &amp; Beauty</option>',
				'<option>Hairdressing</option>',
				'<option>Mobile Hairdresser</option>',
				'<option>Barbers</option>',
				'<option>Beauty</option>',
				'<option>Mobile - Beauty</option>',
				'<option>Nails</option>',
				'<option>Tanning</option>',
				'<option>Aromatherapy/holistic</option>',	
				'<option class="non-trade_option">Not in trade</option>',
				'<option>Spa &amp; Leisure</option>',
				'<option>Educational Institute</option>',					
				'<option class="non-trade_option">Other/none</option>',
			'</select>',
			'</div>',
			'</div>',
			'<a href="#" class="SD_confirm_btn">Submit</a>',
			'<span class="SD_error">Please select an option</span>',
			'</div>',
			'</div>',
			'</div>'
		].join(''));

		var slideQ = false,
			modal = $(".pop-up_modal"),
			submitBtn = $('.SD_confirm_btn'),
			tradeSelect = $('.SDXXX_select');

		if (getCookie('tradeType') == 'Non-Trade' || getCookie('tradeType') == 'Trade' || getCookie('tradeType') == 'Closed') {

		} else {
			modal.fadeIn();
		}

		if (slideQ === false) {
			$(".pop-up_modal .close_btn").on("click", function (e) {
				slideQ = true;
				e.preventDefault();

				sendEvent('SDXXX', 'Closed Trade Modal', '', true);
				setCookie('tradeType', 'Closed', 1095, 'www.salonsdirect.com');


				if (modal.hasClass("active")) {
					modal.fadeOut("slow", function () {
						modal.removeClass("active");
						slideQ = false;
					});
				} else {
					modal.fadeIn("slow", function () {
						modal.addClass("active");
						slideQ = false;
					});
				}
			});
		}

		$.each(tradeSelect, function () {
			var el = $(this),
				span = el.find('span'),
				sel = el.find('select');
			span.html(sel.find('option:selected').text());

			sel.change(function () {
				span.html(sel.find('option:selected').text());

				if (tradeSelect.find('option:selected').hasClass('default')) {
					$('.SD_error').addClass('active');
				} else if (tradeSelect.find('option:selected').hasClass('non-trade_option')) {
					setCookie('tradeType', 'Non-Trade', 1095, 'www.salonsdirect.com');
					modal.fadeOut("slow", function () {
						modal.removeClass("active");
						sendEvent('SDXXX', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
					});

				} else {
					setCookie('tradeType', 'Trade', 1095, 'www.salonsdirect.com');
					modal.fadeOut("slow", function () {
						modal.removeClass("active");
						sendEvent('SDXXX', 'Submitted Trade Type', 'Trade', true, 6, 'Trade');
					});
				}
			});
		});

		submitBtn.on('click', function () {
			if (tradeSelect.find('option:selected').hasClass('default')) {
				$('.SD_error').addClass('active');
			} else if (tradeSelect.find('option:selected').hasClass('non-trade_option')) {
				setCookie('tradeType', 'Non-Trade', 1095, 'www.salonsdirect.com');
				modal.fadeOut("slow", function () {
					modal.removeClass("active");
					sendEvent('SDXXX', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
				});

			} else {
				setCookie('tradeType', 'Trade', 1095, 'www.salonsdirect.com');
				modal.fadeOut("slow", function () {
					modal.removeClass("active");
					sendEvent('SDXXX', 'Submitted Trade Type', 'Trade', true, 6, 'Trade');
				});
			}
		});
	}
})();