import { fullStory } from '../../../../../lib/utils';
import shared from './shared';
import cost from './hireCost';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

export const dateConversion = (date) => {
  const months = {
    "Jan" : "01",
    "Feb" : "02",
    "Mar"  : "03",
    "Apr"  : "04",
    "May"  : "05",
    "Jun"  : "06",
    "Jul"  : "07",
    "Aug"  : "08",
    "Sep"  : "09",
    "Oct"  : "10",
    "Nov"  : "11",
    "Dec"  : "12",
  };
  const res = date.split(' ');
  let day = res[0];
  // console.log('[046] this is the day');
  // console.log(day);
  // console.log(day.length);
  if (day.length < 2) {
    day = `0${day}`;
  }
  let month = res[1];
  // console.log(month);
  // console.log('is :');
  month = months[`${month}`];
  // console.log(month);

  return `${month}/${day}`;
};

export const getDayOfWeek = (date) => {
  const daysObj = {
    'Mon' : ['12/23', '12/30', '01/06', '01/13', '01/20', '01/27', '02/03', '02/10'],
    'Tue' : ['12/24', '12/31', '01/07', '01/14', '01/21', '01/28', '02/04', '02/11'],
    'Wed' : ['12/25', '01/01', '01/08', '01/15', '01/22', '01/29', '02/05', '02/12'],
    'Thu' : ['12/26', '01/02', '01/09', '01/16', '01/23', '01/30', '02/06', '02/13'],
    'Fri' : ['12/27', '01/03', '01/10', '01/17', '01/24', '01/31', '02/07', '02/14'],
    'Sat' : ['12/28', '01/04', '01/11', '01/18', '01/25', '02/01', '02/08', '02/15'],
    'Sun' : ['12/29', '01/05', '01/12', '01/19', '01/26', '02/02', '02/09', '02/16'],
  };

  let dayOfWeek = '';
  for (const key in daysObj) {
    if (daysObj.hasOwnProperty(key)) {
      const element = daysObj[key];
      if (element.indexOf(date) > -1) {
        dayOfWeek = key;
        break;
      }
    }
  }
  
  return dayOfWeek
};

export const getCosts = () => {
  const getPrices = document.querySelectorAll('.price-row .price-blk');
  for (let i = 0; i < getPrices.length; i += 1) {
  // [].forEach.call(getPrices, (el) => {
    const el = getPrices[i];
    let priceCat = el.querySelector('label').innerText;
    let price = el.querySelector('p').innerText.replace('£', '');
    if (el.querySelector('h5')) {
      price = el.querySelector('h5').innerText.replace('£', '');
    }
    price = parseFloat(price);
    // console.log(priceCat);
    // console.log(price);
    // console.log('-  -  -  -  -  -  -  -  -  -  -');
    priceCat = priceCat.toLowerCase();
    if (priceCat.indexOf("1st day") > -1) {
      cost.firstDay = price.toFixed(2);
    } else if (priceCat.indexOf("2nd day") > -1) {
      cost.secondDay = price.toFixed(2);
    } else if (priceCat.indexOf("extra day") > -1) {
      cost.extraDay = price.toFixed(2);
    } else if (priceCat.indexOf("weekend") > -1) {
      cost.weekend = price.toFixed(2);
    } else if (priceCat.indexOf("week") > -1) {
      cost.week = price.toFixed(2);
    } 
  // });
    
  }
 };

