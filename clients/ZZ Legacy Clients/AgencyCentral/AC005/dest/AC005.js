(function() {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var AC005 = function () {
	var UC = function (a) {
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
	}(UC || {});
	var JQ = window.jQuery,
	    trackerName;

	var UCPoller = function () {
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller(['.contact-link.contact-option-container', function () {
			if (window.jQuery) {
				return true;
			}
		}], init);
	}();

	function init() {
		// UC.poller([
		// 	function() {
		// 		var fs = window.FS;
		// 		if (fs && fs.setUserVars) return true;
		// 	}
		// ], function () {
		// 	window.FS.setUserVars({
		// 		experiment_str: 'AC005',
		// 		variation_str: 'Variation 1'
		// 	});
		// }, { multiplier: 1.2, timeout: 0 });

		var sendEvent = function () {
			return function (category, action, label, nonInteractionValue, dimensionValue, dimensionName) {
				var fire = function fire(tracker) {
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
					UC.poller([function () {
						return window.ga.getAll;
					}], function () {
						trackerName = window.ga.getAll()[0].get('name');
						fire(trackerName);
					});
				}
			};
			//sendEvent('AC005', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
			//sendEvent('AC005', 'Closed Trade Modal', '', true);	
		}();

		var cacheDom = function () {
			//Cache useful selectors for later use
			var bodyVar = JQ('body'),
			    URL = window.location.href;

			// Phone number element
			var agencyRow = JQ('.agency-result'),
			    displayPhoneBtn = agencyRow.find('.contact-link.contact-option-container');

			bodyVar.addClass('AC005');

			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				URL: URL,
				agencyRow: agencyRow,
				displayPhoneBtn: displayPhoneBtn
			};
		}();

		var elementBindings = {
			// Click function for the mobile tab variation to show the hidden options
			clickFunctionTest: function clickFunctionTest() {}
		};

		var hideElements = {
			// Hide some content thats no longer used
			originalElements: function originalElements() {}
		};

		hideElements.originalElements();
	}
}();
})();