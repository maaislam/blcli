/*eslint-disable */
/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';


utils.events.setTrackerName('tracker2');
// NH014 - Experiment Title
const NH014 = (() => {
	
	let $ = null;

	// Experiment code
	const activate = () => {
		
		// Product listings
		let productListing = document.querySelectorAll('.result-item');
		let quickViewBtn = document.querySelectorAll('a.quick-view');
		const viewBtn = [...quickViewBtn];
		
		
		// For each product
		for (let i = 0; viewBtn.length > i; i++) {
			viewBtn[i].addEventListener("click", function(e) {
			

				document.body.classList.add('NH014'); 

				const tourId = e.currentTarget.dataset['tourid'];
				const resultContent = document.querySelector('.result-content[data-tourid="' + tourId + '"]');
				const resultItem = resultContent.parentNode;
				

				////////////////////////////////////////////
				// Relative element data ^^^ 
				////////////////////////////////////////////
				let price, infoBtn, bookBtn, title, departPoints, hotel, date, duration, seatRow, seating, availSeatsGuide, numSeating, rooms, highlightText; 
				price = resultItem.querySelector('.current-price');
				infoBtn = resultItem.querySelector('a.btn-more-info');
				bookBtn = resultItem.querySelector('a.btn-book-now');
				title = resultItem.querySelector('.itin-title');
				hotel = resultItem.querySelector('span.tour-hotel');
				duration = resultItem.querySelector('span.tour-duration');
				availSeatsGuide = resultItem.querySelector('.seat-availability');
				
				//////////////////////////////////////////
				// Duplicate elements 
				//////////////////////////////////////////
				let _price = price.cloneNode(true);
				let _infoBtn = infoBtn.cloneNode(true);
				let _bookBtn = bookBtn.cloneNode(true);
				let _title = title.cloneNode(true);
				let _hotel = hotel.cloneNode(true);
				duration = duration.cloneNode(true); 
				
				
				// AJAX Data
				let pageUrl = _infoBtn.getAttribute('href');
				
				let request = new XMLHttpRequest();
				request.open('GET', pageUrl, true);
				
				request.onload = function() {
					if (request.status >= 200 && request.status < 400) {
						let resp = request.responseText;
						let html = document.createElement('div');
						html.innerHTML = resp;

						if (html) {
							date = html.querySelectorAll('#ddlMoreDates option');
							seatRow = html.querySelectorAll('#seatPlanCont .seat-row');
							
							duration = html.querySelector('.destination-box span.blue-line');
							
							let middleCont = document.querySelector('#divQuickviewPopup .columns .middle');
						

							///////////////////////////////////////////////////////////////
							// Departure locations
							///////////////////////////////////////////////////////////////
							let hasDeparts = document.querySelector('.nh14-depart-list');
							let departList = html.querySelectorAll('.date-selected .link ul.points li');
							let departArr = Array.prototype.slice.apply(departList);
							let theseDeparts = departArr.slice(1, 5);

							if (hasDeparts) {
								hasDeparts.remove();
							}
							const departUl = document.createElement('ul');
							departUl.classList.add('nh14-depart-list');
							for (let i = 0; theseDeparts.length > i; i++) {
								let departText = theseDeparts[i].innerText.replace(/,/g, "");
								let li = document.createElement('li');
								
								li.innerHTML = departText;
								departUl.appendChild(li); 
							}
							
							
							///////////////////////////////////////////////////////////////
							// Bottom CTA 
							///////////////////////////////////////////////////////////////
							let bottomDiv = document.querySelector('.nh14-bottom-div');
							if (!bottomDiv) {
								// Bottom links
								bottomDiv = document.createElement('div');
								bottomDiv.classList.add('nh14-bottom-div');
								bottomDiv.classList.add('clearfix');

								_bookBtn.innerText = "Continue to booking"
								bottomDiv.appendChild(_infoBtn);
								bottomDiv.appendChild(_bookBtn); 

								middleCont.appendChild(bottomDiv);
							}

							// ///////////////////////////////////////////////////////////////
							// /// Check if highlights 
							// ///////////////////////////////////////////////////////////////
							const highlights = (() => {
								let currentHighlights = document.querySelector('.nh14-highlights');
								
								
								if (currentHighlights) {
									currentHighlights.remove();
								}
 
                let newHighlights = [...html.querySelectorAll('.tab-content [data-id="Tab1"] p')].filter((el) => {
									return /^[●•].*/.test(el.innerText);
                });
                
                // Put list into array
                const highlightsArr = [];
                const highlightsList = newHighlights.map(function(item) {
                  const text = item.childNodes;
                  text.forEach(function(el) {
                    if (el.nodeType === 3) {
                      highlightsArr.push(el);    
                    }
                  });
                });

								currentHighlights = document.createElement('div');
								currentHighlights.classList.add('nh14-highlights');
								let highlightsH2 = document.createElement('h2');
								highlightsH2.innerText = "Highlights";
                let highlightsUl = document.createElement('ul');

                // Concatinate into an LI
                highlightsArr.forEach(function(item) {
                  // console.log(item);
                  const el = item.textContent.replace(/^[●•]/, '');
                  const li = `
                    <li>${el}</li>
                  `;
                  highlightsUl.insertAdjacentHTML('beforeend', li);
                });
								
								currentHighlights.appendChild(highlightsH2);
								currentHighlights.appendChild(highlightsUl);
								// Append new highlights to page
								let highlightsRef = document.querySelector('.nh14-bottom-div');
								highlightsRef.insertAdjacentElement('beforebegin', currentHighlights);
								
							})();

							////////////////////////////////////////////////////////
							// Travel row data collection
							////////////////////////////////////////////////////////
							let thisDate = resultItem.querySelector('span.tour-date').innerText;
							let thisDay = thisDate.split(' ')[1];
							let thisMonth = thisDate.split(' ')[2];
							let thisYear = thisDate.split(' ')[3];

							////////////////////////////////////////////////////////
							// Time data collection
							////////////////////////////////////////////////////////
							let thisTime = resultItem.querySelector('.details div[data-tourid] span.from-point a.quick-view').innerHTML;
							thisTime.trim();
							let timeMatch = thisTime.match(/\w+\s\w+\s(\d+.\d+)/); 
							let departMatch = thisTime.match(/(\w+)\s\w+\s\d+.\d+/);
							

							let time;
							if (timeMatch) {
								time = timeMatch[1];
							}
							
							let depart;
							if (departMatch) {
								depart = departMatch[1];
							} 
							

							////////////////////////////////////////////////////////
							// Remove travel row if already exists and populating the 
							// travel row with data.
							////////////////////////////////////////////////////////
							let travelDiv = document.querySelector('.nh14-travel-div');
							if (travelDiv) {
								travelDiv.remove();
							}
							let travelHTML = `
							<div class="nh14-travel-div">
								<div class="nh14-icon nh14-ib">
									<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjlweCIgaGVpZ2h0PSIzNXB4IiB2aWV3Qm94PSIwIDAgMjkgMzUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQwNy4wMDAwMDAsIC04MDguMDAwMDAwKSIgZmlsbD0iI0Y2NzQzQSI+CiAgICAgICAgICAgIDxnIGlkPSJjb2FjaC1ib3giIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM5NC4wMDAwMDAsIDc4MC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik00Miw0NS4yMjI4NTA3IEw0MiwzNi4yMDEzNTc1IEw0MiwzNS4wNTMxNjc0IEw0MiwzMS43NzI2MjQ0IEM0MiwyOS42NDAyNzE1IDQwLjMyMzY5OTQsMjggMzguMTQ0NTA4NywyOCBMMTYuODU1NDkxMywyOCBDMTQuODQzOTMwNiwyOCAxMywyOS42NDAyNzE1IDEzLDMxLjc3MjYyNDQgTDEzLDM1LjA1MzE2NzQgTDEzLDM2LjIwMTM1NzUgTDEzLDQ1LjIyMjg1MDcgTDEzLDQ2LjM3MTA0MDcgTDEzLDQ4LjY2NzQyMDggTDEzLDUyLjYwNDA3MjQgTDEzLDU4LjM0NTAyMjYgTDE1LjAxMTU2MDcsNTguMzQ1MDIyNiBMMTUuMDExNTYwNyw2MC42NDE0MDI3IEMxNS4wMTE1NjA3LDYyLjYwOTcyODUgMTkuMDM0NjgyMSw2Mi42MDk3Mjg1IDE5LjAzNDY4MjEsNjAuNjQxNDAyNyBMMTkuMDM0NjgyMSw1OC4zNDUwMjI2IEwzNS45NjUzMTc5LDU4LjM0NTAyMjYgTDM1Ljk2NTMxNzksNjAuNjQxNDAyNyBDMzUuOTY1MzE3OSw2Mi42MDk3Mjg1IDQwLjE1NjA2OTQsNjIuNjA5NzI4NSA0MC4xNTYwNjk0LDYwLjY0MTQwMjcgTDQwLjE1NjA2OTQsNTguMzQ1MDIyNiBMNDIsNTguMzQ1MDIyNiBMNDIsNTIuNjA0MDcyNCBMNDIsNDguNjY3NDIwOCBMNDIsNDYuMzcxMDQwNyBMNDIsNDUuMjIyODUwNyBaIE0zMC4yNjU4OTYsNDcuMzU1MjAzNiBMMjguMDg2NzA1Miw0Ny4zNTUyMDM2IEwyNi45MTMyOTQ4LDQ3LjM1NTIwMzYgTDE2Ljg1NTQ5MTMsNDcuMzU1MjAzNiBDMTUuODQ5NzExLDQ3LjM1NTIwMzYgMTQuODQzOTMwNiw0Ni41MzUwNjc5IDE0Ljg0MzkzMDYsNDUuMzg2ODc3OCBMMTQuODQzOTMwNiwzNi41Mjk0MTE4IEMxNC44NDM5MzA2LDM1LjU0NTI0ODkgMTUuODQ5NzExLDM0LjU2MTA4NiAxNi44NTU0OTEzLDM0LjU2MTA4NiBMMjYuOTEzMjk0OCwzNC41NjEwODYgTDI4LjA4NjcwNTIsMzQuNTYxMDg2IEwzOC4xNDQ1MDg3LDM0LjU2MTA4NiBDMzkuMzE3OTE5MSwzNC41NjEwODYgNDAuMTU2MDY5NCwzNS41NDUyNDg5IDQwLjE1NjA2OTQsMzYuNTI5NDExOCBMNDAuMTU2MDY5NCw0NS4zODY4Nzc4IEM0MC4xNTYwNjk0LDQ2LjUzNTA2NzkgMzkuMzE3OTE5MSw0Ny4zNTUyMDM2IDM4LjE0NDUwODcsNDcuMzU1MjAzNiBMMzYuOTcxMDk4Myw0Ny4zNTUyMDM2IEwzMC4yNjU4OTYsNDcuMzU1MjAzNiBaIE0zNy44MDkyNDg2LDU1LjM5MjUzMzkgQzM2LjYzNTgzODIsNTUuMzkyNTMzOSAzNS43OTc2ODc5LDU0LjU3MjM5ODIgMzUuNzk3Njg3OSw1My40MjQyMDgxIEMzNS43OTc2ODc5LDUyLjI3NjAxODEgMzYuNjM1ODM4Miw1MS40NTU4ODI0IDM3LjgwOTI0ODYsNTEuNDU1ODgyNCBDMzguOTgyNjU5LDUxLjQ1NTg4MjQgMzkuODIwODA5Miw1Mi4yNzYwMTgxIDM5LjgyMDgwOTIsNTMuNDI0MjA4MSBDMzkuODIwODA5Miw1NC41NzIzOTgyIDM4Ljk4MjY1OSw1NS4zOTI1MzM5IDM3LjgwOTI0ODYsNTUuMzkyNTMzOSBMMzcuODA5MjQ4Niw1NS4zOTI1MzM5IFogTTMyLjk0Nzk3NjksNTMuOTE2Mjg5NiBMMjcuNTgzODE1LDUzLjkxNjI4OTYgTDIyLjIxOTY1MzIsNTMuOTE2Mjg5NiBDMjEuNTQ5MTMyOSw1My45MTYyODk2IDIxLjU0OTEzMjksNTIuNzY4MDk5NSAyMi4yMTk2NTMyLDUyLjc2ODA5OTUgTDI3LjU4MzgxNSw1Mi43NjgwOTk1IEwzMi45NDc5NzY5LDUyLjc2ODA5OTUgQzMzLjYxODQ5NzEsNTIuNzY4MDk5NSAzMy42MTg0OTcxLDUzLjkxNjI4OTYgMzIuOTQ3OTc2OSw1My45MTYyODk2IEwzMi45NDc5NzY5LDUzLjkxNjI4OTYgWiBNMzEuMTA0MDQ2Miw1NS43MjA1ODgyIEwyNC4wNjM1ODM4LDU1LjcyMDU4ODIgQzIzLjIyNTQzMzUsNTUuNzIwNTg4MiAyMi41NTQ5MTMzLDU1LjM5MjUzMzkgMjIuMDUyMDIzMSw1NC43MzY0MjUzIEwzMy4xMTU2MDY5LDU0LjczNjQyNTMgQzMyLjYxMjcxNjgsNTUuMzkyNTMzOSAzMS45NDIxOTY1LDU1LjcyMDU4ODIgMzEuMTA0MDQ2Miw1NS43MjA1ODgyIEwzMS4xMDQwNDYyLDU1LjcyMDU4ODIgWiBNMTcuMzU4MzgxNSw1NS4zOTI1MzM5IEMxNi4xODQ5NzExLDU1LjM5MjUzMzkgMTUuMzQ2ODIwOCw1NC41NzIzOTgyIDE1LjM0NjgyMDgsNTMuNDI0MjA4MSBDMTUuMzQ2ODIwOCw1Mi4yNzYwMTgxIDE2LjE4NDk3MTEsNTEuNDU1ODgyNCAxNy4zNTgzODE1LDUxLjQ1NTg4MjQgQzE4LjM2NDE2MTgsNTEuNDU1ODgyNCAxOS4zNjk5NDIyLDUyLjI3NjAxODEgMTkuMzY5OTQyMiw1My40MjQyMDgxIEMxOS4zNjk5NDIyLDU0LjU3MjM5ODIgMTguMzY0MTYxOCw1NS4zOTI1MzM5IDE3LjM1ODM4MTUsNTUuMzkyNTMzOSBMMTcuMzU4MzgxNSw1NS4zOTI1MzM5IFogTTMxLjEwNDA0NjIsNTAuOTYzODAwOSBDMzEuOTQyMTk2NSw1MC45NjM4MDA5IDMyLjYxMjcxNjgsNTEuNDU1ODgyNCAzMy4xMTU2MDY5LDUyLjExMTk5MSBMMjIuMDUyMDIzMSw1Mi4xMTE5OTEgQzIyLjU1NDkxMzMsNTEuNDU1ODgyNCAyMy4yMjU0MzM1LDUwLjk2MzgwMDkgMjQuMDYzNTgzOCw1MC45NjM4MDA5IEwyNy41ODM4MTUsNTAuOTYzODAwOSBMMzEuMTA0MDQ2Miw1MC45NjM4MDA5IFogTTE5LjcwNTIwMjMsMjkuMzEyMjE3MiBMMjcuNTgzODE1LDI5LjMxMjIxNzIgTDM1LjQ2MjQyNzcsMjkuMzEyMjE3MiBDMzcuNDczOTg4NCwyOS4zMTIyMTcyIDM3LjQ3Mzk4ODQsMzIuMTAwNjc4NyAzNS40NjI0Mjc3LDMyLjEwMDY3ODcgTDI3LjU4MzgxNSwzMi4xMDA2Nzg3IEwxOS43MDUyMDIzLDMyLjEwMDY3ODcgQzE3LjY5MzY0MTYsMzIuMTAwNjc4NyAxNy42OTM2NDE2LDI5LjMxMjIxNzIgMTkuNzA1MjAyMywyOS4zMTIyMTcyIEwxOS43MDUyMDIzLDI5LjMxMjIxNzIgWiIgaWQ9IkZpbGwtMSI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=">
									<p>Coach</p>
								</div>
								
								<div class="nh14-travel-border nh14-ib">
									<div class="nh14-ib nh14-travel-details">
										<p>Departs on...</p>
										<p>
										<p class="day">${thisDay}</p>
										<p class="month-year">${thisMonth}<br>${thisYear} </p>
										</p>
									</div>
									<div class="nh14-ib nh14-depart-time nh14-travel-details">
										<p>at...</p>
										<p class="nh14-time">${time} <span id="nh14-time-of-day"></span></p>
									</div>
									<div class="nh14-ib nh14-depart nh14-travel-details">
										<p>from...</p>
										<p class="nh14-depart-point">${depart}</p>
									</div>
									<div class="nh14-ib nh14-travel-details">
										<p>alternative pick ups</p>
										${departUl.outerHTML}
									</div>
								</div>
							</div>
							`;

							
							///////////////////////////////////////////////////////////////
							/// Remove hotel row if already exists and populating the hotel 
							/// row with data.
							///////////////////////////////////////////////////////////////
							let hotelDiv = document.querySelector('.nh14-hotel-div');
							if (hotelDiv) {
								hotelDiv.remove();
							}
							let hotelHTML = `
							<div class="nh14-hotel-div nh14-travel-div">
								<div class="nh14-icon nh14-ib">
									<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzVweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMzUgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5ob3RlbDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPgogICAgICAgIDxwb2x5Z29uIGlkPSJwYXRoLTEiIHBvaW50cz0iMzAuNDYxMTYyNCAwIC01LjMyOTA3MDUyZS0xNSA4LjE0MjAyODE3ZS0xNSAtMy4zMjQ5NzU2MmUtMTUgMTEuMDc2ODQ2NyAzMC40NjExNjI0IDExLjA3Njg0NjcgMzAuNDYxMTYyNCAxLjA4NTYwMzc2ZS0xNCI+PC9wb2x5Z29uPgogICAgICAgIDxwb2x5Z29uIGlkPSJwYXRoLTMiIHBvaW50cz0iMzQuMTUzODQ2MiA0LjYxNTIxNjc4IDAgNC42MTUyMTY3OCAwIDIuMzA3NjA4MzkgMCAwIDM0LjE1Mzg0NjIgMCI+PC9wb2x5Z29uPgogICAgPC9kZWZzPgogICAgPGcgaWQ9IldlbGNvbWUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJRdWljay1WaWV3LS0tQm9vay1Ob3ciIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00MDUuMDAwMDAwLCAtOTEzLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iaG90ZWwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQwNS4wMDAwMDAsIDkxMy4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjkyMzA3NywgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8bWFzayBpZD0ibWFzay0yIiBmaWxsPSJ3aGl0ZSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgICAgICAgICAgICAgPC9tYXNrPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJDbGlwLTIiPjwvZz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMy4zODQ2MTUzOCwxMC44ODcwODc1IEMzLjM4NDYxNTM4LDkuMDk2NDQ1NjIgNC44MTg1NjQxLDcuNjM5MjU3MjkgNi41ODE5NDg3Miw3LjYzOTI1NzI5IEwxMC4zNDA3NTIxLDcuNjM5MjU3MjkgQzEyLjEwMzc2MDcsNy42MzkyNTcyOSAxMy41MzgwODU1LDkuMDk2MDYzNjYgMTMuNTM4MDg1NSwxMC44ODcwODc1IEwxMy41MzgwODU1LDExLjA3NjkyMzEgTDE2LjkyMjcwMDksMTEuMDc2OTIzMSBMMTYuOTIyNzAwOSwxMC44ODcwODc1IEMxNi45MjI3MDA5LDkuMDk2NDQ1NjIgMTguMzU3MDI1Niw3LjYzOTI1NzI5IDIwLjEyMDAzNDIsNy42MzkyNTcyOSBMMjMuODc5MjEzNyw3LjYzOTI1NzI5IEMyNS42NDIyMjIyLDcuNjM5MjU3MjkgMjcuMDc2NTQ3LDkuMDk2MDYzNjYgMjcuMDc2NTQ3LDEwLjg4NzA4NzUgTDI3LjA3NjU0NywxMS4wNzY5MjMxIEwzMC40NjExNjI0LDExLjA3NjkyMzEgTDMwLjQ2MTE2MjQsNS4xNTc2NDQ1NiBDMzAuNDYxMTYyNCwyLjMxMzkzMTAzIDI4LjE4MzMxNjIsMCAyNS4zODM0ODcyLDAgTDUuMDc3Njc1MjEsMCBDMi4yNzc4NDYxNSwwIDAsMi4zMTM5MzEwMyAwLDUuMTU3NjQ0NTYgTDAsMTEuMDc2OTIzMSBMMy4zODQ2MTUzOCwxMS4wNzY5MjMxIEwzLjM4NDYxNTM4LDEwLjg4NzA4NzUgWiIgaWQ9IkZpbGwtMSIgZmlsbD0iI0Y2NzQzQSIgbWFzaz0idXJsKCNtYXNrLTIpIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMzIuNzY2OTY5NywxMyBMMS4zODY0OTI2NSwxMyBDMC42MjIwNjA1MDEsMTMgMCwxMy41OTcxMjIyIDAsMTQuMzMxNDU3IEwwLDE5LjQ2MTUzODUgTDM0LjE1Mzg0NjIsMTkuNDYxNTM4NSBMMzQuMTUzODQ2MiwxNC4zMzE0NTcgQzM0LjE1MzQ2MjQsMTMuNTk3MTIyMiAzMy41MzE0MDE5LDEzIDMyLjc2Njk2OTcsMTMiIGlkPSJGaWxsLTQiIGZpbGw9IiNGNjc0M0EiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC04IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgMTkuMzg0NjE1KSI+CiAgICAgICAgICAgICAgICAgICAgPG1hc2sgaWQ9Im1hc2stNCIgZmlsbD0id2hpdGUiPgogICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNwYXRoLTMiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgIDwvbWFzaz4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iQ2xpcC03Ij48L2c+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsNS42MTUzODQ2MiBMNC42MTIzMDQyNCw1LjYxNTM4NDYyIEM0LjcxMDkyODI2LDQuMjA4NTMxNDcgNS43ODg4ODUwNSwzLjA5NzkwMjEgNy4xMDAxNjI0OSwzLjA5NzkwMjEgTDI3LjA1MzY4MzcsMy4wOTc5MDIxIEMyOC4zNjQ1Nzc0LDMuMDk3OTAyMSAyOS40NDMzMDE2LDQuMjA4NTMxNDcgMjkuNTQxMTU4Miw1LjYxNTM4NDYyIEwzNC4xNTM4NDYyLDUuNjE1Mzg0NjIgTDM0LjE1Mzg0NjIsMSBMMCwxIEwwLDUuNjE1Mzg0NjIgWiIgaWQ9IkZpbGwtNiIgZmlsbD0iI0Y2NzQzQSIgbWFzaz0idXJsKCNtYXNrLTQpIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
									<p>Hotel</p>
								</div>
								<div class="nh14-travel-border nh14-ib">
									<div class="nh14-staying-at nh14-ib"> 
										<p>Staying at...</p>
										${_hotel.outerHTML}
									</div>
									<div class="nh14-rooms-div nh14-ib">
										<p>Types of rooms offered</p>
										<div class="nh14-single nh14-ib">
											<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
											<p>Single</p>
										</div>
										<div class="nh14-twin nh14-ib">
											<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
											<div class="nh14-space"></div>
											<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
											<p>Twin</p>
										</div>
										<div class="nh14-double nh14-ib">
											<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
											<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
											<p>Double</p>
										</div>
										<div class="nh14-triple nh14-ib">
											<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
											<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
											<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
											<p>Triple</p>
										</div>
										<div class="nh14-quad nh14-ib">
											<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
											<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
											<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
											<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
											<p>Quad</p>
										</div>
									</div>
								</div>
							</div>
							`;


							////////////////////////////////////////////////////////
							/// Appending the template HTML to the popup box
							////////////////////////////////////////////////////////
							let refDiv = document.querySelector('.seat-availability');
							refDiv.insertAdjacentHTML('afterend', travelHTML);

							let refDiv2 = document.querySelector('.nh14-travel-div');
							refDiv2.insertAdjacentHTML('afterend', hotelHTML);
							


							////////////////////////////////////////////////////////
							// Determine if AM or PM
							////////////////////////////////////////////////////////
							let timeOfDay = document.querySelector('#nh14-time-of-day');
							if (timeMatch) {
								let timeSub = time.substring(0, 2);
								if (timeSub >= 12) {
									timeOfDay.innerText = "pm";
								} else {
									timeOfDay.innerText = "am";
								}
							}


							/////////////////////////////////////////////////
							/// Determining what rooms are available 
							/// and adding a 'show' class if so.
							/////////////////////////////////////////////////
							rooms = html.querySelectorAll('.price-table .blue-table .row:not(.head) .cell:first-of-type');														
							let roomsArr = [...rooms];
							roomsArr.forEach(el => {
								let roomText = el.innerText.trim().toLowerCase();
					
						
								if (roomText.indexOf('single') > -1) {
									let thisSingle = document.querySelector('.nh14-single');
									thisSingle.classList.add('nh14-show');
								} 
								else if (roomText.indexOf('twin') > -1) {
									let thisTwin = document.querySelector('.nh14-twin');
									thisTwin.classList.add('nh14-show');
								}
								else if (roomText.indexOf('double') > -1) {
									let thisDouble = document.querySelector('.nh14-double');
									thisDouble.classList.add('nh14-show');
								} 
								else if (roomText.indexOf('triple') > -1) {
									let thisTriple = document.querySelector('.nh14-triple');
									thisTriple.classList.add('nh14-show');
								}
								else if (roomText.indexOf('quad') > -1) {
									let thisQuad = document.querySelector('.nh14-quad');
									thisQuad.classList.add('nh14-show');
								}
							}); 
							
							
							
							////////////////////////////////////////////////////////
							// If no time
							////////////////////////////////////////////////////////
							let timeBlock = document.querySelector('.nh14-depart-time');
							if (!timeMatch) {
								timeBlock.classList.add('nh14-remove-time');
							}

							////////////////////////////////////////////////////////
							// If no depart
							////////////////////////////////////////////////////////
							let departBlock = document.querySelector('.nh14-depart');
							if (!departMatch) {
								departBlock.classList.add('nh14-remove-depart');
							}


							// Add title before plane
							let hasSeatTitle = document.querySelector('.nh14-seating-title');
							if (hasSeatTitle) {
								hasSeatTitle.remove();
							}
							let seatRef = document.querySelector('#divQuickviewPopup .seat-area');
							const seatingTitle = (() => {
								let seatTitle = '<p class="nh14-seating-title">Seating Availability</p>';

								if (seatRef) {
									seatRef.insertAdjacentHTML('beforebegin', seatTitle);
								}
							})();
							
              utils.eventFire(document, 'nh14didbuildcore');
							
							const loadingSeats = (() => {

								let loader = document.createElement('div');
								let loaderChild = document.createElement('div');
								loader.appendChild(loaderChild);
								loader.classList.add('nh14-loading');

								if (seatRef) {
									seatRef.insertAdjacentElement('afterbegin', loader);
								}
								setTimeout(function() {
									loader.remove();
								}, 2000)
							})();
							

						}
						
						
					} else {
						
					}
				};
				request.onerror = function() {

				};
				request.send();

				////////////////////////////////////////////////////////
				// remove 's' from duration string
				////////////////////////////////////////////////////////
				let _duration = duration.innerText.split('s');
				let __duration = _duration[0];
				let ___duration = __duration.toLowerCase();
				
				
				////////////////////////////////////////////////////////
				// Retrieve popup window
				////////////////////////////////////////////////////////
				let popupWindow = document.querySelector('#divQuickviewPopup .content .middle');
				
				
				////////////////////////////////////////////////////////
				// Title
				////////////////////////////////////////////////////////
				let titleWrap = document.querySelector('.new-title-wrap');
				let titleH3 = document.querySelector('.new-title');
				let thisTitle = resultItem.querySelector('.itin-title');
				if (!titleH3) {
					titleWrap = document.createElement('div');
					titleWrap.classList.add('new-title-wrap');
					titleH3 = document.createElement('h2');
					titleH3.classList.add('new-title');
					
					titleWrap.append(titleH3);
					popupWindow.insertAdjacentElement('afterbegin', titleWrap);
				}
				titleH3.innerHTML = thisTitle.innerText;
				

				////////////////////////////////////////////////////////
				// Subtitle
				////////////////////////////////////////////////////////
				const subtitle = (() => {
					let thisSubtitle = document.querySelector('.new-subtitle');
					if (!thisSubtitle) {
						thisSubtitle = document.createElement('h3');
						thisSubtitle.classList.add('new-subtitle');
						
						titleWrap.appendChild(thisSubtitle);
					}

					let tripWord = "";
					let durationInt = parseInt(___duration);
					
					if (durationInt >= 2 && durationInt <= 5) {
						tripWord = "break";
					} 
					else if (durationInt >= 6) {
						tripWord = "holiday";
					}
					if (_hotel) {
						thisSubtitle.innerHTML = ___duration + ' ' + tripWord + ' | Staying at the ' + _hotel.innerText;
					} else {
						thisSubtitle.innerHTML = ___duration + ' ' + tripWord;
					}
				})();
				 

				//////////////////////////////////////////
				// Top level container with booking cta
				//////////////////////////////////////////
				let btDiv = document.querySelector('.nh14-before-trip');
				if (!btDiv) {
					btDiv = document.createElement('div');
					btDiv.classList.add('nh14-before-trip');
					btDiv.classList.add('clearfix');
					// Clone booking button and change text
					let contBooking = bookBtn.cloneNode(true);
					contBooking.innerText = "Continue to booking";

					let btTitle = document.createElement('h3');
					btTitle.innerText = "Before you book your trip...";
					btDiv.appendChild(btTitle);	
					btDiv.appendChild(contBooking);	
					popupWindow.insertAdjacentElement('afterbegin', btDiv);
				}
 

				//////////////////////////////////////////
				// Seating availability
				//////////////////////////////////////////
				
				let updateSeatCount = () => {
					let hasSeating = document.querySelector('#divQuickviewPopup #seatPlan');
					let seatCount = 0;
					if (hasSeating) {
						const tt = Array.from(document.querySelectorAll('.seat-area .seat')).filter(function(item) {
							let hasUnavailable = item.classList.contains('unavailable');
							let hasBlank = item.classList.contains('blank');
							return !hasBlank && hasUnavailable;
						});
			
						seatCount = tt.length;
	

						let hasSeats = document.querySelector('.nh14-seats');
						let seatReference = document.querySelector('#divQuickviewPopup .seat-area');
						let seatString;

						if (hasSeats) {
							hasSeats.remove();
						}

						if (seatCount < 20) {
							seatString = `
								<div class="nh14-seats">
									<p class="nh14-seat-avail">
										Only ${seatCount}<br> <span>seats</span> left!
									</p>
									<p class="nh14-seat-info">
										Seating will be chosen at the booking stage
									</p>
								</div>
							`;
						} else if (seatCount == 1) {
							seatString = `
								<div class="nh14-seats">
									<p class="nh14-seat-avail">
										Only ${seatCount}<br> <span>seat</span> left!
									</p>
									<p class="nh14-seat-info">
										Seating will be chosen at the booking stage
									</p>
								</div>
							`;
						}
						else if (seatCount >= 20) {
							seatString = `
							<div class="nh14-seats">
								<p class="nh14-seat-info">
									Seating will be chosen at the booking stage
								</p>
							</div>
							`;
						}

						seatReference.insertAdjacentHTML('beforeend', seatString);

					}
				}
				  
				
				/*
				 * Run again after 1s to make sure all seats are loaded in
				 * Sometimes there's a race condition where not all seats are
				 * availabile when this runs
				 */
				// setTimeout(updateSeatCount, 5000); 

				$(document).ajaxComplete(function(event, xhr, options) {
					if (options.url.match('GetSeatplan')) {
						updateSeatCount();
					}
				}); 

				
				////////////////////////////
				// GA Tracking Elements
				////////////////////////////
				let gaQuickView = document.querySelectorAll('a.quick-view');
				for (let z = 0; gaQuickView.length > z; z++) {
					gaQuickView[z].addEventListener('click', function() {
						utils.events.send('NH014', 'Click', 'Clicked on a quick view link', {sendOne: true});
					});
				}

				let gaBtn1 = document.querySelectorAll('a.btn-book-now');
				for (let j = 0; gaBtn1.length > j; j++) {
					gaBtn1[j].addEventListener('click', function() {
						utils.events.send('NH014', 'Click', 'Used continue to booking', {sendOnce: true});
					});
				}

				let gaBtn2 = document.querySelector('a.btn-more-info');
				gaBtn2.addEventListener('click', function() {
					utils.events.send('NH014', 'Click', 'Used more info button', {sendOnce: true});
				});


			});
		}
		


		document.onload = function() {
			window.location = 'https://www.nationalholidays.com/WebServices/SeatplanService.asmx/GetSeatplan';
		};

		
  
	}; // End of activate    
	

	
	// Audience conditions
	const triggers = (options) => {
		// FullStory tagging
		utils.fullStory('NH014', 'Variation 1');
		
		
		activate();
		
	};

	// -----------------------------------------------------------
	// Poll elements required for *all* tests
	// -----------------------------------------------------------
	const poller = UC.poller([
		() => !!window.jQuery,
		"#divQuickviewPopup",
		'.seat-area',
		'.btn-book-now',
		'.btn-more-info',
		'.itin-title',
		'.price'
	], () => {
		
		$ = window.jQuery;

		triggers();
	});

})();
