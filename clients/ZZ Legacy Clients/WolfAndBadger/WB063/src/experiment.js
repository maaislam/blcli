// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const WB063 = (() => {
    let trackerName,
        slideQ = false,
		$;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        UC.poller([
            '.facets', '.product-list-container > .categoryinfo',
            () => {
                if (window.jQuery) {
					$ = window.jQuery
					
				//Poller function to loop through filter sections to check if colour filters exist
					
				
				let WB063ColourAccordionParent;

				for(let i = 0; i < document.querySelectorAll('.facet.accordion-group > .accordion-heading > .accordion-toggle > h3').length; i++){
					if(document.querySelectorAll('.facet.accordion-group > .accordion-heading > .accordion-toggle > h3')[i].textContent.trim().toUpperCase() == "COLOUR" || document.querySelectorAll('.facet.accordion-group > .accordion-heading > .accordion-toggle > h3')[i].textContent.trim().toUpperCase() == "COLOR"){
							WB063ColourAccordionParent = document.querySelectorAll('.facet.accordion-group > .accordion-heading > .accordion-toggle > h3')[i];

							//Find filter links

							WB063ColourAccordionParent = $(WB063ColourAccordionParent).closest('.facet.accordion-group');
							WB063ColourAccordionParent = $(WB063ColourAccordionParent).find('.accordion-body > .accordion-inner > .facet-options > li');

							//If there 3 or more filters then start test
							if(WB063ColourAccordionParent.length >= 3 ){
								return true;
								}
						}
					}
			
				}

            }
        ], init);
    })();

    function init(){

        utils.fullStory('WB063', 'Variation 1');

        const cacheDom = (() => {
            //Cache useful selectors for later use
			const bodyVar = document.querySelector('body');
			let categoryHeader; 

			let filterAccordionParent; 
			let colourAccordionParent;
			let filterOne;
			let filterTwo;
			let filterThree;

			const WB063FilterMarkup = (`
			<div class="WB063-Filter-Wrapper">
				<div class="WB063-Header-Wrapper">
					<p class="WB063-Header">Curate your results</p>
				</div>
				<div class="WB063-Filter-Content">
					<div class="WB063-Filter-1 WB063-Filter-Container">
					</div>
					<div class="WB063-Filter-2 WB063-Filter-Container">
					</div>
					<div class="WB063-Filter-3 WB063-Filter-Container">
					</div>
				</div>
			</div>
			`);

            bodyVar.classList.add('WB063');
            
            //Retun the selectors we want to reference in other parts of the test
            return {
				bodyVar,
				categoryHeader,
				WB063FilterMarkup,
				filterAccordionParent,
				colourAccordionParent,
				filterOne,
				filterTwo,
				filterThree
            };
        })();


        const testBuilder = {

            setupElements(){
				//Insert container for filters
				
				cacheDom.categoryHeader = cacheDom.bodyVar.querySelector('.product-list-container > .categoryinfo');
				cacheDom.categoryHeader.insertAdjacentHTML('afterend', cacheDom.WB063FilterMarkup);
				cacheDom.filterAccordionParent = cacheDom.bodyVar.querySelectorAll('.facet.accordion-group > .accordion-heading > .accordion-toggle > h3');

				//Find colour filters parent
				for(let i = 0; i < cacheDom.filterAccordionParent.length; i++){
					if(cacheDom.filterAccordionParent[i].textContent.trim().toUpperCase() == "COLOUR" || cacheDom.filterAccordionParent[i].textContent.trim().toUpperCase() == "COLOR"){
						cacheDom.colourAccordionParent = cacheDom.filterAccordionParent[i];
						cacheDom.colourAccordionParent = $(cacheDom.colourAccordionParent).closest('.facet.accordion-group');
						break;
					}
				}

				//Get the first three filters

				cacheDom.colourAccordionParent = $(cacheDom.colourAccordionParent).find('.accordion-body > .accordion-inner > .facet-options > li > a');
				
				cacheDom.filterOne = cacheDom.colourAccordionParent[0].cloneNode(true);
				cacheDom.filterTwo = cacheDom.colourAccordionParent[1].cloneNode(true);
				cacheDom.filterThree = cacheDom.colourAccordionParent[2].cloneNode(true);

				//Move Filters

				cacheDom.bodyVar.querySelector('.WB063-Filter-1').insertAdjacentElement('afterbegin', cacheDom.filterOne);
				cacheDom.bodyVar.querySelector('.WB063-Filter-2').insertAdjacentElement('afterbegin', cacheDom.filterTwo);
				cacheDom.bodyVar.querySelector('.WB063-Filter-3').insertAdjacentElement('afterbegin', cacheDom.filterThree);

				//Build tracking

				testBuilder.buildTracking();
				
			},

			buildTracking(){
				//Add tracking to the colour filter headers

				$('.WB063-Filter-Container > a').on("click", function(){
					let WB063TrackingColour = $(this).text().trim();
					utils.events.send('WB063', 'Header Filter', WB063TrackingColour, {sendOnce: true});
				});
			}
	

		};
		
		if(/^(\/)[a-z]{2}(\/)(category|designers)(\/)(women|men)(\/)(jewellery)(\/).*/.test(window.location.pathname)){
		
			testBuilder.setupElements();
			
			//Set a mutation observer for any changes made on the category page

			UC.observer.connect($('#pjax-container'), function() {
				// Callback to invoke on mutation
				
				if(cacheDom.bodyVar.querySelector('.WB063-Filter-Wrapper') == null){

					//Poll on mutation to rebuild elements
					UC.poller([
						'.facets', '.product-list-container > .categoryinfo',
						() => {

							//Poller function to loop through filter sections to check if colour filters exist
								
							let MObserverWB063ColourAccordionParent;
			
							for(let i = 0; i < cacheDom.filterAccordionParent.length; i++){
								if(cacheDom.filterAccordionParent[i].textContent.trim().toUpperCase() == "COLOUR" || cacheDom.filterAccordionParent[i].textContent.trim().toUpperCase() == "COLOR"){								
									
										MObserverWB063ColourAccordionParent = cacheDom.bodyVar.querySelectorAll('.facet.accordion-group > .accordion-heading > .accordion-toggle > h3')[i];
			
										//Find filter links
			
										MObserverWB063ColourAccordionParent = $(MObserverWB063ColourAccordionParent).closest('.facet.accordion-group');
										MObserverWB063ColourAccordionParent = $(MObserverWB063ColourAccordionParent).find('.accordion-body > .accordion-inner > .facet-options > li');
			
										//If there 3 or more filters then start test
										if(MObserverWB063ColourAccordionParent.length >= 3 ){
											return true;
											}
									}
								}
							}
			
					], function(){
						
						//Only rebuild content if it does not exist, prevents multiple pollers adding content when complete 
						if(cacheDom.bodyVar.querySelector('.WB063-Filter-Wrapper') == null){
							testBuilder.setupElements();
						}
					
					});
				}

			}, {
			// Options
				config: {attributes: true, childList: true, subtree: false},
				throttle: 1000 
			});
		}
    }    
})();