var _SDUC002 = (function($) {

	$('body').addClass('SDUC002');
	console.log("variation loaded");
	var cookieCounter = 0;
	$('<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />').prependTo('body.SDUC002');
	$.getScript('https://cdnjs.cloudflare.com/ajax/libs/accounting.js/0.4.1/accounting.min.js', function() {
		console.log("accounting loaded");
	});
	$('.SDUC002 .button.btn-cart').removeAttr('onclick');	

	$('<div id="add-cart-preloader" class="loader"> <a itemprop="url" class="logo sd-logo" href="http://www.salonsdirect.com/"> <img itemprop="logo" src="http://www.salonsdirect.com/skin/frontend/rwd/saloncustom/images/logo.svg" alt="Salons Direct" class="large" data-pin-nopin="true"> </a> <div class="loader-message"><h2>Thank you</h2><p>We\'re adding this item to your basket.</p></div></div>').prependTo('body.SDUC002');	

	


	/* Section for adding details to basket */
	// add this in once test complete
	// var pollInterval = setInterval(function() {
	// 	if($('#header-cart').length > 0) {
	// 		clearInterval(pollInterval);
	// 		initAlterBasket();
	// 	}
	// }, 50);

	setTimeout(function() {
		initAlterBasket();
	}, 1000);

	$('.SDUC002 .button.btn-cart').on('click', function(e) {
		var $this = $(this);
		var parentForm = $this.parents('form');

		var qualified = false;
		var currentBasketTotal = 0;
		var basketTotal = 0;
		var freeDeliveryDiff = 0;

		if($('.SDUC002 #header-cart .subtotal .price').length > 0) {
			currentBasketTotal = $('.SDUC002 #header-cart .subtotal .price').html().replace('£', '');
			currentBasketTotal = accounting.toFixed(currentBasketTotal, 2);
			basketTotal = accounting.formatMoney(currentBasketTotal, '£', 2, ',', '.');
			qualified = currentBasketTotal > 29.99 ? true : false;
		} else {
			currentBasketTotal = $this.parents('.product-info').find('.price').text().replace('ex. VAT', '').replace('£','').trim();
			currentBasketTotal = accounting.toFixed(currentBasketTotal, 2);
			basketTotal = accounting.formatMoney(currentBasketTotal, '£', 2, ',', '.');
			qualified = currentBasketTotal > 29.99 ? true : false;
		}

		if(qualified == false) {
			freeDeliveryDiff = 29.99 - currentBasketTotal;
			freeDeliveryDiff = accounting.toFixed(freeDeliveryDiff, 2);
			freeDeliveryDiff = accounting.formatMoney(freeDeliveryDiff, '£', 2, ',', '.');
		}

		var currentDate = new Date();
		var cutoffDate = new Date();
		cutoffDate.setHours(15);
		cutoffDate.setMinutes(00);
		cutoffDate.setSeconds(00);
		var currentTime = currentDate.getHours() + ":" + currentDate.getMinutes();
		var timeLeft = get_time_diff(cutoffDate);
		timeLeftFormatted = timeLeft.getHours() + ":" + timeLeft.getMinutes();

		console.log("currentBasketTotal: "+currentBasketTotal+ " int basket total: "+basketTotal+" qualified: "+qualified+" with diff: "+freeDeliveryDiff+"; currentTime: "+currentTime+" time till delivery: "+timeLeft);

		console.log(readCookie('SDUC002-AddCartCookie'));



		

		if(readCookie('SDUC002-AddCartCookie') == null) {
			console.log("readcookie: "+readCookie('SDUC002-AddCartCookie'));
			createCookie('SDUC002-AddCartCookie', 0);
			if(qualified) {
				$('<p class="promote"><span class="fa fa-check detail-icon"></span> You\'ve qualified for free delivery!</p>').appendTo('.SDUC002 .loader-message');
			} else {
				$('<p class="promote"><span class="fa fa-info-circle"></span>You\'re only '+freeDeliveryDiff+' away from free delivery.</p>').appendTo('.SDUC002 .loader-message');
			}
			
		} else {
			console.log("readcookie: "+readCookie('SDUC002-AddCartCookie'));
			var currentCookieValue = parseInt(readCookie('SDUC002-AddCartCookie'));
			createCookie('SDUC002-AddCartCookie', currentCookieValue + 1);
			if(readCookie('SDUC002-AddCartCookie') == 1) {
				if(timeLeft > 0) {
					$('<p class="promote"><span class="fa fa-clock-o detail-icon"></span>Complete your order before 3pm and we’ll despatch it today.</p>').appendTo('.SDUC002 .loader-message');
				} else {
					$('<p class="promote"><span class="fa fa-clock-o detail-icon"></span>Your order will be despatched tomorrow (exclusions apply)</p>').appendTo('.SDUC002 .loader-message');
				}
				
			} else if(readCookie('SDUC002-AddCartCookie') == 2) {
				$('<p class="promote"><span class="fa fa-check-circle-o detail-icon"></span>You\'re getting a great deal. Salons Direct source salon favourites at amazing prices.</p>').appendTo('.SDUC002 .loader-message');
			} else if(readCookie('SDUC002-AddCartCookie') > 2) {
				$('<p class="promote"><span class="fa fa-clock-o detail-icon"></span>You\'ll receive your order by (x date) when you order today (exclusions apply)</p>').appendTo('.SDUC002 .loader-message');
			}
		}


		$('body.SDUC002').addClass('adding-to-basket');
		$('#add-cart-preloader').removeClass('hidden');

		parentForm.submit();


	})

	function initAlterBasket() {
		console.log("stopped polling");

		if(!$('.SDUC002 .header-cart-price').is(':empty')) {
			$('<div class="upsell"></div>').insertBefore('.SDUC002 #header-cart .minicart-actions');
			var currentBasketTotal = $('.SDUC002 #header-cart .subtotal .price').html().replace('£', '');
			currentBasketTotal = accounting.toFixed(currentBasketTotal, 2);
			console.log(currentBasketTotal);
			if(currentBasketTotal > 29.99) {
				$('<div class="inner-item"><span class="fa fa-check-circle-o upsell-icon"></span><span class="upsell-text">You have qualified for free delivery</span></div>').appendTo('.SDUC002 #header-cart .upsell');
			} else {
				var freeDeliveryDiff = 29.99 - currentBasketTotal;
				freeDeliveryDiff = accounting.toFixed(freeDeliveryDiff, 2);
				freeDeliveryDiff = accounting.formatMoney(freeDeliveryDiff, '£', 2, ',', '.');
				$('<div class="inner-item"><span class="fa fa-info-circle upsell-icon"></span><span class="upsell-text">Spend an extra '+freeDeliveryDiff+' to claim free delivery! </span></div>').appendTo('.SDUC002 #header-cart .upsell');
			}

			var currentDate = new Date();
			var cutoffDate = new Date();
			cutoffDate.setHours(17);
			cutoffDate.setMinutes(00);
			cutoffDate.setSeconds(00);
			var currentTime = currentDate.getHours() + ":" + currentDate.getMinutes();
			var timeLeft = get_time_diff(cutoffDate);
			timeLeftFormatted = timeLeft.getHours() + ":" + ('0'+timeLeft.getMinutes()).slice(-2) + ":" + timeLeft.getSeconds();

			if((cutoffDate.getDay() == 1 || cutoffDate.getDay() == 2 || cutoffDate.getDay() == 3 || cutoffDate.getDay() == 4) && timeLeft > 0) {
				console.log("It's either Monday, Tuesday, Wednesday or Thursday and there's time left");
				$('<div class="inner-item" id="timeleft-item"><span class="fa fa-clock-o upsell-icon"></span><span class="upsell-text">Order in the next <span class="timeleft-countdown">'+timeLeftFormatted+'</span> to receive your products tomorrow (exclusions apply)</span></div>').appendTo('.SDUC002 #header-cart .upsell');
				var countdownInterval = setInterval(function() {
					timeLeft = get_time_diff(cutoffDate);
					timeLeftFormatted = timeLeft.getHours() + "h:" + timeLeft.getMinutes() + "m:" + timeLeft.getSeconds() +"s";
					$('.SDUC002 .timeleft-countdown').html(timeLeftFormatted);
					if(timeLeft == 0) {
						$('.SDUC002 #timeleft-item').remove();
					}
				}, 1000);
			} 
		}
	}

	function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
	}

	function readCookie(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;
	}

	function eraseCookie(name) {
	    createCookie(name,"",-1);
	}

	function get_time_diff( datetime )
	{
	    var datetime = typeof datetime !== 'undefined' ? datetime : "2014-01-01 01:02:03.123456";

	    var datetime = new Date( datetime ).getTime();
	    var now = new Date().getTime();

	    if( isNaN(datetime) )
	    {
	        return "";
	    }

	    if (datetime < now) {
	        var milisec_diff = now - datetime;
	    }else{
	        var milisec_diff = datetime - now;
	    }

	    var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

	    var date_diff = new Date( milisec_diff );

	    return date_diff;
	}


})(jQuery);

