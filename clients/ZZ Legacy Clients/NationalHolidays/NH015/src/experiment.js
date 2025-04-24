/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

let VARIATION = null;
if(typeof NH15VARIATION != 'undefined') {
    VARIATION = NH15VARIATION;
} else {
    VARIATION = 1;
} 

utils.events.setTrackerName('tracker2');
 
// ID - Experiment Title
const NH015 = (() => {

	// Experiment code
	const activate = () => {

		document.body.classList.add('NH015');

		if (VARIATION == 3) {
			document.body.classList.add('NH015-V3');
		}

		// Store values and elements
		var results = document.querySelector('.matching-results');		

		if (results) {
			var resultsNum = results.querySelector('strong').innerHTML.trim();
		}

		let destination = document.querySelector('.search-fields .one input');
		if (destination) {
			destination = destination.value;
		}
		
		// Store sidebar filter
		var filter = document.querySelector('.search-content aside.left');
		if (filter) {
			var filterDup = filter.cloneNode(true);
			filterDup.setAttribute('class', 'nh15-new-filter');
			// Store active filter data
			var activeFilter = filterDup.querySelectorAll('li');
		}
		
		
		// // New search title
		var newSearchTitle = " Search results ";
		
		// Append sortBy to wrapper
		var sortBy = document.querySelector('.show-filter #ctl00_ctl00_pnlSort');
		var sortByWrap = document.createElement('div');
		// var sbLabel = document.querySelector('.show-filter #ctl00_ctl00_pnlSort label');
		sortByWrap.setAttribute('class', 'nh15-sortby-wrap');
		if (sortBy) {
			// sortByWrap.appendChild(sbLabel);
			sortByWrap.appendChild(sortBy);
		}


		// Store and append 'Show 10' & Sort By
		var showNum = document.querySelector('.show-filter #ctl00_ctl00_pnlPageSize');

		if (showNum && VARIATION == 1) {
			//sortByWrap.appendChild(snLabel);
			sortByWrap.appendChild(showNum);
		}

		
		// Check if destination exists
		if (resultsNum) {
			
		 	// Build new title with results number
			var newH2 = document.createElement('h2');

			// Adding number within strong
			newH2.insertAdjacentHTML('afterbegin', resultsNum);
		

			// Adding new string in to p
			newH2.insertAdjacentHTML('beforeend', newSearchTitle);

			if (destination) {
				// Adding destination to p
				newH2.insertAdjacentHTML('beforeend', "for " + destination);
			}
			
		} else {
			return false;
		}
		

		// Create new container for below 'Holiday search' box
		var newDiv = document.createElement('div');
		newDiv.setAttribute('class', 'container nh15-new-results');
		
		
		// Create filter button 
		var newBtn = document.createElement('a');
		newBtn.setAttribute('class', 'nh15-new-filter-btn l-blue-btn');
		newBtn.textContent = "Filter";
		
		// Create filter tooltip
		var tooltip = document.createElement('div');
		tooltip.setAttribute('class', 'nh15-filter-tooltip');
		var tooltipText = document.createElement('p');
		tooltipText.textContent = "Click to filter down your trip even further";
		
		// Append p tag to tooltip
		tooltip.appendChild(tooltipText);
		
		// Append elements to new div
		if (newH2) {
			newDiv.appendChild(newH2);
		}
		newDiv.appendChild(newBtn);
		newDiv.appendChild(tooltip);
		
		// Append new div below search again container 
		var refNode = document.querySelector('.search-again');
		refNode.parentNode.insertBefore(newDiv, refNode.nextSibling);
 
		
		// Move filters
		if (filter) {
			newDiv.appendChild(filterDup); 
		}

		// Move sort by filter to above posts
		var postParent = document.querySelector('.search-content .two-columns');
		postParent.insertBefore(sortByWrap, postParent.childNodes[1]);
		
		
		
		// Add event listener to new filter button
		if (newBtn && filterDup) {
			newBtn.addEventListener("click", function(e) {
				e.preventDefault();
				this.classList.toggle('rotate-arrow');
				filterDup.classList.toggle("visible");
				tooltip.classList.add('fade-out');
			});
			
			// Close tooltip 
			tooltip.addEventListener("click", function() {
				this.classList.add('fade-out');
			});

			
			// Collect active filters
			var activeFilter = filterDup.querySelectorAll('li.active');
			
			
			// Convert NodeList to HTML Collection
			const activeFilterArr = Array.from(activeFilter);
			
			// Collect active filter text
			for (var i = 0; i < activeFilterArr.length; i++) {
				let activeFilterText = activeFilterArr[i].querySelector('a');
				activeFilterText = activeFilterText.innerText.trim();	 
				
				
				// Create new filter title
				const h4Wrap = document.createElement('h4');
				h4Wrap.innerText = activeFilterText;
				
				// Adding class to both filters
				let h4WithClass = h4Wrap.classList.add('nh15-filter-item-' + i);
				let filterWithClass = activeFilter[i].classList.add('nh15-filter-item-' + i);
				let filterAnchor = activeFilter[i].querySelector('a.filter-option-remove');

				
				// Append new H4 after filter
				newDiv.insertBefore(h4Wrap, filterDup);
				
				
				// Add event listener for H4 to remove relative filter
				h4Wrap.addEventListener("click", function() {
					if (filterWithClass == h4WithClass) {
						
						window.location = filterAnchor;
						
					}
				});
			}

			// Add event listener to h3 for ul list
			var filterTitle = filterDup.querySelectorAll('h3');

			for (var i = 0; i < filterTitle.length; i++) {
				filterTitle[i].addEventListener("click", function() {
					var adjUl = this.nextElementSibling;
					adjUl.classList.toggle("visible");
				});
			}




		} // end of IF for newBtn && filterDup



		///////////////////////////////////////////////////
		// Version 2 - Creating lazy load for searched posts
		///////////////////////////////////////////////////

		// Add class to body
		var bod = document.querySelector('body');
		bod.classList.add('V2');
		
		// Get the pagination container
		let pagContainer = document.querySelector('#PageNumber');
		if (VARIATION == 2 && pagContainer) {
			pagContainer.classList.add('nh15-pag-styles');
			let numPag = pagContainer.querySelectorAll('.numbers ul li');

      if(showNum) {
			  showNum.style.display = "none";
      }
		}
		
    if(pagContainer) {
      const finalPageUrl = pagContainer.querySelector('.numbers ul li:last-of-type a').href; 
      const pageCount = finalPageUrl.match(/pageindex=(\d+)/)[1];
      const url = finalPageUrl.replace('pageindex='+pageCount, 'pageindex=');

      // Next page to load
      let next = 2;
      let request = null; 
      var isRunning = false;		

      const noMore = document.createElement('div');
      noMore.classList.add('NH15-no-more'); 
      const noMoreP = document.createElement('h2');
      noMoreP.innerText = "No more posts";	
    
      noMore.appendChild(noMoreP);
    }


		// Loop over pages
		function lazyLoad() {

			if (isRunning == true) {
				return
			}
			const urlToLoad = url.replace('pageindex=', 'pageindex='+next);

			if (next > pageCount) {
				// Loading final page, add message to bottom and detatch scroll event
				postParent.appendChild(noMore);

        return;
				
			} else {

				isRunning = true;
				
				const listParent = document.querySelector('.search-content .two-columns .right');
				// AJAX request for the next pages
				request = new XMLHttpRequest();
				request.open('GET', urlToLoad, true);
				request.onload = function() {
					if (request.status >= 200 && request.status < 400) {
						// Success!
						var resp = request.responseText;

						const htmlGen = (str) => {
							let tempDiv = document.createElement('div');
							tempDiv.innerHTML = str;
							return tempDiv;
						}
						
						var html = htmlGen(resp);
						
						if (html) {
							// Turn response into elements				
							let nextPosts = html.querySelectorAll('.result-item');
							
							for (let j = 0; nextPosts.length > j; j++) {
								nextPosts[j].classList.add("new");
								var appending = listParent.appendChild(nextPosts[j]);		
								let tourBtn = nextPosts[j].querySelector('button.tour-list-btn');	
								let moreInfo = nextPosts[j].querySelector('.buttons a.btn-more-info');
								let infoLink = moreInfo.getAttribute('href');
								
								tourBtn.addEventListener("click", function(e) {
									e.preventDefault();
									window.location.href = infoLink + "#nh15moredates";
								});

								fadeIn(appending);
						
							}
							isRunning = false;
						} 
					
	
					} else {
						// Error
						
					}
	
				};
	
				request.onerror = function() {
					// Connection error
				};
	
				request.send();
		
			}// End of If nextPages

			next++;
		} // End of lazyLoad function

		
		// Fade in func
		function fadeIn(el) {
			el.style.opacity = 0;
		  
			var last = +new Date();
			var tick = function() {
			  el.style.opacity = +el.style.opacity + (new Date() - last) / 600;
			  last = +new Date();
		  
			  if (+el.style.opacity < 1) {
				(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
			  }
			};
		  
			tick();
		}
		  

		// Check if lastElPos is in viewport
		var isInView = function(el) {
			var pos = el.getBoundingClientRect();
			return (
					pos.top >= 0 &&
					pos.bottom <= (window.innerHeight || document.documentElement.clientHeight)
			);
		};

		// Window scroll listener
		if (VARIATION == 2 && pagContainer) {
			var scrollFunc = function() {
				window.addEventListener('scroll', function(event) {
					if (isInView(pagContainer)) {
						lazyLoad();
					}
				});
			}();
		}



		////////////////////////////////////////////////////////////
		////// Add tracking to elements
		////////////////////////////////////////////////////////////
		// Add event tracking for the search again feature
		let gaSendBtn = document.getElementById('btnSearchAgainSubmit');
		gaSendBtn.addEventListener("click", function(){
			utils.events.send('NH015', 'Click', 'Used search again feature', {sendOnce: true});
		});

		// Add event tracking to 'duration' select on search again
		let gaSendBtn2 = document.getElementById('ddlSearchAgainDuration');
		gaSendBtn2.addEventListener("click", function() {
			utils.events.send('NH015', 'Click', 'Used duration feature', {sendOnce: true});
		});

		// Add event tracking for new filter
		let gaSendBtn3 = newBtn;
		gaSendBtn3.addEventListener("click", function() {
			utils.events.send('NH015', 'Click', 'Used filter button', {sendOnce: true}); 
		});



	}; // End of activate()

	// Audience conditions
	const triggers = (options) => {
		// FullStory tagging
		utils.fullStory('NH015', 'Variation 1');

		activate();
	};



	

	// -----------------------------------------------------------
	// Poll elements required for *all* tests
	// -----------------------------------------------------------
	const poller = UC.poller([
		() => !!window.jQuery,
		".search-again"
	], () => {
		
		$ = window.jQuery;

		triggers();
	});

	if (window.location.hash == '#nh15moredates') {
		const poller2 = UC.poller([
			() => !!window.jQuery,
			"#ddlMoreDates"
		], function() {
			// Do scroll down animation here.
			$('html, body').animate({
				scrollTop: $('.sticky-row').offset().top
			}, 'slow');
		});
	}

	


})();
