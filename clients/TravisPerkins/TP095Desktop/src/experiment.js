/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository
 */

/* eslint-disable */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// TP095 - Experiment Title
const TP095 = (() => {

	// Experiment code
	const activate = () => {
    if (document.body.classList.contains('TP095V1') || document.body.classList.contains('TP095V2')){
      return false;
    } else {
      var variation = 2;
      if(variation == 1){
        document.body.classList.add('TP095V1');
      }
      else{
        document.body.classList.add('TP095V2');
      }
      utils.events.send('TP095', 'View', `TP095 activated - Variation ${variation}`, { sendOnce: true });
    }
	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('TP095', 'Variation 1');

		activate();
	})();
})();
