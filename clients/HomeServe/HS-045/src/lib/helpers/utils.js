import shared from '../../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

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
/**
 * Standard experiment setup
 */
export const setup = () => {
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

export const fireEvent = (label, sendOnce = false) => {
  let labelMessage = 'Test ID: ' + ID + ' Variation: ' + VARIATION + ' Label: ' + label;
  if (newEvents.initiate == false) {
    events.sendNormalised(labelMessage, {
      sendOnce: sendOnce,
    });
  } else {
    newEvents.send(label);
  }
};

export const newEvents = {
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
            action: label,
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
            experiment_id: `${ID}-${VARIATION} `,
            action: label,
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
          action: label,
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

export const obsIntersection = (target, threshold, callback) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // if (entry.intersectionRatio > 0 && entry.isIntersecting && entry.boundingClientRect.y > 0) {

        // }
        callback(entry);
      });
    },
    { threshold: threshold }
  );
  if (!target) {
    return;
  }

  observer?.observe(target);
};

export const onUrlChange = (callback, onError = null) => {
  if (typeof callback !== 'function') {
    throw new Error('Callback function must be provided');
  }
  const mutationConfig = {
    childList: true,
    subtree: true,
  };
  //Create a new MutationObserver instance to observe changes to the document body
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      //Store the current URL in a separate variable to make the code more concise
      const currentUrl = window.location.href;
      //Check if the URL has changed since the last observation
      if (observer.previousUrl !== currentUrl) {
        const oldHref = observer.previousUrl;
        //Update the previous URL and execute the callback function
        observer.previousUrl = currentUrl;
        //console.log('URL changed!');
        observer.disconnect();
        try {
          setTimeout(() => {
            callback(oldHref, mutation);
          }, 100);
        } catch (error) {
          console.log(`Error in callback function: ${error}`);
        }
        observer.observe(document.documentElement, mutationConfig);
      }
    });
  });

  //Initialize the previous URL to the current URL

  try {
    observer.previousUrl = window.location.href;
    //Start observing changes to the document documentElement to detect URL changes
    observer.observe(document.documentElement, mutationConfig);
  } catch (error) {
    if (onError && typeof onError === 'function') {
      onError(error);
    } else {
      console.log(`Error starting onUrlChange observer: ${error}`);
    }
  }
};
