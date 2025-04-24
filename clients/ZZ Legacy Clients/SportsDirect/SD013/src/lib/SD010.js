export const SD010 = () => {
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
        
        var observer = {
          active: [],
        
          connect: function connectMethod(elements, cb, userOptions) {
            var options = {
              throttle: 1000,
              config: {
                attributes: true,
                childList: true,
                subtree: false
              }
            }; 
        
            if (userOptions) {
              options = mergeObjects(options, userOptions);
            }
        
            var blockCb;
            var mutationObserver = new MutationObserver(function (mutations) {
              mutations.forEach(function (mutation) {
                if (!blockCb) {
                  blockCb = true;
                  cb(elements, mutation);
                  setTimeout(function () {
                    blockCb = false;
                  }, options.throttle);
                }
              });
            });
        
            if (elements.jquery) {
              for (var i = 0; i < elements.length; i += 1) {
                mutationObserver.observe(elements[i], options.config);
                this.active.push([elements[i], mutationObserver]);
              }
            } else {
              mutationObserver.observe(elements, options.config);
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
        
        var settings = {
          ID: 'SD010',
          VARIATION: '1'
        };
        
        
        var setup = function setup() {
          var ID = settings.ID,
              VARIATION = settings.VARIATION;
        
          fullStory(ID, "Variation ".concat(VARIATION));
        
          document.body.classList.add(ID);
        };
        
        var fetch = new Promise(function (res, rej) {
          var request = new XMLHttpRequest();
          request.open('GET', '/Cart', true);
        
          request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
              var data = this.response;
              var html = document.createElement('div');
              html.innerHTML = data;
              var products = html.querySelectorAll('.AspNet-GridView table tbody > tr');
              var productArr = [];
        
              if (products) {
                for (var i = 0; products.length > i; i += 1) {
                  var thisProd = products[i];
                  var singleObject = {
                    title: thisProd.querySelector('.productdesc .productTitle'),
                    img: thisProd.querySelector('.productimage img'),
                    size: thisProd.querySelector('.productsize span:last-of-type'),
                    qty: thisProd.querySelector('input.qtybox') ? thisProd.querySelector('input.qtybox').value : null,
                    tPrice: thisProd.querySelector('.itemtotalprice span.money')
                  };
                  productArr.push(singleObject);
                }
              }
        
              res({
                productArr: productArr,
                totalPrice: html.querySelector('#TotalValue')
              });
            } else {
              rej(console.error('SD010 Server Failure'));
            }
          };
        
          request.onerror = function () {
            rej(console.error('SD010 Ajax Failure'));
          };
        
          request.send();
        });
        
        var build = function build(productData) {
          if (!productData) return;
        
          var isEmpty = function isEmpty(obj) {
            return Object.keys(obj).length === 0;
          };
          
          if (!isEmpty(productData)) {
            var link = productData.title ? productData.title.getAttribute('href') : null;
            var html = "\n      <div class=\"SD010-product\">\n        <a href=\"".concat(link, "\"></a>\n    \n        <div class=\"SD-img ib\">\n          ").concat(productData.img.outerHTML, "\n        </div>\n\n        <div class=\"SD-info ib\">\n          <p class=\"SD-title\">").concat(productData.title.outerHTML, "</p>\n\n          <p class=\"SD-data ib\">Qty: ").concat(productData.qty, "</p>\n          <p class=\"SD-data SD-centre ib\">Size: ").concat(productData.size.outerHTML, "</p>\n          <p class=\"SD-data ib\">").concat(productData.tPrice.outerHTML, "</p>\n\n        </div>\n      </div>\n    ");
            return html;
          }
        };
        
        events.analyticsReference = '_gaUAT';
        var activate = (function () {
          setup();
          var ID = settings.ID,
              VARIATION = settings.VARIATION;
        
          {
            // //events.send(ID, "SD010 Variation ".concat(VARIATION, " Active"), "SD010 Variation ".concat(VARIATION, " is active"));
          }
        
          var totalPriceEl = document.querySelector('.OrderSumm #TotalValue');
          var newTotalPrice;
        
          if (totalPriceEl) {
            newTotalPrice = totalPriceEl.textContent;
          }
        
          var toggleIt = function toggleIt(el, clickEl) {
            if (!el || !clickEl) return;
            clickEl.addEventListener('click', function () {
              {
                //events.send(ID, 'SD010 Click', 'SD010 toggled cart info');
              }
        
              if (el.classList.contains('active')) {
                el.classList.remove('active');
              } else {
                el.classList.add('active');
              }
            });
          };
        
          fetch.then(function (data) {
            var totalPrice = data.totalPrice;
            console.log('total price ', totalPrice);
            var productArr = data.productArr;
            var productHTML = productArr.map(function (prod) {
              var builtHTML = build(prod);
              
              return builtHTML;
            }).join(' ');
            var ref = document.querySelector('#BodyWrap');
        
            if (ref) {
              ref.insertAdjacentHTML('beforeend', "\n        <div class=\"SD010-cart\">\n          <div class=\"SD010-cart--top\">\n            <p class=\"SD010-title\">ORDER SUMMARY <span class=\"arrow\"></span></p>\n\n            <p>total: ".concat(newTotalPrice ? newTotalPrice : totalPrice.outerHTML, "</p>\n          </div>\n\n          <div class=\"SD010-cart--bottom\">\n            ").concat(productHTML, "\n          </div>\n        </div>\n      "));
            }
        
            var titleEl = document.querySelector('.SD010-cart--top');
            var cartEl = document.querySelector('.SD010-cart');
            toggleIt(cartEl, titleEl); 
        
            var addedProducts = document.querySelectorAll('.SD010-cart .SD010-product');
        
            for (var i = 0; addedProducts.length > i; i += 1) {
              addedProducts[i].addEventListener('click', function () {
                //events.send(ID, 'SD010 Click', 'SD010 clicked product');
              });
            }
          }); 
        
          pollerLite(['.SD010-cart .SD010-cart--top p:last-of-type', () => !!totalPriceEl], function () {
            var addedPrice = document.querySelector('.SD010-cart .SD010-cart--top p:last-of-type');
            
            observer.connect(totalPriceEl, function () {
              var tNewPrice = document.querySelector('.OrderSumm #TotalValue');
              var newTPrice = tNewPrice.textContent;
              addedPrice.textContent = '';
              addedPrice.insertAdjacentHTML('beforeend', "\n        total: ".concat(newTPrice, "\n      "));
            }, {
              config: {
                attributes: false,
                childList: true,
                subtree: true
              }
            });
            
          });
        });
        
        pollerLite(['body'], activate);
        
        })();
}