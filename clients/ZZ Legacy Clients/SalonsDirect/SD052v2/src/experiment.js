/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// ID - Experiment Title
const SD052v2 = (() => {

	// Experiment code
	const activate = () => {
		document.body.classList.add('SD052v2');
		let $ = window.jQuery;

		//move logo out of the header
		let $header = $('#header'),
			$headerLogo = $header.find('.page-header-container > div:first'),
			$countdown = $('.header-countdown');

		$headerLogo.insertBefore($header);
		$countdown.insertAfter($headerLogo);

		//move search/basket before the header
		$header.find('#header-search').prependTo($header);
		$header.find('#header-shop-cart').prependTo($header);

		//put menu in the middle
		const menuIcon = $('.top-left-icons'),
			  menuNav = menuIcon.find('.skip-link.skip-nav');

			
			menuNav.insertAfter('.skip-link.skip-search');

		menuNav.click(function(){
			utils.events.send('SD052', 'Clicked mobile nav', 'SD052 V2 navigation opened', {
				sendOnce: true
			});


			if(!$('#header-nav').hasClass('skip-active')){
					window.scrollTo(0, 0);
			}
		});

	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('SD052', 'Variation 2');

		UC.poller(['#header','.skip-links .skip-link.skip-nav'], activate);
	})();

})();
