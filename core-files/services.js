import { events, logMessage, pollerLite } from '../lib/utils';
import shared from './shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

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

export const bootsEvents = {
  initiate: false,
  methods: ['datalayer'], // ga4 | datalayer | ua
  tracker: false, // custom tracker for UA
  property: false, // custom property for GA4
  uaRef: 'ga',
  testID: '', // testID from triggers.js

  send(label, eventType, properties = {}) {
    if (this.methods.includes('datalayer')) {
      pollerLite([() => !!window.dataLayer && window.dataLayer.find(elem => elem.event == 'defaultPageView')], () => {
        const event = {
          event: eventType || 'experimentation',
          experience: `${this.testID}`,
          ...properties,
        };
        window.dataLayer.push(event);
      });
    }
  },
};

export const fireBootsEvent = (label, sendOnce = false, eventType, properties = {}) => {
  let labelMessage = 'Test ID: ' + ID + ' Variation: ' + VARIATION + ' Label: ' + label;
  if (bootsEvents.initiate == false) {
    events.sendNormalised(labelMessage, {
      sendOnce: sendOnce,
    });
  } else {
    bootsEvents.send(label, eventType, properties);
  }
};