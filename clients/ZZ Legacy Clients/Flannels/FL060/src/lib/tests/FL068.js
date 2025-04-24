export const FL068 = () => {
  (function() {
    'use strict';
    
    
    
    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
    
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
    
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    
    var pollerLite = function pollerLite(elements, cb, options) {
      var settings = {
        wait: 50,
        multiplier: 1.1,
        timeout: 0
      };
    
      if (options) {
        Object.keys(options).forEach(function (key) {
          settings[key] = options[key];
        });
      }
    
      var now = Date.now || function getNow() {
        return new Date().getTime();
      };
    
      var timeout = settings.timeout ? new Date(now() + settings.timeout) : false;
    
      var successful = [];
    
      var conditionPassed = function conditionPassed(condition) {
        var toReturn = void 0;
        switch (typeof condition === 'undefined' ? 'undefined' : _typeof(condition)) {
          case 'function':
            toReturn = condition();
            break;
    
          case 'string':
            toReturn = !!document.querySelector(condition);
            break;
    
          default:
            toReturn = true;
            break;
        }
        return toReturn;
      };
    
      var pollForCondition = function pollForCondition(condition, wait) {
        if (timeout && now() > timeout) {
          return false;
        }
        settings.wait = wait || settings.wait;
    
        if (conditionPassed(condition)) {
          successful.push(true);
          if (successful.length === elements.length) cb();
        } else {
          setTimeout(function () {
            pollForCondition(condition, settings.wait * settings.multiplier);
          }, settings.wait);
        }
      };
    
      for (var i = 0; i < elements.length; i += 1) {
        pollForCondition(elements[i]);
      }
    };
    
    
    
    
    
    
    
    
    var fullStory = function fullStory(experiment_str, variation_str) {
      pollerLite([function () {
        var fs = window.FS;
        if (fs && fs.setUserVars) return true;
      }], function () {
        window.FS.setUserVars({
          experiment_str: experiment_str,
          variation_str: variation_str
        });
      }, { multiplier: 1.2, timeout: 0 });
    };
    
    
    var isVisible = function isVisible(elem) {
      return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    };
    
    var settings = {
      ID: 'FL068',
      VARIATION: '1',
      TERMS_HTML: '\n    I accept the <a style="text-decoration: underline;" target="_blank" href="/customerservices/termsandconditions/wareshop2uktermsandconditions">terms and conditions</a> of purchase\n  ',
      VISIBILITY_CHECK_TIMEOUT: 500
    };
    
    var ID = settings.ID,
        VARIATION = settings.VARIATION;
    
    
    var setup = function setup() {
      fullStory(ID, 'Variation ' + VARIATION);
      document.body.classList.add(ID);
      document.body.classList.add(ID + '-' + VARIATION);
    };
    
    
    var CacheDom = function () {
      function CacheDom() {
        _classCallCheck(this, CacheDom);
    
        this.cache = {};
      }
    
    
    
      _createClass(CacheDom, [{
        key: 'clearCache',
        value: function clearCache() {
          this.cache = {};
        }
    
    
      }, {
        key: 'get',
        value: function get(selector) {
          var bypassCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    
          return this.query(selector, bypassCache, 'querySelector');
        }
    
    
      }, {
        key: 'getAll',
        value: function getAll(selector) {
          var bypassCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    
          return this.query(selector, bypassCache, 'querySelectorAll');
        }
    
    
      }, {
        key: 'query',
        value: function query(selector, bypassCache, type) {
          var result = null;
    
          if (bypassCache) {
            result = document[type](selector);
          } else {
            var cachedResult = this.cache[selector];
            if (cachedResult) {
              result = cachedResult;
            } else {
              result = document[type](selector);
              if (result) {
                this.cache[selector] = result;
              }
            }
          }
    
          return result;
        }
      }]);
    
      return CacheDom;
    }();
    
    
    
    var cacheDom = new CacheDom(); 
    
    // events.analyticsReference = '_gaUAT';
    
    var checkVisibility = function checkVisibility() {
      var btns = document.querySelectorAll('.AddressContainBut');
      var numBtns = btns.length;
    
      var visible = false;
      for (var i = 0; i < numBtns; i++) {
        if (isVisible(btns[i])) {
          visible = true;
          break;
        }
      }
    
      return visible;
    };
    
    var recursivePoll = function recursivePoll(cb, delay) {
      var timeout = null;
    
      var runner = function runner() {
        clearTimeout(timeout);
    
        timeout = setTimeout(function () {
          if (cb()) {
            runner();
          }
        }, delay);
      };
    
      return {
        kill: function kill() {
          clearTimeout(timeout);
        },
        run: function run() {
          runner();
        }
      };
    };
    
    var activate = function activate() {
      setup();
    
      var pollerEnabled = true;
    
      var toCheck = function toCheck() {
        if (checkVisibility()) {
          // events.send(settings.ID, 'V' + settings.VARIATION, 'User Saw Terms', {
          //   sendOnce: true
          // });
    
          return false;
        }
    
        return true;
      };
    
      var recursivePoller = recursivePoll(toCheck, settings.VISIBILITY_CHECK_TIMEOUT);
    
      if (settings.VARIATION == '2') {
        recursivePoller.run();
      } else {
        recursivePoller.run();
    
        var termsLabels = document.querySelectorAll('.DNNModuleContent .EtailTermsText');
    
        if (termsLabels.length) {
          [].forEach.call(termsLabels, function (label) {
            label.innerHTML = settings.TERMS_HTML;
          });
        }
      }
    };
    
    pollerLite(['body', '.DNNModuleContent .EtailTermsText'], activate);
    })();
}