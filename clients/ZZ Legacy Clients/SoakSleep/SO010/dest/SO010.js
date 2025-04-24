/* no_doc_ready */
var _SO010 = (function () {
	
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
						experiment_str: 'SO010',
						variation_str: 'Variation 1'
					});
				}, { multiplier: 1.2, timeout: 0 });
			
				// Poll start
				UC.poller([
					'body',
					'.top-promo',
					'.page-title-wrapper',
					'.grand.totals',
					'.cart-coupon-summary .block.shipping',
					'.form-cart-wrapper',
					function() {
						if (window.jQuery) return true;
					},
					function() {
						if (window.ga) return true;
					}
				], SO010, {
					timeout: 7000,
					multiplier: 'disable'
				});
					// Variation
					function SO010() {
	
				   var $ = window.jQuery;
					$('body').addClass('SO010');
	
	
		sendEvent('SO010', 'Page View', 'SO010 - Desktop Basket Redesign Page view', true);

		$('.sections.jjcom-megamenu.nav-sections').remove(); //effects the sticky banner if hidden & not removed


		//Add continue shopping button

		$('<a class="so10-continue" href="https://www.soakandsleep.com">< Continue Shopping</a>').insertAfter('.cart-coupon-summary');
		

		/*-------------------------------
		Add phone/Call times at the top
		---------------------------------*/
		function phoneBanner() {
			var phoneBanner = $('<div class="so10-phone_bar"></div>');
			phoneBanner.prependTo('.page-wrapper');

			var callUstext = $('.call-us .general-customer-data');
			phoneBanner.html(callUstext);

		};

		/*-------------------------------
		Add 3 message USPS
		---------------------------------*/
		function USPS() {

			var uspBar = $('<div class="so10-usp_bar"></div>');
			uspBar.insertBefore('.page-main');

			var uspMessages = [
				['Quality Guarantee','We select the very best materials to ensure your investment positively impacts your life','https://ab-test-sandbox.userconversion.com/experiments/SO010-diamond.png'],
				['Every penny goes further',"We regularly review our competitors' prices to ensure you get the very best value",'https://ab-test-sandbox.userconversion.com/experiments/SO010-pig.png'],
				['“I can’t say enough good things about this company. Always excellent customer service, fast shipping and beautiful linens”<span>- Tiffany, August 2017</span>',"",'https://ab-test-sandbox.userconversion.com/experiments/SO010-phone.png']
			]

			$.each(uspMessages,function(){
				var usptopText = this[0],
					uspinnerText = this[1],
					uspIcon = this[2];

				$(['<div class="so10-usp">',
						'<img src="'+uspIcon+'"/>',
							'<div class="so10-text">',
							  '<span>'+usptopText+'</span>',
							  '<span>'+uspinnerText+'</span>',
						    '</div>',
					'</div>'].join('')).appendTo(uspBar);
			});

		};

		/*-------------------------------
		Create Progress Bar
		---------------------------------*/
		function progressBar() {

			var basketTitle = $('.page-title-wrapper');

			basketTitle.html('<div class="so10-progressBar"></div>');

			var arrow = 'https://ab-test-sandbox.userconversion.com/experiments/SO010-arrow.png';

			basketTitle.find('.so10-progressBar').html('<h3 class="s010-active">Shopping Basket</h3><img src="'+arrow+'"/><h3>Delivery</h3><img src="'+arrow+'"/><h3>Review & Payments</h3>');  

			basketTitle.insertBefore('.page-main');


			
					
		};
		
		/*-------------------------------
		Countdown Timer - Taken from SO07
		---------------------------------*/
			//Countdown  
		UC.countdown=function(e){function t(e){var t=function(){return o[e.getDay()]},a=function(){return c.indexOf(t())>-1};if(a())for(;a();)e.setDate(e.getDate()+1);return e}var a={cutoff:null,element:null,labels:{d:"days",h:"hours",m:"minutes",s:"seconds"},delivery:{deliveryDays:null,excludeDays:null,deliveryDayElement:null,tomorrowLabel:!1}},n=function(e,t){var a,r;for(var l in t)a=e[l],r=t[l],Object.keys&&-1===Object.keys(e).indexOf(l)||("object"==typeof r?"[object Array]"===Object.prototype.toString.call(r)?e[l]=r:n(a,r):e[l]=r)};n(a,e);var r=new Date,l=new Date(a.cutoff),o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],s=a.delivery,u=s.deliveryDays,c=s.excludeDays,d=s.deliveryDayElement,y={};r>l&&(l.setDate(l.getDate()+1),l=t(l)),y.cutoff=l.getTime();var i=Math.floor((l.getTime()-r.getTime())/1e3),f=document.querySelectorAll(a.element),D=setInterval(function(){var e=Math.floor(i/24/60/60),t=Math.floor(i-86400*e),n=Math.floor(t/3600),r=Math.floor(t-3600*n),l=Math.floor(r/60),o=i%60;o<10&&(o="0"+o);for(var s=0,u=f.length;s<u;s++)f[s].innerHTML=[e>0?'<span class="UC_cd-days">'+e+"</span> "+a.labels.d+" ":"",'<span class="UC_cd-hours">'+n+"</span> "+a.labels.h+" ",'<span class="UC_cd-minutes">'+l+"</span> "+a.labels.m+" ",'<span class="UC_cd-seconds">'+o+"</span> "+a.labels.s+" "].join("");0===i?clearInterval(D):i--},1e3);if(u){var v=function(){var e=new Date;return e.setDate(l.getDate()+u),e=t(e)}(),g=document.querySelectorAll(d),m=o[v.getDay()];if(s.tomorrowLabel){var h=new Date(r);h.setDate(h.getDate()+1),h.getFullYear()==v.getFullYear()&&h.getMonth()==v.getMonth()&&h.getDate()==v.getDate()&&(m="tomorrow")}for(var b=0,p=g.length;b<p;b++)g[b].innerHTML=m;y.deliveryDate=v.getTime(),y.deliveryDay=m}return y};
		

		// Insert countdown elements
        var countdown = document.createElement('div');
		countdown.className = 'so10-countDown';
		countdown.innerHTML = 'Stock is reserved and items are held in your basket for <span class="so10-countdownTimer"></span>';
		
		var main = document.getElementById('maincontent');
		var pageTitle = document.querySelector('.page-title-wrapper');
		
		main.insertBefore(countdown, pageTitle.nextElementSibling);		


        // UC Library - Countdown implement -------------
        // Create cutoff date and convert to ms since epoch with getTime
        var timeToCountdown = 90 * 60 * 1000;
        var numMilliseondsSinceEpoch = (new Date()).getTime();
        var targetDateMilliseconds = numMilliseondsSinceEpoch + timeToCountdown;

        if(!localStorage.getItem('so-target-time')) {
            localStorage.setItem('so-target-time', targetDateMilliseconds);
        } else {
            var storedTime = parseInt(localStorage.getItem('so-target-time'));
            if(storedTime && (storedTime - (new Date()).getTime()) > 30) {
                targetDateMilliseconds = parseInt(storedTime);
            } else {
                localStorage.setItem('so-target-time', targetDateMilliseconds);
            }
        }

        UC.countdown({
            cutoff: targetDateMilliseconds,
            element: '.so10-countdownTimer',
        });
	 

		/*-------------------------------
		spend for free delivery messages - take from SO07
		---------------------------------*/
		function deliveryBox() {
            var basketPrice = document.querySelector('.data.table.totals .grand.totals .amount .price').innerText.replace('£', '');
            var basketNumber = parseFloat(basketPrice);
            var difference = 50.00 - basketNumber;

            if (basketNumber < 50.00) {
				var under50freedeliv = document.createElement('div');
				under50freedeliv.className = 'so10-deliverymessage so10-spend50';
				under50freedeliv.innerHTML = 'Spend <span>£' + difference + '</span> more to qualify for <strong>FREE</strong> standard delivery';
	
				var cartTotals = document.getElementById('cart-totals');
				var cart = cartTotals.parentElement;
                cart.insertBefore(under50freedeliv, cartTotals.nextElementSibling);
            } else {
				var freeDelivery = document.createElement('div');
				freeDelivery.className = 'so10-deliverymessage so10-freedelivery';
				freeDelivery.innerHTML = 'You\'ve qualified for <strong>FREE</strong> delivery';

				var grandTotal = document.querySelector('.grand.totals');
				grandTotal.parentElement.insertBefore(freeDelivery, grandTotal);

			}

			//Insert after helper function
			function insertAfter(el, referenceNode) {
				referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
			}
			var basketMessage = document.querySelector('.so10-deliverymessage');

			var deliveryCheckoutmessage = document.createElement('div');
				deliveryCheckoutmessage.className = 'so10-checkoutdelivery';
				deliveryCheckoutmessage.innerHTML = 'Choose delivery method at checkout';

				insertAfter(deliveryCheckoutmessage,basketMessage);
		}

		/*-------------------------------
		Delivery types to go under total box
		---------------------------------*/
		function deliveryTypes() {

			var deliveryTypeBlock= document.createElement('div');
				deliveryTypeBlock.className = 'so10-deliveryTypes';
				deliveryTypeBlock.innerHTML = '<ul><h4>Convieniant, Reliable Delivery</h4><li><span></span>Standard delivery 3-5 working days</li><li><span></span>Next day and weekend options from £4.95</li><li><span></span>We’ll keep you updated at every stage via email and text</li></ul>';

			var crossSellblock = document.querySelector('.cart-coupon-summary');
			crossSellblock.appendChild(deliveryTypeBlock);
			

			
					
		};

		/*-------------------------------
		Exit intent Pop up
		---------------------------------*/
		function exitPopup() {
			var $body = $('body');

			var fadeBox = $('<div class="so010-fade"/>');
			fadeBox.prependTo($body);

			var modal = {
				// Append modal to the body
				contentBuilder: function(){
					var lightbox = $('.so010-fade').after([
						'<div class="so010-exit_box">',
							'<div class="so010-exit">x</div>',
							'<div class="so10-inner_content">',
								'<div class="so10-logo"><img src="https://media.soakandsleep.com/media/logo/stores/1/logo.png"/></div>',
								'<h3>Leaving already? Save your items for later</h3>',
								'<div class="so10-wishlist">Add all items to wishlist</div>',
								'<div class="so10-adviceBox">',
									'<h4>Need some advice?</h4>',
									'<div class="so10-adviceContent so10contact"><img src="https://ab-test-sandbox.userconversion.com/experiments/SO010-pig.png"/><span><p>Every Penny goes further</p>We regularly review our competitors prices to ensure we get you the very best value</span></div>',
									'<div class="so10-adviceContent so10usp"><span>Call us: 01483 437762</span><span>Open: Mon - Fri 8am 0 7pm</span><span>Email: info@soakandsleep.com</span></div>',
								'</div>',
							'</div>',
						'</div>'
					].join(''));

					var exitBox = $('.so010-exit_box');


					$('.so010-exit').click(function(){
						fadeBox.removeClass('so010-active');
						exitBox.removeClass('so010-exitactive').hide();
					});
					$('.so010-fade').click(function(){
						fadeBox.removeClass('so010-active');
						exitBox.removeClass('so010-exitactive').hide();
					});

                    $body.modal = $(".so010-exit_box");
				}
			}
			
			
	
			var exitIntent = {
				// OuiBounce plugin
				ouiPlugin: function(){
					(function (root, factory) {
						
							root.ouibounce = factory();
						
					}(this, function (require, exports, module) {
	
						return function ouibounce(el, custom_config) {
							"use strict";
	
							var config = custom_config || {},
								aggressive = config.aggressive || false,
								sensitivity = setDefault(config.sensitivity, 20),
								timer = setDefault(config.timer, 1000),
								delay = setDefault(config.delay, 0),
								callback = config.callback || function () { },
								cookieExpire = setDefaultCookieExpire(config.cookieExpire) || '',
								cookieDomain = config.cookieDomain ? ';domain=' + config.cookieDomain : '',
								cookieName = config.cookieName ? config.cookieName : 'viewedOuibounceModal',
								sitewide = config.sitewide === true ? ';path=/' : '',
								_delayTimer = null,
								_html = document.documentElement;
	
							function setDefault(_property, _default) {
								return typeof _property === 'undefined' ? _default : _property;
							}
	
							function setDefaultCookieExpire(days) {
								// transform days to milliseconds
								var ms = days * 24 * 60 * 60 * 1000;
	
								var date = new Date();
								date.setTime(date.getTime() + ms);
	
								return "; expires=" + date.toUTCString();
							}
	
							setTimeout(attachOuiBounce, timer);
							function attachOuiBounce() {
								if (isDisabled()) { return; }
	
								_html.addEventListener('mouseleave', handleMouseleave);
								_html.addEventListener('mouseenter', handleMouseenter);
								_html.addEventListener('keydown', handleKeydown);
							}
	
							function handleMouseleave(e) {
								if (e.clientY > sensitivity) { return; }
	
								_delayTimer = setTimeout(fire, delay);
							}
	
							function handleMouseenter() {
								if (_delayTimer) {
									clearTimeout(_delayTimer);
									_delayTimer = null;
								}
							}
	
							var disableKeydown = false;
							function handleKeydown(e) {
								if (disableKeydown) { return; }
								else if (!e.metaKey || e.keyCode !== 76) { return; }
	
								disableKeydown = true;
								_delayTimer = setTimeout(fire, delay);
							}
	
							function checkCookieValue(cookieName, value) {
								return parseCookies()[cookieName] === value;
							}
	
							function parseCookies() {
								// cookies are separated by '; '
								var cookies = document.cookie.split('; ');
	
								var ret = {};
								for (var i = cookies.length - 1; i >= 0; i--) {
									var el = cookies[i].split('=');
									ret[el[0]] = el[1];
								}
								return ret;
							}
	
							function isDisabled() {
								return checkCookieValue(cookieName, 'true') && !aggressive;
							}
	
							// You can use ouibounce without passing an element
							// https://github.com/carlsednaoui/ouibounce/issues/30
							function fire() {
								if (isDisabled()) { return; }
	
								if (el) { $(el).fadeIn(); }
	
								callback();
								disable();
							}
	
							function disable(custom_options) {
								var options = custom_options || {};
	
								// you can pass a specific cookie expiration when using the OuiBounce API
								// ex: _ouiBounce.disable({ cookieExpire: 5 });
								if (typeof options.cookieExpire !== 'undefined') {
									cookieExpire = setDefaultCookieExpire(options.cookieExpire);
								}
	
								// you can pass use sitewide cookies too
								// ex: _ouiBounce.disable({ cookieExpire: 5, sitewide: true });
								if (options.sitewide === true) {
									sitewide = ';path=/';
								}
	
								// you can pass a domain string when the cookie should be read subdomain-wise
								// ex: _ouiBounce.disable({ cookieDomain: '.example.com' });
								if (typeof options.cookieDomain !== 'undefined') {
									cookieDomain = ';domain=' + options.cookieDomain;
								}
	
								if (typeof options.cookieName !== 'undefined') {
									cookieName = options.cookieName;
								}
	
								document.cookie = cookieName + '=true' + cookieExpire + cookieDomain + sitewide;
	
								// remove listeners
								_html.removeEventListener('mouseleave', handleMouseleave);
								_html.removeEventListener('mouseenter', handleMouseenter);
								_html.removeEventListener('keydown', handleKeydown);
							}
	
							return {
								fire: fire,
								disable: disable,
								isDisabled: isDisabled
							};
						};
					}));
				},
				// OUIBounce trigger
				exitTrigger: function () {
					this.ouibounce($body.modal[0], { 
						cookieName: 'SO010', 
						cookieDomain: 'soakandsleep.com',
						/*aggressive: true, Testing property, if the cookie exists ignore it and show it everytime on exit */
						callback: function() { 
							console.log('exit')
							$body.modal.fadeIn().addClass('so010-exitactive');
							$('.so010-fade').addClass('so010-active');
							var exitEvent;
							if(!exitEvent){
								sendEvent('SO010', 'Exit Intent has fired, form shown', '', true);
								exitEvent = true;
							}
						} 
					});
				}
			}
	
			
			// Build new DOM Elements
			modal.contentBuilder();
	
			
	
			// OUIBounce trigger
			exitIntent.ouiPlugin();
			exitIntent.exitTrigger();


			//On wishlist button click, click real wishlist button
			var exitWishlistButton = $('.so10-wishlist'),
				realWishlist = $('.form-cart-wrapper .action.update:first');

				var wishlistClickevent;

				exitWishlistButton.click(function(){
					realWishlist.click();
					if(!wishlistClickevent){
						sendEvent('SO010', 'Page View', 'SO010 - Clicked add to wishlist in exit pop up', true);
						wishlistClickevent = true;
					}
				});


		}		
		//run all functions here
		phoneBanner();
		USPS();
		progressBar();
		deliveryBox();
		deliveryTypes();
		exitPopup();
		
	}
	
})();
		