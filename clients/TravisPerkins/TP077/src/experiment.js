/* eslint-disable */
// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const TP077 = (() => {
    let trackerName,
        slideQ = false,
        $;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        UC.poller([
			'#collectionBranchLocatorPopup', '#addForCollectButton', '.tpProductInfo', '.tpProductInfo + div', '#collectionBranchLocatorForm',
			'#qty', '#collectionBranchLocatorPopupQty', '.update-button', '#collectionBranchLocatorButton', '.postcode-input', '.tpProductView > .span-14',
            () => {
                if (window.jQuery) {
                    $ = window.jQuery
                    return true;
                }
            }
        ], init);
    })();

    function init(){
        utils.fullStory('TP077', 'Variation 1');

        const cacheDom = (() => {
            //Cache useful selectors for later use
            const bodyVar = document.querySelector('body');

			bodyVar.classList.add('TP077');
			bodyVar.classList.add('TP077_Loading');
			
			const clickAndCollectModal = document.getElementById('collectionBranchLocatorPopup');
			const clickAndCollectButton = $('#addForCollectButton');
			const TP077closeModal = $('#cboxClose');
			const checkboxEnoughStock = document.querySelector('input[name="onlyWithStock"]');
			const clickAndCollectInfo = document.querySelector('.tpProductInfo + div');
			const collectionForm = document.getElementById('collectionBranchLocatorForm');
			const quantitySelector = document.getElementById('qty');
			const clickAndCollectQuantity = document.getElementById('collectionBranchLocatorPopupQty'); 
			const clickAndCollectQuantityUpdate = $('.update-button');
			const postcodeSearchButton = document.getElementById('collectionBranchLocatorButton');
			const postcodeValidationMessage = $('div.invalid-postcode-message');
			const branchList = $('#listView');
			const postcodeInputBox = document.querySelector('.postcode-input');
			const productInfoSelector = document.querySelector('.tpProductInfo');
			const productImageSize = document.querySelector('.tpProductView > .span-14');
			
            //Retun the selectors we want to reference in other parts of the test
            return {
				bodyVar,
				clickAndCollectModal,
				clickAndCollectButton,
				TP077closeModal,
				checkboxEnoughStock,
				clickAndCollectInfo,
				collectionForm,
				quantitySelector,
				clickAndCollectQuantity,
				clickAndCollectQuantityUpdate,
				postcodeSearchButton,
				postcodeValidationMessage,
				branchList,
				postcodeInputBox,
				productInfoSelector,
				productImageSize
			
            };
        })();


        const testBuilder = {

            setupElements(){

				let marginSizeCorrection;

				//Setup elements


				cacheDom.collectionForm.classList.add('clearfix');
				cacheDom.clickAndCollectInfo.classList.add('TP077_DisplayInfo');


        //Edit existing elements
        
				cacheDom.postcodeInputBox.placeholder = "Enter your postcode";


				//Build test elements

				cacheDom.collectionForm.querySelector('.branch-search').insertAdjacentHTML('afterbegin',`
				<div class="TP077_CheckStock_Wrapper">
					<p class="TP077_CheckStock_Header">Check stock</p>
					<p class="TP077_CheckStock_Content">Check stock at your local branch</p>
				</div>`);

				cacheDom.branchList.append("<div class='TP077_ShowBranchesWrapper'><p class='TP077_ShowBranches_Text'>Show closest 3 branches</p></div>");


				setTimeout(function(){	
				//Click the Click and Collect button to call required elements

					cacheDom.clickAndCollectButton.click();

					
					setTimeout(function(){	
						cacheDom.TP077closeModal.click();
						setTimeout(function(){	
						//Remove class to resume normal website functionality
						
							cacheDom.bodyVar.classList.remove('TP077_Loading');	
						}, 400);
					}, 400);
					cacheDom.checkboxEnoughStock.checked = true;
				}, 1000);

				//Calculate margin-top for check stock based on product information side
				

				setTimeout(function(){
					if(cacheDom.bodyVar.classList.contains('TP002')){
						UC.poller([
							'.tp2-toggle',
						], function(){
							marginSizeCorrection = cacheDom.productImageSize.offsetHeight - cacheDom.productInfoSelector.offsetHeight;

						});
					} else {
						marginSizeCorrection = cacheDom.productImageSize.offsetHeight - cacheDom.productInfoSelector.offsetHeight;
					};

					if(parseInt(marginSizeCorrection) > 0){
						document.querySelector('.TP077_DisplayInfo').style.marginTop = "-" + marginSizeCorrection + "px";					
					};
				}, 400);

				functionalityBuilder.linkQuantityInput();
				functionalityBuilder.validPostcodecheck();
				functionalityBuilder.showMoreBranches();

			}
			

        };

        
        const functionalityBuilder = {
            //Builds the functions of the test

            //---Event Structure Templates---

            //utils.events.send('TP077', 'Category', 'Action', true, 6, 'Non-Trade');
            //utils.events.send('TP077', 'Category', 'Action', true);
			//utils.events.send('TP077', 'Category', 'Action', {sendOnce: true});
			
			linkQuantityInput(){
				//Link quantity selector

				var textInput = cacheDom.quantitySelector;

				// Init a timeout variable to be used below
				let timeout = null;
				let updatedSelectionKey = textInput.value;
				let updatedSelectionChange = textInput.value;
			
				// Listen for keystroke events
				textInput.onkeyup = function (e) {
			
				// Clear the timeout if it has already been set.
				// This will prevent the previous task from executing
				// if it has been less than <MILLISECONDS>
				clearTimeout(timeout);
			
				// Make a new timeout set to go off in 800ms
					timeout = setTimeout(function () {
						//Only update quantity if a number

						try{

							updatedSelectionKey = parseInt(textInput.value);

							if(updatedSelectionChange == updatedSelectionKey || isNaN(updatedSelectionKey) == true){
								//Do nothing
								
							} else {
								//Update quantity 
								cacheDom.clickAndCollectQuantity.value = updatedSelectionKey;
								cacheDom.clickAndCollectQuantityUpdate.click();
							}

						} catch (error){
							//Do nothing 

							}
						}, 500);
					};
								
				textInput.onchange = function (e) {

					// Clear the timeout if it has already been set.
					// This will prevent the previous task from executing
					// if it has been less than <MILLISECONDS>
					clearTimeout(timeout);

					// Make a new timeout set to go off in 800ms
					timeout = setTimeout(function () {

						try{
							//Only update quantity if a number

							updatedSelectionChange = parseInt(textInput.value);
					
							if(updatedSelectionChange == updatedSelectionKey || isNaN(updatedSelectionChange) == true){
								//Do nothing
				
							} else {
								//Update quantity 
								cacheDom.clickAndCollectQuantity.value = updatedSelectionChange;
								cacheDom.clickAndCollectQuantityUpdate.click();
							}
							
						} catch (error){
							//Do nothing

						}
					}, 500);
				};
			},

			validPostcodecheck(){

				//When the search button is clicked,

				cacheDom.postcodeSearchButton.addEventListener("click", function(){

						if(cacheDom.postcodeValidationMessage.is(':visible')){
							//Hide branch list if visible
							cacheDom.branchList.slideUp();
						} else {
							//Postcode is valid, display information
							cacheDom.branchList.slideDown();
								
						};

				});

			},

			showMoreBranches(){
				//displays more branches
				document.querySelector('.TP077_ShowBranches_Text').addEventListener("click", function(){
					cacheDom.bodyVar.classList.toggle('TP077_Show_More_Branches');
					utils.events.send('TP077', 'Click', 'Show Closest 3 Branches', {sendOnce: true});
				});

			},

			findBranchesEvent(){
				cacheDom.postcodeSearchButton.addEventListener("click", function(){
					utils.events.send('TP077', 'Click', 'Find Branches', {sendOnce: true});
				});
			}

		};
		
	testBuilder.setupElements();

    }    
})();