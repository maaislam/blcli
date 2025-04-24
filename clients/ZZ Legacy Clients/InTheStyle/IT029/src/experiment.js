/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// IT029 - Experiment Title
const IT029 = (() => {

	// Experiment code
	const activate = () => {
		document.body.classList.add('IT029');

		const interSizes = () => {
			// Create another size link
			let sizeLink = `
				<div class="IT29-inter-sizes">
					<p class="product-size-guide"> 	
						<a href="#" data-reveal-id="sideGuideModal">Change to International Sizes</a>
					</p>
				</div>
			`;

			let sizeRef = document.querySelector('.product-options-bottom .add-to-cart');

			sizeRef.insertAdjacentHTML('beforeend', sizeLink);

		}

		interSizes(); 

		// Add GA Tracking
		const tracking = () => {
			let interLink = document.querySelector('.IT29-inter-sizes p.product-size-guide a');
			utils.events.send('IT029', 'Click', 'Used the change to international sizes button', {sendOnce: true});
		}

		tracking();

	};

	// Audience conditions
	const triggers = (options) => {
		// FullStory tagging
		utils.fullStory('IT029', 'Variation 1');

		activate();
	};

	// -----------------------------------------------------------
	// Poll elements required for *all* tests
	// -----------------------------------------------------------
	const poller = UC.poller([
		() => !!window.jQuery,
		".catalog-product-view .product-shop"
	], () => {
		
		// $ = window.jQuery; 

		triggers();
	});

})();
