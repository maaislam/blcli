import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const SD050 = (() => {

	// Experiment code
	const activate = () => {
		const $ = window.jQuery;
		const $body = $('body');
				$body.addClass('SD050');		

		//create the new buttons markup
		const $buttons = $(`<div class="SD50-newButtons">
								<span class="SD050-buttonTitle"></span>
								<div class="SD050-button SD50-buttonFirst"><span/></div>
								<div class="SD050-button SD50-buttonLast"><span/></div>
							</div>`);

		let submitButton = $('.add-to-cart-wrapper .product-details-box .add-to-box .add-to-cart-buttons:first'),
			$price;
		if(submitButton.length > 0){
			submitButton.after($buttons);
			$price = $('.add-to-cart-wrapper .price-box .price-excluding-tax .price');
		}else{
			$buttons.insertAfter('.product-options-bottom .add-to-cart .add-to-cart-buttons'),
			$price = $('.add-to-cart .price-box .price-excluding-tax .price');
		}

		//get price and cache the text element, run function based on price 
		let $qtyAmountFirst = $buttons.find('.SD50-buttonFirst'),
			$qtyAmountLast = $buttons.find('.SD50-buttonLast'),
			$stockingUpText = $buttons.find('span:first'),
			$quantity = $('.qty-wrapper .input-text.qty'),
			$addToCart = submitButton.find('.button.btn-cart');

		const $priceAmount = parseFloat($price.text().replace('£','')).toFixed(2);		

		if($priceAmount < 5){
			lessThan5();
			utils.events.send('SD050 - Add multiple items', 'price under £5', 'price is under £5, test fired', {
				sendOnce: true
			});
		}else if($priceAmount >= 5 && $priceAmount <= 10){
			lessthan10();
			utils.events.send('SD050 - Add multiple items', 'price more than £5 less than £10', 'price is more than £5 less than £10, test fired', {
				sendOnce: true
			});
		}


		//if price is less than £5 - add buttons 'add 5 or add 10'
		function lessThan5(){
			$stockingUpText.text('Stocking up? Quickly add 5 or 10 to basket');
			$qtyAmountFirst.find('span').text('Add 5');
			$qtyAmountLast.find('span').text('Add 10');

			$qtyAmountFirst.click(function(){
				$quantity.val('5');
				$addToCart.click();
				utils.events.send('SD050 - Add multiple items', 'Multiple Click', 'clicked add 5', {
					sendOnce: true
				});
			});

			$qtyAmountLast.click(function(){
				$quantity.val('10');
				$addToCart.click();
				utils.events.send('SD050 - Add multiple items', 'Multiple Click', 'clicked add 10', {
					sendOnce: true
				});
			});
		
		}

		//if prices is between £5 & 10 - add 2 or add 5
		function lessthan10(){
			$stockingUpText.text('Stocking up? Quickly add 2 or 5 to basket');
			$qtyAmountFirst.find('span').text('Add 2');
			$qtyAmountLast.find('span').text('Add 5');

			$qtyAmountFirst.click(function(){
				$quantity.val('2');
				$addToCart.click();
				utils.events.send('SD050 - Add multiple items', 'Multiple Click', 'clicked add 2', {
					sendOnce: true
				});
			});

			$qtyAmountLast.click(function(){
				$quantity.val('5');
				$addToCart.click();
				utils.events.send('SD050 - Add multiple items', 'Multiple Click', 'clicked add 5', {
					sendOnce: true
				});
			});
		}
	};


	const triggers = ((options) => {
		UC.poller([
			'body',
			'.qty-wrapper .input-text.qty',
			'.add-to-cart-wrapper .product-details-box .add-to-box .add-to-cart-buttons',
			'.button.btn-cart',
			() => {
				return !!window.jQuery;
			}
		], () => {
			const $ = window.jQuery,
				$price = $('.price-box .price-excluding-tax .price:first'),
				$priceAmount = parseFloat($price.text().replace('£', '')).toFixed(2);
			utils.fullStory('SD050', 'Variation 1');
			activate();
		});
	})();

})();
