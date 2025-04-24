import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as lightboxmarkup from './lib/lightbox.js';

// ID - Experiment Title
const PJ001 = (() => {

	// Experiment code
	const activate = () => {
		const $ = window.jQuery,
			  $body = $('body');
		$body.addClass('PJ001');

		utils.events.send('PJ001', 'PJ001', 'PJ001 - V1', {
			sendOnce: true
		}); 

		//check voucher code exists
		$.ajax({
			url: '/basket-confirmation.aspx',
			type: 'GET',
			success: function(data) {
				var $promoInput = $(data).find('#ctl00_cphBody_txtPromocode');
				if ($promoInput.length) {
					if($promoInput.val() === 'NPJ50OFF15'){
						utils.events.send('PJ001 - Deals Lightbox', 'Promo Exists', 'PJ001 Promo has already been added', {
							sendOnce: true
						}); 
						localStorage.setItem('PJ1-codeApplied', 1);
					}
				}
			}
		});

		//if basket is not empty, run the exit intent, add the lightbox to the page
		const basketAmount = parseFloat($('#ctl00__objHeader_lbBasketItem').text());
		if(!utils.getCookie('PJ001')){
		if(basketAmount > 0 && !localStorage.getItem('PJ1-codeApplied')){
			const $lightbox = lightboxmarkup.lightBoxhtml;
			$lightbox.prependTo($body);  
			exitIntent();
		}else{
			return;
		}
		}

			//inner lightbox functions
		function PJPopUp() {
			const $lightboxHTML = lightboxmarkup.lightBoxhtml;
			$lightboxHTML.prependTo($body);
			$lightboxHTML.addClass('PJ001-lightbox_active');
			const bannerUrl = '/promocodesetter.aspx?promocode=NPJ50OFF15';

			$lightboxHTML.find('a').attr('href', bannerUrl);
			
			//remove the lightbox, set the cookie that it has been seen
			function closeLightbox() {
				$lightboxHTML.removeClass('PJ001-lightbox_active');
				utils.setCookie('PJ001-lightbox', 'true');
				utils.events.send('PJ001 - Deals Lightbox', 'Lightbox exit', 'PJ001 Lightbox closed', {
					sendOnce: true
				});
			}

			//on background/exit click then close the lightbox
			$lightboxHTML.find('.PJ001-lightboxExit', '.PJ001-lightboxfade').click(function () {
				closeLightbox();
			});
			$('.PJ001-lightboxfade').click(function () {
				closeLightbox();
			});

			//apply deal event
			$lightboxHTML.find('a').click(function(){
				utils.events.send('PJ001 - Deals Lightbox', 'Deal click', 'PJ001 clicked button to apply deal', {
					sendOnce: true
				});
			});

		}

		//Exit intent plugin
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
							function fire() {
								if (isDisabled()) { return; }

								if (el) { $(el).fadeIn(); }

								callback();
								disable();
							}

							function disable(custom_options) {
								var options = custom_options || {};

								if (typeof options.cookieExpire !== 'undefined') {
									cookieExpire = setDefaultCookieExpire(options.cookieExpire);
								}

								if (options.sitewide === true) {
									sitewide = ';path=/';
								}
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
					this.ouibounce(lightboxmarkup.lightBoxhtml, {
						cookieName: 'PJ001',
						cookieDomain: 'papajohns.co.uk',
						callback: function () {
							PJPopUp();
							utils.events.send('PJ001 - Deals Lightbox', 'Lightbox shown', 'PJ001 Lightbox shown', {
								sendOnce: true
							}); 
						}
					});
				}
			}
			exitIntent.ouiPlugin();
			exitIntent.exitTrigger(); 

		}

	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('PJ001', 'Variation 1');

		UC.poller(['#ctl00__objHeader_lbBasketItem'], activate);
	})();

})();
