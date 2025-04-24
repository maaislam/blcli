/*eslint-disable */
/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import strings from './lib/config';
// import newCookie from './lib/cookie';

let VARIATION = null; 
if(typeof TG34VARIATION != 'undefined') { 
	VARIATION = TG34VARIATION; 
} else { 
	VARIATION = 1; 
}

// TG034 - Experiment Title
const TG034 = (() => {
	
	// Experiment code
	const activate = () => {
		document.body.classList.add('TG034');

		// Get current cookie 
		let currentCookie = document.querySelector('#cookiepolicy-dropdown');

		

		/*
		*	Language translations
		*
		*/		
		let firstTrans = null;
		let secondTrans = null;
		let thirdTrans = null;
		const langTrans = () => {
			let url = window.location.pathname.match(/^\/(\w+)\//)[1];
			let lang = strings;
			if (VARIATION == 2) {
				if (url == 'it') {
					firstTrans = lang.var2.tell_us.it;
					secondTrans = lang.var2.business_equipment.it;
					thirdTrans = lang.var2.home_equipment.it;
				} else {
					firstTrans = lang.var2.tell_us.en;
					secondTrans = lang.var2.business_equipment.en;
					thirdTrans = lang.var2.home_equipment.en;
				}
			} else if (VARIATION == 1) {
				if (url == 'it') {
					firstTrans = lang.var1.tell_us.it;
					secondTrans = lang.var1.business_equipment.it;
					thirdTrans = lang.var1.home_equipment.it;
				} else {
					firstTrans = lang.var1.tell_us.en;
					secondTrans = lang.var1.business_equipment.en;
					thirdTrans = lang.var1.home_equipment.en;
				}
			}
		};
		langTrans();

		// Bring in new cookie HTML
		// let cookieHTML = newCookie();
		let cookieHTML = `
			<div class="tg34-cookie-wrap">
				<div class="tg34-cookie-form">
					<form>
						<div class="tg34-ib">
							<label>${firstTrans}:</label>
						</div>

						<div class="tg34-ib">
							<input type="radio" name="business" value="business" id="tg34-business">
							<label for="tg34-business">${secondTrans}</label>
						</div>

						<div class="tg34-ib">
							<input type="radio" name="personal" value="personal" id="tg34-personal">
							<label for="tg34-personal">${thirdTrans}</label>
						</div>
						
						<div class="tg34-ib">
							<input id="tg34-submit" type="submit" value="OK">
						</div>

					</form>
				</div>
			</div>
		`;

		/*
		*	Variation 1 functions 
		*/
		const getCookie = () => {
			let cookieContainer = null;
			if (currentCookie) {
				// Store the 'block-cookiepolicy'
				cookieContainer = currentCookie.childNodes[1];
			}
			return cookieContainer;
		};
		
		const buildNewCookie = () => {
			let thisCookieWrap = getCookie();

			let cookieCopy = thisCookieWrap.cloneNode();
			cookieCopy.classList.add('tg34-new-cookie');
			// Empty cookie wrap
			cookieCopy.innerHTML = "";

			// Add new cookie HTML
			cookieCopy.innerHTML = cookieHTML;
			
			// Append new cookie
			currentCookie.appendChild(cookieCopy);
		};
		buildNewCookie();


		// New click events
		const onclicks = () => {
			const targetOK = document.querySelector('#cookies-ok');

			let inputs = document.querySelectorAll('.tg34-new-cookie .tg34-cookie-form input');
			inputs = [...inputs];
			inputs.forEach(element => {
				element.addEventListener('click', function() {
					targetOK.click();
				});
			});
			
		};
		onclicks();


		/*
		*	Variation 2 functions below,
		*	this also includes all the
		*	functions above.
		*/
		let okBtn =	document.querySelector('.tg34-cookie-form #tg34-submit');
		const removeElements = () => {
			okBtn.parentNode.removeChild(okBtn);
		};

		const cookieEdits = () => {
			const cookieWrap = document.querySelector('.tg34-new-cookie');
			cookieWrap.classList.add('tg34-var2');

			const prefixString = "OK, "
		};

		if (VARIATION == 2) {
			removeElements();
			cookieEdits();
		}

		/*
		*	Add GA event tracking to 
		*	show when cookie message is 
		*	displayed
		*/ 
		const tracking = (() => {
			let businessBtn = document.querySelector('.tg34-cookie-form #tg34-business');
			let personalBtn = document.querySelector('.tg34-cookie-form #tg34-personal');

			businessBtn.addEventListener('click', function() {

				var trackerName = window.ga.getAll()[0].get('name');

				window.ga(trackerName + '.send', 'event', 'Technogym User Type', 'Submit', 'User Type Dimension', {
						nonInteraction: true,
						dimension9: 'User Type = Business'
				});

				utils.setCookie('userType', 'business', 99999, 'technogym.com');
			});

			personalBtn.addEventListener('click', function() {

				var trackerName = window.ga.getAll()[0].get('name');

				window.ga(trackerName + '.send', 'event', 'Technogym User Type', 'Submit', 'User Type Dimension', {
						nonInteraction: true,
						dimension9: 'User Type = Personal'
				});

				utils.setCookie('userType', 'personal', 99999, 'technogym.com');
			});

			okBtn.addEventListener('click', function() {
				utils.events.send('TG034', 'Click', 'Selected OK button');
			});

		})();


 
	};

	// Poller
	const poller = UC.poller([
		() => !!window.jQuery,
		"#cookiepolicy-dropdown",
	], () => {
		
		$ = window.jQuery;

		triggers();
	});
	

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('TG034', 'Variation 1');

		activate();
	});

})();
