var _TP011 = (function() {
<<<<<<< HEAD
=======
	var isTouchDevice = ('ontouchstart' in window ||  (navigator && navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0));
	var body = document.getElementsByTagName('body')[0];
	var hasClassTP011 = !!body.className.match(' TP011');
	
	if (isTouchDevice || hasClassTP011 || !document.querySelectorAll) {
		return false;
	}
  
>>>>>>> 06463924aa8a51367b9427208232ee11cd871996

	//--- Plugins and Helper Functions ---
	//UC Library - Poller * @version 0.2.2
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});


	/* MenuAim plugin to make the nav less "twitchy"
	   It gives the user more room for error when moving from the left hand nav
	   to a submenu. */
	!function(a){function b(b){var c=a(this),d=null,e=[],f=null,g=null,h=a.extend({rowSelector:"> li",submenuSelector:"*",submenuDirection:"right",tolerance:75,enter:a.noop,exit:a.noop,activate:a.noop,deactivate:a.noop,exitMenu:a.noop},b),i=3,j=300,k=function(a){e.push({x:a.pageX,y:a.pageY}),e.length>i&&e.shift()},l=function(){g&&clearTimeout(g),h.exitMenu(this)&&(d&&h.deactivate(d),d=null)},m=function(){g&&clearTimeout(g),h.enter(this),q(this)},n=function(){h.exit(this)},o=function(){p(this)},p=function(a){a!=d&&(d&&h.deactivate(d),h.activate(a),d=a)},q=function(a){var b=r();b?g=setTimeout(function(){q(a)},b):p(a)},r=function(){function o(a,b){return(b.y-a.y)/(b.x-a.x)}if(!d||!a(d).is(h.submenuSelector))return 0;var b=c.offset(),g={x:b.left,y:b.top-h.tolerance},i={x:b.left+c.outerWidth(),y:g.y},k={x:b.left,y:b.top+c.outerHeight()+h.tolerance},l={x:b.left+c.outerWidth(),y:k.y},m=e[e.length-1],n=e[0];if(!m)return 0;if(n||(n=m),n.x<b.left||n.x>l.x||n.y<b.top||n.y>l.y)return 0;if(f&&m.x==f.x&&m.y==f.y)return 0;var p=i,q=l;"left"==h.submenuDirection?(p=k,q=g):"below"==h.submenuDirection?(p=l,q=k):"above"==h.submenuDirection&&(p=g,q=i);var r=o(m,p),s=o(m,q),t=o(n,p),u=o(n,q);return r<t&&s>u?(f=m,j):(f=null,0)};c.mouseleave(l).find(h.rowSelector).mouseenter(m).mouseleave(n).click(o),a(document).mousemove(k)}a.fn.menuAim=function(a){return this.each(function(){b.call(this,a)}),this}}(jQuery);

	// Exclude hidden and empty elements from selector
	$.fn.filterVisible = function() {
    	return this.filter(function() {
			return $(this).css('display') !== 'none' && $(this).children().length > 0;
		});
	};

	/* NOTES: Rather than modifying the existing nav this exp builds a 
	   new one from scratch using data extracted from the old nav. 

	   Data is extracted into JSON format and then used to construct
	   the new nav.

	   Example JSON:
		[
			{
				title: 'Timber',
				url: '/Product/Timber/c/1500000',
				children: [
					{
						title: 'Sheet Material',
						url: '/Product/Timber/Sheet-Material/c/1500007',
						children: []
					}
				]
			}
		];
	*/  

	//--- Extract Data ---
	var extractData = function() {
		var nav_JSON = [];
		var $nav = $('#tp_nav_main');

		// Loop though first level links
		var $level1 = $nav.find('.level1Category').filterVisible();
		$level1.each(function() {
			var $el = $(this);

			/* Level 1 links with the STANDARD class don't have deeper levels
			but they may have other level 1 links inside.
			In these cases loop through the inner list items and treat each
			one as new level 1 link. */
			if ($el.hasClass('STANDARD') && $el.children('ul').length) {
				$el.find('> ul > li').each(function() {
					var $el = $(this);
					var $link = $el.find('> div > span > a');
					var title = $link.text().trim();
					var url = $link.attr('href');
<<<<<<< HEAD
=======
                  
>>>>>>> 06463924aa8a51367b9427208232ee11cd871996

					var level1Obj = {
						'title': title,
						'url': url,
						'children': []
					};

					if (level1Obj) nav_JSON.push(level1Obj);
				});

				// Continue the loop as normal from the next iteration
				return true;
			}
				
			var $link = $el.find('> span > a');
			var title = $link.text().trim();
			var url = $link.attr('href');

			var level1Obj = {
				'title': title,
				'url': url,
				'children': []
			};

			// Loop though second level links
			var $level2 = $(this).find('.tp_nav2level_category').filterVisible();
			$level2.each(function() {
				var $el = $(this);
				var $link = $el.find('> .nav2level_Title > a');
				var title = $link.text().trim();
				var url = $link.attr('href');

				var level2Obj = {
					'title': title,
					'url': url,
					'children': []
				};

				level1Obj.children.push(level2Obj);

				// Loop though third level links
				var $level3 = $(this).find('.level3Category').filterVisible();
				$level3.each(function() {
					var $el = $(this);
					var $link = $el.find('> a');
					var title = $link.text().trim();
					var url = $link.attr('href');

					var level3Obj = {
						'title': title,
						'url': url,
						'children': []
					};

					level2Obj.children.push(level3Obj);
				});

			});

			nav_JSON.push(level1Obj);
		});

		return nav_JSON;
	};


	//--- Build Nav ---
	var buildNav = function(data) {
		var $nav_HTML = $([
			'<div class="TP011_nav">',
				'<ul class="TP011_level0">',
<<<<<<< HEAD
					'<li>',
=======
					'<li id="TP011_menu-listing">',
>>>>>>> 06463924aa8a51367b9427208232ee11cd871996
						'<a href="#">',
							'<div class="TP011_hamburger">',
  								'<span></span>',
								'<span></span>',
								'<span></span>',
								'<span></span>',
							'</div>',
							'<span>Menu</span>',
						'</a>',
						'<div class="TP011_megamenu">',
							'<ul class="TP011_level1"></ul>',
						'</div>',
					'</li>',
					'<li id="TP011_az-listing">',
						'<a href="#">',
							'<div class="TP011_hamburger">',
  								'<span></span>',
								'<span></span>',
								'<span></span>',
								'<span></span>',
							'</div>',
							'<span>A to Z Listing</span>',
						'</a>',
						//'<div class="TP011_megamenu"></div>',
					'</li>',
				'</ul>',
			'</div>'
		].join(''));

		var $level0 = $nav_HTML.find('.TP011_level0');


		// Add TP011_open class to level 0 list items on hover
		var closeNavEvents = [];
		function closeAllNavs() {
			$.each(closeNavEvents, function() {
				this();
			});
		}

<<<<<<< HEAD
		var isTouchDevice = ('ontouchstart' in window ||  (navigator && navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0));
=======
>>>>>>> 06463924aa8a51367b9427208232ee11cd871996
		$level0.children('li').each(function() {
			var $el = $(this);
			var name = $el.find('> a > span').text();
			var $menu = $el.find('> a > .TP011_hamburger');

			var openNav = function() {
				$menu.addClass('TP011_menu-open');
				$el.find('.TP011_open').removeClass('TP011_open');
				$el.addClass('TP011_open');
<<<<<<< HEAD
				$('body').addClass('TP011_scroll-lock');
=======
				//$('body').addClass('TP011_scroll-lock');
>>>>>>> 06463924aa8a51367b9427208232ee11cd871996

				// Set first submenu to active to avoid a blank megamenu
				var $first = $nav_HTML.find('.TP011_level1 > li:first');
				$first.addClass('TP011_open');

				if (isTouchDevice) {
					$level1.find('> li.TP011_show-link-indicator:not(".TP011_single-link")').removeClass('TP011_show-link-indicator');
					$first.addClass('.TP011_show-link-indicator');
				}
			
				$nav_HTML.css('z-index', '1002');

				var $overlay = $('.TP011_overlay');
				$overlay.css('z-index', '1001');
				$('.TP011_overlay').stop(true, true).fadeIn(400, function() {
					$overlay.css('z-index', '1001');
				});
			};

			var closeNav = function() {
				$menu.removeClass('TP011_menu-open');
				$el.removeClass('TP011_open');
<<<<<<< HEAD
				$('body').removeClass('TP011_scroll-lock');
=======
				//$('body').removeClass('TP011_scroll-lock');
>>>>>>> 06463924aa8a51367b9427208232ee11cd871996

				$nav_HTML.css('z-index', '999');

				var $overlay = $('.TP011_overlay');
				$('.TP011_overlay').stop(true, true).fadeOut(400, function() {
					//$overlay.css('z-index', '998');
				});
			};

			closeNavEvents.push(closeNav);

			if (isTouchDevice) {
				// Open/Close nav on click for touch devices
				$el.children('a').on('touchstart', function() {
					$el.off('mouseenter');
					$el.off('mouseleave');

					if ($el.hasClass('TP011_open')) {
						//closeNav();
						closeAllNavs();
					} else {
						closeAllNavs();
						openNav();
					}
				});
			}

			$el.on({
				mouseenter: function() {
					closeAllNavs();
					openNav();
				},
				mouseleave: function() {
					closeAllNavs();
					//closeNav();
				}
			});

		});

		// Level 1
		var $level1 = $level0.find('.TP011_level1');

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
				var $level2 = $('<ul class="TP011_level2"></ul>');

				$.each(level1.children, function() {
					var level2 = this;
					var $html = $([
						'<li>',
<<<<<<< HEAD
							'<a href="' + level2.url + '">',
								level2.title,
=======
							'<a class="TP011_level2-link" href="' + level2.url + '">',
								'All ' + level2.title + '<em>&nbsp;&gt;</em>',
>>>>>>> 06463924aa8a51367b9427208232ee11cd871996
							'</a>',
						'</li>'
					].join(''));

					// Level 3
					if (level2.children.length) {
						var $level3 = $('<ul class="TP011_level3"></ul>');

						$.each(level2.children, function() {
							var level3 = this;
							var $html = $([
								'<li>',
									'<a href="' + level3.url + '">',
										level3.title,
									'</a>',
								'</li>'
							].join(''));

							// Add level 3 list item to level 3 container
							$html.appendTo($level3);
						});

						// Add level 3 container to level 2 list item
						$level3.appendTo($html);
					}

					// Add level 2 list item to level 2 container
					$html.appendTo($level2);
				});


				/* Wrap level 2 list items into columns
				   The number of groups per column depends on the total number of subtree list items.
				   It will include as many groups as it can in the current column until it reaches 
				   the theshold, then it will move onto a new column. This prevents cols from being 
				   too long vertically. */

				var $groups = $level2.children('li');
				var columnLiThreshold = 17; // Max number of list items in each column
				var columnLiCount = 0; // Number of list items in current column
				var columnSplit = []; // Will contain number of groups that can fit into each col


				$groups.each(function(i) {
					var subtreeLi = $(this).find('li');
					/* +3 to account for the group headings being a larger font taking up more space
					   About the equivalent of 3 normal links */
					var newLiCount = (subtreeLi.length+3) + columnLiCount;

					/* If this group is to be added to the column and is still within
					   the threshold limit, do stuff */
					if (newLiCount <= columnLiThreshold) {
						// Update current counter to include new list items
						columnLiCount = newLiCount;
					} else {
						// Threshold exceeded, this group must go in a new column
						columnSplit.push(i); // Record group index so we know to split the column here later
						columnLiCount = (subtreeLi.length+3); // Reset counter
					}

					// If this is the last group, end the column here
					if ((i+1) === $groups.length) {
						columnSplit.push($groups.length);
						return true;
					}
				});

				// Get groups of elements based on columnSplit
				var columns = [];
				$.each(columnSplit, function(i) {
					var start = i === 0 ? 0 : columnSplit[i-1];
					var end = this;
					
					var $split = $groups.slice(start, end);
					columns.push($split);
				});


				// Wrap elements in columns
				$.each(columns, function() {
					$(this).wrapAll('<div class="TP011_col"></div>');
				});

				// Add message to the end of submenu
				$level2.append('<span class="TP011_menu-msg">We have over 20,000 products in over 2,000 product categories ready for delivery or collection in over 680 branches</span>');
				
				// Add level 2 container to level 1 list item
				$level2.appendTo($html);
			} else {
				$html.addClass('TP011_single-link');
			}

			// Add level 1 list item to level 1 container
			$html.appendTo($level1);

		});
