var TG015 = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	var JQ = window.jQuery,
		trackerName;
	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'body',
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
				experiment_str: 'TG015',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });

		var cacheDom = (function() {
			//Cache useful selectors for later use
			var bodyVar = JQ('body'),
				URL = window.location.href,
				mainWrap = bodyVar.find('#main .post-container'),
				mainTitle = mainWrap.find('h1.post-title');
				mainSubTitle = mainWrap.find('h5.post-subtitle'),
				videoWrap = mainWrap.find('#top-image');

			// Password selectors
            var password,
                passwordConfirm,
                nameFirstInput,
				nameLastInput,
                emailInput,
                emailConfirmInput,
				formWrap,
				numberInput;

			bodyVar.addClass('TG015');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				URL: URL,
				mainWrap: mainWrap,
				mainTitle: mainTitle,
				mainSubTitle: mainSubTitle,
				videoWrap: videoWrap,
				password: password,
                passwordConfirm: passwordConfirm,
                formWrap: formWrap,
                nameFirstInput: nameFirstInput,
				nameLastInput: nameLastInput,
                emailInput: emailInput,
                emailConfirmInput: emailConfirmInput,
				numberInput: numberInput
			};
		})();

		var contentChange = {
			// Change text for content that already exists on the page
			originalElements: function(){
				cacheDom.mainTitle.text('Skill line - For real and effective athletic training');
				cacheDom.mainSubTitle.html('Developed in collaboration with athletes and academic research institites,<br /> SKILL LINE enables everyday athletes to improve their Power, Speed, Stamina and Agility');
			}
		};

		var productRange = {
			contentBuilder: function(){
				cacheDom.mainSubTitle.after([
					'<div class="TG015_product_range clearfix">',
						'<h2>Skill line product range</h2>',
						'<div class="TG015_product-block">',
							'<div class="TG015_img"><img src="https://www.technogym.com/wpress/wp-content/uploads/2016/02/skillmill_connect__related.jpg" /></div>',
							'<div class="TG015_prod-content">',
								'<h3>SKILLROW</h3>',
								'<p>SKILLROW is the first connected indoor rowing machine that trains both cardio and power at an athletes level</p>',
								'<a href="#" class="TG015_cta">Learn more</a>',
							'</div>',
						'</div>',
						'<div class="TG015_product-block">',
							'<div class="TG015_img"><img src="https://www.technogym.com/wpress/wp-content/uploads/2016/02/skillmill_connect__related.jpg" /></div>',
							'<div class="TG015_prod-content">',
								'<h3>SKILLMILL</h3>',
								'<p>SKILLMILL is the first product allowing you to improve Power, Speed, Stamina and Agility in a safe way</p>',
								'<a href="#" class="TG015_cta">Learn more</a>',
							'</div>',
						'</div>',
					'</div>',
					'<div class="TG015_video-wrap">',
						'<iframe src="https://player.vimeo.com/video/234536373?color=ffffff&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
					'</div>'
				].join(''));
			}
		};

		var skillrowSection = {
			contentBuilder: function(){
				cacheDom.videoWrap.after([
					'<div class="TG015_max-margin">',
						'<div class="TG015_product-row clearfix">',
							'<div class="TG015_content">',
								'<h3>Skillrow</h3>',
								'<p>SKILLROW is the first connected indoor rowing machine that trains both cardio and power at an athletes level</p>',
								'<a href="#" class="TG015_cta">View product details</a>',
							'</div>',
							'<div class="TG015_main-image">',
								'<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/03_ARTIS_1920x500-1.jpg" />',
							'</div>',
							'<div class="TG015_side-images">',
								'<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Bon-Marché.jpg" />',
								'<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/mywellness-gb.jpg" />',
							'</div>',
						'</div>',
					'</div>',
					'<div class="TG015_video-wrap">',
						'<iframe src="https://player.vimeo.com/video/234536373?color=ffffff&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
					'</div>',
					'<div class="TG015_max-margin">',
						'<div class="TG015_product-row clearfix TG015_left-variant">',
							'<div class="TG015_main-image">',
								'<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/03_ARTIS_1920x500-1.jpg" />',
							'</div>',
							'<div class="TG015_content">',
								'<h3>SKILLMILL</h3>',
								'<p>SKILLMILL is the first product allowing you to improve Power, Stamina and Agility in a safe way</p>',
								'<a href="#" class="TG015_cta">View product details</a>',
							'</div>',
							'<div class="TG015_side-images">',
								'<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Bon-Marché.jpg" />',
								'<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/mywellness-gb.jpg" />',
							'</div>',
						'</div>',
						'<div class="TG015_triple-block clearfix">',
							'<div class="TG015_block">',
								'<div>',
									'<img src="https://www.technogym.com/wpress/wp-content/uploads/2016/02/Unity_Related_OK.jpg" />',
									'<h3>SKILLMILL CONNECT</h3>',
									'<p>SKILLMILL is the first product allowing you to improve Power, Speed, Stamina and Agility in a safe way</p>',
								'</div>',
								'<a href="#" class="TG015_cta">View product details</a>',
							'</div>',
							'<div class="TG015_block">',
								'<div>',
									'<img src="https://www.technogym.com/wpress/wp-content/uploads/2016/02/Unity_Related_OK.jpg" />',
									'<h3>SKILLMILL CONNECT</h3>',
									'<p>SKILLMILL is the first product allowing you to improve Power, Speed, Stamina and Agility in a safe way</p>',
								'</div>',
								'<a href="#" class="TG015_cta">View product details</a>',
							'</div>',
							'<div class="TG015_block">',
								'<div>',
									'<img src="https://www.technogym.com/wpress/wp-content/uploads/2016/02/Unity_Related_OK.jpg" />',
									'<h3>SKILLMILL CONNECT</h3>',
									'<p>SKILLMILL is the first product allowing you to improve Power, Speed, Stamina and Agility in a safe way</p>',
								'</div>',
								'<a href="#" class="TG015_cta">View product details</a>',
							'</div>',
						'</div>',
					'</div>',
					// Form Markup
					'<div class="TG015_max-margin">',
					'<form class="TG015-form_validation-wrap clearfix">',
						'<h3>Want to know more?</h3>',
						'<p>Request a catalogue and one of our product experts will be in contact <br /> to answer any questions you have about our SKILL LINE products</p>',
						'<div class="TG015_margin-fix">',
							'<div class="TG015-form_row clearfix">',
								'<div class="TG015-tip_box">',
									'Please enter your first name.',
								'</div>',
								'<div class="TG015-input_wrap">',
									'<input placeholder="First Name*" data-first-name tabindex="2" type="text" />',
									'<div class="TG015-error_box">',
										'Please enter your first name.',
									'</div>',
									'<div class="TG015-warning_box">',
										'You have entered some special characters as part of your name, please check your name is correct before submitting.',
									'</div>',
									'<div class="TG015_input-check">',
										'<span class="TG015_error-ico">!</span>',
										'<span class="TG015_warning-ico">!</span>',
										'<span class="TG015_tick-ico"></span>',
									'</div>',
								'</div>',
							'</div>',
							'<div class="TG015-form_row clearfix">',
								'<div class="TG015-tip_box">',
									'Please enter your last name.',
								'</div>',
								'<div class="TG015-input_wrap">',
									'<input placeholder="Last Name*" data-last-name tabindex="3" type="text" />',
									'<div class="TG015-error_box">',
										'Please enter your last name.',
									'</div>',
									'<div class="TG015-warning_box">',
										'You have entered some special characters as part of your name, please check your name is correct before submitting.',
									'</div>',
									'<div class="TG015_input-check">',
										'<span class="TG015_error-ico">!</span>',
										'<span class="TG015_warning-ico">!</span>',
										'<span class="TG015_tick-ico"></span>',
									'</div>',
								'</div>',
							'</div>',
							'<div class="TG015-form_row clearfix">',
								'<div class="TG015-tip_box">',
									'Please enter your email.',
								'</div>',
								'<div class="TG015-input_wrap">',
									'<input placeholder="Email*" data-email tabindex="4" type="email" />',
									'<div class="TG015-error_box">',
										'Your email address seems to be missing and "@" symbol, please try re-entering your email address',
									'</div>',
									'<div class="TG015-warning_box">',
										'Your email address does not match the normal pattern for an email address, please check your email is correct before submitting.',
									'</div>',
									'<div class="TG015_input-check">',
										'<span class="TG015_error-ico">!</span>',
										'<span class="TG015_warning-ico">!</span>',
										'<span class="TG015_tick-ico"></span>',
									'</div>',
								'</div>',
							'</div>',
							'<div class="TG015-form_row clearfix">',
								'<div class="TG015-tip_box">',
									'Please enter your phone number.',
								'</div>',
								'<div class="TG015-input_wrap">',
									'<input placeholder="Phone*" data-phone tabindex="5" type="tel" />',
									'<div class="TG015-error_box">',
										'Your phone number is incorrect, please try entering it again',
									'</div>',
									'<div class="TG015_input-check">',
										'<span class="TG015_error-ico">!</span>',
										'<span class="TG015_warning-ico">!</span>',
										'<span class="TG015_tick-ico"></span>',
									'</div>',
								'</div>',
							'</div>',
							'<div class="TG015-form_row clearfix">',
								'<a href="#" class="TG015_cta" tabindex="6">Request a catalogue</a>',
							'</div>',
						'</div>',
					'</form>',
					'<div class="TG015_banner_wrap">',
						'<h3>SKILL ATHLETIC CLASS</h3>',
						'<p>Offer your users the chance to perform a complete high intensity circuit based on their heart<br /> rate intensity. Skillathletic Class enables personal trainers to lead individual and small sessions in an enviroment<br /> that offers all training modalities</p>',
						'<a href="#" class="TG015_cta">Discover this product</a>',
						'<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/01_SLIDER-1.jpg" />',
					'</div>',
					'<div class="TG015_product_range clearfix">',
						'<h2>Skill line product range</h2>',
						'<div class="TG015_product-block">',
							'<div class="TG015_img"><img src="https://www.technogym.com/wpress/wp-content/uploads/2016/02/skillmill_connect__related.jpg" /></div>',
							'<div class="TG015_prod-content">',
								'<h3>SKILLROW</h3>',
								'<p>SKILLROW is the first connected indoor rowing machine that trains both cardio and power at an athletes level</p>',
								'<a href="#" class="TG015_cta">Learn more</a>',
							'</div>',
						'</div>',
						'<div class="TG015_product-block">',
							'<div class="TG015_img"><img src="https://www.technogym.com/wpress/wp-content/uploads/2016/02/skillmill_connect__related.jpg" /></div>',
							'<div class="TG015_prod-content">',
								'<h3>SKILLMILL</h3>',
								'<p>SKILLMILL is the first product allowing you to improve Power, Speed, Stamina and Agility in a safe way</p>',
								'<a href="#" class="TG015_cta">Learn more</a>',
							'</div>',
						'</div>',
					'</div>',
					'</div>'

				].join(''));

				cacheDom.formWrap = JQ('.TG015-form_validation-wrap');

			// Password selectors
            	cacheDom.password = cacheDom.formWrap.find('input[data-password]');
                cacheDom.passwordConfirm = cacheDom.formWrap.find('input[data-password-confirm]');
                cacheDom.nameFirstInput = cacheDom.formWrap.find('input[data-first-name]');
                cacheDom.nameLastInput = cacheDom.formWrap.find('input[data-last-name]');
                cacheDom.emailInput = cacheDom.formWrap.find('input[data-email]');
                cacheDom.emailConfirmInput = cacheDom.formWrap.find('input[data-email-confirm]');
				cacheDom.numberInput = cacheDom.formWrap.find('input[data-phone]');
			}
		};

		var inputStates = {
            inputBlur: function(){
                cacheDom.formWrap.find('input').on('blur', function(){
                    var el = JQ(this);
                        inputWrap = el.parent(),
                        elValue = el.val(),
                        rowEl = el.closest('.TG015-form_row'),
                        tipBox = rowEl.find('.TG015-tip_box'),
                        errorBox = inputWrap.find('.TG015-error_box'),
                        warningBox = inputWrap.find('.TG015-warning_box');

					if(elValue){
						// Password Validation
						// if(el.is(cacheDom.password)){
						//     if(formValidation.checkPassword(elValue) === true){
						//         inputWrap.addClass('TG015-success').removeClass('TG015-error_state');
						//     }
						//     else{
						//         inputWrap.addClass('TG015-error_state').removeClass('TG015-success');
						//     }

						//     if(cacheDom.formWrap.find(cacheDom.passwordConfirm).val()){
						//         cacheDom.formWrap.find(cacheDom.passwordConfirm).trigger('blur');
						//     }
						// }
						// Password Confirm Validation
						// else if(el.is(cacheDom.passwordConfirm)){
						//     if(elValue){
						//         if(elValue == cacheDom.formWrap.find(cacheDom.password).val()){
						//             inputWrap.addClass('TG015-success').removeClass('TG015-error_state');
						//         }
						//         else{
						//             inputWrap.addClass('TG015-error_state').removeClass('TG015-success');
						//         }
						//     }
						// }
						// Phone validation
						if(el.is(cacheDom.numberInput)){
							if(formValidation.checkNumber(elValue) === true){
								inputWrap.addClass('TG015-success').removeClass('TG015-error_state');
								errorBox.stop().fadeOut();
							}
							else if(formValidation.checkNumberLess(elValue) === true){
								errorBox.text('Your phone number has too few numbers, please try entering it again')
									.stop()
									.fadeIn();
								inputWrap.addClass('TG015-error_state').removeClass('TG015-success');
							}
							else if(formValidation.checkNumberMore(elValue) === true){
								errorBox.text('Your phone number has too many numbers, please try entering it again')
									.stop()
									.fadeIn();
								inputWrap.addClass('TG015-error_state').removeClass('TG015-success');
							}
							else{
								// Message contains strange characters
								errorBox.text('Your phone number is incorrect, please try entering it again')
									.stop()
									.fadeIn();
								inputWrap.addClass('TG015-error_state').removeClass('TG015-success');
							}	
						}
						// Name Validation
						else if(el.is(cacheDom.nameFirstInput) || el.is(cacheDom.nameLastInput)){
							if(formValidation.checkName(elValue) === true){
								inputWrap.addClass('TG015-success').removeClass('TG015-warning TG015-error_state');
								el.val(capitalizeName.capFirstLetter(elValue));
								errorBox.stop().fadeOut();
								warningBox.stop().fadeOut();
							}
							else if(elValue.length > 100){
								// Message says name is too long
								errorBox.text('Your name is over the 100 character limit, please use an abbreviated version')
									.stop()
									.fadeIn();
								inputWrap.addClass('TG015-error_state').removeClass('TG015-success TG015-warning');
							}
							else if(elValue.length < 1){
								// Message says name is too short
								errorBox.text('Your haven\'t entered enough characters, please enter your name')
									.stop()
									.fadeIn();
								inputWrap.addClass('TG015-error_state').removeClass('TG015-success TG015-warning');
							}
							else{
								// Message contains strange characters
								warningBox.text('Your name contains characters that aren\'t normally in names, please check your name is correct before submitting')
									.stop()
									.fadeIn();
								inputWrap.addClass('TG015-warning').removeClass('TG015-success TG015-error_state');
							}
						}
						// Email Validation
						else if(el.is(cacheDom.emailInput)){
							if(formValidation.checkEmail(elValue) === true){
								inputWrap.addClass('TG015-success').removeClass('TG015-warning TG015-error_state');
								errorBox.stop().fadeOut();
								warningBox.stop().fadeOut();
							}
							else if(elValue.indexOf('@') == -1){
								errorBox.text('Your email address seems to be missing an "@" symbol, please try re-entering your email address')
									.stop()
									.fadeIn();
								inputWrap.addClass('TG015-error_state').removeClass('TG015-success TG015-warning');
							}
							else{
								warningBox
									.stop()
									.fadeIn();
								inputWrap.addClass('TG015-warning').removeClass('TG015-success TG015-error_state');
							}

								// if(cacheDom.formWrap.find(cacheDom.emailConfirmInput).val()){
								//     cacheDom.formWrap.find(cacheDom.emailConfirmInput).trigger('blur');
								// }
						}
						// Confirm Email Validation
						// else if(el.is(cacheDom.emailConfirmInput)){
							// if(elValue == cacheDom.formWrap.find(cacheDom.emailInput).val()){
							// 	inputWrap.addClass('TG015-success').removeClass('TG015-error_state');
							// }
							// else{
							// 	inputWrap.addClass('TG015-error_state').removeClass('TG015-success');
							// }
						// }
					}
					else{
						inputWrap.removeClass('TG015-warning TG015-success TG015-error_state');
						warningBox
							.stop()
							.fadeOut();
						errorBox
							.stop()
							.fadeOut();
					}
                    tipBox.stop().fadeOut();
                });
            },
            inputFocus: function(){
                cacheDom.formWrap.find('input').on('focus', function(){
                    var el = JQ(this);
                        inputWrap = el.parent(),
                        rowEl = el.closest('.TG015-form_row'),
                        tipBox = rowEl.find('.TG015-tip_box');

					if(el.val()){
					}
					else{
						inputWrap.removeClass('TG015-error_state');
					}
					if(inputWrap.hasClass('TG015-warning') || inputWrap.hasClass('TG015-error_state') || inputWrap.hasClass('TG015-success')){

					}
					else{
                    	tipBox.stop().fadeIn();
					}
                });
            }
        }

        var formValidation = {
            checkPassword: function(str){
                var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,40}/;
                return re.test(str);
            },
            checkEmail: function(str){
                var re = /((([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|("(([\x01-\x08\x0B\x0C\x0E-\x1F\x7F]|[\x21\x23-\x5B\x5D-\x7E])|(\\[\x01-\x09\x0B\x0C\x0E-\x7F]))*"))@(([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(\[(([\x01-\x08\x0B\x0C\x0E-\x1F\x7F]|[\x21-\x5A\x5E-\x7E])|(\\[\x01-\x09\x0B\x0C\x0E-\x7F]))*\])))/;
                return re.test(str);
            },
            checkName: function(str){
                var re = /^[-\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u0E01-\u0E3A\u0E40-\u0E4F\u0E5A\u05B]{1,100}$/;
                return re.test(str);
            },
			checkNumber: function(str){
				var re = /^(\D)*(\d)(\D)*(\d)(\D)*(\d)(\D)*(\d)(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*$/;
				return re.test(str);
			},
			checkNumberLess: function(str){
				var re = /^(\D)*(\d)(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*$/;
				return re.test(str);
			},
			checkNumberMore: function(str){
				var re = /^(\D)*(\d)(\D)*(\d)(\D)*(\d)(\D)*(\d)(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*.*/;
				return re.test(str);
			}
        }

        var capitalizeName = {
            capFirstLetter: function(str){
                return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
            }
        }

		var elementBindings = {
			// Click function for the mobile tab variation to show the hidden options
			formSubmitClick: function(){
				cacheDom.formWrap.find('.TG015_cta').on('click', function(e){
					e.preventDefault();
					
					var el = JQ(this),
						elFormParent = el.closest('.TG015-form_validation-wrap'),
						inputCheck = 0;

					elFormParent.find('.TG015-input_wrap input').each(function(){
						var elInput = JQ(this),
							inputParent = elInput.closest('.TG015-input_wrap'),
							inputVal = elInput.val();

						elInput.trigger('blur');

						if(inputParent.hasClass('TG015-success') || inputParent.hasClass('TG015-warning')){
						}
						else{
							if(inputVal){}
							else{
								inputParent.addClass('TG015-error_state');
								if(elInput.is(cacheDom.emailInput)){
									inputParent.find('.TG015-error_box').text('This is a mandatory field, please input your Email').stop().fadeIn();
								}
								else if(elInput.is(cacheDom.nameFirstInput)){
									inputParent.find('.TG015-error_box').text('This is a mandatory field, please input your First Name').stop().fadeIn();
								}
								else if(elInput.is(cacheDom.nameLastInput)){
									inputParent.find('.TG015-error_box').text('This is a mandatory field, please input your Last Name').stop().fadeIn();
								}
								else if(elInput.is(cacheDom.numberInput)){
									inputParent.find('.TG015-error_box').text('This is a mandatory field, please input your Number').stop().fadeIn();
								}
							}
							inputCheck++;
						}
					});

					if(inputCheck > 0){
					}
					else{
						//Submit
					}
				});
			},
			formSubmitEnter: function(){
				cacheDom.formWrap.find('.TG015_cta').on('keydown', function(e){
					if (e.which == 13) {
						JQ(this).trigger('click');
					}
				});
			}
		};

		contentChange.originalElements();

		// Build new markup
		productRange.contentBuilder();
		skillrowSection.contentBuilder();

		// Run form validation
		inputStates.inputBlur();
        inputStates.inputFocus();

		// Element Bindings
		elementBindings.formSubmitClick();
		elementBindings.formSubmitEnter();
	}

	/* 
		Anon functions to be called inside the code

		Custom GA event sender that uses a tracker if found
	*/

	var trackerName;
	function sendEvent (category, action, label, nonInteractionValue, dimensionValue, dimensionName) {
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

	//sendEvent('TP017', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
	//sendEvent('TP017v2', 'Closed Trade Modal', '', true);
	
})();