/* eslint-disable */
const nh010 = () => {
  (function() {
    'use strict';
  
    /**
     * @description Polling Element factory
     * @param {string|function} elm Condition
     * @param {integer} maxDuration In Millisecond
     */
  
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
  
    var createPollingElement = function createPollingElement(_ref) {
      var elm = _ref.elm,
          maxDuration = _ref.maxDuration;
      return {
        elm: elm,
        maxDuration: maxDuration,
  
        /**
         * Helper evaluate a poller expression (function / string) to
         * boolean condition check
         *
         * @param {any} expr    String or function to evaluate
         * @return {boolean}
         */
        expressionValidator: function expressionValidator(expr) {
          if (!expr) {
            throw Error('Invalid poller expression');
          }
  
          var type = typeof expr === 'undefined' ? 'undefined' : _typeof(expr);
  
          switch (type) {
            case 'function':
              return !!expr.call();
            case 'string':
              return !!document.querySelector(expr);
          }
  
          return true;
        },
  
  
        /**
         * Destroy the element (clear future attempts to poll)
         */
        destroy: function destroy() {
          if (this.winTimeout) {
            clearTimeout(this.winTimeout);
          }
        },
  
  
        /**
         * Poll for elm condition met
         *
         * @param {integer} delay
         * @param {float} multiplier
         * @param {function} successCallback
         * @param {function} timeoutCallback
         */
        poll: function poll(delay, multiplier, successCallback, timeoutCallback) {
          var _this = this;
  
          if (!this.startedAt) {
            this.startedAt = new Date().getTime();
          }
  
          var exceedsMaxDuration = this.maxDuration ? this.startedAt + this.maxDuration < new Date().getTime() : false;
  
          if (exceedsMaxDuration) {
            if (typeof timeoutCallback === 'function') {
              timeoutCallback(this.elm);
            }
            this.destroy();
  
            return false;
          }
  
          this.winTimeout = setTimeout(function () {
            if (_this.expressionValidator(_this.elm)) {
              return successCallback(_this);
            } else {
              _this.poll(delay * multiplier, multiplier, successCallback, timeoutCallback);
            }
          }, delay);
        }
      };
    };
  
    /**
     * @module poller 
     * @description Check the existence of elements or some other logic
     * @param {array} elements
     * @param {function} cb Success callback
     * @param {object} options
     * @return {object}
     */
    var poller = function poller(elements, cb, options) {
      var settings = {
        wait: 50,
        multiplier: 1.1,
        timeout: 0,
        timeoutCallback: function timeoutCallback() {}
      };
  
      if (options) {
        for (var option in options) {
          settings[option] = options[option];
        }
      }
  
      var pollingElements = [],
          successfullyPolledElements = [];
  
      for (var i = 0; i < elements.length; i++) {
        var pollingElement = createPollingElement({
          elm: elements[i],
          maxDuration: settings.timeout
        });
  
        pollingElements.push(pollingElement);
  
        pollingElement.poll(settings.wait, settings.multiplier, function (pollingElement) {
          successfullyPolledElements.push(pollingElement);
  
          if (successfullyPolledElements.length === elements.length) {
            cb();
          }
        }, settings.timeoutCallback);
      }
  
      return {
        destroy: function destroy() {
          pollingElements.forEach(function (item) {
            return item.destroy();
          });
        }
      };
    };
  
    /**
     * @module pollerLite
     * @description Lighter version of the poller above. Doesn't include some advanced functionality ({oller Element Factory)
     * @param {array} elements 
     * @param {function} cb 
     * @param {options} options 
     */
  
    /**
     * @module throttle
     * @param {function} func 
     * @param {number} wait 
     */
  
    /**
     * @module group
     * @param {HTMLElement} elements 
     * @param {number} num 
     */
  
    /**
     * @module hoverDelay
     * @param {HTMLElement} elements 
     * @param {function} cb 
     * @param {number} delay 
     */
  
    /**
     * @module observer
     */
  
    /** 
     * @module feedbackTab
     * @description Generates feedback tab component
     */
  
    /** 
     * @module countdown
     * @description Generates countdown component
     */
  
    /*eslint-disable */
    /**
     * @description FullStory tagging
     * @param {string} experiment_str Experiment ID to show in Fullstory
     * @param {string} variation_str Variation number to show in Fullstory
     */
    var fullStory = function fullStory(experiment_str, variation_str) {
      poller([function () {
        var fs = window.FS;
        if (fs && fs.setUserVars) return true;
      }], function () {
        window.FS.setUserVars({
          experiment_str: experiment_str,
          variation_str: variation_str
        });
      }, { multiplier: 1.2, timeout: 0 });
    };
  
    /** 
     * @description Universal GA event sender that works on all client implementations of GA
     * Polls for ga to exist and gets the tracker name from ga.getAll() to ensure
     * events are always sent
     */
    var events = {
      trackerName: false,
      setDefaultCategory: function setDefaultCategory(category) {
        this.category = category;
  
        return this;
      },
      setTrackerName: function setTrackerName(trackerName) {
        this.trackerName = trackerName;
      },
      eventCache: [],
      send: function send(category, action, label, options) {
        options = options || {};
        category = category || this.category;
  
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options.sendOnce) {
          var eventID = category + action + label;
          // Check eventCache to see if this has already been sent
          if (this.eventCache.indexOf(eventID) > -1) {
            return false;
          } else {
            // Store event in cache
            this.eventCache.push(eventID);
          }
        }
  
        var self = this;
        var fire = function fire(tracker) {
          window.ga(tracker + '.send', 'event', category, action, label, { nonInteraction: options.nonInteraction ? options.nonInteraction : true });
        };
  
        if (self.trackerName) {
          fire(self.trackerName);
        } else {
          poller([function () {
            try {
              return !!window.ga.getAll();
            } catch (err) {}
          }], function () {
            self.trackerName = window.ga.getAll()[0].get('name');
            fire(self.trackerName);
          });
        }
      }
    };
  
    /** 
     * @description Binds a toProperCase method to String prototype
     * This method can then be used to convert strings from upper/lowercase to capitalised
     */
  
    /**
     * @description Helper for setting cookies
     * @param {string} c_name Cookie name
     * @param {string} value Cookie value
     * @param {number|null} exdays Number of days before expiry
     * @param {string|null} c_domain Domain to store cookie on
     * @param {string|null} exms Number of ms before expiry
     */
  
    /**
     * @description Helper for getting cookies
     * @param {string} name Cookie name
     */
  
    /**
     * @description Helper for deleting cookies
     * @param {string} name Cookie name
     */
  
    /**
     * @description Sort select options alphabetically by text value (Note: jQuery dependant)
     * @param {jQuery} $ 
     * @param {String|HTMLElement} selector The CSS selector for the 'select' element
     * @param {boolean} skip_first Skips first 'option' in 'select' element as this is sometimes a placeholder
     */
  
    /**
     * @description Adds JS event with older browser compatibility
     * @param {HTMLElement} el Element to add event to
     * @param {string} type Event type
     * @param {function} fn Event handler
     */
  
    /**
     * @description Removes JS event with older browser compatibility
     * @param {HTMLElement} el Element to remove event from
     * @param {string} type Event type
     * @param {function} fn Event handler
     */
  
    /**
     * @description Equivalent to jQuery's .trigger() method
     * @param {HTMLElement} el Element to trigger event on
     * @param {string} type Event to fire
     */
  
    /**
     * @description Converts a string to title case
     * @param {string} str String to convert to title case
     */
  
    /**
     * @description Get coordinates of an element
     * @returns {Object} Coordinates of element
     */
  
    /**
     * @description Scroll to a point on the page
     * @param {number} scrollTargetY Point to scroll to
     * @param {number} speed Speed of scroll in ms
     * @param {number} delay Initial delay before scroll
     * @param {string} easing String defining the easing setting - default: easeOutSine
     */
  
    /**
     * @description Slugify Convert to alphanumeric no spaces lower case string
     * @param {string} text
     * @returns {string}
     */
  
    /**
     * @returns {boolean}
     * @description Is touch device - basic check
     */
  
    /**
     * @description Destroys any pollers in the window.UC.experiments[ID] object
     * Useful for SPAs where code is no longer needed after a page change
     * @param {string} ID - Experiment ID
     */
  
    /** 
     * @param {HTMLElement} element The element you want to track viewability of
     * @param {function} cb Callback function to run once the element is in full view
     * @param {Object} options Settings for the tracker
     * @param {boolean} options.removeOnView Removes scroll tracking when element is in view
     * @param {number} options.throttle Custom throttle timing
     */
  
    /**
     * Helper get url parameter
     */
  
    /**
     * Helper add url parameer
     */
  
    /**
     * @description Equivalent to jQuery's prevAll() method. Traverses backwards
     * and returns an array of all previous siblings
     * @param {HTMLElement} elem 
     * @param {string} filter Selector 
     */
  
    var lightBoxhtml = $('\n    <div class="NH010-lightboxOverlay"/>\n    <div class="NH010-lightbox">\n        <div class="NH010-lightbox-exit">&times;</div>\n        <div class="NH010-content">\n            National Holidays are members are members Bonded Coach Holiday Group of the Confederation of Passenger Transport UK Ltd. This is a government approved consumer protection scheme.\n        </div>\n    </div>');
  
    var NH003 = function NH003() {
      !function () {
        "use strict";
        var e = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
          return typeof e === 'undefined' ? 'undefined' : _typeof(e);
        } : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === 'undefined' ? 'undefined' : _typeof(e);
        },
            t = function t(_t) {
          return { elm: _t.elm, maxDuration: _t.maxDuration, expressionValidator: function expressionValidator(t) {
              if (!t) throw Error("Invalid poller expression");switch (void 0 === t ? "undefined" : e(t)) {case "function":
                  return !!t.call();case "string":
                  return !!document.querySelector(t);}return !0;
            }, destroy: function destroy() {
              this.winTimeout && clearTimeout(this.winTimeout);
            }, poll: function poll(e, t, n, r) {
              var i = this;if (this.startedAt || (this.startedAt = new Date().getTime()), !!this.maxDuration && this.startedAt + this.maxDuration < new Date().getTime()) return "function" == typeof r && r(this.elm), this.destroy(), !1;this.winTimeout = setTimeout(function () {
                if (i.expressionValidator(i.elm)) return n(i);i.poll(e * t, t, n, r);
              }, e);
            } };
        },
            n = function n(e, _n, r) {
          var i = { wait: 50, multiplier: 1.1, timeout: 0, timeoutCallback: function timeoutCallback() {} };if (r) for (var a in r) {
            i[a] = r[a];
          }for (var o = [], s = [], l = 0; l < e.length; l++) {
            var u = t({ elm: e[l], maxDuration: i.timeout });o.push(u), u.poll(i.wait, i.multiplier, function (t) {
              s.push(t), s.length === e.length && _n();
            }, i.timeoutCallback);
          }return { destroy: function destroy() {
              o.forEach(function (e) {
                return e.destroy();
              });
            } };
        },
            r = function r(e, t) {
          n([function () {
            var e = window.FS;if (e && e.setUserVars) return !0;
          }], function () {
            window.FS.setUserVars({ experiment_str: e, variation_str: t });
          }, { multiplier: 1.2, timeout: 0 });
        },
            i = { trackerName: !1, setDefaultCategory: function setDefaultCategory(e) {
            return this.category = e, this;
          }, eventCache: [], send: function send(t, r, i, a) {
            if (a = a || {}, t = t || this.category, "object" === (void 0 === a ? "undefined" : e(a)) && a.sendOnce) {
              var o = t + r + i;if (this.eventCache.indexOf(o) > -1) return !1;this.eventCache.push(o);
            }var s = this,
                l = function l(e) {
              window.ga(e + ".send", "event", t, r, i, { nonInteraction: !a.nonInteraction || a.nonInteraction });
            };s.trackerName ? l(s.trackerName) : n([function () {
              try {
                return !!window.ga.getAll();
              } catch (e) {}
            }], function () {
              s.trackerName = window.ga.getAll()[0].get("name"), l(s.trackerName);
            });
          } };!function () {
          var t = function t() {
            (function () {
              var t,
                  n,
                  r,
                  i = [].indexOf || function (e) {
                for (var t = 0, n = this.length; t < n; t++) {
                  if (t in this && this[t] === e) return t;
                }return -1;
              };r = function () {
                function e() {
                  this.trie = {};
                }return e.prototype.push = function (e) {
                  var t, n, r, i, a, o, s;for (e = e.toString(), a = this.trie, s = [], n = r = 0, i = (o = e.split("")).length; r < i; n = ++r) {
                    null == a[t = o[n]] && (n === e.length - 1 ? a[t] = null : a[t] = {}), s.push(a = a[t]);
                  }return s;
                }, e.prototype.find = function (e) {
                  var t, n, r, i, a, o;for (e = e.toString(), a = this.trie, n = r = 0, i = (o = e.split("")).length; r < i; n = ++r) {
                    if (t = o[n], !a.hasOwnProperty(t)) return !1;if (null === a[t]) return !0;a = a[t];
                  }
                }, e;
              }(), n = function () {
                function e(e) {
                  if (this.trie = e, this.trie.constructor !== r) throw Error("Range constructor requires a Trie parameter");
                }return e.rangeWithString = function (t) {
                  var n, i, a, o, s, l, u, d, c;if ("string" != typeof t) throw Error("rangeWithString requires a string parameter");for (t = (t = t.replace(/ /g, "")).split(","), c = new r(), n = 0, a = t.length; n < a; n++) {
                    if (l = t[n], s = l.match(/^(\d+)-(\d+)$/)) for (o = i = u = s[1], d = s[2]; u <= d ? i <= d : i >= d; o = u <= d ? ++i : --i) {
                      c.push(o);
                    } else {
                      if (!l.match(/^\d+$/)) throw Error("Invalid range '" + s + "'");c.push(l);
                    }
                  }return new e(c);
                }, e.prototype.match = function (e) {
                  return this.trie.find(e);
                }, e;
              }(), (t = jQuery).fn.validateCreditCard = function (r, a) {
                var o, s, l, u, d, c, f, p, h, m, v, g, w;for (u = [{ name: "amex", range: "34,37", valid_length: [15] }, { name: "diners_club_carte_blanche", range: "300-305", valid_length: [14] }, { name: "diners_club_international", range: "36", valid_length: [14] }, { name: "jcb", range: "3528-3589", valid_length: [16] }, { name: "laser", range: "6304, 6706, 6709, 6771", valid_length: [16, 17, 18, 19] }, { name: "visa_electron", range: "4026, 417500, 4508, 4844, 4913, 4917", valid_length: [16] }, { name: "visa", range: "4", valid_length: [13, 14, 15, 16, 17, 18, 19] }, { name: "mastercard", range: "51-55,2221-2720", valid_length: [16] }, { name: "discover", range: "6011, 622126-622925, 644-649, 65", valid_length: [16] }, { name: "dankort", range: "5019", valid_length: [16] }, { name: "maestro", range: "50, 56-69", valid_length: [12, 13, 14, 15, 16, 17, 18, 19] }, { name: "uatp", range: "1", valid_length: [15] }], o = !1, r && ("object" === (void 0 === r ? "undefined" : e(r)) ? (a = r, o = !1, r = null) : "function" == typeof r && (o = !0)), null == a && (a = {}), null == a.accept && (a.accept = function () {
                  var e, t, n;for (n = [], e = 0, t = u.length; e < t; e++) {
                    s = u[e], n.push(s.name);
                  }return n;
                }()), p = 0, h = (v = a.accept).length; p < h; p++) {
                  if (l = v[p], i.call(function () {
                    var e, t, n;for (n = [], e = 0, t = u.length; e < t; e++) {
                      s = u[e], n.push(s.name);
                    }return n;
                  }(), l) < 0) throw Error("Credit card type '" + l + "' is not supported");
                }return d = function d(e) {
                  var t, r, o;for (o = function () {
                    var e, t, n, r;for (r = [], e = 0, t = u.length; e < t; e++) {
                      n = (s = u[e]).name, i.call(a.accept, n) >= 0 && r.push(s);
                    }return r;
                  }(), t = 0, r = o.length; t < r; t++) {
                    if (l = o[t], n.rangeWithString(l.range).match(e)) return l;
                  }return null;
                }, f = function f(e) {
                  var t, n, r, i, a, o;for (o = 0, i = n = 0, r = (a = e.split("").reverse()).length; n < r; i = ++n) {
                    t = +(t = a[i]), o += i % 2 ? (t *= 2) < 10 ? t : t - 9 : t;
                  }return o % 10 == 0;
                }, c = function c(e, t) {
                  var n;return n = e.length, i.call(t.valid_length, n) >= 0;
                }, w = function w(e) {
                  var t, n;return l = d(e), n = !1, t = !1, null != l && (n = f(e), t = c(e, l)), { card_type: l, valid: n && t, luhn_valid: n, length_valid: t };
                }, g = function (e) {
                  return function () {
                    var n;return n = m(t(e).val()), w(n);
                  };
                }(this), m = function m(e) {
                  return e.replace(/[ -]/g, "");
                }, o ? (this.on("input.jccv", function (e) {
                  return function () {
                    return t(e).off("keyup.jccv"), r.call(e, g());
                  };
                }(this)), this.on("keyup.jccv", function (e) {
                  return function () {
                    return r.call(e, g());
                  };
                }(this)), r.call(this, g()), this) : g();
              };
            }).call(this);var t = window.jQuery;t("body").addClass("NH003");var n = t("#pnlPayment");n.find(".box-with-border:first > hr:first").hide();t(".box-with-border:first").prepend('<div class="NH003_topHeaderWrapper">\n                           <div class="NH003_topLeftWrapper">\n                               <p class="NH003_securityText">We take online security seriously and do the utmost to \n                               protect your details - <a class="NH003_findout">find out more</a></p>\n                           </div>\n                           <div class="NH003_topRightWrapper"></div>\n                       </div>\n                    '), t(".box-with-border:first > h2:first").prependTo(".NH003_topLeftWrapper"), t(".card-type > .right").addClass("NH003_cardsAccepted").insertAfter(".NH003_topHeaderWrapper"), n.find(".field-row-wide").find(" > label").append(" *"), n.find(".field-row-wide:eq(4)").insertAfter(".NH003_cardsAccepted"), n.find(".field-row-wide:eq(4) .optional").hide(), n.find(".field-row-wide:eq(2)").after(n.find(".field-row-wide:eq(5)")), t('label[for="txtIssueNo"]').text("Issue number (optional)"), t('label[for="ddlMonthFrom"]').text("Valid from (optional)"), n.find(".field-row-wide:eq(5)").after(t(".please-note-text")), n.find(".field-row-wide:eq(6)").addClass("NH003_fieldRowLast");var r = t("#divPromoCode");r.insertBefore(".box-with-border.white"), r.find(" > input").hide(), r.find(" > label").text("Add promo code"), r.on("click", " > label", function () {
              r.find(" > input:eq(0)").slideToggle("fast"), r.find(" > input:eq(1)").fadeToggle("fast");
            }), t("#rblPaymentOptions").closest(".field-row-wide").addClass("NH003_confirmation-block").appendTo("#pnlPayment"), t('input[name="btnContinue"]').val("CONTINUE"), t('<p class="NH003_textUnderCta">If you need any help please call us on 0844 477 9990 between \n          8am and 8pm 7 days a week</p>').insertAfter('input[name="btnContinue"]'), t(".NH003_findout").append('<div class="NH003_secCodeTooltipTop">National Holidays are members of the Bonded Coach Holiday Group of the Confederation Of Passenger Transport UK Ltd. This is a government approved consumer protection scheme.</div>'), t(".NH003_findout").on("click", function (e) {
              e.preventDefault(), t(".NH003_secCodeTooltipTop").fadeToggle("slow");
            }), t(".i-icon").prepend('<div class="NH003_secCodeTooltip">This 3-digit number is on the back of the card next to the signature panel.</div>'), t(".i-icon").on("click", function () {
              t(".NH003_secCodeTooltip").fadeToggle("slow");
            });var a = t("#txtCardNo"),
                o = t("#txtSecurity"),
                s = t("#txtIssueNo");a.attr("type", "number"), a.attr("pattern", "[0-9]*"), o.attr("type", "number"), o.attr("pattern", "[0-9]*"), s.attr("type", "number"), s.attr("pattern", "[0-9]*"), t(".NH003_fieldRowLast.NH003_confirmation-block").insertAfter(".NH003_cardsAccepted");var l = { visa: "//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/c9ad157f7fe83a378b168b6204d69a15_visa.png", mastercard: "//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/7fd0c2807500cce513fbb315a79831d6_mastercard.png", amex: "//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/6179108a3d14b46227c7488abc6e1886_amex.png", maestro: "//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/32f03f8322f9e89638393c0a63cac9d0_maestro.png", visa_electron: "//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/1011912ab088aee421e5a510e79f50fb_visa_electron.png", discover: "//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/6cbaa0b9dea7cadcb1a0190d94c9e018_discover.png", default: "//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/ea4bb9b94de10ee1fae7679b53ee8010_default.png" },
                u = t("#txtCardNo");u.wrap('<div class="NH003_input-wrap"></div>');var d = u.parent(".NH003_input-wrap");window.$cardInputWrap = d, u.validateCreditCard(function (e) {
              var t = e && e.card_type && e.card_type.name ? e.card_type.name : null,
                  n = function () {
                if (t) {
                  var e = l[t.toLowerCase()];return e || l.default;
                }return l.default;
              }();u.css({ "background-image": 'url("' + n + '")' });var r = !1,
                  i = u.val().match(/\d+/g);i && 16 === i.join("").length && e.luhn_valid && (r = !0), r ? d.hasClass("NH003_valid") || d.addClass("NH003_valid") : d.hasClass("NH003_valid") && d.removeClass("NH003_valid");
            });var c = t('<div class="NH003_card-error" style="display:none;"></div>');d.after(c), u.on("change", function () {
              var e = this.value,
                  n = !0;/^[\d\s]+$/.test(e) ? e && e.match(/\d+/g) && 16 !== e.match(/\d+/g).join("").length && (n = !1) : n = !1, n ? "none" !== c.css("display") && c.empty().hide() : e.length ? (c.text("Invalid").show(), t(this).addClass("NH003_validation_shown")) : (c.text("Required").show(), t(this).removeClass("NH003_validation_shown")), this.value = e.replace(/\s/g, "");
            }), t("#btnContinue").on("click", function () {
              u.val().length || c.text("Required").show();
            }), i.send("NH003", "Page View", "NH003 - Mobile Payment Reassurance", !0);
          };r("NH003", "Variation 1 Mobile"), n(["#txtCardNo", function () {
            return !!window.jQuery;
          }, function () {
            return !!window.ga;
          }], t);
        }();
      }();
    };
  
    //Built on top of NH003
    var NH010 = function () {
  
      // Run NH003 as it's a dependency of this experiment
      NH003();
  
      // Experiment code
      var activate = function activate() {
        // Send event to show user is bucketed into NH010
        events.send('NH010', 'Page View', 'NH010 Triggered', { sendOnce: true });
  
        var $ = window.jQuery,
            $body = $('body');
        $body.addClass('NH010');
  
        /*-------------------------------
        //Move elements around
        ---------------------------------*/
        function formChanges() {
          var paymentLink = $('#divPromoCode'),
              bookingInfo = $('.box-with-border.white'),
              paymentOption = $('.field-row-wide.NH003_fieldRowLast.NH003_confirmation-block');
  
          paymentLink.insertAfter(bookingInfo);
          paymentOption.insertAfter('.please-note-text');
  
          $('.NH003_cardsAccepted').prepend('<span>We accept:</span>');
  
          var validField = $('.field-row-wide:eq(6)'),
              expiryField = $('.field-row-wide:eq(3)');
          validField.addClass('NH010-validField');
          expiryField.addClass('NH010-expiryField');
  
          // Create new row under columns
          var $bottomRow = $('<div class="NH010_bottomRow"></div>');
          $bottomRow.insertAfter('.right');
          $bottomRow.append(paymentOption, $('.box-with-border.orange'));
          paymentOption.contents().wrapAll('<div class="NH010_confirmation-block-inner"></div>');
  
          // Change card number field type
          var cardNumber = $('.box-with-border #txtCardNo');
          cardNumber.attr('max', '9999999999999999');
  
          // Limit card number field to 16 characters
          cardNumber[0].oninput = function () {
            var limit = 16;
            if (this.value.length > limit) {
              this.value = this.value.slice(0, limit);
            }
          };
  
          // Prevent letter 'e' and up/down arrows for better usability being allowed
          cardNumber[0].onkeydown = function (e) {
            var key = e.keyCode;
  
            if (key === 69 || key === 38 || key === 40) {
              return false;
            } else {
              return true;
            }
          };
        }
        formChanges();
  
        /*-------------------------------
          //allow spaces on 16 digit field
        ---------------------------------*/
        // function cardSpaces() {
        // 	let cardNumber = $('.box-with-border #txtCardNo');
        // 	cardNumber.on('keypress change', function () {
        // 		$(this).val(function (index, value) {
        // 			return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
        // 		});
        // 	});
        // }
        // cardSpaces();
  
        /*-------------------------------
        //add lightbox 
          ---------------------------------*/
        function lightBox() {
          var markup = lightBoxhtml;
          markup.prependTo($body);
  
          var moreInfo = $('.NH003_securityText .NH003_findout');
  
          var $lightBox = $('.NH010-lightbox'),
              $lightBoxOverlay = $('.NH010-lightboxOverlay'),
              $lightBoxExit = $('.NH010-lightbox-exit');
  
          moreInfo.click(function (e) {
            e.preventDefault();
            lightboxOpen();
          });
  
          $lightBoxOverlay.click(function () {
            lightboxClose();
          });
  
          $lightBoxExit.click(function () {
            lightboxClose();
          });
  
          function lightboxOpen() {
            $lightBox.addClass('NH010-lightbox-showing');
            $lightBoxOverlay.addClass('NH010-lightboxoverlay-showing');
          }
          function lightboxClose() {
            $lightBox.removeClass('NH010-lightbox-showing');
            $lightBoxOverlay.removeClass('NH010-lightboxoverlay-showing');
          }
        }
        lightBox();
  
        //Events
        function events$$1() {
          var voucherClick = $('#divPromoCode #btnApplyCode'),
              voucherBox = $('#divPromoCode');
  
          voucherClick.click(function () {
            events.send('NH010', 'Apply Voucher code', 'NH010 Apply voucher code submit clicked', {
              sendOnce: true
            });
          });
          voucherBox.click(function () {
            events.send('NH010', 'Voucher click', 'NH010 Add promo code box clicked', {
              sendOnce: true
            });
          });
        }
        // events$$1();
      };
  
      // Audience conditions
      var triggers = function (options) {
        // FullStory tagging
        fullStory('NH010', 'Variation 1');
        poller(['body', '.NH003 .NH003_confirmation-block', '.box-with-border'], activate);
      }();
    }();
  })();
};
export default nh010;