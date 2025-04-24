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

const { ID, VARIATION } = shared;
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const roomTypes = [
	{ name: 'Single Room', code: 'SN' },
	{ name: 'Standard Double Room', code: 'DN' },
	{ name: 'Double with Sofa Bed', code: 'DNS' },
	{ name: 'Standard Twin Room', code: 'S2N' },
	{ name: 'Triple Room', code: 'S3N' },
	{ name: 'Twin Room Zip & Link with Sofa Bed', code: 'S2ZN' },
	{ name: 'Family Room', code: 'DSPN' },
	{ name: 'Accessible Family Room', code: 'DAFN' },
	{ name: 'Accessible Double Room', code: 'DAMN' },
	{ name: 'Double Disabled Room', code: 'DHN' },
	{ name: 'Accessible Room', code: 'DHZN' },
	{ name: 'Double or Single Room', code: 'DSN' },
	{ name: 'Small Family Room', code: 'SFN' },
	{ name: 'Single SuperRoom', code: 'BRSN' },
	{ name: 'SuperRoom', code: 'BRDN' },
	{ name: 'SuperRoom with Sofa Bed', code: 'BRDNS' },
	{ name: 'Double SuperRoom', code: 'BRD2N' },
	{ name: 'Twin SuperRoom', code: 'BRS2N' },
	{ name: 'Triple SuperRoom', code: 'BRS3N' },
	{ name: 'Super Twin Zip & Link', code: 'BRS2ZN' },
	{ name: 'Super Twin Zip & Link with Sofa Bed', code: 'BRS2ZS' },
	{ name: 'Family SuperRoom', code: 'BRDSPN' },
	{ name: 'Accessible Family SuperRoom', code: 'BRDAFN' },
	{ name: 'Accessible Double SuperRoom', code: 'BRDAMN' },
	{ name: 'Super Double Disabled Room', code: 'BRDHN' },
	{ name: 'Accessible SuperRoom', code: 'BRDHZN' },
	{ name: 'Super Double or Single Room', code: 'BRDSN' },
	{ name: 'Standard Room with Fridge & Microwave', code: 'DNFM' },
	{ name: 'Standard Room Plus', code: 'CPDN' },
	{ name: 'Family Room Plus', code: 'CPDSPN' },
	{ name: 'Accessible Room Plus', code: 'CPDHZN' }
];

