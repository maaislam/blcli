import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';


const PJ005 = (() => {
	let $ = null;
	const activate = () => {
		const $body = $('body');
		$body.addClass('PJ005');

		//BASKET LINK
		const basketLink = () =>{
			const miniBasket = document.getElementById('ctl00__objHeader_lbBasketItem');
			miniBasket.setAttribute('href','/basket-confirmation.aspx');

			const basketAddedButton = document.querySelector('.basketNotification .greenButton');
			basketAddedButton.setAttribute('href','/basket-confirmation.aspx');
		}
		basketLink();

		//change basket link when the header changes
		UC.observer.connect(document.getElementById('ctl00__objHeader_upHeaderSummary'), function() {
			basketLink();
		}, {
		   // Options
			config: {attributes: true, childList: true, subtree: false},
			throttle: 1000 
		});


		//BASKET PAGE
		const URL = window.location.pathname;
		if(URL.indexOf('basket-confirmation.aspx') > -1){
			
			const $form = $('#aspnetForm');

			// Disable clicks on minibasket
			const $miniBasket = $form.find('#ctl00__objHeader_lbBasketItem');
			$miniBasket.click((e) => {
				e.preventDefault();
				e.stopPropagation();
			});

			const $basket = $form.find('#ctl00__objHeader_upHeaderBasketMobile');
			// Move minibasket content from lightbox to page
			const addBasket = () => {

				//add continue shopping & checkout
				const topButtons = $(
				`<div class="PJ005-basketTop-buttons">
					<div class="PJ005-button PJ005-continue"><a href="#">Continue shopping</a></div>
					<div class="PJ005-button PJ005-checkout"><a href="#">Checkout</a></div>
				</div>`);


				topButtons.insertBefore('.upsell-mobile');
				const goToCheckout = "javascript:__doPostBack('ctl00$cphBody$lbProceedMobile','')";

				const missingItemsBox = document.querySelector('.missingItemsMobileCont');
				//if missing items don't go to checkout
				if(missingItemsBox){
					document.querySelector('.PJ005-checkout a').setAttribute('href',"#");
					const topOfBasket = document.getElementById('ctl00_cphBody_upUpsell');
					const error = document.getElementById('ctl00_cphBody_divError');
					topOfBasket.insertBefore(error,missingItemsBox.nextSibling);
				}else{
					document.querySelector('.PJ005-checkout a').setAttribute('href',goToCheckout);
				}


				//get the last page visited. If last page is undefined go to homepage
				let lastPage;
				
				const lastPageVisit = document.referrer;

				if(lastPageVisit != ''){
					lastPage = lastPageVisit;
				}else{
					lastPage = 'https://www.papajohns.co.uk';
				}

				$('.PJ005-continue a').attr('href',lastPage);

				const basketTitle = $(`<h2 class="PJ005-basket_title">Your Basket</h2>`);
				basketTitle.insertAfter(topButtons);
				$basket.insertAfter(basketTitle);
			}
			addBasket();

			$basket.find('.fancyScrollable').removeAttr('style');

			UC.observer.connect($('#ctl00__objHeader_upHeaderSummary'), function() {
				UC.poller(['.main'], () => { 
					addBasket();
					$('.basket').removeClass('active');
				});	
			}, {
				config: {attributes: true, childList: true, subtree: false},
				throttle: 1000 
			});
		}
	}
	// Audience conditions
	const triggers = ((options) => {
		UC.poller([
			'#ctl00__objHeader_lbBasketItem',
			'#ctl00__objHeader_upHeaderSummary',
			() => {
				return !!window.jQuery;
			}
		], () => {
			$ = window.jQuery;
			utils.fullStory('PJ005', 'Variation 1');
			activate();
		});
	})();

})();


