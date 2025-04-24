import { fullStory, events } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

export { setup }; // eslint-disable-line

/**
 * Returns true if is Mon - Fri
*/
export const inWeek = () => {
  const d = new Date();
  const day = d.getDay();
  let isInWeek = false;
  if (day >= 1 && day <= 5) {
    isInWeek = true;
  }
  return isInWeek;
};

export const beforeTwoPM = () => {
  const d = new Date();
  const h = d.getHours();
  let isInTime = false;
  if (h < 14) {
    isInTime = true;
  }
  return isInTime;
};

export const timeLeft = () => {
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

export const buildMessage = (dateObject) => {
  const ref = document.querySelector('#DeliveryOptionsList li.row.DeliveryOptionsItem.DeliveryOptionsItem_NDD .DeliveryNaming');
  const oldMessage = document.querySelector('.DeliveryOptionsItem_NDD .DeliveryOptionDescription');
  if (ref) {
    const html = `
      <div class="FL033-hurry">
        <p>Get your order by ${dateObject.day}, ${dateObject.date} if you order within the next ${dateObject.time} minutes (excludes Saturdays, Sundays and public holidays)</p>
      </div>
    `;
    ref.insertAdjacentHTML('beforeend', html);
    if (oldMessage) {
      oldMessage.classList.add('FL033-hide');
    }
    events.send(settings.ID, 'Saw', 'User saw the module');
  }
};

export const clickEvents = () => {
  const homeDelivery = document.querySelector('.deliveryGroupTypeLi.deliveryGroup_HomeDelivery');
  const nextDayDelivery = document.querySelector('.row.DeliveryOptionsItem.DeliveryOptionsItem_NDD');
  if (homeDelivery) {
    homeDelivery.addEventListener('click', () => {
      events.send(settings.ID, 'Clicked', 'Checkout Step Two: Delivery Choice: Next Day Delivery');
      events.send(settings.ID, 'Saw', 'User saw this test');
    });
  }
  if (nextDayDelivery) {
    nextDayDelivery.addEventListener('click', () => {
      events.send(settings.ID, 'Clicked', 'Checkout Step Four');
    });
  }
};

