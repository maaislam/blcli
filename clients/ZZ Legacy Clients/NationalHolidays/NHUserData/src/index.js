import { pollerLite } from '../../../../lib/uc-lib';
import { availableSeats, availableSeatsFromDom } from './lib/data';
import { createLocalStore } from './lib/storage';
import { getUrlParameter } from '../../../../lib/utils';

/**
 * These events are dispatched when data is saved on the
 * corresponding page (quickview, itineraries, booking, etc.)
 *
 * <code>
 *  document.addEventListener('NHXXX-quickview-data-saved', () => {});
 * </code>
 */
const EVENTS = {
  'quickview': 'NHXXX-quickview-data-saved',
  'itineraries': 'NHXXX-itineraries-data-saved',
  'booking': 'NHXXX-booking-data-saved',
};

/**
 * Ref
 */
const LOCAL_STORE_KEY = 'NHXXXUserData';
const LOCAL_TOURREF_KEY = 'NHXXXTrackedTourRef';
  
// ---------------------------------------------------
// ** N.B. **
//
// This is a USER TRACKING component that should run
// at 100% 
//
// Every data item captured is added to value generator
// and then we write to local storage
// ---------------------------------------------------

/**
 * Helper add num available to store
 */
const addNumAvailableToStore = (tourRef, numAvailable, store, cb) => {
  const timestamp = +new Date();

  store.add(['available_seats', tourRef, 'seat_availability_as_seen', timestamp], numAvailable);

  store.save(LOCAL_STORE_KEY);

  if(typeof cb == 'function') {
    cb();
  }
}

/**
 * Store seat availability
 */
const storeSeatAvailability = (tourRef, store, cb) => {
  if(tourRef) {
    availableSeats(tourRef).then((numAvailable) => {
      addNumAvailableToStore(tourRef, numAvailable, store, cb);
    });
  }
};

/**
 * Track the referer and if it contains the tour ref, we'll keep a reference in local
 * storage -- this is part of the booking process, and allows us to know which tour 
 * is being booked when we land on the seat selector page
 */
const trackRefererTourRef = () => {
  if(document.referrer && document.referrer.match(/tourref/i)) {
    const tourref = getUrlParameter('tourref', document.referrer);
    if(tourref) {
      localStorage.setItem(LOCAL_TOURREF_KEY, decodeURIComponent(tourref));
    }
  }
};

/**
 * Entry point for running experiment
 */
const init = () => {
  // ----------------------------
  // Initialise store
  // ----------------------------
  const store = createLocalStore(window.localStorage);
  store.load(LOCAL_STORE_KEY);
  
  // ----------------------------
  // QUICK VIEW
  // ----------------------------
  if(window.location.pathname.match('search-results')) {
    const quickViewDataEvent = document.createEvent('Event');
    quickViewDataEvent.initEvent(EVENTS['quickview'], true, true);

    /**
     * Quick view
     */
    window.jQuery(document).ajaxComplete(function(event, xhr, options) {
      if (options.url.match('GetSeatplan') && !options.url.match('ref=UC')) {
        const tourRefElm = document.querySelector('#divQuickviewPopup [data-tourref]');
        const tourRef = tourRefElm.dataset['tourref'];

        storeSeatAvailability(tourRef, store, () => {
          document.dispatchEvent(quickViewDataEvent);
        });
      }
    });

  }
  
  // ----------------------------
  // ITINERARIES PACKAGE DATA
  // ----------------------------
  if(window.location.pathname.match('itineraries')) {
    const itinerariesDataEvent = document.createEvent('Event');
    itinerariesDataEvent.initEvent(EVENTS['itineraries'], true, true);

    /**
     * Helper
     */
    const itineraries = () => {
      pollerLite([
        '[data-tourref]',
      ], () => {
        const tourRef = document.querySelector('[data-tourref]').dataset.tourref;
        storeSeatAvailability(tourRef, store, () => {
          document.dispatchEvent(itinerariesDataEvent);
        });
      });
    };

    if(['complete', 'interactive'].indexOf(document.readyState) > -1) {
      itineraries();
    } else {
      window.addEventListener('load', () => {
        itineraries();
      });
    }
  }
  
  // ----------------------------
  // BOOKING FORM
  // ----------------------------
  const localTourRef = localStorage.getItem(LOCAL_TOURREF_KEY);
  if(window.location.pathname.match(/OrderProcess\/SeatPlan.aspx/i) && localTourRef) {
    const bookingDataEvent = document.createEvent('Event');
    bookingDataEvent.initEvent(EVENTS['booking'], true, true);

    pollerLite([
      '.seat-block .seat',
    ], () => {
      const numAvailable = availableSeatsFromDom();

      addNumAvailableToStore(localTourRef, numAvailable, store, () => {
        document.dispatchEvent(bookingDataEvent);  
      });
    });
  }
};

// ----------------------------------------------
// Tour Ref tracking
//
// When a user books, it goes via a specific
// booking URL so we use that info to track
// the tour reference of the currently being booked
// package
//
// - No polling required
// ----------------------------------------------
trackRefererTourRef();

// ----------------------------------------------
// Generic Poller
//
// - Rules for across all variations
// - Rules for across all combinations
// ----------------------------------------------
pollerLite([
  () => !!window.jQuery,
  () => !!window.localStorage,
  () => (((window || {}).navigator || {}).userAgent) && window.navigator.userAgent.indexOf('MSIE ') === -1,
  () => {
    // Not IE11
    const result = (((window || {}).navigator || {}).userAgent) &&
    !(window.navigator.userAgent.indexOf('Trident') > -1 && !!window.navigator.userAgent.match(/rv[: ]11/i));
    return result;
  },
], init);
