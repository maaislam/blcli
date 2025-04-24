const FL034 = () => {
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
    
    var events = {
      trackerName: false,
      propertyId: false,
      analyticsReference: 'ga',
      setDefaultCategory: function setDefaultCategory(category) {
        this.category = category;
    
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
      eventCache: [],
      send: function send(category, action, label, options) {
        options = options || {};
        category = category || this.category;
    
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options.sendOnce) {
          var eventID = category + action + label;
          if (this.eventCache.indexOf(eventID) > -1) {
            return false;
          } else {
            this.eventCache.push(eventID);
          }
        }
    
        var self = this;
        var fire = function fire(tracker) {
          if (self.analyticsReference == '_gaq') {
            _gaq.push(['_trackEvent', category, action, label, null, typeof options.nonInteraction !== 'undefined' ? options.nonInteraction : true]);
          } else {
            window[self.analyticsReference](tracker + '.send', 'event', category, action, label, { nonInteraction: options.nonInteraction ? options.nonInteraction : true });
          }
        };
    
        if (self.trackerName) {
          fire(self.trackerName);
        } else {
          pollerLite([function () {
            try {
              if (self.analyticsReference == '_gaq') {
                return !!window._gaq;
              } else {
                var trackers = window[self.analyticsReference].getAll();
                if (trackers && trackers.length) {
                  return true;
                } else {
                  return false;
                }
              }
            } catch (err) {}
          }], function () {
            if (window[self.analyticsReference].getAll) {
              var trackers = window[self.analyticsReference].getAll();
    
              if (self.propertyId) {
                for (var i = 0; i < trackers.length; i++) {
                  var tracker = trackers[i];
                  if (tracker.get('trackingId') == self.propertyId) {
                    self.trackerName = tracker.get('name');
                    break;
                  }
                }
              } else {
                self.trackerName = trackers[0].get('name');
              }
    
              fire(self.trackerName);
            }
          });
        }
      }
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    var settings = {
      ID: 'FL034',
      VARIATION: '1'
    };
    
    events.analyticsReference = '_gaUAT';
    
    var customEvents = {
      observer: function observer() {
        // // events.send(settings.ID, 'Login', 'Incorrect password entered');
        // // events.send(settings.ID, 'Saw', 'Incorrect password screen');
      },
      guestContinue: function guestContinue() {
        var guestBtn = document.querySelector('.FL034-error .FL034-guest-cta.dnnPrimaryAction');
        if (guestBtn) {
          guestBtn.addEventListener('click', function () {
            // // events.send(settings.ID, 'Clicked', 'Continue securely');
          });
        }
      },
      secureContinue: function secureContinue() {
        var secureBtn = document.querySelector('.NewCustWrap a#dnn_ctr76849_Launch_btnGuestCustomer');
        if (secureBtn) {
          secureBtn.addEventListener('click', function () {
            // events.send(settings.ID, 'Clicked', 'Continue securely');
          });
        }
      }
    };
    
    function setup() {
      fullStory(settings.ID, 'Variation ' + settings.VARIATION);
      // events.send(settings.ID, 'Activated', 'Variation ' + settings.VARIATION);
      document.body.classList.add(settings.ID);
      if (settings.VARIATION > 1) {
        document.body.classList.add(settings.ID + '-' + settings.VARIATION);
      }
    }
    
    var observeMessage = function observeMessage(cb) {
      pollerLite(['#dnn_ctr76849_Launch_registerLogin_divLoginErrorMessage', '.FL015-account-options'], function () {
        var errorMessage = document.getElementById('dnn_ctr76849_Launch_registerLogin_divLoginErrorMessage');
        var options = document.querySelector('.FL015-account-options');
        if (errorMessage && errorMessage.style.display === 'block') {
          if (options) {
            options.classList.add('FL034-hide');
          }
          cb();
        }
      });
    };
    
    var addMessage = function addMessage() {
      var ref = document.querySelector('#dnn_ctr76849_Launch_registerLogin_divLoginErrorMessage');
      document.body.classList.add('SD002-wrongPsw');
      var html = null;
      if (settings.VARIATION === '1') {
        html = '\n    <div class="' + settings.ID + '-error">\n      <p>We couldn\’t seem to find a match for your email or password. You can always use our guest checkout at any point if you are in a hurry!</p>\n    </div>\n <button class="FL015-button" id="FL034-guest">Continue as guest</button>  ';
      } else if (settings.VARIATION === '2') {
        html = '\n    <div class="' + settings.ID + '-error ' + settings.ID + '-' + settings.VARIATION + '-error">\n      <p>We couldn\'t seem to find a match for your email and password. You can always use our \'guest checkout\' at any point if you are in a hurry!</p>\n      <span class="ImgButWrap"><button class="' + settings.ID + '-guest-cta dnnPrimaryAction">Continue as a guest</button>\n    </div>\n    ';
      }
      if (ref) {
        ref.insertAdjacentHTML('afterend', html);
      }
    };
    
    var storeEmail = function storeEmail() {
      var emailInput = document.querySelector('.existingCustomer .loginContainer .field.SignLogIn2 input#dnn_ctr76849_Launch_registerLogin_txtExistingCustomerEmailAddress');
      if (emailInput) {
        var emailAddress = emailInput.value;
        if (emailAddress) {
          sessionStorage.setItem('FL034-adr', emailAddress);
        }
      }
    };
    
    var addEmail = function addEmail() {
      var guestEmailInput = document.querySelector('.newCustomer .innerBorder .loginContainer input#txtGuestCustomerEmailAddress');
      var storedEmail = sessionStorage.getItem('FL034-adr');
      if (guestEmailInput && storedEmail) {
        guestEmailInput.value = storedEmail;
      }
    };
    
    var scrollToGuest = function scrollToGuest(cb) {
      function scrollIt(destination) {
        var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
        var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'linear';
        var callback = arguments[3];
    
    
        var easings = {
          linear: function linear(t) {
            return t;
          },
          easeInQuad: function easeInQuad(t) {
            return t * t;
          },
          easeOutQuad: function easeOutQuad(t) {
            return t * (2 - t);
          },
          easeInOutQuad: function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          },
          easeInCubic: function easeInCubic(t) {
            return t * t * t;
          },
          easeOutCubic: function easeOutCubic(t) {
            return --t * t * t + 1;
          },
          easeInOutCubic: function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
          },
          easeInQuart: function easeInQuart(t) {
            return t * t * t * t;
          },
          easeOutQuart: function easeOutQuart(t) {
            return 1 - --t * t * t * t;
          },
          easeInOutQuart: function easeInOutQuart(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
          },
          easeInQuint: function easeInQuint(t) {
            return t * t * t * t * t;
          },
          easeOutQuint: function easeOutQuint(t) {
            return 1 + --t * t * t * t * t;
          },
          easeInOutQuint: function easeInOutQuint(t) {
            return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
          }
        };
    
        var start = window.pageYOffset;
        var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    
        var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
        var destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
        var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
    
        if ('requestAnimationFrame' in window === false) {
          window.scroll(0, destinationOffsetToScroll);
          if (callback) {
            callback();
          }
          return;
        }
    
        function scroll() {
          var now = 'now' in window.performance ? performance.now() : new Date().getTime();
          var time = Math.min(1, (now - startTime) / duration);
          var timeFunction = easings[easing](time);
          window.scroll(0, Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start));
    
          if (window.pageYOffset === destinationOffsetToScroll) {
            if (callback) {
              callback();
            }
            return;
          }
    
          requestAnimationFrame(scroll);
        }
    
        scroll();
      }
    
      pollerLite(['.' + settings.ID + '-error a#' + settings.ID + '-guest'], function () {
        var messageLink = document.querySelector('.' + settings.ID + '-error a#' + settings.ID + '-guest');
        var guestLogin = document.querySelector('.newCustomer.col-xs-12.col-sm-6');
        if (guestLogin && messageLink) {
          messageLink.addEventListener('click', function () {
            scrollIt(guestLogin, 300, 'linear', cb);
          });
        }
      });
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
    
    var activate = function activate() {
      if (settings.VARIATION === '3') {
        // events.send(settings.ID, 'Control', 'Control event fired FL015 only');
        if (!document.querySelector('.FL015')) {
          FL015();
        }
        return false;
      }
      var loginCta = document.querySelector('.loginContainer a#dnn_ctr76849_Launch_registerLogin_btnRegisteredCustomer');
      setup();
      if (loginCta) {
        loginCta.addEventListener('click', storeEmail);
      }
      if (settings.VARIATION === '1') {
        observeMessage(function () {
          var registerEl = document.querySelector('.FL015 .CustomerGroups .newCustomer');
          var loginEl = document.querySelector('.FL015 .CustomerGroups .existingCustomer .innerBorder');
          if (registerEl && loginEl) {
            registerEl.classList.add('FL034-show');
            loginEl.classList.add('FL034-show');
          }
          addMessage();
          var options = document.querySelector('.FL015-account-options');
          if (options) {
            options.classList.add('FL034-hide');
          }
          customEvents.observer();
          pollerLite(['#FL034-guest'], function () {
            var existingGuestCheckoutCta = document.querySelector('.newCustomer .innerBorder .loginContainer .NewCustWrap a#dnn_ctr76849_Launch_btnGuestCustomer');
            var guestLink = document.getElementById('FL034-guest');
            if (guestLink) {
              guestLink.addEventListener('click', () => {
                existingGuestCheckoutCta.click();
              });
            }
          });
        });
        scrollToGuest(addEmail);
      }
      if (settings.VARIATION === '2') {
        observeMessage(function () {
          var loginEl = document.querySelector('.FL015 .CustomerGroups .existingCustomer .innerBorder');
          if (loginEl) {
            loginEl.classList.add('FL034-show');
          }
          addMessage();
          var guestSection = document.querySelector('.CustomerGroups .newCustomer.col-xs-12.col-sm-6');
          if (guestSection) {
            guestSection.classList.add('FL034-hide');
          }
          customEvents.observer();
        });
        addEmail();
        pollerLite(['.FL034-error button.FL034-guest-cta'], function () {
          var newGuestCheckoutCta = document.querySelector('.FL034-error button.FL034-guest-cta');
          var existingGuestCheckoutCta = document.querySelector('.newCustomer .innerBorder .loginContainer .NewCustWrap a#dnn_ctr76849_Launch_btnGuestCustomer');
          newGuestCheckoutCta.addEventListener('click', function () {
            existingGuestCheckoutCta.click();
          });
        });
      }
      customEvents.guestContinue();
      customEvents.secureContinue();
    };
    
    pollerLite(['body', '.existingCustomer .loginContainer .field.SignLogIn2 input[type="email"]', '.newCustomer .innerBorder .loginContainer input#txtGuestCustomerEmailAddress', '#dnn_ctr76849_Launch_registerLogin_divLoginErrorMessage'], activate);
    })();
};

export default FL034;
