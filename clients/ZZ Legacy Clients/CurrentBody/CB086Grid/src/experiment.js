// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var CB086 = (function() {
	var JQ = window.jQuery,
		trackerName,
		slideQ = false;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'.grid-section-products .product-grid > li',
			function () {
				if (window.jQuery) {
					return true;
				}
			}
		], init);
	})();

	function init(){
		utils.fullStory('CB086', 'Variation 1');
		//utils.events.send('CB086', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
		//utils.events.send('CB086', 'Click', 'Show mobile clicked', true);

		var cacheDom = (function() {
			//Cache useful selectors for later use
			var bodyVar = JQ('body'),
				URL = window.location.pathname;

			bodyVar.addClass('CB086');

			var gridOuter = JQ('.grid-section-products');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				gridOuter: gridOuter,
				URL: URL
			};
		})();

		var gridContentFunc  = function () {
			function getRandomIntInclusive(min, max) {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
			//['banner6', 'http://www.sitegainer.com/fu/up/irenb8dc9yte4e2.png'],//MBG2

			if(cacheDom.URL.indexOf("clarisonic") > -1) {
				var banners = [
					['banner1', 'http://www.sitegainer.com/fu/up/qauy1sxzgzfg9qi.png'],//Clarisonnic
					['banner2', 'http://www.sitegainer.com/fu/up/0rany0tpcbj6p8g.png'],//Gen 1
					['banner3', 'http://www.sitegainer.com/fu/up/xjs3em5vngx34wq.png'],//Gen2
					['banner4', 'http://www.sitegainer.com/fu/up/0vogkjj255k02f3.png'],//Gen3
					['banner5', 'http://www.sitegainer.com/fu/up/o8dnzzrfv8xtqw4.png'],//MBG1
				];
			}
			else if(cacheDom.URL.indexOf("smoothskin") > -1){
				var banners = [
					['banner1', 'http://www.sitegainer.com/fu/up/0rany0tpcbj6p8g.png'],//Gen 1
					['banner2', 'http://www.sitegainer.com/fu/up/xjs3em5vngx34wq.png'],//Gen2
					['banner3', 'http://www.sitegainer.com/fu/up/0vogkjj255k02f3.png'],//Gen3
					['banner4', 'http://www.sitegainer.com/fu/up/o8dnzzrfv8xtqw4.png'],//MBG1
				];
			}
			else if(cacheDom.URL.indexOf("tria") > -1){
				var banners = [
					['banner1', 'http://www.sitegainer.com/fu/up/0rany0tpcbj6p8g.png'],//Gen 1
					['banner2', 'http://www.sitegainer.com/fu/up/xjs3em5vngx34wq.png'],//Gen2
					['banner3', 'http://www.sitegainer.com/fu/up/0vogkjj255k02f3.png'],//Gen3
					['banner4', 'http://www.sitegainer.com/fu/up/o8dnzzrfv8xtqw4.png'],//MBG1
				];
			}
			else if(cacheDom.URL.indexOf("nuface") > -1){
				var banners = [
					['banner1', 'http://www.sitegainer.com/fu/up/0rany0tpcbj6p8g.png'],//Gen 1
					['banner2', 'http://www.sitegainer.com/fu/up/xjs3em5vngx34wq.png'],//Gen2
					['banner3', 'http://www.sitegainer.com/fu/up/0vogkjj255k02f3.png'],//Gen3
					['banner4', 'http://www.sitegainer.com/fu/up/o8dnzzrfv8xtqw4.png'],//MBG1
				];
			}
			else{
				var banners = [
					['banner1', 'http://www.sitegainer.com/fu/up/0rany0tpcbj6p8g.png'],//Gen 1
					['banner2', 'http://www.sitegainer.com/fu/up/xjs3em5vngx34wq.png'],//Gen2
					['banner3', 'http://www.sitegainer.com/fu/up/0vogkjj255k02f3.png'],//Gen3
				];
			}

			var $products = JQ('.grid-section-products .product-grid > li');
			var productsPerBanner = 6;
			if($products.length < 6){
				productsPerBanner = $products.length;
			}
			var usedBanners = [];
			$products.each(function (i) {
				if ((i + 1) % productsPerBanner === 0) {
					var getBanner = function () {
						// Clear used banners array if all have been used
						if (usedBanners.length === banners.length) {
							usedBanners = [];
						}
						var rand = getRandomIntInclusive(0, banners.length - 1);
						var banner = banners[rand];

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
					var liClassStructure = $randomProduct.attr('class');

					var $hotspot = JQ([
						'<li class="' + liClassStructure + ' CB086_banner">',
							'<img src="' + bannerImage + '" name="' + bannerName + '"/>',
						'</li>'
					].join(''));

					$randomProduct.after($hotspot);
				}
			});
		}

		gridContentFunc();
	}	
})();