import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import {ME131content, ME131clothing} from './lib/ME113-content.js';

const ME131 = (() => {
    let $ = null;
    const activate = () => {
        const $body = $('body');
		$body.addClass('ME131v2');

		//Get the current page title to be used for the cookie
		const $productTitle = $('.mobile-target-product-title').text(),
		currentproductTitle = $productTitle.replace(/\s/g,"").toLowerCase().replace(':',''); 

		//-------------------
		//Add the blue bar
		//-------------------
		const addBar = () => {
			const $blueBar = $(`<div class="ME131-bar"><div class="ME131-exit">&times;</div><span></span></div>`);
			$blueBar.prependTo('.product-gallery');

			const allContent = ME131content,
			allClothingTitles = ME131clothing;

			const productBrand = $('meta[property="og:brand"]').attr("content");


			$('.ME131-exit').click(function(){
				localStorage.setItem('ME131v2-exit',1);
				$('.ME131-bar').addClass('ME131-notext');
			});

			//--------------------------------------		
			//if the product title is a clothing page
			//--------------------------------------	
			let clothingPage = false;
			
			allClothingTitles.forEach(element => {
				if($productTitle.indexOf(element) > -1){
					clothingPage = true;
					return false;
				}
			});

			let messageText = $('.ME131-bar').find('span'),
				URL = window.location.href;

			let $bar = $('.ME131-bar');

			//All the conditions of the test
			const conditions = () =>{

				//If the product is the landing page
				if(!utils.getCookie('ME131v2-landing')){

					if(clothingPage === true){
						if(productBrand === 'Legend of Zelda'){
							messageText.text(allContent.landing.zelda);
						}else if(productBrand ==='Jurassic Park' || productBrand ==='Rick and Morty' || productBrand ==="Nintendo" || productBrand ==='Sonic the Hedgehog' || productBrand ==='PlayStation' || productBrand ==='Fallout'){
							messageText.text(allContent.landing.gift);
						}else{
							messageText.text(allContent.landing.clothing);	
						}
					}else{
						messageText.text(allContent.landing.gift);
					}
					utils.setCookie('ME131v2-landing',currentproductTitle);
					
				}else if(!utils.getCookie('ME131v2-first') && utils.getCookie('ME131v2-landing')){ //If the product is the first visit to product page

					if(clothingPage === true){
						if(productBrand === 'Legend of Zelda'){
							messageText.text(allContent.landing.zelda);
						}else if(productBrand ==='Jurassic Park' || productBrand ==='Rick and Morty' || productBrand ==="Nintendo" || productBrand ==='Sonic the Hedgehog' || productBrand ==='PlayStation' || productBrand ==='Fallout'){
							messageText.text(allContent.firstvisit.gift);
						}
						else if($productTitle.indexOf('Shirt') > -1){
							messageText.text(allContent.firstvisit.tshirt);
						}
						else if($productTitle.indexOf('Hat') > -1){
							messageText.text(allContent.firstvisit.hats);
						}
						else if(URL.match(/^.*(knitted).*/g)) {
							messageText.text(allContent.firstvisit.knittedpage);
						}
						else if($productTitle.match(/^.*(Bathrobe|Shortama).*/g)) {
							messageText.text(allContent.firstvisit.nightwear);
						}else if(messageText.text() === ''){
							messageText.text(allContent.firstvisit.clothing);
						}

					}else{
						messageText.text(allContent.firstvisit.gift);
					}
					utils.setCookie('ME131v2-first',1);

				}else if(!utils.getCookie('ME131v2-second') && utils.getCookie('ME131v2-first')){ //If the product is the second visit to product page

					//show the bar if hidden
					$bar.removeClass('ME131-notext');
					
					if(clothingPage === true){
						if(productBrand ==='Jurassic Park' || productBrand ==='Rick and Morty' || productBrand ==="Nintendo" || productBrand ==='Sonic the Hedgehog' || productBrand ==='PlayStation' || productBrand ==='Fallout'){
							messageText.text(allContent.secondvisit.gift);
						}
						else if($productTitle.indexOf('T-Shirt') > -1){
							messageText.text(allContent.secondvisit.tshirt);
						}
						else if(productBrand === 'Legend of Zelda'){
							messageText.text(allContent.landing.zelda);	
						}else{
							messageText.text(allContent.secondvisit.other);
						}
					}else{
						messageText.text(allContent.secondvisit.gift);
					}
					utils.setCookie('ME131v2-second',1); 

				}else if(!utils.getCookie('ME131v2-third') && utils.getCookie('ME131v2-second')){ //if it's the third visit and based on users location
					messageText.text(allContent.thirdvisit.all);
					utils.setCookie('ME131v2-third',1);
				}
			}
			conditions();
		
			//if all cookies have been added, show the message that will stay
			if(utils.getCookie('ME131v2-landing') && utils.getCookie('ME131v2-second') && utils.getCookie('ME131v2-first')){
				messageText.text(allContent.thirdvisit.all);
			} 

		}
		//loop through cookies to find the landing page product then match against current product
		const cookieStored = document.cookie.split(';');

		let landingPageTitle;
		cookieStored.forEach(element => {
			if(element.match('ME131v2-landing='+currentproductTitle)){
				const productCookie = element.split('=');
				landingPageTitle = productCookie[1];
			}
		});

		//if the message does not already exist
		let messageExist = false;


		const lowStockmessage = $('.stockinfo.product-info-stockinfo').text();
		if(lowStockmessage.indexOf('Limited Stock') > -1){
			messageExist = true;
		}else{
			messageExist = false;
		}

		//If the current page is not the landing page
		if(landingPageTitle != currentproductTitle){
			if(!localStorage.getItem('ME131v2-exit')){
				addBar();
			}	
		}
	}
	

    // Audience conditions
    const triggers = ((options) => {

        	UC.poller([
				'.mobile-target-product-title',
				'.product-gallery',
				'.stockinfo.product-info-stockinfo',
            () => {
                return !!window.jQuery;
            }
            ], () => {
            	$ = window.jQuery;
				 utils.fullStory('ME131', 'Variation 2');
				 	activate();
			});
    })();

})();
