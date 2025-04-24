/* eslint-disable*/
import { fullStory, events , getUrlParameter, addUrlParameter } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';
import setProduct from './lib/SD059-content.js';
import * as markup from './lib/SD059-html.js';

var $ = null;
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'SD059b',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);
    
    poller([
    () => {
      return !!window.jQuery;
    }
    ], () => {
      $ = window.jQuery;
      
    
      const upsellWrap = document.createElement('div');
      const productDetailsWrapper = document.querySelector('.product-essential');
      const addtoCartBox = document.querySelector('.free-delivery-message-box');
      upsellWrap.classList.add('SD059-upsell_wrapper');
      upsellWrap.innerHTML = markup.upsellBox;

      productDetailsWrapper.insertBefore(upsellWrap, addtoCartBox.nextSibling);
      setProduct();

      components.moveReviews();

      if(window.innerWidth > 990){
				components.desktopLayout();
				components.desktopTabs();
      }
      

      components.upsellProductContent();
      components.checkStock();
      components.addToBagLayout();
      components.thumbnails();

      
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc pull in product with ajax
     */
    upsellProductContent: function upsellProductContent() {
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
								events.send('SD059b','invalid JSON','');
								$('.SD059-wrapper').hide();
							}

						}

						const upsellAddButton = pageUpsell.find('.button.btn-cart');
						//get the action from the upsell product page and add it to this form
						pageUpsell.closest('.SD059-upsell-form').attr('action',formAction);

						//stop the upsell add to basket trying to add the current product
						upsellAddButton.attr('onclick','').attr('type','submit').removeClass('btn-cart');
						upsellProductForm.find('input[name="form_key"]').prependTo('.SD059-upsell-form');

						const newUrl = addUrlParameter(window.location.href,'uc59-added-to-bag','1');

						//keep the user on this page on add to basket
						//adds query to the URL to check if added to basket
						$(`<input name="return_url" type="hidden" value="${newUrl}"/>`).insertAfter('.SD059-upsell-form input:first');
						const successMessage = $(`<div class="SD059-successMessage"><span></span> was added to your basket.</div>`);
						
						const successURL = getUrlParameter('uc59-added-to-bag');

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
								events.send('SD059b', 'Upsell add to basket Click', 'SD059 add to basket clicked on upsell product', {sendOnce: true});
							}
						});
					}
				});
    },
    /**
    * @desc Move the reviews
    */
    moveReviews: function moveReviews() {
      const reviewContainer = document.querySelector('.feefo_logo.product_reviews');
      const productImage = document.querySelector('.col-main .product-view');
      if(reviewContainer){
        productImage.insertBefore(reviewContainer, productImage.firstChild);
      }					
    },
    /**
     * @desc Check if the product is in stock
     */
    checkStock: function checkStock() {
      const inStock = document.querySelector('.action.in-stock .message-code');
      const addToLinks = document.querySelector('.add-to-links');
      const outOfStock = document.querySelector('.availability.out-of-stock');


      if(inStock){
        if (inStock.textContent.indexOf('In Stock') > -1 || inStock.textContent.indexOf('IN STOCK') > -1) {
          const text = inStock.textContent;
          inStock.textContent = text.replace(text, "In stock- Available for immediate dispatch");
          addToLinks.classList.add('SD59-inStock');
        } else {
          addToLinks.classList.remove('SD59-inStock');
          document.querySelector('.action.in-stock .message-code').textContent = text.replace(text, "Out of stock");
        }
      }
      // if colour option is changed
      const colourDropdown = document.querySelector('dl.last .super-attribute-select');
      if(colourDropdown) {
        const selected = colourDropdown.options[colourDropdown.selectedIndex].textContent;
        colourDropdown.onchange = function() {
          if(selected.indexOf('Out Of Stock') > -1){
            document.querySelector('.message-code').textContent = 'Out of stock';
          }
        }
      } 
      
    },
    /**
     * @desc rearrange the add to bag box
     */
    addToBagLayout: function addToBagLayout() {
      //Move the colours 
      const addToBagBox = $('.product-des'),
      viewColours = addToBagBox.find('.view-color-box');

      const priceArea = $('.product-options-bottom');
      const addToBag = addToBagBox.find('dl.last');
      poller(['.product-des .view-color-box'], () => {
        viewColours.appendTo(addToBag);
      });
      //check if the "add multiple colours exist"
      poller(['#product-options-wrapper .buymultibtn'], () => {
        addMultipleButton = $('#product-options-wrapper .buymultibtn');
        addMultipleButton.insertAfter(addToBag);
      });
  
      const quantity = document.querySelector('.add-to-cart .qty-wrapper');
      priceArea.find('.add-to-cart-buttons:first').before(quantity);
    },
    /** 
    * @desc remove the thumbnails if there is only one
    */
    thumbnails: function thumbnails() {
        const productImages = $('#amasty_gallery a');
        if(productImages.length <= 1){
          $('.more-views').addClass('SD059-lessthanOne');
        };
    },
    /** 
    * @desc layout for desktop
    */
    desktopLayout: function  desktopLayout() {
      const reviewContainer = document.querySelector('.according-panel #product_reviews');
      const desktopMainDescription = document.querySelector('.product-shop'),
      innerProductWrapper = document.querySelector('.product-des'),
      shortDescription = document.querySelector('.product-des .short-description'),
      productName = document.querySelector('.desktop-product-name'),
      quantityWrapper = document.querySelector('.qty-wrapper');

      //Move larger product description
      productName.insertAdjacentElement('afterend', shortDescription);
      

      //Move upsell block
      const upsellBlock = document.querySelector('.SD059-upsell_wrapper');
      document.querySelector('.product-des').appendChild(upsellBlock);

      //move reviews
      const smallReviews = document.querySelector('.feefo_logo.product_reviews');
      const desktopName = document.querySelector('.desktop-product-name');
      if(smallReviews) {
        document.querySelector('.product-shop').insertBefore(smallReviews, desktopName.nextSibling);
      }
      //Rearrange add to bag layout
      const allColours = $('.amconf-images-container'),
      inputBox = $('.product-options dl.last');
      allColours.insertAfter(inputBox);

      //Move points 
      $('.SD059-product-point').insertAfter('.desktop-stock-info');

      poller(['.product-options-bottom .buymultibtn'], () => {
        const desktopMultipleButton = $('.buymultibtn');
        desktopMultipleButton.insertAfter('.product-options');
      });	
      
      //move countdown
      const countdown = $('.countdown-section.product-view-timer');
      countdown.appendTo('.desktop-stock-info .extra-info.pro-avail-info');
    },
    /** 
    * @desc create tabs on desktop
    */
    desktopTabs: function desktopTabs() {
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

          events.send('SD059b', 'Tab Click', 'SD059b tab clicked on desktop', {sendOnce: true});
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
    },
  },
};

export default Experiment;
