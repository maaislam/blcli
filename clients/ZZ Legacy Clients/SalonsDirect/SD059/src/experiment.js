import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import setProduct from './lib/SD059-content.js';
import * as markup from './lib/SD059-html.js';

const SD059 = (() => {
    let $ = null;

    // ---------------------------------------------------------
    // When adding to the framework, specify PU004VARIATION = 1
	// ---------------------------------------------------------
	let VARIATION = null;
    if(typeof SD059VARIATION != 'undefined') {
		VARIATION = SD059VARIATION ;
	} else {
		VARIATION = 1;
	}
    

	const activate = () => {
			const $body = $('body');
			$body.addClass('SD059 SD059v'+VARIATION);

			//page elements that will be used on both mobile & desktop
			const reviewContainer = document.getElementById('product_reviews'),
			quantity = document.querySelector('.add-to-cart .qty-wrapper');


			/*------------------*/
			// Create upsell container
			/*------------------*/
			const upsellWrap = document.createElement('div'),
			productDetailsWrapper = document.querySelector('.product-essential'),
			addtoCartBox = document.querySelector('.free-delivery-message-box');
			upsellWrap.classList.add('SD059-upsell_wrapper');
			upsellWrap.innerHTML = markup.upsellBox;

			productDetailsWrapper.insertBefore(upsellWrap, addtoCartBox.nextSibling);

			//Add the product details based on the page
			setProduct();		
	
			/*------------------*/
			// Upsell product, pull in with ajax
			/*------------------*/
			const upsellProductContent = () => {
	
				const upsellURL = document.querySelector('.SD059-upsell_image a').getAttribute('href');
			
				$.ajax({
					url: upsellURL,
					success: function (data) {
						var d = document.createElement('div');
						d.innerHTML = data;

						const upsellProductForm = $(d).find('.product-essential.product-details');
			
						//Define all the elements from the upsell product form
						const upsellTitle = upsellProductForm.find('.product-name h1').text(), //image
						upsellImageSrc = upsellProductForm.find('.product-image img').attr('src'), //title
						upsellexVatPrice = upsellProductForm.find('.product-des .price-excluding-tax:first'), //ex vat price
						upsellexincPrice = upsellProductForm.find('.product-des .inc-vat:first'), // inc vat price
						upsellAdd = upsellProductForm.find('.product-des .add-to-cart-buttons');

						//get the form action
						const formAction = upsellProductForm.find('#product_addtocart_form').attr('action');

						//set vars from current page
						const pageUpsell = $('.SD059-wrapper'),
						upsellthisProducttitle = pageUpsell.find('.SD059-prod_title'),
						upsellthisProductimage = $('.SD059-upsell_image img'),
						exVatPrice = pageUpsell.find('.SD059-prod_extVat'),
						incVatPrice = pageUpsell.find('.SD059-prod_incVat');
					
						//add the elements from the upsell product on to current page
						upsellthisProductimage.attr('src',upsellImageSrc); 
						upsellthisProducttitle.text(upsellTitle);
						exVatPrice.append(upsellexVatPrice);
						incVatPrice.append(upsellexincPrice);
						upsellAdd.appendTo('.SD059-addTobasket');

						pageUpsell.wrapAll(`<form action="#" class="SD059-upsell-form" method="post"/>`);
						
						//IF THE PRODUCT HAS OPTIONS
						//load in all the options
						const productOptions = upsellProductForm.find('.product-options');

						if(productOptions.length){
							const optionsScript = productOptions.find('dl:first').next().text().trim();
	
							
							productOptions.find('script').remove();
							productOptions.insertAfter(upsellthisProducttitle);
							spConfig.loadOptions();


							//regex to get the attributes out of the options
							const optionsRegex = /var\sspConfig\s=\snew\sProduct.Config\((.+)\);/;
							
							const allOptions = optionsScript.match(optionsRegex);
							
							const superAttr = $('.SD059-wrapper .super-attribute-select');

							try{
								const optionsJSON = JSON.parse(allOptions[1]);
								const attributeKeys = Object.keys(optionsJSON.attributes);
								const firstAttribute = attributeKeys[0];

								const productOptions = optionsJSON.attributes[firstAttribute].options;

								productOptions.forEach(element => {
									const option = $(`<option class="SD059-option" value="${element.id}" price="${element.price}" data-label="${element.label}">${element.label}</option>`);
									option.appendTo(superAttr);
									
								});

							}
							catch(e){
								utils.events.send('SD059','invalid JSON','');
								$('.SD059-wrapper').hide();
							}

						}

						const upsellAddButton = pageUpsell.find('.button.btn-cart');
						//get the action from the upsell product page and add it to this form
						pageUpsell.closest('.SD059-upsell-form').attr('action',formAction);

						//stop the upsell add to basket trying to add the current product
						upsellAddButton.attr('onclick','').attr('type','submit').removeClass('btn-cart');
						upsellProductForm.find('input[name="form_key"]').prependTo('.SD059-upsell-form');

						const newUrl = utils.addUrlParameter(window.location.href,'uc59-added-to-bag','1');

						//keep the user on this page on add to basket
						//adds query to the URL to check if added to basket
						$(`<input name="return_url" type="hidden" value="${newUrl}"/>`).insertAfter('.SD059-upsell-form input:first');
						const successMessage = $(`<div class="SD059-successMessage"><span></span> was added to your basket.</div>`);
						
						const successURL = utils.getUrlParameter('uc59-added-to-bag');

						if(successURL){
							successMessage.prependTo('.main-container .main');
							successMessage.find('span').text(upsellthisProducttitle.text());
						}
						document.querySelector('.SD059-addTobasket .add-to-cart-buttons').on('click', (e) => { 
							const errorMessage = $('.SD059-error');
								
							if($('.SD059-upsell_wrapper #product-options-wrapper option:selected').text() === 'Choose an Option...'){
								e.preventDefault();
								if(!errorMessage.length){
									$('<div class="SD059-error">Please select an option</div>').insertAfter('.SD059-wrapper h2');
								}
							}else{
								$('.SD059-error').remove();
								utils.events.send('SD059 v'+VARIATION, 'Upsell add to basket Click', 'SD059 add to basket clicked on upsell product', {sendOnce: true});
							}
						});

					}
				});
			}
			upsellProductContent();

			/*------------------*/
			// Reviews
			/*------------------*/
			const moveReviews = () => {
				const productImage = document.querySelector('.col-main .product-view');
				productImage.insertBefore(reviewContainer, productImage.firstChild);					
			}
			moveReviews();

			/*------------------*/
			//IF IN STOCK
			/*------------------*/
				//Change the in stock text if product is in stock
				const inStock = document.querySelector('.action.in-stock .message-code'),
				addToLinks = document.querySelector('.add-to-links');
			
				if(inStock.textContent.indexOf('In Stock') > -1 || inStock.textContent.indexOf('IN STOCK') > -1){
					const text = inStock.textContent;
					inStock.textContent = text.replace(text, "In stock- Available for immediate dispatch");
					addToLinks.classList.add('SD59-inStock');
				}else{
					addToLinks.classList.remove('SD59-inStock');
				}

			/*------------------*/
			// Rearrange add to bag box
			/*------------------*/
			const addLayout = () => {
				//Move the colours 
				const addToBagBox = $('#product-options-wrapper'),
				viewColours = addToBagBox.find('.view-color-box');

				const priceArea = $('.product-options-bottom');

				//check if the "add multiple colours exist"
				UC.poller(['#product-options-wrapper .buymultibtn'], () => {
					const addToBag = addToBagBox.find('dl.last'),
					addMultipleButton = $('#product-options-wrapper .buymultibtn');
					addMultipleButton.insertAfter(addToBag);
					viewColours.prependTo(addToBagBox);
				});
				//if not move the all colours anyway
				viewColours.prependTo(addToBagBox);

				priceArea.find('.add-to-cart-buttons:first').before(quantity);

			}
			addLayout();

			/*------------------*/
			// remove thumb images if only one
			/*------------------*/
			const thumbnails = () =>{
				const productImages = $('.thumbgallery a');
				
				if(productImages.length <= 1){
					$('#full-des').addClass('SD059-lessthanOne');
				};
			}
			thumbnails();

			/*------------------*/
			// Desktop layout
			/*------------------*/
			const desktopLayout = () => {

				const desktopMainDescription = document.querySelector('.product-shop'),
				innerProductWrapper = document.querySelector('.product-des'),
				shortDescription = document.querySelector('.product-des .short-description'),
				productName = document.querySelector('.desktop-product-name'),
				quantityWrapper = document.querySelector('.qty-wrapper');

				//Move larger product description
				desktopMainDescription.insertBefore(shortDescription, productName.nextSibling);

				//Move upsell block
				const upsellBlock = document.querySelector('.SD059-upsell_wrapper');
				desktopMainDescription.appendChild(upsellBlock);

				//move reviews
				desktopMainDescription.insertBefore(reviewContainer, shortDescription.nextSibling);

				//Rearrange add to bag layout
				const allColours = $('.amconf-images-container'),
				inputBox = $('.product-options dl.last');
				allColours.insertAfter(inputBox);

				//Move points 
				$('.SD059-product-point').insertAfter('.desktop-stock-info');

				UC.poller(['.product-options-bottom .buymultibtn'], () => {
					const desktopMultipleButton = $('.buymultibtn');
					desktopMultipleButton.insertAfter('.product-options');
				});	
				
				//move countdown
				const countdown = $('.countdown-section.product-view-timer');
				countdown.appendTo('.desktop-stock-info .extra-info.pro-avail-info');

			}
			const desktopTabs = () =>{
				const tabsWrapper = document.createElement('div');
				tabsWrapper.classList.add('SD059-tab_wrap');

				const desktopDescription = document.querySelector('.pro-description');
				desktopDescription.insertBefore(tabsWrapper, desktopDescription.firstChild);  
	
				//Add the headings
				const tabHeading = markup.desktoptabs,
				tabContent = markup.desktoptabContent;

                for (const key in tabHeading) {
					const tabObj = tabHeading[key]; 
					const tabBlock = $(`
					<div class="SD059-tabheading" id="SD059-${tabObj.className}">
						<span>${tabObj.title}</span>
					</div>`).appendTo(tabsWrapper);				
				}

				//add the content
				tabContent.forEach(element => {
					const tabContentInner = $(`<div class="SD059-content ${element}"/>`);
					tabContentInner.appendTo(tabsWrapper);
				});

				//make the first tab active by default
				document.querySelector('.SD059-content').classList.add('SD059-tabactive');
				document.getElementById('SD059-information').classList.add('SD059-tabheading-active');

				const tabHeadings = document.querySelectorAll('.SD059-tabheading');


				for(let i = 0; i < tabHeadings.length; i++) {
					tabHeadings[i].addEventListener('click', (e) => {
						//remove active from tabs that currently open
						for(let j = 0; j < tabHeadings.length; j++) {
							tabHeadings[j].classList.remove('SD059-tabheading-active');
						}

						//add class to active heading
						e.currentTarget.classList.add('SD059-tabheading-active');
						// Remove active class from all content tabs
						[].forEach.call(document.querySelectorAll('.SD059-content'), (item) => {
							item.classList.remove('SD059-tabactive');
						}); 
						// Make one active
						const id = e.currentTarget.id;
						const matchingElm = document.querySelector('.' + id);
						matchingElm.classList.add('SD059-tabactive');

						utils.events.send('SD059 v'+VARIATION, 'Tab Click', 'SD059 tab clicked on desktop', {sendOnce: true});
					});
				}

				//move the current content to the tabs
				const productDescription = document.querySelector('.according-panel.description-accroding'),
				productDescTab = document.querySelector('.SD059-information');

				const reviews = document.getElementById('feefo-reviews'),
				reviewsTab = document.querySelector('.SD059-reviews');

				productDescTab.appendChild(productDescription);
				reviewsTab.appendChild(reviews);

				const deliveryContent = markup.deliveryHTML;
				document.querySelector('.SD059-delivery').innerHTML = deliveryContent;

				const aboutContent = markup.aboutSalonsHTML;
				document.querySelector('.SD059-about').innerHTML = aboutContent;

				/*move product desc*/
				const shortDescription = document.querySelector('.product-shop .short-description').cloneNode(true);

				productDescTab.insertBefore(shortDescription,productDescTab.firstChild);

				//make top product desc just one sentence long
				const newDesc = document.querySelector('.short-description p').textContent.split('.')[0];
				document.querySelector('.short-description p').textContent = newDesc+'.';

			}

			//if on desktop
			if(window.innerWidth > 990){
				desktopLayout();
				desktopTabs();
			}

			// VARIATION 2 CHANGES
			if(VARIATION === 2){
				if(window.innerWidth < 990){
					const informationAccordion = $('.according-panel.description-accroding .according-box');
					$('.SD059-product-point').prependTo(informationAccordion);
				}
			}
	}

	// Audience conditions
	const triggers = ((options) => {
		UC.poller([
			'body',
			'.main-container .main',
			'#product-options-wrapper',
			'.product-options-bottom',
			'.add-to-cart .qty-wrapper',
			'.add-to-cart-buttons',
			'.pro-description',
			'.view-color-box',
			() => {
				return !!window.jQuery;
			}
		], () => {
			$ = window.jQuery;
			utils.fullStory('SD059', 'Variation'+VARIATION);
			activate();
		});
	})();

})();
