/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getCookie, logMessage, pollerLite, setCookie, deleteCookie } from '../../../../../lib/utils';

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
    // console.log('tracking hotels');
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
    if (checkIn.indexOf('/24') > -1) {
      checkIn = checkIn.replace('/24', '/2024');
    }
    if (checkIn.indexOf('/25') > -1) {
      checkIn = checkIn.replace('/25', '/2025');
    }

    if (checkOut.indexOf('/22') > -1) {
      checkOut = checkOut.replace('/22', '/2022');
    }
    if (checkOut.indexOf('/23') > -1) {
      checkOut = checkOut.replace('/23', '/2023');
    }
    if (checkOut.indexOf('/24') > -1) {
      checkOut = checkOut.replace('/24', '/2024');
    }
    if (checkOut.indexOf('/25') > -1) {
      checkOut = checkOut.replace('/25', '/2025');
    }


    let currURL = window.location.href;
    let globalDL = window.globalDataLayer;

    let roomObject = {
      name: globalDL.hotelName,
      id: globalDL.hotelCode,
      nearbyHotels: globalDL.nearbyHotelFirst,
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
            setCookie(`${ID}-recently-viewed`, true);
            
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
      setCookie(`${ID}-recently-viewed`, true);


    } else {

      let roomArray = [roomObject];

      localStorage.setItem(`${ID}-recently-viewed`, JSON.stringify(roomArray));
      setCookie(`${ID}-recently-viewed`, true);

    }


  });



}

