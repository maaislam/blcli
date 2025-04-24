import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// ID - Experiment Title
const ID = (() => {

	// Experiment code
	const activate = () => {
		document.body.classList.add('CBXXXclarisonic');
		const $ = jQuery;

		const URL = window.location.pathname,
			  productBulletPoints = $('.content-product-block .bullet-points');

		if(URL.indexOf('clarisonic-plus-face-and-body-cleanser.html') > -1){
		const newImage = $('<div class="CBXXX-image"><a href="https://www.currentbody.com/clarisonic"><img alt="" src="https://www.currentbody.com/media/wysiwyg/Cla-comp-chart-plus.jpg" /></a></div>');
			  newImage.insertBefore(productBulletPoints);
		}
	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('CBXXX', 'Variation 1');

		activate();
	})();

})();
