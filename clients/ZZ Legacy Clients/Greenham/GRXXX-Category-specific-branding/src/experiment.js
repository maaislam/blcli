/* eslint-disable */
// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const GRXXX_Category_specific_branding = (() => {
    let trackerName,
        slideQ = false,
        $;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        UC.poller([
            () => {

				//regex matching needed, else will style all pages
                if (window.jQuery) {
                    $ = window.jQuery
                    return true;
                }
            }
        ], init);
    })();

    function init(){
        utils.fullStory('GRXXX_Category_specific_branding', 'Variation 1');

        const cacheDom = (() => {
            //Cache useful selectors for later use
			const bodyVar = document.querySelector('body');
			const mainContentWrapper = bodyVar.querySelector('#wrapper');
			const categoryContentContainer = bodyVar.querySelector('#content');
			const breadcrumbParent = bodyVar.querySelector('#breadcrumb');
			const tertiaryCategoryViewType = bodyVar.querySelectorAll('.productSwitchItemL.view_switcher > .not_active')[0];
			let tertiaryCategoryProductParent; 
			let tertiaryCategoryProducts;

			//Branding URL updates to linked pages

			const brandingURL = "/";

            bodyVar.classList.add('GRXXX_Category_specific_branding');
            
            //Retun the selectors we want to reference in other parts of the test
            return {
				bodyVar,
				mainContentWrapper,
				categoryContentContainer,
				breadcrumbParent,
				tertiaryCategoryViewType,
				tertiaryCategoryProductParent,
				tertiaryCategoryProducts,
				brandingURL
            };
        })();


        const testBuilder = {

			setupBackground(){
			//Add links to the background sides 
				const backgroundRight = (`
					<div class="GRXXX-Category-BG-Right-Wrapper">
						<a class="GRXXX-Category-BG-Right-Link" href="`+cacheDom.brandingURL+`">Link to brand</a>
					</div>
				`);

				const backgroundLeft = (`
				<div class="GRXXX-Category-BG-Left-Wrapper">
					<a class="GRXXX-Category-BG-Left-Link" href="`+cacheDom.brandingURL+`">Link to brand</a>
				</div>
				`);

				cacheDom.mainContentWrapper.insertAdjacentHTML('afterend', backgroundRight);
				cacheDom.mainContentWrapper.insertAdjacentHTML('afterend', backgroundLeft);

			},

            setupHeader(){
			//Add styling class

				cacheDom.bodyVar.classList.add('GRXXX-Category-Page-Styling');
				const categoryHeader = (`
				<div class="GRXXX-Category-Header">
				<p class="GRXXX-Category-Header-Placeholder">Header Image</p>
				</div>`);

			//Move breadcrumbs

				cacheDom.categoryContentContainer.insertAdjacentElement('beforebegin', cacheDom.breadcrumbParent);

			//Insert header
				cacheDom.categoryContentContainer.insertAdjacentHTML('beforebegin', categoryHeader);
                
			},
			
			setupGrid(){
			//Do not build ingrid content on list view

			//Check which listing type is not active, if image view is not an active link then assume image listing and build content

			if(cacheDom.tertiaryCategoryViewType.textContent.toUpperCase().indexOf("IMAGE VIEW") > -1){

				//Insert ingrid branding at 4th position

				cacheDom.tertiaryCategoryProductParent = cacheDom.bodyVar.querySelectorAll('.span-20.subcat_content-wide.last > .span-20.subcat_content-wide')[1];
				cacheDom.tertiaryCategoryProducts = cacheDom.tertiaryCategoryProductParent.querySelectorAll('.span-10');

				const gridContent = (`
				<div class="span-10 GRXXX-Category-In-Grid">
					<a class="GRXXX-Category-In-Grid-Link" href="`+cacheDom.brandingURL+`">Link to brand</a>
				</div>`);
				console.log(cacheDom.tertiaryCategoryProducts.length);
			
				//Find 4th position, if less than 4 products exist, add to the end else add at 4th position

				if(cacheDom.tertiaryCategoryProducts.length > 4){
					cacheDom.tertiaryCategoryProducts[3].insertAdjacentHTML('beforebegin', gridContent);
				} else {
					$(cacheDom.tertiaryCategoryProductParent).children('.span-10:last').after(gridContent);
				}

				//Reassign selector to update the number of items in the product container list
				$(cacheDom.tertiaryCategoryProductParent = cacheDom.bodyVar.querySelectorAll('.span-20.subcat_content-wide.last > .span-20.subcat_content-wide')[1]);

				//Use website CSS, add last class to product items that have an odd numbered position in container 
				$(cacheDom.tertiaryCategoryProductParent).children('.span-10:odd').each(function(){
					if(!$(this).hasClass('last')){
						$(this).addClass('last');
					}
				});
				// Remove last class to product items that have an even numbered position in container 
				$(cacheDom.tertiaryCategoryProductParent).children('.span-10:even').each(function(){
					if($(this).hasClass('last')){
						$(this).removeClass('last');
					}
				});			

				}
			}


        };

	//Call the correct content builders depending on page type

	//Replace URLS with Regexes
	
	//Primary and secondary category pages
	if(window.location.pathname == "/Personal-Protective-Equipment/Special-Hazard-Clothing~c~AA" || window.location.pathname == "/Personal-Protective-Equipment~c~A"){
		testBuilder.setupBackground();
		testBuilder.setupHeader();

	} else if(window.location.pathname == "/Personal-Protective-Equipment/Special-Hazard-Clothing/High-Visibility-Clothing~c~AAA" || window.location.pathname == "/Cleaning-and-Hygiene/Industrial-Skin-Care~c~BD"){
		//Tertiary product page

		testBuilder.setupBackground();
		testBuilder.setupHeader();
		testBuilder.setupGrid();
		console.log("Tertiary page");
	
	} else if(window.location.pathname == "/Personal-Protective-Equipment/Special-Hazard-Clothing/High-Visibility-Clothing/Sioen-Mildura-High-Visibility-Rain-Jacket-Orange~p~015650"){
	//Product pages

		testBuilder.setupBackground();
	}	
    
       
    }    
})();