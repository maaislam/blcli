/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, getPageData } from './services';
import { addPoller, addEventListener, addObserver } from './winstack';
import { logMessage, pollerLite, observer } from '../../../../../lib/utils';
import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
let currHref = window.location.href;
const listeners = [];

const makePageChanges = () => {

	logMessage('toggle selector hidden - variation: 1');

	pollerLite(['listing-size'], () => {

		let toggleSelector = document.querySelector('listing-size');

		toggleSelector.classList.add('hidden');

		toggleSelector.nextElementSibling.classList.add('full-width');

	});

	

}

const addEventTracking = () => {

	if(listeners) {
		listeners.forEach(l => {
		  l[1].removeEventListener('click', l[0]);
		});
	}

	pollerLite(['.grid.m-t'], () => {

		logMessage('tracking added - variation: '+VARIATION);

		let productGrid = document.querySelector('.grid.m-t');

		

	 	let listener = productGrid.addEventListener('click', (e) => {
	 		let clickTarget = e.target;
	 		let closestProduct = clickTarget.closest('product');
	 		let firstLink = closestProduct.querySelector('a');
	 		let href = firstLink.getAttribute('href');

	 		let message = "Click - item clicked on - destination URL: "+href;
	 		logMessage(message);
	 		fireEvent(message);
	 	});

	 	listeners.push([listener, productGrid]);

	});

}

export default () => {
	setup();

	logMessage(ID + " Variation: "+VARIATION+" - started");

	if(document.querySelector('listing-size')) {

		

		if(VARIATION == 1 && !document.documentElement.classList.contains(`${ID}-active`)) {
			logMessage("v1, adding events, making page changes");
			document.documentElement.classList.add(`${ID}-active`);
			makePageChanges();
			addEventTracking();
			let eventMessage = 'Conditions Met - page altered, tracking added';
			logMessage(eventMessage);
			fireEvent(eventMessage);

		} else if (VARIATION == 2 && !document.documentElement.classList.contains(`${ID}-active`)) {
			logMessage("control, adding events");
			document.documentElement.classList.add(`${ID}-active`);
			addEventTracking();
			let eventMessage = 'Conditions Met - page not altered, tracking added';
			logMessage(eventMessage);
			fireEvent(eventMessage);

		}

		currHref = window.location.href;

		// Trigger re render on pagniation change
		// the re-render only adds a single observer due to the way the spa runs
		// the observer checks to see if there is an active event already to get
		// around the fact that sitegainer runs it twice
		if(!document.documentElement.classList.contains(`${ID}-observer-added`)) {

			logMessage("observer added first time");

			const wrap = document.body;
	        observer.connect(wrap, (e) => {

	        	logMessage("observer event");
	        	makePageChanges();
	        	document.documentElement.classList.add(`${ID}-observer-added`);

	            if(currHref !== window.location.href) {
	            	document.documentElement.classList.remove(`${ID}-active`);

	            }

	        }, {
	            config: {
	              attributes: true,
	              childList: true,
	              subtree: false,
	            }
	        })


		}
        
	} else {
		logMessage('not the correct page type');
	}

		



	

  
  
};
