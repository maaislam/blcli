var _SD010 = (function ($) {

  
	var UC=function(t){var e=e||window.jQuery;return t.poller=function(t,e,n){var r={wait:50,multiplier:1.1,timeout:0},i=Date.now||function(){return(new Date).getTime()};if(n)for(var o in n)r[o]=n[o];else n=r;for(var u=!!r.timeout&&new Date(i()+r.timeout),c=r.wait,a=r.multiplier,f=[],l=function(n,r){if(u&&i()>u)return!1;r=r||c,function(){var t=typeof n;return"function"===t?n():"string"!==t||document.querySelector(n)}()?(f.push(!0),f.length===t.length&&e()):setTimeout(function(){l(n,r*a)},r)},v=0;v<t.length;v++)l(t[v])},t.throttle=function(t,e){var n,r,i,o=null,u=0;Date.now;return function(){var c=c();u||(u=c);var a=e-(c-u);return n=this,r=arguments,(a<=0||a>e)&&(o&&(clearTimeout(o),o=null),u=c,i=t.apply(n,r),o||(n=r=null)),i}},t.observer={active:[],connect:function(t,e,n){var r={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(n)for(var i in n)r[i]=n[i];else n=r;for(var o,u=new MutationObserver(function(n){n.forEach(function(n){o||(o=!0,e(t,n),setTimeout(function(){o=!1},r.throttle))})}),c=0;c<t.length;c++)u.observe(t[c],r.config),this.active.push([t[c],u])},disconnect:function(t){for(var e=this.active,n=0;n<t.length;n++)for(var r=t[n],i=0;i<e.length;i++)r===e[i][0]&&e[i][1].disconnect()}},t}(UC||{});
	
	UC.poller([
	 
	  function () {
		if (window.jQuery) return true;
	  },
	  function () {
		if (window.ga) return true;
	  }
	], SD010, {
	  timeout: 7000,
	  multiplier: 'disable'
	});
  
	function SD010() {
	  var $ = window.jQuery,
		  ga = window.ga;
		  
	  var trackerName = window.ga.getAll()[0].get('name');    
  
	  $('body').addClass('SD010');
  
	  // Full Story Integration
	  UC.poller([
		function() {
		  var fs = window.FS;
		  if (fs && fs.setUserVars) return true;
		}
	  ], function () {
		window.FS.setUserVars({
		  experiment_str: 'SD010',
		  variation_str: 'Variation 1'
		});
	  }, { multiplier: 1.2, timeout: 0 });
  
  
	  /**
	  * UC Library - Observer
	  * @version 0.2.2
	  */
	  UC=function(a){var b=b||window.jQuery;return a.observer={active:[],connect:function(a,b,c){var d={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(c)for(var e in c)d[e]=c[e];else c=d;for(var f,g=new MutationObserver(function(c){c.forEach(function(c){f||(f=!0,b(a,c),setTimeout(function(){f=!1},d.throttle))})}),h=0;h<a.length;h++)g.observe(a[h],d.config),this.active.push([a[h],g])},disconnect:function(a){for(var c=this.active,d=0;d<a.length;d++)for(var e=a[d],f=0;f<c.length;f++)e===c[f][0]&&c[f][1].disconnect()}},a}(UC||{});
  
	  // Add MutationObserver to watch for changes on page
	  // (Fitlers are applied via AJAX rather than a page refresh)
	  
		// Get current URL
		var url = window.location.href;

		/*if filter is not checked run test*/
		var filtersBox = $('#showFilterBox_0 .amshopby-cat.amshopby-cat-level-1.amshopby-cat-multi.amshopby-cat-multiselected');

		var $AJAXContent = $('.col-main');
		UC.observer.connect($AJAXContent, function (element, mutation) {
			// check if URL has changed
			if (url !== window.location.href) {
				// update url var
				url = window.location.href;
				// check to see if filter is ticked
				if (!$('.main .col-left.sidebar .block-content #showFilterBox_0 li').hasClass('amshopby-cat-multiselected'));
				// reapply change
				initAlterPage();
			}

		}, { attributes: false, childList: true, subtree: false });

		if (!$(filtersBox).hasClass('amshopby-cat-multiselected')) {

			// reapply change
			initAlterPage();
		}

		// -----------------------------------------------
		// Main test
		// -----------------------------------------------
		function initAlterPage() {
			var $newLinkswrap = $("<div class='SD010_fastWrap'><h2 class='uc10_title'>Fast Track</h2></div>");
			$newLinkswrap.insertAfter('.cat-des');

			var pageHeading = $('.page-title.category-title:last').addClass('uc10title'),
				banner = $('.cat-des'),
				bannerText = $('<div class="SD010-bannerLink"><p>Find out more about our range</p></div>');

			// -----------------------------------------------
			// Show/Hide current banner
			// -----------------------------------------------	

			banner.before(pageHeading);

			bannerText.insertAfter(pageHeading);

			bannerText.click(function () {
				banner.toggleClass('active');
			});

			// -----------------------------------------------
			// Get category title for heading
			// -----------------------------------------------

			var title = $('.page-title.category-title h1:first').text().trim();
			$('<p>Shop our most visited categories within ' + title + '</p>').appendTo('.SD010_fastWrap');


			// -----------------------------------------------
			// Clone original filters
			// -----------------------------------------------

			var filterName = [];

			var filters = $('.col-left.sidebar #narrow-by-list #showFilterBox_0 li');

			filters.clone().appendTo('.SD010_fastWrap');

			// -----------------------------------------------
			// adding brand block links
			// -----------------------------------------------

			var brands = $(['<div class="SD010_brandbox"><h3>Most Popular Brands</h3></div>'].join(''));

			var brandImages = {
				nails: [{
					name: 'IBD',
					image: 'http://www.sitegainer.com/fu/up/gab848c4nxb8bfh.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/ibd'
				},
				{
					name: 'Orly',
					image: 'http://www.sitegainer.com/fu/up/67r2v5uqapmxi29.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/orly'
				},
				{
					name: 'Gellux',
					image: ' http://www.sitegainer.com/fu/up/bnn1xijrjo3c26d.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/gellux'
				},
				{
					name: 'Nails Inc',
					image: 'ttp://www.sitegainer.com/fu/up/6e2upxw2axk1mh0.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/nails-inc'
				},
				{
					name: 'NSI',
					image: 'http://www.sitegainer.com/fu/up/qn0s4qbjnnp97ol.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/nsi'
				},
				{
					name: 'Artistic',
					image: 'http://www.sitegainer.com/fu/up/hst25mizbaq745i.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/artistic'
				}

				],
				hair: [{
					name: 'Wella',
					image: 'http://www.sitegainer.com/fu/up/aeukafw6z5y035d.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/wella-professionals'
				},
				{
					name: 'L’Oreal',
					image: 'http://www.sitegainer.com/fu/up/qtf931l7o68trzm.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/l-oreal-professionnel'
				},
				{
					name: 'Parlux',
					image: 'http://www.sitegainer.com/fu/up/6c61h481lyqae1a.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/parlux'
				},
				{
					name: 'Babayliss',
					image: 'http://www.sitegainer.com/fu/up/fv33efaowjrhc57.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/babyliss-pro'
				},
				{
					name: 'Wahl',
					image: 'http://www.sitegainer.com/fu/up/afpp5pli85i9zf3.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/wahl'
				},
				{
					name: 'Procare',
					image: 'http://www.sitegainer.com/fu/up/stnt3iir93v50k7.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/procare'
				}
				],
				beauty: [{
					name: 'Salon System',
					image: 'http://www.sitegainer.com/fu/up/bw7b28kbcswtdpt.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/salon-system'
				},
				{
					name: 'Refectocil',
					image: ' http://www.sitegainer.com/fu/up/dvix9shqpyjv4kf.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/refectocil'
				},
				{
					name: 'Lotus Essentials',
					image: 'http://www.sitegainer.com/fu/up/bpnpxo5iw8jg92v.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/lotus-essentials'
				},
				{
					name: 'Kaeso',
					image: 'http://www.sitegainer.com/fu/up/mked7pwoe9jdlw4.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/kaeso'
				},
				{
					name: 'Sienna X',
					image: 'http://www.sitegainer.com/fu/up/ojj19yae7ewpg05.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/sienna-x'
				},
				{
					name: 'Babyliss Pro',
					image: 'http://www.sitegainer.com/fu/up/bpvede3r7vuodjg.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/babyliss-pro'
				}
				],
				haircol: [{
					name: 'Wella Koleston Perfect',
					image: ' http://www.sitegainer.com/fu/up/so93e3lniqfssbh.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/wella-professionals'
				},
				{
					name: "L'Oréal Majirel",
					image: 'http://www.sitegainer.com/fu/up/ucdnp8jl0d4lqkv.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/l-oreal-professionnel'
				},
				{
					name: 'Goldwell Topchic',
					image: 'http://www.sitegainer.com/fu/up/lbfq0r2k62g1wnw.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/goldwell-professionnel'
				},
				{
					name: 'Schwarzkopf Igora Royal',
					image: 'http://www.sitegainer.com/fu/up/pc4i32yoe0rwzv5.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/schwarzkopf-professionnel'
				},
				{
					name: 'Wella Colour Touch',
					image: 'http://www.sitegainer.com/fu/up/ky2lcud9aqz42sc.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/wella-professionals'
				},
				{
					name: "L'Oréal Dia Richesse",
					image: 'http://www.sitegainer.com/fu/up/77l9tqo4f5m5egl.jpg',
					brandLink: 'http://www.salonsdirect.com/brands/l-oreal-professionnel'
				}
				]
			};
			var expObjBrands;
			var breadcrumb = $('.breadcrumbs li:eq(1) a').text().trim();

			if (breadcrumb === 'NAILS') {
				expObjBrands = brandImages.nails;
			} else if (breadcrumb === 'HAIR') {
				expObjBrands = brandImages.hair;
			} else if (breadcrumb === 'BEAUTY') {
				expObjBrands = brandImages.beauty;
			} else if (breadcrumb === 'HAIR COLOUR') {
				expObjBrands = brandImages.haircol;
			}

			$.each(expObjBrands, function () {
				var brandName = this.name,
					brandImageurl = this.image,
					brandLinkurl = this.brandLink;

				var images = $([
					'<div class="SD010_brandimages">',
					'<a href="' + brandLinkurl + '">',
					'<img name = "' + brandName + '" src="' + brandImageurl + '"/>',
					'</a>',
					'</div>'
				].join(''));

				images.appendTo(brands);
			});

			brands.insertAfter('.refine-by-block');
		}
		
	   $('.SD010_fastWrap li').click(function() {
		  var name = $(this).find('a').text().trim();
		  window.ga(trackerName + '.send', 'event', 'SD010---Sub category- Quick links', 'category link clicked', 'Clicked category link' + name + ' SD010', {
			nonInteraction: 1
		  });
		});

  
		$('.page-header-container .logo').click(function () {
		  window.ga(trackerName + '.send', 'event', 'SD010---Sub category- Quick links', 'logo clicked', 'Clicked salons direct logo SD010', {
			nonInteraction: 1
			});


		});
		
  
	}

	
  })(jQuery);
  
  