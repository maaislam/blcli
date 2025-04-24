/* eslint-disable */
// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const TP078_V2 = (() => {
    let trackerName,
        slideQ = false,
        $;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        UC.poller([
            'ul.tabs','#tp26_overview .tab-content', '#tab-1 .featureClass', '#tab-1', '#tab-2',
            () => {
                if (window.jQuery) {
                    $ = window.jQuery
                    return true;
                }
            }
        ], init);
    })();

    function init(){

        utils.fullStory('TP078', 'Variation 2');
        //utils.events.send('TP078_V2', 'Category', 'Action', true, 6, 'Non-Trade');
        //utils.events.send('TP078_V2', 'Category', 'Action', true);

        const cacheDom = (() => {
            //Cache useful selectors for later use
            const bodyVar = document.querySelector('body');

            bodyVar.classList.add('TP078_V2');
            
			//Retun the selectors we want to reference in other parts of the test
			
            const tabsParent = document.querySelector('ul.tabs');
            const tabContentParent = document.querySelectorAll('#tp26_overview .tab-content');
            const productBP = document.querySelector('#tab-1 .featureClass');
            const productTab1 = document.querySelector('#tab-1');
            const productTab2 = document.querySelector('#tab-2');
            const productTab3 = document.querySelector('#tab-3');
			
            return {
				bodyVar,
                tabsParent,
                tabContentParent,
				productBP,
				productTab1,
				productTab2,
				productTab3
            };
        })();

		const testBuilder = {

			moveContent(){
				

        //Loop through tabs and move the headers above the tab content

				for(let i = 0; i < cacheDom.tabsParent.children.length; i++){
                        let headerMove = cacheDom.tabsParent.children[i].querySelector('p');
                        cacheDom.tabContentParent[i].insertBefore(headerMove, cacheDom.tabContentParent[i].firstChild);	
				};

        //Move the product bullet points above the product description and add a space
                
				cacheDom.productBP.parentNode.insertBefore(cacheDom.productBP, cacheDom.productBP.parentNode.firstChild);
				
				//Move tab 2 and 3 content to tab 1


				while (cacheDom.productTab2.childNodes.length > 0) {
					cacheDom.productTab1.appendChild(cacheDom.productTab2.childNodes[0]);
				};

				if(cacheDom.productTab3 != null){
					while (cacheDom.productTab3.childNodes.length > 0) {
						cacheDom.productTab1.appendChild(cacheDom.productTab3.childNodes[0]);
					};
				};

			},

			buildContent(){
				
				let productTab = document.querySelector('li[data-tab="tab-1"]');
				let reviewTab = document.querySelector('li[data-tab="tab-2"]');

				//Get review number and stars

				let reviewCount = document.querySelector('span.pr-snippet-review-count').textContent;
				reviewCount = reviewCount.substring(0, reviewCount.indexOf(" "));

				let reviewStars = document.querySelector('#pr-reviewsnippet').cloneNode(true); 
				reviewStars.id = "TP078_V2_Stars";

				//Build test specific content

				productTab.insertAdjacentHTML('afterbegin', 
				`<div class="TP078_V2_Product_Tab_Wrapper">
					<p class="TP078_V2_Product_Tab_Header">Product information</p>
				</div>`);

				reviewTab.insertAdjacentHTML('afterbegin', 
				`<div class="TP078_V2_Review_Tab_Wrapper">
					<p class="TP078_V2_Review_Tab_Header">
						<span>Reviews</span></p>
					<p class="TP078_V2_Review_Subheader">(` + reviewCount + `)</p>
				</div>`);

				document.querySelector('.TP078_V2_Review_Tab_Wrapper').insertBefore(reviewStars, document.querySelector('.TP078_V2_Review_Subheader'));
				
				//move the reviews section
			
				cacheDom.productTab2.appendChild(document.querySelector('#pr-reviewdisplay'));
			}

		}
		
		//Hide TP051 if it exists

		if(document.querySelector('.tp51-toplinks') != null){
			document.querySelector('.tp51-toplinks') .style.display = "none";
		}

		//Check if there are no reviews

		if(document.querySelector('.pr-rd-no-reviews .pr-snippet-write-review-link') != null){
			//No Reviews hide elements

			document.querySelector('#pr-reviewsnippet').style.display = "none";
			document.querySelector('#pr-reviewdisplay').style.display = "none";
			document.querySelector('#tp26_overview .tabs').style.display = "none";
			testBuilder.moveContent();

		} else {
			//Reviews
			testBuilder.moveContent();
			testBuilder.buildContent();
		};
		
    }    
})();