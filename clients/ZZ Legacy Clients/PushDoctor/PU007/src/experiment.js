import {poller} from '../../../../lib/uc-lib';
import {fullStory, events} from '../../../../lib/utils';
import getData from './lib/getData';

const PU007 = {
	activate: function() {
		// Setup
		const data = getData(window.location.pathname);
		const variation = (() => {
		const label = optimizely.get('state').getVariationMap()['10159852007'].name;
		//const label = 'Speed'; // Debugging only
			switch (label) {
				case 'Convenience':
				return 'V1';

				case 'Speed':
				return 'V2';

				case 'Trust':
				return 'V3';
			}
		})();
		if (!variation) return false;
		document.body.classList.add('PU007');

		// Change tagline
		data.changeText(variation);
	},

	triggers: function() {
		fullStory('PU007', 'Variation 1');
		poller([
			function() {
				try {
					return !!optimizely.get('state').getVariationMap()['10159852007'].name;
				} catch(e) {
				}
			}
		], () => this.activate.call(this));
	}
};

PU007.triggers();