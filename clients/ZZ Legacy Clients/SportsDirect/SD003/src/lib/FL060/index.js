export const FL060 = (varNum) => {
  (function() {
    'use strict';
    
    
    
    var _createClass2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
    
    var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
    
    function _classCallCheck2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    
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
      }, { multiplier: 1.2, timeout: 0 });
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
      if (VARIATION > 1) document.body.classList.add(ID + '-' + VARIATION);
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
    
    // var createFeatureList = function createFeatureList(listArr) {
    //   if (listArr.length > 0) {
    //     var ul = document.createElement('UL');
    //     ul.classList.add('SD003-featureList');
    //     listArr.map(function (feature) {
    //       ul.insertAdjacentHTML('beforeend', '\n        <li><span class="SD003-tick SD003-tickActive"></span> <p>' + feature.trim() + '</p></li>\n      ');
    //     });
    
    //     return ul;
    //   }
    // };
    
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
        'use strict';
    
        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
            }
          }return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
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
          }, { multiplier: 1.2, timeout: 0 });
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
    
          var pollerEnabled = true;
    
          var toCheck = function toCheck() {
            if (checkVisibility()) {
    
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
    };
    
    
    var activate = function activate() {
      setup();
    
      if (settings.VARIATION === '2') {
        return false;
      }
    
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
    
        changeTitle(els.deliveryTitles[0], 'Home / Work Delivery');
        addHTML(els.locationHead[0], '<span class="locationHead"> from \xA3' + price + '</span>', true, 'beforeend');
        addHTML(els.locationHead[1], '<span class="locationHead">Deliver to one of our stores (UK only) <span class="locationHead">from \xA3' + price + '</span></span>', false, 'beforeend');
        addHTML(els.locationHead[2], '<span class="locationHead">Collect from a locker / shop (UK or Europe only) <span class="locationHead">from \xA35.99</span></span>', false, 'beforeend');
    
        var homeFeatures = void 0;
        // if (timeLeft) {
        //   homeFeatures = createFeatureList(['' + timeLeft, 'Receive a 1 hour delivery window on the day of delivery via text', 'Options to leave with a neighbour or in a safe place if you aren\’t home', 'Your delivery will be automatically rearranged for another time if you miss it', 'Option to divert your package while it\’s en-route']);
        // } else {
        //   homeFeatures = createFeatureList(['Receive a 1 hour delivery window on the day of delivery via text', 'Options to leave with a neighbour or in a safe place if you aren\’t home', 'Your delivery will be automatically rearranged for another time if you miss it', 'Option to divert your package while it\’s en-route']);
        // }
        // var storeFeature = createFeatureList(['FREE £10 voucher to spend in store on next purchase']);
    
        // addHTML(els.countryList, homeFeatures.outerHTML, true, 'afterend');
        // addHTML(els.freeVoucher, storeFeature.outerHTML, true, 'afterend');
    
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
    
        // var termsConditionsLink = document.querySelectorAll('.MessageGroupB.GoodsSupplyTermsAndConditions .EtailTermsText');
        // if (termsConditionsLink) {
        //   for (var i = 0; termsConditionsLink.length > i; i += 1) {
        //     addHTML(termsConditionsLink[i], '\n          <div class="SD003-tcTooltip">\n            <span class="SD003-tcIcon">i</span>\n            <div class="SD003-info">\n              <p>These are the terms and conditions of Wareshop2 Limited ("Sports Direct"), which is the company that sells goods to Customers on the Website. If you access the Website, and/or place an order for goods, you agree to be bound by these terms and conditions.</p>\n            </div>\n          </div>\n        ', true, 'beforeend');
    
        //   }
        // }
    
        var homeDeliveryTitleLength = els.homeDeliveryTitle.length;
        if (localStorage.getItem('SD003-option')) {
          for (var _i = 0; homeDeliveryTitleLength > _i; _i += 1) {
            addHTML(els.homeDeliveryTitle[_i], localStorage.getItem('SD003-option'), true);
          }
        } else {
          for (var _i2 = 0; homeDeliveryTitleLength > _i2; _i2 += 1) {
            addHTML(els.homeDeliveryTitle[_i2], '\n          <div class="SD003-chosenOption">\n            <p>Home / Work Delivery</p>\n            <p><span>from \xA34.99</span></p>\n  \n            <span class="SD003-tick SD003-tickActive"></span>\n          </div>\n        ', true);
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
                    addHTML(ref, `<p class="SD003-fromPrice">${varNum !== '2' ? 'from' : ''} \xA3${thisPrice}</p>`, true);
                  }
                }
              }
            }
          }
        }
    
        // var standardFeatures = createFeatureList(['Receive a 1 hour delivery window on the day of delivery via text', 'Options to leave with a neighbour or in a safe place if you aren’t home', 'Your delivery will be automatically rearranged for another time if you miss it', 'Option to divert your package while it’s en-route']);
    
        // var nextDayFeatures = timeLeft ? createFeatureList(['' + timeLeft]) : '';
    
        // addHTML(els.standardDelivery, standardFeatures.outerHTML, true, 'afterend');
        // addHTML(els.nextDayDelivery, nextDayFeatures.outerHTML, true, 'afterend');
    
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
                  scrollToEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
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