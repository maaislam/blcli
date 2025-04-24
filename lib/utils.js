/**
 * @fileoverview A collection of utilities providing solutions to problems
 * regularly encountered in the development of third-party A/B tests
 */
import throttle from 'lodash/throttle';

/**
 * Returns a function to get current time
 * @returns {Function}
 */
export const getNow = Date.now || function getNow() {
  return new Date().getTime();
};

/**
 * Merge together two objects with properties of the source object taking priority
 * The function is called recursively for properties that are also objects to avoid
 * overwriting the entire source object
 * @param {object} target Base object
 * @param {object} source Object with properties that will overwrite target
 * @returns {object}
 */
export const mergeObjects = (target, source) => {
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

/**
 * Polling Element factory
 * @param {string|function} elm Condition
 * @param {integer} maxDuration In Millisecond
 */
const createPollingElement = ({ elm, maxDuration }) => ({
  elm,
  maxDuration,

  /**
   * Helper evaluate a poller expression (function / string) to
   * boolean condition check
   *
   * @param {any} expr    String or function to evaluate
   * @return {boolean}
   */
  expressionValidator(expr) {
    if (!expr) {
      throw Error('Invalid poller expression');
    }

    const type = typeof expr;

    switch (type) {
      case 'function':
        return !!expr.call();

      case 'string':
        return !!document.querySelector(expr);

      default:
        break;
    }

    return true;
  },

  /**
   * Destroy the element (clear future attempts to poll)
   */
  destroy() {
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
  poll(delay, multiplier, successCallback, timeoutCallback) {
    if (!this.startedAt) {
      this.startedAt = getNow();
    }

    const exceedsMaxDuration = this.maxDuration ? (this.startedAt + this.maxDuration) < getNow() : false;

    if (exceedsMaxDuration) {
      if (typeof timeoutCallback === 'function') {
        timeoutCallback(this.elm);
      }
      this.destroy();

      return false;
    }

    this.winTimeout = setTimeout(() => {
      if (this.expressionValidator(this.elm)) {
        return successCallback(this);
      } else {
        this.poll(delay * multiplier, multiplier, successCallback, timeoutCallback);
      }
    }, delay);
  },
});

/**
 * @desc Check the existence of elements or some other logic
 * @param {array} elements
 * @param {function} cb Success callback
 * @param {object} options
 * @return {object}
 */
export const poller = (elements, cb, options) => {
  const settings = {
    wait: 50,
    multiplier: 1.1,
    timeout: 0,
    timeoutCallback() {},
  };

  // Overwrite defaults with values from options
  if (options) {
    Object.keys(options).forEach((key) => {
      settings[key] = options[key];
    });
  }

  const pollingElements = [];
  const successfullyPolledElements = [];

  for (let i = 0; i < elements.length; i += 1) {
    const pollingElement = createPollingElement({
      elm: elements[i],
      maxDuration: settings.timeout,
    });

    pollingElements.push(pollingElement);

    pollingElement.poll(settings.wait, settings.multiplier, (pollingElement) => {
      successfullyPolledElements.push(pollingElement);

      if (successfullyPolledElements.length === elements.length) {
        cb();
      }
    }, settings.timeoutCallback);
  }

  return {
    destroy() {
      pollingElements.forEach(item => item.destroy());
    },
  };
};

/**
 * @desc Lightweight version of the poller that doesn't include some advanced functionality
 *  Check the existence of elements or some other logic.
 * @param {array} conditions
 * @param {function} callback
 * @param {options} userOptions
 */
export const pollerLite = (conditions, callback, userOptions) => {
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
    if(!condition) {
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
      setTimeout(() => {
        pollForCondition(condition, waitTime * multiplier);
      }, skipWait ? 0 : waitTime);
    }
  };

  // Start polling for all conditions
  for (let i = 0; i < conditions.length; i += 1) {
    if( (typeof conditions[i] != 'string') && (typeof conditions[i] != 'function') ) {
      throw "Every item in the poller array should be a function or a string";
    }
    pollForCondition(conditions[i], wait, true);
  }
};

/**
 * @desc Helpers to make working with MutationObservers easier
 */
export const observer = {
  /**
   * A reference to all elements with active observers applied with observer.connect
   * @type {array}
   */
  active: [],

  /**
   * @method Observer.connect
   * @desc Simplifies creating a MutationObservers and provides a throttle setting
   * @param  {Object} elements The element(s) to connect a MutationObserver to
   * @param  {function} cb Callback to run on mutation
   * @param  {Object} userOptions Settings to modify the behaviour of Observer
   * @param  {number} userOptions.throttle Minimum time to wait before callback can be fired again
   * @param  {object} userOptions.config MutationObserver config object (see: https://developer.mozilla.org/en/docs/Web/API/MutationObserver#MutationObserverInit)
   */
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

  /**
   * @method Observer.disconnect
   * @desc Allows MutationObservers connected with Observer.connect to easily be removed.
   * All MutationObservers will be removed from specified element(s).
   * @param  {object} elements - the elements to remove all MutationObservers from
   */
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

/**
 * @desc Pass an array of elements and a number to split them into.
 * Useful for separating elements into sections.
 * @param {HTMLElement} elements
 * @param {number} num
 */
export const group = (elements, num) => {
  const groups = [];

  for (let i = 0; i < elements.length; i += num) {
    groups.push(elements.slice(i, i + num));
  }

  return groups;
};

/**
 * Define a function to be invoked on mouseleave if the user hovered for a minimum of 'x' ms.
 * Useful for sending GA events on tooltip hovers as it avoids sending if a user just skims over.
 * @param {HTMLElement} elements
 * @param {function} cb
 * @param {number} delay
 */
export const hoverDelay = (elements, cb, delay) => {
  if (!$) return false;
  let hovered;
  let startHover;
  if (!delay) delay = 1000;
  $(elements).hover(() => {
    startHover = getNow();
  }, () => {
    if (!hovered) {
      const endHover = getNow();
      const msHovered = endHover - startHover;
      if (msHovered >= delay) {
        cb();
        hovered = true;
      }
    }
  });

  return elements;
};

/**
 * @desc FullStory tagging
 * @param {string} experimentStr Experiment ID to show in Fullstory
 * @param {string} variationStr Variation number to show in Fullstory
 */
export const fullStory = (experimentStr, variationStr) => {
  pollerLite([() => {
    const fs = window.FS;
    if (fs && fs.setUserVars) return true;
  }], () => {
    window.FS.setUserVars({
      experiment_str: experimentStr,
      variation_str: variationStr,
    });
  }, { multiplier: 1.2, timeout: 0 });
};

/**
 * @desc Universal GA event sender that works on all client implementations of GA
 * Polls for ga to exist and gets the tracker name from ga.getAll() to ensure
 * events are always sent
 */
export const events = {
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

    if(variation != null) {
      if(variation == 0) {
        variation = 'Control';
      }
      label = "Variation: "+variation+" - "+evLabel;
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
        window._gaq.push(['_trackEvent', category, action, label, null, (typeof options.nonInteraction !== 'undefined' ? options.nonInteraction : true)]);
      } else {
        const opts = { 
          nonInteraction: (options.nonInteraction ? options.nonInteraction : true) 
        };

        if(options.opts) {
          for(var k in options.opts) {
            opts[k] = options.opts[k]
          }
        }

        window[self.analyticsReference](
          `${tracker}.send`, 'event', category, action, label, opts
        );
      }
    };

    if (self.trackerName) {
      if(this.sendEvents == true) {
        fire(self.trackerName);
      }
      
    } else {
      // Set trackerName inside polling condition
      pollerLite([() => {
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
      }], () => {
        if(this.sendEvents == true) {
          fire(self.trackerName);
        }
        }, {
        wait: 150,
      });
    }
  },
};

