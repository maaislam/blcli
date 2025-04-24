var _SD031 = (function () {
/*-------------------------------
Run test
---------------------------------*/

var UC=function(t){var e=e||window.jQuery;return t.poller=function(t,e,n){var r={wait:50,multiplier:1.1,timeout:0},i=Date.now||function(){return(new Date).getTime()};if(n)for(var o in n)r[o]=n[o];else n=r;for(var u=!!r.timeout&&new Date(i()+r.timeout),c=r.wait,a=r.multiplier,f=[],l=function(n,r){if(u&&i()>u)return!1;r=r||c,function(){var t=typeof n;return"function"===t?n():"string"!==t||document.querySelector(n)}()?(f.push(!0),f.length===t.length&&e()):setTimeout(function(){l(n,r*a)},r)},v=0;v<t.length;v++)l(t[v])},t.throttle=function(t,e){var n,r,i,o=null,u=0;Date.now;return function(){var c=c();u||(u=c);var a=e-(c-u);return n=this,r=arguments,(a<=0||a>e)&&(o&&(clearTimeout(o),o=null),u=c,i=t.apply(n,r),o||(n=r=null)),i}},t.observer={active:[],connect:function(t,e,n){var r={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(n)for(var i in n)r[i]=n[i];else n=r;for(var o,u=new MutationObserver(function(n){n.forEach(function(n){o||(o=!0,e(t,n),setTimeout(function(){o=!1},r.throttle))})}),c=0;c<t.length;c++)u.observe(t[c],r.config),this.active.push([t[c],u])},disconnect:function(t){for(var e=this.active,n=0;n<t.length;n++)for(var r=t[n],i=0;i<e.length;i++)r===e[i][0]&&e[i][1].disconnect()}},t}(UC||{});
	// Triggers
		UC.poller([
	'body',
	'.col-main',
	'.category-products .products-grid',
			function () {
				if (window.jQuery) return true;
			},
			function () {
				if (window.ga) return true;
			}
		], SD031, {
			timeout: 7000,
			multiplier: 0
	});
	function SD031() {
		var $ = window.jQuery;

		$('body').addClass('SD031');
		// Full Story Integration 
		UC.poller([
			function () {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'SD031',
				variation_str: 'Variation 1'
			});
		}, {
			multiplier: 1.2,
			timeout: 0
		});


		function testFunction() {

			function getRandomIntInclusive(min, max) {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}


			var sd31Banners = [
				['banner1', 'http://www.sitegainer.com/fu/up/ky48hq2wwcxmkef.jpg'],
				['banner2', 'http://www.sitegainer.com/fu/up/bb4ynylb61rkeko.jpg'],
				['banner3', 'http://www.sitegainer.com/fu/up/c4tnds42ehj7qkn.jpg'],
				['banner4', 'http://www.sitegainer.com/fu/up/02w3vrci8axe2em.jpg'],
				['banner5', 'http://www.sitegainer.com/fu/up/v2v9lzdpslc44wd.jpg'],
				['banner6', 'http://www.sitegainer.com/fu/up/if1h48qy48rggbl.jpg'],
			];

			var $products = $('.category-products .products-grid > li');
			var productsPerBanner = 6;
			var usedBanners = [];

			$products.each(function (i) {
				if ((i + 1) % productsPerBanner === 0) {
					var getBanner = function () {
						// Clear used banners array if all have been used
						if (usedBanners.length === sd31Banners.length) {
							usedBanners = [];
						}
						var rand = getRandomIntInclusive(0, sd31Banners.length - 1);
						var banner = sd31Banners[rand];

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
					var bannerName = banner[0];
					var bannerImage = banner[1];
					var start = (i + 1) - productsPerBanner;

					var $productGroup = $products.slice(start, i);
					var $randomProduct = $productGroup.eq(getRandomIntInclusive(0, $productGroup.length));

					var $hotspot = $([
						'<li class="sd31-banner">',
						'<img src="' + bannerImage + '" name="' + bannerName + '"/>',
						'</li>'
					].join(''));

					$randomProduct.after($hotspot);
				}
			});

		}

		testFunction();


		//if on next page click
		UC.observer.connect($('.col-main'), function () {
			testFunction();
		}, {
			config: {
				childList: true,
				attributes: false,
				subtree: false
			}
		});

	}
	})();