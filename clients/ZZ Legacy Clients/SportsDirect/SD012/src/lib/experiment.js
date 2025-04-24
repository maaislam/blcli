/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { pollerLite } from '../../../../../lib/uc-lib';
import { setup } from './services';
import settings from './shared';
import { events } from '../../../../../lib/utils';
import { SD003 } from './SD003';

events.analyticsReference = '_gaUAT';

export default () => {
  const { VARIATION, ID } = settings;

  // Control = V2
  if (VARIATION == '2') {
    events.send(ID, 'SD012 Control', 'SD012 Control is active');
    return false;
  } else {
    events.send(ID, `SD012 Variation ${VARIATION}`, 'SD012 Variation 1 is active');
  }
  
  setup();

  SD003();

  const inWeek = () => {
    const d = new Date();
    const day = d.getDay();
    let isInWeek = false;
    if (day >= 1 && day <= 5) {
      isInWeek = true;
    }
    return isInWeek;
  };

  const afterSeven = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 19 && hour < 24) {
      return true;
    }
  };

  const timeLeft = () => {
    const d = new Date();
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth() + 1;
    const day = d.getUTCDate();
    const currentDateStamp = y + '/' + m + '/' + day;
    const dL = new Date(currentDateStamp + ' 19:00'); 
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
    const returnedTimeLeft = hourDiff + ' hours ' + minDiff;
  
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const tomorrow = d.setDate(d.getDate() + 1);
    const tomorrowDate = new Date(tomorrow);
  
    const nth = function nth(nthDay) {
      if (nthDay > 3 && nthDay < 21) return 'th'; 
      switch (nthDay % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };
  
    const dayWithSuffix = tomorrowDate.getDate() + nth(tomorrowDate.getDate());
    const tomorrowDateToUse = months[tomorrowDate.getMonth()] + ' ' + dayWithSuffix;
  
    const dateObject = {
      day: days[dayNum + 1],
      date: tomorrowDateToUse,
      time: returnedTimeLeft
    };

    console.log('time left ', dateObject);
    return dateObject;
  };

  

  pollerLite(['.Delivery.leftWrap .DeliveryOptions h1',
    '.DeliveryOptions .DeliveryOptionsItem.active .InnerMethods',
    '.DeliveryOptionsItem_STD p.SD003-fromPrice',
    '.DeliveryOptionsItem_NDD .DeliveryOptionName'], () => {
      
    const secondTitle = document.querySelector('.Delivery.leftWrap .DeliveryOptions h1');
    if (secondTitle) {
      secondTitle.textContent = 'Choose your delivery method';
    }
  
    const topOption = document.querySelector('.DeliveryOptions .DeliveryOptionsItem.active .InnerMethods');
    if (topOption) {
      topOption.insertAdjacentHTML('beforeend', `
        <div class="SD012-mostPopular">
          <p>Most Popular</p>
        </div>
      `);
    }
  
    const topOptionInfo = document.querySelector('.DeliveryOptionsItem_STD .DeliveryEstimate');
    const topOptionPrice = document.querySelector('.DeliveryOptionsItem_STD p.SD003-fromPrice');
    if (topOptionInfo) {
      topOptionInfo.innerHTML = '';
      topOptionInfo.insertAdjacentHTML('afterend', `
      <div class="SD012-firstOptions">
        <span class="SD003-tick SD012-tick"></span><p>3 - 7 working days UK delivery</p> <br/>
        <span class="SD003-tick SD012-tick"></span><p>Receive tracking number via email to track your items</p>
      </div>
      `);
    }
    if (topOptionPrice && topOptionPrice.textContent) {
      topOptionPrice.textContent = topOptionPrice.textContent.replace('+', '');
    }  


    const nextDayOptionTitle = document.querySelector('.DeliveryOptionsItem_NDD .DeliveryOptionName');
    if (afterSeven()) {
      nextDayOptionTitle.textContent = '';
      nextDayOptionTitle.textContent = 'Express Delivery';
    } else if (!afterSeven() && inWeek() && timeLeft()) {
      nextDayOptionTitle.textContent = '';
      nextDayOptionTitle.insertAdjacentHTML('beforeend', `Next Day Delivery available if you order in the next <span class="SD-green">${timeLeft().time} minutes</span>`);
    }

    const secondPrice = document.querySelectorAll('.SD003-fromPrice')[1];
    if (secondPrice) {
      secondPrice.textContent = '';
      secondPrice.insertAdjacentHTML('beforeend', `<strong>+£2</strong> if you need it sooner`);
      secondPrice.insertAdjacentHTML('afterend', `
        <p class="SD012-subCopy">(Excludes Mondays, Sundays and Public/Bank Holidays)</p>
      `);
    }

    const thirdPrice = document.querySelectorAll('.SD003-fromPrice')[2];
    if (thirdPrice) {
      thirdPrice.textContent = '';
      thirdPrice.insertAdjacentHTML('beforeend', `<strong>+£3</strong> if you want delivery by our express courier`);
    }
  });


  afterSeven();

  
};
