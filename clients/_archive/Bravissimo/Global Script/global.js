/* eslint-disable */

// ----------------------------
// USER CONVERSION HELPERS
// Last updated 4/3/19 - 11:01
// ----------------------------
function userConversion() {
  // UC Library
  var bindUcHelpers = function() {
    window.ucHelpers = (function (ucHelpers) {
      /**
       * Runs callback when elements exist and/or functions return true
       * @param {string[]|function[]} elements An array of CSS selectors and/or functions
       * @param {function} cb Success callback
       * @param {number} options.wait Time wait between polling attempts
       * @param {number} options.multiplier Multiply the wait time each iteration so polling takes longer each time
       * @param {number} options.timeout Time the poller should run for before stopping
       * @return {object}
       */
      ucHelpers.poller = function (elements, cb, options) {
        var settings = { wait: 50, multiplier: 1.1, timeout: 0 };

        // Overwrite defaults with values from options
        if (options) {
          for (var i = 0; i < Object.keys(options).length; i += 1) {
            var key = Object.keys(options)[i];
            settings[key] = options[key];
          }
        }

        /** Returns current time */
        var now = Date.now || function getNow() {
          return new Date().getTime();
        };
        var timeout = settings.timeout ? new Date(now() + settings.timeout) : false;

        // Push successful polling conditions here to keep track of progress
        var successful = [];

        /**
         * Returns true if a poller condition is passed
         * @param {*} condition Poller condition
         * @returns {boolean}
         */
        var conditionPassed = function (condition) {
          var toReturn = false;
          switch (typeof condition) {
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

        /**
         * Recursively polls for a condition until it returns true
         * @param {*} condition Poller condition
         * @param {number} time
         */
        var pollForCondition = function (condition, wait) {
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

        // Check each condition
        for (var i = 0; i < elements.length; i += 1) {
          var element = elements[i];
          pollForCondition(element);
        }
      };

      return ucHelpers;

    }(window.ucHelpers || {}));

    // Reload AB Tasty
    if (typeof window.ucHelpers.reloadABTasty === 'function') {
      // Run destroy functions to undo existing changes where destroyOnPageChange is true
      var experiments = window.ucHelpers.experiments;
      if (experiments) {
        for (var ID in experiments) {
          var experiment = experiments[ID];

          if (experiment.destroy && experiment.destroyOnPageChange) {
            experiment.destroy();
            experiment.destroy = null;
          }
        }
      }

      window.ucHelpers.reloadABTasty();
    } else {
      var checkForABTasty = setInterval(function() {
        if (!!window.ABTasty) {
          clearInterval(checkForABTasty);

          window.ucHelpers.reloadABTasty = window.ABTasty.reload;
        }
      }, 50);

      setTimeout(function() {
        clearInterval(checkForABTasty);
      }, 10000);
    }
  };

  // Bravissimo Data Layer helpers
  var bindBvHelpers = function() {
    window.bvHelpers = (function (bvHelpers) {
      /**
       * Extracts data object from GTM dataLayer
       * @returns {object}
       */
      bvHelpers.dataObject = (function() {
        var dataLayer = window.dataLayer;
        var dataObj;
        for (var i = 0; i < dataLayer.length; i += 1) {
          var data = dataLayer[i];
          if (typeof data === 'object' && data.bag) {
            dataObj = data;
            break;
          }
        }
        return dataObj;
      }());

      /**
       * Returns page type
       * @returns {string}
       */
      bvHelpers.getPageType = function () {
        return bvHelpers.dataObject.pageType;
      };

      /**
       * Returns category or categories
       * @returns {array|string}
       */
      bvHelpers.getCategory = function () {
        var dataObject = bvHelpers.dataObject;
        var pageType = window.bvData.pageType || bvHelpers.getPageType();
        var category = '';

        switch (pageType) {
          case 'product':
            category = dataObject.product.category.toLowerCase();
            break;

          case 'productListing':
            var categories;
            var facets = dataObject.productListing.facets;

            for (var i = 0; i < facets.length; i += 1) {
              var data = facets[i];

              if (typeof data === 'object' && data.name === 'Category') {
                if (data.values.length > 1) {
                  categories = [];
                  for (var i = 0; i < data.values.length; i += 1) {
                    categories.push(data.values[i].name.toLowerCase());
                  }
                } else {
                  categories = data.values[0].name.toLowerCase();
                }
                break;
              }
            }

            if (categories) {
              category = categories;
            } else if (dataObject.productListing.collection) {
              category = dataObject.productListing.collection.replace(/new-in-|all-/, '').toLowerCase();
            }

            break;
        }

        return category;
      };

      /**
       * Checks if the current page belongs to a category
       * (listing pages can have more than one category)
       * @param {string} category
       * @returns {boolean}
       */
      bvHelpers.isCategory = function (category) {
        var thisCategory = window.bvData.category || bvHelpers.getCategory();
        if (typeof thisCategory === 'string') {
          return thisCategory === category;
        } else if (typeof thisCategory === 'object' && thisCategory.length) {
          return thisCategory.indexOf(category) > -1;
        }
      };

      return bvHelpers;
    }(window.bvHelpers || {}));
  };

  // bind bvHelpers and set bvData only when dataLayer exists
  bindUcHelpers();
  window.ucHelpers.poller([function() { return !!window.dataLayer; }], function() {
    bindBvHelpers();
    
    // Set bvData
    window.bvData = {};
    window.bvData.pageType = bvHelpers.getPageType();
    window.bvData.category = bvHelpers.getCategory();
  });
}

try {
  userConversion();
} catch (e) {
}