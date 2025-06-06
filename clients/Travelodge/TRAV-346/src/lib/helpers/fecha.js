export default () => {
  !(function (t, n) {
    'object' == typeof exports && 'undefined' != typeof module
      ? n(exports)
      : 'function' == typeof define && define.amd
      ? define(['exports'], n)
      : n((t.fecha = {}));
  })(this, function (t) {
    'use strict';
    var n = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,
      e = '[^\\s]+',
      r = /\[([^]*?)\]/gm;
    function o(t, n) {
      for (var e = [], r = 0, o = t.length; r < o; r++) e.push(t[r].substr(0, n));
      return e;
    }
    var u = function (t) {
      return function (n, e) {
        var r = e[t]
          .map(function (t) {
            return t.toLowerCase();
          })
          .indexOf(n.toLowerCase());
        return r > -1 ? r : null;
      };
    };
    function a(t) {
      for (var n = [], e = 1; e < arguments.length; e++) n[e - 1] = arguments[e];
      for (var r = 0, o = n; r < o.length; r++) {
        var u = o[r];
        for (var a in u) t[a] = u[a];
      }
      return t;
    }
    var i = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      d = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      s = o(d, 3),
      f = {
        dayNamesShort: o(i, 3),
        dayNames: i,
        monthNamesShort: s,
        monthNames: d,
        amPm: ['am', 'pm'],
        DoFn: function (t) {
          return t + ['th', 'st', 'nd', 'rd'][t % 10 > 3 ? 0 : ((t - (t % 10) != 10 ? 1 : 0) * t) % 10];
        },
      },
      m = a({}, f),
      c = function (t) {
        return (m = a(m, t));
      },
      l = function (t) {
        return t.replace(/[|\\{()[^$+*?.-]/g, '\\$&');
      },
      h = function (t, n) {
        for (void 0 === n && (n = 2), t = String(t); t.length < n; ) t = '0' + t;
        return t;
      },
      g = {
        D: function (t) {
          return String(t.getDate());
        },
        DD: function (t) {
          return h(t.getDate());
        },
        Do: function (t, n) {
          return n.DoFn(t.getDate());
        },
        d: function (t) {
          return String(t.getDay());
        },
        dd: function (t) {
          return h(t.getDay());
        },
        ddd: function (t, n) {
          return n.dayNamesShort[t.getDay()];
        },
        dddd: function (t, n) {
          return n.dayNames[t.getDay()];
        },
        M: function (t) {
          return String(t.getMonth() + 1);
        },
        MM: function (t) {
          return h(t.getMonth() + 1);
        },
        MMM: function (t, n) {
          return n.monthNamesShort[t.getMonth()];
        },
        MMMM: function (t, n) {
          return n.monthNames[t.getMonth()];
        },
        YY: function (t) {
          return h(String(t.getFullYear()), 4).substr(2);
        },
        YYYY: function (t) {
          return h(t.getFullYear(), 4);
        },
        h: function (t) {
          return String(t.getHours() % 12 || 12);
        },
        hh: function (t) {
          return h(t.getHours() % 12 || 12);
        },
        H: function (t) {
          return String(t.getHours());
        },
        HH: function (t) {
          return h(t.getHours());
        },
        m: function (t) {
          return String(t.getMinutes());
        },
        mm: function (t) {
          return h(t.getMinutes());
        },
        s: function (t) {
          return String(t.getSeconds());
        },
        ss: function (t) {
          return h(t.getSeconds());
        },
        S: function (t) {
          return String(Math.round(t.getMilliseconds() / 100));
        },
        SS: function (t) {
          return h(Math.round(t.getMilliseconds() / 10), 2);
        },
        SSS: function (t) {
          return h(t.getMilliseconds(), 3);
        },
        a: function (t, n) {
          return t.getHours() < 12 ? n.amPm[0] : n.amPm[1];
        },
        A: function (t, n) {
          return t.getHours() < 12 ? n.amPm[0].toUpperCase() : n.amPm[1].toUpperCase();
        },
        ZZ: function (t) {
          var n = t.getTimezoneOffset();
          return (n > 0 ? '-' : '+') + h(100 * Math.floor(Math.abs(n) / 60) + (Math.abs(n) % 60), 4);
        },
        Z: function (t) {
          var n = t.getTimezoneOffset();
          return (n > 0 ? '-' : '+') + h(Math.floor(Math.abs(n) / 60), 2) + ':' + h(Math.abs(n) % 60, 2);
        },
      },
      M = function (t) {
        return +t - 1;
      },
      D = [null, '\\d\\d?'],
      Y = [null, e],
      y = [
        'isPm',
        e,
        function (t, n) {
          var e = t.toLowerCase();
          return e === n.amPm[0] ? 0 : e === n.amPm[1] ? 1 : null;
        },
      ],
      p = [
        'timezoneOffset',
        '[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?',
        function (t) {
          var n = (t + '').match(/([+-]|\d\d)/gi);
          if (n) {
            var e = 60 * +n[1] + parseInt(n[2], 10);
            return '+' === n[0] ? e : -e;
          }
          return 0;
        },
      ],
      S = {
        D: ['day', '\\d\\d?'],
        DD: ['day', '\\d\\d'],
        Do: [
          'day',
          '\\d\\d?' + e,
          function (t) {
            return parseInt(t, 10);
          },
        ],
        M: ['month', '\\d\\d?', M],
        MM: ['month', '\\d\\d', M],
        YY: [
          'year',
          '\\d\\d',
          function (t) {
            var n = +('' + new Date().getFullYear()).substr(0, 2);
            return +('' + (+t > 68 ? n - 1 : n) + t);
          },
        ],
        h: ['hour', '\\d\\d?', void 0, 'isPm'],
        hh: ['hour', '\\d\\d', void 0, 'isPm'],
        H: ['hour', '\\d\\d?'],
        HH: ['hour', '\\d\\d'],
        m: ['minute', '\\d\\d?'],
        mm: ['minute', '\\d\\d'],
        s: ['second', '\\d\\d?'],
        ss: ['second', '\\d\\d'],
        YYYY: ['year', '\\d{4}'],
        S: [
          'millisecond',
          '\\d',
          function (t) {
            return 100 * +t;
          },
        ],
        SS: [
          'millisecond',
          '\\d\\d',
          function (t) {
            return 10 * +t;
          },
        ],
        SSS: ['millisecond', '\\d{3}'],
        d: D,
        dd: D,
        ddd: Y,
        dddd: Y,
        MMM: ['month', e, u('monthNamesShort')],
        MMMM: ['month', e, u('monthNames')],
        a: y,
        A: y,
        ZZ: p,
        Z: p,
      },
      v = {
        default: 'ddd MMM DD YYYY HH:mm:ss',
        shortDate: 'M/D/YY',
        mediumDate: 'MMM D, YYYY',
        longDate: 'MMMM D, YYYY',
        fullDate: 'dddd, MMMM D, YYYY',
        isoDate: 'YYYY-MM-DD',
        isoDateTime: 'YYYY-MM-DDTHH:mm:ssZ',
        shortTime: 'HH:mm',
        mediumTime: 'HH:mm:ss',
        longTime: 'HH:mm:ss.SSS',
      },
      H = function (t) {
        return a(v, t);
      },
      b = function (t, e, o) {
        if (
          (void 0 === e && (e = v.default),
          void 0 === o && (o = {}),
          'number' == typeof t && (t = new Date(t)),
          '[object Date]' !== Object.prototype.toString.call(t) || isNaN(t.getTime()))
        )
          throw new Error('Invalid Date pass to format');
        var u = [];
        e = (e = v[e] || e).replace(r, function (t, n) {
          return u.push(n), '@@@';
        });
        var i = a(a({}, m), o);
        return (e = e.replace(n, function (n) {
          return g[n](t, i);
        })).replace(/@@@/g, function () {
          return u.shift();
        });
      };
    function w(t, e, o) {
      if ((void 0 === o && (o = {}), 'string' != typeof e)) throw new Error('Invalid format in fecha parse');
      if (((e = v[e] || e), t.length > 1e3)) return null;
      var u = {
          year: new Date().getFullYear(),
          month: 0,
          day: 1,
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
          isPm: null,
          timezoneOffset: null,
        },
        i = [],
        d = [],
        s = e.replace(r, function (t, n) {
          return d.push(l(n)), '@@@';
        }),
        f = {},
        c = {};
      (s = l(s).replace(n, function (t) {
        var n = S[t],
          e = n[0],
          r = n[1],
          o = n[3];
        if (f[e]) throw new Error('Invalid format. ' + e + ' specified twice in format');
        return (f[e] = !0), o && (c[o] = !0), i.push(n), '(' + r + ')';
      })),
        Object.keys(c).forEach(function (t) {
          if (!f[t]) throw new Error('Invalid format. ' + t + ' is required in specified format');
        }),
        (s = s.replace(/@@@/g, function () {
          return d.shift();
        }));
      var h = t.match(new RegExp(s, 'i'));
      if (!h) return null;
      for (var g, M = a(a({}, m), o), D = 1; D < h.length; D++) {
        var Y = i[D - 1],
          y = Y[0],
          p = Y[2],
          H = p ? p(h[D], M) : +h[D];
        if (null == H) return null;
        u[y] = H;
      }
      if (
        (1 === u.isPm && null != u.hour && 12 != +u.hour
          ? (u.hour = +u.hour + 12)
          : 0 === u.isPm && 12 == +u.hour && (u.hour = 0),
        null == u.timezoneOffset)
      ) {
        g = new Date(u.year, u.month, u.day, u.hour, u.minute, u.second, u.millisecond);
        for (
          var b = [
              ['month', 'getMonth'],
              ['day', 'getDate'],
              ['hour', 'getHours'],
              ['minute', 'getMinutes'],
              ['second', 'getSeconds'],
            ],
            w = ((D = 0), b.length);
          D < w;
          D++
        )
          if (f[b[D][0]] && u[b[D][0]] !== g[b[D][1]]()) return null;
      } else if (((g = new Date(Date.UTC(u.year, u.month, u.day, u.hour, u.minute - u.timezoneOffset, u.second, u.millisecond))), u.month > 11 || u.month < 0 || u.day > 31 || u.day < 1 || u.hour > 23 || u.hour < 0 || u.minute > 59 || u.minute < 0 || u.second > 59 || u.second < 0)) return null;
      return g;
    }
    var P = { format: b, parse: w, defaultI18n: f, setGlobalDateI18n: c, setGlobalDateMasks: H };
    (t.assign = a),
      (t.default = P),
      (t.format = b),
      (t.parse = w),
      (t.defaultI18n = f),
      (t.setGlobalDateI18n = c),
      (t.setGlobalDateMasks = H),
      Object.defineProperty(t, '__esModule', { value: !0 });
  });
};