<<<<<<< HEAD
=======
      
      	  // Manual addition of single links to level 1
          var manualLinks = [['Clearance', '/Clearance']];
          $.each(manualLinks, function(idx, item) {
            var alreadyExists = false;
            $level1.children('li').each(function() {
              var link = $(this).find('> a:first');
              if(link.text().trim() === item[0]) {
                alreadyExists = true;
              }
            });
            
            if(!alreadyExists) {
              $level1.append([
                '<li class="TP011_single-link TP011_show-link-indicator">',
                  '<a href="' + item[1] + '">',
                      item[0],
                  '</a>',
                '</li>'
              ].join(''));
            }
          });
      
      	// Highlight level 1 links
      	var highlightLinks = ['Clearance', 'Trade Offers'];
          $.each(highlightLinks, function(idx, item) {
            $level1.children('li').each(function() {
              var link = $(this).find('> a:first');
              if(link.text().trim() === item) {
                link.addClass('TP011_highlight-link');
              }
            });
          });
>>>>>>> 06463924aa8a51367b9427208232ee11cd871996

		// Open submenus on hover over level 1 nav
		if (!isTouchDevice) {
			$level1.menuAim({
				activate: function(row) {
					var $row = $(row);
					if (!$row.hasClass('TP011_open')) {
						$row.addClass('TP011_open');
					}
					if ($row.hasClass('TP011_single-link')) {
						$level0.find('.TP011_megamenu').addClass('TP011_hide-subnav');
					}
				},  
				deactivate: function(row) {
					var $row = $(row);
					if ($row.hasClass('TP011_open')) {
						$row.removeClass('TP011_open');
					}
					if (!$row.hasClass('TP011_single-link')) {
						$level0.find('.TP011_megamenu').removeClass('TP011_hide-subnav');
					}
				},
				rowSelector: '> li'
			});
		} else {
			// If touch device prevent level 1 nav from going to urls and just open subnav instead
			$level1.find('> li').on('touchstart', function(e) {
				e.preventDefault();
				e.stopPropagation();

				var url = $(this).children('a').attr('href');

				// If this is already active, go the the link url
				if ($(this).hasClass('TP011_open')) {	
					if (url) window.location.href = url;
				}

				$level1.find('> li.TP011_open').removeClass('TP011_open');
				$level1.find('> li.TP011_show-link-indicator:not(".TP011_single-link")').removeClass('TP011_show-link-indicator');

				$(this).addClass('TP011_open');
				$(this).addClass('TP011_show-link-indicator');

				if ($(this).hasClass('TP011_single-link')) {
					$level0.find('.TP011_megamenu').addClass('TP011_hide-subnav');
					// redirect to href url
					if (url) window.location.href = url;
				} else {
					$level0.find('.TP011_megamenu').removeClass('TP011_hide-subnav');
					$(this).addClass('TP011_show-link-indicator');
				}
			});

			// Enable default click behaviour on submenu
			$nav_HTML.find('.TP011_level2 a').on('touchstart', function(e) {
				e.stopPropagation();
				$(this).css({'color': '#f6b112', 'text-decoration': 'underline'});
				var url = $(this).attr('href');
				if (url) window.location.href = url;
			});

			// Stop clicks on blank spaces from bubbling and triggering level 1 clicks
			$nav_HTML.find('.TP011_level2').on('touchstart', function(e) {
				e.stopPropagation();
			});
		}
		
		// Add link indicators to single-links
		$level0.find('.TP011_single-link').addClass('TP011_show-link-indicator');

		// Add scroll class to submenus the exceed level 1 height
		$level1.find('.TP011_level2').filter(function() {
			return $(this).children('.TP011_col').length > 4;
		}).addClass('TP011_scroll-menu');

		return $nav_HTML;
	};

	//--- A-Z Navigation ---
	var buildAtoZNav = function() {
		
		// Nav content JSON (613 objects)
		var data = [{"categoryName":"Access Equipment","url":"https://www.travisperkins.co.uk/c/1500533"},{"categoryName":"Access Panels","url":"https://www.travisperkins.co.uk/c/1500235"},{"categoryName":"Accessories","url":"https://www.travisperkins.co.uk/c/1532001"},{"categoryName":"Additives & Admixtures","url":"https://www.travisperkins.co.uk/c/1529001"},{"categoryName":"Adhesive Tapes","url":"https://www.travisperkins.co.uk/c/1500281"},{"categoryName":"Adhesives","url":"https://www.travisperkins.co.uk/c/1500273"},{"categoryName":"Aerated Blocks","url":"https://www.travisperkins.co.uk/c/1500036"},{"categoryName":"Air Source Heat Pumps","url":"https://www.travisperkins.co.uk/c/1518001"},{"categoryName":"Alarms","url":"https://www.travisperkins.co.uk/c/1500604"},{"categoryName":"Aluminium Guttering","url":"https://www.travisperkins.co.uk/c/1515001"},{"categoryName":"Angle Grinders","url":"https://www.travisperkins.co.uk/c/1500478"},{"categoryName":"Angles & Brackets","url":"https://www.travisperkins.co.uk/c/1500097"},{"categoryName":"Annular Ring Shank Nails","url":"https://www.travisperkins.co.uk/c/1500252"},{"categoryName":"Artificial Grass","url":"https://www.travisperkins.co.uk/c/1532000"},{"categoryName":"Artificial Slate Roof Tiles","url":"https://www.travisperkins.co.uk/c/1500077"},{"categoryName":"Asphalt Pothole Repair","url":"https://www.travisperkins.co.uk/c/1500047"},{"categoryName":"Auger Drill Bits","url":"https://www.travisperkins.co.uk/c/1545001"},{"categoryName":"Automotive","url":"https://www.travisperkins.co.uk/c/1500537"},{"categoryName":"Bagged Aggregates","url":"https://www.travisperkins.co.uk/c/1500050"},{"categoryName":"Balustrades & Handrails","url":"https://www.travisperkins.co.uk/c/1500110"},{"categoryName":"Basin Taps","url":"https://www.travisperkins.co.uk/c/1500427"},{"categoryName":"Basin Wastes & Traps","url":"https://www.travisperkins.co.uk/c/1500338"},{"categoryName":"Basins","url":"https://www.travisperkins.co.uk/c/1500407"},{"categoryName":"Basins & Pedestals","url":"https://www.travisperkins.co.uk/c/1500404"},{"categoryName":"Bath Panels","url":"https://www.travisperkins.co.uk/c/1500402"},{"categoryName":"Bath Screens","url":"https://www.travisperkins.co.uk/c/1500403"},{"categoryName":"Bath Taps","url":"https://www.travisperkins.co.uk/c/1500426"},{"categoryName":"Bath Tubs","url":"https://www.travisperkins.co.uk/c/1500395"},{"categoryName":"Bath Wastes & Traps","url":"https://www.travisperkins.co.uk/c/1500339"},{"categoryName":"Bathroom & Sanitary Sealants","url":"https://www.travisperkins.co.uk/c/1500267"},{"categoryName":"Bathroom Accessories","url":"https://www.travisperkins.co.uk/c/1504000"},{"categoryName":"Bathroom Furniture","url":"https://www.travisperkins.co.uk/c/1503002"},{"categoryName":"Bathroom Lighting","url":"https://www.travisperkins.co.uk/c/1507000"},{"categoryName":"Bathroom Suites","url":"https://www.travisperkins.co.uk/c/1500377"},{"categoryName":"Bathroom Taps","url":"https://www.travisperkins.co.uk/c/1500425"},{"categoryName":"Bathrooms","url":"https://www.travisperkins.co.uk/c/1500376"},{"categoryName":"Baths","url":"https://www.travisperkins.co.uk/c/1500393"},{"categoryName":"Batteries","url":"https://www.travisperkins.co.uk/c/1500607"},{"categoryName":"Batteries & Chargers","url":"https://www.travisperkins.co.uk/c/1500497"},{"categoryName":"Beading & Trims","url":"https://www.travisperkins.co.uk/c/1547001"},{"categoryName":"Beads & Mesh","url":"https://www.travisperkins.co.uk/c/1500226"},{"categoryName":"Below Ground Drainage","url":"https://www.travisperkins.co.uk/c/1500055"},{"categoryName":"Bibs, Braces and Coveralls","url":"https://www.travisperkins.co.uk/c/1500456"},{"categoryName":"Bidet Taps","url":"https://www.travisperkins.co.uk/c/1505002"},{"categoryName":"Bidets","url":"https://www.travisperkins.co.uk/c/1505001"},{"categoryName":"Biomass Boilers","url":"https://www.travisperkins.co.uk/c/1518003"},{"categoryName":"Biomass Fuels","url":"https://www.travisperkins.co.uk/c/1518004"},{"categoryName":"Biomass Heating","url":"https://www.travisperkins.co.uk/c/1517001"},{"categoryName":"Block Paving","url":"https://www.travisperkins.co.uk/c/1500118"},{"categoryName":"Blocks","url":"https://www.travisperkins.co.uk/c/1500034"},{"categoryName":"Boilers","url":"https://www.travisperkins.co.uk/c/1500284"},{"categoryName":"Bolts & Threaded Bar","url":"https://www.travisperkins.co.uk/c/1500249"},{"categoryName":"Breather Membrane","url":"https://www.travisperkins.co.uk/c/1511001"},{"categoryName":"Brick Bolsters & Chisels","url":"https://www.travisperkins.co.uk/c/1500513"},{"categoryName":"Bricks & Blocks","url":"https://www.travisperkins.co.uk/c/1500030"},{"categoryName":"Brickwork Ventilation","url":"https://www.travisperkins.co.uk/c/1500038"},{"categoryName":"Brushes & Brooms","url":"https://www.travisperkins.co.uk/c/1500567"},{"categoryName":"Buckets & Bins","url":"https://www.travisperkins.co.uk/c/1500526"},{"categoryName":"Builders Metalwork","url":"https://www.travisperkins.co.uk/c/1500090"},{"categoryName":"Building Chemicals","url":"https://www.travisperkins.co.uk/c/1529000"},{"categoryName":"Building Materials","url":"https://www.travisperkins.co.uk/c/1500029"},{"categoryName":"Building Restraint Straps","url":"https://www.travisperkins.co.uk/c/1500093"},{"categoryName":"Butt Hinges","url":"https://www.travisperkins.co.uk/c/1541015"},{"categoryName":"Cabin Hooks","url":"https://www.travisperkins.co.uk/c/1541019"},{"categoryName":"Cabinet Hardware & Furniture","url":"https://www.travisperkins.co.uk/c/1539001"},{"categoryName":"Cabinet Hinges","url":"https://www.travisperkins.co.uk/c/1541011"},{"categoryName":"Cable","url":"https://www.travisperkins.co.uk/c/1500572"},{"categoryName":"Cable Clips, Ties & Accessories","url":"https://www.travisperkins.co.uk/c/1500580"},{"categoryName":"Cable Conduit & Trunking","url":"https://www.travisperkins.co.uk/c/1500579"},{"categoryName":"Cable Management","url":"https://www.travisperkins.co.uk/c/1500578"},{"categoryName":"Cable Reels & Extension Leads","url":"https://www.travisperkins.co.uk/c/1500603"},{"categoryName":"Carbon Monoxide Detectors","url":"https://www.travisperkins.co.uk/c/1500605"},{"categoryName":"Carpet & Floor Protection","url":"https://www.travisperkins.co.uk/c/1500543"},{"categoryName":"Casement Stays & Fastners","url":"https://www.travisperkins.co.uk/c/1548004"},{"categoryName":"Catches, Latches & Locks","url":"https://www.travisperkins.co.uk/c/1539005"},{"categoryName":"Cavity and Internal Wall Insulation","url":"https://www.travisperkins.co.uk/c/1500214"},{"categoryName":"Cavity Closers","url":"https://www.travisperkins.co.uk/c/1500218"},{"categoryName":"Ceilings","url":"https://www.travisperkins.co.uk/c/1500230"},{"categoryName":"Cement Dyes & Additives","url":"https://www.travisperkins.co.uk/c/1503000"},{"categoryName":"Cement Mixers & Paddle Mixers","url":"https://www.travisperkins.co.uk/c/1500512"},{"categoryName":"Cements & Aggregates","url":"https://www.travisperkins.co.uk/c/1500039"},{"categoryName":"Cements & Limes","url":"https://www.travisperkins.co.uk/c/1500040"},{"categoryName":"Central Heating","url":"https://www.travisperkins.co.uk/c/1500283"},{"categoryName":"Chainlink & Wire Netting","url":"https://www.travisperkins.co.uk/c/1500095"},{"categoryName":"Chains & Accessories","url":"https://www.travisperkins.co.uk/c/1541016"},{"categoryName":"Chemical Fixings & Expanding Foam","url":"https://www.travisperkins.co.uk/c/1500264"},{"categoryName":"Chemical Water Treatment","url":"https://www.travisperkins.co.uk/c/1502003"},{"categoryName":"Chimney Pots & Cowls","url":"https://www.travisperkins.co.uk/c/1511009"},{"categoryName":"Chipboard","url":"https://www.travisperkins.co.uk/c/1502020"},{"categoryName":"Cistern Fittings","url":"https://www.travisperkins.co.uk/c/1500351"},{"categoryName":"Civils & Drainage","url":"https://www.travisperkins.co.uk/c/1500054"},{"categoryName":"Clamps","url":"https://www.travisperkins.co.uk/c/1535003"},{"categoryName":"Clay Drainage","url":"https://www.travisperkins.co.uk/c/1500057"},{"categoryName":"Clay Roof Tiles","url":"https://www.travisperkins.co.uk/c/1500076"},{"categoryName":"Cleaners & Wipes","url":"https://www.travisperkins.co.uk/c/1500545"},{"categoryName":"Cleaning & Preparation","url":"https://www.travisperkins.co.uk/c/1500539"},{"categoryName":"Cleaning Accessories","url":"https://www.travisperkins.co.uk/c/1500570"},{"categoryName":"Cleaning Chemicals","url":"https://www.travisperkins.co.uk/c/1529005"},{"categoryName":"Clout Nails","url":"https://www.travisperkins.co.uk/c/1500253"},{"categoryName":"CLS Studwork Timber","url":"https://www.travisperkins.co.uk/c/1500004"},{"categoryName":"Coach Screws","url":"https://www.travisperkins.co.uk/c/1502029"},{"categoryName":"Collated Screws","url":"https://www.travisperkins.co.uk/c/1500241"},{"categoryName":"Column Radiators","url":"https://www.travisperkins.co.uk/c/1509003"},{"categoryName":"Combination & Extension Ladders","url":"https://www.travisperkins.co.uk/c/1500535"},{"categoryName":"Common & Concrete Bricks","url":"https://www.travisperkins.co.uk/c/1502019"},{"categoryName":"Composite Decking","url":"https://www.travisperkins.co.uk/c/1500109"},{"categoryName":"Compression Fittings","url":"https://www.travisperkins.co.uk/c/1500329"},{"categoryName":"Concrete Blocks","url":"https://www.travisperkins.co.uk/c/1500035"},{"categoryName":"Concrete Fence Posts","url":"https://www.travisperkins.co.uk/c/1500103"},{"categoryName":"Concrete Lintels","url":"https://www.travisperkins.co.uk/c/1500069"},{"categoryName":"Concrete Roof Tiles","url":"https://www.travisperkins.co.uk/c/1500074"},{"categoryName":"Construction Equipment","url":"https://www.travisperkins.co.uk/c/1538000"},{"categoryName":"Consumer Units","url":"https://www.travisperkins.co.uk/c/1502018"},{"categoryName":"Controls & Accessories","url":"https://www.travisperkins.co.uk/c/1518007"},{"categoryName":"Coving","url":"https://www.travisperkins.co.uk/c/1500224"},{"categoryName":"Cylinder Locks","url":"https://www.travisperkins.co.uk/c/1550000"},{"categoryName":"Dakota","url":"https://www.travisperkins.co.uk/c/1509008"},{"categoryName":"Damp Proof Course & Membranes","url":"https://www.travisperkins.co.uk/c/1500037"},{"categoryName":"Decking","url":"https://www.travisperkins.co.uk/c/1500107"},{"categoryName":"Decking Screws","url":"https://www.travisperkins.co.uk/c/1500242"},{"categoryName":"Decorating & Interiors","url":"https://www.travisperkins.co.uk/c/1500538"},{"categoryName":"Decorating Knives","url":"https://www.travisperkins.co.uk/c/1500550"},{"categoryName":"Decorating Tools","url":"https://www.travisperkins.co.uk/c/1500546"},{"categoryName":"Decorative Concrete Paving","url":"https://www.travisperkins.co.uk/c/1500125"},{"categoryName":"Decorative Concrete Paving Packs","url":"https://www.travisperkins.co.uk/c/1502022"},{"categoryName":"Decorative Kerbs & Caps","url":"https://www.travisperkins.co.uk/c/1500120"},{"categoryName":"Decorative Mouldings & Beads","url":"https://www.travisperkins.co.uk/c/1500024"},{"categoryName":"Decorative Panels","url":"https://www.travisperkins.co.uk/c/1533000"},{"categoryName":"Decorative Stones & Gravel","url":"https://www.travisperkins.co.uk/c/1500053"},{"categoryName":"Decorators Caulk","url":"https://www.travisperkins.co.uk/c/1500270"},{"categoryName":"Designer Radiators","url":"https://www.travisperkins.co.uk/c/1509004"},{"categoryName":"Detergents & Cleaners","url":"https://www.travisperkins.co.uk/c/1500569"},{"categoryName":"Diamond Core Bits","url":"https://www.travisperkins.co.uk/c/1500490"},{"categoryName":"Digital Door Locks","url":"https://www.travisperkins.co.uk/c/1541005"},{"categoryName":"Digital Showers","url":"https://www.travisperkins.co.uk/c/1500414"},{"categoryName":"Digital Tools","url":"https://www.travisperkins.co.uk/c/1534002"},{"categoryName":"Door & Window Seals","url":"https://www.travisperkins.co.uk/c/1548000"},{"categoryName":"Door Accessories","url":"https://www.travisperkins.co.uk/c/1540000"},{"categoryName":"Door Accessory Packs","url":"https://www.travisperkins.co.uk/c/1540003"},{"categoryName":"Door Closers","url":"https://www.travisperkins.co.uk/c/1539008"},{"categoryName":"Door Closers & Panic Hardware","url":"https://www.travisperkins.co.uk/c/1539003"},{"categoryName":"Door Frames","url":"https://www.travisperkins.co.uk/c/1500178"},{"categoryName":"Door Frames, Linings & Casings","url":"https://www.travisperkins.co.uk/c/1500177"},{"categoryName":"Door Furniture & Ironmongery","url":"https://www.travisperkins.co.uk/c/1539004"},{"categoryName":"Door Handles","url":"https://www.travisperkins.co.uk/c/1540001"},{"categoryName":"Door Lining & Casings","url":"https://www.travisperkins.co.uk/c/1500179"},{"categoryName":"Door Locks","url":"https://www.travisperkins.co.uk/c/1541000"},{"categoryName":"Doors & Joinery","url":"https://www.travisperkins.co.uk/c/1500152"},{"categoryName":"Double Radiators","url":"https://www.travisperkins.co.uk/c/1509002"},{"categoryName":"Drill Bit Sets","url":"https://www.travisperkins.co.uk/c/1502023"},{"categoryName":"Drilling","url":"https://www.travisperkins.co.uk/c/1500482"},{"categoryName":"Drills","url":"https://www.travisperkins.co.uk/c/1500472"},{"categoryName":"Driveway Project Packs","url":"https://www.travisperkins.co.uk/c/1500117"},{"categoryName":"Driveways","url":"https://www.travisperkins.co.uk/c/1500116"},{"categoryName":"Dry Lining Boxes","url":"https://www.travisperkins.co.uk/c/1500591"},{"categoryName":"Dry Wall Screws","url":"https://www.travisperkins.co.uk/c/1500243"},{"categoryName":"Ducting","url":"https://www.travisperkins.co.uk/c/1500362"},{"categoryName":"Ducting & Ventilation","url":"https://www.travisperkins.co.uk/c/1500359"},{"categoryName":"Dust Extraction","url":"https://www.travisperkins.co.uk/c/1534000"},{"categoryName":"Dust Sheets","url":"https://www.travisperkins.co.uk/c/1500542"},{"categoryName":"Ear Protection","url":"https://www.travisperkins.co.uk/c/1500461"},{"categoryName":"Edgings, Copings & Caps","url":"https://www.travisperkins.co.uk/c/1500127"},{"categoryName":"Electric Boilers","url":"https://www.travisperkins.co.uk/c/1502008"},{"categoryName":"Electric Showers","url":"https://www.travisperkins.co.uk/c/1500413"},{"categoryName":"Electric Systems","url":"https://www.travisperkins.co.uk/c/1518006"},{"categoryName":"Electrical & Lighting","url":"https://www.travisperkins.co.uk/c/1500571"},{"categoryName":"Electrical Accessories","url":"https://www.travisperkins.co.uk/c/1500608"},{"categoryName":"Emulsion Paints","url":"https://www.travisperkins.co.uk/c/1500554"},{"categoryName":"End Feed Fittings","url":"https://www.travisperkins.co.uk/c/1500328"},{"categoryName":"Engineered Flooring","url":"https://www.travisperkins.co.uk/c/1500190"},{"categoryName":"Engineering Bricks","url":"https://www.travisperkins.co.uk/c/1500032"},{"categoryName":"Exterior & Masonry Paints","url":"https://www.travisperkins.co.uk/c/1500555"},{"categoryName":"External Cladding","url":"https://www.travisperkins.co.uk/c/1500088"},{"categoryName":"External Doors","url":"https://www.travisperkins.co.uk/c/1500160"},{"categoryName":"External Fire Doors","url":"https://www.travisperkins.co.uk/c/1500167"},{"categoryName":"External Hardwood Doors","url":"https://www.travisperkins.co.uk/c/1500162"},{"categoryName":"External Softwood Doors","url":"https://www.travisperkins.co.uk/c/1500161"},{"categoryName":"Extractor Fans & Kits","url":"https://www.travisperkins.co.uk/c/1500361"},{"categoryName":"Eye Protection","url":"https://www.travisperkins.co.uk/c/1500460"},{"categoryName":"Facing Bricks","url":"https://www.travisperkins.co.uk/c/1500031"},{"categoryName":"Fence Panels & Trellis","url":"https://www.travisperkins.co.uk/c/1500100"},{"categoryName":"Fence Post Caps & Tops","url":"https://www.travisperkins.co.uk/c/1500106"},{"categoryName":"Fence Posts","url":"https://www.travisperkins.co.uk/c/1500102"},{"categoryName":"Fencing","url":"https://www.travisperkins.co.uk/c/1500099"},{"categoryName":"Fencing & Decking Treatments","url":"https://www.travisperkins.co.uk/c/1500150"},{"categoryName":"Fibreglass Valleys","url":"https://www.travisperkins.co.uk/c/1511008"},{"categoryName":"Fillers","url":"https://www.travisperkins.co.uk/c/1500544"},{"categoryName":"Filling & Grab Adhesives","url":"https://www.travisperkins.co.uk/c/1500275"},{"categoryName":"Fire Door Hinges","url":"https://www.travisperkins.co.uk/c/1541012"},{"categoryName":"Fire Rated Sealants","url":"https://www.travisperkins.co.uk/c/1500269"},{"categoryName":"Fire Resistant Boards","url":"https://www.travisperkins.co.uk/c/1500012"},{"categoryName":"Firedoors","url":"https://www.travisperkins.co.uk/c/1500165"},{"categoryName":"Fires","url":"https://www.travisperkins.co.uk/c/1500314"},{"categoryName":"Fires & Heating Fuels","url":"https://www.travisperkins.co.uk/c/1500310"},{"categoryName":"First Aid Kits","url":"https://www.travisperkins.co.uk/c/1500466"},{"categoryName":"Fixing Tools","url":"https://www.travisperkins.co.uk/c/1535004"},{"categoryName":"Fixings & Adhesives","url":"https://www.travisperkins.co.uk/c/1500237"},{"categoryName":"Fixings & Fittings","url":"https://www.travisperkins.co.uk/c/1539006"},{"categoryName":"Flat Roof Repair & Maintenance","url":"https://www.travisperkins.co.uk/c/1511014"},{"categoryName":"Flat Roofing","url":"https://www.travisperkins.co.uk/c/1500085"},{"categoryName":"Flat Wood Bits","url":"https://www.travisperkins.co.uk/c/1500491"},{"categoryName":"Flexible Tap Connectors","url":"https://www.travisperkins.co.uk/c/1500334"},{"categoryName":"Floor Insulation","url":"https://www.travisperkins.co.uk/c/1500213"},{"categoryName":"Floor Paints","url":"https://www.travisperkins.co.uk/c/1500558"},{"categoryName":"Flooring Accessories","url":"https://www.travisperkins.co.uk/c/1500192"},{"categoryName":"Flooring Adhesives","url":"https://www.travisperkins.co.uk/c/1500194"},{"categoryName":"Flooring Compounds","url":"https://www.travisperkins.co.uk/c/1529002"},{"categoryName":"Flooring Underlay","url":"https://www.travisperkins.co.uk/c/1500193"},{"categoryName":"Flues & Accessories","url":"https://www.travisperkins.co.uk/c/1500287"},{"categoryName":"Footwear","url":"https://www.travisperkins.co.uk/c/1500452"},{"categoryName":"Garage Doors","url":"https://www.travisperkins.co.uk/c/1512000"},{"categoryName":"Garden & Patio Maintenance","url":"https://www.travisperkins.co.uk/c/1500148"},{"categoryName":"Garden Furniture","url":"https://www.travisperkins.co.uk/c/1555001"},{"categoryName":"Garden Sheds","url":"https://www.travisperkins.co.uk/c/1500134"},{"categoryName":"Garden Sheds & Greenhouses","url":"https://www.travisperkins.co.uk/c/1500130"},{"categoryName":"Garden Storage","url":"https://www.travisperkins.co.uk/c/1500135"},{"categoryName":"Gas Boilers","url":"https://www.travisperkins.co.uk/c/1500285"},{"categoryName":"Gas Hoses & Fittings","url":"https://www.travisperkins.co.uk/c/1500335"},{"categoryName":"Gate Latches & Springs","url":"https://www.travisperkins.co.uk/c/1541020"},{"categoryName":"Gates & Railings","url":"https://www.travisperkins.co.uk/c/1500111"},{"categoryName":"Gazebos & Canopies","url":"https://www.travisperkins.co.uk/c/1516000"},{"categoryName":"General Purpose Sealants","url":"https://www.travisperkins.co.uk/c/1500266"},{"categoryName":"Geotextiles & Landscaping Fabrics","url":"https://www.travisperkins.co.uk/c/1500059"},{"categoryName":"Glazing & Frame Sealants","url":"https://www.travisperkins.co.uk/c/1500268"},{"categoryName":"Glazing Bars & Accessories","url":"https://www.travisperkins.co.uk/c/1511019"},{"categoryName":"Glazing Sheets","url":"https://www.travisperkins.co.uk/c/1521001"},{"categoryName":"Gloss Paints","url":"https://www.travisperkins.co.uk/c/1500556"},{"categoryName":"Gloves","url":"https://www.travisperkins.co.uk/c/1500459"},{"categoryName":"Grass & Accessories","url":"https://www.travisperkins.co.uk/c/1530000"},{"categoryName":"Gravel Boards","url":"https://www.travisperkins.co.uk/c/1500101"},{"categoryName":"Green Roofs","url":"https://www.travisperkins.co.uk/c/1518008"},{"categoryName":"Greenhouses","url":"https://www.travisperkins.co.uk/c/1513000"},{"categoryName":"Grills & Vents","url":"https://www.travisperkins.co.uk/c/1500360"},{"categoryName":"Grinding & Cutting","url":"https://www.travisperkins.co.uk/c/1500495"},{"categoryName":"Guttering","url":"https://www.travisperkins.co.uk/c/1500083"},{"categoryName":"Guttering Accessories","url":"https://www.travisperkins.co.uk/c/1511023"},{"categoryName":"Hammers & Mallets","url":"https://www.travisperkins.co.uk/c/1500504"},{"categoryName":"Hand Saws, Saw Blades & Mitres","url":"https://www.travisperkins.co.uk/c/1500502"},{"categoryName":"Hand Tools","url":"https://www.travisperkins.co.uk/c/1500499"},{"categoryName":"Handles & Knobs","url":"https://www.travisperkins.co.uk/c/1539007"},{"categoryName":"Harnesses","url":"https://www.travisperkins.co.uk/c/1510000"},{"categoryName":"Hasp & Staples","url":"https://www.travisperkins.co.uk/c/1541021"},{"categoryName":"Hats & Helmets","url":"https://www.travisperkins.co.uk/c/1500463"},{"categoryName":"Heat Pump Accessories","url":"https://www.travisperkins.co.uk/c/1517005"},{"categoryName":"Heat Pumps","url":"https://www.travisperkins.co.uk/c/1505005"},{"categoryName":"Heated Towel Rails & Elements","url":"https://www.travisperkins.co.uk/c/1500300"},{"categoryName":"Heaters","url":"https://www.travisperkins.co.uk/c/1502006"},{"categoryName":"Heating Controls","url":"https://www.travisperkins.co.uk/c/1500288"},{"categoryName":"Heating Programmers & Timers","url":"https://www.travisperkins.co.uk/c/1500290"},{"categoryName":"Heating Pumps","url":"https://www.travisperkins.co.uk/c/1500292"},{"categoryName":"Heating Valves","url":"https://www.travisperkins.co.uk/c/1500293"},{"categoryName":"High Strength Adhesives","url":"https://www.travisperkins.co.uk/c/1500276"},{"categoryName":"High Visibility Clothing","url":"https://www.travisperkins.co.uk/c/1500464"},{"categoryName":"Hinges","url":"https://www.travisperkins.co.uk/c/1541002"},{"categoryName":"Hole Saws & Arbours","url":"https://www.travisperkins.co.uk/c/1500489"},{"categoryName":"Home Fuels","url":"https://www.travisperkins.co.uk/c/1555002"},{"categoryName":"Hooks","url":"https://www.travisperkins.co.uk/c/1540002"},{"categoryName":"Hop Up and Step Ladders","url":"https://www.travisperkins.co.uk/c/1500534"},{"categoryName":"Hose pipes & Accessories","url":"https://www.travisperkins.co.uk/c/1500139"},{"categoryName":"HSS Drill Bits","url":"https://www.travisperkins.co.uk/c/1500485"},{"categoryName":"Impact Drivers & Wrenches","url":"https://www.travisperkins.co.uk/c/1534001"},{"categoryName":"Insulation","url":"https://www.travisperkins.co.uk/c/1500212"},{"categoryName":"Insulation & Plasterboard","url":"https://www.travisperkins.co.uk/c/1500211"},{"categoryName":"Insulation Tapes & Fixings","url":"https://www.travisperkins.co.uk/c/1500219"},{"categoryName":"Interior Lighting","url":"https://www.travisperkins.co.uk/c/1500593"},{"categoryName":"Internal Bi-Fold Doors","url":"https://www.travisperkins.co.uk/c/1505000"},{"categoryName":"Internal Doors","url":"https://www.travisperkins.co.uk/c/1500153"},{"categoryName":"Internal Fire Doors","url":"https://www.travisperkins.co.uk/c/1500166"},{"categoryName":"Internal Flush Doors","url":"https://www.travisperkins.co.uk/c/1500157"},{"categoryName":"Internal Hardwood Doors","url":"https://www.travisperkins.co.uk/c/1500156"},{"categoryName":"Internal Moulded Doors","url":"https://www.travisperkins.co.uk/c/1500154"},{"categoryName":"Internal Shower Spares","url":"https://www.travisperkins.co.uk/c/1545007"},{"categoryName":"Internal Softwood Doors","url":"https://www.travisperkins.co.uk/c/1500155"},{"categoryName":"Intumescent Sealants","url":"https://www.travisperkins.co.uk/c/1541009"},{"categoryName":"Intumescent Seals","url":"https://www.travisperkins.co.uk/c/1541010"},{"categoryName":"Ironmongery & Security","url":"https://www.travisperkins.co.uk/c/1500168"},{"categoryName":"Jackets","url":"https://www.travisperkins.co.uk/c/1500453"},{"categoryName":"Janitorial","url":"https://www.travisperkins.co.uk/c/1500566"},{"categoryName":"Jointing Compounds","url":"https://www.travisperkins.co.uk/c/1529003"},{"categoryName":"Jointing Compounds & Adhesives","url":"https://www.travisperkins.co.uk/c/1500129"},{"categoryName":"Joist Hangers","url":"https://www.travisperkins.co.uk/c/1500092"},{"categoryName":"Junction & Pattress Boxes","url":"https://www.travisperkins.co.uk/c/1500587"},{"categoryName":"Junction Boxes","url":"https://www.travisperkins.co.uk/c/1500588"},{"categoryName":"Key Safes","url":"https://www.travisperkins.co.uk/c/1541017"},{"categoryName":"Keylite Roof Windows & Flashings","url":"https://www.travisperkins.co.uk/c/1554000"},{"categoryName":"Kitchen Appliances","url":"https://www.travisperkins.co.uk/c/1509007"},{"categoryName":"Kitchen Ranges","url":"https://www.travisperkins.co.uk/c/1509006"},{"categoryName":"Kitchen Sink Wastes & Traps","url":"https://www.travisperkins.co.uk/c/1500342"},{"categoryName":"Kitchen Sinks","url":"https://www.travisperkins.co.uk/c/1500349"},{"categoryName":"Kitchen Sinks & Taps","url":"https://www.travisperkins.co.uk/c/1500348"},{"categoryName":"Kitchen Taps","url":"https://www.travisperkins.co.uk/c/1500350"},{"categoryName":"Kitchens","url":"https://www.travisperkins.co.uk/c/1509005"},{"categoryName":"Kits & Twin Packs","url":"https://www.travisperkins.co.uk/c/1500474"},{"categoryName":"Knee Protection","url":"https://www.travisperkins.co.uk/c/1500465"},{"categoryName":"Knives & Blades","url":"https://www.travisperkins.co.uk/c/1500503"},{"categoryName":"Laminate & Real Wood Flooring","url":"https://www.travisperkins.co.uk/c/1500188"},{"categoryName":"Laminate Flooring","url":"https://www.travisperkins.co.uk/c/1500191"},{"categoryName":"Landscaping","url":"https://www.travisperkins.co.uk/c/1500098"},{"categoryName":"Landscaping & Demolition","url":"https://www.travisperkins.co.uk/c/1500518"},{"categoryName":"Landscaping Fabrics","url":"https://www.travisperkins.co.uk/c/1546000"},{"categoryName":"Lead & Accessories","url":"https://www.travisperkins.co.uk/c/1511003"},{"categoryName":"Light Bulbs & Accessories","url":"https://www.travisperkins.co.uk/c/1500597"},{"categoryName":"Lighting","url":"https://www.travisperkins.co.uk/c/1500592"},{"categoryName":"Lintels","url":"https://www.travisperkins.co.uk/c/1500068"},{"categoryName":"Loft & Roof Insulation","url":"https://www.travisperkins.co.uk/c/1500215"},{"categoryName":"Log Cabins","url":"https://www.travisperkins.co.uk/c/1513005"},{"categoryName":"Log Cabins & Summerhouses","url":"https://www.travisperkins.co.uk/c/1513003"},{"categoryName":"Loose Feather Edge Fencing","url":"https://www.travisperkins.co.uk/c/1500065"},{"categoryName":"Lost Head Nails","url":"https://www.travisperkins.co.uk/c/1500255"},{"categoryName":"Macerators","url":"https://www.travisperkins.co.uk/c/1500390"},{"categoryName":"Magnetic Filters","url":"https://www.travisperkins.co.uk/c/1502004"},{"categoryName":"Manhole Covers & Frames","url":"https://www.travisperkins.co.uk/c/1500061"},{"categoryName":"Masking Tapes","url":"https://www.travisperkins.co.uk/c/1500540"},{"categoryName":"Masonry Screws","url":"https://www.travisperkins.co.uk/c/1521000"},{"categoryName":"MDF","url":"https://www.travisperkins.co.uk/c/1500009"},{"categoryName":"MDF Architrave","url":"https://www.travisperkins.co.uk/c/1500021"},{"categoryName":"MDF Skirting Board","url":"https://www.travisperkins.co.uk/c/1500019"},{"categoryName":"MDF Windowboards","url":"https://www.travisperkins.co.uk/c/1533001"},{"categoryName":"MDPE Fittings","url":"https://www.travisperkins.co.uk/c/1500333"},{"categoryName":"MDPE Pipe","url":"https://www.travisperkins.co.uk/c/1500325"},{"categoryName":"Measuring & Marking","url":"https://www.travisperkins.co.uk/c/1500501"},{"categoryName":"Melamine Board","url":"https://www.travisperkins.co.uk/c/1515000"},{"categoryName":"Met Posts","url":"https://www.travisperkins.co.uk/c/1500105"},{"categoryName":"Metal Gates & Railings","url":"https://www.travisperkins.co.uk/c/1552000"},{"categoryName":"Metal Stud Partitioning","url":"https://www.travisperkins.co.uk/c/1500225"},{"categoryName":"Meter Boxes","url":"https://www.travisperkins.co.uk/c/1500063"},{"categoryName":"Mixer Showers","url":"https://www.travisperkins.co.uk/c/1500415"},{"categoryName":"Mobility Grab Rails","url":"https://www.travisperkins.co.uk/c/1500448"},{"categoryName":"Mops & Buckets","url":"https://www.travisperkins.co.uk/c/1500568"},{"categoryName":"Mortice Locks","url":"https://www.travisperkins.co.uk/c/1541006"},{"categoryName":"Multi Material Drill Bits","url":"https://www.travisperkins.co.uk/c/1545002"},{"categoryName":"Multi Tools","url":"https://www.travisperkins.co.uk/c/1534003"},{"categoryName":"Multi Tools Accessories","url":"https://www.travisperkins.co.uk/c/1535002"},{"categoryName":"Nail Gun Accessories","url":"https://www.travisperkins.co.uk/c/1535007"},{"categoryName":"Nail Guns","url":"https://www.travisperkins.co.uk/c/1500609"},{"categoryName":"Nails","url":"https://www.travisperkins.co.uk/c/1500251"},{"categoryName":"Natural Insulation","url":"https://www.travisperkins.co.uk/c/1501003"},{"categoryName":"Natural Slate Roof Tiles","url":"https://www.travisperkins.co.uk/c/1500075"},{"categoryName":"Natural Stone Paving","url":"https://www.travisperkins.co.uk/c/1500124"},{"categoryName":"Natural Stone Paving Patio Packs","url":"https://www.travisperkins.co.uk/c/1502021"},{"categoryName":"Night Latches","url":"https://www.travisperkins.co.uk/c/1541007"},{"categoryName":"Nuts","url":"https://www.travisperkins.co.uk/c/1500248"},{"categoryName":"Nuts, Bolts & Washers","url":"https://www.travisperkins.co.uk/c/1500247"},{"categoryName":"Oakmont","url":"https://www.travisperkins.co.uk/c/1509009"},{"categoryName":"Ohio","url":"https://www.travisperkins.co.uk/c/1509010"},{"categoryName":"Oil Fired Boilers","url":"https://www.travisperkins.co.uk/c/1502007"},{"categoryName":"Oil Tanks & Fittings","url":"https://www.travisperkins.co.uk/c/1500354"},{"categoryName":"Orlando","url":"https://www.travisperkins.co.uk/c/1509011"},{"categoryName":"OSB","url":"https://www.travisperkins.co.uk/c/1500010"},{"categoryName":"Oval Nails","url":"https://www.travisperkins.co.uk/c/1500257"},{"categoryName":"Packers & Wedges","url":"https://www.travisperkins.co.uk/c/1500263"},{"categoryName":"Pad & Tower Bolts","url":"https://www.travisperkins.co.uk/c/1541022"},{"categoryName":"Padlocks","url":"https://www.travisperkins.co.uk/c/1541018"},{"categoryName":"Padlocks, Chains & Accessories","url":"https://www.travisperkins.co.uk/c/1541003"},{"categoryName":"Padstones","url":"https://www.travisperkins.co.uk/c/1500071"},{"categoryName":"Paint","url":"https://www.travisperkins.co.uk/c/1500552"},{"categoryName":"Paint Brushes","url":"https://www.travisperkins.co.uk/c/1500547"},{"categoryName":"Paint Rollers","url":"https://www.travisperkins.co.uk/c/1500548"},{"categoryName":"Pan Connectors","url":"https://www.travisperkins.co.uk/c/1500347"},{"categoryName":"Panel Pin Nails","url":"https://www.travisperkins.co.uk/c/1500258"},{"categoryName":"Panic Hardware","url":"https://www.travisperkins.co.uk/c/1539009"},{"categoryName":"Patio Project Packs","url":"https://www.travisperkins.co.uk/c/1500122"},{"categoryName":"Patios & Walling","url":"https://www.travisperkins.co.uk/c/1500121"},{"categoryName":"Patress Boxes","url":"https://www.travisperkins.co.uk/c/1500590"},{"categoryName":"Paving","url":"https://www.travisperkins.co.uk/c/1500123"},{"categoryName":"Paving, Drive & Wall Treatments","url":"https://www.travisperkins.co.uk/c/1500151"},{"categoryName":"Pedestals","url":"https://www.travisperkins.co.uk/c/1500410"},{"categoryName":"Percussion Drill Bits","url":"https://www.travisperkins.co.uk/c/1500483"},{"categoryName":"Permeable Block Paving","url":"https://www.travisperkins.co.uk/c/1500119"},{"categoryName":"Personal Protective Equipment","url":"https://www.travisperkins.co.uk/c/1500458"},{"categoryName":"Pick Axes & Mattocks","url":"https://www.travisperkins.co.uk/c/1500522"},{"categoryName":"Pipe & Tube","url":"https://www.travisperkins.co.uk/c/1500322"},{"categoryName":"Pipe Insulation","url":"https://www.travisperkins.co.uk/c/1500217"},{"categoryName":"Pitched Roof Accessories","url":"https://www.travisperkins.co.uk/c/1511002"},{"categoryName":"Pitched Roofing","url":"https://www.travisperkins.co.uk/c/1511000"},{"categoryName":"Planed Hardwood Timber","url":"https://www.travisperkins.co.uk/c/1528000"},{"categoryName":"Planed Softwood Timber","url":"https://www.travisperkins.co.uk/c/1500015"},{"categoryName":"Planed Timber","url":"https://www.travisperkins.co.uk/c/1500014"},{"categoryName":"Planers","url":"https://www.travisperkins.co.uk/c/1535000"},{"categoryName":"Plaster","url":"https://www.travisperkins.co.uk/c/1500223"},{"categoryName":"Plaster & Plasterboards","url":"https://www.travisperkins.co.uk/c/1500220"},{"categoryName":"Plasterboard Screws & Fixings","url":"https://www.travisperkins.co.uk/c/1500227"},{"categoryName":"Plastering Fillers","url":"https://www.travisperkins.co.uk/c/1500229"},{"categoryName":"Plastering Tapes & Adhesives","url":"https://www.travisperkins.co.uk/c/1500228"},{"categoryName":"Plastic Drainage","url":"https://www.travisperkins.co.uk/c/1500056"},{"categoryName":"Plastic Pushfit Pipe","url":"https://www.travisperkins.co.uk/c/1500324"},{"categoryName":"Plate Compactors","url":"https://www.travisperkins.co.uk/c/1539000"},{"categoryName":"Pliers","url":"https://www.travisperkins.co.uk/c/1500506"},{"categoryName":"Plumbing & Heating","url":"https://www.travisperkins.co.uk/c/1500282"},{"categoryName":"Plumbing Accessories","url":"https://www.travisperkins.co.uk/c/1500363"},{"categoryName":"Plumbing Consumables","url":"https://www.travisperkins.co.uk/c/1500365"},{"categoryName":"Plumbing Fittings","url":"https://www.travisperkins.co.uk/c/1500327"},{"categoryName":"Plumbing Hand Tools","url":"https://www.travisperkins.co.uk/c/1500367"},{"categoryName":"Plumbing Power Tools","url":"https://www.travisperkins.co.uk/c/1500369"},{"categoryName":"Plumbing Tools","url":"https://www.travisperkins.co.uk/c/1500366"},{"categoryName":"Plumbing Wastes & Traps","url":"https://www.travisperkins.co.uk/c/1500337"},{"categoryName":"Plywood","url":"https://www.travisperkins.co.uk/c/1500008"},{"categoryName":"Podiums & Working Platforms","url":"https://www.travisperkins.co.uk/c/1500536"},{"categoryName":"Polycarbonate & Glazing Sheets","url":"https://www.travisperkins.co.uk/c/1500082"},{"categoryName":"Polycarbonate Sheets.","url":"https://www.travisperkins.co.uk/c/1511018"},{"categoryName":"Post Hole Diggers & Post Drivers","url":"https://www.travisperkins.co.uk/c/1500523"},{"categoryName":"Power Saws","url":"https://www.travisperkins.co.uk/c/1500475"},{"categoryName":"Power Showers","url":"https://www.travisperkins.co.uk/c/1545004"},{"categoryName":"Power Tool Accessories","url":"https://www.travisperkins.co.uk/c/1500481"},{"categoryName":"Power Tools","url":"https://www.travisperkins.co.uk/c/1500471"},{"categoryName":"Pressure Washers","url":"https://www.travisperkins.co.uk/c/1545000"},{"categoryName":"Product","url":"https://www.travisperkins.co.uk/c/1000000"},{"categoryName":"Pushfit Fittings","url":"https://www.travisperkins.co.uk/c/1500331"},{"categoryName":"Putty","url":"https://www.travisperkins.co.uk/c/1500271"},{"categoryName":"PVA","url":"https://www.travisperkins.co.uk/c/1500274"},{"categoryName":"PVC Guttering","url":"https://www.travisperkins.co.uk/c/1511022"},{"categoryName":"Radiator Valves","url":"https://www.travisperkins.co.uk/c/1500299"},{"categoryName":"Radiators","url":"https://www.travisperkins.co.uk/c/1502024"},{"categoryName":"Radios","url":"https://www.travisperkins.co.uk/c/1502016"},{"categoryName":"Rain Suits","url":"https://www.travisperkins.co.uk/c/1502015"},{"categoryName":"Rainwater Harvesting Solutions","url":"https://www.travisperkins.co.uk/c/1518002"},{"categoryName":"Ready Mixed Concrete & Mortar","url":"https://www.travisperkins.co.uk/c/1500046"},{"categoryName":"Render","url":"https://www.travisperkins.co.uk/c/1500041"},{"categoryName":"Renewable Energy Solutions","url":"https://www.travisperkins.co.uk/c/1505003"},{"categoryName":"Respirators & Dust Masks","url":"https://www.travisperkins.co.uk/c/1500462"},{"categoryName":"Rim Locks","url":"https://www.travisperkins.co.uk/c/1541008"},{"categoryName":"Roller Trays & Kits","url":"https://www.travisperkins.co.uk/c/1500549"},{"categoryName":"Roof Fixings","url":"https://www.travisperkins.co.uk/c/1511010"},{"categoryName":"Roof Sheets","url":"https://www.travisperkins.co.uk/c/1511016"},{"categoryName":"Roof Tile Vents","url":"https://www.travisperkins.co.uk/c/1511007"},{"categoryName":"Roof Tiles & Slates","url":"https://www.travisperkins.co.uk/c/1500073"},{"categoryName":"Roofing","url":"https://www.travisperkins.co.uk/c/1500072"},{"categoryName":"Roofing Battern","url":"https://www.travisperkins.co.uk/c/1525000"},{"categoryName":"Roundwire Nails","url":"https://www.travisperkins.co.uk/c/1500259"},{"categoryName":"Routing","url":"https://www.travisperkins.co.uk/c/1534004"},{"categoryName":"Sanders","url":"https://www.travisperkins.co.uk/c/1500476"},{"categoryName":"Sanding & Abrasives","url":"https://www.travisperkins.co.uk/c/1500541"},{"categoryName":"Sash Window Hardware","url":"https://www.travisperkins.co.uk/c/1548005"},{"categoryName":"Sawn Timber","url":"https://www.travisperkins.co.uk/c/1500001"},{"categoryName":"Scaffold Boards","url":"https://www.travisperkins.co.uk/c/1500006"},{"categoryName":"Scale Inhibitors","url":"https://www.travisperkins.co.uk/c/1500356"},{"categoryName":"Screeding & Floor Levelling Compound","url":"https://www.travisperkins.co.uk/c/1503001"},{"categoryName":"Screw Caps & Washers","url":"https://www.travisperkins.co.uk/c/1500245"},{"categoryName":"Screwdriver Bits","url":"https://www.travisperkins.co.uk/c/1535001"},{"categoryName":"Screwdrivers & Hex Keys","url":"https://www.travisperkins.co.uk/c/1500505"},{"categoryName":"Screws","url":"https://www.travisperkins.co.uk/c/1500238"},{"categoryName":"SDS Drill Bits","url":"https://www.travisperkins.co.uk/c/1500484"},{"categoryName":"Sealant Guns","url":"https://www.travisperkins.co.uk/c/1500272"},{"categoryName":"Sealants","url":"https://www.travisperkins.co.uk/c/1500265"},{"categoryName":"Self Adhesive Felt","url":"https://www.travisperkins.co.uk/c/1511012"},{"categoryName":"Self Tapping Screws","url":"https://www.travisperkins.co.uk/c/1500244"},{"categoryName":"Shed & Gate Ironmongery","url":"https://www.travisperkins.co.uk/c/1541004"},{"categoryName":"Sheet Material","url":"https://www.travisperkins.co.uk/c/1500007"},{"categoryName":"Shelving","url":"https://www.travisperkins.co.uk/c/1548002"},{"categoryName":"Shingles","url":"https://www.travisperkins.co.uk/c/1511004"},{"categoryName":"Shovels, Spades & Rakes","url":"https://www.travisperkins.co.uk/c/1500519"},{"categoryName":"Shower Accessories","url":"https://www.travisperkins.co.uk/c/1500416"},{"categoryName":"Shower Curtains & Rails","url":"https://www.travisperkins.co.uk/c/1545008"},{"categoryName":"Shower Enclosures & Screens","url":"https://www.travisperkins.co.uk/c/1500419"},{"categoryName":"Shower Heads & Hoses","url":"https://www.travisperkins.co.uk/c/1545006"},{"categoryName":"Shower Kits & Riser Rails","url":"https://www.travisperkins.co.uk/c/1545005"},{"categoryName":"Shower Panels & Accessories","url":"https://www.travisperkins.co.uk/c/1545009"},{"categoryName":"Shower Pumps","url":"https://www.travisperkins.co.uk/c/1500417"},{"categoryName":"Shower Trays","url":"https://www.travisperkins.co.uk/c/1500420"},{"categoryName":"Shower Trays & Enclosures","url":"https://www.travisperkins.co.uk/c/1500418"},{"categoryName":"Shower Valves","url":"https://www.travisperkins.co.uk/c/1545003"},{"categoryName":"Shower Wastes & Traps","url":"https://www.travisperkins.co.uk/c/1500340"},{"categoryName":"Showers","url":"https://www.travisperkins.co.uk/c/1500412"},{"categoryName":"Single Ply Membrane","url":"https://www.travisperkins.co.uk/c/1522000"},{"categoryName":"Single Radiators","url":"https://www.travisperkins.co.uk/c/1509001"},{"categoryName":"Site Barrier Fencing","url":"https://www.travisperkins.co.uk/c/1500469"},{"categoryName":"Site Barrier Warning Tapes","url":"https://www.travisperkins.co.uk/c/1500470"},{"categoryName":"Site Equipment","url":"https://www.travisperkins.co.uk/c/1500467"},{"categoryName":"Site Pegs","url":"https://www.travisperkins.co.uk/c/1525001"},{"categoryName":"Site Power & Lighting","url":"https://www.travisperkins.co.uk/c/1500598"},{"categoryName":"Skirting Board & Architrave","url":"https://www.travisperkins.co.uk/c/1500017"},{"categoryName":"Slabs & Kerbs","url":"https://www.travisperkins.co.uk/c/1500066"},{"categoryName":"Sledge & Club Hammers","url":"https://www.travisperkins.co.uk/c/1500520"},{"categoryName":"Smart Heating Controls","url":"https://www.travisperkins.co.uk/c/1555000"},{"categoryName":"Smoke & Fire Alarms","url":"https://www.travisperkins.co.uk/c/1500606"},{"categoryName":"Sockets & Spanners","url":"https://www.travisperkins.co.uk/c/1535005"},{"categoryName":"Soil Compost & Bark","url":"https://www.travisperkins.co.uk/c/1500140"},{"categoryName":"Soil Pipe","url":"https://www.travisperkins.co.uk/c/1500345"},{"categoryName":"Soil Pipe Fittings","url":"https://www.travisperkins.co.uk/c/1500346"},{"categoryName":"Solar Accessories","url":"https://www.travisperkins.co.uk/c/1517003"},{"categoryName":"Solar Solutions","url":"https://www.travisperkins.co.uk/c/1505004"},{"categoryName":"Solar Thermal","url":"https://www.travisperkins.co.uk/c/1518000"},{"categoryName":"Solder Ring Fittings","url":"https://www.travisperkins.co.uk/c/1500330"},{"categoryName":"Soldering Tools","url":"https://www.travisperkins.co.uk/c/1500368"},{"categoryName":"Solders & Fluxes","url":"https://www.travisperkins.co.uk/c/1500364"},{"categoryName":"Solid Wood Flooring","url":"https://www.travisperkins.co.uk/c/1500189"},{"categoryName":"Special Shaped Bricks","url":"https://www.travisperkins.co.uk/c/1500033"},{"categoryName":"Specialist Paints","url":"https://www.travisperkins.co.uk/c/1502017"},{"categoryName":"Specialist Panels","url":"https://www.travisperkins.co.uk/c/1500013"},{"categoryName":"Specialist Plasterboard","url":"https://www.travisperkins.co.uk/c/1500222"},{"categoryName":"Spirit Levels","url":"https://www.travisperkins.co.uk/c/1500500"},{"categoryName":"Square Twist Nails","url":"https://www.travisperkins.co.uk/c/1500260"},{"categoryName":"Stair Accessories","url":"https://www.travisperkins.co.uk/c/1500207"},{"categoryName":"Stair Flights","url":"https://www.travisperkins.co.uk/c/1500202"},{"categoryName":"Stair Parts","url":"https://www.travisperkins.co.uk/c/1500203"},{"categoryName":"Stairs","url":"https://www.travisperkins.co.uk/c/1500201"},{"categoryName":"Standard Plasterboard","url":"https://www.travisperkins.co.uk/c/1500221"},{"categoryName":"Staples","url":"https://www.travisperkins.co.uk/c/1500261"},{"categoryName":"Steel Lintels","url":"https://www.travisperkins.co.uk/c/1500070"},{"categoryName":"Steel Reinforcement","url":"https://www.travisperkins.co.uk/c/1500060"},{"categoryName":"Strap & Piano Hinges","url":"https://www.travisperkins.co.uk/c/1541013"},{"categoryName":"Summerhouses","url":"https://www.travisperkins.co.uk/c/1513006"},{"categoryName":"Surface Drainage","url":"https://www.travisperkins.co.uk/c/1500058"},{"categoryName":"Suspended Ceiling Frames & Fixings","url":"https://www.travisperkins.co.uk/c/1500231"},{"categoryName":"Switches & Sockets","url":"https://www.travisperkins.co.uk/c/1500581"},{"categoryName":"T-Shirts & Sweatshirts","url":"https://www.travisperkins.co.uk/c/1500454"},{"categoryName":"Tarpaulins & Rubble Sacks","url":"https://www.travisperkins.co.uk/c/1501000"},{"categoryName":"Tee Hinges","url":"https://www.travisperkins.co.uk/c/1541014"},{"categoryName":"Thermal Insulated Plasterboard","url":"https://www.travisperkins.co.uk/c/1500005"},{"categoryName":"Thermostats","url":"https://www.travisperkins.co.uk/c/1500291"},{"categoryName":"Tile & Glass Bits","url":"https://www.travisperkins.co.uk/c/1500488"},{"categoryName":"Tile Adhesives & Grouts","url":"https://www.travisperkins.co.uk/c/1500280"},{"categoryName":"Tile Backing Boards","url":"https://www.travisperkins.co.uk/c/1500424"},{"categoryName":"Tiling","url":"https://www.travisperkins.co.uk/c/1500560"},{"categoryName":"Tiling Tools & Accessories","url":"https://www.travisperkins.co.uk/c/1500563"},{"categoryName":"Timber","url":"https://www.travisperkins.co.uk/c/1500000"},{"categoryName":"Timber Architrave","url":"https://www.travisperkins.co.uk/c/1500020"},{"categoryName":"Timber Cladding","url":"https://www.travisperkins.co.uk/c/1501001"},{"categoryName":"Timber Decking","url":"https://www.travisperkins.co.uk/c/1500108"},{"categoryName":"Timber Drive Screws","url":"https://www.travisperkins.co.uk/c/1500240"},{"categoryName":"Timber Fence Posts","url":"https://www.travisperkins.co.uk/c/1500104"},{"categoryName":"Timber Gates","url":"https://www.travisperkins.co.uk/c/1500112"},{"categoryName":"Timber Mouldings & Window Boards","url":"https://www.travisperkins.co.uk/c/1500022"},{"categoryName":"Timber Skirting Board","url":"https://www.travisperkins.co.uk/c/1500018"},{"categoryName":"Timber Sleepers","url":"https://www.travisperkins.co.uk/c/1500128"},{"categoryName":"Timber Windowboards","url":"https://www.travisperkins.co.uk/c/1533002"},{"categoryName":"Timber Windows","url":"https://www.travisperkins.co.uk/c/1546002"},{"categoryName":"Toilet Cisterns","url":"https://www.travisperkins.co.uk/c/1500387"},{"categoryName":"Toilet Fixtures & Fittings","url":"https://www.travisperkins.co.uk/c/1500392"},{"categoryName":"Toilet Pans","url":"https://www.travisperkins.co.uk/c/1500388"},{"categoryName":"Toilet Seats","url":"https://www.travisperkins.co.uk/c/1500389"},{"categoryName":"Toilets","url":"https://www.travisperkins.co.uk/c/1500381"},{"categoryName":"Tongue & Grooved Flooring Chip Board","url":"https://www.travisperkins.co.uk/c/1500028"},{"categoryName":"Tool Bags & Tool Belts","url":"https://www.travisperkins.co.uk/c/1500529"},{"categoryName":"Tool Boxes","url":"https://www.travisperkins.co.uk/c/1500528"},{"categoryName":"Tool Organisers","url":"https://www.travisperkins.co.uk/c/1500530"},{"categoryName":"Tools & Workwear","url":"https://www.travisperkins.co.uk/c/1500450"},{"categoryName":"Tools Storage & Workbenches","url":"https://www.travisperkins.co.uk/c/1500527"},{"categoryName":"Torch On Felt","url":"https://www.travisperkins.co.uk/c/1511011"},{"categoryName":"Torches","url":"https://www.travisperkins.co.uk/c/1500599"},{"categoryName":"Traditional Felt","url":"https://www.travisperkins.co.uk/c/1511013"},{"categoryName":"Treated Timber","url":"https://www.travisperkins.co.uk/c/1500002"},{"categoryName":"Trousers & Shorts","url":"https://www.travisperkins.co.uk/c/1500455"},{"categoryName":"Trowels, Hawks & Floats","url":"https://www.travisperkins.co.uk/c/1500510"},{"categoryName":"Turf","url":"https://www.travisperkins.co.uk/c/1537000"},{"categoryName":"Twin Slot Shelving","url":"https://www.travisperkins.co.uk/c/1549000"},{"categoryName":"Undercoat & Primers","url":"https://www.travisperkins.co.uk/c/1500553"},{"categoryName":"Underfloor Heating","url":"https://www.travisperkins.co.uk/c/1500301"},{"categoryName":"Underfloor Heating","url":"https://www.travisperkins.co.uk/c/1517002"},{"categoryName":"Underground Ducting","url":"https://www.travisperkins.co.uk/c/1500064"},{"categoryName":"Untreated Timber","url":"https://www.travisperkins.co.uk/c/1500003"},{"categoryName":"Unvented Cylinders","url":"https://www.travisperkins.co.uk/c/1500307"},{"categoryName":"UPVC Doors","url":"https://www.travisperkins.co.uk/c/1547000"},{"categoryName":"UPVC Fascia & Soffit","url":"https://www.travisperkins.co.uk/c/1511021"},{"categoryName":"UPVC Windows","url":"https://www.travisperkins.co.uk/c/1546001"},{"categoryName":"Utilities & Services","url":"https://www.travisperkins.co.uk/c/1500062"},{"categoryName":"Van Vault","url":"https://www.travisperkins.co.uk/c/1509000"},{"categoryName":"Vanity Basins","url":"https://www.travisperkins.co.uk/c/1500408"},{"categoryName":"VELUX Centre Pivot Roof Windows","url":"https://www.travisperkins.co.uk/c/1511005"},{"categoryName":"VELUX Conservation Roof Windows","url":"https://www.travisperkins.co.uk/c/1553005"},{"categoryName":"VELUX Fixings & Installation Products","url":"https://www.travisperkins.co.uk/c/1553004"},{"categoryName":"VELUX Flat Roof Windows & Sun Tunnels","url":"https://www.travisperkins.co.uk/c/1553002"},{"categoryName":"VELUX Integra Roof Windows","url":"https://www.travisperkins.co.uk/c/1553001"},{"categoryName":"VELUX Roof Flashings","url":"https://www.travisperkins.co.uk/c/1520003"},{"categoryName":"VELUX Roof Windows & Flashings","url":"https://www.travisperkins.co.uk/c/1520002"},{"categoryName":"VELUX Smoke Ventilation Systems","url":"https://www.travisperkins.co.uk/c/1553003"},{"categoryName":"VELUX Top Hung Roof Windows","url":"https://www.travisperkins.co.uk/c/1553000"},{"categoryName":"Vented Cylinders","url":"https://www.travisperkins.co.uk/c/1500306"},{"categoryName":"Wall & Frame Ties","url":"https://www.travisperkins.co.uk/c/1500094"},{"categoryName":"Wall Paper & Accessories","url":"https://www.travisperkins.co.uk/c/1500564"},{"categoryName":"Wall Papering Tools","url":"https://www.travisperkins.co.uk/c/1500551"},{"categoryName":"Wall Plugs & Plasterboard Fixings","url":"https://www.travisperkins.co.uk/c/1500246"},{"categoryName":"Wall Starter Kits","url":"https://www.travisperkins.co.uk/c/1500096"},{"categoryName":"Wall Tiles","url":"https://www.travisperkins.co.uk/c/1500561"},{"categoryName":"Walling","url":"https://www.travisperkins.co.uk/c/1500126"},{"categoryName":"Washers","url":"https://www.travisperkins.co.uk/c/1500250"},{"categoryName":"Washing Machine Hoses & Fittings","url":"https://www.travisperkins.co.uk/c/1500343"},{"categoryName":"Waste Pipe","url":"https://www.travisperkins.co.uk/c/1500326"},{"categoryName":"Waste Pipe Fittings","url":"https://www.travisperkins.co.uk/c/1500332"},{"categoryName":"Waste Pump Kits","url":"https://www.travisperkins.co.uk/c/1500358"},{"categoryName":"Water & Oil Storage","url":"https://www.travisperkins.co.uk/c/1500352"},{"categoryName":"Water Butts & Accessories","url":"https://www.travisperkins.co.uk/c/1500137"},{"categoryName":"Water Cylinders","url":"https://www.travisperkins.co.uk/c/1500305"},{"categoryName":"Water Harvesting","url":"https://www.travisperkins.co.uk/c/1517000"},{"categoryName":"Water Heaters","url":"https://www.travisperkins.co.uk/c/1500311"},{"categoryName":"Water Management","url":"https://www.travisperkins.co.uk/c/1500067"},{"categoryName":"Water Softeners","url":"https://www.travisperkins.co.uk/c/1500357"},{"categoryName":"Water Storage","url":"https://www.travisperkins.co.uk/c/1500136"},{"categoryName":"Water Systems","url":"https://www.travisperkins.co.uk/c/1518005"},{"categoryName":"Water Treatment","url":"https://www.travisperkins.co.uk/c/1500355"},{"categoryName":"Waterproofing","url":"https://www.travisperkins.co.uk/c/1529004"},{"categoryName":"Weather Seals","url":"https://www.travisperkins.co.uk/c/1548003"},{"categoryName":"Weatherboard","url":"https://www.travisperkins.co.uk/c/1511020"},{"categoryName":"Weed Killer","url":"https://www.travisperkins.co.uk/c/1500149"},{"categoryName":"Wet Rooms","url":"https://www.travisperkins.co.uk/c/1545010"},{"categoryName":"Wheel Barrows","url":"https://www.travisperkins.co.uk/c/1500525"},{"categoryName":"Window Accessories","url":"https://www.travisperkins.co.uk/c/1546003"},{"categoryName":"Window Boards","url":"https://www.travisperkins.co.uk/c/1500027"},{"categoryName":"Window Furniture & Hardware","url":"https://www.travisperkins.co.uk/c/1548001"},{"categoryName":"Window Locks & Security","url":"https://www.travisperkins.co.uk/c/1548006"},{"categoryName":"Windows","url":"https://www.travisperkins.co.uk/c/1500200"},{"categoryName":"Wood & Metal Paints","url":"https://www.travisperkins.co.uk/c/1500557"},{"categoryName":"Wood Dyes & Varnishes","url":"https://www.travisperkins.co.uk/c/1500559"},{"categoryName":"Wood Glue","url":"https://www.travisperkins.co.uk/c/1501002"},{"categoryName":"Wood Screws","url":"https://www.travisperkins.co.uk/c/1500239"},{"categoryName":"Woodcare","url":"https://www.travisperkins.co.uk/c/1501005"},{"categoryName":"Woodworking Tools","url":"https://www.travisperkins.co.uk/c/1500507"},{"categoryName":"Workbenches","url":"https://www.travisperkins.co.uk/c/1535006"},{"categoryName":"Worktop Accessories","url":"https://www.travisperkins.co.uk/c/1500210"},{"categoryName":"Worktops","url":"https://www.travisperkins.co.uk/c/1500209"},{"categoryName":"Worktops & Accessories","url":"https://www.travisperkins.co.uk/c/1502005"},{"categoryName":"Workwear & Safety","url":"https://www.travisperkins.co.uk/c/1500451"},{"categoryName":"Workwear Accessories","url":"https://www.travisperkins.co.uk/c/1500457"},{"categoryName":"Wrecking Bars","url":"https://www.travisperkins.co.uk/c/1501004"}];
		var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

		// Outer containers
		var $container = $('<div class="TP011_megamenu"></div>');
		var $quickLinks = $('<ul id="TP011_az-quick-links"></ul>');
		var $allGroups = $('<ul class="TP011_az-all-groups"></ul>');

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
			var $quickLink = $('<li class="TP011_az-quick-link" data-letter="' + letter + '">' + letter + '</li>');

			/* If no categories for this letter, add inactive class to quick link
			   and jump to next iteration */
			if (!letterCategories) {
				$quickLink
					.addClass('TP011_az-quick-link-inactive')
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
				'<li class="TP011_az-group">',
					'<div class="TP011_az-group-heading" data-letter="' + letter + '">' + letter + '</div>',
					'<ul class="TP011_az-group-link">' + linksHTML + '</ul>',
				'</li>'
			].join(''));
			
			$quickLink.on('click', function() {
				var letter = $(this).data('letter');
				var scrollPoint = $('.TP011_az-group-heading[data-letter="' + letter + '"]')[0].offsetTop - 80;
				if (!scrollPoint) return false;
	
				$allGroups.animate({
					scrollTop: scrollPoint
				}, 500);
			});

			// Split the links into 5 columns
			var $links = $letterGroup.find('.TP011_az-group-link > li');
			var columnsNum = 5;

			// Divide by number of columns to work out how many links go in each one
			var linksPerCol = Math.ceil($links.length / columnsNum);
			var columnGroups = [];
			var start = 0;
			for (var k = 0; k < columnsNum; k++) {
				var end = start + linksPerCol;
				
				// Slice the links into columns
				var $columnGroup = $links.slice(start, end);
				columnGroups.push($columnGroup);

				// Update the starting index for the next group
				start = end;
			}


			// Loop through each column group and wrap it in a column div
			for (var l = 0; l < columnGroups.length; l++) {
				var $group = columnGroups[l];
				$group.wrapAll('<div class="TP011_col"></div>');
			}


			// Append to outer containers
			$quickLink.appendTo($quickLinks);
			$letterGroup.appendTo($allGroups);
		}

		// Append to outer most HTML
		$container.append($quickLinks, $allGroups);

		return $container;
	};
