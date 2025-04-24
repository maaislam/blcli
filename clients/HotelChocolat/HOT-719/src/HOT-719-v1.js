(function () {
  const defaultLinks = [
    {
      text: 'Chocolate Boxes',
      link: '/uk/shop/collections/?prefn1=productType&prefv1=Boxed%20Chocolates&inStockOnly=true',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
    },
    {
      text: 'Easter',
      link: '/uk/shop/collections/?prefn1=productType&prefv1=Extra%20Thick%20Easter%20Eggs%7CChocolate%20Egg%20Sandwiches%7COstrich%20Easter%20Eggs%7CSplat%20Easter%20Eggs%7CNibbly%20Eggs&inStockOnly=true',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc9368dfe/images/300837.jpg?sw=250&sh=250&sm=fit',
    },
    {
      text: 'Hampers',
      link: '/uk/shop/collections/?prefn1=productType&prefv1=Hampers&inStockOnly=true',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
    },
    {
      text: 'Hot Chocolate & Velvetiser',
      link: '/uk/shop/collections/?prefn1=productType&prefv1=Hot%20Chocolate%7CVelvetisers&inStockOnly=true',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0e16d34/images/112272.jpg?sw=250&sh=250&sm=fit',
    },
    {
      text: 'Alcohol',
      link: '/uk/shop/collections/?prefn1=productType&prefv1=Alcohol&inStockOnly=true',
      image:
        '/on/demandware.static/-/Sites-HotelChocolat-Library/default/v6c91385b5ec5b8dfd842d35c43cc7e59d9784c00/640px-Images/copper_velvetiser.png?version=1,670,939,453,000',
    },
    {
      text: 'Under £25',
      link: '/uk/shop/collections/?pmin=0&pmax=25&inStockOnly=true',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0e16d34/images/112272.jpg?sw=250&sh=250&sm=fit',
    },
    {
      text: 'Under £50',
      link: '/uk/shop/collections/?inStockOnly=true&pmin=0&pmax=50',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7a77c3ae/images/504107.jpg?sw=500&sh=500&sm=fit',
    },
  ];
  const easterLinks = [
    {
      text: 'Extra Thick Easter Eggs',
      link: '/uk/shop/easter-eggs/?prefn1=productType&prefv1=Extra%20Thick%20Easter%20Eggs',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0e16d34/images/112272.jpg?sw=250&sh=250&sm=fit',
    },
    {
      text: 'Chocolate Boxes',
      link: '/uk/shop/easter-eggs/?prefn1=productType&prefv1=Boxed%20Chocolates',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
    },
    {
      text: 'Ostrich Easter Eggs',
      link: '/uk/shop/easter-eggs/?prefn1=productType&prefv1=Ostrich%20Easter%20Eggs&inStockOnly=true',
      image:
        '/on/demandware.static/-/Sites-HotelChocolat-Library/default/v6c91385b5ec5b8dfd842d35c43cc7e59d9784c00/640px-Images/copper_velvetiser.png?version=1,670,939,453,000',
    },
    {
      text: 'Small Easter Gifts',
      link: '/uk/shop/easter-eggs/?prefn1=productType&prefv1=Splat%20Easter%20Eggs%7CNibbly%20Eggs%7CChocolate%20Egg%20Sandwiches',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
    },
    {
      text: 'Dark Chocolate',
      link: '/uk/shop/easter-eggs/?prefn1=chocolateTypes&prefv1=Dark',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0e16d34/images/112272.jpg?sw=250&sh=250&sm=fit',
    },
    {
      text: 'Vegan Chocolate',
      link: '/uk/shop/easter-eggs/?prefn1=isSuitableVegan&prefv1=true',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7a77c3ae/images/504107.jpg?sw=500&sh=500&sm=fit',
    },
  ];
  const birthdayLinks = [
    {
      text: 'Chocolate Boxes',
      link: '/uk/shop/gift-ideas/shop-by-occasion/birthday/?prefn1=productType&prefv1=Boxed%20Chocolates',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
    },
    {
      text: 'Hampers',
      link: '/uk/shop/gift-ideas/shop-by-occasion/birthday/?prefn1=productType&prefv1=Hampers',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0e16d34/images/112272.jpg?sw=250&sh=250&sm=fit',
    },
     {
      text: 'Hot Chocolate & Velvetiser',
      link: '/uk/shop/gift-ideas/shop-by-occasion/birthday/?prefn1=productType&prefv1=Velvetisers%7CHot%20Chocolate&inStockOnly=true',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7a77c3ae/images/504107.jpg?sw=500&sh=500&sm=fit',
    },
    {
      text: 'Alcohol',
      link: '/uk/shop/gift-ideas/shop-by-occasion/birthday/?prefn1=productType&prefv1=Alcohol',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
    },
    {
      text: 'Gifts Unders £25',
      link: '/uk/shop/collections/?inStockOnly=true&pmin=0&pmax=25',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0e16d34/images/112272.jpg?sw=250&sh=250&sm=fit',
    },
    {
      text: 'Gifts Under £50',
      link: '/uk/shop/gift-ideas/shop-by-occasion/birthday/?pmin=0&pmax=50&inStockOnly=true',
      image:
        '/on/demandware.static/-/Sites-HotelChocolat-Library/default/v6c91385b5ec5b8dfd842d35c43cc7e59d9784c00/640px-Images/copper_velvetiser.png?version=1,670,939,453,000',
    },
  ];
  const giftLinks = [
    {
      text: 'Chocolate Boxes',
      link: '/uk/shop/gift-ideas/?prefn1=productType&prefv1=Boxed%20Chocolates',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
    },
    {
      text: 'Hampers',
      link: '/uk/shop/gift-ideas/?prefn1=productType&prefv1=Hampers',
      image:
        '/on/demandware.static/-/Sites-HotelChocolat-Library/default/v6c91385b5ec5b8dfd842d35c43cc7e59d9784c00/640px-Images/copper_velvetiser.png?version=1,670,939,453,000',
    },  
    {
      text: 'Alcohol',
      link: '/uk/shop/gift-ideas/?prefn1=productType&prefv1=Alcohol',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0e16d34/images/112272.jpg?sw=250&sh=250&sm=fit',
    },
    {
      text: 'Hot Chocolate & Velvetiser',
      link: '/uk/shop/gift-ideas/?prefn1=productType&prefv1=Hot%20Chocolate%7CVelvetisers&inStockOnly=true',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0e16d34/images/112272.jpg?sw=250&sh=250&sm=fit',
    },
    {
      text: 'Gifts Under £25',
      link: '/uk/shop/gift-ideas/?pmin=0.00&pmax=25.10&inStockOnly=true',
      image:
        '/on/demandware.static/-/Sites-HotelChocolat-Library/default/v6c91385b5ec5b8dfd842d35c43cc7e59d9784c00/640px-Images/copper_velvetiser.png?version=1,670,939,453,000',
    },
    {
      text: 'Gifts Under £50',
      link: '/uk/shop/gift-ideas/?pmin=0&pmax=50&inStockOnly=true',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7a77c3ae/images/504107.jpg?sw=500&sh=500&sm=fit',
    },
  ];
  const mothersLinks = [
    {
      text: 'Chocolate Boxes',
      link: '/uk/shop/mothers-day-gifts/?prefn1=productType&prefv1=Boxed%20Chocolates',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
    },
    {
      text: 'Alcohol',
      link: '/uk/shop/mothers-day-gifts/?prefn1=productType&prefv1=Alcohol&inStockOnly=true',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
    },
    {
      text: 'Hot Chocolate & Velvetiser',
      link: '/uk/shop/mothers-day-gifts/?prefn1=productType&prefv1=Hot%20Chocolate%7CVelvetisers&inStockOnly=true',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
    },
    {
      text: 'Gifts Under £25',
      link: '/uk/shop/mothers-day-gifts/?pmin=0&pmax=25&inStockOnly=true',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7a77c3ae/images/504107.jpg?sw=500&sh=500&sm=fit',
    },
    {
      text: 'Gifts Under £50',
      link: '/uk/shop/mothers-day-gifts/?inStockOnly=true&pmin=0&pmax=50',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7a77c3ae/images/504107.jpg?sw=500&sh=500&sm=fit',
    },
    {
      text: 'Vegan Chocolate',
      link: '/uk/shop/mothers-day-gifts/?prefn1=isSuitableVegan&prefv1=true',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7a77c3ae/images/504107.jpg?sw=500&sh=500&sm=fit',
    },
  ];
  const hotchocLinks = [
    {
      text: 'Milk',
      link: '/uk/shop/collections/products/hot-chocolate/?prefn1=chocolateTypes&prefv1=Milk',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
    },
    {
      text: 'Dark',
      link: '/uk/shop/collections/products/hot-chocolate/?prefn1=chocolateTypes&prefv1=Dark',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0e16d34/images/112272.jpg?sw=250&sh=250&sm=fit',
    },
    {
      text: 'Caramel',
      link: '/uk/shop/collections/products/hot-chocolate/?prefn1=chocolateTypes&prefv1=Caramel',
      image:
        '/on/demandware.static/-/Sites-HotelChocolat-Library/default/v6c91385b5ec5b8dfd842d35c43cc7e59d9784c00/640px-Images/copper_velvetiser.png?version=1,670,939,453,000',
    },
    {
      text: 'Latte',
      link: '/uk/shop/collections/products/hot-chocolate/?prefn1=chocolateTypes&prefv1=Coffee',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
    },
    {
      text: 'Fruity',
      link: '/uk/shop/collections/products/hot-chocolate/?prefn1=chocolateTypes&prefv1=Fruity',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0e16d34/images/112272.jpg?sw=250&sh=250&sm=fit',
    },
    {
      text: 'Vegan',
      link: '/uk/shop/collections/products/hot-chocolate/?prefn1=isSuitableVegan&prefv1=true',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7a77c3ae/images/504107.jpg?sw=500&sh=500&sm=fit',
    },
  ];
  const defaultArray = [
    {
      url: `/shop/collections/`,
      content: defaultLinks,
    },
    {
      url: `/shop/gift-ideas/shop-by-occasion/birthday/`,
      content: birthdayLinks,
    },
    {
      url: `/shop/collections/products/hot-chocolate/`,
      content: hotchocLinks,
    },
    {
      url: `/shop/gift-ideas/`,
      content: giftLinks,
    },
    {
      url: `/shop/easter-eggs/`,
      content: easterLinks,
    },
    {
      url: `/shop/mothers-day-gifts/`,
      content: mothersLinks,
    },
  ];

  //Please don't edit anything below this line
  const shared = {
    ID: 'HOT-719',
    VARIATION: '1',
    CLIENT: 'HotelChocolat',
    LIVECODE: '',
  };

  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  const logMessage = (message) => {
    if (localStorage.getItem('ucdebug')) {
      if (window.console && typeof window.console.log == 'function') {
        console.log(message);
      }
    }
  };

  const events = {
    trackerName: false,
    propertyId: false,
    analyticsReference: 'ga',
    eventCache: [],
    sendEvents: true,
    setDefaultCategory(category) {
      this.category = category;
      return this;
    },
    setDefaultAction(action) {
      this.action = action;
      return this;
    },
    setPropertyId(propertyId) {
      // If set, will look for tracker matching given property ID
      this.propertyId = propertyId;
    },
    setTrackerName(trackerName) {
      this.trackerName = trackerName;
    },
    useLegacyTracker() {
      this.analyticsReference = '_gaq';
    },

    sendAuto(evVariation, evLabel, userOptions) {
      this.send(null, null, evLabel, userOptions, evVariation);
    },

    sendNormalised(evLabel, userOptions) {
      this.send(null, null, evLabel, userOptions);
    },

    send(evCategory, evAction, evLabel, userOptions, evVariation = null) {
      const options = userOptions || {};
      let label = evLabel;
      const category = evCategory || this.category;
      const action = evAction || this.action;

      let variation = evVariation;

      if (variation != null) {
        if (variation == 0) {
          variation = 'Control';
        }
        label = 'Variation: ' + variation + ' - ' + evLabel;
      }

      if (typeof options === 'object' && options.sendOnce) {
        const eventID = `${category}${action}${label}`;
        // Check eventCache to see if this has already been sent
        if (this.eventCache.indexOf(eventID) > -1) {
          return false;
        } else {
          // Store event in cache
          this.eventCache.push(eventID);
        }
      }

      logMessage(label);

      const self = this;
      const fire = (tracker) => {
        if (self.analyticsReference === '_gaq') {
          window._gaq.push([
            '_trackEvent',
            category,
            action,
            label,
            null,
            typeof options.nonInteraction !== 'undefined' ? options.nonInteraction : true,
          ]);
        } else {
          const opts = {
            nonInteraction: options.nonInteraction ? options.nonInteraction : true,
          };

          if (options.opts) {
            for (var k in options.opts) {
              opts[k] = options.opts[k];
            }
          }

          window[self.analyticsReference](`${tracker}.send`, 'event', category, action, label, opts);
        }
      };

      if (self.trackerName) {
        if (this.sendEvents == true) {
          fire(self.trackerName);
        }
      } else {
        // Set trackerName inside polling condition
        pollerLite(
          [
            () => {
              try {
                const trackers = window[self.analyticsReference].getAll();

                if (trackers && trackers.length) {
                  if (self.propertyId) {
                    for (let i = 0; i < trackers.length; i += 1) {
                      const tracker = trackers[i];
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
            },
          ],
          () => {
            if (this.sendEvents == true) {
              fire(self.trackerName);
            }
          },
          {
            wait: 150,
          }
        );
      }
    },
  };

  const newEvents = {
    initiate: false,
    methods: ['ga4'], // ga4 | datalayer | ua
    tracker: false, // custom tracker for UA
    property: false, // custom property for GA4
    uaRef: 'ga',

    send(label) {
      if (this.methods.includes('ga4')) {
        pollerLite([() => document.readyState === 'complete'], () => {
          if (window.gtag !== undefined) {
            window.gtag('event', 'experimentation', {
              experiment_id: `${ID}-${VARIATION}`,
              experiment_label: label,
              send_to: this.property || 'default',
            });
          } else {
            window.dataLayer = window.dataLayer || [];

            if (window.customGtag === undefined) {
              window.customGtag = function () {
                window.dataLayer.push(arguments);
              };
              window.customGtag('js', new Date());
              window.customGtag('config', this.property || 'default');
            }

            window.customGtag('event', 'experimentation', {
              experiment_id: `${ID}-${VARIATION}`,
              experiment_label: label,
              send_to: this.property || 'default',
            });
          }
        });
      }

      if (this.methods.includes('datalayer')) {
        pollerLite([() => !!window.dataLayer], () => {
          window.dataLayer.push({
            event: 'experimentation',
            experiment_id: `${ID}-${VARIATION}`,
            experiment_label: label,
          });
        });
      }

      if (this.methods.includes('ua')) {
        pollerLite([() => !!window[this.uaRef]], () => {
          const tracker = this.tracker || window[this.uaRef].getAll()[0].get('name');

          window[this.uaRef](`${tracker}.send`, 'event', 'experimentation', `${ID}-${VARIATION}`, label, {
            nonInteraction: true,
          });
        });
      }
    },
  };

  const setup = () => {
    // set up events
    events.setDefaultCategory('Experimentation');
    events.setDefaultAction(CLIENT + ' - ' + ID);

    if (LIVECODE == 'true') {
      events.sendEvents = false;
    } else {
      events.sendEvents = true;
    }

    // adds document body classlist
    document.documentElement.classList.add(ID);
    document.documentElement.classList.add(`${ID}-${VARIATION}`);
  };

  const fireEvent = (label, sendOnce = false) => {
    let labelMessage = 'Test ID: ' + ID + ' Variation: ' + VARIATION + ' Label: ' + label;
    if (newEvents.initiate == false) {
      events.sendNormalised(labelMessage, {
        sendOnce: sendOnce,
      });
    } else {
      newEvents.send(label);
    }
  };

  const getNow =
    Date.now ||
    function getNow() {
      return new Date().getTime();
    };

  const mergeObjects = (target, source) => {
    const merged = target;
    Object.keys(source).forEach((key) => {
      const sourceValue = source[key];
      const targetValue = merged[key];
      const isObject = targetValue && typeof targetValue === 'object' && !(targetValue instanceof Array);

      if (isObject) {
        // If object, call function recursively to overwrite subproperties individually
        merged[key] = mergeObjects(targetValue, sourceValue);
      } else {
        // Overwrite default with value from options
        merged[key] = sourceValue;
      }
    });
    return merged;
  };

  const pollerLite = (conditions, callback, userOptions) => {
    /**
     * Default options
     */
    let options = {
      wait: 50,
      multiplier: 1.1,
      timeout: 0,
    };

    // Overwrite any default options with user supplied options
    if (userOptions) {
      options = mergeObjects(options, userOptions);
    }

    const { multiplier, wait } = options;
    const timeout = options.timeout ? new Date(getNow() + options.timeout) : null;
    const isTimedOut = () => timeout && getNow() > timeout;
    const successfulConditions = [];

    const evaluateCondition = (condition) => {
      if (!condition) {
        return false;
      }

      const types = {
        function: () => condition(),
        string: () => document.querySelector(condition),
      };

      const evaluate = types[typeof condition];
      return evaluate ? evaluate() : true;
    };

    const allConditionsPassed = () => successfulConditions.length === conditions.length;

    const pollForCondition = (condition, waitTime, skipWait) => {
      // End recursion if timeout has passed
      if (timeout && isTimedOut()) {
        return false;
      }

      const result = evaluateCondition(condition);

      if (result) {
        successfulConditions.push(result);
        if (allConditionsPassed()) {
          // Run the callback and pass the results as the first argument
          callback(successfulConditions);
        }
      } else {
        setTimeout(
          () => {
            pollForCondition(condition, waitTime * multiplier);
          },
          skipWait ? 0 : waitTime
        );
      }
    };

    // Start polling for all conditions
    for (let i = 0; i < conditions.length; i += 1) {
      if (typeof conditions[i] != 'string' && typeof conditions[i] != 'function') {
        throw 'Every item in the poller array should be a function or a string';
      }
      pollForCondition(conditions[i], wait, true);
    }
  };

  const observer = {
    active: [],

    connect: function connectMethod(elements, cb, userOptions) {
      let options = {
        throttle: 1000,
        config: {
          attributes: true,
          childList: true,
          subtree: false,
        },
      };

      // Overwrite any default options with user supplied options
      if (userOptions) {
        options = mergeObjects(options, userOptions);
      }

      let blockCb;
      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (!blockCb) {
            blockCb = true;
            cb(elements, mutation);
            setTimeout(() => {
              blockCb = false;
            }, options.throttle);
          }
        });
      });

      if (elements.jquery) {
        // jQuery object
        for (let i = 0; i < elements.length; i += 1) {
          mutationObserver.observe(elements[i], options.config);
          this.active.push([elements[i], mutationObserver]);
        }
      } else {
        // HTMLElement
        mutationObserver.observe(elements, options.config);
        this.active.push([elements, mutationObserver]);
      }

      return mutationObserver;
    },

    disconnect: function disconnectMethod(elements) {
      const { active } = this;

      // Removes observers from active element
      function removeObservers(element) {
        for (let i = 0; i < active.length; i += 1) {
          if (element === active[i][0]) {
            active[i][1].disconnect();
          }
        }
      }

      // For each element in argument check if the node exists in active
      // If it does, disconnect the MutationObserver
      if (elements.length) {
        for (let i = 0; i < elements.length; i += 1) {
          removeObservers(elements[i]);
        }
      } else {
        removeObservers(elements);
      }
    },
  };

  const setCookie = (c_name, value, exdays, c_domain, exms) => {
    c_domain = !c_domain ? '' : 'domain=' + c_domain + ';';
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var exp = exms ? new Date(exdate.getTime() + exms) : exdays ? exdate : null;
    var c_value = escape(value) + (exp == null ? '' : '; expires=' + exp.toUTCString());
    document.cookie = c_name + '=' + c_value + ';' + c_domain + 'path=/';
  };

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^|;\\s?)${name}=([^;]*)`));
    return match && match[2] ? unescape(match[2]) : undefined;
  };

  const addActiveClassBasedOnURL = () => {
    const currentParams = new URLSearchParams(window.location.search);
    const currentPrefv1 = currentParams.get('prefv1');
    const currentPrefv1Values = currentPrefv1 ? currentPrefv1.split('|').map(v => v.trim()) : [];
  
    const quickLinks = document.querySelectorAll(`.${ID}-quicklinks--item`);
  
    quickLinks.forEach((link) => {
      const linkUrl = new URL(link.href, window.location.origin);
      const linkParams = new URLSearchParams(linkUrl.search);
      const linkPrefv1 = linkParams.get('prefv1');
      const linkPrefv1Values = linkPrefv1 ? linkPrefv1.split('|').map(v => v.trim()) : [];
  
      let isActive = false;
  
      if (currentPrefv1 && linkPrefv1) {
        // Check if ANY value from linkPrefv1 exists in currentPrefv1
        isActive = linkPrefv1Values.some(val => currentPrefv1Values.includes(val));
      } else if (!currentPrefv1 && !linkPrefv1) {
        // Both don't have prefv1, compare full params (sorted)
        const currentEntries = Array.from(currentParams.entries()).sort();
        const linkEntries = Array.from(linkParams.entries()).sort();
  
        if (currentEntries.length === linkEntries.length) {
          isActive = currentEntries.every(
            ([key, value], index) =>
              key === linkEntries[index][0] && value === linkEntries[index][1]
          );
        }
      }
  
      // Add or remove class based on active status
      if (isActive) {
        link.classList.add(`${ID}__activeQuickLinkBtn`);
      } else {
        link.classList.remove(`${ID}__activeQuickLinkBtn`);
      }
    });
  };
  
  const scrollToActiveLink = () => {
    const container = document.querySelector(".HOT-719-quicklinks--inner");
    const activeLink = document.querySelector(".HOT-719__activeQuickLinkBtn");
  
    if (container && activeLink && window.innerWidth <= 768) {
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeLink.getBoundingClientRect();
  
      //Calculate scrollLeft position
      const offset = activeRect.left - containerRect.left + container.scrollLeft;
      
      //Smooth scroll using scrollLeft
      container.scrollTo({ left: offset - 20, behavior: "smooth" });
    }
  }

  const startExperiment = () => {
    let currWindowHref = window.location.href;
    if (currWindowHref.indexOf(`?`) > -1) {
      currWindowHref = currWindowHref.split(`?`)[0];
    }
    let toDisplay = false;
    let displayedArray = [];

    defaultArray.forEach((item) => {
      let builtUpURL = `https://www.hotelchocolat.com/uk${item.url}`;
      if (currWindowHref == builtUpURL) {
        toDisplay = true;
        displayedArray = item.content;
      }
    });

    if (!toDisplay) {
      fireEvent(`Interaction - the experiment shouldn't fire on this category page`, true);
    } else {
      let linksUsed = displayedArray;
      let linksHTML = `
      <div class="${ID}-quicklinks">
        <div class="${ID}-quicklinks--inner">
          ${linksUsed
            .map((item) => {
              return `
                  <a href="${item.link}" class="${
                window.location.href === item.link ? `active-${VARIATION}` : ''
              } ${ID}-quicklinks--item ${item.text.replaceAll(' ', '-').toLowerCase()}">
  
                    <img src="${item.image}" class="${ID}-quicklinks--image" style="display:none;" />
                    <p class="${ID}__text">${item.text}</p>
                  </a>
                `;
            })
            .join('')}
        </div>
      </div>  
    `;

      pollerLite(['#page_heading'], () => {
        let pageHeading = document.getElementById('page_heading');
        pageHeading.insertAdjacentHTML('afterend', linksHTML);

        fireEvent('Interaction - experiment displayed on screen', true);

        let allAddedLinks = document.querySelectorAll(`.${ID}-quicklinks--item`);
        [].slice.call(allAddedLinks).forEach((item) => {

          item.addEventListener('click', (e) => {
            let linkText = e.target.closest(`.${ID}-quicklinks--item`).querySelector('p').innerText;
            
            fireEvent(`Click - user clicked ${linkText} link`, true);
            setCookie(`${ID}-clicked-link`, `true`);
          });
        });

        addActiveClassBasedOnURL();
        scrollToActiveLink();
      });
    }
  };

  const activate = () => {
    newEvents.initiate = true;
    newEvents.methods = ['ga4'];
    newEvents.property = 'G-B37NQR1RWZ';

    setup();

    fireEvent('Conditions Met');

    pollerLite(['#wrapper'], () => {
      let wrapper = document.getElementById('wrapper');

      if (wrapper.classList.contains('pt_product-search-result')) {
        if (VARIATION !== 'control') {
          startExperiment();

          observer.connect(
            document.querySelector('#main'),
            () => {
              if (!document.querySelector(`.${ID}-quicklinks`)) {
                startExperiment();
              }
            },
            {
              attributes: true,
              childList: true,
            }
          );
        }
        fireEvent(`Interaction - user has viewed PLP page ${window.location.href}`, true);

        document.body.addEventListener('click', (e) => {
          if (e.target.closest('#QuickViewDialog #add-to-cart') || e.target.id == 'add-to-cart') {
            fireEvent(
              `Interaction - user has added item to basket using the Quick View ${
                getCookie(`${ID}-clicked-link`) == `true`
                  ? `after clicking on a quicklink`
                  : `without having clicked on a quicklink`
              }`,
              true
            );
          }
        });
      } else if (wrapper.classList.contains('pt_product-details')) {
        fireEvent(`Interaction - user has viewed PDP page ${window.location.href}`, true);

        document.body.addEventListener('click', (e) => {
          if (e.target.classList.contains('add-to-cart')) {
            fireEvent(
              `Interaction - user has added item to basket ${
                getCookie(`${ID}-clicked-link`) == `true`
                  ? `after clicking on a quicklink`
                  : `without having clicked on a quicklink`
              }`,
              true
            );
          }
        });
      }

      document.body.addEventListener('click', (e) => {
        if (e.target.closest('#search-form')) {
          fireEvent(`Click - user has clicked into the search field`, true);
        }
      });

      if (window.outerWidth < 960) {
        observer.connect(
          document.querySelector('#hamburger-menu'),
          () => {
            fireEvent(`Click - user has clicked the mobile navigation`, true);
            observer.disconnect();
          },
          {
            attributes: true,
            childList: true,
          }
        );
      } else {
        pollerLite([`#desktop-navigation`], () => {
          let nav = document.getElementById('desktop-navigation');
          nav.addEventListener('mouseenter', () => {
            fireEvent(`Interaction - user has entered the navigation`, true);
          });
        });
      }
    });
  };

  pollerLite(['body'], activate);
})();
