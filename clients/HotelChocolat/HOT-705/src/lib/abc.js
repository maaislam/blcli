"use strict";
(self.webpackChunktag = self.webpackChunktag || []).push([[792], {
    3306: (t, e) => {
        const n = ["@abtasty/nps", "@abtasty/interstitiel", "@abtasty/banner", "@abtasty/tooltip", "@abtasty/google-form-modal", "@abtasty/zopim", "@abtasty/olark", "@abtasty/responsive-sharing-buttons", "@abtasty/sharing-sidebar", "@abtasty/christmas-hat", "@abtasty/snowflakes", "@abtasty/weather", "@abtasty/social-proof", "@abtasty/widget-quality", "@abtasty/sharing-sidebar", "@abtasty/weather", "@abtasty/scroll-tracking", "@abtasty/element-visibility", "@abtasty/iframe-click-tracking"]
    }
    ,
    4721: (t, e, n) => {
        n.d(e, {
            Is: () => u,
            K6: () => p,
            Mz: () => d,
            fS: () => r,
            fh: () => s,
            ih: () => l,
            l$: () => a,
            nc: () => m,
            tv: () => o,
            vw: () => i,
            xu: () => c
        });
        const o = "abtasty_resetActionTracking"
          , i = "targetPages"
          , a = "qaParameters"
          , r = "audience"
          , s = "segment"
          , c = "segmentMode"
          , l = "trigger"
          , d = "triggerMode"
          , u = "$^"
          , p = 16
          , m = 1e3
    }
    ,
    6914: (t, e, n) => {
        n.d(e, {
            p: () => o
        });
        const o = (0,
        n(721).c)(( (t, e) => e.reduce(( (e, n) => t(n) ? [...e, n] : e), [])))
    }
    ,
    721: (t, e, n) => {
        function o(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            return function() {
                for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
                    i[a] = arguments[a];
                const r = t.length
                  , s = t => "__missing__" === t
                  , c = e.map((t => s(t) && i.length > 0 ? i.shift() : t)).concat(i);
                return c.filter((t => !s(t))).length < r ? o(t, c) : t(...c)
            }
        }
        n.d(e, {
            c: () => o
        })
    }
    ,
    9076: (t, e, n) => {
        function o() {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
                e[n] = arguments[n];
            return function(t) {
                for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
                    o[i - 1] = arguments[i];
                return e.reduce(( (e, n) => null != e ? n(e) : n(t, ...o)), void 0)
            }
        }
        n.d(e, {
            F: () => o
        })
    }
    ,
    8689: (t, e, n) => {
        function o(t) {
            return null != t && ("string" == typeof t ? "" === t : Array.isArray(t) ? 0 === t.length : "object" == typeof t && 0 === Object.keys(t).length)
        }
        n.d(e, {
            I: () => o
        })
    }
    ,
    3595: (t, e, n) => {
        function o(t) {
            return null == t
        }
        n.d(e, {
            g: () => o
        })
    }
    ,
    427: (t, e, n) => {
        n.d(e, {
            A: () => o
        });
        const o = (0,
        n(721).c)(( (t, e) => t.reduce(( (t, e) => t ? t[e] : void 0), e)))
    }
    ,
    117: (t, e, n) => {
        n.d(e, {
            X: () => r
        });
        var o = n(721)
          , i = n(427);
        const a = (0,
        o.c)(( (t, e) => null == e || e != e ? t : e))
          , r = (0,
        o.c)(( (t, e, n) => a(t, (0,
        i.A)(e, n))))
    }
    ,
    2852: (t, e, n) => {
        n.d(e, {
            l: () => o
        });
        const o = (0,
        n(721).c)(( (t, e) => e.split(t)))
    }
    ,
    2524: (t, e, n) => {
        n.r(e),
        n.d(e, {
            detectDatalayer: () => h,
            extractDatalayerToObject: () => p,
            getDatalayer: () => g,
            putInArrayIfNeeded: () => m,
            sendDatalayerIfNeeded: () => f
        });
        var o = n(7643)
          , i = n(1492)
          , a = n(1134)
          , r = n(7862)
          , s = n(7426)
          , c = n(6883);
        const l = "datalayerTimeout"
          , d = "hitDatalayerTimeout"
          , u = "waitDatalayer";
        function p(t) {
            const e = t.length !== Object.keys(t).length ? {
                ...t
            } : t
              , n = Object.entries(e).filter((t => Array.isArray(t[1])));
            return n.length > 0 && n.forEach((t => {
                e[t[0]] = p(t[1])
            }
            )),
            e
        }
        function m(t, e) {
            return [].concat(null != t ? t : e)
        }
        function g() {
            const {datalayerVariable: t} = (0,
            a.F5)();
            if (!t || !window[t])
                return null;
            const e = window[t];
            return Array.isArray(e) && e.length < 1 && Object.keys(e).length > 0 ? p(e) : e
        }
        function f() {
            const t = Math.floor((0,
            a.F5)().datalayerMaxToSend);
            if ((0,
            c.r)(t)) {
                const t = {
                    dlr: g()
                };
                (new o.n).setInternalHit(i.YQ.datalayer, t)
            }
        }
        function h() {
            if (null == window.ABTasty.datalayerEnabled)
                return new Promise(( (t, e) => {
                    const {datalayerVariable: n} = (0,
                    a.F5)();
                    n || e("Data layer variable is not set");
                    const o = setInterval(( () => {
                        const e = g();
                        e && (Array.isArray(e) && e.length || Object.keys(e).length) && ((0,
                        s.fD)(l),
                        t())
                    }
                    ), 200);
                    (0,
                    r.X)(u, o);
                    const i = setTimeout(( () => {
                        (0,
                        r.T)(u),
                        e("Data layer variable cannot be found")
                    }
                    ), 2e3);
                    (0,
                    s.Dk)(l, i)
                }
                )).then(( () => {
                    window.ABTasty.datalayerEnabled = !0;
                    const t = setTimeout(f, 5e3);
                    (0,
                    s.Dk)(d, t)
                }
                )).catch((t => (window.ABTasty.datalayerEnabled = !1,
                t))).finally(( () => {
                    (0,
                    s.fD)(l),
                    (0,
                    r.T)(u)
                }
                ))
        }
    }
    ,
    9294: (t, e, n) => {
        n.d(e, {
            sb: () => l,
            G1: () => s,
            GW: () => c,
            Gr: () => d,
            lV: () => p
        });
        var o = n(81)
          , i = n(918)
          , a = n(7426)
          , r = n(3847);
        function s() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.navigator.userAgent;
            return /MSIE [678]/.test(t)
        }
        function c() {
            return window.self !== window.top && "https:" === window.location.protocol
        }
        function l() {
            return new Promise((t => {
                if (null != window.ABTasty.ADBlockEnabled)
                    return void t();
                const e = setTimeout(( () => {
                    void 0 !== window.ABTasty.ADBlockEnabled && (window.ABTasty.AdBlockDetectionFailed = !0,
                    t("AbBlock detection failed"))
                }
                ), 2e3);
                (0,
                a.Dk)("adblockDetectionLoop", e);
                const n = [o.o3.fakeAd1, o.o3.fakeAd2, o.o3.fakeAd3].map((t => `${t}${o.Y0.javascript}`))
                  , s = function() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                    const o = (0,
                    i.k)(`${(0,
                    r.x)()}/${n[e]}`);
                    o.async = !1,
                    o.onload = () => {
                        e + 1 < n.length ? s(e + 1) : (window.ABTasty.ADBlockEnabled = !1,
                        t("AdBlock is disabled"))
                    }
                    ,
                    o.onerror = () => {
                        window.ABTasty.ADBlockEnabled = !0,
                        t("AdBlock is enabled")
                    }
                };
                s()
            }
            ))
        }
        function d() {
            return new RegExp("^(?=.*?\\b(safari)\\b)(?:(?!chrome|crios).)*$","gi").test(navigator.userAgent)
        }
        const u = "visibilitychange";
        function p(t) {
            const e = () => ("hidden" === document.visibilityState && t(),
            null);
            return document.addEventListener(u, e),
            () => {
                document.removeEventListener(u, e)
            }
        }
    }
    ,
    6332: (t, e, n) => {
        n.d(e, {
            X8: () => u,
            j3: () => d
        });
        var o = n(3595)
          , i = n(427)
          , a = n(648)
          , r = n(7643)
          , s = n(1492);
        var c = n(1134);
        const l = (t, e) => {
            let {deprecate: n, new: i=null, type: l, el: d} = t;
            const u = `${l} ${n} is deprecated` + (i ? ` - Please use ${i} instead.` : "");
            if ((0,
            a.FF)(u),
            e) {
                const t = {
                    cid: "b1c05f3030611d124ca247d0cffcf1a4",
                    ec: "Deprecated Usage",
                    ea: (0,
                    c.pw)(),
                    el: (0,
                    o.g)(d) ? n.replace("window.", "") : d
                };
                (new r.n).setInternalHit(s.YQ.event, t)
            }
        }
          , d = ( () => {
            const t = {};
            return e => {
                const n = (0,
                o.g)(e.el) ? e.deprecate : `${e.deprecate};${e.el}`;
                t[n] ? l(e, !1) : (l(e, !0),
                t[n] = e)
            }
        }
        )()
          , u = (t, e) => {
            try {
                if (0 === t.length || 0 === e.length)
                    return !1;
                if (e.join(".").indexOf(t.join(".")) > -1)
                    throw new Error("Can't deprecate variable from itself");
                const n = t.length
                  , o = t.slice(0, n - 1)
                  , a = t[n - 1];
                return Object.defineProperty((0,
                i.A)(o, window), a, {
                    get: () => (d({
                        deprecate: `window.${t.join(".")}`,
                        new: `window.${e.join(".")}`,
                        type: "variable"
                    }),
                    (0,
                    i.A)(e, window))
                }),
                !0
            } catch (e) {
                const n = `Failed to deprecate window.${t.join(".")} variable.`;
                return (0,
                a.vV)(n),
                !1
            }
        }
    }
    ,
    918: (t, e, n) => {
        n.d(e, {
            k: () => i
        });
        var o = n(648);
        function i(t) {
            let {attributes: e, callback: n} = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (!t)
                return void (0,
                o.vV)('appendScript called with missing "src" parameter');
            const i = document.getElementsByTagName("head")[0]
              , a = document.createElement("script");
            return n && (a.onload = n),
            a.setAttribute("type", "text/javascript"),
            a.setAttribute("src", t),
            e && Object.entries(e).forEach((t => {
                let[e,n] = t;
                a.setAttribute(e, n)
            }
            )),
            i.appendChild(a),
            a
        }
    }
    ,
    7550: (t, e, n) => {
        function o(t) {
            const {readyState: e} = document
              , n = "interactive" === e || "complete" === e;
            if (null == t)
                return n;
            if (n)
                t();
            else {
                const e = () => {
                    document.removeEventListener("DOMContentLoaded", e),
                    t()
                }
                ;
                document.addEventListener("DOMContentLoaded", e)
            }
        }
        n.d(e, {
            Q: () => o
        })
    }
    ,
    8318: (t, e, n) => {
        n.r(e),
        n.d(e, {
            addObservance: () => c
        });
        var o = n(3595);
        const i = (t, e) => t && "BODY" !== t.tagName ? t === e || i(t.parentNode, e) : t === e
          , a = {
            observer: null,
            observances: []
        }
          , r = {
            attributes: !0,
            childList: !0,
            characterData: !0,
            subtree: !0,
            attributeFilter: ["checked", "class", "disabled", "form", "hidden", "href", "icon", "id", "label", "max", "min", "maxLength", "minLength", "method", "name", "novalidate", "placeholder", "readonly", "rel", "required", "selected", "size", "span", "src", "target", "title", "type", "value"]
        }
          , s = (t, e) => {
            if (t && t.length) {
                const n = t.reduce(( (t, e) => {
                    let {addedNodes: n, removedNodes: i, target: a, type: r, attributeName: s, oldValue: c} = e
                      , l = []
                      , d = !0;
                    return l = n.length ? [...n] : i.length ? [...i] : [a],
                    "attributes" !== r || (0,
                    o.g)(s) || c !== a.getAttribute(s) || (d = !1),
                    d ? [...t, ...l] : t
                }
                ), []);
                a.observances = a.observances.filter((t => {
                    let {selector: o, include: a, callback: r} = t;
                    const s = (t => {
                        if (!t.includes("[]"))
                            return t;
                        const [,,e] = t.split("[]");
                        return e.trim()
                    }
                    )(o)
                      , c = e.querySelectorAll(s);
                    return a && ( (t, e) => [...e].some((e => !!e && t.some((t => i(e, t) || i(t, e))))))(n, c) ? (r(),
                    !1) : !(!a && 0 === c.length) || (r(),
                    !1)
                }
                ))
            }
        }
          , c = function() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.document
              , e = arguments.length > 1 ? arguments[1] : void 0
              , n = arguments.length > 2 ? arguments[2] : void 0
              , o = arguments.length > 3 ? arguments[3] : void 0;
            const i = a.observances.some((e => e.root === t));
            a.observances.push({
                root: t,
                selector: e,
                include: n,
                callback: o
            }),
            i || (t => {
                a.observer = new MutationObserver((e => s(e, t))),
                a.observer.observe(t, r)
            }
            )(t)
        }
    }
    ,
    3346: (t, e, n) => {
        function o(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return fetch(t, {
                method: "GET",
                mode: "cors",
                headers: {
                    Origin: document.location.origin
                },
                ...e
            })
        }
        n.d(e, {
            J: () => o
        })
    }
    ,
    88: (t, e, n) => {
        n.d(e, {
            DC: () => s,
            Qm: () => c,
            Yx: () => o,
            fm: () => i,
            nf: () => a,
            to: () => r
        });
        n(648);
        function o(t, e) {
            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100;
            !0 === t() ? e() : setTimeout(( () => {
                o(t, e, n)
            }
            ), n)
        }
        function i(t) {
            let e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 16, o = arguments.length > 2 ? arguments[2] : void 0;
            return new Promise(( (i, a) => {
                const r = () => t() ? i(!0) : e = setTimeout(r, n);
                r(),
                o && setTimeout(( () => {
                    clearTimeout(e),
                    a(!0)
                }
                ), o)
            }
            ))
        }
        function a(t, e, n) {
            "sessionStorage" === t ? sessionStorage.setItem(e, n) : localStorage.setItem(e, n)
        }
        function r(t, e) {
            return "sessionStorage" === t ? sessionStorage.getItem(e) : localStorage.getItem(e)
        }
        function s(t, e) {
            "sessionStorage" === t ? sessionStorage.removeItem(e) : localStorage.removeItem(e)
        }
        function c(t) {
            window.addEventListener("pageshow", (e => {
                e.persisted && t()
            }
            ))
        }
    }
    ,
    7707: (t, e, n) => {
        function o() {
            return "ec0e4721"
        }
        function i() {
            return `${"ec0e4721".substring(0, 5)}`
        }
        n.d(e, {
            i: () => i,
            y: () => o
        })
    }
    ,
    6381: (t, e, n) => {
        n.d(e, {
            P: () => r,
            k: () => c
        });
        var o = n(9578)
          , i = n(3595)
          , a = n(2352);
        const r = {};
        let s;
        class c extends a.X {
            constructor() {
                if (s)
                    return s;
                super(),
                s = this
            }
            resetCustomEventState() {
                Object.keys(r).forEach((t => {
                    delete r[t]
                }
                )),
                this.notify(["events"])
            }
            resetSpecificsCustomEvents(t) {
                t.forEach((t => {
                    r[t] = {
                        status: o.u.Status.loading
                    }
                }
                )),
                this.notify(t.map((t => `events.${t}`)))
            }
            getStatusCustomEvent(t) {
                return (0,
                i.g)(r[t]) ? o.u.Status.loading : r[t].status
            }
            initCustomEventState() {
                Object.keys(o.u.Name).forEach((t => {
                    (0,
                    i.g)(r[t]) && (r[t] = {
                        status: o.u.Status.loading
                    })
                }
                )),
                window.ABTasty && (window.ABTasty.eventState = r)
            }
            dispatchCustomEvent(t, e) {
                const n = new CustomEvent(`${arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "abtasty"}_${t}`,{
                    detail: e
                });
                window.dispatchEvent(n),
                r[t] || this.initCustomEventState(),
                r[t].status = o.u.Status.complete,
                !(0,
                i.g)(e) && (0,
                i.g)(r[t].detail) ? r[t].detail = [e] : (0,
                i.g)(e) || (r[t].detail = [...r[t].detail, e]),
                this.notify([`events.${t}`])
            }
            notify(t) {
                for (const e of t)
                    this.mediator?.notify(e)
            }
        }
    }
    ,
    6552: (t, e, n) => {
        n.d(e, {
            w: () => a
        });
        var o = n(648);
        const i = t => 0 === t.length ? -1 : Math.abs(t.split("").reduce(( (t, e) => {
            const n = (t << 5) - t + e.charCodeAt(0);
            return 0 | n
        }
        ), 0))
          , a = async t => {
            let e = -1;
            if (window.isSecureContext)
                try {
                    e = await (async t => {
                        const e = (new TextEncoder).encode(t)
                          , n = await crypto.subtle.digest("SHA-1", e);
                        return new Uint16Array(n)[0]
                    }
                    )(t)
                } catch (n) {
                    (0,
                    o.FF)("Hashing by Crypto API failed, fallback to hashing by bits shifting."),
                    e = i(t)
                }
            else
                e = i(t);
            return e < 0 ? -1 : e % 100 + 1
        }
    }
    ,
    9700: (t, e, n) => {
        n.d(e, {
            a2: () => a,
            hw: () => s,
            qF: () => r
        });
        var o = n(4423)
          , i = n(3595);
        function a(t) {
            let e, n = t;
            return (0,
            i.g)(t) && t.indexOf(":eq") > -1 && (n = t.replace(/html:eq\([0-9]+\)/g, "html"),
            n.match(/:eq\([0-9]+\)/g).forEach((t => {
                e = Number(t.replace(":eq(", "").replace(")", "")) + 1,
                n = n.replace(t, `:nth-of-type(${e})`)
            }
            ))),
            n
        }
        function r(t) {
            if (void 0 === t)
                return;
            const e = t.split(".");
            return 256 * (256 * (256 * +e[0] + +e[1]) + +e[2]) + +e[3]
        }
        function s() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 8;
            return (0,
            o.d_)("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t)()
        }
    }
    ,
    7862: (t, e, n) => {
        n.d(e, {
            T: () => a,
            X: () => i
        });
        const o = {};
        function i(t, e) {
            o[t] = e
        }
        function a(t) {
            clearInterval(o[t])
        }
    }
    ,
    9404: (t, e, n) => {
        n.d(e, {
            IF: () => a,
            pK: () => i
        });
        const o = {}
          , i = (t, e) => {
            o[t] ? o[t].push(e) : o[t] = [e]
        }
          , a = t => {
            o[t] && (o[t].forEach((t => t())),
            delete o[t])
        }
    }
    ,
    6883: (t, e, n) => {
        n.d(e, {
            r: () => o
        });
        const o = t => {
            if (window.abTastyNoRandomHit)
                return !0;
            if (0 === t)
                return !1;
            return 1 === Math.floor(Math.random() * t) + 1
        }
    }
    ,
    7426: (t, e, n) => {
        n.d(e, {
            Dk: () => i,
            fD: () => r,
            sm: () => a
        });
        let o = {};
        function i(t, e) {
            o[t] = e
        }
        function a() {
            Object.keys(o).forEach((t => clearTimeout(o[t]))),
            o = {}
        }
        function r(t) {
            clearTimeout(o[t])
        }
    }
    ,
    6729: (t, e, n) => {
        n.d(e, {
            W: () => i
        });
        var o = n(1134);
        async function i() {
            const {addJquery: t, jqueryVarName: e} = (0,
            o.F5)();
            if (t) {
                let t;
                return "" !== e && null != e && (t = e.split(".").reduce(( (t, e) => t ? t[e] : t), window)),
                t || window.jQuery || window.$
            }
            return window.jQuery
        }
    }
    ,
    9518: (t, e, n) => {
        n.d(e, {
            j: () => r
        });
        var o = n(3340)
          , i = n(1387)
          , a = n(6804);
        const r = (t, e, n, r) => async s => {
            let {value: c, isAsync: l} = s;
            if (l)
                return r.setStatus(o.B.waitingCodeResolution),
                new Promise((async (e, o) => {
                    const r = {
                        resolve: e,
                        reject: o
                    };
                    n ? await n().then((e => {
                        let {code: n} = e;
                        return (0,
                        a.F)(n, {
                            campaign: t
                        }, void 0, [r.resolve])
                    }
                    )) : await !!(0,
                    i.K6)(c, t, void 0, void 0, r)
                }
                )).then((t => t)).catch((t => (e(t),
                !1)));
            try {
                return n ? n().then((e => {
                    let {code: n} = e;
                    return (0,
                    a.F)(n, {
                        campaign: t
                    })
                }
                )) : (0,
                i.K6)(c, t)
            } catch (t) {
                return e(t),
                Promise.resolve(!1)
            }
        }
    }
    ,
    5437: (t, e, n) => {
        n.d(e, {
            y3: () => M,
            Yj: () => P,
            Cq: () => k,
            R2: () => H,
            oE: () => I,
            NU: () => A,
            Vf: () => L,
            Uv: () => C,
            sd: () => N,
            Zo: () => R,
            yq: () => U,
            wM: () => G,
            Pk: () => E,
            aQ: () => j,
            Dj: () => D
        });
        var o = n(648)
          , i = n(1134)
          , a = n(3595)
          , r = n(6914);
        const s = t => t.reduce(( (t, e) => {
            const [n,o] = e;
            return 2 === e.length ? Object.assign(t, {
                [n]: o
            }) : t
        }
        ), {});
        var c = n(721);
        const l = (0,
        c.c)(( (t, e, n, o) => t(o) ? e(o) : n(o)));
        var d = n(8689);
        const u = t => t[t.length - 1]
          , p = (0,
        c.c)(( (t, e) => e.map(t)))
          , m = (0,
        c.c)(( (t, e) => e.match(t)));
        var g = n(9076);
        const f = (0,
        c.c)(( (t, e) => e[t]))
          , h = (0,
        c.c)(( (t, e) => e.reduce(( (e, n) => t(n) ? e : e.concat(n)), [])));
        var y = n(2852)
          , b = n(9294)
          , v = n(5216);
        function w(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location.href;
            return (0,
            g.F)(m(t), l(a.g, ( () => ""), u), (0,
            y.l)("&"), h(d.I), p((0,
            y.l)("=")), s)(e)
        }
        function T(t) {
            return function(t) {
                return /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:?[0-9]*)$/.test(t)
            }(t) || /\[(.)+\]/.test(t)
        }
        function x(t) {
            try {
                const {protocol: e} = t instanceof URL ? t : new URL(t);
                return ["http:", "https:"].includes(e)
            } catch (t) {
                return !1
            }
        }
        function k() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.href;
            if (!x(t))
                return (0,
                o.vV)(`'${t}' is not an http url`),
                [];
            const e = A(t);
            return T(e) ? [e] : (0,
            g.F)((t => t.split(".")), (t => t.reverse()), (t => t.map(( (e, n) => {
                const o = t.reduce(( (t, e, o) => o <= n ? `${e}.${t}` : t));
                return `.${o}`
            }
            ))), (t => t.length > 1 ? t.slice(1) : t))(e)
        }
        function O() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.href;
            const e = "ABTastyDomainTest=true"
              , n = (0,
            i.F5)().isSecureCookie || (0,
            b.GW)() ? "Samesite=None;Secure;" : "Samesite=Lax;"
              , r = (0,
            g.F)((t => k(t)), (t => t.find((t => (document.cookie = `${e};path=/;domain=${t};${n}`,
            -1 !== document.cookie.indexOf(e))))))(t);
            return document.cookie = `${e};expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=${r};${n}`,
            (0,
            a.g)(r) || (0,
            d.I)(r) ? ((0,
            o.vV)(`no valid domain found for '${t}'`),
            null) : r
        }
        function S(t) {
            return T(t) ? 1 : t.split(".").length
        }
        function _(t) {
            if ((0,
            v.lG)(t))
                return O(t);
            if (!x(t))
                return (0,
                o.vV)(`'${t}' is not an http url (getCookieDomain)`),
                null;
            const e = A(t)
              , {authorizedDomains: n=[]} = (0,
            i.F5)();
            if (0 === n.length)
                return (0,
                o.vV)("no authorizedDomains set for the account (getCookieDomain)"),
                null;
            if (n.length > 1)
                return O(t);
            const r = (0,
            v.aV)(n, e);
            if (0 === r.length)
                return (0,
                o.vV)(`no valid domain found for '${t}' (getCookieDomain)`),
                O(t);
            const s = function(t) {
                return t.reduce(( (t, e) => {
                    const n = S(t) > S(e);
                    return !t || T(e) || n ? e : t
                }
                ), "")
            }(r)
              , c = function(t) {
                return t.split(":")[0]
            }(s);
            return (0,
            a.g)(c) || (0,
            d.I)(c) ? ((0,
            o.vV)(`empty domain found for '${t}' (getCookieDomain)`),
            null) : `.${c}`
        }
        const H = function() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _;
            const e = {};
            return function() {
                let n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.href;
                const o = A(n);
                return e[o] || (e[o] = t(n)),
                e[o]
            }
        }();
        function A() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.href;
            try {
                return new URL(t).host || t
            } catch (e) {
                return t
            }
        }
        function E(t) {
            if (!t.includes("?") && !t.includes("#"))
                return t;
            const e = t.match(/([^#?]+)((?:\?|\#)(?:.+))/i)
              , n = e && e[2] ? e[2].match(/(?:\#|\?)([^#?]+)/gi) : []
              , o = n && n.reduce(( (t, e) => "?" === e[0] ? [[...t[0], e], t[1]] : [t[0], [...t[1], e]]), [[], []]).map((t => t.map((t => t.substring(1)))))
              , i = o && o[0].length ? `?${o[0].join("&")}` : ""
              , a = o && o[1].length ? `#${o[1].join("&")}` : "";
            return e ? `${e[1]}${i}${a}` : t
        }
        function C() {
            return w(/\?([^#]+)/, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.href)
        }
        function I() {
            return w(/#([^?]+)/, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.href)
        }
        function L(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location.href;
            return (0,
            g.F)(C, f(t))(e)
        }
        function D(t) {
            return -1 !== (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location.href).indexOf(t)
        }
        function N(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location.href;
            return (0,
            g.F)(R, f(t))(e)
        }
        function P(t, e, n) {
            const o = new URL(n)
              , i = "" === o.search ? "?" : "&";
            return o.search += `${i}${t}=${e}`,
            o.href
        }
        const B = /^([^=]+)=?(.*)$/;
        function R(t) {
            let e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            return t.includes("?") ? (0,
            g.F)((t => t.match(/\?([^#]+)/)), l(a.g, ( () => ""), (t => t[t.length - 1])), (0,
            y.l)("&"), h((t => (0,
            d.I)(t) || !B.test(t))), p((t => t.match(B).slice(1))), l(( () => e), s, (t => t)))(t) : e ? {} : []
        }
        function M(t) {
            if (null == t || "" === t)
                return "";
            const e = t.includes("?") ? "&" : "?"
              , n = R(t)
              , o = R(window.location.href, !1)
              , i = ["gclid", "cid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "xtor", "xts", "xtdt", "cm_mmc", "MKZOID"]
              , a = (0,
            g.F)((0,
            r.p)((t => {
                let[e] = t;
                return !(e in n) && i.includes(e)
            }
            )), p((t => `${t[0]}=${t[1]}`)))(o);
            return 0 === a.length ? t : t + e + a.join("&")
        }
        function V(t) {
            return Object.keys(t).map((e => `${e}=${t[e]}`)).join("&")
        }
        function j(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location.href;
            if (!t.includes("?") && !e.includes("?"))
                return t;
            const n = R(t)
              , o = R(e)
              , i = `?${V(Object.assign({}, o, n))}`
              , r = t.includes("#") ? `#${V(function() {
                lett = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.href;
                return t.includes("#") ? (0,
                g.F)((t => t.match(/#([^?]+)/)), l(a.g, ( () => ""), (t => t[t.length - 1])), (0,
                y.l)("&"), h((t => (0,
                d.I)(t) || "#" === t.replace(/#+/, "#").split("=")[0] || !B.test(t))), p((t => t.match(B).slice(1))), s)(t) : {}
            }(t))}` : ""
              , c = function(t) {
                return t.includes("?") ? t.indexOf("?") : t.includes("#") ? t.indexOf("#") : t.length
            }(t);
            return `${t.slice(0, c)}${i}${r}`
        }
        function q(t, e) {
            if (!t.includes(e))
                return t;
            const n = new URL(t);
            return n.search = n.search.replace(new RegExp(`${e}[^=&#?]*(=[^&#]+)?`,"g"), ""),
            n.hash = n.hash.replace(new RegExp(`${e}[^=&#?]*(=[^&?]+)?`,"g"), ""),
            n.href = n.href.replace(/\?$|\#$|&+$|(\?)&+|(\#)&+|(&)&+|\?(\#)|\#(\?)/g, "$1$2$3$4$5"),
            /\/[?#]/.test(t) ? n.href : n.href.replace(/\/(\?|\#|$)/, "$1")
        }
        function $(t) {
            return ["tastypreprod", "abtasty_qa_assistant"].reduce(q, t)
        }
        function F(t) {
            try {
                return decodeURI(t)
            } catch (t) {}
            return null
        }
        function G(t, e) {
            let n, i, a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
            switch (t) {
            case "is":
            case "simplematch":
            case "ignore_parameters":
                return n = function(t) {
                    const e = t ? new URL(t) : window.location
                      , {origin: n, pathname: o} = e;
                    return `${n}${o}`
                }(a),
                i = F(n),
                e === n || `${e}/` === n || e === i || `${e}/` === i;
            case "exact":
            case "equals":
            case "is strictly":
                return n = $(a || window.location.href),
                i = F(n),
                e === n || `${e}/` === n || e === i || `${e}/` === i;
            case "substring":
            case "contains":
            case "contain":
                return n = $(a || window.location.href),
                i = F(n),
                -1 !== n.indexOf(e) || -1 !== i.indexOf(e);
            case "regex":
            case "regexp":
                n = $(a || window.location.href);
                try {
                    return new RegExp(e,"i").test(n)
                } catch (t) {
                    const n = `The url check used an invalid regular expression => ${e}`;
                    return (0,
                    o.vV)(n, t),
                    !1
                }
            }
        }
        function U(t) {
            const e = A(arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location.host);
            return !(0,
            a.g)(t) && !(0,
            d.I)(t) && e.endsWith(t)
        }
    }
    ,
    7738: (t, e, n) => {
        n.d(e, {
            F: () => c
        });
        var o = n(648);
        let i = document.location.href
          , a = !1;
        const r = [];
        function s() {
            document.location.href !== i && ((0,
            o.fH)("Url change detected", `${r.length} callback to apply`),
            i = document.location.href,
            r.forEach((t => t())))
        }
        function c(t) {
            r.push(t),
            a || (a = !0,
            new MutationObserver((t => {
                t.forEach(s)
            }
            )).observe(window.document, {
                childList: !0,
                subtree: !0
            }))
        }
    }
    ,
    1134: (t, e, n) => {
        n.d(e, {
            $E: () => g,
            AU: () => f,
            B9: () => y,
            Bz: () => h,
            F5: () => d,
            Fc: () => a,
            Ut: () => r,
            bA: () => p,
            cR: () => m,
            iN: () => c,
            m_: () => l,
            pw: () => u,
            yn: () => s
        });
        var o = n(4804);
        const i = {
            accountSettings: {
                id: 48343,
                identifier: "deb3630b862e6561a9786af7a3f94baf",
                accountName: "Hotel Chocolat",
                frameworkVersion: "next",
                pack: "premium",
                quota: 0,
                useChina: !1,
                toleranceParams: [],
                toleranceRegex: null,
                omnitureIntegration: 0,
                accountIframeException: !1,
                runAsThread: !1,
                addJquery: !1,
                jqueryVarName: null,
                ajaxAutoReload: !0,
                excludeIE: !0,
                hashMrasnAllowed: !0,
                globalCode: "",
                globalCodeOnDocReady: !0,
                customCookieDomain: null,
                customCookiePath: "/",
                isSecureCookie: !1,
                oneVisitorOneTest: !1,
                cookieLifespan: 13,
                waitForConsent: {
                    data: null,
                    campaignRestrictions: {
                        test: !0,
                        perso: !0,
                        redirection: !0,
                        aa: !0,
                        patch: !0
                    },
                    mode: "disabled"
                },
                storageMode: "local",
                datalayerVariable: "dataLayer",
                datalayerMaxToSend: 100,
                tealiumAccountName: null,
                tealiumProfileName: null,
                apiTokenWeborama: null,
                getAlwaysWeborama: null,
                kruxNamespace: null,
                eulerianPixelURL: null,
                clarityProjectId: null,
                cookielessEnabled: !1,
                byoidConfig: !1,
                epoqId: null,
                emotionAiId: null,
                recoAndMerchId: null,
                sampling: 100,
                authorizedDomains: ["hotelchocolat.com"]
            },
            tests: {
                757467: {
                    name: "HC089 - Restricted Products Wall",
                    traffic: 100,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    targetingMode: "fastest",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 31,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !1,
                    m2eStartRange: 0,
                    segmentMode: "all",
                    triggerMode: "all",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: ".html"
                        }, {
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/uk/shop/"
                        }, {
                            include: !0,
                            condition: 10,
                            value: "/basket"
                        }, {
                            include: !0,
                            condition: 10,
                            value: "/my-account"
                        }],
                        testId: 757467,
                        qaUrlParameterEnabled: !1
                    },
                    campaignHash: "7bfe660787675f04aa7165acae1f2187",
                    id: 757467,
                    additionalType: "",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        941519: {
                            id: 941519,
                            traffic: 0,
                            name: "Control"
                        },
                        941822: {
                            id: 941822,
                            traffic: 100,
                            name: "Variation 1"
                        }
                    }
                },
                803681: {
                    id: 803681,
                    name: "VIP.ME Banner",
                    type: "mastersegment",
                    sub_type: "sp",
                    parentID: 0,
                    priority: 0,
                    children: [803682],
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !1,
                    m2eStartRange: 0,
                    variations: {
                        998336: {
                            id: 998336,
                            name: "Variation 1"
                        }
                    }
                },
                803682: {
                    name: "VIP.ME Banner",
                    traffic: 100,
                    type: "subsegment",
                    parentID: 803681,
                    targetingMode: "fastest",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 8,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !1,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/"
                        }],
                        testId: 803682,
                        qaUrlParameterEnabled: !1
                    },
                    campaignHash: "b788340c4223b5374596ca950c23ca58",
                    id: 803682,
                    additionalType: "patch",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        998337: {
                            id: 998337,
                            traffic: 100,
                            name: "Variation 1"
                        }
                    }
                },
                899886: {
                    name: "HC140 - Subscriptions Tidy Up",
                    traffic: 100,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    globalCode: 'setTimeout((function(){var e,a,t,n,s,o,i="899886",c=ABTasty.results[i].name,r=ABTasty.results[i].variationID,l=ABTasty.results[i].variationName;e=window,a=document,t="script",n="ga",e.GoogleAnalyticsObject=n,e[n]=e[n]||function(){(e[n].q=e[n].q||[]).push(arguments)},e[n].l=1*new Date,s=a.createElement(t),o=a.getElementsByTagName(t)[0],s.async=1,s.src="//www.google-analytics.com/analytics.js",o.parentNode.insertBefore(s,o),ga("create","UA-89936570-1",{cookieDomain:"none"}),ga("send","event","AB Tasty - Manual Code","["+i+"]"+c,"["+i+"]["+r+"]"+l,{nonInteraction:!0})}),1e3);',
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 21,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !1,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "/choose-your-machine"
                        }, {
                            include: !1,
                            condition: 10,
                            value: "/checkout"
                        }],
                        testId: 899886,
                        qaUrlParameterEnabled: !1
                    },
                    campaignHash: "ffa49945deb65bd9356a844cd2248240",
                    id: 899886,
                    additionalType: "",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1121900: {
                            id: 1121900,
                            traffic: 0,
                            name: "Control"
                        },
                        1121901: {
                            id: 1121901,
                            traffic: 100,
                            name: "Variation 1"
                        }
                    }
                },
                941515: {
                    name: "Mobile Only Patch - Hide Live Chat Mobile",
                    traffic: 100,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 2,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !1,
                    m2eStartRange: 0,
                    segmentMode: "all",
                    triggerMode: "all",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/help/contact-us"
                        }],
                        testId: 941515,
                        qaUrlParameterEnabled: !1
                    },
                    audienceSegment: [{
                        name: "Mobile Only",
                        id: "873a574c-4ba7-48c7-a74c-6ec0b49cafec",
                        targeting_groups: [{
                            position: 0,
                            id: "b07ff789-0778-4b77-ba9a-27a1fa1c3546",
                            targetings: [{
                                id: "b0e617a4-9b31-490c-a766-65eb90fc120c",
                                operator: "auto",
                                position: 0,
                                conditions: [{
                                    id: "f7170149-4392-4d2e-9b64-3ae574dbc8e3",
                                    value: 1,
                                    is_segment_type: !0,
                                    include: !0
                                }],
                                targeting_type: 17
                            }]
                        }],
                        is_segment: !0
                    }],
                    campaignHash: "070b26d9660cc4d05aab71efefb8c0ae",
                    id: 941515,
                    additionalType: "patch",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1173343: {
                            id: 1173343,
                            traffic: 100,
                            name: "Variation 1"
                        }
                    }
                },
                1084028: {
                    name: "HC158: Sticky CTA on Mobile - Variation 1 - (personalization)",
                    traffic: 100,
                    type: "subsegment",
                    parentID: 1084029,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 19,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !1,
                    m2eStartRange: 0,
                    segmentMode: "all",
                    triggerMode: "all",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/uk/"
                        }],
                        selectorScope: [{
                            include: !0,
                            condition: 43,
                            value: "#product-detail-wrapper"
                        }, {
                            include: !0,
                            condition: 43,
                            value: "#pid"
                        }],
                        ipScope: [{
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1354565869"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "3232236002"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1738980273"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1452948614"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "532270655"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1991490833"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1442736996"
                        }],
                        favoriteUrlScope: [{
                            include: !1,
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !1,
                            favorite_url_id: "1c805233-cbea-43b6-a4be-d881381963cf"
                        }, {
                            include: !1,
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }],
                        favoriteUrlScopeConditions: [{
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/504228.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/504174.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/patisserie-chocolate-box.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/504220.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/orange-hot-chocolate-pack.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/504218.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/peanut-butter-sachets.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/vanilla-white-hot-chocolate-bag-large.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/358321.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/358320.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/chilli-hot-chocolate-pack.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/358324.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/peppermint-hot-chocolate.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/hot-chocolate-hazelnut-pack.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/white-vanilla-sachet-hot-chocolate.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/hot-chocolate-caramel-bag-large.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/504219.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/504226.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/dark-85-hot-chocolate-bag-large.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/ginger-hot-chocolate-pack.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/263313.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "https://www.hotelchocolat.com/uk/504227.html",
                            operator: "is",
                            favorite_url_id: "6444ce61-e69d-4ecc-a86f-29edc7720bd1"
                        }, {
                            include: !0,
                            url: "childrens-chocolate-workshops.html",
                            operator: "contain",
                            favorite_url_id: "1c805233-cbea-43b6-a4be-d881381963cf"
                        }, {
                            include: !0,
                            url: ".*velvetiser.*",
                            operator: "regex",
                            favorite_url_id: "1c805233-cbea-43b6-a4be-d881381963cf"
                        }, {
                            include: !0,
                            url: "bean-to-bar.html",
                            operator: "contain",
                            favorite_url_id: "1c805233-cbea-43b6-a4be-d881381963cf"
                        }, {
                            include: !0,
                            url: "corporate-events.html",
                            operator: "contain",
                            favorite_url_id: "1c805233-cbea-43b6-a4be-d881381963cf"
                        }, {
                            include: !0,
                            url: "secret-events.html",
                            operator: "contain",
                            favorite_url_id: "1c805233-cbea-43b6-a4be-d881381963cf"
                        }, {
                            include: !0,
                            url: "chocolate-tasting-adventure.html",
                            operator: "contain",
                            favorite_url_id: "1c805233-cbea-43b6-a4be-d881381963cf"
                        }, {
                            include: !0,
                            url: "gift-card",
                            operator: "contain",
                            favorite_url_id: "1c805233-cbea-43b6-a4be-d881381963cf"
                        }, {
                            include: !0,
                            url: "/uk/472809",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/472726",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/platinum-velvetiser.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/satin-black-velvetiser.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/472824.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/472725",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/velvetiser-hot-chocolate-machine.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/472824",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/satin-black-velvetiser.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/velvetiser-hot-chocolate-pack.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/472727",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/velvetiser-hot-chocolate-maker.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }],
                        testId: 1084028,
                        qaUrlParameterEnabled: !1
                    },
                    id: 1084028,
                    additionalType: "patch",
                    isAsync: !1,
                    variations: {
                        1344611: {
                            id: 1344611,
                            name: "Variation 1",
                            traffic: 100,
                            masterVariationId: 0,
                            modifications: [{
                                selector: "",
                                type: "customScriptNew",
                                oldValue: '!function(){"use strict";var t="HC-158",e="1";function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function c(t){var e=function(t){if("object"!==n(t)||null===t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var c=e.call(t,"string");if("object"!==n(c))return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===n(e)?e:String(e)}function o(t,e,n){return(e=c(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);e&&(c=c.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,c)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function a(e,n){function c(){return[e].flat().every((function(t){return function(t){return"string"==typeof t?!!document.querySelector(t):!0===t()}(t)}))}n=r(r({},{timeout:15,interval:10,intervalLimit:2e3,intervalMultiplier:1.1}),n);var o="".concat(t," - Poller conditions met"),i="".concat(t," - Poller conditions not met");return new Promise((function(t,e){if(c())return t(o);var r=(new Date).getTime(),a=n.interval;!function d(){var s,l,u,_;return((new Date).getTime()-r)/1e3<n.timeout?c()?t(o):(s=a,l=n.intervalMultiplier,u=n.intervalLimit,a=(_=s*l)<u?_:u,setTimeout(d,a)):e(i)}()}))}var d={methods:["ga4"],tracker:!1,tagId:!1,uaRef:"ga",send:function(n){var c=this;this.methods.includes("ga4")&&a((function(){return!!window.gtag})).then((function(){window.gtag("event","experimentation",{experiment_id:"".concat(t,"-").concat(e),experiment_label:n,send_to:c.tagId||"default"})})),this.methods.includes("datalayer")&&a((function(){return!!window.dataLayer})).then((function(){window.dataLayer.push({event_name:"experimentation",experiment_id:"".concat(t,"-").concat(e),experiment_label:n})})),this.methods.includes("ua")&&a((function(){return!!window[c.uaRef].getAll})).then((function(){var o=c.tracker||window[c.uaRef].getAll()[0].get("name");window[c.uaRef]("".concat(o,".send"),"event","experimentation","".concat(t,"-").concat(e),n,{nonInteraction:!0})}))}},s=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=Math.max(document.documentElement.clientHeight,window.innerHeight||0),c=t.getBoundingClientRect(),o=c.top,i=c.top+c.height;return e?o>=0&&i<n:i>=0&&o<=n};a(["body","#pdpMain","#main-header"]).then((function(){if($.fn.animate$=$.fn.animate,$.fn.animate=function(){return!1},!location.pathname.includes("velvetiser")&&!location.href.includes("/shop/")){var n;document.documentElement.classList.add(t,"".concat(t,"-").concat(e)),document.body.addEventListener("click",(function(e){var n=e.target;setTimeout((function(){var e=!!document.querySelector(".".concat(t,"__custom_click"));n.closest(".".concat(t,"__sticky_add_to_cart"))?d.send(\'User clicks "ADD TO BAG" quickline CTA\'):(n.closest(".HC129B-add.HC129B-buttonShow")&&!e||n.closest(".button-fancy-large.add-to-cart")&&!e||n.closest(".HC089-ageCheck")&&!e)&&d.send(\'User clicks "ADD TO BAG" standard CTA\')}),500)})),$.fn.animate$=$.fn.animate,document.querySelector("#add-to-cart").addEventListener("click",(function(){$.fn.animate=function(){return!1},setTimeout((function(){$.fn.animate=$.fn.animate$}),3e3)})),document.querySelector("#main-header").insertAdjacentHTML("afterend",\'\\n    <div class="\'.concat(c=t,"__sticky_add_to_cart ").concat(c,\'__atc_hide">add to bag</div>\\n    \'));var c,o=!1,i=document.querySelector("#mini-cart");i.classList.add("".concat(t,"__mini-cart")),"https://www.hotelchocolat.com/uk/cacao-gin.html"===location.href?(n=document.querySelector(".HC089-ageCheck"))&&s(n)?document.querySelector(".".concat(t,"__sticky_add_to_cart")).style="display: none":(document.querySelector(".".concat(t,"__sticky_add_to_cart")).style="display: block",!o&&d.send("Conditions met"),o=!0):(n=document.querySelector("#add-to-cart"))&&s(n)?document.querySelector(".".concat(t,"__sticky_add_to_cart")).style="display: none":(document.querySelector(".".concat(t,"__sticky_add_to_cart")).style="display: block",!o&&d.send("Conditions met"),o=!0),document.addEventListener("scroll",(function(){n="https://www.hotelchocolat.com/uk/cacao-gin.html"===location.href?document.querySelector(".HC089-ageCheck"):document.querySelector("#add-to-cart"),s(n)?document.querySelector(".".concat(t,"__sticky_add_to_cart")).style="display: none":(document.querySelector(".".concat(t,"__sticky_add_to_cart")).style="display: block",!o&&d.send("conditions met"),o=!0)})),document.querySelector(".".concat(t,"__sticky_add_to_cart")).addEventListener("click",(function(){var e;document.querySelector(".HC161-1"),(n="https://www.hotelchocolat.com/uk/cacao-gin.html"===location.href?document.querySelector(".HC089-ageCheck"):document.querySelector("#add-to-cart")).classList.add("".concat(t,"__custom_click")),n.click(),$.fn.animate=function(){return!1},n.classList.add("".concat(t,"__custom_design")),n.innerHTML=\'<div class="\'.concat(t,\'__add_in_progress">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class="loader_container">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class="loader"></div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\t\\t\\t\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div>adding to bag</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\'),document.querySelector(".".concat(t,"__sticky_add_to_cart")).classList.add("".concat(t,"__btn_white")),document.querySelector(".".concat(t,"__sticky_add_to_cart")).innerHTML=function(t){return\'\\n    <div class="\'.concat(t,"__sticky_add_in_progress_container ").concat(t,\'__atc_hide">\\n        <div class="\').concat(t,\'__sticky_add_in_progress">\\n            <div class="loader_container">\\n                <div class="loader"></div>\\n            </div>\\n         \\n            <div>adding to bag</div></div>\\n        </div>\\n     </div>\\n    \')}(t),null===(e=document.querySelectorAll("#navigation .drop-down-options")[4].classList)||void 0===e||e.add("drop_down_off"),a([".HC-158__mini-cart.hover"]).then((function(){document.querySelector(".".concat(t,"__sticky_add_to_cart")).innerHTML=function(t){return\'\\n    <div class="\'.concat(t,"__sticky_added_container ").concat(t,\'__atc_hide">\\n        <div class="\').concat(t,\'__sticky_added">\').concat(\'<svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14" fill="none">\\n<path d="M1 8.5L5 12.5L16 1.5" stroke="black" stroke-width="2"/>\\n</svg>\'," added</div>\\n    </div>\\n    ")}(t),n.innerHTML=\'<div class="\'.concat(t,\'__added"> \').concat(\'<svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14" fill="none">\\n<path d="M1 8.5L5 12.5L16 1.5" stroke="black" stroke-width="2"/>\\n</svg>\'," Added</div>"),setTimeout((function(){var e;document.querySelector(".HC161-1"),document.querySelector(".".concat(t,"__sticky_add_to_cart")).classList.remove("".concat(t,"__btn_white")),document.querySelector(".".concat(t,"__sticky_add_to_cart")).innerHTML="add to bag",null===(e=n.classList)||void 0===e||e.remove("".concat(t,"__custom_design")),n.innerHTML="<div>add to bag</div>"}),2e3),new MutationObserver((function(e,c){e.forEach((function(){var e,o;document.querySelector("#mini-cart").classList.contains("hover")||(null===(e=n.classList)||void 0===e||e.remove("".concat(t,"__custom_click")),null===(o=document.querySelectorAll("#navigation .drop-down-options")[4].classList)||void 0===o||o.remove("drop_down_off"),$.fn.animate=$.fn.animate$,c.disconnect())}))})).observe(i,{attributes:!0,childList:!0,subtree:!1})}))}))}}),console.error)}();'
                            }, {
                                id: 4620419,
                                selector: "",
                                type: "addCSS",
                                value: "/* HotelChocolat | HC-158 | 1 */\r\n.HC-158-2 .HC146-overlay,.HC-158-2 .drop_down_off{display:none!important}.HC-158 .HC-158__btn_white{background-color:#fff!important;border:2px solid #000!important;color:#000!important;width:-webkit-fill-available!important}.HC-158 .HC-158__sticky_add_to_cart{background-color:#000;bottom:0;color:#fff;font-size:15px;font-weight:500;padding:15px 0;position:fixed;text-align:center;text-transform:uppercase;width:100%;z-index:999}.HC-158 .HC-158__sticky_add_to_cart .HC-158__sticky_add_in_progress_container .HC-158__sticky_add_in_progress{-webkit-box-pack:center;-moz-box-pack:center;-ms-flex-pack:center;-webkit-box-align:center;-moz-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-justify-content:center;justify-content:center}.HC-158 .HC-158__sticky_add_to_cart .HC-158__sticky_add_in_progress_container .HC-158__sticky_add_in_progress .loader_container{margin-right:15px}.HC-158 .HC-158__sticky_add_to_cart .HC-158__sticky_add_in_progress_container .HC-158__sticky_add_in_progress .loader_container .loader{-webkit-animation:spin 2s linear infinite;-moz-animation:spin 2s linear infinite;animation:spin 2s linear infinite;border:2px solid #000;border-left-color:#f3f3f3;border-radius:50%;height:18px;position:static;width:18px}@-moz-keyframes spin{0%{-moz-transform:rotate(0deg);transform:rotate(0deg)}to{-moz-transform:rotate(1turn);transform:rotate(1turn)}}.HC-158 .HC-158__sticky_add_to_cart .HC-158__sticky_added_container .HC-158__sticky_added{-webkit-box-pack:center;-moz-box-pack:center;-ms-flex-pack:center;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-justify-content:center;justify-content:center}.HC-158 .HC-158__sticky_add_to_cart .HC-158__sticky_added_container .HC-158__sticky_added svg{margin-right:15px}.HC-158 .HC-158__add_in_progress{-webkit-box-pack:center;-moz-box-pack:center;-ms-flex-pack:center;-webkit-box-align:center;-moz-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-justify-content:center;justify-content:center}.HC-158 .HC-158__add_in_progress.hover{color:#f3f3f3}.HC-158 .HC-158__add_in_progress .loader_container{margin-right:15px}.HC-158 .HC-158__add_in_progress .loader_container .loader{-webkit-animation:spin 2s linear infinite;-moz-animation:spin 2s linear infinite;animation:spin 2s linear infinite;border:2px solid #000;border-left-color:#f3f3f3;border-radius:50%;height:18px;position:static;width:18px}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(1turn)}}@keyframes spin{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);-moz-transform:rotate(1turn);-o-transform:rotate(1turn);transform:rotate(1turn)}}"
                            }]
                        }
                    }
                },
                1084029: {
                    id: 1084029,
                    name: "HC158: Sticky CTA on Mobile (100%)",
                    type: "mastersegment",
                    sub_type: "sp",
                    parentID: 0,
                    priority: 0,
                    children: [1084028],
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !1,
                    m2eStartRange: 0,
                    variations: {
                        1344612: {
                            id: 1344612,
                            name: "Variation 1"
                        }
                    }
                },
                1126844: {
                    name: "HC160: Add to Bag Animation on Desktop - Variation 1 - (personalization)",
                    traffic: 100,
                    type: "subsegment",
                    parentID: 1126845,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 14,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !1,
                    m2eStartRange: 0,
                    segmentMode: "all",
                    triggerMode: "all",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/uk/"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://staging.hotelchocolat.com/uk"
                        }],
                        selectorScope: [{
                            include: !0,
                            condition: 43,
                            value: "#product-detail-wrapper"
                        }],
                        ipScope: [{
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1738980273"
                        }],
                        favoriteUrlScope: [{
                            include: !1,
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }],
                        favoriteUrlScopeConditions: [{
                            include: !0,
                            url: "/uk/472809",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/472726",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/platinum-velvetiser.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/satin-black-velvetiser.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/472824.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/472725",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/velvetiser-hot-chocolate-machine.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/472824",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/satin-black-velvetiser.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/velvetiser-hot-chocolate-pack.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/472727",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/velvetiser-hot-chocolate-maker.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }],
                        testId: 1126844,
                        qaUrlParameterEnabled: !1
                    },
                    audienceTrigger: [{
                        name: "Is PDP & In Stock",
                        id: "3620609d-9aa1-4bbb-8333-723a74647df2",
                        targeting_groups: [{
                            position: 0,
                            id: "b22f43e3-730a-4130-85e0-c05162b7c508",
                            targetings: [{
                                checkMode: "loading",
                                id: "cc72063f-3864-4eda-9c85-39d589f30870",
                                operator: "and",
                                position: 0,
                                conditions: [{
                                    id: "38f7eefa-3d60-4777-aeb6-76cdc6e35b98",
                                    datalayer_key: "product_stock_status",
                                    condition: 1,
                                    value: ["IN_STOCK"]
                                }, {
                                    id: "ec7f372f-c9d8-48fa-b0ef-902f9b0e8efd",
                                    datalayer_key: "pdp_product_type",
                                    condition: 11,
                                    value: ["Standard|Subscription"]
                                }],
                                targeting_type: 44
                            }]
                        }],
                        is_segment: !1
                    }],
                    audienceSegment: [{
                        name: "Desktop Visitors",
                        id: "265aa396-af84-4d94-a303-ecabc56ce45b",
                        targeting_groups: [{
                            position: 0,
                            id: "a37e8ff6-3ee5-48f3-8d60-5f179aa3aff8",
                            targetings: [{
                                id: "4d18614e-af52-4796-921f-f3ca46b5ab56",
                                operator: "auto",
                                position: 0,
                                conditions: [{
                                    id: "93baf37b-2cc4-493c-a0d4-2fbe613cbeb9",
                                    value: 3,
                                    is_segment_type: !0,
                                    include: !0
                                }],
                                targeting_type: 17
                            }]
                        }],
                        is_segment: !0
                    }],
                    id: 1126844,
                    additionalType: "",
                    isAsync: !1,
                    variations: {
                        1396128: {
                            id: 1396128,
                            name: "Variation 1",
                            traffic: 100,
                            masterVariationId: 1396129,
                            modifications: [{
                                selector: "",
                                type: "customScriptNew",
                                oldValue: '!function(){"use strict";var t="HC-160",e="1";function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(t){var e=function(t){if("object"!==n(t)||null===t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var o=e.call(t,"string");if("object"!==n(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===n(e)?e:String(e)}function c(t,e,n){return(e=o(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){c(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function r(e,n){function o(){return[e].flat().every((function(t){return function(t){return"string"==typeof t?!!document.querySelector(t):!0===t()}(t)}))}n=i(i({},{timeout:15,interval:10,intervalLimit:2e3,intervalMultiplier:1.1}),n);var c="".concat(t," - Poller conditions met"),a="".concat(t," - Poller conditions not met");return new Promise((function(t,e){if(o())return t(c);var i=(new Date).getTime(),r=n.interval;!function d(){var s,u,l,m;return((new Date).getTime()-i)/1e3<n.timeout?o()?t(c):(s=r,u=n.intervalMultiplier,l=n.intervalLimit,r=(m=s*u)<l?m:l,setTimeout(d,r)):e(a)}()}))}var d={methods:["datalayer"],tracker:!1,tagId:!1,uaRef:"ga",send:function(n){var o=this;this.methods.includes("ga4")&&r((function(){return"complete"===document.readyState})).then((function(){void 0!==window.gtag?window.gtag("event","experimentation",{experiment_id:"".concat(t,"-").concat(e),experiment_label:n,send_to:o.tagId||"default"}):(window.dataLayer=window.dataLayer||[],void 0===window.customGtag&&(window.customGtag=function(){window.dataLayer.push(arguments)},window.customGtag("js",new Date),window.customGtag("config",o.tagId||"default")),window.customGtag("event","experimentation",{experiment_id:"".concat(t,"-").concat(e),experiment_label:n,send_to:o.tagId||"default"}))})),this.methods.includes("datalayer")&&r((function(){return!!window.dataLayer})).then((function(){window.dataLayer.push({event:"experimentation",experiment_id:"".concat(t,"-").concat(e),experiment_label:n})})),this.methods.includes("ua")&&r((function(){return!!window[o.uaRef].getAll})).then((function(){var c=o.tracker||window[o.uaRef].getAll()[0].get("name");window[o.uaRef]("".concat(c,".send"),"event","experimentation","".concat(t,"-").concat(e),n,{nonInteraction:!0})}))}},s=\'<svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14" fill="none">\\n<path d="M1 8.5L5 12.5L16 1.5" stroke="black" stroke-width="2"/>\\n</svg>\';r(["body"]).then((function(){if($.fn.animate$=$.fn.animate,$.fn.animate=function(){return!1},!location.pathname.includes("velvetiser")){document.documentElement.classList.add(t,"".concat(t,"-").concat(e)),d.send("Conditions met"),document.body.addEventListener("click",(function(t){var e=t.target;(e.closest(".button-fancy-large.add-to-cart")||e.closest(".HC089-ageCheck"))&&d.send(\'User clicks "ADD TO BAG" standard CTA\')}));var n=document.querySelector("#mini-cart");n.classList.add("".concat(t,"__mini-cart")),location.href.includes("/shop/")?document.body.addEventListener("click",(function(e){var n,o=e.target;o.closest("#add-to-cart")&&(null===(n=document.querySelectorAll("#navigation .drop-down-options")[4].classList)||void 0===n||n.add("".concat(t,"__drop_down_off")),o.classList.add("".concat(t,"__custom_add_to_cart")),o.classList.add("".concat(t,"__custom_design")),o.innerHTML=\'<div class="\'.concat(t,\'__add_in_progress">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class="loader_container">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class="loader"></div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\t\\t\\t\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div>adding to bag</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\'),setTimeout((function(){o.innerHTML=\'<div class="\'.concat(t,\'__added"> \').concat(s," Added</div>")}),500),setTimeout((function(){var e,n;null===(e=o.classList)||void 0===e||e.remove("".concat(t,"__custom_design")),null===(n=o.classList)||void 0===n||n.remove("".concat(t,"__custom_add_to_cart")),o.innerHTML="<div>add to basket</div>"}),1e3),setTimeout((function(){var e;null===(e=document.querySelectorAll("#navigation .drop-down-options")[4].classList)||void 0===e||e.remove("".concat(t,"__drop_down_off"))}),7e3))})):"https://www.hotelchocolat.com/uk/cacao-gin.html"===location.href?(document.querySelector(".HC089-ageCheck").classList.add("".concat(t,"__custom_add_to_cart")),document.querySelector(".HC089-ageCheck").addEventListener("click",(function(){var e;$.fn.animate=function(){return!1},null===(e=document.querySelectorAll("#navigation .drop-down-options")[4].classList)||void 0===e||e.add("".concat(t,"__drop_down_off")),document.querySelector(".HC089-ageCheck").classList.add("".concat(t,"__custom_design")),document.querySelector(".HC089-ageCheck").innerHTML=\'<div class="\'.concat(t,\'__add_in_progress">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class="loader_container">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class="loader"></div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\t\\t\\t\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div>adding to bag</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\'),r([".".concat(t,"__mini-cart.hover")]).then((function(){document.querySelector(".HC089-ageCheck").innerHTML=\'<div class="\'.concat(t,\'__added"> \').concat(s," Added</div>"),new MutationObserver((function(e,n){e.forEach((function(){var e,o;document.querySelector("#mini-cart").classList.contains("hover")||(null===(e=document.querySelector(".HC089-ageCheck").classList)||void 0===e||e.remove("".concat(t,"__custom_design")),document.querySelector(".HC089-ageCheck").innerHTML="add to bag",null===(o=document.querySelectorAll("#navigation .drop-down-options")[4].classList)||void 0===o||o.remove("".concat(t,"__drop_down_off")),n.disconnect())}))})).observe(n,{attributes:!0,childList:!0,subtree:!1})}))}))):document.body.addEventListener("click",(function(e){var o,c=e.target;$.fn.animate=function(){return!1},null===(o=document.querySelectorAll("#navigation .drop-down-options")[4].classList)||void 0===o||o.add("".concat(t,"__drop_down_off")),c.closest("#add-to-cart")&&(document.querySelector("#add-to-cart").classList.add("".concat(t,"__custom_add_to_cart")),document.querySelector("#add-to-cart").classList.add("".concat(t,"__custom_design")),document.querySelector("#add-to-cart").innerHTML=\'<div class="\'.concat(t,\'__add_in_progress">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class="loader_container">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class="loader"></div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\t\\t\\t\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div>adding to bag</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\'),r([".".concat(t,"__mini-cart.hover")]).then((function(){document.querySelector("#add-to-cart").innerHTML=\'<div class="\'.concat(t,\'__added"> \').concat(s," Added</div>"),new MutationObserver((function(e,n){e.forEach((function(){var e,o,c;document.querySelector("#mini-cart").classList.contains("hover")||(null===(e=document.querySelector("#add-to-cart").classList)||void 0===e||e.remove("".concat(t,"__custom_design")),null===(o=document.querySelector("#add-to-cart").classList)||void 0===o||o.remove("".concat(t,"__custom_add_to_cart")),document.querySelector("#add-to-cart").innerHTML="add to bag",null===(c=document.querySelectorAll("#navigation .drop-down-options")[4].classList)||void 0===c||c.remove("".concat(t,"__drop_down_off")),n.disconnect())}))})).observe(n,{attributes:!0,childList:!0,subtree:!1})})))}))}}),console.error)}();'
                            }, {
                                id: 4755486,
                                selector: "",
                                type: "addCSS",
                                value: "/* HotelChocolat | HC-160 | 1 */\r\n.HC-160-2 .HC-160__drop_down_off{display:none!important}.HC-160 .HC-160__custom_design{background:#f3f3f3!important;color:#000!important}.HC-160 .HC-160__custom_design.hover{color:#f3f3f3}.HC-160 .HC-160__add_in_progress{-webkit-box-pack:center;-moz-box-pack:center;-ms-flex-pack:center;-webkit-box-align:center;-moz-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-justify-content:center;justify-content:center}.HC-160 .HC-160__add_in_progress.hover{color:#f3f3f3}.HC-160 .HC-160__add_in_progress .loader_container{margin-right:15px}.HC-160 .HC-160__add_in_progress .loader_container .loader{-webkit-animation:spin 2s linear infinite;-moz-animation:spin 2s linear infinite;animation:spin 2s linear infinite;border:2px solid #000;border-left-color:#f3f3f3;border-radius:50%;height:18px;position:static;width:18px}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(1turn)}}@-moz-keyframes spin{0%{-moz-transform:rotate(0deg);transform:rotate(0deg)}to{-moz-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes spin{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);-moz-transform:rotate(1turn);-o-transform:rotate(1turn);transform:rotate(1turn)}}"
                            }]
                        }
                    }
                },
                1126845: {
                    id: 1126845,
                    name: "HC160: Add to Bag Animation on Desktop (100%)",
                    type: "mastersegment",
                    sub_type: "sp",
                    parentID: 0,
                    priority: 0,
                    children: [1126844],
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !1,
                    m2eStartRange: 0,
                    variations: {
                        1396129: {
                            id: 1396129,
                            name: "Variation 1"
                        }
                    }
                },
                1164511: {
                    name: "HOT-666 | Affordable Payment Options Messaging - Variation 1 - (personalization)",
                    traffic: 100,
                    type: "subsegment",
                    parentID: 1164512,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 16,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !1,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/uk/"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://staging.hotelchocolat.com/uk/"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-maker.html"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-machine.html"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-pack.html"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/472727.html"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/472726.html"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/472821.html"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/pod-cups-duo.html"
                        }],
                        selectorScope: [{
                            include: !0,
                            condition: 44,
                            value: ".pt_product-details"
                        }],
                        testId: 1164511,
                        qaUrlParameterEnabled: !1
                    },
                    id: 1164511,
                    additionalType: "patch",
                    isAsync: !1,
                    variations: {
                        1444252: {
                            id: 1444252,
                            name: "Variation 1",
                            traffic: 100,
                            masterVariationId: 1444253,
                            modifications: [{
                                id: 4887511,
                                selector: null,
                                type: "addCSS",
                                value: ".HOT-666 #klarna-placement-cart{display:none}.HOT-666 .HOT-666-ways-to-pay-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;border:1px solid #c8c8c8;height:34px;cursor:pointer}.HOT-666 .HOT-666-ways-to-pay-container img{height:20px}@media screen and (min-width:768px) and (max-width:959px){.HOT-666 .HOT-666-ways-to-pay-container .HOT-666-more-ways{max-width:120px}}.HOT-666 .HOT-666-ways-to-pay-container .HOT-666-ways-to-pay{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:5px;color:#000;font-family:GillSansNova-Medium;font-size:.75rem;font-style:normal;font-weight:600;line-height:.75rem}.HOT-666 .HOT-666-ways-to-pay-container .HOT-666-ways-to-pay p.HOT-666-learn-more,.HOT-666 .HOT-666-ways-to-pay-container .HOT-666-ways-to-pay p.HOT-666-more-ways{font-size:.85rem;line-height:.85rem}.HOT-666 .HOT-666-ways-to-pay-container .HOT-666-ways-to-pay .HOT-666-learn-more{color:#000;font-family:GillSansNova-Light;font-size:.75rem;font-style:normal;font-weight:600;line-height:.75rem;-webkit-text-decoration-line:underline;text-decoration-line:underline}.HOT-666 .HOT-666-ways-to-pay-container .HOT-666-ways-to-pay-terms p{color:#a0a0a0;font-family:GillSansNova-Light;font-size:11px;font-style:normal;font-weight:400;line-height:normal}.HOT-666 .HOT-666-ways-to-pay-slide{position:fixed;top:0;height:100%;background-color:#fff;color:#fff;padding:42px 65px;-webkit-box-shadow:0 0 10px rgba(0,0,0,.5);box-shadow:0 0 10px rgba(0,0,0,.5);-webkit-transition:right .3s ease-in-out;transition:right .3s ease-in-out;z-index:100000000000000;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}@media screen and (min-width:768px){.HOT-666 .HOT-666-ways-to-pay-slide{right:-640px;width:510px}}@media screen and (max-width:767px){.HOT-666 .HOT-666-ways-to-pay-slide{width:300px;padding:42px 30px 42px 30px;right:-550px}}.HOT-666 .HOT-666-ways-to-pay-slide-close{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;margin-bottom:30px;cursor:pointer}.HOT-666 .HOT-666-ways-to-pay-slide-close p{margin:0}.HOT-666 .HOT-666-ways-to-pay-slide-content{overflow-y:auto;height:85%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;gap:15px}@media screen and (max-width:767px){.HOT-666 .HOT-666-ways-to-pay-slide-content{gap:15px;height:80%}}.HOT-666 .HOT-666-ways-to-pay-slide-content .HOT-666-following-options{max-width:400px}.HOT-666 .HOT-666-ways-to-pay-slide h2{color:#000;font-size:26px;font-style:normal;font-weight:600;line-height:26px;max-width:440px}.HOT-666 .HOT-666-ways-to-pay-slide .HOT-666-payment-options{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}@media screen and (max-width:767px){.HOT-666 .HOT-666-ways-to-pay-slide .HOT-666-payment-options{-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-wrap:wrap;flex-wrap:wrap;gap:10px}.HOT-666 .HOT-666-ways-to-pay-slide .HOT-666-payment-options img{min-height:20px}}.HOT-666 .HOT-666-ways-to-pay-slide h3{color:#000;font-family:GillSansNova-Medium;font-size:18px;font-style:normal;font-weight:600;line-height:18px}.HOT-666 .HOT-666-ways-to-pay-slide li,.HOT-666 .HOT-666-ways-to-pay-slide p{color:#000;font-family:GillSansNova-Light;font-size:16px;font-style:normal;font-weight:400;line-height:16px;max-width:440px}.HOT-666 .HOT-666-ways-to-pay-slide li{margin-bottom:20px}.HOT-666 .HOT-666-ways-to-pay-slide .HOT-666-continue-shopping{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:99%;min-height:50px;background-color:#fff;border:1px solid #000;color:#000;font-family:GillSansNova-Medium;font-style:normal;font-weight:600;text-align:center;text-transform:uppercase;cursor:pointer;margin-top:auto}.HOT-666 .HOT-666-ways-to-pay-slide .HOT-666-continue-shopping p{margin:0;font-family:GillSansNova-Medium;font-size:15px;line-height:15px}.HOT-666 .HOT-666-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);z-index:5}"
                            }, {
                                selector: "",
                                type: "customScriptNew",
                                oldValue: '!function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n="object"==t(e)&&e&&e.Object===Object&&e,a="object"==("undefined"==typeof self?"undefined":t(self))&&self&&self.Object===Object&&self,o=(n||a||Function("return this")()).Symbol,i=(o&&o.toStringTag,o&&o.toStringTag,Date.now||function(){return(new Date).getTime()}),c=function(e,n,a){var o={wait:50,multiplier:1.1,timeout:0};a&&(o=function e(n,a){var o=n;return Object.keys(a).forEach((function(n){var i=a[n],c=o[n],r=c&&"object"===t(c)&&!(c instanceof Array);o[n]=r?e(c,i):i})),o}(o,a));for(var c=o,r=c.multiplier,s=c.wait,l=o.timeout?new Date(i()+o.timeout):null,d=[],u=function a(o,c,s){if(l&&l&&i()>l)return!1;var u=function(e){if(!e)return!1;var n={function:function(){return e()},string:function(){return document.querySelector(e)}}[t(e)];return!n||n()}(o);u?(d.push(u),d.length===e.length&&n(d)):setTimeout((function(){a(o,c*r)}),s?0:c)},p=0;p<e.length;p+=1){if("string"!=typeof e[p]&&"function"!=typeof e[p])throw"Every item in the poller array should be a function or a string";u(e[p],s,!0)}},r={trackerName:!1,propertyId:!1,analyticsReference:"ga",eventCache:[],sendEvents:!0,setDefaultCategory:function(t){return this.category=t,this},setDefaultAction:function(t){return this.action=t,this},setPropertyId:function(t){this.propertyId=t},setTrackerName:function(t){this.trackerName=t},useLegacyTracker:function(){this.analyticsReference="_gaq"},sendAuto:function(t,e,n){this.send(null,null,e,n,t)},sendNormalised:function(t,e){this.send(null,null,t,e)},send:function(e,n,a,o){var i=this,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,l=o||{},d=a,u=e||this.category,p=n||this.action,f=r;if(null!=f&&(0==f&&(f="Control"),d="Variation: "+f+" - "+a),"object"===t(l)&&l.sendOnce){var y="".concat(u).concat(p).concat(d);if(this.eventCache.indexOf(y)>-1)return!1;this.eventCache.push(y)}s(d);var g=this,m=function(t){if("_gaq"===g.analyticsReference)window._gaq.push(["_trackEvent",u,p,d,null,void 0===l.nonInteraction||l.nonInteraction]);else{var e={nonInteraction:!l.nonInteraction||l.nonInteraction};if(l.opts)for(var n in l.opts)e[n]=l.opts[n];window[g.analyticsReference]("".concat(t,".send"),"event",u,p,d,e)}};g.trackerName?1==this.sendEvents&&m(g.trackerName):c([function(){try{var t=window[g.analyticsReference].getAll();if(t&&t.length){if(!g.propertyId)return g.trackerName=t[0].get("name"),!0;for(var e=0;e<t.length;e+=1){var n=t[e];if(n.get("trackingId")===g.propertyId)return g.trackerName=n.get("name"),!0}}}catch(t){}}],(function(){1==i.sendEvents&&m(g.trackerName)}),{wait:150})}},s=function(t){localStorage.getItem("ucdebug")&&window.console&&"function"==typeof window.console.log&&console.log(t)},l="HOT-666",d=l,u="1",p=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="Test ID: HOT-666 Variation: 1 Label: "+t;0==f.initiate?r.sendNormalised(n,{sendOnce:e}):f.send(t)},f={initiate:!1,methods:["ga4"],tracker:!1,property:!1,uaRef:"ga",send:function(t){var e=this;this.methods.includes("ga4")&&c([function(){return"complete"===document.readyState}],(function(){void 0!==window.gtag?window.gtag("event","experimentation",{experiment_id:"".concat(d,"-").concat(u),experiment_label:t,send_to:e.property||"default"}):(window.dataLayer=window.dataLayer||[],void 0===window.customGtag&&(window.customGtag=function(){window.dataLayer.push(arguments)},window.customGtag("js",new Date),window.customGtag("config",e.property||"default")),window.customGtag("event","experimentation",{experiment_id:"".concat(d,"-").concat(u),experiment_label:t,send_to:e.property||"default"}))})),this.methods.includes("datalayer")&&c([function(){return!!window.dataLayer}],(function(){window.dataLayer.push({event:"experimentation",experiment_id:"".concat(d,"-").concat(u),experiment_label:t})})),this.methods.includes("ua")&&c([function(){return!!window[e.uaRef]}],(function(){var n=e.tracker||window[e.uaRef].getAll()[0].get("name");window[e.uaRef]("".concat(n,".send"),"event","experimentation","".concat(d,"-").concat(u),t,{nonInteraction:!0})}))}},y=l;/MSIE|Trident|Edge\\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent)||c(["body"],(function(){var t;f.initiate=!0,f.method=["ga4"],f.property="G-B37NQR1RWZ",t=l,r.setDefaultCategory("Experimentation"),r.setDefaultAction("HotelChocolat - "+t),r.sendEvents=!0,document.documentElement.classList.add(t),document.documentElement.classList.add("".concat(t,"-").concat("1")),s(y+" Variation: 1"),p("Conditions Met"),c([".pt_product-details #product-detail-wrapper #add-to-cart"],(function(){console.log("Product details page loaded");var t=\'\\n      <div class="\'.concat(y,\'-ways-to-pay-container">\\n        <div class="\').concat(y,\'-ways-to-pay">\\n          <img src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/group.svg" alt="Card">\\n          <p class="\').concat(y,\'-more-ways">Multiple payment options available.</p>\\n          <p class="\').concat(y,\'-learn-more">Learn More</p>\\n        </div>\\n      </div>\');document.querySelector(".pt_product-details #product-detail-wrapper #add-to-cart").insertAdjacentHTML("afterend",t);var e=\'\\n        <div class="\'.concat(y,\'-ways-to-pay-slide">\\n          <div class="\').concat(y,\'-ways-to-pay-slide-close">\\n            \').concat(\'\\n<svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">\\n  <path d="M15.8143 16.6357L9 10.2L2.18574 16.6357C1.9286 16.8786 1.67144 17 1.28573 17C0.5143 17 1.57005e-05 16.5143 1.57005e-05 15.7857C1.57005e-05 15.4214 0.128571 15.1786 0.385714 14.9357L7.20001 8.5L0.385714 2.06429C-0.128571 1.57857 -0.128571 0.85 0.385714 0.364286C0.899998 -0.121429 1.67146 -0.121429 2.18574 0.364286L9 6.8L15.8143 0.364286C16.3285 -0.121429 17.1 -0.121429 17.6143 0.364286C18.1286 0.85 18.1286 1.57857 17.6143 2.06429L10.8 8.5L17.6143 14.9357C18.1286 15.4214 18.1286 16.15 17.6143 16.6357C17.1 17.1214 16.3285 17.1214 15.8143 16.6357Z" fill="black"/>\\n</svg>\',\'\\n          </div>\\n          <div class="\').concat(y,\'-ways-to-pay-slide-content">\\n            <h2>There\\\'s more than one way to pay</h2>\\n            <div class="\').concat(y,\'-payment-options">\\n              <img src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/klarna_updated.svg" alt="Klarna">\\n              <img src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/paypal_updatedsvg.svg" alt="PayPal">\\n              <img src="https://blcro.fra1.digitaloceanspaces.com/HOT-666/Visa_updatedSVG.svg" alt="Visa">\\n              <img src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/mastercard_updatedsvg.svg" alt="Mastercard">\\n              <img src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/mastercard_updatedsvg.svg" alt="Maestro">\\n              <img src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/ae_updatedsvg.svg" alt="American Express">\\n              <img src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/amazonpay.svg" alt="Amazon Pay">\\n              <img src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/paypal_updatedsvg.svg" alt="Apple Pay">\\n              <img src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/giftcardsvg.svg" alt="HotelChocolat Gift Card">\\n            </div>\\n            <p class="\').concat(y,\'-following-options">For online orders, you can pay by the following payment options:</p>\\n            <ul>\\n              <li>Visa, Mastercard, Maestro, American Express</li>\\n              <li>Klarna</li>\\n              <li>PayPal</li>\\n              <li>Apple Pay</li>\\n              <li>Amazon Pay</li>\\n            </ul>\\n            <p>For orders over the telephone, you can pay by Visa, Mastercard, Maestro and American Express.</p>\\n            <div class="\').concat(y,\'-continue-shopping">\\n              <p>Continue Shopping</p>\\n            </div>\\n          </div>\\n        </div>\'),n=\'<div class="\'.concat(y,\'-overlay"></div>\'),a=document.querySelector("body");a.insertAdjacentHTML("afterbegin",e),a.insertAdjacentHTML("afterbegin",n);var o=document.querySelector(".".concat(y,"-ways-to-pay-slide")),i=document.querySelector(".".concat(y,"-ways-to-pay-container")),c=document.querySelector(".".concat(y,"-ways-to-pay-slide-close")),r=document.querySelector(".".concat(y,"-overlay")),s=document.querySelector(".".concat(y,"-continue-shopping")),l=window.innerWidth;i.addEventListener("click",(function(){p("Click - User clicks “Learn more” CTA");var t="0px"===o.style.right;o.style.right=l<678?t?"-550px":"0px":t?"-640px":"0px",r.style.display=t?"none":"block"})),c.addEventListener("click",(function(){p("Click - User clicks close CTA in slide out"),o.style.right=l<678?"-550px":"-640px",r.style.display="none"})),s.addEventListener("click",(function(){p("Click - User clicks “Continue Shopping” CTA in slide out"),o.style.right=l<678?"-550px":"-640px",r.style.display="none"}))}))}))}();'
                            }]
                        }
                    }
                },
                1164512: {
                    id: 1164512,
                    name: "HOT-666 | Affordable Payment Options Messaging (100%)",
                    type: "mastersegment",
                    sub_type: "sp",
                    parentID: 0,
                    priority: 0,
                    children: [1164511],
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !1,
                    m2eStartRange: 0,
                    variations: {
                        1444253: {
                            id: 1444253,
                            name: "Variation 1"
                        }
                    }
                },
                1200503: {
                    name: "HOT-672 - Add to Bag on PLP - Variation 1 - (personalization)",
                    traffic: 100,
                    type: "subsegment",
                    parentID: 1200504,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 13,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !1,
                    m2eStartRange: 0,
                    segmentMode: "all",
                    triggerMode: "all",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/uk/shop/"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/search"
                        }],
                        selectorScope: [{
                            include: !0,
                            condition: 44,
                            value: ".pt_product-search-result"
                        }],
                        testId: 1200503,
                        qaUrlParameterEnabled: !1
                    },
                    audienceSegment: [{
                        name: "Desktop Visitors",
                        id: "265aa396-af84-4d94-a303-ecabc56ce45b",
                        targeting_groups: [{
                            position: 0,
                            id: "a37e8ff6-3ee5-48f3-8d60-5f179aa3aff8",
                            targetings: [{
                                id: "4d18614e-af52-4796-921f-f3ca46b5ab56",
                                operator: "auto",
                                position: 0,
                                conditions: [{
                                    id: "93baf37b-2cc4-493c-a0d4-2fbe613cbeb9",
                                    value: 3,
                                    is_segment_type: !0,
                                    include: !0
                                }],
                                targeting_type: 17
                            }]
                        }],
                        is_segment: !0
                    }],
                    id: 1200503,
                    additionalType: "patch",
                    isAsync: !1,
                    variations: {
                        1487819: {
                            id: 1487819,
                            name: "Variation 1",
                            traffic: 100,
                            masterVariationId: 1487820,
                            modifications: [{
                                id: 4999028,
                                selector: null,
                                type: "addCSS",
                                value: ".HOT-672 .HOT-672-quick-add-holder{position:relative}.HOT-672 .HOT-672-quick-add{position:absolute;top:0;right:0;cursor:pointer;background:0 0;border:none}.HOT-672 .HOT-672-quick-add-enabled .quickviewbutton{display:none!important}.HOT-672 .HOT-672-newitem-visible{position:relative;overflow:visible}.HOT-672 .HOT-672-newitem{position:absolute;top:50%;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);background:#fff;padding:10px 25px 10px 15px;-webkit-box-shadow:4px 5px 15px -5px rgba(0,0,0,.75);box-shadow:4px 5px 15px -5px rgba(0,0,0,.75);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;z-index:10}.HOT-672 .HOT-672-newitem.HOT-672-stuck{position:fixed;top:40px;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.HOT-672 .HOT-672-newitem svg{width:26px;margin-right:10px}.HOT-672 .HOT-672-newitem p{text-transform:initial;font-size:14px}.HOT-672 .HOT-672-newitem--close{font-size:9px;background:0 0;border:none;color:#000;position:absolute;top:5px;right:5px;line-height:1;height:auto;font-weight:700;padding:0;margin:0}.HOT-672.HOT-672-2 .quickviewbutton{display:none!important}"
                            }, {
                                selector: null,
                                type: "customScriptNew",
                                oldValue: '!function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n="object"==t(e)&&e&&e.Object===Object&&e,o="object"==("undefined"==typeof self?"undefined":t(self))&&self&&self.Object===Object&&self,c=(n||o||Function("return this")()).Symbol,i=(c&&c.toStringTag,c&&c.toStringTag,Date.now||function(){return(new Date).getTime()}),a=function e(n,o){var c=n;return Object.keys(o).forEach((function(n){var i=o[n],a=c[n],r=a&&"object"===t(a)&&!(a instanceof Array);c[n]=r?e(a,i):i})),c},r=function(e,n,o){var c={wait:50,multiplier:1.1,timeout:0};o&&(c=a(c,o));for(var r=c,d=r.multiplier,s=r.wait,u=c.timeout?new Date(i()+c.timeout):null,l=[],f=function o(c,a,r){if(u&&u&&i()>u)return!1;var s=function(e){if(!e)return!1;var n={function:function(){return e()},string:function(){return document.querySelector(e)}}[t(e)];return!n||n()}(c);s?(l.push(s),l.length===e.length&&n(l)):setTimeout((function(){o(c,a*d)}),r?0:a)},m=0;m<e.length;m+=1){if("string"!=typeof e[m]&&"function"!=typeof e[m])throw"Every item in the poller array should be a function or a string";f(e[m],s,!0)}},d={active:[],connect:function(t,e,n){var o,c={throttle:1e3,config:{attributes:!0,childList:!0,subtree:!1}};n&&(c=a(c,n));var i=new MutationObserver((function(n){n.forEach((function(n){o||(o=!0,e(t,n),setTimeout((function(){o=!1}),c.throttle))}))}));if(t.jquery)for(var r=0;r<t.length;r+=1)i.observe(t[r],c.config),this.active.push([t[r],i]);else i.observe(t,c.config),this.active.push([t,i]);return i},disconnect:function(t){var e=this.active;function n(t){for(var n=0;n<e.length;n+=1)t===e[n][0]&&e[n][1].disconnect()}if(t.length)for(var o=0;o<t.length;o+=1)n(t[o]);else n(t)}},s={trackerName:!1,propertyId:!1,analyticsReference:"ga",eventCache:[],sendEvents:!0,setDefaultCategory:function(t){return this.category=t,this},setDefaultAction:function(t){return this.action=t,this},setPropertyId:function(t){this.propertyId=t},setTrackerName:function(t){this.trackerName=t},useLegacyTracker:function(){this.analyticsReference="_gaq"},sendAuto:function(t,e,n){this.send(null,null,e,n,t)},sendNormalised:function(t,e){this.send(null,null,t,e)},send:function(e,n,o,c){var i=this,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,d=c||{},s=o,u=e||this.category,l=n||this.action,m=a;if(null!=m&&(0==m&&(m="Control"),s="Variation: "+m+" - "+o),"object"===t(d)&&d.sendOnce){var w="".concat(u).concat(l).concat(s);if(this.eventCache.indexOf(w)>-1)return!1;this.eventCache.push(w)}f(s);var p=this,g=function(t){if("_gaq"===p.analyticsReference)window._gaq.push(["_trackEvent",u,l,s,null,void 0===d.nonInteraction||d.nonInteraction]);else{var e={nonInteraction:!d.nonInteraction||d.nonInteraction};if(d.opts)for(var n in d.opts)e[n]=d.opts[n];window[p.analyticsReference]("".concat(t,".send"),"event",u,l,s,e)}};p.trackerName?1==this.sendEvents&&g(p.trackerName):r([function(){try{var t=window[p.analyticsReference].getAll();if(t&&t.length){if(!p.propertyId)return p.trackerName=t[0].get("name"),!0;for(var e=0;e<t.length;e+=1){var n=t[e];if(n.get("trackingId")===p.propertyId)return p.trackerName=n.get("name"),!0}}}catch(t){}}],(function(){1==i.sendEvents&&g(p.trackerName)}),{wait:150})}},u=function(t,e,n,o,c){o=o?"domain="+o+";":"";var i=new Date;i.setDate(i.getDate()+n);var a=c?new Date(i.getTime()+c):n?i:null,r=escape(e)+(null==a?"":"; expires="+a.toUTCString());document.cookie=t+"="+r+";"+o+"path=/"},l=function(t){var e=document.cookie.match(new RegExp("(^|;\\\\s?)".concat(t,"=([^;]*)")));return e&&e[2]?unescape(e[2]):void 0},f=function(t){localStorage.getItem("ucdebug")&&window.console&&"function"==typeof window.console.log&&console.log(t)},m="HOT-672",w=m,p="1",g=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="Test ID: HOT-672 Variation: 1 Label: "+t;0==v.initiate?s.sendNormalised(n,{sendOnce:e}):v.send(t)},v={initiate:!1,methods:["ga4"],tracker:!1,property:!1,uaRef:"ga",send:function(t){var e=this;this.methods.includes("ga4")&&r([function(){return"complete"===document.readyState}],(function(){void 0!==window.gtag?window.gtag("event","experimentation",{experiment_id:"".concat(w,"-").concat(p),experiment_label:t,send_to:e.property||"default"}):(window.dataLayer=window.dataLayer||[],void 0===window.customGtag&&(window.customGtag=function(){window.dataLayer.push(arguments)},window.customGtag("js",new Date),window.customGtag("config",e.property||"default")),window.customGtag("event","experimentation",{experiment_id:"".concat(w,"-").concat(p),experiment_label:t,send_to:e.property||"default"}))})),this.methods.includes("datalayer")&&r([function(){return!!window.dataLayer}],(function(){window.dataLayer.push({event:"experimentation",experiment_id:"".concat(w,"-").concat(p),experiment_label:t})})),this.methods.includes("ua")&&r([function(){return!!window[e.uaRef]}],(function(){var n=e.tracker||window[e.uaRef].getAll()[0].get("name");window[e.uaRef]("".concat(n,".send"),"event","experimentation","".concat(w,"-").concat(p),t,{nonInteraction:!0})}))}},h=m,y=function(){(window.location.href.indexOf("/uk/shop/")>-1||window.location.href.indexOf("/uk/search")>-1)&&r([".grid-tile"],(function(){document.querySelectorAll(".grid-tile").forEach((function(t){if(!t.classList.contains("".concat(h,"-quick-add-enabled"))){var e,n=JSON.parse(null===(e=t.querySelector(\'input[name="productImpression"]\'))||void 0===e?void 0:e.value).impression_product_SKU;"356665"!==n&&"472726"!==n&&"472727"!==n&&"472821"!==n&&(t.querySelector(".tile-wrapper .product-pricing").classList.add("".concat(h,"-quick-add-holder")),t.querySelector(".tile-wrapper .product-pricing").insertAdjacentHTML("beforeend",\'<button data-prodid="\'.concat(n,\'" class="\').concat(h,\'-quick-add"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20.9 6.4H15.9C15.9 3.4 14.1 2 12 2C9.9 2 8.1 3.4 8.1 6.4H3.1C2.5 6.4 2 6.9 2 7.6V18.7V20.9C2 21.5 2.5 22 3.1 22H20.9C21.5 22 22 21.5 22 20.9V18.7V7.6C22 6.9 21.5 6.4 20.9 6.4ZM12 3.1C13.5 3.1 14.8 4 14.8 6.4H9.2C9.2 4 10.5 3.1 12 3.1ZM3.1 7.6H20.9V17.6H3.1V7.6Z" fill="black"/><path d="M15.9 12H8.09998V13.1H15.9V12Z" fill="black"/><path d="M12.5 8.70001H11.4V16.5H12.5V8.70001Z" fill="black"/></svg></button>\')),t.classList.add("".concat(h,"-quick-add-enabled")))}}))}))},b=function(){var t,e,n,o=220;window.outerWidth<767&&(o=100),window.scrollY<o?null===(t=document.querySelector(".".concat(h,"-newitem")))||void 0===t||t.classList.remove("".concat(h,"-stuck")):null!==(e=document.querySelector(".".concat(h,"-newitem")))&&void 0!==e&&e.classList.contains("".concat(h,"-stuck"))||null===(n=document.querySelector(".".concat(h,"-newitem")))||void 0===n||n.classList.add("".concat(h,"-stuck"))};if(!/MSIE|Trident|Edge\\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent)){var k=m;document.documentElement.classList.contains("".concat(k))||r(["body"],(function(){!function(){var t;if(t=m,s.setDefaultCategory("Experimentation"),s.setDefaultAction("HotelChocolat - "+t),s.sendEvents=!0,document.documentElement.classList.add(t),document.documentElement.classList.add("".concat(t,"-").concat("1")),g("Conditions Met"),document.body.addEventListener("click",(function(t){t.target.closest(".quickviewbutton"),"add-to-cart"==t.target.id&&t.target.closest("#QuickViewDialog")})),y(),g("Interaction, experiment started, quick add icons ".concat("shown"),!0),document.body.addEventListener("click",(function(t){if(t.target.closest(".".concat(h,"-quick-add"))||t.target.classList.contains("".concat(h,"-quick-add"))){t.preventDefault();var e,n=t.target.closest(".grid-tile"),o=n.querySelector(".product-name").innerText,c=n.querySelector(".quickviewbutton").getAttribute("href");e=t.target.closest(".".concat(h,"-quick-add")).getAttribute("data-prodid"),console.log(e,"productSKU"),window.jQuery.ajax({url:"https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax",type:"post",data:"Quantity=1&cartAction=add&pid=".concat(e),success:function(){g("Click - variation quick add clicked - on product: [".concat(o,"] with SKU: [").concat(e,"] with URL: [").concat(c,"]")),window.location.reload(),u("".concat(h,"-product-added"),!0)}})}t.target.closest(".load-more-link")&&setTimeout((function(){y()}),1e3)})),d.connect(document.getElementById("main"),(function(){setTimeout((function(){y()}),1e3)}),{childList:!0,subtree:!0,attributes:!0}),l("".concat(h,"-product-added"))&&"true"==l("".concat(h,"-product-added"))){u("".concat(h,"-product-added"),!1);var e=\'\\n    \\n      <div class="\'.concat(h,\'-newitem">\\n\\n          <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 12.5L10.167 17L19.5 8" stroke="#118F40" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>\\n          <p>Item was added to your basket</p>\\n          <button class="\').concat(h,\'-newitem--close">x</button>\\n\\n      </div>\\n    \\n    \'),n=document.querySelector(".breadcrumb .primary-content");n.insertAdjacentHTML("beforeend",e),n.classList.add("".concat(h,"-newitem-visible"));var o=setTimeout((function(){document.querySelector(".".concat(h,"-newitem")).remove(),n.classList.remove("".concat(h,"-newitem-visible"))}),8e3);document.querySelector(".".concat(h,"-newitem--close")).addEventListener("click",(function(){clearTimeout(o),document.querySelector(".".concat(h,"-newitem")).remove(),n.classList.remove("".concat(h,"-newitem-visible"))})),b(),window.addEventListener("scroll",(function(){b()}))}}()}))}}();'
                            }]
                        }
                    }
                },
                1200504: {
                    id: 1200504,
                    name: "HOT-672 - Add to Bag on PLP (100%)",
                    type: "mastersegment",
                    sub_type: "sp",
                    parentID: 0,
                    priority: 0,
                    children: [1200503],
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !1,
                    m2eStartRange: 0,
                    variations: {
                        1487820: {
                            id: 1487820,
                            name: "Variation 1"
                        }
                    }
                },
                1213514: {
                    name: "HOT-649 | Social Proof - Variation 1 - (personalization)",
                    traffic: 100,
                    type: "subsegment",
                    parentID: 1213515,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 34,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !1,
                    m2eStartRange: 0,
                    segmentMode: "all",
                    triggerMode: "all",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/uk/"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://staging.hotelchocolat.com/uk"
                        }],
                        favoriteUrlScope: [{
                            include: !1,
                            favorite_url_id: "6e67fb87-396b-4ad9-baf4-9c26de822841"
                        }],
                        favoriteUrlScopeConditions: [{
                            include: !0,
                            url: "gift-card",
                            operator: "contain",
                            favorite_url_id: "6e67fb87-396b-4ad9-baf4-9c26de822841"
                        }, {
                            include: !0,
                            url: "childrens-chocolate-workshops.html",
                            operator: "contain",
                            favorite_url_id: "6e67fb87-396b-4ad9-baf4-9c26de822841"
                        }, {
                            include: !0,
                            url: "secret-events.html",
                            operator: "contain",
                            favorite_url_id: "6e67fb87-396b-4ad9-baf4-9c26de822841"
                        }, {
                            include: !0,
                            url: "corporate-events.html",
                            operator: "contain",
                            favorite_url_id: "6e67fb87-396b-4ad9-baf4-9c26de822841"
                        }, {
                            include: !0,
                            url: "chocolate-tasting-adventure.html",
                            operator: "contain",
                            favorite_url_id: "6e67fb87-396b-4ad9-baf4-9c26de822841"
                        }, {
                            include: !0,
                            url: "bean-to-bar.html",
                            operator: "contain",
                            favorite_url_id: "6e67fb87-396b-4ad9-baf4-9c26de822841"
                        }],
                        testId: 1213514,
                        qaUrlParameterEnabled: !1
                    },
                    id: 1213514,
                    additionalType: "patch",
                    isAsync: !1,
                    variations: {
                        1503789: {
                            id: 1503789,
                            name: "Variation 1",
                            traffic: 100,
                            masterVariationId: 1503790,
                            modifications: [{
                                id: 5030865,
                                selector: null,
                                type: "addCSS",
                                value: ".HOT-649 .item-details-table .tagg-reset,.HOT-649 .primary-images-carousel .tagg-reset,.HOT-649 .product-image .tagg-reset{display:none!important}.HOT-649 .search-result-content li.grid-tile{position:relative}.HOT-649 .HOT-649-social-proof-plp{border-radius:4px;padding:1px 8px;background-color:rgba(207,185,169,.9);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;position:absolute;left:0;right:0;margin:0 auto;bottom:0;opacity:0;-ms-transform:translateY(20px);-webkit-transform:translateY(20px);-moz-transform:translateY(20px);-o-transform:translateY(20px);transform:translateY(20px);-webkit-transition:opacity .5s ease-in-out,-webkit-transform .5s ease-in-out;transition:opacity .5s ease-in-out,-webkit-transform .5s ease-in-out;transition:opacity .5s ease-in-out,transform .5s ease-in-out;transition:opacity .5s ease-in-out,transform .5s ease-in-out,-webkit-transform .5s ease-in-out}.HOT-649 .HOT-649-social-proof-plp .HOT-649-social-proof__icon{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:5px}.HOT-649 .HOT-649-social-proof-plp .HOT-649-social-proof__icon .HOT-649-icon{display:none;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.HOT-649 .HOT-649-social-proof-plp .HOT-649-social-proof__icon p{color:#000;font-family:GillSansNova-Light;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:5px;text-wrap:nowrap}@media screen and (max-width:768px){.HOT-649 .HOT-649-social-proof-plp .HOT-649-social-proof__icon p{font-size:12px}}.HOT-649 .HOT-649-social-proof-plp strong{font-family:GillSansNova-Medium}.HOT-649 .HOT-649-social-proof-plp.HOT-649-show{opacity:1;-ms-transform:translateY(0);-webkit-transform:translateY(0);-moz-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}.HOT-649 #product-detail-wrapper .pdp-main .product-image-container,.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .slick-slider{position:relative}.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .HOT-649-social-proof-pdp.HOT-649-display-second,.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .slick-slider .HOT-649-social-proof-pdp.HOT-649-display-second{top:57%}@media screen and (max-width:450px){.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .HOT-649-social-proof-pdp.HOT-649-display-second,.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .slick-slider .HOT-649-social-proof-pdp.HOT-649-display-second{top:calc(60% + 8px)}}@media screen and (min-width:450px) and (max-width:768px){.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .HOT-649-social-proof-pdp.HOT-649-display-second,.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .slick-slider .HOT-649-social-proof-pdp.HOT-649-display-second{top:59%}}.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .HOT-649-social-proof-pdp,.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .slick-slider .HOT-649-social-proof-pdp{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;min-width:250px;width:-webkit-max-content;width:-moz-max-content;width:max-content;height:32px;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:rgba(207,185,169,.9);border-radius:4px;padding:1px 24px 1px 10px;opacity:0;-webkit-transition:opacity .5s ease-in-out;transition:opacity .5s ease-in-out;z-index:10}@media screen and (max-width:768px){.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .HOT-649-social-proof-pdp,.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .slick-slider .HOT-649-social-proof-pdp{max-width:270px}}.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .HOT-649-social-proof-pdp .HOT-649-social-proof__icon,.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .slick-slider .HOT-649-social-proof-pdp .HOT-649-social-proof__icon{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;width:100%;gap:5px}.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .HOT-649-social-proof-pdp .HOT-649-social-proof__icon .HOT-649-icon,.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .slick-slider .HOT-649-social-proof-pdp .HOT-649-social-proof__icon .HOT-649-icon{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .HOT-649-social-proof-pdp .HOT-649-social-proof__icon p,.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .slick-slider .HOT-649-social-proof-pdp .HOT-649-social-proof__icon p{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:4px;color:#000;font-family:GillSansNova-Light}@media screen and (max-width:768px){.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .HOT-649-social-proof-pdp .HOT-649-social-proof__icon p,.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .slick-slider .HOT-649-social-proof-pdp .HOT-649-social-proof__icon p{font-size:12px}}.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .HOT-649-social-proof-pdp .HOT-649-social-proof__icon .HOT-649-close,.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .slick-slider .HOT-649-social-proof-pdp .HOT-649-social-proof__icon .HOT-649-close{font-size:9px;position:absolute;top:5px;right:5px}.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .HOT-649-social-proof-pdp strong,.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .slick-slider .HOT-649-social-proof-pdp strong{font-family:GillSansNova-Medium}.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .HOT-649-social-proof-pdp.HOT-649-show,.HOT-649 #product-detail-wrapper .pdp-main .product-image-container .slick-slider .HOT-649-social-proof-pdp.HOT-649-show{opacity:1}.HOT-649 .pt_cart #main .cart-items-form .cart-row .HOT-649-social-proof-cart{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;width:auto;background-color:transparent;color:#000;border-radius:4px;padding:1px 8px;opacity:0;-webkit-transition:opacity .5s ease-in-out,-webkit-transform .5s ease-in-out;transition:opacity .5s ease-in-out,-webkit-transform .5s ease-in-out;transition:opacity .5s ease-in-out,transform .5s ease-in-out;transition:opacity .5s ease-in-out,transform .5s ease-in-out,-webkit-transform .5s ease-in-out;font-size:12px}@media only screen and (min-width:450px){.HOT-649 .pt_cart #main .cart-items-form .cart-row .HOT-649-social-proof-cart{width:auto}}.HOT-649 .pt_cart #main .cart-items-form .cart-row .HOT-649-social-proof-cart .HOT-649-social-proof__icon{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:5px}.HOT-649 .pt_cart #main .cart-items-form .cart-row .HOT-649-social-proof-cart .HOT-649-social-proof__icon p{color:#000;font-family:GillSansNova-Light}@media screen and (max-width:768px){.HOT-649 .pt_cart #main .cart-items-form .cart-row .HOT-649-social-proof-cart .HOT-649-social-proof__icon p{font-size:12px}}.HOT-649 .pt_cart #main .cart-items-form .cart-row .HOT-649-social-proof-cart .HOT-649-social-proof__icon .HOT-649-icon{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:2px}.HOT-649 .pt_cart #main .cart-items-form .cart-row .HOT-649-social-proof-cart strong{font-family:GillSansNova-Medium}.HOT-649 .pt_cart #main .cart-items-form .cart-row .HOT-649-social-proof-cart.HOT-649-show{opacity:1}"
                            }, {
                                selector: "",
                                type: "customScriptNew",
                                oldValue: '!function(){"use strict";function t(){t=function(){return n};var e,n={},o=Object.prototype,r=o.hasOwnProperty,c=Object.defineProperty||function(t,e,n){t[e]=n.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",s=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function l(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(e){l=function(t,e,n){return t[e]=n}}function d(t,e,n,o){var r=e&&e.prototype instanceof y?e:y,a=Object.create(r.prototype),i=new P(o||[]);return c(a,"_invoke",{value:k(t,n,i)}),a}function f(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}n.wrap=d;var p="suspendedStart",h="suspendedYield",m="executing",v="completed",g={};function y(){}function w(){}function b(){}var L={};l(L,i,(function(){return this}));var _=Object.getPrototypeOf,S=_&&_(_(H([])));S&&S!==o&&r.call(S,i)&&(L=S);var x=b.prototype=y.prototype=Object.create(L);function E(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function T(t,e){function n(o,c,a,i){var s=f(t[o],t,c);if("throw"!==s.type){var u=s.arg,l=u.value;return l&&"object"==typeof l&&r.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,a,i)}),(function(t){n("throw",t,a,i)})):e.resolve(l).then((function(t){u.value=t,a(u)}),(function(t){return n("throw",t,a,i)}))}i(s.arg)}var o;c(this,"_invoke",{value:function(t,r){function c(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(c,c):c()}})}function k(t,n,o){var r=p;return function(c,a){if(r===m)throw new Error("Generator is already running");if(r===v){if("throw"===c)throw a;return{value:e,done:!0}}for(o.method=c,o.arg=a;;){var i=o.delegate;if(i){var s=C(i,o);if(s){if(s===g)continue;return s}}if("next"===o.method)o.sent=o._sent=o.arg;else if("throw"===o.method){if(r===p)throw r=v,o.arg;o.dispatchException(o.arg)}else"return"===o.method&&o.abrupt("return",o.arg);r=m;var u=f(t,n,o);if("normal"===u.type){if(r=o.done?v:h,u.arg===g)continue;return{value:u.arg,done:o.done}}"throw"===u.type&&(r=v,o.method="throw",o.arg=u.arg)}}}function C(t,n){var o=n.method,r=t.iterator[o];if(r===e)return n.delegate=null,"throw"===o&&t.iterator.return&&(n.method="return",n.arg=e,C(t,n),"throw"===n.method)||"return"!==o&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a \'"+o+"\' method")),g;var c=f(r,t.iterator,n.arg);if("throw"===c.type)return n.method="throw",n.arg=c.arg,n.delegate=null,g;var a=c.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,g):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function q(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(q,this),this.reset(!0)}function H(t){if(t||""===t){var n=t[i];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,c=function n(){for(;++o<t.length;)if(r.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return c.next=c}}throw new TypeError(typeof t+" is not iterable")}return w.prototype=b,c(x,"constructor",{value:b,configurable:!0}),c(b,"constructor",{value:w,configurable:!0}),w.displayName=l(b,u,"GeneratorFunction"),n.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,l(t,u,"GeneratorFunction")),t.prototype=Object.create(x),t},n.awrap=function(t){return{__await:t}},E(T.prototype),l(T.prototype,s,(function(){return this})),n.AsyncIterator=T,n.async=function(t,e,o,r,c){void 0===c&&(c=Promise);var a=new T(d(t,e,o,r),c);return n.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},E(x),l(x,u,"Generator"),l(x,i,(function(){return this})),l(x,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var e=Object(t),n=[];for(var o in e)n.push(o);return n.reverse(),function t(){for(;n.length;){var o=n.pop();if(o in e)return t.value=o,t.done=!1,t}return t.done=!0,t}},n.values=H,P.prototype={constructor:P,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function o(o,r){return i.type="throw",i.arg=t,n.next=o,r&&(n.method="next",n.arg=e),!!r}for(var c=this.tryEntries.length-1;c>=0;--c){var a=this.tryEntries[c],i=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var s=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(s&&u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var c=o;break}}c&&("break"===t||"continue"===t)&&c.tryLoc<=e&&e<=c.finallyLoc&&(c=null);var a=c?c.completion:{};return a.type=t,a.arg=e,c?(this.method="next",this.next=c.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),j(n),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var o=n.completion;if("throw"===o.type){var r=o.arg;j(n)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,o){return this.delegate={iterator:H(t),resultName:n,nextLoc:o},"next"===this.method&&(this.arg=e),g}},n}function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function n(t,e,n,o,r,c,a){try{var i=t[c](a),s=i.value}catch(t){return void n(t)}i.done?e(s):Promise.resolve(s).then(o,r)}function o(t){return function(){var e=this,o=arguments;return new Promise((function(r,c){var a=t.apply(e,o);function i(t){n(a,r,c,i,s,"next",t)}function s(t){n(a,r,c,i,s,"throw",t)}i(void 0)}))}}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},c="object"==e(r)&&r&&r.Object===Object&&r,a="object"==("undefined"==typeof self?"undefined":e(self))&&self&&self.Object===Object&&self,i=(c||a||Function("return this")()).Symbol,s=(i&&i.toStringTag,i&&i.toStringTag,Date.now||function(){return(new Date).getTime()}),u=function(t,n,o){var r={wait:50,multiplier:1.1,timeout:0};o&&(r=function t(n,o){var r=n;return Object.keys(o).forEach((function(n){var c=o[n],a=r[n],i=a&&"object"===e(a)&&!(a instanceof Array);r[n]=i?t(a,c):c})),r}(r,o));for(var c=r,a=c.multiplier,i=c.wait,u=r.timeout?new Date(s()+r.timeout):null,l=[],d=function o(r,c,i){if(u&&u&&s()>u)return!1;var d=function(t){if(!t)return!1;var n={function:function(){return t()},string:function(){return document.querySelector(t)}}[e(t)];return!n||n()}(r);d?(l.push(d),l.length===t.length&&n(l)):setTimeout((function(){o(r,c*a)}),i?0:c)},f=0;f<t.length;f+=1){if("string"!=typeof t[f]&&"function"!=typeof t[f])throw"Every item in the poller array should be a function or a string";d(t[f],i,!0)}},l={trackerName:!1,propertyId:!1,analyticsReference:"ga",eventCache:[],sendEvents:!0,setDefaultCategory:function(t){return this.category=t,this},setDefaultAction:function(t){return this.action=t,this},setPropertyId:function(t){this.propertyId=t},setTrackerName:function(t){this.trackerName=t},useLegacyTracker:function(){this.analyticsReference="_gaq"},sendAuto:function(t,e,n){this.send(null,null,e,n,t)},sendNormalised:function(t,e){this.send(null,null,t,e)},send:function(t,n,o,r){var c=this,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,i=r||{},s=o,l=t||this.category,d=n||this.action,p=a;if(null!=p&&(0==p&&(p="Control"),s="Variation: "+p+" - "+o),"object"===e(i)&&i.sendOnce){var h="".concat(l).concat(d).concat(s);if(this.eventCache.indexOf(h)>-1)return!1;this.eventCache.push(h)}f(s);var m=this,v=function(t){if("_gaq"===m.analyticsReference)window._gaq.push(["_trackEvent",l,d,s,null,void 0===i.nonInteraction||i.nonInteraction]);else{var e={nonInteraction:!i.nonInteraction||i.nonInteraction};if(i.opts)for(var n in i.opts)e[n]=i.opts[n];window[m.analyticsReference]("".concat(t,".send"),"event",l,d,s,e)}};m.trackerName?1==this.sendEvents&&v(m.trackerName):u([function(){try{var t=window[m.analyticsReference].getAll();if(t&&t.length){if(!m.propertyId)return m.trackerName=t[0].get("name"),!0;for(var e=0;e<t.length;e+=1){var n=t[e];if(n.get("trackingId")===m.propertyId)return m.trackerName=n.get("name"),!0}}}catch(t){}}],(function(){1==c.sendEvents&&v(m.trackerName)}),{wait:150})}},d=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];console.log("🚀 ~ elementIsInView ~ element:",t);var n=Math.max(document.documentElement.clientHeight,window.innerHeight||0),o=t.getBoundingClientRect(),r=o.top,c=o.top+o.height;return e?r>=0&&c<n:c>=0&&r<=n},f=function(t){localStorage.getItem("ucdebug")&&window.console&&"function"==typeof window.console.log&&console.log(t)},p="HOT-649",h=p,m="1",v=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="Test ID: HOT-649 Variation: 1 Label: "+t;0==g.initiate?l.sendNormalised(n,{sendOnce:e}):g.send(t)},g={initiate:!1,methods:["ga4"],tracker:!1,property:!1,uaRef:"ga",send:function(t){var e=this;this.methods.includes("ga4")&&u([function(){return"complete"===document.readyState}],(function(){void 0!==window.gtag?window.gtag("event","experimentation",{experiment_id:"".concat(h,"-").concat(m),experiment_label:t,send_to:e.property||"default"}):(window.dataLayer=window.dataLayer||[],void 0===window.customGtag&&(window.customGtag=function(){window.dataLayer.push(arguments)},window.customGtag("js",new Date),window.customGtag("config",e.property||"default")),window.customGtag("event","experimentation",{experiment_id:"".concat(h,"-").concat(m),experiment_label:t,send_to:e.property||"default"}))})),this.methods.includes("datalayer")&&u([function(){return!!window.dataLayer}],(function(){window.dataLayer.push({event:"experimentation",experiment_id:"".concat(h,"-").concat(m),experiment_label:t})})),this.methods.includes("ua")&&u([function(){return!!window[e.uaRef]}],(function(){var n=e.tracker||window[e.uaRef].getAll()[0].get("name");window[e.uaRef]("".concat(n,".send"),"event","experimentation","".concat(h,"-").concat(m),t,{nonInteraction:!0})}))}},y=p,w=\'\\n<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">\\n<path d="M14.175 3.3H10.425C10.425 1.05 9.075 0 7.5 0C5.925 0 4.575 1.05 4.575 3.3H0.825C0.375 3.3 0 3.675 0 4.2V12.525V14.175C0 14.625 0.375 15 0.825 15H14.175C14.625 15 15 14.625 15 14.175V12.525V4.2C15 3.675 14.625 3.3 14.175 3.3ZM7.5 0.825C8.625 0.825 9.6 1.5 9.6 3.3H5.4C5.4 1.5 6.375 0.825 7.5 0.825ZM0.825 4.2H14.175V11.7H0.825V4.2Z" fill="black"/>\\n</svg>\\n\',b=\'\\n<svg xmlns="http://www.w3.org/2000/svg" width="17" height="11" viewBox="0 0 17 11" fill="none">\\n<path d="M15.7275 5.5C15.7275 5.5 12.4308 10 8.36377 10C4.29676 10 1 5.5 1 5.5C1 5.5 4.29676 1 8.36377 1C12.4308 1 15.7275 5.5 15.7275 5.5Z" stroke="black" stroke-width="1.1" stroke-miterlimit="10"/>\\n<path d="M8.36377 8.36377C9.94539 8.36377 11.2275 7.08162 11.2275 5.5C11.2275 3.91838 9.94539 2.63623 8.36377 2.63623C6.78215 2.63623 5.5 3.91838 5.5 5.5C5.5 7.08162 6.78215 8.36377 8.36377 8.36377Z" fill="black"/>\\n</svg>\\n\',L=\'\\n<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">\\n<path d="M15.675 4.8H11.925C11.925 2.55 10.575 1.5 9 1.5C7.425 1.5 6.075 2.55 6.075 4.8H2.325C1.875 4.8 1.5 5.175 1.5 5.7V14.025V15.675C1.5 16.125 1.875 16.5 2.325 16.5H15.675C16.125 16.5 16.5 16.125 16.5 15.675V14.025V5.7C16.5 5.175 16.125 4.8 15.675 4.8ZM9 2.325C10.125 2.325 11.1 3 11.1 4.8H6.9C6.9 3 7.875 2.325 9 2.325ZM2.325 5.7H15.675V13.2H2.325V5.7Z" fill="black"/>\\n<path d="M11.925 9H6.07495V9.825H11.925V9Z" fill="black"/>\\n<path d="M9.37505 6.52499H8.55005V12.375H9.37505V6.52499Z" fill="black"/>\\n</svg>\\n\',_=function(){var e=function(){return fetch("https://storage.googleapis.com/storage/v1/b/social-proof-product-data/o/product_data_000000000000.json?alt=media",{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(t){if(!t.ok)throw new Error("Network response was not ok. Status: ".concat(t.status," - ").concat(t.statusText));return t.json()})).then((function(t){return console.log(t,"data from API"),t.product_data}))},n=function(){var t=document.querySelectorAll("#main .primary-content .search-result-content ul li"),e=new Set;return t.forEach((function(t){var n=t.querySelector(\'input[name="productImpression"]\');if(n&&n.value){var o=n.value,r=o.match(/"impression_product_SKU":"([^"]+)"/);r&&r[1]?e.add(r[1]):console.warn("SKU not found in:",o)}else console.warn("Expected input not found in element:",t)})),e},r=function(t,e){return\'\\n      <div class="\'.concat(y,\'-social-proof-plp">\\n        \').concat("purchased"==e?\'<div class="\'.concat(y,"-social-proof__icon ").concat(y,\'-social-proof__icon--purchased"><p><i class="\').concat(y,\'-icon">\').concat(w,"</i>100+ sold in the last 48 hours</p></div>"):\'<div class="\'.concat(y,"-social-proof__icon ").concat(y,\'-social-proof__icon--viewed"><p><i class="\').concat(y,\'-icon">\').concat(b,"</i><strong>Popular!</strong> ").concat(t," views recently</p></div>"),"\\n      </div>")},c=function(t,e){return\'\\n      <div class="\'.concat(y,"-social-proof-pdp ").concat(y,\'-display-first">\\n        \').concat("purchased"==e?\'<div class="\'.concat(y,"-social-proof__icon ").concat(y,\'-social-proof__icon--purchased"><p><i class="\').concat(y,\'-icon">\').concat(w,\'</i><strong>Selling fast!</strong> 100+ sold in the last 48 hours</p><span class="\').concat(y,\'-close">X</span></div>\'):\'<div class="\'.concat(y,"-social-proof__icon ").concat(y,\'-social-proof__icon--viewed"><p><i class="\').concat(y,\'-icon">\').concat(L,"</i><strong>Trending!</strong> Added to bag ").concat(t,\' times in the last 48 hours</p><span class="\').concat(y,\'-close">X</span></div>\'),"\\n      </div>")},a=function(t,e){return\'\\n      <div class="\'.concat(y,\'-social-proof-cart">\\n        \').concat("purchased"==e?\'<div class="\'.concat(y,"-social-proof__icon ").concat(y,\'-social-proof__icon--purchased"><i class="\').concat(y,\'-icon">\').concat(w,"</i><p><strong>Selling fast!</strong> <span>100+ sold in the last 48 hours</span></p></div>"):\'<div class="\'.concat(y,"-social-proof__icon ").concat(y,\'-social-proof__icon--viewed"><i class="\').concat(y,\'-icon">\').concat(L,"</i><p><strong>Trending!</strong> <span>Added to bag ").concat(t," times in the last 48 hours</span></p></div>"),"\\n      </div>")},i=function(t,e,n){if(function(t,e){return e.some((function(e){return e.item_id===t}))}(t,e)){var o=function(t,e){return e.find((function(e){return e.item_id===t})).itemViewsLast24Hours}(t,e),i=function(t,e){return e.find((function(e){return e.item_id===t})).purchasesLast48Hours}(t,e),s=function(t,e){return e.find((function(e){return e.item_id===t})).addToCartsLast48Hours}(t,e);if(console.log(o,"VIEWS"),console.log(i,"purchases"),console.log(s,"ATC"),"PLP"===n){var l=document.querySelector(\'#main .primary-content .search-result-content ul li input[value*="\'.concat(t,\'"]\')).parentElement.querySelector(".product-image");i>100?(l.insertAdjacentHTML("afterbegin",r(i,"purchased")),setTimeout((function(){l.querySelector(".".concat(y,"-social-proof-plp")).classList.add("".concat(y,"-show"))}),500)):o>70&&i<100&&(l.insertAdjacentHTML("afterbegin",r(o,"viewed")),setTimeout((function(){l.querySelector(".".concat(y,"-social-proof-plp")).classList.add("".concat(y,"-show"))}),500))}else if("PDP"===n){var d;document.querySelector(".pt_product-details #product-detail-wrapper .pdp-main .product-image-container .slick-slider")?d=document.querySelector(".pt_product-details #product-detail-wrapper .pdp-main .product-image-container .slick-slider"):document.querySelector(".pt_product-details #product-detail-wrapper .pdp-main .product-image-container .product-primary-image")&&(d=document.querySelector(".pt_product-details #product-detail-wrapper .pdp-main .product-image-container .product-primary-image")),i>100?d.insertAdjacentHTML("afterbegin",c(i,"purchased")):i<100&&s>40&&d.insertAdjacentHTML("afterbegin",c(s,"viewed")),o>70&&d.insertAdjacentHTML("afterbegin",function(t){return\'\\n      <div class="\'.concat(y,"-social-proof-pdp ").concat(y,\'-display-second">\\n        <div class="\').concat(y,"-social-proof__icon ").concat(y,\'-social-proof__icon--purchased"><p><i class="\').concat(y,\'-icon">\').concat(b,"</i><strong>Popular!</strong>Viewed ").concat(t,\' times recently</p><span class="\').concat(y,\'-close">X</span></div>\\n      </div>\')}(o)),document.querySelectorAll(".".concat(y,"-close")).forEach((function(t){t&&t.addEventListener("click",(function(){t.closest(".".concat(y,"-social-proof-pdp")).classList.remove("".concat(y,"-show"))}))})),d.querySelector(".".concat(y,"-social-proof-pdp.").concat(y,"-display-first"))&&(setTimeout((function(){d.querySelector(".".concat(y,"-social-proof-pdp.").concat(y,"-display-first")).classList.add("".concat(y,"-show"))}),500),setTimeout((function(){d.querySelector(".".concat(y,"-social-proof-pdp.").concat(y,"-display-first")).classList.remove("".concat(y,"-show"))}),1e4)),d.querySelector(".".concat(y,"-social-proof-pdp.").concat(y,"-display-second"))&&(setTimeout((function(){d.querySelector(".".concat(y,"-social-proof-pdp.").concat(y,"-display-second")).classList.add("".concat(y,"-show"))}),5e3),setTimeout((function(){d.querySelector(".".concat(y,"-social-proof-pdp.").concat(y,"-display-second")).classList.remove("".concat(y,"-show"))}),15e3))}else"CART"===n&&u([".pt_cart #main .cart-items-form .cart-row .item-details-table tbody"],(function(){var e=document.querySelector(\'.pt_cart #main .cart-items-form .cart-row[data-pid="\'.concat(t,\'"] .item-details-table tbody\'));i>100?e.insertAdjacentHTML("beforeend",a(i,"purchased")):i<100&&e.insertAdjacentHTML("beforeend",a(s,"atc")),e.querySelector(".".concat(y,"-social-proof-cart"))&&setTimeout((function(){e.querySelector(".".concat(y,"-social-proof-cart")).classList.add("".concat(y,"-show"))}),500)}))}};u([\'#main .primary-content .search-result-content[impression-list-type="PLP"]\'],(function(){var r;(r=o(t().mark((function o(){var r,c,a;return t().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=function(){var t=document.querySelectorAll("#main .primary-content .search-result-content ul li").length,e=document.querySelector("#main .primary-content .search-result-content .load-more-link");e&&e.addEventListener("click",(function(){u(["#main .primary-content .search-result-content ul li input"],(function(){var e=c.size;c.clear(),setTimeout((function(){document.querySelectorAll("#main .primary-content .search-result-content ul li").forEach((function(n,o){if(o>=t&&o<e+t){var r=JSON.parse(n.querySelector("input").value).impression_product_SKU;c.add(r)}})),c.forEach((function(t){i(t,r,"PLP")})),a()}),2e3)}))}))},t.next=3,e();case 3:return r=t.sent,t.next=6,n();case 6:(c=t.sent).forEach((function(t){i(t,r,"PLP")})),a();case 9:case"end":return t.stop()}}),o)}))),function(){return r.apply(this,arguments)})()})),u(["#product-detail-wrapper .pdp-main .product-detail"],(function(){var n;(n=o(t().mark((function n(){var o;return t().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e();case 2:return o=t.sent,t.next=5,[document.querySelector(\'#product-detail-wrapper .pdp-main .product-detail span[itemprop="productID"]\').innerHTML];case 5:t.sent.forEach((function(t){i(t,o,"PDP")}));case 7:case"end":return t.stop()}}),n)}))),function(){return n.apply(this,arguments)})()})),u([".pt_cart #main .cart-items-form .cart-row"],(function(){var n,r=function(){var t=document.querySelectorAll(".pt_cart #main .cart-items-form .cart-row"),e=[];return t.forEach((function(t){var n=t.getAttribute("data-pid");e.push(n)})),e};(n=o(t().mark((function n(){var o;return t().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e();case 2:return o=t.sent,t.next=5,r();case 5:t.sent.forEach((function(t){i(t,o,"CART")}));case 7:case"end":return t.stop()}}),n)}))),function(){return n.apply(this,arguments)})()}))};/MSIE|Trident|Edge\\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent)||u(["body"],(function(){var t,e,n,o,r,c,a;g.initiate=!0,g.method=["ga4"],g.property="G-B37NQR1RWZ",t=p,l.setDefaultCategory("Experimentation"),l.setDefaultAction("HotelChocolat - "+t),l.sendEvents=!0,document.documentElement.classList.add(t),document.documentElement.classList.add("".concat(t,"-").concat("1")),f(y+" Variation: 1"),v("Conditions Met"),e=!1,n=!1,o=!1,document.addEventListener("click",(function(t){t.target.classList.contains("tagg-x")&&v("Click - Taggstar Close")})),document.addEventListener("scroll",(function(){u([".product-tile .tagg-reset"],(function(){if(!e){var t=document.querySelector(".product-tile .tagg-reset");d(t)&&(e=!0,v("Scroll - Taggstar Seen PLP"))}})),u([".primary-images-carousel .tagg-reset"],(function(){if(!n){var t=document.querySelector(".primary-images-carousel .tagg-reset");d(t)&&(n=!0,v("Scroll - Taggstar Seen PDP"))}})),u([".cart-row  .tagg-reset"],(function(){if(!o){var t=document.querySelector(".cart-row  .tagg-reset");d(t)&&(o=!0,v("Scroll - Taggstar Seen CART"))}}))})),_(),r=!1,c=!1,a=!1,document.addEventListener("click",(function(t){t.target.classList.contains("".concat(y,"-close"))&&v("Click - BL Close")})),document.addEventListener("scroll",(function(){u([".".concat(y,"-social-proof-plp")],(function(){if(!r){var t=document.querySelector(".".concat(y,"-social-proof-plp"));d(t)&&(r=!0,v("Scroll - BL Seen PLP"))}})),u([".".concat(y,"-social-proof-pdp")],(function(){if(!c){var t=document.querySelector(".".concat(y,"-social-proof-pdp"));d(t)&&(c=!0,v("Scroll - BL Seen PDP"))}})),u([".".concat(y,"-social-proof-cart")],(function(){if(!a){var t=document.querySelector(".".concat(y,"-social-proof-cart"));d(t)&&(a=!0,v("Scroll - BL Seen CART"))}}))}))}))}();'
                            }]
                        }
                    }
                },
                1213515: {
                    id: 1213515,
                    name: "HOT-649 | Social Proof (100%)",
                    type: "mastersegment",
                    sub_type: "sp",
                    parentID: 0,
                    priority: 0,
                    children: [1213514],
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !1,
                    m2eStartRange: 0,
                    variations: {
                        1503790: {
                            id: 1503790,
                            name: "Variation 1"
                        }
                    }
                },
                1242403: {
                    name: "\ufeffHOT-678 | Right hand side desktop content - Variation 1 - (personalization)",
                    traffic: 100,
                    type: "subsegment",
                    parentID: 1242404,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 17,
                    mutationObserverEnabled: !0,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !1,
                    m2eStartRange: 0,
                    segmentMode: "all",
                    triggerMode: "all",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/uk/"
                        }, {
                            include: !1,
                            condition: 10,
                            value: "gift-card"
                        }, {
                            include: !1,
                            condition: 10,
                            value: "velvetiser"
                        }, {
                            include: !1,
                            condition: 10,
                            value: "-recipe"
                        }, {
                            include: !1,
                            condition: 10,
                            value: "=recipes"
                        }],
                        selectorScope: [{
                            include: !0,
                            condition: 45,
                            value: "#product-detail-wrapper"
                        }, {
                            include: !1,
                            condition: 45,
                            value: '.breadcrumb-element[title="Recipes"][href*="/products/recipes/"]'
                        }],
                        testId: 1242403,
                        qaUrlParameterEnabled: !1
                    },
                    audienceSegment: [{
                        name: "Desktop Visitors",
                        id: "265aa396-af84-4d94-a303-ecabc56ce45b",
                        targeting_groups: [{
                            position: 0,
                            id: "a37e8ff6-3ee5-48f3-8d60-5f179aa3aff8",
                            targetings: [{
                                id: "4d18614e-af52-4796-921f-f3ca46b5ab56",
                                operator: "auto",
                                position: 0,
                                conditions: [{
                                    id: "93baf37b-2cc4-493c-a0d4-2fbe613cbeb9",
                                    value: 3,
                                    is_segment_type: !0,
                                    include: !0
                                }],
                                targeting_type: 17
                            }]
                        }],
                        is_segment: !0
                    }],
                    id: 1242403,
                    additionalType: "patch",
                    isAsync: !1,
                    variations: {
                        1539317: {
                            id: 1539317,
                            name: "Variation 1",
                            traffic: 100,
                            masterVariationId: 1539318,
                            modifications: [{
                                id: 5112348,
                                selector: "",
                                type: "addCSS",
                                value: ".HOT-678 .HOT-678-hidden{display:none!important;visibility:hidden!important}.HOT-678 .HOT-678-accordion{margin-bottom:40px}.HOT-678 .HOT-678-accordion *{-webkit-box-sizing:border-box!important;box-sizing:border-box!important}.HOT-678 .HOT-678-accordion--title{background:#fff;border-top:1px solid #000;border-bottom:1px solid #000;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:10px 15px;font-size:16px;text-transform:uppercase;color:#000;margin-top:10px;font-family:GillSansNova-Light,Arial,Helvetica,sans-serif;cursor:pointer}.HOT-678 .HOT-678-accordion--title:first-of-type{margin-top:0}.HOT-678 .HOT-678-accordion--title::after{content:\"\";width:10px;height:10px;background-image:url(\"data:image/svg+xml,%3Csvg fill='%23000' height='10px' width='10px' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 407.436 407.436' xml:space='preserve'%3E%3Cpolygon points='112.814,0 91.566,21.178 273.512,203.718 91.566,386.258 112.814,407.436 315.869,203.718 '/%3E%3C/svg%3E\");margin-left:auto}.HOT-678 .HOT-678-accordion--content{display:none;border:1px solid #f1f1f0;border-top:0;padding:15px;margin-bottom:20px;height:350px;overflow-x:hidden;overflow-y:auto;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.HOT-678 .HOT-678-accordion--content div,.HOT-678 .HOT-678-accordion--content p{font-size:14px!important}.HOT-678 .HOT-678-accordion--content::-webkit-scrollbar{height:5px;width:5px}.HOT-678 .HOT-678-accordion--content::-webkit-scrollbar-track{background-color:#fff}.HOT-678 .HOT-678-accordion--content::-webkit-scrollbar-track:hover{background-color:#fff}.HOT-678 .HOT-678-accordion--content::-webkit-scrollbar-track:active{background-color:#fff}.HOT-678 .HOT-678-accordion--content::-webkit-scrollbar-thumb{background-color:#ccc}.HOT-678 .HOT-678-accordion--content::-webkit-scrollbar-thumb:hover{background-color:#ccc}.HOT-678 .HOT-678-accordion--content::-webkit-scrollbar-thumb:active{background-color:#666}.HOT-678 .HOT-678-accordion--content .descSection2{margin-top:10px}.HOT-678 .HOT-678-accordion--content .descSection2 h3{margin-bottom:10px}.HOT-678 .HOT-678-accordion--content .descSection3.menu{display:none}.HOT-678 .HOT-678-accordion--content .additional,.HOT-678 .HOT-678-accordion--content .grid-1{margin-top:20px}.HOT-678 .HOT-678-accordion--content .additional h3,.HOT-678 .HOT-678-accordion--content .grid-1 h3{border:1px solid #f1f1f0;padding:5px}.HOT-678 .HOT-678-accordion--content .additional>ul,.HOT-678 .HOT-678-accordion--content .grid-1>ul{border:1px solid #f1f1f0;border-top:none;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.HOT-678 .HOT-678-accordion--content .additional>ul>li,.HOT-678 .HOT-678-accordion--content .grid-1>ul>li{border-top:1px solid #f1f1f0}.HOT-678 .HOT-678-accordion--content .additional>ul>li:first-child,.HOT-678 .HOT-678-accordion--content .grid-1>ul>li:first-child{border-top:none}.HOT-678 .HOT-678-accordion--content .additional>ul>li .col-1,.HOT-678 .HOT-678-accordion--content .additional>ul>li .col-2,.HOT-678 .HOT-678-accordion--content .grid-1>ul>li .col-1,.HOT-678 .HOT-678-accordion--content .grid-1>ul>li .col-2{margin:0;padding:5px;height:100%}.HOT-678 .HOT-678-accordion--content .additional>ul>li .col-2,.HOT-678 .HOT-678-accordion--content .grid-1>ul>li .col-2{border-left:1px solid #f1f1f0}.HOT-678 .HOT-678-accordion--content .grid-1{margin-bottom:20px}.HOT-678 .HOT-678-accordion--content .grid-1>ul{border-top:1px solid #f1f1f0}.HOT-678 .HOT-678-accordion.HOT-678-description-active #HOT-678-accordion--title--description:after{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.HOT-678 .HOT-678-accordion.HOT-678-description-active #HOT-678-accordion--content--description{display:-webkit-box;display:-ms-flexbox;display:flex}.HOT-678 .HOT-678-accordion.HOT-678-ingredients-active #HOT-678-accordion--title--ingredients:after{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.HOT-678 .HOT-678-accordion.HOT-678-ingredients-active #HOT-678-accordion--content--ingredients{display:-webkit-box;display:-ms-flexbox;display:flex}.HOT-678 .HOT-678-accordion.HOT-678-reviews-active #HOT-678-accordion--title--reviews:after{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.HOT-678 .HOT-678-accordion.HOT-678-reviews-active #HOT-678-accordion--content--reviews{display:-webkit-box;display:-ms-flexbox;display:flex}.HOT-678 .HOT-678-accordion #HOT-678-accordion--content--reviews{padding:0}.HOT-678 .HOT-678-accordion #HOT-678-accordion--content--reviews .bv-fieldsets,.HOT-678 .HOT-678-accordion #HOT-678-accordion--content--reviews .bv-searchbar{width:100%!important}.HOT-678 .HOT-678-accordion #HOT-678-accordion--content--reviews .bv-flex-container-responsive{width:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.HOT-678 .HOT-678-accordion #HOT-678-accordion--content--reviews .bv-flex-container-responsive .bv-section-summary-block{width:100%!important}.HOT-678 .HOT-678-accordion #HOT-678-accordion--content--reviews .bv-author-profile{width:100%!important;padding:0!important}.HOT-678 .HOT-678-accordion #HOT-678-accordion--content--reviews .bv-author-profile .bv-author-avatar{margin-bottom:0!important}.HOT-678 .HOT-678-accordion #HOT-678-accordion--content--reviews .bv-content-review{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.HOT-678 .HOT-678-accordion #HOT-678-accordion--content--reviews .bv-popup-prosnap-userinfo{display:none!important}.HOT-678 .HOT-678-accordion #HOT-678-accordion--content--reviews .bv-content-item-author-profile-offset{width:100%!important;margin:0!important;padding:0!important}.HOT-678 .HOT-678-accordion #HOT-678-accordion--content--reviews .bv-content-details-container,.HOT-678 .HOT-678-accordion #HOT-678-accordion--content--reviews .bv-content-details-offset-on{width:100%!important;margin:0!important;padding:0!important}.HOT-678 .HOT-678-accordion #HOT-678-accordion--content--reviews .bv-secondary-ratings{margin:0!important}@media only screen and (max-width:768px){.HOT-678 .HOT-678-details-accordion{display:none}}"
                            }, {
                                selector: "",
                                type: "customScriptNew",
                                oldValue: '!function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n="object"==t(e)&&e&&e.Object===Object&&e,c="object"==("undefined"==typeof self?"undefined":t(self))&&self&&self.Object===Object&&self,o=(n||c||Function("return this")()).Symbol,i=(o&&o.toStringTag,o&&o.toStringTag,Date.now||function(){return(new Date).getTime()}),a=function(e,n,c){var o={wait:50,multiplier:1.1,timeout:0};c&&(o=function e(n,c){var o=n;return Object.keys(c).forEach((function(n){var i=c[n],a=o[n],r=a&&"object"===t(a)&&!(a instanceof Array);o[n]=r?e(a,i):i})),o}(o,c));for(var a=o,r=a.multiplier,s=a.wait,d=o.timeout?new Date(i()+o.timeout):null,l=[],u=function c(o,a,s){if(d&&d&&i()>d)return!1;var u=function(e){if(!e)return!1;var n={function:function(){return e()},string:function(){return document.querySelector(e)}}[t(e)];return!n||n()}(o);u?(l.push(u),l.length===e.length&&n(l)):setTimeout((function(){c(o,a*r)}),s?0:a)},f=0;f<e.length;f+=1){if("string"!=typeof e[f]&&"function"!=typeof e[f])throw"Every item in the poller array should be a function or a string";u(e[f],s,!0)}},r={trackerName:!1,propertyId:!1,analyticsReference:"ga",eventCache:[],sendEvents:!0,setDefaultCategory:function(t){return this.category=t,this},setDefaultAction:function(t){return this.action=t,this},setPropertyId:function(t){this.propertyId=t},setTrackerName:function(t){this.trackerName=t},useLegacyTracker:function(){this.analyticsReference="_gaq"},sendAuto:function(t,e,n){this.send(null,null,e,n,t)},sendNormalised:function(t,e){this.send(null,null,t,e)},send:function(e,n,c,o){var i=this,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,d=o||{},l=c,u=e||this.category,f=n||this.action,v=r;if(null!=v&&(0==v&&(v="Control"),l="Variation: "+v+" - "+c),"object"===t(d)&&d.sendOnce){var g="".concat(u).concat(f).concat(l);if(this.eventCache.indexOf(g)>-1)return!1;this.eventCache.push(g)}s(l);var m=this,w=function(t){if("_gaq"===m.analyticsReference)window._gaq.push(["_trackEvent",u,f,l,null,void 0===d.nonInteraction||d.nonInteraction]);else{var e={nonInteraction:!d.nonInteraction||d.nonInteraction};if(d.opts)for(var n in d.opts)e[n]=d.opts[n];window[m.analyticsReference]("".concat(t,".send"),"event",u,f,l,e)}};m.trackerName?1==this.sendEvents&&w(m.trackerName):a([function(){try{var t=window[m.analyticsReference].getAll();if(t&&t.length){if(!m.propertyId)return m.trackerName=t[0].get("name"),!0;for(var e=0;e<t.length;e+=1){var n=t[e];if(n.get("trackingId")===m.propertyId)return m.trackerName=n.get("name"),!0}}}catch(t){}}],(function(){1==i.sendEvents&&w(m.trackerName)}),{wait:150})}},s=function(t){localStorage.getItem("ucdebug")&&window.console&&"function"==typeof window.console.log&&console.log(t)},d="HOT-678",l=d,u="1",f=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="Test ID: HOT-678 Variation: 1 Label: "+t;0==v.initiate?r.sendNormalised(n,{sendOnce:e}):v.send(t)},v={initiate:!1,methods:["ga4"],tracker:!1,property:!1,uaRef:"ga",send:function(t){var e=this;this.methods.includes("ga4")&&(s(t),a([function(){return"complete"===document.readyState}],(function(){void 0!==window.gtag?window.gtag("event","experimentation",{experiment_id:"".concat(l,"-").concat(u),experiment_label:t,send_to:e.property||"default"}):(window.dataLayer=window.dataLayer||[],void 0===window.customGtag&&(window.customGtag=function(){window.dataLayer.push(arguments)},window.customGtag("js",new Date),window.customGtag("config",e.property||"default")),window.customGtag("event","experimentation",{experiment_id:"".concat(l,"-").concat(u),experiment_label:t,send_to:e.property||"default"}))}))),this.methods.includes("datalayer")&&(s(t),a([function(){return!!window.dataLayer}],(function(){window.dataLayer.push({event:"experimentation",experiment_id:"".concat(l,"-").concat(u),experiment_label:t})}))),this.methods.includes("ua")&&a([function(){return!!window[e.uaRef]}],(function(){var n=e.tracker||window[e.uaRef].getAll()[0].get("name");window[e.uaRef]("".concat(n,".send"),"event","experimentation","".concat(l,"-").concat(u),t,{nonInteraction:!0})}))}},g=d;if(!/MSIE|Trident|Edge\\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent)){var m=d;document.documentElement.classList.contains("".concat(m))||a(["body"],(function(){!function(){var t;t=d,r.setDefaultCategory("Experimentation"),r.setDefaultAction("HotelChocolat - "+t),r.sendEvents=!0,document.documentElement.classList.add(t),document.documentElement.classList.add("".concat(t,"-").concat("1")),f("Conditions Met"),a([".tab-target-mobile",".tab-target-desktop"],(function(){var t=document.querySelector(".tab-target-mobile"),e=document.querySelector(".tab-target-desktop");e.classList.add("".concat(g,"-hidden"));var n=e.querySelector("#tabDesc").innerHTML,c=e.querySelector("#tabIngredients").innerHTML,o=e.querySelector("#bv-review-container"),i=\'\\n    \\n      <div class="\'.concat(g,\'-details-accordion">\\n      \\n        <div class="\').concat(g,"-accordion ").concat("".concat(g,"-description-active"),\'">\\n        \\n          <div class="\').concat(g,\'-accordion--title" id="\').concat(g,\'-accordion--title--description">Description</div>\\n\\n          <div class="\').concat(g,\'-accordion--content" id="\').concat(g,\'-accordion--content--description">\\n            \').concat(n,\'\\n          </div>\\n\\n          <div class="\').concat(g,\'-accordion--title" id="\').concat(g,\'-accordion--title--ingredients">Ingredients</div>\\n\\n          <div class="\').concat(g,\'-accordion--content" id="\').concat(g,\'-accordion--content--ingredients">\\n            \').concat(c,\'\\n          </div>\\n\\n          <div class="\').concat(g,\'-accordion--title" id="\').concat(g,\'-accordion--title--reviews">Reviews</div>\\n\\n          <div class="\').concat(g,\'-accordion--content" id="\').concat(g,\'-accordion--content--reviews">\\n            \\n          </div>\\n        \\n        \\n        </div>\\n      \\n      \\n      </div>\\n    \\n    \');t.insertAdjacentHTML("afterend",i);var a=document.querySelector(".".concat(g,"-accordion"));document.getElementById("".concat(g,"-accordion--content--reviews")).insertAdjacentElement("afterbegin",o),f("Interaction - experiment successfully run and accordion added to page: ".concat(window.location.href),!0),document.body.addEventListener("click",(function(t){if(t.target.classList.contains("".concat(g,"-accordion--title"))){var e=t.target.id;e=="".concat(g,"-accordion--title--description")?(a.classList.contains("".concat(g,"-description-active"))?a.classList.remove("".concat(g,"-description-active")):a.classList.add("".concat(g,"-description-active")),a.classList.remove("".concat(g,"-ingredients-active"),"".concat(g,"-reviews-active")),f("Click - user has clicked on tab: description on product page: ".concat(window.location.href),!0)):e=="".concat(g,"-accordion--title--ingredients")?(a.classList.contains("".concat(g,"-ingredients-active"))?a.classList.remove("".concat(g,"-ingredients-active")):a.classList.add("".concat(g,"-ingredients-active")),a.classList.remove("".concat(g,"-description-active"),"".concat(g,"-reviews-active")),f("Click - user has clicked on tab: INGREDIENTS on product page: ".concat(window.location.href),!0)):e=="".concat(g,"-accordion--title--reviews")&&(a.classList.contains("".concat(g,"-reviews-active"))?a.classList.remove("".concat(g,"-reviews-active")):a.classList.add("".concat(g,"-reviews-active")),a.classList.remove("".concat(g,"-ingredients-active"),"".concat(g,"-description-active")),f("Click - user has clicked on tab: REVIEWS on product page: ".concat(window.location.href),!0))}("add-to-cart"==t.target.id||t.target.closest("#add-to-cart"))&&f("Click - user has clicked on ATC on product page: ".concat(window.location.href),!0),t.target.closest(".product-review-links")&&(a.classList.remove("".concat(g,"-description-active"),"".concat(g,"-ingredients-active")),a.classList.add("".concat(g,"-reviews-active")),setTimeout((function(){document.getElementById("".concat(g,"-accordion--title--reviews")).scrollIntoView({behavior:"smooth",block:"start"})}),500),f("Click - user has clicked on review stars to scroll the reviews into view",!0))}))}))}()}))}}();'
                            }]
                        }
                    }
                },
                1242404: {
                    id: 1242404,
                    name: "\ufeffHOT-678 | Right hand side desktop content (100%)",
                    type: "mastersegment",
                    sub_type: "sp",
                    parentID: 0,
                    priority: 0,
                    children: [1242403],
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !1,
                    m2eStartRange: 0,
                    variations: {
                        1539318: {
                            id: 1539318,
                            name: "Variation 1"
                        }
                    }
                },
                1243970: {
                    name: "HOT-687 | Returning Users Personalisation",
                    traffic: 100,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 27,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "all",
                    triggerMode: "all",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/"
                        }],
                        testId: 1243970,
                        qaUrlParameterEnabled: !1
                    },
                    audienceSegment: [{
                        name: "QA Cookie",
                        id: "6123410e-9c71-433f-902f-b1995917ee48",
                        targeting_groups: [{
                            position: 0,
                            id: "99b64694-c42e-410d-b2f9-9d3ecb4b5d48",
                            targetings: [{
                                id: "acb71784-762c-4c75-9866-4a10fb7274aa",
                                operator: "or",
                                position: 0,
                                conditions: [{
                                    id: "9172d474-6516-4a5b-9683-8fff4dfdc6a2",
                                    name: "bltest",
                                    value: "true",
                                    include: !0
                                }],
                                targeting_type: 20
                            }]
                        }],
                        is_segment: !0
                    }],
                    campaignHash: "d456bc54eee94639c49bfabf3d68d0e3",
                    id: 1243970,
                    additionalType: "",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1541296: {
                            id: 1541296,
                            traffic: 50,
                            name: "Variation 1"
                        },
                        1541298: {
                            id: 1541298,
                            traffic: 0,
                            name: "Control Variation"
                        },
                        1544421: {
                            id: 1544421,
                            traffic: 50,
                            name: "Variation 2"
                        }
                    }
                },
                1253222: {
                    name: "ABT BUILD Mini Basket - VIP.ME Benefits",
                    traffic: 75,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    globalCode: 'const body=document.querySelector("body");body?.addEventListener("mousedown",(e=>{e.target.closest(".abtasty-campaign-1253222")&&ABTastyClickTracking("Click on mini basket member rewards",null,1253222)}));',
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 11,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/uk"
                        }],
                        ipScope: [{
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1354565781"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "3584448117"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "3232236002"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1537565751"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "634096730"
                        }],
                        testId: 1253222,
                        qaUrlParameterEnabled: !1
                    },
                    campaignHash: "2eddda4e7dff3d01008d7b59f5789d0f",
                    id: 1253222,
                    additionalType: "",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1552950: {
                            id: 1552950,
                            traffic: 25,
                            name: "Variation 1"
                        },
                        1563944: {
                            id: 1563944,
                            traffic: 25,
                            name: "Variation 2"
                        },
                        1579974: {
                            id: 1579974,
                            traffic: 25,
                            name: "Variation 3"
                        }
                    }
                },
                1254028: {
                    name: "ABT BUILD Basket - Increase Product Image Size",
                    traffic: 50,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 4,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/basket"
                        }],
                        ipScope: [{
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "3108344005"
                        }],
                        testId: 1254028,
                        qaUrlParameterEnabled: !1
                    },
                    actionTrackings: {
                        mousedown: [{
                            name: "Click CTA checkout",
                            selector: ".cart-total .cart-action-checkout button"
                        }, {
                            name: "Click CTA continue shopping",
                            selector: ".cart-total .continue-shopping a.button"
                        }, {
                            name: "Click Product quantity Less",
                            selector: "#cart-table .item-quantity-details .li-qty.input-group span.li-qty-minus"
                        }, {
                            name: "Click Product quantity More",
                            selector: "#cart-table .item-quantity-details .li-qty.input-group span.li-qty-plus"
                        }]
                    },
                    audienceTrigger: [{
                        name: "Desktop bigger than 960px",
                        id: "78cfe936-b918-41b8-a724-7a5ae44857cf",
                        targeting_groups: [{
                            position: 0,
                            id: "082ae4d7-8e5d-45b7-8e0f-9f950acbc072",
                            targetings: [{
                                id: "6bc0c7cc-890e-4180-913e-f75b7e452388",
                                operator: "auto",
                                position: 0,
                                conditions: [{
                                    id: "1f1663ea-6e07-4879-a165-0d7b1981c571",
                                    value: 3,
                                    is_segment_type: !1,
                                    include: !0
                                }],
                                targeting_type: 17
                            }, {
                                id: "b5695bd1-b15c-4e85-bf34-1012bd3a82d7",
                                operator: "auto",
                                position: 1,
                                conditions: [{
                                    id: "817304c9-28f6-4941-a210-5236f1371912",
                                    value_min: 960,
                                    value_max: 9999,
                                    include: !0
                                }],
                                targeting_type: 27
                            }]
                        }],
                        is_segment: !1
                    }],
                    campaignHash: "7d4191cb7265064f494db1c28e198519",
                    id: 1254028,
                    additionalType: "",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1554008: {
                            id: 1554008,
                            traffic: 50,
                            name: "Variation 1"
                        }
                    }
                },
                1254033: {
                    name: "ABT BUILD Basket - Subscription Optimisation",
                    traffic: 100,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    globalCode: 'const body=document.querySelector("body");body.addEventListener("mousedown",(e=>{const t=e.target;t.closest(".og-option-row.og-off-row")&&ABTastyClickTracking("Clicks on One Time Purchase Option",null,1254033),t!=document.querySelector(".abt-set-subscription")&&t!=document.querySelector(".og-label.og-on-label")&&t!=document.querySelector(".item-details-table .og-widget .og-option-row:nth-child(2) input")||ABTastyClickTracking("Clicks on Subscription Option",null,1254033)}));const selectElement=document.querySelector(\'select[name="frequency"]\'),currentValue=localStorage.getItem("currentValue");currentValue||localStorage.setItem("currentValue",!1),null!==currentValue&&"true"==currentValue&&(ABTastyClickTracking("Clicks on Monthly Subscription Options",null,1254033),localStorage.setItem("currentValue",!1)),selectElement.addEventListener("change",(e=>{localStorage.setItem("currentValue",!0)}));',
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 8,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/basket"
                        }],
                        ipScope: [{
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "3108344005"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "634096730"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "3232236002"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "2328305054"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1336782124"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "172993430"
                        }],
                        testId: 1254033,
                        qaUrlParameterEnabled: !1
                    },
                    campaignHash: "7855cd374aa0ccea151ded0e2575f2c8",
                    id: 1254033,
                    additionalType: "patch",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1554013: {
                            id: 1554013,
                            traffic: 100,
                            name: "Variation 1"
                        }
                    }
                },
                1261792: {
                    name: "HOT-670 | Simplified Sign up / Register (Iteration)",
                    traffic: 100,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 122,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/uk/checkout"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://staging.hotelchocolat.com/uk"
                        }],
                        testId: 1261792,
                        qaUrlParameterEnabled: !0
                    },
                    campaignHash: "eb1fffe65ae6bd907a244d63a2f2d885",
                    id: 1261792,
                    additionalType: "",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1563914: {
                            id: 1563914,
                            traffic: 0,
                            name: "Variation 1"
                        },
                        1563915: {
                            id: 1563915,
                            traffic: 33,
                            name: "Variation 2"
                        },
                        1563916: {
                            id: 1563916,
                            traffic: 34,
                            name: "Control Variation"
                        },
                        1563917: {
                            id: 1563917,
                            traffic: 33,
                            name: "Variation 3"
                        }
                    }
                },
                1309148: {
                    name: "HOT-705 | Gifting Slide Out",
                    traffic: 100,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 48,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/uk/"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://staging.hotelchocolat.com/uk"
                        }],
                        ipScope: [{
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "532270619"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1991466549"
                        }],
                        favoriteUrlScope: [{
                            include: !1,
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }],
                        favoriteUrlScopeConditions: [{
                            include: !0,
                            url: "/uk/472809",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/472726",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/platinum-velvetiser.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/satin-black-velvetiser.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/472824.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/472725",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/velvetiser-hot-chocolate-machine.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/472824",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/satin-black-velvetiser.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/velvetiser-hot-chocolate-pack.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/472727",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }, {
                            include: !0,
                            url: "/uk/velvetiser-hot-chocolate-maker.html",
                            operator: "contain",
                            favorite_url_id: "46ff936e-618d-4c8e-b554-3a5b9b941d9c"
                        }],
                        testId: 1309148,
                        qaUrlParameterEnabled: !1
                    },
                    audienceTrigger: [{
                        name: "PDPs and Check Out Page",
                        id: "7c224622-d8c4-4ae5-8087-0679c41537f1",
                        targeting_groups: [{
                            position: 0,
                            id: "6a6fc958-c35f-46ea-a33a-2560e49ee0bd",
                            targetings: [{
                                checkMode: "loading",
                                id: "3710be6f-8a8e-4cda-a13d-918837d25829",
                                operator: "or",
                                position: 0,
                                conditions: [{
                                    id: "a77d0ffb-b470-450f-a245-0d7b6bf3fa0a",
                                    datalayer_key: "pdp_product_type",
                                    condition: 11,
                                    value: ["Standard|Subscription"]
                                }],
                                targeting_type: 44
                            }]
                        }, {
                            position: 1,
                            id: "5c804402-9711-4d44-9e1b-11e0af86f40b",
                            targetings: [{
                                id: "42ec3de7-615d-44b4-9eb7-43fb99b624d6",
                                operator: "auto",
                                position: 0,
                                conditions: [{
                                    id: "2413d8bb-ddb9-465e-b93b-0b63906f70a1",
                                    value: 'if((document.location.href.includes("/uk/checkout/shipping")||document.location.href.includes("uk/checkout/gift-options"))&&document.querySelector("form.checkout-multi-shipping.address"))return!0;',
                                    isAsync: !1
                                }],
                                targeting_type: 40
                            }]
                        }],
                        is_segment: !1
                    }],
                    id: 1309148,
                    additionalType: "",
                    isAsync: !1,
                    variations: {
                        1622447: {
                            id: 1622447,
                            name: "Variation 1",
                            traffic: 50,
                            masterVariationId: 0,
                            modifications: [{
                                id: 5303420,
                                selector: "",
                                type: "addCSS",
                                value: ".HOT-705 .HOT-705-ways-to-pay-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;width:100%;border:1px solid #c8c8c8;height:56px;cursor:pointer}.HOT-705 .HOT-705-ways-to-pay-container img{height:42px}@media screen and (min-width:768px) and (max-width:959px){.HOT-705 .HOT-705-ways-to-pay-container .HOT-705-more-ways{max-width:120px}}.HOT-705 .HOT-705-ways-to-pay-container .HOT-705-ways-to-pay{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:20px;color:#000;font-family:GillSansNova-Medium;font-size:.75rem;font-style:normal;font-weight:600;line-height:.75rem;padding:0 16px}.HOT-705 .HOT-705-ways-to-pay-container .HOT-705-ways-to-pay p.HOT-705-learn-more,.HOT-705 .HOT-705-ways-to-pay-container .HOT-705-ways-to-pay p.HOT-705-more-ways{font-size:.85rem;line-height:.85rem}.HOT-705 .HOT-705-ways-to-pay-container .HOT-705-ways-to-pay .HOT-705-learn-more{color:#000;font-family:GillSansNova-Light;font-size:.75rem;font-style:normal;font-weight:600;line-height:.75rem;-webkit-text-decoration-line:underline;text-decoration-line:underline}.HOT-705 .HOT-705-ways-to-pay-container .HOT-705-ways-to-pay-terms p{color:#a0a0a0;font-family:GillSansNova-Light;font-size:11px;font-style:normal;font-weight:400;line-height:normal}.HOT-705 .HOT-705-ways-to-pay-slide a{color:#000}.HOT-705 .HOT-705-ways-to-pay-slide{position:fixed;top:0;height:95%;background-color:#fff;color:#fff;padding:42px 65px;-webkit-box-shadow:0 0 10px rgba(0,0,0,.5);box-shadow:0 0 10px rgba(0,0,0,.5);-webkit-transition:right .3s ease-in-out;transition:right .3s ease-in-out;z-index:100000000000000;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}@media screen and (min-width:768px){.HOT-705 .HOT-705-ways-to-pay-slide{right:-725px;width:585px}}@media screen and (max-width:767px){.HOT-705 .HOT-705-ways-to-pay-slide{width:300px;padding:24px 24px 10px 30px;right:-550px;height:97%}}.HOT-705 .HOT-705-ways-to-pay-slide-close{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;margin-bottom:30px;cursor:pointer}.HOT-705 .HOT-705-ways-to-pay-slide-close p{margin:0}.HOT-705 .HOT-705-ways-to-pay-slide-content{overflow-y:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;gap:16px;padding-right:20px}@media screen and (max-width:767px){.HOT-705 .HOT-705-ways-to-pay-slide-content{gap:15px}}.HOT-705 .HOT-705-ways-to-pay-slide h2{color:#000;font-size:26px;font-style:normal;font-weight:600;line-height:26px;max-width:440px}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-payment-options{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;gap:16px}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-payment-options img{max-width:45%;-o-object-fit:contain;object-fit:contain;height:100%}@media screen and (max-width:767px){.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-payment-options{-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-wrap:wrap;flex-wrap:wrap;gap:10px;margin-top:12px}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-payment-options img{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;max-width:100%;width:100%;height:auto}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-payment-options .HOT-705-brief{-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-payment-options .HOT-705-brief{margin:15px 0}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-payment-options .HOT-705-sub-heading{margin-bottom:10px}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-payment-options .HOT-705-free{border:1px solid #000;padding-top:6px;padding-bottom:3px;padding-left:7px;border-radius:3px;padding-right:7px;font-weight:500;font-size:16px;color:#000}.HOT-705 .HOT-705-ways-to-pay-slide h3{color:#000;font-family:GillSansNova-Medium;font-size:18px;font-style:normal;font-weight:600;line-height:18px}.HOT-705 .HOT-705-ways-to-pay-slide li,.HOT-705 .HOT-705-ways-to-pay-slide p{color:#000;font-family:GillSansNova-Light;font-size:16px;font-style:normal;font-weight:400;line-height:24px}.HOT-705 .HOT-705-ways-to-pay-slide li{margin-bottom:20px}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-continue-shopping{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:99%;min-height:50px;background-color:#fff;border:1px solid #000;color:#000;font-family:GillSansNova-Medium;font-style:normal;font-weight:600;text-align:center;text-transform:uppercase;cursor:pointer;margin:15px 0}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-continue-shopping p{margin:0;font-family:GillSansNova-Medium;font-size:15px;line-height:15px}.HOT-705 .HOT-705-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);z-index:5}"
                            }, {
                                selector: "",
                                type: "customScriptNew",
                                oldValue: '!function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n="object"==t(e)&&e&&e.Object===Object&&e,o="object"==("undefined"==typeof self?"undefined":t(self))&&self&&self.Object===Object&&self,c=(n||o||Function("return this")()).Symbol,a=(c&&c.toStringTag,c&&c.toStringTag,Date.now||function(){return(new Date).getTime()}),i=function(e,n,o){var c={wait:50,multiplier:1.1,timeout:0};o&&(c=function e(n,o){var c=n;return Object.keys(o).forEach((function(n){var a=o[n],i=c[n],r=i&&"object"===t(i)&&!(i instanceof Array);c[n]=r?e(i,a):a})),c}(c,o));for(var i=c,r=i.multiplier,s=i.wait,l=c.timeout?new Date(a()+c.timeout):null,d=[],u=function o(c,i,s){if(l&&l&&a()>l)return!1;var u=function(e){if(!e)return!1;var n={function:function(){return e()},string:function(){return document.querySelector(e)}}[t(e)];return!n||n()}(c);u?(d.push(u),d.length===e.length&&n(d)):setTimeout((function(){o(c,i*r)}),s?0:i)},p=0;p<e.length;p+=1){if("string"!=typeof e[p]&&"function"!=typeof e[p])throw"Every item in the poller array should be a function or a string";u(e[p],s,!0)}},r={trackerName:!1,propertyId:!1,analyticsReference:"ga",eventCache:[],sendEvents:!0,setDefaultCategory:function(t){return this.category=t,this},setDefaultAction:function(t){return this.action=t,this},setPropertyId:function(t){this.propertyId=t},setTrackerName:function(t){this.trackerName=t},useLegacyTracker:function(){this.analyticsReference="_gaq"},sendAuto:function(t,e,n){this.send(null,null,e,n,t)},sendNormalised:function(t,e){this.send(null,null,t,e)},send:function(e,n,o,c){var a=this,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,l=c||{},d=o,u=e||this.category,p=n||this.action,f=r;if(null!=f&&(0==f&&(f="Control"),d="Variation: "+f+" - "+o),"object"===t(l)&&l.sendOnce){var y="".concat(u).concat(p).concat(d);if(this.eventCache.indexOf(y)>-1)return!1;this.eventCache.push(y)}s(d);var g=this,m=function(t){if("_gaq"===g.analyticsReference)window._gaq.push(["_trackEvent",u,p,d,null,void 0===l.nonInteraction||l.nonInteraction]);else{var e={nonInteraction:!l.nonInteraction||l.nonInteraction};if(l.opts)for(var n in l.opts)e[n]=l.opts[n];window[g.analyticsReference]("".concat(t,".send"),"event",u,p,d,e)}};g.trackerName?1==this.sendEvents&&m(g.trackerName):i([function(){try{var t=window[g.analyticsReference].getAll();if(t&&t.length){if(!g.propertyId)return g.trackerName=t[0].get("name"),!0;for(var e=0;e<t.length;e+=1){var n=t[e];if(n.get("trackingId")===g.propertyId)return g.trackerName=n.get("name"),!0}}}catch(t){}}],(function(){1==a.sendEvents&&m(g.trackerName)}),{wait:150})}},s=function(t){localStorage.getItem("ucdebug")&&window.console&&"function"==typeof window.console.log&&console.log(t)},l="HOT-705",d=l,u="1",p=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="Test ID: HOT-705 Variation: 1 Label: "+t;0==f.initiate?r.sendNormalised(n,{sendOnce:e}):f.send(t)},f={initiate:!1,methods:["ga4"],tracker:!1,property:!1,uaRef:"ga",send:function(t){var e=this;this.methods.includes("ga4")&&i([function(){return"complete"===document.readyState}],(function(){void 0!==window.gtag?window.gtag("event","experimentation",{experiment_id:"".concat(d,"-").concat(u),experiment_label:t,send_to:e.property||"default"}):(window.dataLayer=window.dataLayer||[],void 0===window.customGtag&&(window.customGtag=function(){window.dataLayer.push(arguments)},window.customGtag("js",new Date),window.customGtag("config",e.property||"default")),window.customGtag("event","experimentation",{experiment_id:"".concat(d,"-").concat(u),experiment_label:t,send_to:e.property||"default"}))})),this.methods.includes("datalayer")&&i([function(){return!!window.dataLayer}],(function(){window.dataLayer.push({event:"experimentation",experiment_id:"".concat(d,"-").concat(u),experiment_label:t})})),this.methods.includes("ua")&&i([function(){return!!window[e.uaRef]}],(function(){var n=e.tracker||window[e.uaRef].getAll()[0].get("name");window[e.uaRef]("".concat(n,".send"),"event","experimentation","".concat(d,"-").concat(u),t,{nonInteraction:!0})}))}},y=l,g=function(){var t=document.querySelector(".".concat(y,"-ways-to-pay-slide")),e=document.querySelector(".".concat(y,"-ways-to-pay-container")),n=document.querySelector(".".concat(y,"-ways-to-pay-slide-close")),o=document.querySelector(".".concat(y,"-overlay")),c=document.querySelector(".".concat(y,"-continue-shopping")),a=window.innerWidth,i=document.querySelector("body");e.addEventListener("click",(function(){p("Click - User clicks “Learn more” CTA");var e="0px"===t.style.right;t.style.right=a<678?e?"-550px":"0px":e?"-725px":"0px",o.style.display=e?"none":"block",i.style.overflowY="hidden"})),n.addEventListener("click",(function(){p("Click - User clicks close CTA in slide out"),t.style.right=a<678?"-550px":"-725px",o.style.display="none",i.style.removeProperty("overflow-y")})),c.addEventListener("click",(function(){p("Click - User clicks “Continue Shopping” CTA in slide out"),t.style.right=a<678?"-550px":"-725px",o.style.display="none",i.style.removeProperty("overflow-y")}))};/MSIE|Trident|Edge\\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent)||i(["body"],(function(){var t;f.initiate=!0,f.method=["ga4"],f.property="G-B37NQR1RWZ",t=l,r.setDefaultCategory("Experimentation"),r.setDefaultAction("HotelChocolat - "+t),r.sendEvents=!0,document.documentElement.classList.add(t),document.documentElement.classList.add("".concat(t,"-").concat("1")),document.body.addEventListener("click",(function(t){var e=t.target;e.closest(".".concat(y,"-ways-to-pay-container"))?p("user clicks new gifting element"):e.closest(".".concat(y,"-ways-to-pay-slide-close"))?p("user clicks the close button within slideout"):e.closest(".".concat(y,"-continue-shopping"))&&p(\'user clicks "Continue Shopping" within slideout\')})),s(y+" Variation: 1"),p("Conditions Met"),(document.location.href.includes("/uk/checkout/shipping")||document.location.href.includes("uk/checkout/gift-options"))&&document.querySelector("form.checkout-multi-shipping.address")?i([\'[name="dwfrm_multishipping_shippingOptions_save"]\'],(function(){console.log("custom tracking initialized"),setTimeout((function(){document.querySelector(".address.checkout-multi-shipping").addEventListener("submit",(function(){var t=document.querySelector(\'[name="dwfrm_multishipping_shippingOptions_shipments_i0_giftingPackagePID"]\').value;t&&(console.log("gift option selected"),window.abtasty.send("event",{ec:"Action Tracking",ea:"Gift Option Selected",el:t,ev:1,caid:1309148}))}))}),300)})):i(["#product-content .product-add-to-cart"],(function(){var t=\'\\n      <div class="\'.concat(y,\'-ways-to-pay-container">\\n        <div class="\').concat(y,\'-ways-to-pay">\\n          <div class="\').concat(y,\'-ways-to-pay-left">\\n            <p class="\').concat(y,\'-more-ways">Sending as a gift? <u>Explore our gifting options.</u></p>\\n          </div>\\n          <div class="\').concat(y,\'-ways-to-pay-right">\\n            <img src="https://blcro.fra1.digitaloceanspaces.com/HC-705/Frame%203197.png" alt="Card">\\n          </div>\\n\\n      </div>\');document.querySelector("#product-content .product-variations")||document.querySelector("#product-content .HOT-705-ways-to-pay-container")?document.querySelector("#product-content .product-variations")&&i(["#product-content .HOT-705-ways-to-pay-container"],(function(){document.querySelector("#product-content .product-variations").after(document.querySelector("#product-content .HOT-705-ways-to-pay-container"))})):document.querySelector("#product-content .product-add-to-cart").insertAdjacentHTML("beforebegin",t),document.querySelectorAll("#product-content .product-variations .sleeveContent .sleeveBtn").forEach((function(t){t.addEventListener("click",(function(){var t=\'\\n                    <div class="\'.concat(y,\'-ways-to-pay-container">\\n                      <div class="\').concat(y,\'-ways-to-pay">\\n                        <div class="\').concat(y,\'-ways-to-pay-left">\\n                          <p class="\').concat(y,\'-more-ways">Sending as a gift? <u>Explore our gifting options.</u></p>\\n                        </div>\\n                        <div class="\').concat(y,\'-ways-to-pay-right">\\n                          <img src="https://blcro.fra1.digitaloceanspaces.com/HC-705/Frame%203197.png" alt="Card">\\n                        </div>\\n\\n                    </div>\');setTimeout((function(){var e=document.querySelector("#product-detail-wrapper #product-content .product-variations");e&&i(["#product-detail-wrapper #product-detail-wrapper .product-variations"],(function(){e.insertAdjacentHTML("afterend",t),function t(){document.querySelectorAll("#product-content .product-variations .sleeveContent .sleeveBtn").forEach((function(e){e.addEventListener("click",(function(){var e=\'\\n                <div class="\'.concat(y,\'-ways-to-pay-container">\\n                  <div class="\').concat(y,\'-ways-to-pay">\\n                    <div class="\').concat(y,\'-ways-to-pay-left">\\n                      <p class="\').concat(y,\'-more-ways">Sending as a gift? <u>Explore our gifting options.</u></p>\\n                    </div>\\n                    <div class="\').concat(y,\'-ways-to-pay-right">\\n                      <img src="https://blcro.fra1.digitaloceanspaces.com/HC-705/Frame%203197.png" alt="Card">\\n                    </div>\\n\\n                </div>\');setTimeout((function(){var n=document.querySelector("#product-detail-wrapper #product-content .product-variations");n&&i(["#product-detail-wrapper #product-detail-wrapper .product-variations"],(function(){n.insertAdjacentHTML("afterend",e),t(),g()}))}),600)}))}))}(),g()}))}),600)}))}));var e=\'\\n        <div class="\'.concat(y,\'-ways-to-pay-slide">\\n          <div class="\').concat(y,\'-ways-to-pay-slide-close">\\n            \').concat(\'\\n<svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">\\n  <path d="M15.8143 16.6357L9 10.2L2.18574 16.6357C1.9286 16.8786 1.67144 17 1.28573 17C0.5143 17 1.57005e-05 16.5143 1.57005e-05 15.7857C1.57005e-05 15.4214 0.128571 15.1786 0.385714 14.9357L7.20001 8.5L0.385714 2.06429C-0.128571 1.57857 -0.128571 0.85 0.385714 0.364286C0.899998 -0.121429 1.67146 -0.121429 2.18574 0.364286L9 6.8L15.8143 0.364286C16.3285 -0.121429 17.1 -0.121429 17.6143 0.364286C18.1286 0.85 18.1286 1.57857 17.6143 2.06429L10.8 8.5L17.6143 14.9357C18.1286 15.4214 18.1286 16.15 17.6143 16.6357C17.1 17.1214 16.3285 17.1214 15.8143 16.6357Z" fill="black"/>\\n</svg>\',\'\\n          </div>\\n          <div class="\').concat(y,\'-ways-to-pay-slide-content">\\n            <h2>Luxury Gifting</h2>\\n            <p class="\').concat(y,\'-following-options">We know the importance of making every detail perfect. Add a final flourish to your chocolate gifts with elegant gift bags, complimentary chocolate box gift sleeves and more.</p>\\n            \\n            <div class="\').concat(y,\'-payment-options">\\n              <img  src="https://blcro.fra1.digitaloceanspaces.com/HC-705/Frame%203198%20(1).jpg">\\n              <div class="\').concat(y,\'-brief">\\n              <h3 class="\').concat(y,\'-sub-heading">Personalised Message</h3>\\n              <p class="\').concat(y,\'-following-options">Witty or sentimental. Complimentary or congratulatory. You choose the words, we’ll provide the means, courtesy of a message card. They’re complimentary with every online order and there’s space for up to 200 characters (that’s about 30 words). A gift message option is available at checkout.</p><br><span class="\').concat(y,\'-free">Free<span>\\n             </div>\\n            \\n            </div>\\n                <div class="\').concat(y,\'-payment-options">\\n              <div class="\').concat(y,\'-brief">\\n              <h3 class="\').concat(y,\'-sub-heading">Signature Gift Bag and Box</h3>\\n              <p class="\').concat(y,\'-following-options">Ensure your gifts arrive in style by choosing to present them in a chic, ribbon-tied box or bag. Simply select one of these options at checkout.<br><ul><li style="margin-bottom:0px;">Gift Bag: £3.00</li><li>Gift Box: £5.00</li></ul></p>\\n              </div>\\n              <img  src="https://blcro.fra1.digitaloceanspaces.com/HC-705/Frame%203197%20(1).jpg" alt="Klarna">\\n             \\n            </div>\\n        \\n\\n            <div class="\').concat(y,\'-payment-options">\\n             <img  src="https://blcro.fra1.digitaloceanspaces.com/HC-705/Frame%203205.jpg" alt="Klarna">\\n             <div class="\').concat(y,\'-brief">\\n              <h3 class="\').concat(y,\'-sub-heading">Gift Cards</h3>\\n              <p class="\').concat(y,\'-following-options">Need something last-minute or not sure what they\\\'d like? Send a Hotel Chocolat gift card, either through the post or instantly via email.<br><a target="_blank" href="https://www.hotelchocolat.com/uk/gift-card.html"><u>Explore Gift Card Options</u></a></p>\\n              </div>\\n              \\n            </div>\\n\\n            <div class="\').concat(y,\'-payment-options">\\n\\n            </div>\\n            \\n            \\n            </div>\\n            <div class="\').concat(y,\'-continue-shopping">\\n              <p>Continue Shopping</p>\\n            </div>\\n        </div>\'),n=\'<div class="\'.concat(y,\'-overlay"></div>\'),o=document.querySelector("body");o.insertAdjacentHTML("afterbegin",e),o.insertAdjacentHTML("afterbegin",n),g(),setTimeout((function(){document.querySelectorAll(".".concat(y,"-ways-to-pay-container")).length>1&&document.querySelectorAll(".".concat(y,"-ways-to-pay-container")).item(1).remove()}),50)}))}))}();'
                            }, {
                                selector: "",
                                type: "customScriptNew",
                                oldValue: '!function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n="object"==t(e)&&e&&e.Object===Object&&e,o="object"==("undefined"==typeof self?"undefined":t(self))&&self&&self.Object===Object&&self,a=(n||o||Function("return this")()).Symbol,c=(a&&a.toStringTag,a&&a.toStringTag,Date.now||function(){return(new Date).getTime()}),i=function(e,n,o){var a={wait:50,multiplier:1.1,timeout:0};o&&(a=function e(n,o){var a=n;return Object.keys(o).forEach((function(n){var c=o[n],i=a[n],r=i&&"object"===t(i)&&!(i instanceof Array);a[n]=r?e(i,c):c})),a}(a,o));for(var i=a,r=i.multiplier,s=i.wait,l=a.timeout?new Date(c()+a.timeout):null,d=[],u=function o(a,i,s){if(l&&l&&c()>l)return!1;var u=function(e){if(!e)return!1;var n={function:function(){return e()},string:function(){return document.querySelector(e)}}[t(e)];return!n||n()}(a);u?(d.push(u),d.length===e.length&&n(d)):setTimeout((function(){o(a,i*r)}),s?0:i)},p=0;p<e.length;p+=1){if("string"!=typeof e[p]&&"function"!=typeof e[p])throw"Every item in the poller array should be a function or a string";u(e[p],s,!0)}},r={trackerName:!1,propertyId:!1,analyticsReference:"ga",eventCache:[],sendEvents:!0,setDefaultCategory:function(t){return this.category=t,this},setDefaultAction:function(t){return this.action=t,this},setPropertyId:function(t){this.propertyId=t},setTrackerName:function(t){this.trackerName=t},useLegacyTracker:function(){this.analyticsReference="_gaq"},sendAuto:function(t,e,n){this.send(null,null,e,n,t)},sendNormalised:function(t,e){this.send(null,null,t,e)},send:function(e,n,o,a){var c=this,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,l=a||{},d=o,u=e||this.category,p=n||this.action,f=r;if(null!=f&&(0==f&&(f="Control"),d="Variation: "+f+" - "+o),"object"===t(l)&&l.sendOnce){var g="".concat(u).concat(p).concat(d);if(this.eventCache.indexOf(g)>-1)return!1;this.eventCache.push(g)}s(d);var y=this,m=function(t){if("_gaq"===y.analyticsReference)window._gaq.push(["_trackEvent",u,p,d,null,void 0===l.nonInteraction||l.nonInteraction]);else{var e={nonInteraction:!l.nonInteraction||l.nonInteraction};if(l.opts)for(var n in l.opts)e[n]=l.opts[n];window[y.analyticsReference]("".concat(t,".send"),"event",u,p,d,e)}};y.trackerName?1==this.sendEvents&&m(y.trackerName):i([function(){try{var t=window[y.analyticsReference].getAll();if(t&&t.length){if(!y.propertyId)return y.trackerName=t[0].get("name"),!0;for(var e=0;e<t.length;e+=1){var n=t[e];if(n.get("trackingId")===y.propertyId)return y.trackerName=n.get("name"),!0}}}catch(t){}}],(function(){1==c.sendEvents&&m(y.trackerName)}),{wait:150})}},s=function(t){localStorage.getItem("ucdebug")&&window.console&&"function"==typeof window.console.log&&console.log(t)},l="HOT-705",d=l,u="1",p=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="Test ID: HOT-705 Variation: 1 Label: "+t;0==f.initiate?r.sendNormalised(n,{sendOnce:e}):f.send(t)},f={initiate:!1,methods:["ga4"],tracker:!1,property:!1,uaRef:"ga",send:function(t){var e=this;this.methods.includes("ga4")&&i([function(){return"complete"===document.readyState}],(function(){void 0!==window.gtag?window.gtag("event","experimentation",{experiment_id:"".concat(d,"-").concat(u),experiment_label:t,send_to:e.property||"default"}):(window.dataLayer=window.dataLayer||[],void 0===window.customGtag&&(window.customGtag=function(){window.dataLayer.push(arguments)},window.customGtag("js",new Date),window.customGtag("config",e.property||"default")),window.customGtag("event","experimentation",{experiment_id:"".concat(d,"-").concat(u),experiment_label:t,send_to:e.property||"default"}))})),this.methods.includes("datalayer")&&i([function(){return!!window.dataLayer}],(function(){window.dataLayer.push({event:"experimentation",experiment_id:"".concat(d,"-").concat(u),experiment_label:t})})),this.methods.includes("ua")&&i([function(){return!!window[e.uaRef]}],(function(){var n=e.tracker||window[e.uaRef].getAll()[0].get("name");window[e.uaRef]("".concat(n,".send"),"event","experimentation","".concat(d,"-").concat(u),t,{nonInteraction:!0})}))}},g=l,y=function(){var t=document.querySelector(".".concat(g,"-ways-to-pay-slide")),e=document.querySelector(".".concat(g,"-ways-to-pay-container")),n=document.querySelector(".".concat(g,"-ways-to-pay-slide-close")),o=document.querySelector(".".concat(g,"-overlay")),a=document.querySelector(".".concat(g,"-continue-shopping")),c=window.innerWidth,i=document.querySelector("body");e.addEventListener("click",(function(){p("Click - User clicks “Learn more” CTA");var e="0px"===t.style.right;t.style.right=c<678?e?"-550px":"0px":e?"-725px":"0px",o.style.display=e?"none":"block",i.style.overflowY="hidden"})),n.addEventListener("click",(function(){p("Click - User clicks close CTA in slide out"),t.style.right=c<678?"-550px":"-725px",o.style.display="none",i.style.removeProperty("overflow-y")})),a.addEventListener("click",(function(){p("Click - User clicks “Continue Shopping” CTA in slide out"),t.style.right=c<678?"-550px":"-725px",o.style.display="none",i.style.removeProperty("overflow-y")}))};/MSIE|Trident|Edge\\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent)||i(["#product-content .product-add-to-cart"],(function(){var t;f.initiate=!0,f.method=["ga4"],f.property="G-B37NQR1RWZ",t=l,r.setDefaultCategory("Experimentation"),r.setDefaultAction("HotelChocolat - "+t),r.sendEvents=!0,document.documentElement.classList.add(t),document.documentElement.classList.add("".concat(t,"-").concat("1")),document.body.addEventListener("click",(function(t){var e=t.target;e.closest(".".concat(g,"-ways-to-pay-container"))?(p("user clicks new gifting element"),console.log("user clicks new gifting element")):e.closest(".".concat(g,"-ways-to-pay-slide-close"))?(p("user clicks the close button within slideout"),console.log("user clicks the close button within slideout")):e.closest(".".concat(g,"-continue-shopping"))&&(p(\'user clicks "Continue Shopping" within slideout\'),console.log(\'user clicks "Continue Shopping" within slideout\'))})),s(g+" Variation: 1"),p("Conditions Met"),i(["#product-content .product-add-to-cart"],(function(){var t=\'\\n      <div class="\'.concat(g,\'-ways-to-pay-container">\\n        <div class="\').concat(g,\'-ways-to-pay">\\n          <div class="\').concat(g,\'-ways-to-pay-left">\\n            <p class="\').concat(g,\'-more-ways">Sending as a gift? <u>Explore our gifting options.</u></p>\\n          </div>\\n          <div class="\').concat(g,\'-ways-to-pay-right">\\n            <img src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/gift-bag.png" alt="Card">\\n          </div>\\n\\n      </div>\');document.querySelector("#product-content .product-variations")||document.querySelector("#product-content .HOT-705-ways-to-pay-container")?document.querySelector("#product-content .product-variations")&&i(["#product-content .HOT-705-ways-to-pay-container"],(function(){document.querySelector("#product-content .product-variations").after(document.querySelector("#product-content .HOT-705-ways-to-pay-container")),console.log("sleeve")})):(document.querySelector("#product-content .product-add-to-cart").insertAdjacentHTML("beforebegin",t),console.log("add to cart")),document.querySelectorAll("#product-content .product-variations .sleeveContent .sleeveBtn").forEach((function(t){t.addEventListener("click",(function(){var t=\'\\n                    <div class="\'.concat(g,\'-ways-to-pay-container">\\n                      <div class="\').concat(g,\'-ways-to-pay">\\n                        <div class="\').concat(g,\'-ways-to-pay-left">\\n                          <p class="\').concat(g,\'-more-ways">Sending as a gift? <u>Explore our gifting options.</u></p>\\n                        </div>\\n                        <div class="\').concat(g,\'-ways-to-pay-right">\\n                          <img src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/gift-bag.png" alt="Card">\\n                        </div>\\n\\n                    </div>\');setTimeout((function(){var e=document.querySelector("#product-detail-wrapper #product-content .product-variations");e&&i(["#product-detail-wrapper #product-detail-wrapper .product-variations"],(function(){e.insertAdjacentHTML("afterend",t),console.log("Added gifting button before add to cart after checking data-attributes."),function t(){document.querySelectorAll("#product-content .product-variations .sleeveContent .sleeveBtn").forEach((function(e){e.addEventListener("click",(function(){var e=\'\\n                <div class="\'.concat(g,\'-ways-to-pay-container">\\n                  <div class="\').concat(g,\'-ways-to-pay">\\n                    <div class="\').concat(g,\'-ways-to-pay-left">\\n                      <p class="\').concat(g,\'-more-ways">Sending as a gift? <u>Explore our gifting options.</u></p>\\n                    </div>\\n                    <div class="\').concat(g,\'-ways-to-pay-right">\\n                      <img src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/gift-bag.png" alt="Card">\\n                    </div>\\n\\n                </div>\');setTimeout((function(){var n=document.querySelector("#product-detail-wrapper #product-content .product-variations");n&&i(["#product-detail-wrapper #product-detail-wrapper .product-variations"],(function(){n.insertAdjacentHTML("afterend",e),console.log("Added gifting button before add to cart after checking data-attributes."),t(),y()}))}),600)}))}))}(),y()}))}),600)}))}));var e=\'\\n        <div class="\'.concat(g,\'-ways-to-pay-slide">\\n          <div class="\').concat(g,\'-ways-to-pay-slide-close">\\n            \').concat(\'\\n<svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">\\n  <path d="M15.8143 16.6357L9 10.2L2.18574 16.6357C1.9286 16.8786 1.67144 17 1.28573 17C0.5143 17 1.57005e-05 16.5143 1.57005e-05 15.7857C1.57005e-05 15.4214 0.128571 15.1786 0.385714 14.9357L7.20001 8.5L0.385714 2.06429C-0.128571 1.57857 -0.128571 0.85 0.385714 0.364286C0.899998 -0.121429 1.67146 -0.121429 2.18574 0.364286L9 6.8L15.8143 0.364286C16.3285 -0.121429 17.1 -0.121429 17.6143 0.364286C18.1286 0.85 18.1286 1.57857 17.6143 2.06429L10.8 8.5L17.6143 14.9357C18.1286 15.4214 18.1286 16.15 17.6143 16.6357C17.1 17.1214 16.3285 17.1214 15.8143 16.6357Z" fill="black"/>\\n</svg>\',\'\\n          </div>\\n          <div class="\').concat(g,\'-ways-to-pay-slide-content">\\n            <h2>Luxury Gifting</h2>\\n            <p class="\').concat(g,\'-following-options">We know the importance of making every detail perfect. Add a final flourish to your chocolate gifts with elegant gift bags, complimentary chocolate box gift sleeves and more.</p>\\n            \\n            <div class="\').concat(g,\'-payment-options">\\n              <img  src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/christmas24-gift-card-message-image.jpg">\\n              <div class="\').concat(g,\'-brief">\\n              <h3 class="\').concat(g,\'-sub-heading">Personalised Message</h3>\\n              <p class="\').concat(g,\'-following-options">Witty or sentimental. Complimentary or congratulatory. You choose the words, we’ll provide the means, courtesy of a message card. They’re complimentary with every online order and there’s space for up to 200 characters (that’s about 30 words).A gift message option is available at checkout.</p><br><span class="\').concat(g,\'-free">Free<span>\\n             </div>\\n            \\n            </div>\\n                <div class="\').concat(g,\'-payment-options">\\n              <div class="\').concat(g,\'-brief">\\n              <h3 class="\').concat(g,\'-sub-heading">Signature Gift Bag and Box</h3>\\n              <p class="\').concat(g,\'-following-options">Ensure your gifts arrive in style by choosing to present them in a chic, ribbon-tied box or bag. Simply select one of these options at checkout.<br><ul><li style="margin-bottom:0px;">Gift Bag: £3.00</li><li>Gift Box: £5.00</li></ul></p>\\n              </div>\\n              <img  src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/christmas24-gift-bags-boxes-image.jpg" alt="Klarna">\\n             \\n            </div>\\n        \\n\\n            <div class="\').concat(g,\'-payment-options">\\n             <img  src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/christmas24-gift-card-image.jpg" alt="Klarna">\\n             <div class="\').concat(g,\'-brief">\\n              <h3 class="\').concat(g,\'-sub-heading">Gift Cards</h3>\\n              <p class="\').concat(g,\'-following-options">Need something last-minute or not sure what they\\\'d like? Send a Hotel Chocolat gift card, either through the post or instantly via email.<br><a target="_blank" href="https://www.hotelchocolat.com/uk/gift-card.html"><u>Explore Gift Card Options</u></a></p>\\n              </div>\\n              \\n            </div>\\n\\n            <div class="\').concat(g,\'-payment-options">\\n\\n            </div>\\n            \\n            \\n            </div>\\n            <div class="\').concat(g,\'-continue-shopping">\\n              <p>Continue Shopping</p>\\n            </div>\\n        </div>\'),n=\'<div class="\'.concat(g,\'-overlay"></div>\'),o=document.querySelector("body");o.insertAdjacentHTML("afterbegin",e),o.insertAdjacentHTML("afterbegin",n),y()}))}))}();'
                            }, {
                                id: 5324570,
                                selector: "",
                                type: "addCSS",
                                value: ".HOT-705 .HOT-705-ways-to-pay-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;width:100%;border:1px solid #c8c8c8;height:56px;cursor:pointer}.HOT-705 .HOT-705-ways-to-pay-container img{height:42px}@media screen and (min-width:768px) and (max-width:959px){.HOT-705 .HOT-705-ways-to-pay-container .HOT-705-more-ways{max-width:120px}}.HOT-705 .HOT-705-ways-to-pay-container .HOT-705-ways-to-pay{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:20px;color:#000;font-family:GillSansNova-Medium;font-size:.75rem;font-style:normal;font-weight:600;line-height:.75rem;padding:0 16px}.HOT-705 .HOT-705-ways-to-pay-container .HOT-705-ways-to-pay p.HOT-705-learn-more,.HOT-705 .HOT-705-ways-to-pay-container .HOT-705-ways-to-pay p.HOT-705-more-ways{font-size:.85rem;line-height:.85rem}.HOT-705 .HOT-705-ways-to-pay-container .HOT-705-ways-to-pay .HOT-705-learn-more{color:#000;font-family:GillSansNova-Light;font-size:.75rem;font-style:normal;font-weight:600;line-height:.75rem;-webkit-text-decoration-line:underline;text-decoration-line:underline}.HOT-705 .HOT-705-ways-to-pay-container .HOT-705-ways-to-pay-terms p{color:#a0a0a0;font-family:GillSansNova-Light;font-size:11px;font-style:normal;font-weight:400;line-height:normal}.HOT-705 .HOT-705-ways-to-pay-slide a{color:#000}.HOT-705 .HOT-705-ways-to-pay-slide{position:fixed;top:0;height:95%;background-color:#fff;color:#fff;padding:42px 65px;-webkit-box-shadow:0 0 10px rgba(0,0,0,.5);box-shadow:0 0 10px rgba(0,0,0,.5);-webkit-transition:right .3s ease-in-out;transition:right .3s ease-in-out;z-index:100000000000000;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}@media screen and (min-width:768px){.HOT-705 .HOT-705-ways-to-pay-slide{right:-725px;width:585px}}@media screen and (max-width:767px){.HOT-705 .HOT-705-ways-to-pay-slide{width:300px;padding:24px 24px 10px 30px;right:-550px;height:97%}}.HOT-705 .HOT-705-ways-to-pay-slide-close{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;margin-bottom:30px;cursor:pointer}.HOT-705 .HOT-705-ways-to-pay-slide-close p{margin:0}.HOT-705 .HOT-705-ways-to-pay-slide-content{overflow-y:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;gap:16px;padding-right:20px}@media screen and (max-width:767px){.HOT-705 .HOT-705-ways-to-pay-slide-content{gap:15px}}.HOT-705 .HOT-705-ways-to-pay-slide h2{color:#000;font-size:26px;font-style:normal;font-weight:600;line-height:26px;max-width:440px}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-payment-options{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;gap:16px}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-payment-options img{max-width:45%;-o-object-fit:contain;object-fit:contain;height:100%}@media screen and (max-width:767px){.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-payment-options{-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-wrap:wrap;flex-wrap:wrap;gap:10px;margin-top:12px}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-payment-options img{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;max-width:100%;width:100%;height:auto}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-payment-options .HOT-705-brief{-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-payment-options .HOT-705-brief{margin:15px 0}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-payment-options .HOT-705-sub-heading{margin-bottom:10px}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-payment-options .HOT-705-free{border:1px solid #000;padding-top:6px;padding-bottom:3px;padding-left:7px;border-radius:3px;padding-right:7px;font-weight:500;font-size:16px;color:#000}.HOT-705 .HOT-705-ways-to-pay-slide h3{color:#000;font-family:GillSansNova-Medium;font-size:18px;font-style:normal;font-weight:600;line-height:18px}.HOT-705 .HOT-705-ways-to-pay-slide li,.HOT-705 .HOT-705-ways-to-pay-slide p{color:#000;font-family:GillSansNova-Light;font-size:16px;font-style:normal;font-weight:400;line-height:24px}.HOT-705 .HOT-705-ways-to-pay-slide li{margin-bottom:20px}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-continue-shopping{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:99%;min-height:50px;background-color:#fff;border:1px solid #000;color:#000;font-family:GillSansNova-Medium;font-style:normal;font-weight:600;text-align:center;text-transform:uppercase;cursor:pointer;margin:15px 0}.HOT-705 .HOT-705-ways-to-pay-slide .HOT-705-continue-shopping p{margin:0;font-family:GillSansNova-Medium;font-size:15px;line-height:15px}.HOT-705 .HOT-705-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);z-index:5}"
                            }]
                        },
                        1622449: {
                            id: 1622449,
                            name: "Control Variation",
                            traffic: 50,
                            masterVariationId: 0,
                            modifications: [{
                                selector: null,
                                type: "customScriptNew",
                                oldValue: '!function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n="object"==t(e)&&e&&e.Object===Object&&e,o="object"==("undefined"==typeof self?"undefined":t(self))&&self&&self.Object===Object&&self,i=(n||o||Function("return this")()).Symbol,a=(i&&i.toStringTag,i&&i.toStringTag,Date.now||function(){return(new Date).getTime()}),r=function(e,n,o){var i={wait:50,multiplier:1.1,timeout:0};o&&(i=function e(n,o){var i=n;return Object.keys(o).forEach((function(n){var a=o[n],r=i[n],c=r&&"object"===t(r)&&!(r instanceof Array);i[n]=c?e(r,a):a})),i}(i,o));for(var r=i,c=r.multiplier,u=r.wait,s=i.timeout?new Date(a()+i.timeout):null,d=[],f=function o(i,r,u){if(s&&s&&a()>s)return!1;var f=function(e){if(!e)return!1;var n={function:function(){return e()},string:function(){return document.querySelector(e)}}[t(e)];return!n||n()}(i);f?(d.push(f),d.length===e.length&&n(d)):setTimeout((function(){o(i,r*c)}),u?0:r)},l=0;l<e.length;l+=1){if("string"!=typeof e[l]&&"function"!=typeof e[l])throw"Every item in the poller array should be a function or a string";f(e[l],u,!0)}},c={trackerName:!1,propertyId:!1,analyticsReference:"ga",eventCache:[],sendEvents:!0,setDefaultCategory:function(t){return this.category=t,this},setDefaultAction:function(t){return this.action=t,this},setPropertyId:function(t){this.propertyId=t},setTrackerName:function(t){this.trackerName=t},useLegacyTracker:function(){this.analyticsReference="_gaq"},sendAuto:function(t,e,n){this.send(null,null,e,n,t)},sendNormalised:function(t,e){this.send(null,null,t,e)},send:function(e,n,o,i){var a=this,c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,s=i||{},d=o,f=e||this.category,l=n||this.action,m=c;if(null!=m&&(0==m&&(m="Control"),d="Variation: "+m+" - "+o),"object"===t(s)&&s.sendOnce){var g="".concat(f).concat(l).concat(d);if(this.eventCache.indexOf(g)>-1)return!1;this.eventCache.push(g)}u(d);var p=this,y=function(t){if("_gaq"===p.analyticsReference)window._gaq.push(["_trackEvent",f,l,d,null,void 0===s.nonInteraction||s.nonInteraction]);else{var e={nonInteraction:!s.nonInteraction||s.nonInteraction};if(s.opts)for(var n in s.opts)e[n]=s.opts[n];window[p.analyticsReference]("".concat(t,".send"),"event",f,l,d,e)}};p.trackerName?1==this.sendEvents&&y(p.trackerName):r([function(){try{var t=window[p.analyticsReference].getAll();if(t&&t.length){if(!p.propertyId)return p.trackerName=t[0].get("name"),!0;for(var e=0;e<t.length;e+=1){var n=t[e];if(n.get("trackingId")===p.propertyId)return p.trackerName=n.get("name"),!0}}}catch(t){}}],(function(){1==a.sendEvents&&y(p.trackerName)}),{wait:150})}},u=function(t){localStorage.getItem("ucdebug")&&window.console&&"function"==typeof window.console.log&&console.log(t)},s="HOT-670",d="control",f=s,l=d,m={initiate:!1,methods:["ga4"],tracker:!1,property:!1,uaRef:"ga",send:function(t){var e=this;this.methods.includes("ga4")&&r([function(){return"complete"===document.readyState}],(function(){void 0!==window.gtag?window.gtag("event","experimentation",{experiment_id:"".concat(f,"-").concat(l),experiment_label:t,send_to:e.property||"default"}):(window.dataLayer=window.dataLayer||[],void 0===window.customGtag&&(window.customGtag=function(){window.dataLayer.push(arguments)},window.customGtag("js",new Date),window.customGtag("config",e.property||"default")),window.customGtag("event","experimentation",{experiment_id:"".concat(f,"-").concat(l),experiment_label:t,send_to:e.property||"default"}))})),this.methods.includes("datalayer")&&r([function(){return!!window.dataLayer}],(function(){window.dataLayer.push({event:"experimentation",experiment_id:"".concat(f,"-").concat(l),experiment_label:t})})),this.methods.includes("ua")&&r([function(){return!!window[e.uaRef]}],(function(){var n=e.tracker||window[e.uaRef].getAll()[0].get("name");window[e.uaRef]("".concat(n,".send"),"event","experimentation","".concat(f,"-").concat(l),t,{nonInteraction:!0})}))}},g=s,p=d;/MSIE|Trident|Edge\\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent)||r(["body"],(function(){var t,e;t=s,e=d,c.setDefaultCategory("Experimentation"),c.setDefaultAction("HotelChocolat - "+t),c.sendEvents=!0,document.documentElement.classList.add(t),document.documentElement.classList.add("".concat(t,"-").concat(e)),u(g+" Variation: "+p),function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="Test ID: "+f+" Variation: "+l+" Label: "+t;0==m.initiate?c.sendNormalised(n,{sendOnce:e}):m.send(t)}("Conditions Met")}))}();'
                            }]
                        }
                    }
                },
                1315112: {
                    name: "HOT-707 | Clearer Register Page",
                    traffic: 100,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 33,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/uk/checkout"
                        }, {
                            include: !0,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/my-account/register"
                        }],
                        ipScope: [{
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "532270630"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "523402111"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1991466549"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "532270619"
                        }],
                        testId: 1315112,
                        qaUrlParameterEnabled: !1
                    },
                    campaignHash: "23f60bb9495fb8a6485e9413876a1641",
                    id: 1315112,
                    additionalType: "",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1629784: {
                            id: 1629784,
                            traffic: 100,
                            name: "Variation 1"
                        },
                        1629785: {
                            id: 1629785,
                            traffic: 0,
                            name: "Control Variation"
                        }
                    }
                },
                1315114: {
                    name: "HOT-702 - Add to Bag Upsell Iteration (Desktop) - Variation 2 - (personalization)",
                    traffic: 100,
                    type: "subsegment",
                    parentID: 1315115,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 22,
                    mutationObserverEnabled: !0,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/uk"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://staging.hotelchocolat.com/uk"
                        }],
                        selectorScope: [{
                            include: !0,
                            condition: 45,
                            value: '#product-detail-wrapper #add-to-cart[value="Add to Bag"]'
                        }],
                        testId: 1315114,
                        qaUrlParameterEnabled: !1
                    },
                    audienceTrigger: [{
                        name: "Check local storage for cc",
                        id: "7a053f7b-1a38-455f-a69d-10e91958cb33",
                        targeting_groups: [{
                            position: 0,
                            id: "62deb6e4-988b-4c8c-b87c-f43def61eb54",
                            targetings: [{
                                id: "b30f9d0b-dfb2-4d22-a072-892d07fa052b",
                                operator: "auto",
                                position: 0,
                                conditions: [{
                                    id: "441cbbd9-e2ef-4f5c-9fd3-51d2160c0092",
                                    value: 'function checkProCC(){for(let e=0;e<localStorage.length;e++){const o=localStorage.key(e);if(o.startsWith("configData"))try{const e=localStorage.getItem(o),r=JSON.parse(e);if(r&&r.pro&&void 0!==r.pro.cc)return 1===r.pro.cc}catch(e){console.error("Error parsing configData from localStorage for key:",o,e)}}return!1}var pollerLite=function(e,o,r){void 0===r&&(r=1e4);var t=Date.now(),n=setInterval((function(){e.every((function(e){return"function"==typeof e?e():!!document.querySelector(e)}))?(clearInterval(n),o()):Date.now()-t>=r&&(clearInterval(n),console.error("Polling exceeded maximum time limit"))}),25)};pollerLite([function(){return checkProCC()}],(function(){abResolve(!0)}));',
                                    isAsync: !0
                                }],
                                targeting_type: 40
                            }]
                        }],
                        is_segment: !1
                    }],
                    audienceSegment: [{
                        name: "Desktop Visitors",
                        id: "265aa396-af84-4d94-a303-ecabc56ce45b",
                        targeting_groups: [{
                            position: 0,
                            id: "a37e8ff6-3ee5-48f3-8d60-5f179aa3aff8",
                            targetings: [{
                                id: "4d18614e-af52-4796-921f-f3ca46b5ab56",
                                operator: "auto",
                                position: 0,
                                conditions: [{
                                    id: "93baf37b-2cc4-493c-a0d4-2fbe613cbeb9",
                                    value: 3,
                                    is_segment_type: !0,
                                    include: !0
                                }],
                                targeting_type: 17
                            }]
                        }],
                        is_segment: !0
                    }],
                    id: 1315114,
                    additionalType: "",
                    isAsync: !1,
                    variations: {
                        1629787: {
                            id: 1629787,
                            name: "Variation 2",
                            traffic: 100,
                            masterVariationId: 0,
                            modifications: [{
                                selector: "",
                                type: "customScriptNew",
                                oldValue: '!function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e,n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},c="object"==t(n)&&n&&n.Object===Object&&n,a="object"==("undefined"==typeof self?"undefined":t(self))&&self&&self.Object===Object&&self,o=(c||a||Function("return this")()).Symbol,i=(o&&o.toStringTag,o&&o.toStringTag,Date.now||function(){return(new Date).getTime()}),r=function(e,n,c){var a={wait:50,multiplier:1.1,timeout:0};c&&(a=function e(n,c){var a=n;return Object.keys(c).forEach((function(n){var o=c[n],i=a[n],r=i&&"object"===t(i)&&!(i instanceof Array);a[n]=r?e(i,o):o})),a}(a,c));for(var o=a,r=o.multiplier,s=o.wait,d=a.timeout?new Date(i()+a.timeout):null,l=[],u=function c(a,o,s){if(d&&d&&i()>d)return!1;var u=function(e){if(!e)return!1;var n={function:function(){return e()},string:function(){return document.querySelector(e)}}[t(e)];return!n||n()}(a);u?(l.push(u),l.length===e.length&&n(l)):setTimeout((function(){c(a,o*r)}),s?0:o)},p=0;p<e.length;p+=1){if("string"!=typeof e[p]&&"function"!=typeof e[p])throw"Every item in the poller array should be a function or a string";u(e[p],s,!0)}},s={trackerName:!1,propertyId:!1,analyticsReference:"ga",eventCache:[],sendEvents:!0,setDefaultCategory:function(t){return this.category=t,this},setDefaultAction:function(t){return this.action=t,this},setPropertyId:function(t){this.propertyId=t},setTrackerName:function(t){this.trackerName=t},useLegacyTracker:function(){this.analyticsReference="_gaq"},sendAuto:function(t,e,n){this.send(null,null,e,n,t)},sendNormalised:function(t,e){this.send(null,null,t,e)},send:function(e,n,c,a){var o=this,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,s=a||{},l=c,u=e||this.category,p=n||this.action,m=i;if(null!=m&&(0==m&&(m="Control"),l="Variation: "+m+" - "+c),"object"===t(s)&&s.sendOnce){var f="".concat(u).concat(p).concat(l);if(this.eventCache.indexOf(f)>-1)return!1;this.eventCache.push(f)}d(l);var v=this,y=function(t){if("_gaq"===v.analyticsReference)window._gaq.push(["_trackEvent",u,p,l,null,void 0===s.nonInteraction||s.nonInteraction]);else{var e={nonInteraction:!s.nonInteraction||s.nonInteraction};if(s.opts)for(var n in s.opts)e[n]=s.opts[n];window[v.analyticsReference]("".concat(t,".send"),"event",u,p,l,e)}};v.trackerName?1==this.sendEvents&&y(v.trackerName):r([function(){try{var t=window[v.analyticsReference].getAll();if(t&&t.length){if(!v.propertyId)return v.trackerName=t[0].get("name"),!0;for(var e=0;e<t.length;e+=1){var n=t[e];if(n.get("trackingId")===v.propertyId)return v.trackerName=n.get("name"),!0}}}catch(t){}}],(function(){1==o.sendEvents&&y(v.trackerName)}),{wait:150})}},d=function(t){localStorage.getItem("ucdebug")&&window.console&&"function"==typeof window.console.log&&console.log(t)},l="HOT-702",u=l,p="2",m=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="Test ID: HOT-702 Variation: 2 Label: "+t;0==f.initiate?s.sendNormalised(n,{sendOnce:e}):f.send(t)},f={initiate:!1,methods:["ga4"],tracker:!1,property:!1,uaRef:"ga",send:function(t){var e=this;this.methods.includes("ga4")&&r([function(){return"complete"===document.readyState}],(function(){void 0!==window.gtag?window.gtag("event","experimentation",{experiment_id:"".concat(u,"-").concat(p),experiment_label:t,send_to:e.property||"default"}):(window.dataLayer=window.dataLayer||[],void 0===window.customGtag&&(window.customGtag=function(){window.dataLayer.push(arguments)},window.customGtag("js",new Date),window.customGtag("config",e.property||"default")),window.customGtag("event","experimentation",{experiment_id:"".concat(u,"-").concat(p),experiment_label:t,send_to:e.property||"default"}))})),this.methods.includes("datalayer")&&r([function(){return!!window.dataLayer}],(function(){window.dataLayer.push({event:"experimentation",experiment_id:"".concat(u,"-").concat(p),experiment_label:t})})),this.methods.includes("ua")&&r([function(){return!!window[e.uaRef]}],(function(){var n=e.tracker||window[e.uaRef].getAll()[0].get("name");window[e.uaRef]("".concat(n,".send"),"event","experimentation","".concat(u,"-").concat(p),t,{nonInteraction:!0})}))}},v=l,y="2",g=function(){var t;t=l,s.setDefaultCategory("Experimentation"),s.setDefaultAction("HotelChocolat - "+t),s.sendEvents=!0,document.documentElement.classList.add(t),document.documentElement.classList.add("".concat(t,"-").concat("2")),m("Conditions Met"),r(["#main #primary","#mini-cart",function(){return window.dataLayer}],(function(){document.documentElement.classList.add("".concat(v,"-expbegins"));var t=window.dataLayer.find((function(t){return"productDetails"==t.event})).product_image,n=\'\\n  \\n    <div class="\'.concat(v,"-atc-holder ").concat(v,\'-hidden">\\n    \\n      <div class="\').concat(v,\'-atc">\\n      \\n        \').concat(window.outerWidth>600?\'\\n          <div class="\'.concat(v,\'-atc--proddetails">\\n            <div class="\').concat(v,\'-atc--proddetails--image">\\n              <img src="\').concat(t,\'" alt="Product Image">\\n            </div>\\n            <div class="\').concat(v,\'-atc--proddetails--text">\\n              <h3><span id="\').concat(v,\'-product-quantity"></span> added to the basket</h3>\\n              <p id="\').concat(v,\'-product-name" class="\').concat(v,\'-atc--name"></p>\\n              <p id="\').concat(v,\'-product-price" class="\').concat(v,\'-atc--price"></p>\\n            </div>\\n          </div>\\n\\n        \'):\'\\n          <div class="\'.concat(v,\'-atc--proddetails">\\n            <div class="\').concat(v,\'-atc--proddetails--mobiletick">\\n              <h3><span id="\').concat(v,\'-product-quantity"></span> added to the basket</h3>\\n            </div>\\n            <div class="\').concat(v,\'-mobile-atc-holder">\\n              <div class="\').concat(v,\'-atc--proddetails--image">\\n                <img src="\').concat(t,\'" alt="Product Image">\\n              </div>\\n              <div class="\').concat(v,\'-atc--proddetails--text">\\n                \\n                <p id="\').concat(v,\'-product-name" class="\').concat(v,\'-atc--name"></p>\\n                <p id="\').concat(v,\'-product-price" class="\').concat(v,\'-atc--price"></p>\\n              </div>\\n            </div>\\n            \\n          </div>\\n\\n        \'),\'\\n        <div class="\').concat(v,\'-atc--checkout">\\n\\n          <p class="\').concat(v,\'-totals"><span class="\').concat(v,\'-subtotal">Subtotal</span><span class="\').concat(v,\'-total">\').concat(document.querySelector(".mini-cart-wrapper .subtotal")?document.querySelector(".mini-cart-wrapper .subtotal").innerText:"£0.00",\' </span></p>\\n          <p class="\').concat(v,\'-items"><span class="\').concat(v,\'-subitems">\').concat(document.querySelector(".minicart-total-qty").innerText," ").concat(parseInt(document.querySelector(".minicart-total-qty").innerText)>1?"items":"item",\'</span> in your basket</p>\\n          <a href="/basket" id="\').concat(v,\'-checkout" class="\').concat(v,\'-atc--checkout--button">Proceed to Checkout</a>\\n          <a href="#" id="\').concat(v,\'-continue-shopping" class="\').concat(v,\'-atc--checkout--button secondary">Continue Shopping</a>\\n\\n        </div>\\n      \\n      </div>\\n\\n      <div class="\').concat(v,"-upsells upsell-2 ").concat(v,"-upsells--v").concat(y,\'" style="display:block;">\\n        <div class="\').concat(v,"-upsellcontainer ab-atc-upsells ab-atc-upsells--mightalsolike ab-atc-upsells--mightalsolike--v").concat(y,\'"></div>\\n      </div>\\n      <div class="\').concat(v,"-upsells ").concat(v,"-upsells--v").concat(y,\'">\\n        <div class="\').concat(v,"-upsellcontainer ab-atc-upsells ab-atc-upsells--recentlyviewed ab-atc-upsells--recentlyviewed--v").concat(y,\'"></div>\\n      </div>\\n      \\n    </div>\\n  \\n  \\n  \');document.getElementById("primary").insertAdjacentHTML("afterbegin",n),document.body.addEventListener("click",(function(t){var n;("add-to-cart"==t.target.id||t.target.closest("#add-to-cart"))&&(t.preventDefault(),t.target.classList.contains("add-to-cart-disabled")||(function(){var t,n;window.outerWidth<600&&window.scrollTo(0,0);var c=document.querySelector("#page_heading h1").innerText,a=document.querySelector(".product-price .price-sales").innerText,o=parseFloat(a.replace("£","").replace(",","")),i=document.querySelector(\'.quantity input[name="Quantity"]\').value;document.getElementById("".concat(v,"-product-name")).innerText=c;var r="".concat(i,i>1?" items were":" item was");document.getElementById("".concat(v,"-product-quantity")).innerText=r,document.getElementById("".concat(v,"-product-price")).innerText=i>1?"£"+(o*i).toFixed(2):a;var s=null!==(t=document.querySelector(".mini-cart-wrapper .subtotal"))&&void 0!==t&&t.innerText?document.querySelector(".mini-cart-wrapper .subtotal").innerText:"£0.00",d=parseFloat(s.replace("£","").replace(",",""));s="£"+(d+o*i).toFixed(2),document.querySelector(".".concat(v,"-total")).innerText=s;var l=null!==(n=document.querySelector(".minicart-total-qty"))&&void 0!==n&&n.innerText?document.querySelector(".minicart-total-qty").innerText:"0";document.querySelector(".".concat(v,"-subitems")).innerText=parseInt(l)+parseInt(i)+(parseInt(l)+parseInt(i)==1?" item":" items"),document.querySelector(".".concat(v,"-atc-holder")).classList.remove("".concat(v,"-hidden")),document.getElementById("product-detail-wrapper").classList.add("".concat(v,"-hidden")),clearInterval(e),e=setInterval((function(){var t,e,n,c;null!==(t=document.getElementById("mini-cart"))&&void 0!==t&&t.classList.contains("".concat(v,"-disabled"))||null===(n=document.getElementById("mini-cart"))||void 0===n||n.classList.add("".concat(v,"-disabled")),null!==(e=document.getElementById("mini-cart"))&&void 0!==e&&e.classList.contains("hover")&&(null===(c=document.getElementById("mini-cart"))||void 0===c||c.classList.remove("hover"))}),1);var u=5e3;window.outerWidth<600&&(u=500),setTimeout((function(){clearInterval(e)}),u)}(),m("Click - add to bag clicked, ATB upsell displayed",!0))),t.target.id=="".concat(v,"-continue-shopping")&&(t.preventDefault(),document.querySelector(".".concat(v,"-atc-holder")).classList.add("".concat(v,"-hidden")),document.getElementById("product-detail-wrapper").classList.remove("".concat(v,"-hidden")),null===(n=document.getElementById("mini-cart"))||void 0===n||n.classList.remove("".concat(v,"-disabled")),clearInterval(e),m("Click - continue shopping clicked from within ATB Upsell",!0)),t.target.id=="".concat(v,"-checkout")&&m("Click - proceed to checkout clicked from within ATB Upsell",!0)}))}))};if(!/MSIE|Trident|Edge\\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent)){var h=l;document.documentElement.classList.contains("".concat(h))||r(["body"],(function(){g()}))}}();'
                            }, {
                                id: 5320920,
                                selector: "",
                                type: "addCSS",
                                value: ".HOT-702.HOT-702-expbegins .HOT-702-hidden{display:none;visibility:hidden}.HOT-702.HOT-702-expbegins .HC-158__sticky_add_to_car{display:none!important}.HOT-702.HOT-702-expbegins #add-to-cart{background:#000!important;color:#fff!important;overflow:hidden}.HOT-702.HOT-702-expbegins #add-to-cart *{visibility:hidden!important;display:none!important}.HOT-702.HOT-702-expbegins #add-to-cart:before{content:\"Add to bag\";visibility:visible!important;display:block!important}.HOT-702.HOT-702-expbegins .HOT-702-disabled{background:0 0!important}.HOT-702.HOT-702-expbegins .HOT-702-disabled.hover .menu-title svg.icon{fill:#fff}@media all and (max-width:600px){.HOT-702.HOT-702-expbegins .HOT-702-disabled.hover .menu-title svg.icon{fill:#fff;-webkit-filter:none;filter:none}}.HOT-702.HOT-702-expbegins .HOT-702-disabled .menu-text{color:#fff}.HOT-702.HOT-702-expbegins .HOT-702-disabled .drop-down-options{display:none;visibility:hidden}.HOT-702.HOT-702-expbegins .HOT-702-atc-holder{width:100%;min-height:700px;background:#fff;position:relative;padding:20px 0;z-index:10}.HOT-702.HOT-702-expbegins .HOT-702-atc{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;margin-bottom:40px}@media all and (max-width:767px){.HOT-702.HOT-702-expbegins .HOT-702-atc{margin-bottom:20px}}@media all and (max-width:600px){.HOT-702.HOT-702-expbegins .HOT-702-atc{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}}.HOT-702.HOT-702-expbegins .HOT-702-atc .HOT-702-mobile-atc-holder{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails{width:70%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;padding:0 10%;-webkit-box-sizing:border-box;box-sizing:border-box}@media all and (max-width:767px){.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails{padding:0 5% 0 10px}}@media all and (max-width:600px){.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:0;width:100%}}.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails--mobiletick{width:100%;margin-bottom:10px}.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails--mobiletick h3{font-size:14px;color:#118f40;line-height:20px;letter-spacing:.2px;font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif;margin-bottom:15px;position:relative;padding-left:40px}.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails--mobiletick h3:before{background-image:url(\"data:image/svg+xml,%3Csvg width='12' height='11' viewBox='0 0 15 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.46614 11.7308L5.855 12.1343L6.21174 11.7021L14.2317 1.98706L14.2318 1.98701C14.5889 1.55427 14.4563 0.954074 14.0236 0.665451L13.7462 1.08141L14.0236 0.66545C13.6095 0.389247 13.0283 0.463996 12.7072 0.853052L12.7072 0.853063L5.7438 9.29096L2.1794 5.59487L2.17945 5.59482L2.17352 5.58888C1.82909 5.24351 1.24845 5.18611 0.845722 5.5107C0.434725 5.84196 0.373154 6.44439 0.751935 6.8394L0.752808 6.8403L5.46614 11.7308Z' fill='%23118F40' stroke='%23118F40'/%3E%3C/svg%3E\");content:\"\";position:absolute;left:10px;top:5px;width:12px;height:11px}.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails--image{width:168px}@media all and (max-width:600px){.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails--image{max-width:103px;width:100%;height:auto;padding-bottom:20px}}.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails--image img{width:100%;height:auto;max-width:100%}.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails--text{padding-left:80px;padding-top:10px}@media all and (max-width:767px){.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails--text{padding-left:60px}}@media all and (max-width:600px){.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails--text{padding-left:20px}}.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails--text h3{font-size:16px;color:#118f40;line-height:22px;letter-spacing:.2px;font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif;margin-bottom:15px;position:relative}@media all and (max-width:600px){.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails--text h3{font-size:14px;line-height:20px}}.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails--text h3:before{background-image:url(\"data:image/svg+xml,%3Csvg width='15' height='13' viewBox='0 0 15 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.46614 11.7308L5.855 12.1343L6.21174 11.7021L14.2317 1.98706L14.2318 1.98701C14.5889 1.55427 14.4563 0.954074 14.0236 0.665451L13.7462 1.08141L14.0236 0.66545C13.6095 0.389247 13.0283 0.463996 12.7072 0.853052L12.7072 0.853063L5.7438 9.29096L2.1794 5.59487L2.17945 5.59482L2.17352 5.58888C1.82909 5.24351 1.24845 5.18611 0.845722 5.5107C0.434725 5.84196 0.373154 6.44439 0.751935 6.8394L0.752808 6.8403L5.46614 11.7308Z' fill='%23118F40' stroke='%23118F40'/%3E%3C/svg%3E\");content:\"\";position:absolute;left:-30px;top:5px;width:15px;height:12px}.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails--text p{font-size:16px;color:#000;line-height:22px;letter-spacing:.2px;font-family:GillSansNova-Medium,Arial,Helvetica,sans-serif;margin-bottom:10px}@media all and (max-width:600px){.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails--text p{font-size:14px;line-height:20px}}.HOT-702.HOT-702-expbegins .HOT-702-atc--proddetails--text p.HOT-702-atc--price{font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif}.HOT-702.HOT-702-expbegins .HOT-702-atc--checkout{width:30%;max-width:270px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;background:#f0f0f0;padding:20px;-webkit-box-sizing:border-box;box-sizing:border-box}@media all and (max-width:600px){.HOT-702.HOT-702-expbegins .HOT-702-atc--checkout{width:100%;max-width:100%;border-top:1px solid #c8c8c8;padding-top:10px;background:0 0;padding:10px 0}}.HOT-702.HOT-702-expbegins .HOT-702-atc--checkout .HOT-702-totals{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:10px;font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif;font-size:18px;line-height:26px}@media all and (max-width:600px){.HOT-702.HOT-702-expbegins .HOT-702-atc--checkout .HOT-702-totals{padding:0 10px}}.HOT-702.HOT-702-expbegins .HOT-702-atc--checkout .HOT-702-items{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;margin-bottom:20px;font-family:GillSansNova-Medium,Arial,Helvetica,sans-serif;font-size:18px;line-height:26px}.HOT-702.HOT-702-expbegins .HOT-702-atc--checkout .HOT-702-items .HOT-702-subitems{margin-right:3px}@media all and (max-width:600px){.HOT-702.HOT-702-expbegins .HOT-702-atc--checkout .HOT-702-items{padding:0 10px}}.HOT-702.HOT-702-expbegins .HOT-702-atc--checkout--button{width:100%;padding:12px 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:#000;border:1px solid #000;margin-bottom:10px;text-transform:uppercase;font-family:GillSansNova-Medium,Arial,Helvetica,sans-serif;color:#fff;font-size:13px}.HOT-702.HOT-702-expbegins .HOT-702-atc--checkout--button:last-child{margin-bottom:0}@media all and (max-width:600px){.HOT-702.HOT-702-expbegins .HOT-702-atc--checkout--button{font-size:15px}}.HOT-702.HOT-702-expbegins .HOT-702-atc--checkout--button.secondary{background:#fff;color:#000}.HOT-702.HOT-702-expbegins .HOT-702-upsells{margin-bottom:40px}.HOT-702.HOT-702-expbegins .HOT-702-upsells h2{font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif;font-size:24px;line-height:32px}"
                            }]
                        }
                    }
                },
                1315115: {
                    id: 1315115,
                    name: "HOT-702 - Add to Bag Upsell Iteration (Desktop) (100%)",
                    type: "mastersegment",
                    sub_type: "sp",
                    parentID: 0,
                    priority: 0,
                    children: [1315114],
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    variations: {
                        1629788: {
                            id: 1629788,
                            name: "Variation 1"
                        }
                    }
                },
                1315633: {
                    name: "A/A Test for Purchase Data - Transaction Tag  (Checkout Change)",
                    traffic: 50,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 1,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "/"
                        }],
                        testId: 1315633,
                        qaUrlParameterEnabled: !1
                    },
                    campaignHash: "1a06a286ba9e1991b6d792fbf612c972",
                    id: 1315633,
                    additionalType: "",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1630420: {
                            id: 1630420,
                            traffic: 50,
                            name: "Variation 1"
                        }
                    }
                },
                1319121: {
                    name: "HOT-706 | Clearer Delivery Address Signposting",
                    traffic: 100,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 28,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/uk/checkout/shipping"
                        }],
                        ipScope: [{
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1991490833"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1354599491"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "532270630"
                        }],
                        testId: 1319121,
                        qaUrlParameterEnabled: !1
                    },
                    campaignHash: "d20d406525e43f215f4094a5b303a677",
                    id: 1319121,
                    additionalType: "",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1634846: {
                            id: 1634846,
                            traffic: 50,
                            name: "Variation 1"
                        },
                        1634847: {
                            id: 1634847,
                            traffic: 50,
                            name: "Control Variation"
                        }
                    }
                },
                1331930: {
                    name: "HOT-711 |  Add to Bag Upsell (HOT-671 Iteration)  (Mobile)",
                    traffic: 100,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 60,
                    mutationObserverEnabled: !0,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/uk"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://staging.hotelchocolat.com/uk"
                        }],
                        selectorScope: [{
                            include: !0,
                            condition: 45,
                            value: "#product-detail-wrapper"
                        }],
                        testId: 1331930,
                        qaUrlParameterEnabled: !1
                    },
                    audienceTrigger: [{
                        name: "Check local storage for cc",
                        id: "7a053f7b-1a38-455f-a69d-10e91958cb33",
                        targeting_groups: [{
                            position: 0,
                            id: "62deb6e4-988b-4c8c-b87c-f43def61eb54",
                            targetings: [{
                                id: "b30f9d0b-dfb2-4d22-a072-892d07fa052b",
                                operator: "auto",
                                position: 0,
                                conditions: [{
                                    id: "441cbbd9-e2ef-4f5c-9fd3-51d2160c0092",
                                    value: 'function checkProCC(){for(let e=0;e<localStorage.length;e++){const o=localStorage.key(e);if(o.startsWith("configData"))try{const e=localStorage.getItem(o),r=JSON.parse(e);if(r&&r.pro&&void 0!==r.pro.cc)return 1===r.pro.cc}catch(e){console.error("Error parsing configData from localStorage for key:",o,e)}}return!1}var pollerLite=function(e,o,r){void 0===r&&(r=1e4);var t=Date.now(),n=setInterval((function(){e.every((function(e){return"function"==typeof e?e():!!document.querySelector(e)}))?(clearInterval(n),o()):Date.now()-t>=r&&(clearInterval(n),console.error("Polling exceeded maximum time limit"))}),25)};pollerLite([function(){return checkProCC()}],(function(){abResolve(!0)}));',
                                    isAsync: !0
                                }],
                                targeting_type: 40
                            }]
                        }],
                        is_segment: !1
                    }],
                    audienceSegment: [{
                        name: "Mobile",
                        id: "93efdf24-ef8d-4442-9343-69a06d206b51",
                        targeting_groups: [{
                            position: 0,
                            id: "40b75a60-e52b-4b3e-b07e-1696777ad9d7",
                            targetings: [{
                                id: "57bb01de-1dd6-4200-85ae-c6cbe42bdfba",
                                operator: "auto",
                                position: 0,
                                conditions: [{
                                    id: "05d25353-918f-4a58-bfea-9dc85ad9d72e",
                                    value: 1,
                                    is_segment_type: !0,
                                    include: !0
                                }],
                                targeting_type: 17
                            }]
                        }],
                        is_segment: !0
                    }],
                    id: 1331930,
                    additionalType: "",
                    isAsync: !1,
                    variations: {
                        1650814: {
                            id: 1650814,
                            name: "Variation 1",
                            traffic: 50,
                            masterVariationId: 0,
                            modifications: [{
                                selector: "",
                                type: "customScriptNew",
                                oldValue: '!function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e,n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},c="object"==t(n)&&n&&n.Object===Object&&n,a="object"==("undefined"==typeof self?"undefined":t(self))&&self&&self.Object===Object&&self,o=(c||a||Function("return this")()).Symbol,i=(o&&o.toStringTag,o&&o.toStringTag,Date.now||function(){return(new Date).getTime()}),r=function(e,n,c){var a={wait:50,multiplier:1.1,timeout:0};c&&(a=function e(n,c){var a=n;return Object.keys(c).forEach((function(n){var o=c[n],i=a[n],r=i&&"object"===t(i)&&!(i instanceof Array);a[n]=r?e(i,o):o})),a}(a,c));for(var o=a,r=o.multiplier,d=o.wait,s=a.timeout?new Date(i()+a.timeout):null,l=[],u=function c(a,o,d){if(s&&s&&i()>s)return!1;var u=function(e){if(!e)return!1;var n={function:function(){return e()},string:function(){return document.querySelector(e)}}[t(e)];return!n||n()}(a);u?(l.push(u),l.length===e.length&&n(l)):setTimeout((function(){c(a,o*r)}),d?0:o)},p=0;p<e.length;p+=1){if("string"!=typeof e[p]&&"function"!=typeof e[p])throw"Every item in the poller array should be a function or a string";u(e[p],d,!0)}},d={trackerName:!1,propertyId:!1,analyticsReference:"ga",eventCache:[],sendEvents:!0,setDefaultCategory:function(t){return this.category=t,this},setDefaultAction:function(t){return this.action=t,this},setPropertyId:function(t){this.propertyId=t},setTrackerName:function(t){this.trackerName=t},useLegacyTracker:function(){this.analyticsReference="_gaq"},sendAuto:function(t,e,n){this.send(null,null,e,n,t)},sendNormalised:function(t,e){this.send(null,null,t,e)},send:function(e,n,c,a){var o=this,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,d=a||{},l=c,u=e||this.category,p=n||this.action,m=i;if(null!=m&&(0==m&&(m="Control"),l="Variation: "+m+" - "+c),"object"===t(d)&&d.sendOnce){var f="".concat(u).concat(p).concat(l);if(this.eventCache.indexOf(f)>-1)return!1;this.eventCache.push(f)}s(l);var v=this,y=function(t){if("_gaq"===v.analyticsReference)window._gaq.push(["_trackEvent",u,p,l,null,void 0===d.nonInteraction||d.nonInteraction]);else{var e={nonInteraction:!d.nonInteraction||d.nonInteraction};if(d.opts)for(var n in d.opts)e[n]=d.opts[n];window[v.analyticsReference]("".concat(t,".send"),"event",u,p,l,e)}};v.trackerName?1==this.sendEvents&&y(v.trackerName):r([function(){try{var t=window[v.analyticsReference].getAll();if(t&&t.length){if(!v.propertyId)return v.trackerName=t[0].get("name"),!0;for(var e=0;e<t.length;e+=1){var n=t[e];if(n.get("trackingId")===v.propertyId)return v.trackerName=n.get("name"),!0}}}catch(t){}}],(function(){1==o.sendEvents&&y(v.trackerName)}),{wait:150})}},s=function(t){localStorage.getItem("ucdebug")&&window.console&&"function"==typeof window.console.log&&console.log(t)},l="HOT-711",u=l,p="1",m=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="Test ID: HOT-711 Variation: 1 Label: "+t;0==f.initiate?d.sendNormalised(n,{sendOnce:e}):f.send(t)},f={initiate:!1,methods:["ga4"],tracker:!1,property:!1,uaRef:"ga",send:function(t){var e=this;this.methods.includes("ga4")&&r([function(){return"complete"===document.readyState}],(function(){void 0!==window.gtag?window.gtag("event","experimentation",{experiment_id:"".concat(u,"-").concat(p),experiment_label:t,send_to:e.property||"default"}):(window.dataLayer=window.dataLayer||[],void 0===window.customGtag&&(window.customGtag=function(){window.dataLayer.push(arguments)},window.customGtag("js",new Date),window.customGtag("config",e.property||"default")),window.customGtag("event","experimentation",{experiment_id:"".concat(u,"-").concat(p),experiment_label:t,send_to:e.property||"default"}))})),this.methods.includes("datalayer")&&r([function(){return!!window.dataLayer}],(function(){window.dataLayer.push({event:"experimentation",experiment_id:"".concat(u,"-").concat(p),experiment_label:t})})),this.methods.includes("ua")&&r([function(){return!!window[e.uaRef]}],(function(){var n=e.tracker||window[e.uaRef].getAll()[0].get("name");window[e.uaRef]("".concat(n,".send"),"event","experimentation","".concat(u,"-").concat(p),t,{nonInteraction:!0})}))}},v=l,y="1",g=function(){var t;t=l,d.setDefaultCategory("Experimentation"),d.setDefaultAction("HotelChocolat - "+t),d.sendEvents=!0,document.documentElement.classList.add(t),document.documentElement.classList.add("".concat(t,"-").concat("1")),m("Conditions Met"),r(["#main #primary","#mini-cart",function(){return window.dataLayer}],(function(){document.documentElement.classList.add("".concat(v,"-expbegins"));var t=window.dataLayer.find((function(t){return"productDetails"==t.event})).product_image,n=\'\\n  \\n    <div class="\'.concat(v,"-atc-holder ").concat(v,\'-hidden">\\n    \\n      <div class="\').concat(v,\'-atc">\\n      \\n        \').concat(window.outerWidth>600?\'\\n          <div class="\'.concat(v,\'-atc--proddetails">\\n            <div class="\').concat(v,\'-atc--proddetails--image">\\n              <img src="\').concat(t,\'" alt="Product Image">\\n            </div>\\n            <div class="\').concat(v,\'-atc--proddetails--text">\\n              <h3><span id="\').concat(v,\'-product-quantity"></span> added to the basket</h3>\\n              <p id="\').concat(v,\'-product-name" class="\').concat(v,\'-atc--name"></p>\\n              <p id="\').concat(v,\'-product-price" class="\').concat(v,\'-atc--price"></p>\\n            </div>\\n          </div>\\n\\n        \'):\'\\n          <div class="\'.concat(v,\'-atc--proddetails">\\n            <div class="\').concat(v,\'-atc--proddetails--mobiletick">\\n              <h3><span id="\').concat(v,\'-product-quantity"></span> added to the basket</h3>\\n            </div>\\n            <div class="\').concat(v,\'-mobile-atc-holder">\\n              <div class="\').concat(v,\'-atc--proddetails--image">\\n                <img src="\').concat(t,\'" alt="Product Image">\\n              </div>\\n              <div class="\').concat(v,\'-atc--proddetails--text">\\n                \\n                <p id="\').concat(v,\'-product-name" class="\').concat(v,\'-atc--name"></p>\\n                <p id="\').concat(v,\'-product-price" class="\').concat(v,\'-atc--price"></p>\\n              </div>\\n            </div>\\n            \\n          </div>\\n\\n        \'),\'\\n        <div class="\').concat(v,\'-atc--checkout">\\n\\n          <p class="\').concat(v,\'-totals"><span class="\').concat(v,\'-subtotal">Subtotal</span><span class="\').concat(v,\'-total">\').concat(document.querySelector(".mini-cart-wrapper .subtotal")?document.querySelector(".mini-cart-wrapper .subtotal").innerText:"£0.00",\' </span></p>\\n          <p class="\').concat(v,\'-items"><span class="\').concat(v,\'-subitems">\').concat(document.querySelector(".minicart-total-qty").innerText," ").concat(parseInt(document.querySelector(".minicart-total-qty").innerText)>1?"items":"item",\'</span> in your basket</p>\\n          <a href="/basket" id="\').concat(v,\'-checkout" class="\').concat(v,\'-atc--checkout--button">Proceed to Checkout</a>\\n          <a href="#" id="\').concat(v,\'-continue-shopping" class="\').concat(v,\'-atc--checkout--button secondary">Continue Shopping</a>\\n\\n        </div>\\n      \\n      </div>\\n\\n      <div class="\').concat(v,"-upsells upsell-2 ").concat(v,"-upsells--v").concat(y,\'" style="">\\n        <div class="\').concat(v,"-upsellcontainer ab-atc-upsells ab-atc-upsells--mightalsolike ab-atc-upsells--mightalsolike--v").concat(y,\'" \').concat(\'data-recscondition="\'.concat({1:"below 10",2:"below 15"}[y],\'"\'),\'>\\n      </div>\\n      </div>\\n      <div class="\').concat(v,"-upsells ").concat(v,"-upsells--v").concat(y,\'">\\n        <div class="\').concat(v,"-upsellcontainer ab-atc-upsells ab-atc-upsells--recentlyviewed ab-atc-upsells--recentlyviewed--v").concat(y,\'"></div>\\n      </div>\\n    \\n    </div>\\n  \\n  \\n  \');document.getElementById("primary").insertAdjacentHTML("afterbegin",n),document.body.addEventListener("click",(function(t){var n;("add-to-cart"==t.target.id||t.target.closest("#add-to-cart"))&&(t.preventDefault(),t.target.classList.contains("add-to-cart-disabled")||(function(){var t,n;window.outerWidth<600&&window.scrollTo(0,0);var c=document.querySelector("#page_heading h1").innerText,a=document.querySelector(".product-price .price-sales").innerText,o=parseFloat(a.replace("£","").replace(",","")),i=document.querySelector(\'.quantity input[name="Quantity"]\').value;document.getElementById("".concat(v,"-product-name")).innerText=c;var r="".concat(i,i>1?" items were":" item was");document.getElementById("".concat(v,"-product-quantity")).innerText=r,document.getElementById("".concat(v,"-product-price")).innerText=i>1?"£"+(o*i).toFixed(2):a;var d=null!==(t=document.querySelector(".mini-cart-wrapper .subtotal"))&&void 0!==t&&t.innerText?document.querySelector(".mini-cart-wrapper .subtotal").innerText:"£0.00",s=parseFloat(d.replace("£","").replace(",",""));d="£"+(s+o*i).toFixed(2),document.querySelector(".".concat(v,"-total")).innerText=d;var l=null!==(n=document.querySelector(".minicart-total-qty"))&&void 0!==n&&n.innerText?document.querySelector(".minicart-total-qty").innerText:"0";document.querySelector(".".concat(v,"-subitems")).innerText=parseInt(l)+parseInt(i)+(parseInt(l)+parseInt(i)==1?" item":" items"),document.querySelector(".".concat(v,"-atc-holder")).classList.remove("".concat(v,"-hidden")),document.getElementById("product-detail-wrapper").classList.add("".concat(v,"-hidden")),clearInterval(e),e=setInterval((function(){var t,e,n,c;null!==(t=document.getElementById("mini-cart"))&&void 0!==t&&t.classList.contains("".concat(v,"-disabled"))||null===(n=document.getElementById("mini-cart"))||void 0===n||n.classList.add("".concat(v,"-disabled")),null!==(e=document.getElementById("mini-cart"))&&void 0!==e&&e.classList.contains("hover")&&(null===(c=document.getElementById("mini-cart"))||void 0===c||c.classList.remove("hover"))}),1);var u=5e3;window.outerWidth<600&&(u=500),setTimeout((function(){clearInterval(e)}),u)}(),m("Click - add to bag clicked, ATB upsell displayed",!0))),t.target.id=="".concat(v,"-continue-shopping")&&(t.preventDefault(),document.querySelector(".".concat(v,"-atc-holder")).classList.add("".concat(v,"-hidden")),document.getElementById("product-detail-wrapper").classList.remove("".concat(v,"-hidden")),null===(n=document.getElementById("mini-cart"))||void 0===n||n.classList.remove("".concat(v,"-disabled")),clearInterval(e),m("Click - continue shopping clicked from within ATB Upsell",!0)),t.target.id=="".concat(v,"-checkout")&&m("Click - proceed to checkout clicked from within ATB Upsell",!0)}))}))};if(!/MSIE|Trident|Edge\\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent)){var h=l;document.documentElement.classList.contains("".concat(h))||r(["body"],(function(){g()}))}}();'
                            }, {
                                id: 5375133,
                                selector: "",
                                type: "addCSS",
                                value: ".HOT-711.HOT-711-expbegins .HOT-711-hidden{display:none;visibility:hidden}.HOT-711.HOT-711-expbegins #add-to-cart{background:#000!important;color:#fff!important;overflow:hidden}.HOT-711.HOT-711-expbegins #add-to-cart *{visibility:hidden!important;display:none!important}.HOT-711.HOT-711-expbegins #add-to-cart:before{content:\"Add to bag\";visibility:visible!important;display:block!important}.HOT-711.HOT-711-expbegins .HOT-711-disabled{background:0 0!important}.HOT-711.HOT-711-expbegins .HOT-711-disabled.hover .menu-title svg.icon{fill:#fff}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-disabled.hover .menu-title svg.icon{fill:#fff;-webkit-filter:none;filter:none}}.HOT-711.HOT-711-expbegins .HOT-711-disabled .menu-text{color:#fff}.HOT-711.HOT-711-expbegins .HOT-711-disabled .drop-down-options{display:none;visibility:hidden}.HOT-711.HOT-711-expbegins .HOT-711-atc-holder{width:100%;min-height:700px;background:#fff;position:relative;padding:20px 0;z-index:10}.HOT-711.HOT-711-expbegins .HOT-711-atc{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;margin-bottom:40px}@media all and (max-width:767px){.HOT-711.HOT-711-expbegins .HOT-711-atc{margin-bottom:20px}}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}}.HOT-711.HOT-711-expbegins .HOT-711-atc .HOT-711-mobile-atc-holder{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails{width:70%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;padding:0 10%;-webkit-box-sizing:border-box;box-sizing:border-box}@media all and (max-width:767px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails{padding:0 5% 0 10px}}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:0;width:100%}}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--mobiletick{width:100%;margin-bottom:10px}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--mobiletick h3{font-size:14px;color:#118f40;line-height:20px;letter-spacing:.2px;font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif;margin-bottom:15px;position:relative;padding-left:40px}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--mobiletick h3:before{background-image:url(\"data:image/svg+xml,%3Csvg width='12' height='11' viewBox='0 0 15 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.46614 11.7308L5.855 12.1343L6.21174 11.7021L14.2317 1.98706L14.2318 1.98701C14.5889 1.55427 14.4563 0.954074 14.0236 0.665451L13.7462 1.08141L14.0236 0.66545C13.6095 0.389247 13.0283 0.463996 12.7072 0.853052L12.7072 0.853063L5.7438 9.29096L2.1794 5.59487L2.17945 5.59482L2.17352 5.58888C1.82909 5.24351 1.24845 5.18611 0.845722 5.5107C0.434725 5.84196 0.373154 6.44439 0.751935 6.8394L0.752808 6.8403L5.46614 11.7308Z' fill='%23118F40' stroke='%23118F40'/%3E%3C/svg%3E\");content:\"\";position:absolute;left:10px;top:5px;width:12px;height:11px}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--image{width:168px}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--image{max-width:103px;width:100%;height:auto;padding-bottom:20px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--image img{width:100%;height:auto;max-width:100%}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text{padding-left:80px;padding-top:10px}@media all and (max-width:767px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text{padding-left:60px}}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text{padding-left:20px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text h3{font-size:16px;color:#118f40;line-height:22px;letter-spacing:.2px;font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif;margin-bottom:15px;position:relative}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text h3{font-size:14px;line-height:20px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text h3:before{background-image:url(\"data:image/svg+xml,%3Csvg width='15' height='13' viewBox='0 0 15 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.46614 11.7308L5.855 12.1343L6.21174 11.7021L14.2317 1.98706L14.2318 1.98701C14.5889 1.55427 14.4563 0.954074 14.0236 0.665451L13.7462 1.08141L14.0236 0.66545C13.6095 0.389247 13.0283 0.463996 12.7072 0.853052L12.7072 0.853063L5.7438 9.29096L2.1794 5.59487L2.17945 5.59482L2.17352 5.58888C1.82909 5.24351 1.24845 5.18611 0.845722 5.5107C0.434725 5.84196 0.373154 6.44439 0.751935 6.8394L0.752808 6.8403L5.46614 11.7308Z' fill='%23118F40' stroke='%23118F40'/%3E%3C/svg%3E\");content:\"\";position:absolute;left:-30px;top:5px;width:15px;height:12px}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text p{font-size:16px;color:#000;line-height:22px;letter-spacing:.2px;font-family:GillSansNova-Medium,Arial,Helvetica,sans-serif;margin-bottom:10px}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text p{font-size:14px;line-height:20px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text p.HOT-711-atc--price{font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout{width:30%;max-width:270px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;background:#f0f0f0;padding:20px;-webkit-box-sizing:border-box;box-sizing:border-box}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout{width:100%;max-width:100%;border-top:1px solid #c8c8c8;padding-top:10px;background:0 0;padding:10px 0}}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout .HOT-711-totals{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:10px;font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif;font-size:18px;line-height:26px}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout .HOT-711-totals{padding:0 10px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout .HOT-711-items{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;margin-bottom:20px;font-family:GillSansNova-Medium,Arial,Helvetica,sans-serif;font-size:18px;line-height:26px}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout .HOT-711-items .HOT-711-subitems{margin-right:3px}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout .HOT-711-items{padding:0 10px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout--button{width:100%;padding:12px 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:#000;border:1px solid #000;margin-bottom:10px;text-transform:uppercase;font-family:GillSansNova-Medium,Arial,Helvetica,sans-serif;color:#fff;font-size:13px}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout--button:last-child{margin-bottom:0}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout--button{font-size:15px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout--button.secondary{background:#fff;color:#000}.HOT-711.HOT-711-expbegins .HOT-711-upsells{margin-bottom:40px}.HOT-711.HOT-711-expbegins .HOT-711-upsells h2{font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif;font-size:24px;line-height:32px}"
                            }]
                        },
                        1650815: {
                            id: 1650815,
                            name: "Custom Control",
                            traffic: 0,
                            masterVariationId: 0,
                            modifications: [{
                                selector: "",
                                type: "customScriptNew",
                                oldValue: '!function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e,n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},c="object"==t(n)&&n&&n.Object===Object&&n,a="object"==("undefined"==typeof self?"undefined":t(self))&&self&&self.Object===Object&&self,o=(c||a||Function("return this")()).Symbol,i=(o&&o.toStringTag,o&&o.toStringTag,Date.now||function(){return(new Date).getTime()}),r=function(e,n,c){var a={wait:50,multiplier:1.1,timeout:0};c&&(a=function e(n,c){var a=n;return Object.keys(c).forEach((function(n){var o=c[n],i=a[n],r=i&&"object"===t(i)&&!(i instanceof Array);a[n]=r?e(i,o):o})),a}(a,c));for(var o=a,r=o.multiplier,d=o.wait,s=a.timeout?new Date(i()+a.timeout):null,l=[],u=function c(a,o,d){if(s&&s&&i()>s)return!1;var u=function(e){if(!e)return!1;var n={function:function(){return e()},string:function(){return document.querySelector(e)}}[t(e)];return!n||n()}(a);u?(l.push(u),l.length===e.length&&n(l)):setTimeout((function(){c(a,o*r)}),d?0:o)},p=0;p<e.length;p+=1){if("string"!=typeof e[p]&&"function"!=typeof e[p])throw"Every item in the poller array should be a function or a string";u(e[p],d,!0)}},d={trackerName:!1,propertyId:!1,analyticsReference:"ga",eventCache:[],sendEvents:!0,setDefaultCategory:function(t){return this.category=t,this},setDefaultAction:function(t){return this.action=t,this},setPropertyId:function(t){this.propertyId=t},setTrackerName:function(t){this.trackerName=t},useLegacyTracker:function(){this.analyticsReference="_gaq"},sendAuto:function(t,e,n){this.send(null,null,e,n,t)},sendNormalised:function(t,e){this.send(null,null,t,e)},send:function(e,n,c,a){var o=this,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,d=a||{},l=c,u=e||this.category,p=n||this.action,m=i;if(null!=m&&(0==m&&(m="Control"),l="Variation: "+m+" - "+c),"object"===t(d)&&d.sendOnce){var f="".concat(u).concat(p).concat(l);if(this.eventCache.indexOf(f)>-1)return!1;this.eventCache.push(f)}s(l);var v=this,y=function(t){if("_gaq"===v.analyticsReference)window._gaq.push(["_trackEvent",u,p,l,null,void 0===d.nonInteraction||d.nonInteraction]);else{var e={nonInteraction:!d.nonInteraction||d.nonInteraction};if(d.opts)for(var n in d.opts)e[n]=d.opts[n];window[v.analyticsReference]("".concat(t,".send"),"event",u,p,l,e)}};v.trackerName?1==this.sendEvents&&y(v.trackerName):r([function(){try{var t=window[v.analyticsReference].getAll();if(t&&t.length){if(!v.propertyId)return v.trackerName=t[0].get("name"),!0;for(var e=0;e<t.length;e+=1){var n=t[e];if(n.get("trackingId")===v.propertyId)return v.trackerName=n.get("name"),!0}}}catch(t){}}],(function(){1==o.sendEvents&&y(v.trackerName)}),{wait:150})}},s=function(t){localStorage.getItem("ucdebug")&&window.console&&"function"==typeof window.console.log&&console.log(t)},l="HOT-711",u="Control",p=l,m=u,f=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="Test ID: "+p+" Variation: "+m+" Label: "+t;0==v.initiate?d.sendNormalised(n,{sendOnce:e}):v.send(t)},v={initiate:!1,methods:["ga4"],tracker:!1,property:!1,uaRef:"ga",send:function(t){var e=this;this.methods.includes("ga4")&&(s(t),r([function(){return"complete"===document.readyState}],(function(){void 0!==window.gtag?window.gtag("event","experimentation",{experiment_id:"".concat(p,"-").concat(m),experiment_label:t,send_to:e.property||"default"}):(window.dataLayer=window.dataLayer||[],void 0===window.customGtag&&(window.customGtag=function(){window.dataLayer.push(arguments)},window.customGtag("js",new Date),window.customGtag("config",e.property||"default")),window.customGtag("event","experimentation",{experiment_id:"".concat(p,"-").concat(m),experiment_label:t,send_to:e.property||"default"}))}))),this.methods.includes("datalayer")&&(s(t),r([function(){return!!window.dataLayer}],(function(){window.dataLayer.push({event:"experimentation",experiment_id:"".concat(p,"-").concat(m),experiment_label:t})}))),this.methods.includes("ua")&&r([function(){return!!window[e.uaRef]}],(function(){var n=e.tracker||window[e.uaRef].getAll()[0].get("name");window[e.uaRef]("".concat(n,".send"),"event","experimentation","".concat(p,"-").concat(m),t,{nonInteraction:!0})}))}},y=l,g=function(){var t,n;t=l,n=u,d.setDefaultCategory("Experimentation"),d.setDefaultAction("HotelChocolat - "+t),d.sendEvents=!0,document.documentElement.classList.add(t),document.documentElement.classList.add("".concat(t,"-").concat(n)),f("Conditions Met"),r(["#main #primary","#mini-cart",function(){return window.dataLayer}],(function(){document.documentElement.classList.add("".concat(y,"-expbegins"));var t=window.dataLayer.find((function(t){return"productDetails"==t.event})).product_image,n=\'\\n  \\n    <div class="\'.concat(y,"-atc-holder ").concat(y,\'-hidden">\\n    \\n      <div class="\').concat(y,\'-atc">\\n      \\n        \').concat(window.outerWidth>600?\'\\n          <div class="\'.concat(y,\'-atc--proddetails">\\n            <div class="\').concat(y,\'-atc--proddetails--image">\\n              <img src="\').concat(t,\'" alt="Product Image">\\n            </div>\\n            <div class="\').concat(y,\'-atc--proddetails--text">\\n              <h3><span id="\').concat(y,\'-product-quantity"></span> added to the basket</h3>\\n              <p id="\').concat(y,\'-product-name" class="\').concat(y,\'-atc--name"></p>\\n              <p id="\').concat(y,\'-product-price" class="\').concat(y,\'-atc--price"></p>\\n            </div>\\n          </div>\\n\\n        \'):\'\\n          <div class="\'.concat(y,\'-atc--proddetails">\\n            <div class="\').concat(y,\'-atc--proddetails--mobiletick">\\n              <h3><span id="\').concat(y,\'-product-quantity"></span> added to the basket</h3>\\n            </div>\\n            <div class="\').concat(y,\'-mobile-atc-holder">\\n              <div class="\').concat(y,\'-atc--proddetails--image">\\n                <img src="\').concat(t,\'" alt="Product Image">\\n              </div>\\n              <div class="\').concat(y,\'-atc--proddetails--text">\\n                \\n                <p id="\').concat(y,\'-product-name" class="\').concat(y,\'-atc--name"></p>\\n                <p id="\').concat(y,\'-product-price" class="\').concat(y,\'-atc--price"></p>\\n              </div>\\n            </div>\\n            \\n          </div>\\n\\n        \'),\'\\n        <div class="\').concat(y,\'-atc--checkout">\\n\\n          <p class="\').concat(y,\'-totals"><span class="\').concat(y,\'-subtotal">Subtotal</span><span class="\').concat(y,\'-total">\').concat(document.querySelector(".mini-cart-wrapper .subtotal")?document.querySelector(".mini-cart-wrapper .subtotal").innerText:"£0.00",\' </span></p>\\n          <p class="\').concat(y,\'-items"><span class="\').concat(y,\'-subitems">\').concat(document.querySelector(".minicart-total-qty").innerText," ").concat(parseInt(document.querySelector(".minicart-total-qty").innerText)>1?"items":"item",\'</span> in your basket</p>\\n          <a href="/basket" id="\').concat(y,\'-checkout" class="\').concat(y,\'-atc--checkout--button">Proceed to Checkout</a>\\n          <a href="#" id="\').concat(y,\'-continue-shopping" class="\').concat(y,\'-atc--checkout--button secondary">Continue Shopping</a>\\n\\n        </div>\\n      \\n      </div>\\n\\n      <div class="\').concat(y,\'-upsells">\\n        <div class="\').concat(y,\'-upsellcontainer ab-atc-upsells ab-atc-upsells--mightalsolike"></div>\\n      </div>\\n\\n      <div class="\').concat(y,\'-upsells">\\n        <div class="\').concat(y,\'-upsellcontainer ab-atc-upsells ab-atc-upsells--recentlyviewed"></div>\\n      </div>\\n    \\n    </div>\\n  \\n  \\n  \');document.getElementById("primary").insertAdjacentHTML("afterbegin",n),document.body.addEventListener("click",(function(t){var n;("add-to-cart"==t.target.id||t.target.closest("#add-to-cart"))&&(t.preventDefault(),t.target.classList.contains("add-to-cart-disabled")||(function(){var t,n;window.outerWidth<600&&window.scrollTo(0,0);var c=document.querySelector("#page_heading h1").innerText,a=document.querySelector(".product-price .price-sales").innerText,o=parseFloat(a.replace("£","").replace(",","")),i=document.querySelector(\'.quantity input[name="Quantity"]\').value;document.getElementById("".concat(y,"-product-name")).innerText=c;var r="".concat(i,i>1?" items were":" item was");document.getElementById("".concat(y,"-product-quantity")).innerText=r,document.getElementById("".concat(y,"-product-price")).innerText=i>1?"£"+(o*i).toFixed(2):a;var d=null!==(t=document.querySelector(".mini-cart-wrapper .subtotal"))&&void 0!==t&&t.innerText?document.querySelector(".mini-cart-wrapper .subtotal").innerText:"£0.00",s=parseFloat(d.replace("£","").replace(",",""));d="£"+(s+o*i).toFixed(2),document.querySelector(".".concat(y,"-total")).innerText=d;var l=null!==(n=document.querySelector(".minicart-total-qty"))&&void 0!==n&&n.innerText?document.querySelector(".minicart-total-qty").innerText:"0";document.querySelector(".".concat(y,"-subitems")).innerText=parseInt(l)+parseInt(i)+(parseInt(l)+parseInt(i)==1?" item":" items"),document.querySelector(".".concat(y,"-atc-holder")).classList.remove("".concat(y,"-hidden")),document.getElementById("product-detail-wrapper").classList.add("".concat(y,"-hidden")),clearInterval(e),e=setInterval((function(){var t,e,n,c;null!==(t=document.getElementById("mini-cart"))&&void 0!==t&&t.classList.contains("".concat(y,"-disabled"))||null===(n=document.getElementById("mini-cart"))||void 0===n||n.classList.add("".concat(y,"-disabled")),null!==(e=document.getElementById("mini-cart"))&&void 0!==e&&e.classList.contains("hover")&&(null===(c=document.getElementById("mini-cart"))||void 0===c||c.classList.remove("hover"))}),1);var u=5e3;window.outerWidth<600&&(u=500),setTimeout((function(){clearInterval(e)}),u)}(),f("Click - add to bag clicked, ATB upsell displayed",!0))),t.target.id=="".concat(y,"-continue-shopping")&&(t.preventDefault(),document.querySelector(".".concat(y,"-atc-holder")).classList.add("".concat(y,"-hidden")),document.getElementById("product-detail-wrapper").classList.remove("".concat(y,"-hidden")),null===(n=document.getElementById("mini-cart"))||void 0===n||n.classList.remove("".concat(y,"-disabled")),clearInterval(e),f("Click - continue shopping clicked from within ATB Upsell",!0)),t.target.id=="".concat(y,"-checkout")&&f("Click - proceed to checkout clicked from within ATB Upsell",!0)}))}))};if(!/MSIE|Trident|Edge\\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent)){var h=l;document.documentElement.classList.contains("".concat(h))||r(["body"],(function(){g()}))}}();'
                            }, {
                                id: 5376616,
                                selector: "",
                                type: "addCSS",
                                value: ".HOT-711.HOT-711-expbegins .HOT-711-hidden{display:none;visibility:hidden}.HOT-711.HOT-711-expbegins .HC-158__sticky_add_to_cart{display:none!important}.HOT-711.HOT-711-expbegins #add-to-cart{background:#000!important;color:#fff!important;overflow:hidden}.HOT-711.HOT-711-expbegins #add-to-cart *{visibility:hidden!important;display:none!important}.HOT-711.HOT-711-expbegins #add-to-cart:before{content:\"Add to bag\";visibility:visible!important;display:block!important}.HOT-711.HOT-711-expbegins .HOT-711-disabled{background:0 0!important}.HOT-711.HOT-711-expbegins .HOT-711-disabled.hover .menu-title svg.icon{fill:#fff}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-disabled.hover .menu-title svg.icon{fill:#fff;-webkit-filter:none;filter:none}}.HOT-711.HOT-711-expbegins .HOT-711-disabled .menu-text{color:#fff}.HOT-711.HOT-711-expbegins .HOT-711-disabled .drop-down-options{display:none;visibility:hidden}.HOT-711.HOT-711-expbegins .HOT-711-atc-holder{width:100%;min-height:700px;background:#fff;position:relative;padding:20px 0;z-index:10}.HOT-711.HOT-711-expbegins .HOT-711-atc{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;margin-bottom:40px}@media all and (max-width:767px){.HOT-711.HOT-711-expbegins .HOT-711-atc{margin-bottom:20px}}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}}.HOT-711.HOT-711-expbegins .HOT-711-atc .HOT-711-mobile-atc-holder{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails{width:70%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;padding:0 10%;-webkit-box-sizing:border-box;box-sizing:border-box}@media all and (max-width:767px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails{padding:0 5% 0 10px}}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:0;width:100%}}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--mobiletick{width:100%;margin-bottom:10px}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--mobiletick h3{font-size:14px;color:#118f40;line-height:20px;letter-spacing:.2px;font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif;margin-bottom:15px;position:relative;padding-left:40px}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--mobiletick h3:before{background-image:url(\"data:image/svg+xml,%3Csvg width='12' height='11' viewBox='0 0 15 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.46614 11.7308L5.855 12.1343L6.21174 11.7021L14.2317 1.98706L14.2318 1.98701C14.5889 1.55427 14.4563 0.954074 14.0236 0.665451L13.7462 1.08141L14.0236 0.66545C13.6095 0.389247 13.0283 0.463996 12.7072 0.853052L12.7072 0.853063L5.7438 9.29096L2.1794 5.59487L2.17945 5.59482L2.17352 5.58888C1.82909 5.24351 1.24845 5.18611 0.845722 5.5107C0.434725 5.84196 0.373154 6.44439 0.751935 6.8394L0.752808 6.8403L5.46614 11.7308Z' fill='%23118F40' stroke='%23118F40'/%3E%3C/svg%3E\");content:\"\";position:absolute;left:10px;top:5px;width:12px;height:11px}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--image{width:168px}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--image{max-width:103px;width:100%;height:auto;padding-bottom:20px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--image img{width:100%;height:auto;max-width:100%}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text{padding-left:80px;padding-top:10px}@media all and (max-width:767px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text{padding-left:60px}}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text{padding-left:20px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text h3{font-size:16px;color:#118f40;line-height:22px;letter-spacing:.2px;font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif;margin-bottom:15px;position:relative}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text h3{font-size:14px;line-height:20px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text h3:before{background-image:url(\"data:image/svg+xml,%3Csvg width='15' height='13' viewBox='0 0 15 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.46614 11.7308L5.855 12.1343L6.21174 11.7021L14.2317 1.98706L14.2318 1.98701C14.5889 1.55427 14.4563 0.954074 14.0236 0.665451L13.7462 1.08141L14.0236 0.66545C13.6095 0.389247 13.0283 0.463996 12.7072 0.853052L12.7072 0.853063L5.7438 9.29096L2.1794 5.59487L2.17945 5.59482L2.17352 5.58888C1.82909 5.24351 1.24845 5.18611 0.845722 5.5107C0.434725 5.84196 0.373154 6.44439 0.751935 6.8394L0.752808 6.8403L5.46614 11.7308Z' fill='%23118F40' stroke='%23118F40'/%3E%3C/svg%3E\");content:\"\";position:absolute;left:-30px;top:5px;width:15px;height:12px}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text p{font-size:16px;color:#000;line-height:22px;letter-spacing:.2px;font-family:GillSansNova-Medium,Arial,Helvetica,sans-serif;margin-bottom:10px}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text p{font-size:14px;line-height:20px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text p.HOT-711-atc--price{font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout{width:30%;max-width:270px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;background:#f0f0f0;padding:20px;-webkit-box-sizing:border-box;box-sizing:border-box}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout{width:100%;max-width:100%;border-top:1px solid #c8c8c8;padding-top:10px;background:0 0;padding:10px 0}}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout .HOT-711-totals{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:10px;font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif;font-size:18px;line-height:26px}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout .HOT-711-totals{padding:0 10px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout .HOT-711-items{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;margin-bottom:20px;font-family:GillSansNova-Medium,Arial,Helvetica,sans-serif;font-size:18px;line-height:26px}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout .HOT-711-items .HOT-711-subitems{margin-right:3px}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout .HOT-711-items{padding:0 10px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout--button{width:100%;padding:12px 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:#000;border:1px solid #000;margin-bottom:10px;text-transform:uppercase;font-family:GillSansNova-Medium,Arial,Helvetica,sans-serif;color:#fff;font-size:13px}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout--button:last-child{margin-bottom:0}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout--button{font-size:15px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout--button.secondary{background:#fff;color:#000}.HOT-711.HOT-711-expbegins .HOT-711-upsells{margin-bottom:40px}.HOT-711.HOT-711-expbegins .HOT-711-upsells h2{font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif;font-size:24px;line-height:32px}"
                            }]
                        },
                        1650823: {
                            id: 1650823,
                            name: "Variation 2",
                            traffic: 50,
                            masterVariationId: 0,
                            modifications: [{
                                id: 5375146,
                                selector: "",
                                type: "addCSS",
                                value: ".HOT-711.HOT-711-expbegins .HOT-711-hidden{display:none;visibility:hidden}.HOT-711.HOT-711-expbegins #add-to-cart{background:#000!important;color:#fff!important;overflow:hidden}.HOT-711.HOT-711-expbegins #add-to-cart *{visibility:hidden!important;display:none!important}.HOT-711.HOT-711-expbegins #add-to-cart:before{content:\"Add to bag\";visibility:visible!important;display:block!important}.HOT-711.HOT-711-expbegins .HOT-711-disabled{background:0 0!important}.HOT-711.HOT-711-expbegins .HOT-711-disabled.hover .menu-title svg.icon{fill:#fff}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-disabled.hover .menu-title svg.icon{fill:#fff;-webkit-filter:none;filter:none}}.HOT-711.HOT-711-expbegins .HOT-711-disabled .menu-text{color:#fff}.HOT-711.HOT-711-expbegins .HOT-711-disabled .drop-down-options{display:none;visibility:hidden}.HOT-711.HOT-711-expbegins .HOT-711-atc-holder{width:100%;min-height:700px;background:#fff;position:relative;padding:20px 0;z-index:10}.HOT-711.HOT-711-expbegins .HOT-711-atc{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;margin-bottom:40px}@media all and (max-width:767px){.HOT-711.HOT-711-expbegins .HOT-711-atc{margin-bottom:20px}}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}}.HOT-711.HOT-711-expbegins .HOT-711-atc .HOT-711-mobile-atc-holder{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails{width:70%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;padding:0 10%;-webkit-box-sizing:border-box;box-sizing:border-box}@media all and (max-width:767px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails{padding:0 5% 0 10px}}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:0;width:100%}}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--mobiletick{width:100%;margin-bottom:10px}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--mobiletick h3{font-size:14px;color:#118f40;line-height:20px;letter-spacing:.2px;font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif;margin-bottom:15px;position:relative;padding-left:40px}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--mobiletick h3:before{background-image:url(\"data:image/svg+xml,%3Csvg width='12' height='11' viewBox='0 0 15 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.46614 11.7308L5.855 12.1343L6.21174 11.7021L14.2317 1.98706L14.2318 1.98701C14.5889 1.55427 14.4563 0.954074 14.0236 0.665451L13.7462 1.08141L14.0236 0.66545C13.6095 0.389247 13.0283 0.463996 12.7072 0.853052L12.7072 0.853063L5.7438 9.29096L2.1794 5.59487L2.17945 5.59482L2.17352 5.58888C1.82909 5.24351 1.24845 5.18611 0.845722 5.5107C0.434725 5.84196 0.373154 6.44439 0.751935 6.8394L0.752808 6.8403L5.46614 11.7308Z' fill='%23118F40' stroke='%23118F40'/%3E%3C/svg%3E\");content:\"\";position:absolute;left:10px;top:5px;width:12px;height:11px}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--image{width:168px}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--image{max-width:103px;width:100%;height:auto;padding-bottom:20px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--image img{width:100%;height:auto;max-width:100%}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text{padding-left:80px;padding-top:10px}@media all and (max-width:767px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text{padding-left:60px}}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text{padding-left:20px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text h3{font-size:16px;color:#118f40;line-height:22px;letter-spacing:.2px;font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif;margin-bottom:15px;position:relative}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text h3{font-size:14px;line-height:20px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text h3:before{background-image:url(\"data:image/svg+xml,%3Csvg width='15' height='13' viewBox='0 0 15 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.46614 11.7308L5.855 12.1343L6.21174 11.7021L14.2317 1.98706L14.2318 1.98701C14.5889 1.55427 14.4563 0.954074 14.0236 0.665451L13.7462 1.08141L14.0236 0.66545C13.6095 0.389247 13.0283 0.463996 12.7072 0.853052L12.7072 0.853063L5.7438 9.29096L2.1794 5.59487L2.17945 5.59482L2.17352 5.58888C1.82909 5.24351 1.24845 5.18611 0.845722 5.5107C0.434725 5.84196 0.373154 6.44439 0.751935 6.8394L0.752808 6.8403L5.46614 11.7308Z' fill='%23118F40' stroke='%23118F40'/%3E%3C/svg%3E\");content:\"\";position:absolute;left:-30px;top:5px;width:15px;height:12px}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text p{font-size:16px;color:#000;line-height:22px;letter-spacing:.2px;font-family:GillSansNova-Medium,Arial,Helvetica,sans-serif;margin-bottom:10px}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text p{font-size:14px;line-height:20px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--proddetails--text p.HOT-711-atc--price{font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout{width:30%;max-width:270px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;background:#f0f0f0;padding:20px;-webkit-box-sizing:border-box;box-sizing:border-box}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout{width:100%;max-width:100%;border-top:1px solid #c8c8c8;padding-top:10px;background:0 0;padding:10px 0}}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout .HOT-711-totals{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:10px;font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif;font-size:18px;line-height:26px}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout .HOT-711-totals{padding:0 10px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout .HOT-711-items{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;margin-bottom:20px;font-family:GillSansNova-Medium,Arial,Helvetica,sans-serif;font-size:18px;line-height:26px}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout .HOT-711-items .HOT-711-subitems{margin-right:3px}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout .HOT-711-items{padding:0 10px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout--button{width:100%;padding:12px 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:#000;border:1px solid #000;margin-bottom:10px;text-transform:uppercase;font-family:GillSansNova-Medium,Arial,Helvetica,sans-serif;color:#fff;font-size:13px}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout--button:last-child{margin-bottom:0}@media all and (max-width:600px){.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout--button{font-size:15px}}.HOT-711.HOT-711-expbegins .HOT-711-atc--checkout--button.secondary{background:#fff;color:#000}.HOT-711.HOT-711-expbegins .HOT-711-upsells{margin-bottom:40px}.HOT-711.HOT-711-expbegins .HOT-711-upsells h2{font-family:GillSansNova-Bold,Arial,Helvetica,sans-serif;font-size:24px;line-height:32px}"
                            }, {
                                selector: "",
                                type: "customScriptNew",
                                oldValue: '!function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e,n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},c="object"==t(n)&&n&&n.Object===Object&&n,a="object"==("undefined"==typeof self?"undefined":t(self))&&self&&self.Object===Object&&self,o=(c||a||Function("return this")()).Symbol,i=(o&&o.toStringTag,o&&o.toStringTag,Date.now||function(){return(new Date).getTime()}),r=function(e,n,c){var a={wait:50,multiplier:1.1,timeout:0};c&&(a=function e(n,c){var a=n;return Object.keys(c).forEach((function(n){var o=c[n],i=a[n],r=i&&"object"===t(i)&&!(i instanceof Array);a[n]=r?e(i,o):o})),a}(a,c));for(var o=a,r=o.multiplier,d=o.wait,s=a.timeout?new Date(i()+a.timeout):null,l=[],u=function c(a,o,d){if(s&&s&&i()>s)return!1;var u=function(e){if(!e)return!1;var n={function:function(){return e()},string:function(){return document.querySelector(e)}}[t(e)];return!n||n()}(a);u?(l.push(u),l.length===e.length&&n(l)):setTimeout((function(){c(a,o*r)}),d?0:o)},p=0;p<e.length;p+=1){if("string"!=typeof e[p]&&"function"!=typeof e[p])throw"Every item in the poller array should be a function or a string";u(e[p],d,!0)}},d={trackerName:!1,propertyId:!1,analyticsReference:"ga",eventCache:[],sendEvents:!0,setDefaultCategory:function(t){return this.category=t,this},setDefaultAction:function(t){return this.action=t,this},setPropertyId:function(t){this.propertyId=t},setTrackerName:function(t){this.trackerName=t},useLegacyTracker:function(){this.analyticsReference="_gaq"},sendAuto:function(t,e,n){this.send(null,null,e,n,t)},sendNormalised:function(t,e){this.send(null,null,t,e)},send:function(e,n,c,a){var o=this,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,d=a||{},l=c,u=e||this.category,p=n||this.action,m=i;if(null!=m&&(0==m&&(m="Control"),l="Variation: "+m+" - "+c),"object"===t(d)&&d.sendOnce){var f="".concat(u).concat(p).concat(l);if(this.eventCache.indexOf(f)>-1)return!1;this.eventCache.push(f)}s(l);var v=this,y=function(t){if("_gaq"===v.analyticsReference)window._gaq.push(["_trackEvent",u,p,l,null,void 0===d.nonInteraction||d.nonInteraction]);else{var e={nonInteraction:!d.nonInteraction||d.nonInteraction};if(d.opts)for(var n in d.opts)e[n]=d.opts[n];window[v.analyticsReference]("".concat(t,".send"),"event",u,p,l,e)}};v.trackerName?1==this.sendEvents&&y(v.trackerName):r([function(){try{var t=window[v.analyticsReference].getAll();if(t&&t.length){if(!v.propertyId)return v.trackerName=t[0].get("name"),!0;for(var e=0;e<t.length;e+=1){var n=t[e];if(n.get("trackingId")===v.propertyId)return v.trackerName=n.get("name"),!0}}}catch(t){}}],(function(){1==o.sendEvents&&y(v.trackerName)}),{wait:150})}},s=function(t){localStorage.getItem("ucdebug")&&window.console&&"function"==typeof window.console.log&&console.log(t)},l="HOT-711",u=l,p="2",m=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="Test ID: HOT-711 Variation: 2 Label: "+t;0==f.initiate?d.sendNormalised(n,{sendOnce:e}):f.send(t)},f={initiate:!1,methods:["ga4"],tracker:!1,property:!1,uaRef:"ga",send:function(t){var e=this;this.methods.includes("ga4")&&r([function(){return"complete"===document.readyState}],(function(){void 0!==window.gtag?window.gtag("event","experimentation",{experiment_id:"".concat(u,"-").concat(p),experiment_label:t,send_to:e.property||"default"}):(window.dataLayer=window.dataLayer||[],void 0===window.customGtag&&(window.customGtag=function(){window.dataLayer.push(arguments)},window.customGtag("js",new Date),window.customGtag("config",e.property||"default")),window.customGtag("event","experimentation",{experiment_id:"".concat(u,"-").concat(p),experiment_label:t,send_to:e.property||"default"}))})),this.methods.includes("datalayer")&&r([function(){return!!window.dataLayer}],(function(){window.dataLayer.push({event:"experimentation",experiment_id:"".concat(u,"-").concat(p),experiment_label:t})})),this.methods.includes("ua")&&r([function(){return!!window[e.uaRef]}],(function(){var n=e.tracker||window[e.uaRef].getAll()[0].get("name");window[e.uaRef]("".concat(n,".send"),"event","experimentation","".concat(u,"-").concat(p),t,{nonInteraction:!0})}))}},v=l,y="2",g=function(){var t;t=l,d.setDefaultCategory("Experimentation"),d.setDefaultAction("HotelChocolat - "+t),d.sendEvents=!0,document.documentElement.classList.add(t),document.documentElement.classList.add("".concat(t,"-").concat("2")),m("Conditions Met"),r(["#main #primary","#mini-cart",function(){return window.dataLayer}],(function(){document.documentElement.classList.add("".concat(v,"-expbegins"));var t=window.dataLayer.find((function(t){return"productDetails"==t.event})).product_image,n=\'\\n  \\n    <div class="\'.concat(v,"-atc-holder ").concat(v,\'-hidden">\\n    \\n      <div class="\').concat(v,\'-atc">\\n      \\n        \').concat(window.outerWidth>600?\'\\n          <div class="\'.concat(v,\'-atc--proddetails">\\n            <div class="\').concat(v,\'-atc--proddetails--image">\\n              <img src="\').concat(t,\'" alt="Product Image">\\n            </div>\\n            <div class="\').concat(v,\'-atc--proddetails--text">\\n              <h3><span id="\').concat(v,\'-product-quantity"></span> added to the basket</h3>\\n              <p id="\').concat(v,\'-product-name" class="\').concat(v,\'-atc--name"></p>\\n              <p id="\').concat(v,\'-product-price" class="\').concat(v,\'-atc--price"></p>\\n            </div>\\n          </div>\\n\\n        \'):\'\\n          <div class="\'.concat(v,\'-atc--proddetails">\\n            <div class="\').concat(v,\'-atc--proddetails--mobiletick">\\n              <h3><span id="\').concat(v,\'-product-quantity"></span> added to the basket</h3>\\n            </div>\\n            <div class="\').concat(v,\'-mobile-atc-holder">\\n              <div class="\').concat(v,\'-atc--proddetails--image">\\n                <img src="\').concat(t,\'" alt="Product Image">\\n              </div>\\n              <div class="\').concat(v,\'-atc--proddetails--text">\\n                \\n                <p id="\').concat(v,\'-product-name" class="\').concat(v,\'-atc--name"></p>\\n                <p id="\').concat(v,\'-product-price" class="\').concat(v,\'-atc--price"></p>\\n              </div>\\n            </div>\\n            \\n          </div>\\n\\n        \'),\'\\n        <div class="\').concat(v,\'-atc--checkout">\\n\\n          <p class="\').concat(v,\'-totals"><span class="\').concat(v,\'-subtotal">Subtotal</span><span class="\').concat(v,\'-total">\').concat(document.querySelector(".mini-cart-wrapper .subtotal")?document.querySelector(".mini-cart-wrapper .subtotal").innerText:"£0.00",\' </span></p>\\n          <p class="\').concat(v,\'-items"><span class="\').concat(v,\'-subitems">\').concat(document.querySelector(".minicart-total-qty").innerText," ").concat(parseInt(document.querySelector(".minicart-total-qty").innerText)>1?"items":"item",\'</span> in your basket</p>\\n          <a href="/basket" id="\').concat(v,\'-checkout" class="\').concat(v,\'-atc--checkout--button">Proceed to Checkout</a>\\n          <a href="#" id="\').concat(v,\'-continue-shopping" class="\').concat(v,\'-atc--checkout--button secondary">Continue Shopping</a>\\n\\n        </div>\\n      \\n      </div>\\n\\n      <div class="\').concat(v,"-upsells upsell-2 ").concat(v,"-upsells--v").concat(y,\'" style="">\\n        <div class="\').concat(v,"-upsellcontainer ab-atc-upsells ab-atc-upsells--mightalsolike ab-atc-upsells--mightalsolike--v").concat(y,\'" data-recscondition="\').concat({1:"below 10",2:"below 15"}[y],\'">\\n      </div>\\n      </div>\\n      <div class="\').concat(v,"-upsells ").concat(v,"-upsells--v").concat(y,\'">\\n        <div class="\').concat(v,"-upsellcontainer ab-atc-upsells ab-atc-upsells--recentlyviewed ab-atc-upsells--recentlyviewed--v").concat(y,\'"></div>\\n      </div>\\n    \\n    </div>\\n  \\n  \\n  \');document.getElementById("primary").insertAdjacentHTML("afterbegin",n),document.body.addEventListener("click",(function(t){var n;("add-to-cart"==t.target.id||t.target.closest("#add-to-cart"))&&(t.preventDefault(),t.target.classList.contains("add-to-cart-disabled")||(function(){var t,n;window.outerWidth<600&&window.scrollTo(0,0);var c=document.querySelector("#page_heading h1").innerText,a=document.querySelector(".product-price .price-sales").innerText,o=parseFloat(a.replace("£","").replace(",","")),i=document.querySelector(\'.quantity input[name="Quantity"]\').value;document.getElementById("".concat(v,"-product-name")).innerText=c;var r="".concat(i,i>1?" items were":" item was");document.getElementById("".concat(v,"-product-quantity")).innerText=r,document.getElementById("".concat(v,"-product-price")).innerText=i>1?"£"+(o*i).toFixed(2):a;var d=null!==(t=document.querySelector(".mini-cart-wrapper .subtotal"))&&void 0!==t&&t.innerText?document.querySelector(".mini-cart-wrapper .subtotal").innerText:"£0.00",s=parseFloat(d.replace("£","").replace(",",""));d="£"+(s+o*i).toFixed(2),document.querySelector(".".concat(v,"-total")).innerText=d;var l=null!==(n=document.querySelector(".minicart-total-qty"))&&void 0!==n&&n.innerText?document.querySelector(".minicart-total-qty").innerText:"0";document.querySelector(".".concat(v,"-subitems")).innerText=parseInt(l)+parseInt(i)+(parseInt(l)+parseInt(i)==1?" item":" items"),document.querySelector(".".concat(v,"-atc-holder")).classList.remove("".concat(v,"-hidden")),document.getElementById("product-detail-wrapper").classList.add("".concat(v,"-hidden")),clearInterval(e),e=setInterval((function(){var t,e,n,c;null!==(t=document.getElementById("mini-cart"))&&void 0!==t&&t.classList.contains("".concat(v,"-disabled"))||null===(n=document.getElementById("mini-cart"))||void 0===n||n.classList.add("".concat(v,"-disabled")),null!==(e=document.getElementById("mini-cart"))&&void 0!==e&&e.classList.contains("hover")&&(null===(c=document.getElementById("mini-cart"))||void 0===c||c.classList.remove("hover"))}),1);var u=5e3;window.outerWidth<600&&(u=500),setTimeout((function(){clearInterval(e)}),u)}(),m("Click - add to bag clicked, ATB upsell displayed",!0))),t.target.id=="".concat(v,"-continue-shopping")&&(t.preventDefault(),document.querySelector(".".concat(v,"-atc-holder")).classList.add("".concat(v,"-hidden")),document.getElementById("product-detail-wrapper").classList.remove("".concat(v,"-hidden")),null===(n=document.getElementById("mini-cart"))||void 0===n||n.classList.remove("".concat(v,"-disabled")),clearInterval(e),m("Click - continue shopping clicked from within ATB Upsell",!0)),t.target.id=="".concat(v,"-checkout")&&m("Click - proceed to checkout clicked from within ATB Upsell",!0)}))}))};if(!/MSIE|Trident|Edge\\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent)){var h=l;document.documentElement.classList.contains("".concat(h))||r(["body"],(function(){g()}))}}();'
                            }]
                        }
                    }
                },
                1332944: {
                    name: "HOT-709 | Click and collect for basket under £10",
                    traffic: 100,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 14,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "/basket"
                        }, {
                            include: !0,
                            condition: 10,
                            value: "/checkout/shipping"
                        }],
                        selectorScope: [{
                            include: !0,
                            condition: 45,
                            value: '[name="basketData"]'
                        }],
                        ipScope: [{
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1738980273"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "532270630"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1354599491"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "523403218"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "523402111"
                        }],
                        testId: 1332944,
                        qaUrlParameterEnabled: !1
                    },
                    audienceTrigger: [{
                        name: "Cart value below 10",
                        id: "08f12def-1b7a-42a4-85c1-63a75d791a65",
                        targeting_groups: [{
                            position: 0,
                            id: "ae447d27-cb83-4735-b30f-915cb2425b50",
                            targetings: [{
                                id: "72478186-475a-4d9e-bf69-b9f3f3995327",
                                operator: "auto",
                                position: 0,
                                conditions: [{
                                    id: "55b22fb0-1296-4236-a23a-aaabdfcd8e8a",
                                    value: 'const thresholdPrice=10;function isCartBelowTen(){const e=document.querySelector(\'input[name="basketData"]\');if(!e)return!1;const t=JSON.parse(e.value),{order_delivery_total:r,order_total_price:n}=t,o=r+n,l=document.querySelectorAll(\'#cart-table .delivery-info img[src*="click-and-collect-no"]\').length>0;return r>0&&o<10&&!l}var pollerLite=function(e,t,r){void 0===r&&(r=1e4);const n=Date.now(),o=setInterval((function(){e.every((function(e){return"function"==typeof e?e():!!document.querySelector(e)}))?(clearInterval(o),t()):Date.now()-n>=r&&(clearInterval(o),console.error("Polling exceeded maximum time limit"))}),25)};pollerLite(["#cart-table .delivery-info",\'[name="basketData"]\',()=>isCartBelowTen()],(()=>{abResolve(!0)}));',
                                    isAsync: !0
                                }],
                                targeting_type: 40
                            }]
                        }],
                        is_segment: !1
                    }],
                    campaignHash: "1c8f2d64b7a30d9231bb1a4869f8fd62",
                    id: 1332944,
                    additionalType: "",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1652019: {
                            id: 1652019,
                            traffic: 50,
                            name: "Variation 1"
                        },
                        1652020: {
                            id: 1652020,
                            traffic: 50,
                            name: "Custom Control"
                        }
                    }
                },
                1335226: {
                    name: "HOT-712 |  Add to Bag Upsell on My Account (mobile)",
                    traffic: 100,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 42,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/uk/my-account"
                        }],
                        ipScope: [{
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1991466549"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1738980273"
                        }],
                        testId: 1335226,
                        qaUrlParameterEnabled: !1
                    },
                    audienceTrigger: [{
                        name: "Check local storage for cc",
                        id: "7a053f7b-1a38-455f-a69d-10e91958cb33",
                        targeting_groups: [{
                            position: 0,
                            id: "62deb6e4-988b-4c8c-b87c-f43def61eb54",
                            targetings: [{
                                id: "b30f9d0b-dfb2-4d22-a072-892d07fa052b",
                                operator: "auto",
                                position: 0,
                                conditions: [{
                                    id: "441cbbd9-e2ef-4f5c-9fd3-51d2160c0092",
                                    value: 'function checkProCC(){for(let e=0;e<localStorage.length;e++){const o=localStorage.key(e);if(o.startsWith("configData"))try{const e=localStorage.getItem(o),r=JSON.parse(e);if(r&&r.pro&&void 0!==r.pro.cc)return 1===r.pro.cc}catch(e){console.error("Error parsing configData from localStorage for key:",o,e)}}return!1}var pollerLite=function(e,o,r){void 0===r&&(r=1e4);var t=Date.now(),n=setInterval((function(){e.every((function(e){return"function"==typeof e?e():!!document.querySelector(e)}))?(clearInterval(n),o()):Date.now()-t>=r&&(clearInterval(n),console.error("Polling exceeded maximum time limit"))}),25)};pollerLite([function(){return checkProCC()}],(function(){abResolve(!0)}));',
                                    isAsync: !0
                                }],
                                targeting_type: 40
                            }]
                        }],
                        is_segment: !1
                    }],
                    audienceSegment: [{
                        name: "Desktop and Mobile",
                        id: "c723c4de-59f9-4c70-8e38-ec4cc6032165",
                        targeting_groups: [{
                            position: 0,
                            id: "ab626771-01cb-4621-8279-7a05aea1ac97",
                            targetings: [{
                                id: "dee741fc-ca3e-4308-8778-f94e7fc4716e",
                                operator: "auto",
                                position: 0,
                                conditions: [{
                                    id: "6e29177b-7745-4344-94ab-7e9e2c5ea147",
                                    value: 1,
                                    is_segment_type: !0,
                                    include: !0
                                }],
                                targeting_type: 17
                            }]
                        }, {
                            position: 1,
                            id: "350c6161-2920-42b0-ae36-57b40448cd41",
                            targetings: [{
                                id: "9d55df6d-7ca3-42eb-ba1e-bb3831e622c1",
                                operator: "auto",
                                position: 0,
                                conditions: [{
                                    id: "9f1f77fd-0bf5-43be-884a-1a6e58057afd",
                                    value: 3,
                                    is_segment_type: !0,
                                    include: !0
                                }],
                                targeting_type: 17
                            }]
                        }],
                        is_segment: !0
                    }],
                    campaignHash: "d2b23530c953ec07d25c42905046826b",
                    id: 1335226,
                    additionalType: "",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1654856: {
                            id: 1654856,
                            traffic: 0,
                            name: "Variation 1"
                        },
                        1654859: {
                            id: 1654859,
                            traffic: 0,
                            name: "Custom Control"
                        },
                        1654863: {
                            id: 1654863,
                            traffic: 100,
                            name: "Variation 2"
                        }
                    }
                },
                1337117: {
                    name: "HOT-709 | Click and collect for basket under £10 (duplicate)",
                    traffic: 100,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 14,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "/basket"
                        }, {
                            include: !0,
                            condition: 10,
                            value: "/checkout/shipping"
                        }],
                        selectorScope: [{
                            include: !0,
                            condition: 45,
                            value: '[name="basketData"]'
                        }],
                        ipScope: [{
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1354599491"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1336782124"
                        }],
                        testId: 1337117,
                        qaUrlParameterEnabled: !1
                    },
                    audienceTrigger: [{
                        name: "Cart value below 11",
                        id: "519b4231-7a39-4cdb-b1e2-9bce9aad0877",
                        targeting_groups: [{
                            position: 0,
                            id: "b6be191f-ab7f-48bc-be26-e9ba9020c5d6",
                            targetings: [{
                                id: "501c13eb-1a49-41ba-94bb-f595081b04fd",
                                operator: "auto",
                                position: 0,
                                conditions: [{
                                    id: "8f76dae3-6466-43b8-803c-c7073c903002",
                                    value: 'const thresholdPrice=11;function isCartBelowEleven(){const e=document.querySelector(\'input[name="basketData"]\');if(!e)return!1;const t=JSON.parse(e.value),{order_delivery_total:r,order_total_price:n}=t,o=r+n,l=document.querySelectorAll(\'#cart-table .delivery-info img[src*="click-and-collect-no"]\').length>0;return r>0&&o<11&&!l}var pollerLite=function(e,t,r){void 0===r&&(r=1e4);const n=Date.now(),o=setInterval((function(){e.every((function(e){return"function"==typeof e?e():!!document.querySelector(e)}))?(clearInterval(o),t()):Date.now()-n>=r&&(clearInterval(o),console.error("Polling exceeded maximum time limit"))}),25)};pollerLite(["#cart-table .delivery-info",\'[name="basketData"]\',()=>isCartBelowEleven()],(()=>{abResolve(!0)}));',
                                    isAsync: !0
                                }],
                                targeting_type: 40
                            }]
                        }],
                        is_segment: !1
                    }],
                    campaignHash: "c32063c0343ea9ec5ff7dcaffc0b697a",
                    id: 1337117,
                    additionalType: "",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1657198: {
                            id: 1657198,
                            traffic: 100,
                            name: "Variation 1"
                        },
                        1657199: {
                            id: 1657199,
                            traffic: 0,
                            name: "Custom Control"
                        }
                    }
                },
                1340718: {
                    name: "HC083 - Velvetiser Basket Intercept (NEW)",
                    traffic: 100,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    globalCode: 'setTimeout((function(){var e,a,t,n,s,o,i="1340718",c=ABTasty.results[i].name,r=ABTasty.results[i].variationID,l=ABTasty.results[i].variationName;e=window,a=document,t="script",n="ga",e.GoogleAnalyticsObject=n,e[n]=e[n]||function(){(e[n].q=e[n].q||[]).push(arguments)},e[n].l=1*new Date,s=a.createElement(t),o=a.getElementsByTagName(t)[0],s.async=1,s.src="//www.google-analytics.com/analytics.js",o.parentNode.insertBefore(s,o),ga("create","UA-89936570-1",{cookieDomain:"none"}),ga("send","event","AB Tasty - Manual Code","["+i+"]"+c,"["+i+"]["+r+"]"+l,{nonInteraction:!0})}),1e3);',
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 35,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/uk/basket"
                        }, {
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/basket"
                        }],
                        selectorScope: [{
                            include: !0,
                            condition: 43,
                            value: "#cart-items-form"
                        }],
                        testId: 1340718,
                        qaUrlParameterEnabled: !1
                    },
                    campaignHash: "4b0ebca709b769ea72ca14acad0737bc",
                    id: 1340718,
                    additionalType: "",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1661850: {
                            id: 1661850,
                            traffic: 34,
                            name: "Control"
                        },
                        1661853: {
                            id: 1661853,
                            traffic: 33,
                            name: "Variation  1"
                        },
                        1662003: {
                            id: 1662003,
                            traffic: 33,
                            name: "Variation 2"
                        }
                    }
                },
                1342291: {
                    name: "[HC-156] - Seasonal Count Down ",
                    traffic: 50,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 9,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/uk/shop/christmas"
                        }],
                        ipScope: [{
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "523402111"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1486346467"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1442835598"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1354575100"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "634096730"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1510146474"
                        }],
                        testId: 1342291,
                        qaUrlParameterEnabled: !1
                    },
                    audienceSegment: [{
                        name: "Viewing Christmas Pages",
                        id: "da5d8c2d-ba58-46f8-8f21-cb2298d77a9e",
                        targeting_groups: [{
                            position: 0,
                            id: "e2bc89f6-667a-4eb9-a2c0-fd6bf583383b",
                            targetings: [{
                                id: "a394598f-0a4a-47ea-a0c6-8bd432191589",
                                operator: "auto",
                                position: 0,
                                conditions: [{
                                    id: "f8865d71-110f-46de-ac4d-70346f29b2f1",
                                    condition: 50,
                                    value: "2f44bab9-59da-45ba-893a-75e1c0edba55",
                                    timeframe: -1,
                                    visited_pages: 1,
                                    favoriteUrls: [{
                                        id: "bf8f2745-b705-4f43-8dbe-4ba9f002e025",
                                        favorite_url_id: "2f44bab9-59da-45ba-893a-75e1c0edba55",
                                        operator: "contain",
                                        url: "/uk/shop/christmas/",
                                        include: !0
                                    }],
                                    include: !0
                                }],
                                targeting_type: 52
                            }]
                        }],
                        is_segment: !0
                    }],
                    campaignHash: "f264f686e61bae1b5675fd3013a5e0ad",
                    id: 1342291,
                    additionalType: "",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1663781: {
                            id: 1663781,
                            traffic: 50,
                            name: "Variation 1"
                        }
                    }
                },
                1342393: {
                    name: "HOT-710 | Christmas Shopping Event Delivery Threshold (support)",
                    traffic: 100,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 19,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-maker.html"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/satin-black-velvetiser.html"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-machine.html"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-pack.html"
                        }, {
                            include: !1,
                            condition: 10,
                            value: "Velvetiser"
                        }],
                        ipScope: [{
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1666249552"
                        }, {
                            include: !0,
                            to: 0,
                            range: !1,
                            from: "1554184388"
                        }],
                        testId: 1342393,
                        qaUrlParameterEnabled: !1
                    },
                    audienceTrigger: [{
                        name: "Exclude Velvetiser Basket Page (duplicate)",
                        id: "e004073a-5acf-4b58-96df-8acc25fd432a",
                        targeting_groups: [{
                            position: 0,
                            id: "eab1313a-f4ee-4efa-bb22-eed7ffce1286",
                            targetings: [{
                                checkMode: "periodic",
                                checkLatency: 100,
                                id: "dde353eb-10e8-4411-8250-47c6b5728fb4",
                                operator: "and",
                                position: 0,
                                conditions: [{
                                    id: "08c3f4cd-6489-4009-98ca-4dd48b579210",
                                    datalayer_key: ".product_name",
                                    condition: 2,
                                    value: ["The Velvetiser - Charcoal Edition"]
                                }, {
                                    id: "6af45ea4-3124-47ac-8959-0e2b3c442a58",
                                    datalayer_key: ".product_name",
                                    condition: 2,
                                    value: ["The Velvetiser - Copper Edition"]
                                }, {
                                    id: "80cdaebe-e0f0-40ba-a7e8-33b32ad3a9e1",
                                    datalayer_key: ".product_name",
                                    condition: 2,
                                    value: ["The Velvetiser – Satin Black"]
                                }],
                                targeting_type: 44
                            }]
                        }],
                        is_segment: !1
                    }],
                    campaignHash: "b739614c080f20effb17bd3c5fbc7a99",
                    id: 1342393,
                    additionalType: "",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1663901: {
                            id: 1663901,
                            traffic: 100,
                            name: "Variation 1"
                        },
                        1663902: {
                            id: 1663902,
                            traffic: 0,
                            name: "Custom Control"
                        }
                    }
                },
                1346585: {
                    name: "HOT-711 | Black Friday  Shopping Event Delivery Threshold",
                    traffic: 100,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 18,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 10,
                            value: "https://www.hotelchocolat.com/"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-maker.html"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/satin-black-velvetiser.html"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-machine.html"
                        }, {
                            include: !1,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-pack.html"
                        }, {
                            include: !1,
                            condition: 10,
                            value: "Velvetiser"
                        }],
                        testId: 1346585,
                        qaUrlParameterEnabled: !1
                    },
                    campaignHash: "3e8d37c59da65b77e49439a4f2535d67",
                    id: 1346585,
                    additionalType: "",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1668975: {
                            id: 1668975,
                            traffic: 100,
                            name: "Variation 1"
                        },
                        1668976: {
                            id: 1668976,
                            traffic: 0,
                            name: "Custom Control"
                        }
                    }
                },
                1347788: {
                    name: "HC144.2 - PLP Quicklinks - Christmas 2024 (from 2 Dec)",
                    traffic: 100,
                    type: "ab",
                    sub_type: "ab",
                    parentID: 0,
                    globalCode: 'setTimeout((function(){var e,a,t,n,s,o,i="1347788",c=ABTasty.results[i].name,r=ABTasty.results[i].variationID,l=ABTasty.results[i].variationName;e=window,a=document,t="script",n="ga",e.GoogleAnalyticsObject=n,e[n]=e[n]||function(){(e[n].q=e[n].q||[]).push(arguments)},e[n].l=1*new Date,s=a.createElement(t),o=a.getElementsByTagName(t)[0],s.async=1,s.src="//www.google-analytics.com/analytics.js",o.parentNode.insertBefore(s,o),ga("create","UA-89936570-1",{cookieDomain:"none"}),ga("send","event","AB Tasty - Manual Code","["+i+"]"+c,"["+i+"]["+r+"]"+l,{nonInteraction:!0})}),1e3);',
                    targetingMode: "noajax",
                    dynamicTrafficModulation: 50,
                    dynamicTestedTraffic: 100,
                    priority: 0,
                    size: 22,
                    mutationObserverEnabled: !1,
                    displayFrequencyType: "any",
                    codeOnDomReady: !0,
                    isHashAllocationEnabled: !0,
                    m2eStartRange: 0,
                    segmentMode: "some",
                    triggerMode: "some",
                    scopes: {
                        urlScope: [{
                            include: !0,
                            condition: 40,
                            value: "https://www.hotelchocolat.com/uk/shop/black-friday/"
                        }],
                        selectorScope: [{
                            include: !0,
                            condition: 44,
                            value: ".pt_product-search-result"
                        }],
                        testId: 1347788,
                        qaUrlParameterEnabled: !1
                    },
                    campaignHash: "9868991d4e5f2116231ddc33f4995aa9",
                    id: 1347788,
                    additionalType: "",
                    isAsync: !0,
                    asyncVariationInfoById: {
                        1670453: {
                            id: 1670453,
                            traffic: 0,
                            name: "Variation Control"
                        },
                        1670454: {
                            id: 1670454,
                            traffic: 100,
                            name: "Variation 2"
                        }
                    }
                },
                global: {
                    needIPFetch: [],
                    needGeolocFetch: [1084028, 1084029, 1126844, 1126845, 1253222, 1254028, 1254033, 1309148, 1315112, 1319121, 1332944, 1335226, 1337117, 1342291, 1342393],
                    needAdBlockDetection: [],
                    needUAParserFetch: [941515, 1126844, 1200503, 1242403, 1254028, 1315114, 1331930, 1335226],
                    needDCInfosFetch: [],
                    needModificationEngine: !0,
                    needEngagementLevelFetch: [],
                    needDynamicAlloc: []
                }
            },
            accountLevelTrackings: {
                submit: [{
                    name: "DiscountCode_Submit",
                    selector: "#primary .cart-coupon-code .toggle-title"
                }],
                click: [{
                    name: "DiscountCode_Click",
                    selector: "#primary .cart-coupon-code .toggle-title"
                }, {
                    name: "MainDeliveryOption_CTA",
                    selector: "#primary .delivery-options .toggle-title"
                }]
            },
            accountRights: {
                emotionAiEnabled: !1,
                collectOnlyInternalEmotionAi: !1,
                fullInternalEmotionAi: !1,
                recoAndMerchEnabled: !1
            },
            widgets: {
                "@abtasty/countdown": {
                    3.9: {
                        code: '!function(){"use strict";const t=()=>Object.prototype.hasOwnProperty.call(window,"ABTastyEditor"),e=()=>{const t=!!document.getElementById("ABTastyPreviewBar"),e=location.href.includes("ab_project=preview");return t||e},n=t=>new Function(`try {\\n\\t\\t${t}\\n\\t} catch (error) {\\n\\t\\treturn null;\\n\\t}`)(),o=()=>encodeURIComponent(DATA.spNoTrim?window.location.href.replace(window.location.origin,""):`${window.location.pathname}`),i=()=>!t()&&(e()||!!window.ABTasty.getTestsOnPage()[TEST_ID]),s=()=>window.ABTasty&&!0===window.ABTasty.consentReady,r="remove",a="rebuild",c="update",l=()=>{const{type:t}=DATA;return`${PACKAGE.replace("@abtasty/","")}${t?`_${t}`:""}`},d=()=>{const t=l();return`${t.charAt(0).toUpperCase()}${t.slice(1)}`.split("-").join(" ")},u=()=>`${PLUGIN_ID.split("-")[0]}_${TEST_ID}`,h=n=>{const o=(()=>{if(t()||e())return!1;const n=ABTasty.getTestsOnPage()[TEST_ID];return!!n&&Object.keys(n.targetings.qaParameters).length>0})(),i=document.cookie.includes("abTastyDebug=")||!0===window.abTastyDebug;if(o||i){const t=d();window.console.log(`%c${t} - ${o?"QA":"Debug"} Mode for campaign ${TEST_ID} %c ${n}`,"background-color: #D6FF01; color: #3100be; padding: 3px 0 3px 10px; border-radius: 5px 0 0 5px; font-weight: bold;","background-color: #3100be; color: white; padding: 3px 10px 3px 0; border-radius: 0 5px 5px 0;")}},m=t=>{const e={promise:null,resolve:null,reject:null,name:t};return e.promise=new Promise(((t,n)=>{e.resolve=t,e.reject=n})),e},y=(t,e)=>{const n=()=>{try{return document.querySelector(t)}catch(t){return null}};let o=n();const i=[document.querySelector("body")||document.documentElement,{childList:!0,subtree:!0,attributes:!0}],s=()=>a.disconnect(),r=()=>a.observe(...i),a=new MutationObserver((()=>(o=n(),o&&!s()&&e(o))));return o?setTimeout((()=>e(o)),0):r(),{selector:t,clear:s,observe:r}};function p(t,e){return e(t)||!t.parentElement?t:p(t.parentElement,e)}const g=e=>{t()||(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation())},b=(t,e)=>[...document.querySelectorAll(e)].some((n=>n===t||!!t.closest(e))),w=(t,e)=>{let n=Date.now();return()=>{n+e-Date.now()<=0&&(t(),n=Date.now())}};class f{constructor(){this.targets=[],this.existingTargets=[],this.inViewportTargets=[],this.visibilityObserver=this.startVisibilityObserver(),this.mutationObserver=null,this.mouseOverEvent=this.mouseOverHandler(),this.scrollEvent=this.scrollEventHandler(),this.onTransitionEnd=this.transitionOverHandler()}transitionOverHandler(){const t=["transitionend",this.checkElements.bind(this),!0];return this.getEvents(t)}intersectionHandler(t){t.forEach((t=>{t.isIntersecting?(this.existingTargets.forEach((e=>{e.element.isSameNode(t.target)&&(this.inViewportTargets.push(e),this.mouseOverEvent.start(),this.scrollEvent.start(),this.onTransitionEnd.start())})),this.checkElements()):this.inViewportTargets=this.inViewportTargets.filter((e=>!e.element.isSameNode(t.target)||(this.mouseOverEvent.clear(),this.scrollEvent.clear(),this.onTransitionEnd.clear(),!1)))}))}startVisibilityObserver(){return new IntersectionObserver(this.intersectionHandler.bind(this),{root:null,rootMargin:"0px",threshold:0})}startMutationObserver(){this.mutationObserver??=new MutationObserver(this.checkElements.bind(this));const{clear:t}=y("body",(e=>{t(),this.mutationObserver.observe(e,{attributes:!0,childList:!0,subtree:!0})}));return this.mutationObserver}onMouseOver({target:t,path:e}){const n=this.inViewportTargets.find((({element:n,selector:o})=>{if(n.isSameNode(t))return!0;const i=[...t.querySelectorAll(o)];if(i.length&&i.includes(n))return!0;if(e.includes(n))return!0;const s=[...t.parentElement.children],r=s.findIndex((e=>e.isSameNode(t))),a=s.filter(((t,e)=>e>r));if(a.length){if(a.includes(n))return!0;if(a.some((t=>[...t.querySelectorAll(o)].includes(n))))return!0}return!1}));if(n&&this.isElementVisible(n.element)){const{selector:t,element:e,uniqueId:o}=n,i=this.targets.find((e=>e.selector===t&&e.uniqueId===o));i&&i.resolve(e),this.clear(t,o)}}getEvents(t){return{start:()=>document.addEventListener(...t),clear:()=>document.removeEventListener(...t)}}mouseOverHandler(){const t=["ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?"touchmove":"mouseover",t=>{const e=t.composedPath(),{target:n}=t;setTimeout((()=>this.onMouseOver({target:n,path:e})),50)},!0];return this.getEvents(t)}scrollEventHandler(){const t=["scroll",w(this.checkElements.bind(this),50),{passive:!0}];return this.getEvents(t)}isElementVisible(t){return this.isElementTopmost(t)&&this.isElementOpaque(t)}isElementOpaque(t){return"HTML"===p(t,(t=>"0"===window.getComputedStyle(t).opacity)).nodeName}isElementTopmost(t){const e=t.getBoundingClientRect(),n=[[e.left,e.top],[e.right,e.top],[e.left,e.bottom],[e.right,e.bottom],[e.left+e.width/2,e.top],[e.left+e.width/2,e.bottom],[e.left,e.height/2],[e.right,e.height/2],[e.left+e.left/2,e.height/2]];let o=!1,i=0;for(;!o&&i<n.length;){const e=document.elementFromPoint(...n[i]);o=t===e||t.contains(e),i+=1}return o}checkElements(){this.targets.forEach((({selector:t,uniqueId:e})=>{const n=document.querySelector(t);n&&!this.existingTargets.find((n=>n.element.matches(t)&&n.uniqueId===e))&&(this.existingTargets.push({element:n,selector:t,uniqueId:e}),this.visibilityObserver.observe(n))})),this.existingTargets=this.existingTargets.filter((({selector:t,element:e})=>!!document.querySelector(t)||(e&&this.visibilityObserver.unobserve(e),!1))),this.inViewportTargets=this.inViewportTargets.filter((({selector:t,element:e,uniqueId:n})=>{if(e.matches(t)&&this.isElementVisible(e)){const o=this.targets.find((e=>e.selector===t&&e.uniqueId===n));return o&&o.resolve(e),this.clear(t,n),!1}return!0}))}watch(t,e,n){this.targets.push({selector:t,resolve:e,uniqueId:n}),this.startMutationObserver(),this.checkElements()}clear(t,e){[this.targets,this.existingTargets,this.inViewportTargets]=[this.targets,this.existingTargets,this.inViewportTargets].map((n=>n.filter((({selector:n,uniqueId:o})=>n!==t&&o!==e))));const n=document.querySelector(t);n&&this.visibilityObserver.unobserve(n),0===this.targets.length&&this.mutationObserver?.disconnect(),0===this.inViewportTargets.length&&(this.mouseOverEvent.clear(),this.scrollEvent.clear(),this.onTransitionEnd.clear())}}class v{constructor({triggerEvent:t,triggerSelector:e,triggerDelay:n,triggerTarget:o}){this.event=t,this.selector=e&&e.length?e:"body",this.target=o,this.delay=1e3*n,this.elementsSelectors=[],this.eventsListeners=[],this.timeouts=[],this.intervals=[],this.promises=[],this.visibilityObservers=[],this.socialProofStore={}}async onElementVisible({promise:t,resolve:e}){const n=m(`${this.event}DomReady`);this.promises.push(n);const o=await this.onPageLoad(n),i=new f;if(this.visibilityObservers.push(i),o){const t=u();i.watch(this.selector,e,t)}return t}onPageLoad({promise:t,resolve:e}){const n=()=>"complete"===document.readyState;if(!n()){const o=["readystatechange",()=>n()&&e(!0),{passive:!0}];return this.eventsListeners.push([document,...o]),document.addEventListener(...o),t}return e(!0),t}onClick({promise:t,resolve:e}){const n=document.createElement("style");n.type="text/css",n.id=`Click_${u()}`,n.innerHTML=`${this.selector} {\\n\\t\\t\\tcursor: pointer !important;\\n\\t\\t\\tpointer-events: all !important;\\n\\t\\t}`,document.head.appendChild(n),this.elementsSelectors.push(`#${n.id}`);const o=["click",({isTrusted:t,target:n})=>{const o=n.isEqualNode(this.target)||b(n,this.selector);return t&&o&&e(!0)},{passive:!0,capture:!0}];return this.eventsListeners.push([document,...o]),document.addEventListener(...o),t}onHover({promise:t,resolve:e}){const n=["mouseenter",({isTrusted:t,target:n})=>{const o=this.target?n.isEqualNode(this.target):b(n,this.selector);return t&&o&&e(!0)},{passive:!0,capture:!0}];return this.eventsListeners.push([document.documentElement,...n]),document.documentElement.addEventListener(...n),t}onExitIntent({promise:t,resolve:e}){const n=["mouseleave",({isTrusted:t,clientY:n})=>{t&&n<=0&&e(!0)},{passive:!0}],{clear:o}=y("html",(t=>{o(),this.eventsListeners.push([t,...n]),t.addEventListener(...n)}));return t}onReengage({promise:t,resolve:e}){const n=this.delay;let o=n;const i=[({isTrusted:t})=>{t&&(o=n)},{passive:!0}];["click","mousemove","scroll","keypress"].forEach((t=>{this.eventsListeners.push([document,t,...i]),document.addEventListener(t,...i)}));const s=setInterval((()=>{o<=0?e(!0):o-=100}),100);return this.intervals.push(s),t}onCustomTrigger({promise:t,resolve:e}){const{triggerEventCustomScript:n}=DATA;return new Function(`return new Promise(async resolve => {${n}})`)().then((t=>t&&e(!0))),t}onScrollUp({promise:t,resolve:e}){let n=0;const o=["scroll",({isTrusted:t})=>{t&&(window.pageYOffset<n?e(!0):n=window.pageYOffset)},{passive:!0,capture:!0}];return this.eventsListeners.push([document,...o]),document.addEventListener(...o),t}onScrollPercentReached({promise:t,resolve:e}){const{triggerEventScrollPercent:n}=DATA,o=["scroll",({isTrusted:t})=>{if(!t)return;const o=(()=>{const{documentElement:t,body:e}=document,n=t.scrollTop||e.scrollTop,o=t.scrollHeight||e.scrollHeight;return Math.trunc(n/(o-t.clientHeight)*100,10)})();n<o&&e(!0)},{passive:!0,capture:!0}];return this.eventsListeners.push([document,...o]),document.addEventListener(...o),t}checkSocialProofConditions(t,e,n,o){const i=(()=>{let t;return window.ABTasty||window.ABTASTY_S?(window.ABTASTY_S&&window.ABTASTY_S.USER&&window.ABTASTY_S.USER.accountIdentifier&&window.ABTASTY_S.USER.accountIdentifier.length?t=window.ABTASTY_S.USER.accountIdentifier:window.ABTasty&&window.ABTasty.getAccountSettings&&"function"==typeof window.ABTasty.getAccountSettings?t=window.ABTasty.getAccountSettings().identifier:window.ABTasty&&window.ABTasty.accountSettings&&(t=window.ABTasty.accountSettings.identifier),t):t})(),{viewInterval:s,spNoTrim:r}=DATA;if(this.socialProofStore.hasOwnProperty(t))n(this.socialProofStore[t])?o(`${this.socialProofStore[t][s]}`):o(!1);else if(t&&i){const a=e=>(this.socialProofStore[t]=e,o(!!n(e)&&`${e[s]}`));fetch(`https://api-social-proof.abtasty.com/clients/${i}/metrics/${e}?key=${t}${r?"&noTrim=true":""}`).then((t=>t.ok&&t.json())).then(a).catch((()=>h("Failed to fetch datas from server.")))}else o(!1)}getSocialProofDatas({promise:t,resolve:e},i,s=!1){const{productKey:r,keyType:a}=(()=>{const{socialProofContentType:t,productKeyProvider:e,pathToProductKey:i,customJSProductKey:s,productSKU:r}=DATA;if(2===t)return{productKey:o(),keyType:"url"};{let a=null,c="sku";switch(e){case"ABTastyProductKey":a=window.ABTastyProductKey;break;case"pathToProductKey":a=n(`return ${i};`);break;case"customJSProductKey":a=n(s);break;case"productSKU":a=r}return a||3!==t||(a=o(),c="url"),{productKey:a,keyType:c}}})(),{viewInterval:c,triggerSocialProofMinVisitors:l,triggerSocialProofMinPurchases:d,triggerSocialProofMinPageViews:u}=DATA,m={pv:u,i:d,"v-pv":l}[i];return[typeof c,typeof m].includes("undefined")&&e(!1),s&&!r&&(h("Not able to find ABTastyProductKey, impossible to call the API, read documentation for more informations:\\n\\t\\t\\t\\thttps://support.abtasty.com/hc/en-us/articles/4710919241628-Widgets-List#h_84c04344-c655-4e5e-b9ab-d26a798ad9b0"),e(!1)),this.checkSocialProofConditions(r,"v-pv"===i&&"sku"===a?"v-i":i,(t=>{const e=void 0!==t[c]&&t[c]>=m;return e||h(`Widget will not be shown, Social Proof API returned ${t[c]} while ${m} are required`),e}),e),t}onConsent({promise:t,resolve:e}){if(!s()){const n=["abtasty_consentValid",()=>e(!0)];return this.eventsListeners.push(n),window.addEventListener(...n),t}return e(!0),t}onTrackingSent({promise:t,resolve:e}){const{triggerEventTrackingSent:n}=DATA;let o=localStorage.getItem("ABTastyData");const i=()=>JSON.parse(o).ActionTracking.find((({name:t})=>t===n)),s=["storage",()=>{o=localStorage.getItem("ABTastyData"),i()&&e(!0)},{passive:!0,capture:!0}];return o&&i()?e(!0):(()=>{this.eventsListeners.push([window,...s]),window.addEventListener(...s)})(),t}onMinPagesViewed({promise:t,resolve:e}){const{triggerEventMinPagesViewed:n}=DATA;let o=localStorage.getItem("ABTastyData");const i=()=>n<=(o?JSON.parse(o).VisitedPages.length:0),s=["storage",()=>{o=localStorage.getItem("ABTastyData"),i()&&e(!0)},{passive:!0,capture:!0}];return o&&i()?e(!0):(()=>{this.eventsListeners.push([window,...s]),window.addEventListener(...s)})(),t}onRageClick({promise:t,resolve:e}){const{triggerEventRageClickQuantity:n,triggerEventRageClickDelay:o}=DATA;let i=0,s=!1;const r=["click",({isTrusted:t})=>{if(t&&(i+=1,i>=n&&e(!0),!s)){s=!0;const t=setTimeout((()=>{i=0,s=!1}),o);this.timeouts.push(t)}},{passive:!0,capture:!0}];return this.eventsListeners.push([document,...r]),document.addEventListener(...r),t}clear(){if(this.elementsSelectors.length&&(this.elementsSelectors.forEach((t=>{document.querySelector(t)&&document.querySelector(t).remove()})),this.elementsSelectors=[]),this.eventsListeners.length&&(this.eventsListeners.forEach((t=>{const[e,...n]=t;e&&n.length>1&&e.removeEventListener(...n)})),this.eventsListeners=[]),this.timeouts.length&&(this.timeouts.forEach((t=>clearTimeout(t))),this.timeouts=[]),this.intervals.length&&(this.intervals.forEach((t=>clearInterval(t))),this.intervals=[]),this.visibilityObservers.length){const t=u();this.visibilityObservers.forEach((e=>e.clear(this.selector,t))),this.visibilityObservers=[]}return this.promises.length&&(this.promises.forEach((t=>t.resolve(!1))),this.promises=[]),this}async isTriggered(){this.clear();const t=m(this.event);this.promises.push(t);const e={consent:()=>this.onConsent(t),direct:()=>!0,pageLoad:()=>this.onPageLoad(t),click:()=>this.onClick(t),exitIntent:()=>this.onExitIntent(t),reengage:()=>this.onReengage(t),elementVisible:()=>this.onElementVisible(t),script:()=>this.onCustomTrigger(t),hover:()=>this.onHover(t),scrollUp:()=>this.onScrollUp(t),scrollPercent:()=>this.onScrollPercentReached(t),rageClick:()=>this.onRageClick(t),minPagesViewed:()=>this.onMinPagesViewed(t),trackingSent:()=>this.onTrackingSent(t),socialProofPurchases:()=>this.getSocialProofDatas(t,"i",!0),socialProofPageViews:()=>this.getSocialProofDatas(t,"pv"),socialProofVisitors:()=>this.getSocialProofDatas(t,"v-pv")},n=!Object.prototype.hasOwnProperty.call(e,this.event)||await e[this.event]();return n&&this.clear(),"reengage"!==this.event&&this.delay?n&&await(async()=>{const t=m(`${this.event}Delay`);this.promises.push(t);const e=setTimeout((()=>{t.resolve(!0),this.clear()}),this.delay);return this.timeouts.push(e),t.promise})():n}}const x="display",T="closing",S="validation",A="ABTastyWidgets",C=`${A}Temporary`;class ${constructor({displayRecurrence:t,closingRecurrence:e,validationRecurrence:n},o){this.displayRecurrence=parseFloat(t),this.closingRecurrence=parseFloat(e),this.validationRecurrence=parseFloat(n),this.onSetCallback=o,this.widgetName=l(),this.uniqueId=u(),this.recurrenceKey=`${this.widgetName}_${this.uniqueId}`,this.isListeningStorageEvent=this.listenStorageEvent(),this.pendingRecurrence=!1,this.pendingRecurrenceValue={}}onStorage({key:t}){const e=localStorage.getItem(C),n=sessionStorage.getItem(A);"ABTastyData"===t&&!e&&n&&localStorage.setItem(C,n)}listenStorageEvent(){return this.isListeningStorageEvent||window.addEventListener("storage",this.onStorage.bind(this)),!0}getGivenRecurrenceStorageParsed(t){try{const e=t.getItem(A);return JSON.parse(e)}catch(e){return t.removeItem(A),!1}}getSessionRecurrenceStorageParsed(){return this.getGivenRecurrenceStorageParsed(window.sessionStorage)}getLocalRecurrenceStorageParsed(){return this.getGivenRecurrenceStorageParsed(window.localStorage)}removeGivenStorage(t,e){const{[this.recurrenceKey]:n,...o}=e;return Object.entries(o).length?(t.setItem(A,JSON.stringify(o)),o):(t.removeItem(A),!1)}removeSessionRecurrenceStorage(){const t=this.getSessionRecurrenceStorageParsed();return!!t&&this.removeGivenStorage(window.sessionStorage,t)}removeLocalRecurrenceStorage(){const t=this.getLocalRecurrenceStorageParsed();return!!t&&this.removeGivenStorage(window.localStorage,t)}getSessionRecurrence(){const t=this.getSessionRecurrenceStorageParsed();return!!t&&t[this.recurrenceKey]}getLocalRecurrence(){const t=this.getLocalRecurrenceStorageParsed();return!!t&&t[this.recurrenceKey]}getCurrentRecurrence(){if(this.pendingRecurrence)return this.pendingRecurrenceValue;const t=this.getSessionRecurrence(),e=this.getLocalRecurrence();return t||e||{type:!1}}isOver(){const t=localStorage.getItem(C),e=!(!t||!t.includes(this.recurrenceKey))||this.getSessionRecurrence();t&&(sessionStorage.setItem(A,t),localStorage.removeItem(C));const n=this.getLocalRecurrence(),o=(n?parseFloat(n.stamp):0)<(new Date).getTime();return o&&this.removeLocalRecurrenceStorage(),!this.pendingRecurrence&&o&&!this.getLocalRecurrence()&&!e}setRecurrence(t,n){0!==t&&(window.removeEventListener("storage",this.onStorage.bind(this)),this.isListeningStorageEvent=!1);const o=this.getTypeOfStorage(t);if(e()||!o&&"object"!=typeof o)return!1;const{storageString:i,storageMethod:r}=o,a=this.getStamp(t),c={type:n,stamp:a},{type:l}=this.getCurrentRecurrence(),d=async()=>{if(!s()){this.pendingRecurrence=!0,this.pendingRecurrenceValue=c;const t=new v({triggerEvent:"consent"});await t.isTriggered(),this.pendingRecurrence=!1,this.pendingRecurrenceValue={}}const t=this.getSessionRecurrence(),e=this.getLocalRecurrence();let n;"session"===i?t?n=this.removeSessionRecurrenceStorage():(this.removeLocalRecurrenceStorage(),n=this.getSessionRecurrenceStorageParsed()):"local"===i&&(e?n=this.removeLocalRecurrenceStorage():(this.removeSessionRecurrenceStorage(),n=this.getLocalRecurrenceStorageParsed()));const o=n?{[this.recurrenceKey]:c,...n}:{[this.recurrenceKey]:c};r.setItem(A,JSON.stringify(o)),this.onSetCallback&&"function"==typeof this.onSetCallback&&this.onSetCallback()};if(!r)return!1;if(l&&n!==S)if(n===T&&l!==S)d();else{if(n!==x||l===S||l===T)return!1;d()}else d();return a}setDisplayRecurrence(){const t=x;this.setRecurrence(this.displayRecurrence,t)}setClosingRecurrence(){const t=T;this.setRecurrence(this.closingRecurrence,t)}setValidationRecurrence(){const t=S;this.setRecurrence(this.validationRecurrence,t)}getStamp(t){return(new Date).getTime()+864e5*t}getTypeOfStorage(t){return!(isNaN(t)||t<0||0!==t&&!t)&&(t>0?{storageString:"local",storageMethod:window.localStorage}:0===t&&{storageString:"session",storageMethod:window.sessionStorage})}}class E{constructor(t,e,n){this.isWidgetApplied=t,this.callback=e,this.shouldUpdate=n,this.observer=new MutationObserver(this.observerHandler.bind(this)),this.tagRollbackEventParams=["abtasty_resetActionTracking",this.onTagRollback.bind(this)],this.onCampaignLaunchedEventParams=["abtasty_executedCampaign",this.onCampaignLaunched.bind(this)]}decisionHandler(){const t=this.isWidgetApplied()?this.shouldUpdate&&c:a;return t?(this.clearWatcher(),this.callback(t,!0),this.watch(),this):this}onCampaignLaunched({detail:{campaignId:t}}){t===TEST_ID&&(this.callback(a,!1),this.watch())}onTagRollback(){return this.clearWatcher(),this.callback(r,!1),window.addEventListener(...this.onCampaignLaunchedEventParams),this}observerHandler(t){return i()?t.some((t=>["removedNodes","addedNodes"].some((e=>t[e]&&t[e].length))))?this.decisionHandler():this:this.callback(r,!1)}watch(){if(t())return this;this.clearWatcher(),window.removeEventListener(...this.onCampaignLaunchedEventParams),document.addEventListener(...this.tagRollbackEventParams);const{clear:e}=y("body",(t=>{e(),this.observer.observe(t,{childList:!0,subtree:!0})}));return this}clearWatcher(){return document.removeEventListener(...this.tagRollbackEventParams),this.observer.disconnect(),this}}const k=/.+\\/([^.]+)\\.(otf|ttf)$/,L=["socialProofPurchases","socialProofPageViews","socialProofVisitors"];class P{constructor(e,n){this.children=void 0,this.uniqueId=`${u()}${n?`_${n}`:""}`,this.widgetName=l(),this.prettyName=d(),this.recurrenceParams=(()=>{const{displayRecurrence:e,closingRecurrence:n,validationRecurrence:o}=DATA,i=!e&&!n&&!o;if(t()||i)return!1;const s={everytime:()=>-1,session:()=>0,once:()=>395,day:t=>DATA[`${t}_day`],week:t=>7*DATA[`${t}_week`],month:t=>30.5*DATA[`${t}_month`]},r={};return e&&(r.displayRecurrence=s[e]("displayRecurrence")),n&&(r.closingRecurrence=s[n]("closingRecurrence")),o&&(r.validationRecurrence=s[o]("validationRecurrence")),r})(),this.triggerParams=(e=>{let{triggerEvent:n}=DATA;const{triggerEventClick:o,triggerEventHover:i,triggerEventReengageDelay:s,socialProofContentType:r,triggerEventElementVisible:a,triggerEventDelay:c}=DATA;if(t()||!n&&!r)return!1;const l={click:()=>o,hover:()=>i,elementVisible:()=>a},d=Object.prototype.hasOwnProperty.call(l,n)?l[n]():"body",u="reengage"===n?s:c;return r&&(n=[,"socialProofPurchases","socialProofPageViews","socialProofVisitors"][r]),{triggerEvent:n,triggerSelector:d,triggerDelay:u,triggerTarget:e}})(e),this.recurrence=!!this.recurrenceParams&&new $(this.recurrenceParams,this.clearGivenClearables.bind(this)),this.trigger=!!this.triggerParams&&new v(this.triggerParams),this.shouldUpdate=!!this.triggerParams&&L.includes(this.triggerParams.triggerEvent),this.pageWatcher=new E(this.isWidgetApplied.bind(this),this.onPageChange.bind(this),this.shouldUpdate),this.hasOncePerPageTrigger=(()=>{const{isOncePerPageTrigger:t,triggerEvent:e}=DATA;return!e||!["click","hover","scrollUp","script"].includes(e)||t})(),this.basicClassName=`ab_widget_container_${this.widgetName}`,this.widgetContainerId=`${this.basicClassName}_${this.uniqueId}`,this.contentClassName=`${this.basicClassName}_content`,this.overlayClassName=`${this.basicClassName}_overlay`,this.closeButtonClassName=`${this.basicClassName}_close_button`,this.hideClassName=`ab_hide_${this.uniqueId}`,this.domElement=this.getDom(),this.hasBeenShown=!1,this.closedByUser=!1,this.eventsListeners=[],this.timeouts=[],this.intervals=[],this.observers=[],this.promises=[],this.elementsWaiters=[]}clearGivenClearables(){this.eventsListeners.forEach((t=>document.removeEventListener(...t))),this.eventsListeners=[],this.timeouts.forEach((t=>clearTimeout(t))),this.timeouts=[],this.intervals.forEach((t=>clearInterval(t))),this.intervals=[],this.elementsWaiters.forEach((t=>t.clear())),this.elementsWaiters=[]}isWidgetApplied(){return!(!this.hasBeenShown||!this.hasOncePerPageTrigger)||this.domElement&&this.domElement.isConnected}removeOldDomElement(){const t=document.getElementById(this.widgetContainerId);return t&&t.remove(),this}async insert(){if(this.isWidgetApplied())return!1;document.head.appendChild(this.styleElement);const t=["free"];return"drawer"===DATA.layout&&DATA.customTarget&&t.push("drawer"),new Promise((e=>{const{elementReferrer:n="body",referrerInsertType:o="beforeend"}=t.includes(DATA.layout)?DATA:{},i=y(n,(t=>{this.elementsWaiters=this.elementsWaiters.filter((t=>t.selector!==n)),this.removeOldDomElement(),e(t.insertAdjacentElement(o,this.domElement))}));this.elementsWaiters.push(i)})).then((()=>this))}remove(){return this.trigger&&this.trigger.clear(),this.pageWatcher.clearWatcher(),[this.domElement,this.styleElement].forEach((t=>t&&t.isConnected&&t.remove())),this.hasOncePerPageTrigger?this.pageWatcher.watch():t()||this.init().then((({response:t})=>t?this.show():this)),this}show(){return t()||this.hasBeenShown&&this.hasOncePerPageTrigger||window.ABTastyEvent(`${this.prettyName} displayed`,null,TEST_ID),this.closedByUser=!1,setTimeout((()=>this.domElement.classList.remove(this.hideClassName)),50),this.recurrence&&this.recurrence.setDisplayRecurrence(),this.hasBeenShown=!0,this.pageWatcher.watch(),this}hide(e=!0){return!t()&&this.hasBeenShown&&e&&window.ABTastyEvent(`${this.prettyName} closed`,null,TEST_ID),e&&(this.pageWatcher.clearWatcher(),this.closedByUser=!0),this.domElement.classList.add(this.hideClassName),this}async init(e){const n=t(),o=i(),s=this.trigger&&this.trigger.promises.length,r=!this.recurrence||this.recurrence.isOver();if(!n&&!o||s||!r)return{container:this,response:!1};this.pageWatcher.watch();const a=n||!this.trigger||this.trigger&&await this.trigger.isTriggered(),c={container:this,response:a};return a?(await this.insert(),this.addCloseEvent(),n||e||this.hasBeenShown||void 0===this.children||"function"!=typeof this.children.refreshContent||this.children.refreshContent(a),c):c}onPageChange(t,e){const n=()=>this.init().then((({response:t})=>{t?this.show():this.hide(!1)}));e||(this.hasBeenShown=!1,this.trigger&&this.trigger.clear());const o=this.isWidgetApplied(),i={[r]:()=>o?this.remove():this.pageWatcher.watch(),[a]:()=>{this.hasBeenShown?this.closedByUser?this.pageWatcher.watch():o||this.insert().then((t=>t.show())).catch(this.pageWatcher.watch):n()},[c]:()=>{this.hasBeenShown?this.pageWatcher.watch():n()}};"function"==typeof i[t]&&i[t]()}addCloseEvent(...e){const{closeButton:n,overlay:o,overlayClickable:i,layout:s,animationDuration:r=1e3}=DATA,a=[];if(void 0!==o&&!0!==o||!0!==i||"popin"!==s||a.push(`.${this.overlayClassName}`),void 0!==n&&n&&a.push(`.${this.closeButtonClassName}`),!a.length)return this;const c=this.domElement.querySelectorAll(a.join(", "));if(!c.length)return this;const l=["click",t=>{g(t),this.recurrence&&this.recurrence.setClosingRecurrence(),this.hide(!0),setTimeout((()=>this.remove()),1.05*r)},{once:!0,capture:!0}];return e.push(...c),e.forEach((e=>{t()&&(e.dataset.abtastyActionnable="true"),e.removeEventListener(...l),e.addEventListener(...l)})),this}getDom(){const{closeButton:t,layout:e,overlayClickable:n,overlay:o=!0}=DATA,i=document.createElement("div");return i.className=`${this.basicClassName} ${this.hideClassName}`,i.id=this.widgetContainerId,["popin","bannerTop","bannerBottom"].includes(e)&&(i.role="dialog"),i.innerHTML=`\\n\\t\\t\\t${"popin"===e&&!0===o?`<div ${n?\'aria-label="Close dialog"\':""} class="${this.overlayClassName}"></div>`:""}\\n\\t\\t\\t<div class="${this.contentClassName}">\\n\\t\\t\\t${t?`<button class="${this.closeButtonClassName}" aria-label="Close dialog"><svg viewBox="0 0 16 16">\\n\\t<defs><path id="prefix__a" d="M12 4.991L11.009 4 8 7.009 4.991 4 4 4.991 7.009 8 4 11.009 4.991 12 8 8.991 11.009 12 12 11.009 8.991 8z"></path></defs>\\n\\t<g><use xlink:href="#prefix__a"></use></g>\\n</svg></button>`:""}\\n\\t\\t\\t</div>`,i}loadFont(t,e){if(!t||"inherit"===t||!/otf|ttf/g.test(e))return;const n=document.createElement("style"),o=e.match(k)?e.match(k)[1]:"";n.innerHTML=`@font-face { font-family: \'${t}_${o}\';  src: url(\'${e}\'); font-display: swap; }`,document.head.appendChild(n)}getStyleTag(e="",n=DATA){const{noStyles:o,layout:i}=n,{backgroundColor:s,isBackgroundImage:r,backgroundImage:a,backgroundSize:c,backgroundPosition:l,backgroundRepeat:d,borderColor:u,borderRadius:h,borderWidth:m,textColor:y,textAlign:p,fontName:g,fontStyle:b,fontSize:w,isTitle:f,titleTextAlign:v,titleTextColor:x,titleFontName:T,titleFontStyle:S,titleFontSize:A,overlay:C,overlayColor:$,dropShadow:E,dropShadowColor:L,dropShadowBlur:P,containerMargin:B,containerPadding:D,closeButton:_,closeButtonPosition:I,closeButtonSize:N,closeButtonBorderRadius:R,closeButtonBorderWidth:O,closeButtonBorderColor:j,closeButtonColor:W,closeButtonBackgroundColor:M,buttonsAlign:q,buttonsBorderWidth:V,buttonsBorderColor:H,buttonsBorderRadius:F,buttonsBackgroundColor:z,buttonsTextColor:U,buttonsFontName:K,buttonsFontStyle:G,buttonsFontSize:Y,secondLink:J,secondLinkBorderWidth:Q,secondLinkBorderColor:Z,secondLinkBorderRadius:X,secondLinkBackgroundColor:tt,secondLinkTextColor:et,secondLinkFontName:nt,secondLinkFontStyle:ot,secondLinkFontSize:it,animation:st,animationDuration:rt,animationBehaviour:at,animationSlideDirection:ct}=o?{}:n,lt=document.createElement("style");lt.type="text/css",t()&&lt.setAttribute("abtasty-script-added","true"),this.loadFont(g,b),this.loadFont(T,S),this.loadFont(K,G),this.loadFont(nt,ot);const dt=`background: ${["string"==typeof s?s:"rgba(255, 255, 255, 1)",r&&"string"==typeof a&&a.length?`url(${a})`:"",r&&"string"==typeof l&&"100% 100%"!==c?l:"0 0",r&&"string"==typeof c?`/ ${c}`:"/ auto",r&&d&&!["cover","100% 100%"].includes(c)?"repeat":"no-repeat"].join(" ").trim()};`,ut="number"==typeof m&&m>0,ht=`border: ${[ut?`${m}px`:"unset",ut?"solid":"",ut&&"string"==typeof u&&u.length?u:""].join(" ").trim()};`,mt=void 0!==h?`border-radius: ${h}px;`:"",yt=void 0!==y?`color: ${y}; fill: ${y}; -webkit-text-fill-color: ${y};`:"",pt=void 0!==p?`text-align: ${p};`:"",gt=g&&"inherit"!==g?`font-family:${g}_${b.match(k)?b.match(k)[1]:""};`:b||"",bt=w?`font-size: ${w}px;`:"",wt=void 0!==E&&E?`box-shadow: 0 5px ${P}px 0 ${L};`:"",ft=B instanceof Array&&1===B.length&&B[0],vt=ft?`margin: ${ft.top}px ${ft.right}px ${ft.bottom}px ${ft.left}px;`:"",xt=ft?`margin: calc(${ft.top}px * 0.5) calc(${ft.right}px * 0.5) calc(${ft.bottom}px * 0.5) calc(${ft.left}px * 0.5);`:"",Tt=D instanceof Array&&1===D.length&&D[0],St=Tt?`padding: ${Tt.top}px ${Tt.right}px ${Tt.bottom}px ${Tt.left}px;`:"",At=Tt?`padding: calc(${Tt.top}px * 0.5) calc(${Tt.right}px * 0.5) calc(${Tt.bottom}px * 0.5) calc(${Tt.left}px * 0.5);`:"",Ct=void 0!==V&&V?`border-width: ${V}px; border-style: solid;`:"",$t=[H,V].every((t=>void 0!==t))&&V?`border-color: ${H};`:"",Et=void 0!==F?`border-radius: ${F}px;`:"",kt=void 0!==z?`background-color: ${z};`:"",Lt=void 0!==U?`color: ${U}; fill: ${U}; -webkit-text-fill-color: ${U};`:"",Pt=K&&"inherit"!==K?`font-family:${K}_${G.match(k)?G.match(k)[1]:""};`:G||"",Bt=Y?`font-size: ${Y}px;`:"",Dt="number"==typeof Q?`border-width: ${Q}px; border-style: solid;`:"",_t=[Z,Q].every((t=>void 0!==t))&&Q?`border-color: ${Z};`:"",It=void 0!==X?`border-radius: ${X}px;`:"",Nt=void 0!==tt?`background-color: ${tt};`:"",Rt=void 0!==et?`color: ${et}; fill: ${et}; -webkit-text-fill-color: ${et};`:"",Ot=nt&&"inherit"!==nt?`font-family:${nt}_${ot.match(k)?ot.match(k)[1]:""};`:ot||"",jt=it?`font-size: ${it}px;`:"",Wt="popin"!==i||void 0!==C&&!0!==C?"":[`#${this.widgetContainerId} .${this.overlayClassName} {`,`background-color: ${void 0!==$?$:"rgba(0, 0, 0, 0.6)"};`,"}"].join(""),Mt="number"==typeof N?N:16,qt=Mt/2,Vt=o||void 0!==_&&_?[`#${this.widgetContainerId} .${this.contentClassName} .${this.closeButtonClassName} {`,"position: absolute;",("out"===I?`bottom: calc(100% + ${qt}px)`:`top: ${qt}px`)+";",`right: ${qt}px;`,"width: auto;","height: auto;","background: none;","border: none;","cursor: pointer;","padding: 0;","margin: 0;","line-height: 0;","z-index: 9;","number"==typeof R?`border-radius: ${R}px;`:"","number"==typeof O&&O>0?`border: ${O}px solid ${void 0!==j?j:"rgba(57, 57, 57, 1)"};`:"","string"==typeof M?`background-color: ${M};`:"","}",`#${this.widgetContainerId} .${this.contentClassName} .${this.closeButtonClassName} svg {`,"pointer-events: none;",`width: ${Mt}px;`,`height: ${Mt}px;`,"string"==typeof W?`fill: ${W};`:"","}"].join(""):"",Ht=f&&"string"==typeof x?[`#${this.widgetContainerId} .${this.contentClassName} > * h1, `,`#${this.widgetContainerId} .${this.contentClassName} > * h2, `,`#${this.widgetContainerId} .${this.contentClassName} > * h3, `,`#${this.widgetContainerId} .${this.contentClassName} > * h4, `,`#${this.widgetContainerId} .${this.contentClassName} > * h5, `,`#${this.widgetContainerId} .${this.contentClassName} > * h6 {`,`color: ${x}; fill: ${x}; -webkit-text-fill-color: ${x};`,void 0!==v?`text-align: ${v};`:"",T&&"inherit"!==T?`font-family:${T}_${S.match(k)?S.match(k)[1]:""};`:S||"",A?`font-size: ${A}px;`:"","}"].join(""):"";let Ft="";if("string"==typeof st){const e=(rt/1e3).toFixed(2),n=["top","bottom"].includes(ct),o=Number(n),i=[(["top","left"].includes(ct)?"-":"")+"100vmax",this.translateValues?this.translateValues[o]:"0"];n&&i.reverse(),Ft={none:[`.${this.hideClassName} {`,"opacity: 0 !important;","}"],fade:[`.${this.hideClassName} {`,"opacity: 0 !important;","}",`#${this.widgetContainerId} {`,`transition: opacity ${e}s ${at};`,"}"],slide:[`.${this.hideClassName} .${this.overlayClassName} {`,"opacity: 0 !important;","}",`#${this.widgetContainerId} .${this.overlayClassName} {`,`transition: opacity ${e}s ${at};`,"}",`.${this.hideClassName} .${this.contentClassName} {`,`transform: translate(${i.join(", ")}) !important;`,"}",`#${this.widgetContainerId} .${this.contentClassName} {`,`transition: transform ${e}s ${at};`,"}"]}[t()&&!ABTASTY_S.WIDGETS.animationChanged?"none":st].join("")}const zt=[`#${this.widgetContainerId} .${this.contentClassName} .buttons_container .second_link {`,`margin-${"fill"===q?"top":"left"}: 8px;`,Dt,_t,It,Nt,Rt,Ot,jt,"}",`#${this.widgetContainerId} .${this.contentClassName} .buttons_container .second_link {`,Rt,Ot,jt,"}"];return lt.textContent=[`.${this.hideClassName} {`,"pointer-events: none;","}",`#${this.widgetContainerId} {`,"opacity: 1;","}",`#${this.widgetContainerId} .${this.contentClassName} {`,dt,mt,ht,yt,pt,wt,vt,gt,bt,"}",`#${this.widgetContainerId} .${this.contentClassName} p {`,yt,pt,gt,bt,"}",`#${this.widgetContainerId} .${this.contentClassName} > * {`,"display: block;","line-height: 1;","text-indent: unset;",St,gt,bt,"}",`#${this.widgetContainerId} .${this.contentClassName} a {`,"text-decoration: underline;","}",`#${this.widgetContainerId} .${this.contentClassName} div.buttons_container a, `,`#${this.widgetContainerId} .${this.contentClassName} button {`,"text-decoration: none;","box-sizing: border-box;","display: inline-block;",Ct,$t,Et,kt,Lt,Pt,Bt,"}",`#${this.widgetContainerId} .${this.contentClassName} div.buttons_container a *, `,`#${this.widgetContainerId} .${this.contentClassName} button:not(class*="close_button") * {`,Lt,Pt,Bt,"}",...J?zt:[],"@media screen and (max-width: 579px) {",`#${this.widgetContainerId} .${this.contentClassName} {`,xt,"}",`#${this.widgetContainerId} .${this.contentClassName} > * {`,At,"}","}",Wt,Vt,Ht,Ft,`${e}`].join(""),lt}}const B=["top: 0;","top: 50%;","bottom: 0;"],D=["left: 0;","left: 50%;","right: 0;"],_=t=>1===t?"-50%":0,I=()=>{if(Array.isArray(DATA.popinPosition)){const{popinPosition:[{x:t,y:e}]}=DATA,n=`translate(${_(e)}, ${_(t)});`;return`${B[t]}${D[e]}transform: ${n}`}return"left: 50%;top: 50%;transform: translate(-50%, -50%);"},N=()=>"autoWidth"in DATA&&!0===DATA.autoWidth,R=()=>{if(N())return"width: auto; height: auto; min-width: fit-content;";const{popinPercentWidth:t,popinPixelsWidth:e,widthUnit:n,autoHeight:o,popinPercentHeight:i,popinPixelsHeight:s,heightUnit:r}=DATA;return`width: ${"px"===n?e:t}${n};height: ${o?"auto":`${"px"===r?s:i}${r}`};`};class O extends P{constructor(){super(),this.translateValues=Object.values(DATA.popinPosition[0]).map((t=>_(t))),this.stringStyles=this.getStyles(),this.styleElement=this.getStyleTag(this.stringStyles)}getStyles(){const{zindex:t,zindexCustom:e,widthUnit:n}=DATA,o="string"!=typeof DATA.overlay&&DATA.overlay;return[`#${this.widgetContainerId} {`,"position: fixed;","top: 0;","left: 0;","width: 100%;","height: 100%;",`z-index: ${"custom"===t?e:t};`,"background: none;","pointer-events: "+(o?"all":"none"),"}",`#${this.widgetContainerId} .${this.overlayClassName} {`,"position: absolute;","z-index: -1;","top: 0;","left: 0;","width: 100%;","height: 100%;","}",`#${this.widgetContainerId} .${this.contentClassName} {`,"position: absolute;",I(),R(),"pointer-events: all","}",`${N()?"":[`#${this.widgetContainerId} .${this.contentClassName} > div {`,"height: 100%;","overflow: auto;","box-sizing: border-box;","}"].join("")}`,`${!N()&&["px","em"].includes(n)?["@media screen and (max-width: 579px) {",`#${this.widgetContainerId} .${this.contentClassName} {`,"max-width: 94vw;","}","}"].join(""):""}`].join("")}}class j extends P{constructor(){super(),this.position="string"==typeof DATA.layout&&"bannerTop"===DATA.layout?"top":"bottom",this.stringStyles=this.getStyles(),this.styleElement=this.getStyleTag(this.stringStyles)}getStyles(){const{zindex:t,zindexCustom:e}=DATA;return[`#${this.widgetContainerId} {`,"position: fixed;",`${this.position}: 0;`,"left: 0;","width: 100%;","height: auto;",`z-index: ${"custom"===t?e:t};`,"background: none;","}",`#${this.widgetContainerId} .${this.contentClassName} {`,"position: relative;","}"].join("")}}class W extends P{constructor(t,e){super(t,e),this.stringStyles=this.getStyles(),this.styleElement=this.getStyleTag(this.stringStyles)}getStyles(){return[`#${this.widgetContainerId} {`,"width: auto;","height: auto;","margin: 0;","padding: 0;","background: none;","}",`#${this.widgetContainerId} .${this.contentClassName} {`,"position: relative;","}"].join("")}}const M=()=>{const{layout:t}=DATA;let e;switch(t){case"popin":e=new O;break;case"bannerTop":case"bannerBottom":e=new j;break;case"free":e=new W;break;default:e=new P}return e};function q(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=Array(e);n<e;n++)o[n]=t[n];return o}var V=/.+\\/([^.]+)\\.(otf|ttf)$/,H=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"popin",n=DATA,o=n.imageOn,i=n.layout,s=n.inlineLayoutContent;if(!t||!o)return"";var r=DATA.image;return\'<div class="countdown_\'.concat(e,\'_img_container">\\n\\t\\t\\t\\t<img src="\').concat(r,\'" class="abtasty-countdown-image \').concat("popin"===i||"free"===i&&!s?"abtasty-countdown-image-popin-layout":"",\'">\\n\\t\\t\\t</div>\')},F=["fr","en","de","es"],z=["day","hour","minute","second"],U={day:{en:"Day",fr:"Jour",es:"Dia",de:"Tag"},days:{en:"Days",fr:"Jours",es:"Dias",de:"Tage"},hour:{en:"Hour",fr:"Heure",es:"Hora",de:"Zeit"},hours:{en:"Hours",fr:"Heures",es:"Horas",de:"Stunden"},minute:"Min",second:{en:"Sec",fr:"Sec",es:"Seg",de:"Sek"}},K="line",G=window.ABTASTY_S&&ABTASTY_S.USER&&ABTASTY_S.USER.lang?ABTASTY_S.USER.lang.split("_")[0]:navigator.language.substr(0,2)||"en",Y=function(t){return F.indexOf(t)>-1}(G)?G:"en",J={day:U.day[Y],days:U.days[Y],hour:U.hour[Y],hours:U.hours[Y],minute:U.minute,minutes:U.minute,second:U.second[Y],seconds:U.second[Y]};function Q(t){return Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Q(t)}function Z(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=X(t))||e){n&&(t=n);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,r=!0,a=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return r=t.done,t},e:function(t){a=!0,s=t},f:function(){try{r||null==n.return||n.return()}finally{if(a)throw s}}}}function X(t,e){if(t){if("string"==typeof t)return tt(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?tt(t,e):void 0}}function tt(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=Array(e);n<e;n++)o[n]=t[n];return o}function et(t){var e=function(t){if("object"!=Q(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var n=e.call(t,"string");if("object"!=Q(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==Q(e)?e:e+""}var nt=function(){return e=function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.testId=e,this.container=this.createContainer(),this.digitElements={},this.textElements={},this.timerElements={},this.timeLoop=null,this.maxWidth=0,this.previewTime=172799,this.unitsText=J,this.fonts=[],DATA.customTexts&&(this.unitsText={day:DATA.customDaysLabel,days:DATA.customDaysLabel,hour:DATA.customHoursLabel,hours:DATA.customHoursLabel,minute:DATA.customMinutesLabel,minutes:DATA.customMinutesLabel,second:DATA.customSecondsLabel,seconds:DATA.customSecondsLabel})},n=[{key:"remove",value:function(){var t=this,e=DATA.animationDuration;setTimeout((function(){return t.parentContainer.remove()}),1.05*e)}},{key:"addCloseEvent",value:function(e){var n=this;e&&e.addEventListener("click",(function(e){g(e),t()||n.parentContainer.recurrence.setClosingRecurrence(),n.parentContainer.hide(),n.remove()}),{capture:!0,passive:!1})}},{key:"addRedirectionEvent",value:function(e){var n=this;!t()&&e&&e.addEventListener("click",(function(){var t=DATA,e=t.autoHide,o=t.timeHide;e&&setTimeout((function(){n.parentContainer.hide(),n.remove()}),1e3*o),n.parentContainer.recurrence.setValidationRecurrence()}),{useCapture:!0,once:!0})}},{key:"createContainer",value:function(){var t=DATA,e=t.linkType,n=t.redirectionUrl,o=t.openInNewTab,i=document.createElement(e&&e.includes("widget")?"a":"div");switch(i.classList.add("abtasty-countdown"),e){case"widget":i.href=n,i.target=o?"_blank":"_self",this.addRedirectionEvent(i);break;case"widgetClose":i.href="#",i.dataset.abtastyActionnable="true",this.addCloseEvent(i)}return i}},{key:"insert",value:function(t,e){return t.insertAdjacentElement(e,this.container),this}},{key:"setText",value:function(t){var e,n,o=DATA,i=o.layoutType,s=o.displayElapsedElements,r=o.layout,a=o.endSettings,c=Z(z);try{for(c.s();!(e=c.n()).done;){var l=e.value,d=this.timerElements[l],u=String(t[l]).padStart(2,"0"),h=1===u?this.unitsText[l]:this.unitsText["".concat(l,"s")];if(s||(d.dataset.timeEnd=0===t[l]?"true":"false"),"textDigits"===i)d.textContent="".concat(u," ").concat(h);else{var m=this.digitElements[l],y=this.textElements[l];m.textContent=u,y.textContent=h,this.maxWidth<m.offsetWidth&&(this.maxWidth=m.offsetWidth,m.style.minWidth="".concat(this.maxWidth,"px")),m.style.minWidth="".concat(this.maxWidth,"px")}}}catch(t){c.e(t)}finally{c.f()}[null,"",a].includes(this.parentContainer.domElement.ariaLabel)&&["popin","bannerTop","bannerBottom"].includes(r)&&(this.parentContainer.domElement.ariaLabel=(n=this.parentContainer.domElement.querySelectorAll(".abtasty-countdown-clock, .abtasty-countdown-top-message"),function(t){if(Array.isArray(t))return tt(t)}(n)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(n)||X(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).map((function(t){return t.textContent.replace(/\\s+/g," ")}),"").join("").trim())}},{key:"onTimeEnd",value:function(){var t,e=DATA,n=e.endSettings,o=e.layout;clearInterval(this.timeLoop);var i=this.container.querySelector("abtasty-countdown-clock");if(i&&(i.ariaLive="off"),"hideWidget"===n)return this.parentContainer.hide(),void(this.parentContainer.domElement.style.display="none");var s,r=Z(this.container.querySelectorAll(".abtasty-countdown-elm-time"));try{for(r.s();!(s=r.n()).done;)s.value.removeAttribute("data-time-end")}catch(t){r.e(t)}finally{r.f()}["popin","bannerTop","bannerBottom"].includes(o)&&(this.parentContainer.domElement.ariaLabel=DATA.endMessage);for(var a={endText:!0,endCountdown:["showText","showTextAndButton"].includes(n),endButton:["hideCountdownAndShowTextAndButton","showTextAndButton"].includes(n)},c=["abtasty-countdown-".concat(n),"abtasty-countdown-finish"],l=0,d=Object.keys(a);l<d.length;l++){var u=d[l],h="abtasty-countdown-".concat(u),m=a[u]?"show":"hide";c.push("".concat(h,"-").concat(m))}(t=this.container.classList).add.apply(t,c)}},{key:"setCountdown",value:function(){var e=new Date,n=function(e,n){switch(e.type){case"global":return e.timestamp-n.getTime();case"local":if(t())return e.previewTimestamp-n.getTime();var o=e.timecomponents,i=o.year,s=o.month,r=o.day,a=o.hour,c=o.minute;return new Date(i,s-1,r,a,c).getTime()-n.getTime();default:return 0}}(DATA.dateTime,e)/1e3;if(window.ABTastyEditor&&("ifEnded"===DATA.previewBlock&&(n=-1),this.previewTime-=1),n<=0)return this.setText({day:0,hour:0,minute:0,second:0}),void this.onTimeEnd();var o=Math.floor(n/86400);n-=86400*o;var i=Math.floor(n/3600);n-=3600*i;var s=Math.floor(n/60);n-=60*s;var r=Math.floor(n);this.setText({day:o,hour:i,minute:s,second:r})}},{key:"setButton",value:function(){var t=this,e=function(e,n,o,i){var s=arguments.length>4&&void 0!==arguments[4]&&arguments[4],r=document.createElement("a");return r.ariaLabel=e,s&&(r.className="second_link"),r.innerHTML="<span>".concat(e,"</span>"),r.href="button"===n?o:"#","button"===n?(r.target=i?"_blank":"_self",t.addRedirectionEvent(r)):(r.dataset.abtastyActionnable="true",t.addCloseEvent(r)),r},n=DATA,o=n.linkType,i=n.buttonText,s=n.redirectionUrl,r=n.openInNewTab,a=n.secondLink,c=n.secondLinkText,l=n.secondLinkType,d=n.secondLinkURL,u=n.secondLinkOpenInNewTab,h=n.endBtnTargetBlank,m=n.endBtnLabel,y=n.endBtnLink,p=this.container.querySelector(".abtasty-countdown-bottom-button"),g=[];if(o&&o.includes("button")){var b=e(i,o,s,r);if(g.push(b),a){var w=e(c,l,d,u,a);g.push(w)}}for(var f=0,v=g;f<v.length;f++){var x=v[f];p.appendChild(x)}var T=this.container.querySelector(".abtasty-countdown-finish-button"),S=document.createElement("a");S.href=y,S.target=h?"_blank":"_self",S.innerHTML=m,S.ariaLabel=m,T.appendChild(S)}},{key:"setContent",value:function(){var t=this.container.querySelector(".abtasty-countdown-finish-text"),e=document.createElement("div");if(e.innerHTML=DATA.endMessage,t.appendChild(e),"textDigits"!==DATA.layoutType){var n=this.container.querySelector(".abtasty-countdown-top-message"),o=document.createElement("p");o.innerHTML=DATA.message,n.appendChild(o)}}},{key:"init",value:function(t){var e=this,n=DATA,o=n.layout,i=n.inlineLayoutContent,s=n.imageOn,r=n.hideResponsiveImage,a=n.hideResponsiveText;try{this.parentContainer=t;var c=["free","popin"].includes(o);!function(n){if(e.container.classList.add("abtasty-countdown-layout-".concat(n)),!c&&s&&(r&&e.container.classList.add("abtasty-countdown-hide-responsive-image"),a&&e.container.classList.add("abtasty-countdown-hide-responsive-text")),n===K){c&&(e.parentContainer.domElement.querySelector(".".concat(t.contentClassName)).classList.add("abtasty-countdown-content-".concat(o,"-inline")),e.container.classList.add("abtasty-countdown-layout-".concat(o,"-inline")));var i,l=Z(e.parentContainer.domElement.querySelectorAll(".".concat(t.closeButtonClassName)));try{for(l.s();!(i=l.n()).done;)i.value.classList.add("abtasty-countdown-close-inline")}catch(t){l.e(t)}finally{l.f()}}}(c&&!i?"free":K),this.container.innerHTML=function(){var t=DATA,e=t.layout,n=t.inlineLayoutContent,o=t.imagePosition,i=t.layoutType,s="popin"===e||"free"===e&&!n,r="\\n    ".concat(H(s&&!("popin"===e&&n),"popin"),\'\\n    <div class="abtasty-countdown-layout-\').concat(e,\' abtasty-countdown-mini">\\n      \').concat(H(!s&&"before"===o,"banner"),\'\\n        <div class="abtasty-countdown-top-message">\\n            \').concat(DATA.messageMinimalistMode.split(/!countdown!/gm).map((function(t){return"<p>".concat(t.trim(),"</p>")})).join(\'\\n  <span class="abtasty-countdown-days abtasty-countdown-elm-time"></span>\\n  <span class="abtasty-countdown-hours  abtasty-countdown-elm-time"></span>\\n  <span class="abtasty-countdown-minutes abtasty-countdown-elm-time"></span>\\n  <span class="abtasty-countdown-seconds abtasty-countdown-elm-time"></span>\\n\').replace("<p></p>",""),"\\n        </div>\\n        ").concat(H(!s&&"after"===o,"banner"),\'\\n        <div class="abtasty-countdown-finish-text"></div>\\n        <div class="abtasty-countdown-finish-button"></div>\\n        <div class="abtasty-countdown-bottom-button buttons_container"></div>\\n    </div>\\n  \'),a="\\n  ".concat(H(s&&!("popin"===e&&n),"popin"),\'\\n  <div class="abtasty-countdown-layout-\').concat(e,\' abtasty-countdown-standard">\\n    \').concat(H(!s&&"before"===o,"banner"),\'\\n    <div class="abtasty-countdown-clock" role="timer" aria-live="polite">\\n      <div class="abtasty-countdown-days abtasty-countdown-elm-time">\\n        <div class="abtasty-countdown-days__digit abtasty-countdown-elm-number"></div>\\n        <div class="abtasty-countdown-days__text abtasty-countdown-elm-text"></div>\\n      </div>\\n      <div class="abtasty-countdown-hours abtasty-countdown-elm-time">\\n        <div class="abtasty-countdown-hours__digit abtasty-countdown-elm-number"></div>\\n        <div class="abtasty-countdown-hours__text abtasty-countdown-elm-text"></div>\\n      </div>\\n      <div class="abtasty-countdown-minutes abtasty-countdown-elm-time">\\n        <div class="abtasty-countdown-minutes__digit abtasty-countdown-elm-number"></div>\\n        <div class="abtasty-countdown-minutes__text abtasty-countdown-elm-text"></div>\\n      </div>\\n      <div class="abtasty-countdown-seconds abtasty-countdown-elm-time">\\n        <div class="abtasty-countdown-seconds__digit abtasty-countdown-elm-number"></div>\\n        <div class="abtasty-countdown-seconds__text abtasty-countdown-elm-text"></div>\\n      </div>\\n    </div>\\n    \').concat(H(!s&&"after"===o,"banner"),\'\\n    <div class="abtasty-countdown-top-message"></div>\\n    <div class="abtasty-countdown-finish-text"></div>\\n    <div class="abtasty-countdown-finish-button"></div>\\n    <div class="abtasty-countdown-bottom-button buttons_container"></div>\\n  </div>\\n  \');return"textDigits"===i?r:a}(),this.container.insertAdjacentElement("afterbegin",(t=>{const e=document.createElement("style");return e.type="text/css",e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t)),e})("".concat("@media (min-width:741px){.abtasty-countdown-layout-line .abtasty-countdown-elm-time{margin:0}}@media (max-width:740px){.abtasty-countdown-layout-line>div:not(.abtasty-countdown-layout-popin){-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.abtasty-countdown-layout-line div.abtasty-countdown-finish-text,.abtasty-countdown-layout-line div.abtasty-countdown-top-message{margin-bottom:20px}.abtasty-countdown-layout-line div.abtasty-countdown-bottom-button a{margin-left:0}}@media (max-width:579px){.ab_widget_container_countdown_content{max-width:100%;width:100vw}.abtasty-countdown-layout-free,.abtasty-countdown-layout-popin{-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;-ms-flex-direction:column!important;flex-direction:column!important;margin:10px 0!important}.abtasty-countdown-hide-responsive-image .countdown_banner_img_container,.abtasty-countdown-hide-responsive-text .abtasty-countdown-top-message{display:none}}.abtasty-countdown,.abtasty-countdown>div{display:inline-block;text-align:center}.abtasty-countdown>div{margin:10px;overflow:auto;white-space:normal;width:100%}.abtasty-countdown .countdown_popin_img_container{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;justify-content:center;max-width:100%}.abtasty-countdown .countdown_popin_img_container:empty{display:none}.abtasty-countdown .abtasty-countdown-finish-text,.abtasty-countdown .abtasty-countdown-top-message{margin-bottom:15px}.abtasty-countdown .abtasty-countdown-elm-time{display:inline-block;margin:6px 6px 15px;padding:6px}.abtasty-countdown .abtasty-countdown-elm-number,.abtasty-countdown .abtasty-countdown-elm-text{font-stretch:normal;font-style:normal;font-weight:700;letter-spacing:normal;line-height:normal;text-align:center}.abtasty-countdown .abtasty-countdown-bottom-button a,.abtasty-countdown .abtasty-countdown-finish-button a{cursor:pointer;display:block;display:inline-block;padding:6px 10px;text-align:center;text-decoration:none}.abtasty-countdown-layout-line>div{-webkit-box-align:center;-ms-flex-align:center;-webkit-box-pack:stretch;-ms-flex-pack:stretch;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;justify-content:stretch}.abtasty-countdown-layout-line>div>div{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}.abtasty-countdown-layout-free{display:block;text-align:center}.abtasty-countdown-layout-line>div{margin:0}.abtasty-countdown-layout-line .abtasty-countdown-finish-text,.abtasty-countdown-layout-line .abtasty-countdown-top-message{-webkit-box-sizing:border-box;box-sizing:border-box;margin-bottom:0;padding:0 5px 0 15px}.abtasty-countdown-layout-line .abtasty-countdown-top-message p{margin-bottom:0}.abtasty-countdown-layout-line .abtasty-countdown-bottom-button a{margin-left:30px}.abtasty-countdown-layout-line{-webkit-box-sizing:border-box;box-sizing:border-box}.abtasty-countdown-layout-line .abtasty-countdown-bottom-button,.abtasty-countdown-layout-line .abtasty-countdown-clock,.abtasty-countdown-layout-line .abtasty-countdown-finish-button{-ms-flex-negative:0;flex-shrink:0}.abtasty-countdown-finish-button,.abtasty-countdown-finish-text{display:none}.abtasty-countdown-endButton-show .abtasty-countdown-finish-button,.abtasty-countdown-endCountdown-show.abtasty-countdown-clock,.abtasty-countdown-endText-show .abtasty-countdown-finish-text{display:block}.abtasty-countdown-layout-line.abtasty-countdown-endButton-show .abtasty-countdown-finish-button,.abtasty-countdown-layout-line.abtasty-countdown-endCountdown-show .abtasty-countdown-clock,.abtasty-countdown-layout-line.abtasty-countdown-endText-show .abtasty-countdown-finish-text{display:table-cell}.abtasty-countdown-endButton-hide .abtasty-countdown-finish-button,.abtasty-countdown-endCountdown-hide .abtasty-countdown-clock,.abtasty-countdown-endText-hide .abtasty-countdown-finish-text,.abtasty-countdown-finish .abtasty-countdown-bottom-button,.abtasty-countdown-finish .abtasty-countdown-top-message{display:none!important}.abtasty-countdown-hideCountdownAndShowTextAndButton .abtasty-countdown-layout-bannerBottom .abtasty-countdown-finish-text,.abtasty-countdown-hideCountdownAndShowTextAndButton .abtasty-countdown-layout-bannerTop .abtasty-countdown-finish-text{width:55%!important}.abtasty-countdown-hideCountdownAndShowTextAndButton .abtasty-countdown-layout-bannerBottom .abtasty-countdown-finish-button,.abtasty-countdown-hideCountdownAndShowTextAndButton .abtasty-countdown-layout-bannerTop .abtasty-countdown-finish-button{width:45%!important}.abtasty-countdown-showTextAndButton .abtasty-countdown-layout-bannerBottom .abtasty-countdown-finish-text,.abtasty-countdown-showTextAndButton .abtasty-countdown-layout-bannerTop .abtasty-countdown-finish-text{width:30%!important}.abtasty-countdown-showText .abtasty-countdown-layout-bannerBottom .abtasty-countdown-clock,.abtasty-countdown-showText .abtasty-countdown-layout-bannerTop .abtasty-countdown-clock,.abtasty-countdown-showTextAndButton .abtasty-countdown-layout-bannerBottom .abtasty-countdown-clock,.abtasty-countdown-showTextAndButton .abtasty-countdown-layout-bannerBottom .abtasty-countdown-finish-button,.abtasty-countdown-showTextAndButton .abtasty-countdown-layout-bannerTop .abtasty-countdown-clock,.abtasty-countdown-showTextAndButton .abtasty-countdown-layout-bannerTop .abtasty-countdown-finish-button{width:35%!important}.abtasty-countdown-showText .abtasty-countdown-layout-bannerBottom .abtasty-countdown-finish-text,.abtasty-countdown-showText .abtasty-countdown-layout-bannerTop .abtasty-countdown-finish-text{width:65%}.abtasty-countdown-hideCountdownAndShowTextAndButton .abtasty-countdown-layout-bannerBottom,.abtasty-countdown-hideCountdownAndShowTextAndButton .abtasty-countdown-layout-bannerTop,.abtasty-countdown-showText .abtasty-countdown-layout-bannerBottom,.abtasty-countdown-showText .abtasty-countdown-layout-bannerTop,.abtasty-countdown-showTextAndButton .abtasty-countdown-layout-bannerBottom,.abtasty-countdown-showTextAndButton .abtasty-countdown-layout-bannerTop{width:100%}.abtasty-countdown-standard .abtasty-countdown-clock>.abtasty-countdown-elm-time[data-time-end=true]+.abtasty-countdown-elm-time[data-time-end=true],.abtasty-countdown-standard .abtasty-countdown-clock>.abtasty-countdown-elm-time[data-time-end=true]:first-child{display:none}.abtasty-countdown-content-popin-inline,.abtasty-countdown-content-popin-inline .abtasty-countdown-layout-popin{max-width:inherit;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content}.abtasty-countdown-content-free-inline{max-width:100%}.abtasty-countdown-image-popin-layout{margin-bottom:20px}.abtasty-countdown-layout-popin{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.countdown_banner_img_container{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;justify-content:center;padding:0 15px}.countdown_banner_img_container img{max-height:67px;max-width:200px}.abtasty-countdown .abtasty-countdown-mini .abtasty-countdown-elm-time{border:none;margin:0;padding:0}.abtasty-countdown .abtasty-countdown-mini .abtasty-countdown-top-message{display:inline-block;white-space:unset;width:100%}.abtasty-countdown .abtasty-countdown-mini .abtasty-countdown-top-message>*{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.abtasty-countdown-mini .abtasty-countdown-top-message>.abtasty-countdown-elm-time[data-time-end=true]+.abtasty-countdown-elm-time[data-time-end=true],:not(.abtasty-countdown-showTextAndButton) :not(.abtasty-countdown-showText) .abtasty-countdown-mini .abtasty-countdown-top-message>.abtasty-countdown-elm-time[data-time-end=true]:first-child{display:none}"," ").concat(function(){!function(){var t,e=function(t){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!e){if(Array.isArray(t)||(e=function(t,e){if(t){if("string"==typeof t)return q(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?q(t,e):void 0}}(t))){e&&(t=e);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,r=!1;return{s:function(){e=e.call(t)},n:function(){var t=e.next();return s=t.done,t},e:function(t){r=!0,i=t},f:function(){try{s||null==e.return||e.return()}finally{if(r)throw i}}}}([{name:DATA.messageFontName,style:DATA.messageFontStyle},{name:DATA.numbersfontName,style:DATA.numbersfontStyle},{name:DATA.legendfontName,style:DATA.legendfontStyle}]);try{for(e.s();!(t=e.n()).done;){var n=t.value,o=n.name,i=n.style;if(o&&"inherit"!==o&&/otf|ttf/g.test(i)){var s=document.createElement("style"),r=i.match(V)?i.match(V)[1]:"";s.innerHTML="@font-face { font-family: \'".concat(o,"_").concat(r,"\';  src: url(\'").concat(i,"\'); font-display: swap; }"),document.head.appendChild(s)}}}catch(t){e.e(t)}finally{e.f()}}();var t=DATA,e=t.buttonsAlign,n=t.messageAlign,o=t.textColor,i=t.messageFontSize,s=t.messageFontName,r=t.messageFontStyle,a=t.numbersfontSize,c=t.numberstextColor,l=t.numbersfontName,d=t.numbersfontStyle,u=t.legendfontName,h=t.legendfontStyle,m=t.legendfontSize,y=t.legendtextColor,p=t.countdownBorderRadius,g=t.countdownBorderWidth,b=t.countdownBorderColor,w=t.numbersBackgroundColor,f=void 0!==e&&"fill"!==e?"text-align: ".concat(e,";"):"",v=function(t,e){return t&&"inherit"!==t?"font-family:".concat(t,"_").concat(e.match(V)?e.match(V)[1]:"",";"):e||""},x=v(s,r),T=v(l,d),S=v(u,h);return"\\n  .abtasty-countdown-bottom-button,\\n  .abtasty-countdown-finish-button {\\n    ".concat(f,";\\n  }\\n  .abtasty-countdown-bottom-button a,\\n  .abtasty-countdown-finish-button a {\\n    width: ").concat("fill"===e?"100%":"auto",";\\n  }\\n\\n  .abtasty-countdown .abtasty-countdown-finish-text,\\n  .abtasty-countdown .abtasty-countdown-top-message,\\n  .abtasty-countdown .abtasty-countdown-finish-text *,\\n  .abtasty-countdown .abtasty-countdown-top-message * {\\n    white-space: pre-line;\\n    text-align: ").concat(n," !important;\\n    color: ").concat(o,";\\n    font-size: ").concat(i,"px;\\n    ").concat(x,";\\n  }\\n\\n  .abtasty-countdown .abtasty-countdown-elm-number,\\n  .abtasty-countdown .abtasty-countdown-elm-number * {\\n    font-size: ").concat(a,"px;\\n    color: ").concat(c,";\\n    fill: ").concat(c,";\\n    -webkit-text-fill-color: ").concat(c,";\\n    font-weight: initial;\\n    ").concat(T,";\\n  }\\n\\n  .abtasty-countdown .abtasty-countdown-elm-text,\\n  .abtasty-countdown .abtasty-countdown-elm-text * {\\n    ").concat(S,";\\n    font-size: ").concat(m,"px;\\n    color: ").concat(y,";\\n    -webkit-text-fill-color: ").concat(y,";\\n  }\\n\\n  .abtasty-countdown > div:not(.abtasty-countdown-mini) .abtasty-countdown-elm-time {\\n    border-radius: ").concat(p,"px;\\n    border: ").concat(g,"px solid ").concat(b,";\\n    background-color: ").concat(w,";\\n  }\\n\\n  .abtasty-countdown > .abtasty-countdown-mini .abtasty-countdown-elm-time {\\n    font-size: ").concat(a,"px;\\n    color: ").concat(c,";\\n    fill: ").concat(c,";\\n    -webkit-text-fill-color: ").concat(c,";\\n    font-weight: initial;\\n    ").concat(T,";\\n  }")}())));var l,d=Z(z);try{for(d.s();!(l=d.n()).done;){var u=l.value,h=this.container.querySelector(".abtasty-countdown-".concat(u,"s"));this.timerElements[u]=h,this.digitElements[u]=h.querySelector(".abtasty-countdown-elm-number"),this.textElements[u]=h.querySelector(".abtasty-countdown-elm-text")}}catch(t){d.e(t)}finally{d.f()}this.setContent(),this.setButton(),this.timeLoop=setInterval(this.setCountdown.bind(this),1e3),this.setCountdown()}catch(t){console.warn("Countdown error occurred during widget rendering:",t)}}}],n&&function(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,et(o.key),o)}}(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,n}();function ot(t){return ot="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ot(t)}function it(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */it=function(){return e};var t,e={},n=Object.prototype,o=n.hasOwnProperty,i=Object.defineProperty||function(t,e,n){t[e]=n.value},s="function"==typeof Symbol?Symbol:{},r=s.iterator||"@@iterator",a=s.asyncIterator||"@@asyncIterator",c=s.toStringTag||"@@toStringTag";function l(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,n){return t[e]=n}}function d(t,e,n,o){var s=e&&e.prototype instanceof g?e:g,r=Object.create(s.prototype),a=new L(o||[]);return i(r,"_invoke",{value:C(t,n,a)}),r}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=d;var h="suspendedStart",m="executing",y="completed",p={};function g(){}function b(){}function w(){}var f={};l(f,r,(function(){return this}));var v=Object.getPrototypeOf,x=v&&v(v(P([])));x&&x!==n&&o.call(x,r)&&(f=x);var T=w.prototype=g.prototype=Object.create(f);function S(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function A(t,e){function n(i,s,r,a){var c=u(t[i],t,s);if("throw"!==c.type){var l=c.arg,d=l.value;return d&&"object"==ot(d)&&o.call(d,"__await")?e.resolve(d.__await).then((function(t){n("next",t,r,a)}),(function(t){n("throw",t,r,a)})):e.resolve(d).then((function(t){l.value=t,r(l)}),(function(t){return n("throw",t,r,a)}))}a(c.arg)}var s;i(this,"_invoke",{value:function(t,o){function i(){return new e((function(e,i){n(t,o,e,i)}))}return s=s?s.then(i,i):i()}})}function C(e,n,o){var i=h;return function(s,r){if(i===m)throw Error("Generator is already running");if(i===y){if("throw"===s)throw r;return{value:t,done:!0}}for(o.method=s,o.arg=r;;){var a=o.delegate;if(a){var c=$(a,o);if(c){if(c===p)continue;return c}}if("next"===o.method)o.sent=o._sent=o.arg;else if("throw"===o.method){if(i===h)throw i=y,o.arg;o.dispatchException(o.arg)}else"return"===o.method&&o.abrupt("return",o.arg);i=m;var l=u(e,n,o);if("normal"===l.type){if(i=o.done?y:"suspendedYield",l.arg===p)continue;return{value:l.arg,done:o.done}}"throw"===l.type&&(i=y,o.method="throw",o.arg=l.arg)}}}function $(e,n){var o=n.method,i=e.iterator[o];if(i===t)return n.delegate=null,"throw"===o&&e.iterator.return&&(n.method="return",n.arg=t,$(e,n),"throw"===n.method)||"return"!==o&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a \'"+o+"\' method")),p;var s=u(i,e.iterator,n.arg);if("throw"===s.type)return n.method="throw",n.arg=s.arg,n.delegate=null,p;var r=s.arg;return r?r.done?(n[e.resultName]=r.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,p):r:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,p)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function P(e){if(e||""===e){var n=e[r];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var i=-1,s=function n(){for(;++i<e.length;)if(o.call(e,i))return n.value=e[i],n.done=!1,n;return n.value=t,n.done=!0,n};return s.next=s}}throw new TypeError(ot(e)+" is not iterable")}return b.prototype=w,i(T,"constructor",{value:w,configurable:!0}),i(w,"constructor",{value:b,configurable:!0}),b.displayName=l(w,c,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,l(t,c,"GeneratorFunction")),t.prototype=Object.create(T),t},e.awrap=function(t){return{__await:t}},S(A.prototype),l(A.prototype,a,(function(){return this})),e.AsyncIterator=A,e.async=function(t,n,o,i,s){void 0===s&&(s=Promise);var r=new A(d(t,n,o,i),s);return e.isGeneratorFunction(n)?r:r.next().then((function(t){return t.done?t.value:r.next()}))},S(T),l(T,c,"Generator"),l(T,r,(function(){return this})),l(T,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),n=[];for(var o in e)n.push(o);return n.reverse(),function t(){for(;n.length;){var o=n.pop();if(o in e)return t.value=o,t.done=!1,t}return t.done=!0,t}},e.values=P,L.prototype={constructor:L,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(k),!e)for(var n in this)"t"===n.charAt(0)&&o.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function i(o,i){return a.type="throw",a.arg=e,n.next=o,i&&(n.method="next",n.arg=t),!!i}for(var s=this.tryEntries.length-1;s>=0;--s){var r=this.tryEntries[s],a=r.completion;if("root"===r.tryLoc)return i("end");if(r.tryLoc<=this.prev){var c=o.call(r,"catchLoc"),l=o.call(r,"finallyLoc");if(c&&l){if(this.prev<r.catchLoc)return i(r.catchLoc,!0);if(this.prev<r.finallyLoc)return i(r.finallyLoc)}else if(c){if(this.prev<r.catchLoc)return i(r.catchLoc,!0)}else{if(!l)throw Error("try statement without catch or finally");if(this.prev<r.finallyLoc)return i(r.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&o.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var s=i;break}}s&&("break"===t||"continue"===t)&&s.tryLoc<=e&&e<=s.finallyLoc&&(s=null);var r=s?s.completion:{};return r.type=t,r.arg=e,s?(this.method="next",this.next=s.finallyLoc,p):this.complete(r)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),k(n),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var o=n.completion;if("throw"===o.type){var i=o.arg;k(n)}return i}}throw Error("illegal catch attempt")},delegateYield:function(e,n,o){return this.delegate={iterator:P(e),resultName:n,nextLoc:o},"next"===this.method&&(this.arg=t),p}},e}function st(t,e,n,o,i,s,r){try{var a=t[s](r),c=a.value}catch(t){return void n(t)}a.done?e(c):Promise.resolve(c).then(o,i)}function rt(){var t;return t=it().mark((function t(){var e,n,o,i,s;return it().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return h("Widget launch"),e=M(),t.next=4,e.init(!0);case 4:return n=t.sent,o=n.response,i=e.domElement.querySelector(".".concat(e.contentClassName)),(s=new nt(TEST_ID,DATA)).init(e),s.insert(i,"beforeend"),o&&e.show(),t.abrupt("return",s);case 12:case"end":return t.stop()}}),t)})),rt=function(){var e=this,n=arguments;return new Promise((function(o,i){var s=t.apply(e,n);function r(t){st(s,o,i,r,a,"next",t)}function a(t){st(s,o,i,r,a,"throw",t)}r(void 0)}))},rt.apply(this,arguments)}!function(){rt.apply(this,arguments)}()}();'
                    }
                }
            },
            obsoletes: [644601, 644602, 731927, 928141, 962925, 1045134, 1045135, 1095706, 1112672, 1125319, 1147626, 1167910, 1167911, 1208292, 1228536, 1228542, 1236533, 1241063, 1243781, 1254043, 1255863, 1257829, 1261834, 1281635, 1282219, 1299183, 1316084],
            integrationConnectors: [{
                id: 2,
                name: "GA4",
                connectorType: "push",
                conf: [{
                    name: "measurement_id",
                    value: "G-B37NQR1RWZ",
                    secret: !1
                }],
                instances: [{
                    id: 843,
                    config: {
                        measurement_id: "G-B37NQR1RWZ"
                    },
                    testIds: [757467, 803681, 899886, 1084028, 1126844, 1164511, 1200503, 1242403, 1315114, 1315633, 1331930, 1340718, 1347788]
                }],
                code: '\'use strict\';\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar BASE_LOG = \'[Integrations][Push][GA4]\';\nvar CAMPAIGN_ID = 1100190;\n// List of AB tasty account who wants the EA segment inside GA4 (early adoption program)\nvar EAI_WHITE_LIST = [50441, 22217];\nvar EVENT_NAME = \'abtasty\';\nvar checkEventKeys = function (event) {\n    var keysToCheck = [\'caid\', \'vaid\', \'caname\', \'vaname\', \'doWhen\'];\n    return keysToCheck.every(function (key) { return event.hasOwnProperty(key); });\n};\nvar sendEvent = function (params, logger) {\n    try {\n        window.gtag(\'event\', EVENT_NAME, params);\n        logger === null || logger === void 0 ? void 0 : logger.info("".concat(BASE_LOG, ": data send to GA4"), params);\n    }\n    catch (e) {\n        logger === null || logger === void 0 ? void 0 : logger.error("".concat(BASE_LOG, ": Failed to send data to GA4 - ").concat(e.message));\n    }\n};\nvar sendData = function (params, logger) {\n    if (!params) {\n        logger === null || logger === void 0 ? void 0 : logger.error("".concat(BASE_LOG, ": Campaign information is not ready yet!"));\n        return;\n    }\n    window.dataLayer = window.dataLayer || [];\n    window.gtag =\n        window.gtag ||\n            function () {\n                // eslint-disable-next-line prefer-rest-params\n                window.dataLayer.push(arguments);\n            };\n    // to avoid sending abtasty campaign data before the GA4 config is ready\n    var abtPromise = new Promise(function (resolve) {\n        window.gtag(\'get\', params.send_to, \'client_id\', resolve);\n    });\n    abtPromise.then(function () {\n        setTimeout(function () { return sendEvent(params, logger); }, 500);\n    });\n};\nfunction onCampaign(event, settings) {\n    var _a, _b, _c, _d;\n    try {\n        (_a = settings === null || settings === void 0 ? void 0 : settings.logger) === null || _a === void 0 ? void 0 : _a.info("".concat(BASE_LOG, ": starting execution..."));\n        (_b = settings === null || settings === void 0 ? void 0 : settings.logger) === null || _b === void 0 ? void 0 : _b.info("".concat(BASE_LOG, ": event: "), event);\n        var check = checkEventKeys(__assign(__assign({}, event.data), event));\n        if (!check) {\n            (_c = settings.logger) === null || _c === void 0 ? void 0 : _c.error("".concat(BASE_LOG, ": one or more of this keys [\'caid\', \'vaid\', \'caname\', \'vaname\', \'doWhen\'] are missing"));\n            return;\n        }\n        var _loop_1 = function (instance) {\n            event.doWhen(function () { var _a, _b; return !!((_a = window.google_tag_manager) === null || _a === void 0 ? void 0 : _a[(_b = instance.config) === null || _b === void 0 ? void 0 : _b.measurement_id]); }, function () {\n                var parameter = __assign({ abtasty_campaign: "[".concat(event.data.caid, "] ").concat(event.data.caname), abtasty_variation: "[".concat(event.data.vaid, "] ").concat(event.data.vaname), send_to: instance.config.measurement_id }, (+event.data.caid > CAMPAIGN_ID && {\n                    exp_variant_string: "ABT-".concat(event.data.caid, "-").concat(event.data.vaid),\n                }));\n                var audienceEmotionAI = window.ABTasty.api.v1.getValue(\'emotionsAiSegment\');\n                if (EAI_WHITE_LIST.includes(window.ABTasty.accountData.accountSettings.id) &&\n                    audienceEmotionAI !== \'\') {\n                    parameter.user_properties = {\n                        audience_emotion_ai: audienceEmotionAI,\n                    };\n                }\n                sendData(parameter, settings === null || settings === void 0 ? void 0 : settings.logger);\n            }, 1000);\n        };\n        for (var _i = 0, _e = settings.instances; _i < _e.length; _i++) {\n            var instance = _e[_i];\n            _loop_1(instance);\n        }\n    }\n    catch (error) {\n        (_d = settings.logger) === null || _d === void 0 ? void 0 : _d.error("".concat(BASE_LOG, ":"), error.message);\n    }\n}\nvar onConsent = function (event, settings) {\n    var _a;\n    (_a = settings === null || settings === void 0 ? void 0 : settings.logger) === null || _a === void 0 ? void 0 : _a.info("".concat(BASE_LOG, ": Consent callback is not implemented yet."));\n};\nvar onEvent = function (event, settings) {\n    var _a;\n    (_a = settings === null || settings === void 0 ? void 0 : settings.logger) === null || _a === void 0 ? void 0 : _a.info("".concat(BASE_LOG, ": Event callback is not implemented yet."));\n};\nvar onItem = function (event, settings) {\n    var _a;\n    (_a = settings === null || settings === void 0 ? void 0 : settings.logger) === null || _a === void 0 ? void 0 : _a.info("".concat(BASE_LOG, ": Item callback is not implemented yet."));\n};\nvar onPageview = function (event, settings) {\n    var _a;\n    (_a = settings === null || settings === void 0 ? void 0 : settings.logger) === null || _a === void 0 ? void 0 : _a.info("".concat(BASE_LOG, ": Pageview callback is not implemented yet."));\n};\nvar onSegment = function (event, settings) {\n    var _a;\n    (_a = settings === null || settings === void 0 ? void 0 : settings.logger) === null || _a === void 0 ? void 0 : _a.info("".concat(BASE_LOG, ": Segment callback is not implemented yet."));\n};\nvar onTransaction = function (event, settings) {\n    var _a;\n    (_a = settings === null || settings === void 0 ? void 0 : settings.logger) === null || _a === void 0 ? void 0 : _a.info("".concat(BASE_LOG, ": Transaction callback is not implemented yet."));\n};\nvar onPerformance = function (event, settings) {\n    var _a;\n    (_a = settings === null || settings === void 0 ? void 0 : settings.logger) === null || _a === void 0 ? void 0 : _a.info("".concat(BASE_LOG, ": Performance callback is not implemented yet."));\n};\nvar onVisitorevent = function (event, settings) {\n    var _a;\n    (_a = settings === null || settings === void 0 ? void 0 : settings.logger) === null || _a === void 0 ? void 0 : _a.info("".concat(BASE_LOG, ": Visitorevent callback is not implemented yet."));\n};\nvar onNps = function (event, settings) {\n    var _a;\n    (_a = settings === null || settings === void 0 ? void 0 : settings.logger) === null || _a === void 0 ? void 0 : _a.info("".concat(BASE_LOG, ": Nps callback is not implemented yet."));\n};\nvar onDatalayer = function (event, settings) {\n    var _a;\n    (_a = settings === null || settings === void 0 ? void 0 : settings.logger) === null || _a === void 0 ? void 0 : _a.info("".concat(BASE_LOG, ": Datalayer callback is not implemented yet."));\n};\nvar onProduct = function (event, settings) {\n    var _a;\n    (_a = settings === null || settings === void 0 ? void 0 : settings.logger) === null || _a === void 0 ? void 0 : _a.info("".concat(BASE_LOG, ": Product callback is not implemented yet."));\n};\nvar getConnectors = function () { return ({\n    onCampaign: onCampaign,\n    onEvent: onEvent,\n    onItem: onItem,\n    onPageview: onPageview,\n    onSegment: onSegment,\n    onTransaction: onTransaction,\n    onPerformance: onPerformance,\n    onVisitorevent: onVisitorevent,\n    onNps: onNps,\n    onDatalayer: onDatalayer,\n    onProduct: onProduct,\n    onConsent: onConsent,\n}); };\n'
            }]
        }
          , a = function() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : i;
            const {pack: e, quota: n} = t.accountSettings;
            return 0 === e.indexOf("quota") && n <= 0
        }
          , r = function() {
            let {accountSettings: t} = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : i;
            return 1 === Number(t.runAsThread)
        }
          , s = () => i
          , c = () => s().accountLevelTrackings
          , l = t => s().tests[t]
          , d = () => s().accountSettings
          , u = () => d().identifier
          , p = () => d().id
          , m = () => s().crossDomainSettings || []
          , g = () => o.Hu.getGlobalCampaignsInfos().needGeolocFetch.length > 0
          , f = () => "cookies" === d().storageMode
          , h = () => s().integrationConnectors
          , y = () => d().cookieLifespan || 13
    }
    ,
    9263: (t, e, n) => {
        n.r(e),
        n.d(e, {
            checkCodeConditions: () => s,
            codeTargeting: () => r
        });
        n(81);
        var o = n(648)
          , i = n(9518)
          , a = n(4804);
        async function r(t, e, n) {
            let {conditions: o} = t;
            return s(o, e, n)
        }
        async function s(t, e, n) {
            const r = e => function(t, e) {
                o.vV("Targeting error (code)", e)
            }(0, t);
            return Promise.all(t.map((t => {
                let {id: n, value: o, isAsync: s} = t;
                return (0,
                i.j)(e, r, undefined, s ? (0,
                a.iE)(e) : void 0)({
                    id: n,
                    value: o,
                    isAsync: s
                })
            }
            ))).then((t => t.every((t => !!t))))
        }
    }
    ,
    5415: (t, e, n) => {
        n.d(e, {
            AW: () => p,
            AX: () => l,
            PF: () => d,
            UT: () => o,
            W8: () => m,
            Wm: () => r,
            aO: () => u,
            gW: () => f,
            mh: () => i,
            q7: () => s,
            sz: () => a,
            uS: () => g,
            vz: () => c
        });
        const o = 1
          , i = 2
          , a = 10
          , r = 11
          , s = 13
          , c = 20
          , l = 21
          , d = 22
          , u = 23
          , p = 24
          , m = 40
          , g = 41
          , f = 42
    }
    ,
    28: (t, e, n) => {
        n.r(e),
        n.d(e, {
            cookieTargeting: () => r
        });
        var o = n(8987)
          , i = n(648);
        function a(t) {
            let {name: e, value: n, include: i} = t;
            const a = o.A.get(e);
            let r = !1;
            return (a || "" === a) && (r = !0,
            null != n && (r = null !== a.match(new RegExp(n,"i")))),
            i ? r : !r
        }
        function r(t) {
            let {operator: e, conditions: n} = t;
            try {
                return "and" === e ? n.every(a) : n.some(a)
            } catch (t) {
                const e = "Targeting error (cookie)";
                return i.vV(e, n),
                !1
            }
        }
    }
    ,
    4263: (t, e, n) => {
        n.r(e),
        n.d(e, {
            LAST_ENTRY_EVENT_NAME: () => p,
            checkJavascriptVariableAgainstValues: () => y,
            datalayerTargeting: () => m,
            getAllValuesFromPath: () => h
        });
        var o = n(6158)
          , i = n(3595)
          , a = n(2524)
          , r = n(648)
          , s = n(5415)
          , c = n(4804)
          , l = n(3340)
          , d = n(8843)
          , u = n(7738);
        const p = "abtasty_DLLastEntry";
        function m(t, e) {
            let {conditions: n, operator: s, checkMode: y, checkLatency: b, ...v} = t
              , w = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
            const T = "and" === s;
            return new Promise(( (t, r) => {
                const x = (0,
                a.getDatalayer)();
                try {
                    const k = t => e => f(x, e, t(e))
                      , O = t => T ? n.every(k(t)) : n.some(k(t))
                      , S = t => h(x, t.datalayer_key).variables;
                    switch (y) {
                    case o.If.periodic:
                        const _ = O(S);
                        if (!_ && !(0,
                        i.g)(b) && w < 10) {
                            const A = async () => {
                                t(await m({
                                    ...v,
                                    operator: s,
                                    conditions: n,
                                    checkMode: y,
                                    checkLatency: b
                                }, e, w + 1))
                            }
                            ;
                            (0,
                            d.registerPendingCriteria)(b, A),
                            (0,
                            c.iE)(e).setStatus(l.B.pending)
                        } else
                            t(_);
                        break;
                    case o.If.lastEntry:
                        function H() {
                            const e = T ? g(x, n) : O((t => h(x, t.datalayer_key).variables.reverse()));
                            if (e)
                                return window.removeEventListener(p, H),
                                t(e)
                        }
                        (0,
                        u.F)(( () => window.removeEventListener(p, H))),
                        window.addEventListener(p, H);
                        break;
                    case o.If.loading:
                    case o.If.custom:
                    default:
                        t(O(S))
                    }
                } catch (E) {
                    r(E)
                }
            }
            )).catch((t => {
                const e = "Targeting error (datalayer):" + t;
                return r.vV(e, n),
                !1
            }
            ))
        }
        const g = (t, e) => {
            const n = e.map((e => {
                const {filteredValues: n} = h(t, e.datalayer_key);
                return n.reverse()
            }
            ))
              , o = n.slice(1).reduce(( (t, e) => t.filter((t => -1 !== e.findIndex((e => e.index === t))))), n[0].map((t => t.index)));
            return n.map((t => {
                const e = [];
                for (let n = 0; n < t.length && e.length < 1; n++)
                    o.includes(t[n].index) && e.push(t[n].value);
                return e
            }
            )).map(( (t, n) => f(void 0, e[n], t))).every((t => !!t))
        }
        ;
        function f(t, e, n) {
            let {condition: o, value: i} = e;
            switch (!0) {
            case t && o === s.gW:
                return n.every((t => v({
                    variable: t,
                    condition: o
                })));
            case t && o === s.q7:
                return n.every((t => y({
                    variable: t,
                    condition: o,
                    values: i
                })));
            default:
                return n.some((t => y({
                    variable: t,
                    condition: o,
                    values: i
                })))
            }
        }
        function h(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            const n = [];
            let o = [];
            function i(t, e, o, i, r) {
                const s = t[e]
                  , c = {
                    index: o,
                    value: s
                };
                return "string" != typeof s && "number" != typeof s || r.push(c),
                null != s && i && n.push(c),
                null != s ? (0,
                a.putInArrayIfNeeded)(s, [t]) : []
            }
            const r = new RegExp('("[^"]+")|([^.]+)',"g");
            return {
                variables: e.match(r).map((t => t.replace(/\"/g, ""))).reduce(( (t, e, a) => {
                    const r = 0 === a;
                    o = [];
                    const s = []
                      , c = function(t, e, n, o) {
                        return t.reduce(( (t, a, r) => [...t, ...i(a, e, r, n, o)]), [])
                    }(t, e, r, s);
                    return r ? o = n : n.forEach(( (t, e) => {
                        const n = s.findIndex((t => e === t.index));
                        -1 !== n && o.push({
                            index: t.index,
                            value: s[n].value
                        })
                    }
                    )),
                    c
                }
                ), (0,
                a.putInArrayIfNeeded)(t, [])),
                filteredValues: o
            }
        }
        function y(t) {
            let {variable: e, condition: n, values: o=[]} = t;
            switch (n) {
            case s.AW:
                const [t,i] = o;
                return e > Number(t) && e < Number(i);
            case s.gW:
            case s.uS:
                return v({
                    condition: n,
                    variable: e
                });
            case s.q7:
                return o.every((t => v({
                    condition: n,
                    value: t,
                    variable: e
                })));
            default:
                return o.some((t => v({
                    condition: n,
                    value: t,
                    variable: e
                })))
            }
        }
        function b(t) {
            return "string" == typeof t && !isNaN(t) && "" !== t || "number" == typeof t
        }
        function v(t) {
            let {variable: e, condition: n, value: o} = t
              , i = !1;
            if (n === s.gW && void 0 === e)
                i = !0;
            else if (void 0 !== e)
                switch (n) {
                case s.UT:
                    i = b(e) ? Number(e) === Number(o) : String(e) === String(o);
                    break;
                case s.sz:
                    i = String(e).indexOf(o) >= 0;
                    break;
                case s.q7:
                    i = String(e).indexOf(o) < 0;
                    break;
                case s.Wm:
                    i = new RegExp(o).test(String(e));
                    break;
                case s.AX:
                    b(e) && (i = Number(e) < Number(o));
                    break;
                case s.aO:
                    b(e) && (i = Number(e) <= Number(o));
                    break;
                case s.vz:
                    b(e) && (i = Number(e) > Number(o));
                    break;
                case s.PF:
                    b(e) && (i = Number(e) >= Number(o));
                    break;
                case s.mh:
                    i = "number" == typeof e ? e !== Number(o) : String(e) !== String(o);
                    break;
                case s.gW:
                    i = !1;
                    break;
                case s.uS:
                    i = !0
                }
            return i
        }
    }
    ,
    7768: (t, e, n) => {
        n.r(e),
        n.d(e, {
            deviceTargeting: () => r,
            deviceTypes: () => a
        });
        var o = n(3002)
          , i = n(648);
        const a = {
            1: "mobile phone",
            2: "tablet",
            3: "desktop"
        };
        async function r(t) {
            let {conditions: e} = t;
            try {
                const [t] = await (0,
                o.g)(!0, ["type"]);
                return null != t && e.every((e => {
                    let {include: n, value: o} = e;
                    const i = a[o] === t.toLowerCase();
                    return n ? i : !i
                }
                ))
            } catch (t) {
                const n = "Targeting error (device)";
                return i.vV(n, e),
                !1
            }
        }
    }
    ,
    8399: (t, e, n) => {
        n.r(e),
        n.d(e, {
            ABANDONED_CART: () => K,
            ACTION_TRACKING: () => B,
            ADBLOCK: () => H,
            ADOBE_DMP: () => d,
            ADVALO_DMP: () => s,
            AMOUNT: () => X,
            BLUEKAI_DMP: () => a,
            BROWSER: () => y,
            BROWSER_LANGUAGE: () => f,
            CAMPAIGN_EXPOSITION: () => k,
            CODE: () => N,
            CONTENT_INTEREST: () => G,
            COOKIE: () => g,
            COUPON: () => tt,
            CSAT: () => Y,
            CUSTOM_VARIABLE: () => P,
            DATALAYER: () => M,
            DAYS_SINCE_FIRST_SESSION: () => I,
            DAYS_SINCE_LAST_SESSION: () => C,
            DELIVERY_METHOD: () => Z,
            DEVICE: () => u,
            ECOMMERCE_VARIABLE: () => L,
            ENGAGEMENT_LEVEL: () => F,
            EULERIAN_DMP: () => o,
            GEOLOCATION: () => m,
            INTEGRATIONS_PROVIDER: () => W,
            IP: () => p,
            JS_VARIABLE: () => x,
            KEYWORD: () => q,
            KRUX_DMP: () => c,
            LANDING_PAGE: () => h,
            LAST_PURCHASE: () => V,
            NPS: () => Q,
            NUMBER_PAGES_VIEWED: () => S,
            PAGE_INTEREST: () => z,
            PAGE_VIEW: () => U,
            PAYMENT_METHOD: () => J,
            PREVIOUS_PAGE: () => w,
            PRODUCT_CATEGORY: () => nt,
            PRODUCT_SKU: () => et,
            PURCHASE_FREQUENCY: () => j,
            RETURNING_VISITOR: () => b,
            SAME_DAY_VISIT: () => _,
            SCREEN_SIZE: () => T,
            SELECTOR: () => R,
            SESSION_NUMBER: () => A,
            SOURCE: () => O,
            SOURCE_TYPE: () => v,
            TAGCOMMANDER_DMP: () => i,
            TEALIUM_DMP: () => $,
            URL_PARAMETER: () => D,
            WEATHER: () => E,
            WEBORAMA_DMP: () => l,
            YSANCE_DMP: () => r
        });
        const o = 1
          , i = 2
          , a = 4
          , r = 5
          , s = 6
          , c = 7
          , l = 8
          , d = 10
          , u = 17
          , p = 18
          , m = 19
          , g = 20
          , f = 21
          , h = 22
          , y = 23
          , b = 24
          , v = 25
          , w = 26
          , T = 27
          , x = 28
          , k = 29
          , O = 30
          , S = 31
          , _ = 32
          , H = 33
          , A = 34
          , E = 35
          , C = 36
          , I = 37
          , L = 38
          , D = 39
          , N = 40
          , P = 41
          , B = 42
          , R = 43
          , M = 44
          , V = 45
          , j = 46
          , q = 47
          , $ = 48
          , F = 49
          , G = 50
          , U = 51
          , z = 52
          , W = 53
          , K = 54
          , Y = 55
          , Q = 56
          , J = 1
          , Z = 2
          , X = 3
          , tt = 4
          , et = 5
          , nt = 6
    }
    ,
    7405: (t, e, n) => {
        n.d(e, {
            li: () => w,
            mn: () => h,
            Xp: () => b,
            BA: () => y,
            z: () => v,
            PA: () => T
        });
        var o = n(648)
          , i = n(4721)
          , a = n(8399)
          , r = n(4804)
          , s = n(8843);
        n(1134),
        n(6257);
        !function() {
            const t = {}
        }();
        var c = n(3346)
          , l = n(3595)
          , d = n(7426)
          , u = n(2484);
        const p = "ABTastyVisitorHistory"
          , m = {
            timeout: 3e3,
            timeoutName: "visitorHistoryFetch",
            route: "https://dcinfos-cache.abtasty.com/v1/visitor-history/accounts/{clientID}/visitors/{visitorID}"
        };
        ( () => {
            const t = {}
        }
        )();
        n(6692),
        n(8987),
        n(9578),
        n(88),
        n(3621),
        n(117);
        n(7471),
        n(4502),
        n(8009);
        n(2538),
        n(8445),
        n(9467),
        n(5066);
        var g = n(977);
        const f = {};
        {
            const {deviceTargeting: t} = n(7768);
            f[a.DEVICE] = () => t
        }
        {
            const {cookieTargeting: t} = n(28);
            f[a.COOKIE] = () => t
        }
        {
            const {datalayerTargeting: t} = n(4263);
            f[a.DATALAYER] = () => t
        }
        {
            const {screenSizeTargeting: t} = n(719);
            f[a.SCREEN_SIZE] = () => t
        }
        {
            const {codeTargeting: t} = n(9263);
            f[a.CODE] = () => t
        }
        {
            const {pageInterestTargeting: t} = n(4879);
            f[a.PAGE_INTEREST] = () => t
        }
        function h(t) {
            return r.Hu.getGlobalCampaignsInfos().needDCInfosFetch.indexOf(t) > -1
        }
        function y(t) {
            return r.Hu.getGlobalCampaignsInfos().needIPFetch.indexOf(t) > -1
        }
        function b(t) {
            return r.Hu.getGlobalCampaignsInfos().needGeolocFetch.indexOf(t) > -1
        }
        function v(t) {
            return r.Hu.getGlobalCampaignsInfos().needUAParserFetch.indexOf(t) > -1
        }
        function w(t) {
            return r.Hu.getGlobalCampaignsInfos().needAdBlockDetection.indexOf(t) > -1
        }
        const T = t => async (e, n, o) => (r.Hu.updatePublicTargetingAudienceMode(e),
        !o || !o?.length || Promise.all(o.map(( (n, o) => x(t)(e, o, n)))).then((t => n === g.SC.some ? t.some((t => t)) : t.every((t => t)))))
          , x = t => async (e, n, a) => {
            if (void 0 === a || null == a.targeting_groups || 0 === a.targeting_groups.length)
                return !0;
            const c = a.is_segment ? i.fh : i.ih
              , l = (await Promise.all(a.targeting_groups.map((async i => (await Promise.all(i.targetings.map((async l => {
                const {targeting_type: d, success: u} = l;
                let p = void 0 === u || u;
                if (!(0,
                s.isOnceTargeting)(d) || void 0 === u) {
                    const u = await f[d](t);
                    if ("function" == typeof u)
                        return p = await u(l, e.id, i.position),
                        (0,
                        s.storeTargetingSuccess)(l, p),
                        r.Hu.updatePublicTargetingData(e.id, l, p, c, i.position, n, a.name),
                        p;
                    o.FF("Cannot apply targeting", l),
                    (0,
                    s.storeTargetingSuccess)(l, p),
                    r.Hu.updatePublicTargetingData(e.id, l, p, c, i.position, n, a.name)
                }
                return p
            }
            )))).every(Boolean))))).some(Boolean);
            return o.NI("Applying audience", a, " for ", e, "result = ", l),
            l
        }
    }
    ,
    4879: (t, e, n) => {
        n.r(e),
        n.d(e, {
            pageInterestTargeting: () => l
        });
        var o = n(6257)
          , i = n(5960)
          , a = n(5437)
          , r = n(2147)
          , s = n(6158);
        const c = {
            [r.UT]: "equals",
            [r.sz]: "contains",
            [r.Wm]: "regexp",
            [r.W8]: "ignore_parameters",
            [r.D0]: "favorite_url"
        }
          , l = t => {
            let {conditions: e} = t;
            const n = (new o.x).getVisitedPages()
              , i = e.filter((t => {
                let {include: e} = t;
                return !e
            }
            ))
              , a = i.some((t => d(t, n)));
            if (i.length > 0 && a)
                return !1;
            const r = e.filter((t => {
                let {include: e} = t;
                return e
            }
            ))
              , s = r.some((t => d(t, n)));
            return !!(r.length > 0 && s) || 0 === r.length
        }
          , d = (t, e) => {
            const {timeframe: n, visited_pages: o} = t
              , r = n === s.VE.lastSession ? (t => {
                const e = t.reverse()
                  , n = e[0].visite;
                if (1 === n)
                    return [];
                const o = e.findIndex((t => t.visite === n - 1))
                  , i = e.findIndex((t => t.visite === n - 2));
                return i > 0 ? t.slice(o, i) : t.slice(o)
            }
            )(e) : ( (t, e) => {
                const n = new Date(Date.now() - 24 * t * 60 * 60 * 1e3);
                return e.filter((t => new Date(1e3 * t.time).getTime() > n.getTime()))
            }
            )(n, e);
            return r.filter((e => function(t, e) {
                const {favoriteUrls: n, condition: o} = t;
                if ("favorite_url" === c[o] && n)
                    return (0,
                    i.c)(n, e);
                return function(t, e) {
                    const {condition: n, value: o} = t
                      , i = c[n];
                    return (0,
                    a.wM)(i, o, e)
                }(t, e)
            }(t, e.url))).length >= o
        }
    }
    ,
    719: (t, e, n) => {
        n.r(e),
        n.d(e, {
            screenSizeTargeting: () => a
        });
        var o = n(648);
        function i(t) {
            let {value_min: e, value_max: n, include: o} = t
              , i = !1;
            const a = screen.width;
            return i = e >= n ? a >= n && a <= e : a >= e && a <= n,
            o ? i : !i
        }
        function a(t) {
            let {operator: e, conditions: n} = t;
            try {
                return "and" === e ? n.every(i) : n.some(i)
            } catch (t) {
                const e = "Targeting error (screenSize)";
                return o.vV(e, n),
                !1
            }
        }
    }
    ,
    3026: (t, e, n) => {
        n.d(e, {
            L: () => k,
            a: () => b
        });
        var o = n(6046)
          , i = n(3002)
          , a = n(648);
        const r = (0,
        o.I)();
        let s = !1;
        const c = [];
        let l, d = {
            mousedown: [],
            click: [],
            submit: [],
            focus: [],
            blur: [],
            hover: []
        };
        const u = {
            childList: !0,
            subtree: !0
        }
          , p = [document]
          , m = []
          , g = t => t.includes("[]") ? t.split("[]")[2] : t
          , f = t => {
            const e = m.reduce(( (t, e) => {
                let {get: n} = e;
                const o = n();
                return null === o || "hidden" === o.visibilityState ? t : [...new Set([...t, o])]
            }
            ), [document]);
            if (e.length && e.some((t => !p.includes(t)))) {
                p.length = 0,
                p.push(...e);
                const n = Object.keys(d);
                for (const e of n)
                    d[e] && d[e]?.length && v(t)(e)
            }
            return e
        }
          , h = (t, e) => c.some((n => n.root === t && n.event === e))
          , y = function(t, e) {
            let n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return (d[e] || []).filter((e => {
                let {clicked: o, selector: i} = e;
                if (n && !o)
                    return !1;
                const a = g(i);
                return t.matches(a) || t.closest(a)
            }
            ))
        }
          , b = () => {
            for (const {root: t, event: e, listener: n} of c)
                t?.removeEventListener(e, n, !0);
            c.length = 0,
            l?.disconnect(),
            d = {
                mousedown: [],
                click: [],
                submit: [],
                focus: [],
                blur: [],
                hover: []
            },
            s = !1
        }
          , v = t => async e => {
            const n = n => {
                let {target: o} = n;
                return w(t)(o, e)
            }
              , [o] = await (0,
            i.g)(!0, ["type"])
              , a = o?.toLowerCase() ?? null;
            if (["mousedown", "click"].includes(e) && a && "desktop" !== a && "ontouchstart"in document.documentElement)
                s || ( () => {
                    const t = t => {
                        let {target: e} = t;
                        y(e, "mousedown").forEach((t => t.clicked = !0)),
                        y(e, "click").forEach((t => t.clicked = !0))
                    }
                      , e = t => {
                        let {target: e} = t;
                        y(e, "mousedown").forEach((t => t.clicked = !1)),
                        y(e, "click").forEach((t => t.clicked = !1))
                    }
                      , n = t => {
                        let {target: e} = t;
                        y(e, "mousedown", !0).forEach((t => {
                            const n = [t.name, null, t.testId ?? null, e];
                            r?.then((t => t?.aggregateActionTracking(...n)))
                        }
                        )),
                        y(e, "click", !0).forEach((t => {
                            const n = [t.name, null, t.testId ?? null, e];
                            r?.then((t => t?.aggregateActionTracking(...n)))
                        }
                        ))
                    }
                    ;
                    for (const o of p) {
                        if (h(o, "touchstart"))
                            continue;
                        const i = [{
                            event: "touchstart",
                            listener: t
                        }, {
                            event: "touchmove",
                            listener: e
                        }, {
                            event: "touchend",
                            listener: n
                        }];
                        for (const {event: t, listener: e} of i)
                            o.addEventListener(t, e, !0),
                            c.push({
                                root: o,
                                event: t,
                                listener: e
                            })
                    }
                }
                )();
            else if ("hover" === e && "desktop" === a)
                (t => {
                    let e, n, o = !1;
                    const i = i => {
                        if (o || !d.hover || !d.hover.length)
                            return;
                        o = !0,
                        setTimeout(( () => o = !1));
                        const a = i.target;
                        for (const {selector: o} of d.hover) {
                            const i = g(o);
                            (a.matches?.(i) || a.closest?.(i)) && (n = a,
                            e = setTimeout(( () => {
                                e = null,
                                w(t)(a, "hover")
                            }
                            ), 500))
                        }
                    }
                      , a = t => {
                        let {target: o} = t;
                        e && o === n && (clearTimeout(e),
                        e = null)
                    }
                    ;
                    for (const t of p) {
                        if (h(t, "pointerenter"))
                            continue;
                        const e = [{
                            event: "pointerenter",
                            listener: i
                        }, {
                            event: "pointerleave",
                            listener: a
                        }];
                        for (const {event: n, listener: o} of e)
                            t.addEventListener(n, o, !0),
                            c.push({
                                root: t,
                                event: n,
                                listener: o
                            })
                    }
                }
                )(t);
            else
                for (const t of p)
                    h(t, e) || (t.addEventListener(e, n, !0),
                    c.push({
                        root: t,
                        event: e,
                        listener: n
                    }));
            s || (s = !0)
        }
          , w = t => (t, e) => {
            if (d[e])
                for (const {selector: n, name: o, testId: i} of d[e]) {
                    const e = g(n);
                    try {
                        if (t.matches(e) || t.closest(e)) {
                            const e = [o, null, i ?? null, t];
                            r?.then((t => t?.aggregateActionTracking(...e)))
                        }
                    } catch (t) {
                        (0,
                        a.FF)(`Provided for ${i} test selector ${e} is not valid: ${t}`)
                    }
                }
        }
          , T = (t, e, n) => {
            for (const o of e)
                d[t]?.push({
                    ...o,
                    testId: n
                })
        }
          , x = (t, e) => {
            for (const {selector: e} of t) {
                if (!e.includes("[]"))
                    continue;
                const t = e.split("[]").map((t => t.trim()));
                if (3 !== t.length)
                    continue;
                const [n,o] = t
                  , i = () => {
                    const t = document.querySelector(n);
                    if (!t || !(o in t))
                        return null;
                    if ("contentDocument" === o) {
                        return t.contentDocument
                    }
                    return t[o]
                }
                ;
                m.push({
                    get: i
                })
            }
            m.length && (t => {
                l ??= new MutationObserver(( () => f(t))),
                l.observe(document.querySelector("body"), u)
            }
            )(e)
        }
          , k = t => (e, n) => {
            const o = Object.keys(e);
            for (const i of o) {
                const o = e[i];
                x(o, t),
                f(t),
                d[i] && 0 === d[i]?.length && v(t)(i),
                T(i, o, n)
            }
        }
    }
    ,
    9498: (t, e, n) => {
        n.d(e, {
            KK: () => l,
            sC: () => s
        });
        var o = n(6552)
          , i = n(7725)
          , a = n(2484)
          , r = n(3595);
        const s = async (t, e) => {
            const n = []
              , o = (0,
            i.vm)()
              , s = o ? JSON.parse(a.Ks.getItem(a.b1, "ABTastyForcedM2eCampaigns") || "{}") : {}
              , u = t.reduce(( (t, e, n) => (0 !== e.parentID && (t[e.parentID] ? t[e.parentID].push(n) : t[e.parentID] = [n]),
            {
                ...t
            })), {})
              , p = e => {
                u[e]?.forEach((e => n.push(t[e])))
            }
            ;
            for (const i of t)
                if (!c(i))
                    if (l(i))
                        if (o && !(0,
                        r.g)(s[i.exclusionGroupId])) {
                            s[i.exclusionGroupId] === i.id && (n.push(i),
                            p(i.id))
                        } else {
                            const [t,o] = [i.m2eStartRange, i.m2eStartRange + i.m2eCoefficient]
                              , a = await d(i.exclusionGroupId, e);
                            a >= t && a <= o && (n.push(i),
                            p(i.id))
                        }
                    else
                        n.push(i),
                        p(i.id);
            return n
        }
          , c = t => 0 !== t.parentID
          , l = t => !!t?.exclusionGroupId
          , d = (t, e) => (0,
        o.w)(`${t}.${e}`)
    }
    ,
    9467: (t, e, n) => {
        n.d(e, {
            H: () => r,
            d: () => a
        });
        var o = n(2492)
          , i = n(8445);
        const a = (t, e) => {
            const n = new o.E;
            return n.getHitHistorySessionCst() === t ? n.checkHitHistorySession(i._V.CAMPAIGNS, e) : (n.cleanHitHistorySession(i._V.CAMPAIGNS),
            n.cleanHitHistorySession(i._V.CURRENT_SESSION_TIMESTAMP),
            !1)
        }
          , r = (t, e) => (new o.E).setHitHistorySession(i._V.CAMPAIGNS, e, t.getCurrentSessionTimestamp())
    }
    ,
    4804: (t, e, n) => {
        n.d(e, {
            Hu: () => at,
            me: () => et,
            iE: () => it
        });
        var o = n(977)
          , i = n(9578)
          , a = (n(81),
        n(3340))
          , r = n(1134)
          , s = n(9076)
          , c = n(3595)
          , l = n(8689)
          , d = n(6914)
          , u = n(721);
        const p = (0,
        u.c)(( (t, e) => e.map((e => e[t]))))
          , m = (0,
        u.c)(( (t, e, n) => n[t] === e))
          , g = (0,
        u.c)(( (t, e) => {
            const n = {};
            for (const o in e)
                t(e[o], o, e) && (n[o] = e[o]);
            return n
        }
        ))
          , f = (0,
        u.c)(( (t, e) => Object.keys(e).reduce(( (n, o) => (n[o] = t(e[o], o, e),
        n)), {})));
        var h = n(648)
          , y = n(7765);
        const b = ["addCSS", "addImage", "addLink", "addParagraph", "addHtml", "addHTML", "advanced sort", "bring2back", "bring2front", "changeImage", "changeLink", "copy", "copyAfter", "copyBefore", "cut", "cutAfter", "cutBefore", "editAttributes", "editHtml", "editHTML", "editPicture", "editStyle", "editText", "editDirect", "hide", "hideByClass", "hideContent", "move", "multivarCode", "resize", "resizeAndDrag", "s&rImage", "s&rText", "sort", "addCSS", "editStyleCSS", "hideByClassCSS", "hideCSS"];
        var v = n(7550)
          , w = n(1387)
          , T = (n(6804),
        n(5974));
        n(6361);
        let x;
        x = (0,
        T._)().then((t => t?.start));
        const k = ["editStyleCSS", "sort", "changeLink", "addLink", "editAttributes", "addCSS", "editPicture"]
          , O = t => t.filter((t => {
            let {type: e, value: n} = t;
            return b.includes(e) && null != n
        }
        )).map((t => {
            const e = t;
            return k.includes(t.type) && (e.value = (t => {
                try {
                    return JSON.parse(t)
                } catch (e) {
                    return t
                }
            }
            )(t.value)),
            e
        }
        ))
          , S = async (t, e, n, o, i) => {
            (0,
            l.I)(o) || await (0,
            w.K6)(o, e, n)
        }
          , _ = async function(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null
              , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0
              , o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : void 0
              , i = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4]
              , a = arguments.length > 5 ? arguments[5] : void 0
              , r = arguments.length > 6 && void 0 !== arguments[6] && arguments[6];
            if (a?.aborted)
                return void (0,
                h.NI)(`Campaign instance is outdated. Campaign ${n}`);
            if ((0,
            c.g)(t))
                return;
            const s = "string" == typeof e && "" !== e;
            let l = document
              , d = e;
            if (s && e.includes("[]")) {
                const t = e.split("[]").map((t => t.trim()))
                  , [n,o,i] = t;
                l = document.querySelector(n)?.[o],
                l && (d = i)
            }
            s && l && Boolean(l.querySelector(d)) ? await S(0, n, o, t) : s ? setTimeout((async () => await _(t, e, n, o, i, a, r)), 50) : i ? (0,
            v.Q)((async () => {
                a?.aborted ? (0,
                h.NI)(`Campaign instance is outdated. Campaign ${n}`) : await S(0, n, o, t)
            }
            )) : await S(0, n, o, t)
        }
          , H = async function(t, e, n, o, i) {
            let a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
            const r = await x
              , s = O(t);
            s.length > 0 && r && r(s);
            const c = (t => t.filter((t => {
                let {type: e, value: n} = t;
                return -1 === b.indexOf(e)
            }
            )))(t);
            c.length > 0 && await Promise.all(c.map((async t => {
                const {type: r} = t;
                ["customScriptNew", "changeWithAI"].includes(r) ? await _(t.oldValue, t.selector, e, n, o, i, a) : /plugin_/.test(r) && (0,
                h.FF)("Ignoring old plugin modification.")
            }
            )))
        };
        let A;
        A = n(9530);
        class E {
            constructor(t, e, n, o) {
                let {id: i, name: a, traffic: r, modifications: s, widgets: c, components: l, redirections: d} = e;
                this.testId = t,
                this.id = i,
                this.name = a,
                this.traffic = r,
                this.modifications = s,
                this.codeOnDomReady = n,
                this.widgets = c,
                this.components = l,
                this.redirections = d,
                this.isDeferred = o
            }
            async apply(t) {
                (0,
                h.fH)(`applying modifications (campaign ${this.testId} - variation ${this.id})`, this.modifications),
                !(0,
                c.g)(this.redirections) && this.redirections.length > 0 ? (0,
                y.oT)(this.redirections, this.testId, this.id) : ((0,
                c.g)(this.modifications) || H(this.modifications, this.testId, this.id, this.codeOnDomReady, t, this.isDeferred),
                ["widgets", "components"].forEach((async (t, e) => {
                    (0,
                    c.g)(this[t]) || "widgets" === t && await A.applyWidgets(this.widgets, this.testId, this.id)
                }
                )))
            }
        }
        var C = n(6381);
        n(3002);
        const I = {};
        var L = function(t) {
            return t.single = "'",
            t.double = '"',
            t.back = "`",
            t
        }(L || {});
        const D = async (t, e, n) => {
            (0,
            h.fH)(`applying analytics (campaign ${e.campaignId})`),
            (0,
            c.g)(t) || (async (t, e) => {
                t.forEach((t => {
                    let {name: n, wave: o, tracker: i, implementation: a, functionName: r} = t;
                    const s = I[n];
                    s ? s(e, o, i, a, r) : (0,
                    h.FF)("Analytics tool is not supported by AB Tasty: ", n, `(for campaign ${e.campaignId})`)
                }
                ))
            }
            )(t, e),
            (0,
            c.g)(n) || (async (t, e) => {
                const n = /([\'\"\`]{1})?{{([a-z]*)}}([\'\"\`]{1})?/gi
                  , o = /([\`\'\"]{1})/gi;
                t.forEach((t => {
                    let {code: i} = t;
                    const a = i.replace(n, ( (t, n, i, a) => {
                        const r = "string" == typeof e[i] ? e[i].replace(o, ( (t, e) => `\\${e}`)) : e[i];
                        return [...Object.values(L).includes(n) ? [n] : [L.back], r, ...Object.values(L).includes(a) ? [a] : [L.back]].join("")
                    }
                    ));
                    (0,
                    w.K6)(a, e.campaignId, e.variationId)
                }
                ))
            }
            )(n, e)
        }
        ;
        var N = n(3026)
          , P = n(7643)
          , B = n(6046)
          , R = n(1492)
          , M = n(8399)
          , V = n(4721)
          , j = n(3346)
          , q = n(7426)
          , $ = n(3847);
        var F = n(8843)
          , G = n(8009)
          , U = n(5066)
          , z = n(9825);
        var W = n(9467);
        const K = 864e5
          , Y = t => {
            const e = new Date;
            return e.setUTCHours(t.getUTCHours()),
            e.setUTCMinutes(t.getUTCMinutes()),
            e.setUTCSeconds(t.getUTCSeconds()),
            e.setUTCMilliseconds(t.getUTCMilliseconds()),
            e
        }
          , Q = (t, e) => {
            const n = e.getCampaign(t.data.id);
            if (!n)
                return !0;
            const {lastSessionSeen: i, lastViewTimestamp: a} = n
              , {type: r, unit: s, value: c} = t.getTargetingDisplayFrequency();
            switch (r) {
            case o.fH.any:
                break;
            case o.fH.once:
                return !a;
            case o.fH.oncePerSession:
                if (a)
                    return i !== e.getNumberOfSessions();
            case o.fH.regular:
                if (a)
                    switch (s) {
                    case o.Vd.session:
                        return i === e.getNumberOfSessions() || i + c <= e.getNumberOfSessions();
                    case o.Vd.day:
                        return ( (t, e) => {
                            const n = new Date(t)
                              , o = (Y(n).getTime() - t) / K;
                            return 0 === o || o / e >= 1
                        }
                        )(a, c);
                    case o.Vd.week:
                        return ( (t, e) => {
                            const n = new Date(t)
                              , o = Y(n);
                            for (; o.getUTCDay() !== n.getUTCDay(); )
                                o.setUTCDate(o.getUTCDate() - 1);
                            const i = (o.getTime() - t) / K / 7;
                            return 0 === i || i / e >= 1
                        }
                        )(a, c)
                    }
            }
            return !0
        }
        ;
        var J = n(20)
          , Z = n(9498)
          , X = n(6259);
        let tt, et = function(t) {
            return t[t.Original = 0] = "Original",
            t[t.Untracked = -1] = "Untracked",
            t[t.Timeout = -2] = "Timeout",
            t
        }({});
        tt = n(9530);
        const nt = {
            id: 0,
            name: "Original",
            masterVariationId: 0
        }
          , ot = {}
          , it = t => ot[t];
        class at {
            abortController = ( () => new AbortController)();
            constructor(t) {
                const {id: e} = t;
                if (it(e))
                    return it(e);
                this.data = t,
                this.forceUntracking = !1,
                ot[e] = this,
                this.initPublicData(),
                this.hasBeenChecked = this.memoizeHasBeenChecked()
            }
            static resetCampaigns() {
                Object.keys(ot).forEach((t => {
                    const e = it(Number(t));
                    e.abortController.abort("Campaign has been reset."),
                    e.chosenVariation = null,
                    e.updatePublicData({
                        id: null,
                        name: null
                    }),
                    e.setStatus(a.B.pending),
                    e.data.audienceTrigger && (0,
                    F.resetTargetingSuccess)(e.data.audienceTrigger),
                    e.data.audienceSegment && (0,
                    F.resetTargetingSuccess)(e.data.audienceSegment),
                    delete ot[t]
                }
                ))
            }
            getType() {
                return this.data.type
            }
            getSubType() {
                if (this.isMultipageChild())
                    return o.qA.multipageTest;
                if (this.isMultivariateChild())
                    return o.qA.multivariate;
                if (this.isPersonalisationChild()) {
                    const t = at.instantiate(this.data.parentID);
                    return !!t && t.data.sub_type || o.cz.subsegment
                }
                return this.isAA() ? o.cz.aa : this.data.sub_type || o.cz.ab
            }
            getAdditionalType() {
                return this.data.additionalType || null
            }
            getConsentType() {
                return this.getAdditionalType() ? this.getAdditionalType() : this.isPersonalisation() || this.isPersonalisationChild() ? "perso" : this.isAA() ? "aa" : this.isMultipagePatch() ? "patch" : "test"
            }
            getChildren() {
                return this.data.children || []
            }
            getId() {
                return this.data.id
            }
            getName() {
                return this.data.name
            }
            getChosenVariation() {
                return this.chosenVariation
            }
            static instantiate(t) {
                const e = at.getCampaignData(t);
                if (e)
                    return new at(e)
            }
            static getActiveCampaigns() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                return (0,
                s.F)(g(( (e, n) => {
                    let {status: o, variationID: i} = e;
                    return (null !== t && t === Number(n) || null === t) && [a.B.accepted, a.B.acceptedByRedirection].includes(o) && null !== i && i !== et.Untracked
                }
                )), f(( (t, e) => ({
                    ...t,
                    testDatas: it(e).data
                }))))(window.ABTasty.results)
            }
            static getCampaignData(t) {
                return (0,
                r.yn)().tests[t]
            }
            static getCampaignsDatas(t) {
                const e = t || (0,
                r.yn)()
                  , {global: n, ...o} = e.tests;
                return Object.values(o)
            }
            static sortCampaignsParentsByPrioASC(t) {
                let e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                return t.sort(( (t, e) => Number(t.priority) - Number(e.priority))).reduce(( (t, n) => {
                    const {priority: o, parentID: i} = n
                      , r = 0 !== i
                      , s = at.instantiate(n.id);
                    if (r)
                        return s.isPersonalisationChild() && e && s.setStatus(a.B.notPrioritizedYet),
                        t;
                    s.isPersonalisation() && e && s.setStatus(a.B.notChecked);
                    const c = void 0 !== t[o] ? [...t[o], n] : [n];
                    return {
                        ...t,
                        [o]: c
                    }
                }
                ), {})
            }
            static getGlobalCampaignsInfos(t) {
                const e = t || (0,
                r.yn)()
                  , {global: n} = e.tests;
                return n
            }
            static getParentCampaignsIDs = t => (0,
            s.F)((0,
            d.p)(m("parentID", 0)), p("id"))(t);
            static getCampaignsSortedByPrio = function(t) {
                let e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                return at.sortCampaignsParentsByPrioASC(t, e)
            }
            ;
            static filterCampaignByPrio = (t, e) => t[e];
            getVariation(t) {
                return t === et.Original ? nt : this.data.variations[t]
            }
            getVariationInfoByMasterId(t) {
                return this.isAsync() ? Object.values(this.data.asyncVariationInfoById).find((e => this.data.variations[e.id].masterVariationId === t)) : Object.values(this.data.variations).find((e => e.masterVariationId === t))
            }
            getMasterVariationId(t) {
                return this.getVariation(t).masterVariationId
            }
            getParent() {
                const t = at.getCampaignData(this.data.parentID);
                return new at(t)
            }
            getParentId() {
                return this.getParent().data.id
            }
            getParentName() {
                return this.getParent().data.name
            }
            getStatus() {
                return this.data.status || a.B.pending
            }
            getAbortSignal() {
                return this.abortController.signal
            }
            getSeenBrothers(t) {
                const {parentID: e, siblings: n} = this.data;
                return 0 === e || null == n || 0 === n.length ? null : n.map((e => {
                    const n = t.getCampaign(e);
                    return n ? {
                        campaignId: e,
                        ...n
                    } : null
                }
                )).filter((t => !(0,
                c.g)(t)))
            }
            setStatus(t) {
                this.data.status = t,
                (0,
                c.g)(window.ABTasty.results[this.data.id]) && this.initPublicData(),
                this.hasBeenCheckedResolve && t !== a.B.checking && this.hasBeenCheckedResolve(t),
                window.ABTasty.results[this.data.id].status = t
            }
            memoizeHasBeenChecked() {
                let t = null;
                return () => t || (t = new Promise((t => {
                    this.hasBeenCheckedResolve = t
                }
                )),
                t)
            }
            isAA(t, e) {
                return (t || this.data.type) === o.cz.aa || (e || this.getAdditionalType()) === o.JP.aaTest
            }
            isContainer() {
                return [o.cz.multipage, o.cz.multivariate, o.cz.mastersegment].includes(this.data.type)
            }
            isChild() {
                return this.isMultipageChild() || this.isMultivariateChild() || this.isPersonalisationChild()
            }
            isMultivariate() {
                return this.data.type === o.cz.multivariate
            }
            isMultipage() {
                return this.data.type === o.cz.multipage
            }
            isMultipagePatch(t, e) {
                return (t || this.data.type) === o.cz.multipage && (e || this.data.sub_type) === o.qA.patch
            }
            isPersonalisation() {
                return this.data.type === o.cz.mastersegment
            }
            isPatch(t, e) {
                return (t || this.data.sub_type) === o.qA.patch || (e || this.data.additionalType) === o.JP.patch
            }
            isMultivariateChild() {
                if (0 === this.data.parentID)
                    return !1;
                return at.instantiate(this.data.parentID).isMultivariate()
            }
            isMultipageChild() {
                if (0 === this.data.parentID)
                    return !1;
                return at.instantiate(this.data.parentID).isMultipage()
            }
            isPersonalisationChild() {
                if (0 === this.data.parentID)
                    return !1;
                return at.instantiate(this.data.parentID).isPersonalisation()
            }
            isDynamicAllocation() {
                return null != this.data.dynamicTrafficGoalId && "" !== this.data.dynamicTrafficGoalId
            }
            isUsingHashAllocation() {
                return this.isChild() ? this.getParent()?.data.isHashAllocationEnabled : this.data.isHashAllocationEnabled
            }
            getDynamicAllocationProperties() {
                return {
                    isDynamic: this.isDynamicAllocation(),
                    testedTraffic: this.data.dynamicTestedTraffic,
                    modulation: this.data.dynamicTrafficModulation
                }
            }
            getTargetingDisplayFrequency() {
                const t = {
                    type: this.data.displayFrequencyType
                };
                return this.data.displayFrequencyUnit && (t.unit = this.data.displayFrequencyUnit),
                this.data.displayFrequencyUnit && (t.value = this.data.displayFrequencyValue),
                t
            }
            isAsync() {
                return this.data.isAsync || !1
            }
            isTargetByEvent() {
                return Boolean(this.data.scopes.urlScope?.find((t => {
                    let {value: e} = t;
                    return e === V.Is
                }
                )))
            }
            isUsingCodeOnDomReady() {
                return this.isChild() ? at.instantiate(this.data.parentID).data.codeOnDomReady : this.data.codeOnDomReady
            }
            alreadySeenOneTest = t => e => {
                let n = !1;
                const {siblings: o=[]} = this.data
                  , i = t.getCampaigns();
                return Object.keys(i).forEach((t => {
                    const a = (0,
                    r.m_)(Number(t))
                      , s = i[t];
                    null != a && null == a.type.match(/(mastersegment|subsegment)/) && !this.isPatch(a.sub_type, a.additionalType) && !this.isAA(a.type, a.additionalType) && !this.isMultipagePatch(a.type, a.sub_type) && Number(t) !== e && s.variationID !== et.Untracked && o.indexOf(Number(t)) < 0 && (n = !0)
                }
                )),
                n
            }
            ;
            initPublicData() {
                const {id: t, name: e, type: n, status: o} = this.data
                  , i = {
                    name: e,
                    type: n,
                    sub_type: this.getSubType(),
                    additional_type: this.getAdditionalType(),
                    status: o,
                    variationID: this.chosenVariation,
                    variationName: null,
                    targetings: {
                        [V.vw]: {},
                        [V.l$]: {}
                    }
                };
                window.ABTasty.results && (window.ABTasty.results[t] = window.ABTasty.results[t] ?? i)
            }
            static updatePublicTargetingData(t, e, n) {
                let o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : V.fS
                  , i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null
                  , a = arguments.length > 5 ? arguments[5] : void 0
                  , r = arguments.length > 6 ? arguments[6] : void 0;
                const s = window.ABTasty.results[t];
                if (void 0 === s || !e)
                    return;
                let c = s.targetings[o];
                if ([V.ih, V.fh].indexOf(o) > -1) {
                    c = c || [];
                    const t = {
                        success: n,
                        conditions: e.conditions,
                        targeting_type: e.targeting_type,
                        operator: e.operator,
                        name: Object.keys(M).find((t => M[t] === e.targeting_type)),
                        group: i,
                        audiencePosition: a,
                        audienceName: r
                    };
                    c = c.filter((e => e.targeting_type !== t.targeting_type || e.group !== t.group || e.audiencePosition !== t.audiencePosition)),
                    c.push(t),
                    c.sort(( (t, e) => t.audiencePosition - e.audiencePosition))
                } else
                    c = c || {},
                    c[e.targeting_type] = {
                        ...c[e.targeting_type],
                        conditions: e.conditions,
                        success: n
                    },
                    o === V.fS && (c[e.targeting_type] = {
                        ...c[e.targeting_type],
                        operator: e.operator,
                        name: Object.keys(M).find((t => M[t] === e.targeting_type))
                    });
                s.targetings[o] = c,
                window.ABTasty.results[t] = s
            }
            static updatePublicTargetingAudienceMode(t) {
                const e = t.id
                  , n = window.ABTasty.results[e];
                t && e && (n[V.xu] = t.segmentMode,
                n[V.Mz] = t.triggerMode),
                window.ABTasty.results[e] = n
            }
            updatePublicData(t) {
                let {id: e, name: n} = t;
                window.ABTasty.results[this.data.id].variationID = e,
                window.ABTasty.results[this.data.id].variationName = n
            }
            hasSeenMaster(t) {
                const {parentID: e} = this.data;
                return 0 === e ? null : !(0,
                c.g)(t.getCampaign(e))
            }
            hasBrotherAlreadyStarted() {
                const {parentID: t, siblings: e} = this.data;
                return 0 !== t && (null != e && 0 !== e.length && e.some((t => at.instantiate(t).getStatus() === a.B.accepted)))
            }
            hasAlreadySeenBrothers(t) {
                const e = this.getSeenBrothers(t);
                return !(0,
                c.g)(e) && !(0,
                l.I)(e)
            }
            isCheckingOtherCampaigns() {
                if (this.isPersonalisation() || this.isPersonalisationChild())
                    return !1;
                return at.getCampaignsDatas().filter((t => {
                    let {id: e} = t;
                    const n = it(e);
                    return e !== this.data.id && !(0,
                    c.g)(n) && (!(n.isPersonalisation() || n.isMultipage() || n.isMultivariate()) && e !== this.data.id && n.getStatus() === a.B.checking)
                }
                )).length > 0
            }
            isOneVisitorOneTestDone(t) {
                const {oneVisitorOneTest: e} = (0,
                r.F5)()
                  , {id: n, type: i, parentID: a} = this.data;
                if (e && i !== o.cz.subsegment && !this.isPatch() && !this.isAA()) {
                    let e = n;
                    return i === o.cz.ab && this.isMultipageChild() && (e = a),
                    this.alreadySeenOneTest(t)(e)
                }
                return !1
            }
            static abTastyStartTest = t => async function(e) {
                let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                const o = it(e);
                if (void 0 !== o) {
                    if (n === et.Untracked)
                        return void o.setStatus(a.B.traffic);
                    if (n === et.Timeout)
                        return void o.setStatus(a.B.timeout);
                    const i = t.getCampaign(e);
                    if (!(0,
                    c.g)(n) && (0,
                    c.g)(i)) {
                        o.isUsingHashAllocation() ? (0,
                        X.L)(e, n) : t.campaignView(e, n, a.B.accepted, !0)
                    }
                    await o.executeCampaign(t)
                } else {
                    const t = at.getCampaignsDatas().find((t => t.id === e));
                    t && (0,
                    Z.KK)(t) && (0,
                    h.FF)(`the campaign ${e} hasn't been executed through ABTastyStartTest() method since it's part of an exclusion group`)
                }
            }
            ;
            async updateCampaign(t, e) {
                if (!this.isAsync() || t === et.Timeout || t === et.Untracked)
                    return;
                const n = await Promise.all(e.map((async t => await async function(t, e, n) {
                    const o = `${(0,
                    $.x)()}/${(0,
                    r.pw)()}/${t}.${e}.json?${n}`;
                    let i = !1;
                    const a = ( () => {
                        try {
                            return new AbortController
                        } catch (t) {
                            (0,
                            h.FF)("Cannot create AbortController", t)
                        }
                    }
                    )()
                      , s = setTimeout(( () => {
                        i || (a?.abort(),
                        (0,
                        h.FF)(`Modifications can't be fetched for ${t}`))
                    }
                    ), 3e3);
                    return (0,
                    q.Dk)(`modifiationsFetchLoop_${t}`, s),
                    (0,
                    j.J)(o, {
                        signal: a?.signal
                    }).then((t => t.json())).then((t => (clearTimeout(s),
                    t && t._taginfo && delete t._taginfo,
                    i = !0,
                    [t, null]))).catch((t => (clearTimeout(s),
                    [null, t])))
                }(this.data.id, Number(t), this.data.campaignHash))))
                  , o = n.map((t => {
                    let[e] = t;
                    return e
                }
                ))
                  , i = n.map((t => {
                    let[,e] = t;
                    return e
                }
                ))
                  , s = o.find((e => e?.id === t));
                i.every((t => null === t)) ? (0,
                l.I)(s) || (this.data.variations = {
                    [t]: s
                }) : i.some((t => "AbortError" === t?.name)) ? this.setStatus(a.B.timeout) : this.forceUntracking = !0
            }
            sendExecutedCampaignEvent(t) {
                (new C.k).dispatchCustomEvent(i.u.Name.executedCampaign, {
                    campaignId: this.data.id,
                    variationId: this.getVariation(t).id,
                    status: this.getStatus(),
                    type: this.getSubType()
                })
            }
            async applyGlobalCode() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0
                  , e = arguments.length > 1 ? arguments[1] : void 0
                  , n = arguments.length > 2 ? arguments[2] : void 0
                  , o = arguments.length > 3 ? arguments[3] : void 0;
                (0,
                h.NI)(`Executing campaign ${e} JavaScript code.`);
                const i = async () => {
                    if (this.getAbortSignal().aborted)
                        return (0,
                        h.NI)(`Campaign instance is outdated. Campaign ${e}`),
                        !1;
                    (0,
                    c.g)(t) || (0,
                    l.I)(t) || (0,
                    w.K6)(t, e, n)
                }
                ;
                o ? (0,
                v.Q)((async () => await i())) : await i()
            }
            async executeCampaign(t) {
                if (this.getAbortSignal().aborted)
                    return (0,
                    h.NI)(`Campaign instance is outdated. Campaign ${this.getId()}`),
                    !1;
                const e = t.getVisitorId()
                  , n = this.data.id
                  , o = this.data.parentID
                  , r = t.getCampaign(n);
                let s = await (0,
                U.h)(this, e, t, r, o, (0,
                y.sw)(this.getId()));
                return this.updateCampaign(s, this.data.asyncVariationInfoById ? Object.keys(this.data.asyncVariationInfoById) : []).then((async () => {
                    const {id: e, parentID: n, status: o, name: r, variations: l, globalCode: d, widgets: u, analytics: p, customAnalytics: m, actionTrackings: g} = this.data;
                    if (this.getAbortSignal().aborted)
                        return (0,
                        h.NI)(`Campaign instance is outdated. Campaign ${e}`),
                        !1;
                    o === a.B.timeout ? s = et.Timeout : this.forceUntracking && this.isAsync() ? (s = et.Timeout,
                    this.setStatus(a.B.failedLoading)) : (0,
                    y.sw)(e) ? this.setStatus(a.B.acceptedByRedirection) : this.setStatus(a.B.accepted),
                    this.isDynamicAllocation() && this.isUsingHashAllocation() && (0,
                    J.ws)(e, s),
                    (0,
                    h.fH)("Campaign Viewed =", e, s),
                    t.campaignView(e, s, this.data.status, !this.isUsingHashAllocation());
                    const f = this.isUsingCodeOnDomReady();
                    if ([et.Timeout, et.Untracked].includes(s) || !l?.[s] && s !== et.Original)
                        return this.forceUntracking && s === et.Timeout ? (this.setStatus(a.B.failedLoading),
                        !1) : s === et.Timeout ? (this.setStatus(a.B.timeout),
                        !1) : (this.setStatus(a.B.traffic),
                        !1);
                    {
                        const n = {
                            caid: String(e),
                            vaid: String(s)
                        };
                        if ((0,
                        W.d)(t.getCurrentSessionTimestamp(), this.getId()))
                            (0,
                            B.I)().then((t => {
                                if (this.getAbortSignal().aborted)
                                    return (0,
                                    h.NI)(`Campaign instance is outdated. Campaign ${e}`),
                                    !1;
                                t?.notifyHit(R.YQ.campaign, n, Date.now())
                            }
                            ));
                        else {
                            (new P.n).setInternalHit(R.YQ.campaign, n)
                        }
                        (0,
                        c.g)(d) || f || this.applyGlobalCode(d, this.getId(), s, !1),
                        s === et.Original || (0,
                        y.sw)(e) || (this.chosenVariation = new E(e,l[s],f,this.isAsync()),
                        await this.chosenVariation.apply(this.getAbortSignal())),
                        (0,
                        v.Q)((async () => {
                            if (this.getAbortSignal().aborted)
                                return (0,
                                h.NI)(`Campaign instance is outdated. Campaign ${e}`),
                                !1;
                            (0,
                            c.g)(u) || await tt.applyWidgets(u, e, s),
                            f && this.applyGlobalCode(d, this.getId(), s, !0),
                            g && ((0,
                            c.g)(g) || (0,
                            N.L)(t)(g, e));
                            const n = this.getVariation(s)
                              , o = this.isChild() ? this.getParent().data.analytics : void 0
                              , a = !(0,
                            c.g)(o) && o.length > 0 ? o : p;
                            if (!(0,
                            c.g)(a) || !(0,
                            c.g)(m)) {
                                const t = {
                                    campaignName: r,
                                    campaignId: e,
                                    variationName: n.name,
                                    variationId: n.id
                                }
                                  , o = () => {
                                    (new G.NO).haveConsent([G.rv.collect]) ? D(a, t, m) : window.addEventListener(`abtasty_${i.u.Name.consentValid}`, (t => {
                                        const {detail: e} = t;
                                        e && e.consentFor.includes(G.rv.collect) && o()
                                    }
                                    ))
                                }
                                ;
                                (0,
                                y.oi)() || o()
                            }
                            return this.updatePublicData(n),
                            (0,
                            y.oi)() || (0,
                            W.H)(t, this.getId()),
                            this.sendExecutedCampaignEvent(s),
                            !0
                        }
                        ))
                    }
                }
                ))
            }
            async apply(t) {
                const {id: e} = this.data;
                let n = !1;
                if ((0,
                y.sw)(e))
                    return this.executeCampaign(t),
                    !0;
                if (!Q(this, t))
                    return this.setStatus(a.B.displayFrequency),
                    !1;
                const i = (0,
                F.checkTargeting)(t, this);
                return await Promise.race([i, new Promise((t => setTimeout(( () => {
                    n = !0,
                    t(!1)
                }
                ), V.nc)))]) ? (await this.executeCampaign(t),
                !0) : (n && i.then((async e => {
                    if ((t => e => {
                        const {id: n, type: i} = e.data;
                        if (e.getAbortSignal().aborted)
                            return (0,
                            h.NI)(`Campaign instance is outdated. Campaign ${n}`),
                            !1;
                        if (i === o.cz.subsegment && e.hasBrotherAlreadyStarted())
                            return e.setStatus(a.B.otherSubsegment),
                            !1;
                        if (e.isOneVisitorOneTestDone(t))
                            return e.setStatus(a.B.oneVisitorOneTest),
                            !1;
                        const r = e.isChild() ? e.getParent().data.priority : e.data.priority;
                        return !(r > 0 && (0,
                        z.nU)([r]).length > 0 && (e.setStatus(a.B.notPrioritizedYet),
                        1))
                    }
                    )(t)(this) && e)
                        return await this.executeCampaign(t),
                        !0
                }
                )),
                !1)
            }
        }
    }
    ,
    9825: (t, e, n) => {
        n.d(e, {
            Mm: () => m,
            nU: () => u,
            tP: () => p
        });
        var o = n(977)
          , i = n(4804)
          , a = n(648)
          , r = n(9578)
          , s = n(8009);
        const c = t => async (e, n, o) => {
            e.setStatus(o);
            const i = o => {
                const {detail: c} = o;
                e.getAbortSignal().aborted ? (window.removeEventListener(`abtasty_${r.u.Name.consentValid}`, i),
                (0,
                a.NI)(`Campaign instance is outdated. Campaign ${e.getId()}`)) : c && c.consentFor.includes(s.rv[n]) && (window.removeEventListener(`abtasty_${r.u.Name.consentValid}`, i),
                t())
            }
            ;
            return window.addEventListener(`abtasty_${r.u.Name.consentValid}`, i),
            !1
        }
        ;
        n(7405);
        var l = n(3340);
        const d = t => async e => {
            (0,
            a.fH)(`Starting ${e.length} campaigns: ${e}`);
            const o = e.map(i.Hu.instantiate);
            Promise.resolve().then(n.bind(n, 4349)).then((e => {
                e.addCheckTargetingListener(t)
            }
            ));
            const r = o.reduce(( (e, n) => {
                if (n.isContainer()) {
                    n.setStatus(l.B.notChecked);
                    const o = n.getChildren().map(i.Hu.instantiate).map((e => {
                        const n = () => e.apply(t);
                        return (0,
                        s.Vn)(e.getConsentType()) ? ((0,
                        a.fH)("----- child campaign::", e.getType()),
                        e.apply(t)) : c(n)(e, e.getConsentType(), l.B.consent)
                    }
                    ));
                    return [...e, ...o]
                }
                {
                    const o = () => n.apply(t);
                    return (0,
                    s.Vn)(n.getConsentType()) ? ((0,
                    a.fH)("campaign::", n),
                    [...e, n.apply(t)]) : [...e, c(o)(n, n.getConsentType(), l.B.consent)]
                }
            }
            ), []);
            return Promise.all(r).then((t => t.some((t => !!t))))
        }
          , u = t => {
            const e = i.Hu.getCampaignsDatas()
              , n = i.Hu.getActiveCampaigns();
            return Object.values(n).filter((n => {
                const o = n.testDatas.parentID > 0 ? e.find((t => {
                    let {id: e} = t;
                    return e === n.testDatas.parentID
                }
                ))?.priority || 0 : n.testDatas.priority;
                return 0 !== o && !t?.includes(o)
            }
            ))
        }
        ;
        function p(t, e) {
            const n = Object.keys(t);
            return Object.keys(e).sort(( (t, e) => Number(t) - Number(e))).reduce(( (t, i) => {
                if ("0" === i)
                    return t;
                const a = e[Number(i)].reduce(( (t, e) => {
                    const i = e.children;
                    if (i) {
                        const a = i.some((t => n.includes(t.toString()) && e.sub_type && [o.qA.multipagePersonalization, o.qA.multiexperiencePersonalization].includes(e.sub_type)));
                        return a ? [...t, e.id] : t
                    }
                    return t
                }
                ), []);
                return a.length && t.set(Number(i), a),
                t
            }
            ), new Map)
        }
        const m = async function(t, e) {
            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : new Map;
            const o = [];
            if (n.size)
                for (const [e,i] of n) {
                    if (await d(t)(i)) {
                        o.push(...i);
                        break
                    }
                }
            for (const [n,i] of Object.entries(e)) {
                const e = i.map((t => t.id));
                if ("0" === n)
                    await d(t)([...e]);
                else {
                    const n = await d(t)(e)
                      , i = e.length > 0 && n;
                    if (o.length && o.some((t => e.includes(t))))
                        break;
                    if (i)
                        break
                }
            }
        }
    }
    ,
    7765: (t, e, n) => {
        n.d(e, {
            oT: () => y,
            kQ: () => m,
            o9: () => f,
            oi: () => h,
            SL: () => p,
            sw: () => g
        });
        const o = function() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 2e3;
            const e = document.createElement("style");
            e.type = "text/css";
            const n = ".ABTastyHidden { display: none !important }";
            e.styleSheet ? e.styleSheet.cssText = n : e.appendChild(document.createTextNode(n)),
            document.getElementsByTagName("head")[0].appendChild(e),
            document.getElementsByTagName("html")[0].setAttribute("class", "ABTastyHidden"),
            setTimeout(( () => {
                const t = document.getElementsByTagName("html")[0];
                t.className = t.className.replace("ABTastyHidden", "")
            }
            ), t)
        };
        var i = n(3595)
          , a = n(5437)
          , r = n(1134)
          , s = n(1873)
          , c = n(7471)
          , l = n(648)
          , d = n(8009);
        n(6692);
        const u = {
            testID: null,
            variationID: null,
            previousLogicalView: null,
            visitorId: null
        }
          , p = () => {
            u.testID = null,
            u.variationID = null,
            u.previousLogicalView = null,
            u.visitorId = null,
            delete window.ABTasty.redirectedFrom,
            window.ABTasty.pendingRedirection = !1
        }
          , m = () => u
          , g = t => {
            const {testID: e} = m();
            return !(0,
            i.g)(e) && e === t
        }
          , f = () => {
            if (h())
                return !1;
            if (m().testID)
                return !0;
            const t = new c.n
              , e = ((0,
            a.Vf)(c.t.mrasn) || t.getMrasn()).split(".");
            if (e.length >= 2) {
                const n = e[2] && e[2].length > 0 ? e[2] : null;
                let o = null
                  , i = null;
                return i = e[3] ? Number(e[3]) : null,
                i && Date.now() - i >= 1e4 ? !1 : (function(t, e) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null
                      , o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                    u.testID = t,
                    u.variationID = e,
                    u.previousLogicalView = n,
                    u.visitorId = o
                }(Number(e[0]), Number(e[1]), n, o),
                window.ABTasty.redirectedFrom = {
                    ...m()
                },
                t.setMrasn(""),
                !0)
            }
            return !1
        }
          , h = () => !!window.ABTasty.pendingRedirection
          , y = async (t, e, n) => {
            const {ATInternetReferrer: u, transferParameters: p, isRegex: m, target: g, pattern: y} = t[0];
            if ((0,
            i.g)(g))
                return void (0,
                l.FF)(`Couldn't apply redirection of campaign ${e} and variation ${n}`);
            const b = new RegExp(c.t.mrasn);
            if (h() || f() || b.test(g))
                return;
            o(1e3),
            window.ABTasty.pendingRedirection = !0;
            let v = g;
            if (m && (v = ( (t, e) => {
                const n = new RegExp(e,"i")
                  , o = window.location.href.replace(n, t);
                return (0,
                a.Pk)(o)
            }
            )(g, y)),
            p && (v = (0,
            a.aQ)(v, window.location.href)),
            v = (0,
            a.y3)(v),
            v = await (async (t, e, n) => {
                const o = [e, n, (0,
                s.D0)() || ""];
                if ((0,
                d.Vn)("storage"),
                (0,
                r.yn)().accountSettings.hashMrasnAllowed) {
                    const e = o.filter((t => t.toString().length > 0)).join(".");
                    return (0,
                    a.Yj)("mrasn", e, t)
                }
                {
                    o.push(Date.now());
                    const t = new c.n;
                    t.setMrasn(o.join(".")),
                    t.save()
                }
                return t
            }
            )(v, e, n),
            u && document.referrer) {
                const t = new URL(document.referrer).hostname;
                v = (0,
                a.Yj)("xtref", t, v)
            }
            /MSIE/.test(navigator.userAgent) && (v = v.replace("&", "&#38")),
            window.location.replace(v),
            o(1)
        }
    }
    ,
    4349: (t, e, n) => {
        n.r(e),
        n.d(e, {
            addCheckTargetingListener: () => c,
            allowedStatus: () => r,
            checkTargetingEventName: () => s
        });
        var o = n(8843)
          , i = n(4804)
          , a = n(3340);
        const r = [a.B.checking, a.B.pending, a.B.qaMode, a.B.targetPages, a.B.trigger, a.B.segment, a.B.rejected, a.B.audience, a.B.targetByEventPending]
          , s = "abtasty_checkTargeting"
          , c = ( () => {
            let t = !1;
            return function(e) {
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1] && (t = !1),
                t || (t = !0,
                window.addEventListener(s, (t => {
                    if (!t.detail)
                        return;
                    const {campaignId: n, withUrl: a, shouldCheckAll: s} = t.detail;
                    n && (t => async function(e) {
                        let n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                          , a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                        const s = (0,
                        i.iE)(e);
                        s && r.includes(s.getStatus()) && (a && (s.data.audienceTrigger && (0,
                        o.resetTargetingSuccess)(s.data.audienceTrigger),
                        s.data.audienceSegment && (0,
                        o.resetTargetingSuccess)(s.data.audienceSegment)),
                        (n ? await (0,
                        o.checkTargeting)(t, s) : await (0,
                        o.checkScopesAndAudiences)(t, !0, s)) && await s.executeCampaign(t))
                    }
                    )(e)(n, a, s)
                }
                )))
            }
        }
        )()
    }
    ,
    8843: (t, e, n) => {
        n.r(e),
        n.d(e, {
            audienceUseTargetingType: () => J,
            checkAudiences: () => M,
            checkScopes: () => R,
            checkScopesAndAudiences: () => V,
            checkTargeting: () => j,
            containsOnlyOnceTargetings: () => F,
            handleTargetingFailure: () => K,
            handleTargetingSuccess: () => W,
            isOnceTargeting: () => $,
            pendingModeLoader: () => U,
            recheckTargetingByHit: () => c,
            registerPendingCriteria: () => G,
            resetTargetingSuccess: () => Y,
            storeTargetingSuccess: () => Q,
            waitDatalayerDetection: () => rt,
            waitForTargetingAvailability: () => at
        });
        var o = n(8399)
          , i = n(3595)
          , a = n(4349)
          , r = n(4804);
        const s = (t, e, n) => n.filter((t => {
            let {targetingMode: e} = t;
            return "noajax" === e
        }
        )).filter((n => {
            let {id: o, audienceTrigger: s, audienceSegment: c} = n;
            const l = (0,
            r.iE)(o);
            return !(!l || !a.allowedStatus.includes(l.getStatus())) && ("segment" === e && !(0,
            i.g)(c) && Array.isArray(c) ? J(c, t) : !("trigger" !== e || (0,
            i.g)(s) || !Array.isArray(s)) && J(s, t))
        }
        )).map((t => {
            let {id: e} = t;
            return e
        }
        ))
          , c = (t, e) => {
            const n = r.Hu.getCampaignsDatas()
              , i = [];
            switch (t.toUpperCase()) {
            case "EVENT":
                const {ec: t} = e;
                "eco" === t ? i.push(...s(o.ECOMMERCE_VARIABLE, "trigger", n)) : "Action Tracking" === t && i.push(...s(o.ACTION_TRACKING, "segment", n));
                break;
            case "CAMPAIGN":
                i.push(...s(o.CAMPAIGN_EXPOSITION, "segment", n));
                break;
            case "TRANSACTION":
            case "ITEM":
                i.push(...s(o.LAST_PURCHASE, "segment", n)),
                i.push(...s(o.PURCHASE_FREQUENCY, "segment", n));
                break;
            case "SEGMENT":
                i.push(...s(o.CUSTOM_VARIABLE, "segment", n)),
                i.push(...s(o.INTEGRATIONS_PROVIDER, "segment", n))
            }
            i.forEach((t => {
                const e = new CustomEvent(a.checkTargetingEventName,{
                    detail: {
                        campaignId: t,
                        shouldCheckAll: !0,
                        withUrl: !0
                    }
                });
                window.dispatchEvent(e)
            }
            ))
        }
        ;
        var l = n(648)
          , d = n(1134)
          , u = n(7405)
          , p = n(3248)
          , m = (n(81),
        n(9518));
        var g = n(6729)
          , f = n(9700);
        async function h(t) {
            let {value: e, include: o} = t
              , i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
              , a = arguments.length > 2 ? arguments[2] : void 0;
            const r = (0,
            g.W)();
            let s = (0,
            f.a2)(e)
              , c = document;
            const l = e.includes("[]");
            if (l) {
                const t = e.split("[]").map((t => t.trim()))
                  , [n,o,i] = t
                  , a = (0,
                f.a2)(n)
                  , r = document.querySelector(a)?.[o];
                r && (c = r,
                s = (0,
                f.a2)(i))
            }
            return r.then((async t => void 0 === t || l ? Promise.resolve(Boolean(c.querySelector(s))) : (await t(e).promise()).length > 0)).then((async t => {
                const r = o ? t : !t;
                return i && a && !r && Promise.all([Promise.resolve().then(n.bind(n, 4349)), Promise.resolve().then(n.bind(n, 8318))]).then((t => {
                    let[n,i] = t;
                    i.addObservance(c, e, o, ( () => {
                        const t = {
                            campaignId: a
                        }
                          , e = new CustomEvent(n.checkTargetingEventName,{
                            detail: t
                        });
                        window.dispatchEvent(e)
                    }
                    ))
                }
                )),
                r
            }
            ))
        }
        async function y(t, e, n) {
            try {
                const o = await async function(t, e, n) {
                    return Promise.all(t.reduce(( (t, o) => {
                        let {value: i, include: a} = o;
                        if (i.includes("[]")) {
                            const o = i.split("[]").map((t => t.trim()))
                              , [r] = o;
                            t.push(h({
                                value: r,
                                include: a
                            }, e, n))
                        }
                        return t.push(h({
                            value: i,
                            include: a
                        }, e, n)),
                        t
                    }
                    ), []))
                }(t, n, e);
                return o.some((t => t))
            } catch (e) {
                const n = "Scope error (selector)";
                return l.vV(n, t),
                !1
            }
        }
        var b = n(8987);
        function v(t) {
            let {name: e, value: n, include: o} = t;
            const i = b.A.get(e);
            let a = !1;
            return (i || "" === i) && (a = !0,
            null != n && (a = null !== i.match(new RegExp(n,"i")))),
            o ? a : !a
        }
        const w = (0,
        n(721).c)(( (t, e) => {
            const n = {};
            return e.forEach((e => {
                const o = t(e);
                n[o] = n[o] || [],
                n[o].push(e)
            }
            )),
            n
        }
        ));
        var T = n(1666);
        const x = t => e => {
            let {range: n, from: o, to: i} = e;
            return n ? t >= Number(o) && t <= Number(i) : t === Number(o)
        }
        ;
        var k = n(5960)
          , O = n(4721)
          , S = n(5437);
        const _ = "abtasty_qa_assistant_campaign_id";
        function H(t, e) {
            try {
                return ( (t, e) => !!t && (0,
                S.Dj)(_) && Number((0,
                S.Vf)(_)) === e)(t, e)
            } catch (e) {
                const n = "Scope error (QA URL PARAMETER ENABLED)";
                return l.vV(n, t),
                !1
            }
        }
        const A = t => t
          , E = {
            url_scope: {
                method: t => Promise.resolve((0,
                p.E)(t)),
                group: O.vw
            },
            favorite_url_scope: {
                method: t => Promise.resolve((0,
                k.C)(t)),
                group: O.vw
            },
            code_scope: {
                method: async function(t, e) {
                    const n = e => function(t, e) {
                        l.vV("Scope error (code)", e)
                    }(0, t);
                    return Promise.all(t.map((t => {
                        let {id: o, value: i, isAsync: a} = t;
                        return (0,
                        m.j)(e, n, undefined, a ? (0,
                        r.iE)(e) : void 0)({
                            id: o,
                            value: i,
                            isAsync: a
                        })
                    }
                    ))).then((t => t.every((t => !!t))))
                },
                group: O.vw
            },
            selector_scope: {
                method: (t, e, n) => Promise.resolve(y(t, e, n)),
                group: O.vw
            },
            cookie_scope: {
                method: t => Promise.resolve(function(t) {
                    try {
                        return t.some(v)
                    } catch (e) {
                        const n = "Scope error (cookie)";
                        return l.vV(n, t),
                        !1
                    }
                }(t)),
                group: O.l$
            },
            ip_scope: {
                method: t => Promise.resolve(function(t) {
                    try {
                        const {exclusions: e, inclusions: n} = w((t => {
                            let {include: e} = t;
                            return e ? "inclusions" : "exclusions"
                        }
                        ), t)
                          , o = (0,
                        f.qF)((0,
                        T.Tt)());
                        return !(e && e.some(x(o)) || (!n || !n.some(x(o))) && n)
                    } catch (e) {
                        const n = "Scope error (IP)";
                        return l.vV(n, t),
                        !1
                    }
                }(t)),
                group: O.l$
            },
            qa_url_parameter_enabled: {
                method: (t, e) => Promise.resolve(H(t, e)),
                group: O.l$
            }
        };
        async function C(t, e, n) {
            const {id: o, mutationObserverEnabled: i} = n
              , a = E[e].method
              , s = E[e].group
              , c = await a(t, o, i);
            return l.fH("Applying scope", e, " for ", n, "result = ", c),
            r.Hu.updatePublicTargetingData(o, {
                conditions: t,
                targeting_type: e
            }, c, s),
            c
        }
        async function I() {
            let {codeScope: t, selectorScope: e} = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
              , n = arguments.length > 1 ? arguments[1] : void 0;
            const o = [!t?.length || C(t, "code_scope", n).catch((t => t)), !e?.length || C(e, "selector_scope", n).catch((t => t))];
            return Promise.all(o).then((t => t.every(A)))
        }
        async function L() {
            let {cookieScope: t, ipScope: e, qaUrlParameterEnabled: n} = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
              , o = arguments.length > 1 ? arguments[1] : void 0;
            const i = [!t?.length || C(t, "cookie_scope", o).catch((t => t)), !e?.length || C(e, "ip_scope", o).catch((t => t)), !n || C(n, "qa_url_parameter_enabled", o).catch((t => t))];
            return Promise.all(i).then((t => t.every(A)))
        }
        var D = n(7386)
          , N = n(977)
          , P = n(3340);
        const B = t => (e, n) => {
            let {oneVisitorOneTest: o} = n;
            const {id: i, status: a, type: r} = e.data;
            return a && a === P.B.accepted ? ((0,
            l.fH)(`campaign:: Campaign ${i} has already been accepted`),
            !1) : a && a === P.B.checking ? ((0,
            l.fH)(`campaign:: Campaign ${i} is already in checking state`),
            !1) : r === N.cz.subsegment && e.hasBrotherAlreadyStarted() ? (e.setStatus(P.B.otherSubsegment),
            !1) : !e.isOneVisitorOneTestDone(t) || (e.setStatus(P.B.oneVisitorOneTest),
            !1)
        }
          , R = t => {
            const {scopes: e} = t.data;
            return Promise.all([I(e, t.data), L(e, t.data)])
        }
          , M = (t, e) => {
            const {audienceTrigger: n, audienceSegment: o, segmentMode: i, triggerMode: a} = e.data;
            return Promise.all([(0,
            u.PA)(t)(e.data, a, n).catch((t => t)), (0,
            u.PA)(t)(e.data, i, o).catch((t => t))])
        }
          , V = async function(t) {
            let e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
              , n = arguments.length > 2 ? arguments[2] : void 0;
            const {oneVisitorOneTest: o} = (0,
            d.F5)();
            if (e && !B(t)(n, {
                oneVisitorOneTest: o
            }))
                return !1;
            n.setStatus(P.B.checking);
            const i = await R(n);
            if (i.every((t => t))) {
                const e = await M(t, n);
                return e.every((t => t)) ? W(n) : K(e, [P.B.trigger, P.B.segment], t, n)
            }
            return K(i, [P.B.targetPages, P.B.qaMode], t, n)
        }
          , j = async (t, e) => {
            const {oneVisitorOneTest: n, hashMrasnAllowed: o} = (0,
            d.F5)()
              , {id: a, audienceTrigger: s, scopes: c, targetingMode: u} = e.data;
            if (!(t => (e, n) => {
                let {oneVisitorOneTest: o, hashMrasnAllowed: i} = n;
                return e.isTargetByEvent() ? (e.setStatus(P.B.targetByEventPending),
                !1) : B(t)(e, {
                    oneVisitorOneTest: o
                })
            }
            )(t)(e, {
                oneVisitorOneTest: n,
                hashMrasnAllowed: o
            }))
                return !1;
            if (e.setStatus(P.B.checking),
            u === N.Vp.waitUntil)
                return (0,
                l.FF)(`Target rejected (campaign ${a}) because "waituntil" (ajax) mode is deprecated.`),
                e.setStatus(P.B.rejected),
                !1;
            if (await rt(s),
            await at(a),
            e.isDynamicAllocation())
                try {
                    await (0,
                    D.zj)()
                } catch (t) {
                    (0,
                    l.FF)(`Allocation fetch failed (campaign ${a} will not be able to run corectly)`)
                }
            if (e.isPersonalisationChild() && e.data.siblings && e.data.siblings.length > 0) {
                e.setStatus(P.B.waitingForSubsegmentCheck);
                const t = [e.data.id, ...e.data.siblings].sort()
                  , n = await (async (t, e) => {
                    const n = e.map((e => {
                        const n = (0,
                        r.iE)(e);
                        return t.data.priority > 1 && n.data.priority < t.data.priority || n.data.id < t.data.id ? n : null
                    }
                    )).filter((t => !!t));
                    return Promise.all(n.map((t => [P.B.checking, P.B.waitingForSubsegmentCheck].includes(t.getStatus()) ? t.hasBeenChecked() : Promise.resolve(t.getStatus()))))
                }
                )(e, t).then((t => t.includes(P.B.accepted)));
                if (n)
                    return e.setStatus(P.B.otherSubsegment),
                    !1
            }
            const p = void 0 !== c && await async function(t, e) {
                let {urlScope: n, favoriteUrlScope: o, favoriteUrlScopeConditions: a} = t;
                const r = o?.length;
                if (r) {
                    const t = (0,
                    i.g)(n) ? o : [...n, ...o];
                    return await C({
                        urlScopes: t,
                        favoriteUrlScopeConditions: a
                    }, "favorite_url_scope", e)
                }
                {
                    const t = await C(n, "url_scope", e);
                    return !n?.length || t
                }
            }(c, e.data);
            return p ? V(t, !1, e) : ((0,
            l.fH)("Targeting rejected."),
            e.setStatus(P.B.targetPages),
            !1)
        }
        ;
        var q = n(6158);
        const $ = t => {
            const e = [...q.H7, ...q.uK, ...q.Xl];
            return !(0,
            i.g)(t) && e.includes(t)
        }
          , F = (t, e) => t.filter((t => t?.targeting_groups?.length)).map((t => {
            let {targeting_groups: e} = t;
            return e.map((t => {
                let {targetings: e} = t;
                return e.map((t => {
                    let {targeting_type: e} = t;
                    return e
                }
                ))
            }
            )).reduce(( (t, e) => t.concat(e)), [])
        }
        )).reduce(( (t, e) => t.concat(e)), []).every((t => !(0,
        i.g)(t) && $(t))) && ["codeScope", "selectorScope", "cookieScope"].every((t => {
            const n = e[t];
            return "boolean" == typeof n ? !n : !n?.length
        }
        ))
          , G = ( () => {
            const t = {};
            return function(e, n) {
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2] && Object.keys(t).forEach((e => delete t[e])),
                (0,
                i.g)(e) || (0,
                i.g)(n) || (t[`${e}`] ? t[`${e}`].push(n) : (t[`${e}`] = [n],
                (e => {
                    setTimeout(( () => {
                        const n = t[e];
                        delete t[e],
                        n && n.forEach((t => t()))
                    }
                    ), e)
                }
                )(e)))
            }
        }
        )()
          , U = () => Promise.resolve({});
        var z = n(7550);
        const W = async t => {
            const {id: e, targetingMode: n} = t.data;
            return t.getAbortSignal().aborted ? ((0,
            l.NI)(`Campaign instance is outdated. Campaign ${e}`),
            !1) : ((0,
            l.SW)(`Targeting OK (campaign ${e})`),
            !0)
        }
          , K = async (t, e, n, o) => {
            if (o.getAbortSignal().aborted)
                return (0,
                l.NI)(`Campaign instance is outdated. Campaign ${o.getId()}`),
                !1;
            const {targetingMode: i, audienceTrigger: a, audienceSegment: r, scopes: s} = o.data
              , c = [a, r].flat().filter((t => void 0 !== t));
            if ((i === N.Vp.fastest || [N.Vp.noAjax].includes(i)) && !(0,
            z.Q)())
                return (0,
                l.NI)("Targeting waiting for DOM Ready."),
                o.setStatus(P.B.pending),
                (0,
                z.Q)((async () => {
                    await V(n, !0, o) && await o.executeCampaign(n)
                }
                )),
                !1;
            const d = () => ((0,
            l.fH)("Targeting rejected."),
            t.some(( (t, n) => (t || o.setStatus(e[n]),
            !t))),
            !1);
            return (0,
            z.Q)() ? d() : await async function() {
                let t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                return await U().then((e => {
                    if ("startPendingMode"in e && "isPendingModeOver"in e) {
                        const {startPendingMode: i, isPendingModeOver: a} = e;
                        if (!t || !F(c, s) && !a())
                            return (0,
                            l.NI)("Targeting loop."),
                            o.setStatus(P.B.pending),
                            i(o, (async () => !!await V(n, !0, o) && (await o.executeCampaign(n),
                            !0))),
                            !1
                    }
                    return d()
                }
                ))
            }(!1)
        }
          , Y = t => {
            t.forEach((t => {
                t.targeting_groups.forEach((t => {
                    t.targetings.forEach((t => {
                        delete t.success
                    }
                    ))
                }
                ))
            }
            ))
        }
          , Q = (t, e) => {
            t.success = e
        }
          , J = (t, e) => {
            const n = t?.map((t => t.targeting_groups)).flat();
            return n && n.some((t => t.targetings && t.targetings.some((t => t.targeting_type === e))))
        }
        ;
        var Z = n(9294)
          , X = n(88);
        const tt = "DCInfos"
          , et = {
            dcInfosWait: {
                promise: null,
                resolve: null,
                reject: null
            },
            dcInfosData: null
        };
        function nt() {
            return et.dcInfosWait.promise
        }
        function ot() {
            try {
                const t = sessionStorage.getItem(tt);
                return !(0,
                i.g)(t) && t.length > 0 ? JSON.parse(t) : window.ABTasty.DCInfos
            } catch (t) {
                return l.vV("Error parsing dcinfos", t),
                null
            }
        }
        !function() {
            const t = et.dcInfosWait;
            t.promise = new Promise(( (e, n) => {
                t.resolve = e,
                t.reject = n
            }
            ))
        }();
        var it = n(3002);
        const at = async t => {
            const e = `fetch failed (campaign ${t} will not be able to be checked)`
              , n = async (t, n, o) => {
                if (t())
                    try {
                        return await n(),
                        !0
                    } catch (t) {
                        return (0,
                        l.FF)(`${o} ${e}`),
                        !1
                    }
                return Promise.resolve(!1)
            }
              , o = [n(( () => (0,
            u.mn)(t) && (0,
            i.g)(ot())), nt, "DCInfos"), n(( () => (0,
            u.BA)(t)), T.uA, "IP"), n(( () => (0,
            u.Xp)(t)), T.q0, "Geolocation"), n(( () => (0,
            u.z)(t)), (async () => await (0,
            it.a)(!0)), "Parsed UserAgent")];
            (0,
            u.li)(t) && o.push((0,
            Z.sb)()),
            await Promise.all(o)
        }
          , rt = async t => {
            if ("boolean" != typeof window.ABTasty.datalayerEnabled && t && J(t, o.DATALAYER))
                return await (0,
                X.fm)(( () => "boolean" == typeof window.ABTasty.datalayerEnabled))
        }
    }
    ,
    5066: (t, e, n) => {
        n.d(e, {
            h: () => y
        });
        var o = n(977)
          , i = n(3595)
          , a = n(648)
          , r = n(4804)
          , s = n(721)
          , c = n(9076)
          , l = n(20);
        function d(t) {
            return t.reduce(( (t, e) => {
                const n = t[t.length - 1] || 0;
                return [...t, n + e]
            }
            ), [])
        }
        const u = (0,
        s.c)(( (t, e, n, o) => {
            let {isDynamic: i=!1, testedTraffic: r, modulation: s} = n;
            const c = o[o.length - 1];
            let d = Math.max(...t);
            if (i) {
                const t = (0,
                l.A5)(e, r, s);
                t && (d = t.traffic)
            }
            c + d > 100 && (i && (0,
            a.vV)(`[addOriginalVariationSlots] The sum of dc infos traffics got greater than 100! We've ignored it but it's weird. Last slot: ${c}. OriginalVariationTraffic: ${d}`),
            d = 100 - c);
            const u = c + d;
            return [...o, u]
        }
        ));
        function p(t, e, n) {
            let o = [];
            const i = function(t, e, n) {
                let {isDynamic: o=!1, testedTraffic: i, modulation: a} = n;
                const r = Object.keys(t);
                let s = t;
                if (o) {
                    const t = (0,
                    l.h3)(e, i, a);
                    t.length && (s = {},
                    t.forEach((t => {
                        let {id: e, traffic: n} = t;
                        s[e] = {
                            traffic: n
                        }
                    }
                    )))
                }
                return r.reduce(( (t, e) => [...t, s[e].traffic]), [])
            }(t, e, n);
            return o = (0,
            c.F)(d, u(i, e, n))(i),
            o
        }
        function m(t, e, n, i, r) {
            let s = [];
            try {
                s = p(e, n, i)
            } catch (t) {
                return (0,
                a.vV)("Error on function allocateTraffic.", t),
                -1
            }
            return function(t, e, n, i) {
                const a = n.findIndex((e => e >= t));
                return -1 === a ? o.cz.subsegment === i ? 0 : -1 : a === n.length - 1 ? 0 : parseInt(e[a], 10)
            }(t, Object.keys(e), s, r)
        }
        var g = n(7765)
          , f = n(7725)
          , h = n(6259);
        const y = async (t, e, n, s, c, d) => {
            const u = (0,
            f.vm)()
              , p = t.getId()
              , y = (0,
            h.d)(p)
              , b = !(0,
            i.g)(y)
              , v = !t.isUsingHashAllocation()
              , w = async () => {
                if (v)
                    return Math.floor(100 * Math.random() + 1);
                try {
                    const n = ( (t, e) => {
                        const n = new TextEncoder;
                        return [o.qA.multipageTest, o.qA.multipagePersonalization].includes(t.getSubType()) ? n.encode(`${t.data.parentID}.${e}`) : n.encode(`${t.data.id}.${e}`)
                    }
                    )(t, e);
                    return new Uint16Array(await crypto.subtle.digest("SHA-1", n))[0] % 100 + 1
                } catch (t) {
                    return (0,
                    a.FF)("Check that your website is in https otherwise cookieless allocation won't work"),
                    Math.floor(100 * Math.random() + 1)
                }
            }
            ;
            if (u && b)
                return y;
            if (v || !t.isDynamicAllocation() || (0,
            i.g)((0,
            l.ho)(p))) {
                if (v && s)
                    return s.variationID;
                if (!v && b)
                    return y;
                if (v && [o.qA.multipageTest, o.qA.multipagePersonalization].includes(t.getSubType()) && t.hasAlreadySeenBrothers(n)) {
                    const e = t.getSeenBrothers(n)[0];
                    let o = null;
                    if (e.variationID === r.me.Untracked)
                        return e.variationID;
                    {
                        const n = (0,
                        r.iE)(e.campaignId).getVariation(e.variationID);
                        return o = n ? n.masterVariationId : 0,
                        (0,
                        i.g)(o) || 0 === o ? r.me.Original : t.getVariationInfoByMasterId(o).id
                    }
                }
                if (v && t.isMultipageChild() && t.hasSeenMaster(n)) {
                    const e = n.getCampaign(c);
                    return n.removeCampaign(c),
                    e.variationID === r.me.Untracked ? e.variationID : e.variationID !== r.me.Original ? t.getVariationInfoByMasterId(e.variationID).id : r.me.Original
                }
                return d && !(0,
                i.g)((0,
                g.kQ)().variationID) ? (0,
                g.kQ)().variationID : t.isAsync() ? m(await w(), t.data.asyncVariationInfoById, p, t.getDynamicAllocationProperties(), t.getType()) : m(await w(), t.data.variations, p, t.getDynamicAllocationProperties(), t.getType())
            }
            return (0,
            l.ho)(p)
        }
    }
    ,
    20: (t, e, n) => {
        n.d(e, {
            A5: () => s,
            h3: () => r,
            ho: () => l,
            ws: () => d
        });
        var o = n(7386)
          , i = n(2484);
        function a(t, e, n) {
            const i = ((0,
            o.E)() || {})[`${t}`] || []
              , a = i.length;
            return i.map((t => {
                const o = function(t, e, n) {
                    const o = e || 50;
                    return t * (o / 100) + (100 - o) / n
                }(t.traffic, n, a)
                  , i = function(t, e) {
                    return t * ((e || 100) / 100)
                }(o, e);
                return {
                    ...t,
                    traffic: i
                }
            }
            ))
        }
        function r(t, e, n) {
            return a(t, e, n).filter((t => {
                let {id: e} = t;
                return e !== o.Cy
            }
            ))
        }
        function s(t, e, n) {
            return a(t, e, n).find((t => {
                let {id: e} = t;
                return e === o.Cy
            }
            ))
        }
        const c = "ABTastyPreviousDynamicAllocation"
          , l = t => JSON.parse(i.Ks.getItem(i.Sd, c) || "{}")[t] || null
          , d = (t, e) => {
            const n = {
                ...JSON.parse(i.Ks.getItem(i.Sd, c) || "{}"),
                [t]: e
            };
            i.Ks.setItem(i.Sd, c, JSON.stringify(n))
        }
    }
    ,
    3340: (t, e, n) => {
        n.d(e, {
            B: () => o
        });
        let o = function(t) {
            return t.accepted = "accepted",
            t.pending = "pending",
            t.rejected = "rejected",
            t.oneVisitorOneTest = "one_visitor_one_test",
            t.traffic = "traffic_rejected",
            t.timeout = "timeout",
            t.checking = "currently_checking",
            t.otherSubsegment = "another_subsegment_already_started",
            t.targetByEventPending = "target_by_event_pending",
            t.acceptedByRedirection = "accepted_by_redirection",
            t.targetPages = "target_pages_rejected",
            t.qaMode = "qa_parameters_rejected",
            t.audience = "audience_rejected",
            t.trigger = "trigger_rejected",
            t.segment = "segment_rejected",
            t.notChecked = "master_campaign_not_checked",
            t.waitingForSubsegmentCheck = "other_subsegment_is_checking",
            t.consent = "campaign_type_rejected_by_consent",
            t.failedLoading = "deferred_loading_failed",
            t.notPrioritizedYet = "not_prioritized_yet",
            t.geoipConsent = "geolocation_rejected_by_consent",
            t.waitingCodeResolution = "waiting_code_resolution",
            t.displayFrequency = "display_frequency_rejected",
            t.redirectDisallowed = "redirect_disallowed",
            t
        }({})
    }
    ,
    6259: (t, e, n) => {
        n.d(e, {
            L: () => s,
            d: () => c
        });
        var o = n(3595)
          , i = n(2484);
        const a = "ABTastyForcedVariations";
        function r() {
            return JSON.parse(i.Ks.getItem(i.b1, a) || "{}")
        }
        const s = (t, e) => function(t, e) {
            const n = r();
            (0,
            o.g)(e) ? delete n[t] : n[t] = e,
            i.Ks.setItem(i.b1, a, JSON.stringify(n))
        }(t, e);
        function c(t) {
            return r()[t] ?? null
        }
    }
    ,
    9530: (t, e, n) => {
        n.r(e),
        n.d(e, {
            applyWidgets: () => s
        });
        var o = n(1134)
          , i = n(648)
          , a = n(3346)
          , r = (n(6361),
        n(6804),
        n(1387));
        n(3306);
        const s = async (t, e, n) => {
            (0,
            i.fH)("applying widgets");
            const s = (0,
            o.yn)().widgets
              , c = async t => {
                let {id: o, version: i, name: c, config: l} = t;
                if ((t => !!window.ABTasty.appliedPlugins && window.ABTasty.appliedPlugins.includes(t))(o))
                    return Promise.resolve();
                {
                    const t = s[c];
                    if (null == t || null == t[i])
                        return Promise.resolve();
                    const d = t[i]
                      , u = "url"in d ? await (0,
                    a.J)(d.url).then((t => t.text())) : d.code
                      , p = `!function($, jQuery, HELPERS){ try{const TEST_ID=${e},PACKAGE='${c}',VERSION = '${i}',DATA=${l},PLUGIN_ID = '${o}',VARIATION_ID = '${n}';\n        ${u}\n      }catch(e){console.log("AB Tasty: error while executing widget for test "+${e},'${c}','${i}',e)}}($, jQuery, HELPERS);`;
                    await (0,
                    r.K6)(p, e, n, void 0, void 0, !0)
                }
                (t => {
                    window.ABTasty.appliedPlugins || (window.ABTasty.appliedPlugins = []),
                    window.ABTasty.appliedPlugins.push(t)
                }
                )(o)
            }
            ;
            return Promise.all(t.map((t => c(t))))
        }
    }
    ,
    3663: (t, e, n) => {
        n.d(e, {
            M: () => a,
            a: () => c
        });
        var o = n(648)
          , i = n(7426);
        const a = "c:abtasty2-izjJRMEi"
          , r = ["cookies", "improve_products", "measure_content_performance"];
        function s() {
            return "object" == typeof window.Didomi && "function" == typeof window.Didomi.getUserStatus && window.Didomi.getUserStatus() || void 0
        }
        function c(t, e, n) {
            o.NI("Consent compliance check: Waiting for Didomi loaded and start.");
            const c = setTimeout(( () => n()), 5e3);
            (0,
            i.Dk)("didomiTimeout", c);
            const l = () => {
                o.fH("Consent compliance check: Start Didomi consent check."),
                clearTimeout(c);
                const i = t || a;
                !(!window.Didomi.getUserConsentStatusForVendor(i) || !t && !r.every((t => !!window.Didomi.getUserConsentStatusForPurpose(t)))) ? e() : n()
            }
            ;
            s() ? l() : (window.didomiOnReady = window.didomiOnReady || [],
            window.didomiOnReady.push(( () => {
                s() && l()
            }
            ))),
            window.didomiEventListeners = window.didomiEventListeners || [],
            window.didomiEventListeners.push({
                event: "consent.changed",
                listener: l
            })
        }
    }
    ,
    8009: (t, e, n) => {
        n.d(e, {
            NO: () => S,
            rv: () => O,
            Vn: () => _,
            ac: () => x,
            T$: () => H
        });
        var o = n(108)
          , i = n(9578)
          , a = n(648)
          , r = n(6381)
          , s = n(1134)
          , c = n(6692)
          , l = n(2484);
        var d = n(8987)
          , u = n(7862)
          , p = n(5415);
        var m = n(3663);
        n(81);
        function g(t, e, n) {
            return a.fH("Consent compliance check: Executing custom code."),
            new Promise(( (e, n) => {
                try {
                    new Function("abResolve",t.value)(e)
                } catch (t) {
                    n(t)
                }
            }
            )).then((t => {
                t ? e() : (a.FF("Consent compliance check: custom code return false"),
                n())
            }
            )).catch((t => {
                a.vV("Consent compliance check: could not execute custom code", t),
                n()
            }
            ))
        }
        function f(t, e, n) {
            return new Promise((async (o, i) => {
                a.fH("Consent compliance check: Executing custom code.");
                const r = () => e()
                  , s = async () => new Function(t.value)();
                try {
                    if (await s())
                        r(),
                        o();
                    else {
                        const t = setInterval((async () => {
                            a.NI("Consent compliance check (loop): Executing custom code."),
                            await s() && (clearInterval(t),
                            r(),
                            o())
                        }
                        ), 500);
                        (0,
                        u.X)("consentCustomJs", t),
                        n()
                    }
                } catch (t) {
                    a.vV("Consent compliance check: could not execute custom code", t),
                    n(),
                    i()
                }
            }
            ))
        }
        const h = "abtasty_grantConsent"
          , y = "abtasty_revokeConsent";
        var b = n(7643)
          , v = n(1492)
          , w = n(2352)
          , T = n(9404);
        const x = 200;
        let k, O = function(t) {
            return t.start = "start",
            t.test = "test",
            t.perso = "perso",
            t.aa = "aa",
            t.patch = "patch",
            t.redirection = "redirection",
            t.storage = "storage",
            t.collect = "collect",
            t.dmp = "dmp",
            t.geoloc = "geoloc",
            t
        }({});
        class S extends w.X {
            constructor() {
                if (super(),
                k)
                    return k;
                const {waitForConsent: {mode: t, campaignRestrictions: e, data: n}} = (0,
                s.F5)();
                this.mode = t,
                this.data = n,
                this.isStrict = !!Object.keys(e).length && !Object.values(e).filter((t => !t)).length,
                this.campaignRestrictions = e,
                this.consentAtInit = c.bo.exists(),
                this.isListen = !1,
                this.isValid = !1,
                this.setConsentReady(!1),
                this.consentFor = Object.keys(e).filter((t => !e[t])).map((t => t)),
                this.isStrict || this.consentFor.push(O.start),
                k = this,
                this.shouldListen() ? (l.Ks.setState("inmemory", !this.consentAtInit),
                this.listen()) : this.valid()
            }
            static resetInstance() {
                k = null
            }
            haveConsent() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Object.values(O)).every((t => this.consentFor.includes(t)))
            }
            sendConsentHit(t) {
                (async () => {
                    const e = {
                        co: t
                    };
                    (new b.n).setInternalHit(v.YQ.consent, e)
                }
                )()
            }
            emitConsentValidEvent() {
                const t = new CustomEvent("consentValid");
                document.dispatchEvent(t),
                (new r.k).dispatchCustomEvent(i.u.Name.consentValid, {
                    mode: (0,
                    s.F5)().waitForConsent.mode,
                    consentFor: this.consentFor
                })
            }
            valid() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Object.values(O);
                if (this.isValid = !0,
                this.setConsentReady(!0),
                this.notify("general.consent"),
                this.consentFor = [...this.consentFor, ...t],
                (0,
                a.fH)("Consent compliance check: Consent has been granted."),
                this.haveConsent([O.storage])) {
                    if (c.bo.cookieReady && c.bo.getInstance()) {
                        const t = c.bo.getInstance()
                          , e = t.sessionCookie;
                        t.save(),
                        e.save()
                    }
                    l.Ks.migrate()
                }
                !this.consentAtInit && this.isListen && this.sendConsentHit(!0),
                this.emitConsentValidEvent(),
                this.consentAtInit = c.bo.exists(),
                this.isListen = !1
            }
            revoke() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Object.values(O);
                this.isValid = !1,
                this.shouldRevoke() && (this.consentFor = this.consentFor.filter((e => e === O.start && !this.isStrict || (Object.keys(this.campaignRestrictions).includes(e) ? !this.campaignRestrictions[e] : !t.includes(e)))),
                this.consentFor.length === Object.values(O).length && (this.isValid = !0),
                (0,
                a.fH)("Consent compliance check: Consent has been revoked."),
                this.haveConsent([O.storage]) || (l.Ks.migrate(),
                c.bo.cookieReady && c.bo.getInstance() ? c.bo.getInstance().clearAll() : (0,
                T.pK)(c.H_, ( () => c.bo.getInstance().clearAll())),
                this.setConsentReady(!1),
                this.notify("general.consent")),
                this.sendConsentHit(!1))
            }
            shouldRevoke() {
                return !this.isValid && c.bo.exists()
            }
            shouldListen() {
                return this.mode === o.Ey.userAction && !c.bo.exists() || ![o.Ey.thirdParty, o.Ey.disabled, o.Ey.userAction].includes(this.mode)
            }
            listen() {
                if (!this.isListen)
                    switch (this.isListen = !0,
                    this.mode) {
                    case o.Ey.userAction:
                        !function(t) {
                            a.NI("Consent compliance check: Waiting for a visitor's action.");
                            const e = () => {
                                document.removeEventListener("mousedown", e, !0),
                                document.removeEventListener("touchmove", e, !0),
                                window.removeEventListener("scroll", e, !0),
                                t()
                            }
                            ;
                            document.addEventListener("mousedown", e, !0),
                            document.addEventListener("touchmove", e, !0),
                            window.addEventListener("scroll", e, !0)
                        }((t => this.valid(t)));
                        break;
                    case o.Ey.anyCookie:
                        !function(t) {
                            a.NI("Consent compliance check: Waiting for any cookie deposit on the website.");
                            const e = () => t()
                              , n = () => document.cookie.length > 0;
                            if (n())
                                e();
                            else {
                                const t = setInterval(( () => {
                                    n() && (clearInterval(t),
                                    e())
                                }
                                ), x);
                                (0,
                                u.X)("consentAnyCookie", t)
                            }
                        }((t => this.valid(t)));
                        break;
                    case o.Ey.specificCookie:
                        !function(t, e, n) {
                            a.NI(`Consent compliance check: Waiting for "${t.name}" cookie deposit on the website.`);
                            const o = () => e()
                              , i = () => {
                                const {condition: e, value: n, name: o} = t
                                  , i = d.A.get(o);
                                if (!i)
                                    return !1;
                                switch (Number(e)) {
                                case p.Wm:
                                    return new RegExp(n).test(i);
                                case p.sz:
                                    return i.indexOf(n) > -1;
                                case p.UT:
                                default:
                                    return i === n
                                }
                            }
                            ;
                            if (i())
                                o();
                            else {
                                const t = setInterval(( () => {
                                    i() && (clearInterval(t),
                                    o())
                                }
                                ), x);
                                (0,
                                u.X)("consentSpecificCookie", t),
                                n()
                            }
                        }(this.data, (t => this.valid(t)), (t => this.revoke(t)));
                        break;
                    case o.Ey.didomi:
                        (0,
                        m.a)(this.data, (t => this.valid(t)), (t => this.revoke(t)));
                        break;
                    case o.Ey.customJs:
                        (this.data.isAsync ? g : f)(this.data, (t => this.valid(t)), (t => this.revoke(t)));
                        break;
                    case o.Ey.customEvent:
                        ( (t, e) => {
                            a.NI("Consent compliance check: Waiting for custom event.");
                            const n = () => (a.NI("Consent compliance check: Custom event triggered. Consent granted"),
                            t())
                              , o = () => (a.NI("Consent compliance check: Custom event triggered. Consent revoked"),
                            e());
                            !0 === window.abtastyGrantConsent && (a.NI("Consent compliance check: window.abtastyGrantConsent is truthy. Consent granted"),
                            n()),
                            window.addEventListener(h, n),
                            window.addEventListener(y, o)
                        }
                        )((t => this.valid(t)), (t => this.revoke(t)));
                        break;
                    default:
                        this.valid()
                    }
            }
            getConsentReady() {
                return this.consentReady
            }
            setConsentReady(t) {
                this.consentReady = t,
                window.ABTasty.consentReady = t
            }
            notify(t) {
                this.mediator?.notify(t, {
                    started: !0
                })
            }
        }
        const _ = t => (new S).haveConsent([O[t]])
          , H = (t, e) => {
            const n = `abtasty_${i.u.Name.consentValid}`
              , o = i => {
                const {detail: a} = i;
                a && a.consentFor.includes(t) && (window.removeEventListener(n, o),
                e(i))
            }
            ;
            window.addEventListener(n, o)
        }
    }
    ,
    6804: (t, e, n) => {
        n.d(e, {
            F: () => a
        });
        var o = n(6729)
          , i = n(1387);
        async function a(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
              , n = arguments.length > 2 ? arguments[2] : void 0
              , a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
            const {campaign: r, variation: s, fragment: c} = e;
            try {
                if ("function" != typeof t)
                    throw new Error("Code parameter is not a function.");
                const e = await (0,
                o.W)();
                return ( (e, n, o, i) => t(e, n, o, ...i))(e, e, {
                    ...(0,
                    i.Ry)(r, s),
                    ...n
                }, a)
            } catch (t) {
                return (0,
                i.C_)(t, r, s, c),
                !1
            }
        }
    }
    ,
    1387: (t, e, n) => {
        n.d(e, {
            C_: () => g,
            K6: () => f,
            Ry: () => m
        });
        var o = n(6729)
          , i = n(88)
          , a = n(648)
          , r = n(8987)
          , s = n(6692)
          , c = n(7471)
          , l = n(6257)
          , d = n(1666)
          , u = n(3002)
          , p = n(4804);
        const m = (t, e) => ({
            doWhen: i.Yx,
            jsCookie: r.A,
            ABTastyCookie: s.bo,
            ABTastySessionCookie: c.n,
            ABTastyLocalStorage: l.x,
            getGeoloc: d.KL,
            getParsedUserAgent: u.a,
            campaignId: t,
            variationId: e,
            campaign: t ? p.Hu.instantiate(t) : void 0,
            getParsedUserAgentAsync: async () => await (0,
            u.a)(!0)
        })
          , g = (t, e, n, o) => {
            const i = void 0 !== e ? void 0 !== n ? `Campaign ${e} | Variation ${n}` : `Campaign ${e}` : void 0 !== o ? `Script fragment: Additional information ${o}` : "Global Script";
            (0,
            a.FF)(`${i} - Error during custom code execution (or code targeting)`, t)
        }
        ;
        async function f(t, e, n, i, a, r) {
            if (void 0 === t)
                return !1;
            try {
                const i = await (0,
                o.W)()
                  , s = m(e, n);
                let c, l = t;
                return r || (l = l.replace(/\$\.doWhen/g, "HELPERS.doWhen")),
                c = void 0 !== i || r ? new Function("$","jQuery","HELPERS","abResolve",l)(i, i, s, !!a && a.resolve) : new Function("HELPERS","abResolve",l)(s, !!a && a.resolve),
                c
            } catch (t) {
                return g(t, e, n, i),
                !(!a || !a.reject) && a.reject(t)
            }
        }
    }
    ,
    8353: (t, e, n) => {
        n.d(e, {
            FZ: () => m,
            P9: () => u,
            kA: () => p
        });
        var o = n(6332)
          , i = n(7707)
          , a = n(1134)
          , r = n(1666)
          , s = n(3002)
          , c = n(4804)
          , l = n(5712);
        const d = "ABTasty"
          , u = () => {
            (0,
            o.X8)([d, "cnilReady"], [d, "consentReady"])
        }
          , p = t => {
            window[d].started = !0,
            window[d].visitor = {
                id: t
            }
        }
          , m = t => {
            const e = t.accountSettings.ajaxAutoReload
              , n = l.g.getInstance()
              , u = {
                getAccountSettings: () => (0,
                a.F5)(),
                getGeoloc: () => (0,
                r.KL)(),
                getParsedUserAgent: () => ((0,
                o.j3)({
                    deprecate: "getParsedUserAgent",
                    new: "getParsedUserAgentAsync",
                    type: "function"
                }),
                (0,
                s.a)()),
                getParsedUserAgentAsync: async () => await (0,
                s.a)(!0),
                getTestsOnPage: c.Hu.getActiveCampaigns,
                hitServiceNotifierSubscribe: n.subscribe,
                hitServiceNotifierUnSubscribe: n.unsubscribe
            }
              , p = {
                accountData: t,
                consentReady: !1,
                omnitureProcessed: !1,
                pendingRedirection: !1,
                pendingUAParser: !0,
                results: {},
                started: !1,
                tagInfos: {
                    commitHash: (0,
                    i.y)() || "",
                    version: "next",
                    enabledFlagshipExperiments: [{
                        name: "tag_lp_url_cookie",
                        value: "true"
                    }, {
                        name: "tag_cache_values",
                        value: {
                            identifier: {
                                maxAge: 21600,
                                serverMaxAge: 21600
                            },
                            initiator: {
                                jsAge: 300,
                                maxAge: 30,
                                serverMaxAge: 86400
                            },
                            manifest: {
                                maxAge: 30,
                                serverMaxAge: 86400
                            }
                        }
                    }, {
                        name: "tag_1domain_lock",
                        value: "true"
                    }, {
                        name: "tag_1domain_sampling",
                        value: 1e4
                    }, {
                        name: "tag_perf_exec_time_sample",
                        value: 1e3
                    }, {
                        name: "tag_disable_ajax_mode",
                        value: "true"
                    }].filter((t => !1 !== t.value))
                },
                ...e ? {
                    urlHistory: {
                        previous: document.referrer,
                        current: window.location.href
                    }
                } : {}
            };
            window[d] = window[d] || {
                ...p,
                ...u
            }
        }
    }
    ,
    2352: (t, e, n) => {
        n.d(e, {
            X: () => o
        });
        class o {
            setMediator(t) {
                this.mediator = t
            }
        }
    }
    ,
    5216: (t, e, n) => {
        n.d(e, {
            aV: () => _t,
            i9: () => Tt,
            Jr: () => xt,
            c1: () => Ht,
            lG: () => St,
            ln: () => kt
        });
        var o = n(8987)
          , i = n(9294)
          , a = n(5437)
          , r = n(648)
          , s = n(3595)
          , c = n(1134)
          , l = n(2492)
          , d = n(8445)
          , u = n(918);
        const p = {
            abtasty_editor: "https://teddytor.abtasty.com",
            abtasty_editor_local: "https://local.editorv3.abtasty.com",
            abtasty_editor_preprod: "https://preprod-editorv3.abtasty.com"
        };
        function m() {
            return Object.keys(p).find((t => (0,
            a.Dj)(t) && (0,
            a.Vf)(t)))
        }
        function g() {
            const t = m();
            if (!t)
                return void (0,
                r.FF)("The tag could not find which editor to launch");
            const e = (0,
            a.Vf)(t);
            e ? (0,
            u.k)(p[t] + "/dist/main.js", {
                attributes: {
                    id: "abtasty-editor",
                    "data-campaignid": e
                }
            }) : (0,
            r.FF)("The tag could not find which testID the editor should use")
        }
        var f = n(4804);
        const h = {
            prod: "https://app.abtasty.com",
            local: "https://local.app.abtasty.com",
            preprod: "https://preprod-app.abtasty.com"
        };
        function y() {
            const t = Object.keys(h).find((t => (0,
            a.sd)("env") === t)) || "prod";
            if (t)
                try {
                    let e = {
                        testId: 0,
                        variationId: f.me.Original
                    };
                    (0,
                    a.sd)("testId") && (0,
                    a.sd)("variationId") ? e = {
                        testId: Number((0,
                        a.sd)("testId")),
                        variationId: Number((0,
                        a.sd)("variationId"))
                    } : null !== sessionStorage.getItem("ABTastyPreview") && (e = JSON.parse(sessionStorage.getItem("ABTastyPreview")));
                    let n = h[t];
                    n += `/ready/previewVariation.php?testID=${e.testId}`,
                    n += `&variationID=${e.variationId}`,
                    n += null != (0,
                    a.sd)("hideBar") ? "&hideBar=true" : "",
                    n += (0,
                    a.sd)("disabledModifications") ? `&disabledModifications=${(0,
                    a.sd)("disabledModifications")}` : "",
                    (0,
                    u.k)(n)
                } catch (t) {
                    const e = "Preview mode error";
                    return (0,
                    r.vV)(e, t),
                    !1
                }
            else
                (0,
                r.FF)("The tag could not find which preview to launch")
        }
        var b = n(7643)
          , v = n(1492)
          , w = n(4502)
          , T = n(9578)
          , x = n(4721)
          , k = n(9825)
          , O = n(9498);
        var S = n(7765)
          , _ = n(6692)
          , H = n(8009)
          , A = n(81)
          , E = n(7550)
          , C = n(1387);
        n(6804);
        const I = async t => {
            (0,
            r.fH)("Executing account JavaScript code."),
            (0,
            C.K6)(t)
        }
          , L = t => {
            t.forEach((async t => {
                (0,
                C.K6)(t.code, void 0, void 0, t.id)
            }
            ))
        }
        ;
        var D = n(6381)
          , N = n(9403);
        class P {
            jsCacheRefreshed = !1;
            internalEmotionAiMethods = null;
            emotionAiMethods = null;
            constructor(t, e, n, o, i) {
                this.visitorId = t,
                this.consent = e,
                this.started = n,
                this.lastUpdateDate = o,
                this.jsCacheRefreshed = (0,
                N.$)((t => this.setJsCacheRefreshed(t))),
                this.dataV1 = {
                    visitorId: this.visitorId,
                    account: (0,
                    c.F5)(),
                    events: D.P,
                    general: {
                        consent: this.consent.getConsentReady(),
                        started: this.started,
                        jsCacheRefreshed: this.jsCacheRefreshed,
                        lastUpdateDate: o
                    }
                },
                this.handlers = {},
                i && (this.internalEmotionAiMethods = i),
                this.consent.setMediator(this),
                (new D.k).setMediator(this)
            }
            setStarted(t) {
                this.started = t
            }
            setJsCacheRefreshed(t) {
                this.jsCacheRefreshed = t,
                this.notify("general.jsCacheRefreshed")
            }
            setEmotionAiMethods(t) {
                this.emotionAiMethods = t
            }
            notify(t, e) {
                if (t.startsWith("general") || t.startsWith("events")) {
                    t.startsWith("general") && e?.started && this.setStarted(e.started);
                    const n = this.getHandlerCallback(t);
                    n && this.runCallback(n)
                }
            }
            runCallback(t) {
                const {callbackKey: e, callbacks: n} = t
                  , o = e.split(".");
                for (const t of n)
                    t(this.getValue(o), o)
            }
            getValue(t) {
                if (!t.length)
                    throw new Error("No key is given in argument!");
                this.dataV1.general = {
                    consent: this.consent.getConsentReady(),
                    started: this.started,
                    lastUpdateDate: this.lastUpdateDate,
                    jsCacheRefreshed: this.jsCacheRefreshed
                },
                this.dataV1.emotionsAiSegment = this.emotionAiMethods?.getEmotionAiSegment() || "";
                const e = t[t.length - 1];
                if ("function" == typeof e) {
                    const n = (t = t.slice(0, -1)).join(".");
                    this.handlers[n] = [...this.handlers[n] ?? [], e]
                }
                return t.reduce(( (t, e) => {
                    if (t && void 0 !== t[e])
                        return t[e];
                    throw new Error(`Unknown key: ${e}!`)
                }
                ), this.dataV1)
            }
            getApi() {
                var t = this;
                return {
                    v1: {
                        getValue: function() {
                            for (var e = arguments.length, n = new Array(e), o = 0; o < e; o++)
                                n[o] = arguments[o];
                            return t.getValue(n)
                        }
                    }
                }
            }
            getHandlerCallback(t) {
                const e = this.handlers[t];
                if (void 0 !== e)
                    return {
                        callbackKey: t,
                        callbacks: e
                    };
                const n = t.split(".")
                  , o = n.slice(0, n.length - 1);
                return o.length ? this.getHandlerCallback(o.join(".")) : null
            }
        }
        var B = n(6332);
        var R = n(8353)
          , M = n(3410)
          , V = n(7904)
          , j = n(7738)
          , q = n(88);
        var $ = n(1666)
          , F = n(3002);
        var G = n(7725)
          , U = n(6916)
          , z = n(3847);
        const W = {
            [v.YQ.consent]: "onConsent",
            [v.YQ.campaign]: "onCampaign",
            [v.YQ.event]: "onEvent",
            [v.YQ.item]: "onItem",
            [v.YQ.pageview]: "onPageview",
            [v.YQ.segment]: "onSegment",
            [v.YQ.transaction]: "onTransaction",
            [v.YQ.visitorevent]: "onVisitorevent",
            [v.YQ.nps]: "onNps",
            [v.YQ.datalayer]: "onDatalayer",
            [v.YQ.product]: "onProduct"
        }
          , K = t => {
            const e = (new _.bo).getNumberOfSessions();
            return Promise.all(t.map((t => {
                const {segmentHash: n, instances: o, id: i, conf: a, name: s} = t
                  , l = {
                    id: i,
                    provider: s,
                    conf: a,
                    logger: {
                        info: r.fH,
                        error: r.vV
                    },
                    instances: o
                };
                switch (t.connectorType) {
                case U.q.PULL:
                    return async function(t, e, n) {
                        let o = [];
                        if (e.segmentHash) {
                            const t = `${(0,
                            z.x)()}/${(0,
                            c.pw)()}/integrations/${e.provider.toLowerCase()}.json?${e.segmentHash}`
                              , n = await fetch(t);
                            o = await (n.ok ? n.json() : Promise.resolve([]))
                        }
                        await async function(t, e, n) {
                            if (n && "" !== n) {
                                const o = `\n      !function(session, settings){\n        try {\n          ${n}\n          onRequest(session, settings);\n        } catch(e){\n          console.log(\`AB Tasty: error while executing connector \${settings.provider}: \`, e.message)}\n        }(session, settings)\n    `;
                                await Y(["session", "settings"], o, [t, e])
                            }
                        }(t, {
                            ...e,
                            segmentList: o
                        }, n)
                    }({
                        pv: e
                    }, {
                        ...l,
                        segmentHash: n
                    }, t.code);
                case U.q.PUSH:
                    return async function(t, e) {
                        let n;
                        if (e) {
                            const o = `\n        return (function(){\n          try{\n            ${e}\n            return getConnectors();\n          }catch(e){\n            console.log(\`AB Tasty: error while setting up push connector ${t.provider}: \`, e)\n          }\n        })()\n      `;
                            n = Function(o)()
                        }
                        n && Object.keys(n).length && Object.entries(W).forEach((e => {
                            let[o,i] = e;
                            i in n && window.ABTasty.hitServiceNotifierSubscribe(n[i], o, t)
                        }
                        ))
                    }(l, t.code);
                case U.q.DATALAYER:
                    return async function(t, e, n) {
                        if (n && "" !== n) {
                            const o = `\n      !function(datalayer, settings){\n        try {\n          ${n}\n          main(datalayer, settings);\n        } catch(e){\n          console.log(\`AB Tasty: error while executing connector \${datalayer.name}: \`, e.message)}\n        }(datalayer, settings)\n    `;
                            await Y(["datalayer", "settings"], o, [t, e])
                        }
                    }(t, l, t.code);
                default:
                    return (0,
                    r.vV)(`Unknown integration connector type ${t.connectorType}`),
                    Promise.resolve()
                }
            }
            ))).catch((t => (0,
            r.vV)("Integration connector execution failed with error:", t)))
        }
        ;
        function Y() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
              , e = arguments.length > 1 ? arguments[1] : void 0
              , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
            return Promise.resolve(Function(...t, e)(...n))
        }
        var Q = n(2484);
        const J = t => {
            const e = (t => !t && "object" != typeof t || !Object.values(t).every((t => "string" == typeof t)))(t);
            if (e)
                (t => {
                    r.FF("'CustomIdentities' cannot be set, format is not correct. It should be a dict of {string: string}", t)
                }
                )(t);
            else {
                (t => {
                    if (!t && "object" != typeof t)
                        return;
                    const e = JSON.parse(Q.Ks.getItem(Q.b1, d.ok.CUSTOM_IDENTITIES)) || {}
                      , n = t;
                    Object.entries(n).forEach((t => {
                        let[n,o] = t;
                        (0,
                        s.g)(o) || (e[n] = o)
                    }
                    )),
                    Q.Ks.setItem(Q.b1, d.ok.CUSTOM_IDENTITIES, JSON.stringify(e))
                }
                )(t);
                const e = T.u.Name.identityAdded;
                (new D.k).dispatchCustomEvent(e)
            }
        }
        ;
        var Z = n(6046)
          , X = n(3026);
        function tt() {
            const t = function(t) {
                return t.reduce(( (t, e) => {
                    let {method: n, url: o, category: i, action: r} = e;
                    return (0,
                    a.wM)(n, o) ? {
                        ...t,
                        [i]: r
                    } : t
                }
                ), {})
            }(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []);
            if (Object.keys(t).length > 0) {
                const e = {
                    s: t
                };
                (new b.n).setInternalHit(v.YQ.segment, e)
            }
        }
        var et = n(1873)
          , nt = n(7426)
          , ot = n(8843)
          , it = n(7471)
          , at = n(5974);
        var rt = n(9404);
        const st = "abtasty-execution-started"
          , ct = () => window.performance.getEntriesByName(st).length > 0
          , lt = "abtasty-execution-ended"
          , dt = "executionTime";
        let ut = !1;
        const pt = () => {
            try {
                const t = new l.E;
                if (ut || !ct() || window.performance.getEntriesByName(lt).length > 0 || t.checkHitHistorySession(d._V.PERFORMANCE, dt))
                    return;
                window.performance.mark(lt);
                const e = window.performance.measure("abtasty-execution", st, lt)
                  , n = ( () => {
                    const t = window.performance.getEntries().filter((t => t.name.includes((0,
                    z.x)())))
                      , e = t.find((t => t.name.includes(`/${A.o3.manifest}`)))?.startTime || -1;
                    return (t => t.sort(( (t, e) => t.startTime - e.startTime)).reduce(( (t, e) => e.startTime > t.currentEnd ? {
                        totalTime: t.totalTime + e.duration,
                        currentEnd: e.responseEnd
                    } : e.responseEnd > t.currentEnd ? {
                        totalTime: t.totalTime + e.responseEnd - t.currentEnd,
                        currentEnd: e.responseEnd
                    } : t), {
                        totalTime: 0,
                        currentEnd: 0
                    }).totalTime)(t.filter((t => !(e > -1 && [A.o3.initiator, A.o3.main].some((e => t.name.includes(`/${e}`))) && t.startTime > e) && [A.o3.initiator, A.o3.commons, A.o3.main, A.o3.modificationEngine, A.o3.jquery].some((e => t.name.includes(`/${e}`))))))
                }
                )();
                (new b.n).setInternalHit(v.YQ.performance, {
                    ext: Math.round(e.duration - n)
                }),
                t.setHitHistorySession(d._V.PERFORMANCE, dt)
            } catch (t) {
                (0,
                r.FF)("Can't send execution time performance measure due to:", t.message)
            }
        }
          , mt = function() {
            ut = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]
        };
        n(3692);
        var gt = n(6883);
        let ft = !1;
        function ht() {
            if (Ht()) {
                if ((0,
                V.BZ)() && (0,
                V.Ey)())
                    if (kt())
                        (0,
                        r.FF)("[ABTasty tag is locked]"),
                        new Promise((t => {
                            window.unlockABTasty = () => (delete window.lockABTastyTag,
                            (0,
                            r.fH)("[ABTasty tag is unlocked]"),
                            t(!0)),
                            mt()
                        }
                        )).then(yt);
                    else if ((0,
                    c.Fc)())
                        (0,
                        r.FF)("[ABTasty quota limit reached]");
                    else {
                        if (!(0,
                        c.Ut)())
                            return yt();
                        setTimeout(yt, 0)
                    }
            } else
                (0,
                r.vV)("Tag has been stopped: Current page domain is not matching with account configuration.")
        }
        async function yt() {
            (0,
            r.fH)("Init process started...");
            const t = new H.NO;
            let e = !0
              , o = null;
            (0,
            rt.pK)(_.H_, (async () => {
                o && clearTimeout(o),
                e = !1;
                const i = _.bo.getInstance();
                t && i ? await async function(t, e) {
                    const o = new P(e.getVisitorId(),t,!1,"2024/12/04 10:46:09 UTC",null);
                    0;
                    window.ABTasty.api = o.getApi(),
                    (0,
                    R.P9)(),
                    t.haveConsent([H.rv.start]) || ((0,
                    r.FF)("Waiting for consent."),
                    mt(),
                    await new Promise((t => {
                        (0,
                        H.T$)(H.rv.start, ( () => t(!0)))
                    }
                    )));
                    (0,
                    r.fH)("Main process started..."),
                    (0,
                    R.kA)(e.getVisitorId()),
                    o.setStarted(!0);
                    (new D.k).initCustomEventState(),
                    (0,
                    G.jk)(),
                    await (0,
                    M.Om)(e.getVisitorId()) || (0,
                    G.vm)() || (e.save(),
                    (0,
                    r.FF)("Tag has been stopped caused by sampling configuration."),
                    mt(),
                    await (0,
                    M.EN)(),
                    (0,
                    r.NI)("Tag has been unlocked using sampling bypass event."));
                    e.setSaveable([_.$K.uid, _.$K.cst, _.$K.fst, _.$K.ns, _.$K.pst, _.$K.pvis, _.$K.pvt, _.$K.th], !0),
                    ( (t, e) => {
                        window.ABTastyStartTest = f.Hu.abTastyStartTest(t),
                        window.ABTastyReload = () => {
                            (0,
                            r.fH)("Tag reloading from ABTastyReload"),
                            e(!0)
                        }
                        ,
                        window.ABTastyPageView = () => {
                            (0,
                            r.fH)("Tag reloading from ABTastyPageView"),
                            (0,
                            B.j3)({
                                deprecate: "ABTastyPageView",
                                new: "ABTastyReload",
                                type: "function"
                            }),
                            e(!0)
                        }
                    }
                    )(e, bt(e)),
                    new b.n,
                    !1;
                    0;
                    ( (t, e) => {
                        (0,
                        F.a)(),
                        (0,
                        c.$E)() && (0,
                        $.u$)(),
                        Promise.resolve().then(n.bind(n, 7177)).then((n => {
                            window.ABTasty.getAbandonedCart = async function() {
                                let o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : t
                                  , i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e
                                  , a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                                return n.getAbandonedCart(o, i, a)
                            }
                        }
                        ))
                    }
                    )((0,
                    c.pw)(), e.getVisitorId());
                    n(2524).detectDatalayer();
                    (0,
                    Z.I)().then((t => t?.setGlobals((t => () => ({
                        campaignHistory: () => t.getCampaignHistory(),
                        visitorId: t.getVisitorId(),
                        currentSessionTimestamp: t.getCurrentSessionTimestamp(),
                        numberOfSessions: t.getNumberOfSessions()
                    }))(e)))),
                    (0,
                    c.F5)().ajaxAutoReload && (0,
                    j.F)(( () => {
                        bt(e)(!0)
                    }
                    ));
                    (0,
                    q.Qm)(( () => bt(e)(!0))),
                    bt(e)(),
                    window.abtasty = window.abtasty || {},
                    window.abtasty.addCustomIdentity = J
                }(t, i) : (0,
                r.vV)("Init process missing consent or cookie", `Consent: ${t}`, `Cookie: ${i}`)
            }
            )),
            (0,
            S.o9)(),
            await _.bo.build(),
            e && (o = setTimeout(( () => {
                (0,
                r.vV)("Init process timeout")
            }
            ), 2e3))
        }
        const bt = t => async function() {
            let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            (0,
            Z.I)().then((t => {
                t?.dispatchBatch()
            }
            )),
            e && await (async () => {
                (0,
                at._)().then((t => t?.rollback())),
                (0,
                X.a)(),
                f.Hu.resetCampaigns(),
                (0,
                S.SL)(),
                (0,
                et.wi)(),
                await (0,
                ot.pendingModeLoader)().then((t => {
                    "resetPendingMode"in t && t.resetPendingMode()
                }
                )),
                (0,
                ot.registerPendingCriteria)(null, null, !0),
                (0,
                nt.sm)(),
                new it.n(!0),
                (new D.k).resetSpecificsCustomEvents([T.u.Name.executedCampaign, T.u.Name.tagContentExecuted]),
                window.ABTasty.results = {},
                window.ABTasty.omnitureProcessed = !1,
                window.ABTasty.urlHistory && (window.ABTasty.urlHistory = {
                    previous: window.ABTasty.urlHistory.current ? window.ABTasty.urlHistory.current : document.referrer,
                    current: document.location.href
                })
            }
            )().then(( () => {
                (0,
                S.o9)()
            }
            )),
            document.dispatchEvent(new CustomEvent(x.tv)),
            (0,
            et.k5)(),
            ft || (ft = !0,
            vt(t))
        }
        ;
        async function vt(t) {
            const {accountSettings: {globalCode: e="", globalCodeOnDocReady: n}, globalCodeFragments: o, customVariables: i} = (0,
            c.yn)();
            if (!_.bo.cookieReady)
                return void setTimeout(( () => vt(t)), x.K6);
            ft = !1,
            t.pageView(),
            (new b.n).setInternalHit(v.YQ.pageview, {});
            const a = (0,
            c.Bz)() || [];
            (0,
            r.fH)("Integration connectors::", a),
            a && a.length && await K(a),
            i && tt(i),
            async function(t, e, n) {
                const o = "" !== t
                  , i = n && n.length > 0;
                if ((o || i) && (o && (e ? (0,
                E.Q)(( () => I(t))) : await I(t)),
                i)) {
                    const t = n.filter((t => t.onDocumentReady))
                      , e = n.filter((t => !t.onDocumentReady));
                    t.length > 0 && (0,
                    E.Q)(( () => L(t))),
                    e.length > 0 && L(e)
                }
            }(e, n, o),
            await (async t => {
                const {getCampaignsDatas: e, getCampaignsSortedByPrio: n} = f.Hu
                  , o = e()
                  , i = n(await (0,
                O.sC)(o, t.getVisitorId()))
                  , a = (0,
                k.tP)(t.getCampaignHistory(), i);
                await (0,
                k.Mm)(t, i, a)
            }
            )(t),
            function(t) {
                const e = (0,
                c.iN)();
                e && (0,
                X.L)(t)(e)
            }(t),
            (0,
            E.Q)(( () => {
                ( () => {
                    const t = ["try.abtasty.com"]
                      , e = (0,
                    z.De)()
                      , n = t.some((t => e.includes(t)))
                      , o = e.includes("localhost") || "null" === e
                      , i = e.includes(".");
                    !n && !o && i && (0,
                    gt.r)(1e5) && (new b.n).setInternalHit(v.YQ.usage, {
                        cv: {
                            selfHost: "true",
                            tagOrigin: e
                        }
                    })
                }
                )(),
                (new D.k).dispatchCustomEvent(T.u.Name.tagContentExecuted),
                pt()
            }
            ))
        }
        const wt = "ABTastyOptout"
          , Tt = () => m() ? g : "preview" === (0,
        a.Zo)(window.location.href, !0).ab_project || "undefined" != typeof sessionStorage && void 0 !== sessionStorage.ABTastyPreview && null != sessionStorage.ABTastyPreview ? y : ht
          , xt = () => !!m() || !window.ABTasty.started && !( () => {
            if ((0,
            i.G1)())
                return !0;
            const {abtastyeditorlock: t, abtastyoptout: e} = (0,
            a.oE)();
            let n = !1;
            try {
                n = !(0,
                s.g)(t) || !(0,
                s.g)(window.top?.ABTASTY_S)
            } catch (t) {}
            return (0,
            s.g)(e) ? Boolean(o.A.get(wt)) || n : (o.A.set(wt, "1", (0,
            w.jS)(388)),
            !0)
        }
        )()
          , kt = () => window.lockABTastyTag || !1
          , Ot = ["localhost", "127.0.0.1"]
          , St = function() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.host;
            const e = (0,
            a.NU)(t);
            return Ot.some((t => e.includes(t)))
        }
          , _t = function(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location.host;
            return t.filter((t => (0,
            a.yq)(t, e)))
        };
        const Ht = () => {
            const {authorizedDomains: t=[]} = (0,
            c.F5)()
              , e = _t(t).length > 0
              , n = St() || e;
            if (!n && t.length > 0) {
                const e = new l.E;
                return !e.checkHitHistorySession(d._V.TROUBLESHOOT, "domainNotAuthorized") && (0,
                gt.r)(1e4) && (0,
                rt.pK)(_.H_, ( () => function(t, e) {
                    const n = {
                        cv: {
                            detectedDomain: `${window.location.origin.replace(/^https?:\/\//, "")}`,
                            expectedDomain: `${t.slice(0, 5).join(",").concat(t.length > 5 ? ",..." : "").toString()}`
                        }
                    };
                    (new b.n).setInternalHit(v.YQ.usage, n),
                    e.setHitHistorySession(d._V.TROUBLESHOOT, "domainNotAuthorized")
                }(t, e))),
                (0,
                r.FF)("Domain restriction configuration: the current domain is not matching with the domain set in the account configuration. Please check your settings to avoid any service disruption in the future."),
                !0
            }
            return n
        }
    }
    ,
    1873: (t, e, n) => {
        n.d(e, {
            D0: () => c,
            k5: () => r,
            wi: () => s
        });
        var o = n(3595)
          , i = n(9700);
        let a = null;
        function r() {
            (0,
            o.g)(c()) || s(),
            a = (0,
            i.hw)()
        }
        const s = () => a = null
          , c = () => a
    }
    ,
    602: (t, e, n) => {
        n.r(e),
        n.d(e, {
            mainTag: () => c
        });
        var o = n(648)
          , i = n(1134)
          , a = n(8353)
          , r = n(6381)
          , s = n(5216);
        const c = () => {
            (new r.k).initCustomEventState();
            const t = (0,
            i.yn)();
            (function() {
                try {
                    const {accountIframeException: t, identifier: e} = (0,
                    i.F5)();
                    if (!t && window.top !== window.self && "object" == typeof window.top?.ABTasty && window.top.ABTasty.accountData.accountSettings.identifier === e)
                        return !1
                } catch (t) {}
                return !0
            }
            )() && ((0,
            o.fH)("Starting execution...", t),
            (0,
            a.FZ)(t),
            (0,
            s.Jr)() && (0,
            s.i9)()())
        }
    }
    ,
    5974: (t, e, n) => {
        n.d(e, {
            _: () => a
        });
        var o = n(6361)
          , i = n(648);
        const a = async () => {
            try {
                return await (0,
                o._)(( () => Promise.all([n.e(223, "high"), n.e(693, "high")]).then(n.bind(n, 107))))
            } catch (t) {
                return (0,
                i.vV)("AB Tasty's Tag can't be loaded. Caused by:", t),
                null
            }
        }
    }
    ,
    7725: (t, e, n) => {
        n.d(e, {
            jk: () => u,
            vm: () => m
        });
        var o = n(918)
          , i = n(5437)
          , a = n(3410)
          , r = n(648);
        const s = "AB_TASTY_QA_ASSISTANT_ENV"
          , c = {
            abtasty_qa_assistant: "prod",
            abtasty_qa_assistant_staging: "staging",
            abtasty_qa_assistant_local: "local"
        }
          , l = {
            prod: "https://qa-assistant.abtasty.com",
            staging: "https://staging-qa-assistant.abtasty.com",
            local: "https://local-qa-assistant.abtasty.com:5000"
        }
          , d = (Object.keys(c),
        "bundle.js");
        function u() {
            !function() {
                (0,
                r.fH)("Listening for keyboard events to launch QA Assistant");
                const t = {
                    q: !1,
                    a: !1
                }
                  , e = Object.keys(t)
                  , n = n => {
                    (n.altKey || n.ctrlKey) && e.includes(n.key.toLocaleLowerCase()) && (t[n.key.toLocaleLowerCase()] = !0),
                    Object.values(t).every((t => t)) && g()
                }
                  , o = function(n) {
                    e.includes(n.key) && (t[n.key] = !1)
                }
                  , i = () => {
                    document.removeEventListener("keydown", n, !1),
                    document.removeEventListener("keyup", o, !1)
                }
                ;
                i(),
                document.addEventListener("keydown", n, !1),
                document.addEventListener("keyup", o, !1)
            }(),
            m() && g()
        }
        function p() {
            return Object.keys(c).find((t => !!(0,
            i.Vf)(t)))
        }
        function m() {
            return !(!p() && !sessionStorage.getItem(s))
        }
        function g() {
            if (!window.frames.ABTastyQaAssistant) {
                const t = function() {
                    const t = p();
                    return ( () => {
                        const e = sessionStorage.getItem(s);
                        return e && [...Object.keys(l)].includes(e) ? e : t && c[t] ? c[t] : "prod"
                    }
                    )()
                }()
                  , e = l[t];
                (0,
                r.fH)("Loading QA Assistant"),
                (0,
                o.k)(`${e}/${d}`),
                sessionStorage.setItem(s, t),
                window.dispatchEvent(new CustomEvent(a.kj))
            }
        }
    }
    ,
    3410: (t, e, n) => {
        n.d(e, {
            EN: () => c,
            Om: () => s,
            kj: () => r
        });
        var o = n(6552)
          , i = n(1134)
          , a = n(648);
        const r = "abtasty_bypassSampling"
          , s = async t => {
            try {
                const e = await (0,
                o.w)(t);
                return e > 0 && e <= ((0,
                i.F5)().sampling || 100)
            } catch (t) {
                return (0,
                a.vV)("Sampling has failed", t),
                !1
            }
        }
          , c = () => new Promise((t => {
            window.addEventListener(r, ( () => t()))
        }
        ))
    }
    ,
    5960: (t, e, n) => {
        n.d(e, {
            C: () => s,
            c: () => d
        });
        var o = n(5437)
          , i = n(3248)
          , a = n(648);
        function r(t) {
            return void 0 !== t.favorite_url_id
        }
        function s(t) {
            let {urlScopes: e, favoriteUrlScopeConditions: n} = t;
            try {
                const t = e.filter((t => {
                    let {include: e} = t;
                    return !e
                }
                ))
                  , o = e.filter((t => {
                    let {include: e} = t;
                    return e
                }
                ));
                return !t.some((t => r(t) ? l(t, n) : (0,
                i.Q)(t))) && (!!o.some((t => r(t) ? l(t, n) : (0,
                i.Q)(t))) || 0 === o.length)
            } catch (t) {
                const n = "Scope error (CurrentFavoriteUrlCondition)";
                return a.vV(n, e),
                !1
            }
        }
        function c(t, e) {
            let {url: n, operator: i} = t;
            return (0,
            o.wM)(i, n, e)
        }
        function l(t, e) {
            let {favorite_url_id: n} = t;
            return d(e.filter((t => {
                let {favorite_url_id: e} = t;
                return e === n
            }
            )))
        }
        function d(t, e) {
            const n = t.filter((t => {
                let {include: e} = t;
                return !e
            }
            ))
              , o = t.filter((t => {
                let {include: e} = t;
                return e
            }
            ));
            return !n.some((t => c(t, e))) && (!!o.some((t => c(t, e))) || 0 === o.length)
        }
    }
    ,
    3248: (t, e, n) => {
        n.d(e, {
            E: () => c,
            Q: () => s
        });
        var o = n(648)
          , i = n(5437)
          , a = n(5415);
        const r = {
            [a.UT]: "equals",
            [a.sz]: "contains",
            [a.Wm]: "regexp",
            [a.W8]: "ignore_parameters"
        };
        function s(t) {
            let {value: e, condition: n} = t;
            return (0,
            i.wM)(r[n], e)
        }
        function c(t) {
            try {
                const e = t.filter((t => {
                    let {include: e} = t;
                    return !e
                }
                ))
                  , n = t.filter((t => {
                    let {include: e} = t;
                    return e
                }
                ));
                return !e.some(s) && (!!n.some(s) || 0 === n.length)
            } catch (e) {
                const n = "Scope error (currentUrl)";
                return o.vV(n, t),
                !1
            }
        }
    }
    ,
    7177: (t, e, n) => {
        n.r(e),
        n.d(e, {
            getAbandonedCart: () => p
        });
        var o = n(648)
          , i = n(3346)
          , a = n(3595)
          , r = n(7426)
          , s = n(2484);
        const c = "ABTastyAbandonedCart"
          , l = 3e3
          , d = "abandonedCartFetch"
          , u = "https://dcinfos-cache.abtasty.com/v1/cart"
          , p = ( () => {
            const t = {};
            return async function(e, n) {
                if (arguments.length > 2 && void 0 !== arguments[2] && arguments[2] && delete t.abandonedCart,
                t.abandonedCart)
                    return t.abandonedCart;
                if (!s.Ks.getItem(s.b1, c)) {
                    const p = e => {
                        (0,
                        a.g)(e) || s.Ks.setItem(s.b1, c, JSON.stringify(e)),
                        t.abandonedCart = e
                    }
                    ;
                    return await (async (t, e) => {
                        const n = ( () => {
                            try {
                                return new AbortController
                            } catch (t) {
                                (0,
                                o.FF)("Cannot create AbortController.", t)
                            }
                        }
                        )()
                          , a = d + Date.now()
                          , s = setTimeout(( () => {
                            n?.abort(),
                            (0,
                            o.FF)("Call to Abandoned cart service timeout. Abandoned cart targeting is going to reject visitor.")
                        }
                        ), l);
                        (0,
                        r.Dk)(a, s);
                        const c = `${u}?clientId=${t}&fullVisitorId=${e}`;
                        return await (0,
                        i.J)(c, {
                            signal: n?.signal
                        }).then((t => {
                            switch ((0,
                            r.fD)(a),
                            t.status) {
                            case 200:
                                return t.json();
                            case 204:
                                return {};
                            default:
                                return
                            }
                        }
                        )).catch((t => {
                            "AbortError" !== t.name && (0,
                            o.vV)(`Error while fetching Abandoned cart data: ${t}`)
                        }
                        ))
                    }
                    )(e, n).then((t => (p(t),
                    t)))
                }
                try {
                    const e = JSON.parse(s.Ks.getItem(s.b1, c));
                    return t.abandonedCart = e,
                    t.abandonedCart
                } catch (e) {
                    return (0,
                    o.FF)(`Error while parsing abandoned cart data from sessionStorage: ${e}`),
                    t.abandonedCart
                }
            }
        }
        )()
    }
    ,
    7643: (t, e, n) => {
        n.d(e, {
            n: () => s
        });
        var o = n(9578)
          , i = n(3595)
          , a = n(6381)
          , r = n(6046);
        class s {
            static instance = null;
            data = null;
            commonDataRefresher = null;
            constructor() {
                return (0,
                i.g)(s.instance) ? (s.instance = this,
                this.data = {
                    eventTracking: [],
                    collectHit: []
                },
                this.createMethods(),
                (new a.k).dispatchCustomEvent(o.u.Name.trackingInitialized),
                this) : s.instance
            }
            static reset() {
                (0,
                i.g)(s.instance) || (0,
                i.g)(s.instance.data) || (s.instance.data.eventTracking = [],
                s.instance.data.collectHit = [])
            }
            setEventTracking(t, e, n) {
                if ((new a.k).getStatusCustomEvent(o.u.Name.analyticsLoaded) === o.u.Status.complete)
                    return;
                const i = Date.now()
                  , r = this.data.eventTracking.length;
                this.data.eventTracking[r] = {
                    name: t,
                    data: e,
                    campaignId: n,
                    time: i
                }
            }
            static getEventTracking() {
                return (0,
                i.g)(s.instance) || (0,
                i.g)(s.instance.data) ? [] : s.instance.data.eventTracking
            }
            setInternalHit(t, e) {
                (new a.k).getStatusCustomEvent(o.u.Name.analyticsLoaded) === o.u.Status.complete && s.instance?.commonDataRefresher ? (0,
                r.I)().then((n => n?.dispatchHit(t, e))) : this.setCollectHit(t, e)
            }
            setCollectHit(t, e) {
                if ((new a.k).getStatusCustomEvent(o.u.Name.analyticsLoaded) === o.u.Status.complete)
                    return;
                const n = Date.now()
                  , i = this.data.collectHit.length;
                this.data.collectHit[i] = {
                    type: t,
                    args: e,
                    time: n
                }
            }
            static getCollectHit() {
                return (0,
                i.g)(s.instance) || (0,
                i.g)(s.instance.data) ? [] : s.instance.data.collectHit
            }
            static setCommonDataRefresher(t) {
                (0,
                i.g)(s.instance) || (s.instance.commonDataRefresher = t)
            }
            static getCommonDataRefresher() {
                return (0,
                i.g)(s.instance) ? null : s.instance.commonDataRefresher
            }
            createMethods() {
                var t = this;
                const e = function() {
                    for (var e = arguments.length, n = new Array(e), o = 0; o < e; o++)
                        n[o] = arguments[o];
                    return t.setCollectHit.apply(t, [...n])
                };
                window.abtasty ? window.abtasty.send || (window.abtasty.send = e) : window.abtasty = {
                    send: e
                };
                const n = function() {
                    for (var e = arguments.length, n = new Array(e), o = 0; o < e; o++)
                        n[o] = arguments[o];
                    return t.setEventTracking.apply(t, [...n])
                };
                window.ABTastyClickTracking || (window.ABTastyClickTracking = n),
                window.ABTastyEvent || (window.ABTastyEvent = n)
            }
        }
    }
    ,
    5712: (t, e, n) => {
        n.d(e, {
            g: () => l
        });
        var o = n(88)
          , i = n(4804)
          , a = n(1492)
          , r = n(8009)
          , s = n(9578);
        let c = [];
        class l {
            constructor() {
                l.observers = [],
                l.hitHistory = []
            }
            subscribe(t, e, n) {
                const o = function(t) {
                    let e = 0;
                    const n = t.toString().replace(/\s/g, "");
                    for (let t = 0; t < n.length; t++) {
                        e = (e << 5) - e + n.charCodeAt(t)
                    }
                    return e
                }(t)
                  , i = {
                    measurementId: null,
                    instances: [],
                    ...n,
                    observerId: o
                };
                if (l.observers.every((t => {
                    let {settings: e} = t;
                    return o !== e.observerId
                }
                ))) {
                    const o = {
                        fn: t,
                        hitType: e,
                        settings: i
                    };
                    if (l.observers.push(o),
                    n?.withHitHistory && l.hitHistory.length)
                        for (const n of l.hitHistory)
                            l.hasToSendDataToSubscriber(o, n.data, e) && t.call(window, n, i)
                }
            }
            unsubscribe(t) {
                l.observers = l.observers.filter((e => {
                    let {settings: n} = e;
                    return n.observerId !== t
                }
                ))
            }
            emit(t, e, n) {
                let d = Object.assign({}, e);
                if (t === a.YQ.campaign) {
                    const {caid: t, vaid: n} = e
                      , o = (0,
                    i.iE)(Number(t));
                    if (o?.isMultipageChild()) {
                        const t = o.getParentId()
                          , e = o.getParentName()
                          , i = o.getVariation?.(Number(n));
                        d = {
                            ...d,
                            caid: t.toString(),
                            caname: e,
                            vaid: i?.masterVariationId?.toString(),
                            vaname: i?.name
                        }
                    } else
                        d = {
                            ...d,
                            caname: o?.getName(),
                            vaname: o?.getVariation?.(Number(n))?.name
                        };
                    d.sub_type = o?.data.sub_type,
                    d.parentId = o?.isChild() ? o.getParentId().toString() : null
                }
                const u = {
                    type: t,
                    timestamp: n,
                    data: d,
                    doWhen: o.Yx
                };
                t === a.YQ.pageview ? l.hitHistory = [] : l.hitHistory.push(u);
                (new r.NO).haveConsent([r.rv.collect]) ? l.sendEvent(u, d, t) : (0 === c.length && window.addEventListener(`abtasty_${s.u.Name.consentValid}`, (t => {
                    const {detail: e} = t;
                    e && e.consentFor.includes(r.rv.collect) && (c.forEach((t => {
                        let {event: e, hit: n, type: o} = t;
                        l.sendEvent(e, n, o)
                    }
                    )),
                    c = [])
                }
                )),
                c.push({
                    event: u,
                    hit: d,
                    type: t
                }))
            }
            static sendEvent(t, e, n) {
                l.observers.forEach((o => {
                    l.hasToSendDataToSubscriber(o, e, n) && o.fn.call(window, t, o.settings)
                }
                ))
            }
            static isAnActiveIntegrationForThisCampaign(t, e, n) {
                let {instances: o=[]} = e;
                return n !== a.YQ.campaign || !o.length || o.some((e => {
                    let {testIds: n} = e;
                    return n?.includes(Number(t.caid)) || n?.includes(Number(t.parentId))
                }
                ))
            }
            static getInstance() {
                return l.instance || (l.instance = new l),
                l.instance
            }
            static hasToSendDataToSubscriber(t, e, n) {
                let {hitType: o, settings: i} = t;
                return l.isAnActiveIntegrationForThisCampaign(e, i, n) && (!o || o === n)
            }
        }
    }
    ,
    3692: (t, e, n) => {
        n.d(e, {
            x: () => o
        });
        let o = function(t) {
            return t.visitorevent = "EAI_VISITOREVENT",
            t.pageview = "EAI_PAGEVIEW",
            t
        }({})
    }
    ,
    1492: (t, e, n) => {
        n.d(e, {
            R1: () => a,
            X8: () => i,
            YQ: () => o,
            aE: () => r,
            qz: () => s
        });
        let o = function(t) {
            return t.campaign = "CAMPAIGN",
            t.event = "EVENT",
            t.item = "ITEM",
            t.pageview = "PAGEVIEW",
            t.segment = "SEGMENT",
            t.transaction = "TRANSACTION",
            t.visitorevent = "VISITOREVENT",
            t.nps = "NPS",
            t.batch = "BATCH",
            t.datalayer = "DATALAYER",
            t.consent = "CONSENT",
            t.product = "PRODUCT",
            t.usage = "USAGE",
            t.troubleshooting = "TROUBLESHOOTING",
            t.performance = "PERFORMANCE",
            t
        }({})
          , i = function(t) {
            return t.CART_ITEM = "CART_ITEM",
            t.CART_TOTAL = "CART_TOTAL",
            t.VIEW = "VIEW",
            t
        }({})
          , a = function(t) {
            return t.strict = "STRICT_MODE",
            t.permissive = "PERMISSIVE_MODE",
            t
        }({})
          , r = function(t) {
            return t.any_cookie = "LOW_COOKIE",
            t.specific_cookie = "COMPLIANT_COOKIE",
            t.custom_js = "MANUAL_CODE",
            t.third_party = "THIRD_PARTY",
            t.didomi = "DIDOMI",
            t
        }({})
          , s = function(t) {
            return t.Boolean = "boolean",
            t.IntegerArray = "integer[]",
            t.Integer = "integer",
            t.FloatArray = "float[]",
            t.Float = "float",
            t.ArrayArray = "array[]",
            t.Array = "array",
            t.ObjectArray = "object[]",
            t.Object = "object",
            t.StringArray = "string[]",
            t.String = "string",
            t
        }({})
    }
    ,
    6046: (t, e, n) => {
        n.d(e, {
            I: () => a
        });
        var o = n(648)
          , i = n(6361);
        const a = async () => {
            try {
                return await (0,
                i._)(( () => n.e(153, "low").then(n.bind(n, 206))))
            } catch (t) {
                return (0,
                o.vV)("AB Tasty's Tag can't be loaded. Caused by:", t),
                null
            }
        }
    }
    ,
    7386: (t, e, n) => {
        n.d(e, {
            Cy: () => r,
            E: () => d,
            zj: () => l
        });
        n(1134);
        var o = n(648)
          , i = n(2484);
        const a = "ABTastyAllocation"
          , r = "0"
          , s = {
            dynAllocWait: {
                promise: null,
                resolve: null,
                reject: null
            }
        };
        function c() {
            const t = s.dynAllocWait;
            t.promise = new Promise(( (e, n) => {
                t.resolve = e,
                t.reject = n
            }
            ))
        }
        function l() {
            return s.dynAllocWait.promise
        }
        function d() {
            let t;
            try {
                t = JSON.parse(i.Ks.getItem(i.b1, a))
            } catch (t) {
                o.vV(`Error parsing allocations data: ${t}`)
            }
            return t
        }
        c()
    }
    ,
    1666: (t, e, n) => {
        n.d(e, {
            u$: () => m,
            KL: () => g,
            q0: () => h,
            uA: () => y,
            Tt: () => f
        });
        var o = n(3346)
          , i = n(7426)
          , a = n(2484)
          , r = n(3595)
          , s = n(648);
        const c = "ABTastyGeoloc";
        class l {
            constructor(t, e) {
                this.name = t,
                this.state = e,
                this.createWaitPromise()
            }
            resetState() {
                this.state.wait.reject?.(`${this.name} service state is being reset`),
                this.state.wait = {
                    promise: null,
                    resolve: null,
                    reject: null
                },
                this.state.data = null,
                this.createWaitPromise()
            }
            createWaitPromise() {
                const t = this.state.wait;
                t.promise = new Promise(( (e, n) => {
                    t.resolve = e,
                    t.reject = n
                }
                ))
            }
            getWaitPromise() {
                return this.state.wait.promise
            }
            getData() {
                try {
                    return (0,
                    r.g)(this.state.data) ? JSON.parse(a.Ks.getItem(a.b1, c)) : this.state.data
                } catch (t) {
                    return (0,
                    s.vV)(`Error parsing ${this.name}: ${t}`),
                    null
                }
            }
            setData(t) {
                this.state.data = t,
                a.Ks.setItem(a.b1, c, JSON.stringify(t))
            }
            async fetch() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                    weather: !1
                };
                if (!(this.state.isNotFilled || r.g)(this.getData()))
                    return (0,
                    r.g)(this.state.data) && (this.state.data = JSON.parse(a.Ks.getItem(a.b1, c))),
                    void this.state.wait.resolve?.(!0);
                this.state.wait.promise || this.createWaitPromise();
                const e = setTimeout(( () => {
                    (0,
                    r.g)(this.getData()) && this.serviceFailure()
                }
                ), this.state.service.timeout);
                (0,
                i.Dk)(this.state.service.timeoutName, e);
                const n = Object.entries(t).reduce(( (t, e, n) => {
                    let[o,i] = e;
                    return 0 === n ? `?${o}=${i}` : `${t}&${o}=${i}`
                }
                ), "");
                await (0,
                o.J)(`${this.state.service.route}${n}`).then((t => t.json())).then((t => (this.setData(t),
                this.state.wait.resolve?.(!0),
                (0,
                i.fD)(this.state.service.timeoutName),
                !0))).catch((t => (this.serviceFailure(),
                this.state.wait.reject?.(`An error occurred on ${this.name} service: ${t}`),
                (0,
                s.vV)(`Error while fetching ${this.name} data: ${t}`),
                !1)))
            }
            serviceFailure() {
                sessionStorage.setItem(c, ""),
                this.state.wait.reject?.(`${this.name} service failure`),
                (0,
                i.fD)(this.state.service.timeoutName)
            }
        }
        const d = {
            wait: {
                promise: null,
                resolve: null,
                reject: null
            },
            data: null,
            service: {
                timeout: 3e3,
                timeoutName: "ipFetchLoop",
                route: "https://dcinfos-cache.abtasty.com/v1/geoip"
            }
        }
          , u = new l("geoloc",{
            wait: {
                promise: null,
                resolve: null,
                reject: null
            },
            data: null,
            isNotFilled: t => !t?.country_name,
            service: {
                timeout: 3e3,
                timeoutName: "geolocFetchLoop",
                route: "https://dcinfos-cache.abtasty.com/v1/geoip"
            }
        })
          , p = new l("ip",d)
          , m = () => u.fetch({
            weather: !1
        })
          , g = () => u.getData()
          , f = () => (u.getData() || p.getData())?.ip_address
          , h = () => u.getWaitPromise()
          , y = () => p.getWaitPromise()
    }
    ,
    3002: (t, e, n) => {
        n.d(e, {
            a: () => p,
            g: () => m
        });
        var o = n(648)
          , i = n(3346)
          , a = n(427)
          , r = n(7426)
          , s = n(2484)
          , c = void 0;
        const l = "ABTastyUA"
          , d = {
            timeout: 3e3,
            timeoutName: "userAgentFetchLoop",
            route: "https://dcinfos-cache.abtasty.com/v1/ua-parser"
        }
          , u = () => {
            window.ABTasty.pendingUAParser = !1,
            sessionStorage.setItem(l, ""),
            (0,
            r.fD)(d.timeoutName)
        }
          , p = (t => {
            const e = {
                request: void 0,
                ua: void 0
            };
            return function() {
                let n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (arguments.length > 1 && void 0 !== arguments[1] && arguments[1] && (e.request = void 0,
                e.ua = void 0,
                s.Ks.removeItem(s.b1, l)),
                e.ua)
                    return window.ABTasty.pendingUAParser = !1,
                    e.ua;
                if (!s.Ks.getItem(s.b1, l)) {
                    const o = t => {
                        t && s.Ks.setItem(s.b1, l, JSON.stringify(t)),
                        e.ua = t
                    }
                    ;
                    return n ? (e.request || (e.request = t.apply(c)),
                    e.request.then((t => (o(t),
                    t)))) : (e.request || (e.request = t.apply(c, [o])),
                    e.ua)
                }
                window.ABTasty.pendingUAParser = !1;
                try {
                    const t = JSON.parse(s.Ks.getItem(s.b1, l));
                    return e.ua = t,
                    e.ua
                } catch (t) {
                    return (0,
                    o.FF)(`Error while parsing UserAgent from sessionStorage: ${t}`),
                    e.ua
                }
            }
        }
        )((async function() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : () => {}
            ;
            window.ABTasty.pendingUAParser = !0;
            const e = ( () => {
                try {
                    return new AbortController
                } catch (t) {
                    (0,
                    o.FF)("Could not create AbortController", t)
                }
            }
            )()
              , n = setTimeout(( () => {
                void 0 === p() && (e?.abort(),
                u())
            }
            ), d.timeout);
            return (0,
            r.Dk)(d.timeoutName, n),
            await (0,
            i.J)(d.route, {
                signal: e?.signal
            }).then((t => t.json())).then((e => (window.ABTasty.pendingUAParser = !1,
            (0,
            r.fD)(d.timeoutName),
            t(e),
            e))).catch((e => {
                u(),
                (0,
                o.vV)(`Error while fetching userAgentParser data: ${e}`),
                t(void 0)
            }
            ))
        }
        ))
          , m = async function() {
            let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
              , e = arguments.length > 1 ? arguments[1] : void 0;
            const n = t ? await p(t) : p(t);
            return 0 === e.length ? [n] : e.map((t => (0,
            a.A)(t.split("."), n)))
        }
    }
    ,
    6692: (t, e, n) => {
        n.d(e, {
            bo: () => G,
            H_: () => j,
            $K: () => $
        });
        var o = n(977)
          , i = n(5909)
          , a = n(8987)
          , r = n(1134)
          , s = n(7471)
          , c = n(648)
          , l = n(3595)
          , d = n(8689)
          , u = n(2852);
        const p = (0,
        n(721).c)(( (t, e) => e.join(t)));
        var m = n(5437)
          , g = n(6257)
          , f = n(3847)
          , h = function(t) {
            return t.get = "get",
            t.set = "set",
            t.remove = "remove",
            t
        }(h || {});
        const y = "ABTasty"
          , b = []
          , v = (0,
        f.x)()
          , w = (0,
        f.De)()
          , T = `${v}/cross-domain-iframe.html`
          , x = `[src*="${T}"]`;
        function k() {
            return new Promise(( (t, e) => {
                if (document.querySelectorAll(x).length > 0)
                    return void t();
                window.addEventListener("message", S, !1);
                const n = document.createElement("iframe");
                n.src = T,
                n.onload = function() {
                    t()
                }
                ,
                n.setAttribute("frameborder", "0"),
                n.style.width = "0",
                n.style.height = "0",
                n.style.display = "none";
                const o = document.body || document.head
                  , i = o.childNodes;
                o.insertBefore(n, i[i.length - 1])
            }
            ))
        }
        function O(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            if (e) {
                const n = {
                    resolve: e,
                    name: t.method === h.remove ? `${t.key}-${t.method}` : t.key
                };
                b.push(n)
            }
            document.querySelector(x).contentWindow.postMessage(JSON.stringify(t), "*")
        }
        function S(t) {
            if (t.origin.indexOf(w) < 0 || !t.data || "string" != typeof t.data || !/^\{.*"key":"ABTasty(-remove)?".*\}$/.test(t.data))
                return;
            const e = JSON.parse(t.data)
              , n = b.find((t => t.resolve && t.name === e.key));
            return n && (n.resolve(e),
            n.resolve = null),
            !1
        }
        var _ = n(9294)
          , H = n(7904)
          , A = n(88)
          , E = n(2484)
          , C = n(4502)
          , I = n(9076);
        const L = t => {
            try {
                const e = (document.cookie.match(new RegExp(`(^| |;)${G.getCookieName()}=([^;]+)`,"g")) || []).map((t => t.replace(new RegExp(`(^| |;)${G.getCookieName()}=`), ""))).map((t => unescape(t)));
                if (e.length > 1) {
                    const n = e.map((e => ( (t, e) => {
                        const n = e => {
                            const n = t.find((t => {
                                let {key: n} = t;
                                return n === e
                            }
                            ));
                            return n ? "th" === e ? t => t : n.typeCast : () => {}
                        }
                        ;
                        return e.split("&").map((t => t.split("="))).map((t => {
                            let[e,n] = t;
                            return [e, n]
                        }
                        )).reduce(( (t, e) => {
                            let[o,i] = e;
                            return {
                                ...t,
                                [o]: n(o)(decodeURI(i))
                            }
                        }
                        ), {})
                    }
                    )(t, e)))
                      , o = {};
                    return t.forEach((t => {
                        let {key: e} = t;
                        const i = n.reduce(( (t, n) => (0,
                        l.g)(n[e]) ? t : [...t, n[e]]), []);
                        if (i.every((t => t === i[0])))
                            o[e] = i[0];
                        else
                            switch (e) {
                            case "uid":
                                o[e] = (t => {
                                    t.sort(( (t, e) => {
                                        let {fst: n} = t
                                          , {fst: o} = e;
                                        return n - o
                                    }
                                    ));
                                    const e = t.filter((t => {
                                        let {fst: e} = t;
                                        return e >= 0
                                    }
                                    ));
                                    return e.length > 0 ? e[0].uid : t[0].uid
                                }
                                )(n);
                                break;
                            case "pst":
                                const t = i.some((t => t >= 0));
                                o[e] = t ? Math.min(...i.filter((t => t >= 0))) : i[0];
                                break;
                            case "fst":
                                o[e] = Math.min(...i);
                                break;
                            case "cst":
                            case "ns":
                            case "pvt":
                            case "pvis":
                                o[e] = Math.max(...i);
                                break;
                            case "th":
                                o[e] = (t => {
                                    const e = {};
                                    return t.forEach((t => {
                                        t.split("_").forEach((t => {
                                            const n = t.split(".")[0];
                                            Object.keys(e).indexOf(n) < 0 && (e[n] = t)
                                        }
                                        ))
                                    }
                                    )),
                                    Object.values(e).join("_")
                                }
                                )(i)
                            }
                    }
                    )),
                    (t => {
                        const {path: e} = (0,
                        C.jS)(0);
                        (0,
                        I.F)(m.Cq, (n => n.forEach((n => {
                            a.A.remove(t, {
                                path: e,
                                domain: n
                            })
                        }
                        ))))(window.location.href)
                    }
                    )(G.getCookieName()),
                    Object.entries(o).reduce(( (t, e, n) => t + (n > 0 ? "&" : "") + e.join("=")), "")
                }
                return null
            } catch (t) {
                const e = "Handle duplicated ABTasty cookies error.";
                return c.vV(e),
                null
            }
        }
        ;
        var D = n(8009)
          , N = n(4804)
          , P = n(3340)
          , B = n(9404)
          , R = n(2538)
          , M = n(8445);
        const V = "ABTastyVisitorId";
        n(7765);
        const j = "cookie-ready";
        let q, $ = function(t) {
            return t.uid = "uid",
            t.fst = "fst",
            t.pst = "pst",
            t.cst = "cst",
            t.ns = "ns",
            t.pvt = "pvt",
            t.pvis = "pvis",
            t.th = "th",
            t.eas = "eas",
            t
        }({}), F = function(t) {
            return t.visitorID = "visitorID",
            t.firstSessionTimestamp = "firstSessionTimestamp",
            t.previousSessionTimestamp = "previousSessionTimestamp",
            t.currentSessionTimestamp = "currentSessionTimestamp",
            t.numberOfSessions = "numberOfSessions",
            t.pagesViewedTotal = "pagesViewedTotal",
            t.pagesViewedInSession = "pagesViewedInSession",
            t.testsHistory = "testsHistory",
            t.emotionAiSegment = "emotionAiSegment",
            t
        }({});
        class G {
            dictionary = ( () => [{
                key: $.uid,
                humanKey: F.visitorID,
                value: "",
                typeCast: t => String(t),
                saveable: !0
            }, {
                key: $.fst,
                humanKey: F.firstSessionTimestamp,
                value: 0,
                typeCast: t => Number(t),
                saveable: !1
            }, {
                key: $.pst,
                humanKey: F.previousSessionTimestamp,
                value: -1,
                typeCast: t => Number(t),
                saveable: !1
            }, {
                key: $.cst,
                humanKey: F.currentSessionTimestamp,
                value: 0,
                typeCast: t => Number(t),
                saveable: !1
            }, {
                key: $.ns,
                humanKey: F.numberOfSessions,
                value: 0,
                typeCast: t => Number(t),
                saveable: !1
            }, {
                key: $.pvt,
                humanKey: F.pagesViewedTotal,
                value: 0,
                typeCast: t => Number(t),
                saveable: !1
            }, {
                key: $.pvis,
                humanKey: F.pagesViewedInSession,
                value: 0,
                typeCast: t => Number(t),
                saveable: !1
            }, {
                key: $.th,
                humanKey: F.testsHistory,
                value: {},
                typeCast: this.deserializeTestsHistory,
                saveable: !1
            }])();
            constructor() {
                if (q)
                    return q;
                const {customCookieDomain: t, customCookiePath: e} = (0,
                r.F5)();
                this.sessionCookie = new s.n,
                this.name = G.getCookieName(),
                this.customDomain = t,
                this.customPath = e,
                window.ABTasty.clearCookie = this.clear.bind(this),
                window.ABTasty.clearAllCookies = this.clearAll.bind(this),
                q = this;
                const n = L(this.dictionary);
                return (0,
                l.g)(n) || a.A.set(this.name, n, this.getConfig()),
                q
            }
            static build() {
                return new Promise((async t => {
                    if (q)
                        return t(q);
                    const e = new G;
                    return e.isCrossDomainUsed() ? await new Promise(( (t, e) => {
                        k().then(( () => {
                            O({
                                key: y,
                                identifier: (0,
                                r.pw)(),
                                method: h.get
                            }, t)
                        }
                        ))
                    }
                    )).then((async t => await e.crossCookieMerge(t.value, e.sessionCookie))) : await e.setUp(e.sessionCookie),
                    "function" != typeof window.ABTasty.getCampaignHistory && (window.ABTasty.getCampaignHistory = () => e.getCampaignHistory()),
                    t(q || e)
                }
                ))
            }
            async clearAllStorage(t) {
                let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                E.Ks.clear(e),
                t.resetDictionary(),
                t.clear(),
                this.clear(),
                await (this.isCrossDomainUsed() ? new Promise(( (t, e) => {
                    k().then(( () => {
                        O({
                            key: y,
                            identifier: (0,
                            r.pw)(),
                            method: h.remove
                        }, t)
                    }
                    ))
                }
                )) : null)
            }
            setUp(t) {
                let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null
                  , n = e;
                return null != e && "" !== e.trim() || (n = (new g.x).getFromLocalStorage(this.name),
                (null === n || (0,
                _.Gr)() && (0,
                H.hL)()) && (n = a.A.get(this.name) || n)),
                this.assureVisitorId(n).then((async e => {
                    if (!e && n) {
                        this.load(n, this.getVisitorId());
                        const e = this.calculateExpires();
                        e.getTime() - (new Date).getTime() <= 0 ? (await this.clearAllStorage(t, [V]),
                        this.resetDictionary(),
                        G.resetInstance(),
                        q = await G.build()) : this.expires = e
                    } else
                        this.clearAllStorage(t, [V, M.ok.HIT_HISTORY_SESSION]),
                        this.sessionCookie = new s.n(!0),
                        this.sessionCookie.save();
                    return G.cookieReady || (G.cookieReady = !0,
                    (0,
                    B.IF)(j)),
                    !0
                }
                ))
            }
            static getCookieName() {
                return "ABTasty"
            }
            static exists() {
                return !!(0,
                A.to)(E.Sd, this.getCookieName()) || !!a.A.get(this.getCookieName())
            }
            static getRawData() {
                return (0,
                A.to)(E.Sd, this.getCookieName()) || a.A.get(this.getCookieName())
            }
            static hasVisitorIdStored() {
                return G.exists() && new RegExp(`${$.uid}=[^&]+&`).test(G.getRawData())
            }
            async crossCookieMerge(t, e) {
                if (!t || null == t) {
                    return void (await this.setUp(e) && this.save(!0))
                }
                let n = (new g.x).getFromLocalStorage(this.name);
                if ((null === n || (0,
                _.Gr)() && (0,
                H.hL)()) && (n = a.A.get(this.name)),
                !n || null === n) {
                    return void (await this.setUp(e, t) && this.save(!0))
                }
                const o = t.split("&").find((t => "th" === t.split("=")[0]));
                if (!o)
                    return this.load(n);
                const i = o.split("=")[1]
                  , r = n.split("&").find((t => "th" === t.split("=")[0])) || "";
                i.split("_").map((t => {
                    r.indexOf(t.split(".")[0]) >= 0 || (n = n + "_" + t)
                }
                ));
                await this.setUp(e, n) && this.save(!0)
            }
            matchUrlSettings() {
                return (0,
                r.cR)().some((t => {
                    let {includeOrExclude: e, url: n, method: o} = t;
                    return "exclude" !== e && (0,
                    m.wM)(o, n)
                }
                ))
            }
            get(t) {
                return this.dictionary.find((e => e.key === t || e.humanKey === t))
            }
            set(t, e) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                null == n ? this.get(t).value = e : this.get(t).value[n] = e
            }
            setSaveable(t, e) {
                t.forEach((t => {
                    this.get(t).saveable = e
                }
                ))
            }
            incr(t, e) {
                const n = this.get(t);
                n.value = n.value + e
            }
            resetDictionary() {
                this.dictionary.forEach((t => {
                    const e = ( () => {
                        switch (t.key) {
                        case $.pst:
                            return "-1";
                        case $.ns:
                            return "1";
                        default:
                            return ""
                        }
                    }
                    )();
                    t.value = t.typeCast(e)
                }
                ))
            }
            load(t, e) {
                try {
                    unescape(t).split("&").map((t => t.split("="))).map((t => {
                        let[n,o] = t;
                        return n === $.uid && e ? [n, e] : [n, o]
                    }
                    )).forEach((t => {
                        let[e,n] = t;
                        if (void 0 !== this.get(e))
                            return e === $.eas && n.length > 50 ? ((0,
                            c.FF)(`Cookie key 'eas' is too large ${n.length} char (> 50 char) ; removing it from the cookie: `, n),
                            void (this.get(e).value?.length > 50 && this.set(e, ""))) : void this.set(e, this.get(e).typeCast(decodeURI(n)));
                        (0,
                        c.FF)(`Cookie key '${e}' is unknown ; removing it from the cookie.${n ? ` Value attached '${n}'.` : ""}`)
                    }
                    )),
                    this.removePausedTests()
                } catch (t) {
                    (0,
                    c.vV)(`Error loading the cookie. ${t}`),
                    this.resetDictionary()
                }
            }
            removePausedTests() {
                const t = (0,
                r.yn)();
                if (!t || !t.obsoletes)
                    return [];
                const e = [];
                return Object.keys(this.get(F.testsHistory).value).forEach((n => {
                    t.obsoletes.includes(parseInt(n, 10)) && (this.removeCampaign(n),
                    e.push(parseInt(n, 10)))
                }
                )),
                this.save(),
                e
            }
            getVisitorId() {
                return this.get(F.visitorID).value
            }
            getCampaignHistory() {
                const t = this.getCampaigns()
                  , e = {}
                  , n = [4581, 8924, 47674].includes((0,
                r.bA)());
                return Object.keys(t).filter((t => n || void 0 !== (0,
                r.yn)().tests[t])).filter((e => t[e].variationID !== N.me.Untracked)).map((n => {
                    const i = (0,
                    r.yn)().tests[n];
                    return void 0 !== i && i.parentID > 0 && (0,
                    r.yn)().tests[i.parentID]?.type === o.cz.multipage && (e[i.parentID] = t[n].variationID !== N.me.Original ? String(i.variations[t[n].variationID].masterVariationId) : "0"),
                    e[n] = String(t[n].variationID)
                }
                )),
                e
            }
            getCampaign(t) {
                return this.get(F.testsHistory).value[t]
            }
            getCampaigns() {
                return this.get(F.testsHistory).value
            }
            setCampaign(t, e) {
                this.set(F.testsHistory, e, t)
            }
            removeCampaign(t) {
                delete this.get(F.testsHistory).value[t]
            }
            getFirstSessionTimestamp() {
                return this.get(F.firstSessionTimestamp).value
            }
            getCurrentSessionTimestamp() {
                return this.get(F.currentSessionTimestamp).value
            }
            getPreviousSessionTimestamp() {
                return this.get(F.previousSessionTimestamp).value
            }
            getNumberOfSessions() {
                return this.get(F.numberOfSessions).value
            }
            getPagesViewedInSession() {
                return this.get(F.pagesViewedInSession).value
            }
            hasSeenCampaign(t, e) {
                const n = this.getCampaign(t);
                return !!n && ((0,
                l.g)(e) ? n.variationID !== N.me.Untracked : n.variationID === e)
            }
            isValid(t) {
                return /^uid=.*&fst=[0-9]{13,}&pst=(-1|[0-9]{13,})&cst=[0-9]{13,}&ns=[0-9]\d*&pvt=[1-9]\d*&pvis=[1-9]\d*&th=(\d+\.(-1|\d)+\.[1-9]\d*\.[0-9]\d*\.[1-9]\d*\.[1|0]\.[0-9]{13,}\.[0-9]{13,}\.[1|0]_?)*$/.test(t)
            }
            calculateExpires() {
                const t = (0,
                r.B9)()
                  , e = this.getFirstSessionTimestamp()
                  , n = e > 0 ? new Date(e) : new Date;
                return new Date(n.setMonth(n.getMonth() + t))
            }
            getConfig() {
                return (0,
                C.jS)(this.expires || this.calculateExpires())
            }
            clear() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                delete window.ABTasty.temporaryCookieValues?.[this.name],
                t === H.rb || (0,
                l.g)(t) && (0,
                H.og)() ? (new g.x).removeLocalStorage(this.name) : a.A.remove(this.name, this.getConfig())
            }
            clearAll() {
                this.clear(),
                (new s.n).clear()
            }
            static resetInstance() {
                q = null
            }
            static getInstance() {
                return q
            }
            encodeValue(t) {
                return null != t && "object" == typeof t ? this.serializeTestsHistory(t) : encodeURI(t)
            }
            async save() {
                let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (!G.cookieReady && !t)
                    return;
                this.setSaveable([F.visitorID], true);
                const e = this.dictionary.map((t => t.saveable ? [`${t.key}=${this.encodeValue(t.value)}`] : null)).filter((t => !(0,
                l.g)(t))).join("&");
                if (!(new D.NO).haveConsent([D.rv.storage]))
                    return (0,
                    l.g)(window.ABTasty.temporaryCookieValues) && (window.ABTasty.temporaryCookieValues = {}),
                    void (window.ABTasty.temporaryCookieValues[this.name] = {
                        value: e,
                        config: this.getConfig()
                    });
                const n = (0,
                H.og)();
                e !== (n ? (new g.x).getFromLocalStorage(this.name) : a.A.get(this.name)) && (n ? (new g.x).updateLocalStorage(this.name, e) : a.A.set(this.name, e, this.getConfig()),
                this.isCrossDomainUsed() && !t && function(t) {
                    new Promise(( (e, n) => {
                        k().then(( () => {
                            O({
                                key: y,
                                value: t,
                                identifier: (0,
                                r.pw)(),
                                method: h.set
                            }, e)
                        }
                        ))
                    }
                    ))
                }(e),
                (0,
                _.Gr)() ? n || (new g.x).updateLocalStorage(this.name, e) : this.clear(n ? H.ai : H.rb),
                (0,
                c.SW)("Saving data to " + (n ? "localStorage" : "cookie"), e))
            }
            isFirstSession() {
                return 0 === this.get(F.numberOfSessions).value
            }
            isNewSession() {
                return this.sessionCookie.isNewSession
            }
            pageView() {
                const t = new s.n
                  , e = new g.x;
                this.incr(F.pagesViewedTotal, 1);
                const n = Date.now();
                t.isNewSession ? (this.isFirstSession() ? (this.set(F.firstSessionTimestamp, n),
                this.assureVisitorId()) : this.set(F.previousSessionTimestamp, this.get(F.currentSessionTimestamp).value),
                (0,
                R.e)() && E.Ks.setItem(E.b1, M.ok.SESSION_DATA, JSON.stringify({
                    [M.pi.CURRENT_SESSION_TIMESTAMP]: n
                })),
                this.set(F.currentSessionTimestamp, n),
                this.incr(F.numberOfSessions, 1),
                this.set(F.pagesViewedInSession, 1)) : (this.incr(F.pagesViewedInSession, 1),
                0 === this.getFirstSessionTimestamp() && this.set(F.firstSessionTimestamp, n),
                0 === this.getCurrentSessionTimestamp() && ((0,
                R.e)() && E.Ks.setItem(E.b1, M.ok.SESSION_DATA, JSON.stringify({
                    [M.pi.CURRENT_SESSION_TIMESTAMP]: n
                })),
                this.set(F.currentSessionTimestamp, n))),
                e.addVisitedPage(this)(),
                this.save()
            }
            assureVisitorId(t) {
                return new Promise(( (e, n) => e(( () => !(((0,
                d.I)(this.getVisitorId()) ? t?.match(new RegExp(`${$.uid}=([^&]+)`))?.[1] || G.getRawData()?.match(new RegExp(`${$.uid}=([^&]+)`))?.[1] || null : this.getVisitorId()) || !(0,
                d.I)(this.getVisitorId())) && (this.set(F.visitorID, (0,
                i.generateId)()),
                !0))())))
            }
            campaignView(t, e, n) {
                let o = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
                const i = new s.n
                  , a = this.getCampaign(t);
                [P.B.timeout, P.B.failedLoading].includes(n) || (a ? this.setCampaign(t, {
                    variationID: e,
                    nbSeenTotal: a.nbSeenTotal + 1,
                    nbSeenInSession: i.isNewSession ? 1 : a.nbSeenInSession + 1,
                    nbSessions: i.isNewSession ? a.nbSessions + 1 : a.nbSessions,
                    currentlyApplied: 1,
                    firstViewTimestamp: a.firstViewTimestamp,
                    lastViewTimestamp: Date.now(),
                    randomAllocation: a.randomAllocation,
                    lastSessionSeen: this.getNumberOfSessions()
                }) : this.setCampaign(t, {
                    variationID: e,
                    nbSeenTotal: 1,
                    nbSeenInSession: 1,
                    nbSessions: 1,
                    currentlyApplied: 1,
                    firstViewTimestamp: Date.now(),
                    lastViewTimestamp: Date.now(),
                    randomAllocation: o ? 1 : 0,
                    lastSessionSeen: this.getNumberOfSessions()
                })),
                this.save()
            }
            serializeTestsHistory(t) {
                return Object.keys(t).map((e => {
                    const n = t[e];
                    return [e, n.variationID, n.nbSeenTotal, n.nbSeenInSession, n.nbSessions, n.currentlyApplied, n.firstViewTimestamp, n.lastViewTimestamp, n.randomAllocation, n.lastSessionSeen]
                }
                )).map(p(".")).join("_")
            }
            deserializeTestsHistory(t) {
                return t.split("_").filter((t => !(0,
                d.I)(t))).map((0,
                u.l)(".")).reduce(( (t, e) => (t[Number(e[0])] = {
                    variationID: Number(e[1]),
                    nbSeenTotal: Number(e[2]),
                    nbSeenInSession: Number(e[3]),
                    nbSessions: Number(e[4]),
                    currentlyApplied: Number(e[5]),
                    firstViewTimestamp: Number(e[6]),
                    lastViewTimestamp: Number(e[7]),
                    randomAllocation: Number(e[8]),
                    lastSessionSeen: Number(e[9])
                },
                t)), {})
            }
            isCrossDomainUsed() {
                return (0,
                r.cR)().length > 0 && this.matchUrlSettings()
            }
            getEmotionAiSegment() {
                return this.get(F.emotionAiSegment).value
            }
            setEmotionAiSegment(t) {
                if (t.length <= 50)
                    return this.set(F.emotionAiSegment, t),
                    this.save();
                (0,
                c.NI)(`[Cookie] 'eas' key not saved due to large value (> 50 char): was ${t.length} with value ${t}`)
            }
        }
    }
    ,
    7471: (t, e, n) => {
        n.d(e, {
            n: () => p,
            t: () => u
        });
        var o = n(8987)
          , i = n(3595)
          , a = n(1134)
          , r = n(648)
          , s = n(4502)
          , c = n(8009);
        let l, d, u = function(t) {
            return t.mrasn = "mrasn",
            t.referrer = "referrer",
            t.landingPage = "lp",
            t
        }({});
        class p {
            dictionary = ( () => [{
                key: u.mrasn,
                value: "",
                typeCast: t => String(t)
            }])();
            constructor() {
                let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (this.dictionary.push({
                    key: u.landingPage,
                    value: window.location.href,
                    typeCast: t => String(t)
                }),
                l && !t)
                    return l;
                const {customCookieDomain: e, customCookiePath: n} = (0,
                a.F5)();
                this.name = p.getCookieName(),
                this.customDomain = e,
                this.customPath = n;
                const o = this.getCookieValue();
                return o ? (this.isNewSession = !1,
                void 0 === d && (d = !1),
                this.load(o)) : (this.isNewSession = !0,
                void 0 === d && (d = !0),
                this.setLandingPage(this.decodeURIComponentSafely(window.location.href))),
                l = this,
                window.ABTasty.clearSessionCookie = this.clear.bind(this),
                this.save(),
                l
            }
            isEncoded(t) {
                return (t = t || "") !== decodeURIComponent(t)
            }
            fullyDecodeURI(t) {
                for (; this.isEncoded(t); )
                    t = decodeURIComponent(t);
                return t
            }
            decodeURIComponentSafely(t) {
                try {
                    return this.fullyDecodeURI(t)
                } catch (e) {
                    try {
                        return this.fullyDecodeURI(decodeURIComponent(t))
                    } catch (e) {
                        return t
                    }
                }
            }
            static getCookieName() {
                return "ABTastySession"
            }
            getCookieValue() {
                return (new c.NO).haveConsent([c.rv.storage]) || (0,
                i.g)(window.ABTasty.temporaryCookieValues) || (0,
                i.g)(window.ABTasty.temporaryCookieValues[this.name]) ? o.A.get(this.name) : window.ABTasty.temporaryCookieValues[this.name].value
            }
            get(t) {
                return this.dictionary.find((e => e.key === t))
            }
            set(t, e) {
                this.get(t).value = e,
                this.save()
            }
            incr(t, e) {
                const n = this.get(t);
                n.value = n.value + e,
                this.save()
            }
            resetDictionary() {
                this.dictionary.forEach((t => {
                    switch (t.key) {
                    case u.referrer:
                        t.value = t.typeCast("");
                        break;
                    case u.landingPage:
                        t.value = t.typeCast(window.location.href);
                        break;
                    default:
                        t.value = t.typeCast("")
                    }
                }
                ))
            }
            load(t) {
                try {
                    const e = new RegExp(this.dictionary.map((t => `(${t.key}=.*)`)).join("&"));
                    t.match(e).slice(1).map(( (t, e) => {
                        const n = new RegExp(`(${this.dictionary[e].key})=(.*)`);
                        return t.match(n).slice(1)
                    }
                    )).forEach((t => {
                        let[e,n] = t;
                        void 0 !== this.get(e) ? this.set(e, this.get(e).typeCast(decodeURIComponent(n))) : (0,
                        r.FF)(`Session cookie key '${e}' is unknown ; removing it from the cookie.${n ? ` Value attached '${n}'.` : ""}`)
                    }
                    ))
                } catch (t) {
                    (0,
                    r.vV)("Error loading the session cookie.", t),
                    this.resetDictionary(),
                    this.isNewSession = !0,
                    void 0 === d && (d = !0)
                }
            }
            save() {
                const t = this.dictionary.map((t => [`${t.key}=${encodeURIComponent(t.value)}`])).join("&");
                if (this.isValid(t)) {
                    if (!(new c.NO).haveConsent([c.rv.storage]))
                        return (0,
                        i.g)(window.ABTasty.temporaryCookieValues) && (window.ABTasty.temporaryCookieValues = {}),
                        void (window.ABTasty.temporaryCookieValues[this.name] = {
                            value: t,
                            config: this.getConfig()
                        });
                    o.A.set(this.name, t, this.getConfig())
                } else
                    (0,
                    r.vV)("Session cookie cannot be saved, incorrect value", t)
            }
            clear() {
                delete window.ABTasty?.temporaryCookieValues?.[this.name],
                o.A.remove(this.name, this.getConfig())
            }
            isValid(t) {
                return !0
            }
            getConfig() {
                const t = new Date((new Date).getTime() + 18e5);
                return (0,
                s.jS)(t)
            }
            setMrasn(t) {
                this.set(u.mrasn, t)
            }
            getMrasn() {
                return this.get(u.mrasn).value
            }
            setLandingPage(t) {
                this.set(u.landingPage, t)
            }
            getLandingPage() {
                return this.get(u.landingPage).value
            }
            getReferrer() {
                return ""
            }
            isItNewSession() {
                return d
            }
        }
    }
    ,
    6257: (t, e, n) => {
        n.d(e, {
            x: () => l
        });
        var o = n(648)
          , i = n(3595)
          , a = n(8689)
          , r = n(88)
          , s = n(2484)
          , c = n(3476);
        class l {
            constructor() {}
            setEmotionAiData(t, e) {
                const n = this.getABTastyData();
                this.updateLocalStorage(c.d.LOCAL_STORAGE, JSON.stringify({
                    ...n,
                    [c.d.EMOTION_AI]: {
                        ...n[c.d.EMOTION_AI],
                        [t]: e
                    }
                }))
            }
            getEmotionAiData() {
                return this.getABTastyData()[c.d.EMOTION_AI] || {}
            }
            getABTastyData() {
                try {
                    return JSON.parse(this.getFromLocalStorage(c.d.LOCAL_STORAGE)) || {}
                } catch (t) {
                    return (0,
                    o.FF)("Could not parse ABTastyData.", t),
                    {}
                }
            }
            getItemFromABTastyData(t) {
                return this.getABTastyData()[t]
            }
            getActionTrackings() {
                return this.getABTastyData() && this.getABTastyData()[c.d.ACTION_TRACKING]
            }
            addActionTracking(t) {
                this.addItemToABTastyData(c.d.ACTION_TRACKING, t)
            }
            getTransactions() {
                return this.getABTastyData() && this.getABTastyData()[c.d.TRANSACTION]
            }
            addTransaction(t) {
                this.addItemToABTastyData(c.d.TRANSACTION, t)
            }
            getItems() {
                return this.getABTastyData() && this.getABTastyData()[c.d.ITEM]
            }
            addItem(t) {
                this.addItemToABTastyData(c.d.ITEM, t)
            }
            getSegments() {
                return this.getABTastyData()[c.d.SEGMENT]
            }
            addSegment(t) {
                this.addItemToABTastyData(c.d.SEGMENT, t)
            }
            setSegments(t) {
                const e = this.getABTastyData();
                this.updateLocalStorage(c.d.LOCAL_STORAGE, JSON.stringify({
                    ...e,
                    [c.d.SEGMENT]: t
                }))
            }
            getCustomVariables() {
                return this.getABTastyData() && this.getABTastyData()[c.d.CUSTOM_VARIABLE]
            }
            addCustomVariable(t) {
                this.addItemToABTastyData(c.d.CUSTOM_VARIABLE, t)
            }
            getVisitedPages() {
                return this.getABTastyData() && this.getABTastyData()[c.d.VISITED_PAGES]
            }
            editLastVisitedPage(t) {
                const e = this.getVisitedPages();
                if ((0,
                i.g)(e) || (0,
                a.I)(e))
                    return;
                const n = e[e.length - 1];
                e[e.length - 1] = {
                    ...n,
                    ...t
                };
                const o = this.getABTastyData();
                this.updateLocalStorage(c.d.LOCAL_STORAGE, JSON.stringify({
                    ...o,
                    [c.d.VISITED_PAGES]: e
                }))
            }
            addVisitedPage = t => {
                var e = this;
                return function() {
                    let n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document.location.href
                      , o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document.title;
                    const i = {
                        url: n,
                        visite: t.getNumberOfSessions(),
                        time: Date.now(),
                        title: o
                    };
                    e.addItemToABTastyData(c.d.VISITED_PAGES, i),
                    (0,
                    a.I)(o) && (0,
                    r.Yx)(( () => !(0,
                    a.I)(document.title)), ( () => e.editLastVisitedPage({
                        title: document.title
                    })))
                }
            }
            ;
            addVote(t) {
                const e = "maxScore"in t ? c.d.CSAT_VOTES : c.d.NPS_VOTES
                  , n = this.getABTastyData();
                let o = n[e] || [];
                const i = o.findIndex((e => {
                    let {caid: n} = e;
                    return n === t.caid
                }
                ));
                -1 === i ? o = [...o, t] : o[i] = t,
                this.updateLocalStorage(c.d.LOCAL_STORAGE, JSON.stringify({
                    ...n,
                    [e]: o
                }))
            }
            getVotes(t) {
                return this.getABTastyData() && this.getABTastyData()[t]
            }
            addItemToABTastyData(t, e) {
                const n = this.getABTastyData();
                n[t] && Array.isArray(n[t]) || (n[t] = []),
                n[t].push(e),
                this.updateLocalStorage(c.d.LOCAL_STORAGE, JSON.stringify(n))
            }
            updateLocalStorage(t, e) {
                return s.Ks.setItem(s.Sd, t, e)
            }
            getFromLocalStorage(t) {
                return s.Ks.getItem(s.Sd, t)
            }
            removeLocalStorage(t) {
                return s.Ks.removeItem(s.Sd, t)
            }
        }
    }
    ,
    3476: (t, e, n) => {
        n.d(e, {
            a: () => i,
            d: () => o
        });
        let o = function(t) {
            return t.LOCAL_STORAGE = "ABTastyData",
            t.ACTION_TRACKING = "ActionTracking",
            t.CUSTOM_VARIABLE = "CV",
            t.ITEM = "items",
            t.SEGMENT = "segments",
            t.TRANSACTION = "transactions",
            t.VISITED_PAGES = "VisitedPages",
            t.CSAT_VOTES = "CsatVotes",
            t.NPS_VOTES = "NpsVotes",
            t.EMOTION_AI = "eai",
            t
        }({})
          , i = function(t) {
            return t.CV = "cv",
            t.ECO = "eco",
            t
        }({})
    }
    ,
    2492: (t, e, n) => {
        n.d(e, {
            E: () => r
        });
        var o = n(88)
          , i = n(2484)
          , a = n(8445);
        class r {
            constructor() {}
            getItems(t) {
                return (0,
                o.to)("sessionStorage", t)
            }
            addItem(t, e) {
                (0,
                o.nf)("sessionStorage", t, e)
            }
            getHitHistorySession() {
                return JSON.parse(i.Ks.getItem(i.b1, a.ok.HIT_HISTORY_SESSION) || "{}")
            }
            setHitHistorySession(t, e, n) {
                const o = this.getHitHistorySession();
                if (o[t]?.includes(e))
                    return o;
                const r = n ? o[t] && o.cst === n ? {
                    ...o,
                    [t]: [...o[t], e]
                } : {
                    ...o,
                    cst: n,
                    [t]: [e]
                } : o[t] ? {
                    ...o,
                    [t]: [...o[t], e]
                } : {
                    ...o,
                    [t]: [e]
                };
                return i.Ks.setItem(i.b1, a.ok.HIT_HISTORY_SESSION, JSON.stringify(r)),
                r
            }
            getHitHistorySessionCst() {
                return this.getHitHistorySession().cst
            }
            checkHitHistorySession(t, e) {
                const n = this.getHitHistorySession();
                return !!n[t] && n[t]?.includes(e) || !1
            }
            cleanHitHistorySession(t) {
                const e = this.getHitHistorySession()
                  , n = Object.entries(e).filter((e => {
                    let[n] = e;
                    return n !== t
                }
                ));
                Object.keys(n).length > 0 ? i.Ks.setItem(i.b1, a.ok.HIT_HISTORY_SESSION, JSON.stringify(n.reduce(( (t, e) => {
                    let[n,o] = e;
                    return {
                        ...t,
                        [n]: o
                    }
                }
                ), {}))) : i.Ks.removeItem(i.b1, a.ok.HIT_HISTORY_SESSION)
            }
        }
    }
    ,
    8445: (t, e, n) => {
        n.d(e, {
            _V: () => i,
            ok: () => o,
            pi: () => a
        });
        let o = function(t) {
            return t.CUSTOM_IDENTITIES = "ABTastyCustomIdentities",
            t.CUSTOM_SEGMENTS = "ABTastyCustomSegments",
            t.HIT_HISTORY_SESSION = "ABTastySessionHitHistory",
            t.SESSION_DATA = "ABTastySession",
            t
        }({})
          , i = function(t) {
            return t.CURRENT_SESSION_TIMESTAMP = "cst",
            t.CAMPAIGNS = "campaigns",
            t.TROUBLESHOOT = "troubleshoot",
            t.PERFORMANCE = "performance",
            t
        }({})
          , a = function(t) {
            return t.CURRENT_SESSION_TIMESTAMP = "cst",
            t
        }({})
    }
    ,
    2484: (t, e, n) => {
        n.d(e, {
            Ks: () => p,
            Sd: () => c,
            b1: () => l
        });
        var o = n(648)
          , i = n(88)
          , a = n(117)
          , r = n(1134)
          , s = n(8009);
        const c = "localStorage"
          , l = "sessionStorage";
        function d() {
            return !!(new s.NO).haveConsent([s.rv.storage]) || !(!(0,
            r.F5)().waitForConsent || "disabled" !== (0,
            r.F5)().waitForConsent.mode)
        }
        function u(t) {
            const e = /^(ab\s?tasty)/i;
            let n = "";
            for (let o = window[t].length - 1; o >= 0; o--)
                n = window[t].key(o),
                n.match(e) && (this.data[t][n] = window[t][n],
                (0,
                i.DC)(t, n))
        }
        const p = {
            state: {
                inmemory: !0
            },
            data: {
                localStorage: {},
                sessionStorage: {}
            },
            migrate: function() {
                switch (d() ? "browser" : "memory") {
                case "browser":
                    if (!this.state.inmemory)
                        return;
                    Object.keys(this.data).forEach((t => {
                        Object.keys(this.data[t]).forEach((e => {
                            (0,
                            i.nf)(t, e, this.data[t][e])
                        }
                        ))
                    }
                    )),
                    this.state.inmemory = !1,
                    (0,
                    o.fH)("Data storage: data has been written in storage thanks to consent validation.");
                    break;
                case "memory":
                    u.call(this, "localStorage"),
                    u.call(this, "sessionStorage"),
                    this.state.inmemory = !0,
                    (0,
                    o.fH)("Data storage: data has been put in memory due to consent revoked.")
                }
            },
            setItem: function(t, e, n) {
                this.state.inmemory && d() && this.migrate(),
                this.state.inmemory ? this.data[t] = Object.assign(this.data[t], {
                    [e]: n
                }) : (0,
                i.nf)(t, e, n)
            },
            getItem: function(t, e) {
                return this.state.inmemory && d() && this.migrate(),
                this.state.inmemory ? (0,
                a.X)(null, [t, e], this.data) : (0,
                i.to)(t, e) || null
            },
            removeItem: function(t, e) {
                this.state.inmemory && d() && this.migrate(),
                this.state.inmemory ? delete this.data[t][e] : (0,
                i.DC)(t, e)
            },
            clear: function() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                const e = /^(ab\s?tasty)/i;
                [c, l].forEach((n => {
                    Object.keys(window[n]).forEach((o => {
                        !t.includes(o) && e.test(o) && this.removeItem(n, o)
                    }
                    ))
                }
                ))
            },
            setState: function(t, e) {
                this.state[t] = e
            }
        }
    }
    ,
    2538: (t, e, n) => {
        n.d(e, {
            e: () => i
        });
        var o = n(1134);
        const i = () => {
            const {cookielessEnabled: t} = (0,
            o.F5)();
            return t
        }
    }
    ,
    4502: (t, e, n) => {
        n.d(e, {
            jS: () => s,
            rh: () => c
        });
        var o = n(8987)
          , i = n(9294)
          , a = n(5437)
          , r = n(1134);
        function s(t) {
            const {isSecureCookie: e, customCookieDomain: n, customCookiePath: o} = (0,
            r.F5)();
            return {
                expires: t,
                path: o || "/",
                domain: n || (0,
                a.R2)() || void 0,
                secure: e || (0,
                i.GW)() || !1,
                samesite: e || (0,
                i.GW)() ? "none" : "lax"
            }
        }
        function c(t, e) {
            const n = "ABTastyCookieQuickTest"
              , i = `${t}${n}`;
            let a = !1;
            o.A.set(e, i, s(388));
            try {
                a = document.cookie.indexOf(n) > -1,
                t && a ? o.A.set(e, t, s(388)) : o.A.remove(e, s(1))
            } catch (t) {
                o.A.remove(e, s(1))
            }
            return a
        }
    }
    ,
    7904: (t, e, n) => {
        n.d(e, {
            BZ: () => p,
            Ey: () => u,
            ai: () => l,
            hL: () => g,
            og: () => m,
            rb: () => c
        });
        var o = n(8987)
          , i = n(1134)
          , a = n(648)
          , r = n(4502)
          , s = n(6692);
        const c = "local"
          , l = "cookies"
          , d = 3900;
        function u() {
            if ((0,
            i.AU)()) {
                const t = o.A.get(s.bo.getCookieName());
                if (t && t.length >= d)
                    return (0,
                    a.FF)("Cookies size is too big, ABTasty tag stopped execution."),
                    !1;
                if (!(0,
                r.rh)(t, s.bo.getCookieName())) {
                    const {domain: t, path: e, secure: n} = (0,
                    r.jS)(0)
                      , o = [t && !`.${window.location.hostname}`.includes(t) ? `domain ${t}` : null, "/" !== e ? `path ${e}` : null];
                    return n && !window.isSecureContext ? ((0,
                    a.FF)("ABTasty data can't be saved to cookie, ABTasty tag stopped execution. A custom configuration ask to use secure cookie but page context is not secure."),
                    !1) : o.find((t => t)) ? ((0,
                    a.FF)(`ABTasty data can't be saved to cookie, ABTasty tag stopped execution. A custom configuration with ${o.filter((t => t)).join(" and ")} is set for this account. Please check it matches the current URL.`),
                    !1) : ((0,
                    a.FF)(`ABTasty data can't be saved to cookie on domain ${t} and path ${e}, ABTasty tag stopped execution.`),
                    !1)
                }
            }
            return !0
        }
        function p() {
            const t = (m() && null != localStorage && null != localStorage.setItem && null != localStorage.getItem || g() && navigator.cookieEnabled) && null != sessionStorage && null != sessionStorage.setItem && null != sessionStorage.getItem;
            return t || (0,
            a.FF)("AB Tasty script encountered an error: LocalStorage, SessionStorage & Cache option aren't allowed on this browser. Execution has stopped."),
            t
        }
        function m() {
            const {storageMode: t} = (0,
            i.F5)();
            return t === c
        }
        function g() {
            return (0,
            i.F5)().storageMode === l
        }
    }
    ,
    3621: (t, e) => {
        var n;
        !function(t) {
            t.Cookie = "cookie",
            t.LocalStorage = "local_storage",
            t.JSVariable = "js_variable"
        }(n || (n = {}))
    }
    ,
    108: (t, e) => {
        var n, o;
        e.gp = e.Ey = void 0,
        function(t) {
            t.anyCookie = "any_cookie",
            t.customJs = "custom_js",
            t.didomi = "didomi",
            t.disabled = "disabled",
            t.specificCookie = "specific_cookie",
            t.thirdParty = "third_party",
            t.userAction = "user_action",
            t.customEvent = "custom_event"
        }(n || (e.Ey = n = {})),
        function(t) {
            t[t.test = 1] = "test",
            t[t.perso = 2] = "perso",
            t[t.redirection = 4] = "redirection",
            t[t.aa = 8] = "aa",
            t[t.patch = 16] = "patch"
        }(o || (e.gp = o = {}))
    }
    ,
    6916: (t, e) => {
        var n, o;
        e.q = void 0,
        function(t) {
            t.PULL = "pull",
            t.PUSH = "push",
            t.DATALAYER = "datalayer"
        }(n || (e.q = n = {})),
        function(t) {
            t.CUSTOM_TRACKING = "ct",
            t.TRANSACTION_TRACKING = "tt",
            t.CUSTOM_AND_TRANSACTION_TRACKING = "all"
        }(o || (o = {}))
    }
    ,
    9578: (t, e, n) => {
        let o;
        n.d(e, {
            u: () => o
        }),
        function(t) {
            let e = function(t) {
                return t.consentValid = "consentValid",
                t.executedCampaign = "executedCampaign",
                t.tagContentExecuted = "tagContentExecuted",
                t.trackingInitialized = "trackingInitialized",
                t.identityAdded = "identityAdded",
                t.analyticsLoaded = "analyticsLoaded",
                t
            }({});
            t.Name = e;
            let n = function(t) {
                return t.loading = "loading",
                t.complete = "complete",
                t
            }({});
            t.Status = n
        }(o || (o = {}))
    }
    ,
    2147: (t, e) => {
        var n, o;
        e.D0 = e.W8 = e.Wm = e.sz = e.UT = void 0,
        e.UT = 1,
        e.sz = 10,
        e.Wm = 11,
        e.W8 = 40,
        e.D0 = 50,
        function(t) {
            t[t.LOYAL = 1] = "LOYAL",
            t[t.VALUABLE = 2] = "VALUABLE",
            t[t.WANDERERS = 3] = "WANDERERS",
            t[t.DISENGAGED = 4] = "DISENGAGED"
        }(n || (n = {})),
        function(t) {
            t[t.LAST_WEEK = 1] = "LAST_WEEK",
            t[t.LAST_TWO_WEEKS = 2] = "LAST_TWO_WEEKS"
        }(o || (o = {}))
    }
    ,
    977: (t, e) => {
        var n, o, i, a, r, s, c;
        e.SC = e.Vd = e.fH = e.Vp = e.JP = e.qA = e.cz = void 0,
        function(t) {
            t.aa = "aa",
            t.ab = "ab",
            t.multipage = "multipage",
            t.multivariate = "multivariate",
            t.mastersegment = "mastersegment",
            t.subsegment = "subsegment"
        }(n || (e.cz = n = {})),
        function(t) {
            t.simplePersonalization = "sp",
            t.multipagePersonalization = "mpp",
            t.multiexperiencePersonalization = "mep",
            t.patch = "patch",
            t.multipageTest = "mpt",
            t.multivariate = "mvt"
        }(o || (e.qA = o = {})),
        function(t) {
            t.aaTest = "aa",
            t.redirection = "redirection",
            t.patch = "patch"
        }(i || (e.JP = i = {})),
        function(t) {
            t.fastest = "fastest",
            t.waitUntil = "waituntil",
            t.noAjax = "noajax"
        }(a || (e.Vp = a = {})),
        function(t) {
            t.any = "any",
            t.once = "once",
            t.oncePerSession = "once_per_session",
            t.regular = "regular"
        }(r || (e.fH = r = {})),
        function(t) {
            t.day = "day",
            t.week = "week",
            t.session = "session"
        }(s || (e.Vd = s = {})),
        function(t) {
            t.all = "all",
            t.some = "some"
        }(c || (e.SC = c = {}))
    }
    ,
    6158: (t, e, n) => {
        e.Xl = e.uK = e.H7 = e.VE = e.If = void 0;
        const o = n(9469);
        var i, a, r, s, c, l;
        !function(t) {
            t.loading = "loading",
            t.periodic = "periodic",
            t.custom = "custom",
            t.lastEntry = "last_entry"
        }(i || (e.If = i = {})),
        function(t) {
            t[t.lastSession = -1] = "lastSession",
            t[t.pastTwoWeeks = 15] = "pastTwoWeeks",
            t[t.pastMonth = 30] = "pastMonth",
            t[t.pastYear = 390] = "pastYear"
        }(a || (e.VE = a = {})),
        function(t) {
            t.PRODUCT_NUMBER = "product number",
            t.TOTAL_AMOUNT = "total amount"
        }(r || (r = {})),
        function(t) {
            t.EQUAL = "equal",
            t.GREATER = "greater",
            t.LOWER = "lower",
            t.BETWEEN = "between"
        }(s || (s = {})),
        function(t) {
            t.POSITIVE = "positive",
            t.NEUTRAL = "neutral",
            t.NEGATIVE = "negative"
        }(c || (c = {})),
        function(t) {
            t.EQUALS = "equals",
            t.GREATER = "equal_to_or_greater_than",
            t.LOWER = "lower_than_or_equals",
            t.BETWEEN = "between"
        }(l || (l = {})),
        e.H7 = [o.DEVICE, o.BROWSER, o.IP, o.GEOLOCATION, o.WEATHER, o.EULERIAN_DMP],
        e.uK = [o.DEVICE, o.IP, o.GEOLOCATION, o.BROWSER_LANGUAGE, o.LANDING_PAGE, o.BROWSER, o.SOURCE_TYPE, o.PREVIOUS_PAGE, o.SCREEN_SIZE, o.SOURCE, o.NUMBER_PAGES_VIEWED, o.SAME_DAY_VISIT, o.WEATHER, o.ECOMMERCE_VARIABLE, o.URL_PARAMETER, o.KEYWORD, o.ADBLOCK, o.PAGE_VIEW, o.PAGE_INTEREST],
        e.Xl = [o.ENGAGEMENT_LEVEL, o.RETURNING_VISITOR, o.SESSION_NUMBER, o.DAYS_SINCE_FIRST_SESSION, o.DAYS_SINCE_LAST_SESSION, o.GEOLOCATION, o.CONTENT_INTEREST, o.DEVICE, o.ABANDONED_CART, o.CSAT, o.NPS]
    }
    ,
    9469: (t, e) => {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.CONTENT_INTEREST = e.ENGAGEMENT_LEVEL = e.TEALIUM = e.KEYWORD = e.PURCHASE_FREQUENCY = e.LAST_PURCHASE = e.DATALAYER = e.SELECTOR = e.ACTION_TRACKING = e.CUSTOM_VARIABLE = e.BROWSER = e.CODE = e.URL_PARAMETER = e.ECOMMERCE_VARIABLE = e.DAYS_SINCE_FIRST_SESSION = e.DAYS_SINCE_LAST_SESSION = e.WEATHER = e.SESSION_NUMBER = e.ADBLOCK = e.SAME_DAY_VISIT = e.NUMBER_PAGES_VIEWED = e.SOURCE = e.CAMPAIGN_EXPOSITION = e.JS_VARIABLE = e.SCREEN_SIZE = e.PREVIOUS_PAGE = e.SOURCE_TYPE = e.RETURNING_VISITOR = e.LANDING_PAGE = e.BROWSER_LANGUAGE = e.COOKIE = e.GEOLOCATION = e.IP = e.DEVICE = e.SIRDATA_DMP = e.EASYDMP_DMP = e.MAKAZI_DMP = e.LEROYMERLIN_DMP = e.MEDIARITHMICS_DMP = e.LIVERAMP_DMP = e.ADOBE_DMP = e.TEMELIO_DMP = e.WEBORAMA_DMP = e.KRUX_DMP = e.ADVALO_DMP = e.YSANCE_DMP = e.BLUEKAI_DMP = e.CABESTAN_DMP = e.TAGCOMMANDER_DMP = e.EULERIAN_DMP = void 0,
        e.NPS = e.CSAT = e.ABANDONED_CART = e.INTEGRATIONS_PROVIDER = e.PAGE_INTEREST = e.PAGE_VIEW = void 0,
        e.EULERIAN_DMP = 1,
        e.TAGCOMMANDER_DMP = 2,
        e.CABESTAN_DMP = 3,
        e.BLUEKAI_DMP = 4,
        e.YSANCE_DMP = 5,
        e.ADVALO_DMP = 6,
        e.KRUX_DMP = 7,
        e.WEBORAMA_DMP = 8,
        e.TEMELIO_DMP = 9,
        e.ADOBE_DMP = 10,
        e.LIVERAMP_DMP = 11,
        e.MEDIARITHMICS_DMP = 12,
        e.LEROYMERLIN_DMP = 13,
        e.MAKAZI_DMP = 14,
        e.EASYDMP_DMP = 15,
        e.SIRDATA_DMP = 16,
        e.DEVICE = 17,
        e.IP = 18,
        e.GEOLOCATION = 19,
        e.COOKIE = 20,
        e.BROWSER_LANGUAGE = 21,
        e.LANDING_PAGE = 22,
        e.RETURNING_VISITOR = 24,
        e.SOURCE_TYPE = 25,
        e.PREVIOUS_PAGE = 26,
        e.SCREEN_SIZE = 27,
        e.JS_VARIABLE = 28,
        e.CAMPAIGN_EXPOSITION = 29,
        e.SOURCE = 30,
        e.NUMBER_PAGES_VIEWED = 31,
        e.SAME_DAY_VISIT = 32,
        e.ADBLOCK = 33,
        e.SESSION_NUMBER = 34,
        e.WEATHER = 35,
        e.DAYS_SINCE_LAST_SESSION = 36,
        e.DAYS_SINCE_FIRST_SESSION = 37,
        e.ECOMMERCE_VARIABLE = 38,
        e.URL_PARAMETER = 39,
        e.CODE = 40,
        e.BROWSER = 23,
        e.CUSTOM_VARIABLE = 41,
        e.ACTION_TRACKING = 42,
        e.SELECTOR = 43,
        e.DATALAYER = 44,
        e.LAST_PURCHASE = 45,
        e.PURCHASE_FREQUENCY = 46,
        e.KEYWORD = 47,
        e.TEALIUM = 48,
        e.ENGAGEMENT_LEVEL = 49,
        e.CONTENT_INTEREST = 50,
        e.PAGE_VIEW = 51,
        e.PAGE_INTEREST = 52,
        e.INTEGRATIONS_PROVIDER = 53,
        e.ABANDONED_CART = 54,
        e.CSAT = 55,
        e.NPS = 56
    }
}]);
