import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as lightboxmarkup from './lib/lightbox.js';
import { getCookie, setCookie } from '../../../../lib/utils';

// ID - Experiment Title
const ID = (() => {

	// Experiment code
	const activate = () => {
		var $ = jQuery;
		var $body = $('body');

		$body.addClass('MP058');

		//create the lightbox
		function MP058_lightbox(){
		 var markup = lightboxmarkup.lightBoxhtml;
		 markup.prependTo($body);

		 var $lightboxContainer = $('.MP58-lightbox_wrapper'),
			 $lightboxOverlay = $('.MP58-lightboxfade');
			 
			function openLightbox(){
				$lightboxContainer.addClass('MP58-lightboxactive');
				$lightboxOverlay.addClass('MP58-lightboxfadeactive');
				setCookie('MP058-lightboxshow', 1);
			}
			openLightbox();
			function closeLightbox(){
				$lightboxContainer.removeClass('MP58-lightboxactive');
				$lightboxOverlay.removeClass('MP58-lightboxfadeactive');
				utils.events.send('MP058 100% Xmas1','lightbox closed','MP058 user closed lightbox', {
					sendOnce: true
				});
			}

			$('.MP58-lightboxExit').click(function(){
				closeLightbox();
			});
			$lightboxOverlay.click(function(){
				closeLightbox();
			});

		}

		//Exit intent function
		function exitIntent() {
			var exitIntent = {
				// OuiBounce plugin
				ouiPlugin: function () {
					(function (root, factory) {		
						root.ouibounce = factory();
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
								if (isDisabled()) { return; }

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
				exitTrigger: function () {
					this.ouibounce(MP058_lightbox.markup, {
						cookieName: 'MP058exit',
						cookieDomain: 'mamasandpapas.com',
						callback: function () {
							MP058_lightbox();
						}
					});
				}
			}
			exitIntent.ouiPlugin();
			exitIntent.exitTrigger();



		}

		if(!getCookie('MP058-lightboxshow')){
		
			//if mobile show after 20 seconds
			if($(window).width() < 760) {
				if($productPrice < 30){
					setTimeout(function(){
						MP058_lightbox();
						utils.events.send('MP058 100% Xmas1 mobile','lightbox show','MP058 lightbox shown mobile', {
							sendOnce: true
						});
					},20000);
			    }
			//show lightbox on exit
			}else{
				var $productPrice = window.universal_variable.product.unit_sale_price;		
				
				if($productPrice < 30){
					exitIntent();
					utils.events.send('MP058 100% Xmas1 desktop','user saw lightbox','MP058 lightbox shown desktop', {
						sendOnce: true
					});
				}
			}

		
		}

		


	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('MP058', 'Variation 1');

		activate();
	})();

})();
