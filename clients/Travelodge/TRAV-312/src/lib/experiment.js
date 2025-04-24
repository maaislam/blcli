/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';
import { dataString } from './data';

let hotelsUsed = [];
let placesUsed = [];
let placesOfInterestUsed = [];
let dataComplete = false;
let insertPoint, insertAction, insertPage;
let currCheckinDate, currCheckoutDate, currCheckinDateFormatted, currCheckoutDateFormatted;
let daysArray = [];

let debug = true;

const { ID, VARIATION } = shared;

const processDataString = (dataString) => {
  let origContent = decodeURIComponent(dataString);
  origContent = origContent.replace(' PLACESOFINTEREST */', '');
  origContent = origContent.replace(' HOTELS */', '');
  origContent = origContent.replace(' PLACES */', '');
  origContent = origContent.split('/*');

  let hotelsContent = origContent[1];
  hotelsContent = hotelsContent.replace('//', '');
  hotelsContent = hotelsContent.replace(';', '');
  hotelsContent = hotelsContent.trim();
  hotelsUsed = JSON.parse(hotelsContent);

  let placesContent = origContent[2];
  placesContent = placesContent.replace('//', '');
  placesContent = placesContent.replace(';', '');
  placesContent = placesContent.trim();
  placesUsed = JSON.parse(placesContent);

  let placesOfInterestContent = origContent[3];
  placesOfInterestContent = placesOfInterestContent.replace('//', '');
  placesOfInterestContent = placesOfInterestContent.replace(';', '');
  placesOfInterestContent = placesOfInterestContent.trim();
  placesOfInterestUsed = JSON.parse(placesOfInterestContent);

  dataComplete = true;
};

