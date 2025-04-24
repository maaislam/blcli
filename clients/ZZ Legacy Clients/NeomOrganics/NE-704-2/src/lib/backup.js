// NeomOrganics | NE-661 | 1
!(function () {
  'use strict';
  var e = 'NE-661',
    t = '1',
    n = e,
    i = t,
    o = 'NeomOrganics';
  function r(e) {
    return (
      (r =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
            }),
      r(e)
    );
  }
  function c(e) {
    var t = (function (e, t) {
      if ('object' !== r(e) || null === e) return e;
      var n = e[Symbol.toPrimitive];
      if (void 0 !== n) {
        var i = n.call(e, t || 'default');
        if ('object' !== r(i)) return i;
        throw new TypeError('@@toPrimitive must return a primitive value.');
      }
      return ('string' === t ? String : Number)(e);
    })(e, 'string');
    return 'symbol' === r(t) ? t : String(t);
  }
  function a(e, t, n) {
    return (
      (t = c(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e
    );
  }
  function l(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(e);
      t &&
        (i = i.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, i);
    }
    return n;
  }
  function s(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? l(Object(n), !0).forEach(function (t) {
            a(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : l(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return e;
  }
  function u(t, n) {
    function i() {
      return [t].flat().every(function (e) {
        return (function (e) {
          return 'string' == typeof e ? !!document.querySelector(e) : !0 === e();
        })(e);
      });
    }
    n = s(s({}, { timeout: 15, interval: 10, intervalLimit: 2e3, intervalMultiplier: 1.1 }), n);
    var o = ''.concat(e, ' - Poller conditions met'),
      r = ''.concat(e, ' - Poller conditions not met');
    return new Promise(function (e, t) {
      if (i()) return e(o);
      var c = new Date().getTime(),
        a = n.interval;
      !(function l() {
        var s, u, d, f;
        return (new Date().getTime() - c) / 1e3 < n.timeout
          ? i()
            ? e(o)
            : ((s = a), (u = n.intervalMultiplier), (d = n.intervalLimit), (a = (f = s * u) < d ? f : d), setTimeout(l, a))
          : t(r);
      })();
    });
  }
  var d = {
    trackerName: !1,
    propertyId: !1,
    analyticsReference: 'ga',
    eventCache: [],
    sendEvents: !0,
    setDefaultCategory: function (e) {
      return (this.category = e), this;
    },
    setDefaultAction: function (e) {
      return (this.action = e), this;
    },
    setPropertyId: function (e) {
      this.propertyId = e;
    },
    setTrackerName: function (e) {
      this.trackerName = e;
    },
    useLegacyTracker: function () {
      this.analyticsReference = '_gaq';
    },
    sendAuto: function (e, t, n) {
      this.send(null, null, t, n, e);
    },
    sendNormalised: function (e, t) {
      this.send(null, null, e, t);
    },
    send: function (e, t, n, i) {
      var o = this,
        c = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null,
        a = i || {},
        l = n,
        s = e || this.category,
        d = t || this.action,
        f = c;
      if ((null != f && (0 == f && (f = 'Control'), (l = 'Variation: ' + f + ' - ' + n)), 'object' === r(a) && a.sendOnce)) {
        var p = ''.concat(s).concat(d).concat(l);
        if (this.eventCache.indexOf(p) > -1) return !1;
        this.eventCache.push(p);
      }
      var m = this,
        h = function (e) {
          if ('_gaq' === m.analyticsReference)
            window._gaq.push(['_trackEvent', s, d, l, null, void 0 === a.nonInteraction || a.nonInteraction]);
          else {
            var t = { nonInteraction: !a.nonInteraction || a.nonInteraction };
            if (a.opts) for (var n in a.opts) t[n] = a.opts[n];
            window[m.analyticsReference](''.concat(e, '.send'), 'event', s, d, l, t);
          }
        };
      m.trackerName
        ? 1 == this.sendEvents && h(m.trackerName)
        : u(function () {
            try {
              var e = window[m.analyticsReference].getAll();
              if (e && e.length) {
                if (!m.propertyId) return (m.trackerName = e[0].get('name')), !0;
                for (var t = 0; t < e.length; t += 1) {
                  var n = e[t];
                  if (n.get('trackingId') === m.propertyId) return (m.trackerName = n.get('name')), !0;
                }
              }
            } catch (e) {}
          }).then(function () {
            1 == o.sendEvents && h(m.trackerName);
          });
    },
  };
  function f(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      r = n,
      c = i,
      a = o;
    d.setDefaultCategory('Experimentation'), d.setDefaultAction(a + ' - ' + r);
    var l = 'Test ID: ' + r + ' Variation: ' + c + ' Label: ' + e;
    d.sendNormalised(l, { sendOnce: t });
  }
  u(['body']).then(function () {
    if (
      (document.documentElement.classList.add(e, ''.concat(e, '-').concat(t)),
      !location.pathname.includes('/collections/the-wellbeing-pod') &&
        !(
          location.pathname.includes('/collections/bestsellers') ||
          location.pathname.includes('/collections/home') ||
          location.pathname.includes('/collections/essential-oil-blends') ||
          location.pathname.includes('/collections/candles') ||
          location.pathname.includes('/collections/the-wellbeing-pod-mini') ||
          location.pathname.includes('/collections/body-butter') ||
          location.pathname.includes('/collections/bath-body')
        ))
    ) {
      var n;
      if (location.pathname.includes('/collections/'))
        f('Viewed PLP'),
          document.querySelector('.collection-section > .container > .columns ').after(
            ((n = document.createElement('div')).classList.add(''.concat(e, '-banner'), ''.concat(e, '-background')),
            (n.innerHTML = '\n\t<div class="'.concat(
              e,
              '-banner-content">\n\t\t<h3 class="is-uppercase is-size-4 is-lspaced">The Gift of All Gifts</h3>\n\t\t<p>Tailor their gift to their ultimate wellbeing wish (or wishes) and get 20% off when you buy three or more...</p>\n\t\t<a class="button is-black is-size-9 is-uppercase is-lspaced has-text-weight-semibold" href="/pages/build-a-wellbeing-gift">Build a gift</a>\t\t\n\t</div>\n\t'
            )),
            new IntersectionObserver(function (e) {
              e.some(function (e) {
                return e.isIntersecting;
              }) && f('Viewed Gift Finder Banner'),
                f('Conditions Met');
            }).observe(n),
            n.addEventListener('click', function () {
              f('Clicked Gift Finder Banner');
            }),
            n)
          );
      if (
        ('/pages/build-a-wellbeing-gift' === location.pathname &&
          (f('Started Gift Finder'),
          u('.gift-builder__collection').then(function () {
            var e = document.querySelector('.gift-builder__collection');
            new MutationObserver(function () {
              e.classList.contains('active') &&
                (f('Completed Gift Builder'),
                u('.product-info-wrapper').then(function () {
                  document.querySelectorAll('.product-info-wrapper').forEach(function (e) {
                    e.querySelector('button[data-cart-add]').addEventListener('click', function () {
                      return f('Added Product - Gift Builder');
                    });
                  });
                }));
            }).observe(e, { attributeFilter: ['class'] });
          })),
        location.pathname.includes('/products/') &&
          (f('Viewed PDP'),
          u('button.button.is-black.is-uppercase.is-lspaced.is-fullwidth-mobile.has-text-weight-bold[type="submit"]').then(
            function () {
              document
                .querySelectorAll(
                  'button.button.is-black.is-uppercase.is-lspaced.is-fullwidth-mobile.has-text-weight-bold[type="submit"]'
                )
                .forEach(function (e) {
                  e.addEventListener('click', function () {
                    return f('Added Product - PDP');
                  });
                });
            }
          )),
        '/cart' === location.pathname)
      )
        f('Viewed Basket'),
          document.querySelectorAll('[data-checkout-btn], [data-sticky-checkout-btn]').forEach(function (e) {
            return e.addEventListener('click', function () {
              return f('Started Checkout');
            });
          });
    }
  }, console.error);
})();
