/**
 * @desc Returns a promise with the basket data
 * this is from the hidden input in the basket.
 */
export const getBasketInfo = new Promise((res, rej) => {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://www.31dover.com/checkout/ajaxCart', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
    const data = request.responseText;
    const div = document.createElement('div');
    div.insertAdjacentHTML('beforeend', data);
    // Query the data
    const basketDataEl = div.querySelector('input#f_gpmdOmetriaAjaxBasket');
    if (basketDataEl) {
      const basketData = basketDataEl.getAttribute('value');
      
      // Resolve with the data
      res(JSON.parse(basketData));
    }
    } else {
      // We reached our target server, but it returned an error
      rej(console.warn('no basket data fetched'));
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.warn('ajax request failed');
  };

  request.send();

});

/**
 * 
 */
export const getTime = new Promise((res, rej) => {
  /**
   * Returns true if is Mon - Fri
  */
  const inWeek = () => {
    const d = new Date();
    const day = d.getDay();
    let isInWeek = false;
    if (day >= 1 && day <= 5) {
      isInWeek = true;
    }
    return isInWeek;
  };

  const beforeFourPM = () => {
    const d = new Date();
    const h = d.getHours();
    let isInTime = false;
    console.log(h);
    if (h < 16 && h > 8) {
      isInTime = true;
    }
    return isInTime;
  };

  const timeLeft = () => {
    const d = new Date();
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth() + 1;
    const day = d.getUTCDate();
    const currentDateStamp = `${y}/${m}/${day}`;
    const dL = new Date(`${currentDateStamp} 14:00`); // Change to 14:00
    const nowTime = d.getTime();
    const nowTimeStamp = new Date(nowTime);
    const difference = dL - nowTimeStamp;
    const diffResult = new Date(difference);
    const hourDiff = diffResult.getHours() - 1;
    const minDiff = ('0' + diffResult.getMinutes()).slice(-2);
    const dayNum = d.getDay();

    if (hourDiff <= 0 && minDiff <= 0) {
      return false;
    }
    let returnedTimeLeft = `${hourDiff} hour${hourDiff > 1 ? 's' : ''} ${minDiff} minutes`;

    // Remove '-'
    if (returnedTimeLeft.match(/\-/g)) {
      returnedTimeLeft = returnedTimeLeft.replace('-', '');
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const tomorrow = d.setDate(d.getDate() + 1);
    const tomorrowDate = new Date(tomorrow);

    const nth = (nthDay) => {
      if (nthDay > 3 && nthDay < 21) return 'th'; // thanks kennebec
      switch (nthDay % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const dayWithSuffix = tomorrowDate.getDate() + nth(tomorrowDate.getDate());
    const tomorrowDateToUse = `${months[tomorrowDate.getMonth()]} ${dayWithSuffix}`;

    // To Return
    const dateObject = {
      day: days[dayNum + 1],
      date: tomorrowDateToUse,
      time: returnedTimeLeft,
    };
    return dateObject;
  };

  const buildMessage = (dateObject) => {
    if (dateObject) {
      const html = `
        <div class="DO002-countdownMessage">
          <p>Order within the next <span>${dateObject.time}</span> to receive your item tomorrow</p>
          <span></span>
        </div>
      `;
      return html;
    }
  };

  if (inWeek() && beforeFourPM()) {
    // Run
    const time = timeLeft();
    console.log(time);
    // Returns the built HTML;
    res(buildMessage(time));
  } else {
    rej(console.log('DO002 not in week'));
  }

});