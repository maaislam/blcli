/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getCookie, logMessage, pollerLite, setCookie } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const trackHotels = () => {

  pollerLite(['body',
    () => { return window.globalDataLayer; }
  ], () => {

    let todayDate = new Date();


    let todayDateFormatted = todayDate.getDate() + '/' + (todayDate.getMonth() + 1) + '/' + todayDate.getFullYear();

    let checkIn = getParameterByName('checkIn') !== null ? getParameterByName('checkIn') : todayDateFormatted;
    let checkOut = getParameterByName('checkOut') !== null ? getParameterByName('checkOut') : todayDateFormatted;

    if (checkIn.indexOf('/22') > -1) {
      checkIn = checkIn.replace('/22', '/2022');
    }
    if (checkIn.indexOf('/23') > -1) {
      checkIn = checkIn.replace('/23', '/2023');
    }

    if (checkOut.indexOf('/22') > -1) {
      checkOut = checkOut.replace('/22', '/2022');
    }
    if (checkOut.indexOf('/23') > -1) {
      checkOut = checkOut.replace('/23', '/2023');
    }


    let currURL = window.location.href;
    let globalDL = window.globalDataLayer;

    let roomObject = {
      name: globalDL.hotelName,
      id: globalDL.hotelCode,
      checkIn: checkIn,
      checkOut: checkOut,
      fullStringURL: currURL,
    };

    if (localStorage.getItem(`${ID}-recently-viewed`)) {

      let recentlyViewed = JSON.parse(localStorage.getItem(`${ID}-recently-viewed`));

      let found = false;
      // find an element in the array
      for (let i = 0; i < recentlyViewed.length; i++) {
        if (recentlyViewed[i].id === globalDL.hotelCode) {
          
          if(recentlyViewed[i].checkIn !== checkIn || recentlyViewed[i].checkOut !== checkOut) {
            recentlyViewed.splice(i, 1);
            localStorage.setItem(`${ID}-recently-viewed`, JSON.stringify(recentlyViewed));
            // remove index i from array
            
            found = false;
          } else {
            found = true;
          }
          break;
        }
      }

      if (found == false) {
        if (recentlyViewed.length >= 5) {
          recentlyViewed.pop();
        }

        recentlyViewed.unshift(roomObject);
      }

      


      localStorage.setItem(`${ID}-recently-viewed`, JSON.stringify(recentlyViewed));



    } else {

      let roomArray = [roomObject];

      localStorage.setItem(`${ID}-recently-viewed`, JSON.stringify(roomArray));


    }


  });



}

