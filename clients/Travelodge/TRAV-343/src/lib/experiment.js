import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getCookie, logMessage, pollerLite, setCookie, deleteCookie } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

// Array of weekday and month names
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = (inputDate) => {
  // Split the input date into day, month, and year
  const [day, month, year] = inputDate.split("/").map(Number);
  
  // Create a new Date object
  const date = new Date(year, month - 1, day);
  
  // Get the day of the week, day of the month, and month name
  const dayOfWeek = daysOfWeek[date.getDay()];
  const monthName = monthsOfYear[date.getMonth()];

  return `${dayOfWeek} ${day} ${monthName}`;
}


function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function extractNearbyHotelsData() {
  const inputs = document.querySelectorAll('input.moengage-data');
  const hotelData = {};

  inputs.forEach((input) => {
    const match = input.name.match(/mdb__(nh\d+)_(\w+)/);

    if (match) {
      const [_, hotelId, field] = match;

      if (!hotelData[hotelId]) {
        hotelData[hotelId] = {}; // Create a new object for each unique hotel ID
      }

      hotelData[hotelId][field] = input.value; // Set the field and value for each hotel
    }
  });

  // Convert the hotelData object into an array of objects
  return Object.keys(hotelData).map((hotelId) => ({
    hotelId,
    ...hotelData[hotelId],
  }));
}

