/**
 * Modified from 
 * https://unpkg.com/web-vitals@1.1.1/dist/web-vitals.umd.js
 *
 * As site uses dojo, it does not seem to support exports module dependency
 * So we make this global on the window
 */
export default () => {
  !function(e, t) {
        t((e = "undefined" != typeof globalThis ? globalThis : e || self).webVitals = {}) 
  }(this, (function(e) {
      "use strict";
      var t, n, i, a, r = function(e, t) {
          return {
              name: e,
              value: void 0 === t ? -1 : t,
              delta: 0,
              entries: [],
              id: "v1-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12)
          }
      }, o = function(e, t) {
          try {
              if (PerformanceObserver.supportedEntryTypes.includes(e)) {
                  var n = new PerformanceObserver((function(e) {
                      return e.getEntries().map(t)
                  }
                  ));
                  return n.observe({
                      type: e,
                      buffered: !0
                  }),
                  n
              }
          } catch (e) {}
      }, c = function(e, t) {
          var n = function n(i) {
              "pagehide" !== i.type && "hidden" !== document.visibilityState || (e(i),
              t && (removeEventListener("visibilitychange", n, !0),
              removeEventListener("pagehide", n, !0)))
          };
          addEventListener("visibilitychange", n, !0),
          addEventListener("pagehide", n, !0)
      }, u = function(e) {
          addEventListener("pageshow", (function(t) {
              t.persisted && e(t)
          }
          ), !0)
      }, f = "function" == typeof WeakSet ? new WeakSet : new Set, s = function(e, t, n) {
          var i;
          return function() {
              t.value >= 0 && (n || f.has(t) || "hidden" === document.visibilityState) && (t.delta = t.value - (i || 0),
              (t.delta || void 0 === i) && (i = t.value,
              e(t)))
          }
      }, d = -1, p = function() {
          return "hidden" === document.visibilityState ? 0 : 1 / 0
      }, m = function() {
          c((function(e) {
              var t = e.timeStamp;
              d = t
          }
          ), !0)
      }, v = function() {
          return d < 0 && (d = p(),
          m(),
          u((function() {
              setTimeout((function() {
                  d = p(),
                  m()
              }
              ), 0)
          }
          ))),
          {
              get timeStamp() {
                  return d
              }
          }
      }, l = {
          passive: !0,
          capture: !0
      }, h = new Date, y = function(e, a) {
          t || (t = a,
          n = e,
          i = new Date,
          E(removeEventListener),
          g())
      }, g = function() {
          if (n >= 0 && n < i - h) {
              var e = {
                  entryType: "first-input",
                  name: t.type,
                  target: t.target,
                  cancelable: t.cancelable,
                  startTime: t.timeStamp,
                  processingStart: t.timeStamp + n
              };
              a.forEach((function(t) {
                  t(e)
              }
              )),
              a = []
          }
      }, S = function(e) {
          if (e.cancelable) {
              var t = (e.timeStamp > 1e12 ? new Date : performance.now()) - e.timeStamp;
              "pointerdown" == e.type ? function(e, t) {
                  var n = function() {
                      y(e, t),
                      a()
                  }
                    , i = function() {
                      a()
                  }
                    , a = function() {
                      removeEventListener("pointerup", n, l),
                      removeEventListener("pointercancel", i, l)
                  };
                  addEventListener("pointerup", n, l),
                  addEventListener("pointercancel", i, l)
              }(t, e) : y(t, e)
          }
      }, E = function(e) {
          ["mousedown", "keydown", "touchstart", "pointerdown"].forEach((function(t) {
              return e(t, S, l)
          }
          ))
      };
      e.getCLS = function(e, t) {
          var n, i = r("CLS", 0), a = function(e) {
              e.hadRecentInput || (i.value += e.value,
              i.entries.push(e),
              n())
          }, f = o("layout-shift", a);
          f && (n = s(e, i, t),
          c((function() {
              f.takeRecords().map(a),
              n()
          }
          )),
          u((function() {
              i = r("CLS", 0),
              n = s(e, i, t)
          }
          )))
      }
      ,
      e.getFCP = function(e, t) {
          var n, i = v(), a = r("FCP"), c = o("paint", (function(e) {
              "first-contentful-paint" === e.name && (c && c.disconnect(),
              e.startTime < i.timeStamp && (a.value = e.startTime,
              a.entries.push(e),
              f.add(a),
              n()))
          }
          ));
          c && (n = s(e, a, t),
          u((function(i) {
              a = r("FCP"),
              n = s(e, a, t),
              requestAnimationFrame((function() {
                  requestAnimationFrame((function() {
                      a.value = performance.now() - i.timeStamp,
                      f.add(a),
                      n()
                  }
                  ))
              }
              ))
          }
          )))
      }
      ,
      e.getFID = function(e, i) {
          var d, p = v(), m = r("FID"), l = function(e) {
              e.startTime < p.timeStamp && (m.value = e.processingStart - e.startTime,
              m.entries.push(e),
              f.add(m),
              d())
          }, h = o("first-input", l);
          d = s(e, m, i),
          h && c((function() {
              h.takeRecords().map(l),
              h.disconnect()
          }
          ), !0),
          h && u((function() {
              var o;
              m = r("FID"),
              d = s(e, m, i),
              a = [],
              n = -1,
              t = null,
              E(addEventListener),
              o = l,
              a.push(o),
              g()
          }
          ))
      }
      ,
      e.getLCP = function(e, t) {
          var n, i = v(), a = r("LCP"), d = function(e) {
              var t = e.startTime;
              t < i.timeStamp && (a.value = t,
              a.entries.push(e)),
              n()
          }, p = o("largest-contentful-paint", d);
          if (p) {
              n = s(e, a, t);
              var m = function() {
                  f.has(a) || (p.takeRecords().map(d),
                  p.disconnect(),
                  f.add(a),
                  n())
              };
              ["keydown", "click"].forEach((function(e) {
                  addEventListener(e, m, {
                      once: !0,
                      capture: !0
                  })
              }
              )),
              c(m, !0),
              u((function(i) {
                  a = r("LCP"),
                  n = s(e, a, t),
                  requestAnimationFrame((function() {
                      requestAnimationFrame((function() {
                          a.value = performance.now() - i.timeStamp,
                          f.add(a),
                          n()
                      }
                      ))
                  }
                  ))
              }
              ))
          }
      }
      ,
      e.getTTFB = function(e) {
          var t, n = r("TTFB");
          t = function() {
              try {
                  var t = performance.getEntriesByType("navigation")[0] || function() {
                      var e = performance.timing
                        , t = {
                          entryType: "navigation",
                          startTime: 0
                      };
                      for (var n in e)
                          "navigationStart" !== n && "toJSON" !== n && (t[n] = Math.max(e[n] - e.navigationStart, 0));
                      return t
                  }();
                  n.value = n.delta = t.responseStart,
                  n.entries = [t],
                  e(n)
              } catch (e) {}
          }
          ,
          "complete" === document.readyState ? setTimeout(t, 0) : addEventListener("pageshow", t)
      }
      ,
      Object.defineProperty(e, "__esModule", {
          value: !0
      })
  }
  ));
};
