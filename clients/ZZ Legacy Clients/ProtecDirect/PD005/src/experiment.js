/* eslint-disable */
// Script 1
if (!document.querySelector('.pd5-feefo')) {
  (function () {
    if (typeof window.UC == 'undefined') {
      window.UC = {};
    }
    window.UC = function (a) {
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

    // -----------------------------------------------
    // Full story integration
    // -----------------------------------------------
    window.UC.poller([
      function () {
        var fs = window.FS;
        if (fs && fs.setUserVars) return true;
      }
    ], function () {
      window.FS.setUserVars({
        experiment_str: 'PD005',
        variation_str: 'Variation 1'
      });
    }, {
      multiplier: 1.2,
      timeout: 0
    });
  })();


  // Script 2
  (function () {
    var trackerName;

    function sendEvent(action, label, nonInteractionValue) {
      var category = 'PD005---Desktop Header Redesign';
      label = label || '';
      nonInteractionValue = nonInteractionValue || true;

      ga('send', 'event', category, action, label, {
        nonInteraction: nonInteractionValue
      });
    }

    // Poll start
    UC.poller([
      'body',
      '#header',
      '.nav_secondary',
      '#cart_header',
      '.siteLogo .cmsimage',
      '.La.sales_helpline',
      function () {
        if (window.jQuery) return true;
      },
      function () {
        if (window.ga) return true;
      }
    ], PD005, {
      timeout: 7000,
      multiplier: 'disable'
    });

    function PD005() {
      var $ = window.jQuery;

      $('body').addClass('PD005');

      sendEvent('pd5-page-view');

      /*-------------------------------
      Move header elements
      ---------------------------------*/
      $('.manage_users.search').prependTo('.nav_secondary');
      $('.brands').prependTo('.nav_secondary');

      var headerTopelements = $('#header .nav');
      headerTopelements.insertBefore('#cart_header');
      /*-------------------------------
      Change register/signin
      ---------------------------------*/
      var login = headerTopelements.find('.login'),
        register = headerTopelements.find('.register');

      register.html('<a href="/login">Sign In</a>'),
        login.html('<a href="/register">Register</a>');

      $('.La.sales_helpline').html('<span><b>Sales Helpline: </b>0870 333 3081</span>').prependTo(headerTopelements);
      /*-------------------------------
      Replace site logo
      ---------------------------------*/
      $('.siteLogo .cmsimage img').attr('src', '//cdn-sitegainer.com/nud86nmk3co1wmb.png');

      /*-------------------------------
      Navigation arrow
      ---------------------------------*/
      $('.nav_main .La > a').each(function () {
        $(this).append('<img class="pd5-arrow" src="//cdn-sitegainer.com/mk6j0hbivorbsyx.png"/>')
      });

    }
  })();

  // Script 3
  (function () {
    var trackerName;

    function sendEvent(action, label, nonInteractionValue) {
      var category = 'PD002---Mobile Product Page';
      label = label || '';
      nonInteractionValue = nonInteractionValue || true;

      ga('send', 'event', category, action, label, {
        nonInteraction: nonInteractionValue
      });
    }

    // Poll start
    UC.poller([
      'body',
      '#header',
      '.nav_secondary',
      '#cart_header',
      '.siteLogo .cmsimage',
      '.La.sales_helpline',
      function () {
        if (window.jQuery) return true;
      },
      function () {
        if (window.ga) return true;
      }
    ], PD005, {
      timeout: 7000,
      multiplier: 'disable'
    });

    function PD005() {
      var $ = window.jQuery;

      $('body').addClass('PD005');


      /*-------------------------------
      Add Clearance & USP bars
      ---------------------------------*/
      var uspBar = $('<div class="pd5-uspwrapper"></div>');
      uspBar.insertAfter('#nav_main');

      var uspHTML = [
        ['Get it by <b id="pd5_delivery-day"></b>', '<span id="pd5-countdown">order within</span>', '//cdn-sitegainer.com/nc5tqnl4ua497r8.png'],
        ['<b>Free</b> Delivery over £25', 'Free next day delivery as well! get it tomorrow', '//cdn-sitegainer.com/r4bs20ezv28rhdb.png'],
        ['Contact us on <b>0870 333 3081</b>', 'Monday to friday between 8:30am & 5:30pm', '//cdn-sitegainer.com/abqnhmn18ue4byu.png']
      ]

      $.each(uspHTML, function () {
        var mainText = this[0],
          subText = this[1],
          icon = this[2];

        $(['<div class="pd5-usp">',
          '<img src="' + icon + '"/>',
          '<div class="pd5-usptext">',
          '<h3>' + mainText + '</h3>',
          '<p>' + subText + '</p>',
          '</div>',
          '</div>'
        ].join('')).appendTo('.pd5-uspwrapper');
      });


      var clearanceBar = $('<div class="pd5-clearancewrapper"><a href="http://www.protecdirect.co.uk/All-Discounts/Clearance~c~clearance?utm_source=Homepage&utm_medium=Banner&utm_campaign=Clearance%20Header%20Slot">Clearance <img src="//cdn-sitegainer.com/pgeme4q8fhxi6kj.png"/></a></div>');
      clearanceBar.insertAfter(uspBar);

    }

  })();


  //SCRIPT 4
  (function () {
    var trackerName;

    function sendEvent(action, label, nonInteractionValue) {
      var category = 'PD002---Mobile Product Page';
      label = label || '';
      nonInteractionValue = nonInteractionValue || true;

      ga('send', 'event', category, action, label, {
        nonInteraction: nonInteractionValue
      });
    }

    // Poll start
    UC.poller([
      'body',
      '#header',
      '.nav_secondary',
      '#cart_header',
      '.siteLogo .cmsimage',
      '.La.sales_helpline',
      function () {
        if (window.jQuery) return true;
      },
      function () {
        if (window.ga) return true;
      }
    ], PD005, {
      timeout: 7000,
      multiplier: 'disable'
    });

    function PD005() {
      var $ = window.jQuery;

      $('body').addClass('PD005');

      /*-------------------------------
      FEEFO REVIEW
      ---------------------------------*/

      // var feefoBlock = $('<div class="pd5-feefo">feefo</div>');
      // feefoBlock.insertAfter('.siteLogo');

      // var reviewRating = '4.5',
      //   reviewNumber = '214';

      // feefoBlock.html(['<img src="https://ab-test-sandbox.userconversion.com/experiments/PD005-feefo.png"/>',
      //   '<div class="feefoReviews">',
      //   '<h4>' + reviewRating + ' / 5</h4>',
      //   '<p>based on ' + reviewNumber + ' reviews</p>',
      //   '</div>'
      // ].join(''));



      /*-------------------------------
	LOGGED IN AMEND
---------------------------------*/
      var loggedIn = $('.nav .logged_in');
      if (loggedIn.length) {
        $('.nav').addClass('pd5-loggedin');

        $('.logged_in, .my_account, .logout').wrapAll('<div class="pd5-loggedinlinks"/>');
      } else {
        $('.nav').removeClass('pd5-loggedin');
      }
    }
  })();

  /*SCRIPT 5*/


  (function () {
    var trackerName;

    function sendEvent(action, label, nonInteractionValue) {
      var category = 'PD002---Mobile Product Page';
      label = label || '';
      nonInteractionValue = nonInteractionValue || true;

      ga('send', 'event', category, action, label, {
        nonInteraction: nonInteractionValue
      });
    }

    // Poll start
    UC.poller([
      'body',
      '#header',
      '.nav_secondary',
      '#cart_header',
      '.siteLogo .cmsimage',
      '.La.sales_helpline',
      function () {
        if (window.jQuery) return true;
      },
      function () {
        if (window.ga) return true;
      }
    ], PD005, {
      timeout: 7000,
      multiplier: 'disable'
    });

    function PD005() {
      var $ = window.jQuery;

      $('body').addClass('PD005');

      /*-------------------------------
      Countdown
      ---------------------------------*/

      var UC = UC || {};
      // UC Library - Countdown -- @version 0.3.4
      UC.countdown = function (e) {
        var t = {
            cutoff: null,
            element: null,
            labels: {
              d: "days",
              h: "hours",
              m: "minutes",
              s: "seconds"
            },
            delivery: {
              deliveryDays: null,
              excludeDays: null,
              deliveryDayElement: null,
              tomorrowLabel: !1
            }
          },
          a = function (e, t) {
            var l, n;
            for (var r in t) l = e[r], n = t[r], Object.keys && -1 === Object.keys(e).indexOf(r) || ("object" == typeof n ? "[object Array]" === Object.prototype.toString.call(n) ? e[r] = n : a(l, n) : e[r] = n)
          };

        function l(e) {
          var t = function () {
            return c.indexOf(d[e.getDay()]) > -1
          };
          if (t())
            for (; t();) e.setDate(e.getDate() + 1);
          return e
        }
        a(t, e);
        var n, r, o = new Date,
          s = new Date(t.cutoff),
          d = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          u = t.delivery,
          y = u.deliveryDays,
          c = u.excludeDays,
          i = u.deliveryDayElement,
          f = {};
        if (c.length && c.indexOf(d[o.getDay()] > -1)) {
          var D = l(new Date(o)),
            v = (n = o, r = D, Math.round(Math.abs(+n - +r) / 864e5));
          s.setDate(s.getDate() + v)
        }
        o > s && (s.setDate(s.getDate() + 1), s = l(s)), f.cutoff = s.getTime();
        var g, h = Math.floor((s.getTime() - o.getTime()) / 1e3),
          m = document.querySelectorAll(t.element),
          b = setInterval(function () {
            var e = Math.floor(h / 24 / 60 / 60),
              a = Math.floor(h - 86400 * e),
              l = Math.floor(a / 3600),
              n = Math.floor(a - 3600 * l),
              r = Math.floor(n / 60),
              o = h % 60;
            o < 10 && (o = "0" + o);
            for (var s = 0, d = m.length; s < d; s++) m[s].innerHTML = [e > 0 ? '<span class="UC_cd-days">' + e + "</span> " + t.labels.d + " " : "", '<span class="UC_cd-hours">' + l + "</span> " + t.labels.h + " ", '<span class="UC_cd-minutes">' + r + "</span> " + t.labels.m + " ", '<span class="UC_cd-seconds">' + o + "</span> " + t.labels.s + " "].join("");
            0 === h ? clearInterval(b) : h--
          }, 1e3);
        if (y) {
          var M = ((g = new Date).setDate(s.getDate() + y), g = l(g)),
            p = document.querySelectorAll(i),
            w = d[M.getDay()];
          if (u.tomorrowLabel) {
            var T = new Date(o);
            T.setDate(T.getDate() + 1), T.getFullYear() == M.getFullYear() && T.getMonth() == M.getMonth() && T.getDate() == M.getDate() && (w = "tomorrow")
          }
          for (var j = 0, O = p.length; j < O; j++) p[j].innerHTML = w;
          f.deliveryDate = M.getTime(), f.deliveryDay = w
        }
        return f
      };

      // Create cutoff date and convert to ms since epoch with getTime
      var cutoff = new Date();
      cutoff.setUTCHours(17, 0, 0);
      cutoff = cutoff.getTime();

      // Put your containers somewhere
      $('#pd5-countdown').append([
        '<div class="countdown">',
        '<div id="pd5_countdown"></div>',
        '</div>',
      ].join(''));

      var $countdownMsg = $('.pd5-countdownMessage');
      $countdownMsg.html('Get it by <b id="pd5_delivery-day"></b>');

      var countdown = UC.countdown({
        cutoff: cutoff,
        element: '#pd5_countdown',
        delivery: {
          deliveryDays: 1, // How long an item takes to arrive
          excludeDays: ['Saturday', 'Sunday'], // Non-working days
          deliveryDayElement: '#pd5_delivery-day',
          tomorrowLabel: true
        }
      });

      // if ($countdownMsg.text().indexOf('tomorrow') > -1) {
      //   $countdownMsg.html('<b>Next Day</b> Delivery');
      // }


      // if(countdown.deliveryDay === 'Monday'){
      //   $('.pd5-countdownMessage').html('Get it by <b>Monday</b>');
      // }else if(countdown.deliveryDay === 'Saturday' || countdown.deliveryDay === 'Sunday'){
      // 	$('.pd5-countdownMessage').html('Get it by <b>Tuesday</b>');
      // }else{
      // 	$('.pd5-countdownMessage').html('<b>Next Day</b> Delivery');
      // }

      $('.manage_users.search .button').attr('src', '//www.sitegainer.com/fu/up/x0i4dhcnbheljdy.png');
    }
  })();
}