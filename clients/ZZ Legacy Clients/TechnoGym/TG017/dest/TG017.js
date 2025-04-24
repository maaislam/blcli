var _TG017= (function () {
	
		//PLUGINS
	// UC Library - Poller -- @version 0.2.2 -------
	// ---------------------------------------------
	var UC=function(t){var n=n||window.jQuery;return t.poller=function(t,n,e){var o={wait:50,multiplier:1.1,timeout:0},r=Date.now||function(){return(new Date).getTime()};if(e)for(var a in e)o[a]=e[a];else e=o;for(var i=!!o.timeout&&new Date(r()+o.timeout),s=o.wait,f=o.multiplier,l=[],c=function(e,o){if(i&&r()>i)return!1;o=o||s,function(){var t=typeof e;return"function"===t?e():"string"!==t||document.querySelector(e)}()?(l.push(!0),l.length===t.length&&n()):setTimeout(function(){c(e,o*f)},o)},m=0;m<t.length;m++)c(t[m])},t.throttle=function(t,n){var e,o,r,a=null,i=0;return function(){var s=Date.now||function(){return(new Date).getTime()};s=s(),i||(i=s);var f=n-(s-i);return e=this,o=arguments,(f<=0||f>n)&&(a&&(clearTimeout(a),a=null),i=s,r=t.apply(e,o),a||(e=o=null)),r}},t.group=function(t,n){for(var e=[],o=0;o<t.length;o+=n)e.push(t.slice(o,o+n));return e},t.hoverDelay=function(t,e,o){if(!n)return!1;var r,a,i=Date.now||function(){return(new Date).getTime()};return o||(o=1e3),n(t).hover(function(){a=i()},function(){r||i()-a>=o&&(e(),r=!0)}),t},t.observer={active:[],connect:function(t,n,e){var o={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(e)for(var r in e)o[r]=e[r];else e=o;for(var a,i=new MutationObserver(function(e){e.forEach(function(e){a||(a=!0,n(t,e),setTimeout(function(){a=!1},o.throttle))})}),s=0;s<t.length;s++)i.observe(t[s],o.config),this.active.push([t[s],i])},disconnect:function(t){for(var n=this.active,e=0;e<t.length;e++)for(var o=t[e],r=0;r<n.length;r++)o===n[r][0]&&n[r][1].disconnect()}},t.feedbackTab=function(){if(!n)return!1;var t,e,o,r,a,i,s,f=function(n){var e=t||{label:!1,content:!1,position:"left",customClass:!1,sessionClose:!0,tabDimensions:{height:"auto",width:"350px"},contentDimensions:{height:"350px",width:"600px"},mobileBreakpoint:768,animationSpeed:600,dimBackground:!1,zIndex:99999};if(n)for(var o in n)e[o]=n[o];else n=e;return e},l=function(){var e=n(['<div class="UC_fb-tab-container">','<div class="UC_fb-tab">','<span class="UC_fb-tab__inner"></span>','<span class="UC_fb-tab__close">&#215;</span>',"</div>",'<div class="UC_fb-content">','<div class="UC_fb-content__inner"></div>',"</div>","</div>"].join("")),r=e.find(".UC_fb-tab"),a=e.find(".UC_fb-content");return t.label&&r.find(".UC_fb-tab__inner").html(t.label),t.content&&a.find(".UC_fb-content__inner").html(t.content),t.customClass&&e.addClass(t.customClass),t.dimBackground&&(o=n('<div class="UC_fb-tab-bg"></div>')),r.css({height:t.tabDimensions.height,width:t.tabDimensions.width}),a.css({height:t.contentDimensions.height,width:t.contentDimensions.width}),e},c=function(){e&&e.remove(),o&&o.remove()},m=function(){var n,e;switch(t.position){case"left":n="-webkit-transform:rotate(-90deg) translateX(-50%);-moz-transform:rotate(-90deg) translateX(-50%);-ms-transform:rotate(-90deg) translateX(-50%);-o-transform:rotate(-90deg) translateX(-50%);transform:rotate(-90deg) translateX(-50%);transform-origin:top left;top:50%;left:100%;",e="top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);left:-100%;",s="width";break;case"right":n="-webkit-transform:rotate(-90deg) translateY(-100%);-moz-transform:rotate(-90deg) translateY(-100%);-ms-transform:rotate(-90deg) translateY(-100%);-o-transform:rotate(-90deg) translateY(-100%);transform:rotate(-90deg) translateY(-100%);transform-origin:top right;right:100%;",e="top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);right:-100%;",s="width";break;case"bottom":n="-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);bottom:100%;left:50%;",e="left:50%;-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);bottom:-100%;",s="height";break;case"top":n="-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);top:100%;left:50%;",e="left:50%;-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);top:-100%;",s="height";break;default:n="",e="",s="width"}var o=document.createElement("style");o.type="text/css";var r=".UC_fb-tab,.UC_fb-tab__close{display:inline-block;cursor:pointer}.UC_fb-content,.UC_fb-tab{max-width:100%;max-height:100%;box-sizing:border-box;background:#fff}.UC_fb-tab-container{position:fixed;z-index:"+t.zIndex+";"+e+"}.UC_fb-tab{position:absolute;margin:0 auto;text-align:center;z-index:"+t.zIndex+";color:#333;font-size:15px;padding:10px 10px 10px 20px;"+n+"}.UC_fb-tab__inner{display:inline-block;margin:0 auto}.UC_fb-tab__close{position:absolute;right:10px;font-family:sans-serif}.UC_fb-content{padding:20px;text-align:left;position:relative;}.UC_fb-tab-bg{display:none;background:#000;opacity:0.7;position:fixed;top:0;right:0;bottom:0;left:0;z-index:"+(t.zIndex-1)+";}";return o.styleSheet?o.styleSheet.cssText=r:o.appendChild(document.createTextNode(r)),o},d=function(){r&&r.parentElement.removeChild(r)},u=function(){var t=n(".UC_fb-tab-container"),e=t.children(".UC_fb-tab"),o=t.children(".UC_fb-content"),r=n(window);return{window:{width:r.innerWidth(),height:r.innerHeight()},tab:{width:e.outerWidth(),height:e.outerHeight()},content:{width:o.outerWidth(),height:o.outerHeight()}}},b=function(n){n||(n=u()),t||(t=f());var e={remove:{},open:{},close:{}};return e.remove[t.position]="-100%",e.open[t.position]="0",e.close[t.position]="-"+n.content[s]+"px",e},h=function(n){if(!n)return!1;var e=n.find(".UC_fb-tab"),r=n.find(".UC_fb-content"),s="closed";e.click(function(){var e,f,l;i=u(),a=b(i),e=i.window.width-i.tab.height-5,f=i.window.height-i.tab.height-5,r.css({"max-width":e,"max-height":f}),i.content.width>e&&(i.content.width=e),i.content.height>f&&(i.content.height=f),"open"===s?(l=a.close,o&&o.fadeOut()):(l=a.open,o&&o.fadeIn()),n.animate(l,t.animationSpeed,function(){s="open"===s?"closed":"open"})}),e.find(".UC_fb-tab__close").click(function(e){e.stopPropagation(),o&&o.fadeOut(),n.animate(a.remove,t.animationSpeed),t.sessionClose&&window.sessionStorage.setItem("ucfbtab-closed",1)})};return{init:function(n){var c=f(n);t!==c&&(t=c),t.sessionClose&&window.sessionStorage.getItem("ucfbtab-closed")||(e=l(),r=m(),e.prependTo("body"),document.body.insertBefore(r,e[0]),t.dimBackground&&e.before(o),i=u(),a=b(i),h(e),e.css(t.position,"-"+i.content[s]+"px"))},destroy:{component:c,css:d,all:function(){c(),d()}},refresh:function(t){this.destroy.all(),this.init(t)}}}(),t}(UC||{});
	
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
						experiment_str: 'TG017',
						variation_str: 'Variation 1'
					});
				}, { multiplier: 1.2, timeout: 0 });
			
				// Poll start
				UC.poller([
					'body',
					'.block-subscribe',
					function() {
						if (window.jQuery) return true;
					},
					function() {
						if (window.ga) return true;
					}
				], TG017, {
					timeout: 7000,
					multiplier: 'disable'
				});
					// Variation
					function TG017() {
	
				   var $ = window.jQuery;
				   var $body = $('body');
					$body.addClass('TG017');
	
	
			sendEvent('TG017 - Newsletter Signup', 'Page View', 'TG017 Page view', true);

		/*Add fade to body, will be used across each section*/
		var fadeBox = $('<div class="tg17-fade"/>');
		fadeBox.prependTo($body);

		/*-------------------------------------------------------------------
		1. Bottom of the page form 
		---------------------------------------------------------------------*/
		function bottomForm() {
				/*-------------------------------
				Add Email newsletter signup form to the Homepage
				---------------------------------*/
				var newsletterLink = $('<div class="tg17-newsletterLink col-sm-4"><i class="icon-Mail"></i><a href="#tg17-join">Join the Technogym Community</a></div>');
				$('.row.shortcode-row.fast_contacts.boxed-row:first').append(newsletterLink);


				/*-------------------------------
				create bottom newsletter block
				---------------------------------*/
				var bottomEmailform = $('<div id="tg17-join" class="tg17-newsletterpage-form"/>');


				/*-------------------------------------------------------------------
				if the form is on the newsroom page place it at the top otherwise place it at the bottom
				---------------------------------------------------------------------*/
				var URL = window.location.href;
				if (URL.match('https://www.technogym.com/gb/newsroom-home')) {
					bottomEmailform.prependTo('.post-container.page-container.default');
				} else {
					bottomEmailform.insertBefore('.container-fluid.fast_contacts_wrap');
				}


				bottomEmailform.html(['<div class="tg17-bottomForm">',
					'<h3><i class="icon-Mail"></i>Join The Technogym Community</h3>',

					'<div class="tg17-emailForm">',
					'<p class="tg17-email-text">Enter your email address<span>*</span></p>',
					'<input type="text" class="tg17-input" placeholder="Enter email address"/>',
					'<div class="tg17-submitbutton">Subscribe</div>',
					'<div class="tg17-emailBulletpoints"/>',
					'</div>',
					'</div>'].join(''));


				/*-------------------------------
				Smooth anchor link to new form area
				---------------------------------*/

				$('.tg17-newsletterLink a').click(function () {
					if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
						|| location.hostname == this.hostname) {

						var target = $(this.hash);
						target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
						if (target.length) {
							$('html,body').animate({
								scrollTop: target.offset().top
							}, 1000);
							return false;
						}
					}
				});


				/*-------------------------------
				usps for email form
				---------------------------------*/
				var usps = [
					['https://ab-test-sandbox.userconversion.com/experiments/TG017-tick.png', "Innovative Training Programme's"],
					['https://ab-test-sandbox.userconversion.com/experiments/TG017-tick.png', 'Exclusive Special Offers'],
					['https://ab-test-sandbox.userconversion.com/experiments/TG017-tick.png', 'Top tips on developing a wellness lifestyle'],
				]

				$.each(usps, function () {
					var tick = this[0],
						uspText = this[1];
					$('<div class="tg17-usp"><img src="' + tick + '"/><p>' + uspText + '</p></div>').appendTo('.tg17-emailBulletpoints');
				});

				/*-------------------------------
				when the "fake" form is filled, mirror this in the actual form
				---------------------------------*/
				var $footerForm = $('.footer-bottom.container .block-subscribe');

				$('.tg17-input').on('keyup keypress blur', function () {
					$footerForm.find('input').val($(this).val());
				});

				/*-------------------------------
				when the "fake" subscribe clicked, click actual submit bottom to open "father" form
				---------------------------------*/
				var submitEvent;

				$('.tg17-submitbutton').click(function () {
					$footerForm.find('.actions .button.btn-default').click();
					if(!submitEvent){
						sendEvent('TG017', 'Side tab opened, TG017 User opened form on homepage', '', true);
						submitEvent = true;
					}
				});

			}
			bottomForm();


			/*-------------------------------------------------------------------
			3. SLIDE OUT TAB ON CATEGORY PAGES
			---------------------------------------------------------------------*/
			function slideoutTab() {
				var body = $('body');
				var newTab = $('<div class="tg17-fixedform-tab"/>'),
					categoryForm = $('<div class="tg17-catForm"/>');
					newTab.prependTo(body);
					categoryForm.insertAfter('.tg17-fade');


				newTab.html(['<i class="icon-Mail"></i><p>Join the Technogym Community</p><p class="tg17-sidetext">for Tips & Training programmes</p>']);

				var newsletterForm = $('.block-subscribe > form');
				newsletterForm.appendTo('.tg17-catForm');

				/*text at the top of form*/
				categoryForm.find('.modal-body').prepend('<div class="tg17-catform-toptext"/>');

				$('.tg17-catform-toptext').html('<div class="tg17-exitform">&times;</div><i class="icon-Mail"></i><h3>Join the Technogym Community</h3><p>Get innovative training programmes, exclusive special benefits & top tips on living a wellness lifestyle</p>');


				/*move privacy policy within form*/
				$('.tg17-catForm .modal-body .privacy-link').insertAfter('.tg17-catForm .input-box .interest > label');

				/*remove placeholders*/
				$('.tg17-catForm .modal-body input').each(function () {
					$(this).attr('placeholder', '');
				});
				categoryForm.find('.modal .modal-footer .btn span').text('Subscribe');

				/*change label names*/
				categoryForm.find('.modal-body .input-box:first label').html('Enter your e-mail address here:<span class="required">*</span>');
				categoryForm.find('.modal-body .input-box:eq(1)').addClass('tg17-firstName').next().addClass('tg17-lastName');

				var tabEvent;
				/*slide out form on click*/
				newTab.click(function () {
					categoryForm.addClass('tg17-open');
					if(!tabEvent){
					sendEvent('TG017', 'Side tab opened, TG017 User opened email form on category page', '', true);
					tabEvent = true;
					}
				});

				$('.tg17-exitform').click(function(){
					categoryForm.removeClass('tg17-open');
				});
				$('.tg17-fade.tg17-fadeActive').click(function(){
					$('.tg17-fade').removeClass('tg17-fadeActive');
				});
			}

			/*-------------------------------------------------------------------
			4. EXIT INTENT FORM
			---------------------------------------------------------------------*/
			function exitForm(){

			var modal = {
				// Append modal to the body
				contentBuilder: function(){
					var lightbox = $('.tg17-fade').after([
						'<div class="tg17-lightbox tg17-catForm">',
							'<div class="tg17lightbox-exit">x</div>',
							'<div class="tg17-leftside"/>',
							'<div class="tg17-rightside"/>',
						'</div>'
					].join(''));


					var exitBox = $('.tg17-lightbox');
					var newsletterForm = $('.block-subscribe > form');
					newsletterForm.appendTo('.tg17-lightbox .tg17-leftside');

					exitBox.find('.modal-body').prepend('<div class="tg17-catform-toptext"/div>');
					
					exitBox.find('.tg17-catform-toptext').html('<i class="icon-Mail"></i><h3>Leaving already? Dont miss out on fitness & training advice</h3><p>Sign up to the newsletter to the innovative benefits & top tips on living a Wellness Lifestyle</p>');
					/*move privacy policy within form*/
				    exitBox.find('.modal-body .privacy-link').insertAfter('.tg17-lightbox .input-box .interest > label');
				
					/*remove placeholders*/
					$('.tg17-lightbox .modal-body input').each(function () {
						$(this).attr('placeholder', '');
					});

					$('.tg17lightbox-exit').click(function(){
						$('.tg17-fade').removeClass('tg17-fadeActive');
						exitBox.removeClass('tg17-active').hide();
					});
					$('.tg17-fade.tg17-fadeActive').click(function(){
						exitBox.removeClass('tg17-active').hide();
						$('.tg17-fade').removeClass('tg17-fadeActive');
					});

	
					$body.modal = $(".tg17-lightbox");
				}
			}
			
			
	
			var exitIntent = {
				// OuiBounce plugin
				ouiPlugin: function(){
					(function (root, factory) {
						if (typeof define === 'function' && define.amd) {
							define(factory);
						} else if (typeof exports === 'object') {
							module.exports = factory(require, exports, module);
						} else {
							root.ouibounce = factory();
						}
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
						cookieName: 'TG017exit', 
						cookieDomain: 'technogym.com',
						/*aggressive: true, Testing property, if the cookie exists ignore it and show it everytime on exit */
						callback: function() { 
							console.log('exit')
							$body.modal.fadeIn().addClass('tg17-active');
							$('.tg17-fade').addClass('tg17-fadeActive');
							var exitEvent;
							if(!exitEvent){
								sendEvent('TG017', 'Exit Intent has fired, form shown', '', true);
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
		}

		if ($body.hasClass('catalog-category-view')) {
			slideoutTab();
		}
        if($body.hasClass('catalog-product-view')){
			exitForm();
		}



		}
	
		})();
		