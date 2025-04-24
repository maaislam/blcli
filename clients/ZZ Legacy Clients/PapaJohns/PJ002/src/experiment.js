import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as lightboxmarkup from './lib/lightbox.js';

// ID - Experiment Title
const PJ001 = (() => {

	// Experiment code
	const activate = () => {
		const $ = window.jQuery,
			  $body = $('body');
		$body.addClass('PJ002');

		utils.events.send('PJ002', 'PJ002', 'PJ002 - V1', {
			sendOnce: true
		}); 


		const URL = window.location.pathname;

		//check if code has already been added
		$('#ctl00__objHeader_lbBasketItem').on('click', () => {
			UC.poller([
				'#ctl00__objHeader_upHeaderBasketMobile'
			], () => {
				const basketItems = $('.intBasket tr');
				basketItems.each(function(){
					const $this = $(this),
						  itemText = $this.find('.item').text().trim();
					if(itemText.indexOf('(NPJ50OFF15)') > -1){
						localStorage.setItem('PJ2-codeApplied', 1);
					}
				});
			}, { timeout: 3000 });
		});

		
		if(!utils.getCookie('PJ002') && !localStorage.getItem('PJ2-codeApplied') && URL.indexOf('/basket-confirmation.aspx') > -1){
			//show lightbox after 30 seconds
			setTimeout(function(){
				PJPopUp();
			},30000);
		}

		//inner lightbox functions
		function PJPopUp() {
			const $lightboxHTML = lightboxmarkup.lightBoxhtml;
			$lightboxHTML.prependTo($body);
			$lightboxHTML.addClass('PJ002-lightbox_active');

			utils.events.send('PJ002 - Deals Lightbox', 'Lightbox shown', 'PJ002 Lightbox shown', {
				sendOnce: true
			}); 

			const bannerUrl = '/promocodesetter.aspx?promocode=NPJ50OFF15';
			$lightboxHTML.find('a').attr('href', bannerUrl);
			
			//remove the lightbox, set the cookie that it has been seen
			function closeLightbox() {
				$lightboxHTML.removeClass('PJ002-lightbox_active');
				utils.setCookie('PJ002', 'true');
				utils.events.send('PJ002 - Deals Lightbox', 'Lightbox exit', 'PJ002 Lightbox closed', {
					sendOnce: true
				});
			}

			//on background/exit click then close the lightbox
			$lightboxHTML.find('.PJ002-lightboxExit', '.PJ002-lightboxfade').click(function () {
				closeLightbox();
			});
			$('.PJ002-lightboxfade').click(function () {
				closeLightbox();
			});

			//apply deal event
			$lightboxHTML.find('a').click(function(){
				utils.events.send('PJ002 - Deals Lightbox', 'Deal click', 'P2001 clicked button to apply deal', {
					sendOnce: true
				});
			});

		}

	};

	// Audience conditions
	const triggers = ((options) => {
		const URL = window.location.pathname;
		utils.fullStory('PJ002', 'Variation 1');

		if(URL.indexOf('?utm_source=app') === -1){
			UC.poller(['#ctl00__objHeader_lbBasketItem'], activate);
		}
	})();

})();
