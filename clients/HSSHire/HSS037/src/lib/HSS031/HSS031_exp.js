const HSS031_exp = (function() {
  'use strict';
  
  var shared = {
    ID: 'HSS031',
    VARIATION: '1',
    CLIENT: 'HSSHire',
    LIVECODE: ''
  };
  
  var sharedElements = {
    prices: [document.querySelectorAll('.col-md-6 .item_info .price-row .price-blk'), document.querySelectorAll('.col-md-4 .item_info .price-row .price-blk')]
  };
  
  var ID = shared.ID;
  var prices = [{
    text: '1stday',
    newText: '<strong>DAY RATE</strong> <br><small>(24hr period)</small>'
  }, {
    text: 'weekend',
    newText: '<strong>WEEKEND</strong> <br><small>(Fri pm - Mon am)</small>'
  }, {
    text: 'week',
    newText: '<strong>WEEK</strong> <br><small>(3-7 days)</small>'
  }, {
    text: 'extraday',
    hide: true
  }];
  
  var handlePrices = function handlePrices() {
    sharedElements.prices.forEach(function (priceElement) {
      priceElement.forEach(function (priceRow, index) {
        var labelElement = priceRow.querySelector('label');
        var isUsingPriceReductions = priceRow.closest('.price-row').classList.contains('price-row-was');
        var formattedLabel = labelElement.innerText.replace(/\s/g, '').toLowerCase();
        var currentItem = prices.find(function (priceItem) {
          return formattedLabel == priceItem.text;
        });
  
        if (currentItem) {
          if (currentItem !== null && currentItem !== void 0 && currentItem.hide) {
            priceRow.style.display = 'none';
          } else {
            labelElement.innerHTML = "<span class=\"".concat(ID, "-text\">").concat(currentItem.newText, "</span>");
          }
        }
  
        if (isUsingPriceReductions) {
          var priceElements = {
            reduced: priceRow.querySelector('p'),
            "new": priceRow.querySelector('h5')
          };
          priceRow.insertBefore(priceElements["new"], priceElements.reduced);
        }
      });
    });
  };
  
  function _typeof(obj) {
    "@babel/helpers - typeof";
  
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }
  
    return _typeof(obj);
  }
  
  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
  
  
  var freeGlobal = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var _freeGlobal = freeGlobal;
  
  
  var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
  
  var root = _freeGlobal || freeSelf || Function('return this')();
  var _root = root;
  
  
  var _Symbol2 = _root.Symbol;
  var _Symbol = _Symbol2;
  
  
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
  
  
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
  
  
  var getNow = Date.now || function getNow() {
    return new Date().getTime();
  };
  
  var mergeObjects = function mergeObjects(target, source) {
    var merged = target;
    Object.keys(source).forEach(function (key) {
      var sourceValue = source[key];
      var targetValue = merged[key];
      var isObject = targetValue && _typeof(targetValue) === 'object' && !(targetValue instanceof Array);
  
      if (isObject) {
        merged[key] = mergeObjects(targetValue, sourceValue);
      } else {
        merged[key] = sourceValue;
      }
    });
    return merged;
  };
  
  var pollerLite = function pollerLite(conditions, callback, userOptions) {
    var options = {
      wait: 50,
      multiplier: 1.1,
      timeout: 0
    }; 
  
    if (userOptions) {
      options = mergeObjects(options, userOptions);
    }
  
    var _options = options,
        multiplier = _options.multiplier,
        wait = _options.wait;
  
    var timeout = options.timeout ? new Date(getNow() + options.timeout) : null;
  
    var isTimedOut = function isTimedOut() {
      return timeout && getNow() > timeout;
    };
  
  
    var successfulConditions = [];
  
    var evaluateCondition = function evaluateCondition(condition) {
      if (!condition) {
        return false;
      }
  
      var types = {
        "function": function _function() {
          return condition();
        },
        string: function string() {
          return document.querySelector(condition);
        }
      };
  
      var evaluate = types[_typeof(condition)];
  
      return evaluate ? evaluate() : true;
    };
  
  
    var allConditionsPassed = function allConditionsPassed() {
      return successfulConditions.length === conditions.length;
    };
  
  
    var pollForCondition = function pollForCondition(condition, waitTime, skipWait) {
      if (timeout && isTimedOut()) {
        return false;
      }
  
      var result = evaluateCondition(condition);
  
      if (result) {
        successfulConditions.push(result);
  
        if (allConditionsPassed()) {
          callback(successfulConditions);
        }
      } else {
        setTimeout(function () {
          pollForCondition(condition, waitTime * multiplier);
        }, skipWait ? 0 : waitTime);
      }
    }; 
  
  
    for (var i = 0; i < conditions.length; i += 1) {
      if (typeof conditions[i] != 'string' && typeof conditions[i] != 'function') {
        throw "Every item in the poller array should be a function or a string";
      }
  
      pollForCondition(conditions[i], wait, true);
    }
  };
  
  var events = {
    trackerName: false,
    propertyId: false,
    analyticsReference: 'ga',
    eventCache: [],
    sendEvents: true,
    setDefaultCategory: function setDefaultCategory(category) {
      this.category = category;
      return this;
    },
    setDefaultAction: function setDefaultAction(action) {
      this.action = action;
      return this;
    },
    setPropertyId: function setPropertyId(propertyId) {
      this.propertyId = propertyId;
    },
    setTrackerName: function setTrackerName(trackerName) {
      this.trackerName = trackerName;
    },
    useLegacyTracker: function useLegacyTracker() {
      this.analyticsReference = '_gaq';
    },
  
    sendAuto: function sendAuto(evVariation, evLabel, userOptions) {
      this.send(null, null, evLabel, userOptions, evVariation);
    },
    sendNormalised: function sendNormalised(evLabel, userOptions) {
      this.send(null, null, evLabel, userOptions);
    },
  
    send: function send(evCategory, evAction, evLabel, userOptions) {
      var _this2 = this;
  
      var evVariation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var options = userOptions || {};
      var label = evLabel;
      var category = evCategory || this.category;
      var action = evAction || this.action;
      var variation = evVariation;
  
      if (variation != null) {
        if (variation == 0) {
          variation = 'Control';
        }
  
        label = "Variation: " + variation + " - " + evLabel;
      }
  
      if (_typeof(options) === 'object' && options.sendOnce) {
        var eventID = "".concat(category).concat(action).concat(label); 
  
        if (this.eventCache.indexOf(eventID) > -1) {
          return false;
        } else {
          this.eventCache.push(eventID);
        }
      }
  
      var self = this;
  
      var fire = function fire(tracker) {
        if (self.analyticsReference === '_gaq') {
          window._gaq.push(['_trackEvent', category, action, label, null, typeof options.nonInteraction !== 'undefined' ? options.nonInteraction : true]);
        } else {
          var opts = {
            nonInteraction: options.nonInteraction ? options.nonInteraction : true
          };
  
          if (options.opts) {
            for (var k in options.opts) {
              opts[k] = options.opts[k];
            }
          }
  
          window[self.analyticsReference]("".concat(tracker, ".send"), 'event', category, action, label, opts);
        }
      };
  
      if (self.trackerName) {
        if (this.sendEvents == true) {
          fire(self.trackerName);
        }
      } else {
        pollerLite([function () {
          try {
            var trackers = window[self.analyticsReference].getAll();
  
            if (trackers && trackers.length) {
              if (self.propertyId) {
                for (var i = 0; i < trackers.length; i += 1) {
                  var tracker = trackers[i];
  
                  if (tracker.get('trackingId') === self.propertyId) {
                    self.trackerName = tracker.get('name');
                    return true;
                  }
                }
              } else {
                self.trackerName = trackers[0].get('name');
                return true;
              }
            }
          } catch (err) {}
        }], function () {
          if (_this2.sendEvents == true) {
            fire(self.trackerName);
          }
        }, {
          wait: 150
        });
      }
    }
  };
  
  
  var setup = function setup() {
    var ID = shared.ID,
        VARIATION = shared.VARIATION,
        CLIENT = shared.CLIENT;
  
    events.setDefaultCategory('Experimentation');
    events.setDefaultAction(CLIENT + " - " + ID);
  
    {
      events.sendEvents = true;
    } 
  
  
    document.documentElement.classList.add(ID);
    document.documentElement.classList.add("".concat(ID, "-").concat(VARIATION));
  };
  var fireEvent = function fireEvent(label) {
    var VARIATION = shared.VARIATION;
    events.sendAuto(VARIATION, label);
  };
  
  var activate = (function () {
    setup();
    fireEvent('Conditions met');
  
    var prices = document.querySelectorAll('.day_price');
    prices.forEach(function (container) {
      container.insertAdjacentHTML('afterEnd', "\n      <div class=\"".concat(shared.ID, "-notification\">*Final price will be calculated in the checkout</div>\n    "));
    });
    handlePrices();
  });
  
  var ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
  
  if (!ieChecks) {
    activate();
  }
  
  })();


  export default HSS031_exp;