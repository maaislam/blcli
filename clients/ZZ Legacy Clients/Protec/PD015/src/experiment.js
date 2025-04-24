// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const PD015 = (() => {
	let slideQ = false,
		$;

	const UCPoller = (() => {
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'#minicart_data .items',
			() => {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], init);
	})();

	function init(){
		utils.fullStory('PD015', 'Variation 1');

		const cacheDom = (() => {
			//Cache useful selectors for later use
			const bodyVar = $('body');
			const URL = window.location.pathname;

			// Modal selectors
			let modal;

			bodyVar.addClass('PD015 PD015Exit');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				URL: URL,
				modal: modal
			};
		})();


		const modal = {
			// Append modal to the body
			contentBuilder(){
				cacheDom.bodyVar.append([
					'<div class="PD015_pop-up_modal">',
						'<div class="PD015_body_click"></div>',
						'<div class="PD015_inner_div">',
							'<a href="#" class="PD015_close_btn">×</a>',
							'<div class="PD015_overflow_fix">',
								'<h3>Before you go!</h3>',
								'<p>Protec Direct allows you to save multiple baskets to come back to later.</p>',
								'<p>If you would like to save your basket, click the link below.</p>',
								'<a class="PD015_cta PD015_save-basket" href="/saved-baskets/create">Save Basket</a>',
								'<a class="PD015_cta PD015_checkout" href="/checkout/multi/choose-delivery-address">Checkout</a>',
							'</div>',
						'</div>',
					'</div>'
				].join(''));

				cacheDom.modal = $(".PD015_pop-up_modal");
				cacheDom.modalBG = cacheDom.modal.find('.PD015_body_click');
			}
		}
		
		const elementBindings = {
			// Click function for the mobile tab variation to show the hidden options
			modalClickOn(){
				cacheDom.modal.find('.PD015_close-modal, .PD015_close_btn').on("click", function () {
					if (slideQ === false) {
						slideQ = true;

						if (cacheDom.modal.hasClass("active")) {
							cacheDom.modal.fadeOut("slow", function () {
								cacheDom.modal.removeClass("active");
								cacheDom.bodyVar.removeClass('PD015_scroll-off');
								slideQ = false;
							});
						} 
						else {
							cacheDom.modal.fadeIn("slow", function () {
								cacheDom.modal.addClass("active");
								cacheDom.bodyVar.addClass('PD015_scroll-off');
								slideQ = false;
							});

							
						}
					}
				});
				cacheDom.modalBG.on("mousedown touchstart", function () {
					if (cacheDom.modal.hasClass("active") && slideQ === false) {
						cacheDom.modal.fadeOut("slow", function () {
							cacheDom.modal.removeClass("active");
						});
					}
				});
			},
			// Send GA event when user clicks survey redirect
			surveyClickOn(){
				cacheDom.modal.find('.PD015_save-basket').on('click', function(){
					utils.events.send('PD015ExitSurvey', 'Click', 'User clicked Save Basket button', {sendOnce: true});
				});
				cacheDom.modal.find('.PD015_checkout').on('click', function(){
					utils.events.send('PD015ExitSurvey', 'Click', 'User clicked Checkout button', {sendOnce: true});
				});
			}
		};

		const exitIntent = {
			// OuiBounce plugin
			ouiPlugin(){
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
							if (isDisabled() || parseInt($('#minicart_data .items').text()) == 0) { return; }
							if (el) { $(el).fadeIn(); }

							callback();
							disable();
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
			exitTrigger() {
				this.ouibounce(cacheDom.modal[0], { 
					cookieName: 'PD015Exit', 
					cookieDomain: 'protecdirect.co.uk',
					/*aggressive: true, Testing property, if the cookie exists ignore it and show it everytime on exit */
					callback() { 
						cacheDom.modal.fadeIn().addClass('active');
						cacheDom.bodyVar.addClass('PD015_scroll-off');
						utils.events.send('PD015ExitSurvey', 'Exit Intent fired', 'Modal displayed to the user', {sendOnce: true});
					} 
				});
			}
		}
		
		// Build new DOM Elements
		modal.contentBuilder();

		// Bind click events
		elementBindings.modalClickOn();
		elementBindings.surveyClickOn();

		// OUIBounce trigger
		exitIntent.ouiPlugin();
		exitIntent.exitTrigger();	
		
	}	
})();