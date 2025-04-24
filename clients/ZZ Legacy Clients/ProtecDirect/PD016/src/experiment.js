/* eslint-disable */
// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const PD016 = (() => {
    let trackerName,
        slideQ = false,
        $;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed

		UC.poller([
			'#variant-grossPrice-header', '#variant-price-header', '#qty', 'div.qty > a.minus', 'div.qty > a.plus', '.prod.buynow > h3',
			'#addToCartForm > .branding',
			() => {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], init);
		
	
	})();
	
	function init(){
        utils.fullStory('PD016', 'Variation 1');

        const cacheDom = (() => {
            //Cache useful selectors for later use
			const bodyVar = document.querySelector('body');

			//Across all product pages
			const quantityInput = document.getElementById('qty');
			const productBoxTitle = bodyVar.querySelector('.prod.buynow > h3');
			const brandingContent = bodyVar.querySelector('#addToCartForm > .branding');
			const quantityIncreaseButton = bodyVar.querySelector('div.qty > a.plus');
			const quantityDecreaseButton = bodyVar.querySelector('div.qty > a.minus');
			let quantityDiscountsCheck = false;
			let exVatPrice;
			let vatPrice;
			let newExVatPrice;
      let newVatPrice;
      let PD016ExVatText;
      let PD016IncVatText;
      let discountCounter;
      let totalsTextContainer;
      let discountThresholdText;

      
      //Check if there are options, reassign selector if no options are available
      let optionSelector = document.getElementById('variant');

      if(optionSelector == null){
        optionSelector = bodyVar.querySelector('.options_not_available');
      }

			//Quantity discount pages only

			let discountedExVatPrice;
			let discountThreshold;
			

            bodyVar.classList.add('PD016');
            
            //Retun the selectors we want to reference in other parts of the test
            return {
				bodyVar,
				quantityInput,
				optionSelector,
				exVatPrice,
				vatPrice,
				discountedExVatPrice,
				discountThreshold,
				productBoxTitle,
				brandingContent,
				quantityDecreaseButton,
				quantityIncreaseButton,
				newExVatPrice,
				newVatPrice,
        quantityDiscountsCheck,
        PD016ExVatText,
        PD016IncVatText,
        discountCounter,
        totalsTextContainer,
        discountThresholdText,
            };
		})();
		
		const desktopQuantityDiscount = {

			//Poll for quantity discount portion of the test on desktop

			buildQuantityDiscountSection(){

				UC.poller([
					'#variant-quant_disc', '#variant-quant_disc > div .price', '#variant-quant_disc > div .quantity',
					() => {
						if (window.jQuery) {
							$ = window.jQuery
							return true;
						}
					}
				], function(){

					cacheDom.quantityDiscountsCheck = true;

					//Get and convert information for quantity discounts 

					cacheDom.discountedExVatPrice = cacheDom.bodyVar.querySelector('#variant-quant_disc > div .price').textContent;
					cacheDom.discountedExVatPrice = parseFloat(cacheDom.discountedExVatPrice.substring(cacheDom.discountedExVatPrice.indexOf("£")+1));

					cacheDom.discountThreshold = cacheDom.bodyVar.querySelector('#variant-quant_disc > div .quantity').textContent;
					cacheDom.discountThreshold = parseInt(cacheDom.discountThreshold.substring(0, cacheDom.discountThreshold.indexOf("+")));


					//Build additional markup for quantity discount

					cacheDom.totalsTextContainer.insertAdjacentHTML('afterend', `
          <span class="PD016_Discount_Threshold_Text">Add another <span class="PD016_Discount_Counter">`+ (cacheDom.discountThreshold - cacheDom.quantityInput.value) + `</span><span class="PD016_Discount_Items_Text"> items </span><span class="PD016_Discount_Item_Text"> item </span>to get a quantity discount!</span>`);
          
          //Assign selectors for event handlers

          cacheDom.discountCounter = cacheDom.bodyVar.querySelector('.PD016_Discount_Counter');
          cacheDom.discountThresholdText = cacheDom.bodyVar.querySelector('.PD016_Discount_Threshold_Text');
				});
			}
		}


        const desktopTestBuilder = {

            setupElements(){
				

        //Moves existing elements
        
        // Product options may not always exist, use it if it does exist
        if(cacheDom.optionSelector){ 
          cacheDom.productBoxTitle.insertAdjacentElement('afterend', cacheDom.optionSelector);
        }
        
				//Get and convert required product information

				cacheDom.exVatPrice = document.getElementById('variant-price-header').textContent;
				cacheDom.exVatPrice = parseFloat(cacheDom.exVatPrice.substring(cacheDom.exVatPrice.indexOf("£")+1));

			
				cacheDom.vatPrice = document.getElementById('variant-grossPrice-header').textContent;
				cacheDom.vatPrice = parseFloat(cacheDom.vatPrice.substring(cacheDom.vatPrice.indexOf("£")+1, cacheDom.vatPrice.indexOf(" ")));

				//Build Totals section markup

				const totalSectionMarkup = (`
				<div class="PD016_Totals_section_Wrapper">
					<p class="PD016_Total_ExVat">
						<span class="PD016_Total_Header">Total: </span>
						<span class="PD016_Price_Information">£<span class="PD016_Price">`+ cacheDom.exVatPrice + `</span></span> 
						<span class="PD016_Price_Type">(ex. VAT)</span>
					</p>
					<p class="PD016_Total_IncVat">
						<span class="PD016_Total_Header">Total: </span>
						<span class="PD016_Price_Information">£<span class="PD016_Price">`+ cacheDom.vatPrice + `</span></span>
						<span class="PD016_Price_Type">(inc. VAT)</span>
					</p>
				</div>
				`);

        cacheDom.brandingContent.insertAdjacentHTML('afterend', totalSectionMarkup);
        // Assign selectors for event handlers
        cacheDom.PD016ExVatText = cacheDom.bodyVar.querySelector('.PD016_Total_ExVat .PD016_Price');
        cacheDom.PD016IncVatText = cacheDom.bodyVar.querySelector('.PD016_Total_IncVat .PD016_Price');
        cacheDom.totalsTextContainer = cacheDom.bodyVar.querySelector('.PD016_Totals_section_Wrapper');
				desktopQuantityDiscount.buildQuantityDiscountSection();
				desktopFunctionalityBuilder.takeQuantityInput();
            }

        };

        
        const desktopFunctionalityBuilder = {
			
			takeQuantityInput(){

				//adds event handlers to quantity input and quantity buttons, updates total text

				//event handler for typing into quantity input
				cacheDom.quantityInput.addEventListener('input', function(){

					//Check if quantity input is a number

					if(isNaN(parseInt(cacheDom.quantityInput.value)) == false && !(cacheDom.quantityInput.value <= 0)){
						if(cacheDom.quantityDiscountsCheck == false){

							cacheDom.newExVatPrice = (cacheDom.quantityInput.value * cacheDom.exVatPrice).toFixed(2);
							cacheDom.newVatPrice = (cacheDom.quantityInput.value * cacheDom.vatPrice).toFixed(2);
	
							cacheDom.PD016ExVatText.textContent = cacheDom.newExVatPrice;
							cacheDom.PD016IncVatText.textContent = cacheDom.newVatPrice;


							//Check if quantity discount is available
						} else if (cacheDom.quantityDiscountsCheck == true){

							//If quantity discount is reached
							if(cacheDom.quantityInput.value >= cacheDom.discountThreshold){
	
								cacheDom.newExVatPrice = (cacheDom.quantityInput.value * cacheDom.discountedExVatPrice).toFixed(2);
								cacheDom.PD016ExVatText.textContent = cacheDom.newExVatPrice;

							//Check if class is added for CSS, prevents adding same class multiple times

							if(cacheDom.totalsTextContainer.classList.contains('PD016_Discounts') == false){
								cacheDom.totalsTextContainer.classList.add('PD016_Discounts');
							};
				
							//If quantity discount is not reached
							} else if (cacheDom.quantityInput.value < cacheDom.discountThreshold){

								cacheDom.newExVatPrice = (cacheDom.quantityInput.value * cacheDom.exVatPrice).toFixed(2);
								cacheDom.newVatPrice = (cacheDom.quantityInput.value * cacheDom.vatPrice).toFixed(2);
	
                cacheDom.PD016ExVatText.textContent = cacheDom.newExVatPrice;
                cacheDom.PD016IncVatText.textContent = cacheDom.newVatPrice;

							//Adjust "another item" text 

								if(cacheDom.discountThresholdText.classList.contains('PD016_Near_Discount')){
									cacheDom.discountThresholdText.classList.remove('PD016_Near_Discount');
								};


								if((cacheDom.discountThreshold - cacheDom.quantityInput.value) != 1 && (cacheDom.discountThreshold - cacheDom.quantityInput.value) > 0){
							
									cacheDom.discountCounter.textContent = (cacheDom.discountThreshold - cacheDom.quantityInput.value);

								} else if((cacheDom.discountThreshold - cacheDom.quantityInput.value) == 1){

									cacheDom.discountThresholdText.classList.add('PD016_Near_Discount');
								};

								//check if class is added for CSS, remove class if exists

								if(cacheDom.totalsTextContainer.classList.contains('PD016_Discounts') == true){
									cacheDom.totalsTextContainer.classList.remove('PD016_Discounts');
								};
							};
						
						};

						//Sets the total to 1 if a value is less than 0 or is 0
						}  else if(0 > cacheDom.quantityInput.value){
              cacheDom.quantityInput.value = 1;
              cacheDom.newExVatPrice = (cacheDom.quantityInput.value * cacheDom.exVatPrice).toFixed(2);
              cacheDom.newVatPrice = (cacheDom.quantityInput.value * cacheDom.vatPrice).toFixed(2);
  
              cacheDom.PD016ExVatText.textContent = cacheDom.newExVatPrice;
              cacheDom.PD016IncVatText.textContent = cacheDom.newVatPrice;

							if (cacheDom.quantityDiscountsCheck == true){
								cacheDom.discountCounter.textContent = cacheDom.discountThreshold;
							}
						}
					
          });
          
          // Event handler to check if input box is empty

          cacheDom.quantityInput.addEventListener('blur', function(){
            if(cacheDom.quantityInput.value == "" || cacheDom.quantityInput.value <= 0){
              cacheDom.quantityInput.value = 1;
              cacheDom.newExVatPrice = (cacheDom.quantityInput.value * cacheDom.exVatPrice).toFixed(2);
              cacheDom.newVatPrice = (cacheDom.quantityInput.value * cacheDom.vatPrice).toFixed(2);
  
              cacheDom.PD016ExVatText.textContent = cacheDom.newExVatPrice;
              cacheDom.PD016IncVatText.textContent = cacheDom.newVatPrice;

							if (cacheDom.quantityDiscountsCheck == true){
								cacheDom.discountCounter.textContent = cacheDom.discountThreshold;
              }
            }
          });


					//event handler for minus button

				cacheDom.quantityDecreaseButton.addEventListener('click', function(){
          // Check if a number greater than 0 is in the input
          if(!(cacheDom.quantityInput.value <= 0)){
            cacheDom.newExVatPrice = (cacheDom.quantityInput.value * cacheDom.exVatPrice).toFixed(2);
            cacheDom.newVatPrice = (cacheDom.quantityInput.value * cacheDom.vatPrice).toFixed(2);

            cacheDom.PD016ExVatText.textContent = cacheDom.newExVatPrice;
            cacheDom.PD016IncVatText.textContent = cacheDom.newVatPrice;

					//Check if discounts are available
					if(cacheDom.quantityDiscountsCheck == false){

            					
						//Check if discount threshold has been reached
					} else if (cacheDom.quantityDiscountsCheck == true){

                //If quantity discount is reached
                if(cacheDom.quantityInput.value >= cacheDom.discountThreshold){

                  cacheDom.newExVatPrice = (cacheDom.quantityInput.value * cacheDom.discountedExVatPrice).toFixed(2);
                  cacheDom.PD016ExVatText.textContent = cacheDom.newExVatPrice;

                  //Check if class is added for CSS

                  if(cacheDom.totalsTextContainer.classList.contains('PD016_Discounts') == false){
                    cacheDom.totalsTextContainer.classList.add('PD016_Discounts');
                  };
                  
                  //If quantity discount is not reached
                } else if (cacheDom.quantityInput.value < cacheDom.discountThreshold){

                  cacheDom.newExVatPrice = (cacheDom.quantityInput.value * cacheDom.exVatPrice).toFixed(2);
                  cacheDom.newVatPrice = (cacheDom.quantityInput.value * cacheDom.vatPrice).toFixed(2);

                  cacheDom.PD016ExVatText.textContent = cacheDom.newExVatPrice;
                  cacheDom.PD016IncVatText.textContent = cacheDom.newVatPrice;

                //Adjust "another item" text 

                if(cacheDom.discountThresholdText.classList.contains('PD016_Near_Discount')){
                  cacheDom.discountThresholdText.classList.remove('PD016_Near_Discount');
                };

                if((cacheDom.discountThreshold - cacheDom.quantityInput.value) != 1 && (cacheDom.discountThreshold - cacheDom.quantityInput.value) > 0){
                  
                  cacheDom.discountCounter.textContent = (cacheDom.discountThreshold - cacheDom.quantityInput.value);

                } else if (cacheDom.quantityInput.value == 0){

                  cacheDom.discountCounter.textContent = cacheDom.discountThreshold;

                } else if((cacheDom.discountThreshold - cacheDom.quantityInput.value) == 1){

                  cacheDom.discountThresholdText.classList.add('PD016_Near_Discount');
                };

                  //check if class is added for CSS, remove class if exists

                  if(cacheDom.totalsTextContainer.classList.contains('PD016_Discounts') == true){
                    cacheDom.totalsTextContainer.classList.remove('PD016_Discounts');
                  };
                };
						
          };
          
        //Sets the total to 1 if a value is less than 0 or is 0
         } else if(cacheDom.quantityInput.value <= 0){
            cacheDom.quantityInput.value = 1;
            cacheDom.newExVatPrice = (cacheDom.quantityInput.value * cacheDom.exVatPrice).toFixed(2);
            cacheDom.newVatPrice = (cacheDom.quantityInput.value * cacheDom.vatPrice).toFixed(2);

            cacheDom.PD016ExVatText.textContent = cacheDom.newExVatPrice;
            cacheDom.PD016IncVatText.textContent = cacheDom.newVatPrice;
          };
          

				});

				//Event handler for plus button
				cacheDom.quantityIncreaseButton.addEventListener('click', function(){

            if(cacheDom.quantityDiscountsCheck == false){
              if(cacheDom.quantityInput.value !=0){

                cacheDom.newExVatPrice = (cacheDom.quantityInput.value * cacheDom.exVatPrice).toFixed(2);
                cacheDom.newVatPrice = (cacheDom.quantityInput.value * cacheDom.vatPrice).toFixed(2);

                cacheDom.PD016ExVatText.textContent = cacheDom.newExVatPrice;
                cacheDom.PD016IncVatText.textContent = cacheDom.newVatPrice;

              };

              //Check if discount threshold has been reached
            } else if (cacheDom.quantityDiscountsCheck == true){

              //If quantity discount is reached

              if(cacheDom.quantityInput.value >= cacheDom.discountThreshold){

                cacheDom.newExVatPrice = (cacheDom.quantityInput.value * cacheDom.discountedExVatPrice).toFixed(2);
                cacheDom.PD016ExVatText.textContent = cacheDom.newExVatPrice;

                //Check if class is added for CSS

                if(cacheDom.totalsTextContainer.classList.contains('PD016_Discounts') == false){
                  cacheDom.totalsTextContainer.classList.add('PD016_Discounts');
                };
          
              } else if (cacheDom.quantityInput.value < cacheDom.discountThreshold){

                //If quantity discount is not reached

                cacheDom.newExVatPrice = (cacheDom.quantityInput.value * cacheDom.exVatPrice).toFixed(2);
                cacheDom.newVatPrice = (cacheDom.quantityInput.value * cacheDom.vatPrice).toFixed(2);

                cacheDom.PD016ExVatText.textContent = cacheDom.newExVatPrice;
                cacheDom.PD016IncVatText.textContent = cacheDom.newVatPrice;

                //Adjust "another item" text 

                if(cacheDom.discountThresholdText.classList.contains('PD016_Near_Discount')){
                  cacheDom.discountThresholdText.classList.remove('PD016_Near_Discount');
                };

                if((cacheDom.discountThreshold - cacheDom.quantityInput.value) != 1 && (cacheDom.discountThreshold - cacheDom.quantityInput.value) > 0){

                  cacheDom.discountCounter.textContent = (cacheDom.discountThreshold - cacheDom.quantityInput.value);

                } else if (cacheDom.quantityInput.value == 0){

                  cacheDom.discountCounter.textContent = cacheDom.discountThreshold;

                } else if((cacheDom.discountThreshold - cacheDom.quantityInput.value) == 1){
                  cacheDom.discountThresholdText.classList.add('PD016_Near_Discount');
                };

                //check if class is added for CSS, remove class if exists

                if(cacheDom.totalsTextContainer.classList.contains('PD016_Discounts') == true){
                  cacheDom.totalsTextContainer.classList.remove('PD016_Discounts');
                };
              };
              
            };

				});

			}

        };
		
		desktopTestBuilder.setupElements();
		
    }    
})();