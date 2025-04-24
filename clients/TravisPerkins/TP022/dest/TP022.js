var _TP022 = (function() {
<<<<<<< HEAD
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
				'<ul class="TP022_level1"></ul>',
			'</div>'
		].join(''));

		var $level1 = $nav_HTML.find('.TP022_level1');

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

			$html.appendTo($level1);
		});

		return $nav_HTML;
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
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });

		$('body').addClass('TP022');

		var data = extractData();
		var nav = data ? buildNav(data) : false;

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
							// Remove Back To Top scroll event
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
=======
    // PLUGINS + HELPERS
    // UC Library - Poller -- @version 0.2.2
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

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


    //--- Build nav ---
    var buildNav = function(data) {
        // Images for level 2 categories
        var getCategoryImage = function(category) {
            var src;

            switch (category) {
                case 'Decking':
                    src = 'http://icons.iconarchive.com/icons/icons8/windows-8/512/Business-Questions-icon.png';
                    break;
                default:
                    src = 'http://icons.iconarchive.com/icons/icons8/windows-8/512/Business-Questions-icon.png';
            };

            return src;
        }

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
                '<ul class="TP022_level1"></ul>',
            '</div>'
        ].join(''));

        var $level1 = $nav_HTML.find('.TP022_level1');

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
                // Prevent default and open a submenu instead
                $html.find('a').on('click', function(e) {
                    e.preventDefault();
                    $(this).closest('li').find('.TP022_level2-wrap').addClass('TP022_show');
                });

                // Close submenu and go back to Level 1
                $level2_HTML.find('.TP022_title').on('click', function() {
                    $(this).closest('li').find('.TP022_level2-wrap').removeClass('TP022_show');
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
                            $(this).closest('.TP022_level3-wrap').removeClass('TP022_show');
                        });

                        // Loop through level 3 items
                        $.each(level2.children, function() {
                            var level3 = this;
                            console.log('looping lvl 3 item: ' + level3.title);
                            $('<li>' + level3.title + '</li>').appendTo($level3_preview);
                            
                            var $html = $('<li><a href="' + level3.url + '">' + level3.title + '</a></li>');

                            $html.appendTo($level3);
                        });

                        $level3_preview.appendTo($html);
                        $level3_HTML.appendTo($html);
                    }

                    $html.appendTo($level2);
                });

                $level2_HTML.appendTo($html);

            } else {
                $html.addClass('TP022_single-link');
            }

            $html.appendTo($level1);
        });

        return $nav_HTML;
    };


    // EXPERIENCE
    var activate = function() {
console.log('activate');
        // Full Story Integration
        UC.poller([
            function() {
                var fs = window.FS;
                if (fs && fs.setUserVars) return true;
            }
        ], function () {
            window.FS.setUserVars({
                experiment_str: 'TP022',
                variation_str: 'Variation 1'
            });
        }, { multiplier: 1.2, timeout: 0 });

        $('body').addClass('TP022');

        var data = extractData();
        console.log(data);
        var nav = data ? buildNav(data) : false;

        if (nav) {
            // Replace old nav toggle with a new one
            $('#headerItem0')
                .empty()
                .append('<div class="inner"><h3>Menu</h3></div>')
                .on('click', function() {
                    nav.add('body').toggleClass('TP022_nav-open');
                });

            $('#slide_menu').hide().before(nav);
        }

    };

    // TRIGGERS
    var _triggers = (function() {
        UC.poller([
            '#slide_menu'
        ], activate);
    })();
    
})();
>>>>>>> 06463924aa8a51367b9427208232ee11cd871996
