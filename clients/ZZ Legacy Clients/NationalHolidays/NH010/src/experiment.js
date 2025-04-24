import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as lightboxmarkup from './lib/lightbox.js';
import NH003 from './lib/NH003.js';

//Built on top of NH003
const NH010 = (() => {

	// Run NH003 as it's a dependency of this experiment
	NH003();

	// Experiment code
	const activate = () => {
		// Send event to show user is bucketed into NH010
		utils.events.send('NH010', 'Page View', 'NH010 Triggered', {sendOnce: true});

		let $ = window.jQuery,
				$body = $('body');
		$body.addClass('NH010');

		/*-------------------------------
		//Move elements around
		---------------------------------*/
		function formChanges() {
			let paymentLink = $('#divPromoCode'),
					bookingInfo = $('.box-with-border.white'),
					paymentOption = $('.field-row-wide.NH003_fieldRowLast.NH003_confirmation-block');

			paymentLink.insertAfter(bookingInfo);
			paymentOption.insertAfter('.please-note-text');

			$('.NH003_cardsAccepted').prepend('<span>We accept:</span>');

			let validField = $('.field-row-wide:eq(6)'),
					expiryField = $('.field-row-wide:eq(3)');
			validField.addClass('NH010-validField');
			expiryField.addClass('NH010-expiryField');

			// Create new row under columns
			let $bottomRow = $('<div class="NH010_bottomRow"></div>');
			$bottomRow.insertAfter('.right');
			$bottomRow.append(paymentOption, $('.box-with-border.orange'));
			paymentOption.contents().wrapAll('<div class="NH010_confirmation-block-inner"></div>');

			// Change card number field type
			let cardNumber = $('.box-with-border #txtCardNo');
			cardNumber.attr('max', '9999999999999999');

			// Limit card number field to 16 characters
			cardNumber[0].oninput = function() {
				let limit = 16;
				if (this.value.length > limit) {
					this.value = this.value.slice(0, limit); 
				}
			};

			// Prevent letter 'e' and up/down arrows for better usability being allowed
			cardNumber[0].onkeydown = function(e) {
				let key = e.keyCode;
				
				if (key === 69 || key === 38 || key === 40) {
					return false;
				} else {
					return true;
				}
			};
		}
		formChanges();

		/*-------------------------------
	   //allow spaces on 16 digit field
		---------------------------------*/
		// function cardSpaces() {
		// 	let cardNumber = $('.box-with-border #txtCardNo');
		// 	cardNumber.on('keypress change', function () {
		// 		$(this).val(function (index, value) {
		// 			return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
		// 		});
		// 	});
		// }
		// cardSpaces();

		/*-------------------------------
		//add lightbox 
		 ---------------------------------*/
		function lightBox() {
			let markup = lightboxmarkup.lightBoxhtml;
			markup.prependTo($body);

			let moreInfo = $('.NH003_securityText .NH003_findout');

			let $lightBox = $('.NH010-lightbox'),
				$lightBoxOverlay = $('.NH010-lightboxOverlay'),
				$lightBoxExit = $('.NH010-lightbox-exit');

			moreInfo.click(function (e) {
				e.preventDefault();
				lightboxOpen();
			});
			
			$lightBoxOverlay.click(function () {
				lightboxClose();
			});

			$lightBoxExit.click(function () {
				lightboxClose();
			});

			function lightboxOpen() {
				$lightBox.addClass('NH010-lightbox-showing');
				$lightBoxOverlay.addClass('NH010-lightboxoverlay-showing');
			}
			function lightboxClose() {
				$lightBox.removeClass('NH010-lightbox-showing');
				$lightBoxOverlay.removeClass('NH010-lightboxoverlay-showing');
			}

		}
		lightBox();

		//Events
		function events(){
			let voucherClick = $('#divPromoCode #btnApplyCode'),
					voucherBox = $('#divPromoCode');
			
			voucherClick.click(function(){
				utils.events.send('NH010','Apply Voucher code','NH010 Apply voucher code submit clicked', {
					sendOnce: true
				});
			});
			voucherBox.click(function(){
				utils.events.send('NH010','Voucher click','NH010 Add promo code box clicked', {
					sendOnce: true
				});
			});
		}
		events();

	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('NH010', 'Variation 1');
		UC.poller(['body', '.NH003 .NH003_confirmation-block','.box-with-border','#divPromoCode'], activate);
	})();

})();
