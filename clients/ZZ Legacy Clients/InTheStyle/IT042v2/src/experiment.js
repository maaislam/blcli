import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import productLoader from './lib/product-loader.js';
import magnificPopup from './lib/magnific-popup.js';
import popupMarkup from './lib/popupHtml.js';

// ID - Experiment Title
const IT042v2 = (() => {

	// Experiment code
	const activate = () => {
		document.body.classList.add('IT042v2');
		let $ = window.jQuery,
			$body = $('body');

        // Load magnific
        magnificPopup();

        // Set up product loader
        productLoader._cacheDom();
    
        // full screen loader
        const loader = $(`
            <div class="it42-loader">Loading...</div>
        `);
        $('body').prepend(loader);
        loader.hide();

		//Add pop up to body
		const $popUp = popupMarkup;
		$body.prepend($popUp);


		let $shopLookProducts = $('.block-related.block-product-grid .products-grid'),
            $shopLookContainer = $('.block-related.block-product-grid'),
            $productOptionsBottom = $('.product-shop .product-options-bottom'),
            $productOptionsExtra = $('.product-shop .product-options-extra .product-countdown');

		/*-------------------
		// Put Images in slider
		---------------------*/
		function productSlider(){
			$shopLookProducts.slick({
				infinite: true, 
				slidesToShow: 2,
                dots: true,
				slidesToScroll: 2
			});

		}

        // Move the shop the look container up page
        if($productOptionsExtra.length > 0) {
            $shopLookContainer.insertAfter($productOptionsExtra);
        } else if($productOptionsBottom.length > 0) {
            $shopLookContainer.insertAfter($productOptionsBottom);
            $shopLookContainer.addClass('it42-did-insert-after-addto-button');
        }

		productSlider(); 

		/*------------------
		// Popup functions
		--------------------*/
		function shopPopup(){

			//cache variables that will be reused
			let $overlay = $('.it42-overlay'),
				$popUpBox = $('.it42-popup'),
				$popUpExit = $('.it42-popup-exit'),
				$popUpContent = $('.it42-content');		


			//open pop up
			function openPopup(){
				productLoader.elems.$loader.show();

                $overlay.addClass('it42-overlay-showing');
				$popUpBox.addClass('it42-popup-showing');
			}

			//Close pop up function
			function popUpExit(){
				$overlay.removeClass('it42-overlay-showing');
				$popUpBox.removeClass('it42-popup-showing');
				//clear the content
				$popUpContent.html('');

                $popUpContent.removeAttr('data-IT042');
			}

			//Loop through each of the images
			$shopLookProducts.find('li').each(function(){
				var $this = $(this);
				$this.click(function(e){
					e.preventDefault();
					openPopup();

					//get the URL of this product to pull the details using ajax.
					let productUrl = $this.find('a').attr('href');
					
					$.ajax({
						url: productUrl,
						success: function(data) {
						  let d = document.createElement('div');
						  d.innerHTML = data;
						 
						  //get product elements and append to the popup
						  let imageBox = $(d).find('.product-essential .product-img-box'),
							  productName = $(d).find('.product-essential .product-name'),
							  productPrice = $(d).find('.product-essential .price-box:first'),
							  productDesc = $(d).find('#product-view-details .accordion-navigation:first');

						 //add new content
						  imageBox.prependTo($popUpContent);
						  productName.insertAfter(imageBox);
						  productPrice.insertAfter(productName);
						  productDesc.appendTo($popUpContent);

						  //slick the new images	
						  $popUpContent.find('.product-thumbnails').slick();	 

                          // Set up product loader
                          productLoader.setProductUrl(productUrl);

                          // Create add to bag module
                          let addToBagModule = productLoader.modules.addToBag.init();
                          $popUpContent.find('.price-box').append(addToBagModule);
						}
					});

				});
			});

			//close the popup
			$popUpExit.click(function(){
				popUpExit();
			});
		}
		shopPopup();
		
	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('IT042', 'Variation 2');

		activate();
	})();

})();
