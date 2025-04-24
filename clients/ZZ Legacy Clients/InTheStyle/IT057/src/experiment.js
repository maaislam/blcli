/* eslint-disable */ 
/*
* IMPORTANT!
* Do not edit this test directly in this platform
* Modify the src files in the experiments repository 
*/

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// IT057 - Experiment Title
const IT057 = (() => {

	let $ = null;

	// Experiment code
	const activate = () => {
		document.body.classList.add('IT057');

		// Check if is UK only
		const url = window.location.pathname;
		const urlMatches = url.match(/^\/\w{2}\//g);
		
		if (urlMatches) {
			return
		} 

 
		// Build HTML
		const build = () => {
			let html = `
				<div class="it57-delivery">
					<table>
						<tr>
							<th>delivery options</th>
						</tr>
						<tr>
							<td></td>
						</tr>
						<tr>  
							<td>UK Standard
								2-4 working day delivery <br />(&pound;3.99 for orders under &pound;50)
							</td>
							<td>FREE</td>
						</tr>
						<tr>
							<td>UK Next Day</td>
							<td>&pound;4.99</td>
						</tr>
						
						<tr>
							<td>UK Saturday Delivery</td>
							<td>&pound;4.99</td>
						</tr>
						<tr>
							<td>UK Sunday Delivery</td>
							<td>&pound;5.99</td>
						</tr>
					</table>
					<!--<p>Free UK shipping over &pound;60 applies to basket value after discount.</p>
					<p>If you are not available to accept delivery, the courier will attempt to leave your parcel with a neighbour.</p>-->
					<p><a class="it57-link" href="https://www.inthestyle.com/shipping-and-returns">See delivery terms for more information</a>.</p>
				</div>
			`;
 
			return html;
		};

		// New html 
		const el = build();
		const ref = document.querySelector('footer.site-footer .footer .footer-links');
		const mobileRef = document.querySelector('footer.site-footer .footer .footer-social');

		// Append HTML
		const append = (el, ref) => {
			ref.insertAdjacentHTML('afterbegin', el);
			
			// tracking
			utils.events.send('IT057', 'Delivery Options', 'Delivery options are displayed', {sendOnce: true});
		};


		append(el, ref);
		append(el, mobileRef);

		
		// Is in view
		const deliveryEl = document.querySelector('.footer-links > .it57-delivery');
		const mobileDeliveryEl = document.querySelector('.footer-collateral .it57-delivery');

		if (deliveryEl && window.getComputedStyle(deliveryEl, null).display == 'inline-block') {
			utils.viewabilityTracker(deliveryEl, function() {
				utils.events.send('IT057', 'Delivery element has been seen on desktop', {sendOnce: true});
			}, {
				removeOnView: true,
			});  
		}
		if (mobileDeliveryEl && window.getComputedStyle(mobileDeliveryEl, null).display == 'block') {
			utils.viewabilityTracker(mobileDeliveryEl, function() {
				utils.events.send('IT057', 'Delivery element has been seen on mobile', {sendOnce: true});
			}, {
				removeOnView: true,
			}); 
		} 

	};
 

	// Poller
	const poller = UC.poller([
		() => !!window.jQuery,
		".site-footer",
	], () => {
		
		$ = window.jQuery;

		triggers();
	});


	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('IT057', 'Variation 1');

		activate();
	});

})();
