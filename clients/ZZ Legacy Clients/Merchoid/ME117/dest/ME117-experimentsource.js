var _ME117 = (function($) {
	// PLUGINS & HELPER FUNCTIONS
	// UC Library - Poller -- @version 0.2.2
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

	// Full Story Tagging
	UC.poller([
		function() {
			var fs = window.FS;
			if (fs && fs.setUserVars) return true;
		}
	], function () {
		window.FS.setUserVars({
			experiment_str: 'ME117',
			variation_str: 'Variation 1'
		});
	}, { multiplier: 1.2, timeout: 0 });


	// ACTIVATION
	var _triggers = (function() {
		UC.poller([
			function() { return window.jQuery; },
			function() { return window.ga; },
      		'.ux_banner'
		], activate);
	})();


	// EXPERIMENT
	function activate() {
		var $ = window.jQuery;
		$('body').addClass('ME117');

		// --------------------------------------------------------------
		// Get user location - AJAX url is different for US and UK users
		// to reduce JSON file size
		// --------------------------------------------------------------
		var visitorLocation = (function() {
			var location;
			var o = window.optimizely;
		
			if (o && o.data && o.data.visitor && o.data.visitor.location) {
				location = window.optimizely.data.visitor.location;
			}
				
			if (!location) {
				return false;
			}

			if (location === 'GB') {
				return 'uk';
			} else if (location === 'US') {
				return 'us';
			}
		})();

		// TODO: Uncomment this line when going live
		//if (!visitorLocation) return false;
		
		// TODO: Delete this line when going live
		visitorLocation = 'uk';


		// -------------------------------------------------------------------
		// Data object that will contain the original and filtered JSON states
		// The slugsMap object will be fully populated when the filterData function
		// iterates over each option. They are used to construct a URL on submit
		// -------------------------------------------------------------------
		var finderData = {
			productData: '',
			filteredData: {
				json: '',
				categories: [],
				brands: [],
				genders: []
			},
			slugsMap: {
				categories: {
					query: 'product_cat',
					values: {}
				},
				brands: {
					query: 'pa_brand',
					values: {}
				},
				genders: {
					query: 'pa_person',
					values: {
						'Male': 'men',
						'Female': 'ladies',
						'Unisex': 'unisex'
					}
				}
			}
		};


		// ----------------------------------------------------------
		// Markup - NOTE: Can't use 'real' select elements due to iOS 
		// not allowing select options to be updated dynamically
		// ----------------------------------------------------------
		var $HTML = $([
			'<div class="ME117_prod-finder">',
				'<div class="ME117_overlay"></div>',
<<<<<<< HEAD
				'<div class="ME117_banner"></div>',
=======
				'<div class="ME117 Banner"></div>',
>>>>>>> 4523776113c042b7133d73d3ab9341eb1b25b45d
				'<div class="ME117_opt ME117_brands" data-type="brand">',
					'<span class="ME117_opt__label">Brand</span>',
					'<div class="ME117_opt__select">',
						'<span class="ME117_opt__select__placeholder">All Brands</span>',
						//'<span class="ME117_remove-filter">&times;</span>',
<<<<<<< HEAD
						'<div class="ME117_opt__select__inner-wrap">',
							'<div class="ME117_opt__select__inner"></div>',
							'<div class="ME117_selected-opts ME117_row">',
								'<div class="ME117_cols-9">',
									'<div class="ME117_selected-opts__txt">',
										'<span id="ME117_selected-opts__num"></span>',
										' brand(s) selected',
									'</div>',
								'</div>',
								'<div class="ME117_cols-3">',
									'<div class="ME117_selected-opts__done">Done</div>',
								'</div>',
							'</div>',
						'</div>',
=======
						'<div class="ME117_opt__select__inner"></div>',
>>>>>>> 4523776113c042b7133d73d3ab9341eb1b25b45d
					'</div>',
				'</div>',
				'<div class="ME117_opt" data-type="category">',
					'<span class="ME117_opt__label">Category</span>',
					'<div class="ME117_opt__select">',
						'<span class="ME117_opt__select__placeholder">All Categories</span>',
						//'<span class="ME117_remove-filter">&times;</span>',
<<<<<<< HEAD
						'<div class="ME117_opt__select__inner-wrap">',
							'<div class="ME117_opt__select__inner"></div>',
							'<div class="ME117_selected-opts ME117_row">',
								'<div class="ME117_cols-9">',
									'<div class="ME117_selected-opts__txt">',
										'<span id="ME117_selected-opts__num"></span>',
										' categories selected',
									'</div>',
								'</div>',
								'<div class="ME117_cols-3">',
									'<div class="ME117_selected-opts__done">Done</div>',
								'</div>',
							'</div>',
						'</div>',
=======
						'<div class="ME117_opt__select__inner"></div>',
>>>>>>> 4523776113c042b7133d73d3ab9341eb1b25b45d
					'</div>',
				'</div>',
				'<div class="ME117_opt" data-type="gender">',
					'<span class="ME117_opt__label">Gender</span>',
					'<div class="ME117_opt__select">',
						'<span class="ME117_opt__select__placeholder">All Genders</span>',
						//'<span class="ME117_remove-filter">&times;</span>',
<<<<<<< HEAD
						'<div class="ME117_opt__select__inner-wrap">',
							'<div class="ME117_opt__select__inner"></div>',
							'<div class="ME117_selected-opts ME117_row">',
								'<div class="ME117_cols-9">',
									'<div class="ME117_selected-opts__txt">',
										'<span id="ME117_selected-opts__num"></span>',
										' gender(s) selected',
									'</div>',
								'</div>',
								'<div class="ME117_cols-3">',
									'<div class="ME117_selected-opts__done">Done</div>',
								'</div>',
							'</div>',
						'</div>',
=======
						'<div class="ME117_opt__select__inner"></div>',
>>>>>>> 4523776113c042b7133d73d3ab9341eb1b25b45d
					'</div>',
				'</div>',
				'<div class="ME117_cta-wrap">',
					'<div class="ME117_clear-form">Clear form</div>',
					'<div class="ME117_cta">Search</div>',
				'</div>',
			'</div>'
		].join(''));
		var $overlay = $HTML.find('.ME117_overlay');

		// -----------------------------------
		// 
		// -----------------------------------
		var $options = $HTML.find('.ME117_opt');
		var $categoryInput = $options.filter('[data-type="category"]').find('.ME117_opt__select__inner');
		var $brandInput = $options.filter('[data-type="brand"]').find('.ME117_opt__select__inner');
		var $genderInput = $options.filter('[data-type="gender"]').find('.ME117_opt__select__inner');
		var $cta = $HTML.find('.ME117_cta');
		var $clear = $HTML.find('.ME117_clear-form');


		// --------------
		// Inject widget
		// --------------

    
		var uc_pageURL = window.location.href;
		var uc_wizardRE = new RegExp ('.*\/(product-wizard)\/.*');
			
		if ((uc_wizardRE).test(uc_pageURL)) {
       
     		$('.textwidget').hide();
    		var _ROW = '<div><span class="search-again">Search Again ></span></div>';
    		$(_ROW).insertBefore('.entry-header.text-center');
			$($HTML).insertAfter('.entry-header.text-center');
			$('.ME117_prod-finder').addClass('hidden');

			$('.search-again').click(function(){
				$('.ME117_prod-finder').toggleClass('hidden');
			});
  
  		} else {
    		$('.ux_banner').after($HTML);
    	}

		
		// ------------------------------------------------------
		// Load Product Data JSON when user interacts with widget
		// ------------------------------------------------------
		var ajaxPromiseArray = [];
		var widgetActive = false;

		function getJSON() {
			var deferred = $.Deferred();

			$.ajax({
				url: 'https://ab-test-sandbox.userconversion.com/custom-client-scripts/me-product-finder-json/ME110-data-min-' + visitorLocation + '.json',
				type: 'GET',
				dataType: 'json',
				success: function(data) {
					deferred.resolve(data);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.error(textStatus);
				}
			});

			return deferred.promise(); 
		}


		// ---------------------
		// Widget event handlers
		// ---------------------
		var menuToggle = (function() {
			var ctrls = {
				openMenus: [],
				closeMenus: []
			};

			$options.each(function(i) {
				var $el = $(this);
<<<<<<< HEAD
				var $menu = $el.find('.ME117_opt__select__inner-wrap');
=======
				var $menu = $el.find('.ME117_opt__select__inner');
>>>>>>> 4523776113c042b7133d73d3ab9341eb1b25b45d
				var dataType = $el.attr('data-type');
				var placeholder = (function() {
                    switch (dataType) {
                        case 'category':
                        return 'All Categories';

                        case 'brand':
                        return 'All Brands';

                        case 'gender':
                        return 'All Genders';
                    }
<<<<<<< HEAD
				})();
				var filtersSelected = 0;
=======
                })();
>>>>>>> 4523776113c042b7133d73d3ab9341eb1b25b45d
                
				var openMenu = function() {
					$menu.show();
					$el.addClass('ME117_opt--active');
					$overlay.show();
				};
				
				var closeMenu = function() {
					$menu.hide();
					$el.removeClass('ME117_opt--active');
					$overlay.hide();
					// Refilter data every time the menu is closed
					filterData(finderData.productData);
				};

				ctrls.openMenus.push(openMenu);
				ctrls.closeMenus.push(closeMenu);

				$el.click(function() {
					// If field is already selected, do nothing
					//if ($el.find('.ME117_opt__select--active').length) return false;

					if (!widgetActive) {
						widgetActive = true;
						activateWidget();
					}

<<<<<<< HEAD
					$options.find('.ME117_opt__select__inner-wrap').not($menu).hide();
=======
					$options.find('.ME117_opt__select__inner').not($menu).hide();
>>>>>>> 4523776113c042b7133d73d3ab9341eb1b25b45d

					var hasSelectedOptions = !!$(this).find('.ME117_opt__selection').length;
					var menuIsClosed = $menu.css('display') === 'none';
					
					if (menuIsClosed && hasSelectedOptions) {
						return false;
					} else {
						if (menuIsClosed) {
							openMenu();
						} else {
							closeMenu();
						}
					}
				});

				$menu.click(function(e) {
					e.stopPropagation();
				});

				// Run event on mousedown of ME117_opt__select__inner children. Bind event to $el so it's not
				// dependant on the current state
				var $placeholder = $el.find('.ME117_opt__select__placeholder');
<<<<<<< HEAD
				var $selectedOpts = $el.find('.ME117_selected-opts');

				// On click of done button, close menu
				$selectedOpts.find('.ME117_selected-opts__done').click(function (e) {
					e.stopPropagation();
					closeMenu();
				});

				function removeFilter($opt) {
					// Decrement filter selection
					filtersSelected--;
					
					if ($selectedOpts.length) {
						// Hide selected opts if visible
						if (filtersSelected === 0 && $selectedOpts.css('display') !== 'none') {
							$selectedOpts.css('display', 'none');
							$menu.children('.ME117_opt__select__inner').css({
								'padding-bottom': '0'
							});
						}

						$selectedOpts.find('#ME117_selected-opts__num').text(filtersSelected);
					}
					

=======

				function removeFilter($opt) {
>>>>>>> 4523776113c042b7133d73d3ab9341eb1b25b45d
					$opt.removeClass('ME117_opt--selected');
					
					// Remove selection
					$placeholder.children().filter(function() {
						return this.childNodes[0].nodeValue === $opt.text();
					}).remove();

					// If that was last child in placeholder, make field inactive again
					if (!$placeholder.children().length) {
						$menu.children('span.ME117_opt--selected').removeClass('ME117_opt--selected');
						$el.find('.ME117_opt__select').removeClass('ME117_opt__select--active');
						$el.find('.ME117_opt__select__placeholder').html(placeholder);
					}

					// Refilter every time a selection is removed
					//filterData(finderData.productData);
				}

				function addFilter($opt) {
					// Remove previously selected active options
					//$menu.children('.ME117_opt--selected').removeClass('ME117_opt--selected');
					$opt.addClass('ME117_opt--selected');

<<<<<<< HEAD
					// Increment filter selection
					filtersSelected++;

					if ($selectedOpts.length) {
						// Show selected opts if hidden
						if ($selectedOpts.css('display') === 'none') {
							$selectedOpts.css('display', 'flex');
							$menu.children('.ME117_opt__select__inner').css({
								'padding-bottom': '50px'
							});
						}

						$selectedOpts.find('#ME117_selected-opts__num').text(filtersSelected);
					}

=======
>>>>>>> 4523776113c042b7133d73d3ab9341eb1b25b45d
					// Add selection to placeholder
					var $selection = $('<span class="ME117_opt__selection">' + $opt.text() + '</span>');

					$('<span class="ME117_opt__selection__remove">&times;</span>')
						.click(function(e) {
							e.stopPropagation();
							removeFilter($opt);

							var menuIsOpen = $opt.closest('.ME117_opt').hasClass('ME117_opt--active');
							// If the menu is closed re-filter data
							if (!menuIsOpen) {
<<<<<<< HEAD
=======
								console.log('menu is closed - refiltering');
>>>>>>> 4523776113c042b7133d73d3ab9341eb1b25b45d
								filterData(finderData.productData);
							}
						})
						.appendTo($selection);

					// If this is the first selection, empty the default placeholder text
					if (!$placeholder.children().length) {
						$placeholder.empty();
					}

					$placeholder.append($selection);
					
					$el.find('.ME117_opt__select').addClass('ME117_opt__select--active');

					
				}


				$el.on('mousedown', '.ME117_opt__select__inner > *', function(e) {
					e.stopPropagation();

					var $opt = $(this);

					if (!$opt.hasClass('ME117_opt--selected')) {
						addFilter($opt);
						// Scroll placeholder to right to make the last added option visible
						$placeholder.animate({
							scrollLeft: $placeholder[0].scrollWidth
						});

						// If 'Confirm / done' button isn't showing, show it

						// Re-filter select options (only shows possibilities that are in stock)
						//filterData(finderData.productData);
					} else {
						removeFilter($opt);
					}

					

					//closeMenu();
                });

			});

			return ctrls;
		})();

		// Close the open menu on overlay click
		$overlay.on('click', function() {
			$('.ME117_opt--active').trigger('click');
			// var closeMenus = menuToggle.closeMenus;

			// for (var i = 0; i < closeMenus.length; i += 1) {
			// 	closeMenus[i]();
			// }
		});

		// On submit, get values of selected options and build URL using their slugs
		function getSelections(option) {
			var $selections = $HTML.find('[data-type="' + option + '"] .ME117_opt__select__placeholder .ME117_opt__selection');
			if (!$selections.length) {
				return false;
			} else {
				var selections = [];

				$selections.each(function() {
					var text = this.childNodes[0].nodeValue;
					selections.push(text);
				});

				return selections;
			}
		}

		$cta.click(function() {
			var brand = getSelections('brand');
			var category = getSelections('category');
			var gender = getSelections('gender');

			if (!category && !brand && !gender) {
				// Nothing selected, show error
				alert('Please select at least one option');
				return;
			} else {
				var url = buildSearchURL(category, brand, gender);
				window.location.href = url;
			}
		});


		$clear.click(function() {
			// Remove all active selections
			var $active = $('.ME117_opt__select--active');
			$active.each(function() {
				var type = $(this).closest('.ME117_opt').attr('data-type');
				var placeholder = (function() {
					switch(type) {
						case 'brand':
						return 'All Brands';

						case 'category':
						return 'All Categories';

						case 'gender':
						return 'All Genders';
					}
				})();

				var $placeholder = $(this).find('.ME117_opt__select__placeholder');
				$placeholder.empty();
				$placeholder.html(placeholder);
				$(this).removeClass('ME117_opt__select--active');
			});

			// Refresh data
			filterData(finderData.productData);
		});

		// ----------------------------------------------
		// Returns a URL with filter slugs appended to it
		// ----------------------------------------------
		function buildSearchURL(category, brand, gender) {
			var url = '';
			var base = 'https://www.merchoid.com/product-wizard/';
			var query = '';
			var separator = '?';
			var slugs = finderData.slugsMap;

			if (category) {
				var categoriesString = (function() {
					var slugString = '';
					for (var i = 0; i < category.length; i++) {
						if (i > 0) slugString += ',';
						slugString += slugs.categories.values[category[i]];
					}
					return slugString;
				})();
				query += separator + slugs.categories.query + '=' + categoriesString;
				separator = '&';
			}

			if (brand) {
				var brandsString = (function() {
					var slugString = '';
					for (var i = 0; i < brand.length; i++) {
						if (i > 0) slugString += ',';
						slugString += slugs.brands.values[brand[i]];
					}
					return slugString;
				})();
				query += separator + slugs.brands.query + '=' + brandsString;
				separator = '&';
			}

			if (gender) {
				var gendersString = (function() {
					var slugString = '';
					for (var i = 0; i < gender.length; i++) {
						if (i > 0) slugString += ',';
						slugString += slugs.genders.values[gender[i]];
					}
					return slugString;
				})();
				query += separator + slugs.genders.query + '=' + gendersString;
				separator = '&';
			}

			url = base + query;
			return url;
		}

		// ---------------
		// Data
		// ---------------
		var brandImages = {
			'Adventure Time': '//cdn.optimizely.com/img/6087172626/f5d753c1fdb7435fbdbff6f10d69d0f1.jpg',
            'Alien': '//cdn.optimizely.com/img/6087172626/9b14f097a53743c8a831f06d49f28f74.jpg',
            'Ant-Man': '//cdn.optimizely.com/img/6087172626/27d61f112b7d45ecb7a57f9d4c3cd8d7.jpg',
            'Arrow': '//cdn.optimizely.com/img/6087172626/fb2fce12181846cf8bcd125c87c5999e.jpg',
            'Assassin\'s Creed': '//cdn.optimizely.com/img/6087172626/331183a2902847ab8814465938911f4a.jpg',
            'Atari': '//cdn.optimizely.com/img/6087172626/e99ed94f994941c989fe5ff792fb7b62.jpg',
            'Back to the Future': '//cdn.optimizely.com/img/6087172626/456318b9e6d94239a27df1397d68fcf7.jpg',
            'Batman': '//cdn.optimizely.com/img/6087172626/1fa310cb67b24acd99f8dcf6abeef692.gif',
            'Black Panther': '//cdn.optimizely.com/img/6087172626/441cabb82dab4d4794bf0f9a634b5256.jpg',
            'Breaking Bad': '//cdn.optimizely.com/img/6087172626/ad492198ae94429793596ec5bdae17d6.jpg',
            'Captain America': '//cdn.optimizely.com/img/6087172626/81b27e5781144a18afb59f12d0798218.jpg',
            'Cool Stuff': '//cdn.optimizely.com/img/6087172626/b70b687c86b644c08be6894b4ddab1c9.png',
            'Crash Bandicoot': '//cdn.optimizely.com/img/6087172626/9e11e122ddf543d4a064fb31d3e19e16.jpg',
            'DC Comics': '//cdn.optimizely.com/img/6087172626/0c12c68405334a51b88837970389ddb6.jpg',
            'Deadpool': '//cdn.optimizely.com/img/6087172626/f01a7623f0534273a501c3288293484d.jpg',
            'Destiny': '//cdn.optimizely.com/img/6087172626/7efe5773767d437c804ace3cf8939f8b.jpg',
            'Disney': '//cdn.optimizely.com/img/6087172626/9c22f89caa794f38835bf8841c16dae7.jpg',
            'Doctor Who': '//cdn.optimizely.com/img/6087172626/696144116bff4f05893d301e22e7bba9.jpg',
            'Donkey Kong': '//cdn.optimizely.com/img/6087172626/dd5ba70c83174e7baca938dc86e7cdc4.jpg',
            'Dragon Ball Z': '//cdn.optimizely.com/img/6087172626/807f64e9c08247f3b91fa75d7593ee96.jpg',
			'Fallout': 'data:image/webp;base64,UklGRtIIAABXRUJQVlA4IMYIAADQJwCdASpkAGQAPm0wlEakIyIhKTgL4IANiUAaehmaNAY3mo+23t53jogOpV9ADpRv3P9I7NOf6T2X/1/oo/FHtVurGpB8S+u/4ryV74eAF+KfyL/Dfl153OwKAB+V/0v/gfa9zgfYD/T+iN/xfWb/R+DRQA/O3ng/9X+R/J32j/m3+R/7v+V+Aj+Yf1r/b/3v96f8b83nr7/cX2VP2YPaWYzcpWz0fSwXB3T9FgUxC0RbBN8bW0lop62xqTJn3HkO94bHkeYSxrhqtySckP+DhCZ9/f948C79zGtl+ZkY5LImHtmW9pHqXt9jWB+CtR2tEIbsewvy94joOm5CdGYO+jV7maUOIVq7qn4rBEQtWNn1knD2SSu3B5G77BhwiYJlhqZCDGuKZFiPMkJsSmYODf9PYPFL+R3bE0uAFXU8g3NZzJ5khyAA/vyoC6sUpr+RtZwSMT88JAHCkoaeM3gXiEsdr/FT3+NXfCGvsoT4LGNpRBQmKf3SMi+CVneBffNxJfu1W4/cKENhEf/lyOV2lo0q+I6a38jMFlkyYcZKZkGusbycBmZ7JFBCXYxuAZXOXKy4JX1ijZVputqQa7wBJmzEm1CH4fm0tabykP0mLF/SGeYBPnenIoCbHCy60XW9p/tsIwGBkopv/+JmDU734laMpI/56YM1H725ez5XF+mj54BBXZ+AIteRjYkCA8zx612OVa/s7zJAuzthmzjib4V/xCv++BwQHW2eHffm5XfD8AFmQp1Kj4+EnboBfpN3lEnQemkeJOJmvkP5V5p9FNop4+sZVFuEAyTe34YZkcYm9opPXpVesKg2qNC9QFOt1bdR2FFdo+wsyYql1Dkq0lDjIx+JcEL84VMY/YgmEfYLRQhalH2k/k0vFrTybnboiPxiUM8P2MB4AIid2hKJShDIAarBKbX+qHDcMC79n6/nND+ufah+VYf2/9DkVd2w+rnj+GJTNDFX+bw3w6omy8RiqZuM65Jn8pHI3V2fnQhx89LJlQA2onEGpD/ECtsyRTafu2YrP5yXQIc/G/4GgFWKH1Od/su1BVcY2UJqjv7Uih7+z0CBwnG7v5k1Fu7Kq7wTnI5XillCfe8zelmrh5NKmb8U8d4SrHaqsOs3uRkmr+nr2Alux1/8sffzer+3vN3lzQflM60w6kWys75fDtKuGexb0gig7vrU/KtP8bh4j0Xw21Fo8i0x0Jv3l5hqN3ySsnVMitJrKRSyYS7RCr3ZXQDbh9u30Qj+e6Nk/H0+y03VL7fxPgSLCsuv2BY13Ri7epsm21onfWLLgqvJuk6XwfmgI3xM0CgXzyW8/D3qm8CwOpyXDnOPLPvTJQUpt8AlzRzm0yhWQQP9Bs8+1OnW05drd1fNSW0heNavKh/zHkT+mh78iYn9q80kllKuKB6xWxl7R1YhPvXPdT6x1rmNn2iXk/8UQTp1J4Yb3z+mx43Hg6Mnovu3pc5/RXWCkz/zcnrsK2WqWkVoDuh2qNx1V8KkLMmsV2b57GJ79rKLy59c2nrL04vxO/q88X+dbSNltr8jqilIG98RoZusOGvzb4Q7XouvbNEJKBuhueGvWXxYhIFdVF2TNIoS3rPYZrx92/2ek9bI/+oItKCgfAWQSyrCfxI/k21/nzqaoy7oVAT5GTt0nc2mk+USSUQHx/qNsLhFfEcKNzQIyt4tQbAOpmo0k7NsMCPW4d+9R+D2wzg25rQnLGzjd+ZsRV4cca91vrMLyJBxRil6l2plIy0dRlqep81WxAyCf/Y+CHEYqsxa7eNrzFirdvV+5VOmk9VWNOj0BDocNTpfImuuwBXTjuSpDQ7EWUaYbgNjQjsESmBmBRnbCSecdLJjfsIQsp8i8X0FRQelQBdC6gxcjaUb1gHRl/1BP5s8adIHX/u0BISB1FySOfw8LBVPFDGmvSzs6ZgHlwoOHHNdc68dnXktsCPWCP/o2x+cu6fV7l3mmnqlDOSPOT8cpLokYVI0X+T877hCsbO5nZkRXs+z8MTY976cz/iMQAMA3/tnSMutBu5sUPFrEbXASuLOebEvcWIBZvVw3l8YHTIRSu2epX80aQzL2ZO8GX0kNJAKoHrUoX2pobPHQcLV66PlSxlgDnqNV1eoAmZPEQVAuwEtBQwzCqo/qvFT+K82w/L9xVBuMgsIPdZW6rpJkQDATGBoGkImR2fxVts+3zMkdIez/wuzwk39d0b9I6gwxncHOi0TI86+r/j47dePyT9SYO4Snz1QyKpqao+I+6tC7jMzIgQZP/1lUJeTKjJbe77+Y3evJ+BHb/cdOUDntO1sp2OqhzLdJov2SbIPVWWmVdDjhxmf3xizlq177LxN71tyAD46MVU47yTBKqFLLHqVJvh5QdGwFR+MZV6z3W9P/0riG4xOTQ5/rGtpDV6C2MsTfwcQ3LBGX7xTGB/HebI2DdxllCsNl1TPvrPyY9PR5zg3y7wAj0uuyPtGzmTDZUknbS504yx0Wn9C3doWWbfJVf5oCkhqcpIv213yGXnYvjygSy7gTg767QqQf1V2HOYfXRG87dthZhKtV+k4gHvNWX/nrRMySxrGLq9USMDp7/TRkt79Fjo3tMHdwunW2ZrUXAJX8KwyKsFWf9lxsvyL+tfCznPwHzRu83u3RkhYeIko8w/vMOCKDfUZiq2I0kctd05zH5Vr89sRsP5FBQT/yy9sUco0zFbyBfr7oJRGWezjjbL1qF60seVHbJ+uD69WxGeUrr6YchQFYOCZGuaOmRXBACWSzIlqWrP3JesFTQswdvD7bn9RBzfxqzX6Omb13DPIACeMCVvWYVSD1ZyIzEuVngJRDKMwNJk7kRdayM1El133Nc3gD7UxYTv+UTIRxPxtK7WuW8qmgqUPPX7zNkp5+8tVdQh1qUjuZIJZS8Dx0XPHliVeZi8N2tjWHUrXvEZ+l+OrT+2BEH2/IqtY4g9sCxDK/CaZpsJYVBgkIwMETb5AyFt9/svbXLbZv9ocG4gAAAAAAA==',
			'Game of Thrones': '//cdn.optimizely.com/img/6087172626/9c732c5edd0f4021845237bbb5b87692.jpg',
            'Green Lantern': '//cdn.optimizely.com/img/6087172626/564372c1750d436ea256914c0f3f720d.jpg',
            'Guardians of the Galaxy': '//cdn.optimizely.com/img/6087172626/01ef480888f54ab2b7963328cc7b6eb6.jpg',
            'Harley Quinn': '//cdn.optimizely.com/img/6087172626/e0d80e6688964f5ea963065fcf7cbd5b.jpg',
	        'Harry Potter': '//cdn.optimizely.com/img/6087172626/c0fab7da537e4cd3a2bf49a6f16e7404.jpg',
			'Iron Man': '//cdn.optimizely.com/img/6087172626/0f86da3a215c4d8cad46d9a2b0fd3deb.jpg',
			'Joker': '//cdn.optimizely.com/img/6087172626/7a92211cb56b427ca049f56a4da24b68.jpg',
			'Justice League': '//cdn.optimizely.com/img/6087172626/e40bbc4f6ff748a38cf5b1c639952a75.jpg',
			'Legend of Zelda': '//cdn.optimizely.com/img/6087172626/25d3907d3c784648afb9e7aff41dc453.jpg',
			'Lord of the Rings': '//cdn.optimizely.com/img/6087172626/fe4932773a6d412283ee67a66ce58e9f.jpg',
            'Mafia': '//cdn.optimizely.com/img/6087172626/6e45dc1f6c3e4897bdfe8b782ee03299.jpg',
            'Marvel': '//cdn.optimizely.com/img/6087172626/4c2283012b344488a4f3fbe6a49ce95b.jpg',
            'Mass Effect': '//cdn.optimizely.com/img/6087172626/a61e0b4ee6fa48b79b894c9809ccd9f2.jpg',
	        'Metal Gear Solid': '//cdn.optimizely.com/img/6087172626/64d0b426df854198895c268280549d24.jpg',
			'Mythology': '//cdn.optimizely.com/img/6087172626/3b2682c1da934a9d8fce736a978446b1.jpg',
            'Nintendo': '//cdn.optimizely.com/img/6087172626/48943f2776f04b0a917878ef620c80fe.jpg',
            'Overwatch': '//cdn.optimizely.com/img/6087172626/d3fb101a26c5420e9c3c6574426bc08a.jpg',
			'Pay Day': '//cdn.optimizely.com/img/6087172626/7b0d11f151fe4b31bec5463904c15294.jpg',
            'PlayStation': '//cdn.optimizely.com/img/6087172626/7a4b2e2ddfa844838617b3542b5b2201.jpg',
			'Pokemon': '//cdn.optimizely.com/img/6087172626/5c051218e1de4e93a5f3241c4817e8d4.jpg',

			'Portal 2': '//cdn.optimizely.com/img/6087172626/ef1cd62520254df4b136761d8dec0723.jpg',
			'Prey': '//cdn.optimizely.com/img/6087172626/2df2148f67c647268232f51f2c1da680.jpg',
			'Resident Evil': '//cdn.optimizely.com/img/6087172626/04a27b4ae1e74889b681f1b8b3395e7b.jpg',
			'Rick and Morty': '//cdn.optimizely.com/img/6087172626/2d02589d95d64410aab3a63de658329b.jpg',
			'Sega': '//cdn.optimizely.com/img/6087172626/4f514909a04344dfb32746ba7c151077.jpg',
			'Skyrim': '//cdn.optimizely.com/img/6087172626/7299b560aa414706bdc99c221c7d02bd.jpg',
			'Sonic the Hedgehog': '//cdn.optimizely.com/img/6087172626/3b0230320444490e86e604b5742f581f.jpg',
			'Sony': '//cdn.optimizely.com/img/6087172626/a1432c349b684056a7480dc9e93ab945.jpg',
			'Spider-man': '//cdn.optimizely.com/img/6087172626/65bd76f4b9fa447c827cae1691c82824.jpg',

			'Star Trek': '//cdn.optimizely.com/img/6087172626/ed95d4f70a444a31a9dfff654e067744.jpg',
            'Star Wars': '//cdn.optimizely.com/img/6087172626/37f6d9a33de04195b53154d2a25f0e26.jpg',
            'Street Fighter': '//cdn.optimizely.com/img/6087172626/fb72231be40d4629b88bcab2fcaa4e26.jpg',
            'Suicide Squad': '//cdn.optimizely.com/img/6087172626/619f60d7f6d54f2988946b5bb1178ca4.jpg',
            'Super Mario Bros': '//cdn.optimizely.com/img/6087172626/134b52540b3a4aa1ad8eca817a2f4be6.jpg',
	   	 	'Superman': '//cdn.optimizely.com/img/6087172626/dce6ecaa372f4feba94f1ccb1578f6fa.jpg',
            'Tekken': '//cdn.optimizely.com/img/6087172626/e8e5125d178a4eb48351214e4d9aff81.jpg',
            'Terminator': '//cdn.optimizely.com/img/6087172626/846c2c82e2094ec383be23091e649ab7.jpg',
	    	'The Avengers': '//cdn.optimizely.com/img/6087172626/43083f01aa4f45108e9dc1c1320f1b4f.jpg',
            'The Flash': '//cdn.optimizely.com/img/6087172626/81672ff2dcff40cdad0df72a14f84bb2.jpg',
            'The Incredible Hulk': '//cdn.optimizely.com/img/6087172626/0a30e1264f5940a5a46ec2675cc5a835.jpg',
            'The Punisher': '//cdn.optimizely.com/img/6087172626/6353ca8b82ea42eeb83d3d438a72d7c3.jpg',
            'The Walking Dead': '//cdn.optimizely.com/img/6087172626/38c3ade47e144ed5afe975a7b30adc38.jpg',
            'Thor': '//cdn.optimizely.com/img/6087172626/99c59e94c7ef4b8a8d59ffeaabe5f184.jpg',
            'Transformers': '//cdn.optimizely.com/img/6087172626/8ebb1ba61ca54d73b2b1657648ee3fd0.jpg',
            'Wonder Woman': '//cdn.optimizely.com/img/6087172626/dae6883f6c2f4556a523e783cdfed72c.jpg',
		};

		// ---------------
		// Activate widget
		// ---------------
		function activateWidget() {
			ajaxPromiseArray.push(getJSON());

			// ---------------------------------------------------------------
			// When promise is resolved, populate select elements with options
			// ---------------------------------------------------------------
			$.when.apply($, ajaxPromiseArray).then(function(productData) {
				// Keep a record of the full JSON to refer back to when re-filtering
				finderData.productData = productData;

				filterData(productData);
			});
		}


		// ------------------
		// Filter functions
		// ------------------
		function filterData(data) {
<<<<<<< HEAD
=======
			console.log('RE-FILTERING OPTIONS');
>>>>>>> 4523776113c042b7133d73d3ab9341eb1b25b45d
			// Reset filtered data
			finderData.filteredData = {
				categories: [],
				brands: [],
				genders: []
			};

			// Get currently selected options
			var getSelectedOptions = function($input) {
				var $selections = $input.closest('.ME117_opt__select').find('.ME117_opt__selection');
				if ($selections.length) {
					var selections = [];
					$selections.each(function() {
						var value = this.childNodes[0].nodeValue;
						if (value) selections.push(value);
					});
					return selections;
				} else {
					return false;
				}
			};
			
			var selectedBrand = getSelectedOptions($brandInput);
			var selectedCategory = getSelectedOptions($categoryInput);
			var selectedGender = getSelectedOptions($genderInput);

			/* Return array of stock levels to check depending on the selected gender
			   n.b. When the JSON file was minified the labels "Male", "Female" and "Unisex" 
			   were replaced by a single letter. This is what the second array item is */
			var stockLevels = (function() {
				var toReturn = [];

				if (!selectedGender) {
					// Check stock for all genders if none are specified
					toReturn = [['Male', 'g'], ['Female', 'h'], ['Unisex', 'i']];
				} else {
					if (selectedGender.indexOf('Male') > -1) {
						toReturn.push(['Male', 'g']);
					}

					if (selectedGender.indexOf('Female') > -1) {
						toReturn.push(['Female', 'h']);
					}

					if (selectedGender.indexOf('Unisex') > -1) {
						toReturn.push(['Unisex', 'i']);
					}
				}

				return toReturn;
			})();

			// Loop through all objects in data argument and filter them
			for (var i = 0, n = data.length; i < n ; i += 1) {

				(function(i, val) {
					var isCategory, isBrand, j;
					var gendersInStock = [];

					// If a category is selected, check to see if this object category matches
					var category = val.e;
					if (selectedCategory) {
						if (selectedCategory.indexOf(category) > -1) {
							isCategory = true;
						} else {
							return;
						}
					} else {
						isCategory = true;
					}

					// If a brand is selected, check to see if this object brand matches
					var brand = val.a;
					if (selectedBrand) {
						if (selectedBrand.indexOf(brand) > -1) {
							isBrand = true;
						} else {
							return;
						}
					} else {
						isBrand = true;
					}

					// Check the stock level of each stock key
					// Product is in stock if any of them are above 0
					for (j = 0; j < stockLevels.length; j += 1) {
						var label = stockLevels[j][0];
						var key = stockLevels[j][1];
						var stockLevel = val[key];

						if (stockLevel > 0) {
							gendersInStock.push(label);
						}
					}

					if (isCategory && isBrand && gendersInStock) {
						var slugsMap = finderData.slugsMap;

						// Push all available options to filtered data arrays
						// These will be referenced when populating the lists
						if (finderData.filteredData.categories.indexOf(category) === -1) {
							finderData.filteredData.categories.push(category);
						}

						if (finderData.filteredData.brands.indexOf(brand) === -1) {
							finderData.filteredData.brands.push(brand);
						}

						for (j = 0; j < gendersInStock.length; j += 1) {
							if (finderData.filteredData.genders.indexOf(gendersInStock[j]) === -1) {
								finderData.filteredData.genders.push(gendersInStock[j]);
							}
						}

						// If the value is new, map the URL slug in the slugsMap object
						if (!slugsMap.categories.values[category]) {
							slugsMap.categories.values[category] = val.d;
						}

						if (!slugsMap.brands.values[brand]) {
							slugsMap.brands.values[brand] = val.b;
						}
					}

				})(i, data[i]);
			}

			var selectedData = {
				categories: selectedCategory,
				brands: selectedBrand,
				genders: selectedGender
			};

			populateForm(selectedData);
		}
		
    $('.ux_banner.dark').hide();

	function populateForm(selectedData) {
		var filteredData = finderData.filteredData;
		var categories = filteredData.categories.sort();
		var brands = filteredData.brands.sort();
		var genders = filteredData.genders.sort();
		var selectedCategories = selectedData.categories;
		var selectedBrands = selectedData.brands;
		var selectedGenders = selectedData.genders;

		// If option is selected (in selectedData), add the selected class to the span

		// Categories
		(function() {
			var html = '', category;
			for (var i = 0; i < categories.length; i += 1) {
				category = categories[i];
				if (selectedCategories && selectedCategories.indexOf(category) > -1) {
					html += '<span class="ME117_opt--selected">' + category + '</span>';
				} else {
					html += '<span>' + category + '</span>';
				}
			}
			$categoryInput.html(html);
		})();

		// Brands
		(function() {
			var html = '', brand;
			for (var i = 0; i < brands.length; i += 1) {
				brand = brands[i];
				if (selectedBrands && selectedBrands.indexOf(brand) > -1) {
					html += '<div class="ME117_brand-wrap ME117_opt--selected"><div class="ME117_brand"><span class="ME117_brand-img" style="background-image:url(\'' + brandImages[brand] + '\')"></span><span class="ME117_brand-txt">' + brand + '</span></div></div>';
				} else {
					html += '<div class="ME117_brand-wrap"><div class="ME117_brand"><span class="ME117_brand-img" style="background-image:url(\'' + brandImages[brand] + '\')"></span><span class="ME117_brand-txt">' + brand + '</span></div></div>';
				}
			}
			$brandInput.html(html);
		})();

		// Genders
		(function() {
			var html = '', gender;
			for (var i = 0; i < genders.length; i += 1) {
				gender = genders[i];
				if (selectedGenders && selectedGenders.indexOf(gender) > -1) {
					html += '<span class="ME117_opt--selected">' + genders[i] + '</span>';
				} else {
					html += '<span>' + genders[i] + '</span>';
				}
			}
			$genderInput.html(html);
		})();
	}

  }

})(window.$);