import { pollerLite } from '../../../../../lib/uc-lib';
import settings from './settings';
import pubSub from './PublishSubscribe';

/**
 * Add body classes
 *
 * @access private
 */
const addBodyClasses = () => {
  document.body.classList.add(settings.ID);

  document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
};

/**
 * Get data from local storage
 */
const getDataFromLocal = (tourRef) => {
  const data = JSON.parse(localStorage.getItem(settings.LOCAL_STORE_KEY) || {});

  if(data && data['available_seats']) {
    const tourData = data['available_seats'][tourRef];

    return tourData;
  }
};

/**
 * Check whether seating information for tour has changed
 * since their last visit
 *
 * Since we check every single time they view a package,
 * we are just going to assume that *any* differences in the number 
 * of seats from the earliest time they visited and now 
 * are what determines 'difference between last visited'
 */
const getNumSeatsBookedSinceEarliestVisit = (tourRef) => {
  const data = getDataFromLocal(tourRef);

  if(data && data['seat_availability_as_seen']) {
    const entries = data['seat_availability_as_seen'];

    let min = null;
    let max = 0;
    for(let timestamp in entries) {
      if(min === null || entries[timestamp] < min) {
        min = entries[timestamp];
      }

      if(entries[timestamp] > max) {
        max = entries[timestamp];
      }
    }

    return max - min;
  }

  return 0;
};

/**
 * QUICK VIEW
 */
const initUpdateQuickView = () => {
  pollerLite([
    '#divQuickviewPopup .nh14-seats',
    '#divQuickviewPopup .nh14-seating-title',
  ], () => {
    const elmsToRemove = [
      `.${settings.ID}-heading`,
      `.${settings.ID}-text`,
      `.${settings.ID}-seat-subtitle`,
    ];
    elmsToRemove.forEach((elmToRemove) => {
      [].forEach.call(document.querySelectorAll(elmToRemove), (elm) => {
        elm.remove();
      });
    });

    const tourRefElm = document.querySelector('#divQuickviewPopup [data-tourref]');
    if(tourRefElm) {
      const tourRef = tourRefElm.dataset['tourref'];
      if(tourRef) {
        const numBookedSince = getNumSeatsBookedSinceEarliestVisit(tourRef);
        if(numBookedSince >= settings.DIFFERENCE_DETERMINING_SHOULD_RUN) {
          setTimeout(() => {
            pollerLite([
              '#divQuickviewPopup .nh14-seating-title', 
              '#divQuickviewPopup .nh14-seats', 
            ], () => {
              if(settings.VARIATION == 'control') {
                window.dataLayer.push({
                  event: 'NH047control',
                  eventCategory: 'NH047-control',
                  eventAction: 'quickview-run'
                });
              } else {
                const seatTitle = document.querySelector('.nh14-seating-title');
                if(seatTitle) {
                  seatTitle.insertAdjacentHTML('afterend', `
                    <p class="${settings.ID}-seat-subtitle">(seating will be chosen at the booking stage)</p>
                  `);
                }

                const seats = document.querySelector('.nh14-seats');
                if(seats) {
                  seats.innerHTML = `
                    <div class="${settings.ID}-heading">Don't miss out!</div>
                    <div class="${settings.ID}-text">${numBookedSince} seats booked since your last visit</div>
                  `;
                }

                pubSub.publish('did-show-message', 'quickview');

                seats.addEventListener('mouseover', () => {
                  pubSub.publish('scarcity-hover--quickview');
                });
                seats.addEventListener('click', () => {
                  pubSub.publish('scarcity-click--quickview');
                });
              }
            });
          }, 100);
        }
      }
    }
  });
};

/** 
 * ITINERARIES PAGE
 */
const itinerariesPageNh20 = () => {
  pollerLite([
    '[data-tourref]',
    '.nh20-seats',
  ], () => {
    const tourRef = document.querySelector('[data-tourref]').dataset.tourref;
    const numBookedSince = getNumSeatsBookedSinceEarliestVisit(tourRef);
    if(numBookedSince >= settings.DIFFERENCE_DETERMINING_SHOULD_RUN) {
      if(settings.VARIATION == 'control') {
        window.dataLayer.push({
          event: 'NH047control',
          eventCategory: 'NH047-control',
          eventAction: 'itineraries-run'
        });
      } else {
        const wrap = document.querySelector(`${settings.ID}-itineraries-title-wrap`);
        if(wrap) {
          wrap.remove();
        }

        const seatArea = document.querySelector('.nh20-seats');
        if(seatArea) {
          seatArea.insertAdjacentHTML('beforebegin', `
            <div class="${settings.ID}-itineraries-title-wrap">
              <div class="${settings.ID}-heading">Don't miss out!</div>
              <div class="${settings.ID}-text">${numBookedSince} seats booked since your last visit</div>
            </div>
          `);

          pubSub.publish('did-show-message', 'itineraries');

          const elm = document.querySelector(`.${settings.ID}-itineraries-title-wrap`);
          elm.addEventListener('mouseover', () => {
            pubSub.publish('scarcity-hover--itineraries');
          });
          elm.addEventListener('click', () => {
            pubSub.publish('scarcity-click--itineraries');
          });
        }
      }
    }
  });
};

