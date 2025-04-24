// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const WB061 = (() => {
	let slideQ = false,
		$;

	const UCPoller = (() => {
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'body',
			() => {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], init);
	})();

	function init(){
		utils.fullStory('WB061', 'Variation 1');
		//utils.events.send('WB061', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
		//utils.events.send('WB061', 'Click', 'Show mobile clicked', true);

		const cacheDom = (() => {
			//Cache useful selectors for later use
			const bodyVar = $('body');
			const URL = window.location.pathname;

			// Modal selectors
			let modal,
				markup;

			//const cm = require('cookieman');

			bodyVar.addClass('WB061 WB061Exit');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				URL: URL,
				modal: modal,
				markup: markup
			};
		})();

		const emailPost = {
			signUp(email){
				const location = window.location.href.match(/wolfandbadger.com\/([\w]{2})\/(.*)\//)[1];
				if (cm.get('csrftoken').length > 0) {
					window.jQuery.ajax({
						type: 'POST',
						url: 'https://www.wolfandbadger.com/' + location + '/newsletter/subscribe/?next=https://www.wolfandbadger.com/' + location + '/',
						data: {
							csrfmiddlewaretoken: cm.get('csrftoken')[0].value,
							email: email
						}
					});
				}
			},
			validateEmail($email) {
				var emailReg = /^([\w-\+\\\/\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
				return $email.length > 0 && emailReg.test($email);
			},
			submitClick(){
				const registerButton = cacheDom.modal.find('.WB061_cta');
				const registerEmail = cacheDom.modal.find('input');
				const error = cacheDom.modal.find('.WB061_error');

				registerButton.on('click', function () {
					if (emailPost.validateEmail(registerEmail.val()) === true) {
						error.fadeOut();
						utils.setCookie('WB061_email-signed-up', 'true', 20000000, 'www.wolfandbadger.com');
						utils.events.send('WB061', 'Click', 'Show mobile clicked', true, {sendOnce: true});
						emailPost.signUp(registerEmail.val());
						cacheDom.modal.addClass('WB061_success');

						setTimeout(function(){
							cacheDom.modal.fadeOut();
						},4000)
					} 
					else {
						error.fadeIn();
					}
				});
			}
		}

		const URLTest = {
			URLChecker(){
				if(cacheDom.URL.indexOf('/uk/category/women/clothing/dresses') > -1){
					cacheDom.markup = [
						'<div class="WB061_pop-up_modal">',
							'<div class="WB061_body_click"></div>',
							'<div class="WB061_inner_div">',
								'<a href="#" class="WB061_close_btn">X</a>',
								'<div class="WB061_overflow_fix">',
									'<div class="WB061_logo"><span>The world\'s best independent brands</span></div>',
									'<p>Before you go...</p>',
									'<p>Our independent brands only create collections in very limited quantities.<br /> You could be one of just a handful of people across<br /> the world wearing any piece you buy from us.</p>',
									'<p>Join our newsletter so you don\'t miss out.</p>',
									'<div class="WB061_signup-wrap">',
										'<input placeholder="Enter your email address" type="email" />',
										'<a class="WB061_cta">Tell me more</a>',
									'</div>',
									'<div class="WB061_error">Your email is incorrect please try again</div>',
								'</div>',
								'<div class="WB061_thank-you">',
									'<div>',
										'You have successfully signed up to our newsletter!',
									'</div>',
								'</div>',
							'</div>',
						'</div>'
					];
				}
				else if(cacheDom.URL.indexOf('/us') > -1){
					cacheDom.markup = [
						'<div class="WB061_pop-up_modal">',
							'<div class="WB061_body_click"></div>',
							'<div class="WB061_inner_div">',
								'<a href="#" class="WB061_close_btn">X</a>',
								'<div class="WB061_overflow_fix">',
									'<div class="WB061_logo"><span>The world\'s best independent brands</span></div>',
									'<p>Don\'t miss out...</p>',
									'<p>We connect you to over 600 independent designers from all over the world.</p>',
									'<p>Sign up to our newsletter to discover their beautiful<br /> products and hear their inspiring stories.</p>',
									'<div class="WB061_signup-wrap">',
										'<input placeholder="Enter your email address" type="email" />',
										'<a class="WB061_cta">Sign me up</a>',
									'</div>',
									'<div class="WB061_error">Your email is incorrect please try again</div>',
								'</div>',
								'<div class="WB061_thank-you">',
									'<div>',
										'You have successfully signed up to our newsletter!',
									'</div>',
								'</div>',
							'</div>',
						'</div>'
					];
				}
				else if(cacheDom.URL.indexOf('/uk/checkout/success') > -1){
					cacheDom.markup = [
						'<div class="WB061_pop-up_modal">',
							'<div class="WB061_body_click"></div>',
							'<div class="WB061_inner_div">',
								'<a href="#" class="WB061_close_btn">X</a>',
								'<div class="WB061_overflow_fix">',
									'<div class="WB061_logo"><span>The world\'s best independent brands</span></div>',
									'<p>Discover more beautiful fashion, homeware and gifts.</p>',
									'<p>Stay in the loop via our newsletter.</p>',
									'<div class="WB061_signup-wrap">',
										'<input placeholder="Enter your email address" type="email" />',
										'<a class="WB061_cta">Subscribe me</a>',
									'</div>',
									'<div class="WB061_error">Your email is incorrect please try again</div>',
								'</div>',
								'<div class="WB061_thank-you">',
									'<div>',
										'You have successfully signed up to our newsletter!',
									'</div>',
								'</div>',
							'</div>',
						'</div>'
					];
				}
				else if(cacheDom.URL.indexOf('/uk/category/women') > -1 && window.location.search.indexOf('new=') > -1){
					cacheDom.markup = [
						'<div class="WB061_pop-up_modal">',
							'<div class="WB061_body_click"></div>',
							'<div class="WB061_inner_div">',
								'<a href="#" class="WB061_close_btn">X</a>',
								'<div class="WB061_overflow_fix">',
									'<div class="WB061_logo"><span>The world\'s best independent brands</span></div>',
									'<p>Before you go...</p>',
									'<p>New products are added every day by our exciting emerging brands.</p>',
									'<p>Sign up to our newsletter to see them first.</p>',
									'<div class="WB061_signup-wrap">',
										'<input placeholder="Enter your email address" type="email" />',
										'<a class="WB061_cta">Sign me up</a>',
									'</div>',
									'<div class="WB061_error">Your email is incorrect please try again</div>',
								'</div>',
								'<div class="WB061_thank-you">',
									'<div>',
										'You have successfully signed up to our newsletter!',
									'</div>',
								'</div>',
							'</div>',
						'</div>'
					];
				}
				else if(cacheDom.URL.indexOf('/uk/category/women/jewellery/earrings') > -1){
					cacheDom.markup = [
						'<div class="WB061_pop-up_modal">',
							'<div class="WB061_body_click"></div>',
							'<div class="WB061_inner_div">',
								'<a href="#" class="WB061_close_btn">X</a>',
								'<div class="WB061_overflow_fix">',
									'<div class="WB061_logo"><span>The world\'s best independent brands</span></div>',
									'<p>Before you go...</p>',
									'<p>Join our mailing list to discover more beautiful and <br /> unique pieces that you won\'t find anywhere else. </p>',
									'<div class="WB061_signup-wrap">',
										'<input placeholder="Enter your email address" type="email" />',
										'<a class="WB061_cta">Stay in the loop</a>',
									'</div>',
									'<div class="WB061_error">Your email is incorrect please try again</div>',
								'</div>',
								'<div class="WB061_thank-you">',
									'<div>',
										'You have successfully signed up to our newsletter!',
									'</div>',
								'</div>',
							'</div>',
						'</div>'
					];
				}
				else if(cacheDom.URL.indexOf('/uk/category/women') > -1){
					cacheDom.markup = [
						'<div class="WB061_pop-up_modal">',
							'<div class="WB061_body_click"></div>',
							'<div class="WB061_inner_div">',
								'<a href="#" class="WB061_close_btn">X</a>',
								'<div class="WB061_overflow_fix">',
									'<div class="WB061_logo"><span>The world\'s best independent brands</span></div>',
									'<p>Before you go...</p>',
									'<p>Get exclusive event invites, the latest designer updates, plus early access<br /> to all our sales by signing up to our newsletter.</p>',
									'<div class="WB061_signup-wrap">',
										'<input placeholder="Enter your email address" type="email" />',
										'<a class="WB061_cta">Sign me up</a>',
									'</div>',
									'<div class="WB061_error">Your email is incorrect please try again</div>',
								'</div>',
								'<div class="WB061_thank-you">',
									'<div>',
										'You have successfully signed up to our newsletter!',
									'</div>',
								'</div>',
							'</div>',
						'</div>'
					];
				}
				else{
					cacheDom.markup = [
						'<div class="WB061_pop-up_modal">',
							'<div class="WB061_body_click"></div>',
							'<div class="WB061_inner_div">',
								'<a href="#" class="WB061_close_btn">X</a>',
								'<div class="WB061_overflow_fix">',
									'<div class="WB061_logo"><span>The world\'s best independent brands</span></div>',
									'<p>Before you go...</p>',
									'<p>We want you to meet the new independent brands<br /> creating ethical and unique designs.</p>',
									'<p>Stay in the loop by signing up to our newsletter</p>',
									'<div class="WB061_signup-wrap">',
										'<input placeholder="Enter your email address" type="email" />',
										'<a class="WB061_cta">Stay in the loop</a>',
									'</div>',
									'<div class="WB061_error">Your email is incorrect please try again</div>',
								'</div>',
								'<div class="WB061_thank-you">',
									'<div>',
										'You have successfully signed up to our newsletter!',
									'</div>',
								'</div>',
							'</div>',
						'</div>'
					];
				}
			}
		}

		const modal = {
			// Append modal to the body
			contentBuilder(){
				cacheDom.bodyVar.append(cacheDom.markup.join(''));

				cacheDom.modal = $(".WB061_pop-up_modal");
				cacheDom.modalBG = cacheDom.modal.find('.WB061_body_click');
			}
		}
		
		const elementBindings = {
			// Click function for the mobile tab variation to show the hidden options
			modalClickOn(){
				cacheDom.modal.find('.WB061_close_btn').on("click", function () {
					if (slideQ === false) {
						slideQ = true;
						cacheDom.modal.fadeOut("slow", function () {
							utils.events.send('WB061', 'Click', 'Modal closed', true, {sendOnce: true});
							cacheDom.modal.removeClass("active");
							slideQ = false;
						});
					}
				});
				cacheDom.modalBG.on("mousedown touchstart", function () {
					cacheDom.modal.fadeOut("slow", function () {
						cacheDom.modal.removeClass("active");
						cacheDom.bodyVar.off("mousedown");
						utils.events.send('WB061', 'Click', 'Modal closed', true, {sendOnce: true});
					});
				});
			}
		};

		const exitIntent = {
			// OuiBounce plugin
			ouiPlugin(){
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
			exitTrigger() {
				this.ouibounce(cacheDom.modal[0], { 
					cookieName: 'WB061Exit', 
					cookieDomain: 'wolfandbadger.com',
					/*aggressive: true, Testing property, if the cookie exists ignore it and show it everytime on exit */
					callback() { 
						if($('.uc9_lightbox').length > 0 && $('.uc9_lightbox').is(":hidden")){
							slideQ = true;
							cacheDom.modal.addClass('active').fadeIn(function(){
								slideQ = false;
							});
							cacheDom.bodyVar.addClass('WB061_scroll-off');
							utils.events.send('WB061ExitSurvey', 'Modal', 'Exit Intent has fired, Modal shown', true);
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

		// OUIBounce trigger
		exitIntent.ouiPlugin();
		exitIntent.exitTrigger();

		emailPost.submitClick();
	}	
})();