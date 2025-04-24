var _IT018 = (function () {
	// PLUGINS ------------------------------------
    // UC Library - Poller -- @version 0.2.2
    // ---------------------------------------------
    var UC=function(t){var e=e||window.jQuery;return t.poller=function(t,e,n){var r={wait:50,multiplier:1.1,timeout:0},i=Date.now||function(){return(new Date).getTime()};if(n)for(var o in n)r[o]=n[o];else n=r;for(var u=!!r.timeout&&new Date(i()+r.timeout),c=r.wait,a=r.multiplier,f=[],l=function(n,r){if(u&&i()>u)return!1;r=r||c,function(){var t=typeof n;return"function"===t?n():"string"!==t||document.querySelector(n)}()?(f.push(!0),f.length===t.length&&e()):setTimeout(function(){l(n,r*a)},r)},v=0;v<t.length;v++)l(t[v])},t.throttle=function(t,e){var n,r,i,o=null,u=0;Date.now;return function(){var c=c();u||(u=c);var a=e-(c-u);return n=this,r=arguments,(a<=0||a>e)&&(o&&(clearTimeout(o),o=null),u=c,i=t.apply(n,r),o||(n=r=null)),i}},t.observer={active:[],connect:function(t,e,n){var r={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(n)for(var i in n)r[i]=n[i];else n=r;for(var o,u=new MutationObserver(function(n){n.forEach(function(n){o||(o=!0,e(t,n),setTimeout(function(){o=!1},r.throttle))})}),c=0;c<t.length;c++)u.observe(t[c],r.config),this.active.push([t[c],u])},disconnect:function(t){for(var e=this.active,n=0;n<t.length;n++)for(var r=t[n],i=0;i<e.length;i++)r===e[i][0]&&e[i][1].disconnect()}},t}(UC||{});
	
	// Send GA Events With Tracker Name ------------
	// ---------------------------------------------
	function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;
				
	// -----------------------------------------------
	// Full story integration
	// -----------------------------------------------
	UC.poller([
		function() {
			var fs = window.FS;
			if (fs && fs.setUserVars) return true;
		}
	], function () {
		window.FS.setUserVars({
			experiment_str: 'IT018',
			variation_str: 'Variation 1'
		});
	}, { multiplier: 1.2, timeout: 0 });
	
	// Poll start
	UC.poller([
		'body',
		'.breadcrumbs',
		'.products-set .products-grid > li',
		function() {
			return !!window.jQuery;
		},
		function() {
			return !!window.ga;
		}
	], IT018);
	
	// Variation
	function IT018() {
		var $ = window.jQuery;

		$('body').addClass('IT018');

		 // -----------------------------------------------
        // Full story integration
        // -----------------------------------------------
		UC.poller([
			function () {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'IT018',
				variation_str: 'Variation 1'
			});
		}, {
			multiplier: 1.2,
			timeout: 0
		});

		

		 // -----------------------------------------------
		 // Add top quote to each collab page
		 // -----------------------------------------------

		 function topQuotes() {
		 	var URL = window.location.href;
		 	var topQuotebanner = $('<div class="it18-topBanner"/>');
		 	topQuotebanner.insertAfter('.breadcrumbs');

		 	if (URL.match(/.*(sarah)(\/)(sarah-clothing).*/)) {
		 		if (!$(topQuotebanner).hasClass('it18-sarahclothing')) {
		 			topQuotebanner.addClass('it18-sarah_clothing');
		 		}

		 	}
		 	if (URL.match(/.*(sarah)(\/)(sarah-swim-17).*/)) {
		 		if (!$(topQuotebanner).hasClass('it18-sarah_swimwear')) {
		 			topQuotebanner.addClass('it18-sarah_swimwear');
		 		}
		 	}
		 	if (URL.match(/.*(charlotte-crosby)(\/)(charlotte-clothing).*/)) {
		 		if (!$(topQuotebanner).hasClass('it18-charlotteclothing')) {
		 			topQuotebanner.addClass('it18-charlotteclothing');
		 		}
		 	}
		 	if (URL.match(/.*(charlotte-crosby)(\/)(charlotte-crosby-activewear).*/)) {
		 		if (!$(topQuotebanner).hasClass('it18-charlotteactive')) {
		 			topQuotebanner.addClass('it18-charlotteactive');
		 		}
		 	}
		 	if (URL.match(/.*(binky-felstead)(\/)(binky-clothing).*/)) {
		 		if (!$(topQuotebanner).hasClass('it18-binkyclothing')) {
		 			topQuotebanner.addClass('it18-binkyclothing');
		 		}
		 	}
		 	if (URL.match(/.*(billie-faiers)(\/)(billie-clothing).*/)) {
		 		if (!$(topQuotebanner).hasClass('it18-billieclothing')) {
		 			topQuotebanner.addClass('it18-billieclothing');
		 		}
		 	}
		 	if (URL.match(/.*(billie-faiers)(\/)(billie-swim-17).*/)) {
		 		if (!$(topQuotebanner).hasClass('it18-billie_swimwear')) {
		 			topQuotebanner.addClass('it18-billie_swimwear');
		 		}
		 	}
		 }

		 topQuotes();



		 // -----------------------------------------------
		 // Create in-grid content banners
		 // -----------------------------------------------

		 function inGridBanners() {
		 	var URL = window.location.href;
		 	var body = $('body');



		 	var sarahClothing = [
		 		['it18-sarahcloth1'],
		 		['it18-sarahcloth2'],
		 		['it18-sarahcloth3']
		 	]
		 	var sarahSwim = [
		 		['it18-sarahswim1'],
		 		['it18-sarahswim2'],
		 		['it18-sarahswim3']
		 	]
		 	var charlotteClothing = [
		 		['it18-charlottecloth1'],
		 		['it18-charlottecloth1'],
		 		['it18-charlottecloth3']
		 	]
		 	var charlotteActive = [
		 		['it18-charlotteactive1'],
		 		['it18-charlotteactive2'],
		 		['it18-charlotteactive3'],
		 	]
		 	var binkyClothing = [
		 		['it18-binkycloth1'],
		 		['it18-binkycloth2'],
		 		['it18-binkycloth3'],
		 	]
		 	var billieClothing = [
		 		['it18-billiecloth1'],
		 		['it18-billiecloth2'],
		 		['it18-billiecloth3'],
		 	]
		 	var billieSwim = [
		 		['it18-billieswim1'],
		 		['it18-billieswim2'],
		 		['it18-billieswim3'],
		 	]




		 	var collabBanner;

		 	if (URL.match(/.*(sarah)(\/)(sarah-clothing).*/)) {
		 		collabBanner = sarahClothing;
		 	}
		 	if (URL.match(/.*(sarah)(\/)(sarah-swim-17).*/)) {
		 		collabBanner = sarahSwim;
		 	}
		 	if (URL.match(/.*(charlotte-crosby)(\/)(charlotte-clothing).*/)) {
		 		collabBanner = charlotteClothing;
		 	}
		 	if (URL.match(/.*(charlotte-crosby)(\/)(charlotte-crosby-activewear).*/)) {
		 		collabBanner = charlotteActive;
		 	}
		 	if (URL.match(/.*(binky-felstead)(\/)(binky-clothing).*/)) {
		 		collabBanner = binkyClothing;
		 	}
		 	if (URL.match(/.*(billie-faiers)(\/)(billie-clothing).*/)) {
		 		collabBanner = billieClothing;
		 	}
		 	if (URL.match(/.*(billie-faiers)(\/)(billie-swim-17).*/)) {
		 		collabBanner = billieSwim;
		 	}

		 	function getRandomIntInclusive(min, max) {
		 		min = Math.ceil(min);
		 		max = Math.floor(max);
		 		return Math.floor(Math.random() * (max - min + 1)) + min;
		 	}

		 	var getProductsCount = function () {
		 		return $('.products-set .products-grid > li').length;
		 	};


		 	var productsPerBanner = (function () {
		 		var productsCount = getProductsCount();
		 		return productsCount >= 10 ? 10 : productsCount;
		 	})();

		 	var usedBanners = [];


		 	// Apply banners to a specific product group
		 	function applyBanners($products) {
		 		//var $products = $('.products-set .products-grid > li');

		 		$products.each(function (i) {
		 			// For every 10th product, get a random banner
		 			if ((i + 1) % productsPerBanner === 0) {
		 				var getBanner = function () {
		 					// Clear used banners array if all have been used
		 					if (usedBanners.length === collabBanner.length) {
		 						usedBanners = [];
		 					}
		 					var rand = getRandomIntInclusive(0, collabBanner.length - 1);
		 					var banner = collabBanner[rand];

		 					if (usedBanners.indexOf(banner) > -1) {
		 						// Banner has already been used, get a new one
		 						banner = getBanner();
		 					} else {
		 						// Add banner to used banners array
		 						usedBanners.push(banner);
		 					}

		 					return banner;
		 				};

		 				var banner = getBanner();
		 				var bannerPicture = banner[0];
		 				var start = (i + 1) - productsPerBanner;
		 				var $productGroup = $products.slice(start, i);
		 				var $randomProduct = $productGroup.eq(getRandomIntInclusive(0, $productGroup.length));

		 				var $hotspot = $([
		 					'<li class="it18-ingrid_banner ' + bannerPicture + '"></li>'
		 				].join(''));

		 				$randomProduct.after($hotspot);
		 			}

		 		});
		 	}

		 	var $products = $('.products-set .products-grid > li');
		 	applyBanners($products);


		 	var totalProductsCount = getProductsCount();
		 	highestPageNum = 1;

		 	jQuery(window).on('hashchange', function () {
		 		var hash = window.location.hash;
		 		var pageHash = window.location.hash.match(/isPage=(\d)+/);

		 		// If page change has exists
		 		if (pageHash) {
		 			// Get current page number
		 			var currentPageNum = parseInt(pageHash[1]);

		 			/* If the current page number is greater than any previous pages
		 			   New products have been added so apply banners to these */
		 			if (highestPageNum < currentPageNum) {
		 				// Update highest page number
		 				highestPageNum = currentPageNum;

		 				// Get new products group
		 				var newProductsCount = getProductsCount();
		 				$products = $('.products-set .products-grid > li');
		 				//var $newProducts = $products.slice(totalProductsCount, newProductsCount);

		 				// Start the products group from the index of the last inserted banner
		 				// to guarantee a banner after every 10 products
		 				var lastBannerIndex = $('.it18-ingrid_banner').last().index();
		 				var $newProducts = $products.slice(lastBannerIndex, newProductsCount);

		 				// Add banners to new products
		 				applyBanners($newProducts);

		 				// Update total products count
		 				totalProductsCount = newProductsCount;
		 			}

		 		} else {
		 			return;
		 		}
		 	});

		}

		inGridBanners();

	}
})();
