/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, isOverflown, logMessage } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;
var dayLabels = [{
  "short": 'Sun',
  "long": 'Sunday'
}, {
  "short": 'Mon',
  "long": 'Monday'
}, {
  "short": 'Tue',
  "long": 'Tuesday'
}, {
  "short": 'Wed',
  "long": 'Wednesday'
}, {
  "short": 'Thu',
  "long": 'Thursday'
}, {
  "short": 'Fri',
  "long": 'Friday'
}, {
  "short": 'Sat',
  "long": 'Saturday'
}];
var monthLabels = [{
  "short": 'Jan',
  "long": 'January'
}, {
  "short": 'Feb',
  "long": 'February'
}, {
  "short": 'Mar',
  "long": 'March'
}, {
  "short": 'Apr',
  "long": 'April'
}, {
  "short": 'May',
  "long": 'May'
}, {
  "short": 'Jun',
  "long": 'June'
}, {
  "short": 'Jul',
  "long": 'July'
}, {
  "short": 'Aug',
  "long": 'August'
}, {
  "short": 'Sept',
  "long": 'September'
}, {
  "short": 'Oct',
  "long": 'October'
}, {
  "short": 'Nov',
  "long": 'November'
}, {
  "short": 'Dec',
  "long": 'December'
}];

const getDateString = (deliveryString) => {

  let deliveryDaysToCalculate = 5;

  if(deliveryString == "(3 - 7 days)") {
    deliveryDaysToCalculate = 3;
  } else if(deliveryString == "(5 - 7 days)") {
    deliveryDaysToCalculate = 5;
  } else {
    deliveryDaysToCalculate = 1;
  }

  let todayDate = new Date();

  let deliveryDate = new Date();

  deliveryDate.setDate(todayDate.getDate() + deliveryDaysToCalculate);

  const BHCheckDelDay = deliveryDate.toLocaleDateString('en-GB');

  console.log(BHCheckDelDay);
  // Initialize current day as a bank holiday to false
  let isBankHoliday = false;
  let isChristmas = false;
  let bhReturnDate;
  // Bank holidays stored in a DD/MM/YYYY format
  // Days leading up to a bank holiday are also excluded
  // Loop through bank holidays and days leading up to a bank holiday
  const bankHolidayArray = [
    // 2021
    { bhDate: '01/01/2021', returnDate: '03/01/2021' },
    { bhDate: '02/01/2021', returnDate: '03/01/2021' },
    { bhDate: '02/04/2021', returnDate: '06/04/2021' },
    { bhDate: '05/04/2021', returnDate: '06/04/2021' },
    { bhDate: '03/05/2021', returnDate: '04/05/2021' },
    { bhDate: '31/05/2021', returnDate: '01/06/2021' },
    { bhDate: '30/08/2021', returnDate: '31/08/2021' },
    { bhDate: '25/12/2021', returnDate: '29/12/2021' },
    { bhDate: '26/12/2021', returnDate: '29/12/2021' },
    { bhDate: '27/12/2021', returnDate: '29/12/2021' },
    { bhDate: '28/12/2021', returnDate: '29/12/2021' },
    // 2022
    { bhDate: '01/01/2022', returnDate: '04/01/2022' },
    { bhDate: '02/01/2022', returnDate: '04/01/2022' },
    { bhDate: '03/01/2022', returnDate: '04/01/2022' },
    { bhDate: '18/04/2022', returnDate: '19/04/2022' },
    { bhDate: '02/05/2022', returnDate: '03/05/2022' },
    { bhDate: '02/06/2022', returnDate: '04/06/2022' },
    { bhDate: '03/06/2022', returnDate: '04/06/2022' },
    { bhDate: '29/08/2022', returnDate: '30/08/2022' },
    { bhDate: '25/12/2022', returnDate: '28/12/2022' },
    { bhDate: '26/12/2022', returnDate: '28/12/2022' },
    { bhDate: '27/12/2022', returnDate: '28/12/2022' },
  ];
    // '02/04/2021', '05/04/2021', '03/05/2021', '31/05/2021', '30/08/2021', '16/09/2021', '17/09/2021', '25/12/2021', '26/12/2021', '27/12/2021', '28/12/2021', '01/01/2022'];
  for (let i = 0; i < bankHolidayArray.length; i ++) {
    // Check current day
    if (bankHolidayArray[i].bhDate === BHCheckDelDay) {
      isBankHoliday = true;
      bhReturnDate = bankHolidayArray[i].returnDate;
      break;
    }
  }


  // if delivery date is a bank holiday, add two days onto the total

  console.log(deliveryDate);

  if(isBankHoliday == true) {
    let bhReturnDateArray = bhReturnDate.split('/');
    deliveryDate = new Date(bhReturnDateArray[2], bhReturnDateArray[1] - 1, bhReturnDateArray[0])
    console.log(deliveryDate);
  }

  


  let suffix = "th";

  if (deliveryDate.getDate().toString().charAt(deliveryDate.getDate().toString().length -1) == 1) {
    suffix = 'st';
  } else if (deliveryDate.getDate().toString().charAt(deliveryDate.getDate().toString().length -1) == 2) {
    suffix = 'nd';
  } else if (deliveryDate.getDate().toString().charAt(deliveryDate.getDate().toString().length -1) == 3) {
    suffix = 'rd';
  } else {
    suffix = 'th';
  }

  if (deliveryDate.getDate() == 11 || deliveryDate.getDate() == 12 || deliveryDate.getDate() == 13) {
    suffix = 'th';
  }

  console.log(deliveryDate.getDate().toString().length);
  console.log(deliveryDate.getDate());
  console.log(deliveryDate.getDate().toString().charAt(deliveryDate.getDate().toString().length -1));
  console.log(suffix);

  let deliveryDateDayFormatted = deliveryDate.getDate() + suffix;

  let deliveryDateString = dayLabels[deliveryDate.getDay()]['long'] + ' ' + deliveryDateDayFormatted + ' ' + monthLabels[deliveryDate.getMonth()]['long']

  return deliveryDateString;


}

const startExperiment = () => {

  let allDeliveryLines = [].slice.call(document.querySelectorAll('.innerInfoRow .left-info.info-box ul li'));
  let allTimeLines = allDeliveryLines.filter((line) => {

    if(line.innerText.charAt(0) == "(") {
      return true;
    } else {
      return false;
    }

  })

  allTimeLines.forEach((line) => {

    let lineDateString = getDateString(line.innerText);

    line.insertAdjacentHTML('afterbegin', `Get it by ${lineDateString} `);


  })


}

export default () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  startExperiment();

};
