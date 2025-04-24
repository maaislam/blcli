import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const SD056 = (() => {
	const activate = () => {
		document.body.classList.add('SD056');

		const homepageElements = () => {
			//Get all the banners
			const allBanners = document.querySelector('.mobile-cat-banner'),
				offerBanner = allBanners.querySelector('[title="mobile-banner-category-08"]').parentElement.parentElement,
				newInbanner = allBanners.querySelector('[title="mobile-banner-category"]').parentElement.parentElement,
				hairColourBanner = allBanners.querySelector('[title="mobile-banner-category-02"]').parentElement.parentElement,
				hairBanner = allBanners.querySelector('[title="mobile-banner-category-03"]').parentElement.parentElement,
				beautyBanner = allBanners.querySelector('[title="mobile-banner-category-04"]').parentElement.parentElement,
				nailsBanner = allBanners.querySelector('[title="mobile-banner-category-05"]').parentElement.parentElement,
				barbersBanner = allBanners.querySelector('[title="mobile-banner-category-06"]').parentElement.parentElement,
				furnitureBanner = allBanners.querySelector('[title="mobile-banner-category-07"]').parentElement.parentElement;

			//put the offer banner after new in.
			allBanners.insertBefore(offerBanner, newInbanner.nextSibling);

			const banner = document.querySelectorAll('.banner-box');
			for (let index = 0; index < banner.length; index++) {
				const bannerBox = banner[index];
				bannerBox.addEventListener('click', (e) => {
					utils.events.send('SD056', 'Category banner click', 'SD056 User clicked category banner', {
						sendOnce: true
					});
				});
			}

			//move the first banner based on cookie
			if (localStorage.getItem('SD056-category')) {

				const categoryStorage = localStorage.getItem('SD056-category');
				let firstToShow;

				if (categoryStorage === 'hair-colour') {
					firstToShow = hairColourBanner;
				} else if (categoryStorage === 'hair') {
					firstToShow = hairBanner;
				} else if (categoryStorage === 'beauty') {
					firstToShow = beautyBanner;
				} else if (categoryStorage === 'nails') {
					firstToShow = nailsBanner;
				} else if (categoryStorage === 'barbering') {
					firstToShow = barbersBanner;
				} else if (categoryStorage === 'furniture') {
					firstToShow = furnitureBanner;
				}

				allBanners.insertBefore(firstToShow, allBanners.firstChild);
				utils.events.send('SD056', 'Personal category shown', 'SD056 User seen their personalised category banner', {
					sendOnce: true
				});

				firstToShow.addEventListener('click', () => {
					utils.events.send('SD056', 'Personal category click', 'SD056 User clicked their personalised category banner', {
						sendOnce: true
					});
				});
			}
		}
		if (document.body.classList.contains('cms-home')) {
			UC.poller([
				'.mobile-cat-banner',
				'[title="mobile-banner-category-04"]',
				'[title="mobile-banner-category"]',
				'[title="mobile-banner-category-02"]',
				'[title="mobile-banner-category-05"]',
				'[title="mobile-banner-category-07"]',
				'[title="mobile-banner-category-08"]',
			], () => {
				homepageElements();
				utils.events.send('SD056', 'Homepage view', 'SD056 on experiment on the homepage', {
					sendOnce: true
				});
			});
		}
		//save the last category type user was on.
		if (!localStorage.getItem('SD056-category')) {
			if (document.body.classList.contains('catalog-category-view')) {
				const url = window.location.pathname;
				const categoryName = url.split("/")[1];
				localStorage.setItem(`SD056-category`, categoryName);
			}
		}
  }
  
  const homepageSlide = document.querySelector('.home-slider.mobile-banners'),
  uspBar = document.querySelector('.owl-stage-outer');
  
  uspBar.insertAdjacentElement('afterend', homepageSlide);

	// Audience conditions
	const triggers = ((options) => {
		UC.poller([
      'body',
      '.home-slider.mobile-banners',
      '.owl-stage-outer',
		], () => {
			utils.fullStory('SD056', 'Variation 1');
			activate();

		});
	})();

})();