const startExperiment = (dataLayer) => {
	document.documentElement.classList.add(`${ID}-exp-started`);

	// Room Details

	let roomsArray = [];

	let rooms = dataLayer.basketHotelName;

	roomsArray = rooms.split(';');

	roomsArray.filter((item, index) => {
		let roomDetails = {
			roomType: dataLayer.basketRoomCodePerRoom.split(';')[index],
			checkIn: dataLayer.basketRoomCheckIn.split(';')[index],
			checkOut: dataLayer.basketRoomCheckOut.split(';')[index],
			extras: dataLayer.basketRoomExtras.split(';')[index],
			adults: dataLayer.adultsPerRoom.split(';')[index],
			children: dataLayer.childrenPerRoom.split(';')[index],
			nights: dataLayer.nights.split(';')[index],
			roomRateType: dataLayer.basketRoomRateType.split(';')[index]
		};

		roomsArray[index] = roomDetails;
	});

	let uniqueStaysArray = [];

	uniqueStaysArray = roomsArray.map((item) => {
		return { checkIn: item.checkIn, checkOut: item.checkOut, roomsDetails: [] };
	});

	uniqueStaysArray.filter((item, index) => {
		let stayDetails = {
			checkIn: item.checkIn,
			checkOut: item.checkOut,
			roomsDetails: roomsArray.filter((room) => {
				return room.checkIn == item.checkIn;
			})
		};

		uniqueStaysArray[index] = stayDetails;
	});

	let prevCheckIn = '';
	let prevCheckOut = '';
	let staysArray = [];
	uniqueStaysArray.filter((item) => {
		if (item.checkIn != prevCheckIn || item.checkOut != prevCheckOut) {
			let stayDetails = {
				checkIn: item.checkIn,
				checkOut: item.checkOut,
				roomsDetails: roomsArray.filter((room) => {
					return room.checkIn == item.checkIn || room.checkOut == item.checkOut;
				})
			};

			staysArray.push(stayDetails);
		}

		prevCheckIn = item.checkIn;
		prevCheckOut = item.checkOut;
	});

	let totalNumGuests = 0;

	totalNumGuests = parseInt(dataLayer.adults) + parseInt(dataLayer.children);

	let newShowHideButtonHTML = `
    
      <div class="col-3 col-sm-6 col-md-3 col-lg-3 col-xs-6 ${ID}-showhide--wrapper">
          <button id="${ID}-showhide">Show details</button>
      </div>

    `;

	const input = document.querySelector('.miniSearch .input-group.groupLocation');
	input.parentElement.classList.add(`${ID}-hidden`);
	input.parentElement.insertAdjacentHTML('beforebegin', newShowHideButtonHTML);

	document.getElementById(`${ID}-showhide`).addEventListener('click', (e) => {
		document.querySelector(`.${ID}-rooms`).classList.toggle(`${ID}-hidden`);
    fireEvent('Click - show/hide details button clicked on', true);
		if (e.target.innerText == 'Show details') {
			e.target.innerText = 'Hide details';
		} else {
			e.target.innerText = 'Show details';
		}
	});

	let newHTML = `

      <div class="${ID}-content">

        <div class="${ID}-location">
          <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.72392 1.15198C3.69032 1.15198 1.23271 3.50273 1.23271 6.40443C1.23271 6.40443 0.775755 11.745 6.72392 18.048C6.72392 18.048 12.2151 13.846 12.2151 6.40443C12.2151 3.50273 9.75752 1.15198 6.72392 1.15198Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.72398 6.84151C7.22872 6.84151 7.6379 6.45012 7.6379 5.96732C7.6379 5.48452 7.22872 5.09314 6.72398 5.09314C6.21923 5.09314 5.81006 5.48452 5.81006 5.96732C5.81006 6.45012 6.21923 6.84151 6.72398 6.84151Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Travelodge ${dataLayer.basketHotelName.split(';')[0]}</span>
        </div>

        ${staysArray.map((item) => {
          // Date formatting

          let searchedCheckIn = item.checkIn.replaceAll('/', '-');
          let searchedCheckOut = item.checkOut.replaceAll('/', '-');

          var searchedCheckoutParts = searchedCheckOut.split('-');
          var searchedCheckoutDate = new Date(searchedCheckoutParts[2], searchedCheckoutParts[1] - 1, searchedCheckoutParts[0]);

          var searchedCheckinParts = searchedCheckIn.split('-');
          var searchedCheckinDate = new Date(searchedCheckinParts[2], searchedCheckinParts[1] - 1, searchedCheckinParts[0]);

          let searchedCheckinFormatted = daysOfWeek[searchedCheckinDate.getDay()] + ' ' + searchedCheckinDate.getDate() + ' ' + monthsOfYear[searchedCheckinDate.getMonth()];
          let searchedCheckoutFormatted = daysOfWeek[searchedCheckoutDate.getDay()] + ' ' + searchedCheckoutDate.getDate() + ' ' + monthsOfYear[searchedCheckoutDate.getMonth()];

          return `
            
              <div class="${ID}-dates">

                <div class="${ID}-dates--checkin">
                  
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.4321 3.04919H0.768066V18.6358H18.4321V3.04919Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.4321 3.04919H0.768066V9.28535H18.4321V3.04919Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.06836 0.967896V6.16342" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.60254 0.967896V6.16342" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.1318 0.967896V6.16342" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <div class="${ID}-dates--checkinlabel"><span>Check-in:</span> ${searchedCheckinFormatted} </div>
                </div>

                <div class="${ID}-dates--checkout">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.4321 3.04919H0.768066V18.6358H18.4321V3.04919Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.4321 3.04919H0.768066V9.28535H18.4321V3.04919Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.06836 0.967896V6.16342" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.60254 0.967896V6.16342" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.1318 0.967896V6.16342" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <div class="${ID}-dates--checkoutlabel"><span>Check-out:</span> ${searchedCheckoutFormatted} </div>
                </div>

                <div class="${ID}-dates--nights">
                  <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.0603 13.943C10.3525 13.943 6.53554 10.126 6.53554 5.41818C6.53554 3.7017 7.04626 2.10426 7.92178 0.767944C4.03186 1.75098 1.15186 5.26458 1.15186 9.45786C1.15186 14.4153 5.16849 18.4319 10.1259 18.4319C13.6895 18.4319 16.7615 16.3468 18.2091 13.3363C17.2338 13.7241 16.1739 13.943 15.0642 13.943H15.0603Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <span>${dataLayer.basketRoomNight.split(';')[0]} Night${dataLayer.basketRoomNight > 1 ? 's' : ''}</span>
                </div>

              </div>

              <div class="${ID}-meta">
              
                <div class="${ID}-meta--rooms">
                  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.768066 8.30039V11.7413H18.4321V8.30039C18.4321 8.30039 17.1985 5.51868 9.60007 5.51868C6.17832 5.51868 4.04759 6.08213 2.73742 6.70302C1.14006 7.46068 0.768066 8.30039 0.768066 8.30039Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.61719 6.70031V3.48096C2.61719 3.48096 4.26105 1.03295 9.60018 0.860632C13.7085 0.729342 16.1729 3.48096 16.1729 3.48096V6.57722" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.30322 5.89066C5.30322 5.89066 7.4148 1.76323 9.57288 5.52414" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.7111 5.89066C13.7111 5.89066 11.7308 1.76323 9.57275 5.52414" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.35547 11.7686V13.3797L4.8024 11.7385" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.3207 11.7686V13.3797L14.8765 11.7385" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <div class="${ID}-meta--roomslabel">${item.roomsDetails.length} Room${item.roomsDetails.length > 1 ? `s` : ``}  </div>
                </div>

                <div class="${ID}-meta--guests">
                  <svg height="18" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5144 9.89803C13.9391 8.88427 14.7877 7.11787 14.469 5.17483C14.1579 3.26251 12.6565 1.67275 10.7595 1.27723C7.6453 0.624426 4.8997 2.98603 4.8997 5.98507C4.8997 7.60171 5.69841 9.03019 6.92337 9.90187C7.25745 10.1399 7.15378 10.6507 6.76978 10.7927C3.49042 11.9947 1.15186 15.1396 1.15186 18.8337H18.2821C18.2821 15.1396 15.9435 11.9908 12.6642 10.7927C12.2802 10.6507 12.1803 10.1399 12.5144 9.90187V9.89803Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <div class="${ID}-meta--guestslabel">${totalNumGuests} Guest${totalNumGuests > 1 ? `s` : ``} </div>
                </div>
              
              </div>

              <div class="${ID}-rooms ${ID}-hidden">

                ${item.roomsDetails.map((item, index) => {
                  let roomType = roomTypes.find((room) => room.code === item.roomType);

                  return `

                    <div class="${ID}-rooms--single">
                
                      <h2>Room ${index + 1}: ${roomType.name}</h2>
                      ${item.adults > 0 ? `${item.adults} adult${item.adults > 1 ? `s` : ``}` : ``} ${item.children > 0 ? `${item.children} ${item.children > 1 ? `children` : `child`}` : ``} - ${item.roomRateType == 'BARFLEX' ? `Flexible rate` : `Saver rate`}
                      <ul>
                        
                        ${item.extras.indexOf('breakfast') > -1 ? `<li> With breakfast </li>` : ``}
                        ${item.extras.indexOf('dinner') > -1 ? `<li> With Dinner - 2 course meal deal </li>` : ``}
                        ${item.extras.indexOf('earlyIn') > -1 ? `<li class="${ID}-bold"> With early check in from 12pm (12 noon)</li>` : ``}
                        ${item.extras.indexOf('lateOut') > -1 ? `<li class="${ID}-bold"> With late checkout until 2pm </li>` : ``}
                        ${item.extras.indexOf('wifi') > -1 ? `<li> With WiFi access</li>` : ``}
                        ${item.extras.indexOf('pets') > -1 ? `<li> With pets </li>` : ``}
                        
                        ${item.extras.length === 0 ? `<li> No extras selected </li>` : ``}
                      </ul>
                      
                    
                    
                    </div>

                  `;
              })
              .join('')}

                
              
              </div>
            
            `;
        })
        .join('')}

      </div>

    `;
	input.closest('.miniSearch').querySelector('.row').classList.add(`${ID}-baskettotal`);
	input.closest('.miniSearch').insertAdjacentHTML('afterbegin', newHTML);

  document.querySelector('.loginPayment').classList.add(`${ID}-hidden`);
  document.querySelector('.loginPayment').insertAdjacentHTML('beforebegin', `

        <div class="${ID}-viewbasket">
          <div class="${ID}-viewbasket--inner">
            <p><a href="/basket">View basket</a> to add another stay or amend your current one </p>
          </div>
        </div>

  `);

	fireEvent(`Visible - experiment loaded onto the page`, true);

  if(window.outerWidth < 992) {
    document.querySelector('.colTotal').classList.remove('col-sm-12')
    document.querySelector('.colTotal').classList.remove('col-12');
    document.querySelector('.colTotal').classList.add('col-sm-6');
    document.querySelector('.colTotal').classList.add('col-xs-6');
  } else {
	document.querySelector('.colTotal').classList.remove('col-lg-3');
	document.querySelector('.colTotal').classList.remove('col-md-3');
	document.querySelector('.colTotal').classList.add('col-md-4');
	document.querySelector('.colTotal').classList.add('col-lg-4');
  }


};

const addTracking = () => {

  document.body.addEventListener('click', (e) => {

    if(e.target.classList.contains('btnSubmit')) {
      fireEvent('Click - Proceed to secure payment button clicked', true);
    }
  });



}

export default () => {
	setup();

	logMessage(ID + ' Variation: ' + VARIATION);

	fireEvent('Conditions Met');

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

  addTracking();

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

	pollerLite(
		[
			'.miniSearch .input-group.groupLocation',
			() => {
				return window.globalDataLayer;
			}
		],
		() => {
			const dataLayer = window.globalDataLayer;

			function identical(array) {
				for (var i = 0; i < array.length - 1; i++) {
					if (array[i] !== array[i + 1]) {
						return false;
					}
				}
				return true;
			}

			let hotels = dataLayer.basketHotelName.split(';');
			
			if (identical(hotels) == true && document.referrer.indexOf('extras') > -1) {
				startExperiment(dataLayer);
			} else {
				fireEvent(`Interaction - conditions not met for the test to run. Reasons: ${identical(hotels) == false ? `[multiple hotels]` : ``}${document.referrer.indexOf('extras') == -1 ? `[referrer not extras]` : ``}`, true);
			}
		}
	);
};
