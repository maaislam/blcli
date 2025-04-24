/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import infiniteScroll from './lib/nh16-inf-scroll';


let VARIATION = null;
if(typeof NH16VARIATION != 'undefined') {
    VARIATION = NH16VARIATION;
} else {
    VARIATION = 1;
} 

utils.events.setTrackerName('tracker2');

// NH016 - Experiment Title
const NH016 = (() => {

	let $ = null;

	// Experiment code
	const activate = () => {
		document.body.classList.add('NH016');

		// Get Elements
		const getEl = () => {
			const searchBtn = document.querySelector('.search-options > input.orangeSearchBtn');
			const searchFilter = document.querySelector('.search-again');

			let filterBtn = document.querySelector('h2.refine-search');
			const filterOptions = document.querySelector('.filters');

			// Amend filter btn text
			filterBtn.textContent = 'Filter';

			let elArr = [];
			elArr.push(searchBtn, searchFilter, filterBtn, filterOptions);
			return elArr;
		};
		// [0 = searchBtn, 1 = searchFilter, 2 = filterBtn, 3 = filterOptions]
		
		
		
		// Create new container
		const buildIt = () => {
			const div = document.createElement('div');
			div.classList.add('NH16-search-wrap', 'clearfix');
			
			// Get elements
			let els = getEl();
			els.forEach(element => {
				div.appendChild(element);
			});

			return div;
		};
		

		// Append Elements to new container
		const appendIt = () => {
			const pageRef = document.querySelector('.search-options');
			let div = buildIt();
			pageRef.insertAdjacentElement('beforebegin', div);
		};
		appendIt();

		

		// Control new elements
		const controlIt = (() => {
			const closeBtn = document.querySelector('.NH16-search-wrap .search-again .close-btn');
			// Search again btn
			const openBtn = document.querySelector('.NH16-search-wrap  > input.searchAgainBtn');
			// Search again dropdown
			const searchDropdown = document.querySelector('.NH16-search-wrap .search-again');
			// Filter Btn
			const filterBtn = document.querySelector('.NH16-search-wrap .refine-search');
			// Filter dropdown
			const filterDropdown = document.querySelector('.NH16-search-wrap .filters');

			// Toggle dropdowns
			openBtn.addEventListener('click', function() {
				filterBtn.classList.remove('open');
				filterDropdown.style.display = "none"; 
			});
			filterBtn.addEventListener('click', function() {
				openBtn.classList.remove('disabled');
				searchDropdown.style.display = "none";
			});

			// Close btn for search again
			closeBtn.addEventListener('click', function() {
				openBtn.classList.remove('disabled');
			});
		})();



		// Fix element to top of page
		const fixIt = (() => {
			const elToFix = document.querySelector('.NH16-search-wrap');
			let el = $(elToFix).offset().top;

			$(window).scroll(function() {
				if ($(window).scrollTop() > el) {
					$(elToFix).addClass('NH16-fixed');
				} else {
					$(elToFix).removeClass('NH16-fixed');
				}
			});
		})();


		// Track elements
		const trackIt = (() => {
			const searchBtn = document.querySelector('.NH16-search-wrap input.searchAgainBtn');
			const filterBtn = document.querySelector('.NH16-search-wrap h2.refine-search');

			searchBtn.addEventListener('click', function() {
				utils.events.send('NH016', 'Click', 'Used the search again button', {sendOnce: true});
			});

			filterBtn.addEventListener('click', function() {
				utils.events.send('NH016', 'Click', 'Used the filter button', {sendOnce: true});
			});
		})();


		/*
		*	Load posts as infinite scroll V2
		*
		*/
		const loadElems = (() => {
			if (VARIATION == 2) {
				infiniteScroll();
			}
		})();

	};

	// Audience conditions
	const triggers = (options) => {
		// FullStory tagging
		utils.fullStory('NH016', 'Variation 1');

		activate();
	};
 

	// Poller
	const poller = UC.poller([
		() => !!window.jQuery,
		".filters",
		".search-again",
		"#PageNumber",
	], () => {
		
		$ = window.jQuery;

		triggers();
	});
	

	

})();
