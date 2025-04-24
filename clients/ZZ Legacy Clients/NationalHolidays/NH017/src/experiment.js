/*eslint-disable */
/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

utils.events.setTrackerName('tracker2');

// NH017 - Experiment Title
const NH017 = (() => {

	// Poll elements required for *all* tests
	const poller = UC.poller([
		() => !!window.jQuery,
		'.result-item',
		'.filters'
	], () => {
		triggers();
	});


	// Experiment code
	const activate = () => {

		let width = window.innerWidth;
		if (width < 950) {return}

		document.body.classList.add('NH017');

		/* 
		*	Store data from results 
		*	page, to be passed to resultItem
		*/
		const getData = (el) => {
			let tourId, title, img, duration, hotel, departDate, time, from, price;

			if (el) {
				
				// Get tourID
				let resultContent = el.querySelector('.result-content');
				tourId = resultContent.dataset.tourid;
				
				// Get title
				title = el.querySelector('h2.itin-title');

				// Get image
				img = el.querySelector('.result-content .image');
				if (img) {
					img = img.innerHTML;
				}

				// Get duration
				duration = el.querySelector('.result-content .details span.tour-duration');
				if (duration) {
					duration = duration.textContent;
					duration = duration.substring(0, duration.length - 1);
					let dayAmt = duration.charAt(0);
					dayAmt = parseInt(dayAmt);

					let tripString = null;

					if (dayAmt >= 2 && dayAmt <= 5) {
						tripString = dayAmt + ' day break';
					} else if (dayAmt > 5) {
						tripString = dayAmt + ' day holiday';
					}
					duration = tripString;			
				}

				// Get hotel
				hotel = el.querySelector('.result-content .details span.tour-hotel');
				if (hotel) {
					hotel = hotel.textContent;
					// Rename 'Mystery hotel' to 'National Holidays selected hotel'
					if (hotel == 'Mystery Hotel') {
						hotel = "National Holidays Selected Hotel"
					}
				}

				// Get departure date
				departDate = el.querySelector('.result-content .details span.tour-date');
				if (departDate) {
					departDate = departDate.textContent;
					let dateMatch = departDate.match(/\w+\s(\d+)\s(\w+)\s(\d+)/);
					
					let day = dateMatch[1];
					let month = dateMatch[2];
					let year = dateMatch[3];

					departDate = [day, month, year];
				}

				// Get time
				time = el.querySelector('.result-content .details span.from-point a.quick-view');
				if (time) {
					let timeText = time.textContent.trim();
					let hasTime = timeText.match(/(\d{2}:\d{2})/);

					if (hasTime) {
						time = hasTime[0];
						// Determine if AM or PM
						let hour = time.match(/^(\d+)/);
						if (hour >= 12) {
							time = time + ' <sup>pm</sup>';
						} else {
							time = time + ' <sup>am</sup>'
						}
					} else {
						time = 'Times not yet available'
					}

					// Get from
					// let hasFrom = timeText.match(/(\w+.)/g);
					let hasFrom = timeText.split('at');

					let departureTown = document.querySelector('.search-again .search-fields .five select.point-select-control');
					let departureTownText = null;
					if (departureTown) {
						departureTownText = departureTown.options[departureTown.selectedIndex].text;
					}
			
					if (hasFrom) {
						from = hasFrom[0];


						if (from == 'View info') {
							from = departureTownText;
							if (from == 'Choose a town') {
								from = 'Location unavailable';

								/*
								*	Fix for sending links, as although the departure
								*	town is in the URL, it does not get updated in 
								*	the search 'Departure Town' field. This causes the From
								*	information from being displayed.
								*/
																							

							}
						}
					
					} else {
						from = departureTownText;
					}
				}

				// Get price
				price = el.querySelector('.details .price');
				if (price) {
					const wasPrice = price.querySelector('.was-price');
					const nowPrice = price.querySelector('.current-price');
					let priceDiv = document.createElement('div');
					if (wasPrice) {
						priceDiv.appendChild(wasPrice);
						priceDiv.appendChild(nowPrice);
					} else if (nowPrice) {
						priceDiv.appendChild(nowPrice);
					}
					price = priceDiv
				}

				

				return {tourId, title, img, duration, hotel, departDate, time, from, price}
		
			}
			
		};
		

		let currentItems = document.querySelectorAll('.search-content .result-item');
		for (let i = 0; currentItems.length > i; i++) {
			// Store data
			let resultData = getData(currentItems[i]);

			// Build new template
			const newTemplate = `
				<div class="nh17-result-item result-content" data-tourid="${resultData.tourId}">
					<div class="nh17-result--left">

						<div class="nh17-resultitem--title">
							${resultData.title.outerHTML}
							<h3>${resultData.duration} | Staying at ${resultData.hotel}</h3>
						</div>

						<div class="nh17-result--content">
							<div class="nh17-ib nh17-image">
								${resultData.img}
							</div>

							<div class="nh17-ib nh17-data">

								<div class="nh17-row">
									<div class="nh17-ib">
									<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjlweCIgaGVpZ2h0PSIzNXB4IiB2aWV3Qm94PSIwIDAgMjkgMzUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQwNy4wMDAwMDAsIC04MDguMDAwMDAwKSIgZmlsbD0iI0Y2NzQzQSI+CiAgICAgICAgICAgIDxnIGlkPSJjb2FjaC1ib3giIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM5NC4wMDAwMDAsIDc4MC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik00Miw0NS4yMjI4NTA3IEw0MiwzNi4yMDEzNTc1IEw0MiwzNS4wNTMxNjc0IEw0MiwzMS43NzI2MjQ0IEM0MiwyOS42NDAyNzE1IDQwLjMyMzY5OTQsMjggMzguMTQ0NTA4NywyOCBMMTYuODU1NDkxMywyOCBDMTQuODQzOTMwNiwyOCAxMywyOS42NDAyNzE1IDEzLDMxLjc3MjYyNDQgTDEzLDM1LjA1MzE2NzQgTDEzLDM2LjIwMTM1NzUgTDEzLDQ1LjIyMjg1MDcgTDEzLDQ2LjM3MTA0MDcgTDEzLDQ4LjY2NzQyMDggTDEzLDUyLjYwNDA3MjQgTDEzLDU4LjM0NTAyMjYgTDE1LjAxMTU2MDcsNTguMzQ1MDIyNiBMMTUuMDExNTYwNyw2MC42NDE0MDI3IEMxNS4wMTE1NjA3LDYyLjYwOTcyODUgMTkuMDM0NjgyMSw2Mi42MDk3Mjg1IDE5LjAzNDY4MjEsNjAuNjQxNDAyNyBMMTkuMDM0NjgyMSw1OC4zNDUwMjI2IEwzNS45NjUzMTc5LDU4LjM0NTAyMjYgTDM1Ljk2NTMxNzksNjAuNjQxNDAyNyBDMzUuOTY1MzE3OSw2Mi42MDk3Mjg1IDQwLjE1NjA2OTQsNjIuNjA5NzI4NSA0MC4xNTYwNjk0LDYwLjY0MTQwMjcgTDQwLjE1NjA2OTQsNTguMzQ1MDIyNiBMNDIsNTguMzQ1MDIyNiBMNDIsNTIuNjA0MDcyNCBMNDIsNDguNjY3NDIwOCBMNDIsNDYuMzcxMDQwNyBMNDIsNDUuMjIyODUwNyBaIE0zMC4yNjU4OTYsNDcuMzU1MjAzNiBMMjguMDg2NzA1Miw0Ny4zNTUyMDM2IEwyNi45MTMyOTQ4LDQ3LjM1NTIwMzYgTDE2Ljg1NTQ5MTMsNDcuMzU1MjAzNiBDMTUuODQ5NzExLDQ3LjM1NTIwMzYgMTQuODQzOTMwNiw0Ni41MzUwNjc5IDE0Ljg0MzkzMDYsNDUuMzg2ODc3OCBMMTQuODQzOTMwNiwzNi41Mjk0MTE4IEMxNC44NDM5MzA2LDM1LjU0NTI0ODkgMTUuODQ5NzExLDM0LjU2MTA4NiAxNi44NTU0OTEzLDM0LjU2MTA4NiBMMjYuOTEzMjk0OCwzNC41NjEwODYgTDI4LjA4NjcwNTIsMzQuNTYxMDg2IEwzOC4xNDQ1MDg3LDM0LjU2MTA4NiBDMzkuMzE3OTE5MSwzNC41NjEwODYgNDAuMTU2MDY5NCwzNS41NDUyNDg5IDQwLjE1NjA2OTQsMzYuNTI5NDExOCBMNDAuMTU2MDY5NCw0NS4zODY4Nzc4IEM0MC4xNTYwNjk0LDQ2LjUzNTA2NzkgMzkuMzE3OTE5MSw0Ny4zNTUyMDM2IDM4LjE0NDUwODcsNDcuMzU1MjAzNiBMMzYuOTcxMDk4Myw0Ny4zNTUyMDM2IEwzMC4yNjU4OTYsNDcuMzU1MjAzNiBaIE0zNy44MDkyNDg2LDU1LjM5MjUzMzkgQzM2LjYzNTgzODIsNTUuMzkyNTMzOSAzNS43OTc2ODc5LDU0LjU3MjM5ODIgMzUuNzk3Njg3OSw1My40MjQyMDgxIEMzNS43OTc2ODc5LDUyLjI3NjAxODEgMzYuNjM1ODM4Miw1MS40NTU4ODI0IDM3LjgwOTI0ODYsNTEuNDU1ODgyNCBDMzguOTgyNjU5LDUxLjQ1NTg4MjQgMzkuODIwODA5Miw1Mi4yNzYwMTgxIDM5LjgyMDgwOTIsNTMuNDI0MjA4MSBDMzkuODIwODA5Miw1NC41NzIzOTgyIDM4Ljk4MjY1OSw1NS4zOTI1MzM5IDM3LjgwOTI0ODYsNTUuMzkyNTMzOSBMMzcuODA5MjQ4Niw1NS4zOTI1MzM5IFogTTMyLjk0Nzk3NjksNTMuOTE2Mjg5NiBMMjcuNTgzODE1LDUzLjkxNjI4OTYgTDIyLjIxOTY1MzIsNTMuOTE2Mjg5NiBDMjEuNTQ5MTMyOSw1My45MTYyODk2IDIxLjU0OTEzMjksNTIuNzY4MDk5NSAyMi4yMTk2NTMyLDUyLjc2ODA5OTUgTDI3LjU4MzgxNSw1Mi43NjgwOTk1IEwzMi45NDc5NzY5LDUyLjc2ODA5OTUgQzMzLjYxODQ5NzEsNTIuNzY4MDk5NSAzMy42MTg0OTcxLDUzLjkxNjI4OTYgMzIuOTQ3OTc2OSw1My45MTYyODk2IEwzMi45NDc5NzY5LDUzLjkxNjI4OTYgWiBNMzEuMTA0MDQ2Miw1NS43MjA1ODgyIEwyNC4wNjM1ODM4LDU1LjcyMDU4ODIgQzIzLjIyNTQzMzUsNTUuNzIwNTg4MiAyMi41NTQ5MTMzLDU1LjM5MjUzMzkgMjIuMDUyMDIzMSw1NC43MzY0MjUzIEwzMy4xMTU2MDY5LDU0LjczNjQyNTMgQzMyLjYxMjcxNjgsNTUuMzkyNTMzOSAzMS45NDIxOTY1LDU1LjcyMDU4ODIgMzEuMTA0MDQ2Miw1NS43MjA1ODgyIEwzMS4xMDQwNDYyLDU1LjcyMDU4ODIgWiBNMTcuMzU4MzgxNSw1NS4zOTI1MzM5IEMxNi4xODQ5NzExLDU1LjM5MjUzMzkgMTUuMzQ2ODIwOCw1NC41NzIzOTgyIDE1LjM0NjgyMDgsNTMuNDI0MjA4MSBDMTUuMzQ2ODIwOCw1Mi4yNzYwMTgxIDE2LjE4NDk3MTEsNTEuNDU1ODgyNCAxNy4zNTgzODE1LDUxLjQ1NTg4MjQgQzE4LjM2NDE2MTgsNTEuNDU1ODgyNCAxOS4zNjk5NDIyLDUyLjI3NjAxODEgMTkuMzY5OTQyMiw1My40MjQyMDgxIEMxOS4zNjk5NDIyLDU0LjU3MjM5ODIgMTguMzY0MTYxOCw1NS4zOTI1MzM5IDE3LjM1ODM4MTUsNTUuMzkyNTMzOSBMMTcuMzU4MzgxNSw1NS4zOTI1MzM5IFogTTMxLjEwNDA0NjIsNTAuOTYzODAwOSBDMzEuOTQyMTk2NSw1MC45NjM4MDA5IDMyLjYxMjcxNjgsNTEuNDU1ODgyNCAzMy4xMTU2MDY5LDUyLjExMTk5MSBMMjIuMDUyMDIzMSw1Mi4xMTE5OTEgQzIyLjU1NDkxMzMsNTEuNDU1ODgyNCAyMy4yMjU0MzM1LDUwLjk2MzgwMDkgMjQuMDYzNTgzOCw1MC45NjM4MDA5IEwyNy41ODM4MTUsNTAuOTYzODAwOSBMMzEuMTA0MDQ2Miw1MC45NjM4MDA5IFogTTE5LjcwNTIwMjMsMjkuMzEyMjE3MiBMMjcuNTgzODE1LDI5LjMxMjIxNzIgTDM1LjQ2MjQyNzcsMjkuMzEyMjE3MiBDMzcuNDczOTg4NCwyOS4zMTIyMTcyIDM3LjQ3Mzk4ODQsMzIuMTAwNjc4NyAzNS40NjI0Mjc3LDMyLjEwMDY3ODcgTDI3LjU4MzgxNSwzMi4xMDA2Nzg3IEwxOS43MDUyMDIzLDMyLjEwMDY3ODcgQzE3LjY5MzY0MTYsMzIuMTAwNjc4NyAxNy42OTM2NDE2LDI5LjMxMjIxNzIgMTkuNzA1MjAyMywyOS4zMTIyMTcyIEwxOS43MDUyMDIzLDI5LjMxMjIxNzIgWiIgaWQ9IkZpbGwtMSI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=">
										<p>Coach</p>
									</div>

									<div class="nh17-ib nh17-border">
										<div class="nh17-border--content nh17-departs">
											<p>Departs on...</p>
											<div>
												<p><span>${resultData.departDate[0]}</span></p>
												<div>
													<p class="nh17-month">${resultData.departDate[1]}</p>
													<p class="nh17-year">${resultData.departDate[2]}</p>
												</div>
											</div>
										</div>
										<div class="nh17-border--content nh17-at">
											<p>at...</p>
											<p>${resultData.time}</p>
										</div>
										<div class="nh17-border--content nh17-from">
											<p>from...</p>
											<p>${resultData.from}</p>
										</div>
										<div class="nh17-border--content nh17-avail">
											<a href="#" class="quick-view nh17-bluearrow" data-tourid="${resultData.tourId}">Seat availability</a>
										</div>
									</div>
								</div>

								<a href="" class="nh17-more-dates nh17-bluearrow" data-tourid="${resultData.tourId}">More dates</a>
								

								<div class="nh17-row">
									<div class="nh17-ib">
									<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzVweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMzUgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5ob3RlbDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPgogICAgICAgIDxwb2x5Z29uIGlkPSJwYXRoLTEiIHBvaW50cz0iMzAuNDYxMTYyNCAwIC01LjMyOTA3MDUyZS0xNSA4LjE0MjAyODE3ZS0xNSAtMy4zMjQ5NzU2MmUtMTUgMTEuMDc2ODQ2NyAzMC40NjExNjI0IDExLjA3Njg0NjcgMzAuNDYxMTYyNCAxLjA4NTYwMzc2ZS0xNCI+PC9wb2x5Z29uPgogICAgICAgIDxwb2x5Z29uIGlkPSJwYXRoLTMiIHBvaW50cz0iMzQuMTUzODQ2MiA0LjYxNTIxNjc4IDAgNC42MTUyMTY3OCAwIDIuMzA3NjA4MzkgMCAwIDM0LjE1Mzg0NjIgMCI+PC9wb2x5Z29uPgogICAgPC9kZWZzPgogICAgPGcgaWQ9IldlbGNvbWUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJRdWljay1WaWV3LS0tQm9vay1Ob3ciIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00MDUuMDAwMDAwLCAtOTEzLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iaG90ZWwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQwNS4wMDAwMDAsIDkxMy4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjkyMzA3NywgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8bWFzayBpZD0ibWFzay0yIiBmaWxsPSJ3aGl0ZSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgICAgICAgICAgICAgPC9tYXNrPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJDbGlwLTIiPjwvZz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMy4zODQ2MTUzOCwxMC44ODcwODc1IEMzLjM4NDYxNTM4LDkuMDk2NDQ1NjIgNC44MTg1NjQxLDcuNjM5MjU3MjkgNi41ODE5NDg3Miw3LjYzOTI1NzI5IEwxMC4zNDA3NTIxLDcuNjM5MjU3MjkgQzEyLjEwMzc2MDcsNy42MzkyNTcyOSAxMy41MzgwODU1LDkuMDk2MDYzNjYgMTMuNTM4MDg1NSwxMC44ODcwODc1IEwxMy41MzgwODU1LDExLjA3NjkyMzEgTDE2LjkyMjcwMDksMTEuMDc2OTIzMSBMMTYuOTIyNzAwOSwxMC44ODcwODc1IEMxNi45MjI3MDA5LDkuMDk2NDQ1NjIgMTguMzU3MDI1Niw3LjYzOTI1NzI5IDIwLjEyMDAzNDIsNy42MzkyNTcyOSBMMjMuODc5MjEzNyw3LjYzOTI1NzI5IEMyNS42NDIyMjIyLDcuNjM5MjU3MjkgMjcuMDc2NTQ3LDkuMDk2MDYzNjYgMjcuMDc2NTQ3LDEwLjg4NzA4NzUgTDI3LjA3NjU0NywxMS4wNzY5MjMxIEwzMC40NjExNjI0LDExLjA3NjkyMzEgTDMwLjQ2MTE2MjQsNS4xNTc2NDQ1NiBDMzAuNDYxMTYyNCwyLjMxMzkzMTAzIDI4LjE4MzMxNjIsMCAyNS4zODM0ODcyLDAgTDUuMDc3Njc1MjEsMCBDMi4yNzc4NDYxNSwwIDAsMi4zMTM5MzEwMyAwLDUuMTU3NjQ0NTYgTDAsMTEuMDc2OTIzMSBMMy4zODQ2MTUzOCwxMS4wNzY5MjMxIEwzLjM4NDYxNTM4LDEwLjg4NzA4NzUgWiIgaWQ9IkZpbGwtMSIgZmlsbD0iI0Y2NzQzQSIgbWFzaz0idXJsKCNtYXNrLTIpIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMzIuNzY2OTY5NywxMyBMMS4zODY0OTI2NSwxMyBDMC42MjIwNjA1MDEsMTMgMCwxMy41OTcxMjIyIDAsMTQuMzMxNDU3IEwwLDE5LjQ2MTUzODUgTDM0LjE1Mzg0NjIsMTkuNDYxNTM4NSBMMzQuMTUzODQ2MiwxNC4zMzE0NTcgQzM0LjE1MzQ2MjQsMTMuNTk3MTIyMiAzMy41MzE0MDE5LDEzIDMyLjc2Njk2OTcsMTMiIGlkPSJGaWxsLTQiIGZpbGw9IiNGNjc0M0EiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC04IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgMTkuMzg0NjE1KSI+CiAgICAgICAgICAgICAgICAgICAgPG1hc2sgaWQ9Im1hc2stNCIgZmlsbD0id2hpdGUiPgogICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNwYXRoLTMiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgIDwvbWFzaz4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iQ2xpcC03Ij48L2c+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsNS42MTUzODQ2MiBMNC42MTIzMDQyNCw1LjYxNTM4NDYyIEM0LjcxMDkyODI2LDQuMjA4NTMxNDcgNS43ODg4ODUwNSwzLjA5NzkwMjEgNy4xMDAxNjI0OSwzLjA5NzkwMjEgTDI3LjA1MzY4MzcsMy4wOTc5MDIxIEMyOC4zNjQ1Nzc0LDMuMDk3OTAyMSAyOS40NDMzMDE2LDQuMjA4NTMxNDcgMjkuNTQxMTU4Miw1LjYxNTM4NDYyIEwzNC4xNTM4NDYyLDUuNjE1Mzg0NjIgTDM0LjE1Mzg0NjIsMSBMMCwxIEwwLDUuNjE1Mzg0NjIgWiIgaWQ9IkZpbGwtNiIgZmlsbD0iI0Y2NzQzQSIgbWFzaz0idXJsKCNtYXNrLTQpIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
										<p>Hotel</p>
									</div>

									<div class="nh17-ib nh17-border">
										<div class="nh17-border--content nh17-staying">
											<p>Staying at...</p>
											<p>${resultData.hotel}</p>
										</div>
										<div class="nh17-border--content nh17-rooms">
											<p>Types of rooms offered</p>
											<div class="nh17-ib">
												<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
												<p>Single</p>
											</div>
											<div class="nh17-ib">
												<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
												<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
												<p>Double</p>
											</div>
											<div class="nh17-ib">
												<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
												<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
												<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
												<p>Triple</p>
											</div>
											<div class="nh17-ib">
												<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
												<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
												<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
												<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTMgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3LjEgKDQ1NDIyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2VsY29tZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlF1aWNrLVZpZXctLS1Cb29rLU5vdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwMy4wMDAwMDAsIC05MzQuMDAwMDAwKSIgZmlsbD0iI0VCNUYyMSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04MDcuOTYxNTM4LDk0MS4zMjY5MjMgTDgwOC4wNzY5MjMsOTQxLjMyNjkyMyBDODA2LjU3NjkyMyw5NDAuODY1Mzg1IDgwNS40ODA3NjksOTM5LjQyMzA3NyA4MDUuNDgwNzY5LDkzNy43NSBDODA1LjQ4MDc2OSw5MzUuNjczMDc3IDgwNy4xNTM4NDYsOTM0IDgwOS4yMzA3NjksOTM0IEM4MTEuMzA3NjkyLDkzNCA4MTIuOTgwNzY5LDkzNS42NzMwNzcgODEyLjk4MDc2OSw5MzcuNzUgQzgxMi45ODA3NjksOTM5LjQyMzA3NyA4MTEuODg0NjE1LDk0MC44NjUzODUgODEwLjM4NDYxNSw5NDEuMzI2OTIzIEw4MTAuNSw5NDEuMzI2OTIzIEM4MTMuMjY5MjMxLDk0MS4zMjY5MjMgODE1LjUxOTIzMSw5NDMuNTc2OTIzIDgxNS41MTkyMzEsOTQ2LjM0NjE1NCBMODE1LjUxOTIzMSw5NDkgTDgwMyw5NDkgTDgwMyw5NDYuMzQ2MTU0IEM4MDMsOTQzLjU3NjkyMyA4MDUuMjUsOTQxLjMyNjkyMyA4MDcuOTYxNTM4LDk0MS4zMjY5MjMiIGlkPSJGaWxsLTEiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==">
												<p>Quad</p>
											</div>
											<a href="#" class="quick-view nh17-show-rooms" data-tourid="${resultData.tourId}">Show room availability</a>
										</div>
										<div class="nh17-border--content nh17-more">
											<div>
												<a href="#" class="quick-view nh17-bluearrow" data-tourid="${resultData.tourId}">More</a>
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>

					</div>

					<div class="nh17-result--right">
						<div class="nh17-result--wrap">
							<div class="nh17-right--row">
								${resultData.price.outerHTML}
								<p>Price per person</p>
								
							</div>
						</div>
					</div>
				</div> 
			`;

			// Append new template
			const ref = currentItems[i].insertAdjacentHTML('afterbegin', newTemplate);
			
			// Add classes if no data available (to reduce size)
			const atData = currentItems[i].querySelector('.nh17-at p:last-of-type');
			if (atData) {
				const atDataText = atData.textContent.trim();
				const noAtData = atDataText.match('Times not yet available');

				if (noAtData) {
					atData.classList.add('nh17-no-data');
				}
			}
			const fromData = currentItems[i].querySelector('.nh17-from p:last-of-type');
			if (fromData) {
				const fromDataText = fromData.textContent.trim();
				const noFromData = fromDataText.match('Multiple locations available');
				if (noFromData) {
					fromData.classList.add('nh17-no-data');
				}
			}

			// Append buttons to the right container
			const rightRef = currentItems[i].querySelector('.nh17-result--right .nh17-right--row');
			const buttons = currentItems[i].querySelector('.buttons');
			if (buttons && rightRef) {
				rightRef.appendChild(buttons);
			}
			

			// On click of more dates
			const moreDatesBtn = currentItems[i].querySelector('.nh17-more-dates');
			let oldDateBtn = currentItems[i].querySelector('button.tour-list-btn');

			moreDatesBtn.addEventListener('click', function(e) {
				e.preventDefault();
				if (moreDatesBtn.classList.contains('nh17-dates-added')) {
					return
				}

				oldDateBtn.click();

				// Other dates
				let otherDates = currentItems[i].querySelector('.result-content .details .tour-list');
				if (otherDates) {
						
				
						// Poll elements required for *all* tests
						let pollerOptions = UC.poller([
							function() {
								let hasOptions = otherDates.querySelectorAll('option');
								if (hasOptions.length > 1) {
									return true
								} else {
									moreDatesBtn.classList.add('nh17-fadeout');
								}
							}
						], () => {
							let hasOptions = otherDates.querySelectorAll('option');
							otherDates = otherDates.cloneNode(true);
							moreDatesBtn.insertAdjacentElement('afterend', otherDates);
							moreDatesBtn.classList.add('nh17-dates-added');


							// On select of a different date
							const dateOptions = currentItems[i].querySelector('.nh17-data select.tour-list');
							if (dateOptions) {
								dateOptions.onchange = function() {
									let index = this.selectedIndex;
									let text = this.children[index].innerText.trim();
									text = text.replace(',', '');
									// Store selected data
									let textArr = text.split(' ');
									let day = textArr[0];
									let month = textArr[1];
									let year = textArr[2];

									let departsDiv = currentItems[i].querySelector('.nh17-departs');
									if (departsDiv) {
										let currentDay = departsDiv.querySelector('div > p > span');
										let currentMonth = departsDiv.querySelector('p.nh17-month');
										let currentYear = departsDiv.querySelector('p.nh17-year');

										currentDay.textContent = day;
										currentMonth.textContent = month;
										currentYear.textContent = year;
									}
								}
							}
						});
				}
				
			});


			

			/*
			*	Tracking elements include;
			*	More info btn, Book now btn,
			*	More dates CTA & Seat availability CTA
			*/
			const tracking = (() => {
				const infoBtn = currentItems[i].querySelector('.buttons a.btn-more-info');
				const bookBtn = currentItems[i].querySelector('.buttons a.btn-book-now');
				const datesCta = currentItems[i].querySelector('.nh17-data a.nh17-more-dates');
				const availCta = currentItems[i].querySelector('.nh17-avail a.quick-view');
				const moreLink = currentItems[i].querySelector('.nh17-more a.nh17-bluearrow');


				infoBtn.addEventListener('click', function() {
					utils.events.send('NH017', 'Click', 'User clicked on the more info button', {sendOnce: true});
				});
				bookBtn.addEventListener('click', function() {
					utils.events.send('NH017', 'Click', 'User clicked on the book now button', {sendOnce: true});
				});
				datesCta.addEventListener('click', function() {
					utils.events.send('NH017', 'Click', 'User clicked on the more dates link', {sendOnce: true});
				});
				availCta.addEventListener('click', function() {
					utils.events.send('NH017', 'Click', 'User clicked on the available dates link', {sendOnce: true});
				});
				moreLink.addEventListener('click', function() {
					utils.events.send('NH017', 'Click', 'User clicked on the more link', {sendOnce: true});
				});
			})(); 


		}


		/*
		*	Filter change
		*/ 
		const filterChange = (() => {
			// Store sidebar filter
			var filter = document.querySelector('.search-content aside.left');
			if (filter) {
				var filterDup = filter.cloneNode(true);
				filterDup.setAttribute('class', 'nh17-new-filter');
				// Store active filter data
				var activeFilter = filterDup.querySelectorAll('li');
			}

			// Create new container for below 'Holiday search' box
			var newDiv = document.createElement('div');
			newDiv.setAttribute('class', 'container nh17-new-results');

			// Create filter button 
			var newBtn = document.createElement('a');
			newBtn.setAttribute('class', 'nh17-new-filter-btn l-blue-btn');
			newBtn.textContent = "Filter";
			
			// Create filter tooltip
			var tooltip = document.createElement('div');
			tooltip.setAttribute('class', 'nh17-filter-tooltip');
			var tooltipText = document.createElement('p');
			tooltipText.textContent = "Click to filter down your trip even further";
			
			// Append p tag to tooltip
			tooltip.appendChild(tooltipText);
			newDiv.appendChild(newBtn);
			newDiv.appendChild(tooltip);

			// Append new div below search again container 
			var refNode = document.querySelector('.search-again');
			refNode.parentNode.insertBefore(newDiv, refNode.nextSibling);
	
 
			// Move filters
			if (filter) {
				newDiv.appendChild(filterDup); 
			}

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
					let h4WithClass = h4Wrap.classList.add('nh17-filter-item-' + i);
					let filterWithClass = activeFilter[i].classList.add('nh17-filter-item-' + i);
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

 
		})();


		


	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('NH017', 'Variation 1');

		activate();
	});

})();
