/* eslint-disable */
const test = () => {
  (function() {
    'use strict';
    
    
    
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
    
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    var Run = function Run() {
      var $ = window.jQuery;
      var Exp = {
        settings: {
          ID: 'TP084',
          VARIATION: '1'
        },
        cache: function () {
          var docVar = document;
          var bodyVar = docVar.body;
          var showMoreButton = docVar.getElementById('show_more');
    
          return {
            docVar: docVar,
            bodyVar: bodyVar,
            showMoreButton: showMoreButton
          };
        }(),
        init: function init() {
          var services = Exp.services;
          var settings = Exp.settings;
          var components = Exp.components;
    
    
          Exp.cache.bodyVar.classList.add(settings.ID);
          components.setupElements();
          services.tracking();
          // events.send(Exp.settings.ID, 'View', Exp.settings.ID + ' activated - Variation ' + Exp.settings.VARIATION);
        },
        services: {
          tracking: function tracking() {
            var settings = Exp.settings;
    
            fullStory(settings.ID, 'Variation ' + settings.VARIATION);
          },
          findNewProducts: function findNewProducts() {
            var newProducts = Exp.cache.bodyVar.querySelectorAll('.advanced_plp_product_item:not(.TP084_Product)');
            if (newProducts.length > 0) {
              for (var i = 0; i < newProducts.length; i += 1) {
                Exp.render.productInformationMarkup(newProducts[i]);
                newProducts[i].classList.add('TP084_Product');
                Exp.bindExperimentEvents.handleRequestClick(newProducts[i]);
                var productDropDown = newProducts[i].querySelector('select[id*="advancedListProductVariants"]');
                if (productDropDown) {
                  Exp.bindExperimentEvents.dropDownChange(productDropDown);
                }
              }
            }
          },
          requestData: function requestData(requestLink, dataContainer, animationContainer, productMarkupContainer, insertedMarkup) {
            var requestProductData = new XMLHttpRequest();
            requestProductData.open('GET', requestLink, true);
    
            requestProductData.onload = function () {
              if (requestProductData.status >= 200 && requestProductData.status < 400) {
                var resp = requestProductData.responseText;
                var div = document.createElement('div');
                if (resp) {
                  div.innerHTML = resp;
                  var retrievedData = div.querySelector('.tp_detOverview');
                  if (retrievedData) {
                    dataContainer.insertAdjacentElement('afterbegin', retrievedData);
                    productMarkupContainer.classList.toggle('TP084_Closed');
                    productMarkupContainer.classList.toggle('TP084_Open');
                    animationContainer.slideDown();
                    $('html, body').animate({ scrollTop: animationContainer.offset().top - 250 });
                    productMarkupContainer.classList.toggle('TP084_Requesting');
                  }
                }
              } else {
                Exp.services.handleRequestError(dataContainer, productMarkupContainer, animationContainer, insertedMarkup);
              }
            };
    
            requestProductData.onerror = function () {
              Exp.services.handleRequestError(dataContainer, productMarkupContainer, animationContainer, insertedMarkup);
            };
    
            requestProductData.send();
          },
          handleRequestError: function handleRequestError(errorDataContainer, errorProductMarkupContainer, errorAnimationContainer, errorInsertedMarkup) {
            errorProductMarkupContainer.classList.toggle('TP084_Requesting');
            errorDataContainer.insertAdjacentHTML('afterbegin', '\n          <p class="TP084_Error_Markup">There was an error with your request, please click here to try again</p>\n        ');
            errorProductMarkupContainer.classList.toggle('TP084_Closed');
            errorProductMarkupContainer.classList.toggle('TP084_Open');
            errorAnimationContainer.slideDown();
            var errorMarkup = errorDataContainer.querySelector('.TP084_Error_Markup');
            errorMarkup.addEventListener('click', function () {
              errorProductMarkupContainer.classList.toggle('TP084_Closed');
              errorProductMarkupContainer.classList.toggle('TP084_Open');
              errorAnimationContainer.slideUp();
              $(errorMarkup).remove();
              errorInsertedMarkup.click();
            });
          }
        },
        components: {
          setupElements: function setupElements() {
            Exp.services.findNewProducts();
            if (Exp.cache.showMoreButton) {
              Exp.bindExperimentEvents.handleShowMore();
            }
          }
        },
        render: {
          productInformationMarkup: function productInformationMarkup(product) {
            product.insertAdjacentHTML('beforeend', '\n        <div class="TP084_ProductInfo_Wrapper TP084_Closed">\n          <img class="TP084_ProductInfo_Icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBBoKIThy4lsXAAAD4UlEQVRo3t3Zf2iVVRgH8I+blBWC4pQwLAslK2tkf7RAy8wfOVAaJYstIpOalUYFVhQUmGFKmFREJKQg5c/IkGpDmH+MSCFWzYpCM4aYtI0mqMxG8+0Pb2O7u+s+9+5eF37PP/c953ue8z3P+5znfe77kg+utEunpE/r9Imr87KVFz7rt/i/7UeXXpjlJ+txyhzX9GnznJaYe2EEPC7RMKC3QaIud2Mjw8xSD3jQZZiEcwPGEzytCl22262n0Puu7ne/tw4Y39pvvDpqdkRYwKfu87Em8Je9OtLGyyxKBeEsNfaoipkd/BaMUmGGCb3X5Wjy/qD8Dpt7f9co90bvVZtmB5zNwduY6XCGg7Y8NHd5hpmHzczFAzPsN1K7Ju29fZUm5bCBY77o/T3eLFPsd7vm2OQRDkk0GNOvtz4nD9T36xmjQeJQpogryWBgqum61DqZw47/GyfV6jLd1JiAW9EyIMqHhg4tKctpyBQDY8mw+wTjTA4sNi7FTvfCecsBAZnR6F5rrAmzgyiJEm2yJXiWz9piU9Rs3AMnLbU0zA4j7oEi4aIWcIl3vDCcAt6zInuJUjwBT1km8Vw2WuQULLQ4a93Qap1zmKDOR466y0a8bk8+2tMfJj9lrIHT2y1gpcQJ87VJfN7Pv4M8zCIeqFMZ8MAhsM0TbtCAI2ozVI55CWhKFWIRdJit0U3OqIo9TQsfhG3u9q4FfojR46k4jnYr4+TiZsLRRg2ngJu1OjB8AsbaY6zfh0tAie2uczz7AzwiYEsgDbUaD+Y47hmsNV+3+/2RzXjkFFwV4JSlwq3MRG+pUI0VDmafGBGwwKSsmbDdGbBTuZdU44NYWRYRcE5rxFQKL/vbK76K5oJiBOGrys3WHSMXIxPSEqcWNxMuUzk8HjiPVdY7lu3lXfE8MM9avF0ID0xxT1bOUfvAKPPsd9q1tiu105v5aE8vyVpCJdmN4EmJb0z0vUSLK/pYGUJJttGSQEl2BOzT6TaHXa5TVSo5DdkDuWGGPyV6LEzrH8QDhQ/CZnMdVOfLGL0Yx7BZRZx8Uf85LfO1bdlIxcuEI+1SMZxF6QazdXm0EB541sNZ88CvHtKFadbbqNEjVuIx3+ajPT0PfBfKhNNAnUSX552V2NDP6hAy4UJ3ZuX85mewWaXF1qHRqshuIwJO2BH2XrcldlmsVXXsm0nhg7DbEsvcEX3VW4xj2O3DOPl/mQl7iiKsJGU5IOAXUoeqkJiWshzAaN0StQVdvlai2+iBA5mC8JTVXrPZ9fb2+WaUP8Zb5EWsdio6pdSOUPbLpe1QmpvuGvXaCrJ0m3o1gy3zD/cHtFfrzUnxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTI2VDEwOjMzOjU2KzAyOjAwH4Za7wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0yNlQxMDozMzo1NiswMjowMG7b4lMAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC" alt="Product Informtion Icon" />\n          <p class="TP084_ProductInfo_Text"><span class="TP084_View_ProductInfo">View</span><span class="TP084_Close_ProductInfo">Close</span> Product Information</p>\n        </div>\n        <div class="TP084_ProductInfo_Data_Wrap"></div>\n        ');
          }
        },
        bindExperimentEvents: {
          handleRequestClick: function handleRequestClick(productContainer) {
            var markupContainer = productContainer.querySelector('.TP084_ProductInfo_Wrapper');
            var addedMarkup = productContainer.querySelector('.TP084_ProductInfo_Text');
            var dataWrap = productContainer.querySelector('.TP084_ProductInfo_Data_Wrap');
            var animateDataWrap = $(dataWrap);
            addedMarkup.addEventListener('click', function () {
              // events.send('' + Exp.settings.ID, 'Click', 'View Product Information', { sendOnce: true });
              if (dataWrap.children.length === 0 && !markupContainer.classList.contains('TP084_Requesting')) {
                markupContainer.classList.toggle('TP084_Requesting');
                var productLink = productContainer.querySelector('.product_item_header > .product_item_img').href;
                Exp.services.requestData(productLink, dataWrap, animateDataWrap, markupContainer, addedMarkup);
              } else if (markupContainer.classList.contains('TP084_Closed')) {
                markupContainer.classList.toggle('TP084_Closed');
                markupContainer.classList.toggle('TP084_Open');
                animateDataWrap.slideDown();
                $('html, body').animate({ scrollTop: animateDataWrap.offset().top - 250 });
              } else if (markupContainer.classList.contains('TP084_Open')) {
                markupContainer.classList.toggle('TP084_Closed');
                markupContainer.classList.toggle('TP084_Open');
                animateDataWrap.slideUp();
              }
            });
          },
          handleShowMore: function handleShowMore() {
            Exp.cache.showMoreButton.addEventListener('click', this.detectNewProducts);
          },
          detectNewProducts: function detectNewProducts() {
            pollerLite(['.advanced_plp_product_item:not(.TP084_Product)'], function () {
              Exp.services.findNewProducts();
            });
          },
          dropDownChange: function dropDownChange(dropdownSelector) {
            dropdownSelector.addEventListener('change', this.detectNewProducts);
          }
        }
      };
    
      Exp.init();
    };
    
    pollerLite(['.advanced_plp_product_item', 
    '.advanced_plp_product_item > .product_item_header > .product_item_img', 
    function () {
      var checkjQuery = false;
      if (window.jQuery) {
        checkjQuery = true;
      }
      return checkjQuery;
    }], Run);
  })();
};
export default test;
