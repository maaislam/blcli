/**
 * Taken from the site source, this code is responsible for the editors
 * picks and just landed sliders
 */
export default function wbslider() {
    $(function() {
        "use strict";
        function e() {
            c++;
            //scrollSnapPolyfill.makeScrollsnapPolyfill && c >= 2 && scrollSnapPolyfill.makeScrollsnapPolyfill() // too many deps
        }
        function n(e) {
            i(e),
            e.trigger("lazyload:success")
        }
        function t() {
            var e = $(".related-products-slider-container");
            1 === e.length && i(e)
        }
        function i(e) {
            function n(e, n, t, i, o) {
                function d() {
                    c[o] = !1
                }
                function m(e) {
                    return e + r.width() >= r[0].scrollWidth && i || !i && e <= 0
                }
                function v() {
                    if (m(r.scrollLeft()))
                        return n.addClass("disabled"),
                        !0
                }
                function h() {
                    var n = r.scrollLeft()
                      , i = Math.floor(n / l) * l
                      , o = i + e * f * l;
                    b = i + e * l,
                    t.removeClass("disabled"),
                    a(BezierEasing.css["ease-in"].get, u * f * 1e3, r[0], o, w)
                }
                function w() {
                    if (n.is(":active") && !m(b)) {
                        var t = b + f * e * l;
                        b += e * l,
                        a(BezierEasing.css.linear.get, u / s * 1e3, r[0], t, w)
                    } else
                        a(BezierEasing.css["ease-out"].get, u * (1 - f) * 1e3, r[0], b, g)
                }
                function g() {
                    var e = v();
                    return n.is(":active") && !e ? h() : d()
                }
                function p() {
                    c[o] || v() || (c[o] = !0,
                    h())
                }
                var b;
                return p
            }
            var t = e.children(".slider")
              , i = t.children("a:first-child")
              , o = t.children("a:last-child")
              , r = t.children(".products")
              , l = r.children(".product-summary").width();
            isTouchDevice() && r.css("overflow-x", "scroll");
            var c = [!1, !1]
              , s = (1 - BezierEasing.css["ease-in"].get(.99)) / .01
              , u = .75
              , f = .75
              , d = n(-1, i, o, !1, 0);
            i.mousedown(d),
            i.click(function(e) {
                e.preventDefault()
            });
            var m = n(1, o, i, !0, 1);
            o.mousedown(m),
            o.click(function(e) {
                e.preventDefault()
            })
        }
        function o(e, n, t) {
            var i = Math.abs(n - t)
              , o = 100 / Math.max(document.documentElement.clientHeight, window.innerHeight || 1) * i
              , r = 100 / e * o;
            return isNaN(r) ? 0 : Math.max(e / 1.5, Math.min(r, e))
        }
        function r(e, n, t, i, o) {
            return i > o ? t : n + (t - n) * e(i / o)
        }
        function a(e, n, t, i, a) {
            function l() {
                var n = Date.now() - s;
                return t.scrollLeft = r(e, c, i, n, f),
                n > f ? (t.scrollLeft = i,
                a()) : void u(l)
            }
            var c = t.scrollLeft
              , s = Date.now()
              , u = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(e) {
                window.setTimeout(e, 15)
            }
              , f = o(n, c, i);
            l()
        }
        var l = (new URI).query()
          , c = 0
          , s = l ? "?" + l : ""
          , u = $("#homepage-boxes");
        1 === u.length && $.ajax("/front-page-recommendations/top/" + s, {
            i18n: !0
        }).done(function(e) {
            u.before($.trim(e));
            var t = u.prev();
            n(t)
        }).always(e);
        var f = $(".boxes-bottom");
        1 === f.length && $.ajax("/front-page-recommendations/bottom/" + s, {
            i18n: !0
        }).done(function(e) {
            f.after($.trim(e));
            var t = f.next();
            n(t)
        }).always(e),
        t()
    });
}
