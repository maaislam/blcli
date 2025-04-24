import shared from '../../../../../core-files/shared';
import { fireEvent } from '../../../../../core-files/services';
import { addBusinessDaysToDate } from '../../../../../lib/dates';

const { ID, VARIATION } = shared;

export const nextDay = () => {
  const today = new Date();

  let result = 'in 2 days';
  if([1,2,3,4,5].indexOf(today.getDay()) > -1 && today.getHours() < 18) {
    result = 'tomorrow';
  }

  
  setInterval(function () {
    let timeLeft = getTimeLeftForNextDayDelivery();  
  }, 1000);

  return result;
}

export const isAfterCutoff = () => {
  
  const today = new Date();

  return (today.getHours() >= 18);

}

export const arriveBy = () => {
  const daysToAdd = (new Date()).getHours() < 18 ? 1 : 2;
  // const daysHence = addBusinessDaysToDate(new Date(), daysToAdd);
  // console.log(`${daysHence.getDate()}/${daysHence.getMonth()}/${daysHence.getFullYear()}`);
  // return `${daysHence.getDate()}/${daysHence.getMonth()}/${daysHence.getFullYear()}`;

  return daysToAdd;
}


export const getTimeLeftForNextDayDelivery = () => {
  let timeLeft = {};
  
  const today = new Date();
  if (today.getHours() <= 17) {
    timeLeft.hours = 18 - today.getHours();
    timeLeft.days = 0;
  } else {
    timeLeft.hours = 18;
    timeLeft.hours = 24 - today.getHours();
    timeLeft.days = arriveBy() - 1;
  }
  
  timeLeft.min = 60 - today.getMinutes();

  if (timeLeft.days > 0) {
    document.querySelector(`#${ID}-days`).innerText = timeLeft.days == 1 ? `${timeLeft.days} day` : `${timeLeft.days} days`;
  }
  if (today.getDay() !== 6) {
    document.querySelector(`#${ID}-hours`).innerText = timeLeft.hours == 1 ? `${timeLeft.hours} hr` : `${timeLeft.hours} hrs`;
    document.querySelector(`#${ID}-mins`).innerText = timeLeft.min == 1 ? `${timeLeft.min} min` : `${timeLeft.min} mins`;
  } else {
    document.querySelector(`#${ID}-days`).innerText = `1 day`;
    document.querySelector(`#${ID}-hours`).innerText = timeLeft.hours == 1 ? `${timeLeft.hours} hr` : `${timeLeft.hours} hrs`;
  }
  
  
  return timeLeft;  
}