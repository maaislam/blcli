// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

import questionHTML from './lib/questionMarkup.js';

const TP086 = (() => {
	const doc = document;
	let slideQ = false,
		$;

	const UCPoller = (() => {
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'#order_details',
			'#order_details .confirmation_head',
			() => {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], pageCheck);

		UC.poller([
			'.questions-form + .btn-submit',
		], pageCheck);
	})();

	const cacheDom = (function () {
		//Cache useful selectors for later use
		const bodyVar = doc.querySelector('body');

		const cookieCheck = utils.getCookie('TP086_questions');

		let orderDetailsWrap,
			thanksWrap,
			questionWrap;

		//Retun the selectors we want to reference in other parts of the test
		return {
			bodyVar,
			cookieCheck,
			orderDetailsWrap,
			thanksWrap,
			questionWrap
		};
	}());

	function formHTML() {
		utils.fullStory('TP086', 'Variation 1');
		cacheDom.bodyVar.classList.add('TP086');
		utils.events.send('TP086', 'Page View', 'User shown test', {sendOnce: true});


		cacheDom.orderDetailsWrap = doc.getElementById('order_details');
		const confirmationHead = cacheDom.orderDetailsWrap.querySelector('.confirmation_head');
		const collectionInfoWrap = cacheDom.orderDetailsWrap.querySelector('.collection-info');

		confirmationHead.insertAdjacentHTML('beforebegin', questionHTML);
	}

	function questionBtnClick() {
		const questionBtnsWrap = cacheDom.orderDetailsWrap.querySelector('.TP086_question-btns');
		const yesBtn = questionBtnsWrap.querySelector('.TP086_yes');
		const noBtn = questionBtnsWrap.querySelector('.TP086_no');
		const formWrap = $('.TP086_form-toggle');

		cacheDom.questionWrap = $('.TP086_question-content');
		cacheDom.thanksWrap = $('.TP086_thank-you');

		yesBtn.addEventListener('click', function () {
			if (slideQ === false) {
				slideQ = true;
				utils.events.send('TP086', 'Button click', 'User Clicked Yes', {sendOnce: true});
				formWrap.slideDown(function () {
					slideQ = false;
				});

				$(questionBtnsWrap).slideUp();
				submitClick();
			}
		});

		noBtn.addEventListener('click', function () {
			if (slideQ === false) {
				slideQ = true;
				utils.events.send('TP086', 'Button click', 'User Clicked No', {sendOnce: true});
				cacheDom.thanksWrap.slideDown(function () {
					slideQ = false;
				});

				cacheDom.questionWrap.slideUp();
			}
		});
	}

	function submitClick() {
		const submitBtn = cacheDom.orderDetailsWrap.querySelector('.TP086_extra-info .TP086_submit');
		const textInput = cacheDom.orderDetailsWrap.querySelector('.TP086_extra-info textarea');

		submitBtn.addEventListener('click', function (e) {
			e.preventDefault();
			if (slideQ === false) {
				slideQ = true;

				const userData = {
					'identifier': 'TP086',
					'answer': 'yes',
					'moredetails': '',
					'orderNum': $('#orderId').text(),
					'date': (new Date()).toGMTString()
				};

				if (textInput.value) {
					userData.moredetails = $('.TP086_extra-info textarea').text();
				} 

				$.ajax({
					url: '//ab-test-sandbox.userconversion.com/ucdatastore/',
					type: 'post',
					data: {
						'key': '08asdhjiusdhfasdmflkhdsf890ewhf9q3u54.5981',
						'json': userData
					},
					success: function (data) {
						utils.events.send('TP086', 'Ajax', 'Posted to server successfully', {sendOnce: true});
						//location.reload();
					},
					error: function () {
						utils.events.send('TP086', 'Ajax', 'Failed to post data to the server', {sendOnce: true});
					}
				});

				cacheDom.thanksWrap.slideDown(function () {
					slideQ = false;
				});

				cacheDom.questionWrap.slideUp();
			}
		});
	}

	function cookieSet() {
		cacheDom.bodyVar.classList.add('TP086_hide');

		if (doc.querySelector('.questions-form')) {
			if (cacheDom.cookieCheck == undefined || cacheDom.cookieCheck == null) {
				utils.setCookie('TP086_questions', 'True', 2000000000);
			}
			const disagreeInput = doc.querySelectorAll('.questions-form .disagree-input');

			for (let i = 0; i < disagreeInput.length; i++) {
				disagreeInput[i].checked = true;
			}
		} else {
			if (cacheDom.cookieCheck) {
				utils.deleteCookie('TP086_questions');
			}
		}

		UC.poller([
			'.questions-form + .btn-submit + .btn-cancel',
		], function(){
			doc.querySelector('.questions-form + .btn-submit + .btn-cancel').addEventListener('click', function () {
				cacheDom.bodyVar.classList.remove('TP086_hide');
				if (cacheDom.cookieCheck) {
					utils.deleteCookie('TP086_questions');
				}
			});
		});

		UC.poller([
			'.questions-form + .btn-submit',
		], function(){
			document.querySelector('.questions-form + .btn-submit').addEventListener('click', function () {
				if(document.querySelector('.addresses.selected')){
					if (cacheDom.cookieCheck) {
						utils.deleteCookie('TP086_questions');
					}
					cacheDom.bodyVar.classList.remove('TP086_hide');
				}
				else{
					utils.setCookie('TP086_questions', 'True', 2000000000);
					UC.poller([
						'#deliveryAddressesShowDetails',
					], function(){
						document.getElementById('deliveryAddressesShowDetails').addEventListener('click', function(){
							if (cacheDom.cookieCheck) {
								utils.deleteCookie('TP086_questions');
							}
							cacheDom.bodyVar.classList.remove('TP086_hide');
						});		
					});	
				}
			});
		});
	}

	function pageCheck() {
		const URL = window.location.pathname;

		if (URL.indexOf('/order_thank_you_page') > -1 && URL.indexOf('/guest') > -1 && (cacheDom.cookieCheck != undefined || cacheDom.cookieCheck != null)) {
			formHTML();
			questionBtnClick();
		} else if (URL.indexOf('/delivery_details') > -1 && URL.indexOf('/guest') > -1) {
			cookieSet();
		}

		//Test targeting for logged in test account
		// if (URL.indexOf('/order_thank_you_page') > -1 && (cacheDom.cookieCheck != undefined || cacheDom.cookieCheck != null)) {
		// 	formHTML();
		// 	questionBtnClick();
		// } else if (URL.indexOf('/delivery_details') > -1) {
		// 	cookieSet();
		// }
	}
})();