const startExperiment = () => {
  if (debug == false) {
    let url = 'https://media.travelodge.co.uk/raw/upload/Testing/TRAV-312-data.txt';
    let storedText = '';
    fetch(url).then(function (response) {
      response.text().then(function (text) {
        storedText = text;

        processDataString(storedText);
      });
    });
  } else {
    processDataString(dataString);
  }

  insertPoint = '.pgHome #main form.formSearchWidget';
  insertAction = 'beforebegin';
  insertPage = 'home';

  if (window.location.href.indexOf('/search/results') > -1) {
    insertPoint = 'main';
    insertAction = 'beforebegin';
    insertPage = 'search';

    document.querySelector('.search-form').classList.add(`${ID}-hidden`);
    document.documentElement.classList.add(`${ID}-search-page`);
  }

  if (window.location.href.indexOf('/hotels/') > -1) {
    insertPoint = '.miniSearch';
    insertAction = 'beforebegin';
    insertPage = 'hdp';

    document.querySelector('.miniSearch').classList.add(`${ID}-hidden`);
    document.documentElement.classList.add(`${ID}-hdp-page`);
  }

  pollerLite([insertPoint], () => {
    document.documentElement.classList.add(`${ID}-experiment-begins`);

    let roomSelectorHTML = `
    
      <div class="${ID}-search--room">
        <h3>Room 1</h3>
        <div class="${ID}-search--room--adults">
          <h4>Adults</h4>
          <div class="${ID}-search--selector">
            <button class="${ID}-search--selector--minus"></button>
            <span class="${ID}-search--selector--value ${ID}-search--selector--adults">1</span>
            <button class="${ID}-search--selector--plus"></button>
          </div>
        </div>
        <div class="${ID}-search--room--children">
          <h4>Children</h4>
          <div class="${ID}-search--selector">
            <button class="${ID}-search--selector--minus"></button>
            <span class="${ID}-search--selector--value ${ID}-search--selector--children">0</span>
            <button class="${ID}-search--selector--plus"></button>
          </div>
        </div>
        <div class="${ID}-search--room--accessible">
          <input type="checkbox" class="${ID}-accessible-selector" />
          <label for="${ID}-accessible-selector"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6Z" fill="#464646"/><path d="M19.0002 13V11C17.4602 11.02 15.9102 10.25 14.9302 9.17004L13.6402 7.74004C13.4702 7.55004 13.2602 7.40004 13.0302 7.29004C13.0202 7.29004 13.0202 7.28004 13.0102 7.28004H13.0002C12.6502 7.08004 12.2502 6.98004 11.8102 7.02004C10.7602 7.11004 10.0002 8.04004 10.0002 9.09004V15C10.0002 16.1 10.9002 17 12.0002 17H17.0002V22H19.0002V16.5C19.0002 15.4 18.1002 14.5 17.0002 14.5H14.0002V11.05C15.2902 12.12 17.2502 12.99 19.0002 13ZM12.8302 18C12.4202 19.16 11.3102 20 10.0002 20C8.34018 20 7.00018 18.66 7.00018 17C7.00018 15.69 7.84018 14.59 9.00018 14.17V12.1C8.11527 12.2809 7.29588 12.6981 6.62905 13.3073C5.96222 13.9165 5.47286 14.6949 5.21296 15.56C4.95305 16.425 4.9323 17.3442 5.15291 18.2201C5.37353 19.0959 5.82727 19.8956 6.46593 20.5343C7.10459 21.173 7.90433 21.6267 8.78017 21.8473C9.65602 22.0679 10.5753 22.0472 11.4403 21.7873C12.3053 21.5274 13.0837 21.038 13.6929 20.3712C14.3021 19.7043 14.7193 18.885 14.9002 18H12.8302Z" fill="#464646"/></svg>Accessible room</label>
        </div>
      </div>
    
    `;

    if (insertPage == 'search' || insertPage == 'hdp') {
      let urlParams = new URLSearchParams(window.location.search);
      let roomObject = [];

      urlParams.forEach((value, key) => {
        if (key.indexOf('rooms') > -1) {
          roomObject.push({ value: value, key: key });
        }
      });

      let numRooms = roomObject.length / 3;
      let theRoomsObject = [];

      for (let i = 0; i < numRooms; i++) {
        let adults = roomObject.find((obj) => obj.key == `rooms[${i}][adults]`).value;
        let children = roomObject.find((obj) => obj.key == `rooms[${i}][children]`).value;
        //BUG FIX - ISSUE - 5 - Accessible room checkbox not working

        let accessible = false;
        if (roomObject.find((obj) => obj.key == `rooms[${i}][accessible]`)) {
          accessible = Number(roomObject.find((obj) => obj.key == `rooms[${i}][accessible]`)?.value) ? true : false;
        }
        // let accessible = roomObject.find((obj) => obj.key == `rooms[${i}][accessible]`) ? true : false;

        let theRoomObject = { roomNumber: i, adults: adults, children: children, accessible: accessible };

        theRoomsObject.push(theRoomObject);
      }

      roomSelectorHTML = ``;

      // BUG FIX - ISSUE - 4 
      for (let i = 0; i < theRoomsObject.length; i++) {
        roomSelectorHTML += roomSelectorHTML = `
          <div class="${ID}-search--room">
            <h3>Room ${i + 1} ${i > 0 ? `<a href="#" class="${ID}-remove-room">(Remove)</a>` : ''} </h3>
            <div class="${ID}-search--room--adults">
              <h4>Adults</h4>
              <div class="${ID}-search--selector">
                <button class="${ID}-search--selector--minus"></button>
                <span class="${ID}-search--selector--value ${ID}-search--selector--adults">${theRoomsObject[i].adults}</span>
                <button class="${ID}-search--selector--plus"></button>
              </div>
            </div>
            <div class="${ID}-search--room--children">
              <h4>Children</h4>
              <div class="${ID}-search--selector">
                <button class="${ID}-search--selector--minus"></button>
                <span class="${ID}-search--selector--value ${ID}-search--selector--children">${theRoomsObject[i].children}</span>
                <button class="${ID}-search--selector--plus"></button>
              </div>
            </div>
            <div class="${ID}-search--room--accessible">
              <input type="checkbox" class="${ID}-accessible-selector" ${theRoomsObject[i].accessible ? 'checked' : ''}/>
              <label for="${ID}-accessible-selector"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6Z" fill="#464646"/><path d="M19.0002 13V11C17.4602 11.02 15.9102 10.25 14.9302 9.17004L13.6402 7.74004C13.4702 7.55004 13.2602 7.40004 13.0302 7.29004C13.0202 7.29004 13.0202 7.28004 13.0102 7.28004H13.0002C12.6502 7.08004 12.2502 6.98004 11.8102 7.02004C10.7602 7.11004 10.0002 8.04004 10.0002 9.09004V15C10.0002 16.1 10.9002 17 12.0002 17H17.0002V22H19.0002V16.5C19.0002 15.4 18.1002 14.5 17.0002 14.5H14.0002V11.05C15.2902 12.12 17.2502 12.99 19.0002 13ZM12.8302 18C12.4202 19.16 11.3102 20 10.0002 20C8.34018 20 7.00018 18.66 7.00018 17C7.00018 15.69 7.84018 14.59 9.00018 14.17V12.1C8.11527 12.2809 7.29588 12.6981 6.62905 13.3073C5.96222 13.9165 5.47286 14.6949 5.21296 15.56C4.95305 16.425 4.9323 17.3442 5.15291 18.2201C5.37353 19.0959 5.82727 19.8956 6.46593 20.5343C7.10459 21.173 7.90433 21.6267 8.78017 21.8473C9.65602 22.0679 10.5753 22.0472 11.4403 21.7873C12.3053 21.5274 13.0837 21.038 13.6929 20.3712C14.3021 19.7043 14.7193 18.885 14.9002 18H12.8302Z" fill="#464646"/></svg>Accessible room</label>
            </div>
          </div>
        `;
      }
    }

    let location, checkIn, formattedCheckIn, checkOut, formattedCheckOut, rooms;

    const formatDateString = (dateString) => {
      let [day, month, year] = dateString.trim().split('/').map(Number);

      // Adjust the year if necessary
      if (year < 100) {
        year += 2000;
      }

      // Construct the new date string in the desired format
      return `${day}/${month}/${year}`;
    }

    if (insertPage == 'search') {
      location = document.getElementById('location').value;
      checkIn = document.getElementById('checkIn').getAttribute('data-value');
      checkOut = document.getElementById('checkOut').getAttribute('data-value');
      rooms = document.getElementById('rooms-display').value;

      //rooms = `${numAdults} adult${numAdults > 1 ? 's' : ''}, ${numRooms} room${numRooms > 1 ? 's' : ''}`;

      formattedCheckIn = formatDateString(checkIn);
      formattedCheckOut = formatDateString(checkOut);

    } else if (insertPage == 'hdp') {
      location = document.querySelector('.searchWidget input[name="location"]').value;
      checkIn = document.querySelector('.searchWidget input[name="checkIn"]').value;
      checkOut = document.querySelector('.searchWidget input[name="checkOut"]').value;

      formattedCheckIn = formatDateString(checkIn);
      formattedCheckOut = formatDateString(checkOut);

      let numRooms = document.getElementById('mRoom').value;
      let numPeople = document.getElementById('mGuest').value;
      //const urlParams = new URLSearchParams(window.location.search);
      //const numAdults = urlParams.get('rooms[0][adults]');

      // const urlSearchParams = new URLSearchParams(window.location.search);
      // const numAdults = urlSearchParams.get('rooms[0][adults]');

      rooms = `${numPeople} adult${numPeople > 1 ? 's' : ''}, ${numRooms} room${numRooms > 1 ? 's' : ''}`;
      console.log('rooms: ', rooms);
    }

    let newSearchHTML = `
      <div class="${ID}-search-container">
        <div class="${ID}-search">
          <div class="${ID}-search--section ${ID}-search--location">
            <div class="${ID}-search--inputholder">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.10277 0.959961C5.57477 0.959961 3.52677 2.91892 3.52677 5.337C3.52677 5.337 3.14597 9.78751 8.10277 15.04C8.10277 15.04 12.6788 11.5383 12.6788 5.337C12.6788 2.91892 10.6308 0.959961 8.10277 0.959961Z" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.10291 5.70136C8.52353 5.70136 8.86451 5.3752 8.86451 4.97287C8.86451 4.57054 8.52353 4.24438 8.10291 4.24438C7.68229 4.24438 7.34131 4.57054 7.34131 4.97287C7.34131 5.3752 7.68229 5.70136 8.10291 5.70136Z" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/></svg>
              ${insertPage == 'search' || insertPage == 'hdp'
        ? `<input autocomplete="off" type="text" id="${ID}-location" class="${ID}-search--input" placeholder="Search a place, postcode or hotel" value="${location}" />`
        : `<input autocomplete="off" type="text" id="${ID}-location" class="${ID}-search--input" placeholder="Search a place, postcode or hotel" />`
      }
            </div>
            <div class="${ID}-search--suggestions">
              <div class="${ID}-search--suggestion ${ID}-search--suggestion--places">
                <div class="${ID}-search--suggestion--header">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.10277 0.959961C5.57477 0.959961 3.52677 2.91892 3.52677 5.337C3.52677 5.337 3.14597 9.78751 8.10277 15.04C8.10277 15.04 12.6788 11.5383 12.6788 5.337C12.6788 2.91892 10.6308 0.959961 8.10277 0.959961Z" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.10291 5.70136C8.52353 5.70136 8.86451 5.3752 8.86451 4.97287C8.86451 4.57054 8.52353 4.24438 8.10291 4.24438C7.68229 4.24438 7.34131 4.57054 7.34131 4.97287C7.34131 5.3752 7.68229 5.70136 8.10291 5.70136Z" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <h3>Places</h3>
                </div>
                <div class="${ID}-search--suggestion--list ${ID}-search--suggestion--places--list">
                </div>
                <div class="${ID}-search--suggestion--noresults">
                  <p>No results found</p>
                </div>
              </div>

              <div class="${ID}-search--suggestion ${ID}-search--suggestion--placesofinterest">
                <div class="${ID}-search--suggestion--header">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.2664 11.8767L0.640137 14.3997V3.80285L5.2664 1.27979M5.2664 11.8767V1.27979M5.2664 11.8767L10.7338 14.3997M5.2664 1.27979L10.7338 3.80285M10.7338 3.80285L15.3601 1.27979V11.8767L10.7338 14.3997M10.7338 3.80285V14.3997" stroke="#464646" stroke-width="1.27999" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <h3>Places of Interest</h3>
                </div>
                <div class="${ID}-search--suggestion--list ${ID}-search--suggestion--placesofinterest--list">
                  
                </div>
                <div class="${ID}-search--suggestion--noresults">
                  <p>No results found</p>
                </div>
              </div>

              <div class="${ID}-search--suggestion ${ID}-search--suggestion--hotels">
                <div class="${ID}-search--suggestion--header">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="15.9999" height="15.9999" fill="white"/><rect x="5.12012" y="5.12012" width="1.91999" height="1.91999" stroke="#464646" stroke-width="1.27999" stroke-linecap="round" stroke-linejoin="round"/><rect x="5.12012" y="9.27979" width="1.91999" height="1.91999" stroke="#464646" stroke-width="1.27999" stroke-linecap="round" stroke-linejoin="round"/><rect x="9.27979" y="5.12012" width="1.91999" height="1.91999" stroke="#464646" stroke-width="1.27999" stroke-linecap="round" stroke-linejoin="round"/><rect x="9.27979" y="9.27979" width="1.91999" height="1.91999" stroke="#464646" stroke-width="1.27999" stroke-linecap="round" stroke-linejoin="round"/><rect x="6.08008" y="13.4399" width="3.83998" height="1.91999" stroke="#464646" stroke-width="1.27999" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.87988 4.15994L13.1198 0.959961V15.3599H2.87988V4.15994Z" stroke="#464646" stroke-width="1.27999" stroke-linecap="round" stroke-linejoin="round"/></svg>                  
                  <h3>Hotels</h3>
                </div>
                <div class="${ID}-search--suggestion--list ${ID}-search--suggestion--hotels--list">
                  
                </div>
                <div class="${ID}-search--suggestion--noresults">
                  <p>No results found</p>
                </div>
              </div>
            </div>
          </div>

          <div class="${ID}-search--section ${ID}-search--checkinout">
            ${window.outerWidth < 767 ? `<div class="${ID}-search--inputdateholders">` : ``}
              <div class="${ID}-search--inputholder ${ID}-search--checkin">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.3601 2.37427H0.640137V15.3631H15.3601V2.37427Z" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.3601 2.37427H0.640137V7.57107H15.3601V2.37427Z" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.05713 0.639893V4.96949" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.00195 0.639893V4.96949" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.9429 0.639893V4.96949" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/></svg>
                ${insertPage == 'search' || insertPage == 'hdp'
        ? `<input autocomplete="off" type="text" id="${ID}-checkin" class="${ID}-search--input" placeholder="Check in" value="${formattedCheckIn}" />`
        : `<input autocomplete="off" type="text" id="${ID}-checkin" class="${ID}-search--input" placeholder="Check in" />`
      }
              </div>
              
              <div class="${ID}-search--inputholder ${ID}-search--checkout">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.3601 2.37427H0.640137V15.3631H15.3601V2.37427Z" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.3601 2.37427H0.640137V7.57107H15.3601V2.37427Z" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.05713 0.639893V4.96949" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.00195 0.639893V4.96949" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.9429 0.639893V4.96949" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/></svg>
                ${insertPage == 'search' || insertPage == 'hdp'
        ? `<input autocomplete="off" type="text" id="${ID}-checkout" class="${ID}-search--input" placeholder="Check out" value="${formattedCheckOut}" />`
        : `<input autocomplete="off" type="text" id="${ID}-checkout" class="${ID}-search--input" placeholder="Check out" />`
      }
              </div>
            ${window.outerWidth < 767 ? `</div>` : ``}
            <div class="${ID}-dateholder">
            
              <div class="${ID}-date">
              
                <div class="${ID}-date--buttons ${ID}-checkinstate">
                  <button class="${ID}-date--button ${ID}-date--button--today"> Today </button>
                  <button class="${ID}-date--button ${ID}-date--button--tomorrow"> Tomorrow </button>  

                  <button class="${ID}-date--button ${ID}-date--button--nights" data-nights="1"> 1 night </button>
                  <button class="${ID}-date--button ${ID}-date--button--nights" data-nights="2"> 2 nights </button>
                  <button class="${ID}-date--button ${ID}-date--button--nights" data-nights="3"> 3 nights </button>
                </div>

                <div class="${ID}-date--calendar">
                  <div class="${ID}-date--calendar--header">
                    <p class="${ID}-current-date"></p>
                    <span id="prev" class="${ID}-disabled ${ID}-prev-month material-symbols-rounded"><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.79998 16.36L12.48 8.83998L4.79998 1.31998" stroke="#464646" stroke-width="2.60465" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                    <span id="next" class="${ID}-next-month material-symbols-rounded"><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.79998 16.36L12.48 8.83998L4.79998 1.31998" stroke="#464646" stroke-width="2.60465" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                   
                  </div>
                  <div class="${ID}-date--calendar--holder">
                    <ul class="weeks">
                      <li>Mon</li>
                      <li>Tue</li>
                      <li>Wed</li>
                      <li>Thu</li>
                      <li>Fri</li>
                      <li>Sat</li>
                      <li>Sun</li>
                    </ul>
                    <ul class="days"></ul>
                  </div>
                  <div class="${ID}-date--calendar--footer">
                    <button class="${ID}-date--calendar--footer--reset">Reset</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="${ID}-search--section ${ID}-search--roomspeople">
            <div class="${ID}-search--inputholder">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.640137 9.08347V11.9509H15.3601V9.08347C15.3601 9.08347 14.3322 6.76538 8.00014 6.76538C5.14868 6.76538 3.37307 7.23493 2.28127 7.75234C0.95013 8.38371 0.640137 9.08347 0.640137 9.08347Z" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.18115 7.75007V5.06729C2.18115 5.06729 3.55104 3.02728 8.00031 2.88368C11.4239 2.77427 13.4776 5.06729 13.4776 5.06729V7.6475" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.41943 7.07551C4.41943 7.07551 6.17908 3.63598 7.97748 6.77008" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.4262 7.07551C11.4262 7.07551 9.77594 3.63598 7.97754 6.77008" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.79639 11.9738V13.3163L4.00216 11.9487" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.6005 11.9738V13.3163L12.397 11.9487" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/></svg>
              ${insertPage == 'search' || insertPage == 'hdp'
        ? `<input autocomplete="off" type="text" id="${ID}-roomspeople" class="${ID}-search--input" placeholder="${rooms}" />`
        : `<input autocomplete="off" type="text" id="${ID}-roomspeople" class="${ID}-search--input" placeholder="1 adult, 1 room" />`
      }
            </div>

            <div class="${ID}-search--roomselector">
              ${roomSelectorHTML}
              <button class="${ID}-search--addanotherroom">Add another room?</button>
            </div>

            <div class="${ID}-search--buttonholder">
              <button id="${ID}-main-search-button" class="${ID}-search--button"> Search </button>
              ${window.outerWidth < 767 ? `<button class="${ID}-close--button"> Close </button>` : ``} 
            </div>
          </div>
        </div> 
      </div>
    `;

    if (window.outerWidth < 767) {
      let insertionPoint = document.documentElement;
      insertionPoint.insertAdjacentHTML('beforeend', `<div class="${ID}-mobilesearch">${newSearchHTML}</div>`);

      let buttonHTML = `<div class="${ID}-search-container ${ID}-search-container--mobile">
      
        <div class="${ID}-search ${ID}-search--mobile">
          <div class="${ID}-search--section ${ID}-search--location">
            <div class="${ID}-search--inputholder">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.10277 0.959961C5.57477 0.959961 3.52677 2.91892 3.52677 5.337C3.52677 5.337 3.14597 9.78751 8.10277 15.04C8.10277 15.04 12.6788 11.5383 12.6788 5.337C12.6788 2.91892 10.6308 0.959961 8.10277 0.959961Z" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.10291 5.70136C8.52353 5.70136 8.86451 5.3752 8.86451 4.97287C8.86451 4.57054 8.52353 4.24438 8.10291 4.24438C7.68229 4.24438 7.34131 4.57054 7.34131 4.97287C7.34131 5.3752 7.68229 5.70136 8.10291 5.70136Z" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/></svg>
              ${insertPage == 'search' || insertPage == 'hdp'
          ? `<input autocomplete="off" type="text" id="${ID}-location-mobile" class="${ID}-search--input" placeholder="Search a place, postcode or hotel" value="${location}" />`
          : `<input autocomplete="off" type="text" id="${ID}-location-mobile" class="${ID}-search--input" placeholder="Search a place, postcode or hotel" />`
        }
            </div>
          </div>

          <div class="${ID}-search--section ${ID}-search--checkinout ${ID}-search--checkinout--mobile">
            <div class="${ID}-search--inputholder ${ID}-search--checkin">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.3601 2.37427H0.640137V15.3631H15.3601V2.37427Z" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.3601 2.37427H0.640137V7.57107H15.3601V2.37427Z" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.05713 0.639893V4.96949" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.00195 0.639893V4.96949" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.9429 0.639893V4.96949" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/></svg>
              ${insertPage == 'search' || insertPage == 'hdp'
          ? `<input autocomplete="off" type="text" id="${ID}-checkin-mobile" class="${ID}-search--input" placeholder="Today | Tomorrow" value="${checkIn} - ${checkOut}" />`
          : `<input autocomplete="off" type="text" id="${ID}-checkin-mobile" class="${ID}-search--input" placeholder="Today | Tomorrow" />`
        }
            </div>  

            <div class="${ID}-search--inputholder ${ID}-search--roomspeople">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.640137 9.08347V11.9509H15.3601V9.08347C15.3601 9.08347 14.3322 6.76538 8.00014 6.76538C5.14868 6.76538 3.37307 7.23493 2.28127 7.75234C0.95013 8.38371 0.640137 9.08347 0.640137 9.08347Z" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.18115 7.75007V5.06729C2.18115 5.06729 3.55104 3.02728 8.00031 2.88368C11.4239 2.77427 13.4776 5.06729 13.4776 5.06729V7.6475" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.41943 7.07551C4.41943 7.07551 6.17908 3.63598 7.97748 6.77008" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.4262 7.07551C11.4262 7.07551 9.77594 3.63598 7.97754 6.77008" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.79639 11.9738V13.3163L4.00216 11.9487" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.6005 11.9738V13.3163L12.397 11.9487" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/></svg>
              ${insertPage == 'search' || insertPage == 'hdp'
          ? `<input autocomplete="off" type="text" id="${ID}-roomspeople-mobile" class="${ID}-search--input" placeholder="${rooms}" />`
          : `<input autocomplete="off" type="text" id="${ID}-roomspeople-mobile" class="${ID}-search--input" placeholder="1 adult, 1 room" />`
        }
            </div>

          </div>

          <div class="${ID}-search--section ${ID}-search--roomspeople">

            
            <div class="${ID}-search--buttonholder">
          
              <button class="${ID}-search--button ${outerWidth < 767 ? `${ID}-search--button--mobile` : ``}"> Search </button>
            
            </div>
          

          </div>

        </div>   
      
      </div>`;
      document.querySelector(insertPoint).insertAdjacentHTML('beforebegin', buttonHTML);

      document.querySelector(`.${ID}-mobilesearch`).classList.remove(`${ID}-active`);
    } else {
      let insertionPoint = document.querySelector(insertPoint);
      insertionPoint.insertAdjacentHTML(insertAction, newSearchHTML);
    }

    fireEvent(`Interaction - search bar has been updated on the ${insertPage} page`, true);

    let dataInterval = setInterval(() => {
      if (dataComplete == true) {
        clearInterval(dataInterval);
        document.getElementById(`${ID}-location`).removeAttribute('disabled');
      }
    }, 1);

    let inputLocation = document.getElementById(`${ID}-location`);
    inputLocation.addEventListener('keyup', (e) => {
      let value = e.target.value;
      let placesDiv = document.querySelector(`.${ID}-search--suggestion--places--list`);
      let placesOfInterestDiv = document.querySelector(`.${ID}-search--suggestion--placesofinterest--list`);
      let hotelsDiv = document.querySelector(`.${ID}-search--suggestion--hotels--list`);

      if (value.length >= 2) {
        document.querySelector(`.${ID}-search--location`).classList.add(`${ID}-active`);
        document.querySelector(`.${ID}-search--suggestions`).classList.add(`${ID}-active`);

        if (window.outerWidth < 767) {
          document.querySelector(`.${ID}-mobilesearch .${ID}-search`).classList.add(`${ID}-suggestions-active`);
        }

        let zeroPlacesDisplayed = true;
        let zeroPlacesOfInterestDisplayed = true;
        let zeroHotelsDisplayed = true;

        let placesLength = placesUsed.length;
        placesDiv.innerHTML = '';
        for (var i = 0; i < placesLength; i++) {
          if (placesUsed[i].toLowerCase().indexOf(value.toLowerCase()) > -1) {
            if (!document.getElementById(`place-${i}`) && placesDiv.children.length < 10) {
              let currPlace = placesUsed[i];
              let currVal = value;
              let highlightedText = highlight(currVal, currPlace);
              placesDiv.insertAdjacentHTML(
                'beforeend',
                `<button id="place-${i}" class="${ID}-active ${ID}-suggestion">${highlightedText}</button>`
              );
            }
            zeroPlacesDisplayed = false;
          }
        }

        let placesOfInterestLength = placesOfInterestUsed.length;
        placesOfInterestDiv.innerHTML = '';
        for (var j = 0; j < placesOfInterestLength; j++) {
          if (placesOfInterestUsed[j][0].toLowerCase().indexOf(value.toLowerCase()) > -1) {
            if (!document.getElementById(`poi-${j}`) && placesOfInterestDiv.children.length < 10) {
              let currPlace = placesOfInterestUsed[j][0];
              let currVal = value;
              let highlightedText = highlight(currVal, currPlace);
              placesOfInterestDiv.insertAdjacentHTML(
                'beforeend',
                `<button id="poi-${j}" class="${ID}-active ${ID}-suggestion" data-postcode="${placesOfInterestUsed[j][1]}">${highlightedText}</button>`
              );
            }
            zeroPlacesOfInterestDisplayed = false;
          }
        }

        let hotelsLength = hotelsUsed.length;
        hotelsDiv.innerHTML = '';
        for (var k = 0; k < hotelsLength; k++) {
          if (hotelsUsed[k].toLowerCase().indexOf(value.toLowerCase()) > -1) {
            if (!document.getElementById(`hotel-${k}`) && hotelsDiv.children.length < 10) {
              let currPlace = hotelsUsed[k];
              let currVal = value;
              let highlightedText = highlight(currVal, currPlace);
              hotelsDiv.insertAdjacentHTML(
                'beforeend',
                `<button id="hotel-${k}" class="${ID}-active ${ID}-suggestion">${highlightedText} Travelodge</button>`
              );
            }
            zeroHotelsDisplayed = false;
          }
        }

        if (zeroPlacesDisplayed == false) {
          document.querySelector(`.${ID}-search--suggestion--places`).classList.remove(`${ID}-noresults`);
        } else {
          document.querySelector(`.${ID}-search--suggestion--places`).classList.add(`${ID}-noresults`);
        }

        if (zeroPlacesOfInterestDisplayed == false) {
          document.querySelector(`.${ID}-search--suggestion--placesofinterest`).classList.remove(`${ID}-noresults`);
        } else {
          document.querySelector(`.${ID}-search--suggestion--placesofinterest`).classList.add(`${ID}-noresults`);
        }

        if (zeroHotelsDisplayed == false) {
          document.querySelector(`.${ID}-search--suggestion--hotels`).classList.remove(`${ID}-noresults`);
        } else {
          document.querySelector(`.${ID}-search--suggestion--hotels`).classList.add(`${ID}-noresults`);
        }
      } else {
        placesDiv.innerHTML = '';
        document.querySelector(`.${ID}-search--location`).classList.remove(`${ID}-active`);
        document.querySelector(`.${ID}-search--suggestions`).classList.remove(`${ID}-active`);

        if (window.outerWidth < 767) {
          document.querySelector(`.${ID}-mobilesearch .${ID}-search`).classList.remove(`${ID}-suggestions-active`);
        }
      }

      // if(value.length > 7) {

      //   var url = 'https://api.addressy.com/Capture/Interactive/Find/v1.10/json3.ws';

      //   var Key = 'PA67-AT42-ZE29-KD28';
      //   var Text = value;
      //   var IsMiddleware = true;
      //   var Container = '';
      //   var Origin = '';
      //   var Countries = 'GBR';
      //   var Limit = 10;
      //   var Language = 'en-gb';
      //   var Bias = '';
      //   var Filters = '';
      //   var GeoFence = '';

      //   var params = '';
      //   params += "?Key=" + encodeURIComponent(Key);
      //   params += "&Text=" + encodeURIComponent(Text);
      //   params += "&IsMiddleware=" + encodeURIComponent(IsMiddleware);
      //   params += "&Container=" + encodeURIComponent(Container);
      //   params += "&Origin=" + encodeURIComponent(Origin);
      //   params += "&Countries=" + encodeURIComponent(Countries);
      //   params += "&Limit=" + encodeURIComponent(Limit);
      //   params += "&Language=" + encodeURIComponent(Language);
      //   params += "&Bias=" + encodeURIComponent(Bias);
      //   params += "&Filters=" + encodeURIComponent(Filters);
      //   params += "&GeoFence=" + encodeURIComponent(GeoFence);

      //   fetch('https://api.addressy.com/Capture/Interactive/Find/v1.10/csv.ws'+params)
      //     .then(response => response.json())
      //     .then(data => console.log("THE DATA: ",data))
      //     .catch(error => console.error('Error ERROR:', error));

      // //   console.log(params);
      // //   var http = new XMLHttpRequest();
      // //   http.open('POST', url, true);
      // //   http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // //   http.onreadystatechange = function () {
      // //     console.log(http);
      // //     if (http.readyState == 4 && http.status == 200) {
      // //       var response = JSON.parse(http.responseText);
      // //       // Test for an error
      // //       if (response.Items.length == 1 && typeof (response.Items[0].Error) != "undefined") {
      // //         // Show the error message
      // //         console.error(response.Items[0].Description);
      // //       }
      // //       else {
      // //         // Check if there were any items found
      // //         if (response.Items.length == 0)
      // //           console.error("Sorry, there were no results");
      // //         else {
      // //           // PUT YOUR CODE HERE
      // //           //FYI: The output is an array of key value pairs (e.g. response.Items[0].Id), the keys being:
      // //           //Id
      // //           //Type
      // //           //Text
      // //           //Highlight
      // //           //Description

      // //           console.log(response.Items);

      // //         }
      // //       }
      // //     }
      // //   }
      // //   http.send(params);
      // //   console.log(http);
      // }
    });

    // EVENT LISTENERS

    document.documentElement.addEventListener('click', (e) => {
      // Click on

      if (e.target.closest(`#${ID}-location`) || e.target.id == `${ID}-location`) {
        addOverlay(`location`);
        document.getElementById(`${ID}-location`).closest(`.${ID}-search--inputholder`).classList.remove(`${ID}-error`);
      }

      if (
        e.target.closest(`.${ID}-search-container--mobile`) &&
        !e.target.closest(`.${ID}-search--button--mobile`) &&
        e.target.closest(`.${ID}-search--location`)
      ) {
        document.querySelector(`.${ID}-mobilesearch`).classList.add(`${ID}-active`);
        document.querySelector(`#${ID}-location`).focus();
        document.documentElement.classList.add(`${ID}-expactive`);
      }

      if (
        e.target.closest(`.${ID}-search-container--mobile`) &&
        !e.target.closest(`.${ID}-search--button--mobile`) &&
        e.target.closest(`.${ID}-search--roomspeople`)
      ) {
        document.querySelector(`.${ID}-mobilesearch`).classList.add(`${ID}-active`);
        document
          .querySelector(`.${ID}-mobilesearch`)
          .scrollTo(0, document.querySelector(`.${ID}-search--roomspeople`).offsetTop - 20);
        document.documentElement.classList.add(`${ID}-expactive`);
      }

      if (
        e.target.closest(`.${ID}-search-container--mobile`) &&
        !e.target.closest(`.${ID}-search--button--mobile`) &&
        e.target.closest(`.${ID}-search--checkin`)
      ) {
        document.querySelector(`.${ID}-mobilesearch`).classList.add(`${ID}-active`);
        document
          .querySelector(`.${ID}-mobilesearch`)
          .scrollTo(0, document.querySelector(`.${ID}-search--checkinout`).offsetTop - 20);
        document.documentElement.classList.add(`${ID}-expactive`);
      }

      if (e.target.closest(`.${ID}-search--button--mobile`) || e.target.classList.contains(`${ID}-search--button--mobile`)) {
        if (document.getElementById(`${ID}-location-mobile`).value == ``) {
          document.querySelector(`.${ID}-mobilesearch`).classList.add(`${ID}-active`);
          document.querySelector(`#${ID}-location`).focus();
        } else {
          document.getElementById(`${ID}-main-search-button`).click();
        }
      }

      if (e.target.closest(`.${ID}-close--button`)) {
        document.querySelector(`.${ID}-mobilesearch`).classList.remove(`${ID}-active`);
        document.documentElement.classList.remove(`${ID}-expactive`);

        fireEvent(`Interaction - search bar has been closed on mobile using the close button`, true);
      }

      if (
        e.target.closest(`.${ID}-search--suggestions`) &&
        (e.target.classList.contains(`${ID}-suggestion`) || e.target.closest(`.${ID}-suggestion`))
      ) {
        let innerText = e.target.closest(`.${ID}-suggestion`).innerText;
        let clickParent = e.target.closest(`.${ID}-suggestion`).id.split('-')[0];
        if (clickParent == 'hotel') {
          innerText = innerText + ' Travelodge';
        }

        let inputLocation = document.getElementById(`${ID}-location`);
        if (clickParent == 'poi') {
          inputLocation.setAttribute('data-postcode', e.target.getAttribute('data-postcode'));
        } else {
          inputLocation.removeAttribute('data-postcode');
        }
        inputLocation.value = innerText;
        if (window.outerWidth < 767) {
          document.getElementById(`${ID}-location-mobile`).value = innerText;
        }

        document.querySelector(`.${ID}-search--suggestions`).classList.remove(`${ID}-active`);

        if (window.outerWidth < 767) {
          document.querySelector(`.${ID}-mobilesearch .${ID}-search`).classList.remove(`${ID}-suggestions-active`);
        }
      }

      if (
        e.target.closest(`.${ID}-search--roomspeople`) &&
        !e.target.closest(`.${ID}-search--buttonholder`) &&
        !e.target.closest(`.${ID}-search--roomselector`)
      ) {
        addOverlay(`roomspeople`);
        checkAndUpdateInput();
      }

      if (e.target.closest(`.${ID}-search--selector--minus`)) {
        let currentRoomSelector = e.target.closest(`.${ID}-search--selector`);
        let personType = currentRoomSelector.previousElementSibling.innerText.toLowerCase();
        checkRoomLimits(e.target.closest(`.${ID}-search--room`), personType, 'minus');
      }

      if (e.target.closest(`.${ID}-search--selector--plus`)) {
        let currentRoomSelector = e.target.closest(`.${ID}-search--selector`);
        let personType = currentRoomSelector.previousElementSibling.innerText.toLowerCase();
        checkRoomLimits(e.target.closest(`.${ID}-search--room`), personType, 'plus');
      }

      if (e.target.classList.contains(`${ID}-search--addanotherroom`)) {
        let roomCount = document.querySelectorAll(`.${ID}-search--room`).length;
        let newRoom = roomSelectorHTML.replace(
          /Room 1/g,
          `Room ${roomCount + 1} <a href="#" class="${ID}-remove-room">(Remove)</a> `
        );

        document.querySelector(`.${ID}-search--addanotherroom`).insertAdjacentHTML('beforebegin', newRoom);
        checkAndUpdateInput();
      }

      if (e.target.classList.contains(`${ID}-remove-room`)) {
        e.target.closest(`.${ID}-search--room`).remove();
        let allRooms = document.querySelectorAll(`.${ID}-search--room`);

        allRooms.forEach((room, index) => {
          room.querySelector(`.${ID}-search--room h3`).innerHTML = `Room ${index + 1} ${index > 0 ? `<a href="#" class="${ID}-remove-room">(Remove)</a>` : ``
            }`;
        });
        fireEvent(`Interaction - room has been removed from the search bar`, true);
        checkAndUpdateInput();
      }

      if (e.target.id == `${ID}-checkin`) {
        addOverlay(`date`);
        document.querySelector(`.${ID}-dateholder`).classList.add(`${ID}-active`);

        if (insertPage == 'search' || insertPage == 'hdp') {
          //BUG FIXED - ISSUE-1
          //document.querySelector(`.${ID}-date--calendar--footer--reset`).click();
        }
      }

      if (e.target.closest(`.${ID}-expactive`) && !e.target.closest(`.${ID}-search-container`)) {
        removeOverlay();
      }

      if (e.target.closest(`.${ID}-search--buttonholder`) && e.target.classList.contains(`${ID}-search--button`)) {
        removeOverlay();

        document.getElementById(`${ID}-main-search-button`).innerHTML = `Searching...`;

        if (document.getElementById(`${ID}-location`).value == ``) {
          document.getElementById(`${ID}-location`).closest(`.${ID}-search--inputholder`).classList.add(`${ID}-error`);
          document.getElementById(`${ID}-main-search-button`).innerHTML = `Search`;

          if (window.outerWidth < 767) {
            document.querySelector(`.${ID}-mobilesearch`).scrollTo(0, 0);
          }
        } else {
          let location = document.getElementById(`${ID}-location`).value;
          if (document.getElementById(`${ID}-location`).getAttribute('data-postcode')) {
            location = document.getElementById(`${ID}-location`).getAttribute('data-postcode');
          }
          let checkin = document.getElementById(`${ID}-checkin`).value;
          let checkout = document.getElementById(`${ID}-checkout`).value;
          let roomspeople = document.getElementById(`${ID}-roomspeople`).value;

          if (checkin == '') {
            let date = new Date();
            if (date.getDay() != 0) {
              for (let i = 0; i < 7; i++) {
                date = new Date(date.setDate(date.getDate() + 1));
                if (date.getDay() == 0) {
                  break;
                }
              }
            }
            let dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            checkin = dateString;

            let checkoutDate = new Date(date.setDate(date.getDate() + 1));
            let checkoutDateString = `${checkoutDate.getDate()}/${checkoutDate.getMonth() + 1}/${checkoutDate.getFullYear()}`;
            checkout = checkoutDateString;
          }

          if (checkin !== '' && checkout == '') {
            let checkinDateString = checkin.split('/').reverse().join('/');
            let checkinDate = new Date(checkinDateString);

            let checkoutDate = new Date(checkinDate.setDate(checkinDate.getDate() + 1));
            let checkoutDateString = `${checkoutDate.getDate()}/${checkoutDate.getMonth() + 1}/${checkoutDate.getFullYear()}`;
            checkout = checkoutDateString;
          }

          // https://www.travelodge.co.uk/search/results?location=Aberdeen&lat=&long=&action=search&source=l&checkIn=26%2F02%2F24&checkOut=29%2F02%2F24&rooms%5B0%5D%5Badults%5D=1&rooms%5B0%5D%5Bchildren%5D=0&rooms%5B1%5D%5Badults%5D=1&rooms%5B1%5D%5Bchildren%5D=0&rooms%5B1%5D%5Baccessible%5D=1&sb=0

          roomspeople = ``;

          let allRooms = document.querySelectorAll(`.${ID}-search--room`);

          allRooms.forEach((room, index) => {
            let adults = room.querySelector(`.${ID}-search--selector--adults`).innerText;
            let children = room.querySelector(`.${ID}-search--selector--children`).innerText;
            let accessible = room.querySelector(`.${ID}-accessible-selector`).checked;

            roomspeople += `&rooms[${index}][adults]=${adults}&rooms[${index}][children]=${children}&rooms[${index}][accessible]=${accessible ? 1 : 0
              }`;
          });

          let redirectURL = `https://www.travelodge.co.uk/search/results?location=${location}&lat=&long=&action=search&source=l&checkIn=${checkin}&checkOut=${checkout}&${roomspeople}&sb=0`;
          redirectURL = encodeURI(redirectURL);

          fireEvent(`Interaction - search button has been clicked to take the user to ${redirectURL}`, true);

          window.location.href = redirectURL;

          setTimeout(() => {
            document.getElementById(`${ID}-main-search-button`).innerHTML = `Search`;
          }, 1000);
        }
      }
    });

    startCalendar();
  });
};

