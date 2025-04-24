/*eslint-disable */
/* no_doc_ready */
var _CB081 = (function () {
	// PLUGINS ------------------------------------
    // UC Library - Poller -- @version 0.2.2
    // ---------------------------------------------
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:12000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	
	// Send GA Events With Tracker Name ------------
	// ---------------------------------------------
	function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;

    function getCookie(name) {
		var match = document.cookie.match(name+'=([^;]*)');
		return match ? match[1] : undefined;
    }
    
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
			experiment_str: 'CB081',
			variation_str: 'Variation 1'
		});
	}, { multiplier: 1.2, timeout: 0 });
		
		
	// -----------------------------------------------
	// Triggers
	// -----------------------------------------------
	UC.poller([
		function() {
			return !!window.jQuery;
		},
		function() {
    		return !!window.ga;
		}
	], CB081);
 
	// Variation
	function CB081() {
	   var $ = window.jQuery;
     var $body = $('body'); 

	   $body.addClass('CB081');
	
	   sendEvent('CB081', 'Page View', 'CB081 Personalised Homepage Page view', true);


     
       /*-------------------------------
	   if general cookie exists & on homepage - amend the homepage
	   ---------------------------------*/
	   var lastVisitedBrand = getCookie("CB081");

	   if (lastVisitedBrand) {

            UC.poller(['.slides-slider-container'], function() { 
                var slideBanner = $('.slides-slider-container');
			   slideBanner.html('<div class="cb81-newBanner container"><a href="#"/><div class="cb81-bannerText"/></div>');
					   
			   /*recommended products*/
			   var recommendedProducts = $('<div class="cb81-recommendedproducts"><span class="cb81-rec-line"><h2>Recommended for you</h2></span><div class="cb81-products"/></div>');
			   recommendedProducts.insertAfter(slideBanner);

			   $('<div class="cb81-bestsellingproducts"><span class="cb81-rec-line"><h2>Best sellers</h2></span></div>').prependTo('main.container-fluid');
            });
	   }

	   /*-------------------------------
        if brand cookie exists & on homepage - add/remove brand class to body 
        ---------------------------------*/

	   if (lastVisitedBrand === "clarisonic") {
		   $body.addClass('CB81-clarisonic');
		   $body.removeClass('CB81-iluminage');
		   $body.removeClass('CB81-tria');
		   $body.removeClass('CB81-smoothskin');
		   clarisonic();
	   }
	   if (lastVisitedBrand === "tria") {
		   $body.addClass("CB81-tria");
		   $body.removeClass('CB81-clarisonic');
		   $body.removeClass('CB81-iluminage');
		   $body.removeClass('CB81-smoothskin');
		   tria();
	   }
	   if (lastVisitedBrand === "iluminage") {
		   $body.addClass('CB81-iluminage');
		   $body.removeClass('CB81-tria');
		   $body.removeClass('CB81-clarisonic');
		   $body.removeClass('CB81-smoothskin');
		   iluminage();
	   } else if (lastVisitedBrand === "smoothskin") {
		   $body.addClass('CB81-smoothskin');
		   $body.removeClass('CB81-tria');
		   $body.removeClass('CB81-clarisonic');
		   $body.removeClass('CB81-iluminage');
		   smoothSkin();
	   } else {
		   return false;
	   }


       /*-------------------------------
       adding recommended products based on brand
       ---------------------------------*/
       function clarisonic() {
    	   $('.cb81-bannerText').html("<span>THE WORLD'S NO.1 SKIN CLEANSING DEVICE</span><a href='#'>SHOP CLARISONIC</a>");
    	   $('.cb81-newBanner a').attr('href', 'https://www.currentbody.com/clarisonic');
    	   
    
    	   /*RECOMMENDED PRODUCTS*/
    	   var clarisonicProduct = [
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/c/l/cl-miaf-config-2_1.jpg",
    			   "name": "Clarisonic Mia Fit",
    			   "price": "<span class='cb18-was'>£170.00</span><span class='cb18-price'>£136.00</span>",
    			   "link": "https://www.currentbody.com/clarisonic-mia-fit-facial-cleanser.html",
    			   "review": "&#9733;&#9733;&#9733;&#9733;&#9733;"
    		   },
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/c/l/cl-aria-pnk_1.jpg",
    			   "name": "Clarisonic Aria Facial Cleanser",
    			   "price": "<span class='cb18-was'>£155.00</span><span class='cb18-price'>£130.00</span>",
    			   "link": "https://www.currentbody.com/clarisonic-aria-facial-cleanser.html",
    			   "review": "&#9733;&#9733;&#9733;&#9733;&#9733;"
    		   },
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/c/l/cl-mia2-pnk-config-new.jpg",
    			   "name": "Clarisonic Mia 2 Facial Cleanser",
    			   "price": "<span class='cb18-was'>£125.00</span><span class='cb18-price'>£120.00</span>",
    			   "link": "https://www.currentbody.com/clarisonic-mia-2-facial-cleanser.html",
    			   "review": "&#9733;&#9733;&#9733;&#9733;&#9733;"
    		   },
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/c/l/cl-smart-whi_1.jpg",
    			   "name": "Clarisonic Smart Profile",
    			   "price": "<span class='cb18-price'>£199.99</span>",
    			   "link": "https://www.currentbody.com/clarisonic-smart-profile.html",
    			   "review": "&#9733;&#9733;&#9733;&#9733;&#9733;"
    		   },
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/c/l/cl-dpst-alf-gry.jpg",
    			   "name": "Clarisonic Alpha Fit",
    			   "price": "<span class='cb18-was'>£170.00</span><span class='cb18-price'>£136.00</span>",
    			   "link": "https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html",
    			   "review": "&#9733;&#9733;&#9733;&#9733;&#9733;"
    		   }
    	   ];
    
    	   $.each(clarisonicProduct, function (idx, val) {
    		   var link = val.link,
    			   name = val.name,
    			   price = val.price,
    			   image = val.image,
    			   review = val.review;
    
    		   var product = $([
    			   '<div class="cb81-product">',
    			   '<a href="' + link + '">',
    			   '<img src="' + image + '">',
    			   '<div class="cb81-productdetails">',
    			   '<span class="cb81-productname">' + name + '</span>',
    			   '<span class="cb81-productprice">' + price + '</span>',
    			   '<span class="cb81-review">' + review + '</span>',
    			   '</div>',
    			   '</a>',
    			   '</div>'
    		   ].join(''));
    		   product.appendTo('.cb81-products');
    
    	   });
    	   owlCarousel();
    
       }
    
       function tria() {
    	   $('.cb81-bannerText').html("<span>Transform your skincare with salon-standard hair removal and anti ageing light technology</span><a href='#'>SHOP TRIA</a>");
    	   
    	   $('.cb81-newBanner a').attr('href', 'https://www.currentbody.com/tria');
    
    	   /*RECOMMENDED PRODUCTS*/
    	   var triaProduct = [
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/t/r/tr-hlr4x-config-2.jpg",
    			   "name": "Tria Hair Removal Laser 4X",
    			   "price": "<span class='cb18-was'>£375.00</span><span class='cb18-price'>£289.00</span>",
    			   "link": "https://www.currentbody.com/tria-hair-removal-laser-4x.html",
    			   "review": "&#9733;&#9733;&#9733;&#9733;<span class='yotpo-icon yotpo-icon-half-star pull-left'></span>"
    		   },
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/t/r/tr-adl-laser.jpg",
    			   "name": "Tria Age-Defying Laser",
    			   "price": "<span class='cb18-was'>£450.00</span><span class='cb18-price'>£329.00</span>",
    			   "link": "https://www.currentbody.com/tria-age-defying-laser.html",
    			   "review": "&#9733;&#9733;&#9733;&#9733;<span class='yotpo-icon yotpo-icon-half-star pull-left'></span>"
    		   }, 
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/t/r/tr-3510a-eye.jpg",
    			   "name": "Tria Age-Defying Eye Wrinkle Corrector",
    			   "price": "<span class='cb18-was'>£299.00</span><span class='cb18-price'>£169.00</span>",
    			   "link": "https://www.currentbody.com/tria-age-defying-eye-wrinkle-corrector.html",
    			   "review": "&#9733;&#9733;&#9733;&#9733;<span class='yotpo-icon yotpo-icon-half-star pull-left'></span>"
    		   },
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/t/r/tr-hrlp-config-1.jpg",
    			   "name": "Tria Hair Removal Laser Precision",
    			   "price": "<span class='cb18-was'>£235.00</span><span class='cb18-price'>£145.00</span>",
    			   "link": "https://www.currentbody.com/tria-hair-removal-laser-precision.html",
    			   "review": "&#9733;&#9733;&#9733;&#9733;<span class='yotpo-icon yotpo-icon-half-star pull-left'></span>"
    		   },
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/t/r/tr-pcbl.jpg",
    			   "name": "Tria Acne Clearing Blue Light",
    			   "price": "<span class='cb18-price'>£199.00</span>",
    			   "link": "https://www.currentbody.com/tria-positively-clear-acne-clearing-blue-light-device.html",
    			   "review": "&#9733;&#9733;&#9733;&#9733;&#9733;"
    		   }
    	   ];
    
    	   $.each(triaProduct, function (idx, val) {
    		   var link = val.link,
    			   name = val.name,
    			   price = val.price,
    			   image = val.image,
    			   review = val.review;
    
    		   var product = $([
    			   '<div class="cb81-product">',
    			   '<a href="' + link + '">',
    			   '<img src="' + image + '">',
    			   '<div class="cb81-productdetails">',
    			   '<span class="cb81-productname">' + name + '</span>',
    			   '<span class="cb81-productprice">' + price + '</span>',
    			   '<span class="cb81-review">' + review + '</span>',
    			   '</div>',
    			   '</a>',
    			   '</div>'
    		   ].join(''));
    		   product.appendTo('.cb81-products');
    
    	   });
    	   owlCarousel();
    
       }
    
       function iluminage() {
            $('.cb81-bannerText').html("<span>Rejuvinate your skin with cutting-edge beauty solutions for everyday use</span><a href='#'>SHOP ILUMINAGE</a>");
    	   
    	   $('.cb81-newBanner a').attr('href', 'https://www.currentbody.com/iluminage');
    
    	   /*RECOMMENDED PRODUCTS*/
    	   var iluminageProduct = [
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/i/l/il-activator-1.jpg",
    			   "name": "iluminage Youth Activator Anti-Ageing Device",
    			   "price": "<span class='cb18-was'>£239.00</span><span class='cb18-price'>£192.00</span>",
    			   "link": "https://www.currentbody.com/iluminage-youth-activator.html",
    			   "review": "&#9733;&#9733;&#9733;<span class='yotpo-icon yotpo-icon-half-star pull-left'></span>"
    		   },
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/8/8/8839197_fpx_-_new_version.jpg",
    			   "name": "iluminage Beauty TOUCH Permanent Hair Reduction System",
    			   "price": "<span class='cb18-was'>£375.00</span><span class='cb18-price'>£299.00</span>",
    			   "link": "https://www.currentbody.com/iluminagetouch.html",
    			   "review": "&#9733;&#9733;&#9733;&#9733;"
    		   },
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/i/l/iluminage-pillowcase-gallery-1.jpg",
    			   "name": "iluminage skin rejuvenating pillowcase",
    			   "price": "<span class='cb18-was'>£50.00</span><span class='cb18-price'> £40.00</span>",
    			   "link": "https://www.currentbody.com/iluminage-pillow-case.html",
    			   "review": "&#9733;&#9733;&#9733;&#9733;<span class='yotpo-icon yotpo-icon-half-star pull-left'></span>"
    		   },
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/i/l/il-hu-fg01171uk.jpg",
    			   "name": "iluminage Precise Touch",
    			   "price": "<span class='cb18-was'>£240.00</span><span class='cb18-price'> £190.00</span>",
    			   "link": "https://www.currentbody.com/iluminage-precise-touch-permanent-hair-remover.html",
    			   "review": "&#9733;&#9733;&#9733;&#9733;"
    		   },
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/i/l/il-hu-fg01411-red-2.jpg",
    			   "name": "iluminage Skin Rejuvenating Eye Mask - Special Edition",
    			   "price": "<span class='cb18-was'>£25.00</span><span class='cb18-price'>£20.00</span>",
    			   "link": "https://www.currentbody.com/iluminage-red-skin-rejuvenating-eye-mask.html",
    			   "review": "&#9733;&#9733;&#9733;&#9733;<span class='yotpo-icon yotpo-icon-half-star pull-left'></span>"
    		   }
    	   ];
    
    	   $.each(iluminageProduct, function (idx, val) {
    		   var link = val.link,
    			   name = val.name,
    			   price = val.price,
    			   image = val.image,
    			   review = val.review;
    
    		   var product = $([
    			   '<div class="cb81-product">',
    			   '<a href="' + link + '">',
    			   '<img src="' + image + '">',
    			   '<div class="cb81-productdetails">',
    			   '<span class="cb81-productname">' + name + '</span>',
    			   '<span class="cb81-productprice">' + price + '</span>',
    			   '<span class="cb81-review">' + review + '</span>',
    			   '</div>',
    			   '</a>',
    			   '</div>'
    		   ].join(''));
    		   product.appendTo('.cb81-products');
    
    	   });
    	   owlCarousel();
       } 
       
       function smoothSkin() {
            $('.cb81-bannerText').html("<span>Discover beautifully hair-free skin at home with intelligent IPL hair removal</span><a href='#'>SHOP SMOOTHSKIN</a>");
    	   $('.cb81-newBanner a').attr('href', 'https://www.currentbody.com/smoothskin');
    
    	   /*RECOMMENDED PRODUCTS*/
    	   var smoothSkinProduct = [
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/c/d/cd-ca001241-ssbare-config-ba.jpg",
    			   "name": "SmoothSkin Bare IPL Hair Removal Device - Summer Collection",
    			   "price": "<span class='cb18-was'>£199.00</span><span class='cb18-price'>£179.00</span>",
    			   "link": "https://www.currentbody.com/smoothskin-summer-collection-bare-ipl-hair-removal-device.html",
    			   "review": "&nbsp;"
    		   },
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/c/d/cd-ca001194-ssbare-config.jpg",
    			   "name": "SmoothSkin Bare IPL Hair Removal Device",
    			   "price": "<span class='cb18-was'>£199.00</span><span class='cb18-price'>£179.00</span>",
    			   "link": "https://www.currentbody.com/smoothskin-bare-ipl-hair-removal-device.html",
    			   "review": "&#9733;&#9733;&#9733;&#9733;<span class='yotpo-icon yotpo-icon-half-star pull-left'></span>"
    		   },
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/c/d/cd-ca00-config.jpg",
    			   "name": "SmoothSkin Gold IPL Hair Removal",
    			   "price": "<span class='cb18-was'>£299.00</span><span class='cb18-price'>£245.00</span>",
    			   "link": "https://www.currentbody.com/smoothskin-gold-permanent-hair-removal.html",
    			   "review": "&#9733;&#9733;&#9733;&#9733;&#9733;"
    		   },
    		   {
    			   "image": "https://www.currentbody.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/c/d/cd-ca00-config.jpg",
    			   "name": "SmoothSkin Permanent Hair Removal For Men",
    			   "price": "<span class='cb18-price'>£299.00</span>",
    			   "link": "https://www.currentbody.com/smoothskin-permanent-hair-removal-for-men.html",
    			   "review": "&#9733;&#9733;&#9733;&#9733;<span class='yotpo-icon yotpo-icon-half-star pull-left'></span>"
    		   }
    
    	   ];
    
    	   $.each(smoothSkinProduct, function (idx, val) {
    		   var link = val.link,
    			   name = val.name,
    			   price = val.price,
    			   image = val.image,
    			   review = val.review;
    
    		   var product = $([
    			   '<div class="cb81-product">',
    			   '<a href="' + link + '">',
    			   '<img src="' + image + '">',
    			   '<div class="cb81-productdetails">',
    			   '<span class="cb81-productname">' + name + '</span>',
    			   '<span class="cb81-productprice">' + price + '</span>',
    			   '<span class="cb81-review">' + review + '</span>',
    			   '</div>',
    			   '</a>',
    			   '</div>'
    		   ].join(''));
    		   product.appendTo('.cb81-products');
    
    	   });
    	   owlCarousel();
    
       }


	   /*-------------------------------
	   Owl carousel for recommended products
	   ---------------------------------*/
        var pollerOpts = { timeout: 7000, multiplier: 0 };
        function owlCarousel() {
            UC.poller([
                function() {
                    return !!window['jQuer' + 'y'].fn.owlCarousel;
                }
            ], function() {
              window['jQuer' + 'y']('.cb81-products').owlCarousel({
                    pagination: false,
                    navigation: false,
                    margin: 0,
                    autoPlay: 5000,
                    loop: true,
                    responsive: true
                }); 
            });
        }
        
    }

})();
