var _RC007 = (function($) {

	// Plugins and Helpers
	/**
	 * UC Library - Poller
	 * @version 0.2.2
 	 */
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

	// Triggers
	var _triggers = (function() {
		// Get page type
		var path = window.location.pathname;
		var pageData = {};
		var pollingConditions;
		
		switch (true) {
			case /Purchase\/YourDetails.aspx/.test(path):
				pageData.pageIsYourDetails = true;
				pollingConditions = [
					'.checkout-heading a',
					'.checkout-progress li',
					'.checkout-form-container .well p',
					'#main_0_contentmain_0_ctl03_EmailFormField_EmailInput',
					'#main_0_contentmain_0_ctl04_PhoneFormField_PhoneInput',
					'#main_0_contentmain_0_ctl09_IndustryTypeFormField_IndustryTypeDropDown-button',
					'.form-postcode-lookup .register-lookup',
					'#main_0_contentmain_0_CreateAccountPanel h2',
					'#main_0_contentmain_0_ContinueBtn',
					'#main_0_contentmain_0_newsletterOptinDiv',
					'#main_0_contentmain_0_LoginPanel .well h2',
					'#main_0_contentmain_0_AddressFinderCtrl_ctl00_btnPostCodeSearch',
					function() { if (window.localStorage) return true; },
					function() { if (window.jQuery) return true; },
                    function() { if (window.ga) return true; }
				];
				break;
			case /Purchase\/AttendeeDetails.aspx/.test(path):
				pageData.pageIsAttendeeDetails = true;
				pollingConditions = [
					'.checkout-heading a',
					'.checkout-progress li',
					'.checkout-form-container .checkout-attendee .checkout-attendee-check .js-checkbox',
					'.form-item label span',
					'.checkout-attendee-buttons input',
					'#main_0_contentmain_0_btnSubmitBookingDetails',
					function() { if (window.localStorage) return true; },
					function() { if (window.jQuery) return true; },
                    function() { if (window.ga) return true; }
				];
				break;
			/* NOT RUNNING ON PAYMENT PAGE
			case /Purchase\/Confirm.aspx/.test(path):
				pageData.pageIsConfirm = true;
				pollingConditions = [
					'.checkout-heading a',
					'.checkout-progress',
					function() { if (window.localStorage) return true; }
				];
				break;
			*/
		}

		// Store re-usable data in UC object
		UC.data = UC.data || {};
		UC.data.pageData = pageData;

		// Check Poller conditions
		if (pollingConditions) UC.poller(pollingConditions, activate);
	})();

	// Experience code
	function activate() {

		/*** GENERIC CHANGES ***/

		// Full Story integration
		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'RC007',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });

		$('body').addClass('RC007');

		// Header
		var $head = $('.checkout-heading');
		var $headInfo_HTML = $([
			'<span class="RC007_head-info">',
				'<p><em>Call 0845 508 4244* or email rctsales@redcross.org.uk</em></p>',
				'<p>Monday to Friday 8:30am – 5:00pm; calls cost 5p per minute, plus your phone company\'s access charge.</p>',
			'</span>'
		].join(''));
		$head.children('a').text('Edit Basket').after($headInfo_HTML);
		$head.after('<h1>Checkout</h1>');

		// Progress bar
		var $checkoutProgress = $('.checkout-progress');
		$checkoutProgress.addClass('col-md-8 col-lg-8 col-md-push-2 col-lg-push-2');
		// Add numbers in front of text
		$checkoutProgress.find('> ul > li').each(function(i) {
			var $text = $(this).find('> span');
			if ($text.children('a').length) {
				$text = $text.children('a');
			}
			var oldText = $text.text().trim();
			var newText = (i+1) + '. ' + oldText;
			$text.text(newText);
		});

		// Countdown
		var countdown = (function() {
			var expireTime = window.localStorage.RC007_expTime;
			var now = Date.now || function() {return + new Date;};
			var secondsUntilCutoff;
			if (expireTime && now() < expireTime) {
				// If expiry time exists in local storage and hasn't passed, use that
				secondsUntilCutoff = Math.floor( (expireTime - now()) / 1000 );
			} else {
				/* Else create a new expiry time 60 mins from now
				   and save it in local storage */
				var oneHour = 60 * 60 * 1000; // ms
				var newExpireTime = now() + oneHour;
				window.localStorage.RC007_expTime = newExpireTime;
				secondsUntilCutoff = Math.floor( (newExpireTime - now()) / 1000 );
			}
			
			function timer() {
				var days        = Math.floor(secondsUntilCutoff/24/60/60);
				var hoursLeft   = Math.floor((secondsUntilCutoff) - (days*86400));
				var hours       = Math.floor(hoursLeft/3600);
				var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
				var minutes     = Math.floor(minutesLeft/60);
				var remainingSeconds = secondsUntilCutoff % 60;
				if (remainingSeconds < 10) {
					remainingSeconds = "0" + remainingSeconds; 
				}
				var countdownElements = document.querySelectorAll('.RC007_countdown-wrapper');
				for(var i = 0, ii = countdownElements.length; i < ii; i++) {
					countdownElm = countdownElements[i];
					countdownElm.innerHTML = [
						'<span class="RC007_countdown">',
						days > 0 ? ('<span class="RC007_days">' + days + '</span> days ') : '',
						'<span class="RC007_minutes">' + minutes + '</span> minutes ',
						'<span class="RC007_seconds">' + remainingSeconds + '</span> seconds ',
						'</span>'
					].join('');
					if (secondsUntilCutoff == 0) {
						clearInterval(countdownTimer);
					} else {
						secondsUntilCutoff--;
					}
				}
			}

			// Inject HTML
			$checkoutProgress.after([
				'<div class="RC007_countdown-block col-md-8 col-lg-8 col-md-push-2 col-lg-push-2">',
					'<span>Your booking will be guaranteed as available for another</span> ',
					'<span class="RC007_countdown-wrapper">?? minutes ?? seconds</span>.',
					' <span>After that, we cannot guarantee availability</span>',
				'</div>'
			].join(''));

			// Start countdown
			var countdownTimer = setInterval(timer, 1000);

			return countdownTimer;
		})();

		
		
		var $formContainer = $('.checkout-form-container');

		/*** PAGE SPECIFIC CHANGES ***/
		var pageData = UC.data.pageData;
		
		if (pageData.pageIsYourDetails) {
			$('body').addClass('RC007_your-details');

			$checkoutProgress.find('#main_0_contentmain_0_breadcrumb_YourDetailsLi').addClass('RC007_active');
		
			/* New landing page - Split new user and returning customers 
			into different virtual pages */
			$checkoutProgress.hide();

			var $landingPage_HTML = $([
				'<div class="RC007_landing-page">',
					'<div class="RC007_lp-opt-wrap">',
						'<div class="RC007_lp-opt" id="RC007_new-user" data-RC007=new>',
							'<span>',
								'<p><em>New User</em></p>',
								'<p>(Guest Checkout)</p>',
							'</span>',
						'</div>',
					'</div>',
					'<div class="RC007_lp-opt-wrap">',
						'<div class="RC007_lp-opt" id="RC007_returning-user" data-RC007=returning>',
							'<span>',
								'<p><em>Returning Customers Login</em></p>',
							'</span>',
						'</div>',
					'</div>',
				'</div>'
			].join(''));
			
			// Landing page functionality
			var $opt_new = $landingPage_HTML.find('#RC007_new-user');
			var $opt_returning = $landingPage_HTML.find('#RC007_returning-user');

			$landingPage_HTML.find('.RC007_lp-opt').on('click', function() {
				var userType = $(this).attr('data-RC007');
				goForward(userType);
			});

			function goForward(userType) {
				if (userType === 'new') {
					newId = 'RC007_new-user';
					oldId = 'RC007_returning-user';
				} else if (userType === 'returning') {
					newId = 'RC007_returning-user';
					oldId = 'RC007_new-user';
				}

				if ($formContainer.hasClass(oldId)) {
					$formContainer.removeClass(oldId);
				}
				
				$formContainer.addClass(newId);
				
				if (window.history) {
					var stateObj = {};
					stateObj['RC007'] = "virtualPageChange";
					window.history.pushState(stateObj, userType, "#RC007=" + userType);
				}
				
				$landingPage_HTML.fadeOut(300, function(){
					$checkoutProgress.show();
					$formContainer.fadeIn(300);
				});
			}

			// Form Changes
			$formContainer.hide(); // Hide by default because of new landing page

			var $formDetailsSection = $formContainer.find('> .well:has(h2:contains("Your personal details"))');
			$formDetailsSection.children('h2').text('1. Your Personal Details');
			$formDetailsSection.find('p:first').html('Please enter <em>your</em> personal details here.');
			$formDetailsSection.find('p:last').hide();

			// Your email input
			$formContainer.find('#main_0_contentmain_0_ctl03_EmailFormField_EmailInput')
				.closest('fieldset')
				.append('<span class="RC007_input-subtext">This is the booking email address, if someone else is attending you can add their details in the next step</span>');

			// Your phone input
			$formContainer.find('#main_0_contentmain_0_ctl04_PhoneFormField_PhoneInput')
				.closest('fieldset')
				.append('<span class="RC007_input-subtext">We need this in case we need to contact you about changes to your course</span>');
				
			// Industry type input
			$formContainer.find('#main_0_contentmain_0_ctl09_IndustryTypeFormField_IndustryTypeDropDown-button')
				.closest('fieldset')
				.append('<span class="RC007_input-subtext">If your industry type is not listed, please select the nearest possible alternative</span>');
			
			// Address fields
			var $address = $formContainer.find('.form-postcode-lookup');
			var $addressToggle = $('<div id="RC007_address-toggle" class="RC007_input-subtext">Enter address manually</div>');

			// Billing address section
			var $formBillingSection = $formContainer.find('> .well:has(h2:contains("Your billing address"))');
			$formBillingSection.children('h2').hide();

			// Create an account section
			var $formCreateAccount = $formContainer.find('#main_0_contentmain_0_CreateAccountPanel');
			$formCreateAccount.children('h2, p').hide();
			$formCreateAccount.insertBefore($formBillingSection);
			$formCreateAccount.find('#main_0_contentmain_0_NationalAccountMessage').hide();

			var $formCreateAccountToggle = $([
				'<div class="well" id="RC007_create-account-toggle">',
					'<div class="form-item">',
						'<label class="form-checkbox-inline">',
							'<span class="js-checkbox">',
								'<input value="0" type="radio">',
							'</span>',
							' Create password for quicker sign in next time',
						'</label>',
					'</div>',
				'</div>'
			].join(''));

			$formCreateAccountToggle.find('label').on('click', function(e) {
				e.preventDefault();
				$(this).children('span').toggleClass('js-selected');
				$formCreateAccount.slideToggle();
			});

			$formCreateAccountToggle.insertBefore($formCreateAccount);
			$formCreateAccount.hide();
			
			/* Only make changes if lookup field is first child
			if not it means the address field has been prefilled */
			var $addressLookup = $address.children('.register-lookup');
			if ($addressLookup.index() === 0) {
				$address
					.children().not($addressLookup)
					.wrapAll('<div id="RC007_address-toggle-content" style="display:none;"></div>');
				$addressToggle.insertAfter($address.children('.register-lookup'));

				var $addressWrap = $('#RC007_address-toggle-content');
				$addressToggle.on('click', function() {
					$addressWrap.slideToggle();
				});	
			}

			// Continue button
			var $detailsContinueBtn = $formContainer.find('#main_0_contentmain_0_ContinueBtn');
			$detailsContinueBtn
				.attr('value', 'Continue to Attendee Details')
				.closest('.checkout-startclosure')
				.children('p:first')
				.text('On the next page you will enter the details of the attendee(s) of the course');
			
			/* Create new continue button that scrapes form data on click
			   before triggering a click on the real submit button */
			var $newDetailsContinueBtn = $('<input class="RC007_new-cont-btn button-primary button-lrg button-arrow" value="Continue to Attendee Details">');
			$newDetailsContinueBtn.on('click', function(e) {
				e.preventDefault();
				// Save form data in localStorage when button is clicked
				var titleIdx = $('#main_0_contentmain_0_ctl00_TitleFormField_TitleInput')[0].selectedIndex,
					firstName = $('#main_0_contentmain_0_ctl01_FirstNameFormField_FirstNameInput')[0].value,
					lastName = $('#main_0_contentmain_0_ctl02_LastNameFormField_LastNameInput')[0].value,
					email = $('#main_0_contentmain_0_ctl03_EmailFormField_EmailInput')[0].value,
					phone = $('#main_0_contentmain_0_ctl04_PhoneFormField_PhoneInput')[0].value;

				var formData = {
					'title': titleIdx,
					'firstName': firstName,
					'lastName': lastName,
					'email': email,
					'phone': phone
				};

				window.localStorage.RC007_yd_data = JSON.stringify(formData);
				$detailsContinueBtn.trigger('click');
			});

			$newDetailsContinueBtn.insertBefore($detailsContinueBtn);
			$detailsContinueBtn.hide();

			// T&Cs checkbox
			var $tcCheckbox = $([
				'<div class="well" id="RC007_tcCheckboxDiv">',
					'<div class="form-item">',
						'<label class="form-checkbox-inline" for="RC007TcCheckbox">',
							'<span class="js-checkbox js-selected">',
								'<input type="checkbox" name="" id="RC007TcCheckbox">',
							'</span>',
							' I agree to',
						'</label>',
						'<a href="/Terms-and-conditions.aspx"> terms and conditions</a>',
					'</div>',
				'</div>'
			].join(''));

			var $newsletterCheckbox = $formContainer.find('#main_0_contentmain_0_newsletterOptinDiv');
			$tcCheckbox.insertAfter($newsletterCheckbox);

			// Wrap form field sections in div
			var checkboxIdx = $newsletterCheckbox.index();
			$formContainer
				.children()
				.slice(0, checkboxIdx)
				.wrapAll('<div class="RC007_form-wrap col-lg-8 col-md-8 col-sm-6 col-lg-push-2 col-md-push-2"></div>');
				
			$formContainer.removeClass('col-lg-8 col-md-8 col-sm-6 col-lg-push-2 col-md-push-2');

			// Login Section
			var $formLogin = $formContainer.find('#main_0_contentmain_0_LoginPanel');
			$formLogin.find('> .well > h2:has(a)').insertAfter($formLogin.find('> .well'));

			// Back/forward button functionality
			window.onpopstate = function() {
				// Check hash
				var hash = window.location.hash;
				if (!/RC007/.test(hash)) {
					// User has gone backwards, go back to landing page
					$formContainer.fadeOut(300, function() {
						$landingPage_HTML.fadeIn(300);
						$checkoutProgress.hide();
					});
				}
			};

			// Inject HTML
			if (countdown) {
				$landingPage_HTML.insertAfter('.RC007_countdown-block');
			} else {
				$landingPage_HTML.insertAfter($checkoutProgress);
			}

			/* Check hash once to see if user already had
			already selected an option and this is just a page refresh */
			var hash = window.location.hash;
			if (/RC007/.test(hash)) {
				var type = hash.match(/RC007=(.*)/)[1];
				if (type) goForward(type);
			}

			/* Check for existence of error messages (p.error) to determine
			if page refresh was caused by failed validation
			If so, take user back to the page they were on  */
			$(function() {
				var $errorMsgs = $('p.error');
				if ($errorMsgs.length) {
					/* Check if error message is in login panel or sign up
					form, then take user through to the relevant page */
					if ($errorMsgs.parents('.checkout-login-panel').length) {
						goForward('returning');
					} else {
						goForward('new');
					}
				}
			});

			// Determine if page load was caused by clicking address lookup
			var ss = window.sessionStorage;
			/* Check for existence of item in sessionStorage to determine
			if page refresh was caused by address lookup 
			This will be set when the user clicks 'Address lookup'   
			*/
			if (ss.RC007_address_lookup) {
				goForward('new');

				// Remove sessionStorage item after this check
				ss.removeItem('RC007_address_lookup');
			}

			// Set sessionStorage item when 'Address Lookup' is clicked
			$formBillingSection
				.find('#main_0_contentmain_0_AddressFinderCtrl_ctl00_btnPostCodeSearch')
				.on('click', function() {
					ss.RC007_address_lookup = true;
			});

		} else if (pageData.pageIsAttendeeDetails) {
			$('body').addClass('RC007_attendee-details');

			$checkoutProgress.find('#main_0_contentmain_0_breadcrumb_AttendeeDetailsLi').addClass('RC007_active');

			// Heading
			var $heading = $formContainer.children('h1:first');
			var $tagline = $formContainer.children('p:first');
			
			$heading.text('2. Attendee Details');
			$tagline.text('Please enter the details of the person attending the course here');

			$formContainer
				.children('.well')
				.prepend($heading, $tagline);

			$formContainer.children('br').remove();

			// Courses
			var $courseBlocks = $formContainer.find('> .well > .clearfix');
			$courseBlocks.addClass('RC007_course-block');

			var $attendeeTypeHTML = $([
				'<div>',
					'<div class="RC007_first-attendee-opt RC007_same-attendee">',
						'<p>By checking this box, we will copy the details from the previous ‘Your Personal Details’ section to save you copying the details all again</p>',
					'</div>',
					'<div class="RC007_first-attendee-opt RC007_diff-attendee">',
						'<div class="RC007_first-attendee-form-toggle">',
            				'<label class="form-checkbox-inline">',
                				'<span class="js-checkbox"><input type="checkbox"></span>',
                				' Someone else is attending',
            				'</label>',
        				'</div>',
						'<p>If you’re booking on behalf of someone else please be ready to enter their details</p>',
					'</div>',
				'</div>'
			].join(''));

			$courseBlocks.each(function(i) {
				var $this = $(this);
				var $firstAttendee = $this.children('.checkout-attendee:first');
				var $attendeeType = $attendeeTypeHTML.clone();
				var $sameAttendeeCheckbox = $firstAttendee.find('.checkout-attendee-check');

				// Add/Change HTML
				$attendeeType.insertAfter($firstAttendee.find('.checkout-attendee-top'));
				$attendeeType.find('.RC007_same-attendee').prepend($sameAttendeeCheckbox);
				$firstAttendee.children('.form-item').wrapAll('<div class="RC007_first-attendee-form"></div>');

				// Toggle functionality
				$formToggle = $attendeeType.find('.RC007_first-attendee-form-toggle');
				$formToggle.click(function(e) {
					e.preventDefault();
					/* If 'I am the attendee is selected uncheck it.
					   This causes a page refresh so save the index of this course in 
					   sessionStorage for use below */
					if ($sameAttendeeCheckbox.find('.js-checkbox').hasClass('js-selected')) {
						// If this is being selected
						if (!$(this).find('.js-checkbox').hasClass('js-selected')) {
							// Save index in sessionStorage
							window.sessionStorage.RC007_courseIndex = i;

							// Uncheck 'I am the attendee' causing page refresh
							$sameAttendeeCheckbox.find('label').trigger('click');
						}
					}
					$firstAttendee.find('.RC007_first-attendee-form').slideToggle();
					$(this).find('.js-checkbox').toggleClass('js-selected');
				});

				$firstAttendee
					.find('.RC007_first-attendee-form')
					.hide();

				// Add messages under form fields
				var $formItems = $firstAttendee.find('.form-item');
				var $email = $formItems.filter(':has(label > span:contains("Attendee email"))');
				var $phone = $formItems.filter(':has(label > span:contains("Attendee phone"))');

				$email.append('<span class="RC007_optional">(optional)</span><span class="RC007_input-subtext">If you’re not attending, please ensure this is a different email address from the booking email.</span>');
				$phone.append('<span class="RC007_optional">(optional)</span><span class="RC007_input-subtext">Please note if multiple attendees are entered each one needs a unique email in order to receive their booking confirmation.</span>');
				
			});

			/* Check if sessionStorage variable exists to determine starting state 
			   of checkboxes/form. If it exists the number will be the index of the 
			   course */
			var courseIndex = window.sessionStorage.RC007_courseIndex;
			if (courseIndex) {
				// Check someone else is attending box and show form
				var $matchingCourse = $courseBlocks.eq(courseIndex);
				$matchingCourse
					.find('.RC007_diff-attendee .js-checkbox')
					.addClass('js-selected');
				$matchingCourse
					.find('.RC007_first-attendee-form')
					.show();

				// Remove sessionStorage item after this check
				window.sessionStorage.removeItem('RC007_courseIndex');
			}

			// Hide all 'add another course' buttons and place just one under the form
			var $addCourseBtns = $('.checkout-attendee-buttons input[value="ADD ANOTHER COURSE"]');
			var $newAddCourseBtn = $('<div class="RC007_add-course">+ Add another course</div>');
			$newAddCourseBtn.on('click', function() {
				$addCourseBtns.first().trigger('click');
			});
			var $formBottom = $formContainer.children('.checkout-startclosure');
			$newAddCourseBtn.prependTo($formBottom);
			$addCourseBtns.hide();

			// Continue button
			var $attendeeContinueBtn = $formContainer.find('#main_0_contentmain_0_btnSubmitBookingDetails');
			$attendeeContinueBtn
			.attr('value', 'Continue to Payment')
			.wrap('<p class="RC007_continue-btn"></p>');

		} 
		/* NOT RUNNING ON PAYMENT PAGE
		else if (pageData.pageIsConfirm) {
			$('body').addClass('RC007_confirm');

			$checkoutProgress.find('#main_0_contentmain_0_breadcrumb_ConfirmLinkLi').addClass('RC007_active');

		} */
		
	} // Experience end

})(window.jQuery);