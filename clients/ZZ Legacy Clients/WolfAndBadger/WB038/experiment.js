var WB038 = (function($) {

	var $content = $('#content'),
		$ogForm = $content.find('form'),
		$ogEmail = $ogForm.find('#id_email'),
		$ogPassword = $ogForm.find('#id_password'),
		$ogCtrls = $ogForm.find('.controls'),
		$ogCtrls_guest = $ogCtrls.find('#id_is_guest_0'),
		$ogCtrls_signin = $ogCtrls.find('#id_is_guest_1'),
		$ogForgotPassword = $ogForm.find('.forgot-password > a'),
		$ogSubmit = $ogForm.find('button[type="submit"]'),
		$ogFacebook = $content.find('#fb-login-2');

	$('body').addClass('WB038a');

	// Hide existing page content
	$('#content .checkout-welcome').hide();
	$('.checkout-payment-icons').hide();

	/*
	 * VALIDATION
	 */
	function validateEmail(email) {
    	var emailReg = /^([\w-\+\\\/\.]+@([\w-]+\.)+[\w-]{2,8})?$/;

		if (!email.length) {
			return 'Please enter your email address';
		} else if (!emailReg.test(email)) {
			return 'Please enter a valid email address';
		} else {
			return true;
		}
  	}

	function validatePassword(password) {
		if (!password.length) {
			return 'Please enter your password';
		} else {
			return true;
		}
	}

	/*
	 * SIGN IN FORM
	 */
	 
	// HTML
	var $form_signInHTML = $([
		'<div class="WB038a_form span6">',
			'<div class="WB038a_form-inner">',
				'<h1>Sign In</h1>',
				'<div class="WB038a_input-block" id="WB038a_email_signIn">',
					'<label for="WB038a_email--signIn">Email</label>',
					'<input id="WB038a_email--signIn" maxlength="75" name="email" type="email">',
					'<i class="icon"></i>',
				'</div>',
				'<div class="WB038a_input-block" id="WB038a_password_signIn">',
					'<label for="WB038a_password--signIn">Password</label>',
					'<input id="WB038a_password--signIn" maxlength="30" name="password" type="password">',
					'<div class="WB038a_input-block__extra">',
						'<a id="WB038a_forgot-password">Forgotten your password?</a>',
					'</div>',
					'<i class="icon"></i>',
				'</div>',
			'</div>',
			'<button class="WB038a_btn" id="WB038a_btn--signIn">Sign In</button>',
		'</div>'
	].join(''));

	// Event handling
	var form_signIn_events = (function() {
		var $email = $form_signInHTML.find('#WB038a_email_signIn');
		var $password = $form_signInHTML.find('#WB038a_password_signIn');
		var $forgotPassword = $form_signInHTML.find('#WB038a_forgot-password');
		var $submit = $form_signInHTML.find('#WB038a_btn--signIn');

		$email.find('input').on('change', function() {
			var email = $(this).val();
			var validation = validateEmail(email);
			var passedValidation = validation === true ? true : false;

			if (passedValidation) {
				$email.find('i')[0].classList = 'icon icon-check';
				if ($email.find('.WB038a_error').length) {
					$email.find('.WB038a_error').remove();
				}
			} else {
				$email.find('i')[0].classList = 'icon icon-times';
			}
		});
		$password.find('input').on('change', function() {
			var password = $(this).val();
			var validation = validatePassword(password);
			var passedValidation = validation === true ? true : false;

			if (passedValidation) {
				$password.find('i')[0].classList = 'icon icon-check';
				if ($password.find('.WB038a_error').length) {
					$password.find('.WB038a_error').remove();
				}
			} else {
				$password.find('i')[0].classList = 'icon icon-times';
			}
		});
		
		$forgotPassword.on('click', function() {
			$ogForgotPassword.trigger('click');
		});

		$submit.on('click', function() {
			// Validate all fields
			var email = $email.find('input').val();
			var email_validation = validateEmail(email);
			var email_passedValidation = email_validation === true ? true : false;

			var password = $password.find('input').val();
			var password_validation = validatePassword(password);
			var password_passedValidation = password_validation === true ? true : false;

			if (email_passedValidation && password_passedValidation) {
				// set values in original form and submit
				$ogCtrls_signin.trigger('click');
				$ogEmail.val(email);
				$ogPassword.val(password);
				$ogSubmit.trigger('click');
			} else {
				// show error messages on failed validation
				if (!email_passedValidation) {
					if ($email.find('.WB038a_error').length) {
						$email.find('.WB038a_error').text(email_validation);
					} else {
						$('<span class="WB038a_error">' + email_validation + '</span>').insertAfter($email.find('input'));
					}
				}

				if (!password_passedValidation) {
					if ($password.find('.WB038a_error').length) {
						$password.find('.WB038a_error').text(password_validation);
					} else {
						$('<span class="WB038a_error">' + password_validation + '</span>').insertAfter($password.find('input'));
					}
				}
			}
		});
	}());	




	/*
	 * GUEST/NEW USER FROM
	 */

	// HTML
	var $form_registerHTML = $([
		'<div class="WB038a_form span6">',
			'<div class="WB038a_form-inner">',
				'<h1>Guest/New User</h1>',
				'<div class="WB038a_input-block" id="WB038a_email_register">',
					'<label for="WB038a_email--register">Email</label>',
					'<input id="WB038a_email--register" maxlength="75" name="email" type="email">',
					'<i class="icon"></i>',
				'</div>',
				'<div class="WB038a_info-block">',
					'<h2>First time shopping on Wolf &amp; Badger?</h2>',
					'<p>Enter your email address to continue <br/> (You can create an account later)</p>',
				'</div>',
			'</div>',
			'<button class="WB038a_btn" id="WB038a_btn--checkout">Checkout</button>',
		'</div>'
	].join(''));

	// Event handling
	var form_register_events = (function() {
		var $email = $form_registerHTML.find('#WB038a_email_register');
		var $submit = $form_registerHTML.find('#WB038a_btn--checkout');

		$email.find('input').on('change', function() {
			var email = $(this).val();
			var validation = validateEmail(email);
			var passedValidation = validation === true ? true : false;

			if (passedValidation) {
				$email.find('i')[0].classList = 'icon icon-check';
				if ($email.find('.WB038a_error').length) {
					$email.find('.WB038a_error').remove();
				}
			} else {
				$email.find('i')[0].classList = 'icon icon-times';
			}
		});

		$submit.on('click', function() {
			// Validate all fields
			var email = $email.find('input').val();
			var email_validation = validateEmail(email);
			var email_passedValidation = email_validation === true ? true : false;

			if (email_passedValidation) {
				// set values in original form and submit
				$ogCtrls_guest.trigger('click');
				$ogEmail.val(email);
				$ogSubmit.trigger('click');
			} else {
				// show error messages on failed validation
				if ($email.find('.WB038a_error').length) {
					$email.find('.WB038a_error').text(email_validation);
				} else {
					$('<span class="WB038a_error">' + email_validation + '</span>').insertAfter($email.find('input'));
				}
			}
		});
	}());

	/*
	 * FACEBOOK LOGIN
	 */
	// HTML
	var $facebook_loginHTML = $([
		'<div class="WB038a_separator--text span12">or</div>',
		'<div class="span12">',
			'<div id="WB038a_facebook-login">',
				'<i class="icon icon-facebook"></i>',
			 	'<span>Continue with Facebook</span?',
			'</div>',
		'</div>'
	 ].join(''));

	// Event handling
	var facebook_login_events = (function() {
		var $facebookLogin = $facebook_loginHTML.find('#WB038a_facebook-login');
		$facebookLogin.on('click', function() {
			$ogFacebook.trigger('click');
		});
	}());

	// Layout
	var $formContainer = $('<div class="row WB038a_login"></div>');
	$formContainer.append($form_signInHTML, $form_registerHTML);

	var $facebookContainer = $('<div class="row"></div>');
	$facebookContainer.append($facebook_loginHTML);

	$content.append($formContainer, $facebookContainer);


	// Pre-existing error messages
	$(function(){
		var $error = $('.alert.alert-error');
		if ($error.length) {
			var $errorContrainer = $([
				'<div class="row WB038a_error-row">',
					'<div class="span8 offset2"></div>',
				'</div>'
			].join(''));

			$errorContrainer.find('.span8').append($error);
			$errorContrainer.insertBefore($formContainer);
		}
	});

}(window.jQuery));