/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const startExperiment = (pageType) => {

  let debug = false;
  let currHref = window.location.href;
  let updatedHref = ``;
  
  // date calc section
  let todayDate = new Date();
  let targetDate = new Date();
  let cutoffDate = new Date();
  cutoffDate.setHours(18);
  cutoffDate.setMinutes(0, 0, 0);

  if(VARIATION == 1) {

    if(todayDate > cutoffDate) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

  } else if(VARIATION == 2) {

    targetDate.setDate(targetDate.getDate() + 1);

  } else if(VARIATION == 3) {

    if(todayDate.getDay() !== 0) {
      // set targetDate to Sunday
      while(targetDate.getDay() !== 0) {
        targetDate.setDate(targetDate.getDate() + 1);
      }
    }

  } else if(VARIATION == 4) {
    targetDate.setDate(targetDate.getDate() + 7);
  }

  let targetDateFormatted = targetDate.getDate() + '/' + (targetDate.getMonth() + 1) + '/' + targetDate.getFullYear();
  let checkOutTargetDate = new Date(targetDate);
  checkOutTargetDate.setDate(checkOutTargetDate.getDate() + 1);
  let checkOutTargetDateFormatted = checkOutTargetDate.getDate() + '/' + (checkOutTargetDate.getMonth() + 1) + '/' + checkOutTargetDate.getFullYear();

  // url build up section
  if(pageType == `hotel`) {
    if (currHref.indexOf('?') == -1) {
      updatedHref = currHref + `?checkIn=${targetDateFormatted}&checkOut=${checkOutTargetDateFormatted}&rooms[0][adults]=1&rooms[0][children]=0`;
    } else {
      updatedHref = currHref + `&checkIn=${targetDateFormatted}&checkOut=${checkOutTargetDateFormatted}&rooms[0][adults]=1&rooms[0][children]=0`;
    }
  } else {
    let location = getParameterByName('location');
    let checkIn = getParameterByName('checkIn');

    if(checkIn == null) {
      updatedHref = `https://www.travelodge.co.uk/search/results?location=${location}&checkIn=${encodeURIComponent(targetDateFormatted)}&checkOut=${encodeURIComponent(checkOutTargetDateFormatted)}&rooms%5B0%5D%5Badults%5D=1&rooms%5B0%5D%5Bchildren%5D=0&sb=0`;
    } else {
      updatedHref = currHref.replace('checkIn=', `checkIn=${encodeURIComponent(targetDateFormatted)}`);
      //&checkOut=${encodeURIComponent(checkOutTargetDateFormatted)}
      if(updatedHref.indexOf('checkOut=') == -1) {
        updatedHref = updatedHref + `&checkOut=${encodeURIComponent(checkOutTargetDateFormatted)}`;
      } else {
        updatedHref = updatedHref.replace('checkOut=', `checkOut=${encodeURIComponent(checkOutTargetDateFormatted)}`);
      }
    }
  }
  

  if(debug == false) {
    fireEvent(`Interaction - user was redirected to the ${pageType} page with prefilled dates`, true);
    window.location.href = updatedHref;
  } else {

    // console.log(`todayDate: ${todayDate}`);
    // console.log(`cutoffDate: ${cutoffDate}`);
    // console.log(`targetDate: ${targetDate}`);
    // console.log(`checkoutDate: ${checkOutTargetDate}`);

    // if(todayDate < cutoffDate) {
    //   console.log(`todayDate < cutoffDate`);
    // }

    // console.log(`Original HREF: ${currHref}`);
    // console.log(`Updated HREF: ${updatedHref}`);

  }
  

}

const startTracking = () => {

  if(window.location.href.indexOf('/hotels/') > -1) {

    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('toggle-mini-search')) {
        fireEvent(`Click - user has clicked on the 'change' button to change their dates from the prefilled ones`, true);
      }
    });

  } else if(window.location.href.indexOf('/search/') > -1) {

    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('qa-search-button') || e.target.closest('.qa-search-button')) {
        fireEvent(`Click - user has clicked on the 'search again' button to change their dates from the prefilled ones`, true);
      }
    });
    

  }


}

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

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


  if (window.location.href.indexOf('/hotels/') > -1 && window.location.href.indexOf('checkIn') == -1) {
    startExperiment('hotel');
  } else if(window.location.href.indexOf('/search/') > -1 && (getParameterByName('checkIn') == null || getParameterByName('checkIn') == '')) {
    startExperiment('search');
  }

  if (document.referrer.indexOf('checkIn') == -1 || document.referrer.indexOf('checkIn=&') > -1) {
    startTracking();
    //insert redirect code here
    console.log('redirected')
            // //Additional messaging

        const addAdditionalMessaging = () => {

        let targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 7);

        let options = { weekday: 'long', day: 'numeric', month: 'short' };

        let targetDateFormatted = targetDate.toLocaleDateString('en-US', options);
        
        const additionalMessaging = `
          <div class="${ID}-additional-messaging-container">
            <div class="${ID}-additional-messaging-top">
              <p>Please enter dates for availability and pricing.</p>
            </div>
            <div class="${ID}-additional-messaging-bottom">
              <p>Prices displayed below are for ${targetDateFormatted}.</p>
            </div>
          </div>
        `

        const targetContainer = document.querySelector('.qa-search-page .map').parentElement;
        if(targetContainer) {
        targetContainer.insertAdjacentHTML('afterend', additionalMessaging);
        }
          
        }

        setTimeout(() => {
          addAdditionalMessaging();
        }, 2000);
  }
  
};
