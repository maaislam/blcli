/**
 * SD-87 - Branded Search
 * @author User Conversion
 */
import { setup, getPageData } from './services';
import settings from './settings';
import { events, logMessage } from './../../../../../lib/utils';
import { pollerLite } from './../../../../../lib/uc-lib';

events.analyticsReference = '_gaUAT';

const buildElement = (linksList) => {

	let insertionPoint = document.querySelector('.productImageContentWrapper');

	let html = `

		<div class="SD-100-content-holder">

			<h2> See more similar items: </h2>

			<div class="links-list">

			</div>

		</div>

	`;

	// insert Links

	insertionPoint.insertAdjacentHTML('afterend', html);

	let contentHolderLinksList = document.querySelector('.SD-100-content-holder .links-list');

	[].slice.call(linksList).forEach(function(link) {

		let listItem = `
			<a href="${link.url}" class="link-pill"> ${link.name} </a>
		`;

		contentHolderLinksList.insertAdjacentHTML('afterbegin', listItem);

	});

	// set up intersection observer

	let scrollWatch = new window.IntersectionObserver(entries => {
	entries.forEach(entry => {
	  if (entry.intersectionRatio > 0) {
	    events.send(settings.ID, `${settings.ID} Variation ${settings.VARIATION}`, `User has seen the content holder by scrolling past it`);
	    scrollWatch.unobserve(contentHolder);
	  }
	});
	}, { root: null });

	let contentHolder = document.querySelector('.SD-100-content-holder');

	scrollWatch.observe(contentHolder);

	// set up click events

	let allNewLinks = document.querySelectorAll('.link-pill');

	[].slice.call(allNewLinks).forEach(function(link) {
		link.addEventListener('click', (e) => {
			let clickHref = e.target.getAttribute('href');
			let clickName = e.target.innerHTML.trim();
			events.send(settings.ID, `${settings.ID} Variation ${settings.VARIATION}`, `User clicked on link ${clickName} going to href: ${clickHref}`);
		});
	});


}

const activate = () => {
  
  
	setup();

	logMessage("SD-100");

	let moreFromLinks = document.getElementById('MoreFromLinks');

	let moreFromLinksLis = moreFromLinks.querySelectorAll('li');

	let mfArray = [].slice.call(moreFromLinksLis);

	let sanitisedList = mfArray.map((mfLink) => {

		return {name: mfLink.querySelector('.MoreFromLink:last-of-type').innerHTML, url: mfLink.querySelector('.MoreFromLink:last-of-type').getAttribute('href')}

	});

	if(sanitisedList.length >= 2) {
		sanitisedList = sanitisedList.slice(0, 5);
		events.send(settings.ID, `${settings.ID} Variation ${settings.VARIATION}`, `Element displaying with ${sanitisedList.length} items`);
		buildElement(sanitisedList);
	} else {
		events.send(settings.ID, `${settings.ID} Variation ${settings.VARIATION}`, `Less than 2 similar items links on the page, ending test early`);
		return false;
	}
	
};

export default activate;
