/* no_doc_ready */
var _CB087 = (function () {
	
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
						experiment_str: 'CB087',
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
				], CB087, {
					timeout: 7000,
					multiplier: 'disable'
				});
					// Variation
					function CB087() {

						var $ = window.jQuery;
						$('body').addClass('CB087');


						sendEvent('CB087', 'Page View', 'CB087 CurrentBody.com — Iluminage Site Changes Page view', true);


						//On iluminage pages add session storage to show they have come from there
						
						if(window.location.href.indexOf('http://www.iluminagebeauty.com/') > -1){
							sessionStorage.setItem('CB087-iluminage',1);
						}

						/*-------------------------------
						Add RRP to price
						---------------------------------*/
						function addRRP() {
							var rrpText = $('<div class="cb87-rrp">RRP:</div>');
							rrpText.prependTo('.product-type-data .price-box');

						};


						/*-------------------------------
						Add the shop now button & cb logo
						---------------------------------*/

						function shopNow() {
							var shopNowButton = $('<div class="cb98-shop_wrap"><img class="cb87-cb-logo"src="http://www.sitegainer.com/fu/up/xjl9t26xy5n32ae.png"/><div class="cb87-shop"><span>SHOP NOW</span></div></div>');
							shopNowButton.appendTo('.price-box');


						}

						/*Change availability text*/
						function availableText (){


							var productName = $('.product-name h1:first span').text();

							var availability = $('.product-type-data .availability');
							availability.text('Buy your iluminage '+productName+' from our UK Recommended Supplier');
						}

						/*-------------------------------
						Create the loader page that the user will see
						---------------------------------*/
						function addLoaderPage() {
							var loadingPage = $('<div class="cb87-loader"></div>');


							loadingPage.html(['<div class="cb87-loader-content">',
								'<span>Please wait</span>',
								'<div class="cb87-loader-bar"></div>',
								'<div class="cb87-loading-text">',
								'<span>...you are being directed to</span>',
								'<img src="http://www.sitegainer.com/fu/up/xjl9t26xy5n32ae.png"/>',
								'<span>Iluminage\'s selected online partner</span>',
								'</div>',
								'<div class="cb87-reasons">',
								'<span>Reasons to buy from </span><img class="cb87-logo"src="http://www.sitegainer.com/fu/up/xjl9t26xy5n32ae.png"/>',
								'</div>',
								'</div>'
							].join(''))


							loadingPage.prependTo('body');


							//USPS for loading page
							var loaderUSPs = [
								['http://www.sitegainer.com/fu/up/57w3ovumm4j3r1i.png', '<img class="cb87-ilogo" src="http://www.sitegainer.com/fu/up/l1wfsi3p9e0si5q.png"/><span>partner for 5 years</span>'],
								['http://www.sitegainer.com/fu/up/p5pl2fiyxqs6g5q.png', '<span>Beauty device experts</span>'],
								['http://www.sitegainer.com/fu/up/wwtdbwkfb9crytj.png', '<span>Free UK Delivery and Hassle Free Returns</span>'],
								['http://www.sitegainer.com/fu/up/4d0q2riyops6e1l.png', '<span>94% Rating</span>'],
							];

							$.each(loaderUSPs, function () {
								var icon = this[0],
									text = this[1];

								$('<div class="cb87-loaderUsp"><img src="' + icon + '">' + text + '</div>').appendTo('.cb87-reasons');
							});



							//Loading bar 
							loadingPage.find('.cb87-loader-bar').append([
								'<div class="cb87-progress">',
								'<div class="cb87-progress_bar"/>',
								'</div>'
							].join(''));


							function animateBar() {
								$('.cb87-progress_bar').width("0px");
								$('.cb87-progress_bar').animate({
									width: '99%'
								}, 7000, function () {
									setTimeout('animateBar()', 2500);
								});
							}



							//On click of button - show loader for a certain amount of time
							$('.cb87-shop').click(function () {
								$('body').addClass('cb87-loaderActive');
								loadingPage.addClass('cb87-loaderShow');

								animateBar();

								var URL = window.location.href;
								var productLink;
								if (URL === 'http://www.iluminagebeauty.com/uk/hair-removal/touch-permanent-hair-reduction') {
									productLink = 'http://www.currentbody.com/iluminage-touch.html?utm_source=cb-iluminage&utm_medium=site-test&utm_campaign=cb-iluminage-test';
								} else {
									productLink = 'http://www.currentbody.com/iluminage-youth-activator.html?utm_source=cb-iluminage&utm_medium=site-test&utm_campaign=cb-iluminage-test';
								}

								//then direct to currentbody
								setTimeout(function () {
									window.location.href = productLink;

									$('body').removeClass('cb87-loaderActive');

								}, 3500);

							});

						}

			

						/*-------------------------------
						Add badge to product on CB
						---------------------------------*/
						function currentBodypage() {
							var URL = window.location.href;
							var barShown;

							if (URL.indexOf('currentbody') > -1) {
								var badge = $('<div class="cb87-product-badge"><img src="http://www.sitegainer.com/fu/up/3alhtb94w5imuf7.jpg"/></div>');
								badge.prependTo('.product-img-box');
								

								//if bar hasnt been shown then show it
								if(!localStorage.getItem('cb87-barShown')){
									var greyBar = $('<div class="cb87-greyBar cb87-barShowing"><span>Thankyou for visiting<p>CURRENTBODY.COM.</p><span class="cb87-contact">If you have any questions, you can contact our experts on 0800 959 6565</span></div>')
									greyBar.prependTo('body');
									localStorage.setItem('cb87-barShown',1);

									setTimeout(function () {
										$('.cb87-barShowing').removeClass('cb87-barShowing');

									}, 10000);
									
								}
							}
						}


						if(window.location.href.indexOf('http://www.iluminagebeauty.com/') > -1){
							addRRP();
							shopNow();
							addLoaderPage();
							availableText ();
					    }


						//CB FUNCTIONS

						if($(sessionStorage.getItem('CB087-iluminage') && window.location.href.indexOf('currentbody') > -1)){
						
							console.log('on curretbody')
							currentBodypage();
						}
						
					}
	
		})();
		