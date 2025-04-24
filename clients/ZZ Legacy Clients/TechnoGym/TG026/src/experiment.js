/*eslint-disable */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var _TG026 = (function () {
    // Triggers ------------------------------------
    // ---------------------------------------------
    var _triggers = (function () {
        UC.poller([
            function () {
                return !!window.jQuery;
            }
        ], function() {
					var $ = window.jQuery;

					// Ensure Magnific Popup is loaded before running experiment
					if ($.fn.magnificPopup) {
						activate();
					} else {
						$.get('https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js', activate);
					}
				});
    })();

    // Experiment -----------------------------------
    // ----------------------------------------------
    function activate() {
			utils.fullStory('TG026', 'Variation 1 Desktop');
			var $ = window.jQuery;
			var $body = $('body');
			var italyCheck = window.location.pathname.indexOf('/it/') > -1;
			var html;

			$body.addClass('TG026');

			if(italyCheck === true) {
				html = $([
					'<div class="TG026_wrapper">',
						'<img alt="Technogym" src="https://www.technogym.com/skin/frontend/technogym/default/images/technogym.png" />',
						'<h3 class="TG026_topHeader">Prima che tu vada</h3>',
						'<p>Hai bisogno di ulteriori informazioni o vuoi parlare con un nostro consulente Wellness?<br>Lascia i tuoi dati e sarai ricontattato.</p>',
						'<div class="TG026_contactForm_Wrapper">',
						'</div>',
					'</div>'
				].join(''));
			} else {
				html = $([
					'<div class="TG026_wrapper">',
						'<img alt="Technogym" src="https://www.technogym.com/skin/frontend/technogym/default/images/technogym.png" />',
						'<h3 class="TG026_topHeader">Before you go...</h3>',
						'<p>If you require any more information or you want to speak to one of our Wellness Consultants, please leave your details and we will contact you soon.</p>',
						'<div class="TG026_contactForm_Loader"><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span></div>',
						'<div class="TG026_contactForm_Wrapper">',
						'</div>',
					'</div>'
				].join(''));
			}

			var exitIntent = {
				// OuiBounce plugin
				ouiPlugin: function() {
					(function (root, factory) {
						root.ouibounce = factory();
						// if (typeof define === 'function' && define.amd) {
						// 	define(factory);
						// } else if (typeof exports === 'object') {
						// 	module.exports = factory(require, exports, module);
						// } else {
						// 	root.ouibounce = factory();
						// }
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
					this.ouibounce($body, { 
						cookieName: 'TG026', 
						cookieDomain: 'technogym.com',
						aggressive: true, /* Testing property, if the cookie exists ignore it and show it everytime on exit */
						callback: function() { 
							$.magnificPopup.open({
								items: {
									src: html,
									type: 'inline'
								} 
							});

							/*
							*	Amends 15/03/18
							*	Alter functionality of profile inputs
							*/
							personalSelect();  	
							businessSelect();
              freelanceSelect();
              
              removeDescriptions();

							utils.events.send('TG026', 'View', 'Exit intent modal shown');

							// Run test on exit intent
							//UC.poller(['.TG026_wrapper'], buildTestLogic);

							window.sessionStorage.setItem('TG026_exit-shown', 'true');
						} 
					});
				}  
			};

			exitIntent.ouiPlugin();
			exitIntent.exitTrigger();

			// Function to validate email
			function validateEmail(str) {
					var re = /((([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|("(([\x01-\x08\x0B\x0C\x0E-\x1F\x7F]|[\x21\x23-\x5B\x5D-\x7E])|(\\[\x01-\x09\x0B\x0C\x0E-\x7F]))*"))@(([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(\[(([\x01-\x08\x0B\x0C\x0E-\x1F\x7F]|[\x21-\x5A\x5E-\x7E])|(\\[\x01-\x09\x0B\x0C\x0E-\x7F]))*\])))/;
					return re.test(str);
			}
		
			function buildTestLogic() {
				// Retrieve the '#contactForm' on the 'contacts' page (originally that's where it would've linked clicking on the 'req a ctlg. button)
				var contactUrl = 'https://www.technogym.com/gb/contacts';
				if(italyCheck === true){
					contactUrl = 'https://www.technogym.com/it/contacts';
				}

				$.ajax({
					url: contactUrl,
					type: 'GET',
					dataType: 'html',
					success: function (data) {
						var $data = $(data);
						var $contactForm = $data.find('#contactForm');

						// Hide loader
						html.find('.TG026_contactForm_Loader').hide();

						if ($contactForm.length) {
							$contactForm.appendTo(html.find('.TG026_contactForm_Wrapper'));
							if (italyCheck) {
								html.find('.TG026_contactForm_Wrapper .buttons-set .button').text('Invia');
							} else {
								html.find('.TG026_contactForm_Wrapper .buttons-set .button').text('Send');
							}
							//$('#product-name, #product').val($('.product-name h1').text());

							setTimeout(function () {

								$contactForm.find('.select-profile .option:first input[type=radio]').trigger('click');
								$contactForm.find('.select-need select').val('tone_body');

								html.find('.TG026_contactForm_Wrapper input').on('focus', function(){
									var parent = $(this).closest('.field'),
										labelText = parent.find('label').text();

									utils.events.send('TG026', 'Form Field Focus', 'TG026 - ' + labelText, {sendOnce: true});
								});

								// Prepend * to every field and hide in CSS unless required
								var labels = html.find('.form-list > li label');
								labels.each(function() {
									if ($(this).children('em').length === 0) {
										$(this).prepend('<em>*</em>');
									}
								});

								// Set default required fields to match 'call'
								html
									.find('#telephone')
									.closest('.field')
									.children('label')
									.addClass('required');
								html
									.find('#comment')
									.closest('li')
									.children('label')
									.removeClass('required');

								html.find('.TG026_contactForm_Wrapper #reason').on('change', function(){
									utils.events.send('TG026', 'Form Field Interaction', 'TG026 - Select input change', {sendOnce: true});

									// Remove all old vaidation errors
									html.find('.TG026_required-error').remove();

									// Change form validation
									var val = this.selectedOptions[0].value;
									
									switch (val) {
										case 'call':
										html
											.find('#telephone')
											.closest('.field')
											.children('label')
											.addClass('required');
										html
											.find('#comment')
											.closest('li')
											.children('label')
											.removeClass('required');
										break;

										case 'quote':
										html
											.find('#comment')
											.closest('li')
											.children('label')
											.addClass('required');
										html
											.find('#telephone')
											.closest('.field')
											.children('label')
											.addClass('required');
										break;

										case 'mail':
										html
											.find('#comment')
											.closest('li')
											.children('label')
											.addClass('required');
										html
											.find('#telephone')
											.closest('.field')
											.children('label')
											.removeClass('required');
                    break;
                    
                    case 'assistance':
                    html
											.find('#telephone')
											.closest('.field')
											.children('label')
                      .removeClass('required');
                    break;
									}
								});

							
								
								//$contactForm.find('#comment').val('TG026 Exit Intent');
                /*
                *	Amends 15/03/18
                *	Alter functionality of profile inputs
                */
                personalSelect();  	
                businessSelect();
                freelanceSelect();
                removeDescriptions();
								
							}, 500);
							


						} else {
							return;
						}

						// Select profile functionality...
						(function () {
							var requiredNeeds = html.find('select.validate-select', '.select-need').clone();
							html.find('input.input-radio', '.select-profile').click(function () {
								var company, currentSelect, currentSelectId, id;
								id = $(this).attr("id");
								html.find('.select-need').find('.validation-advice').fadeOut();
								company = html.find('.field.company');
								if (id === "business") {
									if (!company.find('input').hasClass("required-entry")) {
										company.find('input').addClass("required-entry");
									}
									if (company.hasClass("hidden")) {
										company.removeClass("hidden");
									}
									if (html.find('.store-it_it').length > 0 && html.find('li.privacy').find('div:nth-child(2)').length > 0) {
										html.find('li.privacy').find('div:nth-child(2)').fadeOut();
									}
								} else {
									if (!company.hasClass("hidden")) {
										company.addClass("hidden");
									}
									if (company.find('input').hasClass("required-entry")) {
										company.find('input').removeClass("required-entry");
									}
									if (id === 'private') {
										if (html.find('.store-it_it').length > 0 && html.find('li.privacy').find('div:nth-child(2)').length > 0) {
											html.find('li.privacy').find('div:nth-child(2)').fadeIn();
										}
									} else {
										if (html.find('.store-it_it').length > 0 && html.find('li.privacy').find('div:nth-child(2)').length > 0) {
											html.find('li.privacy').find('div:nth-child(2)').fadeOut();
										}
									}
								}
								if (html.find('.select-need').hasClass("hidden")) {
									html.find('.select-need').removeClass("hidden");
								}
								html.find('.select-need .show-hide').each(function () {
									if ($(this).hasClass(id)) {
										if ($(this).hasClass("hidden")) {
											return $(this).removeClass("hidden");
										}
									} else {
										if (!$(this).hasClass("hidden")) {
											return $(this).addClass("hidden");
										}
									}
								});
								currentSelectId = $(this).attr('id');
								currentSelect = html.find('select.' + currentSelectId);
								return requiredNeeds.each(function () {
									var className, otherSelect, otherSelectName;
									className = this.className;
									if (className.indexOf(currentSelectId) >= 0) {
										if (className.indexOf('validate-select') >= 0) {
											if (!currentSelect.hasClass('validate-select')) {
												return currentSelect.addClass('validate-select');
											}
										}
									} else {
										otherSelectName = this.name.replace('need-', '');
										otherSelect = html.find('select.' + otherSelectName);
										if (otherSelect.hasClass('validate-select')) {
											return otherSelect.removeClass('validate-select');
										}
									}
								});
							});

							html.find('input[type="checkbox"]', '.private').click(function () {
								if (!html.find('.warn', '.private').is(':visible')) {
									return html.find('.warn', '.private').fadeIn();
								}
							});

							var passedValidation = function() {
								var passed = true;
								var errorMessages = (function() {
									if (italyCheck) {
										return {
											required: '<div class="TG026_required-error">Questo è un campo obbligatorio.</div>',
											email: '<div class="TG026_required-error">Inserire un indirizzo email valido. Per esempio johndoe@domain.com.</div>'
										};
									} else {
										return {
											required: '<div class="TG026_required-error">This is a required field.</div>',
											email: '<div class="TG026_required-error">Please enter a valid email address. For example johndoe@domain.com.</div>'
										};
									}
								})();

								// Fields
								var firstName = html.find('#name');
								var lastName = html.find('#last-name');
								var email = html.find('#email');
								var phone = html.find('#telephone');
								var message = html.find('#comment');

								// Remove all old vaidation errors
								html.find('.TG026_required-error').remove();

								// First name
								if (!firstName.val()) {
									passed = false;
									firstName.closest('.field').find('input').after(errorMessages.required);
								}

								// Last name
								if (!lastName.val()) {
									passed = false;
									lastName.closest('.field').find('input').after(errorMessages.required);
								}

								// Email
								if (!email.val()) {
									passed = false;
									email.closest('.field').find('input').after(errorMessages.required);
								} else if (!/\S+@\S+\.\S+/.test(email.val())) {
									passed = false;
									email.closest('.field').find('input').after(errorMessages.email);
								}

								// Phone number
								if (!phone.val() && phone.closest('.field').children('label').hasClass('required')) {
									passed = false;
									phone.closest('.field').find('input').after(errorMessages.required);
								}

								// Message
								if (!message.val() && message.closest('li').children('label').hasClass('required')) {
									passed = false;
									message.closest('li').find('.input-box').after(errorMessages.required);
								}

								return passed;
							};

							// Submit form validation
							html.find('#contactForm button[type="submit"]').click(function (e) {
								e.preventDefault();

								if (passedValidation()) {
									html.find('#contactForm').submit();
									utils.events.send('TG026', 'Click', 'TG026 - Submit Form', {sendOnce: true});
								}
							});

							html.find('input', '#contact-form').mouseout(function () {
								if ($(this).val() !== "") {
									return $(this).parent().find('.validation-advice:not(#advice-validate-email-email)').fadeOut();
								}
							});
						})();
						html.find('.TG026_contactForm_Wrapper .terms-privacy input').prop('checked', true);
						if(italyCheck === true){
							html.find('.TG026_contactForm_Wrapper .wide.privacy').before('<p class="TG026_privacy-header">Acconsento al trattamento dei miei dati personali per finalità di comunicazioni promozionali di cui al punto 3.d) della <a href="https://www.technogym.com/it/privacy-policy/">Privacy Policy</a></p>');
						}
						else{
							html.find('.TG026_contactForm_Wrapper .wide.privacy').before('<p class="TG026_privacy-header">By continuing, you agree to the <a href="https://www.technogym.com/gb/terms-of-use/">Technogym Terms of Use</a> and <a href="https://www.technogym.com/gb/privacy-policy/">Privacy Policy</a></p>');
            }
					}
				});
			} // buildTestLogic


			/*
			*	14/03/18 - Amends
			*/
			function personalSelect() {
				var personalBtn = document.querySelector('.TG026_contactForm_Wrapper form#contactForm ul.form-list li.select-profile .option input#private');
				var messageBox = document.querySelector('.TG026_contactForm_Wrapper form#contactForm ul.form-list li.comment .input-box textarea');
				var selectOptions = document.querySelector('.TG026_contactForm_Wrapper form#contactForm ul.form-list li.select-need div.wide:first-of-type select.show-hide');
				if (personalBtn) {
          personalBtn.checked = false;
					personalBtn.addEventListener('click', function() {
						selectOptions.options[1].selected=true;
						selectOptions.classList.add('tg26-hidden');
						messageBox.setAttribute('placeholder', '');
					});
        } 
        
        // Untick Ts & Cs box
        const tcBox = document.querySelector('.TG026_contactForm_Wrapper form#contactForm ul.form-list li.privacy .input-box input[type="checkbox"]');
        if (tcBox) {
          tcBox.checked = false; 
        }
			}

			function businessSelect() {
				var businessBtn = document.querySelector('.TG026_contactForm_Wrapper form#contactForm ul.form-list li.select-profile .option input#business');
				var marketSelect = document.querySelector('.TG026_contactForm_Wrapper form#contactForm ul.form-list li.select-need > div.field select.business');
				var companyInput = document.querySelector('.TG026_contactForm_Wrapper form#contactForm ul.form-list li.select-need > div.field.company input#company');
				var messageBox = document.querySelector('.TG026_contactForm_Wrapper form#contactForm ul.form-list li.comment .input-box textarea');
				var message = 'Please let us know what industry you are in and what your company name is…';
				if (businessBtn) {
          businessSelect.checked = false;
					businessBtn.addEventListener('click', function() {
						marketSelect.classList.add('tg26-hidden');
						companyInput.classList.add('tg26-hidden');
						// messageBox.setAttribute('placeholder', message);
					});
				} 
			}
			

			function freelanceSelect() {
				var freelanceBtn = document.querySelector('.TG026_contactForm_Wrapper form#contactForm ul.form-list li.select-profile input#freelance');
				var freelanceSelect = document.querySelector('.TG026_contactForm_Wrapper form#contactForm ul.form-list li.select-need select.freelance');
        var messageBox = document.querySelector('.TG026_contactForm_Wrapper form#contactForm ul.form-list li.comment .input-box textarea');
        var messageLabel = document.querySelector('.TG026_contactForm_Wrapper form#contactForm ul.form-list li.comment label');
				if (freelanceBtn) {
          freelanceBtn.checked = false;
					freelanceBtn.addEventListener('click', function() {
						freelanceSelect.options[5].selected=true;
						freelanceSelect.classList.add('tg26-hidden');
						messageBox.setAttribute('placeholder', '');
					});
				} 
        if (messageBox) { 
          messageBox.classList.add('required-entry');
          messageLabel.classList.add('required');
        }
      }
      
			/*
			*	End of amends 14/03/18
      */

      /*
      * Start of amends 16/04/18
      */
      function removeDescriptions() {
        const descriptions = document.querySelectorAll('.TG026_wrapper .TG026_contactForm_Wrapper .form-list li .option > div');
        for (let i = 0; descriptions.length > i; i++) {
          descriptions[i].classList.add('tg26-hide-description');
        }
        // Add Message field input placeholder
        const messageBox = document.querySelector('.TG026_contactForm_Wrapper form#contactForm ul.form-list li.comment .input-box textarea');
        // messageBox.setAttribute('placeholder', 'Leave us your message');
      }
      /*
      * End of amends 16/04/18
      */

      /*
      * Start of amends 23/04/18 
      */
      

			// Load form before exit intent to avoid loader
			buildTestLogic();
			

			utils.events.send('TG026', 'Page View', 'TG026 - Desktop Contact Form Lightbox', {sendOnce: true});

      $body.addClass('TG026');
    } // activate

})(); // _TG026