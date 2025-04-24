/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import { poller } from '../../../../lib/uc-lib';
import { fullStory, events } from '../../../../lib/utils';

// IT049 - Mobile Basket Fix
const IT049 = (() => {

	const experiment = {
		cacheDOM: function($) {
			var elements = {};
			elements.body = document.body;
			elements.desktopBag = document.querySelector('.header-bag');
			elements.mobileBag = document.querySelector('.mobile-bag');

			return elements;
		},

		activate: function($) {
			// Setup
			const cacheDOM = this.cacheDOM($);
			const data = this.data;
			cacheDOM.body.classList.add('IT049');
		},

		triggers: function($) {
			var self = this;
			fullStory('IT049', 'Variation 1');
			poller([
				'.header-bag',
				'.mobile-bag'
			], () => self.activate.call(self, window.jQuery));
		}
	};


})();
