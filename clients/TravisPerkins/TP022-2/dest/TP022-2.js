var _TP022 = (function() {
	// PLUGINS + HELPERS
	// UC Library - Poller - @version 0.2.2
	var UC = {};
	UC.poller = function (elements, cb, options) {
        var settings = {
            wait: 50,
            multiplier: 1,
            timeout: 7000
        };
        
        var now = Date.now || function() { return new Date().getTime(); };
        
        if (options) {
            // Overwrite defaults with values from options
            for (var option in options) {
                settings[option] = options[option];
            }
        } else {
            options = settings;
        }
        
        var timeout = settings.timeout ? new Date(now() + settings.timeout) : false;
        var wait = settings.wait;
        var multiplier = settings.multiplier;
        
        var successful = [];
        var time;
        var pollForElement = function (condition, time) {
            if (timeout && now() > timeout) { return false; }
            time = time || wait;

            var conditionIsTrue = (function() {
                var type = typeof condition;
                var toReturn;
                
                if (type === 'function') {
                    toReturn = condition();
                } else if (type === 'string') {
                    toReturn = document.querySelector(condition);
                } else {
                    toReturn = true;
                }
                
                return toReturn;
            }());
            
            if (conditionIsTrue) {
                successful.push(true);
                if (successful.length === elements.length) cb();
            } else {
                setTimeout(function () {
                    pollForElement(condition, time * multiplier);
                }, time);
            }
        };

        for (var i = 0; i < elements.length; i++) {
            pollForElement(elements[i]);
        }
    };

	// Exclude hidden and empty elements from selector
	$.fn.filterVisible = function() {
    	return this.filter(function() {
			return $(this).css('display') !== 'none' && $(this).children().length > 0;
		});
	};

	// Extract text nodes
	$.fn.getTextNodes = function() {
		return this.contents().filter(function() {
			return this.nodeType === 3; 
		});
	};

	// Full Story Integration
	UC.poller([
		function() {
			var fs = window.FS;
			if (fs && fs.setUserVars) return true;
		}
	], function () {
		window.FS.setUserVars({
			experiment_str: 'TP022',
			variation_str: 'Variation 2 Mobile'
		});
	}, { multiplier: 1.2, timeout: 0 });

	//--- Extract Data ---
	var extractData = function() {
		var nav_JSON = [];
		var $nav = $('#slide_menu > .ui-panel-inner > ul:last');

		// Loop though first level links
		var $level1 = $nav.children('li').filterVisible();
		$level1.each(function() {
			var $el = $(this);
			var isSingleLink = !$el.children('.ui-collapsible-content').length;
			var $link = (function() {
				if (isSingleLink) {
					return $el.find('> a');
				} else {
					return $el.find('> h2 > a');
				}
			})();
			var title = $link.getTextNodes()[0];
			var url = $link.attr('href');

			// If no title exists, skip to next nav item
			if (!title) return true;

			var level1Obj = {
				'title': title.nodeValue,
				'url': url,
				'children': []
			};

			// Loop through second level links
			var $level2 = $el.find('> .ui-collapsible-content > ul.L2 > li');
			$level2.each(function() {
				var $el = $(this);
				var isSingleLink = !$el.children('.ui-collapsible-content').length;
				var $link = (function() {
					if (isSingleLink) {
						return $el.find('> a');
					} else {
						return $el.find('> h2 > a');
					}
				})();
				var title = $link.getTextNodes()[0];
				var url = $link.attr('href');
				
				var level2Obj = {
					'title': title.nodeValue,
					'url': url,
					'children': []
				};

				level1Obj.children.push(level2Obj);

				// Loop through third level links
				var $level3 = $el.find('ul.L3 > li');
				$level3.each(function() {
					var $el = $(this);
					var isSingleLink = !$el.children('.ui-collapsible-content').length;
					var $link = (function() {
						if (isSingleLink) {
							return $el.find('> a');
						} else {
							return $el.find('> h2 > a');
						}
					})();
					var title = $link.getTextNodes()[0];
					var url = $link.attr('href');

					var level3Obj = {
						'title': title.nodeValue,
						'url': url
						//'children': []
					};

					level2Obj.children.push(level3Obj);
				});

			});

			nav_JSON.push(level1Obj);

		});

		return nav_JSON;
	};

	// Stick Quick Links Function
	var stickQuickLinksFunc;

	//--- Build nav ---
	var buildNav = function(data) {
		// Images for level 2 categories
		var getCategoryImage = function(category) {
			var src;

			switch (category) {
				case 'Decking':
					src = 'https://ab-test-sandbox.userconversion.com/experiments/TP022-decking.png';
					break;
				case 'Sawn Timber':
					src = 'https://ab-test-sandbox.userconversion.com/experiments/TP022-sawn.png';
					break;
				case 'Fencing':
					src = 'https://ab-test-sandbox.userconversion.com/experiments/TP022-fence.png';
					break;
				default:
					src = 'http://icons.iconarchive.com/icons/icons8/windows-8/512/Business-Questions-icon.png';
			}

			return src;
		};

		// Level 1
		var $nav_HTML = $([
			'<div class="TP022_nav">',
				'<div class="TP022_static-link">',
					'<a href="/login">',
						'<span>Log in / Register</span>',
					'</a>',
				'</div>',
				'<div class="TP022_static-link">',
					'<a href="/quote-list">',
						'<span>Your Quote List</span>',
					'</a>',
				'</div>',
				'<div class="TP022_nav-type">',
					'<div class="TP022_nav-type-btn-wrap">',
						'<div class="TP022_nav-type-btn TP022_nav-type-active" id="TP022_nav-cat-btn">',
							'<div class="TP022_nav-type-img"><img src="https://ab-test-sandbox.userconversion.com/experiments/TP022-2-list.png" /></div>',
							'<div class="TP022_nav-type-title">Categories</div>',
						'</div>',
					'</div>',
					'<div class="TP022_nav-type-btn-wrap">',
						'<div class="TP022_nav-type-btn" id="TP022_nav-az-btn">',
							'<div class="TP022_nav-type-img"><img src="https://ab-test-sandbox.userconversion.com/experiments/TP022-2-az.png" /></div>',
							'<div class="TP022_nav-type-title">A to Z Index</div>',
						'</div>',
					'</div>',
				'</div>',
				'<ul class="TP022_level1" id="TP022_cat-nav"></ul>',
				'<ul class="TP022_level1" id="TP022_az-nav" style="display: none">',
					//'<div id="TP022_btt-link">Back to top</div>',
				'</ul>',
			'</div>'
		].join(''));

		var $level1_cat = $nav_HTML.find('#TP022_cat-nav');
		var $level1_cat_btn = $nav_HTML.find('#TP022_nav-cat-btn');

		var $level1_az = $nav_HTML.find('#TP022_az-nav');
		var $level1_az_btn = $nav_HTML.find('#TP022_nav-az-btn');

		/*
		var $backToTop = $nav_HTML.find('#TP022_btt-link');
		$backToTop.on('click', function() {
			$nav_HTML.scrollTop(5);
		});
		*/

		// Switch between nav types
		$level1_cat_btn.on('click', function() {
			var isActive = $(this).hasClass('TP022_nav-type-active');
			if (!isActive) {
				// hide a-z
				$level1_az_btn.removeClass('TP022_nav-type-active');
				$level1_az.hide();

				// show cat
				$level1_cat_btn.addClass('TP022_nav-type-active');
				$level1_cat.show();

				// remove scroll event for 'back to top' link as it's not necessary for this nav type
				$nav_HTML.off('scroll', stickQuickLinks);
			}
		});

		$level1_az_btn.on('click', function() {
			var isActive = $(this).hasClass('TP022_nav-type-active');
			if (!isActive) {
				// hide cat
				$level1_cat_btn.removeClass('TP022_nav-type-active');
				$level1_cat.hide();

				// show a-z
				$level1_az_btn.addClass('TP022_nav-type-active');
				$level1_az.show();

				// show 'back to top' link on scroll
				$nav_HTML.on('scroll', stickQuickLinks);
			}
		});

		function stickQuickLinks() {
			var scrollTop = $nav_HTML.scrollTop();
			var $quickLinks = $level1_az.find('#TP022_az-quick-links');
			var scrolledPastWaypoint = scrollTop >= 216; // offset top - header height
			var quickLinksStuck = $level1_az.hasClass('TP022_az-quick-links--stick');

			if (!quickLinksStuck && scrolledPastWaypoint) {
				$level1_az.addClass('TP022_az-quick-links--stick');
				$level1_az.find('.TP022_az-all-groups').css({
					'marginTop': $quickLinks.outerHeight()
				});
			} else if (!scrolledPastWaypoint && quickLinksStuck) {
				$level1_az.removeClass('TP022_az-quick-links--stick');
				$level1_az.find('.TP022_az-all-groups').removeAttr('style');
			}	
		}

		stickQuickLinksFunc = stickQuickLinks;

		// Loop through level 1 items
		$.each(data, function(i) {
			var level1 = this;
			var $html = $([
				'<li>',
					'<a href="' + level1.url + '">',
						level1.title,
					'</a>',
				'</li>'
			].join(''));

			// Level 2
			if (level1.children.length) {
				var $level2_HTML = $([
					'<div class="TP022_level2-wrap">',
						'<div class="TP022_title">' + level1.title + '</div>',
						'<ul class="TP022_level2"></ul>',
					'</div>'
				].join(''));

				var $level2 = $level2_HTML.find('.TP022_level2');

				// CLICK EVENTS
				// Open level 2
				$html.find('a').on('click', function(e) {
					e.preventDefault();
					$(this).closest('li').find('.TP022_level2-wrap').addClass('TP022_show');
					$nav_HTML.addClass('TP022_no-scroll');
				});

				// Close level 2
				$level2_HTML.find('.TP022_title').on('click', function() {
					$(this).closest('li').find('.TP022_level2-wrap').animate({
						left: '100%',
						right: '-100%'
					}, 350, function() {
						$(this).removeClass('TP022_show').removeAttr('style');
					});
				
					$nav_HTML.removeClass('TP022_no-scroll');
				});


				// Loop through level 2 items
				$.each(level1.children, function() {
					var level2 = this;
					var $html = $([
						'<li>',
							'<div class="TP022_level2-heading">' + level2.title + '</div>',
						'</li>'
					].join(''));
					
					// Get section image
					var image = getCategoryImage(level2.title);
					if (image) {
						$('<div class="TP022_level2-img"><img src="' + image + '"/></div>').prependTo($html);
					}

					// CLICK EVENTS
					// Open level 3
					$html.on('click', function() {
						$(this).find('.TP022_level3-wrap').addClass('TP022_show');
						$level2_HTML.addClass('TP022_no-scroll');
					});


					// Level 3
					if (level2.children.length) {
						var $level3_HTML = $([
							'<div class="TP022_level3-wrap">',
								'<div class="TP022_level3-heading">' + level2.title + '</div>',
								'<ul class="TP022_level3"></ul>',
							'</div>'
						].join(''));

						// These is the actual level 3 links 
						var $level3 = $level3_HTML.find('.TP022_level3');

						// This is the list shown in level 2
						var $level3_preview = $('<ul class="TP022_level3-preview"></ul>');

						// Close level 3
						$level3_HTML.find('.TP022_level3-heading').on('click', function(e) {
							e.stopPropagation();

							$(this).closest('li').find('.TP022_level3-wrap').animate({
								left: '100%',
								right: '-100%'
							}, 350, function() {
								$(this).removeClass('TP022_show').removeAttr('style');
							});

							$level2_HTML.removeClass('TP022_no-scroll');
						});

						// Loop through level 3 items
						$.each(level2.children, function() {
							var level3 = this;
							$('<li>' + level3.title + '</li>').appendTo($level3_preview);
							
							var $html = $('<li><a href="' + level3.url + '">' + level3.title + '</a></li>');

							$html.appendTo($level3);
						});

						$level3_preview.appendTo($html);
						$level3_HTML.appendTo($html);
					} else {
						// Else this is a single link
						$html.addClass('TP022_level2-single-link');
					}

					$html.appendTo($level2);
				});

				$level2_HTML.appendTo($html);

			} else {
				$html.addClass('TP022_single-link');
			}

			$html.appendTo($level1_cat);
		});

		return $nav_HTML;
	};


	//--- A-Z Navigation ---
	var buildAtoZNav = function() {
		
		// Nav content JSON (613 objects)
		var data = [{"categoryName":"Access Equipment","url":"https://www.travisperkins.co.uk/c/1500533"},{"categoryName":"Access Panels","url":"https://www.travisperkins.co.uk/c/1500235"},{"categoryName":"Accessories","url":"https://www.travisperkins.co.uk/c/1532001"},{"categoryName":"Additives & Admixtures","url":"https://www.travisperkins.co.uk/c/1529001"},{"categoryName":"Adhesive Tapes","url":"https://www.travisperkins.co.uk/c/1500281"},{"categoryName":"Adhesives","url":"https://www.travisperkins.co.uk/c/1500273"},{"categoryName":"Aerated Blocks","url":"https://www.travisperkins.co.uk/c/1500036"},{"categoryName":"Air Source Heat Pumps","url":"https://www.travisperkins.co.uk/c/1518001"},{"categoryName":"Alarms","url":"https://www.travisperkins.co.uk/c/1500604"},{"categoryName":"Aluminium Guttering","url":"https://www.travisperkins.co.uk/c/1515001"},{"categoryName":"Angle Grinders","url":"https://www.travisperkins.co.uk/c/1500478"},{"categoryName":"Angles & Brackets","url":"https://www.travisperkins.co.uk/c/1500097"},{"categoryName":"Annular Ring Shank Nails","url":"https://www.travisperkins.co.uk/c/1500252"},{"categoryName":"Artificial Grass","url":"https://www.travisperkins.co.uk/c/1532000"},{"categoryName":"Artificial Slate Roof Tiles","url":"https://www.travisperkins.co.uk/c/1500077"},{"categoryName":"Asphalt Pothole Repair","url":"https://www.travisperkins.co.uk/c/1500047"},{"categoryName":"Auger Drill Bits","url":"https://www.travisperkins.co.uk/c/1545001"},{"categoryName":"Automotive","url":"https://www.travisperkins.co.uk/c/1500537"},{"categoryName":"Bagged Aggregates","url":"https://www.travisperkins.co.uk/c/1500050"},{"categoryName":"Balustrades & Handrails","url":"https://www.travisperkins.co.uk/c/1500110"},{"categoryName":"Basin Taps","url":"https://www.travisperkins.co.uk/c/1500427"},{"categoryName":"Basin Wastes & Traps","url":"https://www.travisperkins.co.uk/c/1500338"},{"categoryName":"Basins","url":"https://www.travisperkins.co.uk/c/1500407"},{"categoryName":"Basins & Pedestals","url":"https://www.travisperkins.co.uk/c/1500404"},{"categoryName":"Bath Panels","url":"https://www.travisperkins.co.uk/c/1500402"},{"categoryName":"Bath Screens","url":"https://www.travisperkins.co.uk/c/1500403"},{"categoryName":"Bath Taps","url":"https://www.travisperkins.co.uk/c/1500426"},{"categoryName":"Bath Tubs","url":"https://www.travisperkins.co.uk/c/1500395"},{"categoryName":"Bath Wastes & Traps","url":"https://www.travisperkins.co.uk/c/1500339"},{"categoryName":"Bathroom & Sanitary Sealants","url":"https://www.travisperkins.co.uk/c/1500267"},{"categoryName":"Bathroom Accessories","url":"https://www.travisperkins.co.uk/c/1504000"},{"categoryName":"Bathroom Furniture","url":"https://www.travisperkins.co.uk/c/1503002"},{"categoryName":"Bathroom Lighting","url":"https://www.travisperkins.co.uk/c/1507000"},{"categoryName":"Bathroom Suites","url":"https://www.travisperkins.co.uk/c/1500377"},{"categoryName":"Bathroom Taps","url":"https://www.travisperkins.co.uk/c/1500425"},{"categoryName":"Bathrooms","url":"https://www.travisperkins.co.uk/c/1500376"},{"categoryName":"Baths","url":"https://www.travisperkins.co.uk/c/1500393"},{"categoryName":"Batteries","url":"https://www.travisperkins.co.uk/c/1500607"},{"categoryName":"Batteries & Chargers","url":"https://www.travisperkins.co.uk/c/1500497"},{"categoryName":"Beading & Trims","url":"https://www.travisperkins.co.uk/c/1547001"},{"categoryName":"Beads & Mesh","url":"https://www.travisperkins.co.uk/c/1500226"},{"categoryName":"Below Ground Drainage","url":"https://www.travisperkins.co.uk/c/1500055"},{"categoryName":"Bibs, Braces and Coveralls","url":"https://www.travisperkins.co.uk/c/1500456"},{"categoryName":"Bidet Taps","url":"https://www.travisperkins.co.uk/c/1505002"},{"categoryName":"Bidets","url":"https://www.travisperkins.co.uk/c/1505001"},{"categoryName":"Biomass Boilers","url":"https://www.travisperkins.co.uk/c/1518003"},{"categoryName":"Biomass Fuels","url":"https://www.travisperkins.co.uk/c/1518004"},{"categoryName":"Biomass Heating","url":"https://www.travisperkins.co.uk/c/1517001"},{"categoryName":"Block Paving","url":"https://www.travisperkins.co.uk/c/1500118"},{"categoryName":"Blocks","url":"https://www.travisperkins.co.uk/c/1500034"},{"categoryName":"Boilers","url":"https://www.travisperkins.co.uk/c/1500284"},{"categoryName":"Bolts & Threaded Bar","url":"https://www.travisperkins.co.uk/c/1500249"},{"categoryName":"Breather Membrane","url":"https://www.travisperkins.co.uk/c/1511001"},{"categoryName":"Brick Bolsters & Chisels","url":"https://www.travisperkins.co.uk/c/1500513"},{"categoryName":"Bricks & Blocks","url":"https://www.travisperkins.co.uk/c/1500030"},{"categoryName":"Brickwork Ventilation","url":"https://www.travisperkins.co.uk/c/1500038"},{"categoryName":"Brushes & Brooms","url":"https://www.travisperkins.co.uk/c/1500567"},{"categoryName":"Buckets & Bins","url":"https://www.travisperkins.co.uk/c/1500526"},{"categoryName":"Builders Metalwork","url":"https://www.travisperkins.co.uk/c/1500090"},{"categoryName":"Building Chemicals","url":"https://www.travisperkins.co.uk/c/1529000"},{"categoryName":"Building Materials","url":"https://www.travisperkins.co.uk/c/1500029"},{"categoryName":"Building Restraint Straps","url":"https://www.travisperkins.co.uk/c/1500093"},{"categoryName":"Butt Hinges","url":"https://www.travisperkins.co.uk/c/1541015"},{"categoryName":"Cabin Hooks","url":"https://www.travisperkins.co.uk/c/1541019"},{"categoryName":"Cabinet Hardware & Furniture","url":"https://www.travisperkins.co.uk/c/1539001"},{"categoryName":"Cabinet Hinges","url":"https://www.travisperkins.co.uk/c/1541011"},{"categoryName":"Cable","url":"https://www.travisperkins.co.uk/c/1500572"},{"categoryName":"Cable Clips, Ties & Accessories","url":"https://www.travisperkins.co.uk/c/1500580"},{"categoryName":"Cable Conduit & Trunking","url":"https://www.travisperkins.co.uk/c/1500579"},{"categoryName":"Cable Management","url":"https://www.travisperkins.co.uk/c/1500578"},{"categoryName":"Cable Reels & Extension Leads","url":"https://www.travisperkins.co.uk/c/1500603"},{"categoryName":"Carbon Monoxide Detectors","url":"https://www.travisperkins.co.uk/c/1500605"},{"categoryName":"Carpet & Floor Protection","url":"https://www.travisperkins.co.uk/c/1500543"},{"categoryName":"Casement Stays & Fastners","url":"https://www.travisperkins.co.uk/c/1548004"},{"categoryName":"Catches, Latches & Locks","url":"https://www.travisperkins.co.uk/c/1539005"},{"categoryName":"Cavity and Internal Wall Insulation","url":"https://www.travisperkins.co.uk/c/1500214"},{"categoryName":"Cavity Closers","url":"https://www.travisperkins.co.uk/c/1500218"},{"categoryName":"Ceilings","url":"https://www.travisperkins.co.uk/c/1500230"},{"categoryName":"Cement Dyes & Additives","url":"https://www.travisperkins.co.uk/c/1503000"},{"categoryName":"Cement Mixers & Paddle Mixers","url":"https://www.travisperkins.co.uk/c/1500512"},{"categoryName":"Cements & Aggregates","url":"https://www.travisperkins.co.uk/c/1500039"},{"categoryName":"Cements & Limes","url":"https://www.travisperkins.co.uk/c/1500040"},{"categoryName":"Central Heating","url":"https://www.travisperkins.co.uk/c/1500283"},{"categoryName":"Chainlink & Wire Netting","url":"https://www.travisperkins.co.uk/c/1500095"},{"categoryName":"Chains & Accessories","url":"https://www.travisperkins.co.uk/c/1541016"},{"categoryName":"Chemical Fixings & Expanding Foam","url":"https://www.travisperkins.co.uk/c/1500264"},{"categoryName":"Chemical Water Treatment","url":"https://www.travisperkins.co.uk/c/1502003"},{"categoryName":"Chimney Pots & Cowls","url":"https://www.travisperkins.co.uk/c/1511009"},{"categoryName":"Chipboard","url":"https://www.travisperkins.co.uk/c/1502020"},{"categoryName":"Cistern Fittings","url":"https://www.travisperkins.co.uk/c/1500351"},{"categoryName":"Civils & Drainage","url":"https://www.travisperkins.co.uk/c/1500054"},{"categoryName":"Clamps","url":"https://www.travisperkins.co.uk/c/1535003"},{"categoryName":"Clay Drainage","url":"https://www.travisperkins.co.uk/c/1500057"},{"categoryName":"Clay Roof Tiles","url":"https://www.travisperkins.co.uk/c/1500076"},{"categoryName":"Cleaners & Wipes","url":"https://www.travisperkins.co.uk/c/1500545"},{"categoryName":"Cleaning & Preparation","url":"https://www.travisperkins.co.uk/c/1500539"},{"categoryName":"Cleaning Accessories","url":"https://www.travisperkins.co.uk/c/1500570"},{"categoryName":"Cleaning Chemicals","url":"https://www.travisperkins.co.uk/c/1529005"},{"categoryName":"Clout Nails","url":"https://www.travisperkins.co.uk/c/1500253"},{"categoryName":"CLS Studwork Timber","url":"https://www.travisperkins.co.uk/c/1500004"},{"categoryName":"Coach Screws","url":"https://www.travisperkins.co.uk/c/1502029"},{"categoryName":"Collated Screws","url":"https://www.travisperkins.co.uk/c/1500241"},{"categoryName":"Column Radiators","url":"https://www.travisperkins.co.uk/c/1509003"},{"categoryName":"Combination & Extension Ladders","url":"https://www.travisperkins.co.uk/c/1500535"},{"categoryName":"Common & Concrete Bricks","url":"https://www.travisperkins.co.uk/c/1502019"},{"categoryName":"Composite Decking","url":"https://www.travisperkins.co.uk/c/1500109"},{"categoryName":"Compression Fittings","url":"https://www.travisperkins.co.uk/c/1500329"},{"categoryName":"Concrete Blocks","url":"https://www.travisperkins.co.uk/c/1500035"},{"categoryName":"Concrete Fence Posts","url":"https://www.travisperkins.co.uk/c/1500103"},{"categoryName":"Concrete Lintels","url":"https://www.travisperkins.co.uk/c/1500069"},{"categoryName":"Concrete Roof Tiles","url":"https://www.travisperkins.co.uk/c/1500074"},{"categoryName":"Construction Equipment","url":"https://www.travisperkins.co.uk/c/1538000"},{"categoryName":"Consumer Units","url":"https://www.travisperkins.co.uk/c/1502018"},{"categoryName":"Controls & Accessories","url":"https://www.travisperkins.co.uk/c/1518007"},{"categoryName":"Coving","url":"https://www.travisperkins.co.uk/c/1500224"},{"categoryName":"Cylinder Locks","url":"https://www.travisperkins.co.uk/c/1550000"},{"categoryName":"Dakota","url":"https://www.travisperkins.co.uk/c/1509008"},{"categoryName":"Damp Proof Course & Membranes","url":"https://www.travisperkins.co.uk/c/1500037"},{"categoryName":"Decking","url":"https://www.travisperkins.co.uk/c/1500107"},{"categoryName":"Decking Screws","url":"https://www.travisperkins.co.uk/c/1500242"},{"categoryName":"Decorating & Interiors","url":"https://www.travisperkins.co.uk/c/1500538"},{"categoryName":"Decorating Knives","url":"https://www.travisperkins.co.uk/c/1500550"},{"categoryName":"Decorating Tools","url":"https://www.travisperkins.co.uk/c/1500546"},{"categoryName":"Decorative Concrete Paving","url":"https://www.travisperkins.co.uk/c/1500125"},{"categoryName":"Decorative Concrete Paving Packs","url":"https://www.travisperkins.co.uk/c/1502022"},{"categoryName":"Decorative Kerbs & Caps","url":"https://www.travisperkins.co.uk/c/1500120"},{"categoryName":"Decorative Mouldings & Beads","url":"https://www.travisperkins.co.uk/c/1500024"},{"categoryName":"Decorative Panels","url":"https://www.travisperkins.co.uk/c/1533000"},{"categoryName":"Decorative Stones & Gravel","url":"https://www.travisperkins.co.uk/c/1500053"},{"categoryName":"Decorators Caulk","url":"https://www.travisperkins.co.uk/c/1500270"},{"categoryName":"Designer Radiators","url":"https://www.travisperkins.co.uk/c/1509004"},{"categoryName":"Detergents & Cleaners","url":"https://www.travisperkins.co.uk/c/1500569"},{"categoryName":"Diamond Core Bits","url":"https://www.travisperkins.co.uk/c/1500490"},{"categoryName":"Digital Door Locks","url":"https://www.travisperkins.co.uk/c/1541005"},{"categoryName":"Digital Showers","url":"https://www.travisperkins.co.uk/c/1500414"},{"categoryName":"Digital Tools","url":"https://www.travisperkins.co.uk/c/1534002"},{"categoryName":"Door & Window Seals","url":"https://www.travisperkins.co.uk/c/1548000"},{"categoryName":"Door Accessories","url":"https://www.travisperkins.co.uk/c/1540000"},{"categoryName":"Door Accessory Packs","url":"https://www.travisperkins.co.uk/c/1540003"},{"categoryName":"Door Closers","url":"https://www.travisperkins.co.uk/c/1539008"},{"categoryName":"Door Closers & Panic Hardware","url":"https://www.travisperkins.co.uk/c/1539003"},{"categoryName":"Door Frames","url":"https://www.travisperkins.co.uk/c/1500178"},{"categoryName":"Door Frames, Linings & Casings","url":"https://www.travisperkins.co.uk/c/1500177"},{"categoryName":"Door Furniture & Ironmongery","url":"https://www.travisperkins.co.uk/c/1539004"},{"categoryName":"Door Handles","url":"https://www.travisperkins.co.uk/c/1540001"},{"categoryName":"Door Lining & Casings","url":"https://www.travisperkins.co.uk/c/1500179"},{"categoryName":"Door Locks","url":"https://www.travisperkins.co.uk/c/1541000"},{"categoryName":"Doors & Joinery","url":"https://www.travisperkins.co.uk/c/1500152"},{"categoryName":"Double Radiators","url":"https://www.travisperkins.co.uk/c/1509002"},{"categoryName":"Drill Bit Sets","url":"https://www.travisperkins.co.uk/c/1502023"},{"categoryName":"Drilling","url":"https://www.travisperkins.co.uk/c/1500482"},{"categoryName":"Drills","url":"https://www.travisperkins.co.uk/c/1500472"},{"categoryName":"Driveway Project Packs","url":"https://www.travisperkins.co.uk/c/1500117"},{"categoryName":"Driveways","url":"https://www.travisperkins.co.uk/c/1500116"},{"categoryName":"Dry Lining Boxes","url":"https://www.travisperkins.co.uk/c/1500591"},{"categoryName":"Dry Wall Screws","url":"https://www.travisperkins.co.uk/c/1500243"},{"categoryName":"Ducting","url":"https://www.travisperkins.co.uk/c/1500362"},{"categoryName":"Ducting & Ventilation","url":"https://www.travisperkins.co.uk/c/1500359"},{"categoryName":"Dust Extraction","url":"https://www.travisperkins.co.uk/c/1534000"},{"categoryName":"Dust Sheets","url":"https://www.travisperkins.co.uk/c/1500542"},{"categoryName":"Ear Protection","url":"https://www.travisperkins.co.uk/c/1500461"},{"categoryName":"Edgings, Copings & Caps","url":"https://www.travisperkins.co.uk/c/1500127"},{"categoryName":"Electric Boilers","url":"https://www.travisperkins.co.uk/c/1502008"},{"categoryName":"Electric Showers","url":"https://www.travisperkins.co.uk/c/1500413"},{"categoryName":"Electric Systems","url":"https://www.travisperkins.co.uk/c/1518006"},{"categoryName":"Electrical & Lighting","url":"https://www.travisperkins.co.uk/c/1500571"},{"categoryName":"Electrical Accessories","url":"https://www.travisperkins.co.uk/c/1500608"},{"categoryName":"Emulsion Paints","url":"https://www.travisperkins.co.uk/c/1500554"},{"categoryName":"End Feed Fittings","url":"https://www.travisperkins.co.uk/c/1500328"},{"categoryName":"Engineered Flooring","url":"https://www.travisperkins.co.uk/c/1500190"},{"categoryName":"Engineering Bricks","url":"https://www.travisperkins.co.uk/c/1500032"},{"categoryName":"Exterior & Masonry Paints","url":"https://www.travisperkins.co.uk/c/1500555"},{"categoryName":"External Cladding","url":"https://www.travisperkins.co.uk/c/1500088"},{"categoryName":"External Doors","url":"https://www.travisperkins.co.uk/c/1500160"},{"categoryName":"External Fire Doors","url":"https://www.travisperkins.co.uk/c/1500167"},{"categoryName":"External Hardwood Doors","url":"https://www.travisperkins.co.uk/c/1500162"},{"categoryName":"External Softwood Doors","url":"https://www.travisperkins.co.uk/c/1500161"},{"categoryName":"Extractor Fans & Kits","url":"https://www.travisperkins.co.uk/c/1500361"},{"categoryName":"Eye Protection","url":"https://www.travisperkins.co.uk/c/1500460"},{"categoryName":"Facing Bricks","url":"https://www.travisperkins.co.uk/c/1500031"},{"categoryName":"Fence Panels & Trellis","url":"https://www.travisperkins.co.uk/c/1500100"},{"categoryName":"Fence Post Caps & Tops","url":"https://www.travisperkins.co.uk/c/1500106"},{"categoryName":"Fence Posts","url":"https://www.travisperkins.co.uk/c/1500102"},{"categoryName":"Fencing","url":"https://www.travisperkins.co.uk/c/1500099"},{"categoryName":"Fencing & Decking Treatments","url":"https://www.travisperkins.co.uk/c/1500150"},{"categoryName":"Fibreglass Valleys","url":"https://www.travisperkins.co.uk/c/1511008"},{"categoryName":"Fillers","url":"https://www.travisperkins.co.uk/c/1500544"},{"categoryName":"Filling & Grab Adhesives","url":"https://www.travisperkins.co.uk/c/1500275"},{"categoryName":"Fire Door Hinges","url":"https://www.travisperkins.co.uk/c/1541012"},{"categoryName":"Fire Rated Sealants","url":"https://www.travisperkins.co.uk/c/1500269"},{"categoryName":"Fire Resistant Boards","url":"https://www.travisperkins.co.uk/c/1500012"},{"categoryName":"Firedoors","url":"https://www.travisperkins.co.uk/c/1500165"},{"categoryName":"Fires","url":"https://www.travisperkins.co.uk/c/1500314"},{"categoryName":"Fires & Heating Fuels","url":"https://www.travisperkins.co.uk/c/1500310"},{"categoryName":"First Aid Kits","url":"https://www.travisperkins.co.uk/c/1500466"},{"categoryName":"Fixing Tools","url":"https://www.travisperkins.co.uk/c/1535004"},{"categoryName":"Fixings & Adhesives","url":"https://www.travisperkins.co.uk/c/1500237"},{"categoryName":"Fixings & Fittings","url":"https://www.travisperkins.co.uk/c/1539006"},{"categoryName":"Flat Roof Repair & Maintenance","url":"https://www.travisperkins.co.uk/c/1511014"},{"categoryName":"Flat Roofing","url":"https://www.travisperkins.co.uk/c/1500085"},{"categoryName":"Flat Wood Bits","url":"https://www.travisperkins.co.uk/c/1500491"},{"categoryName":"Flexible Tap Connectors","url":"https://www.travisperkins.co.uk/c/1500334"},{"categoryName":"Floor Insulation","url":"https://www.travisperkins.co.uk/c/1500213"},{"categoryName":"Floor Paints","url":"https://www.travisperkins.co.uk/c/1500558"},{"categoryName":"Flooring Accessories","url":"https://www.travisperkins.co.uk/c/1500192"},{"categoryName":"Flooring Adhesives","url":"https://www.travisperkins.co.uk/c/1500194"},{"categoryName":"Flooring Compounds","url":"https://www.travisperkins.co.uk/c/1529002"},{"categoryName":"Flooring Underlay","url":"https://www.travisperkins.co.uk/c/1500193"},{"categoryName":"Flues & Accessories","url":"https://www.travisperkins.co.uk/c/1500287"},{"categoryName":"Footwear","url":"https://www.travisperkins.co.uk/c/1500452"},{"categoryName":"Garage Doors","url":"https://www.travisperkins.co.uk/c/1512000"},{"categoryName":"Garden & Patio Maintenance","url":"https://www.travisperkins.co.uk/c/1500148"},{"categoryName":"Garden Furniture","url":"https://www.travisperkins.co.uk/c/1555001"},{"categoryName":"Garden Sheds","url":"https://www.travisperkins.co.uk/c/1500134"},{"categoryName":"Garden Sheds & Greenhouses","url":"https://www.travisperkins.co.uk/c/1500130"},{"categoryName":"Garden Storage","url":"https://www.travisperkins.co.uk/c/1500135"},{"categoryName":"Gas Boilers","url":"https://www.travisperkins.co.uk/c/1500285"},{"categoryName":"Gas Hoses & Fittings","url":"https://www.travisperkins.co.uk/c/1500335"},{"categoryName":"Gate Latches & Springs","url":"https://www.travisperkins.co.uk/c/1541020"},{"categoryName":"Gates & Railings","url":"https://www.travisperkins.co.uk/c/1500111"},{"categoryName":"Gazebos & Canopies","url":"https://www.travisperkins.co.uk/c/1516000"},{"categoryName":"General Purpose Sealants","url":"https://www.travisperkins.co.uk/c/1500266"},{"categoryName":"Geotextiles & Landscaping Fabrics","url":"https://www.travisperkins.co.uk/c/1500059"},{"categoryName":"Glazing & Frame Sealants","url":"https://www.travisperkins.co.uk/c/1500268"},{"categoryName":"Glazing Bars & Accessories","url":"https://www.travisperkins.co.uk/c/1511019"},{"categoryName":"Glazing Sheets","url":"https://www.travisperkins.co.uk/c/1521001"},{"categoryName":"Gloss Paints","url":"https://www.travisperkins.co.uk/c/1500556"},{"categoryName":"Gloves","url":"https://www.travisperkins.co.uk/c/1500459"},{"categoryName":"Grass & Accessories","url":"https://www.travisperkins.co.uk/c/1530000"},{"categoryName":"Gravel Boards","url":"https://www.travisperkins.co.uk/c/1500101"},{"categoryName":"Green Roofs","url":"https://www.travisperkins.co.uk/c/1518008"},{"categoryName":"Greenhouses","url":"https://www.travisperkins.co.uk/c/1513000"},{"categoryName":"Grills & Vents","url":"https://www.travisperkins.co.uk/c/1500360"},{"categoryName":"Grinding & Cutting","url":"https://www.travisperkins.co.uk/c/1500495"},{"categoryName":"Guttering","url":"https://www.travisperkins.co.uk/c/1500083"},{"categoryName":"Guttering Accessories","url":"https://www.travisperkins.co.uk/c/1511023"},{"categoryName":"Hammers & Mallets","url":"https://www.travisperkins.co.uk/c/1500504"},{"categoryName":"Hand Saws, Saw Blades & Mitres","url":"https://www.travisperkins.co.uk/c/1500502"},{"categoryName":"Hand Tools","url":"https://www.travisperkins.co.uk/c/1500499"},{"categoryName":"Handles & Knobs","url":"https://www.travisperkins.co.uk/c/1539007"},{"categoryName":"Harnesses","url":"https://www.travisperkins.co.uk/c/1510000"},{"categoryName":"Hasp & Staples","url":"https://www.travisperkins.co.uk/c/1541021"},{"categoryName":"Hats & Helmets","url":"https://www.travisperkins.co.uk/c/1500463"},{"categoryName":"Heat Pump Accessories","url":"https://www.travisperkins.co.uk/c/1517005"},{"categoryName":"Heat Pumps","url":"https://www.travisperkins.co.uk/c/1505005"},{"categoryName":"Heated Towel Rails & Elements","url":"https://www.travisperkins.co.uk/c/1500300"},{"categoryName":"Heaters","url":"https://www.travisperkins.co.uk/c/1502006"},{"categoryName":"Heating Controls","url":"https://www.travisperkins.co.uk/c/1500288"},{"categoryName":"Heating Programmers & Timers","url":"https://www.travisperkins.co.uk/c/1500290"},{"categoryName":"Heating Pumps","url":"https://www.travisperkins.co.uk/c/1500292"},{"categoryName":"Heating Valves","url":"https://www.travisperkins.co.uk/c/1500293"},{"categoryName":"High Strength Adhesives","url":"https://www.travisperkins.co.uk/c/1500276"},{"categoryName":"High Visibility Clothing","url":"https://www.travisperkins.co.uk/c/1500464"},{"categoryName":"Hinges","url":"https://www.travisperkins.co.uk/c/1541002"},{"categoryName":"Hole Saws & Arbours","url":"https://www.travisperkins.co.uk/c/1500489"},{"categoryName":"Home Fuels","url":"https://www.travisperkins.co.uk/c/1555002"},{"categoryName":"Hooks","url":"https://www.travisperkins.co.uk/c/1540002"},{"categoryName":"Hop Up and Step Ladders","url":"https://www.travisperkins.co.uk/c/1500534"},{"categoryName":"Hose pipes & Accessories","url":"https://www.travisperkins.co.uk/c/1500139"},{"categoryName":"HSS Drill Bits","url":"https://www.travisperkins.co.uk/c/1500485"},{"categoryName":"Impact Drivers & Wrenches","url":"https://www.travisperkins.co.uk/c/1534001"},{"categoryName":"Insulation","url":"https://www.travisperkins.co.uk/c/1500212"},{"categoryName":"Insulation & Plasterboard","url":"https://www.travisperkins.co.uk/c/1500211"},{"categoryName":"Insulation Tapes & Fixings","url":"https://www.travisperkins.co.uk/c/1500219"},{"categoryName":"Interior Lighting","url":"https://www.travisperkins.co.uk/c/1500593"},{"categoryName":"Internal Bi-Fold Doors","url":"https://www.travisperkins.co.uk/c/1505000"},{"categoryName":"Internal Doors","url":"https://www.travisperkins.co.uk/c/1500153"},{"categoryName":"Internal Fire Doors","url":"https://www.travisperkins.co.uk/c/1500166"},{"categoryName":"Internal Flush Doors","url":"https://www.travisperkins.co.uk/c/1500157"},{"categoryName":"Internal Hardwood Doors","url":"https://www.travisperkins.co.uk/c/1500156"},{"categoryName":"Internal Moulded Doors","url":"https://www.travisperkins.co.uk/c/1500154"},{"categoryName":"Internal Shower Spares","url":"https://www.travisperkins.co.uk/c/1545007"},{"categoryName":"Internal Softwood Doors","url":"https://www.travisperkins.co.uk/c/1500155"},{"categoryName":"Intumescent Sealants","url":"https://www.travisperkins.co.uk/c/1541009"},{"categoryName":"Intumescent Seals","url":"https://www.travisperkins.co.uk/c/1541010"},{"categoryName":"Ironmongery & Security","url":"https://www.travisperkins.co.uk/c/1500168"},{"categoryName":"Jackets","url":"https://www.travisperkins.co.uk/c/1500453"},{"categoryName":"Janitorial","url":"https://www.travisperkins.co.uk/c/1500566"},{"categoryName":"Jointing Compounds","url":"https://www.travisperkins.co.uk/c/1529003"},{"categoryName":"Jointing Compounds & Adhesives","url":"https://www.travisperkins.co.uk/c/1500129"},{"categoryName":"Joist Hangers","url":"https://www.travisperkins.co.uk/c/1500092"},{"categoryName":"Junction & Pattress Boxes","url":"https://www.travisperkins.co.uk/c/1500587"},{"categoryName":"Junction Boxes","url":"https://www.travisperkins.co.uk/c/1500588"},{"categoryName":"Key Safes","url":"https://www.travisperkins.co.uk/c/1541017"},{"categoryName":"Keylite Roof Windows & Flashings","url":"https://www.travisperkins.co.uk/c/1554000"},{"categoryName":"Kitchen Appliances","url":"https://www.travisperkins.co.uk/c/1509007"},{"categoryName":"Kitchen Ranges","url":"https://www.travisperkins.co.uk/c/1509006"},{"categoryName":"Kitchen Sink Wastes & Traps","url":"https://www.travisperkins.co.uk/c/1500342"},{"categoryName":"Kitchen Sinks","url":"https://www.travisperkins.co.uk/c/1500349"},{"categoryName":"Kitchen Sinks & Taps","url":"https://www.travisperkins.co.uk/c/1500348"},{"categoryName":"Kitchen Taps","url":"https://www.travisperkins.co.uk/c/1500350"},{"categoryName":"Kitchens","url":"https://www.travisperkins.co.uk/c/1509005"},{"categoryName":"Kits & Twin Packs","url":"https://www.travisperkins.co.uk/c/1500474"},{"categoryName":"Knee Protection","url":"https://www.travisperkins.co.uk/c/1500465"},{"categoryName":"Knives & Blades","url":"https://www.travisperkins.co.uk/c/1500503"},{"categoryName":"Laminate & Real Wood Flooring","url":"https://www.travisperkins.co.uk/c/1500188"},{"categoryName":"Laminate Flooring","url":"https://www.travisperkins.co.uk/c/1500191"},{"categoryName":"Landscaping","url":"https://www.travisperkins.co.uk/c/1500098"},{"categoryName":"Landscaping & Demolition","url":"https://www.travisperkins.co.uk/c/1500518"},{"categoryName":"Landscaping Fabrics","url":"https://www.travisperkins.co.uk/c/1546000"},{"categoryName":"Lead & Accessories","url":"https://www.travisperkins.co.uk/c/1511003"},{"categoryName":"Light Bulbs & Accessories","url":"https://www.travisperkins.co.uk/c/1500597"},{"categoryName":"Lighting","url":"https://www.travisperkins.co.uk/c/1500592"},{"categoryName":"Lintels","url":"https://www.travisperkins.co.uk/c/1500068"},{"categoryName":"Loft & Roof Insulation","url":"https://www.travisperkins.co.uk/c/1500215"},{"categoryName":"Log Cabins","url":"https://www.travisperkins.co.uk/c/1513005"},{"categoryName":"Log Cabins & Summerhouses","url":"https://www.travisperkins.co.uk/c/1513003"},{"categoryName":"Loose Feather Edge Fencing","url":"https://www.travisperkins.co.uk/c/1500065"},{"categoryName":"Lost Head Nails","url":"https://www.travisperkins.co.uk/c/1500255"},{"categoryName":"Macerators","url":"https://www.travisperkins.co.uk/c/1500390"},{"categoryName":"Magnetic Filters","url":"https://www.travisperkins.co.uk/c/1502004"},{"categoryName":"Manhole Covers & Frames","url":"https://www.travisperkins.co.uk/c/1500061"},{"categoryName":"Masking Tapes","url":"https://www.travisperkins.co.uk/c/1500540"},{"categoryName":"Masonry Screws","url":"https://www.travisperkins.co.uk/c/1521000"},{"categoryName":"MDF","url":"https://www.travisperkins.co.uk/c/1500009"},{"categoryName":"MDF Architrave","url":"https://www.travisperkins.co.uk/c/1500021"},{"categoryName":"MDF Skirting Board","url":"https://www.travisperkins.co.uk/c/1500019"},{"categoryName":"MDF Windowboards","url":"https://www.travisperkins.co.uk/c/1533001"},{"categoryName":"MDPE Fittings","url":"https://www.travisperkins.co.uk/c/1500333"},{"categoryName":"MDPE Pipe","url":"https://www.travisperkins.co.uk/c/1500325"},{"categoryName":"Measuring & Marking","url":"https://www.travisperkins.co.uk/c/1500501"},{"categoryName":"Melamine Board","url":"https://www.travisperkins.co.uk/c/1515000"},{"categoryName":"Met Posts","url":"https://www.travisperkins.co.uk/c/1500105"},{"categoryName":"Metal Gates & Railings","url":"https://www.travisperkins.co.uk/c/1552000"},{"categoryName":"Metal Stud Partitioning","url":"https://www.travisperkins.co.uk/c/1500225"},{"categoryName":"Meter Boxes","url":"https://www.travisperkins.co.uk/c/1500063"},{"categoryName":"Mixer Showers","url":"https://www.travisperkins.co.uk/c/1500415"},{"categoryName":"Mobility Grab Rails","url":"https://www.travisperkins.co.uk/c/1500448"},{"categoryName":"Mops & Buckets","url":"https://www.travisperkins.co.uk/c/1500568"},{"categoryName":"Mortice Locks","url":"https://www.travisperkins.co.uk/c/1541006"},{"categoryName":"Multi Material Drill Bits","url":"https://www.travisperkins.co.uk/c/1545002"},{"categoryName":"Multi Tools","url":"https://www.travisperkins.co.uk/c/1534003"},{"categoryName":"Multi Tools Accessories","url":"https://www.travisperkins.co.uk/c/1535002"},{"categoryName":"Nail Gun Accessories","url":"https://www.travisperkins.co.uk/c/1535007"},{"categoryName":"Nail Guns","url":"https://www.travisperkins.co.uk/c/1500609"},{"categoryName":"Nails","url":"https://www.travisperkins.co.uk/c/1500251"},{"categoryName":"Natural Insulation","url":"https://www.travisperkins.co.uk/c/1501003"},{"categoryName":"Natural Slate Roof Tiles","url":"https://www.travisperkins.co.uk/c/1500075"},{"categoryName":"Natural Stone Paving","url":"https://www.travisperkins.co.uk/c/1500124"},{"categoryName":"Natural Stone Paving Patio Packs","url":"https://www.travisperkins.co.uk/c/1502021"},{"categoryName":"Night Latches","url":"https://www.travisperkins.co.uk/c/1541007"},{"categoryName":"Nuts","url":"https://www.travisperkins.co.uk/c/1500248"},{"categoryName":"Nuts, Bolts & Washers","url":"https://www.travisperkins.co.uk/c/1500247"},{"categoryName":"Oakmont","url":"https://www.travisperkins.co.uk/c/1509009"},{"categoryName":"Ohio","url":"https://www.travisperkins.co.uk/c/1509010"},{"categoryName":"Oil Fired Boilers","url":"https://www.travisperkins.co.uk/c/1502007"},{"categoryName":"Oil Tanks & Fittings","url":"https://www.travisperkins.co.uk/c/1500354"},{"categoryName":"Orlando","url":"https://www.travisperkins.co.uk/c/1509011"},{"categoryName":"OSB","url":"https://www.travisperkins.co.uk/c/1500010"},{"categoryName":"Oval Nails","url":"https://www.travisperkins.co.uk/c/1500257"},{"categoryName":"Packers & Wedges","url":"https://www.travisperkins.co.uk/c/1500263"},{"categoryName":"Pad & Tower Bolts","url":"https://www.travisperkins.co.uk/c/1541022"},{"categoryName":"Padlocks","url":"https://www.travisperkins.co.uk/c/1541018"},{"categoryName":"Padlocks, Chains & Accessories","url":"https://www.travisperkins.co.uk/c/1541003"},{"categoryName":"Padstones","url":"https://www.travisperkins.co.uk/c/1500071"},{"categoryName":"Paint","url":"https://www.travisperkins.co.uk/c/1500552"},{"categoryName":"Paint Brushes","url":"https://www.travisperkins.co.uk/c/1500547"},{"categoryName":"Paint Rollers","url":"https://www.travisperkins.co.uk/c/1500548"},{"categoryName":"Pan Connectors","url":"https://www.travisperkins.co.uk/c/1500347"},{"categoryName":"Panel Pin Nails","url":"https://www.travisperkins.co.uk/c/1500258"},{"categoryName":"Panic Hardware","url":"https://www.travisperkins.co.uk/c/1539009"},{"categoryName":"Patio Project Packs","url":"https://www.travisperkins.co.uk/c/1500122"},{"categoryName":"Patios & Walling","url":"https://www.travisperkins.co.uk/c/1500121"},{"categoryName":"Patress Boxes","url":"https://www.travisperkins.co.uk/c/1500590"},{"categoryName":"Paving","url":"https://www.travisperkins.co.uk/c/1500123"},{"categoryName":"Paving, Drive & Wall Treatments","url":"https://www.travisperkins.co.uk/c/1500151"},{"categoryName":"Pedestals","url":"https://www.travisperkins.co.uk/c/1500410"},{"categoryName":"Percussion Drill Bits","url":"https://www.travisperkins.co.uk/c/1500483"},{"categoryName":"Permeable Block Paving","url":"https://www.travisperkins.co.uk/c/1500119"},{"categoryName":"Personal Protective Equipment","url":"https://www.travisperkins.co.uk/c/1500458"},{"categoryName":"Pick Axes & Mattocks","url":"https://www.travisperkins.co.uk/c/1500522"},{"categoryName":"Pipe & Tube","url":"https://www.travisperkins.co.uk/c/1500322"},{"categoryName":"Pipe Insulation","url":"https://www.travisperkins.co.uk/c/1500217"},{"categoryName":"Pitched Roof Accessories","url":"https://www.travisperkins.co.uk/c/1511002"},{"categoryName":"Pitched Roofing","url":"https://www.travisperkins.co.uk/c/1511000"},{"categoryName":"Planed Hardwood Timber","url":"https://www.travisperkins.co.uk/c/1528000"},{"categoryName":"Planed Softwood Timber","url":"https://www.travisperkins.co.uk/c/1500015"},{"categoryName":"Planed Timber","url":"https://www.travisperkins.co.uk/c/1500014"},{"categoryName":"Planers","url":"https://www.travisperkins.co.uk/c/1535000"},{"categoryName":"Plaster","url":"https://www.travisperkins.co.uk/c/1500223"},{"categoryName":"Plaster & Plasterboards","url":"https://www.travisperkins.co.uk/c/1500220"},{"categoryName":"Plasterboard Screws & Fixings","url":"https://www.travisperkins.co.uk/c/1500227"},{"categoryName":"Plastering Fillers","url":"https://www.travisperkins.co.uk/c/1500229"},{"categoryName":"Plastering Tapes & Adhesives","url":"https://www.travisperkins.co.uk/c/1500228"},{"categoryName":"Plastic Drainage","url":"https://www.travisperkins.co.uk/c/1500056"},{"categoryName":"Plastic Pushfit Pipe","url":"https://www.travisperkins.co.uk/c/1500324"},{"categoryName":"Plate Compactors","url":"https://www.travisperkins.co.uk/c/1539000"},{"categoryName":"Pliers","url":"https://www.travisperkins.co.uk/c/1500506"},{"categoryName":"Plumbing & Heating","url":"https://www.travisperkins.co.uk/c/1500282"},{"categoryName":"Plumbing Accessories","url":"https://www.travisperkins.co.uk/c/1500363"},{"categoryName":"Plumbing Consumables","url":"https://www.travisperkins.co.uk/c/1500365"},{"categoryName":"Plumbing Fittings","url":"https://www.travisperkins.co.uk/c/1500327"},{"categoryName":"Plumbing Hand Tools","url":"https://www.travisperkins.co.uk/c/1500367"},{"categoryName":"Plumbing Power Tools","url":"https://www.travisperkins.co.uk/c/1500369"},{"categoryName":"Plumbing Tools","url":"https://www.travisperkins.co.uk/c/1500366"},{"categoryName":"Plumbing Wastes & Traps","url":"https://www.travisperkins.co.uk/c/1500337"},{"categoryName":"Plywood","url":"https://www.travisperkins.co.uk/c/1500008"},{"categoryName":"Podiums & Working Platforms","url":"https://www.travisperkins.co.uk/c/1500536"},{"categoryName":"Polycarbonate & Glazing Sheets","url":"https://www.travisperkins.co.uk/c/1500082"},{"categoryName":"Polycarbonate Sheets.","url":"https://www.travisperkins.co.uk/c/1511018"},{"categoryName":"Post Hole Diggers & Post Drivers","url":"https://www.travisperkins.co.uk/c/1500523"},{"categoryName":"Power Saws","url":"https://www.travisperkins.co.uk/c/1500475"},{"categoryName":"Power Showers","url":"https://www.travisperkins.co.uk/c/1545004"},{"categoryName":"Power Tool Accessories","url":"https://www.travisperkins.co.uk/c/1500481"},{"categoryName":"Power Tools","url":"https://www.travisperkins.co.uk/c/1500471"},{"categoryName":"Pressure Washers","url":"https://www.travisperkins.co.uk/c/1545000"},{"categoryName":"Product","url":"https://www.travisperkins.co.uk/c/1000000"},{"categoryName":"Pushfit Fittings","url":"https://www.travisperkins.co.uk/c/1500331"},{"categoryName":"Putty","url":"https://www.travisperkins.co.uk/c/1500271"},{"categoryName":"PVA","url":"https://www.travisperkins.co.uk/c/1500274"},{"categoryName":"PVC Guttering","url":"https://www.travisperkins.co.uk/c/1511022"},{"categoryName":"Radiator Valves","url":"https://www.travisperkins.co.uk/c/1500299"},{"categoryName":"Radiators","url":"https://www.travisperkins.co.uk/c/1502024"},{"categoryName":"Radios","url":"https://www.travisperkins.co.uk/c/1502016"},{"categoryName":"Rain Suits","url":"https://www.travisperkins.co.uk/c/1502015"},{"categoryName":"Rainwater Harvesting Solutions","url":"https://www.travisperkins.co.uk/c/1518002"},{"categoryName":"Ready Mixed Concrete & Mortar","url":"https://www.travisperkins.co.uk/c/1500046"},{"categoryName":"Render","url":"https://www.travisperkins.co.uk/c/1500041"},{"categoryName":"Renewable Energy Solutions","url":"https://www.travisperkins.co.uk/c/1505003"},{"categoryName":"Respirators & Dust Masks","url":"https://www.travisperkins.co.uk/c/1500462"},{"categoryName":"Rim Locks","url":"https://www.travisperkins.co.uk/c/1541008"},{"categoryName":"Roller Trays & Kits","url":"https://www.travisperkins.co.uk/c/1500549"},{"categoryName":"Roof Fixings","url":"https://www.travisperkins.co.uk/c/1511010"},{"categoryName":"Roof Sheets","url":"https://www.travisperkins.co.uk/c/1511016"},{"categoryName":"Roof Tile Vents","url":"https://www.travisperkins.co.uk/c/1511007"},{"categoryName":"Roof Tiles & Slates","url":"https://www.travisperkins.co.uk/c/1500073"},{"categoryName":"Roofing","url":"https://www.travisperkins.co.uk/c/1500072"},{"categoryName":"Roofing Battern","url":"https://www.travisperkins.co.uk/c/1525000"},{"categoryName":"Roundwire Nails","url":"https://www.travisperkins.co.uk/c/1500259"},{"categoryName":"Routing","url":"https://www.travisperkins.co.uk/c/1534004"},{"categoryName":"Sanders","url":"https://www.travisperkins.co.uk/c/1500476"},{"categoryName":"Sanding & Abrasives","url":"https://www.travisperkins.co.uk/c/1500541"},{"categoryName":"Sash Window Hardware","url":"https://www.travisperkins.co.uk/c/1548005"},{"categoryName":"Sawn Timber","url":"https://www.travisperkins.co.uk/c/1500001"},{"categoryName":"Scaffold Boards","url":"https://www.travisperkins.co.uk/c/1500006"},{"categoryName":"Scale Inhibitors","url":"https://www.travisperkins.co.uk/c/1500356"},{"categoryName":"Screeding & Floor Levelling Compound","url":"https://www.travisperkins.co.uk/c/1503001"},{"categoryName":"Screw Caps & Washers","url":"https://www.travisperkins.co.uk/c/1500245"},{"categoryName":"Screwdriver Bits","url":"https://www.travisperkins.co.uk/c/1535001"},{"categoryName":"Screwdrivers & Hex Keys","url":"https://www.travisperkins.co.uk/c/1500505"},{"categoryName":"Screws","url":"https://www.travisperkins.co.uk/c/1500238"},{"categoryName":"SDS Drill Bits","url":"https://www.travisperkins.co.uk/c/1500484"},{"categoryName":"Sealant Guns","url":"https://www.travisperkins.co.uk/c/1500272"},{"categoryName":"Sealants","url":"https://www.travisperkins.co.uk/c/1500265"},{"categoryName":"Self Adhesive Felt","url":"https://www.travisperkins.co.uk/c/1511012"},{"categoryName":"Self Tapping Screws","url":"https://www.travisperkins.co.uk/c/1500244"},{"categoryName":"Shed & Gate Ironmongery","url":"https://www.travisperkins.co.uk/c/1541004"},{"categoryName":"Sheet Material","url":"https://www.travisperkins.co.uk/c/1500007"},{"categoryName":"Shelving","url":"https://www.travisperkins.co.uk/c/1548002"},{"categoryName":"Shingles","url":"https://www.travisperkins.co.uk/c/1511004"},{"categoryName":"Shovels, Spades & Rakes","url":"https://www.travisperkins.co.uk/c/1500519"},{"categoryName":"Shower Accessories","url":"https://www.travisperkins.co.uk/c/1500416"},{"categoryName":"Shower Curtains & Rails","url":"https://www.travisperkins.co.uk/c/1545008"},{"categoryName":"Shower Enclosures & Screens","url":"https://www.travisperkins.co.uk/c/1500419"},{"categoryName":"Shower Heads & Hoses","url":"https://www.travisperkins.co.uk/c/1545006"},{"categoryName":"Shower Kits & Riser Rails","url":"https://www.travisperkins.co.uk/c/1545005"},{"categoryName":"Shower Panels & Accessories","url":"https://www.travisperkins.co.uk/c/1545009"},{"categoryName":"Shower Pumps","url":"https://www.travisperkins.co.uk/c/1500417"},{"categoryName":"Shower Trays","url":"https://www.travisperkins.co.uk/c/1500420"},{"categoryName":"Shower Trays & Enclosures","url":"https://www.travisperkins.co.uk/c/1500418"},{"categoryName":"Shower Valves","url":"https://www.travisperkins.co.uk/c/1545003"},{"categoryName":"Shower Wastes & Traps","url":"https://www.travisperkins.co.uk/c/1500340"},{"categoryName":"Showers","url":"https://www.travisperkins.co.uk/c/1500412"},{"categoryName":"Single Ply Membrane","url":"https://www.travisperkins.co.uk/c/1522000"},{"categoryName":"Single Radiators","url":"https://www.travisperkins.co.uk/c/1509001"},{"categoryName":"Site Barrier Fencing","url":"https://www.travisperkins.co.uk/c/1500469"},{"categoryName":"Site Barrier Warning Tapes","url":"https://www.travisperkins.co.uk/c/1500470"},{"categoryName":"Site Equipment","url":"https://www.travisperkins.co.uk/c/1500467"},{"categoryName":"Site Pegs","url":"https://www.travisperkins.co.uk/c/1525001"},{"categoryName":"Site Power & Lighting","url":"https://www.travisperkins.co.uk/c/1500598"},{"categoryName":"Skirting Board & Architrave","url":"https://www.travisperkins.co.uk/c/1500017"},{"categoryName":"Slabs & Kerbs","url":"https://www.travisperkins.co.uk/c/1500066"},{"categoryName":"Sledge & Club Hammers","url":"https://www.travisperkins.co.uk/c/1500520"},{"categoryName":"Smart Heating Controls","url":"https://www.travisperkins.co.uk/c/1555000"},{"categoryName":"Smoke & Fire Alarms","url":"https://www.travisperkins.co.uk/c/1500606"},{"categoryName":"Sockets & Spanners","url":"https://www.travisperkins.co.uk/c/1535005"},{"categoryName":"Soil Compost & Bark","url":"https://www.travisperkins.co.uk/c/1500140"},{"categoryName":"Soil Pipe","url":"https://www.travisperkins.co.uk/c/1500345"},{"categoryName":"Soil Pipe Fittings","url":"https://www.travisperkins.co.uk/c/1500346"},{"categoryName":"Solar Accessories","url":"https://www.travisperkins.co.uk/c/1517003"},{"categoryName":"Solar Solutions","url":"https://www.travisperkins.co.uk/c/1505004"},{"categoryName":"Solar Thermal","url":"https://www.travisperkins.co.uk/c/1518000"},{"categoryName":"Solder Ring Fittings","url":"https://www.travisperkins.co.uk/c/1500330"},{"categoryName":"Soldering Tools","url":"https://www.travisperkins.co.uk/c/1500368"},{"categoryName":"Solders & Fluxes","url":"https://www.travisperkins.co.uk/c/1500364"},{"categoryName":"Solid Wood Flooring","url":"https://www.travisperkins.co.uk/c/1500189"},{"categoryName":"Special Shaped Bricks","url":"https://www.travisperkins.co.uk/c/1500033"},{"categoryName":"Specialist Paints","url":"https://www.travisperkins.co.uk/c/1502017"},{"categoryName":"Specialist Panels","url":"https://www.travisperkins.co.uk/c/1500013"},{"categoryName":"Specialist Plasterboard","url":"https://www.travisperkins.co.uk/c/1500222"},{"categoryName":"Spirit Levels","url":"https://www.travisperkins.co.uk/c/1500500"},{"categoryName":"Square Twist Nails","url":"https://www.travisperkins.co.uk/c/1500260"},{"categoryName":"Stair Accessories","url":"https://www.travisperkins.co.uk/c/1500207"},{"categoryName":"Stair Flights","url":"https://www.travisperkins.co.uk/c/1500202"},{"categoryName":"Stair Parts","url":"https://www.travisperkins.co.uk/c/1500203"},{"categoryName":"Stairs","url":"https://www.travisperkins.co.uk/c/1500201"},{"categoryName":"Standard Plasterboard","url":"https://www.travisperkins.co.uk/c/1500221"},{"categoryName":"Staples","url":"https://www.travisperkins.co.uk/c/1500261"},{"categoryName":"Steel Lintels","url":"https://www.travisperkins.co.uk/c/1500070"},{"categoryName":"Steel Reinforcement","url":"https://www.travisperkins.co.uk/c/1500060"},{"categoryName":"Strap & Piano Hinges","url":"https://www.travisperkins.co.uk/c/1541013"},{"categoryName":"Summerhouses","url":"https://www.travisperkins.co.uk/c/1513006"},{"categoryName":"Surface Drainage","url":"https://www.travisperkins.co.uk/c/1500058"},{"categoryName":"Suspended Ceiling Frames & Fixings","url":"https://www.travisperkins.co.uk/c/1500231"},{"categoryName":"Switches & Sockets","url":"https://www.travisperkins.co.uk/c/1500581"},{"categoryName":"T-Shirts & Sweatshirts","url":"https://www.travisperkins.co.uk/c/1500454"},{"categoryName":"Tarpaulins & Rubble Sacks","url":"https://www.travisperkins.co.uk/c/1501000"},{"categoryName":"Tee Hinges","url":"https://www.travisperkins.co.uk/c/1541014"},{"categoryName":"Thermal Insulated Plasterboard","url":"https://www.travisperkins.co.uk/c/1500005"},{"categoryName":"Thermostats","url":"https://www.travisperkins.co.uk/c/1500291"},{"categoryName":"Tile & Glass Bits","url":"https://www.travisperkins.co.uk/c/1500488"},{"categoryName":"Tile Adhesives & Grouts","url":"https://www.travisperkins.co.uk/c/1500280"},{"categoryName":"Tile Backing Boards","url":"https://www.travisperkins.co.uk/c/1500424"},{"categoryName":"Tiling","url":"https://www.travisperkins.co.uk/c/1500560"},{"categoryName":"Tiling Tools & Accessories","url":"https://www.travisperkins.co.uk/c/1500563"},{"categoryName":"Timber","url":"https://www.travisperkins.co.uk/c/1500000"},{"categoryName":"Timber Architrave","url":"https://www.travisperkins.co.uk/c/1500020"},{"categoryName":"Timber Cladding","url":"https://www.travisperkins.co.uk/c/1501001"},{"categoryName":"Timber Decking","url":"https://www.travisperkins.co.uk/c/1500108"},{"categoryName":"Timber Drive Screws","url":"https://www.travisperkins.co.uk/c/1500240"},{"categoryName":"Timber Fence Posts","url":"https://www.travisperkins.co.uk/c/1500104"},{"categoryName":"Timber Gates","url":"https://www.travisperkins.co.uk/c/1500112"},{"categoryName":"Timber Mouldings & Window Boards","url":"https://www.travisperkins.co.uk/c/1500022"},{"categoryName":"Timber Skirting Board","url":"https://www.travisperkins.co.uk/c/1500018"},{"categoryName":"Timber Sleepers","url":"https://www.travisperkins.co.uk/c/1500128"},{"categoryName":"Timber Windowboards","url":"https://www.travisperkins.co.uk/c/1533002"},{"categoryName":"Timber Windows","url":"https://www.travisperkins.co.uk/c/1546002"},{"categoryName":"Toilet Cisterns","url":"https://www.travisperkins.co.uk/c/1500387"},{"categoryName":"Toilet Fixtures & Fittings","url":"https://www.travisperkins.co.uk/c/1500392"},{"categoryName":"Toilet Pans","url":"https://www.travisperkins.co.uk/c/1500388"},{"categoryName":"Toilet Seats","url":"https://www.travisperkins.co.uk/c/1500389"},{"categoryName":"Toilets","url":"https://www.travisperkins.co.uk/c/1500381"},{"categoryName":"Tongue & Grooved Flooring Chip Board","url":"https://www.travisperkins.co.uk/c/1500028"},{"categoryName":"Tool Bags & Tool Belts","url":"https://www.travisperkins.co.uk/c/1500529"},{"categoryName":"Tool Boxes","url":"https://www.travisperkins.co.uk/c/1500528"},{"categoryName":"Tool Organisers","url":"https://www.travisperkins.co.uk/c/1500530"},{"categoryName":"Tools & Workwear","url":"https://www.travisperkins.co.uk/c/1500450"},{"categoryName":"Tools Storage & Workbenches","url":"https://www.travisperkins.co.uk/c/1500527"},{"categoryName":"Torch On Felt","url":"https://www.travisperkins.co.uk/c/1511011"},{"categoryName":"Torches","url":"https://www.travisperkins.co.uk/c/1500599"},{"categoryName":"Traditional Felt","url":"https://www.travisperkins.co.uk/c/1511013"},{"categoryName":"Treated Timber","url":"https://www.travisperkins.co.uk/c/1500002"},{"categoryName":"Trousers & Shorts","url":"https://www.travisperkins.co.uk/c/1500455"},{"categoryName":"Trowels, Hawks & Floats","url":"https://www.travisperkins.co.uk/c/1500510"},{"categoryName":"Turf","url":"https://www.travisperkins.co.uk/c/1537000"},{"categoryName":"Twin Slot Shelving","url":"https://www.travisperkins.co.uk/c/1549000"},{"categoryName":"Undercoat & Primers","url":"https://www.travisperkins.co.uk/c/1500553"},{"categoryName":"Underfloor Heating","url":"https://www.travisperkins.co.uk/c/1500301"},{"categoryName":"Underfloor Heating","url":"https://www.travisperkins.co.uk/c/1517002"},{"categoryName":"Underground Ducting","url":"https://www.travisperkins.co.uk/c/1500064"},{"categoryName":"Untreated Timber","url":"https://www.travisperkins.co.uk/c/1500003"},{"categoryName":"Unvented Cylinders","url":"https://www.travisperkins.co.uk/c/1500307"},{"categoryName":"UPVC Doors","url":"https://www.travisperkins.co.uk/c/1547000"},{"categoryName":"UPVC Fascia & Soffit","url":"https://www.travisperkins.co.uk/c/1511021"},{"categoryName":"UPVC Windows","url":"https://www.travisperkins.co.uk/c/1546001"},{"categoryName":"Utilities & Services","url":"https://www.travisperkins.co.uk/c/1500062"},{"categoryName":"Van Vault","url":"https://www.travisperkins.co.uk/c/1509000"},{"categoryName":"Vanity Basins","url":"https://www.travisperkins.co.uk/c/1500408"},{"categoryName":"VELUX Centre Pivot Roof Windows","url":"https://www.travisperkins.co.uk/c/1511005"},{"categoryName":"VELUX Conservation Roof Windows","url":"https://www.travisperkins.co.uk/c/1553005"},{"categoryName":"VELUX Fixings & Installation Products","url":"https://www.travisperkins.co.uk/c/1553004"},{"categoryName":"VELUX Flat Roof Windows & Sun Tunnels","url":"https://www.travisperkins.co.uk/c/1553002"},{"categoryName":"VELUX Integra Roof Windows","url":"https://www.travisperkins.co.uk/c/1553001"},{"categoryName":"VELUX Roof Flashings","url":"https://www.travisperkins.co.uk/c/1520003"},{"categoryName":"VELUX Roof Windows & Flashings","url":"https://www.travisperkins.co.uk/c/1520002"},{"categoryName":"VELUX Smoke Ventilation Systems","url":"https://www.travisperkins.co.uk/c/1553003"},{"categoryName":"VELUX Top Hung Roof Windows","url":"https://www.travisperkins.co.uk/c/1553000"},{"categoryName":"Vented Cylinders","url":"https://www.travisperkins.co.uk/c/1500306"},{"categoryName":"Wall & Frame Ties","url":"https://www.travisperkins.co.uk/c/1500094"},{"categoryName":"Wall Paper & Accessories","url":"https://www.travisperkins.co.uk/c/1500564"},{"categoryName":"Wall Papering Tools","url":"https://www.travisperkins.co.uk/c/1500551"},{"categoryName":"Wall Plugs & Plasterboard Fixings","url":"https://www.travisperkins.co.uk/c/1500246"},{"categoryName":"Wall Starter Kits","url":"https://www.travisperkins.co.uk/c/1500096"},{"categoryName":"Wall Tiles","url":"https://www.travisperkins.co.uk/c/1500561"},{"categoryName":"Walling","url":"https://www.travisperkins.co.uk/c/1500126"},{"categoryName":"Washers","url":"https://www.travisperkins.co.uk/c/1500250"},{"categoryName":"Washing Machine Hoses & Fittings","url":"https://www.travisperkins.co.uk/c/1500343"},{"categoryName":"Waste Pipe","url":"https://www.travisperkins.co.uk/c/1500326"},{"categoryName":"Waste Pipe Fittings","url":"https://www.travisperkins.co.uk/c/1500332"},{"categoryName":"Waste Pump Kits","url":"https://www.travisperkins.co.uk/c/1500358"},{"categoryName":"Water & Oil Storage","url":"https://www.travisperkins.co.uk/c/1500352"},{"categoryName":"Water Butts & Accessories","url":"https://www.travisperkins.co.uk/c/1500137"},{"categoryName":"Water Cylinders","url":"https://www.travisperkins.co.uk/c/1500305"},{"categoryName":"Water Harvesting","url":"https://www.travisperkins.co.uk/c/1517000"},{"categoryName":"Water Heaters","url":"https://www.travisperkins.co.uk/c/1500311"},{"categoryName":"Water Management","url":"https://www.travisperkins.co.uk/c/1500067"},{"categoryName":"Water Softeners","url":"https://www.travisperkins.co.uk/c/1500357"},{"categoryName":"Water Storage","url":"https://www.travisperkins.co.uk/c/1500136"},{"categoryName":"Water Systems","url":"https://www.travisperkins.co.uk/c/1518005"},{"categoryName":"Water Treatment","url":"https://www.travisperkins.co.uk/c/1500355"},{"categoryName":"Waterproofing","url":"https://www.travisperkins.co.uk/c/1529004"},{"categoryName":"Weather Seals","url":"https://www.travisperkins.co.uk/c/1548003"},{"categoryName":"Weatherboard","url":"https://www.travisperkins.co.uk/c/1511020"},{"categoryName":"Weed Killer","url":"https://www.travisperkins.co.uk/c/1500149"},{"categoryName":"Wet Rooms","url":"https://www.travisperkins.co.uk/c/1545010"},{"categoryName":"Wheel Barrows","url":"https://www.travisperkins.co.uk/c/1500525"},{"categoryName":"Window Accessories","url":"https://www.travisperkins.co.uk/c/1546003"},{"categoryName":"Window Boards","url":"https://www.travisperkins.co.uk/c/1500027"},{"categoryName":"Window Furniture & Hardware","url":"https://www.travisperkins.co.uk/c/1548001"},{"categoryName":"Window Locks & Security","url":"https://www.travisperkins.co.uk/c/1548006"},{"categoryName":"Windows","url":"https://www.travisperkins.co.uk/c/1500200"},{"categoryName":"Wood & Metal Paints","url":"https://www.travisperkins.co.uk/c/1500557"},{"categoryName":"Wood Dyes & Varnishes","url":"https://www.travisperkins.co.uk/c/1500559"},{"categoryName":"Wood Glue","url":"https://www.travisperkins.co.uk/c/1501002"},{"categoryName":"Wood Screws","url":"https://www.travisperkins.co.uk/c/1500239"},{"categoryName":"Woodcare","url":"https://www.travisperkins.co.uk/c/1501005"},{"categoryName":"Woodworking Tools","url":"https://www.travisperkins.co.uk/c/1500507"},{"categoryName":"Workbenches","url":"https://www.travisperkins.co.uk/c/1535006"},{"categoryName":"Worktop Accessories","url":"https://www.travisperkins.co.uk/c/1500210"},{"categoryName":"Worktops","url":"https://www.travisperkins.co.uk/c/1500209"},{"categoryName":"Worktops & Accessories","url":"https://www.travisperkins.co.uk/c/1502005"},{"categoryName":"Workwear & Safety","url":"https://www.travisperkins.co.uk/c/1500451"},{"categoryName":"Workwear Accessories","url":"https://www.travisperkins.co.uk/c/1500457"},{"categoryName":"Wrecking Bars","url":"https://www.travisperkins.co.uk/c/1501004"}];
		var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

		// Outer containers
		var $container = $('<div class="TP022_megamenu"></div>');
		var $quickLinks = $('<ul id="TP022_az-quick-links"></ul>');
		var $allGroups = $('<ul class="TP022_az-all-groups"></ul>');

		// Function to extract the categories that start with a certain letter
		var getCategories = function(letter) {
			var matchesLetter = [];

			for (var i = 0; i < data.length; i++) {
				var category = data[i];
				var categoryName = category.categoryName;
				var firstLetter = categoryName.charAt(0).toUpperCase();

				if (firstLetter === letter) {
					matchesLetter.push(category);
				}
			}
			return matchesLetter.length ? matchesLetter : false;
		};

		// Loop through every letter in the alphabet and segment into groups by letter
		for (var i = 0; i < alphabet.length; i++) {
			var letter = alphabet[i];
			var letterCategories = getCategories(letter);
			var $quickLink = $('<li class="TP022_az-quick-link" data-letter="' + letter + '">' + letter + '</li>');

			/* If no categories for this letter, add inactive class to quick link
			   and jump to next iteration */
			if (!letterCategories) {
				$quickLink
					.addClass('TP022_az-quick-link-inactive')
					.appendTo($quickLinks);
				continue;
			}

			// Build the HTML for every inner link
			var linksHTML = '';
			for (var j = 0; j < letterCategories.length; j++) {
				var category = letterCategories[j];
				var categoryName = category.categoryName;
				var url = category.url;

				// Add to the links HTML
				linksHTML += '<li><a href="' + url + '">' + categoryName + '</a></li>';
			}

			/* Build the outer container for the inner links and add functionality
			   to the quick link to automatically scroll to that section */
			var $letterGroup = $([
				'<li class="TP022_az-group">',
					'<div class="TP022_az-group-heading" data-letter="' + letter + '">' + letter + '</div>',
					'<ul class="TP022_az-group-link">' + linksHTML + '</ul>',
				'</li>'
			].join(''));
			
			$quickLink.on('click', function() {
				var letter = $(this).data('letter');
				var scrollPoint = $('.TP022_az-group-heading[data-letter="' + letter + '"]')[0].offsetTop - 110;
				if (!scrollPoint) return false;
	
				$('.TP022_nav').animate({
					scrollTop: scrollPoint
				}, 500);
			});


			// Append to outer containers
			$quickLink.appendTo($quickLinks);
			$letterGroup.appendTo($allGroups);
		}

		// Append to outer most HTML
		$container.append($quickLinks, $allGroups);

		return $container;
	};

	// EXPERIENCE
	var activate = function() {
		// Full Story Integration
		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'TP022',
				variation_str: 'Variation 2'
			});
		}, { multiplier: 1.2, timeout: 0 });

		$('body').addClass('TP022-2');

		var data = extractData();
		var nav = data ? buildNav(data) : false;
		var AtoZNav = buildAtoZNav();

		if (nav) {
			var $header = $('#header .tpHeaderContent_holder');

			// Repalce old nav toggle with a new one
			$('#headerItem0')
				.empty()
				.append('<div class="inner"><h3>Menu</h3></div>')
				.on('click', function() {
					// if opening nav and search bar is open, close it
					if (!nav.hasClass('TP022_nav-open')) {
						nav.add('html, body').addClass('TP022_nav-open');
						var searchIsOpen = $header.find('.siteSearch').css('display') !== 'none';
						if (searchIsOpen) {
							$header.find('.search.ui-link').hasClass('.ui-btn-active');
							// close search
							$header.find('.search.ui-btn-active').trigger('click');
						}
						// If user is on a-z index, add scroll event again
						if (nav.find('#TP022_nav-az-btn').hasClass('TP022_nav-type-active')) {
							nav.on('scroll', stickQuickLinksFunc);
						}
					} else {
						// Scroll back to top
						$('.TP022_nav').scrollTop(0);
						nav.animate({
							left: '-100%',
							right: '100%'
						}, 350, function() {
							$(this).removeClass('TP022_nav-open').removeAttr('style');
							$('html, body').removeClass('TP022_nav-open');
							// Reset nav back to main menu on close
							nav.find('.TP022_show').removeClass('TP022_show');
							// Remove Stick Quick Links scroll event
							nav.off('scroll');
						});
					}
				});

			$('#slide_menu').hide();
			$('#page').prepend(nav);

			// Set top of nav to start at the bottom of the header
			var positionNav = function() {
				header = $('#header .tpHeaderContent_holder');
				var headerBottom = $header.offset().top + $header.outerHeight();
				nav.add(nav.find('.TP022_level2-wrap, .TP022_level3-wrap')).css('top', headerBottom-1);
			};

			positionNav();

			// Do it again 5 secs after doc ready to make sure it's not positioned incorrectly
			$(function() {
				setTimeout(function() {
					positionNav();
				}, 5000);
			});
		}

		if (AtoZNav) {
			nav.find('#TP022_az-nav').append(AtoZNav);
		}

		/* Events */
		var trackerName;

		function sendEvent(category, action, label, nonInteractionValue) {
			var fire = function(tracker) {
				window.ga(tracker + '.send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
			};

			if (trackerName) {
				fire(trackerName);
			} else {
				UC.poller([
					function() { return window.ga.getAll; }
				], function() {
					trackerName = window.ga.getAll()[0].get('name');
					fire(trackerName);
				});
			}
		}

		var eventSent = {
			category: false,
			quickLink: false,
			azListing: false
		};

		$('#TP022_cat-nav > li').one('click', function() {
			if (!eventSent.category) {
				sendEvent('TP022', 'click', 'user clicked category nav', true);
				eventSent.category = true;
			}
		});

		$('#TP022_az-quick-links > li').one('click', function() {
			if (!eventSent.quickLink) {
				sendEvent('TP022', 'click', 'user clicked az letter quick link', true);
				eventSent.quickLink = true;
			}
		});

		$('#TP022_az-nav .TP022_az-group-link > li > a').one('click', function() {
			if (!eventSent.azListing) {
				sendEvent('TP022', 'click', 'user clicked az link', true);
				eventSent.azListing = true;
			}
		});
	};

	// TRIGGERS
	var _triggers = (function() {
		UC.poller([
			'#slide_menu > .ui-panel-inner li',
			'#page',
			'#header .tpHeaderContent_holder'
		], activate);
	})();
	
})();