const checkRoomLimits = (roomObject, type, action) => {
  let adults = parseInt(roomObject.querySelector(`.${ID}-search--selector--adults`).innerText);
  let children = parseInt(roomObject.querySelector(`.${ID}-search--selector--children`).innerText);
  const plusBtn = roomObject.querySelector(`.${ID}-search--selector--plus`);
  if (action == 'plus') {
    if (type == 'adults' && adults < 3) {
      adults = adults + 1;
      if (adults == 3) {
        children = 0;
        //hide plus button
        plusBtn.style.visibility = 'hidden';
      }
    } else if (type == 'children') {
      if (adults <= 2 && children < 2) {
        children = children + 1;
      } else if (adults == 3 && children < 1) {
        children = children + 1;
      }
    }
  } else if (action == 'minus') {
    if (type == 'adults' && adults > 1) {
      adults = adults - 1;
      //show plus button
      plusBtn.style.visibility = 'visible';
    } else if (type == 'children' && children > 0) {
      children = children - 1;
    }
  }

  roomObject.querySelector(`.${ID}-search--selector--adults`).innerText = adults;
  roomObject.querySelector(`.${ID}-search--selector--children`).innerText = children;

  checkAndUpdateInput();
};

const addOverlay = (selector) => {
  document.documentElement.classList.add(`${ID}-expactive`);

  if (selector == 'date') {
    document.querySelector(`.${ID}-dateholder`).classList.add(`${ID}-active`);
    document.querySelector(`.${ID}-search--location`).classList.remove(`${ID}-active`);
    document.querySelector(`.${ID}-search--suggestions`).classList.remove(`${ID}-active`);
    document.querySelector(`.${ID}-search--roomspeople`).classList.remove(`${ID}-active`);
    fireEvent(`Interaction - datepicker has been opened`, true);
  } else if (selector == 'location') {
    document.querySelector(`.${ID}-search--location`).classList.add(`${ID}-active`);
    document.querySelector(`.${ID}-dateholder`).classList.remove(`${ID}-active`);
    document.querySelector(`.${ID}-search--roomspeople`).classList.remove(`${ID}-active`);
    fireEvent(`Interaction - location search has been opened`, true);
  } else if (selector == 'roomspeople') {
    document.querySelector(`.${ID}-search--roomspeople`).classList.add(`${ID}-active`);
    document.querySelector(`.${ID}-search--roomselector`).classList.add(`${ID}-active`);
    document.querySelector(`.${ID}-search--location`).classList.remove(`${ID}-active`);
    document.querySelector(`.${ID}-search--suggestions`).classList.remove(`${ID}-active`);
    document.querySelector(`.${ID}-dateholder`).classList.remove(`${ID}-active`);
    fireEvent(`Interaction - roomspeople search has been opened`, true);
  }
};

