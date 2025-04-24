export const SD002 = () => {
    (function() {
        'use strict';
        
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
        
        var fullStory = function fullStory(experimentStr, variationStr) {
          pollerLite([function () {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
          }], function () {
            window.FS.setUserVars({
              experiment_str: experimentStr,
              variation_str: variationStr
            });
          }, {
            multiplier: 1.2,
            timeout: 0
          });
        };
        
        var events = {
          trackerName: false,
          propertyId: false,
          analyticsReference: 'ga',
          eventCache: [],
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
        
          send: function send(evCategory, evAction, evLabel, userOptions) {
            var options = userOptions || {};
            var category = evCategory || this.category;
            var action = evAction;
            var label = evLabel;
        
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
                window[self.analyticsReference]("".concat(tracker, ".send"), 'event', category, action, label, {
                  nonInteraction: options.nonInteraction ? options.nonInteraction : true
                });
              }
            };
        
            if (self.trackerName) {
              fire(self.trackerName);
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
                fire(self.trackerName);
              }, {
                wait: 150
              });
            }
          }
        };
        
        var setCookie = function setCookie(c_name, value, exdays, c_domain, exms) {
          c_domain = !c_domain ? "" : "domain=" + c_domain + ";";
          var exdate = new Date();
          exdate.setDate(exdate.getDate() + exdays);
          var exp = exms ? new Date(exdate.getTime() + exms) : exdays ? exdate : null;
          var c_value = escape(value) + (exp == null ? "" : "; expires=" + exp.toUTCString());
          document.cookie = c_name + "=" + c_value + ";" + c_domain + "path=/";
        };
        
        var getCookie = function getCookie(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s?)".concat(name, "=([^;]*)")));
          return match && match[2] ? unescape(match[2]) : undefined;
        };
        
        var settings = {
          ID: 'SD002',
          VARIATION: '1'
        };
        
        var ID = settings.ID,
            VARIATION = settings.VARIATION;
        
        function setup() {
          fullStory(ID, "Variation ".concat(VARIATION));
          document.body.classList.add(ID);
        }
        
        function amendTitle(el, newText) {
          if (el && newText) {
            el.textContent = newText;
          }
        }
        
        
        function emailValid(val) {
          return val.match(/.+@.+\..+/i);
        }
        
        
        var timeoutRef = null;
        
        function storeEmail(el) {
          if (el) {
            el.addEventListener('input', function (e) {
              clearTimeout(timeoutRef);
              var emailVal = e.target.value;
              var emailInput = e.target; 
        
              setCookie('SD002-email', window.btoa(emailVal), 1);
              fillEmail();
        
              if (emailVal.length > 1) {
                if (emailValid(emailVal)) {
                  removeErr();
                  document.body.classList.add('SD002-hasInput');
                } else {
                  document.body.classList.add('SD002-showerror');
                  timeoutRef = setTimeout(function () {
                    showError(emailInput);
                  }, 2000);
                }
              } else {
                document.body.classList.remove('SD002-hasInput');
              }
            });
          }
        }
        
        function showError(el) {
          if (!el) return;
        
          if (document.querySelector('.SD002-emailErr')) {
            document.querySelector('.SD002-emailErr').parentElement.removeChild(document.querySelector('.SD002-emailErr'));
          }
        
          window.scrollTo(0, 0);
          el.insertAdjacentHTML('beforebegin', "\n    <div class=\"SD002-emailErr\">\n      <p>Please supply a valid email address</p>\n    </div>\n  ");
        }
        
        function removeErr() {
          document.body.classList.remove('SD002-showerror');
          var addedErr = document.querySelector('.SD002-emailErr');
        
          if (addedErr) {
            addedErr.parentElement.removeChild(addedErr);
          }
        }
        
        function fillEmail() {
          var emailInput = document.querySelectorAll('input[type="email"]');
          var addedEmail = ''; 
        
          var addedEmailPlusKey = getCookie('SD002-email');
          addedEmail = window.atob(addedEmailPlusKey || '');
        
          if (addedEmail) {
            for (var i = 0; emailInput.length > i; i += 1) {
              if (emailInput[i].getAttribute('id')) {
                emailInput[i].value = addedEmail;
              }
            }
          }
        }
        
        function fetchEmail() {
          var storedEmail = ''; 
        
          var emailCookie = getCookie('SD002-email');
          var addedEmailPlusKey = window.atob(emailCookie || '');
          storedEmail = addedEmailPlusKey;
        
          if (storedEmail) {
            return storedEmail;
          }
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
        
        var FL015 = function FL015(forceLoginForm) {
          (function () {
        
            var _typeof$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
              return _typeof(obj);
            } : function (obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
            };
        
            var createPollingElement = function createPollingElement(_ref) {
              var elm = _ref.elm,
                  maxDuration = _ref.maxDuration;
              return {
                elm: elm,
                maxDuration: maxDuration,
                expressionValidator: function expressionValidator(expr) {
                  if (!expr) {
                    throw Error('Invalid poller expression');
                  }
        
                  var type = typeof expr === 'undefined' ? 'undefined' : _typeof$1(expr);
        
                  switch (type) {
                    case 'function':
                      return !!expr.call();
        
                    case 'string':
                      return !!document.querySelector(expr);
                  }
        
                  return true;
                },
                destroy: function destroy() {
                  if (this.winTimeout) {
                    clearTimeout(this.winTimeout);
                  }
                },
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
        
            var pollerLite = function pollerLite(elements, cb, options) {
              var settings = {
                wait: 50,
                multiplier: 1.1,
                timeout: 0
              };
        
              var now = Date.now || function () {
                return new Date().getTime();
              };
        
              if (options) {
                for (var option in options) {
                  settings[option] = options[option];
                }
              } else {
                options = settings;
              }
        
              var timeout = settings.timeout ? new Date(now() + settings.timeout) : false;
              var wait = settings.wait;
              var multiplier = settings.multiplier;
              var successful = [];
        
              var pollForElement = function pollForElement(condition, time) {
                if (timeout && now() > timeout) {
                  return false;
                }
        
                time = time || wait;
        
                var conditionIsTrue = function () {
                  var type = typeof condition === 'undefined' ? 'undefined' : _typeof$1(condition);
                  var toReturn;
        
                  if (type === 'function') {
                    toReturn = condition();
                  } else if (type === 'string') {
                    toReturn = document.querySelector(condition);
                  } else {
                    toReturn = true;
                  }
        
                  return toReturn;
                }();
        
                if (conditionIsTrue) {
                  successful.push(true);
                  if (successful.length === elements.length) cb();
                } else {
                  setTimeout(function () {
                    pollForElement(condition, time * multiplier);
                  }, time);
                }
              };
        
              for (var i = 0; i < elements.length; i++) {
                pollForElement(elements[i]);
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
            var Experiment = {
              settings: {
                ID: 'FL015',
                VARIATION: 'Control'
              },
              init: function init() {
                var settings = Experiment.settings,
                    services = Experiment.services,
                    components = Experiment.components;
                services.tracking();
                document.body.classList.add(settings.ID);
                components.changeHeadings();
                components.accountOptions();
                components.toggleAccounts();
              },
              services: {
                tracking: function tracking() {
                  var settings = Experiment.settings;
                  fullStory(settings.ID, 'Variation ' + settings.VARIATION); 
        
                  var forgotPass = document.querySelector('.ForgotPass > a.ForgotPasswordLinkButton');
        
                  if (forgotPass) {
                    forgotPass.addEventListener('click', function () {
                    });
                  }
        
                  var continueSecure = document.querySelector('.newCustomer .NewCustWrap span.ImgButWrap > a.dnnPrimaryAction');
        
                  if (continueSecure) {
                    continueSecure.addEventListener('click', function () {
                    });
                  }
        
                  var signinSecure = document.querySelector('.existingCustomer .NewCustWrap span.ImgButWrap > a.dnnPrimaryAction');
        
                  if (signinSecure) {
                    signinSecure.addEventListener('click', function () {
                    });
                  }
                }
              },
              components: {
                changeHeadings: function changeHeadings() {
                  var ref = document.querySelector('.CustomerGroups .contact-sec.SectionTops > h1');
        
                  if (ref) {
                    ref.textContent = 'CHECKOUT';
                    ref.insertAdjacentHTML('afterend', '<p>Do you have a Sports Direct account?</p>');
                  }
        
                  var existingContainer = document.querySelector('.existingCustomer .innerBorder');
        
                  if (existingContainer) {
                    existingContainer.insertAdjacentHTML('afterbegin', '<h2>Welcome Back!</h2>');
                  }
        
                  var newCustomerEmailInput = document.querySelector('section.newCustomer input[type="email"]');
        
                  if (newCustomerEmailInput) {
                    if (forceLoginForm) {
                      ref.insertAdjacentHTML('afterend', '<p>Please enter your email address to continue</p>');
                    } else {
                      newCustomerEmailInput.insertAdjacentHTML('afterend', '<p>Just so we can send you the order confirmation.</p>');
                    }
                  }
                },
                accountOptions: function accountOptions() {
                  var html = '\n        <div class="FL015-account-options">\n          <button data-choice="yes" class="FL015-button dnnPrimaryAction">Yes, login to my account</button>\n          <button data-choice="no" class="FL015-button dnnPrimaryAction">No, continue as a guest<sup>*</sup></button>\n          <button data-choice="notsure" class="FL015-button dnnPrimaryAction">Not Sure</button>\n     <p style="text-align: left;"><sup>*</sup>You can create an account later on</p> \n   </div>\n      ';
                  var ref = document.querySelector('.CustomerGroups .contact-sec.SectionTops');
        
                  if (ref) {
                    ref.insertAdjacentHTML('beforeend', html);
                  }
                },
                toggleAccounts: function toggleAccounts() {
                  var buttons = document.querySelectorAll('.FL015-account-options > button');
                  var exisitingAccount = document.querySelector('.existingCustomer > .innerBorder');
                  var newAccount = document.querySelector('section.newCustomer');
                  var newAccountBtn = document.querySelector('section.newCustomer a.dnnPrimaryAction');
                  var newCustomerTitle = document.querySelector('section.newCustomer .contact-sec.SectionTops h1');
                  [].forEach.call(buttons, function (button) {
                    button.addEventListener('click', function (e) {
                      e.preventDefault();
        
                      if (document.body.classList.contains('FL063-showerror')) {
                        // e.stopPropagation();
                        e.preventDefault();
                        return;
                      }
        
                      for (var i = 0; buttons.length > i; i += 1) {
                        buttons[i].classList.remove('FL015-active');
                      }
        
                      var data = button.dataset.choice;
                      var openPanel = e.target.nextElementSibling;
        
                      if (forceLoginForm) {
                        if (data === 'yes') {
                          if (openPanel.classList.contains('FL015-show')) {
                            openPanel.classList.remove('FL015-show');
                            document.body.classList.remove('FL015-yesUser');
                            document.body.classList.remove('FL015-guestUser');
                          } else {
                            newAccount.classList.remove('FL015-show');
                            e.currentTarget.insertAdjacentElement('afterend', exisitingAccount);
                            exisitingAccount.classList.add('FL015-show');
                            e.currentTarget.classList.add('FL015-active');
                            exisitingAccount.classList.remove('FL015-hide');
                            document.body.classList.add('FL015-yesUser');
                          }
                        } else {
                          newAccount.classList.add('FL015-show');
                          var hasPanel = e.target.nextElementSibling;
                          var movedNewAccount = document.querySelector('.FL015-account-options .innerBorder.FL015-show');
        
                          if (movedNewAccount) {
                            movedNewAccount.classList.remove('FL015-show');
                          }
        
                          e.currentTarget.insertAdjacentElement('afterend', newAccount);
                          e.currentTarget.classList.add('FL015-active');
                          exisitingAccount.classList.add('FL015-hide');
                          document.body.classList.add('FL015-yesUser');
                          document.body.classList.add('FL015-guestUser');
        
                          var _loginBtn = document.querySelector('.newCustomer span.FL015-login');
        
                          if (_loginBtn) {
                            _loginBtn.addEventListener('click', function () {
                              document.querySelector('.newCustomer').insertAdjacentElement('beforeend', exisitingAccount);
                              var addedInputs = document.querySelector('.newCustomer .innerBorder:last-of-type');
        
                              if (addedInputs) {
                                addedInputs.classList.add('FL015-prefer-login');
                              } 
        
                            });
                          }
                        }
                      } else if (!forceLoginForm) {
                        switch (data) {
                          case 'yes':
                            {
                              if (openPanel.classList.contains('FL015-show')) {
                                openPanel.classList.remove('FL015-show');
                                document.body.classList.remove('FL015-yesUser');
                              } else {
                                newAccount.classList.remove('FL015-show');
                                e.currentTarget.insertAdjacentElement('afterend', exisitingAccount);
                                exisitingAccount.classList.add('FL015-show');
                                e.currentTarget.classList.add('FL015-active');
                                exisitingAccount.classList.remove('FL015-hide');
                                document.body.classList.add('FL015-yesUser');
                              } 
        
        
                              break;
                            }
        
                          case 'no':
                            {
                              if (openPanel.classList.contains('FL015-show')) {
                                openPanel.classList.remove('FL015-show');
                              } else {
                                exisitingAccount.classList.remove('FL015-show');
        
                                if (newCustomerTitle) {
                                  newCustomerTitle.textContent = 'Guest Checkout';
                                }
        
                                e.currentTarget.insertAdjacentElement('afterend', newAccount);
                                newAccount.classList.add('FL015-show');
                                e.currentTarget.classList.add('FL015-active');
                                var loginBtn = newAccount.querySelector('.FL015-login');
        
                                if (loginBtn) {
                                  loginBtn.remove();
                                }
        
                                var addedInputs = document.querySelector('.newCustomer .innerBorder.FL015-prefer-login');
        
                                if (addedInputs) {
                                  addedInputs.classList.add('FL015-hide');
                                }


                                // Click guest login button
                                newAccountBtn ? newAccountBtn.click() : null;
                              } 
        
        
                              break;
                            }
        
                          case 'notsure':
                            {
                              newAccount.classList.remove('FL015-show');
                              var hasPanel = e.target.nextElementSibling;
        
                              if (hasPanel !== null) {
                                hasPanel.classList.remove('FL015-show');
                                hasPanel.parentNode.removeChild(hasPanel);
                              } else {
                                var movedNewAccount = document.querySelector('.FL015-account-options .innerBorder.FL015-show');
        
                                if (movedNewAccount) {
                                  movedNewAccount.classList.remove('FL015-show');
                                }
        
                                if (newCustomerTitle) {
                                  newCustomerTitle.textContent = 'Even if you have an account, you can still checkout as a guest here';
                                }
        
                                e.currentTarget.insertAdjacentElement('afterend', newAccount);
                                newAccount.classList.add('FL015-show');
                                e.currentTarget.classList.add('FL015-active');
        
                                if (!document.querySelector('.FL015-login')) {
                                  newAccount.insertAdjacentHTML('beforeend', '<span class="FL015-login">I would prefer to try and log in</span>');
                                }
                              } 
        
        
                              var _loginBtn = document.querySelector('.newCustomer span.FL015-login');
        
                              if (_loginBtn) {
                                _loginBtn.addEventListener('click', function () {
                                  document.querySelector('.newCustomer').insertAdjacentElement('beforeend', exisitingAccount);
                                  var addedInputs = document.querySelector('.newCustomer .innerBorder:last-of-type');
        
                                  if (addedInputs) {
                                    addedInputs.classList.add('FL015-prefer-login');
                                  } 
        
                                });
                              }

                              // Click guest login button
                              newAccountBtn ? newAccountBtn.click() : null;
        
                              break;
                            }
        
                          default:
                            console.log('error');
                        }
                      }
                    });
                  });
                }
              }
            };
            poller(['body', '#dnn_ContentPane', '.existingCustomer', '.newCustomer'], Experiment.init);
          })();
        };
        
        var FL034 = function FL034() {
          (function () {
        
            var _createClass = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
        
              return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();
        
            var _typeof$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
              return _typeof(obj);
            } : function (obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
            };
        
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
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
                var toReturn = void 0;
        
                switch (typeof condition === 'undefined' ? 'undefined' : _typeof$1(condition)) {
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
              }, {
                multiplier: 1.2,
                timeout: 0
              });
            };
            var settings = {
              ID: 'FL034',
              VARIATION: '1'
            };
            var customEvents = {
              observer: function observer() {
              },
              guestContinue: function guestContinue() {
                var guestBtn = document.querySelector('.FL034-error .FL034-guest-cta.dnnPrimaryAction');
        
                if (guestBtn) {
                  guestBtn.addEventListener('click', function () {
                  });
                }
              },
              secureContinue: function secureContinue() {
                var secureBtn = document.querySelector('.NewCustWrap a#dnn_ctr76849_Launch_btnGuestCustomer');
        
                if (secureBtn) {
                  secureBtn.addEventListener('click', function () {
                  });
                }
              }
            };
        
            function setup() {
              fullStory(settings.ID, 'Variation ' + settings.VARIATION); 
        
              document.body.classList.add(settings.ID);
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
        
              {
                html = '\n    <div class="' + settings.ID + '-error">\n      <p>We couldn\’t seem to find a match for your email or password. You can always use our guest checkout at any point if you are in a hurry!</p>\n    </div>\n <button class="FL015-button" id="FL034-guest">Continue as guest</button>  ';
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
        
              var loginCta = document.querySelector('.loginContainer a#dnn_ctr76849_Launch_registerLogin_btnRegisteredCustomer');
              setup();
        
              if (loginCta) {
                loginCta.addEventListener('click', storeEmail);
              }
        
              {
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
                      guestLink.addEventListener('click', function () {
                        existingGuestCheckoutCta.click();
                      });
                    }
                  });
                });
                scrollToGuest(addEmail);
              }
        
              customEvents.guestContinue();
              customEvents.secureContinue();
            };
        
            pollerLite(['body', '.existingCustomer .loginContainer .field.SignLogIn2 input[type="email"]', '.newCustomer .innerBorder .loginContainer input#txtGuestCustomerEmailAddress', '#dnn_ctr76849_Launch_registerLogin_divLoginErrorMessage'], activate);
          })();
        };
        
        events.analyticsReference = '_gaUAT';
        
        var activate = function activate() {
          setup();
        
          // events.send(settings.ID, "SD002 Variation ".concat(settings.VARIATION, " is Active"), 'Test is active');
        
          var addLoading = function addLoading() {
            document.body.insertAdjacentHTML('beforeend', "\n      <div class=\"SD002-first-loading loading-dots\">\n        <div class=\"dot one\">&nbsp;</div>\n        <div class=\"dot two\">&nbsp;</div>\n        <div class=\"dot three\">&nbsp;</div>\n      </div>\n    ");
          }; 
        
        
          document.body.classList.add('SD002-loading');
          var checkWrap = document.querySelector('.container-fluid.ContentWrapper');
        
          if (!checkWrap) {
            checkWrap = document.querySelector('.ContentWrap .container-fluid');
          }
        
          addLoading();
          var pageLoader = document.querySelector('.SD002-first-loading'); 
        
          if (!document.body.classList.contains('FL015')) {
            {
              FL015();
            }
          }
        
          if (!document.body.classList.contains('FL034')) {
            FL034();
          }
        
          var floHides;
          var floShows;
          var guestCheckoutCopy = document.querySelector('.newCustomer .loginContainer');
        
          if (guestCheckoutCopy) {
            guestCheckoutCopy = guestCheckoutCopy.cloneNode(true);
          } 
        
        
          if (guestCheckoutCopy) {
            window.localStorage.setItem('SD002-guestCheckout', guestCheckoutCopy.outerHTML);
          }
        
          var clickEvents = {
            addEvents: function addEvents() {
              var btnsContainer = cacheDom.get('.FL015-account-options');
              btnsContainer.addEventListener('click', function (e) {
                var input = document.querySelector('input[type="email"]');
        
        
                if (document.body.classList.contains('SD002-showerror') || !emailValid(input.value)) {
                  showError(input);
                  e.preventDefault();
                  e.stopPropagation();
                } else {
                  removeErr();
                }
              }); 
        
              var existingCustomerEl = cacheDom.get('.CheckWrap .existingCustomer .ImgButWrap a.dnnPrimaryAction'); 
        
              var forgotPassEl = cacheDom.get('.ForgotPass a.ForgotPasswordLinkButton'); 
        
              var guestBtn = document.querySelector('#dnn_ctr88149_Launch_btnGuestCustomer'); 
            },
            init: function init() {
              this.addEvents();
            }
          }; 
        
          pollerLite(['.existingCustomer h1'], function () {
            var welcomeTitle = cacheDom.get('.existingCustomer h1'); 
        
            var continueBtns = cacheDom.getAll('.CheckWrap .ImgButWrap a.dnnPrimaryAction');
            var newAccountEl = cacheDom.get('.FL015-account-options');
            var emailInputs = cacheDom.getAll('.existingCustomer input[type="email"]');
            var backRef = cacheDom.get('#dnn_ContentPane');
            var yesNoButtons = cacheDom.getAll('button.FL015-button'); 
        
            welcomeTitle.insertAdjacentHTML('afterend', "\n      <div class=\"SD002-email\">\n        <input autocomplete=\"off\" type=\"email\" name=\"email\" placeholder=\"ENTER EMAIL ADDRESS\"/>\n      </div>\n    "); 
        
            var emailInput = cacheDom.get('.SD002-email', true);
            storeEmail(emailInput); 
        
            var emailVal = fetchEmail();
        
            if (emailVal) {
              var input = document.querySelector('input[type="email"]');
        
              if (input) {
                input.value = emailVal;
        
                if (emailValid(emailVal)) {
                  removeErr();
                  document.body.classList.add('SD002-hasInput');
                } else {
                  document.body.classList.add('SD002-showerror');
                  showError(input);
                }
              }
            } 
        
        
            if (window.innerWidth < 479) {
              backRef = cacheDom.get('.row.CustomerGroups');
            } 
        
        
            for (var i = 0; continueBtns.length > i; i += 1) {
              amendTitle(continueBtns[i], 'Login');
            } 
        
        
            var formInputs = cacheDom.getAll('.ContentWrap input');
        
            for (var _i = 0; formInputs.length > _i; _i += 1) {
              if (formInputs[_i].getAttribute('placeholder')) {
                var currentPlaceholder = formInputs[_i].getAttribute('placeholder');
        
                formInputs[_i].setAttribute('onfocus', 'this.placeholder=""');
        
                formInputs[_i].setAttribute('onblur', "this.placeholder=\"".concat(currentPlaceholder, "\""));
              }
            } 
        
        
            if (!document.querySelector('.SD002-back')) {
              backRef.insertAdjacentHTML('afterbegin', "\n        <div class=\"SD002-back\">\n          <p>back</p>\n        </div>\n      ");
            } 
        
        
            {
              (function () {
                var guestCheckoutBtn = document.querySelector('a#dnn_ctr88149_Launch_btnGuestCustomer');
        
                var _loop = function _loop(_i2) {
                  yesNoButtons[_i2].addEventListener('click', function (e) {
                    if (document.body.classList.contains('SD002-showerror')) {
                      return false;
                    }
        
                    document.body.classList.add('SD002-guestCheckout'); 
        
                    newAccountEl.insertAdjacentHTML('beforebegin', "\n            <div class=\"SD002-guest-loading\">\n              <p>Checking out as a guest.</p>\n              <div class=\"UC_loading-dots\"><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span></div>\n            </div>\n          ");
                    guestCheckoutBtn.click();
                  });
        
                  var $loader = document.querySelector('.SD002-guest-loading');
        
                  if ($loader && document.querySelector('.FL015-account-options')) {
                    setTimeout(function () {
                      $loader.innerHTML = '';
                      $loader.parentNode.removeChild($loader);
                    }, 1500);
                  } 
        
                };
        
                for (var _i2 = 1; yesNoButtons.length > _i2; _i2 += 1) {
                  _loop(_i2);
                }
              })();
            } 
        
        
            pollerLite(['.FL015-account-options'], function () {
              var yesNoButtons = document.querySelectorAll('.FL015-account-options button.FL015-button'); 
        
              var backBtn = cacheDom.get('.SD002-back');
        
              if (backBtn) {
                backBtn.addEventListener('click', function () {
                  var loginErrMessage = document.querySelector('.dnnFormValidationSummary');
        
                  if (loginErrMessage) {
                    loginErrMessage.style.display = 'none';
                  }
        
                  document.body.classList.remove('FL015-yesUser');
                  document.body.classList.remove('SD002-passReset');
                  document.body.classList.remove('SD002-wrongPsw');
                  document.body.classList.remove('FL015-guestUser');
        
                  for (var _i3 = 0; yesNoButtons.length > _i3; _i3 += 1) {
                    yesNoButtons[_i3].classList.remove('FL015-active');
        
                    var shownSection = document.querySelector('.FL015-show');
        
                    if (shownSection) {
                      shownSection.classList.remove('FL015-show');
                    }
                  }
        
                  floHides = cacheDom.getAll('.FL034-hide'); 
        
                  if (floShows) {
                    for (var _i4 = 0; floShows.length > _i4; _i4 += 1) {
                      floShows[_i4].classList.remove('FL034-show');
                    }
                  } 
        
        
                  if (floHides) {
                    for (var _i5 = 0; floHides.length > _i5; _i5 += 1) {
                      floHides[_i5].classList.remove('FL034-hide');
                    }
                  }
        
                  var shownPanels = document.querySelectorAll('.FL015-show'); 
        
                  if (shownPanels) {
                    for (var _i6 = 0; shownPanels.length > _i6; _i6 += 1) {
                      shownPanels[_i6].classList.remove('FL015-show');
                    }
                  }
                });
              } 
        
        
              if (pageLoader && document.querySelector('.FL015-account-options')) {
                setTimeout(function () {
        
                  pageLoader.innerHTML = '';
                  document.body.classList.remove('SD002-loading');
                }, 1500);
              }
        
              clickEvents.init();
            }); 
        
            var hasSentPswReset = window.localStorage.getItem('SD002-change');
        
            if (hasSentPswReset) {
              var notSureBtn = cacheDom.get('.FL015-account-options button[data-choice="notsure"]');
        
              if (notSureBtn) {
                notSureBtn.textContent = 'Guest Checkout';
              }
            } 
          }); 
        
          pollerLite(['#dnn_ctr54535_PasswordReset_PasswordResetDiv'], function () {
            var emailInput = cacheDom.get('.userInputwrap input[type="email"]');
            var storedEmail = fetchEmail();
        
            if (emailInput && storedEmail) {
              emailInput.value = storedEmail;
            }
        
            floHides = cacheDom.getAll('.FL034-hide'); 
        
            var cancelBtn = cacheDom.get('a#dnn_ctr54535_PasswordReset_cmdCancelSendPassword');
        
            if (cancelBtn) {
              cancelBtn.addEventListener('click', function (e) {
                e.preventDefault();
                window.location.href = 'https://www.flannels.com/checkout/launch';
              });
            } 
        
        
            if (pageLoader) {
              setTimeout(function () {
                pageLoader.innerHTML = '';
                document.body.classList.remove('SD002-loading');
              }, 1500);
            }
          }); 
        
          pollerLite(['.DNNModuleContent.ModPasswordResetC .dnnFormMessage.dnnFormSuccess span', '.Login .innerPass'], function () {
            var confirmationMessage = cacheDom.get('.DNNModuleContent.ModPasswordResetC .dnnFormMessage.dnnFormSuccess span');
            var wholeLoginArea = cacheDom.get('.Login .innerPass');
            document.body.classList.add('SD002-passReset');
        
            if (confirmationMessage) {
              confirmationMessage.innerHTML = "\n        <p class=\"SD002-confirm\"><span>Great!</span> We\u2019ve just sent you a link to reset your password to the email address.<p> \n        <p>This should arrive within the next 60 seconds. If it does not, you can always <a href=\"https://www.flannels.com/checkout/launch\" class=\"SD002-contGuest\">continue as a guest</a>.</p>\n      ";
            }
        
            floShows = cacheDom.getAll('.FL034-show');
            floHides = cacheDom.getAll('.FL034-hide'); 
        
            window.localStorage.setItem('SD002-change', true);
          }); 
        
          pollerLite(['#FL034-guest'], function () {
            floHides = cacheDom.getAll('.FL034-hide');
            var newLogoutEl = cacheDom.get('.CheckWrap .newCustomer .ImgButWrap a.dnnPrimaryAction');
            amendTitle(newLogoutEl, 'CHECKOUT AS GUEST');
          });
          pollerLite(['input#txtGuestCustomerEmailAddress'], function () {
            fillEmail();
          }); 
        
          var emailVal = fetchEmail();
        
          if (emailVal) {
            var input = document.querySelector('input[type="email"]');
        
            if (input) {
              input.value = emailVal;
        
              if (emailValid(emailVal)) {
                removeErr();
                document.body.classList.add('SD002-hasInput');
              } else {
                document.body.classList.add('SD002-showerror');
                showError(input);
              }
            }
          } 
        };
        
        pollerLite(['body', '#dnn_ContentPane', '.Checkout', '.CheckoutLaunch'], activate);
        
        })();
}