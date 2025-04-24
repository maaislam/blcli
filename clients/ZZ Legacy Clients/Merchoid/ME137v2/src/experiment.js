import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';


const ME137 = (() => {
    let $ = null;

	const activate = () => {

		//if window.merchoidNewUser == 0 means they are returning.

        const $body = $('body');
		$body.addClass('ME137v2');


		const $productPage = $('.single-product'),
		categoryPage = $('.products-listing'),
		brandCategory = $('.brand-category'),
		homePage = $('.home.page');

		const URL = window.location.pathname;
		const newUser = window.merchoidNewUser;


		//store the data of the product page 
		//if on product page and the last brand visited cookie has not been set
		if(!localStorage.getItem('ME137v2-last-visited-product') && $productPage.length){

			const productImage = $('.woocommerce-main-image.zoom img').attr('src').replace('https:',''),
			productTitle = $('.mobile-target-product-title').text();

			const productPagedata = {
				title: productTitle,
				imageUrl: productImage,
				url: URL,
			};
			const jsonData = JSON.stringify(productPagedata);
			localStorage.setItem('ME137v2-last-visited-product', jsonData);

			sessionStorage.setItem('ME137v2-brandSessionset',1);

		}

		const get = localStorage.getItem('ME137v2-last-visited-product');
		const productdata = JSON.parse(get);

		//create the box to be shown

		const productBoxFirst = () => {
			const cookiebrandUrl = localStorage.getItem('ME137v2-productLink'),
			cookieBrandImg = localStorage.getItem('ME137v2-productimg');
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
		
		}

		//check if this cookie exists, means they are not a new user and if they are not in the same session as the brand setting one
		if(utils.getCookie('__merchoid_lastvisitedbrand_tid') && !sessionStorage.getItem('ME137v2-brandSessionset') && localStorage.getItem('ME137v2-last-visited-product') && !localStorage.getItem('ME137v2-boxShown')) {
			if(categoryPage.length || homePage.length || brandCategory.length){
				productBoxFirst();
				utils.events.send('ME137v2', 'First box shown', 'ME137v2 First box shown', {sendOnce: true});
				sessionStorage.setItem('ME137v2-boxoneSession',1);

				const bannerBox= $('.ME137-brandBox');
				bannerBox.find('.ME137-box_text').html(`<h2>Did you forget about me?</h2><p>Click here to pick up where you left off</p>`);
				localStorage.setItem('ME137v2-boxShown',1);

				bannerBox.find('a').on('click', () => {
					utils.events.send('ME137v2', 'Clicked on banner', 'ME137v2 click on banner on category', {sendOnce: true});
				});
			}
		} else {
			if($productPage.length && !localStorage.getItem('ME137v2-boxtwoShown') && localStorage.getItem('ME137v2-boxShown') && !sessionStorage.getItem('ME137v2-boxoneSession')){
				productBoxFirst();
				utils.events.send('ME137v2', 'Second box shown', 'ME137v2 Second box shown', {sendOnce: true});
				const bannerBox = $('.ME137-brandBox');
				bannerBox.find('.ME137-box_text').html(`<h2>We knew you couldnt resist!</h2><p>Get your hands on our offically licensed merch now!</p>`);
				localStorage.setItem('ME137v2-boxtwoShown',1);

				bannerBox.find('a').on('click', () => {
					utils.events.send('ME137v2', 'Clicked on banner', 'ME137v2 click on banner on product page', {sendOnce: true});
				});
			}
		}
	};

	const triggers = ((options) => {
		UC.poller([
			'body',
			() => {
				return !!window.jQuery;
			}
		], () => {
			$ = window.jQuery;
			utils.fullStory('ME137', 'Variation 2');
			activate();
		});
	})();
})();
