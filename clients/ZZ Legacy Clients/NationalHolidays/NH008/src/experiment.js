/*eslint-disable */
/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import slideEl from './lib/slide';

utils.events.setTrackerName('tracker2');

// NH008 - Experiment Title
const NH008 = (() => {

	let $ = null;

	// Experiment code
	const activate = () => {
		document.body.classList.add('NH008');


		/*
		* Create a slider from
		* the search results
		* create() builds the new URL 
		*/
		const create = () => {
		
				// Current URL
				let currentUrl = window.location.href;
				let currentDate = new Date();
				let maxDate = new Date(+new Date + (28 * 6 * 86400000));

				const formatDate = (date) => {
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();

					if (month < 10 && month >= 1) {
						month = '0' + month;
					} 
					if (day < 10 && day >= 1) {
						day = '0' + day;
					}

					let newDate = year + '-' + month + '-' + day;
					
					return newDate;
				}

				 
				const buildUrl = (name, min, max) => {
					let thisUrl = 'http://www.nationalholidays.com/search-results?s=';
					let thisName = name + '&rg=1&t3p=1149';
					
          let newUrl = thisUrl + thisName + '&min=' + min + '&max=' + max;

					return newUrl;
				}
				
				const getName = () => {
					let name = document.querySelector('.holiday-search .form-group.keywords > input[type="text"]').value;
					let optName = null;
					if (!name.match(/^Search\s\w+/)) {
						optName = name.replace(/\s/g, '+');
					} else {
						let nameParts = window.location.pathname.substring(1).split('/');
						if (nameParts.length > 0) {
							name = nameParts[nameParts.length - 1];
						}
						optName = name.replace(/-/g, '+'); 
					}
					return optName;
				} 
				
				let endDate = formatDate(maxDate);
				let startDate = formatDate(currentDate);
				let thisName = getName();
				let newURL = buildUrl(thisName, startDate, endDate);

				return newURL;	
		}; 
		let createdURL = create();

		/*
		* newSlides function is an ajax request
		* to collect the relavent information to
		* re build the slides
		*/
		const newSlides = (url) => { 

			// If is britian and ireland
			let britAndIre = '/britain-and-ireland';
			let currentUrl = window.location.pathname;
			
			if (currentUrl === britAndIre) {
				url = 'http://www.nationalholidays.com/search-results?s=britain&rg=4&min=2018-03-07&max=2018-08-22';
			}
			


			var request = new XMLHttpRequest();
			request.open('GET', url, true); 

			request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				let resp = request.responseText;
				let HTML = document.createElement('div');
				HTML.innerHTML = resp;

				// New Element HTML
				let htmlWrap = `
					<div id="ctl00_ctl00_pnlResults" class="NH08-show another-class">   
					<section class="blue" data-bind="visible: results().length > 0 &amp;&amp; showFlag()" style="">
						<div class="container">
							<h2>Upcoming breaks &amp; holidays</h2>
							<div class="slider-wrap">
								<div id="ctl00_ctl00_DivUpcomingSlider" class="NH08-slider price-slider slick-slider" data-bind="foreach: results">
									
								</div>
							</div>
						</div>
					</section>
					</div>
				`;

				let items = HTML.querySelectorAll('.search-content .result-item');
				let image, title, duration, date, wasPrice, nowPrice, link;
				

				if (items.length > 0) {
          // Send event for upcoming breaks and 'Exist'
          utils.events.send('NH008', 'Has breaks', 'Upcoming Breaks Exist', {sendOnce: true});

					let domRef = document.querySelector('.main-content .top-split');
          domRef.insertAdjacentHTML('afterend', htmlWrap);

				} 


				let newRef = document.querySelector('.NH08-slider');


				// Loop over items and store relative data
				for (let ii = 0; items.length > ii; ii++) {
					image = items[ii].querySelector('.image img').getAttribute('src'); 
					title = items[ii].querySelector('h2.itin-title').innerHTML;
					duration = items[ii].querySelector('.details span.tour-duration').innerHTML;
					date = items[ii].querySelector('.details span.tour-date').innerHTML.substr(4);
					wasPrice = items[ii].querySelector('.details .price .was-price').innerHTML;
					nowPrice = items[ii].querySelector('.details .price .current-price').innerHTML;
					link = items[ii].querySelector('.buttons a.btn-more-info').getAttribute('href');
					
					// Only show 6
					if (ii < 30) {
						let htmlTemplate = slideEl(image,title,duration,date,wasPrice,nowPrice,link);
            newRef.insertAdjacentHTML('beforeend', htmlTemplate); 
            
            // Send event for upcoming breaks and 'Exist'
            utils.events.send('NH008', 'Seen breaks', 'Upcoming Breaks Seen', {sendOnce: true});

					} 
				}


				// Start slider
				$('.NH08-slider').slick({
					dots: false,
					infinite: true,
					slidesToShow: 4,
					slidesToScroll: 1,
					responsive: [
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: 767,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: 479,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						},
					]
				});


			} else {
				// We reached our target server, but it returned an error

			}
			};

			request.onerror = function() {
			// There was a connection error of some sort
			};

			request.send();

		}

		newSlides(createdURL);
 

		/*
		* Add GA tracking to elements
		*/
		const tracking = (() => {

			let checkExist = setInterval(function() {
				if (document.querySelectorAll('span.NH08-price-btn.orange-btn').length > 0) {

					clearInterval(checkExist);
					// 'From only' buttons
					let btnFrom = document.querySelectorAll('span.NH08-price-btn.orange-btn');

					for (let z = 0; btnFrom.length > z; z++) {

						btnFrom[z].addEventListener('click', function() {
							utils.events.send('NH008', 'Click', 'Upcoming Breaks Clicked', {sendOnce: true});
						});
					}
				}
			}, 200);
			
			

		})();  

	}; //  End of Activate
	
	
	// Audience conditions
	const triggers = (options) => {
		// FullStory tagging
		utils.fullStory('NH008', 'Variation 1');
		
		activate();
	};
	
	// -----------------------------------------------------------
	// Poll elements required for *all* tests
	// -----------------------------------------------------------
	const poller = UC.poller([
		() => !!window.jQuery,
		'#ctl00_TopPane',
		'.holiday-search'
	], () => {
		
		$ = window.jQuery;

		triggers();
	});
})();
