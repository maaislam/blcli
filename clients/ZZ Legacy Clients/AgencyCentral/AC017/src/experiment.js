/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import { poller } from '../../../../lib/uc-lib';

// AC017 - Search Wording
const AC017 = (() => {

	// Experiment code
	const activate = () => {
		document.body.classList.add('AC017');

		var users = document.getElementById('input-user-type-selector-dropdown');
		users.querySelector('[data-value="emp"] span').innerText = 'An employer';
		users.querySelector('[data-value="cnd"] span').innerText = 'A candidate';
	};

	// Audience conditions
	const triggers = ((options) => {
		poller([
			'#input-user-type-selector-dropdown'
		], activate);
	})();

})();
