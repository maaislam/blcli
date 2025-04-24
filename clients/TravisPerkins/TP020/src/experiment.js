import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var _TP020 = (function () {
	
	// Triggers ------------------------------------
	// ---------------------------------------------
	var _triggers = (function () {
		UC.poller([
			function () {
				return !!window.jQuery;
			}
		], function () {
			var $ = window.jQuery;

			// Prevent script from running twice on same page
			if ($('body').hasClass('TP020')) {
				return false;
			} else {
				utils.fullStory('TP020', 'Variation 1');

				// Ensure Magnific Popup is loaded before running experiment
				if ($.fn.magnificPopup) {
					activate();
				} else {
					$.get('https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js', activate);
				}
			}
		});
	})();


	// Experience  ---------------------------------
	// ---------------------------------------------
	function activate() {
		var $ = window.jQuery;
		var $body = $('body');
		$body.addClass('TP020');

		/* Store data for forms in here if AJAX request has already
		been made */
		var cachedForms = {};

		/* Functions for pulling in Login/Register forms and storing them in
		cachedForms object */
		function ajaxLoginForm(deferred) {
			$.ajax({
				url: '/login',
				type: 'GET',
				dataType: 'html',
				success: function (data) {
					var $data = $(data);
					var $form = $data.find('#loginForm');
					if ($form.length) {
						cachedForms.login = $form;
					}
					deferred.resolve();
				},
				error: function () {
					console.error('TP020 - AJAX /login failed');
				}
			});
		}

		function ajaxRegisterForm(deferred) {
			$.ajax({
				url: '/register',
				type: 'GET',
				dataType: 'html',
				success: function (data) {
					var $data = $(data);
					var $form = $data.find('#registerExistingAccountForm');
					if ($form.length) {
						cachedForms.register = $form;
					}
					deferred.resolve();
				},
				error: function () {
					console.error('TP020 - AJAX /register failed');
				}
			});
		}

		/* Functions to make AJAX requests with deferred objects, so we can build
		the lightbox when both requests have been completed */
		var getLoginForm = function () {
			var deferred = new $.Deferred();
			ajaxLoginForm(deferred);
			return deferred;
		};

		var getRegisterForm = function () {
			var deferred = new $.Deferred();
			ajaxRegisterForm(deferred);
			return deferred;
		};

		/* Function to build the modal with magnific popup, passing the login form and
		register form HTML as parameters. Every time a modal is closed with magnific
		the HTML is destroyed, so this function will run on every click to rebuild it */
		var buildLightbox = function ($loginForm, $registerForm) {
			// Create base HTML template
			var $html = $([
				'<div class="TP020_modal">',
					'<div class="TP020_modal__form TP020_modal__login">',
						'<h3 class="TP020_modal_login_title">Got an online account?</h3>',
						'<p class="TP020_modal_login_descp">Log in to your online account</p>',
					'</div>',
					'<div class="TP020_modal__form TP020_modal__register TP020_modal__register--home TP020_show">',
						'<h3 class="TP020_modal_register_title">Link your offline account, <span>online</span></h3>',
						'<p class="TP020_modal_description">',
							'Have an account with us already in one of our branches? Link it online to see your trade prices.',
						'</p>',
						'<ul class="TP020_modal_list">',
							'<li><p>Online prices will reflect your trade pricing terms as agreed with your branch</p></li>',
							'<li><p>View real-time stock levels for any branch</p></li>',
						'</ul>',
						'<p class="TP020_modal_description">',
							'To register your Travis Perkins account online, you need to enter a security code via email or SMS.',
						'</p>',
						'<p class="TP020_modal_description">',
							'Call our customer services team on <b>0330 123 3846</b> to receive your security code.',
							'You will need your account information to hand. This takes just 2 minutes.',
						'</p>',
						'<p class="TP020_modal_description">',
							'Mon to Fri 8am - 6pm, Sat 9am - 12pm, Sun Closed',
						'</p>',
						'<div class="TP020_continue-wrap">',
							'<span id="TP020_continue">Enter your Security Code</span>',
						'</div>',
					'</div>',
					'<div class="TP020_modal__form TP020_modal__register TP020_modal__register--hasCode"></div>',
					'<div class="TP020_modal__form TP020_modal__register TP020_modal__register--noCode"></div>',
				'</div>'
			].join(''));

			// Append forms to HTML template
			$loginForm.appendTo($html.find('.TP020_modal__login'));
			$registerForm.appendTo($html.find('.TP020_modal__register--hasCode'));

			// Continue button functionality
			$html.find('#TP020_continue').on('click', function() {
				$html.find('.TP020_modal__register--home').removeClass('TP020_show');
				$html.find('.TP020_modal__register--hasCode').addClass('TP020_show');
			});

			// Back button
			var $back = $('<div class="TP020_close"><i class="arrow_left"></i>BACK</div>');
			$back.appendTo($html.find('.option-with-code-content'));
			$back.on('click', function() {
				$html.find('.TP020_modal__register--hasCode').removeClass('TP020_show');
				$html.find('.TP020_modal__register--home').addClass('TP020_show');
			});

			// Add icons to the email and password inputs + placeholders
			var $emailFind = $html.find('.TP020_modal__login').find('#loginForm').find('.input');
			var $emailIcon = $('<div class="TP020_email_icon"></div>');
			$emailIcon.prependTo($emailFind.first());
			var $passwordIcon = $('<div class="TP020_password_icon"></div>');
			$passwordIcon.prependTo($emailFind.eq(1));

			$html.find('#j_username').attr('placeholder','Email Address');
			$html.find('#j_password').attr('placeholder','Password');
			$html.find('#accountNumber').attr('placeholder','Account no');
			$html.find('#securityCode').attr('placeholder','Security code');

			// Add title to no code button
			var $noCodeContent = $html.find('#registerExistingAccountForm').find('.option-without-code-content').find('.content');
			var $noCodeHeader = (function () {
				if ($noCodeContent.find('.TP020_nocode_header').length) {
					return $noCodeContent.find('.TP020_nocode_header');
				} else {
					return $('<h1 class="TP020_nocode_header">I don\'t have a security code...</h1>');
				}
			})();
			$noCodeHeader.prependTo($noCodeContent);

			// Add title to code button
			var $codeContent = $html.find('#registerExistingAccountForm').find('.option-with-code-content').find('.content');
			var $codeHeader = (function () {
				if ($codeContent.find('.TP020_withcode_header').length) {
					return $codeContent.find('.TP020_withcode_header');
				} else {
					return $('<h1 class="TP020_withcode_header">I have a security code...</h1>');
				}
			})();
			$codeHeader.prependTo($codeContent);

			// Register Existing Account Form
			var $form = $html.find('#registerExistingAccountForm');

			// Rebuild tooltip functionality
			var $tooltips = $form.find('.info-tooltip');

			$tooltips.each(function () {
				var $el = $(this);
				var $content = $el.find('.info-tooltip-message');

				$el.hover(function () {
					$content.show();
				}, function () {
					$content.hide();
				});
			});

			// Move tooltips
			$form.find('.label-and-input').each(function () {
				var $el = $(this);
				var $tooltip = $el.find('.info-tooltip');
				if ($tooltip.length) {
					$tooltip.insertAfter($el.children('.label'));
				}
			});

			// Email must be an email and not empty field
			$html.find('#j_username').on('input', function() {
				var input=$(this);
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				var is_email=re.test(input.val());
				if(is_email){input.removeClass("invalid").addClass("valid");}
				else{input.removeClass("valid").addClass("invalid");}
			});

			// To verify password field is not empty
			$html.find('#j_password').on('input', function() {
				var $input = $(this);
				var val = $input.val();
				if (val.length) {
					$input.removeClass("invalid").addClass('valid');
				} else {
					$input.removeClass('valid').addClass("invalid");
				}
			});
			
			var $findInput = $html.find('#loginForm').find('.input');

			var $addSpans = $([
				'<span class="validation_error"></span>',
				'<span class="empty_error"></span>'
			].join(''));
			$addSpans.appendTo($findInput);

			// Form Submission Validation
			$html.find(".login_button").click(function (event) {
				event.preventDefault();
				var form_data = $html.find("#loginForm").serializeArray();
				var error_free = true;
				for (var input in form_data) {
					// Skip input validation if CSRFToken
					if (form_data[input].name === 'CSRFToken') continue;
					var element = $html.find('#' + form_data[input]['name']);
					var valid = element.hasClass("valid");
					var error_element = $("span", element.parent());
					error_element.hide();
					// Error display logic
					if (!valid && element.val()) {
						error_free = false;
						if (error_element.eq(0).hasClass('validation_error')) {
							error_element.eq(0).show();
							if (form_data[input].name === 'j_username') {
								error_element.eq(0).html("Please enter a valid email address");
							}
						}
					}
					else if (!valid && !element.val()) {
						error_free = false;
						if (error_element.eq(1).hasClass('empty_error')) {
							error_element.eq(1).show();
							if (form_data[input].name === 'j_username') {
								error_element.eq(1).html("Please enter an email address");
							}
							if (form_data[input].name === 'j_password') {
								error_element.eq(1).html("Please enter your password");
							}
						}
					}
				}
				if (error_free) {
					$html.find('#loginForm').submit();
				}
			});

			// Error messages
			var $inputs = $html.find('#accountNumber, #securityCode');

			$inputs.each(function(i) {
				var $input = $(this);
				var $errorElement = $('<p class="accValidationMsg" style="display:none;"></p>');
				if (i === 0) {
					$errorElement.html("Please enter your account number");
					$errorElement.insertAfter($input);
				}
				else if (i === 1) {
					$errorElement.html("Please enter your security code");
					$errorElement.insertAfter($input);
				}

				$input.on('input', function() {
					var val = $input.val();
					if (val.length) {
						$input.removeClass("invalid").addClass('valid');
						$errorElement.hide();
					} else {
						$input.removeClass('valid').addClass("invalid");
						$errorElement.show();
					}
				});
			});

			// Form Submission Validation
			$html.find("#registerExistingAccountForm .navigation-button-container .button").click(function (event) {
				event.preventDefault();

				var form_data = $html.find("#registerExistingAccountForm").serializeArray();
				var noError = true;
				for (var input in form_data) {
					// Skip input validation if CSRFToken
					if (form_data[input].name === 'CSRFToken' ||
						form_data[input].name === 'secureCodeGroup') continue;
					var element = $html.find('#' + form_data[input]['name']);
					var valid = element.hasClass("valid");

					if (!valid && !element.val()) {
						element.addClass('invalid');
						noError = false;
						element.next('.accValidationMsg').show();
					}
					else if (!valid) {
						noError = false;
					}
				}
				if (noError) {
					$html.find('#registerExistingAccountForm').submit();
				}
			});

			// Style changes
			$html.find('.login_button').html("LOGIN");
			$html.find('.navigation-button-container button').html("NEXT<i class='arrow_right'></i>");

			// Recreate table and style it accordingly
			var $tableRecreate = $([
				'<table class="TP020_timetable">',
				'<tr>',
				'<td colspan="2">Customer services opening hours</td>',
				'<tr>',
				'<tr>',
				'<td>Monday</td>',
				'<td>08:00 - 18:00</td>',
				'</tr>',
				'<tr>',
				'<td>Tuesday</td>',
				'<td>08:00 - 18:00</td>',
				'</tr>',
				'<tr>',
				'<td>Wednesday</td>',
				'<td>08:00 - 18:00</td>',
				'</tr>',
				'<tr>',
				'<td>Thursday</td>',
				'<td>08:00 - 18:00</td>',
				'</tr>',
				'<tr>',
				'<td>Friday</td>',
				'<td>08:00 - 18:00</td>',
				'</tr>',
				'<tr>',
				'<td>Saturday</td>',
				'<td>09:00 - 12:00</td>',
				'</tr>',
				'<tr>',
				'<td>Sunday</td>',
				'<td>Closed</td>',
				'</tr>',
				'</table>'
			].join(''));

			var $tableRecreateTool = (function () {
				if ($html.find('.TP020_timetable').length) {
					return $html.find('.TP020_timetable');
				} else {
					return $tableRecreate;
				}
			})();
			$tableRecreateTool.insertAfter($html.find('.tel_number'));

			// Open popup
			$.magnificPopup.open({
				items: {
					src: $html,
					type: 'inline'
				},
				callbacks: {
					open: function() {
						utils.events.send('TP020', 'show', 'lightbox shown', {sendOnce: true});    
						$('html').addClass('TP020_noscroll');
						$('body').addClass('TP020_noscroll');
					},
					close: function() {
						$('html').removeClass('TP020_noscroll');
						$('body').removeClass('TP020_noscroll');
					}
				}
			});
		};

		/* When user clicks login link, build a lightbox using the form HTML.
		If this is the first time, make AJAX requests to pull in the login and register forms */
		$('a[href="/login"]').on('click', function (e) {
			// Prevent default behaviour of the link (redirecting to page)
			e.preventDefault();

			/* If forms are cached, used those instead of making another
			AJAX request */
			if (cachedForms.login && cachedForms.register) {
				buildLightbox(cachedForms.login, cachedForms.register);
			} else {
				$.when(getLoginForm(), getRegisterForm()).done(function () {
					/* Both forms have been successfully pulled in,
					it's now safe to build the lightbox */
					buildLightbox(cachedForms.login, cachedForms.register);
				});
			}
		});
		
		/* Event tracking */
		$(document).on('click', '.TP020_modal .login_button', function() {
			utils.events.send('TP020', 'click', 'clicked login', {sendOnce: true});
		});
		$(document).on('click', '.TP020_modal #optionWithCode', function() {
			utils.events.send('TP020', 'click', 'clicked has security code', {sendOnce: true});    
		});
		$(document).on('click', '.TP020_modal #optionWithoutCode', function() {
			utils.events.send('TP020', 'click', 'clicked no security code', {sendOnce: true});    
		});
	}

})();