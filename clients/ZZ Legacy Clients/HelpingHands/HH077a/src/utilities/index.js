import { events } from './eventsConfig';
import shared from './shared';

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
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  let labelMessage = 'Test ID: ' + ID + ' Variation: ' + VARIATION + ' Label: ' + label;

  events.sendNormalised(labelMessage, {
    sendOnce: sendOnce,
  });
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
