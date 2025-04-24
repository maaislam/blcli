/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './shared';
import { events, logMessage } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  logMessage("HOF-188 - variation: "+settings.VARIATION);

  if(VARIATION == 2) {
  	
  	let placementTags = document.querySelectorAll('.rollUpQuickBuyWrap');
  	let iterator = 0;
  	[].slice.call(placementTags).forEach((placementTag) => {
  		iterator ++;
  		if(placementTag.querySelector('a')) {
  			let href = placementTag.querySelector('a').href;
			let linkID = `HOF-188-${iterator}-mca`;
			let html = `<div class='mc-holder'><a id="${linkID}" class="more-colours-available" href="${href}"> More Colours Available </a></div>`;
	  		placementTag.insertAdjacentHTML('beforebegin', html);

	  		let newLink = document.getElementById(linkID)

	  		newLink.addEventListener('click', () => {
	  			events.send(ID, `${settings.ID} Variation ${settings.VARIATION}`, `More Colours Available on PLP clicked by user to go to product page: ${href}`);
	  		});
  		}
		

  	});




  } 

};

