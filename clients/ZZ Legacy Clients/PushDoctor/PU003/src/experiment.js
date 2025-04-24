/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import {poller} from '../../../../lib/uc-lib';
import {fullStory} from '../../../../lib/utils';
//import funnelTest2 from './lib/funnelTest';
import getData from './lib/getData';
import setup from './lib/setup';

// PU003 - Personalised Funnels
const PU003 = (() => {
	const ID = 'PU003';

	/*
	 * PU003
	 */
	const activate = () => {	
		/*
		 * Returns an object with all personalisation data for this funnel
		 */
		const data = (() => {
			const referrer = document.referrer;
			let funnel;
			//let funnel = 'walkIn'; // Debug ONLY - TODO: Delete thise
			
			if (referrer.indexOf('walk-in') > -1) {
				funnel = 'walkIn';
			} else if (referrer.indexOf('sick-note') > -1) {
				funnel = 'sickNote';
			} else if (referrer.indexOf('prescription') > -1) {
				funnel = 'prescription';
			}

			if (funnel) {
				document.body.classList.add(`PU003_${funnel}`);
				return getData(funnel);
			}
		})();

		/*
		 * Cache DOM elements
		 */
		const elements = (() => {
			const headings = document.querySelectorAll('section[ng-show="!appointmentNoLongerAvailable"] h1');
			const headingContainer = headings[0].parentElement;
			const reviewContainer = document.querySelector('.trustPilotLogo').parentElement.parentElement;
			
			return {
				headings,
				headingContainer,
				reviewContainer,
			};
		})();

		/*
		 * Create new components
		 */
		const components = {
			usps: (() => {
				// Container
				const ul = document.createElement('ul');
				ul.classList.add('PU003_USP');
				
				// USPs
				const usps = data.usps;
				for (let i = 0; i < usps.length; i++) {
					const usp = usps[i];
					const li = document.createElement('li');
					li.innerHTML = `<p>${usp}</p>`;
					ul.appendChild(li);
				}
				
				return ul;
			})(),

			review: (() => {
				const div = document.createElement('div');
				div.innerHTML = 
				`<div class="PU003_review">
					<div class="trustPilotLogo"></div>
					<div class="PU003_review__wrap">
						<p class="PU003_review__content">"${data.review.content}"</p>
						<p class="PU003_review__user">${data.review.name} ${data.review.location}</p>
					</div>
				</div>`;

				return div.childNodes[0];
			})(),
		};


		/* --------------------------------------
		 * Cleanup - Remove components that have persisted
		 * through page changes
		 * ------------------------------------*/
		
		 // USPs
		var usps = document.querySelector('.PU003_USP');
		if (usps) {
			usps.parentNode.removeChild(usps);
		}


		/* --------------------------------------
		 * Render 
		 * ------------------------------------*/

		// Headings
		elements.headings.forEach((element) => {
			element.innerText = data.headline;
		});

		// USPs
		elements.headingContainer.appendChild(components.usps);

		/*
		 * If minutes ID exists, make request to Push Doctor API and update
		 * element to include minutes to appointment
		 */
		function ajaxRequest(url, successCb) {
			var request = new XMLHttpRequest();
			request.open('POST', url, true);
			request.setRequestHeader('Content-Type', 'application/json');
			request.setRequestHeader('Accept', 'application/json');
			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					if (successCb) {
						successCb(request.responseText);
					}
				}
			};

			request.send();
		}

		const appointmentTimeEl = document.getElementById('PU007_appointmentTime');
  	if (appointmentTimeEl) {
			ajaxRequest('https://svcs.pushsvcs.com/general.svc/generalW/GetHomeMessage', (response) => {
				var json = JSON.parse(response);
				var strTop = json.GetHomeMessageResult.strTop;
				const mins = strTop.match(/\d+/);
				let content;
				if (mins) {
					content = `in the next ${mins[0]} minutes`;
				} else {
					switch (strTop) {
						case 'Book an appointment today':
						content = 'today';
						break;
						
						case 'We’re open at 6am, book now':
						content = 'from 6am';
						break;
	
						default:
						/*
						 * String response was unexpected. 
						 * Change to a generic tagline and report error to GA
						 */
						event.send('PU007', 'error', 'Change to generic tagline - AJAX response was unexpected.');
						break;
					}
				}
				
				appointmentTimeEl.innerHTML = content;
			});
		}

		// Review
		elements.reviewContainer.innerHTML = '';
		elements.reviewContainer.appendChild(components.review);
	};

	const triggers = ((options) => {
		const experiment = setup(ID);

		/*
		* Funnel Test 2
		* Modified version of Variation 2 Blue
		*/
		//funnelTest2(ID);

		/*
		 * Setup
		 */
		document.body.classList.add('PU003');
		fullStory(ID, 'Variation 1');

		if (/pushdoctor\.co\.uk\/see-a-doctor-2\/select-time/.test(window.location.href)) {
			experiment.pollers.push(
				poller([
					'body',
					'section[ng-show="!appointmentNoLongerAvailable"] h1',
					'.trustPilotLogo'
				], activate)
			);
		}
	})();

})();
