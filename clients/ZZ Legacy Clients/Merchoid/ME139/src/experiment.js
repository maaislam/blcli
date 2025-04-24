import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as content from './lib/ME139-content.js';

const ME139 = (() => {
	let $ = null;

	const activate = () => {
		document.body.classList.add('ME139');
		utils.fullStory('ME139', 'Variation 1');
		const URL = window.location.pathname;

		const categoryPage = () => {
			const productName = document.querySelector('.entry-title');
			productName.textContent = 'Gifting';
			const productContent = document.querySelector('.entry-content');

			//check if page is for him or her
      let gender,
      genderTwo;
			switch (URL) {
				case '/gifts-for-men/':
        gender = 'him';
        genderTwo = 'he\'ll';
					break;
				case '/gifts-for-women/':
        gender = 'her';
        genderTwo = 'she\'ll';
					break;
				default:
					break;
			} 

			//get the location
			const flagType = document.querySelector('.flag-flag');
			let location;
			if(flagType.classList.contains('flag-flaguk')){
				location = 'UK';
			}else if(flagType.classList.contains('flag-flagus')){
				location = 'US';
			}

			//add the sub text
			const topText = document.createElement('div');
			topText.classList.add('ME139-subText');
			topText.innerHTML = content.topText;
			productName.parentNode.appendChild(topText);
			topText.querySelector('.ME139_location').textContent = location;
		
			//create the popular product wrapper
			const popularProduct = document.createElement('div');
			popularProduct.classList.add('ME139-top-product');
			popularProduct.innerHTML = `<div class="ME139-product"></div><div class="ME139-product_text"></div>`;
			productContent.insertBefore(popularProduct,productContent.firstChild);

			//add most popular product to the top of the page
			const firstProduct = document.querySelector('.products .product-small');
			popularProduct.querySelector('.ME139-product').appendChild(firstProduct);
			popularProduct.querySelector('.ME139-product_text').innerHTML = content.topProductText;

      //if the category is emepty hide the parent
      const category = document.querySelectorAll('.products.large-block-grid-4');
      category.forEach(element => {
        if(!element.querySelector('.product-small')) {
          const elementParent = element.parentNode.parentNode.parentNode;
          elementParent.previousElementSibling.classList.add('ME139-noProducts');
        }
      });

			const firstProductName = firstProduct.querySelector('.name').textContent;

			const genderReference = document.querySelectorAll('.ME139_type');
			for (let i = 0; i < genderReference.length; i++) {
				const genderText = genderReference[i];
				genderText.textContent = gender;	
      }
	
			//this needs to be specified, it is not then hide it
			const occasionText = document.querySelector('.ME139-optional_text');
			occasionText.textContent = 'on No occasion set';

			//insert size banner
			const productBlockCount = document.querySelectorAll('.woocommerce.columns-4').length / 2;
			const productCount = productBlockCount.toFixed(0);
			const firstGroup = document.querySelector('.woocommerce.columns-4:nth-child('+productCount+')');

			const sizeBanner = document.createElement('div');
			sizeBanner.classList.add('ME139-sizebanner');
			sizeBanner.innerHTML = content.sizeBannerText;

      firstGroup.after(sizeBanner, firstGroup.nextSibling);
      const genderTwoRef = document.querySelectorAll('.ME139-typeTwo');
			for (let i = 0; i < genderTwoRef.length; i++) {
				 const genderText = genderTwoRef[i];
				 genderText.textContent = genderTwo;	
		  }
		}

		//if on category page
		if(URL.indexOf('gifts-for') > -1){
			UC.poller(['.entry-title','.flag-flag','.products .product-small','.entry-content'], () => {
				categoryPage();
			});
		}

		const productPageChanges = () => {
			const lastPage = document.referrer;
			if(lastPage != '' && lastPage.indexOf('gifts-for') > -1){

				const productInfoWrapper = document.querySelector('.product-information-mobile');
        //change scarity message
        const message = document.getElementById('merchoid-scarcity-message');
        message.textContent = `It's the gift they'll want, with the service you'd expect`;
				if(productInfoWrapper){
          const productInfoTitle = productInfoWrapper.querySelector('h2');
					const productBrand = document.querySelector('[property="og:brand"]').content,
					productName = document.querySelector('[property="og:title"]').content.replace('- Merchoid','');

					const newGiftText = document.createElement('div');
					newGiftText.classList.add('ME139-productText');
					newGiftText.innerHTML = `<p>Let's be honest, who wouldn't want to open a present and find the ${productName} inside?</p>
					<p>Designed with all ${productBrand} fans at the heart. We guarantee the recipient will love this gift. After all, who wants the mundane presents or cash in the card?</p>`;

					productInfoWrapper.insertBefore(newGiftText,productInfoTitle.nextElementSibling);
				}
			};
		}

		//if page is product
		if(URL.indexOf('product') > -1){
			UC.poller(['#merchoid-scarcity-message',], () => {
        productPageChanges();
			});
		}

		
		

	}

	// Audience conditions
	const triggers = ((options) => {
		UC.poller([
			() => {
				return !!window.jQuery;
			}
		], () => {
			$ = window.jQuery;
			activate();
		});
	})();

})();
