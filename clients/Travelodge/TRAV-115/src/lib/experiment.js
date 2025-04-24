/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite, observer } from "../../../../../lib/utils";

const { ID, VARIATION } = shared;

const startExperiment = () => {
	let allRateGroups = document.querySelectorAll("#rebase > .rateGroups");

	[].slice.call(allRateGroups).forEach((rateGroup) => {
		processChanges(rateGroup);
	});
};

const processChanges = (rateGroup) => {
	let allDiscountRows = rateGroup.querySelectorAll(".discount-row");

	[].slice.call(allDiscountRows).forEach((row) => {
		row.classList.add(`${ID}-wifi-row`);
		row.closest(".card-border").classList.add(`${ID}-wifi-card`);
		row.closest(".row")
			.querySelector(".textarea")
			.classList.add(`${ID}-visually_hidden`);
		row.closest(".row")
			.querySelector(".p-0")
			.classList.add(`${ID}-visually_hidden`);

		let rateDetailsHTML = row
			.closest(".row")
			.querySelector(".textarea").innerHTML;
		rateDetailsHTML = rateDetailsHTML.replaceAll(" excluding WiFi", "");
		row.querySelector(".disc-text").innerHTML = rateDetailsHTML;



		if (
			row.querySelector(".saver-rate").innerText.toLowerCase() ==
			"saver rate" &&
			VARIATION == 3
		) {
			row.querySelector(".saver-text").insertAdjacentHTML(
				"afterend",
				`<div class="${ID}-lozenge">Upgrade to Standard Room Plus for £5 per night</div>`
			);
		}
	});

	// New wifi roundel

	let newWifiRoundelHTML = ``;

	if (VARIATION == 1) {
		newWifiRoundelHTML = `
  
      <div class="${ID}-new-wifi-roundel">
        <span> NEW </span>
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.763 13.58a1.75 1.75 0 1 1 2.473 2.477 1.75 1.75 0 0 1-2.473-2.478v.001zM3.4 10.825c3.64-3.64 9.56-3.64 13.2 0l-1.65 1.65a7.007 7.007 0 0 0-9.9 0l-1.65-1.65zm-3.3-3.3c5.46-5.459 14.34-5.459 19.8 0l-1.65 1.65c-4.55-4.55-11.95-4.55-16.5 0L.1 7.526v-.001z" fill="#1F7A75"/></svg>
        <span> WiFi Included </span>
      </div>
    
    `;
	} else if (VARIATION == 2 || VARIATION == 3) {
		newWifiRoundelHTML = `
  
      <div class="${ID}-new-wifi-roundel">
        <img src="https://media.travelodge.co.uk/image/upload/c_crop,g_north,h_480,q_100,w_650,y_20/c_limit,q_100,w_70/v1687776087/extras/WiFiIncluded.webp" alt="WiFi Included" />
      </div>
    
    `;
	}

	let roomCarousels = rateGroup.querySelectorAll(
		`.${ID}-wifi-card .room-carousel`
	);

	[].slice.call(roomCarousels).forEach((carousel) => {
		if (!carousel.querySelector(`.${ID}-new-wifi-roundel`)) {
			carousel.classList.add(`${ID}-wifi-carousel`);
			carousel.insertAdjacentHTML("afterbegin", newWifiRoundelHTML);
		}
	});

	// Line of detail about free wifi
	let newWifiLineHTML = `
  
    <div class="tooltipRebase room-key-point-wrapper ${ID}-keypoint-wrapper" style="color: rgb(255, 255, 255); font-family: Arial; font-size: 12px; font-weight: normal; background-color: #0395CE; border: 1px solid #0395CE;">
      <span class="room-key-point after"><span style="font-weight: bold; color: #FFF;">NEW</span> Our best ever WiFi in partnership with Virgin included for the duration of your stay</span><div class="room-key-point-img before">
      <svg width="12" height="9" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.763 13.58a1.75 1.75 0 1 1 2.473 2.477 1.75 1.75 0 0 1-2.473-2.478v.001zM3.4 10.825c3.64-3.64 9.56-3.64 13.2 0l-1.65 1.65a7.007 7.007 0 0 0-9.9 0l-1.65-1.65zm-3.3-3.3c5.46-5.459 14.34-5.459 19.8 0l-1.65 1.65c-4.55-4.55-11.95-4.55-16.5 0L.1 7.526v-.001z" fill="#FFFFFF"/></svg></div></div>
  
  `;

	let roomKeyPoints = rateGroup.querySelectorAll(
		`.${ID}-wifi-card .room-key-point-container`
	);

	[].slice.call(roomKeyPoints).forEach((keyPoint) => {
		if (!keyPoint.querySelector(`.${ID}-keypoint-wrapper`)) {
			keyPoint
				.querySelector(".room-key-point-wrapper")
				.insertAdjacentHTML("afterend", newWifiLineHTML);
		}
	});

	// New Wifi symbol beside room name

	let newWifiSymbolHTML = `<svg class="${ID}-wifilogo" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.763 13.58a1.75 1.75 0 1 1 2.473 2.477 1.75 1.75 0 0 1-2.473-2.478v.001zM3.4 10.825c3.64-3.64 9.56-3.64 13.2 0l-1.65 1.65a7.007 7.007 0 0 0-9.9 0l-1.65-1.65zm-3.3-3.3c5.46-5.459 14.34-5.459 19.8 0l-1.65 1.65c-4.55-4.55-11.95-4.55-16.5 0L.1 7.526v-.001z" fill="#FFF"/></svg>`;

	let roomDetails = rateGroup.querySelectorAll(
		`.${ID}-wifi-card .room-details`
	);

	[].slice.call(roomDetails).forEach((detail) => {
		if (!detail.querySelector(`.${ID}-wifilogo`)) {
			detail.insertAdjacentHTML("beforeend", newWifiSymbolHTML);
		}
	});

	let currentSelectedButton = document.querySelector('.rate-btn.selected');
	currentSelectedButton.closest('.row').querySelector('.disc-rate-btn').classList.add('selected');
};

