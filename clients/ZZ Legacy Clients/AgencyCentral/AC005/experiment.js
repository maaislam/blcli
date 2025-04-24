// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

var AC005 = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	var trackerName,
		slideQ = false,
		JQ;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'.contact-link.contact-option-container',
			'.contact-link.contact-option-container[data-action="telfax"]',
			function () {
				if (window.jQuery) {
					 JQ = window.jQuery;
					return true;
				}
			}
		], init);
	})();
	
    function init(){
		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'AC005',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });

		var sendEvent = (function () {
			return function (category, action, label, nonInteractionValue, dimensionValue, dimensionName) {        
				var fire = function (tracker) {            
					var options = {};            
					options.nonInteraction = nonInteractionValue;            
					if (dimensionValue && dimensionName) {                
						options['dimension' + dimensionValue] = dimensionName;            
					}            
					window.ga(tracker + '.send', 'event', category, action, label, options);        
				};
			 
				if (trackerName) {            
					fire(trackerName);        
				} else {            
					UC.poller([
						function () {
							try {
								return !!window.ga.getAll();
							} catch (err) {
							}
						}], function () {
					});      
				}   
			}
		})();

		var cookieGet = (function(){
			return function (name) {
				var match = document.cookie.match(name+'=([^;]*)');
				return match ? match[1] : undefined;
			}
		})();

		var cacheDom = (function() {
			//Cache useful selectors for later use
			var bodyVar = JQ('body'),
				URL = window.location.href;

			// Phone number element
			var agencyRow = JQ('.agency-result'),
				displayPhoneBtn = agencyRow.find('.contact-link.contact-option-container[data-action="telfax"]'),
				displayWesbiteBtn = agencyRow.find('.contact-link.contact-option-container[data-action="website"]'),
				numberWrap,
				storedTel;
			
			var cookieCheck = cookieGet('rememberedContactDetails');

			if(cookieCheck !== undefined){
				var decodeCookie = JSON.parse(decodeURIComponent(cookieCheck));
			}
			bodyVar.addClass('AC005');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				URL: URL,
				agencyRow: agencyRow,
				displayPhoneBtn: displayPhoneBtn,
				numberWrap: numberWrap,
				storedTel: storedTel,
				cookieCheck: cookieCheck,
				displayWesbiteBtn: displayWesbiteBtn,
				decodeCookie: decodeCookie
			};
		})();

		var createNumberDD = {
			contentBuilder: function(){
				cacheDom.displayPhoneBtn.after([
					'<div class="col-xs-12 col-sm-4 col-md-12 AC005_input-wrap">',
						'<div class="AC005_tel-number"></div>',
						'<div class="AC005-preload-content">',
							'<p class="AC005_error">The company name must not be empty.</p>',
							'<div class="AC005_input-inner">',
								'<input type="text" placeholder="Enter your Company Name" />',
								'<a href="#" class="AC005_show-mobile">Show Number</a>',
							'</div>',
							'<p>Entering your company name lets the recruiter know where you found their details.</p>',
							'<p>We WILL NOT ask you to leave your own name or contact information.</p>',
						'</div>',
						'<div class="AC005_pre-cover">',
							'<div class="AC005_loader-wrapper">',
								'<div class="AC005_loader">',
									'<div class="AC005_roller"></div>',
									'<div class="AC005_roller"></div>',
								'</div>',
								'<div id="AC005_loader2" class="AC005_loader">',
									'<div class="AC005_roller"></div>',
									'<div class="AC005_roller"></div>',
								'</div>',
								'<div id="AC005_loader3" class="AC005_loader">',
									'<div class="AC005_roller"></div>',
									'<div class="AC005_roller"></div>',
								'</div>',
							'</div>',
						'</div>',
					'</div>'
				].join(''));

				cacheDom.displayWesbiteBtn.after([
					'<div class="col-xs-12 col-sm-4 col-md-12 AC005_input-wrap">',
						'<div class="AC005_web-redirect"><a href="#">Visit Website</a></div>',
						'<div class="AC005_redirecting">Redirecting...</div>',
						'<div class="AC005-preload-content">',
							'<p class="AC005_error">The company name must not be empty.</p>',
							'<div class="AC005_input-inner">',
								'<input type="text" placeholder="Enter your Company Name" />',
								'<a href="#" class="AC005_show-web">Show</a>',
							'</div>',
							'<p>Entering your company name lets the recruiter know where you found their details.</p>',
							'<p>We WILL NOT ask you to leave your own name or contact information.</p>',
						'</div>',
						'<div class="AC005_pre-cover">',
							'<div class="AC005_loader-wrapper">',
								'<div class="AC005_loader">',
									'<div class="AC005_roller"></div>',
									'<div class="AC005_roller"></div>',
								'</div>',
								'<div id="AC005_loader2" class="AC005_loader">',
									'<div class="AC005_roller"></div>',
									'<div class="AC005_roller"></div>',
								'</div>',
								'<div id="AC005_loader3" class="AC005_loader">',
									'<div class="AC005_roller"></div>',
									'<div class="AC005_roller"></div>',
								'</div>',
							'</div>',
						'</div>',
					'</div>'
				].join(''));

				cacheDom.numberWrap = JQ('.AC005_input-wrap');
			}
		}
	
		var elementBindings = {
			// Click function for the mobile tab variation to show the hidden options
			displayPhoneClick: function(){
				cacheDom.displayPhoneBtn.on('click', function(e){
					if(slideQ === false){
						var el = JQ(this),
							visibleNumCheck = JQ('.AC005_visible'),
							nextWrap = el.next(cacheDom.numberWrap);

						slideQ = true;

						cacheDom.bodyVar.removeClass('AC005_email-click');
						cacheDom.cookieCheck = cookieGet('rememberedContactDetails');

						if(cacheDom.cookieCheck !== undefined){
							cacheDom.decodeCookie = JSON.parse(decodeURIComponent(cacheDom.cookieCheck));
						}
						sendEvent('AC005', 'Click', 'Display Phone Number', true);

						if(visibleNumCheck[0] == nextWrap[0]){
							visibleNumCheck.removeClass('AC005_visible AC005_loaded').slideUp(function(){
								slideQ = false;
							});
						}
						else if(visibleNumCheck.length > 0){
							visibleNumCheck.slideUp().removeClass('AC005_visible AC005_loaded');
							nextWrap.addClass('AC005_visible AC005_preload-anim').slideDown(function(){
								slideQ = false;
							});
						}
						else{
							nextWrap.addClass('AC005_visible AC005_preload-anim').slideDown(function(){
								slideQ = false;
							});
						}

						if(cacheDom.cookieCheck !== undefined){
							if(cacheDom.decodeCookie.userDetails.companyName !== null || cacheDom.bodyVar.hasClass('AC005_set-company-cookie')){
								UC.poller([
									'.inner-contact-body .telephone-link',
									function () {
										if (window.jQuery) {
											return true;
										}
									}
								], function(){
									nextWrap
										.find('.AC005_tel-number')
										.text(JQ('.inner-contact-body .telephone-link').text()).fadeIn('400');

									nextWrap.removeClass('AC005_preload-anim').addClass('AC005_number-show');
								});	
							}
							else{
								UC.poller([
									'.inner-contact-body #contact-form',
									function () {
										if (window.jQuery) {
											return true;
										}
									}
								], function(){
									nextWrap.addClass('AC005_loaded');
									setTimeout(function(){ 
										nextWrap.removeClass('AC005_preload-anim');
									}, 500);
								});
							}
						}
						else{
							UC.poller([
							'.inner-contact-body #contact-form',
								function () {
									if (window.jQuery) {
										return true;
									}
								}
							], function(){
								nextWrap.addClass('AC005_loaded');
								setTimeout(function(){ 
									nextWrap.removeClass('AC005_preload-anim');
								}, 500);
							});
						}						
					}
				});
			},
			displayWebsiteClick: function(){
				cacheDom.displayWesbiteBtn.on('click', function(e){
					cacheDom.cookieCheck = cookieGet('rememberedContactDetails');

					sendEvent('AC005', 'Click', 'Visit Website', true);
					cacheDom.bodyVar.removeClass('AC005_email-click');
					if(cacheDom.cookieCheck !== undefined){
						cacheDom.decodeCookie = JSON.parse(decodeURIComponent(cacheDom.cookieCheck));
					}
					if(slideQ === false){
						var el = JQ(this),
							visibleNumCheck = JQ('.AC005_visible'),
							nextWrap = el.next(cacheDom.numberWrap);

						slideQ = true;

						if(visibleNumCheck[0] == nextWrap[0]){
							visibleNumCheck.removeClass('AC005_visible AC005_loaded').slideUp(function(){
								slideQ = false;
							});
						}
						else if(visibleNumCheck.length > 0){
							visibleNumCheck.slideUp().removeClass('AC005_visible AC005_loaded');
							nextWrap.addClass('AC005_visible AC005_preload-anim').slideDown(function(){
								slideQ = false;
							});
						}
						else{
							nextWrap.addClass('AC005_visible AC005_preload-anim').slideDown(function(){
								slideQ = false;
							});
						}
						
						if(cacheDom.cookieCheck !== undefined){
							if(cacheDom.decodeCookie.userDetails.companyName !== null || cacheDom.bodyVar.hasClass('AC005_set-company-cookie')){
								nextWrap.removeClass('AC005_preload-anim').addClass('AC005_number-show');
								nextWrap.find('.AC005_web-redirect').hide();
								nextWrap.find('.AC005_redirecting').fadeIn('400');
								slideQ = true;
								setTimeout(function(){ 
									nextWrap.slideUp(function(){
										nextWrap.removeClass('AC005_preload-anim AC005_visible AC005_number-show AC005_loaded')
										.find('.AC005_redirecting').fadeOut('400');
										slideQ = false;
									});
								}, 2000);
							}
						}

						UC.poller([
							'.inner-contact-body #contact-form',
							function () {
								if (window.jQuery) {
									return true;
								}
							}
						], function(){
							nextWrap.addClass('AC005_loaded');
							setTimeout(function(){ 
								nextWrap.removeClass('AC005_preload-anim');
							}, 500);
						});
					}
				});
			},
			showWebClick: function(){
				cacheDom.numberWrap.find('.AC005_show-web').on('click', function(e){
					e.preventDefault();

					var el = JQ(this),
						elParent = el.closest('.AC005-preload-content'),
						elInput = elParent.find('.AC005_input-inner input'),
						elError = elParent.find('.AC005_error'),
						elVal = elInput.val(),
						elWrap = el.closest('.AC005_input-wrap');

					if(cacheDom.cookieCheck !== undefined){
						if(cacheDom.decodeCookie.userDetails.companyName !== null || cacheDom.bodyVar.hasClass('AC005_set-company-cookie')){
							elError.slideUp();
							elParent.find('.AC005_redirecting').fadeIn('400');
							elWrap.removeClass('AC005_preload-anim').addClass('AC005_number-show');
						}
						else{
							if(elVal == ''){
								elError.slideDown();
							}
							else{
								sendEvent('AC005', 'Click', 'Entered company name, Show Website Link', true);
								elError.slideUp();
								elWrap.find('.AC005_web-redirect').fadeIn('400');
								elWrap.removeClass('AC005_preload-anim').addClass('AC005_number-show');
								JQ('.inner-contact-body #contact-form input[type="text"]').val(elVal);
							}
						}
					}
					else{
						if(elVal == ''){
							elError.slideDown();
						}
						else{
							sendEvent('AC005', 'Click', 'Entered company name, Show Website Link', true);
							elError.slideUp();
							elWrap.find('.AC005_web-redirect').fadeIn('400');
							elWrap.removeClass('AC005_preload-anim').addClass('AC005_number-show');
							JQ('.inner-contact-body #contact-form input[type="text"]').val(elVal);
						}
					}
				});
			},
			visitWebsiteClick: function(){
				JQ('.AC005_web-redirect a').on('click', function(e){
					e.preventDefault();
					JQ('#contact-form-container .inner-contact-body input[type="submit"]').click();
					sendEvent('AC005', 'Click', 'Visit Website Link', true);
				});
			},
			showMobileClick: function(){
				cacheDom.numberWrap.find('.AC005_show-mobile').on('click', function(e){
					e.preventDefault();

					var el = JQ(this),
						elParent = el.closest('.AC005-preload-content'),
						elInput = elParent.find('.AC005_input-inner input'),
						elError = elParent.find('.AC005_error'),
						elVal = elInput.val(),
						elWrap = el.closest('.AC005_input-wrap');

					if(elVal == ''){
						elError.slideDown();
					}
					else{
						sendEvent('AC005', 'Click', 'Show telephone number', true);
						elError.slideUp();
						JQ('.inner-contact-body #contact-form input[type="text"]').val(elVal);
						JQ('.inner-contact-body #contact-form input[type="submit"]').click();

						elWrap.removeClass('AC005_loaded').addClass('AC005_preload-anim');

						UC.poller([
							'.inner-contact-body .telephone-link',
							function () {
								if (window.jQuery) {
									return true;
								}
							}
						], function(){
							elWrap
								.find('.AC005_tel-number')
								.text(JQ('.inner-contact-body .telephone-link').text()).fadeIn('400');

							elWrap.removeClass('AC005_preload-anim').addClass('AC005_number-show');
						});	
					}
				});
			},
			otherTabClick: function(){
				JQ('.contact-link.contact-option-container[data-action="email"]').on('click', function(){
					cacheDom.bodyVar.addClass('AC005_email-click');
					sendEvent('AC005', 'Click', 'Email Agency click', true);
				});
			}
		};

		// Build new markup
		createNumberDD.contentBuilder();

		// Bind click events
		elementBindings.displayPhoneClick();
		elementBindings.displayWebsiteClick();

		elementBindings.showMobileClick();
		elementBindings.showWebClick();

		elementBindings.visitWebsiteClick();
		elementBindings.otherTabClick();
	}	
})();