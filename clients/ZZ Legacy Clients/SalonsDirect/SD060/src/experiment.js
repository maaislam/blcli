/* eslint-disable */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const SD060 = (() => {
	let $ = null;

	// ---------------------------------------------------------
	// When adding to the framework, specify PU004VARIATION = 1
	// ---------------------------------------------------------
	let VARIATION = null;
	if (typeof SD060VARIATION !== 'undefined') {
		VARIATION = SD060VARIATION;
	} else {
		VARIATION = 1;
	}


	const activate = () => {
		document.body.classList.add('SD060');
    document.body.classList.add('SD060v' + VARIATION);
    
    const hideFilters = () => {
      // hide the colour & size
      const filters = document.querySelectorAll('.refine-by-block dt');
      for (let i = 0; i < filters.length; i += 1) {
        const element = filters[i];
        const elementText = element.querySelector('span');
        if (elementText) {
          if (elementText.textContent.indexOf('colour filter') > -1) {
            element.classList.add('SD060-filterHide');
            element.nextElementSibling.classList.add('SD060-filterHide');
          }
          if (elementText.textContent.indexOf('size') > -1) {
            element.classList.add('SD060-filterHide');
            element.nextElementSibling.classList.add('SD060-filterHide');
          }
        }
      }
    }

		const mainContainer = document.querySelector('.main-container');
		const pageTitle = mainContainer.querySelector('.page-title.category-title');

		const runTest = () => {
			mainContainer.insertBefore(pageTitle, mainContainer.firstChild);

			// change the best sellers title
			const bestSeller = document.querySelector('.category-products .best-seller');
			bestSeller.querySelector('.widget-title').innerHTML = '<h2>This month\'s top sellers</h2>';

			// best seller event
			const bestSellerItems = bestSeller.querySelectorAll('.item');
			for (let x = 0; x < bestSellerItems.length; x++) {
				const element = bestSellerItems[x];
				element.addEventListener('click', () => {
					utils.events.send('SD060 v' + VARIATION, 'Best seller product click', 'SD060 click on best seller product', {
						sendOnce: true
					});
				});
      }
      
      // add the "fake" filter button
      const filterExists = document.querySelector('.SD060-filterBy');
      if(!filterExists){
        const topFilter = document.createElement('div');
        topFilter.classList.add('SD060-filterBy');
        topFilter.innerHTML = `<a href="#block-title">Filter By</a>`;
        mainContainer.insertBefore(topFilter, pageTitle.nextSibling);
      }
        const afterTitle = document.querySelector('.category-products');

			//clone the main title insert after best sellers
			const secondTitle = pageTitle.cloneNode(true);
			afterTitle.insertBefore(secondTitle, bestSeller.nextSibling);
			secondTitle.classList.add('SD060-title_clone');

			//move the real filters before the new title
			const filterWrapper = afterTitle.querySelector('.block.block-layered-nav.amshopby-filters-left');
			UC.poller(['.block.block-layered-nav.amshopby-filters-left'], () => {
				afterTitle.insertBefore(filterWrapper, afterTitle.querySelector('.best-seller').nextSibling);
				document.getElementById('block-title').addEventListener('click', () => {
					utils.events.send('SD060 v' + VARIATION, 'Filter results mobile click', 'SD060 clicked filter results on mobile', {
						sendOnce: true
					});
				});
			});
			//add the offer banner
			/* const offerBanner = document.createElement('div');
			offerBanner.classList.add('SD060-offer');
			offerBanner.innerHTML = '<a href="#"/>';

			offerBanner.querySelector('a').addEventListener('click', () => {
				utils.events.send('SD060 v' + VARIATION, 'Offer banner click', 'SD060 offer banner was clicked', {
					sendOnce: true
				});
			}); 

			const pagePagination = document.querySelector('.toolbar-top .toolbar');
			pagePagination.insertBefore(offerBanner, pagePagination.querySelector('.pages'));
*/
			//smooth anchor link
			const smoothLink = () => {
        const filterLink = $('.SD060-filterBy a');
				filterLink.click(function (e) {
					e.preventDefault();
					let target = e.target,
						thisTarget = target.getAttribute("href"),
						targetOffset = $(thisTarget).offset().top - 200;

					$('body,html').animate({
						scrollTop: targetOffset
					}, 600);

					const realFilter = document.getElementById('block-title');
          realFilter.click();
				});
      }
      UC.poller(['#block-title'], () => {
        smoothLink();
      });

			if (VARIATION === 1) {
				const addToBagButtons = document.querySelectorAll('.button.btn-cart');
				for (let add = 0; add < addToBagButtons.length; add++) {
					const addToBagClick = addToBagButtons[add];
					addToBagClick.addEventListener('click', () => {
						utils.events.send('SD060 V1', 'Add to bag click', 'SD060 add to bag click on category page', {
							sendOnce: true
						});
					});
				}
			}
		}

		//desktop changes
		const desktopChanges = () => {
			const desktopProducts = document.querySelector('.col-main');
			desktopProducts.insertBefore(pageTitle, desktopProducts.firstChild);

			//move the grid options next to the product title
			const toolbarOptions = document.querySelector('.sorter');
			const toolbarPage = document.querySelector('.pager');

			const listingTitle = document.querySelector('.SD060-title_clone');
			listingTitle.appendChild(toolbarOptions);
			listingTitle.appendChild(toolbarPage);

			//open all filters by default
			const allFilters = document.querySelectorAll('.filter-box');
			for (let j = 0; j < allFilters.length; j++) {
				const filterLinks = allFilters[j];
				filterLinks.classList.add('show');

				filterLinks.querySelector('li a').addEventListener('click', () => {
					utils.events.send('SD060 V' + VARIATION, 'Filter click desktop', 'SD060 click on a filter on desktop', {
						sendOnce: true
					});
				});
      }
			//change the filter title
			const filterTitle = document.getElementById('block-title');
			filterTitle.querySelector('.refine-title').textContent = 'Filter Results';
		}

		//click the in stock on page load - triggers the observer as it uses ajax to change the page
		UC.poller(['.hide_stock'], () => {
			const inStockFilter = document.querySelector('.hide_stock a');
			if(!inStockFilter.classList.contains('amshopby-attr-selected')){
				inStockFilter.click();
			}
		});

		//only do this once - sticky countdown
		if (window.innerWidth >= 768) { 
			//Put the countdown in the sticky nav
			const stickyNav = document.getElementById('sticky_navigation');
			const newCountdown = document.createElement('div');
			newCountdown.classList.add('SD060-stickyCountdown');

			stickyNav.appendChild(newCountdown);

			const currentCountdown = document.querySelector('.countdown-section');
      const clonedCountdown = document.createElement('div');
      clonedCountdown.innerHTML = `<div class="SD060-countdown-section"> 
      <i class="fa fa-clock-o clock-timer" aria-hidden="true"></i> 
      <div class="countdown-text-holder">
      <span class="countdown-text">Hurry, order within <span class="timer" id="SD060-header-timer"></span> for <span id="SD060-header-timer-day"></span> delivery!<strong>*</strong>
      </div></div>`;
      
      newCountdown.appendChild(clonedCountdown);
      
      // function that runs the new timer
      // displayTimer("Mar 28 2018 15:00:00","Mar 27 2018 09:03:04","SD060-header-timer");
      
      // Create cutoff date and convert to ms since epoch with getTime
      let cutoff = new Date();
      cutoff.setUTCHours(15, 0, 0);
      cutoff = cutoff.getTime();

      const countdown = UC.countdown({
        cutoff: cutoff,
        element: '#SD060-header-timer',
        labels: { // Custom labels
            d: 'd',
            h: 'h',
            m: 'm',
            s: 's'
        },
        delivery: {
            deliveryDays: 1, // How long an item takes to arrive
            excludeDays: ['Friday', 'Saturday', 'Sunday'], // Non-working days
            deliveryDayElement: '#SD060-header-timer-day',
            //tomorrowLabel: true
        }
      });

			window.addEventListener("scroll", function () {
				if (document.documentElement.scrollTop === 0) {
					newCountdown.classList.remove('SD060-stick_countdown');
				} else {
					newCountdown.classList.add('SD060-stick_countdown');
				}
			});

		}


		//wait for the page to change after in stock change
		UC.observer.connect(document.querySelector('.col-main'), function () {
			if (window.innerWidth >= 768) {
        runTest();
        hideFilters();
				//open all filters by default
				const allFilters = document.querySelectorAll('.filter-box');
				for (let j = 0; j < allFilters.length; j++) {
					const filterLinks = allFilters[j];
					filterLinks.classList.add('show');

					filterLinks.querySelector('li a').addEventListener('click', () => {
						utils.events.send('SD060 V' + VARIATION, 'Filter click desktop', 'SD060 click on a filter on desktop', {
							sendOnce: true
						});
					});
				}
				UC.poller(['.page-title.category-title'], () => {
					desktopChanges();
				});
			} else {
        runTest();
        hideFilters();
			}
		},{
			config: { attributes: true, childList: true, subtree: false },
			throttle: 1000
		});
	}

	// Audience conditions
	const triggers = ((options) => {
		UC.poller([
			'.page-title.category-title',
			'.col-main',
			'.category-products .best-seller',
			'.toolbar-top .pager',
			'.catalog-category-view',
			() => {
				return !!window.jQuery;
			}
		], () => {
			$ = window.jQuery;
			utils.fullStory('SD060', 'Variation'+VARIATION);
			activate();
		});
	})();

})();
