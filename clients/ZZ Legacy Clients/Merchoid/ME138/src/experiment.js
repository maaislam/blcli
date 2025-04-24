import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const ME138 = (() => {
	const activate = () => {
		document.body.classList.add('ME138');

		const runTest = () => {
			const country = merchoidDetectedCountry;

			const countries = {
				GB: {
					flagName: 'ME138-uk',
					countryName: 'UK'
				},
				US: {
					flagName: 'ME138-us',
					countryName: 'US'
				},
				CA: {
					flagName: 'ME138-ca',
					countryName: 'Canada'
				},
				DE: {
					flagName: 'ME138-de',
					countryName: 'Germany'
				},
				ES: {
					flagName: 'ME138-es',
					countryName: 'Spain'
				},
				FR: {
					flagName: 'ME138-fr',
					countryName: 'France'
				},
				AU: {
					flagName: 'ME138-au',
					countryName: 'Australia'
				},
				NL: {
					flagName: 'ME138-nl',
					countryName: 'Netherlands'
				}
			}

			//if the object matches the current country 
			for (const key in countries) {
				if (key === country) {
					const countryObj = countries[key];
					const newBanner = document.createElement('div');

					newBanner.classList.add('ME138-countryBar');
					newBanner.innerHTML = `
					<div class="ME138-exit">&times;</div>
					<div class="ME138-flag_side ${countryObj.flagName}"></div>
					<div class="ME138-textside">
						<p class="ME138-title">Welcome to Merchoid!</p>
						<p>You are now shopping our <span>${countryObj.countryName}</span> store</p>
					</div>`;

					const topOfpage = document.getElementById('wrapper');
					topOfpage.insertBefore(newBanner, topOfpage.firstChild);

					utils.events.send('ME138','Message shown','ME138 '+countryObj.countryName+' message shown',{sendOnce: true});
					//hide the box on exit
					const exitButton = document.querySelector('.ME138-exit');
					exitButton.addEventListener('click',() => {
						removeBox();
					});
				}
			}
		}
		
		//remove the box
		const removeBox = () => {
			const countryBox = document.querySelector('.ME138-countryBar');
			if (countryBox) {
				countryBox.parentNode.removeChild(countryBox);
				localStorage.setItem('ME138-BoxRemoved',1);
			}
		}
		const pageURL = window.location.href;
		const firstPageView = localStorage.getItem('ME138-intStores_first');
		const secondPageView = localStorage.getItem('ME138-intStores_second');
		const urlStored = localStorage.getItem('ME138-lastPage');


		//if landing page run the test, save the URL
		if (!firstPageView && !localStorage.getItem('ME138-BoxRemoved')){
			runTest();
			localStorage.setItem('ME138-lastPage', pageURL);
			localStorage.setItem('ME138-intStores_first', 1);
		}

		//if the url has been stored and the page does not match the landing page
		if (urlStored && urlStored !== pageURL && !localStorage.getItem('ME138-BoxRemoved')) {
      UC.poller([
        '#wrapper',
      ], () => {
        runTest();
			  localStorage.setItem('ME138-intStores_second', 1);
        setTimeout(() => {
          removeBox();
        }, 10000);
      });
		}
	}
	// Audience conditions
	const triggers = ((options) => {
		UC.poller([
      '.header-wrapper',
      '#wrapper',
      () => {
        return (typeof window.merchoidDetectedCountry !== 'undefined');
      },
		], () => {
			utils.fullStory('ME138', 'Variation 1');
			activate();
		});
	})();

})();
