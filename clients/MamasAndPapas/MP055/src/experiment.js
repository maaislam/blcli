import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const MP055 = (() => {

    const activate = () => {
     
		document.body.classList.add('MP055');
		

		//check if in stock
		let stockMessage = $('.productDetail-in-stock'),
			stockLevel = window.universal_variable.product.stock;

			const priceAmount = window.universal_variable.product.unit_price;
			

				let pageDropDownSelect = $('.variant_options.mb-3 select').find(":selected").text().trim(); 
				if(pageDropDownSelect === "Select option"){
					stockMessage.hide();
				}else{
				const textMessages = {
					more20: '<i class="ico ico-tickCircle"/> In Stock',
					less20: '<i class="ico ico-tickCircle"/> Hurry! Less than 20 in stock online.',
					lessthan5: '<i class="ico ico-tickCircle"/> Hurry! Very few available online.',
					outOfstock: "<i class='ico ico-crossCircle'/> Sorry, we've run out online. Try to see if we have any in store below"
				}
			
				if(stockLevel >= 20){ //more than 20
					if(priceAmount >= 50){
						stockMessage.html(`<div class="MP055-morethan20">${textMessages.more20}</div>`);
						utils.events.send('MP055', 'Message shown', 'MP055 In Stock Free Delivery message shown', {
							sendOnce: true
						});
					}
				}else if(stockLevel >= 6 && stockLevel < 20){ //more than 6 less than 20
					stockMessage.html(`<div class="MP055-lessthan20">${textMessages.less20}</div>`);
					utils.events.send('MP055', 'Message shown', 'MP055 Less than 20 in stock message shown', {
						sendOnce: true
					});
				}else if(stockLevel >= 1 && stockLevel <= 5){ //more than 1 less than 5
					stockMessage.html(`<div class="MP055-limitedStock">${textMessages.lessthan5}</div>`);
					utils.events.send('MP055', 'Message shown', 'MP055 Very few available message shown', {
						sendOnce: true
					});
				}else if(stockLevel === 0 && stockMessage.text().indexOf('pre-order') > -1){ //IF PRE ORDER
					return false;
				}
				else if(stockLevel === 0){ //none in stock
					stockMessage.html(`<div class="MP055-noStock">${textMessages.outOfstock}</div>`);
					utils.events.send('MP055', 'Message shown', 'MP055 Out of stock message shown', {
						sendOnce: true
					});
				}
		}
		
    };

    // Audience conditions
    const triggers = ((options) => {
		const $ = window.jQuery;
		if($('.productDetail .py-3 p').text().indexOf('pre-order') >-1){
			return false;
		}else{
			utils.fullStory('MP055', 'Variation 1');
			UC.poller(['body','.productDetail-in-stock'], activate);
		}
	})();
})();

