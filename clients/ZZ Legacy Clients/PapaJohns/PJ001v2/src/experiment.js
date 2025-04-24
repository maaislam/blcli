import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as lightboxmarkup from './lib/lightbox.js';

// ID - Experiment Title
const PJ001v2 = (() => {

	// Experiment code
	const activate = () => {
		const $ = window.jQuery,
			  $body = $('body');
		$body.addClass('PJ001v2');

		utils.events.send('PJ001', 'PJ001', 'PJ001 - V2', {
			sendOnce: true
		}); 

		const URL = window.location.pathname;

	    //check if code has already been applied
		const basketTrigger = $('#ctl00__objHeader_upOmnibar .header');
             $(basketTrigger).on('click', () => {
                    UC.poller([
                        '#ctl00__objHeader_BasketSection'
                    ], () => {
					const basketItems = $('#ctl00__objHeader_divDiscount .discountCont');
						basketItems.each(function(){
							const $this = $(this),
								itemText = $this.find('.item').text().trim();
							if(itemText.indexOf('(NPJ50OFF15)') > -1){
								localStorage.setItem('PJ1v2-codeApplied', 1);
							}
						});
                    }, { timeout: 3000 });
                });

		if(!localStorage.getItem('PJ1v2-codeApplied')){
			//run function based on URL
			if(URL.indexOf('/basket-confirmation.aspx') === -1){
				notBasket();
			}else{
				basketPage();
			}
	    }

		
		function notBasket(){
			//poll for the basket to exist then run the lightbox function
			   const basketTrigger = $('#ctl00__objHeader_upOmnibar .header');
			   $(basketTrigger).on('click', () => {
					UC.poller([
						'#ctl00__objHeader_BasketSection'
					], () => {
						if(!utils.getCookie('PJ001v2')){
							innerBasketCode();
						}
					}, { timeout: 3000 });
				});

			function innerBasketCode(){
				const $lightbox = lightboxmarkup.lightBoxhtml;
				$lightbox.prependTo($body);  

				const newBasketButton = $('<div class="PJ001v2-checkout"><span>Checkout</span></div>'),
					  innerBasket = $('#ctl00__objHeader_divBasket');
					
				//insert the new basket button that will trigger the lightbox
				if(!utils.getCookie('PJ001v2')){
					innerBasket.find('.totalCont.payPalTotal.clearFix').after(newBasketButton);
					innerBasket.find('#ctl00__objHeader_aCheckout').addClass('PJ001v2-hidden');
				}
				//show the lightbox on the new button click
				innerBasket.find(newBasketButton).click(function(){
					innerBasket.find('#ctl00__objHeader_aCheckout').removeClass('PJ001v2-hidden');
					newBasketButton.addClass('PJ001v2-buttonhidden');
					PJPopUp();
					utils.events.send('PJ001v2 - Deals Lightbox V2', 'Lightbox shown', 'PJ001v2 Lightbox shown on basket click', {
						sendOnce: true
					}); 

				});

			  }
		}	  

		function basketPage(){
			let proceedCheckout = $('#ctl00_cphBody_lbProceed');
				if(!utils.getCookie('PJ001v2')){
					basketPageCode();
				}
		

			function basketPageCode(){
				const $lightbox = lightboxmarkup.lightBoxhtml;
				$lightbox.prependTo($body);  

				//create the new basket button
				const newBasketButton = $('<div class="PJ001v2-checkoutbasket"><span>Proceed to Checkout</span></div>'),
					  buttonWrapper = $('#ctl00_cphBody_trProceed');
					  buttonWrapper.find('#ctl00_cphBody_pnlVcoOption').before(newBasketButton);

					  buttonWrapper.find('#ctl00_cphBody_lbProceed').addClass('PJ001v2-hidden');

					  //show lightbox on click
					  newBasketButton.click(function(){
						buttonWrapper.find('#ctl00_cphBody_lbProceed').removeClass('PJ001v2-hidden');
						newBasketButton.addClass('PJ001v2-buttonhidden');
						PJPopUp();

						utils.events.send('PJ001v2 - Deals Lightbox V2', 'Lightbox shown', 'PJ001v2 Lightbox shown on checkout click', {
							sendOnce: true
						}); 
					  });
			}
		}
		
		//lightbox function
		function PJPopUp() {
			const $lightboxHTML = lightboxmarkup.lightBoxhtml;
			$lightboxHTML.addClass('PJ001v2-lightbox_active');
			const bannerUrl = '/promocodesetter.aspx?promocode=NPJ50OFF15';

			$lightboxHTML.find('a').attr('href', bannerUrl);

			//if deal is applied
			$lightboxHTML.find('a').click(function(e){
				e.preventDefault();
				const fakeCheckout = $('.PJ001v2-checkout'),
					  realCheckout = $('#ctl00__objHeader_aCheckout');
				fakeCheckout.addClass('PJ001v2-buttonhidden');
				realCheckout.removeClass('PJ001v2-hidden');
				//set cookie if deal is applied rather than lightbox close 
				utils.setCookie('PJ001v2', 'true');

				window.location.href = 'https://www.papajohns.co.uk/promocodesetter.aspx?promocode=NPJ50OFF15';
			});
			
			
			//remove the lightbox, set the cookie that it has been seen
			function closeLightbox() {
				$lightboxHTML.removeClass('PJ001v2-lightbox_active');
				utils.setCookie('PJ001v2', 'true');
				utils.events.send('PJ001 V2 - Deals Lightbox', 'Lightbox exit', 'PJ001 V2 Lightbox closed', {
					sendOnce: true
				});
				$('#ctl00__objHeader_divBasket').find('.PJ001v2-checkout').addClass('PJ001v2-buttonhidden');
				
			}

			//on background/exit click then close the lightbox
			$lightboxHTML.find('.PJ001v2-lightboxExit', '.PJ001v2-lightboxfade').click(function () {
				closeLightbox();
			});
			$('.PJ001v2-lightboxfade').click(function () {
				closeLightbox();
			});

			//apply deal event
			$lightboxHTML.find('a').click(function(){
				utils.events.send('PJ001 V2 - Deals Lightbox', 'Deal click', 'PJ001 V2 clicked button to apply deal', {
					sendOnce: true
				});
			});

		}
	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('PJ001', 'Variation 2');

		UC.poller(['#ctl00__objHeader_lbBasketItem'], activate);
	})();

})();
