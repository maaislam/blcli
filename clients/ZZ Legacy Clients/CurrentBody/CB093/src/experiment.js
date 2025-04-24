/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import reviews from './lib/reviews';

// CB093 - Experiment Title
const CB093 = (() => {

	let $ = null;

	// Experiment code  
	const activate = () => {
		document.body.classList.add('CB093');

		// Initialize reviews
		reviews();

		// Click events on read more
		const readMore = (() => {
			let allLi = document.querySelectorAll('.cb93-bxslider > li');
			let readMoreBtn = document.querySelectorAll('span.CB93');
			for (let z = 0; readMoreBtn.length > z; z++) {
				readMoreBtn[z].addEventListener('click', function() {
					for (let zz = 0; allLi.length > zz; zz++) {
						allLi[zz].classList.remove('CB93-swap');
					}
					let thisLi = this.parentNode.parentNode;
					thisLi.classList.add('CB93-swap');
          let slider = window['jQuery']('.cb93-bxslider');
					slider.startShow();
		 
				});
			};
		})();


		// Tooltip 
		const tooltip = () => {

			let tooltipWrap = document.createElement('div');
			tooltipWrap.classList.add('CB93-tooltip', 'yotpo-bottomline-box-2');
			const tooltipBreakdown = document.querySelector('#product_tabs_Yotporeview_contents .yotpo-star-distribution');
			
			let tt = null;
			if (tooltipBreakdown) {
				tt = tooltipBreakdown.cloneNode(true);
			}
 
			const toReviewsBtn = '<a href="#" id="CB93-scrollToReviews">See all reviews</a>';
			const toReviewDiv = document.createElement('div');
			toReviewDiv.innerHTML = toReviewsBtn;

			tooltipWrap.appendChild(tt);
			tooltipWrap.appendChild(toReviewDiv);
			
			return tooltipWrap;
		};
		if (document.querySelector('.CB93-reviews')) {
			let thisTooltip = tooltip();
			let reviewRef = document.querySelector('.CB93-reviews');
			reviewRef.insertAdjacentHTML('beforeend', thisTooltip.outerHTML);
		}

		let theTooltip = document.querySelector('.CB93-tooltip');
		if (theTooltip) {
			let reviewTitle = document.querySelector('.CB93-reviews #review_bottomline');
			reviewTitle.addEventListener('mouseenter', function() {
				theTooltip.classList.add('cb93-show-tooltip');
			});
			const reviewBox = document.querySelector('.CB93-reviews');
			reviewBox.addEventListener('mouseleave', function() {
				theTooltip.classList.remove('cb93-show-tooltip');
			});
		}


		// BX slider
		window['jQuery'](document).ready(function(){
      const allLi = document.querySelectorAll('.cb93-bxslider > li');
			// Start bx Slider
			let slider = window['jQuery']('.cb93-bxslider').bxSlider({
				auto: true,
				pager: false,
				adaptiveHeight: true,
				tickerHover: true,
				autoHover: true, 
				onSlideBefore: function() {
					for (let g = 0; allLi.length > g; g++) {
						allLi[g].classList.remove('CB93-swap');
					}
				}
			});
				 
      let scrollUp = `
        <div class="CB93-scrollup">
        <span class="CB93-scroll-up"></span>
        <p>Scroll to top</p>
        </div>
      `;
      
      window['jQuery']('body').append(scrollUp);

				// see all reviews link
      window['jQuery']('li.cb93-see-all').on('click', function() {
        window['jQuery']('#product_tabs_Yotporeview_contents').css('display', 'block');
        window['jQuery']('#product_tabs_Yotporeview_contents').prev().addClass('current');
        window['jQuery']('html, body').animate({
          scrollTop: window['jQuery']("#product_tabs_Yotporeview_contents").offset().top
        }, 2000);
        window['jQuery']('.CB93-scrollup').addClass('cb93-show-scroller');
      });
	
				// Scroll animation
      window['jQuery']('.CB93-tooltip #CB93-scrollToReviews').on('click', function(e) {
        e.preventDefault();
        
        // Hide other tabs
        window['jQuery']('.tabs-panels .panel').css('display', 'none');
        window['jQuery']('ul.tabs li.tab-navigation-item').removeClass('active');
      
        window['jQuery']('#product_tabs_Yotporeview_contents').css('display', 'block');
        window['jQuery']('#product_tabs_Yotporeview').addClass('active');
        window['jQuery']('#product_tabs_Yotporeview').find('a').addClass('current');
        window['jQuery']('html, body').animate({
          scrollTop: window['jQuery']("#product_tabs_Yotporeview_contents").offset().top
        }, 2000);
        window['jQuery']('.CB93-scrollup').addClass('cb93-show-scroller');
        });
      
        // Scroll up element
        window['jQuery']('.CB93-scrollup').on('click', function() {
        window['jQuery']('html, body').animate({
          scrollTop: window['jQuery'](".product-view").offset().top
        }, 2000);
        window['jQuery'](this).removeClass('cb93-show-scroller');
      });
		});


		// GA tracking on reviews link
		const reviewsTitle = document.querySelector('.CB93-reviews #review_bottomline a.text-m');
		reviewsTitle.addEventListener('click', function() {
			utils.events.send('CB093', 'Click', 'User clicked on the review link', {sendOnce: true}); 
		});
	

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
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('CB093', 'Variation 1');

		activate();
	});

})();
