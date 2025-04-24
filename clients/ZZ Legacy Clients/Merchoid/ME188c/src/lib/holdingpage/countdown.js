/**
 * @desc Countdown Timer
 */

import settings from '../settings';

export default () => {
  const countdownHTML = document.querySelector(`.${settings.ID}-countdown`);
  countdownHTML.innerHTML = `
  <div class="${settings.ID}-countdown_block">
    <div class="${settings.ID}-countdown__timer ${settings.ID}-countdown_days"></div>
    <div class="${settings.ID}-countdown__label ${settings.ID}-label_days"></div>
  </div>
  <div class="${settings.ID}-countdown_block">
    <div class="${settings.ID}-countdown__timer ${settings.ID}-countdown_hours"></div>
    <div class="${settings.ID}-countdown__label ${settings.ID}-label_hours"></div>
  </div>
  <div class="${settings.ID}-countdown_block">
    <div class="${settings.ID}-countdown__timer ${settings.ID}-countdown_minutes"></div>
    <div class="${settings.ID}-countdown__label ${settings.ID}-label_minutes"></div>
  </div>
  <div class="${settings.ID}-countdown_block">
    <div class="${settings.ID}-countdown__timer ${settings.ID}-countdown_seconds"></div>
    <div class="${settings.ID}-countdown__label ${settings.ID}-label_seconds"></div>
  </div>`;


  const countdown = new Date('March 1, 2019');

  function getRemainingTime(endtime) {
    const milliseconds = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    return {
      'total': milliseconds,
      'seconds': seconds,
      'minutes': minutes,
      'hours': hours,
      'days': days,
    };
  }

  function initClock(id, endtime) {
    const counter = document.getElementById(id);
    const daysItem = counter.querySelector(`.${settings.ID}-countdown_days`);
    const hoursItem = counter.querySelector(`.${settings.ID}-countdown_hours`);
    const minutesItem = counter.querySelector(`.${settings.ID}-countdown_minutes`);
    const secondsItem = counter.querySelector(`.${settings.ID}-countdown_seconds`);

    function updateClock() {
      const time = getRemainingTime(endtime);

      daysItem.innerHTML = time.days;
      hoursItem.innerHTML = (`0 ${time.hours}`).slice(-2);
      minutesItem.innerHTML = (`0 ${time.minutes}`).slice(-2);
      secondsItem.innerHTML = (`0 ${time.seconds}`).slice(-2);

      if (time.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }

  initClock(`${settings.ID}-countdown`, countdown);
};
