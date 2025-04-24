var TG002 = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	
	UC.poller([
		'body',
		'#product-recommendations .slider-grouped-wrapper .product-name .no-std-link',
		function () {
			if (window.jQuery) {
				return true;
			}
		}
	], learnMore);

	UC.poller([
		'body',
		//'test element',
		function () {
			if (window.jQuery) {
				return true;
			}
		}
	], run);

	function run(){
		var $ = window.jQuery,
			slideArray = [],
			destSliderImg = [],
			destSliderTitle = [],
			destSliderContent = [],
			pageTitle = $('.product-view .product-shop .product-name h1').text();
		$('body').addClass('TG002');

		// UC.poller([
		// 	function() {
		// 		var fs = window.FS;
		// 		if (fs && fs.setUserVars) return true;
		// 	}
		// ], function () {
		// 	window.FS.setUserVars({
		// 		experiment_str: 'TG002',
		// 		variation_str: 'Variation 1'
		// 	});
		// }, { multiplier: 1.2, timeout: 0 });

		function specCheck(divText, divParent){
			switch (true){
				case divText.indexOf('Resistance Technology') !== -1:
					divParent.addClass('TG_tech-type');
					break;

				case divText.indexOf('Surface width') !== -1:
					divParent.addClass('TG_measure-type');
					break;

				case divText.indexOf('Surface length') !== -1:
					divParent.addClass('TG_measure-type');
					break;
				case divText.indexOf('Surface Trajectory Control') !== -1:
					divParent.addClass('TG_tech-type');
					break;

				case divText.indexOf('Equipment Weight') !== -1:
					divParent.addClass('TG_measure-type');
					break;

				case divText.indexOf('Interface') !== -1:
					divParent.addClass('TG_tech-type');
					break;

				case divText.indexOf('Network connectivity') !== -1:
					divParent.addClass('TG_tech-type');
					break;

				case divText.indexOf('Max speed') !== -1:
					divParent.addClass('TG_tech-type');
					break;

				case divText.indexOf('Length (') !== -1:
					divParent.addClass('TG_measure-type');
					break;

				case divText.indexOf('Width (') !== -1:
					divParent.addClass('TG_measure-type');
					break;

				case divText.indexOf('Height (') !== -1:
					divParent.addClass('TG_measure-type');
					break;

				case divText.indexOf('Running Surface') !== -1:
					divParent.addClass('TG_measure-type');
					break;

				case divText.indexOf('Motor power continuous duty') !== -1:
					divParent.addClass('TG_tech-type');
					break;

				case divText.indexOf('Material') !== -1:
					divParent.addClass('TG_tech-type');
					break;

				case divText.indexOf('Max. power') !== -1:
					divParent.addClass('TG_tech-type');
					break;

				case divText.indexOf('Measuring power') !== -1:
					divParent.addClass('TG_tech-type');
					break;

				case divText.indexOf('Transmission') !== -1:
					divParent.addClass('TG_tech-type');
					break;

				case divText.indexOf('Min Speed') !== -1:
					divParent.addClass('TG_measure-type');
					break;

				case divText.indexOf('Flywheel') !== -1:
					divParent.addClass('TG_measure-type');
					break;

				case divText.indexOf('Incline') !== -1:
					divParent.addClass('TG_measure-type');
					break;

				case divText.indexOf('Dimension') !== -1:
					divParent.addClass('TG_measure-type');
					break;

				case divText.indexOf('Speed range') !== -1:
					divParent.addClass('TG_measure-type');
					break;

				case divText.indexOf('Max user weight') !== -1:
					divParent.addClass('TG_measure-type');
					break;

				case divText.indexOf('WATT readability') !== -1:
					divParent.addClass('TG_tech-type');
					break;

				case divText.indexOf('Power requirement') !== -1:
					divParent.addClass('TG_tech-type');
					break;

				case divText.indexOf('Heart rate monitoring') !== -1:
					divParent.addClass('TG_tech-type');
					break;

				case divText.indexOf('Runner Detection System') !== -1:
					divParent.addClass('TG_tech-type');
					break;

				case divText.indexOf('mywellness® platform connectivity') !== -1:
					divParent.addClass('TG_tech-type');
					break;

				case divText.indexOf('Data transmmission') !== -1:
					divParent.addClass('TG_tech-type');
					break;
			}
		}

		var url = window.location;

		if (/skillrow.html/.test(url)) {
			$('#extended-top-title h3').remove();
			$('#collateral-tabs-content li:first-child .tab-content').text($('#extended-top-title').text());
			$('#extended-top-title').remove();
		}

		if($('#collateral-tabs li').length < 2){
			$('#collateral-tabs').hide();
		}

		$('.product-essential .swiper-slide').each(function(){
			var el = $(this);

			if(el.hasClass('swiper-slide-duplicate')){
			}
			else if(el.hasClass('swiper-slide-360')){
			}
			else if(el.hasClass('swiper-slide-video')){
				slideArray.push(el.find('iframe').attr('src'));
			}
			else if(el.find('img.gallery-image').is("[data-src]")){
				slideArray.push(el.find('img').attr('data-src'));
			}
			
			else{
				if(el.find('img.gallery-image').length){
					slideArray.push(el.find('img').attr('src'));
				}
			}
		});
		
		$('#feature-primary .swiper-container .swiper-slide').each(function(){
			var el = $(this);

			if(el.hasClass('swiper-slide-duplicate')){
			}
			else if(el.find('img').is("[data-src]")){
				destSliderImg.push(el.find('.background img').attr('data-src'));
				destSliderTitle.push(el.find('.post-content h3').text());
				destSliderContent.push(el.find('.post-content p').text());
			}
			else{
				destSliderImg.push(el.find('.background img').attr('src'));
				destSliderTitle.push(el.find('.post-content h3').text());
				destSliderContent.push(el.find('.post-content p').text());
			}
		});

		$('.product-img-box').remove();
		$('.product-shop').before('<div class="TG_main_slider-wrap"><div class="TG_main_slider"></div></div>');
		$('.product-main-info .regular-price').insertAfter('.product-collateral');
		$('.product-view .product-shop .line-page-link a').wrap('<div class="TG_line-wrap"></div>')
		$('.TG_line-wrap').insertAfter('.product-other-social a.button.btn-default');
		$('.TG_line-wrap a').text('View all ' + $('.TG_line-wrap a').text() + ' Line');

		var blockTitle = $('.product-view .box-related-posts .post-type-b2b .container .post-content h3').text();
			blockContent = $('.product-view .box-related-posts .post-type-b2b .container .post-content p').text();

		if(blockTitle == '' || blockContent == ''){

		}
		else{
			$('#product-info').after([
				'<div class="TG_tgl_set">',
					'<div class="TG_tgl-btns clearfix">',
						'<a href="#" class="TG_business-btn TG_active">' + pageTitle + ' for business</a>',
						'<a href="#" class="TG_home-btn">' + pageTitle + ' for home</a>',
					'</div>',
					'<div class="TG_content-wrap">',
						'<div class="TG_business-tgl TG_active">',
							'<h2>' + blockTitle + '</h2>',
							'<p>' + blockContent + '</p>',
						'</div>',
						'<div class="TG_home-tgl">',
							'<h2>GET THOSE SICK ASF ABS FAM AT YEM.</h2>',
							'<p>Users enjoy the most engaging all-round experience of Athletic Performance Training with SKILLMILL™ Connect, a fully connected product with a large backlit LCD display and data tracking function to assess personal workout parameters and results, and store them via the cloud-based mywellness® open platform.</p>',
						'</div>',
					'</div>',
				'</div>',
			].join(''));
		}

		$('.TG_tgl_set').after('<div class="TG_dest_wrap"><div class="TG_dest-inner"></div></div>');

		var busBtn = $('.TG_business-btn'),
			busContent = $('.TG_business-tgl'),
			homeBtn = $('.TG_home-btn'),
			homeContent = $('.TG_home-tgl');

		busBtn.on('click', function(e){
			e.preventDefault();

			if(busBtn.hasClass('TG_active')){
				busBtn.removeClass('TG_active');
				busContent.slideUp();
			}
			else {
				if(homeBtn.hasClass('TG_active')){
					homeBtn.removeClass('TG_active');
					busBtn.addClass('TG_active');
					homeContent.slideUp();
					busContent.slideDown();
				}
				else{
					busBtn.addClass('TG_active');
					busContent.slideDown();
				}
			}
		});

		homeBtn.on('click', function(e){
			e.preventDefault();

			if(homeBtn.hasClass('TG_active')){
				homeBtn.removeClass('TG_active');
				homeContent.slideUp();
			}
			else {
				if(busBtn.hasClass('TG_active')){
					busBtn.removeClass('TG_active');
					homeBtn.addClass('TG_active');
					busContent.slideUp();
					homeContent.slideDown();
				}
				else{
					homeBtn.addClass('TG_active');
					homeContent.slideDown();
				}
			}
		});


		

		$('.specification-list .attribute-box').each(function(){
			var el = $(this),
				specTitle = el.find('.list-label').text();

				specCheck(specTitle, el);
		});

		if ($('.TG_tech-type').length) {
			$('.feature-secondary-container').after([
				'<div class="TG_spec-wrap">',
					'<div class="TG_spec-inner">',
					'<h3>Specification</h3>',
					'<div class="TG_measurements-wrap clearfix">',
						'<h3>Measurements</h3>',
						'<div class="TG_tech-flex"></div>',
					'</div>',
					'<div class="TG_technical-wrap clearfix">',
						'<h3>Technical</h3>',
						'<div class="TG_measure-flex"></div>',
					'</div>',
				'</div>'
			].join(''));

			if ($('#product-recommendations .box-up-sell').length) {
				$('#product-recommendations .box-up-sell').after([
					'<div class="TG_contact-block">',
					'<div class="TG_contact-header">',
					'<h3>Contact</h3>',
					'<p>Have a question? Simply fill out this form and we will get <br /> back to you as soon as possible</p>',
					'</div>',
					'</div>'
				].join(''));
			}

			else {
				$('.TG_spec-wrap').addClass('TG_padd-override').append([
					'<div class="TG_contact-block">',
					'<div class="TG_contact-header">',
					'<h3>Contact</h3>',
					'<p>Have a question? Simply fill out this form and we will get <br /> back to you as soon as possible</p>',
					'</div>',
					'</div>'
				].join(''));
			}
		}

		if (/skillrow.html/.test(url)) {
			$('#feature-secondary').after([
				'<div class="TG_contact-block">',
				'<div class="TG_contact-header">',
				'<h3>Contact</h3>',
				'<p>Have a question? Simply fill out this form and we will get <br /> back to you as soon as possible</p>',
				'</div>',
				'</div>'
			].join(''));
		}
		else if ($('#product-recommendations .box-up-sell').length) {
			$('#product-recommendations .box-up-sell').after([
				'<div class="TG_contact-block">',
				'<div class="TG_contact-header">',
				'<h3>Contact</h3>',
				'<p>Have a question? Simply fill out this form and we will get <br /> back to you as soon as possible</p>',
				'</div>',
				'</div>'
			].join(''));
		}

		if (/treadmill-myrun.html/.test(url)) {
			$('#collateral-tabs').addClass('TG_li-fix');
		}

		$.ajax({
			url: 'https://www.technogym.com/gb/contacts/?reason=catalogue&sku=DBE03UT#contact-form',
			type: 'GET',
			dataType: 'html',
			success: function (data) {
				var $data = $(data);
				var $contactForm = $data.find('#contactForm');
				if ($contactForm.length) {
					$contactForm.appendTo($('.TG_contact-block'));
					$('.TG_contact-block').find('.buttons-set .button').text('Contact');
					$('#product-name, #product').val(pageTitle);
				}
			}
		});

		$('.TG_measure-type').appendTo('.TG_measure-flex');
		$('.TG_tech-type').appendTo('.TG_tech-flex');

		var mainSlider = $('.TG_main_slider'),
			ajaxPromiseArray = [];

		for (i = 0; i < destSliderTitle.length; i++) {
			var destTitle = destSliderTitle[i],
				destContent = destSliderContent[i],
				destImg = destSliderImg[i];

			$('.TG_dest-inner').append([
				'<div class="TG_detail_block">',
				'<div class="TG_img-wrap">',
				'<div style="background-image: url(' + destImg + ')"></div>',
				'</div>',
				'<div class="TG_details-wrap">',
				'<h2>' + destTitle + '</h2>',
				'<p>' + destContent + '</p>',
				'</div>',
				'</div>',
			].join(''));
		}

		$('.start-configuration').on('click', function(){
			$('.product-collateral + .regular-price').hide();
		});

		$('.close-configurator').on('click', function(){
			$('.product-collateral + .regular-price').show();
		});

		for (i = 0; i < slideArray.length; i++) {
			if (slideArray[i] !== null || typeof slideArray[i] !== 'undefined') {
				if (slideArray[i].indexOf("vimeo") >= 0) {
					var slideSrc = slideArray[i];
					var spliceVimeoID = slideSrc.match(/player\.vimeo\.com\/video\/([0-9]*)/);

					if (spliceVimeoID && spliceVimeoID[1]) {
						var ajaxCall = $.ajax({
							type: 'GET',
							url: '//vimeo.com/api/v2/video/' + spliceVimeoID[1] + '.json',
							jsonp: 'callback',
							dataType: 'jsonp',
							success: function (data) {
								var thumbnail_src = data[0].thumbnail_large;
								mainSlider.append([
									'<div class="TG_main_slide">',
									'<div class="TG_video_block">',
									'<div class="TG_video_thumbnail" style="background-image: url(' + thumbnail_src + ');"></div>',
									'<div class="TG_video">',
									'<iframe src="' + slideSrc + '" frameborder="0" allowfullscreen>',
									'</iframe>',
										'</div>',
										'<a href="#" class="TG_video_play"></a>',
									'</div>',
								'</div>',
							].join(''));
						}
					});
					ajaxPromiseArray.push(ajaxCall);
				}
			}
			else{
				mainSlider.append([
					'<div class="TG_main_slide" style="background-image: url(' + slideArray[i] + ');">',
					'</div>',
				].join(''));
			}
			}
		}

		if (/skillrow.html/.test(url)) {
			var extendVid = $('#extended-top iframe').attr('src'),
				spliceExtID = extendVid.match(/player\.vimeo\.com\/video\/([0-9]*)/);
			
			var ajaxCall = $.ajax({
				type:'GET',
				//url: '//vimeo.com/api/v2/video/' + spliceExtID[1] + '.json',
				url: '//vimeo.com/api/v2/video/207777723.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function(data){
					var thumbnail_src = data[0].thumbnail_large;
					mainSlider.append([
						'<div class="TG_main_slide">',
							'<div class="TG_video_block">',
								'<div class="TG_video_thumbnail" style="background-image: url(' + thumbnail_src + ');"></div>',
								'<div class="TG_video">',
									'<iframe src="' + extendVid + '" frameborder="0" allowfullscreen>',
									'</iframe>',
								'</div>',
								'<a href="#" class="TG_video_play"></a>',
							'</div>',
						'</div>',
					].join(''));
				}
			});
			ajaxPromiseArray.push(ajaxCall);
		}

		$.when.apply(undefined, ajaxPromiseArray).then(function() {
			UC.poller([
				function () {
					if (window.jQuery().slick) {
						return true;
					}
				}
			], slickFN);

			function slickFN(){
				$(".TG_main_slider").slick({
					dots: false,
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplaySpeed: 3000
				});

				$(".TG_video_play").on('click', function (e) {
					e.preventDefault();
					 var vidWrap = $(this).parent(),
						iframe = vidWrap.find('.TG_video iframe'),
						iframeSrc = iframe.attr('src'),
						iframePlay = iframeSrc.replace('&autoplay=0', '&autoplay=1');
					
					/* on click, find the parent
						find the iframe inside the parent
						store the src of the iframe in the variable iframeSrc
						change the autoplay string to true/1
					*/

					vidWrap.children('.TG_video_thumbnail').fadeOut();
					vidWrap.children('.TG_video_play').fadeOut();
					vidWrap.find('.TG_video iframe').attr('src', iframePlay);
					
					/* Fade the thumbnail and play button out
						change the iframe src to the autoplay version to start the video
					*/
				});
			}
		});
	}

	function learnMore(){
		var $ = window.jQuery;
		$('#product-recommendations .slider-grouped-wrapper .product-name .no-std-link').each(function(){
			$(this).append('<br /><span class="TG_learn-more">Learn more</span>');
		});
	}
})();