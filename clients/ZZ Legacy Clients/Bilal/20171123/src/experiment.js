// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var _20171123 = (function() {

	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	var _activate = function() {
		// Namespace CSS
		document.body.className += ' Bilal20121123';
		console.log("Test");
	};


	/*--------------------------------------
	Activation
	---------------------------------------*/
	var _triggers = function(options) {
		utils.fullStory('ID', 'Variation 1');

		_activate();
	};


	// Run experiment
	_triggers();

})();
