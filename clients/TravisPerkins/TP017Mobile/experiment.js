var TP017Mobile = (function () {

	// UC Library - Poller -- @version 0.2.2
	var UC = function (a) {
		return a.poller = function (a, b, c) {
			var d = {
					wait: 50,
					multiplier: 0,
					timeout: 7000
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

	function sendEvent(category, action, label, nonInteractionValue, dimensionValue, dimensionName) {        
		var fire = function (tracker) {            
			var options = {};            
			options.nonInteraction = nonInteractionValue;            
			if (dimensionValue && dimensionName) {                
				options['dimension' + dimensionValue] = dimensionName;            
			}            
			window.ga(tracker + '.send', 'event', category, action, label, options);        
		};

		        
		if (trackerName) {            
			fire(trackerName);        
		} else {            
			UC.poller([                function () {                    
				return window.ga.getAll;                
			}            ], function () {                
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

	function run() {

		// Cookie Setter Helper Function.
		function setCookie(c_name, value, exdays, c_domain) {
			c_domain = (typeof c_domain === "undefined") ? "" : "domain=" + c_domain + ";";
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + exdays);
			var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
			document.cookie = c_name + "=" + c_value + ";" + c_domain + "path=/";
		}

		// Cookie Getter Helper Function.
		function getCookie(name) {
			var match = document.cookie.match(name + '=([^;]*)');
			return match ? match[1] : undefined;
		}

		$('body').addClass('TP017Mobile').append([
			'<div class="pop-up_modal active">',
			'<div>',
			'<a href="#" class="close_btn">X</a>',
			'<div class="overflow_fix">',
			'<h2>Hello...a quick Question</h2>',
			'<h3>We can show you the right VAT, your nearest branch and designated trade account area</h3>',
			'<div class="TP017_input_wrap">',
			'<label>What profession are you in?</label>',
			'<div class="TP017_select">',
			'<span></span>',
			'<select name="boughtFrom">',
			'<option class="default">Choose and option</option>',
			'<option>Civils and Drainage</option>',
			'<option class="diy_option">DIY (not trade)</option>',
			'<option>Exterior Fit</option>',
			'<option>General Building and Construction</option>',
			'<option>Interior Fit</option>',
			'<option>Joinery and Carpentry</option>',
			'<option>Plumbing and Heating</option>',
			'<option>Other</option>',
			'</select>',
			'</div>',
			'</div>',
			'<div class="TP_diy_btn"><a href="#">None, I\'m DIY<a/></div>',
			'<a href="#" class="TP_confirm_btn">Submit</a>',
			'<span class="TP_error">Please select an option</span>',
			'</div>',
			'</div>',
			'</div>'
		].join(''));

		var slideQ = false,
			modal = $(".pop-up_modal"),
			submitBtn = $('.TP_confirm_btn'),
			tradeSelect = $('.TP017_select');

		if (getCookie('tradeType') == 'DIY' || getCookie('tradeType') == 'Trade' || localStorage.getItem('TP017mobile-close') === '3') {

		} else {
      setTimeout(() => {
        modal.fadeIn();
      }, 15000);
		}

		if (slideQ == false) {
			$(".pop-up_modal .close_btn").on("click", function (e) {
				slideQ = true;
				e.preventDefault();
				sendEvent('TP017Mobile', 'Closed Trade Modal', '', true);

				if (modal.hasClass("active")) {
          if(!localStorage.getItem('TP017mobile-close')){
            localStorage.setItem('TP017mobile-close', '1');
          } else if(localStorage.getItem('TP017mobile-close') === '1'){
            localStorage.setItem('TP017mobile-close', '2');
          } else if(localStorage.getItem('TP017mobile-close') === '2'){
            localStorage.setItem('TP017mobile-close', '3');
          }
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
			});
		});

		submitBtn.on('click', function () {
			if (tradeSelect.find('option:selected').hasClass('default')) {
				$('.TP_error').addClass('active');
			} else if (tradeSelect.find('option:selected').hasClass('diy_option')) {
				setCookie('tradeType', 'Non-Trade', 1095, 'www.travisperkins.co.uk');
				modal.fadeOut("slow", function () {
					modal.removeClass("active");
					sendEvent('TP017Mobile', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
				});

			} else {
				setCookie('tradeType', 'Trade', 1095, 'www.travisperkins.co.uk');
				modal.fadeOut("slow", function () {
					modal.removeClass("active");
					sendEvent('TP017Mobile', 'Submitted Trade Type', 'Trade', true, 6, 'Trade');
				});
			}
		});


		$('.TP_diy_btn a').on('click', function () {
			setCookie('tradeType', 'DIY', null, 'www.travisperkins.co.uk');
			modal.fadeOut("slow", function () {
				modal.removeClass("active");
				sendEvent('TP017Mobile', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
			});
		});
	};
})();