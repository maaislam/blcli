/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getCookie, logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  // console.log('startExperiment');

  const calendarSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
  <g id="Group">
  <path id="Vector" d="M15.3596 2.87427H0.639648V15.863H15.3596V2.87427Z" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
  <path id="Vector_2" d="M15.3596 2.87427H0.639648V8.07105H15.3596V2.87427Z" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
  <path id="Vector_3" d="M5.05688 1.13989V5.46948" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
  <path id="Vector_4" d="M8.00171 1.13989V5.46948" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
  <path id="Vector_5" d="M10.9426 1.13989V5.46948" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>
`;

  const roomSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
  <g id="Group">
  <path id="Vector" d="M0.639648 7.58372V10.4511H15.3596V7.58372C15.3596 7.58372 14.3317 5.26562 7.99965 5.26562C5.14819 5.26562 3.37258 5.73517 2.28078 6.25258C0.949642 6.88396 0.639648 7.58372 0.639648 7.58372Z" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
  <path id="Vector_2" d="M2.18042 6.25007V3.56729C2.18042 3.56729 3.5503 1.52728 7.99958 1.38368C11.4232 1.27427 13.4768 3.56729 13.4768 3.56729V6.1475" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
  <path id="Vector_3" d="M4.41895 5.57551C4.41895 5.57551 6.17859 2.13598 7.977 5.27008" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
  <path id="Vector_4" d="M11.4257 5.57551C11.4257 5.57551 9.77545 2.13598 7.97705 5.27008" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
  <path id="Vector_5" d="M2.7959 10.4738V11.8163L4.00167 10.4487" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
  <path id="Vector_6" d="M13.6002 10.4738V11.8163L12.3967 10.4487" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>
`;

  const plusSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <g id="Group 85">
  <path id="Vector 25" d="M0.640137 8H15.3601" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
  <path id="Vector 24" d="M8 0.639893V15.3599" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

  const minusSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M15.3599 8L0.639865 8" stroke="#464646" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

  const bookingObj = {
    location: 'Travelodge Harrow',
    checkIn: 'Mon 1st Jan 2021',
    checkOut: 'Wed 3rd Jan 2021',
    rooms: [
      {
        roomNumber: '01257211',
        rate: 'Saver Rate',
        roomType: 'Double Room',
        roomExtras: ['Wifi', 'Breakfast', 'Dinner'],
      },
      {
        roomNumber: '01257211',
        rate: 'Saver Rate',
        roomType: 'Double Room',
        roomExtras: ['Wifi', 'Breakfast', 'Dinner'],
      },
    ],
    contactNumber: '08719 846526',
    address: 'Address: 1 Greenhill Way, Harrow, HA1 1LE',
    hotelImg:
      'https://media.travelodge.co.uk/image/upload/c_fill,h_470,w_850/Rebase/Top%20of%20the%20page/GB0876_LONDON_HARROW_EXTERIOR_2208X1656.webp',
    hotelImgSubtext: 'An ideal base for Wembley and 15 minutes from Central London.',
  };

  const upcomingStayModule = (bookingObj) => {
    return `
<div class="${ID}-upcoming-stay-module">
  <div class="${ID}-upcoming-stay-module-left">
    <div class="${ID}-upcoming-stay-module-left-title">
      <h3>Your upcoming stay at ${bookingObj.location}</h3>
    </div>
    <div class="${ID}-upcoming-stay-module-left-dates">
      <p>
        ${calendarSVG} - ${bookingObj.checkIn} - ${bookingObj.checkOut}
      </p>
    </div>
    <div class="${ID}-upcoming-stay-module-left-booking">
      <div class="${ID}-booking-expand-button">
        <div class="${ID}-booking-expand-button-left">
        ${roomSVG} <p>${bookingObj.rooms.length} ${bookingObj.rooms.length > 1 ? 'Rooms' : 'Room'}</p>
        </div>
        <div class="${ID}-booking-expand-button-right">
          <p>Expand all rooms</p> ${plusSVG}
        </div>
      </div>
      <div class="${ID}-booking-hidden-content ${ID}-hidden">
        ${bookingObj.rooms
          .map((room, index) => {
            return `
            <div class="${ID}-booking-hidden-content-room">
              <div class="${ID}-booking-hidden-content-room-number ${ID}-room-row">
                <p class="${ID}-room-row-left">Room ${index + 1}</p>
                <p class="${ID}-room-row-left">${room.confirmationNumber}</p>
              </div>
              <div class="${ID}-booking-hidden-content-room-rate ${ID}-room-row">
                <p class="${ID}-room-row-left">Rate:</p>
                <p class="${ID}-room-row-left">${room.rate}</p>
              </div>
              <div class="${ID}-booking-hidden-content-room-type ${ID}-room-row">
                <p class="${ID}-room-row-left">Staying in:</p>
                <p class="${ID}-room-row-left">${room.roomType}</p>
              </div>
              <div class="${ID}-booking-hidden-content-room-extras ${ID}-room-row">
                <p class="${ID}-room-row-left">Room extras:</p>
                  <div class="${ID}-booking-hidden-content-room-extras-container">
                  ${room.roomExtras
                    .map((extra) => {
                      return `
                      <p class="${ID}-room-row-left">${extra}</p>
                    `;
                    })
                    .join('')}
                  </div>
              </div>
            </div>
          `;
          })
          .join('')}
      </div>
    </div>
    <a href="/manage-bookings" class="${ID}-upcoming-stay-module-left-manage">
        Manage your stay
    </a>
    <div class="${ID}-upcoming-stay-module-left-contact">
      <div class="${ID}-upcoming-stay-module-left-contact-location">Contact ${bookingObj.location}</div>
      <div class="${ID}-upcoming-stay-module-left-contact-number">Phone number: ${bookingObj.contactNumber}</div>
      <div class="${ID}-upcoming-stay-module-left-contact-address">Address: ${bookingObj.address}</div>
    </div>
    <div class="${ID}-upcoming-stay-module-left-remove">
      <div class="${ID}-upcoming-stay-module-left-remove-button">
        Remove shortcut
      </div>
    </div>
  </div>
  <div class="${ID}-upcoming-stay-module-right">
    <div class="${ID}-upcoming-stay-module-right-image">
      <img src="${bookingObj.hotelImg}" alt="hotel image">
    </div>
    <div class="${ID}-upcoming-stay-module-right-image-subtext">
      ${bookingObj.hotelImgSubtext}
    </div>
  </div>
</div>
`;
  };

  const addingShortcutModule = `
<div class="${ID}-adding-shortcut-module">
  <div class="${ID}-adding-shortcut-module-title">
        <h3>Add a shortcut to your booking</h3>
  </div>
  <div class="${ID}-adding-shortcut-module-message">
  <p>We’ll add a shortcut to the homepage for your booking so you can access it anytime, easily.</p>
  </div>
  <div class="${ID}-adding-shortcut-module-radio-container">
    <div>
    <input type="radio" id="add" name="bookingShortcut" value="add" checked />
    <label for="add">Add a shortcut</label>
    </div>
    <div>
    <input type="radio" id="remove" name="bookingShortcut" value="remove" />
    <label for="remove">No, thanks</label>
    </div
  </div>
</div>
`;

  const confirmationPage = location.href.includes('/confirmation');

  const manageBooking = location.href.includes('/manage-bookings');

  const homepageSlash = window.location.origin + '/';

  const homepage = window.location.origin;

  const amendBooking = location.href.includes('/amend?confirmationNo');

  const hotelDetailsPage = location.href.includes('/hotels/');

  if (hotelDetailsPage) {
    pollerLite(['#main .rate-btn'], () => {
      const proceedToExtras = document.querySelector('#main .bookNow');

      proceedToExtras.addEventListener('click', () => {
        const imgSubtextLocalStorage = {
          hotelImg: document.querySelector('#main-carousel-image img').src,
          hotelSubtext: document.querySelector('.hotel-details-right-content .cell-strapline-text').title,
          hotelName: document.querySelector('.hotel-details-right-content .hotel-name').innerText.trim(),
        };

        localStorage.setItem(`${ID}-imgSubtextLocalStorage`, JSON.stringify(imgSubtextLocalStorage));
      });
    });
  }

  if (confirmationPage) {
    pollerLite(['#main .bookingDetails .eachStay .rowRoom .dlTotals'], () => {
      console.log('confirmation page found total');
      const targetContainer = document.querySelector('#main .no-print');
      targetContainer.insertAdjacentHTML('beforeend', addingShortcutModule);

      const imgSubtextLocalStorage = JSON.parse(localStorage.getItem(`${ID}-imgSubtextLocalStorage`));

      const yourDetailsParagraph = document.querySelector('.personalDetailsWrapper .wrapperYourDetails p');
      const wordsArray = yourDetailsParagraph.innerText.split(' ');
      const bookingSurname = wordsArray[wordsArray.length - 1];

      const bookingObj = {
        location: document.querySelector('.eachStay .title1').innerText,
        checkIn: document.querySelectorAll('.checkinWrapper .row div')[0].querySelector('.date').innerText,
        checkOut: document.querySelectorAll('.checkinWrapper .row div')[1].querySelector('.date').innerText,
        surname: bookingSurname,
        rooms: [
          // {
          //   confirmationNumber: '01257211',
          //   rate: 'Saver Rate',
          //   roomType: 'Double Room',
          //   roomExtras: ['Wifi', 'Breakfast', 'Dinner'],
          // },
          // {
          //   confirmationNumber: '01257211',
          //   rate: 'Saver Rate',
          //   roomType: 'Double Room',
          //   roomExtras: ['Wifi', 'Breakfast', 'Dinner'],
          // },
        ],
        contactNumber: document.querySelector('.eachStay .pTel a').href.split(':')[1],
        address: document.querySelector('.eachStay .address').innerText,
        hotelImg: imgSubtextLocalStorage.hotelImg,
        hotelImgSubtext: imgSubtextLocalStorage.hotelSubtext,
      };

      //get booking data from page html and add to bookingObj
      //get all room data
      const roomData = document.querySelectorAll('.bookingDetails .rowRoom');
      roomData.forEach((room, index) => {
        if (index > 0) return;
        const newRoom = {
          rate: '',
          roomType: '',
          roomExtras: [],
          confirmationNumber: '',
        };

        newRoom.rate = room.querySelector('.dlTable .field dt').innerText.split('-')[1].trim();
        newRoom.roomType = room.querySelector('.title1Light').innerText.split(':')[1].trim();
        newRoom.confirmationNumber = room.querySelector('.bookingNumbers dd').innerText.trim();

        // const extrasArray = [];
        room.querySelectorAll('.dlTable div dl').forEach((extra, index) => {
          if (index > 0) {
            newRoom.roomExtras.push(extra.querySelector('dt').innerText.trim());
          }
        });

        bookingObj.rooms.push(newRoom);
      });

      //set local storage with bookingObj data from page html
      localStorage.setItem(`${ID}-bookingObj`, JSON.stringify(bookingObj));
      localStorage.setItem(`${ID}-bookingObjOn`, 'true');

      const shortCutRadio = document.querySelectorAll(`.${ID}-adding-shortcut-module-radio-container input`);
      shortCutRadio.forEach((radio) => {
        radio.addEventListener('click', () => {
          if (radio.value === 'add') {
            localStorage.setItem(`${ID}-bookingObjOn`, 'true');
            fireEvent('Click - User opts in to add shortcut');
          } else {
            localStorage.removeItem(`${ID}-bookingObjOn`);
            fireEvent('Click - User opts out of adding shortcut');
          }
        });
      });
    });
  }

  if (manageBooking) {
    //check for bookingFormObj in local storage
    const bookingFormObj = JSON.parse(localStorage.getItem(`${ID}-bookingFormObj`));
    //if bookingFormObj exists, fill in form with data and click submit
    if (bookingFormObj) {
      pollerLite(['#main .manage-bookings-form-container .manage-booking-booker-name'], () => {
        const bookingForm = document.querySelector('#main .manage-bookings-form-container form');
        const confirmationNumberField = bookingForm.querySelector('.booking-confirmation-number-field');
        confirmationNumberField.setAttribute('value', bookingObj.rooms[0].confirmationNumber);

        const inputEvent = new Event('input', { bubbles: true });
        confirmationNumberField.dispatchEvent(inputEvent);

        const bookingSurnameField = bookingForm.querySelector('.manage-booking-booker-name');
        bookingSurnameField.setAttribute('value', bookingObj.surname);

        // Dispatch 'input' event
        const inputEvent2 = new Event('input', { bubbles: true });
        bookingSurnameField.dispatchEvent(inputEvent2);

        setTimeout(() => {
          bookingForm.querySelector('.manage-booking-find-btn').click();
          localStorage.removeItem(`${ID}-bookingFormObj`);
        }, 100);
      });
    }

    //check for bookingObj in local storage
    const bookingObj = JSON.parse(localStorage.getItem(`${ID}-bookingObj`));
    const bookingObjOn = localStorage.getItem(`${ID}-bookingObjOn`);
    //if bookingObj exists, add upcoming stay module to page
    if (bookingObjOn) {
      pollerLite(['#main .manage-bookings-sub-container'], () => {
        const upcomingStayHTML = upcomingStayModule(bookingObj);

        const targetContainer2 = document.querySelector('#main .manage-bookings-main-container');
        targetContainer2.insertAdjacentHTML('beforebegin', upcomingStayHTML);

        const upcomingStayModuleDOM = document.querySelector(`.${ID}-upcoming-stay-module`);
        upcomingStayModuleDOM.classList.add(`${ID}-upcoming-stay-module-retrieve-style`);

        const bookingHiddenContent = document.querySelector(`.${ID}-booking-hidden-content`);
        const bookingExpandButton = document.querySelector(`.${ID}-booking-expand-button`);

        bookingExpandButton.addEventListener('click', function () {
          fireEvent('Click - User clicks expand button');
          bookingHiddenContent.classList.toggle(`${ID}-hidden`);
          this.classList.toggle(`${ID}-expand`);

          if (this.classList.contains(`${ID}-expand`)) {
            this.querySelector(`.${ID}-booking-expand-button-right p`).innerText = 'Collapse all rooms';
            this.querySelector(`.${ID}-booking-expand-button-right svg`).innerHTML = minusSVG;
          } else {
            this.querySelector(`.${ID}-booking-expand-button-right p`).innerText = 'Expand all rooms';
            this.querySelector(`.${ID}-booking-expand-button-right svg`).innerHTML = plusSVG;
          }
        });

        const removeShortcutButton = document.querySelector(`.${ID}-upcoming-stay-module-left-remove-button`);
        removeShortcutButton.addEventListener('click', () => {
          fireEvent('Click - User clicks remove shortcut button');
          localStorage.removeItem(`${ID}-bookingObjOn`);
          location.reload();
        });

        const manageBookingButton = document.querySelector(`.${ID}-upcoming-stay-module-left-manage`);
        manageBookingButton.addEventListener('click', (e) => {
          e.preventDefault();
          fireEvent('Click - User clicks manage booking button');
          // console.log('manage booking button clicked');
          const bookingForm = document.querySelector('#main .manage-bookings-form-container form');

          const confirmationNumberField = bookingForm.querySelector('.booking-confirmation-number-field');
          confirmationNumberField.setAttribute('value', bookingObj.rooms[0].confirmationNumber);

          const inputEvent = new Event('input', { bubbles: true });
          confirmationNumberField.dispatchEvent(inputEvent);

          const bookingSurnameField = bookingForm.querySelector('.manage-booking-booker-name');
          bookingSurnameField.setAttribute('value', bookingObj.surname);

          // Dispatch 'input' event
          const inputEvent2 = new Event('input', { bubbles: true });
          bookingSurnameField.dispatchEvent(inputEvent2);

          setTimeout(() => {
            bookingForm.querySelector('.manage-booking-find-btn').click();
          }, 100);
        });
      });
    }
  }

  if (
    window.location.href === homepage ||
    window.location.href === homepageSlash ||
    window.location.href === 'https://www.travelodge.co.uk'
  ) {
    console.log('homepage');
    //check for bookingObj in local storage
    const bookingObj = JSON.parse(localStorage.getItem(`${ID}-bookingObj`));
    const bookingObjOn = localStorage.getItem(`${ID}-bookingObjOn`);
    //if bookingObj exists, add upcoming stay module to page

    if (bookingObjOn) {
      pollerLite(['#main .espot-container'], () => {
        const upcomingStayHTML = upcomingStayModule(bookingObj);

        const targetContainer = document.querySelector('#main .espot-container');
        targetContainer.insertAdjacentHTML('beforebegin', upcomingStayHTML);

        const bookingHiddenContent = document.querySelector(`.${ID}-booking-hidden-content`);
        const bookingExpandButton = document.querySelector(`.${ID}-booking-expand-button`);

        bookingExpandButton.addEventListener('click', function () {
          fireEvent('Click - User clicks expand button');
          bookingHiddenContent.classList.toggle(`${ID}-hidden`);
          this.classList.toggle(`${ID}-expand`);

          if (this.classList.contains(`${ID}-expand`)) {
            this.querySelector(`.${ID}-booking-expand-button-right p`).innerText = 'Collapse all rooms';
            this.querySelector(`.${ID}-booking-expand-button-right svg`).innerHTML = minusSVG;
          } else {
            this.querySelector(`.${ID}-booking-expand-button-right p`).innerText = 'Expand all rooms';
            this.querySelector(`.${ID}-booking-expand-button-right svg`).innerHTML = plusSVG;
          }
        });

        const removeShortcutButton = document.querySelector(`.${ID}-upcoming-stay-module-left-remove-button`);
        removeShortcutButton.addEventListener('click', () => {
          fireEvent('Click - User clicks remove shortcut button');
          localStorage.removeItem(`${ID}-bookingObjOn`);
          location.reload();
        });

        const manageBookingButton = document.querySelector(`.${ID}-upcoming-stay-module-left-manage`);

        manageBookingButton.addEventListener('click', (e) => {
          fireEvent('Click - User clicks manage booking button');
          localStorage.setItem(`${ID}-bookingFormObj`, 'true');
        });
      });
    }
  }

  if (amendBooking) {
    //console.log('amend booking page');
    pollerLite(['#main .leisure-banners-container .leisure-amend-name'], () => {
      //console.log('amend booking page poller');

      //const bookingObj = JSON.parse(localStorage.getItem(`${ID}-bookingObj`));
      const url = window.location.href;
      const confirmationNo = new URL(url).searchParams.get('confirmationNo');

      const token = localStorage.getItem('MANAGE_BOOKING_TOKEN');
      const isLogged = getCookie('TLUSERAUTHTOKEN');
      const headers = isLogged
        ? {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getCookie('TLUSERAUTHTOKEN')}`,
          }
        : {
            'Content-Type': 'application/json',
            tlmanagebookingtoken: token,
            authorization: '',
          };

      fetch(`/api/v3${isLogged ? '/bookings' : '/manage/booking'}/leisure/${confirmationNo}/amend`, {
        headers: headers,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('data', data);
          //console.log('bookingObj found');
          //create booking object
          const description = data.hotel.content.about;
          const parser = new DOMParser();
          const doc = parser.parseFromString(description, 'text/html');
          const firstPTag = doc.querySelector('p');
          // console.log('firstPTag', firstPTag)
          console.log('lastname', data.booking.booker.lastName)
          const imgPrefix = 'https://media.travelodge.co.uk/image/upload/c_fill,h_470,w_850/Rebase/Top%20of%20the%20page/';
          const imgSuffix = data.hotelmainimage.split('mvp_thumbnail/public/')[1];
          const hotelImgURL = imgPrefix + imgSuffix;
          
          const bookingObj = {
            location: data.hotel.name,
            checkIn: data.booking.arrivalDate,
            checkOut: data.booking.departureDate,
            surname: data.booking.booker.lastName,
            rooms: [
              {
                confirmationNumber: data.booking.confirmationNo,
                rate: data.booking.rateType.groupName,
                roomType: data.booking.roomType.groupName,
                roomExtras: data.booking.products.length === 0 ? [] : data.booking.products.map((product) => product.name || ''),
              },
            ],
            contactNumber: data.hotel.phone,
            address: data.hotel.address.line1,
            hotelImg: hotelImgURL,
            hotelImgSubtext: firstPTag.textContent.split('.')[0] + firstPTag.textContent.split('.')[1],
          };

          const targetContainer = document.querySelector('#main .leisure-banners-container');
          const alredyInDom = document.querySelector(`.${ID}-adding-shortcut-module`);
          if (!alredyInDom) {
            localStorage.setItem(`${ID}-bookingObj`, JSON.stringify(bookingObj));
            targetContainer.insertAdjacentHTML('afterend', addingShortcutModule);
            const addingShortcutModuleDOM = document.querySelector(`.${ID}-adding-shortcut-module`);
            //console.log(addingShortcutModuleDOM);
            addingShortcutModuleDOM.classList.add(`${ID}-adding-shortcut-module-manage-booking`);

            localStorage.setItem(`${ID}-bookingObjOn`, 'true');
            const shortCutRadio = document.querySelectorAll(`.${ID}-adding-shortcut-module-radio-container input`);
            shortCutRadio.forEach((radio) => {
              radio.addEventListener('click', () => {
                if (radio.value === 'add') {
                  localStorage.setItem(`${ID}-bookingObjOn`, 'true');
                  localStorage.setItem(`${ID}-bookingObj`, JSON.stringify(bookingObj));
                  fireEvent('Click - User opts in to add shortcut');
                } else {
                  localStorage.removeItem(`${ID}-bookingObjOn`);
                  localStorage.removeItem(`${ID}-bookingObj`);
                  fireEvent('Click - User opts out of adding shortcut');
                }
              });
            });
          }
        });
    });
  }
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