<<<<<<< HEAD

	// Run experiment
	var activate = function() {
=======
              
      function eventTracking() {
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
  
  		$('#TP011_menu-listing a').on('click', function() {
                var label = '';
          if($(this).parents('ul:first').hasClass('TP011_level1')) {
                    label = 'level1';
                } else if($(this).parents('ul:first').hasClass('TP011_level2')) {
                    label = 'level2';
                } else if($(this).parents('ul:first').hasClass('TP011_level3')) {
                    label = 'level3';
                }

                sendEvent('TP011---Navigation-Desktop', 'Clicked-Menu-Link', label, true);
            });

            $('#TP011_az-listing .TP011_az-quick-link').on('click', function() {
                sendEvent('TP011---Navigation-Desktop', 'Clicked-AtoZ-Anchor-Link', '', true);
            });
            $('#TP011_az-listing a').on('click', function() {
                sendEvent('TP011---Navigation-Desktop', 'Clicked-AtoZ-Link', '', true);
            });
  		
	}

	// Run experiment
	var activate = function() {
            if($('.TP011_nav').length > 0) {
            	return false;  
            }     
      
>>>>>>> 06463924aa8a51367b9427208232ee11cd871996
		// Full Story Integration
		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'TP011',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });
		
		$('body').addClass('TP011');

		var data = extractData();
		var nav = data ? buildNav(data) : false;
		var AtoZNav = buildAtoZNav();

		// Hide old nav and insert new nav
		if (nav) {
			$('<div class="TP011_overlay"></div>').prependTo('body');
			$('#tp_nav_main').hide().before(nav);
		}

		if (AtoZNav) {
			nav.find('#TP011_az-listing').append(AtoZNav);
		}
