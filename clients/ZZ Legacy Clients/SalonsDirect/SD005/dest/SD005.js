var _SALUC005 = (function ($) {
    /**
     * UC Library - Poller
     * @version 0.2.1
     */
    var UC=function(a){var b=$||window.jQuery;return a.poller=function(a,c,d){var e={wait:50,multiplier:1.1,timeout:0},f=Date.now||function(){return(new Date).getTime()};if(d)for(var g in d)e[g]=d[g];else d=e;for(var h=!!e.timeout&&new Date(f()+e.timeout),i=e.wait,j=e.multiplier,k=[],m=function(d,e){if(h&&f()>h)return!1;e=e||i;var g=function(){var c,a=typeof d;return c="function"===a?d():"string"!==a||b(d).length}();g?(k.push(!0),k.length===a.length&&c()):setTimeout(function(){m(d,e*j)},e)},n=0;n<a.length;n++)m(a[n])},a}(UC||{});
    /**
     * Triggers
     */
    UC.poller([
		'.amshopby-filters-left',
		'.col-left.sidebar',
		'.toggle-content',
		function () {
            if (window.jQuery) return true;
		},
		function () {
            if (window.ga) return true;
		},
	], SALUC005, {
        timeout: 6000,
        multiplier: 0
    });
    /**
     * Variation code
     */
    function SALUC005() {
        var $ = window.jQuery;
        $('body').addClass('SALUC005');
        $('<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">').prependTo('.SALUC005');
        var topFiltersPos = 0;
        var stuck, openFilterText, closeFilterText, filterWasOpen, stickyFilter;
      
        function initAlterFilters() {
			console.log('Building filters');
            $('.amshopby-page-container').addClass('flag-as-modified');
            $('.col-left.sidebar.col-left-first').remove();
            $('.col-left.sidebar').attr('id', 'sticky-filter').addClass('sticky-filters');
            openFilterText = "<span class='filtertext'>Filter By</span>";
            closeFilterText = "<span class='filtertext'>Close filters</span>";
			stickyFilter = $('#sticky-filter');
            if ($('#filter-toggle').length == 0) {
                $('<button class="toggle-filters" id="filter-toggle"> ' + openFilterText + ' </button>').insertBefore('.amshopby-filters-left');
            }
            $('.body').removeClass('noscroll');
			console.log('filter state: ' + filterWasOpen);
            if (!filterWasOpen) {
                $('.SALUC005 .toggle-content').addClass('no-display');
                $('#filter-toggle').html(openFilterText);
            } else {
                // Put filters back into an open state
                $('body').addClass('noscroll');
                $('#sticky-filter, #filter-toggle').addClass('ns-active');
                $('#close-filters').removeClass('hidden');
                $('#filter-toggle').html(closeFilterText);
            }
            filterWasOpen = false;
            $('.SALUC005 .amshopby-filters-left').removeClass('filters-active');
            if ($('#close-filters').length == 0) {
                $('<button id="close-filters" class="close-filters-button hidden"> Apply Filters </button>').insertAfter('.SALUC005 .amshopby-filters-left');
            }
			var desc = $('.main > .mobile_cateogry_image:last');
            topFiltersPos = desc.offset().top + desc.height() + 25;
			$(function() {  
                setTimeout(function() {
                  topFiltersPos = desc.offset().top + desc.height() + 25;
                }, 2000);
            });
        }
      
        initAlterFilters();
        function stickyFilters() {
             var $body = $('body');
             var topPos = $(window).scrollTop();
             if (topPos >= topFiltersPos) {
                 if (!stickyFilter.hasClass('stuck')) {
					stickyFilter.addClass('stuck');
                 }
                 if (!$body.hasClass('push')) {
                   $body.addClass('push')
                 }
             } else {
                 if (stickyFilter.hasClass('stuck')) {
					stickyFilter.removeClass('stuck');
                 }
                 if ($body.hasClass('push')) {
                   $body.removeClass('push')
                 }
                 if ($body.hasClass('noscroll')) {
                    $body.removeClass('noscroll');
                 }
             }
         }
         $(window).scroll(stickyFilters);
		// Click handlers
        $(document).on('click', '#filter-toggle', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this);
            var shopby = $this.parent().find('.toggle-content');
            if ($this.hasClass('ns-active')) {
                $this.add('#sticky-filter').removeClass('ns-active');
                $('.SALUC005 #close-filters').addClass('hidden');
                $('.SALUC005').removeClass('noscroll');
                shopby.addClass('no-display');
                $this.html(openFilterText);
            } else {
                $this.add('#sticky-filter').addClass('ns-active');
                $('.SALUC005 #close-filters').removeClass('hidden');
                if ($('#sticky-filter').hasClass('stuck') && !$('body').hasClass('noscroll')) {
                    $('body').addClass('noscroll');
                }
                shopby.removeClass('no-display');
                $this.html(closeFilterText);
            }
        });
        $(document).on('click', '#close-filters', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var $this = $(this);
            $this.addClass('hidden');
            var shopby = $this.parents('.col-left.sidebar').find('.toggle-content');
            $('.toggle-filters, #sticky-filter').removeClass('ns-active');
            if ($('body').hasClass('noscroll')) {
                $('body').removeClass('noscroll');
            }
            shopby.addClass('no-display');
            $('.SALUC005 .toggle-filters').html(openFilterText);
            $('html, body').animate({
                scrollTop: $('#amshopby-page-container').offset().top - 50
            }, 500);
        });
        // Watch for mutations on the products container - rerun test if it changes
        /**
         * UC Library - Observer
         * @version 0.2.1
         */
        var UC=function(a){var b=$||window.jQuery;return a.observer={active:[],connect:function(a,b,c){var d={throttle:1000,config:{attributes:false,childList:true,subTree:false}};if(c)for(var e in c)d[e]=c[e];else c=d;for(var f,g=new MutationObserver(function(c){c.forEach(function(c){f||(f=!0,b(a,c),setTimeout(function(){f=!1},d.throttle))})}),h=0;h<a.length;h++)g.observe(a[h],d.config),this.active.push([a[h],g])},disconnect:function(a){for(var c=this.active,d=0;d<a.length;d++)for(var e=a[d],f=0;f<c.length;f++)e===c[f][0]&&c[f][1].disconnect()}},a}(UC||{});
        $(function () {
            UC.observer.connect($('.main .col-main'), function (element, mutation) {
				console.log('Page change detected');
                setTimeout(function () {
                    if (!element.find('#amshopby-page-container.flag-as-modified').length) {
						if ($('#sticky-filter').hasClass('ns-active')) {
							console.log('filter was open');
                        	filterWasOpen = true;
                        } else {
							console.log('filter was closed');
                        	filterWasOpen = false;
                        }
                        
                        initAlterFilters();
                    }
                }, 50);
            }, {
                config: {
                    attributes: false,
                    childList: true,
                    subtree: false
                }
            });
        });
    }
})(jQuery);