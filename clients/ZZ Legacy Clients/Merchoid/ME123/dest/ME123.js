// ------------------------------------
//VARIATION 1
// ---------------------------------------------

/* no_doc_ready */
/*
var _ME123 = (function () {
	
	 // PLUGINS ------------------------------------
	// UC Library - Poller -- @version 0.2.2 
	// ---------------------------------------------
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
		// Send GA Events With Tracker Name ------------
		// ---------------------------------------------
		function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;
		
		    // -----------------------------------------------
			// Full story integration
			// -----------------------------------------------
			UC.poller([
					function() {
						var fs = window.FS;
						if (fs && fs.setUserVars) return true;
					}
				], function () {
					window.FS.setUserVars({
						experiment_str: 'ME123',
						variation_str: 'Variation 1'
					});
				}, { multiplier: 1.2, timeout: 0 });
			
				// Poll start
				UC.poller([
					'body',
					function() {
						if (window.jQuery) return true;
					},
					function() {
						if (window.ga) return true;
					}
				], ME123, {
					timeout: 7000,
					multiplier: 'disable'
				});
					// Variation
					function ME123() {
	
				   var $ = window.jQuery;
					$('body').addClass('ME123');
	
	
					sendEvent('ME123', 'Page View', 'ME123 - Christmas Jumper Page', true);

		   }
	
	})();
*/

// ------------------------------------
//VARIATION 2
// ---------------------------------------------

/* no_doc_ready */

/*
var _ME123 = (function () {
	
	 // PLUGINS ------------------------------------
	// UC Library - Poller -- @version 0.2.2 
	// ---------------------------------------------
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
		// Send GA Events With Tracker Name ------------
		// ---------------------------------------------
		function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;
		
		    // -----------------------------------------------
			// Full story integration
			// -----------------------------------------------
			UC.poller([
					function() {
						var fs = window.FS;
						if (fs && fs.setUserVars) return true;
					}
				], function () {
					window.FS.setUserVars({
						experiment_str: 'ME123',
						variation_str: 'Variation 2'
					});
				}, { multiplier: 1.2, timeout: 0 });
			
				// Poll start
				UC.poller([
					'body',
					'.radical-variations-wrapper-container .radical-variations-wrapper .single_variation_wrap',
					function() {
						if (window.jQuery) return true;
					},
					function() {
						if (window.ga) return true;
					}
				], ME123, {
					timeout: 7000,
					multiplier: 'disable'
				});
					// Variation
					function ME123() {
	
				   var $ = window.jQuery;
					$('body').addClass('ME123v2');
	
	
					sendEvent('ME123', 'Page View', 'ME123 - Christmas Jumper Page V1', true);


					//Insert red message bar
					var redBar = $('<div class="me123-red_bar"/>');
					redBar.insertAfter('.radical-variations-wrapper-container .radical-variations-wrapper .single_variation_wrap');

					var treeIcon = 'https://ab-test-sandbox.userconversion.com/experiments/ME123-christmas-tree.png';
					redBar.html('<p><img src="'+treeIcon+'"/><span>WARNING:</span> These jumpers are fun, fabulous quality but not for everyone!</p>');

		   }
	
	})();
		
	*/

	// ------------------------------------
//VARIATION 3
// ---------------------------------------------

/* no_doc_ready */
var _ME123 = (function () {
	
	 // PLUGINS ------------------------------------
	// UC Library - Poller -- @version 0.2.2 
	// ---------------------------------------------
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
		// Send GA Events With Tracker Name ------------
		// ---------------------------------------------
		function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;
		
		    // -----------------------------------------------
			// Full story integration
			// -----------------------------------------------
			UC.poller([
					function() {
						var fs = window.FS;
						if (fs && fs.setUserVars) return true;
					}
				], function () {
					window.FS.setUserVars({
						experiment_str: 'ME123',
						variation_str: 'Variation 3'
					});
				}, { multiplier: 1.2, timeout: 0 });
			
				// Poll start
				UC.poller([
					'body',
					'.radical-variations-wrapper-container .radical-variations-wrapper .single_variation_wrap',
					function() {
						if (window.jQuery) return true;
					},
					function() {
						if (window.ga) return true;
					}
				], ME123, {
					timeout: 7000,
					multiplier: 'disable'
				});
					// Variation
					function ME123() {
	
				   var $ = window.jQuery;
					$('body').addClass('ME123v3');
	
	
					sendEvent('ME123', 'Page View', 'ME123 - Christmas Jumper Page V1', true);


					/*Insert countdown bar*/
					var countdownBar = $('<div class="me123-christmasCountdownbar"><p>Christmas is loading ...</p><div class="me123-xmasbar"></div></div>');
					countdownBar.insertAfter('.radical-variations-wrapper-container .radical-variations-wrapper .single_variation_wrap');

					function christmasCountdown() {
						//Progress bar plugin

						$.getScript('https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js', function() {
								var target = new Date('12/25/2017'),
								today = new Date(),
								daysToGo = Math.ceil((target.getTime() - today.getTime() ) / (1000*60*60*24)),
								percent = 100 - daysToGo;
							
								$(".me123-christmasCountdownbar .me123-xmasbar").progressbar({
									value: percent,
									create: function(event, ui) {
										$('.ui-progressbar-value').append(daysToGo + ' days');
									}
								});
							});
						}
					

					christmasCountdown();

		   }
	
	})();
		