/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// ID - Experiment Title
const ID = (() => {

	// Experiment code
	const activate = () => {
		document.body.classList.add('SD052');
		let $ = window.jQuery;

		const stickNav = $('#sticky_navigation');
		stickNav.removeAttr("style");

		//move logo out of the header
		let $header = $('#header'),
			$headerLogo = $header.find('.page-header-container > div:first');

		$headerLogo.insertBefore($header);

		//move search/basket before the header
		$header.find('#header-search').prependTo($header);
		$header.find('#header-shop-cart').prependTo($header);

		$header.find('.skip-links .skip-link.skip-nav').click(function(){
			utils.events.send('SD052', 'Clicked mobile nav', 'SD052 V1 navigation opened', {
				sendOnce: true
		});

			//on nav click go to the top
			if($('#sticky_navigation .skip-content').hasClass('skip-active')){
				$('.top-left-icons .skip-link.skip-nav.skip-active').click(function(){
					window.scrollTo(0, 0);
				});

			}
		});

		const $countdown = $('#header-timer-div');
		if($countdown.length){
			$countdown.insertAfter($headerLogo);
		}



	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('SD052', 'Variation 1');

		UC.poller(['#header','.skip-links .skip-link.skip-nav','#sticky_navigation'], activate);
	})();

})();