const removeOverlay = () => {
  if (window.outerWidth > 767) {
    document.documentElement.classList.remove(`${ID}-expactive`);
  }
  document.querySelector(`.${ID}-search--roomspeople`).classList.remove(`${ID}-active`);
  document.querySelector(`.${ID}-search--roomselector`).classList.remove(`${ID}-active`);
  document.querySelector(`.${ID}-search--location`).classList.remove(`${ID}-active`);
  document.querySelector(`.${ID}-search--suggestions`).classList.remove(`${ID}-active`);
  document.querySelector(`.${ID}-dateholder`).classList.remove(`${ID}-active`);

  fireEvent(`Interaction - search bar overlay has been closed`, true);
};

const checkAndUpdateInput = () => {
  let adultCount = 0;
  let childCount = 0;
  let roomCount = 0;

  document.querySelectorAll(`.${ID}-search--room`).forEach((room) => {
    let adults = parseInt(room.querySelector(`.${ID}-search--selector--adults`).innerText);
    let children = parseInt(room.querySelector(`.${ID}-search--selector--children`).innerText);
    adultCount += adults;
    childCount += children;
    roomCount++;
  });

  let roomspeople = document.getElementById(`${ID}-roomspeople`);
  let rpValue = `${adultCount} adult${adultCount > 1 ? 's' : ''}, ${roomCount} room${roomCount > 1 ? 's' : ''}`;
  roomspeople.value = rpValue;

  if (window.outerWidth < 767) {
    let roomspeopleMobile = document.getElementById(`${ID}-roomspeople-mobile`);
    roomspeopleMobile.value = rpValue;
  }
};

