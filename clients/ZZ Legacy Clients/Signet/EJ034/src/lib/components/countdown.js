import { countdown } from "../../../../../../lib/uc-lib";
import shared from "../shared";

export default () => {

  const { ID } = shared;

  const today = new Date();
  const tempDate = new Date();
  let cutoffDate = tempDate.setHours(15,0,0,0);

    // const deliveryDay = document.querySelector(`.${ID}-delivery_date`);
    // MONDAY 
    // before 3
    if(today.getDay() === 1 && today.getHours() < 15) {
    } 
    // after 3
    else if(today.getDay() === 1 && today.getHours() >= 15) {
      // deliveryDay.textContent = 'Wednesday';
      cutoffDate = cutoffDate + (1 * 86400000); // add one day
    } 
  
    // TUESDAY
    if(today.getDay() === 2 && today.getHours() < 15) {
     // deliveryDay.textContent = 'Wednesday';
    } 
    // after 3
    else if(today.getDay() === 2 && today.getHours() >= 15) {
     // deliveryDay.textContent = 'Thursday';
      cutoffDate = cutoffDate + (1 * 86400000); // add one day
    } 
  
  
    //WEDNESDAY
    // if wednesday before 3, set delivery to tuesday
    if(today.getDay() === 3 && today.getHours() < 15) {
      // deliveryDay.textContent = 'Thursday';
    } 
    // if wednesday after 3, set delivery to wednesday
    else if(today.getDay() === 3 && today.getHours() >= 15) {
      // deliveryDay.textContent = 'Friday';
      cutoffDate = cutoffDate + (1 * 86400000);
    } 
  
    // THURSDAY
    // if day is thursday after 19:00 set the delivery to monday
    if(today.getDay() === 4 && today.getHours() < 15) {
     // deliveryDay.textContent = 'Friday';
    }
    else if(today.getDay() === 4 && today.getHours() >= 15) {
      cutoffDate = cutoffDate + (3 * 86400000);
     // deliveryDay.textContent = 'Monday';
    }
  
   // If friday before 3pm, make it saturday
    if(today.getDay() === 5 && today.getHours() < 15) {
    //  deliveryDay.textContent = 'Saturday';
    } else if (today.getDay() === 5 && today.getHours() >= 15) {
      cutoffDate = cutoffDate + (2 * 86400000);
     // deliveryDay.textContent = 'Monday';
    }

    // Saturday, make the delivery on monday
    if(today.getDay() === 6) {
      cutoffDate = cutoffDate + (1 * 86400000);
     // deliveryDay.textContent = 'Monday';
    }
  
    // if sunday before 3pm
    if(today.getDay() === 0 && today.getHours() < 15) {
      cutoffDate = cutoffDate;
     // deliveryDay.textContent = 'Monday';
    }
    // if sunday after 3pm
    else if(today.getDay() === 0 && today.getHours() >= 15) {
      cutoffDate = cutoffDate + (1 * 86400000);
     // deliveryDay.textContent = 'Tuesday';
    }

  countdown({
    element: '.EJ034-countdown',
    cutoff: cutoffDate,
    zeroPrefixHours: false,
    zeroPrefixMinutes: false,
    labels: {
      d: 'days',
      h: 'hrs',
      m: 'min',
      s: 'sec',
    },
  });
}