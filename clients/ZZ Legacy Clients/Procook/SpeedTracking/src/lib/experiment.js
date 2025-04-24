//////////////////////////////////////
// Speed tracking through Target
// This is a simplified version of the GTM script
// It measures landing page and hit-scoped events only (not session)
// It's optimised for passing straight into GA (not through GTM)
//////////////////////////////////////

import { events } from './../../../../../lib/utils';
import shared from './shared';
import webVitalsFactory from './web-vitals';

export default () => {
  const { ID, VARIATION } = shared;

	// CLS is only reported on page unload usually so use beacon to prevent hits being missed
	ga('set', 'transport', 'beacon');

  // Check if this is a new session (last hit was > 12 hours ago)
  var isFirstHit = true;
  var date = Math.abs(new Date())
  if (window.localStorage.speed_lastHit && (Math.abs(date - window.localStorage.speed_lastHit) / 36e5) <= 12) {
    isFirstHit = false;
  }

  // Save current hit time
  window.localStorage.speed_lastHit = date

  //////////////////////////////////////
  // Save and push metric
  // This function adds recorded metrics to the DataLayer, and to LocalStorage
  /////////////////////////////////////
  var setMetric = function(name, value) {
    // Round values, to reduce sampling in GA
    if (name === 'CLS' || name === 'FID') {
      value = value.toFixed(2)
    } else {
      value = value / 1000
      value = value.toFixed(1)
    }

    if (isFirstHit) {
      var eventCategory = 'Page speed - first hit'
    } else {
      var eventCategory = 'Page speed'
    }
    var eventAction = name
    var eventLabel = value
    var eventValue = value

    // SEND GA EVENT
    dataLayer.push({
      event: eventCategory,
      metric: name,
      score: value
    });

    const data = {
      'send_to': 'G-S1VS3P8S5D',
      'non_interaction': true,
      'first_hit': isFirstHit ? true : false,
    };

    data[name] = value;

    gtag('event', 'Performance', data);
  }

  //////////////////////////////////////
  // WebVitals library
  // Most of our metrics come from Google's WebVitals library
  // https://github.com/GoogleChrome/web-vitals
  /////////////////////////////////////
  if(typeof window.webVitals != 'function') {
    webVitalsFactory();
  }

  var webVitalsCallback = function(metric) {
    setMetric(metric.name, metric.value)
  }
  // Register WebCoreVitals listeners
  webVitals.getCLS(webVitalsCallback);
  webVitals.getFID(webVitalsCallback);
  webVitals.getLCP(webVitalsCallback);
  // webVitals.getFCP(webVitalsCallback);
  // webVitals.getTTFB(webVitalsCallback);

  //////////////////////////////////////
  // Load event
  // Because the WebVitals library doesn't report on page load event, we get that manually
  /////////////////////////////////////
  var pageLoadCallback = function() {
    // Check if navigation API is supported, then call the setMetric function
    if (
      window.performance &&
      window.performance.getEntriesByType('navigation') &&
      window.performance.getEntriesByType('navigation')[0]
    ) {
      setMetric('load', window.performance.getEntriesByType('navigation')[0].loadEventEnd)
    };
  }

  // If event has already fired, call the callback - if not, add a listener
  if (document.readyState === 'complete') {
    pageLoadCallback();
  } else {
    window.addEventListener('speed_load', pageLoadCallback);
  };
};
