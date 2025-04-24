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

const beforeSevenPM = () => {
  const d = new Date();
  const h = d.getHours();
  let isInTime = false;
  if (h < 17) {
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
  const dL = new Date(`${currentDateStamp} 17:00`); // Change to 17:00
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
  const returnedTimeLeft = `${hourDiff} hours ${minDiff}`;

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
    // const html = `
    //   <div class="FL033-hurry">
    //     <p>Get your order by ${dateObject.day}, ${dateObject.date} if you order within the next ${dateObject.time} minutes (excludes Saturdays, Sundays and public holidays)</p>
    //   </div>
    // `; Save for future iteration
    const html = `
      Next Day delivery available if you order in the next <strong>${dateObject.time} minutes</strong>
    `;
    return html;
  }
};


export const timeRemaining = (cb) => {
  if (inWeek() && beforeSevenPM()) {
    // Run
    // Experiment code
    const time = timeLeft();
    return buildMessage(time);
  }
}