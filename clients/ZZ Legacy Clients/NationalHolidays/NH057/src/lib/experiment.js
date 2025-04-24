/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { pollerLite } from './../../../../../lib/uc-lib';
import { events } from './../../../../../lib/utils';
import settings from './settings';

/**
 * Helper add seat numbers to seats
 *
 * On some displays, the seat numbers aren't given
 * We assume that seats run S1, S2, S3, S4 top left to bottom right...
 */
const addSeatNumbersToSeats = () => {
  const seatRows = document.querySelectorAll('.seat-area .seats .seat-row');
  const seatRowsArray = [].slice.call(seatRows);
  seatRowsArray.splice(2,1);

  // Build 1D array, easier to manipulate only seats...
  const flatArray = [];
  for(var i = 0; i < seatRowsArray.length; i++) {
    const seats = seatRowsArray[i].querySelectorAll('.seat');
    for(var j = 0; j < seats.length; j++) {
      if(!seats[j].classList.contains('blank')) {
        const multiplier = seatRowsArray.length * (j + 1);
        let seatNumber = multiplier - i;

        flatArray[seatNumber] = seats[j];
      }
    }
  }

  let cnt = 1;
  flatArray.forEach((seat) => {
    seat.dataset.ucseatnum = cnt;
    cnt += 1;
  });
};

/**
 * Create HTML for seats
 */
const createHTMLForSeats = (seats) => {
  let html = '';
  [].forEach.call(seats, (seat, idx) => {
    const seatNum = (seat.dataset && seat.dataset.ucseatnum) || '';
    const id = `${settings.ID}-seathtml-${idx}`;
    html += `
      <div id="${id}" class="${settings.ID}-seat-html">
        <span class="${settings.ID}-close">&times;</span>
        <p class="${settings.ID}-heading">Available - Seat <span>S${seatNum}</span></p>
        <p class="${settings.ID}-btn-wrap">
          <button class="${settings.ID}-btn">Book now</button>
        </p>
        <p class="${settings.ID}-end-message">
          * Seating will be chosen at the booking stage
        </p>
      </div>
    `;

    seat.setAttribute('data-tooltip-content', '#' + id);
  });

  document.body.insertAdjacentHTML('afterbegin', `
    <div class="${settings.ID}-hide">
      ${html}
    </div>
  `);

  // Add event listener to book buttons
  const buttons = document.querySelectorAll(`.${settings.ID}-btn`);
  [].forEach.call(buttons, (btn) => {
    btn.addEventListener('click', () => {
      events.send(`${settings.ID}`, 'clicked-book-now-button-in-tooltip');

      let targetBtn = document.querySelector('#divQuickviewPopup .btn-book-now');
      if(!targetBtn) {
        targetBtn = document.querySelector('.sticky-row .container .orange-btn');
      }

      if(targetBtn) {
        targetBtn.click();
      }
    });
  });
};

/**
 * Initialise tooltipster
 */
const initialiseTooltipster = (cb) => {
  jQuery.getScript('https://cdn.jsdelivr.net/npm/tooltipster@4.2.6/dist/js/tooltipster.bundle.min.js', () => {
    jQuery(`.${settings.ID}-tooltip`).tooltipster({
      trigger: 'click',
      interactive: true,
      functionBefore: (origin, tooltip) => {
        events.send(`${settings.ID}`, 'saw-a-tooltip');

      },
    });

    document.body.classList.add(`${settings.ID}-tooltips-initialised`);

    jQuery(`.${settings.ID}-close`).off('click').on( 'click', function(){
      events.send(`${settings.ID}`, 'clicked-close-cross');
      jQuery(`.${settings.ID}-tooltip`).tooltipster('hide');
    });

    if(typeof cb === 'function') {
      cb();
    }
  });
};

/**
 * Entry point for experiment
 */
const activate = () => {
  setup();

  if(window.location.pathname.match(/itineraries/i)) {
    pollerLite([
      '.seat-area .seats .seat:not(.blank)',
      '.seat-area .seats .seat.unavailable', // 'unavailable' class = available seat :(
      '.NH039', // rebuilds the seats available
      () => window.jQuery,
    ], () => {
      // -------------------------------------------------------
      // Itineraries page...
      // -------------------------------------------------------
      addSeatNumbersToSeats();
      
      // -------------------------------------------------------
      // Append anchor link
      // -------------------------------------------------------
      const seeMoreDates = document.querySelector('.see-more-dates');
      if(seeMoreDates) {
        seeMoreDates.insertAdjacentHTML('beforeend', `
          <p class="${settings.ID}-view-options-wrap">
            <a class="${settings.ID}-view-options">View our seating options</a>
          </p>
        `);

        const viewOpts = document.querySelector(`.${settings.ID}-view-options`);
        const availabilityWrap = document.querySelector('.availability-wrap');
        if(viewOpts && availabilityWrap) {
          viewOpts.addEventListener('click', () => {
            events.send(`${settings.ID}`, 'clicked-view-seating-options-link');

            const rect = availabilityWrap.getBoundingClientRect();
            if(rect && rect.top) {
              window.scrollTo(0, rect.top + window.scrollY - 150);
            }
          });
        }
      }
      
      // -------------------------------------------------------
      // Update seating
      // -------------------------------------------------------
      const availableSeats = document.querySelectorAll('.seat-area .seats .seat.unavailable');
      if(availableSeats) {
        [].forEach.call(availableSeats, (seat) => {
          seat.classList.add(`${settings.ID}-tooltip`);
        });

        createHTMLForSeats(availableSeats);

        initialiseTooltipster();
      }
    });
  } else if(window.location.pathname.match(/search-results/i)) {
    // -------------------------------------------------------
    // We use an event fired by the data saver so that we know 
    // when the seating plan is ready and updated in a quick view
    // -------------------------------------------------------
    document.addEventListener('NHXXX-quickview-data-saved', () => {
      pollerLite([
        '.NH014',
        '.seat-area .seats .seat:not(.blank)',
        '.seat-area .seats .seat.unavailable', // 'unavailable' class = available seat :(
        '.NH039', // rebuilds the seats available
      ], () => {
        // -------------------------------------------------------
        // More Info
        // -------------------------------------------------------
        addSeatNumbersToSeats();
        
        // -------------------------------------------------------
        // Update seating
        // -------------------------------------------------------
        const availableSeats = document.querySelectorAll('.seat-area .seats .seat.unavailable');
        if(availableSeats) {
          [].forEach.call(availableSeats, (seat) => {
            seat.classList.add(`${settings.ID}-tooltip`);
          });

          createHTMLForSeats(availableSeats);

          initialiseTooltipster();
        }
      });
    });
  }
};

export default activate;
