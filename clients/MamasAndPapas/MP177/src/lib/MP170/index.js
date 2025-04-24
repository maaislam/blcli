export const MP170 = () => {
  (function() {
    'use strict';
    
    function _typeof(obj) {
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
    
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    
    
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
        var toReturn;
    
        switch (_typeof(condition)) {
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
    
    var observer = {
      active: [],
    
      connect: function connectMethod(elements, cb, options) {
        var settings = {
          throttle: 1000,
          config: {
            attributes: true,
            childList: true,
            subtree: false
          }
        }; 
    
        if (options) {
          Object.keys(options).forEach(function (key) {
            settings[key] = options[key];
          });
        }
    
        var blockCb;
        var mutationObserver = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if (!blockCb) {
              blockCb = true;
              cb(elements, mutation);
              setTimeout(function () {
                blockCb = false;
              }, settings.throttle);
            }
          });
        });
    
        if (elements.length) {
          for (var i = 0; i < elements.length; i += 1) {
            mutationObserver.observe(elements[i], settings.config);
            this.active.push([elements[i], mutationObserver]);
          }
        } else {
          mutationObserver.observe(elements, settings.config);
          this.active.push([elements, mutationObserver]);
        }
    
        return mutationObserver;
      },
    
      disconnect: function disconnectMethod(elements) {
        var active = this.active; 
    
        function removeObservers(element) {
          for (var i = 0; i < active.length; i += 1) {
            if (element === active[i][0]) {
              active[i][1].disconnect();
            }
          }
        } 
    
    
        if (elements.length) {
          for (var i = 0; i < elements.length; i += 1) {
            removeObservers(elements[i]);
          }
        } else {
          removeObservers(elements);
        }
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
      }, {
        multiplier: 1.2,
        timeout: 0
      });
    };
    
    var settings = {
      ID: 'MP170',
      VARIATION: '1'
    };
    
    var ID = settings.ID,
        VARIATION = settings.VARIATION;
    
    function setup() {
      fullStory(ID, "Variation ".concat(VARIATION));
      document.body.classList.add(ID);
    }
    
    var CacheDom =
    function () {
      function CacheDom() {
        _classCallCheck(this, CacheDom);
    
        this.cache = {};
      }
    
    
      _createClass(CacheDom, [{
        key: "clearCache",
        value: function clearCache() {
          this.cache = {};
        }
    
      }, {
        key: "get",
        value: function get(selector) {
          var bypassCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          return this.query(selector, bypassCache, 'querySelector');
        }
    
      }, {
        key: "getAll",
        value: function getAll(selector) {
          var bypassCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          return this.query(selector, bypassCache, 'querySelectorAll');
        }
    
      }, {
        key: "query",
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
    
    
    var activate = function activate() {
      setup();
      var orderSum = document.querySelector('.checkout__ordersummary');
      var checkoutRef = document.querySelector('.checkout');
      var questionWrap = document.querySelector('.checkout__heading__button');
      var globalMessages = document.querySelector('#globalMessages');
      var globalMessagesAlert = globalMessages.querySelector('.alert');
      var checkoutLoginEl = document.querySelector('#loginForm .checkout__login');
      var formUserCheckoutWrap = document.querySelector('.formUserCheckout');
      var guestMessage = document.querySelector('.checkout__guest__footer .form_field_error-message.forget-password.mb-0 + p');
      var continueBtnGuest = document.querySelector('.formGuestCheckout .checkout__footer button');
      var passInput = document.querySelector('input#j_password'); 
    
      checkoutRef.insertAdjacentHTML('beforeend', "\n    <button id=\"MP170-cont\" type=\"submit\" class=\"btn btn-turquoise\">Continue Securely</button>\n  "); 
    
      checkoutRef.insertAdjacentHTML('beforeend', orderSum.outerHTML);
    
      var showMessage = function showMessage() {
        formUserCheckoutWrap.insertAdjacentHTML('afterend', "\n      <div class=\"MP170-message alert alert-danger\">\n        <p>Please select whether you have an account</p>\n      </div>\n    ");
      }; 
    
    
      var addedBtn = document.querySelector('#MP170-cont');
    
      if (addedBtn) {
        addedBtn.addEventListener('click', function () {
          showMessage();
        });
      } 
    
    
      var options = questionWrap.querySelectorAll('div[class*="formOptionGuest"]');
      var runScroll = false;
    
      if (options.length) {
        for (var i = 0; options.length > i; i += 1) {
          options[i].addEventListener('click', function () {
            addedBtn.classList.add('d-none');
            var message = document.querySelector('.MP170-message');
    
            if (message) {
              message.parentNode.removeChild(message);
            } 
    
    
            if (!runScroll) {
              window.scrollBy(0, 100);
              runScroll = true;
            }
          });
        }
      } 
    
    
      if (document.querySelector('#loginForm .globalMessages')) {
        var addedmessage = document.querySelector('#loginForm .globalMessages');
        addedmessage.parentNode.removeChild(addedmessage);
      }
    
      checkoutLoginEl.insertAdjacentHTML('beforeend', globalMessages.outerHTML); 
    
      var messageEl = document.querySelector('.checkout__login #globalMessages');
      observer.connect(messageEl, function () {
        var alertMessage = messageEl.querySelector('.alert');
    
        if (alertMessage.textContent == 'This email address is already registered with an account, please sign in to continue') {
          alertMessage.textContent = ''; 
    
          alertMessage.insertAdjacentHTML('beforeend', "\n        <p>This email address is already registered with an account.</p>\n        <p>We recommend to either:</p>\n        <p>a) reset your password <a href=\"#\" class=\"MP170-passReset\">(here)</a> or</p>\n        <p>b) use our guest checkout with a different email address</p>\n      ");
        }
    
        if (alertMessage.textContent == 'Your email address or password is incorrect.') {
          passInput.classList.add('MP170-error');
          alertMessage.textContent = ''; 
    
          alertMessage.insertAdjacentHTML('beforeend', "\n        <p>Oops! That looks like the wrong password</p>\n        <p>We recommend to either:</p>\n        <p>a) reset your password <a href=\"#\" class=\"MP170-passReset\">(here)</a> or</p>\n        <p>b) use our guest checkout with a different email address</p>\n      ");
        } 
    
    
        var passResets = document.querySelector('a.MP170-passReset');
        var originalPassReset = document.querySelector('h3.form_field_error-message.forget-password a');
    
        if (passResets) {
          passResets.addEventListener('click', function () {
            originalPassReset.click();
          });
        }
      }, {
        config: {
          attributes: true,
          childList: false,
          subtree: true
        }
      }); 
    
      continueBtnGuest.insertAdjacentHTML('afterend', guestMessage.outerHTML);
    };
    
    pollerLite(['body', '.guest-checkout .userLogin', '.checkout__ordersummary', '.checkout__heading__button', '#globalMessages', '#loginForm .checkout__login', '.formGuestCheckout .checkout__footer button', '.checkout__guest__footer .form_field_error-message.forget-password.mb-0 + p', 'h3.form_field_error-message.forget-password a', 'input#j_password'], activate);
    
  })();
};