/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
 
// IT030 - Experiment Title
const IT030 = (() => {

	let $ = null;
	
	// Experiment code
	const activate = () => {
		document.body.classList.add('IT030');
		
		// Overlay to sit on top of images 
		const sizeOverlay = () => {
			let productItem = document.querySelectorAll('.category-products ul.product-listing li');
			let productRef = document.querySelectorAll('.category-products ul.product-listing li h2.product-name');
			for (let i = 0; productRef.length > i; i++) {
				let sizeDiv = document.createElement('div');
				sizeDiv.classList.add('IT30-size-overlay');
				sizeDiv.innerHTML = '<p>What size is this model wearing? <span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAangAAGp4B8NQjJQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANRSURBVGiB7dpPqFVVFMfxz3tKVGS97EEGGYSZORGKJxHUw/4QgeNoVDTMAiuhoSAIgaD9/wMNhBo0qCZNghpIf0ZiDeRFFBJBEpFWgqG+euptsN957Hc853ruOeteL+IPFhzOvay1v/vss/beax+uaLw0EezvGmzGpkWbKv1+AnM4jG9xJjh+J92CF/A15tFraPP4Cs9jzchbnelOfICzmje+zs7ifdwxSoDr8RoWAgDKtoB9WDVsiEfw2xAAynYUDw4LYhfOjQCisHPYGQkwgTdGCFC2VwVl13cvIURh73SFeGkMIAp7sS3EFjGp9TiexlrciifxRws/C3hgUIgbxGSnf3FPhf9N0qw+qL+jUvpvrDcDIHr4tE+MT1r6fKUpxAYxQ6onJYo6vd7S5wLWNQHZHwTRw/dYWRFjhbRwbOv3vYtBTEvjOgqkJ/V8DrMCezv6nMfqfiDbgyEKm8Nb0rvX5Unk9mw/kG+GBDIM+zJveD71r8Lfqsf0OOo/aXidYnmjN4uDOIID+FWak+7CY7gqyL9FXzPS5myZntPtUR+TcvzdNYE34OeOMcq2rSpQ27xe2DM1ALnuDQZZmhwnsyA3NWhIPz0hvWM9/ODCwgMcxO8d4+SaLi5ykOs6Ot2CGxevN0q9X6V/OsbJtbQlzkGiS0OnKu5N4ObAGEttzkEie+q8NLzKuk3KYlE6WVzkIH8FBpiT3peyZgNjwJ/FRQ7yU2CAz2rubw2MQdbmHOTHwACfV9ybxMOBMahp87UGK3nW2QnVK4T7AnzndgZXF87zJ3Iahxr2RD8dkDZmZT0a4DvXQanjsRwEPg4I8EXN/YcCfOf6qN+PERurmQq/k9ITjxpWF91Y0X2rO32hS9OBED0Ntrp0Lz5UlWtWSqvj4j/nta8jNy4+0K0cVJdi1+IpaXG5UftjicblILoV6A7rf74xJVX22/geuEBHt5LpL9KR2qw0DNbjcXyoXYWxGFIDl0wLXRZF7EIvjwHE7q4QpDX/vksIsUfwXmmH4RyA9nsntkcC5Jo1usPQ+4cFUeiyOJ7OtU46NmibTnM7jbdx+ygBypqSCsptP+HYprp0NJCG8VHNjFQiXS+tUIuZ+KRUFzgi7ey+M2Yf1VxRpP4H+dEoOtaum3IAAAAASUVORK5CYII="></span></p>'; 
				productRef[i].insertAdjacentElement('beforebegin', sizeDiv);
			}
		};


		// loading gif
		const loading = () => {
			const loadingHTML = `
				<div class="it30-loading--wrap">
					<div class="it30-loading--inner">
						<img src="data:image/gif;base64,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">
					</div>
				</div>
			`;
			
			const loadingWrap = document.createElement('div');
			loadingWrap.classList.add('it30-loading');
			loadingWrap.innerHTML = loadingHTML;
			return loadingWrap;
		};
		const loadingGIF = loading();
		const mainRef = document.querySelector('.main-container .main');
		mainRef.appendChild(loadingGIF);


		/*
		*	On click of items overlay div
		*	open a lightbox with the images 
		*	and size info.
		*/ 	
		const itemAjax = () => {
			let overlayBox = document.querySelectorAll('.IT30-size-overlay');
			if (overlayBox) {

				for (let j = 0; overlayBox.length > j; j++) {

					overlayBox[j].addEventListener('click', function() {

					// Show loading gif
					loadingGIF.classList.add('it30-show-loading');

					let productURL = overlayBox[j].previousElementSibling.getAttribute('href');
	
						var request = new XMLHttpRequest();
						request.open('GET', productURL, true);
	
						request.onload = function() {
							if (request.status >= 200 && request.status < 400) {
	
								let resp = request.responseText; 
								let html = document.createElement('div');
								html.innerHTML = resp;
	
								let pTitle, pImages, pBasket, pSize, pAvailSizes;
								if (html) {
									// H1 Element
									pTitle = html.querySelector('.product-view .product-name h1');
									// Slick Element
									pImages = html.querySelector('.product-view .product-img-box .product-thumbnails');
									// Size (list item)
									let pSizeList = html.querySelectorAll('.product-view-details #pd-0 li');

									
									// Model sizes
									let height = null;
									let size = null;
									 
	
									// Filter list items for the size
									for (let z = 0; pSizeList.length > z; z++) {
										let sizeString = pSizeList[z].innerHTML;
										let ss = sizeString.toLowerCase().trim();
										
										let matches = ss.match(/model\s\w+\s(\d'\d{1,2})\sand\swears\s\w+\s+Size\s(\d{1,2})/i);

										if (matches && matches[1] && matches[2]) {
											height = matches[1];
											size = matches[2];
											break;
										}
										
									}
									let pSizeString = null;
									if (size, height) {
										pSizeString = "Model is " + height + " and wears UK size " + size;
										pSize = document.createElement('p');
										pSize.innerHTML = pSizeString;

										// Tracking event showing sizes
										utils.events.send('IT030', 'Model Sizes', 'Model sizes are shown on this popup', {sendOnce: true});

									} else {
										pSizeString = "All sizes shown are either 6 or 8 and our models range from 5'6 to 5'9";
										pSize = document.createElement('p');
										pSize.innerHTML = pSizeString;

										// Tracking event showing default sizes
										utils.events.send('IT030', 'Default Sizes', 'Default model sizes are shown on this popup', {sendOnce: true});
									}
									
								} // End if HTML

								// Popup Window
								const popup = (() => {
									
									let p = document.querySelector('.IT30-popup');
									if (p) {
										p.parentNode.removeChild(p);
									}

									let mainCont = document.querySelector('.main-container');
									// Check if we have all neccesary info
									const cont = document.createElement('div');
									cont.classList.add('IT30-popup');
									if (pTitle && pImages && pSize) {
	
										// Close button
										let closeBtn = document.createElement('div');
										closeBtn.classList.add('IT30-close-btn');
										closeBtn.innerHTML = "<p>+</p>";
										
										let contWrap = document.createElement('div');
										contWrap.classList.add('IT30-container-wrap');
										contWrap.appendChild(pImages);
										cont.append(pTitle, contWrap, pSize, closeBtn);
										pImages.classList.add('slick-sliderIT30');	
										
										mainCont.appendChild(cont);		
										
										cont.classList.add('open');
										if (pImages) {									
											$('.slick-sliderIT30').slick();
										}
									}

								})(); // End of Popup()
	
								
								// Close button 
								let closeBtn = document.querySelector('.IT30-close-btn');
								if (closeBtn) {
									closeBtn.addEventListener('click', function() {
										let thisParent = this.parentNode;
										thisParent.parentNode.removeChild(thisParent);
									});
								}

								// Escape key close
								document.addEventListener('keydown', function(event) {
									const {key} = event;
									if (key === 'Escape') {
										const popup = document.querySelector('.IT30-popup');
										if (popup) {
											popup.classList.remove('open');
										}
									}
								});

								loadingGIF.classList.remove('it30-show-loading');
								
							} else {
	
							}
						};
	
						request.onerror = function() {
	
						};
	
						request.send();
	
					}); // End AJAX
	
				} // End For
			}

		};

		sizeOverlay();
		itemAjax();


		/*
		* Add tracking events to the following;
		* - Close popup button
		* - Size information container on products
		*/

		let closeButton = document.querySelectorAll('.IT30-popup .IT30-close-btn');
		for (let s = 0; closeButton.length > s; s++) {
			closeButton[s].addEventListener('click', function() {
				utils.events.send('IT030', 'Click', 'Clicked close popup button', {sendOnce: true});
			});
		}

		let infoContainer = document.querySelectorAll('.IT30-size-overlay');
		for (let u = 0; infoContainer.length > u; u++) {
			infoContainer[u].addEventListener('click', function() {
				utils.events.send('IT030', 'Click', 'Clicked on the size information container', {sendOnce: true});
			});
		}		
		 
	}; // End of Activate

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('IT030', 'Variation 1');
		
		activate();
	});

	// -----------------------------------------------------------
	// Poll elements required for *all* tests
	// -----------------------------------------------------------
	const poller = UC.poller([
		() => !!window.jQuery,
		'.category-products',
		'ul.product-listing'
	], () => {
		
		$ = window.jQuery;

		triggers();
	});


})();
