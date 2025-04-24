var WO010 = (function() {

	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	
	UC.poller([
        'body',
		function () {
			if (window.jQuery) {
				return true;
			}
		}
	], run);

	function run(){
		var $ = window.jQuery,
            url = window.location.href;
            
		$('body').addClass('WOExitIntent');

        var trackerName;
        function sendEvent(category, action, label, nonInteractionValue, dimensionValue, dimensionName) {
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

        (function(root, factory) {
            if (typeof define === 'function' && define.amd) {
                define(factory);
            } else if (typeof exports === 'object') {
                module.exports = factory(require,exports,module);
            } else {
                root.ouibounce = factory();
            }
            }(this, function(require,exports,module) {

            return function ouibounce(el, custom_config) {
            "use strict";

            var config     = custom_config || {},
                aggressive   = config.aggressive || false,
                sensitivity  = setDefault(config.sensitivity, 20),
                timer        = setDefault(config.timer, 1000),
                delay        = setDefault(config.delay, 0),
                callback     = config.callback || function() {},
                cookieExpire = setDefaultCookieExpire(config.cookieExpire) || '',
                cookieDomain = config.cookieDomain ? ';domain=' + config.cookieDomain : '',
                cookieName   = config.cookieName ? config.cookieName : 'viewedOuibounceModal',
                sitewide     = config.sitewide === true ? ';path=/' : '',
                _delayTimer  = null,
                _html        = document.documentElement;

            function setDefault(_property, _default) {
                return typeof _property === 'undefined' ? _default : _property;
            }

            function setDefaultCookieExpire(days) {
                // transform days to milliseconds
                var ms = days*24*60*60*1000;

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
                else if(!e.metaKey || e.keyCode !== 76) { return; }

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

		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'WO010ExitIntent',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });

        if(url.indexOf("/cart") > -1){
            $('body').append([
                '<div class="WO_pop-up_modal">',
                    '<div>',
                    '<a href="#" class="WO_close_btn">X</a>',
                        '<div class="overflow_fix">',
                            '<img src="//useruploads.visualwebsiteoptimizer.com/useruploads/198344/images/823705159b1851b4fa01dd7f6bf16b4b_logodark.png" alt="Wooden Blinds Logo" />',
                            '<h2>Get a FREE sample of your blind</h2>',
                            '<a class="WO_free_sample" href="/pages/samples">Get FREE Sample</a><br />',
                            '<ul>',
                                '<li>Get up to 8 samples completely FREE</li>',
                                '<li>Get your sample tomorrow*</li>',
                                '<li>We\'re here to help on 01924 481 712 <span>Monday to Friday, 8.30am to 6pm, Saturday & Sunday 10am to 4pm</span></li>',
                            '</ul>',
                            '<p class="WO_small_print">*next day delivery if ordered before 3pm on a weekday</p>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join(''));
        }
        else if(url.indexOf("/product") > -1){
            var productName = $('#product_title h1.title').text();

            $('body').append([
                '<div class="WO_pop-up_modal">',
                    '<div>',
                    '<a href="#" class="WO_close_btn">X</a>',
                        '<div class="overflow_fix">',
                            '<h2>Wait, why not get a free sample?</h2>',
                            '<p>Get a free sample of ' + productName + ' tomorrow*</p>',
                            '<div class="WO_trustpilot"></div>',
                            '<a class="WO_free_sample" href="#">Get FREE Sample</a>',
                            '<p>Get up to 8 FREE samples at Wooden Blinds Direct</p>',
                            '<p class="WO_small_print">*next day delivery if ordered before 2pm on a weekday</p>',
                        '</div>',
                    '</div>',
                '</div>',
            ].join(''));
        }
        // Insert modal for exit intent to trigger
        
        // Copy trustpilot widget over
        $('.trustpilot-widget iframe').clone().appendTo('.WO_trustpilot');

        // SlideQ is a variable I use to stop animations building up by spam clicking by checking if its true or false 
        var slideQ = false,
            modal = $(".WO_pop-up_modal");

        if (slideQ == false) {
            // Check if animation/click is already happening
            $(".WO_pop-up_modal .WO_close_btn").on("click", function (e) {
                slideQ = true;
                e.preventDefault();

                if (modal.hasClass("active")) {
                    // If the modal is active, fade it out and reset the SlideQ
                    modal.fadeOut("slow", function () {
                        modal.removeClass("active");
                        slideQ = false;
                        sendEvent('TP017v2', 'User closed modal' + url, '', true);
                    });
                } else {
                    // If the modal is not active, fade it in and reset the SlideQ
                    modal.fadeIn("slow", function () {
                        modal.addClass("active");
                        slideQ = false;
                    });
                }
            });
            // Check if the user clicks not on the modal, if the modal is active then hide it
            $(document).on('click', function(event) {
                if (!$(event.target).closest('.WO_pop-up_modal > div').length) {
                    if (modal.hasClass("active")) {
                        modal.fadeOut("slow", function () {
                            modal.removeClass("active");
                            sendEvent('TP017v2', 'User closed modal' + url, '', true);
                            slideQ = false;
                        });
                    }
                }
            });
        }

        // Exit intent plugin, create custom named cookie for base domain, add active class to modal
        ouibounce($('.WO_pop-up_modal')[0], { 
            cookieName: 'WOExitIntent', 
            cookieDomain: 'wooden-blinds-direct.co.uk',
            aggressive: true,/* Testing property, if the cookie exists ignore it and show it everytime on exit */
            callback: function() { 
                console.log('trig');
                $(".WO_pop-up_modal").addClass('active');
                sendEvent('TP017v2', 'Opened Exit Intent Modal' + url, '', true);
            } 
        });
        $('.WO_free_sample').on('click', function(){
            $('#sample input[type="image"]').click();
            sendEvent('TP017v2', 'User clicked sample button' + url, '', true);
        });
	}
})();