/**
 * Load a script wrapped in a promise. Any additional requests for the same script
 * following the first attempt will instead return the original promise.
 * This is useful to avoid sending unnecessary network requests when a script
 * is required across multiple experiments
 * @param {string} url
 * @param {boolean} options.async
 * @param {boolean} options.defer
 * @returns {Promise}
 */
export const globalGetScript = (url, options) => {
  window.ucGlobals = window.ucGlobals || {};
  const { ucGlobals } = window;

  ucGlobals.requests = ucGlobals.requests || {};
  const { requests } = ucGlobals;

  const opts = options || {};

  /**
   * Create a script and resolve the promise on load
   * @returns {Promise}
   */
  const getScript = () => new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.async = opts.async instanceof Boolean ? opts.async : true;
    script.defer = opts.defer instanceof Boolean ? opts.defer : false;

    const onloadHander = (_, isAbort) => {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = null;
        script.onreadystatechange = null;
        script = undefined;

        if (isAbort) {
          reject();
        } else {
          resolve();
        }
      }
    };

    script.onload = onloadHander;
    script.onreadystatechange = onloadHander;
    script.src = url;

    document.body.insertAdjacentElement('beforeend', script);
  });

  const isPromise = requests[url] instanceof Promise;
  if (!isPromise) {
    requests[url] = getScript();
  }

  return requests[url];
};

/**
 * Load a stylesheet from a URL and append link to document head
 * @param {string} url
 */
export const loadStyleSheet = (url) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  document.head.appendChild(link);
};

/**
 * @desc Destroys any pollers in the window.UC.experiments[ID] object
 * Useful for SPAs where code is no longer needed after a page change
 * @param {string} ID - Experiment ID
 */
export const destroyPollers = (ID) => {
  if ((window.UC.experiments[ID] || {}).pollers) {
    const { pollers } = window.UC.experiments[ID];
    for (let i = 0; i < pollers.length; i += 1) {
      pollers[i].destroy();
    }

    window.UC.experiments[ID].pollers = [];
  }
};

/**
 * Run a callback when an element is in view
 * @param {HTMLElement} element The element you want to track viewability of
 * @param {function} cb Callback function to run once the element is in full view
 * @param {Object} options Settings for the tracker
 * @param {boolean} options.removeOnView Removes scroll tracking when element is in view
 * @param {number} options.throttle Custom throttle timing
 */
