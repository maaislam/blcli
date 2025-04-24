var _SD047 = (function () {
	
	// PLUGINS ------------------------------------
    // UC Library - Poller -- @version 0.2.2
    // ---------------------------------------------
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	// Send GA Events With Tracker Name ------------
	// ---------------------------------------------
	function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;
	UC.observer={active:[],connect:function(t,e,n){var i,o={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(n)for(var r in n)o[r]=n[r];else n=o;for(var c=new MutationObserver(function(n){n.forEach(function(n){i||(i=!0,e(t,n),setTimeout(function(){i=!1},o.throttle))})}),f=0;f<t.length;f++)c.observe(t[f],o.config),this.active.push([t[f],c])},disconnect:function(t){for(var e=this.active,n=0;n<t.length;n++)for(var i=t[n],o=0;o<e.length;o++)i===e[o][0]&&e[o][1].disconnect()}};		
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
				'#main-page',
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
					/*newUser: [{
						pageType: 'sd47-newuser',
						bannerText: "<img src='" + feefoLogo + "'/><span>Discover your competitor's secret.</span><img src='" + feefoStars + "'/> <p>Salons Direct is trusted by 15,000 UK salons - we save them all money.</p>",
						link: 'javascript:void(0)'
					}],*/
					returningUser: [{
						pageType: 'sd47-returnuser',
						bannerText: 'The new 2018/19 Hair & Beauty Catalogue is here! <span>Order your FREE copy now...</span>',
						link: 'https://www.salonsdirect.com/desired-catalogue'

					}],
					categoryPage: [{
						pageType: 'sd47-categorypage',
						bannerText: "Unlike other suppliers, we'll never sell out of stock items, meaning <span>no delays to orders.</span>",
						link: 'javascript:void(0)'
					}],
					furniturePage: [{
						pageType: 'sd47-furniturepage',
						bannerText: "Your customers will love the comfort & style of Lotus furniture - <span>you'll love our prices.</span>",
						link: '//www.salonsdirect.com/brands/lotus'
					}],
					beautyandhaircolourPage: [{
						pageType: 'sd47-beautypage',
						bannerText: 'Save money on your essentials with Lotus; our exclusive own-brand, <span>affordable & loved by salons</span>',
						link: '//www.salonsdirect.com/brands/lotus-essentials'
					}],
					productPage: [{
						pageType: 'sd47-productpage',
						bannerText: '<img src="' + feefoLogo + '"/><span>Shop with confidence</span><img src="' + feefoStars + '"/><p> We have more positive reviews than other UK suppliers</p>',
						link: 'javascript:void(0)'
					}],
					haircatPage: [{
						pageType: 'sd47-hairpage',
						bannerText: 'Elchim electricals last longer because they work as hard you do. <span>Exclusive to Salons Direct</span>',
						link: '//www.salonsdirect.com/brands/elchim'
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
					basketPage: [{
						pageType: 'sd47-basketpage',
						bannerText: "Need to know when your parcel will arrive? <span>You'll receive a text with your delivery time!</span>",
						link: '//www.salonsdirect.com/delivery'
					}]
				};

				var bannerObj,
					url = window.location.href,
					body = $('body'),
					bannerObj = smallBanners.landingPage;

					var basketprice = $('.header-minicart .header-cart-price .itemcount .count');
					var basketPriceNumber = parseFloat(basketprice.text().replace('£',''));
				/*-------------------------------
				Get user country
				---------------------------------*/
				var userLocation = window.sg_api.lib.lsGetdata('Website', 'geoData').country;

				/*-------------------------------
				Where to put banners based on url/classes
				---------------------------------*/
				var URL = window.location.href;
				//Unspecified Landing page, changing to other messages after 1+ page visits
				if(!getCookie('SD047landing')){
					bannerObj.landingPage;
					setTimeout(function () {
						setCookie('SD047landing', 'pageVisit');
					}, 6000);
				} 
	
				/*Returning user*/
				if (getCookie('SD047landing') && body.hasClass('cms-home')) {
					bannerObj = smallBanners.returningUser;
				}
				/*Category Page*/
				if (body.hasClass('catalog-category-view')) {
					bannerObj = smallBanners.categoryPage;
				}
				/*Furniture catgory Page*/
				if (url.indexOf('www.salonsdirect.com/furniture') > -1 && body.hasClass('catalog-category-view')) {
					bannerObj = smallBanners.furniturePage;
				}
				/*Hair Colour & Beauty Page*/
				if (url.indexOf('www.salonsdirect.com/beauty') > -1 && body.hasClass('catalog-category-view') || url.indexOf('//www.salonsdirect.com/hair-colour') > -1 && body.hasClass('catalog-category-view')) {
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
				if (url.indexOf('www.salonsdirect.com/lotus') > -1 && body.hasClass('catalog-product-view')) {
					var productTitle = $('.product-view .product-name h1').text().trim();
					if (productTitle.indexOf('Lotus') > -1) {
						bannerObj = smallBanners.lotusProductPage;
					}
				}
				/*Lotus furniture Page*/
				if (url.indexOf('www.salonsdirect.com/lotus') > -1 && body.hasClass('catalog-product-view') && body.hasClass('category-lotus-furniture')) {
					bannerObj = smallBanners.lotusFurniturePage;
				}
				/*Customer service Pages*/
				if (url.indexOf('www.salonsdirect.com/contacts') >-1 || url.indexOf('//www.salonsdirect.com/returns') > -1 || url.indexOf('//www.salonsdirect.com/faqs') > -1 || url.indexOf('//www.salonsdirect.com/delivery') > -1) {
					uspWrapper.prependTo('.main-container:first');
					bannerObj = smallBanners.customerservicePage;
				}
				if (url.indexOf('www.salonsdirect.com/checkout/cart/') >-1) {
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





			//IF THE ADD TO BAG BUTTON IS CLICKED 
			function afterAddtobag(){
				var afterBagunder30 = $([ 
				'<a href="//www.salonsdirect.com/delivery">',
					'<div class="sd47-bannerMessage sd47-addedpage">',
						'<span class="sd47-innerMessage">Simply spend £30 & we offer <span>FREE, next working day delivery*</span></span>',
					'</div>',
				'</a>'
				].join(''));

				var afterBagOver30 = $([ 
				'<a href="//www.salonsdirect.com/delivery">',
					'<div class="sd47-bannerMessage sd47-basketpage">',
						'<span class="sd47-innerMessage">Need to know when your parcel will arrive? <span>You\'ll receive a text with your delivery time!</span>',
					'</div>',
				'</a>'
				].join(''));

				var basketprice = $('.header-minicart .header-cart-price .itemcount .count');
				var basketPriceNumber = parseFloat(basketprice.text().replace('£',''));

				if(basketPriceNumber <= 30){
					$('.sd47-bannerwrap').html(afterBagunder30);
				}else if(basketPriceNumber >= 30 && url.indexOf('//www.salonsdirect.com/checkout')) {
					$('.sd47-bannerwrap').html(afterBagOver30);
				}
			}

			const $ajaxPopup = $('#ajax_content');
			const $continueShoppingBtn = $('#continued-shopping-btn');
			UC.observer.connect($ajaxPopup, function() {
				if ($continueShoppingBtn[0].style.display !== 'none') {
					afterAddtobag();
				} 
			}, { config: {childList: true, attributes: true, subtree: true} });

			/*EVENT*/
			var bannerClick;

			$('.sd47-bannerwrap a').click(function(){
				if(!bannerClick){
					sendEvent('SD047', 'Page View', 'SD047 USP banner click', true);
				}
			});

	}
})();