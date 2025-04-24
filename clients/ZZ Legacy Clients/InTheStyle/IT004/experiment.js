var _IT004 = (function () {
	
	var $ = jQuery;
	/*-------------------------------
	Move sticky header bar
	---------------------------------*/
	function moveHeader() {
		var mainHeader = $('.header-container');
		mainHeader.prependTo('.off-canvas-wrap');
		mainHeader.find('.header-primary').append('<div class="it4-navtoggle"><img src="http://www.sitegainer.com/fu/up/9bxr71nh2ykrjr5.png"/><span class="it4-navIcon">Menu</span></div>');

		//move fixed message above header
		$('.delivery-countdown.fixed-countdown ').prependTo(mainHeader);

		//move around elements in header bar
		var searchIcon = $('.header-primary .icons li:last');
		searchIcon.prependTo('.header-secondary .icons');
		$('.header-primary').insertAfter('.header-logo');
	}

	/*-------------------------------
	Replace Current Navigation
	---------------------------------*/
	function replaceCurrentnav() {
		var currency = $('.currency-switcher').clone();
		var newNavigation = $('<div class="it4-newNav-wrap"><div class="it4-currency"/><div class="it4-exit"><span>&times;</span></div><div class="it4-links"></div></div>');
		newNavigation.prependTo('.off-canvas-wrap');

		currency.appendTo('.it4-currency');

		$('.it4-currency,.it4-exit').wrapAll('<div class="it4-topbar"/>');
	}

	/*-------------------------------
	Slide out functionality
	---------------------------------*/
	function slideOut() {
		var $body = $('body');
		var toggle = $('.it4-navtoggle'),
			menu = $('.it4-newNav-wrap');

		$(toggle).click(function () {
			$body.toggleClass('it4-navShowing'); //add class when nav open to stop scroll
			menu.toggleClass('it4-navopen');
			$(this).toggleClass('it4-toggleCross');
		});
	}


	/*-------------------------------
	Navigation content
	---------------------------------*/

	function navContent() {
		var nav_item = [

			/****************  
			New In
			****************/
			{
				title: 'NEW IN',
				image: 'https://media.inthestyle.com/catalog/product/cache/1/small_image/750x1130/9df78eab33525d08d6e5fb8d27136e95/1/_/1.jpg',
				content: {
					lvl2: [{
							title: 'NEW IN',
							url: 'javascript:void(0)'
						},
						{
							title: 'Show All New',
							url: 'https://www.inthestyle.com/new'
						},
						{
							title: 'New - Billie Faiers Blonde Ambition',
							url: 'https://www.inthestyle.com/new/new-billie-faiers-blonde-ambition'
						},
						{
							title: 'New Clothing',
							url: 'https://www.inthestyle.com/new/new-clothing'
						},
						{
							title: 'New Dresses',
							url: 'https://www.inthestyle.com/new/new-dresses'
						},
						{
							title: 'New Shoes',
							url: 'https://www.inthestyle.com/new/shoes'
						},
						{
							title: 'New Accessories',
							url: 'https://www.inthestyle.com/new/new-accessories'
						},
					]
				}
			},

			/****************  
			Dresses
			****************/
			{
				title: 'Dresses',
				image: 'https://media.inthestyle.com/catalog/product/cache/1/small_image/750x1130/9df78eab33525d08d6e5fb8d27136e95/i/m/img_5912.jpg',
				content: {
					lvl2: [{
							title: 'DRESSES',
							url: 'javascript:void(0)'
						},
						{
							title: 'Show All Dresses',
							url: 'https://www.inthestyle.com/dresses'
						},
						{
							title: 'Bardot Dresses',
							url: 'https://www.inthestyle.com/dresses/bardot-dresses'
						},
						{
							title: 'Bodycon Dresses',
							url: 'https://www.inthestyle.com/dresses/bodycon-dresses'
						},
						{
							title: 'Curve Dresses',
							url: 'https://www.inthestyle.com/dresses/curve-dresses'
						},
						{
							title: 'Day Dresses',
							url: 'https://www.inthestyle.com/dresses/day-dresses'
						},
						{
							title: 'LBD Dresses',
							url: 'https://www.inthestyle.com/dresses/lbd-dresses'
						},
						{
							title: 'Maxi Dresses',
							url: 'https://www.inthestyle.com/dresses/maxi-dresses'
						},
						{
							title: 'Midi Dresses',
							url: 'https://www.inthestyle.com/dresses/midi-dresses'
						},
						{
							title: 'Mini Dresses',
							url: 'https://www.inthestyle.com/dresses/mini-dresses'
						},
						{
							title: 'Shirt Dresses',
							url: 'https://www.inthestyle.com/dresses/shirt-dresses'
						},
						{
							title: 'Slip Dresses',
							url: 'https://www.inthestyle.com/dresses/slip-dresses'
						},
						{
							title: 'T-Shirt Dresses',
							url: 'https://www.inthestyle.com/dresses/t-shirt-dresses'
						},
						{
							title: 'White Dresses',
							url: 'https://www.inthestyle.com/dresses/white-dresses'
						},
						{
							title: 'Dresses under £20',
							url: 'https://www.inthestyle.com/dresses/dresses-under-20'
						},
					]
				}
			},
			/****************  
			Clothing
			****************/
			{
				title: 'Clothing',
				image: 'https://media.inthestyle.com/catalog/product/cache/1/small_image/750x1130/9df78eab33525d08d6e5fb8d27136e95/1/5/15.jpg',
				content: {
					lvl2: [{
							title: 'ClOTHING',
							url: 'javascript:void(0)'
						},
						{
							title: 'Show All Clothing',
							url: 'https://www.inthestyle.com/clothing'
						},
						{
							title: 'Dresses',
							url: 'https://www.inthestyle.com/dresses'
						},
						{
							title: 'Tops',
							url: 'https://www.inthestyle.com/clothing/tops'
						},
						{
							title: 'Bodysuits',
							url: 'https://www.inthestyle.com/clothing/bodysuits'
						},
						{
							title: 'Playsuits',
							url: 'https://www.inthestyle.com/clothing/playsuits'
						},
						{
							title: 'Jumpsuits',
							url: 'https://www.inthestyle.com/clothing/jumpsuits'
						},
						{
							title: 'Sets & Co-Ords',
							url: 'https://www.inthestyle.com/clothing/sets-co-ords'
						},
						{
							title: 'Skirts & Shorts',
							url: 'https://www.inthestyle.com/clothing/skirts-shorts'
						},
						{
							title: 'Shirts',
							url: 'https://www.inthestyle.com/clothing/shirts'
						},
						{
							title: 'Jeans & Denim',
							url: 'https://www.inthestyle.com/clothing/denim'
						},
						{
							title: 'Trousers & Leggings',
							url: 'https://www.inthestyle.com/clothing/trousers-leggings'
						},
						{
							title: 'Swimwear',
							url: 'https://www.inthestyle.com/clothing/swimwear'
						},
						{
							title: 'Jumpers & Sweatshirts',
							url: 'https://www.inthestyle.com/clothing/jumpers-sweatshirts'
						},
						{
							title: 'Coats & Jackets',
							url: 'https://www.inthestyle.com/clothing/jackets-coats'
						},
						{
							title: 'Activewear',
							url: 'https://www.inthestyle.com/clothing/activewear'
						},
						{
							title: 'Loungewear',
							url: 'https://www.inthestyle.com/clothing/loungewear'
						},
						{
							title: 'Lingerie & Nightwear',
							url: 'https://www.inthestyle.com/clothing/lingerie-nightwear'
						},
						{
							title: 'Curve Clothing',
							url: 'https://www.inthestyle.com/clothing/curve-clothing'
						},
						{
							title: 'Premium',
							url: 'https://www.inthestyle.com/clothing/premium'
						},
					]
				}
			},
			/****************  
			Collaborators
			****************/
			{
				title: 'Collaborators',
				image: 'https://media.inthestyle.com/catalog/product/cache/1/small_image/750x1130/9df78eab33525d08d6e5fb8d27136e95/w/e/website-resize5.jpg',
				content: {
					lvl2: [{
						title: 'COLLABORATORS',
						url: 'javascript:void(0)'
					}, ]
				}
			},
			/****************  
			SHOES
			****************/
			{
				title: 'Shoes',
				image: 'https://media.inthestyle.com/catalog/product/cache/1/small_image/750x1130/9df78eab33525d08d6e5fb8d27136e95/w/e/website-resize3_1_2.jpg',
				content: {
					lvl2: [{
							title: 'SHOES',
							url: 'javascript:void(0)'
						},
						{
							title: 'Show All Shoes',
							url: 'https://www.inthestyle.com/shoes'
						},
						{
							title: 'High Heels',
							url: 'https://www.inthestyle.com/shoes/high-heels'
						},
						{
							title: 'Flats',
							url: 'https://www.inthestyle.com/shoes/flats'
						},
						{
							title: 'Sandals',
							url: 'https://www.inthestyle.com/shoes/sandals'
						},
						{
							title: 'Wedges',
							url: 'https://www.inthestyle.com/shoes/wedges'
						},
						{
							title: 'Boots',
							url: 'https://www.inthestyle.com/shoes/boots'
						},
						{
							title: 'Flatforms',
							url: 'https://www.inthestyle.com/shoes/flatforms'
						},
						{
							title: 'Wide Fit',
							url: 'https://www.inthestyle.com/shoes/wide-fit'
						},
					]
				}
			},
			/****************  
			Accessories
			****************/
			{
				title: 'Accessories',
				image: 'https://media.inthestyle.com/catalog/product/cache/1/small_image/750x1130/9df78eab33525d08d6e5fb8d27136e95/p/8/p887_black_050.jpg',
				content: {
					lvl2: [{
							title: 'Accessories',
							url: 'javascript:void(0)'
						},
						{
							title: 'Show All',
							url: 'https://www.inthestyle.com/accessories'
						},
						{
							title: 'Beauty',
							url: 'https://www.inthestyle.com/accessories/beauty'
						},
						{
							title: 'Belts',
							url: 'https://www.inthestyle.com/accessories/belts'
						},
						{
							title: 'Bags',
							url: 'https://www.inthestyle.com/accessories/bags'
						},
						{
							title: 'Body Jewellery',
							url: 'https://www.inthestyle.com/accessories/body-jewellery'
						},
						{
							title: 'Chokers',
							url: 'https://www.inthestyle.com/accessories/chokers'
						},
						{
							title: 'Shapewear',
							url: 'https://www.inthestyle.com/accessories/shapewear'
						},
						{
							title: 'Hair Accessories',
							url: 'https://www.inthestyle.com/accessories/hair-accessories'
						},
						{
							title: 'Hats/Scarves',
							url: 'https://www.inthestyle.com/accessories/hats-scarves'
						},
						{
							title: 'Jewellery',
							url: 'https://www.inthestyle.com/accessories/jewellery'
						},
						{
							title: 'Tights & Socks',
							url: 'https://www.inthestyle.com/accessories/tights-socks'
						},
						{
							title: 'Lingerie & Nightwear',
							url: 'https://www.inthestyle.com/clothing/lingerie-nightwear'
						},
						{
							title: 'Phone Cases',
							url: 'https://www.inthestyle.com/accessories/phone-cases'
						},
						{
							title: 'Stationery',
							url: 'https://www.inthestyle.com/accessories/stationery'
						},
						{
							title: 'Sunglasses',
							url: 'https://www.inthestyle.com/accessories/sunglasses'
						},
					]
				}
			},
			/****************  
			Curve
			****************/
			{
				title: 'Curve',
				image: 'https://media.inthestyle.com/catalog/product/cache/1/small_image/750x1130/9df78eab33525d08d6e5fb8d27136e95/i/n/infe0133_white_065.jpg',
				content: {
					lvl2: [{
							title: 'CURVE',
							url: 'javascript:void(0)'
						},
						{
							title: 'Show All Curve',
							url: 'https://www.inthestyle.com/curve'
						},
						{
							title: 'Curve Dresses',
							url: 'https://www.inthestyle.com/curve/curve-dresses'
						},
						{
							title: 'Curve Clothing',
							url: 'https://www.inthestyle.com/clothing/curve-clothing'
						},
						{
							title: 'Curve Sale',
							url: 'https://www.inthestyle.com/curve/sale-curve'
						},

					]
				}
			},
			/****************  
			Trends
			****************/
			{
				title: 'Trends',
				image: 'https://media.inthestyle.com/catalog/product/cache/1/small_image/750x1130/9df78eab33525d08d6e5fb8d27136e95/1/1/11.jpg',
				content: {
					lvl2: [{
							title: 'TRENDS',
							url: 'javascript:void(0)'
						},
						{
							title: 'Show All Trends',
							url: 'https://www.inthestyle.com/trends'
						},
						{
							title: 'Fresh Florals',
							url: 'https://www.inthestyle.com/trends/floral-feels'
						},
						{
							title: 'Summer Essentials',
							url: 'https://www.inthestyle.com/trends/summer-essentials'
						},
						{
							title: 'Denim Daze',
							url: 'https://www.inthestyle.com/trends/denim-daze'
						},
						{
							title: 'Gingham Goals',
							url: 'https://www.inthestyle.com/trends/gingham-goals'
						},
						{
							title: 'Frill Seeker',
							url: 'https://www.inthestyle.com/trends/frill-seeker'
						},
						{
							title: 'Vacay Vibes',
							url: 'https://www.inthestyle.com/trends/vacay-vibes'
						},
						{
							title: 'Going out Glam',
							url: 'https://www.inthestyle.com/trends/going-out-glam'
						},
						{
							title: 'Festival Feels',
							url: 'https://www.inthestyle.com/trends/festival-feels'
						},
						{
							title: 'Be A Se-Queen',
							url: 'https://www.inthestyle.com/trends/be-a-sequeen'
						},
						{
							title: 'Wedding Guest',
							url: 'https://www.inthestyle.com/trends/wedding-guest'
						},
					]
				}
			},
		];


		var $nav = $('.it4-links');

		// Loop through level 1 list
		$.each(nav_item, function () {
			var $nav1categoryLinks = $([
				'<li class="it4-category-link">',
				'<div class="ucwrapperlvl1 it4_catnavlink">',
				'<img src="' + this.image + '"/>',
				'<span class="it4-catlink nav-lvl1">',
				this.title,
				'</span>',
				'</div>',
				'</li>'
			].join(''));

			if (this.content) {
				var content = this.content;

				if (content.lvl2) {
					var $nav2textLinks = $('<ul class="it4-innerLinks"></ul>');

					//getting links for 2nd nav
					$.each(content.lvl2, function () {
						var $lvl2_link = $([
							'<li class="it4-textLink">',
							'<div class="ucwrapperlvl2">',
							'<span class="it4-innercategorylink nav-lvl2">',
							'<a href="' + this.url + '">' + this.title + '</a>',
							'</span>',
							'</div>',
							'</li>'
						].join(''));
						$lvl2_link.appendTo($nav2textLinks);
					});
				}

				$nav2textLinks.appendTo($nav1categoryLinks);
			}
			$nav1categoryLinks.appendTo($nav);
		});
	}

	/*-------------------------------
	Add Sales category
	---------------------------------*/
	function addSales() {
		var salesLink = $('<div class="it4-sales"><a href="https://www.inthestyle.com/sale-2017"><span>SALE</span></a></div>');
		salesLink.appendTo('.it4-links');
	}
	/*-------------------------------
	Add text links functionality
	---------------------------------*/
	function navigationSlides() {
		var categoryLinks = $('.it4-category-link');

		categoryLinks.each(function () {
			$(this).click(function () {
				$(this).find('.it4-innerLinks').addClass('it4-innerlinks-open');
				$('.it4-category-link').find('.it4-innerLinks').removeClass('.it4-innerlinks-open');
			});

			$(this).find('.it4-textLink:first .ucwrapperlvl2').prepend('<span class="it4-close"><img src="http://www.sitegainer.com/fu/up/8d5l26p8sb7yfwb.png">Back</span>');
			$(this).find('.it4-innerLinks .it4-textLink:first span').click(function (e) {
				$('.it4-textLink').parent().removeClass('it4-innerlinks-open');
				e.stopPropagation();
			});
		});
	}

	/*-------------------------------
	Exit navigation
	---------------------------------*/
	function closeNav() {
		$('.it4-exit').click(function () {
			$('.it4-newNav-wrap.it4-navopen').removeClass('it4-navopen');
			$('.it4-textLink').removeClass('it4-innerlinks-open');
		});
	}

	/*-------------------------------
	Add Collaborator links - different to other slide out links
	---------------------------------*/
	function collaborators() {
		$('.it4-category-link:eq(3)').addClass('it4-collab');

		var collabLink = $('.it4-collab .it4-innerLinks');

		//add individual collaboration headings
		var collabCat = [
			['it4-sarah'],
			['it4-charlotte'],
			['it4-binky'],
			['it4-billie'],
			['it4-olivia']
		];
		$.each(collabCat, function () {
			var className = this[0];

			var collabHeadings = $([
				'<div class="it4-collabHead ' + className + '"></div>'
			].join(''));

			collabHeadings.appendTo(collabLink);
		});


		//add individual content based on collab class name
		var collabInnerLink = {
			sarahashcroft: [{
					title: '', //'<img src="https://skin.inthestyle.com/skin/frontend/webtise/default/images/sarah_logo.svg"/>',
					url: ''
				},
				{
					title: 'Clothing',
					url: ''
				},
				{
					title: 'Swimwear',
					url: ''
				},
				{
					title: 'Accessories',
					url: ''
				},
				{
					title: 'Exclusive Content',
					url: ''
				},
			],
			charlotteCrosby: [{
					title: '',
					url: ''
				},
				{
					title: 'Clothing',
					url: ''
				},
				{
					title: 'Swimwear',
					url: ''
				},
				{
					title: 'Activewear',
					url: ''
				},
				{
					title: 'Exclusive Wear',
					url: ''
				},
			],
			Binky: [{
					title: '', //'<img src="https://skin.inthestyle.com/skin/frontend/webtise/default/images/menu-binky.svg"/>',
					url: ''
				},
				{
					title: 'Clothing',
					url: ''
				},
				{
					title: 'Swimwear',
					url: ''
				},
				{
					title: 'Dreamcatcher',
					url: ''
				},

			],
			Billie: [{
					title: '', // '<img src="https://skin.inthestyle.com/skin/frontend/webtise/default/images/menu-billie.svg"/>',
					url: ''
				},
				{
					title: 'Clothing',
					url: ''
				},
				{
					title: 'Swimwear',
					url: ''
				},
				{
					title: 'Blonde Ambition',
					url: ''
				},
				{
					title: 'Exclusive Content',
					url: ''
				},

			],
			oliviaLoves: [{
					title: '', // '<img src="https://skin.inthestyle.com/skin/frontend/webtise/default/images/olivia_logo.svg"/>',
					url: ''
				},
				{
					title: 'Clothing',
					url: ''
				},
				{
					title: 'Accessories and Footwear',
					url: ''
				}
			],
		};


		$('.it4-collab .it4-collabHead').each(function () {
			var $el = $(this);

			if ($(this).hasClass('it4-sarah')) {
				expObj = collabInnerLink.sarahashcroft;
			} else if ($(this).hasClass('it4-charlotte')) {
				expObj = collabInnerLink.charlotteCrosby;
			} else if ($(this).hasClass('it4-binky')) {
				expObj = collabInnerLink.Binky;
			} else if ($(this).hasClass('it4-billie')) {
				expObj = collabInnerLink.Billie;
			} else if ($(this).hasClass('it4-olivia')) {
				expObj = collabInnerLink.oliviaLoves;
			}


			$.each(expObj, function () {
				var $links = $([
					'<li class="it4-textLink">',
					'<div class="ucwrapperlvl2">',
					'<span class="it4-innercategorylink nav-lvl2">',
					'<a href="' + this.url + '">' + this.title + '</a>',
					'</span>',
					'</div>',
					'</li>'
				].join(''));

				$links.appendTo($el);

			});
		});

	}

	/*-------------------------------
Run test
---------------------------------*/
function init() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
		// Triggers
		UC.poller([
			'body',
			'.header-container',
			function () {
				if (window.jQuery) return true;
			},
			function () {
				if (window.ga) return true;
			}
		], WO005, {
			timeout: 7000,
			multiplier: 0
	});
	function WO005() {

		UC.poller([
			function() {
				var fs = window.FS;
					if (fs && fs.setUserVars) return true;
				}
				], function () {
					window.FS.setUserVars({
					experiment_str: 'WO005',
					variation_str: 'Variation 1'
				});
			}, { multiplier: 1.2, timeout: 0 });


		$('body').addClass('IT004');

		//run all functions here
		moveHeader();
		replaceCurrentnav();
		slideOut();
		navContent();
		navigationSlides();
		closeNav();
		addSales();
		collaborators();
	}
}
init();
})();
