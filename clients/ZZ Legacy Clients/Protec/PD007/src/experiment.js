// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var PD007 = (function () {
	var trackerName,
		slideQ = false,
		$;

	var UCPoller = (function () {
		UC.poller([
			'#header',
			'.nav_secondary',
			'#cart_header',
			'.siteLogo .cmsimage',
			'.La.sales_helpline',
			'body.PD005',
			'.pd5-uspwrapper .pd5-usp:last-child .pd5-usptext p',
			function () {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], function(){
			init();
		});
	})();

	function init() {
		utils.fullStory('PD007', 'Variation 1');

		var cacheDom = (function () {
			//Cache useful selectors for later use
			var bodyVar = $('body'),
				URL = window.location.pathname;

			// Original Elements to move
			var multiCheckout,
				uspWrapper,
				currentPage;

			bodyVar.addClass('PD007 PD005');

			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				URL: URL,
				multiCheckout: multiCheckout,
				uspWrapper: uspWrapper,
				currentPage
			};
		})();

		var URLChecker = {
			checkPage: function () {
				// Check if delivery page
				if (cacheDom.URL.indexOf('checkout/multi/choose-delivery-address') > -1) {
					deliveryPage.reorder();
				}
				else if(cacheDom.URL.indexOf('checkout/multi/choose-delivery-method') > -1){
					deliveryMethodPage.reorder();
					deliveryMethodPage.revealClick();
					deliveryMethodPage.continueClick();
				}
				else if(cacheDom.URL.indexOf('checkout/multi/summary') > -1){
					cacheDom.bodyVar.addClass('PD007_payment');
					completePage.reorder();
				}
			}
		}

		var checkoutPages = {
			staticChanges:function(){
				var breadcrumb = $('#breadcrumb'),
					breadcrumbLi = $('#breadcrumb li');
				cacheDom.uspWrapper = $('.pd5-uspwrapper');

				cacheDom.multiCheckout = $('.multicheckout');

				cacheDom.uspWrapper.addClass('clearfix');
				// Find the Need help phone number near the header, then change text and move to after the continue
				cacheDom.uspWrapper.find('.pd5-usp:last-child')
					.text('Need help? Call us on 0870 333 3081 Monday to Friday between 8:30am & 5:30pm');

				$('#pd5-countdown').contents().filter(function() {
					if(this.nodeType == Node.TEXT_NODE){
						this.textContent = 'Order within';
					}
				});

				// // Reorder 
				cacheDom.uspWrapper.find('.pd5-usp:first-child').appendTo(cacheDom.uspWrapper);

				// Loop through breadcrumb and replace > with nothing
				if (cacheDom.URL.indexOf('checkout/multi/choose-delivery-address') > -1) {
					cacheDom.currentPage = '1';
				}
				else if(cacheDom.URL.indexOf('checkout/multi/choose-delivery-method') > -1){
					cacheDom.currentPage = '2';
					breadcrumb.prepend('<a class="PD007_prev-btn" href="/checkout/multi/choose-delivery-address">Previous Page</a>');
				}
				else if(cacheDom.URL.indexOf('checkout/multi/summary') > -1){
					cacheDom.currentPage = '3';
					breadcrumb.prepend('<a class="PD007_prev-btn" href="/checkout/multi/choose-delivery-method">Previous Page</a>');
				}

				breadcrumb.find('li').each(function(){
					var el = $(this);
					if(cacheDom.currentPage == '1'){
						if(el.index() == 0){
							el.html('Delivery Address');
						}
						else if(el.index() == 1){
							el.html('Delivery Method</a>');
						}
						else{
							el.html('Payment Method');
						}
					}
					else if(cacheDom.currentPage == '2' || cacheDom.currentPage == '3'){
						if(el.index() == 0){
							el.html('<a href="/checkout/multi/choose-delivery-address">Delivery Address</a>');
						}
						else if(el.index() == 1){
							el.html('<a href="/checkout/multi/choose-delivery-method">Delivery Method</a>');
						}
						else{
							el.html('Payment Method');
						}
					}
				});

				// add new arrows in as elements
				breadcrumb.find('li + li').before('<span class="PD007_li-arrow">></span>');
				
				if (cacheDom.URL.indexOf('checkout/multi/choose-delivery-address') > -1) {
					breadcrumb.find('ul > li:first-child').addClass('PD007_bold');
				}
				else if(cacheDom.URL.indexOf('checkout/multi/choose-delivery-method') > -1){
					breadcrumb.find('ul > li:first-child + span + li').addClass('PD007_bold');
				}
				else if(cacheDom.URL.indexOf('checkout/multi/summary') > -1){
					breadcrumb.find('ul > li:first-child + span + li + span + li').addClass('PD007_bold');
				}


				// Remove random underscores from the body, not sure why they exist 
				var bodyErr = $('body > img:last')[0].nextSibling;
				if(bodyErr.textContent.match(/_{5,}/)){
					bodyErr.remove();
				}
			}
		}

		var deliveryMethodPage = {
			reorder: function(){
				cacheDom.bodyVar.addClass('PD007_delivery-method');
				cacheDom.uspWrapper
					.find('.pd5-usp:first-child + .pd5-usp')
					.insertAfter($('.side-content-slot + .span-20')).before('<div class="PD007_continue"><a>Continue</a></div>');

				$('#content .checkout_multi_a .existing_address a').text('Edit');

				$('.delivery_method_list').after('<a class="PD007_reveal-additional">+ Add delivery instructions</a>');
			},
			revealClick: function(){
				$('.PD007_reveal-additional').on('click', function(){
					$(this).slideUp();
					$('.multi.rightPart').slideDown();
				});
			},
			continueClick: function(){
				$('.PD007_continue a').on('click', function(){
					$('#chooseDeliveryMethod_continue_button').click();
				});
			}
		}

		var deliveryPage = {
			reorder: function(){
				// Change continue text
				cacheDom.multiCheckout.find('.useAddressBoxHolder + .span-20.last a.positive').text('Continue');

				$('.pd5-uspwrapper .pd5-usp:first-child + .pd5-usp')
					.insertAfter(cacheDom.multiCheckout.find('.useAddressBoxHolder + .span-20'));

				// Add selected class to the the address box
				$('.useAddressBoxRep .table_action_col_item li img').closest('.useAddressBoxRep').addClass('PD007_selected-box');

				// Move the add address button inside of the address section to have it follow the same markup
				$('.right.item_container').appendTo('.useAddressBoxHolderRep');
			}
		}

		var completePage = {
			reorder: function(){
				$('.checkout_summary_flow .checkout_summary_flow_b .item_container > ul:first-child')
					.appendTo($('.checkout_summary_flow .checkout_summary_flow_a'));

				$('.span-20.basket .place-order-bottom .place-order')
					.text('Buy Now')
					.after('<div class="PD007_submit-block"></div>');

				//placeOrder();return false;
				$('#placeOrderForm1').appendTo('.checkout_summary_flow_c');

				$('#Terms1').prop('checked', true);

				$('.checkout_summary_flow .checkout_summary_flow_a a').text('Edit');

				cacheDom.uspWrapper
					.find('.pd5-usp:first-child + .pd5-usp')
					.insertAfter($('.place-order-bottom')).before('<div class="PD007_secure-text">You\'ll be redirected to our secure payment gateway Worldpay. Please do not click back.</div>');

				var deliveryText = $.trim($('#checkout_summary_deliverymode_div .instructions').text());

				if(deliveryText.length > 23){
					$('.checkout_option_container').after(`
						<div class="PD007_delivery-info">` + deliveryText + `</div>
					`);
				}

				$('.PD007_submit-block').on('click', function(){
					if ($('#Terms2').is(':checked')) {	
						$('.span-20.basket .place-order-bottom .place-order').click();
					}
					else {
						$('#Terms2 + label').addClass('PD007_error');
					}
				});
				$('#Terms2').on('click', function(){
					if ($('#Terms2').is(':checked')) {	
						$('#Terms2 + label').removeClass('PD007_error');
					}
					else {
						$('#Terms2 + label').addClass('PD007_error');
					}
				});
			}
		}

		checkoutPages.staticChanges();
		URLChecker.checkPage();
	}
})();