import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import { countdown } from '../../../../../lib/uc-lib';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  // standard - by 6pm monday 11th
  // if gone do next day delivery - by 6pm Wednesday 13th
  // if gone do saturday delivery - by 6pm thursday 14th

  let countDownDate;
  let deliveryMethod;

    const countdownEl = document.createElement('p');
    countdownEl.classList.add(`${ID}__countdownText`);
    countdownEl.innerHTML = `Order in the next 
    <span class="${ID}__countdown">
    <p><span class="days"></span></p>
    <p><span class="hours"></span></p>
    <p><span class="minutes"></span></p>
    </span> for guaranteed Easter Delivery. Select <b></b> at checkout* `;

    document.querySelector('#add-to-cart').insertAdjacentElement('afterend', countdownEl);

    function isDateBeforeToday(date) {
      return new Date(date) < new Date(new Date());
    }
  
  
  
    // if before monday 11th april
    if(isDateBeforeToday(new Date("Apr 11, 2022 18:00:00")) === false) {
      deliveryMethod = 'Standard Delivery';
      countDownDate = new Date("Apr 11, 2022 18:00:00").getTime();
    }
  
    // if after 11th but before 13th
    else if(isDateBeforeToday(new Date("Apr 11, 2022 18:00:000")) === true && isDateBeforeToday(new Date("Apr 13, 2022 18:00:00")) === false) {
      deliveryMethod = 'Easter Express Delivery';
      countDownDate = new Date("Apr 13, 2022 18:00:00").getTime();
    }
  
     // if after 13th but before 14th
    else if(isDateBeforeToday(new Date("Apr 13, 2022 18:00:00")) === true && isDateBeforeToday(new Date("Apr 14, 2022 18:00:00")) === false) {
      deliveryMethod = 'Saturday Delivery';
      countDownDate = new Date("Apr 14, 2022 18:00:00").getTime();

    } else {
      document.querySelector(`.${ID}__countdownText`).remove();
    }


    countdownEl.querySelector('b').innerHTML = deliveryMethod;

    const now = new Date().getTime();
    const timeleft = countDownDate - now;
        
    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));

    const countdown = setInterval(function() {
      document.querySelector(`.${ID}__countdown .days`).innerHTML = days + "d "
      document.querySelector(`.${ID}__countdown .hours`).innerHTML = hours + "h " 
      document.querySelector(`.${ID}__countdown .minutes`).innerHTML = minutes + "m " 
    }, 1000);
};
