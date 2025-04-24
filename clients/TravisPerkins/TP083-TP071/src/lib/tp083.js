export default function tp083() {
    (function() {
        'use strict';
        
        /**
         * @description Polling Element factory
         * @param {string|function} elm Condition
         * @param {integer} maxDuration In Millisecond
         */
        
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
        
        var createPollingElement = function createPollingElement(_ref) {
          var elm = _ref.elm,
              maxDuration = _ref.maxDuration;
          return {
            elm: elm,
            maxDuration: maxDuration,
        
            /**
             * Helper evaluate a poller expression (function / string) to
             * boolean condition check
             *
             * @param {any} expr    String or function to evaluate
             * @return {boolean}
             */
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
        
        
            /**
             * Destroy the element (clear future attempts to poll)
             */
            destroy: function destroy() {
              if (this.winTimeout) {
                clearTimeout(this.winTimeout);
              }
            },
        
        
            /**
             * Poll for elm condition met
             *
             * @param {integer} delay
             * @param {float} multiplier
             * @param {function} successCallback
             * @param {function} timeoutCallback
             */
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
        
        /**
         * @module poller 
         * @description Check the existence of elements or some other logic
         * @param {array} elements
         * @param {function} cb Success callback
         * @param {object} options
         * @return {object}
         */
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
        
        /**
         * @module pollerLite
         * @description Lighter version of the poller above. Doesn't include some advanced functionality ({oller Element Factory)
         * @param {array} elements 
         * @param {function} cb 
         * @param {options} options 
         */
        
        /**
         * @module throttle
         * @param {function} func 
         * @param {number} wait 
         */
        
        /**
         * @module group
         * @param {HTMLElement} elements 
         * @param {number} num 
         */
        
        /**
         * @module hoverDelay
         * @param {HTMLElement} elements 
         * @param {function} cb 
         * @param {number} delay 
         */
        
        /**
         * @module observer
         */
        
        /** 
         * @module feedbackTab
         * @description Generates feedback tab component
         */
        
        /** 
         * @module countdown
         * @description Generates countdown component
         */
        
        /**
         * @description FullStory tagging
         * @param {string} experiment_str Experiment ID to show in Fullstory
         * @param {string} variation_str Variation number to show in Fullstory
         * @requires module:poller
         */
        var fullStory = function fullStory(experiment_str, variation_str) {
          poller([function () {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
          }], function () {
            window.FS.setUserVars({
              experiment_str: experiment_str,
              variation_str: variation_str
            });
          }, { multiplier: 1.2, timeout: 0 });
        };
        
        /** 
         * @description Universal GA event sender that works on all client implementations of GA
         * Polls for ga to exist and gets the tracker name from ga.getAll() to ensure
         * events are always sent
         * @requires module:poller
         */
        var events = {
          trackerName: false,
          setDefaultCategory: function setDefaultCategory(category) {
            this.category = category;
        
            return this;
          },
          setTrackerName: function setTrackerName(trackerName) {
            this.trackerName = trackerName;
          },
          eventCache: [],
          send: function send(category, action, label, options) {
            options = options || {};
            category = category || this.category;
        
            if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options.sendOnce) {
              var eventID = category + action + label;
              // Check eventCache to see if this has already been sent
              if (this.eventCache.indexOf(eventID) > -1) {
                return false;
              } else {
                // Store event in cache
                this.eventCache.push(eventID);
              }
            }
        
            var self = this;
            var fire = function fire(tracker) {
              window.ga(tracker + '.send', 'event', category, action, label, { nonInteraction: options.nonInteraction ? options.nonInteraction : true });
            };
        
            if (self.trackerName) {
              fire(self.trackerName);
            } else {
              poller([function () {
                try {
                  return !!window.ga.getAll();
                } catch (err) {}
              }], function () {
                self.trackerName = window.ga.getAll()[0].get('name');
                fire(self.trackerName);
              });
            }
          }
        };
        
        /** 
         * @description Binds a toProperCase method to String prototype
         * This method can then be used to convert strings from upper/lowercase to capitalised
         */
        
        /**
         * @description Helper for setting cookies
         * @param {string} c_name Cookie name
         * @param {string} value Cookie value
         * @param {number|null} exdays Number of days before expiry
         * @param {string|null} c_domain Domain to store cookie on
         * @param {string|null} exms Number of ms before expiry
         */
        
        /**
         * @description Helper for getting cookies
         * @param {string} name Cookie name
         */
        
        /**
         * @description Helper for deleting cookies
         * @param {string} name Cookie name
         */
        
        /**
         * @description Sort select options alphabetically by text value (Note: jQuery dependant)
         * @param {jQuery} $ 
         * @param {String|HTMLElement} selector The CSS selector for the 'select' element
         * @param {boolean} skip_first Skips first 'option' in 'select' element as this is sometimes a placeholder
         */
        
        /**
         * @description Adds JS event with older browser compatibility
         * @param {HTMLElement} el Element to add event to
         * @param {string} type Event type
         * @param {function} fn Event handler
         */
        
        /**
         * @description Removes JS event with older browser compatibility
         * @param {HTMLElement} el Element to remove event from
         * @param {string} type Event type
         * @param {function} fn Event handler
         */
        
        /**
         * @description Equivalent to jQuery's .trigger() method
         * @param {HTMLElement} el Element to trigger event on
         * @param {string} type Event to fire
         */
        
        /**
         * @description Converts a string to title case
         * @param {string} str String to convert to title case
         */
        
        /**
         * @description Get coordinates of an element
         * @returns {Object} Coordinates of element
         */
        
        /**
         * @description Scroll to a point on the page
         * @param {number} scrollTargetY Point to scroll to
         * @param {number} speed Speed of scroll in ms
         * @param {number} delay Initial delay before scroll
         * @param {string} easing String defining the easing setting - default: easeOutSine
         */
        
        /**
         * @description Slugify Convert to alphanumeric no spaces lower case string
         * @param {string} text
         * @returns {string}
         */
        
        /**
         * @returns {boolean}
         * @description Is touch device - basic check
         */
        
        /**
         * @description Destroys any pollers in the window.UC.experiments[ID] object
         * Useful for SPAs where code is no longer needed after a page change
         * @param {string} ID - Experiment ID
         */
        
        /** 
         * @param {HTMLElement} element The element you want to track viewability of
         * @param {function} cb Callback function to run once the element is in full view
         * @param {Object} options Settings for the tracker
         * @param {boolean} options.removeOnView Removes scroll tracking when element is in view
         * @param {number} options.throttle Custom throttle timing
         * @requires module:throttle
         */
        
        /**
         * Helper get url parameter
         */
        
        /**
         * Helper add url parameer
         */
        
        // -----------------------------------------------
        // IMPORTANT!!!!
        // DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
        //
        // Modify the source in the experiments repo
        // -----------------------------------------------
        
        var TP083 = function () {
          var trackerName = void 0,
              slideQ = false,
              $ = void 0;
        
          var UCPoller = function () {
            // Load Poller in seperate to other plugins to save on processing 
            // and only load libraries in when they are needed
            poller(['.plp_add_to_cart_form', function () {
              if (window.jQuery) {
                $ = window.jQuery;
                return true;
              }
            }], init);
          }();
        
          function init() {
            fullStory('TP083', 'Variation 1');
        
            var cacheDom = function () {
              //Cache useful selectors for later use
              var bodyVar = document.querySelector('body');
        
              var categoryProductInfoInput = $('.prod_info > .bold > .product_code_for_price');
              var productInfoMarkUp = '\n\t\t\t<div class="TP083_ProductInfo_Wrapper">\n\t\t\t\t<img class="TP083_ProductInfo_Icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBBoKIThy4lsXAAAD4UlEQVRo3t3Zf2iVVRgH8I+blBWC4pQwLAslK2tkf7RAy8wfOVAaJYstIpOalUYFVhQUmGFKmFREJKQg5c/IkGpDmH+MSCFWzYpCM4aYtI0mqMxG8+0Pb2O7u+s+9+5eF37PP/c953ue8z3P+5znfe77kg+utEunpE/r9Imr87KVFz7rt/i/7UeXXpjlJ+txyhzX9GnznJaYe2EEPC7RMKC3QaIud2Mjw8xSD3jQZZiEcwPGEzytCl22262n0Puu7ne/tw4Y39pvvDpqdkRYwKfu87Em8Je9OtLGyyxKBeEsNfaoipkd/BaMUmGGCb3X5Wjy/qD8Dpt7f9co90bvVZtmB5zNwduY6XCGg7Y8NHd5hpmHzczFAzPsN1K7Ju29fZUm5bCBY77o/T3eLFPsd7vm2OQRDkk0GNOvtz4nD9T36xmjQeJQpogryWBgqum61DqZw47/GyfV6jLd1JiAW9EyIMqHhg4tKctpyBQDY8mw+wTjTA4sNi7FTvfCecsBAZnR6F5rrAmzgyiJEm2yJXiWz9piU9Rs3AMnLbU0zA4j7oEi4aIWcIl3vDCcAt6zInuJUjwBT1km8Vw2WuQULLQ4a93Qap1zmKDOR466y0a8bk8+2tMfJj9lrIHT2y1gpcQJ87VJfN7Pv4M8zCIeqFMZ8MAhsM0TbtCAI2ozVI55CWhKFWIRdJit0U3OqIo9TQsfhG3u9q4FfojR46k4jnYr4+TiZsLRRg2ngJu1OjB8AsbaY6zfh0tAie2uczz7AzwiYEsgDbUaD+Y47hmsNV+3+/2RzXjkFFwV4JSlwq3MRG+pUI0VDmafGBGwwKSsmbDdGbBTuZdU44NYWRYRcE5rxFQKL/vbK76K5oJiBOGrys3WHSMXIxPSEqcWNxMuUzk8HjiPVdY7lu3lXfE8MM9avF0ID0xxT1bOUfvAKPPsd9q1tiu105v5aE8vyVpCJdmN4EmJb0z0vUSLK/pYGUJJttGSQEl2BOzT6TaHXa5TVSo5DdkDuWGGPyV6LEzrH8QDhQ/CZnMdVOfLGL0Yx7BZRZx8Uf85LfO1bdlIxcuEI+1SMZxF6QazdXm0EB541sNZ88CvHtKFadbbqNEjVuIx3+ajPT0PfBfKhNNAnUSX552V2NDP6hAy4UJ3ZuX85mewWaXF1qHRqshuIwJO2BH2XrcldlmsVXXsm0nhg7DbEsvcEX3VW4xj2O3DOPl/mQl7iiKsJGU5IOAXUoeqkJiWshzAaN0StQVdvlai2+iBA5mC8JTVXrPZ9fb2+WaUP8Zb5EWsdio6pdSOUPbLpe1QmpvuGvXaCrJ0m3o1gy3zD/cHtFfrzUnxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTI2VDEwOjMzOjU2KzAyOjAwH4Za7wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0yNlQxMDozMzo1NiswMjowMG7b4lMAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC" alt="Product Informtion Icon">\n\t\t\t\t<p class="TP083_ProductInfo_Text"><span class="TP083_View_ProductInfo">View</span><span class="TP083_Close_ProductInfo">Close</span> Product Information</p>\n\t\t\t</div>\n\t\t\t<div class="TP083_ProductInfo_Data_Wrap"></div>\n\t\t\t';
        
              bodyVar.classList.add('TP083');
        
              //Retun the selectors we want to reference in other parts of the test
              return {
                bodyVar: bodyVar,
                categoryProductInfoInput: categoryProductInfoInput,
                productInfoMarkUp: productInfoMarkUp
              };
            }();
        
            var testBuilder = {
              setupElements: function setupElements() {
                //Build Product Information
        
                cacheDom.categoryProductInfoInput.before(cacheDom.productInfoMarkUp);
        
                functionalityBuilder.TP083ProductInformationFunctions($('.TP083_ProductInfo_Text'));
        
                $('.TP083_ProductInfo_Wrapper').parent().addClass('TP083_ProductInfo_Product');
              }
            };
        
            var functionalityBuilder = {
              //Builds the functions of the test
        
              TP083ProductInformationFunctions: function TP083ProductInformationFunctions(element) {
                element.on("click", function () {
                  events.send('TP083', 'Click', 'View Product Information', { sendOnce: true });
                  if (slideQ === false) {
                    slideQ = true;
        
                    var TP083Wrapper = $(this).closest('.TP083_ProductInfo_Wrapper');
                    var TP083DataWrapper = TP083Wrapper.next(".TP083_ProductInfo_Data_Wrap");
        
                    if (TP083Wrapper.hasClass("TP083_Product_Info_Open")) {
                      TP083DataWrapper.slideUp(function () {
                        slideQ = false;
                      });
                    } else {
                      TP083DataWrapper.slideDown(function () {
                        slideQ = false;
                      });
                      $('html, body').animate({
                        scrollTop: TP083DataWrapper.offset().top - 90
        
                      }, {
                        duration: 600,
                        complete: function complete() {
                          slideQ = false;
                        }
                      });
                    }
        
                    //Toggle class to show correct text
                    TP083Wrapper.toggleClass('TP083_Product_Info_Open');
        
                    //Store the page URL on click
                    var pageToRequest = $(this).closest('.TP083_ProductInfo_Product').find('a:first').attr('href');
        
                    //Request page to retrieve product information
        
                    //Function to make a request
                    var TP083MakeRequest = function TP083MakeRequest() {
        
                      $.get(pageToRequest).done(function (data) {
                        $(data).find('#tab-overview').appendTo(TP083DataWrapper);
                        TP083DataWrapper.slideDown(function () {
                          slideQ = false;
                        });
                        $('html, body').animate({
                          scrollTop: TP083DataWrapper.offset().top - 90
        
                        }, {
                          duration: 600,
                          complete: function complete() {
                            slideQ = false;
                          }
                        });
                      }).fail(function () {
                        var TP083RequestFailMarkup = '\n\t\t\t\t\t\t\t\t\t<p class="TP083_RequestFailed">There was an error with your request, please click here to try again</p>\n\t\t\t\t\t\t\t\t\t';
        
                        TP083DataWrapper.append(TP083RequestFailMarkup);
                        TP083DataWrapper.slideDown(function () {
                          slideQ = false;
                        });
                        $('html, body').animate({
                          scrollTop: TP083DataWrapper.offset().top - 90
        
                        }, {
                          duration: 600,
                          complete: function complete() {
                            slideQ = false;
                          }
                        });
        
                        //Run data request function again on click, empty the data wrapper to remove error message
                        TP083DataWrapper.find(".TP083_RequestFailed").on("click", function () {
                          TP083DataWrapper.slideUp(function () {
                            slideQ = false;
                          });
                          $('html, body').animate({
                            scrollTop: TP083DataWrapper.offset().top - 90
        
                          }, {
                            duration: 600,
                            complete: function complete() {
                              slideQ = false;
                            }
                          });
        
                          $(this).closest('.TP083_ProductInfo_Data_Wrap').empty();
                          TP083MakeRequest();
                        });
                      });
                    };
        
                    //Make request once
                    if (TP083Wrapper.next(".TP083_ProductInfo_Data_Wrap").is(':empty')) {
                      TP083MakeRequest();
                    }
                  }
                });
              }
            };
        
            if (document.querySelector('body').classList.contains("pageType-CategoryPage")) {
              testBuilder.setupElements();
            }
          }
        }();
        })();
}
