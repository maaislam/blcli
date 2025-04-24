/* eslint-disable */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var _PD010 = (function() {

	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	var _activate = function() {
		var $ = jQuery,
			$body = $('body');
		    $body.addClass('PD010');

	//cache the checkout button
	var $checkoutButton = $('.linkButton.row2 #checkoutButton');

	//create top element for the new area - hide old one
	function topBasketarea(){

		var oldWrapper = $('.container_12.basket-content.basket .grid_12:first'),
			newWrapper = $('<div class="PD010_topBasket"/>');
		oldWrapper.prepend(newWrapper);


		//get values from hidden elements
		var itemAmount = oldWrapper.find('h2.title-inner').text().replace(/(Showing).\d.(of)./g,''),
			priceHolder = $('.order_totals'),
			subTotal = priceHolder.find('.sub-total:first .ui-block-b').text().trim(),
			VAT = priceHolder.find('.vat.sub-total .ui-block-b').text().trim(),
			fullTotal = priceHolder.find('.grid_12.mar-10 .total .ui-block-b').text().trim();


		newWrapper.html(`
		<h3>Your Basket</h3>
		<p>${itemAmount}</p>
		<div class="PD010-priceBlock">
			<span class="PD010-sub-total">Subtotal: ${subTotal}</span>
			<span class="PD010-vat">VAT: ${VAT}</span>
			<span class="PD010-maintotal">Total: ${fullTotal}</span>
		</div>
		<div class="PD010-checkout_top"><span>Checkout</span></div>
		<div class="PD010-save_basket">Save basket</div>
		`);

	}
	topBasketarea();

	//move individual items around
	function items(){
		var basketItem = $('.common-cart-item.basket-content .common-cart-item');

		basketItem.each(function(){
			var $elm = $(this);

			//IF ITEM IS FREE REMOVE QTY
		if($elm.find('.value').text().indexOf('FREE') >1){
			$elm.addClass('PD010-freeProduct');
		}
			
			var prodImage = $elm.find('.grid_4:first'),
				productWrap = $elm.find('.item:first');
				productWrap.prepend(prodImage);

			var prodCode = $elm.find('.code:first'),
				prodName = $elm.find('.productName:first'),
				sizing = $elm.find('.options_not_available');
				prodCode.insertAfter(prodName);
				sizing.insertAfter(prodCode);


				//insert 'fake' update & remove buttons
				var updateButton = $('<div class="PD010-update">Update</div>'),
					removeButton = $('<div class="PD010-remove">Remove</div>');

				$elm.find('.label-value.totalPrice').after(updateButton);
				$elm.find('.common-qty div.qty').after(removeButton);

				//click hidden update/remove buttons
				var itemControls = $elm.find('.grid_8.update_delete');
				updateButton.click(function(){
					itemControls.find('.update-item-qnt').click();
				});
				removeButton.click(function(){
					itemControls.find('.remove-item-qnt').click();
				});

				//change the label of web price
				var webpricelabel = $('.label-value.webPrice');
					webpricelabel.find('.label').text('Now:');

				/*function itemControls(){
				//click hidden update/remove buttons
					var itemControls = $elm.find('.grid_8.update_delete');
					updateButton.click(function(){
						itemControls.find('#update-0').click();
					});
					removeButton.click(function(){
						itemControls.find('#remove-1').click();
					});
				}
				itemControls();*/
			});
	}
	items();

	function basketButtons(){
		//store all existing buttons in variable to cache the
		var saveBasket = $('.linkButton.row1 #saveBasket');

			$('.PD010-save_basket').click(function(){
				saveBasket.click();
			});
			$('.PD010-checkout_top').click(function(){
				$checkoutButton.click();
			});

	}
	basketButtons();

	//Show hide the voucher with a link
	function voucher(){
		var voucherLink = $('<div class="PD010_voucher"><span>Promotional Code?</span><div></div></div>'),
			voucherBox = $('.grid_12.voucher');
	
			voucherLink.insertBefore(voucherBox);

			voucherLink.click(function(){
				voucherBox.toggleClass('PD010_voucherActive');
				voucherLink.toggleClass('PD010_voucherShowing');
			});
    }
	voucher();
	

	function totalBasketDetails(){
      	var orderTotals = $('.grid_12.item_container_holder,inverted item_container.order_totals');
		orderTotals.find('.vat.sub-total').after('<div class="PD010-deliverytext"/>');

		const delivery = {
		   label: 'Delivery',
		   deliveryText: 'Calculated in checkout'
        }
        
        // And then create our markup:
        const deliveryMarkup = `<div class="PD010_delivery-label">${delivery.label}</div><div class="PD010_delivery-message">${delivery.deliveryText}</div>`;

		$('.PD010-deliverytext').html(deliveryMarkup);

		var checkoutBottom = $('<div class="PD010-checkout_bottm"><span>Checkout</span></div>');
		checkoutBottom.appendTo(orderTotals);


		checkoutBottom.click(function(){
			$checkoutButton.click();
		});

		//Add continue shopping button
		var continueShopping = $('<div class="PD010-continue">< Continue Shopping</div>'),
			continueButton = $('#continueShopping');

		continueShopping.insertAfter(checkoutBottom);
		continueShopping.click(function(){
			continueButton.click();
		});

	}
	totalBasketDetails();

	//Delivery Countdown
	function basketCountdown(){
		var countdownWrap = $('<div class="PD010-countdown"></div>')
		countdownWrap.insertAfter('.PD010-checkout_bottm');


		var cutoff = new Date(); 
		cutoff.setUTCHours(16, 0, 0);
		cutoff = cutoff.getTime();

		countdownWrap.html(
			`<div class="PD010-countdown-inner">
				<h3>Place your order in the next</h3>
				<div class="countdown">
					<div id="PD010_countdown"></div>
					<div id="PD010_delivery-day"></div>
				</div>
				<h3>for <span></span></h3>
			</div>
		`);

		var countdown = UC.countdown({
			cutoff: cutoff,
			element: '#PD010_countdown',
			delivery: {
				deliveryDays: 1, // How long an item takes to arrive
				excludeDays: ['Saturday', 'Sunday'], // Non-working days
				tomorrowLabel: false
			}
		});

		if(countdown.deliveryDay === 'Friday'){
			$('.PD010-countdown-inner span').text('delivery on Monday');
		}else if(countdown.deliveryDay === 'Saturday' || countdown.deliveryDay === 'Sunday'){
			$('.PD010-countdown-inner span').text('delivery on Tuesday');
		}else{
			$('.PD010-countdown-inner span').text('next day delivery');
		}
	}
	basketCountdown();

	}


	/*-------------------------------------- 
	Activation
	---------------------------------------*/
	var _triggers = function(options) {
		utils.fullStory('PD010', 'Variation 1');


		UC.poller([
			'body',
			'.linkButton.row2 #checkoutButton',
			'.linkButton.row1 #saveBasket',
			'.vat.sub-total',
			], _activate);
	};


	// Run experiment
	_triggers();

})();