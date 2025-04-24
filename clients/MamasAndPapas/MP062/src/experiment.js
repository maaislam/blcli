/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// ID - Experiment Title
const MP062 = (() => {

	// Experiment code
	const activate = () => {
		document.body.classList.add('MP062');
		let $ = window.jQuery;

		function deliveryMain(){
			let pushChairMessage = document.createElement('div');
				pushChairMessage.classList.add('MP062-pushchairMessage');
				pushChairMessage.innerHTML = "<span>Buy this pushchair today with flexible delivery options meaning you take delivery when you're ready</span>";

			let productDetail = document.querySelector('.productDetail_description');
			productDetail.after(pushChairMessage);

		}
		function deliveryAccordion(){
			let pushChairMessageBottom = document.createElement('div');
				pushChairMessageBottom.classList.add('MP062-pushchairMessageBottom');
				pushChairMessageBottom.innerHTML = "<span>Buy this pushchair today with flexible delivery options meaning you take delivery when you're ready</span>";
			
				let deliveryAccordion = document.querySelector('.deliveryinfopanel');
				deliveryAccordion.appendChild(pushChairMessageBottom);
		}
		deliveryMain();
		deliveryAccordion();

	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('MP062', 'Variation 1');

		activate();
	})();

})();
