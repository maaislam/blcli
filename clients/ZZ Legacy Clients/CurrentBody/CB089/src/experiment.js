// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var _CB089 = (function() {
	//STILL TO DO
	/*
		- STYLING - LOADER BAR,TITLE
		- CONTINUE SHOPPING LINK
		- OFFERS
		- VOUCHER
	*/


	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	var _activate = function() {
		var $ = jQuery;
		var $body = $('body');
		$body.addClass('CB089');

		// Move loader bar to top 
		var $loaderBar = $('.col-content:first .top-menu.row');
		$loaderBar.insertBefore('main.container-fluid:first');

		$loaderBar.find('.cart-menu-block').wrapAll('<div class="CB089_progress-block container-fluid"/>');

		var sectionArrow = $loaderBar.find('.cart-menu-block.first');
		sectionArrow.addClass('CB089_arrow-active');

		/*--------------------------------------
  		Inner content functionality
  		---------------------------------------*/

		// Add paypal section
		function payPal() {
			var $html = $(`
				<div class="CBO89_paypal-section">
					<div class="CB089_paypal-button">
						<p>Pay with</p>
						<span>
							<p class="paypal-logo">
								<a href="https://www.currentbody.com/paypal/express/start/button/1/">Paypal</a>
							</p>
						</span>
					</div>
				</div>
				<h3 class="CB089_or_text">OR</h3>
			`);

			$html.insertBefore('#betterFasterCheckout');
		}

		// Add email/delivery section
		function deliverySection() {
			var checkoutArea = $('#betterFasterCheckout'),
			    delivery = $('<div class="CB089_delivery-wrapper"></div>'),
				billingEmailbox = $('.checkout-betterfaster-part .form-group .form-control.validate-email');
				
			billingEmailbox.closest('.form-group').addClass('CB089_hiddenemail');

			var deliveryEmail = $('.CB089_hiddenemail');

			delivery.prependTo(checkoutArea);

			delivery.html([
				'<div class="CB089_cardTitle">Pay with Debit/Credit Card</div>', 
				'<div class="CB089_fade CB089_fadehidden"></div>',
				'<p><span>*</span>REQUIRED FIELD</p>',
				'<span class="CB089_email-text">',
					'Please enter your email address and we will aim to get through the checkout as fast as possible so you can be on you way and enjoy your products.',
				'</span>',
				'<div class="CB089_email_field"></div>',
				'<div class="CB089_email-complete">',
					'<span>Continue</span>',
				'</div>'
			].join(''));

			deliveryEmail.appendTo('.CB089_email_field');
			deliveryEmail.find('input').attr('placeholder', 'Email Address*');
			deliveryEmail.prepend('<div class="CB089_email-error">Please enter an email address</div>');
		}

		function fadeBoxes() {
			var billingSection = $('.col-content .group-address');
			billingSection.prepend('<div class="CB089_fade"/>');

			var fadeBox = $('.CB089_fade');

			//show/hide boxes on billing click
			$('.CB089_email-complete').click(function () {
				var emailError = $('.CB089_email-error');
				if ($('.CB089_hiddenemail input').val() === '') {
					emailError.addClass('CB089_error-active');
				} else {
					billingSection.find(fadeBox).addClass('CB089_fadehidden');
					var sectionArrows = $('.cart-menu-block.first');
					sectionArrows.removeClass('CB089_arrow-active');
					sectionArrows.next().addClass('CB089_arrow-active');
					emailError.removeClass('CB089_error-active');
				}
			});
		}

		function continueShopping() {
			var $sidebar = $('aside.col-sidebar');
			var $html = `
				<div class="CB089_continue-shopping">
					<a href="http://www.currentbody.com/">« Continue Shopping</a>
				</div>
			`;
			$sidebar.before($html);
		}

		/*--------------------------------------
  		Side bar functions
  		---------------------------------------*/
		// GET cart form from cart URL
		// Update inputs within this form and resubmit to alter basket contents
		var $ajaxForm;

		function getForm() {
			var dfd = $.Deferred();

			$.ajax({
				url: 'https://www.currentbody.com/checkout/cart/',
				type: 'GET',
				success: function success(data) {
					var $data = $(data);
					var $cartForm = $data.find('#checkout_update_form');
					$ajaxForm = $cartForm;
					$cartForm.hide().appendTo('body');
					dfd.resolve($cartForm);
				},
				error: function error() {
				}
			});

			return dfd.promise();
		}


		function addQtyChanger($ajaxForm) {
			// Add qty button to items
			var $basketProducts = $('#cart-sidebar .item:not(:has(".no-link-item"))');

			$basketProducts.each(function(i) {
				var $product = $(this);
			    var quantityNumber = $product.find('.quantity .input-text.qty').val();
				var $html = $(`
					<div class="CB089_quantity-wrap CB089_quantity--disabled">
						<div class="CB089_quantity">
							<div class="CB089_quantity__remove">-</div>
							<input type="number" value="${quantityNumber}" />
							<div class="CB089_quantity__add">+</div>
							<div class="CB089_quantity__update">Update</div>
						</div>
						<img class="CB089_quantity__delete" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhCwMPCRMqiUHSAAAEKElEQVRo3tVZTUhUURT+7pux0BQbDSuIoqJNQRQtgiKwjYswCIJAskW7CgKFGpMIHrSwZsCswBZtA0UIiiBqVm2K2piE1KJoYaQ2CuMgjT8z824L541z79zfNzNIZ/PeO/ec73zvnPv7HoGFxNuoi3bsxyaJQQ7TmKR3+z6aYxJz00ebl79hr4FhJrvv9h9TVMecwPJFo/BAQ7jbHNWCAD1kakn2mKOGzU3JzsLNazyWmFzHGQDAtpoQKGbrV/SN2CB2jrO0AN0w2XACwmE4sC/UjrYydRcOAwA+4YUE7RyOAwC+YKSsLZl/1//TiMD9a+SBdKqpRFZpb9+wlkDsAL5adU0byeFg9DurKu8Dp2sWHgiTdl5VTmC6ZuEB0BktgUwC4zWLP55J8CpBJxyIhO6iQzAKKpMkEvk7/amavdx/K8KJKNaBsRrEuhBNlCvFQ24ezTUgMC9SCteC7O8ahJegignMIVf1+LnsnDEB18Msp8rjJY1iktOm6CAdBD+0JmkUL5HntLOuJ4olm3ansYt5fhq9CrgPG36Vzg9e1623wL2EU7pBSWaOuauIx57gCocoFNl+gKuXMwIA7iodLVHO9SUAoC+BkuTSUXd13UOOqCPA8c2H1q6kFCZDKAAQisy60rfwPYJmgDMnLYWrdir1LXyPgAQon7DI2sXTEihaRDSIdhmgPpx+MUlxHgEzwJk7BTjzEjgRNaKGwGYuYdS6D9AWNaKGQO8ClhgChfcJawmExSVY6l2wIgCuZqQA15OGB5V4PWnWQ4QWgIDfpwlFWkkgvTY3gB8F9gS4YbNeUXURUgIPyAehdQYsCFS5BM3U3zsZEaCE29LYE3DYpDlDPqARgaFmFtmxLwHhOC/7NTUisNyiRjMgkOVc6ozmQr+1LqJGMyCwIlkN1MuRJ1kJVuwJuBksiAiYZYAjsOBmZB6qLyTsXGjVB7jdgOLAa0ygogwEI0DYoWNFgJ2GiOKcYZ2BrJJAtpoZ8KrWB7xgBBxhCVbSoFIXupJmrYVIpgTEJXA9xYKc9k8/VSmBI9ySQFWElMC6DMmYwOIMk2yTHYF4N0AXZ6QeKgJuDsmSx6Yx/6yjJTAWQlOJNukqztrKb8XMVpr82Fq4kRLwW35sLf3yQpUf/tQfq4W9QL4c+S2mG1ItAXYGc7Rng+KhpEWOYkdAOBD1fYAdhKRaJQjt5lobXQcAXAeNbANnGZwAu5mmlws3lwrX1vpOAKjvRCvbUrQUoPCi/G8YO4LPjGKCviLncbD4vIQRAF2oL2q+0ufkLI4wXkejEwEJxNuo8Q9IRYjtN5OKVpUrJfFFbKkw/t+bTUS+fGlGASXDqFDIsCq89q8ZiWkOozpJk5jaQEPgxrx3ClOBw095p27Mq00M/p7H29CNk/QEdliEniUf8B7PVN1vTf4BbE1r/hSnU5AAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTEtMDNUMTU6MDk6MTkrMDE6MDAZVjXkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTExLTAzVDE1OjA5OjE5KzAxOjAwaAuNWAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="/>
					</div>
				`);
				$product.append($html);
			});
		}

		function addQtyChangerEvents($ajaxForm) {
			// Form exists, enable qty changer functionality 
			$('.CB089_quantity--disabled').removeClass('CB089_quantity--disabled');

			// Add qty button to items
			var $formProducts = $ajaxForm.find('#shopping-cart-table > tbody > tr:not(".gift-product")');
			var $basketProducts = $('#cart-sidebar .item:not(:has(".no-link-item"))');

			$basketProducts.each(function(i) {
				var $product = $(this);
				var $formProduct = $formProducts.eq(i);
				var $qtyInput = $formProduct.find('input.qty');

				var $add = $product.find('.CB089_quantity__add');
				var $remove = $product.find('.CB089_quantity__remove');
				var $delete = $product.find('.CB089_quantity__delete');
				var $input = $product.find('.CB089_quantity input');
				var $update = $product.find('.CB089_quantity__update');

				$add.click(function() {
					$input.val(parseInt($input.val()) + 1);
					$input.trigger('change');
				});

				$remove.click(function() {
					$input.val(parseInt($input.val()) - 1);
					$input.trigger('change');
				});

				$delete.click(function() {
					var removeURL = $formProduct.find('.btn-remove').prop('href');
					var $iframe = $('<iframe style="display: none;" src="' + removeURL + '"></iframe>');
					$iframe.appendTo('body');
					
					// Show loader
					$('#betterfaster-checkout-review').addClass('loading');

					setTimeout(function() {
						$('#betterfaster-checkout-review').removeClass('loading');
					}, 12000);
					
					$iframe.load(function() {
						// iframe loaded, refresh page
						$('#betterfaster-checkout-review').removeClass('loading');
						location.reload();
					});
				});

				$input.change(function() {
					var thisQty = $(this).val();
					var currentQty = $qtyInput.val();

					if (thisQty === currentQty) {
						// No need to update, selected qty matches basket qty
						$update.hide();
						return false;
					} else {
						// Show update button allowing user to update basket qty
						$update.show();
					}
				});

				$update.click(function() {
					$qtyInput.attr('value', $input.val());
					updateForm();
				});
			});
		}

		// AJAX update basket contents form
		function updateForm() {
			// Show loader
			$('#betterfaster-checkout-review').addClass('loading');
			setTimeout(function() {
				$('#betterfaster-checkout-review').removeClass('loading');
			}, 12000);

			$.ajax({
				type: 'POST',
				url: 'https://www.currentbody.com/checkout/cart/updatePost/',
				data: $('#checkout_update_form').serialize(),
				success: function success(response) {
					// Refresh page to update basket
					$('#betterfaster-checkout-review').removeClass('loading');
					location.reload();
				},
				error: function error() {
				}
			});
		}

		function applyVoucher() {
			console.log('Applying voucher');
			$.ajax({
				type: 'POST',
				url: 'https://www.currentbody.com/checkout/cart/couponPost/',
				data: $('#discount-coupon-form').serialize(),
				success: function success(response) {
					console.log('Applied voucher');
					console.log(response); // Response returns full html for updated basket page
					// Refresh page to update basket
					//location.reload();
				},
				error: function error() {
					console.log('Error applying voucher');
				}
			});
		}

		function delivery() {
			var $deliveryOpts = $('#checkout-shipping-method-load li');
			var $oldDelivery = $('.checkout_summary_total:has(.template_fl:contains("Delivery:"))');

			// Create array of all availible delivery options
			var deliveryOptions = (function() {
				var arr = [];

				$deliveryOpts.each(function() {
					var $el = $(this);
					var $input = $el.find('input');
					var value = $input.prop('value');
					var title = $el.find('.method-title').text().trim();
					var price = $el.find('.price').text().trim();
					if (price === '£0.00') price = 'FREE';
					var arrival = $el.find('.delivery-info-checkout').text().trim().replace('Delivery by', 'Arrives by:');
					var isSelected = $input.prop('checked');

					arr.push({
						title: title,
						price: price,
						arrival: arrival,
						input: $input[0],
						value: value,
						isSelected: isSelected
					});
				});

				return arr;
			}());

			var updateSelectedDelivery = function(option) {
				var $html = $(`
					<div class="checkout_summary_total CB089_delivery-total">
						<span class="template_fl">
							<span class="CB089_delivery__total__title">${option.title}</span>
							<span class="CB089_delivery__total__arrival">${option.arrival}</span>
						</span>
						<span class="template_fr">
							<span class="CB089_delivery__total__price">${option.price}</span>
							<span id="CB089_change-delivery">Change</span>
						</span>
						<div class="clear"></div>
					</div>
				`);

				$html.find('#CB089_change-delivery').on('click', function() {
					$select.slideToggle();
				});

				// Hide selected option from $select element
				$select
					.find('.CB089_delivery__option')
					.show()
					.filter('[value="' + option.value + '"]')
					.hide();

				$oldDelivery.after($html);
			};

			// Build custom select menu for delivery options
			var $select = (function() {
				var $element = $('<div class="CB089_delivery"></div>');

				$.each(deliveryOptions, function() {
					var option = this;
					var input = option.input;

					var $option = $(`
						<div class="CB089_delivery__option" value="${this.value}">
							<span class="template_fl">
								<span class="CB089_delivery__option__title">${option.title}</span>
								<span class="CB089_delivery__option__arrival">${option.arrival}</span>
							</span>
							<span class="template_fr">
								<span class="CB089_delivery__option__price">${option.price}</span>
							</span>
						</div>
					`);

					// On click of delivery option, trigger click on delivery input
					$option.on('click', function() {
						$(input).trigger('click');
					});

					$element.append($option);
				});

				return $element;
			}());

			$oldDelivery.hide();
		
			// Set inital delivery option
			$oldDelivery.after($select);
			$.each(deliveryOptions, function() {
				if (this.isSelected) {
					updateSelectedDelivery(this);
					return false;
				}
			});
		}

		function addVoucher() {
			// Voucher Stuff
			var $voucher = $([
				'<div class="CB089_voucher_link">Apply Voucher Code ▸</div>', 
				'<form id="CB089_discount-coupon-form" action="https://www.currentbody.com/checkout/cart/couponPost/" method="post">', 
					'<div class="discount">',
						'<div class="discount-form form-group">',
							'<div class="input-group">',
							'<input type="hidden" name="remove" id="remove-coupone" class="form-control" value="0">',
							'<input class="form-control" placeholder="Apply a gift cert" id="coupon_code" name="coupon_code" value="">',
							'<span class="input-group-btn">',
								'<button type="button" id="discount-coupon-apply-button" title="Apply" class="btn btn-default" onclick="discountForm.submit(false)" value="Apply">',
									'<span>Apply</span>',
								'</button>',
							'</span>',
							'</div>',
						'</div>',
					'</div>',
				'</form>'
			].join(''));

			var $form = $voucher.filter('#CB089_discount-coupon-form');

			$voucher.insertBefore('.checkout_summary_grandtotal');

			$voucher.filter('.CB089_voucher_link').click(function () {
				$form.slideToggle();
			});

			$voucher.find('#discount-coupon-apply-button').click(function (e) {
				e.preventDefault();
				applyVoucher();
			});
		}

		function paymentIcons() {
			//Change payment Icons
			var $sidebar = $('aside.col-sidebar');
			var $element = $([
				'<div class="CB089_payment">',
					'<div class="CB089_payment__secure-icon">',
						'<img src="https://www.currentbody.com/skin/frontend/bootstrap/currentbody/images/gmo.jpg" />',
					'</div>',
				'</div>'
			].join(''));

			var cardIcons = [
				'//www.sitegainer.com/fu/up/1jm3mam8oietezm.jpg',
				'//www.sitegainer.com/fu/up/d2hog6cywns7jg8.jpg',
				'//www.sitegainer.com/fu/up/h05j0yefhpwl24l.jpg',
				'//www.sitegainer.com/fu/up/c2e927vq87xolmv.jpg',
				'//www.sitegainer.com/fu/up/ldnqo7o15fixzc8.jpg'
			];

			var $cardIcons = $('<div class="CB089_payment__card-icons"></div>');
			$.each(cardIcons, function () {
				$cardIcons.append('<div class="CB089_payment__card-icon"><img src="' + this + '" /></div>');
			});
			$element.prepend($cardIcons);

			$element.appendTo($sidebar);
		}

		function freeGift() {
			//check if product is a free gift
			var freeProduct;

			$('.mini-products-list .item').each(function () {
				var productName = $(this).find('.product-details .product-name > span');
				if (productName) {
					if ($(this).find(productName).hasClass('no-link-item')) {
						$(this).addClass('CB089_freeItem');
						$(this).find('.CB089_quantity').hide();
						$(this).prepend('<span>FREE GIFT</span>');
					}
				} else {
					return;
				}
			});
		}

		//Add the in the stock message to basket
		function addStockmessage() {
			$('#cart-sidebar .item:not(.CB089_freeItem)').each(function () {
				$(this).find('.product-details .product-name').after('<span class="CB089_stock"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABqlBMVEUAAACA1VWR21qQ21qZ3VWS3VqR21qR3FqR3VmS3lyR3FqR3FqQ2liR3FqS21iR3FqQ3lmR3F2R3FqS3FqU3VeR3FqR3VqT2F2R3FmS3VqN3FiR3FqR3Fqf32CV31WR3FqR3FqZ5maS21WR3FqR21qJ2GKW4VqR3VqS21uR3FqM2VmL0V2Q3FqQ3FqP2lqAv0CS3FqQ3lyA/4CR3Fr//wCQ3FqP21yR3FqS21uR3VqR21mQ21mR3FqS21mS3FqQ3FqR3VmR3FqS21uR3FqR3FqS21mR3FqR3VmR3FqR3FqQ21qR3FuS3VqR21uR3FqR3FqQ21qQ3FuR21qR3VqS3VqS3FqS3lqQ3VmS3FqR3FqQ3VuR21qP4FyQ3lmR3FmR3FmR3FmQ2lqR3Fuq/1WR3FqR3FqR3FqS20mR3FqR3FqR3VuQ3FqQ3FqR3VmR3FuR21mR21qZzGaS21uR3FqS3VqS3VqR3FqR21qR3VqQ3FqR3VqP2lqR3VuR3FqP32CR3VqU116S3VmR3FqQ3lmQ21mR3FqP31iR3FuR3FqO21mV1VWR21mR3FoAAAA++QxMAAAAjHRSTlMABl1xD0Tt8Dw99fM38jHvLizsqCbo3iHkdx3fvAgY2sMKFdXJDRHPDsoUC722IgSvJwKnAZ8ylziOco/2P7iDhvhGffpN/mF0/FV2Umv93WNlrPRbbjZTfOZMgBlFiaDTPpIDsMebB767o8utq9adswUc4Kpp5bol6cEwyM4QShNZ2Rdq4yDn6ysMVv3P8X4AAAABYktHRACIBR1IAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4QsGChgk8Pj1FAAAAg1JREFUWMPt1ulbElEUBvCDhcQmaWmkuWVqLmkqmZbmRpRZuJZbC4pmpi1qi5UWuVaeP7rRfORlmAuc4ZNPvt+45/zuLMydO0Qn+Z9jyTh1Oh1vzWS2nTHv7Q7W4jQ9g8vNnM4MWR4+jPOsGZ+dw0c5Z8Kfz416zpP7C17wfFHs8wvQXyqU+qJi9CWlUn+5DP2VcqmvqERfWSH1V6vQl1VLfU0J+uIiqS+sRV+QL/WWa+i9dVJffx19boPUNzahz8mWet8N9LZmfb20PskEN9E7W/S3t9XmvZXQ30bf1q73d/aHOxL4TvRd3YaeWX0OPej9dxWeA/cU/j763gf6cl+09tDQP0IfzIir98PVWQ38QAB8YDC+YQjqw6648kgQT+CxwRGe4BEy9U/YaG/yF+AYtozHrpEJPxYnFXc55inpfwqVZ11Yeq76m30vsC0UfU9NObAwTcqEZ7BxtuZwuMWNwy996glo7hW2zlsOBps9OPi6kRKlfAGbF8MUuwEyvwlT4lS/xfZ3PmrADZDfL1GyLK8g+PDxE/78PJfUE61+YVW+praBfbMp/FqqG5i9zdCvf0/RE/3wG/hQJGVP9DMY5zc2BZ5oS+/zlkVetzSZt3eEnqgV/e6q2MdsQb9+y722NI82UU+WGa8tzdp/3u0y54n+HHzIOOxmPVEkpHmrea99TOz1RdLxJzl2+QuC3MCSpadXZAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMS0wNlQxMDoyNDozNiswMTowMGffHgQAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTEtMDZUMTA6MjQ6MzYrMDE6MDAWgqa4AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="/>In Stock</span>');
			});
		}

		function addDiscount() {
			var $discount = $('.mini_basket_total_cost.mini_basket_discount');
			if ($discount.length) {
				var discount = $discount.find('.price').text().trim();

				$('.mini_basket_grandtotal_cost').append('<span class="CB089_discount">You have saved ' + discount.replace('-', '') + '</span>');
				$discount.closest('.checkout_summary_total').hide();
			}
		}

		// Activate experiment
		continueShopping();
		deliverySection();
		delivery();
		fadeBoxes();
		freeGift();
		addQtyChanger();
		payPal();
		$.when(
			getForm()
		).then(function(data) {
			addQtyChangerEvents(data);
		});
		addStockmessage();
		addVoucher();
		paymentIcons();
		addDiscount();

		/* Observer on the basket refreshing */
		UC.observer.connect($('#checkout-step-review'), function () {
			delivery();
			freeGift();
			addQtyChanger();
			addQtyChangerEvents($ajaxForm);
			addStockmessage();
			addVoucher();
			addDiscount();
		}, {
			// Options
			config: { attributes: true, childList: true, subtree: false },
			throttle: 1000
		});
	};


	/*-------------------------------------- 
	Activation
	---------------------------------------*/
	var _triggers = function(options) {
		utils.fullStory('CB089', 'Variation 1');

		_activate();
	};


	// Run experiment
	_triggers();

})();