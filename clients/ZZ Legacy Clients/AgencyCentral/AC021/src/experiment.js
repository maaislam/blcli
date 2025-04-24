// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------
/* eslint-disable */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const AC021 = (() => {
	let slideQ = false,
		$;

	const UCPoller = (() => {
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'#search-results-container',
			'.search-title-h2',
			() => {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], init);

		UC.poller([
			'.agency-result.row',
			() => {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], moreThan3Agencies);
	})();

	function init(){
		utils.fullStory('AC021', 'Variation 1');
		//utils.events.send('AC021', 'Category', 'Action', true);

		const cacheDom = (() => {
			//Cache useful selectors for later use
			const bodyVar = document.querySelector('body');

			const agencyWrap = $("#search-results-container");

			bodyVar.classList.add('AC021');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar,
				agencyWrap
			};
		})();

		const tailoredSection = {
			// Click function for the mobile tab variation to show the hidden options
			build(){
				const searchTitle = $('.search-title-h2');
				const agenciesNum = searchTitle.find('strong:first-child').text();
				const mainInd = searchTitle.find('strong:last-child').text();
				let employer = $('.profile-dropdown-icon-container > .option-text').text();
				let location = false;
				let subInd = false;
				let tailoredMarkup,
					prefix,
					prefix2 = 'looking for jobs';

				if(employer.toLowerCase().indexOf('employer') > -1) { 
					prefix = 'an';
					prefix2 = 'looking to hire';
				}
				else if(employer.toLowerCase().indexOf('neither') > -1){
					prefix = '';
					employer = 'both Employer and Employee';
				}
				else {
					prefix = 'a';
				}

				if($('#input-location-id-value').val()){
					location = searchTitle.find('strong:nth-child(2)').text();
					if($('#input-skill-value').val()){
						subInd = searchTitle.find('strong:nth-child(3)').text();
					}
				}
				else{
					if($('#input-skill-value').val()){
						subInd = searchTitle.find('strong:nth-child(2)').text();
					}
				}

				if(location != false){
					if(subInd != false){
						tailoredMarkup = `
							<section class="AC021_tailored-results">
								<h2>Our tailored results for you...</h2>
								<div class="AC021_agencies-found">
									<div><span>${agenciesNum}</span> agencies found from over 6,000 in our database</div>
									<p>Agencies are specific for ${prefix} <span>${employer}</span> 
										${prefix2} in <span>${location}</span> for 
										<span>${subInd}</span> jobs in the <span>${mainInd} industry</span>
									</p>
								</div>
							</section>
						`;
					}	
					else{
						tailoredMarkup = `
							<section class="AC021_tailored-results">
								<h2>Our tailored results for you...</h2>
								<div class="AC021_agencies-found">
									<div><span>${agenciesNum}</span> agencies found from over 6,000 in our database</div>
									<p>Agencies are specific for ${prefix} <span>${employer}</span> 
										${prefix2} in <span>${location}</span>
										for the <span>${mainInd} industry</span>
									</p>
								</div>
							</section>
						`;
					}
				}
				else{
					if(subInd != false){
						tailoredMarkup = `
							<section class="AC021_tailored-results">
								<h2>Our tailored results for you...</h2>
								<div class="AC021_agencies-found">
									<div><span>${agenciesNum}</span> agencies found from over 6,000 in our database</div>
									<p>Agencies are specific for ${prefix} <span>${employer}</span> 
										${prefix2} in <span>${subInd}</span> 
										 in the <span>${mainInd} industry</span>
									</p>
								</div>
							</section>
						`;
					}	
					else{
						tailoredMarkup = `
							<section class="AC021_tailored-results">
								<h2>Our tailored results for you...</h2>
								<div class="AC021_agencies-found">
									<div><span>${agenciesNum}</span> agencies found from over 6,000 in our database</div>
									<p>Agencies are specific for ${prefix} <span>${employer}</span> 
										${prefix2} in the <span>${mainInd} industry</span>
									</p>
								</div>
							</section>
						`;
					}
				}

				

				$('.listings-page-header-section').after(tailoredMarkup);
				
				$('.results-filter').after(`
					<div class="AC021_top-agencies">
						<span>
							<svg xmlns="http://www.w3.org/2000/svg" width="40px" height="38px" viewBox="0 0 40 38" version="1.1" class="star-icon">
								<g id="0-Style-Guide" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
									<g id="Style-Guide" transform="translate(-64.000000, -2950.000000)" fill="#4F4F4F">
										<path d="M89.945,2962.24453 L83.82,2950 L77.695,2962.24453 L64,2964.208 L73.91,2973.7392 L71.57,2987.19733 L83.82,2980.8432 L96.07,2987.19733 L93.73,2973.7392 L103.64,2964.208 L89.945,2962.24453 Z" id="star-icon"></path>
									</g>
								</g>
							</svg>
						</span>
						Top 3 agencies for you
					</div>
					<div class="AC021_top-agencies">
						<span>
							<svg xmlns="http://www.w3.org/2000/svg" width="40px" height="38px" viewBox="0 0 40 38" version="1.1" class="star-icon">
								<g id="0-Style-Guide" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
									<g id="Style-Guide" transform="translate(-64.000000, -2950.000000)" fill="#4F4F4F">
										<path d="M89.945,2962.24453 L83.82,2950 L77.695,2962.24453 L64,2964.208 L73.91,2973.7392 L71.57,2987.19733 L83.82,2980.8432 L96.07,2987.19733 L93.73,2973.7392 L103.64,2964.208 L89.945,2962.24453 Z" id="star-icon"></path>
									</g>
								</g>
							</svg>
						</span>
						Top 3 recruitment agencies for your needs
					</div>
				`);
			},
			scrollUser(){
				$('html, body').animate({
					scrollTop: $('.AC021_tailored-results').offset().top - 110
				}, 1000);
			},
			moreThan3Agencies(){
				const agencies = cacheDom.agencyWrap.find('.agency-result.row');
				const agenciesAfter3rd = parseInt($('.search-title-h2').find('strong:first-child').text()) - 3;

				if(agencies.length > 3){
					if(document.getElementById('input-order-value').value == 'standard'){
						agencies[2].insertAdjacentHTML('afterend', `<div class="AC021_other"><span>${agenciesAfter3rd}</span> other specialist recruitment agencies for you...</div>`);	
					}
					else{
						agencies[2].insertAdjacentHTML('afterend', `<div class="AC021_other"><span>${agenciesAfter3rd}</span> other specialist recruitment agencies for you (ordered by location)...</div>`);
					}
				}
				if(agencies.length > 10 && $('.emp-assisted-search-panel').length > 0){
					$('.emp-assisted-search-panel').insertAfter(agencies[9]);
				}
			}
		};

		tailoredSection.build();
		tailoredSection.scrollUser();
	}	
	function moreThan3Agencies(){
		const agencies = $("#search-results-container").find('.agency-result.row');
		const agenciesAfter3rd = parseInt($('.search-title-h2').find('strong:first-child').text()) - 3;

		if(agencies.length > 3){
			if(document.getElementById('input-order-value').value == 'standard'){
				agencies[2].insertAdjacentHTML('afterend', `<div class="AC021_other"><span>${agenciesAfter3rd}</span> other specialist recruitment agencies for you...</div>`);	
			}
			else{
				agencies[2].insertAdjacentHTML('afterend', `<div class="AC021_other"><span>${agenciesAfter3rd}</span> other specialist recruitment agencies for you (ordered by location)...</div>`);
			}
		}
		if(agencies.length > 10 && $('.emp-assisted-search-panel').length > 0){
			$('.emp-assisted-search-panel').insertAfter(agencies[9]);
		}
	}
})();