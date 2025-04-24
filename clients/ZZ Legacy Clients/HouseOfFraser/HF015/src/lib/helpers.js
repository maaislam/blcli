const helpers = {
  timeRemaining: () => {
    /**
     * Returns true if is Sun - Fri
    */
    const inWeek = () => { // Changed to include Sunday (0)
      const d = new Date();
      const day = d.getDay();
      let isInWeek = false;
      if (day >= 0 && day <= 5) {
        isInWeek = true;
      }
      return isInWeek;
    };

    const beforeTwoPM = () => {
      const d = new Date();
      const h = d.getHours();
      let isInTime = false;
      if (h < 20) {
        isInTime = true;
      }
      return isInTime;
    };

    const timeLeft = () => {
      const d = new Date();
      const targetDate = new Date();
      targetDate.setHours(20);
      targetDate.setMinutes(0, 0, 0);
      const secondsUntilCutoff  = (targetDate.getTime() - d.getTime()) / 1000;
      const days = Math.floor(secondsUntilCutoff / 24 / 60 / 60);
      const hoursLeftInSeconds = Math.floor((secondsUntilCutoff) - (days * 86400));
      let hours = Math.floor(hoursLeftInSeconds / 3600);
      const minutesLeftInSeconds = Math.floor((hoursLeftInSeconds) - (hours * 3600));
      let minutes = Math.floor(minutesLeftInSeconds / 60);
      let seconds = secondsUntilCutoff % 60;
      const hourDiff = hours;
      const minDiff = ('0' + (Math.floor(minutes) + '')).slice(-2);
      const secDiff = ('0' + (Math.floor(seconds) + '')).slice(-2);
      const dayNum = d.getDay();


      if (hourDiff <= 0 && minDiff <= 0) {
        return false;
      }
      const returnedTimeLeft = `<strong>${hourDiff}</strong>h <strong>${minDiff}</strong>m <strong>${secDiff}</strong>s`;

      const daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
        day: daysArr[dayNum + 1],
        date: tomorrowDateToUse,
        time: returnedTimeLeft,
      };
      return dateObject;
    };

    const buildMessage = (dateObject) => {
      if (dateObject) {
        if (dateObject.time.indexOf('-') > -1) {
          return '';
        }
        const html = `
          Get next day delivery if you order within <strong class="datestring">${dateObject.time}</strong>
        `;
        return html;
      }
    };

    const init = (cb) => {
      if (inWeek() && beforeTwoPM()) {
        const time = timeLeft();
        return buildMessage(time);
      } else {
        return 'Delivery as soon as day after tomorrow';
      }
    }

    return init;
  },
}

export default helpers;
