/*eslint-disable */
/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import newPopup from './lib/nh014';


let VARIATION = null;
if(typeof NH19VARIATION != 'undefined') {
    VARIATION = NH19VARIATION;
} else {
    VARIATION = 1;
}  

utils.events.setTrackerName('tracker2');


// NH019 - Experiment Title
const NH019 = (() => {
  
  let $ = null; 

	// Poll for els
	const poller = UC.poller([
		() => !!window.jQuery,
		"#divQuickviewPopup",
		'.seat-area',
		'.btn-book-now',
		'.btn-more-info'  
	], () => {
		
		$ = window.jQuery;
 
		triggers();
	});


	// Experiment code
	const activate = () => {
    document.body.classList.add('NH019');
    
    const popup = newPopup;       

		let resultItems = document.querySelectorAll('.search-content .result-item');
		for (let i = 0; resultItems.length > i; i++) {
			let bookNowBtn = resultItems[i].querySelector('.result-content .buttons a.btn-book-now');
			let quickViewBtn = resultItems[i].querySelector('.result-content .details > ul > li a.quick-view');
			bookNowBtn.addEventListener('click', function(e) {
				e.preventDefault();
				if (VARIATION == 1) {
					quickViewBtn.click();
				} 
				if (VARIATION == 2) {
					let href = this.getAttribute('href');
					let win = window.open(href, '_blank');
					win.focus();
				}
			});
		}
		
		
		const tracking = (() => {
			let contBooking = document.querySelector('#divQuickviewPopup .columns .buttons a.btn-book-now');
			let moreInfo = document.querySelector('#divQuickviewPopup .columns .buttons a.btn-more-info');

			contBooking.addEventListener('click', function() {
				utils.events.send('NH019', 'Click', 'Used the book now button in the lightbox', {sendOnce: true});
			});

			moreInfo.addEventListener('click', function() {
				utils.events.send('NH019', 'Click', 'Used the more info button in the lightbox', {sendOnce: true});
			});

		})();
	};



	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('NH019', 'Variation 1');

		activate();
	});

})();
