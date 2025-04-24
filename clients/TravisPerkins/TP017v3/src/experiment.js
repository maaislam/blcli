/* eslint-disable */

var TP017v2 = (function () {

	// UC Library - Poller -- @version 0.2.2
	var UC = function (a) {
		return a.poller = function (a, b, c) {
			var d = {
					wait: 50,
					multiplier: 0,
					timeout: 7000
				},
				e = Date.now || function () {
					return (new Date).getTime()
				};
			if (c)
				for (var f in c) d[f] = c[f];
			else c = d;
			for (var g = !!d.timeout && new Date(e() + d.timeout), h = d.wait, i = d.multiplier, j = [], l = function (c, d) {
					if (g && e() > g) return !1;
					d = d || h,
						function () {
							var a = typeof c;
							return "function" === a ? c() : "string" !== a || document.querySelector(c)
						}() ? (j.push(!0), j.length === a.length && b()) : setTimeout(function () {
							l(c, d * i)
						}, d)
				}, m = 0; m < a.length; m++) l(a[m])
		}, a
	}(UC || {});

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

	UC.poller([
		'body',
		function () {
			if (window.jQuery) {
				return true;
			}
		}
	], run);

	function run() {
    setTimeout(() => {
      // Cookie Setter Helper Function.
      function setCookie(c_name, value, exdays, c_domain) {
        c_domain = (typeof c_domain === "undefined") ? "" : "domain=" + c_domain + ";";
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value + ";" + c_domain + "path=/";
      }

      // Cookie Getter Helper Function.
      function getCookie(name) {
        var match = document.cookie.match(name + '=([^;]*)');
        return match ? match[1] : undefined;
      }

      $('body').addClass('TP017v3').append([
        '<div class="pop-up_modal active">',
          '<div>',
            '<a href="#" class="close_btn">✕</a>',
            '<div class="overflow_fix">',
              '<h2>A quick question</h2>',
              '<h3>Are you using Travis Perkins for:</h3>',
              '<div class="cf_wrap clearfix cookie_tgl">',
                '<div class="TP017_col_6">',
                  '<a href="#" class="trade_cookie">',
                  '<img src="//sb.monetate.net/img/1/581/1456531.png" />',
                  // //sb.monetate.net/img/1/581/1456571.png white img
                  // //sb.monetate.net/img/1/581/1456531.png black img
                  '<span>Trade</span></a>',
                '</div>',
                '<div class="TP017_col_6">',
                  '<a href="#" class="diy_cookie">',
                  '<img src="//sb.monetate.net/img/1/581/1456532.png" />',
                  // //sb.monetate.net/img/1/581/1456574.png white img
                  // //sb.monetate.net/img/1/581/1456532.png Black img
                  '<span>DIY</span></a>',
                '</div>',
              '</div>',
            '</div>',
          '</div>',
        '</div>'
      ].join(''));

      var slideQ = false,
        modal = $(".pop-up_modal"),
        submitBtn = $('.TP_confirm_btn'),
        tradeCookie = $('.trade_cookie'),
        diyCookie = $('.diy_cookie'),
        sessionSeen = sessionStorage.getItem('TP017v3');

      if (getCookie('tradeType') == 'DIY' || getCookie('tradeType') == 'Trade' || getCookie('tradeType') == 'Closed' || localStorage.getItem('TP017v3-close') === '3' || (sessionSeen && sessionSeen === 'Seen')) {
      } else {
        modal.fadeIn(function(){
          sessionStorage.setItem('TP017v3', 'Seen');
          if (!localStorage.getItem('TP017v3-close')) {
            localStorage.setItem('TP017v3-close', '1');
          } else if (localStorage.getItem('TP017v3-close') === '1') {
            localStorage.setItem('TP017v3-close', '2');
          } else if (localStorage.getItem('TP017v3-close') === '2') {
            localStorage.setItem('TP017v3-close', '3');
            setCookie('tradeType', 'Closed', null, 'www.travisperkins.co.uk');
          }
        });
      }

      $(".pop-up_modal .close_btn").on("click", function (e) {
        if (slideQ == false) {
          slideQ = true;
          e.preventDefault();
          sendEvent('TP017v3', 'Closed Trade Modal', '', true);

          if (modal.hasClass("active")) {
            modal.fadeOut("slow", function () {
              modal.removeClass("active");
              slideQ = false;
            });
          } else {
            modal.fadeIn("slow", function () {
              modal.addClass("active");
              slideQ = false;
            });
          }
        }
      });

      tradeCookie.on('click', function () {
        if (diyCookie.hasClass('active')) {
          diyCookie.removeClass('active');
        }

        tradeCookie.addClass('active');
      });

      diyCookie.on('click', function () {
        if (tradeCookie.hasClass('active')) {
          tradeCookie.removeClass('active');
        }

        diyCookie.addClass('active');
      });

      $('.trade_cookie').on('click', function(){
        setCookie('tradeType', 'Trade', null, 'www.travisperkins.co.uk');
        modal.fadeOut("slow", function () {
          modal.removeClass("active");
          sendEvent('TP017v3', 'Submitted Trade Type', 'Trade', true, 6, 'Trade');
        });
      });

      $('.diy_cookie').on('click', function(){
        setCookie('tradeType', 'DIY', null, 'www.travisperkins.co.uk');
        modal.fadeOut("slow", function () {
          modal.removeClass("active");
          sendEvent('TP017v3', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
        });
      });
    }, 100);
    //10000);
	};
})();