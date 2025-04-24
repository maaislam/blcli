// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------
/* eslint-disable */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import loginHTML from './lib/loginMarkup.js';

const PD009 = (() => {
	let trackerName,
		slideQ = false,
		$;

	const doc = document;

	const UCPoller = (() => {
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'#nav_secondary',
			'.pd5-uspwrapper',
			() => {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], init);
	})();

	function init(){
		utils.fullStory('PD009', 'Variation 1');
		//utils.events.send('PD009', 'Navigation', 'Navigation: interaction', true);

		const cacheDom = (() => {
			//Cache useful selectors for later use
			const bodyVar = doc.querySelector('body'),
				returningCustEmailInput = doc.getElementById('j_username'),
				returningCustPasswordInput = doc.getElementById('j_password'),
				newCustEmailInput = doc.getElementById('register.email'),
				URL = window.location.pathname;
			
			let formWrap,
				loginWrap,
				emailWrap,
				registerWrap,
				emailError,
				submitError;

			bodyVar.classList.add('PD009');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar,
				returningCustEmailInput,
				returningCustPasswordInput,
				newCustEmailInput,
				formWrap,
				URL,
				loginWrap,
				emailWrap,
				registerWrap,
				emailError,
				submitError
			};
		})();

		const hideElements = {
			// Hide some content thats no longer used
			originalElements(){
				// Cache elements to remove that are not being used
				const nav = doc.getElementById('nav_secondary');
				const clearanceBanner = doc.getElementsByClassName('pd5-clearancewrapper');
				const breadcrumb = doc.getElementById('breadcrumb');
				const pdpContact = doc.querySelectorAll('.pd5-uspwrapper .pd5-usp:nth-child(3n)');
				const industInput = doc.querySelector('#registerForm .row1.column1 dd:last-child'); 

				industInput.previousElementSibling.style.display = 'none';
				industInput.style.display = 'none';

				// Check if the clearance banner exists, remove if so
				if(clearanceBanner.length > 0){
					clearanceBanner[0].parentNode.removeChild(clearanceBanner[0]);
				}

				// Check for contact PDP
				if(pdpContact.length > 0){
					pdpContact[0].parentNode.removeChild(pdpContact[0]);
				}

				// Remove cached elements
				nav.parentNode.removeChild(nav);
				breadcrumb.parentNode.removeChild(breadcrumb);

				// Hide weird '______' below footer and broken image
				const bodyErr = $('body > img:last');
				if(bodyErr[0].nextSibling.textContent.match(/_{5,}/)){
					bodyErr[0].nextSibling.remove();
					bodyErr.remove();
				}
			}
		};

		const pdp = {
			reorder(){
				const pdpOrder = doc.querySelectorAll('.pd5-uspwrapper .pd5-usp:first-child')[0];
				const pdpDelivery = doc.querySelectorAll('.pd5-uspwrapper .pd5-usp:first-child + .pd5-usp')[0];
				const pdpCountdown = pdpOrder.querySelector('#pd5-countdown');

				pdpCountdown.firstChild.nodeValue = "Order in the next ";
				pdpCountdown.insertAdjacentHTML('afterend', '<span> for next day delivery</span>');

				pdpDelivery.querySelector('.pd5-usptext p').textContent = 'FREE Next day delivery over £25';
			}
		}

		const login = {
			contentBuilder(){
				doc.getElementById('content').insertAdjacentHTML('afterend', loginHTML);
				cacheDom.formWrap = doc.querySelector('.PD009_login-wrap');

				cacheDom.formWrap.querySelector('.PD009_register').appendChild(doc.getElementById('registerForm'));

				const chkLength = doc.querySelectorAll('#registerForm .protec_checkbox dd');

				for(let i = 0; i < chkLength.length; i++){
					chkLength[i].nextElementSibling.appendChild(chkLength[i]);
					
				}

				cacheDom.loginWrap = $('.PD009_log-in');
				cacheDom.emailWrap = $('.PD009_login-input');
				cacheDom.registerWrap = $('.PD009_register');
				cacheDom.emailError = $('.PD009_signin-error');
				cacheDom.submitError = $('.PD009_submit-error');
				cacheDom.submitError = $('.PD009_submit-error');

				let cookieCheck = utils.getCookie('EmailAutocomplete');

				if(cookieCheck !== undefined){
					cacheDom.returningCustEmailInput.value = cookieCheck;
					cacheDom.newCustEmailInput.value = cookieCheck;
					doc.querySelector('.PD009_login-input input').value = cookieCheck;
				}
			},
			emailBlur(){
				doc.querySelector('.PD009_login-input input').addEventListener('blur', function(){
					let thisVal = this.value;
					// Take the value of this input and change the 2 on the page to match

					cacheDom.returningCustEmailInput.value = thisVal;
					cacheDom.newCustEmailInput.value = thisVal;

					utils.setCookie('EmailAutocomplete', thisVal, 200000000);

					if(formValidation.checkEmail(thisVal) === false){
						cacheDom.emailWrap.addClass('PD009-error');
						cacheDom.emailError.html('Your email is incorrect,<br/> please try again').slideDown();
					}
					else{
						cacheDom.emailWrap.removeClass('PD009-error');
						cacheDom.emailError.slideUp();
					}
				});
			},
			passwordBlur(){
				doc.querySelector('.PD009_log-in input').addEventListener('blur', function(){
					let thisVal = this.value;

					// Take the value of this input and change the password field for the login
					cacheDom.returningCustPasswordInput.value = thisVal;

					if(thisVal.length > 5){
						cacheDom.loginWrap.removeClass('PD009-error');
						cacheDom.emailError.slideUp();
					}
					else{
						cacheDom.loginWrap.addClass('PD009-error');
						cacheDom.emailError.html('Please enter a password with<br /> 6 or more characters').slideDown();
					}
				});
			}
		}

		const form = {
			toggleBinding(){
				const chkInput = doc.querySelectorAll('.PD009_chk-wrap input');

				for(let i = 0; i < chkInput.length; i++){
					chkInput[i].addEventListener('click', function(){
						if(this.id == 'PD009-yes'){
							cacheDom.loginWrap.slideDown(function(){
								cacheDom.loginWrap.addClass('PD_active');
								cacheDom.submitError.slideUp();
							});

							cacheDom.emailWrap.slideDown();

							if($('.PD009-error').length > 0){
								cacheDom.emailError.slideDown();
							}

							if(cacheDom.registerWrap.hasClass('PD_active')){
								cacheDom.registerWrap.slideUp(function(){
									cacheDom.registerWrap.removeClass('PD_active');
								});
							}
						}
						else if(this.id == 'PD009-no'){
							cacheDom.registerWrap.slideDown(function(){
								cacheDom.registerWrap.addClass('PD_active');
							});

							cacheDom.submitError.slideUp();
							cacheDom.emailWrap.slideUp();

							if(cacheDom.emailError.is(':visible')){
								cacheDom.emailError.slideUp();
							}

							if(cacheDom.loginWrap.hasClass('PD_active')){
								cacheDom.loginWrap.slideUp(function(){
									cacheDom.loginWrap.removeClass('PD_active');
								});
							}
						}
					});
				}
			},
			submitClick(){
				cacheDom.formWrap.querySelector('.PD009_submit-btn').addEventListener('click', function(){
					if(cacheDom.loginWrap.hasClass('PD_active')){
						$('#loginForm button').click();
					}
					else if(cacheDom.registerWrap.hasClass('PD_active')){
						$('#registerBtn').click();
					}
					else {
						cacheDom.submitError.slideDown();
					}
				});
			},
			pageCheck(){
				if(cacheDom.URL.indexOf('/register/checkout/newcustomer') > -1){
					$('#PD009-no').click();
				}
				else if(window.location.search.indexOf('error=true') > -1){
					$('#PD009-yes').click();

					cacheDom.loginWrap.addClass('PD009-error');
					cacheDom.emailWrap.addClass('PD009-error');
					cacheDom.bodyVar.classList.add('PD009_login-error');
				}
			},
			enterSubmit(){
				cacheDom.loginWrap.on('keydown', function(e){
					if(e.keyCode == 13){
						cacheDom.returningCustPasswordInput.value = cacheDom.loginWrap.find('input').val();

						if(cacheDom.loginWrap.hasClass('PD_active')){
							$('#loginForm button').click();
						}
						else if(cacheDom.registerWrap.hasClass('PD_active')){
							$('#registerBtn').click();
						}
						else {
							cacheDom.submitError.slideDown();
						}
					}
				});
			}
		}

		const formValidation = {
			checkPassword(str){
          var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,100}$/;
          return re.test(str);
      },
      checkEmail(str){
          var re = /((([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|("(([\x01-\x08\x0B\x0C\x0E-\x1F\x7F]|[\x21\x23-\x5B\x5D-\x7E])|(\\[\x01-\x09\x0B\x0C\x0E-\x7F]))*"))@(([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(\[(([\x01-\x08\x0B\x0C\x0E-\x1F\x7F]|[\x21-\x5A\x5E-\x7E])|(\\[\x01-\x09\x0B\x0C\x0E-\x7F]))*\])))/;
          return re.test(str);
      }
		}

		// Hide and remove elements not needed
		hideElements.originalElements();

		// Change place and text of PDP 
		pdp.reorder();
		
		// Create Login markup
		login.contentBuilder();

		// Bind blur event to the email input
		login.emailBlur();

		// Bind blur event to password input
		login.passwordBlur();

		// Bind form toggle
		form.toggleBinding();

		// Bind click function
		form.submitClick();

		// Check if user is signing up
		form.pageCheck();

		// Allow user to press enter to submit form
		form.enterSubmit();
	}	
})();