const trackHotels = () => {
  pollerLite(
    [
      'input.moengage-data',
      () => {
        return window.globalDataLayer;
      },
    ],
    () => {
      console.log('tracking hotels', extractNearbyHotelsData());
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
        nearbyHotelsData: extractNearbyHotelsData() || [],
      };

      if (localStorage.getItem(`${ID}-recently-viewed`)) {
        let recentlyViewed = JSON.parse(localStorage.getItem(`${ID}-recently-viewed`));

        let found = false;
        // find an element in the array
        for (let i = 0; i < recentlyViewed.length; i++) {
          if (recentlyViewed[i].id === globalDL.hotelCode) {
            if (recentlyViewed[i].checkIn !== checkIn || recentlyViewed[i].checkOut !== checkOut) {
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
    }
  );
};

const areDatesEqualOrOneDayApart = (date1, date2) => {
  // Convert the date strings to Date objects
  const [day1, month1, year1] = date1.split('/').map(Number);
  const [day2, month2, year2] = date2.split('/').map(Number);

  const dateObj1 = new Date(year1, month1 - 1, day1);
  const dateObj2 = new Date(year2, month2 - 1, day2);

  // Calculate the difference in time
  const timeDifference = Math.abs(dateObj2 - dateObj1);

  // Calculate the difference in days
  const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

  // Return true if the dates are equal or differ by exactly 1 day
  return dayDifference === 0 || dayDifference === 1;
};

const startExperiment = () => {
  let currRecentlyViewed = JSON.parse(localStorage.getItem(`${ID}-recently-viewed`));
  // console.log('curr rec viewed ', currRecentlyViewed);

  if (currRecentlyViewed.length < 5) {
    pollerLite(['body'], () => {
      //if no nearby hotel data is found, return
      //if not in the first one check others

      const lastViewed =
        currRecentlyViewed[0].nearbyHotelsData.length > 0
          ? currRecentlyViewed[0]
          : currRecentlyViewed.find((item) => item.nearbyHotelsData.length > 0);

      const nearbyHotels = lastViewed.nearbyHotelsData;
      // console.log(nearbyHotels, ' nearby hotels');
      const filteredNearbyHotels = nearbyHotels.filter((hotel) =>
        currRecentlyViewed.every((recent) => recent.id !== hotel.hotelId)
      );

      let newSectionHTML = `
 
     <div class="${ID}-recently-viewed">
 
       <button class="${ID}-close"><svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg></button>
 
       <p> Jump back in </p>
 
       <div class="${ID}-recently-viewed--containerouter">
         <div class="${ID}-recently-viewed--container">

         ${currRecentlyViewed
          .map((item, index) => {
            let nearbyHotelHTML = ``;
            let difference = 5 - currRecentlyViewed.length;
            //target most recently viewed
            if (VARIATION === '2' ? index === 0 : currRecentlyViewed.length === index + 1) {
              filteredNearbyHotels
                .map((nearbyItem, index) => {
                  if (index < difference) {
                    // console.log(item);
                    // console.log('index', index)
                    // console.log('curr rec viewed in nearbyHotels map', currRecentlyViewed);
                    let currRecentlyViewedItem = currRecentlyViewed[0];
                    // console.log('curr rec viewd item', currRecentlyViewedItem);
                    let searchedCheckIn = currRecentlyViewedItem.checkIn.replaceAll('/', '-');
                    let searchedCheckOut = currRecentlyViewedItem.checkOut.replaceAll('/', '-');
                    let searchedCheckinParts = searchedCheckIn.split('-');
                    let searchedCheckinDate = new Date(
                      searchedCheckinParts[2],
                      searchedCheckinParts[1] - 1,
                      searchedCheckinParts[0]
                    );
                    let searchedCheckinFormatted =
                      daysOfWeek[searchedCheckinDate.getDay()] +
                      ' ' +
                      searchedCheckinDate.getDate() +
                      ' ' +
                      monthsOfYear[searchedCheckinDate.getMonth()];
                    let searchedCheckOutParts = searchedCheckOut.split('-');
                    let searchedCheckOutDate = new Date(
                      searchedCheckOutParts[2],
                      searchedCheckOutParts[1] - 1,
                      searchedCheckOutParts[0]
                    );
                    let searchedCheckOutFormatted =
                      daysOfWeek[searchedCheckOutDate.getDay()] +
                      ' ' +
                      searchedCheckOutDate.getDate() +
                      ' ' +
                      monthsOfYear[searchedCheckOutDate.getMonth()];
                    let todayDate = new Date();
                    let theHTMLString = ``;
                    let theDateString = ``;
                    let isNextDayCheckout =
                      searchedCheckOutDate.getTime() === searchedCheckinDate.getTime() + 24 * 60 * 60 * 1000; // Check if checkout is the next day

                    if (currRecentlyViewedItem.checkIn === currRecentlyViewedItem.checkOut) {
                      // theDateString = `No Dates Selected`;
                      let nextSunday = new Date(todayDate.getTime());
                      nextSunday.setDate(todayDate.getDate() + (7 - todayDate.getDay())); // Find the next Sunday
                      let nextSundayFormatted =
                        daysOfWeek[nextSunday.getDay()] + ' ' + nextSunday.getDate() + ' ' + monthsOfYear[nextSunday.getMonth()];
                      theDateString = `${nextSundayFormatted}`;
                    } else if (isNextDayCheckout) {
                      theDateString = `${searchedCheckinFormatted}`;
                    } else {
                      theDateString = `${searchedCheckinFormatted} - ${searchedCheckOutFormatted}`;
                    }

                    const addhttps = (nearbyItemURL) => {
                      if (nearbyItemURL.includes('https://')) {
                        nearbyItemURL = nearbyItem.url;
                      } else {
                        nearbyItemURL = 'https://' + nearbyItem.url;
                      }
                      return nearbyItemURL;
                    };

                    if (searchedCheckinDate < todayDate) {
                      var nextAvailDate = new Date(todayDate.getTime());
                      nextAvailDate.setDate(todayDate.getDate() + ((7 + searchedCheckinDate.getDay() - todayDate.getDay()) % 7));
                      let nextAvailDateFormatted =
                        nextAvailDate.getDate() + '/' + (nextAvailDate.getMonth() + 1) + '/' + nextAvailDate.getFullYear();
                      let lengthOfStay = (searchedCheckOutDate - searchedCheckinDate) / 1000 / 60 / 60 / 24;
                      let nextAvailDateRangeEndDate = new Date(nextAvailDate);
                      nextAvailDateRangeEndDate.setDate(nextAvailDate.getDate() + lengthOfStay);
                      let nextAvailDateFinalFormatted =
                        nextAvailDateRangeEndDate.getDate() +
                        '/' +
                        (nextAvailDateRangeEndDate.getMonth() + 1) +
                        '/' +
                        nextAvailDateRangeEndDate.getFullYear();
                      // let newURLString = item.fullStringURL.toString();
                      // console.log('newURLString', newURLString);
                      let newURLString = item.fullStringURL
                        .replace(currRecentlyViewedItem.checkIn, nextAvailDateFormatted)
                        .replace(currRecentlyViewedItem.checkOut, nextAvailDateFinalFormatted);
                      let nextAvailDateDisplayFormatted =
                        daysOfWeek[nextAvailDate.getDay()] +
                        ' ' +
                        nextAvailDate.getDate() +
                        ' ' +
                        monthsOfYear[nextAvailDate.getMonth()];
                      let nextAvailDateFinalDisplayFormatted =
                        daysOfWeek[nextAvailDateRangeEndDate.getDay()] +
                        ' ' +
                        nextAvailDateRangeEndDate.getDate() +
                        ' ' +
                        monthsOfYear[nextAvailDateRangeEndDate.getMonth()];
                      if (currRecentlyViewedItem.checkIn === currRecentlyViewedItem.checkOut) {
                        // theDateString = `No Dates Selected`;
                        let nextSunday = new Date(todayDate.getTime());
                        nextSunday.setDate(todayDate.getDate() + (7 - todayDate.getDay())); // Find the next Sunday
                        let nextSundayFormatted =
                          daysOfWeek[nextSunday.getDay()] +
                          ' ' +
                          nextSunday.getDate() +
                          ' ' +
                          monthsOfYear[nextSunday.getMonth()];
                        theDateString = `${nextSundayFormatted}`;
                      } else if (isNextDayCheckout) {
                        theDateString = `${searchedCheckinFormatted}`;
                      } else {
                        theDateString = `${nextAvailDateDisplayFormatted} - ${nextAvailDateFinalDisplayFormatted}`;
                      }
                      let nearbyItemURL = nearbyItem.url;

                      //add https://www.travelodge.co.uk/hotels/ to the url
                      nearbyItemURL = addhttps(nearbyItemURL);

                      const newUrl = new URL(nearbyItemURL);

                      theHTMLString = `
                        <a href="${newUrl.pathname}" class="${ID}-recently-viewed--containeritem">
                          <p class="">Nearby</p>
                          <img src="https://media.travelodge.co.uk/image/upload/ecrm/hotels-digi/${nearbyItem.gb}.jpg">
                          <p>${theDateString}</p>
                        </a>
                        `;
                    } else {
                      let nearbyItemURL = nearbyItem.url;
                      nearbyItemURL = addhttps(nearbyItemURL);
                      // console.log('I am here', nearbyItemURL);
                      const newUrl = new URL(nearbyItemURL);
                      newUrl.searchParams.set('checkIn', currRecentlyViewedItem.checkIn);
                      newUrl.searchParams.set('checkOut', currRecentlyViewedItem.checkOut);
                      // console.log('nearbyItemURL test test', nearbyItemURL);
                      
                      theHTMLString = `
                   <a href="${nearbyItemURL}" class="${ID}-recently-viewed--containeritem">
                      <p class="">Nearby</p>
                     <img src="https://media.travelodge.co.uk/image/upload/ecrm/hotels-digi/${nearbyItem.gb}.jpg">
                     <p>${theDateString}</p>
                   </a>
                  `;
                    }
                    return (nearbyHotelHTML += theHTMLString);
                  }
                })
                .join('');
            }

            let searchedCheckIn = item.checkIn.replaceAll('/', '-');
            let searchedCheckOut = item.checkOut.replaceAll('/', '-');

            var searchedCheckoutParts = searchedCheckOut.split('-');
            var searchedCheckoutDate = new Date(
              searchedCheckoutParts[2],
              searchedCheckoutParts[1] - 1,
              searchedCheckoutParts[0]
            );

            var searchedCheckinParts = searchedCheckIn.split('-');
            var searchedCheckinDate = new Date(searchedCheckinParts[2], searchedCheckinParts[1] - 1, searchedCheckinParts[0]);

            let searchedCheckinFormatted =
              daysOfWeek[searchedCheckinDate.getDay()] +
              ' ' +
              searchedCheckinDate.getDate() +
              ' ' +
              monthsOfYear[searchedCheckinDate.getMonth()];
            let searchedCheckoutFormatted =
              daysOfWeek[searchedCheckoutDate.getDay()] +
              ' ' +
              searchedCheckoutDate.getDate() +
              ' ' +
              monthsOfYear[searchedCheckoutDate.getMonth()];
            let lengthOfStay = (searchedCheckoutDate - searchedCheckinDate) / 1000 / 60 / 60 / 24;

            let todayDate = new Date();
            // console.log('here is the item');

            let theHTMLString = ``;
            let theDateString = ``;
            const convertToValidDate = (dateStr) => {
              const [day, month, year] = dateStr.split('/');

              // Return a new Date object in the correct format (YYYY-MM-DD)
              return new Date(`${year}-${month}-${day}`);
            };

            const checkIn = new Date(convertToValidDate(item.checkIn));
            const checkOut = new Date(convertToValidDate(item.checkOut));
            const timeDifference = checkOut - checkIn;
            const daysDifference = timeDifference / (1000 * 60 * 60 * 24) || 0;

            //show just check in date if daysDifference is 1

            if (item.checkIn === item.checkOut) {
              // theDateString = `No Dates Selected`;
              let nextSunday = new Date(todayDate.getTime());
              nextSunday.setDate(todayDate.getDate() + (7 - todayDate.getDay())); // Find the next Sunday
              let nextSundayFormatted =
                daysOfWeek[nextSunday.getDay()] + ' ' + nextSunday.getDate() + ' ' + monthsOfYear[nextSunday.getMonth()];
              theDateString = `${nextSundayFormatted}`;
            } else if (lengthOfStay == 1) {
              theDateString = `${searchedCheckinFormatted}`;
            } else {
              theDateString = `${searchedCheckinFormatted} - ${searchedCheckoutFormatted}`;
            }

            if (searchedCheckinDate < todayDate) {
              var nextAvailDate = new Date(todayDate.getTime());
              nextAvailDate.setDate(todayDate.getDate() + ((7 + searchedCheckinDate.getDay() - todayDate.getDay()) % 7));

              let nextAvailDateFormatted =
                nextAvailDate.getDate() + '/' + (nextAvailDate.getMonth() + 1) + '/' + nextAvailDate.getFullYear();
              let lengthOfStay = (searchedCheckoutDate - searchedCheckinDate) / 1000 / 60 / 60 / 24;
              let nextAvailDateRangeEndDate = new Date(nextAvailDate);
              nextAvailDateRangeEndDate.setDate(nextAvailDate.getDate() + lengthOfStay);
              let nextAvailDateFinalFormatted =
                nextAvailDateRangeEndDate.getDate() +
                '/' +
                (nextAvailDateRangeEndDate.getMonth() + 1) +
                '/' +
                nextAvailDateRangeEndDate.getFullYear();
              let newURLString = item.fullStringURL;
              newURLString = item.fullStringURL
                .replace(item.checkIn, nextAvailDateFormatted)
                .replace(item.checkOut, nextAvailDateFinalFormatted);

              let nextAvailDateDisplayFormatted =
                daysOfWeek[nextAvailDate.getDay()] +
                ' ' +
                nextAvailDate.getDate() +
                ' ' +
                monthsOfYear[nextAvailDate.getMonth()];
              let nextAvailDateFinalDisplayFormatted =
                daysOfWeek[nextAvailDateRangeEndDate.getDay()] +
                ' ' +
                nextAvailDateRangeEndDate.getDate() +
                ' ' +
                monthsOfYear[nextAvailDateRangeEndDate.getMonth()];

              if (item.checkIn === item.checkOut) {
                // theDateString = `No Dates Selected`;
                let nextSunday = new Date(todayDate.getTime());
                nextSunday.setDate(todayDate.getDate() + (7 - todayDate.getDay())); // Find the next Sunday
                let nextSundayFormatted =
                  daysOfWeek[nextSunday.getDay()] + ' ' + nextSunday.getDate() + ' ' + monthsOfYear[nextSunday.getMonth()];
                theDateString = `${nextSundayFormatted}`;
              } else if (lengthOfStay == 1) {
                theDateString = `${nextAvailDateDisplayFormatted}`;
              } else {
                theDateString = `${nextAvailDateDisplayFormatted} - ${nextAvailDateFinalDisplayFormatted}`;
              }

              theHTMLString = `
              <a href="${newURLString}" class="${ID}-recently-viewed--containeritem">
                <p class="">Recently viewed</p>
                <img src="https://media.travelodge.co.uk/image/upload/ecrm/hotels-digi/${item.id}.jpg">
                <p>${theDateString}</p>
              </a>
              `;
            } else {
              theHTMLString = `
               <a href="${item.fullStringURL}" class="${ID}-recently-viewed--containeritem">
                  <p class="">Recently viewed</p>
                 <img src="https://media.travelodge.co.uk/image/upload/ecrm/hotels-digi/${item.id}.jpg">
                 <p>${theDateString}</p>
               </a>
             `;
            }

            return theHTMLString + nearbyHotelHTML;
          })
          .join('')}
         </div>
       </div>
 
     </div>
   
   `;

      let insertionPoint = document.querySelector('.form-inline-sss');

      insertionPoint.insertAdjacentHTML('beforeend', newSectionHTML);

      fireEvent(`Visible - recently viewed hotels container added to the page`);

      let closeBtn = document.querySelector(`.${ID}-close`);
      closeBtn.addEventListener('click', () => {
        let recentlyViewed = document.querySelector(`.${ID}-recently-viewed`);
        recentlyViewed?.remove();
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
    });
  } else {
    let newSectionHTML = `
 
     <div class="${ID}-recently-viewed">
 
       <button class="${ID}-close"><svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg></button>
 
       <p> Jump back in </p>
 
       <div class="${ID}-recently-viewed--containerouter">
         <div class="${ID}-recently-viewed--container">
         ${currRecentlyViewed
        .map((item) => {
          // console.log(item);

          let searchedCheckIn = item.checkIn.replaceAll('/', '-');
          let searchedCheckOut = item.checkOut.replaceAll('/', '-');

          var searchedCheckoutParts = searchedCheckOut.split('-');
          var searchedCheckoutDate = new Date(
            searchedCheckoutParts[2],
            searchedCheckoutParts[1] - 1,
            searchedCheckoutParts[0]
          );

          var searchedCheckinParts = searchedCheckIn.split('-');
          var searchedCheckinDate = new Date(searchedCheckinParts[2], searchedCheckinParts[1] - 1, searchedCheckinParts[0]);

          let searchedCheckinFormatted =
            daysOfWeek[searchedCheckinDate.getDay()] +
            ' ' +
            searchedCheckinDate.getDate() +
            ' ' +
            monthsOfYear[searchedCheckinDate.getMonth()];
          let searchedCheckoutFormatted =
            daysOfWeek[searchedCheckoutDate.getDay()] +
            ' ' +
            searchedCheckoutDate.getDate() +
            ' ' +
            monthsOfYear[searchedCheckoutDate.getMonth()];

          let todayDate = new Date();

          let theHTMLString = ``;
          let theDateString = ``;
          if (item.checkIn === item.checkOut) {
            // theDateString = `No Dates Selected`;
            let nextSunday = new Date(todayDate.getTime());
            nextSunday.setDate(todayDate.getDate() + (7 - todayDate.getDay())); // Find the next Sunday
            let nextSundayFormatted =
              daysOfWeek[nextSunday.getDay()] + ' ' + nextSunday.getDate() + ' ' + monthsOfYear[nextSunday.getMonth()];
            theDateString = `${nextSundayFormatted}`;
          } else {
            theDateString = `${searchedCheckinFormatted} - ${searchedCheckoutFormatted}`;
          }

          if (searchedCheckinDate < todayDate) {
            var nextAvailDate = new Date(todayDate.getTime());
            nextAvailDate.setDate(todayDate.getDate() + ((7 + searchedCheckinDate.getDay() - todayDate.getDay()) % 7));

            let nextAvailDateFormatted =
              nextAvailDate.getDate() + '/' + (nextAvailDate.getMonth() + 1) + '/' + nextAvailDate.getFullYear();
            let lengthOfStay = (searchedCheckoutDate - searchedCheckinDate) / 1000 / 60 / 60 / 24;
            let nextAvailDateRangeEndDate = new Date(nextAvailDate);
            nextAvailDateRangeEndDate.setDate(nextAvailDate.getDate() + lengthOfStay);
            let nextAvailDateFinalFormatted =
              nextAvailDateRangeEndDate.getDate() +
              '/' +
              (nextAvailDateRangeEndDate.getMonth() + 1) +
              '/' +
              nextAvailDateRangeEndDate.getFullYear();
            let newURLString = item.fullStringURL;
            newURLString = item.fullStringURL
              .replace(item.checkIn, nextAvailDateFormatted)
              .replace(item.checkOut, nextAvailDateFinalFormatted);

            let nextAvailDateDisplayFormatted =
              daysOfWeek[nextAvailDate.getDay()] +
              ' ' +
              nextAvailDate.getDate() +
              ' ' +
              monthsOfYear[nextAvailDate.getMonth()];
            let nextAvailDateFinalDisplayFormatted =
              daysOfWeek[nextAvailDateRangeEndDate.getDay()] +
              ' ' +
              nextAvailDateRangeEndDate.getDate() +
              ' ' +
              monthsOfYear[nextAvailDateRangeEndDate.getMonth()];


            //  console.log('NEWWW item.checkOut: ', item.checkOut);
            if (areDatesEqualOrOneDayApart(item.checkIn, item.checkOut)) {
              // theDateString = `No Dates Selected`;
              let nextSunday = new Date(todayDate.getTime());
              nextSunday.setDate(todayDate.getDate() + (7 - todayDate.getDay())); // Find the next Sunday
              let nextSundayFormatted =
                daysOfWeek[nextSunday.getDay()] + ' ' + nextSunday.getDate() + ' ' + monthsOfYear[nextSunday.getMonth()];
              theDateString = `${nextSundayFormatted}`;
            } else {
              theDateString = `${nextAvailDateDisplayFormatted} - ${nextAvailDateFinalDisplayFormatted}`;
            }

            theHTMLString = `
               <a href="${newURLString}" class="${ID}-recently-viewed--containeritem">
                  <p class="">Recently viewed</p>
                 <img src="https://media.travelodge.co.uk/image/upload/ecrm/hotels-digi/${item.id}.jpg">
                 <p>${theDateString}</p>
               </a>
             `;
          } else {
            //new code..........
            if (areDatesEqualOrOneDayApart(item.checkIn, item.checkOut)) {
              // theDateString = `No Dates Selected`;
              let nextSunday = new Date(todayDate.getTime());
              nextSunday.setDate(todayDate.getDate() + (7 - todayDate.getDay())); // Find the next Sunday
              let nextSundayFormatted =
                daysOfWeek[nextSunday.getDay()] + ' ' + nextSunday.getDate() + ' ' + monthsOfYear[nextSunday.getMonth()];
              //date display formatted
              const checkInDateDisplayFormatted = formatDate(item.checkIn);

              theDateString = `${checkInDateDisplayFormatted}`;
            }

            theHTMLString = `
               <a href="${item.fullStringURL}" class="${ID}-recently-viewed--containeritem">
                  <p class="">Recently viewed</p>
                 <img src="https://media.travelodge.co.uk/image/upload/ecrm/hotels-digi/${item.id}.jpg">
                 <p>${theDateString}</p>
               </a>
             `;
          }

          return theHTMLString;
        })
        .join('')}
         </div>
       </div>
 
     </div>
   
   `;

    let insertionPoint = document.querySelector('.form-inline-sss');

    insertionPoint.insertAdjacentHTML('beforeend', newSectionHTML);

    fireEvent(`Visible - recently viewed hotels container added to the page`);

    let closeBtn = document.querySelector(`.${ID}-close`);
    closeBtn.addEventListener('click', () => {
      let recentlyViewed = document.querySelector(`.${ID}-recently-viewed`);
      recentlyViewed?.remove();
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
};

const moveBanner = () => {
  let banner = document.querySelector('.espot-container.hero-image');

  let modalSearch = document.getElementById('modalSearch');

  if (banner && modalSearch) {
    modalSearch.insertAdjacentElement('afterend', banner);
    banner.classList.add(`${ID}-banner`);
  }
};

export default () => {
  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');


  if (
    document.body.classList.contains('pgHome') &&
    localStorage.getItem(`${ID}-recently-viewed`) &&
    JSON.parse(localStorage.getItem(`${ID}-recently-viewed`)).length > 0
  ) {
    fireEvent(
      `Visible - recently viewed hotels container would be displayed, number recently viewed: ${JSON.parse(localStorage.getItem(`${ID}-recently-viewed`)).length
      }`
    );
  } else if (document.body.classList.contains('pgHome') && !localStorage.getItem(`${ID}-recently-viewed`)) {
    fireEvent(`Visible - recently viewed hotels container would not be displayed`);
  }

  if (window.location.href.indexOf('/hotels') > -1 && getCookie(`${ID}-recview-stoptracking`) !== true) {
    trackHotels();
  } else if (
    document.body.classList.contains('pgHome') &&
    localStorage.getItem(`${ID}-recently-viewed`) &&
    JSON.parse(localStorage.getItem(`${ID}-recently-viewed`)).length > 0 &&
    VARIATION !== 'control' &&
    !document.querySelector(`.${ID}-recently-viewed`)
  ) {
    pollerLite(['.form-inline-sss'], () => {
      startExperiment();
    });
  }

  if (document.body.classList.contains('pgHome') && VARIATION !== 'control') {
    pollerLite(['.espot-container.hero-image', '#modalSearch'], () => {
      // moveBanner();
    });
  }
};
