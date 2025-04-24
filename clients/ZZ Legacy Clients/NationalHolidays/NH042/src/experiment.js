import { fullStory, events } from '../../../../lib/utils';

/**
 * {{NH042}} - {{Search Form - Iteration 1}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'NH042',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    events.setTrackerName('tracker2');
    
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    // Search Bar
    const searchBarSection = document.querySelectorAll('.holiday-search .search-content .input-split')[0];
    searchBarSection.querySelector('label').innerHTML = `What are you looking for or where are you looking to go?<small>(optional)</small>`; // eslint-disable-line quotes

    // Looking to Depart
    const departingDatesSection = document.querySelectorAll('.holiday-search .search-content .input-split')[1];
    departingDatesSection.querySelector('label').childNodes[0].nodeValue = `Looking to depart for holiday between`; // eslint-disable-line quotes
    departingDatesSection.querySelector('label').insertAdjacentHTML('afterbegin', `<span><p>1</p></span>`); // eslint-disable-line quotes
    departingDatesSection.insertAdjacentHTML('beforeend', `<div class='NH042-departingDates__message'>These are the dates that you are flexible to leave between (i.e. holidays that depart between these dates)</div>`); // eslint-disable-line quotes

    // Departing From
    const departingFromSection = document.querySelectorAll('.holiday-search .search-content .input-split')[2];

    const postcodeOptionsLink = document.querySelectorAll('.holiday-search .search-content a')[1].outerHTML;
    const roomTypesOptionsLink = document.querySelector('.holiday-search .search-content .bottom > a').outerHTML;
    departingFromSection.insertAdjacentHTML('beforeend', `<div class='NH042-departing__links'><ul class='NH042-links'><li id='NH042-postcodeLink'>${postcodeOptionsLink}</li><li>${roomTypesOptionsLink}</li></ul></div>`);
    // Postcode link event click
    document.querySelector('#NH042-postcodeLink').addEventListener('click', () => {
      document.querySelectorAll('.holiday-search .search-content a')[3].click();
    });
    // Create new dropdown
    /*eslint-disable */
    /*
		*	Re create elements based on whats
		*	already available to us.
		*/
    // Build new 'From'
    const from = components.fromInput();
    
    /*	Construct new html based on the above
		*	functions which collect current functionality
		*	and rebuild to be inputted here.
    */
    let newDepartingDropdown = components.newHTML(from);
    // Append new From Input
    departingFromSection.insertAdjacentElement('afterbegin', newDepartingDropdown);

    /*
		*	If localStorage has 'lastSearched'
		*	then populate inputs from that.
    */
    services.useLocal();

    /*	Region click events
		*	This function populates the child list
		*	of the regions on click.
		*/
    components.regionClick();

    // Delete Control's Region Input
    const regionInputEl = document.querySelector('#ctl00_ctl02_pnlRegion');
    regionInputEl.parentNode.removeChild(regionInputEl);
    // Delete Control's Pickup Point Input
    const pickupInputEl = document.querySelector('#ctl00_ctl02_pnlPickupPoint');
    pickupInputEl.parentNode.removeChild(pickupInputEl);
    
    // ======= NH007 SEARCH FORM FUNCTIONALITY =======
    /*
		*	Click events for the new
		*	elements that have been created
    */
		const clickEvents = (() => {

			// Top form input click event
			let topLevelInput = document.querySelector('.NH042-from--dropdown > p');
			if (topLevelInput) {
				topLevelInput.addEventListener('click', function(e) {
					if (e.target == e.currentTarget) {
						if (topLevelInput.parentNode.classList.contains('NH042-toggle')) {
							topLevelInput.parentNode.classList.remove('NH042-toggle');
						} else {
							topLevelInput.parentNode.classList.add('NH042-toggle');
						}
					}
					// Escape key closes
					document.onkeydown = function(e) {
						e = e || window.event;
						if (e.keyCode == 27) {
							topLevelInput.parentNode.classList.remove('NH042-toggle');
						}
					}
				});
			}
			// Click outside of elements closes From input
			const fromInput = document.querySelector('.NH042-from--dropdown');
			document.addEventListener('click', function(e) {
				let isClickInside = fromInput.contains(e.target);

				if (!isClickInside) {
					fromInput.classList.remove('NH042-toggle');
				}
			});
			// Child from elements click event
			let childLevelInput = document.querySelectorAll('.NH042-from--dropdown > ul > li');
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
							if (element.classList.contains('NH042-show-towns')) {
								element.classList.remove('NH042-show-towns');
							} else {
								element.classList.add('NH042-show-towns');
							}
						}
						// Replace the input text with selected town text
						if (e.target.parentNode.parentNode.classList.contains('NH042-nested-div')) {
							let inputValue = e.target.innerText;
							let inputValueId = e.target.getAttribute('value');
	
							let currentInputText = document.querySelector('.NH042-from--dropdown > p');
							currentInputText.innerText = inputValue;
							currentInputText.setAttribute('value', inputValueId);
							// Hide dropdown list
							let dropdown = document.querySelector('.NH042-from--dropdown');
							dropdown.classList.remove('NH042-toggle');
						}
					});
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
			let searchBtn = document.querySelector('button#btnSearch');
			if (searchBtn) {
				searchBtn.addEventListener('click', (e) => {
          e.preventDefault();	
          let urlString = 'http://www.nationalholidays.com/search-results?';
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
						let townId = document.querySelector('.NH042-from--dropdown > p');
						let regionId = document.querySelector('.NH042-current-value');
						let town = getValue(townId);
						let region = getValue(regionId);
						return {town, region}
          })();
          const toInput = document.querySelector('#ctl00_ctl02_pnlKeyword > input');
          let toInputValue = toInput.value;
          if (toInputValue == 'All destinations') {
            toInputValue = ''
          }
          // Build the dates
          let dateStartInput;
          let dateEndInput;
          let dateStartInputValue;
          let dateEndInputValue;
					const buildDates = (() => {
            dateStartInput = document.querySelector('#ctl00_ctl02_pnlStartDate > input');
            dateEndInput = document.querySelector('#ctl00_ctl02_pnlEndDate > input');
            dateStartInput = dateStartInput.value;
            dateEndInput = dateEndInput.value;
						// Swap format to YYYY-MM-DD
						const formatDate = (dateInput) => {
							let splitDate = dateInput.split('/');
							let newDate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
							return newDate;
						}
            dateStartInputValue = formatDate(dateStartInput);
            dateEndInputValue = formatDate(dateEndInput);
						// Build up new dates
            // let dateResult = new Date(dateInputValue);
            let dateStartResult = new Date(dateStartInputValue);
            let dateEndResult = new Date(dateEndInputValue);

            // Calculate Date Range
            const timeDiff = Math.abs(dateEndResult.getTime() - dateStartResult.getTime());
            let rangeValue = Math.ceil(timeDiff / (1000 * 3600 * 24));
					})();
					// Get the duration
					let durationSelect = document.querySelector('select#ctl00_ctl02_ddlDuration');				
					const durationValue = durationSelect.options[durationSelect.selectedIndex].value;
          const durationValueInt = parseInt(durationValue);
					// Build the URL
					if (townAndRegion.region && townAndRegion.region !== 'undefined') {
            urlString += `&rg=${townAndRegion.region}`;
					}
					if (townAndRegion.town && townAndRegion.town !== 'null') {
            urlString += `&t3p=${townAndRegion.town}`;
					}
					if (dateStartInputValue && dateEndInputValue) {
						if (dateStartInputValue !== 'undefined-undefined-') {
              urlString += `&min=${dateStartInputValue}`;
						}
						urlString += `&max=${dateEndInputValue}`;
					} else {
						if (dateStartInputValue !== 'undefined-undefined-') {
              urlString += `&min=${dateStartInputValue}`;
						}
					} 
					if (!isNaN(durationValueInt)) {
            urlString += `&d=${durationValueInt}`;
					}
					if (!toInputValue == '' && typeof toInputValue !== 'null') {
            urlString += `&s=${toInputValue}`;
					}
					// Store inputed values
					const townValue = document.querySelector('.NH042-from--dropdown > p').innerText;
          const startDate = dateStartInput;
          const endDate = dateEndInput;
          const durationText = durationSelect.options[durationSelect.selectedIndex].text;

					const storedValues = {
						'from': townValue, 
						'fromKey': townAndRegion.town,
						'to': toInputValue,
            'startDate': startDate,
            'endDate': endDate,
						'duration': durationValue,
						'durationText': durationText,
					}
					let toStore = JSON.stringify(storedValues);
          localStorage.setItem('lastSearch', toStore);
          
          // GA Events
          // Tracking for input value
          if (toInputValue && toInputValue !== '') {
            events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Entered text in open text field: ${toInputValue}`, { sendOnce: true });
          }
          // Tracking for duration value
          if (durationText && durationText !== `I don't mind`) {
            events.send(settings.ID, `Variation ${settings.VARIATION}`, `Variation ${settings.VARIATION} - Selected duration: ${toInputValue}`, { sendOnce: true });
          }
          // Hit the new URL
          e.preventDefault();	
					window.location.href = urlString;
			 	});
			}
    })();
  },
  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /*
		*	@desc If localStorage has 'lastSearched'
		*	then populate inputs from that.
    */
    useLocal() {
      let storedData = localStorage.getItem('lastSearch');
      if (!storedData) { return }

      // Parse JSON
      storedData = JSON.parse(storedData);

      // From input
      let inputFrom = document.querySelector('.NH042-from--dropdown p');
      if (inputFrom) {
        inputFrom.textContent = storedData.from;
        inputFrom.setAttribute('value', storedData.fromKey);
      }

      // To input
      let inputTo = document.querySelector('input#ctl00_ctl02_txtKeyword');
      if (inputTo) {
        inputTo.value = storedData.to;
      }

      // Start Date input
      let inputDate = document.querySelector('#ctl00_ctl02_pnlStartDate > input');
      if (inputDate) {
        inputDate.value = storedData.startDate;
      }
      
      // End Date input
      inputDate = document.querySelector('#ctl00_ctl02_pnlEndDate > input');
      if (inputDate) {
        inputDate.value = storedData.endDate;
      }

      // Duration input and text
      let inputDuration = document.querySelector('#ctl00_ctl02_ddlDuration');
      if (inputDuration) {
        inputDuration.value = storedData.duration
      }
    },
  },
  components: {
    /**
     * @desc Build new 'From' input
     */
    fromInput() {
      let regionInput = document.querySelectorAll('.region-select-control option');
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
    },
    /*	Construct new html based on the above
		*	functions which collect current functionality
		*	and rebuild to be inputted here.
		*/
    newHTML(from) {
      let htmlDiv = document.createElement('div');
      let htmlContent = `
        <label><span><p>2</p></span>Departing from *</label>
        <div class="NH042-from--dropdown">
          <p>Choose departure point</p>
          ${from}
        </div>
      `;

      htmlDiv.innerHTML = htmlContent;
      return htmlDiv;
    },
    /*	AJAX request for towns
		*	This collects the towns based on
		*	what region is selected
		*/
    requestTowns(regionId, callback) {
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
    },
    /*	Region click events
		*	@desc This function populates the child list
		*	of the regions on click.
		*/
    regionClick() {
      const { components } = Experiment;
      let els = document.querySelectorAll('.NH042-from--dropdown > ul > li');
      for (let z = 0; els.length > z; z++) {
        // Open elements
        els[z].addEventListener('click', function() {
          // Get ID
          let id = this.getAttribute('value');
          
          let hasId = document.querySelector('.NH042-current-value');
          if (hasId) {
            hasId.classList.remove('NH042-current-value');
          }
          this.classList.add('NH042-current-value');
          
          if (els[z].classList.contains('NH042-towns-added')) {
            return;
          } else {
            // Create nested elements
            let div = document.createElement('div');
            div.classList.add('NH042-nested-div');
            let childUl = document.createElement('ul');
            div.appendChild(childUl);
            
            // Request towns 
            components.requestTowns(id, function(data) {
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
          els[z].classList.add('NH042-towns-added');
        });
      }
    },
  },
  /* eslint-enable */
};

export default Experiment;
