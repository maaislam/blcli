/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import hirelonger from './components/hirelonger';
import { observeDOM } from './helpers/utils';

const { ID, VARIATION } = shared;

const EXP_HIRE_DAYS = 7;

const hireStartDateElem = document.getElementById('hireFromDate');
const hireEndDateElem = document.getElementById('hireToDate');

const hiringDuration = () => {
  const hireStartDate = hireStartDateElem.value;
  const hireEndDate = hireEndDateElem.value;
  const hireStartDateMoment = window.moment(hireStartDate, 'DD/MM/YYYY');
  const hireEndDateMoment = window.moment(hireEndDate, 'DD/MM/YYYY');
  const duration = hireEndDateMoment.diff(hireStartDateMoment, 'days');
  return duration;
};

const init = () => {
  const existingHirelongers = document.querySelectorAll(`.${ID}__hireLonger`);
  existingHirelongers.forEach((hirelongerElem) => {
    hirelongerElem.remove();
  });
  if (hiringDuration() < 3 || hiringDuration() > 6) {
    return;
  }

  fireEvent('Conditions Met');
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const numberOfDays = hiringDuration();

  //render new DOM
  const attachPoint = document.querySelector('#beforePriceDisplay');
  attachPoint.insertAdjacentHTML('beforebegin', hirelonger(ID, numberOfDays));

  //set duration to 7 days
};
const adjustEndDate = () => {
  const currentEndDate = hireEndDateElem.value;
  const localDate = window.moment(currentEndDate, 'DD/MM/YYYY');
  const newDate = localDate.add(EXP_HIRE_DAYS - hiringDuration(), 'days');

  function addDayUntilWeekday(date) {
    let finalDate = date;
    const dateComponent = date.date();

    const inActiveDays = document.querySelectorAll('.ui-datepicker-unselectable');
    inActiveDays.forEach((dayElem) => {
      if (dayElem.innerText === dateComponent.toString()) {
        date.add(1, 'days');
        finalDate = addDayUntilWeekday(date);
      }
    });

    return finalDate;
  }
  const finalEndDate = addDayUntilWeekday(newDate);
  hireEndDateElem.value = finalEndDate.format('DD/MM/YYYY');
  const hireDaysElems = document.querySelectorAll('#chosen_hire');
  hireDaysElems.forEach((hireDaysElem) => {
    hireDaysElem.value = EXP_HIRE_DAYS;
    hireDaysElem.innerHTML = `${EXP_HIRE_DAYS} days`;
  });

  const endDateLabelElem = document.querySelector(`.${ID}__hireLonger-date`);
  endDateLabelElem.innerHTML = finalEndDate.format('DD/MM/YYYY');
  document.querySelector(`.${ID}__enddate-label`).classList.add('show');
  document.querySelector(`.${ID}__hireLonger-option.hirelonger`).classList.add(`${ID}__active`);
  document.querySelector(`.${ID}__hireLonger-option.no-thanks`).classList.remove(`${ID}__active`);
};

const changeEndDate = (endDate) => {
  const dateArray = endDate.split('/');

  // Extract day, month, and year
  const day = parseInt(dateArray[0]);
  const month = parseInt(dateArray[1]);
  const year = parseInt(dateArray[2]);

  const oneMonthCalender = document.querySelectorAll(`[data-month='${month - 1}'][data-year='${year}']`);

  oneMonthCalender.forEach((dateElem) => {
    const dateElemDay = parseInt(dateElem.innerText);

    if (dateElemDay === day) {
      dateElem.click();
    }
  });
};

export default () => {
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-69ML6JH4G6';

  setup();

  init();
  observeDOM('#chosen_hire', init);

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest(`.${ID}__hireLonger-option.hirelonger`)) {
      adjustEndDate();
      fireEvent('Users clicks to extend duration');
    } else if (target.closest(`.${ID}__hireLonger-option.no-thanks`)) {
      document.querySelector(`.${ID}__hireLonger-option.hirelonger`).classList.remove(`${ID}__active`);
      document.querySelector(`.${ID}__hireLonger-option.no-thanks`).classList.add(`${ID}__active`);
      document.querySelector(`.${ID}__enddate-label`).classList.remove('show');

      const hireDays = document.querySelector(`.${ID}__hireLonger`).dataset.numberofdays;
      const hireStartDateElement = document.getElementById('hireFromDate')
      const startDate = hireStartDateElement.value;

      const localDate = window.moment(startDate, 'DD/MM/YYYY');
      const userSelectedEndDate = localDate.add(hireDays, 'days');

      changeEndDate(userSelectedEndDate.format('DD/MM/YYYY'));
    } else if (target.closest('#bookOnline')) {
      fireEvent('Users clicks to add to basket');
    } else if (target.closest('[name="addToCart"]')) {
      fireEvent('Users adds to basket');
    }
  });
};
