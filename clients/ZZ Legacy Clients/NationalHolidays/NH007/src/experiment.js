/*eslint-disable */
/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

let VARIATION = null;
if(typeof NH07VARIATION != 'undefined') {
    VARIATION = NH07VARIATION;
} else {
    VARIATION = 1;
} 

utils.events.setTrackerName('tracker2');

// NH007 - Experiment Title
const NH007 = (() => {

	let $ = null;

	// Experiment code
	const activate = () => {
		document.body.classList.add('NH007');

		/*
		*	Tracking events fired on results page.
		*	Users recieving no results.
		*/
		const noResultsEl = document.querySelector('#SearchResults .search-options .matching-results strong');
		if (noResultsEl) {
			const noResultsValue = noResultsEl.textContent;
			if (noResultsValue == 0) {
				utils.events.send('NH007', 'Results', 'No results shown for this user', {sendOnce: true});
			}
		}


		/*
		*	Re create elements based on whats
		*	already available to us.
		*/
		// Build new 'From' input
		const fromInput = () => {
			let regionInput = document.querySelectorAll('.region-select-control option');
			// let regionID = null;
			// let regionName = null;

			let regionUl = document.createElement('ul');

			for (let i = 0; regionInput.length > i; i++) {
				let regionID = regionInput[i].getAttribute('value');
				let regionName = regionInput[i].innerText;

				let li = document.createElement('li');
				li.setAttribute('value', regionID);
				li.innerText = regionName;
				
				regionUl.appendChild(li);
			} // end for

			return regionUl.outerHTML;
		};
		const from = fromInput();

		// Build new postcode search link
		const postcodeInput = () => {
			let currentPostcode = document.querySelector('.holiday-search > .search-content a.postcode-search');
			if (currentPostcode) {
				return currentPostcode.outerHTML;
			} 
		};
		const postcode = postcodeInput();

		// Build new 'To' input
		const toInput = () => {
			let currentToInput = document.querySelector('.holiday-search > .search-content [id$="pnlKeyword"] input:first-of-type');
			if (currentToInput) {
				currentToInput.setAttribute('placeholder', 'Country, City or Event...');
				// clone it
				let toInput = currentToInput.cloneNode(true).outerHTML;
				return toInput;
			}
		};
		const to = toInput();
 
		// Build new 'Departure' date input
		const departInput = () => {
			let departingInput = '<input id="txtStartDateAlt" type="text" class="datepicker search-datepicker search-datepicker-start" placeholder="Choose a date" data-alt-field="#ctl00_ctl02_txtStartDate" readonly="" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">';

			// Create container
			let departContainer = document.createElement('div');
			departContainer.classList.add('nh07-depart-dates');
			departContainer.innerHTML = departingInput;
			
			return departContainer.outerHTML;

		};	
		const depart = departInput();

		// Build new 'Departure range' input
		const departRange = () => {
			let rangeInput = `
				<select id="nh07-range-select">
					<option selected="selected">Choose a range</option>
					<option value="3">+/- 3 days</option>
					<option value="7">+/- 7 days</option>
					<option value="15">+/- 15 days</option>
				</select>
			`;

			let rangeContainer = document.createElement('div');
			rangeContainer.innerHTML = rangeInput;

			return rangeContainer.outerHTML;
		};
		const range = departRange();

		// Build new 'Duration' input
		const durationInput = () => {
			let durationField = `
				<select id="nh07-duration-select">
					<option selected="selected">Please select...</option>
					<option value="7">2 Day Breaks</option>
					<option value="8">3 Day Breaks</option>
					<option value="9">4 Day Breaks</option>
					<option value="10">5 Day Breaks</option>
					<option value="11">6 Day Holidays</option>
					<option value="12">7 Day Holidays</option>
					<option value="13">8+ Day Holidays</option>
				</select>
			`;

			let durationContainer = document.createElement('div');
			durationContainer.innerHTML = durationField;

			return durationContainer.outerHTML;
		};
		const duration = durationInput();

		// Build new Advanced Search feature
		const advancedSearch = () => {
			const html = `
				<div id="nh07-rooms">
					<div class="nh07-ib">
						<label>Number of rooms</label>
						<select id="nh07-noRooms">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
					</div>

					<div id="nh07-show-one" class="nh07-ib">
						<label>Room type 1</label>
						<select id="nh07-roomOne">
							<option value="">Choose room type</option>
							<option value="1">Single</option>
							<option value="2">Double/Twin</option>
							<option value="3">Triple</option>
							<option value="4">Family/Quad</option>
						</select>
					</div>

					<div id="nh07-show-two" class="nh07-ib nh07-toggle-this">
						<label>Room type 2</label>
						<select id="nh07-roomTwo">
							<option value="">Choose room type</option>
							<option value="1">Single</option>
							<option value="2">Double/Twin</option>
							<option value="3">Triple</option>
							<option value="4">Family/Quad</option>
						</select>
					</div>

					<div id="nh07-show-three" class="nh07-ib nh07-toggle-this">
						<label>Room type 3</label>
						<select id="nh07-roomThree">
							<option value="">Choose room type</option>
							<option value="1">Single</option>
							<option value="2">Double/Twin</option>
							<option value="3">Triple</option>
							<option value="4">Family/Quad</option>
						</select>
					</div>

					<div id="nh07-show-four" class="nh07-ib nh07-toggle-this">
						<label>Room type 4</label>
						<select id="nh07-roomFour">
							<option value="">Choose room type</option>
							<option value="1">Single</option>
							<option value="2">Double/Twin</option>
							<option value="3">Triple</option>
							<option value="4">Family/Quad</option>
						</select>
					</div>
				</div>
			`;
			let wrapper = document.createElement('div');
			wrapper.classList.add('nh07-advanced-search');
			wrapper.innerHTML = html;
			
			let ref = document.querySelector('.main-content #main-body .right div[id$="RightPane"]');
			if (ref) {
				ref.insertAdjacentElement('afterend', wrapper);
			}
		};
		advancedSearch();
		

		/*	AJAX request for towns
		*	This collects the towns based on
		*	what region is selected
		*/
		const requestTowns = (regionId, callback) => {
			var request = new XMLHttpRequest();
			request.open('POST', '/WebServices/RegionService.asmx/GetRegionPickupPointsByRegionId', true);
			request.setRequestHeader('Content-Type', 'application/json');
			request.onload = function() {
			if (request.status === 200) {
				// Success!
				var data = JSON.parse(request.responseText);
				
				callback(data);
			} else {
				// We reached our target server, but it returned an error

			}
			};

			request.onerror = function() {
			// There was a connection error of some sort
			};

			request.send(JSON.stringify({'regionId': regionId}));
		};
		

		/*	Construct new html based on the above
		*	functions which collect current functionality
		*	and rebuild to be inputted here.
		*/
		const newHTML = (from, postcode, to, depart, range, duration) => {
			let htmlDiv = document.createElement('div');
			let htmlContent = `
				<div id="nh07-new-searchform" class="search-content">
					<h2 class="open">Holiday search</h2>
					<div class="input-split">
						<div id="nh07-from" class="left">
							<label>From</label>
							<div class="nh07-from--dropdown">
								<p>Choose departure point</p>
								${from}
							</div>
							${postcode}
						</div>
						<div id="nh07-to-input" class="right">
							<label>To (optional)</label>
							${to}
						</div>
					</div>
					<div id="nh07-depart" class="input-split">
						<div class="left">
							<label>Departure date</label>
							${depart}
							<div>
								<input type="checkbox" id="nh07-flexdates-btn"> <p>Flexible on dates</p>
							</div>
						</div>
						<div class="right">
							<label>Departure date range</label>
							${range}
						</div>
					</div>
					<div id="nh07-duration" class="input-split clearfix">
						<div class="left">
							<label>Holiday duration (optional)</label>
							${duration}
						</div>
						<div class="right">
							<button id="btnSearch" type="button" class="orange-btn">Search</button>
							<a href="#" id="lnkAdvanced"><strong>Advanced search</strong></a>
						</div>
					</div>
				</div>
			`;


			htmlDiv.innerHTML = htmlContent;
			return htmlDiv;
		};
		let html = newHTML(from, postcode, to, depart, range, duration);
		
		// Append newHTML
		const formWrap = document.querySelector('.holiday-search');
		if (formWrap) {
			formWrap.insertAdjacentElement('afterbegin', html);
		}


		/*
		*	If localStorage has 'lastSearched'
		*	then populate inputs from that.
		*/
		const useLocal = (() => {
			let storedData = localStorage.getItem('lastSearch');
			if (!storedData) { return }

			// Parse JSON
			storedData = JSON.parse(storedData);

			// From input
			let inputFrom = document.querySelector('.nh07-from--dropdown p');
			if (inputFrom) {
				inputFrom.textContent = storedData.from;
				inputFrom.setAttribute('value', storedData.fromKey);
			}

			// To input
			let inputTo = document.querySelector('#nh07-to-input > input');
			if (inputTo) {
				inputTo.value = storedData.to;
			}

			// Date input
			let inputDate = document.querySelector('.nh07-depart-dates > input');
			if (inputDate) {
				inputDate.value = storedData.date;
			}

			// Range input
			let inputRange = document.querySelector('#nh07-range-select');
			if (inputRange) {
				inputRange.value = storedData.range;
			}

			// Duration input and text
			let inputDuration = document.querySelector('#nh07-duration-select');
			if (inputDuration) {
				inputDuration.value = storedData.duration
			}
			
		})();



		/*	Region click events
		*	This function populates the child list
		*	of the regions on click.
		*/
		const regionClick = () => {
			let els = document.querySelectorAll('#nh07-from .nh07-from--dropdown > ul > li');
			for (let z = 0; els.length > z; z++) {
				// Open elements
				els[z].addEventListener('click', function() {
					// Get ID
					let id = this.getAttribute('value');
					
					let hasId = document.querySelector('.nh07-current-value');
					if (hasId) {
						hasId.classList.remove('nh07-current-value');
					}
					this.classList.add('nh07-current-value');
					
					if (els[z].classList.contains('nh07-towns-added')) {
						return;
					} else {
						// Create nested elements
						let div = document.createElement('div');
						div.classList.add('nh07-nested-div');
						let childUl = document.createElement('ul');
						div.appendChild(childUl);
						
						// Request towns 
						requestTowns(id, function(data) {
							let towns = data.d;
							for (let j = 0; towns.length > j; j++) {
								let childLi = document.createElement('li');
								childLi.innerHTML = towns[j].PickupPointName;
								// Get town values
								let townId = towns[j].PickupPointId;
								childLi.setAttribute('value', townId);
								childUl.appendChild(childLi);

							}
						});
						
						els[z].insertAdjacentElement('beforeend', div); 

					}
					// Add class to 'this' LI
					els[z].classList.add('nh07-towns-added');

				});
			}

		};
		regionClick();


		/*
		*	Click events for the new
		*	elements that have been created
		*/
		const clickEvents = (() => {

			// Top form input click event
			let topLevelInput = document.querySelector('.nh07-from--dropdown > p');
			if (topLevelInput) {
				topLevelInput.addEventListener('click', function(e) {
					// Tracking From input
					utils.events.send('NH007', 'Click', 'Used the From dropdown', {sendOnce: true});
	
					if (e.target == e.currentTarget) {
						if (topLevelInput.parentNode.classList.contains('nh07-toggle')) {
							topLevelInput.parentNode.classList.remove('nh07-toggle');
						} else {
							topLevelInput.parentNode.classList.add('nh07-toggle');
						}
					}
					// Escape key closes
					document.onkeydown = function(e) {
						e = e || window.event;
						if (e.keyCode == 27) {
							topLevelInput.parentNode.classList.remove('nh07-toggle');
						}
					}
				});
			}

			// Click outside of elements closes From input
			const fromInput = document.querySelector('.nh07-from--dropdown');
			document.addEventListener('click', function(e) {
				let isClickInside = fromInput.contains(e.target);

				if (!isClickInside) {
					fromInput.classList.remove('nh07-toggle');
				}
			});

			// Child from elements click event
			let childLevelInput = document.querySelectorAll('.nh07-from--dropdown > ul > li');
			if (childLevelInput) {
				childLevelInput = [...childLevelInput];
				childLevelInput.forEach((element, index) => { 
					element.addEventListener('click', function(e) {
						if (e.target == e.currentTarget) {
							if (element.value == 5) {
								if (confirm("For all departures from Scotland, visit Caledonian Travel. Do you wish to be taken there now?")) {
									window.location.href = 'http://www.caledoniantravel.com/';
								} else {
									return
								}
							}
							if (index < 1) {return}
							if (element.classList.contains('nh07-show-towns')) {
								element.classList.remove('nh07-show-towns');
							} else {
								element.classList.add('nh07-show-towns');
							}
						}

						// Tracking for town selected
						utils.events.send('NH007', 'Clicked town', e.target.textContent, {sendOnce: true});

						// Replace the input text with selected town text
						if (e.target.parentNode.parentNode.classList.contains('nh07-nested-div')) {
							let inputValue = e.target.innerText;
							let inputValueId = e.target.getAttribute('value');
	
							let currentInputText = document.querySelector('.nh07-from--dropdown > p');
							currentInputText.innerText = inputValue;
							currentInputText.setAttribute('value', inputValueId);
	
							// Hide dropdown list
							let dropdown = document.querySelector('.nh07-from--dropdown');
							dropdown.classList.remove('nh07-toggle');
						}
					});
				});
			}

			// Postcode popup click event
			let postcodePopup = document.querySelector('#divPostcodePopup');
			let postcodeLink = document.querySelector('.holiday-search > div > .search-content a.postcode-search');
			if (postcodeLink) {
				postcodeLink.addEventListener('click', function() {
					if (postcodePopup.style.display == 'block') {
						postcodePopup.style.display = 'none';
					} else {
						postcodePopup.style.display = 'block';
						let childPostcode = postcodePopup.childNodes[1];
						childPostcode.style.marginTop = '-177px';
					}
				});
			}

			// Depart date calendar popup click event
			let departInput = document.querySelector('#nh07-depart #txtStartDateAlt');
			if (departInput) {
				$(departInput).datepicker({
					dateFormat: 'dd/mm/yy',
					altField: '',
					altFormat: 'dd/mm/yy',
					minDate: '+1D',
					onSelect: function(a,b,c) { 
						// Tracking datepicker
						utils.events.send('NH007', 'Click', 'Used the departure date', {sendOnce: true});
					}
				});
			}
			
			// Flexible on dates button click event
			let flexBtn = document.querySelector('#nh07-flexdates-btn');
			if (flexBtn) {
				flexBtn.addEventListener('click', function() {
					this.classList.add('nh07-checked-btn');
					let rangeEl = document.querySelector('#nh07-depart .right');
					if (rangeEl.classList.contains('nh07-show-range')) {
						rangeEl.classList.remove('nh07-show-range');
					} else {
						rangeEl.classList.add('nh07-show-range');
					}
				});
			}
			

			// Advanced Search toggle container click event
			let advancedBtn = document.querySelector('#nh07-duration .right #lnkAdvanced');
			if (advancedBtn) {
				advancedBtn.addEventListener('click', function(e) {
					// Track it
					utils.events.send('NH007', 'Click', 'Used the advanced search feature', {sendOnce: true});
	
          e.preventDefault();
          if (VARIATION == 1) {
            const adVanContainer = document.querySelector('.nh07-advanced-search');
            if (adVanContainer.classList.contains('nh07-show-advanced')) {
              adVanContainer.classList.remove('nh07-show-advanced');
            } else {
              adVanContainer.classList.add('nh07-show-advanced');
            }
          }
				});
			}

			// Number of rooms toggle select options
			let roomSelect = document.querySelector('#nh07-noRooms');
			if (roomSelect) {
				roomSelect.addEventListener('change', function(e) {
					utils.events.send('NH007', 'Click', 'Used the number of rooms select', {sendOnce: true});
	
					let otherRooms = document.querySelectorAll('.nh07-toggle-this');
	
					let val = e.target.value;
					
					for (let i = 0; otherRooms.length > i; i++) {
						if (val == 1) {
							otherRooms[i].classList.remove('nh07-show-select');
						}
						if (val == 2) {
							otherRooms[i].classList.remove('nh07-show-select');
							otherRooms[0].classList.add('nh07-show-select');
						}
						if (val == 3) {
							otherRooms[i].classList.remove('nh07-show-select');
							otherRooms[0].classList.add('nh07-show-select');
							otherRooms[1].classList.add('nh07-show-select');
	
						} 
						if (val == 4) {
							otherRooms[i].classList.remove('nh07-show-select');
							otherRooms[0].classList.add('nh07-show-select');
							otherRooms[1].classList.add('nh07-show-select');
							otherRooms[2].classList.add('nh07-show-select');
						} 
					}
					
				});
			}


			// To Input for tracking event
			const toInputDiv = document.querySelector('#nh07-to-input > input');
      const toAllDestinations = `
        <div class="nh07-all-dest">
          <p>Show all destinations</p>
        </div>
      `;
			if (toInputDiv) {
				toInputDiv.addEventListener('click', function() {
					// Tracking to input
          utils.events.send('NH007', 'Click', 'Used the To input', {sendOnce: true});
          
          const allDestinationsShown = document.querySelector('.nh07-all-dest');
          if (!allDestinationsShown) {
            toInputDiv.parentNode.insertAdjacentHTML('beforeend', toAllDestinations);
          }
          
          // On click of 'Show all destinations'
          const showAllDests = document.querySelector('.nh07-all-dest > p');
          if (showAllDests) {
            showAllDests.addEventListener('click', function() {
              toInputDiv.value = 'All destinations';
              showAllDests.parentNode.classList.add('nh07-hide');
            });
          }

				});
			}

			// Holiday duration tracking event
			const durationInputField = document.querySelector('#nh07-duration-select');
			if (durationInputField) {
				durationInputField.addEventListener('click', function() {
					utils.events.send('NH007', 'Click', 'Used the duration input', {sendOnce: true});
				});
			}


			/*
			*	On click of search
			*	If elements are not empty collect the inputs value
			*	build string from the values collected
			*	hit the URL with the newly created string
			*	=========================
			*	Notes: &rg= 'region key'
			*		   &t3p= 'town key'	
			*/
			let searchBtn = document.querySelector('#nh07-new-searchform button#btnSearch');
			if (searchBtn) {
				searchBtn.addEventListener('click', function(e) {
					let urlString = 'http://www.nationalholidays.com/search-results';				
	
					// Tracking search btn
					utils.events.send('NH007', 'Click', 'Used the search button', {sendOnce: true});
	
					// Check if flexible on dates has been checked
					const shownDateRange = document.querySelector('#nh07-depart .right.nh07-show-range');
					if (shownDateRange) {
						utils.events.send('NH007', 'Click', 'Used the flexible date range', {sendOnce: true});
					}
					
					
					const noFromInput = 'Choose departure point';
					const fromInputP = document.querySelector('.nh07-from--dropdown > p').textContent;
					if (fromInputP.match(noFromInput)) {
						e.preventDefault();
						alert('Please select a departure point');
						return
					}
	
					// Get an elements value
					const getValue = function(el) {
						if (el != null) {
							const elValue = el.getAttribute('value');
							let valueString = String(elValue);
							return valueString;
						} 
					}
	
	
					// Towns and region
					const townAndRegion = (() => {
						let townId = document.querySelector('.nh07-from--dropdown > p');
						let regionId = document.querySelector('.nh07-current-value');
	
						let town = getValue(townId);
						let region = getValue(regionId);
	
						return {town, region}
					})();
	
					
					// Get (optional) To field value
					const toInput = document.querySelector('#nh07-to-input > input');
          let toInputValue = toInput.value;
          if (toInputValue == 'All destinations') {
            toInputValue = ''
          }
					
					
					// Date range select click event
					let rangeSelect = document.querySelector('#nh07-range-select');
					let rangeValue = rangeSelect.value;
	
					// Get the date values
					const getRange = (() => {					
						if (rangeValue != null) {
							rangeValue = rangeValue;
						}
						return rangeValue;
					})(); 
					
					// Build the dates 
					const buildDates = (() => {
						let dateInput = document.querySelector('.nh07-depart-dates > input');
						dateInput = dateInput.value;
	
						// Swap format to YYYY-MM-DD
						const formatDate = () => {
							let splitDate = dateInput.split('/');
							let newDate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
							return newDate;
						}
						const dateInputValue = formatDate();
						
						// Build up new dates
						let dateResult = new Date(dateInputValue);
	
						if (rangeValue !== 'Choose a range') {
							rangeValue = parseInt(rangeValue);
							
							const minDateMs = (new Date(dateInputValue)).setDate(parseInt(dateResult.getDate()) - rangeValue);
							const maxDateMs = (new Date(dateInputValue)).setDate(parseInt(dateResult.getDate()) + rangeValue);
		
							// Ammend months
							function getMonth(date) {
								var month = date + 1;
								return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
							}  
							
							// Minimum date						
							const minDate = new Date(minDateMs);
							let currentMinMonth = minDate.getMonth();
							let minMonth = getMonth(currentMinMonth);
							const minDateString = minDate.getFullYear() + '-' + minMonth + '-' + minDate.getDate();
	
							// Maximum date
							const maxDate = new Date(maxDateMs);
							let currentMaxMonth = maxDate.getMonth();
							let maxMonth = getMonth(currentMaxMonth);
							const maxDateString = maxDate.getFullYear() + '-' + maxMonth + '-' + maxDate.getDate();
							
							return {'minDate':minDateString, 'maxDate':maxDateString}
	
						} else {
							const minDate = dateInputValue;
							return {'minDate':minDate, 'maxDate':null}
						}
	
					})();
	
					// Get the duration
					let durationSelect = document.querySelector('#nh07-duration-select');				
					const durationValue = durationSelect.value;
					const durationValueInt = parseInt(durationValue);
	
	
					// Get the room types
					// Room One
					const roomOneType = document.querySelector('#nh07-roomOne');
					let roomOneTypeValue = roomOneType.value;
					// Room Two
					const roomTwoType = document.querySelector('#nh07-roomTwo');
					let roomTwoTypeValue = roomTwoType.value;
					// Room Three
					const roomThreeType = document.querySelector('#nh07-roomThree');
					let roomThreeTypeValue = roomThreeType.value;
					// Room Four
					const roomFourType = document.querySelector('#nh07-roomFour');
					let roomFourTypeValue = roomFourType.value;
	
	
					// Build the URL
					if (townAndRegion.region && townAndRegion.region !== 'undefined') {
						urlString = utils.addUrlParameter(urlString, 'rg', townAndRegion.region);
					}
					if (townAndRegion.town && townAndRegion.town !== 'null') {
						urlString = utils.addUrlParameter(urlString, 't3p', townAndRegion.town);
					}
	
					if (buildDates.minDate && buildDates.maxDate) {
						if (buildDates.minDate !== 'undefined-undefined-') {
							urlString = utils.addUrlParameter(urlString, 'min', buildDates.minDate);
						}
						urlString = utils.addUrlParameter(urlString, 'max', buildDates.maxDate);
					} else {
						if (buildDates.minDate !== 'undefined-undefined-') {
							urlString = utils.addUrlParameter(urlString, 'min', buildDates.minDate);
						}
					} 
					if (durationValueInt) {
						urlString = utils.addUrlParameter(urlString, 'd', durationValueInt);
					}
					if (!toInputValue == '' && typeof toInputValue !== 'null') {
						urlString = utils.addUrlParameter(urlString, 's', toInputValue);
					}
					if (!roomOneType.value == '' && typeof roomOneType !== 'null') {
						urlString = utils.addUrlParameter(urlString, 'rt1', roomOneTypeValue);
					}
					if (!roomTwoType.value == '' && typeof roomTwoType !== 'null') {
						urlString = utils.addUrlParameter(urlString, 'rt2', roomTwoTypeValue);
					}
					if (!roomThreeType.value == '' && typeof roomThreeType !== 'null') {
						urlString = utils.addUrlParameter(urlString, 'rt3', roomThreeTypeValue);
					}
					if (!roomFourType.value == '' && typeof roomFourType !== 'null') {
						urlString = utils.addUrlParameter(urlString, 'rt4', roomFourTypeValue);
					}
	
					const departDateInput = document.querySelector('.nh07-depart-dates > input');
					const departDateInputValue = departDateInput.matches('Choose a date');
					if (departDateInputValue) {
						alert('Please choose a date');
						return
					}


					// Store inputed values
					const townValue = document.querySelector('.nh07-from--dropdown > p').innerText;
					const dateValue = document.querySelector('.nh07-depart-dates > input').value;
					const rangeValue1 = document.querySelector('#nh07-range-select').value;
					const durationValue1 = document.querySelector('#nh07-duration-select').value;
					const durationValueText = document.querySelector('#nh07-duration-select');
					const durationText1 = durationValueText.options[durationValueText.selectedIndex].text;

					const storedValues = {
						'from': townValue, 
						'fromKey': townAndRegion.town,
						'to': toInputValue,
						'date': dateValue,
						'range': rangeValue,
						'duration': durationValue,
						'durationText': durationText1,
					}

					let toStore = JSON.stringify(storedValues);
					localStorage.setItem('lastSearch', toStore);
	
					// Hit the new URL
					window.location.href = urlString;
	
				});
			}

		})();


		/*
		*	VARIATION 2 
		*
		*/
		if (VARIATION == 2) {
			const runV2 = (() => {
				document.body.classList.add('NH007-V2');

				const formTitle = document.querySelector('#nh07-new-searchform > h2');
				if (window.innerWidth <= 499) {
					formTitle.textContent = 'Search';
				}
 
				// Change advanced search functionality 
				const advancedBtn = document.querySelector('#nh07-duration a#lnkAdvanced');
				advancedBtn.addEventListener('click', function(e) {
					e.preventDefault();
					window.location.href = '/advanced-search?s=&min=06/12/2017&d=&rg=2&t3p=1149&t3px=&flex=false';
				});

			})();
		}



	};

	// Poll elements required for *all* tests
	const poller = UC.poller([
		() => !!window.jQuery,
		"#main-body"
	], () => {
		
		$ = window.jQuery;

		triggers();
	});

	// Audience conditions
	const triggers = (options) => {
		// FullStory tagging
		utils.fullStory('NH007', 'Variation 1');

		activate();
	}; 

})();
