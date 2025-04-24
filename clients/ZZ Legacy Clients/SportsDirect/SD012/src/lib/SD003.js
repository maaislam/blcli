export const SD003 = () => {
  (function() {
    'use strict';
    
    
    function _typeof3(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof3 = function _typeof3(obj) { return typeof obj; }; } else { _typeof3 = function _typeof3(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof3(obj); }
    
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
    
        switch (_typeof3(condition)) {
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
    
        if (_typeof3(options) === 'object' && options.sendOnce) {
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
            window[self.analyticsReference](tracker + '.send', 'event', category, action, label, {
              nonInteraction: options.nonInteraction ? options.nonInteraction : true
            });
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
      ID: 'SD003',
      VARIATION: '2'
    };
    var ID = settings.ID,
        VARIATION = settings.VARIATION;
    
    function setup() {
      fullStory(ID, "Variation ".concat(VARIATION));
      document.body.classList.add(ID);
      if (VARIATION > 1) document.body.classList.add("".concat(ID, "-").concat(VARIATION));
    }
    
    var FL060 = function FL060(varNum) {
      (function () {
        var _createClass2 = function () {
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
    
        var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
          return _typeof3(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof3(obj);
        };
    
        function _classCallCheck2(instance, Constructor) {
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
    
            switch (typeof condition === 'undefined' ? 'undefined' : _typeof2(condition)) {
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
          ID: 'SD003',
          VARIATION: '1'
        };
        var ID = settings.ID,
            VARIATION = settings.VARIATION;
    
        function setup() {
          fullStory(ID, 'Variation ' + VARIATION);
          document.body.classList.add(ID);
        }
    
        var CacheDom = function () {
          function CacheDom() {
            _classCallCheck2(this, CacheDom);
    
            this.cache = {};
          }
    
          _createClass2(CacheDom, [{
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
    
        var changeTitle = function changeTitle(el, text) {
          if (el && text) {
            el.textContent = text;
          }
        };
    
        var addHTML = function addHTML(el, htmlString, append, position) {
          var pos = 'beforeend';
    
          if (el && htmlString && htmlString && typeof htmlString === 'string') {
            if (!append) {
              el.innerHTML = '';
            }
    
            if (position) {
              pos = position;
            }
    
            el.insertAdjacentHTML(pos, htmlString);
          }
        }; 
    
    
        var clearStorage = function clearStorage() {
          localStorage.removeItem('SD003-option');
    
          if (document.querySelector('.SD003-chosenOption')) {
            var existingEls = document.querySelectorAll('.SD003-chosenOption');
    
            for (var i = 0; existingEls.length > i; i += 1) {
              existingEls[i].parentNode.removeChild(existingEls[i]);
            }
          }
        };
    
        var storeChosenOption = function storeChosenOption(event) {
          clearStorage();
          var el = event.currentTarget;
          var obj = {
            title: el.querySelector('span.deliveryHead') ? el.querySelector('span.deliveryHead').textContent : null,
            subtitle: el.querySelector('span.locationHead') ? el.querySelector('span.locationHead').textContent : null
          };
    
          if (obj.subtitle.indexOf('from £') > -1) {
            obj.subtitle = obj.subtitle.replace(/(from £\d.+)$/, '<span>$1</span>');
          }
    
          var html = '\n    <div class="SD003-chosenOption">\n      <p>' + obj.title + '</p>\n      <p><span>' + obj.subtitle + '</span></p>\n\n      <span class="SD003-tick SD003-tickActive"></span>\n    </div>\n  ';
          localStorage.setItem('SD003-option', html);
          var refs = document.querySelectorAll('.Delivery.leftWrap .innerDelWrap');
    
          for (var i = 0; refs.length > i; i += 1) {
            addHTML(refs[i], html, true, 'beforeend');
          }
        };
    
        var inWeek = function inWeek() {
          var d = new Date();
          var day = d.getDay();
          var isInWeek = false;
    
          if (day >= 1 && day <= 5) {
            isInWeek = true;
          }
    
          return isInWeek;
        };
    
        var beforeSevenPM = function beforeSevenPM() {
          var d = new Date();
          var h = d.getHours();
          var isInTime = false;
    
          if (h < 17) {
            isInTime = true;
          }
    
          return isInTime;
        };
    
        var timeLeft = function timeLeft() {
          var d = new Date();
          var y = d.getUTCFullYear();
          var m = d.getUTCMonth() + 1;
          var day = d.getUTCDate();
          var currentDateStamp = y + '/' + m + '/' + day;
          var dL = new Date(currentDateStamp + ' 17:00');
          var nowTime = d.getTime();
          var nowTimeStamp = new Date(nowTime);
          var difference = dL - nowTimeStamp;
          var diffResult = new Date(difference);
          var hourDiff = diffResult.getHours() - 1;
          var minDiff = ('0' + diffResult.getMinutes()).slice(-2);
          var dayNum = d.getDay();
    
          if (hourDiff <= 0 && minDiff <= 0) {
            return false;
          }
    
          var returnedTimeLeft = hourDiff + ' hours ' + minDiff;
          var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          var tomorrow = d.setDate(d.getDate() + 1);
          var tomorrowDate = new Date(tomorrow);
    
          var nth = function nth(nthDay) {
            if (nthDay > 3 && nthDay < 21) return 'th';
    
            switch (nthDay % 10) {
              case 1:
                return 'st';
    
              case 2:
                return 'nd';
    
              case 3:
                return 'rd';
    
              default:
                return 'th';
            }
          };
    
          var dayWithSuffix = tomorrowDate.getDate() + nth(tomorrowDate.getDate());
          var tomorrowDateToUse = months[tomorrowDate.getMonth()] + ' ' + dayWithSuffix;
          var dateObject = {
            day: days[dayNum + 1],
            date: tomorrowDateToUse,
            time: returnedTimeLeft
          };
          return dateObject;
        };
    
        var buildMessage = function buildMessage(dateObject) {
          if (dateObject) {
            var html = '\n      Next Day delivery available if you order in the next <strong>' + dateObject.time + ' minutes</strong>\n    ';
            return html;
          }
        };
    
        var timeRemaining = function timeRemaining(cb) {
          if (inWeek() && beforeSevenPM()) {
            var time = timeLeft();
            return buildMessage(time);
          }
        };
    
        var SD003FL68 = function SD003FL68() {
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
    
            var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
              return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
            } : function (obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
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
              }, {
                multiplier: 1.2,
                timeout: 0
              });
            };
    
            var isVisible = function isVisible(elem) {
              return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
            };
    
            var settings = {
              ID: 'SD003FL68',
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
    
              var toCheck = function toCheck() {
                if (checkVisibility()) {
                  return false;
                }
    
                return true;
              };
    
              var recursivePoller = recursivePoll(toCheck, settings.VISIBILITY_CHECK_TIMEOUT);
              {
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
        };
    
        var activate = function activate() {
          setup();
          var els = {
            container: cacheDom.get('.Delivery.leftWrap'),
            title: cacheDom.get('.Delivery.leftWrap > h1'),
            shippingGroupCont: cacheDom.get('.shippingServiceGroupType'),
            deliveryTitles: cacheDom.getAll('.DeliveryOptions .DeliveryNaming span.deliveryHead'),
            locationHead: cacheDom.getAll('.DeliveryOptions .DeliveryNaming span.locationHead'),
            countryList: cacheDom.get('.DeliveryOptions .DeliveryNaming'),
            freeVoucher: cacheDom.get('.deliveryGroup_StoreDelivery .DeliveryNaming'),
            deliveryOptions: cacheDom.getAll('.DeliveryOptions li.deliveryGroupTypeLi'),
            changeLinks: cacheDom.getAll('.deliveryWrapper .changeDeliveryLink a'),
            billingChangeLink: cacheDom.get('.CheckWrap #DeliveryAddressForm2Wrapper .billGroup'),
            standardDelivery: cacheDom.get('.DeliveryOptionsItem_STD .DeliveryNaming'),
            nextDayDelivery: cacheDom.get('.DeliveryOptionsItem_NDD .DeliveryNaming'),
            expressDelivery: cacheDom.get('.DeliveryOptionsItem_INA .DeliveryNaming'),
            homeDeliveryTitle: cacheDom.getAll('.changeDeliveryWrap .innerDelWrap'),
            deliveryAddress: cacheDom.get('.homeDelWrap .CurrentAddressWrapper'),
            differentAddressLinks: cacheDom.getAll('.DifferentAddressLinkWrapper a'),
            formWrap: cacheDom.get('#DeliveryAddressForm2Wrapper'),
            icons: cacheDom.getAll('.innerDeliSection .hidden-xs'),
            shippingGroup: cacheDom.get('#DeliveryOptionsWrapper .homeDelWrap .DeliveryOptions'),
            shippingGroupOptions: cacheDom.getAll('.homeDelWrap .DeliveryOptions .DeliveryOptionsItem'),
            homeDelRadioBtns: cacheDom.getAll('.DeliveryOptions .DeliveryOptionsItem .SelectIt .RadioBut')
          };
          var timeLeft = timeRemaining();
    
          if (typeof timeLeft === 'undefined') {
            timeLeft = '';
          }
    
          var firstShippingOption = void 0;
    
          if (els.shippingGroup) {
            firstShippingOption = els.shippingGroup.querySelector('ul > li:first-of-type input');
          }
    
          var price = '4.99';
    
          if (firstShippingOption) {
            price = firstShippingOption.getAttribute('data-price');
          }
    
          var initialPage = function initialPage() {
            if (els.shippingGroupCont) {
              els.shippingGroupCont.insertAdjacentHTML('afterbegin', '\n        <p class="SD003-pleaseSelect"><strong>Please select one of the following</strong></p>\n      ');
            }
    
            if (window.localStorage.getItem('SD003-changedBilling')) {
              var firstOption = document.querySelector('.DeliveryOptions .deliveryGroupTypeLi .innerDeliSection');
    
              if (firstOption) {
                firstOption.click();
                window.localStorage.removeItem('SD003-changedBilling');
              }
            }
    
            // changeTitle(els.deliveryTitles[0], 'Home / Work Delivery');
            addHTML(els.locationHead[0], '<span class="locationHead"> from \xA3' + price + '</span>', true, 'beforeend');
            addHTML(els.locationHead[1], '<span class="locationHead">Deliver to one of our stores (UK only) <span class="locationHead">from \xA3' + price + '</span></span>', false, 'beforeend');
            addHTML(els.locationHead[2], '<span class="locationHead">Collect from a locker / shop (UK or Europe only) <span class="locationHead">from \xA35.99</span></span>', false, 'beforeend'); 
    
            if (els.icons) {
              for (var i = 0; els.icons.length > i; i += 1) {
                els.icons[i].classList.remove('hidden-xs');
    
                if (els.icons[i].nextElementSibling && els.icons[i].nextElementSibling.classList.contains('DeliveryNaming')) {
                  els.icons[i].nextElementSibling.classList.remove('col-xs-10');
                  els.icons[i].nextElementSibling.classList.add('col-xs-8');
                }
              }
            }
          };
    
          var secondPage = function secondPage() {
            if (!document.body.classList.contains('SD003FL68')) {
              SD003FL68();
            } 
    
    
            var homeDeliveryTitleLength = els.homeDeliveryTitle.length;
    
            if (localStorage.getItem('SD003-option')) {
              for (var _i = 0; homeDeliveryTitleLength > _i; _i += 1) {
                addHTML(els.homeDeliveryTitle[_i], localStorage.getItem('SD003-option'), true);
              }
            } else {
              for (var _i2 = 0; homeDeliveryTitleLength > _i2; _i2 += 1) {
                addHTML(els.homeDeliveryTitle[_i2], '\n          <div class="SD003-chosenOption">\n            <p>Home Delivery</p>\n            <p><span>from \xA34.99</span></p>\n  \n            <span class="SD003-tick SD003-tickActive"></span>\n          </div>\n        ', true);
              }
            }
    
            if (els.deliveryAddress) {
              var addressInfo = els.deliveryAddress.querySelector('.col-xs-12');
              var addressInfoDupe = addressInfo.cloneNode(true);
              var dupdeTitle = addressInfoDupe.querySelector('.CurrentAddressLabel');
              var dupeInnerDeli = addressInfoDupe.querySelector('.innerDelWrap');
              addressInfoDupe.classList.add('SD003-billingAddress');
    
              if (dupdeTitle) {
                dupdeTitle.textContent = 'Billing Address:';
              }
    
              if (document.querySelector('.SD003-billingAddress')) {
                var elToRemove = document.querySelector('.SD003-billingAddress');
    
                if (elToRemove) {
                  elToRemove.parentNode.removeChild(elToRemove);
                }
              }
    
              if (!localStorage.getItem('SD003-differentAdd')) {
                addHTML(els.deliveryAddress, addressInfoDupe.outerHTML, true);
              } else if (localStorage.getItem('SD003-differentAdd')) {
                var dupedDeliverAdd = addressInfoDupe.querySelector('.CurrentAddressText > span');
    
                if (dupedDeliverAdd) {
                  dupedDeliverAdd.innerHTML = '';
                  dupedDeliverAdd.insertAdjacentHTML('beforeend', '<p class="SD003-addedBilling">You can edit your billing address after the payment options</p>');
                }
    
                addHTML(els.deliveryAddress, addressInfoDupe.outerHTML, true);
              }
            }
    
            if (!document.querySelector('h1.SD003-quickTitle')) {
              addHTML(els.shippingGroup, '<h1 class="SD003-quickTitle" id="dnn_ctr102498_Delivery_Header">How Quick Do You Want It?</h1>', true, 'afterbegin');
            }
    
            if (els.shippingGroupOptions) {
              var currentPrice = 0;
    
              for (var _i3 = 0; els.shippingGroupOptions.length > _i3; _i3 += 1) {
                var input = els.shippingGroupOptions[_i3].querySelector('input');
    
                if (input) {
                  var thisPrice = input.getAttribute('data-price');
    
                  var ref = els.shippingGroupOptions[_i3].querySelector('.DeliveryNaming');
    
                  if (ref && thisPrice) {
                    if (varNum == '2') {
                      var priceDiff = parseFloat(currentPrice - thisPrice);
    
                      if (!ref.querySelector('p.SD003-fromPrice')) {
                        addHTML(ref, '<p class="SD003-fromPrice">+ \xA3' + priceDiff.toString(10).replace('-', '') + '</p>', true);
                      }
                    } else {
                      currentPrice = parseFloat(thisPrice).toFixed(2);
    
                      if (!ref.querySelector('p.SD003-fromPrice')) {
                        addHTML(ref, "<p class=\"SD003-fromPrice\">".concat(varNum !== '2' ? 'from' : '', " \xA3").concat(thisPrice, "</p>"), true);
                      }
                    }
                  }
                }
              }
            } 
    
    
            if (els.homeDelRadioBtns) {
              for (var _i4 = 0; els.homeDelRadioBtns.length > _i4; _i4 += 1) {
                els.homeDelRadioBtns[_i4].classList.remove('RadioBut');
    
                els.homeDelRadioBtns[_i4].classList.add('SD003-tick');
              }
            }
    
            var addressBoxes = document.querySelectorAll('.homeDelWrap .CurrentAddressWrapper .innerDelWrap');
    
            if (addressBoxes) {
              for (var _i5 = 0; addressBoxes.length > _i5; _i5 += 1) {
                if (!addressBoxes[_i5].querySelector('.SD003-chosenOption')) {
                  addHTML(addressBoxes[_i5], '\n            <div class="SD003-chosenOption">\n              <span class="SD003-tick SD003-tickActive"></span>\n            </div>\n          ', true, 'beforeend');
                }
              }
            }
    
            var visitorLoginState = window.dataLayer[1].visitorLoginState;
    
            if (visitorLoginState && visitorLoginState === 'logged+in') {
              document.body.classList.add('SD003-loggedIn');
            }
    
            var billingChangeLink = document.querySelector('.SD003-billingAddress .DifferentAddressLinkWrapper > a');
    
            if (billingChangeLink) {
              billingChangeLink.addEventListener('click', function () {
                window.localStorage.setItem('SD003-changedBilling', 'true');
              });
            }
          };
    
          if (window.location.href.indexOf('deliverychoices') > -1) {
            pollerLite(['.DeliveryOptions .DeliveryNaming span.deliveryHead'], initialPage);
            secondPage();
          }
    
          if (window.location.href.indexOf('yourdetails') > -1 && window.innerWidth < 479) {
            var contBtn = document.querySelector('.ProgressButContain');
            var detailsRef = document.querySelector('.CheckoutLeft');
    
            if (contBtn && detailsRef) {
              detailsRef.insertAdjacentHTML('afterbegin', contBtn.outerHTML);
              contBtn.parentNode.removeChild(contBtn);
            }
          }
    
          var clickEvents = function () {
            if (els.deliveryOptions) {
              for (var i = 0; els.deliveryOptions.length > i; i += 1) {
                els.deliveryOptions[i].addEventListener('click', function (e) {
                  return storeChosenOption(e);
                });
              }
            }
    
            if (els.changeLinks) {
              for (var _i6 = 0; els.changeLinks.length > _i6; _i6 += 1) {
                els.changeLinks[_i6].addEventListener('click', function () {
                  var chosenOption = document.querySelector('.SD003-chosenOption');
    
                  if (chosenOption) {
                    chosenOption.parentNode.removeChild(chosenOption);
                  }
                });
              }
            }
    
            if (window.location.href === 'https://www.sportsdirect.com/checkout/yourdetails') {
              els.billingChangeLink = document.querySelector('.CheckWrap #UseAsBillingAddressWrapper');
            }
    
            if (els.billingChangeLink) {
              els.billingChangeLink.addEventListener('click', function () {
                localStorage.setItem('SD003-differentAdd', 'true');
    
                if (!document.querySelector('.SD003-billingMessage')) {
                  addHTML(els.billingChangeLink, '<p class="SD003-billingMessage">You can add a new billing address after the payment options screen</p>', true);
                }
              });
            }
    
            if (els.differentAddressLinks) {
              for (var _i7 = 0; els.differentAddressLinks.length > _i7; _i7 += 1) {
                els.differentAddressLinks[_i7].addEventListener('click', function () {
                  localStorage.removeItem('SD003-differentAdd');
                });
              }
            }
    
            if (els.shippingGroupOptions) {
              (function () {
                var len = els.shippingGroupOptions.length;
                var scrollToEl = document.querySelector('#DeliveryOptionsWrapper .ProgressButContain .AddressContainBut.DeliveryContinueButton');
    
                var _loop = function _loop(_i8) {
                  els.shippingGroupOptions[_i8].addEventListener('click', function () {
                    if (scrollToEl) {
                      scrollToEl.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'start',
                      });
                    }
    
                    var thisTick = els.shippingGroupOptions[_i8].querySelector('.SD003-tick');
    
                    if (thisTick) {
                      thisTick.classList.add('SD003-tickActive');
                    }
                  });
                };
    
                for (var _i8 = 0; len > _i8; _i8 += 1) {
                  _loop(_i8);
                }
              })();
            }
          }();
        };
    
        pollerLite(['body'], activate);
      })();
    };
    
    
    events.analyticsReference = '_gaUAT';
    
    var activate = function activate() {
      setup();
      var VARIATION = settings.VARIATION,
          ID = settings.ID; 
    
      if (VARIATION == '4') {
        events.send(ID, 'Control');
        return false;
      } else {
        events.send(ID, "Variation ".concat(VARIATION));
      } 
    
    
      FL060(VARIATION); 
    
      pollerLite(['#DeliveryOptionsList .DeliveryOptionsItem'], function () {
        var delOptions = document.querySelectorAll('#DeliveryOptionsList .DeliveryOptionsItem label');
    
        for (var i = 0; delOptions.length > i; i += 1) {
          delOptions[i].addEventListener('click', function () {
            var activeTicks = document.querySelectorAll('#DeliveryOptionsList .SD003-tick.SD003-tickActive');
    
            if (activeTicks.length) {
              for (var b = 0; activeTicks.length > b; b += 1) {
                activeTicks[b].classList.remove('SD003-tickActive');
              }
            }
          });
        }
      }); 
    
      if (VARIATION == '2') {
        pollerLite(['#DeliveryOptionsList .DeliveryOptionsItem:first-of-type  label'], function () {
          var firstDelOption = document.querySelector('#DeliveryOptionsList .DeliveryOptionsItem:first-of-type  label');
          var contButton = document.querySelector('.CheckoutLeft .ProgressButContain .AddressContainBut.DeliveryContinueButton');
    
          if (firstDelOption) {
            firstDelOption.click();
    
            if (contButton) {
              contButton.style.display = 'block';
            }
          }
        }); 
      } 
    
    
      if (VARIATION == '3' && window.location.href.indexOf('/deliverychoices') > -1) {
        var basket = document.querySelector('.CheckoutLeft');
        var delLabel = basket.querySelector('#ShippingRow #ShippingLabel');
        var delPrice = basket.querySelector('#ShippingRow #BasketSummaryShippingValue');
        var totalLabel = basket.querySelector('span[id*="_basketSummary_TotalLabel"]');
        var totalValue = basket.querySelector('.TotalSumm #TotalValue');
        var ogLabel = delLabel.textContent;
        var ogPrice = delPrice.textContent;
        var ogTotal = totalValue.textContent;
        totalLabel.textContent = 'Estimated Total';
        delLabel.textContent = 'Estimated Delivery';
        delPrice.textContent = '£4.99'; 
    
        var totalValueNum = parseFloat(totalValue.textContent.replace('£', ''));
        var totalEstimate = totalValueNum + 4.99;
        totalValue.textContent = "\xA3".concat(totalEstimate.toFixed(2)); 
    
        pollerLite(['#DeliveryOptionsList .DeliveryOptionsItem'], function () {
          var delOptions = document.querySelectorAll('#DeliveryOptionsList .DeliveryOptionsItem label');
    
          for (var i = 0; delOptions.length > i; i += 1) {
            delOptions[i].addEventListener('click', function () {
              delLabel.textContent = ogLabel;
              delPrice.textContent = ogPrice;
              totalLabel.textContent = 'Total';
              totalValue.textContent = ogTotal;
            });
          }
        }); 
    
        pollerLite(['.CheckWrap .CollectionPointListItem'], function () {
          var delOptions = document.querySelectorAll('.CheckWrap .CollectionPointListItem');
    
          for (var i = 0; delOptions.length > i; i += 1) {
            delOptions[i].addEventListener('click', function () {
              delLabel.textContent = ogLabel;
              delPrice.textContent = ogPrice;
              totalLabel.textContent = 'Total';
              totalValue.textContent = ogTotal;
            });
          }
        }); 
    
        pollerLite(['.changeDeliveryMethodButton'], function () {
          var changeMethodBtns = document.querySelectorAll('.changeDeliveryMethodButton');
    
          for (var i = 0; changeMethodBtns.length > i; i += 1) {
            changeMethodBtns[i].addEventListener('click', function () {
              totalLabel.textContent = 'Estimated Total';
              delLabel.textContent = 'Estimated Delivery';
              delPrice.textContent = '£4.99';
              totalValue.textContent = "\xA3".concat(totalEstimate.toFixed(2));
            });
          }
        });
      }
    };
    
    pollerLite(['body', '.CheckoutLeft', '#ShippingRow #BasketSummaryShippingValue'], activate);
    })();
};