export const viewabilityTracker = (element, cb, options, cb2) => {
  let throttledCheckElement;
  const stageHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  options = options || {
    zeroHeightElementsNotInView: true, /* Zero height elements are usually hidden */
    throttle: 250, /* Scroll throttle delay */
    allElementHasToBeInView: true, /* Otherwise only top of element has to be in view */
    removeOnView: true, /* cb fires once only */
    onlyFireIfInView: true,
  };
  const delay = options.throttle || 250;

  const elementIsInView = (element, stageHeight) => {
    const elementBoundingBox = element.getBoundingClientRect();
    if (options.zeroHeightElementsNotInView && elementBoundingBox.height == 0) {
      return false;
    }
    const elementsTopY = elementBoundingBox.top;
    const elementsBottomY = elementBoundingBox.top + elementBoundingBox.height;

    if (options.allElementHasToBeInView) {
      return elementsTopY >= 0 && elementsBottomY < stageHeight;
    } else {
      if(options.onlyFireIfInView) {
        return elementsBottomY > 0 && elementsTopY <= stageHeight;
      } else {
        return elementsTopY <= stageHeight;
      }
    }
  };

  const checkElement = () => {
    if (elementIsInView(element, stageHeight)) {
      cb();
      if (options.removeOnView) {
        window.removeEventListener('scroll', throttledCheckElement);
      }
    } else {
      if(typeof cb2 == 'function') {
        cb2();
      }
    }
  };

  throttledCheckElement = throttle(checkElement, delay);
  window.addEventListener('scroll', throttledCheckElement);
  checkElement();
};

/**
 * @param {HTMLElement} element
 * @param {Boolean} allElementHasToBeInView
 */
export const elementIsInView = (element, allElementHasToBeInView = false) => {
  const stageHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  const elementBoundingBox = element.getBoundingClientRect();

  const elementsTopY = elementBoundingBox.top ;
  const elementsBottomY = elementBoundingBox.top + elementBoundingBox.height;


  if (allElementHasToBeInView) {
    return elementsTopY >= 0 && elementsBottomY < stageHeight;
  } else {
    return elementsBottomY >= 0 && elementsTopY <= stageHeight;
    
  }
};

/** Class for native JS animations */
export class Animation {
  /**
   * Animate the style property of an element
   * @param {Object} options Options object
   * @param {HTMLElement} options.elem
   * @param {string} options.style CSS property to animate
   * @param {string} options.unit % or px
   * @param {number} options.from Animate value from
   * @param {number} options.to Animate value to
   * @param {number} options.time Time to complete animation
   * @param {number} options.buffer Time between each value change
   *  lower results in a smoother animation but is worse for performance
   * @param {function} options.beforeAnim Function to run before animation
   * @param {function} options.afterAnim Function to run after animation
   */
  constructor(options) {
    // Set defaults
    this.options = {
      elem: options.elem,
      style: options.style,
      unit: options.unit !== undefined ? options.unit : 'px',
      from: options.from !== 'undefined' ? options.from : options.elem.style[options.style],
      to: options.to,
      time: options.time !== 'undefined' ? options.time : 3000,
      buffer: options.buffer !== 'undefined' ? options.buffer : 20,
      beforeAnim: options.beforeAnim,
      afterAnim: options.afterAnim,
    };
    this.animate();
  }

  animate() {
    const {
      elem,
      style,
      unit,
      from,
      to,
      time,
      buffer,
      beforeAnim,
      afterAnim,
    } = this.options;

    // Run beforeAnim function
    if (beforeAnim && typeof beforeAnim === 'function') beforeAnim();

    // Initial values
    elem.style[style] = from + unit;
    const start = new Date().getTime();

    /**
     * Update style value for the next frame
     */
    const nextFrame = () => {
      const step = Math.min(1, (new Date().getTime() - start) / time);
      elem.style[style] = (from + step * (to - from)) + unit;
      if (step === 1) {
        if (afterAnim && typeof afterAnim === 'function') afterAnim();
      } else {
        window.requestAnimationFrame(nextFrame);
      }
    };

    // Init
    setTimeout(() => {
      window.requestAnimationFrame(nextFrame);
    }, buffer);
  }
}

/**
 * Returns true if an element has overflowing content
 * @param {HTMLElement}
 * @returns {boolean}
 */
export const isOverflown = ({
  clientWidth,
  clientHeight,
  scrollWidth,
  scrollHeight,
}) => scrollHeight > clientHeight || scrollWidth > clientWidth;

/**
 * @desc Helper for setting cookies
 * @param {string} c_name Cookie name
 * @param {string} value Cookie value
 * @param {number|null} exdays Number of days before expiry
 * @param {string|null} c_domain Domain to store cookie on
 * @param {string|null} exms Number of ms before expiry
 */
export const setCookie = (c_name, value, exdays, c_domain, exms) => {
  c_domain = (!c_domain) ? "" : "domain=" + c_domain + ";";
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var exp = exms ? new Date(exdate.getTime()+exms) : (exdays ? exdate : null);
  var c_value = escape(value) + ((exp==null) ? "" : "; expires="+exp.toUTCString());
  document.cookie = c_name + "=" + c_value + ";" + c_domain + "path=/";
};

/**
 * @desc Helper for getting cookies
 * @param {string} name Cookie name
 */
