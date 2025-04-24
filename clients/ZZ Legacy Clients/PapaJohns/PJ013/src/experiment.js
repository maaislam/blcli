import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const PJ013 = (() => {   

	const activate = () => {
			document.body.classList.add('PJ013');

			const overlayOffer = () =>{
				const mainItems = document.querySelector('.menuItems');

				//change text of postcode box
				const postCodeBox = document.getElementById('ctl00_cphBody__objOffers_pnlPostCode');
				postCodeBox.querySelector('p').textContent = `All our stores have individual offers. To find out what's available, enter your postcode and find your local store`;

				//add overlay
				const overlay = document.createElement('div');
				overlay.classList.add('PJ013-overlay');
				overlay.innerHTML = '<div class="PJ013-text"><p>Enter your postcode to get the best deals and offers from your local store</p><span></span></div>';

				mainItems.appendChild(overlay);
			}
			overlayOffer();

			UC.observer.connect(document.getElementById('ctl00__objHeader_upOmnibar'), function() {
				if(!document.querySelector('.PJ013-overlay')){
					overlayOffer();
				}
			}, {
				config: {attributes: true, childList: true, subtree: false},
				throttle: 1000 
			});

	}

	// Audience conditions
	const triggers = ((options) => {
		UC.poller([
			'body',
			'.menuItems',
			'#ctl00_cphBody__objOffers_pnlPostCode',
		], () => {
			utils.fullStory('PJ013', 'Variation 1');
			activate();
		});
	})();

})();
