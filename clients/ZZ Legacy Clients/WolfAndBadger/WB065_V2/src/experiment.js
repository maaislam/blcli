// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------
/* eslint-disable */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const WB065_V2 = (() => {
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
        utils.fullStory('WB065_V2', 'Variation 2');

        const cacheDom = (() => {
            //Cache useful selectors for later use
			const bodyVar = document.querySelector('body');
			const breadcrumbsParent = bodyVar.querySelector('.breadcrumbs');
			const availabilityInformation = bodyVar.querySelector('.hidden-non-phone > .availability');
			const productImageCarousel = bodyVar.querySelector('.product-image-column > .thumbs');
			const designerName = bodyVar.querySelector('.hidden-non-phone .desiger-info > .designer-details > h2 > a');
			
			const accordionParent = bodyVar.querySelector('.row .accordion.toggle-carets');
			const accordionArrowIcon = bodyVar.querySelector('.icon.icon-large.icon-caret-right').cloneNode(true);
			const reviewParent = $('div#feedbackPanel');


			const styleNotesAccordion = accordionParent.querySelector('div#notesPanel').parentNode;
			const reviewAccordion = accordionParent.querySelector('div#feedbackPanel').parentNode;
			const careInfoAccordion = accordionParent.querySelector('div#carePanel').parentNode;
			const deliveryAccordion = accordionParent.querySelector('div#deliveriesPanel').parentNode;
			const originalDesignerAccordion = accordionParent.querySelector('div#designPanel').parentNode;

			//These may not be on all product pages
			let availableInStore = accordionParent.querySelector('div#storesPanel');
			let addToBag = bodyVar.querySelector('.product-details-column > .row > .add-to-bag-or-wishlist');
			let addToWishlist = bodyVar.querySelector('div.wishlist-add-form-container');
			let sizingAccordion = accordionParent.querySelector('div#sizePanel');

			//Reassign selectors if elements are not on the page

			if(availableInStore != null){
				availableInStore  = availableInStore.parentNode;
			}

			if(sizingAccordion != null){
				sizingAccordion = sizingAccordion.parentNode;
			}

			//Top level accordion to be made

			let productAccordionWrapper;
			let designerAccordionWrapper;
			let WBAccordionWrapper;

            bodyVar.classList.add('WB065_V2');
            
            //Retun the selectors we want to reference in other parts of the test
            return {
				bodyVar,
				breadcrumbsParent,
				addToWishlist,
				availabilityInformation,
				productImageCarousel,
				addToBag,
				accordionParent,
				accordionArrowIcon,
				availableInStore,
				productAccordionWrapper,
				styleNotesAccordion,
				reviewAccordion,
				careInfoAccordion,
				sizingAccordion,
				deliveryAccordion,
				originalDesignerAccordion,
				productAccordionWrapper,
				designerAccordionWrapper,
				WBAccordionWrapper,
				reviewParent,
				designerName
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

				//Move availability information
				if(cacheDom.addToBag != null){
					cacheDom.addToBag.insertAdjacentElement('afterend', cacheDom.availabilityInformation);
				} else {

				//Hide availability information, no add to bag 

					$('.hidden-non-phone div.availability').hide()
				}

				//Move add to wishlist

				if(cacheDom.addToWishlist != null){
					cacheDom.addToBag.insertAdjacentElement('afterend', cacheDom.addToWishlist);
				}

				//Hide product images if there is only one image

				if(cacheDom.productImageCarousel.querySelector('.thumb-frames-container').childNodes.length == 1){
					cacheDom.productImageCarousel.style.display = "none";
                }
                
				//Build top level accordions

				const productAccordionMarkup = (`
					<div class="WB065-V2-Top-Accordion-Wrapper WB065-V2-About-Product">
						<span class="WB065-V2-Accordion-Link WB065-V2-Product-Link">About Product</span>
						<div class="WB065-Accordion-Wrapper WB065-V2-Product-Accordion"></div>
					</div>
				`);

				const designerAccordionMarkup = (`
					<div class="WB065-V2-Top-Accordion-Wrapper WB065-V2-About-Designer">
						<span class="WB065-V2-Accordion-Link WB065-V2-Designer-Link">About Designer</span>
						<div class="WB065-Accordion-Wrapper WB065-V2-Designer-Accordion"></div>
					</div>
				`);

				const WBAccordionMarkup = (`
					<div class="WB065-V2-Top-Accordion-Wrapper WB065-V2-About-WB">
						<span class="WB065-V2-Accordion-Link WB065-V2-WB-Link">About Wolf & Badger</span>
						<div class="WB065-Accordion-Wrapper WB065-V2-WB-Accordion"></div>
					</div>
				`);

				cacheDom.accordionParent.insertAdjacentHTML('afterbegin', WBAccordionMarkup);
				cacheDom.accordionParent.insertAdjacentHTML('afterbegin', designerAccordionMarkup);
				cacheDom.accordionParent.insertAdjacentHTML('afterbegin', productAccordionMarkup);
				

				//Loop through test markup and add icons

				for(let i = 0; i < cacheDom.accordionParent.querySelectorAll('.WB065-V2-Accordion-Link').length; i++){
					cacheDom.accordionParent.querySelectorAll('.WB065-V2-Accordion-Link')[i].insertAdjacentElement('beforeend', cacheDom.accordionArrowIcon.cloneNode(true));
				}
				
				//Move elements into accordion

				//Product accordion
				cacheDom.productAccordionWrapper = cacheDom.accordionParent.querySelector('.WB065-V2-Product-Accordion');


				//Check if available in store information exists, move if it exists

				if(cacheDom.availableInStore != null){
					cacheDom.productAccordionWrapper.insertAdjacentElement('beforeend', cacheDom.availableInStore);
				}

				cacheDom.productAccordionWrapper.insertAdjacentElement('beforeend', cacheDom.styleNotesAccordion);
				cacheDom.productAccordionWrapper.insertAdjacentElement('beforeend', cacheDom.reviewAccordion);
				cacheDom.productAccordionWrapper.insertAdjacentElement('beforeend', cacheDom.careInfoAccordion);

				if(cacheDom.sizingAccordion != null){
					cacheDom.productAccordionWrapper.insertAdjacentElement('beforeend', cacheDom.sizingAccordion);
				}
				
				cacheDom.productAccordionWrapper.insertAdjacentElement('beforeend', cacheDom.deliveryAccordion);

				//Collapse Style notes

				$('.WB065-V2-Product-Accordion > .accordion-group > .accordion-heading > a:first').click();

				//Designer Accordion

				cacheDom.designerAccordionWrapper = cacheDom.accordionParent.querySelector('.WB065-V2-Designer-Accordion');
				cacheDom.designerAccordionWrapper.insertAdjacentElement('beforeend', cacheDom.originalDesignerAccordion);

				//Designer accordion content

				//Add designer name

				const designerAccordionContent = (`
				<div class="WB065-V2-Designer-Accordion-Content-Wrapper">
					<div class="WB065-V2-Designer-Media-Import-Wrapper">
					</div>
					<div class="WB065-V2-Designer-Name-Wrapper">
						<p class="WB065-V2-Designer-Name">` + cacheDom.designerName.textContent + `</p>
					</div>
				</div>
				`);

				//Add markup to designers area for name and information from AJAX request

				cacheDom.originalDesignerAccordion.querySelector('.accordion-inner').insertAdjacentHTML('afterbegin', designerAccordionContent);

				//Request designer information only if product video is not there

				if(cacheDom.bodyVar.querySelector('div#designPanel > .accordion-inner > .responsive-video-container') == null){

				let designerURL = cacheDom.designerName.getAttribute("href");

				var designerRequest = new XMLHttpRequest();
				designerRequest.open('GET', designerURL);
				designerRequest.onload = function() {
    				if (designerRequest.status === 200) {	
						//Create a div to query and store the image

						let tempDiv = document.createElement('div');
						tempDiv.innerHTML = designerRequest.responseText;

						//Check if image exists
						let requestedImage = tempDiv.querySelector('.carousel-inner .item span img');

						//If image exists add it
						if(requestedImage != null){
							cacheDom.bodyVar.querySelector('.WB065-V2-Designer-Media-Import-Wrapper').insertAdjacentElement('afterbegin', requestedImage);
						}
						
					} 	
					//Do nothing if the request fails
				};
				designerRequest.send();

			}

				//WB Accordion

				const WBAccordionContent = (`
				<div class="WB065-V2-WB-Accordion-Content-Wrapper">
					<div class="WB065-V2-WB-Text-Wrapper">
						<p class="WB065-V2-WB-Review-Text">We live and breathe independent brands! We've made it our mission to provide a 
						platform for emerging designers to thrive by reaching new audiences and we pride ourselves on stocking the world's best 
						independent brands. <br /><br />Items that you order will be sent to you directly from the small business that designed, created or 
						made your product, to wherever you are in the world, resulting in faster shipping times for you. But don’t worry, our free 
						returns and collection service is arranged by us. 
						<span class="WB065-V2-Deliveries-Returns-Link WB065-V2-Link">See Deliveries & Returns</span> for more information.
						</p>
					</div>
					<div class="WB065-V2-WB-Review-Wrapper">
					</div>
				</div>
				`)

				cacheDom.WBAccordionWrapper = cacheDom.accordionParent.querySelector('.WB065-V2-WB-Accordion');
				cacheDom.WBAccordionWrapper.insertAdjacentHTML('beforeend', WBAccordionContent);
				
				//Anchor to delivery accordion
				$('.WB065-V2-Deliveries-Returns-Link').on("click", function(){

					//Check if product accordion is open, click it if not open
					if(!$('.WB065-V2-Product-Accordion').is(':visible')){
						$('.WB065-V2-Product-Link').click();
					};
					
					//Check if Delivery/Returns information is open, click it if not

					if($('div#deliveriesPanel').outerHeight() == 0){
						$('.WB065-V2-Product-Accordion .accordion-group:last-child').find('.accordion-heading > a').click();
					}

					//Scroll to delivery information

					$('html, body').animate({
						scrollTop: $('div#deliveriesPanel').offset().top - 125
						
					}, {
						duration: 600,
						complete: function(){
							slideQ = false;
						}
					});
			
				});

				functionalityBuilder.checkReviews();

				//Build Functions
				functionalityBuilder.topLevelAccordionFunction();
				functionalityBuilder.buildTracking();
				functionalityBuilder.buildScrollTracking();

            }

        };

        
        const functionalityBuilder = {


			checkReviews(){

				//Check if there are any designer and collection reviews

				let WBReviewsContent;
				let reviewLabels = cacheDom.bodyVar.querySelectorAll('#feedbackPanel > .accordion-inner > .feedback-label');

				if(reviewLabels[0].textContent.trim().toUpperCase().indexOf("THERE AREN\'T ANY REVIEWS FOR THIS COLLECTION YET") > -1){
					//No Product or collection reviews

					//Move WB reviews to Accordion

					WBReviewsContent = $(reviewLabels[0]).nextAll();
					WBReviewsContent.each(function(){
						$('.WB065-V2-WB-Review-Wrapper').append($(this));
					});

					//Rebuild old product review content

					const WB065NoReviewsMarkup = document.createElement("div");
					WB065NoReviewsMarkup.className = "WB065-V2-No-Reviews-Wrapper";
					const WB065NoReviewsContent = (`
					<p class="WB065-V2-No-Reviews-Text">This collection doesn’t have any reviews yet, but you can see reviews for Wolf & Badger. <span class="WB065-V2-No-Reviews-link WB065-V2-Link">Click here</span>
					</p>
					`); 
					WB065NoReviewsMarkup.insertAdjacentHTML('afterbegin', WB065NoReviewsContent);

					cacheDom.designerAccordionWrapper.querySelector('.WB050_secondary-cta').insertAdjacentHTML('afterend',`
					<div class="WB065-V2-No-Collection-Reviews-Wrapper">
					</div>
					`);
					cacheDom.designerAccordionWrapper.querySelector('.WB065-V2-No-Collection-Reviews-Wrapper').insertAdjacentHTML('afterbegin', WB065NoReviewsContent);

					reviewLabels[0].parentNode.replaceChild(WB065NoReviewsMarkup, reviewLabels[0]);
					reviewLabels[1].textContent = "Some recent customer reviews of Wolf & Badger:";

					//Anchor to WB reviews

					$('.WB065-V2-No-Reviews-link').on("click", function(){
						//Check if WB accordion is open, open if it's closed
						
						if(!$('.WB065-V2-WB-Accordion').is(':visible')){
							$('.WB065-V2-WB-Link').click()
						}

						//Scroll to WB reviews

						$('html, body').animate({
							scrollTop: $('.WB065-V2-WB-Review-Wrapper > .feedback-label').offset().top - 80
							
						}, {
							duration: 600,
							complete: function(){
								slideQ = false;
							}
						});
					});
	
				} else {

					//Reviews found, search for product review
					let productName = cacheDom.bodyVar.querySelector('.hidden-non-phone > .product-details > h1.product-name').textContent.trim().toUpperCase();
					let collectionReviews;
					let noProductReviews = true;

					const WB065CollectionReviewsMarkup = (`
					<div class="WB065-V2-Collection-Reviews-Wrapper">
					</div>
					`);

					cacheDom.designerAccordionWrapper.querySelector('.WB050_secondary-cta').insertAdjacentHTML('afterend', WB065CollectionReviewsMarkup);
					

					//Loop through reviews to search for product review
					$('.feedback > .product-name').each(function(){
						if($(this).text().trim().toUpperCase() == productName){
							//Product review found 

							//Move collection information
							cacheDom.designerAccordionWrapper.querySelector('.WB065-V2-Collection-Reviews-Wrapper').insertAdjacentElement('afterbegin', reviewLabels[0]);

							collectionReviews = $(this).parent().nextAll();
							noProductReviews = false;
							return false

						} 
					});

					//No product reviews found
					if(noProductReviews == true){
						//Add markup to product reviews section

						const WB065NoProductReviewsMarkUp = (`
						<div class="WB065-V2-No-Product-Reviews-Wrapper">
							<p class="WB065-V2-No-Product-Reviews-Text">This unique product doesn’t have any reviews yet, but you can see reviews for the designer. <span class="WB065-V2-No-Product-Reviews-Link WB065-V2-Link">Click here</span>
							</p>
						</div>
						`);

						collectionReviews = $(cacheDom.reviewParent).find('.narrow-accordion-inner').children();
						cacheDom.bodyVar.querySelector('div#feedbackPanel > .narrow-accordion-inner').insertAdjacentHTML('afterbegin', WB065NoProductReviewsMarkUp);

						//Anchor to designer/collection reviews

						$('.WB065-V2-No-Product-Reviews-Link').on("click", function(){
							//Check if designer's accordion is open, open if it's closed

							if(!$('.WB065-V2-Designer-Accordion').is(':visible')){
								$('.WB065-V2-Designer-Link').click();
							};

							//Scroll to designer/collection reviews

							$('html, body').animate({
								scrollTop: $('.WB065-V2-Collection-Reviews-Wrapper > .feedback-label').offset().top - 80
								
							}, {
								duration: 600,
								complete: function(){
									slideQ = false;
								}
							});


						});
					}

					//Move non collection reviews to designers section
					collectionReviews.each(function(){
						$('.WB065-V2-Collection-Reviews-Wrapper').append($(this));
					});

					//Find and move W&B Reviews

					WBReviewsContent = $(reviewLabels[1]).prev().nextAll();
					WBReviewsContent.each(function(){
						$('.WB065-V2-WB-Review-Wrapper').append($(this));
					});
					
				}
			
			},


            //Builds the functions of the test

            buildTracking(){
                $('.addthis_toolbox > a').on("click", function(){
                    let socialMediaIcon = $(this).attr("title");
                    utils.events.send('WB065_V2', 'Social Media Icon', socialMediaIcon, true);
                });

                $('div[class="accordion-group"]').on("click", function(){
                    let accordionGroup = $(this).find('a:first').text().trim();
                    utils.events.send('WB065_V2', 'Dropdown', accordionGroup, true);
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
                            utils.events.send('WB065_V2', 'Scroll Tracking', '25%', {sendOnce: true});
                            scrollTwentyFive = false;
                        }
            
                        if (scrollPercent >= 50 && scrollFifty) {
                            utils.events.send('WB065_V2', 'Scroll Tracking', '50%', {sendOnce: true});
                            scrollFifty = false;
                        }
            
                        if (scrollPercent >= 75 && scrollSeventyFive) {
                            utils.events.send('WB065_V2', 'Scroll Tracking', '75%', {sendOnce: true});
                            scrollSeventyFive = false;
                        }
            
                        if (scrollPercent >= 100 && scrollOneHundred) {
                            utils.events.send('WB065_V2', 'Scroll Tracking', '100%', {sendOnce: true});
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
			},
			
			topLevelAccordionFunction(){
				//replicates WB accordions

				$('.WB065-V2-Product-Accordion').slideUp();
				$('.WB065-V2-Designer-Accordion').slideUp();
				$('.WB065-V2-WB-Accordion').slideUp();

				$('.WB065-V2-Product-Link').on("click", function(){
					utils.events.send('WB065_V2', 'Click', 'Product Accordion', true);
					if($('.WB065-V2-Product-Accordion').is(':visible')){
						$('.WB065-V2-Product-Link > i').toggleClass('icon-caret-down');
						$('.WB065-V2-Product-Link > i').toggleClass('icon-caret-right');
						$('.WB065-V2-Product-Accordion').slideUp();
					} else {
						$('.WB065-V2-Product-Accordion').slideDown();
						$('.WB065-V2-Product-Link > i').toggleClass('icon-caret-down');
						$('.WB065-V2-Product-Link > i').toggleClass('icon-caret-right');
					}
					
				});

				$('.WB065-V2-Designer-Link').on("click", function(){
					utils.events.send('WB065_V2', 'Click', 'Designer Accordion', true);
					if($('.WB065-V2-Designer-Accordion').is(':visible')){
						$('.WB065-V2-Designer-Link > i').toggleClass('icon-caret-down');
						$('.WB065-V2-Designer-Link > i').toggleClass('icon-caret-right');
						$('.WB065-V2-Designer-Accordion').slideUp();
					} else {
						$('.WB065-V2-Designer-Accordion').slideDown();
						$('.WB065-V2-Designer-Link > i').toggleClass('icon-caret-down');
						$('.WB065-V2-Designer-Link > i').toggleClass('icon-caret-right');
					}
					
				});	

				$('.WB065-V2-WB-Link').on("click", function(){
					utils.events.send('WB065_V2', 'Click', 'Wolf & Badger Accordion', true);
					if($('.WB065-V2-WB-Accordion').is(':visible')){
						$('.WB065-V2-WB-Link > i').toggleClass('icon-caret-down');
						$('.WB065-V2-WB-Link > i').toggleClass('icon-caret-right');
						$('.WB065-V2-WB-Accordion').slideUp();
					} else {
						$('.WB065-V2-WB-Accordion').slideDown();
						$('.WB065-V2-WB-Link > i').toggleClass('icon-caret-down');
						$('.WB065-V2-WB-Link > i').toggleClass('icon-caret-right');
					}
					
				});	

			}

        };


    testBuilder.setupElements();
       
	}
	
})();