export const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^|;\\s?)${name}=([^;]*)`));
  return match && match[2] ? unescape(match[2]) : undefined;
};

/**
 * @desc Helper for deleting cookies
 * @param {string} name Cookie name
 */
export const deleteCookie = (name) => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

/**
 * @desc Sort select options alphabetically by text value (Note: jQuery dependant)
 * @param {jQuery} $ 
 * @param {String|HTMLElement} selector The CSS selector for the 'select' element
 * @param {boolean} skipFirst Skips first 'option' in 'select' element as this is sometimes a placeholder
 */
export const sortSelectOptions = ($, selector, skipFirst) => {
  const options = skipFirst ? $(selector).children('option:not(:first)') : $(selector).children('option');
  const arr = options.map((_, o) => ({
    t: $(o).text(),
    v: o.value,
    s: $(o).prop('selected'),
  })).get();
  arr.sort((o1, o2) => {
    const t1 = o1.t.toLowerCase();
    const t2 = o2.t.toLowerCase();
    return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
  });
  options.each((i, o) => {
    o.value = arr[i].v;
    $(o).text(arr[i].t);
    if (arr[i].s) {
      $(o).attr('selected', 'selected').prop('selected', true);
    } else {
      $(o).removeAttr('selected');
      $(o).prop('selected', false);
    }
  });
};

/**
 * @desc Adds JS event with older browser compatibility
 * @param {HTMLElement} el Element to add event to
 * @param {string} type Event type
 * @param {function} fn Event handler
 */
export const addEvent = (el, type, fn) => {
  if (el.attachEvent) {
    el['e' + type + fn] = fn;
    el[type + fn] = function () {
      el['e' + type + fn](window.event);
    }
    el.attachEvent(`on${type}`, el[type + fn]);
  } else {
    el.addEventListener(type, fn, false);
  }
};

/**
 * @desc Removes JS event with older browser compatibility
 * @param {HTMLElement} el Element to remove event from
 * @param {string} type Event type
 * @param {function} fn Event handler
 */
export const removeEvent = (el, type, fn) => {
  if (el.detachEvent) {
    el.detachEvent(`on${type}`, el[type + fn]);
    el[type + fn] = null;
  } else {
    el.removeEventListener(type, fn, false);
  }
};

/**
 * @desc Equivalent to jQuery's .trigger() method
 * @param {HTMLElement} el Element to trigger event on
 * @param {string} type Event to fire
 */
export const eventFire = (el, type) => {
  if (el.fireEvent) {
    el.fireEvent(`on${type}`);
  } else {
    const evObj = document.createEvent('Events');
    evObj.initEvent(type, true, false);
    el.dispatchEvent(evObj);
  }
};

/**
 * @desc Converts a string to title case
 * @param {string} str String to convert to title case
 */
export const toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

/**
 * @desc Get coordinates of an element
 * @returns {Object} Coordinates of element
 */
export const getPosition = (element) => {
  let xPosition = 0;
  let yPosition = 0;

  while (element) {
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    element = element.offsetParent;
  }

  return { x: xPosition, y: yPosition };
};

/**
 * @desc Animate scroll to a point on the page
 * @param {number} scrollTarget Point on Y-axis to scroll to
 * @param {number} speed Speed of scroll in ms
 * @param {number} delay Initial delay before scroll
 * @param {string} easing String defining the easing setting - default: easeOutSine
 */
export const scrollTo = (scrollTarget, scrollSpeed, scrollEasing) => {
  const scrollY = window.scrollY;
  const target = scrollTarget || 0;
  const speed = scrollSpeed || 2000;
  const easing = scrollEasing || 'easeOutSine';
  let currentTime = 0;

  // min time .1, max time .8 seconds
  const time = Math.max(.1, Math.min(Math.abs(scrollY - target) / speed, .8));

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
  const PI_D2 = Math.PI / 2;
  const easingEquations = {
    easeOutSine: pos => Math.sin(pos * (Math.PI / 2)),
    easeInOutSine: pos => (-0.5 * (Math.cos(Math.PI * pos) - 1)),
    easeInOutQuint: pos => (pos /= 0.5) < 1 ? 0.5 * Math.pow(pos, 5) : 0.5 * (Math.pow((pos - 2), 5) + 2),
  };

  // add animation loop
  const tick = () => {
    currentTime += 1 / 60;
    const p = currentTime / time;
    const t = easingEquations[easing](p);
    if (p < 1) {
      window.requestAnimationFrame(tick);
      window.scrollTo(0, scrollY + ((target - scrollY) * t));
    } else {
      window.scrollTo(0, target);
    }
  }

  tick();
}

/**
 * @desc Slugify Convert to alphanumeric no spaces lower case string
 * @param {string} text
 * @returns {string}
 */
export const slugify = text => text.replace(/[^A-Z0-9]/ig, '').toLowerCase();

/**
 * @returns {boolean}
 * @desc Is touch device - basic check
 */
export const isTouchDevice = () => ('ontouchstart' in window || (navigator && navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0));

/**
 * Helper get url parameter
 */
export const getUrlParameter = (name, url) => {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,'\\\]');
  const regexS = `[\\?&]${name}=([^&#]*)`;
  const regex = new RegExp(regexS);
  const results = regex.exec(url);
  return results == null ? null : results[1];
};

/**
 * Helper add url parameter
 */
export const addUrlParameter = (url, parameterName, parameterValue, atStart) => {
  const replaceDuplicates = true;
  let cl;
  let urlhash;

  parameterName = encodeURIComponent(parameterName);
  parameterValue = encodeURIComponent(parameterValue);

  if (url.lastIndexOf('#') > 0) {
    cl = url.lastIndexOf('#');
    urlhash = url.substring(cl, url.length);
  } else {
    urlhash = '';
    cl = url.length;
  }

  const sourceUrl = url.substring(0, cl);
  const urlParts = sourceUrl.split('?');
  let newQueryString = '';

  if (urlParts.length > 1) {
    const parameters = urlParts[1].split('&');
    for (let i = 0; (i < parameters.length); i += 1) {
      const parameterParts = parameters[i].split('=');
      if (!(replaceDuplicates && parameterParts[0] === parameterName)) {
        if (newQueryString === '') {
          newQueryString = '?';
        } else {
          newQueryString += '&';
        }
        newQueryString += `${parameterParts[0]}=${parameterParts[1] ? parameterParts[1] : ''}`;
      }
    }
  }

  if (newQueryString === '') {
    newQueryString = '?';
  }

  if (atStart) {
    newQueryString = `?${parameterName}=${parameterValue}${newQueryString.length > 1 ? `&${newQueryString.substring(1)}` : ''}`;
  } else {
    if (newQueryString !== '' && newQueryString !== '?') {
      newQueryString += '&';
    }
    newQueryString += `${parameterName}=${(parameterValue ? parameterValue : '')}`;
  }
  return urlParts[0] + newQueryString + urlhash;
};

/**
 * Helper to update url parameter
 * @param {String} uri url/uri to update
 * @param {String} key Name of query param
 * @param {String} value Value to update to
 */
export const updateUrlParameter = (uri, key, value) => {
  const re = new RegExp('([?&])' + key + '=.*?(&|#|$)', 'i');
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2');
  } else {
    let hash =  '';
    if( uri.indexOf('#') !== -1 ){
        hash = uri.replace(/.*#/, '#');
        uri = uri.replace(/#.*/, '');
    }
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';    
    return uri + separator + key + '=' + value + hash;
  }
};


/**
 * @desc Equivalent to jQuery's prevAll() method. Traverses backwards
 * and returns an array of all previous siblings
 * @param {HTMLElement} elem
 * @param {string} filter Selector
 */
export const getPreviousSiblings = (elem, filter) => {
  const sibs = [];
  while (elem = elem.previousSibling) {
    if (elem.nodeType === 3) continue; // text node
    if (!filter || filter(elem)) sibs.push(elem);
  }
  return sibs;
};

/**
 * Native JS method of finding the closest parent element matching a selector
 * @param {HTMLElement} elem Element to begin traversing from
 * @param {string} selector Selector to look for in parent tree
 */
export const getClosest = function (elem, selector) {
	// Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function(s) {
        const matches = (this.document || this.ownerDocument).querySelectorAll(s);
        let i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
	}

	// Get the closest matching element
	for (; elem && elem !== document; elem = elem.parentNode) {
		if (elem.matches(selector)) return elem;
	}
	return null;
};

/**
 * Returns an inverse/opposing/complimentary colour from a hex code
 * Useful for setting dynamic background colours based on the colour of the content
 *
 * https://stackoverflow.com/a/35970186/2057512
 * @param {string} hex HEX code to invert
 * @param {boolean} bw If true returns either black or white - whichever is better for contrast
 * @param {number} threshold (optional) Custom threshold for determining contrast
 * @returns {string} Complimentary colour HEX Code
 */
export const invertColor = (hex, bw, threshold) => {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }

  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);

  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return (r * 0.299 + g * 0.587 + b * 0.114) > (threshold || 186)
      ? '#000000'
      : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
};

