/**
 * Win Stack
 *
 * Hold reference to objects that we'll later release
 *
 * <code>
 *
 * addEventListener(document.body, 'click', () => {
 *   console.log('my event listener');
 * });
 *
 * </code>
 */
import shared from './shared';
import { poller, observer } from '../../../../../lib/uc-lib';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
/**
 * Set up stack (ref. window)
 */
window.UC = window.UC || {};
const experiments = window.UC.experiments = (window.UC.experiments || {});
export const stack = experiments[ID] = experiments[ID] || {};

stack.pollers = stack.pollers || [];
stack.eventListeners = stack.eventListeners || [];
stack.observers = stack.observers || [];
stack.intervals = stack.intervals || [];

/**
 * @desc Hold a reference to a poller
 * @param {object} poller
 */
export const addPoller = (conditionsArray, callbackFunction, settings = {}) => {
  const p = poller(conditionsArray, callbackFunction, settings);

  stack.pollers.push(p);
};

/**
 * @desc Hold a reference to an interval
 */
export const addInterval = (fn, delay) => {
  const interval = setInterval(fn, delay);

  stack.intervals.push(interval);
};

/**
 * Add mutation observer
 */
export const addObserver = (elements, cb, opts = {}) => {
  var obs = observer.connect(elements, cb, opts);

  stack.observers.push(obs);

  return obs;
};

/**
 * @desc Event Listener
 *
 * @param {string} eventType
 * @param {function} listenerFunction
 */
export const addEventListener = (elm, eventType, listenerFunction) => {
  const listener = elm.addEventListener(eventType, listenerFunction);

  stack.eventListeners.push({
    elm: elm,
    eventType: eventType,
    listenerFunction: listenerFunction
  });
};

/**
 * Helper destroy all pollers
 */
export const destroyPollers = () => {
  if((window.UC.experiments[ID] || {}).pollers) {
    const pollers = window.UC.experiments[ID].pollers;
    for(let i = 0; i < pollers.length; i++) {
        pollers[i].destroy();
    }

    window.UC.experiments[ID].pollers = [];
  }
};

/**
 * Helper destroy all pollers
 */
export const destroyIntervals = () => {
  if((window.UC.experiments[ID] || {}).intervals) {
    const intervals = window.UC.experiments[ID].intervals;
    for(let i = 0; i < intervals.length; i++) {
        clearInterval(intervals[i]);
    }

    window.UC.experiments[ID].intervals = [];
  }
};

/**
 * @desc Kill all event listeners that we held a reference to
 */
export const killAllEventListeners = () => {
  (stack.eventListeners || []).forEach((listener) => {
    if(listener.elm && listener.eventType && listener.listenerFunction) {
      listener.elm.removeEventListener(listener.eventType, listener.listenerFunction);
    }
  });

  window.UC.experiments[ID].eventListeners = [];
};

/**
 * Kill all observers
 */
export const killObservers = () => {
  var winObservers = stack.observers || [];
  winObservers.forEach((obs) => {
    obs.disconnect();
  });

  window.UC.experiments[ID].observers = [];
};