<<<<<<< HEAD
=======


		/*search bar*/
		$('<div class="tp11-navSearch"><img src="http://sb.monetate.net/img/1/581/1146957.png"/><input id = "tp11-searchBox" type ="text" placeholder = "Search A-Z..."/></div>').appendTo(' #TP011_az-quick-links');

		
		$('#tp11-searchBox').keyup(function(){
			var valThis = $(this).val().toLowerCase();
			var noresult = 0;
			if(valThis === ""){
				$('.TP011_col > li').show();
				$('.TP011_col').show();

				noresult = 1;
				$('.no-results-found').remove();
			} else {
				$('.TP011_col > li').each(function(){
					var text = $(this).text().toLowerCase();
					var match = text.indexOf(valThis);
					if (match >= 0) {
						$(this).show();
						noresult = 1;
						$('.no-results-found').remove();

						var $parent = $(this).closest('.TP011_col');			

					} else {
						$(this).hide();
					}
				});
		   };
			if (noresult === 0) {
				if($('.no-results-found').length){
					$(".TP011_az-all-groups").append('<li class="no-results-found">No results found.</li>');
				}
			}else{
				$('.no-results-found').remove();
			}

            $('.TP011_az-group-link').each(function(){
				var li = $(this).find('li');
			  
					if($(this).find('li').is(':visible')){
						$(this).parent().find('.TP011_az-group-heading').show();
					}
					else{
						$(this).parent().find('.TP011_az-group-heading').hide();
					}
				
			});

			$('.TP011_col').each(function () {
				if ($(this).find('li').is(':visible')) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
			
			  
		});
      
        // Event tracking
      	  eventTracking();
>>>>>>> 06463924aa8a51367b9427208232ee11cd871996
	};

	// Triggers
	var _triggers = (function() {
		UC.poller([
			'#tp_nav_main'
		], activate);
	})();

})();