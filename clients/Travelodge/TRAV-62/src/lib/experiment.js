/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;
let wifiOnlyHotels = ['www.travelodge.co.uk/hotels/591/Winnersh-Triangle-hotel', 'www.travelodge.co.uk/hotels/647/Chester-Central-Bridge-Street-hotel', 'www.travelodge.co.uk/hotels/270/London-Central-Farringdon-hotel', 'www.travelodge.co.uk/hotels/667/London-Beckton-hotel', 'www.travelodge.co.uk/hotels/610/London-Finsbury-Park-hotel', 'www.travelodge.co.uk/hotels/648/Lincoln-City-Centre-hotel', 'www.travelodge.co.uk/hotels/421/London-Central-Waterloo-hotel', 'www.travelodge.co.uk/hotels/569/London-Clapham-Junction-hotel', 'www.travelodge.co.uk/hotels/361/Bath-Waterside-hotel', 'www.travelodge.co.uk/hotels/665/Edinburgh-Park-hotel', 'www.travelodge.co.uk/hotels/670/Portsmouth-City-Centre-hotel'];
let wifiCastingHotels = ['www.travelodge.co.uk/hotels/356/Brighton-Seafront-hotel', 'www.travelodge.co.uk/hotels/692/Walton-on-Thames-Central-hotel', 'www.travelodge.co.uk/hotels/661/Marlow-hotel', 'www.travelodge.co.uk/hotels/639/London-City-hotel', 'www.travelodge.co.uk/hotels/671/Elgin-hotel'];
let iObserver;

const startExperiment = () => {
	let allRateGroups = document.querySelectorAll('#rebase > .rateGroups');

	let wifiOnly = false;
	let wifiCasting = false;

	[].slice.call(wifiOnlyHotels).forEach((hotel) => {
		if (window.location.href.indexOf(hotel) > -1) {
			wifiOnly = true;
		}
	});

	[].slice.call(wifiCastingHotels).forEach((hotel) => {
		if (window.location.href.indexOf(hotel) > -1) {
			wifiCasting = true;
		}
	});

	if (VARIATION == 1 && wifiOnly == true) {
		fireEvent('Visible - variation 1, wifi only changes applied', true);
		[].slice.call(allRateGroups).forEach((rateGroup) => {
			processChanges(rateGroup, 'wifi-only');
		});
	} else if (VARIATION == 2 && wifiCasting == true) {
		fireEvent('Visible - variation 2, wifi + tv casting changes applied', true);
		[].slice.call(allRateGroups).forEach((rateGroup) => {
			processChanges(rateGroup, 'wifi-casting');
		});
	} else {
		fireEvent('Nothing applied - not in wifi only or wifi + tv casting hotel', true);
	}
};

