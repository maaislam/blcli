// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import formHTML from './lib/formHTML.js';

var AC005V2 = (function() {
	var JQ = window.jQuery,
		trackerName,
		slideQ = false;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'.contact-link.contact-option-container',
			'.contact-link.contact-option-container[data-action="telfax"]',
			function () {
				if (window.jQuery) {
					return true;
				}
			}
		], init);
	})();

	function init(){
		utils.fullStory('AC005', 'Variation 2');

		var cookieGet = (function(){
			return function (name) {
				var match = document.cookie.match(name+'=([^;]*)');
				return match ? match[1] : undefined;
			}
		})();

		var cacheDom = (function() {
			//Cache useful selectors for later use
			var bodyVar = JQ('body'),
				URL = window.location.href;

			// Phone number element
			var agencyRow = JQ('.agency-result'),
				displayPhoneBtn = agencyRow.find('.contact-link.contact-option-container[data-action="telfax"]'),
				displayWesbiteBtn = agencyRow.find('.contact-link.contact-option-container[data-action="website"]'),
				displayEmail = agencyRow.find('.contact-link.contact-option-container[data-action="email"]'),
				contactForm,
				contactInnerWrap,
				questionAnswerWrap,
				teleSubmit,
				teleInput,
				customFormWrap,
				customWebsiteWrap,
				popOutTitle,
				origForm = JQ('#contact-form-container');
			
			var cookieCheck = cookieGet('rememberedContactDetails');

			if(cookieCheck !== undefined){
				var decodeCookie = JSON.parse(decodeURIComponent(cookieCheck));
			}
			
			bodyVar.addClass('AC005');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				URL: URL,
				agencyRow: agencyRow,
				displayPhoneBtn: displayPhoneBtn,
				decodeCookie: decodeCookie,
				contactForm: contactForm,
				contactInnerWrap: contactInnerWrap,
				questionAnswerWrap: questionAnswerWrap,
				teleSubmit: teleSubmit,
				teleInput: teleInput,
				popOutTitle: popOutTitle,
				cookieCheck: cookieCheck,
				displayWesbiteBtn: displayWesbiteBtn,
				customWebsiteWrap: customWebsiteWrap,
				displayEmail: displayEmail,
				origForm: origForm
			};
		})();

		var createNumberSlideIn = {
			contentBuilder: function(){
				JQ('.main-container').after(formHTML);

				cacheDom.customFormWrap = JQ('.AC005_number-form');
				cacheDom.customWebsiteWrap = JQ('.AC005_website-form');
				cacheDom.popOutTitle = cacheDom.customFormWrap.find('h2');
			}
		}

		function redirect() {
			var fallback = (function() {
				var t;
				$(window).blur(function() {
					clearTimeout(t);
				});
				t = setTimeout(function() {
					JQ('.AC005_redirect-now').fadeIn();
				}, 1000);
			}());
		}

		var elementBindings = {
			// Click function for the mobile tab variation to show the hidden options
			displayPhoneClick: function(){
				cacheDom.displayPhoneBtn.on('click', function(e){
					var el = JQ(this);
					cacheDom.origForm.hide();

					// Check if the cookie exists again and update cached var
					cacheDom.cookieCheck = cookieGet('rememberedContactDetails');
					if(cacheDom.cookieCheck !== undefined){
						cacheDom.decodeCookie = JSON.parse(decodeURIComponent(cacheDom.cookieCheck));
					}
					// Send GA Event
					utils.events.send('AC005V2', 'Click', 'Show mobile clicked', true);
					// If the cookie exists and has a company name then don't ask for company name
					if(cacheDom.cookieCheck !== undefined){
						if(cacheDom.decodeCookie.userDetails.companyName !== null || cacheDom.bodyVar.hasClass('AC005_set-company-cookie')){
							cacheDom.bodyVar.addClass('AC005_company-cookie');
							cacheDom.popOutTitle.text('Contact Details:');

							UC.poller([
								'.inner-contact-body .telephone-link',
								function () {
									if (window.jQuery) {
										return true;
									}
								}
							], function(){
								cacheDom.bodyVar.addClass('AC005_form-visible');
								JQ('.AC005_number')
									.text(JQ('.inner-contact-body .telephone-link').text())
									.addClass('AC005_deblur');
							});
						}
						// If the cookie doesn't exist, set up polling for the input fields that is hidden on the website, then display the popup when they are created
						else{
							cacheDom.bodyVar.removeClass('AC005_company-cookie');
							cacheDom.popOutTitle.text('Just a Moment...');
							UC.poller([
								'.inner-contact-body #contact-form',
								'.inner-contact-body #contact-form input[type="submit"]',
								function () {
									if (window.jQuery) {
										return true;
									}
								}
							], function(){
								cacheDom.bodyVar.addClass('AC005_form-visible');
							});
						}
					}
					else{
						cacheDom.bodyVar.removeClass('AC005_company-cookie');
						cacheDom.popOutTitle.text('Just a Moment...');
						UC.poller([
							'.inner-contact-body #contact-form',
							'.inner-contact-body #contact-form input[type="submit"]',
							function () {
								if (window.jQuery) {
									return true;
								}
							}
						], function(){
							cacheDom.bodyVar.addClass('AC005_form-visible');
						});
					}
				});
			},
			showMobileClick: function(){
				// When the user clicks show number
				cacheDom.customFormWrap.find('.AC005_submit').on('click', function(e){
					e.preventDefault();

					// Cache relevant objects to use for validation
					var el = JQ(this),
						elParent = el.closest('.AC005_contact-form'),
						elInput = elParent.find('input[type="text"]'),
						elError = elParent.find('.AC005_error'),
						elVal = elInput.val();

					// Check if input is empty
					if(elVal == ''){
						elError.slideDown();
					}
					// If it isn't empty pass validation
					else{
						elError.slideUp();
						JQ('.inner-contact-body #contact-form input[type="text"]').val(elVal);
						JQ('.inner-contact-body #contact-form input[type="submit"]').click();
						utils.events.send('AC005V2', 'Company entered', 'Entered company info and clicked show', true);
					 	
						// Poll for telephone number 
						UC.poller([
							'.inner-contact-body .telephone-link',
							function () {
								if (window.jQuery) {
									return true;
								}
							}
						], function(){
							cacheDom.bodyVar.addClass('AC005_set-company-cookie');
							JQ('.AC005_number')
								.text(JQ('.inner-contact-body .telephone-link').text())
								.addClass('AC005_deblur');
						});	
					}
				});
			},
			showWebsiteClick: function(){
				// Show website form on click
				cacheDom.displayWesbiteBtn.on('click', function(e){
					var el = JQ(this);
					cacheDom.origForm.hide();
					
					cacheDom.cookieCheck = cookieGet('rememberedContactDetails');
					if(cacheDom.cookieCheck !== undefined){
						cacheDom.decodeCookie = JSON.parse(decodeURIComponent(cacheDom.cookieCheck));
					}

					utils.events.send('AC005V2', 'Click', 'Go to website clicked', true);

					// If cookie check is true, show redirect text instead of form
					if(cacheDom.cookieCheck !== undefined){
						if(cacheDom.decodeCookie.userDetails.companyName !== null || cacheDom.bodyVar.hasClass('AC005_set-company-cookie')){
							cacheDom.bodyVar.addClass('AC005_company-cookie');
							cacheDom.popOutTitle.text('Contact Details:');

							
							cacheDom.bodyVar.addClass('AC005_website-visible AC005_website-redirect');
							UC.poller([
								'.inner-contact-body #contact-website-redirect-button',
								function () {
									if (window.jQuery) {
										return true;
									}
								}
							], function(){
								JQ('.AC005_redirect-now a').attr('href', JQ('#contact-website-redirect-button').attr('href'))
								redirect();
							});
						}
						else{
							cacheDom.bodyVar.removeClass('AC005_company-cookie');
							cacheDom.popOutTitle.text('Just a Moment...');
							UC.poller([
								'.inner-contact-body #contact-form',
								'.inner-contact-body #contact-form input[type="submit"]',
								function () {
									if (window.jQuery) {
										return true;
									}
								}
							], function(){
								cacheDom.bodyVar.addClass('AC005_website-visible');
							});
						}
					}
					else{
						cacheDom.bodyVar.removeClass('AC005_company-cookie');
						cacheDom.popOutTitle.text('Just a Moment...');
						UC.poller([
							'.inner-contact-body #contact-form',
							'.inner-contact-body #contact-form input[type="submit"]',
							function () {
								if (window.jQuery) {
									return true;
								}
							}
						], function(){
							cacheDom.bodyVar.addClass('AC005_website-visible');
						});
					}
				});
			},
			redirectToWebsiteClick: function() {
				cacheDom.customWebsiteWrap.find('.AC005_submit').on('click', function (e) {
					e.preventDefault();
					var el = JQ(this),
					    elParent = el.closest('.AC005_contact-form'),
					    elInput = elParent.find('input[type="text"]'),
					    elError = elParent.find('.AC005_error'),
					    elVal = elInput.val();

					utils.events.send('AC005V2', 'Click', 'Website link clicked', true);
					if (cacheDom.cookieCheck !== undefined) {
						if (cacheDom.decodeCookie.userDetails.companyName !== null || cacheDom.bodyVar.hasClass('AC005_set-company-cookie')) {
							
						} else {
							if (elVal == '') {
								elError.slideDown();
							} else {
								elError.slideUp();
								JQ('.inner-contact-body #contact-form input[type="text"]').val(elVal);
								JQ('.inner-contact-body #contact-form input[type="submit"]').click();
							}
						}
					} else {
						if (elVal == '') {
							elError.slideDown();
						} else {
							elError.slideUp();
							JQ('.inner-contact-body #contact-form input[type="text"]').val(elVal);
							JQ('.inner-contact-body #contact-form input[type="submit"]').click();
						}
					}
				});
			},
			hidePopout: function(){
				JQ('.AC005_body-cover, .AC005_form-close').on('click', function(e){
					e.preventDefault();
					// Remove classes that are used for animation and conditionally opening and closing
					cacheDom.bodyVar.removeClass('AC005_form-visible AC005_website-visible');
					// Check if content has been hidden based on cookies, then remove class after the popout has been hidden
					if(cacheDom.bodyVar.hasClass('AC005_website-redirect') || cacheDom.bodyVar.hasClass('AC005_company-cookie')){
						setTimeout(function(){
							cacheDom.bodyVar.removeClass('AC005_website-redirect AC005_company-cookie');
						}, 500);
					}
					
					utils.events.send('AC005V2', 'Click', 'Closed popout window', true);
				});
			},
			emailClick: function(){
				cacheDom.displayEmail.on('click', function(){
					cacheDom.origForm.show();
				});
			}
		};

		// Build new markup
		createNumberSlideIn.contentBuilder();

		// Bind click events
		elementBindings.displayPhoneClick();
		elementBindings.showMobileClick();
		elementBindings.showWebsiteClick();
		elementBindings.redirectToWebsiteClick();
		elementBindings.hidePopout();
		elementBindings.emailClick();
	};
})();