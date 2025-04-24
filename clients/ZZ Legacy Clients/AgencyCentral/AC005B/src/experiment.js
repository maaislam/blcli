(function() {
'use strict';
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
window.AC005B = window.AC005B || {};
window.AC005B.poller = function poller(elements, cb, options) {
	var settings = {
		wait: 50,
		multiplier: 1.1,
		timeout: 0,
		timeoutCallback: function timeoutCallback() {}
	};
	var now = Date.now || function () {
		return new Date().getTime();
	};
	if (options) {
		// Overwrite defaults with values from options
		for (var option in options) {
			settings[option] = options[option];
		}
	}
	var timeout = settings.timeout ? new Date(now() + settings.timeout) : false;
	var wait = settings.wait;
	var multiplier = settings.multiplier;
	var successful = [];
	var time;
	var pollForElement = function pollForElement(condition, time) {
		if (timeout && now() > timeout) {
			if (typeof settings.timeoutCallback === 'function') {
				settings.timeoutCallback();
			}
			return false;
		}
		time = time || wait;
		var conditionIsTrue = function () {
			var type = typeof condition === 'undefined' ? 'undefined' : _typeof(condition);
			var toReturn;
			if (type === 'function') {
				toReturn = condition();
			} else if (type === 'string') {
				toReturn = document.querySelector(condition);
			} else {
				toReturn = true;
			}
			return toReturn;
		}();
		if (conditionIsTrue) {
			successful.push(true);
			if (successful.length === elements.length) cb();
		} else {
			setTimeout(function () {
				pollForElement(condition, time * multiplier);
			}, time);
		}
	};
	for (var i = 0; i < elements.length; i++) {
		pollForElement(elements[i]);
	}
};
window.AC005B.fullStory = function fullStory(experiment_str, variation_str) {
	// FullStory tagging
	window.AC005B.poller([function () {
		var fs = window.FS;
		if (fs && fs.setUserVars) return true;
	}], function () {
		window.FS.setUserVars({
			experiment_str: experiment_str,
			variation_str: variation_str
		});
	}, { multiplier: 1.2, timeout: 0 });
};
window.AC005B.events = {
	// GA Events helper
	trackerName: false,
	setDefaultCategory: function setDefaultCategory(category) {
		this.category = category;
		return this;
	},
	eventCache: [],
	send: function send(category, action, label, options) {
		options = options || {};
		category = category || this.category;
		if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options.sendOnce) {
			var eventID = category + action + label;
			// Check eventCache to see if this has already been sent
			if (this.eventCache.indexOf(eventID) > -1) {
				return false;
			} else {
				// Store event in cache
				this.eventCache.push(eventID);
			}
		}
		var self = this;
		var fire = function fire(tracker) {
			window.ga(tracker + '.send', 'event', category, action, label, { nonInteraction: options.nonInteraction ? options.nonInteraction : true });
		};
		if (self.trackerName) {
			fire(self.trackerName);
		} else {
			window.AC005B.poller([function () {
				try {
					return !!window.ga.getAll();
				} catch (err) {}
			}], function () {
				self.trackerName = window.ga.getAll()[0].get('name');
				fire(self.trackerName);
			});
		}
	}
};

window.AC005B = window.AC005B || {};
window.AC005B.formRegex = {
	checkPassword: function checkPassword(str) {
		var re = /.*/;
		return re.test(str);
	},
	checkPasswordForCapital: function checkPasswordForCapital(str) {
		var re = /.*/;
		return re.test(str);
	},
	checkPasswordForNumber: function checkPasswordForNumber(str) {
		var re = /.*/;
		return re.test(str);
	},
	checkEmail: function checkEmail(str) {
		var re = /.*/;
		return re.test(str);
	},
	checkName: function(str){
		var re = /.*/;
		return re.test(str);
	},
	checkNumber: function checkNumber(str) {
		var re = /.*/;
		return re.test(str);
	},
	checkNumberLess: function checkNumberLess(str) {
		var re = /^(\D)*(\d)(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*$/;
		return re.test(str);
	},
	checkNumberMore: function checkNumberMore(str) {
		var re = /^(\D)*(\d)(\D)*(\d)(\D)*(\d)(\D)*(\d)(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*.*/;
		return re.test(str);
	}
};

window.AC005B.displayPhoneMarkup = ['<div class="col-xs-12 col-sm-4 col-md-12 AC005B_input-wrap">', '<div class="AC005B_tel-number"></div>', '<div class="AC005B-preload-content">', '<p class="AC005B_error">The company name must not be empty.</p>', '<div class="AC005B_input-inner">', '<input type="text" placeholder="Company Name" />', '<a href="#" class="AC005B_show-mobile">Show Number</a>', '</div>', '<p>Entering your company name lets the recruiter know where you found their details.</p>', '<p>We WILL NOT ask you to leave your own name or contact information.</p>', '</div>', '<div class="AC005B_pre-cover">', '<div class="AC005B_loader-wrapper">', '<div class="AC005B_loader">', '<div class="AC005B_roller"></div>', '<div class="AC005B_roller"></div>', '</div>', '<div id="AC005B_loader2" class="AC005B_loader">', '<div class="AC005B_roller"></div>', '<div class="AC005B_roller"></div>', '</div>', '<div id="AC005B_loader3" class="AC005B_loader">', '<div class="AC005B_roller"></div>', '<div class="AC005B_roller"></div>', '</div>', '</div>', '</div>', '</div>'].join('');
window.AC005B.displayWebsiteMarkup = ['<div class="col-xs-12 col-sm-4 col-md-12 AC005B_input-wrap">', '<div class="AC005B_web-redirect"><a href="#">Visit Website</a></div>', '<div class="AC005B_redirecting">Redirecting...</div>', '<div class="AC005B-preload-content">', '<p class="AC005B_error">The company name must not be empty.</p>', '<div class="AC005B_input-inner">', '<input type="text" placeholder="Company Name" />', '<a href="#" class="AC005B_show-web">Show</a>', '</div>', '<p>Entering your company name lets the recruiter know where you found their details.</p>', '<p>We WILL NOT ask you to leave your own name or contact information.</p>', '</div>', '<div class="AC005B_pre-cover">', '<div class="AC005B_loader-wrapper">', '<div class="AC005B_loader">', '<div class="AC005B_roller"></div>', '<div class="AC005B_roller"></div>', '</div>', '<div id="AC005B_loader2" class="AC005B_loader">', '<div class="AC005B_roller"></div>', '<div class="AC005B_roller"></div>', '</div>', '<div id="AC005B_loader3" class="AC005B_loader">', '<div class="AC005B_roller"></div>', '<div class="AC005B_roller"></div>', '</div>', '</div>', '</div>', '</div>'].join('');
window.AC005B.emailmoMarkup = `
	<div class="AC005B_email-complete">
		<div class="AC005B_email-body_click"></div>
			<div class="AC005B_email-inner_div">
			<a href="#" class="AC005B_email-close_btn">X</a>
			<div class="AC005B_email-overflow_fix">
				<div class="AC005B_email-logo"></div>
				<h2>You Successfully sent an Email to <span></span></h2>
			</div>
		</div>
	</div>
` + '\n    <div class="AC005B_pop-up_mo">\n        <div class="AC005B_body_click"></div>\n        <div class="AC005B_inner_div">\n            <a href="#" class="AC005B_close_btn">X</a>\n            <div class="AC005B_loader-wrapper">\n                <div class="AC005B_loader">\n                    <div class="AC005B_roller"></div>\n                    <div class="AC005B_roller"></div>\n                </div>\n                <div id="AC005B_loader2" class="AC005B_loader">\n                    <div class="AC005B_roller"></div>\n                    <div class="AC005B_roller"></div>\n                </div>\n                <div id="AC005B_loader3" class="AC005B_loader">\n                    <div class="AC005B_roller"></div>\n                    <div class="AC005B_roller"></div>\n                </div>\n            </div>\n            <div class="AC005B_loaded-wrapper">\n                <div class="AC005B_overflow_fix">\n                    <div class="AC005B_logo"></div>\n                    <h2>Contact <span class="AC005B_recruitment-name"></span></h2>\n                    <div>Branch: <span class="AC005B_branch-name"></span></div>\n                    <div class="AC005B_email-form">\n                        <h3>1. Are you looking to hire or for a job?</h3>\n                        <div class="AC005B_radio-wrap">\n                            <div class="AC005B_input_radio">\n                                <input type="radio" id="hireRadio" name="jobhire" value="hire">\n                                <label for="hireRadio">Looking to hire staff</label>\n                            </div>\n                            <div class="AC005B_input_radio">\n                                <input type="radio" id="findRadio" name="jobhire" value="find">\n                                <label for="findRadio">Looking for a job</label>\n                            </div>\n                        </div>\n                        <div class="AC005B_form-wrap clearfix">\n                            <div>\n                                <h3>2. Your Details</h3>\n                                <div class="AC005B_input-outer">\n                                    <input class="AC005B_email-input" type="email" placeholder="Email Address" />\n                                    <span class="AC005B_error-msg">Please make sure your Email is correct</span>\n                                </div>\n                                <div class="AC005B_input-outer">\n                                    <input class="AC005B_company-input" type="text" placeholder="Company Name" />\n                                    <span class="AC005B_error-msg">Please enter a Company Name</span>\n                                </div>\n                                <div class="AC005B_input-outer">\n                                    <input class="AC005B_name-input" type="text" placeholder="Contact Name" />\n                                    <span class="AC005B_error-msg">Please enter a Contact Name</span>\n                                </div>\n                                <div class="AC005B_input-outer">\n                                    <input class="AC005B_tele-input" type="tel" placeholder="Telephone Number" />\n                                    <span class="AC005B_error-msg">Please make sure your Number is correct</span>\n                                </div>\n                                <div class="AC005B_input-outer">\n                                    <select class="AC005B_employ">\n                                        <option value="" disabled="" selected="selected">Employment type</option>\n                                        <option value="permanent">Permanent</option>\n                                        <option value="temp">Temp</option>\n                                        <option value="contract">Contract</option>\n                                        <option value="temp-to-perm">Temp to Perm</option>\n                                    </select>\n                                    <span class="AC005B_error-msg">Please select an option</span>\n                                </div>\n                            </div>\n                            <div>\n                                <h3>3. Your Enquiry</h3>\n                                <div class="AC005B_input-outer">\n                                    <textarea rows="5" placeholder="Enquiry" ></textarea>\n                                    <span class="AC005B_error-msg">Please enter an Enquiry</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <a class="AC005B_submit-form">Send Email</a>\n                    <div class="AC005B_input_chk AC005B_email-sent">\n                        <label>Receive confirmation that this email has been sent.</label>\n                        <input type="checkbox" />\n                    </div>\n                    <div class="AC005B_input_chk AC005B_newsletter">\n                        <label>Subscribe to our newsletter to keep abreast of the latest news from Agency Central</label>\n                        <input type="checkbox" />\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n';
// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------
var AC005B = function () {
	var trackerName,
	    sQ = false,
	    $;
	var UCPoller = function () {
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		window.AC005B.poller(['.contact-link.contact-option-container', '.contact-link.contact-option-container[data-action="telfax"]', '.contact-link.contact-option-container[data-action="website"]', '.contact-link.contact-option-container[data-action="email"]', function () {
			if (window.jQuery) {
				$ = window.jQuery;
				return true;
			}
		}], init);
	}();
	function init() {
		window.AC005B.fullStory('AC005B', 'Variation 1');
		var cG = function () {
			return function (name) {
				var match = document.cookie.match(name + '=([^;]*)');
				return match ? match[1] : undefined;
			};
		}();
		var cD = function () {
			//Cache useful selectors for later use
			var bV = $('body');
			bV.addClass('AC005B');
			var aR = $('.agency-result'),
			    dPB = aR.find('.contact-link.contact-option-container[data-action="telfax"]'),
			    dWB = aR.find('.contact-link.contact-option-container[data-action="website"]'),
			    nW,
			    sT;
			var prevNumber = false;
			var cC = cG('rememberedContactDetails');
			var mo, moBG, moT, bN;
			if (cC !== undefined) {
				var dC = JSON.parse(decodeURIComponent(cC));
			}
			//Retun the selectors we want to reference in other parts of the test
			return {
				bV: bV,
				aR: aR,
				dPB: dPB,
				nW: nW,
				sT: sT,
				cC: cC,
				dWB: dWB,
				dC: dC,
				mo: mo,
				moBG: moBG,
				moT: moT,
				bN: bN,
				prevNumber
			};
		}();
		var createNumberDD = {
			CB: function CB() {
				cD.dPB.after(window.AC005B.displayPhoneMarkup);
				cD.dWB.after(window.AC005B.displayWebsiteMarkup);
				cD.nW = $('.AC005B_input-wrap');
			}
		};
		var elementBindings = {
			// Click function for the mobile tab variation to show the hidden options
			DC: function DC() {
				cD.dPB.on('click', function (e) {
					if (sQ === false) {
						var el = $(this),
						    vNC = $('.AC005B_visible'),
						    nWr = el.next(cD.nW);
						sQ = true;
						cD.bV.removeClass('AC005B_email-click');
						cD.cC = cG('rememberedContactDetails');
						if (cD.cC !== undefined) {
							cD.dC = JSON.parse(decodeURIComponent(cD.cC));
						}
						window.AC005B.events.send('AC005B', 'Click', 'Display Phone Number', true);
						if (vNC[0] == nWr[0]) {
							vNC.removeClass('AC005B_visible AC005B_loaded').slideUp(function () {
								sQ = false;
							});
						} else if (vNC.length > 0) {
							vNC.slideUp().removeClass('AC005B_visible AC005B_loaded');
							nWr.addClass('AC005B_visible AC005B_preload-anim').slideDown(function () {
								sQ = false;
							});
						} else {
							nWr.addClass('AC005B_visible AC005B_preload-anim').slideDown(function () {
								sQ = false;
							});
						}
						if (cD.cC !== undefined) {
							if (cD.dC.userDetails.companyName !== null || cD.bV.hasClass('AC005B_set-company-cookie')) {
								window.AC005B.poller(['.inner-contact-body .telephone-link', function () {
									if (cD.prevNumber === false) {
										return true;
									}
									else if($.trim($('.inner-contact-body .telephone-link').text()) == ''){
									}
									else if(cD.prevNumber !== $.trim($('.inner-contact-body .telephone-link').text())){
										return true;
									}
								}], function () {
									window.AC005B.events.send('AC005B', 'Show', 'User was shown phone number', true);
									cD.prevNumber = $.trim($('.inner-contact-body .telephone-link').text());
									nWr.find('.AC005B_tel-number').text($('.inner-contact-body .telephone-link').text()).fadeIn('400');
									nWr.removeClass('AC005B_preload-anim').addClass('AC005B_number-show');
									window.AC005B.events.send('AC005B', 'View', 'Phone number displayed', true);
								});
							} else {
								window.AC005B.poller(['body', function () {
									if ($('#contact-form-container .trigger-enquiry-type[data-value="enquiry"]').length > 0) {
										return true;
									} 
									else if ($('#contact-form-container #user-type-selection .trigger-user-type[data-value="employer"]').length > 0) {
										$('.trigger-user-type[data-value="employer"]').click();
										return true;
									}
									else if($('.inner-contact-body #contact-form').length > 0){
										return true;
									}
								}], function () {
									window.AC005B.poller(['body', function () {
										if($('.inner-contact-body .horizontal-separator + .branch-selection .trigger-branch').length > 0){
											$('.inner-contact-body .horizontal-separator + .branch-selection .trigger-branch').click();
										}
										else if($('.inner-contact-body #contact-form').length > 0){
											return true;
										}
									}], function () {
										nWr.addClass('AC005B_loaded');
										window.AC005B.events.send('AC005B', 'Show', 'Phone number input shown', true);
										setTimeout(function () {
											nWr.removeClass('AC005B_preload-anim');
											window.AC005B.events.send('AC005B', 'View', 'Phone number displayed', true);
										}, 500);
									});
								});
							}
						} else {
							window.AC005B.poller(['body', function () {
								if ($('#contact-form-container .trigger-enquiry-type[data-value="enquiry"]').length > 0) {
									return true;
								} 
								else if ($('#contact-form-container #user-type-selection .trigger-user-type[data-value="employer"]').length > 0) {
									$('.trigger-user-type[data-value="employer"]').click();
									return true;
								}
								else if($('.inner-contact-body #contact-form').length > 0){
									return true;
								}
							}], function () {
								window.AC005B.poller(['body', function () {
									if($('.inner-contact-body .horizontal-separator + .branch-selection .trigger-branch').length > 0){
										$('.inner-contact-body .horizontal-separator + .branch-selection .trigger-branch').click();
									}
									else if($('.inner-contact-body #contact-form').length > 0){
										return true;
									}
								}], function () {
									nWr.addClass('AC005B_loaded');
									window.AC005B.events.send('AC005B', 'View', 'Phone number displayed', true);
									setTimeout(function () {
										nWr.removeClass('AC005B_preload-anim');
									}, 500);
								});
							});
						}
					}
				});
			},
			DWC: function DWC() {
				cD.dWB.on('click', function (e) {
					cD.cC = cG('rememberedContactDetails');
					window.AC005B.events.send('AC005B', 'Click', 'Visit Website', true);
					cD.bV.removeClass('AC005B_email-click');
					if (cD.cC !== undefined) {
						cD.dC = JSON.parse(decodeURIComponent(cD.cC));
					}
					if (sQ === false) {
						var el = $(this),
						    vNC = $('.AC005B_visible'),
						    nWr = el.next(cD.nW);
						sQ = true;

						if (vNC[0] == nWr[0]) {
							vNC.removeClass('AC005B_visible AC005B_loaded').slideUp(function () {
								sQ = false;
							});
						} else if (vNC.length > 0) {
							vNC.slideUp().removeClass('AC005B_visible AC005B_loaded');
							nWr.addClass('AC005B_visible AC005B_preload-anim').slideDown(function () {
								sQ = false;
							});
						} else {
							nWr.addClass('AC005B_visible AC005B_preload-anim').slideDown(function () {
								sQ = false;
							});
						}
						if (cD.cC !== undefined) {
							if (cD.dC.userDetails.companyName !== null || cD.bV.hasClass('AC005B_set-company-cookie')) {
								nWr.removeClass('AC005B_preload-anim').addClass('AC005B_number-show');
								nWr.find('.AC005B_web-redirect').fadeIn('400');
								window.AC005B.events.send('AC005B', 'Show', 'User was redirected', true);
								//nWr.find('.AC005B_redirecting').fadeIn('400');
								sQ = true;
								// setTimeout(function(){ 
								// 	nWr.slideUp(function(){
								// 		nWr.removeClass('AC005B_preload-anim AC005B_visible AC005B_number-show AC005B_loaded');
								// 		//.find('.AC005B_redirecting').fadeOut('400');
								// 		sQ = false;
								// 	});
								// }, 2000);
							}
						}
						window.AC005B.poller(['body', function () {
							if ($('#contact-form-container .trigger-enquiry-type[data-value="enquiry"]').length > 0) {
								return true;
							} 
							else if ($('#contact-form-container #user-type-selection .trigger-user-type[data-value="employer"]').length > 0) {
								$('.trigger-user-type[data-value="employer"]').click();
								return true;
							}
							else if($('.inner-contact-body #contact-form').length > 0){
								return true;
							}
						}], function () {
							window.AC005B.poller(['body', function () {
								if($('.inner-contact-body .horizontal-separator + .branch-selection .trigger-branch').length > 0){
									$('.inner-contact-body .horizontal-separator + .branch-selection .trigger-branch').click();
								}
								else if($('.inner-contact-body #contact-form').length > 0){
									return true;
								}
							}], function () {
								nWr.addClass('AC005B_loaded');
								window.AC005B.events.send('AC005B', 'Show', 'Visit Website input shown', true);
								setTimeout(function () {
									nWr.removeClass('AC005B_preload-anim');
								}, 500);
							});
						});
					}
				});
			},
			showWebClick: function showWebClick() {
				cD.nW.find('.AC005B_show-web').on('click', function (e) {
					e.preventDefault();
					var el = $(this),
					    elP = el.closest('.AC005B-preload-content'),
					    elI = elP.find('.AC005B_input-inner input'),
					    elE = elP.find('.AC005B_error'),
					    elV = elI.val(),
					    elW = el.closest('.AC005B_input-wrap');
					if (cD.cC !== undefined) {
						if (cD.dC.userDetails.companyName !== null || cD.bV.hasClass('AC005B_set-company-cookie')) {
							elE.slideUp();
							elP.find('.AC005B_redirecting').fadeIn('400');
							elW.removeClass('AC005B_preload-anim').addClass('AC005B_number-show');
						} else {
							if (elV == '') {
								elE.slideDown();
							} else {
								window.AC005B.events.send('AC005B', 'Click', 'Entered company name, Show Website Link', true);
								elE.slideUp();
								elW.find('.AC005B_web-redirect').fadeIn('400');
								elW.removeClass('AC005B_preload-anim').addClass('AC005B_number-show');
								$('.inner-contact-body #contact-form input[type="text"]').val(elV);
							}
						}
					} else {
						if (elV == '') {
							elE.slideDown();
						} else {
							window.AC005B.events.send('AC005B', 'Click', 'Entered company name, Show Website Link', true);
							elE.slideUp();
							elW.find('.AC005B_web-redirect').fadeIn('400');
							elW.removeClass('AC005B_preload-anim').addClass('AC005B_number-show');
							$('.inner-contact-body #contact-form input[type="text"]').val(elV);
						}
					}
				});
			},
			vWC: function vWC() {
				$('.AC005B_web-redirect a').on('click', function (e) {
					e.preventDefault();
					var nWr = $(this).closest('.AC005B_input-wrap');
					$('#contact-form-container .inner-contact-body input[type="submit"]').click();
					setTimeout(function () {
						nWr.slideUp(function () {
							nWr.removeClass('AC005B_preload-anim AC005B_visible AC005B_number-show AC005B_loaded');
							//.find('.AC005B_redirecting').fadeOut('400');
							sQ = false;
						});
					}, 1000);
					window.AC005B.events.send('AC005B', 'Click', 'Visit Website Link', true);
				});
			},
			sMC: function sMC() {
				cD.nW.find('.AC005B_show-mobile').on('click', function (e) {
					e.preventDefault();
					var el = $(this),
					    elP = el.closest('.AC005B-preload-content'),
					    elI = elP.find('.AC005B_input-inner input'),
					    elE = elP.find('.AC005B_error'),
					    elV = elI.val(),
					    elW = el.closest('.AC005B_input-wrap');
					if (elV == '') {
						elE.slideDown();
					} else {
						window.AC005B.events.send('AC005B', 'Click', 'Show telephone number', true);
						elE.slideUp();
						$('.inner-contact-body #contact-form input[type="text"]').val(elV);
						$('.inner-contact-body #contact-form input[type="submit"]').click();
						elW.removeClass('AC005B_loaded').addClass('AC005B_preload-anim');
						window.AC005B.poller(['.inner-contact-body .telephone-link', function () {
							if (window.jQuery) {
								return true;
							}
						}], function () {
							cD.prevNumber = $.trim($('.inner-contact-body .telephone-link').text());
							elW.find('.AC005B_tel-number').text($('.inner-contact-body .telephone-link').text()).fadeIn('400');
							elW.removeClass('AC005B_preload-anim').addClass('AC005B_number-show');
						});
					}
				});
			},
			eTC: function eTC() {
				$('.contact-link.contact-option-container[data-action="email"]').on('click', function () {
					// cache title 
					var el = $(this),
					    elP = el.closest('.agency-result'),
					    elTitle = elP.find('h2.agency-title').text();
					cD.mo.addClass('AC005B_preload-anim');
					// change mo title to the recruitment agency that has been clicked
					cD.moT.text(elTitle);
					window.AC005B.events.send('AC005B', 'Click', 'Email Agency click', true);
					var employerTrigger = false;
					// Poll for the email window
					window.AC005B.poller(['body', function () {
						if ($('#contact-form-container .trigger-enquiry-type[data-value="enquiry"]').length > 0) {
							return true;
						} 
						else if ($('#contact-form-container #user-type-selection .trigger-user-type[data-value="employer"]').length > 0 && employerTrigger === false) {
							$('.trigger-user-type[data-value="employer"]').click();
							employerTrigger = true;
						}
					}], function () {
						// Click the enquiry option
						$('.trigger-enquiry-type[data-value="enquiry"]').click();
						cD.mo.find('textarea').val('');
						// Poll for the branch name
						window.AC005B.poller(['body', function () {
							if($('.inner-contact-body .horizontal-separator + .branch-selection .trigger-branch').length > 0){
								$('.inner-contact-body .horizontal-separator + .branch-selection .trigger-branch').click();
							}
							else if($('#email-enquiry-form').length > 0){
								return true;
							}
						}], function () {
							// Get the text node of the branch name and change the mo branch name to it
							var textNode = $('#email-enquiry-form .title-section + .col-lg-12 strong')[0].nextSibling.nodeValue;
							cD.bN.text(textNode);
							cD.mo.removeClass('AC005B_preload-anim');
							formValidation.inputCheckboxes();
							window.AC005B.events.send('AC005B', 'View', 'Email Form Displayed', true);
						});
					});
				});
			}
		};
		var mo = {
			CB: function CB() {
				cD.bV.append(window.AC005B.emailmoMarkup);
				cD.mo = $(".AC005B_pop-up_mo");
				cD.moBG = cD.mo.find('.AC005B_body_click');
				cD.moT = cD.mo.find('.AC005B_recruitment-name');
				cD.bN = cD.mo.find('.AC005B_branch-name');
				$('svg.logo').clone().appendTo('.AC005B_logo');
				if (/.+(\/)agencysearch(\/)search(\.htm).+/g.test(window.location.href)) {
					cD.mo.find('.AC005B_email-form > h3').hide();
					cD.mo.find('.AC005B_email-form > h3 + .AC005B_radio-wrap').hide();
					cD.mo.find('.AC005B_form-wrap > div:first-child h3').text('1. Your Details');
					cD.mo.find('.AC005B_form-wrap > div:first-child + div h3').text('2. Your Enquiry');
				}
			},
			closeBinder: function closeBinder() {
				$('.AC005B_pop-up_mo .AC005B_close_btn, .contact-link.contact-option-container[data-action="email"]').on("click", function (e) {
					if (sQ === false) {
						sQ = true;
						e.preventDefault();
						if (cD.mo.hasClass("active")) {
							cD.mo.fadeOut("slow", function () {
								cD.mo.removeClass("active");
								cD.bV.off("mousedown").removeClass('AC005B_overflow');
								sQ = false;
								formValidation.inputCheckboxesOff();
							});
						} else {
							cD.mo.fadeIn("slow", function () {
								cD.mo.addClass("active");
								cD.bV.addClass('AC005B_overflow');
								sQ = false;
							});
							cD.moBG.on("mousedown touchstart", function () {
								if (cD.mo.hasClass("active")) {
									cD.mo.fadeOut("slow", function () {
										cD.mo.removeClass("active");
										cD.bV.off("mousedown").removeClass('AC005B_overflow');
										formValidation.inputCheckboxesOff();
									});
								}
							});
						}
					}
				});
			}
		};
		var formValidation = {
			checkboxes: function checkboxes() {
				$('.AC005B_input_chk').each(function () {
					var el = $(this),
					    label = $(this),
					    input = el.find('input');
					input.on('change', function () {
						var chk = $(this);
						if (chk.is(':checked')) {
							if (chk.attr('type') == "radio") {
								var radioOther = $('input[name="' + chk.attr('name') + '"]');
								radioOther.closest('.AC005B_input_chk').removeClass('checked');
							}
							el.addClass('checked');
						} else {
							el.removeClass('checked');
						}
					}).change();
				});
				$('.AC005B_input_chk').addClass('checked');
			},
			formSubmit: function formSubmit() {
				$('.AC005B_submit-form').on('click', function () {
					var formEmailEl = cD.mo.find('.AC005B_email-input'),
					    formEmail = formEmailEl.val(),
					    formCompanyEl = cD.mo.find('.AC005B_company-input'),
					    formCompany = formCompanyEl.val(),
					    formNameEl = cD.mo.find('.AC005B_name-input'),
					    formName = formNameEl.val(),
					    formTeleEl = cD.mo.find('.AC005B_tele-input'),
					    formTele = formTeleEl.val(),
					    formMessageEl = cD.mo.find('textarea'),
					    formMessage = formMessageEl.val(),
					    formSelect = $('.AC005B_employ'),
					    formOption = formSelect.find('option:selected'),
					    formError = false;
					// Email validation
					if (window.AC005B.formRegex.checkEmail(formEmail) === false) {
						formEmailEl.parent().addClass('AC005B_error');
						formError = true;
					} else {
						formEmailEl.parent().removeClass('AC005B_error');
					}
					// Company validation
					if (window.AC005B.formRegex.checkName(formCompany) === false) {
						formCompanyEl.parent().addClass('AC005B_error');
						formError = true;
					} else {
						formCompanyEl.parent().removeClass('AC005B_error');
					}
					// Name validation
					if (window.AC005B.formRegex.checkName(formName) === false) {
						formNameEl.parent().addClass('AC005B_error');
						formError = true;
					} else {
						formNameEl.parent().removeClass('AC005B_error');
					}
					// Telephone validation
					if (window.AC005B.formRegex.checkNumber(formTele) === false) {
						formTeleEl.parent().addClass('AC005B_error');
						formError = true;
					} else {
						formTeleEl.parent().removeClass('AC005B_error');
					}
					// Enquiry validation
					if (formMessage.length > 0 === false) {
						formMessageEl.parent().addClass('AC005B_error');
						formError = true;
					} else {
						formMessageEl.parent().removeClass('AC005B_error');
					}
					// Select box validation
					if (formOption.index() == 0) {
						formSelect.parent().addClass('AC005B_error');
						formError = true;
					} else {
						formSelect.parent().removeClass('AC005B_error');
					}
					if (formError === false) {
						$('#contact-form-enquiry').val(formMessage);
						$('#contact-form-email-address').val(formEmail);
						$('#contact-form-company-name').val(formCompany);
						$('#contact-form-contact-name').val(formName);
						$('#contact-form-telephone-number').val(formTele);
						$('#contact-form input[type="submit"]').click();
						$('.AC005B_close_btn').click();

						localStorage.setItem("AC005_email-check", "Reload - " + cD.moT.text());
						location.reload();
					}
				});
			},
			inputCheckboxes: function inputCheckboxes() {
				var emailConfirm = document.getElementById("contact-form-email-confirmation"),
				    subscribeConfirm = document.getElementById("contact-form-register-emp-newsletter");
				$('.AC005B_email-sent').on('click', function () {
					var el = $(this);
					el.toggleClass('checked');
					if (el.hasClass('checked')) {
						emailConfirm.checked = true;
					} else {
						emailConfirm.checked = false;
					}
				});
				$('.AC005B_newsletter').on('click', function () {
					var el = $(this);
					el.toggleClass('checked');
					if (el.hasClass('checked')) {
						subscribeConfirm.checked = true;
					} else {
						subscribeConfirm.checked = false;
					}
				});
				$('.AC005B_employ').on('change', function () {
					var el = $(this),
					    elOption = el.find('option:selected'),
					    elVue = elOption.val();
					$('#contact-form-employment-type').val(elVue);
				});
			},
			inputCheckboxesOff: function inputCheckboxesOff() {
				$('.AC005B_email-sent').off('click');
				$('.AC005B_newsletter').off('click');
				$('.AC005B_employ').off('change');
			}
		};

		var userRefresh = {
			load(){
				var modalCheck = localStorage.getItem("AC005_email-check"); 

				if(modalCheck && modalCheck.indexOf('Reload') > -1){
					$('.navbar-logo-container svg.logo').clone().appendTo('.AC005B_email-logo');
					var emailModal = $('.AC005B_email-complete'),
						modalBG = emailModal.find('.AC005B_email-body_click'),
						modalTitle = modalCheck.replace('Reload - ', '');

					emailModal.find('h2 span').text(modalTitle);

					localStorage.removeItem("AC005_email-check");

					$(".AC005B_email-complete .AC005B_email-close_btn").on("click", function(e) {
						e.preventDefault();

						if (emailModal.hasClass("AC005_active")) {
							emailModal.fadeOut("slow", function() {
								emailModal.removeClass("AC005_active");
								cD.bV.off("mousedown");
							});
						} 
						else {
							emailModal.fadeIn("slow", function() {
								emailModal.addClass("AC005_active");
							});

							modalBG.on("mousedown touchstart", function () {
								if (emailModal.hasClass("AC005_active")) {
									emailModal.fadeOut("slow", function () {
										emailModal.removeClass("AC005_active");
										cD.bV.off("mousedown");
									});
								}
							});
						}
					});

					emailModal.fadeIn(function(){
						emailModal.addClass('AC005_active');
						setTimeout(function(){
							emailModal.fadeOut();
						},3000);
					});
					
				}
			}
		};

		// Build new markup
		createNumberDD.CB();
		mo.CB();
		// Bind click events
		elementBindings.DC();
		elementBindings.DWC();
		elementBindings.sMC();
		elementBindings.showWebClick();
		elementBindings.vWC();
		elementBindings.eTC();
		mo.closeBinder();
		//Form Validation
		formValidation.checkboxes();
		formValidation.formSubmit();

		userRefresh.load();
	}
}();
})();
