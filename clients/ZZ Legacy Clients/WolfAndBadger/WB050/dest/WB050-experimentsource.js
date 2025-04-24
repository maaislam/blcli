var _WB050 = (function() {
	/* ------------------------------------
       WB050 Promote Designer PDP
       Variation 1
       Initial Build: 2-10-17 (UC-LN)
       Last Modified: 2-10-17 (UC-LN)
	------------------------------------ */

	var _utils = (function() {
		var getRandomIntInclusive = function(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};
	
		// UC [Poller]
		var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

		// GA Event Status 
		GAEventStatus = {};

		return {
			getRandomIntInclusive: getRandomIntInclusive,
			UC: UC,
			GAEventStatus: GAEventStatus
		};
	})();


	var _elements = (function() {
		var body = document.getElementsByTagName('body')[0];
		var designerInfo = document.querySelectorAll('.desiger-info');
		var designerLinks = document.querySelectorAll('h2.designer-name > a');
		var designerDesc = document.querySelectorAll('#designPanel > .accordion-inner');

		return {
			body: body,
			designerInfo: designerInfo,
			designerLinks: designerLinks,
			designerDesc: designerDesc
		};
	})();


	var _data = (function() {
		var uv = window.universal_variable;
		var category = uv.product.category;
		var subcategory = uv.product.subcategory;
		var designer_url = _elements.designerLinks[0].href;
		var designer_desc = _elements.designerDesc[0].innerText;
		var designer_name = uv.product.manufacturer;
		var product_sku = uv.product.sku_code;
		var ajaxComplete = false;

		return {
			uv: uv,
			category: category,
			subcategory: subcategory,
			designer_url: designer_url,
			designer_desc: designer_desc,
			designer_name: designer_name,
			product_sku: product_sku,
			ajaxComplete: ajaxComplete
		};
	})();
	
	
	function viewChanges() {
		// Push all elements that will open the modal to this array
		// Events will be added to each element in it
		var modalTriggers = [];

		// Add links next to the designer name
		(function() {
			var designerInfo = _elements.designerInfo;
			var i = 0;
	
			for (i; i < designerInfo.length; i++) {
				var link = document.createElement('a');
				link.href = _data.designer_url;
				link.className = 'WB050_designer-link';
				link.innerText = 'View more from this designer';

				modalTriggers.push(link);
	
				designerInfo[i].appendChild(link);
			}
		})();

		// Add cta under meet the designer accordion
		(function() {
			var cta = document.createElement('div');
			cta.className = 'WB050_secondary-cta';
			cta.innerHTML = '<div class="button">View more from this designer</div>';

			modalTriggers.push(cta.querySelector('.button'));

			_elements.designerDesc[0].appendChild(cta);
		})();		


		_elements.modalTriggers = modalTriggers;
	}

	
	function attachEvents(modal) {
		// Add original designer links to modal triggers
		(function() {
			var i = 0;
			var designerLinks = _elements.designerLinks;

			for (i; i < designerLinks.length; i++) {
				_elements.modalTriggers.push(designerLinks[i]);
			}
		})();

		/* On click of designer name, open lightbox and
		   populate with 2 products from designer page */
		$.each(_elements.modalTriggers, function() {
			var $el = $(this);

			$el.click(function(e) {
				e.preventDefault();
				var $this = $(this);

				var event = (function() {
					switch (true) {
						case $this.hasClass('WB050_designer-link'):
						return 'Clicked view more link';
						
						case $this[0].parentNode.className === 'designer-name':
						return 'Clicked designer name';
	
						case $this[0].parentNode.className === 'WB050_secondary-cta':
						return 'Clicked view more CTA';
					}
				})();

				// Send event to GA if first time clicking
				if (!_utils.GAEventStatus[event]) {
					window.ga('send', 'event', 'WB050', 'Click', event, {nonInteraction: true});
					_utils.GAEventStatus[event] = true;
				}

				// Toggle modal
				modal.toggle();

				// If products don't exist, get them
				if (!_data.ajaxComplete) {
					_data.ajaxComplete = true;
					getProducts().then(function($products) {
						var $viewAll = $([
							'<div id="WB050_cta">',
								'<a href="' + _data.designer_url + '" class="button large">View All</a>',
							'</div>'
						].join(''));

						$viewAll.click(function() {
							// Send GA event
							var event = 'Clicked view all CTA';
							if (!_utils.GAEventStatus[event]) {
								window.ga('send', 'event', 'WB050', 'Click', event, {nonInteraction: true});
								_utils.GAEventStatus[event] = true;
							}
						});

						// Append products and view more btn to modal
						$('#WB050_designer-products').html($products).after($viewAll);
						
					});
				}
			});
		});
	}


	function getProducts() {
		// Return 2 products from this designer
		function filterBestMatchingProducts(data) {
			/* 
				Priority:
				1) Matches category and subcategory
				2) Matches category
				3) Pick at random 
			*/
			var priorities = [[], [], []];

			var $data = $(data);
			var $products = $data.find('.product-summary');
			var uv_products = $data.find('.universal-variable-lazyload').data('universalVariable').listing.items;
			var i = 0;
			var uv_product;
			
			// Categorise the products into priorityOne, priorityTwo and priorityThree
			for (i; i < uv_products.length; i++) {
				uv_product = uv_products[i];
				
				// If product SKU is same as the product on the page, skip this product
				if (_data.product_sku === uv_product.sku_code) {
					continue;
				}

				if (_data.category === uv_product.category) {
					if (_data.subcategory === uv_product.subcategory) {
						// 1) Matches category and subcategory
						priorities[0].push(i);
					} else {
						// 2) Matches category
						priorities[1].push(i);
					}
				} else {
					// 3) Doesn't match category
					priorities[2].push(i);
				}
			}

			// Get the two highest priority products available
			var $selectedProducts = $();

			for (i = 0; i < priorities.length; i++) {
				var priority = priorities[i];
				
				// Loop through each priority array
				for (var j = 0; j < priority.length; j++) {
					var idx = priority[j];
					if ($selectedProducts.length === 2) {
						break;
					} else {
						$selectedProducts = $selectedProducts.add($products.eq(idx));
					}
				}
			}

			// Img src fix and GA events
			$selectedProducts.each(function() {
				var $imgs = $(this).find('img');
				$imgs.each(function() {
					var $img = $(this);
					var imgSrc = $img.data('src');
					if (imgSrc) {
						$img.prop('src', $img.data('src'));
					}
				});

				$(this).click(function() {
					// Send event to GA
					var event = 'Clicked related product';
					if (!_utils.GAEventStatus[event]) {
						window.ga('send', 'event', 'WB050', 'Click', event, {nonInteraction: true});
						_utils.GAEventStatus[event] = true;
					}
				});
			});

			return $selectedProducts;
		}

		return new Promise(function(resolve, reject) {
			$.ajax({
				type: 'GET',
				dataType: 'html',
				url: _data.designer_url,
				success: function(data) {
					var $products = filterBestMatchingProducts(data);
					resolve($products);
				},
				error: function() {
					reject('WB050 Error - GET request failed on ' + _data.designer_url);
					document.getElementById('WB050_designer-products').innerHTML = '<a class="WB050_products-link" href="' + _data.designer_url + '">View more from this designer ></a>';
				}
			});
		});
	}


	function createModal() {
		var modal = document.createElement('div');

		// Truncate designer description if it exceeds 400 words
		var truncated_designer_desc = (function() {
			var text = _data.designer_desc;

			if (text.length > 400) {
				var words = text.split(' ');
				var visible = words.splice(0, 60).join(' ');
				var hidden = words.join(' ');

				return '<div class="WB050_designer-desc--visible">' + visible + '</div><div class="WB050_designer-desc--hidden">' + hidden + '</div><div class="WB050_designer-desc--toggle">Read more...</div>';
			} else {
				return text;
			}
		})();

		var content = [
			'<div>',
				'<a href="#" class="WB050_close_btn">X</a>',
				'<div class="WB050_overflow_fix">',
					'<div class="WB050_designer-name"><h1>' + _data.designer_name + '</h1></div>',
					'<div class="WB050_designer-desc">' + truncated_designer_desc + '</div>',
					'<div id="WB050_designer-products" class="products">',
						'<div id="WB050_loading-overlay">',
							'<div class="spinner">',
								'<div class="spinner-icon"></div>',
							'</div>',
						'</div>',
						'<span>Loading more products from this designer...</span>',
					'</div>',
				'</div>',
			'</div>'
		].join('');

		modal.className = 'WB050_pop-up_modal';
		modal.innerHTML = content;

		// Modal functionality
		var functionality = (function() {
			var slideQ = false;
			var $modal = $(modal);
		  
			// Open / close
			function toggle() {
				if (slideQ === false) {
					slideQ = true;
				
					if ($modal.hasClass("active")) {
						$modal.fadeOut("slow", function() {
							$modal.removeClass("active");
							slideQ = false;
						});
					} else {
						// Send event to GA if first time opening
						var event = 'Modal opened';
						if (!_utils.GAEventStatus[event]) {
							window.ga('send', 'event', 'WB050', 'Click', event, {nonInteraction: true});
							_utils.GAEventStatus[event] = true;
						}

						$modal.fadeIn("slow", function() {
							$modal.addClass("active");
							slideQ = false;
						});
					}
				}
			}
			
			$modal.find('.WB050_close_btn').on('click', toggle);
			
			// Close on body click
			$(document).on("mousedown", function(e) {
				if (!$(e.target).closest(".WB050_pop-up_modal > div").length && !$(e.target).closest('#joinModalWishlist').length) {
					if ($modal.hasClass("active")) {
						$modal.fadeOut("slow", function() {
							$modal.removeClass("active");
							slideQ = false;
						});
					}
				}
			});

			// Slide toggle designer description
			if (modal.querySelector('.WB050_designer-desc--toggle')) {
				var desc = modal.querySelector('.WB050_designer-desc');
				var toggleDesc = modal.querySelector('.WB050_designer-desc--toggle');
	
				var isOpen = false;
				$(toggleDesc).click(function() {
					if (isOpen) {
						$(desc).removeClass('WB050_designer-desc--showall');
						$(this).text('read more...');
						isOpen = false;
					} else {
						$(desc).addClass('WB050_designer-desc--showall');
						$(this).text('read less');
						isOpen = true;
					}
				});
			}

			return {
				toggle: toggle
			};
		})();

		// Append modal to body
		_elements.body.appendChild(modal);

		// Return API
		return functionality;
	}


	var init = (function() {
		//var $ = require('jquery');
		var $ = window.jQuery; // debug

		// Namespace CSS
		_elements.body.className += ' WB050';

		// Full Story Tagging
		_utils.UC.poller([function(){var t=window.FS;if(t&&t.setUserVars)return!0}],function(){window.FS.setUserVars({experiment_str:"WB050",variation_str:"Variation 1"})},{multiplier:1.2,timeout:0});

		viewChanges();
		var modal = createModal();
		attachEvents(modal);
	})();

})();