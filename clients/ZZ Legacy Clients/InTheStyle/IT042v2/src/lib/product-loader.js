const productLoader = {
	jQ: window.jQuery,

    setProductUrl: function(productUrl) {
        this.productUrl = productUrl;
    },

    getProductUrl: function() {
        return this.productUrl;
    },
	
	_cacheDom: function() {
		var $ = productLoader.jQ;
		var elems = {};
		
		// Elements
		elems.body = document.getElementsByTagName('body')[0];
		elems.$loader = $('.it42-loader');
		elems.$products = $('.products-grid > li > .item');

		this.elems = elems;
		return elems;
	},

	modules: {
		addToBag: {
			_components: {
				src: {
					select: '<select class="IT042_select"><option selected="selected">Select size</option></select>',
					button: '<div class="add-to-cart-button IT042_add-to-cart"><button type="button" title="Add to Bag" class="button btn-cart"><span><span>Add to Bag</span></span></button></div>',
				},
				instance: {},
				init: function() {
					for (var component in this.src) {
						var src = this.src[component];
						this.instance[component] = productLoader.jQ(src);
					}
				}
			},

			_getSizes: function(productUrl, $item) {
				var $ = productLoader.jQ;
				var $select = $('.IT042_select');
				var $button = $('.IT042_add-to-cart');
				var ajaxAddToBag = this._ajaxAddToBag;

				// Show AJAX loader
				productLoader.elems.$loader.show();
				// Disable add to cart button
				$button.children('button').addClass('disable loading');
				// Fallback for hiding loader
				setTimeout(function() {
					productLoader.elems.$loader.hide();
				}, 7000);

				$.ajax({
					url: productUrl,
					type: 'GET',
					dataType: 'html',
					success: function(data) {
						// Hide AJAX loader
						productLoader.elems.$loader.hide();
						// Re-enable add to cart button
						$button.children('button').removeClass('disable loading');

						var $data = $(data);

						// 1. Extract available sizes and stock levels from script tag
						var productJSON = (function() {
							//var script = $data.find('#product-options-wrapper script');
							var JSONStr = data.match(/(spConfig = new Product.Config\()(.+)(\))/)[2];
							var productJSON = JSONStr ? JSON.parse(JSONStr) : false;

							return productJSON;
						})();

						var stockJSON = (function() {
							//var script = $data.find('.col-main > script').text();
							var JSONStr = data.match(/(switcherConfig = )({.+})/)[2];
							var stockJSON = JSONStr ? JSON.parse(JSONStr).stock : false;

							return stockJSON;
						})();

						// If it failed to extract the JSON, show error message to user
						if (!productJSON) {
							alert('Oops sorry! There was an error retrieving the sizes for this product. Please try again from the product page.');
							window.ga('send', 'event', 'IT042', 'Error', 'Error extracting JSON from AJAX response');
							return false;
						} else {
							var sizesArr = null;
                            if(productJSON.attributes && productJSON.attributes[150]) {
                                sizesArr = productJSON.attributes[150].options;
                            } else if(productJSON.attributes && productJSON.attributes[187]) {
                                sizesArr = productJSON.attributes[187].options;
                            }

                            if(sizesArr) {
                                $.each(sizesArr, function() {
                                    var sizeLabel = this.label;
                                    var sizeId = this.id;
                                    var variationId = this.products[0];

                                    if (sizeLabel && sizeId) {
                                        var $li = $('<option data-size-id="' + sizeId + '">' + sizeLabel + '</option>');

                                        // Only append li if size is in stock
                                        if (stockJSON[variationId] > 0) {
                                            $select.append($li);	
                                        }
                                    }
                                });	

                                // Create custom select menu
                                productLoader.modules.customSelect($select, $button);
                            } else {
                                $select.remove();
                            }
						}

						$select.on('change', function() {
							var selectedIdx = $(this)[0].selectedIndex;
							var sizeId = $(this).children('option').eq(selectedIdx).attr('data-size-id');
							ajaxAddToBag(data, sizeId, $item);
						});
						
						// If GET was successful, mark the element with a data attribute
						// so we know not to make this request again
						$item.attr('data-IT042', 'success');
					},

					error: function(jqXHR, textStatus, errorThrown) {
						alert('Oops sorry! There was an error retrieving the sizes for this product. Please try again from the product page.');
						window.ga('send', 'event', 'IT042', 'Error', 'AJAX error getting sizes');
					}
				});
			},
			
			_ajaxAddToBag: function(data, sizeData, $item) {
				var $ = productLoader.jQ;
				var $data = $(data);
				var $form = $data.find('#product_addtocart_form');
				var form = $form[0];
				var url = $form.attr('action');
				var productName = $item.children('a:first').attr('title');
				var data = $form.serialize();
				data += '&isAjax=1';
				
				// Empty AJAX messages container
				window.$('ajax_messages').update('');
				
				// Remove alerts
				window.$$('.alert-box').each(function (element) {
					$(element).remove();
				});

				// Find size attribute part of serialised data and change it to size ID
				var dataSizeInfo = data.match(/(&super_attribute%5B150%5D=[\w\+-\.]+)(&)/)[1];
				data = data.replace(dataSizeInfo, '&super_attribute%5B150%5D='+sizeData);
				
				// Update quantity
				var dataQtyInfo = data.match(/(&qty=[\d]+)(&)/)[1];

				$.ajax({
					url: 'https://www.inthestyle.com/wt_ajaxcart/index/index/',
					type : 'POST',
					data: data,
					success: function(data) {
						 window.ga('send', 'event', 'IT042', 'Submit', 'Product added to bag', {nonInteraction: true});
						productLoader.elems.$loader.hide();
						$.magnificPopup.close();
						updateCart();
					},
					error: function() {
						window.ga('send', 'event', 'IT042', 'Error', 'Error selecting size', {nonInteraction: true});
						productLoader.elems.$loader.hide();
						$.magnificPopup.close();
						alert('Oops sorry! There was an error selecting your size. Please try again from the product page.');
					}
				});

				/* This is a slightly modified version of some code in ajaxCart.js */
				function updateCart() {
					// Refresh page / update mini basket
					window.$(form).request({
						onSuccess: function (response) {
							var json = response.responseText.evalJSON();
							setTimeout(function () {
								// Update cart contents
								window.$$('.right-off-canvas-menu .block-cart').each(function (element) {
									window.$(element).replace(json.sidebar);
								});
	
								window.$$('#cart-dropdown .block-cart').each(function (element) {
									window.$(element).replace(json.sidebar);
								});
	
								// Replace bag link contents
								window.$$('.header-bag').each(function (element) {
									window.$(element).update(json.top_cart);
								});
	
								window.$$('.mobile-bag').each(function (element) {
									window.$(element).update(json.mobile_cart);
								});
	
								// Add messages
								var $successMessage = $('<div data-alert="" class="alert-box success-msg"><p>' + productName + ' was added to your shopping bag.</p><a href="javascript:void(0)" class="close">×</a></div>');
								$successMessage.find('.close').click(function() {
									$successMessage.remove();
								});

								setTimeout(function () {
									$('.right-off-canvas-menu .block-cart').prepend($successMessage);
									$('#cart-dropdown .block-cart').prepend($successMessage.clone());
								}, 300);
			
								// Show cart contents
								$('.link-bag.right-off-canvas-toggle > i').trigger('click');
							}, 200);
	
							if (json.updated_item_id != null) {
								var originalAction = window.$(form).action;
								var newAction = originalAction.replace(/id\/([0-9])+\//g, "id/" + json.updated_item_id + "/");
								$('product_addtocart_form').writeAttribute('action', newAction);
							}
						}
					});
				}
			},

			_bindEvents: function() {
				var $ = productLoader.jQ;
				var getSizes = this._getSizes;
				var module = this;

				// On click of add to bag, retrieve sizes with GET request
				var $button = this._components.instance.button;

                // Load in sizes
                var $item = $('.it42-content');

				var sentBtnEvent = false;
				$button.click(function() {
					if (!sentBtnEvent) {
						window.ga('send', 'event', 'IT042', 'Click', 'Clicked add to bag');
						sentBtnEvent = true;
					}

					if (!$item.attr('data-IT042')) {
                        getSizes.call(module, productLoader.getProductUrl(), $item);
                    }
				});
			},

			_render: function() {
				var $ = productLoader.jQ;
				return this._components.instance.select.add(this._components.instance.button);
			},

			init: function() {
                if(!productLoader.getProductUrl()) {
                    throw "Product UrL not set";
                }

				// Init instance of components
				this._components.init();
				this._bindEvents();
				return this._render();
			}
		},

		customSelect: function($select, $button) {
			/* CUSTOM SELECT MENU - workaround for iOS issue (25/7/17)
			As the select options are loaded in dynamically, the menu will not be complete at 
			the time the user clicks 'Select Size'. The default behaviour on iOS is to show the 
			select wheel the moment a user clicks it resulting in an incomplete dropdown. 
				
			This workaround builds a custom modal containing all the sizes, then when a user clicks
			a size this will trigger a select on the select menu built previously.
			*/
			var $ = productLoader.jQ;
	
			// Create popup on click of select size btn
			var $btn = $button;
	
			var buildSrc = function() {
				var $src = $([
					'<div class="IT042_select-size-modal">',
						'<div class="IT042_modal-title">Select Size</div>',
						'<ul class="IT01-_custom-select-size"></ul>',
					'</div>'
				].join(''));
				var $ul = $src.find('ul');
				var $options = $select.children();
	
				$options.each(function(i) {
					// Skip the first option as it is just 'Select size'
					if (i === 0) {
						return true;
					}
	
					var $opt = $(this);
					var isDisabled = !!$opt.attr('disabled');
					var $li = $('<li class="IT042_opt">' + $opt.text() + '</li>');
	
					if (isDisabled) {
						$li.addClass('IT042_opt--disabled');
					}
	
					var alreadyClicked;
					$li.on('click', function() {
						if (alreadyClicked) {
							return false;
						}
						
						alreadyClicked = true
	
						if (isDisabled) {
							// If already selected do nothing
							return false;
						} else {
							/* Else change the value dropdown element and force
							a change event */
							productLoader.elems.$loader.show();
							setTimeout(function() {
								productLoader.elems.$loader.hide();
							}, 4000);
							//setSelectedIndex($select[0], i);
							$select[0].options[i].selected = true;
							$select[0].dispatchEvent(new Event('change'));
						}
					});
	
					$li.appendTo($ul);
				});
	
				return $src;
			};
	
			var openPopup = function() {
				var $src = buildSrc();
				window.jQuery.magnificPopup.open({
					items: {
						src: $src,
						type: 'inline'
					}
				});
			};
	
			// Open initial popup
			openPopup();
	
			// Open popup again on click
			$btn.on('click', function() {
				openPopup();
			});
		}
	}
};
export default productLoader;