/**
 * Returns an object containing the frequency of each colour
 * used in an image
 * @param {HTMLElement} img Image element
 * @returns {object}
 */
export const getColours = (img) => {
  // Draw image on cavas
  const canvas = document.createElement("canvas");
  const c = canvas.getContext('2d');
  c.width = canvas.width = img.width;
  c.height = canvas.height = img.height;
  c.clearRect(0, 0, c.width, c.height);
  c.drawImage(img, 0, 0, img.width , img.height);

  // Get colors
  const pixels = c.getImageData(0, 0, c.width, c.height);
  const colours = {};
  let col;
  let r = 0;
  let g = 0;
  let b = 0;
  let a = 0;
  for (let i = 0, data = pixels.data; i < data.length; i += 4) {
    r = data[i]; // red
    g = data[i + 1]; // green
    b = data[i + 2]; // blue
    a = data[i + 3]; // alpha

    // Skip pixels >50% transparent
    if (a < (255 / 2)) continue;

    // Convert RGB to HEX
    col = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    if (!colours[col]) colours[col] = 0;
    colours[col]++;
  }

  return colours;
};

/**
 * Convert RGB data to a HEX string
 * @param {number} r red
 * @param {number} g green
 * @param {number} b blue
 * @returns {string} HEX Code
 */
export const rgbToHex = (r, g, b) => '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

/**
 * Current-device
 * Adds device information to HTML element and global 'device' variable
 * From https://github.com/matthewhudson/current-device
 */
