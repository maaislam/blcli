import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// ID - Experiment Title
const ID = (() => {

	// Experiment code
	const activate = () => {
		document.body.classList.add('CBXXXclarisonicsmart');
		const $ = jQuery;

		const URL = window.location.pathname,
			  productBulletPoints = $('.content-product-block .bullet-points');

		if(URL.indexOf('clarisonic-smart-profile.html') > -1){
		const newImage = $('<div class="CBXXX-image"><a href="https://www.currentbody.com/clarisonic"><img alt="" src="https://www.currentbody.com/media/wysiwyg/Cla-comp-chart-smart.jpg" /></a></div>');
			  newImage.insertBefore(productBulletPoints);
		}
	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('CBXXXsmartprofile', 'Variation 1');

		activate();
	})();

})();