const startExperiment = () => {

  let currRecentlyViewed = JSON.parse(localStorage.getItem(`${ID}-recently-viewed`));

  let newSectionHTML = `
 
     <div class="${ID}-recently-viewed">
 
       <button class="${ID}-close"><svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg></button>
 
       <p> Recently Searched Hotels: </p>
 
       <div class="${ID}-recently-viewed--containerouter">
         <div class="${ID}-recently-viewed--container">
         ${currRecentlyViewed.map((item) => {

    let searchedCheckIn = item.checkIn.replaceAll('/', '-');
    let searchedCheckOut = item.checkOut.replaceAll('/', '-');

    var searchedCheckoutParts = searchedCheckOut.split('-');
    var searchedCheckoutDate = new Date(searchedCheckoutParts[2], searchedCheckoutParts[1] - 1, searchedCheckoutParts[0]);

    var searchedCheckinParts = searchedCheckIn.split('-');
    var searchedCheckinDate = new Date(searchedCheckinParts[2], searchedCheckinParts[1] - 1, searchedCheckinParts[0]);
          
    let searchedCheckinFormatted = daysOfWeek[searchedCheckinDate.getDay()] + ' ' + searchedCheckinDate.getDate() + ' ' + monthsOfYear[searchedCheckinDate.getMonth()];
    let searchedCheckoutFormatted = daysOfWeek[searchedCheckoutDate.getDay()] + ' ' + searchedCheckoutDate.getDate() + ' ' + monthsOfYear[searchedCheckoutDate.getMonth()];

    let todayDate = new Date();

    let theHTMLString = ``;
    let theDateString = ``;
    if (item.checkIn === item.checkOut) {
      theDateString = `No Dates Selected`;
    } else {
      theDateString = `${searchedCheckinFormatted} - ${searchedCheckoutFormatted}`;
    }

    if (searchedCheckinDate < todayDate) {

      var nextAvailDate = new Date(todayDate.getTime());
      nextAvailDate.setDate(todayDate.getDate() + (7 + searchedCheckinDate.getDay() - todayDate.getDay()) % 7);

      let nextAvailDateFormatted = nextAvailDate.getDate() + '/' + (nextAvailDate.getMonth() + 1) + '/' + nextAvailDate.getFullYear();
      let lengthOfStay = (searchedCheckoutDate - searchedCheckinDate) / 1000 / 60 / 60 / 24;
      let nextAvailDateRangeEndDate = new Date(nextAvailDate);
      nextAvailDateRangeEndDate.setDate(nextAvailDate.getDate() + lengthOfStay);
      let nextAvailDateFinalFormatted = nextAvailDateRangeEndDate.getDate() + '/' + (nextAvailDateRangeEndDate.getMonth() + 1) + '/' + nextAvailDateRangeEndDate.getFullYear();
      let newURLString = item.fullStringURL;
      newURLString = item.fullStringURL.replace(item.checkIn, nextAvailDateFormatted).replace(item.checkOut, nextAvailDateFinalFormatted);

      let nextAvailDateDisplayFormatted = daysOfWeek[nextAvailDate.getDay()] + ' ' + nextAvailDate.getDate() + ' ' + monthsOfYear[nextAvailDate.getMonth()];
      let nextAvailDateFinalDisplayFormatted = daysOfWeek[nextAvailDateRangeEndDate.getDay()] + ' ' + nextAvailDateRangeEndDate.getDate() + ' ' + monthsOfYear[nextAvailDateRangeEndDate.getMonth()];

      if (item.checkIn === item.checkOut) {
        theDateString = `No Dates Selected`;
      } else {
        theDateString = `${nextAvailDateDisplayFormatted} - ${nextAvailDateFinalDisplayFormatted}`;
      }

      theHTMLString = `
               <a href="${newURLString}" class="${ID}-recently-viewed--containeritem">
                 <img src="https://travelodgeblog.wpengine.com/wp-content/uploads/2022/04/${item.id}.jpg">
                 <p>${theDateString}</p>
               </a>
             `;

    } else {

      theHTMLString = `
               <a href="${item.fullStringURL}" class="${ID}-recently-viewed--containeritem">
                 <img src="https://travelodgeblog.wpengine.com/wp-content/uploads/2022/04/${item.id}.jpg">
                 <p>${theDateString}</p>
               </a>
             `;


    }


    return theHTMLString;

  }).join('')}
         </div>
       </div>
 
     </div>
   
   `;

  let insertionPoint = document.querySelector('.form-inline-sss')

  insertionPoint.insertAdjacentHTML('beforeend', newSectionHTML);

  fireEvent(`Visible - recently viewed hotels container added to the page`)

  let closeBtn = document.querySelector(`.${ID}-close`);
  closeBtn.addEventListener('click', () => {

    let recentlyViewed = document.querySelector(`.${ID}-recently-viewed`);
    recentlyViewed.remove();
    setCookie(`${ID}-recview-stoptracking`, true);
    localStorage.removeItem(`${ID}-recently-viewed`);

    fireEvent(`Click - user has clicked to remove the recently viewed section`);

  });

  let allRecentHotels = document.querySelectorAll(`.${ID}-recently-viewed--containeritem`);
  [].slice.call(allRecentHotels).forEach((item) => {

    item.addEventListener('click', (e) => {
      fireEvent(`Click - user has clicked on a recently viewed hotel to go to url: ${e.currentTarget.href}`);

    });


  });
}

const moveBanner = () => {

  let banner = document.querySelector('.espot-container.hero-image');

  let modalSearch = document.getElementById('modalSearch');

  if (banner && modalSearch) {

    modalSearch.insertAdjacentElement('afterend', banner);
    banner.classList.add(`${ID}-banner`);

  }


}

export default () => {

  setup();

  logMessage(ID + " Variation: " + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if(document.body.classList.contains('pgHome') && localStorage.getItem(`${ID}-recently-viewed`) && JSON.parse(localStorage.getItem(`${ID}-recently-viewed`)).length > 0) {
    fireEvent(`Visible - recently viewed hotels container would be displayed, number recently viewed: ${JSON.parse(localStorage.getItem(`${ID}-recently-viewed`)).length}`);
  } else if(document.body.classList.contains('pgHome') && !localStorage.getItem(`${ID}-recently-viewed`)) {
    fireEvent(`Visible - recently viewed hotels container would not be displayed`);
  }


  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  if (window.location.href.indexOf('/hotels') > -1 && (getCookie(`${ID}-recview-stoptracking`) !== true)) {
    trackHotels();
  } else if (document.body.classList.contains('pgHome') && localStorage.getItem(`${ID}-recently-viewed`) && JSON.parse(localStorage.getItem(`${ID}-recently-viewed`)).length > 0 && VARIATION !== 'control' && !document.querySelector(`.${ID}-recently-viewed`)) {
    pollerLite(['.form-inline-sss'], () => {
      startExperiment();
    });
  }

  if (document.body.classList.contains('pgHome') && VARIATION !== 'control') {
    pollerLite(['.espot-container.hero-image', '#modalSearch'], () => {
      moveBanner();
    });
  }


};
