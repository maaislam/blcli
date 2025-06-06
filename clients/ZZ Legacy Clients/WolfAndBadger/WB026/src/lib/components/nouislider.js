export default function () {
  !(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? e(exports)
      : "function" == typeof define && define.amd
      ? define(["exports"], e)
      : e(
          ((t =
            "undefined" != typeof globalThis
              ? globalThis
              : t || self).noUiSlider = {})
        );
  })(this, function (st) {
    "use strict";
    var t, e;
    function n(t) {
      return "object" == typeof t && "function" == typeof t.to;
    }
    function at(t) {
      t.parentElement.removeChild(t);
    }
    function lt(t) {
      return null != t;
    }
    function ut(t) {
      t.preventDefault();
    }
    function o(t) {
      return "number" == typeof t && !isNaN(t) && isFinite(t);
    }
    function ct(t, e, r) {
      0 < r &&
        (dt(t, e),
        setTimeout(function () {
          ht(t, e);
        }, r));
    }
    function pt(t) {
      return Math.max(Math.min(t, 100), 0);
    }
    function ft(t) {
      return Array.isArray(t) ? t : [t];
    }
    function r(t) {
      var e = (t = String(t)).split(".");
      return 1 < e.length ? e[1].length : 0;
    }
    function dt(t, e) {
      t.classList && !/\s/.test(e)
        ? t.classList.add(e)
        : (t.className += " " + e);
    }
    function ht(t, e) {
      t.classList && !/\s/.test(e)
        ? t.classList.remove(e)
        : (t.className = t.className.replace(
            new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"),
            " "
          ));
    }
    function mt(t) {
      var e = void 0 !== window.pageXOffset,
        r = "CSS1Compat" === (t.compatMode || "");
      return {
        x: e
          ? window.pageXOffset
          : r
          ? t.documentElement.scrollLeft
          : t.body.scrollLeft,
        y: e
          ? window.pageYOffset
          : r
          ? t.documentElement.scrollTop
          : t.body.scrollTop,
      };
    }
    function c(t, e) {
      return 100 / (e - t);
    }
    function p(t, e, r) {
      return (100 * e) / (t[r + 1] - t[r]);
    }
    function f(t, e) {
      for (var r = 1; t >= e[r]; ) r += 1;
      return r;
    }
    function i(t, e, r) {
      if (r >= t.slice(-1)[0]) return 100;
      var n,
        i,
        o = f(r, t),
        s = t[o - 1],
        a = t[o],
        l = e[o - 1],
        u = e[o];
      return (
        l +
        ((i = r),
        p((n = [s, a]), n[0] < 0 ? i + Math.abs(n[0]) : i - n[0], 0) / c(l, u))
      );
    }
    function s(t, e, r, n) {
      if (100 === n) return n;
      var i,
        o,
        s = f(n, t),
        a = t[s - 1],
        l = t[s];
      return r
        ? (l - a) / 2 < n - a
          ? l
          : a
        : e[s - 1]
        ? t[s - 1] + ((i = n - t[s - 1]), (o = e[s - 1]), Math.round(i / o) * o)
        : n;
    }
    (st.PipsMode = void 0),
      ((t = st.PipsMode || (st.PipsMode = {})).Range = "range"),
      (t.Steps = "steps"),
      (t.Positions = "positions"),
      (t.Count = "count"),
      (t.Values = "values"),
      (st.PipsType = void 0),
      ((e = st.PipsType || (st.PipsType = {}))[(e.None = -1)] = "None"),
      (e[(e.NoValue = 0)] = "NoValue"),
      (e[(e.LargeValue = 1)] = "LargeValue"),
      (e[(e.SmallValue = 2)] = "SmallValue");
    var a = (function () {
        function t(e, t, r) {
          var n;
          (this.xPct = []),
            (this.xVal = []),
            (this.xSteps = []),
            (this.xNumSteps = []),
            (this.xHighestCompleteStep = []),
            (this.xSteps = [r || !1]),
            (this.xNumSteps = [!1]),
            (this.snap = t);
          var i = [];
          for (
            Object.keys(e).forEach(function (t) {
              i.push([ft(e[t]), t]);
            }),
              i.sort(function (t, e) {
                return t[0][0] - e[0][0];
              }),
              n = 0;
            n < i.length;
            n++
          )
            this.handleEntryPoint(i[n][1], i[n][0]);
          for (
            this.xNumSteps = this.xSteps.slice(0), n = 0;
            n < this.xNumSteps.length;
            n++
          )
            this.handleStepPoint(n, this.xNumSteps[n]);
        }
        return (
          (t.prototype.getDistance = function (t) {
            var e,
              r = [];
            for (e = 0; e < this.xNumSteps.length - 1; e++) {
              var n = this.xNumSteps[e];
              if (n && (t / n) % 1 != 0)
                throw new Error(
                  "noUiSlider: 'limit', 'margin' and 'padding' of " +
                    this.xPct[e] +
                    "% range must be divisible by step."
                );
              r[e] = p(this.xVal, t, e);
            }
            return r;
          }),
          (t.prototype.getAbsoluteDistance = function (t, e, r) {
            var n,
              i = 0;
            if (t < this.xPct[this.xPct.length - 1])
              for (; t > this.xPct[i + 1]; ) i++;
            else
              t === this.xPct[this.xPct.length - 1] &&
                (i = this.xPct.length - 2);
            r || t !== this.xPct[i + 1] || i++, null === e && (e = []);
            var o = 1,
              s = e[i],
              a = 0,
              l = 0,
              u = 0,
              c = 0;
            for (
              n = r
                ? (t - this.xPct[i]) / (this.xPct[i + 1] - this.xPct[i])
                : (this.xPct[i + 1] - t) / (this.xPct[i + 1] - this.xPct[i]);
              0 < s;

            )
              (a = this.xPct[i + 1 + c] - this.xPct[i + c]),
                100 < e[i + c] * o + 100 - 100 * n
                  ? ((l = a * n), (o = (s - 100 * n) / e[i + c]), (n = 1))
                  : ((l = ((e[i + c] * a) / 100) * o), (o = 0)),
                r
                  ? ((u -= l), 1 <= this.xPct.length + c && c--)
                  : ((u += l), 1 <= this.xPct.length - c && c++),
                (s = e[i + c] * o);
            return t + u;
          }),
          (t.prototype.toStepping = function (t) {
            return (t = i(this.xVal, this.xPct, t));
          }),
          (t.prototype.fromStepping = function (t) {
            return (function (t, e, r) {
              if (100 <= r) return t.slice(-1)[0];
              var n,
                i = f(r, e),
                o = t[i - 1],
                s = t[i],
                a = e[i - 1],
                l = e[i];
              return (
                (n = [o, s]), ((r - a) * c(a, l) * (n[1] - n[0])) / 100 + n[0]
              );
            })(this.xVal, this.xPct, t);
          }),
          (t.prototype.getStep = function (t) {
            return (t = s(this.xPct, this.xSteps, this.snap, t));
          }),
          (t.prototype.getDefaultStep = function (t, e, r) {
            var n = f(t, this.xPct);
            return (
              (100 === t || (e && t === this.xPct[n - 1])) &&
                (n = Math.max(n - 1, 1)),
              (this.xVal[n] - this.xVal[n - 1]) / r
            );
          }),
          (t.prototype.getNearbySteps = function (t) {
            var e = f(t, this.xPct);
            return {
              stepBefore: {
                startValue: this.xVal[e - 2],
                step: this.xNumSteps[e - 2],
                highestStep: this.xHighestCompleteStep[e - 2],
              },
              thisStep: {
                startValue: this.xVal[e - 1],
                step: this.xNumSteps[e - 1],
                highestStep: this.xHighestCompleteStep[e - 1],
              },
              stepAfter: {
                startValue: this.xVal[e],
                step: this.xNumSteps[e],
                highestStep: this.xHighestCompleteStep[e],
              },
            };
          }),
          (t.prototype.countStepDecimals = function () {
            var t = this.xNumSteps.map(r);
            return Math.max.apply(null, t);
          }),
          (t.prototype.convert = function (t) {
            return this.getStep(this.toStepping(t));
          }),
          (t.prototype.handleEntryPoint = function (t, e) {
            var r;
            if (
              !o((r = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t))) ||
              !o(e[0])
            )
              throw new Error("noUiSlider: 'range' value isn't numeric.");
            this.xPct.push(r), this.xVal.push(e[0]);
            var n = Number(e[1]);
            r
              ? this.xSteps.push(!isNaN(n) && n)
              : isNaN(n) || (this.xSteps[0] = n),
              this.xHighestCompleteStep.push(0);
          }),
          (t.prototype.handleStepPoint = function (t, e) {
            if (e)
              if (this.xVal[t] !== this.xVal[t + 1]) {
                this.xSteps[t] =
                  p([this.xVal[t], this.xVal[t + 1]], e, 0) /
                  c(this.xPct[t], this.xPct[t + 1]);
                var r = (this.xVal[t + 1] - this.xVal[t]) / this.xNumSteps[t],
                  n = Math.ceil(Number(r.toFixed(3)) - 1),
                  i = this.xVal[t] + this.xNumSteps[t] * n;
                this.xHighestCompleteStep[t] = i;
              } else
                this.xSteps[t] = this.xHighestCompleteStep[t] = this.xVal[t];
          }),
          t
        );
      })(),
      l = {
        to: function (t) {
          return void 0 === t ? "" : t.toFixed(2);
        },
        from: Number,
      },
      u = {
        target: "target",
        base: "base",
        origin: "origin",
        handle: "handle",
        handleLower: "handle-lower",
        handleUpper: "handle-upper",
        touchArea: "touch-area",
        horizontal: "horizontal",
        vertical: "vertical",
        background: "background",
        connect: "connect",
        connects: "connects",
        ltr: "ltr",
        rtl: "rtl",
        textDirectionLtr: "txt-dir-ltr",
        textDirectionRtl: "txt-dir-rtl",
        draggable: "draggable",
        drag: "state-drag",
        tap: "state-tap",
        active: "active",
        tooltip: "tooltip",
        pips: "pips",
        pipsHorizontal: "pips-horizontal",
        pipsVertical: "pips-vertical",
        marker: "marker",
        markerHorizontal: "marker-horizontal",
        markerVertical: "marker-vertical",
        markerNormal: "marker-normal",
        markerLarge: "marker-large",
        markerSub: "marker-sub",
        value: "value",
        valueHorizontal: "value-horizontal",
        valueVertical: "value-vertical",
        valueNormal: "value-normal",
        valueLarge: "value-large",
        valueSub: "value-sub",
      },
      gt = { tooltips: ".__tooltips", aria: ".__aria" };
    function d(t, e) {
      if (!o(e)) throw new Error("noUiSlider: 'step' is not numeric.");
      t.singleStep = e;
    }
    function h(t, e) {
      if (!o(e))
        throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
      t.keyboardPageMultiplier = e;
    }
    function m(t, e) {
      if (!o(e))
        throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
      t.keyboardDefaultStep = e;
    }
    function g(t, e) {
      if ("object" != typeof e || Array.isArray(e))
        throw new Error("noUiSlider: 'range' is not an object.");
      if (void 0 === e.min || void 0 === e.max)
        throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
      if (e.min === e.max)
        throw new Error("noUiSlider: 'range' 'min' and 'max' cannot be equal.");
      t.spectrum = new a(e, t.snap || !1, t.singleStep);
    }
    function v(t, e) {
      if (((e = ft(e)), !Array.isArray(e) || !e.length))
        throw new Error("noUiSlider: 'start' option is incorrect.");
      (t.handles = e.length), (t.start = e);
    }
    function b(t, e) {
      if ("boolean" != typeof e)
        throw new Error("noUiSlider: 'snap' option must be a boolean.");
      t.snap = e;
    }
    function S(t, e) {
      if ("boolean" != typeof e)
        throw new Error("noUiSlider: 'animate' option must be a boolean.");
      t.animate = e;
    }
    function x(t, e) {
      if ("number" != typeof e)
        throw new Error(
          "noUiSlider: 'animationDuration' option must be a number."
        );
      t.animationDuration = e;
    }
    function y(t, e) {
      var r,
        n = [!1];
      if (
        ("lower" === e ? (e = [!0, !1]) : "upper" === e && (e = [!1, !0]),
        !0 === e || !1 === e)
      ) {
        for (r = 1; r < t.handles; r++) n.push(e);
        n.push(!1);
      } else {
        if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1)
          throw new Error(
            "noUiSlider: 'connect' option doesn't match handle count."
          );
        n = e;
      }
      t.connect = n;
    }
    function w(t, e) {
      switch (e) {
        case "horizontal":
          t.ort = 0;
          break;
        case "vertical":
          t.ort = 1;
          break;
        default:
          throw new Error("noUiSlider: 'orientation' option is invalid.");
      }
    }
    function E(t, e) {
      if (!o(e))
        throw new Error("noUiSlider: 'margin' option must be numeric.");
      0 !== e && (t.margin = t.spectrum.getDistance(e));
    }
    function P(t, e) {
      if (!o(e)) throw new Error("noUiSlider: 'limit' option must be numeric.");
      if (((t.limit = t.spectrum.getDistance(e)), !t.limit || t.handles < 2))
        throw new Error(
          "noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles."
        );
    }
    function C(t, e) {
      var r;
      if (!o(e) && !Array.isArray(e))
        throw new Error(
          "noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers."
        );
      if (Array.isArray(e) && 2 !== e.length && !o(e[0]) && !o(e[1]))
        throw new Error(
          "noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers."
        );
      if (0 !== e) {
        for (
          Array.isArray(e) || (e = [e, e]),
            t.padding = [
              t.spectrum.getDistance(e[0]),
              t.spectrum.getDistance(e[1]),
            ],
            r = 0;
          r < t.spectrum.xNumSteps.length - 1;
          r++
        )
          if (t.padding[0][r] < 0 || t.padding[1][r] < 0)
            throw new Error(
              "noUiSlider: 'padding' option must be a positive number(s)."
            );
        var n = e[0] + e[1],
          i = t.spectrum.xVal[0];
        if (1 < n / (t.spectrum.xVal[t.spectrum.xVal.length - 1] - i))
          throw new Error(
            "noUiSlider: 'padding' option must not exceed 100% of the range."
          );
      }
    }
    function N(t, e) {
      switch (e) {
        case "ltr":
          t.dir = 0;
          break;
        case "rtl":
          t.dir = 1;
          break;
        default:
          throw new Error("noUiSlider: 'direction' option was not recognized.");
      }
    }
    function V(t, e) {
      if ("string" != typeof e)
        throw new Error(
          "noUiSlider: 'behaviour' must be a string containing options."
        );
      var r = 0 <= e.indexOf("tap"),
        n = 0 <= e.indexOf("drag"),
        i = 0 <= e.indexOf("fixed"),
        o = 0 <= e.indexOf("snap"),
        s = 0 <= e.indexOf("hover"),
        a = 0 <= e.indexOf("unconstrained");
      if (i) {
        if (2 !== t.handles)
          throw new Error(
            "noUiSlider: 'fixed' behaviour must be used with 2 handles"
          );
        E(t, t.start[1] - t.start[0]);
      }
      if (a && (t.margin || t.limit))
        throw new Error(
          "noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit"
        );
      t.events = {
        tap: r || o,
        drag: n,
        fixed: i,
        snap: o,
        hover: s,
        unconstrained: a,
      };
    }
    function k(t, e) {
      if (!1 !== e)
        if (!0 === e || n(e)) {
          t.tooltips = [];
          for (var r = 0; r < t.handles; r++) t.tooltips.push(e);
        } else {
          if ((e = ft(e)).length !== t.handles)
            throw new Error(
              "noUiSlider: must pass a formatter for all handles."
            );
          e.forEach(function (t) {
            if ("boolean" != typeof t && !n(t))
              throw new Error(
                "noUiSlider: 'tooltips' must be passed a formatter or 'false'."
              );
          }),
            (t.tooltips = e);
        }
    }
    function U(t, e) {
      if (!n(e))
        throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
      t.ariaFormat = e;
    }
    function M(t, e) {
      if (!n((r = e)) || "function" != typeof r.from)
        throw new Error(
          "noUiSlider: 'format' requires 'to' and 'from' methods."
        );
      var r;
      t.format = e;
    }
    function A(t, e) {
      if ("boolean" != typeof e)
        throw new Error(
          "noUiSlider: 'keyboardSupport' option must be a boolean."
        );
      t.keyboardSupport = e;
    }
    function D(t, e) {
      t.documentElement = e;
    }
    function L(t, e) {
      if ("string" != typeof e && !1 !== e)
        throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
      t.cssPrefix = e;
    }
    function T(e, r) {
      if ("object" != typeof r)
        throw new Error("noUiSlider: 'cssClasses' must be an object.");
      "string" == typeof e.cssPrefix
        ? ((e.cssClasses = {}),
          Object.keys(r).forEach(function (t) {
            e.cssClasses[t] = e.cssPrefix + r[t];
          }))
        : (e.cssClasses = r);
    }
    function vt(e) {
      var r = {
          margin: null,
          limit: null,
          padding: null,
          animate: !0,
          animationDuration: 300,
          ariaFormat: l,
          format: l,
        },
        n = {
          step: { r: !1, t: d },
          keyboardPageMultiplier: { r: !1, t: h },
          keyboardDefaultStep: { r: !1, t: m },
          start: { r: !0, t: v },
          connect: { r: !0, t: y },
          direction: { r: !0, t: N },
          snap: { r: !1, t: b },
          animate: { r: !1, t: S },
          animationDuration: { r: !1, t: x },
          range: { r: !0, t: g },
          orientation: { r: !1, t: w },
          margin: { r: !1, t: E },
          limit: { r: !1, t: P },
          padding: { r: !1, t: C },
          behaviour: { r: !0, t: V },
          ariaFormat: { r: !1, t: U },
          format: { r: !1, t: M },
          tooltips: { r: !1, t: k },
          keyboardSupport: { r: !0, t: A },
          documentElement: { r: !1, t: D },
          cssPrefix: { r: !0, t: L },
          cssClasses: { r: !0, t: T },
        },
        i = {
          connect: !1,
          direction: "ltr",
          behaviour: "tap",
          orientation: "horizontal",
          keyboardSupport: !0,
          cssPrefix: "noUi-",
          cssClasses: u,
          keyboardPageMultiplier: 5,
          keyboardDefaultStep: 10,
        };
      e.format && !e.ariaFormat && (e.ariaFormat = e.format),
        Object.keys(n).forEach(function (t) {
          if (lt(e[t]) || void 0 !== i[t]) n[t].t(r, lt(e[t]) ? e[t] : i[t]);
          else if (n[t].r)
            throw new Error("noUiSlider: '" + t + "' is required.");
        }),
        (r.pips = e.pips);
      var t = document.createElement("div"),
        o = void 0 !== t.style.msTransform,
        s = void 0 !== t.style.transform;
      r.transformRule = s ? "transform" : o ? "msTransform" : "webkitTransform";
      return (
        (r.style = [
          ["left", "top"],
          ["right", "bottom"],
        ][r.dir][r.ort]),
        r
      );
    }
    function O(t, b, o) {
      var l,
        u,
        s,
        i,
        a,
        e,
        c,
        p = window.navigator.pointerEnabled
          ? { start: "pointerdown", move: "pointermove", end: "pointerup" }
          : window.navigator.msPointerEnabled
          ? {
              start: "MSPointerDown",
              move: "MSPointerMove",
              end: "MSPointerUp",
            }
          : {
              start: "mousedown touchstart",
              move: "mousemove touchmove",
              end: "mouseup touchend",
            },
        f =
          window.CSS &&
          CSS.supports &&
          CSS.supports("touch-action", "none") &&
          (function () {
            var t = !1;
            try {
              var e = Object.defineProperty({}, "passive", {
                get: function () {
                  t = !0;
                },
              });
              window.addEventListener("test", null, e);
            } catch (t) {}
            return t;
          })(),
        d = t,
        y = b.spectrum,
        S = [],
        x = [],
        h = [],
        m = 0,
        g = {},
        v = t.ownerDocument,
        w = b.documentElement || v.documentElement,
        E = v.body,
        P = "rtl" === v.dir || 1 === b.ort ? 0 : 100;
      function C(t, e) {
        var r = v.createElement("div");
        return e && dt(r, e), t.appendChild(r), r;
      }
      function N(t, e) {
        var r = C(t, b.cssClasses.origin),
          n = C(r, b.cssClasses.handle);
        return (
          C(n, b.cssClasses.touchArea),
          n.setAttribute("data-handle", String(e)),
          b.keyboardSupport &&
            (n.setAttribute("tabindex", "0"),
            n.addEventListener("keydown", function (t) {
              return (function (t, e) {
                if (k() || U(e)) return !1;
                var r = ["Left", "Right"],
                  n = ["Down", "Up"],
                  i = ["PageDown", "PageUp"],
                  o = ["Home", "End"];
                b.dir && !b.ort
                  ? r.reverse()
                  : b.ort && !b.dir && (n.reverse(), i.reverse());
                var s,
                  a = t.key.replace("Arrow", ""),
                  l = a === i[0],
                  u = a === i[1],
                  c = a === n[0] || a === r[0] || l,
                  p = a === n[1] || a === r[1] || u,
                  f = a === o[0],
                  d = a === o[1];
                if (!(c || p || f || d)) return !0;
                if ((t.preventDefault(), p || c)) {
                  var h = b.keyboardPageMultiplier,
                    m = c ? 0 : 1,
                    g = it(e),
                    v = g[m];
                  if (null === v) return !1;
                  !1 === v &&
                    (v = y.getDefaultStep(x[e], c, b.keyboardDefaultStep)),
                    (u || l) && (v *= h),
                    (v = Math.max(v, 1e-7)),
                    (v *= c ? -1 : 1),
                    (s = S[e] + v);
                } else s = d ? b.spectrum.xVal[b.spectrum.xVal.length - 1] : b.spectrum.xVal[0];
                return (
                  Z(e, y.toStepping(s), !0, !0),
                  W("slide", e),
                  W("update", e),
                  W("change", e),
                  W("set", e),
                  !1
                );
              })(t, e);
            })),
          n.setAttribute("role", "slider"),
          n.setAttribute("aria-orientation", b.ort ? "vertical" : "horizontal"),
          0 === e
            ? dt(n, b.cssClasses.handleLower)
            : e === b.handles - 1 && dt(n, b.cssClasses.handleUpper),
          r
        );
      }
      function V(t, e) {
        return !!e && C(t, b.cssClasses.connect);
      }
      function r(t, e) {
        return (
          !(!b.tooltips || !b.tooltips[e]) &&
          C(t.firstChild, b.cssClasses.tooltip)
        );
      }
      function k() {
        return d.hasAttribute("disabled");
      }
      function U(t) {
        return u[t].hasAttribute("disabled");
      }
      function M() {
        a &&
          (I("update" + gt.tooltips),
          a.forEach(function (t) {
            t && at(t);
          }),
          (a = null));
      }
      function A() {
        M(),
          (a = u.map(r)),
          Y("update" + gt.tooltips, function (t, e, r) {
            if (a && b.tooltips && !1 !== a[e]) {
              var n = t[e];
              !0 !== b.tooltips[e] && (n = b.tooltips[e].to(r[e])),
                (a[e].innerHTML = n);
            }
          });
      }
      function D(t, e) {
        return t.map(function (t) {
          return y.fromStepping(e ? y.getStep(t) : t);
        });
      }
      function L(m) {
        var g = (function (t) {
            if (t.mode === st.PipsMode.Range || t.mode === st.PipsMode.Steps)
              return y.xVal;
            if (t.mode !== st.PipsMode.Count)
              return t.mode === st.PipsMode.Positions
                ? D(t.values, t.stepped)
                : t.mode === st.PipsMode.Values
                ? t.stepped
                  ? t.values.map(function (t) {
                      return y.fromStepping(y.getStep(y.toStepping(t)));
                    })
                  : t.values
                : [];
            if (t.values < 2)
              throw new Error(
                "noUiSlider: 'values' (>= 2) required for mode 'count'."
              );
            for (var e = t.values - 1, r = 100 / e, n = []; e--; ) n[e] = e * r;
            return n.push(100), D(n, t.stepped);
          })(m),
          v = {},
          t = y.xVal[0],
          e = y.xVal[y.xVal.length - 1],
          b = !1,
          S = !1,
          x = 0;
        return (
          (g = g
            .slice()
            .sort(function (t, e) {
              return t - e;
            })
            .filter(function (t) {
              return !this[t] && (this[t] = !0);
            }, {}))[0] !== t && (g.unshift(t), (b = !0)),
          g[g.length - 1] !== e && (g.push(e), (S = !0)),
          g.forEach(function (t, e) {
            var r,
              n,
              i,
              o,
              s,
              a,
              l,
              u,
              c,
              p,
              f = t,
              d = g[e + 1],
              h = m.mode === st.PipsMode.Steps;
            for (
              h && (r = y.xNumSteps[e]),
                r || (r = d - f),
                void 0 === d && (d = f),
                r = Math.max(r, 1e-7),
                n = f;
              n <= d;
              n = Number((n + r).toFixed(7))
            ) {
              for (
                u = (s = (o = y.toStepping(n)) - x) / (m.density || 1),
                  p = s / (c = Math.round(u)),
                  i = 1;
                i <= c;
                i += 1
              )
                v[(a = x + i * p).toFixed(5)] = [y.fromStepping(a), 0];
              (l =
                -1 < g.indexOf(n)
                  ? st.PipsType.LargeValue
                  : h
                  ? st.PipsType.SmallValue
                  : st.PipsType.NoValue),
                !e && b && n !== d && (l = 0),
                (n === d && S) || (v[o.toFixed(5)] = [n, l]),
                (x = o);
            }
          }),
          v
        );
      }
      function T(e, i, o) {
        var t,
          r,
          s = v.createElement("div"),
          a =
            (((t = {})[st.PipsType.None] = ""),
            (t[st.PipsType.NoValue] = b.cssClasses.valueNormal),
            (t[st.PipsType.LargeValue] = b.cssClasses.valueLarge),
            (t[st.PipsType.SmallValue] = b.cssClasses.valueSub),
            t),
          l =
            (((r = {})[st.PipsType.None] = ""),
            (r[st.PipsType.NoValue] = b.cssClasses.markerNormal),
            (r[st.PipsType.LargeValue] = b.cssClasses.markerLarge),
            (r[st.PipsType.SmallValue] = b.cssClasses.markerSub),
            r),
          u = [b.cssClasses.valueHorizontal, b.cssClasses.valueVertical],
          c = [b.cssClasses.markerHorizontal, b.cssClasses.markerVertical];
        function p(t, e) {
          var r = e === b.cssClasses.value,
            n = r ? a : l;
          return e + " " + (r ? u : c)[b.ort] + " " + n[t];
        }
        return (
          dt(s, b.cssClasses.pips),
          dt(
            s,
            0 === b.ort
              ? b.cssClasses.pipsHorizontal
              : b.cssClasses.pipsVertical
          ),
          Object.keys(e).forEach(function (t) {
            !(function (t, e, r) {
              if ((r = i ? i(e, r) : r) !== st.PipsType.None) {
                var n = C(s, !1);
                (n.className = p(r, b.cssClasses.marker)),
                  (n.style[b.style] = t + "%"),
                  r > st.PipsType.NoValue &&
                    (((n = C(s, !1)).className = p(r, b.cssClasses.value)),
                    n.setAttribute("data-value", String(e)),
                    (n.style[b.style] = t + "%"),
                    (n.innerHTML = String(o.to(e))));
              }
            })(t, e[t][0], e[t][1]);
          }),
          s
        );
      }
      function O() {
        i && (at(i), (i = null));
      }
      function j(t) {
        O();
        var e = L(t),
          r = t.filter,
          n = t.format || {
            to: function (t) {
              return String(Math.round(t));
            },
          };
        return (i = d.appendChild(T(e, r, n)));
      }
      function z() {
        var t = l.getBoundingClientRect(),
          e = "offset" + ["Width", "Height"][b.ort];
        return 0 === b.ort ? t.width || l[e] : t.height || l[e];
      }
      function H(i, o, s, a) {
        var e = function (t) {
            var e,
              r,
              n = (function (r, t, n) {
                var e = 0 === r.type.indexOf("touch"),
                  i = 0 === r.type.indexOf("mouse"),
                  o = 0 === r.type.indexOf("pointer"),
                  s = 0,
                  a = 0;
                0 === r.type.indexOf("MSPointer") && (o = !0);
                if ("mousedown" === r.type && !r.buttons && !r.touches)
                  return !1;
                if (e) {
                  var l = function (t) {
                    var e = t.target;
                    return (
                      e === n ||
                      n.contains(e) ||
                      (r.composed && r.composedPath().shift() === n)
                    );
                  };
                  if ("touchstart" === r.type) {
                    var u = Array.prototype.filter.call(r.touches, l);
                    if (1 < u.length) return !1;
                    (s = u[0].pageX), (a = u[0].pageY);
                  } else {
                    var c = Array.prototype.find.call(r.changedTouches, l);
                    if (!c) return !1;
                    (s = c.pageX), (a = c.pageY);
                  }
                }
                (t = t || mt(v)),
                  (i || o) && ((s = r.clientX + t.x), (a = r.clientY + t.y));
                return (
                  (r.pageOffset = t),
                  (r.points = [s, a]),
                  (r.cursor = i || o),
                  r
                );
              })(t, a.pageOffset, a.target || o);
            return (
              !!n &&
              !(k() && !a.doNotReject) &&
              ((e = d),
              (r = b.cssClasses.tap),
              !(
                (e.classList
                  ? e.classList.contains(r)
                  : new RegExp("\\b" + r + "\\b").test(e.className)) &&
                !a.doNotReject
              ) &&
                !(i === p.start && void 0 !== n.buttons && 1 < n.buttons) &&
                (!a.hover || !n.buttons) &&
                (f || n.preventDefault(),
                (n.calcPoint = n.points[b.ort]),
                void s(n, a)))
            );
          },
          r = [];
        return (
          i.split(" ").forEach(function (t) {
            o.addEventListener(t, e, !!f && { passive: !0 }), r.push([t, e]);
          }),
          r
        );
      }
      function F(t) {
        var e,
          r,
          n,
          i,
          o,
          s,
          a =
            (100 *
              (t -
                ((e = l),
                (r = b.ort),
                (n = e.getBoundingClientRect()),
                (i = e.ownerDocument),
                (o = i.documentElement),
                (s = mt(i)),
                /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) &&
                  (s.x = 0),
                r ? n.top + s.y - o.clientTop : n.left + s.x - o.clientLeft))) /
            z();
        return (a = pt(a)), b.dir ? 100 - a : a;
      }
      function R(t, e) {
        "mouseout" === t.type &&
          "HTML" === t.target.nodeName &&
          null === t.relatedTarget &&
          q(t, e);
      }
      function _(t, e) {
        if (
          -1 === navigator.appVersion.indexOf("MSIE 9") &&
          0 === t.buttons &&
          0 !== e.buttonsProperty
        )
          return q(t, e);
        var r = (b.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint);
        J(
          0 < r,
          (100 * r) / e.baseSize,
          e.locations,
          e.handleNumbers,
          e.connect
        );
      }
      function q(t, e) {
        e.handle && (ht(e.handle, b.cssClasses.active), (m -= 1)),
          e.listeners.forEach(function (t) {
            w.removeEventListener(t[0], t[1]);
          }),
          0 === m &&
            (ht(d, b.cssClasses.drag),
            Q(),
            t.cursor &&
              ((E.style.cursor = ""),
              E.removeEventListener("selectstart", ut))),
          e.handleNumbers.forEach(function (t) {
            W("change", t), W("set", t), W("end", t);
          });
      }
      function B(t, e) {
        if (!e.handleNumbers.some(U)) {
          var r;
          if (1 === e.handleNumbers.length)
            (r = u[e.handleNumbers[0]].children[0]),
              (m += 1),
              dt(r, b.cssClasses.active);
          t.stopPropagation();
          var n = [],
            i = H(p.move, w, _, {
              target: t.target,
              handle: r,
              connect: e.connect,
              listeners: n,
              startCalcPoint: t.calcPoint,
              baseSize: z(),
              pageOffset: t.pageOffset,
              handleNumbers: e.handleNumbers,
              buttonsProperty: t.buttons,
              locations: x.slice(),
            }),
            o = H(p.end, w, q, {
              target: t.target,
              handle: r,
              listeners: n,
              doNotReject: !0,
              handleNumbers: e.handleNumbers,
            }),
            s = H("mouseout", w, R, {
              target: t.target,
              handle: r,
              listeners: n,
              doNotReject: !0,
              handleNumbers: e.handleNumbers,
            });
          n.push.apply(n, i.concat(o, s)),
            t.cursor &&
              ((E.style.cursor = getComputedStyle(t.target).cursor),
              1 < u.length && dt(d, b.cssClasses.drag),
              E.addEventListener("selectstart", ut, !1)),
            e.handleNumbers.forEach(function (t) {
              W("start", t);
            });
        }
      }
      function n(t) {
        t.stopPropagation();
        var i,
          o,
          s,
          e = F(t.calcPoint),
          r =
            ((i = e),
            (s = !(o = 100)),
            u.forEach(function (t, e) {
              if (!U(e)) {
                var r = x[e],
                  n = Math.abs(r - i);
                (n < o || (n <= o && r < i) || (100 === n && 100 === o)) &&
                  ((s = e), (o = n));
              }
            }),
            s);
        !1 !== r &&
          (b.events.snap || ct(d, b.cssClasses.tap, b.animationDuration),
          Z(r, e, !0, !0),
          Q(),
          W("slide", r, !0),
          W("update", r, !0),
          W("change", r, !0),
          W("set", r, !0),
          b.events.snap && B(t, { handleNumbers: [r] }));
      }
      function X(t) {
        var e = F(t.calcPoint),
          r = y.getStep(e),
          n = y.fromStepping(r);
        Object.keys(g).forEach(function (t) {
          "hover" === t.split(".")[0] &&
            g[t].forEach(function (t) {
              t.call(ot, n);
            });
        });
      }
      function Y(t, e) {
        (g[t] = g[t] || []),
          g[t].push(e),
          "update" === t.split(".")[0] &&
            u.forEach(function (t, e) {
              W("update", e);
            });
      }
      function I(t) {
        var i = t && t.split(".")[0],
          o = i ? t.substring(i.length) : t;
        Object.keys(g).forEach(function (t) {
          var e,
            r = t.split(".")[0],
            n = t.substring(r.length);
          (i && i !== r) ||
            (o && o !== n) ||
            ((((e = n) !== gt.aria && e !== gt.tooltips) || o === n) &&
              delete g[t]);
        });
      }
      function W(r, n, i) {
        Object.keys(g).forEach(function (t) {
          var e = t.split(".")[0];
          r === e &&
            g[t].forEach(function (t) {
              t.call(
                ot,
                S.map(b.format.to),
                n,
                S.slice(),
                i || !1,
                x.slice(),
                ot
              );
            });
        });
      }
      function $(t, e, r, n, i, o) {
        var s;
        return (
          1 < u.length &&
            !b.events.unconstrained &&
            (n &&
              0 < e &&
              ((s = y.getAbsoluteDistance(t[e - 1], b.margin, !1)),
              (r = Math.max(r, s))),
            i &&
              e < u.length - 1 &&
              ((s = y.getAbsoluteDistance(t[e + 1], b.margin, !0)),
              (r = Math.min(r, s)))),
          1 < u.length &&
            b.limit &&
            (n &&
              0 < e &&
              ((s = y.getAbsoluteDistance(t[e - 1], b.limit, !1)),
              (r = Math.min(r, s))),
            i &&
              e < u.length - 1 &&
              ((s = y.getAbsoluteDistance(t[e + 1], b.limit, !0)),
              (r = Math.max(r, s)))),
          b.padding &&
            (0 === e &&
              ((s = y.getAbsoluteDistance(0, b.padding[0], !1)),
              (r = Math.max(r, s))),
            e === u.length - 1 &&
              ((s = y.getAbsoluteDistance(100, b.padding[1], !0)),
              (r = Math.min(r, s)))),
          !((r = pt((r = y.getStep(r)))) === t[e] && !o) && r
        );
      }
      function G(t, e) {
        var r = b.ort;
        return (r ? e : t) + ", " + (r ? t : e);
      }
      function J(t, n, r, e, i) {
        var o = r.slice(),
          s = e[0],
          a = [!t, t],
          l = [t, !t];
        (e = e.slice()),
          t && e.reverse(),
          1 < e.length
            ? e.forEach(function (t, e) {
                var r = $(o, t, o[t] + n, a[e], l[e], !1);
                !1 === r ? (n = 0) : ((n = r - o[t]), (o[t] = r));
              })
            : (a = l = [!0]);
        var u = !1;
        e.forEach(function (t, e) {
          u = Z(t, r[t] + n, a[e], l[e]) || u;
        }),
          u &&
            (e.forEach(function (t) {
              W("update", t), W("slide", t);
            }),
            null != i && W("drag", s));
      }
      function K(t, e) {
        return b.dir ? 100 - t - e : t;
      }
      function Q() {
        h.forEach(function (t) {
          var e = 50 < x[t] ? -1 : 1,
            r = 3 + (u.length + e * t);
          u[t].style.zIndex = String(r);
        });
      }
      function Z(t, e, r, n, i) {
        return (
          i || (e = $(x, t, e, r, n, !1)),
          !1 !== e &&
            ((function (t, e) {
              (x[t] = e), (S[t] = y.fromStepping(e));
              var r = "translate(" + G(10 * (K(e, 0) - P) + "%", "0") + ")";
              (u[t].style[b.transformRule] = r), tt(t), tt(t + 1);
            })(t, e),
            !0)
        );
      }
      function tt(t) {
        if (s[t]) {
          var e = 0,
            r = 100;
          0 !== t && (e = x[t - 1]), t !== s.length - 1 && (r = x[t]);
          var n = r - e,
            i = "translate(" + G(K(e, n) + "%", "0") + ")",
            o = "scale(" + G(n / 100, "1") + ")";
          s[t].style[b.transformRule] = i + " " + o;
        }
      }
      function et(t, e) {
        return null === t || !1 === t || void 0 === t
          ? x[e]
          : ("number" == typeof t && (t = String(t)),
            !1 !== (t = b.format.from(t)) && (t = y.toStepping(t)),
            !1 === t || isNaN(t) ? x[e] : t);
      }
      function rt(t, e, r) {
        var n = ft(t),
          i = void 0 === x[0];
        (e = void 0 === e || e),
          b.animate && !i && ct(d, b.cssClasses.tap, b.animationDuration),
          h.forEach(function (t) {
            Z(t, et(n[t], t), !0, !1, r);
          });
        for (var o = 1 === h.length ? 0 : 1; o < h.length; ++o)
          h.forEach(function (t) {
            Z(t, x[t], !0, !0, r);
          });
        Q(),
          h.forEach(function (t) {
            W("update", t), null !== n[t] && e && W("set", t);
          });
      }
      function nt(t) {
        if ((void 0 === t && (t = !1), t))
          return 1 === S.length ? S[0] : S.slice(0);
        var e = S.map(b.format.to);
        return 1 === e.length ? e[0] : e;
      }
      function it(t) {
        var e = x[t],
          r = y.getNearbySteps(e),
          n = S[t],
          i = r.thisStep.step,
          o = null;
        if (b.snap)
          return [
            n - r.stepBefore.startValue || null,
            r.stepAfter.startValue - n || null,
          ];
        !1 !== i &&
          n + i > r.stepAfter.startValue &&
          (i = r.stepAfter.startValue - n),
          (o =
            n > r.thisStep.startValue
              ? r.thisStep.step
              : !1 !== r.stepBefore.step && n - r.stepBefore.highestStep),
          100 === e ? (i = null) : 0 === e && (o = null);
        var s = y.countStepDecimals();
        return (
          null !== i && !1 !== i && (i = Number(i.toFixed(s))),
          null !== o && !1 !== o && (o = Number(o.toFixed(s))),
          [o, i]
        );
      }
      dt((e = d), b.cssClasses.target),
        0 === b.dir ? dt(e, b.cssClasses.ltr) : dt(e, b.cssClasses.rtl),
        0 === b.ort
          ? dt(e, b.cssClasses.horizontal)
          : dt(e, b.cssClasses.vertical),
        dt(
          e,
          "rtl" === getComputedStyle(e).direction
            ? b.cssClasses.textDirectionRtl
            : b.cssClasses.textDirectionLtr
        ),
        (l = C(e, b.cssClasses.base)),
        (function (t, e) {
          var r = C(e, b.cssClasses.connects);
          (u = []), (s = []).push(V(r, t[0]));
          for (var n = 0; n < b.handles; n++)
            u.push(N(e, n)), (h[n] = n), s.push(V(r, t[n + 1]));
        })(b.connect, l),
        (c = b.events).fixed ||
          u.forEach(function (t, e) {
            H(p.start, t.children[0], B, { handleNumbers: [e] });
          }),
        c.tap && H(p.start, l, n, {}),
        c.hover && H(p.move, l, X, { hover: !0 }),
        c.drag &&
          s.forEach(function (e, r) {
            if (!1 !== e && 0 !== r && r !== s.length - 1) {
              var n = u[r - 1],
                i = u[r],
                t = [e];
              dt(e, b.cssClasses.draggable),
                c.fixed && (t.push(n.children[0]), t.push(i.children[0])),
                t.forEach(function (t) {
                  H(p.start, t, B, {
                    handles: [n, i],
                    handleNumbers: [r - 1, r],
                    connect: e,
                  });
                });
            }
          }),
        rt(b.start),
        b.pips && j(b.pips),
        b.tooltips && A(),
        I("update" + gt.aria),
        Y("update" + gt.aria, function (t, e, s, r, a) {
          h.forEach(function (t) {
            var e = u[t],
              r = $(x, t, 0, !0, !0, !0),
              n = $(x, t, 100, !0, !0, !0),
              i = a[t],
              o = String(b.ariaFormat.to(s[t]));
            (r = y.fromStepping(r).toFixed(1)),
              (n = y.fromStepping(n).toFixed(1)),
              (i = y.fromStepping(i).toFixed(1)),
              e.children[0].setAttribute("aria-valuemin", r),
              e.children[0].setAttribute("aria-valuemax", n),
              e.children[0].setAttribute("aria-valuenow", i),
              e.children[0].setAttribute("aria-valuetext", o);
          });
        });
      var ot = {
        destroy: function () {
          for (
            I(gt.aria),
              I(gt.tooltips),
              Object.keys(b.cssClasses).forEach(function (t) {
                ht(d, b.cssClasses[t]);
              });
            d.firstChild;

          )
            d.removeChild(d.firstChild);
          delete d.noUiSlider;
        },
        steps: function () {
          return h.map(it);
        },
        on: Y,
        off: I,
        get: nt,
        set: rt,
        setHandle: function (t, e, r, n) {
          if (!(0 <= (t = Number(t)) && t < h.length))
            throw new Error("noUiSlider: invalid handle number, got: " + t);
          Z(t, et(e, t), !0, !0, n), W("update", t), r && W("set", t);
        },
        reset: function (t) {
          rt(b.start, t);
        },
        __moveHandles: function (t, e, r) {
          J(t, e, x, r);
        },
        options: o,
        updateOptions: function (e, t) {
          var r = nt(),
            n = [
              "margin",
              "limit",
              "padding",
              "range",
              "animate",
              "snap",
              "step",
              "format",
              "pips",
              "tooltips",
            ];
          n.forEach(function (t) {
            void 0 !== e[t] && (o[t] = e[t]);
          });
          var i = vt(o);
          n.forEach(function (t) {
            void 0 !== e[t] && (b[t] = i[t]);
          }),
            (y = i.spectrum),
            (b.margin = i.margin),
            (b.limit = i.limit),
            (b.padding = i.padding),
            b.pips ? j(b.pips) : O(),
            b.tooltips ? A() : M(),
            (x = []),
            rt(lt(e.start) ? e.start : r, t);
        },
        target: d,
        removePips: O,
        removeTooltips: M,
        getTooltips: function () {
          return a;
        },
        getOrigins: function () {
          return u;
        },
        pips: j,
      };
      return ot;
    }
    function j(t, e) {
      if (!t || !t.nodeName)
        throw new Error(
          "noUiSlider: create requires a single element, got: " + t
        );
      if (t.noUiSlider)
        throw new Error("noUiSlider: Slider was already initialized.");
      var r = O(t, vt(e), e);
      return (t.noUiSlider = r);
    }
    var z = { __spectrum: a, cssClasses: u, create: j };
    (st.create = j),
      (st.cssClasses = u),
      (st.default = z),
      Object.defineProperty(st, "__esModule", { value: !0 });
  });
}
