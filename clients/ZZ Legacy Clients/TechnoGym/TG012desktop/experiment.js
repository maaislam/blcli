var _TG012 = (function () {
	
		var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
			
		 

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
		 		experiment_str: 'TG012',
		 		variation_str: 'Variation 1'
		 	});
		 }, {
		 	multiplier: 1.2,
		 	timeout: 0
		 });

		 // Poll start
		 UC.poller([
		 	'body',
      '.homepage-products-bar',
      '.swiper-slide',
		 	function () {
		 		if (window.jQuery) return true;
		 	},
		 	function () {
		 		if (window.ga) return true;
		 	}
		 ], TG012, {
		 	timeout: 7000,
		 	multiplier: 'disable'
		 });
		 // Variation
		 function TG012() {


		 	var $ = window.jQuery;
			 $('body').addClass('TG012');
			 

		 	/*-------------------------------
		 	Create tab labels
		 	---------------------------------*/

		 	var productTabs = $('<div class="tg12-tabs-wrapper"></div>');
		 	productTabs.insertAfter('.container.visible-xs.boxed-row');

		 	productTabs.html(['<div id="tg12-tab1" class="tg12-tab"><span>Product Categories</span></div>',
		 		'<div id="tg12-tab2" class="tg12-tab"><span>Product Ranges</span></div>'
		 	].join(''));

		 	/*-------------------------------
		 	Tab wrapper content
		 	---------------------------------*/
		 	var productContent = $('<div class="tg12-tabs-content"/></div>');
		 	productContent.insertAfter(productTabs);

		 	productContent.html('<div class="tg12-tab-content"/><div class="tg12-tab-content"><ul class="tg12-PR swiper-wrapper"/></div>');

		 	/*-------------------------------
		 	Move category carousel to tab
		 	---------------------------------*/
		 	var categories = $('.row.shortcode-row.full-row .homepage-products-bar');

		 	productContent.find('.tg12-tab-content:first').append(categories);

		 	/*-------------------------------
		 	get product ranges
		 	---------------------------------*/
		 	var productRanges = $('.inside .menu-position-0 .children .level-0 .menu-item.level-1.menu-position-2 .level-1 li');

		 	productRanges.clone().appendTo('.tg12-tab-content:last .tg12-PR');

		 	$('.tg12-PR li').each(function () {
		 		$(this).addClass('swiper-slide swiper-slide-visible swiper-slide-active');
		 	});

		 	/*-------------------------------
		 	Hide/Show tabs
		 	---------------------------------*/

		 	var tab1label = $('#tg12-tab1'),
		 		tab2label = $('#tg12-tab2'),
		 		tab1content = $('.tg12-tab-content:first'),
		 		tab2content = $('.tg12-tab-content:last');


		 	tab1label.addClass('tg12-tabactive');
		 	tab1content.addClass('tg12-tabcontent-active');


		 	tab1label.click(function () {
		 		if (!$(this).hasClass('tg12-tabactive')) {
		 			$(this).addClass('tg12-tabactive');
		 			tab2label.removeClass('tg12-tabactive');
		 		}

		 		tab1content.addClass('tg12-tabcontent-active');
		 		tab2content.removeClass('tg12-tabcontent-active');
		 	});
		 	tab2label.click(function () {
		 		if (!$(this).hasClass('tg12-tabactive')) {
		 			$(this).addClass('tg12-tabactive');
		 			tab1label.removeClass('tg12-tabactive');
		 		}
		 		tab2content.addClass('tg12-tabcontent-active');
		 		tab1content.removeClass('tg12-tabcontent-active');


		 	});

		 	/*-------------------------------
		 	Add all products button
		 	---------------------------------*/
			 productContent.after('<a class="tg12-all button btn-default btn-cta" href="/products.html">View all Products</a>');
			 

			 /*-------------------------------
		 		Events
			 ---------------------------------*/


			 function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}
			 var trackerName;

			 var categoryClick,
			 	 productRangeclick;


			 tab1content.find('li').click(function(){
				if(!categoryClick){
					sendEvent('TG012 user clicked on category', 'Category Icon click', 'TG012 User clicked on category', true);
					categoryClick = true;
				}
			});

			tab2content.find('li').click(function(){
				if(!productRangeclick){
					sendEvent('TG012 user clicked on product range', 'Product range click', 'TG012 User clicked on product range', true);
					productRangeclick = true;
				}
			});

    }
})();
		