const processChanges = (rateGroup, changeType) => {
	let allDiscountRows = rateGroup.querySelectorAll('.discount-row');

	[].slice.call(allDiscountRows).forEach((row) => {
		row.classList.add(`${ID}-wifi-row`);
		row.closest('.card-border').classList.add(`${ID}-wifi-card`);
		row.closest('.row').querySelector('.textarea').classList.add(`${ID}-hidden`);
		row.closest('.row').querySelector('.p-0').classList.add(`${ID}-hidden`);

		let rateDetailsHTML = row.closest('.row').querySelector('.textarea').innerHTML;
		rateDetailsHTML = rateDetailsHTML.replaceAll(' excluding WiFi', '');
		row.querySelector('.disc-text').innerHTML = rateDetailsHTML;
	});

	// New wifi roundel
	let newWifiRoundelHTML = `
  
    <div class="${ID}-new-wifi-roundel">
      <span> NEW </span>
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.763 13.58a1.75 1.75 0 1 1 2.473 2.477 1.75 1.75 0 0 1-2.473-2.478v.001zM3.4 10.825c3.64-3.64 9.56-3.64 13.2 0l-1.65 1.65a7.007 7.007 0 0 0-9.9 0l-1.65-1.65zm-3.3-3.3c5.46-5.459 14.34-5.459 19.8 0l-1.65 1.65c-4.55-4.55-11.95-4.55-16.5 0L.1 7.526v-.001z" fill="#1F7A75"/></svg>
      <span> WiFi Included </span>

      ${changeType == 'wifi-casting' ? ` <span class="${ID}-amp">&amp;</span> <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="#1F7A75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cast"><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path><line x1="2" y1="20" x2="2" y2="20"></line></svg><span>TV Casting</span>` : ``}
    </div>
  
  `;

	let roomCarousels = rateGroup.querySelectorAll(`.${ID}-wifi-card .room-carousel`);

	[].slice.call(roomCarousels).forEach((carousel) => {
		carousel.classList.add(`${ID}-wifi-carousel`);
		carousel.insertAdjacentHTML('afterbegin', newWifiRoundelHTML);
	});

	// Line of detail about free wifi
	let newWifiLineHTML = `

    ${changeType == 'wifi-casting' ? ` <div class="tooltipRebase room-key-point-wrapper" style="color: rgb(255, 255, 255); font-family: Arial; font-size: 12px; font-weight: normal; background-color: rgb(31, 122, 117); border: 1px solid rgb(31, 122, 117);"><span class="room-key-point after">Stream media content from your device to the TV</span><div class="room-key-point-img before"><svg width="12" height="9" xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cast"><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path><line x1="2" y1="20" x2="2" y2="20"></line></svg></div></div>` : ``}
  
    <div class="tooltipRebase room-key-point-wrapper" style="color: rgb(255, 255, 255); font-family: Arial; font-size: 12px; font-weight: normal; background-color: rgb(31, 122, 117); border: 1px solid rgb(31, 122, 117);"><span class="room-key-point after">WiFi included for the duration of your stay</span><div class="room-key-point-img before"><svg width="12" height="9" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.763 13.58a1.75 1.75 0 1 1 2.473 2.477 1.75 1.75 0 0 1-2.473-2.478v.001zM3.4 10.825c3.64-3.64 9.56-3.64 13.2 0l-1.65 1.65a7.007 7.007 0 0 0-9.9 0l-1.65-1.65zm-3.3-3.3c5.46-5.459 14.34-5.459 19.8 0l-1.65 1.65c-4.55-4.55-11.95-4.55-16.5 0L.1 7.526v-.001z" fill="#FFFFFF"/></svg></div></div>
  
  `;

	let roomKeyPoints = rateGroup.querySelectorAll(`.${ID}-wifi-card .room-key-point-container`);

	[].slice.call(roomKeyPoints).forEach((keyPoint) => {
		keyPoint.querySelector('.room-key-point-wrapper').insertAdjacentHTML('afterend', newWifiLineHTML);
	});

	// New Wifi symbol beside room name

	let newWifiSymbolHTML = ` Plus <svg class="${ID}-wifilogo" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.763 13.58a1.75 1.75 0 1 1 2.473 2.477 1.75 1.75 0 0 1-2.473-2.478v.001zM3.4 10.825c3.64-3.64 9.56-3.64 13.2 0l-1.65 1.65a7.007 7.007 0 0 0-9.9 0l-1.65-1.65zm-3.3-3.3c5.46-5.459 14.34-5.459 19.8 0l-1.65 1.65c-4.55-4.55-11.95-4.55-16.5 0L.1 7.526v-.001z" fill="#FFF"/></svg> ${changeType == 'wifi-casting' ? `<svg class="${ID}-wifilogo" xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cast"><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path><line x1="2" y1="20" x2="2" y2="20"></line></svg>` : ``}`;

	let roomDetails = rateGroup.querySelectorAll(`.${ID}-wifi-card .room-details`);

	[].slice.call(roomDetails).forEach((detail) => {
		detail.insertAdjacentHTML('beforeend', newWifiSymbolHTML);
	});
};

const checkIntersection = (entries, observer) => {


	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			fireEvent(`Interaction - user has scrolled down the page far enough to see a SuperRoom Plus card`, true);
			iObserver.unobserve(document.querySelector(`.${ID}-wifi-card`));
		}
	});
	


}

