// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var TPXXXSurv = (function() {
	var trackerName,
		slideQ = false,
		J;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			function () {
				if (window.jQuery) {
					J = window.jQuery
					return true;
				}
			}
		], init);
	})();
	
    function init(){
		utils.fullStory('TPXXXSurvey', 'Variation 1');

		function setCookie(c_name,value,exdays,c_domain) {
			c_domain = (typeof c_domain === "undefined") ? "" : "domain=" + c_domain + ";";
			var exdate=new Date();
			exdate.setDate(exdate.getDate() + exdays);
			var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
			document.cookie=c_name + "=" + c_value + ";" + c_domain + "path=/";
		}

		function getCookie(name) {
			var match = document.cookie.match(name+'=([^;]*)');
			return match ? match[1] : undefined;
		}

		var cacheDom = (function() {
			// Cache useful selectors for later use
			var bodyVar = J('body');
				
			// Modal selectors
			var modal,
				modalBG;

			bodyVar.addClass('TPXXXSurv');
			
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
					'<div class="TPXXXSurv_pop-up_modal">',
  						'<div class="ITXXX_body_click"></div>',
						'<div class="ITXXX_inner_div">',
							'<a href="#" class="TPXXXSurv_close_btn">X</a>',
							'<div class="TPXXXSurv_overflow_fix">',
								'<h2><span>Before you go!</span> Help us improve our site by answering a few quick questions.</h2>',
								'<p>We are always looking to improve our website, and we\'d love to hear your feedback. Please click below to answer a quick survey,  it will take no longer than 5 minutes to complete.</p>',
								'<a class="TPXXXSurv_cta" href="https://goo.gl/forms/gYHLxBhU8B5MVOI02">Begin</a>',
							'</div>',
						'</div>',
					'</div>'
				].join(''));

				cacheDom.modal = J(".TPXXXSurv_pop-up_modal");
				cacheDom.modalBG = cacheDom.modal.find('.ITXXX_body_click');
			},
			showModal: function(){
				if(getCookie('TPXXXOrderSurvey') == 'true'){
					console.log('true');
				}
				else{
					cacheDom.modal.fadeIn(function () {
					console.log('fadein');
						setCookie('TPXXXOrderSurvey', 'true' ,20000000,'www.travisperkins.co.uk');
						cacheDom.modalBG.on("mousedown touchstart", function () {
							if (cacheDom.modal.hasClass("active")) {
								cacheDom.modal.fadeOut("slow", function () {
									cacheDom.modal.removeClass("active");
									cacheDom.bodyVar.off("mousedown");
								});
							}
						});
					});
				}
			}
		}
		
		var elementBindings = {
			// Click function for the mobile tab variation to show the hidden options
			modalClickOn: function(){
				cacheDom.modal.find('.TPXXXSurv_close_btn, .TPXXXSurv_close-other').on("click", function (e) {
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
				cacheDom.modal.find('.TPXXXSurv_cta').on('click', function(){
					utils.events.send('TPXXXSurvSurvey', 'Click', 'Go to Survery', true);
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