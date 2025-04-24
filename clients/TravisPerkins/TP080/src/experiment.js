// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const TP080 = (() => {
	let slideQ = false,
		$;

	const UCPoller = (() => {
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'#monetate_endcap_faffd901',
			'.yCmsContentSlot.inspirational_container',
			() => {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], init);
	})();

	function init(){
		utils.fullStory('TP080', 'Variation 1');
		//utils.events.send('TP080', 'Category', 'Action', true, 6, 'Non-Trade');
		//utils.events.send('TP080', 'Category', 'Action', true);

		const cacheDom = (() => {
			//Cache useful selectors for later use
			const bodyVar = document.querySelector('body');

			bodyVar.classList.add('TP080');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar
			};
		})();

		const moveElements = {
			run(){
				$('#monetate_endcap_faffd901').insertAfter('.yCmsContentSlot.inspirational_container').wrap('<div class="TP080_hot-wrap"></div>');

				let userName = $('.sessioncamhidetext').text();
				userName = $.trim(userName.replace('Welcome', ''));

				$('.yCmsComponent.tpCarousel').after(`
					<section class="TP080_">
					</section>
				`);
			}
		};

		moveElements.run();
	}	
})();