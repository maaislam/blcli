const TP122m = () => {
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
  
  
  
  
  var observer = {
    active: [],
  
    connect: function connect(elements, cb, options) {
      var settings = {
        throttle: 1000,
        config: {
          attributes: true,
          childList: true,
          subTree: false
        }
      };
  
      if (options) {
        for (var option in options) {
          settings[option] = options[option];
        }
      } else {
        options = settings;
      }
  
      var blockCb;
      var observer = new MutationObserver(function (mutations) {
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
        for (var i = 0; i < elements.length; i++) {
          observer.observe(elements[i], settings.config);
          this.active.push([elements[i], observer]);
        }
      } else {
        observer.observe(elements, settings.config);
        this.active.push([elements, observer]);
      }
  
      return observer;
    },
  
    disconnect: function disconnect(elements) {
      var isActive = [];
      var active = this.active;
  
      function removeObservers(element) {
        for (var j = 0; j < active.length; j++) {
          if (element === active[j][0]) {
            active[j][1].disconnect();
          }
        }
      }
  
      if (elements.length) {
        for (var i = 0; i < elements.length; i++) {
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
        ID: 'TP122m',
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
        events.send(Exp.settings.ID, 'View', Exp.settings.ID + ' activated - Variation ' + Exp.settings.VARIATION);
        Exp.bindExperimentEvents.reloadPage();
      },
      services: {
        tracking: function tracking() {
          var settings = Exp.settings;
  
          fullStory(settings.ID, 'Variation ' + settings.VARIATION);
        },
        findNewProducts: function findNewProducts() {
          var newProducts = Exp.cache.bodyVar.querySelectorAll('.advanced_plp_product_item.product_item:not(.TP084_Product)');
          if (newProducts.length > 0) {
            for (var i = 0; i < newProducts.length; i += 1) {
              Exp.render.productInformationMarkup(newProducts[i]);
  
              newProducts[i].classList.add('TP084_Product');
              Exp.bindExperimentEvents.handleRequestClick(newProducts[i]);
              var productDropDown = newProducts[i].querySelector('select[id*="advancedListProductVariants"]');
  
              if (productDropDown) {
                Exp.bindExperimentEvents.dropDownChange(productDropDown);
              }
  
              Exp.bindExperimentEvents.addObserver(newProducts[i]);
            }
          }
          Exp.bindExperimentEvents.addTechControls();
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
  
                var retrievedData = div.querySelector('#content .tp_detOverview');
  
                if (retrievedData) {
                  dataContainer.insertAdjacentElement('afterbegin', retrievedData);
                  productMarkupContainer.classList.toggle('TP084_Closed');
                  productMarkupContainer.classList.toggle('TP084_Open');
                  animationContainer.slideDown();
                  $('html, body').animate({ scrollTop: animationContainer.offset().top - 250 });
                  productMarkupContainer.classList.toggle('TP084_Requesting');
                }
              }
  
              var techData = div.querySelector('.tp_prodDetailTabs .tp_detSpec .featureClass:first-of-type');
              if (techData) {
                dataContainer.insertAdjacentHTML('afterend', '\n                <div class="TP122m-tech-specs TP122m-tech-info-wrap">\n                  <div class="TP122m-tech-wrapper">\n                    <img class="TP084_ProductInfo_Icon" src="data:image/png;base64,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" alt="Product Informtion Icon">\n                    <p class="TP122m-tech-link">View technical details</p>\n                  </div>\n                  <div class="TP122m-tech-data TP122m-hide">\n                    ' + techData.outerHTML + '\n                  </div>\n                </div>\n              ');
  
                Exp.bindExperimentEvents.addTechControls();
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
          product.insertAdjacentHTML('beforeend', '\n        <div class="TP084_ProductInfo_Wrapper TP084_Closed">\n          <img class="TP084_ProductInfo_Icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBBoKIThy4lsXAAAD4UlEQVRo3t3Zf2iVVRgH8I+blBWC4pQwLAslK2tkf7RAy8wfOVAaJYstIpOalUYFVhQUmGFKmFREJKQg5c/IkGpDmH+MSCFWzYpCM4aYtI0mqMxG8+0Pb2O7u+s+9+5eF37PP/c953ue8z3P+5znfe77kg+utEunpE/r9Imr87KVFz7rt/i/7UeXXpjlJ+txyhzX9GnznJaYe2EEPC7RMKC3QaIud2Mjw8xSD3jQZZiEcwPGEzytCl22262n0Puu7ne/tw4Y39pvvDpqdkRYwKfu87Em8Je9OtLGyyxKBeEsNfaoipkd/BaMUmGGCb3X5Wjy/qD8Dpt7f9co90bvVZtmB5zNwduY6XCGg7Y8NHd5hpmHzczFAzPsN1K7Ju29fZUm5bCBY77o/T3eLFPsd7vm2OQRDkk0GNOvtz4nD9T36xmjQeJQpogryWBgqum61DqZw47/GyfV6jLd1JiAW9EyIMqHhg4tKctpyBQDY8mw+wTjTA4sNi7FTvfCecsBAZnR6F5rrAmzgyiJEm2yJXiWz9piU9Rs3AMnLbU0zA4j7oEi4aIWcIl3vDCcAt6zInuJUjwBT1km8Vw2WuQULLQ4a93Qap1zmKDOR466y0a8bk8+2tMfJj9lrIHT2y1gpcQJ87VJfN7Pv4M8zCIeqFMZ8MAhsM0TbtCAI2ozVI55CWhKFWIRdJit0U3OqIo9TQsfhG3u9q4FfojR46k4jnYr4+TiZsLRRg2ngJu1OjB8AsbaY6zfh0tAie2uczz7AzwiYEsgDbUaD+Y47hmsNV+3+/2RzXjkFFwV4JSlwq3MRG+pUI0VDmafGBGwwKSsmbDdGbBTuZdU44NYWRYRcE5rxFQKL/vbK76K5oJiBOGrys3WHSMXIxPSEqcWNxMuUzk8HjiPVdY7lu3lXfE8MM9avF0ID0xxT1bOUfvAKPPsd9q1tiu105v5aE8vyVpCJdmN4EmJb0z0vUSLK/pYGUJJttGSQEl2BOzT6TaHXa5TVSo5DdkDuWGGPyV6LEzrH8QDhQ/CZnMdVOfLGL0Yx7BZRZx8Uf85LfO1bdlIxcuEI+1SMZxF6QazdXm0EB541sNZ88CvHtKFadbbqNEjVuIx3+ajPT0PfBfKhNNAnUSX552V2NDP6hAy4UJ3ZuX85mewWaXF1qHRqshuIwJO2BH2XrcldlmsVXXsm0nhg7DbEsvcEX3VW4xj2O3DOPl/mQl7iiKsJGU5IOAXUoeqkJiWshzAaN0StQVdvlai2+iBA5mC8JTVXrPZ9fb2+WaUP8Zb5EWsdio6pdSOUPbLpe1QmpvuGvXaCrJ0m3o1gy3zD/cHtFfrzUnxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTI2VDEwOjMzOjU2KzAyOjAwH4Za7wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0yNlQxMDozMzo1NiswMjowMG7b4lMAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC" alt="Product Informtion Icon" />\n          <p class="TP084_ProductInfo_Text">View Product Information</p>\n        </div>\n        <div class="TP084_ProductInfo_Data_Wrap"></div>\n        ');
        }
      },
      bindExperimentEvents: {
        handleRequestClick: function handleRequestClick(productContainer) {
          var markupContainer = productContainer.querySelector('.TP084_ProductInfo_Wrapper');
          var addedMarkup = productContainer.querySelector('.TP084_ProductInfo_Text');
          var dataWrap = productContainer.querySelector('.TP084_ProductInfo_Data_Wrap');
          var animateDataWrap = $(dataWrap);
          markupContainer.addEventListener('click', function () {
            events.send('' + Exp.settings.ID, 'Click', 'View Product Information', { sendOnce: true });
  
            if (dataWrap.children.length === 0 && !markupContainer.classList.contains('TP084_Requesting')) {
              markupContainer.classList.toggle('TP084_Requesting');
              var productLink = productContainer.querySelector('.product_item_header a').href;
              Exp.services.requestData(productLink, dataWrap, animateDataWrap, markupContainer, addedMarkup);
            } else if (markupContainer.classList.contains('TP084_Closed')) {
              markupContainer.classList.toggle('TP084_Closed');
              markupContainer.classList.toggle('TP084_Open');
              animateDataWrap.slideDown();
              $('html, body').animate({ scrollTop: animateDataWrap.offset().top - 250 });
              events.send('' + Exp.settings.ID, 'User saw', 'View more details', { sendOnce: true });
            } else if (markupContainer.classList.contains('TP084_Open')) {
              markupContainer.classList.toggle('TP084_Closed');
              markupContainer.classList.toggle('TP084_Open');
              animateDataWrap.slideUp();
            }
            var title = markupContainer.querySelector('p.TP084_ProductInfo_Text');
            if (title) {
              if (title.textContent === 'Show more information') {
                title.textContent = 'Show less Information';
              } else {
                title.textContent = 'Show more information';
              }
            }
            return false;
          });
        },
        handleShowMore: function handleShowMore() {
          Exp.cache.showMoreButton.addEventListener('click', this.detectNewProducts);
        },
        detectNewProducts: function detectNewProducts() {
          pollerLite(['.advanced_plp_product_item.product_item:not(.TP084_Product)'], function () {
            Exp.services.findNewProducts();
          });
        },
        dropDownChange: function dropDownChange(dropdownSelector) {
          dropdownSelector.addEventListener('change', this.detectNewProducts);
        },
        addObserver: function addObserver(product) {
          var _this = this;
  
          observer.connect(product.parentNode, function () {
            _this.detectNewProducts();
          }, {
            config: {
              childList: false,
              attributes: true
            }
          });
        },
        addTechControls: function addTechControls() {
          var techElements = document.querySelectorAll('.TP122m-tech-specs');
  
          if (techElements.length > 0) {
            var _loop = function _loop(i) {
  
              techElements[i].addEventListener('click', function (e) {
                events.send('' + Exp.settings.ID, 'Click', 'View Technical Information', { sendOnce: true });
  
                var techData = techElements[i].querySelector('.TP122m-tech-data');
                if (techData) {
                  techData.classList.toggle('TP122m-hide');
                }
                var techTitle = techElements[i].querySelector('.TP122m-tech-link');
  
                if (techTitle) {
                  if (techTitle.textContent === 'View technical details') {
                    techTitle.textContent = 'Close technical details';
                  } else {
                    techTitle.textContent = 'View technical details';
                  }
                }
                techElements[i].classList.add('TP122m-has-event');
              });
            };
  
            for (var i = 0; techElements.length > i; i += 1) {
              _loop(i);
            }
          }
        },
  
        reloadPage: function reloadPage() {
          var gridBtn = document.querySelector('.prod_nav_bottom .view_mode_buttons .grid_button');
          if (gridBtn) {
            gridBtn.addEventListener('click', function () {
              window.location.reload();
            });
          }
        }
      }
    };
  
    Exp.init();
  };
  
  pollerLite(['.advanced_plp_product_item.product_item', 
  '.advanced_plp_product_item.product_item .product_item_header a', 
  function () {
    var checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  }], Run);
}

export default TP122m;
