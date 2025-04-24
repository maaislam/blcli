(function() {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var UC$1 = function (a) {
	return a.poller = function (a, b, c) {
		var d = { wait: 50, multiplier: 0, timeout: 7000 },
		    e = Date.now || function () {
			return new Date().getTime();
		};if (c) for (var f in c) {
			d[f] = c[f];
		} else c = d;for (var g = !!d.timeout && new Date(e() + d.timeout), h = d.wait, i = d.multiplier, j = [], l = function l(c, d) {
			if (g && e() > g) return !1;d = d || h, function () {
				var a = typeof c === "undefined" ? "undefined" : _typeof(c);return "function" === a ? c() : "string" !== a || document.querySelector(c);
			}() ? (j.push(!0), j.length === a.length && b()) : setTimeout(function () {
				l(c, d * i);
			}, d);
		}, m = 0; m < a.length; m++) {
			l(a[m]);
		}
	}, a;
}(UC$1 || {});

var ITSAccountTest = function () {
	var JQ = window.jQuery,
	    trackerName;

	var UCPoller = function () {
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC$1.poller(['body', function () {
			if (window.jQuery) {
				return true;
			}
		}], init);
	}();

	function init() {

		var cacheDom = function () {
			//Cache useful selectors for later use
			var buttonCheckout = JQ('.btn-checkout');

			//Retun the selectors we want to reference in other parts of the test
			return {
				buttonCheckout: buttonCheckout
			};
		}();


		var replaceHrefs = {
			replaceFunction: function replaceFunction() {
			    if (window.location.pathname.indexOf('/onestepcheckout') > -1) {
					window.location.href = 'https://www.inthestyle.com/checkout/onepage';
				}
				if (cacheDom.buttonCheckout.length > 0) {
					cacheDom.buttonCheckout.attr("onclick", "window.location='https://www.inthestyle.com/checkout/onepage';");
				}

				JQ('a').each(function () {
					var el = JQ(this),
					    elHref = el.attr('href');

					if (elHref) {
						if (elHref.indexOf('/onestepcheckout') > -1) {
							elHref.replace('/onestepcheckout', '/checkout/onepage');
						}
					}
				});
			}
		};

		replaceHrefs.replaceFunction();
	}
}();
})();