const startExperiment = () => {

  let currRecentlyViewed = JSON.parse(localStorage.getItem(`${ID}-recently-viewed`));
  // console.log('curr rec viewed ',currRecentlyViewed);

  function getHotelData(hotelSKU) {
    return new Promise((resolve, reject) => {
        window.DY.ServerUtil.getProductsData([hotelSKU], ['daily', 'twoDays'], 'view', true, function(err, res) {
          if(err) {
            reject(err);
          } else {
            const hotelData = res[hotelSKU].productData;
            resolve(hotelData);
          }
        });
      })
  }

  if (currRecentlyViewed.length < 5) {
    pollerLite([() => typeof window.DY.feedProperties === 'object' && typeof window.DY.ServerUtil === 'object'], () => {
    const lastViewed = currRecentlyViewed[0];

    getHotelData(lastViewed.id).then((hotelData) => {
      // console.log(hotelData["algo:items:Nearby Hotels"]);
      let nearbyHotelIDs = hotelData["algo:items:Nearby Hotels"].split("|");
      let promises = nearbyHotelIDs.map((item) => {
        return getHotelData(item)
          .then((hotelData) => {
            return {
              id: item,  
              url: hotelData["url"].replace('www.travelodge.co.uk', ''), 
            };
          });
      });
  
      return Promise.all(promises);
      }).then((nearbyHotels) => {
      // console.log(nearbyHotels, ' nearby hotels');

        let newSectionHTML = `
 
     <div class="${ID}-recently-viewed">
 
       <button class="${ID}-close"><svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg></button>
 
       <p> Recently Searched Hotels: </p>
 
       <div class="${ID}-recently-viewed--containerouter">
         <div class="${ID}-recently-viewed--container">

         ${currRecentlyViewed.map((item, index) => {

          let nearbyHotelHTML = ``;
          let difference  = 5 - currRecentlyViewed.length;
          //target most recently viewed
          if(index < 1) {
            nearbyHotels.map((nearbyItem, index) => {
                if(index < difference){
                  // console.log(item);
                  // console.log('index', index)
                  // console.log('curr rec viewed in nearbyHotels map', currRecentlyViewed);
                  let currRecentlyViewedItem = currRecentlyViewed[0];
                  // console.log('curr rec viewd item', currRecentlyViewedItem);
                  let searchedCheckIn = currRecentlyViewedItem.checkIn.replaceAll('/', '-');
                  let searchedCheckOut = currRecentlyViewedItem.checkOut.replaceAll('/', '-');
                  let searchedCheckinParts = searchedCheckIn.split('-');
                  let searchedCheckinDate = new Date(searchedCheckinParts[2], searchedCheckinParts[1] - 1, searchedCheckinParts[0]);
                  let searchedCheckinFormatted = daysOfWeek[searchedCheckinDate.getDay()] + ' ' + searchedCheckinDate.getDate() + ' ' + monthsOfYear[searchedCheckinDate.getMonth()];
                  let searchedCheckOutParts = searchedCheckOut.split('-');
                  let searchedCheckOutDate = new Date(searchedCheckOutParts[2], searchedCheckOutParts[1] - 1, searchedCheckOutParts[0]);
                  let searchedCheckOutFormatted = daysOfWeek[searchedCheckOutDate.getDay()] + ' ' + searchedCheckOutDate.getDate() + ' ' + monthsOfYear[searchedCheckOutDate.getMonth()];
                  let todayDate = new Date();
                  let theHTMLString = ``;
                  let theDateString = ``;
                  let isNextDayCheckout = searchedCheckOutDate.getTime() === searchedCheckinDate.getTime() + (24 * 60 * 60 * 1000); // Check if checkout is the next day


                  if (currRecentlyViewedItem.checkIn === currRecentlyViewedItem.checkOut) {
                    // theDateString = `No Dates Selected`;
                    let nextSunday = new Date(todayDate.getTime());
                    nextSunday.setDate(todayDate.getDate() + (7 - todayDate.getDay())); // Find the next Sunday
                    let nextSundayFormatted = daysOfWeek[nextSunday.getDay()] + ' ' + nextSunday.getDate() + ' ' + monthsOfYear[nextSunday.getMonth()];
                    theDateString = `${nextSundayFormatted}`;
                  } else if (isNextDayCheckout) {
                    theDateString = `${searchedCheckinFormatted}`;
                  } else {
                    theDateString = `${searchedCheckinFormatted} - ${searchedCheckOutFormatted}`;
                  }
    
                  if (searchedCheckinDate < todayDate) {
                    var nextAvailDate = new Date(todayDate.getTime());
                    nextAvailDate.setDate(todayDate.getDate() + (7 + searchedCheckinDate.getDay() - todayDate.getDay()) % 7);
                    let nextAvailDateFormatted = nextAvailDate.getDate() + '/' + (nextAvailDate.getMonth() + 1) + '/' + nextAvailDate.getFullYear();
                    let lengthOfStay = (searchedCheckOutDate - searchedCheckinDate) / 1000 / 60 / 60 / 24;
                    let nextAvailDateRangeEndDate = new Date(nextAvailDate);
                    nextAvailDateRangeEndDate.setDate(nextAvailDate.getDate() + lengthOfStay);
                    let nextAvailDateFinalFormatted = nextAvailDateRangeEndDate.getDate() + '/' + (nextAvailDateRangeEndDate.getMonth() + 1) + '/' + nextAvailDateRangeEndDate.getFullYear();
                    // let newURLString = item.fullStringURL.toString();
                    // console.log('newURLString', newURLString);
                    let newURLString = item.fullStringURL.replace(currRecentlyViewedItem.checkIn, nextAvailDateFormatted).replace(currRecentlyViewedItem.checkOut, nextAvailDateFinalFormatted);
                    let nextAvailDateDisplayFormatted = daysOfWeek[nextAvailDate.getDay()] + ' ' + nextAvailDate.getDate() + ' ' + monthsOfYear[nextAvailDate.getMonth()];
                    let nextAvailDateFinalDisplayFormatted = daysOfWeek[nextAvailDateRangeEndDate.getDay()] + ' ' + nextAvailDateRangeEndDate.getDate() + ' ' + monthsOfYear[nextAvailDateRangeEndDate.getMonth()];
                    if (currRecentlyViewedItem.checkIn === currRecentlyViewedItem.checkOut) {
                      // theDateString = `No Dates Selected`;
                      let nextSunday = new Date(todayDate.getTime());
                      nextSunday.setDate(todayDate.getDate() + (7 - todayDate.getDay())); // Find the next Sunday
                      let nextSundayFormatted = daysOfWeek[nextSunday.getDay()] + ' ' + nextSunday.getDate() + ' ' + monthsOfYear[nextSunday.getMonth()];
                      theDateString = `${nextSundayFormatted}`;
                    } else if (isNextDayCheckout) {
                      theDateString = `${searchedCheckinFormatted}`;
                    } else {
                      theDateString = `${nextAvailDateDisplayFormatted} - ${nextAvailDateFinalDisplayFormatted}`;
                    }
                    let nearbyItemURL = nearbyItem.url;
                    theHTMLString = `
                   <a href="${nearbyItemURL}" class="${ID}-recently-viewed--containeritem">
                     <img src="https://media.travelodge.co.uk/image/upload/ecrm/hotels-digi/${nearbyItem.id}.jpg">
                     <p>${theDateString}</p>
                   </a>
                  `;
    
                  } else {
                    let nearbyItemURL = nearbyItem.url + '?checkIn=' + currRecentlyViewedItem.checkIn + '&checkOut=' + currRecentlyViewedItem.checkOut;
                    theHTMLString = `
                   <a href="${nearbyItemURL}" class="${ID}-recently-viewed--containeritem">
                     <img src="https://media.travelodge.co.uk/image/upload/ecrm/hotels-digi/${nearbyItem.id}.jpg">
                     <p>${theDateString}</p>
                   </a>
                  `;
                  }
                  return nearbyHotelHTML += theHTMLString;
                }
             }).join('')
          }
          
    let searchedCheckIn = item.checkIn.replaceAll('/', '-');
    let searchedCheckOut = item.checkOut.replaceAll('/', '-');

    var searchedCheckoutParts = searchedCheckOut.split('-');
    var searchedCheckoutDate = new Date(searchedCheckoutParts[2], searchedCheckoutParts[1] - 1, searchedCheckoutParts[0]);

    var searchedCheckinParts = searchedCheckIn.split('-');
    var searchedCheckinDate = new Date(searchedCheckinParts[2], searchedCheckinParts[1] - 1, searchedCheckinParts[0]);
          
    let searchedCheckinFormatted = daysOfWeek[searchedCheckinDate.getDay()] + ' ' + searchedCheckinDate.getDate() + ' ' + monthsOfYear[searchedCheckinDate.getMonth()];
    let searchedCheckoutFormatted = daysOfWeek[searchedCheckoutDate.getDay()] + ' ' + searchedCheckoutDate.getDate() + ' ' + monthsOfYear[searchedCheckoutDate.getMonth()];
    let lengthOfStay = (searchedCheckoutDate - searchedCheckinDate) / 1000 / 60 / 60 / 24;

    let todayDate = new Date();
    // console.log('here is the item');

    let theHTMLString = ``;
    let theDateString = ``;
    if (item.checkIn === item.checkOut) {
      // theDateString = `No Dates Selected`;
      let nextSunday = new Date(todayDate.getTime());
      nextSunday.setDate(todayDate.getDate() + (7 - todayDate.getDay())); // Find the next Sunday
      let nextSundayFormatted = daysOfWeek[nextSunday.getDay()] + ' ' + nextSunday.getDate() + ' ' + monthsOfYear[nextSunday.getMonth()];
      theDateString = `${nextSundayFormatted}`;
    } else if (lengthOfStay == 1) {
      theDateString = `${searchedCheckinFormatted}`;
    }else {
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
        // theDateString = `No Dates Selected`;
        let nextSunday = new Date(todayDate.getTime());
        nextSunday.setDate(todayDate.getDate() + (7 - todayDate.getDay())); // Find the next Sunday
        let nextSundayFormatted = daysOfWeek[nextSunday.getDay()] + ' ' + nextSunday.getDate() + ' ' + monthsOfYear[nextSunday.getMonth()];
        theDateString = `${nextSundayFormatted}`;
      } else if (lengthOfStay == 1) {
        theDateString = `${nextAvailDateDisplayFormatted}`;
      } else {
        theDateString = `${nextAvailDateDisplayFormatted} - ${nextAvailDateFinalDisplayFormatted}`;
      }

      theHTMLString = `
               <a href="${newURLString}" class="${ID}-recently-viewed--containeritem">
                 <img src="https://media.travelodge.co.uk/image/upload/ecrm/hotels-digi/${item.id}.jpg">
                 <p>${theDateString}</p>
               </a>
             `;

    } else {

      theHTMLString = `
               <a href="${item.fullStringURL}" class="${ID}-recently-viewed--containeritem">
                 <img src="https://media.travelodge.co.uk/image/upload/ecrm/hotels-digi/${item.id}.jpg">
                 <p>${theDateString}</p>
               </a>
             `;


    }


    return  theHTMLString + nearbyHotelHTML;

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
    deleteCookie(`${ID}-recently-viewed`);

    fireEvent(`Click - user has clicked to remove the recently viewed section`);

  });

  let allRecentHotels = document.querySelectorAll(`.${ID}-recently-viewed--containeritem`);
  [].slice.call(allRecentHotels).forEach((item) => {

    item.addEventListener('click', (e) => {
      fireEvent(`Click - user has clicked on a recently viewed hotel to go to url: ${e.currentTarget.href}`);

    });


  });

    }).catch((err) => {
      console.log(err);
    });
  });

  } else {

  let newSectionHTML = `
 
     <div class="${ID}-recently-viewed">
 
       <button class="${ID}-close"><svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg></button>
 
       <p> Recently Searched Hotels: </p>
 
       <div class="${ID}-recently-viewed--containerouter">
         <div class="${ID}-recently-viewed--container">
         ${currRecentlyViewed.map((item) => {

          // console.log(item);

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
      // theDateString = `No Dates Selected`;
      let nextSunday = new Date(todayDate.getTime());
      nextSunday.setDate(todayDate.getDate() + (7 - todayDate.getDay())); // Find the next Sunday
      let nextSundayFormatted = daysOfWeek[nextSunday.getDay()] + ' ' + nextSunday.getDate() + ' ' + monthsOfYear[nextSunday.getMonth()];
      theDateString = `${nextSundayFormatted}`;
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
        // theDateString = `No Dates Selected`;
        let nextSunday = new Date(todayDate.getTime());
        nextSunday.setDate(todayDate.getDate() + (7 - todayDate.getDay())); // Find the next Sunday
        let nextSundayFormatted = daysOfWeek[nextSunday.getDay()] + ' ' + nextSunday.getDate() + ' ' + monthsOfYear[nextSunday.getMonth()];
        theDateString = `${nextSundayFormatted}`;
      } else {
        theDateString = `${nextAvailDateDisplayFormatted} - ${nextAvailDateFinalDisplayFormatted}`;
      }

      theHTMLString = `
               <a href="${newURLString}" class="${ID}-recently-viewed--containeritem">
                 <img src="https://media.travelodge.co.uk/image/upload/ecrm/hotels-digi/${item.id}.jpg">
                 <p>${theDateString}</p>
               </a>
             `;

    } else {

      theHTMLString = `
               <a href="${item.fullStringURL}" class="${ID}-recently-viewed--containeritem">
                 <img src="https://media.travelodge.co.uk/image/upload/ecrm/hotels-digi/${item.id}.jpg">
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
    deleteCookie(`${ID}-recently-viewed`);

    fireEvent(`Click - user has clicked to remove the recently viewed section`);

  });

  let allRecentHotels = document.querySelectorAll(`.${ID}-recently-viewed--containeritem`);
  [].slice.call(allRecentHotels).forEach((item) => {

    item.addEventListener('click', (e) => {
      fireEvent(`Click - user has clicked on a recently viewed hotel to go to url: ${e.currentTarget.href}`);

    });


  });
  }
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
  // console.log('experiment code here')
  if (window.location.href.indexOf('/hotels') > -1 && (getCookie(`${ID}-recview-stoptracking`) !== true)) {
    // console.log('tracking hotels');
    trackHotels();
  } else if (document.body.classList.contains('pgHome') && localStorage.getItem(`${ID}-recently-viewed`) && JSON.parse(localStorage.getItem(`${ID}-recently-viewed`)).length > 0 && VARIATION !== 'control' && !document.querySelector(`.${ID}-recently-viewed`)) {
    pollerLite(['.form-inline-sss'], () => {
      // console.log('adding recently viewed');
      startExperiment();
    });
  }

  if (document.body.classList.contains('pgHome') && VARIATION !== 'control') {
    pollerLite(['.espot-container.hero-image', '#modalSearch'], () => {
      // moveBanner();
    });
  }


};