const addTracking = () => {
	document.body.addEventListener("click", (e) => {
		if (e.target.closest(".bookNow")) {
			fireEvent(
				`Click - Book Now button clicked with the user choosing: ${document.querySelector(".rate-btn.selected")
					? document
						.querySelector(".rate-btn.selected")
						.getAttribute("data-room-rate")
					: document
						.querySelector(".disc-rate-btn.selected")
						.getAttribute("data-room-rate")
				} ${document.querySelector(".rate-btn.selected")
					? document
						.querySelector(".rate-btn.selected")
						.getAttribute("data-roomname")
					: document
						.querySelector(".disc-rate-btn.selected")
						.getAttribute("data-roomname")
				} room with the ${document.querySelector(".rate-btn.selected")
					? document
						.querySelector(".rate-btn.selected")
						.getAttribute("data-rate-plan-code")
					: document
						.querySelector(".disc-rate-btn.selected")
						.getAttribute("data-rate-plan-code")
				} rate`,
				true
			);
		}

		if (e.target.closest(".rate-btn")) {
			fireEvent(
				`Click - Rate button clicked, user has selected a ${e.target
					.closest(".rate-btn")
					.getAttribute("data-room-rate")} ${e.target
						.closest(".rate-btn")
						.getAttribute("data-roomname")} room with the ${e.target
							.closest(".rate-btn")
							.getAttribute("data-rate-plan-code")} rate`,
				true
			);
		}

		if (e.target.closest(".disc-rate-btn")) {
			fireEvent(
				`Click - Rate button with included Wifi clicked, user has selected a ${e.target
					.closest(".disc-rate-btn")
					.getAttribute("data-room-rate")} ${e.target
						.closest(".disc-rate-btn")
						.getAttribute("data-roomname")} room with the ${e.target
							.closest(".disc-rate-btn")
							.getAttribute("data-rate-plan-code")} rate`,
				true
			);
		}
	});
};

export default () => {
	setup();

	fireEvent("Conditions Met");

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

	if (VARIATION !== "control" && window.Orion6 !== "DDM") {
		window.Orion6 = "DDM";
	}

	pollerLite([".rate-btn"], () => {
		let freeWifi = false;

		if (document.querySelector(".disc-rate-btn")) {
			if (
				document
					.querySelector(".disc-rate-btn")
					.closest(".discount-row")
					.querySelector(".disc-percent")
					.innerText.toLowerCase() == "new wifi included"
			) {
				freeWifi = true;
			}
		}

		if (freeWifi == true) {
			fireEvent(
				"Interaction - this is a page which qualifies for free wifi",
				true
			);
			if (VARIATION !== "control") {
				startExperiment();

				let allSwitchers = document.querySelectorAll(
					".js-switchExtraRooms"
				);

				[].slice.call(allSwitchers).forEach((switcher) => {
					switcher.addEventListener("change", (e) => {
						setTimeout(() => {
							processChanges(e.target.closest(".rateGroups"));
						}, 500);
					});
				});

				observer.connect(
					document.querySelector("#rebase > .rateGroups"),
					() => {
						setTimeout(() => {
							processChanges(
								document.querySelector("#rebase > .rateGroups")
							);
						}, 500);
					},
					{
						childList: true,
						subtree: true,
						attributes: true,
					}
				);
			}
		} else {
			fireEvent(
				"Interaction - this is not a page which qualifies for free wifi",
				true
			);
		}
	});
};
