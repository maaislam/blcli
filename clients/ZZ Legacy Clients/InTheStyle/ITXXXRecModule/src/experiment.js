// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var ITXXXREC = (function() {
	var trackerName,
		slideQ = false,
		$;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			function () {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], init);
	})();
	
    function init(){
		utils.fullStory('TG018', 'Variation 2');
		//utils.events.send('TG018', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
		//utils.events.send('TG018', 'Click', 'Show mobile clicked', true);

		var cacheDom = (function() {
			// Cache useful selectors for later use
			var bodyVar = $('body'),
				URL = window.location.href;
				
			// Modal selectors
			var modal,
				modalBG;

			bodyVar.addClass('ITXXXREC');
			
			// Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				modal: modal,
				modalBG: modalBG
			};
		})();

		var modal = {
			// Append modal to the body
			contentBuilder: function(){
				cacheDom.bodyVar.append([
					'<div class="ITXXXREC_pop-up_modal active">',
  						'<div class="ITXXX_body_click"></div>',
						'<div class="ITXXX_inner_div">',
							'<a href="#" class="ITXXXREC_close_btn">X</a>',
							'<div class="ITXXXREC_overflow_fix">',
								'<h2>Join us for a 20-minute phone call and receive a £30 In The Style voucher!</h2>',
								'<p>We are holding phone interviews that will last around 20 minutes, in which we will ask a few quick questions about yourself and how you use the In The Style website.</p>',
								'<p>In order to participate, please Click the link below</p>',
								'<a class="ITXXXREC_cta" href="https://goo.gl/forms/GQTY9B0nmixrO8b03">I want a £30 ITS voucher!</a>',
								'<a href="#" class="ITXXXREC_close-other">Na</a>',
							'</div>',
						'</div>',
					'</div>'
				].join(''));

				cacheDom.modal = $(".ITXXXREC_pop-up_modal");
				cacheDom.modalBG = cacheDom.modal.find('.ITXXX_body_click');
			},
			showModal: function(){
				setTimeout(function () {
					cacheDom.modal.fadeIn(function () {
						cacheDom.modalBG.on("mousedown touchstart", function () {
							if (cacheDom.modal.hasClass("active")) {
								cacheDom.modal.fadeOut("slow", function () {
									cacheDom.modal.removeClass("active");
									cacheDom.bodyVar.off("mousedown");
								});
							}
						});
					});
				}, 5000);
			}
		}
		
		var elementBindings = {
			// Click function for the mobile tab variation to show the hidden options
			modalClickOn: function(){
				cacheDom.modal.find('.ITXXXREC_close_btn, .ITXXXREC_close-other').on("click", function (e) {
					e.preventDefault();
					if (slideQ === false) {
						slideQ = true;

						if (cacheDom.modal.hasClass("active")) {
							cacheDom.modal.fadeOut("slow", function () {
								cacheDom.modal.removeClass("active");
								cacheDom.bodyVar.off("mousedown, touchstart");
								slideQ = false;
							});
						} else {
							cacheDom.modal.fadeIn("slow", function () {
								cacheDom.modal.addClass("active");
								slideQ = false;
							});

							cacheDom.modalBG.on("mousedown touchstart", function () {
								if (cacheDom.modal.hasClass("active")) {
									cacheDom.modal.fadeOut("slow", function () {
										cacheDom.modal.removeClass("active");
										cacheDom.bodyVar.off("mousedown");
									});
								}
							});
						}
					}
				});
			},
			// Send GA event when user clicks survey redirect
			surveyClickOn: function(){
				cacheDom.modal.find('.ITXXXREC_cta').on('click', function(){
					utils.events.send('ITXXXRECSurvey', 'Click', 'Go to Survery', true);
				});
			}
		};

		// Build new DOM Elements
		modal.contentBuilder();

		// Bind click events
		elementBindings.modalClickOn();
		elementBindings.surveyClickOn();

		// Display Modal
		modal.showModal();
	}
})();