import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export const startTimer = (duration, display) => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;
  
  
  let timer = duration, minutes, seconds;
  // console.log('>>>TIMER:');
  // console.log(timer);
  setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
    
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      if (minutes <= 30) {
        display.textContent = minutes + ":" + seconds;
        localStorage.setItem(`${ID}-countdown-timer`, JSON.stringify({'min':minutes, 'sec':seconds}));
      } else {
        localStorage.setItem(`${ID}-countdown-timer`, JSON.stringify({'min':29, 'sec':seconds}));
      }
      

      if (--timer < 0) {
          timer = duration;
          document.querySelector(`.${ID}-countdownTimer__wrapper`).parentElement.removeChild(document.querySelector(`.${ID}-countdownTimer__wrapper`));
          localStorage.removeItem(`${ID}-countdown-timer`);
          document.querySelector('.page-wrapper').classList.remove(`${ID}-timer-active`);
          localStorage.removeItem(`${ID}-discount-code`);
      }
  }, 1000);

}

export const generateCountdownTimer = (time) => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;
  
  let countdown;
  let resetTimer = false;
  if (time !== null) {
    countdown = `${time.min}:${time.sec}`;
  } else {
    countdown = '30:00';
    resetTimer = true;
  }
  let countdownTimerContainer = `<div class="${ID}-countdownTimer__wrapper">
    <div class="${ID}-countdownTimer">Only <span id="time">${countdown}</span> To Claim Your Mystery Discount</div>
  </div>`

  document.body.insertAdjacentHTML('afterbegin', countdownTimerContainer);

  document.querySelector('.page-wrapper').classList.add(`${ID}-timer-active`);

  if (document.querySelector(`.${ID}-countdownTimer__wrapper`)) {
    if (resetTimer) {
      var thirtyMinutes = 60 * 30,
        display = document.querySelector('#time');
      startTimer(thirtyMinutes, display);
    } else {
      var remainingMinutes = 60 * time.min + time.sec,
          display = document.querySelector('#time');
      startTimer(remainingMinutes, display);
    }
  }

}