const confirmCurrentStay = () => {
  document.getElementById(`${ID}-checkout`).value = currCheckoutDateFormatted;
  document.querySelector(`.${ID}-dateholder`).classList.remove(`${ID}-active`);
  if (window.outerWidth > 767) {
    document.documentElement.classList.remove(`${ID}-expactive`);
  }

  if (window.outerWidth < 767) {
    document.getElementById(`${ID}-checkin-mobile`).value += ' | ' + currCheckoutDateFormatted;
  }

  fireEvent(`Interaction - user has selected and confirmed both dates`, true);
};

const startCalendar = () => {
  const daysTag = document.querySelector(`.${ID}-date--calendar--holder .days`),
    currentDate = document.querySelector(`.${ID}-current-date`),
    prevNextIcon = document.querySelectorAll(`.${ID}-date--calendar--header span`);
  // getting new date, current year and month
  let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();
  // storing full name of all months in array
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const addCurrentStay = () => {
    daysArray = [];

    let currCheckinDay = currCheckinDate.getDate();
    let currCheckinMonth = currCheckinDate.getMonth();
    let currCheckinYear = currCheckinDate.getFullYear();

    let numDaysCheckInMonth = new Date(currCheckinYear, currCheckinMonth + 1, 0).getDate();

    let currCheckoutDay = currCheckoutDate.getDate();
    let currCheckoutMonth = currCheckoutDate.getMonth();
    let currCheckoutYear = currCheckoutDate.getFullYear();

    let numDaysCheckoutMonth = new Date(currCheckoutYear, currCheckoutMonth + 1, 0).getDate();

    let allCurrDays = document.querySelectorAll(`.${ID}-date`);
    allCurrDays.forEach((day) => {
      day.classList.remove(`${ID}-active`);
    });

    if (currCheckinMonth == currCheckoutMonth) {
      for (let i = currCheckinDay; i <= currCheckoutDay; i++) {
        daysArray.push([i, currCheckinMonth]);
      }
    } else if (currCheckinMonth < currCheckoutMonth) {
      for (let i = currCheckinDay; i <= numDaysCheckInMonth; i++) {
        daysArray.push([i, currCheckinMonth]);
      }
      for (let j = 1; j <= currCheckoutDay; j++) {
        daysArray.push([j, currCheckoutMonth]);
      }
    }

    daysArray.forEach((day, index) => {
      if (day[1] === currMonth && index < 28) {
        document.querySelector(`.${ID}-date.${ID}-available[data-day="${day[0]}"]`).classList.add(`${ID}-active`);
      }
    });

    if (daysArray.length > 28) {
      document.querySelector(`.${ID}-date--calendar--holder`).classList.add(`${ID}-28dayslater`);
      setTimeout(() => {
        document.querySelector(`.${ID}-date--calendar--holder`).classList.remove(`${ID}-28dayslater`);
      }, 2000);
    } else {
      confirmCurrentStay();
    }
  };

  const renderCalendar = (renderCurrentMonth = false, activeMonth = currMonth) => {
    const isWithin350DaysFromToday = (futureDateStr) => {
      const today = new Date();
      const future = new Date(futureDateStr);

      // Calculate the difference in time
      const timeDiff = future - today;

      // Calculate the difference in days
      const dayDiff = timeDiff / (1000 * 3600 * 24);

      return dayDiff <= 350;
    };

    if (renderCurrentMonth) {
      currMonth = new Date().getMonth()
    } else if (activeMonth) {
      currMonth = activeMonth;
    }

    let todayDate = new Date();
    if (currMonth !== todayDate.getMonth()) {
      document.querySelector(`.${ID}-prev-month`).classList.remove(`${ID}-disabled`);
    }

    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay() - 1, // getting first day of month
      lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
      lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay() - 1, // getting last day of month
      lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month

    let liTag = '';
    for (let i = firstDayofMonth; i > 0; i--) {
      // creating li of previous month last days
      liTag += `<li data-day="${lastDateofLastMonth - i + 1}" data-month="${currMonth + 1}" class="${ID}-date ${ID}-inactive">${lastDateofLastMonth - i + 1
        }</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) {
      // creating li of all days of current month
      // adding active class to li if the current day, month, and year matched
      let isToday =
        i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? `${ID}-today` : '';
      //console.log('🚀 ~ renderCalendar ~ isToday:', date);
      let isBeforeToday =
        i < date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear()
          ? `${ID}-inactive`
          : ``;
      let isPrevMonth =
        currMonth < new Date().getMonth() && currYear === new Date().getFullYear() ? `${ID}-inactive` : `${ID}-available`;

      let isCurrentDayActive = false; //currCheckinDate && currCheckinDate.getDate() === i & currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? `${ID}-active` : "";

      let currDayIsActive = false;
      daysArray.filter((dayArray) => {
        if (dayArray[0] == i && dayArray[1] == currMonth) {
          currDayIsActive = true;
        }
      });

      if (currDayIsActive) {
        isCurrentDayActive = `${ID}-active`;
      } else {
        isCurrentDayActive = '';
      }

      const isWithin350Days = isWithin350DaysFromToday(`${currYear}-${currMonth + 1}-${i}`) ? '' : `${ID}-inactive`;

      //console.log('🚀 ~ renderCalendar ~ isWithin350Days:', isWithin350Days);
      liTag += `<li data-day="${i}" data-month="${currMonth + 1}" class="${ID}-date ${isToday} ${isWithin350Days}  ${isBeforeToday} ${isPrevMonth} ${isCurrentDayActive}">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 3; i++) {
      // creating li of next month first days
      liTag += `<li data-day="${i - lastDayofMonth + 1}" data-month="${currMonth + 1}" class="${ID}-date ${ID}-inactive">${i - lastDayofMonth + 1}</li>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
  };
  renderCalendar();

  if (insertPage == 'search' || insertPage == 'hdp') {
    let selectedCheckinDate = document.getElementById(`${ID}-checkin`).value;
    let selectedCheckoutDate = document.getElementById(`${ID}-checkout`).value;

    let scidArray = selectedCheckinDate.split('/');
    let scidDay = parseInt(scidArray[0]);
    let scidMonth = parseInt(scidArray[1]);
    let scidYear = scidArray[2];

    let scodArray = selectedCheckoutDate.split('/');
    let scodDay = parseInt(scodArray[0]);
    let scodMonth = parseInt(scodArray[1]);
    let scodYear = scodArray[2];

    selectedCheckinDate = new Date(`${scidYear}-${scidMonth}-${scidDay}`);
    selectedCheckoutDate = new Date(`${scodYear}-${scodMonth}-${scodDay}`);
    currCheckinDate = selectedCheckinDate;

    // let todayDate = new Date();

    renderCalendar(false, scidMonth - 1);

    setTimeout(() => {
      if (currCheckinDate !== '' && currCheckoutDate !== '') {
        document.querySelector(`.${ID}-date--buttons`).classList.remove(`${ID}-checkinstate`);
        document.querySelector(`.${ID}-date--buttons`).classList.add(`${ID}-checkoutstate`);

        document.querySelector(`.${ID}-date--calendar`).classList.remove(`${ID}-checkinstate`);
        document.querySelector(`.${ID}-date--calendar`).classList.add(`${ID}-checkoutstate`);

        let currentDate = new Date(scidYear, scidMonth - 1, scidDay);
        let endDate = new Date(scodYear, scodMonth - 1, scodDay);

        while (currentDate <= endDate) {
          let day = currentDate.getDate();
          let month = currentDate.getMonth() + 1;

          let dayElement = document.querySelector(`.${ID}-date.${ID}-available[data-day="${day}"][data-month="${month}"]`);
          if (dayElement) {
            dayElement.classList.add(`${ID}-active`);
          }

          currentDate.setDate(currentDate.getDate() + 1); // Move to the next day

          // Check if we need to adjust for the next month
          if (currentDate.getDate() === 1) {
            currentDate.setMonth(currentDate.getMonth() + 1);
          }
        }
      }
    }, 2000);
  }

  prevNextIcon.forEach((icon) => {
    // getting prev and next icons
    icon.addEventListener('click', () => {
      // adding click event on both icons
      // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
      currMonth = icon.id === 'prev' ? (currMonth - 1 < 0 ? 11 : currMonth - 1) : currMonth + 1 > 11 ? 0 : currMonth + 1;
      let counter = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;
      document.querySelector(`.${ID}-prev-month`).classList.remove(`${ID}-disabled`);
      document.querySelector(`.${ID}-next-month`).classList.remove(`${ID}-disabled`);
      //console.log('🚀 ~ icon.addEventListener ~ currMonth:', currMonth);

      if (currMonth == date.getMonth() && icon.id === 'prev' && currYear === new Date().getFullYear()) {
        document.querySelector(`.${ID}-prev-month`).classList.add(`${ID}-disabled`);
      }

      if (currMonth == date.getMonth() && icon.id === 'next' && currYear !== new Date().getFullYear()) {
        document.querySelector(`.${ID}-next-month`).classList.add(`${ID}-disabled`);
      }

      if (counter < 0 || counter > 11) {
        // if current month is less than 0 or greater than 11
        // creating a new date of current year & month and pass it as date value
        date = new Date(currYear, currMonth, new Date().getDate());
        currYear = counter < 0 ? date.getFullYear() - 1 : counter > 11 ? date.getFullYear() + 1 : date.getFullYear(); // updating current year with new date year
        currMonth = date.getMonth(); // updating current month with new date month
        counter = currMonth; // updating counter with current month
      } else {
        date = new Date(); // pass the current date as date value
      }
      renderCalendar(); // calling renderCalendar function

      // BUG FIX - Icon click next/prev month selected date is not highlighted
      if (insertPage == 'search' || insertPage == 'hdp') {
        let selectedCheckinDate = document.getElementById(`${ID}-checkin`).value;
        let selectedCheckoutDate = document.getElementById(`${ID}-checkout`).value;

        let scidArray = selectedCheckinDate.split('/');
        let scidDay = parseInt(scidArray[0]);
        let scidMonth = parseInt(scidArray[1]);
        let scidYear = scidArray[2];

        let scodArray = selectedCheckoutDate.split('/');
        let scodDay = parseInt(scodArray[0]);
        let scodMonth = parseInt(scodArray[1]);
        let scodYear = scodArray[2];

        selectedCheckinDate = new Date(`${scidYear}-${scidMonth}-${scidDay}`);
        selectedCheckoutDate = new Date(`${scodYear}-${scodMonth}-${scodDay}`);
        currCheckinDate = selectedCheckinDate;

        const firstDayFromCalendar = document.querySelector(`.${ID}-date[data-day="1"]`);
        const currentMonthFromCalendar = firstDayFromCalendar.dataset.month;

        const selectedCheckinMonth = selectedCheckinDate.getMonth() + 1;
        const selectedCheckoutMonth = selectedCheckoutDate.getMonth() + 1;
        const isWithinRange = selectedCheckinMonth == currentMonthFromCalendar || selectedCheckoutMonth == currentMonthFromCalendar;

        if (currCheckinDate !== '' && currCheckoutDate !== '' && isWithinRange) {
          document.querySelector(`.${ID}-date--buttons`).classList.remove(`${ID}-checkinstate`);
          document.querySelector(`.${ID}-date--buttons`).classList.add(`${ID}-checkoutstate`);

          document.querySelector(`.${ID}-date--calendar`).classList.remove(`${ID}-checkinstate`);
          document.querySelector(`.${ID}-date--calendar`).classList.add(`${ID}-checkoutstate`);

          let currentDate = new Date(scidYear, scidMonth - 1, scidDay);
          let endDate = new Date(scodYear, scodMonth - 1, scodDay);

          while (currentDate <= endDate) {
            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1;

            let dayElement = document.querySelector(`.${ID}-date.${ID}-available[data-day="${day}"][data-month="${month}"]`);
            if (dayElement) {
              dayElement.classList.add(`${ID}-active`);
            }

            currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
          }
        }
      }
    });
  });

  let dateState = 'checkin';

  document.documentElement.addEventListener('click', (e) => {
    if (e.target.classList.contains(`${ID}-available`) && e.target.closest(`.${ID}-dateholder`)) {
      if (dateState == 'checkin') {
        e.target.classList.add(`${ID}-active`);
        e.target.classList.add(`${ID}-date-start`);

        let currDateSelected = e.target.innerText + '/' + (currMonth + 1) + '/' + currYear;
        currCheckinDate = new Date(currMonth + 1 + '/' + e.target.innerText + '/' + currYear);
        currCheckinDateFormatted = currDateSelected;

        document.getElementById(`${ID}-checkin`).value = currDateSelected;

        if (window.outerWidth < 767) {
          document.getElementById(`${ID}-checkin-mobile`).value = currDateSelected;
        }

        document.querySelector(`.${ID}-date--buttons`).classList.remove(`${ID}-checkinstate`);
        document.querySelector(`.${ID}-date--buttons`).classList.add(`${ID}-checkoutstate`);
        document.querySelector(`.${ID}-date--calendar`).classList.add(`${ID}-checkoutstate`);
        dateState = 'checkout';

        fireEvent(`Interaction - user has selected the checkin date`, true);
      } else {
        if (document.getElementById(`${ID}-checkin`).value !== '') {
          let dateStartValue = document.getElementById(`${ID}-checkin`).value;

          dateStartValue = new Date(
            dateStartValue.split('/')[1] + '/' + dateStartValue.split('/')[0] + '/' + dateStartValue.split('/')[2]
          );
          let currDateSelected = e.target.innerText + '/' + (currMonth + 1) + '/' + currYear;
          currCheckoutDate = new Date(currMonth + 1 + '/' + e.target.innerText + '/' + currYear);
          currCheckoutDateFormatted = currDateSelected;

          if (currCheckoutDate > dateStartValue) {
            e.target.classList.add(`${ID}-active`);
            e.target.classList.add(`${ID}-date-end`);
            addCurrentStay();
          } else {
            e.target.classList.remove(`${ID}-active`);
            e.target.classList.remove(`${ID}-date-end`);
            document.querySelector(`.${ID}-date--calendar--holder`).classList.add(`${ID}-datebefore`);
            setTimeout(() => {
              document.querySelector(`.${ID}-date--calendar--holder`).classList.remove(`${ID}-datebefore`);
            }, 2000);
          }

          fireEvent(`Interaction - user has selected the checkout date`, true);
        }
      }
    }

    if (e.target.classList.contains(`${ID}-date--calendar--footer--reset`)) {
      document.getElementById(`${ID}-checkin`).value = '';
      document.getElementById(`${ID}-checkout`).value = '';
      document.querySelectorAll(`.${ID}-date--calendar--holder .${ID}-active`).forEach((day) => {
        day.classList.remove(`${ID}-active`);
      });
      document.querySelector(`.${ID}-date--buttons`).classList.add(`${ID}-checkinstate`);
      document.querySelector(`.${ID}-date--buttons`).classList.remove(`${ID}-checkoutstate`);
      document.querySelector(`.${ID}-date--calendar`).classList.remove(`${ID}-checkoutstate`);

      daysArray = [];

      dateState = 'checkin';

      fireEvent(`Interaction - user has reset the datepicker`, true);
    }

    if (e.target.classList.contains(`${ID}-date--button--today`)) {
      if (document.querySelector(`.${ID}-today`)) {
        document.querySelector(`.${ID}-today`).click();
      } else {
        // different month
        let date = new Date();
        currCheckinDate = date;
        renderCalendar(true);
        document.querySelector(`.${ID}-today`).click();
      }

      fireEvent(`Interaction - user has clicked on the today button`, true);
    }

    if (e.target.classList.contains(`${ID}-date--button--tomorrow`)) {
      renderCalendar(true);
      if (document.querySelector(`.${ID}-today`)) {
        document.querySelector(`.${ID}-today`).nextElementSibling.click();
      }

      fireEvent(`Interaction - user has clicked on the tomorrow button`, true);
    }

    // if (e.target.classList.contains(`${ID}-date--button--nights`)) {
    //   let numNights = e.target.getAttribute('data-nights');

    //   let currDateSelected = document.getElementById(`${ID}-checkin`).value;
    //   let numDaysInMonth = new Date(currYear, currMonth + 1, 0).getDate();
    //   let currDay = parseInt(currDateSelected.split('/')[0]);
    //   let theDay = '';
    //   if (numNights == 1) {
    //     theDay = currDay + 1;
    //   } else if (numNights == 2) {
    //     theDay = currDay + 2;
    //   } else if (numNights == 3) {
    //     theDay = currDay + 3;
    //   }

    //   fireEvent(`Interaction - user has clicked on the ${numNights} nights button`, true);

    //   if (theDay > numDaysInMonth) {
    //     let diff = numDaysInMonth - currDay;
    //     diff = diff + numNights;
    //     currCheckoutDate = new Date(currMonth + 2 + '/' + diff + '/' + currYear);
    //     currCheckoutDateFormatted = diff + '/' + (currMonth + 2) + '/' + currYear;
    //   } else {
    //     currCheckoutDate = new Date(currMonth + 1 + '/' + theDay + '/' + currYear);
    //     currCheckoutDateFormatted = theDay + '/' + (currMonth + 1) + '/' + currYear;
    //   }

    //   console.log('currCheckoutDateFormatted: ', currCheckoutDateFormatted);

    //   addCurrentStay();
    // }

    //BUG FIX - ISSUE - 2 & 3
    if (e.target.classList.contains(`${ID}-date--button--nights`)) {
      let numNights = parseInt(e.target.getAttribute('data-nights'));

      let currDateSelected = document.getElementById(`${ID}-checkin`).value;
      let [currDay, currMonth, currYear] = currDateSelected.split('/').map(Number);

      if (currYear < 100) {
        currYear += 2000;
      }
      let currDate = new Date(currYear, currMonth - 1, currDay);

      fireEvent(`Interaction - user has clicked on the ${numNights} nights button`, true);

      currCheckoutDate = new Date(currDate);

      currCheckoutDate.setDate(currDate.getDate() + numNights);

      let theDay = currCheckoutDate.getDate();
      let theMonth = currCheckoutDate.getMonth() + 1;
      let theYear = currCheckoutDate.getFullYear();

      currCheckoutDateFormatted = `${theDay}/${theMonth}/${theYear}`;

      // if (currMonth == theMonth) {
      //   addCurrentStay();
      // }
      addCurrentStay();
    }
  });
};

const highlight = (needle, haystack) => {
  let str = haystack.replace(new RegExp(needle, 'gi'), (str) => `<span>${str}</span>`);
  return str;
};

export default () => {
  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if (VARIATION == 'control') {
    document.body.addEventListener('click', (e) => {
      if (e.target.closest('.fieldCTA') && e.target.classList.contains('btnSubmitSearch')) {
        fireEvent('Click - user has clicked on the control search button', true);
      }

      if (e.target.closest('input[name="location"]')) {
        fireEvent('Click - user has clicked on the location input', true);
      }

      if (e.target.closest('input[name="checkIn"]')) {
        fireEvent('Click - user has clicked on the checkin input', true);
      }
    });

    let roomsPeople = document.querySelector('.roomGuestWrap');
    roomsPeople.addEventListener('click', () => {
      fireEvent('Click - user has clicked on the rooms and people input', true);
    });
  }

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();
};
