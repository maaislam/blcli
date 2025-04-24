/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import contentGenerator from './content-generator';
import { countdown } from "../../../../../lib/uc-lib";

const results = {
  recipient: '',
  date: ''
};

/**
 * Product content
 */
const initDatepicker = (target, targetDisplay, didChange) => {
  window.jQuery(target).datepicker({
    inline: !0,
    showOtherMonths: !0,
    selectOtherMonths: !0,
    dayNamesMin: ["Sun", "M", "T", "W", "T", "F", "Sat"],
    dateFormat: "yy-mm-dd",
    showAnim: "blind",
    firstDay: 1,
    minDate: 0,
    onSelect: (dateText, inst) => {
      var suffix = "";
      switch(inst.selectedDay) {
          case '1': case '21': case '31': suffix = 'st'; break;
          case '2': case '22': suffix = 'nd'; break;
          case '3': case '23': suffix = 'rd'; break;
          default: suffix = 'th';
      }

      const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December',
      ];

      jQuery(targetDisplay).text(inst.selectedDay + suffix + ' ' 
        + months[inst.selectedMonth] + ' ' + inst.selectedYear);

      if(typeof didChange == 'function') {
        didChange(jQuery(target).val());
      }
    },
  });
};

/**
 * Calculate time from today to given Date-compatible string
 */
export const calculateTimeFromToday = (dateString) => {
  const chosenDate = new Date(dateString);
  const today = new Date();

  const dateDiff = (chosenDate - today) / 86400000;

  return Math.max(0, Math.ceil(dateDiff));
}

/**
 * Helper convert an iso date to a date range bracket
 */
const dateToFromNowBracket = (dateString) => {
  const timeFromToday = calculateTimeFromToday(dateString);

  if(timeFromToday == 0) {
    return 'today';
  } else if(timeFromToday == 1) {
    return 'tomorrow';
  } else if(timeFromToday >= 2 && timeFromToday <= 7) {
    return '2-7';
  } else if(timeFromToday >= 8 && timeFromToday <= 15) {
    return '8-15';
  } else if(timeFromToday >= 16 && timeFromToday <= 30) {
    return '16-30';
  } else if(timeFromToday > 30) {
    return '30+';
  }
};

const initCountdown = () => {

  if(document.querySelector(`.${shared.ID}-countdown`)) {
    const today = new Date();
    const tempDate = new Date();
    let cutoffDate = tempDate.setHours(18,0,0,0);

    if([1,2,3,4].indexOf(today.getDay()) > -1 && today.getHours() >= 18) {
      // Mon to Thurs, after 6pm
      cutoffDate = cutoffDate + (1 * 86400000);
    } else if (today.getDay() === 5 && today.getHours() >= 18) {
      // Fridy after 6pm
      cutoffDate = cutoffDate + (3 * 86400000);
    } else if (today.getDay() === 6) {
      // Saturday
      cutoffDate = cutoffDate + (2 * 86400000);
    } else if (today.getDay() === 0) {
      // Sunday
      cutoffDate = cutoffDate + (1 * 86400000);
    }

    countdown({
      element: `.${shared.ID}-countdown`,
      cutoff: cutoffDate,
      zeroPrefixHours: false,
      zeroPrefixMinutes: false,
      zeroPrefixSeconds: true,
      labelsMarkup: false,
      labels: {
        d: 'days',
        h: 'hours',
        m: 'mins',
        s: 'secs',
      },
    });
  }
};


/**
 * Check choices
 */
const checkChoices = () => {
  if(results.recipient && results.date) {
    const dateBracket = dateToFromNowBracket(results.date);

    const content = contentGenerator(results.recipient, dateBracket, results.date);

    if(content) {
      const targetDiv = document.querySelector(`.${shared.ID}-occasion__result-text`);
      targetDiv.innerHTML = content;
      targetDiv.classList.remove('x-will-add-content');
      targetDiv.classList.add('x-will-add-content');

      initCountdown();
    }
  }
};

/**
 * Update results
 */
const updateResults = (key, value) => {
  results[key] = value;

  localStorage.setItem(shared.ID + '-' + key, value);

  let eventValue = value;
  if(key == 'date') {
    eventValue = dateToFromNowBracket(value);

    localStorage.setItem(shared.ID + '-date-band', eventValue);
  }

  events.send(`${shared.ID}-${key}`, eventValue);
};

