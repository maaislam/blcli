// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------
/* eslint-disable */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const WB065_V1 = (() => {
    let trackerName,
        slideQ = false,
        $;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        UC.poller([

            () => {
                if (window.jQuery) {
                    $ = window.jQuery
                    return true;
                }
            }
        ], init);
    })();

    function init(){
        utils.fullStory('WB065_V1', 'Variation 1');

        const cacheDom = (() => {
            //Cache useful selectors for later use
			const bodyVar = document.querySelector('body');
			const breadcrumbsParent = bodyVar.querySelector('.breadcrumbs');
			const availabilityInformation = bodyVar.querySelector('.hidden-non-phone > .availability');
			const productImageCarousel = bodyVar.querySelector('.product-image-column > .thumbs');
            
            
			const addToBag = bodyVar.querySelector('.product-details-column > .row > .add-to-bag-or-wishlist');
			let addToWishlist = bodyVar.querySelector('div.wishlist-add-form-container');

            bodyVar.classList.add('WB065_V1');
            
            //Retun the selectors we want to reference in other parts of the test
            return {
				bodyVar,
				breadcrumbsParent,
				addToWishlist,
				availabilityInformation,
				productImageCarousel,
				addToBag
            };
        })();


        const testBuilder = {

            setupElements(){
				//Edit breadcrumbs

                cacheDom.breadcrumbsParent.childNodes[2].textContent = "";
                cacheDom.breadcrumbsParent.childNodes[8].textContent = "";
                
        //Move elements
        

        UC.poller([
          '.hidden-non-phone .desiger-info > .WB050_designer-link'
       ], () => {
         const upperDesignerLink = cacheDom.bodyVar.querySelector('.hidden-non-phone .desiger-info > .WB050_designer-link');
         cacheDom.productImageCarousel.insertAdjacentElement('afterend', upperDesignerLink);
       })

        if(cacheDom.addToBag == null){

            //Hide availability information     
            cacheDom.availabilityInformation.style.display = "none";

        } else {
          //Move elements to below add to bag if it exists

        cacheDom.addToBag.insertAdjacentElement('afterend', cacheDom.availabilityInformation);

        //Move add to wishlist if it exists
                if(cacheDom.addToWishlist != null){
                    cacheDom.addToBag.insertAdjacentElement('afterend', cacheDom.addToWishlist);
                }
        }
				
				//Hide product images if there is only one image

				if(cacheDom.productImageCarousel.querySelector('.thumb-frames-container').childNodes.length == 1){
                    cacheDom.productImageCarousel.style.display = "none";
                }

                //Collapse Style notes

				$('#product-info-accordion > .accordion-group:first').find('.accordion-heading > a').click();
                
                functionalityBuilder.buildTracking();
                functionalityBuilder.buildScrollTracking();
            }

        };

        
        const functionalityBuilder = {
            //Builds the functions of the test

            buildTracking(){
                $('.addthis_toolbox > a').on("click", function(){
                    let socialMediaIcon = $(this).attr("title");
                    utils.events.send('WB065_V1', 'Social Media Icon', socialMediaIcon, true);
                });

                $('div[class="accordion-group"]').on("click", function(){
                    let accordionGroup = $(this).find('a:first').text().trim();
                    utils.events.send('WB065_V1', 'Dropdown', accordionGroup, true);
                });
            },

            buildScrollTracking(){

                    // Default time delay before checking location
                    var timer = 0;
                    var callBackTime = 100;
                    var scrollTwentyFive = true;
                    var scrollFifty = true;
                    var scrollSeventyFive = true;
                    var scrollOneHundred = true;
            
                    function getScrollPercentage() {
                        var scrollPercent = Math.round(($(window).scrollTop() / ($(document).height() - $(window).height())) * 100);
            
                        if (scrollPercent >= 25 && scrollTwentyFive) {
                            utils.events.send('WB065_V1', 'Scroll Tracking', '25%', {sendOnce: true});
                            scrollTwentyFive = false;
                        }
            
                        if (scrollPercent >= 50 && scrollFifty) {
                            utils.events.send('WB065_V1', 'Scroll Tracking', '50%', {sendOnce: true});
                            scrollFifty = false;
                        }
            
                        if (scrollPercent >= 75 && scrollSeventyFive) {
                            utils.events.send('WB065_V1', 'Scroll Tracking', '75%', {sendOnce: true});
                            scrollSeventyFive = false;
                        }
            
                        if (scrollPercent >= 100 && scrollOneHundred) {
                            utils.events.send('WB065_V1', 'Scroll Tracking', '100%', {sendOnce: true});
                            scrollOneHundred = false;
                        }
                    }
            
                    // Track the scrolling and track location
                    $(window).scroll(function () {
                        if (timer) {
                            clearTimeout(timer);
                        }
                        // Use a buffer so we don't call trackLocation too often.
                        timer = setTimeout(getScrollPercentage, callBackTime);
                    });
            }

        };


    testBuilder.setupElements();
       
    }    
})();