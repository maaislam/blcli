(function () {
  const quickLinks = [
    {
      title: 'Easter',
      url: '/uk/shop/easter-eggs/',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
    },
    {
      title: 'Hot Chocolate',
      url: '/uk/shop/collections/products/hot-chocolate/',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0e16d34/images/112272.jpg?sw=250&sh=250&sm=fit',
    },
    {
      title: 'Velvetiser',
      url: '/uk/shop/collections/products/the-velvetiser/',
      image:
        '/on/demandware.static/-/Sites-HotelChocolat-Library/default/v6c91385b5ec5b8dfd842d35c43cc7e59d9784c00/640px-Images/copper_velvetiser.png?version=1,670,939,453,000',
    },
    {
      title: 'Gift Ideas',
      url: '/uk/shop/gift-ideas/',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit',
    },
    {
      title: 'Chocolate Boxes',
      url: '/uk/shop/collections/products/chocolate-box/',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0e16d34/images/112272.jpg?sw=250&sh=250&sm=fit',
    },
    {
      title: 'Alcohol',
      url: '/uk/shop/collections/products/wine-chocolate/',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7a77c3ae/images/504107.jpg?sw=500&sh=500&sm=fit',
    },
    {
      title: 'Birthday Gift',
      url: '/uk/shop/gift-ideas/shop-by-occasion/birthday/',
      image:
        '/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7a77c3ae/images/504107.jpg?sw=500&sh=500&sm=fit',
    },
  ];

  const shared = {
    ID: 'HOT-718',
    VARIATION: '2',
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

    /**
     * Shorthand for sending events
     */
    sendAuto(evVariation, evLabel, userOptions) {
      this.send(null, null, evLabel, userOptions, evVariation);
    },

    sendNormalised(evLabel, userOptions) {
      this.send(null, null, evLabel, userOptions);
    },

    /**
     * Send an event
     * @param {string} evCategory
     * @param {string} evAction
     * @param {string} evLabel
     * @param {object} userOptions
     */
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

    /**
     * A date object created from the timeout option for easier comparison
     * @type {Date}
     */
    const timeout = options.timeout ? new Date(getNow() + options.timeout) : null;

    /**
     * Check if the poller has timed out
     * @returns {boolean}
     */
    const isTimedOut = () => timeout && getNow() > timeout;

    /**
     * Any successful polling conditions are pushed here to keep track of progress
     * @type {array}
     */
    const successfulConditions = [];

    /**
     * Check if a condition has passed
     * Conditions are evaluated differently depending on the type
     * Functions must return true and strings should be CSS selectors present in the DOM
     * @param {*} condition
     * @returns {boolean}
     */
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

    /**
     * Check if all the conditions have passed
     * @returns {boolean}
     */
    const allConditionsPassed = () => successfulConditions.length === conditions.length;

    /**
     * Recursive poll for a condition until it returns true
     * @param {*} condition
     * @param {number} waitTime Time before next polling attempt
     * @param {boolean} skipWait Bypasses the wait period if true
     */
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

  const wouldHaveSeen = (element, level) => {
    pollerLite([element], () => {
      var isFired = false;
      if (!isFired) {
        const targetDom = document.querySelector(element);
        if (targetDom) {
          var position = targetDom.getBoundingClientRect();
          if (position.top > 100 && position.bottom < window.innerHeight - 250) {
            fireEvent(`${level}`);
            isFired = true;
          }
        }
      }

      document.addEventListener('scroll', () => {
        if (!isFired) {
          const targetDom = document.querySelector(element);

          if (targetDom) {
            var position = targetDom.getBoundingClientRect();
            if (position.top > 100 && position.bottom < window.innerHeight - 100) {
              fireEvent(`${level}`);
              isFired = true;
            }
          }
        }
      });
    });
  };

  const init = () => {
    pollerLite(['#header-promo-banner'], () => {
      const promoBanner = document.querySelector('#header-promo-banner');

      let html = `
            <div class="${ID}-quick-links">
                <div class="quick-links__container">
                ${quickLinks
                  .map(
                    (link) => `
                    <div class="quick-links__item">
                        <a href="${link.url}" class="quick-links__link">
                        ${link.title}
                        </a>
                    </div>`
                  )
                  .join('')}
                </div>
            </div>`;

      if (!document.querySelector(`.${ID}-quick-links`)) {
        promoBanner.insertAdjacentHTML('afterend', html);
      }
      wouldHaveSeen(`.${ID}-quick-links`, `User sees the quicklinks`);

      const quickLinkElems = document.querySelectorAll(`.${ID}-quick-links a.quick-links__link`);
      if (quickLinkElems.length > 0) {
        quickLinkElems.forEach((link) => {
          link.addEventListener('click', () => {
            fireEvent(`User clicks on the ${link.textContent.trim()} quicklink`);
          });
        });
      }
    });
  };

  const activate = () => {
    newEvents.initiate = true;
    newEvents.methods = ['ga4'];
    newEvents.property = 'G-B37NQR1RWZ';

    setup();

    fireEvent('Conditions Met');

    if (VARIATION == 'control') {
      return;
    }

    init();
  };

  pollerLite(['body'], activate);
})();
