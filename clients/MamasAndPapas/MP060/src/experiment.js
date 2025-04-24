import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as mp60html from './lib/MP060-html.js';
import bundleChanges from './lib/MP060-bundles.js';

const MP060 = (() => {
	let $ = null;
    const activate = () => {
    	
        const $body = $('body');
        $body.addClass('MP060');

		/*------------------------
		//Check whether the page is product option or actual product
		------------------------*/
		const dropdown = $('.variant_options .w-100.p-3 option:selected').text().trim();
		let $pageType,
			$isMobile = $(window).width() <= 700;

		if(dropdown.indexOf('Select option') > -1){
			$pageType = 'pushchair-options';
		}else{
			$pageType = 'pushchair-product';
		}
		
		/*--------------------------------------------------------------
		//If product has less than a 3 star average review rating (or no reviews), hide reviews
	    ---------------------------------------------------------------*/
		const hideReviews = () => {
			const reviewsWrap = $('.productDetail .productDetail_review'),
				  starsReview = parseInt(reviewsWrap.find('.BVRRRatingNormalOutOf .BVRRRatingNumber').text()),
				  noReviews = $('#BVRRRatingSummaryNoReviewsWriteImageLinkID');
			const reviewAmount = parseInt($('.productDetail_review .BVRRRatingSummaryLinks .BVRRCount .BVRRNumber').text());
	

			if(reviewAmount.length === 0|| reviewAmount === 0 || starsReview < 3 || noReviews.length > 0){
				reviewsWrap.addClass('MP60_lessthanthree');
			}else{
				reviewsWrap.removeClass('MP60_lessthanthree');
			}

		}
		hideReviews();

		/*---------------------------------------------------------------
		on mobile scroll add sticky bar
	    ---------------------------------------------------------------*/
		const stickyCta = () => {
			const stickyBar = mp60html.stickbarHtml;
			$body.prepend(stickyBar);

			  const $stickyWrap = $('.MP060_stickyCTA');
			  //scroll function
				function detectScroll(){
					let lastScrollTop = 0; 
					window.addEventListener("scroll", function(){ 
					let scrollAmount = window.pageYOffset || document.documentElement.scrollTop; 
					if (scrollAmount > lastScrollTop){
							$stickyWrap.addClass('MP060-fixed');
						} else {
							$stickyWrap.removeClass('MP060-fixed');
					}
					lastScrollTop = scrollAmount;
					}, false);
				}
               UC.throttle($(window).on('scroll', detectScroll));


			//click real add to bag on fixed add click
			const addButtonfixed = $('.MP060_addToBag'),
				  pageButton = $('#addToCartForm .addToCartButton.btn');

			addButtonfixed.click(function(){
				pageButton.click();
				utils.events.send('MP060 - Pushchair redesign', 'add to bag click', 'Sticky add to bag clicked on mobile', {
					sendOnce: true
				});
			});
		}
		if($isMobile){
			if($pageType === 'pushchair-product'){
				stickyCta();
			}
		}

		/*--------------------------------------------------------------
		//Add numbers to featured carousel
		---------------------------------------------------------------*/
		const carouselNumbers = () => {
			//Append the total amount of slides to the current slide
			const slider = $('.basics-slider.bx-contain'),
				  sliderAmount = slider.find('.bx-controls.bx-has-pager .bx-pager.bx-default-pager'),
				  featuresTitle = $('.apdp-title:last').addClass('MP60-features_title');

			//Wrap the carousel and title together and move
			$('.basics-slider.bx-contain, .apdp-title:last').wrapAll(`<div class="MP060-features"/>`);

			const newFeatures = $('.MP060-features');
			newFeatures.insertAfter('#PDP-Information');

			slider.find('.btn.btn-slider').click(function(){
				utils.events.send('MP060 - Pushchair redesign', 'Features click', 'Clicked on arrows on the featured carousel', {
					sendOnce: true
				});
			});

		}
		carouselNumbers();

	
		/*-------------------------------------------------------------
		//Pull out the headings from the product desc and add them to the read more
		--------------------------------------------------------------*/
		const productHeadings = () => {
			let $productDetailsHeadings = $('.productDetail_panelContent').find('.details-product-mobile h2');
			
			if($productDetailsHeadings.length){
			//read more can be different so check which one exists
			let $readMoreTitle = $('#readMorePDP');
				if(!$readMoreTitle.length){
					$readMoreTitle = $('#readmoreTest');
				}

				const $newText = $(`<div class="MP060-topText"/>`);
				$newText.insertBefore($readMoreTitle);
				$productDetailsHeadings.each(function(){
					const $this = $(this);
					$(this).clone().prependTo($newText);
				});
			}
	   };
	   productHeadings();

		/*--------------------------------------------------------------
		//Stop product details sliding out & turn it in to an accordion
		----------------------------------------------------------------*/
		const mobileAccordion = () => {
			const accordionHeadings = $('.productDetail_panel.js-slidePanel-mobile .productDetail_panelHeading');
			$('#PDP-Details,#PDP-Information,#PDP-Reviews').addClass('MP060-accordionBlocks');

			//move reviews to the bottom of the reviews usp
			$('#reviews').insertAfter('#PDP-Reviews h3');

			//headings already have data-targets
			const accordionTab = $('.MP060-accordionBlocks').find('h3');
			
			//Rebuild the accordion
			accordionTab.each(function(){
				const $elm = $(this);
				$elm.next().addClass('MP060-blockHidden');
				$($elm).click(function(e){
					e.preventDefault();
					const textContent = $(this).next();
					if(textContent.hasClass('MP060-blockHidden')){
						textContent.removeClass('MP060-blockHidden');
					}else{
						textContent.addClass('MP060-blockHidden');
					}
					$(this).closest('.slidePanel').removeClass('active');
				});
		   });
		   $('#PDP-Details').find('.productDetail_panelContent').removeClass('MP060-blockHidden');
		}
		
		/*if($isMobile){ -- NOT WORKING BECAUSE OF THIS "$BV is not defined"
			mobileAccordion();
		}*/

		
		/*--------------------------------------------------------------
		//Add savings price
		----------------------------------------------------------------*/
		const priceSaving = () => {
			const priceBlock = $('.price-block'),
				  nowPrice = parseInt(priceBlock.find('.price').text().replace('£','')).toFixed(2),
				  wasPrice = parseInt(priceBlock.find('.ac-price').text().replace('£','')).toFixed(2),
				  savings = (wasPrice - nowPrice).toFixed(2);
				  

				  if(priceBlock.find('.ac-price').length > 0){
					const priceSavingWrap = $(`<div class="MP060-saving">£<span></span> off</div>`);
					priceSavingWrap.appendTo(priceBlock);
					priceSavingWrap.find('span').text(savings);
				}else{
					return false;
				}

			
		}
		priceSaving();

		/*--------------------------------------------------------------
		//Reorder the bottom content
		----------------------------------------------------------------*/
		const pageOrder = () => {
			
			const $guarantee = $('.apdp-text:first').closest('.col-xs-12'),
				  $basicsSlider = $('.occaro-slider.bx-contain'),
				  $desktopBasic = $('.col-lg-12.col-md-12.hidden-sm.hidden-xs'),
				  $colours = $('.colour-picker'),
				  $newlovedText = mp60html.lovedBlock,
				  $specialBlocksTitle = $('.col-xs-12.special-intro'),
				  $specialBlocks = $specialBlocksTitle.next(),
				  $bundles = $('.col-lg-12.col-xs-12.travel-bundles'),
				  $qualityText = mp60html.quality;
	
				  
			const moveElements = () =>{
				//guarantee after features
				$guarantee.insertAfter('.MP060-features');

				//basic slider after guarantee - add title
				if($isMobile){
					$basicsSlider.insertAfter($guarantee);
					$basicsSlider.prepend('<div class="MP060-basic col-lg-12 col-md-12 col-sm-12 col-xs-12 apdp-title"><h2>The Basics</h2></div>');
				}else{
					$desktopBasic.insertAfter($guarantee);
					$desktopBasic.prepend('<div class="MP060-basic col-lg-12 col-md-12 col-sm-12 col-xs-12 apdp-title"><h2>The Basics</h2></div>');
				}
				//colours slider after basic slider
				$colours.prepend('<div class="MP060-colours col-lg-12 col-md-12 col-sm-12 col-xs-12"><h2>Available in...</h2></div>');
				$colours.insertAfter($basicsSlider);
				
				$colours.after($newlovedText);
				$specialBlocksTitle.insertAfter('.MP060-loved');
				$specialBlocks.insertAfter($specialBlocksTitle);

				$specialBlocks.after($qualityText);

				//colour event
				$colours.find('.colour-swatch ul li').click(function(){
					utils.events.send('MP060 - Pushchair redesign', 'available in click', 'Clicked on available in link', {
						sendOnce: true
					});
				});
				
			}
			moveElements();
		}
	
		pageOrder();


		
		/*--------------------------------------------------------------
		//Desktop changes - image carousel
		----------------------------------------------------------------*/
		const desktopChanges = () =>{
			//remove the sticky attr
			$('#js-header').attr('data-sticky','false');

			//Add/remove class to make the top columns more central
			const imageContainer = $('.js-galleryPane'),
				  productDetails = $('.js-detailPane');
				
			imageContainer.removeClass('col-lg-8').addClass('col-lg-7');
			productDetails.addClass('col-lg-5').removeClass('col-lg-4');

			//move the click and collect desc inside of the li it needs to be with on desktop
			const deliveryOptions = $('.deliveryinfopanel');
			deliveryOptions.find('ul > li:last').append($(deliveryOptions.find('span:last')));


			//make the main images in to a slider
			const mainImagesWrap = $('#js-desktopImageContainer');
			//remove blank unused elements rather than hide so they are not used in the slider when slicked
			mainImagesWrap.find('.anchor').remove();
			mainImagesWrap.find('.d-flex.justify-content-center.mt-3').remove();


			mainImagesWrap.slick({
				dots: true,
				arrows: true,
				slidesToShow: 1
			});
			const arrowLeft = $('<i class="ico ico-chevronLeft"/>'),
			arrowRight = $('<i class="ico ico-chevronRight"/>');
			mainImagesWrap.find('.slick-prev.slick-arrow').text('').prepend(arrowLeft);
			mainImagesWrap.find('.slick-next.slick-arrow').text('').prepend(arrowRight);
	
		}
		UC.poller([
			function() {
				try {
					return !!window.jQuery.fn.slick();
				} catch (e) {
				}
			}
		], () => {
			if(!$isMobile){
				desktopChanges();
			}
		});
	
		/*ADD THE NUMBER OF SLIDES*/
		const bxSliderChange = () => {
			const bxSlider = $('.MP060-features .basics-slider.bx-contain'),
				 sliderNumbers = $('.MP060-features .bx-controls.bx-has-pager.bx-has-controls-direction .bx-pager.bx-default-pager');
			
			const addNumbers = () =>{
			const $featureSlideLength = bxSlider.find('li').length - 2;
				sliderNumbers.find('.bx-pager-item .bx-pager-link').each(function(){
					const el = $(this);
					el.append('<span> out of '+$featureSlideLength+'</span>');
				});
				//move slider underneath features
				sliderNumbers.insertAfter('.MP60-features_title');
			}
			addNumbers();

			window.addEventListener('resize', function () {
				addNumbers();
			});

			}
			UC.poller([
				'.bx-controls.bx-has-pager.bx-has-controls-direction',
				'.MP060-features .basics-slider.bx-contain',
				], () => {
					bxSliderChange();
			});

				
	
		const $bundles = $('.travel-bundle-filter-links');
		if($bundles.length > 0){
			//Bundle changes
			bundleChanges();
			//bundle event
			$('.MP060-desktopbutton').find('a').click(function(){
				utils.events.send('MP060 - Pushchair redesign', 'Bundle click', 'Clicked on bundle CTA', {
					sendOnce: true
				});
			});
		}
		 //change the related items text
		const $relatedItems = $('.relatedItems.p-3.text-center');
		const relatedItemChanges = () => {
			
			$relatedItems.prev().text('Others also looked at…');
		}

		if($relatedItems.length){
			relatedItemChanges();
		}

		const infomationHeader = $('#PDP-Information');
		if(infomationHeader){
			infomationHeader.find('h3').text('Delivery Information');
		}

	 
		//click and collect event
		const storeFind = $('#PickUpInStore-PickUpInStoreAction');
		if(storeFind.length > 0){
			storeFind.click(function(){
				utils.events.send('MP060 - Pushchair redesign', 'find in store click', 'Clicked find in store', {
					sendOnce: true
				});
			});
		}
	};

    // Audience conditions
    const triggers = ((options) => {
        UC.poller([
			'body',
			'.productDetail_review',
			
            () => {
                return !!window.jQuery;
            }
            ], () => {
             $ = window.jQuery;
             utils.fullStory('MP060', 'Variation 1');
             activate();
        });
    })();

})();
