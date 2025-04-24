/*eslint-disable */
/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import productGrid from './lib/html/product-grid'; 


// CBXXXClarisonicBulletpointstoImage - Experiment Title
const CBXXXClarisonicBulletpointstoImage = (() => {

	// Experiment code    
	const activate = () => { 
		document.body.classList.add('CBXXXCBI');
    
    console.log(productGrid);

		const container = document.querySelector('.content-product-block');
		const wrap = container.querySelector('.CBXXX-image');
		wrap.classList.add('cbxxx-product-grid');
		
    console.log(wrap); 
    wrap.innerHTML = productGrid;
  
	};
 
	// Audience conditions
	const triggers = (() => {
		// FullStory tagging
		utils.fullStory('CBXXXCBI', 'Variation 1');

		activate();
	});

	UC.poller([
		'.content-product-block > .CBXXX-image'
	], triggers);

})();