/**
 * Entry point for experiment
 */
export default () => {
  const { ID, VARIATION } = shared;

  // ------
  // Setup
  // ------
  setup();

  // ------
  // Build occasion box
  // ------
  const target = document.querySelector('.product-detail #product-content');
  if(target) {
    const componentBox = `
      <div class="prod-info ${shared.ID}-occasion">
        <h4>CHOOSE YOUR OCCASION</h4>

        <div class="${shared.ID}-occasion__content">
          <p class="${shared.ID}-occasion__covid">
            (Current situation whilst our logistics are impacted by COVID. Last updated October 2020.)
          </p>

          <div class="${shared.ID}-occasion__question-wrap">
            <p class="${shared.ID}-occasion__question">
              1. Is your chocolate for you, or someone else?
            </p>

            <div class="${shared.ID}-occasion__recipient-wrap">
              <ul>
                <li class="${shared.ID}-occasion__recipient" data-result="me">
                  <span>Me</span>
                </li>
                <li class="${shared.ID}-occasion__recipient" data-result="someone-else">
                  <span>Someone else</span>
                </li>
              </ul>
            </div>

            <p class="${shared.ID}-occasion__question">
              2. When do you want your order?
            </p>
            <p class="${shared.ID}-occasion__question-desc">
              You can have it tomorrow if you want, or 6 months in advance
            </p>

            <div class="${shared.ID}-occasion__date-wrap">

              <div class="${shared.ID}-occasion__date-picker">
                <div class="ui-datepicker-trigger ${shared.ID}-init-datepicker"></div>
                <span>Select Date</span>
              </div>

              <div class="${shared.ID}-occasion__date-result">
                <input type="text" class="${shared.ID}-datepicker-input nominated-date required" value="">
                <span>You selected: </span>
                <span class="${shared.ID}-occasion__date-result-display"></span>
              </div>

            </div>

            <div class="${shared.ID}-occasion__result-text"></div>

            <p class="${shared.ID}-occasion__view-all">
              <a href="/uk/help/delivery.html">View all Delivery Options &gt;</a>
            </p>
          </div>

        </div>
      </div>
    `;

    target.insertAdjacentHTML('afterend', componentBox);

    // ------
    // Event listeners
    // ------
    const initDatepickerBtn = document.querySelector(`.${shared.ID}-init-datepicker`);
    const datepickerInput = document.querySelector(`.${shared.ID}-datepicker-input`);
    const targetDisplay = document.querySelector(`.${shared.ID}-occasion__date-result-display`);

    if(initDatepickerBtn && datepickerInput) {
      // ------
      // Set up date picker
      // ------
      initDatepicker(datepickerInput, targetDisplay, (chosenDate) => {
        // ------
        // Did Choose a date
        // ------
        initDatepickerBtn.classList.remove('active');

        targetDisplay.parentNode.classList.add('xactive');

        updateResults('date', chosenDate);

        checkChoices();
      });

      // ------
      // Show / hide datepicker on icon click
      // ------
      const dp = document.querySelector(`.${shared.ID}-occasion__date-picker`);
      if(dp) {
        dp.addEventListener('click', () => {
          window.jQuery(initDatepickerBtn).toggleClass('active');

          window.jQuery(datepickerInput).datepicker(
            initDatepickerBtn.classList.contains('active') ? 'show' : 'hide'
          );
        });
      }
    }

    // ------
    // Choose recipient
    // ------
    const recipientWrap = document.querySelector(`.${shared.ID}-occasion__recipient-wrap`);
    if(recipientWrap) {
      recipientWrap.addEventListener('click', (e) => {
        if(e.target.parentNode.classList.contains(`${shared.ID}-occasion__recipient`)) {
          const result = e.target.parentNode.getAttribute('data-result');
          
          [].forEach.call(recipientWrap.querySelectorAll('[data-result]'), (li) => {
            li.classList.remove('active');
          });

          updateResults('recipient', result);

          e.target.parentNode.classList.add('active');

          checkChoices();
        }
      });
    }
  }

  // ------
  // At end of code, reset window.einstein expect type array
  // ------
  window.einstein.loaded = [];
};