export const curDevice = () => {
  // Save the previous value of the device variable.
  const previousDevice = window.device

  const device = {}

  const changeOrientationList = []

  // Add device as a global object.
  window.device = device

  // The <html> element.
  const documentElement = window.document.documentElement

  // The client user agent string.
  // Lowercase, so we can use the more efficient indexOf(), instead of Regex
  const userAgent = window.navigator.userAgent.toLowerCase()

  // Detectable television devices.
  const television = [
      'googletv',
      'viera',
      'smarttv',
      'internet.tv',
      'netcast',
      'nettv',
      'appletv',
      'boxee',
      'kylo',
      'roku',
      'dlnadoc',
      'roku',
      'pov_tv',
      'hbbtv',
      'ce-html'
  ]

  // Main functions
  // --------------

  device.macos = function () {
      return find('mac')
  }

  device.ios = function () {
      return device.iphone() || device.ipod() || device.ipad()
  }

  device.iphone = function () {
      return !device.windows() && find('iphone')
  }

  device.ipod = function () {
      return find('ipod')
  }

  device.ipad = function () {
      return find('ipad')
  }

  device.android = function () {
      return !device.windows() && find('android')
  }

  device.androidPhone = function () {
      return device.android() && find('mobile')
  }

  device.androidTablet = function () {
      return device.android() && !find('mobile')
  }

  device.blackberry = function () {
      return find('blackberry') || find('bb10') || find('rim')
  }

  device.blackberryPhone = function () {
      return device.blackberry() && !find('tablet')
  }

  device.blackberryTablet = function () {
      return device.blackberry() && find('tablet')
  }

  device.windows = function () {
      return find('windows')
  }

  device.windowsPhone = function () {
      return device.windows() && find('phone')
  }

  device.windowsTablet = function () {
      return device.windows() && (find('touch') && !device.windowsPhone())
  }

  device.fxos = function () {
      return (find('(mobile') || find('(tablet')) && find(' rv:')
  }

  device.fxosPhone = function () {
      return device.fxos() && find('mobile')
  }

  device.fxosTablet = function () {
      return device.fxos() && find('tablet')
  }

  device.meego = function () {
      return find('meego')
  }

  device.cordova = function () {
      return window.cordova && location.protocol === 'file:'
  }

  device.nodeWebkit = function () {
      return typeof window.process === 'object'
  }

  device.mobile = function () {
      return (
          device.androidPhone() ||
          device.iphone() ||
          device.ipod() ||
          device.windowsPhone() ||
          device.blackberryPhone() ||
          device.fxosPhone() ||
          device.meego()
      )
  }

  device.tablet = function () {
      return (
          device.ipad() ||
          device.androidTablet() ||
          device.blackberryTablet() ||
          device.windowsTablet() ||
          device.fxosTablet()
      )
  }

  device.desktop = function () {
      return !device.tablet() && !device.mobile()
  }

  device.television = function () {
      let i = 0
      while (i < television.length) {
          if (find(television[i])) {
              return true
          }
          i++
      }
      return false
  }

  device.portrait = function () {
      return window.innerHeight / window.innerWidth > 1
  }

  device.landscape = function () {
      return window.innerHeight / window.innerWidth < 1
  }

  // Public Utility Functions
  // ------------------------

  // Run device.js in noConflict mode,
  // returning the device variable to its previous owner.
  device.noConflict = function () {
      window.device = previousDevice
      return this
  }

  // Private Utility Functions
  // -------------------------

  // Simple UA string search
  function find(needle) {
      return userAgent.indexOf(needle) !== -1
  }

  // Check if documentElement already has a given class.
  function hasClass(className) {
      return documentElement.className.match(new RegExp(className, 'i'))
  }

  // Add one or more CSS classes to the <html> element.
  function addClass(className) {
      let currentClassNames = null
      if (!hasClass(className)) {
          currentClassNames = documentElement.className.replace(/^\s+|\s+$/g, '')
          documentElement.className = `${currentClassNames} ${className}`
      }
  }

  // Remove single CSS class from the <html> element.
  function removeClass(className) {
      if (hasClass(className)) {
          documentElement.className = documentElement.className.replace(
              ` ${className}`,
              ''
          )
      }
  }

  // HTML Element Handling
  // ---------------------

  // Insert the appropriate CSS class based on the _user_agent.

  if (device.ios()) {
      if (device.ipad()) {
          addClass('ios ipad tablet')
      } else if (device.iphone()) {
          addClass('ios iphone mobile')
      } else if (device.ipod()) {
          addClass('ios ipod mobile')
      }
  } else if (device.macos()) {
      addClass('macos desktop')
  } else if (device.android()) {
      if (device.androidTablet()) {
          addClass('android tablet')
      } else {
          addClass('android mobile')
      }
  } else if (device.blackberry()) {
      if (device.blackberryTablet()) {
          addClass('blackberry tablet')
      } else {
          addClass('blackberry mobile')
      }
  } else if (device.windows()) {
      if (device.windowsTablet()) {
          addClass('windows tablet')
      } else if (device.windowsPhone()) {
          addClass('windows mobile')
      } else {
          addClass('windows desktop')
      }
  } else if (device.fxos()) {
      if (device.fxosTablet()) {
          addClass('fxos tablet')
      } else {
          addClass('fxos mobile')
      }
  } else if (device.meego()) {
      addClass('meego mobile')
  } else if (device.nodeWebkit()) {
      addClass('node-webkit')
  } else if (device.television()) {
      addClass('television')
  } else if (device.desktop()) {
      addClass('desktop')
  }

  if (device.cordova()) {
      addClass('cordova')
  }

  // Orientation Handling
  // --------------------

  // Handle device orientation changes.
  function handleOrientation() {
      if (device.landscape()) {
          removeClass('portrait')
          addClass('landscape')
          walkOnChangeOrientationList('landscape')
      } else {
          removeClass('landscape')
          addClass('portrait')
          walkOnChangeOrientationList('portrait')
      }
      setOrientationCache()
  }

  function walkOnChangeOrientationList(newOrientation) {
      for (const index in changeOrientationList) {
          changeOrientationList[index](newOrientation)
      }
  }

  device.onChangeOrientation = function (cb) {
      if (typeof cb == 'function') {
          changeOrientationList.push(cb)
      }
  }

  // Detect whether device supports orientationchange event,
  // otherwise fall back to the resize event.
  let orientationEvent = 'resize'
  if (Object.prototype.hasOwnProperty.call(window, 'onorientationchange')) {
      orientationEvent = 'onorientationchange'
  }

  // Listen for changes in orientation.
  if (window.addEventListener) {
      window.addEventListener(orientationEvent, handleOrientation, false)
  } else if (window.attachEvent) {
      window.attachEvent(orientationEvent, handleOrientation)
  } else {
      window[orientationEvent] = handleOrientation
  }

  handleOrientation()

  // Public functions to get the current value of type, os, or orientation
  // ---------------------------------------------------------------------

  function findMatch(arr) {
      for (let i = 0; i < arr.length; i++) {
          if (device[arr[i]]()) {
              return arr[i]
          }
      }
      return 'unknown'
  }

  device.type = findMatch(['mobile', 'tablet', 'desktop'])
  device.os = findMatch([
      'ios',
      'iphone',
      'ipad',
      'ipod',
      'android',
      'blackberry',
      'windows',
      'fxos',
      'meego',
      'television'
  ])

  function setOrientationCache() {
      device.orientation = findMatch(['portrait', 'landscape'])
  }

  setOrientationCache()
}

