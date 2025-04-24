import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';


const ME137 = (() => {
    let $ = null;
    
	const activate = () => {
        const $body = $('body');
		$body.addClass('ME137');

		const productPage = $('.single-product'),
		brandCategoryPage = $('.brand-category'),
		categoryPage = $('.products-listing'),
		homePage = $('.home.page');

		const URL = window.location.pathname;
		let newUser = window.merchoidNewUser;

		const productBrand = $('meta[property="og:brand"]').attr("content");
		
	
		//if the user is a new user, save the product page
		if(!localStorage.getItem('ME137v1-last-visited-product') && productPage.length || brandCategoryPage.length){	
			//set brand info from product page
			let pagebrandLink,
			pageBrandURL,
			brandImage;

			if(productPage.length){
				pagebrandLink = $('input[name="_merchoid_pa_brand_link"]').val();
				brandImage = $('.product-image-assoc-brand img').attr('src');
			}else if(brandCategoryPage.length){
				pagebrandLink = URL;
				brandImage = $('.row.brand-byline .brand-image').attr('src');
			}

			const productPagedata = {
				imageUrl: brandImage,
				url: URL,
				brand: productBrand
			};
			const jsonData = JSON.stringify(productPagedata);
			localStorage.setItem('ME137v1-last-visited-product', jsonData);

			//set session storage to not show the box on the same visit as setting the brand obj
			sessionStorage.setItem('ME137-brandSetsession',1);
		
		}

		//-----------------------
		// if returning user and the brand has been set
		//-----------------------
		//if brand set, and first time visit cookie set and not the same session as the brand setting session
		if(localStorage.getItem('ME137v1-last-visited-product') && utils.getCookie('__merchoid_lastvisitedbrand_tid') && !sessionStorage.getItem('ME137-brandSetsession')){ 

			const get = localStorage.getItem('ME137v1-last-visited-product');
			const productdata = JSON.parse(get);
			
			const showBox = () => {
				//create and add the box
				const newBox = $(`
				<div class="ME137-brandBox">
					<a href="#">
						<div class="ME137-brand_image"/>
						<div class="ME137-box_text"/>
					</a>
				</div>`);
				newBox.insertAfter('#brands-widget');

				newBox.find('.ME137-brand_image').css({'background-image':`url(${productdata.imageUrl})`});
				newBox.find('a').attr('href',productdata.url);

				if(productPage.length){
					$('.ME137-box_text').html('<h2>WELCOME BACK!</h2><p>Click here to view the latest <span class="ME137-brand"/> merch</p>');
				}else if(brandCategoryPage.length || homePage.length || categoryPage.length){
					$('.ME137-box_text').html('<h2>Hey <span class="ME137-brand"/> superfan!</h2><p>Click here for the latest <span class="ME137-brand"/> merch</p>');
				}

				$('.ME137-brand').text(productdata.brand);

			}

			//show the box if on any page other than product page
			if(productdata.brand != productBrand || productBrand === 'undefined'){
				if(brandCategoryPage.length || homePage.length || categoryPage.length || productPage.length && !localStorage.getItem('ME137-boxShown')){
					showBox();
					localStorage.setItem('ME137-boxShown',1);
					utils.events.send('ME137 v1', 'Box Shown', 'ME137 V1 box was shown', {sendOnce: true});

					const bannerBox= $('.ME137-brandBox');
					bannerBox.find('a').on('click', () => {
						if(brandCategoryPage.length){
							utils.events.send('ME137 v1', 'Clicked on banner', 'ME137 V1 click on banner on brand category', {sendOnce: true});
						}
						if(homePage.length){
							utils.events.send('ME137 v1', 'Clicked on banner', 'ME137 V1 click on banner on homepage', {sendOnce: true});
						}
						if(categoryPage.length){
							utils.events.send('ME137 v1', 'Clicked on banner', 'ME137 V1 click on banner on category page', {sendOnce: true});
						}
					});
				}
			}
		}	
	}

	// Audience conditions
	const triggers = ((options) => {
		UC.poller([
			'body',
			() => {
				return !!window.jQuery;
			}
		], () => {
			$ = window.jQuery;
			utils.fullStory('ME137', 'Variation 1');
			activate();
		});
	})();

})();
