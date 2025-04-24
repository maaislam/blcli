/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';


// CB092 - Experiment Title
const CB092 = (() => {

	let $ = null;

	// Experiment code
	const activate = () => {

		document.body.classList.add('CB092');

		// document reference to append to
		let ref = document.querySelector('.top-product-view .short-description');
		
		// Move reviews to bottom of the list
		const reviewTitle = document.querySelector('h2#acctab-Yotporeview');
		const reviewTab = document.querySelector('#product_tabs_Yotporeview_contents');
		const tabRef = document.querySelector('.product-view .tabs-panels');

		reviewTitle.classList.add('current');
		reviewTab.classList.add('cb92-showtab');
		tabRef.appendChild(reviewTitle);
		tabRef.appendChild(reviewTab);

		
		// If no reviews exist
		let noReviews = document.querySelectorAll('.yotpo-display-wrapper .yotpo-nav-content .yotpo-review');
		if (noReviews.length == 0) {
			utils.events.send('CB092','no-reviews-for-product',window.location.pathname,{sendOnce: true});
			let el = document.createElement('div');
			el.classList.add('CB92-reviews');
			let tpImg = document.createElement('img');
			tpImg.setAttribute('src', 'data:image/png;base64,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');
			el.appendChild(tpImg);
			ref.insertAdjacentElement('afterend', el);
			return false
		}



		// GA event - has reviews
		utils.events.send('CB092','reviews-found-for-product',window.location.pathname,{sendOnce: true});

		// Get reviews, remove and trim
		const parseReviews = () => {
			let reviewContainer = document.querySelectorAll('.yotpo-review .yotpo-main .yotpo-review-wrapper .content-review');
			reviewContainer = [...reviewContainer];

			let reviewWrap = document.createElement('ul');
			reviewWrap.classList.add('cb92-bxslider');


			reviewContainer.forEach((element, index) => {
				let el = element.cloneNode(true);
				let reviewText = el.innerText; 
				
				if (index > 4) {
					return false
				}

				// No reviews less than 100 chars
				if (reviewText.length < 140) {
					return
				}

				// Remove 'Read Less' & 'Read More'
				let trimmedReviewText = reviewText.replace(/Read\sLess/g, '');
				let trimmedReview = trimmedReviewText.replace(/...Read\sMore/g, '');

				// If less than 140 trim to 140
				let fullReview = trimmedReview.trim();	
				let shortReview = null;
				if (fullReview.length > 140) {
					shortReview = trimmedReview.substr(0, 140);
					shortReview = shortReview.substr(0, Math.min(shortReview.length, shortReview.lastIndexOf(" ")));
					shortReview = shortReview + '...<span class="CB92">Read More</span>';
					shortReview = '<p class="CB92-short-review">' + shortReview + '</p>';
				}				
			

				// Create LI 
				let reviewLi = document.createElement('li');
				
				fullReview = '<p class="CB92-full-review">' + fullReview + '</p>';


				// Append elements
				if (fullReview.length > 140 && shortReview) {
					reviewLi.innerHTML = shortReview + fullReview;
				} else {
					reviewLi.innerHTML = fullReview;
					reviewLi.classList.add('cb92-show-full');
				}
				reviewWrap.appendChild(reviewLi);
				
			}); // End foreach

			// Add see all reviews
			const reviewLink = '<li class="cb92-see-all"><p><a href="#" id="CB92-toReviews">See all reviews</a></p></li>';
			reviewWrap.insertAdjacentHTML('beforeend', reviewLink);
			

			return reviewWrap;
		};
		let theseReviews = parseReviews();
		

		// Get the star ratings
		const getStars = () => {
			let reviewRating = document.querySelector('#review_bottomline');
			if (!reviewRating) {
				reviewRating = document.querySelector('.yotpo-bottomline-box-1');
			}
			return reviewRating;
		};
		let theseStars = getStars();
		 

		// Build new div
		const buildIt = () => {
			let el = document.createElement('div');
			el.classList.add('CB92-reviews');
			el.innerHTML = theseStars.outerHTML + theseReviews.outerHTML;
			return el;
		};
		let thisEl = buildIt(); 

		// Append the new div
		const appendIt = (() => {
			ref.insertAdjacentElement('afterend', thisEl);
			
		})();


		// Add a link to all reviews at the end of UL
		// const addReviewLink = (() => {
		// 	const reviewLink = '<li class="cb92-see-all"><p><a href="#" id="CB92-toReviews">See all reviews</a></p></li>';
		// 	setTimeout(function() {
		// 		const listRef = document.querySelector('ul.cb92-bxslider');
		// 		console.log(reviewLink);
		// 		if (listRef) {
		// 			listRef.insertAdjacentElement('beforeend', reviewLink.outerHTML);
		// 		}
		// 	}, 1000);
		// })();



		// Click events on read more
		let allLi = document.querySelectorAll('.cb92-bxslider > li');
		let readMoreBtn = document.querySelectorAll('span.CB92');
		for (let z = 0; readMoreBtn.length > z; z++) {
			readMoreBtn[z].addEventListener('click', function() {
				for (let zz = 0; allLi.length > zz; zz++) {
					allLi[zz].classList.remove('CB92-swap');
				}
				let thisLi = this.parentNode.parentNode;
				thisLi.classList.add('CB92-swap');
        const slider = document.querySelector('.cb93-bxslider');
				slider.startShow();

			});
			
		};


		

		// Iframe popup 
		const iframeDiv = document.createElement('div');
		iframeDiv.classList.add('CB92-iframe', 'clearfix');
		let reviewGraphs = document.querySelector('.yotpo-star-distribution-content');
		const reviewGraphsCp = reviewGraphs.cloneNode(true);
		if (reviewGraphs) {
			const iframeHTML = `
				<div class="CB92-iframe--wrap">
					${reviewGraphsCp.outerHTML}

					<div class="CB92-iframe--cta">
						<a href="#" id="CB92-scrollToReviews">See all reviews</a>

						<a href="#" id="CB92-close">Close</a>
					</div>
				</div>
			`;
			iframeDiv.innerHTML = iframeHTML;
			const reviewBox = document.querySelector('.CB92-reviews');
			reviewBox.appendChild(iframeDiv);		
		}

		
		// $(document).ready(function(){
			// Start bx Slider
			let slider = window['jQuery']('.cb92-bxslider').bxSlider({
				auto: true,
				pager: false,
				adaptiveHeight: true,
				tickerHover: true,
				pause: 5000,
				onSlideAfter: function() {
					for (let g = 0; allLi.length > g; g++) {
						allLi[g].classList.remove('CB92-swap');
					}
				}
			 });
			 
			let scrollUp = ` 
			 	<div class="CB92-scrollup">
				 <span class="CB92-scroll-up"></span>
				 <p>Scroll to top</p>
				</div>
			`;
			 
			 window['jQuery']('body').append(scrollUp);

			 // Scroll animation
			 window['jQuery']('.CB92-reviews div[class*="yotpo-bottomline"]').on('click', function() {
				// GA tracking on reviews link
				utils.events.send('CB092', 'Click', 'User clicked on the review link', {sendOnce: true}); 
				let iframe = document.querySelector('.CB92-iframe');
				if (iframe.classList.contains('CB92-show-iframe')) {
					iframe.classList.remove('CB92-show-iframe');
				} else {
					iframe.classList.add('CB92-show-iframe');
				}
			 }); 


			 // iframe see all reviews link
			 window['jQuery']('#CB92-scrollToReviews').on('click', function() {
				window['jQuery']('#product_tabs_Yotporeview_contents').css('display', 'block');
				window['jQuery']('#product_tabs_Yotporeview_contents').prev().addClass('current');
				window['jQuery']('html, body').animate({
					scrollTop: window['jQuery']("#product_tabs_Yotporeview_contents").offset().top
				}, 2000);
				window['jQuery']('.CB92-scrollup').addClass('cb92-show-scroller');
			 });

			 // see all reviews link
			 window['jQuery']('li.cb92-see-all').on('click', function() {
				window['jQuery']('#product_tabs_Yotporeview_contents').css('display', 'block');
				window['jQuery']('#product_tabs_Yotporeview_contents').prev().addClass('current');
				window['jQuery']('html, body').animate({
					scrollTop: window['jQuery']("#product_tabs_Yotporeview_contents").offset().top
				}, 2000);
				window['jQuery']('.CB92-scrollup').addClass('cb92-show-scroller');
			 });

			// Close iframe 
			window['jQuery']('#CB92-close').on('click', function() {
				window['jQuery']('.CB92-iframe').removeClass('CB92-show-iframe');
			});
			
			window['jQuery']('#product_tabs_Yotporeview').on('click', function() {
				window['jQuery']('.CB92-scrollup').addClass('cb92-show-scroller');
			});
			
			// Scroll up element
			window['jQuery']('.CB92-scrollup').on('click', function() {
				window['jQuery']('html, body').animate({
					scrollTop: window['jQuery'](".product-view").offset().top
				}, 2000);
				window['jQuery'](this).removeClass('cb92-show-scroller');
			});

			window['jQuery'](window).scroll(function() {
				if (window['jQuery'](window).scrollTop() > 2000) {
					window['jQuery']('.CB92-scrollup').addClass('cb92-show-scroller');
				}
			});
			

		//}); // End of doc ready



		
	};


	// Poll elements required for *all* tests
	const poller = UC.poller([
		() => !!window.jQuery,
		".yotpo-regular-box",
		function() {
			return window['jQuery'] && window['jQuery'].fn && window['jQuery'].fn.bxSlider;
		},
	], () => {
		
		$ = window['jQuery'];

		triggers();
	});

	// Audience conditions
	const triggers = (options) => {
		// FullStory tagging
		utils.fullStory('CB092', 'Variation 1');

		activate();
	};

})();
