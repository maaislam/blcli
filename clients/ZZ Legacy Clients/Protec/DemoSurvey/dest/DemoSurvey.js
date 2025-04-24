var DemoSurvey = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	var JQ = window.jQuery,
		slideQ = false,
		trackerName;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
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
				experiment_str: 'DemoSurvey',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });

		var cacheDom = (function() {
			// Cache useful selectors for later use
			var bodyVar = JQ('body'),
				URL = window.location.href;
				
			// Modal selectors
			var modal;

			bodyVar.addClass('DemoSurvey');
			
			// Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				modal: modal,
			};
		})();

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
			//sendEvent('CB080', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
			//sendEvent('CB080', 'Closed Trade Modal', '', true);	
		})();

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

		var modal = {
			// Append modal to the body
			contentBuilder: function(){
				cacheDom.bodyVar.append([
					'<div class="DemoSurvey_pop-up_modal active">',
						'<div>',
							'<a href="#" class="DemoSurvey_close_btn">X</a>',
							'<div class="DemoSurvey_overflow_fix">',
								'<h2>Win a £50 Amazon Voucher!</h2>',
								'<p>We would love to know more about our users; please answer this short, 10-minute survey and you could win a £50 Amazon Voucher!</p>',
								'<a class="DemoSurvey_cta" href="https://goo.gl/forms/DSEEEBUw30j4OnMe2">Enter</a>',
							'</div>',
						'</div>',
					'</div>'
				].join(''));

				cacheDom.modal = JQ(".DemoSurvey_pop-up_modal");
			},
			showModal: function(){
				if(getCookie('ProTecSurveyCookie') == 'true'){
				}
				else{
					setTimeout(function(){
						cacheDom.modal.fadeIn(function(){
							cacheDom.bodyVar.on("mousedown", function (e) {
								if (!JQ(e.target).closest(".DemoSurvey_pop-up_modal > div").length) {
									if (cacheDom.modal.hasClass("active")) {
										cacheDom.modal.fadeOut("slow", function () {
											cacheDom.modal.removeClass("active");
											cacheDom.bodyVar.off("mousedown");
											setCookie('ProTecSurveyCookie', true, 200000000,'www.protecdirect.co.uk');
										});
									}
								}
							});
						});
					}, 10000);
				}
			}
		}
		
		var elementBindings = {
			// Click function for the mobile tab variation to show the hidden options
			modalClickOn: function(){
				cacheDom.modal.find('.DemoSurvey_close_btn').on("click", function (e) {
					e.preventDefault();

					if (slideQ === false) {
						slideQ = true;

						if (cacheDom.modal.hasClass("active")) {
							cacheDom.modal.fadeOut("slow", function () {
								cacheDom.modal.removeClass("active");
								cacheDom.bodyVar.off("mousedown");
								slideQ = false;
							});
						} else {
							cacheDom.modal.fadeIn("slow", function () {
								cacheDom.modal.addClass("active");
								slideQ = false;
							});

							cacheDom.bodyVar.on("mousedown", function (e) {
								if (!JQ(e.target).closest(".DemoSurvey_pop-up_modal > div").length) {
									if (cacheDom.modal.hasClass("active")) {
										cacheDom.modal.fadeOut("slow", function () {
											cacheDom.modal.removeClass("active");
											cacheDom.bodyVar.off("mousedown");
											slideQ = false;
										});
									}
								}
							});
						}
					}
				});
			},
			// Send GA event when user clicks survey redirect
			surveyClickOn: function(){
				cacheDom.modal.find('.DemoSurvey_cta').on('click', function(){
					sendEvent('DemoSurveySurvey', 'Clicked Go to Survery', '', true);
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