/**
 * Is the element visible?
 *
 * @param {Element} elem
 */
export const isVisible = elem => !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

/**
 * Create an element from a string. The markup must contain closing tags
 * Example: '<div class="class"></div>'
 * @param {string} markup
 * @returns {HTMLElement}
 */
export const createElementFromString = (markup) => {
  const temporaryEl = document.createElement('div');
  temporaryEl.innerHTML = markup;
  return temporaryEl.firstChild;
}

/**
 * Get a wrapper element from a string or element
 * @param {HTMLElement|string} wrapper 
 * @returns {HTMLElement}
 */
const getWrapperElement = wrapper => wrapper instanceof HTMLElement ? wrapper : createElementFromString(wrapper);

/**
 * Wraps elements in another element
 * @param {HTMLElement|NodeList|Array.<HTMLElement>} childElement
 * @param {HTMLElement|string} wrapper
 * @returns {HTMLElement}
 */
export const wrap = (childElements, wrapper) => {
  const isSingleElement = childElements instanceof HTMLElement;
  const wrapperElement = getWrapperElement(wrapper);

  // Place single element into an array to normalise
  const normalisedChildElements = isSingleElement ? [childElements] : childElements;

  // If the element is exists in the document, move the wrapper above
  // the first child element so everything remains in the same place
  // once the child elements are moved
  const firstChildElement = normalisedChildElements[0];
  const isInDocument = document.contains(firstChildElement);
  if (isInDocument) {
    const parentElement = firstChildElement.parentNode;
    parentElement.insertBefore(wrapperElement, firstChildElement);
  }

  // Append all children to wrapper
  [].forEach.call(normalisedChildElements, (childElement) => {
    wrapperElement.appendChild(childElement);
  });

  return wrapperElement;
};

/*
 * Run a callback function after scrolling has stopped
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Function} callback The function to run after scrolling
 */
export const scrollStop = (callback) => {
	// Make sure a valid callback was provided
	if (!callback || typeof callback !== 'function') return;

	// Setup scrolling variable
	let isScrolling;

	// Listen for scroll events
	window.addEventListener('scroll', (event) => {
		// Clear our timeout throughout the scroll
		window.clearTimeout(isScrolling);

		// Set a timeout to run after scrolling ends
		isScrolling = setTimeout(() => {
			// Run the callback
			callback();
		}, 66);
	}, false);
};

/**
 * Escape all necessary characters in a string for use in a regex
 * @param {string} str
 * @returns {string}
 */
export const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * @desc Binds a toProperCase method to String prototype
 * This method can then be used to convert strings from upper/lowercase to capitalised
 */
export const bindToProperCase = () => {
  String.prototype.toProperCase = () => {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };
};

/*
 * Re-exports
 * Export utilties that were stored here previously for backwards compatibilty
 */
export { throttle };

export const fetchAffinity = () => { 
  return new Promise((resolve, reject) => {
    pollerLite([() => {
      let run = false;
      if (window.DYO && window.DYO.hosts && window.DYO.hosts.rcom && window.DY.scsec && window.DY.dyid) {
        run = true;
      }
      return run;
    }], () => {
      const AFF_URL = 'https://' + window.DYO.hosts.rcom + '/userAffinities?sec=' + window.DY.scsec + '&uid=' + window.DY.dyid;
      let request = new XMLHttpRequest();
      request.open('GET', AFF_URL, true);
    
      request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          // Success!
          const data = JSON.parse(this.response);

          const brands = data.brand;
          // Turn data (Object) into array
          const array = [];
          for (var brand in brands) {
            array.push([brand, brands[brand]])
          }
          
          array.sort(function(a, b) {
            return b[1] - a[1];
          });
          

          resolve(array.flat());
        } else {
          // We reached our target server, but it returned an error
          console.log('this status ', this.status);
          reject('failed get DY user affinities')
        }
      };
    
      request.onerror = function() {
        // There was a connection error of some sort
      };
    
      request.send();
    });
  });
};