export const calculateCost = (numOfDays, dayOfHire, dayOfReturn) => {
  getCosts();
  let totalCost = '';
  if (numOfDays === 0) {
    numOfDays = 1;
  }
  if (numOfDays === 1) {
    totalCost = cost.firstDay;
  } else if (numOfDays === 2 && cost.secondDay !== '') {
    // alert(`${numOfDays}: 2 days, WITH second day cost`);
    totalCost = parseFloat(cost.firstDay) + parseFloat(cost.secondDay);
    totalCost = totalCost.toFixed(2);
  } else if (numOfDays === 2 && cost.secondDay === '') {
    // alert(`${numOfDays}: 2 days, without second day cost`);
    totalCost = parseFloat(cost.firstDay) + parseFloat(cost.extraDay);
    totalCost = totalCost.toFixed(2);
  } else if (numOfDays === 3 && dayOfHire === "Fri") {
    // alert(`${numOfDays}: weekend`);
    totalCost = cost.weekend;
  } else if (numOfDays > 2 && numOfDays < 7) {
    // alert(`${numOfDays}: more than 2 less than a week`);
    totalCost = parseFloat(cost.firstDay) + (parseFloat(cost.extraDay) * (numOfDays - 1));
    totalCost = totalCost.toFixed(2);
  } else if (numOfDays >= 7 && numOfDays < 14) {
    // alert(`${numOfDays}: week and less than 2 weeks`);
    totalCost = parseFloat(cost.week) + (parseFloat(cost.extraDay) * (numOfDays - 7));
    totalCost = totalCost.toFixed(2);
  } else if (numOfDays >= 14) {
    // alert(`${numOfDays}: more than two weeks`);
    totalCost = (parseFloat(cost.week) * 2) + (parseFloat(cost.extraDay) * (numOfDays - 14));
    totalCost = totalCost.toFixed(2);
  }
  
  // alert(`123 -- Total cost: ${totalCost}`);
  return totalCost;
};

export const getNumOfDays = (hireFrom, hireTo) => {
  // To set two dates to two variables
  const month1 = hireFrom.split('/')[0];
  const month2 = hireTo.split('/')[0];

  let year1 = '';
  let year2 = '';
  if (month1 === '12') {
    year1 = '2019';
  } else {
    year1 = '2020';
  }
  if (month2 === '12') {
    year2 = '2019';
  } else {
    year2 = '2020';
  }

  const date1 = new Date(`${hireFrom}/${year1}`); 
  const date2 = new Date(`${hireTo}/${year2}`); 
    
  // To calculate the time difference of two dates
  const Difference_In_Time = date2.getTime() - date1.getTime(); 
    
  // To calculate the no. of days between two dates
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
    
  //To display the final no. of days (result)
  return Difference_In_Days;
};


export const updateInfo = (hireFrom, hireTo, res, startDate, endDate, dayOfHire, dayOfReturn, numOfDays, cost, costEl, numOfDaysEl) => {
  setTimeout(() => {
    hireFrom = document.querySelector('input#hireFromDate').value;
    hireFrom = dateConversion(hireFrom);
    res = hireFrom.split('/');
    startDate = `${res[1]}/${res[0]}`;
    document.querySelector(`.${shared.ID}-start-date`).innerText = `${startDate}`;
    dayOfHire = getDayOfWeek(hireFrom);

    hireTo = document.querySelector('input#hireToDate').value;
    hireTo = dateConversion(hireTo);
    res = hireTo.split('/');
    endDate = `${res[1]}/${res[0]}`;
    document.querySelector(`.${shared.ID}-end-date`).innerText = `${endDate}`;
    dayOfReturn = getDayOfWeek(hireTo);
    numOfDays = getNumOfDays(hireFrom, hireTo);

    cost = calculateCost(numOfDays, dayOfHire, dayOfReturn);
    costEl.innerText = `£${cost}`;
    if (numOfDays === 0) {
      numOfDays = 1;
    }

    if (numOfDays < 0) {
      document.querySelector(`.${shared.ID}-costInfo .${shared.ID}-label`).classList.add('loading');
    } else if (numOfDays === 1) {
      numOfDaysEl.innerText = ` ${numOfDays} day`;
      document.querySelector(`.${shared.ID}-costInfo .${shared.ID}-label`).classList.remove('loading');
    } else {
      numOfDaysEl.innerText = ` ${numOfDays} days`;
      document.querySelector(`.${shared.ID}-costInfo .${shared.ID}-label`).classList.remove('loading');
    }
    
  }, 100);
};