/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// CheckoutChangesApp - Experiment Title
const CheckoutChangesApp = (() => {

	

	// Experiment code
	const activate = () => {
		document.body.classList.add('CheckoutChangesApp');

		let fromApp = utils.getUrlParameter('utm_medium'); // Either app || null
		let visited = utils.getCookie('userFromApp'); // Either undefined || true

		if (visited !== 'true' && fromApp == null) {
			return
		}
 
		if (fromApp == 'app' || visited == 'true') {
			
			// Tracking
			utils.events.send('CheckoutChangesApp', 'Experiment working', 'User has come from the mobile app', {sendOnce: true});
			
			// For testing on mobile devices
			// alert('Checkout Changes');

			const hideElements = (() => {
				let primNav = document.querySelectorAll('.header-container .header-primary ul.icons li a');

				if (primNav) {
					for (let i = 0; primNav.length > i; i++) {
						primNav[i].classList.add('cca-hide');
					}
				}
			})();


			const disableElement = (() => {
				let promoBanner = document.querySelector('.inner-wrap > .wrapper-banner-container');
				let accountIcon = document.querySelector('ul.icons li.mobile-user a.link-user');

				promoBanner.addEventListener('click', function(e) {
					utils.events.send('CheckoutChangesApp', 'Click', 'User attempted to click on the promo banner', {sendOnce: true});
					e.preventDefault();
				});
				accountIcon.addEventListener('click', function(e) {
					utils.events.send('CheckoutChangesApp', 'Click', 'User attempted to click on the account icon', {sendOnce: true});
					e.preventDefault();
				});	
			})();


			/*
			*	Set cookie so experiment runs on all pages
			*	after leaving the application
			*/
			utils.setCookie('userFromApp', 'true', 99999);

		}
	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('CheckoutChangesApp', 'Variation 1');

		activate();
	});

	// Poll elements required for *all* tests
	const poller = UC.poller([
		() => !!window.jQuery,
	], () => {
		 

		triggers();
	});

})();
