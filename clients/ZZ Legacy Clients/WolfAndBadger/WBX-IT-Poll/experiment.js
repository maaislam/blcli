var WBXITPoll = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	var $ = window.jQuery,
		slideQ = false,
		trackerName;
	console.log('trigger');

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			function () {
				if (window.jQuery) {
					return true;
				}
			}
		], init);
	})();
	
    function init(){
		// UC.poller([
		// 	function() {
		// 		var fs = window.FS;
		// 		if (fs && fs.setUserVars) return true;
		// 	}
		// ], function () {
		// 	window.FS.setUserVars({
		// 		experiment_str: 'WBXITPoll',
		// 		variation_str: 'Variation 1'
		// 	});
		// }, { multiplier: 1.2, timeout: 0 });

		var cacheDom = (function() {

			// Cache useful selectors for later use
			var bodyVar = $('body'),
				URL = window.location.href,
				basketCheck = $('#cart-link .minicart');
				
			// Modal selectors
			var modal,
				pollHref;

			// Logo Src
			var logoSrc = 'https://www.wolfandbadger.com/staticmedia/i/logo.svg?fc7887b86423';

			// URLCheck variables
			var URL = window.location.pathname;

			bodyVar.addClass('WBX-it-poll');
			
			// Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				URL: URL,
				modal: modal,
				logoSrc: logoSrc,
				pollHref: pollHref,
				basketCheck: basketCheck
			};
		})();

		var URLTest = {
			URLChecker: function(){
				// Use regex's to decide on which survey to link to for analytics
				var subCatRegex = /^(\/)[a-z]{2}(\/)(category|designers)(\/).*/,
					basketPageRegex = /shopping-bag/,
					productPageRegex = /^(\/)[a-z]{2}(\/)[a-zA-Z0-9-_]+(-)[a-zA-Z0-9-_]+(\/)($|\?.*)/;

				// Test against regex's and set survery link
				if(subCatRegex.test(cacheDom.URL) === true){
					cacheDom.pollHref = '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSelyAMmePIFIdVm72H2dGt8-sPkLDXIs8iy-dHEpSQPvMx_Kg/viewform?embedded=true" width="760" height="540" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>';
					sendEvent('WBX-it-poll', 'User is on Sub Category Page', '', true);
				}
				else if(basketPageRegex.test(cacheDom.URL) === true){
					cacheDom.pollHref = '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfK-kJTIUw6-BlDenlDN62K2m_l_g0gpYuA7vkpLUJQdk-GKg/viewform?embedded=true" width="760" height="540" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>';
					sendEvent('WBX-it-poll', 'User is on Basket Page', '', true);
				}
				else if(productPageRegex.test(cacheDom.URL) === true){
					cacheDom.pollHref = '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdWgkTmXw64DuHO0Tdq9UpDh2aykXtIqBy8jBqhmlXFCa3qdg/viewform?embedded=true" width="760" height="540" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>';
					sendEvent('WBX-it-poll', 'User is on Product Page', '', true);
				}
				else{
					cacheDom.pollHref = '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSelyAMmePIFIdVm72H2dGt8-sPkLDXIs8iy-dHEpSQPvMx_Kg/viewform?embedded=true" width="760" height="540" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>';
					sendEvent('WBX-it-poll', 'User is not on any predefined page, Current location = ' + window.location.pathname , '', true);
				}
			}
		}

		var modal = {
			// Append modal to the body
			contentBuilder: function(){
				cacheDom.bodyVar.append([
					'<div class="WBX_pop-up_modal">',
						'<div>',
							'<a href="#" class="WBX_close_btn">X</a>',
							'<div class="WBX_overflow_fix">',
								'<div class="WBX_logo"><img src="' + cacheDom.logoSrc + '" alt="Salons Direct Logo" /></div>',
								'<div class="WBX_form">' + cacheDom.pollHref + '</div>',
							'</div>',
						'</div>',
					'</div>'
				].join(''));

				cacheDom.modal = $(".WBX_pop-up_modal");
			}
		}
		
		var elementBindings = {
			// Click function for the mobile tab variation to show the hidden options
			modalClickOn: function(){
				cacheDom.modal.find('.WBX_close_btn').on("click", function(e) {
					if (slideQ == false) {
						slideQ = true;
						e.preventDefault();

						if (cacheDom.modal.hasClass("active")) {
							cacheDom.modal.fadeOut("slow", function() {
								cacheDom.modal.removeClass("active");
								cacheDom.bodyVar.removeClass('WBX_scroll-off');
								sendEvent('WBX-it-poll', 'Closed Modal by clicking cross button', '', true);
								slideQ = false;
							});
						} else {
							cacheDom.modal.fadeIn("slow", function() {
								cacheDom.modal.addClass("active");
								slideQ = false;
							});
						}
					}
				});
			},
			// When the user clicks not on the modal close it
			modalBackgroundClick: function(){
				$(document).on("mousedown", function(e) {
					if (!$(e.target).closest(".WBX_pop-up_modal > div").length) {
						if (cacheDom.modal.hasClass("active")) {
							cacheDom.modal.fadeOut("slow", function() {
								cacheDom.modal.removeClass("active");
								cacheDom.bodyVar.removeClass('WBX_scroll-off');
								sendEvent('WBX-it-poll', 'Closed Modal by clicking background', '', true);
								slideQ = false;
							});
						}
					}
				});
			},
			// Send GA event when user clicks survey redirect
			surveyClickOn: function(){
				cacheDom.modal.find('.WBX_cta').on('click', function(){
					sendEvent('WBX-it-poll', 'Clicked Go to Survery', '', true);
				});
			}
		};

		var exitIntent = {
			// OuiBounce plugin
			ouiPlugin: function(){
				(function (root, factory) {
					if (typeof define === 'function' && define.amd) {
						define(factory);
					} else if (typeof exports === 'object') {
						module.exports = factory(require, exports, module);
					} else {
						root.ouibounce = factory();
					}
				}(this, function (require, exports, module) {

					return function ouibounce(el, custom_config) {
						"use strict";

						var config = custom_config || {},
							aggressive = config.aggressive || false,
							sensitivity = setDefault(config.sensitivity, 20),
							timer = setDefault(config.timer, 1000),
							delay = setDefault(config.delay, 0),
							callback = config.callback || function () { },
							cookieExpire = setDefaultCookieExpire(config.cookieExpire) || '',
							cookieDomain = config.cookieDomain ? ';domain=' + config.cookieDomain : '',
							cookieName = config.cookieName ? config.cookieName : 'viewedOuibounceModal',
							sitewide = config.sitewide === true ? ';path=/' : '',
							_delayTimer = null,
							_html = document.documentElement;

						function setDefault(_property, _default) {
							return typeof _property === 'undefined' ? _default : _property;
						}

						function setDefaultCookieExpire(days) {
							// transform days to milliseconds
							var ms = days * 24 * 60 * 60 * 1000;

							var date = new Date();
							date.setTime(date.getTime() + ms);

							return "; expires=" + date.toUTCString();
						}

						setTimeout(attachOuiBounce, timer);
						function attachOuiBounce() {
							if (isDisabled()) { return; }

							_html.addEventListener('mouseleave', handleMouseleave);
							_html.addEventListener('mouseenter', handleMouseenter);
							_html.addEventListener('keydown', handleKeydown);
						}

						function handleMouseleave(e) {
							if (e.clientY > sensitivity) { return; }

							_delayTimer = setTimeout(fire, delay);
						}

						function handleMouseenter() {
							if (_delayTimer) {
								clearTimeout(_delayTimer);
								_delayTimer = null;
							}
						}

						var disableKeydown = false;
						function handleKeydown(e) {
							if (disableKeydown) { return; }
							else if (!e.metaKey || e.keyCode !== 76) { return; }

							disableKeydown = true;
							_delayTimer = setTimeout(fire, delay);
						}

						function checkCookieValue(cookieName, value) {
							return parseCookies()[cookieName] === value;
						}

						function parseCookies() {
							// cookies are separated by '; '
							var cookies = document.cookie.split('; ');

							var ret = {};
							for (var i = cookies.length - 1; i >= 0; i--) {
								var el = cookies[i].split('=');
								ret[el[0]] = el[1];
							}
							return ret;
						}

						function isDisabled() {
							return checkCookieValue(cookieName, 'true') && !aggressive;
						}

						// You can use ouibounce without passing an element
						// https://github.com/carlsednaoui/ouibounce/issues/30
						function fire() {
							console.log(isDisabled());
							cacheDom.basketCheck = $('#cart-link .minicart');
							if (isDisabled() || cacheDom.basketCheck.hasClass('empty') || checkCookieValue(cookieName, 'true')) { return; }
							else{
								callback();
								disable();
							}
						}

						function disable(custom_options) {
							var options = custom_options || {};

							// you can pass a specific cookie expiration when using the OuiBounce API
							// ex: _ouiBounce.disable({ cookieExpire: 5 });
							if (typeof options.cookieExpire !== 'undefined') {
								cookieExpire = setDefaultCookieExpire(options.cookieExpire);
							}

							// you can pass use sitewide cookies too
							// ex: _ouiBounce.disable({ cookieExpire: 5, sitewide: true });
							if (options.sitewide === true) {
								sitewide = ';path=/';
							}

							// you can pass a domain string when the cookie should be read subdomain-wise
							// ex: _ouiBounce.disable({ cookieDomain: '.example.com' });
							if (typeof options.cookieDomain !== 'undefined') {
								cookieDomain = ';domain=' + options.cookieDomain;
							}

							if (typeof options.cookieName !== 'undefined') {
								cookieName = options.cookieName;
							}

							document.cookie = cookieName + '=true' + cookieExpire + cookieDomain + sitewide;

							// remove listeners
							_html.removeEventListener('mouseleave', handleMouseleave);
							_html.removeEventListener('mouseenter', handleMouseenter);
							_html.removeEventListener('keydown', handleKeydown);
						}

						return {
							fire: fire,
							disable: disable,
							isDisabled: isDisabled
						};
					};
				}));
			},
			// OUIBounce trigger
			exitTrigger: function () {
				this.ouibounce(cacheDom.modal[0], { 
					cookieName: 'WBXExit', 
					cookieDomain: 'www.wolfandbadger.com',
					/*aggressive: true, Testing property, if the cookie exists ignore it and show it everytime on exit */
					callback: function() { 
						if(getCookie('WBXExit')){	
						}	
						else {
							cacheDom.modal.fadeIn().addClass('active');
							cacheDom.bodyVar.addClass('WBX_scroll-off');
							sendEvent('WBX-it-poll', 'Exit Intent has fired, Modal shown', '', true);
						}
					} 
				});
			}
		}

		// Check URL 
		URLTest.URLChecker();

		// Build new DOM Elements
		modal.contentBuilder();

		// Bind click events
		elementBindings.modalClickOn();
		elementBindings.modalBackgroundClick();
		elementBindings.surveyClickOn();

		// OUIBounce trigger
		exitIntent.ouiPlugin();
		exitIntent.exitTrigger();
	}

	/* 
		Anon functions to be called inside the code

		Custom GA event sender that uses a tracker if found
	*/

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

	// Get cookie helper
	function getCookie(name) {
		var match = document.cookie.match(name+'=([^;]*)');
		return match ? match[1] : undefined;
	}

	//sendEvent('TP017', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
	//sendEvent('TP017v2', 'Closed Trade Modal', '', true);
	
})();