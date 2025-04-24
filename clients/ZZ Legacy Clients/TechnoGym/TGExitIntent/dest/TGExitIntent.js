var TGExitIntent = (function() {

	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	
	UC.poller([
        'body > .wrapper',
		function () {
			if (window.jQuery) {
				return true;
			}
		}
	], run);

	function run(){
		var $ = window.jQuery;

		$('body').addClass('TGExitIntent');

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
				experiment_str: 'TGExitIntent',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });

        // Insert modal for exit intent to trigger
        $('body > .wrapper').after([
            '<div class="TG_pop-up_modal">',
                '<div>',
                '<a href="#" class="TG_close_btn">X</a>',
                    '<div class="overflow_fix">',
                        '<img src="https://www.technogym.com/skin/frontend/technogym/default/images/technogym.png" alt="Technogym">',
                        '<h2>Before you leave, would you like a chance to win a Wellness Ball - Active Sitting?<br /> We need your feedback!</h2>',
                        '<a class="TG_link" href="https://goo.gl/forms/RKHsXoj56J1izNU52">Go to survey</a>',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''));

        // SlideQ is a variable I use to stop animations building up by spam clicking by checking if its true or false 
        var slideQ = false,
            modal = $(".TG_pop-up_modal");

        if (slideQ == false) {
            // Check if animation/click is already happening
            $(".TG_pop-up_modal .TG_close_btn").on("click", function (e) {
                slideQ = true;
                e.preventDefault();

                if (modal.hasClass("active")) {
                    // If the modal is active, fade it out and reset the SlideQ
                    modal.fadeOut("slow", function () {
                        modal.removeClass("active");
                        slideQ = false;
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
                if (!$(event.target).closest('.TG_pop-up_modal > div').length) {
                    if (modal.hasClass("active")) {
                        modal.fadeOut("slow", function () {
                            modal.removeClass("active");
                            slideQ = false;
                        });
                    }
                }
            });
        }
        // Exit intent plugin, create custom named cookie for base domain, add active class to modal
        ouibounce($('.TG_pop-up_modal')[0], { 
            cookieName: 'TGExitIntent', 
            cookieDomain: 'technogym.com',
            //aggressive: true,/* Testing property, if the cookie exists ignore it and show it everytime on exit */
            callback: function() { 
                $(".TG_pop-up_modal").addClass('active');
            } 
        });
	}
})();