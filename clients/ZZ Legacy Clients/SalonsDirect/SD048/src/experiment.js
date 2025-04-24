/*------------------------------------------------
 IMPORTANT!!!!
 DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM

 Modify the source in the experiments repo
------------------------------------------------*/

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import scrapeMenuData from './lib/menuData';
import createSubmenu from './lib/createSubmenu';


var _SD048 = (function() {
	/*--------------------------------------
	EXPERIMENT CODE
	---------------------------------------*/
	var _activate = function() {
		var $ = window.jQuery;
		
		/* 
			Function to stick AZ selection on scroll. In outer scope 
			so function can be attached/removed in different modules
		*/
		var stickAZ; 
		

		/*
			Cache reusable elements
		*/
		var elements = (function() {
			var _elements = {};

			_elements.body = document.body;
			_elements.hamburger = document.querySelector('.skip-links .skip-link.skip-nav');
			_elements.oldMenu = document.getElementById('sticky_navigation');
			_elements.getHeader = function() { return document.getElementById('header'); };
			_elements.header = _elements.getHeader();
			_elements.getTopBar = function() { return document.querySelector('.header-language-background'); };

			return _elements;
		}());


		/*
			Namespace CSS
		*/
		elements.body.className += ' SD048';


		/*
			Retrieve menu data in JSON format
		*/
		var menuData = scrapeMenuData.init();


		/*
			Build menu structure
		*/
		var menu = (function() {
			/*
				Build elements
			*/
			var container = document.createElement('div');
			container.id = 'SD048_menu';
			container.innerHTML = '<nav><div id="SD048_nav-back"></div><div class="SD048_nav-container"></div></nav>';
			container.className = 'SD048_menu-list';

			var level0 = document.createElement('ul');
			level0.className = 'SD048_level SD048_level0';
			container.querySelector('.SD048_nav-container').appendChild(level0);

			/*
				Cache elements
			*/
			elements.level0 = level0;
			elements.back = container.querySelector('#SD048_nav-back');
			elements.menu = container;


			/*
				Populate with submenus
			*/
			var categoriesHtml = createSubmenu(menuData.categories);
			elements.level0.appendChild(categoriesHtml);

			var brandsHtml = createSubmenu(menuData.brands);
			elements.level0.appendChild(brandsHtml);
		}());


		/*
			DOM modifications
		*/
		var modifications = (function() {
			/*
				Add static links to nav
			*/
			$(elements.level0).append(`
				<li class="SD048_level0-link"><a href="/new-in">New In</a></li>
				<li class="SD048_level0-link"><a href="/offers">Offers</a></li>
				<li class="SD048_level0-link"><a href="/clearance">Clearance</a></li>
			`);			
		}());


		/*
			Position fixed menu based on header height
		*/
		var positionMenu = function() {
			var header = elements.getHeader();
			var topBar = elements.getTopBar();
			var slideLeftMenus = document.querySelectorAll('.SD048_level0-link > .SD048_menu-list, .SD048_level1-link > .SD048_menu-list');

			var height = header.clientHeight + (topBar ? topBar.clientHeight : 0) + 'px';	

			elements.menu.style.top = height;
			elements.stickyLinks.style.top = height;
			elements.back.style.top = height;

			for (var i = 0; i < slideLeftMenus.length; i++) {
				slideLeftMenus[i].style.top = height;
			}
		};


		/*
			A-Z section
		*/
		var az = (function() {
			var data = menuData.az.data;
			var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
		
			/*
				Outer containers
			*/
			var $level0 = $('<div id="SD048_az-nav" class="SD048_level SD048_level0"></div>');
			var $container = $('<div class="SD048_megamenu"></div>');
			var $quickLinks = $('<ul id="SD048_az-quick-links"></ul>');
			var $allGroups = $('<ul class="SD048_az-all-groups"></ul>');
			var quickLinksEventSent = false;
			var clickedAZLinkEventSent = false;

			/*
				Function to extract the categories that start with a certain letter
			*/
			var getCategories = function(letter) {
				var matchesLetter = [];

				for (var i = 0; i < data.length; i++) {
					var link = data[i];
					var linkName = link.name;
					var firstLetter = linkName.charAt(0).toUpperCase();

					if (firstLetter === letter) {
						matchesLetter.push(link);
					}
				}
				return matchesLetter.length ? matchesLetter : false;
			};

			/*
				Loop through every letter in the alphabet and segment into groups by letter
			*/
			var groupCategories = (function() {
				for (var i = 0; i < alphabet.length; i++) {
					var letter = alphabet[i];
					var letterCategories = getCategories(letter);
					var $quickLink = $('<li class="SD048_az-quick-link" data-letter="' + letter + '"><span>' + letter + '</span></li>');

					/* 
						If no categories for this letter, add inactive class to quick 
						link and jump to next iteration
					*/
					if (!letterCategories) {
						$quickLink
							.addClass('SD048_az-quick-link-inactive')
							.appendTo($quickLinks);
						continue;
					}

					/*
						Build the HTML for every inner link
					*/
					var linksHTML = '';
					for (var j = 0; j < letterCategories.length; j++) {
						var link = letterCategories[j];
						var linkName = link.name;
						var url = link.link;

						/*
							Add to the links HTML
						*/
						linksHTML += '<li><a href="' + url + '">' + linkName + '</a></li>';
					}

					/* 
						Build the outer container for the inner links and add functionality
						to the quick link to automatically scroll to that section 
					*/
					var $letterGroup = $([
						'<li class="SD048_az-group">',
							'<div class="SD048_az-group-heading" data-letter="' + letter + '">' + letter + '</div>',
							'<ul class="SD048_az-group-link">' + linksHTML + '</ul>',
						'</li>'
					].join(''));
					
					$quickLink.on('click', function() {
						if (!quickLinksEventSent) {
							utils.events.send('SD048', 'click', 'Clicked A-Z jump to letter');
							quickLinksEventSent = true;
						}

						var letter = $(this).data('letter');
						var scrollPoint = $('.SD048_az-group-heading[data-letter="' + letter + '"]')[0].offsetTop - 110;
						
						if (!scrollPoint) return false;

						$(elements.menu).animate({
							scrollTop: scrollPoint
						}, 500);
					});

					/*
						Append to outer containers
					*/
					$quickLink.appendTo($quickLinks);
					$letterGroup.appendTo($allGroups);
					$level0.append($quickLinks, $allGroups);
				}
			}());

			/*
				GA Events
			*/
			var gaEvents = (function() {
				$allGroups.find('li > a').on('click', function() {
					if (!clickedAZLinkEventSent) {
						utils.events.send('SD048', 'click', 'Clicked A-Z link');
						clickedAZLinkEventSent = true;
					}
				});
			}());

			/*
				Add context to A-Z menu
			*/
			var $context = (function() {
				var $element = $('<div class="SD048_level0-title">A to Z of all product categories</div>');
				
				$element.prependTo($level0);

				return $element;
			}());

			/*
				Back to top link
			*/
			var $backToTop = (function() {
				var $element = $('<div id="SD048_back-to-top">Back to top</div>');

				$element.on('click', function() {
					$(elements.menu).animate({scrollTop:'0'});
				});

				$level0.append($element);
				elements.$backToTop = $element;

				return $element;
			}());

			/*
				Create search bar
			*/
			var $searchBar = (function() {
				var $allLinks = $allGroups.find('.SD048_az-group-link > li');
				var $search = $('<div class="SD048_az-search"><img src="http://www.sitegainer.com/fu/up/2va87vpmkn32g0i.png"/><input id="SD048_az-search-input" type="text" placeholder="Search all categories"/></div>');
				var $noResults = $('<li class="SD048_no-results-found">No results found.</li>');
				
				$allGroups.prepend($search);
				$allGroups.append($noResults);
			
				var searchEventSent = false;
				$search.find('#SD048_az-search-input').keyup(function() {
					if (!searchEventSent) {
						utils.events.send('SD048', 'search', 'User used A-Z search');
						searchEventSent = true;
					}
					var $el = $(this);
					var val = $el.val().toLowerCase();
					var hasResults = false;
		
					// Show all results by default
					$allGroups.show();

					// If value is empty, show all results and hide error message
					// Else loop through each link and check if the text matches
					if (val === '') {
						$allLinks.show();
						hasResults = true;
						$noResults.hide();
					} else {
						$allLinks.each(function() {
							var $link = $(this);
							var text = $link.children('a').text().toLowerCase();
							var match = text.indexOf(val);

							if (match >= 0) {
								$link.show();
								hasResults = true;
							} else {
								$link.hide();
							}
						});
					}

					// Error message
					if (!hasResults) {
						$noResults.show();
					} else {
						$noResults.hide();
					}
		
					// Hide group heading if no results are visible
					$allGroups.find('.SD048_az-group-link').each(function() {
						var $el = $(this);
						var $li = $el.find('li');
						var allLinksHidden = $li.filter(function() {
							return this.style.display === 'none';
						}).length === $li.length;

						if (allLinksHidden) {
							$el.parent().hide();
						} else {
							$el.parent().show();
						}	
					});
				});

				return $search;
			}());

			/*
				Add to nav element
			*/
			$(elements.menu).find('.SD048_nav-container').append($level0);

			/*
				Add sticky A-Z quick links on scroll
			*/
			var $stickyLinks = $quickLinks.clone(true).attr('id', 'SD048_az-sticky-links');
			elements.stickyLinks = $stickyLinks[0];

			/*
				Replicate clicks on both quick links divs
			*/
			var linkQuickFilters = (function() {
				var $bothLinks = $stickyLinks.add($quickLinks);
				var activeClass = 'SD048_az-quick-link--active';
				$bothLinks.find('.SD048_az-quick-link').on('click', function() {
					var $el = $(this);
					var letter = $el.attr('data-letter');

					$bothLinks.find('.' + activeClass).removeClass(activeClass);
					$bothLinks.find('[data-letter="' + letter + '"]').addClass(activeClass);
				});

				$stickyLinks.insertAfter($quickLinks);
			}());

			/*
				Function to stick/unstick quick links on scroll
			*/
			var linksStuck = false;
			stickAZ = function() {
				var scrollTop = $(elements.menu).scrollTop();
				var waypoint = 500; 
				var pastWaypoint = scrollTop >= waypoint;
				
				if (!linksStuck && pastWaypoint) {
					$stickyLinks.stop(true, true).slideDown(400);
					linksStuck = true;
					$backToTop.stop().fadeIn();

				} else if (!pastWaypoint && linksStuck) {
					$stickyLinks.stop(true, true).slideUp(400);
					linksStuck = false;
					$backToTop.stop(true, true).fadeOut();

				}	
			};

		}());


		/*
			Attach events
		*/
		var attachEvents = (function() {
			var sentOpenEvent = false;

			/*
				Hamburger menu
			*/
			$(elements.hamburger).click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				var $menu = $(elements.menu);

				if ($menu.hasClass('SD048_locked')) return false;
				
				/*
					Lock menu to prevent errors from overclicking
				*/
				$menu.addClass('SD048_locked');

				/*
					Animate quick links also as they might have fixed positioning
				*/
				var $quickLinks = $menu.find('#SD048_az-quick-links');

				if ($menu.hasClass('SD048_menu--open')) {
					/*
						Slide out / Close nav
					*/
					if ($quickLinks.css('display') !== 'none') {
						$quickLinks.animate({
							left: '-100%',
							right: '100%'
						}, 350);
					}

					$menu.animate({
						left: '-100%',
						right: '100%'
					}, 350, function() {
						elements.menu.classList.remove('SD048_menu--open');
						elements.menu.removeAttribute('style');

						$quickLinks.removeAttr('style');
						$(elements.body).css('top', 'auto');
						$('html, body').removeClass('SD048_no-scroll');
						/*
							Remove Stick Quick Links scroll event
						*/
						$menu.off('scroll');

						$menu.removeClass('SD048_locked');

						/*
							Remove mutation observer from header
						*/
						UC.observer.disconnect($(elements.header));
					});

				} else {
					/*
						GA Event
					*/
					if (!sentOpenEvent) {
						utils.events.send('SD048', 'Click', 'User opened navigation');
						sentOpenEvent = true;
					}

					/*
						Reposition menu as header height may have changed on scroll
					*/
					positionMenu();

					elements.menu.classList.add('SD048_menu--open');

					/*
						Set 'top' CSS rule on body to be equal to scrollHeight
						This prevents the page from scrolling back to the top 
						when position: fixed is added to html and body tags
					*/
					var scrollTop = $(document).scrollTop();
					$(elements.body).css('top', scrollTop);

					$('html, body').addClass('SD048_no-scroll');
					$menu.on('scroll', stickAZ);
					$menu.removeClass('SD048_locked');

					/*
					 	Bug fix: Remove any scroll lock classes
					*/
					$menu.add($menu.find('.SD048_scroll-lock')).removeClass('SD048_scroll-lock');

					/*
						Connect mutation observer on header
						Reposition the nav when it is fixed/unfixed
					*/
					UC.observer.connect($(elements.header), function() {
						setTimeout(positionMenu, 300);
						setTimeout(positionMenu, 1000);
					}, {
						throttle: 1000,
						config: { attributes: true, childList: false, subtree: false }
					});
				}

				/*
					Reset nav back to main menu on state change
				*/
				var resetNav = (function() {
					var $back = $(elements.back);
					var $stickyLinks = $(elements.stickyLinks);
					var $backToTop = $(elements.$backToTop);

					$menu.find('.SD048_menu-list--open').removeClass('SD048_menu-list--open');
					$menu.find('.SD048_submenu-open').removeClass('SD048_submenu-open');
					$menu.find('.SD048_scroll-lock').removeClass('SD048_scroll-lock');
					elements.menu.scrollTop = 0;
					
					if ($back.css('display') !== 'none') {
						$back.hide().empty();
					}

					function hideElements() {
						if ($stickyLinks.css('display') !== 'none') {
							$stickyLinks.stop(true, true).hide();
						}

						if ($backToTop.css('display') !== 'none') {
							$backToTop.hide();
						}
					}

					hideElements();

					/*
						Bug fix - Check again after 600ms as the 400ms
						animation to slide down will force sticky links to be 
						visible if it was in progress when menu was closed
					*/
					setTimeout(hideElements, 600);

				}());
			});

			/*
				Close most recently opened menu
			*/
			function closeMenu(e) {
				var $menu = $(elements.menu);
				var $openMenus = $menu.find('.SD048_submenu-open');
				var $menusToClose = $openMenus.last();

				/*
				   If back button was clicked and a level 2 link is open,
				   close the next 2 menus to account for level 2 links being dropdowns
				*/ 
				var clickedBackButton = (function() {
					if (e && e.currentTarget && e.currentTarget.id) {
						return e.currentTarget.id === 'SD048_nav-back';
					} else {
						return false;
					}
				}());
				var isLevel2 = $menusToClose.hasClass('SD048_level2-link');
				
				if (clickedBackButton && isLevel2) {
					$menusToClose = $openMenus.eq($openMenus.length - 2).add($menusToClose);
				}
				
				$menusToClose.css('display', 'block');

				/*
					Slide out animation (not on dropdown menus)
				*/
				if (!isLevel2) {
					$menusToClose
					.not('.SD048_level2-link')
					.find('.SD048_menu-list:first')
					.animate({
						left: '100%',
						right: '-100%'
					}, 450, function() {
						this.style.left = '';
						this.style.right = '';
						$menusToClose.removeClass('SD048_submenu-open');
						$menusToClose.children('.SD048_menu-list').removeClass('SD048_menu-list--open');
					});
				} else {
					$menusToClose.removeClass('SD048_submenu-open');
					$menusToClose.children('.SD048_menu-list').removeClass('SD048_menu-list--open');
				}

				/* 
					If clicked close on level 2 link, do nothing else
					Else re-enable scroll on previous menu and change back button text
				*/
				if (!clickedBackButton && isLevel2) {
					return;
				} else {
					$menusToClose.closest('.SD048_menu-list').removeClass('SD048_scroll-lock');

					/* 
						If going back to a submenu update back button text
						Else going back to top level so hide the back button
					*/
					if ($openMenus.length > 1) {
						var text = $menusToClose.closest('.SD048_submenu-open').children('a').text().trim();
						$(elements.back).html('<span>' + text + '</span>');
					} else {
						$(elements.back).hide().empty();
					}
				}
			}

			/*
				Back button functionality
			*/
			$(elements.back).on('click', closeMenu);

			/*
				Submenus
			*/
			$(elements.menu).find('.SD048_level').each(function() {
				var $links = $(this).children('li');
				
				$links.each(function() {
					var link = this;
					var $link = $(link);
					var $a = $link.children('a:first');
					var $childMenu = $link.children('.SD048_menu-list');
					var childMenu = $childMenu[0];

					/* 
						Don't prevent scroll on level 2 links as they are dropdowns
						rather than slide-out menus
					*/
					var isLevel2 = link.classList.contains('SD048_level2-link');

					/*
						GA Event
						- Send event for clicks on Level 0 links
					*/
					var isLevel0 = link.classList.contains('SD048_level0-link');
					if (isLevel0) {
						var linkName = $link.children('a').text().trim();
						$a.one('click', function() {
							utils.events.send('SD048', 'Click', 'Clicked top level link - ' + linkName, {
								sendOnce: true
							});
						});
					}

					/*
						Open this menu
					*/
					function openMenu(text) {
						/*
							Add open states to menus
						*/
						link.classList.add('SD048_submenu-open');
						childMenu.classList.add('SD048_menu-list--open');


						/*
							If it's a slide-in menu (i.e. not a level 2 dropdown style menu)
							update the back button text and functionality
						*/
						if (!isLevel2) {
							var $back = $(elements.back);

							/*
								Extend text with new category if there is already text there
							*/
							var changeText = (function(){
								if (text) {
									var newText = (function() {
										if ($back.children('span').length) {
											return $back.children('span').text() + ' / ' + text;	
										} else {
											return text;	
										}
									}());

									$back.html('<span>' + newText + '</span>');
								}
							}());

							if ($back.css('display') === 'none') {
								$back.show();
							}
		
							$link.closest('.SD048_menu-list').addClass('SD048_scroll-lock');
						}
					}

					if ($childMenu.length) {
						link.classList.add('SD048_has-submenu');
						var text = $a.text().trim();
						
						$a.click(function(e) {
							e.preventDefault();
							e.stopPropagation();

							var menuIsOpen = link.classList.contains('SD048_submenu-open');

							if (menuIsOpen) {
								closeMenu();
							} else {
								setTimeout(function() {
									openMenu(text);
								}, 150);
							}
						});
					}

				});

			});

			/*
				If touch events are available, add a ripple effect 
				on touch (material design effect)
			*/
			var rippleEffect = (function() {
				if ('ontouchend' in window) {
					var dragging;

					/*
						Set dragging to false on every touchstart
					*/
					$(elements.menu).on('touchstart', function() {
						dragging = false;
					});
					
					/*
						If touchmove event is trigger, set dragging to true so 
						we can tell if a touchend event was triggered by a drag or a tap
					*/	
					$(elements.menu).on('touchmove', function() {
						dragging = true;
					});
				
					/*
						Apply ripple effect to every link in the menu
					*/
					$(elements.menu).find('.SD048_level > li > a').each(function(){
						var $el = $(this);
						var $li = $el.closest('li');
						var isLevel2Link = $li.hasClass('SD048_level2-link');
						var ink;
						var animationRunning;

						$el.on('touchend', function(e) {
							/* 
								If touch came from a drag or animation is currently running
								do nothing
							*/
							if (dragging || animationRunning) return false;
		
							/*
								'ink' is the span that will be animated as an expanding circle	
								if it doesn't already exist in this element, create one
							*/
							if (!ink) {
								ink = document.createElement('span');
								ink.className = 'SD048_ink';
								this.appendChild(ink);
							}
		
							/* 
								Stop all active animations
							*/
							var activeAnimations = elements.menu.querySelectorAll('.SD048_animate');
							for (var i = 0; i < activeAnimations.length; i++) {
								activeAnimations[i].classList.remove('SD048_animate');
							}
		
							/*
								For level 2 links (dropdown menus) - if the menu is already
								open, change the animation colour so it's different for 
								closing the menu
							*/
							if (isLevel2Link) {
								if ($li.hasClass('SD048_submenu-open')) {
									ink.classList.add('SD048_ink--white');
								} else if (ink.classList.contains('SD048_ink--white')) {
									ink.classList.remove('SD048_ink--white');
								}
							}
		
							/*
								Set dimensions on ink element to cover the maximum dimension
								of the parent element (whether that's height or width)
							*/
							if (!$(ink).height() && !$(ink).width()) {
								var d = Math.max($el.outerWidth(), $el.outerHeight());
								$(ink).css({ height: d, width: d });
							}
							
							/*
								Position the ink element to the location the user tapped
							*/
							var x = (event.changedTouches[0].pageX) - $el.offset().left - $(ink).width()/2;
							var y = (event.changedTouches[0].pageY) - $el.offset().top - $(ink).height()/2;
							$(ink).css({ top: y + 'px', left: x + 'px' }).addClass('SD048_animate');
						});

					});
				}
			}());

		}());


		/*
			Render new menu and hide old menu
		*/
		elements.oldMenu.parentElement.insertBefore(elements.menu, elements.oldMenu);
		elements.oldMenu.style.display = 'none';


		/* 
			Quick amend -
			Elements with fixed positioning moved outside scrollable divs due
			to jumping around during scroll (iOS - Safari)
		*/
		$(elements.menu).find('#SD048_az-sticky-links, #SD048_back-to-top').insertBefore(elements.menu);


		/*
			Reposition menu on doc ready when header has loaded in
 		*/
		$(function() {
			positionMenu();
		});
	};


	/*-------------------------------------- 
	ACTIVATION
	---------------------------------------*/
	var _triggers = function(options) {
		utils.fullStory('SD048', 'Variation 1');

		_activate();
	};


	/*
		Run experiment
	*/
	_triggers();

})();