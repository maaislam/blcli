/* eslint-disable */
var UC = {};
if (typeof UC == 'undefined') {
  UC = {};
}
UC = function (a) {
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

(function () {
  // -----------------------------------------------
  // Full story integration
  // -----------------------------------------------
  UC.poller([
    function () {
      var fs = window.FS;
      if (fs && fs.setUserVars) return true;
    }
  ], function () {
    window.FS.setUserVars({
      experiment_str: 'GR005',
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

  // function sendEvent(action, label, nonInteractionValue) {
  //   var category = 'PD005---Desktop Header Redesign';
  //   label = label || '';
  //   nonInteractionValue = nonInteractionValue || true;

  //   ga('send', 'event', category, action, label, {
  //     nonInteraction: nonInteractionValue
  //   });
  // }

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

    // sendEvent('pd5-page-view');

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

    $('.La.sales_helpline').html('<span><b>Sales Helpline: </b>0845 300 6672</span>').prependTo(headerTopelements);
    /*-------------------------------
    Replace site logo
    ---------------------------------*/
    $('.siteLogo .cmsimage img').attr('src', '//www.greenham.com/medias/sys_master/email/email/hff/hfe/8842970234910/logo.png');

    /*-------------------------------
    Navigation arrow
    ---------------------------------*/
    $('.nav_main .La > a').each(function () {
      $(this).append('<span class="pd5-arrow"></span>')
    });

  }
})();


// Script 3
(function () {
  var trackerName;

  // function sendEvent(action, label, nonInteractionValue) {
  //   var category = 'PD002---Mobile Product Page';
  //   label = label || '';
  //   nonInteractionValue = nonInteractionValue || true;

  //   ga('send', 'event', category, action, label, {
  //     nonInteraction: nonInteractionValue
  //   });
  // }

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
// .my_favourites /my-account/my-favourites
// .saved_baskets /saved-baskets
// .quick_order /my-account/quickOrder
    var favs = false;
    var savedBaskets = false;
    var quickOrder = false;

    var catalogue = false;
    var contract = false;

    if (document.querySelector('.my_favourites')) {
      favs = true;
    }

    if (document.querySelector('.saved_baskets')) {
      savedBaskets = true;
    }

    if (document.querySelector('.quick_order')) {
      quickOrder = true;
    }

    if (document.querySelector('.custom_category')) {
      catalogue = true;
    }

    if (document.querySelector('.custom_category')) {
      catalogue = true;
    }

    if (document.querySelector('.custom_category')) {
      catalogue = true;
    }

    if (document.querySelector('.contract_products')) {
      contract = true;
    }

    if (favs === true || savedBaskets === true || quickOrder === true || contract === true || catalogue === true) {
      document.getElementById('nav_main').classList.add('PD005_quick-alt');
      document.getElementById('nav_main').insertAdjacentHTML('afterbegin', '<div class="PD005_quicklinks"></div>');
      const navMain = document.querySelector('.PD005_quicklinks');
      const URL = window.location.pathname;

      if (catalogue === true) {
        var catEl = document.querySelector('.custom_category a');
        if (URL.indexOf('~c~cc_') > -1) {
          navMain.insertAdjacentHTML('beforeend', `<a href="${catEl.href}" class="PD005_link PD005_active PD005_nocase">${catEl.textContent.trim()}</a>`);
        } else {
          navMain.insertAdjacentHTML('beforeend', `<a href="${catEl.href}" class="PD005_link PD005_nocase">${catEl.textContent.trim()}</a>`);
        }
      }
      if (contract === true) {
        var contractEl = document.querySelector('.contract_products a');
        if (URL.indexOf('/Contract-Products') > -1) {
          navMain.insertAdjacentHTML('beforeend', `<a href="${contractEl.href}" class="PD005_link PD005_active">${contractEl.textContent.trim()}</a>`);
        } else {
          navMain.insertAdjacentHTML('beforeend', `<a href="${contractEl.href}" class="PD005_link">${contractEl.textContent.trim()}</a>`);
        }
      }
      if (favs === true) {
        if (URL.indexOf('/my-account/my-favourites') > -1) {
          navMain.insertAdjacentHTML('beforeend', '<a href="/my-account/my-favourites" class="PD005_link PD005_active">My Favourites</a>');
        } else {
          navMain.insertAdjacentHTML('beforeend', '<a href="/my-account/my-favourites" class="PD005_link">My Favourites</a>');
        }
      }
      if (savedBaskets === true) {
        if (URL.indexOf('/saved-baskets') > -1) {
          navMain.insertAdjacentHTML('beforeend', '<a href="/saved-baskets" class="PD005_link PD005_active">Saved Baskets</a>');
        } else {
          navMain.insertAdjacentHTML('beforeend', '<a href="/saved-baskets" class="PD005_link">Saved Baskets</a>');
        }
      }
      if (quickOrder === true) {
        if (URL.indexOf('/my-account/quickOrder') > -1) {
          navMain.insertAdjacentHTML('beforeend', '<a href="/my-account/quickOrder" class="PD005_link PD005_active">Quick Order</a>');
        } else {
          navMain.insertAdjacentHTML('beforeend', '<a href="/my-account/quickOrder" class="PD005_link">Quick Order</a>');
        }
      }
    }

    var uspHTML = [
      ['Find your local Service Centre', 'Service Centres Nationwide - <a href="https://www.greenham.com/storelist">Visit us today</a>', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/></svg>'],
      ['<b>Free</b> Delivery', 'ON ALL ONLINE ORDERS', '<img src="https://d191y0yd6d0jy4.cloudfront.net/9axj7zi7usaxyxn.png" />'],
      ['Contact us on <b>0845 300 6672</b>', 'WAITING TO HEAR FROM YOU 24/7!', '<img src="https://d191y0yd6d0jy4.cloudfront.net/i8jil76k3fa0s3m.png "/>']
    ]

    $.each(uspHTML, function () {
      var mainText = this[0],
        subText = this[1],
        icon = this[2];

      if (icon) {
        $(['<div class="pd5-usp">',
          icon,
          '<div class="pd5-usptext">',
          '<h3>' + mainText + '</h3>',
          '<p>' + subText + '</p>',
          '</div>',
          '</div>'
        ].join('')).appendTo('.pd5-uspwrapper');
      } else {
        $(['<div class="pd5-usp">',
          '<div class="pd5-usptext">',
          '<h3>' + mainText + '</h3>',
          '<p>' + subText + '</p>',
          '</div>',
          '</div>'
        ].join('')).appendTo('.pd5-uspwrapper');
      }
    });


    var clearanceBar = $('<div class="pd5-clearancewrapper"><a href="https://www.greenham.com/Special-Offers~c~D">Special Offers <img src="//cdn-sitegainer.com/pgeme4q8fhxi6kj.png"/></a></div>');
    clearanceBar.insertAfter(uspBar);

  }

})();


//SCRIPT 4
(function () {
  var trackerName;

  // function sendEvent(action, label, nonInteractionValue) {
  //   var category = 'PD002---Mobile Product Page';
  //   label = label || '';
  //   nonInteractionValue = nonInteractionValue || true;

  //   ga('send', 'event', category, action, label, {
  //     nonInteraction: nonInteractionValue
  //   });
  // }

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

  // function sendEvent(action, label, nonInteractionValue) {
  //   var category = 'PD002---Mobile Product Page';
  //   label = label || '';
  //   nonInteractionValue = nonInteractionValue || true;

  //   ga('send', 'event', category, action, label, {
  //     nonInteraction: nonInteractionValue
  //   });
  // }

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
      function t(e) {
        var t = function () {
            return o[e.getDay()]
          },
          a = function () {
            return c.indexOf(t()) > -1
          };
        if (a())
          for (; a();) e.setDate(e.getDate() + 1);
        return e
      }
      if (!$) return !1;
      var a = {
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
        r = function (e, t) {
          var a, n;
          for (var l in t) a = e[l], n = t[l], Object.keys && -1 === Object.keys(e).indexOf(l) || ("object" == typeof n ? "[object Array]" === Object.prototype.toString.call(n) ? e[l] = n : r(a, n) : e[l] = n)
        };
      r(a, e);
      var n = new Date,
        l = new Date(a.cutoff),
        o = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        s = a.delivery,
        u = s.deliveryDays,
        c = s.excludeDays,
        d = s.deliveryDayElement,
        i = {};
      n > l && (l.setDate(l.getDate() + 1), l = t(l)), i.cutoff = l.getTime();
      var y = Math.floor((l.getTime() - n.getTime()) / 1e3),
        f = document.querySelectorAll(a.element),
        D = setInterval(function () {
          var e = Math.floor(y / 24 / 60 / 60),
            t = Math.floor(y - 86400 * e),
            r = Math.floor(t / 3600),
            n = Math.floor(t - 3600 * r),
            l = Math.floor(n / 60),
            o = y % 60;
          o < 10 && (o = "0" + o);
          for (var s = 0, u = f.length; s < u; s++) f[s].innerHTML = [e > 0 ? '<span class="UC_cd-days">' + e + "</span> " + a.labels.d + " " : "", '<span class="UC_cd-hours">' + r + "</span> " + a.labels.h + " ", '<span class="UC_cd-minutes">' + l + "</span> " + a.labels.m + " ", '<span class="UC_cd-seconds">' + o + "</span> " + a.labels.s + " "].join("");
          0 === y ? clearInterval(D) : y--
        }, 1e3);
      if (u) {
        var v = function () {
            var e = new Date;
            return e.setDate(l.getDate() + u), e = t(e)
          }(),
          g = document.querySelectorAll(d),
          m = o[v.getDay()];
        if (s.tomorrowLabel) {
          var h = new Date(n);
          h.setDate(h.getDate() + 1), h.getFullYear() == v.getFullYear() && h.getMonth() == v.getMonth() && h.getDate() == v.getDate() && (m = "tomorrow")
        }
        for (var b = 0, p = g.length; b < p; b++) g[b].innerHTML = m;
        i.deliveryDate = v.getTime(), i.deliveryDay = m
      }
      return i
    };

    // Create cutoff date and convert to ms since epoch with getTime
    var cutoff = new Date();
    cutoff.setUTCHours(17, 0, 0);
    cutoff = cutoff.getTime();

    // Put your containers somewhere
    $('#pd5-countdown').append([
      '<div class="countdown">',
      '<div id="pd5_countdown"></div>',
      '<div id="pd5_delivery-day"></div>',
      '</div>',
    ].join(''));

    var countdown = UC.countdown({
      cutoff: cutoff,
      element: '#pd5_countdown',
      delivery: {
        deliveryDays: 1, // How long an item takes to arrive
        excludeDays: ['Saturday', 'Sunday'], // Non-working days
        //deliveryDayElement: '#pd5_delivery-day',
        tomorrowLabel: false
      }
    });
    if (countdown.deliveryDay === 'Monday') {
      $('.pd5-countdownMessage').html('Get it by <b>Monday</b>');
    } else if (countdown.deliveryDay === 'Saturday' || countdown.deliveryDay === 'Sunday') {
      $('.pd5-countdownMessage').html('Get it by <b>Tuesday</b>');
    } else {
      $('.pd5-countdownMessage').html('<b>Next Day</b> Delivery');
    }

    $('.manage_users.search .button').attr('src', '//www.sitegainer.com/fu/up/x0i4dhcnbheljdy.png');

  }
})();