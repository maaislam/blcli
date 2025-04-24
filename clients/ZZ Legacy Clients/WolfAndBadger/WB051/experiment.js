/* eslint-disable */
var _WB051 = (function () {
	
			var $ = window.jQuery;
	
			$('body').addClass('WB051');
			
			function testFunction() {
	
				function getRandomIntInclusive(min, max) {
					min = Math.ceil(min);
					max = Math.floor(max);
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}
	
	
				//CHANGE THESE FOR W&B - any category pages added, change ones with conditions
				var anyCategoryPages = [
					["Be the first to discover unique, independent designs you won't find just anywhere.", 'http://www.sitegainer.com/fu/up/ky48hq2wwcxmkef.jpg'],
					['Introducing our latest selection of new designers at Wolf & Badger.', 'http://www.sitegainer.com/fu/up/bb4ynylb61rkeko.jpg'],
					['Fear of missing out? Sign up for all the latest updates on designers, trends and events taking place in our stores >', 'http://www.sitegainer.com/fu/up/c4tnds42ehj7qkn.jpg'],
					["With new products added every day from our designers, there's so much more to be discovered...", 'http://www.sitegainer.com/fu/up/02w3vrci8axe2em.jpg'],
					["We've done the hard work for you, curating over 500 designers on our platform. There's so much to discover, start your journey here...", 'http://www.sitegainer.com/fu/up/v2v9lzdpslc44wd.jpg'],
					['banner6', 'http://www.sitegainer.com/fu/up/if1h48qy48rggbl.jpg'],
				];
	

				//if statements - wbbanners = matching array

				var window = window.universal_variable.page.type;

				var WB51Banners;
				if(window === 'category'){
					WB51Banners = anyCategoryPages;
				}
				var $products = $('.product-list-container .product-summary');
				var productsPerBanner = 6;
				var usedBanners = [];
	
				$products.each(function (i) {
					if ((i + 1) % productsPerBanner === 0) {
						var getBanner = function () {
							// Clear used banners array if all have been used
							if (usedBanners.length === WB51Banners.length) {
								usedBanners = [];
							}
							var rand = getRandomIntInclusive(0, sd31Banners.length - 1);
							var banner = WB51Banners[rand];
	
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
						var bannerText = banner[0];
						var bannerLink = banner[1];
						var start = (i + 1) - productsPerBanner;
	
						var $productGroup = $products.slice(start, i);
						var $randomProduct = $productGroup.eq(getRandomIntInclusive(0, $productGroup.length));
	
						var $textBanner = $([
							'<div class="wb51-ingrid-banner">',
								'<div class="wb51-bannerText">',
									'<p>'+bannerText+'</p>',
								'</div>',
								'<a href="'+bannerLink+'">link</a>',
							'</div>'
						].join(''));
	
						$randomProduct.after($textBanner);
					}
				});
	
			}
	
			testFunction();

	
		})();