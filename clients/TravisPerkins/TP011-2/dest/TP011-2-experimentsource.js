var _TP011_2 = (function() {

	//--- Plugins and Helper Functions ---
	//UC Library - Poller * @version 0.2.2
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});


	/* MenuAim plugin to make the nav less "twitchy"
	   It gives the user more room for error when moving from the left hand nav
	   to a submenu. */
	!function(a){function b(b){var c=a(this),d=null,e=[],f=null,g=null,h=a.extend({rowSelector:"> li",submenuSelector:"*",submenuDirection:"right",tolerance:75,enter:a.noop,exit:a.noop,activate:a.noop,deactivate:a.noop,exitMenu:a.noop},b),i=3,j=300,k=function(a){e.push({x:a.pageX,y:a.pageY}),e.length>i&&e.shift()},l=function(){g&&clearTimeout(g),h.exitMenu(this)&&(d&&h.deactivate(d),d=null)},m=function(){g&&clearTimeout(g),h.enter(this),q(this)},n=function(){h.exit(this)},o=function(){p(this)},p=function(a){a!=d&&(d&&h.deactivate(d),h.activate(a),d=a)},q=function(a){var b=r();b?g=setTimeout(function(){q(a)},b):p(a)},r=function(){function o(a,b){return(b.y-a.y)/(b.x-a.x)}if(!d||!a(d).is(h.submenuSelector))return 0;var b=c.offset(),g={x:b.left,y:b.top-h.tolerance},i={x:b.left+c.outerWidth(),y:g.y},k={x:b.left,y:b.top+c.outerHeight()+h.tolerance},l={x:b.left+c.outerWidth(),y:k.y},m=e[e.length-1],n=e[0];if(!m)return 0;if(n||(n=m),n.x<b.left||n.x>l.x||n.y<b.top||n.y>l.y)return 0;if(f&&m.x==f.x&&m.y==f.y)return 0;var p=i,q=l;"left"==h.submenuDirection?(p=k,q=g):"below"==h.submenuDirection?(p=l,q=k):"above"==h.submenuDirection&&(p=g,q=i);var r=o(m,p),s=o(m,q),t=o(n,p),u=o(n,q);return r<t&&s>u?(f=m,j):(f=null,0)};c.mouseleave(l).find(h.rowSelector).mouseenter(m).mouseleave(n).click(o),a(document).mousemove(k)}a.fn.menuAim=function(a){return this.each(function(){b.call(this,a)}),this}}(jQuery);

	// Exclude hidden elements from selector
	$.fn.filterVisible = function() {
    	return this.filter(function() {
			return $(this).css('display') !== 'none';
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
				'<ul class="TP011_level1">',
				'</ul>',
			'</div>'
		].join(''));


		// Add TP011_open class to level 1 list items on hover
		var isTouchDevice = ('ontouchstart' in window || 'onmsgesturechange' in window);

		// Level 1
		var $level1 = $nav_HTML.find('.TP011_level1');

		$.each(data, function(i) {
			var level1 = this;
			var $html = $([
				'<li>',
					'<a href="' + level1.url + '">',
						'<span>',
							level1.title,
						'</span>',
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
							'<a href="' + level2.url + '">',
								level2.title,
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

						// Add message to the end of submenu
						$level3.append('<span class="TP011_menu-msg">We have over 20,000 products in over 2,000 product categories ready for delivery or collection in over 680 branches</span>');

						// Add level 3 container to level 2 list item
						$level3.appendTo($html);
					}

					// Add level 2 list item to level 2 container
					$html.appendTo($level2);
				});
				
				// Add level 2 container to level 1 list item
				$level2.appendTo($html);
			} else {
				$html.addClass('TP011_single-link');
			}

			// Add level 1 list item to level 1 container
			$html.appendTo($level1);

		});

		// Open submenus on hover over level 1 nav
		if (!isTouchDevice) {
			$level1.find('> li:not(".TP011_single-link")').on({
				mouseenter: function() {
					var $el = $(this),
						$overlay = $('.TP011_overlay');

					if (!$el.hasClass('TP011_open')) {
						$el.addClass('TP011_open');
					}
					if ($overlay.css('display') === 'none') {
						$overlay.show();
					}
					$overlay.css('z-index', '1001');
					$nav_HTML.css('z-index', '1002');
					// Set first submenu to active to avoid a blank megamenu
					$(this).find('.TP011_level2 > li.TP011_open').removeClass('TP011_open');
					$(this).find('.TP011_level2 > li:first').addClass('TP011_open');
				},
				mouseleave: function() {
					var $el = $(this),
						$overlay = $('.TP011_overlay');

					if ($el.hasClass('TP011_open')) {
						$el.removeClass('TP011_open');
					}
					if ($overlay.css('display') !== 'none') {
						$overlay.hide();
					}
					$overlay.css('z-index', '998');
					$nav_HTML.css('z-index', '999');
				}
			});

			$level1.find('.TP011_level2').menuAim({
				activate: function(row) {
					var $row = $(row);
					if (!$row.hasClass('TP011_open')) {
						$row.addClass('TP011_open');
					}
					if ($row.hasClass('TP011_single-link')) {
						$row.addClass('TP011_hide-subnav');
					}
				},  
				deactivate: function(row) {
					var $row = $(row);
					if ($row.hasClass('TP011_open')) {
						$row.removeClass('TP011_open');
					}
					if (!$row.hasClass('TP011_single-link')) {
						$row.removeClass('TP011_hide-subnav');
					}
				},
				rowSelector: '> li'
			});
		} else {
			// If touch device prevent level 1 nav from going to urls and just open subnav instead
			$level1.find('> li').on('touchstart', function(e) {
				e.preventDefault();
				e.stopPropagation();

				var $el = $(this);
				var url = $el.children('a').attr('href');
				var $overlay = $('.TP011_overlay');

				// If this link is already open, function like normal and
				// redirect to the url
				if ($el.hasClass('TP011_open') && url) {
					window.location.href = url;
				}

				// Remove any open classes
				$level1.find('> li.TP011_open').removeClass('TP011_open');

				// Add open class
				if (!$el.hasClass('TP011_open')) {
					$el.addClass('TP011_open');
				}

				// Show overlay
				if ($overlay.css('display') === 'none') {
					$overlay.show();
				}
				$overlay.css('z-index', '1001');
				$nav_HTML.css('z-index', '1002');

				// Set first submenu to active to avoid a blank megamenu
				$(this).find('.TP011_level2 > li.TP011_open').removeClass('TP011_open');
				$(this).find('.TP011_level2 > li:first').addClass('TP011_open TP011_show-link-indicator');

				if ($(this).hasClass('TP011_single-link')) {
					$(this).addClass('TP011_hide-subnav');
					// redirect to href url
					if (url) window.location.href = url;
				} else {
					$(this).removeClass('TP011_hide-subnav');
				}
			});

			// Prevent level 2 nav from going to urls and open subnav instead, unless second click
			var $level2 = $level1.find('.TP011_level2');
			if ($level2.length) {
				$level2.find('> li').on('touchstart', function(e) {
					e.preventDefault();
					e.stopPropagation();

					var $el = $(this);
					var url = $el.children('a').attr('href');

					// If this link is already open, function like normal and
					// redirect to the url
					if ($el.hasClass('TP011_open') && url) {
						window.location.href = url;
					}

					// Remove any open classes
					$level2.find('> li.TP011_open').removeClass('TP011_open TP011_show-link-indicator');

					// Add open class
					if (!$el.hasClass('TP011_open')) {
						$el.addClass('TP011_open');
						$el.addClass('TP011_show-link-indicator');
					}


				});
			}

			// Add link indicators to single-links
			$level1.find('.TP011_single-link').addClass('TP011_show-link-indicator');

			// Enable default click behaviour on submenu
			$nav_HTML.find('.TP011_level3 a').on('touchend', function() {
				$(this).css({'color': '#f6b112', 'text-decoration': 'underline'});
				var url = $(this).attr('href');
				if (url) window.location.href = url;
			});

			// Stop clicks on blank spaces from bubbling and triggering level 1 clicks
			$nav_HTML.find('.TP011_level3').on('touchstart', function(e) {
				e.stopPropagation();
			});
		}
		
		return $nav_HTML;
	};

	// Run experiment
	var activate = function() {
		$('body').addClass('TP011');

		var data = extractData();
		var nav = data ? buildNav(data) : false;

		// Hide old nav and insert new nav
		if (nav) {
			$('<div class="TP011_overlay"></div>').prependTo('body');
			$('#tp_nav_main').hide().before(nav);
		}
	};

	// Triggers
	var _triggers = (function() {
		UC.poller([
			'#tp_nav_main'
		], activate);
	})();

})();