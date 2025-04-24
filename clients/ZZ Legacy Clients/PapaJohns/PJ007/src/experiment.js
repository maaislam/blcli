import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as content from './lib/PJ007-html.js';

const PJ007 = (() => {
    let $ = null;
    const activate = () => {
        const $body = $('body');
		$body.addClass('PJ007');
		
		const runChange = () =>{
			const pageContent = document.getElementById('ctl00_cphBody_pnlMain'),
			miniBannerhtml = content.miniBannerMarkup,
			offerBanner = document.querySelector('.homeCarousel.mobile768'),
			postCodeFinder = document.getElementById('ctl00_cphBody_pnlGetStartedMobile'),
			postcodeBox = document.getElementById('ctl00_cphBody_txtPostcodeMobile'),
			collectCTA = document.getElementById('ctl00_cphBody_lbCollectionMobile'),
			deliverCTA =document.getElementById('ctl00_cphBody_lbDeliveryMobile');
			/*------------
			//Mini Banner
			------------*/
			const newBanner = document.createElement("div");
			newBanner.classList.add('PJ007-miniBanner');
			newBanner.innerHTML = miniBannerhtml;
			pageContent.insertBefore(newBanner, pageContent.firstChild);

			/*------------
			//Move postcode finder up
			------------*/
			postCodeFinder.parentNode.insertBefore(offerBanner, postCodeFinder.nextSibling);

			/*------------
			//events
			------------*/
			postcodeBox.addEventListener('keydown', (event) => {
				utils.events.send('PJ007', 'Postcode enter', 'PJ007 Postcode typed', {
					sendOnce: true
				});
			});
			collectCTA.addEventListener('click', (event) => {
				utils.events.send('PJ007', 'Collect click', 'PJ007 collection clicked', {
					sendOnce: true
				});
			});
			deliverCTA.addEventListener('click', (event) => {
				utils.events.send('PJ007', 'Delivery click', 'PJ007 deliver to me clicked', {
					sendOnce: true
				});
			});
			
		}
		runChange();

		setInterval(function(){
			const errorMessage = $('#ctl00_cphBody_pnlPostCodeErrorMobile');
			if(errorMessage.length){

				if(errorMessage.hasClass('PJ007-errorShown')){
					return;
				} 
				runChange();
				errorMessage.addClass('PJ007-errorShown');
				errorMessage.insertAfter('#ctl00_cphBody_pnlGetStartedMobile');
			}
		},250);
			
    };

    // Audience conditions
    const triggers = ((options) => {
        UC.poller([
			'#ctl00_cphBody_pnlGetStartedMobile',
			'.homeCarousel.mobile768',
			'#ctl00_cphBody_pnlMain',
            () => {
                return !!window.jQuery;
            }
        ], () => {
			$ = window.jQuery;
			utils.fullStory('PJ007', 'Variation 1');
			activate();
		});
    })();

})();
