/* eslint-disable */
/*
* IMPORTANT!
* Do not edit this test directly in this platform
* Modify the src files in the experiments repository 
*/

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import copy from './lib/copy';

// HD002 - Experiment Title
const HD002 = (() => {
  
  let $ = null;
 
	// Experiment code
	const activate = () => {
		document.body.classList.add('HD002CP');
		
		_gaq.push(['_trackEvent', 'HD002', 'active', 'experiment is active', null, true]);

		/*  
		*	Determine which country 
		*/ 
		const whichCountry = () => {
			const url = window.location.pathname;
			const usa = url.match('/us/');
			let country = 'gb';
			if (usa) {
				country = 'us';
			}
			return country
		};  
		const country = whichCountry();
		

		/*
		*	Append newly created elements
		*/
		const appendEl = (el, ref) => {
			ref.insertAdjacentHTML('beforeend', el);
		}

		/*
		*	Get copy from copy.js
		*/
		const text = copy;

		/*
		*	Build a tooltip
		*/
		const buildTooltip = (lang, text) => {

			const tooltipHTML = `
				<div class="hd02-tooltip">
					<div class="hd02-tooltip--wrap">

						<p>${text['tooltip'][country]['first']}</p>

						<ul class="hd02-ticklist">
							<li>${text['tooltip'][country]['listOne']}</li>
							<li>${text['tooltip'][country]['listTwo']}</li>
						</ul>

						<p>${text['tooltip'][country]['last']}</p>

					</div>
				</div>
			`;
			
			return tooltipHTML;
		}
		const tooltip = buildTooltip(country, text);
    const tooltipRef = document.querySelector('.container .product-info > h1.product-info__name');
    console.log(tooltipRef);

		// Append to title
		if (tooltipRef) {
      appendEl(tooltip, tooltipRef);
		}


		/*
		*	Product title control
		*/
		const titleControl = (() => {
			const productTitle = document.querySelector('.product-info > h1');
			const tooltip = document.querySelector('.hd02-tooltip');
			// Show tooltip
			const showTooltip = function(e) {
				_gaq.push(['_trackEvent', 'HD002', 'Click', 'User selected the title text', null, true]);
				tooltip.classList.add('hd02-show-tooltip');
			};
			productTitle.addEventListener('mouseup', showTooltip);

			let visibleTooltip = document.querySelector('.hd02-show-tooltip');

			// close tooltip
			document.addEventListener('click', (e) => {
				let targetEl = e.target;

				do {
					if (targetEl == tooltip.parentNode) {
						return
					}
					targetEl = targetEl.parentNode;
				} while (targetEl);

				tooltip.classList.remove('hd02-show-tooltip');
			});

		})();
		
	};

	 

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('HD002', 'Variation 1');
		activate();
	});

	const poller = UC.poller([
		() => !!window.jQuery,
		".product-info",
		".catalog-product-view",
	], () => {
		
		$ = window.jQuery;

		triggers();
	});

})();
