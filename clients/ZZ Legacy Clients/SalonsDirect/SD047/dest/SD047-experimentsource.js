var _SD047 = (function () {
	
	// PLUGINS ------------------------------------
    // UC Library - Poller -- @version 0.2.2
    // ---------------------------------------------
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
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
						experiment_str: 'SD047',
						variation_str: 'Variation 1'
					});
				}, { multiplier: 1.2, timeout: 0 });
			
				// Poll start
				UC.poller([
					'body',
					'.container',
					'.header-minicart',
					function() {
						if (window.jQuery) return true;
					},
					function() {
						if (window.ga) return true;
					}
				], SD047, {
					timeout: 7000,
					multiplier: 'disable'
				});
					// Variation
					function SD047() {
	
				   var $ = window.jQuery;


					// Cookie Setter Helper Function.
					function setCookie(c_name,value,exdays,c_domain) {
						c_domain = (typeof c_domain === "undefined") ? "" : "domain=" + c_domain + ";";
						var exdate=new Date();
						exdate.setDate(exdate.getDate() + exdays);
						var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
						document.cookie=c_name + "=" + c_value + ";" + c_domain + "path=/";
					}

					// Cookie Getter Helper Function.
					function getCookie(name) {
						var match = document.cookie.match(name + '=([^;]*)');
						return match ? match[1] : undefined;
					}



					$('body').addClass('SD047');


					sendEvent('SD047', 'Page View', 'SD047 USP banner Page view', true);

					/*banner images*/
					var feefoStars = 'https://ab-test-sandbox.userconversion.com/experiments/SD047-feefo-star.png',
						feefoLogo = 'https://ab-test-sandbox.userconversion.com/experiments/SD047-feefologo.png';


					/*-------------------------------
					Create USP wrapper
					---------------------------------*/
					var uspWrapper = $('<div class="sd47-bannerwrap"/>');
					uspWrapper.prependTo('.top-cat-section:first .container');

					/*-------------------------------
					Banner messages
					---------------------------------*/

					/*banners*/
					var smallBanners = {
						landingPage: [{
							pageType: 'sd47-landing',
							bannerText: 'Welcome to the <span>biggest choice</span> of professional salon supplies with over <span>10,000 products</span> to choose from',
							link: 'javascript:void(0)'
						}],
						newUser: [{
							pageType: 'sd47-newuser',
							bannerText: "<img src='" + feefoLogo + "'/><span>Discover your competitor's secret.</span><img src='" + feefoStars + "'/> <p>Salons Direct is trusted by 15,000 UK salons - we save them all money.</p>",
							link: 'javascript:void(0)'
						}],
						returningUser: [{
							pageType: 'sd47-returnuser',
							bannerText: 'We bring exclusive, new products to the UK, including FRAMAR! <span>VISIT NEW IN >></span>',
							link: 'http://www.salonsdirect.com/new-in'

						}],
						categoryPage: [{
							pageType: 'sd47-categorypage',
							bannerText: "Unlike other suppliers, we'll never sell out of stock items, meaning <span>no delays to orders.</span>",
							link: 'javascript:void(0)'
						}],
						furniturePage: [{
							pageType: 'sd47-furniturepage',
							bannerText: "Your customers will love the comfort & style of Lotus furniture - <span>you'll love our prices.</span>",
							link: 'http://www.salonsdirect.com/brands/lotus'
						}],
						beautyandhaircolourPage: [{
							pageType: 'sd47-beautypage',
							bannerText: 'Save money on your essentials with Lotus; our exclusive own-brand, <span>affordable & loved by salons</span>',
							link: 'http://www.salonsdirect.com/brands/lotus-essentials'
						}],
						productPage: [{
							pageType: 'sd47-productpage',
							bannerText: '<img src="' + feefoLogo + '"/><span>Shop with confidence</span><img src="' + feefoStars + '"/><p> We have more positive reviews than other UK suppliers</p>',
							link: 'javascript:void(0)'
						}],
						haircatPage: [{
							pageType: 'sd47-hairpage',
							bannerText: 'Elchim electricals last longer because they work as hard you do. <span>Exclusive to Salons Direct</span>',
							link: 'http://www.salonsdirect.com/brands/elchim'
						}],
						lotusFurniturePage: [{
							pageType: 'sd47-lotusfurnpage',
							bannerText: 'Achieve the WOW factor without breaking the bank. <span>Lotus furniture is stylish & affordable</span>',
							link: 'javascript:void(0)'
						}],
						lotusProductPage: [{
							pageType: 'sd47-lotusproductpage',
							bannerText: 'Lotus products produce <span>amazing results at the lowest prices</span> - contact our team for help or advice',
							link: 'javascript:void(0)'
						}],
						customerservicePage: [{
							pageType: 'sd47-customerspage',
							bannerText: 'Our goal is happy customers. As a family-led team, <span>we care about your business too!</span>',
							link: 'javascript:void(0)'
						}],
						afterAddtoBagPage: [{
							pageType: 'sd47-addedpage',
							bannerText: 'Simply spend £30 & we offer <span>FREE, next working day delivery*</span>',
							link: 'http://www.salonsdirect.com/delivery'
						}],
						basketPage: [{
							pageType: 'sd47-basketpage',
							bannerText: "Need to know when your parcel will arrive? <span>You'll receive a text with your delivery time!</span>",
							link: 'http://www.salonsdirect.com/delivery'
						}]
					};

					var bannerObj,
						url = window.location.href,
						body = $('body'),
						bannerObj = smallBanners.landingPage;

					var basketprice = $('.header-minicart .header-cart-price .itemcount .count');

					/*-------------------------------
					Get user country
					---------------------------------*/
					var userLocation = window.sg_api.lib.lsGetdata('Website', 'geoData').country;

					/*-------------------------------
					Where to put banners based on url/classes
					---------------------------------*/
					/*New user*/
					if (getCookie('SD047newuser') == null && body.hasClass('cms-home')) {
						bannerObj = smallBanners.newUser;
						setTimeout(function () {
							setCookie('SD047newuser', 'new');
						}, 3000)


					}
					/*Returning user*/
					if (getCookie('SD047newuser') && body.hasClass('cms-home')) {
						console.log('cookie exists');
						bannerObj = smallBanners.returningUser;
					}
					/*Category Page*/
					if (body.hasClass('catalog-category-view')) {
						bannerObj = smallBanners.categoryPage;
					}
					/*Furniture catgory Page*/
					if (url.indexOf('http://www.salonsdirect.com/furniture') > -1 && body.hasClass('catalog-category-view')) {
						bannerObj = smallBanners.furniturePage;
					}
					/*Hair Colour & Beauty Page*/
					if (url.indexOf('http://www.salonsdirect.com/beauty') > -1 && body.hasClass('catalog-category-view') || url.indexOf('http://www.salonsdirect.com/hair-colour') > -1 && body.hasClass('catalog-category-view')) {
						bannerObj = smallBanners.beautyandhaircolourPage;
					}
					/*Product Page*/
					if (body.hasClass('catalog-product-view')) {
						bannerObj = smallBanners.productPage;
					}
					/*Hair category Page*/
					if (url.match(/.*(salonsdirect).(com)(\/)(hair)(\/).*/) && userLocation === 'United Kingdom') {
						bannerObj = smallBanners.haircatPage;
					}
					/*Lotus product Page*/
					if (url.indexOf('http://www.salonsdirect.com/lotus') > -1 && body.hasClass('catalog-product-view')) {
						var productTitle = $('.product-view .product-name h1').text().trim();
						if (productTitle.indexOf('Lotus') > -1) {
							bannerObj = smallBanners.lotusProductPage;
						}
					}
					/*Lotus furniture Page*/
					if (url.indexOf('http://www.salonsdirect.com/lotus') > -1 && body.hasClass('catalog-product-view') && body.hasClass('category-lotus-furniture')) {
						bannerObj = smallBanners.lotusFurniturePage;
					}
					/*Customer service Pages*/
					if (url === 'http://www.salonsdirect.com/contacts' || url === 'http://www.salonsdirect.com/returns' || url === 'http://www.salonsdirect.com/faqs' || url === 'http://www.salonsdirect.com/delivery') {
						uspWrapper.prependTo('.main-container:first');
						bannerObj = smallBanners.customerservicePage;
					}
					/*Something in the basket*/
					if (basketprice.length > 0) {
						bannerObj = smallBanners.afterAddtoBagPage;
					}
					/*basket*/
					if (url.indexOf('http://www.salonsdirect.com/checkout') > -1 && body.hasClass('checkout-cart-index')) {
						bannerObj = smallBanners.basketPage;
					}

					$.each(bannerObj, function () {
					var $eachBanner = $([
						'<a href="' + this.link + '">',
						'<div class="sd47-bannerMessage ' + this.pageType + '">',
						'<span class="sd47-innerMessage">' + this.bannerText + '</span>',
						'</div>',
						'</a>'
					].join(''));

					$eachBanner.appendTo('.sd47-bannerwrap');
					});


					/*EVENT*/
					var bannerClick;

					$('.sd47-bannerwrap a').click(function(){
						if(!bannerClick){
							sendEvent('SD047', 'Page View', 'SD047 USP banner click', true);
						}
					})

				}
		})();