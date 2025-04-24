/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events, pollerLite, observer, logMessage, observePageChange } from '../../../../../lib/utils';
import settings from './shared';

const { ID, VARIATION } = settings;

const addRSListeners = () => {
	let recentSearchLinks = document.querySelectorAll('.BRA-215-recent-searches .rs-link');

	[].slice.call(recentSearchLinks).forEach((rs) => {
		rs.addEventListener('mousedown', (e) => {
			e.preventDefault();
			e.stopPropagation();
			let destHref = rs.href;
			events.send(ID + " - Variation: "+VARIATION, 'Recent Searches Link Clicked', "Dest Href: "+destHref);
			window.location.href = destHref;
		})
	});
}


const checkRecentSearches = () => {
	let recentSearches = JSON.parse(localStorage.getItem('BRA-251-user-search-terms'));

	recentSearches = recentSearches.map((rs) => {

		let escapedName = encodeURI(rs);
		let transformedURL = "https://www.bravissimo.com/search/" + escapedName;
		return {'name': rs, 'url': transformedURL};

	});

	recentSearches = recentSearches.slice(0, 5);

	let rsHTML = "";

	recentSearches.forEach((rs) => {

		rsHTML += `<a class="rs-link" href="${rs.url}"> ${rs.name} </a>`;

	});

	document.getElementById('BRA-215-recent-searches-list').innerHTML = rsHTML;

	addRSListeners();

}

const init = () => {
	
	pollerLite(['.c-header__search'], () => {

		let recentSearches = JSON.parse(localStorage.getItem('BRA-251-user-search-terms'));
    
	    if(recentSearches !== null) {

			recentSearches = recentSearches.map((rs) => {

				let escapedName = encodeURI(rs);
				let transformedURL = "https://www.bravissimo.com/search/" + escapedName;
				return {'name': rs, 'url': transformedURL};

			});

			recentSearches = recentSearches.slice(0, 5);

			let rsHTML = "";

			recentSearches.forEach((rs) => {

				rsHTML += `<a class="rs-link" href="${rs.url}"> ${rs.name} </a>`;

			})

			let searchOuterBoxHTML = `
				<div class="BRA-215-recent-searches">
					<h2> Recently Searched </h2>
					<div id="BRA-215-recent-searches-list" class="recent-searches-list ${VARIATION == 1 ? 'list' : 'pills'}">
						${rsHTML}
					</div>
				</div>
			`;

			let searchForm = document.getElementById('product-search');

			searchForm.autocomplete = 'off';

			searchForm.insertAdjacentHTML('beforeend', searchOuterBoxHTML);

			let searchFieldset = searchForm.querySelector('.c-header__search__main');

			let mobileCloseButtonHTML = `<a href="#" id="BRA-215-close-rs" class="BRA-215-close-rs">X</a>`;

			searchFieldset.insertAdjacentHTML('afterbegin', mobileCloseButtonHTML);

			let searchInput = searchForm.querySelector('.c-header__search__input');

			searchInput.autocomplete = 'off';

			addRSListeners();

			searchInput.addEventListener('focus', (e) => {
				e.preventDefault();
				searchForm.classList.add('rs-active');
			});

			searchInput.addEventListener('blur', (e) => {
				e.preventDefault();
				searchForm.classList.remove('rs-active');
			});

			document.getElementById('BRA-215-close-rs').addEventListener('click', (e) => {
				e.preventDefault();

				searchForm.classList.remove('rs-active');
			});

		}

		
	});

	



}



const activate = () => {

	setup();

	logMessage(ID + " - Variation: "+VARIATION);

	init(); // run first time code runs 

	observePageChange(document.body, (p) => {

		checkRecentSearches();

	});

	 // add experiment observer to re-add body classes when megamenu opened
    var body = document.body;
    if(body) {
      observer.connect(body, function () {
      	
      	if(!document.body.classList.contains(ID)) {
        	document.body.classList.add(ID);
        }

      }, {
        config: {
          attributes: true,
          childList: true,
          subtree: false,
        }
      });
    }    

};

export default activate;