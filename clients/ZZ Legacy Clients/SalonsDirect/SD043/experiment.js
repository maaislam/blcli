/* no_doc_ready */
 
var _SD043 = (function() {
	/* ------------------------------------
	   SD043 Infinite Scroll
	   Variation 1
	   Initial Build: 26-9-17 (UC-LN)
	   Last Modified: 09-1-18 (UC-RW)
	------------------------------------ */
	var id = 'SD043';
	
	var elements = {};

	var plugins = (function() {
        // UC Library - [Poller, Thottle, GA Module]
        // @version 0.3.4
            var UC={};
            UC.poller=function(t,e,n){var i={wait:50,multiplier:1.1,timeout:0},r=Date.now||function(){return(new Date).getTime()};if(n)for(var u in n)i[u]=n[u];else n=i;for(var o=!!i.timeout&&new Date(r()+i.timeout),f=i.wait,l=i.multiplier,a=[],c=function(n,i){if(o&&r()>o)return!1;i=i||f,function(){var t=typeof n;return"function"===t?n():"string"!==t||document.querySelector(n)}()?(a.push(!0),a.length===t.length&&e()):setTimeout(function(){c(n,i*l)},i)},m=0;m<t.length;m++)c(t[m])};
            
            UC.throttle=function(n,t){var e,r,u,l=null,a=0;return function(){var i=Date.now||function(){return(new Date).getTime()};i=i(),a||(a=i);var o=t-(i-a);return e=this,r=arguments,(o<=0||o>t)&&(l&&(clearTimeout(l),l=null),a=i,u=n.apply(e,r),l||(e=r=null)),u}};
            
            UC.observer={active:[],connect:function(t,e,n){var i={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(n)for(var o in n)i[o]=n[o];else n=i;for(var r,c=new MutationObserver(function(n){n.forEach(function(n){r||(r=!0,e(t,n),setTimeout(function(){r=!1},i.throttle))})}),f=0;f<t.length;f++)c.observe(t[f],i.config),this.active.push([t[f],c])},disconnect:function(t){for(var e=this.active,n=0;n<t.length;n++)for(var i=t[n],o=0;o<e.length;o++)i===e[o][0]&&e[o][1].disconnect()}};
            
            
            UC.GA = {
            trackerName: '',
            sendEvent: function(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};this.trackerName?c(this.trackerName):plugins.UC.poller([function(){return window.ga.getAll}],function(){this.trackerName=window.ga.getAll()[0].get("name"),c(this.trackerName)})},
			
			// Events
			sentLoadedFirstProducts: false,
			sendLoadedFirstProducts: function () {
				if (!this.sentLoadedFirstProducts) {
					this.sendEvent(id, 'Load', 'Loaded first set of products', true);
					this.sentLoadedFirstProducts = true;
				}
			},

			sendLoadedMoreProducts: function () {
				this.sendEvent(id, 'Load', 'Loaded products', true);
			},

			sendErrorLoadingProducts: function () {
				this.sendEvent(id, 'Load', 'Error loading products', true);
			},

			sentLoadedAllProducts: false,
			sendLoadedAllProducts: function () {
				if (!this.sentLoadedAllProducts) {
					this.sendEvent(id, 'Load', 'Loaded all sets of products', true);
					this.sentLoadedAllProducts = true;
				}
			},
		};

		// Send GA Events With Tracker Name
		function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;

		return {
			UC: UC,
			sendEvent: sendEvent
		};
	})();
	
	var experiment = (function() {
		// Namespace CSS
		elements.body.className += ' ' + id;

        // Fullstory Tagging
		plugins.UC.poller([function(){var t=window.FS;if(t&&t.setUserVars)return!0}],function(){window.FS.setUserVars({experiment_str:"SD043",variation_str:"Variation 1"})},{multiplier:1.2,timeout:0});

		var $ = window.jQuery;
		var $loader = (function() {
			var $loader = $('<div class="SD043_loader"><div class="sd43loader"/></div>');
			elements.$loader = $loader;
		//	$(elements.body).prepend($loader);
			return $loader;
		})();

		var initInfiniteScroll = function (options) {
			var container = options.container,
				item = options.item,
				pagination = options.pagination,
				next = options.next,
				isRunning = false;
				
			$(pagination).add('.pages > ol').css('visibility', 'hidden');
	
			function loadNextProducts() {
				if (isRunning) return false;
				isRunning = true;
	
				if ($(pagination).length && $(next).length) {
					var nextHref = $(next).attr('href');
					if (!nextHref) return false;

					$loader.show();
					$.ajax({
						url: nextHref,
						success: function (data) {
							$loader.hide();

							plugins.UC.GA.sendLoadedFirstProducts(); // Only sends once
							plugins.UC.GA.sendLoadedMoreProducts(); // Sends on each load

							var div = $('<div>');
							div.html(data);

							var itemsToAdd = div.find(container).find(item);
							var nextNew = div.find(next).attr('href');
							
							try {
								$(container).append(itemsToAdd);
								$(container).append($loader);
									
							}
							catch(err) {
							}

							if (nextNew) {
								$(next).attr('href', nextNew);
							} else {
								// Loaded all pages, remove scroll event
								plugins.UC.GA.sendLoadedAllProducts();
								$(pagination).hide();
								$(window).off('scroll', throttledInfiniteScroll);
							}


							/* There's an issue where the products don't have the correct
								names in the markup response. Rename all the new products based
								on the title attr then run the inline script which reduces
								the size of the name if it's too long. */   
							$.each(itemsToAdd, function() {
								var prodName = $(this).find('.product-name a');
								var title = prodName.attr('title');

								prodName.text(title);

								var renameScript = $(this).find('script:eq(0)');

								try {
									eval(renameScript.innerText);
								} catch(err) {
								}
							});


							isRunning = false;

						},
						error: function() {
							$loader.hide();
							plugins.UC.GA.sendErrorLoadingProducts();
						}
					});
					
				}
			}
			
			function infiniteScroll() {
				if (isRunning || !$(pagination).length) {
					return false;
				} else {
					var pOffsetTop = $(item).last().offset().top;

					if ($(window).scrollTop() + $(window).height() >= pOffsetTop) {
						loadNextProducts();
					}
				}
			}

			var throttledInfiniteScroll = plugins.UC.throttle(infiniteScroll, 1000);
			
			// TODO: Throttle this
			$(window).on('scroll', throttledInfiniteScroll);
		};
		
		
		//AMEND - list view/grid view container is different for each one so needs to check which one is showing
	    var containerView,
	        gridType,
    	    gridView = $('.category-products .pro-grid'),
    	    listView = $('.category-products .pro-list-view');
	   
        
	     if(listView.length > 0) {
	        containerView = $(listView);
	        gridType = '.category-products .pro-list-view:last';
	     }
	     if(gridView.length > 0){
	        containerView = $(gridView);
	        gridType = '.category-products .pro-grid:last';
	     }
	     
	     
	     $(gridType).append($loader);
		
		// Activate infinite scroll
		initInfiniteScroll({
	        //container: '.category-products .products-grid', 
		    container: gridType,
		    item: '.item',
			pagination: '.pages:last > ol',
			next: '.pages:last > ol .next'
		});

	});

	var triggers = (function() {
		plugins.UC.poller([
            '.category-products .item',
			'.pages > ol .next',
			function() {
				return !!window.jQuery;
			},
			function() {
				return !!window.ga;
			}
		], function() {
			// Prevent experiment from running multiple times on retrack
			(function() {
				var body = document.body;
				elements.body = body;

				if (body.classList) {
					if (body.classList.contains(id)) return false;
				} else {
					// IE9 and earlier
					var regex = new RegExp('\\b' + id + '\\b', 'g');					
					if (regex.test(body.className)) return false;
				}
			})();
                
        		// Run experiment changes
        			experiment();
        			
        			//if changing from grid to list view
        		  plugins.UC.observer.connect($('.col-main:first'),function(){
        		      
        			experiment(); 
        		}, {
        			config: { 
        				childList: true,
        				attributes: false,
        				subtree: false
        			}
        		});
        	});
	})();

})();
