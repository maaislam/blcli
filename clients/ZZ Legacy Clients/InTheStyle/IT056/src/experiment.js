/* eslint-disable */
/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import exitIntent from './lib/exit-intent';

// IT056 - Experiment Title
const IT056 = (() => {

	// Experiment code
	const activate = () => {
		document.body.classList.add('IT056');

		let newCookie = utils.getCookie('visitedOnce');

		// Check if basket url
		const basketURL = window.location.pathname.match('checkout/cart');

		// Registration URL
		const regUrl = window.location.pathname.match('customer/account/create');

		// Create popup
		const popup = () => {
			let popupDiv = document.createElement('div');
			popupDiv.classList.add('it56-popup');
			const html = `
				<div class="it56-popup--container">
					<div class="it56-popup--wrap">	
						<div id="it56-close" class="it56-popup--close">
							<span></span>
							<span></span>
						</div>

						<div class="it56-popup--content">
							<div class="it56-popup--image"></div>

							<p>oh hey NEWBIE!</p>

							<h1>want 20% off your first order?</h1>

							<p>use code: WELCOME20 in your shopping bag</p>
							 
						</div>

						<div class="it56-popup--exclusions">
							<p>*Excludes sale. Valid only on first order.</p>
						</div>
					</div>
				</div>
			`;

			popupDiv.innerHTML = html;
			return popupDiv;

		};
		popup();

		if (!newCookie == true && !basketURL) 
		{
			let onExit = exitIntent(); 
			onExit.init(function(){
				// // Append popup
				const appendPopup = () => {
					let popupHTML = popup();
					document.body.appendChild(popupHTML);
					
					// event tracking
					utils.events.send('IT056', 'Popup', 'Popup has been displayed', {sendOnce: true});
				};
				appendPopup();  
				utils.setCookie('visitedOnce', true, 99999);
	
				const controlPopup = (() => {
					let closeBtn = document.querySelector('#it56-close');
					const popup = document.querySelector('.it56-popup');
					const popupWrap = document.querySelector('.it56-popup--wrap');
		
					// Close X
					if (popup) {
						closeBtn.addEventListener('click', function() {
							popup.parentNode.removeChild(popup);
						});
						// Outside of box
						popup.addEventListener('click', function() {
							popup.parentNode.removeChild(popup);
						});
						popupWrap.addEventListener('click', function(e) {
							e.stopPropagation();
						}); 
						// Escape key
						document.onkeydown = function(evt) {
							evt = evt || window.event;
							if (evt.keyCode == 27) {
								popup.parentNode.removeChild(popup);
							}
						};
					}
				})();
		 
			}, 'visitedOnce', 'https://www.inthestyle.com/');

		} // End If
		
		// if (regUrl) {
		// 	let onExit = exitIntent(); 
		// 	onExit.init(function(){
		// 		// // Append popup
		// 		const appendPopup = () => {
		// 			let popupHTML = popup();
		// 			document.body.appendChild(popupHTML);
					
		// 			// event tracking
		// 			utils.events.send('IT056', 'Popup', 'Popup has been displayed', {sendOnce: true});
		// 		};
		// 		appendPopup();  
		// 		utils.setCookie('visitedRegister', true, 99999);
	
		// 		const controlPopup = (() => {
		// 			let closeBtn = document.querySelector('#it56-close');
		// 			const popup = document.querySelector('.it56-popup');
		// 			const popupWrap = document.querySelector('.it56-popup--wrap');
		
		// 			// Close X
		// 			if (popup) {
		// 				closeBtn.addEventListener('click', function() {
		// 					popup.parentNode.removeChild(popup);
		// 				});
		// 				// Outside of box
		// 				popup.addEventListener('click', function() {
		// 					popup.parentNode.removeChild(popup);
		// 				});
		// 				popupWrap.addEventListener('click', function(e) {
		// 					e.stopPropagation();
		// 				});
		// 				// Escape key
		// 				document.onkeydown = function(evt) {
		// 					evt = evt || window.event;
		// 					if (evt.keyCode == 27) {
		// 						popup.parentNode.removeChild(popup);
		// 					}
		// 				};
		// 			}
		// 		})();
		 
		// 	}, 'visitedRegister', 'https://www.inthestyle.com/');

		// }
		
	 
	};

	// Poller
	const poller = UC.poller([
		() => !!window.jQuery,
		".nav-container",
	], () => {
		
		// $ = window.jQuery;

		triggers();
	});

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('IT056', 'Variation 1');

		activate();
	});  

})();
