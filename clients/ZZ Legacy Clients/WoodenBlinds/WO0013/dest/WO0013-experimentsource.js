var WO0013 = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	var JQ = window.jQuery,
		trackerName,
		slideQ = false,
		tglEvent = false,
		vidEvent = false;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'.mobile-usp.col-md-12',
			function () {
				if (window.jQuery) {
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
				experiment_str: 'WO0013',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });

		var sendEvent = (function() {
			return function (category, action, label, nonInteractionValue, dimensionValue, dimensionName) {
		        var fire = function (tracker) {
		            var options = {};
		            options.nonInteraction = nonInteractionValue;
		            if(dimensionValue && dimensionName){
		                options['dimension' + dimensionValue] = dimensionName;
		            }
		            window.ga(tracker + '.send', 'event', category, action, label, options);
		        };

		        if (trackerName) {
		            fire(trackerName);
		        } else {
		            UC.poller([
		                function () {
		                    return window.ga.getAll;
		                }
		            ], function () {
		                trackerName = window.ga.getAll()[0].get('name');
		                fire(trackerName);
		            });
		        }
	   		}
			//sendEvent('WO0013', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
			//sendEvent('WO0013', 'Closed Trade Modal', '', true);	
		})();

		var cacheDom = (function() {
			//Cache useful selectors for later use
			var bodyVar = JQ('body'),
				URL = window.location.href,
				URLPath = window.location.pathname;

			var contentWrap = JQ('#content'),
				mobileUSPBlock = contentWrap.find('.mobile-usp.col-md-12'),
				touchedDesignBlock = contentWrap.find('.mobile-usp.col-md-12 + .col-xs-12');

			// Set up future variables for markup thats being inserted
			var measureBlockWrap,
				tglWrap;

			bodyVar.addClass('WO0013');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				URL: URL,
				mobileUSPBlock: mobileUSPBlock,
				contentWrap: contentWrap,
				touchedDesignBlock: touchedDesignBlock,
				measureBlockWrap: measureBlockWrap,
				URLPath: URLPath
			};
		})();

		var addMesurementsMarkup = {
			// Add new markup
			contentBuilder: function(){
				var addMarkup = [
					'<div class="WO0013_add-block-wrap">',
						'<div class="WO0013_add-block">',
							'<a href="#" class="WO0013_reveal-measurements"><span>+</span> Add Measurements</a>',
							'<div class="WO0013-reveal clearfix">',
								'<a href="#" class="WO0013_video-btn"><span class="WO0013_play-ico"></span>Watch our 2m video on <br class="WO0013_tb-hide" /> how to measure your blinds</a>',
								'<div class="WO0013_measurement-slider WO0013_right">',
									'<span class="WO0013_all-btn">INCHES</span>',
									'<a href="#" class="WO0013_limited-tgl"><span></span></a>',
									'<span class="WO0013_limited-btn">CM</span>',
								'</div>',
								'<div id="quickQuote" class="clearfix hide-mobile js-show-qq" style="display: block;">',
									'<div class="form-group">',
										'<form action="/stores/quick_quote" controller="Stores" id="quick_quote_form" method="get" accept-charset="utf-8">',
											'<div class="WO0013_input-wrap">',
												'<label>Width</label>',
												'<input name="width" type="number" id="width" class="form-control" step="0.1" value="15">',
												'<div class="WO0013_error"></div>',
											'</div>',
											'<div class="WO0013_input-wrap">',
												'<label>Height</label>',
												'<input name="drop" type="number" id="drop" class="form-control" step="0.1" value="10">',			
												'<div class="WO0013_error"></div>',
											'</div>',
											'<div class="submit"><input class="WO0013-submit" name="quote_price" id="quote_price" type="submit" value="Continue">',
											'</div>',
											'<a href="/guides" class="WO0013-help">Dont\'t know your window measurements? Get help here</a>',
										'</form>', 
									'</div>',
								'</div>',
							'</div>',
						'</div>',
					'</div>'
				 ].join('');

				// check if the extra 10% off message is there, if not append it after the next day message
				if(cacheDom.touchedDesignBlock.length > 0){
					cacheDom.touchedDesignBlock.after(addMarkup);
				}
				else{
					cacheDom.mobileUSPBlock.after(addMarkup);
				}

				// Cache new selectors for later use
				cacheDom.measureBlockWrap = JQ('.WO0013_add-block-wrap');
				cacheDom.tglWrap = cacheDom.measureBlockWrap.find('.WO0013_measurement-slider');
			},
			// Check if user has user is on the results page, if so check if they last used inches or cm's 
			// checkIfPreviousValue: function(){
			// 	var searchCheck = JQ('.qq-search-result'),
			// 		dropText = JQ('#drop').val();

			// 	if(searchCheck.length > 0){
			// 		if(searchCheck.text().indexOf(dropText) > -1){
			// 		}
			// 		else{
			// 			cacheDom.tglWrap.removeClass('WO0013_right').addClass('WO0013_left');
			// 		}
			// 	}
			// }
		}

		var modalMarkup = {
			// Append video modal to body
			insertMarkup: function(){
				cacheDom.bodyVar.append([
					'<div class="WO0013_pop-up_modal">',
						'<div>',
							'<a href="#" class="WO0013_close_btn">X</a>',
							'<div class="WO0013_overflow_fix">',
								'<iframe width="560" height="315" src="https://www.youtube.com/embed/2q8VrqLfdMA?&showinfo=0&controls=0" frameborder="0" allowfullscreen></iframe>',
							'</div>',
						'</div>',
					'</div>'
				].join(''));
			}
		}

		var elementBindings = {
			// Click function for the mobile tab variation to show the hidden options
			markupRevealClickOn: function(){
				cacheDom.measureBlockWrap.find('.WO0013_reveal-measurements').on('click', function(e){
					e.preventDefault();
					var el = JQ(this);

					if(el.hasClass('WO_active')){
						return false;
					}
					else{
						el.addClass('WO_active').find('span').fadeOut();
						cacheDom.measureBlockWrap.find('.WO0013-reveal').slideDown();
					}
				});
			},
			// Inches - CM toggle click
			measurementToggle: function(){
				cacheDom.tglWrap.find('.WO0013_limited-tgl').on('click', function(e){
					e.preventDefault();
					// If the wrap has left class, change it to right and add bodyclass
					if(slideQ === false){
						slideQ = true;
						var el = JQ(this),
							elWrap = el.closest('.WO0013_measurement-slider');

						if(elWrap.hasClass('WO0013_left')){
							elWrap.addClass('WO0013_right').removeClass('WO0013_left');
						}
						else{
							elWrap.addClass('WO0013_left').removeClass('WO0013_right');
						}

						setTimeout(function(){ 	
							slideQ = false;
						}, 300);

						if(tglEvent === false){
							sendEvent('WO0013', 'User clicked Toggle', 'Toggled limited items', true);
							tglEvent = true;
						}
					}
				});
			},
			// If user clicks inches label, check if they are currently on inches or CM's, if CM's, change it to inches
			InchesBtnClick: function(){
				cacheDom.tglWrap.find('.WO0013_all-btn').on('click', function(){
					// If wrap has left class, do nothing otherwise toggle limited items
					if(slideQ === false){
						slideQ = true;
						var el = JQ(this),
							elWrap = el.closest('.WO0013_measurement-slider');

						if(elWrap.hasClass('WO0013_left')){
							slideQ = false;
						}
						else{
							elWrap.addClass('WO0013_left').removeClass('WO0013_right');

							setTimeout(function(){ 
								slideQ = false;
							}, 300);
						}
					}
				});
			},
			// If user clicks CM's label, check if they are currently on inches or CM's, if Inches's, change it to CM's
			CMBtnClick: function(){
				cacheDom.tglWrap.find('.WO0013_limited-btn').on('click', function(){
					// If wrap has right class, toggle limited items otherwise do nothing
					if(slideQ === false){
						slideQ = true;
						var el = JQ(this),
							elWrap = el.closest('.WO0013_measurement-slider');

						if(elWrap.hasClass('WO0013_right')){
							slideQ = false;
						}
						else{
							elWrap.addClass('WO0013_right').removeClass('WO0013_left');
							
							if(tglEvent === false){
								sendEvent('WO0013', 'User clicked Toggle', 'Toggled limited items', true);
								tglEvent = true;
							}

							setTimeout(function(){ 
								slideQ = false;
							}, 300);
						}
					}
				});
			},
			// Modal open and close clicks
			modalPopup: function(){
				var modal = JQ(".WO0013_pop-up_modal");

				JQ(".WO0013_video-btn,.WO0013_pop-up_modal .WO0013_close_btn").on("click", function(e) {
					if (slideQ === false) {
						slideQ = true;
						e.preventDefault();

						if (modal.hasClass("active")) {
							modal.fadeOut("slow", function() {
								modal.removeClass("active");
								slideQ = false;
							});
						} else {
							modal.fadeIn("slow", function() {
								if(vidEvent === false){
									vidEvent = false;
									sendEvent('WO0013', 'User clicked video button', '', true);
								}

								modal.addClass("active");
								slideQ = false;
							});
						}
					}
				});

				JQ(document).on("mousedown", function(e) {
					if (!$(e.target).closest(".WO0013_pop-up_modal > div").length) {
						if (modal.hasClass("active")) {
							modal.fadeOut("slow", function() {
								modal.removeClass("active");
								slideQ = false;
							});
						}
					}
				});
			}
		};

		var inputValidation = {
			// On input blur check if input has a valid number, if not throw error
			inputBlur: function(){
				cacheDom.measureBlockWrap.find('input').on('blur', function(){
					var el = JQ(this),
						elVal = el.val();
					
					if(elVal){
						if(regex.decimalCheck(elVal)){
						}
						else{
							el.parent().find('.WO0013_error').text('You have entered an invalid number, only use one decimal place and try again').slideDown();
						}
					}
				});
			},
			// On continue click
			submitValidation: function(){
				cacheDom.measureBlockWrap.find('.WO0013-submit').on('click', function(e){
					e.preventDefault();
					var errorCheck = 0;

					// Go through each width and height input
					cacheDom.measureBlockWrap.find('input[type="number"]').each(function(){
						var el = JQ(this),
							elVal = el.val(),
							elParent = el.parent();

						if(elVal){
							// If it has a value check if it matches regex otherwise throw error
							if(regex.decimalCheck(elVal)){
							}
							else{
								// Failed match throw error
								errorCheck++;
								elParent.find('.WO0013_error').text('You have entered an invalid number, only use one decimal place and try again').slideDown();
							}
						}
						else{
							// No value throw error
							errorCheck++;
							elParent.find('.WO0013_error').text('Please enter a value').slideDown();
						}
					});

					if(errorCheck > 0){
						// If there was no errors
					}
					else{
						// match pattern and create custom path to take the user to
						var pattern = /.+?\/([^\/]+)/,
							slug = cacheDom.URLPath.match(pattern);

						if(cacheDom.tglWrap.hasClass('WO0013_left')){
							sendEvent('WO0013', 'User clicked continue', 'Inches measurement', true);
							window.location.href = '/stores/quick_quote?width=' + round.roundFunc(parseFloat(JQ('#drop').val()) * 2.54, 1) + '&drop=' + round.roundFunc(parseFloat(JQ('#width').val()) * 2.54, 1) + "&slug=" + slug[1] + '&quote_price=Get+Price';
						}
						else{
							sendEvent('WO0013', 'User clicked continue', 'CM Measurement', true);
							window.location.href = '/stores/quick_quote?width=' + parseFloat(JQ('#drop').val()) + '&drop=' + parseFloat(JQ('#width').val()) + "&slug=" + slug[1] +  '&quote_price=Get+Price';
						}
						
					}
				});
			}
		}

		var regex = {
			// Check for more than 1 decimal
			 decimalCheck: function(str){
				 var re = /^\d{0,3}(?:\.\d)?$/;
				 return re.test(str);
			 }
		}

		var round = {
			// Round number off
			 roundFunc: function(number, precision) {
				var pair = (number + 'e').split('e')
				var value = Math.round(pair[0] + 'e' + (+pair[1] + precision))
				pair = (value + 'e').split('e')
				return +(pair[0] + 'e' + (+pair[1] - precision))
			}
		}

		// Build new markup
		addMesurementsMarkup.contentBuilder();
		//addMesurementsMarkup.checkIfPreviousValue();
		modalMarkup.insertMarkup();

		// Bind click functions
		elementBindings.markupRevealClickOn();
		elementBindings.CMBtnClick();
		elementBindings.InchesBtnClick();
		elementBindings.measurementToggle();
		elementBindings.modalPopup();

		// Set validation
		inputValidation.inputBlur();
		inputValidation.submitValidation();
	}	
})();