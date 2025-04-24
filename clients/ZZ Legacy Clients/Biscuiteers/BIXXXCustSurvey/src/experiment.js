// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import exitIntent from './lib/exit-intent';

var BIXXXCustomerSurvey = (function() {
	var trackerName,
		slideQ = false,
		$;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'.carousel-sliding img',
		], init);
	})();

	function init(){
		utils.fullStory('BIXXXCustomerSurvey', 'Variation 1');

        // Initial remove any existing elements
        // Workaround issues in sitegainer when hopping from one page to another
        var modal = document.querySelector('.BIXXXCustomerSurvey_pop-up_modal'),
            btnShow = document.querySelector('.BIXXX_show-modal'),
            btnHide = document.querySelector('.BIXXX_hide-modal');

        if(modal) modal.remove();
        if(btnShow) btnShow.remove();
        if(btnHide) btnHide.remove();
		
        // Build
		var cacheDom = function () {
			// Cache useful selectors for later use
			var bodyVar = document.querySelector('body'),
			    URL = window.location.href;

			// Modal selectors
			var modal, modalBG, modalBtn;

			bodyVar.className += ' BIXXXCustomerSurvey';

			// Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				modal: modal,
				modalBG: modalBG,
				modalBtn: modalBtn
			};
		}();
		
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

		function fadeIn(elem, ms) {
			if (!elem)
				return;

			elem.style.opacity = 0;
			elem.style.filter = "alpha(opacity=0)";
			elem.style.display = "inline-block";
			elem.style.visibility = "visible";

			if (ms) {
				var opacity = 0;
				var timer = setInterval(function () {
					opacity += 50 / ms;
					if (opacity >= 1) {
						clearInterval(timer);
						opacity = 1;
					}
					elem.style.opacity = opacity;
					elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
				}, 50);
			}
			else {
				elem.style.opacity = 1;
				elem.style.filter = "alpha(opacity=1)";
			}
		}

		function fadeOut(elem, ms) {
			if (!elem)
				return;

			if (ms) {
				var opacity = 1;
				var timer = setInterval(function () {
					opacity -= 50 / ms;
					if (opacity <= 0) {
						clearInterval(timer);
						opacity = 0;
						elem.style.display = "none";
						elem.style.visibility = "hidden";
					}
					elem.style.opacity = opacity;
					elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
				}, 50);
			}
			else {
				elem.style.opacity = 0;
				elem.style.filter = "alpha(opacity=0)";
				elem.style.display = "none";
				elem.style.visibility = "hidden";
			}
		}
		
		var modal = {
			// Append modal to the body
			contentBuilder: function (){
				cacheDom.bodyVar.insertAdjacentHTML('beforeend', ['<div class="BIXXXCustomerSurvey_pop-up_modal active"><div class="BIXXX_body_click"></div><div class="ITXXX_inner_div"><a class="BIXXXCustomerSurvey_close_btn">X</a><div class="BIXXXCustomerSurvey_overflow_fix"><h2>Will you help us improve your experience?</h2><p>Help us improve the Biscuiteers experiences for yourself and others with our simple survey (it will take less than 5 minutes - pinky promise!)</p><a class="BIXXXCustomerSurvey_cta" target="_blank" href="https://goo.gl/forms/B6tYWRNrNxQDL3Ri2">Yes please</a><a class="BIXXXCustomerSurvey_close-other">No thanks</a></div></div></div><a class="BIXXX_show-modal">Will you help us improve your experience?</a><a class="BIXXX_hide-modal">X</a><']);
				cacheDom.modal = document.querySelector(".BIXXXCustomerSurvey_pop-up_modal");
				cacheDom.modalBG = cacheDom.modal.querySelector('.BIXXX_body_click');	
				cacheDom.modalBtn = document.querySelector('.BIXXX_show-modal');
				cacheDom.modalBtn.style.height = 30;

				if(window.innerWidth < 768){
					var padTop = document.querySelector('.app-container').style.cssText.replace('padding-top: ', ''),
						padTopReplace = parseInt(padTop.replace('px;', ''));

					document.querySelector('.app-container').style.paddingTop = (padTopReplace + 35) + 'px';
					cacheDom.modalBtn.style.top = padTopReplace + 'px';
					document.querySelector('.BIXXX_hide-modal').style.top = padTopReplace + 'px';
				}

				fadeIn(cacheDom.modalBtn, 400);
				fadeIn(document.querySelector('.BIXXX_hide-modal'), 400);
				if(cacheDom.modal.classList.contains('active')){

				}

				var oldLocation = location.href;
				setInterval(function() {
					if(location.href != oldLocation) {
						utils.events.send('BIXXXCustomerSurvey', 'Modal Hide', 'User redirected', true);
						fadeOut(cacheDom.modalBtn, 400);
						fadeOut(document.querySelector('.BIXXX_hide-modal'), 400);
						fadeOut(cacheDom.modal, 400);
						oldLocation = location.href
					}
				}, 500); 
			},
			showModal: function() {
				fadeIn(cacheDom.modal, 400);
				utils.events.send('BIXXXCustomerSurvey', 'Modal Show', 'Modal Tab is shown', true);
				setTimeout(function () {
					cacheDom.modalBG.addEventListener('click', function(){
						fadeOut(cacheDom.modal, 400);
						setTimeout(function(){ 
							cacheDom.modal.classList.remove('active');
							utils.events.send('BIXXXCustomerSurveySurvey', 'Click', 'Closed survey', true);
						}, 400);
					});
				}, 400);
			} 
		};

		var elementBindings = {
			// Click function for the mobile tab variation to show the hidden options
			modalClickOn: function() {
				cacheDom.modalBtn.addEventListener('click', function(){
					if (slideQ === false) {
						slideQ = true;

						fadeIn(cacheDom.modal, 400);
						setTimeout(function () {
							cacheDom.modal.classList.add('active');
							slideQ = false;
						}, 400);
					}
				});
				cacheDom.modalBG.addEventListener('click', function(){
					if (slideQ === false) {
						slideQ = true;

						setTimeout(function(){ 
							cacheDom.modal.classList.remove('active');
							slideQ = false;
						}, 400);
						
						//fadeOut(cacheDom.modalBtn, 400);
						//fadeOut(document.querySelector('.BIXXX_hide-modal'), 400);
						fadeOut(cacheDom.modal, 400);
					}
				});
				document.querySelector('.BIXXXCustomerSurvey_close_btn').addEventListener('click', function(){
					if (slideQ === false) {
						slideQ = true;

						if (cacheDom.modal.classList.contains('active')) {
							fadeOut(cacheDom.modal, 400);
							setTimeout(function () {
								cacheDom.modal.classList.remove('active');
								slideQ = false;
								utils.events.send('BIXXXCustomerSurveySurvey', 'Click', 'Closed survey', true);
							}, 400);
							//fadeOut(cacheDom.modalBtn, 400);
							//fadeOut(document.querySelector('.BIXXX_hide-modal'), 400);
							fadeOut(cacheDom.modal, 400);
						} 
					}
				});
				document.querySelector('.BIXXXCustomerSurvey_close-other').addEventListener('click', function(){
					if (slideQ === false) {
						slideQ = true;

						if (cacheDom.modal.classList.contains('active')) {
							fadeOut(cacheDom.modal, 400);
							setTimeout(function () {
								cacheDom.modal.classList.remove('active');
								slideQ = false;
								utils.events.send('BIXXXCustomerSurveySurvey', 'Click', 'Closed survey', true);
							}, 400);
							//fadeOut(cacheDom.modalBtn, 400);
							//fadeOut(document.querySelector('.BIXXX_hide-modal'), 400);
							fadeOut(cacheDom.modal, 400);
						} 
					}
				});
			},
			// Send GA event when user clicks survey redirect
			surveyClickOn: function() {
				document.querySelector('.BIXXXCustomerSurvey_cta').addEventListener('click', function () {
					utils.events.send('BIXXXCustomerSurveySurvey', 'Click', 'Go to Survery', true);
					fadeOut(cacheDom.modalBtn, 400);
					fadeOut(document.querySelector('.BIXXX_hide-modal'), 400);
					fadeOut(cacheDom.modal, 400);
                    
                    // Set cookie to prevent future pages
                    setCookie('BIXXXCustomerSurvey', 'true', 200000000,'www.biscuiteers.com');
				});
			},
			hideModal: function(){
				document.querySelector('.BIXXX_hide-modal').addEventListener('click', function(){
					fadeOut(cacheDom.modalBtn, 400);
					fadeOut(document.querySelector('.BIXXX_hide-modal'), 400);
					fadeOut(cacheDom.modal, 400);
                    
                    // Event closed modal
					utils.events.send('BIXXXCustomerSurveySurvey', 'Click', 'Closed modal', true);

                    // Set cookie to prevent future pages
                    setCookie('BIXXXCustomerSurvey', 'true', 200000000,'www.biscuiteers.com');
				});
			}
		};

		if(!getCookie('BIXXXCustomerSurvey')) {
			// Build new DOM Elements
			modal.contentBuilder();

			// Bind click events
			elementBindings.modalClickOn();
			elementBindings.surveyClickOn();
			elementBindings.hideModal();

            // Exit intent show modal
            const exiter = exitIntent();
            exiter.init(function() {
                cacheDom.modalBtn.click();
            }, 'bixxx-cust-survey18', 'biscuiteers.com');
		}
	}	
})();
