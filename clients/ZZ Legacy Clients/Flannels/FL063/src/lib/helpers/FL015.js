import { amendTitle } from '../services';

const FL015 = (forceLoginForm) => {
  (function() {
    'use strict';
    
    
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
    
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
    
                var type = typeof expr === 'undefined' ? 'undefined' : _typeof(expr);
    
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
        var time;
        var pollForElement = function pollForElement(condition, time) {
            if (timeout && now() > timeout) {
                return false;
            }
            time = time || wait;
    
            var conditionIsTrue = function () {
                var type = typeof condition === 'undefined' ? 'undefined' : _typeof(condition);
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
        }, { multiplier: 1.2, timeout: 0 });
    };
    
    var events = {
        trackerName: false,
        analyticsReference: 'ga',
        setDefaultCategory: function setDefaultCategory(category) {
            this.category = category;
    
            return this;
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
                        self.trackerName = window[self.analyticsReference].getAll()[0].get('name');
                    }
                    fire(self.trackerName);
                });
            }
        }
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    var Experiment = {
        settings: {
            ID: 'FL015',
            VARIATION: 'Control'
        },
    
        init: function init() {
            events.analyticsReference = '_gaUAT';
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
                events.analyticsReference = '_gaUAT';
                var settings = Experiment.settings;
    
                fullStory(settings.ID, 'Variation ' + settings.VARIATION);
                // events.send(settings.ID, 'View', settings.ID + ' activated - Variation ' + settings.VARIATION);
                var forgotPass = document.querySelector('.ForgotPass > a.ForgotPasswordLinkButton');
                if (forgotPass) {
                    forgotPass.addEventListener('click', function () {
                        // events.send('FL015 Control', 'Click', 'User clicked on forgotten password', { sendOnce: true });
                    });
                }
                var continueSecure = document.querySelector('.newCustomer .NewCustWrap span.ImgButWrap > a.dnnPrimaryAction');
                if (continueSecure) {
                    continueSecure.addEventListener('click', function () {
                        // events.send('FL015 Control', 'Click', 'User clicked on continue securely', { sendOnce: true });
                    });
                }
                var signinSecure = document.querySelector('.existingCustomer .NewCustWrap span.ImgButWrap > a.dnnPrimaryAction');
                if (signinSecure) {
                    signinSecure.addEventListener('click', function () {
                        // events.send('FL015 Control', 'Click', 'User clicked on sign in securely', { sendOnce: true });
                    });
                }
            }
        },
    
        components: {
            changeHeadings: function changeHeadings() {
                var ref = document.querySelector('.CustomerGroups .contact-sec.SectionTops > h1');
                if (ref) {
                    ref.textContent = 'CHECKOUT';
                    ref.insertAdjacentHTML('afterend', '<h2>Do you have a Flannels account?</h2>');
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
                var html = '\n        <div class="FL015-account-options">\n          <button data-choice="yes" class="FL015-button">Yes</button>\n          <button data-choice="no" class="FL015-button">No</button>\n          <button data-choice="notsure" class="FL015-button">Not Sure</button>\n        </div>\n      ';
                var ref = document.querySelector('.CustomerGroups .contact-sec.SectionTops');
                if (ref) {
                    ref.insertAdjacentHTML('beforeend', html);
                }
            },
            toggleAccounts: function toggleAccounts() {
                var buttons = document.querySelectorAll('.FL015-account-options > button');
                var exisitingAccount = document.querySelector('.existingCustomer > .innerBorder');
                var newAccount = document.querySelector('section.newCustomer');
                var newCustomerTitle = document.querySelector('section.newCustomer .contact-sec.SectionTops h1');
                [].forEach.call(buttons, function (button) {
                    button.addEventListener('click', function (e) {
                        e.preventDefault();

                        if (document.body.classList.contains('FL063-showerror')) {
                          e.stopPropagation();
                          e.preventDefault();

                          return false;
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
                                    // events.send('FL015', 'Click', 'User clicked prefer to try and login', { sendOnce: true });
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
                                      // events.send('FL015', 'Yes', 'Yes button was chosen', { sendOnce: true });
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
                                      }
                                      // events.send('FL015', 'No', 'No button was chosen', { sendOnce: true });
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
                                      // events.send('FL015', 'Not Sure', 'Not Sure button was chosen', { sendOnce: true });
                                      var _loginBtn = document.querySelector('.newCustomer span.FL015-login');
                                      if (_loginBtn) {
                                          _loginBtn.addEventListener('click', function () {
                                              document.querySelector('.newCustomer').insertAdjacentElement('beforeend', exisitingAccount);
                                              var addedInputs = document.querySelector('.newCustomer .innerBorder:last-of-type');
                                              if (addedInputs) {
                                                  addedInputs.classList.add('FL015-prefer-login');
                                              }
                                              // events.send('FL015', 'Click', 'User clicked prefer to try and login', { sendOnce: true });
                                          });
                                      }
      
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

export default FL015;
