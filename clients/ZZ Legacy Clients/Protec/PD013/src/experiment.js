// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as markup from '../lib/markup';

const PD013 = (() => {
    let trackerName,
        slideQ = false,
        $;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        
        //Detect device type and use required poller
		
		if(document.querySelector('body').classList.contains("ui-mobile-viewport")){

			//Mobile Poller

			UC.poller([
				'body', 'div.code', '.positive.add-to-basket.ui-btn.ui-icon-shop.ui-btn-icon-left.ui-shadow.ui-corner-all.ui-mini',
				() => {
					if (window.jQuery) {
						$ = window.jQuery
						return true;
					}
				}
			], init_Mobile);

		} else {

			//Desktop Poller
			
			UC.poller([
				'.prod .code', '#addToCartForm .positive.large',
				() => {
					if (window.jQuery) {
						$ = window.jQuery
						return true;
					}
				}
			], init_Desktop);
		}

    })();

    function init_Desktop(){
        utils.fullStory('PD013', 'Variation 1');
        //utils.events.send('PD013', 'Category', 'Action', true, 6, 'Non-Trade');
        //utils.events.send('PD013', 'Category', 'Action', true);

        const cacheDom = (() => {
            //Cache useful selectors for later use
            const bodyVar = document.querySelector('body');

			bodyVar.classList.add('PD013');
            const productCode = document.querySelector('.prod .code');
            const addToBasketButton = document.querySelector('#addToCartForm .positive.large');
            let addBrandingSelector;
            let startBranding;
            let productInformationTitle;

			
            //Retun the selectors we want to reference in other parts of the test
            return {
				bodyVar,
                productCode, 
                startBranding,
                addToBasketButton,
                addBrandingSelector,
                productInformationTitle
            };
		})();
        
        
        const brandingContent = {

            //Poll for desktop branding content, create branding portion of test if branding is available

            desktopBrandingContent(){
                UC.poller([
                    '.prod .code', '#addToCartForm .positive.large', '#addToCartForm .branding a', 
                    
                ], function(){
                    //Build desktop branding content

                    cacheDom.bodyVar.classList.add('PD013_Branding_Available');
                    cacheDom.startBranding = document.querySelector('#addToCartForm .branding a');
                    cacheDom.addBrandingSelector = document.querySelector('#addToCartForm .branding');
                    cacheDom.productInformationTitle = document.querySelector('.prod.buynow h3 label');

                    cacheDom.startBranding.innerHTML = "Add branding";
                    cacheDom.startBranding.insertAdjacentHTML('beforebegin', markup.branding_text_markup);
                    cacheDom.addBrandingSelector.querySelector('label').insertAdjacentHTML('beforebegin', markup.branding_modal_markup);

                    cacheDom.productInformationTitle.insertAdjacentElement('afterend', cacheDom.addBrandingSelector);

                    //Call function to build desktop functionality
                    functionalityBuilder.desktopBuildButtonFunction();

                    
                });
            }
        }

        const quantityDiscountContent = {

            //Poll for quantity discounts, update content if available

            desktopQuantityContent(){
                UC.poller([
                    '#variant-quant_disc strong', 
                   
                ], function(){
                    document.querySelector('#variant-quant_disc strong').textContent = "Buy more and save!";
                });

            }
        }

		const contentBuilder = {
            desktopBuildContent(){
                //Build desktop content 

                cacheDom.productCode.insertAdjacentHTML('afterend', markup.quality_markup);
                cacheDom.addToBasketButton.insertAdjacentHTML('afterend', markup.review_markup);
            }
        }
        
        const functionalityBuilder = {
            desktopBuildButtonFunction(){

                //Build desktop test functionality

                document.querySelector('.PD013_Branding_Wrapper > span').addEventListener('click', function(){
                   cacheDom.bodyVar.classList.toggle('PD013_info_modal');
                   utils.events.send('PD013', 'Modal Open', 'Need to add your own branding', {sendOnce: true});
                });

                cacheDom.startBranding.addEventListener('click', function(){
                    utils.events.send('PD013', 'Button', 'Start your custom order', true);
                 });

                 document.querySelector('.PD013_Modal_Close').addEventListener('click', function(){
                    cacheDom.bodyVar.classList.toggle('PD013_info_modal');
                 });

                 document.querySelector('.PD013_Branding_Icon_Link').addEventListener('click', function(){
                    utils.events.send('PD013', 'Icon', 'Start your custom order', true);
                 })
            }
        }
		
		//Start Desktop test
       
        contentBuilder.desktopBuildContent();
        brandingContent.desktopBrandingContent();
        quantityDiscountContent.desktopQuantityContent();

    } 
    
	
	//Mobile Version
	
	function init_Mobile(){
        utils.fullStory('PD013', 'Variation 1');
        //utils.events.send('PD013', 'Category', 'Action', true, 6, 'Non-Trade');
        //utils.events.send('PD013', 'Category', 'Action', true);

        const cacheDom = (() => {
            //Cache useful selectors for later use
            const bodyVar = document.querySelector('body');

            bodyVar.classList.add('PD013_Mobile');

            const mobileProductCode = document.querySelector('div.code');
            const mobileAddToBasket = document.querySelector('.positive.add-to-basket.ui-btn.ui-icon-shop.ui-btn-icon-left.ui-shadow.ui-corner-all.ui-mini');
            const mobilePriceHeader = document.querySelector('h3.price-text');
            const mobilePriceVAT = document.querySelector('span.productVariantSelector-grossPrice-header');
            const mobilePriceBefore = document.querySelector('p.wasPrice');
            const mobileProductInformation = document.querySelector('p.initial-description');
            const mobileQSelector = document.querySelector('.qty_widget.ui-field-contain.qty');
            const mobileFreeDeliverySelector = document.querySelector('div.freeDeliveryBlock');
            let mobileOptionSelector;
            let mobileStartBranding;
            let mobileCustomisedOrderSelector;

            const mobileProductInformationBox = document.querySelector('.productDetailPanel > div.grid_8');

            //Assign correct selector for option dropdown depending on page elements

             if(document.querySelector('#variant-button') != null){
                 mobileOptionSelector = document.querySelector('div.variant_options.bottomMargin');
             } else {
                 mobileOptionSelector = document.querySelector('div.options_not_available');
             };

            //Retun the selectors we want to reference in other parts of the test
            return {
                bodyVar,
                mobileProductCode,
                mobileAddToBasket,
                mobileStartBranding,
                mobileProductInformation,
                mobileOptionSelector,
                mobilePriceBefore,
                mobilePriceVAT,
                mobilePriceHeader,
                mobileQSelector,
                mobileCustomisedOrderSelector,
                mobileFreeDeliverySelector,
                mobileProductInformationBox
            };
        })();

        const mBrandingContent = {

             //Poll for mobile branding content, create branding portion of test if branding is available

            mobileBrandingContent(){
                UC.poller([
                    'div.code', '.positive.add-to-basket.ui-btn.ui-icon-shop.ui-btn-icon-left.ui-shadow.ui-corner-all.ui-mini', '#addToCartForm div.brandingDesc', '#addToCartForm .ui-link', '#addToCartForm div.branding',
                    () => {
                        if (window.jQuery) {
                            $ = window.jQuery
                            return true;
                        }
                    }
                ], function(){
                    cacheDom.mobileStartBranding = document.querySelector('#addToCartForm .ui-link');
                    cacheDom.mobileCustomisedOrderSelector = document.querySelector('#addToCartForm div.branding');

                    cacheDom.mobileStartBranding.innerHTML = "Add branding";
                    cacheDom.mobileStartBranding.insertAdjacentHTML('beforebegin', markup.branding_text_markup);
                    cacheDom.mobileStartBranding.insertAdjacentHTML('beforebegin', markup.branding_modal_markup);


                    //Call function to build mobile functionality
                    mFunctionalityBuilder.mobileBuildButtonFunction();
                });
            }
        }

        const mFunctionalityBuilder = {

            //Build mobile test functionality

            mobileBuildButtonFunction(){
                document.querySelector('.PD013_Branding_Wrapper > span').addEventListener('click', function(){
                   cacheDom.bodyVar.classList.toggle('PD013_info_modal');
                   utils.events.send('PD013', 'Modal Open', 'Need to add your own branding', {sendOnce: true});
                });

                cacheDom.mobileStartBranding.addEventListener('click', function(){
                    utils.events.send('PD013', 'Button', 'Start your custom order', true);
                 });

                 document.querySelector('.PD013_Modal_Close').addEventListener('click', function(){
                    cacheDom.bodyVar.classList.toggle('PD013_info_modal');
                 });

                 document.querySelector('.PD013_Branding_Icon_Link').addEventListener('click', function(){
                    utils.events.send('PD013', 'Icon', 'Start your custom order', true);
                })
            }
        }    

        const mContentBuilder = {
            mobileBuildContent(){

                //Move existing elements before adding test content
                cacheDom.mobileProductCode.parentNode.insertBefore(cacheDom.mobileProductInformation, cacheDom.mobileProductCode);
                cacheDom.mobileQSelector.parentNode.insertBefore(cacheDom.mobileOptionSelector, cacheDom.mobileQSelector);

                if(cacheDom.mobileFreeDeliverySelector != null){
                    cacheDom.mobileQSelector.parentNode.insertBefore(cacheDom.mobileFreeDeliverySelector, cacheDom.mobileQSelector);
                };

                cacheDom.mobileQSelector.parentNode.insertBefore(cacheDom.mobilePriceHeader, cacheDom.mobileQSelector);
                cacheDom.mobileQSelector.parentNode.insertBefore(cacheDom.mobilePriceVAT, cacheDom.mobileQSelector);
                cacheDom.mobileQSelector.parentNode.insertBefore(cacheDom.mobilePriceBefore, cacheDom.mobileQSelector);


                //Add test content

                cacheDom.mobileProductInformationBox.insertAdjacentHTML('afterend', markup.quality_markup);
                cacheDom.mobileAddToBasket.insertAdjacentHTML('afterend', markup.review_markup);


                //Build functionality for quality accordion
                //document.querySelector('.PD013_QualityWrapper').addEventListener('click', function(){
                //    cacheDom.bodyVar.classList.toggle('PD013_Mobile_Accordion');
                //    utils.events.send('PD013', 'Click', 'Quality products you can trust', {sendOnce: true});
                //});
            }
        }
		
    //Start mobile test
    
    mContentBuilder.mobileBuildContent();
    mBrandingContent.mobileBrandingContent();



// //www.sitegainer.com/fu/up/vk0f1n3uic6h4hh.png
// //www.sitegainer.com/fu/up/4ebvw3bxkfo9vi7.png
    }    
})();