const addTracking = () => {
	document.body.addEventListener('click', (e) => {
		if (e.target.closest('.bookNow')) {
			fireEvent(`Click - Book Now button clicked with the user choosing: ${document.querySelector('.rate-btn.selected') ? document.querySelector('.rate-btn.selected').getAttribute('data-room-rate') : document.querySelector('.disc-rate-btn.selected').getAttribute('data-room-rate')} ${document.querySelector('.rate-btn.selected') ? document.querySelector('.rate-btn.selected').getAttribute('data-roomname') : document.querySelector('.disc-rate-btn.selected').getAttribute('data-roomname')} room with the ${document.querySelector('.rate-btn.selected') ? document.querySelector('.rate-btn.selected').getAttribute('data-rate-plan-code') : document.querySelector('.disc-rate-btn.selected').getAttribute('data-rate-plan-code')} rate`, true);
		}

		if (e.target.closest('.rate-btn')) {
			fireEvent(`Click - Rate button clicked, user has selected a ${e.target.closest('.rate-btn').getAttribute('data-room-rate')} ${e.target.closest('.rate-btn').getAttribute('data-roomname')} room with the ${e.target.closest('.rate-btn').getAttribute('data-rate-plan-code')} rate`, true);
		}

		if (e.target.closest('.disc-rate-btn')) {
			fireEvent(`Click - Rate button with included Wifi clicked, user has selected a ${e.target.closest('.disc-rate-btn').getAttribute('data-room-rate')} ${e.target.closest('.disc-rate-btn').getAttribute('data-roomname')} room with the ${e.target.closest('.disc-rate-btn').getAttribute('data-rate-plan-code')} rate`, true);
		}
	});

	pollerLite([`.${ID}-wifi-card`], () => {
		
		let options = {
			rootMargin: "0px",
			threshold: 1.0,
		};

		iObserver = new IntersectionObserver(checkIntersection, options);
		iObserver.observe(document.querySelector(`.${ID}-wifi-card`));
	})

	pollerLite([() => { return window.globalDataLayer; }], () => {

		fireEvent(`Interaction - hotel room types on this page view are: ${window.globalDataLayer.availableRoomCodes}`, true);

	})

	


};

export default () => {
	setup();

	fireEvent('Conditions Met');

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	addTracking();

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	if (VARIATION !== 'control' && window.Orion6 !== 'DDM') {
		window.Orion6 = 'DDM';
	}
	const checkBedType = () => {
		pollerLite(['.rate-btn', '.discount-row .disc-percent'], () => {
			let freeWifi = false;
			if (document.querySelector('.disc-rate-btn')) {
				if (document.querySelector('.disc-rate-btn').closest('.discount-row').querySelector('.disc-percent').innerText.toLowerCase() == 'new wifi included') {
					freeWifi = true;
				}
			}

			if (freeWifi == true) {
				fireEvent('Interaction - this is a page which qualifies for free wifi', true);
				if (VARIATION !== 'control') {
					startExperiment();

					let allSwitchers = document.querySelectorAll('.js-switchExtraRooms');

					[].slice.call(allSwitchers).forEach((switcher) => {
						switcher.addEventListener('change', (e) => {
							setTimeout(() => {
								processChanges(e.target.closest('.rateGroups'));
							}, 500);
						});
					});
				}
			}
		});
		setTimeout(() => {
			if (document.querySelector('.disc-rate-btn')?.closest('.discount-row')?.querySelector('.disc-percent')?.innerText.toLowerCase() !== 'new wifi included') {
				fireEvent('Interaction - this is not a page which qualifies for free wifi', true);
			}
		}, 1000);
	};

	checkBedType();

	if (VARIATION == '2') {
		pollerLite(['#rebase .extraBedChanger select'], () => {
			const select = document.querySelector('#rebase .extraBedChanger select');
			select.addEventListener('change', () => {
				fireEvent('Interaction - Bed type is changed to ' + select.querySelector(`option[data-roomtypeid='${select.value}']`).textContent.trim());
				checkBedType();
			});
		});
		pollerLite(['#rebase .extra-bed-link a'], () => {
			const link = document.querySelector('#rebase .extra-bed-link a');
			link.addEventListener('click', () => {
				const select = document.querySelector('#rebase .extraBedChanger select');
				if (select) {
					fireEvent('Interaction - Bed type is changed to ' + select.querySelector(`option[data-roomtypeid='${select.value}']`).textContent.trim());
				}
				checkBedType();
			});
		});
	}
};
