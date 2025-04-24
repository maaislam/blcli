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
	let debug = false;
	let selector = '.register.row';
	if(debug == true) {
		selector = '.espot-container';
	}

	pollerLite([selector], () => {
		let registerRow = document.querySelector(selector);
		registerRow.classList.add(`${ID}-hidden`);
		let theHTML = ``;

		if (VARIATION == 1) {
			theHTML = `
			
				<div class="${ID}-consent">
			
					<div class="${ID}-consent--initial">
					<p> Please confirm you'd like to receive email updates from Travelodge by clicking the button below: </p>
					<button id="${ID}-receiveupdates" class="btn btn-secondary" data-target="#none">Receive Updates</button>
					</div>
					<div class="${ID}-consent--result">
						<svg fill="#008000" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><polygon points="437.3,30 202.7,339.3 64,200.7 0,264.7 213.3,478 512,94 "/></svg>
						<p> Thank you. You can now receive email updates from Travelodge. </p>        
					</div>
			
				</div>
			
			`;
		} else if (VARIATION == 2) {
			theHTML = `
			
				<div class="${ID}-consent">
			
					<div class="${ID}-consent--initial">
						<div class="${ID}-consent--initialsvg">
							<svg width="45" height="30" viewBox="0 0 45 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M35.2058 1.14576C34.5794 0.41563 33.6583 -0.00379906 32.6891 2.59355e-05H3.31107C2.43398 0.00333154 1.59384 0.34871 0.973616 0.961047C0.353389 1.57325 0.00357247 2.4027 7.53347e-05 3.26863V15.6068V15.6066C7.53347e-05 15.8334 0.122619 16.043 0.321503 16.1563C0.520387 16.2697 0.765468 16.2697 0.964359 16.1563C1.16324 16.043 1.28579 15.8334 1.28579 15.6066V3.2685C1.28632 3.00961 1.33829 2.75321 1.43873 2.51417L14.1378 13.125L1.43839 23.7361C1.33808 23.4968 1.28625 23.2404 1.28571 22.9815V18.1451C1.28571 17.9184 1.16317 17.7089 0.964284 17.5954C0.7654 17.4821 0.520319 17.4821 0.321428 17.5954C0.122544 17.7089 0 17.9185 0 18.1451V22.9815C0.00308036 23.8474 0.353039 24.6771 0.973267 25.2894C1.59349 25.9017 2.4339 26.2471 3.311 26.25H32.689C33.6578 26.2543 34.5791 25.8352 35.2053 25.1053C35.7177 24.5132 35.9994 23.7602 36 22.9815V3.26827C36.0009 2.48959 35.7192 1.73644 35.2058 1.14539L35.2058 1.14576ZM2.28305 1.55646C2.59337 1.37108 2.94854 1.27191 3.31107 1.2694H32.6891C33.0516 1.27204 33.4067 1.37134 33.7167 1.55685L20.4547 12.6388L20.1746 12.87V12.8701C19.5677 13.3815 18.7957 13.6622 17.9976 13.6617C17.1996 13.6612 16.428 13.3794 15.8216 12.8673L2.28305 1.55646ZM34.7142 22.9818C34.7136 23.2409 34.6617 23.4973 34.5611 23.7364L30.2048 20.0983C30.0288 19.9569 29.7904 19.9177 29.5775 19.9948C29.3645 20.0718 29.2085 20.2542 29.1668 20.4743C29.1253 20.6945 29.2043 20.9199 29.3748 21.0678L33.7167 24.694C33.4064 24.8793 33.0513 24.9785 32.6887 24.981H3.31072C2.94818 24.9785 2.59312 24.8792 2.28307 24.6937L15.147 13.9451C15.9576 14.5832 16.9635 14.9305 18.0001 14.9305C19.0367 14.9305 20.0427 14.5831 20.8531 13.9451L27.414 19.4236L27.4141 19.4235C27.5901 19.5647 27.8283 19.604 28.0412 19.5269C28.2541 19.4497 28.41 19.2675 28.4517 19.0475C28.4933 18.8273 28.4144 18.6019 28.2441 18.4542L21.8608 13.1239L34.5615 2.51377V2.51391C34.6619 2.7531 34.7137 3.0095 34.7142 3.26851L34.7142 22.9818Z" fill="#0785C2"/>
							<rect x="25.3125" y="5.0625" width="19.125" height="24.375" rx="2.4375" fill="#F6F6F6" stroke="#0785C2" stroke-width="1.125"/>
							<circle cx="28.875" cy="10.125" r="1.125" fill="#0785C2"/>
							<circle cx="28.875" cy="15.375" r="1.125" fill="#0785C2"/>
							<circle cx="28.875" cy="21.375" r="1.125" fill="#0785C2"/>
							<path d="M31.5 9.375H42" stroke="#0785C2" stroke-width="0.75" stroke-linecap="round"/>
							<path d="M31.5 10.875H36.75" stroke="#0785C2" stroke-width="0.75" stroke-linecap="round"/>
							<path d="M31.5 14.625H42" stroke="#0785C2" stroke-width="0.75" stroke-linecap="round"/>
							<path d="M31.5 16.125H36.75" stroke="#0785C2" stroke-width="0.75" stroke-linecap="round"/>
							<path d="M31.5 20.625H42" stroke="#0785C2" stroke-width="0.75" stroke-linecap="round"/>
							<path d="M31.5 22.125H36.75" stroke="#0785C2" stroke-width="0.75" stroke-linecap="round"/>
							</svg>
						</div>
						<div class="${ID}-consent--initialcontent">
							<h2>Updates, offers and important information</h2>
							<p> Please confirm that you would like to receive email updates from Travelodge by clicking the button below </p>
							<button id="${ID}-receiveupdates" class="btn btn-secondary" data-target="#none">Receive Updates</button>
						</div>
					
					</div>
					<div class="${ID}-consent--result">
						<svg fill="#008000" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><polygon points="437.3,30 202.7,339.3 64,200.7 0,264.7 213.3,478 512,94 "/></svg>
						<p> Thank you. You can now receive email updates from Travelodge. </p>        
					</div>
			
				</div>
			
			`;
		}

		registerRow.insertAdjacentHTML('beforebegin', theHTML);

		document.getElementById(`${ID}-receiveupdates`).addEventListener('click', (e) => {
			document.querySelector(`.${ID}-consent`).classList.add(`${ID}-complete`);

			let emailAddress = window.globalDataLayer.bookerEmail;
			emailAddress = encodeURIComponent(emailAddress);
			let data = 'subscription%5Bemail%5D=' + emailAddress;
			let currentGetProductsXhr = $.ajax({
				cache: true,
				type: 'POST',
				url: '/api/v1/subscription',
				dataType: 'text',
				data: data,
				success: function (returnedData) {
					window.DY.API("event", {
						name: "Newsletter Subscription",
						properties: {
							subscription: `newsletter-subscription-v${VARIATION}`,
						}
					});

					fireEvent('Click - user clicked receive updates button and was subscribed to the email list', true);
				},
				error: function (xhr, textStatus, errorThrown) {
					if (textStatus != 'abort') console.log(xhr);
					console.error(textStatus + errorThrown);
				},
				complete: function (data) {
					currentGetProductsXhr = null;
				}
			});
		});
	});
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

		document.body.addEventListener('click', (e) => {

			if (e.target.closest('.register.row')) {
				fireEvent('Click - user clicked register button', true);
			}

		});

		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	if(getCookie('redwp') !== "J") {
		startExperiment();
		fireEvent(`Interaction - cookie redwp does not contain J, so experiment is started`, true);
	} else {
		fireEvent(`Interaction - cookie redwp contains J, so experiment not started`, true);
	}
	
};