export const fetchAffinityAllData = () => { 
  return new Promise((resolve, reject) => {
    pollerLite([() => {
      let run = false;
      if (window.DYO && window.DYO.hosts && window.DYO.hosts.rcom && window.DY.scsec && window.DY.dyid) {
        run = true;
      }
      return run;
    }], () => {
      const AFF_URL = 'https://' + window.DYO.hosts.rcom + '/userAffinities?sec=' + window.DY.scsec + '&uid=' + window.DY.dyid;
      let request = new XMLHttpRequest();
      request.open('GET', AFF_URL, true);
    
      request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          // Success!
          const data = JSON.parse(this.response);

          resolve(data);
        } else {
          // We reached our target server, but it returned an error
          console.log('this status ', this.status);
          reject('failed get DY user affinities')
        }
      };
    
      request.onerror = function() {
        // There was a connection error of some sort
      };
    
      request.send();
    });
  });
};

/**
 * Helper append CSS to page
 */
export const addCssToPage = (href, id, classes) => {
  if(document.querySelector('#' + id)) {
    return;
  }

  var c = document.createElement('link');
  c.setAttribute('id', id);
  c.setAttribute('rel', 'stylesheet');

  if(classes) {
    c.className = classes;
  }

  c.href = href;
  document.head.appendChild(c);
}

/**
 * Helper append JS to page
 */
export const addJsToPage = (src, id, cb, classes) => {
  if(document.querySelector('#' + id)) {
    return;
  }

  var s = document.createElement('script');
  if(typeof cb == 'function') {
    s.onload = cb;
  }

  if(classes) {
    s.className = classes;
  }

  s.src = src;
  s.setAttribute('id', id);
  document.head.appendChild(s);
}

/**
 * Observe page change using a mutation observer
 *
 * Sometimes we find the History API does not work for us
 * and so we need to keep hold of the URL href
 */
export const observePageChange = (appContainer, callback) => {
  let oldHref = document.location.href;

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      const href = document.location.href;

      if (oldHref != href) {
        const result = {oldHref, href};

        oldHref = href;

        callback(result);
      }
    });
  });

  const config = {
    childList: true,
    subtree: true
  };

  observer.observe(appContainer, config);

  return {
    stop: () => observer.disconnect()
  };
};

export const logMessage = (message) => {

  if(localStorage.getItem('ucdebug')) {

    if(window.console && typeof window.console.log == 'function') {
      console.log(message);
    } 

  }

}

/**
 * Check intersection
 *
 * @param {HTMLElement} target
 * @param {Number} threshold (0 to 1)
 * @param {Boolean} runOnce If true, disconnects the observer
 */
export const checkIntersection = (target, threshold = 0, runOnce = true) => {
  return new Promise((resolve, reject) => {
    const options = {
      rootMargin: '0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      const entry = entries?.[0];
      if(entry && entry.isIntersecting) {
        if(runOnce) {
          observer.disconnect();
        }

        resolve(observer);
      }
    }, options);

    observer.observe(target);  
  });
};

/**
 * Grep datalayer by matching term - dataLayers are arrays of objects so 
 * we have to filter by existence of a key name
 *
 * @param {String} keyName
 * @param {Boolean} workBackwards Get last result if true
 */
export const getDataLayerObjectByKey = (keyName, workBackwards = true) => {
  const result = window.dataLayer.filter(d => d[keyName]);
  return (workBackwards ? result.pop() : result.shift()) || {};
};

/**
 * Helper copy to clipboard
 */
export const copyToClipboard = (value, onSuccess) => {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      if (typeof onSuccess === 'function') onSuccess();
    })
    .catch((err) => {
      console.log('Something went wrong when copying to clipboard', err);
    });
};

export const sendHttpRequest = (
  type,
  url,
  data,
  requestHeader = 'application/x-www-form-urlencoded'
) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(type, url);

    if (data) {
      xhr.setRequestHeader('Content-Type', requestHeader);
    }

    xhr.addEventListener('load', () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Something went wrong')));

    xhr.send(data);
  });

  return promise;
};

export const serialize = (data) => {
  const obj = {};
  for (const [key, value] of data) {
    if (obj[key] !== undefined) {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      obj[key].push(value);
    } else {
      obj[key] = value;
    }
  }
  return obj;
};


export const nthDay = (d) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
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

export const insertBeforeElement = (entry, el) => {
  entry.parentNode.insertBefore(
    el,
    entry
  );
}

export const insertAfterElement = (entry, el) => {
  entry.parentNode.insertBefore(
    el,
    entry.nextElementSibling
  );
}

/**
 * Poll for a property on the window object.
 *
 * Works on nested properties e.g -
 * waitForGlobalProperty('my.object.property', () => {...})
 * Checks for 'window.my.object.property' to exist.
 * 
 * You can also check for an unnamed nested property e.g -
 * waitForGlobalProperty('my.object.3.property', () => {...})
 * Checks for 'window.my.object[3].property' to exist.
 * 
 * @param {String} keyPath 
 * @param {Function} callback Call function once property exists
 */
export const waitForGlobalProperty = (keyPath, callback) => {
  window.checkNested = (obj, args) => {
    for (var i = 0; i < args.length; i++) {
      if (!obj || !Object.prototype.hasOwnProperty.call(obj, args[i])) {
        return false;
      }
      obj = obj[args[i]];
    }
    return true;
  }
  
  const args = keyPath.split('.');
  if (window.checkNested(window, args)) {
    callback();
  } else {
    setTimeout(() => {
      waitForGlobalProperty(keyPath, callback);
    }, 100);
  }
}

export const stringToHTML = (string) => {
	const parser = new DOMParser();
	const doc = parser.parseFromString(string, 'text/html');
	return doc.body;
}