const itinerariesPage = () => {
  pollerLite([
    '[data-tourref]',
  ], () => {
    const tourRef = document.querySelector('[data-tourref]').dataset.tourref;
    const numBookedSince = getNumSeatsBookedSinceEarliestVisit(tourRef);
    if(numBookedSince >= settings.DIFFERENCE_DETERMINING_SHOULD_RUN) {
      if(settings.VARIATION == 'control') {
        window.dataLayer.push({
          event: 'NH047control',
          eventCategory: 'NH047-control',
          eventAction: 'itineraries-run'
        });
      } else {
        const wrap = document.querySelector(`${settings.ID}-itineraries-title-wrap`);
        if(wrap) {
          wrap.remove();
        }

        const bookSeats = document.querySelector('.book-seats');
        const seatArea = document.querySelector('.book-seats .seat-area');
        if(seatArea) {
          seatArea.insertAdjacentHTML('afterbegin', `
            <div class="${settings.ID}-itineraries-title-wrap">
              <div class="${settings.ID}-heading">Don't miss out!</div>
              <div class="${settings.ID}-text">${numBookedSince} seats booked since your last visit</div>
            </div>
          `);

          bookSeats.classList.add(`${settings.ID}-shows-message`);
          pubSub.publish('did-show-message', 'itineraries');

          const elm = document.querySelector(`.${settings.ID}-itineraries-title-wrap`);
          elm.addEventListener('mouseover', () => {
            pubSub.publish('scarcity-hover--itineraries');
          });
          elm.addEventListener('click', () => {
            pubSub.publish('scarcity-click--itineraries');
          });
        }
      }
    }
  });
};

/**
 * BOOKING PAGE
 */
const bookingPage = (tourRef) => {
  const existing = document.querySelector(`.${settings.ID}-booking-title-wrap`);
  if(existing) {
    existing.remove();
  }
  const numBookedSince = getNumSeatsBookedSinceEarliestVisit(tourRef);
  if(numBookedSince >= settings.DIFFERENCE_DETERMINING_SHOULD_RUN) {
    if(settings.VARIATION == 'control') {
      window.dataLayer.push({
        event: 'NH047control',
        eventCategory: 'NH047-control',
        eventAction: 'booking-page-run'
      });
    } else {
      const chooseSeat = document.querySelector('.choose-seat');
      if(chooseSeat) {
        chooseSeat.insertAdjacentHTML('beforebegin', `
          <div class="${settings.ID}-booking-title-wrap">
            <div class="${settings.ID}-heading">Don't miss out!</div>
            <div class="${settings.ID}-text">${numBookedSince} seats booked since your last visit</div>
          </div>
        `);

        pubSub.publish('did-show-message', 'booking');

        const elm = document.querySelector(`.${settings.ID}-booking-title-wrap`);
        elm.addEventListener('mouseover', () => {
          pubSub.publish('scarcity-hover--booking');
        });
        elm.addEventListener('click', () => {
          pubSub.publish('scarcity-click--booking');
        });

        if(window.innerWidth < 900) {
          const nh5pax = document.querySelector('.nh5-remaining-pax-wrap');
          if(nh5pax) {
            nh5pax.insertAdjacentElement('beforebegin', elm);
          }
        }
      }
    }
  }
};

/**
 * Entry point for running experiment
 *
 * @access public
 */
export default () => {
  // --------------------------------------------
  // Experiment is running
  // --------------------------------------------
  pubSub.publish('experiment-init');

  // --------------------------------------------
  // Add classes to body
  // --------------------------------------------
  addBodyClasses();
  
  // ----------------------------
  // QUICK VIEW
  // ----------------------------
  if(window.location.pathname.match('search-results')) {
    document.addEventListener('NHXXX-quickview-data-saved', () => {
      initUpdateQuickView();
    });
  }

  // When NH20 is running
  if(window.location.pathname.match('itineraries')) {
    pollerLite([() => {
      return !!document.querySelector('.nh20-seats');  
    }], itinerariesPageNh20);
  }

  // Desktop:
  document.addEventListener('NHXXX-itineraries-data-saved', () => {
    itinerariesPage();
  });

  // tour ref for booking page is held in local storage
  const localTourRef = localStorage.getItem(settings.LOCAL_TOURREF_KEY);
  if(window.location.pathname.match(/OrderProcess\/SeatPlan.aspx/i) && localTourRef) {
    bookingPage(localTourRef);
    const existing = document.querySelector(`.${settings.ID}-booking-title-wrap`);
    if(!existing) {
      document.addEventListener('NHXXX-booking-data-saved', () => {
        bookingPage(localTourRef);
      });
    }
  }
};
