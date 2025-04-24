import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// ID - Experiment Title
const MP064v2 = (() => {

	// Experiment code
	const activate = () => {
		document.body.classList.add('MP064v2');
	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('MP064', 'Variation 2');

		activate();
	})();

})();
